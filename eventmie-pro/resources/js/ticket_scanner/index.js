/**
 * This is a page specific seperate vue instance initializer
 */

// include vue common libraries, plugins and components
import "../vue_common.js"

/**
 * Local Third-party Lib Imports
 */
import VueQrcodeReader from "vue-qrcode-reader";
Vue.use(VueQrcodeReader);

/**
 * Local Components
 */
import TicketScanner from "./components/TicketScanner.vue";

/**
 * This is where we finally create a page specific
 * vue instance with required configs
 * element=app will remain common for all vue instances
 *
 */
window.app = new Vue({
    el: '#eventmie_app',
    components: {
        TicketScanner,
    },
});
