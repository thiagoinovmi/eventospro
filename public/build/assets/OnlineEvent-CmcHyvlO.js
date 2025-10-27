import { n as normalizeComponent } from "./mixins-DZWn0auj.js";
const _sfc_main = {
  props: ["booking_id", "online_location"],
  methods: {
    // reset form and close modal
    close: function() {
      this.$parent.booking_id = 0;
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _vm.booking_id > 0 ? _c("div", [_c("div", { staticClass: "custom_model" }, [_c("div", { staticClass: "modal show" }, [_c("div", { staticClass: "modal-dialog modal-lg w-100" }, [_c("div", { staticClass: "modal-content" }, [_c("div", { staticClass: "modal-header" }, [_c("h1", { staticClass: "modal-title fs-3", attrs: { "id": "exampleModalLabel" } }, [_vm._v(_vm._s(_vm.trans("em.online_details")) + " ")]), _c("button", { staticClass: "btn btn-sm bg-danger text-white close", attrs: { "type": "button", "data-bs-dismiss": "modal", "aria-label": "Close" }, on: { "click": function($event) {
    return _vm.close();
  } } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])])]), _c("div", { staticClass: "modal-body" }, [_c("div", { staticClass: "form-group text-wrap" }, [_c("div", { domProps: { "innerHTML": _vm._s(_vm.online_location) } })])])])])])])]) : _vm._e();
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
const OnlineEvent = __component__.exports;
export {
  OnlineEvent as O
};
//# sourceMappingURL=OnlineEvent-CmcHyvlO.js.map
