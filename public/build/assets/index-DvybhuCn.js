import { n as normalizeComponent, m as mixinsFilters } from "./mixins-DZWn0auj.js";
import { D as DatePicker } from "./index.esm-BNIJhBgk.js";
import { P as PaginationComponent } from "./Pagination-smYCG8Sc.js";
const _sfc_main = {
  mixins: [
    mixinsFilters
  ],
  props: [
    // pagination query string
    "page"
  ],
  components: {
    PaginationComponent
  },
  data() {
    return {
      event_earning: [],
      total_earning: [],
      moment,
      edit_index: null,
      pagination: {
        "current_page": 1
      },
      currency: null,
      date_range: [],
      start_date: "",
      end_date: "",
      // date shortucts like today, tommorrow
      shortcuts: [
        {
          text: trans("em.today"),
          onClick: () => {
            this.date_range = [moment().toDate(), moment().toDate()];
          }
        },
        {
          text: trans("em.tomorrow"),
          onClick: () => {
            this.date_range = [moment().add(1, "day").toDate(), moment().add(1, "day").toDate()];
          }
        },
        {
          text: trans("em.this") + " " + trans("em.weekend"),
          onClick: () => {
            this.date_range = [moment().endOf("week").toDate(), moment().endOf("week").toDate()];
          }
        },
        {
          text: trans("em.this") + " " + trans("em.week"),
          onClick: () => {
            this.date_range = [moment().startOf("week").toDate(), moment().endOf("week").toDate()];
          }
        },
        {
          text: trans("em.next") + " " + trans("em.week"),
          onClick: () => {
            this.date_range = [moment().add(1, "weeks").startOf("week").toDate(), moment().add(1, "weeks").endOf("week").toDate()];
          }
        },
        {
          text: trans("em.this") + " " + trans("em.month"),
          onClick: () => {
            this.date_range = [moment().startOf("month").toDate(), moment().endOf("month").toDate()];
          }
        },
        {
          text: trans("em.next") + " " + trans("em.month"),
          onClick: () => {
            this.date_range = [moment().add(1, "months").startOf("month").toDate(), moment().add(1, "months").endOf("month").toDate()];
          }
        }
      ],
      events: [],
      event_id: 0
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
    // return route with event slug
    eventSlug(slug) {
      if (slug) {
        return route("eventmie.events_show", [slug]);
      }
    },
    // searching by date 
    dateRange: function() {
      var is_date_null = 0;
      if (Object.keys(this.date_range).length > 0) {
        this.date_range.forEach((function(value, key) {
          if (value != null) {
            is_date_null = 1;
            if (key == 0)
              this.start_date = this.convert_date(value);
            if (key == 1)
              this.end_date = this.convert_date(value);
          }
        }).bind(this));
        if (is_date_null <= 0) {
          this.start_date = "";
          this.end_date = "";
        }
        this.eventEarning();
      }
    },
    // get all events
    getMyEvents() {
      axios.get(route("eventmie.all_myevents")).then((res) => {
        this.events = res.data.myevents;
      }).catch((error) => {
      });
    },
    // get event earning
    eventEarning() {
      if (typeof this.start_date === "undefined") {
        this.start_date = "";
      }
      if (typeof this.end_date === "undefined") {
        this.end_date = "";
      }
      axios.get(route("eventmie.organiser_event_earning") + "?page=" + this.current_page + "&event_id=" + this.event_id + "&start_date=" + this.start_date + "&end_date=" + this.end_date).then((res) => {
        this.event_earning = res.data.event_earning.data;
        this.pagination = {
          "total": res.data.event_earning.total,
          "per_page": res.data.event_earning.per_page,
          "current_page": res.data.event_earning.current_page,
          "last_page": res.data.event_earning.last_page,
          "from": res.data.event_earning.from,
          "to": res.data.event_earning.to,
          "links": res.data.event_earning.links
        };
      }).catch((error) => {
      });
    },
    //net total
    totalEarning() {
      axios.get(route("eventmie.organiser_total_earning")).then((res) => {
        this.total_earning = res.data.total_earning;
        this.currency = res.data.currency;
      }).catch((error) => {
      });
    }
  },
  mounted() {
    this.getMyEvents();
    this.eventEarning();
    this.totalEarning();
  },
  watch: {
    date_range: function() {
      this.dateRange();
    },
    event_id: function() {
      this.eventEarning();
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "card shadow-sm border-0" }, [_c("div", { staticClass: "card-header d-flex justify-content-between flex-wrap p-4 bg-white border-bottom-0" }, [_c("div", { staticClass: "d-flex flex-column" }, [_c("div", [_c("h1", { staticClass: "fw-bold h2" }, [_vm._v(_vm._s(_vm.trans("em.myearning")))])]), _c("div", { staticClass: "d-flex" }, [_c("div", { staticClass: "me-2" }, [_c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.event_id, expression: "event_id" }], staticClass: "form-select", attrs: { "name": "event_id" }, on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.event_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  } } }, [_c("option", { attrs: { "value": "0" } }, [_vm._v(_vm._s(_vm.trans("em.all_events")) + " ")]), _vm._l(_vm.events, function(event, index) {
    return _c("option", { key: index, domProps: { "value": event.id } }, [_vm._v(_vm._s(event.title) + " ")]);
  })], 2)])])])]), _c("div", { staticClass: "row mx-3" }, [_c("div", { staticClass: "col-lg-4 col-md-12 col-12" }, [_c("div", { staticClass: "card bg-info mb-4 border-0 shadow-sm" }, [_c("div", { staticClass: "card-body p-4" }, [_c("div", [_c("h5", { staticClass: "mb-0 text-white" }, [_vm._v(_vm._s(_vm.trans("em.total_bookings")))])]), _c("div", { staticClass: "d-flex align-items-center justify-content-between mt-4" }, [_c("h2", { staticClass: "fw-bold mb-0 fs-1 text-white" }, [_vm._v(_vm._s(_vm.total_earning.customer_paid_total) + " " + _vm._s(_vm.currency))]), _c("i", { staticClass: "fas fa-cart-arrow-down text-white fa-2x" })])])])]), _c("div", { staticClass: "col-lg-4 col-md-12 col-12" }, [_c("div", { staticClass: "card bg-dark mb-4 border-0 shadow-sm" }, [_c("div", { staticClass: "card-body p-4" }, [_c("div", [_c("h5", { staticClass: "mb-0 text-white" }, [_vm._v(_vm._s(_vm.trans("em.total_admin_commission")))])]), _c("div", { staticClass: "d-flex align-items-center justify-content-between mt-4" }, [_c("h2", { staticClass: "fw-bold mb-0 fs-1 text-white" }, [_vm._v(_vm._s(_vm.total_earning.admin_commission_total) + " " + _vm._s(_vm.currency))]), _c("i", { staticClass: "fas fa-user-shield text-white fa-2x" })])])])]), _c("div", { staticClass: "col-lg-4 col-md-12 col-12" }, [_c("div", { staticClass: "card bg-success mb-4 border-0 shadow-sm" }, [_c("div", { staticClass: "card-body p-4" }, [_c("div", [_c("h5", { staticClass: "mb-0 text-white" }, [_vm._v(_vm._s(_vm.trans("em.total_profit")))])]), _c("div", { staticClass: "d-flex align-items-center justify-content-between mt-4" }, [_c("h2", { staticClass: "fw-bold mb-0 fs-1 text-white" }, [_vm._v(_vm._s(_vm.total_earning.organiser_earning_total) + " " + _vm._s(_vm.currency))]), _c("i", { staticClass: "fas fa-sack-dollar text-white fa-2x" })])])])])]), _c("div", { staticClass: "table-responsive" }, [_c("table", { staticClass: "table text-wrap" }, [_c("thead", { staticClass: "table-light text-nowrap" }, [_c("tr", [_c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.event")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.bookings")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.commission")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.profit")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.month")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.transferred")))])])]), _c("tbody", [_vm._l(_vm.event_earning, function(earning, index) {
    return _c("tr", { key: index }, [_c("td", { attrs: { "data-title": _vm.trans("em.event") } }, [_c("div", { staticClass: "d-flex align-items-center" }, [_c("a", { attrs: { "href": _vm.eventSlug(earning.event_slug) } }, [_c("img", { staticClass: "rounded img-4by3-md", attrs: { "src": _vm.getImageUrl(earning.event_thumbnail), "alt": earning.event_name } })]), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_c("a", { staticClass: "text-inherit text-wrap", attrs: { "href": _vm.eventSlug(earning.event_slug) } }, [_vm._v(_vm._s(earning.event_name))])]), _c("small", { staticClass: "text-success strong" }, [_c("i", { staticClass: "fas fa-bolt" }), _vm._v(" " + _vm._s(earning.count_bookings) + " " + _vm._s(_vm.trans("em.bookings")))])])])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.bookings") } }, [_vm._v(" " + _vm._s(earning.customer_paid_total) + " " + _vm._s(_vm.currency) + " ")]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.commission") } }, [_vm._v(" " + _vm._s(earning.admin_commission_total) + " " + _vm._s(_vm.currency) + " ")]), _c("td", { staticClass: "align-middle text-success", attrs: { "data-title": _vm.trans("em.profit") } }, [_c("i", { staticClass: "fas fa-sack-dollar" }), _vm._v(" " + _vm._s(earning.organiser_earning_total) + " " + _vm._s(_vm.currency) + " ")]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.month") } }, [_vm._v(" " + _vm._s(_vm.moment(earning.month_year, "MM YYYY").format("MMM ,YYYY")) + " ")]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.transferred") } }, [earning.transferred > 0 ? _c("span", { staticClass: "badge bg-success" }, [_vm._v(_vm._s(_vm.trans("em.paid")))]) : _c("span", { staticClass: "badge bg-primary" }, [_vm._v(_vm._s(_vm.trans("em.pending")))])])]);
  }), _vm.event_earning.length <= 0 ? _c("tr", [_c("td", { staticClass: "text-center align-middle", attrs: { "colspan": "6" } }, [_vm._v(_vm._s(_vm.trans("em.no_bookings")))])]) : _vm._e()], 2)])]), _vm.event_earning.length > 0 ? _c("div", { staticClass: "px-4 pb-4" }, [_vm.pagination.last_page > 1 ? _c("pagination-component", { attrs: { "pagination": _vm.pagination, "offset": _vm.pagination.total }, on: { "paginate": function($event) {
    return _vm.eventEarning();
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
const EventEarning = __component__.exports;
Vue.component("DatePicker", DatePicker);
const routes = new VueRouter({
  mode: "history",
  base: "/",
  linkExactActiveClass: "there",
  routes: [
    {
      path: path ? "/" + path + "/dashboard/myearning" : "/dashboard/myearning",
      // Inject  props based on route.query values for pagination
      props: (route2) => ({
        page: route2.query.page
      }),
      name: "event_earning_index",
      component: EventEarning
    }
  ]
});
window.app = new Vue({
  el: "#eventmie_app",
  router: routes
});
//# sourceMappingURL=index-DvybhuCn.js.map
