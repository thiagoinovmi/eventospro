import { n as normalizeComponent, m as mixinsFilters } from "./mixins-CenrxOSq.js";
import { T as TagComponent } from "./Tag-Co6Nxy1_.js";
import { P as PaginationComponent } from "./Pagination-BJbj9n2w.js";
import "./vuex.esm-BLukzcBM.js";
const _sfc_main = {
  props: [
    "organiser_id",
    "page"
  ],
  components: {
    TagComponent,
    PaginationComponent
  },
  mixins: [
    mixinsFilters
  ],
  data() {
    return {
      tags: [],
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
    getTags() {
      axios.post(route("eventmie.tags") + "?page=" + this.current_page, {
        organiser_id: this.organiser_id
      }).then((res) => {
        this.tags = res.data.tags.data;
        this.pagination = {
          "total": res.data.tags.total,
          "per_page": res.data.tags.per_page,
          "current_page": res.data.tags.current_page,
          "last_page": res.data.tags.last_page,
          "from": res.data.tags.from,
          "to": res.data.tags.to,
          "links": res.data.tags.links
        };
      }).catch((error) => {
        Vue.helpers.axiosErrors(error);
      });
    },
    deleteTag(tag_id) {
      this.showConfirm(trans("em.delete_tag_ask")).then((res) => {
        if (res) {
          axios.post(route("eventmie.tags_delete"), {
            tag_id
          }).then((res2) => {
            if (res2.data.status) {
              this.getTags();
              this.showNotification("success", trans("em.delete_tag_succcess"));
            }
          }).catch((error) => {
            Vue.helpers.axiosErrors(error);
          });
        }
      });
    }
  },
  mounted() {
    this.getTags();
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "card shadow-sm border-0" }, [_c("div", { staticClass: "card-header d-flex justify-content-between flex-wrap p-4 bg-white border-bottom-0" }, [_c("div", [_c("h1", { staticClass: "mb-0 fw-bold h2" }, [_vm._v(_vm._s(_vm.trans("em.mytags")))])]), _c("div", [_c("Tag-component", { attrs: { "organiser_id": _vm.organiser_id } })], 1)]), _c("div", { staticClass: "table-responsive" }, [_c("table", { staticClass: "table text-wrap" }, [_c("thead", { staticClass: "table-light text-nowrap" }, [_c("tr", [_c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.name")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.type")))]), _c("th", { staticClass: "border-top-0 border-bottom-0" }, [_vm._v(_vm._s(_vm.trans("em.actions")))])])]), _c("tbody", [_vm._l(_vm.tags, function(item, index) {
    return _c("tr", { key: item.id, attrs: { "item": item, "index": index } }, [_c("td", { attrs: { "data-title": _vm.trans("em.name") } }, [_c("div", { staticClass: "d-flex align-items-center" }, [_c("img", { staticClass: "rounded img-4by3-md", attrs: { "src": _vm.getImageUrl(item.image), "alt": item.title } }), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_vm._v(_vm._s(item.title))]), _c("small", { staticClass: "text-muted strong" }, [_vm._v(_vm._s(item.sub_title))])])])]), _c("td", { staticClass: "align-middle", attrs: { "data-title": _vm.trans("em.type") } }, [_vm._v(_vm._s(item.type))]), _c("td", { staticClass: "align-middle text-nowrap", attrs: { "data-title": _vm.trans("em.actions") } }, [_c("div", { staticClass: "btn-group" }, [_c("button", { staticClass: "btn btn-sm btn-primary", attrs: { "type": "button" }, on: { "click": function($event) {
      _vm.edit_index = index;
    } } }, [_c("i", { staticClass: "fas fa-edit" }), _vm._v(" " + _vm._s(_vm.trans("em.edit")))]), _c("button", { staticClass: "btn btn-sm btn-danger", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.deleteTag(item.id);
    } } }, [_c("i", { staticClass: "fas fa-trash" }), _vm._v(" " + _vm._s(_vm.trans("em.delete")))])]), _vm.edit_index == index ? _c("Tag-component", { attrs: { "edit_tag": item } }) : _vm._e()], 1)]);
  }), _vm.tags.length <= 0 ? _c("tr", [_c("td", { staticClass: "text-center align-middle" }, [_vm._v(_vm._s(_vm.trans("em.no_tags")))])]) : _vm._e()], 2)])]), _vm.tags.length > 0 ? _c("div", { staticClass: "px-4 pb-4" }, [_vm.pagination.last_page > 1 ? _c("pagination-component", { attrs: { "pagination": _vm.pagination, "offset": _vm.pagination.total }, on: { "paginate": function($event) {
    return _vm.getTags();
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
const Tags = __component__.exports;
const routes = new VueRouter({
  mode: "history",
  base: "/",
  linkExactActiveClass: "there",
  routes: [
    {
      path: path ? "/" + path + "/dashboard/mytags" : "/dashboard/mytags",
      // Inject  props based on route.query values for pagination
      props: (route2) => ({
        page: route2.query.page
      }),
      name: "Tags",
      component: Tags
    }
  ]
});
window.app = new Vue({
  el: "#eventmie_app",
  router: routes
});
//# sourceMappingURL=index-Cz3UEm41.js.map
