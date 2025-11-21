import { n as normalizeComponent, m as mixinsFilters, _ } from "./mixins-DsimpN2H.js";
import { V as VueMatchHeights } from "./vue-match-heights-Oi5mu7tV.js";
import { D as DatePicker } from "./index.esm-BNIJhBgk.js";
import { P as PaginationComponent } from "./Pagination-BM8l-uY9.js";
import { E as EventListing } from "./EventListing-D3GFoeom.js";
const _sfc_main$1 = {
  mixins: [mixinsFilters],
  props: ["categories", "dark_mode"],
  methods: {
    categoryUrl(name) {
      return route("eventmie.events_index") + "?category=" + encodeURIComponent(name);
    }
  },
  mounted() {
    console.log(this.dark_mode, "dark_mode");
  }
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "row g-1", class: { "h-scroll": !_vm.dark_mode, "h-scroll-dark": _vm.dark_mode } }, _vm._l(_vm.categories, function(category, index) {
    return _c("div", { key: index, staticClass: "col-auto card card-cat p-3 me-2" }, [_c("a", { staticClass: "text-white", attrs: { "href": _vm.categoryUrl(category.name) } }, [_c("div", { staticClass: "position-relative" }, [_c("img", { staticClass: "img-fluid mb-2", style: { width: "32px", height: "32px" }, attrs: { "src": _vm.getImageUrl(category.icon) } })]), _c("div", { staticClass: "lh-1 fw-normal text-start text-xxs text-white" }, [_vm._v(" " + _vm._s(category.name.substring(0, 25) + `${category.name.length > 25 ? ".." : ""}`) + " ")])])]);
  }), 0);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  null
);
const SingleCategory = __component__$1.exports;
const _sfc_main = {
  props: [
    // pagination query string
    "page",
    "category",
    "search",
    "price",
    "city",
    "state",
    "country",
    "start_date",
    "end_date",
    "date_format"
  ],
  components: {
    PaginationComponent,
    EventListing,
    SingleCategory
  },
  mixins: [mixinsFilters],
  data() {
    return {
      events: [],
      categories: [],
      pagination: {
        current_page: 1
      },
      moment,
      date_range: [],
      f_price: "",
      // filters
      f_category: "All",
      f_search: "",
      // filter by location
      f_city: "All",
      f_state: "All",
      f_country: "All",
      countries: [],
      states: [],
      cities: [],
      currency: null,
      f_start_date: "",
      f_end_date: "",
      item_count: 2,
      filter_toggle: false,
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
            this.date_range = [
              moment().add(1, "day").toDate(),
              moment().add(1, "day").toDate()
            ];
          }
        },
        {
          text: trans("em.this_week"),
          onClick: () => {
            this.date_range = [
              moment().startOf("week").toDate(),
              moment().endOf("week").toDate()
            ];
          }
        },
        {
          text: trans("em.next_week"),
          onClick: () => {
            this.date_range = [
              moment().add(1, "weeks").startOf("week").toDate(),
              moment().add(1, "weeks").endOf("week").toDate()
            ];
          }
        },
        {
          text: trans("em.this_month"),
          onClick: () => {
            this.date_range = [
              moment().startOf("month").toDate(),
              moment().endOf("month").toDate()
            ];
          }
        },
        {
          text: trans("em.next_month"),
          onClick: () => {
            this.date_range = [
              moment().add(1, "months").startOf("month").toDate(),
              moment().add(1, "months").endOf("month").toDate()
            ];
          }
        }
      ]
    };
  },
  watch: {
    $route(to, from) {
      this.debouncedgGetEvents();
    },
    // filters
    // searching f_category
    f_category: function() {
      if (this.f_category) {
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            category: this.f_category,
            page: 1
          })
        }).catch(() => {
        });
      } else {
        let query = Object.assign({}, this.$route.query);
        delete query.category;
        this.$router.replace({ query });
      }
    },
    // seraching by f_search
    f_search: function() {
      if (this.f_search) {
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            search: this.f_search,
            page: 1
          })
        }).catch(() => {
        });
      } else {
        let query = Object.assign({}, this.$route.query);
        delete query.search;
        this.$router.replace({ query });
      }
    },
    // searching by date
    date_range: function() {
      var is_date_null = true;
      if (this.date_range) {
        this.date_range.forEach(
          (function(value, key) {
            if (value != null) {
              is_date_null = false;
              if (key == 0) this.f_start_date = this.convert_date(value);
              if (key == 1) this.f_end_date = this.convert_date(value);
            }
          }).bind(this)
        );
        if (is_date_null == false) {
          this.$router.push({
            query: Object.assign({}, this.$route.query, {
              start_date: this.f_start_date,
              page: 1
            })
          }).catch(() => {
          });
          this.$router.push({
            query: Object.assign({}, this.$route.query, {
              end_date: this.f_end_date,
              page: 1
            })
          }).catch(() => {
          });
        } else {
          this.f_start_date = "";
          this.f_end_date = "";
          let query = Object.assign({}, this.$route.query);
          delete query.start_date;
          delete query.end_date;
          this.$router.replace({ query });
        }
      }
    },
    // searching by f_price
    f_price: function() {
      if (this.f_price) {
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            price: this.f_price,
            page: 1
          })
        }).catch(() => {
        });
      } else {
        let query = Object.assign({}, this.$route.query);
        delete query.price;
        this.$router.replace({ query });
      }
    },
    // seraching by f_city
    f_city: function() {
      if (this.f_city) {
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            city: this.f_city,
            page: 1
          })
        }).catch(() => {
        });
      } else {
        let query = Object.assign({}, this.$route.query);
        delete query.city;
        this.$router.replace({ query });
      }
    },
    // seraching by f_state
    f_state: function() {
      if (this.f_state) {
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            state: this.f_state,
            page: 1
          })
        }).catch(() => {
        });
      } else {
        let query = Object.assign({}, this.$route.query);
        delete query.state;
        this.$router.replace({ query });
      }
    },
    // searching f_country
    f_country: function() {
      if (this.f_country) {
        let _this = this;
        if (_this.f_country == "All") _this.f_city = "All";
        if (Object.entries(_this.countries).length > 0) {
          let c = Object.entries(_this.countries).find(
            (obj) => obj.city == _this.f_city
          );
          if (c == void 0) _this.f_city = "All";
        }
        this.$router.push({
          query: Object.assign({}, this.$route.query, {
            country: this.f_country,
            page: 1
          })
        }).catch(() => {
        });
      } else {
        let query = Object.assign({}, this.$route.query);
        delete query.country;
        this.$router.replace({ query });
      }
    }
  },
  computed: {
    current_page() {
      if (typeof this.page === "undefined") return 1;
      return this.page;
    }
  },
  methods: {
    checkEvents() {
    },
    // get all events
    getEvents() {
      if (typeof this.f_start_date === "undefined") {
        this.f_start_date = "";
      }
      if (typeof this.f_end_date === "undefined") {
        this.f_end_date = "";
      }
      axios.get(
        route("eventmie.events") + "?page=" + this.current_page + "&category=" + encodeURIComponent(this.f_category) + "&search=" + this.f_search + "&start_date=" + this.f_start_date + "&end_date=" + this.f_end_date + "&price=" + this.f_price + "&city=" + this.f_city + "&state=" + this.f_state + "&country=" + encodeURIComponent(this.f_country)
      ).then((res) => {
        this.currency = res.data.events.currency;
        this.events = res.data.events.data;
        this.pagination = {
          total: res.data.events.total,
          per_page: res.data.events.per_page,
          current_page: res.data.events.current_page,
          last_page: res.data.events.last_page,
          from: res.data.events.from,
          to: res.data.events.to,
          links: res.data.events.links
        };
        this.countries = res.data.events.countries, this.states = res.data.events.states, this.cities = res.data.events.cities, // events sorting funtion
        this.eventSorting();
      }).catch((error) => {
      });
    },
    // get categories
    getCategories() {
      axios.get(route("eventmie.myevents_categories")).then((res) => {
        if (res.status) this.categories = res.data.categories;
      }).catch((error) => {
      });
    },
    // serch event with 5 delay
    debouncedgGetEvents: _.debounce(function() {
      this.getEvents();
    }, 1e3),
    // reset searching fields
    reset() {
      this.$router.replace({});
      this.f_search = "";
      this.f_category = "All";
      this.date_range = "";
      this.f_start_date = "";
      this.f_end_date = "";
      this.f_price = "";
      this.f_city = "All";
      this.f_state = "All";
      this.f_country = "All";
    },
    // events sorting
    eventSorting() {
      if (this.events.length > 0) {
        let events_started = [];
        let events_ended = [];
        let $this = this;
        this.events.forEach(function(v, k) {
          if (v.repetitive == 1) {
            if (moment().format("YYYY-MM-DD") <= $this.convert_date_to_local(v.end_date, "YYYY-MM-DD")) {
              events_started.push(v);
            } else {
              events_ended.push(v);
            }
          } else {
            if (moment().format("YYYY-MM-DD") <= $this.convert_date_to_local(v.end_date, "YYYY-MM-DD")) {
              events_started.push(v);
            } else {
              events_ended.push(v);
            }
          }
        });
        this.events = [];
        this.events.push(...events_started);
        this.events.push(...events_ended);
        return this.events;
      }
    },
    // set query string if have query string when page refresh
    setQueryString() {
      this.f_search = typeof this.search !== "undefined" ? decodeURIComponent(this.search) : "";
      this.f_category = this.category ? decodeURIComponent(this.category).replace(/\+/g, " ") : "All";
      this.f_price = typeof this.price !== "undefined" ? decodeURIComponent(this.price) : "";
      this.f_city = typeof this.city !== "undefined" ? decodeURIComponent(this.city) : "All";
      this.f_state = typeof this.state !== "undefined" ? decodeURIComponent(this.state) : "All";
      this.f_country = this.country ? decodeURIComponent(this.country).replace(/\+/g, " ") : "All";
      if (typeof this.start_date !== "undefined" && typeof this.end_date !== "undefined") {
        this.date_range = [
          this.setDateTime(this.start_date),
          this.setDateTime(this.end_date)
        ];
        this.f_start_date = this.start_date;
        this.f_end_date = this.end_date;
        this.filter_toggle = true;
      }
      if (this.f_search != "" || this.f_category != "All" || this.f_price != "" || this.f_city != "All" || this.f_state != "All" || this.f_country != "All")
        this.filter_toggle = true;
    }
  },
  mounted() {
    this.setQueryString();
    this.getEvents();
    this.getCategories();
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "container" }, [_c("div", { staticClass: "mt-lg-10 mt-12" }, [_c("single-category", { attrs: { "categories": _vm.categories, "dark_mode": true } })], 1), _c("div", { staticClass: "py-4 py-lg-5" }, [_c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-12" }, [_c("div", { staticClass: "d-flex justify-content-between align-items-center" }, [_c("h4", { staticClass: "mb-0" }, [_c("button", { staticClass: "btn btn-outline-primary btn-sm", attrs: { "type": "button" }, on: { "click": function($event) {
    _vm.filter_toggle = !_vm.filter_toggle;
  } } }, [_c("i", { staticClass: "fas fa-bars" })]), _vm._v(" " + _vm._s(_vm.trans("em.filters")) + " ")]), _c("div", [_c("button", { staticClass: "btn btn-outline-secondary btn-sm", attrs: { "type": "button" }, on: { "click": function($event) {
    return _vm.reset();
  } } }, [_c("i", { staticClass: "fas fa-redo" }), _vm._v(" " + _vm._s(_vm.trans("em.reset_filters")) + " ")])])])])]), _c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.filter_toggle, expression: "filter_toggle" }], staticClass: "row mt-3" }, [_c("div", { staticClass: "col-md-3" }, [_c("div", { staticClass: "form-group mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.search_event")) + " ")]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.f_search, expression: "f_search" }], staticClass: "form-control", attrs: { "type": "text", "placeholder": _vm.trans("em.search_event_by") }, domProps: { "value": _vm.f_search }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.f_search = $event.target.value;
  } } })])]), _c("div", { staticClass: "col-md-3" }, [_c("div", { staticClass: "form-group mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.date")))]), _c("date-picker", { staticClass: "form-control", attrs: { "shortcuts": _vm.shortcuts, "range": "", "lang": _vm.$vue2_datepicker_lang, "placeholder": _vm.trans("em.date_filter"), "format": "YYYY-MM-DD" }, model: { value: _vm.date_range, callback: function($$v) {
    _vm.date_range = $$v;
  }, expression: "date_range" } })], 1)]), _c("div", { staticClass: "col-md-3" }, [_c("div", { staticClass: "form-group mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.price")))]), _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.f_price, expression: "f_price" }], staticClass: "form-select", attrs: { "id": "dateSelect", "name": "price" }, on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.f_price = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  } } }, [_c("option", { attrs: { "value": "" } }, [_vm._v(_vm._s(_vm.trans("em.any_price")))]), _c("option", { attrs: { "value": "free" } }, [_vm._v(_vm._s(_vm.trans("em.free")))]), _c("option", { attrs: { "value": "paid" } }, [_vm._v(_vm._s(_vm.trans("em.paid")))])])])]), _c("div", { staticClass: "col-md-3" }, [_c("div", { staticClass: "form-group mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.country")))]), _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.f_country, expression: "f_country" }], staticClass: "form-select", attrs: { "name": "country" }, on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.f_country = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  } } }, [_c("option", { attrs: { "value": "All" } }, [_vm._v(_vm._s(_vm.trans("em.all")))]), _vm._l(_vm.countries, function(country, index) {
    return _c("option", { key: index, domProps: { "value": country.country_name } }, [_vm._v(" " + _vm._s(country.country_name) + " ")]);
  })], 2)])]), _c("div", { staticClass: "col-md-3" }, [_c("div", { staticClass: "form-group mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.state")))]), _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.f_state, expression: "f_state" }], staticClass: "form-select", attrs: { "name": "state" }, on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.f_state = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  } } }, [_c("option", { attrs: { "value": "All" } }, [_vm._v(_vm._s(_vm.trans("em.all")))]), _vm._l(_vm.states, function(state, index) {
    return _c("option", { key: index, domProps: { "value": state.state } }, [_vm._v(" " + _vm._s(state.state) + " ")]);
  })], 2)])]), _c("div", { staticClass: "col-md-3" }, [_c("div", { staticClass: "form-group mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.city")))]), _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.f_city, expression: "f_city" }], staticClass: "form-select", attrs: { "name": "city", "disabled": _vm.f_country == "All" }, on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.f_city = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  } } }, [_c("option", { attrs: { "value": "All" } }, [_vm._v(_vm._s(_vm.trans("em.all")))]), _vm._l(_vm.cities, function(city, index) {
    return _c("option", { key: index, domProps: { "value": city.city } }, [_vm._v(" " + _vm._s(city.city) + " , " + _vm._s(city.state) + " ")]);
  })], 2)])])]), _c("div", { staticClass: "row mt-3" }, [_c("div", { staticClass: "col-12" }, [_c("event-listing", { attrs: { "events": _vm.events, "currency": _vm.currency, "date_format": _vm.date_format, "item_count": _vm.item_count } }), _vm.events.length > 0 ? _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-12" }, [_c("pagination-component", { attrs: { "pagination": _vm.pagination, "offset": _vm.pagination.total }, on: { "paginate": function($event) {
    return _vm.checkEvents();
  } } })], 1)]) : _vm._e()], 1)])])]);
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
const Events = __component__.exports;
Vue.use(VueMatchHeights);
Vue.use(DatePicker);
const routes = new VueRouter({
  mode: "history",
  base: "/",
  linkExactActiveClass: "there",
  routes: [
    {
      path: path ? "/" + path + "/events" : "/events",
      // Inject  props based on route.query values for pagination
      props: (route2) => ({
        page: route2.query.page,
        category: route2.query.category,
        search: route2.query.search,
        price: route2.query.price,
        start_date: route2.query.start_date,
        end_date: route2.query.end_date,
        city: route2.query.city,
        state: route2.query.state,
        country: route2.query.country,
        date_format
      }),
      name: "events",
      component: Events
    }
  ]
});
window.app = new Vue({
  el: "#eventmie_app",
  router: routes
});
//# sourceMappingURL=index-BYqKndA_.js.map
