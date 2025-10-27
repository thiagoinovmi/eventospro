import { g as getDefaultExportFromCjs } from "./mixins-DZWn0auj.js";
var vueSelect$1 = { exports: {} };
var vueSelect = vueSelect$1.exports;
var hasRequiredVueSelect;
function requireVueSelect() {
  if (hasRequiredVueSelect) return vueSelect$1.exports;
  hasRequiredVueSelect = 1;
  (function(module, exports) {
    !function(e, t) {
      module.exports = t();
    }("undefined" != typeof self ? self : vueSelect, function() {
      return (() => {
        var e = { 646: (e2) => {
          e2.exports = function(e3) {
            if (Array.isArray(e3)) {
              for (var t2 = 0, n2 = new Array(e3.length); t2 < e3.length; t2++) n2[t2] = e3[t2];
              return n2;
            }
          };
        }, 713: (e2) => {
          e2.exports = function(e3, t2, n2) {
            return t2 in e3 ? Object.defineProperty(e3, t2, { value: n2, enumerable: true, configurable: true, writable: true }) : e3[t2] = n2, e3;
          };
        }, 860: (e2) => {
          e2.exports = function(e3) {
            if (Symbol.iterator in Object(e3) || "[object Arguments]" === Object.prototype.toString.call(e3)) return Array.from(e3);
          };
        }, 206: (e2) => {
          e2.exports = function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance");
          };
        }, 319: (e2, t2, n2) => {
          var o2 = n2(646), i = n2(860), s = n2(206);
          e2.exports = function(e3) {
            return o2(e3) || i(e3) || s();
          };
        }, 8: (e2) => {
          function t2(n2) {
            return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? e2.exports = t2 = function(e3) {
              return typeof e3;
            } : e2.exports = t2 = function(e3) {
              return e3 && "function" == typeof Symbol && e3.constructor === Symbol && e3 !== Symbol.prototype ? "symbol" : typeof e3;
            }, t2(n2);
          }
          e2.exports = t2;
        } }, t = {};
        function n(o2) {
          var i = t[o2];
          if (void 0 !== i) return i.exports;
          var s = t[o2] = { exports: {} };
          return e[o2](s, s.exports, n), s.exports;
        }
        n.n = (e2) => {
          var t2 = e2 && e2.__esModule ? () => e2.default : () => e2;
          return n.d(t2, { a: t2 }), t2;
        }, n.d = (e2, t2) => {
          for (var o2 in t2) n.o(t2, o2) && !n.o(e2, o2) && Object.defineProperty(e2, o2, { enumerable: true, get: t2[o2] });
        }, n.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), n.r = (e2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        };
        var o = {};
        return (() => {
          n.r(o), n.d(o, { VueSelect: () => m, default: () => O, mixins: () => _ });
          var e2 = n(319), t2 = n.n(e2), i = n(8), s = n.n(i), r = n(713), a = n.n(r);
          const l = { props: { autoscroll: { type: Boolean, default: true } }, watch: { typeAheadPointer: function() {
            this.autoscroll && this.maybeAdjustScroll();
          }, open: function(e3) {
            var t3 = this;
            this.autoscroll && e3 && this.$nextTick(function() {
              return t3.maybeAdjustScroll();
            });
          } }, methods: { maybeAdjustScroll: function() {
            var e3, t3 = (null === (e3 = this.$refs.dropdownMenu) || void 0 === e3 ? void 0 : e3.children[this.typeAheadPointer]) || false;
            if (t3) {
              var n2 = this.getDropdownViewport(), o2 = t3.getBoundingClientRect(), i2 = o2.top, s2 = o2.bottom, r2 = o2.height;
              if (i2 < n2.top) return this.$refs.dropdownMenu.scrollTop = t3.offsetTop;
              if (s2 > n2.bottom) return this.$refs.dropdownMenu.scrollTop = t3.offsetTop - (n2.height - r2);
            }
          }, getDropdownViewport: function() {
            return this.$refs.dropdownMenu ? this.$refs.dropdownMenu.getBoundingClientRect() : { height: 0, top: 0, bottom: 0 };
          } } }, c = { data: function() {
            return { typeAheadPointer: -1 };
          }, watch: { filteredOptions: function() {
            for (var e3 = 0; e3 < this.filteredOptions.length; e3++) if (this.selectable(this.filteredOptions[e3])) {
              this.typeAheadPointer = e3;
              break;
            }
          }, open: function(e3) {
            e3 && this.typeAheadToLastSelected();
          }, selectedValue: function() {
            this.open && this.typeAheadToLastSelected();
          } }, methods: { typeAheadUp: function() {
            for (var e3 = this.typeAheadPointer - 1; e3 >= 0; e3--) if (this.selectable(this.filteredOptions[e3])) {
              this.typeAheadPointer = e3;
              break;
            }
          }, typeAheadDown: function() {
            for (var e3 = this.typeAheadPointer + 1; e3 < this.filteredOptions.length; e3++) if (this.selectable(this.filteredOptions[e3])) {
              this.typeAheadPointer = e3;
              break;
            }
          }, typeAheadSelect: function() {
            var e3 = this.filteredOptions[this.typeAheadPointer];
            e3 && this.selectable(e3) && this.select(e3);
          }, typeAheadToLastSelected: function() {
            var e3 = 0 !== this.selectedValue.length ? this.filteredOptions.indexOf(this.selectedValue[this.selectedValue.length - 1]) : -1;
            -1 !== e3 && (this.typeAheadPointer = e3);
          } } }, u = { props: { loading: { type: Boolean, default: false } }, data: function() {
            return { mutableLoading: false };
          }, watch: { search: function() {
            this.$emit("search", this.search, this.toggleLoading);
          }, loading: function(e3) {
            this.mutableLoading = e3;
          } }, methods: { toggleLoading: function() {
            var e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
            return this.mutableLoading = null == e3 ? !this.mutableLoading : e3;
          } } };
          function p(e3, t3, n2, o2, i2, s2, r2, a2) {
            var l2, c2 = "function" == typeof e3 ? e3.options : e3;
            if (t3 && (c2.render = t3, c2.staticRenderFns = n2, c2._compiled = true), l2) ;
            return { exports: e3, options: c2 };
          }
          const h = { Deselect: p({}, function() {
            var e3 = this.$createElement, t3 = this._self._c || e3;
            return t3("svg", { attrs: { xmlns: "http://www.w3.org/2000/svg", width: "10", height: "10" } }, [t3("path", { attrs: { d: "M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z" } })]);
          }, []).exports, OpenIndicator: p({}, function() {
            var e3 = this.$createElement, t3 = this._self._c || e3;
            return t3("svg", { attrs: { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "10" } }, [t3("path", { attrs: { d: "M9.211364 7.59931l4.48338-4.867229c.407008-.441854.407008-1.158247 0-1.60046l-.73712-.80023c-.407008-.441854-1.066904-.441854-1.474243 0L7 5.198617 2.51662.33139c-.407008-.441853-1.066904-.441853-1.474243 0l-.737121.80023c-.407008.441854-.407008 1.158248 0 1.600461l4.48338 4.867228L7 10l2.211364-2.40069z" } })]);
          }, []).exports }, d = { inserted: function(e3, t3, n2) {
            var o2 = n2.context;
            if (o2.appendToBody) {
              var i2 = o2.$refs.toggle.getBoundingClientRect(), s2 = i2.height, r2 = i2.top, a2 = i2.left, l2 = i2.width, c2 = window.scrollX || window.pageXOffset, u2 = window.scrollY || window.pageYOffset;
              e3.unbindPosition = o2.calculatePosition(e3, o2, { width: l2 + "px", left: c2 + a2 + "px", top: u2 + r2 + s2 + "px" }), document.body.appendChild(e3);
            }
          }, unbind: function(e3, t3, n2) {
            n2.context.appendToBody && (e3.unbindPosition && "function" == typeof e3.unbindPosition && e3.unbindPosition(), e3.parentNode && e3.parentNode.removeChild(e3));
          } };
          const f = function(e3) {
            var t3 = {};
            return Object.keys(e3).sort().forEach(function(n2) {
              t3[n2] = e3[n2];
            }), JSON.stringify(t3);
          };
          var y = 0;
          const g = function() {
            return ++y;
          };
          function b(e3, t3) {
            var n2 = Object.keys(e3);
            if (Object.getOwnPropertySymbols) {
              var o2 = Object.getOwnPropertySymbols(e3);
              t3 && (o2 = o2.filter(function(t4) {
                return Object.getOwnPropertyDescriptor(e3, t4).enumerable;
              })), n2.push.apply(n2, o2);
            }
            return n2;
          }
          function v(e3) {
            for (var t3 = 1; t3 < arguments.length; t3++) {
              var n2 = null != arguments[t3] ? arguments[t3] : {};
              t3 % 2 ? b(Object(n2), true).forEach(function(t4) {
                a()(e3, t4, n2[t4]);
              }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(n2)) : b(Object(n2)).forEach(function(t4) {
                Object.defineProperty(e3, t4, Object.getOwnPropertyDescriptor(n2, t4));
              });
            }
            return e3;
          }
          const m = p({ components: v({}, h), directives: { appendToBody: d }, mixins: [l, c, u], props: { value: {}, components: { type: Object, default: function() {
            return {};
          } }, options: { type: Array, default: function() {
            return [];
          } }, disabled: { type: Boolean, default: false }, clearable: { type: Boolean, default: true }, deselectFromDropdown: { type: Boolean, default: false }, searchable: { type: Boolean, default: true }, multiple: { type: Boolean, default: false }, placeholder: { type: String, default: "" }, transition: { type: String, default: "vs__fade" }, clearSearchOnSelect: { type: Boolean, default: true }, closeOnSelect: { type: Boolean, default: true }, label: { type: String, default: "label" }, autocomplete: { type: String, default: "off" }, reduce: { type: Function, default: function(e3) {
            return e3;
          } }, selectable: { type: Function, default: function(e3) {
            return true;
          } }, getOptionLabel: { type: Function, default: function(e3) {
            return "object" === s()(e3) ? e3.hasOwnProperty(this.label) ? e3[this.label] : console.warn('[vue-select warn]: Label key "option.'.concat(this.label, '" does not') + " exist in options object ".concat(JSON.stringify(e3), ".\n") + "https://vue-select.org/api/props.html#getoptionlabel") : e3;
          } }, getOptionKey: { type: Function, default: function(e3) {
            if ("object" !== s()(e3)) return e3;
            try {
              return e3.hasOwnProperty("id") ? e3.id : f(e3);
            } catch (t3) {
              return console.warn("[vue-select warn]: Could not stringify this option to generate unique key. Please provide'getOptionKey' prop to return a unique key for each option.\nhttps://vue-select.org/api/props.html#getoptionkey", e3, t3);
            }
          } }, onTab: { type: Function, default: function() {
            this.selectOnTab && !this.isComposing && this.typeAheadSelect();
          } }, taggable: { type: Boolean, default: false }, tabindex: { type: Number, default: null }, pushTags: { type: Boolean, default: false }, filterable: { type: Boolean, default: true }, filterBy: { type: Function, default: function(e3, t3, n2) {
            return (t3 || "").toLocaleLowerCase().indexOf(n2.toLocaleLowerCase()) > -1;
          } }, filter: { type: Function, default: function(e3, t3) {
            var n2 = this;
            return e3.filter(function(e4) {
              var o2 = n2.getOptionLabel(e4);
              return "number" == typeof o2 && (o2 = o2.toString()), n2.filterBy(e4, o2, t3);
            });
          } }, createOption: { type: Function, default: function(e3) {
            return "object" === s()(this.optionList[0]) ? a()({}, this.label, e3) : e3;
          } }, resetOnOptionsChange: { default: false, validator: function(e3) {
            return ["function", "boolean"].includes(s()(e3));
          } }, clearSearchOnBlur: { type: Function, default: function(e3) {
            var t3 = e3.clearSearchOnSelect, n2 = e3.multiple;
            return t3 && !n2;
          } }, noDrop: { type: Boolean, default: false }, inputId: { type: String }, dir: { type: String, default: "auto" }, selectOnTab: { type: Boolean, default: false }, selectOnKeyCodes: { type: Array, default: function() {
            return [13];
          } }, searchInputQuerySelector: { type: String, default: "[type=search]" }, mapKeydown: { type: Function, default: function(e3, t3) {
            return e3;
          } }, appendToBody: { type: Boolean, default: false }, calculatePosition: { type: Function, default: function(e3, t3, n2) {
            var o2 = n2.width, i2 = n2.top, s2 = n2.left;
            e3.style.top = i2, e3.style.left = s2, e3.style.width = o2;
          } }, dropdownShouldOpen: { type: Function, default: function(e3) {
            var t3 = e3.noDrop, n2 = e3.open, o2 = e3.mutableLoading;
            return !t3 && (n2 && !o2);
          } }, uid: { type: [String, Number], default: function() {
            return g();
          } } }, data: function() {
            return { search: "", open: false, isComposing: false, pushedTags: [], _value: [] };
          }, computed: { isTrackingValues: function() {
            return void 0 === this.value || this.$options.propsData.hasOwnProperty("reduce");
          }, selectedValue: function() {
            var e3 = this.value;
            return this.isTrackingValues && (e3 = this.$data._value), null != e3 && "" !== e3 ? [].concat(e3) : [];
          }, optionList: function() {
            return this.options.concat(this.pushTags ? this.pushedTags : []);
          }, searchEl: function() {
            return this.$scopedSlots.search ? this.$refs.selectedOptions.querySelector(this.searchInputQuerySelector) : this.$refs.search;
          }, scope: function() {
            var e3 = this, t3 = { search: this.search, loading: this.loading, searching: this.searching, filteredOptions: this.filteredOptions };
            return { search: { attributes: v({ disabled: this.disabled, placeholder: this.searchPlaceholder, tabindex: this.tabindex, readonly: !this.searchable, id: this.inputId, "aria-autocomplete": "list", "aria-labelledby": "vs".concat(this.uid, "__combobox"), "aria-controls": "vs".concat(this.uid, "__listbox"), ref: "search", type: "search", autocomplete: this.autocomplete, value: this.search }, this.dropdownOpen && this.filteredOptions[this.typeAheadPointer] ? { "aria-activedescendant": "vs".concat(this.uid, "__option-").concat(this.typeAheadPointer) } : {}), events: { compositionstart: function() {
              return e3.isComposing = true;
            }, compositionend: function() {
              return e3.isComposing = false;
            }, keydown: this.onSearchKeyDown, keypress: this.onSearchKeyPress, blur: this.onSearchBlur, focus: this.onSearchFocus, input: function(t4) {
              return e3.search = t4.target.value;
            } } }, spinner: { loading: this.mutableLoading }, noOptions: { search: this.search, loading: this.mutableLoading, searching: this.searching }, openIndicator: { attributes: { ref: "openIndicator", role: "presentation", class: "vs__open-indicator" } }, listHeader: t3, listFooter: t3, header: v({}, t3, { deselect: this.deselect }), footer: v({}, t3, { deselect: this.deselect }) };
          }, childComponents: function() {
            return v({}, h, {}, this.components);
          }, stateClasses: function() {
            return { "vs--open": this.dropdownOpen, "vs--single": !this.multiple, "vs--multiple": this.multiple, "vs--searching": this.searching && !this.noDrop, "vs--searchable": this.searchable && !this.noDrop, "vs--unsearchable": !this.searchable, "vs--loading": this.mutableLoading, "vs--disabled": this.disabled };
          }, searching: function() {
            return !!this.search;
          }, dropdownOpen: function() {
            return this.dropdownShouldOpen(this);
          }, searchPlaceholder: function() {
            return this.isValueEmpty && this.placeholder ? this.placeholder : void 0;
          }, filteredOptions: function() {
            var e3 = [].concat(this.optionList);
            if (!this.filterable && !this.taggable) return e3;
            var t3 = this.search.length ? this.filter(e3, this.search, this) : e3;
            if (this.taggable && this.search.length) {
              var n2 = this.createOption(this.search);
              this.optionExists(n2) || t3.unshift(n2);
            }
            return t3;
          }, isValueEmpty: function() {
            return 0 === this.selectedValue.length;
          }, showClearButton: function() {
            return !this.multiple && this.clearable && !this.open && !this.isValueEmpty;
          } }, watch: { options: function(e3, t3) {
            var n2 = this;
            !this.taggable && ("function" == typeof n2.resetOnOptionsChange ? n2.resetOnOptionsChange(e3, t3, n2.selectedValue) : n2.resetOnOptionsChange) && this.clearSelection(), this.value && this.isTrackingValues && this.setInternalValueFromOptions(this.value);
          }, value: { immediate: true, handler: function(e3) {
            this.isTrackingValues && this.setInternalValueFromOptions(e3);
          } }, multiple: function() {
            this.clearSelection();
          }, open: function(e3) {
            this.$emit(e3 ? "open" : "close");
          }, search: function(e3) {
            e3.length && (this.open = true);
          } }, created: function() {
            this.mutableLoading = this.loading, this.$on("option:created", this.pushTag);
          }, methods: { setInternalValueFromOptions: function(e3) {
            var t3 = this;
            Array.isArray(e3) ? this.$data._value = e3.map(function(e4) {
              return t3.findOptionFromReducedValue(e4);
            }) : this.$data._value = this.findOptionFromReducedValue(e3);
          }, select: function(e3) {
            this.$emit("option:selecting", e3), this.isOptionSelected(e3) ? this.deselectFromDropdown && (this.clearable || this.multiple && this.selectedValue.length > 1) && this.deselect(e3) : (this.taggable && !this.optionExists(e3) && this.$emit("option:created", e3), this.multiple && (e3 = this.selectedValue.concat(e3)), this.updateValue(e3), this.$emit("option:selected", e3)), this.onAfterSelect(e3);
          }, deselect: function(e3) {
            var t3 = this;
            this.$emit("option:deselecting", e3), this.updateValue(this.selectedValue.filter(function(n2) {
              return !t3.optionComparator(n2, e3);
            })), this.$emit("option:deselected", e3);
          }, clearSelection: function() {
            this.updateValue(this.multiple ? [] : null);
          }, onAfterSelect: function(e3) {
            var t3 = this;
            this.closeOnSelect && (this.open = !this.open), this.clearSearchOnSelect && (this.search = ""), this.noDrop && this.multiple && this.$nextTick(function() {
              return t3.$refs.search.focus();
            });
          }, updateValue: function(e3) {
            var t3 = this;
            void 0 === this.value && (this.$data._value = e3), null !== e3 && (e3 = Array.isArray(e3) ? e3.map(function(e4) {
              return t3.reduce(e4);
            }) : this.reduce(e3)), this.$emit("input", e3);
          }, toggleDropdown: function(e3) {
            var n2 = e3.target !== this.searchEl;
            n2 && e3.preventDefault();
            var o2 = [].concat(t2()(this.$refs.deselectButtons || []), t2()([this.$refs.clearButton]));
            void 0 === this.searchEl || o2.filter(Boolean).some(function(t3) {
              return t3.contains(e3.target) || t3 === e3.target;
            }) ? e3.preventDefault() : this.open && n2 ? this.searchEl.blur() : this.disabled || (this.open = true, this.searchEl.focus());
          }, isOptionSelected: function(e3) {
            var t3 = this;
            return this.selectedValue.some(function(n2) {
              return t3.optionComparator(n2, e3);
            });
          }, isOptionDeselectable: function(e3) {
            return this.isOptionSelected(e3) && this.deselectFromDropdown;
          }, optionComparator: function(e3, t3) {
            return this.getOptionKey(e3) === this.getOptionKey(t3);
          }, findOptionFromReducedValue: function(e3) {
            var n2 = this, o2 = [].concat(t2()(this.options), t2()(this.pushedTags)).filter(function(t3) {
              return JSON.stringify(n2.reduce(t3)) === JSON.stringify(e3);
            });
            return 1 === o2.length ? o2[0] : o2.find(function(e4) {
              return n2.optionComparator(e4, n2.$data._value);
            }) || e3;
          }, closeSearchOptions: function() {
            this.open = false, this.$emit("search:blur");
          }, maybeDeleteValue: function() {
            if (!this.searchEl.value.length && this.selectedValue && this.selectedValue.length && this.clearable) {
              var e3 = null;
              this.multiple && (e3 = t2()(this.selectedValue.slice(0, this.selectedValue.length - 1))), this.updateValue(e3);
            }
          }, optionExists: function(e3) {
            var t3 = this;
            return this.optionList.some(function(n2) {
              return t3.optionComparator(n2, e3);
            });
          }, normalizeOptionForSlot: function(e3) {
            return "object" === s()(e3) ? e3 : a()({}, this.label, e3);
          }, pushTag: function(e3) {
            this.pushedTags.push(e3);
          }, onEscape: function() {
            this.search.length ? this.search = "" : this.open = false;
          }, onSearchBlur: function() {
            if (!this.mousedown || this.searching) {
              var e3 = this.clearSearchOnSelect, t3 = this.multiple;
              return this.clearSearchOnBlur({ clearSearchOnSelect: e3, multiple: t3 }) && (this.search = ""), void this.closeSearchOptions();
            }
            this.mousedown = false, 0 !== this.search.length || 0 !== this.options.length || this.closeSearchOptions();
          }, onSearchFocus: function() {
            this.open = true, this.$emit("search:focus");
          }, onMousedown: function() {
            this.mousedown = true;
          }, onMouseUp: function() {
            this.mousedown = false;
          }, onSearchKeyDown: function(e3) {
            var t3 = this, n2 = function(e4) {
              return e4.preventDefault(), !t3.isComposing && t3.typeAheadSelect();
            }, o2 = { 8: function(e4) {
              return t3.maybeDeleteValue();
            }, 9: function(e4) {
              return t3.onTab();
            }, 27: function(e4) {
              return t3.onEscape();
            }, 38: function(e4) {
              if (e4.preventDefault(), t3.open) return t3.typeAheadUp();
              t3.open = true;
            }, 40: function(e4) {
              if (e4.preventDefault(), t3.open) return t3.typeAheadDown();
              t3.open = true;
            } };
            this.selectOnKeyCodes.forEach(function(e4) {
              return o2[e4] = n2;
            });
            var i2 = this.mapKeydown(o2, this);
            if ("function" == typeof i2[e3.keyCode]) return i2[e3.keyCode](e3);
          }, onSearchKeyPress: function(e3) {
            this.open || 32 !== e3.keyCode || (e3.preventDefault(), this.open = true);
          } } }, function() {
            var e3 = this, t3 = e3.$createElement, n2 = e3._self._c || t3;
            return n2("div", { staticClass: "v-select", class: e3.stateClasses, attrs: { dir: e3.dir } }, [e3._t("header", null, null, e3.scope.header), e3._v(" "), n2("div", { ref: "toggle", staticClass: "vs__dropdown-toggle", attrs: { id: "vs" + e3.uid + "__combobox", role: "combobox", "aria-expanded": e3.dropdownOpen.toString(), "aria-owns": "vs" + e3.uid + "__listbox", "aria-controls": "vs" + e3.uid + "__listbox", "aria-label": "Search for option" }, on: { mousedown: function(t4) {
              return e3.toggleDropdown(t4);
            } } }, [n2("div", { ref: "selectedOptions", staticClass: "vs__selected-options" }, [e3._l(e3.selectedValue, function(t4) {
              return e3._t("selected-option-container", [n2("span", { key: e3.getOptionKey(t4), staticClass: "vs__selected" }, [e3._t("selected-option", [e3._v("\n            " + e3._s(e3.getOptionLabel(t4)) + "\n          ")], null, e3.normalizeOptionForSlot(t4)), e3._v(" "), e3.multiple ? n2("button", { ref: "deselectButtons", refInFor: true, staticClass: "vs__deselect", attrs: { disabled: e3.disabled, type: "button", title: "Deselect " + e3.getOptionLabel(t4), "aria-label": "Deselect " + e3.getOptionLabel(t4) }, on: { click: function(n3) {
                return e3.deselect(t4);
              } } }, [n2(e3.childComponents.Deselect, { tag: "component" })], 1) : e3._e()], 2)], { option: e3.normalizeOptionForSlot(t4), deselect: e3.deselect, multiple: e3.multiple, disabled: e3.disabled });
            }), e3._v(" "), e3._t("search", [n2("input", e3._g(e3._b({ staticClass: "vs__search" }, "input", e3.scope.search.attributes, false), e3.scope.search.events))], null, e3.scope.search)], 2), e3._v(" "), n2("div", { ref: "actions", staticClass: "vs__actions" }, [n2("button", { directives: [{ name: "show", rawName: "v-show", value: e3.showClearButton, expression: "showClearButton" }], ref: "clearButton", staticClass: "vs__clear", attrs: { disabled: e3.disabled, type: "button", title: "Clear Selected", "aria-label": "Clear Selected" }, on: { click: e3.clearSelection } }, [n2(e3.childComponents.Deselect, { tag: "component" })], 1), e3._v(" "), e3._t("open-indicator", [e3.noDrop ? e3._e() : n2(e3.childComponents.OpenIndicator, e3._b({ tag: "component" }, "component", e3.scope.openIndicator.attributes, false))], null, e3.scope.openIndicator), e3._v(" "), e3._t("spinner", [n2("div", { directives: [{ name: "show", rawName: "v-show", value: e3.mutableLoading, expression: "mutableLoading" }], staticClass: "vs__spinner" }, [e3._v("Loading...")])], null, e3.scope.spinner)], 2)]), e3._v(" "), n2("transition", { attrs: { name: e3.transition } }, [e3.dropdownOpen ? n2("ul", { directives: [{ name: "append-to-body", rawName: "v-append-to-body" }], key: "vs" + e3.uid + "__listbox", ref: "dropdownMenu", staticClass: "vs__dropdown-menu", attrs: { id: "vs" + e3.uid + "__listbox", role: "listbox", tabindex: "-1" }, on: { mousedown: function(t4) {
              return t4.preventDefault(), e3.onMousedown(t4);
            }, mouseup: e3.onMouseUp } }, [e3._t("list-header", null, null, e3.scope.listHeader), e3._v(" "), e3._l(e3.filteredOptions, function(t4, o2) {
              return n2("li", { key: e3.getOptionKey(t4), staticClass: "vs__dropdown-option", class: { "vs__dropdown-option--deselect": e3.isOptionDeselectable(t4) && o2 === e3.typeAheadPointer, "vs__dropdown-option--selected": e3.isOptionSelected(t4), "vs__dropdown-option--highlight": o2 === e3.typeAheadPointer, "vs__dropdown-option--disabled": !e3.selectable(t4) }, attrs: { id: "vs" + e3.uid + "__option-" + o2, role: "option", "aria-selected": o2 === e3.typeAheadPointer || null }, on: { mouseover: function(n3) {
                e3.selectable(t4) && (e3.typeAheadPointer = o2);
              }, click: function(n3) {
                n3.preventDefault(), n3.stopPropagation(), e3.selectable(t4) && e3.select(t4);
              } } }, [e3._t("option", [e3._v("\n          " + e3._s(e3.getOptionLabel(t4)) + "\n        ")], null, e3.normalizeOptionForSlot(t4))], 2);
            }), e3._v(" "), 0 === e3.filteredOptions.length ? n2("li", { staticClass: "vs__no-options" }, [e3._t("no-options", [e3._v("\n          Sorry, no matching options.\n        ")], null, e3.scope.noOptions)], 2) : e3._e(), e3._v(" "), e3._t("list-footer", null, null, e3.scope.listFooter)], 2) : n2("ul", { staticStyle: { display: "none", visibility: "hidden" }, attrs: { id: "vs" + e3.uid + "__listbox", role: "listbox" } })]), e3._v(" "), e3._t("footer", null, null, e3.scope.footer)], 2);
          }, []).exports, _ = { ajax: u, pointer: c, pointerScroll: l }, O = m;
        })(), o;
      })();
    });
  })(vueSelect$1);
  return vueSelect$1.exports;
}
var vueSelectExports = requireVueSelect();
const vSelect = /* @__PURE__ */ getDefaultExportFromCjs(vueSelectExports);
export {
  vSelect as v
};
//# sourceMappingURL=vue-select-BfyDRxDb.js.map
