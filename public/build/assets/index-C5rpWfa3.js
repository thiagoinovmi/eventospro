import { n as normalizeComponent, m as mixinsFilters } from "./mixins-CO2EmGtw.js";
import { i as index, m as mapMutations, a as mapState } from "./vuex.esm-BLukzcBM.js";
import { C as Croppa } from "./vue-croppa-XdnxvxIL.js";
const _sfc_main$4 = {
  props: ["user", "csrf_token"],
  mixins: [mixinsFilters],
  data() {
    return {
      name: null,
      username: null,
      email: null,
      // 🏠 Endereço separado em campos
      address_zip_code: null,
      address_street: null,
      address_number: null,
      address_complement: null,
      address_neighborhood: null,
      address_city: null,
      address_state: null,
      // Telefone e Documento
      phone: null,
      document_type: null,
      document: null,
      // PIX
      pix_type: null,
      pix_key: null,
      // Avatar
      avatar: null,
      is_organiser,
      avatarUrl: null,
      // Estado de busca de CEP
      cepLoading: false,
      cepError: null
    };
  },
  methods: {
    // ...mapMutations(["add"]),
    editProfile() {
      this.name = this.user.name;
      this.username = this.user.username;
      this.email = this.user.email;
      this.address_zip_code = this.user.address_zip_code;
      this.address_street = this.user.address_street;
      this.address_number = this.user.address_number;
      this.address_complement = this.user.address_complement;
      this.address_neighborhood = this.user.address_neighborhood;
      this.address_city = this.user.address_city;
      this.address_state = this.user.address_state;
      this.phone = this.user.phone;
      this.document_type = this.user.document_type;
      this.document = this.user.document;
      this.pix_type = this.user.pix_type;
      this.pix_key = this.user.pix_key;
    },
    // 🔍 Buscar CEP usando ViaCEP API
    async searchCEP() {
      if (!this.address_zip_code) {
        this.cepError = "Digite um CEP";
        return;
      }
      const cepClean = this.address_zip_code.replace(/\D/g, "");
      if (cepClean.length !== 8) {
        this.cepError = "CEP deve ter 8 dígitos";
        return;
      }
      this.cepLoading = true;
      this.cepError = null;
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepClean}/json/`);
        const data = await response.json();
        if (data.erro) {
          this.cepError = "CEP não encontrado";
          this.cepLoading = false;
          return;
        }
        this.address_street = data.logradouro;
        this.address_neighborhood = data.bairro;
        this.address_city = data.localidade;
        this.address_state = data.uf;
        this.cepError = null;
        console.log("✅ CEP preenchido com sucesso:", data);
      } catch (error) {
        console.error("❌ Erro ao buscar CEP:", error);
        this.cepError = "Erro ao buscar CEP. Tente novamente.";
      } finally {
        this.cepLoading = false;
      }
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
    async formSubmit(event) {
      this.$refs.form.submit();
    },
    submitUrl() {
      return route("eventmie.updateAuthUser");
    },
    imagePreview(e) {
      const file = e.target.files[0];
      let url = URL.createObjectURL(file);
      $("#preview-image-before-upload").attr("src", url);
    },
    storageDisk() {
      this.avatarUrl = this.getImageUrl(this.user.avatar);
    }
  },
  mounted() {
    this.editProfile();
    this.storageDisk();
  }
};
var _sfc_render$4 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "tab-pane" }, [_c("div", { staticClass: "panel-group" }, [_c("div", { staticClass: "panel panel-default lgx-panel" }, [_c("div", { staticClass: "panel-heading px-5" }, [_c("form", { ref: "form", staticClass: "form-horizontal", attrs: { "id": "form", "action": _vm.submitUrl(), "method": "POST", "enctype": "multipart/form-data" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_c("input", { attrs: { "type": "hidden", "name": "_token", "id": "csrf-token" }, domProps: { "value": _vm.csrf_token } }), _c("div", { staticClass: "col-md-12 mb-5 text-center" }, [_c("img", { staticStyle: { "max-height": "128px", "border-radius": "50%" }, attrs: { "id": "preview-image-before-upload", "src": _vm.avatarUrl, "alt": "profile-pic" } })]), _c("div", { staticClass: "form-group row mt-3 mt-5" }, [_c("label", { staticClass: "form-label col-md-3 form-label" }, [_vm._v(_vm._s(this.is_organiser == true ? _vm.trans("em.organisation_logo") : _vm.trans("em.avatar")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { staticClass: "form-control", attrs: { "id": "avatar", "name": "avatar", "type": "file" }, on: { "change": _vm.imagePreview } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("avatar"), expression: "errors.has('avatar')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("avatar")))])])]), _c("div", { staticClass: "form-group row mt-3 mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.name")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.name, expression: "name" }, { name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control", attrs: { "name": "name", "type": "text" }, domProps: { "value": _vm.name }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.name = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("name"), expression: "errors.has('name')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("name")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.email")) + "*")]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.email, expression: "email" }, { name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control", attrs: { "name": "email", "type": "email" }, domProps: { "value": _vm.email }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.email = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("email"), expression: "errors.has('email')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("email")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v("CEP")]), _c("div", { staticClass: "col-md-6" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.address_zip_code, expression: "address_zip_code" }], staticClass: "form-control", attrs: { "name": "address_zip_code", "type": "text", "placeholder": "00000-000", "maxlength": "9" }, domProps: { "value": _vm.address_zip_code }, on: { "blur": _vm.searchCEP, "input": function($event) {
    if ($event.target.composing) return;
    _vm.address_zip_code = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("address_zip_code"), expression: "errors.has('address_zip_code')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("address_zip_code")))])]), _c("div", { staticClass: "col-md-3" }, [_c("button", { staticClass: "btn btn-sm btn-info", attrs: { "type": "button", "disabled": !_vm.address_zip_code }, on: { "click": _vm.searchCEP } }, [_c("i", { staticClass: "fas fa-search" }), _vm._v(" Buscar ")])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v("Logradouro")]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.address_street, expression: "address_street" }], staticClass: "form-control", attrs: { "name": "address_street", "type": "text", "placeholder": "Rua, Avenida, etc" }, domProps: { "value": _vm.address_street }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.address_street = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("address_street"), expression: "errors.has('address_street')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("address_street")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v("Número")]), _c("div", { staticClass: "col-md-3" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.address_number, expression: "address_number" }], staticClass: "form-control", attrs: { "name": "address_number", "type": "text", "placeholder": "123" }, domProps: { "value": _vm.address_number }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.address_number = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("address_number"), expression: "errors.has('address_number')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("address_number")))])]), _c("label", { staticClass: "col-md-3 form-label" }, [_vm._v("Complemento")]), _c("div", { staticClass: "col-md-3" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.address_complement, expression: "address_complement" }], staticClass: "form-control", attrs: { "name": "address_complement", "type": "text", "placeholder": "Apto, Sala, etc" }, domProps: { "value": _vm.address_complement }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.address_complement = $event.target.value;
  } } })])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v("Bairro")]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.address_neighborhood, expression: "address_neighborhood" }], staticClass: "form-control", attrs: { "name": "address_neighborhood", "type": "text", "placeholder": "Bairro" }, domProps: { "value": _vm.address_neighborhood }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.address_neighborhood = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("address_neighborhood"), expression: "errors.has('address_neighborhood')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("address_neighborhood")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v("Cidade")]), _c("div", { staticClass: "col-md-6" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.address_city, expression: "address_city" }], staticClass: "form-control", attrs: { "name": "address_city", "type": "text", "placeholder": "Cidade" }, domProps: { "value": _vm.address_city }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.address_city = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("address_city"), expression: "errors.has('address_city')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("address_city")))])]), _c("label", { staticClass: "col-md-2 form-label" }, [_vm._v("Estado")]), _c("div", { staticClass: "col-md-1" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.address_state, expression: "address_state" }], staticClass: "form-control", attrs: { "name": "address_state", "type": "text", "placeholder": "SP", "maxlength": "2" }, domProps: { "value": _vm.address_state }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.address_state = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("address_state"), expression: "errors.has('address_state')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("address_state")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.phone")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.phone, expression: "phone" }], staticClass: "form-control", attrs: { "name": "phone", "type": "text" }, domProps: { "value": _vm.phone }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.phone = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("phone"), expression: "errors.has('phone')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("phone")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v("Tipo de Documento")]), _c("div", { staticClass: "col-md-9" }, [_c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.document_type, expression: "document_type" }, { name: "validate", rawName: "v-validate", value: "", expression: "''" }], staticClass: "form-control", attrs: { "name": "document_type", "data-vv-as": "Tipo de Documento" }, on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.document_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  } } }, [_c("option", { attrs: { "value": "" } }, [_vm._v("Selecione")]), _c("option", { attrs: { "value": "cpf" } }, [_vm._v("CPF")]), _c("option", { attrs: { "value": "cnpj" } }, [_vm._v("CNPJ")])]), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("document_type"), expression: "errors.has('document_type')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("document_type")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v("CPF/CNPJ")]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.document, expression: "document" }, { name: "validate", rawName: "v-validate", value: "", expression: "''" }], staticClass: "form-control", attrs: { "name": "document", "type": "text", "placeholder": "Digite seu CPF ou CNPJ", "data-vv-as": "CPF/CNPJ" }, domProps: { "value": _vm.document }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.document = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("document"), expression: "errors.has('document')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("document")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v("Tipo de Chave PIX")]), _c("div", { staticClass: "col-md-9" }, [_c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.pix_type, expression: "pix_type" }, { name: "validate", rawName: "v-validate", value: "", expression: "''" }], staticClass: "form-control", attrs: { "name": "pix_type", "data-vv-as": "Tipo de Chave PIX" }, on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.pix_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  } } }, [_c("option", { attrs: { "value": "", "disabled": "" } }, [_vm._v("Selecione o tipo de chave")]), _c("option", { attrs: { "value": "email" } }, [_vm._v("Email")]), _c("option", { attrs: { "value": "cpf" } }, [_vm._v("CPF")]), _c("option", { attrs: { "value": "cnpj" } }, [_vm._v("CNPJ")]), _c("option", { attrs: { "value": "phone" } }, [_vm._v("Telefone")]), _c("option", { attrs: { "value": "random" } }, [_vm._v("Aleatória")])]), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("pix_type"), expression: "errors.has('pix_type')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("pix_type")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v("Chave PIX")]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.pix_key, expression: "pix_key" }, { name: "validate", rawName: "v-validate", value: "", expression: "''" }], staticClass: "form-control", attrs: { "name": "pix_key", "type": "text", "placeholder": "Digite sua chave PIX", "data-vv-as": "Chave PIX" }, domProps: { "value": _vm.pix_key }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.pix_key = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("pix_key"), expression: "errors.has('pix_key')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("pix_key")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("div", { staticClass: "col-md-9 offset-md-3" }, [_c("button", { staticClass: "btn btn-primary", attrs: { "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")) + " ")])])])])])])])])]);
};
var _sfc_staticRenderFns$4 = [];
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  null
);
const PersonalDetails = __component__$4.exports;
const _sfc_main$3 = {
  props: ["user", "csrf_token"],
  mixins: [mixinsFilters],
  data() {
    return {
      current: null,
      password: null,
      password_confirmation: null
    };
  },
  methods: {
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
    formSubmit() {
      this.$refs.form.submit();
    },
    submitUrl() {
      return route("eventmie.updatePasswordUser");
    }
  },
  mounted() {
  }
};
var _sfc_render$3 = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "tab-pane", attrs: { "id": "security" } }, [_c("div", { staticClass: "panel-group" }, [_c("div", { staticClass: "panel panel-default lgx-panel" }, [_c("div", { staticClass: "panel-heading px-5" }, [_c("form", { ref: "form", staticClass: "form-horizontal", attrs: { "id": "updatePasswordUser", "action": _vm.submitUrl(), "method": "POST" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_c("input", { attrs: { "type": "hidden", "name": "_token", "id": "csrf-token" }, domProps: { "value": _vm.csrf_token } }), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.current_password")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }, { name: "model", rawName: "v-model", value: _vm.current, expression: "current" }], staticClass: "form-control", attrs: { "name": "current", "type": "password" }, domProps: { "value": _vm.current }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.current = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("current"), expression: "errors.has('current')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("current")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.new")) + " " + _vm._s(_vm.trans("em.password")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.password, expression: "password" }], staticClass: "form-control", attrs: { "name": "password", "type": "password" }, domProps: { "value": _vm.password }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.password = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("password"), expression: "errors.has('password')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("password")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.confirm_password")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.password_confirmation, expression: "password_confirmation" }], staticClass: "form-control", attrs: { "name": "password_confirmation", "type": "password" }, domProps: { "value": _vm.password_confirmation }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.password_confirmation = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("password_confirmation"), expression: "\n                                        errors.has('password_confirmation')\n                                    " }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("password_confirmation")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("div", { staticClass: "col-md-9 offset-md-3" }, [_c("button", { staticClass: "btn btn-primary", attrs: { "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")) + " ")])])])])])])])])]);
};
var _sfc_staticRenderFns$3 = [];
var __component__$3 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  null
);
const Security = __component__$3.exports;
const _sfc_main$2 = {
  props: ["user", "csrf_token"],
  mixins: [mixinsFilters],
  data() {
    return {
      bank_name: null,
      bank_code: null,
      bank_branch_name: null,
      bank_branch_code: null,
      bank_account_number: null,
      bank_account_name: null,
      bank_account_phone: null
    };
  },
  methods: {
    editProfile() {
      this.bank_name = this.user.bank_name, this.bank_code = this.user.bank_code, this.bank_branch_name = this.user.bank_branch_name, this.bank_branch_code = this.user.bank_branch_code, this.bank_account_number = this.user.bank_account_number, this.bank_account_name = this.user.bank_account_name, this.bank_account_phone = this.user.bank_account_phone;
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
    async formSubmit(event) {
      this.$refs.form.submit();
    },
    submitUrl() {
      return route("eventmie.updateBankUser");
    }
  },
  mounted() {
    this.editProfile();
  }
};
var _sfc_render$2 = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "tab-pane", attrs: { "id": "Bdetail" } }, [_c("div", { staticClass: "panel-group" }, [_c("div", { staticClass: "panel panel-default lgx-panel" }, [_c("div", { staticClass: "panel-heading px-5" }, [_c("form", { ref: "form", staticClass: "form-horizontal", attrs: { "id": "form", "action": _vm.submitUrl(), "method": "POST" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_c("input", { attrs: { "type": "hidden", "name": "_token", "id": "csrf-token" }, domProps: { "value": _vm.csrf_token } }), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.bank_name")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.bank_name, expression: "bank_name" }], staticClass: "form-control", attrs: { "name": "bank_name", "type": "text" }, domProps: { "value": _vm.bank_name }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.bank_name = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("bank_name"), expression: "errors.has('bank_name')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("bank_name")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.bank_code")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.bank_code, expression: "bank_code" }], staticClass: "form-control", attrs: { "name": "bank_code", "type": "text" }, domProps: { "value": _vm.bank_code }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.bank_code = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("bank_code"), expression: "errors.has('bank_code')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("bank_code")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.bank_branch_name")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.bank_branch_name, expression: "bank_branch_name" }], staticClass: "form-control", attrs: { "name": "bank_branch_name", "type": "text" }, domProps: { "value": _vm.bank_branch_name }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.bank_branch_name = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("bank_branch_name"), expression: "errors.has('bank_branch_name')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("bank_branch_name")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.bank_branch_code")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.bank_branch_code, expression: "bank_branch_code" }], staticClass: "form-control", attrs: { "name": "bank_branch_code", "type": "text" }, domProps: { "value": _vm.bank_branch_code }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.bank_branch_code = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("bank_branch_code"), expression: "errors.has('bank_branch_code')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("bank_branch_code")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.bank_account_number")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.bank_account_number, expression: "bank_account_number" }], staticClass: "form-control", attrs: { "name": "bank_account_number", "type": "text" }, domProps: { "value": _vm.bank_account_number }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.bank_account_number = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("bank_account_number"), expression: "\n                                    errors.has('bank_account_number')\n                                " }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("bank_account_number")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.bank_account_name")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.bank_account_name, expression: "bank_account_name" }], staticClass: "form-control", attrs: { "name": "bank_account_name", "type": "text" }, domProps: { "value": _vm.bank_account_name }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.bank_account_name = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("bank_account_name"), expression: "errors.has('bank_account_name')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("bank_account_name")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.bank_account_phone")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.bank_account_phone, expression: "bank_account_phone" }], staticClass: "form-control", attrs: { "name": "bank_account_phone", "type": "text" }, domProps: { "value": _vm.bank_account_phone }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.bank_account_phone = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("bank_account_phone"), expression: "\n                                    errors.has('bank_account_phone')\n                                " }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("bank_account_phone")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("div", { staticClass: "col-md-9 offset-md-3" }, [_c("button", { staticClass: "btn btn-primary", attrs: { "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")) + " ")])])])])])])])])]);
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  null
);
const BankDetails = __component__$2.exports;
const _sfc_main$1 = {
  props: ["user", "csrf_token"],
  mixins: [mixinsFilters],
  data() {
    return {
      organisation: null,
      org_description: null,
      org_facebook: null,
      org_instagram: null,
      org_youtube: null,
      org_twitter: null,
      manually_approve_organizer,
      is_organiser
    };
  },
  computed: {
    // get global variables
  },
  methods: {
    editProfile() {
      this.organisation = this.user.organisation, this.org_description = this.user.org_description, this.org_facebook = this.user.org_facebook, this.org_instagram = this.user.org_instagram, this.org_youtube = this.user.org_youtube, this.org_twitter = this.user.org_twitter;
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
    async formSubmit(event) {
      this.$refs.form.submit();
    },
    submitUrl() {
      return route("eventmie.updateOrganiserUser");
    }
  },
  mounted() {
    this.editProfile();
  }
};
var _sfc_render$1 = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "tab-pane", attrs: { "id": "organiser" } }, [_c("div", { staticClass: "panel-group" }, [_c("div", { staticClass: "panel panel-default lgx-panel" }, [_c("div", { staticClass: "panel-heading px-5" }, [_vm.is_organiser == false && _vm.user.organisation != null && _vm.user.organisation != void 0 && _vm.manually_approve_organizer ? _c("div", { staticClass: "alert alert-info", attrs: { "role": "alert" } }, [_c("strong", [_vm._v(" " + _vm._s(_vm.trans("em.become_organiser_notification")) + " ")])]) : _vm._e(), _c("div", { staticClass: "card border-0 shadow-sm bg-light my-3" }, [_c("div", { staticClass: "card-body p-4 fs-5" }, [_c("div", { staticClass: "d-flex justify-content-between align-items-center mb-3" }, [_c("h4", { staticClass: "card-title mb-0 text-primary" }, [_vm._v(_vm._s(_vm.trans("em.how_it_works")))])]), _c("div", { staticClass: "d-flex" }, [_vm._m(0), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_vm._v(_vm._s(_vm.trans("em.organiser_note_1")))])])]), _c("div", { staticClass: "d-flex" }, [_vm._m(1), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_vm._v(_vm._s(_vm.trans("em.organiser_note_2")))])])]), _c("div", { staticClass: "d-flex" }, [_vm._m(2), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_vm._v(_vm._s(_vm.trans("em.organiser_note_3")))])])]), _c("div", { staticClass: "d-flex" }, [_vm._m(3), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_vm._v(_vm._s(_vm.trans("em.organiser_note_4")))])])])])]), _c("form", { ref: "form", staticClass: "form-horizontal", attrs: { "action": _vm.submitUrl(), "method": "POST", "enctype": "multipart/form-data" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_c("input", { attrs: { "type": "hidden", "name": "_token", "id": "csrf-token" }, domProps: { "value": _vm.csrf_token } }), _c("div", { staticClass: "form-group row" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.organization")) + " " + _vm._s(_vm.trans("em.name")) + "*")]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }, { name: "model", rawName: "v-model", value: _vm.organisation, expression: "organisation" }], staticClass: "form-control", attrs: { "name": "organisation", "type": "text" }, domProps: { "value": _vm.organisation }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.organisation = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("organisation"), expression: "errors.has('organisation')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("organisation")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("div", { staticClass: "col-md-9 offset-md-3" }, [_c("button", { staticClass: "btn btn-primary", attrs: { "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")) + " ")])])])])])])])])]);
};
var _sfc_staticRenderFns$1 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("span", [_c("i", { staticClass: "fas fa-arrow-right text-primary" })])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("span", [_c("i", { staticClass: "fas fa-arrow-right text-primary" })])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("span", [_c("i", { staticClass: "fas fa-arrow-right text-primary" })])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("span", [_c("i", { staticClass: "fas fa-arrow-right text-primary" })])]);
}];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  null
);
const OrganiserInfo = __component__$1.exports;
const _sfc_main = {
  props: ["user", "csrf_token"],
  mixins: [mixinsFilters],
  data() {
    return {
      organisation: user.organisation
    };
  },
  methods: {
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
    async formSubmit(event) {
      this.$refs.form.submit();
    },
    submitUrl() {
      return route("eventmie.updateAuthUserRole");
    }
  },
  mounted() {
  }
};
var _sfc_render = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "tab-pane", attrs: { "id": "BecomeOrganiser" } }, [_c("div", { staticClass: "panel-group" }, [_c("div", { staticClass: "panel panel-default" }, [_vm.user.organisation ? _c("div", [_c("div", { staticClass: "alert alert-info", attrs: { "role": "alert" } }, [_c("strong", [_vm._v(_vm._s(_vm.trans("em.become_organiser_notification")))])])]) : _vm._e(), _c("h3", { staticClass: "mb-0" }, [_vm._v(_vm._s(_vm.trans("em.become_organiser")))]), _c("p", { staticClass: "mb-0" }, [_vm._v(_vm._s(_vm.trans("em.become_organizer_to_host")))]), _c("div", { staticClass: "card border-0 shadow-sm bg-light my-3" }, [_c("div", { staticClass: "card-body p-4 fs-5" }, [_c("div", { staticClass: "d-flex justify-content-between align-items-center mb-3" }, [_c("h4", { staticClass: "card-title mb-0 text-primary" }, [_vm._v(_vm._s(_vm.trans("em.how_it_works")))])]), _c("div", { staticClass: "d-flex" }, [_vm._m(0), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_vm._v(_vm._s(_vm.trans("em.organiser_note_1")))])])]), _c("div", { staticClass: "d-flex" }, [_vm._m(1), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_vm._v(_vm._s(_vm.trans("em.organiser_note_2")))])])]), _c("div", { staticClass: "d-flex" }, [_vm._m(2), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_vm._v(_vm._s(_vm.trans("em.organiser_note_3")))])])]), _c("div", { staticClass: "d-flex" }, [_vm._m(3), _c("div", { staticClass: "ms-3 lh-1" }, [_c("h5", { staticClass: "mb-1" }, [_vm._v(_vm._s(_vm.trans("em.organiser_note_4")))])])])])]), _c("form", { ref: "form", staticClass: "form-horizontal", attrs: { "action": _vm.submitUrl(), "method": "POST", "enctype": "multipart/form-data" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_c("input", { attrs: { "type": "hidden", "name": "_token", "id": "csrf-token" }, domProps: { "value": _vm.csrf_token } }), _c("input", { attrs: { "type": "hidden", "name": "role_id", "value": "3" } }), _c("div", { staticClass: "form-group row mt-3" }, [_c("label", { staticClass: "col-md-3 form-label" }, [_vm._v(_vm._s(_vm.trans("em.organization")))]), _c("div", { staticClass: "col-md-9" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.organisation, expression: "organisation" }], staticClass: "form-control", attrs: { "name": "organisation", "type": "text", "placeholder": _vm.trans("em.brand_identity"), "required": "" }, domProps: { "value": _vm.organisation }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.organisation = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("organisation"), expression: "errors.has('organisation')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("organisation")))])])]), _c("div", { staticClass: "form-group row mt-3" }, [_c("div", { staticClass: "col-md-9 offset-md-3" }, [_c("button", { staticClass: "btn btn-primary", attrs: { "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.submit")) + " ")])])])])])])])]);
};
var _sfc_staticRenderFns = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("span", [_c("i", { staticClass: "fas fa-arrow-right text-primary" })])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("span", [_c("i", { staticClass: "fas fa-arrow-right text-primary" })])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("span", [_c("i", { staticClass: "fas fa-arrow-right text-primary" })])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("span", [_c("i", { staticClass: "fas fa-arrow-right text-primary" })])]);
}];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  null
);
const BecomeOrganiser = __component__.exports;
window.Vuex = index;
Vue.use(index);
Vue.use(Croppa);
const store = new index.Store({
  state: {
    personal_details: [],
    update_bank_details: [],
    organiser_info: []
  },
  mutations: {
    add(state, { personal_details, update_bank_details, organiser_info }) {
      if (typeof personal_details !== "undefined") {
        state.personal_details = personal_details;
      }
      if (typeof update_bank_details !== "undefined") {
        state.update_bank_details = update_bank_details;
      }
      if (typeof organiser_info !== "undefined") {
        state.organiser_info = organiser_info;
      }
    }
  }
});
const routes = new VueRouter({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "personal-details",
      props: {
        user,
        csrf_token
      },
      component: PersonalDetails
    },
    {
      path: "/userSecurity",
      name: "security",
      props: {
        user,
        csrf_token
      },
      component: Security
    },
    {
      path: "/userBankDetails",
      name: "bank-details",
      props: {
        user,
        csrf_token
      },
      component: BankDetails
    },
    {
      path: "/userOrganiserInfo",
      name: "organiser-info",
      props: {
        user,
        csrf_token
      },
      component: OrganiserInfo
    },
    {
      path: "/becomeOrganiser",
      props: {
        user,
        multi_vendor,
        csrf_token
      },
      name: "become-organiser",
      component: BecomeOrganiser
    }
  ]
});
window.app = new Vue({
  el: "#eventmie_app",
  router: routes,
  store,
  data() {
    return {
      store
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    ...mapState(["personal_details", "update_bank_details", "organiser_info"])
  },
  methods: {
    ...mapMutations(["add"]),
    checkEmptyProfile() {
      if (user.name == "" || // user.username == null ||
      user.email == "") {
        return false;
      }
      return true;
    },
    checkEmptyBank() {
      return true;
    },
    checkEmptyOrganisation() {
      if (user.organisation == null) {
        return false;
      }
      return true;
    }
  },
  mounted() {
    this.add({
      personal_details: this.checkEmptyProfile(),
      update_bank_details: this.checkEmptyBank(),
      organiser_info: this.checkEmptyOrganisation()
    });
  }
});
//# sourceMappingURL=index-C5rpWfa3.js.map
