import { n as normalizeComponent } from "./mixins-CenrxOSq.js";
const _sfc_main = {
  props: ["pagination", "offset", "path", "page"],
  watch: {
    "$route"(to, from) {
      this.changePage(this.current_page);
    }
  },
  computed: {
    current_page() {
      if (typeof this.page === "undefined")
        return 1;
      return this.page;
    }
  },
  methods: {
    isCurrentPage(p_page) {
      return this.pagination.current_page === p_page;
    },
    changePage(p_page) {
      if (p_page > this.pagination.last_page) {
        p_page = this.pagination.last_page;
      }
      this.pagination.current_page = p_page;
      this.$emit("paginate");
    },
    query(newQuery) {
      return {
        ...this.$route.query,
        ...newQuery
      };
    }
  },
  computed: {
    pages() {
      let pages = [];
      let from = this.pagination.current_page - Math.floor(this.offset / 2);
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset - 1;
      if (to > this.pagination.last_page) {
        to = this.pagination.last_page;
      }
      while (from <= to) {
        pages.push(from);
        from++;
      }
      return pages;
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-6 d-flex flex-wrap justify-content-between" }, [_c("ul", { staticClass: "pagination" }, [_c("li", { staticClass: "page-item" }, [_vm.pagination.current_page > 1 ? _c("router-link", { class: "page-link pagination-previous", attrs: { "to": { path: _vm.path, query: _vm.query({ page: 1 }) } } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_c("i", { staticClass: "fa-solid fa-angles-left" }), _vm._v(" " + _vm._s(_vm.trans("em.first")))])]) : _vm._e()], 1), _c("li", { staticClass: "page-item" }, [_vm.pagination.current_page > 1 ? _c("router-link", { class: "page-link  pagination-previous", attrs: { "to": { path: _vm.path, query: _vm.query({ page: _vm.pagination.current_page - 1 }) } } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_c("i", { staticClass: "fa-solid fa-angle-left" }), _vm._v(" " + _vm._s(_vm.trans("em.previous")))])]) : _vm._e()], 1)]), _c("ul", { staticClass: "pagination d-flex flex-wrap" }, _vm._l(_vm.pagination.links, function(page, index) {
    return _c("li", { key: index, staticClass: "page-item" }, [!isNaN(page.label) ? _c("router-link", { staticClass: "page-link", class: { "active": page.active }, attrs: { "to": { path: _vm.path, query: _vm.query({ page: page.label }) } } }, [_vm._v(_vm._s(page.label) + " ")]) : _vm._e()], 1);
  }), 0), _c("ul", { staticClass: "pagination" }, [_c("li", { staticClass: "page-item" }, [_vm.pagination.current_page < _vm.pagination.last_page ? _c("router-link", { class: "page-link pagination-next", attrs: { "to": { path: _vm.path, query: _vm.query({ page: _vm.pagination.current_page + 1 }) } } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v(_vm._s(_vm.trans("em.next")) + " "), _c("i", { staticClass: "fa-solid fa-angle-right" })])]) : _vm._e()], 1), _c("li", { staticClass: "page-item" }, [_vm.pagination.current_page < _vm.pagination.last_page ? _c("router-link", { class: "page-link pagination-next", attrs: { "to": { path: _vm.path, query: _vm.query({ page: _vm.pagination.last_page }) } } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v(_vm._s(_vm.trans("em.last")) + " "), _c("i", { staticClass: "fa-solid fa-angles-right" })])]) : _vm._e()], 1)])]);
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
const PaginationComponent = __component__.exports;
export {
  PaginationComponent as P
};
//# sourceMappingURL=Pagination-BJbj9n2w.js.map
