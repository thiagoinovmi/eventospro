import { n as normalizeComponent, m as mixinsFilters } from "./mixins-CO2EmGtw.js";
import { P as PaginationComponent } from "./Pagination-DVYAWWC9.js";
import { D as DatePicker } from "./index.esm-BNIJhBgk.js";
import { O as OnlineEvent } from "./OnlineEvent-DGsW96ZK.js";
const _sfc_main$1 = {
  props: ["booking"],
  mixins: [
    mixinsFilters
  ],
  data() {
    return {
      openModal: false,
      booking_cancel: null,
      status: null,
      is_paid: 0
    };
  },
  methods: {
    // reset form and close modal
    close: function() {
      this.booking_cancel = null;
      this.status = null;
      this.$refs.form.reset();
      this.openModal = false;
      this.$parent.edit_index = null;
    },
    editBooking() {
      this.booking_cancel = this.booking.booking_cancel;
      this.status = this.booking.status;
      this.is_paid = this.booking.is_paid;
    },
    // validate data on form submit
    validateForm(event) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.formSubmit(event);
        }
      });
    },
    // show server validation errors
    serverValidate(serrors) {
      this.$validator.validateAll().then((result) => {
        this.$validator.errors.add(serrors);
      });
    },
    // submit form
    formSubmit(event) {
      let post_url = route("eventmie.obookings_organiser_bookings_edit");
      if (this.$parent.role.id == 4)
        post_url = route("eventmie.pos.edit_bookings");
      let post_data = new FormData(this.$refs.form);
      axios.post(post_url, post_data).then((res) => {
        this.close();
        this.updateItem();
        if (res.data.status)
          Vue.helpers.showToast("success", trans("em.booking_updat_success"));
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    updateItem() {
      this.$emit("changeItem");
    }
  },
  mounted() {
    if (this.booking) {
      this.editBooking();
      this.openModal = true;
    }
  }
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "custom_model" }, [_vm.openModal ? _c("div", { staticClass: "modal show" }, [_c("div", { staticClass: "modal-dialog modal-lg w-100" }, [_c("div", { staticClass: "modal-content" }, [_c("div", { staticClass: "modal-header" }, [_c("h1", { staticClass: "modal-title fs-3" }, [_vm._v(_vm._s(_vm.trans("em.update_booking_status")))]), _c("button", { staticClass: "btn btn-sm bg-danger text-white close", attrs: { "type": "button", "data-bs-dismiss": "modal", "aria-label": "Close" }, on: { "click": function($event) {
    return _vm.close();
  } } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])])]), _c("div", { staticClass: "modal-body" }, [_c("form", { ref: "form", attrs: { "method": "POST", "enctype": "multipart/form-data" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.booking.customer_id, expression: "booking.customer_id" }], staticClass: "form-control", attrs: { "type": "hidden", "name": "customer_id" }, domProps: { "value": _vm.booking.customer_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.$set(_vm.booking, "customer_id", $event.target.value);
  } } }), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.booking.event_id, expression: "booking.event_id" }], staticClass: "form-control", attrs: { "type": "hidden", "name": "event_id" }, domProps: { "value": _vm.booking.event_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.$set(_vm.booking, "event_id", $event.target.value);
  } } }), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.booking.id, expression: "booking.id" }], staticClass: "form-control", attrs: { "type": "hidden", "name": "booking_id" }, domProps: { "value": _vm.booking.id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.$set(_vm.booking, "id", $event.target.value);
  } } }), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.booking.ticket_id, expression: "booking.ticket_id" }], staticClass: "form-control", attrs: { "type": "hidden", "name": "ticket_id" }, domProps: { "value": _vm.booking.ticket_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.$set(_vm.booking, "ticket_id", $event.target.value);
  } } }), _c("div", { staticClass: "modal-body" }, [_c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.booking_cancellation")))]), _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.booking_cancel, expression: "booking_cancel" }, { name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control", attrs: { "name": "booking_cancel" }, on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.booking_cancel = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  } } }, [_c("option", { attrs: { "value": "0" } }, [_vm._v(_vm._s(_vm.trans("em.no_cancellation")) + " ")]), _c("option", { attrs: { "value": "1" } }, [_vm._v(_vm._s(_vm.trans("em.cancellation_pending")) + " ")]), _c("option", { attrs: { "value": "2" } }, [_vm._v(_vm._s(_vm.trans("em.cancellation_approved")) + " ")]), _c("option", { attrs: { "value": "3" } }, [_vm._v(_vm._s(_vm.trans("em.amount_refunded")) + " ")])]), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("booking_cancel"), expression: "errors.has('booking_cancel')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("booking_cancel")))])]), _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-md-12" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.booking_status")))])]), _c("div", { staticClass: "col-md-12 mb-3" }, [_c("label", { staticClass: "radio-inline" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.status, expression: "status" }], attrs: { "type": "radio", "value": "1", "name": "status" }, domProps: { "checked": _vm._q(_vm.status, "1") }, on: { "change": function($event) {
    _vm.status = "1";
  } } }), _vm._v(" " + _vm._s(_vm.trans("em.enable")) + " ")]), _c("label", { staticClass: "radio-inline" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.status, expression: "status" }], attrs: { "type": "radio", "value": "0", "name": "status" }, domProps: { "checked": _vm._q(_vm.status, "0") }, on: { "change": function($event) {
    _vm.status = "0";
  } } }), _vm._v(" " + _vm._s(_vm.trans("em.disable")) + " ")])]), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("status"), expression: "errors.has('status')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("status")))])]), _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-md-12" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.booking_paid")) + " ")])]), _c("div", { staticClass: "col-md-12 mb-3" }, [_c("label", { staticClass: "radio-inline" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.is_paid, expression: "is_paid" }], attrs: { "type": "radio", "value": "1", "name": "is_paid" }, domProps: { "checked": _vm._q(_vm.is_paid, "1") }, on: { "change": function($event) {
    _vm.is_paid = "1";
  } } }), _vm._v(" " + _vm._s(_vm.trans("em.yes")) + " ")]), _c("label", { staticClass: "radio-inline" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.is_paid, expression: "is_paid" }], attrs: { "type": "radio", "value": "0", "name": "is_paid" }, domProps: { "checked": _vm._q(_vm.is_paid, "0") }, on: { "change": function($event) {
    _vm.is_paid = "0";
  } } }), _vm._v(" " + _vm._s(_vm.trans("em.no")) + " ")])]), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("is_paid"), expression: "errors.has('is_paid')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("is_paid")))])])]), _c("div", { staticClass: "modal-footer" }, [_c("button", { staticClass: "btn btn-primary", attrs: { "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")))])])])])])])]) : _vm._e()]);
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
const EditBooking = __component__$1.exports;
const _sfc_main = {
  mixins: [
    mixinsFilters
  ],
  props: [
    // pagination query string
    "page",
    "is_success",
    "date_format",
    "hide_ticket_download",
    "role",
    "user"
  ],
  components: {
    PaginationComponent,
    EditBooking,
    DatePicker,
    OnlineEvent
    //CUSTOM
    //CUSTOM
  },
  data() {
    return {
      bookings: [],
      moment,
      edit_index: null,
      pagination: {
        "current_page": 1
      },
      currency: null,
      date_range: [],
      start_date: "",
      end_date: "",
      booking_id: 0,
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
    // get all events
    getOrganiserBookings() {
      if (typeof this.start_date === "undefined") {
        this.start_date = "";
      }
      if (typeof this.end_date === "undefined") {
        this.end_date = "";
      }
      if (typeof this.event_start_date === "undefined") {
        this.event_start_date = "";
      }
      if (typeof this.event_end_date === "undefined") {
        this.event_end_date = "";
      }
      let booking_route = route("eventmie.obookings_organiser_bookings");
      if (this.role.id == 4)
        booking_route = route("eventmie.pos.bookings");
      if (this.role.id == 5)
        booking_route = route("eventmie.scanner.bookings");
      axios.get(booking_route + "?page=" + this.current_page + "&event_id=" + this.event_id + "&start_date=" + this.start_date + "&end_date=" + this.end_date + "&length=" + this.length + "&search=" + this.search + "&event_start_date=" + this.event_start_date + "&event_end_date=" + this.event_end_date).then((res) => {
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
    // view booking by organiser 
    organiserViewBooking(booking_id) {
      axios.get(route("eventmie.obookings_organiser_bookings_show", [booking_id])).then((res) => {
        if (res.data.status) {
          this.getOrganiserBookings();
        }
      }).catch((error) => {
      });
    },
    // view booking
    goto_route(id) {
      if (this.role.id == 3)
        return route("eventmie.obookings_organiser_bookings_show", { id });
      if (this.role.id == 4)
        return route("eventmie.pos.show", { id });
      if (this.role.id == 5)
        return route("eventmie.scanner.show", { id });
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
        this.getOrganiserBookings();
      }
    },
    // get all events
    getMyEvents() {
      let events_route = route("eventmie.all_myevents");
      if (this.role.id == 4)
        events_route = route("eventmie.pos.events");
      if (this.role.id == 5)
        events_route = route("eventmie.scanner.events");
      axios.get(events_route).then((res) => {
        this.events = res.data.myevents;
      }).catch((error) => {
      });
    }
  },
  mounted() {
    this.getOrganiserBookings();
    this.getMyEvents();
    this.sendEmail();
  },
  watch: {
    date_range: function() {
      this.dateRange();
    },
    event_id: function() {
      this.getOrganiserBookings();
    }
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "card shadow-sm border-0" }, [_c("div", { staticClass: "card-header d-flex justify-content-between flex-wrap p-4 bg-white border-bottom-0" }, [_c("div", { staticClass: "d-flex flex-column" }, [_c("div", [_c("h1", { staticClass: "fw-bold h2" }, [_vm._v(_vm._s(_vm.trans("em.mybookings")))])]), _c("div", { staticClass: "d-flex" }, [_c("div", { staticClass: "me-2" }, [_c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.event_id, expression: "event_id" }], staticClass: "form-select", attrs: { "name": "event_id" }, on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.event_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  } } }, [_c("option", { attrs: { "value": "0" } }, [_vm._v(_vm._s(_vm.trans("em.all_events")) + " ")]), _vm._l(_vm.events, function(event, index) {
    return _c("option", { key: index, domProps: { "value": event.id } }, [_vm._v(_vm._s(event.title) + " ")]);
  })], 2)]), _c("div", { staticClass: "me-2" }, [_c("date-picker", { staticClass: "form-control", attrs: { "shortcuts": _vm.shortcuts, "range": "", "lang": _vm.$vue2_datepicker_lang, "placeholder": _vm.trans("em.booking_date"), "format": "YYYY-MM-DD " }, model: { value: _vm.date_range, callback: function($$v) {
    _vm.date_range = $$v;
  }, expression: "date_range" } })], 1)])])]), _c("div", { staticClass: "table-responsive" }, [_c("table", { staticClass: "table text-wrap" }, [_c("thead", { staticClass: "table-light text-nowrap" }, [_c("tr", [_c("th", { staticClass: "border-top-0 border-bottom-0 d-md-none" }, [_vm._v(_vm._s(_vm.trans("em.actions")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.event")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.customer_email")) + " ")]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.ticket")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.order_total")) + " ")]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.booked_on")) + " ")]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.payment")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.checked_in")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.status")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.cancellation")))]), _c("th", { staticClass: "border-top-0 border-bottom-0 d-none d-md-table-cell" }, [_vm._v(_vm._s(_vm.trans("em.actions")))])])]), _c("tbody", [_vm._l(_vm.bookings, function(booking, index) {
    return _c("tr", { key: index }, [booking.expired == 1 ? _c("td", { staticClass: "align-middle text-nowrap d-md-none", attrs: { "data-title": _vm.trans("em.actions") } }, [_c("span", { staticClass: "badge bg-danger text-white" }, [_vm._v(" " + _vm._s(_vm.trans("em.expired")) + " ")])]) : _c("td", { staticClass: "align-middle text-nowrap d-md-none", attrs: { "data-title": _vm.trans("em.actions") } }, [_vm.role.id != 5 ? _c("div", { staticClass: "mb-2 btn-group" }, [_c("a", { staticClass: "btn btn-secondary btn-sm", attrs: { "href": _vm.goto_route(booking.id) } }, [_c("i", { staticClass: "fas fa-info" }), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.trans("em.view")))])]), _c("button", { staticClass: "btn btn-info btn-sm", attrs: { "type": "button" }, on: { "click": function($event) {
      _vm.edit_index = index;
    } } }, [_c("i", { staticClass: "fas fa-edit" }), _c("span", [_vm._v(_vm._s(_vm.trans("em.edit")))])]), _vm.edit_index == index ? _c("edit-booking", { attrs: { "booking": booking }, on: { "changeItem": _vm.getOrganiserBookings } }) : _vm._e()], 1) : _vm._e(), _vm.hide_ticket_download == null ? _c("div", { staticClass: "mb-2" }, [booking.is_paid == 1 && booking.status == 1 ? _c("a", { staticClass: "btn btn-sm bg-danger text-white", attrs: { "href": _vm.downloadURL(booking.id, booking.order_number) } }, [_c("i", { staticClass: "fas fa-download" }), _vm._v(" " + _vm._s(_vm.trans("em.ticket")))]) : _c("span", { staticClass: "badge bg-danger text-white" }, [booking.is_paid == 0 && booking.status == 1 ? _c("small", { staticClass: "text-white" }, [_vm._v(_vm._s(_vm.trans("em.unpaid")))]) : _c("small", {}, [_vm._v(_vm._s(_vm.trans("em.disabled")))])])]) : _vm._e(), _vm.hide_google_calendar == null ? _c("div", { staticClass: "mb-2" }, [_c("create-google-event", { attrs: { "booking": booking, "date_format": _vm.date_format } })], 1) : _vm._e(), booking.online_location != null && booking.is_paid == 1 && booking.status == 1 ? _c("div", [_c("button", { staticClass: "btn btn-sm bg-parimary text-parimary", attrs: { "type": "button" }, on: { "click": function($event) {
      _vm.booking_id = booking.id;
    } } }, [_c("i", { staticClass: "fas fa-tv" }), _vm._v(" " + _vm._s(_vm.trans("em.online") + " " + _vm.trans("em.event")))]), _vm.booking_id == booking.id ? _c("online-event", { attrs: { "online_location": booking.online_location, "booking_id": booking.id } }) : _vm._e()], 1) : _vm._e()]), _c("td", { attrs: { "data-title": _vm.trans("em.event") } }, [_c("div", { staticClass: "d-flex align-items-center" }, [_c("a", { attrs: { "href": _vm.eventSlug(booking.event_slug) } }, [_c("img", { staticClass: "rounded img-4by3-md", attrs: { "src": _vm.getImageUrl(booking.event_thumbnail), "alt": booking.event_title } })]), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_c("a", { staticClass: "text-inherit text-wrap", attrs: { "href": _vm.eventSlug(booking.event_slug) } }, [_vm._v(_vm._s(booking.event_title))])]), _c("p", { staticClass: "text-mute" }, [booking.event_start_date != booking.event_end_date ? _c("small", { staticClass: "text-muted" }, [_vm._v(" " + _vm._s(_vm.moment(_vm.userTimezone(booking.event_start_date + " " + booking.event_start_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")).format(_vm.date_format.vue_date_format)) + " ")]) : _c("small", { staticClass: "text-muted" }, [_vm._v(" " + _vm._s(_vm.moment(_vm.userTimezone(booking.event_start_date + " " + booking.event_start_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")).format(_vm.date_format.vue_date_format)) + " ")]), _c("small", { staticClass: "text-muted" }, [_vm._v(" " + _vm._s(_vm.userTimezone(booking.event_start_date + " " + booking.event_start_time, "YYYY-MM-DD HH:mm:ss").format(_vm.date_format.vue_time_format)) + " ")]), _c("small", { staticClass: "text-muted" }, [_vm._v(" " + _vm._s(_vm.showTimezone()) + " ")])]), _c("p", [_c("small", { staticClass: "text-success fw-bold" }, [_vm._v(_vm._s(_vm.trans("em.order_id")) + ": #" + _vm._s(booking.order_number))])])])])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.customer_email") } }, [_vm._v(_vm._s(booking.customer_email))]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.ticket") } }, [_c("i", { staticClass: "fas fa-ticket" }), _vm._v(" " + _vm._s(booking.ticket_title) + " "), _c("strong", [_vm._v(_vm._s(" x " + booking.quantity))])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.order_total") } }, [_vm._v(_vm._s(booking.net_price + " " + _vm.currency) + " ")]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.booked_on") } }, [_vm._v(_vm._s(_vm.moment(_vm.userTimezone(booking.created_at, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")).format(_vm.date_format.vue_date_format)) + " " + _vm._s(_vm.showTimezone()))]), _c("td", { staticClass: "align-middle text-capitalize", attrs: { "data-title": _vm.trans("em.payment") } }, [booking.payment_type == "offline" ? _c("span", { staticClass: "badge bg-secondary text-white" }, [_vm._v(" " + _vm._s(booking.payment_type) + " "), _c("hr", { staticClass: "small p-0 m-0" }), booking.is_paid ? _c("small", { staticClass: "text-white" }, [_vm._v(_vm._s(_vm.trans("em.paid")))]) : _c("small", { staticClass: "text-white" }, [_vm._v(_vm._s(_vm.trans("em.unpaid")))])]) : _c("span", { staticClass: "badge bg-success text-white" }, [_vm._v(_vm._s(booking.payment_type) + " "), _c("hr", { staticClass: "small" }), _c("small", { staticClass: "text-small" }, [_vm._v(_vm._s(booking.is_paid ? _vm.trans("em.paid") : _vm.trans("em.unpaid")))])])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.checked_in") } }, [booking.checkins.length > 0 ? _c("p", _vm._l(booking.checkins, function(checkin) {
      return _c("span", { key: checkin.id, staticClass: "badge bg-success text-white fw-normal py-1 my-1" }, [_c("i", { staticClass: "fa-solid fa-check-circle" }), _vm._v(" " + _vm._s(_vm.moment(_vm.userTimezone(checkin.event_start_date + " " + checkin.check_in_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD")).format(_vm.date_format.vue_date_format)) + " " + _vm._s(_vm.userTimezone(checkin.event_start_date + " " + checkin.check_in_time, "YYYY-MM-DD HH:mm:ss").format(_vm.date_format.vue_time_format)) + " ")]);
    }), 0) : _vm._e()]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.status") } }, [booking.status == 1 && booking.expired == 0 ? _c("span", { staticClass: "badge bg-success text-white" }, [_vm._v(_vm._s(_vm.trans("em.active")))]) : _c("span", { staticClass: "badge bg-danger text-white" }, [_vm._v(_vm._s(_vm.trans("em.inactive")))])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.cancellation") } }, [booking.booking_cancel == 0 && booking.status == 1 ? _c("span", { staticClass: "badge bg-success text-white" }, [_vm._v(_vm._s(_vm.trans("em.no")))]) : _vm._e(), booking.booking_cancel == 0 && booking.status == 0 ? _c("span", { staticClass: "badge bg-secondary text-white" }, [_vm._v(_vm._s(_vm.trans("em.disabled")))]) : _vm._e(), booking.booking_cancel == 1 ? _c("span", { staticClass: "badge bg-warning text-white" }, [_vm._v(_vm._s(_vm.trans("em.pending")))]) : _vm._e(), booking.booking_cancel == 2 ? _c("span", { staticClass: "badge bg-info text-white" }, [_vm._v(_vm._s(_vm.trans("em.approved")))]) : _vm._e(), booking.booking_cancel == 3 ? _c("span", { staticClass: "badge bg-secondary text-white" }, [_vm._v(_vm._s(_vm.trans("em.refunded")))]) : _vm._e()]), booking.expired == 1 ? _c("td", { staticClass: "align-middle text-nowrap d-none d-md-table-cell", attrs: { "data-title": _vm.trans("em.actions") } }, [_c("span", { staticClass: "badge bg-danger text-white" }, [_vm._v(" " + _vm._s(_vm.trans("em.expired")) + " ")])]) : _c("td", { staticClass: "align-middle text-nowrap d-none d-md-table-cell", attrs: { "data-title": _vm.trans("em.actions") } }, [_vm.role.id != 5 ? _c("div", { staticClass: "mb-2 btn-group" }, [_c("a", { staticClass: "btn btn-secondary btn-sm", attrs: { "href": _vm.goto_route(booking.id) } }, [_c("i", { staticClass: "fas fa-info" }), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.trans("em.view")))])]), _c("button", { staticClass: "btn btn-info btn-sm", attrs: { "type": "button" }, on: { "click": function($event) {
      _vm.edit_index = index;
    } } }, [_c("i", { staticClass: "fas fa-edit" }), _c("span", [_vm._v(_vm._s(_vm.trans("em.edit")))])]), _vm.edit_index == index ? _c("edit-booking", { attrs: { "booking": booking }, on: { "changeItem": _vm.getOrganiserBookings } }) : _vm._e()], 1) : _vm._e(), _vm.hide_ticket_download == null ? _c("div", { staticClass: "mb-2" }, [booking.is_paid == 1 && booking.status == 1 ? _c("a", { staticClass: "btn btn-sm bg-danger text-white", attrs: { "href": _vm.downloadURL(booking.id, booking.order_number) } }, [_c("i", { staticClass: "fas fa-download" }), _vm._v(" " + _vm._s(_vm.trans("em.ticket")))]) : _c("span", { staticClass: "badge bg-danger text-white" }, [booking.is_paid == 0 && booking.status == 1 ? _c("small", { staticClass: "text-white" }, [_vm._v(_vm._s(_vm.trans("em.unpaid")))]) : _c("small", {}, [_vm._v(_vm._s(_vm.trans("em.disabled")))])])]) : _vm._e(), _vm.hide_google_calendar == null ? _c("div", { staticClass: "mb-2" }, [_c("create-google-event", { attrs: { "booking": booking, "date_format": _vm.date_format } })], 1) : _vm._e(), booking.online_location != null && booking.is_paid == 1 && booking.status == 1 ? _c("div", [_c("button", { staticClass: "btn btn-sm bg-parimary text-parimary", attrs: { "type": "button" }, on: { "click": function($event) {
      _vm.booking_id = booking.id;
    } } }, [_c("i", { staticClass: "fas fa-tv" }), _vm._v(" " + _vm._s(_vm.trans("em.online") + " " + _vm.trans("em.event")))]), _vm.booking_id == booking.id ? _c("online-event", { attrs: { "online_location": booking.online_location, "booking_id": booking.id } }) : _vm._e()], 1) : _vm._e()])]);
  }), _vm.bookings.length <= 0 ? _c("tr", [_c("td", { staticClass: "text-center align-middle", attrs: { "colspan": "10" } }, [_vm._v(_vm._s(_vm.trans("em.no_bookings")))])]) : _vm._e()], 2)])]), _vm.bookings.length > 0 ? _c("div", { staticClass: "px-4 pb-4" }, [_vm.pagination.last_page > 1 ? _c("pagination-component", { attrs: { "pagination": _vm.pagination, "offset": _vm.pagination.total }, on: { "paginate": function($event) {
    return _vm.getOrganiserBookings();
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
const OrganiserBooking = __component__.exports;
const routes = new VueRouter({
  mode: "history",
  base: "/",
  linkExactActiveClass: "there",
  routes: [
    {
      path,
      // Inject  props based on route.query values for pagination
      props: (route2) => ({
        page: route2.query.page,
        date_format,
        hide_ticket_download,
        hide_google_calendar
      }),
      name: "organiserbooking",
      component: OrganiserBooking
    }
  ]
});
window.app = new Vue({
  el: "#eventmie_app",
  router: routes
});
//# sourceMappingURL=index-xCm4w1Cc.js.map
