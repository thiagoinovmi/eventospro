import { V as Vue$1, n as normalizeComponent, m as mixinsFilters, a as axios$1, _ as _$1 } from "./mixins-DsimpN2H.js";
import { m as mapMutations, a as mapState, i as index } from "./vuex.esm-BLukzcBM.js";
import { v as vSelect } from "./vue-select-rC5MlIUN.js";
import { M as Multiselect } from "./vue-multiselect.min-DoJvXMvW.js";
import { D as DatePicker } from "./index.esm-BNIJhBgk.js";
import { C as Croppa } from "./vue-croppa-HlVxmI2c.js";
import { V as VenueComponent } from "./Venue-B_5iplA0.js";
import { T as TagComponent } from "./Tag-CgnK8mlC.js";
const events = new Vue$1({
  name: "vue-confirm-dialog"
});
Vue$1.directive("focus", {
  inserted: function(el) {
    el.focus();
  }
});
const Component = {
  name: "VueConfirmDialog",
  data() {
    return {
      isShow: false,
      password: null,
      dialog: {
        auth: false,
        title: "",
        message: "",
        button: {}
      },
      params: {}
    };
  },
  methods: {
    resetState() {
      this.password = null;
      this.dialog = {
        auth: false,
        title: "",
        message: "",
        button: {},
        callback: () => {
        }
      };
    },
    handleClickButton({ target }, confirm2) {
      if (target.id == "vueConfirm") return;
      if (confirm2 && this.dialog.auth && !this.password) return;
      this.isShow = false;
      if (this.params.callback) {
        this.params.callback(confirm2, this.password);
      }
    },
    handleClickOverlay({ target }) {
      if (target.id == "vueConfirm") {
        this.isShow = false;
        if (this.params.callback) {
          this.params.callback(false, this.password);
        }
      }
    },
    handleKeyUp({ keyCode }) {
      if (keyCode == 27) {
        this.handleClickOverlay({ target: { id: "vueConfirm" } });
      }
      if (keyCode == 13) {
        this.handleClickButton({ target: { id: "" } }, true);
      }
    },
    open(params) {
      this.resetState();
      this.params = params;
      this.isShow = true;
      Object.entries(params).forEach((param) => {
        if (typeof param[1] == typeof this.dialog[param[0]]) {
          this.dialog[param[0]] = param[1];
        }
      });
    }
  },
  mounted() {
    if (!document) return;
    events.$on("open", this.open);
    events.$on("close", () => {
      this.handleClickOverlay({ target: { id: "vueConfirm" } });
    });
  },
  beforeDestroy() {
  }
};
const _sfc_main$c = Component;
var _sfc_render$c = function render() {
  var _vm = this, _c = _vm._self._c;
  _vm._self._setupProxy;
  return _c("transition", { attrs: { "name": "fade" } }, [_vm.isShow ? _c("div", { staticClass: "vc-overlay", attrs: { "id": "vueConfirm" }, on: { "click": _vm.handleClickOverlay } }, [_c("transition", { attrs: { "name": "zoom" } }, [_vm.isShow ? _c("div", { ref: "vueConfirmDialog", staticClass: "vc-container" }, [_c("span", { staticClass: "vc-text-grid" }, [_vm.dialog.title ? _c("h4", { staticClass: "vc-title", domProps: { "innerHTML": _vm._s(_vm.dialog.title) } }) : _vm._e(), _vm.dialog.message ? _c("p", { staticClass: "vc-text", domProps: { "innerHTML": _vm._s(_vm.dialog.message) } }) : _vm._e(), _vm.dialog.auth ? _c("span", [_c("input", { directives: [{ name: "focus", rawName: "v-focus" }, { name: "model", rawName: "v-model", value: _vm.password, expression: "password" }], staticClass: "vc-input", attrs: { "type": "password", "name": "vc-password", "placeholder": "Password", "autocomplete": "off" }, domProps: { "value": _vm.password }, on: { "keyup": function($event) {
    if (!$event.type.indexOf("key") && $event.keyCode !== 13) return null;
    return ((e) => _vm.handleClickButton(e, true)).apply(null, arguments);
  }, "input": function($event) {
    if ($event.target.composing) return;
    _vm.password = $event.target.value;
  } } })]) : _vm._e()]), _c("div", { staticClass: "vc-btn-grid", class: { isMono: !_vm.dialog.button.no || !_vm.dialog.button.yes } }, [_vm.dialog.button.no ? _c("button", { staticClass: "vc-btn left", attrs: { "type": "button" }, on: { "click": function($event) {
    $event.stopPropagation();
    return ((e) => _vm.handleClickButton(e, false)).apply(null, arguments);
  } } }, [_vm._v(" " + _vm._s(_vm.dialog.button.no) + " ")]) : _vm._e(), _vm.dialog.button.yes ? _c("button", { staticClass: "vc-btn", attrs: { "disabled": _vm.dialog.auth ? !_vm.password : false, "type": "button" }, on: { "click": function($event) {
    $event.stopPropagation();
    return ((e) => _vm.handleClickButton(e, true)).apply(null, arguments);
  } } }, [_vm._v(" " + _vm._s(_vm.dialog.button.yes) + " ")]) : _vm._e()])]) : _vm._e()])], 1) : _vm._e()]);
};
var _sfc_staticRenderFns$c = [];
var __component__$c = /* @__PURE__ */ normalizeComponent(
  _sfc_main$c,
  _sfc_render$c,
  _sfc_staticRenderFns$c,
  false,
  null,
  null
);
const VueConfirmDialog$1 = __component__$c.exports;
const VueConfirmDialog = {
  install(Vue2, args = {}) {
    if (this.installed) return;
    this.installed = true;
    this.params = args;
    Vue2.component(args.componentName || "vue-confirm-dialog", VueConfirmDialog$1);
    const confirm2 = (params) => {
      if (typeof params != "object" || Array.isArray(params)) {
        let caughtType = typeof params;
        if (Array.isArray(params)) caughtType = "array";
        throw new Error(
          `Options type must be an object. Caught: ${caughtType}. Expected: object`
        );
      }
      if (typeof params === "object") {
        if (params.hasOwnProperty("callback") && typeof params.callback != "function") {
          let callbackType = typeof params.callback;
          throw new Error(
            `Callback type must be an function. Caught: ${callbackType}. Expected: function`
          );
        }
        events.$emit("open", params);
      }
    };
    confirm2.close = () => {
      events.$emit("close");
    };
    Vue2.prototype.$confirm = confirm2;
    Vue2["$confirm"] = confirm2;
  }
};
const _sfc_main$b = {
  props: [
    "event_id",
    "organiser_id",
    "is_publishable",
    "event_ck"
  ],
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  },
  methods: {
    // update global variables
    ...mapMutations(["add", "update"]),
    updateEventId() {
      this.add({
        event_id: this.event_id,
        organiser_id: this.organiser_id
      });
    }
  },
  mounted() {
    this.updateEventId();
  }
};
var _sfc_render$b = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("vue-confirm-dialog"), _c("ul", { staticClass: "nav nav-lb-tab text-center w-space" }, [_c("li", { staticClass: "nav-item" }, [_c("router-link", { staticClass: "nav-link", attrs: { "to": { name: "detail" } } }, [_vm._v(" " + _vm._s(_vm.trans("em.details")) + " "), !_vm.is_publishable.detail ? _c("i", { staticClass: "fas fa-exclamation-circle text-danger" }) : _c("i", { staticClass: "fas fa-check-circle text-success" })])], 1), _c("li", { staticClass: "nav-item" }, [_c("router-link", { staticClass: "nav-link", attrs: { "to": { name: "timing" } } }, [_vm._v(" " + _vm._s(_vm.trans("em.timings")) + " "), !_vm.is_publishable.timing ? _c("i", { staticClass: "fas fa-exclamation-circle text-danger" }) : _c("i", { staticClass: "fas fa-check-circle text-success" })])], 1), _c("li", { staticClass: "nav-item" }, [_c("router-link", { staticClass: "nav-link", attrs: { "to": { name: "tickets" } } }, [_vm._v(" " + _vm._s(_vm.trans("em.tickets")) + " "), !_vm.is_publishable.tickets ? _c("i", { staticClass: "fas fa-exclamation-circle text-danger" }) : _c("i", { staticClass: "fas fa-check-circle text-success" })])], 1), _c("li", { staticClass: "nav-item" }, [_c("router-link", { staticClass: "nav-link", attrs: { "to": { name: "location" } } }, [_vm._v(" " + _vm._s(_vm.trans("em.location")) + " "), !_vm.is_publishable.location ? _c("i", { staticClass: "fas fa-exclamation-circle text-danger" }) : _c("i", { staticClass: "fas fa-check-circle text-success" })])], 1), _c("li", { staticClass: "nav-item" }, [_c("router-link", { staticClass: "nav-link", attrs: { "to": { name: "media" } } }, [_vm._v(" " + _vm._s(_vm.trans("em.media")) + " "), !_vm.is_publishable.media ? _c("i", { staticClass: "fas fa-exclamation-circle text-danger" }) : _c("i", { staticClass: "fas fa-check-circle text-success" })])], 1), _c("li", { staticClass: "nav-item" }, [_c("router-link", { staticClass: "nav-link", attrs: { "to": { name: "seo" } } }, [_vm._v(" " + _vm._s(_vm.trans("em.seo")) + " "), _c("i", { staticClass: "fas fa-check-circle text-success" })])], 1), _c("li", { staticClass: "nav-item" }, [_c("router-link", { staticClass: "nav-link", attrs: { "to": { name: "kits" } } }, [_vm._v(" " + _vm._s(_vm.trans("em.kits")) + " "), !_vm.is_publishable.kits ? _c("i", { staticClass: "fas fa-exclamation-circle text-danger" }) : _c("i", { staticClass: "fas fa-check-circle text-success" })])], 1), _c("li", { staticClass: "nav-item" }, [_c("router-link", { staticClass: "nav-link", attrs: { "to": { name: "publish" } } }, [_vm._v(" " + _vm._s(_vm.trans("em.publish")) + " "), !_vm.event_ck.publish ? _c("i", { staticClass: "fas fa-exclamation-circle text-danger" }) : _c("i", { staticClass: "fas fa-check-circle text-success" })])], 1)])], 1);
};
var _sfc_staticRenderFns$b = [];
var __component__$b = /* @__PURE__ */ normalizeComponent(
  _sfc_main$b,
  _sfc_render$b,
  _sfc_staticRenderFns$b,
  false,
  null,
  null
);
const TabsComponent = __component__$b.exports;
const _sfc_main$a = {
  props: ["event_id"],
  data() {
    return {
      showAIModal: false,
      modalMode: "generate",
      aiPrompt: "",
      aiResponses: [],
      generating: false,
      aiFields: [
        { value: "name", label: "Title", formField: "title" },
        { value: "slug", label: "Slug URL", formField: "slug" },
        { value: "short_description", label: "Short Description", formField: "excerpt" },
        { value: "long_description", label: "Full Description", formField: "description" },
        { value: "faq", label: "Frequently Asked Questions", formField: "faq" },
        { value: "meta_title", label: "SEO Title", formField: "meta_title" },
        { value: "meta_description", label: "SEO Description", formField: "meta_description" },
        { value: "meta_tags", label: "SEO Keywords", formField: "meta_keywords" }
      ],
      aiSelectedFields: [],
      isSpeechSupported: false,
      isListening: false,
      recognition: null,
      speechStartTime: null,
      timerInterval: null,
      timerSeconds: 0,
      transcriptTemp: "",
      finalTranscript: ""
    };
  },
  mixins: [
    mixinsFilters
  ],
  computed: {
    timerDisplay() {
      return this.timerSeconds;
    }
  },
  methods: {
    openAIModal(mode) {
      this.modalMode = mode;
      this.showAIModal = true;
      this.aiPrompt = "";
      this.aiSelectedFields = this.aiFields.map((f) => f.value);
      this.loadAIResponses();
    },
    closeAIModal() {
      this.showAIModal = false;
      if (this.isListening) {
        this.recognition.stop();
        this.cleanupMic();
      }
    },
    toggleSpeechRecognition() {
      if (!this.isSpeechSupported) return;
      if (this.isListening) {
        this.recognition.stop();
        this.cleanupMic();
      } else {
        this.finalTranscript = "";
        this.aiPrompt = "";
        this.transcriptTemp = "";
        this.recognition.start();
        this.isListening = true;
        this.speechStartTime = /* @__PURE__ */ new Date();
        this.timerSeconds = 0;
        this.timerInterval = setInterval(() => {
          this.timerSeconds = Math.floor((/* @__PURE__ */ new Date() - this.speechStartTime) / 1e3);
        }, 1e3);
      }
    },
    cleanupMic() {
      this.isListening = false;
      clearInterval(this.timerInterval);
      this.timerInterval = null;
      this.speechStartTime = null;
      this.timerSeconds = 0;
    },
    clearPrompt() {
      this.aiPrompt = "";
    },
    generateAIContent() {
      if (!this.aiPrompt || this.aiSelectedFields.length === 0) {
        this.showNotification("error", trans("em.provide_prompt_and_fields"));
        return;
      }
      this.generating = true;
      let post_url = route("eventmie.openai.handle-prompt");
      let post_data = {
        prompt: this.aiPrompt,
        fields: this.aiSelectedFields
      };
      axios$1.post(post_url, post_data).then((response) => {
        var _a, _b, _c;
        const events2 = ((_a = response.data.response) == null ? void 0 : _a.events) || [];
        this.aiResponses = {
          prompt: this.aiPrompt,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleString(),
          events: events2
        };
        localStorage.setItem("aiEventResponses", JSON.stringify(this.aiResponses));
        if (events2.length > 0) {
          const firstEvent = events2[0];
          this.aiFields.forEach((field) => {
            if (firstEvent[field.value]) {
              this.$set(this.$parent, field.formField, firstEvent[field.value]);
            }
          });
          (_c = (_b = this.$parent).isDirty) == null ? void 0 : _c.call(_b);
        }
        this.closeAIModal();
        this.generating = false;
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
        this.generating = false;
        console.error("axios catch error", error);
      });
    },
    loadAIResponses() {
      const stored = localStorage.getItem("aiEventResponses");
      this.aiResponses = stored ? JSON.parse(stored) : [];
    }
  },
  mounted() {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      this.isSpeechSupported = true;
      this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      this.recognition.lang = "en-US";
      this.recognition.interimResults = true;
      this.recognition.continuous = true;
      this.recognition.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            this.finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }
        this.aiPrompt = this.finalTranscript + interimTranscript;
      };
      this.recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        this.cleanupMic();
      };
      this.recognition.onend = () => {
        this.isListening = false;
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.speechStartTime = null;
        this.timerSeconds = 0;
      };
    }
  }
};
var _sfc_render$a = function render3() {
  var _a, _b;
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "mb-4" }, [_c("button", { staticClass: "ai-trigger-btn", attrs: { "type": "button" }, on: { "click": function($event) {
    return _vm.openAIModal("generate");
  } } }, [_c("div", { staticClass: "ai-btn-content" }, [_vm._m(0), _c("div", { staticClass: "ai-btn-text" }, [_vm._v(" " + _vm._s(((_a = _vm.aiResponses) == null ? void 0 : _a.length) > 0 || _vm.event_id > 0 ? _vm.trans("em.regenerate_with_ai") : _vm.trans("em.generate_with_ai")) + " ")])])])]), _vm.showAIModal ? _c("div", { staticClass: "ai-modal-overlay", on: { "click": _vm.closeAIModal } }, [_c("div", { staticClass: "ai-modal-container", on: { "click": function($event) {
    $event.stopPropagation();
  } } }, [_c("div", { staticClass: "ai-modal-header" }, [_c("div", { staticClass: "ai-modal-title-section" }, [_vm._m(1), _c("div", { staticClass: "ai-title-content" }, [_c("h3", { staticClass: "ai-modal-title" }, [_vm._v(" " + _vm._s(((_b = _vm.aiResponses) == null ? void 0 : _b.length) > 0 || _vm.event_id > 0 ? _vm.trans("em.regenerate_with_ai") : _vm.trans("em.generate_with_ai")) + " ")]), _c("p", { staticClass: "ai-modal-subtitle" }, [_vm._v(" " + _vm._s(_vm.trans("em.ai_generator_subtitle")) + " ")])])]), _c("button", { staticClass: "ai-close-btn", attrs: { "type": "button" }, on: { "click": _vm.closeAIModal } }, [_c("i", { staticClass: "fas fa-times" })])]), _c("div", { staticClass: "ai-modal-body bg-white" }, [_vm.modalMode === "generate" ? _c("div", { staticClass: "ai-content-section" }, [_c("div", { staticClass: "ai-input-section" }, [_c("label", { staticClass: "ai-input-label", attrs: { "for": "aiPrompt" } }, [_c("i", { staticClass: "fas fa-lightbulb ai-label-icon" }), _vm._v(" " + _vm._s(_vm.trans("em.describe_your_event")) + " ")]), _c("div", { staticClass: "ai-textarea-wrapper" }, [_c("textarea", { directives: [{ name: "model", rawName: "v-model", value: _vm.aiPrompt, expression: "aiPrompt" }], staticClass: "ai-textarea", attrs: { "id": "aiPrompt", "rows": "10", "placeholder": _vm.trans("em.ai_prompt_placeholder") }, domProps: { "value": _vm.aiPrompt }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.aiPrompt = $event.target.value;
  } } }), _c("div", { staticClass: "ai-textarea-footer" }, [_c("div", { staticClass: "ai-char-count" }, [_vm._v(" " + _vm._s(_vm.aiPrompt.length) + " " + _vm._s(_vm.trans("em.characters")) + " ")])])]), _c("div", { staticClass: "ai-controls" }, [_c("div", { staticClass: "ai-voice-section" }, [_c("button", { staticClass: "ai-voice-btn", class: { "ai-voice-active": _vm.isListening }, attrs: { "disabled": !_vm.isSpeechSupported }, on: { "click": _vm.toggleSpeechRecognition } }, [_c("i", { staticClass: "fas", class: _vm.isListening ? "fa-stop" : "fa-microphone" }), _c("div", [_vm._v(_vm._s(_vm.isListening ? _vm.trans("em.stop") : _vm.trans("em.voice_input")))])]), _vm.isListening && _vm.speechStartTime ? _c("div", { staticClass: "ai-voice-timer" }, [_c("div", { staticClass: "ai-timer-dot" }), _vm._v(" " + _vm._s(_vm.timerDisplay) + "s ")]) : _vm._e()]), _c("button", { staticClass: "ai-clear-btn", attrs: { "disabled": !_vm.aiPrompt }, on: { "click": _vm.clearPrompt } }, [_c("i", { staticClass: "fas fa-eraser" }), _vm._v(" " + _vm._s(_vm.trans("em.clear")) + " ")])]), !_vm.isSpeechSupported ? _c("div", { staticClass: "ai-warning" }, [_c("i", { staticClass: "fas fa-exclamation-triangle" }), _vm._v(" " + _vm._s(_vm.trans("em.voice_not_supported")) + " ")]) : _vm._e()]), _c("div", { staticClass: "ai-generate-section" }, [_c("button", { staticClass: "ai-generate-btn", attrs: { "disabled": _vm.generating || !_vm.aiPrompt.trim() }, on: { "click": _vm.generateAIContent } }, [_c("div", { staticClass: "ai-generate-content" }, [_vm.generating ? _c("div", { staticClass: "ai-loading-spinner" }, [_c("div", { staticClass: "ai-spinner" })]) : _c("i", { staticClass: "fa-solid fa-wand-magic-sparkles" }), _c("div", [_vm._v(_vm._s(_vm.generating ? _vm.trans("em.generating") : _vm.trans("em.generate_event_content")))])])]), _c("p", { staticClass: "ai-generate-hint" }, [_vm._v(" " + _vm._s(_vm.trans("em.ai_generate_hint")) + " ")])])]) : _vm._e()])])]) : _vm._e()]);
};
var _sfc_staticRenderFns$a = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "ai-icon-wrapper" }, [_c("i", { staticClass: "fa-solid fa-wand-magic-sparkles" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "ai-title-icon" }, [_c("i", { staticClass: "fa-solid fa-wand-magic-sparkles" })]);
}];
var __component__$a = /* @__PURE__ */ normalizeComponent(
  _sfc_main$a,
  _sfc_render$a,
  _sfc_staticRenderFns$a,
  false,
  null,
  null
);
const AISuggetion = __component__$a.exports;
const _sfc_main$9 = {
  props: [
    "organisers",
    "is_admin",
    "event_ck",
    "selected_organiser"
  ],
  components: {
    AISuggetion
  },
  mixins: [
    mixinsFilters
  ],
  data() {
    return {
      title: null,
      excerpt: null,
      organiser_ids: null,
      categories: [],
      description: this.event_ck.description,
      faq: this.event_ck.faq,
      category_id: 0,
      featured: 0,
      status: 0,
      scan_on_event_day_only: 0,
      // organizers options
      options: this.organisers,
      //selected organizer
      organizer: this.selected_organiser,
      offline_payment_info: null,
      // AI Event Generator
      openai_api_key: is_openai_api_key
    };
  },
  computed: {
    // get global variables
    ...mapState(["event_id", "organiser_id", "event", "is_dirty"]),
    slug: function() {
      if (this.title != null) {
        var slug = this.sanitizeTitle(this.title);
        return slug;
      }
    }
  },
  methods: {
    // update global variables
    ...mapMutations(["add", "update"]),
    editEvent(editor) {
      if (Object.keys(this.event).length > 0) {
        this.title = this.event.title;
        this.excerpt = this.event.excerpt;
        this.category_id = this.event.category_id;
        this.organiser_ids = this.organiser_id;
        this.featured = this.event.featured > 0 ? 1 : 0;
        this.status = this.event.status > 0 ? 1 : 0;
        this.scan_on_event_day_only = this.event.scan_on_event_day_only > 0 ? 1 : 0;
        this.offline_payment_info = this.event.offline_payment_info;
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
    formSubmit(event) {
      let post_url = route("eventmie.myevents_store");
      let post_data = new FormData(this.$refs.form);
      axios.post(post_url, post_data).then((res) => {
        if (res.data.status) {
          this.add({
            event_id: res.data.id,
            organiser_id: res.data.organiser_id
          });
          this.showNotification("success", trans("em.event_save_success"));
          if (res.data.slug) {
            setTimeout(function() {
              window.location = route("eventmie.myevents_form", [res.data.slug]);
            }, 1e3);
          }
        }
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    getCategories() {
      let post_url = route("eventmie.myevents_categories");
      axios.get(post_url).then((res) => {
        if (res.data.status) {
          this.categories = res.data.categories;
        }
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    // slug route
    slugUrl() {
      if (this.slug != null)
        return route("eventmie.events_index") + "/" + this.slug;
      return "";
    },
    // get organizers
    getOrganizers(loading, search = null) {
      var postUrl = route("eventmie.get_organizers");
      var _this = this;
      axios.post(postUrl, {
        "search": search
      }).then((res) => {
        var promise = new Promise(function(resolve, reject) {
          _this.options = res.data.organizers;
          resolve(true);
        });
        promise.then(function(successMessage) {
          loading(false);
        }, function(errorMessage) {
          console.log(errorMessage);
        });
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    // v-select methods
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    // v-select methods
    search: _$1.debounce((loading, search, vm) => {
      if (search.length > 0)
        vm.getOrganizers(loading, search);
      else
        loading(false);
    }, 350),
    isDirty() {
      this.add({ is_dirty: true });
    },
    isDirtyReset() {
      this.add({ is_dirty: false });
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader, field) {
      if (!file || !file.type.startsWith("image/")) {
        this.showNotification("error", "Invalid file type. Please upload an image.");
        resetUploader();
        return;
      }
      let post_url = route("eventmie.myevents_detail_media");
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
    this.isDirtyReset();
    if (this.categories.length == 0)
      this.getCategories();
    if (this.event_id) {
      var $this = this;
      this.getMyEvent().then(function(response) {
        $this.editEvent();
      });
    }
  },
  watch: {
    // active when organizer search 
    organizer: function() {
      this.organiser_ids = this.organizer != null ? this.organizer.id : null;
    }
  }
};
var _sfc_render$9 = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_vm.openai_api_key != null && _vm.openai_api_key != "" ? _c("AISuggetion", { attrs: { "event_id": _vm.event_id } }) : _vm._e(), _c("form", { ref: "form", staticClass: "lgx-contactform", attrs: { "method": "POST", "enctype": "multipart/form-data" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.event_id, expression: "event_id" }], attrs: { "type": "hidden", "name": "event_id" }, domProps: { "value": _vm.event_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.event_id = $event.target.value;
  } } }), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.organiser_ids, expression: "organiser_ids" }, { name: "validate", rawName: "v-validate", value: _vm.is_admin ? "required" : "", expression: "(is_admin ? 'required' : '')" }], attrs: { "type": "hidden", "name": "organiser_id" }, domProps: { "value": _vm.organiser_ids }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.organiser_ids = $event.target.value;
  } } }), _vm.organisers.length > 0 ? _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(" " + _vm._s(_vm.trans("em.organiser")))]), !_vm.organiser_id ? _c("div", [_c("v-select", { staticClass: "style-chooser", attrs: { "label": "name", "placeholder": _vm.trans("em.search_organiser") + " " + _vm.trans("em.email") + "/" + _vm.trans("em.name"), "required": !_vm.organizer, "filterable": false, "options": _vm.options }, on: { "search": _vm.onSearch, "change": function($event) {
    return _vm.isDirty();
  } }, model: { value: _vm.organizer, callback: function($$v) {
    _vm.organizer = $$v;
  }, expression: "organizer" } }, [_c("div", { attrs: { "slot": "no-options" }, slot: "no-options" }, [_vm._v(_vm._s(_vm.trans("em.organiser_not_found")) + " ")])])], 1) : _vm._e(), _vm.organiser_id ? _c("input", { staticClass: "form-control", attrs: { "readonly": "", "type": "text" }, domProps: { "value": _vm.organizer.name + "  ( " + _vm.organizer.email + " )" } }) : _vm._e(), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("organiser_id"), expression: "errors.has('organiser_id')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("organiser_id")))])]) : _vm._e(), _vm.organisers.length <= 0 && Object.keys(_vm.event).length <= 0 && _vm.is_admin ? _c("div", [_c("div", { staticClass: "alert alert-danger" }, [_vm._v(_vm._s(_vm.trans("em.add_organiser")) + " ")])]) : _vm._e(), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.select_category")))]), _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.category_id, expression: "category_id" }, { name: "validate", rawName: "v-validate", value: "required|decimal|is_not:0", expression: "'required|decimal|is_not:0'" }], staticClass: "form-control", attrs: { "name": "category_id" }, on: { "change": [function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.category_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  }, function($event) {
    return _vm.isDirty();
  }] } }, [_c("option", { attrs: { "value": "0" } }, [_vm._v("-- " + _vm._s(_vm.trans("em.category")) + " --")]), _vm._l(_vm.categories, function(category, index2) {
    return _c("option", { key: index2, domProps: { "value": category.id } }, [_vm._v(_vm._s(category.name))]);
  })], 2), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("category_id"), expression: "errors.has('category_id')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("category_id")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.event_name")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.title, expression: "title" }, { name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control", attrs: { "type": "text", "name": "title" }, domProps: { "value": _vm.title }, on: { "change": function($event) {
    return _vm.isDirty();
  }, "input": function($event) {
    if ($event.target.composing) return;
    _vm.title = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("title"), expression: "errors.has('title')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("title")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.event_url")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.slug, expression: "slug" }, { name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], attrs: { "type": "hidden", "name": "slug" }, domProps: { "value": _vm.slug }, on: { "change": function($event) {
    return _vm.isDirty();
  }, "input": function($event) {
    if ($event.target.composing) return;
    _vm.slug = $event.target.value;
  } } }), _c("p", [_c("a", { attrs: { "target": "_blank", "href": _vm.slugUrl() } }, [_vm._v(_vm._s(_vm.slugUrl()))])])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.excerpt")) + " (" + _vm._s(_vm.trans("em.short_info")) + ")")]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.excerpt, expression: "excerpt" }, { name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control", attrs: { "type": "text", "name": "excerpt" }, domProps: { "value": _vm.excerpt }, on: { "change": function($event) {
    return _vm.isDirty();
  }, "input": function($event) {
    if ($event.target.composing) return;
    _vm.excerpt = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("excerpt"), expression: "errors.has('excerpt')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("excerpt")))])]), _c("div", { staticClass: "mb-3 text-wrap" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.description")))]), _c("textarea", { directives: [{ name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control", staticStyle: { "display": "none" }, attrs: { "rows": "3", "name": "description" }, domProps: { "value": _vm.description } }), _c("vue-editor", { attrs: { "useCustomImageHandler": "" }, on: { "image-added": (file, Editor, cursorLocation, resetUploader) => _vm.handleImageAdded(file, Editor, cursorLocation, resetUploader, "description") }, model: { value: _vm.description, callback: function($$v) {
    _vm.description = $$v;
  }, expression: "description" } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("description"), expression: "errors.has('description')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("description")))])], 1), _c("div", { staticClass: "mb-3 text-wrap" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.more_event_info")) + " ")]), _c("textarea", { staticClass: "form-control", staticStyle: { "display": "none" }, attrs: { "rows": "3", "name": "faq" }, domProps: { "value": _vm.faq } }), _c("vue-editor", { attrs: { "useCustomImageHandler": "" }, on: { "image-added": (file, Editor, cursorLocation, resetUploader) => _vm.handleImageAdded(file, Editor, cursorLocation, resetUploader, "faq") }, model: { value: _vm.faq, callback: function($$v) {
    _vm.faq = $$v;
  }, expression: "faq" } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("faq"), expression: "errors.has('faq')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("faq")))])], 1), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.offline_payment_info")) + " ")]), _c("textarea", { directives: [{ name: "model", rawName: "v-model", value: _vm.offline_payment_info, expression: "offline_payment_info" }], staticClass: "form-control", attrs: { "rows": "3", "name": "offline_payment_info" }, domProps: { "value": _vm.offline_payment_info }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.offline_payment_info = $event.target.value;
  } } }), _c("p", [_vm._v(_vm._s(_vm.trans("em.offline_payment_info_ie")))])]), _c("ul", { staticClass: "list-group list-group-flush mb-4" }, [_vm.is_admin ? _c("li", { staticClass: "list-group-item d-flex justify-content-between px-0" }, [_c("div", [_c("h5", { staticClass: "mb-0" }, [_vm._v(_vm._s(_vm.trans("em.event_featured")))]), _c("span", { staticClass: "small text-muted text-wrap" }, [_vm._v(_vm._s(_vm.trans("em.event_featured_ie")))])]), _c("div", [_c("div", { staticClass: "form-check form-switch" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.featured, expression: "featured" }], staticClass: "form-check-input form-check-input-lg", attrs: { "type": "checkbox", "id": "featured", "name": "featured" }, domProps: { "value": 1, "checked": Array.isArray(_vm.featured) ? _vm._i(_vm.featured, 1) > -1 : _vm.featured }, on: { "change": [function($event) {
    var $$a = _vm.featured, $$el = $event.target, $$c = $$el.checked ? true : false;
    if (Array.isArray($$a)) {
      var $$v = 1, $$i = _vm._i($$a, $$v);
      if ($$el.checked) {
        $$i < 0 && (_vm.featured = $$a.concat([$$v]));
      } else {
        $$i > -1 && (_vm.featured = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
      }
    } else {
      _vm.featured = $$c;
    }
  }, function($event) {
    return _vm.isDirty();
  }] } }), _c("label", { staticClass: "form-check-label", attrs: { "for": "featured" } })])])]) : _vm._e(), _vm.is_admin ? _c("li", { staticClass: "list-group-item d-flex justify-content-between px-0" }, [_c("div", [_c("h5", { staticClass: "mb-0" }, [_vm._v(_vm._s(_vm.trans("em.event_status")))]), _c("span", { staticClass: "small text-muted text-wrap" }, [_vm._v(_vm._s(_vm.trans("em.event_status_ie")))])]), _c("div", [_c("div", { staticClass: "form-check form-switch" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.status, expression: "status" }], staticClass: "form-check-input form-check-input-lg", attrs: { "type": "checkbox", "id": "status", "name": "status" }, domProps: { "value": 1, "checked": Array.isArray(_vm.status) ? _vm._i(_vm.status, 1) > -1 : _vm.status }, on: { "change": [function($event) {
    var $$a = _vm.status, $$el = $event.target, $$c = $$el.checked ? true : false;
    if (Array.isArray($$a)) {
      var $$v = 1, $$i = _vm._i($$a, $$v);
      if ($$el.checked) {
        $$i < 0 && (_vm.status = $$a.concat([$$v]));
      } else {
        $$i > -1 && (_vm.status = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
      }
    } else {
      _vm.status = $$c;
    }
  }, function($event) {
    return _vm.isDirty();
  }] } }), _c("label", { staticClass: "form-check-label", attrs: { "for": "status" } })])])]) : _vm._e(), _c("li", { staticClass: "list-group-item d-flex justify-content-between px-0" }, [_c("div", [_c("h5", { staticClass: "mb-0" }, [_vm._v(_vm._s(_vm.trans("em.scan_on_event_day_only")))]), _c("span", { staticClass: "small text-muted text-wrap" }, [_vm._v(_vm._s(_vm.trans("em.scan_on_event_day_only_ie")))])]), _c("div", [_c("div", { staticClass: "form-check form-switch" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.scan_on_event_day_only, expression: "scan_on_event_day_only" }], staticClass: "form-check-input form-check-input-lg", attrs: { "type": "checkbox", "id": "scan_on_event_day_only", "name": "scan_on_event_day_only" }, domProps: { "value": 1, "checked": Array.isArray(_vm.scan_on_event_day_only) ? _vm._i(_vm.scan_on_event_day_only, 1) > -1 : _vm.scan_on_event_day_only }, on: { "change": [function($event) {
    var $$a = _vm.scan_on_event_day_only, $$el = $event.target, $$c = $$el.checked ? true : false;
    if (Array.isArray($$a)) {
      var $$v = 1, $$i = _vm._i($$a, $$v);
      if ($$el.checked) {
        $$i < 0 && (_vm.scan_on_event_day_only = $$a.concat([$$v]));
      } else {
        $$i > -1 && (_vm.scan_on_event_day_only = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
      }
    } else {
      _vm.scan_on_event_day_only = $$c;
    }
  }, function($event) {
    return _vm.isDirty();
  }] } }), _c("label", { staticClass: "form-check-label", attrs: { "for": "scan_on_event_day_only" } })])])])]), _c("button", { staticClass: "btn btn-primary btn-lg mt-2", attrs: { "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")))])])], 1);
};
var _sfc_staticRenderFns$9 = [];
var __component__$9 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$9,
  _sfc_render$9,
  _sfc_staticRenderFns$9,
  false,
  null,
  null
);
const Detail = __component__$9.exports;
const _sfc_main$8 = {
  mixins: [
    mixinsFilters
  ],
  data() {
    return {
      // thumbnail
      thumbnail: null,
      thumbnail_preview: "",
      thumbnail_croppa: null,
      images: [],
      multiple_images: [],
      video_link: null
    };
  },
  computed: {
    // get global variables
    ...mapState(["event_id", "organiser_id", "event"])
  },
  methods: {
    // update global variables
    ...mapMutations(["add", "update"]),
    // ======================CROPPER METHODS==================
    // cropper validation error
    onFileTypeMismatch(file) {
      Vue.helpers.showToast("error", trans("em.invalid_file"));
    },
    onFileSizeExceed(file) {
      Vue.helpers.showToast("error", trans("em.max_file") + " 10MB");
    },
    // ======================CROPPER METHODS==================
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
    async cropThumbnailPoster() {
      if (this.thumbnail_croppa === null) {
        Vue.helpers.showToast("error", trans("em.thumbnail") + " " + trans("em.image") + " " + trans("em.required"));
        return false;
      }
      this.thumbnail = await this.thumbnail_croppa.generateDataUrl("image/jpeg");
      this.validateForm();
    },
    // submit form
    formSubmit(event) {
      let post_url = route("eventmie.myevents_store_media");
      let post_data = new FormData(this.$refs.form);
      axios.post(post_url, post_data).then((res) => {
        if (res.data.status) {
          this.images = res.data.images;
          this.multiple_images = this.images.images ? JSON.parse(this.images.images) : [];
          this.showNotification("success", trans("em.event_save_success"));
          setTimeout(function() {
            location.reload(true);
          }, 1e3);
        }
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    // set default value in case of edit
    editMedia() {
      if (Object.keys(this.event).length > 0) {
        this.thumbnail_preview = this.getImageUrl(this.event.thumbnail);
        this.video_link = this.event.video_link;
        this.multiple_images = this.event.images ? JSON.parse(this.event.images) : [];
      }
    },
    //delete 
    deleteGalleryImages(image = null) {
      this.showConfirm(trans("em.delete")).then((res) => {
        if (res) {
          let post_url = route("eventmie.delete_image");
          let post_data = {
            "event_id": this.event.id,
            "image": image,
            "organiser_id": this.organiser_id
          };
          axios.post(post_url, post_data).then((res2) => {
            if (res2.data.status) {
              this.images = res2.data.images;
              this.multiple_images = this.images.images ? JSON.parse(this.images.images) : [];
              this.showNotification("success", trans("em.event_save_success"));
            }
          }).catch((error) => {
            let serrors = Vue.helpers.axiosErrors(error);
            if (serrors.length) {
              this.serverValidate(serrors);
            }
          });
        }
      });
    },
    isDirty() {
      this.add({ is_dirty: true });
    },
    isDirtyReset() {
      this.add({ is_dirty: false });
    }
  },
  mounted() {
    this.isDirtyReset();
    let event_step = this.eventStep();
    if (event_step) {
      var $this = this;
      this.getMyEvent().then(function(response) {
        $this.editMedia();
      });
    }
  }
};
var _sfc_render$8 = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "tab-pane active" }, [_c("div", { staticClass: "panel-group" }, [_c("div", { staticClass: "panel panel-default" }, [_c("div", { staticClass: "panel-heading" }, [_c("form", { ref: "form", attrs: { "method": "POST", "enctype": "multipart/form-data" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.cropThumbnailPoster.apply(null, arguments);
  } } }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.event_id, expression: "event_id" }], attrs: { "type": "hidden", "name": "event_id" }, domProps: { "value": _vm.event_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.event_id = $event.target.value;
  } } }), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.organiser_id, expression: "organiser_id" }], attrs: { "type": "hidden", "name": "organiser_id" }, domProps: { "value": _vm.organiser_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.organiser_id = $event.target.value;
  } } }), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.thumbnail, expression: "thumbnail" }], attrs: { "type": "hidden", "name": "thumbnail" }, domProps: { "value": _vm.thumbnail }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.thumbnail = $event.target.value;
  } } }), _c("div", { staticClass: "row mb-3" }, [_c("div", { staticClass: "col-md-12" }, [_c("label", { staticClass: "form-label mb-0" }, [_vm._v(_vm._s(_vm.trans("em.thumbnail_image")))]), _c("p", { staticClass: "mb-2 mt-0" }, [_c("small", { staticClass: "text-muted" }, [_vm._v(_vm._s(_vm.trans("em.zoom_info")) + " " + _vm._s(_vm.trans("em.drag_info")))])]), _c("croppa", { class: "croppa-thumbnail ", attrs: { "placeholder": _vm.trans("em.drag_drop") + " " + _vm.trans("em.or") + " " + _vm.trans("em.browse") + " " + _vm.trans("em.thumbnail"), "placeholder-font-size": 16, "placeholder-color": "#000", "quality": 2, "width": 256, "height": 256, "prevent-white-space": true, "show-remove-button": true, "zoom-speed": 1, "file-size-limit": 10485760, "accept": ".jpg,.jpeg,.png", "initial-image": _vm.thumbnail_preview }, on: { "file-type-mismatch": _vm.onFileTypeMismatch, "file-size-exceed": _vm.onFileSizeExceed, "file-choose": function($event) {
    return _vm.isDirty();
  } }, model: { value: _vm.thumbnail_croppa, callback: function($$v) {
    _vm.thumbnail_croppa = $$v;
  }, expression: "thumbnail_croppa" } }, [_c("img", { class: "p-2", attrs: { "slot": "initial", "crossOrigin": "anonymous", "src": _vm.thumbnail_preview }, slot: "initial" })]), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("thumbnail"), expression: "errors.has('thumbnail')" }], staticClass: "help-block text-danger" }, [_vm._v(_vm._s(_vm.errors.first("thumbnail")))]), _c("p", { staticClass: "mb-0 text-muted" }, [_vm._v(_vm._s(_vm.trans("em.thumbnail_info")))])], 1)]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.images_gallery")))]), _c("div", { staticClass: "col-md-12 mb-3" }, [_c("input", { ref: "images", staticClass: "form-control", attrs: { "multiple": "multiple", "type": "file", "name": "images[]" }, on: { "change": function($event) {
    return _vm.isDirty();
  } } }), _c("span", { staticClass: "text-muted" }, [_vm._v(_vm._s(_vm.trans("em.gallery_info")))]), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("images"), expression: "errors.has('images')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("images")))])]), _c("div", { staticClass: "w-100" }, [_vm.multiple_images.length > 0 ? _c("div", { staticClass: "row" }, _vm._l(_vm.multiple_images, function(image, index2) {
    return _c("div", { key: index2, staticClass: "col-md-2" }, [_c("button", { staticClass: "btn-sm btn-remove-image bg-light-danger text-danger", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.deleteGalleryImages(image);
    } } }, [_c("i", { staticClass: "fas fa-times" })]), _c("img", { staticClass: "rounded img-fluid", attrs: { "src": _vm.getImageUrl(image) } })]);
  }), 0) : _vm._e()])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v("YouTube " + _vm._s(_vm.trans("em.video_url")) + " (" + _vm._s(_vm.trans("em.optional")) + ")")]), _c("div", { staticClass: "col-md-12" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.video_link, expression: "video_link" }], staticClass: "form-control", attrs: { "type": "text", "name": "video_link", "placeholder": "e.g https://www.youtube.com/watch?v=id" }, domProps: { "value": _vm.video_link }, on: { "change": function($event) {
    return _vm.isDirty();
  }, "input": function($event) {
    if ($event.target.composing) return;
    _vm.video_link = $event.target.value;
  } } }), _c("span", { staticClass: "text-muted" }, [_vm._v(_vm._s(_vm.trans("em.enter_video_id_only")))])])]), _c("div", { staticClass: "mb-3" }, [_c("div", { staticClass: "col-sm-12" }, [_c("button", { staticClass: "btn btn-primary btn-lg", attrs: { "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")))])])])])])])])]);
};
var _sfc_staticRenderFns$8 = [];
var __component__$8 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$8,
  _sfc_render$8,
  _sfc_staticRenderFns$8,
  false,
  null,
  null
);
const Media = __component__$8.exports;
const _sfc_main$7 = {
  name: "GoogleMap",
  props: [
    "event_prop",
    "event_ck"
  ],
  mixins: [
    mixinsFilters
  ],
  components: {
    VenueComponent
  },
  data() {
    return {
      venue: null,
      address: null,
      city: null,
      state: null,
      zipcode: null,
      countries: [],
      country_id: 0,
      latitude: null,
      longitude: null,
      online_event: 0,
      online_location: this.event_ck.online_location,
      venues: [],
      venues_ids: [],
      venues_options: [],
      tmp_venues_ids: [],
      selected_venues: [],
      isLoading: false
    };
  },
  computed: {
    // get global variables
    ...mapState(["event_id", "organiser_id", "event"])
  },
  methods: {
    // update global variables
    ...mapMutations(["add", "update"]),
    get_countries() {
      axios.get(route("eventmie.myevents_countries")).then((res) => {
        if (res.data.countries) {
          this.countries = res.data.countries;
        }
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
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
      let post_url = route("eventmie.myevents_store_location");
      let post_data = new FormData(this.$refs.form);
      post_data.append("venues_ids", this.venues_ids);
      axios.post(post_url, post_data).then((res) => {
        if (res.data.status) {
          this.showNotification("success", trans("em.event_save_success"));
          setTimeout(function() {
            location.reload(true);
          }, 1e3);
        }
      }).catch((error) => {
        if (error.length) {
          this.serverValidate(error);
        }
      });
    },
    //edit location
    edit_location() {
      if (Object.keys(this.event).length > 0) {
        this.venue = this.event.venue;
        this.address = this.event.address;
        this.city = this.event.city;
        this.state = this.event.state;
        this.zipcode = this.event.zipcode;
        this.country_id = this.event.country_id ? this.event.country_id : 0;
        this.latitude = this.event.latitude;
        this.longitude = this.event.longitude;
        this.online_event = this.event.online_event;
        this.online_location = this.event.online_location;
      }
    },
    isDirty() {
      this.add({ is_dirty: true });
    },
    isDirtyReset() {
      this.add({ is_dirty: false });
    },
    // get selected venues in case of editing
    getSelectedVenues() {
      axios.post(route("eventmie.selected_venues"), {
        event_id: this.event_id,
        organiser_id: this.organiser_id
      }).then((res) => {
        this.selected_venues = res.data.selected_event_venues;
        if (this.selected_venues.length > 0) {
          this.tmp_venues_ids = { value: this.selected_venues[0].id, text: this.selected_venues[0].title };
        }
      }).catch((error) => {
        Vue.helpers.axiosErrors(error);
      });
    },
    // update venues for submit
    updateVenues() {
      console.log("update venue");
      this.venues_ids = "";
      console.log(this.tmp_venues_ids == null);
      if (this.tmp_venues_ids == null)
        return true;
      if (Object.keys(this.tmp_venues_ids).length > 0) {
        this.venues_ids = this.tmp_venues_ids.value;
      }
    },
    limitText(count) {
      return trans("em.event") + count + trans("em.venues");
    },
    // get venues of organiser and tag searching
    searchVenues: _.debounce(function(search) {
      this.isLoading = true;
      let post_url = route("eventmie.search_venues_all");
      let post_data = {
        "search": search,
        organiser_id: this.organiser_id
      };
      axios.post(post_url, post_data).then((res) => {
        this.venues_options = [];
        this.venues = res.data.venues;
        if (this.venues.length > 0) {
          this.venues.forEach((function(v, key) {
            this.venues_options.push({ value: v.id, text: v.title });
          }).bind(this));
        }
        this.isLoading = false;
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    }, 1e3),
    clearAll() {
      this.tmp_venues_ids = [];
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader, field) {
      if (!file || !file.type.startsWith("image/")) {
        this.showNotification("error", "Invalid file type. Please upload an image.");
        resetUploader();
        return;
      }
      let post_url = route("eventmie.myevents_location_media");
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
    this.isDirtyReset();
    let event_step = this.eventStep();
    if (event_step) {
      this.get_countries();
      var $this = this;
      this.getMyEvent().then(function(response) {
        $this.searchVenues(null);
        $this.getSelectedVenues();
        $this.edit_location();
      });
    }
  },
  watch: {
    tmp_venues_ids: function() {
      this.updateVenues();
    }
  }
};
var _sfc_render$7 = function render6() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "tab-pane active" }, [_c("div", { staticClass: "panel-group" }, [_c("div", { staticClass: "panel panel-default lgx-panel" }, [_c("div", { staticClass: "panel-heading" }, [_c("form", { ref: "form", staticClass: "lgx-contactform", attrs: { "method": "POST", "enctype": "multipart/form-data" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.event_id, expression: "event_id" }], attrs: { "type": "hidden", "name": "event_id" }, domProps: { "value": _vm.event_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.event_id = $event.target.value;
  } } }), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.organiser_id, expression: "organiser_id" }], attrs: { "type": "hidden", "name": "organiser_id" }, domProps: { "value": _vm.organiser_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.organiser_id = $event.target.value;
  } } }), _c("div", { staticClass: "d-flex justify-content-between px-0 mb-3" }, [_c("div", [_c("h5", { staticClass: "mb-0" }, [_vm._v(_vm._s(_vm.trans("em.online_event")))]), _c("span", { staticClass: "small text-muted text-wrap" }, [_vm._v(_vm._s(_vm.trans("em.event_online_ie")))])]), _c("div", [_c("div", { staticClass: "form-check form-switch" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.online_event, expression: "online_event" }], staticClass: "form-check-input form-check-input-lg", attrs: { "type": "checkbox", "id": "online_event", "name": "online_event" }, domProps: { "value": 1, "checked": Array.isArray(_vm.online_event) ? _vm._i(_vm.online_event, 1) > -1 : _vm.online_event }, on: { "change": [function($event) {
    var $$a = _vm.online_event, $$el = $event.target, $$c = $$el.checked ? true : false;
    if (Array.isArray($$a)) {
      var $$v = 1, $$i = _vm._i($$a, $$v);
      if ($$el.checked) {
        $$i < 0 && (_vm.online_event = $$a.concat([$$v]));
      } else {
        $$i > -1 && (_vm.online_event = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
      }
    } else {
      _vm.online_event = $$c;
    }
  }, function($event) {
    return _vm.isDirty();
  }] } }), _c("label", { staticClass: "form-check-label", attrs: { "for": "online_event" } })])])]), _vm.online_event > 0 ? _c("div", { staticClass: "mb-3 text-wrap" }, [_c("label", { staticClass: "form-label", attrs: { "for": "online_location" } }, [_vm._v(_vm._s(_vm.trans("em.online_location")))]), _c("textarea", { staticClass: "form-control", staticStyle: { "display": "none" }, attrs: { "rows": "3", "name": "online_location" }, domProps: { "value": _vm.online_location } }), _c("vue-editor", { attrs: { "useCustomImageHandler": "" }, on: { "image-added": (file, Editor, cursorLocation, resetUploader) => _vm.handleImageAdded(file, Editor, cursorLocation, resetUploader, "location") }, model: { value: _vm.online_location, callback: function($$v) {
    _vm.online_location = $$v;
  }, expression: "online_location" } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("online_location"), expression: "errors.has('online_location')" }], staticClass: "small text-wrap text-danger" }, [_vm._v(_vm._s(_vm.errors.first("online_location")))]), _c("span", { staticClass: "small text-muted text-wrap" }, [_vm._v(_vm._s(_vm.trans("em.online_secret")))])], 1) : _vm._e(), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.event_venues")) + " (" + _vm._s(_vm.trans("em.optional")) + ")")]), _c("multiselect", { class: "form-control form-control-sm px-0 py-0 border-0", attrs: { "options": _vm.venues_options, "id": "ajax", "label": "text", "track-by": "value", "placeholder": "-- " + _vm.trans("em.search_venue") + " --", "open-direction": "bottom", "multiple": false, "searchable": true, "loading": _vm.isLoading, "internal-search": false, "clear-on-select": true, "close-on-select": true, "options-limit": 300, "limit": 20, "limit-text": _vm.limitText, "max-height": 300, "show-no-results": false, "hide-selected": false, "allow-empty": _vm.online_event > 0 ? true : false, "preserve-search": false, "preselect-first": false }, on: { "search-change": _vm.searchVenues, "select": function($event) {
    return _vm.isDirty();
  } }, scopedSlots: _vm._u([{ key: "tag", fn: function({ option, remove }) {
    return [_c("span", { staticClass: "multiselect__tag", on: { "click": function($event) {
      return remove(option);
    } } }, [_c("span", [_vm._v(_vm._s(option.text))]), _c("i", { staticClass: "multiselect__tag-icon", attrs: { "aria-hidden": "true", "tabindex": "1" } })])];
  } }]), model: { value: _vm.tmp_venues_ids, callback: function($$v) {
    _vm.tmp_venues_ids = $$v;
  }, expression: "tmp_venues_ids" } }, [_c("span", { attrs: { "slot": "noResult" }, slot: "noResult" }, [_vm._v(" " + _vm._s(_vm.trans("em.venues_not_found")))])])], 1), _c("div", { staticClass: "mb-3" }, [_c("venue-component", { attrs: { "organiser_id": _vm.organiser_id } })], 1), _c("button", { staticClass: "btn btn-primary btn-lg", attrs: { "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")))])])])])])]);
};
var _sfc_staticRenderFns$7 = [];
var __component__$7 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$7,
  _sfc_render$7,
  _sfc_staticRenderFns$7,
  false,
  null,
  null
);
const Location = __component__$7.exports;
const _sfc_main$6 = {
  props: [
    "sch_index",
    "sch_r_type",
    "start_time_p",
    "end_time_p",
    "start_date_p",
    "end_date_p",
    "schedules_p",
    "month",
    "months"
  ],
  mixins: [
    mixinsFilters
  ],
  computed: {
    // get global variables
    ...mapState(["v_repetitive", "v_repetitive_days", "v_repetitive_dates", "v_from_time", "v_to_time", "is_dirty"])
  },
  data() {
    return {
      // parent date and time assign to child start and end date and start and time varible becaue you can't update prop value direct
      start_date: this.start_date_p,
      end_date: this.end_date_p,
      start_time: this.start_time_p,
      end_time: this.end_time_p,
      schedules: this.schedules_p ? this.schedules_p : [],
      //end
      moment,
      repetitive_days: [{ value: 1, text: trans("em.sunday") }],
      repetitive_days_options: [
        { value: 1, text: trans("em.sunday") },
        { value: 2, text: trans("em.monday") },
        { value: 3, text: trans("em.tuesday") },
        { value: 4, text: trans("em.wednesday") },
        { value: 5, text: trans("em.thursday") },
        { value: 6, text: trans("em.friday") },
        { value: 7, text: trans("em.saturday") }
      ],
      repetitive_dates: [{ value: 1, text: "1" }],
      repetitive_dates_options: [],
      from_time: [],
      to_time: [],
      //local timezone variable
      local_from_time: null,
      local_to_time: null,
      local_start_date: null,
      local_end_date: null,
      local_from_date: null,
      local_to_date: null
    };
  },
  methods: {
    // update global variables
    ...mapMutations(["add", "update"]),
    // edit schedule
    editSchedule() {
      let $_this = this;
      let schedules = [0];
      this.convert_to_local_tz();
      this.start_date = this.setDateTime(this.local_start_date);
      this.end_date = this.setDateTime(this.local_end_date);
      this.from_time = this.setDateTime(this.local_from_time);
      this.to_time = this.setDateTime(this.local_to_time);
      if (Object.keys(this.schedules).length > 0 && this.schedules.repetitive_type == 3) {
        this.repetitive_dates = [];
        if (this.schedules.repetitive_dates == null) {
          return this.repetitive_dates;
        }
        schedules = JSON.parse(this.schedules.repetitive_dates.split(","));
        if (schedules.length > 0) {
          schedules.forEach(function(value, key) {
            $_this.repetitive_dates.push($_this.repetitive_dates_options[value - 1]);
          });
        }
      }
      if (Object.keys(this.schedules).length > 0 && this.schedules.repetitive_type == 1) {
        this.repetitive_dates = [];
        if (this.schedules.repetitive_dates == null) {
          return this.repetitive_dates;
        }
        schedules = JSON.parse(this.schedules.repetitive_dates.split(","));
        if (schedules.length > 0) {
          schedules.forEach(function(value, key) {
            $_this.repetitive_dates.push($_this.repetitive_dates_options[value - 1]);
          });
        }
      }
      if (Object.keys(this.schedules).length > 0 && this.schedules.repetitive_type == 2) {
        this.repetitive_days = [];
        if (this.schedules.repetitive_days == null) {
          return this.repetitive_days;
        }
        schedules = this.schedules.repetitive_days.split(",");
        if (schedules.length > 0) {
          schedules.forEach(function(value, key) {
            $_this.repetitive_days.push($_this.repetitive_days_options[value - 1]);
          });
        }
      }
    },
    // update schedule
    updateSchedule() {
      var tmp_repetitive_days = "";
      if (this.repetitive_days != null && Object.keys(this.repetitive_days).length > 0) {
        var count = this.repetitive_days.length;
        this.repetitive_days.forEach(function(value, key) {
          tmp_repetitive_days += value.value.toString().length == 1 ? "0" + value.value : value.value;
          if (key < count - 1)
            tmp_repetitive_days += ",";
        });
      } else {
        tmp_repetitive_days = null;
      }
      var tmp_repetitive_dates = "";
      if (this.repetitive_dates != null && Object.keys(this.repetitive_dates).length > 0) {
        var count = this.repetitive_dates.length;
        this.repetitive_dates.forEach(function(value, key) {
          tmp_repetitive_dates += value.value.toString().length == 1 ? "0" + value.value : value.value;
          if (key < count - 1)
            tmp_repetitive_dates += ",";
        });
      } else {
        tmp_repetitive_dates = null;
      }
      this.update({
        v_sch_index: this.sch_index,
        v_repetitive_days: tmp_repetitive_days,
        v_repetitive_dates: tmp_repetitive_dates,
        v_from_time: moment(this.from_time).locale("en").format("HH:mm:ss"),
        v_to_time: moment(this.to_time).locale("en").format("HH:mm:ss")
      });
    },
    // set selected start_time and end_time in from_time and to_time
    selectedTimes() {
      if (Object.keys(this.schedules).length <= 0) {
        this.from_time = this.start_time;
        this.to_time = this.end_time;
      }
    },
    // server time convert into local timezone
    convert_to_local_tz() {
      this.local_start_date = moment(this.start_date).format("YYYY-MM-DD");
      this.local_end_date = moment(this.end_date).format("YYYY-MM-DD");
      this.local_from_time = this.start_time;
      this.local_to_time = this.end_time;
      this.local_from_date = this.start_date;
      this.local_to_date = this.end_date;
      if (Object.keys(this.schedules).length > 0 && this.schedules.repetitive_type != 2) {
        this.local_from_time = Object.keys(this.schedules).length > 0 ? moment(this.schedules.from_time, "HH:mm:ss") : this.start_time;
        this.local_to_time = Object.keys(this.schedules).length > 0 ? moment(this.schedules.to_time, "HH:mm:ss") : this.end_time;
        this.local_from_date = Object.keys(this.schedules).length > 0 ? this.schedules.from_date : this.start_date;
        this.local_to_date = Object.keys(this.schedules).length > 0 ? this.schedules.to_date : this.end_date;
      }
      if (Object.keys(this.schedules).length > 0 && this.schedules.repetitive_type == 2) {
        this.local_from_time = Object.keys(this.schedules).length > 0 ? this.userTimezone(this.schedules.from_date + " " + this.schedules.from_time, "YYYY-MM-DD HH:mm:ss") : this.start_time;
        this.local_to_time = Object.keys(this.schedules).length > 0 ? this.userTimezone(this.schedules.to_date + " " + this.schedules.to_time, "YYYY-MM-DD HH:mm:ss") : this.end_time;
      }
    },
    // totoal days
    schedule_total_days() {
      var count_days = moment(this.month, "YYYY-MM").locale("en").daysInMonth();
      var total = 0;
      if (this.sch_r_type == 1 && this.repetitive_dates.length > 0 && (Object.keys(this.schedules).length > 0 ? !this.schedules.repetitive_type : this.repetitive_dates != null)) {
        if (this.months[0] == this.month && this.months.length != 1) {
          total = count_days - moment(this.local_start_date, "YYYY-MM-DD").locale("en").format("DD") + 1;
          let count_d = total;
          this.repetitive_dates.forEach((function(v, k) {
            if (moment(this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment(this.month + "-" + v.value, "YYYY-MM-DD").format("YYYY-MM-DD")) {
              count_d = count_d - 1;
              total = count_d;
            }
          }).bind(this));
        } else if (this.months[this.months.length - 1] == this.month && this.months.length != 1) {
          total = moment(this.local_end_date, "YYYY-MM-DD").locale("en").format("DD");
          let count_d = total;
          this.repetitive_dates.forEach((function(v, k) {
            if (moment(this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment(this.month + "-" + v.value, "YYYY-MM-DD").format("YYYY-MM-DD")) {
              count_d = count_d - 1;
              total = count_d;
            }
          }).bind(this));
        } else if (this.months.length == 1) {
          var a = moment(this.local_start_date, "YYYY-MM-DD").locale("en");
          var b = moment(this.local_end_date, "YYYY-MM-DD").locale("en");
          total = b.diff(a, "days") + 1;
          let count_d = total;
          this.repetitive_dates.forEach((function(v, k) {
            if (moment(this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment(this.month + "-" + v.value, "YYYY-MM-DD").format("YYYY-MM-DD") && moment(this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment(this.month + "-" + v.value, "YYYY-MM-DD").format("YYYY-MM-DD")) {
              count_d = count_d - 1;
              total = count_d;
            }
          }).bind(this));
        } else {
          total = count_days - this.repetitive_dates.length;
        }
      }
      if (this.sch_r_type == 3 && this.repetitive_dates.length > 0 && (Object.keys(this.schedules).length > 0 ? !this.schedules.repetitive_type : true)) {
        total = this.repetitive_dates.length;
        if (this.months[0] == this.month && this.months.length != 1) {
          let count_d = 0;
          this.repetitive_dates.forEach((function(v, k) {
            if (moment(this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment(this.month + "-" + v.value, "YYYY-MM-DD").format("YYYY-MM-DD"))
              count_d = count_d + 1;
          }).bind(this));
          total = count_d;
        }
        if (this.months[this.months.length - 1] == this.month && this.months.length != 1) {
          let count_d = 0;
          this.repetitive_dates.forEach((function(v, k) {
            if (moment(this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment(this.month + "-" + v.value, "YYYY-MM-DD").format("YYYY-MM-DD"))
              count_d = count_d + 1;
          }).bind(this));
          total = count_d;
        }
        if (this.months.length == 1) {
          var a = moment(this.local_start_date, "YYYY-MM-DD").locale("en");
          var b = moment(this.local_end_date, "YYYY-MM-DD").locale("en");
          total = b.diff(a, "days") + 1;
          let count_d = 0;
          this.repetitive_dates.forEach((function(v, k) {
            if (moment(this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment(this.month + "-" + v.value, "YYYY-MM-DD").format("YYYY-MM-DD") && moment(this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment(this.month + "-" + v.value, "YYYY-MM-DD").format("YYYY-MM-DD"))
              count_d = count_d + 1;
          }).bind(this));
          total = count_d;
        }
      }
      if (this.sch_r_type == 2 && this.repetitive_days.length > 0 && (Object.keys(this.schedules).length > 0 ? !this.schedules.repetitive_type : true)) {
        var all_dates = [];
        var i = 1;
        var $_this = this;
        var count = 1;
        total = 0;
        while (i <= count_days) {
          all_dates[i] = moment(this.month + "-" + i, "YYYY-MM-DD").format("YYYY-MM-DD");
          i++;
        }
        all_dates.forEach((function(value, key) {
          $_this.repetitive_days.forEach((function(value1, key1) {
            if (moment(value).format("dddd") == value1.text) {
              if (this.months[0] == this.month && this.months.length != 1) {
                if (moment(this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment(value).locale("en").format("YYYY-MM-DD")) {
                  total = count++;
                }
              } else if (this.months[this.months.length - 1] == this.month && this.months.length != 1) {
                if (moment(this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment(value).locale("en").format("YYYY-MM-DD"))
                  total = count++;
              } else if (this.months.length == 1) {
                if (moment(this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment(value).locale("en").format("YYYY-MM-DD") && moment(this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment(value).locale("en").format("YYYY-MM-DD")) {
                  total = count++;
                }
              } else {
                total = count++;
              }
            }
          }).bind(this));
        }).bind(this));
      }
      if (Object.keys(this.schedules).length > 0) {
        if (this.schedules.repetitive_type == 1 && this.schedules.repetitive_type && this.schedules.repetitive_dates != null) {
          var repetitive_dates = JSON.parse(this.schedules.repetitive_dates.split(","));
          if (this.months[0] == this.month && this.months.length != 1) {
            total = count_days - moment(this.local_start_date, "YYYY-MM-DD").locale("en").format("DD") + 1;
            let count_d = total;
            repetitive_dates.forEach((function(v, k) {
              if (moment(this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment(this.month + "-" + v, "YYYY-MM-DD").format("YYYY-MM-DD")) {
                count_d = count_d - 1;
                total = count_d;
              }
            }).bind(this));
          } else if (this.months[this.months.length - 1] == this.month && this.months.length != 1) {
            total = moment(this.local_end_date, "YYYY-MM-DD").locale("en").format("DD");
            let count_d = total;
            repetitive_dates.forEach((function(v, k) {
              if (moment(this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment(this.month + "-" + v, "YYYY-MM-DD").format("YYYY-MM-DD")) {
                count_d = count_d - 1;
                total = count_d;
              }
            }).bind(this));
          } else if (this.months.length == 1) {
            var a = moment(this.local_start_date, "YYYY-MM-DD").locale("en");
            var b = moment(this.local_end_date, "YYYY-MM-DD").locale("en");
            total = b.diff(a, "days") + 1;
            let count_d = total;
            this.repetitive_dates.forEach((function(v, k) {
              if (moment(this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment(this.month + "-" + v.value, "YYYY-MM-DD").format("YYYY-MM-DD") && moment(this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment(this.month + "-" + v.value, "YYYY-MM-DD").format("YYYY-MM-DD")) {
                count_d = count_d - 1;
                total = count_d;
              }
            }).bind(this));
          } else {
            total = count_days - repetitive_dates.length;
          }
        }
        if (this.schedules.repetitive_type == 3 && this.schedules.repetitive_type && this.schedules.repetitive_dates != null) {
          var repetitive_dates = JSON.parse(this.schedules.repetitive_dates.split(","));
          total = repetitive_dates.length;
          if (this.months[0] == this.month && this.months.length != 1) {
            let count_d = 0;
            repetitive_dates.forEach((function(v, k) {
              if (moment(this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment(this.month + "-" + v, "YYYY-MM-DD").format("YYYY-MM-DD"))
                count_d = count_d + 1;
            }).bind(this));
            total = count_d;
          }
          if (this.months[this.months.length - 1] == this.month && this.months.length != 1) {
            let count_d = 0;
            repetitive_dates.forEach((function(v, k) {
              if (moment(this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment(this.month + "-" + v, "YYYY-MM-DD").format("YYYY-MM-DD"))
                count_d = count_d + 1;
            }).bind(this));
            total = count_d;
          }
          if (this.months.length == 1) {
            var a = moment(this.local_start_date, "YYYY-MM-DD").locale("en");
            var b = moment(this.local_end_date, "YYYY-MM-DD").locale("en");
            total = b.diff(a, "days") + 1;
            let count_d = 0;
            this.repetitive_dates.forEach((function(v, k) {
              if (moment(this.local_start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") <= moment(this.month + "-" + v.value, "YYYY-MM-DD").format("YYYY-MM-DD") && moment(this.local_end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD") >= moment(this.month + "-" + v.value, "YYYY-MM-DD").format("YYYY-MM-DD"))
                count_d = count_d + 1;
            }).bind(this));
            total = count_d;
          }
        }
        if (this.schedules.repetitive_type == 2 && this.schedules.repetitive_type && this.schedules.repetitive_days != null) {
          var all_dates = [];
          var i = 1;
          var $_this = this;
          var count = 1;
          total = 0;
          while (i <= count_days) {
            all_dates[i] = moment(this.month + "-" + i, "YYYY-MM-DD").format("YYYY-MM-DD");
            i++;
          }
          var repetitive_days_temp = this.schedules.repetitive_days.split(",");
          var repetitive_days = [];
          repetitive_days_temp.forEach((function(v, key) {
            if (Number(v) == 1)
              repetitive_days[key] = "Sunday";
            if (Number(v) == 2)
              repetitive_days[key] = "Monday";
            if (Number(v) == 3)
              repetitive_days[key] = "Tuesday";
            if (Number(v) == 4)
              repetitive_days[key] = "Wednesday";
            if (Number(v) == 5)
              repetitive_days[key] = "Thursday";
            if (Number(v) == 6)
              repetitive_days[key] = "Friday";
            if (Number(v) == 7)
              repetitive_days[key] = "Saturday";
          }).bind(this));
          all_dates.forEach((function(value, key) {
            repetitive_days.forEach((function(value1, key1) {
              if (moment(value).locale("en").format("dddd") == value1) {
                if (this.months[0] == this.month && this.months.length != 1) {
                  if (moment(this.local_start_date).format("YYYY-MM-DD") <= moment(value).format("YYYY-MM-DD")) {
                    total = count++;
                  }
                } else if (this.months[this.months.length - 1] == this.month && this.months.length != 1) {
                  if (moment(this.local_end_date).format("YYYY-MM-DD") >= moment(value).format("YYYY-MM-DD"))
                    total = count++;
                } else if (this.months.length == 1) {
                  if (moment(this.local_start_date).format("YYYY-MM-DD") <= moment(value).format("YYYY-MM-DD") && moment(this.local_end_date).format("YYYY-MM-DD") >= moment(value).format("YYYY-MM-DD")) {
                    total = count++;
                  }
                } else {
                  total = count++;
                }
              }
            }).bind(this));
          }).bind(this));
        }
      }
      return total;
    },
    // make date option according to month
    make_date_options() {
      this.repetitive_dates_options = [];
      let month_end_date = moment(this.month).daysInMonth();
      let i = 1;
      for (i = 1; i <= month_end_date; i++) {
        this.repetitive_dates_options.push({ value: i.toString().length == 1 ? "0" + i : i, text: i });
      }
    },
    isDirty() {
      this.add({ is_dirty: true });
    }
  },
  watch: {
    v_repetitive: function() {
      this.updateSchedule();
    },
    sch_r_type: function() {
      this.updateSchedule();
      this.schedules = [];
    },
    repetitive_days: function() {
      this.schedule_total_days();
      this.updateSchedule();
    },
    repetitive_dates: function() {
      this.schedule_total_days();
      this.updateSchedule();
    },
    from_time: function() {
      this.updateSchedule();
    },
    to_time: function() {
      this.updateSchedule();
    },
    // parent component prop data
    start_date: function() {
      this.schedule_total_days();
      this.updateSchedule();
      this.convert_to_local_tz();
    },
    end_date: function() {
      this.schedule_total_days();
      this.updateSchedule();
    },
    // parent start date and it is already to local timezone
    start_date_p: function() {
      this.start_date = this.convert_date_to_local(this.start_date_p);
      this.schedules = [];
      this.convert_to_local_tz();
      this.schedule_total_days();
    },
    // parent end date and it is already to local timezone
    end_date_p: function() {
      this.end_date = this.convert_date_to_local(this.end_date_p);
      this.schedules = [];
      this.convert_to_local_tz();
      this.schedule_total_days();
    },
    // parent start time and it is already to local timezone
    start_time_p: function() {
      this.start_time = this.start_time_p;
      this.convert_to_local_tz();
    },
    // parent end time and it is already to local timezone
    end_time_p: function() {
      this.end_time = this.end_time_p;
      this.convert_to_local_tz();
    },
    // updates total days and schedule
    months: function() {
      this.convert_to_local_tz();
      this.schedule_total_days();
      this.updateSchedule();
      this.make_date_options();
    }
  },
  mounted() {
    this.make_date_options();
    this.selectedTimes();
    this.editSchedule();
  }
};
var _sfc_render$6 = function render7() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "schedule-row mb-3" }, [_c("div", { staticClass: "row mb-2" }, [_c("div", { staticClass: "col-md-12" }, [_c("div", { staticClass: "badge bg-primary d-flex p-2 fs-6" }, [_vm._v(" #" + _vm._s(_vm.sch_index + 1) + "  "), _c("span", [_vm._v(_vm._s(_vm.moment(_vm.month, "YYYY-MM").format("MMMM")) + " " + _vm._s(_vm.trans("em.schedule")) + " ")])])])]), _c("div", { staticClass: "row" }, [_vm.sch_r_type == 2 ? _c("div", { staticClass: "col-md-12" }, [_c("div", { staticClass: "form-group mb-2" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.repetitive_days")))]), _c("multiselect", { class: "form-control px-0 py-0 border-0", attrs: { "options": _vm.repetitive_days_options, "placeholder": _vm.trans("em.select_days"), "label": "text", "track-by": "value", "multiple": true, "close-on-select": false, "clear-on-select": false, "hide-selected": false, "preserve-search": true, "preselect-first": _vm.schedules ? false : true, "allow-empty": true, "disabled": _vm.sch_r_type == 3 || _vm.sch_r_type == 1 ? true : false }, on: { "input": function($event) {
    _vm.schedules ? _vm.schedules.repetitive_type = null : "";
  }, "select": function($event) {
    return _vm.isDirty();
  } }, model: { value: _vm.repetitive_days, callback: function($$v) {
    _vm.repetitive_days = $$v;
  }, expression: "repetitive_days" } })], 1)]) : _vm._e(), _vm.sch_r_type == 3 || _vm.sch_r_type == 1 ? _c("div", { staticClass: "col-md-12" }, [_c("div", { staticClass: "form-group mb-2" }, [_vm.sch_r_type == 3 ? _c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.repetitive_dates")) + " (" + _vm._s(_vm.trans("em.repeats_on")) + ")")]) : _vm._e(), _vm.sch_r_type == 1 ? _c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.repetitive_dates")) + " (" + _vm._s(_vm.trans("em.repeats_except")) + ")")]) : _vm._e(), _c("multiselect", { class: "form-control px-0 py-0 border-0", attrs: { "options": _vm.repetitive_dates_options, "placeholder": _vm.trans("em.select_dates"), "label": "text", "track-by": "value", "multiple": true, "close-on-select": false, "clear-on-select": false, "hide-selected": false, "preserve-search": true, "preselect-first": _vm.schedules ? false : true, "allow-empty": true, "disabled": _vm.sch_r_type == 2 ? true : false }, on: { "input": function($event) {
    _vm.schedules ? _vm.schedules.repetitive_type = null : "";
  }, "select": function($event) {
    return _vm.isDirty();
  } }, model: { value: _vm.repetitive_dates, callback: function($$v) {
    _vm.repetitive_dates = $$v;
  }, expression: "repetitive_dates" } })], 1)]) : _vm._e(), _c("div", { staticClass: "col-xs-12 col-sm-6 col-md-6" }, [_c("div", { staticClass: "form-group" }, [_c("label", { staticClass: "form-label", attrs: { "for": "from_time" } }, [_vm._v(_vm._s(_vm.trans("em.start_time")))]), _c("br"), _c("date-picker", { staticClass: "form-control", attrs: { "type": "time", "format": "HH:mm", "placeholder": _vm.trans("em.select_start_time"), "lang": _vm.$vue2_datepicker_lang }, on: { "change": function($event) {
    return _vm.isDirty();
  } }, model: { value: _vm.from_time, callback: function($$v) {
    _vm.from_time = $$v;
  }, expression: "from_time" } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("end_time"), expression: "errors.has('end_time')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("from_time")))])], 1)]), _c("div", { staticClass: "col-xs-12 col-sm-6 col-md-6" }, [_c("div", { staticClass: "form-group" }, [_c("label", { staticClass: "form-label", attrs: { "for": "to_time" } }, [_vm._v(_vm._s(_vm.trans("em.end_time")))]), _c("br"), _c("date-picker", { staticClass: "form-control", attrs: { "type": "time", "format": "HH:mm", "placeholder": _vm.trans("em.select_end_time"), "lang": _vm.$vue2_datepicker_lang }, on: { "change": function($event) {
    return _vm.isDirty();
  } }, model: { value: _vm.to_time, callback: function($$v) {
    _vm.to_time = $$v;
  }, expression: "to_time" } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("to_time"), expression: "errors.has('to_time')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("to_time")))])], 1)])]), _c("div", { staticClass: "row mt-3" }, [_vm.sch_r_type && Object.keys(_vm.schedules).length > 0 ? _c("div", { staticClass: "col-md-12" }, [_c("div", { staticClass: "alert alert-primary" }, [_c("p", { staticClass: "text-primary fw-bold" }, [_vm._v(" " + _vm._s(_vm.trans("em.start")) + ": " + _vm._s(_vm.moment(_vm.months[0], "YYYY-MM").isSame(_vm.moment(_vm.month, "YYYY-MM")) ? _vm.changeDateFormat(_vm.convert_date_to_local(_vm.local_start_date), "YYYY-MM-DD") : _vm.changeDateFormat(_vm.moment(_vm.month, "YYYY-MM").startOf("month").format("YYYY-MM-DD hh:mm"), "YYYY-MM-DD")) + "  |  " + _vm._s(_vm.trans("em.end")) + ": " + _vm._s(_vm.moment(_vm.months[_vm.months.length - 1], "YYYY-MM").isSame(_vm.moment(_vm.month, "YYYY-MM")) ? _vm.changeDateFormat(_vm.convert_date_to_local(_vm.local_end_date), "YYYY-MM-DD") : _vm.changeDateFormat(_vm.moment(_vm.month, "YYYY-MM").endOf("month").format("YYYY-MM-DD hh:mm"), "YYYY-MM-DD")) + " ")]), _c("hr"), (_vm.schedules_p != void 0 ? _vm.schedules_p.from_time != null && _vm.schedules_p.to_time != null || _vm.from_time != "Invalid Date" && _vm.to_time != "Invalid Date" && _vm.from_time != null && _vm.to_time != null : true) && (_vm.from_time != "Invalid Date" && _vm.to_time != "Invalid Date" && _vm.from_time != null && _vm.to_time != null) ? _c("p", { staticClass: "mb-0" }, [_c("strong", [_vm._v(_vm._s(_vm.trans("em.duration")) + " ")]), _vm._v(" " + _vm._s(_vm.schedule_total_days() + (_vm.schedule_total_days() > 1 ? " " + _vm.trans("em.days") : " " + _vm.trans("em.day"))) + "  |  " + _vm._s(_vm.counthours(_vm.from_time, _vm.to_time, true) + (_vm.counthours(_vm.from_time, _vm.to_time, true) > 1 ? " " + _vm.trans("em.hours") : " " + _vm.trans("em.hour"))) + " " + _vm._s(_vm.trans("em.each_day")) + " ")]) : _c("p", { staticClass: "mb-0" }, [_c("strong", [_vm._v(_vm._s(_vm.trans("em.duration")) + " ")]), _vm._v(" " + _vm._s("0 " + _vm.trans("em.day")) + "  |  " + _vm._s("0 " + _vm.trans("em.hour")) + " " + _vm._s(_vm.trans("em.each_day")) + " ")])])]) : _vm._e(), Object.keys(_vm.schedules).length <= 0 && _vm.check_date(_vm.start_date) && _vm.check_date(_vm.end_date) && _vm.check_time(_vm.start_time) && _vm.check_time(_vm.end_time) ? _c("div", { staticClass: "col-md-12" }, [_c("div", { staticClass: "alert alert-primary" }, [_c("p", { staticClass: "text-primary fw-bold" }, [_vm._v(" " + _vm._s(_vm.trans("em.start")) + ": " + _vm._s(_vm.moment(_vm.months[0], "YYYY-MM").isSame(_vm.moment(_vm.month, "YYYY-MM")) ? _vm.changeDateFormat(_vm.convert_date_to_local(_vm.local_start_date), "YYYY-MM-DD") : _vm.changeDateFormat(_vm.moment(_vm.month, "YYYY-MM").startOf("month").format("YYYY-MM-DD hh:mm"), "YYYY-MM-DD")) + "  |  " + _vm._s(_vm.trans("em.end")) + " " + _vm._s(_vm.moment(_vm.months[_vm.months.length - 1], "YYYY-MM").isSame(_vm.moment(_vm.month, "YYYY-MM")) ? _vm.changeDateFormat(_vm.convert_date_to_local(_vm.local_end_date), "YYYY-MM-DD") : _vm.changeDateFormat(_vm.moment(_vm.month, "YYYY-MM").endOf("month").format("YYYY-MM-DD hh:mm"), "YYYY-MM-DD")) + " ")]), _c("hr"), (_vm.schedules_p != void 0 ? _vm.schedules_p.from_time != null && _vm.schedules_p.to_time != null || _vm.from_time != "Invalid Date" && _vm.to_time != "Invalid Date" && _vm.from_time != null && _vm.to_time != null : true) && (_vm.from_time != "Invalid Date" && _vm.to_time != "Invalid Date" && _vm.from_time != null && _vm.to_time != null) ? _c("p", { staticClass: "mb-0" }, [_c("strong", [_vm._v(_vm._s(_vm.trans("em.duration")) + " ")]), _vm._v(" " + _vm._s(_vm.schedule_total_days() + (_vm.schedule_total_days() > 1 ? " " + _vm.trans("em.days") : " " + _vm.trans("em.day"))) + "   |   " + _vm._s(_vm.counthours(_vm.from_time, _vm.to_time, true) + (_vm.counthours(_vm.from_time, _vm.to_time, true) > 1 ? " " + _vm.trans("em.hours") : " " + _vm.trans("em.hour"))) + " " + _vm._s(_vm.trans("em.each_day")) + " ")]) : _c("p", { staticClass: "mb-0" }, [_c("strong", [_vm._v(_vm._s(_vm.trans("em.duration")) + " ")]), _vm._v(" " + _vm._s("0 " + _vm.trans("em.day")) + "   |   " + _vm._s("0 " + _vm.trans("em.hour")) + " " + _vm._s(_vm.trans("em.each_day")) + " ")])])]) : _vm._e()])]);
};
var _sfc_staticRenderFns$6 = [];
var __component__$6 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$6,
  _sfc_render$6,
  _sfc_staticRenderFns$6,
  false,
  null,
  null
);
const ScheduleComponent = __component__$6.exports;
const _sfc_main$5 = {
  props: [
    "server_timezone"
  ],
  mixins: [
    mixinsFilters
  ],
  components: {
    ScheduleComponent
  },
  data() {
    return {
      schedules: [],
      moment,
      // local variable
      calculate_months: [],
      r_type: null,
      // important!!! declare all form fields
      start_time: null,
      end_time: null,
      start_date: null,
      end_date: null,
      repetitive: 0,
      merge_schedule: 0,
      repetitive_type: [],
      repetitive_type_options: [
        { value: 1, text: trans("em.daily") },
        { value: 2, text: trans("em.weekly") },
        { value: 3, text: trans("em.monthly") }
      ],
      //local timezone
      local_start_date: null,
      local_end_date: null,
      local_start_time: null,
      local_end_time: null,
      // for merge schedule
      repetitive_type_temp: 0
    };
  },
  computed: {
    // get global variables
    ...mapState(["event_id", "v_repetitive", "v_repetitive_days", "v_repetitive_dates", "v_from_time", "v_to_time", "organiser_id", "event", "is_dirty"])
  },
  methods: {
    // update global variables
    ...mapMutations(["add", "update"]),
    // reset form and close modal
    close: function() {
      this.$refs.form.reset();
    },
    // reset schedule data on check box and repetitive type
    reset_schedule() {
      this.add({
        v_repetitive: this.repetitive
      });
    },
    event_type() {
      this.r_type = this.repetitive_type ? this.repetitive_type.value : this.r_type;
    },
    // getSchedule
    getSchedule() {
      let post_url = route("eventmie.schedules");
      let post_data = {
        "event_id": this.event_id,
        "organiser_id": this.organiser_id
      };
      axios.post(post_url, post_data).then((res) => {
        this.schedules = res.data.schedules;
        this.repetitive = this.event.repetitive;
        this.merge_schedule = this.event.merge_schedule <= 0 ? false : true;
        this.repetitive_type.push(this.repetitive_type_options[this.schedules[0].repetitive_type - 1]);
        this.r_type = this.repetitive_type[0].value;
        var _this = this;
        if (this.schedules.length > 0) {
          this.calculate_months = [];
          this.schedules.forEach(function(value, key) {
            _this.calculate_months[key] = moment(value["from_date"], "YYYY-MM-DD").format("YYYY-MM");
          });
        }
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    editEvent() {
      this.convert_to_local_tz();
      this.start_date = this.setDateTime(this.local_start_date);
      this.end_date = this.setDateTime(this.local_end_date);
      this.start_time = this.setDateTime(this.local_start_time);
      this.end_time = this.setDateTime(this.local_end_time);
      if (this.event.repetitive == 1 && this.event_id) {
        this.getSchedule();
        this.repetitive_type_temp = this.event.repetitive_type;
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
    // make server side date with help of number then again convert server side date to number
    convertToServerDate(data) {
      var data = data;
      var v_repetitive_dates = [];
      var date_number;
      var count;
      data.forEach((function(value, key) {
        if (value == null) {
          v_repetitive_dates[key] = null;
          return v_repetitive_dates;
        }
        v_repetitive_dates[key] = [];
        date_number = value.split(",");
        count = date_number.length;
        if (Object.keys(date_number).length > 0) {
          date_number.forEach((function(date_number2, key1) {
            v_repetitive_dates[key] += moment(this.dateToFullDate(date_number2, this.calculate_months[key]), "dddd LL").locale("en").format("DD");
            if (key1 < count - 1)
              v_repetitive_dates[key] += ",";
          }).bind(this));
        }
      }).bind(this));
      return v_repetitive_dates;
    },
    // submit form
    formSubmit(event) {
      var schedule_ids = [];
      if (this.schedules.length > 0) {
        this.schedules.forEach(function(value, key) {
          schedule_ids[key] = value.id;
        });
      }
      var v_repetitive_dates = [];
      var v_repetitive_days = [];
      if (this.v_repetitive_dates.length > 0) {
        v_repetitive_dates = this.convertToServerDate(this.v_repetitive_dates);
      }
      if (this.v_repetitive_days.length > 0)
        v_repetitive_days = this.convertToServerDate(this.v_repetitive_days);
      let post_url = route("eventmie.myevents_store_timing");
      let post_data = {
        // start_date
        "start_date": moment(this.start_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD"),
        "end_date": moment(this.end_date, "YYYY-MM-DD").locale("en").format("YYYY-MM-DD"),
        "start_time": moment(this.start_time).locale("en").format("HH:mm:ss"),
        "end_time": moment(this.end_time).locale("en").format("HH:mm:ss"),
        "repetitive": Number(this.repetitive),
        "merge_schedule": Number(this.merge_schedule),
        "repetitive_type": this.r_type,
        // schedule data (vuex data)
        "repetitive_days": v_repetitive_days,
        "repetitive_dates": v_repetitive_dates,
        "from_time": this.v_from_time,
        "to_time": this.v_to_time,
        "event_id": this.event_id,
        "organiser_id": this.organiser_id,
        "schedule_ids": schedule_ids
      };
      axios.post(post_url, post_data).then((res) => {
        if (res.data.status) {
          this.showNotification("success", trans("em.timings") + " " + trans("em.event_save_success"));
        }
        setTimeout(function() {
          location.reload(true);
        }, 1e3);
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    //calculate months between two dates
    calculateMonth() {
      this.add({
        v_repetitive_days: [],
        v_repetitive_dates: [],
        v_from_time: [],
        v_to_time: []
      });
      if (this.check_date(this.start_date) && this.check_date(this.end_date))
        this.calculate_months = this.countMonth(this.start_date, this.end_date);
    },
    // server time convert into local timezone
    convert_to_local_tz() {
      this.local_start_date = this.userTimezone(this.event.start_date + " " + this.event.start_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
      this.local_end_date = this.userTimezone(this.event.end_date + " " + this.event.end_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD");
      this.local_start_time = this.userTimezone(this.event.start_date + " " + this.event.start_time, "YYYY-MM-DD HH:mm:ss");
      this.local_end_time = this.userTimezone(this.event.end_date + " " + this.event.end_time, "YYYY-MM-DD HH:mm:ss");
    },
    // check valid date 
    validDate() {
      var status = false;
      if (this.userTimezone(this.event.start_date + " " + this.event.start_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD") != moment(this.start_date).format("YYYY-MM-DD")) {
        if (this.repetitive && this.check_date(this.start_date) && this.check_date(this.end_date) && this.check_time(this.start_time) && this.check_time(this.end_time) && !moment(this.start_date).isSame(this.moment(this.end_date), "date") && moment(this.start_date).format("YYYY-MM-DD") >= moment().format("YYYY-MM-DD") && moment(this.start_date).format("YYYY-MM-DD") < moment(this.end_date).format("YYYY-MM-DD")) {
          status = true;
        } else {
          this.repetitive = 0;
          this.merge_schedule = 0;
          status = false;
        }
      } else {
        status = true;
      }
      if (!this.repetitive || this.repetitive == 0) {
        this.repetitive = 0;
        this.merge_schedule = 0;
        status = false;
      }
      return status;
    },
    // edit date validation
    editDateValidation() {
      if (this.userTimezone(this.event.start_date + " " + this.event.start_time, "YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DD") != moment(this.start_date).format("YYYY-MM-DD")) {
        if (moment(this.start_date).format("YYYY-MM-DD") <= moment().format("YYYY-MM-DD") || moment(this.start_date).format("YYYY-MM-DD") > moment(this.end_date).format("YYYY-MM-DD")) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    isDirty() {
      this.add({ is_dirty: true });
    },
    isDirtyReset() {
      this.add({ is_dirty: false });
    }
  },
  watch: {
    start_date: function() {
      this.calculateMonth();
      this.schedules = [];
      if (this.local_start_date != this.convert_date(this.start_date)) {
        this.isDirty();
      }
    },
    end_date: function() {
      this.calculateMonth();
      if (this.local_end_date != this.convert_date(this.end_date)) {
        this.isDirty();
      }
    },
    start_time: function() {
      if (this.event.start_time != this.convert_time(this.start_time)) {
        this.isDirty();
      }
    },
    end_time: function() {
      if (this.event.end_time != this.convert_time(this.end_time)) {
        this.isDirty();
      }
    },
    repetitive: function() {
      this.reset_schedule();
    },
    r_type: function() {
      this.reset_schedule();
    },
    repetitive_type: function() {
      if (this.repetitive_type) {
        if (this.repetitive_type.value == 1)
          this.merge_schedule = 0;
        if (this.repetitive_type.value == 2 || this.repetitive_type.value == 3)
          this.repetitive_type_temp = 0;
      }
    }
  },
  mounted() {
    this.isDirtyReset();
    let event_step = this.eventStep();
    if (event_step) {
      var $this = this;
      this.getMyEvent().then(function(response) {
        if (Object.keys($this.event).length)
          $this.editEvent();
      });
    }
  }
};
var _sfc_render$5 = function render8() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("form", { ref: "form", staticClass: "lgx-contactform", attrs: { "method": "POST", "enctype": "multipart/form-data" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.event_id, expression: "event_id" }], attrs: { "type": "hidden", "name": "event_id" }, domProps: { "value": _vm.event_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.event_id = $event.target.value;
  } } }), _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-xs-12 col-sm-4 col-md-6" }, [_c("div", { staticClass: "form-group mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "start_date" } }, [_vm._v(_vm._s(_vm.trans("em.start_date")))]), _c("date-picker", { staticClass: "form-control", attrs: { "type": "date", "format": "YYYY-MM-DD", "placeholder": _vm.trans("em.start_date"), "lang": _vm.$vue2_datepicker_lang }, model: { value: _vm.start_date, callback: function($$v) {
    _vm.start_date = $$v;
  }, expression: "start_date" } }), _c("input", { directives: [{ name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control", attrs: { "type": "hidden", "name": "start_date" }, domProps: { "value": _vm.convert_date(_vm.start_date) } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("start_date"), expression: "errors.has('start_date')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("start_date")))])], 1)]), _c("div", { staticClass: "col-xs-12 col-sm-4 col-md-6" }, [_c("div", { staticClass: "form-group mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "start_time" } }, [_vm._v(_vm._s(_vm.trans("em.start_time")))]), _c("date-picker", { staticClass: "form-control", attrs: { "type": "time", "format": "HH:mm", "placeholder": _vm.trans("em.start_time"), "lang": _vm.$vue2_datepicker_lang }, model: { value: _vm.start_time, callback: function($$v) {
    _vm.start_time = $$v;
  }, expression: "start_time" } }), _c("input", { directives: [{ name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control", attrs: { "type": "hidden", "name": "start_time" }, domProps: { "value": _vm.convert_time(_vm.start_time) } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("start_time"), expression: "errors.has('start_time')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("start_time")))])], 1)]), _c("div", { staticClass: "col-xs-12 col-sm-4 col-md-6" }, [_c("div", { staticClass: "form-group mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "end_date" } }, [_vm._v(_vm._s(_vm.trans("em.end_date")))]), _c("date-picker", { staticClass: "form-control", attrs: { "type": "date", "format": "YYYY-MM-DD", "placeholder": _vm.trans("em.end_date"), "lang": _vm.$vue2_datepicker_lang }, model: { value: _vm.end_date, callback: function($$v) {
    _vm.end_date = $$v;
  }, expression: "end_date" } }), _c("input", { directives: [{ name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control", attrs: { "type": "hidden", "name": "end_date" }, domProps: { "value": _vm.convert_date(_vm.end_date) } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("end_date"), expression: "errors.has('end_date')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("end_date")))])], 1)]), _c("div", { staticClass: "col-xs-12 col-sm-4 col-md-6" }, [_c("div", { staticClass: "form-group mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "end_time" } }, [_vm._v(_vm._s(_vm.trans("em.end_time")))]), _c("date-picker", { staticClass: "form-control", attrs: { "type": "time", "format": "HH:mm", "placeholder": _vm.trans("em.end_time"), "lang": _vm.$vue2_datepicker_lang }, model: { value: _vm.end_time, callback: function($$v) {
    _vm.end_time = $$v;
  }, expression: "end_time" } }), _c("input", { directives: [{ name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control", attrs: { "type": "hidden", "name": "end_time" }, domProps: { "value": _vm.convert_time(_vm.end_time) } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("end_time"), expression: "errors.has('end_time')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("end_time")))])], 1)])]), _vm.editDateValidation() ? _c("div", { staticClass: "alert alert-danger" }, [_c("span", { staticClass: "text-danger" }, [_vm._v(" " + _vm._s(_vm.trans("em.date_info")))])]) : _vm._e(), _c("div", { staticClass: "row" }, [!_vm.repetitive && _vm.check_date(_vm.start_date) && _vm.check_date(_vm.end_date) && _vm.check_time(_vm.start_time) && _vm.check_time(_vm.end_time) ? _c("div", { staticClass: "col-12" }, [_c("div", { staticClass: "alert alert-primary" }, [_c("p", { staticClass: "text-primary fw-bold" }, [_vm._v(" " + _vm._s(_vm.trans("em.start")) + ": " + _vm._s(_vm.changeDateFormat(_vm.start_date, "YYYY-MM-DD")) + "  |  " + _vm._s(_vm.trans("em.end")) + ": " + _vm._s(_vm.changeDateFormat(_vm.end_date, "YYYY-MM-DD")) + " ")]), _c("hr"), _c("p", { staticClass: "mb-0" }, [_c("strong", [_vm._v(_vm._s(_vm.trans("em.duration")) + " ")]), _vm._v(" " + _vm._s(_vm.countDays(_vm.start_date, _vm.end_date) + (_vm.countDays(_vm.start_date, _vm.end_date) > 1 ? " days" : " day")) + "  |  " + _vm._s(_vm.counthours(_vm.moment(_vm.start_date).format("YYYY-MM-DD") + " " + _vm.moment(_vm.start_time).format("HH:mm:ss "), _vm.moment(_vm.end_date).format("YYYY-MM-DD") + " " + _vm.moment(_vm.end_time).format("HH:mm:ss ")) + (_vm.counthours(_vm.moment(_vm.start_date).format("YYYY-MM-DD") + " " + _vm.moment(_vm.start_time).format("HH:mm:ss "), _vm.moment(_vm.end_date).format("YYYY-MM-DD") + " " + _vm.moment(_vm.end_time).format("HH:mm:ss ")) > 1 ? " hours" : " hour")) + " ")])])]) : _vm._e()]), _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-md-6" }, [_c("div", { staticClass: "d-flex justify-content-between px-0 mb-3" }, [_c("div", [_c("h5", { staticClass: "mb-0" }, [_vm._v(_vm._s(_vm.trans("em.add_repetitive_schedules")))]), _c("span", { staticClass: "small text-muted text-wrap" }, [_vm._v(_vm._s(_vm.trans("em.add_repetitive_schedules_ie")))])]), _c("div", [_c("div", { staticClass: "form-check form-switch" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.repetitive, expression: "repetitive" }], staticClass: "form-check-input form-check-input-lg", attrs: { "type": "checkbox", "id": "repetitive", "name": "repetitive", "value": "1" }, domProps: { "checked": Array.isArray(_vm.repetitive) ? _vm._i(_vm.repetitive, "1") > -1 : _vm.repetitive }, on: { "change": [function($event) {
    var $$a = _vm.repetitive, $$el = $event.target, $$c = $$el.checked ? true : false;
    if (Array.isArray($$a)) {
      var $$v = "1", $$i = _vm._i($$a, $$v);
      if ($$el.checked) {
        $$i < 0 && (_vm.repetitive = $$a.concat([$$v]));
      } else {
        $$i > -1 && (_vm.repetitive = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
      }
    } else {
      _vm.repetitive = $$c;
    }
  }, function($event) {
    return _vm.isDirty();
  }] } }), _c("label", { staticClass: "form-check-label", attrs: { "for": "repetitive" } })])])])]), _c("div", { staticClass: "col-md-6" }, [_vm.repetitive && _vm.repetitive_type.value != 1 && _vm.repetitive_type_temp != 1 ? _c("div", { staticClass: "d-flex justify-content-between px-0 mb-3" }, [_c("div", [_c("h5", { staticClass: "mb-0" }, [_vm._v(_vm._s(_vm.trans("em.seasonal_tickets")))]), _c("span", { staticClass: "small text-muted text-wrap" }, [_vm._v(_vm._s(_vm.trans("em.seasonal_tickets_ie")))])]), _c("div", [_c("div", { staticClass: "form-check form-switch" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.merge_schedule, expression: "merge_schedule" }], staticClass: "form-check-input form-check-input-lg", attrs: { "type": "checkbox", "id": "merge_schedule", "name": "merge_schedule", "value": "1" }, domProps: { "checked": Array.isArray(_vm.merge_schedule) ? _vm._i(_vm.merge_schedule, "1") > -1 : _vm.merge_schedule }, on: { "change": [function($event) {
    var $$a = _vm.merge_schedule, $$el = $event.target, $$c = $$el.checked ? true : false;
    if (Array.isArray($$a)) {
      var $$v = "1", $$i = _vm._i($$a, $$v);
      if ($$el.checked) {
        $$i < 0 && (_vm.merge_schedule = $$a.concat([$$v]));
      } else {
        $$i > -1 && (_vm.merge_schedule = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
      }
    } else {
      _vm.merge_schedule = $$c;
    }
  }, function($event) {
    return _vm.isDirty();
  }] } }), _c("label", { staticClass: "form-check-label", attrs: { "for": "merge_schedule" } })])])]) : _vm._e()]), _c("div", { staticClass: "col-md-6" }, [_vm.repetitive ? _c("div", { staticClass: "form-group mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.repetitive_type")))]), _c("multiselect", { class: "form-control px-0 py-0 border-0", attrs: { "options": _vm.repetitive_type_options, "placeholder": "-- " + _vm.trans("em.select_repetitive_type"), "label": "text", "track-by": "value", "multiple": false, "close-on-select": true, "clear-on-select": false, "hide-selected": false, "preserve-search": true, "preselect-first": true, "allow-empty": false }, on: { "input": _vm.event_type, "select": function($event) {
    return _vm.isDirty();
  } }, model: { value: _vm.repetitive_type, callback: function($$v) {
    _vm.repetitive_type = $$v;
  }, expression: "repetitive_type" } })], 1) : _vm._e()]), _vm.repetitive && _vm.repetitive_type.value != 1 && _vm.repetitive_type_temp != 1 ? _c("div", { staticClass: "col-md-6" }, [_vm.merge_schedule <= 0 ? _c("div", { staticClass: "alert alert-primary mt-md-5 p-2 small" }, [_c("i", { staticClass: "fas fa-info" }), _vm._v(" " + _vm._s(_vm.trans("em.merge_false")))]) : _vm._e(), _vm.merge_schedule > 0 ? _c("div", { staticClass: "alert alert-primary mt-md-5 p-2 small" }, [_c("i", { staticClass: "fas fa-info" }), _vm._v(" " + _vm._s(_vm.trans("em.merge_true")))]) : _vm._e()]) : _vm._e()]), _vm.validDate() ? _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-md-12" }, _vm._l(_vm.calculate_months, function(item, index2) {
    return _c("div", { key: index2 }, [_c("schedule-component", { attrs: { "sch_index": index2, "sch_r_type": _vm.r_type, "start_time_p": _vm.start_time, "end_time_p": _vm.end_time, "start_date_p": _vm.start_date, "end_date_p": _vm.end_date, "schedules_p": _vm.schedules.length ? _vm.schedules[index2] : [], "month": _vm.calculate_months.length > 0 ? _vm.calculate_months[index2] : 0, "months": _vm.calculate_months.length > 0 ? _vm.calculate_months : 0 } })], 1);
  }), 0)]) : _vm._e(), _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-md-12" }, [_c("button", { staticClass: "btn btn-primary mt-2 btn-lg", attrs: { "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")))])])])])]);
};
var _sfc_staticRenderFns$5 = [];
var __component__$5 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false,
  null,
  null
);
const Timing = __component__$5.exports;
const _sfc_main$4 = {
  props: ["edit_ticket", "taxes", "currency", "openModal_1", "openModal_2"],
  mixins: [
    mixinsFilters
  ],
  data() {
    return {
      title: null,
      price: null,
      quantity: null,
      description: null,
      tax_id: 0,
      // for taxes
      taxes_ids: [],
      taxes_options: [],
      tmp_taxes_ids: [],
      selected_taxes: [],
      customer_limit: null
    };
  },
  computed: {
    // get global variables
    ...mapState(["tickets", "event_id", "organiser_id"])
  },
  methods: {
    // update global variables
    ...mapMutations(["add", "update"]),
    // reset form and close modal
    close: function() {
      this.$parent.edit_index = null;
      this.$parent.openModal_1 = false;
      this.$parent.openModal_2 = false;
    },
    editTicket() {
      this.title = this.edit_ticket.title;
      this.price = this.edit_ticket.price;
      this.quantity = this.edit_ticket.quantity;
      this.description = this.edit_ticket.description;
      this.tax_id = this.edit_ticket.tax_id ? this.edit_ticket.tax_id : 0;
      this.customer_limit = this.edit_ticket.customer_limit;
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
      let post_url = route("eventmie.tickets_store");
      let post_data = new FormData(this.$refs.form);
      axios.post(post_url, post_data).then((res) => {
        if (res.data.status) {
          this.showNotification("success", trans("em.ticket") + " " + trans("em.saved") + " " + trans("em.successfully"));
          this.close();
          setTimeout(function() {
            location.reload(true);
          }, 1e3);
        }
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    updateItem() {
      this.$emit("changeItem");
    },
    // set taxes options
    setTaxesOptions() {
      let tax_type = "";
      let tax_net_price = "";
      if (Object.keys(this.taxes).length > 0) {
        this.taxes.forEach((function(v, key) {
          tax_type = v.rate_type == "percent" ? "%" : " " + this.currency;
          tax_net_price = v.net_price == "excluding" ? trans("em.exclusive") : trans("em.inclusive");
          this.taxes_options.push({ value: v.id, text: v.title + " (" + v.rate + tax_type + " " + tax_net_price + ")" });
        }).bind(this));
      }
    },
    // show selected taxes
    setSelcetedTaxes() {
      let tax_type = "";
      let tax_net_price = "";
      if (Object.keys(this.edit_ticket.taxes).length > 0) {
        this.tmp_taxes_ids = [];
        this.edit_ticket.taxes.forEach((function(v, key) {
          tax_type = v.rate_type == "percent" ? "%" : " " + this.currency;
          tax_net_price = v.net_price == "excluding" ? trans("em.exclusive") : trans("em.inclusive");
          this.tmp_taxes_ids.push({ value: v.id, text: v.title + " (" + v.rate + tax_type + " " + tax_net_price + ")" });
        }).bind(this));
      }
    },
    // update taxes for submit
    updateTaxes() {
      this.taxes_ids = [];
      if (Object.keys(this.tmp_taxes_ids).length > 0) {
        this.tmp_taxes_ids.forEach((function(value, key) {
          this.taxes_ids[key] = value.value;
        }).bind(this));
        this.taxes_ids = JSON.stringify(this.taxes_ids);
      }
    }
  },
  mounted() {
    if (this.edit_ticket) {
      this.editTicket();
      this.setSelcetedTaxes();
    }
    this.setTaxesOptions();
  },
  watch: {
    tmp_taxes_ids: function() {
      this.updateTaxes();
    }
  }
};
var _sfc_render$4 = function render9() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "custom_model" }, [_vm.openModal_1 || _vm.openModal_2 ? _c("div", { staticClass: "modal show" }, [_c("div", { staticClass: "modal-dialog modal-lg w-100" }, [_c("div", { staticClass: "modal-content" }, [_c("div", { staticClass: "modal-header" }, [_c("h1", { staticClass: "modal-title fs-3", attrs: { "id": "exampleModalLabel" } }, [_vm._v(_vm._s(_vm.edit_ticket ? _vm.trans("em.update") : _vm.trans("em.create")) + " " + _vm._s(_vm.trans("em.ticket")))]), _c("button", { staticClass: "btn btn-sm bg-danger text-white close", attrs: { "type": "button", "data-bs-dismiss": "modal", "aria-label": "Close" }, on: { "click": function($event) {
    return _vm.close();
  } } }, [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])])]), _c("div", { staticClass: "modal-body" }, [_c("form", { ref: "form", attrs: { "method": "POST", "enctype": "multipart/form-data" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_vm.edit_ticket ? _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.edit_ticket.id, expression: "edit_ticket.id" }], staticClass: "form-control lgxname", attrs: { "type": "hidden", "name": "ticket_id" }, domProps: { "value": _vm.edit_ticket.id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.$set(_vm.edit_ticket, "id", $event.target.value);
  } } }) : _vm._e(), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.event_id, expression: "event_id" }], staticClass: "form-control lgxname", attrs: { "type": "hidden", "name": "event_id" }, domProps: { "value": _vm.event_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.event_id = $event.target.value;
  } } }), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.organiser_id, expression: "organiser_id" }], staticClass: "form-control lgxname", attrs: { "type": "hidden", "name": "organiser_id" }, domProps: { "value": _vm.organiser_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.organiser_id = $event.target.value;
  } } }), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.taxes_ids, expression: "taxes_ids" }], staticClass: "form-control lgxname", attrs: { "type": "hidden", "name": "taxes_ids" }, domProps: { "value": _vm.taxes_ids }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.taxes_ids = $event.target.value;
  } } }), _c("div", { staticClass: "modal-body" }, [_c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "title" } }, [_vm._v(_vm._s(_vm.trans("em.title")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.title, expression: "title" }, { name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "title" }, domProps: { "value": _vm.title }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.title = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("title"), expression: "errors.has('title')" }], staticClass: "small text-danger" }, [_vm._v(_vm._s(_vm.errors.first("title")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "price" } }, [_vm._v(_vm._s(_vm.trans("em.price")) + " (" + _vm._s(_vm.currency) + ")")]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.price, expression: "price" }, { name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "price" }, domProps: { "value": _vm.price }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.price = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("price"), expression: "errors.has('price')" }], staticClass: "small text-danger" }, [_vm._v(_vm._s(_vm.errors.first("price")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "quantity" } }, [_vm._v(_vm._s(_vm.trans("em.max_ticket_qty")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.quantity, expression: "quantity" }, { name: "validate", rawName: "v-validate", value: "required", expression: "'required'" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "quantity" }, domProps: { "value": _vm.quantity }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.quantity = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("quantity"), expression: "errors.has('quantity')" }], staticClass: "small text-danger" }, [_vm._v(_vm._s(_vm.errors.first("quantity")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "customer_limit" } }, [_vm._v(_vm._s(_vm.trans("em.customer_limit")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.customer_limit, expression: "customer_limit" }], staticClass: "form-control lgxname", attrs: { "type": "text", "name": "customer_limit" }, domProps: { "value": _vm.customer_limit }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.customer_limit = $event.target.value;
  } } }), _c("span", { staticClass: "small text-muted" }, [_vm._v(_vm._s(_vm.trans("em.customer_limit_info")))]), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("customer_limit"), expression: "errors.has('customer_limit')" }], staticClass: "small text-danger" }, [_vm._v(_vm._s(_vm.errors.first("customer_limit")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label", attrs: { "for": "description" } }, [_vm._v(_vm._s(_vm.trans("em.description")))]), _c("textarea", { directives: [{ name: "model", rawName: "v-model", value: _vm.description, expression: "description" }], staticClass: "form-control lgxname", attrs: { "name": "description", "rows": "2" }, domProps: { "value": _vm.description }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.description = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("description"), expression: "errors.has('description')" }], staticClass: "small text-danger" }, [_vm._v(_vm._s(_vm.errors.first("description")))])]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.taxes")))]), _c("multiselect", { class: "form-control px-0 py-0 border-0", attrs: { "options": _vm.taxes_options, "placeholder": "-- " + _vm.trans("em.select") + " --", "label": "text", "track-by": "value", "multiple": true, "close-on-select": false, "clear-on-select": false, "hide-selected": false, "preserve-search": true, "preselect-first": false, "allow-empty": true }, model: { value: _vm.tmp_taxes_ids, callback: function($$v) {
    _vm.tmp_taxes_ids = $$v;
  }, expression: "tmp_taxes_ids" } })], 1)]), _c("div", { staticClass: "modal-footer" }, [_c("button", { staticClass: "btn btn-primary btn-lg", attrs: { "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")))])])])])])])]) : _vm._e()]);
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
const TicketComponent = __component__$4.exports;
const _sfc_main$3 = {
  data() {
    return {
      edit_index: null,
      taxes: null,
      currency: null,
      openModal_1: false,
      openModal_2: false
    };
  },
  mixins: [
    mixinsFilters
  ],
  components: {
    TicketComponent
  },
  computed: {
    // get global variables
    ...mapState(["tickets", "event_id", "organiser_id"])
  },
  methods: {
    // update global variables
    ...mapMutations(["add", "update"]),
    // delete tickets
    deleteTicket(ticket_id) {
      this.showConfirm(trans("em.ticket_delete_ask")).then((res) => {
        if (res) {
          axios.post(route("eventmie.tickets_delete"), {
            ticket_id,
            event_id: this.event_id,
            organiser_id: this.organiser_id
          }).then((res2) => {
            if (res2.data.status) {
              this.showNotification("success", trans("em.ticket_delete_success"));
              this.getTickets();
            }
          }).catch((error) => {
            Vue.helpers.axiosErrors(error);
          });
        }
      });
    },
    // get all tickets       
    getTickets() {
      axios.post(route("eventmie.tickets"), {
        "event_id": this.event_id,
        "organiser_id": this.organiser_id
      }).then((res) => {
        if (res.data.status) {
          this.add({
            tickets: res.data.tickets
          });
        } else {
          this.add({
            tickets: []
          });
        }
        if (res.data.currency) {
          this.currency = res.data.currency;
        }
      }).catch((error) => {
        Vue.helpers.axiosErrors(error);
      });
    },
    getTaxes() {
      axios.get(route("eventmie.tickets_taxes"), {
        "event_id": this.event_id,
        "organiser_id": this.organiser_id
      }).then((res) => {
        if (res.data.status) {
          this.taxes = res.data.taxes;
        }
      }).catch((error) => {
        Vue.helpers.axiosErrors(error);
      });
    },
    updateItem() {
      this.getTickets();
      this.edit_index = null;
    },
    isDirtyReset() {
      this.add({ is_dirty: false });
    }
  },
  mounted() {
    this.isDirtyReset();
    let event_step = this.eventStep();
    if (event_step) {
      this.getTaxes();
      if (this.event_id)
        this.getTickets();
    }
  }
};
var _sfc_render$3 = function render10() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_vm.edit_index == null ? _c("button", { staticClass: "btn btn-primary m-2", attrs: { "type": "button" }, on: { "click": function($event) {
    _vm.openModal_1 = true;
  } } }, [_c("i", { staticClass: "fas fa-ticket-alt" }), _vm._v(" " + _vm._s(_vm.trans("em.create_ticket")))]) : _vm._e(), _vm.openModal_1 ? _c("ticket-component", { attrs: { "taxes": _vm.taxes, "currency": _vm.currency, "openModal_1": _vm.openModal_1 }, on: { "changeItem": _vm.updateItem } }) : _vm._e(), _c("div", { staticClass: "row" }, [_c("div", { staticClass: "table-responsive" }, [_c("table", { staticClass: "table text-wrap" }, [_c("thead", { staticClass: "table-light text-nowrap" }, [_c("tr", [_c("th", [_vm._v(_vm._s(_vm.trans("em.title")))]), _c("th", [_vm._v(_vm._s(_vm.trans("em.price")))]), _c("th", [_vm._v(_vm._s(_vm.trans("em.quantity")))]), _c("th", [_vm._v(_vm._s(_vm.trans("em.actions")))])])]), _c("tbody", _vm._l(_vm.tickets, function(ticket, index2) {
    return _c("tr", { key: index2 }, [_c("td", { attrs: { "data-title": _vm.trans("em.title") } }, [_vm._v(_vm._s(ticket.title))]), _c("td", { attrs: { "data-title": _vm.trans("em.price") } }, [_vm._v(_vm._s(ticket.price + " " + _vm.currency))]), _c("td", { attrs: { "data-title": _vm.trans("em.quantity") } }, [_vm._v(_vm._s(ticket.quantity))]), _c("td", { attrs: { "data-title": _vm.trans("em.actions") } }, [_c("div", { staticClass: "btn-group text-nowrap" }, [_c("button", { staticClass: "btn btn-sm bg-primary text-white", attrs: { "type": "button" }, on: { "click": () => {
      _vm.edit_index = index2;
      _vm.openModal_2 = true;
    } } }, [_c("i", { staticClass: "fas fa-edit" }), _vm._v(" " + _vm._s(_vm.trans("em.edit")))]), _c("button", { staticClass: "btn btn-sm bg-danger text-white", attrs: { "type": "button" }, on: { "click": function($event) {
      return _vm.deleteTicket(ticket.id);
    } } }, [_c("i", { staticClass: "fas fa-trash" }), _vm._v(" " + _vm._s(_vm.trans("em.delete")))])]), _vm.edit_index == index2 ? _c("ticket-component", { attrs: { "taxes": _vm.taxes, "edit_ticket": ticket, "currency": _vm.currency, "openModal_2": _vm.openModal_2 }, on: { "changeItem": _vm.updateItem } }) : _vm._e()], 1)]);
  }), 0)])])])], 1);
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
const Tickets = __component__$3.exports;
const _sfc_main$2 = {
  props: [
    "organisers"
  ],
  mixins: [
    mixinsFilters
  ],
  components: {
    TagComponent
  },
  data() {
    return {
      tags_ids: [],
      tags_options: [],
      tmp_tags_ids: [],
      selected_tags: [],
      is_publishable: [],
      isLoading: false,
      disable: false
    };
  },
  computed: {
    ...mapState(["tags", "event_id", "organiser_id", "event_step", "event"])
  },
  methods: {
    ...mapMutations(["add", "update"]),
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
      let post_url = route("eventmie.myevents_store_event_tags");
      let post_data = {
        "tags_ids": this.tags_ids,
        "event_id": this.event_id,
        "organiser_id": this.organiser_id
      };
      axios.post(post_url, post_data).then((res) => {
        if (res.data.status) {
          this.showNotification("success", trans("em.event_save_success"));
        }
        this.disable = false;
        Swal.hideLoading();
      }).catch((error) => {
        this.disable = false;
        Swal.hideLoading();
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    },
    // get selected tags in case of editing
    getSelectedtags() {
      axios.post(route("eventmie.selected_tags"), {
        event_id: this.event_id,
        organiser_id: this.organiser_id
      }).then((res) => {
        this.selected_tags = res.data.selected_event_tags;
        if (this.selected_tags.length > 0) {
          this.tmp_tags_ids = [];
          this.selected_tags.forEach((function(v, key) {
            this.tmp_tags_ids.push({ value: v.id, text: v.title + " (" + v.type + ")" });
          }).bind(this));
        }
      }).catch((error) => {
        Vue.helpers.axiosErrors(error);
      });
    },
    // update tags for submit
    updateTags() {
      this.tags_ids = "";
      if (this.tmp_tags_ids.length > 0) {
        var count = this.tmp_tags_ids.length;
        this.tmp_tags_ids.forEach((function(value, key) {
          this.tags_ids += value.value;
          if (key < count - 1)
            this.tags_ids += ",";
        }).bind(this));
      }
    },
    // publish event
    publishEvent() {
      axios.post(route("eventmie.publish_myevent"), {
        event_id: this.event_id,
        organiser_id: this.organiser_id
      }).then((res) => {
        if (res.data.status) {
          if (this.event.publish == 1)
            this.showNotification("success", trans("em.event_unpublished"));
          else
            this.showNotification("success", trans("em.event_published"));
          setTimeout(function() {
            location.reload(true);
          }, 1e3);
        }
      }).catch((error) => {
        Vue.helpers.axiosErrors(error);
      });
    },
    limitText(count) {
      return trans("em.event") + count + trans("em.tags");
    },
    // get tags of organiser and tag searching
    searchTags: _$1.debounce(function(search) {
      this.isLoading = true;
      let post_url = route("eventmie.search_tags");
      let post_data = {
        "search": search,
        organiser_id: this.organiser_id
      };
      axios.post(post_url, post_data).then((res) => {
        this.tags_options = [];
        this.add({
          tags: res.data.tags
        });
        if (this.tags.length > 0) {
          this.tags.forEach((function(v, key) {
            this.tags_options.push({ value: v.id, text: v.title + " (" + v.type + ")" });
          }).bind(this));
        }
        this.isLoading = false;
      }).catch((error) => {
        let serrors = Vue.helpers.axiosErrors(error);
        if (serrors.length) {
          this.serverValidate(serrors);
        }
      });
    }, 1e3),
    clearAll() {
      this.tmp_tags_ids = [];
    },
    isDirty() {
      this.add({ is_dirty: true });
    },
    isDirtyReset() {
      this.add({ is_dirty: false });
    }
  },
  watch: {
    tmp_tags_ids: function() {
      this.updateTags();
    }
  },
  mounted() {
    this.isDirtyReset();
    let event_step = this.eventStep();
    if (event_step) {
      var $this = this;
      this.getMyEvent().then(function(response) {
        $this.searchTags(null);
        $this.getSelectedtags();
        $this.is_publishable = $this.event.is_publishable ? JSON.parse($this.event.is_publishable) : [];
      });
    }
  }
};
var _sfc_render$2 = function render11() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("form", { ref: "form", staticClass: "lgx-contactform", attrs: { "method": "POST", "enctype": "multipart/form-data" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.event_tags")) + " (" + _vm._s(_vm.trans("em.optional")) + ")")]), _c("multiselect", { class: "form-control px-0 py-0 border-0", attrs: { "options": _vm.tags_options, "id": "ajax", "label": "text", "track-by": "value", "placeholder": "-- " + _vm.trans("em.search_tags") + " --", "open-direction": "bottom", "multiple": true, "searchable": true, "loading": _vm.isLoading, "internal-search": false, "clear-on-select": true, "close-on-select": false, "options-limit": 300, "limit": 20, "limit-text": _vm.limitText, "max-height": 300, "show-no-results": false, "hide-selected": false, "allow-empty": true, "preserve-search": true, "preselect-first": false }, on: { "search-change": _vm.searchTags, "select": function($event) {
    return _vm.isDirty();
  } }, scopedSlots: _vm._u([{ key: "tag", fn: function({ option, remove }) {
    return [_c("span", { staticClass: "multiselect__tag", on: { "click": function($event) {
      return remove(option);
    } } }, [_c("span", [_vm._v(_vm._s(option.text))]), _c("i", { staticClass: "multiselect__tag-icon", attrs: { "aria-hidden": "true", "tabindex": "1" } })])];
  } }, { key: "clear", fn: function(props) {
    return [_vm.tmp_tags_ids.length ? _c("div", { staticClass: "multiselect__clear", on: { "mousedown": function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      return _vm.clearAll(props.search);
    } } }) : _vm._e()];
  } }]), model: { value: _vm.tmp_tags_ids, callback: function($$v) {
    _vm.tmp_tags_ids = $$v;
  }, expression: "tmp_tags_ids" } }, [_c("span", { attrs: { "slot": "noResult" }, slot: "noResult" }, [_vm._v(" " + _vm._s(_vm.trans("em.tags_not_found")))])])], 1), _c("div", [_c("tag-component", { attrs: { "organiser_id": _vm.organiser_id } })], 1), _c("div", [_c("button", { staticClass: "btn btn-primary btn-lg mt-3", attrs: { "disabled": _vm.disable, "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")))])])]), _c("hr"), _c("div", { staticClass: "bg-light card shadow-sm mt-3" }, [_c("div", { staticClass: "card-header p-4 bg-white" }, [_c("h3", { staticClass: "mb-0" }, [_vm._v(_vm._s(_vm.trans("em.publish_event")))]), _c("p", { staticClass: "mb-0" }, [_vm._v(_vm._s(_vm.trans("em.publish_event_ie")))])]), _c("div", { staticClass: "card-body p-4" }, [_vm.event.publish == 1 ? _c("div", [_c("span", { staticClass: "text-danger h4" }, [_vm._v(_vm._s(_vm.trans("em.unpublish_event")))]), _c("p", { staticClass: "text-danger" }, [_vm._v(_vm._s(_vm.trans("em.unpublish_event_ie")))])]) : _vm._e(), _c("button", { staticClass: "btn btn-outline-success btn-lg", class: { "btn-outline-danger": _vm.event.publish == 1, "btn-outline--success": _vm.event.publish != 1 }, attrs: { "type": "button", "disabled": Object.keys(this.is_publishable).length < 5 && _vm.event.publish == 0 ? true : false }, on: { "click": function($event) {
    return _vm.publishEvent();
  } } }, [!_vm.event.publish ? _c("i", { staticClass: "fas fa-eye" }) : _vm._e(), _vm.event.publish ? _c("i", { staticClass: "fas fa-eye-slash" }) : _vm._e(), _vm._v(" " + _vm._s(_vm.event.publish == 1 ? _vm.trans("em.unpublish_event") : _vm.trans("em.publish_event")) + " ")])])])]);
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
const Poweredby = __component__$2.exports;
const _sfc_main$1 = {
  props: [
    "event_prop"
  ],
  mixins: [
    mixinsFilters
  ],
  data() {
    return {
      meta_title: null,
      meta_description: null,
      meta_keywords: null
    };
  },
  computed: {
    // get global variables
    ...mapState(["event_id", "organiser_id", "event"])
  },
  methods: {
    // update global variables
    ...mapMutations(["add", "update"]),
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
      let post_url = route("eventmie.myevents_store_seo");
      let post_data = new FormData(this.$refs.form);
      axios.post(post_url, post_data).then((res) => {
        if (res.data.status) {
          this.showNotification("success", trans("em.seo_saved_successfully"));
          setTimeout(function() {
            location.reload(true);
          }, 1e3);
        }
      }).catch((error) => {
        if (error.length) {
          this.serverValidate(error);
        }
      });
    },
    //edit seo
    edit_seo() {
      if (Object.keys(this.event).length > 0) {
        this.meta_title = this.event.meta_title;
        this.meta_keywords = this.event.meta_keywords;
        this.meta_description = this.event.meta_description;
      }
    },
    isDirty() {
      this.add({ is_dirty: true });
    },
    isDirtyReset() {
      this.add({ is_dirty: false });
    }
  },
  mounted() {
    this.isDirtyReset();
    let event_step = this.eventStep();
    if (event_step) {
      var $this = this;
      this.getMyEvent().then(function(response) {
        $this.edit_seo();
      });
    }
  }
};
var _sfc_render$1 = function render12() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("form", { ref: "form", staticClass: "lgx-contactform", attrs: { "method": "POST", "enctype": "multipart/form-data" }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.validateForm.apply(null, arguments);
  } } }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.event_id, expression: "event_id" }], attrs: { "type": "hidden", "name": "event_id" }, domProps: { "value": _vm.event_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.event_id = $event.target.value;
  } } }), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.organiser_id, expression: "organiser_id" }], attrs: { "type": "hidden", "name": "organiser_id" }, domProps: { "value": _vm.organiser_id }, on: { "input": function($event) {
    if ($event.target.composing) return;
    _vm.organiser_id = $event.target.value;
  } } }), _c("div", { staticClass: "mb-2" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.meta_title")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.meta_title, expression: "meta_title" }], staticClass: "form-control", attrs: { "type": "text", "name": "meta_title" }, domProps: { "value": _vm.meta_title }, on: { "change": function($event) {
    return _vm.isDirty();
  }, "input": function($event) {
    if ($event.target.composing) return;
    _vm.meta_title = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("meta_title"), expression: "errors.has('meta_title')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("meta_title")))])]), _c("div", { staticClass: "mb-2" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.meta_tags")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.meta_keywords, expression: "meta_keywords" }], staticClass: "form-control", attrs: { "type": "text", "name": "meta_keywords" }, domProps: { "value": _vm.meta_keywords }, on: { "change": function($event) {
    return _vm.isDirty();
  }, "input": function($event) {
    if ($event.target.composing) return;
    _vm.meta_keywords = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("meta_keywords"), expression: "errors.has('meta_keywords')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("meta_keywords")))])]), _c("div", { staticClass: "mb-2" }, [_c("label", { staticClass: "form-label" }, [_vm._v(_vm._s(_vm.trans("em.meta_description")))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.meta_description, expression: "meta_description" }], staticClass: "form-control", attrs: { "type": "text", "name": "meta_description" }, domProps: { "value": _vm.meta_description }, on: { "change": function($event) {
    return _vm.isDirty();
  }, "input": function($event) {
    if ($event.target.composing) return;
    _vm.meta_description = $event.target.value;
  } } }), _c("span", { directives: [{ name: "show", rawName: "v-show", value: _vm.errors.has("meta_description"), expression: "errors.has('meta_description')" }], staticClass: "help text-danger" }, [_vm._v(_vm._s(_vm.errors.first("meta_description")))])]), _c("button", { staticClass: "btn btn-primary btn-lg mt-2", attrs: { "type": "submit" } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.trans("em.save")))])])]);
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
const Seo = __component__$1.exports;
const _sfc_main = {
  mixins: [mixinsFilters],
  data() {
    return {
      kits: [],
      eventKitItems: {},
      kitImages: {},
      // { kit_id_item_id: base64_image }
      saving: false,
      selectedKitId: null
    };
  },
  computed: {
    ...mapState(["event_id", "organiser_id", "event"]),
    /**
     * Get the selected kit object
     */
    selectedKit() {
      if (!this.selectedKitId) return null;
      return this.kits.find((kit) => kit.id === this.selectedKitId) || null;
    }
  },
  methods: {
    ...mapMutations(["add", "update"]),
    /**
     * Get item image from event kit items or local uploads
     */
    getItemImage(kitId, itemId) {
      const key = kitId + "_" + itemId;
      if (this.kitImages[key] !== void 0) {
        if (this.kitImages[key] === null) {
          return null;
        }
        return this.kitImages[key];
      }
      if (this.eventKitItems[key]) {
        return this.eventKitItems[key].image;
      }
      return null;
    },
    /**
     * Convert image path to full URL
     */
    getImageUrl(imagePath) {
      if (!imagePath) return null;
      if (imagePath.startsWith("data:")) {
        return imagePath;
      }
      if (!imagePath.startsWith("http")) {
        return `/storage/${imagePath}`;
      }
      return imagePath;
    },
    /**
     * Handle image upload for kit item
     */
    handleImageUpload(event, kitId, itemId) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const key = kitId + "_" + itemId;
        this.kitImages[key] = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    /**
     * Clear image for a specific kit item
     */
    clearItemImage(kitId, itemId) {
      const key = kitId + "_" + itemId;
      this.$set(this.kitImages, key, null);
      setTimeout(() => {
        const refName = `fileInput_${kitId}_${itemId}`;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          this.$refs[refName][0].value = "";
        }
      }, 0);
      Vue.helpers.showToast("warning", trans("em.image_deleted_need_save"));
    },
    /**
     * Clear all images for the selected kit
     */
    clearAllImages() {
      if (!this.selectedKit) return;
      if (confirm(trans("em.confirm_clear_all_images"))) {
        this.selectedKit.items.forEach((item) => {
          const key = this.selectedKitId + "_" + item.id;
          this.$set(this.kitImages, key, null);
        });
        setTimeout(() => {
          this.selectedKit.items.forEach((item) => {
            const refName = `fileInput_${this.selectedKitId}_${item.id}`;
            if (this.$refs[refName] && this.$refs[refName][0]) {
              this.$refs[refName][0].value = "";
            }
          });
        }, 0);
        Vue.helpers.showToast("warning", trans("em.all_images_deleted_need_save"));
      }
    },
    /**
     * Save kits with images
     */
    async saveKits() {
      var _a, _b, _c, _d, _e, _f;
      if (!this.selectedKitId) {
        Vue.helpers.showToast("error", trans("em.select_kit_first"));
        return;
      }
      this.saving = true;
      try {
        const formData = new FormData();
        formData.append("event_id", this.event_id);
        const kitsData = [{
          kit_id: this.selectedKitId,
          items: this.selectedKit.items.map((item) => {
            const key = this.selectedKitId + "_" + item.id;
            const image = this.kitImages[key] || null;
            return {
              kit_item_id: item.id,
              image
            };
          })
        }];
        formData.append("kits", JSON.stringify(kitsData));
        const response = await axios.post(
          route("eventmie.myevents_store_event_kits"),
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        if (response.data.status) {
          Vue.helpers.showToast("success", trans("em.saved_successfully"));
          this.$nextTick(() => {
            if (this.selectedKit && this.selectedKit.items) {
              this.selectedKit.items.forEach((item) => {
                const refName = `fileInput_${this.selectedKitId}_${item.id}`;
                if (this.$refs[refName] && this.$refs[refName][0]) {
                  this.$refs[refName][0].value = "";
                }
              });
            }
          });
          this.loadEventKits();
        } else {
          Vue.helpers.showToast("error", trans("em.error_saving"));
        }
      } catch (error) {
        console.error("Full error:", error);
        console.error("Error response:", (_a = error.response) == null ? void 0 : _a.data);
        let errorMsg = trans("em.error_saving");
        if ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) {
          errorMsg = error.response.data.message;
        } else if ((_e = (_d = error.response) == null ? void 0 : _d.data) == null ? void 0 : _e.errors) {
          errorMsg = Object.values(error.response.data.errors).flat().join(", ");
        } else if ((_f = error.response) == null ? void 0 : _f.data) {
          console.error("Error data:", JSON.stringify(error.response.data));
          errorMsg = error.response.data.message || error.response.data.error || JSON.stringify(error.response.data);
        }
        Vue.helpers.showToast("error", errorMsg);
      } finally {
        this.saving = false;
      }
    },
    /**
     * Load event kits
     */
    async loadEventKits() {
      var _a, _b;
      if (!this.event_id) {
        console.warn("Event ID not available yet");
        return;
      }
      try {
        const response = await axios.post(
          route("eventmie.myevents_get_event_kits"),
          {
            event_id: this.event_id
          }
        );
        if (response.data.status) {
          this.kits = response.data.kits || [];
          this.eventKitItems = response.data.event_kit_items || {};
          Object.keys(this.eventKitItems).forEach((key) => {
            if (this.eventKitItems[key].image && !this.kitImages[key]) {
              this.kitImages[key] = this.eventKitItems[key].image;
            }
          });
          if (this.kits.length === 0) {
            console.info("No kits available for this event");
          }
        } else {
          Vue.helpers.showToast("error", trans("em.error_loading_kits"));
        }
      } catch (error) {
        console.error("Error loading kits:", error);
        let errorMsg = trans("em.error_loading_kits");
        if ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) {
          errorMsg = error.response.data.message;
        }
        Vue.helpers.showToast("error", errorMsg);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.event_id) {
        this.loadEventKits();
      }
    });
  },
  watch: {
    event_id(newVal) {
      if (newVal) {
        this.loadEventKits();
      }
    }
  }
};
var _sfc_render = function render13() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "tab-pane active" }, [_c("div", { staticClass: "panel-group" }, [_c("div", { staticClass: "panel panel-default" }, [_c("div", { staticClass: "panel-heading" }, [_c("h4", { staticClass: "panel-title mb-3" }, [_vm._v(_vm._s(_vm.trans("em.kits")))]), _vm.kits.length === 0 ? _c("div", { staticClass: "alert alert-info" }, [_vm._v(" " + _vm._s(_vm.trans("em.no_kits_available")) + " ")]) : _c("div", [_c("div", { staticClass: "form-group mb-4" }, [_c("label", { staticClass: "form-label" }, [_vm._v(" " + _vm._s(_vm.trans("em.select_kit")) + " ")]), _c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.selectedKitId, expression: "selectedKitId" }], staticClass: "form-control form-control-lg", on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.selectedKitId = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  } } }, [_c("option", { attrs: { "disabled": "", "selected": "" }, domProps: { "value": null } }, [_vm._v(_vm._s(_vm.trans("em.select_kit_option")))]), _vm._l(_vm.kits, function(kit) {
    return _c("option", { key: kit.id, domProps: { "value": kit.id } }, [_vm._v(" " + _vm._s(kit.name) + " ")]);
  })], 2), _c("small", { staticClass: "form-text text-muted d-block mt-2" }, [_vm._v(" " + _vm._s(_vm.trans("em.choose_kit_message")) + " ")])]), _vm.selectedKit ? _c("div", { staticClass: "row" }, [_c("div", { staticClass: "col-md-12" }, [_c("div", { staticClass: "card mb-4" }, [_c("div", { staticClass: "card-header bg-light" }, [_c("h5", { staticClass: "mb-0" }, [_c("i", { staticClass: "fas fa-box" }), _vm._v(" " + _vm._s(_vm.selectedKit.name) + " ")]), _c("small", { staticClass: "text-muted" }, [_vm._v(_vm._s(_vm.selectedKit.description))])]), _c("div", { staticClass: "card-body" }, [_vm.selectedKit.items && _vm.selectedKit.items.length > 0 ? _c("div", { staticClass: "row" }, _vm._l(_vm.selectedKit.items, function(item) {
    return _c("div", { key: item.id, staticClass: "col-md-6 mb-4" }, [_c("div", { staticClass: "border rounded p-3" }, [_c("h6", { staticClass: "mb-2" }, [_c("i", { staticClass: "fas fa-cube" }), _vm._v(" " + _vm._s(item.name) + " ")]), _c("small", { staticClass: "text-muted d-block mb-3" }, [_vm._v(_vm._s(item.description))]), _c("div", { staticClass: "mb-3" }, [_c("label", { staticClass: "form-label form-label-sm" }, [_vm._v(" " + _vm._s(_vm.trans("em.image")) + " ")]), _c("div", { staticClass: "image-preview mb-2" }, [_vm.getItemImage(_vm.selectedKit.id, item.id) ? _c("img", { staticClass: "img-fluid rounded", staticStyle: { "max-height": "150px", "object-fit": "cover" }, attrs: { "src": _vm.getImageUrl(_vm.getItemImage(_vm.selectedKit.id, item.id)) } }) : _c("div", { staticClass: "bg-light rounded p-3 text-center text-muted" }, [_c("i", { staticClass: "fas fa-image fa-2x" }), _c("p", { staticClass: "mb-0 mt-2" }, [_vm._v(_vm._s(_vm.trans("em.no_image")))])])]), _c("div", { staticClass: "d-flex gap-2" }, [_c("input", { ref: `fileInput_${_vm.selectedKit.id}_${item.id}`, refInFor: true, staticClass: "form-control form-control-sm flex-grow-1", attrs: { "type": "file", "accept": "image/*" }, on: { "change": (e) => _vm.handleImageUpload(e, _vm.selectedKit.id, item.id) } }), _vm.getItemImage(_vm.selectedKit.id, item.id) ? _c("button", { staticClass: "btn btn-sm btn-danger", attrs: { "type": "button", "title": "Limpar imagem" }, on: { "click": function($event) {
      return _vm.clearItemImage(_vm.selectedKit.id, item.id);
    } } }, [_c("i", { staticClass: "fas fa-trash" })]) : _vm._e()])])])]);
  }), 0) : _c("div", { staticClass: "alert alert-warning" }, [_vm._v(" " + _vm._s(_vm.trans("em.no_items_in_kit")) + " ")])])])])]) : _c("div", { staticClass: "alert alert-info" }, [_vm._v(" " + _vm._s(_vm.trans("em.select_kit_to_edit")) + " ")]), _vm.selectedKit ? _c("div", { staticClass: "mb-3 d-flex gap-2" }, [_c("button", { staticClass: "btn btn-primary btn-lg flex-grow-1", attrs: { "type": "button", "disabled": _vm.saving }, on: { "click": _vm.saveKits } }, [_c("i", { staticClass: "fas fa-sd-card" }), _vm._v(" " + _vm._s(_vm.saving ? _vm.trans("em.saving") : _vm.trans("em.save")) + " ")]), _c("button", { staticClass: "btn btn-warning btn-lg", attrs: { "type": "button", "title": "Limpar todas as imagens" }, on: { "click": _vm.clearAllImages } }, [_c("i", { staticClass: "fas fa-broom" }), _vm._v(" " + _vm._s(_vm.trans("em.clear_all")) + " ")])]) : _vm._e()])])])])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "0ad62652"
);
const Kits = __component__.exports;
window.Vuex = index;
Vue.use(index);
Vue.component("v-select", vSelect);
Vue.component("Multiselect", Multiselect);
Vue.component("DatePicker", DatePicker);
Vue.use(VueConfirmDialog);
Vue.component("vue-confirm-dialog", VueConfirmDialog.default);
Vue.use(Croppa);
const store = new index.Store({
  state: {
    event: [],
    tickets: [],
    tags: [],
    event_id: null,
    is_dirty: false,
    v_sch_index: 0,
    v_repetitive: 0,
    v_repetitive_days: [],
    v_repetitive_dates: [],
    v_from_time: [],
    v_to_time: [],
    organiser_id: null
  },
  mutations: {
    add(state, { tickets, tags, event_id, v_repetitive, v_repetitive_days, v_repetitive_dates, v_from_time, v_to_time, organiser_id, event, is_dirty }) {
      if (typeof tickets !== "undefined") {
        state.tickets = tickets;
      }
      if (typeof tags !== "undefined") {
        state.tags = tags;
      }
      if (typeof event_id !== "undefined") {
        state.event_id = event_id;
      }
      if (typeof v_repetitive !== "undefined") {
        state.v_repetitive = v_repetitive;
      }
      if (typeof v_repetitive_days !== "undefined") {
        state.v_repetitive_days = v_repetitive_days;
      }
      if (typeof v_repetitive_dates !== "undefined") {
        state.v_repetitive_dates = v_repetitive_dates;
      }
      if (typeof v_from_time !== "undefined") {
        state.v_from_time = v_from_time;
      }
      if (typeof v_to_time !== "undefined") {
        state.v_to_time = v_to_time;
      }
      if (typeof organiser_id !== "undefined") {
        state.organiser_id = organiser_id;
      }
      if (typeof event !== "undefined") {
        state.event = event;
      }
      if (typeof is_dirty !== "undefined") {
        state.is_dirty = is_dirty;
      }
    },
    update(state, { v_sch_index, v_repetitive_days, v_repetitive_dates, v_from_time, v_to_time }) {
      if (typeof v_repetitive_days !== "undefined" && typeof v_sch_index !== "undefined") {
        state.v_repetitive_days[v_sch_index] = v_repetitive_days;
      }
      if (typeof v_repetitive_dates !== "undefined" && typeof v_sch_index !== "undefined") {
        state.v_repetitive_dates[v_sch_index] = v_repetitive_dates;
      }
      if (typeof v_from_time !== "undefined" && typeof v_sch_index !== "undefined") {
        state.v_from_time[v_sch_index] = v_from_time;
      }
      if (typeof v_to_time !== "undefined" && typeof v_sch_index !== "undefined") {
        state.v_to_time[v_sch_index] = v_to_time;
      }
    }
  }
});
const routes = new VueRouter({
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "detail",
      component: Detail,
      props: true,
      beforeEnter(to, from, next) {
        routeBeforeEnter(to, from, next);
      }
    },
    {
      path: "/media",
      name: "media",
      component: Media,
      props: true,
      beforeEnter(to, from, next) {
        routeBeforeEnter(to, from, next);
      }
    },
    {
      path: "/seo",
      name: "seo",
      component: Seo,
      props: true,
      beforeEnter(to, from, next) {
        routeBeforeEnter(to, from, next);
      }
    },
    {
      path: "/location",
      name: "location",
      component: Location,
      props: true,
      beforeEnter(to, from, next) {
        routeBeforeEnter(to, from, next);
      }
    },
    {
      path: "/timing",
      name: "timing",
      component: Timing,
      props: true,
      beforeEnter(to, from, next) {
        routeBeforeEnter(to, from, next);
      }
    },
    {
      path: "/tickets",
      name: "tickets",
      component: Tickets,
      props: true,
      beforeEnter(to, from, next) {
        routeBeforeEnter(to, from, next);
      }
    },
    {
      path: "/kits",
      name: "kits",
      component: Kits,
      props: true,
      beforeEnter(to, from, next) {
        routeBeforeEnter(to, from, next);
      }
    },
    {
      path: "/publish",
      name: "publish",
      component: Poweredby,
      props: true,
      beforeEnter(to, from, next) {
        routeBeforeEnter(to, from, next);
      }
    }
  ]
});
function routeBeforeEnter(to, from, next) {
  if (from.name !== null) {
    if (is_event_id == 0) {
      Vue.$confirm({
        title: trans("em.required"),
        message: trans("em.please_fill_details"),
        button: {
          yes: trans("em.cancel")
        },
        callback: (confirm2) => {
          next(false);
        }
      });
      next(false);
      if (to.name == "detail") {
        window.location.href = route("eventmie.myevents_form");
      }
    } else {
      if (store.state.is_dirty) {
        Vue.$confirm({
          title: trans("em.unsaved_changes"),
          message: trans("em.save_before_switch_tab"),
          button: {
            yes: trans("em.switch_tab"),
            no: trans("em.stay_here")
          },
          callback: (confirm2) => {
            if (confirm2) next();
            else next(false);
          }
        });
      } else {
        next();
      }
    }
  } else {
    next();
  }
}
window.app = new Vue({
  el: "#eventmie_app",
  store,
  router: routes,
  components: {
    TabsComponent
  }
});
//# sourceMappingURL=index-CZ8dtUzf.js.map
