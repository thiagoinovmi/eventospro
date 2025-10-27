<template>
    <div>
        <!-- Overlay for scan result or manual details -->
        <div v-if="showResult || showManualDetails" :class="['scanner-result-overlay', resultType, { 'bg-success': resultType === 'success', 'bg-warning': resultType === 'warning', 'bg-danger': resultType === 'error' }]">
            <template v-if="showManualDetails">
                <div class="scanner-event-header">
                    <p class="strong mb-0 text-black">{{ manualData.event_title }}</p>
                </div>
                <div v-for="ticket in manualData.tickets" :key="ticket.ticket_id" class="scanner-ticket-block">
                    <div class="scanner-ticket-badge"><i class="fas fa-ticket"></i> {{ ticket.ticket_title }}</div><br>
                    <div class="scanner-attendee-list" v-if="manualData.is_checked_in">
                        <div class="scanner-attendee-name">
                            <small class="strong fw-bold fs-6">
                                {{ trans('em.checked_in_at') }}: {{ manualData.checkin_date }} {{ manualData.checkin_time }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="scanner-customer-block">
                    <div class="scanner-customer-badge">{{ trans('em.buyer') }}</div>
                    <div class="scanner-customer-name text-dark">{{ manualData.customer_name }}</div>
                    <div class="scanner-customer-email text-dark">{{ manualData.customer_email }}</div>
                </div>
                <div class="d-flex justify-content-center mb-4">
                    <button v-if="!manualData.is_checked_in" class="btn btn-lg btn-success px-5 py-3 fw-bold" :disabled="processing" @click="verifyAndCheckinManual"><i class="fas fa-circle-check"></i> {{ trans('em.verify_and_checkin') }}</button>
                    <div v-else class="alert alert-warning mb-0">
                        <i class="fas fa-info-circle me-2"></i>{{ trans('em.ticket_already_checked_in') }}
                    </div>
                </div>
                <div v-if="manualError" class="scanner-error-message">{{ manualError }}</div>
                <div class="d-flex justify-content-center mt-3">
                    <button class="btn btn-secondary px-4 py-2" @click="refreshPage">
                        <i class="fas fa-sync-alt me-2"></i>{{ trans('em.scan_another_ticket') }}
                    </button>
                </div>
            </template>
            <template v-else-if="showResult">
                <template v-if="resultType === 'success' || resultType === 'warning'">
                    <div class="scanner-event-header">
                        <p class="small strong fs-6 mb-0">{{ resultData.event_title }}</p>
                        <i class="fas fa-check-circle" v-if="resultType === 'success'"></i> 
                        <i class="fas fa-exclamation-triangle" v-if="resultType === 'warning'"></i> 
                        {{ resultType === 'success' ? trans('em.checkin_successful') : trans('em.already_checked_in') }}
                    </div>
                    <div v-for="ticket in resultData.tickets" :key="ticket.ticket_id" class="scanner-ticket-block">
                        <div class="scanner-ticket-badge"><i class="fas fa-ticket"></i> {{ ticket.ticket_title }}</div><br>
                        <div class="scanner-attendee-list" v-if="resultType === 'warning'">
                            <div class="scanner-attendee-name">
                                <small class="strong fw-bold fs-6">
                                    {{ trans('em.checked_in_at') }}: {{ resultData.checkin_date }} {{ resultData.checkin_time }}
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="scanner-customer-block">
                        <div class="scanner-customer-badge">{{ trans('em.buyer') }}</div>
                        <div class="scanner-customer-name text-dark">{{ resultData.customer_name }}</div>
                        <div class="scanner-customer-email text-dark">{{ resultData.customer_email }}</div>
                    </div>
                    <div v-if="resultType === 'warning'" class="d-flex justify-content-center mt-3">
                        <button class="btn btn-secondary px-4 py-2" @click="refreshPage">
                            <i class="fas fa-sync-alt me-2"></i>{{ trans('em.scan_another_ticket') }}
                        </button>
                    </div>
                </template>
                <template v-else>
                    <div class="scanner-error-message">&nbsp;</div>
                    <div class="scanner-event-header">
                        <i class="fas fa-ban"></i>
                        {{ resultMessage }}
                    </div>
                </template>
            </template>
        </div>

        <!-- Camera/Scanner -->
        <div class="row scanner-wrapper" v-else>
            <div class="col-12" style="height: 90vh;">
                <qrcode-stream v-if="!is_laser && hide_scanner <= 0" :camera="camera" @decode="getOrderNumberFromQRCode" @init="onInit"></qrcode-stream>
                <input v-if="is_laser" ref="laserInput" v-model="laser_scanner" @change="getOrderNumberFromLaserInput" @blur="focusLaserInput" class="form-control" :placeholder="trans('em.scan_ticket_on_laser')" autofocus/>
            </div>
        </div>
    </div>
</template>

<script>
import mixinsFilters from '../../mixins';
import axios from 'axios';

export default {
    mixins:[
        mixinsFilters
    ],
    props: [
        'is_laser'
    ],
    data() {
        return {
            decodedContent  : '',
            errorMessage    : '',
            hide_scanner    : 0,
            booking         : [],
            camera: 'auto',
            showResult: false,
            resultType: '', // 'error', 'warning', 'success'
            resultMessage: '',
            resultTimeout: null,
            laser_scanner: '',
            processing: false,
            resultData: {}, // <-- for structured result
            // Manual mode
            showManualDetails: false,
            manualData: {},
            manualOrderNumber: '',
            manualError: '',
        }
    },
    methods: {
        onInit(promise) {
            promise.then(() => {
                console.log('Successfully initilized! Ready for scanning now!')
            })
            .catch(error => {
                if (error.name === 'NotAllowedError') {
                    this.errorMessage = trans('em.camera_access_required');
                } else if (error.name === 'NotFoundError') {
                    this.errorMessage = trans('em.camera_not_detected');
                } else if (error.name === 'NotSupportedError') {
                    this.errorMessage = trans('em.camera_https_required');
                } else if (error.name === 'NotReadableError') {
                    this.errorMessage = trans('em.camera_not_detected');
                } else if (error.name === 'OverconstrainedError') {
                    this.errorMessage = trans('em.camera_not_detected');
                } else {
                    this.errorMessage = trans('em.camera_not_detected');
                }
            })
        },
        getOrderNumberFromQRCode(content) {
            if (this.showResult || this.processing || this.showManualDetails) return;
            let order_number = '';
            if (this.isJSON(content)) {
                const parsed = JSON.parse(content);
                order_number = parsed.order_number || '';
            } else {
                order_number = content;
            }
            this.fetchManualDetails(order_number);
        },
        getOrderNumberFromLaserInput() {
            if (this.showResult || this.processing || this.showManualDetails) return;
            let order_number = '';
            if (this.isJSON(this.laser_scanner)) {
                const parsed = JSON.parse(this.laser_scanner);
                order_number = parsed.order_number || '';
            } else {
                order_number = this.laser_scanner;
            }
            this.laser_scanner = '';
            this.fetchManualDetails(order_number);
            this.focusLaserInput();
        },
        fetchManualDetails(order_number) {
            if (this.processing) return;
            if (!order_number || order_number.trim() === '') {
                return;
            }
            this.processing = true;
            this.manualError = '';
            this.manualOrderNumber = order_number;
            const payload = {
                order_number: order_number,
                scan_all: 1 // Always scan single for manual mode
            };
            const post_url = route('eventmie.get_booking_details');
            axios.post(post_url, payload)
                .then(res => {
                    if (res.data.status === true && res.data.flag === 'details') {
                        this.manualData = res.data;
                        this.showManualDetails = true;
                    } else {
                        this.manualData = {};
                        this.showManualDetails = false;
                        this.manualError = res.data.message || 'Unknown error';
                        this.showScanResult('error', this.manualError);
                    }
                })
                .catch(error => {
                    let msg = trans('em.unknown_error');
                    this.manualData = {};
                    this.showManualDetails = false;
                    if (error.response && error.response.data) {
                        if (error.response.data.message) {
                            msg = error.response.data.message;
                        } else if (error.response.data.errors) {
                            const errors = error.response.data.errors;
                            msg = Object.values(errors).flat().join(' ');
                        }
                    }
                    this.manualError = msg;
                    this.showScanResult('error', this.manualError);
                })
                .finally(() => {
                    this.processing = false;
                    this.focusLaserInput();
                });
        },
        verifyAndCheckinManual() {
            if (this.processing || !this.manualOrderNumber) return;
            this.processing = true;
            this.manualError = '';
            const payload = {
                order_number: this.manualOrderNumber,
                scan_all: 1 // Always scan single for manual mode
            };
            const post_url = route('eventmie.verify_and_checkin');
            axios.post(post_url, payload)
                .then(res => {
                    if (res.data.status === true) {
                        this.resultData = res.data;
                        this.showManualDetails = false;
                        this.showScanResult(res.data.flag === 'success' ? 'success' : 'warning', '');
                    } else {
                        this.resultData = {};
                        this.showManualDetails = false;
                        this.showScanResult('error', res.data.message || 'Unknown error');
                    }
                })
                .catch(error => {
                    let msg = trans('em.unknown_error');
                    this.resultData = {};
                    this.showManualDetails = false;
                    if (error.response && error.response.data) {
                        if (error.response.data.message) {
                            msg = error.response.data.message;
                        } else if (error.response.data.errors) {
                            const errors = error.response.data.errors;
                            msg = Object.values(errors).flat().join(' ');
                        }
                    }
                    this.showScanResult('error', msg);
                })
                .finally(() => {
                    this.processing = false;
                    this.focusLaserInput();
                });
        },
        showScanResult(type, message) {
            this.showResult = true;
            this.resultType = type;
            this.resultMessage = message;
            this.hide_scanner = 1;
            this.showManualDetails = false;
            // Reset after 3 seconds
            clearTimeout(this.resultTimeout);
            this.resultTimeout = setTimeout(() => {
                this.showResult = false;
                this.resultType = '';
                this.resultMessage = '';
                this.resultData = {};
                this.hide_scanner = 0;
                this.showManualDetails = false;
                this.manualData = {};
                this.manualOrderNumber = '';
                this.manualError = '';
                this.focusLaserInput();
            }, 3000);
        },
        isJSON(str) {
            try {
                const parsed = JSON.parse(str);
                return typeof parsed === 'object' && parsed !== null;
            } catch (e) {
                console.log(e, 'error');
                return false;
            }
        },
        focusLaserInput() {
            this.$nextTick(() => {
                if (this.is_laser && this.$refs.laserInput) {
                    this.$refs.laserInput.focus();
                }
            });
        },
        refreshPage() {
            window.location.reload();
        },
    },
    watch: {
        is_laser(newVal) {
            if (newVal) {
                this.focusLaserInput();
            }
        }
    },
    beforeDestroy() {
        clearTimeout(this.resultTimeout);
    },
    mounted() {
        if (this.is_laser) {
            this.focusLaserInput();
        }
    }
}
</script>