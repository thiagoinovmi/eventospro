import { n as normalizeComponent, m as mixinsFilters } from "./mixins-CenrxOSq.js";
import { P as PaginationComponent } from "./Pagination-BJbj9n2w.js";
import { O as OnlineEvent } from "./OnlineEvent-ojuL9xXN.js";
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
      booking_id: 0,
      timerInterval: null,
      timerCounter: 0
    };
  },
  computed: {
    current_page() {
      if (typeof this.page === "undefined")
        return 1;
      return this.page;
    },
    timerTrigger() {
      return this.timerCounter;
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
    },
    // Calcular tempo restante para expiração do QR Code
    getTimeRemaining(expiresAt) {
      if (!expiresAt) return "00:00:00";
      const now = moment();
      const expiration = moment(expiresAt);
      const diff = expiration.diff(now);
      if (diff <= 0) return "Expirado";
      const duration = moment.duration(diff);
      const minutes = Math.floor(duration.asMinutes());
      const seconds = duration.seconds();
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    },
    // Copiar código PIX para clipboard
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.showNotification("success", trans("em.copied_to_clipboard"));
      }).catch(() => {
        alert("Erro ao copiar para a área de transferência");
      });
    },
    // Limpar base64 removendo prefixo data:image se existir
    getCleanBase64(base64String) {
      if (!base64String) return "";
      if (base64String.startsWith("data:image")) {
        return base64String.replace(/^data:image\/[^;]+;base64,/, "");
      }
      return base64String;
    }
  },
  mounted() {
    this.getMyBookings();
    this.sendEmail();
    this.timerInterval = setInterval(() => {
      this.timerCounter++;
    }, 1e3);
  },
  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "container-fluid" }, [_c("div", { staticClass: "row py-5" }, [_c("div", { staticClass: "col-md-12" }, [_c("div", { staticClass: "card shadow-sm border-0" }, [_c("div", { staticClass: "card-header p-4 bg-white border-bottom-0" }), _c("div", { staticClass: "table-responsive" }, [_c("table", { staticClass: "table text-wrap table-hover" }, [_c("thead", { staticClass: "table-light text-nowrap" }, [_c("tr", [_c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.event")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.ticket")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.order_total")) + " ")]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.booked_on")) + " ")]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.payment")) + " ")]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.checked_in")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.status")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.cancellation")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.actions")))])])]), _c("tbody", [_vm._l(_vm.bookings, function(booking) {
    return _c("tr", { key: booking.id }, [_c("td", { attrs: { "data-title": _vm.trans("em.event") } }, [_c("div", { staticClass: "d-flex align-items-center" }, [_c("a", { attrs: { "href": _vm.eventSlug(booking.event_slug) } }, [_c("img", { staticClass: "rounded img-4by3-md", attrs: { "src": _vm.getImageUrl(booking.event_thumbnail), "alt": booking.event_title } })]), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_c("a", { staticClass: "text-inherit text-wrap", attrs: { "href": _vm.eventSlug(booking.event_slug) } }, [_vm._v(_vm._s(booking.event_title))])]), _c("p", { staticClass: "text-mute" }, [_c("small", { staticClass: "text-muted" }, [_vm._v(" " + _vm._s(_vm.userTimezone(booking.event_start_date + " " + booking.event_start_time, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm")) + " ")])]), _c("p", [_c("small", { staticClass: "text-success fw-bold" }, [_vm._v(_vm._s(_vm.trans("em.order_id")) + ": #" + _vm._s(booking.order_number))])])])])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.ticket") } }, [_c("i", { staticClass: "fas fa-ticket" }), _vm._v(" " + _vm._s(booking.ticket_title) + " "), _c("strong", [_vm._v(_vm._s(" x " + booking.quantity))])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.order_total") } }, [_vm._v(_vm._s(_vm.currency + " " + (booking.net_price || "0.00")) + " ")]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.booked_on") } }, [_vm._v(_vm._s(_vm.userTimezone(booking.created_at, "YYYY-MM-DD HH:mm:ss").format("DD/MM/YYYY HH:mm")))]), _c("td", { staticClass: "align-middle text-capitalize", attrs: { "data-title": _vm.trans("em.payment") } }, [booking.payment_type == "offline" ? _c("span", { staticClass: "badge bg-secondary text-white" }, [_vm._v(" " + _vm._s(booking.payment_type) + " "), _c("hr", { staticClass: "small p-0 m-0" }), booking.is_paid ? _c("small", { staticClass: "text-white" }, [_vm._v(_vm._s(_vm.trans("em.paid")))]) : _c("small", { staticClass: "text-white" }, [_vm._v(_vm._s(_vm.trans("em.unpaid")))])]) : _c("span", { staticClass: "badge", class: booking.is_paid ? "bg-success" : "bg-danger" }, [_vm._v(" " + _vm._s(booking.payment_type) + " "), _c("hr", { staticClass: "small p-0 m-0" }), _c("small", { staticClass: "text-white" }, [_vm._v(_vm._s(booking.is_paid ? _vm.trans("em.paid") : _vm.trans("em.unpaid")))])])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.checked_in") } }, [booking.checkins.length > 0 ? _c("p", _vm._l(booking.checkins, function(checkin) {
      return _c("span", { key: checkin.id, staticClass: "badge bg-success text-white fw-normal py-1 my-1" }, [_c("i", { staticClass: "fa-solid fa-check-circle" }), _vm._v(" " + _vm._s(_vm.moment(_vm.userTimezone(checkin.event_start_date + " " + checkin.check_in_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")).format(_vm.date_format.vue_date_format)) + " " + _vm._s(_vm.userTimezone(checkin.event_start_date + " " + checkin.check_in_time, "YYYY-MM-DD HH:mm:ss").format(_vm.date_format.vue_time_format)) + " ")]);
    }), 0) : _vm._e()]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.status") } }, [booking.status == 1 && booking.expired == 0 ? _c("span", { staticClass: "badge bg-success text-white" }, [_vm._v(_vm._s(_vm.trans("em.active")))]) : _c("span", { staticClass: "badge bg-danger text-white" }, [_vm._v(_vm._s(_vm.trans("em.inactive")))])]), booking.booking_cancel == 0 && booking.status == 1 && booking.checkins.length <= 0 && booking.expired == 0 ? _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.cancellation") } }, [_vm.disable_booking_cancellation == null ? _c("button", { staticClass: "btn btn-sm bg-danger text-white", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.bookingCancel(booking.id, booking.ticket_id, booking.event_id);
    } } }, [_c("i", { staticClass: "fas fa-ban" }), _vm._v(" " + _vm._s(_vm.trans("em.cancel")))]) : _c("p", [_vm._v(_vm._s(_vm.trans("em.n/a")))])]) : _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.cancellation") } }, [booking.booking_cancel == 0 ? _c("span", { staticClass: "badge bg-secondary text-white" }, [_vm._v(_vm._s(_vm.trans("em.disabled")))]) : _vm._e(), booking.booking_cancel == 1 ? _c("span", { staticClass: "badge bg-warning text-white" }, [_vm._v(_vm._s(_vm.trans("em.pending")))]) : _vm._e(), booking.booking_cancel == 2 ? _c("span", { staticClass: "badge bg-info text-white" }, [_vm._v(_vm._s(_vm.trans("em.approved")))]) : _vm._e(), booking.booking_cancel == 3 ? _c("span", { staticClass: "badge bg-secondary text-white" }, [_vm._v(_vm._s(_vm.trans("em.refunded")))]) : _vm._e()]), booking.expired == 1 ? _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.expired") } }, [_c("span", { staticClass: "badge bg-danger text-white" }, [_vm._v(" " + _vm._s(_vm.trans("em.expired")) + " ")])]) : _c("td", { staticClass: "align-middle text-nowrap", attrs: { "data-title": _vm.trans("em.actions") } }, [booking.payment_type === "mercadopago" && booking.mercadopago_transaction && booking.mercadopago_transaction.qr_code_base64 && !booking.is_paid ? _c("div", { staticClass: "mb-2" }, [_c("button", { staticClass: "btn btn-sm btn-warning text-white", attrs: { "type": "button", "data-bs-toggle": "modal", "data-bs-target": "#pixModal-" + booking.id } }, [_c("i", { staticClass: "fas fa-qrcode" }), _vm._v(" PIX QR Code ")])]) : _vm._e(), _vm.hide_ticket_download == null ? _c("div", { staticClass: "mb-2" }, [booking.is_paid == 1 && booking.status == 1 && booking.order_number ? _c("a", { staticClass: "btn btn-sm bg-danger text-white", attrs: { "href": _vm.downloadURL(booking.id, booking.order_number) } }, [_c("i", { staticClass: "fas fa-download" }), _vm._v(" " + _vm._s(_vm.trans("em.ticket")))]) : _c("span", { staticClass: "badge bg-danger text-white" }, [booking.is_paid == 0 && booking.status == 1 ? _c("small", { staticClass: "text-white" }, [_vm._v(_vm._s(_vm.trans("em.unpaid")))]) : _c("small", {}, [_vm._v(_vm._s(_vm.trans("em.disabled")))])])]) : _vm._e(), _vm.hide_google_calendar == null ? _c("div", { staticClass: "mb-2" }, [_c("create-google-event", { attrs: { "booking": booking, "date_format": _vm.date_format } })], 1) : _vm._e(), booking.online_location != null && booking.is_paid == 1 && booking.status == 1 ? _c("div", [_c("button", { staticClass: "btn btn-sm bg-parimary text-parimary", attrs: { "type": "button" }, on: { "click": function($event) {
      _vm.booking_id = booking.id;
    } } }, [_c("i", { staticClass: "fas fa-tv" }), _vm._v(" " + _vm._s(_vm.trans("em.online") + " " + _vm.trans("em.event")))]), _vm.booking_id == booking.id ? _c("online-event", { attrs: { "online_location": booking.online_location, "booking_id": booking.id } }) : _vm._e()], 1) : _vm._e()])]);
  }), _vm.bookings.length <= 0 ? _c("tr", [_c("td", { staticClass: "text-center align-middle", attrs: { "colspan": "10" } }, [_vm._v(_vm._s(_vm.trans("em.no_bookings")))])]) : _vm._e()], 2)])]), _vm._l(_vm.bookings, function(booking) {
    return _c("div", { key: "modal-" + booking.id }, [booking.payment_type === "mercadopago" && booking.mercadopago_transaction && booking.mercadopago_transaction.qr_code_base64 && !booking.is_paid ? _c("div", { staticClass: "modal fade", attrs: { "id": "pixModal-" + booking.id, "tabindex": "-1", "aria-labelledby": "pixModalLabel", "aria-hidden": "true" } }, [_c("div", { staticClass: "modal-dialog modal-lg" }, [_c("div", { staticClass: "modal-content" }, [_c("div", { staticClass: "modal-header bg-warning" }, [_c("h5", { staticClass: "modal-title", attrs: { "id": "pixModalLabel" } }, [_c("i", { staticClass: "fas fa-qrcode" }), _vm._v(" " + _vm._s(_vm.trans("em.pix_qr_code")) + " ")]), _c("button", { staticClass: "btn-close", attrs: { "type": "button", "data-bs-dismiss": "modal", "aria-label": "Close" } })]), _c("div", { staticClass: "modal-body" }, [_c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-md-6 text-center mb-4" }, [_c("h6", { staticClass: "mb-3" }, [_vm._v(_vm._s(_vm.trans("em.scan_qr_code")))]), _c("img", { staticClass: "img-fluid border rounded", staticStyle: { "max-width": "300px" }, attrs: { "src": "data:image/png;base64," + _vm.getCleanBase64(booking.mercadopago_transaction.qr_code_base64), "alt": "PIX QR Code" } }), _c("p", { staticClass: "text-muted small mt-3" }, [_c("i", { staticClass: "fas fa-clock text-danger" }), _c("strong", [_vm._v(_vm._s(_vm.trans("em.expires_in")) + ":")]), _c("span", { staticClass: "text-danger fw-bold" }, [_vm._v(_vm._s(_vm.getTimeRemaining(booking.mercadopago_transaction.qr_code_expires_at)))])])]), _c("div", { staticClass: "col-md-6" }, [_c("h6", { staticClass: "mb-3" }, [_vm._v(_vm._s(_vm.trans("em.pix_copy_paste")))]), _c("div", { staticClass: "input-group mb-3" }, [_c("input", { staticClass: "form-control", attrs: { "type": "text", "readonly": "" }, domProps: { "value": booking.mercadopago_transaction.qr_code } }), _c("button", { staticClass: "btn btn-outline-primary", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.copyToClipboard(booking.mercadopago_transaction.qr_code);
    } } }, [_c("i", { staticClass: "fas fa-copy" }), _vm._v(" " + _vm._s(_vm.trans("em.copy")) + " ")])]), _c("small", { staticClass: "text-muted d-block" }, [_vm._v(_vm._s(_vm.trans("em.pix_instructions")))]), _c("div", { staticClass: "mt-4 p-3 bg-light rounded" }, [_c("h6", { staticClass: "mb-3" }, [_vm._v(_vm._s(_vm.trans("em.order_details")))]), _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-6" }, [_c("small", { staticClass: "text-muted" }, [_vm._v(_vm._s(_vm.trans("em.order_id")))]), _c("p", { staticClass: "fw-bold" }, [_vm._v("#" + _vm._s(booking.order_number))])]), _c("div", { staticClass: "col-6" }, [_c("small", { staticClass: "text-muted" }, [_vm._v(_vm._s(_vm.trans("em.order_total")))]), _c("p", { staticClass: "fw-bold" }, [_vm._v(_vm._s(_vm.currency) + " " + _vm._s(booking.net_price))])])])])])])]), _c("div", { staticClass: "modal-footer" }, [_c("button", { staticClass: "btn btn-secondary", attrs: { "type": "button", "data-bs-dismiss": "modal" } }, [_vm._v(_vm._s(_vm.trans("em.close")))])])])])]) : _vm._e()]);
  }), _vm.bookings.length > 0 ? _c("div", { staticClass: "px-4 pb-4" }, [_vm.pagination.last_page > 1 ? _c("pagination-component", { attrs: { "pagination": _vm.pagination, "offset": _vm.pagination.total }, on: { "paginate": function($event) {
    return _vm.getMyBookings();
  } } }) : _vm._e()], 1) : _vm._e()], 2)])])]);
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
//# sourceMappingURL=index-3l5s3HSl.js.map
