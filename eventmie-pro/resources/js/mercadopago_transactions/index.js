import { createApp } from 'vue';
import MercadoPagoTransactions from '../components/MercadoPagoTransactions.vue';

const app = createApp({
    components: {
        'mercadopago-transactions': MercadoPagoTransactions
    }
});

app.mount('#app');
