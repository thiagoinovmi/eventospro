
/**
 * This is a page specific seperate vue instance initializer
 */

// include vue common libraries, plugins and components
import "../vue_common.js"

/**
 * Local Third-party Lib Imports
*/


/**
 * Local Components 
 */
import Venues from './components/Venues.vue';

/**
 * Local Vue Routes 
 */
const routes = new VueRouter({
    mode: 'history',
    base: '/',
    linkExactActiveClass: 'there',
    routes: [
        {
            path: path ? '/'+path+'/dashboard/myvenues' : '/dashboard/myvenues',
            // Inject  props based on route.query values for pagination
            props: (route) => ({
                page: route.query.page,
                
            }),
            name: 'Venues',
            component: Venues,

        },
    ],
});

/**
 * This is where we finally create a page specific
 * vue instance with required configs
 * element=app will remain common for all vue instances
 * 
 */
window.app = new Vue({
    el: '#eventmie_app',
    router: routes,
});