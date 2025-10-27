
/**
 * This is a page specific seperate vue instance initializer
 */

// include vue common libraries, plugins and components
import "../vue_common.js"

/**
 * Local Imports
*/
import DatePicker from "vue2-datepicker";
Vue.component("DatePicker", DatePicker);
/**
 * Local Components 
 */
import EventEarning from './components/EventEarning.vue';

/**
 * Local Vue Routes 
 */
const routes = new VueRouter({
    mode: 'history',
    base: '/',
    linkExactActiveClass: 'there',
    routes: [
        {
            path: path ? '/'+path+'/dashboard/myearning' : '/dashboard/myearning',
            
            // Inject  props based on route.query values for pagination
            props: (route) => ({
                page: route.query.page,
               
            }),
            name: 'event_earning_index',
            component: EventEarning,

        },
        
    ],
});


/**
 * This is where we finally create a page specific
 * vue instance with required configs
 * element=app will remain common for all vue instances
 *
 * make sure to use window.app to make new Vue instance
 * so that we can access vue instance from anywhere
 * e.g interceptors 
 */
window.app = new Vue({
    el: '#eventmie_app',
    router: routes,
    
});