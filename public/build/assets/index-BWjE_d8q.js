import { n as normalizeComponent, m as mixinsFilters } from "./mixins-CenrxOSq.js";
import { V as VueMatchHeights } from "./vue-match-heights-B2pQHJtM.js";
import { V as VueSlickCarousel, E as EventListing } from "./EventListing-CFPqnWH3.js";
Vue.prototype.base_url = window.base_url;
const _sfc_main = {
  mixins: [
    mixinsFilters
  ],
  components: {
    VueSlickCarousel
  },
  props: [
    "banners",
    "is_logged",
    "is_customer",
    "is_organiser",
    "is_admin",
    "is_multi_vendor",
    "demo_mode",
    "check_session"
  ],
  data() {
    return {
      check: 0,
      route,
      dir: false
    };
  },
  methods: {
    // return route with event slug
    getRoute(name) {
      return route(name);
    },
    // check Session
    checkSession() {
      axios.post(route("eventmie.check_session")).then((res) => {
      }).catch((error) => {
      });
    },
    getDirection() {
      document.documentElement.dir == "rtl" ? this.dir = true : this.dir = false;
    }
  },
  mounted() {
    this.getDirection();
    this.hideSkeleton();
    console.log(document.documentElement.dir);
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("VueSlickCarousel", { attrs: { "autoplay": true, "autoplaySpeed": 3e3, "arrows": true, "dots": true, "infinite": true, "slidesToShow": 1, "paginationEnabled": false, "rtl": _vm.dir } }, _vm._l(_vm.banners, function(item, index) {
    return _c("div", { key: index, class: "lgx-item-common", attrs: { "item": item, "index": index } }, [_c("section", [_c("div", { staticClass: "container-fluid p-0" }, [_c("div", { staticClass: "cover-img-bg", style: { backgroundImage: `url(${_vm.getImageUrl(item.image)})` } }, [item.button_url != null ? _c("a", { attrs: { "href": item.button_url } }, [_c("img", { staticClass: "cover-img prevent_draggable", attrs: { "src": _vm.getImageUrl(item.image), "alt": item.title } })]) : _c("img", { staticClass: "cover-img prevent_draggable", attrs: { "src": _vm.getImageUrl(item.image), "alt": item.title } }), _vm.demo_mode ? _c("div", { staticClass: "banner-slider-form" }, [_c("h1", { staticClass: "text-white mb-0 fw-bold display-5" }, [_vm._v("Eventmie Pro 3.0")]), _c("p", { staticClass: "fw-bold text-white" }, [_vm._v("Smarter, Faster, Stronger Event Management. Perfected by AI")]), _c("div", { staticClass: "d-flex mt-2" }, [_c("a", { staticClass: "btn btn-dark border border-1", attrs: { "target": "_blank", "href": "https://eventmie-pro-docs.classiebit.com" } }, [_c("i", { staticClass: "fas fa-book" }), _vm._v(" Get Started")]), _vm._v("   ")]), _c("div", { staticClass: "d-flex mt-2 d-none d-sm-block" }, [_c("a", { staticClass: "btn btn-info text-white border border-1", attrs: { "target": "_blank", "href": "https://eventmie-pro-docs.classiebit.com/docs/3.0/changelog/changes" } }, [_c("i", { staticClass: "fas fa-wand-magic-sparkles" }), _vm._v(" New in v3.0")])])]) : _vm._e()])])])]);
  }), 0);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  null
);
const BannerSlider = __component__.exports;
Vue.use(VueMatchHeights);
window.app = new Vue({
  el: "#eventmie_app",
  components: {
    EventListing,
    BannerSlider
  }
});
//# sourceMappingURL=index-BWjE_d8q.js.map
