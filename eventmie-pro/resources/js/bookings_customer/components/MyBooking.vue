<template>
    <div>
        <div class="container-fluid">
        <div class="row py-5">
            <div class="col-md-12">
                <div class="card shadow-sm border-0">
                    <div class="card-header p-4 bg-white border-bottom-0"></div>
                    <div class="table-responsive">
                        <table class="table text-wrap table-hover">
                            <thead class="table-light text-nowrap">
                                <tr>
                                    <th class="border-top-0 border-bottom-0">{{ trans('em.event') }}</th>
                                    <th class="border-top-0 border-bottom-0">{{ trans('em.ticket') }}</th>
                                    <th class="border-top-0 border-bottom-0">{{ trans('em.order_total') }} </th>
                                    <th class="border-top-0 border-bottom-0">{{ trans('em.booked_on') }} </th>
                                    <th class="border-top-0 border-bottom-0">{{ trans('em.payment') }} </th>
                                    <th class="border-top-0 border-bottom-0">{{ trans('em.checked_in') }}</th>
                                    <th class="border-top-0 border-bottom-0">{{ trans('em.status') }}</th>
                                    <th class="border-top-0 border-bottom-0">{{ trans('em.cancellation') }}</th>  
                                    <th class="border-top-0 border-bottom-0">{{ trans('em.actions') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="booking in bookings" :key="booking.id" >
                                    <td :data-title="trans('em.event')">
                                        <div class="d-flex align-items-center">
                                            <a :href="eventSlug(booking.event_slug)"> 
                                                <img :src="getImageUrl(booking.event_thumbnail)" :alt="booking.event_title" class="rounded img-4by3-md ">
                                            </a>
                                            <div class="ms-3 lh-1">
                                                <h5 class="mb-1"> 
                                                    <a :href="eventSlug(booking.event_slug)" class="text-inherit text-wrap">{{ booking.event_title }}</a>
                                                </h5>
                                                <p class="text-mute">
                                                    <small class="text-muted">
                                                        {{ userTimezone(booking.event_start_date+' '+booking.event_start_time, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm') }}
                                                    </small>
                                                </p>

                                                <p>
                                                    <small class="text-success fw-bold">{{ trans('em.order_id') }}: #{{ booking.order_number }}</small>
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td class="align-middle" :data-title="trans('em.ticket')"><i class="fas fa-ticket"></i> {{ booking.ticket_title }} <strong>{{ ' x '+booking.quantity }}</strong></td>
                                    <td class="align-middle" :data-title="trans('em.order_total')">{{ currency + ' ' + (booking.net_price || '0.00') }} </td>
                                    <td class="align-middle" :data-title="trans('em.booked_on')">
                                        <div>{{ userTimezone(booking.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm') }}</div>
                                        <!-- 🔴 Status de Pagamento Mercado Pago -->
                                        <div v-if="booking.payment_type === 'mercadopago' && booking.mercadopago_transaction" class="mt-2">
                                            <!-- Processando -->
                                            <span v-if="booking.mercadopago_transaction.status === 'pending'" class="badge bg-warning text-dark">
                                                <i class="fas fa-hourglass-half me-1"></i> {{ trans('em.processing') || 'Processando' }}
                                            </span>
                                            <!-- Rejeitado -->
                                            <span v-else-if="booking.mercadopago_transaction.status === 'rejected'" class="badge bg-danger text-white">
                                                <i class="fas fa-times-circle me-1"></i> {{ trans('em.rejected') || 'Rejeitado' }}
                                            </span>
                                            <!-- Cancelado -->
                                            <span v-else-if="booking.mercadopago_transaction.status === 'cancelled'" class="badge bg-secondary text-white">
                                                <i class="fas fa-ban me-1"></i> {{ trans('em.cancelled') || 'Cancelado' }}
                                            </span>
                                        </div>
                                    </td>
                                    <td class="align-middle text-capitalize" :data-title="trans('em.payment')">
                                        <span class="badge bg-secondary text-white" v-if="booking.payment_type == 'offline'">
                                            {{ booking.payment_type }} 
                                            <hr class="small p-0 m-0">
                                            <small class="text-white" v-if="booking.is_paid">{{ trans('em.paid') }}</small>
                                            <small class="text-white" v-else>{{ trans('em.unpaid') }}</small>
                                        </span>
                                        <span class="badge" :class="booking.is_paid ? 'bg-success' : 'bg-danger'" v-else>
                                            {{ booking.payment_type }} 
                                            <hr class="small p-0 m-0">
                                            <small class="text-white">{{ booking.is_paid ? trans('em.paid') : trans('em.unpaid') }}</small>
                                        </span>
                                    </td>
                                    <td class="align-middle" :data-title="trans('em.checked_in')">
                                        <p v-if="booking.checkins.length > 0"> 
                                            <span class="badge bg-success text-white fw-normal py-1 my-1" v-for="checkin in booking.checkins" :key="checkin.id">
                                                <i class="fa-solid fa-check-circle"></i> 
                                                {{ moment(userTimezone(checkin.event_start_date+' '+checkin.check_in_time,'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')).format(date_format.vue_date_format) }} 
                                                {{ userTimezone(checkin.event_start_date+' '+checkin.check_in_time, 'YYYY-MM-DD HH:mm:ss').format(date_format.vue_time_format) }}
                                            </span>
                                        </p>
                                    </td>
                                    <td class="align-middle" :data-title="trans('em.status')">
                                        <span class="badge bg-success text-white" v-if="booking.status == 1 && booking.expired == 0">{{ trans('em.active') }}</span>
                                        <span class="badge bg-danger text-white" v-else>{{ trans('em.inactive') }}</span>
                                    </td>
                                    <td class="align-middle" :data-title="trans('em.cancellation')" v-if="booking.booking_cancel == 0 && booking.status == 1 && booking.checkins.length <= 0 && booking.expired == 0">
                                        <button type="button" class="btn btn-sm bg-danger text-white" @click="bookingCancel(booking.id, booking.ticket_id, booking.event_id )" 
                                        v-if="disable_booking_cancellation == null"
                                        ><i class="fas fa-ban"></i> {{ trans('em.cancel') }}</button>
                                        <p v-else>{{ trans('em.n/a') }}</p>
                                    </td>
                                    <td class="align-middle" :data-title="trans('em.cancellation')" v-else>
                                        <span class="badge bg-secondary text-white" v-if="booking.booking_cancel == 0">{{ trans('em.disabled') }}</span>
                                        <span class="badge bg-warning text-white" v-if="booking.booking_cancel == 1">{{ trans('em.pending') }}</span>
                                        <span class="badge bg-info text-white" v-if="booking.booking_cancel == 2">{{ trans('em.approved') }}</span>
                                        <span class="badge bg-secondary text-white" v-if="booking.booking_cancel == 3">{{ trans('em.refunded') }}</span>
                                    </td>
                                    
                                    <!-- check booking expired or not -->
                                    <td class="align-middle" :data-title="trans('em.expired')" v-if="booking.expired == 1">
                                        <span class="badge bg-danger text-white"> {{trans('em.expired')}} </span>
                                    </td>

                                    <td class="align-middle text-nowrap" :data-title="trans('em.actions')" v-else>
                                        <!-- Botão para abrir Modal do QR Code PIX -->
                                        <div v-if="booking.payment_type === 'mercadopago' && booking.mercadopago_transaction && booking.mercadopago_transaction.qr_code_base64 && !booking.is_paid" class="mb-2">
                                            <button type="button" class="btn btn-sm btn-warning text-white" @click="openPixModal(booking.id)">
                                                <i class="fas fa-qrcode"></i> PIX QR Code
                                            </button>
                                        </div>

                                        <!-- Botão para Retentar Pagamento (APENAS Cartão de Crédito/Débito Pendente ou Rejeitado) -->
                                        <div v-if="booking.payment_type === 'mercadopago' && booking.mercadopago_transaction && ['pending', 'rejected', 'cancelled'].includes(booking.mercadopago_transaction.status) && !booking.is_paid && isCardPayment(booking.mercadopago_transaction)" class="mb-2">
                                            <button type="button" class="btn btn-sm btn-info text-white" @click="retryPayment(booking)">
                                                <i class="fas fa-redo me-1"></i> {{ trans('em.retry_payment') || 'Retentar Pagamento' }}
                                            </button>
                                        </div>

                                        <div v-if="hide_ticket_download == null" class="mb-2">
                                            <a v-if="booking.is_paid == 1 && booking.status == 1 && booking.order_number" class="btn btn-sm bg-danger text-white" :href="downloadURL(booking.id, booking.order_number)"><i class="fas fa-download"></i> {{trans('em.ticket')}}</a>
                                            <span class="badge bg-danger text-white" v-else>
                                                <small v-if="booking.is_paid == 0 && booking.status == 1" class="text-white">{{ trans('em.unpaid') }}</small>
                                                <small v-else class="">{{ trans('em.disabled') }}</small>
                                            </span>
                                        </div>

                                        <div v-if="hide_google_calendar == null" class="mb-2">
                                            <create-google-event :booking="booking" :date_format="date_format"></create-google-event>
                                        </div>

                                        <div v-if="booking.online_location != null && booking.is_paid == 1 && booking.status == 1"> 
                                            <button type="button" class="btn btn-sm bg-parimary text-parimary" @click="booking_id = booking.id"><i class="fas fa-tv"></i> {{ trans('em.online') +' '+ trans('em.event') }}</button>
                                            <online-event  v-if="booking_id == booking.id" :online_location="booking.online_location" :booking_id="booking.id" ></online-event>
                                        </div>
                                    </td>
                                </tr>

                                <tr v-if="bookings.length <= 0">
                                    <td colspan="10" class="text-center align-middle">{{ trans('em.no_bookings') }}</td>
                                </tr>
                        
                            </tbody>
                        </table>
                    </div>
                    <div class="px-4 pb-4" v-if="bookings.length > 0">
                
                        <pagination-component v-if="pagination.last_page > 1" :pagination="pagination" :offset="pagination.total"  @paginate="getMyBookings()">
                        </pagination-component>
            
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Modais PIX QR Code - FORA DO CARD -->
    <div v-for="booking in bookings" :key="'modal-' + booking.id">
        <div v-if="booking.payment_type === 'mercadopago' && booking.mercadopago_transaction && booking.mercadopago_transaction.qr_code_base64" 
             class="modal fade" :id="'pixModal-' + booking.id" tabindex="-1" aria-labelledby="pixModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" style="max-height: 90vh;">
                <div class="modal-content">
                    <div :class="['modal-header', booking.is_paid ? 'bg-success' : 'bg-warning']">
                        <h5 class="modal-title text-white" id="pixModalLabel">
                            <i :class="booking.is_paid ? 'fas fa-check-circle' : 'fas fa-qrcode'"></i> 
                            {{ booking.is_paid ? trans('em.paid') : trans('em.pix_qr_code') }}
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <!-- QR Code -->
                            <div class="col-md-6 text-center mb-4">
                                <h6 class="mb-3">{{ trans('em.scan_qr_code') }}</h6>
                                <img :src="'data:image/png;base64,' + getCleanBase64(booking.mercadopago_transaction.qr_code_base64)" 
                                     alt="PIX QR Code" class="img-fluid border rounded" style="max-width: 300px;">
                                <!-- Se Pago -->
                                <div v-if="booking.is_paid || paymentConfirmed[booking.id]" class="mt-4 p-4 rounded" style="background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); border: 2px solid #28a745;">
                                    <div class="d-flex align-items-center justify-content-center mb-2">
                                        <i class="fas fa-check-circle text-success me-2" style="font-size: 1.2rem;"></i>
                                        <span class="text-dark fw-bold">{{ trans('em.payment_confirmed') || 'Pagamento Confirmado!' }}</span>
                                    </div>
                                    <div class="text-center">
                                        <span class="fw-bold" style="font-size: 1.5rem; color: #28a745; font-family: 'Courier New', monospace;">
                                            {{ userTimezone(booking.mercadopago_transaction.updated_at || booking.mercadopago_transaction.created_at, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm:ss') }}
                                        </span>
                                    </div>
                                    <!-- Botão para fechar modal e atualizar página -->
                                    <div class="text-center mt-3" v-if="paymentConfirmed[booking.id]">
                                        <button type="button" class="btn btn-success" @click="closeModalAndRefresh(booking.id)">
                                            <i class="fas fa-sync-alt me-2"></i>{{ trans('em.update_page') || 'Atualizar Página' }}
                                        </button>
                                    </div>
                                </div>

                                <!-- Se Expirado -->
                                <div v-else-if="isQrCodeExpired(booking.mercadopago_transaction.qr_code_expires_at)" class="mt-4 p-4 rounded" style="background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%); border: 2px solid #dc3545;">
                                    <div class="d-flex align-items-center justify-content-center mb-2">
                                        <i class="fas fa-times-circle text-danger me-2" style="font-size: 1.2rem;"></i>
                                        <span class="text-dark fw-bold">{{ trans('em.expired') }}</span>
                                    </div>
                                    <div class="text-center">
                                        <span class="fw-bold" style="font-size: 1.5rem; color: #dc3545;">
                                            QR Code Expirado
                                        </span>
                                    </div>
                                </div>

                                <!-- Se Pendente -->
                                <div v-else class="mt-4 p-4 rounded" style="background: linear-gradient(135deg, #fff3cd 0%, #ffe69c 100%); border: 2px solid #ffc107;">
                                    <div class="d-flex align-items-center justify-content-center mb-2">
                                        <i class="fas fa-hourglass-end text-warning me-2" style="font-size: 1.2rem;"></i>
                                        <span class="text-dark fw-bold">{{ trans('em.expires_in') }}</span>
                                    </div>
                                    <div class="text-center">
                                        <span class="fw-bold" style="font-size: 2.5rem; color: #d32f2f; font-family: 'Courier New', monospace;" :key="timerTrigger">
                                            {{ getTimeRemaining(booking.mercadopago_transaction.qr_code_expires_at) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!-- Código PIX -->
                            <div class="col-md-6">
                                <h6 class="mb-3">{{ trans('em.pix_copy_paste') }}</h6>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" :value="booking.mercadopago_transaction.qr_code" readonly :disabled="booking.is_paid || isQrCodeExpired(booking.mercadopago_transaction.qr_code_expires_at)">
                                    <button class="btn btn-outline-primary" type="button" @click="copyToClipboard(booking.mercadopago_transaction.qr_code)" :disabled="booking.is_paid || isQrCodeExpired(booking.mercadopago_transaction.qr_code_expires_at)">
                                        <i class="fas fa-copy"></i> {{ trans('em.copy') }}
                                    </button>
                                </div>
                                <small class="text-muted d-block" v-if="!booking.is_paid && !isQrCodeExpired(booking.mercadopago_transaction.qr_code_expires_at)">{{ trans('em.pix_instructions') }}</small>
                                <small class="text-danger d-block fw-bold" v-else-if="isQrCodeExpired(booking.mercadopago_transaction.qr_code_expires_at)">QR Code expirado - não é possível copiar</small>
                                <small class="text-success d-block fw-bold" v-else>Pagamento já foi realizado</small>

                                <!-- Informações do Pedido -->
                                <div class="mt-4 p-3 bg-light rounded">
                                    <h6 class="mb-3">{{ trans('em.order_details') }}</h6>
                                    <div class="row">
                                        <div class="col-6">
                                            <small class="text-muted">{{ trans('em.order_id') }}</small>
                                            <p class="fw-bold">#{{ booking.order_number }}</p>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-muted">{{ trans('em.order_total') }}</small>
                                            <p class="fw-bold">{{ currency }} {{ booking.net_price }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ trans('em.close') }}</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>


<script>

import { Modal } from 'bootstrap';
import PaginationComponent from '../../common_components/Pagination.vue'
import mixinsFilters from '../../mixins.js';
import OnlineEvent from './OnlineEvent.vue';
import CreateGoogleEvent from './CreateGoogleEvent.vue';

export default {
    
    mixins:[
        mixinsFilters
    ],

    props: [
        // pagination query string
        'page',
        'is_success',
        'date_format',
        'disable_booking_cancellation',
        'hide_ticket_download',
        'hide_google_calendar',
        
    ],
    
    components: {
        PaginationComponent,
        OnlineEvent,
        CreateGoogleEvent
    },
    
    data() {
        return {
            bookings : [],
            moment   : moment,
            pagination: {
                'current_page': 1
            },
            currency : null,
            booking_id : 0,
            timerInterval: null,
            timerCounter: 0,
            // 🔄 Controle de polling PIX
            paymentPolling: {},
            paymentConfirmed: {},
            pollingIntervals: {},
        }
    },

    computed: {
        current_page() {
            // get page from route
            if(typeof this.page === "undefined")
                return 1;
            return this.page;
        },
        timerTrigger() {
            // Dummy computed property to trigger re-render
            return this.timerCounter;
        }
    },

    methods:{
          // get all events
        getMyBookings() {
            
            axios.get(route('eventmie.mybookings')+'?page='+this.current_page)
            .then(res => {
                this.currency   = res.data.currency;
                this.bookings   = res.data.bookings.data;
                this.pagination = {
                    'total' : res.data.bookings.total,
                    'per_page' : res.data.bookings.per_page,
                    'current_page' : res.data.bookings.current_page,
                    'last_page' : res.data.bookings.last_page,
                    'from' : res.data.bookings.from,
                    'to' : res.data.bookings.to,
                    'links' : res.data.bookings.links
                };
            })
            .catch(error => {
                
            });
        },

        // cancel my booking
        bookingCancel(booking_id, ticket_id, event_id) {
            this.showConfirm(trans('em.ask_cancel_booking')).then((res) => {
                if(res) {
                    axios.post(route('eventmie.mybookings_cancel'),{
                        booking_id : booking_id,
                        ticket_id  : ticket_id,
                        event_id   : event_id,
                    })
                    .then(res => {
                        if(res.data.status)
                        {
                            this.showNotification('success', trans('em.booking_cancel_success'));
                            this.getMyBookings();
                        }    
                    })
                    .catch(error => {});
                }
            })
        },

        // return route with event slug
        eventSlug(slug) {
            if(slug) {
                return route('eventmie.events_show',[slug]);
            }
        },

        // return route with download URL
        downloadURL(id, order_number) {
            if(id && order_number) {
                return route('eventmie.downloads_index',[id, order_number]);
            }
        },

        // Calcular tempo restante para expiração do QR Code (HH:MM:SS)
        getTimeRemaining(expiresAt) {
            if (!expiresAt) return '00:00:00';
            
            const now = moment();
            const expiration = moment(expiresAt);
            const diff = expiration.diff(now);
            
            if (diff <= 0) return '00:00:00';
            
            const duration = moment.duration(diff);
            const hours = Math.floor(duration.asHours());
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        },

        // Copiar código PIX para clipboard
        copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('success', trans('em.copied_to_clipboard'));
            }).catch(() => {
                alert('Erro ao copiar para a área de transferência');
            });
        },

        // Limpar base64 removendo prefixo data:image se existir
        getCleanBase64(base64String) {
            if (!base64String) return '';
            if (base64String.startsWith('data:image')) {
                return base64String.replace(/^data:image\/[^;]+;base64,/, '');
            }
            return base64String;
        },

        // Abrir modal do PIX
        openPixModal(bookingId) {
            const modalElement = document.getElementById('pixModal-' + bookingId);
            if (modalElement) {
                const modal = new Modal(modalElement);
                modal.show();
                
                // 🔄 Iniciar polling de status do pagamento
                this.startPaymentPolling(bookingId);
                
                // 🎧 Listener para parar polling quando modal fechar
                modalElement.addEventListener('hidden.bs.modal', () => {
                    this.stopPaymentPolling(bookingId);
                });
            } else {
                console.error('Modal não encontrado:', 'pixModal-' + bookingId);
            }
        },

        // Verificar se QR Code expirou
        isQrCodeExpired(expiresAt) {
            if (!expiresAt) return false;
            const now = moment();
            const expiration = moment(expiresAt);
            return now.isAfter(expiration);
        },

        // Verificar se é pagamento com cartão (crédito ou débito)
        isCardPayment(transaction) {
            if (!transaction || !transaction.payment_method_type) return false;
            return ['credit_card', 'debit_card'].includes(transaction.payment_method_type);
        },

        // Retentar pagamento (débito/crédito pendente ou rejeitado)
        retryPayment(booking) {
            // Armazenar dados do booking na sessão para retentar pagamento
            const retryData = {
                booking_id: booking.id,
                event_id: booking.event_id,
                ticket_id: booking.ticket_id,
                ticket_title: booking.ticket_title,
                net_price: booking.net_price,
                transaction_id: booking.mercadopago_transaction?.id,
                event_slug: booking.event_slug
            };
            
            // Salvar na localStorage para recuperar na página do evento
            localStorage.setItem('mercadopago_retry_payment', JSON.stringify(retryData));
            
            this.showNotification('info', trans('em.opening_checkout') || 'Abrindo formulário de pagamento...');
            
            // Redirecionar para a página do evento
            setTimeout(() => {
                window.location.href = route('eventmie.events_show', [booking.event_slug]);
            }, 500);
        },

        // 🔄 Iniciar polling de status do pagamento PIX
        startPaymentPolling(bookingId) {
            // Encontrar o booking e sua transação
            const booking = this.bookings.find(b => b.id === bookingId);
            if (!booking || !booking.mercadopago_transaction) {
                console.warn('Booking ou transação não encontrada para polling:', bookingId);
                return;
            }

            const transactionId = booking.mercadopago_transaction.id;
            console.log('🔄 Iniciando polling para transação:', transactionId);

            // Marcar como em polling
            this.$set(this.paymentPolling, bookingId, true);

            // Criar intervalo de polling (verificar a cada 3 segundos)
            const interval = setInterval(() => {
                this.checkPaymentStatus(bookingId, transactionId);
            }, 3000);

            // Armazenar referência do intervalo
            this.$set(this.pollingIntervals, bookingId, interval);

            // Parar polling após 10 minutos (600 segundos)
            setTimeout(() => {
                this.stopPaymentPolling(bookingId);
            }, 600000);
        },

        // 🛑 Parar polling de status do pagamento
        stopPaymentPolling(bookingId) {
            if (this.pollingIntervals[bookingId]) {
                clearInterval(this.pollingIntervals[bookingId]);
                delete this.pollingIntervals[bookingId];
                console.log('🛑 Polling parado para booking:', bookingId);
            }
            this.$set(this.paymentPolling, bookingId, false);
        },

        // 📡 Verificar status do pagamento via API
        checkPaymentStatus(bookingId, transactionId) {
            axios.get(`/api/mercadopago/transaction/${transactionId}/status`)
                .then(response => {
                    console.log('📡 Status da transação:', response.data);
                    
                    if (response.data.status && response.data.data) {
                        const { transaction_status, is_paid } = response.data.data;
                        
                        // Se pagamento foi aprovado
                        if (transaction_status === 'approved' && is_paid) {
                            console.log('✅ Pagamento confirmado via polling!');
                            
                            // Marcar como confirmado
                            this.$set(this.paymentConfirmed, bookingId, true);
                            
                            // Parar polling
                            this.stopPaymentPolling(bookingId);
                            
                            // Mostrar notificação
                            this.showNotification('success', 'Pagamento confirmado! 🎉');
                            
                            // Atualizar dados do booking
                            const booking = this.bookings.find(b => b.id === bookingId);
                            if (booking) {
                                booking.is_paid = true;
                                booking.mercadopago_transaction.status = 'approved';
                            }
                        }
                    }
                })
                .catch(error => {
                    console.warn('⚠️ Erro ao verificar status:', error);
                });
        },

        // 🔄 Fechar modal e atualizar página
        closeModalAndRefresh(bookingId) {
            // Fechar modal
            const modalElement = document.getElementById('pixModal-' + bookingId);
            if (modalElement) {
                const modal = Modal.getInstance(modalElement);
                if (modal) {
                    modal.hide();
                }
            }
            
            // Parar polling
            this.stopPaymentPolling(bookingId);
            
            // Atualizar página após 1 segundo
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        },
    },
    mounted() {
        this.getMyBookings();
        
        // send email after successful bookings
        this.sendEmail();
        
        // Iniciar timer para atualizar contagem regressiva a cada segundo
        this.timerInterval = setInterval(() => {
            this.timerCounter++;
        }, 1000);
    },

    beforeUnmount() {
        // Limpar timer ao desmontar o componente
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        
        // 🧹 Limpar todos os intervalos de polling
        Object.keys(this.pollingIntervals).forEach(bookingId => {
            this.stopPaymentPolling(parseInt(bookingId));
        });
    }
}
</script>


