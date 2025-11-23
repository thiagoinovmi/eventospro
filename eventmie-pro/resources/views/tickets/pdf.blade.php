<html>

<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <style>
        * {
            padding: 0;
            margin: 0;
            font-family: 'DejaVu Sans', sans-serif;
        }

        body {
            height: 100% !important;
            width: 100% !important;
            font-size: 10px;
            font-family: 'DejaVu Sans', sans-serif;
            line-height: 1.1;
        }

        table {
            width: 100%;
            padding: 1px;
            margin: 0 auto !important;
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
        }

        table table table {
            table-layout: auto;
        }

        table td {
            padding: 5px;
            font-size: 8px;
            word-wrap: break-word;
        }

        .center {
            text-align: center;
        }

        .text-left {
            text-align: left;
        }

        .text-right {
            text-align: right;
        }

        [dir=rtl] .text-right {
            text-align: left;
        }

        [dir=rtl] .text-left {
            text-align: right;
        }

        p {
            font-size: 8px;
            display: block;
        }

        .label {
            color: #797979;
            font-size: 8px;
            text-transform: uppercase;
            font-weight: 600;
            margin-top: 10px;
        }

        .value-data {
            color: #000;
            font-size: 12px;
            margin: 0;
            line-height: 1;
        }

        .divider {
            color: #797979;
            border: 1px dashed #797979;
        }

        .text-capitalize {
            text-transform: capitalize;
        }

        .text-bold {
            font-weight: 600;
        }

        .text-small {
            font-size: 10px;
        }
        .text-smaller {
            font-size: 8px;
        }

        .mt-0 {
            margin-top: 0px !important;
        }

        .qr-code-image {
            width: 90%;
            padding: 0 10px 0 10px;
        }
    </style>
</head>

<body {!! is_rtl() ? 'dir="rtl"' : '' !!}>
    <!-- when testing  -->
    @if (!$img_path)
        <div style="max-width: 396px;margin: 0 auto;border: 1px solid red;">
        @else
        <!-- when generating  -->
        <div style="max-width: 396px;margin: 0 auto;">
        @endif

    <!-- Ticket X of Y -->
    <div>
        <table style="width: 100%;">
            <tr>
                <td style="width: 30%; vertical-align: middle;">
                    <hr class="divider" style="margin:0">
                </td>
                <td style="width: auto; text-align: center; vertical-align: middle;">
                    <div
                        style="border: 1px solid #000; border-radius: 8px; padding: 2px 5px; font-size: 6px; color: #000; display: inline-block; white-space: nowrap;">
                        {{ __('eventmie-pro::em.ticket_of_count', ['index' => 1, 'total' => 1]) }}
                    </div>
                </td>
                <td style="width: 30%; vertical-align: middle;">
                    <hr class="divider" style="margin:0">
                </td>
            </tr>
        </table>
    </div>
    
    <!-- 1. QrCode -->
    <div>
        <table>
            <tr>
                <td style="padding-top: 0;">
                    @php
                        $qrcode =
                            $booking['customer_id'] . '/' . $booking['id'] . '-' . $booking['order_number'] . '.png';
                        $qrcodePath = public_path('/storage/qrcodes/' . $qrcode);

                        if(getDisk() == 's3') {
                            $qrcodePath = getStorageImage('qrcodes/'.$qrcode);

                            $fileExists = Storage::disk('s3')->exists('qrcodes/'.$qrcode);
                        }
                    @endphp
                    
                    @if (file_exists($qrcodePath) && getDisk() != 's3')
                        <img src="{{ 'data:image/png;base64,' . base64_encode(file_get_contents($qrcodePath)) }}" class="qr-code-image">
                    @elseif(getDisk() == 's3' && $fileExists)
                        <img src="{{ $qrcodePath }}" class="qr-code-image">
                    @endif
                </td>
            </tr>
        </table>
    </div>

    
    <!-- 1. Event details -->
    <div>
        <table>
            <tr>
                <td style="padding-top: 0;">
                    <div>
                        <table>
                            <tr>
                                <td style="padding-top: 0;">
                                    <p class="label mt-0">@lang('eventmie-pro::em.event')</p>
                                    <p class="value-data text-small text-bold">{{ strlen($event->title) > 50 ? substr($event->title, 0, 50) . '..' : $event->title }}</p>
                                    <p class="value-data text-small">
                                        {{ \Carbon\Carbon::parse($booking['event_start_date'] . ' ' . $booking['event_start_time'])->format('D, M d Y, h:i A') }}
                                        - 
                                        {{ \Carbon\Carbon::parse($booking['event_end_date'] . ' ' . $booking['event_end_time'])->format('h:i A') }} ({{ \Carbon\Carbon::now()->timezoneName }})
                                    </p>
                                    <p class="value-data text-smaller" style="color: #737373;">{{ ucfirst($event->venue) }} | {{ ucfirst($event->address) }}</p>

                                    <p class="label">@lang('eventmie-pro::em.ticket')</p>
                                    <p class="value-data">
                                        {{ $booking['ticket_title'] }} <strong> x {{ $booking['quantity'] }}</strong>
                                        
                                    </p>

                                    <p class="label">@lang('eventmie-pro::em.buyer')</p>
                                    <p class="value-data text-small">{{ ucfirst($booking['customer_name']) }} ({{ $booking['customer_email'] }})</p>
                                    
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <!-- Powered by -->
    <div style="text-align: center;position: absolute;bottom: 1%;left: 0;right: 0;font-size: 8px;color: #000;font-weight: 600;">
        www.{{ request()->getHttpHost() }}
    </div>

</div>

</body>

</html>