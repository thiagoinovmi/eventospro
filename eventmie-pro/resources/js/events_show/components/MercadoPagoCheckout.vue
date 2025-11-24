<template>
    <div class="mercadopago-checkout-container mt-4 p-4 border rounded bg-light">
        <!-- Header -->
        <div class="mb-4">
            <h5 class="mb-3">
                <i class="fas fa-credit-card me-2"></i>
                {{ trans('em.payment_details') || 'Detalhes do Pagamento' }}
            </h5>
            <hr>
        </div>

        <!-- Order Summary -->
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title mb-3">{{ trans('em.order_summary') || 'Resumo do Pedido' }}</h6>
                        <div class="d-flex justify-content-between mb-2">
                            <span>{{ trans('em.subtotal') || 'Subtotal' }}:</span>
                            <strong>{{ subtotal }} {{ currency }}</strong>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span>{{ trans('em.tax') || 'Taxa' }}:</span>
                            <strong>{{ tax }} {{ currency }}</strong>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between">
                            <span class="h6">{{ trans('em.total') || 'Total' }}:</span>
                            <strong class="h6">{{ total }} {{ currency }}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Payment Method Selection -->
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title mb-3">{{ trans('em.payment_method') || 'Método de Pagamento' }}</h6>
                        
                        <!-- Credit Card -->
                        <div class="form-check mb-3" v-if="loadedMethods.credit_card">
                            <input class="form-check-input" type="radio" id="method_credit_card" v-model="selectedMethod" value="credit_card">
                            <label class="form-check-label" for="method_credit_card">
                                <i class="fas fa-credit-card me-2"></i>
                                {{ trans('em.credit_card') || 'Cartão de Crédito' }}
                            </label>
                        </div>

                        <!-- Debit Card -->
                        <div class="form-check mb-3" v-if="loadedMethods.debit_card">
                            <input class="form-check-input" type="radio" id="method_debit_card" v-model="selectedMethod" value="debit_card">
                            <label class="form-check-label" for="method_debit_card">
                                <i class="fas fa-credit-card me-2"></i>
                                {{ trans('em.debit_card') || 'Cartão de Débito' }}
                            </label>
                        </div>

                        <!-- Boleto -->
                        <div class="form-check mb-3" v-if="loadedMethods.boleto">
                            <input class="form-check-input" type="radio" id="method_boleto" v-model="selectedMethod" value="boleto">
                            <label class="form-check-label" for="method_boleto">
                                <i class="fas fa-barcode me-2"></i>
                                {{ trans('em.boleto') || 'Boleto Bancário' }}
                            </label>
                        </div>

                        <!-- PIX -->
                        <div class="form-check mb-3" v-if="loadedMethods.pix">
                            <input class="form-check-input" type="radio" id="method_pix" v-model="selectedMethod" value="pix">
                            <label class="form-check-label" for="method_pix">
                                <i class="fas fa-mobile-alt me-2"></i>
                                {{ trans('em.pix') || 'PIX' }}
                            </label>
                        </div>

                        <!-- Wallet -->
                        <div class="form-check" v-if="loadedMethods.mercadopago_wallet">
                            <input class="form-check-input" type="radio" id="method_wallet" v-model="selectedMethod" value="mercadopago_wallet">
                            <label class="form-check-label" for="method_wallet">
                                <i class="fas fa-wallet me-2"></i>
                                {{ trans('em.wallet') || 'Carteira Mercado Pago' }}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card Form (for credit/debit card) -->
        <div v-if="['credit_card', 'debit_card'].includes(selectedMethod)" class="row mb-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title mb-3">{{ trans('em.card_details') || 'Dados do Cartão' }}</h6>
                        
                        <!-- Cardholder Name -->
                        <div class="mb-3">
                            <label for="cardholderName" class="form-label">{{ trans('em.cardholder_name') || 'Nome do Titular' }}</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="cardholderName"
                                v-model="cardData.holderName"
                                placeholder="João Silva"
                                @input="validateCardholderName"
                            >
                            <small class="text-danger" v-if="errors.cardholderName">{{ errors.cardholderName }}</small>
                        </div>

                        <!-- Card Number -->
                        <div class="mb-3">
                            <label for="cardNumber" class="form-label">{{ trans('em.card_number') || 'Número do Cartão' }}</label>
                            <input 
                                type="text" 
                                class="form-control" 
                                id="cardNumber"
                                v-model="cardData.number"
                                placeholder="1234 5678 9012 3456"
                                maxlength="19"
                                @input="formatCardNumber"
                            >
                            <small class="text-danger" v-if="errors.cardNumber">{{ errors.cardNumber }}</small>
                        </div>

                        <!-- Expiry and CVV -->
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="cardExpiry" class="form-label">{{ trans('em.expiry_date') || 'Validade' }}</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="cardExpiry"
                                    v-model="cardData.expiry"
                                    placeholder="MM/YY"
                                    maxlength="5"
                                    @input="formatCardExpiry"
                                >
                                <small class="text-danger" v-if="errors.cardExpiry">{{ errors.cardExpiry }}</small>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="cardCvv" class="form-label">{{ trans('em.cvv') || 'CVV' }}</label>
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    id="cardCvv"
                                    v-model="cardData.cvv"
                                    placeholder="123"
                                    maxlength="4"
                                    @input="validateCVV"
                                >
                                <small class="text-danger" v-if="errors.cardCvv">{{ errors.cardCvv }}</small>
                            </div>
                        </div>

                        <!-- Installments - Apenas para cartão de crédito e carteira -->
                        <div class="mb-3" v-if="['credit_card', 'wallet'].includes(selectedMethod) && installmentOptions.length > 0">
                            <label for="installments" class="form-label">{{ trans('em.installments') || 'Parcelamento' }}</label>
                            <select class="form-select" id="installments" v-model="cardData.installments">
                                <option v-for="option in installmentOptions" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PIX QR Code (waiting for payment) -->
        <div v-if="isWaitingPayment && selectedMethod === 'pix'" class="row mb-4">
            <div class="col-12">
                <div class="card border-success">
                    <div class="card-body text-center">
                        <h6 class="card-title mb-4">
                            <i class="fas fa-mobile-alt me-2 text-success"></i>
                            {{ trans('em.waiting_pix_payment') || 'Aguardando Pagamento PIX' }}
                        </h6>
                        
                        <!-- QR Code -->
                        <div class="mb-4" v-if="pixQrCode">
                            <img :src="pixQrCode" alt="PIX QR Code" class="img-fluid" style="max-width: 300px;">
                        </div>
                        
                        <!-- Copy Code -->
                        <div class="mb-4" v-if="pixData">
                            <p class="text-muted mb-2">{{ trans('em.or_copy_code') || 'Ou copie o código:' }}</p>
                            <div class="input-group">
                                <input 
                                    type="text" 
                                    class="form-control" 
                                    :value="pixData" 
                                    readonly
                                    id="pixCode"
                                >
                                <button 
                                    class="btn btn-outline-primary" 
                                    type="button"
                                    @click="copyToClipboard"
                                >
                                    <i class="fas fa-copy me-2"></i>
                                    {{ trans('em.copy') || 'Copiar' }}
                                </button>
                            </div>
                        </div>
                        
                        <!-- Expiration Timer -->
                        <div class="alert alert-info" v-if="pixExpiration">
                            <i class="fas fa-clock me-2"></i>
                            {{ trans('em.pix_expires_in') || 'PIX expira em' }}: 
                            <strong>{{ formatTimeRemaining(pixExpiration) }}</strong>
                        </div>
                        
                        <!-- Waiting Message -->
                        <div class="alert alert-warning">
                            <i class="fas fa-hourglass-half me-2"></i>
                            {{ trans('em.waiting_payment_confirmation') || 'Aguardando confirmação do pagamento...' }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
            <i class="fas fa-exclamation-circle me-2"></i>
            {{ errorMessage }}
            <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle me-2"></i>
            {{ successMessage }}
            <button type="button" class="btn-close" @click="successMessage = ''" aria-label="Close"></button>
        </div>

        <!-- Security Info -->
        <div class="mt-4 text-center">
            <small class="text-muted">
                <i class="fas fa-shield-alt me-1"></i>
                {{ trans('em.secure_payment') || 'Pagamento seguro com Mercado Pago' }}
            </small>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        event: Object,
        tickets: Array,
        total: Number,
        currency: String,
        bookingData: Object,
        paymentMethods: {
            type: Object,
            default: () => ({})
        },
        installmentOptions: {
            type: Array,
            default: () => {
                const options = [];
                for (let i = 1; i <= 12; i++) {
                    options.push({
                        value: i,
                        label: i === 1 ? '1x sem juros' : `${i}x ${i <= 6 ? 'sem juros' : 'com juros'}`
                    });
                }
                return options;
            }
        }
    },

    data() {
        return {
            selectedMethod: 'credit_card',
            selectedTicket: null,
            cardData: {
                holderName: '',
                number: '',
                expiry: '',
                cvv: '',
                installments: 1,
                paymentMethodId: 'credit_card' // Will be updated based on card brand
            },
            errors: {
                cardholderName: '',
                cardNumber: '',
                cardExpiry: '',
                cardCvv: ''
            },
            errorMessage: '',
            successMessage: '',
            loadedMethods: {},
            pixData: null,
            pixQrCode: null,
            pixExpiration: null,
            isWaitingPayment: false,
            paymentCheckInterval: null
        }
    },

    mounted() {
        this.loadPaymentMethods();
    },

    computed: {
        subtotal() {
            const total = parseFloat(this.total) || 0;
            return total.toFixed(2);
        },
        tax() {
            return (0).toFixed(2);
        }
    },

    methods: {
        setSelectedTicket(ticket) {
            console.log('Ticket selecionado no MercadoPagoCheckout:', ticket);
            this.selectedTicket = ticket;
        },

        loadPaymentMethods() {
            console.log('=== CARREGANDO MÉTODOS DE PAGAMENTO ===');
            console.log('Event ID:', this.event?.id);
            
            if (!this.event?.id) {
                console.error('Event ID não encontrado');
                return;
            }

            const timestamp = new Date().getTime();
            const url = `/api/mercadopago/payment-methods/event/${this.event.id}?t=${timestamp}`;
            console.log('Chamando API:', url);

            axios.get(url, {
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            })
            .then(response => {
                console.log('Resposta da API:', response.data);
                
                if (response.data.status && response.data.data) {
                    const methods = response.data.data;
                    console.log('Métodos carregados:', methods.length, methods);
                    
                    // Build payment methods object
                    this.loadedMethods = {};
                    methods.forEach(method => {
                        this.loadedMethods[method.type] = true;
                    });
                    
                    console.log('Métodos processados:', this.loadedMethods);
                    
                    // Set first available method as selected
                    const firstMethod = methods[0];
                    if (firstMethod) {
                        this.selectedMethod = firstMethod.type;
                    }
                } else {
                    console.error('Erro na resposta:', response.data.message);
                    this.errorMessage = response.data.message || 'Erro ao carregar métodos de pagamento';
                }
            })
            .catch(error => {
                console.error('Erro ao carregar métodos:', error);
                this.errorMessage = 'Erro ao carregar métodos de pagamento: ' + error.message;
            });
        },

        formatCardNumber() {
            let value = this.cardData.number.replace(/\s/g, '');
            let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
            this.cardData.number = formatted;
            
            // Detect card brand based on first digits
            this.detectCardBrand(value);
        },
        
        detectCardBrand(cardNumber) {
            // Remove non-digits
            const cleanNumber = cardNumber.replace(/\D/g, '');
            
            if (!cleanNumber) {
                this.cardData.paymentMethodId = 'credit_card';
                return;
            }
            
            // Visa: starts with 4
            if (/^4/.test(cleanNumber)) {
                this.cardData.paymentMethodId = 'visa';
            }
            // Mastercard: starts with 5
            else if (/^5[1-5]/.test(cleanNumber)) {
                this.cardData.paymentMethodId = 'master';
            }
            // American Express: starts with 3
            else if (/^3[47]/.test(cleanNumber)) {
                this.cardData.paymentMethodId = 'amex';
            }
            // Elo: starts with 636414, 636415, 636416, 636417, 636418, 636419, 636420, 636421, 636422, 636423, 636424, 636425, 636426, 636427, 636428, 636429, 636430, 636431, 636432, 636433, 636434, 636435, 636436, 636437, 636438, 636439, 636440, 636441, 636442, 636443, 636444, 636445, 636446, 636447, 636448, 636449, 636450, 636451, 636452, 636453, 636454, 636455, 636456, 636457, 636458, 636459, 636460, 636461, 636462, 636463, 636464, 636465, 636466, 636467, 636468, 636469, 636470, 636471, 636472, 636473, 636474, 636475, 636476, 636477, 636478, 636479, 636480, 636481, 636482, 636483, 636484, 636485, 636486, 636487, 636488, 636489, 636490, 636491, 636492, 636493, 636494, 636495, 636496, 636497, 636498, 636499, 636500, 636501, 636502, 636503, 636504, 636505, 636506, 636507, 636508, 636509, 636510, 636511, 636512, 636513, 636514, 636515, 636516, 636517, 636518, 636519, 636520, 636521, 636522, 636523, 636524, 636525, 636526, 636527, 636528, 636529, 636530, 636531, 636532, 636533, 636534, 636535, 636536, 636537, 636538, 636539, 636540, 636541, 636542, 636543, 636544, 636545, 636546, 636547, 636548, 636549, 636550, 636551, 636552, 636553, 636554, 636555, 636556, 636557, 636558, 636559, 636560, 636561, 636562, 636563, 636564, 636565, 636566, 636567, 636568, 636569, 636570, 636571, 636572, 636573, 636574, 636575, 636576, 636577, 636578, 636579, 636580, 636581, 636582, 636583, 636584, 636585, 636586, 636587, 636588, 636589, 636590, 636591, 636592, 636593, 636594, 636595, 636596, 636597, 636598, 636599, 636600, 636601, 636602, 636603, 636604, 636605, 636606, 636607, 636608, 636609, 636610, 636611, 636612, 636613, 636614, 636615, 636616, 636617, 636618, 636619, 636620, 636621, 636622, 636623, 636624, 636625, 636626, 636627, 636628, 636629, 636630, 636631, 636632, 636633, 636634, 636635, 636636, 636637, 636638, 636639, 636640, 636641, 636642, 636643, 636644, 636645, 636646, 636647, 636648, 636649, 636650, 636651, 636652, 636653, 636654, 636655, 636656, 636657, 636658, 636659, 636660, 636661, 636662, 636663, 636664, 636665, 636666, 636667, 636668, 636669, 636670, 636671, 636672, 636673, 636674, 636675, 636676, 636677, 636678, 636679, 636680, 636681, 636682, 636683, 636684, 636685, 636686, 636687, 636688, 636689, 636690, 636691, 636692, 636693, 636694, 636695, 636696, 636697, 636698, 636699, 636700, 636701, 636702, 636703, 636704, 636705, 636706, 636707, 636708, 636709, 636710, 636711, 636712, 636713, 636714, 636715, 636716, 636717, 636718, 636719, 636720, 636721, 636722, 636723, 636724, 636725, 636726, 636727, 636728, 636729, 636730, 636731, 636732, 636733, 636734, 636735, 636736, 636737, 636738, 636739, 636740, 636741, 636742, 636743, 636744, 636745, 636746, 636747, 636748, 636749, 636750, 636751, 636752, 636753, 636754, 636755, 636756, 636757, 636758, 636759, 636760, 636761, 636762, 636763, 636764, 636765, 636766, 636767, 636768, 636769, 636770, 636771, 636772, 636773, 636774, 636775, 636776, 636777, 636778, 636779, 636780, 636781, 636782, 636783, 636784, 636785, 636786, 636787, 636788, 636789, 636790, 636791, 636792, 636793, 636794, 636795, 636796, 636797, 636798, 636799, 636800, 636801, 636802, 636803, 636804, 636805, 636806, 636807, 636808, 636809, 636810, 636811, 636812, 636813, 636814, 636815, 636816, 636817, 636818, 636819, 636820, 636821, 636822, 636823, 636824, 636825, 636826, 636827, 636828, 636829, 636830, 636831, 636832, 636833, 636834, 636835, 636836, 636837, 636838, 636839, 636840, 636841, 636842, 636843, 636844, 636845, 636846, 636847, 636848, 636849, 636850, 636851, 636852, 636853, 636854, 636855, 636856, 636857, 636858, 636859, 636860, 636861, 636862, 636863, 636864, 636865, 636866, 636867, 636868, 636869, 636870, 636871, 636872, 636873, 636874, 636875, 636876, 636877, 636878, 636879, 636880, 636881, 636882, 636883, 636884, 636885, 636886, 636887, 636888, 636889, 636890, 636891, 636892, 636893, 636894, 636895, 636896, 636897, 636898, 636899, 636900, 636901, 636902, 636903, 636904, 636905, 636906, 636907, 636908, 636909, 636910, 636911, 636912, 636913, 636914, 636915, 636916, 636917, 636918, 636919, 636920, 636921, 636922, 636923, 636924, 636925, 636926, 636927, 636928, 636929, 636930, 636931, 636932, 636933, 636934, 636935, 636936, 636937, 636938, 636939, 636940, 636941, 636942, 636943, 636944, 636945, 636946, 636947, 636948, 636949, 636950, 636951, 636952, 636953, 636954, 636955, 636956, 636957, 636958, 636959, 636960, 636961, 636962, 636963, 636964, 636965, 636966, 636967, 636968, 636969, 636970, 636971, 636972, 636973, 636974, 636975, 636976, 636977, 636978, 636979, 636980, 636981, 636982, 636983, 636984, 636985, 636986, 636987, 636988, 636989, 636990, 636991, 636992, 636993, 636994, 636995, 636996, 636997, 636998, 636999, 637000, 637001, 637002, 637003, 637004, 637005, 637006, 637007, 637008, 637009, 637010, 637011, 637012, 637013, 637014, 637015, 637016, 637017, 637018, 637019, 637020, 637021, 637022, 637023, 637024, 637025, 637026, 637027, 637028, 637029, 637030, 637031, 637032, 637033, 637034, 637035, 637036, 637037, 637038, 637039, 637040, 637041, 637042, 637043, 637044, 637045, 637046, 637047, 637048, 637049, 637050, 637051, 637052, 637053, 637054, 637055, 637056, 637057, 637058, 637059, 637060, 637061, 637062, 637063, 637064, 637065, 637066, 637067, 637068, 637069, 637070, 637071, 637072, 637073, 637074, 637075, 637076, 637077, 637078, 637079, 637080, 637081, 637082, 637083, 637084, 637085, 637086, 637087, 637088, 637089, 637090, 637091, 637092, 637093, 637094, 637095, 637096, 637097, 637098, 637099, 637100, 637101, 637102, 637103, 637104, 637105, 637106, 637107, 637108, 637109, 637110, 637111, 637112, 637113, 637114, 637115, 637116, 637117, 637118, 637119, 637120, 637121, 637122, 637123, 637124, 637125, 637126, 637127, 637128, 637129, 637130, 637131, 637132, 637133, 637134, 637135, 637136, 637137, 637138, 637139, 637140, 637141, 637142, 637143, 637144, 637145, 637146, 637147, 637148, 637149, 637150, 637151, 637152, 637153, 637154, 637155, 637156, 637157, 637158, 637159, 637160, 637161, 637162, 637163, 637164, 637165, 637166, 637167, 637168, 637169, 637170, 637171, 637172, 637173, 637174, 637175, 637176, 637177, 637178, 637179, 637180, 637181, 637182, 637183, 637184, 637185, 637186, 637187, 637188, 637189, 637190, 637191, 637192, 637193, 637194, 637195, 637196, 637197, 637198, 637199, 637200, 637201, 637202, 637203, 637204, 637205, 637206, 637207, 637208, 637209, 637210, 637211, 637212, 637213, 637214, 637215, 637216, 637217, 637218, 637219, 637220, 637221, 637222, 637223, 637224, 637225, 637226, 637227, 637228, 637229, 637230, 637231, 637232, 637233, 637234, 637235, 637236, 637237, 637238, 637239, 637240, 637241, 637242, 637243, 637244, 637245, 637246, 637247, 637248, 637249, 637250, 637251, 637252, 637253, 637254, 637255, 637256, 637257, 637258, 637259, 637260, 637261, 637262, 637263, 637264, 637265, 637266, 637267, 637268, 637269, 637270, 637271, 637272, 637273, 637274, 637275, 637276, 637277, 637278, 637279, 637280, 637281, 637282, 637283, 637284, 637285, 637286, 637287, 637288, 637289, 637290, 637291, 637292, 637293, 637294, 637295, 637296, 637297, 637298, 637299, 637300, 637301, 637302, 637303, 637304, 637305, 637306, 637307, 637308, 637309, 637310, 637311, 637312, 637313, 637314, 637315, 637316, 637317, 637318, 637319, 637320, 637321, 637322, 637323, 637324, 637325, 637326, 637327, 637328, 637329, 637330, 637331, 637332, 637333, 637334, 637335, 637336, 637337, 637338, 637339, 637340, 637341, 637342, 637343, 637344, 637345, 637346, 637347, 637348, 637349, 637350, 637351, 637352, 637353, 637354, 637355, 637356, 637357, 637358, 637359, 637360, 637361, 637362, 637363, 637364, 637365, 637366, 637367, 637368, 637369, 637370, 637371, 637372, 637373, 637374, 637375, 637376, 637377, 637378, 637379, 637380, 637381, 637382, 637383, 637384, 637385, 637386, 637387, 637388, 637389, 637390, 637391, 637392, 637393, 637394, 637395, 637396, 637397, 637398, 637399, 637400, 637401, 637402, 637403, 637404, 637405, 637406, 637407, 637408, 637409, 637410, 637411, 637412, 637413, 637414, 637415, 637416, 637417, 637418, 637419, 637420, 637421, 637422, 637423, 637424, 637425, 637426, 637427, 637428, 637429, 637430, 637431, 637432, 637433, 637434, 637435, 637436, 637437, 637438, 637439, 637440, 637441, 637442, 637443, 637444, 637445, 637446, 637447, 637448, 637449, 637450, 637451, 637452, 637453, 637454, 637455, 637456, 637457, 637458, 637459, 637460, 637461, 637462, 637463, 637464, 637465, 637466, 637467, 637468, 637469, 637470, 637471, 637472, 637473, 637474, 637475, 637476, 637477, 637478, 637479, 637480, 637481, 637482, 637483, 637484, 637485, 637486, 637487, 637488, 637489, 637490, 637491, 637492, 637493, 637494, 637495, 637496, 637497, 637498, 637499, 637500, 637501, 637502, 637503, 637504, 637505, 637506, 637507, 637508, 637509, 637510, 637511, 637512, 637513, 637514, 637515, 637516, 637517, 637518, 637519, 637520, 637521, 637522, 637523, 637524, 637525, 637526, 637527, 637528, 637529, 637530, 637531, 637532, 637533, 637534, 637535, 637536, 637537, 637538, 637539, 637540, 637541, 637542, 637543, 637544, 637545, 637546, 637547, 637548, 637549, 637550, 637551, 637552, 637553, 637554, 637555, 637556, 637557, 637558, 637559, 637560, 637561, 637562, 637563, 637564, 637565, 637566, 637567, 637568, 637569, 637570, 637571, 637572, 637573, 637574, 637575, 637576, 637577, 637578, 637579, 637580, 637581, 637582, 637583, 637584, 637585, 637586, 637587, 637588, 637589, 637590, 637591, 637592, 637593, 637594, 637595, 637596, 637597, 637598, 637599, 637600, 637601, 637602, 637603, 637604, 637605, 637606, 637607, 637608, 637609, 637610, 637611, 637612, 637613, 637614, 637615, 637616, 637617, 637618, 637619, 637620, 637621, 637622, 637623, 637624, 637625, 637626, 637627, 637628, 637629, 637630, 637631, 637632, 637633, 637634, 637635, 637636, 637637, 637638, 637639, 637640, 637641, 637642, 637643, 637644, 637645, 637646, 637647, 637648, 637649, 637650, 637651, 637652, 637653, 637654, 637655, 637656, 637657, 637658, 637659, 637660, 637661, 637662, 637663, 637664, 637665, 637666, 637667, 637668, 637669, 637670, 637671, 637672, 637673, 637674, 637675, 637676, 637677, 637678, 637679, 637680, 637681, 637682, 637683, 637684, 637685, 637686, 637687, 637688, 637689, 637690, 637691, 637692, 637693, 637694, 637695, 637696, 637697, 637698, 637699, 637700, 637701, 637702, 637703, 637704, 637705, 637706, 637707, 637708, 637709, 637710, 637711, 637712, 637713, 637714, 637715, 637716, 637717, 637718, 637719, 637720, 637721, 637722, 637723, 637724, 637725, 637726, 637727, 637728, 637729, 637730, 637731, 637732, 637733, 637734, 637735, 637736, 637737, 637738, 637739, 637740, 637741, 637742, 637743, 637744, 637745, 637746, 637747, 637748, 637749, 637750, 637751, 637752, 637753, 637754, 637755, 637756, 637757, 637758, 637759, 637760, 637761, 637762, 637763, 637764, 637765, 637766, 637767, 637768, 637769, 637770, 637771, 637772, 637773, 637774, 637775, 637776, 637777, 637778, 637779, 637780, 637781, 637782, 637783, 637784, 637785, 637786, 637787, 637788, 637789, 637790, 637791, 637792, 637793, 637794, 637795, 637796, 637797, 637798, 637799, 637800, 637801, 637802, 637803, 637804, 637805, 637806, 637807, 637808, 637809, 637810, 637811, 637812, 637813, 637814, 637815, 637816, 637817, 637818, 637819, 637820, 637821, 637822, 637823, 637824, 637825, 637826, 637827, 637828, 637829, 637830, 637831, 637832, 637833, 637834, 637835, 637836, 637837, 637838, 637839, 637840, 637841, 637842, 637843, 637844, 637845, 637846, 637847, 637848, 637849, 637850, 637851, 637852, 637853, 637854, 637855, 637856, 637857, 637858, 637859, 637860, 637861, 637862, 637863, 637864, 637865, 637866, 637867, 637868, 637869, 637870, 637871, 637872, 637873, 637874, 637875, 637876, 637877, 637878, 637879, 637880, 637881, 637882, 637883, 637884, 637885, 637886, 637887, 637888, 637889, 637890, 637891, 637892, 637893, 637894, 637895, 637896, 637897, 637898, 637899, 637900, 637901, 637902, 637903, 637904, 637905, 637906, 637907, 637908, 637909, 637910, 637911, 637912, 637913, 637914, 637915, 637916, 637917, 637918, 637919, 637920, 637921, 637922, 637923, 637924, 637925, 637926, 637927, 637928, 637929, 637930, 637931, 637932, 637933, 637934, 637935, 637936, 637937, 637938, 637939, 637940, 637941, 637942, 637943, 637944, 637945, 637946, 637947, 637948, 637949, 637950, 637951, 637952, 637953, 637954, 637955, 637956, 637957, 637958, 637959, 637960, 637961, 637962, 637963, 637964, 637965, 637966, 637967, 637968, 637969, 637970, 637971, 637972, 637973, 637974, 637975, 637976, 637977, 637978, 637979, 637980, 637981, 637982, 637983, 637984, 637985, 637986, 637987, 637988, 637989, 637990, 637991, 637992, 637993, 637994, 637995, 637996, 637997, 637998, 637999, 638000 or /^6(?:011|5)/.test(cleanNumber)) {
                this.cardData.paymentMethodId = 'elo';
            }
            // Diners: starts with 36, 38, 39
            else if (/^3[68]/.test(cleanNumber)) {
                this.cardData.paymentMethodId = 'diners';
            }
            // Discover: starts with 6011 or 65
            else if (/^6(?:011|5)/.test(cleanNumber)) {
                this.cardData.paymentMethodId = 'discover';
            }
            else {
                this.cardData.paymentMethodId = 'credit_card';
            }
            
            console.log('Card brand detected:', this.cardData.paymentMethodId);
        },

        formatCardExpiry() {
            let value = this.cardData.expiry.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            this.cardData.expiry = value;
        },

        validateCardholderName() {
            if (this.cardData.holderName.length < 3) {
                this.errors.cardholderName = 'Nome deve ter pelo menos 3 caracteres';
            } else {
                this.errors.cardholderName = '';
            }
        },

        validateCVV() {
            if (this.cardData.cvv.length < 3 || this.cardData.cvv.length > 4) {
                this.errors.cardCvv = 'CVV deve ter 3 ou 4 dígitos';
            } else {
                this.errors.cardCvv = '';
            }
        },

        validateForm() {
            let isValid = true;

            if (this.selectedMethod === 'credit_card' || this.selectedMethod === 'debit_card') {
                // Validate cardholder name
                if (this.cardData.holderName.length < 3) {
                    this.errors.cardholderName = 'Nome inválido';
                    isValid = false;
                }

                // Validate card number
                if (this.cardData.number.replace(/\s/g, '').length !== 16) {
                    this.errors.cardNumber = 'Número do cartão inválido';
                    isValid = false;
                }

                // Validate expiry
                if (!this.cardData.expiry.match(/^\d{2}\/\d{2}$/)) {
                    this.errors.cardExpiry = 'Validade inválida (MM/YY)';
                    isValid = false;
                }

                // Validate CVV
                if (this.cardData.cvv.length < 3 || this.cardData.cvv.length > 4) {
                    this.errors.cardCvv = 'CVV inválido';
                    isValid = false;
                }
            }

            return isValid;
        },

        async processPayment() {
            console.log('=== PROCESS PAYMENT INICIADO ===');
            console.log('selectedMethod:', this.selectedMethod);
            console.log('selectedTicket:', this.selectedTicket);
            
            if (!this.validateForm()) {
                this.$emit('error', 'Por favor, preencha todos os campos corretamente');
                return;
            }

            this.errorMessage = '';

            try {
                // Use the ticket passed from TicketList
                const ticketToUse = this.selectedTicket || (this.tickets && this.tickets.length > 0 ? this.tickets[0] : null);
                
                console.log('Ticket a ser usado:', ticketToUse);

                // Prepare payment data
                const paymentData = {
                    event_id: this.event.id,
                    booking_date: this.bookingData.booking_date,
                    booking_end_date: this.bookingData.booking_end_date,
                    start_time: this.bookingData.start_time,
                    end_time: this.bookingData.end_time,
                    payment_method: 'mercadopago',
                    selected_method: this.selectedMethod,
                    total: this.total,
                    ticket_id: ticketToUse ? ticketToUse.id : null,
                    ticket_title: ticketToUse ? ticketToUse.title : null
                };
                
                // Add card-specific data for credit/debit cards
                if (['credit_card', 'debit_card'].includes(this.selectedMethod)) {
                    // Generate card token using Mercado Pago SDK
                    const cardToken = await this.generateCardToken();
                    
                    if (!cardToken) {
                        this.errorMessage = 'Erro ao gerar token do cartão. Verifique os dados e tente novamente.';
                        return;
                    }
                    
                    paymentData.card_token = cardToken;
                    paymentData.installments = this.cardData.installments || 1;
                    paymentData.payment_method_id = this.cardData.paymentMethodId; // Send detected card brand
                    
                    console.log('Card payment data:', {
                        card_token: cardToken,
                        installments: paymentData.installments,
                        payment_method_id: paymentData.payment_method_id
                    });
                }

                const apiUrl = '/bookings/api/mercadopago/process';
                console.log('Enviando dados para:', apiUrl);
                console.log('Dados:', paymentData);

                // Send payment request
                const response = await axios.post(apiUrl, paymentData);

                console.log('Resposta recebida:', response.data);

                console.log('Response data completo:', response.data);
                console.log('selectedMethod:', this.selectedMethod);
                console.log('pix_data presente?', !!response.data.pix_data);
                
                if (response.data.status) {
                    // Se for PIX, mostrar QR Code e aguardar pagamento
                    if (this.selectedMethod === 'pix') {
                        console.log('PIX selecionado - verificando dados');
                        
                        if (response.data.pix_data) {
                            console.log('PIX data encontrado:', response.data.pix_data);
                            this.pixData = response.data.pix_data;
                            this.pixQrCode = response.data.pix_qr_code;
                            this.pixExpiration = new Date(response.data.pix_expiration);
                            this.isWaitingPayment = true;
                            
                            console.log('Estado atualizado:', {
                                pixData: this.pixData,
                                pixQrCode: this.pixQrCode,
                                isWaitingPayment: this.isWaitingPayment
                            });
                            
                            // Iniciar verificação de pagamento a cada 5 segundos
                            this.startPaymentCheck(response.data.transaction_id);
                        } else {
                            console.warn('PIX selecionado mas pix_data não retornou');
                            console.log('Resposta completa:', response.data);
                            
                            // Mostrar mensagem de erro
                            this.errorMessage = 'Falha ao gerar PIX. Tente novamente.';
                        }
                    } else {
                        // Para outros métodos, redirecionar direto
                        this.successMessage = response.data.message || 'Pagamento processado com sucesso!';
                        console.log('Pagamento confirmado com sucesso!');
                        
                        setTimeout(() => {
                            window.location.href = '/mybookings';
                        }, 3000);
                    }
                } else {
                    this.$emit('error', response.data.message || 'Erro ao processar pagamento');
                }
            } catch (error) {
                console.error('Payment error:', error);
                console.error('Resposta de erro:', error.response);
                
                const errorMessage = error.response?.data?.message || 'Erro ao processar pagamento. Tente novamente.';
                this.errorMessage = errorMessage;
                console.error('Mensagem de erro:', errorMessage);
            }
        },

        startPaymentCheck(transactionId) {
            console.log('Iniciando verificação de pagamento PIX para:', transactionId);
            
            // Verificar a cada 5 segundos
            this.paymentCheckInterval = setInterval(async () => {
                try {
                    const response = await axios.get(`/bookings/api/mercadopago/check-payment/${transactionId}`);
                    
                    if (response.data.status === 'approved') {
                        console.log('Pagamento aprovado!');
                        clearInterval(this.paymentCheckInterval);
                        
                        this.successMessage = 'Pagamento confirmado com sucesso!';
                        this.isWaitingPayment = false;
                        
                        setTimeout(() => {
                            window.location.href = '/mybookings';
                        }, 2000);
                    }
                } catch (error) {
                    console.error('Erro ao verificar pagamento:', error);
                }
            }, 5000);
        },

        copyToClipboard() {
            const pixCode = document.getElementById('pixCode');
            if (pixCode) {
                pixCode.select();
                document.execCommand('copy');
                alert('Código PIX copiado para a área de transferência!');
            }
        },

        formatTimeRemaining(expirationTime) {
            const now = new Date();
            const diff = expirationTime - now;
            
            if (diff <= 0) {
                return 'Expirado';
            }
            
            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            
            return `${minutes}m ${seconds}s`;
        },

        async generateCardToken() {
            try {
                // Load Mercado Pago SDK if not already loaded
                if (!window.MercadoPago) {
                    console.error('Mercado Pago SDK não carregado');
                    return null;
                }

                // Get public key from settings
                const publicKeyResponse = await axios.get('/api/mercadopago/public-key');
                const publicKey = publicKeyResponse.data.public_key;

                if (!publicKey) {
                    console.error('Public key não configurada');
                    return null;
                }

                // Initialize Mercado Pago
                const mp = new window.MercadoPago(publicKey);

                // Prepare card data - IMPORTANT: cardNumber must be the FULL number without spaces
                // Remove ALL spaces and non-digit characters
                const cardNumber = this.cardData.number.replace(/\D/g, '');
                
                console.log('DEBUG - Card data antes de gerar token:', {
                    cardData_number_raw: this.cardData.number,
                    cardNumber_cleaned: cardNumber,
                    cardNumber_length: cardNumber.length,
                    holderName: this.cardData.holderName,
                    expiry: this.cardData.expiry,
                    cvv: this.cardData.cvv
                });
                
                const cardData = {
                    cardNumber: cardNumber,
                    cardholderName: this.cardData.holderName,
                    cardExpirationMonth: this.cardData.expiry.split('/')[0],
                    cardExpirationYear: '20' + this.cardData.expiry.split('/')[1],
                    securityCode: this.cardData.cvv
                };

                console.log('Gerando token com dados:', {
                    cardNumber: cardNumber,
                    cardNumberLength: cardNumber.length,
                    cardNumberPreview: cardNumber.substring(0, 6) + '****' + cardNumber.slice(-4),
                    cardholderName: cardData.cardholderName,
                    cardExpirationMonth: cardData.cardExpirationMonth,
                    cardExpirationYear: cardData.cardExpirationYear
                });

                // Create token
                const token = await mp.createCardToken(cardData);

                if (token && token.id) {
                    console.log('Token gerado com sucesso:', token.id);
                    return token.id;
                } else {
                    console.error('Erro ao gerar token:', token);
                    this.errorMessage = token?.cause?.[0]?.description || 'Erro ao gerar token do cartão';
                    return null;
                }

            } catch (error) {
                console.error('Exceção ao gerar token:', error);
                this.errorMessage = 'Erro ao processar cartão: ' + error.message;
                return null;
            }
        }

    }
}
</script>

<style scoped>
.mercadopago-checkout-container {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border: 2px solid #007bff;
}

.card {
    border: 1px solid #dee2e6;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.form-control:focus,
.form-select:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
    background-color: #0056b3;
    border-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 0.5rem 1rem rgba(0, 123, 255, 0.3);
}

.btn-primary:disabled {
    opacity: 0.65;
    cursor: not-allowed;
}

.alert {
    border-radius: 0.5rem;
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.text-danger {
    font-size: 0.875rem;
    margin-top: 0.25rem;
}
</style>
