import { m as mapMutations } from "./vuex.esm-BLukzcBM.js";
import { n as normalizeComponent, m as mixinsFilters } from "./mixins-DsimpN2H.js";
const _sfc_main = {
  props: ["edit_tag", "organiser_id"],
  mixins: [
    mixinsFilters
  ],
  data() {
    return {
      imageSrc: "/ep_img/512x512.webp",
      openModal: false,
      // important!!! declare all form fields
      image: null,
      title: null,
      type: null,
      sub_title: null,
      phone: null,
      email: null,
      facebook: null,
      instagram: null,
      twitter: null,
      website: null,
      linkedin: null,
      is_page: 0,
      editorData: null,
      disable: false
    };
  },
  methods: {
    // update global variables
    ...mapMutations(["add", "update"]),
    // reset form and close modal
    close: function() {
      this.$refs.form.reset();
      this.$parent.edit_index = null;
      this.openModal = false;
    },
    editTags() {
      this.imageSrc = this.getImageUrl(this.edit_tag.image);
      this.title = this.edit_tag.title;
      this.type = this.edit_tag.type;
      this.sub_title = this.edit_tag.sub_title;
      this.description = this.edit_tag.description;
      this.phone = this.edit_tag.phone;
      this.email = this.edit_tag.email;
      this.facebook = this.edit_tag.facebook;
      this.instagram = this.edit_tag.instagram;
      this.twitter = this.edit_tag.twitter;
      this.website = this.edit_tag.website;
      this.linkedin = this.edit_tag.linkedin;
      this.is_page = this.edit_tag.is_page;
      this.editorData = this.edit_tag.description;
    },
    // create data
    // preview file if any
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let reader = new FileReader();
      let vm = this;
      reader.onload = (e) => {
        vm.image = e.target.result;
        vm.imageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
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
      this.showLoaderNotification(trans("em.processing"));
      this.disable = true;
      let post_url = route("eventmie.tags_store");
      let post_data = new FormData(this.$refs.form);
      axios.post(post_url, post_data).then((res) => {
        this.close();
        this.showNotification("success", trans("em.tag_saved_successfully"));
        setTimeout(function() {
          location.reload(true);
        }, 1e3);
      }).catch((error) => {
        this.disable = false;
        Swal.hideLoading();
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    updateItem() {
      this.$emit("changeItem");
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader, field) {
      if (!file || !file.type.startsWith("image/")) {
        this.showNotification("error", "Invalid file type. Please upload an image.");
        resetUploader();
        return;
      }
      let post_url = route("eventmie.mytags_media");
      let formData = new FormData();
      formData.append("image", file);
      formData.append("field", field);
      axios.post(post_url, formData).then((result) => {
        if (result.data && result.data.url) {
          const url = result.data.url;
          Editor.insertEmbed(cursorLocation, "image", url);
        } else {
          this.showNotification("error", "Image upload failed. Please try again.");
        }
        resetUploader();
      }).catch((err) => {
        console.error(err);
        this.showNotification("error", "An error occurred during the upload.");
      });
    }
  },
  mounted() {
    if (typeof this.edit_tag !== "undefined") {
      this.editTags();
      this.openModal = true;
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "custom_model" }, [!_vm.edit_tag ? _c("button", { staticClass: "btn btn-secondary", attrs: { "type": "button" }, on: { "click": function($event) {
    _vm.openModal = true;
  } } }, [_c("i", { staticClass: "fa fa-user-tag" }), _vm._v(" " + _vm._s(_vm.trans("em.add_tag")))]) : _vm._e(), _vm.openModal ? _c("div", { staticClass: "modal show" }, [_c("div", { staticClass: "modal-dialog modal-lg w-100" }, [_c("div", { staticClass: "modal-content" }, [_c("div", { staticClass: "modal-header" }, [_c("h1", { staticClass: "modal-title fs-3", attrs: { "id": "exampleModalLabel" } }, [_vm._v(_vm._s(!_vm.edit_tag ? _vm.trans("em.new") : _vm.trans("em.edit")) + " " + _vm._s(_vm.trans("em.tag")))]), _c("button", { staticClass: "btn btn-sm bg-danger text-white close", attrs: { "type": "button", "data-bs-dismiss": "modal", "aria-label": "Close" }, on: { "click": function($event) {
    return _vm.close();
  } } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])])]), _c("div", { staticClass: "modal-body" }, [_c("form", { ref: "form", attrs: { "method": "POST", "enctype": "multipart/form-data" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_vm.edit_tag ? _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.edit_tag.id, expression: "edit_tag.id" }], staticClass: "form-control lgxname", attrs: { "type": "hidden", "name": "tag_id" }, domProps: { "value": _vm.edit_tag.id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.$set(_vm.edit_tag, "id", $event.target.value);
  } } }) : _vm._e(), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.organiser_id, expression: "organiser_id" }], staticClass: "form-control lgxname", attrs: { "type": "hidden", "name": "organiser_id" }, domProps: { "value": _vm.organiser_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.organiser_id = $event.target.value;
  } } }), _c("div", { staticClass: "modal-body" }, [_c("div", { staticClass: "avatar-upload mb-3" }, [_c("div", { staticClass: "avatar-edit" }, [_c("label", { staticClass: "form-label", attrs: { "for": "image" } }, [_vm._v(_vm._s(_vm.trans("em.image")))]), _c("input", { staticClass: "form-control", attrs: { "type": "file", "name": "image", "id": "image" }, on: { "change": _vm.onFileChange } })]), _c("div", { staticClass: "avatar-preview" }, [_c("div", { attrs: { "id": "imagePreview" } }, [_c("img", { staticClass: "rounded d-block w-20", attrs: { "src": _vm.imageSrc } })])]), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("image"), expression: "errors.has('image')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("image")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "name" } }, [_vm._v(_vm._s(_vm.trans("em.title"))), _c("sup", [_vm._v("*")])]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.title, expression: "title" }, { name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "title" }, domProps: { "value": _vm.title }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.title = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("title"), expression: "errors.has('title')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("title")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "name" } }, [_vm._v(_vm._s(_vm.trans("em.type"))), _c("sup", [_vm._v("*")])]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.type, expression: "type" }, { name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "type" }, domProps: { "value": _vm.type }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.type = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("type"), expression: "errors.has('type')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("type")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "sub_title" } }, [_vm._v(_vm._s(_vm.trans("em.sub_title")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.sub_title, expression: "sub_title" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "sub_title" }, domProps: { "value": _vm.sub_title }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.sub_title = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("sub_title"), expression: "errors.has('sub_title')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("sub_title")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "website" } }, [_vm._v(_vm._s(_vm.trans("em.website")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.website, expression: "website" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "website" }, domProps: { "value": _vm.website }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.website = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("website"), expression: "errors.has('website')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("website")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "exampleFormControlSelect1" } }, [_vm._v(_vm._s(_vm.trans("em.profile_page")))]), _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.is_page, expression: "is_page" }], staticClass: "form-control", attrs: { "name": "is_page" }, on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.is_page = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  } } }, [_c("option", { attrs: { "value": "0" } }, [_vm._v(_vm._s(_vm.trans("em.no")) + " ")]), _c("option", { attrs: { "value": "1" } }, [_vm._v(_vm._s(_vm.trans("em.yes")))])])]), _vm.is_page > 0 ? _c("div", [_c("div", { staticClass: "mb-3 text-wrap" }, [_c("label", { staticClass: "form-label", attrs: { "for": "description" } }, [_vm._v(_vm._s(_vm.trans("em.description")))]), _c("textarea", { staticClass: "form-control", staticStyle: { "display": "none" }, attrs: { "rows": "3", "name": "description" }, domProps: { "value": _vm.editorData } }), _c("vue-editor", { attrs: { "useCustomImageHandler": "" }, on: { "image-added": (file, Editor, cursorLocation, resetUploader) => _vm.handleImageAdded(file, Editor, cursorLocation, resetUploader, "description") }, model: { value: _vm.editorData, callback: function($$v) {
    _vm.editorData = $$v;
  }, expression: "editorData" } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("description"), expression: "errors.has('description')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("description")))])], 1), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "phone" } }, [_vm._v(_vm._s(_vm.trans("em.phone")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.phone, expression: "phone" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "phone" }, domProps: { "value": _vm.phone }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.phone = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("phone"), expression: "errors.has('phone')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("phone")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "email" } }, [_vm._v(_vm._s(_vm.trans("em.email")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.email, expression: "email" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "email" }, domProps: { "value": _vm.email }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.email = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("email"), expression: "errors.has('email')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("email")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "facebook" } }, [_vm._v(_vm._s(_vm.trans("em.facebook")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.facebook, expression: "facebook" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "facebook" }, domProps: { "value": _vm.facebook }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.facebook = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("facebook"), expression: "errors.has('facebook')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("facebook")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "instagram" } }, [_vm._v(_vm._s(_vm.trans("em.instagram")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.instagram, expression: "instagram" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "instagram" }, domProps: { "value": _vm.instagram }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.instagram = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("instagram"), expression: "errors.has('instagram')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("instagram")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "twitter" } }, [_vm._v(_vm._s(_vm.trans("em.twitter")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.twitter, expression: "twitter" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "twitter" }, domProps: { "value": _vm.twitter }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.twitter = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("twitter"), expression: "errors.has('twitter')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("twitter")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "linkedin" } }, [_vm._v(_vm._s(_vm.trans("em.linkedin")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.linkedin, expression: "linkedin" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "linkedin" }, domProps: { "value": _vm.linkedin }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.linkedin = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("linkedin"), expression: "errors.has('linkedin')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("linkedin")))])])]) : _vm._e()]), _c("div", { staticClass: "modal-footer" }, [_c("button", { staticClass: "btn btn-primary", attrs: { "type": "submit", "disabled": _vm.disable } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")))])])])])])])]) : _vm._e()]);
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
const TagComponent = __component__.exports;
export {
  TagComponent as T
};
//# sourceMappingURL=Tag-CgnK8mlC.js.map
