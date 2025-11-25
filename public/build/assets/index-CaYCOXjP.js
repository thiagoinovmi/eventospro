import { n as normalizeComponent, m as mixinsFilters } from "./mixins-CO2EmGtw.js";
import { M as MapAutocomplete, V as VenueComponent } from "./Venue-DRbwRayh.js";
import { P as PaginationComponent } from "./Pagination-DVYAWWC9.js";
import "./vuex.esm-BLukzcBM.js";
const _sfc_main = {
  props: [
    "organiser_id",
    "page"
  ],
  components: {
    VenueComponent,
    PaginationComponent,
    MapAutocomplete
  },
  mixins: [
    mixinsFilters
  ],
  data() {
    return {
      venues: [],
      edit_index: null,
      pagination: {
        "current_page": 1
      }
    };
  },
  computed: {
    current_page() {
      if (typeof this.page === "undefined")
        return 1;
      return this.page;
    }
  },
  methods: {
    getVenues() {
      axios.get(route("eventmie.myvenues.index") + "?page=" + this.current_page + "&organiser_id=" + this.organiser_id).then((res) => {
        console.log("hello world", res.data.venues.data);
        this.venues = res.data.venues.data;
        this.pagination = {
          "total": res.data.venues.total,
          "per_page": res.data.venues.per_page,
          "current_page": res.data.venues.current_page,
          "last_page": res.data.venues.last_page,
          "from": res.data.venues.from,
          "to": res.data.venues.to
        };
      }).catch((error) => {
        Vue.helpers.axiosErrors(error);
      });
    },
    deleteVenue(venue_id) {
      this.showConfirm(trans("em.delete_venue_ask")).then((res) => {
        if (res) {
          axios.post(route("eventmie.myvenues.destroy", [venue_id]), {
            // headers: {
            //     _method : 'DELETE'
            // },
            organiser_id: this.organiser_id,
            _method: "DELETE"
          }).then((res2) => {
            if (res2.data.status) {
              this.getVenues();
              this.showNotification("success", trans("em.delete_venue_succcess"));
            }
          }).catch((error) => {
            Vue.helpers.axiosErrors(error);
          });
        }
      });
    },
    // return route with venue slug
    venueSlug(slug) {
      return route("eventmie.venues.show", [slug]);
    },
    isValidJSON(str) {
      try {
        JSON.parse(str);
        return true;
      } catch (e) {
        return false;
      }
    }
  },
  mounted() {
    this.getVenues();
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "card shadow-sm border-0" }, [_c("div", { staticClass: "card-header d-flex justify-content-between flex-wrap p-4 bg-white border-bottom-0" }, [_c("div", [_c("h1", { staticClass: "mb-0 fw-bold h2" }, [_vm._v(_vm._s(_vm.trans("em.myvenues")))])]), _c("div", [_c("Venue-component", { attrs: { "organiser_id": _vm.organiser_id } })], 1)]), _c("div", { staticClass: "mx-4" }, [_c("div", { staticClass: "alert alert-info" }, [_c("i", { staticClass: "fas fa-circle-info" }), _vm._v(" " + _vm._s(_vm.trans("em.venue_info")))])]), _c("div", { staticClass: "table-responsive" }, [_c("table", { staticClass: "table text-wrap" }, [_c("thead", { staticClass: "table-light text-nowrap" }, [_c("tr", [_c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.title")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.state")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.city")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.actions")))])])]), _c("tbody", [_vm._l(_vm.venues, function(item, index) {
    return _c("tr", { key: item.id, attrs: { "item": item, "index": index } }, [_c("td", { attrs: { "data-title": _vm.trans("em.venue") } }, [_c("div", { staticClass: "d-flex align-items-center" }, [_c("a", { attrs: { "href": _vm.venueSlug(item.slug) } }, [_c("img", { staticClass: "rounded img-4by3-md", attrs: { "src": item.images && _vm.isValidJSON(item.images) ? _vm.getImageUrl(JSON.parse(item.images)[0]) : "default.jpg", "alt": item.title } })]), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_c("a", { staticClass: "text-inherit text-wrap", attrs: { "href": _vm.venueSlug(item.slug) } }, [_vm._v(_vm._s(item.title))])]), _c("small", { staticClass: "text-muted strong" }, [_vm._v(_vm._s(item.venue_type))])])])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.state") } }, [_vm._v(_vm._s(item.state))]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.city") } }, [_vm._v(_vm._s(item.city))]), _c("td", { staticClass: "align-middle text-nowrap", attrs: { "data-title": _vm.trans("em.actions") } }, [_c("div", { staticClass: "btn-group" }, [_c("button", { staticClass: "btn btn-primary btn-sm", attrs: { "type": "button" }, on: { "click": function($event) {
      _vm.edit_index = index;
    } } }, [_c("i", { staticClass: "fas fa-edit" }), _vm._v(" " + _vm._s(_vm.trans("em.edit")))]), _c("button", { staticClass: "btn btn-danger btn-sm", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.deleteVenue(item.id);
    } } }, [_c("i", { staticClass: "fas fa-trash" }), _vm._v(" " + _vm._s(_vm.trans("em.delete")))])]), _vm.edit_index == index ? _c("Venue-component", { attrs: { "edit_venue": item, "organiser_id": _vm.organiser_id } }) : _vm._e()], 1)]);
  }), _vm.venues.length <= 0 ? _c("tr", [_c("td", { staticClass: "text-center align-middle" }, [_vm._v(_vm._s(_vm.trans("em.no_venues")))])]) : _vm._e()], 2)])]), _vm.venues.length > 0 ? _c("div", { staticClass: "px-4 pb-4" }, [_vm.pagination.last_page > 1 ? _c("pagination-component", { attrs: { "pagination": _vm.pagination, "offset": _vm.pagination.total }, on: { "paginate": function($event) {
    return _vm.getVenues();
  } } }) : _vm._e()], 1) : _vm._e()])]);
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
const Venues = __component__.exports;
const routes = new VueRouter({
  mode: "history",
  base: "/",
  linkExactActiveClass: "there",
  routes: [
    {
      path: path ? "/" + path + "/dashboard/myvenues" : "/dashboard/myvenues",
      // Inject  props based on route.query values for pagination
      props: (route2) => ({
        page: route2.query.page
      }),
      name: "Venues",
      component: Venues
    }
  ]
});
window.app = new Vue({
  el: "#eventmie_app",
  router: routes
});
//# sourceMappingURL=index-CaYCOXjP.js.map
