<template>
    <div class="mercadopago-admin-transactions">
        <!-- Header -->
        <div class="row mb-4">
            <div class="col-md-8">
                <h3 class="mb-0">
                    <i class="fas fa-credit-card"></i> {{ trans('em.mercadopago_transactions') }}
                </h3>
            </div>
            <div class="col-md-4">
                <div class="input-group">
                    <input 
                        v-model="searchQuery" 
                        type="text" 
                        class="form-control" 
                        :placeholder="trans('em.search')"
                        @keyup="searchTransactions"
                    >
                    <button class="btn btn-outline-secondary" type="button" @click="resetFilters">
                        <i class="fas fa-redo"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Filters -->
        <div class="row mb-4">
            <div class="col-md-3">
                <label class="form-label">{{ trans('em.status') }}</label>
                <select v-model="filters.status" class="form-select" @change="loadTransactions">
                    <option value="">{{ trans('em.all') }}</option>
                    <option value="pending">{{ trans('em.pending') }}</option>
                    <option value="approved">{{ trans('em.approved') }}</option>
                    <option value="rejected">{{ trans('em.rejected') }}</option>
                    <option value="refunded">{{ trans('em.refunded') }}</option>
                </select>
            </div>
            <div class="col-md-3">
                <label class="form-label">{{ trans('em.payment_method') }}</label>
                <select v-model="filters.payment_method" class="form-select" @change="loadTransactions">
                    <option value="">{{ trans('em.all') }}</option>
                    <option value="credit_card">{{ trans('em.mercadopago_credit_card') }}</option>
                    <option value="debit_card">{{ trans('em.mercadopago_debit_card') }}</option>
                    <option value="boleto">{{ trans('em.mercadopago_boleto') }}</option>
                    <option value="pix">{{ trans('em.mercadopago_pix') }}</option>
                </select>
            </div>
            <div class="col-md-3">
                <label class="form-label">{{ trans('em.date_from') }}</label>
                <input v-model="filters.date_from" type="date" class="form-control" @change="loadTransactions">
            </div>
            <div class="col-md-3">
                <label class="form-label">{{ trans('em.date_to') }}</label>
                <input v-model="filters.date_to" type="date" class="form-control" @change="loadTransactions">
            </div>
        </div>

        <!-- Stats -->
        <div class="row mb-4">
            <div class="col-md-3">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="card-title text-muted">{{ trans('em.total_transactions') }}</h6>
                        <h3 class="mb-0">{{ stats.total_transactions }}</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="card-title text-muted">{{ trans('em.total_approved') }}</h6>
                        <h3 class="mb-0 text-success">R$ {{ formatCurrency(stats.total_approved) }}</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="card-title text-muted">{{ trans('em.total_refunded') }}</h6>
                        <h3 class="mb-0 text-danger">R$ {{ formatCurrency(stats.total_refunded) }}</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card bg-light">
                    <div class="card-body">
                        <h6 class="card-title text-muted">{{ trans('em.pending_refunds') }}</h6>
                        <h3 class="mb-0 text-warning">{{ stats.pending_refunds }}</h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">{{ trans('em.loading') }}...</span>
            </div>
        </div>

        <!-- Transactions Table -->
        <div v-else class="table-responsive">
            <table class="table table-hover table-striped">
                <thead class="table-dark">
                    <tr>
                        <th>{{ trans('em.transaction_id') }}</th>
                        <th>{{ trans('em.user') }}</th>
                        <th>{{ trans('em.booking') }}</th>
                        <th>{{ trans('em.amount') }}</th>
                        <th>{{ trans('em.payment_method') }}</th>
                        <th>{{ trans('em.status') }}</th>
                        <th>{{ trans('em.date') }}</th>
                        <th>{{ trans('em.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in transactions" :key="transaction.id">
                        <td>
                            <code>#{{ transaction.id }}</code>
                        </td>
                        <td>
                            <small>{{ transaction.booking?.user?.name || 'N/A' }}</small>
                        </td>
                        <td>
                            <small>{{ transaction.booking?.event?.title || 'N/A' }}</small>
                        </td>
                        <td>
                            <strong>R$ {{ formatCurrency(transaction.amount) }}</strong>
                        </td>
                        <td>
                            <span class="badge bg-info">
                                {{ getPaymentMethodLabel(transaction.payment_method_type) }}
                            </span>
                        </td>
                        <td>
                            <span :class="getStatusBadgeClass(transaction.status)">
                                {{ getStatusLabel(transaction.status) }}
                            </span>
                        </td>
                        <td>
                            <small>{{ formatDate(transaction.created_at) }}</small>
                        </td>
                        <td>
                            <div class="btn-group btn-group-sm" role="group">
                                <button 
                                    type="button" 
                                    class="btn btn-outline-primary"
                                    @click="viewDetails(transaction)"
                                    title="{{ trans('em.view_details') }}"
                                >
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button 
                                    v-if="transaction.status === 'approved' && !transaction.refund_id"
                                    type="button" 
                                    class="btn btn-outline-danger"
                                    @click="openRefundModal(transaction)"
                                    title="{{ trans('em.request_refund') }}"
                                >
                                    <i class="fas fa-undo"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <nav v-if="totalPages > 1" aria-label="Page navigation" class="mt-4">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                    <button class="page-link" @click="previousPage" :disabled="currentPage === 1">
                        {{ trans('em.previous') }}
                    </button>
                </li>
                <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: currentPage === page }">
                    <button class="page-link" @click="goToPage(page)">{{ page }}</button>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                    <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">
                        {{ trans('em.next') }}
                    </button>
                </li>
            </ul>
        </nav>

        <!-- Details Modal -->
        <div v-if="selectedTransaction" class="modal fade show d-block" style="background-color: rgba(0,0,0,0.5);">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            {{ trans('em.transaction_details') }} #{{ selectedTransaction.id }}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" @click="selectedTransaction = null"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <h6 class="text-muted">{{ trans('em.transaction_id') }}</h6>
                                <p class="mb-3"><code>#{{ selectedTransaction.id }}</code></p>

                                <h6 class="text-muted">{{ trans('em.user') }}</h6>
                                <p class="mb-3">{{ selectedTransaction.booking?.user?.name }}</p>

                                <h6 class="text-muted">{{ trans('em.email') }}</h6>
                                <p class="mb-3">{{ selectedTransaction.payer_email }}</p>
                            </div>
                            <div class="col-md-6">
                                <h6 class="text-muted">{{ trans('em.amount') }}</h6>
                                <p class="mb-3"><strong>R$ {{ formatCurrency(selectedTransaction.amount) }}</strong></p>

                                <h6 class="text-muted">{{ trans('em.status') }}</h6>
                                <p class="mb-3">
                                    <span :class="getStatusBadgeClass(selectedTransaction.status)">
                                        {{ getStatusLabel(selectedTransaction.status) }}
                                    </span>
                                </p>

                                <h6 class="text-muted">{{ trans('em.date') }}</h6>
                                <p class="mb-3">{{ formatDateTime(selectedTransaction.created_at) }}</p>
                            </div>
                        </div>

                        <hr>

                        <div class="row">
                            <div class="col-md-6">
                                <h6 class="text-muted">{{ trans('em.payment_method') }}</h6>
                                <p class="mb-3">{{ getPaymentMethodLabel(selectedTransaction.payment_method_type) }}</p>

                                <h6 class="text-muted">{{ trans('em.installments') }}</h6>
                                <p class="mb-3">{{ selectedTransaction.installments }}x</p>
                            </div>
                            <div class="col-md-6">
                                <h6 class="text-muted">{{ trans('em.payment_id') }}</h6>
                                <p class="mb-3"><code>{{ selectedTransaction.payment_id }}</code></p>

                                <h6 class="text-muted">{{ trans('em.booking') }}</h6>
                                <p class="mb-3">{{ selectedTransaction.booking?.event?.title }}</p>
                            </div>
                        </div>

                        <div v-if="selectedTransaction.refund_id" class="alert alert-warning mt-3">
                            <h6 class="alert-heading">{{ trans('em.refund_info') }}</h6>
                            <p class="mb-2">
                                <strong>{{ trans('em.refund_amount') }}:</strong> R$ {{ formatCurrency(selectedTransaction.refund_amount) }}
                            </p>
                            <p class="mb-0">
                                <strong>{{ trans('em.refund_status') }}:</strong>
                                <span :class="getStatusBadgeClass(selectedTransaction.refund_status)">
                                    {{ getStatusLabel(selectedTransaction.refund_status) }}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="selectedTransaction = null">
                            {{ trans('em.close') }}
                        </button>
                        <button 
                            v-if="selectedTransaction.status === 'approved' && !selectedTransaction.refund_id"
                            type="button" 
                            class="btn btn-danger"
                            @click="openRefundModal(selectedTransaction)"
                        >
                            <i class="fas fa-undo"></i> {{ trans('em.request_refund') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Refund Modal -->
        <div v-if="showRefundModal" class="modal fade show d-block" style="background-color: rgba(0,0,0,0.5);">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-danger text-white">
                        <h5 class="modal-title">{{ trans('em.request_refund') }}</h5>
                        <button type="button" class="btn-close btn-close-white" @click="showRefundModal = false"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">{{ trans('em.transaction_id') }}</label>
                            <input type="text" class="form-control" :value="'#' + refundTransaction?.id" disabled>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">{{ trans('em.refund_amount') }}</label>
                            <div class="input-group">
                                <span class="input-group-text">R$</span>
                                <input 
                                    v-model="refundForm.amount" 
                                    type="number" 
                                    class="form-control" 
                                    :max="refundTransaction?.amount"
                                    step="0.01"
                                    :placeholder="formatCurrency(refundTransaction?.amount)"
                                >
                            </div>
                            <small class="text-muted">
                                {{ trans('em.max_amount') }}: R$ {{ formatCurrency(refundTransaction?.amount) }}
                            </small>
                        </div>

                        <div class="mb-3">
                            <label class="form-label">{{ trans('em.refund_reason') }}</label>
                            <textarea 
                                v-model="refundForm.reason" 
                                class="form-control" 
                                rows="3"
                                :placeholder="trans('em.explain_reason')"
                            ></textarea>
                        </div>

                        <div v-if="refundError" class="alert alert-danger" role="alert">
                            {{ refundError }}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="showRefundModal = false">
                            {{ trans('em.cancel') }}
                        </button>
                        <button 
                            type="button" 
                            class="btn btn-danger"
                            @click="submitRefund"
                            :disabled="refundLoading"
                        >
                            <span v-if="refundLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            {{ trans('em.submit_refund') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment-timezone';

export default {
    name: 'MercadoPagoAdminTransactions',
    data() {
        return {
            transactions: [],
            loading: true,
            currentPage: 1,
            totalPages: 1,
            searchQuery: '',
            filters: {
                status: '',
                payment_method: '',
                date_from: '',
                date_to: ''
            },
            stats: {
                total_transactions: 0,
                total_approved: 0,
                total_refunded: 0,
                pending_refunds: 0
            },
            selectedTransaction: null,
            showRefundModal: false,
            refundTransaction: null,
            refundForm: {
                amount: null,
                reason: ''
            },
            refundLoading: false,
            refundError: null
        };
    },
    mounted() {
        this.loadTransactions();
        this.loadStats();
    },
    methods: {
        loadTransactions() {
            this.loading = true;
            const url = route('eventmie.mercadopago_admin_transactions', { page: this.currentPage });

            const params = {
                page: this.currentPage,
                search: this.searchQuery,
                ...this.filters
            };

            axios.get(url, { params })
                .then(res => {
                    if (res.data.status) {
                        this.transactions = res.data.data.data || [];
                        this.totalPages = res.data.data.last_page || 1;
                        this.currentPage = res.data.data.current_page || 1;
                    }
                    this.loading = false;
                })
                .catch(error => {
                    console.error('Error loading transactions:', error);
                    this.loading = false;
                });
        },

        loadStats() {
            const url = route('eventmie.mercadopago_admin_stats');

            axios.get(url)
                .then(res => {
                    if (res.data.status) {
                        this.stats = res.data.data;
                    }
                })
                .catch(error => {
                    console.error('Error loading stats:', error);
                });
        },

        searchTransactions() {
            this.currentPage = 1;
            this.loadTransactions();
        },

        resetFilters() {
            this.searchQuery = '';
            this.filters = {
                status: '',
                payment_method: '',
                date_from: '',
                date_to: ''
            };
            this.currentPage = 1;
            this.loadTransactions();
        },

        viewDetails(transaction) {
            this.selectedTransaction = transaction;
        },

        openRefundModal(transaction) {
            this.refundTransaction = transaction;
            this.refundForm.amount = transaction.amount;
            this.refundForm.reason = '';
            this.refundError = null;
            this.showRefundModal = true;
            this.selectedTransaction = null;
        },

        submitRefund() {
            if (!this.refundForm.reason.trim()) {
                this.refundError = trans('em.reason_required');
                return;
            }

            this.refundLoading = true;
            const url = route('eventmie.mercadopago_refund');

            axios.post(url, {
                transaction_id: this.refundTransaction.id,
                amount: this.refundForm.amount || this.refundTransaction.amount,
                reason: this.refundForm.reason
            })
                .then(res => {
                    if (res.data.status) {
                        Vue.helpers.showToast('success', trans('em.refund_requested'));
                        this.showRefundModal = false;
                        this.loadTransactions();
                        this.loadStats();
                    } else {
                        this.refundError = res.data.message || trans('em.refund_error');
                    }
                    this.refundLoading = false;
                })
                .catch(error => {
                    console.error('Error requesting refund:', error);
                    this.refundError = trans('em.error_requesting_refund');
                    this.refundLoading = false;
                });
        },

        formatCurrency(value) {
            return parseFloat(value).toFixed(2).replace('.', ',');
        },

        formatDate(date) {
            return moment(date).format('DD/MM/YYYY');
        },

        formatDateTime(date) {
            return moment(date).format('DD/MM/YYYY HH:mm:ss');
        },

        getPaymentMethodLabel(method) {
            const methods = {
                'credit_card': trans('em.mercadopago_credit_card'),
                'debit_card': trans('em.mercadopago_debit_card'),
                'boleto': trans('em.mercadopago_boleto'),
                'pix': trans('em.mercadopago_pix'),
                'wallet': trans('em.mercadopago_wallet')
            };
            return methods[method] || method;
        },

        getStatusLabel(status) {
            const statuses = {
                'pending': trans('em.pending'),
                'authorized': trans('em.authorized'),
                'approved': trans('em.approved'),
                'rejected': trans('em.rejected'),
                'cancelled': trans('em.cancelled'),
                'refunded': trans('em.refunded')
            };
            return statuses[status] || status;
        },

        getStatusBadgeClass(status) {
            const classes = {
                'pending': 'badge bg-warning',
                'authorized': 'badge bg-info',
                'approved': 'badge bg-success',
                'rejected': 'badge bg-danger',
                'cancelled': 'badge bg-secondary',
                'refunded': 'badge bg-info'
            };
            return classes[status] || 'badge bg-secondary';
        },

        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadTransactions();
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.loadTransactions();
            }
        },

        goToPage(page) {
            this.currentPage = page;
            this.loadTransactions();
        }
    }
};
</script>

<style scoped>
.mercadopago-admin-transactions {
    padding: 20px 0;
}

.table-hover tbody tr:hover {
    background-color: #f5f5f5;
}

.modal.show {
    display: block;
}

.btn-group-sm .btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
}

code {
    background-color: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.875rem;
}

.card {
    border: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>
