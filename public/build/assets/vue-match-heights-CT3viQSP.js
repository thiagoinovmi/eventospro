import { g as getDefaultExportFromCjs } from "./mixins-DZWn0auj.js";
var vueMatchHeights$1 = { exports: {} };
/*!
 * vue-match-heights v0.1.0 
 * (c) 2018 Sam Turrell
 * Released under the MIT License.
 */
var vueMatchHeights = vueMatchHeights$1.exports;
var hasRequiredVueMatchHeights;
function requireVueMatchHeights() {
  if (hasRequiredVueMatchHeights) return vueMatchHeights$1.exports;
  hasRequiredVueMatchHeights = 1;
  (function(module, exports) {
    (function(global, factory) {
      module.exports = factory();
    })(vueMatchHeights, function() {
      function removeHeight(element) {
        element.style.removeProperty("height");
      }
      function removeHeights(selectors) {
        [].forEach.call(selectors, function(selector) {
          var elements = document.querySelectorAll(selector);
          [].forEach.call(elements, function(element) {
            removeHeight(element);
          });
        });
      }
      function getMinHeight(elements) {
        var min = 0;
        [].forEach.call(elements, function(element) {
          if (element.offsetHeight > min) {
            min = element.offsetHeight;
          }
        });
        return min;
      }
      function setHeight(selector) {
        var elements = document.querySelectorAll(selector);
        var height = getMinHeight(elements);
        [].forEach.call(elements, function(element) {
          element.style.height = height + "px";
        });
      }
      function shouldRun(rules) {
        var shouldRun2 = true;
        rules.forEach(function(rule) {
          var min = 0;
          var max = rule;
          if (typeof rule === "object") {
            var assign;
            assign = rule, min = assign[0], max = assign[1];
          }
          if (window.innerWidth > min && window.innerWidth < max) {
            shouldRun2 = false;
          }
        });
        return shouldRun2;
      }
      function matchHeights(selectors, disabled) {
        if (selectors === void 0) selectors = [];
        if (disabled === void 0) disabled = [];
        removeHeights(selectors);
        if (!shouldRun(disabled)) {
          return false;
        }
        selectors.forEach(setHeight);
      }
      function plugin(Vue, options) {
        if (options === void 0) options = {};
        Vue.directive("match-heights", {
          bind: function bind(el, binding) {
            function matchHeightsFunc() {
              matchHeights(binding.value.el, binding.value.disabled || options.disabled || []);
            }
            matchHeightsFunc();
            window.addEventListener("resize", matchHeightsFunc);
            Vue.nextTick(matchHeightsFunc);
          },
          inserted: function inserted(el, binding) {
            function matchHeightsFunc() {
              matchHeights(binding.value.el, binding.value.disabled || options.disabled || []);
            }
            [].forEach.call(document.querySelectorAll(binding.value.el), function(el2) {
              [].forEach.call(el2.querySelectorAll("img"), function(img) {
                img.addEventListener("load", matchHeightsFunc);
              });
            });
            el.addEventListener("matchheight", matchHeightsFunc, false);
            document.addEventListener("matchheight", matchHeightsFunc, false);
          },
          unbind: function unbind(el, binding) {
          }
        });
      }
      plugin.version = "0.1.0";
      if (typeof window !== "undefined" && window.Vue) {
        window.Vue.use(plugin);
      }
      return plugin;
    });
  })(vueMatchHeights$1);
  return vueMatchHeights$1.exports;
}
var vueMatchHeightsExports = requireVueMatchHeights();
const VueMatchHeights = /* @__PURE__ */ getDefaultExportFromCjs(vueMatchHeightsExports);
export {
  VueMatchHeights as V
};
//# sourceMappingURL=vue-match-heights-CT3viQSP.js.map
