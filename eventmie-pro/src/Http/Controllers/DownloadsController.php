<?php

namespace Classiebit\Eventmie\Http\Controllers;
use App\Http\Controllers\Controller; 
use Facades\Classiebit\Eventmie\Eventmie;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Auth;
use Classiebit\Eventmie\Models\Event;
use Classiebit\Eventmie\Models\Ticket;
use Classiebit\Eventmie\Models\Booking;
use Classiebit\Eventmie\Models\Transaction;
use Classiebit\Eventmie\Models\Commission;
use Classiebit\Eventmie\Models\User;
use Illuminate\Support\Facades\Storage;

class DownloadsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // language change
        $this->middleware('common');

        // download only after login
        $this->middleware('auth');
    
        $this->event        = new Event;
        $this->ticket       = new Ticket;
        $this->booking      = new Booking;
        $this->transaction  = new Transaction;
        $this->commission   = new Commission;
    }
    
    /**
     * Show my booking
     *
     * @return array
     */
    public function index($id = NULL, $order_number = NULL)
    {
        if(!empty(setting('booking.hide_ticket_download')) &&(Auth::user()->hasRole('organiser') || Auth::user()->hasRole('customer')))
            abort('404');

        $id             = (int) $id;
        $order_number   = trim($order_number);

        // get the booking
        $booking = $this->booking->get_event_bookings(['id'=>$id, 'order_number'=>$order_number]);
        if(empty($booking))
            abort('404');

        $booking = $booking[0];

        // customer can see only their bookings
        if(Auth::user()->hasRole('customer'))
            if($booking['customer_id'] != Auth::id())
                abort('404');

        // organiser can see only their events bookings
        if(Auth::user()->hasRole('organiser'))
            if($booking['organiser_id'] != Auth::id())
                abort('404');
        
        // generate QrCode
        $qrcode_data = [
            'id'            => $booking['id'],
            'order_number'  => $booking['order_number'],
        ];
        $this->createQrcode($booking, $qrcode_data);

        // get event data for ticket pdf
        $event      = $this->event->get_event(null, $booking['event_id']);
        $currency   = setting('regional.currency_default');
        
        // generate PDF
        // test PDF
        // $img_path = '';
        // return Eventmie::view('eventmie::tickets.pdf', compact('booking', 'event', 'currency', 'img_path'));
        // use http url only
        $img_path   = str_replace('https://', 'http://', url(''));
        $pdf_html   = (string) \View::make('eventmie::tickets.pdf', compact('booking', 'event', 'currency', 'img_path'));
        $pdf_name   = $booking['id'].'-'.$booking['order_number'];
        $this->generatePdf($pdf_html, $pdf_name, $booking);

        // Detect Storage Disk
        $storageDisk = getDisk();

        $relativePath = 'ticketpdfs/' . $booking['customer_id'] . '/' . $pdf_name . '.pdf';

        if ($storageDisk == 's3') {
            if (!Storage::disk('s3')->exists($relativePath)) {
                abort(404);
            }

            // S3 Check connect
            // $pdfUrl =   getFile($relativePath) ;
            // return redirect($pdfUrl);

            // Stream the file from S3 for download
            return response()->streamDownload(function () use ($relativePath) {
                echo Storage::disk('s3')->get($relativePath);
            }, basename($relativePath));

        } else {
            $pdf_file = public_path('/storage/' . $relativePath);

            if (!\File::exists($pdf_file)) {
                abort(404);
            }

            return response()->download($pdf_file);
        }
    }

    protected function createQrcode($data = [], $qrcode_data = [])
    {
        try {
            $storageDisk = getDisk(); // Get current storage disk
            $qrcodeFilename = $data['id'] . '-' . $data['order_number'] . '.png.svg';
            $relativePath = 'qrcodes/' . $data['customer_id'] . '/' . $qrcodeFilename;

            if ($storageDisk == 's3') {
                // Generate QR code in memory using SVG (works with GD)
                $qrCodeContent = \QrCode::format('svg')->size(256)->generate(json_encode($qrcode_data));

                // Store in S3
                Storage::disk('s3')->put($relativePath, $qrCodeContent);

                return Storage::disk('s3')->exists($relativePath);
            } else {
                $localPath = public_path('/storage/' . $relativePath);

                // Ensure directory exists
                $dirPath = dirname($localPath);
                if (!\File::exists($dirPath)) {
                    \File::makeDirectory($dirPath, 0755, true);
                }

                // Generate QR code only if not already created
                if (!\File::exists($localPath)) {
                    // Use SVG format which works with GD backend
                    $qrCodeContent = \QrCode::format('svg')->size(256)->generate(json_encode($qrcode_data));
                    \File::put($localPath, $qrCodeContent);
                }

                return \File::exists($localPath);
            }
        } catch (\Exception $e) {
            \Log::error('QR Code Generation Failed: ' . $e->getMessage());
            return false;
        }
    }

    /**
     *  generate pdf
     */
    protected function generatePdf($html = null, $pdf_name = null, $data = [])
    {
        try {
            $storageDisk = getDisk(); // Get current storage disk
            $pdfFilename = $data['id'] . '-' . $data['order_number'] . '.pdf';
            $relativePath = 'ticketpdfs/' . $data['customer_id'] . '/' . $pdfFilename;

            // Ensure HTML is valid
            $html = preg_replace('/>\s+</', '><', $html);
            if (empty($html)) {
                return false;
            }

            $html = mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8');

            $options = [
                'defaultFont' => 'sans-serif',
                'isRemoteEnabled' => true,
                'isJavascriptEnabled' => false,
                'debugKeepTemp' => true,
                'isHtml5ParserEnabled' => true,
                'enable_html5_parser' => true,
            ];

            // Generate PDF in memory
            $pdf = \PDF::setOptions($options)
                ->loadHTML($html)
                ->setWarnings(false)
                // Standard ticket size: 5.5" × 2.125" (396 × 153 points) - optimal for both print and digital
                ->setPaper([0, 0, 396, 153], 'landscape')
                ->output(); // Instead of save(), use output() to get raw PDF content

            if ($storageDisk == 's3') {
                // Store PDF in S3
                Storage::disk('s3')->put($relativePath, $pdf);

                return Storage::disk('s3')->exists($relativePath);
            } else {
                // Save locally in public storage
                $localPath = public_path('/storage/' . $relativePath);

                // Ensure directory exists
                $dirPath = dirname($localPath);
                if (!\File::exists($dirPath)) {
                    \File::makeDirectory($dirPath, 0755, true);
                }

                // Save PDF locally
                \File::put($localPath, $pdf);

                return \File::exists($localPath);
            }
        } catch (\Exception $e) {
            \Log::error('PDF Generation Failed: ' . $e->getMessage());
            return false;
        }
    }



}
