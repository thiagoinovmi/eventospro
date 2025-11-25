<template>
    <div>
        <!-- Container principal -->
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
                                        <th class="border-top-0 border-bottom-0">{{ trans('em.quantity') }}</th>
                                        <th class="border-top-0 border-bottom-0">{{ trans('em.price') }}</th>
                                        <th class="border-top-0 border-bottom-0">{{ trans('em.payment_status') }}</th>
                                        <th class="border-top-0 border-bottom-0">{{ trans('em.action') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="booking in bookings" :key="booking.id">
                                        <td>{{ booking.event_title }}</td>
                                        <td>{{ booking.ticket_title }}</td>
                                        <td>{{ booking.quantity }}</td>
                                        <td>{{ currency }} {{ booking.net_price }}</td>
                                        <td>
                                            <span v-if="booking.is_paid" class="badge bg-success">{{ trans('em.paid') }}</span>
                                            <span v-else class="badge bg-danger">{{ trans('em.pending') }}</span>
                                        </td>
                                        <td>
                                            <button v-if="!booking.is_paid && isCardPayment(booking.mercadopago_transaction)" 
                                                    @click="retryPayment(booking)" 
                                                    class="btn btn-sm btn-warning">
                                                <i class="fas fa-redo me-1"></i>{{ trans('em.retry_payment') || 'Retentar Pagamento' }}
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de Retry de Pagamento -->
        <div class="modal fade" id="retryPaymentModal" tabindex="-1" aria-labelledby="retryPaymentModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="retryPaymentModalLabel">
                            <i class="fas fa-redo me-2"></i>{{ trans('em.retry_payment') || 'Retentar Pagamento' }}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div v-if="!selectedBookingForRetry" class="text-center p-4">
                            <p class="text-muted">Carregando dados do pagamento...</p>
                        </div>
                        <div v-else>
                            <h6>Dados do Pedido:</h6>
                            <p><strong>Evento:</strong> {{ selectedBookingForRetry.event_title }}</p>
                            <p><strong>Ingresso:</strong> {{ selectedBookingForRetry.ticket_title }}</p>
                            <p><strong>Valor:</strong> {{ currency }} {{ selectedBookingForRetry.net_price }}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
    data() {
        return {
            bookings: [],
            currency: '$',
            selectedBookingForRetry: null
        }
    },
    
    mounted() {
        this.getMyBookings();
        
        // Debug: verificar se modal existe após montagem
        this.$nextTick(() => {
            const modalElement = document.getElementById('retryPaymentModal');
            console.log('🔍 Modal no mounted:', modalElement);
            console.log('🔍 Todos os modais:', document.querySelectorAll('.modal'));
        });
    },
    
    methods: {
        async getMyBookings() {
            try {
                const response = await axios.get('/mybookings/api/get_mybookings');
                if (response.data.status && response.data.bookings) {
                    this.bookings = response.data.bookings.data || [];
                    this.currency = response.data.currency || '$';
                }
            } catch (error) {
                console.error('Erro ao carregar bookings:', error);
            }
        },

        isCardPayment(transaction) {
            if (!transaction || !transaction.payment_method_type) return false;
            return ['credit_card', 'debit_card'].includes(transaction.payment_method_type);
        },

        async retryPayment(booking) {
            try {
                console.log('🚀 Iniciando retry para booking:', booking.id);
                
                this.selectedBookingForRetry = booking;
                console.log('📋 selectedBookingForRetry definido:', this.selectedBookingForRetry);
                
                this.$nextTick(() => {
                    console.log('🔍 Procurando modal de retry...');
                    const modalElement = document.getElementById('retryPaymentModal');
                    console.log('📋 Modal element:', modalElement);
                    
                    if (modalElement) {
                        console.log('✅ Modal encontrado, abrindo...');
                        const modal = new Modal(modalElement);
                        modal.show();
                    } else {
                        console.error('❌ Modal de retry não encontrado');
                        console.log('🔍 Todos os elementos com ID:', document.querySelectorAll('[id]'));
                    }
                });
                
            } catch (error) {
                console.error('Erro ao abrir modal de retry:', error);
            }
        }
    }
}
</script>
