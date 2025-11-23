import { g as getDefaultExportFromCjs, n as normalizeComponent, m as mixinsFilters, a as axios } from "./mixins-DsimpN2H.js";
var VueQrcodeReader_common = { exports: {} };
var hasRequiredVueQrcodeReader_common;
function requireVueQrcodeReader_common() {
  if (hasRequiredVueQrcodeReader_common) return VueQrcodeReader_common.exports;
  hasRequiredVueQrcodeReader_common = 1;
  (function(module) {
    module.exports = /******/
    function(modules) {
      var installedModules = {};
      function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
          return installedModules[moduleId].exports;
        }
        var module2 = installedModules[moduleId] = {
          /******/
          i: moduleId,
          /******/
          l: false,
          /******/
          exports: {}
          /******/
        };
        modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__);
        module2.l = true;
        return module2.exports;
      }
      __webpack_require__.m = modules;
      __webpack_require__.c = installedModules;
      __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
          Object.defineProperty(exports, name, { enumerable: true, get: getter });
        }
      };
      __webpack_require__.r = function(exports) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
        }
        Object.defineProperty(exports, "__esModule", { value: true });
      };
      __webpack_require__.t = function(value, mode) {
        if (mode & 1) value = __webpack_require__(value);
        if (mode & 8) return value;
        if (mode & 4 && typeof value === "object" && value && value.__esModule) return value;
        var ns = /* @__PURE__ */ Object.create(null);
        __webpack_require__.r(ns);
        Object.defineProperty(ns, "default", { enumerable: true, value });
        if (mode & 2 && typeof value != "string") for (var key in value) __webpack_require__.d(ns, key, (function(key2) {
          return value[key2];
        }).bind(null, key));
        return ns;
      };
      __webpack_require__.n = function(module2) {
        var getter = module2 && module2.__esModule ? (
          /******/
          function getDefault() {
            return module2["default"];
          }
        ) : (
          /******/
          function getModuleExports() {
            return module2;
          }
        );
        __webpack_require__.d(getter, "a", getter);
        return getter;
      };
      __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      __webpack_require__.p = "";
      return __webpack_require__(__webpack_require__.s = "fb15");
    }({
      /***/
      "00ee": (
        /***/
        function(module2, exports, __webpack_require__) {
          var wellKnownSymbol = __webpack_require__("b622");
          var TO_STRING_TAG = wellKnownSymbol("toStringTag");
          var test = {};
          test[TO_STRING_TAG] = "z";
          module2.exports = String(test) === "[object z]";
        }
      ),
      /***/
      "0366": (
        /***/
        function(module2, exports, __webpack_require__) {
          var aFunction = __webpack_require__("1c0b");
          module2.exports = function(fn, that, length) {
            aFunction(fn);
            if (that === void 0) return fn;
            switch (length) {
              case 0:
                return function() {
                  return fn.call(that);
                };
              case 1:
                return function(a) {
                  return fn.call(that, a);
                };
              case 2:
                return function(a, b) {
                  return fn.call(that, a, b);
                };
              case 3:
                return function(a, b, c) {
                  return fn.call(that, a, b, c);
                };
            }
            return function() {
              return fn.apply(that, arguments);
            };
          };
        }
      ),
      /***/
      "0538": (
        /***/
        function(module2, exports, __webpack_require__) {
          var aFunction = __webpack_require__("1c0b");
          var isObject = __webpack_require__("861d");
          var slice = [].slice;
          var factories = {};
          var construct = function(C, argsLength, args) {
            if (!(argsLength in factories)) {
              for (var list = [], i = 0; i < argsLength; i++) list[i] = "a[" + i + "]";
              factories[argsLength] = Function("C,a", "return new C(" + list.join(",") + ")");
            }
            return factories[argsLength](C, args);
          };
          module2.exports = Function.bind || function bind(that) {
            var fn = aFunction(this);
            var partArgs = slice.call(arguments, 1);
            var boundFunction = function bound() {
              var args = partArgs.concat(slice.call(arguments));
              return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
            };
            if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
            return boundFunction;
          };
        }
      ),
      /***/
      "057f": (
        /***/
        function(module2, exports, __webpack_require__) {
          var toIndexedObject = __webpack_require__("fc6a");
          var nativeGetOwnPropertyNames = __webpack_require__("241c").f;
          var toString = {}.toString;
          var windowNames = typeof window == "object" && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
          var getWindowNames = function(it) {
            try {
              return nativeGetOwnPropertyNames(it);
            } catch (error) {
              return windowNames.slice();
            }
          };
          module2.exports.f = function getOwnPropertyNames(it) {
            return windowNames && toString.call(it) == "[object Window]" ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
          };
        }
      ),
      /***/
      "06c5": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__.d(__webpack_exports__, "a", function() {
            return _unsupportedIterableToArray;
          });
          __webpack_require__("a630");
          __webpack_require__("fb6a");
          __webpack_require__("b0c0");
          __webpack_require__("d3b7");
          __webpack_require__("25f0");
          __webpack_require__("3ca3");
          var _arrayLikeToArray__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("6b75");
          function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_6__[
              /* default */
              "a"
            ])(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Object(_arrayLikeToArray__WEBPACK_IMPORTED_MODULE_6__[
              /* default */
              "a"
            ])(o, minLen);
          }
        }
      ),
      /***/
      "06cf": (
        /***/
        function(module2, exports, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var propertyIsEnumerableModule = __webpack_require__("d1e7");
          var createPropertyDescriptor = __webpack_require__("5c6c");
          var toIndexedObject = __webpack_require__("fc6a");
          var toPrimitive = __webpack_require__("c04e");
          var has = __webpack_require__("5135");
          var IE8_DOM_DEFINE = __webpack_require__("0cfb");
          var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
          exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
            O = toIndexedObject(O);
            P = toPrimitive(P, true);
            if (IE8_DOM_DEFINE) try {
              return nativeGetOwnPropertyDescriptor(O, P);
            } catch (error) {
            }
            if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
          };
        }
      ),
      /***/
      "0cfb": (
        /***/
        function(module2, exports, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var fails = __webpack_require__("d039");
          var createElement = __webpack_require__("cc12");
          module2.exports = !DESCRIPTORS && !fails(function() {
            return Object.defineProperty(createElement("div"), "a", {
              get: function() {
                return 7;
              }
            }).a != 7;
          });
        }
      ),
      /***/
      "0d0e": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          var render2 = function() {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", { staticClass: "qrcode-stream-wrapper" }, [_c("video", { directives: [{ name: "show", rawName: "v-show", value: _vm.shouldScan, expression: "shouldScan" }], ref: "video", staticClass: "qrcode-stream-camera", attrs: { "autoplay": "", "muted": "", "playsinline": "" }, domProps: { "muted": true } }), _c("canvas", { directives: [{ name: "show", rawName: "v-show", value: !_vm.shouldScan, expression: "!shouldScan" }], ref: "pauseFrame", staticClass: "qrcode-stream-camera" }), _c("canvas", { ref: "trackingLayer", staticClass: "qrcode-stream-overlay" }), _c("div", { staticClass: "qrcode-stream-overlay" }, [_vm._t("default")], 2)]);
          };
          var staticRenderFns = [];
          __webpack_require__("caad");
          __webpack_require__("d3b7");
          __webpack_require__("e6cf");
          __webpack_require__("96cf");
          var asyncToGenerator = __webpack_require__("1da1");
          var scanner = __webpack_require__("a180");
          function thinSquare(_ref) {
            var color = _ref.color;
            return function(location2, ctx) {
              var topLeftCorner = location2.topLeftCorner, topRightCorner = location2.topRightCorner, bottomLeftCorner = location2.bottomLeftCorner, bottomRightCorner = location2.bottomRightCorner;
              ctx.strokeStyle = color;
              ctx.beginPath();
              ctx.moveTo(topLeftCorner.x, topLeftCorner.y);
              ctx.lineTo(bottomLeftCorner.x, bottomLeftCorner.y);
              ctx.lineTo(bottomRightCorner.x, bottomRightCorner.y);
              ctx.lineTo(topRightCorner.x, topRightCorner.y);
              ctx.lineTo(topLeftCorner.x, topLeftCorner.y);
              ctx.closePath();
              ctx.stroke();
            };
          }
          __webpack_require__("4de4");
          __webpack_require__("4160");
          __webpack_require__("e260");
          __webpack_require__("3ca3");
          __webpack_require__("159b");
          __webpack_require__("ddb0");
          __webpack_require__("2b3d");
          __webpack_require__("a4d3");
          __webpack_require__("e439");
          __webpack_require__("dbb4");
          __webpack_require__("b64b");
          function _defineProperty(obj, key, value) {
            if (key in obj) {
              Object.defineProperty(obj, key, {
                value,
                enumerable: true,
                configurable: true,
                writable: true
              });
            } else {
              obj[key] = value;
            }
            return obj;
          }
          function ownKeys(object, enumerableOnly) {
            var keys = Object.keys(object);
            if (Object.getOwnPropertySymbols) {
              var symbols = Object.getOwnPropertySymbols(object);
              if (enumerableOnly) symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
              });
              keys.push.apply(keys, symbols);
            }
            return keys;
          }
          function _objectSpread2(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i] != null ? arguments[i] : {};
              if (i % 2) {
                ownKeys(Object(source), true).forEach(function(key) {
                  _defineProperty(target, key, source[key]);
                });
              } else if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
              } else {
                ownKeys(Object(source)).forEach(function(key) {
                  Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
                });
              }
            }
            return target;
          }
          function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
          }
          __webpack_require__("e01a");
          __webpack_require__("d28b");
          function _iterableToArrayLimit(arr, i) {
            if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = void 0;
            try {
              for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
              }
            } catch (err) {
              _d = true;
              _e = err;
            } finally {
              try {
                if (!_n && _i["return"] != null) _i["return"]();
              } finally {
                if (_d) throw _e;
              }
            }
            return _arr;
          }
          var unsupportedIterableToArray = __webpack_require__("06c5");
          function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function _slicedToArray(arr, i) {
            return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || Object(unsupportedIterableToArray[
              "a"
              /* default */
            ])(arr, i) || _nonIterableRest();
          }
          var classCallCheck = __webpack_require__("d4ec");
          function _defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          function _createClass(Constructor, protoProps, staticProps) {
            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
            return Constructor;
          }
          var errors = __webpack_require__("1cc0");
          var image_data = __webpack_require__("f718");
          var callforth = __webpack_require__("c036");
          __webpack_require__("99af");
          __webpack_require__("7db0");
          __webpack_require__("fb6a");
          __webpack_require__("45fc");
          __webpack_require__("b0c0");
          __webpack_require__("2532");
          var esm_typeof = __webpack_require__("53ca");
          __webpack_require__("13d5");
          __webpack_require__("4ec9");
          __webpack_require__("cca6");
          __webpack_require__("ac1f");
          __webpack_require__("25f0");
          __webpack_require__("8a79");
          __webpack_require__("466d");
          function extractVersion(uastring, expr, pos) {
            var match = uastring.match(expr);
            return match && match.length >= pos && parseInt(match[pos], 10);
          }
          function log() {
            if ((typeof window === "undefined" ? "undefined" : Object(esm_typeof[
              "a"
              /* default */
            ])(window)) === "object") {
              {
                return;
              }
            }
          }
          function deprecated(oldMethod, newMethod) {
            console.warn(oldMethod + " is deprecated, please use " + newMethod + " instead.");
          }
          function detectBrowser(window2) {
            var result = {
              browser: null,
              version: null
            };
            if (typeof window2 === "undefined" || !window2.navigator) {
              result.browser = "Not a browser.";
              return result;
            }
            var navigator2 = window2.navigator;
            if (navigator2.mozGetUserMedia) {
              result.browser = "firefox";
              result.version = extractVersion(navigator2.userAgent, /Firefox\/(\d+)\./, 1);
            } else if (navigator2.webkitGetUserMedia || window2.isSecureContext === false && window2.webkitRTCPeerConnection && !window2.RTCIceGatherer) {
              result.browser = "chrome";
              result.version = extractVersion(navigator2.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
            } else if (navigator2.mediaDevices && navigator2.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
              result.browser = "edge";
              result.version = extractVersion(navigator2.userAgent, /Edge\/(\d+).(\d+)$/, 2);
            } else if (window2.RTCPeerConnection && navigator2.userAgent.match(/AppleWebKit\/(\d+)\./)) {
              result.browser = "safari";
              result.version = extractVersion(navigator2.userAgent, /AppleWebKit\/(\d+)\./, 1);
              result.supportsUnifiedPlan = window2.RTCRtpTransceiver && "currentDirection" in window2.RTCRtpTransceiver.prototype;
            } else {
              result.browser = "Not a supported browser.";
              return result;
            }
            return result;
          }
          function isObject(val) {
            return Object.prototype.toString.call(val) === "[object Object]";
          }
          function compactObject(data) {
            if (!isObject(data)) {
              return data;
            }
            return Object.keys(data).reduce(function(accumulator, key) {
              var isObj = isObject(data[key]);
              var value = isObj ? compactObject(data[key]) : data[key];
              var isEmptyObject = isObj && !Object.keys(value).length;
              if (value === void 0 || isEmptyObject) {
                return accumulator;
              }
              return Object.assign(accumulator, _defineProperty({}, key, value));
            }, {});
          }
          var logging = log;
          function shimGetUserMedia(window2) {
            var navigator2 = window2 && window2.navigator;
            if (!navigator2.mediaDevices) {
              return;
            }
            var browserDetails = detectBrowser(window2);
            var constraintsToChrome_ = function constraintsToChrome_2(c) {
              if (Object(esm_typeof[
                "a"
                /* default */
              ])(c) !== "object" || c.mandatory || c.optional) {
                return c;
              }
              var cc = {};
              Object.keys(c).forEach(function(key) {
                if (key === "require" || key === "advanced" || key === "mediaSource") {
                  return;
                }
                var r = Object(esm_typeof[
                  "a"
                  /* default */
                ])(c[key]) === "object" ? c[key] : {
                  ideal: c[key]
                };
                if (r.exact !== void 0 && typeof r.exact === "number") {
                  r.min = r.max = r.exact;
                }
                var oldname_ = function oldname_2(prefix, name) {
                  if (prefix) {
                    return prefix + name.charAt(0).toUpperCase() + name.slice(1);
                  }
                  return name === "deviceId" ? "sourceId" : name;
                };
                if (r.ideal !== void 0) {
                  cc.optional = cc.optional || [];
                  var oc = {};
                  if (typeof r.ideal === "number") {
                    oc[oldname_("min", key)] = r.ideal;
                    cc.optional.push(oc);
                    oc = {};
                    oc[oldname_("max", key)] = r.ideal;
                    cc.optional.push(oc);
                  } else {
                    oc[oldname_("", key)] = r.ideal;
                    cc.optional.push(oc);
                  }
                }
                if (r.exact !== void 0 && typeof r.exact !== "number") {
                  cc.mandatory = cc.mandatory || {};
                  cc.mandatory[oldname_("", key)] = r.exact;
                } else {
                  ["min", "max"].forEach(function(mix) {
                    if (r[mix] !== void 0) {
                      cc.mandatory = cc.mandatory || {};
                      cc.mandatory[oldname_(mix, key)] = r[mix];
                    }
                  });
                }
              });
              if (c.advanced) {
                cc.optional = (cc.optional || []).concat(c.advanced);
              }
              return cc;
            };
            var shimConstraints_ = function shimConstraints_2(constraints, func) {
              if (browserDetails.version >= 61) {
                return func(constraints);
              }
              constraints = JSON.parse(JSON.stringify(constraints));
              if (constraints && Object(esm_typeof[
                "a"
                /* default */
              ])(constraints.audio) === "object") {
                var remap = function remap2(obj, a, b) {
                  if (a in obj && !(b in obj)) {
                    obj[b] = obj[a];
                    delete obj[a];
                  }
                };
                constraints = JSON.parse(JSON.stringify(constraints));
                remap(constraints.audio, "autoGainControl", "googAutoGainControl");
                remap(constraints.audio, "noiseSuppression", "googNoiseSuppression");
                constraints.audio = constraintsToChrome_(constraints.audio);
              }
              if (constraints && Object(esm_typeof[
                "a"
                /* default */
              ])(constraints.video) === "object") {
                var face = constraints.video.facingMode;
                face = face && (Object(esm_typeof[
                  "a"
                  /* default */
                ])(face) === "object" ? face : {
                  ideal: face
                });
                var getSupportedFacingModeLies = browserDetails.version < 66;
                if (face && (face.exact === "user" || face.exact === "environment" || face.ideal === "user" || face.ideal === "environment") && !(navigator2.mediaDevices.getSupportedConstraints && navigator2.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
                  delete constraints.video.facingMode;
                  var matches;
                  if (face.exact === "environment" || face.ideal === "environment") {
                    matches = ["back", "rear"];
                  } else if (face.exact === "user" || face.ideal === "user") {
                    matches = ["front"];
                  }
                  if (matches) {
                    return navigator2.mediaDevices.enumerateDevices().then(function(devices) {
                      devices = devices.filter(function(d) {
                        return d.kind === "videoinput";
                      });
                      var dev = devices.find(function(d) {
                        return matches.some(function(match) {
                          return d.label.toLowerCase().includes(match);
                        });
                      });
                      if (!dev && devices.length && matches.includes("back")) {
                        dev = devices[devices.length - 1];
                      }
                      if (dev) {
                        constraints.video.deviceId = face.exact ? {
                          exact: dev.deviceId
                        } : {
                          ideal: dev.deviceId
                        };
                      }
                      constraints.video = constraintsToChrome_(constraints.video);
                      logging("chrome: " + JSON.stringify(constraints));
                      return func(constraints);
                    });
                  }
                }
                constraints.video = constraintsToChrome_(constraints.video);
              }
              logging("chrome: " + JSON.stringify(constraints));
              return func(constraints);
            };
            var shimError_ = function shimError_2(e) {
              if (browserDetails.version >= 64) {
                return e;
              }
              return {
                name: {
                  PermissionDeniedError: "NotAllowedError",
                  PermissionDismissedError: "NotAllowedError",
                  InvalidStateError: "NotAllowedError",
                  DevicesNotFoundError: "NotFoundError",
                  ConstraintNotSatisfiedError: "OverconstrainedError",
                  TrackStartError: "NotReadableError",
                  MediaDeviceFailedDueToShutdown: "NotAllowedError",
                  MediaDeviceKillSwitchOn: "NotAllowedError",
                  TabCaptureError: "AbortError",
                  ScreenCaptureError: "AbortError",
                  DeviceCaptureError: "AbortError"
                }[e.name] || e.name,
                message: e.message,
                constraint: e.constraint || e.constraintName,
                toString: function toString() {
                  return this.name + (this.message && ": ") + this.message;
                }
              };
            };
            var getUserMedia_ = function getUserMedia_2(constraints, onSuccess, onError) {
              shimConstraints_(constraints, function(c) {
                navigator2.webkitGetUserMedia(c, onSuccess, function(e) {
                  if (onError) {
                    onError(shimError_(e));
                  }
                });
              });
            };
            navigator2.getUserMedia = getUserMedia_.bind(navigator2);
            if (navigator2.mediaDevices.getUserMedia) {
              var origGetUserMedia = navigator2.mediaDevices.getUserMedia.bind(navigator2.mediaDevices);
              navigator2.mediaDevices.getUserMedia = function(cs) {
                return shimConstraints_(cs, function(c) {
                  return origGetUserMedia(c).then(function(stream) {
                    if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
                      stream.getTracks().forEach(function(track) {
                        track.stop();
                      });
                      throw new DOMException("", "NotFoundError");
                    }
                    return stream;
                  }, function(e) {
                    return Promise.reject(shimError_(e));
                  });
                });
              };
            }
          }
          function getusermedia_shimGetUserMedia(window2) {
            var navigator2 = window2 && window2.navigator;
            var shimError_ = function shimError_2(e) {
              return {
                name: {
                  PermissionDeniedError: "NotAllowedError"
                }[e.name] || e.name,
                message: e.message,
                constraint: e.constraint,
                toString: function toString() {
                  return this.name;
                }
              };
            };
            var origGetUserMedia = navigator2.mediaDevices.getUserMedia.bind(navigator2.mediaDevices);
            navigator2.mediaDevices.getUserMedia = function(c) {
              return origGetUserMedia(c).catch(function(e) {
                return Promise.reject(shimError_(e));
              });
            };
          }
          function firefox_getusermedia_shimGetUserMedia(window2) {
            var browserDetails = detectBrowser(window2);
            var navigator2 = window2 && window2.navigator;
            var MediaStreamTrack = window2 && window2.MediaStreamTrack;
            navigator2.getUserMedia = function(constraints, onSuccess, onError) {
              deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia");
              navigator2.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
            };
            if (!(browserDetails.version > 55 && "autoGainControl" in navigator2.mediaDevices.getSupportedConstraints())) {
              var remap = function remap2(obj, a, b) {
                if (a in obj && !(b in obj)) {
                  obj[b] = obj[a];
                  delete obj[a];
                }
              };
              var nativeGetUserMedia = navigator2.mediaDevices.getUserMedia.bind(navigator2.mediaDevices);
              navigator2.mediaDevices.getUserMedia = function(c) {
                if (Object(esm_typeof[
                  "a"
                  /* default */
                ])(c) === "object" && Object(esm_typeof[
                  "a"
                  /* default */
                ])(c.audio) === "object") {
                  c = JSON.parse(JSON.stringify(c));
                  remap(c.audio, "autoGainControl", "mozAutoGainControl");
                  remap(c.audio, "noiseSuppression", "mozNoiseSuppression");
                }
                return nativeGetUserMedia(c);
              };
              if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
                var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
                MediaStreamTrack.prototype.getSettings = function() {
                  var obj = nativeGetSettings.apply(this, arguments);
                  remap(obj, "mozAutoGainControl", "autoGainControl");
                  remap(obj, "mozNoiseSuppression", "noiseSuppression");
                  return obj;
                };
              }
              if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
                var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
                MediaStreamTrack.prototype.applyConstraints = function(c) {
                  if (this.kind === "audio" && Object(esm_typeof[
                    "a"
                    /* default */
                  ])(c) === "object") {
                    c = JSON.parse(JSON.stringify(c));
                    remap(c, "autoGainControl", "mozAutoGainControl");
                    remap(c, "noiseSuppression", "mozNoiseSuppression");
                  }
                  return nativeApplyConstraints.apply(this, [c]);
                };
              }
            }
          }
          __webpack_require__("c975");
          __webpack_require__("a434");
          function safari_shim_shimGetUserMedia(window2) {
            var navigator2 = window2 && window2.navigator;
            if (navigator2.mediaDevices && navigator2.mediaDevices.getUserMedia) {
              var mediaDevices = navigator2.mediaDevices;
              var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
              navigator2.mediaDevices.getUserMedia = function(constraints) {
                return _getUserMedia(shimConstraints(constraints));
              };
            }
            if (!navigator2.getUserMedia && navigator2.mediaDevices && navigator2.mediaDevices.getUserMedia) {
              navigator2.getUserMedia = (function getUserMedia(constraints, cb, errcb) {
                navigator2.mediaDevices.getUserMedia(constraints).then(cb, errcb);
              }).bind(navigator2);
            }
          }
          function shimConstraints(constraints) {
            if (constraints && constraints.video !== void 0) {
              return Object.assign({}, constraints, {
                video: compactObject(constraints.video)
              });
            }
            return constraints;
          }
          var indempotent = function indempotent2(action) {
            var called = false;
            var result = void 0;
            return function() {
              if (called) {
                return result;
              } else {
                result = action.apply(void 0, arguments);
                called = true;
                return result;
              }
            };
          };
          var misc_shimGetUserMedia = indempotent(function() {
            var _detectBrowser = detectBrowser(window), browser = _detectBrowser.browser;
            switch (browser) {
              case "chrome":
                shimGetUserMedia(window);
                break;
              case "firefox":
                firefox_getusermedia_shimGetUserMedia(window);
                break;
              case "edge":
                getusermedia_shimGetUserMedia(window);
                break;
              case "safari":
                safari_shim_shimGetUserMedia(window);
                break;
              default:
                throw new errors[
                  "d"
                  /* StreamApiNotSupportedError */
                ]();
            }
          });
          var camera_Camera = /* @__PURE__ */ function() {
            function Camera(videoEl, stream) {
              Object(classCallCheck[
                "a"
                /* default */
              ])(this, Camera);
              this.videoEl = videoEl;
              this.stream = stream;
            }
            _createClass(Camera, [{
              key: "stop",
              value: function stop() {
                var _this = this;
                this.videoEl.srcObject = null;
                this.stream.getTracks().forEach(function(track) {
                  _this.stream.removeTrack(track);
                  track.stop();
                });
              }
            }, {
              key: "captureFrame",
              value: function captureFrame() {
                return Object(image_data[
                  "c"
                  /* imageDataFromVideo */
                ])(this.videoEl);
              }
            }, {
              key: "getCapabilities",
              value: function getCapabilities() {
                var _track$getCapabilitie, _track$getCapabilitie2;
                var _this$stream$getVideo = this.stream.getVideoTracks(), _this$stream$getVideo2 = _slicedToArray(_this$stream$getVideo, 1), track = _this$stream$getVideo2[0];
                return (_track$getCapabilitie = track === null || track === void 0 ? void 0 : (_track$getCapabilitie2 = track.getCapabilities) === null || _track$getCapabilitie2 === void 0 ? void 0 : _track$getCapabilitie2.call(track)) !== null && _track$getCapabilitie !== void 0 ? _track$getCapabilitie : {};
              }
            }]);
            return Camera;
          }();
          var narrowDownFacingMode = /* @__PURE__ */ function() {
            var _ref = Object(asyncToGenerator[
              "a"
              /* default */
            ])(/* @__PURE__ */ regeneratorRuntime.mark(function _callee(camera) {
              var devices, frontCamera, rearCamera;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return navigator.mediaDevices.enumerateDevices();
                    case 2:
                      devices = _context.sent.filter(function(_ref2) {
                        var kind = _ref2.kind;
                        return kind === "videoinput";
                      });
                      if (!(devices.length > 2)) {
                        _context.next = 15;
                        break;
                      }
                      frontCamera = devices[0];
                      rearCamera = devices[devices.length - 1];
                      _context.t0 = camera;
                      _context.next = _context.t0 === "auto" ? 9 : _context.t0 === "rear" ? 10 : _context.t0 === "front" ? 11 : 12;
                      break;
                    case 9:
                      return _context.abrupt("return", {
                        deviceId: {
                          exact: rearCamera.deviceId
                        }
                      });
                    case 10:
                      return _context.abrupt("return", {
                        deviceId: {
                          exact: rearCamera.deviceId
                        }
                      });
                    case 11:
                      return _context.abrupt("return", {
                        deviceId: {
                          exact: frontCamera.deviceId
                        }
                      });
                    case 12:
                      return _context.abrupt("return", void 0);
                    case 13:
                      _context.next = 22;
                      break;
                    case 15:
                      _context.t1 = camera;
                      _context.next = _context.t1 === "auto" ? 18 : _context.t1 === "rear" ? 19 : _context.t1 === "front" ? 20 : 21;
                      break;
                    case 18:
                      return _context.abrupt("return", {
                        facingMode: {
                          ideal: "environment"
                        }
                      });
                    case 19:
                      return _context.abrupt("return", {
                        facingMode: {
                          exact: "environment"
                        }
                      });
                    case 20:
                      return _context.abrupt("return", {
                        facingMode: {
                          exact: "user"
                        }
                      });
                    case 21:
                      return _context.abrupt("return", void 0);
                    case 22:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));
            return function narrowDownFacingMode2(_x) {
              return _ref.apply(this, arguments);
            };
          }();
          var misc_camera = function(_x2, _x3) {
            return _ref4.apply(this, arguments);
          };
          function _ref4() {
            _ref4 = Object(asyncToGenerator[
              "a"
              /* default */
            ])(/* @__PURE__ */ regeneratorRuntime.mark(function _callee2(videoEl, _ref3) {
              var _navigator, _navigator$mediaDevic;
              var camera, torch, constraints, stream, _stream$getVideoTrack, _stream$getVideoTrack2, track, capabilities;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      camera = _ref3.camera, torch = _ref3.torch;
                      if (!(window.isSecureContext !== true)) {
                        _context2.next = 3;
                        break;
                      }
                      throw new errors[
                        "c"
                        /* InsecureContextError */
                      ]();
                    case 3:
                      if (!(((_navigator = navigator) === null || _navigator === void 0 ? void 0 : (_navigator$mediaDevic = _navigator.mediaDevices) === null || _navigator$mediaDevic === void 0 ? void 0 : _navigator$mediaDevic.getUserMedia) === void 0)) {
                        _context2.next = 5;
                        break;
                      }
                      throw new errors[
                        "d"
                        /* StreamApiNotSupportedError */
                      ]();
                    case 5:
                      _context2.next = 7;
                      return misc_shimGetUserMedia();
                    case 7:
                      _context2.t0 = _objectSpread2;
                      _context2.t1 = {
                        width: {
                          min: 360,
                          ideal: 640,
                          max: 1920
                        },
                        height: {
                          min: 240,
                          ideal: 480,
                          max: 1080
                        }
                      };
                      _context2.next = 11;
                      return narrowDownFacingMode(camera);
                    case 11:
                      _context2.t2 = _context2.sent;
                      _context2.t3 = (0, _context2.t0)(_context2.t1, _context2.t2);
                      constraints = {
                        audio: false,
                        video: _context2.t3
                      };
                      _context2.next = 16;
                      return navigator.mediaDevices.getUserMedia(constraints);
                    case 16:
                      stream = _context2.sent;
                      if (videoEl.srcObject !== void 0) {
                        videoEl.srcObject = stream;
                      } else if (videoEl.mozSrcObject !== void 0) {
                        videoEl.mozSrcObject = stream;
                      } else if (window.URL.createObjectURL) {
                        videoEl.src = window.URL.createObjectURL(stream);
                      } else if (window.webkitURL) {
                        videoEl.src = window.webkitURL.createObjectURL(stream);
                      } else {
                        videoEl.src = stream;
                      }
                      _context2.next = 20;
                      return Object(callforth[
                        "a"
                        /* eventOn */
                      ])(videoEl, "loadeddata");
                    case 20:
                      _context2.next = 22;
                      return Object(callforth[
                        "b"
                        /* timeout */
                      ])(500);
                    case 22:
                      if (torch) {
                        _stream$getVideoTrack = stream.getVideoTracks(), _stream$getVideoTrack2 = _slicedToArray(_stream$getVideoTrack, 1), track = _stream$getVideoTrack2[0];
                        capabilities = track.getCapabilities();
                        if (capabilities.torch) {
                          track.applyConstraints({
                            advanced: [{
                              torch: true
                            }]
                          });
                        } else {
                          console.warn("device does not support torch capability");
                        }
                      }
                      return _context2.abrupt("return", new camera_Camera(videoEl, stream));
                    case 24:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));
            return _ref4.apply(this, arguments);
          }
          var CommonAPI = __webpack_require__("b3af");
          var jsqr = __webpack_require__("3c85");
          var QrcodeStreamvue_type_script_lang_js_ = {
            name: "qrcode-stream",
            mixins: [CommonAPI[
              "a"
              /* default */
            ]],
            props: {
              camera: {
                type: String,
                default: "auto",
                validator: function validator(camera) {
                  return ["auto", "rear", "front", "off"].includes(camera);
                }
              },
              torch: {
                type: Boolean,
                default: false
              },
              track: {
                type: [Function, Boolean],
                default: true
              },
              worker: {
                type: Function,
                default: jsqr[
                  "a"
                  /* default */
                ]
              }
            },
            data: function data() {
              return {
                cameraInstance: null,
                destroyed: false,
                stopScanning: function stopScanning() {
                }
              };
            },
            computed: {
              shouldStream: function shouldStream() {
                return this.destroyed === false && this.camera !== "off";
              },
              shouldScan: function shouldScan() {
                return this.shouldStream === true && this.cameraInstance !== null;
              },
              /**
               * Minimum delay in milliseconds between frames to be scanned. Don't scan
               * so often when visual tracking is disabled to improve performance.
               */
              scanInterval: function scanInterval() {
                if (this.track === false) {
                  return 500;
                } else {
                  return 40;
                }
              },
              trackRepaintFunction: function trackRepaintFunction() {
                if (this.track === true) {
                  return thinSquare({
                    color: "#ff0000"
                  });
                } else if (this.track === false) {
                  return void 0;
                } else {
                  return this.track;
                }
              }
            },
            watch: {
              shouldStream: function shouldStream(_shouldStream) {
                if (!_shouldStream) {
                  var frame = this.cameraInstance.captureFrame();
                  this.paintPauseFrame(frame);
                }
              },
              shouldScan: function shouldScan(_shouldScan) {
                if (_shouldScan) {
                  this.clearPauseFrame();
                  this.clearTrackingLayer();
                  this.startScanning();
                } else {
                  this.stopScanning();
                }
              },
              torch: function torch() {
                this.init();
              },
              camera: function camera() {
                this.init();
              }
            },
            mounted: function mounted() {
              this.init();
            },
            beforeDestroy: function beforeDestroy() {
              this.beforeResetCamera();
              this.stopScanning();
              this.destroyed = true;
            },
            methods: {
              init: function init() {
                var _this = this;
                var promise = Object(asyncToGenerator[
                  "a"
                  /* default */
                ])(/* @__PURE__ */ regeneratorRuntime.mark(function _callee() {
                  var capabilities;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _this.beforeResetCamera();
                          if (!(_this.camera === "off")) {
                            _context.next = 6;
                            break;
                          }
                          _this.cameraInstance = null;
                          return _context.abrupt("return", {
                            capabilities: {}
                          });
                        case 6:
                          _context.next = 8;
                          return misc_camera(_this.$refs.video, {
                            camera: _this.camera,
                            torch: _this.torch
                          });
                        case 8:
                          _this.cameraInstance = _context.sent;
                          capabilities = _this.cameraInstance.getCapabilities();
                          if (_this.destroyed) {
                            _this.cameraInstance.stop();
                          }
                          return _context.abrupt("return", {
                            capabilities
                          });
                        case 12:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }))();
                this.$emit("init", promise);
              },
              startScanning: function startScanning() {
                var _this2 = this;
                var detectHandler = function detectHandler2(result) {
                  _this2.onDetect(Promise.resolve(result));
                };
                this.stopScanning = Object(scanner[
                  "a"
                  /* keepScanning */
                ])(this.worker, this.cameraInstance, {
                  detectHandler,
                  locateHandler: this.onLocate,
                  minDelay: this.scanInterval
                });
              },
              beforeResetCamera: function beforeResetCamera() {
                if (this.cameraInstance !== null) {
                  this.cameraInstance.stop();
                  this.cameraInstance = null;
                }
              },
              onLocate: function onLocate(location2) {
                if (this.trackRepaintFunction === void 0 || location2 === null) {
                  this.clearTrackingLayer();
                } else {
                  this.repaintTrackingLayer(location2);
                }
              },
              repaintTrackingLayer: function repaintTrackingLayer(location2) {
                var _this3 = this;
                var video = this.$refs.video;
                var canvas = this.$refs.trackingLayer;
                var ctx = canvas.getContext("2d");
                var displayWidth = video.offsetWidth;
                var displayHeight = video.offsetHeight;
                var resolutionWidth = video.videoWidth;
                var resolutionHeight = video.videoHeight;
                var largerRatio = Math.max(displayWidth / resolutionWidth, displayHeight / resolutionHeight);
                var uncutWidth = resolutionWidth * largerRatio;
                var uncutHeight = resolutionHeight * largerRatio;
                var xScalar = uncutWidth / resolutionWidth;
                var yScalar = uncutHeight / resolutionHeight;
                var xOffset = (displayWidth - uncutWidth) / 2;
                var yOffset = (displayHeight - uncutHeight) / 2;
                var coordinatesAdjusted = {};
                for (var key in location2) {
                  coordinatesAdjusted[key] = {
                    x: Math.floor(location2[key].x * xScalar + xOffset),
                    y: Math.floor(location2[key].y * yScalar + yOffset)
                  };
                }
                window.requestAnimationFrame(function() {
                  canvas.width = displayWidth;
                  canvas.height = displayHeight;
                  _this3.trackRepaintFunction(coordinatesAdjusted, ctx);
                });
              },
              clearTrackingLayer: function clearTrackingLayer() {
                var canvas = this.$refs.trackingLayer;
                var ctx = canvas.getContext("2d");
                window.requestAnimationFrame(function() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                });
              },
              paintPauseFrame: function paintPauseFrame(imageData) {
                var canvas = this.$refs.pauseFrame;
                var ctx = canvas.getContext("2d");
                window.requestAnimationFrame(function() {
                  canvas.width = imageData.width;
                  canvas.height = imageData.height;
                  ctx.putImageData(imageData, 0, 0);
                });
              },
              clearPauseFrame: function clearPauseFrame() {
                var canvas = this.$refs.pauseFrame;
                var ctx = canvas.getContext("2d");
                window.requestAnimationFrame(function() {
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                });
              }
            }
          };
          var components_QrcodeStreamvue_type_script_lang_js_ = QrcodeStreamvue_type_script_lang_js_;
          __webpack_require__("c244");
          var componentNormalizer = __webpack_require__("2877");
          var component = Object(componentNormalizer[
            "a"
            /* default */
          ])(
            components_QrcodeStreamvue_type_script_lang_js_,
            render2,
            staticRenderFns,
            false,
            null,
            "7a81005d",
            null
          );
          __webpack_exports__["a"] = component.exports;
        }
      ),
      /***/
      "0d3b": (
        /***/
        function(module2, exports, __webpack_require__) {
          var fails = __webpack_require__("d039");
          var wellKnownSymbol = __webpack_require__("b622");
          var IS_PURE = __webpack_require__("c430");
          var ITERATOR = wellKnownSymbol("iterator");
          module2.exports = !fails(function() {
            var url = new URL("b?a=1&b=2&c=3", "http://a");
            var searchParams = url.searchParams;
            var result = "";
            url.pathname = "c%20d";
            searchParams.forEach(function(value, key) {
              searchParams["delete"]("b");
              result += key + value;
            });
            return IS_PURE && !url.toJSON || !searchParams.sort || url.href !== "http://a/c%20d?a=1&c=3" || searchParams.get("c") !== "3" || String(new URLSearchParams("?a=1")) !== "a=1" || !searchParams[ITERATOR] || new URL("https://a@b").username !== "a" || new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" || new URL("http://тест").host !== "xn--e1aybc" || new URL("http://a#б").hash !== "#%D0%B1" || result !== "a1c3" || new URL("http://x", void 0).host !== "x";
          });
        }
      ),
      /***/
      "131a": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var setPrototypeOf = __webpack_require__("d2bb");
          $({ target: "Object", stat: true }, {
            setPrototypeOf
          });
        }
      ),
      /***/
      "13d5": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var $reduce = __webpack_require__("d58f").left;
          var arrayMethodIsStrict = __webpack_require__("a640");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var STRICT_METHOD = arrayMethodIsStrict("reduce");
          var USES_TO_LENGTH = arrayMethodUsesToLength("reduce", { 1: 0 });
          $({ target: "Array", proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
            reduce: function reduce(callbackfn) {
              return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
        }
      ),
      /***/
      "14c3": (
        /***/
        function(module2, exports, __webpack_require__) {
          var classof = __webpack_require__("c6b6");
          var regexpExec = __webpack_require__("9263");
          module2.exports = function(R, S) {
            var exec = R.exec;
            if (typeof exec === "function") {
              var result = exec.call(R, S);
              if (typeof result !== "object") {
                throw TypeError("RegExp exec method returned something other than an Object or null");
              }
              return result;
            }
            if (classof(R) !== "RegExp") {
              throw TypeError("RegExp#exec called on incompatible receiver");
            }
            return regexpExec.call(R, S);
          };
        }
      ),
      /***/
      "159b": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          var DOMIterables = __webpack_require__("fdbc");
          var forEach = __webpack_require__("17c2");
          var createNonEnumerableProperty = __webpack_require__("9112");
          for (var COLLECTION_NAME in DOMIterables) {
            var Collection = global[COLLECTION_NAME];
            var CollectionPrototype = Collection && Collection.prototype;
            if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
              createNonEnumerableProperty(CollectionPrototype, "forEach", forEach);
            } catch (error) {
              CollectionPrototype.forEach = forEach;
            }
          }
        }
      ),
      /***/
      "17c2": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $forEach = __webpack_require__("b727").forEach;
          var arrayMethodIsStrict = __webpack_require__("a640");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var STRICT_METHOD = arrayMethodIsStrict("forEach");
          var USES_TO_LENGTH = arrayMethodUsesToLength("forEach");
          module2.exports = !STRICT_METHOD || !USES_TO_LENGTH ? function forEach(callbackfn) {
            return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
          } : [].forEach;
        }
      ),
      /***/
      "19aa": (
        /***/
        function(module2, exports) {
          module2.exports = function(it, Constructor, name) {
            if (!(it instanceof Constructor)) {
              throw TypeError("Incorrect " + (name ? name + " " : "") + "invocation");
            }
            return it;
          };
        }
      ),
      /***/
      "1be4": (
        /***/
        function(module2, exports, __webpack_require__) {
          var getBuiltIn = __webpack_require__("d066");
          module2.exports = getBuiltIn("document", "documentElement");
        }
      ),
      /***/
      "1c0b": (
        /***/
        function(module2, exports) {
          module2.exports = function(it) {
            if (typeof it != "function") {
              throw TypeError(String(it) + " is not a function");
            }
            return it;
          };
        }
      ),
      /***/
      "1c7e": (
        /***/
        function(module2, exports, __webpack_require__) {
          var wellKnownSymbol = __webpack_require__("b622");
          var ITERATOR = wellKnownSymbol("iterator");
          var SAFE_CLOSING = false;
          try {
            var called = 0;
            var iteratorWithReturn = {
              next: function() {
                return { done: !!called++ };
              },
              "return": function() {
                SAFE_CLOSING = true;
              }
            };
            iteratorWithReturn[ITERATOR] = function() {
              return this;
            };
            Array.from(iteratorWithReturn, function() {
              throw 2;
            });
          } catch (error) {
          }
          module2.exports = function(exec, SKIP_CLOSING) {
            if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
            var ITERATION_SUPPORT = false;
            try {
              var object = {};
              object[ITERATOR] = function() {
                return {
                  next: function() {
                    return { done: ITERATION_SUPPORT = true };
                  }
                };
              };
              exec(object);
            } catch (error) {
            }
            return ITERATION_SUPPORT;
          };
        }
      ),
      /***/
      "1cc0": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__.d(__webpack_exports__, "b", function() {
            return (
              /* binding */
              errors_DropImageFetchError
            );
          });
          __webpack_require__.d(__webpack_exports__, "a", function() {
            return (
              /* binding */
              errors_DropImageDecodeError
            );
          });
          __webpack_require__.d(__webpack_exports__, "d", function() {
            return (
              /* binding */
              errors_StreamApiNotSupportedError
            );
          });
          __webpack_require__.d(__webpack_exports__, "c", function() {
            return (
              /* binding */
              errors_InsecureContextError
            );
          });
          __webpack_require__("b0c0");
          var classCallCheck = __webpack_require__("d4ec");
          __webpack_require__("131a");
          function _setPrototypeOf(o, p) {
            _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
              o2.__proto__ = p2;
              return o2;
            };
            return _setPrototypeOf(o, p);
          }
          function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
              throw new TypeError("Super expression must either be null or a function");
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
              constructor: {
                value: subClass,
                writable: true,
                configurable: true
              }
            });
            if (superClass) _setPrototypeOf(subClass, superClass);
          }
          __webpack_require__("4ae1");
          __webpack_require__("3410");
          function _getPrototypeOf(o) {
            _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
              return o2.__proto__ || Object.getPrototypeOf(o2);
            };
            return _getPrototypeOf(o);
          }
          __webpack_require__("d3b7");
          __webpack_require__("25f0");
          function _isNativeReflectConstruct() {
            if (typeof Reflect === "undefined" || !Reflect.construct) return false;
            if (Reflect.construct.sham) return false;
            if (typeof Proxy === "function") return true;
            try {
              Date.prototype.toString.call(Reflect.construct(Date, [], function() {
              }));
              return true;
            } catch (e) {
              return false;
            }
          }
          var esm_typeof = __webpack_require__("53ca");
          function _assertThisInitialized(self2) {
            if (self2 === void 0) {
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return self2;
          }
          function _possibleConstructorReturn(self2, call) {
            if (call && (Object(esm_typeof[
              "a"
              /* default */
            ])(call) === "object" || typeof call === "function")) {
              return call;
            }
            return _assertThisInitialized(self2);
          }
          function _createSuper(Derived) {
            var hasNativeReflectConstruct = _isNativeReflectConstruct();
            return function _createSuperInternal() {
              var Super = _getPrototypeOf(Derived), result;
              if (hasNativeReflectConstruct) {
                var NewTarget = _getPrototypeOf(this).constructor;
                result = Reflect.construct(Super, arguments, NewTarget);
              } else {
                result = Super.apply(this, arguments);
              }
              return _possibleConstructorReturn(this, result);
            };
          }
          __webpack_require__("e260");
          __webpack_require__("4ec9");
          __webpack_require__("3ca3");
          __webpack_require__("ddb0");
          __webpack_require__("c975");
          function _isNativeFunction(fn) {
            return Function.toString.call(fn).indexOf("[native code]") !== -1;
          }
          function construct_construct(Parent, args, Class) {
            if (_isNativeReflectConstruct()) {
              construct_construct = Reflect.construct;
            } else {
              construct_construct = function _construct(Parent2, args2, Class2) {
                var a = [null];
                a.push.apply(a, args2);
                var Constructor = Function.bind.apply(Parent2, a);
                var instance = new Constructor();
                if (Class2) _setPrototypeOf(instance, Class2.prototype);
                return instance;
              };
            }
            return construct_construct.apply(null, arguments);
          }
          function wrapNativeSuper_wrapNativeSuper(Class) {
            var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
            wrapNativeSuper_wrapNativeSuper = function _wrapNativeSuper(Class2) {
              if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
              if (typeof Class2 !== "function") {
                throw new TypeError("Super expression must either be null or a function");
              }
              if (typeof _cache !== "undefined") {
                if (_cache.has(Class2)) return _cache.get(Class2);
                _cache.set(Class2, Wrapper);
              }
              function Wrapper() {
                return construct_construct(Class2, arguments, _getPrototypeOf(this).constructor);
              }
              Wrapper.prototype = Object.create(Class2.prototype, {
                constructor: {
                  value: Wrapper,
                  enumerable: false,
                  writable: true,
                  configurable: true
                }
              });
              return _setPrototypeOf(Wrapper, Class2);
            };
            return wrapNativeSuper_wrapNativeSuper(Class);
          }
          var errors_DropImageFetchError = /* @__PURE__ */ function(_Error) {
            _inherits(DropImageFetchError, _Error);
            var _super = _createSuper(DropImageFetchError);
            function DropImageFetchError() {
              var _this;
              Object(classCallCheck[
                "a"
                /* default */
              ])(this, DropImageFetchError);
              _this = _super.call(this, "can't process cross-origin image");
              _this.name = "DropImageFetchError";
              return _this;
            }
            return DropImageFetchError;
          }(/* @__PURE__ */ wrapNativeSuper_wrapNativeSuper(Error));
          var errors_DropImageDecodeError = /* @__PURE__ */ function(_Error2) {
            _inherits(DropImageDecodeError, _Error2);
            var _super2 = _createSuper(DropImageDecodeError);
            function DropImageDecodeError() {
              var _this2;
              Object(classCallCheck[
                "a"
                /* default */
              ])(this, DropImageDecodeError);
              _this2 = _super2.call(this, "drag-and-dropped file is not of type image and can't be decoded");
              _this2.name = "DropImageDecodeError";
              return _this2;
            }
            return DropImageDecodeError;
          }(/* @__PURE__ */ wrapNativeSuper_wrapNativeSuper(Error));
          var errors_StreamApiNotSupportedError = /* @__PURE__ */ function(_Error3) {
            _inherits(StreamApiNotSupportedError, _Error3);
            var _super3 = _createSuper(StreamApiNotSupportedError);
            function StreamApiNotSupportedError() {
              var _this3;
              Object(classCallCheck[
                "a"
                /* default */
              ])(this, StreamApiNotSupportedError);
              _this3 = _super3.call(this, "this browser has no Stream API support");
              _this3.name = "StreamApiNotSupportedError";
              return _this3;
            }
            return StreamApiNotSupportedError;
          }(/* @__PURE__ */ wrapNativeSuper_wrapNativeSuper(Error));
          var errors_InsecureContextError = /* @__PURE__ */ function(_Error4) {
            _inherits(InsecureContextError, _Error4);
            var _super4 = _createSuper(InsecureContextError);
            function InsecureContextError() {
              var _this4;
              Object(classCallCheck[
                "a"
                /* default */
              ])(this, InsecureContextError);
              _this4 = _super4.call(this, "camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.");
              _this4.name = "InsecureContextError";
              return _this4;
            }
            return InsecureContextError;
          }(/* @__PURE__ */ wrapNativeSuper_wrapNativeSuper(Error));
        }
      ),
      /***/
      "1cdc": (
        /***/
        function(module2, exports, __webpack_require__) {
          var userAgent = __webpack_require__("342f");
          module2.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);
        }
      ),
      /***/
      "1d80": (
        /***/
        function(module2, exports) {
          module2.exports = function(it) {
            if (it == void 0) throw TypeError("Can't call method on " + it);
            return it;
          };
        }
      ),
      /***/
      "1da1": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__.d(__webpack_exports__, "a", function() {
            return _asyncToGenerator;
          });
          __webpack_require__("d3b7");
          __webpack_require__("e6cf");
          function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
            try {
              var info = gen[key](arg);
              var value = info.value;
            } catch (error) {
              reject(error);
              return;
            }
            if (info.done) {
              resolve(value);
            } else {
              Promise.resolve(value).then(_next, _throw);
            }
          }
          function _asyncToGenerator(fn) {
            return function() {
              var self2 = this, args = arguments;
              return new Promise(function(resolve, reject) {
                var gen = fn.apply(self2, args);
                function _next(value) {
                  asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                  asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(void 0);
              });
            };
          }
        }
      ),
      /***/
      "1dde": (
        /***/
        function(module2, exports, __webpack_require__) {
          var fails = __webpack_require__("d039");
          var wellKnownSymbol = __webpack_require__("b622");
          var V8_VERSION = __webpack_require__("2d00");
          var SPECIES = wellKnownSymbol("species");
          module2.exports = function(METHOD_NAME) {
            return V8_VERSION >= 51 || !fails(function() {
              var array = [];
              var constructor = array.constructor = {};
              constructor[SPECIES] = function() {
                return { foo: 1 };
              };
              return array[METHOD_NAME](Boolean).foo !== 1;
            });
          };
        }
      ),
      /***/
      "2266": (
        /***/
        function(module2, exports, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          var isArrayIteratorMethod = __webpack_require__("e95a");
          var toLength = __webpack_require__("50c4");
          var bind = __webpack_require__("0366");
          var getIteratorMethod = __webpack_require__("35a1");
          var callWithSafeIterationClosing = __webpack_require__("9bdd");
          var Result = function(stopped, result) {
            this.stopped = stopped;
            this.result = result;
          };
          var iterate = module2.exports = function(iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
            var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
            var iterator, iterFn, index, length, result, next, step;
            if (IS_ITERATOR) {
              iterator = iterable;
            } else {
              iterFn = getIteratorMethod(iterable);
              if (typeof iterFn != "function") throw TypeError("Target is not iterable");
              if (isArrayIteratorMethod(iterFn)) {
                for (index = 0, length = toLength(iterable.length); length > index; index++) {
                  result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
                  if (result && result instanceof Result) return result;
                }
                return new Result(false);
              }
              iterator = iterFn.call(iterable);
            }
            next = iterator.next;
            while (!(step = next.call(iterator)).done) {
              result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
              if (typeof result == "object" && result && result instanceof Result) return result;
            }
            return new Result(false);
          };
          iterate.stop = function(result) {
            return new Result(true, result);
          };
        }
      ),
      /***/
      "23cb": (
        /***/
        function(module2, exports, __webpack_require__) {
          var toInteger = __webpack_require__("a691");
          var max = Math.max;
          var min = Math.min;
          module2.exports = function(index, length) {
            var integer = toInteger(index);
            return integer < 0 ? max(integer + length, 0) : min(integer, length);
          };
        }
      ),
      /***/
      "23e7": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
          var createNonEnumerableProperty = __webpack_require__("9112");
          var redefine = __webpack_require__("6eeb");
          var setGlobal = __webpack_require__("ce4e");
          var copyConstructorProperties = __webpack_require__("e893");
          var isForced = __webpack_require__("94ca");
          module2.exports = function(options, source) {
            var TARGET = options.target;
            var GLOBAL = options.global;
            var STATIC = options.stat;
            var FORCED, target, key, targetProperty, sourceProperty, descriptor;
            if (GLOBAL) {
              target = global;
            } else if (STATIC) {
              target = global[TARGET] || setGlobal(TARGET, {});
            } else {
              target = (global[TARGET] || {}).prototype;
            }
            if (target) for (key in source) {
              sourceProperty = source[key];
              if (options.noTargetGet) {
                descriptor = getOwnPropertyDescriptor(target, key);
                targetProperty = descriptor && descriptor.value;
              } else targetProperty = target[key];
              FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key, options.forced);
              if (!FORCED && targetProperty !== void 0) {
                if (typeof sourceProperty === typeof targetProperty) continue;
                copyConstructorProperties(sourceProperty, targetProperty);
              }
              if (options.sham || targetProperty && targetProperty.sham) {
                createNonEnumerableProperty(sourceProperty, "sham", true);
              }
              redefine(target, key, sourceProperty, options);
            }
          };
        }
      ),
      /***/
      "241c": (
        /***/
        function(module2, exports, __webpack_require__) {
          var internalObjectKeys = __webpack_require__("ca84");
          var enumBugKeys = __webpack_require__("7839");
          var hiddenKeys = enumBugKeys.concat("length", "prototype");
          exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
            return internalObjectKeys(O, hiddenKeys);
          };
        }
      ),
      /***/
      "2493": (
        /***/
        function(module2, exports, __webpack_require__) {
          var content = __webpack_require__("ede3");
          if (typeof content === "string") content = [[module2.i, content, ""]];
          if (content.locals) module2.exports = content.locals;
          var add = __webpack_require__("499e").default;
          add("4c9ea657", content, true, { "sourceMap": false, "shadowMode": false });
        }
      ),
      /***/
      "24fb": (
        /***/
        function(module2, exports, __webpack_require__) {
          module2.exports = function(useSourceMap) {
            var list = [];
            list.toString = function toString() {
              return this.map(function(item) {
                var content = cssWithMappingToString(item, useSourceMap);
                if (item[2]) {
                  return "@media ".concat(item[2], " {").concat(content, "}");
                }
                return content;
              }).join("");
            };
            list.i = function(modules, mediaQuery, dedupe) {
              if (typeof modules === "string") {
                modules = [[null, modules, ""]];
              }
              var alreadyImportedModules = {};
              if (dedupe) {
                for (var i = 0; i < this.length; i++) {
                  var id = this[i][0];
                  if (id != null) {
                    alreadyImportedModules[id] = true;
                  }
                }
              }
              for (var _i = 0; _i < modules.length; _i++) {
                var item = [].concat(modules[_i]);
                if (dedupe && alreadyImportedModules[item[0]]) {
                  continue;
                }
                if (mediaQuery) {
                  if (!item[2]) {
                    item[2] = mediaQuery;
                  } else {
                    item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
                  }
                }
                list.push(item);
              }
            };
            return list;
          };
          function cssWithMappingToString(item, useSourceMap) {
            var content = item[1] || "";
            var cssMapping = item[3];
            if (!cssMapping) {
              return content;
            }
            if (useSourceMap && typeof btoa === "function") {
              var sourceMapping = toComment(cssMapping);
              var sourceURLs = cssMapping.sources.map(function(source) {
                return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
              });
              return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
            }
            return [content].join("\n");
          }
          function toComment(sourceMap) {
            var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
            var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
            return "/*# ".concat(data, " */");
          }
        }
      ),
      /***/
      "2532": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var notARegExp = __webpack_require__("5a34");
          var requireObjectCoercible = __webpack_require__("1d80");
          var correctIsRegExpLogic = __webpack_require__("ab13");
          $({ target: "String", proto: true, forced: !correctIsRegExpLogic("includes") }, {
            includes: function includes(searchString) {
              return !!~String(requireObjectCoercible(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : void 0);
            }
          });
        }
      ),
      /***/
      "25f0": (
        /***/
        function(module2, exports, __webpack_require__) {
          var redefine = __webpack_require__("6eeb");
          var anObject = __webpack_require__("825a");
          var fails = __webpack_require__("d039");
          var flags = __webpack_require__("ad6d");
          var TO_STRING = "toString";
          var RegExpPrototype = RegExp.prototype;
          var nativeToString = RegExpPrototype[TO_STRING];
          var NOT_GENERIC = fails(function() {
            return nativeToString.call({ source: "a", flags: "b" }) != "/a/b";
          });
          var INCORRECT_NAME = nativeToString.name != TO_STRING;
          if (NOT_GENERIC || INCORRECT_NAME) {
            redefine(RegExp.prototype, TO_STRING, function toString() {
              var R = anObject(this);
              var p = String(R.source);
              var rf = R.flags;
              var f = String(rf === void 0 && R instanceof RegExp && !("flags" in RegExpPrototype) ? flags.call(R) : rf);
              return "/" + p + "/" + f;
            }, { unsafe: true });
          }
        }
      ),
      /***/
      "2626": (
        /***/
        function(module2, exports, __webpack_require__) {
          var getBuiltIn = __webpack_require__("d066");
          var definePropertyModule = __webpack_require__("9bf2");
          var wellKnownSymbol = __webpack_require__("b622");
          var DESCRIPTORS = __webpack_require__("83ab");
          var SPECIES = wellKnownSymbol("species");
          module2.exports = function(CONSTRUCTOR_NAME) {
            var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
            var defineProperty = definePropertyModule.f;
            if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
              defineProperty(Constructor, SPECIES, {
                configurable: true,
                get: function() {
                  return this;
                }
              });
            }
          };
        }
      ),
      /***/
      "2877": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__.d(__webpack_exports__, "a", function() {
            return normalizeComponent2;
          });
          function normalizeComponent2(scriptExports, render2, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
            var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
            if (render2) {
              options.render = render2;
              options.staticRenderFns = staticRenderFns;
              options._compiled = true;
            }
            if (functionalTemplate) {
              options.functional = true;
            }
            if (scopeId) {
              options._scopeId = "data-v-" + scopeId;
            }
            var hook;
            if (moduleIdentifier) {
              hook = function(context) {
                context = context || // cached call
                this.$vnode && this.$vnode.ssrContext || // stateful
                this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
                if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
                  context = __VUE_SSR_CONTEXT__;
                }
                if (injectStyles) {
                  injectStyles.call(this, context);
                }
                if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
                }
              };
              options._ssrRegister = hook;
            } else if (injectStyles) {
              hook = shadowMode ? function() {
                injectStyles.call(
                  this,
                  (options.functional ? this.parent : this).$root.$options.shadowRoot
                );
              } : injectStyles;
            }
            if (hook) {
              if (options.functional) {
                options._injectStyles = hook;
                var originalRender = options.render;
                options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
                };
              } else {
                var existing = options.beforeCreate;
                options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
              }
            }
            return {
              exports: scriptExports,
              options
            };
          }
        }
      ),
      /***/
      "2909": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__.d(__webpack_exports__, "a", function() {
            return (
              /* binding */
              _toConsumableArray
            );
          });
          var arrayLikeToArray = __webpack_require__("6b75");
          function _arrayWithoutHoles(arr) {
            if (Array.isArray(arr)) return Object(arrayLikeToArray[
              "a"
              /* default */
            ])(arr);
          }
          __webpack_require__("a4d3");
          __webpack_require__("e01a");
          __webpack_require__("d28b");
          __webpack_require__("a630");
          __webpack_require__("e260");
          __webpack_require__("d3b7");
          __webpack_require__("3ca3");
          __webpack_require__("ddb0");
          function _iterableToArray(iter) {
            if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
          }
          var unsupportedIterableToArray = __webpack_require__("06c5");
          function _nonIterableSpread() {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          function _toConsumableArray(arr) {
            return _arrayWithoutHoles(arr) || _iterableToArray(arr) || Object(unsupportedIterableToArray[
              "a"
              /* default */
            ])(arr) || _nonIterableSpread();
          }
        }
      ),
      /***/
      "2b3d": (
        /***/
        function(module2, exports, __webpack_require__) {
          __webpack_require__("3ca3");
          var $ = __webpack_require__("23e7");
          var DESCRIPTORS = __webpack_require__("83ab");
          var USE_NATIVE_URL = __webpack_require__("0d3b");
          var global = __webpack_require__("da84");
          var defineProperties = __webpack_require__("37e8");
          var redefine = __webpack_require__("6eeb");
          var anInstance = __webpack_require__("19aa");
          var has = __webpack_require__("5135");
          var assign = __webpack_require__("60da");
          var arrayFrom = __webpack_require__("4df4");
          var codeAt = __webpack_require__("6547").codeAt;
          var toASCII = __webpack_require__("5fb2");
          var setToStringTag = __webpack_require__("d44e");
          var URLSearchParamsModule = __webpack_require__("9861");
          var InternalStateModule = __webpack_require__("69f3");
          var NativeURL = global.URL;
          var URLSearchParams2 = URLSearchParamsModule.URLSearchParams;
          var getInternalSearchParamsState = URLSearchParamsModule.getState;
          var setInternalState = InternalStateModule.set;
          var getInternalURLState = InternalStateModule.getterFor("URL");
          var floor = Math.floor;
          var pow = Math.pow;
          var INVALID_AUTHORITY = "Invalid authority";
          var INVALID_SCHEME = "Invalid scheme";
          var INVALID_HOST = "Invalid host";
          var INVALID_PORT = "Invalid port";
          var ALPHA = /[A-Za-z]/;
          var ALPHANUMERIC = /[\d+-.A-Za-z]/;
          var DIGIT = /\d/;
          var HEX_START = /^(0x|0X)/;
          var OCT = /^[0-7]+$/;
          var DEC = /^\d+$/;
          var HEX = /^[\dA-Fa-f]+$/;
          var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
          var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
          var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
          var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
          var EOF;
          var parseHost = function(url, input) {
            var result, codePoints, index;
            if (input.charAt(0) == "[") {
              if (input.charAt(input.length - 1) != "]") return INVALID_HOST;
              result = parseIPv6(input.slice(1, -1));
              if (!result) return INVALID_HOST;
              url.host = result;
            } else if (!isSpecial(url)) {
              if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) return INVALID_HOST;
              result = "";
              codePoints = arrayFrom(input);
              for (index = 0; index < codePoints.length; index++) {
                result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
              }
              url.host = result;
            } else {
              input = toASCII(input);
              if (FORBIDDEN_HOST_CODE_POINT.test(input)) return INVALID_HOST;
              result = parseIPv4(input);
              if (result === null) return INVALID_HOST;
              url.host = result;
            }
          };
          var parseIPv4 = function(input) {
            var parts = input.split(".");
            var partsLength, numbers, index, part, radix, number, ipv4;
            if (parts.length && parts[parts.length - 1] == "") {
              parts.pop();
            }
            partsLength = parts.length;
            if (partsLength > 4) return input;
            numbers = [];
            for (index = 0; index < partsLength; index++) {
              part = parts[index];
              if (part == "") return input;
              radix = 10;
              if (part.length > 1 && part.charAt(0) == "0") {
                radix = HEX_START.test(part) ? 16 : 8;
                part = part.slice(radix == 8 ? 1 : 2);
              }
              if (part === "") {
                number = 0;
              } else {
                if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) return input;
                number = parseInt(part, radix);
              }
              numbers.push(number);
            }
            for (index = 0; index < partsLength; index++) {
              number = numbers[index];
              if (index == partsLength - 1) {
                if (number >= pow(256, 5 - partsLength)) return null;
              } else if (number > 255) return null;
            }
            ipv4 = numbers.pop();
            for (index = 0; index < numbers.length; index++) {
              ipv4 += numbers[index] * pow(256, 3 - index);
            }
            return ipv4;
          };
          var parseIPv6 = function(input) {
            var address = [0, 0, 0, 0, 0, 0, 0, 0];
            var pieceIndex = 0;
            var compress = null;
            var pointer = 0;
            var value, length, numbersSeen, ipv4Piece, number, swaps, swap;
            var char = function() {
              return input.charAt(pointer);
            };
            if (char() == ":") {
              if (input.charAt(1) != ":") return;
              pointer += 2;
              pieceIndex++;
              compress = pieceIndex;
            }
            while (char()) {
              if (pieceIndex == 8) return;
              if (char() == ":") {
                if (compress !== null) return;
                pointer++;
                pieceIndex++;
                compress = pieceIndex;
                continue;
              }
              value = length = 0;
              while (length < 4 && HEX.test(char())) {
                value = value * 16 + parseInt(char(), 16);
                pointer++;
                length++;
              }
              if (char() == ".") {
                if (length == 0) return;
                pointer -= length;
                if (pieceIndex > 6) return;
                numbersSeen = 0;
                while (char()) {
                  ipv4Piece = null;
                  if (numbersSeen > 0) {
                    if (char() == "." && numbersSeen < 4) pointer++;
                    else return;
                  }
                  if (!DIGIT.test(char())) return;
                  while (DIGIT.test(char())) {
                    number = parseInt(char(), 10);
                    if (ipv4Piece === null) ipv4Piece = number;
                    else if (ipv4Piece == 0) return;
                    else ipv4Piece = ipv4Piece * 10 + number;
                    if (ipv4Piece > 255) return;
                    pointer++;
                  }
                  address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
                  numbersSeen++;
                  if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
                }
                if (numbersSeen != 4) return;
                break;
              } else if (char() == ":") {
                pointer++;
                if (!char()) return;
              } else if (char()) return;
              address[pieceIndex++] = value;
            }
            if (compress !== null) {
              swaps = pieceIndex - compress;
              pieceIndex = 7;
              while (pieceIndex != 0 && swaps > 0) {
                swap = address[pieceIndex];
                address[pieceIndex--] = address[compress + swaps - 1];
                address[compress + --swaps] = swap;
              }
            } else if (pieceIndex != 8) return;
            return address;
          };
          var findLongestZeroSequence = function(ipv6) {
            var maxIndex = null;
            var maxLength = 1;
            var currStart = null;
            var currLength = 0;
            var index = 0;
            for (; index < 8; index++) {
              if (ipv6[index] !== 0) {
                if (currLength > maxLength) {
                  maxIndex = currStart;
                  maxLength = currLength;
                }
                currStart = null;
                currLength = 0;
              } else {
                if (currStart === null) currStart = index;
                ++currLength;
              }
            }
            if (currLength > maxLength) {
              maxIndex = currStart;
              maxLength = currLength;
            }
            return maxIndex;
          };
          var serializeHost = function(host) {
            var result, index, compress, ignore0;
            if (typeof host == "number") {
              result = [];
              for (index = 0; index < 4; index++) {
                result.unshift(host % 256);
                host = floor(host / 256);
              }
              return result.join(".");
            } else if (typeof host == "object") {
              result = "";
              compress = findLongestZeroSequence(host);
              for (index = 0; index < 8; index++) {
                if (ignore0 && host[index] === 0) continue;
                if (ignore0) ignore0 = false;
                if (compress === index) {
                  result += index ? ":" : "::";
                  ignore0 = true;
                } else {
                  result += host[index].toString(16);
                  if (index < 7) result += ":";
                }
              }
              return "[" + result + "]";
            }
            return host;
          };
          var C0ControlPercentEncodeSet = {};
          var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
            " ": 1,
            '"': 1,
            "<": 1,
            ">": 1,
            "`": 1
          });
          var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
            "#": 1,
            "?": 1,
            "{": 1,
            "}": 1
          });
          var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
            "/": 1,
            ":": 1,
            ";": 1,
            "=": 1,
            "@": 1,
            "[": 1,
            "\\": 1,
            "]": 1,
            "^": 1,
            "|": 1
          });
          var percentEncode = function(char, set) {
            var code = codeAt(char, 0);
            return code > 32 && code < 127 && !has(set, char) ? char : encodeURIComponent(char);
          };
          var specialSchemes = {
            ftp: 21,
            file: null,
            http: 80,
            https: 443,
            ws: 80,
            wss: 443
          };
          var isSpecial = function(url) {
            return has(specialSchemes, url.scheme);
          };
          var includesCredentials = function(url) {
            return url.username != "" || url.password != "";
          };
          var cannotHaveUsernamePasswordPort = function(url) {
            return !url.host || url.cannotBeABaseURL || url.scheme == "file";
          };
          var isWindowsDriveLetter = function(string, normalized) {
            var second;
            return string.length == 2 && ALPHA.test(string.charAt(0)) && ((second = string.charAt(1)) == ":" || !normalized && second == "|");
          };
          var startsWithWindowsDriveLetter = function(string) {
            var third;
            return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (string.length == 2 || ((third = string.charAt(2)) === "/" || third === "\\" || third === "?" || third === "#"));
          };
          var shortenURLsPath = function(url) {
            var path = url.path;
            var pathSize = path.length;
            if (pathSize && (url.scheme != "file" || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
              path.pop();
            }
          };
          var isSingleDot = function(segment) {
            return segment === "." || segment.toLowerCase() === "%2e";
          };
          var isDoubleDot = function(segment) {
            segment = segment.toLowerCase();
            return segment === ".." || segment === "%2e." || segment === ".%2e" || segment === "%2e%2e";
          };
          var SCHEME_START = {};
          var SCHEME = {};
          var NO_SCHEME = {};
          var SPECIAL_RELATIVE_OR_AUTHORITY = {};
          var PATH_OR_AUTHORITY = {};
          var RELATIVE = {};
          var RELATIVE_SLASH = {};
          var SPECIAL_AUTHORITY_SLASHES = {};
          var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
          var AUTHORITY = {};
          var HOST = {};
          var HOSTNAME = {};
          var PORT = {};
          var FILE = {};
          var FILE_SLASH = {};
          var FILE_HOST = {};
          var PATH_START = {};
          var PATH = {};
          var CANNOT_BE_A_BASE_URL_PATH = {};
          var QUERY = {};
          var FRAGMENT = {};
          var parseURL = function(url, input, stateOverride, base) {
            var state = stateOverride || SCHEME_START;
            var pointer = 0;
            var buffer = "";
            var seenAt = false;
            var seenBracket = false;
            var seenPasswordToken = false;
            var codePoints, char, bufferCodePoints, failure;
            if (!stateOverride) {
              url.scheme = "";
              url.username = "";
              url.password = "";
              url.host = null;
              url.port = null;
              url.path = [];
              url.query = null;
              url.fragment = null;
              url.cannotBeABaseURL = false;
              input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, "");
            }
            input = input.replace(TAB_AND_NEW_LINE, "");
            codePoints = arrayFrom(input);
            while (pointer <= codePoints.length) {
              char = codePoints[pointer];
              switch (state) {
                case SCHEME_START:
                  if (char && ALPHA.test(char)) {
                    buffer += char.toLowerCase();
                    state = SCHEME;
                  } else if (!stateOverride) {
                    state = NO_SCHEME;
                    continue;
                  } else return INVALID_SCHEME;
                  break;
                case SCHEME:
                  if (char && (ALPHANUMERIC.test(char) || char == "+" || char == "-" || char == ".")) {
                    buffer += char.toLowerCase();
                  } else if (char == ":") {
                    if (stateOverride && (isSpecial(url) != has(specialSchemes, buffer) || buffer == "file" && (includesCredentials(url) || url.port !== null) || url.scheme == "file" && !url.host)) return;
                    url.scheme = buffer;
                    if (stateOverride) {
                      if (isSpecial(url) && specialSchemes[url.scheme] == url.port) url.port = null;
                      return;
                    }
                    buffer = "";
                    if (url.scheme == "file") {
                      state = FILE;
                    } else if (isSpecial(url) && base && base.scheme == url.scheme) {
                      state = SPECIAL_RELATIVE_OR_AUTHORITY;
                    } else if (isSpecial(url)) {
                      state = SPECIAL_AUTHORITY_SLASHES;
                    } else if (codePoints[pointer + 1] == "/") {
                      state = PATH_OR_AUTHORITY;
                      pointer++;
                    } else {
                      url.cannotBeABaseURL = true;
                      url.path.push("");
                      state = CANNOT_BE_A_BASE_URL_PATH;
                    }
                  } else if (!stateOverride) {
                    buffer = "";
                    state = NO_SCHEME;
                    pointer = 0;
                    continue;
                  } else return INVALID_SCHEME;
                  break;
                case NO_SCHEME:
                  if (!base || base.cannotBeABaseURL && char != "#") return INVALID_SCHEME;
                  if (base.cannotBeABaseURL && char == "#") {
                    url.scheme = base.scheme;
                    url.path = base.path.slice();
                    url.query = base.query;
                    url.fragment = "";
                    url.cannotBeABaseURL = true;
                    state = FRAGMENT;
                    break;
                  }
                  state = base.scheme == "file" ? FILE : RELATIVE;
                  continue;
                case SPECIAL_RELATIVE_OR_AUTHORITY:
                  if (char == "/" && codePoints[pointer + 1] == "/") {
                    state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                    pointer++;
                  } else {
                    state = RELATIVE;
                    continue;
                  }
                  break;
                case PATH_OR_AUTHORITY:
                  if (char == "/") {
                    state = AUTHORITY;
                    break;
                  } else {
                    state = PATH;
                    continue;
                  }
                case RELATIVE:
                  url.scheme = base.scheme;
                  if (char == EOF) {
                    url.username = base.username;
                    url.password = base.password;
                    url.host = base.host;
                    url.port = base.port;
                    url.path = base.path.slice();
                    url.query = base.query;
                  } else if (char == "/" || char == "\\" && isSpecial(url)) {
                    state = RELATIVE_SLASH;
                  } else if (char == "?") {
                    url.username = base.username;
                    url.password = base.password;
                    url.host = base.host;
                    url.port = base.port;
                    url.path = base.path.slice();
                    url.query = "";
                    state = QUERY;
                  } else if (char == "#") {
                    url.username = base.username;
                    url.password = base.password;
                    url.host = base.host;
                    url.port = base.port;
                    url.path = base.path.slice();
                    url.query = base.query;
                    url.fragment = "";
                    state = FRAGMENT;
                  } else {
                    url.username = base.username;
                    url.password = base.password;
                    url.host = base.host;
                    url.port = base.port;
                    url.path = base.path.slice();
                    url.path.pop();
                    state = PATH;
                    continue;
                  }
                  break;
                case RELATIVE_SLASH:
                  if (isSpecial(url) && (char == "/" || char == "\\")) {
                    state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                  } else if (char == "/") {
                    state = AUTHORITY;
                  } else {
                    url.username = base.username;
                    url.password = base.password;
                    url.host = base.host;
                    url.port = base.port;
                    state = PATH;
                    continue;
                  }
                  break;
                case SPECIAL_AUTHORITY_SLASHES:
                  state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
                  if (char != "/" || buffer.charAt(pointer + 1) != "/") continue;
                  pointer++;
                  break;
                case SPECIAL_AUTHORITY_IGNORE_SLASHES:
                  if (char != "/" && char != "\\") {
                    state = AUTHORITY;
                    continue;
                  }
                  break;
                case AUTHORITY:
                  if (char == "@") {
                    if (seenAt) buffer = "%40" + buffer;
                    seenAt = true;
                    bufferCodePoints = arrayFrom(buffer);
                    for (var i = 0; i < bufferCodePoints.length; i++) {
                      var codePoint = bufferCodePoints[i];
                      if (codePoint == ":" && !seenPasswordToken) {
                        seenPasswordToken = true;
                        continue;
                      }
                      var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
                      if (seenPasswordToken) url.password += encodedCodePoints;
                      else url.username += encodedCodePoints;
                    }
                    buffer = "";
                  } else if (char == EOF || char == "/" || char == "?" || char == "#" || char == "\\" && isSpecial(url)) {
                    if (seenAt && buffer == "") return INVALID_AUTHORITY;
                    pointer -= arrayFrom(buffer).length + 1;
                    buffer = "";
                    state = HOST;
                  } else buffer += char;
                  break;
                case HOST:
                case HOSTNAME:
                  if (stateOverride && url.scheme == "file") {
                    state = FILE_HOST;
                    continue;
                  } else if (char == ":" && !seenBracket) {
                    if (buffer == "") return INVALID_HOST;
                    failure = parseHost(url, buffer);
                    if (failure) return failure;
                    buffer = "";
                    state = PORT;
                    if (stateOverride == HOSTNAME) return;
                  } else if (char == EOF || char == "/" || char == "?" || char == "#" || char == "\\" && isSpecial(url)) {
                    if (isSpecial(url) && buffer == "") return INVALID_HOST;
                    if (stateOverride && buffer == "" && (includesCredentials(url) || url.port !== null)) return;
                    failure = parseHost(url, buffer);
                    if (failure) return failure;
                    buffer = "";
                    state = PATH_START;
                    if (stateOverride) return;
                    continue;
                  } else {
                    if (char == "[") seenBracket = true;
                    else if (char == "]") seenBracket = false;
                    buffer += char;
                  }
                  break;
                case PORT:
                  if (DIGIT.test(char)) {
                    buffer += char;
                  } else if (char == EOF || char == "/" || char == "?" || char == "#" || char == "\\" && isSpecial(url) || stateOverride) {
                    if (buffer != "") {
                      var port = parseInt(buffer, 10);
                      if (port > 65535) return INVALID_PORT;
                      url.port = isSpecial(url) && port === specialSchemes[url.scheme] ? null : port;
                      buffer = "";
                    }
                    if (stateOverride) return;
                    state = PATH_START;
                    continue;
                  } else return INVALID_PORT;
                  break;
                case FILE:
                  url.scheme = "file";
                  if (char == "/" || char == "\\") state = FILE_SLASH;
                  else if (base && base.scheme == "file") {
                    if (char == EOF) {
                      url.host = base.host;
                      url.path = base.path.slice();
                      url.query = base.query;
                    } else if (char == "?") {
                      url.host = base.host;
                      url.path = base.path.slice();
                      url.query = "";
                      state = QUERY;
                    } else if (char == "#") {
                      url.host = base.host;
                      url.path = base.path.slice();
                      url.query = base.query;
                      url.fragment = "";
                      state = FRAGMENT;
                    } else {
                      if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(""))) {
                        url.host = base.host;
                        url.path = base.path.slice();
                        shortenURLsPath(url);
                      }
                      state = PATH;
                      continue;
                    }
                  } else {
                    state = PATH;
                    continue;
                  }
                  break;
                case FILE_SLASH:
                  if (char == "/" || char == "\\") {
                    state = FILE_HOST;
                    break;
                  }
                  if (base && base.scheme == "file" && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(""))) {
                    if (isWindowsDriveLetter(base.path[0], true)) url.path.push(base.path[0]);
                    else url.host = base.host;
                  }
                  state = PATH;
                  continue;
                case FILE_HOST:
                  if (char == EOF || char == "/" || char == "\\" || char == "?" || char == "#") {
                    if (!stateOverride && isWindowsDriveLetter(buffer)) {
                      state = PATH;
                    } else if (buffer == "") {
                      url.host = "";
                      if (stateOverride) return;
                      state = PATH_START;
                    } else {
                      failure = parseHost(url, buffer);
                      if (failure) return failure;
                      if (url.host == "localhost") url.host = "";
                      if (stateOverride) return;
                      buffer = "";
                      state = PATH_START;
                    }
                    continue;
                  } else buffer += char;
                  break;
                case PATH_START:
                  if (isSpecial(url)) {
                    state = PATH;
                    if (char != "/" && char != "\\") continue;
                  } else if (!stateOverride && char == "?") {
                    url.query = "";
                    state = QUERY;
                  } else if (!stateOverride && char == "#") {
                    url.fragment = "";
                    state = FRAGMENT;
                  } else if (char != EOF) {
                    state = PATH;
                    if (char != "/") continue;
                  }
                  break;
                case PATH:
                  if (char == EOF || char == "/" || char == "\\" && isSpecial(url) || !stateOverride && (char == "?" || char == "#")) {
                    if (isDoubleDot(buffer)) {
                      shortenURLsPath(url);
                      if (char != "/" && !(char == "\\" && isSpecial(url))) {
                        url.path.push("");
                      }
                    } else if (isSingleDot(buffer)) {
                      if (char != "/" && !(char == "\\" && isSpecial(url))) {
                        url.path.push("");
                      }
                    } else {
                      if (url.scheme == "file" && !url.path.length && isWindowsDriveLetter(buffer)) {
                        if (url.host) url.host = "";
                        buffer = buffer.charAt(0) + ":";
                      }
                      url.path.push(buffer);
                    }
                    buffer = "";
                    if (url.scheme == "file" && (char == EOF || char == "?" || char == "#")) {
                      while (url.path.length > 1 && url.path[0] === "") {
                        url.path.shift();
                      }
                    }
                    if (char == "?") {
                      url.query = "";
                      state = QUERY;
                    } else if (char == "#") {
                      url.fragment = "";
                      state = FRAGMENT;
                    }
                  } else {
                    buffer += percentEncode(char, pathPercentEncodeSet);
                  }
                  break;
                case CANNOT_BE_A_BASE_URL_PATH:
                  if (char == "?") {
                    url.query = "";
                    state = QUERY;
                  } else if (char == "#") {
                    url.fragment = "";
                    state = FRAGMENT;
                  } else if (char != EOF) {
                    url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
                  }
                  break;
                case QUERY:
                  if (!stateOverride && char == "#") {
                    url.fragment = "";
                    state = FRAGMENT;
                  } else if (char != EOF) {
                    if (char == "'" && isSpecial(url)) url.query += "%27";
                    else if (char == "#") url.query += "%23";
                    else url.query += percentEncode(char, C0ControlPercentEncodeSet);
                  }
                  break;
                case FRAGMENT:
                  if (char != EOF) url.fragment += percentEncode(char, fragmentPercentEncodeSet);
                  break;
              }
              pointer++;
            }
          };
          var URLConstructor = function URL2(url) {
            var that = anInstance(this, URLConstructor, "URL");
            var base = arguments.length > 1 ? arguments[1] : void 0;
            var urlString = String(url);
            var state = setInternalState(that, { type: "URL" });
            var baseState, failure;
            if (base !== void 0) {
              if (base instanceof URLConstructor) baseState = getInternalURLState(base);
              else {
                failure = parseURL(baseState = {}, String(base));
                if (failure) throw TypeError(failure);
              }
            }
            failure = parseURL(state, urlString, null, baseState);
            if (failure) throw TypeError(failure);
            var searchParams = state.searchParams = new URLSearchParams2();
            var searchParamsState = getInternalSearchParamsState(searchParams);
            searchParamsState.updateSearchParams(state.query);
            searchParamsState.updateURL = function() {
              state.query = String(searchParams) || null;
            };
            if (!DESCRIPTORS) {
              that.href = serializeURL.call(that);
              that.origin = getOrigin.call(that);
              that.protocol = getProtocol.call(that);
              that.username = getUsername.call(that);
              that.password = getPassword.call(that);
              that.host = getHost.call(that);
              that.hostname = getHostname.call(that);
              that.port = getPort.call(that);
              that.pathname = getPathname.call(that);
              that.search = getSearch.call(that);
              that.searchParams = getSearchParams.call(that);
              that.hash = getHash.call(that);
            }
          };
          var URLPrototype = URLConstructor.prototype;
          var serializeURL = function() {
            var url = getInternalURLState(this);
            var scheme = url.scheme;
            var username = url.username;
            var password = url.password;
            var host = url.host;
            var port = url.port;
            var path = url.path;
            var query = url.query;
            var fragment = url.fragment;
            var output = scheme + ":";
            if (host !== null) {
              output += "//";
              if (includesCredentials(url)) {
                output += username + (password ? ":" + password : "") + "@";
              }
              output += serializeHost(host);
              if (port !== null) output += ":" + port;
            } else if (scheme == "file") output += "//";
            output += url.cannotBeABaseURL ? path[0] : path.length ? "/" + path.join("/") : "";
            if (query !== null) output += "?" + query;
            if (fragment !== null) output += "#" + fragment;
            return output;
          };
          var getOrigin = function() {
            var url = getInternalURLState(this);
            var scheme = url.scheme;
            var port = url.port;
            if (scheme == "blob") try {
              return new URL(scheme.path[0]).origin;
            } catch (error) {
              return "null";
            }
            if (scheme == "file" || !isSpecial(url)) return "null";
            return scheme + "://" + serializeHost(url.host) + (port !== null ? ":" + port : "");
          };
          var getProtocol = function() {
            return getInternalURLState(this).scheme + ":";
          };
          var getUsername = function() {
            return getInternalURLState(this).username;
          };
          var getPassword = function() {
            return getInternalURLState(this).password;
          };
          var getHost = function() {
            var url = getInternalURLState(this);
            var host = url.host;
            var port = url.port;
            return host === null ? "" : port === null ? serializeHost(host) : serializeHost(host) + ":" + port;
          };
          var getHostname = function() {
            var host = getInternalURLState(this).host;
            return host === null ? "" : serializeHost(host);
          };
          var getPort = function() {
            var port = getInternalURLState(this).port;
            return port === null ? "" : String(port);
          };
          var getPathname = function() {
            var url = getInternalURLState(this);
            var path = url.path;
            return url.cannotBeABaseURL ? path[0] : path.length ? "/" + path.join("/") : "";
          };
          var getSearch = function() {
            var query = getInternalURLState(this).query;
            return query ? "?" + query : "";
          };
          var getSearchParams = function() {
            return getInternalURLState(this).searchParams;
          };
          var getHash = function() {
            var fragment = getInternalURLState(this).fragment;
            return fragment ? "#" + fragment : "";
          };
          var accessorDescriptor = function(getter, setter) {
            return { get: getter, set: setter, configurable: true, enumerable: true };
          };
          if (DESCRIPTORS) {
            defineProperties(URLPrototype, {
              // `URL.prototype.href` accessors pair
              // https://url.spec.whatwg.org/#dom-url-href
              href: accessorDescriptor(serializeURL, function(href) {
                var url = getInternalURLState(this);
                var urlString = String(href);
                var failure = parseURL(url, urlString);
                if (failure) throw TypeError(failure);
                getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
              }),
              // `URL.prototype.origin` getter
              // https://url.spec.whatwg.org/#dom-url-origin
              origin: accessorDescriptor(getOrigin),
              // `URL.prototype.protocol` accessors pair
              // https://url.spec.whatwg.org/#dom-url-protocol
              protocol: accessorDescriptor(getProtocol, function(protocol) {
                var url = getInternalURLState(this);
                parseURL(url, String(protocol) + ":", SCHEME_START);
              }),
              // `URL.prototype.username` accessors pair
              // https://url.spec.whatwg.org/#dom-url-username
              username: accessorDescriptor(getUsername, function(username) {
                var url = getInternalURLState(this);
                var codePoints = arrayFrom(String(username));
                if (cannotHaveUsernamePasswordPort(url)) return;
                url.username = "";
                for (var i = 0; i < codePoints.length; i++) {
                  url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
                }
              }),
              // `URL.prototype.password` accessors pair
              // https://url.spec.whatwg.org/#dom-url-password
              password: accessorDescriptor(getPassword, function(password) {
                var url = getInternalURLState(this);
                var codePoints = arrayFrom(String(password));
                if (cannotHaveUsernamePasswordPort(url)) return;
                url.password = "";
                for (var i = 0; i < codePoints.length; i++) {
                  url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
                }
              }),
              // `URL.prototype.host` accessors pair
              // https://url.spec.whatwg.org/#dom-url-host
              host: accessorDescriptor(getHost, function(host) {
                var url = getInternalURLState(this);
                if (url.cannotBeABaseURL) return;
                parseURL(url, String(host), HOST);
              }),
              // `URL.prototype.hostname` accessors pair
              // https://url.spec.whatwg.org/#dom-url-hostname
              hostname: accessorDescriptor(getHostname, function(hostname) {
                var url = getInternalURLState(this);
                if (url.cannotBeABaseURL) return;
                parseURL(url, String(hostname), HOSTNAME);
              }),
              // `URL.prototype.port` accessors pair
              // https://url.spec.whatwg.org/#dom-url-port
              port: accessorDescriptor(getPort, function(port) {
                var url = getInternalURLState(this);
                if (cannotHaveUsernamePasswordPort(url)) return;
                port = String(port);
                if (port == "") url.port = null;
                else parseURL(url, port, PORT);
              }),
              // `URL.prototype.pathname` accessors pair
              // https://url.spec.whatwg.org/#dom-url-pathname
              pathname: accessorDescriptor(getPathname, function(pathname) {
                var url = getInternalURLState(this);
                if (url.cannotBeABaseURL) return;
                url.path = [];
                parseURL(url, pathname + "", PATH_START);
              }),
              // `URL.prototype.search` accessors pair
              // https://url.spec.whatwg.org/#dom-url-search
              search: accessorDescriptor(getSearch, function(search) {
                var url = getInternalURLState(this);
                search = String(search);
                if (search == "") {
                  url.query = null;
                } else {
                  if ("?" == search.charAt(0)) search = search.slice(1);
                  url.query = "";
                  parseURL(url, search, QUERY);
                }
                getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
              }),
              // `URL.prototype.searchParams` getter
              // https://url.spec.whatwg.org/#dom-url-searchparams
              searchParams: accessorDescriptor(getSearchParams),
              // `URL.prototype.hash` accessors pair
              // https://url.spec.whatwg.org/#dom-url-hash
              hash: accessorDescriptor(getHash, function(hash) {
                var url = getInternalURLState(this);
                hash = String(hash);
                if (hash == "") {
                  url.fragment = null;
                  return;
                }
                if ("#" == hash.charAt(0)) hash = hash.slice(1);
                url.fragment = "";
                parseURL(url, hash, FRAGMENT);
              })
            });
          }
          redefine(URLPrototype, "toJSON", function toJSON() {
            return serializeURL.call(this);
          }, { enumerable: true });
          redefine(URLPrototype, "toString", function toString() {
            return serializeURL.call(this);
          }, { enumerable: true });
          if (NativeURL) {
            var nativeCreateObjectURL = NativeURL.createObjectURL;
            var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
            if (nativeCreateObjectURL) redefine(URLConstructor, "createObjectURL", function createObjectURL(blob) {
              return nativeCreateObjectURL.apply(NativeURL, arguments);
            });
            if (nativeRevokeObjectURL) redefine(URLConstructor, "revokeObjectURL", function revokeObjectURL(url) {
              return nativeRevokeObjectURL.apply(NativeURL, arguments);
            });
          }
          setToStringTag(URLConstructor, "URL");
          $({ global: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
            URL: URLConstructor
          });
        }
      ),
      /***/
      "2ca0": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
          var toLength = __webpack_require__("50c4");
          var notARegExp = __webpack_require__("5a34");
          var requireObjectCoercible = __webpack_require__("1d80");
          var correctIsRegExpLogic = __webpack_require__("ab13");
          var IS_PURE = __webpack_require__("c430");
          var nativeStartsWith = "".startsWith;
          var min = Math.min;
          var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("startsWith");
          var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function() {
            var descriptor = getOwnPropertyDescriptor(String.prototype, "startsWith");
            return descriptor && !descriptor.writable;
          }();
          $({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
            startsWith: function startsWith(searchString) {
              var that = String(requireObjectCoercible(this));
              notARegExp(searchString);
              var index = toLength(min(arguments.length > 1 ? arguments[1] : void 0, that.length));
              var search = String(searchString);
              return nativeStartsWith ? nativeStartsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
            }
          });
        }
      ),
      /***/
      "2cf4": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          var fails = __webpack_require__("d039");
          var classof = __webpack_require__("c6b6");
          var bind = __webpack_require__("0366");
          var html = __webpack_require__("1be4");
          var createElement = __webpack_require__("cc12");
          var IS_IOS = __webpack_require__("1cdc");
          var location2 = global.location;
          var set = global.setImmediate;
          var clear = global.clearImmediate;
          var process = global.process;
          var MessageChannel = global.MessageChannel;
          var Dispatch = global.Dispatch;
          var counter = 0;
          var queue = {};
          var ONREADYSTATECHANGE = "onreadystatechange";
          var defer, channel, port;
          var run = function(id) {
            if (queue.hasOwnProperty(id)) {
              var fn = queue[id];
              delete queue[id];
              fn();
            }
          };
          var runner = function(id) {
            return function() {
              run(id);
            };
          };
          var listener = function(event) {
            run(event.data);
          };
          var post = function(id) {
            global.postMessage(id + "", location2.protocol + "//" + location2.host);
          };
          if (!set || !clear) {
            set = function setImmediate(fn) {
              var args = [];
              var i = 1;
              while (arguments.length > i) args.push(arguments[i++]);
              queue[++counter] = function() {
                (typeof fn == "function" ? fn : Function(fn)).apply(void 0, args);
              };
              defer(counter);
              return counter;
            };
            clear = function clearImmediate(id) {
              delete queue[id];
            };
            if (classof(process) == "process") {
              defer = function(id) {
                process.nextTick(runner(id));
              };
            } else if (Dispatch && Dispatch.now) {
              defer = function(id) {
                Dispatch.now(runner(id));
              };
            } else if (MessageChannel && !IS_IOS) {
              channel = new MessageChannel();
              port = channel.port2;
              channel.port1.onmessage = listener;
              defer = bind(port.postMessage, port, 1);
            } else if (global.addEventListener && typeof postMessage == "function" && !global.importScripts && !fails(post) && location2.protocol !== "file:") {
              defer = post;
              global.addEventListener("message", listener, false);
            } else if (ONREADYSTATECHANGE in createElement("script")) {
              defer = function(id) {
                html.appendChild(createElement("script"))[ONREADYSTATECHANGE] = function() {
                  html.removeChild(this);
                  run(id);
                };
              };
            } else {
              defer = function(id) {
                setTimeout(runner(id), 0);
              };
            }
          }
          module2.exports = {
            set,
            clear
          };
        }
      ),
      /***/
      "2d00": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          var userAgent = __webpack_require__("342f");
          var process = global.process;
          var versions = process && process.versions;
          var v8 = versions && versions.v8;
          var match, version;
          if (v8) {
            match = v8.split(".");
            version = match[0] + match[1];
          } else if (userAgent) {
            match = userAgent.match(/Edge\/(\d+)/);
            if (!match || match[1] >= 74) {
              match = userAgent.match(/Chrome\/(\d+)/);
              if (match) version = match[1];
            }
          }
          module2.exports = version && +version;
        }
      ),
      /***/
      "3410": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var fails = __webpack_require__("d039");
          var toObject = __webpack_require__("7b0b");
          var nativeGetPrototypeOf = __webpack_require__("e163");
          var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");
          var FAILS_ON_PRIMITIVES = fails(function() {
            nativeGetPrototypeOf(1);
          });
          $({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
            getPrototypeOf: function getPrototypeOf(it) {
              return nativeGetPrototypeOf(toObject(it));
            }
          });
        }
      ),
      /***/
      "342f": (
        /***/
        function(module2, exports, __webpack_require__) {
          var getBuiltIn = __webpack_require__("d066");
          module2.exports = getBuiltIn("navigator", "userAgent") || "";
        }
      ),
      /***/
      "35a1": (
        /***/
        function(module2, exports, __webpack_require__) {
          var classof = __webpack_require__("f5df");
          var Iterators = __webpack_require__("3f8c");
          var wellKnownSymbol = __webpack_require__("b622");
          var ITERATOR = wellKnownSymbol("iterator");
          module2.exports = function(it) {
            if (it != void 0) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
          };
        }
      ),
      /***/
      "37e8": (
        /***/
        function(module2, exports, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var definePropertyModule = __webpack_require__("9bf2");
          var anObject = __webpack_require__("825a");
          var objectKeys = __webpack_require__("df75");
          module2.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
            anObject(O);
            var keys = objectKeys(Properties);
            var length = keys.length;
            var index = 0;
            var key;
            while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
            return O;
          };
        }
      ),
      /***/
      "3bbe": (
        /***/
        function(module2, exports, __webpack_require__) {
          var isObject = __webpack_require__("861d");
          module2.exports = function(it) {
            if (!isObject(it) && it !== null) {
              throw TypeError("Can't set " + String(it) + " as a prototype");
            }
            return it;
          };
        }
      ),
      /***/
      "3c85": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__("e260");
          __webpack_require__("d3b7");
          __webpack_require__("ac1f");
          __webpack_require__("25f0");
          __webpack_require__("3ca3");
          __webpack_require__("466d");
          __webpack_require__("498a");
          __webpack_require__("ddb0");
          __webpack_require__("2b3d");
          var inlineWorker = function inlineWorker2(func) {
            var functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];
            return new Worker(URL.createObjectURL(new Blob([functionBody], {
              type: "text/javascript"
            })));
          };
          __webpack_exports__["a"] = function() {
            return inlineWorker(function() {
              self.importScripts("https://cdn.jsdelivr.net/npm/jsqr@1.3.1/dist/jsQR.min.js");
              self.addEventListener("message", function(event) {
                var imageData = event.data;
                var result = null;
                try {
                  result = jsQR(imageData.data, imageData.width, imageData.height);
                } catch (error) {
                  if (!(error instanceof RangeError)) {
                    throw error;
                  }
                }
                var content = null;
                var location2 = null;
                if (result !== null) {
                  content = result.data;
                  location2 = result.location;
                }
                var message = {
                  content,
                  location: location2,
                  imageData
                };
                self.postMessage(message, [imageData.data.buffer]);
              });
            });
          };
        }
      ),
      /***/
      "3ca3": (
        /***/
        function(module2, exports, __webpack_require__) {
          var charAt = __webpack_require__("6547").charAt;
          var InternalStateModule = __webpack_require__("69f3");
          var defineIterator = __webpack_require__("7dd0");
          var STRING_ITERATOR = "String Iterator";
          var setInternalState = InternalStateModule.set;
          var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
          defineIterator(String, "String", function(iterated) {
            setInternalState(this, {
              type: STRING_ITERATOR,
              string: String(iterated),
              index: 0
            });
          }, function next() {
            var state = getInternalState(this);
            var string = state.string;
            var index = state.index;
            var point;
            if (index >= string.length) return { value: void 0, done: true };
            point = charAt(string, index);
            state.index += point.length;
            return { value: point, done: false };
          });
        }
      ),
      /***/
      "3f8c": (
        /***/
        function(module2, exports) {
          module2.exports = {};
        }
      ),
      /***/
      "4160": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var forEach = __webpack_require__("17c2");
          $({ target: "Array", proto: true, forced: [].forEach != forEach }, {
            forEach
          });
        }
      ),
      /***/
      "428f": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          module2.exports = global;
        }
      ),
      /***/
      "44ad": (
        /***/
        function(module2, exports, __webpack_require__) {
          var fails = __webpack_require__("d039");
          var classof = __webpack_require__("c6b6");
          var split = "".split;
          module2.exports = fails(function() {
            return !Object("z").propertyIsEnumerable(0);
          }) ? function(it) {
            return classof(it) == "String" ? split.call(it, "") : Object(it);
          } : Object;
        }
      ),
      /***/
      "44d2": (
        /***/
        function(module2, exports, __webpack_require__) {
          var wellKnownSymbol = __webpack_require__("b622");
          var create = __webpack_require__("7c73");
          var definePropertyModule = __webpack_require__("9bf2");
          var UNSCOPABLES = wellKnownSymbol("unscopables");
          var ArrayPrototype = Array.prototype;
          if (ArrayPrototype[UNSCOPABLES] == void 0) {
            definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
              configurable: true,
              value: create(null)
            });
          }
          module2.exports = function(key) {
            ArrayPrototype[UNSCOPABLES][key] = true;
          };
        }
      ),
      /***/
      "44de": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          module2.exports = function(a, b) {
            var console2 = global.console;
            if (console2 && console2.error) {
              arguments.length === 1 ? console2.error(a) : console2.error(a, b);
            }
          };
        }
      ),
      /***/
      "44e7": (
        /***/
        function(module2, exports, __webpack_require__) {
          var isObject = __webpack_require__("861d");
          var classof = __webpack_require__("c6b6");
          var wellKnownSymbol = __webpack_require__("b622");
          var MATCH = wellKnownSymbol("match");
          module2.exports = function(it) {
            var isRegExp;
            return isObject(it) && ((isRegExp = it[MATCH]) !== void 0 ? !!isRegExp : classof(it) == "RegExp");
          };
        }
      ),
      /***/
      "45fc": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var $some = __webpack_require__("b727").some;
          var arrayMethodIsStrict = __webpack_require__("a640");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var STRICT_METHOD = arrayMethodIsStrict("some");
          var USES_TO_LENGTH = arrayMethodUsesToLength("some");
          $({ target: "Array", proto: true, forced: !STRICT_METHOD || !USES_TO_LENGTH }, {
            some: function some(callbackfn) {
              return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
        }
      ),
      /***/
      "466d": (
        /***/
        function(module2, exports, __webpack_require__) {
          var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
          var anObject = __webpack_require__("825a");
          var toLength = __webpack_require__("50c4");
          var requireObjectCoercible = __webpack_require__("1d80");
          var advanceStringIndex = __webpack_require__("8aa5");
          var regExpExec = __webpack_require__("14c3");
          fixRegExpWellKnownSymbolLogic("match", 1, function(MATCH, nativeMatch, maybeCallNative) {
            return [
              // `String.prototype.match` method
              // https://tc39.github.io/ecma262/#sec-string.prototype.match
              function match(regexp) {
                var O = requireObjectCoercible(this);
                var matcher = regexp == void 0 ? void 0 : regexp[MATCH];
                return matcher !== void 0 ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
              },
              // `RegExp.prototype[@@match]` method
              // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
              function(regexp) {
                var res = maybeCallNative(nativeMatch, regexp, this);
                if (res.done) return res.value;
                var rx = anObject(regexp);
                var S = String(this);
                if (!rx.global) return regExpExec(rx, S);
                var fullUnicode = rx.unicode;
                rx.lastIndex = 0;
                var A = [];
                var n = 0;
                var result;
                while ((result = regExpExec(rx, S)) !== null) {
                  var matchStr = String(result[0]);
                  A[n] = matchStr;
                  if (matchStr === "") rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
                  n++;
                }
                return n === 0 ? null : A;
              }
            ];
          });
        }
      ),
      /***/
      "4840": (
        /***/
        function(module2, exports, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          var aFunction = __webpack_require__("1c0b");
          var wellKnownSymbol = __webpack_require__("b622");
          var SPECIES = wellKnownSymbol("species");
          module2.exports = function(O, defaultConstructor) {
            var C = anObject(O).constructor;
            var S;
            return C === void 0 || (S = anObject(C)[SPECIES]) == void 0 ? defaultConstructor : aFunction(S);
          };
        }
      ),
      /***/
      "4930": (
        /***/
        function(module2, exports, __webpack_require__) {
          var fails = __webpack_require__("d039");
          module2.exports = !!Object.getOwnPropertySymbols && !fails(function() {
            return !String(Symbol());
          });
        }
      ),
      /***/
      "498a": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var $trim = __webpack_require__("58a8").trim;
          var forcedStringTrimMethod = __webpack_require__("c8d2");
          $({ target: "String", proto: true, forced: forcedStringTrimMethod("trim") }, {
            trim: function trim() {
              return $trim(this);
            }
          });
        }
      ),
      /***/
      "499e": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__.r(__webpack_exports__);
          __webpack_require__.d(__webpack_exports__, "default", function() {
            return (
              /* binding */
              addStylesClient
            );
          });
          function listToStyles(parentId, list) {
            var styles = [];
            var newStyles = {};
            for (var i = 0; i < list.length; i++) {
              var item = list[i];
              var id = item[0];
              var css = item[1];
              var media = item[2];
              var sourceMap = item[3];
              var part = {
                id: parentId + ":" + i,
                css,
                media,
                sourceMap
              };
              if (!newStyles[id]) {
                styles.push(newStyles[id] = { id, parts: [part] });
              } else {
                newStyles[id].parts.push(part);
              }
            }
            return styles;
          }
          var hasDocument = typeof document !== "undefined";
          if (typeof DEBUG !== "undefined" && DEBUG) {
            if (!hasDocument) {
              throw new Error(
                "vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
              );
            }
          }
          var stylesInDom = {
            /*
              [id: number]: {
                id: number,
                refs: number,
                parts: Array<(obj?: StyleObjectPart) => void>
              }
            */
          };
          var head = hasDocument && (document.head || document.getElementsByTagName("head")[0]);
          var singletonElement = null;
          var singletonCounter = 0;
          var isProduction = false;
          var noop = function() {
          };
          var options = null;
          var ssrIdKey = "data-vue-ssr-id";
          var isOldIE = typeof navigator !== "undefined" && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());
          function addStylesClient(parentId, list, _isProduction, _options) {
            isProduction = _isProduction;
            options = _options || {};
            var styles = listToStyles(parentId, list);
            addStylesToDom(styles);
            return function update(newList) {
              var mayRemove = [];
              for (var i = 0; i < styles.length; i++) {
                var item = styles[i];
                var domStyle = stylesInDom[item.id];
                domStyle.refs--;
                mayRemove.push(domStyle);
              }
              if (newList) {
                styles = listToStyles(parentId, newList);
                addStylesToDom(styles);
              } else {
                styles = [];
              }
              for (var i = 0; i < mayRemove.length; i++) {
                var domStyle = mayRemove[i];
                if (domStyle.refs === 0) {
                  for (var j = 0; j < domStyle.parts.length; j++) {
                    domStyle.parts[j]();
                  }
                  delete stylesInDom[domStyle.id];
                }
              }
            };
          }
          function addStylesToDom(styles) {
            for (var i = 0; i < styles.length; i++) {
              var item = styles[i];
              var domStyle = stylesInDom[item.id];
              if (domStyle) {
                domStyle.refs++;
                for (var j = 0; j < domStyle.parts.length; j++) {
                  domStyle.parts[j](item.parts[j]);
                }
                for (; j < item.parts.length; j++) {
                  domStyle.parts.push(addStyle(item.parts[j]));
                }
                if (domStyle.parts.length > item.parts.length) {
                  domStyle.parts.length = item.parts.length;
                }
              } else {
                var parts = [];
                for (var j = 0; j < item.parts.length; j++) {
                  parts.push(addStyle(item.parts[j]));
                }
                stylesInDom[item.id] = { id: item.id, refs: 1, parts };
              }
            }
          }
          function createStyleElement() {
            var styleElement = document.createElement("style");
            styleElement.type = "text/css";
            head.appendChild(styleElement);
            return styleElement;
          }
          function addStyle(obj) {
            var update, remove;
            var styleElement = document.querySelector("style[" + ssrIdKey + '~="' + obj.id + '"]');
            if (styleElement) {
              if (isProduction) {
                return noop;
              } else {
                styleElement.parentNode.removeChild(styleElement);
              }
            }
            if (isOldIE) {
              var styleIndex = singletonCounter++;
              styleElement = singletonElement || (singletonElement = createStyleElement());
              update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
              remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
            } else {
              styleElement = createStyleElement();
              update = applyToTag.bind(null, styleElement);
              remove = function() {
                styleElement.parentNode.removeChild(styleElement);
              };
            }
            update(obj);
            return function updateStyle(newObj) {
              if (newObj) {
                if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
                  return;
                }
                update(obj = newObj);
              } else {
                remove();
              }
            };
          }
          var replaceText = /* @__PURE__ */ function() {
            var textStore = [];
            return function(index, replacement) {
              textStore[index] = replacement;
              return textStore.filter(Boolean).join("\n");
            };
          }();
          function applyToSingletonTag(styleElement, index, remove, obj) {
            var css = remove ? "" : obj.css;
            if (styleElement.styleSheet) {
              styleElement.styleSheet.cssText = replaceText(index, css);
            } else {
              var cssNode = document.createTextNode(css);
              var childNodes = styleElement.childNodes;
              if (childNodes[index]) styleElement.removeChild(childNodes[index]);
              if (childNodes.length) {
                styleElement.insertBefore(cssNode, childNodes[index]);
              } else {
                styleElement.appendChild(cssNode);
              }
            }
          }
          function applyToTag(styleElement, obj) {
            var css = obj.css;
            var media = obj.media;
            var sourceMap = obj.sourceMap;
            if (media) {
              styleElement.setAttribute("media", media);
            }
            if (options.ssrId) {
              styleElement.setAttribute(ssrIdKey, obj.id);
            }
            if (sourceMap) {
              css += "\n/*# sourceURL=" + sourceMap.sources[0] + " */";
              css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
            }
            if (styleElement.styleSheet) {
              styleElement.styleSheet.cssText = css;
            } else {
              while (styleElement.firstChild) {
                styleElement.removeChild(styleElement.firstChild);
              }
              styleElement.appendChild(document.createTextNode(css));
            }
          }
        }
      ),
      /***/
      "4ae1": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var getBuiltIn = __webpack_require__("d066");
          var aFunction = __webpack_require__("1c0b");
          var anObject = __webpack_require__("825a");
          var isObject = __webpack_require__("861d");
          var create = __webpack_require__("7c73");
          var bind = __webpack_require__("0538");
          var fails = __webpack_require__("d039");
          var nativeConstruct = getBuiltIn("Reflect", "construct");
          var NEW_TARGET_BUG = fails(function() {
            function F() {
            }
            return !(nativeConstruct(function() {
            }, [], F) instanceof F);
          });
          var ARGS_BUG = !fails(function() {
            nativeConstruct(function() {
            });
          });
          var FORCED = NEW_TARGET_BUG || ARGS_BUG;
          $({ target: "Reflect", stat: true, forced: FORCED, sham: FORCED }, {
            construct: function construct(Target, args) {
              aFunction(Target);
              anObject(args);
              var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
              if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
              if (Target == newTarget) {
                switch (args.length) {
                  case 0:
                    return new Target();
                  case 1:
                    return new Target(args[0]);
                  case 2:
                    return new Target(args[0], args[1]);
                  case 3:
                    return new Target(args[0], args[1], args[2]);
                  case 4:
                    return new Target(args[0], args[1], args[2], args[3]);
                }
                var $args = [null];
                $args.push.apply($args, args);
                return new (bind.apply(Target, $args))();
              }
              var proto = newTarget.prototype;
              var instance = create(isObject(proto) ? proto : Object.prototype);
              var result = Function.apply.call(Target, instance, args);
              return isObject(result) ? result : instance;
            }
          });
        }
      ),
      /***/
      "4d64": (
        /***/
        function(module2, exports, __webpack_require__) {
          var toIndexedObject = __webpack_require__("fc6a");
          var toLength = __webpack_require__("50c4");
          var toAbsoluteIndex = __webpack_require__("23cb");
          var createMethod = function(IS_INCLUDES) {
            return function($this, el, fromIndex) {
              var O = toIndexedObject($this);
              var length = toLength(O.length);
              var index = toAbsoluteIndex(fromIndex, length);
              var value;
              if (IS_INCLUDES && el != el) while (length > index) {
                value = O[index++];
                if (value != value) return true;
              }
              else for (; length > index; index++) {
                if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
              }
              return !IS_INCLUDES && -1;
            };
          };
          module2.exports = {
            // `Array.prototype.includes` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.includes
            includes: createMethod(true),
            // `Array.prototype.indexOf` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
            indexOf: createMethod(false)
          };
        }
      ),
      /***/
      "4de4": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var $filter = __webpack_require__("b727").filter;
          var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("filter");
          var USES_TO_LENGTH = arrayMethodUsesToLength("filter");
          $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
            filter: function filter(callbackfn) {
              return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
        }
      ),
      /***/
      "4df4": (
        /***/
        function(module2, exports, __webpack_require__) {
          var bind = __webpack_require__("0366");
          var toObject = __webpack_require__("7b0b");
          var callWithSafeIterationClosing = __webpack_require__("9bdd");
          var isArrayIteratorMethod = __webpack_require__("e95a");
          var toLength = __webpack_require__("50c4");
          var createProperty = __webpack_require__("8418");
          var getIteratorMethod = __webpack_require__("35a1");
          module2.exports = function from(arrayLike) {
            var O = toObject(arrayLike);
            var C = typeof this == "function" ? this : Array;
            var argumentsLength = arguments.length;
            var mapfn = argumentsLength > 1 ? arguments[1] : void 0;
            var mapping = mapfn !== void 0;
            var iteratorMethod = getIteratorMethod(O);
            var index = 0;
            var length, result, step, iterator, next, value;
            if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : void 0, 2);
            if (iteratorMethod != void 0 && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
              iterator = iteratorMethod.call(O);
              next = iterator.next;
              result = new C();
              for (; !(step = next.call(iterator)).done; index++) {
                value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
                createProperty(result, index, value);
              }
            } else {
              length = toLength(O.length);
              result = new C(length);
              for (; length > index; index++) {
                value = mapping ? mapfn(O[index], index) : O[index];
                createProperty(result, index, value);
              }
            }
            result.length = index;
            return result;
          };
        }
      ),
      /***/
      "4ec9": (
        /***/
        function(module2, exports, __webpack_require__) {
          var collection = __webpack_require__("6d61");
          var collectionStrong = __webpack_require__("6566");
          module2.exports = collection("Map", function(init) {
            return function Map2() {
              return init(this, arguments.length ? arguments[0] : void 0);
            };
          }, collectionStrong);
        }
      ),
      /***/
      "50c4": (
        /***/
        function(module2, exports, __webpack_require__) {
          var toInteger = __webpack_require__("a691");
          var min = Math.min;
          module2.exports = function(argument) {
            return argument > 0 ? min(toInteger(argument), 9007199254740991) : 0;
          };
        }
      ),
      /***/
      "5135": (
        /***/
        function(module2, exports) {
          var hasOwnProperty = {}.hasOwnProperty;
          module2.exports = function(it, key) {
            return hasOwnProperty.call(it, key);
          };
        }
      ),
      /***/
      "53ca": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__.d(__webpack_exports__, "a", function() {
            return _typeof;
          });
          __webpack_require__("a4d3");
          __webpack_require__("e01a");
          __webpack_require__("d28b");
          __webpack_require__("e260");
          __webpack_require__("d3b7");
          __webpack_require__("3ca3");
          __webpack_require__("ddb0");
          function _typeof(obj) {
            "@babel/helpers - typeof";
            if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
              _typeof = function _typeof2(obj2) {
                return typeof obj2;
              };
            } else {
              _typeof = function _typeof2(obj2) {
                return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
              };
            }
            return _typeof(obj);
          }
        }
      ),
      /***/
      "5692": (
        /***/
        function(module2, exports, __webpack_require__) {
          var IS_PURE = __webpack_require__("c430");
          var store = __webpack_require__("c6cd");
          (module2.exports = function(key, value) {
            return store[key] || (store[key] = value !== void 0 ? value : {});
          })("versions", []).push({
            version: "3.6.5",
            mode: IS_PURE ? "pure" : "global",
            copyright: "© 2020 Denis Pushkarev (zloirock.ru)"
          });
        }
      ),
      /***/
      "56ef": (
        /***/
        function(module2, exports, __webpack_require__) {
          var getBuiltIn = __webpack_require__("d066");
          var getOwnPropertyNamesModule = __webpack_require__("241c");
          var getOwnPropertySymbolsModule = __webpack_require__("7418");
          var anObject = __webpack_require__("825a");
          module2.exports = getBuiltIn("Reflect", "ownKeys") || function ownKeys(it) {
            var keys = getOwnPropertyNamesModule.f(anObject(it));
            var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
            return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
          };
        }
      ),
      /***/
      "5899": (
        /***/
        function(module2, exports) {
          module2.exports = "	\n\v\f\r                　\u2028\u2029\uFEFF";
        }
      ),
      /***/
      "58a8": (
        /***/
        function(module2, exports, __webpack_require__) {
          var requireObjectCoercible = __webpack_require__("1d80");
          var whitespaces = __webpack_require__("5899");
          var whitespace = "[" + whitespaces + "]";
          var ltrim = RegExp("^" + whitespace + whitespace + "*");
          var rtrim = RegExp(whitespace + whitespace + "*$");
          var createMethod = function(TYPE) {
            return function($this) {
              var string = String(requireObjectCoercible($this));
              if (TYPE & 1) string = string.replace(ltrim, "");
              if (TYPE & 2) string = string.replace(rtrim, "");
              return string;
            };
          };
          module2.exports = {
            // `String.prototype.{ trimLeft, trimStart }` methods
            // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
            start: createMethod(1),
            // `String.prototype.{ trimRight, trimEnd }` methods
            // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
            end: createMethod(2),
            // `String.prototype.trim` method
            // https://tc39.github.io/ecma262/#sec-string.prototype.trim
            trim: createMethod(3)
          };
        }
      ),
      /***/
      "5a34": (
        /***/
        function(module2, exports, __webpack_require__) {
          var isRegExp = __webpack_require__("44e7");
          module2.exports = function(it) {
            if (isRegExp(it)) {
              throw TypeError("The method doesn't accept regular expressions");
            }
            return it;
          };
        }
      ),
      /***/
      "5c0b": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          var render2 = function() {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("input", { attrs: { "type": "file", "name": "image", "accept": "image/*", "capture": "environment", "multiple": "" }, on: { "change": _vm.onChangeInput } });
          };
          var staticRenderFns = [];
          __webpack_require__("4160");
          __webpack_require__("d81d");
          __webpack_require__("159b");
          __webpack_require__("96cf");
          var asyncToGenerator = __webpack_require__("1da1");
          var toConsumableArray = __webpack_require__("2909");
          var scanner = __webpack_require__("a180");
          var image_data = __webpack_require__("f718");
          var CommonAPI = __webpack_require__("b3af");
          var jsqr = __webpack_require__("3c85");
          var QrcodeCapturevue_type_script_lang_js_ = {
            name: "qrcode-capture",
            mixins: [CommonAPI[
              "a"
              /* default */
            ]],
            props: {
              worker: {
                type: Function,
                default: jsqr[
                  "a"
                  /* default */
                ]
              }
            },
            methods: {
              onChangeInput: function onChangeInput(event) {
                var files = Object(toConsumableArray[
                  "a"
                  /* default */
                ])(event.target.files);
                var resultPromises = files.map(this.processFile);
                resultPromises.forEach(this.onDetect);
              },
              processFile: function processFile(file) {
                var _this = this;
                return Object(asyncToGenerator[
                  "a"
                  /* default */
                ])(/* @__PURE__ */ regeneratorRuntime.mark(function _callee() {
                  var imageData, scanResult;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return Object(image_data[
                            "a"
                            /* imageDataFromFile */
                          ])(file);
                        case 2:
                          imageData = _context.sent;
                          _context.next = 5;
                          return Object(scanner[
                            "b"
                            /* scan */
                          ])(_this.worker, imageData);
                        case 5:
                          scanResult = _context.sent;
                          return _context.abrupt("return", scanResult);
                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }))();
              }
            }
          };
          var components_QrcodeCapturevue_type_script_lang_js_ = QrcodeCapturevue_type_script_lang_js_;
          var componentNormalizer = __webpack_require__("2877");
          var component = Object(componentNormalizer[
            "a"
            /* default */
          ])(
            components_QrcodeCapturevue_type_script_lang_js_,
            render2,
            staticRenderFns,
            false,
            null,
            null,
            null
          );
          __webpack_exports__["a"] = component.exports;
        }
      ),
      /***/
      "5c6c": (
        /***/
        function(module2, exports) {
          module2.exports = function(bitmap, value) {
            return {
              enumerable: !(bitmap & 1),
              configurable: !(bitmap & 2),
              writable: !(bitmap & 4),
              value
            };
          };
        }
      ),
      /***/
      "5fb2": (
        /***/
        function(module2, exports, __webpack_require__) {
          var maxInt = 2147483647;
          var base = 36;
          var tMin = 1;
          var tMax = 26;
          var skew = 38;
          var damp = 700;
          var initialBias = 72;
          var initialN = 128;
          var delimiter = "-";
          var regexNonASCII = /[^\0-\u007E]/;
          var regexSeparators = /[.\u3002\uFF0E\uFF61]/g;
          var OVERFLOW_ERROR = "Overflow: input needs wider integers to process";
          var baseMinusTMin = base - tMin;
          var floor = Math.floor;
          var stringFromCharCode = String.fromCharCode;
          var ucs2decode = function(string) {
            var output = [];
            var counter = 0;
            var length = string.length;
            while (counter < length) {
              var value = string.charCodeAt(counter++);
              if (value >= 55296 && value <= 56319 && counter < length) {
                var extra = string.charCodeAt(counter++);
                if ((extra & 64512) == 56320) {
                  output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                } else {
                  output.push(value);
                  counter--;
                }
              } else {
                output.push(value);
              }
            }
            return output;
          };
          var digitToBasic = function(digit) {
            return digit + 22 + 75 * (digit < 26);
          };
          var adapt = function(delta, numPoints, firstTime) {
            var k = 0;
            delta = firstTime ? floor(delta / damp) : delta >> 1;
            delta += floor(delta / numPoints);
            for (; delta > baseMinusTMin * tMax >> 1; k += base) {
              delta = floor(delta / baseMinusTMin);
            }
            return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
          };
          var encode = function(input) {
            var output = [];
            input = ucs2decode(input);
            var inputLength = input.length;
            var n = initialN;
            var delta = 0;
            var bias = initialBias;
            var i, currentValue;
            for (i = 0; i < input.length; i++) {
              currentValue = input[i];
              if (currentValue < 128) {
                output.push(stringFromCharCode(currentValue));
              }
            }
            var basicLength = output.length;
            var handledCPCount = basicLength;
            if (basicLength) {
              output.push(delimiter);
            }
            while (handledCPCount < inputLength) {
              var m = maxInt;
              for (i = 0; i < input.length; i++) {
                currentValue = input[i];
                if (currentValue >= n && currentValue < m) {
                  m = currentValue;
                }
              }
              var handledCPCountPlusOne = handledCPCount + 1;
              if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                throw RangeError(OVERFLOW_ERROR);
              }
              delta += (m - n) * handledCPCountPlusOne;
              n = m;
              for (i = 0; i < input.length; i++) {
                currentValue = input[i];
                if (currentValue < n && ++delta > maxInt) {
                  throw RangeError(OVERFLOW_ERROR);
                }
                if (currentValue == n) {
                  var q = delta;
                  for (var k = base; ; k += base) {
                    var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                    if (q < t) break;
                    var qMinusT = q - t;
                    var baseMinusT = base - t;
                    output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
                    q = floor(qMinusT / baseMinusT);
                  }
                  output.push(stringFromCharCode(digitToBasic(q)));
                  bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                  delta = 0;
                  ++handledCPCount;
                }
              }
              ++delta;
              ++n;
            }
            return output.join("");
          };
          module2.exports = function(input) {
            var encoded = [];
            var labels = input.toLowerCase().replace(regexSeparators, ".").split(".");
            var i, label;
            for (i = 0; i < labels.length; i++) {
              label = labels[i];
              encoded.push(regexNonASCII.test(label) ? "xn--" + encode(label) : label);
            }
            return encoded.join(".");
          };
        }
      ),
      /***/
      "60da": (
        /***/
        function(module2, exports, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var fails = __webpack_require__("d039");
          var objectKeys = __webpack_require__("df75");
          var getOwnPropertySymbolsModule = __webpack_require__("7418");
          var propertyIsEnumerableModule = __webpack_require__("d1e7");
          var toObject = __webpack_require__("7b0b");
          var IndexedObject = __webpack_require__("44ad");
          var nativeAssign = Object.assign;
          var defineProperty = Object.defineProperty;
          module2.exports = !nativeAssign || fails(function() {
            if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, "a", {
              enumerable: true,
              get: function() {
                defineProperty(this, "b", {
                  value: 3,
                  enumerable: false
                });
              }
            }), { b: 2 })).b !== 1) return true;
            var A = {};
            var B = {};
            var symbol = Symbol();
            var alphabet = "abcdefghijklmnopqrst";
            A[symbol] = 7;
            alphabet.split("").forEach(function(chr) {
              B[chr] = chr;
            });
            return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join("") != alphabet;
          }) ? function assign(target, source) {
            var T = toObject(target);
            var argumentsLength = arguments.length;
            var index = 1;
            var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
            var propertyIsEnumerable = propertyIsEnumerableModule.f;
            while (argumentsLength > index) {
              var S = IndexedObject(arguments[index++]);
              var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
              var length = keys.length;
              var j = 0;
              var key;
              while (length > j) {
                key = keys[j++];
                if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
              }
            }
            return T;
          } : nativeAssign;
        }
      ),
      /***/
      "6547": (
        /***/
        function(module2, exports, __webpack_require__) {
          var toInteger = __webpack_require__("a691");
          var requireObjectCoercible = __webpack_require__("1d80");
          var createMethod = function(CONVERT_TO_STRING) {
            return function($this, pos) {
              var S = String(requireObjectCoercible($this));
              var position = toInteger(pos);
              var size = S.length;
              var first, second;
              if (position < 0 || position >= size) return CONVERT_TO_STRING ? "" : void 0;
              first = S.charCodeAt(position);
              return first < 55296 || first > 56319 || position + 1 === size || (second = S.charCodeAt(position + 1)) < 56320 || second > 57343 ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 55296 << 10) + (second - 56320) + 65536;
            };
          };
          module2.exports = {
            // `String.prototype.codePointAt` method
            // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
            codeAt: createMethod(false),
            // `String.prototype.at` method
            // https://github.com/mathiasbynens/String.prototype.at
            charAt: createMethod(true)
          };
        }
      ),
      /***/
      "6566": (
        /***/
        function(module2, exports, __webpack_require__) {
          var defineProperty = __webpack_require__("9bf2").f;
          var create = __webpack_require__("7c73");
          var redefineAll = __webpack_require__("e2cc");
          var bind = __webpack_require__("0366");
          var anInstance = __webpack_require__("19aa");
          var iterate = __webpack_require__("2266");
          var defineIterator = __webpack_require__("7dd0");
          var setSpecies = __webpack_require__("2626");
          var DESCRIPTORS = __webpack_require__("83ab");
          var fastKey = __webpack_require__("f183").fastKey;
          var InternalStateModule = __webpack_require__("69f3");
          var setInternalState = InternalStateModule.set;
          var internalStateGetterFor = InternalStateModule.getterFor;
          module2.exports = {
            getConstructor: function(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
              var C = wrapper(function(that, iterable) {
                anInstance(that, C, CONSTRUCTOR_NAME);
                setInternalState(that, {
                  type: CONSTRUCTOR_NAME,
                  index: create(null),
                  first: void 0,
                  last: void 0,
                  size: 0
                });
                if (!DESCRIPTORS) that.size = 0;
                if (iterable != void 0) iterate(iterable, that[ADDER], that, IS_MAP);
              });
              var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
              var define = function(that, key, value) {
                var state = getInternalState(that);
                var entry = getEntry(that, key);
                var previous, index;
                if (entry) {
                  entry.value = value;
                } else {
                  state.last = entry = {
                    index: index = fastKey(key, true),
                    key,
                    value,
                    previous: previous = state.last,
                    next: void 0,
                    removed: false
                  };
                  if (!state.first) state.first = entry;
                  if (previous) previous.next = entry;
                  if (DESCRIPTORS) state.size++;
                  else that.size++;
                  if (index !== "F") state.index[index] = entry;
                }
                return that;
              };
              var getEntry = function(that, key) {
                var state = getInternalState(that);
                var index = fastKey(key);
                var entry;
                if (index !== "F") return state.index[index];
                for (entry = state.first; entry; entry = entry.next) {
                  if (entry.key == key) return entry;
                }
              };
              redefineAll(C.prototype, {
                // 23.1.3.1 Map.prototype.clear()
                // 23.2.3.2 Set.prototype.clear()
                clear: function clear() {
                  var that = this;
                  var state = getInternalState(that);
                  var data = state.index;
                  var entry = state.first;
                  while (entry) {
                    entry.removed = true;
                    if (entry.previous) entry.previous = entry.previous.next = void 0;
                    delete data[entry.index];
                    entry = entry.next;
                  }
                  state.first = state.last = void 0;
                  if (DESCRIPTORS) state.size = 0;
                  else that.size = 0;
                },
                // 23.1.3.3 Map.prototype.delete(key)
                // 23.2.3.4 Set.prototype.delete(value)
                "delete": function(key) {
                  var that = this;
                  var state = getInternalState(that);
                  var entry = getEntry(that, key);
                  if (entry) {
                    var next = entry.next;
                    var prev = entry.previous;
                    delete state.index[entry.index];
                    entry.removed = true;
                    if (prev) prev.next = next;
                    if (next) next.previous = prev;
                    if (state.first == entry) state.first = next;
                    if (state.last == entry) state.last = prev;
                    if (DESCRIPTORS) state.size--;
                    else that.size--;
                  }
                  return !!entry;
                },
                // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
                // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
                forEach: function forEach(callbackfn) {
                  var state = getInternalState(this);
                  var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : void 0, 3);
                  var entry;
                  while (entry = entry ? entry.next : state.first) {
                    boundFunction(entry.value, entry.key, this);
                    while (entry && entry.removed) entry = entry.previous;
                  }
                },
                // 23.1.3.7 Map.prototype.has(key)
                // 23.2.3.7 Set.prototype.has(value)
                has: function has(key) {
                  return !!getEntry(this, key);
                }
              });
              redefineAll(C.prototype, IS_MAP ? {
                // 23.1.3.6 Map.prototype.get(key)
                get: function get(key) {
                  var entry = getEntry(this, key);
                  return entry && entry.value;
                },
                // 23.1.3.9 Map.prototype.set(key, value)
                set: function set(key, value) {
                  return define(this, key === 0 ? 0 : key, value);
                }
              } : {
                // 23.2.3.1 Set.prototype.add(value)
                add: function add(value) {
                  return define(this, value = value === 0 ? 0 : value, value);
                }
              });
              if (DESCRIPTORS) defineProperty(C.prototype, "size", {
                get: function() {
                  return getInternalState(this).size;
                }
              });
              return C;
            },
            setStrong: function(C, CONSTRUCTOR_NAME, IS_MAP) {
              var ITERATOR_NAME = CONSTRUCTOR_NAME + " Iterator";
              var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
              var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
              defineIterator(C, CONSTRUCTOR_NAME, function(iterated, kind) {
                setInternalState(this, {
                  type: ITERATOR_NAME,
                  target: iterated,
                  state: getInternalCollectionState(iterated),
                  kind,
                  last: void 0
                });
              }, function() {
                var state = getInternalIteratorState(this);
                var kind = state.kind;
                var entry = state.last;
                while (entry && entry.removed) entry = entry.previous;
                if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
                  state.target = void 0;
                  return { value: void 0, done: true };
                }
                if (kind == "keys") return { value: entry.key, done: false };
                if (kind == "values") return { value: entry.value, done: false };
                return { value: [entry.key, entry.value], done: false };
              }, IS_MAP ? "entries" : "values", !IS_MAP, true);
              setSpecies(CONSTRUCTOR_NAME);
            }
          };
        }
      ),
      /***/
      "65f0": (
        /***/
        function(module2, exports, __webpack_require__) {
          var isObject = __webpack_require__("861d");
          var isArray = __webpack_require__("e8b5");
          var wellKnownSymbol = __webpack_require__("b622");
          var SPECIES = wellKnownSymbol("species");
          module2.exports = function(originalArray, length) {
            var C;
            if (isArray(originalArray)) {
              C = originalArray.constructor;
              if (typeof C == "function" && (C === Array || isArray(C.prototype))) C = void 0;
              else if (isObject(C)) {
                C = C[SPECIES];
                if (C === null) C = void 0;
              }
            }
            return new (C === void 0 ? Array : C)(length === 0 ? 0 : length);
          };
        }
      ),
      /***/
      "69f3": (
        /***/
        function(module2, exports, __webpack_require__) {
          var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
          var global = __webpack_require__("da84");
          var isObject = __webpack_require__("861d");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var objectHas = __webpack_require__("5135");
          var sharedKey = __webpack_require__("f772");
          var hiddenKeys = __webpack_require__("d012");
          var WeakMap = global.WeakMap;
          var set, get, has;
          var enforce = function(it) {
            return has(it) ? get(it) : set(it, {});
          };
          var getterFor = function(TYPE) {
            return function(it) {
              var state;
              if (!isObject(it) || (state = get(it)).type !== TYPE) {
                throw TypeError("Incompatible receiver, " + TYPE + " required");
              }
              return state;
            };
          };
          if (NATIVE_WEAK_MAP) {
            var store = new WeakMap();
            var wmget = store.get;
            var wmhas = store.has;
            var wmset = store.set;
            set = function(it, metadata) {
              wmset.call(store, it, metadata);
              return metadata;
            };
            get = function(it) {
              return wmget.call(store, it) || {};
            };
            has = function(it) {
              return wmhas.call(store, it);
            };
          } else {
            var STATE = sharedKey("state");
            hiddenKeys[STATE] = true;
            set = function(it, metadata) {
              createNonEnumerableProperty(it, STATE, metadata);
              return metadata;
            };
            get = function(it) {
              return objectHas(it, STATE) ? it[STATE] : {};
            };
            has = function(it) {
              return objectHas(it, STATE);
            };
          }
          module2.exports = {
            set,
            get,
            has,
            enforce,
            getterFor
          };
        }
      ),
      /***/
      "6b75": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__.d(__webpack_exports__, "a", function() {
            return _arrayLikeToArray;
          });
          function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
              arr2[i] = arr[i];
            }
            return arr2;
          }
        }
      ),
      /***/
      "6d61": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var global = __webpack_require__("da84");
          var isForced = __webpack_require__("94ca");
          var redefine = __webpack_require__("6eeb");
          var InternalMetadataModule = __webpack_require__("f183");
          var iterate = __webpack_require__("2266");
          var anInstance = __webpack_require__("19aa");
          var isObject = __webpack_require__("861d");
          var fails = __webpack_require__("d039");
          var checkCorrectnessOfIteration = __webpack_require__("1c7e");
          var setToStringTag = __webpack_require__("d44e");
          var inheritIfRequired = __webpack_require__("7156");
          module2.exports = function(CONSTRUCTOR_NAME, wrapper, common) {
            var IS_MAP = CONSTRUCTOR_NAME.indexOf("Map") !== -1;
            var IS_WEAK = CONSTRUCTOR_NAME.indexOf("Weak") !== -1;
            var ADDER = IS_MAP ? "set" : "add";
            var NativeConstructor = global[CONSTRUCTOR_NAME];
            var NativePrototype = NativeConstructor && NativeConstructor.prototype;
            var Constructor = NativeConstructor;
            var exported = {};
            var fixMethod = function(KEY) {
              var nativeMethod = NativePrototype[KEY];
              redefine(
                NativePrototype,
                KEY,
                KEY == "add" ? function add(value) {
                  nativeMethod.call(this, value === 0 ? 0 : value);
                  return this;
                } : KEY == "delete" ? function(key) {
                  return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
                } : KEY == "get" ? function get(key) {
                  return IS_WEAK && !isObject(key) ? void 0 : nativeMethod.call(this, key === 0 ? 0 : key);
                } : KEY == "has" ? function has(key) {
                  return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
                } : function set(key, value) {
                  nativeMethod.call(this, key === 0 ? 0 : key, value);
                  return this;
                }
              );
            };
            if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != "function" || !(IS_WEAK || NativePrototype.forEach && !fails(function() {
              new NativeConstructor().entries().next();
            })))) {
              Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
              InternalMetadataModule.REQUIRED = true;
            } else if (isForced(CONSTRUCTOR_NAME, true)) {
              var instance = new Constructor();
              var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
              var THROWS_ON_PRIMITIVES = fails(function() {
                instance.has(1);
              });
              var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function(iterable) {
                new NativeConstructor(iterable);
              });
              var BUGGY_ZERO = !IS_WEAK && fails(function() {
                var $instance = new NativeConstructor();
                var index = 5;
                while (index--) $instance[ADDER](index, index);
                return !$instance.has(-0);
              });
              if (!ACCEPT_ITERABLES) {
                Constructor = wrapper(function(dummy, iterable) {
                  anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
                  var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
                  if (iterable != void 0) iterate(iterable, that[ADDER], that, IS_MAP);
                  return that;
                });
                Constructor.prototype = NativePrototype;
                NativePrototype.constructor = Constructor;
              }
              if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
                fixMethod("delete");
                fixMethod("has");
                IS_MAP && fixMethod("get");
              }
              if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
              if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
            }
            exported[CONSTRUCTOR_NAME] = Constructor;
            $({ global: true, forced: Constructor != NativeConstructor }, exported);
            setToStringTag(Constructor, CONSTRUCTOR_NAME);
            if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
            return Constructor;
          };
        }
      ),
      /***/
      "6eeb": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var has = __webpack_require__("5135");
          var setGlobal = __webpack_require__("ce4e");
          var inspectSource = __webpack_require__("8925");
          var InternalStateModule = __webpack_require__("69f3");
          var getInternalState = InternalStateModule.get;
          var enforceInternalState = InternalStateModule.enforce;
          var TEMPLATE = String(String).split("String");
          (module2.exports = function(O, key, value, options) {
            var unsafe = options ? !!options.unsafe : false;
            var simple = options ? !!options.enumerable : false;
            var noTargetGet = options ? !!options.noTargetGet : false;
            if (typeof value == "function") {
              if (typeof key == "string" && !has(value, "name")) createNonEnumerableProperty(value, "name", key);
              enforceInternalState(value).source = TEMPLATE.join(typeof key == "string" ? key : "");
            }
            if (O === global) {
              if (simple) O[key] = value;
              else setGlobal(key, value);
              return;
            } else if (!unsafe) {
              delete O[key];
            } else if (!noTargetGet && O[key]) {
              simple = true;
            }
            if (simple) O[key] = value;
            else createNonEnumerableProperty(O, key, value);
          })(Function.prototype, "toString", function toString() {
            return typeof this == "function" && getInternalState(this).source || inspectSource(this);
          });
        }
      ),
      /***/
      "7156": (
        /***/
        function(module2, exports, __webpack_require__) {
          var isObject = __webpack_require__("861d");
          var setPrototypeOf = __webpack_require__("d2bb");
          module2.exports = function($this, dummy, Wrapper) {
            var NewTarget, NewTargetPrototype;
            if (
              // it can work only with native `setPrototypeOf`
              setPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
              typeof (NewTarget = dummy.constructor) == "function" && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype
            ) setPrototypeOf($this, NewTargetPrototype);
            return $this;
          };
        }
      ),
      /***/
      "7418": (
        /***/
        function(module2, exports) {
          exports.f = Object.getOwnPropertySymbols;
        }
      ),
      /***/
      "746f": (
        /***/
        function(module2, exports, __webpack_require__) {
          var path = __webpack_require__("428f");
          var has = __webpack_require__("5135");
          var wrappedWellKnownSymbolModule = __webpack_require__("e538");
          var defineProperty = __webpack_require__("9bf2").f;
          module2.exports = function(NAME) {
            var Symbol2 = path.Symbol || (path.Symbol = {});
            if (!has(Symbol2, NAME)) defineProperty(Symbol2, NAME, {
              value: wrappedWellKnownSymbolModule.f(NAME)
            });
          };
        }
      ),
      /***/
      "7839": (
        /***/
        function(module2, exports) {
          module2.exports = [
            "constructor",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "toLocaleString",
            "toString",
            "valueOf"
          ];
        }
      ),
      /***/
      "7b0b": (
        /***/
        function(module2, exports, __webpack_require__) {
          var requireObjectCoercible = __webpack_require__("1d80");
          module2.exports = function(argument) {
            return Object(requireObjectCoercible(argument));
          };
        }
      ),
      /***/
      "7c73": (
        /***/
        function(module2, exports, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          var defineProperties = __webpack_require__("37e8");
          var enumBugKeys = __webpack_require__("7839");
          var hiddenKeys = __webpack_require__("d012");
          var html = __webpack_require__("1be4");
          var documentCreateElement = __webpack_require__("cc12");
          var sharedKey = __webpack_require__("f772");
          var GT = ">";
          var LT = "<";
          var PROTOTYPE = "prototype";
          var SCRIPT = "script";
          var IE_PROTO = sharedKey("IE_PROTO");
          var EmptyConstructor = function() {
          };
          var scriptTag = function(content) {
            return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
          };
          var NullProtoObjectViaActiveX = function(activeXDocument2) {
            activeXDocument2.write(scriptTag(""));
            activeXDocument2.close();
            var temp = activeXDocument2.parentWindow.Object;
            activeXDocument2 = null;
            return temp;
          };
          var NullProtoObjectViaIFrame = function() {
            var iframe = documentCreateElement("iframe");
            var JS = "java" + SCRIPT + ":";
            var iframeDocument;
            iframe.style.display = "none";
            html.appendChild(iframe);
            iframe.src = String(JS);
            iframeDocument = iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write(scriptTag("document.F=Object"));
            iframeDocument.close();
            return iframeDocument.F;
          };
          var activeXDocument;
          var NullProtoObject = function() {
            try {
              activeXDocument = document.domain && new ActiveXObject("htmlfile");
            } catch (error) {
            }
            NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
            var length = enumBugKeys.length;
            while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
            return NullProtoObject();
          };
          hiddenKeys[IE_PROTO] = true;
          module2.exports = Object.create || function create(O, Properties) {
            var result;
            if (O !== null) {
              EmptyConstructor[PROTOTYPE] = anObject(O);
              result = new EmptyConstructor();
              EmptyConstructor[PROTOTYPE] = null;
              result[IE_PROTO] = O;
            } else result = NullProtoObject();
            return Properties === void 0 ? result : defineProperties(result, Properties);
          };
        }
      ),
      /***/
      "7db0": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var $find = __webpack_require__("b727").find;
          var addToUnscopables = __webpack_require__("44d2");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var FIND = "find";
          var SKIPS_HOLES = true;
          var USES_TO_LENGTH = arrayMethodUsesToLength(FIND);
          if (FIND in []) Array(1)[FIND](function() {
            SKIPS_HOLES = false;
          });
          $({ target: "Array", proto: true, forced: SKIPS_HOLES || !USES_TO_LENGTH }, {
            find: function find(callbackfn) {
              return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
          addToUnscopables(FIND);
        }
      ),
      /***/
      "7dd0": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var createIteratorConstructor = __webpack_require__("9ed3");
          var getPrototypeOf = __webpack_require__("e163");
          var setPrototypeOf = __webpack_require__("d2bb");
          var setToStringTag = __webpack_require__("d44e");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var redefine = __webpack_require__("6eeb");
          var wellKnownSymbol = __webpack_require__("b622");
          var IS_PURE = __webpack_require__("c430");
          var Iterators = __webpack_require__("3f8c");
          var IteratorsCore = __webpack_require__("ae93");
          var IteratorPrototype = IteratorsCore.IteratorPrototype;
          var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
          var ITERATOR = wellKnownSymbol("iterator");
          var KEYS = "keys";
          var VALUES = "values";
          var ENTRIES = "entries";
          var returnThis = function() {
            return this;
          };
          module2.exports = function(Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
            createIteratorConstructor(IteratorConstructor, NAME, next);
            var getIterationMethod = function(KIND) {
              if (KIND === DEFAULT && defaultIterator) return defaultIterator;
              if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
              switch (KIND) {
                case KEYS:
                  return function keys() {
                    return new IteratorConstructor(this, KIND);
                  };
                case VALUES:
                  return function values() {
                    return new IteratorConstructor(this, KIND);
                  };
                case ENTRIES:
                  return function entries() {
                    return new IteratorConstructor(this, KIND);
                  };
              }
              return function() {
                return new IteratorConstructor(this);
              };
            };
            var TO_STRING_TAG = NAME + " Iterator";
            var INCORRECT_VALUES_NAME = false;
            var IterablePrototype = Iterable.prototype;
            var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype["@@iterator"] || DEFAULT && IterablePrototype[DEFAULT];
            var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
            var anyNativeIterator = NAME == "Array" ? IterablePrototype.entries || nativeIterator : nativeIterator;
            var CurrentIteratorPrototype, methods, KEY;
            if (anyNativeIterator) {
              CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
              if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
                if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
                  if (setPrototypeOf) {
                    setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
                  } else if (typeof CurrentIteratorPrototype[ITERATOR] != "function") {
                    createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
                  }
                }
                setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
                if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
              }
            }
            if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
              INCORRECT_VALUES_NAME = true;
              defaultIterator = function values() {
                return nativeIterator.call(this);
              };
            }
            if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
              createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
            }
            Iterators[NAME] = defaultIterator;
            if (DEFAULT) {
              methods = {
                values: getIterationMethod(VALUES),
                keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
                entries: getIterationMethod(ENTRIES)
              };
              if (FORCED) for (KEY in methods) {
                if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
                  redefine(IterablePrototype, KEY, methods[KEY]);
                }
              }
              else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
            }
            return methods;
          };
        }
      ),
      /***/
      "7f9a": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          var inspectSource = __webpack_require__("8925");
          var WeakMap = global.WeakMap;
          module2.exports = typeof WeakMap === "function" && /native code/.test(inspectSource(WeakMap));
        }
      ),
      /***/
      "825a": (
        /***/
        function(module2, exports, __webpack_require__) {
          var isObject = __webpack_require__("861d");
          module2.exports = function(it) {
            if (!isObject(it)) {
              throw TypeError(String(it) + " is not an object");
            }
            return it;
          };
        }
      ),
      /***/
      "83ab": (
        /***/
        function(module2, exports, __webpack_require__) {
          var fails = __webpack_require__("d039");
          module2.exports = !fails(function() {
            return Object.defineProperty({}, 1, { get: function() {
              return 7;
            } })[1] != 7;
          });
        }
      ),
      /***/
      "8418": (
        /***/
        function(module2, exports, __webpack_require__) {
          var toPrimitive = __webpack_require__("c04e");
          var definePropertyModule = __webpack_require__("9bf2");
          var createPropertyDescriptor = __webpack_require__("5c6c");
          module2.exports = function(object, key, value) {
            var propertyKey = toPrimitive(key);
            if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
            else object[propertyKey] = value;
          };
        }
      ),
      /***/
      "861d": (
        /***/
        function(module2, exports) {
          module2.exports = function(it) {
            return typeof it === "object" ? it !== null : typeof it === "function";
          };
        }
      ),
      /***/
      "8875": (
        /***/
        function(module2, exports, __webpack_require__) {
          var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;
          (function(root, factory) {
            {
              !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = factory, __WEBPACK_AMD_DEFINE_RESULT__ = typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function" ? __WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__) : __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__));
            }
          })(typeof self !== "undefined" ? self : this, function() {
            function getCurrentScript() {
              var descriptor = Object.getOwnPropertyDescriptor(document, "currentScript");
              if (!descriptor && "currentScript" in document && document.currentScript) {
                return document.currentScript;
              }
              if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
                return document.currentScript;
              }
              try {
                throw new Error();
              } catch (err) {
                var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig, ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig, stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack), scriptLocation = stackDetails && stackDetails[1] || false, line = stackDetails && stackDetails[2] || false, currentLocation = document.location.href.replace(document.location.hash, ""), pageSource, inlineScriptSourceRegExp, inlineScriptSource, scripts = document.getElementsByTagName("script");
                if (scriptLocation === currentLocation) {
                  pageSource = document.documentElement.outerHTML;
                  inlineScriptSourceRegExp = new RegExp("(?:[^\\n]+?\\n){0," + (line - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i");
                  inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, "$1").trim();
                }
                for (var i = 0; i < scripts.length; i++) {
                  if (scripts[i].readyState === "interactive") {
                    return scripts[i];
                  }
                  if (scripts[i].src === scriptLocation) {
                    return scripts[i];
                  }
                  if (scriptLocation === currentLocation && scripts[i].innerHTML && scripts[i].innerHTML.trim() === inlineScriptSource) {
                    return scripts[i];
                  }
                }
                return null;
              }
            }
            return getCurrentScript;
          });
        }
      ),
      /***/
      "8925": (
        /***/
        function(module2, exports, __webpack_require__) {
          var store = __webpack_require__("c6cd");
          var functionToString = Function.toString;
          if (typeof store.inspectSource != "function") {
            store.inspectSource = function(it) {
              return functionToString.call(it);
            };
          }
          module2.exports = store.inspectSource;
        }
      ),
      /***/
      "8a79": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
          var toLength = __webpack_require__("50c4");
          var notARegExp = __webpack_require__("5a34");
          var requireObjectCoercible = __webpack_require__("1d80");
          var correctIsRegExpLogic = __webpack_require__("ab13");
          var IS_PURE = __webpack_require__("c430");
          var nativeEndsWith = "".endsWith;
          var min = Math.min;
          var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic("endsWith");
          var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!function() {
            var descriptor = getOwnPropertyDescriptor(String.prototype, "endsWith");
            return descriptor && !descriptor.writable;
          }();
          $({ target: "String", proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
            endsWith: function endsWith(searchString) {
              var that = String(requireObjectCoercible(this));
              notARegExp(searchString);
              var endPosition = arguments.length > 1 ? arguments[1] : void 0;
              var len = toLength(that.length);
              var end = endPosition === void 0 ? len : min(toLength(endPosition), len);
              var search = String(searchString);
              return nativeEndsWith ? nativeEndsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
            }
          });
        }
      ),
      /***/
      "8aa5": (
        /***/
        function(module2, exports, __webpack_require__) {
          var charAt = __webpack_require__("6547").charAt;
          module2.exports = function(S, index, unicode) {
            return index + (unicode ? charAt(S, index).length : 1);
          };
        }
      ),
      /***/
      "90e3": (
        /***/
        function(module2, exports) {
          var id = 0;
          var postfix = Math.random();
          module2.exports = function(key) {
            return "Symbol(" + String(key === void 0 ? "" : key) + ")_" + (++id + postfix).toString(36);
          };
        }
      ),
      /***/
      "9112": (
        /***/
        function(module2, exports, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var definePropertyModule = __webpack_require__("9bf2");
          var createPropertyDescriptor = __webpack_require__("5c6c");
          module2.exports = DESCRIPTORS ? function(object, key, value) {
            return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
          } : function(object, key, value) {
            object[key] = value;
            return object;
          };
        }
      ),
      /***/
      "9263": (
        /***/
        function(module2, exports, __webpack_require__) {
          var regexpFlags = __webpack_require__("ad6d");
          var stickyHelpers = __webpack_require__("9f7f");
          var nativeExec = RegExp.prototype.exec;
          var nativeReplace = String.prototype.replace;
          var patchedExec = nativeExec;
          var UPDATES_LAST_INDEX_WRONG = function() {
            var re1 = /a/;
            var re2 = /b*/g;
            nativeExec.call(re1, "a");
            nativeExec.call(re2, "a");
            return re1.lastIndex !== 0 || re2.lastIndex !== 0;
          }();
          var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;
          var NPCG_INCLUDED = /()??/.exec("")[1] !== void 0;
          var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;
          if (PATCH) {
            patchedExec = function exec(str) {
              var re = this;
              var lastIndex, reCopy, match, i;
              var sticky = UNSUPPORTED_Y && re.sticky;
              var flags = regexpFlags.call(re);
              var source = re.source;
              var charsAdded = 0;
              var strCopy = str;
              if (sticky) {
                flags = flags.replace("y", "");
                if (flags.indexOf("g") === -1) {
                  flags += "g";
                }
                strCopy = String(str).slice(re.lastIndex);
                if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== "\n")) {
                  source = "(?: " + source + ")";
                  strCopy = " " + strCopy;
                  charsAdded++;
                }
                reCopy = new RegExp("^(?:" + source + ")", flags);
              }
              if (NPCG_INCLUDED) {
                reCopy = new RegExp("^" + source + "$(?!\\s)", flags);
              }
              if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
              match = nativeExec.call(sticky ? reCopy : re, strCopy);
              if (sticky) {
                if (match) {
                  match.input = match.input.slice(charsAdded);
                  match[0] = match[0].slice(charsAdded);
                  match.index = re.lastIndex;
                  re.lastIndex += match[0].length;
                } else re.lastIndex = 0;
              } else if (UPDATES_LAST_INDEX_WRONG && match) {
                re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
              }
              if (NPCG_INCLUDED && match && match.length > 1) {
                nativeReplace.call(match[0], reCopy, function() {
                  for (i = 1; i < arguments.length - 2; i++) {
                    if (arguments[i] === void 0) match[i] = void 0;
                  }
                });
              }
              return match;
            };
          }
          module2.exports = patchedExec;
        }
      ),
      /***/
      "94ca": (
        /***/
        function(module2, exports, __webpack_require__) {
          var fails = __webpack_require__("d039");
          var replacement = /#|\.prototype\./;
          var isForced = function(feature, detection) {
            var value = data[normalize(feature)];
            return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == "function" ? fails(detection) : !!detection;
          };
          var normalize = isForced.normalize = function(string) {
            return String(string).replace(replacement, ".").toLowerCase();
          };
          var data = isForced.data = {};
          var NATIVE = isForced.NATIVE = "N";
          var POLYFILL = isForced.POLYFILL = "P";
          module2.exports = isForced;
        }
      ),
      /***/
      "96cf": (
        /***/
        function(module2, exports, __webpack_require__) {
          var runtime = function(exports2) {
            var Op = Object.prototype;
            var hasOwn = Op.hasOwnProperty;
            var undefined$1;
            var $Symbol = typeof Symbol === "function" ? Symbol : {};
            var iteratorSymbol = $Symbol.iterator || "@@iterator";
            var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
            var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
            function wrap(innerFn, outerFn, self2, tryLocsList) {
              var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
              var generator = Object.create(protoGenerator.prototype);
              var context = new Context(tryLocsList || []);
              generator._invoke = makeInvokeMethod(innerFn, self2, context);
              return generator;
            }
            exports2.wrap = wrap;
            function tryCatch(fn, obj, arg) {
              try {
                return { type: "normal", arg: fn.call(obj, arg) };
              } catch (err) {
                return { type: "throw", arg: err };
              }
            }
            var GenStateSuspendedStart = "suspendedStart";
            var GenStateSuspendedYield = "suspendedYield";
            var GenStateExecuting = "executing";
            var GenStateCompleted = "completed";
            var ContinueSentinel = {};
            function Generator() {
            }
            function GeneratorFunction() {
            }
            function GeneratorFunctionPrototype() {
            }
            var IteratorPrototype = {};
            IteratorPrototype[iteratorSymbol] = function() {
              return this;
            };
            var getProto = Object.getPrototypeOf;
            var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
            if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
              IteratorPrototype = NativeIteratorPrototype;
            }
            var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
            GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
            GeneratorFunctionPrototype.constructor = GeneratorFunction;
            GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
            function defineIteratorMethods(prototype) {
              ["next", "throw", "return"].forEach(function(method) {
                prototype[method] = function(arg) {
                  return this._invoke(method, arg);
                };
              });
            }
            exports2.isGeneratorFunction = function(genFun) {
              var ctor = typeof genFun === "function" && genFun.constructor;
              return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
              // do is to check its .name property.
              (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
            };
            exports2.mark = function(genFun) {
              if (Object.setPrototypeOf) {
                Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
              } else {
                genFun.__proto__ = GeneratorFunctionPrototype;
                if (!(toStringTagSymbol in genFun)) {
                  genFun[toStringTagSymbol] = "GeneratorFunction";
                }
              }
              genFun.prototype = Object.create(Gp);
              return genFun;
            };
            exports2.awrap = function(arg) {
              return { __await: arg };
            };
            function AsyncIterator(generator, PromiseImpl) {
              function invoke(method, arg, resolve, reject) {
                var record = tryCatch(generator[method], generator, arg);
                if (record.type === "throw") {
                  reject(record.arg);
                } else {
                  var result = record.arg;
                  var value = result.value;
                  if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
                    return PromiseImpl.resolve(value.__await).then(function(value2) {
                      invoke("next", value2, resolve, reject);
                    }, function(err) {
                      invoke("throw", err, resolve, reject);
                    });
                  }
                  return PromiseImpl.resolve(value).then(function(unwrapped) {
                    result.value = unwrapped;
                    resolve(result);
                  }, function(error) {
                    return invoke("throw", error, resolve, reject);
                  });
                }
              }
              var previousPromise;
              function enqueue(method, arg) {
                function callInvokeWithMethodAndArg() {
                  return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                  });
                }
                return previousPromise = // If enqueue has been called before, then we want to wait until
                // all previous Promises have been resolved before calling invoke,
                // so that results are always delivered in the correct order. If
                // enqueue has not been called before, then it is important to
                // call invoke immediately, without waiting on a callback to fire,
                // so that the async generator function has the opportunity to do
                // any necessary setup in a predictable way. This predictability
                // is why the Promise constructor synchronously invokes its
                // executor callback, and why async functions synchronously
                // execute code before the first await. Since we implement simple
                // async functions in terms of async generators, it is especially
                // important to get this right, even though it requires care.
                previousPromise ? previousPromise.then(
                  callInvokeWithMethodAndArg,
                  // Avoid propagating failures to Promises returned by later
                  // invocations of the iterator.
                  callInvokeWithMethodAndArg
                ) : callInvokeWithMethodAndArg();
              }
              this._invoke = enqueue;
            }
            defineIteratorMethods(AsyncIterator.prototype);
            AsyncIterator.prototype[asyncIteratorSymbol] = function() {
              return this;
            };
            exports2.AsyncIterator = AsyncIterator;
            exports2.async = function(innerFn, outerFn, self2, tryLocsList, PromiseImpl) {
              if (PromiseImpl === void 0) PromiseImpl = Promise;
              var iter = new AsyncIterator(
                wrap(innerFn, outerFn, self2, tryLocsList),
                PromiseImpl
              );
              return exports2.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
                return result.done ? result.value : iter.next();
              });
            };
            function makeInvokeMethod(innerFn, self2, context) {
              var state = GenStateSuspendedStart;
              return function invoke(method, arg) {
                if (state === GenStateExecuting) {
                  throw new Error("Generator is already running");
                }
                if (state === GenStateCompleted) {
                  if (method === "throw") {
                    throw arg;
                  }
                  return doneResult();
                }
                context.method = method;
                context.arg = arg;
                while (true) {
                  var delegate = context.delegate;
                  if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                      if (delegateResult === ContinueSentinel) continue;
                      return delegateResult;
                    }
                  }
                  if (context.method === "next") {
                    context.sent = context._sent = context.arg;
                  } else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                      state = GenStateCompleted;
                      throw context.arg;
                    }
                    context.dispatchException(context.arg);
                  } else if (context.method === "return") {
                    context.abrupt("return", context.arg);
                  }
                  state = GenStateExecuting;
                  var record = tryCatch(innerFn, self2, context);
                  if (record.type === "normal") {
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) {
                      continue;
                    }
                    return {
                      value: record.arg,
                      done: context.done
                    };
                  } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    context.method = "throw";
                    context.arg = record.arg;
                  }
                }
              };
            }
            function maybeInvokeDelegate(delegate, context) {
              var method = delegate.iterator[context.method];
              if (method === undefined$1) {
                context.delegate = null;
                if (context.method === "throw") {
                  if (delegate.iterator["return"]) {
                    context.method = "return";
                    context.arg = undefined$1;
                    maybeInvokeDelegate(delegate, context);
                    if (context.method === "throw") {
                      return ContinueSentinel;
                    }
                  }
                  context.method = "throw";
                  context.arg = new TypeError(
                    "The iterator does not provide a 'throw' method"
                  );
                }
                return ContinueSentinel;
              }
              var record = tryCatch(method, delegate.iterator, context.arg);
              if (record.type === "throw") {
                context.method = "throw";
                context.arg = record.arg;
                context.delegate = null;
                return ContinueSentinel;
              }
              var info = record.arg;
              if (!info) {
                context.method = "throw";
                context.arg = new TypeError("iterator result is not an object");
                context.delegate = null;
                return ContinueSentinel;
              }
              if (info.done) {
                context[delegate.resultName] = info.value;
                context.next = delegate.nextLoc;
                if (context.method !== "return") {
                  context.method = "next";
                  context.arg = undefined$1;
                }
              } else {
                return info;
              }
              context.delegate = null;
              return ContinueSentinel;
            }
            defineIteratorMethods(Gp);
            Gp[toStringTagSymbol] = "Generator";
            Gp[iteratorSymbol] = function() {
              return this;
            };
            Gp.toString = function() {
              return "[object Generator]";
            };
            function pushTryEntry(locs) {
              var entry = { tryLoc: locs[0] };
              if (1 in locs) {
                entry.catchLoc = locs[1];
              }
              if (2 in locs) {
                entry.finallyLoc = locs[2];
                entry.afterLoc = locs[3];
              }
              this.tryEntries.push(entry);
            }
            function resetTryEntry(entry) {
              var record = entry.completion || {};
              record.type = "normal";
              delete record.arg;
              entry.completion = record;
            }
            function Context(tryLocsList) {
              this.tryEntries = [{ tryLoc: "root" }];
              tryLocsList.forEach(pushTryEntry, this);
              this.reset(true);
            }
            exports2.keys = function(object) {
              var keys = [];
              for (var key in object) {
                keys.push(key);
              }
              keys.reverse();
              return function next() {
                while (keys.length) {
                  var key2 = keys.pop();
                  if (key2 in object) {
                    next.value = key2;
                    next.done = false;
                    return next;
                  }
                }
                next.done = true;
                return next;
              };
            };
            function values(iterable) {
              if (iterable) {
                var iteratorMethod = iterable[iteratorSymbol];
                if (iteratorMethod) {
                  return iteratorMethod.call(iterable);
                }
                if (typeof iterable.next === "function") {
                  return iterable;
                }
                if (!isNaN(iterable.length)) {
                  var i = -1, next = function next2() {
                    while (++i < iterable.length) {
                      if (hasOwn.call(iterable, i)) {
                        next2.value = iterable[i];
                        next2.done = false;
                        return next2;
                      }
                    }
                    next2.value = undefined$1;
                    next2.done = true;
                    return next2;
                  };
                  return next.next = next;
                }
              }
              return { next: doneResult };
            }
            exports2.values = values;
            function doneResult() {
              return { value: undefined$1, done: true };
            }
            Context.prototype = {
              constructor: Context,
              reset: function(skipTempReset) {
                this.prev = 0;
                this.next = 0;
                this.sent = this._sent = undefined$1;
                this.done = false;
                this.delegate = null;
                this.method = "next";
                this.arg = undefined$1;
                this.tryEntries.forEach(resetTryEntry);
                if (!skipTempReset) {
                  for (var name in this) {
                    if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                      this[name] = undefined$1;
                    }
                  }
                }
              },
              stop: function() {
                this.done = true;
                var rootEntry = this.tryEntries[0];
                var rootRecord = rootEntry.completion;
                if (rootRecord.type === "throw") {
                  throw rootRecord.arg;
                }
                return this.rval;
              },
              dispatchException: function(exception) {
                if (this.done) {
                  throw exception;
                }
                var context = this;
                function handle(loc, caught) {
                  record.type = "throw";
                  record.arg = exception;
                  context.next = loc;
                  if (caught) {
                    context.method = "next";
                    context.arg = undefined$1;
                  }
                  return !!caught;
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  var record = entry.completion;
                  if (entry.tryLoc === "root") {
                    return handle("end");
                  }
                  if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                      if (this.prev < entry.catchLoc) {
                        return handle(entry.catchLoc, true);
                      } else if (this.prev < entry.finallyLoc) {
                        return handle(entry.finallyLoc);
                      }
                    } else if (hasCatch) {
                      if (this.prev < entry.catchLoc) {
                        return handle(entry.catchLoc, true);
                      }
                    } else if (hasFinally) {
                      if (this.prev < entry.finallyLoc) {
                        return handle(entry.finallyLoc);
                      }
                    } else {
                      throw new Error("try statement without catch or finally");
                    }
                  }
                }
              },
              abrupt: function(type, arg) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                  }
                }
                if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
                  finallyEntry = null;
                }
                var record = finallyEntry ? finallyEntry.completion : {};
                record.type = type;
                record.arg = arg;
                if (finallyEntry) {
                  this.method = "next";
                  this.next = finallyEntry.finallyLoc;
                  return ContinueSentinel;
                }
                return this.complete(record);
              },
              complete: function(record, afterLoc) {
                if (record.type === "throw") {
                  throw record.arg;
                }
                if (record.type === "break" || record.type === "continue") {
                  this.next = record.arg;
                } else if (record.type === "return") {
                  this.rval = this.arg = record.arg;
                  this.method = "return";
                  this.next = "end";
                } else if (record.type === "normal" && afterLoc) {
                  this.next = afterLoc;
                }
                return ContinueSentinel;
              },
              finish: function(finallyLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                  }
                }
              },
              "catch": function(tryLoc) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var entry = this.tryEntries[i];
                  if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                      var thrown = record.arg;
                      resetTryEntry(entry);
                    }
                    return thrown;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function(iterable, resultName, nextLoc) {
                this.delegate = {
                  iterator: values(iterable),
                  resultName,
                  nextLoc
                };
                if (this.method === "next") {
                  this.arg = undefined$1;
                }
                return ContinueSentinel;
              }
            };
            return exports2;
          }(
            // If this script is executing as a CommonJS module, use module.exports
            // as the regeneratorRuntime namespace. Otherwise create a new empty
            // object. Either way, the resulting object will be used to initialize
            // the regeneratorRuntime variable at the top of this file.
            module2.exports
          );
          try {
            regeneratorRuntime = runtime;
          } catch (accidentalStrictMode) {
            Function("r", "regeneratorRuntime = r")(runtime);
          }
        }
      ),
      /***/
      "9861": (
        /***/
        function(module2, exports, __webpack_require__) {
          __webpack_require__("e260");
          var $ = __webpack_require__("23e7");
          var getBuiltIn = __webpack_require__("d066");
          var USE_NATIVE_URL = __webpack_require__("0d3b");
          var redefine = __webpack_require__("6eeb");
          var redefineAll = __webpack_require__("e2cc");
          var setToStringTag = __webpack_require__("d44e");
          var createIteratorConstructor = __webpack_require__("9ed3");
          var InternalStateModule = __webpack_require__("69f3");
          var anInstance = __webpack_require__("19aa");
          var hasOwn = __webpack_require__("5135");
          var bind = __webpack_require__("0366");
          var classof = __webpack_require__("f5df");
          var anObject = __webpack_require__("825a");
          var isObject = __webpack_require__("861d");
          var create = __webpack_require__("7c73");
          var createPropertyDescriptor = __webpack_require__("5c6c");
          var getIterator = __webpack_require__("9a1f");
          var getIteratorMethod = __webpack_require__("35a1");
          var wellKnownSymbol = __webpack_require__("b622");
          var $fetch = getBuiltIn("fetch");
          var Headers = getBuiltIn("Headers");
          var ITERATOR = wellKnownSymbol("iterator");
          var URL_SEARCH_PARAMS = "URLSearchParams";
          var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + "Iterator";
          var setInternalState = InternalStateModule.set;
          var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
          var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);
          var plus = /\+/g;
          var sequences = Array(4);
          var percentSequence = function(bytes) {
            return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp("((?:%[\\da-f]{2}){" + bytes + "})", "gi"));
          };
          var percentDecode = function(sequence) {
            try {
              return decodeURIComponent(sequence);
            } catch (error) {
              return sequence;
            }
          };
          var deserialize = function(it) {
            var result = it.replace(plus, " ");
            var bytes = 4;
            try {
              return decodeURIComponent(result);
            } catch (error) {
              while (bytes) {
                result = result.replace(percentSequence(bytes--), percentDecode);
              }
              return result;
            }
          };
          var find = /[!'()~]|%20/g;
          var replace = {
            "!": "%21",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "~": "%7E",
            "%20": "+"
          };
          var replacer = function(match) {
            return replace[match];
          };
          var serialize = function(it) {
            return encodeURIComponent(it).replace(find, replacer);
          };
          var parseSearchParams = function(result, query) {
            if (query) {
              var attributes = query.split("&");
              var index = 0;
              var attribute, entry;
              while (index < attributes.length) {
                attribute = attributes[index++];
                if (attribute.length) {
                  entry = attribute.split("=");
                  result.push({
                    key: deserialize(entry.shift()),
                    value: deserialize(entry.join("="))
                  });
                }
              }
            }
          };
          var updateSearchParams = function(query) {
            this.entries.length = 0;
            parseSearchParams(this.entries, query);
          };
          var validateArgumentsLength = function(passed, required) {
            if (passed < required) throw TypeError("Not enough arguments");
          };
          var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
            setInternalState(this, {
              type: URL_SEARCH_PARAMS_ITERATOR,
              iterator: getIterator(getInternalParamsState(params).entries),
              kind
            });
          }, "Iterator", function next() {
            var state = getInternalIteratorState(this);
            var kind = state.kind;
            var step = state.iterator.next();
            var entry = step.value;
            if (!step.done) {
              step.value = kind === "keys" ? entry.key : kind === "values" ? entry.value : [entry.key, entry.value];
            }
            return step;
          });
          var URLSearchParamsConstructor = function URLSearchParams2() {
            anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
            var init = arguments.length > 0 ? arguments[0] : void 0;
            var that = this;
            var entries = [];
            var iteratorMethod, iterator, next, step, entryIterator, entryNext, first, second, key;
            setInternalState(that, {
              type: URL_SEARCH_PARAMS,
              entries,
              updateURL: function() {
              },
              updateSearchParams
            });
            if (init !== void 0) {
              if (isObject(init)) {
                iteratorMethod = getIteratorMethod(init);
                if (typeof iteratorMethod === "function") {
                  iterator = iteratorMethod.call(init);
                  next = iterator.next;
                  while (!(step = next.call(iterator)).done) {
                    entryIterator = getIterator(anObject(step.value));
                    entryNext = entryIterator.next;
                    if ((first = entryNext.call(entryIterator)).done || (second = entryNext.call(entryIterator)).done || !entryNext.call(entryIterator).done) throw TypeError("Expected sequence with length 2");
                    entries.push({ key: first.value + "", value: second.value + "" });
                  }
                } else for (key in init) if (hasOwn(init, key)) entries.push({ key, value: init[key] + "" });
              } else {
                parseSearchParams(entries, typeof init === "string" ? init.charAt(0) === "?" ? init.slice(1) : init : init + "");
              }
            }
          };
          var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;
          redefineAll(URLSearchParamsPrototype, {
            // `URLSearchParams.prototype.appent` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-append
            append: function append(name, value) {
              validateArgumentsLength(arguments.length, 2);
              var state = getInternalParamsState(this);
              state.entries.push({ key: name + "", value: value + "" });
              state.updateURL();
            },
            // `URLSearchParams.prototype.delete` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
            "delete": function(name) {
              validateArgumentsLength(arguments.length, 1);
              var state = getInternalParamsState(this);
              var entries = state.entries;
              var key = name + "";
              var index = 0;
              while (index < entries.length) {
                if (entries[index].key === key) entries.splice(index, 1);
                else index++;
              }
              state.updateURL();
            },
            // `URLSearchParams.prototype.get` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-get
            get: function get(name) {
              validateArgumentsLength(arguments.length, 1);
              var entries = getInternalParamsState(this).entries;
              var key = name + "";
              var index = 0;
              for (; index < entries.length; index++) {
                if (entries[index].key === key) return entries[index].value;
              }
              return null;
            },
            // `URLSearchParams.prototype.getAll` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
            getAll: function getAll(name) {
              validateArgumentsLength(arguments.length, 1);
              var entries = getInternalParamsState(this).entries;
              var key = name + "";
              var result = [];
              var index = 0;
              for (; index < entries.length; index++) {
                if (entries[index].key === key) result.push(entries[index].value);
              }
              return result;
            },
            // `URLSearchParams.prototype.has` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-has
            has: function has(name) {
              validateArgumentsLength(arguments.length, 1);
              var entries = getInternalParamsState(this).entries;
              var key = name + "";
              var index = 0;
              while (index < entries.length) {
                if (entries[index++].key === key) return true;
              }
              return false;
            },
            // `URLSearchParams.prototype.set` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-set
            set: function set(name, value) {
              validateArgumentsLength(arguments.length, 1);
              var state = getInternalParamsState(this);
              var entries = state.entries;
              var found = false;
              var key = name + "";
              var val = value + "";
              var index = 0;
              var entry;
              for (; index < entries.length; index++) {
                entry = entries[index];
                if (entry.key === key) {
                  if (found) entries.splice(index--, 1);
                  else {
                    found = true;
                    entry.value = val;
                  }
                }
              }
              if (!found) entries.push({ key, value: val });
              state.updateURL();
            },
            // `URLSearchParams.prototype.sort` method
            // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
            sort: function sort() {
              var state = getInternalParamsState(this);
              var entries = state.entries;
              var slice = entries.slice();
              var entry, entriesIndex, sliceIndex;
              entries.length = 0;
              for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
                entry = slice[sliceIndex];
                for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
                  if (entries[entriesIndex].key > entry.key) {
                    entries.splice(entriesIndex, 0, entry);
                    break;
                  }
                }
                if (entriesIndex === sliceIndex) entries.push(entry);
              }
              state.updateURL();
            },
            // `URLSearchParams.prototype.forEach` method
            forEach: function forEach(callback) {
              var entries = getInternalParamsState(this).entries;
              var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : void 0, 3);
              var index = 0;
              var entry;
              while (index < entries.length) {
                entry = entries[index++];
                boundFunction(entry.value, entry.key, this);
              }
            },
            // `URLSearchParams.prototype.keys` method
            keys: function keys() {
              return new URLSearchParamsIterator(this, "keys");
            },
            // `URLSearchParams.prototype.values` method
            values: function values() {
              return new URLSearchParamsIterator(this, "values");
            },
            // `URLSearchParams.prototype.entries` method
            entries: function entries() {
              return new URLSearchParamsIterator(this, "entries");
            }
          }, { enumerable: true });
          redefine(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries);
          redefine(URLSearchParamsPrototype, "toString", function toString() {
            var entries = getInternalParamsState(this).entries;
            var result = [];
            var index = 0;
            var entry;
            while (index < entries.length) {
              entry = entries[index++];
              result.push(serialize(entry.key) + "=" + serialize(entry.value));
            }
            return result.join("&");
          }, { enumerable: true });
          setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);
          $({ global: true, forced: !USE_NATIVE_URL }, {
            URLSearchParams: URLSearchParamsConstructor
          });
          if (!USE_NATIVE_URL && typeof $fetch == "function" && typeof Headers == "function") {
            $({ global: true, enumerable: true, forced: true }, {
              fetch: function fetch(input) {
                var args = [input];
                var init, body, headers;
                if (arguments.length > 1) {
                  init = arguments[1];
                  if (isObject(init)) {
                    body = init.body;
                    if (classof(body) === URL_SEARCH_PARAMS) {
                      headers = init.headers ? new Headers(init.headers) : new Headers();
                      if (!headers.has("content-type")) {
                        headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
                      }
                      init = create(init, {
                        body: createPropertyDescriptor(0, String(body)),
                        headers: createPropertyDescriptor(0, headers)
                      });
                    }
                  }
                  args.push(init);
                }
                return $fetch.apply(this, args);
              }
            });
          }
          module2.exports = {
            URLSearchParams: URLSearchParamsConstructor,
            getState: getInternalParamsState
          };
        }
      ),
      /***/
      "99af": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var fails = __webpack_require__("d039");
          var isArray = __webpack_require__("e8b5");
          var isObject = __webpack_require__("861d");
          var toObject = __webpack_require__("7b0b");
          var toLength = __webpack_require__("50c4");
          var createProperty = __webpack_require__("8418");
          var arraySpeciesCreate = __webpack_require__("65f0");
          var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
          var wellKnownSymbol = __webpack_require__("b622");
          var V8_VERSION = __webpack_require__("2d00");
          var IS_CONCAT_SPREADABLE = wellKnownSymbol("isConcatSpreadable");
          var MAX_SAFE_INTEGER = 9007199254740991;
          var MAXIMUM_ALLOWED_INDEX_EXCEEDED = "Maximum allowed index exceeded";
          var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function() {
            var array = [];
            array[IS_CONCAT_SPREADABLE] = false;
            return array.concat()[0] !== array;
          });
          var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("concat");
          var isConcatSpreadable = function(O) {
            if (!isObject(O)) return false;
            var spreadable = O[IS_CONCAT_SPREADABLE];
            return spreadable !== void 0 ? !!spreadable : isArray(O);
          };
          var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
          $({ target: "Array", proto: true, forced: FORCED }, {
            concat: function concat(arg) {
              var O = toObject(this);
              var A = arraySpeciesCreate(O, 0);
              var n = 0;
              var i, k, length, len, E;
              for (i = -1, length = arguments.length; i < length; i++) {
                E = i === -1 ? O : arguments[i];
                if (isConcatSpreadable(E)) {
                  len = toLength(E.length);
                  if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                  for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
                } else {
                  if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
                  createProperty(A, n++, E);
                }
              }
              A.length = n;
              return A;
            }
          });
        }
      ),
      /***/
      "9a1f": (
        /***/
        function(module2, exports, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          var getIteratorMethod = __webpack_require__("35a1");
          module2.exports = function(it) {
            var iteratorMethod = getIteratorMethod(it);
            if (typeof iteratorMethod != "function") {
              throw TypeError(String(it) + " is not iterable");
            }
            return anObject(iteratorMethod.call(it));
          };
        }
      ),
      /***/
      "9bdd": (
        /***/
        function(module2, exports, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          module2.exports = function(iterator, fn, value, ENTRIES) {
            try {
              return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
            } catch (error) {
              var returnMethod = iterator["return"];
              if (returnMethod !== void 0) anObject(returnMethod.call(iterator));
              throw error;
            }
          };
        }
      ),
      /***/
      "9bf2": (
        /***/
        function(module2, exports, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var IE8_DOM_DEFINE = __webpack_require__("0cfb");
          var anObject = __webpack_require__("825a");
          var toPrimitive = __webpack_require__("c04e");
          var nativeDefineProperty = Object.defineProperty;
          exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
            anObject(O);
            P = toPrimitive(P, true);
            anObject(Attributes);
            if (IE8_DOM_DEFINE) try {
              return nativeDefineProperty(O, P, Attributes);
            } catch (error) {
            }
            if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported");
            if ("value" in Attributes) O[P] = Attributes.value;
            return O;
          };
        }
      ),
      /***/
      "9ed3": (
        /***/
        function(module2, exports, __webpack_require__) {
          var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
          var create = __webpack_require__("7c73");
          var createPropertyDescriptor = __webpack_require__("5c6c");
          var setToStringTag = __webpack_require__("d44e");
          var Iterators = __webpack_require__("3f8c");
          var returnThis = function() {
            return this;
          };
          module2.exports = function(IteratorConstructor, NAME, next) {
            var TO_STRING_TAG = NAME + " Iterator";
            IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
            setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
            Iterators[TO_STRING_TAG] = returnThis;
            return IteratorConstructor;
          };
        }
      ),
      /***/
      "9f7f": (
        /***/
        function(module2, exports, __webpack_require__) {
          var fails = __webpack_require__("d039");
          function RE(s, f) {
            return RegExp(s, f);
          }
          exports.UNSUPPORTED_Y = fails(function() {
            var re = RE("a", "y");
            re.lastIndex = 2;
            return re.exec("abcd") != null;
          });
          exports.BROKEN_CARET = fails(function() {
            var re = RE("^r", "gy");
            re.lastIndex = 2;
            return re.exec("str") != null;
          });
        }
      ),
      /***/
      "a180": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__.d(__webpack_exports__, "b", function() {
            return scan;
          });
          __webpack_require__.d(__webpack_exports__, "a", function() {
            return keepScanning;
          });
          __webpack_require__("96cf");
          var _home_travis_build_gruhn_vue_qrcode_reader_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1da1");
          var callforth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("c036");
          var scan = /* @__PURE__ */ function() {
            var _ref = Object(_home_travis_build_gruhn_vue_qrcode_reader_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__[
              /* default */
              "a"
            ])(/* @__PURE__ */ regeneratorRuntime.mark(function _callee(spawnWorker, imageData) {
              var worker, event;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      worker = spawnWorker();
                      worker.postMessage(imageData, [imageData.data.buffer]);
                      _context.next = 4;
                      return Object(callforth__WEBPACK_IMPORTED_MODULE_2__[
                        /* eventOn */
                        "a"
                      ])(worker, "message");
                    case 4:
                      event = _context.sent;
                      worker.terminate();
                      return _context.abrupt("return", event.data);
                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));
            return function scan2(_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }();
          var keepScanning = function keepScanning2(spawnWorker, camera, options) {
            var detectHandler = options.detectHandler, locateHandler = options.locateHandler, minDelay = options.minDelay;
            var contentBefore = null;
            var locationBefore = null;
            var lastScanned = performance.now();
            var worker = spawnWorker();
            var workerBusy = false;
            var shouldContinue = true;
            worker.onmessage = function(event) {
              workerBusy = false;
              var _event$data = event.data, content = _event$data.content, location2 = _event$data.location;
              if (content !== null && content !== contentBefore) {
                detectHandler(event.data);
              }
              if (location2 !== locationBefore) {
                locateHandler(location2);
              }
              contentBefore = content || contentBefore;
              locationBefore = location2;
            };
            var processFrame = function processFrame2(timeNow) {
              if (shouldContinue) {
                window.requestAnimationFrame(processFrame2);
                if (timeNow - lastScanned >= minDelay) {
                  lastScanned = timeNow;
                  if (workerBusy === false) {
                    workerBusy = true;
                    var imageData = camera.captureFrame();
                    worker.postMessage(imageData, [imageData.data.buffer]);
                  }
                }
              } else {
                worker.terminate();
              }
            };
            processFrame();
            return function() {
              shouldContinue = false;
            };
          };
        }
      ),
      /***/
      "a434": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var toAbsoluteIndex = __webpack_require__("23cb");
          var toInteger = __webpack_require__("a691");
          var toLength = __webpack_require__("50c4");
          var toObject = __webpack_require__("7b0b");
          var arraySpeciesCreate = __webpack_require__("65f0");
          var createProperty = __webpack_require__("8418");
          var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("splice");
          var USES_TO_LENGTH = arrayMethodUsesToLength("splice", { ACCESSORS: true, 0: 0, 1: 2 });
          var max = Math.max;
          var min = Math.min;
          var MAX_SAFE_INTEGER = 9007199254740991;
          var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = "Maximum allowed length exceeded";
          $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
            splice: function splice(start, deleteCount) {
              var O = toObject(this);
              var len = toLength(O.length);
              var actualStart = toAbsoluteIndex(start, len);
              var argumentsLength = arguments.length;
              var insertCount, actualDeleteCount, A, k, from, to;
              if (argumentsLength === 0) {
                insertCount = actualDeleteCount = 0;
              } else if (argumentsLength === 1) {
                insertCount = 0;
                actualDeleteCount = len - actualStart;
              } else {
                insertCount = argumentsLength - 2;
                actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
              }
              if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
                throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
              }
              A = arraySpeciesCreate(O, actualDeleteCount);
              for (k = 0; k < actualDeleteCount; k++) {
                from = actualStart + k;
                if (from in O) createProperty(A, k, O[from]);
              }
              A.length = actualDeleteCount;
              if (insertCount < actualDeleteCount) {
                for (k = actualStart; k < len - actualDeleteCount; k++) {
                  from = k + actualDeleteCount;
                  to = k + insertCount;
                  if (from in O) O[to] = O[from];
                  else delete O[to];
                }
                for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
              } else if (insertCount > actualDeleteCount) {
                for (k = len - actualDeleteCount; k > actualStart; k--) {
                  from = k + actualDeleteCount - 1;
                  to = k + insertCount - 1;
                  if (from in O) O[to] = O[from];
                  else delete O[to];
                }
              }
              for (k = 0; k < insertCount; k++) {
                O[k + actualStart] = arguments[k + 2];
              }
              O.length = len - actualDeleteCount + insertCount;
              return A;
            }
          });
        }
      ),
      /***/
      "a4d3": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var global = __webpack_require__("da84");
          var getBuiltIn = __webpack_require__("d066");
          var IS_PURE = __webpack_require__("c430");
          var DESCRIPTORS = __webpack_require__("83ab");
          var NATIVE_SYMBOL = __webpack_require__("4930");
          var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
          var fails = __webpack_require__("d039");
          var has = __webpack_require__("5135");
          var isArray = __webpack_require__("e8b5");
          var isObject = __webpack_require__("861d");
          var anObject = __webpack_require__("825a");
          var toObject = __webpack_require__("7b0b");
          var toIndexedObject = __webpack_require__("fc6a");
          var toPrimitive = __webpack_require__("c04e");
          var createPropertyDescriptor = __webpack_require__("5c6c");
          var nativeObjectCreate = __webpack_require__("7c73");
          var objectKeys = __webpack_require__("df75");
          var getOwnPropertyNamesModule = __webpack_require__("241c");
          var getOwnPropertyNamesExternal = __webpack_require__("057f");
          var getOwnPropertySymbolsModule = __webpack_require__("7418");
          var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
          var definePropertyModule = __webpack_require__("9bf2");
          var propertyIsEnumerableModule = __webpack_require__("d1e7");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var redefine = __webpack_require__("6eeb");
          var shared = __webpack_require__("5692");
          var sharedKey = __webpack_require__("f772");
          var hiddenKeys = __webpack_require__("d012");
          var uid = __webpack_require__("90e3");
          var wellKnownSymbol = __webpack_require__("b622");
          var wrappedWellKnownSymbolModule = __webpack_require__("e538");
          var defineWellKnownSymbol = __webpack_require__("746f");
          var setToStringTag = __webpack_require__("d44e");
          var InternalStateModule = __webpack_require__("69f3");
          var $forEach = __webpack_require__("b727").forEach;
          var HIDDEN = sharedKey("hidden");
          var SYMBOL = "Symbol";
          var PROTOTYPE = "prototype";
          var TO_PRIMITIVE = wellKnownSymbol("toPrimitive");
          var setInternalState = InternalStateModule.set;
          var getInternalState = InternalStateModule.getterFor(SYMBOL);
          var ObjectPrototype = Object[PROTOTYPE];
          var $Symbol = global.Symbol;
          var $stringify = getBuiltIn("JSON", "stringify");
          var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
          var nativeDefineProperty = definePropertyModule.f;
          var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
          var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
          var AllSymbols = shared("symbols");
          var ObjectPrototypeSymbols = shared("op-symbols");
          var StringToSymbolRegistry = shared("string-to-symbol-registry");
          var SymbolToStringRegistry = shared("symbol-to-string-registry");
          var WellKnownSymbolsStore = shared("wks");
          var QObject = global.QObject;
          var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
          var setSymbolDescriptor = DESCRIPTORS && fails(function() {
            return nativeObjectCreate(nativeDefineProperty({}, "a", {
              get: function() {
                return nativeDefineProperty(this, "a", { value: 7 }).a;
              }
            })).a != 7;
          }) ? function(O, P, Attributes) {
            var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
            if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
            nativeDefineProperty(O, P, Attributes);
            if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
              nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
            }
          } : nativeDefineProperty;
          var wrap = function(tag, description) {
            var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
            setInternalState(symbol, {
              type: SYMBOL,
              tag,
              description
            });
            if (!DESCRIPTORS) symbol.description = description;
            return symbol;
          };
          var isSymbol = USE_SYMBOL_AS_UID ? function(it) {
            return typeof it == "symbol";
          } : function(it) {
            return Object(it) instanceof $Symbol;
          };
          var $defineProperty = function defineProperty(O, P, Attributes) {
            if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
            anObject(O);
            var key = toPrimitive(P, true);
            anObject(Attributes);
            if (has(AllSymbols, key)) {
              if (!Attributes.enumerable) {
                if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
                O[HIDDEN][key] = true;
              } else {
                if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
                Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
              }
              return setSymbolDescriptor(O, key, Attributes);
            }
            return nativeDefineProperty(O, key, Attributes);
          };
          var $defineProperties = function defineProperties(O, Properties) {
            anObject(O);
            var properties = toIndexedObject(Properties);
            var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
            $forEach(keys, function(key) {
              if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
            });
            return O;
          };
          var $create = function create(O, Properties) {
            return Properties === void 0 ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
          };
          var $propertyIsEnumerable = function propertyIsEnumerable(V) {
            var P = toPrimitive(V, true);
            var enumerable = nativePropertyIsEnumerable.call(this, P);
            if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
            return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
          };
          var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
            var it = toIndexedObject(O);
            var key = toPrimitive(P, true);
            if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
            var descriptor = nativeGetOwnPropertyDescriptor(it, key);
            if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
              descriptor.enumerable = true;
            }
            return descriptor;
          };
          var $getOwnPropertyNames = function getOwnPropertyNames(O) {
            var names = nativeGetOwnPropertyNames(toIndexedObject(O));
            var result = [];
            $forEach(names, function(key) {
              if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
            });
            return result;
          };
          var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
            var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
            var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
            var result = [];
            $forEach(names, function(key) {
              if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
                result.push(AllSymbols[key]);
              }
            });
            return result;
          };
          if (!NATIVE_SYMBOL) {
            $Symbol = function Symbol2() {
              if (this instanceof $Symbol) throw TypeError("Symbol is not a constructor");
              var description = !arguments.length || arguments[0] === void 0 ? void 0 : String(arguments[0]);
              var tag = uid(description);
              var setter = function(value) {
                if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
                if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
                setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
              };
              if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
              return wrap(tag, description);
            };
            redefine($Symbol[PROTOTYPE], "toString", function toString() {
              return getInternalState(this).tag;
            });
            redefine($Symbol, "withoutSetter", function(description) {
              return wrap(uid(description), description);
            });
            propertyIsEnumerableModule.f = $propertyIsEnumerable;
            definePropertyModule.f = $defineProperty;
            getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
            getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
            getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
            wrappedWellKnownSymbolModule.f = function(name) {
              return wrap(wellKnownSymbol(name), name);
            };
            if (DESCRIPTORS) {
              nativeDefineProperty($Symbol[PROTOTYPE], "description", {
                configurable: true,
                get: function description() {
                  return getInternalState(this).description;
                }
              });
              if (!IS_PURE) {
                redefine(ObjectPrototype, "propertyIsEnumerable", $propertyIsEnumerable, { unsafe: true });
              }
            }
          }
          $({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
            Symbol: $Symbol
          });
          $forEach(objectKeys(WellKnownSymbolsStore), function(name) {
            defineWellKnownSymbol(name);
          });
          $({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
            // `Symbol.for` method
            // https://tc39.github.io/ecma262/#sec-symbol.for
            "for": function(key) {
              var string = String(key);
              if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
              var symbol = $Symbol(string);
              StringToSymbolRegistry[string] = symbol;
              SymbolToStringRegistry[symbol] = string;
              return symbol;
            },
            // `Symbol.keyFor` method
            // https://tc39.github.io/ecma262/#sec-symbol.keyfor
            keyFor: function keyFor(sym) {
              if (!isSymbol(sym)) throw TypeError(sym + " is not a symbol");
              if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
            },
            useSetter: function() {
              USE_SETTER = true;
            },
            useSimple: function() {
              USE_SETTER = false;
            }
          });
          $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
            // `Object.create` method
            // https://tc39.github.io/ecma262/#sec-object.create
            create: $create,
            // `Object.defineProperty` method
            // https://tc39.github.io/ecma262/#sec-object.defineproperty
            defineProperty: $defineProperty,
            // `Object.defineProperties` method
            // https://tc39.github.io/ecma262/#sec-object.defineproperties
            defineProperties: $defineProperties,
            // `Object.getOwnPropertyDescriptor` method
            // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
            getOwnPropertyDescriptor: $getOwnPropertyDescriptor
          });
          $({ target: "Object", stat: true, forced: !NATIVE_SYMBOL }, {
            // `Object.getOwnPropertyNames` method
            // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
            getOwnPropertyNames: $getOwnPropertyNames,
            // `Object.getOwnPropertySymbols` method
            // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
            getOwnPropertySymbols: $getOwnPropertySymbols
          });
          $({ target: "Object", stat: true, forced: fails(function() {
            getOwnPropertySymbolsModule.f(1);
          }) }, {
            getOwnPropertySymbols: function getOwnPropertySymbols(it) {
              return getOwnPropertySymbolsModule.f(toObject(it));
            }
          });
          if ($stringify) {
            var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function() {
              var symbol = $Symbol();
              return $stringify([symbol]) != "[null]" || $stringify({ a: symbol }) != "{}" || $stringify(Object(symbol)) != "{}";
            });
            $({ target: "JSON", stat: true, forced: FORCED_JSON_STRINGIFY }, {
              // eslint-disable-next-line no-unused-vars
              stringify: function stringify(it, replacer, space) {
                var args = [it];
                var index = 1;
                var $replacer;
                while (arguments.length > index) args.push(arguments[index++]);
                $replacer = replacer;
                if (!isObject(replacer) && it === void 0 || isSymbol(it)) return;
                if (!isArray(replacer)) replacer = function(key, value) {
                  if (typeof $replacer == "function") value = $replacer.call(this, key, value);
                  if (!isSymbol(value)) return value;
                };
                args[1] = replacer;
                return $stringify.apply(null, args);
              }
            });
          }
          if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
            createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
          }
          setToStringTag($Symbol, SYMBOL);
          hiddenKeys[HIDDEN] = true;
        }
      ),
      /***/
      "a630": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var from = __webpack_require__("4df4");
          var checkCorrectnessOfIteration = __webpack_require__("1c7e");
          var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function(iterable) {
            Array.from(iterable);
          });
          $({ target: "Array", stat: true, forced: INCORRECT_ITERATION }, {
            from
          });
        }
      ),
      /***/
      "a640": (
        /***/
        function(module2, exports, __webpack_require__) {
          var fails = __webpack_require__("d039");
          module2.exports = function(METHOD_NAME, argument) {
            var method = [][METHOD_NAME];
            return !!method && fails(function() {
              method.call(null, argument || function() {
                throw 1;
              }, 1);
            });
          };
        }
      ),
      /***/
      "a691": (
        /***/
        function(module2, exports) {
          var ceil = Math.ceil;
          var floor = Math.floor;
          module2.exports = function(argument) {
            return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
          };
        }
      ),
      /***/
      "ab13": (
        /***/
        function(module2, exports, __webpack_require__) {
          var wellKnownSymbol = __webpack_require__("b622");
          var MATCH = wellKnownSymbol("match");
          module2.exports = function(METHOD_NAME) {
            var regexp = /./;
            try {
              "/./"[METHOD_NAME](regexp);
            } catch (e) {
              try {
                regexp[MATCH] = false;
                return "/./"[METHOD_NAME](regexp);
              } catch (f) {
              }
            }
            return false;
          };
        }
      ),
      /***/
      "ac1f": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var exec = __webpack_require__("9263");
          $({ target: "RegExp", proto: true, forced: /./.exec !== exec }, {
            exec
          });
        }
      ),
      /***/
      "ad6d": (
        /***/
        function(module2, exports, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          module2.exports = function() {
            var that = anObject(this);
            var result = "";
            if (that.global) result += "g";
            if (that.ignoreCase) result += "i";
            if (that.multiline) result += "m";
            if (that.dotAll) result += "s";
            if (that.unicode) result += "u";
            if (that.sticky) result += "y";
            return result;
          };
        }
      ),
      /***/
      "ae40": (
        /***/
        function(module2, exports, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var fails = __webpack_require__("d039");
          var has = __webpack_require__("5135");
          var defineProperty = Object.defineProperty;
          var cache = {};
          var thrower = function(it) {
            throw it;
          };
          module2.exports = function(METHOD_NAME, options) {
            if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
            if (!options) options = {};
            var method = [][METHOD_NAME];
            var ACCESSORS = has(options, "ACCESSORS") ? options.ACCESSORS : false;
            var argument0 = has(options, 0) ? options[0] : thrower;
            var argument1 = has(options, 1) ? options[1] : void 0;
            return cache[METHOD_NAME] = !!method && !fails(function() {
              if (ACCESSORS && !DESCRIPTORS) return true;
              var O = { length: -1 };
              if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
              else O[1] = 1;
              method.call(O, argument0, argument1);
            });
          };
        }
      ),
      /***/
      "ae93": (
        /***/
        function(module2, exports, __webpack_require__) {
          var getPrototypeOf = __webpack_require__("e163");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var has = __webpack_require__("5135");
          var wellKnownSymbol = __webpack_require__("b622");
          var IS_PURE = __webpack_require__("c430");
          var ITERATOR = wellKnownSymbol("iterator");
          var BUGGY_SAFARI_ITERATORS = false;
          var returnThis = function() {
            return this;
          };
          var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
          if ([].keys) {
            arrayIterator = [].keys();
            if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
            else {
              PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
              if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
            }
          }
          if (IteratorPrototype == void 0) IteratorPrototype = {};
          if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
            createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
          }
          module2.exports = {
            IteratorPrototype,
            BUGGY_SAFARI_ITERATORS
          };
        }
      ),
      /***/
      "b041": (
        /***/
        function(module2, exports, __webpack_require__) {
          var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
          var classof = __webpack_require__("f5df");
          module2.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
            return "[object " + classof(this) + "]";
          };
        }
      ),
      /***/
      "b0c0": (
        /***/
        function(module2, exports, __webpack_require__) {
          var DESCRIPTORS = __webpack_require__("83ab");
          var defineProperty = __webpack_require__("9bf2").f;
          var FunctionPrototype = Function.prototype;
          var FunctionPrototypeToString = FunctionPrototype.toString;
          var nameRE = /^\s*function ([^ (]*)/;
          var NAME = "name";
          if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
            defineProperty(FunctionPrototype, NAME, {
              configurable: true,
              get: function() {
                try {
                  return FunctionPrototypeToString.call(this).match(nameRE)[1];
                } catch (error) {
                  return "";
                }
              }
            });
          }
        }
      ),
      /***/
      "b3af": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__("96cf");
          var asyncToGenerator = __webpack_require__("1da1");
          var CommonAPIvue_type_script_lang_js_ = {
            methods: {
              onDetect: function onDetect(resultPromise) {
                var _this = this;
                return Object(asyncToGenerator[
                  "a"
                  /* default */
                ])(/* @__PURE__ */ regeneratorRuntime.mark(function _callee() {
                  var _yield$resultPromise, content;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _this.$emit("detect", resultPromise);
                          _context.prev = 1;
                          _context.next = 4;
                          return resultPromise;
                        case 4:
                          _yield$resultPromise = _context.sent;
                          content = _yield$resultPromise.content;
                          if (content !== null) {
                            _this.$emit("decode", content);
                          }
                          _context.next = 11;
                          break;
                        case 9:
                          _context.prev = 9;
                          _context.t0 = _context["catch"](1);
                        case 11:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[1, 9]]);
                }))();
              }
            }
          };
          var mixins_CommonAPIvue_type_script_lang_js_ = CommonAPIvue_type_script_lang_js_;
          var componentNormalizer = __webpack_require__("2877");
          var render2, staticRenderFns;
          var component = Object(componentNormalizer[
            "a"
            /* default */
          ])(
            mixins_CommonAPIvue_type_script_lang_js_,
            render2,
            staticRenderFns,
            false,
            null,
            null,
            null
          );
          __webpack_exports__["a"] = component.exports;
        }
      ),
      /***/
      "b575": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
          var classof = __webpack_require__("c6b6");
          var macrotask = __webpack_require__("2cf4").set;
          var IS_IOS = __webpack_require__("1cdc");
          var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
          var process = global.process;
          var Promise2 = global.Promise;
          var IS_NODE = classof(process) == "process";
          var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, "queueMicrotask");
          var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
          var flush, head, last, notify, toggle, node, promise, then;
          if (!queueMicrotask) {
            flush = function() {
              var parent, fn;
              if (IS_NODE && (parent = process.domain)) parent.exit();
              while (head) {
                fn = head.fn;
                head = head.next;
                try {
                  fn();
                } catch (error) {
                  if (head) notify();
                  else last = void 0;
                  throw error;
                }
              }
              last = void 0;
              if (parent) parent.enter();
            };
            if (IS_NODE) {
              notify = function() {
                process.nextTick(flush);
              };
            } else if (MutationObserver && !IS_IOS) {
              toggle = true;
              node = document.createTextNode("");
              new MutationObserver(flush).observe(node, { characterData: true });
              notify = function() {
                node.data = toggle = !toggle;
              };
            } else if (Promise2 && Promise2.resolve) {
              promise = Promise2.resolve(void 0);
              then = promise.then;
              notify = function() {
                then.call(promise, flush);
              };
            } else {
              notify = function() {
                macrotask.call(global, flush);
              };
            }
          }
          module2.exports = queueMicrotask || function(fn) {
            var task = { fn, next: void 0 };
            if (last) last.next = task;
            if (!head) {
              head = task;
              notify();
            }
            last = task;
          };
        }
      ),
      /***/
      "b622": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          var shared = __webpack_require__("5692");
          var has = __webpack_require__("5135");
          var uid = __webpack_require__("90e3");
          var NATIVE_SYMBOL = __webpack_require__("4930");
          var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
          var WellKnownSymbolsStore = shared("wks");
          var Symbol2 = global.Symbol;
          var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol2 : Symbol2 && Symbol2.withoutSetter || uid;
          module2.exports = function(name) {
            if (!has(WellKnownSymbolsStore, name)) {
              if (NATIVE_SYMBOL && has(Symbol2, name)) WellKnownSymbolsStore[name] = Symbol2[name];
              else WellKnownSymbolsStore[name] = createWellKnownSymbol("Symbol." + name);
            }
            return WellKnownSymbolsStore[name];
          };
        }
      ),
      /***/
      "b635": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          (function(global) {
            __webpack_require__.d(__webpack_exports__, "e", function() {
              return install;
            });
            var _components_QrcodeStream_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0d0e");
            __webpack_require__.d(__webpack_exports__, "c", function() {
              return _components_QrcodeStream_vue__WEBPACK_IMPORTED_MODULE_0__["a"];
            });
            var _components_QrcodeCapture_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("5c0b");
            __webpack_require__.d(__webpack_exports__, "a", function() {
              return _components_QrcodeCapture_vue__WEBPACK_IMPORTED_MODULE_1__["a"];
            });
            var _components_QrcodeDropZone_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("fe6b");
            __webpack_require__.d(__webpack_exports__, "b", function() {
              return _components_QrcodeDropZone_vue__WEBPACK_IMPORTED_MODULE_2__["a"];
            });
            function install(Vue2) {
              Vue2.component("qrcode-stream", _components_QrcodeStream_vue__WEBPACK_IMPORTED_MODULE_0__[
                /* default */
                "a"
              ]);
              Vue2.component("qrcode-capture", _components_QrcodeCapture_vue__WEBPACK_IMPORTED_MODULE_1__[
                /* default */
                "a"
              ]);
              Vue2.component("qrcode-drop-zone", _components_QrcodeDropZone_vue__WEBPACK_IMPORTED_MODULE_2__[
                /* default */
                "a"
              ]);
            }
            var plugin = {
              install
            };
            __webpack_exports__["d"] = plugin;
            var GlobalVue = null;
            if (typeof window !== "undefined") {
              GlobalVue = window.Vue;
            } else if (typeof global !== "undefined") {
              GlobalVue = global.Vue;
            }
            if (GlobalVue) {
              GlobalVue.use(plugin);
            }
          }).call(this, __webpack_require__("c8ba"));
        }
      ),
      /***/
      "b64b": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var toObject = __webpack_require__("7b0b");
          var nativeKeys = __webpack_require__("df75");
          var fails = __webpack_require__("d039");
          var FAILS_ON_PRIMITIVES = fails(function() {
            nativeKeys(1);
          });
          $({ target: "Object", stat: true, forced: FAILS_ON_PRIMITIVES }, {
            keys: function keys(it) {
              return nativeKeys(toObject(it));
            }
          });
        }
      ),
      /***/
      "b727": (
        /***/
        function(module2, exports, __webpack_require__) {
          var bind = __webpack_require__("0366");
          var IndexedObject = __webpack_require__("44ad");
          var toObject = __webpack_require__("7b0b");
          var toLength = __webpack_require__("50c4");
          var arraySpeciesCreate = __webpack_require__("65f0");
          var push = [].push;
          var createMethod = function(TYPE) {
            var IS_MAP = TYPE == 1;
            var IS_FILTER = TYPE == 2;
            var IS_SOME = TYPE == 3;
            var IS_EVERY = TYPE == 4;
            var IS_FIND_INDEX = TYPE == 6;
            var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
            return function($this, callbackfn, that, specificCreate) {
              var O = toObject($this);
              var self2 = IndexedObject(O);
              var boundFunction = bind(callbackfn, that, 3);
              var length = toLength(self2.length);
              var index = 0;
              var create = specificCreate || arraySpeciesCreate;
              var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : void 0;
              var value, result;
              for (; length > index; index++) if (NO_HOLES || index in self2) {
                value = self2[index];
                result = boundFunction(value, index, O);
                if (TYPE) {
                  if (IS_MAP) target[index] = result;
                  else if (result) switch (TYPE) {
                    case 3:
                      return true;
                    // some
                    case 5:
                      return value;
                    // find
                    case 6:
                      return index;
                    // findIndex
                    case 2:
                      push.call(target, value);
                  }
                  else if (IS_EVERY) return false;
                }
              }
              return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
            };
          };
          module2.exports = {
            // `Array.prototype.forEach` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
            forEach: createMethod(0),
            // `Array.prototype.map` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.map
            map: createMethod(1),
            // `Array.prototype.filter` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.filter
            filter: createMethod(2),
            // `Array.prototype.some` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.some
            some: createMethod(3),
            // `Array.prototype.every` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.every
            every: createMethod(4),
            // `Array.prototype.find` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.find
            find: createMethod(5),
            // `Array.prototype.findIndex` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
            findIndex: createMethod(6)
          };
        }
      ),
      /***/
      "bb2f": (
        /***/
        function(module2, exports, __webpack_require__) {
          var fails = __webpack_require__("d039");
          module2.exports = !fails(function() {
            return Object.isExtensible(Object.preventExtensions({}));
          });
        }
      ),
      /***/
      "c036": (
        /***/
        function(__webpack_module__, __webpack_exports__, __webpack_require__) {
          __webpack_require__.d(__webpack_exports__, "a", function() {
            return e;
          });
          __webpack_require__.d(__webpack_exports__, "b", function() {
            return n;
          });
          function e(e2, n2, r) {
            var t, i;
            void 0 === r && (r = "error");
            var o = new Promise(function(e3, n3) {
              t = e3, i = n3;
            });
            return e2.addEventListener(n2, t), e2.addEventListener(r, i), o.finally(function() {
              e2.removeEventListener(n2, t), e2.removeEventListener(r, i);
            }), o;
          }
          function n(e2) {
            return new Promise(function(n2) {
              return setTimeout(n2, e2);
            });
          }
        }
      ),
      /***/
      "c04e": (
        /***/
        function(module2, exports, __webpack_require__) {
          var isObject = __webpack_require__("861d");
          module2.exports = function(input, PREFERRED_STRING) {
            if (!isObject(input)) return input;
            var fn, val;
            if (PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject(val = fn.call(input))) return val;
            if (typeof (fn = input.valueOf) == "function" && !isObject(val = fn.call(input))) return val;
            if (!PREFERRED_STRING && typeof (fn = input.toString) == "function" && !isObject(val = fn.call(input))) return val;
            throw TypeError("Can't convert object to primitive value");
          };
        }
      ),
      /***/
      "c244": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrcodeStream_vue_vue_type_style_index_0_id_7a81005d_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2493");
          var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrcodeStream_vue_vue_type_style_index_0_id_7a81005d_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrcodeStream_vue_vue_type_style_index_0_id_7a81005d_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
          _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_QrcodeStream_vue_vue_type_style_index_0_id_7a81005d_lang_css_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a;
        }
      ),
      /***/
      "c430": (
        /***/
        function(module2, exports) {
          module2.exports = false;
        }
      ),
      /***/
      "c6b6": (
        /***/
        function(module2, exports) {
          var toString = {}.toString;
          module2.exports = function(it) {
            return toString.call(it).slice(8, -1);
          };
        }
      ),
      /***/
      "c6cd": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          var setGlobal = __webpack_require__("ce4e");
          var SHARED = "__core-js_shared__";
          var store = global[SHARED] || setGlobal(SHARED, {});
          module2.exports = store;
        }
      ),
      /***/
      "c8ba": (
        /***/
        function(module2, exports) {
          var g;
          g = /* @__PURE__ */ function() {
            return this;
          }();
          try {
            g = g || new Function("return this")();
          } catch (e) {
            if (typeof window === "object") g = window;
          }
          module2.exports = g;
        }
      ),
      /***/
      "c8d2": (
        /***/
        function(module2, exports, __webpack_require__) {
          var fails = __webpack_require__("d039");
          var whitespaces = __webpack_require__("5899");
          var non = "​᠎";
          module2.exports = function(METHOD_NAME) {
            return fails(function() {
              return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
            });
          };
        }
      ),
      /***/
      "c975": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var $indexOf = __webpack_require__("4d64").indexOf;
          var arrayMethodIsStrict = __webpack_require__("a640");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var nativeIndexOf = [].indexOf;
          var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
          var STRICT_METHOD = arrayMethodIsStrict("indexOf");
          var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
          $({ target: "Array", proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD || !USES_TO_LENGTH }, {
            indexOf: function indexOf(searchElement) {
              return NEGATIVE_ZERO ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
        }
      ),
      /***/
      "ca84": (
        /***/
        function(module2, exports, __webpack_require__) {
          var has = __webpack_require__("5135");
          var toIndexedObject = __webpack_require__("fc6a");
          var indexOf = __webpack_require__("4d64").indexOf;
          var hiddenKeys = __webpack_require__("d012");
          module2.exports = function(object, names) {
            var O = toIndexedObject(object);
            var i = 0;
            var result = [];
            var key;
            for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
            while (names.length > i) if (has(O, key = names[i++])) {
              ~indexOf(result, key) || result.push(key);
            }
            return result;
          };
        }
      ),
      /***/
      "caad": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var $includes = __webpack_require__("4d64").includes;
          var addToUnscopables = __webpack_require__("44d2");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var USES_TO_LENGTH = arrayMethodUsesToLength("indexOf", { ACCESSORS: true, 1: 0 });
          $({ target: "Array", proto: true, forced: !USES_TO_LENGTH }, {
            includes: function includes(el) {
              return $includes(this, el, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
          addToUnscopables("includes");
        }
      ),
      /***/
      "cc12": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          var isObject = __webpack_require__("861d");
          var document2 = global.document;
          var EXISTS = isObject(document2) && isObject(document2.createElement);
          module2.exports = function(it) {
            return EXISTS ? document2.createElement(it) : {};
          };
        }
      ),
      /***/
      "cca6": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var assign = __webpack_require__("60da");
          $({ target: "Object", stat: true, forced: Object.assign !== assign }, {
            assign
          });
        }
      ),
      /***/
      "cdf9": (
        /***/
        function(module2, exports, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          var isObject = __webpack_require__("861d");
          var newPromiseCapability = __webpack_require__("f069");
          module2.exports = function(C, x) {
            anObject(C);
            if (isObject(x) && x.constructor === C) return x;
            var promiseCapability = newPromiseCapability.f(C);
            var resolve = promiseCapability.resolve;
            resolve(x);
            return promiseCapability.promise;
          };
        }
      ),
      /***/
      "ce4e": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          var createNonEnumerableProperty = __webpack_require__("9112");
          module2.exports = function(key, value) {
            try {
              createNonEnumerableProperty(global, key, value);
            } catch (error) {
              global[key] = value;
            }
            return value;
          };
        }
      ),
      /***/
      "d012": (
        /***/
        function(module2, exports) {
          module2.exports = {};
        }
      ),
      /***/
      "d039": (
        /***/
        function(module2, exports) {
          module2.exports = function(exec) {
            try {
              return !!exec();
            } catch (error) {
              return true;
            }
          };
        }
      ),
      /***/
      "d066": (
        /***/
        function(module2, exports, __webpack_require__) {
          var path = __webpack_require__("428f");
          var global = __webpack_require__("da84");
          var aFunction = function(variable) {
            return typeof variable == "function" ? variable : void 0;
          };
          module2.exports = function(namespace, method) {
            return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
          };
        }
      ),
      /***/
      "d1e7": (
        /***/
        function(module2, exports, __webpack_require__) {
          var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
          var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
          var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
          exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
            var descriptor = getOwnPropertyDescriptor(this, V);
            return !!descriptor && descriptor.enumerable;
          } : nativePropertyIsEnumerable;
        }
      ),
      /***/
      "d28b": (
        /***/
        function(module2, exports, __webpack_require__) {
          var defineWellKnownSymbol = __webpack_require__("746f");
          defineWellKnownSymbol("iterator");
        }
      ),
      /***/
      "d2bb": (
        /***/
        function(module2, exports, __webpack_require__) {
          var anObject = __webpack_require__("825a");
          var aPossiblePrototype = __webpack_require__("3bbe");
          module2.exports = Object.setPrototypeOf || ("__proto__" in {} ? function() {
            var CORRECT_SETTER = false;
            var test = {};
            var setter;
            try {
              setter = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set;
              setter.call(test, []);
              CORRECT_SETTER = test instanceof Array;
            } catch (error) {
            }
            return function setPrototypeOf(O, proto) {
              anObject(O);
              aPossiblePrototype(proto);
              if (CORRECT_SETTER) setter.call(O, proto);
              else O.__proto__ = proto;
              return O;
            };
          }() : void 0);
        }
      ),
      /***/
      "d3b7": (
        /***/
        function(module2, exports, __webpack_require__) {
          var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
          var redefine = __webpack_require__("6eeb");
          var toString = __webpack_require__("b041");
          if (!TO_STRING_TAG_SUPPORT) {
            redefine(Object.prototype, "toString", toString, { unsafe: true });
          }
        }
      ),
      /***/
      "d44e": (
        /***/
        function(module2, exports, __webpack_require__) {
          var defineProperty = __webpack_require__("9bf2").f;
          var has = __webpack_require__("5135");
          var wellKnownSymbol = __webpack_require__("b622");
          var TO_STRING_TAG = wellKnownSymbol("toStringTag");
          module2.exports = function(it, TAG, STATIC) {
            if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
              defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
            }
          };
        }
      ),
      /***/
      "d4ec": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__.d(__webpack_exports__, "a", function() {
            return _classCallCheck;
          });
          function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }
        }
      ),
      /***/
      "d58f": (
        /***/
        function(module2, exports, __webpack_require__) {
          var aFunction = __webpack_require__("1c0b");
          var toObject = __webpack_require__("7b0b");
          var IndexedObject = __webpack_require__("44ad");
          var toLength = __webpack_require__("50c4");
          var createMethod = function(IS_RIGHT) {
            return function(that, callbackfn, argumentsLength, memo) {
              aFunction(callbackfn);
              var O = toObject(that);
              var self2 = IndexedObject(O);
              var length = toLength(O.length);
              var index = IS_RIGHT ? length - 1 : 0;
              var i = IS_RIGHT ? -1 : 1;
              if (argumentsLength < 2) while (true) {
                if (index in self2) {
                  memo = self2[index];
                  index += i;
                  break;
                }
                index += i;
                if (IS_RIGHT ? index < 0 : length <= index) {
                  throw TypeError("Reduce of empty array with no initial value");
                }
              }
              for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self2) {
                memo = callbackfn(memo, self2[index], index, O);
              }
              return memo;
            };
          };
          module2.exports = {
            // `Array.prototype.reduce` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
            left: createMethod(false),
            // `Array.prototype.reduceRight` method
            // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
            right: createMethod(true)
          };
        }
      ),
      /***/
      "d784": (
        /***/
        function(module2, exports, __webpack_require__) {
          __webpack_require__("ac1f");
          var redefine = __webpack_require__("6eeb");
          var fails = __webpack_require__("d039");
          var wellKnownSymbol = __webpack_require__("b622");
          var regexpExec = __webpack_require__("9263");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var SPECIES = wellKnownSymbol("species");
          var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function() {
            var re = /./;
            re.exec = function() {
              var result = [];
              result.groups = { a: "7" };
              return result;
            };
            return "".replace(re, "$<a>") !== "7";
          });
          var REPLACE_KEEPS_$0 = function() {
            return "a".replace(/./, "$0") === "$0";
          }();
          var REPLACE = wellKnownSymbol("replace");
          var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = function() {
            if (/./[REPLACE]) {
              return /./[REPLACE]("a", "$0") === "";
            }
            return false;
          }();
          var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function() {
            var re = /(?:)/;
            var originalExec = re.exec;
            re.exec = function() {
              return originalExec.apply(this, arguments);
            };
            var result = "ab".split(re);
            return result.length !== 2 || result[0] !== "a" || result[1] !== "b";
          });
          module2.exports = function(KEY, length, exec, sham) {
            var SYMBOL = wellKnownSymbol(KEY);
            var DELEGATES_TO_SYMBOL = !fails(function() {
              var O = {};
              O[SYMBOL] = function() {
                return 7;
              };
              return ""[KEY](O) != 7;
            });
            var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function() {
              var execCalled = false;
              var re = /a/;
              if (KEY === "split") {
                re = {};
                re.constructor = {};
                re.constructor[SPECIES] = function() {
                  return re;
                };
                re.flags = "";
                re[SYMBOL] = /./[SYMBOL];
              }
              re.exec = function() {
                execCalled = true;
                return null;
              };
              re[SYMBOL]("");
              return !execCalled;
            });
            if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === "replace" && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0 && !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE) || KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
              var nativeRegExpMethod = /./[SYMBOL];
              var methods = exec(SYMBOL, ""[KEY], function(nativeMethod, regexp, str, arg2, forceStringMethod) {
                if (regexp.exec === regexpExec) {
                  if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                    return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
                  }
                  return { done: true, value: nativeMethod.call(str, regexp, arg2) };
                }
                return { done: false };
              }, {
                REPLACE_KEEPS_$0,
                REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
              });
              var stringMethod = methods[0];
              var regexMethod = methods[1];
              redefine(String.prototype, KEY, stringMethod);
              redefine(
                RegExp.prototype,
                SYMBOL,
                length == 2 ? function(string, arg) {
                  return regexMethod.call(string, this, arg);
                } : function(string) {
                  return regexMethod.call(string, this);
                }
              );
            }
            if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], "sham", true);
          };
        }
      ),
      /***/
      "d81d": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var $map = __webpack_require__("b727").map;
          var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("map");
          var USES_TO_LENGTH = arrayMethodUsesToLength("map");
          $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
            map: function map(callbackfn) {
              return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : void 0);
            }
          });
        }
      ),
      /***/
      "da84": (
        /***/
        function(module2, exports, __webpack_require__) {
          (function(global) {
            var check = function(it) {
              return it && it.Math == Math && it;
            };
            module2.exports = // eslint-disable-next-line no-undef
            check(typeof globalThis == "object" && globalThis) || check(typeof window == "object" && window) || check(typeof self == "object" && self) || check(typeof global == "object" && global) || // eslint-disable-next-line no-new-func
            Function("return this")();
          }).call(this, __webpack_require__("c8ba"));
        }
      ),
      /***/
      "dbb4": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var DESCRIPTORS = __webpack_require__("83ab");
          var ownKeys = __webpack_require__("56ef");
          var toIndexedObject = __webpack_require__("fc6a");
          var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
          var createProperty = __webpack_require__("8418");
          $({ target: "Object", stat: true, sham: !DESCRIPTORS }, {
            getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
              var O = toIndexedObject(object);
              var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
              var keys = ownKeys(O);
              var result = {};
              var index = 0;
              var key, descriptor;
              while (keys.length > index) {
                descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
                if (descriptor !== void 0) createProperty(result, key, descriptor);
              }
              return result;
            }
          });
        }
      ),
      /***/
      "ddb0": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          var DOMIterables = __webpack_require__("fdbc");
          var ArrayIteratorMethods = __webpack_require__("e260");
          var createNonEnumerableProperty = __webpack_require__("9112");
          var wellKnownSymbol = __webpack_require__("b622");
          var ITERATOR = wellKnownSymbol("iterator");
          var TO_STRING_TAG = wellKnownSymbol("toStringTag");
          var ArrayValues = ArrayIteratorMethods.values;
          for (var COLLECTION_NAME in DOMIterables) {
            var Collection = global[COLLECTION_NAME];
            var CollectionPrototype = Collection && Collection.prototype;
            if (CollectionPrototype) {
              if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
                createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
              } catch (error) {
                CollectionPrototype[ITERATOR] = ArrayValues;
              }
              if (!CollectionPrototype[TO_STRING_TAG]) {
                createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
              }
              if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
                if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
                  createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
                } catch (error) {
                  CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
                }
              }
            }
          }
        }
      ),
      /***/
      "df75": (
        /***/
        function(module2, exports, __webpack_require__) {
          var internalObjectKeys = __webpack_require__("ca84");
          var enumBugKeys = __webpack_require__("7839");
          module2.exports = Object.keys || function keys(O) {
            return internalObjectKeys(O, enumBugKeys);
          };
        }
      ),
      /***/
      "e01a": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var DESCRIPTORS = __webpack_require__("83ab");
          var global = __webpack_require__("da84");
          var has = __webpack_require__("5135");
          var isObject = __webpack_require__("861d");
          var defineProperty = __webpack_require__("9bf2").f;
          var copyConstructorProperties = __webpack_require__("e893");
          var NativeSymbol = global.Symbol;
          if (DESCRIPTORS && typeof NativeSymbol == "function" && (!("description" in NativeSymbol.prototype) || // Safari 12 bug
          NativeSymbol().description !== void 0)) {
            var EmptyStringDescriptionStore = {};
            var SymbolWrapper = function Symbol2() {
              var description = arguments.length < 1 || arguments[0] === void 0 ? void 0 : String(arguments[0]);
              var result = this instanceof SymbolWrapper ? new NativeSymbol(description) : description === void 0 ? NativeSymbol() : NativeSymbol(description);
              if (description === "") EmptyStringDescriptionStore[result] = true;
              return result;
            };
            copyConstructorProperties(SymbolWrapper, NativeSymbol);
            var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
            symbolPrototype.constructor = SymbolWrapper;
            var symbolToString = symbolPrototype.toString;
            var native = String(NativeSymbol("test")) == "Symbol(test)";
            var regexp = /^Symbol\((.*)\)[^)]+$/;
            defineProperty(symbolPrototype, "description", {
              configurable: true,
              get: function description() {
                var symbol = isObject(this) ? this.valueOf() : this;
                var string = symbolToString.call(symbol);
                if (has(EmptyStringDescriptionStore, symbol)) return "";
                var desc = native ? string.slice(7, -1) : string.replace(regexp, "$1");
                return desc === "" ? void 0 : desc;
              }
            });
            $({ global: true, forced: true }, {
              Symbol: SymbolWrapper
            });
          }
        }
      ),
      /***/
      "e163": (
        /***/
        function(module2, exports, __webpack_require__) {
          var has = __webpack_require__("5135");
          var toObject = __webpack_require__("7b0b");
          var sharedKey = __webpack_require__("f772");
          var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");
          var IE_PROTO = sharedKey("IE_PROTO");
          var ObjectPrototype = Object.prototype;
          module2.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function(O) {
            O = toObject(O);
            if (has(O, IE_PROTO)) return O[IE_PROTO];
            if (typeof O.constructor == "function" && O instanceof O.constructor) {
              return O.constructor.prototype;
            }
            return O instanceof Object ? ObjectPrototype : null;
          };
        }
      ),
      /***/
      "e177": (
        /***/
        function(module2, exports, __webpack_require__) {
          var fails = __webpack_require__("d039");
          module2.exports = !fails(function() {
            function F() {
            }
            F.prototype.constructor = null;
            return Object.getPrototypeOf(new F()) !== F.prototype;
          });
        }
      ),
      /***/
      "e260": (
        /***/
        function(module2, exports, __webpack_require__) {
          var toIndexedObject = __webpack_require__("fc6a");
          var addToUnscopables = __webpack_require__("44d2");
          var Iterators = __webpack_require__("3f8c");
          var InternalStateModule = __webpack_require__("69f3");
          var defineIterator = __webpack_require__("7dd0");
          var ARRAY_ITERATOR = "Array Iterator";
          var setInternalState = InternalStateModule.set;
          var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
          module2.exports = defineIterator(Array, "Array", function(iterated, kind) {
            setInternalState(this, {
              type: ARRAY_ITERATOR,
              target: toIndexedObject(iterated),
              // target
              index: 0,
              // next index
              kind
              // kind
            });
          }, function() {
            var state = getInternalState(this);
            var target = state.target;
            var kind = state.kind;
            var index = state.index++;
            if (!target || index >= target.length) {
              state.target = void 0;
              return { value: void 0, done: true };
            }
            if (kind == "keys") return { value: index, done: false };
            if (kind == "values") return { value: target[index], done: false };
            return { value: [index, target[index]], done: false };
          }, "values");
          Iterators.Arguments = Iterators.Array;
          addToUnscopables("keys");
          addToUnscopables("values");
          addToUnscopables("entries");
        }
      ),
      /***/
      "e2cc": (
        /***/
        function(module2, exports, __webpack_require__) {
          var redefine = __webpack_require__("6eeb");
          module2.exports = function(target, src, options) {
            for (var key in src) redefine(target, key, src[key], options);
            return target;
          };
        }
      ),
      /***/
      "e439": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var fails = __webpack_require__("d039");
          var toIndexedObject = __webpack_require__("fc6a");
          var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
          var DESCRIPTORS = __webpack_require__("83ab");
          var FAILS_ON_PRIMITIVES = fails(function() {
            nativeGetOwnPropertyDescriptor(1);
          });
          var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;
          $({ target: "Object", stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
            getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
              return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
            }
          });
        }
      ),
      /***/
      "e538": (
        /***/
        function(module2, exports, __webpack_require__) {
          var wellKnownSymbol = __webpack_require__("b622");
          exports.f = wellKnownSymbol;
        }
      ),
      /***/
      "e667": (
        /***/
        function(module2, exports) {
          module2.exports = function(exec) {
            try {
              return { error: false, value: exec() };
            } catch (error) {
              return { error: true, value: error };
            }
          };
        }
      ),
      /***/
      "e6cf": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var IS_PURE = __webpack_require__("c430");
          var global = __webpack_require__("da84");
          var getBuiltIn = __webpack_require__("d066");
          var NativePromise = __webpack_require__("fea9");
          var redefine = __webpack_require__("6eeb");
          var redefineAll = __webpack_require__("e2cc");
          var setToStringTag = __webpack_require__("d44e");
          var setSpecies = __webpack_require__("2626");
          var isObject = __webpack_require__("861d");
          var aFunction = __webpack_require__("1c0b");
          var anInstance = __webpack_require__("19aa");
          var classof = __webpack_require__("c6b6");
          var inspectSource = __webpack_require__("8925");
          var iterate = __webpack_require__("2266");
          var checkCorrectnessOfIteration = __webpack_require__("1c7e");
          var speciesConstructor = __webpack_require__("4840");
          var task = __webpack_require__("2cf4").set;
          var microtask = __webpack_require__("b575");
          var promiseResolve = __webpack_require__("cdf9");
          var hostReportErrors = __webpack_require__("44de");
          var newPromiseCapabilityModule = __webpack_require__("f069");
          var perform = __webpack_require__("e667");
          var InternalStateModule = __webpack_require__("69f3");
          var isForced = __webpack_require__("94ca");
          var wellKnownSymbol = __webpack_require__("b622");
          var V8_VERSION = __webpack_require__("2d00");
          var SPECIES = wellKnownSymbol("species");
          var PROMISE = "Promise";
          var getInternalState = InternalStateModule.get;
          var setInternalState = InternalStateModule.set;
          var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
          var PromiseConstructor = NativePromise;
          var TypeError2 = global.TypeError;
          var document2 = global.document;
          var process = global.process;
          var $fetch = getBuiltIn("fetch");
          var newPromiseCapability = newPromiseCapabilityModule.f;
          var newGenericPromiseCapability = newPromiseCapability;
          var IS_NODE = classof(process) == "process";
          var DISPATCH_EVENT = !!(document2 && document2.createEvent && global.dispatchEvent);
          var UNHANDLED_REJECTION = "unhandledrejection";
          var REJECTION_HANDLED = "rejectionhandled";
          var PENDING = 0;
          var FULFILLED = 1;
          var REJECTED = 2;
          var HANDLED = 1;
          var UNHANDLED = 2;
          var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
          var FORCED = isForced(PROMISE, function() {
            var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
            if (!GLOBAL_CORE_JS_PROMISE) {
              if (V8_VERSION === 66) return true;
              if (!IS_NODE && typeof PromiseRejectionEvent != "function") return true;
            }
            if (IS_PURE && !PromiseConstructor.prototype["finally"]) return true;
            if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false;
            var promise = PromiseConstructor.resolve(1);
            var FakePromise = function(exec) {
              exec(function() {
              }, function() {
              });
            };
            var constructor = promise.constructor = {};
            constructor[SPECIES] = FakePromise;
            return !(promise.then(function() {
            }) instanceof FakePromise);
          });
          var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function(iterable) {
            PromiseConstructor.all(iterable)["catch"](function() {
            });
          });
          var isThenable = function(it) {
            var then;
            return isObject(it) && typeof (then = it.then) == "function" ? then : false;
          };
          var notify = function(promise, state, isReject) {
            if (state.notified) return;
            state.notified = true;
            var chain = state.reactions;
            microtask(function() {
              var value = state.value;
              var ok = state.state == FULFILLED;
              var index = 0;
              while (chain.length > index) {
                var reaction = chain[index++];
                var handler = ok ? reaction.ok : reaction.fail;
                var resolve = reaction.resolve;
                var reject = reaction.reject;
                var domain = reaction.domain;
                var result, then, exited;
                try {
                  if (handler) {
                    if (!ok) {
                      if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
                      state.rejection = HANDLED;
                    }
                    if (handler === true) result = value;
                    else {
                      if (domain) domain.enter();
                      result = handler(value);
                      if (domain) {
                        domain.exit();
                        exited = true;
                      }
                    }
                    if (result === reaction.promise) {
                      reject(TypeError2("Promise-chain cycle"));
                    } else if (then = isThenable(result)) {
                      then.call(result, resolve, reject);
                    } else resolve(result);
                  } else reject(value);
                } catch (error) {
                  if (domain && !exited) domain.exit();
                  reject(error);
                }
              }
              state.reactions = [];
              state.notified = false;
              if (isReject && !state.rejection) onUnhandled(promise, state);
            });
          };
          var dispatchEvent = function(name, promise, reason) {
            var event, handler;
            if (DISPATCH_EVENT) {
              event = document2.createEvent("Event");
              event.promise = promise;
              event.reason = reason;
              event.initEvent(name, false, true);
              global.dispatchEvent(event);
            } else event = { promise, reason };
            if (handler = global["on" + name]) handler(event);
            else if (name === UNHANDLED_REJECTION) hostReportErrors("Unhandled promise rejection", reason);
          };
          var onUnhandled = function(promise, state) {
            task.call(global, function() {
              var value = state.value;
              var IS_UNHANDLED = isUnhandled(state);
              var result;
              if (IS_UNHANDLED) {
                result = perform(function() {
                  if (IS_NODE) {
                    process.emit("unhandledRejection", value, promise);
                  } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
                });
                state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
                if (result.error) throw result.value;
              }
            });
          };
          var isUnhandled = function(state) {
            return state.rejection !== HANDLED && !state.parent;
          };
          var onHandleUnhandled = function(promise, state) {
            task.call(global, function() {
              if (IS_NODE) {
                process.emit("rejectionHandled", promise);
              } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
            });
          };
          var bind = function(fn, promise, state, unwrap) {
            return function(value) {
              fn(promise, state, value, unwrap);
            };
          };
          var internalReject = function(promise, state, value, unwrap) {
            if (state.done) return;
            state.done = true;
            if (unwrap) state = unwrap;
            state.value = value;
            state.state = REJECTED;
            notify(promise, state, true);
          };
          var internalResolve = function(promise, state, value, unwrap) {
            if (state.done) return;
            state.done = true;
            if (unwrap) state = unwrap;
            try {
              if (promise === value) throw TypeError2("Promise can't be resolved itself");
              var then = isThenable(value);
              if (then) {
                microtask(function() {
                  var wrapper = { done: false };
                  try {
                    then.call(
                      value,
                      bind(internalResolve, promise, wrapper, state),
                      bind(internalReject, promise, wrapper, state)
                    );
                  } catch (error) {
                    internalReject(promise, wrapper, error, state);
                  }
                });
              } else {
                state.value = value;
                state.state = FULFILLED;
                notify(promise, state, false);
              }
            } catch (error) {
              internalReject(promise, { done: false }, error, state);
            }
          };
          if (FORCED) {
            PromiseConstructor = function Promise2(executor) {
              anInstance(this, PromiseConstructor, PROMISE);
              aFunction(executor);
              Internal.call(this);
              var state = getInternalState(this);
              try {
                executor(bind(internalResolve, this, state), bind(internalReject, this, state));
              } catch (error) {
                internalReject(this, state, error);
              }
            };
            Internal = function Promise2(executor) {
              setInternalState(this, {
                type: PROMISE,
                done: false,
                notified: false,
                parent: false,
                reactions: [],
                rejection: false,
                state: PENDING,
                value: void 0
              });
            };
            Internal.prototype = redefineAll(PromiseConstructor.prototype, {
              // `Promise.prototype.then` method
              // https://tc39.github.io/ecma262/#sec-promise.prototype.then
              then: function then(onFulfilled, onRejected) {
                var state = getInternalPromiseState(this);
                var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
                reaction.ok = typeof onFulfilled == "function" ? onFulfilled : true;
                reaction.fail = typeof onRejected == "function" && onRejected;
                reaction.domain = IS_NODE ? process.domain : void 0;
                state.parent = true;
                state.reactions.push(reaction);
                if (state.state != PENDING) notify(this, state, false);
                return reaction.promise;
              },
              // `Promise.prototype.catch` method
              // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
              "catch": function(onRejected) {
                return this.then(void 0, onRejected);
              }
            });
            OwnPromiseCapability = function() {
              var promise = new Internal();
              var state = getInternalState(promise);
              this.promise = promise;
              this.resolve = bind(internalResolve, promise, state);
              this.reject = bind(internalReject, promise, state);
            };
            newPromiseCapabilityModule.f = newPromiseCapability = function(C) {
              return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
            };
            if (!IS_PURE && typeof NativePromise == "function") {
              nativeThen = NativePromise.prototype.then;
              redefine(NativePromise.prototype, "then", function then(onFulfilled, onRejected) {
                var that = this;
                return new PromiseConstructor(function(resolve, reject) {
                  nativeThen.call(that, resolve, reject);
                }).then(onFulfilled, onRejected);
              }, { unsafe: true });
              if (typeof $fetch == "function") $({ global: true, enumerable: true, forced: true }, {
                // eslint-disable-next-line no-unused-vars
                fetch: function fetch(input) {
                  return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
                }
              });
            }
          }
          $({ global: true, wrap: true, forced: FORCED }, {
            Promise: PromiseConstructor
          });
          setToStringTag(PromiseConstructor, PROMISE, false, true);
          setSpecies(PROMISE);
          PromiseWrapper = getBuiltIn(PROMISE);
          $({ target: PROMISE, stat: true, forced: FORCED }, {
            // `Promise.reject` method
            // https://tc39.github.io/ecma262/#sec-promise.reject
            reject: function reject(r) {
              var capability = newPromiseCapability(this);
              capability.reject.call(void 0, r);
              return capability.promise;
            }
          });
          $({ target: PROMISE, stat: true, forced: IS_PURE || FORCED }, {
            // `Promise.resolve` method
            // https://tc39.github.io/ecma262/#sec-promise.resolve
            resolve: function resolve(x) {
              return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
            }
          });
          $({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
            // `Promise.all` method
            // https://tc39.github.io/ecma262/#sec-promise.all
            all: function all(iterable) {
              var C = this;
              var capability = newPromiseCapability(C);
              var resolve = capability.resolve;
              var reject = capability.reject;
              var result = perform(function() {
                var $promiseResolve = aFunction(C.resolve);
                var values = [];
                var counter = 0;
                var remaining = 1;
                iterate(iterable, function(promise) {
                  var index = counter++;
                  var alreadyCalled = false;
                  values.push(void 0);
                  remaining++;
                  $promiseResolve.call(C, promise).then(function(value) {
                    if (alreadyCalled) return;
                    alreadyCalled = true;
                    values[index] = value;
                    --remaining || resolve(values);
                  }, reject);
                });
                --remaining || resolve(values);
              });
              if (result.error) reject(result.value);
              return capability.promise;
            },
            // `Promise.race` method
            // https://tc39.github.io/ecma262/#sec-promise.race
            race: function race(iterable) {
              var C = this;
              var capability = newPromiseCapability(C);
              var reject = capability.reject;
              var result = perform(function() {
                var $promiseResolve = aFunction(C.resolve);
                iterate(iterable, function(promise) {
                  $promiseResolve.call(C, promise).then(capability.resolve, reject);
                });
              });
              if (result.error) reject(result.value);
              return capability.promise;
            }
          });
        }
      ),
      /***/
      "e893": (
        /***/
        function(module2, exports, __webpack_require__) {
          var has = __webpack_require__("5135");
          var ownKeys = __webpack_require__("56ef");
          var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
          var definePropertyModule = __webpack_require__("9bf2");
          module2.exports = function(target, source) {
            var keys = ownKeys(source);
            var defineProperty = definePropertyModule.f;
            var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
            }
          };
        }
      ),
      /***/
      "e8b5": (
        /***/
        function(module2, exports, __webpack_require__) {
          var classof = __webpack_require__("c6b6");
          module2.exports = Array.isArray || function isArray(arg) {
            return classof(arg) == "Array";
          };
        }
      ),
      /***/
      "e95a": (
        /***/
        function(module2, exports, __webpack_require__) {
          var wellKnownSymbol = __webpack_require__("b622");
          var Iterators = __webpack_require__("3f8c");
          var ITERATOR = wellKnownSymbol("iterator");
          var ArrayPrototype = Array.prototype;
          module2.exports = function(it) {
            return it !== void 0 && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
          };
        }
      ),
      /***/
      "ede3": (
        /***/
        function(module2, exports, __webpack_require__) {
          var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
          exports = ___CSS_LOADER_API_IMPORT___(false);
          exports.push([module2.i, ".qrcode-stream-wrapper[data-v-7a81005d]{width:100%;height:100%;position:relative;z-index:0}.qrcode-stream-overlay[data-v-7a81005d]{width:100%;height:100%;position:absolute;top:0;left:0}.qrcode-stream-camera[data-v-7a81005d]{width:100%;height:100%;display:block;-o-object-fit:cover;object-fit:cover}", ""]);
          module2.exports = exports;
        }
      ),
      /***/
      "f069": (
        /***/
        function(module2, exports, __webpack_require__) {
          var aFunction = __webpack_require__("1c0b");
          var PromiseCapability = function(C) {
            var resolve, reject;
            this.promise = new C(function($$resolve, $$reject) {
              if (resolve !== void 0 || reject !== void 0) throw TypeError("Bad Promise constructor");
              resolve = $$resolve;
              reject = $$reject;
            });
            this.resolve = aFunction(resolve);
            this.reject = aFunction(reject);
          };
          module2.exports.f = function(C) {
            return new PromiseCapability(C);
          };
        }
      ),
      /***/
      "f183": (
        /***/
        function(module2, exports, __webpack_require__) {
          var hiddenKeys = __webpack_require__("d012");
          var isObject = __webpack_require__("861d");
          var has = __webpack_require__("5135");
          var defineProperty = __webpack_require__("9bf2").f;
          var uid = __webpack_require__("90e3");
          var FREEZING = __webpack_require__("bb2f");
          var METADATA = uid("meta");
          var id = 0;
          var isExtensible = Object.isExtensible || function() {
            return true;
          };
          var setMetadata = function(it) {
            defineProperty(it, METADATA, { value: {
              objectID: "O" + ++id,
              // object ID
              weakData: {}
              // weak collections IDs
            } });
          };
          var fastKey = function(it, create) {
            if (!isObject(it)) return typeof it == "symbol" ? it : (typeof it == "string" ? "S" : "P") + it;
            if (!has(it, METADATA)) {
              if (!isExtensible(it)) return "F";
              if (!create) return "E";
              setMetadata(it);
            }
            return it[METADATA].objectID;
          };
          var getWeakData = function(it, create) {
            if (!has(it, METADATA)) {
              if (!isExtensible(it)) return true;
              if (!create) return false;
              setMetadata(it);
            }
            return it[METADATA].weakData;
          };
          var onFreeze = function(it) {
            if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
            return it;
          };
          var meta = module2.exports = {
            REQUIRED: false,
            fastKey,
            getWeakData,
            onFreeze
          };
          hiddenKeys[METADATA] = true;
        }
      ),
      /***/
      "f5df": (
        /***/
        function(module2, exports, __webpack_require__) {
          var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
          var classofRaw = __webpack_require__("c6b6");
          var wellKnownSymbol = __webpack_require__("b622");
          var TO_STRING_TAG = wellKnownSymbol("toStringTag");
          var CORRECT_ARGUMENTS = classofRaw(/* @__PURE__ */ function() {
            return arguments;
          }()) == "Arguments";
          var tryGet = function(it, key) {
            try {
              return it[key];
            } catch (error) {
            }
          };
          module2.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function(it) {
            var O, tag, result;
            return it === void 0 ? "Undefined" : it === null ? "Null" : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == "string" ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == "Object" && typeof O.callee == "function" ? "Arguments" : result;
          };
        }
      ),
      /***/
      "f718": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__.d(__webpack_exports__, "c", function() {
            return imageDataFromVideo;
          });
          __webpack_require__.d(__webpack_exports__, "b", function() {
            return imageDataFromUrl;
          });
          __webpack_require__.d(__webpack_exports__, "a", function() {
            return imageDataFromFile;
          });
          __webpack_require__("caad");
          __webpack_require__("2532");
          __webpack_require__("2ca0");
          __webpack_require__("96cf");
          var _home_travis_build_gruhn_vue_qrcode_reader_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("1da1");
          var _errors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("1cc0");
          var callforth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("c036");
          var canvas = document.createElement("canvas");
          var canvasCtx = canvas.getContext("2d");
          canvas.width = 1920;
          canvas.height = 1080;
          function imageDataFromCanvas(canvasImageSource, width, height) {
            var scalingRatio = Math.min(1, canvas.width / width, canvas.height / height);
            var widthScaled = scalingRatio * width;
            var heightScaled = scalingRatio * height;
            canvasCtx.drawImage(canvasImageSource, 0, 0, widthScaled, heightScaled);
            return canvasCtx.getImageData(0, 0, widthScaled, heightScaled);
          }
          function imageDataFromImage(imageElement) {
            var width = imageElement.naturalWidth;
            var height = imageElement.naturalHeight;
            return imageDataFromCanvas(imageElement, width, height);
          }
          function imageDataFromVideo(videoElement) {
            var width = videoElement.videoWidth;
            var height = videoElement.videoHeight;
            return imageDataFromCanvas(videoElement, width, height);
          }
          function imageDataFromUrl(_x) {
            return _imageDataFromUrl.apply(this, arguments);
          }
          function _imageDataFromUrl() {
            _imageDataFromUrl = Object(_home_travis_build_gruhn_vue_qrcode_reader_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[
              /* default */
              "a"
            ])(/* @__PURE__ */ regeneratorRuntime.mark(function _callee(url) {
              var image;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (!(url.startsWith("http") && url.includes(location.host) === false)) {
                        _context.next = 2;
                        break;
                      }
                      throw new _errors_js__WEBPACK_IMPORTED_MODULE_5__[
                        /* DropImageFetchError */
                        "b"
                      ]();
                    case 2:
                      image = document.createElement("img");
                      image.src = url;
                      _context.next = 6;
                      return Object(callforth__WEBPACK_IMPORTED_MODULE_6__[
                        /* eventOn */
                        "a"
                      ])(image, "load");
                    case 6:
                      return _context.abrupt("return", imageDataFromImage(image));
                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));
            return _imageDataFromUrl.apply(this, arguments);
          }
          function imageDataFromFile(_x2) {
            return _imageDataFromFile.apply(this, arguments);
          }
          function _imageDataFromFile() {
            _imageDataFromFile = Object(_home_travis_build_gruhn_vue_qrcode_reader_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__[
              /* default */
              "a"
            ])(/* @__PURE__ */ regeneratorRuntime.mark(function _callee2(file) {
              var reader, result, dataURL;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      if (!/image.*/.test(file.type)) {
                        _context2.next = 10;
                        break;
                      }
                      reader = new FileReader();
                      reader.readAsDataURL(file);
                      _context2.next = 5;
                      return Object(callforth__WEBPACK_IMPORTED_MODULE_6__[
                        /* eventOn */
                        "a"
                      ])(reader, "load");
                    case 5:
                      result = _context2.sent;
                      dataURL = result.target.result;
                      return _context2.abrupt("return", imageDataFromUrl(dataURL));
                    case 10:
                      throw new _errors_js__WEBPACK_IMPORTED_MODULE_5__[
                        /* DropImageDecodeError */
                        "a"
                      ]();
                    case 11:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));
            return _imageDataFromFile.apply(this, arguments);
          }
        }
      ),
      /***/
      "f772": (
        /***/
        function(module2, exports, __webpack_require__) {
          var shared = __webpack_require__("5692");
          var uid = __webpack_require__("90e3");
          var keys = shared("keys");
          module2.exports = function(key) {
            return keys[key] || (keys[key] = uid(key));
          };
        }
      ),
      /***/
      "fb15": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          __webpack_require__.r(__webpack_exports__);
          __webpack_require__.d(__webpack_exports__, "install", function() {
            return (
              /* reexport */
              src_0[
                "e"
                /* install */
              ]
            );
          });
          __webpack_require__.d(__webpack_exports__, "QrcodeStream", function() {
            return (
              /* reexport */
              src_0[
                "c"
                /* QrcodeStream */
              ]
            );
          });
          __webpack_require__.d(__webpack_exports__, "QrcodeCapture", function() {
            return (
              /* reexport */
              src_0[
                "a"
                /* QrcodeCapture */
              ]
            );
          });
          __webpack_require__.d(__webpack_exports__, "QrcodeDropZone", function() {
            return (
              /* reexport */
              src_0[
                "b"
                /* QrcodeDropZone */
              ]
            );
          });
          if (typeof window !== "undefined") {
            var currentScript = window.document.currentScript;
            {
              var getCurrentScript = __webpack_require__("8875");
              currentScript = getCurrentScript();
              if (!("currentScript" in document)) {
                Object.defineProperty(document, "currentScript", { get: getCurrentScript });
              }
            }
            var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);
            if (src) {
              __webpack_require__.p = src[1];
            }
          }
          var src_0 = __webpack_require__("b635");
          __webpack_exports__["default"] = src_0[
            "d"
            /* default */
          ];
        }
      ),
      /***/
      "fb6a": (
        /***/
        function(module2, exports, __webpack_require__) {
          var $ = __webpack_require__("23e7");
          var isObject = __webpack_require__("861d");
          var isArray = __webpack_require__("e8b5");
          var toAbsoluteIndex = __webpack_require__("23cb");
          var toLength = __webpack_require__("50c4");
          var toIndexedObject = __webpack_require__("fc6a");
          var createProperty = __webpack_require__("8418");
          var wellKnownSymbol = __webpack_require__("b622");
          var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
          var arrayMethodUsesToLength = __webpack_require__("ae40");
          var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport("slice");
          var USES_TO_LENGTH = arrayMethodUsesToLength("slice", { ACCESSORS: true, 0: 0, 1: 2 });
          var SPECIES = wellKnownSymbol("species");
          var nativeSlice = [].slice;
          var max = Math.max;
          $({ target: "Array", proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
            slice: function slice(start, end) {
              var O = toIndexedObject(this);
              var length = toLength(O.length);
              var k = toAbsoluteIndex(start, length);
              var fin = toAbsoluteIndex(end === void 0 ? length : end, length);
              var Constructor, result, n;
              if (isArray(O)) {
                Constructor = O.constructor;
                if (typeof Constructor == "function" && (Constructor === Array || isArray(Constructor.prototype))) {
                  Constructor = void 0;
                } else if (isObject(Constructor)) {
                  Constructor = Constructor[SPECIES];
                  if (Constructor === null) Constructor = void 0;
                }
                if (Constructor === Array || Constructor === void 0) {
                  return nativeSlice.call(O, k, fin);
                }
              }
              result = new (Constructor === void 0 ? Array : Constructor)(max(fin - k, 0));
              for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
              result.length = n;
              return result;
            }
          });
        }
      ),
      /***/
      "fc6a": (
        /***/
        function(module2, exports, __webpack_require__) {
          var IndexedObject = __webpack_require__("44ad");
          var requireObjectCoercible = __webpack_require__("1d80");
          module2.exports = function(it) {
            return IndexedObject(requireObjectCoercible(it));
          };
        }
      ),
      /***/
      "fdbc": (
        /***/
        function(module2, exports) {
          module2.exports = {
            CSSRuleList: 0,
            CSSStyleDeclaration: 0,
            CSSValueList: 0,
            ClientRectList: 0,
            DOMRectList: 0,
            DOMStringList: 0,
            DOMTokenList: 1,
            DataTransferItemList: 0,
            FileList: 0,
            HTMLAllCollection: 0,
            HTMLCollection: 0,
            HTMLFormElement: 0,
            HTMLSelectElement: 0,
            MediaList: 0,
            MimeTypeArray: 0,
            NamedNodeMap: 0,
            NodeList: 1,
            PaintRequestList: 0,
            Plugin: 0,
            PluginArray: 0,
            SVGLengthList: 0,
            SVGNumberList: 0,
            SVGPathSegList: 0,
            SVGPointList: 0,
            SVGStringList: 0,
            SVGTransformList: 0,
            SourceBufferList: 0,
            StyleSheetList: 0,
            TextTrackCueList: 0,
            TextTrackList: 0,
            TouchList: 0
          };
        }
      ),
      /***/
      "fdbf": (
        /***/
        function(module2, exports, __webpack_require__) {
          var NATIVE_SYMBOL = __webpack_require__("4930");
          module2.exports = NATIVE_SYMBOL && !Symbol.sham && typeof Symbol.iterator == "symbol";
        }
      ),
      /***/
      "fe6b": (
        /***/
        function(module2, __webpack_exports__, __webpack_require__) {
          var render2 = function() {
            var _vm = this;
            var _h = _vm.$createElement;
            var _c = _vm._self._c || _h;
            return _c("div", { on: { "drop": function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              return _vm.onDrop($event);
            }, "dragenter": function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              return _vm.onDragOver(true);
            }, "dragleave": function($event) {
              $event.preventDefault();
              $event.stopPropagation();
              return _vm.onDragOver(false);
            }, "dragover": function($event) {
              $event.preventDefault();
              $event.stopPropagation();
            } } }, [_vm._t("default")], 2);
          };
          var staticRenderFns = [];
          __webpack_require__("4160");
          __webpack_require__("159b");
          __webpack_require__("96cf");
          var asyncToGenerator = __webpack_require__("1da1");
          var toConsumableArray = __webpack_require__("2909");
          var scanner = __webpack_require__("a180");
          var image_data = __webpack_require__("f718");
          var CommonAPI = __webpack_require__("b3af");
          var jsqr = __webpack_require__("3c85");
          var QrcodeDropZonevue_type_script_lang_js_ = {
            name: "qrcode-drop-zone",
            mixins: [CommonAPI[
              "a"
              /* default */
            ]],
            props: {
              worker: {
                type: Function,
                default: jsqr[
                  "a"
                  /* default */
                ]
              }
            },
            methods: {
              onDragOver: function onDragOver(isDraggingOver) {
                this.$emit("dragover", isDraggingOver);
              },
              onDrop: function onDrop(_ref) {
                var _this = this;
                var dataTransfer = _ref.dataTransfer;
                this.onDragOver(false);
                var droppedFiles = Object(toConsumableArray[
                  "a"
                  /* default */
                ])(dataTransfer.files);
                var droppedUrl = dataTransfer.getData("text/uri-list");
                droppedFiles.forEach(function(file) {
                  _this.onDetect(_this.processFile(file));
                });
                if (droppedUrl !== "") {
                  this.onDetect(this.processUrl(droppedUrl));
                }
              },
              processFile: function processFile(file) {
                var _this2 = this;
                return Object(asyncToGenerator[
                  "a"
                  /* default */
                ])(/* @__PURE__ */ regeneratorRuntime.mark(function _callee() {
                  var imageData, scanResult;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return Object(image_data[
                            "a"
                            /* imageDataFromFile */
                          ])(file);
                        case 2:
                          imageData = _context.sent;
                          _context.next = 5;
                          return Object(scanner[
                            "b"
                            /* scan */
                          ])(_this2.worker, imageData);
                        case 5:
                          scanResult = _context.sent;
                          return _context.abrupt("return", scanResult);
                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }))();
              },
              processUrl: function processUrl(url) {
                var _this3 = this;
                return Object(asyncToGenerator[
                  "a"
                  /* default */
                ])(/* @__PURE__ */ regeneratorRuntime.mark(function _callee2() {
                  var imageData, scanResult;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return Object(image_data[
                            "b"
                            /* imageDataFromUrl */
                          ])(url);
                        case 2:
                          imageData = _context2.sent;
                          _context2.next = 5;
                          return Object(scanner[
                            "b"
                            /* scan */
                          ])(_this3.worker, imageData);
                        case 5:
                          scanResult = _context2.sent;
                          return _context2.abrupt("return", scanResult);
                        case 7:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }))();
              }
            }
          };
          var components_QrcodeDropZonevue_type_script_lang_js_ = QrcodeDropZonevue_type_script_lang_js_;
          var componentNormalizer = __webpack_require__("2877");
          var component = Object(componentNormalizer[
            "a"
            /* default */
          ])(
            components_QrcodeDropZonevue_type_script_lang_js_,
            render2,
            staticRenderFns,
            false,
            null,
            null,
            null
          );
          __webpack_exports__["a"] = component.exports;
        }
      ),
      /***/
      "fea9": (
        /***/
        function(module2, exports, __webpack_require__) {
          var global = __webpack_require__("da84");
          module2.exports = global.Promise;
        }
      )
      /******/
    });
  })(VueQrcodeReader_common);
  return VueQrcodeReader_common.exports;
}
var VueQrcodeReader_commonExports = requireVueQrcodeReader_common();
const VueQrcodeReader = /* @__PURE__ */ getDefaultExportFromCjs(VueQrcodeReader_commonExports);
const _sfc_main = {
  components: {
    QrcodeStream: VueQrcodeReader_commonExports.QrcodeStream
  },
  mixins: [
    mixinsFilters
  ],
  props: [
    "is_laser"
  ],
  data() {
    return {
      decodedContent: "",
      errorMessage: "",
      hide_scanner: 0,
      booking: [],
      showResult: false,
      resultType: "",
      // 'error', 'warning', 'success'
      resultMessage: "",
      resultTimeout: null,
      laser_scanner: "",
      processing: false,
      resultData: {},
      // <-- for structured result
      // Manual mode
      showManualDetails: false,
      manualData: {},
      manualOrderNumber: "",
      manualError: ""
    };
  },
  methods: {
    onInit(promise) {
      promise.then(() => {
        console.log("Camera initialized successfully!");
        this.errorMessage = "";
      }).catch((error) => {
        console.error("Camera initialization error:", error);
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        if (error.name === "NotAllowedError") {
          this.errorMessage = trans("em.camera_access_required") + " - Por favor, permita o acesso à câmera nas configurações do seu navegador.";
        } else if (error.name === "NotFoundError") {
          this.errorMessage = trans("em.camera_not_detected");
        } else if (error.name === "NotSupportedError") {
          this.errorMessage = trans("em.camera_https_required");
        } else if (error.name === "NotReadableError") {
          this.errorMessage = trans("em.camera_not_detected") + " - A câmera pode estar em uso por outro aplicativo.";
        } else if (error.name === "OverconstrainedError") {
          this.errorMessage = trans("em.camera_not_detected") + " - Tente novamente.";
        } else if (error.name === "SecurityError") {
          this.errorMessage = trans("em.camera_https_required");
        } else if (error.name === "TypeError") {
          this.errorMessage = "Câmera não disponível. Verifique as permissões do navegador.";
        } else {
          this.errorMessage = error.message || trans("em.camera_not_detected");
        }
      });
    },
    getOrderNumberFromQRCode(content) {
      if (this.showResult || this.processing || this.showManualDetails) return;
      let order_number = "";
      if (this.isJSON(content)) {
        const parsed = JSON.parse(content);
        order_number = parsed.order_number || "";
      } else {
        order_number = content;
      }
      this.fetchManualDetails(order_number);
    },
    getOrderNumberFromLaserInput() {
      if (this.showResult || this.processing || this.showManualDetails) return;
      let order_number = "";
      if (this.isJSON(this.laser_scanner)) {
        const parsed = JSON.parse(this.laser_scanner);
        order_number = parsed.order_number || "";
      } else {
        order_number = this.laser_scanner;
      }
      this.laser_scanner = "";
      this.fetchManualDetails(order_number);
      this.focusLaserInput();
    },
    fetchManualDetails(order_number) {
      if (this.processing) return;
      if (!order_number || order_number.trim() === "") {
        return;
      }
      this.processing = true;
      this.manualError = "";
      this.manualOrderNumber = order_number;
      const payload = {
        order_number,
        scan_all: 1
        // Always scan single for manual mode
      };
      const post_url = route("eventmie.get_booking_details");
      axios.post(post_url, payload).then((res) => {
        if (res.data.status === true && res.data.flag === "details") {
          this.manualData = res.data;
          this.showManualDetails = true;
        } else {
          this.manualData = {};
          this.showManualDetails = false;
          this.manualError = res.data.message || "Unknown error";
          this.showScanResult("error", this.manualError);
        }
      }).catch((error) => {
        let msg = trans("em.unknown_error");
        this.manualData = {};
        this.showManualDetails = false;
        if (error.response && error.response.data) {
          if (error.response.data.message) {
            msg = error.response.data.message;
          } else if (error.response.data.errors) {
            const errors = error.response.data.errors;
            msg = Object.values(errors).flat().join(" ");
          }
        }
        this.manualError = msg;
        this.showScanResult("error", this.manualError);
      }).finally(() => {
        this.processing = false;
        this.focusLaserInput();
      });
    },
    verifyAndCheckinManual() {
      if (this.processing || !this.manualOrderNumber) return;
      this.processing = true;
      this.manualError = "";
      const payload = {
        order_number: this.manualOrderNumber,
        scan_all: 1
        // Always scan single for manual mode
      };
      const post_url = route("eventmie.verify_and_checkin");
      axios.post(post_url, payload).then((res) => {
        if (res.data.status === true) {
          this.resultData = res.data;
          this.showManualDetails = false;
          this.showScanResult(res.data.flag === "success" ? "success" : "warning", "");
        } else {
          this.resultData = {};
          this.showManualDetails = false;
          this.showScanResult("error", res.data.message || "Unknown error");
        }
      }).catch((error) => {
        let msg = trans("em.unknown_error");
        this.resultData = {};
        this.showManualDetails = false;
        if (error.response && error.response.data) {
          if (error.response.data.message) {
            msg = error.response.data.message;
          } else if (error.response.data.errors) {
            const errors = error.response.data.errors;
            msg = Object.values(errors).flat().join(" ");
          }
        }
        this.showScanResult("error", msg);
      }).finally(() => {
        this.processing = false;
        this.focusLaserInput();
      });
    },
    showScanResult(type, message) {
      this.showResult = true;
      this.resultType = type;
      this.resultMessage = message;
      this.hide_scanner = 1;
      this.showManualDetails = false;
      clearTimeout(this.resultTimeout);
      this.resultTimeout = setTimeout(() => {
        this.showResult = false;
        this.resultType = "";
        this.resultMessage = "";
        this.resultData = {};
        this.hide_scanner = 0;
        this.showManualDetails = false;
        this.manualData = {};
        this.manualOrderNumber = "";
        this.manualError = "";
        this.focusLaserInput();
      }, 3e3);
    },
    isJSON(str) {
      try {
        const parsed = JSON.parse(str);
        return typeof parsed === "object" && parsed !== null;
      } catch (e) {
        console.log(e, "error");
        return false;
      }
    },
    focusLaserInput() {
      this.$nextTick(() => {
        if (this.is_laser && this.$refs.laserInput) {
          this.$refs.laserInput.focus();
        }
      });
    },
    refreshPage() {
      window.location.reload();
    }
  },
  watch: {
    is_laser(newVal) {
      if (newVal) {
        this.focusLaserInput();
      }
    }
  },
  beforeDestroy() {
    clearTimeout(this.resultTimeout);
  },
  mounted() {
    if (this.is_laser) {
      this.focusLaserInput();
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_vm.showResult || _vm.showManualDetails ? _c("div", { class: ["scanner-result-overlay", _vm.resultType, { "bg-success": _vm.resultType === "success", "bg-warning": _vm.resultType === "warning", "bg-danger": _vm.resultType === "error" }] }, [_vm.showManualDetails ? [_c("div", { staticClass: "scanner-event-header" }, [_c("p", { staticClass: "strong mb-0 text-black" }, [_vm._v(_vm._s(_vm.manualData.event_title))])]), _vm._l(_vm.manualData.tickets, function(ticket) {
    return _c("div", { key: ticket.ticket_id, staticClass: "scanner-ticket-block" }, [_c("div", { staticClass: "scanner-ticket-badge" }, [_c("i", { staticClass: "fas fa-ticket" }), _vm._v(" " + _vm._s(ticket.ticket_title))]), _c("br"), _vm.manualData.is_checked_in ? _c("div", { staticClass: "scanner-attendee-list" }, [_c("div", { staticClass: "scanner-attendee-name" }, [_c("small", { staticClass: "strong fw-bold fs-6" }, [_vm._v(" " + _vm._s(_vm.trans("em.checked_in_at")) + ": " + _vm._s(_vm.manualData.checkin_date) + " " + _vm._s(_vm.manualData.checkin_time) + " ")])])]) : _vm._e()]);
  }), _c("div", { staticClass: "scanner-customer-block" }, [_c("div", { staticClass: "scanner-customer-badge" }, [_vm._v(_vm._s(_vm.trans("em.buyer")))]), _c("div", { staticClass: "scanner-customer-name text-dark" }, [_vm._v(_vm._s(_vm.manualData.customer_name))]), _c("div", { staticClass: "scanner-customer-email text-dark" }, [_vm._v(_vm._s(_vm.manualData.customer_email))])]), _c("div", { staticClass: "d-flex justify-content-center mb-4" }, [!_vm.manualData.is_checked_in ? _c("button", { staticClass: "btn btn-lg btn-success px-5 py-3 fw-bold", attrs: { "disabled": _vm.processing }, on: { "click": _vm.verifyAndCheckinManual } }, [_c("i", { staticClass: "fas fa-circle-check" }), _vm._v(" " + _vm._s(_vm.trans("em.verify_and_checkin")))]) : _c("div", { staticClass: "alert alert-warning mb-0" }, [_c("i", { staticClass: "fas fa-info-circle me-2" }), _vm._v(_vm._s(_vm.trans("em.ticket_already_checked_in")) + " "), _c("br"), _vm.manualData.previous_checkin_date && _vm.manualData.previous_checkin_time ? _c("small", { staticClass: "text-muted" }, [_vm._v(" " + _vm._s(_vm.trans("em.checked_in_at")) + ": " + _vm._s(_vm.manualData.previous_checkin_date) + " " + _vm._s(_vm.manualData.previous_checkin_time) + " ")]) : _vm._e()])]), _vm.manualError ? _c("div", { staticClass: "scanner-error-message" }, [_vm._v(_vm._s(_vm.manualError))]) : _vm._e(), _c("div", { staticClass: "d-flex justify-content-center mt-3" }, [_c("button", { staticClass: "btn btn-dark px-4 py-2", on: { "click": _vm.refreshPage } }, [_c("i", { staticClass: "fas fa-sync-alt me-2" }), _vm._v(_vm._s(_vm.trans("em.scan_another_ticket")) + " ")])])] : _vm.showResult ? [_vm.resultType === "success" || _vm.resultType === "warning" ? [_c("div", { staticClass: "scanner-event-header" }, [_c("p", { staticClass: "small strong fs-6 mb-0" }, [_vm._v(_vm._s(_vm.resultData.event_title))]), _vm.resultType === "success" ? _c("i", { staticClass: "fas fa-check-circle" }) : _vm._e(), _vm.resultType === "warning" ? _c("i", { staticClass: "fas fa-exclamation-triangle" }) : _vm._e(), _vm._v(" " + _vm._s(_vm.resultType === "success" ? _vm.trans("em.checkin_successful") : _vm.trans("em.already_checked_in")) + " ")]), _vm._l(_vm.resultData.tickets, function(ticket) {
    return _c("div", { key: ticket.ticket_id, staticClass: "scanner-ticket-block" }, [_c("div", { staticClass: "scanner-ticket-badge" }, [_c("i", { staticClass: "fas fa-ticket" }), _vm._v(" " + _vm._s(ticket.ticket_title))]), _c("br"), _vm.resultType === "warning" ? _c("div", { staticClass: "scanner-attendee-list" }, [_c("div", { staticClass: "scanner-attendee-name" }, [_c("small", { staticClass: "strong fw-bold fs-6" }, [_vm._v(" " + _vm._s(_vm.trans("em.checked_in_at")) + ": " + _vm._s(_vm.resultData.checkin_date) + " " + _vm._s(_vm.resultData.checkin_time) + " ")])])]) : _vm._e()]);
  }), _c("div", { staticClass: "scanner-customer-block" }, [_c("div", { staticClass: "scanner-customer-badge" }, [_vm._v(_vm._s(_vm.trans("em.buyer")))]), _c("div", { staticClass: "scanner-customer-name text-dark" }, [_vm._v(_vm._s(_vm.resultData.customer_name))]), _c("div", { staticClass: "scanner-customer-email text-dark" }, [_vm._v(_vm._s(_vm.resultData.customer_email))])]), _c("div", { staticClass: "d-flex justify-content-center mt-3" }, [_c("button", { staticClass: "btn btn-secondary px-4 py-2", on: { "click": _vm.refreshPage } }, [_c("i", { staticClass: "fas fa-sync-alt me-2" }), _vm._v(_vm._s(_vm.trans("em.scan_another_ticket")) + " ")])])] : [_c("div", { staticClass: "scanner-error-message" }, [_vm._v(" ")]), _c("div", { staticClass: "scanner-event-header" }, [_c("i", { staticClass: "fas fa-ban" }), _vm._v(" " + _vm._s(_vm.resultMessage) + " ")])]] : _vm._e()], 2) : _c("div", { staticClass: "scanner-wrapper" }, [_c("div", { staticClass: "scanner-container" }, [_vm.errorMessage ? _c("div", { staticClass: "alert alert-danger m-3", attrs: { "role": "alert" } }, [_c("i", { staticClass: "fas fa-exclamation-circle me-2" }), _c("strong", [_vm._v(_vm._s(_vm.trans("em.error")) + ":")]), _vm._v(" " + _vm._s(_vm.errorMessage) + " ")]) : _vm._e(), !_vm.is_laser && _vm.hide_scanner <= 0 ? [_c("qrcode-stream", { attrs: { "constraints": { facingMode: "environment" } }, on: { "decode": _vm.getOrderNumberFromQRCode, "init": _vm.onInit } })] : _vm._e(), _vm.is_laser ? [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.laser_scanner, expression: "laser_scanner" }], ref: "laserInput", staticClass: "form-control", attrs: { "placeholder": _vm.trans("em.scan_ticket_on_laser"), "autofocus": "" }, domProps: { "value": _vm.laser_scanner }, on: { "change": _vm.getOrderNumberFromLaserInput, "blur": _vm.focusLaserInput, "input": function($event) {
    if ($event.target.composing) return;
    _vm.laser_scanner = $event.target.value;
  } } })] : _vm._e()], 2)])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "a8c25483"
);
const TicketScanner = __component__.exports;
Vue.use(VueQrcodeReader);
window.app = new Vue({
  el: "#eventmie_app",
  components: {
    TicketScanner
  }
});
//# sourceMappingURL=index-SWzjAkl4.js.map
