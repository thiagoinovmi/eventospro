import { n as normalizeComponent, m as mixinsFilters } from "./mixins-DZWn0auj.js";
import { P as PaginationComponent } from "./Pagination-smYCG8Sc.js";
import { O as OnlineEvent } from "./OnlineEvent-CmcHyvlO.js";
const _sfc_main$1 = {
  mixins: [
    mixinsFilters
  ],
  props: ["booking", "date_format"],
  computed: {
    addToGoogleCalendar() {
      let start_date = this.userTimezone(this.booking.event_start_date + " " + this.booking.event_start_time, "YYYY-MM-DD HH:mm:ss").format("YYYYMMDDT");
      let start_time = this.userTimezone(this.booking.event_start_date + " " + this.booking.event_start_time, "YYYY-MM-DD HH:mm:ss").format("HHmmSS");
      let end_date = this.userTimezone(this.booking.event_end_date + " " + this.booking.event_end_time, "YYYY-MM-DD HH:mm:ss").format("YYYYMMDDT");
      let end_time = this.userTimezone(this.booking.event_end_date + " " + this.booking.event_end_time, "YYYY-MM-DD HH:mm:ss").format("HHmmSS");
      if (start_date >= end_date)
        end_date = start_date;
      let google = "https://www.google.com/calendar/render?action=TEMPLATE";
      google += "&text=" + this.booking.event_title;
      google += "&dates=" + start_date + start_time + "/" + end_date + end_time;
      if (this.booking.event_excerpt != null)
        google += "&details=" + this.booking.event_excerpt;
      google += "&location=" + this.booking.event_venue;
      google += "&sprop=website:" + window.location.hostname;
      google += "&sprop=name:" + this.booking.event_slug;
      return google;
    }
  }
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _vm.booking.is_paid == 1 && _vm.booking.status == 1 ? _c("div", [_c("a", { staticClass: "btn btn-sm bg-primary text-white", attrs: { "href": _vm.addToGoogleCalendar, "target": "_blank" } }, [_c("i", { staticClass: "fab fa-google" }), _vm._v(" " + _vm._s(_vm.trans("em.add_event_to_google")))])]) : _vm._e();
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
const CreateGoogleEvent = __component__$1.exports;
const _sfc_main = {
  mixins: [
    mixinsFilters
  ],
  props: [
    // pagination query string
    "page",
    "is_success",
    "date_format",
    "disable_booking_cancellation",
    "hide_ticket_download",
    "hide_google_calendar"
  ],
  components: {
    PaginationComponent,
    OnlineEvent,
    CreateGoogleEvent
  },
  data() {
    return {
      bookings: [],
      moment,
      pagination: {
        "current_page": 1
      },
      currency: null,
      booking_id: 0
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
    // get all events
    getMyBookings() {
      axios.get(route("eventmie.mybookings") + "?page=" + this.current_page).then((res) => {
        this.currency = res.data.currency;
        this.bookings = res.data.bookings.data;
        this.pagination = {
          "total": res.data.bookings.total,
          "per_page": res.data.bookings.per_page,
          "current_page": res.data.bookings.current_page,
          "last_page": res.data.bookings.last_page,
          "from": res.data.bookings.from,
          "to": res.data.bookings.to,
          "links": res.data.bookings.links
        };
      }).catch((error) => {
      });
    },
    // cancel my booking
    bookingCancel(booking_id, ticket_id, event_id) {
      this.showConfirm(trans("em.ask_cancel_booking")).then((res) => {
        if (res) {
          axios.post(route("eventmie.mybookings_cancel"), {
            booking_id,
            ticket_id,
            event_id
          }).then((res2) => {
            if (res2.data.status) {
              this.showNotification("success", trans("em.booking_cancel_success"));
              this.getMyBookings();
            }
          }).catch((error) => {
          });
        }
      });
    },
    // return route with event slug
    eventSlug(slug) {
      if (slug) {
        return route("eventmie.events_show", [slug]);
      }
    },
    // return route with download URL
    downloadURL(id, order_number) {
      if (id && order_number) {
        return route("eventmie.downloads_index", [id, order_number]);
      }
    }
  },
  mounted() {
    this.getMyBookings();
    this.sendEmail();
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "container-fluid" }, [_c("div", { staticClass: "row py-5" }, [_c("div", { staticClass: "col-md-12" }, [_c("div", { staticClass: "card shadow-sm border-0" }, [_c("div", { staticClass: "card-header p-4 bg-white border-bottom-0" }), _c("div", { staticClass: "table-responsive" }, [_c("table", { staticClass: "table text-wrap table-hover" }, [_c("thead", { staticClass: "table-light text-nowrap" }, [_c("tr", [_c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.event")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.ticket")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.order_total")) + " ")]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.booked_on")) + " ")]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.payment")) + " ")]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.checked_in")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.status")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.cancellation")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.actions")))])])]), _c("tbody", [_vm._l(_vm.bookings, function(booking, index) {
    return _c("tr", { key: index }, [_c("td", { attrs: { "data-title": _vm.trans("em.event") } }, [_c("div", { staticClass: "d-flex align-items-center" }, [_c("a", { attrs: { "href": _vm.eventSlug(booking.event_slug) } }, [_c("img", { staticClass: "rounded img-4by3-md", attrs: { "src": _vm.getImageUrl(booking.event_thumbnail), "alt": booking.event_title } })]), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_c("a", { staticClass: "text-inherit text-wrap", attrs: { "href": _vm.eventSlug(booking.event_slug) } }, [_vm._v(_vm._s(booking.event_title))])]), _c("p", { staticClass: "text-mute" }, [booking.event_start_date != booking.event_end_date ? _c("small", { staticClass: "text-muted" }, [_vm._v(" " + _vm._s(_vm.moment(_vm.userTimezone(booking.event_start_date + " " + booking.event_start_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")).format(_vm.date_format.vue_date_format)) + " ")]) : _c("small", { staticClass: "text-muted" }, [_vm._v(" " + _vm._s(_vm.moment(_vm.userTimezone(booking.event_start_date + " " + booking.event_start_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")).format(_vm.date_format.vue_date_format)) + " ")]), _c("small", { staticClass: "text-muted" }, [_vm._v(" " + _vm._s(_vm.userTimezone(booking.event_start_date + " " + booking.event_start_time, "YYYY-MM-DD HH:mm:ss").format(_vm.date_format.vue_time_format)) + " ")]), _c("small", { staticClass: "text-muted" }, [_vm._v(" " + _vm._s(_vm.showTimezone()) + " ")])]), _c("p", [_c("small", { staticClass: "text-success fw-bold" }, [_vm._v(_vm._s(_vm.trans("em.order_id")) + ": #" + _vm._s(booking.order_number))])])])])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.ticket") } }, [_c("i", { staticClass: "fas fa-ticket" }), _vm._v(" " + _vm._s(booking.ticket_title) + " "), _c("strong", [_vm._v(_vm._s(" x " + booking.quantity))])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.order_total") } }, [_vm._v(_vm._s(booking.net_price + " " + _vm.currency) + " ")]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.booked_on") } }, [_vm._v(_vm._s(_vm.moment(_vm.userTimezone(booking.created_at, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")).format(_vm.date_format.vue_date_format)) + " " + _vm._s(_vm.showTimezone()))]), _c("td", { staticClass: "align-middle text-capitalize", attrs: { "data-title": _vm.trans("em.payment") } }, [booking.payment_type == "offline" ? _c("span", { staticClass: "badge bg-secondary text-white" }, [_vm._v(" " + _vm._s(booking.payment_type) + " "), _c("hr", { staticClass: "small p-0 m-0" }), booking.is_paid ? _c("small", { staticClass: "text-white" }, [_vm._v(_vm._s(_vm.trans("em.paid")))]) : _c("small", { staticClass: "text-white" }, [_vm._v(_vm._s(_vm.trans("em.unpaid")))])]) : _c("span", { staticClass: "badge bg-success text-white" }, [_vm._v(_vm._s(booking.payment_type) + " "), _c("hr", { staticClass: "small" }), _c("small", { staticClass: "text-small" }, [_vm._v(_vm._s(booking.is_paid ? _vm.trans("em.paid") : _vm.trans("em.unpaid")))])])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.checked_in") } }, [booking.checkins.length > 0 ? _c("p", _vm._l(booking.checkins, function(checkin) {
      return _c("span", { key: checkin.id, staticClass: "badge bg-success text-white fw-normal py-1 my-1" }, [_c("i", { staticClass: "fa-solid fa-check-circle" }), _vm._v(" " + _vm._s(_vm.moment(_vm.userTimezone(checkin.event_start_date + " " + checkin.check_in_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")).format(_vm.date_format.vue_date_format)) + " " + _vm._s(_vm.userTimezone(checkin.event_start_date + " " + checkin.check_in_time, "YYYY-MM-DD HH:mm:ss").format(_vm.date_format.vue_time_format)) + " ")]);
    }), 0) : _vm._e()]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.status") } }, [booking.status == 1 && booking.expired == 0 ? _c("span", { staticClass: "badge bg-success text-white" }, [_vm._v(_vm._s(_vm.trans("em.active")))]) : _c("span", { staticClass: "badge bg-danger text-white" }, [_vm._v(_vm._s(_vm.trans("em.inactive")))])]), booking.booking_cancel == 0 && booking.status == 1 && booking.checkins.length <= 0 && booking.expired == 0 ? _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.cancellation") } }, [_vm.disable_booking_cancellation == null ? _c("button", { staticClass: "btn btn-sm bg-danger text-white", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.bookingCancel(booking.id, booking.ticket_id, booking.event_id);
    } } }, [_c("i", { staticClass: "fas fa-ban" }), _vm._v(" " + _vm._s(_vm.trans("em.cancel")))]) : _c("p", [_vm._v(_vm._s(_vm.trans("em.n/a")))])]) : _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.cancellation") } }, [booking.booking_cancel == 0 ? _c("span", { staticClass: "badge bg-secondary text-white" }, [_vm._v(_vm._s(_vm.trans("em.disabled")))]) : _vm._e(), booking.booking_cancel == 1 ? _c("span", { staticClass: "badge bg-warning text-white" }, [_vm._v(_vm._s(_vm.trans("em.pending")))]) : _vm._e(), booking.booking_cancel == 2 ? _c("span", { staticClass: "badge bg-info text-white" }, [_vm._v(_vm._s(_vm.trans("em.approved")))]) : _vm._e(), booking.booking_cancel == 3 ? _c("span", { staticClass: "badge bg-secondary text-white" }, [_vm._v(_vm._s(_vm.trans("em.refunded")))]) : _vm._e()]), booking.expired == 1 ? _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.expired") } }, [_c("span", { staticClass: "badge bg-danger text-white" }, [_vm._v(" " + _vm._s(_vm.trans("em.expired")) + " ")])]) : _c("td", { staticClass: "align-middle text-nowrap", attrs: { "data-title": _vm.trans("em.actions") } }, [_vm.hide_ticket_download == null ? _c("div", { staticClass: "mb-2" }, [booking.is_paid == 1 && booking.status == 1 ? _c("a", { staticClass: "btn btn-sm bg-danger text-white", attrs: { "href": _vm.downloadURL(booking.id, booking.order_number) } }, [_c("i", { staticClass: "fas fa-download" }), _vm._v(" " + _vm._s(_vm.trans("em.ticket")))]) : _c("span", { staticClass: "badge bg-danger text-white" }, [booking.is_paid == 0 && booking.status == 1 ? _c("small", { staticClass: "text-white" }, [_vm._v(_vm._s(_vm.trans("em.unpaid")))]) : _c("small", {}, [_vm._v(_vm._s(_vm.trans("em.disabled")))])])]) : _vm._e(), _vm.hide_google_calendar == null ? _c("div", { staticClass: "mb-2" }, [_c("create-google-event", { attrs: { "booking": booking, "date_format": _vm.date_format } })], 1) : _vm._e(), booking.online_location != null && booking.is_paid == 1 && booking.status == 1 ? _c("div", [_c("button", { staticClass: "btn btn-sm bg-parimary text-parimary", attrs: { "type": "button" }, on: { "click": function($event) {
      _vm.booking_id = booking.id;
    } } }, [_c("i", { staticClass: "fas fa-tv" }), _vm._v(" " + _vm._s(_vm.trans("em.online") + " " + _vm.trans("em.event")))]), _vm.booking_id == booking.id ? _c("online-event", { attrs: { "online_location": booking.online_location, "booking_id": booking.id } }) : _vm._e()], 1) : _vm._e()])]);
  }), _vm.bookings.length <= 0 ? _c("tr", [_c("td", { staticClass: "text-center align-middle", attrs: { "colspan": "10" } }, [_vm._v(_vm._s(_vm.trans("em.no_bookings")))])]) : _vm._e()], 2)])]), _vm.bookings.length > 0 ? _c("div", { staticClass: "px-4 pb-4" }, [_vm.pagination.last_page > 1 ? _c("pagination-component", { attrs: { "pagination": _vm.pagination, "offset": _vm.pagination.total }, on: { "paginate": function($event) {
    return _vm.getMyBookings();
  } } }) : _vm._e()], 1) : _vm._e()])])])]);
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
const MyBooking = __component__.exports;
const routes = new VueRouter({
  mode: "history",
  base: "/",
  linkExactActiveClass: "there",
  routes: [
    {
      path: path ? "/" + path + "/mybookings" : "/mybookings",
      // Inject  props based on route.query values for pagination
      props: (route2) => ({
        page: route2.query.page,
        date_format,
        disable_booking_cancellation,
        hide_ticket_download,
        hide_google_calendar
      }),
      name: "mybookings",
      component: MyBooking
    }
  ]
});
window.app = new Vue({
  el: "#eventmie_app",
  router: routes
});
//# sourceMappingURL=index-DnKsgJx6.js.map
