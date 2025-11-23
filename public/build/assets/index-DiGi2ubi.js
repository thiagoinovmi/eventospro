import { e as commonjsGlobal, g as getDefaultExportFromCjs, n as normalizeComponent, m as mixinsFilters, a as axios } from "./mixins-DsimpN2H.js";
var vueQrcodeReader_common;
var hasRequiredVueQrcodeReader_common;
function requireVueQrcodeReader_common() {
  if (hasRequiredVueQrcodeReader_common) return vueQrcodeReader_common;
  hasRequiredVueQrcodeReader_common = 1;
  vueQrcodeReader_common = function(e) {
    function t(n) {
      if (r[n]) return r[n].exports;
      var o = r[n] = { i: n, l: false, exports: {} };
      return e[n].call(o.exports, o, o.exports, t), o.l = true, o.exports;
    }
    var r = {};
    return t.m = e, t.c = r, t.d = function(e2, r2, n) {
      t.o(e2, r2) || Object.defineProperty(e2, r2, { configurable: false, enumerable: true, get: n });
    }, t.n = function(e2) {
      var r2 = e2 && e2.__esModule ? function() {
        return e2.default;
      } : function() {
        return e2;
      };
      return t.d(r2, "a", r2), r2;
    }, t.o = function(e2, t2) {
      return Object.prototype.hasOwnProperty.call(e2, t2);
    }, t.p = "", t(t.s = 70);
  }([function(e, t) {
    var r = e.exports = { version: "2.6.5" };
    "number" == typeof __e && (__e = r);
  }, function(e, t) {
    var r = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof __g && (__g = r);
  }, function(e, t, r) {
    var n = r(33)("wks"), o = r(22), a = r(1).Symbol, i = "function" == typeof a;
    (e.exports = function(e2) {
      return n[e2] || (n[e2] = i && a[e2] || (i ? a : o)("Symbol." + e2));
    }).store = n;
  }, function(e, t, r) {
    var n = r(1), o = r(0), a = r(13), i = r(9), s = r(10), c = function(e2, t2, r2) {
      var d, u, l, f = e2 & c.F, p = e2 & c.G, m = e2 & c.S, v = e2 & c.P, h = e2 & c.B, k = e2 & c.W, C = p ? o : o[t2] || (o[t2] = {}), y = C.prototype, g = p ? n : m ? n[t2] : (n[t2] || {}).prototype;
      p && (r2 = t2);
      for (d in r2) (u = !f && g && void 0 !== g[d]) && s(C, d) || (l = u ? g[d] : r2[d], C[d] = p && "function" != typeof g[d] ? r2[d] : h && u ? a(l, n) : k && g[d] == l ? function(e3) {
        var t3 = function(t4, r3, n2) {
          if (this instanceof e3) {
            switch (arguments.length) {
              case 0:
                return new e3();
              case 1:
                return new e3(t4);
              case 2:
                return new e3(t4, r3);
            }
            return new e3(t4, r3, n2);
          }
          return e3.apply(this, arguments);
        };
        return t3.prototype = e3.prototype, t3;
      }(l) : v && "function" == typeof l ? a(Function.call, l) : l, v && ((C.virtual || (C.virtual = {}))[d] = l, e2 & c.R && y && !y[d] && i(y, d, l)));
    };
    c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c;
  }, function(e, t, r) {
    var n = r(5), o = r(48), a = r(28), i = Object.defineProperty;
    t.f = r(8) ? Object.defineProperty : function(e2, t2, r2) {
      if (n(e2), t2 = a(t2, true), n(r2), o) try {
        return i(e2, t2, r2);
      } catch (e3) {
      }
      if ("get" in r2 || "set" in r2) throw TypeError("Accessors not supported!");
      return "value" in r2 && (e2[t2] = r2.value), e2;
    };
  }, function(e, t, r) {
    var n = r(7);
    e.exports = function(e2) {
      if (!n(e2)) throw TypeError(e2 + " is not an object!");
      return e2;
    };
  }, function(e, t, r) {
    function n(e2, t2, r2) {
      var n2 = e2.match(t2);
      return n2 && n2.length >= r2 && parseInt(n2[r2], 10);
    }
    function o(e2, t2, r2) {
      if (e2.RTCPeerConnection) {
        var n2 = e2.RTCPeerConnection.prototype, o2 = n2.addEventListener;
        n2.addEventListener = function(e3, n3) {
          if (e3 !== t2) return o2.apply(this, arguments);
          var a3 = function(e4) {
            var t3 = r2(e4);
            t3 && n3(t3);
          };
          return this._eventMap = this._eventMap || {}, this._eventMap[n3] = a3, o2.apply(this, [e3, a3]);
        };
        var a2 = n2.removeEventListener;
        n2.removeEventListener = function(e3, r3) {
          if (e3 !== t2 || !this._eventMap || !this._eventMap[r3]) return a2.apply(this, arguments);
          var n3 = this._eventMap[r3];
          return delete this._eventMap[r3], a2.apply(this, [e3, n3]);
        }, Object.defineProperty(n2, "on" + t2, { get: function() {
          return this["_on" + t2];
        }, set: function(e3) {
          this["_on" + t2] && (this.removeEventListener(t2, this["_on" + t2]), delete this["_on" + t2]), e3 && this.addEventListener(t2, this["_on" + t2] = e3);
        }, enumerable: true, configurable: true });
      }
    }
    var a = true, i = true;
    e.exports = { extractVersion: n, wrapPeerConnectionEvent: o, disableLog: function(e2) {
      return "boolean" != typeof e2 ? new Error("Argument type: " + typeof e2 + ". Please use a boolean.") : (a = e2, e2 ? "adapter.js logging disabled" : "adapter.js logging enabled");
    }, disableWarnings: function(e2) {
      return "boolean" != typeof e2 ? new Error("Argument type: " + typeof e2 + ". Please use a boolean.") : (i = !e2, "adapter.js deprecation warnings " + (e2 ? "disabled" : "enabled"));
    }, log: function() {
      if ("object" == typeof window) {
        if (a) return;
        "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments);
      }
    }, deprecated: function(e2, t2) {
      i && console.warn(e2 + " is deprecated, please use " + t2 + " instead.");
    }, detectBrowser: function(e2) {
      var t2 = e2 && e2.navigator, r2 = {};
      if (r2.browser = null, r2.version = null, void 0 === e2 || !e2.navigator) return r2.browser = "Not a browser.", r2;
      if (t2.mozGetUserMedia) r2.browser = "firefox", r2.version = n(t2.userAgent, /Firefox\/(\d+)\./, 1);
      else if (t2.webkitGetUserMedia) r2.browser = "chrome", r2.version = n(t2.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
      else if (t2.mediaDevices && t2.userAgent.match(/Edge\/(\d+).(\d+)$/)) r2.browser = "edge", r2.version = n(t2.userAgent, /Edge\/(\d+).(\d+)$/, 2);
      else {
        if (!e2.RTCPeerConnection || !t2.userAgent.match(/AppleWebKit\/(\d+)\./)) return r2.browser = "Not a supported browser.", r2;
        r2.browser = "safari", r2.version = n(t2.userAgent, /AppleWebKit\/(\d+)\./, 1);
      }
      return r2;
    } };
  }, function(e, t) {
    e.exports = function(e2) {
      return "object" == typeof e2 ? null !== e2 : "function" == typeof e2;
    };
  }, function(e, t, r) {
    e.exports = !r(16)(function() {
      return 7 != Object.defineProperty({}, "a", { get: function() {
        return 7;
      } }).a;
    });
  }, function(e, t, r) {
    var n = r(4), o = r(17);
    e.exports = r(8) ? function(e2, t2, r2) {
      return n.f(e2, t2, o(1, r2));
    } : function(e2, t2, r2) {
      return e2[t2] = r2, e2;
    };
  }, function(e, t) {
    var r = {}.hasOwnProperty;
    e.exports = function(e2, t2) {
      return r.call(e2, t2);
    };
  }, function(e, t, r) {
    e.exports = r(94);
  }, function(e, t, r) {
    t.__esModule = true;
    var n = r(45), o = function(e2) {
      return e2 && e2.__esModule ? e2 : { default: e2 };
    }(n);
    t.default = function(e2) {
      return function() {
        var t2 = e2.apply(this, arguments);
        return new o.default(function(e3, r2) {
          function n2(a, i) {
            try {
              var s = t2[a](i), c = s.value;
            } catch (e4) {
              return void r2(e4);
            }
            if (!s.done) return o.default.resolve(c).then(function(e4) {
              n2("next", e4);
            }, function(e4) {
              n2("throw", e4);
            });
            e3(c);
          }
          return n2("next");
        });
      };
    };
  }, function(e, t, r) {
    var n = r(21);
    e.exports = function(e2, t2, r2) {
      if (n(e2), void 0 === t2) return e2;
      switch (r2) {
        case 1:
          return function(r3) {
            return e2.call(t2, r3);
          };
        case 2:
          return function(r3, n2) {
            return e2.call(t2, r3, n2);
          };
        case 3:
          return function(r3, n2, o) {
            return e2.call(t2, r3, n2, o);
          };
      }
      return function() {
        return e2.apply(t2, arguments);
      };
    };
  }, function(e, t, r) {
    var n = r(78), o = r(26);
    e.exports = function(e2) {
      return n(o(e2));
    };
  }, function(e, t) {
    e.exports = true;
  }, function(e, t) {
    e.exports = function(e2) {
      try {
        return !!e2();
      } catch (e3) {
        return true;
      }
    };
  }, function(e, t) {
    e.exports = function(e2, t2) {
      return { enumerable: !(1 & e2), configurable: !(2 & e2), writable: !(4 & e2), value: t2 };
    };
  }, function(e, t) {
    e.exports = {};
  }, function(e, t) {
    var r = {}.toString;
    e.exports = function(e2) {
      return r.call(e2).slice(8, -1);
    };
  }, function(e, t) {
    e.exports = function(e2, t2, r, n) {
      var o, a = e2 = e2 || {}, i = typeof e2.default;
      "object" !== i && "function" !== i || (o = e2, a = e2.default);
      var s = "function" == typeof a ? a.options : a;
      if (t2 && (s.render = t2.render, s.staticRenderFns = t2.staticRenderFns), r && (s._scopeId = r), n) {
        var c = s.computed || (s.computed = {});
        Object.keys(n).forEach(function(e3) {
          var t3 = n[e3];
          c[e3] = function() {
            return t3;
          };
        });
      }
      return { esModule: o, exports: a, options: s };
    };
  }, function(e, t) {
    e.exports = function(e2) {
      if ("function" != typeof e2) throw TypeError(e2 + " is not a function!");
      return e2;
    };
  }, function(e, t) {
    var r = 0, n = Math.random();
    e.exports = function(e2) {
      return "Symbol(".concat(void 0 === e2 ? "" : e2, ")_", (++r + n).toString(36));
    };
  }, function(e, t, r) {
    var n = r(4).f, o = r(10), a = r(2)("toStringTag");
    e.exports = function(e2, t2, r2) {
      e2 && !o(e2 = r2 ? e2 : e2.prototype, a) && n(e2, a, { configurable: true, value: t2 });
    };
  }, function(e, t, r) {
    var n = r(75)(true);
    r(47)(String, "String", function(e2) {
      this._t = String(e2), this._i = 0;
    }, function() {
      var e2, t2 = this._t, r2 = this._i;
      return r2 >= t2.length ? { value: void 0, done: true } : (e2 = n(t2, r2), this._i += e2.length, { value: e2, done: false });
    });
  }, function(e, t) {
    var r = Math.ceil, n = Math.floor;
    e.exports = function(e2) {
      return isNaN(e2 = +e2) ? 0 : (e2 > 0 ? n : r)(e2);
    };
  }, function(e, t) {
    e.exports = function(e2) {
      if (void 0 == e2) throw TypeError("Can't call method on  " + e2);
      return e2;
    };
  }, function(e, t, r) {
    var n = r(7), o = r(1).document, a = n(o) && n(o.createElement);
    e.exports = function(e2) {
      return a ? o.createElement(e2) : {};
    };
  }, function(e, t, r) {
    var n = r(7);
    e.exports = function(e2, t2) {
      if (!n(e2)) return e2;
      var r2, o;
      if (t2 && "function" == typeof (r2 = e2.toString) && !n(o = r2.call(e2))) return o;
      if ("function" == typeof (r2 = e2.valueOf) && !n(o = r2.call(e2))) return o;
      if (!t2 && "function" == typeof (r2 = e2.toString) && !n(o = r2.call(e2))) return o;
      throw TypeError("Can't convert object to primitive value");
    };
  }, function(e, t, r) {
    var n = r(5), o = r(77), a = r(34), i = r(32)("IE_PROTO"), s = function() {
    }, c = function() {
      var e2, t2 = r(27)("iframe"), n2 = a.length;
      for (t2.style.display = "none", r(51).appendChild(t2), t2.src = "javascript:", e2 = t2.contentWindow.document, e2.open(), e2.write("<script>document.F=Object<\/script>"), e2.close(), c = e2.F; n2--; ) delete c.prototype[a[n2]];
      return c();
    };
    e.exports = Object.create || function(e2, t2) {
      var r2;
      return null !== e2 ? (s.prototype = n(e2), r2 = new s(), s.prototype = null, r2[i] = e2) : r2 = c(), void 0 === t2 ? r2 : o(r2, t2);
    };
  }, function(e, t, r) {
    var n = r(50), o = r(34);
    e.exports = Object.keys || function(e2) {
      return n(e2, o);
    };
  }, function(e, t, r) {
    var n = r(25), o = Math.min;
    e.exports = function(e2) {
      return e2 > 0 ? o(n(e2), 9007199254740991) : 0;
    };
  }, function(e, t, r) {
    var n = r(33)("keys"), o = r(22);
    e.exports = function(e2) {
      return n[e2] || (n[e2] = o(e2));
    };
  }, function(e, t, r) {
    var n = r(0), o = r(1), a = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
    (e.exports = function(e2, t2) {
      return a[e2] || (a[e2] = void 0 !== t2 ? t2 : {});
    })("versions", []).push({ version: n.version, mode: r(15) ? "pure" : "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)" });
  }, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
  }, function(e, t, r) {
    var n = r(26);
    e.exports = function(e2) {
      return Object(n(e2));
    };
  }, function(e, t, r) {
    function n(e2) {
      var t2, r2;
      this.promise = new e2(function(e3, n2) {
        if (void 0 !== t2 || void 0 !== r2) throw TypeError("Bad Promise constructor");
        t2 = e3, r2 = n2;
      }), this.resolve = o(t2), this.reject = o(r2);
    }
    var o = r(21);
    e.exports.f = function(e2) {
      return new n(e2);
    };
  }, function(e, t, r) {
    function n(e2, t2, r2) {
      var n2 = r2.detectHandler, o2 = r2.locateHandler, a2 = r2.minDelay, i2 = null, s2 = null, c2 = performance.now(), d2 = new e2(), u = false, l = true;
      d2.onmessage = function(e3) {
        u = false;
        var t3 = e3.data, r3 = t3.content, a3 = t3.location;
        null !== r3 && r3 !== i2 && n2(e3.data), a3 !== s2 && o2(a3), i2 = r3 || i2, s2 = a3;
      };
      return function e3(r3) {
        if (l) {
          if (window.requestAnimationFrame(e3), r3 - c2 >= a2 && (c2 = r3, false === u)) {
            u = true;
            var n3 = t2.captureFrame();
            d2.postMessage(n3, [n3.data.buffer]);
          }
        } else d2.terminate();
      }(), function() {
        l = false;
      };
    }
    r.d(t, "b", function() {
      return d;
    }), t.a = n;
    var o = r(11), a = r.n(o), i = r(12), s = r.n(i), c = r(38), d = function() {
      var e2 = s()(a.a.mark(function e3(t2, r2) {
        var n2, o2;
        return a.a.wrap(function(e4) {
          for (; ; ) switch (e4.prev = e4.next) {
            case 0:
              return n2 = new t2(), n2.postMessage(r2, [r2.data.buffer]), e4.next = 4, Object(c.a)(n2, "message");
            case 4:
              return o2 = e4.sent, n2.terminate(), e4.abrupt("return", o2.data);
            case 7:
            case "end":
              return e4.stop();
          }
        }, e3, this);
      }));
      return function(t2, r2) {
        return e2.apply(this, arguments);
      };
    }();
  }, function(e, t, r) {
    function n(e2, t2, r2) {
      var n2, o;
      void 0 === r2 && (r2 = "error");
      var a = new Promise(function(e3, t3) {
        n2 = e3, o = t3;
      });
      return e2.addEventListener(t2, n2), e2.addEventListener(r2, o), a.finally(function() {
        e2.removeEventListener(t2, n2), e2.removeEventListener(r2, o);
      }), a;
    }
    r.d(t, "a", function() {
      return n;
    });
  }, function(e, t, r) {
    t.f = r(2);
  }, function(e, t, r) {
    var n = r(1), o = r(0), a = r(15), i = r(39), s = r(4).f;
    e.exports = function(e2) {
      var t2 = o.Symbol || (o.Symbol = a ? {} : n.Symbol || {});
      "_" == e2.charAt(0) || e2 in t2 || s(t2, e2, { value: i.f(e2) });
    };
  }, function(e, t) {
    t.f = {}.propertyIsEnumerable;
  }, function(e, t, r) {
    function n(e2, t2, r2) {
      var n2 = Math.min(1, f.width / t2, f.height / r2), o2 = n2 * t2, a2 = n2 * r2;
      return p.drawImage(e2, 0, 0, o2, a2), p.getImageData(0, 0, o2, a2);
    }
    function o(e2) {
      return n(e2, e2.naturalWidth, e2.naturalHeight);
    }
    function a(e2) {
      return n(e2, e2.videoWidth, e2.videoHeight);
    }
    t.c = a, r.d(t, "b", function() {
      return m;
    }), r.d(t, "a", function() {
      return v;
    });
    var i = r(11), s = r.n(i), c = r(12), d = r.n(c), u = r(64), l = r(38), f = document.createElement("canvas"), p = f.getContext("2d");
    f.width = 1920, f.height = 1080;
    var m = function() {
      var e2 = d()(s.a.mark(function e3(t2) {
        var r2;
        return s.a.wrap(function(e4) {
          for (; ; ) switch (e4.prev = e4.next) {
            case 0:
              if (!t2.startsWith("http") || false !== t2.includes(location.host)) {
                e4.next = 2;
                break;
              }
              throw new u.b();
            case 2:
              return r2 = document.createElement("img"), r2.src = t2, e4.next = 6, Object(l.a)(r2, "load");
            case 6:
              return e4.abrupt("return", o(r2));
            case 7:
            case "end":
              return e4.stop();
          }
        }, e3, this);
      }));
      return function(t2) {
        return e2.apply(this, arguments);
      };
    }(), v = function() {
      var e2 = d()(s.a.mark(function e3(t2) {
        var r2, n2, o2;
        return s.a.wrap(function(e4) {
          for (; ; ) switch (e4.prev = e4.next) {
            case 0:
              if (!/image.*/.test(t2.type)) {
                e4.next = 10;
                break;
              }
              return r2 = new FileReader(), r2.readAsDataURL(t2), e4.next = 5, Object(l.a)(r2, "load");
            case 5:
              return n2 = e4.sent, o2 = n2.target.result, e4.abrupt("return", m(o2));
            case 10:
              throw new u.a();
            case 11:
            case "end":
              return e4.stop();
          }
        }, e3, this);
      }));
      return function(t2) {
        return e2.apply(this, arguments);
      };
    }();
  }, function(e, t, r) {
    var n = r(20)(r(139), null, null, null);
    e.exports = n.exports;
  }, function(e, t, r) {
    e.exports = function() {
      return r(140)(`!function(o){function e(t){if(r[t])return r[t].exports;var c=r[t]={i:t,l:!1,exports:{}};return o[t].call(c.exports,c,c.exports,e),c.l=!0,c.exports}var r={};e.m=o,e.c=r,e.d=function(o,r,t){e.o(o,r)||Object.defineProperty(o,r,{configurable:!1,enumerable:!0,get:t})},e.n=function(o){var r=o&&o.__esModule?function(){return o.default}:function(){return o};return e.d(r,"a",r),r},e.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},e.p="",e(e.s=0)}([function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(1),c=r.n(t);self.addEventListener("message",function(o){var e=o.data,r=c()(e.data,e.width,e.height,{inversionAttempts:"dontInvert"}),t=null,s=null;null!==r&&(t=r.data,s=r.location);var a={content:t,location:s,imageData:e};self.postMessage(a,[e.data.buffer])})},function(o,e,r){!function(e,r){o.exports=r()}("undefined"!=typeof self&&self,function(){return function(o){function e(t){if(r[t])return r[t].exports;var c=r[t]={i:t,l:!1,exports:{}};return o[t].call(c.exports,c,c.exports,e),c.l=!0,c.exports}var r={};return e.m=o,e.c=r,e.d=function(o,r,t){e.o(o,r)||Object.defineProperty(o,r,{configurable:!1,enumerable:!0,get:t})},e.n=function(o){var r=o&&o.__esModule?function(){return o.default}:function(){return o};return e.d(r,"a",r),r},e.o=function(o,e){return Object.prototype.hasOwnProperty.call(o,e)},e.p="",e(e.s=3)}([function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function o(o,e){this.width=e,this.height=o.length/e,this.data=o}return o.createEmpty=function(e,r){return new o(new Uint8ClampedArray(e*r),e)},o.prototype.get=function(o,e){return!(o<0||o>=this.width||e<0||e>=this.height)&&!!this.data[e*this.width+o]},o.prototype.set=function(o,e,r){this.data[e*this.width+o]=r?1:0},o.prototype.setRegion=function(o,e,r,t,c){for(var s=e;s<e+t;s++)for(var a=o;a<o+r;a++)this.set(a,s,!!c)},o}();e.BitMatrix=t},function(o,e,r){"use strict";function t(o,e){return o^e}Object.defineProperty(e,"__esModule",{value:!0});var c=r(2);e.addOrSubtractGF=t;var s=function(){function o(o,e,r){this.primitive=o,this.size=e,this.generatorBase=r,this.expTable=new Array(this.size),this.logTable=new Array(this.size);for(var t=1,s=0;s<this.size;s++)this.expTable[s]=t,(t*=2)>=this.size&&(t=(t^this.primitive)&this.size-1);for(var s=0;s<this.size-1;s++)this.logTable[this.expTable[s]]=s;this.zero=new c.default(this,Uint8ClampedArray.from([0])),this.one=new c.default(this,Uint8ClampedArray.from([1]))}return o.prototype.multiply=function(o,e){return 0===o||0===e?0:this.expTable[(this.logTable[o]+this.logTable[e])%(this.size-1)]},o.prototype.inverse=function(o){if(0===o)throw new Error("Can't invert 0");return this.expTable[this.size-this.logTable[o]-1]},o.prototype.buildMonomial=function(o,e){if(o<0)throw new Error("Invalid monomial degree less than 0");if(0===e)return this.zero;var r=new Uint8ClampedArray(o+1);return r[0]=e,new c.default(this,r)},o.prototype.log=function(o){if(0===o)throw new Error("Can't take log(0)");return this.logTable[o]},o.prototype.exp=function(o){return this.expTable[o]},o}();e.default=s},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r(1),c=function(){function o(o,e){if(0===e.length)throw new Error("No coefficients.");this.field=o;var r=e.length;if(r>1&&0===e[0]){for(var t=1;t<r&&0===e[t];)t++;if(t===r)this.coefficients=o.zero.coefficients;else{this.coefficients=new Uint8ClampedArray(r-t);for(var c=0;c<this.coefficients.length;c++)this.coefficients[c]=e[t+c]}}else this.coefficients=e}return o.prototype.degree=function(){return this.coefficients.length-1},o.prototype.isZero=function(){return 0===this.coefficients[0]},o.prototype.getCoefficient=function(o){return this.coefficients[this.coefficients.length-1-o]},o.prototype.addOrSubtract=function(e){if(this.isZero())return e;if(e.isZero())return this;var r=this.coefficients,c=e.coefficients;r.length>c.length&&(d=[c,r],r=d[0],c=d[1]);for(var s=new Uint8ClampedArray(c.length),a=c.length-r.length,n=0;n<a;n++)s[n]=c[n];for(var n=a;n<c.length;n++)s[n]=t.addOrSubtractGF(r[n-a],c[n]);return new o(this.field,s);var d},o.prototype.multiply=function(e){if(0===e)return this.field.zero;if(1===e)return this;for(var r=this.coefficients.length,t=new Uint8ClampedArray(r),c=0;c<r;c++)t[c]=this.field.multiply(this.coefficients[c],e);return new o(this.field,t)},o.prototype.multiplyPoly=function(e){if(this.isZero()||e.isZero())return this.field.zero;for(var r=this.coefficients,c=r.length,s=e.coefficients,a=s.length,n=new Uint8ClampedArray(c+a-1),d=0;d<c;d++)for(var l=r[d],i=0;i<a;i++)n[d+i]=t.addOrSubtractGF(n[d+i],this.field.multiply(l,s[i]));return new o(this.field,n)},o.prototype.multiplyByMonomial=function(e,r){if(e<0)throw new Error("Invalid degree less than 0");if(0===r)return this.field.zero;for(var t=this.coefficients.length,c=new Uint8ClampedArray(t+e),s=0;s<t;s++)c[s]=this.field.multiply(this.coefficients[s],r);return new o(this.field,c)},o.prototype.evaluateAt=function(o){var e=0;if(0===o)return this.getCoefficient(0);var r=this.coefficients.length;if(1===o)return this.coefficients.forEach(function(o){e=t.addOrSubtractGF(e,o)}),e;e=this.coefficients[0];for(var c=1;c<r;c++)e=t.addOrSubtractGF(this.field.multiply(o,e),this.coefficients[c]);return e},o}();e.default=c},function(o,e,r){"use strict";function t(o){var e=d.locate(o);if(!e)return null;var r=n.extract(o,e),t=a.decode(r.matrix);return t?{binaryData:t.bytes,data:t.text,chunks:t.chunks,location:{topRightCorner:r.mappingFunction(e.dimension,0),topLeftCorner:r.mappingFunction(0,0),bottomRightCorner:r.mappingFunction(e.dimension,e.dimension),bottomLeftCorner:r.mappingFunction(0,e.dimension),topRightFinderPattern:e.topRight,topLeftFinderPattern:e.topLeft,bottomLeftFinderPattern:e.bottomLeft,bottomRightAlignmentPattern:e.alignmentPattern}}:null}function c(o,e,r,c){void 0===c&&(c={});var a=l;Object.keys(a||{}).forEach(function(o){a[o]=c[o]||a[o]});var n="attemptBoth"===a.inversionAttempts||"invertFirst"===a.inversionAttempts,d="onlyInvert"===a.inversionAttempts||"invertFirst"===a.inversionAttempts,i=s.binarize(o,e,r,n),B=i.binarized,k=i.inverted,u=t(d?k:B);return u||"attemptBoth"!==a.inversionAttempts&&"invertFirst"!==a.inversionAttempts||(u=t(d?B:k)),u}Object.defineProperty(e,"__esModule",{value:!0});var s=r(4),a=r(5),n=r(11),d=r(12),l={inversionAttempts:"attemptBoth"};c.default=c,e.default=c},function(o,e,r){"use strict";function t(o,e,r){return o<e?e:o>r?r:o}function c(o,e,r,c){if(o.length!==e*r*4)throw new Error("Malformed data passed to binarizer.");for(var l=new d(e,r),i=0;i<e;i++)for(var B=0;B<r;B++){var k=o[4*(B*e+i)+0],u=o[4*(B*e+i)+1],C=o[4*(B*e+i)+2];l.set(i,B,.2126*k+.7152*u+.0722*C)}for(var m=Math.ceil(e/a),f=Math.ceil(r/a),w=new d(m,f),P=0;P<f;P++)for(var v=0;v<m;v++){for(var h=0,p=1/0,b=0,B=0;B<a;B++)for(var i=0;i<a;i++){var y=l.get(v*a+i,P*a+B);h+=y,p=Math.min(p,y),b=Math.max(b,y)}var g=h/Math.pow(a,2);if(b-p<=n&&(g=p/2,P>0&&v>0)){var x=(w.get(v,P-1)+2*w.get(v-1,P)+w.get(v-1,P-1))/4;p<x&&(g=x)}w.set(v,P,g)}var M=s.BitMatrix.createEmpty(e,r),L=null;c&&(L=s.BitMatrix.createEmpty(e,r));for(var P=0;P<f;P++)for(var v=0;v<m;v++){for(var N=t(v,2,m-3),I=t(P,2,f-3),h=0,O=-2;O<=2;O++)for(var z=-2;z<=2;z++)h+=w.get(N+O,I+z);for(var S=h/25,O=0;O<a;O++)for(var z=0;z<a;z++){var i=v*a+O,B=P*a+z,X=l.get(i,B);M.set(i,B,X<=S),c&&L.set(i,B,!(X<=S))}}return c?{binarized:M,inverted:L}:{binarized:M}}Object.defineProperty(e,"__esModule",{value:!0});var s=r(0),a=8,n=24,d=function(){function o(o,e){this.width=o,this.data=new Uint8ClampedArray(o*e)}return o.prototype.get=function(o,e){return this.data[e*this.width+o]},o.prototype.set=function(o,e,r){this.data[e*this.width+o]=r},o}();e.binarize=c},function(o,e,r){"use strict";function t(o,e){for(var r=o^e,t=0;r;)t++,r&=r-1;return t}function c(o,e){return e<<1|o}function s(o){var e=17+4*o.versionNumber,r=k.BitMatrix.createEmpty(e,e);r.setRegion(0,0,9,9,!0),r.setRegion(e-8,0,8,9,!0),r.setRegion(0,e-8,9,8,!0);for(var t=0,c=o.alignmentPatternCenters;t<c.length;t++)for(var s=c[t],a=0,n=o.alignmentPatternCenters;a<n.length;a++){var d=n[a];6===s&&6===d||6===s&&d===e-7||s===e-7&&6===d||r.setRegion(s-2,d-2,5,5,!0)}return r.setRegion(6,9,1,e-17,!0),r.setRegion(9,6,e-17,1,!0),o.versionNumber>6&&(r.setRegion(e-11,0,3,6,!0),r.setRegion(0,e-11,6,3,!0)),r}function a(o,e,r){for(var t=w[r.dataMask],a=o.height,n=s(e),d=[],l=0,i=0,B=!0,k=a-1;k>0;k-=2){6===k&&k--;for(var u=0;u<a;u++)for(var C=B?a-1-u:u,m=0;m<2;m++){var f=k-m;if(!n.get(f,C)){i++;var P=o.get(f,C);t({y:C,x:f})&&(P=!P),l=c(P,l),8===i&&(d.push(l),i=0,l=0)}}B=!B}return d}function n(o){var e=o.height,r=Math.floor((e-17)/4);if(r<=6)return m.VERSIONS[r-1];for(var s=0,a=5;a>=0;a--)for(var n=e-9;n>=e-11;n--)s=c(o.get(n,a),s);for(var d=0,n=5;n>=0;n--)for(var a=e-9;a>=e-11;a--)d=c(o.get(n,a),d);for(var l,i=1/0,B=0,k=m.VERSIONS;B<k.length;B++){var u=k[B];if(u.infoBits===s||u.infoBits===d)return u;var C=t(s,u.infoBits);C<i&&(l=u,i=C),C=t(d,u.infoBits),C<i&&(l=u,i=C)}return i<=3?l:void 0}function d(o){for(var e=0,r=0;r<=8;r++)6!==r&&(e=c(o.get(r,8),e));for(var s=7;s>=0;s--)6!==s&&(e=c(o.get(8,s),e));for(var a=o.height,n=0,s=a-1;s>=a-7;s--)n=c(o.get(8,s),n);for(var r=a-8;r<a;r++)n=c(o.get(r,8),n);for(var d=1/0,l=null,i=0,B=f;i<B.length;i++){var k=B[i],u=k.bits,C=k.formatInfo;if(u===e||u===n)return C;var m=t(e,u);m<d&&(l=C,d=m),e!==n&&(m=t(n,u))<d&&(l=C,d=m)}return d<=3?l:null}function l(o,e,r){var t=e.errorCorrectionLevels[r],c=[],s=0;if(t.ecBlocks.forEach(function(o){for(var e=0;e<o.numBlocks;e++)c.push({numDataCodewords:o.dataCodewordsPerBlock,codewords:[]}),s+=o.dataCodewordsPerBlock+t.ecCodewordsPerBlock}),o.length<s)return null;o=o.slice(0,s);for(var a=t.ecBlocks[0].dataCodewordsPerBlock,n=0;n<a;n++)for(var d=0,l=c;d<l.length;d++){var i=l[d];i.codewords.push(o.shift())}if(t.ecBlocks.length>1)for(var B=t.ecBlocks[0].numBlocks,k=t.ecBlocks[1].numBlocks,n=0;n<k;n++)c[B+n].codewords.push(o.shift());for(;o.length>0;)for(var u=0,C=c;u<C.length;u++){var i=C[u];i.codewords.push(o.shift())}return c}function i(o){var e=n(o);if(!e)return null;var r=d(o);if(!r)return null;var t=a(o,e,r),c=l(t,e,r.errorCorrectionLevel);if(!c)return null;for(var s=c.reduce(function(o,e){return o+e.numDataCodewords},0),i=new Uint8ClampedArray(s),B=0,k=0,m=c;k<m.length;k++){var f=m[k],w=C.decode(f.codewords,f.codewords.length-f.numDataCodewords);if(!w)return null;for(var P=0;P<f.numDataCodewords;P++)i[B++]=w[P]}try{return u.decode(i,e.versionNumber)}catch(o){return null}}function B(o){if(null==o)return null;var e=i(o);if(e)return e;for(var r=0;r<o.width;r++)for(var t=r+1;t<o.height;t++)o.get(r,t)!==o.get(t,r)&&(o.set(r,t,!o.get(r,t)),o.set(t,r,!o.get(t,r)));return i(o)}Object.defineProperty(e,"__esModule",{value:!0});var k=r(0),u=r(6),C=r(9),m=r(10),f=[{bits:21522,formatInfo:{errorCorrectionLevel:1,dataMask:0}},{bits:20773,formatInfo:{errorCorrectionLevel:1,dataMask:1}},{bits:24188,formatInfo:{errorCorrectionLevel:1,dataMask:2}},{bits:23371,formatInfo:{errorCorrectionLevel:1,dataMask:3}},{bits:17913,formatInfo:{errorCorrectionLevel:1,dataMask:4}},{bits:16590,formatInfo:{errorCorrectionLevel:1,dataMask:5}},{bits:20375,formatInfo:{errorCorrectionLevel:1,dataMask:6}},{bits:19104,formatInfo:{errorCorrectionLevel:1,dataMask:7}},{bits:30660,formatInfo:{errorCorrectionLevel:0,dataMask:0}},{bits:29427,formatInfo:{errorCorrectionLevel:0,dataMask:1}},{bits:32170,formatInfo:{errorCorrectionLevel:0,dataMask:2}},{bits:30877,formatInfo:{errorCorrectionLevel:0,dataMask:3}},{bits:26159,formatInfo:{errorCorrectionLevel:0,dataMask:4}},{bits:25368,formatInfo:{errorCorrectionLevel:0,dataMask:5}},{bits:27713,formatInfo:{errorCorrectionLevel:0,dataMask:6}},{bits:26998,formatInfo:{errorCorrectionLevel:0,dataMask:7}},{bits:5769,formatInfo:{errorCorrectionLevel:3,dataMask:0}},{bits:5054,formatInfo:{errorCorrectionLevel:3,dataMask:1}},{bits:7399,formatInfo:{errorCorrectionLevel:3,dataMask:2}},{bits:6608,formatInfo:{errorCorrectionLevel:3,dataMask:3}},{bits:1890,formatInfo:{errorCorrectionLevel:3,dataMask:4}},{bits:597,formatInfo:{errorCorrectionLevel:3,dataMask:5}},{bits:3340,formatInfo:{errorCorrectionLevel:3,dataMask:6}},{bits:2107,formatInfo:{errorCorrectionLevel:3,dataMask:7}},{bits:13663,formatInfo:{errorCorrectionLevel:2,dataMask:0}},{bits:12392,formatInfo:{errorCorrectionLevel:2,dataMask:1}},{bits:16177,formatInfo:{errorCorrectionLevel:2,dataMask:2}},{bits:14854,formatInfo:{errorCorrectionLevel:2,dataMask:3}},{bits:9396,formatInfo:{errorCorrectionLevel:2,dataMask:4}},{bits:8579,formatInfo:{errorCorrectionLevel:2,dataMask:5}},{bits:11994,formatInfo:{errorCorrectionLevel:2,dataMask:6}},{bits:11245,formatInfo:{errorCorrectionLevel:2,dataMask:7}}],w=[function(o){return(o.y+o.x)%2==0},function(o){return o.y%2==0},function(o){return o.x%3==0},function(o){return(o.y+o.x)%3==0},function(o){return(Math.floor(o.y/2)+Math.floor(o.x/3))%2==0},function(o){return o.x*o.y%2+o.x*o.y%3==0},function(o){return(o.y*o.x%2+o.y*o.x%3)%2==0},function(o){return((o.y+o.x)%2+o.y*o.x%3)%2==0}];e.decode=B},function(o,e,r){"use strict";function t(o,e){for(var r=[],t="",c=[10,12,14][e],s=o.readBits(c);s>=3;){var a=o.readBits(10);if(a>=1e3)throw new Error("Invalid numeric value above 999");var n=Math.floor(a/100),d=Math.floor(a/10)%10,l=a%10;r.push(48+n,48+d,48+l),t+=n.toString()+d.toString()+l.toString(),s-=3}if(2===s){var a=o.readBits(7);if(a>=100)throw new Error("Invalid numeric value above 99");var n=Math.floor(a/10),d=a%10;r.push(48+n,48+d),t+=n.toString()+d.toString()}else if(1===s){var a=o.readBits(4);if(a>=10)throw new Error("Invalid numeric value above 9");r.push(48+a),t+=a.toString()}return{bytes:r,text:t}}function c(o,e){for(var r=[],t="",c=[9,11,13][e],s=o.readBits(c);s>=2;){var a=o.readBits(11),n=Math.floor(a/45),d=a%45;r.push(k[n].charCodeAt(0),k[d].charCodeAt(0)),t+=k[n]+k[d],s-=2}if(1===s){var n=o.readBits(6);r.push(k[n].charCodeAt(0)),t+=k[n]}return{bytes:r,text:t}}function s(o,e){for(var r=[],t="",c=[8,16,16][e],s=o.readBits(c),a=0;a<s;a++){var n=o.readBits(8);r.push(n)}try{t+=decodeURIComponent(r.map(function(o){return"%"+("0"+o.toString(16)).substr(-2)}).join(""))}catch(o){}return{bytes:r,text:t}}function a(o,e){for(var r=[],t="",c=[8,10,12][e],s=o.readBits(c),a=0;a<s;a++){var n=o.readBits(13),d=Math.floor(n/192)<<8|n%192;d+=d<7936?33088:49472,r.push(d>>8,255&d),t+=String.fromCharCode(i.shiftJISTable[d])}return{bytes:r,text:t}}function n(o,e){for(var r=new l.BitStream(o),n=e<=9?0:e<=26?1:2,i={text:"",bytes:[],chunks:[]};r.available()>=4;){var k=r.readBits(4);if(k===B.Terminator)return i;if(k===B.ECI)0===r.readBits(1)?i.chunks.push({type:d.ECI,assignmentNumber:r.readBits(7)}):0===r.readBits(1)?i.chunks.push({type:d.ECI,assignmentNumber:r.readBits(14)}):0===r.readBits(1)?i.chunks.push({type:d.ECI,assignmentNumber:r.readBits(21)}):i.chunks.push({type:d.ECI,assignmentNumber:-1});else if(k===B.Numeric){var u=t(r,n);i.text+=u.text,(w=i.bytes).push.apply(w,u.bytes),i.chunks.push({type:d.Numeric,text:u.text})}else if(k===B.Alphanumeric){var C=c(r,n);i.text+=C.text,(P=i.bytes).push.apply(P,C.bytes),i.chunks.push({type:d.Alphanumeric,text:C.text})}else if(k===B.Byte){var m=s(r,n);i.text+=m.text,(v=i.bytes).push.apply(v,m.bytes),i.chunks.push({type:d.Byte,bytes:m.bytes,text:m.text})}else if(k===B.Kanji){var f=a(r,n);i.text+=f.text,(h=i.bytes).push.apply(h,f.bytes),i.chunks.push({type:d.Kanji,bytes:f.bytes,text:f.text})}}var w,P,v,h}Object.defineProperty(e,"__esModule",{value:!0});var d,l=r(7),i=r(8);!function(o){o.Numeric="numeric",o.Alphanumeric="alphanumeric",o.Byte="byte",o.Kanji="kanji",o.ECI="eci"}(d=e.Mode||(e.Mode={}));var B;!function(o){o[o.Terminator=0]="Terminator",o[o.Numeric=1]="Numeric",o[o.Alphanumeric=2]="Alphanumeric",o[o.Byte=4]="Byte",o[o.Kanji=8]="Kanji",o[o.ECI=7]="ECI"}(B||(B={}));var k=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];e.decode=n},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=function(){function o(o){this.byteOffset=0,this.bitOffset=0,this.bytes=o}return o.prototype.readBits=function(o){if(o<1||o>32||o>this.available())throw new Error("Cannot read "+o.toString()+" bits");var e=0;if(this.bitOffset>0){var r=8-this.bitOffset,t=o<r?o:r,c=r-t,s=255>>8-t<<c;e=(this.bytes[this.byteOffset]&s)>>c,o-=t,this.bitOffset+=t,8===this.bitOffset&&(this.bitOffset=0,this.byteOffset++)}if(o>0){for(;o>=8;)e=e<<8|255&this.bytes[this.byteOffset],this.byteOffset++,o-=8;if(o>0){var c=8-o,s=255>>c<<c;e=e<<o|(this.bytes[this.byteOffset]&s)>>c,this.bitOffset+=o}}return e},o.prototype.available=function(){return 8*(this.bytes.length-this.byteOffset)-this.bitOffset},o}();e.BitStream=t},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.shiftJISTable={32:32,33:33,34:34,35:35,36:36,37:37,38:38,39:39,40:40,41:41,42:42,43:43,44:44,45:45,46:46,47:47,48:48,49:49,50:50,51:51,52:52,53:53,54:54,55:55,56:56,57:57,58:58,59:59,60:60,61:61,62:62,63:63,64:64,65:65,66:66,67:67,68:68,69:69,70:70,71:71,72:72,73:73,74:74,75:75,76:76,77:77,78:78,79:79,80:80,81:81,82:82,83:83,84:84,85:85,86:86,87:87,88:88,89:89,90:90,91:91,92:165,93:93,94:94,95:95,96:96,97:97,98:98,99:99,100:100,101:101,102:102,103:103,104:104,105:105,106:106,107:107,108:108,109:109,110:110,111:111,112:112,113:113,114:114,115:115,116:116,117:117,118:118,119:119,120:120,121:121,122:122,123:123,124:124,125:125,126:8254,33088:12288,33089:12289,33090:12290,33091:65292,33092:65294,33093:12539,33094:65306,33095:65307,33096:65311,33097:65281,33098:12443,33099:12444,33100:180,33101:65344,33102:168,33103:65342,33104:65507,33105:65343,33106:12541,33107:12542,33108:12445,33109:12446,33110:12291,33111:20189,33112:12293,33113:12294,33114:12295,33115:12540,33116:8213,33117:8208,33118:65295,33119:92,33120:12316,33121:8214,33122:65372,33123:8230,33124:8229,33125:8216,33126:8217,33127:8220,33128:8221,33129:65288,33130:65289,33131:12308,33132:12309,33133:65339,33134:65341,33135:65371,33136:65373,33137:12296,33138:12297,33139:12298,33140:12299,33141:12300,33142:12301,33143:12302,33144:12303,33145:12304,33146:12305,33147:65291,33148:8722,33149:177,33150:215,33152:247,33153:65309,33154:8800,33155:65308,33156:65310,33157:8806,33158:8807,33159:8734,33160:8756,33161:9794,33162:9792,33163:176,33164:8242,33165:8243,33166:8451,33167:65509,33168:65284,33169:162,33170:163,33171:65285,33172:65283,33173:65286,33174:65290,33175:65312,33176:167,33177:9734,33178:9733,33179:9675,33180:9679,33181:9678,33182:9671,33183:9670,33184:9633,33185:9632,33186:9651,33187:9650,33188:9661,33189:9660,33190:8251,33191:12306,33192:8594,33193:8592,33194:8593,33195:8595,33196:12307,33208:8712,33209:8715,33210:8838,33211:8839,33212:8834,33213:8835,33214:8746,33215:8745,33224:8743,33225:8744,33226:172,33227:8658,33228:8660,33229:8704,33230:8707,33242:8736,33243:8869,33244:8978,33245:8706,33246:8711,33247:8801,33248:8786,33249:8810,33250:8811,33251:8730,33252:8765,33253:8733,33254:8757,33255:8747,33256:8748,33264:8491,33265:8240,33266:9839,33267:9837,33268:9834,33269:8224,33270:8225,33271:182,33276:9711,33359:65296,33360:65297,33361:65298,33362:65299,33363:65300,33364:65301,33365:65302,33366:65303,33367:65304,33368:65305,33376:65313,33377:65314,33378:65315,33379:65316,33380:65317,33381:65318,33382:65319,33383:65320,33384:65321,33385:65322,33386:65323,33387:65324,33388:65325,33389:65326,33390:65327,33391:65328,33392:65329,33393:65330,33394:65331,33395:65332,33396:65333,33397:65334,33398:65335,33399:65336,33400:65337,33401:65338,33409:65345,33410:65346,33411:65347,33412:65348,33413:65349,33414:65350,33415:65351,33416:65352,33417:65353,33418:65354,33419:65355,33420:65356,33421:65357,33422:65358,33423:65359,33424:65360,33425:65361,33426:65362,33427:65363,33428:65364,33429:65365,33430:65366,33431:65367,33432:65368,33433:65369,33434:65370,33439:12353,33440:12354,33441:12355,33442:12356,33443:12357,33444:12358,33445:12359,33446:12360,33447:12361,33448:12362,33449:12363,33450:12364,33451:12365,33452:12366,33453:12367,33454:12368,33455:12369,33456:12370,33457:12371,33458:12372,33459:12373,33460:12374,33461:12375,33462:12376,33463:12377,33464:12378,33465:12379,33466:12380,33467:12381,33468:12382,33469:12383,33470:12384,33471:12385,33472:12386,33473:12387,33474:12388,33475:12389,33476:12390,33477:12391,33478:12392,33479:12393,33480:12394,33481:12395,33482:12396,33483:12397,33484:12398,33485:12399,33486:12400,33487:12401,33488:12402,33489:12403,33490:12404,33491:12405,33492:12406,33493:12407,33494:12408,33495:12409,33496:12410,33497:12411,33498:12412,33499:12413,33500:12414,33501:12415,33502:12416,33503:12417,33504:12418,33505:12419,33506:12420,33507:12421,33508:12422,33509:12423,33510:12424,33511:12425,33512:12426,33513:12427,33514:12428,33515:12429,33516:12430,33517:12431,33518:12432,33519:12433,33520:12434,33521:12435,33600:12449,33601:12450,33602:12451,33603:12452,33604:12453,33605:12454,33606:12455,33607:12456,33608:12457,33609:12458,33610:12459,33611:12460,33612:12461,33613:12462,33614:12463,33615:12464,33616:12465,33617:12466,33618:12467,33619:12468,33620:12469,33621:12470,33622:12471,33623:12472,33624:12473,33625:12474,33626:12475,33627:12476,33628:12477,33629:12478,33630:12479,33631:12480,33632:12481,33633:12482,33634:12483,33635:12484,33636:12485,33637:12486,33638:12487,33639:12488,33640:12489,33641:12490,33642:12491,33643:12492,33644:12493,33645:12494,33646:12495,33647:12496,33648:12497,33649:12498,33650:12499,33651:12500,33652:12501,33653:12502,33654:12503,33655:12504,33656:12505,33657:12506,33658:12507,33659:12508,33660:12509,33661:12510,33662:12511,33664:12512,33665:12513,33666:12514,33667:12515,33668:12516,33669:12517,33670:12518,33671:12519,33672:12520,33673:12521,33674:12522,33675:12523,33676:12524,33677:12525,33678:12526,33679:12527,33680:12528,33681:12529,33682:12530,33683:12531,33684:12532,33685:12533,33686:12534,33695:913,33696:914,33697:915,33698:916,33699:917,33700:918,33701:919,33702:920,33703:921,33704:922,33705:923,33706:924,33707:925,33708:926,33709:927,33710:928,33711:929,33712:931,33713:932,33714:933,33715:934,33716:935,33717:936,33718:937,33727:945,33728:946,33729:947,33730:948,33731:949,33732:950,33733:951,33734:952,33735:953,33736:954,33737:955,33738:956,33739:957,33740:958,33741:959,33742:960,33743:961,33744:963,33745:964,33746:965,33747:966,33748:967,33749:968,33750:969,33856:1040,33857:1041,33858:1042,33859:1043,33860:1044,33861:1045,33862:1025,33863:1046,33864:1047,33865:1048,33866:1049,33867:1050,33868:1051,33869:1052,33870:1053,33871:1054,33872:1055,33873:1056,33874:1057,33875:1058,33876:1059,33877:1060,33878:1061,33879:1062,33880:1063,33881:1064,33882:1065,33883:1066,33884:1067,33885:1068,33886:1069,33887:1070,33888:1071,33904:1072,33905:1073,33906:1074,33907:1075,33908:1076,33909:1077,33910:1105,33911:1078,33912:1079,33913:1080,33914:1081,33915:1082,33916:1083,33917:1084,33918:1085,33920:1086,33921:1087,33922:1088,33923:1089,33924:1090,33925:1091,33926:1092,33927:1093,33928:1094,33929:1095,33930:1096,33931:1097,33932:1098,33933:1099,33934:1100,33935:1101,33936:1102,33937:1103,33951:9472,33952:9474,33953:9484,33954:9488,33955:9496,33956:9492,33957:9500,33958:9516,33959:9508,33960:9524,33961:9532,33962:9473,33963:9475,33964:9487,33965:9491,33966:9499,33967:9495,33968:9507,33969:9523,33970:9515,33971:9531,33972:9547,33973:9504,33974:9519,33975:9512,33976:9527,33977:9535,33978:9501,33979:9520,33980:9509,33981:9528,33982:9538,34975:20124,34976:21782,34977:23043,34978:38463,34979:21696,34980:24859,34981:25384,34982:23030,34983:36898,34984:33909,34985:33564,34986:31312,34987:24746,34988:25569,34989:28197,34990:26093,34991:33894,34992:33446,34993:39925,34994:26771,34995:22311,34996:26017,34997:25201,34998:23451,34999:22992,35e3:34427,35001:39156,35002:32098,35003:32190,35004:39822,35005:25110,35006:31903,35007:34999,35008:23433,35009:24245,35010:25353,35011:26263,35012:26696,35013:38343,35014:38797,35015:26447,35016:20197,35017:20234,35018:20301,35019:20381,35020:20553,35021:22258,35022:22839,35023:22996,35024:23041,35025:23561,35026:24799,35027:24847,35028:24944,35029:26131,35030:26885,35031:28858,35032:30031,35033:30064,35034:31227,35035:32173,35036:32239,35037:32963,35038:33806,35039:34915,35040:35586,35041:36949,35042:36986,35043:21307,35044:20117,35045:20133,35046:22495,35047:32946,35048:37057,35049:30959,35050:19968,35051:22769,35052:28322,35053:36920,35054:31282,35055:33576,35056:33419,35057:39983,35058:20801,35059:21360,35060:21693,35061:21729,35062:22240,35063:23035,35064:24341,35065:39154,35066:28139,35067:32996,35068:34093,35136:38498,35137:38512,35138:38560,35139:38907,35140:21515,35141:21491,35142:23431,35143:28879,35144:32701,35145:36802,35146:38632,35147:21359,35148:40284,35149:31418,35150:19985,35151:30867,35152:33276,35153:28198,35154:22040,35155:21764,35156:27421,35157:34074,35158:39995,35159:23013,35160:21417,35161:28006,35162:29916,35163:38287,35164:22082,35165:20113,35166:36939,35167:38642,35168:33615,35169:39180,35170:21473,35171:21942,35172:23344,35173:24433,35174:26144,35175:26355,35176:26628,35177:27704,35178:27891,35179:27945,35180:29787,35181:30408,35182:31310,35183:38964,35184:33521,35185:34907,35186:35424,35187:37613,35188:28082,35189:30123,35190:30410,35191:39365,35192:24742,35193:35585,35194:36234,35195:38322,35196:27022,35197:21421,35198:20870,35200:22290,35201:22576,35202:22852,35203:23476,35204:24310,35205:24616,35206:25513,35207:25588,35208:27839,35209:28436,35210:28814,35211:28948,35212:29017,35213:29141,35214:29503,35215:32257,35216:33398,35217:33489,35218:34199,35219:36960,35220:37467,35221:40219,35222:22633,35223:26044,35224:27738,35225:29989,35226:20985,35227:22830,35228:22885,35229:24448,35230:24540,35231:25276,35232:26106,35233:27178,35234:27431,35235:27572,35236:29579,35237:32705,35238:35158,35239:40236,35240:40206,35241:40644,35242:23713,35243:27798,35244:33659,35245:20740,35246:23627,35247:25014,35248:33222,35249:26742,35250:29281,35251:20057,35252:20474,35253:21368,35254:24681,35255:28201,35256:31311,35257:38899,35258:19979,35259:21270,35260:20206,35261:20309,35262:20285,35263:20385,35264:20339,35265:21152,35266:21487,35267:22025,35268:22799,35269:23233,35270:23478,35271:23521,35272:31185,35273:26247,35274:26524,35275:26550,35276:27468,35277:27827,35278:28779,35279:29634,35280:31117,35281:31166,35282:31292,35283:31623,35284:33457,35285:33499,35286:33540,35287:33655,35288:33775,35289:33747,35290:34662,35291:35506,35292:22057,35293:36008,35294:36838,35295:36942,35296:38686,35297:34442,35298:20420,35299:23784,35300:25105,35301:29273,35302:30011,35303:33253,35304:33469,35305:34558,35306:36032,35307:38597,35308:39187,35309:39381,35310:20171,35311:20250,35312:35299,35313:22238,35314:22602,35315:22730,35316:24315,35317:24555,35318:24618,35319:24724,35320:24674,35321:25040,35322:25106,35323:25296,35324:25913,35392:39745,35393:26214,35394:26800,35395:28023,35396:28784,35397:30028,35398:30342,35399:32117,35400:33445,35401:34809,35402:38283,35403:38542,35404:35997,35405:20977,35406:21182,35407:22806,35408:21683,35409:23475,35410:23830,35411:24936,35412:27010,35413:28079,35414:30861,35415:33995,35416:34903,35417:35442,35418:37799,35419:39608,35420:28012,35421:39336,35422:34521,35423:22435,35424:26623,35425:34510,35426:37390,35427:21123,35428:22151,35429:21508,35430:24275,35431:25313,35432:25785,35433:26684,35434:26680,35435:27579,35436:29554,35437:30906,35438:31339,35439:35226,35440:35282,35441:36203,35442:36611,35443:37101,35444:38307,35445:38548,35446:38761,35447:23398,35448:23731,35449:27005,35450:38989,35451:38990,35452:25499,35453:31520,35454:27179,35456:27263,35457:26806,35458:39949,35459:28511,35460:21106,35461:21917,35462:24688,35463:25324,35464:27963,35465:28167,35466:28369,35467:33883,35468:35088,35469:36676,35470:19988,35471:39993,35472:21494,35473:26907,35474:27194,35475:38788,35476:26666,35477:20828,35478:31427,35479:33970,35480:37340,35481:37772,35482:22107,35483:40232,35484:26658,35485:33541,35486:33841,35487:31909,35488:21e3,35489:33477,35490:29926,35491:20094,35492:20355,35493:20896,35494:23506,35495:21002,35496:21208,35497:21223,35498:24059,35499:21914,35500:22570,35501:23014,35502:23436,35503:23448,35504:23515,35505:24178,35506:24185,35507:24739,35508:24863,35509:24931,35510:25022,35511:25563,35512:25954,35513:26577,35514:26707,35515:26874,35516:27454,35517:27475,35518:27735,35519:28450,35520:28567,35521:28485,35522:29872,35523:29976,35524:30435,35525:30475,35526:31487,35527:31649,35528:31777,35529:32233,35530:32566,35531:32752,35532:32925,35533:33382,35534:33694,35535:35251,35536:35532,35537:36011,35538:36996,35539:37969,35540:38291,35541:38289,35542:38306,35543:38501,35544:38867,35545:39208,35546:33304,35547:20024,35548:21547,35549:23736,35550:24012,35551:29609,35552:30284,35553:30524,35554:23721,35555:32747,35556:36107,35557:38593,35558:38929,35559:38996,35560:39e3,35561:20225,35562:20238,35563:21361,35564:21916,35565:22120,35566:22522,35567:22855,35568:23305,35569:23492,35570:23696,35571:24076,35572:24190,35573:24524,35574:25582,35575:26426,35576:26071,35577:26082,35578:26399,35579:26827,35580:26820,35648:27231,35649:24112,35650:27589,35651:27671,35652:27773,35653:30079,35654:31048,35655:23395,35656:31232,35657:32e3,35658:24509,35659:35215,35660:35352,35661:36020,35662:36215,35663:36556,35664:36637,35665:39138,35666:39438,35667:39740,35668:20096,35669:20605,35670:20736,35671:22931,35672:23452,35673:25135,35674:25216,35675:25836,35676:27450,35677:29344,35678:30097,35679:31047,35680:32681,35681:34811,35682:35516,35683:35696,35684:25516,35685:33738,35686:38816,35687:21513,35688:21507,35689:21931,35690:26708,35691:27224,35692:35440,35693:30759,35694:26485,35695:40653,35696:21364,35697:23458,35698:33050,35699:34384,35700:36870,35701:19992,35702:20037,35703:20167,35704:20241,35705:21450,35706:21560,35707:23470,35708:24339,35709:24613,35710:25937,35712:26429,35713:27714,35714:27762,35715:27875,35716:28792,35717:29699,35718:31350,35719:31406,35720:31496,35721:32026,35722:31998,35723:32102,35724:26087,35725:29275,35726:21435,35727:23621,35728:24040,35729:25298,35730:25312,35731:25369,35732:28192,35733:34394,35734:35377,35735:36317,35736:37624,35737:28417,35738:31142,35739:39770,35740:20136,35741:20139,35742:20140,35743:20379,35744:20384,35745:20689,35746:20807,35747:31478,35748:20849,35749:20982,35750:21332,35751:21281,35752:21375,35753:21483,35754:21932,35755:22659,35756:23777,35757:24375,35758:24394,35759:24623,35760:24656,35761:24685,35762:25375,35763:25945,35764:27211,35765:27841,35766:29378,35767:29421,35768:30703,35769:33016,35770:33029,35771:33288,35772:34126,35773:37111,35774:37857,35775:38911,35776:39255,35777:39514,35778:20208,35779:20957,35780:23597,35781:26241,35782:26989,35783:23616,35784:26354,35785:26997,35786:29577,35787:26704,35788:31873,35789:20677,35790:21220,35791:22343,35792:24062,35793:37670,35794:26020,35795:27427,35796:27453,35797:29748,35798:31105,35799:31165,35800:31563,35801:32202,35802:33465,35803:33740,35804:34943,35805:35167,35806:35641,35807:36817,35808:37329,35809:21535,35810:37504,35811:20061,35812:20534,35813:21477,35814:21306,35815:29399,35816:29590,35817:30697,35818:33510,35819:36527,35820:39366,35821:39368,35822:39378,35823:20855,35824:24858,35825:34398,35826:21936,35827:31354,35828:20598,35829:23507,35830:36935,35831:38533,35832:20018,35833:27355,35834:37351,35835:23633,35836:23624,35904:25496,35905:31391,35906:27795,35907:38772,35908:36705,35909:31402,35910:29066,35911:38536,35912:31874,35913:26647,35914:32368,35915:26705,35916:37740,35917:21234,35918:21531,35919:34219,35920:35347,35921:32676,35922:36557,35923:37089,35924:21350,35925:34952,35926:31041,35927:20418,35928:20670,35929:21009,35930:20804,35931:21843,35932:22317,35933:29674,35934:22411,35935:22865,35936:24418,35937:24452,35938:24693,35939:24950,35940:24935,35941:25001,35942:25522,35943:25658,35944:25964,35945:26223,35946:26690,35947:28179,35948:30054,35949:31293,35950:31995,35951:32076,35952:32153,35953:32331,35954:32619,35955:33550,35956:33610,35957:34509,35958:35336,35959:35427,35960:35686,35961:36605,35962:38938,35963:40335,35964:33464,35965:36814,35966:39912,35968:21127,35969:25119,35970:25731,35971:28608,35972:38553,35973:26689,35974:20625,35975:27424,35976:27770,35977:28500,35978:31348,35979:32080,35980:34880,35981:35363,35982:26376,35983:20214,35984:20537,35985:20518,35986:20581,35987:20860,35988:21048,35989:21091,35990:21927,35991:22287,35992:22533,35993:23244,35994:24314,35995:25010,35996:25080,35997:25331,35998:25458,35999:26908,36e3:27177,36001:29309,36002:29356,36003:29486,36004:30740,36005:30831,36006:32121,36007:30476,36008:32937,36009:35211,36010:35609,36011:36066,36012:36562,36013:36963,36014:37749,36015:38522,36016:38997,36017:39443,36018:40568,36019:20803,36020:21407,36021:21427,36022:24187,36023:24358,36024:28187,36025:28304,36026:29572,36027:29694,36028:32067,36029:33335,36030:35328,36031:35578,36032:38480,36033:20046,36034:20491,36035:21476,36036:21628,36037:22266,36038:22993,36039:23396,36040:24049,36041:24235,36042:24359,36043:25144,36044:25925,36045:26543,36046:28246,36047:29392,36048:31946,36049:34996,36050:32929,36051:32993,36052:33776,36053:34382,36054:35463,36055:36328,36056:37431,36057:38599,36058:39015,36059:40723,36060:20116,36061:20114,36062:20237,36063:21320,36064:21577,36065:21566,36066:23087,36067:24460,36068:24481,36069:24735,36070:26791,36071:27278,36072:29786,36073:30849,36074:35486,36075:35492,36076:35703,36077:37264,36078:20062,36079:39881,36080:20132,36081:20348,36082:20399,36083:20505,36084:20502,36085:20809,36086:20844,36087:21151,36088:21177,36089:21246,36090:21402,36091:21475,36092:21521,36160:21518,36161:21897,36162:22353,36163:22434,36164:22909,36165:23380,36166:23389,36167:23439,36168:24037,36169:24039,36170:24055,36171:24184,36172:24195,36173:24218,36174:24247,36175:24344,36176:24658,36177:24908,36178:25239,36179:25304,36180:25511,36181:25915,36182:26114,36183:26179,36184:26356,36185:26477,36186:26657,36187:26775,36188:27083,36189:27743,36190:27946,36191:28009,36192:28207,36193:28317,36194:30002,36195:30343,36196:30828,36197:31295,36198:31968,36199:32005,36200:32024,36201:32094,36202:32177,36203:32789,36204:32771,36205:32943,36206:32945,36207:33108,36208:33167,36209:33322,36210:33618,36211:34892,36212:34913,36213:35611,36214:36002,36215:36092,36216:37066,36217:37237,36218:37489,36219:30783,36220:37628,36221:38308,36222:38477,36224:38917,36225:39321,36226:39640,36227:40251,36228:21083,36229:21163,36230:21495,36231:21512,36232:22741,36233:25335,36234:28640,36235:35946,36236:36703,36237:40633,36238:20811,36239:21051,36240:21578,36241:22269,36242:31296,36243:37239,36244:40288,36245:40658,36246:29508,36247:28425,36248:33136,36249:29969,36250:24573,36251:24794,36252:39592,36253:29403,36254:36796,36255:27492,36256:38915,36257:20170,36258:22256,36259:22372,36260:22718,36261:23130,36262:24680,36263:25031,36264:26127,36265:26118,36266:26681,36267:26801,36268:28151,36269:30165,36270:32058,36271:33390,36272:39746,36273:20123,36274:20304,36275:21449,36276:21766,36277:23919,36278:24038,36279:24046,36280:26619,36281:27801,36282:29811,36283:30722,36284:35408,36285:37782,36286:35039,36287:22352,36288:24231,36289:25387,36290:20661,36291:20652,36292:20877,36293:26368,36294:21705,36295:22622,36296:22971,36297:23472,36298:24425,36299:25165,36300:25505,36301:26685,36302:27507,36303:28168,36304:28797,36305:37319,36306:29312,36307:30741,36308:30758,36309:31085,36310:25998,36311:32048,36312:33756,36313:35009,36314:36617,36315:38555,36316:21092,36317:22312,36318:26448,36319:32618,36320:36001,36321:20916,36322:22338,36323:38442,36324:22586,36325:27018,36326:32948,36327:21682,36328:23822,36329:22524,36330:30869,36331:40442,36332:20316,36333:21066,36334:21643,36335:25662,36336:26152,36337:26388,36338:26613,36339:31364,36340:31574,36341:32034,36342:37679,36343:26716,36344:39853,36345:31545,36346:21273,36347:20874,36348:21047,36416:23519,36417:25334,36418:25774,36419:25830,36420:26413,36421:27578,36422:34217,36423:38609,36424:30352,36425:39894,36426:25420,36427:37638,36428:39851,36429:30399,36430:26194,36431:19977,36432:20632,36433:21442,36434:23665,36435:24808,36436:25746,36437:25955,36438:26719,36439:29158,36440:29642,36441:29987,36442:31639,36443:32386,36444:34453,36445:35715,36446:36059,36447:37240,36448:39184,36449:26028,36450:26283,36451:27531,36452:20181,36453:20180,36454:20282,36455:20351,36456:21050,36457:21496,36458:21490,36459:21987,36460:22235,36461:22763,36462:22987,36463:22985,36464:23039,36465:23376,36466:23629,36467:24066,36468:24107,36469:24535,36470:24605,36471:25351,36472:25903,36473:23388,36474:26031,36475:26045,36476:26088,36477:26525,36478:27490,36480:27515,36481:27663,36482:29509,36483:31049,36484:31169,36485:31992,36486:32025,36487:32043,36488:32930,36489:33026,36490:33267,36491:35222,36492:35422,36493:35433,36494:35430,36495:35468,36496:35566,36497:36039,36498:36060,36499:38604,36500:39164,36501:27503,36502:20107,36503:20284,36504:20365,36505:20816,36506:23383,36507:23546,36508:24904,36509:25345,36510:26178,36511:27425,36512:28363,36513:27835,36514:29246,36515:29885,36516:30164,36517:30913,36518:31034,36519:32780,36520:32819,36521:33258,36522:33940,36523:36766,36524:27728,36525:40575,36526:24335,36527:35672,36528:40235,36529:31482,36530:36600,36531:23437,36532:38635,36533:19971,36534:21489,36535:22519,36536:22833,36537:23241,36538:23460,36539:24713,36540:28287,36541:28422,36542:30142,36543:36074,36544:23455,36545:34048,36546:31712,36547:20594,36548:26612,36549:33437,36550:23649,36551:34122,36552:32286,36553:33294,36554:20889,36555:23556,36556:25448,36557:36198,36558:26012,36559:29038,36560:31038,36561:32023,36562:32773,36563:35613,36564:36554,36565:36974,36566:34503,36567:37034,36568:20511,36569:21242,36570:23610,36571:26451,36572:28796,36573:29237,36574:37196,36575:37320,36576:37675,36577:33509,36578:23490,36579:24369,36580:24825,36581:20027,36582:21462,36583:23432,36584:25163,36585:26417,36586:27530,36587:29417,36588:29664,36589:31278,36590:33131,36591:36259,36592:37202,36593:39318,36594:20754,36595:21463,36596:21610,36597:23551,36598:25480,36599:27193,36600:32172,36601:38656,36602:22234,36603:21454,36604:21608,36672:23447,36673:23601,36674:24030,36675:20462,36676:24833,36677:25342,36678:27954,36679:31168,36680:31179,36681:32066,36682:32333,36683:32722,36684:33261,36685:33311,36686:33936,36687:34886,36688:35186,36689:35728,36690:36468,36691:36655,36692:36913,36693:37195,36694:37228,36695:38598,36696:37276,36697:20160,36698:20303,36699:20805,36700:21313,36701:24467,36702:25102,36703:26580,36704:27713,36705:28171,36706:29539,36707:32294,36708:37325,36709:37507,36710:21460,36711:22809,36712:23487,36713:28113,36714:31069,36715:32302,36716:31899,36717:22654,36718:29087,36719:20986,36720:34899,36721:36848,36722:20426,36723:23803,36724:26149,36725:30636,36726:31459,36727:33308,36728:39423,36729:20934,36730:24490,36731:26092,36732:26991,36733:27529,36734:28147,36736:28310,36737:28516,36738:30462,36739:32020,36740:24033,36741:36981,36742:37255,36743:38918,36744:20966,36745:21021,36746:25152,36747:26257,36748:26329,36749:28186,36750:24246,36751:32210,36752:32626,36753:26360,36754:34223,36755:34295,36756:35576,36757:21161,36758:21465,36759:22899,36760:24207,36761:24464,36762:24661,36763:37604,36764:38500,36765:20663,36766:20767,36767:21213,36768:21280,36769:21319,36770:21484,36771:21736,36772:21830,36773:21809,36774:22039,36775:22888,36776:22974,36777:23100,36778:23477,36779:23558,36780:23567,36781:23569,36782:23578,36783:24196,36784:24202,36785:24288,36786:24432,36787:25215,36788:25220,36789:25307,36790:25484,36791:25463,36792:26119,36793:26124,36794:26157,36795:26230,36796:26494,36797:26786,36798:27167,36799:27189,36800:27836,36801:28040,36802:28169,36803:28248,36804:28988,36805:28966,36806:29031,36807:30151,36808:30465,36809:30813,36810:30977,36811:31077,36812:31216,36813:31456,36814:31505,36815:31911,36816:32057,36817:32918,36818:33750,36819:33931,36820:34121,36821:34909,36822:35059,36823:35359,36824:35388,36825:35412,36826:35443,36827:35937,36828:36062,36829:37284,36830:37478,36831:37758,36832:37912,36833:38556,36834:38808,36835:19978,36836:19976,36837:19998,36838:20055,36839:20887,36840:21104,36841:22478,36842:22580,36843:22732,36844:23330,36845:24120,36846:24773,36847:25854,36848:26465,36849:26454,36850:27972,36851:29366,36852:30067,36853:31331,36854:33976,36855:35698,36856:37304,36857:37664,36858:22065,36859:22516,36860:39166,36928:25325,36929:26893,36930:27542,36931:29165,36932:32340,36933:32887,36934:33394,36935:35302,36936:39135,36937:34645,36938:36785,36939:23611,36940:20280,36941:20449,36942:20405,36943:21767,36944:23072,36945:23517,36946:23529,36947:24515,36948:24910,36949:25391,36950:26032,36951:26187,36952:26862,36953:27035,36954:28024,36955:28145,36956:30003,36957:30137,36958:30495,36959:31070,36960:31206,36961:32051,36962:33251,36963:33455,36964:34218,36965:35242,36966:35386,36967:36523,36968:36763,36969:36914,36970:37341,36971:38663,36972:20154,36973:20161,36974:20995,36975:22645,36976:22764,36977:23563,36978:29978,36979:23613,36980:33102,36981:35338,36982:36805,36983:38499,36984:38765,36985:31525,36986:35535,36987:38920,36988:37218,36989:22259,36990:21416,36992:36887,36993:21561,36994:22402,36995:24101,36996:25512,36997:27700,36998:28810,36999:30561,37e3:31883,37001:32736,37002:34928,37003:36930,37004:37204,37005:37648,37006:37656,37007:38543,37008:29790,37009:39620,37010:23815,37011:23913,37012:25968,37013:26530,37014:36264,37015:38619,37016:25454,37017:26441,37018:26905,37019:33733,37020:38935,37021:38592,37022:35070,37023:28548,37024:25722,37025:23544,37026:19990,37027:28716,37028:30045,37029:26159,37030:20932,37031:21046,37032:21218,37033:22995,37034:24449,37035:24615,37036:25104,37037:25919,37038:25972,37039:26143,37040:26228,37041:26866,37042:26646,37043:27491,37044:28165,37045:29298,37046:29983,37047:30427,37048:31934,37049:32854,37050:22768,37051:35069,37052:35199,37053:35488,37054:35475,37055:35531,37056:36893,37057:37266,37058:38738,37059:38745,37060:25993,37061:31246,37062:33030,37063:38587,37064:24109,37065:24796,37066:25114,37067:26021,37068:26132,37069:26512,37070:30707,37071:31309,37072:31821,37073:32318,37074:33034,37075:36012,37076:36196,37077:36321,37078:36447,37079:30889,37080:20999,37081:25305,37082:25509,37083:25666,37084:25240,37085:35373,37086:31363,37087:31680,37088:35500,37089:38634,37090:32118,37091:33292,37092:34633,37093:20185,37094:20808,37095:21315,37096:21344,37097:23459,37098:23554,37099:23574,37100:24029,37101:25126,37102:25159,37103:25776,37104:26643,37105:26676,37106:27849,37107:27973,37108:27927,37109:26579,37110:28508,37111:29006,37112:29053,37113:26059,37114:31359,37115:31661,37116:32218,37184:32330,37185:32680,37186:33146,37187:33307,37188:33337,37189:34214,37190:35438,37191:36046,37192:36341,37193:36984,37194:36983,37195:37549,37196:37521,37197:38275,37198:39854,37199:21069,37200:21892,37201:28472,37202:28982,37203:20840,37204:31109,37205:32341,37206:33203,37207:31950,37208:22092,37209:22609,37210:23720,37211:25514,37212:26366,37213:26365,37214:26970,37215:29401,37216:30095,37217:30094,37218:30990,37219:31062,37220:31199,37221:31895,37222:32032,37223:32068,37224:34311,37225:35380,37226:38459,37227:36961,37228:40736,37229:20711,37230:21109,37231:21452,37232:21474,37233:20489,37234:21930,37235:22766,37236:22863,37237:29245,37238:23435,37239:23652,37240:21277,37241:24803,37242:24819,37243:25436,37244:25475,37245:25407,37246:25531,37248:25805,37249:26089,37250:26361,37251:24035,37252:27085,37253:27133,37254:28437,37255:29157,37256:20105,37257:30185,37258:30456,37259:31379,37260:31967,37261:32207,37262:32156,37263:32865,37264:33609,37265:33624,37266:33900,37267:33980,37268:34299,37269:35013,37270:36208,37271:36865,37272:36973,37273:37783,37274:38684,37275:39442,37276:20687,37277:22679,37278:24974,37279:33235,37280:34101,37281:36104,37282:36896,37283:20419,37284:20596,37285:21063,37286:21363,37287:24687,37288:25417,37289:26463,37290:28204,37291:36275,37292:36895,37293:20439,37294:23646,37295:36042,37296:26063,37297:32154,37298:21330,37299:34966,37300:20854,37301:25539,37302:23384,37303:23403,37304:23562,37305:25613,37306:26449,37307:36956,37308:20182,37309:22810,37310:22826,37311:27760,37312:35409,37313:21822,37314:22549,37315:22949,37316:24816,37317:25171,37318:26561,37319:33333,37320:26965,37321:38464,37322:39364,37323:39464,37324:20307,37325:22534,37326:23550,37327:32784,37328:23729,37329:24111,37330:24453,37331:24608,37332:24907,37333:25140,37334:26367,37335:27888,37336:28382,37337:32974,37338:33151,37339:33492,37340:34955,37341:36024,37342:36864,37343:36910,37344:38538,37345:40667,37346:39899,37347:20195,37348:21488,37349:22823,37350:31532,37351:37261,37352:38988,37353:40441,37354:28381,37355:28711,37356:21331,37357:21828,37358:23429,37359:25176,37360:25246,37361:25299,37362:27810,37363:28655,37364:29730,37365:35351,37366:37944,37367:28609,37368:35582,37369:33592,37370:20967,37371:34552,37372:21482,37440:21481,37441:20294,37442:36948,37443:36784,37444:22890,37445:33073,37446:24061,37447:31466,37448:36799,37449:26842,37450:35895,37451:29432,37452:40008,37453:27197,37454:35504,37455:20025,37456:21336,37457:22022,37458:22374,37459:25285,37460:25506,37461:26086,37462:27470,37463:28129,37464:28251,37465:28845,37466:30701,37467:31471,37468:31658,37469:32187,37470:32829,37471:32966,37472:34507,37473:35477,37474:37723,37475:22243,37476:22727,37477:24382,37478:26029,37479:26262,37480:27264,37481:27573,37482:30007,37483:35527,37484:20516,37485:30693,37486:22320,37487:24347,37488:24677,37489:26234,37490:27744,37491:30196,37492:31258,37493:32622,37494:33268,37495:34584,37496:36933,37497:39347,37498:31689,37499:30044,37500:31481,37501:31569,37502:33988,37504:36880,37505:31209,37506:31378,37507:33590,37508:23265,37509:30528,37510:20013,37511:20210,37512:23449,37513:24544,37514:25277,37515:26172,37516:26609,37517:27880,37518:34411,37519:34935,37520:35387,37521:37198,37522:37619,37523:39376,37524:27159,37525:28710,37526:29482,37527:33511,37528:33879,37529:36015,37530:19969,37531:20806,37532:20939,37533:21899,37534:23541,37535:24086,37536:24115,37537:24193,37538:24340,37539:24373,37540:24427,37541:24500,37542:25074,37543:25361,37544:26274,37545:26397,37546:28526,37547:29266,37548:30010,37549:30522,37550:32884,37551:33081,37552:33144,37553:34678,37554:35519,37555:35548,37556:36229,37557:36339,37558:37530,37559:38263,37560:38914,37561:40165,37562:21189,37563:25431,37564:30452,37565:26389,37566:27784,37567:29645,37568:36035,37569:37806,37570:38515,37571:27941,37572:22684,37573:26894,37574:27084,37575:36861,37576:37786,37577:30171,37578:36890,37579:22618,37580:26626,37581:25524,37582:27131,37583:20291,37584:28460,37585:26584,37586:36795,37587:34086,37588:32180,37589:37716,37590:26943,37591:28528,37592:22378,37593:22775,37594:23340,37595:32044,37596:29226,37597:21514,37598:37347,37599:40372,37600:20141,37601:20302,37602:20572,37603:20597,37604:21059,37605:35998,37606:21576,37607:22564,37608:23450,37609:24093,37610:24213,37611:24237,37612:24311,37613:24351,37614:24716,37615:25269,37616:25402,37617:25552,37618:26799,37619:27712,37620:30855,37621:31118,37622:31243,37623:32224,37624:33351,37625:35330,37626:35558,37627:36420,37628:36883,37696:37048,37697:37165,37698:37336,37699:40718,37700:27877,37701:25688,37702:25826,37703:25973,37704:28404,37705:30340,37706:31515,37707:36969,37708:37841,37709:28346,37710:21746,37711:24505,37712:25764,37713:36685,37714:36845,37715:37444,37716:20856,37717:22635,37718:22825,37719:23637,37720:24215,37721:28155,37722:32399,37723:29980,37724:36028,37725:36578,37726:39003,37727:28857,37728:20253,37729:27583,37730:28593,37731:3e4,37732:38651,37733:20814,37734:21520,37735:22581,37736:22615,37737:22956,37738:23648,37739:24466,37740:26007,37741:26460,37742:28193,37743:30331,37744:33759,37745:36077,37746:36884,37747:37117,37748:37709,37749:30757,37750:30778,37751:21162,37752:24230,37753:22303,37754:22900,37755:24594,37756:20498,37757:20826,37758:20908,37760:20941,37761:20992,37762:21776,37763:22612,37764:22616,37765:22871,37766:23445,37767:23798,37768:23947,37769:24764,37770:25237,37771:25645,37772:26481,37773:26691,37774:26812,37775:26847,37776:30423,37777:28120,37778:28271,37779:28059,37780:28783,37781:29128,37782:24403,37783:30168,37784:31095,37785:31561,37786:31572,37787:31570,37788:31958,37789:32113,37790:21040,37791:33891,37792:34153,37793:34276,37794:35342,37795:35588,37796:35910,37797:36367,37798:36867,37799:36879,37800:37913,37801:38518,37802:38957,37803:39472,37804:38360,37805:20685,37806:21205,37807:21516,37808:22530,37809:23566,37810:24999,37811:25758,37812:27934,37813:30643,37814:31461,37815:33012,37816:33796,37817:36947,37818:37509,37819:23776,37820:40199,37821:21311,37822:24471,37823:24499,37824:28060,37825:29305,37826:30563,37827:31167,37828:31716,37829:27602,37830:29420,37831:35501,37832:26627,37833:27233,37834:20984,37835:31361,37836:26932,37837:23626,37838:40182,37839:33515,37840:23493,37841:37193,37842:28702,37843:22136,37844:23663,37845:24775,37846:25958,37847:27788,37848:35930,37849:36929,37850:38931,37851:21585,37852:26311,37853:37389,37854:22856,37855:37027,37856:20869,37857:20045,37858:20970,37859:34201,37860:35598,37861:28760,37862:25466,37863:37707,37864:26978,37865:39348,37866:32260,37867:30071,37868:21335,37869:26976,37870:36575,37871:38627,37872:27741,37873:20108,37874:23612,37875:24336,37876:36841,37877:21250,37878:36049,37879:32905,37880:34425,37881:24319,37882:26085,37883:20083,37884:20837,37952:22914,37953:23615,37954:38894,37955:20219,37956:22922,37957:24525,37958:35469,37959:28641,37960:31152,37961:31074,37962:23527,37963:33905,37964:29483,37965:29105,37966:24180,37967:24565,37968:25467,37969:25754,37970:29123,37971:31896,37972:20035,37973:24316,37974:20043,37975:22492,37976:22178,37977:24745,37978:28611,37979:32013,37980:33021,37981:33075,37982:33215,37983:36786,37984:35223,37985:34468,37986:24052,37987:25226,37988:25773,37989:35207,37990:26487,37991:27874,37992:27966,37993:29750,37994:30772,37995:23110,37996:32629,37997:33453,37998:39340,37999:20467,38e3:24259,38001:25309,38002:25490,38003:25943,38004:26479,38005:30403,38006:29260,38007:32972,38008:32954,38009:36649,38010:37197,38011:20493,38012:22521,38013:23186,38014:26757,38016:26995,38017:29028,38018:29437,38019:36023,38020:22770,38021:36064,38022:38506,38023:36889,38024:34687,38025:31204,38026:30695,38027:33833,38028:20271,38029:21093,38030:21338,38031:25293,38032:26575,38033:27850,38034:30333,38035:31636,38036:31893,38037:33334,38038:34180,38039:36843,38040:26333,38041:28448,38042:29190,38043:32283,38044:33707,38045:39361,38046:40614,38047:20989,38048:31665,38049:30834,38050:31672,38051:32903,38052:31560,38053:27368,38054:24161,38055:32908,38056:30033,38057:30048,38058:20843,38059:37474,38060:28300,38061:30330,38062:37271,38063:39658,38064:20240,38065:32624,38066:25244,38067:31567,38068:38309,38069:40169,38070:22138,38071:22617,38072:34532,38073:38588,38074:20276,38075:21028,38076:21322,38077:21453,38078:21467,38079:24070,38080:25644,38081:26001,38082:26495,38083:27710,38084:27726,38085:29256,38086:29359,38087:29677,38088:30036,38089:32321,38090:33324,38091:34281,38092:36009,38093:31684,38094:37318,38095:29033,38096:38930,38097:39151,38098:25405,38099:26217,38100:30058,38101:30436,38102:30928,38103:34115,38104:34542,38105:21290,38106:21329,38107:21542,38108:22915,38109:24199,38110:24444,38111:24754,38112:25161,38113:25209,38114:25259,38115:26e3,38116:27604,38117:27852,38118:30130,38119:30382,38120:30865,38121:31192,38122:32203,38123:32631,38124:32933,38125:34987,38126:35513,38127:36027,38128:36991,38129:38750,38130:39131,38131:27147,38132:31800,38133:20633,38134:23614,38135:24494,38136:26503,38137:27608,38138:29749,38139:30473,38140:32654,38208:40763,38209:26570,38210:31255,38211:21305,38212:30091,38213:39661,38214:24422,38215:33181,38216:33777,38217:32920,38218:24380,38219:24517,38220:30050,38221:31558,38222:36924,38223:26727,38224:23019,38225:23195,38226:32016,38227:30334,38228:35628,38229:20469,38230:24426,38231:27161,38232:27703,38233:28418,38234:29922,38235:31080,38236:34920,38237:35413,38238:35961,38239:24287,38240:25551,38241:30149,38242:31186,38243:33495,38244:37672,38245:37618,38246:33948,38247:34541,38248:39981,38249:21697,38250:24428,38251:25996,38252:27996,38253:28693,38254:36007,38255:36051,38256:38971,38257:25935,38258:29942,38259:19981,38260:20184,38261:22496,38262:22827,38263:23142,38264:23500,38265:20904,38266:24067,38267:24220,38268:24598,38269:25206,38270:25975,38272:26023,38273:26222,38274:28014,38275:29238,38276:31526,38277:33104,38278:33178,38279:33433,38280:35676,38281:36e3,38282:36070,38283:36212,38284:38428,38285:38468,38286:20398,38287:25771,38288:27494,38289:33310,38290:33889,38291:34154,38292:37096,38293:23553,38294:26963,38295:39080,38296:33914,38297:34135,38298:20239,38299:21103,38300:24489,38301:24133,38302:26381,38303:31119,38304:33145,38305:35079,38306:35206,38307:28149,38308:24343,38309:25173,38310:27832,38311:20175,38312:29289,38313:39826,38314:20998,38315:21563,38316:22132,38317:22707,38318:24996,38319:25198,38320:28954,38321:22894,38322:31881,38323:31966,38324:32027,38325:38640,38326:25991,38327:32862,38328:19993,38329:20341,38330:20853,38331:22592,38332:24163,38333:24179,38334:24330,38335:26564,38336:20006,38337:34109,38338:38281,38339:38491,38340:31859,38341:38913,38342:20731,38343:22721,38344:30294,38345:30887,38346:21029,38347:30629,38348:34065,38349:31622,38350:20559,38351:22793,38352:29255,38353:31687,38354:32232,38355:36794,38356:36820,38357:36941,38358:20415,38359:21193,38360:23081,38361:24321,38362:38829,38363:20445,38364:33303,38365:37610,38366:22275,38367:25429,38368:27497,38369:29995,38370:35036,38371:36628,38372:31298,38373:21215,38374:22675,38375:24917,38376:25098,38377:26286,38378:27597,38379:31807,38380:33769,38381:20515,38382:20472,38383:21253,38384:21574,38385:22577,38386:22857,38387:23453,38388:23792,38389:23791,38390:23849,38391:24214,38392:25265,38393:25447,38394:25918,38395:26041,38396:26379,38464:27861,38465:27873,38466:28921,38467:30770,38468:32299,38469:32990,38470:33459,38471:33804,38472:34028,38473:34562,38474:35090,38475:35370,38476:35914,38477:37030,38478:37586,38479:39165,38480:40179,38481:40300,38482:20047,38483:20129,38484:20621,38485:21078,38486:22346,38487:22952,38488:24125,38489:24536,38490:24537,38491:25151,38492:26292,38493:26395,38494:26576,38495:26834,38496:20882,38497:32033,38498:32938,38499:33192,38500:35584,38501:35980,38502:36031,38503:37502,38504:38450,38505:21536,38506:38956,38507:21271,38508:20693,38509:21340,38510:22696,38511:25778,38512:26420,38513:29287,38514:30566,38515:31302,38516:37350,38517:21187,38518:27809,38519:27526,38520:22528,38521:24140,38522:22868,38523:26412,38524:32763,38525:20961,38526:30406,38528:25705,38529:30952,38530:39764,38531:40635,38532:22475,38533:22969,38534:26151,38535:26522,38536:27598,38537:21737,38538:27097,38539:24149,38540:33180,38541:26517,38542:39850,38543:26622,38544:40018,38545:26717,38546:20134,38547:20451,38548:21448,38549:25273,38550:26411,38551:27819,38552:36804,38553:20397,38554:32365,38555:40639,38556:19975,38557:24930,38558:28288,38559:28459,38560:34067,38561:21619,38562:26410,38563:39749,38564:24051,38565:31637,38566:23724,38567:23494,38568:34588,38569:28234,38570:34001,38571:31252,38572:33032,38573:22937,38574:31885,38575:27665,38576:30496,38577:21209,38578:22818,38579:28961,38580:29279,38581:30683,38582:38695,38583:40289,38584:26891,38585:23167,38586:23064,38587:20901,38588:21517,38589:21629,38590:26126,38591:30431,38592:36855,38593:37528,38594:40180,38595:23018,38596:29277,38597:28357,38598:20813,38599:26825,38600:32191,38601:32236,38602:38754,38603:40634,38604:25720,38605:27169,38606:33538,38607:22916,38608:23391,38609:27611,38610:29467,38611:30450,38612:32178,38613:32791,38614:33945,38615:20786,38616:26408,38617:40665,38618:30446,38619:26466,38620:21247,38621:39173,38622:23588,38623:25147,38624:31870,38625:36016,38626:21839,38627:24758,38628:32011,38629:38272,38630:21249,38631:20063,38632:20918,38633:22812,38634:29242,38635:32822,38636:37326,38637:24357,38638:30690,38639:21380,38640:24441,38641:32004,38642:34220,38643:35379,38644:36493,38645:38742,38646:26611,38647:34222,38648:37971,38649:24841,38650:24840,38651:27833,38652:30290,38720:35565,38721:36664,38722:21807,38723:20305,38724:20778,38725:21191,38726:21451,38727:23461,38728:24189,38729:24736,38730:24962,38731:25558,38732:26377,38733:26586,38734:28263,38735:28044,38736:29494,38737:29495,38738:30001,38739:31056,38740:35029,38741:35480,38742:36938,38743:37009,38744:37109,38745:38596,38746:34701,38747:22805,38748:20104,38749:20313,38750:19982,38751:35465,38752:36671,38753:38928,38754:20653,38755:24188,38756:22934,38757:23481,38758:24248,38759:25562,38760:25594,38761:25793,38762:26332,38763:26954,38764:27096,38765:27915,38766:28342,38767:29076,38768:29992,38769:31407,38770:32650,38771:32768,38772:33865,38773:33993,38774:35201,38775:35617,38776:36362,38777:36965,38778:38525,38779:39178,38780:24958,38781:25233,38782:27442,38784:27779,38785:28020,38786:32716,38787:32764,38788:28096,38789:32645,38790:34746,38791:35064,38792:26469,38793:33713,38794:38972,38795:38647,38796:27931,38797:32097,38798:33853,38799:37226,38800:20081,38801:21365,38802:23888,38803:27396,38804:28651,38805:34253,38806:34349,38807:35239,38808:21033,38809:21519,38810:23653,38811:26446,38812:26792,38813:29702,38814:29827,38815:30178,38816:35023,38817:35041,38818:37324,38819:38626,38820:38520,38821:24459,38822:29575,38823:31435,38824:33870,38825:25504,38826:30053,38827:21129,38828:27969,38829:28316,38830:29705,38831:30041,38832:30827,38833:31890,38834:38534,38835:31452,38836:40845,38837:20406,38838:24942,38839:26053,38840:34396,38841:20102,38842:20142,38843:20698,38844:20001,38845:20940,38846:23534,38847:26009,38848:26753,38849:28092,38850:29471,38851:30274,38852:30637,38853:31260,38854:31975,38855:33391,38856:35538,38857:36988,38858:37327,38859:38517,38860:38936,38861:21147,38862:32209,38863:20523,38864:21400,38865:26519,38866:28107,38867:29136,38868:29747,38869:33256,38870:36650,38871:38563,38872:40023,38873:40607,38874:29792,38875:22593,38876:28057,38877:32047,38878:39006,38879:20196,38880:20278,38881:20363,38882:20919,38883:21169,38884:23994,38885:24604,38886:29618,38887:31036,38888:33491,38889:37428,38890:38583,38891:38646,38892:38666,38893:40599,38894:40802,38895:26278,38896:27508,38897:21015,38898:21155,38899:28872,38900:35010,38901:24265,38902:24651,38903:24976,38904:28451,38905:29001,38906:31806,38907:32244,38908:32879,38976:34030,38977:36899,38978:37676,38979:21570,38980:39791,38981:27347,38982:28809,38983:36034,38984:36335,38985:38706,38986:21172,38987:23105,38988:24266,38989:24324,38990:26391,38991:27004,38992:27028,38993:28010,38994:28431,38995:29282,38996:29436,38997:31725,38998:32769,38999:32894,39e3:34635,39001:37070,39002:20845,39003:40595,39004:31108,39005:32907,39006:37682,39007:35542,39008:20525,39009:21644,39010:35441,39011:27498,39012:36036,39013:33031,39014:24785,39015:26528,39016:40434,39017:20121,39018:20120,39019:39952,39020:35435,39021:34241,39022:34152,39023:26880,39024:28286,39025:30871,39026:33109,39071:24332,39072:19984,39073:19989,39074:20010,39075:20017,39076:20022,39077:20028,39078:20031,39079:20034,39080:20054,39081:20056,39082:20098,39083:20101,39084:35947,39085:20106,39086:33298,39087:24333,39088:20110,39089:20126,39090:20127,39091:20128,39092:20130,39093:20144,39094:20147,39095:20150,39096:20174,39097:20173,39098:20164,39099:20166,39100:20162,39101:20183,39102:20190,39103:20205,39104:20191,39105:20215,39106:20233,39107:20314,39108:20272,39109:20315,39110:20317,39111:20311,39112:20295,39113:20342,39114:20360,39115:20367,39116:20376,39117:20347,39118:20329,39119:20336,39120:20369,39121:20335,39122:20358,39123:20374,39124:20760,39125:20436,39126:20447,39127:20430,39128:20440,39129:20443,39130:20433,39131:20442,39132:20432,39133:20452,39134:20453,39135:20506,39136:20520,39137:20500,39138:20522,39139:20517,39140:20485,39141:20252,39142:20470,39143:20513,39144:20521,39145:20524,39146:20478,39147:20463,39148:20497,39149:20486,39150:20547,39151:20551,39152:26371,39153:20565,39154:20560,39155:20552,39156:20570,39157:20566,39158:20588,39159:20600,39160:20608,39161:20634,39162:20613,39163:20660,39164:20658,39232:20681,39233:20682,39234:20659,39235:20674,39236:20694,39237:20702,39238:20709,39239:20717,39240:20707,39241:20718,39242:20729,39243:20725,39244:20745,39245:20737,39246:20738,39247:20758,39248:20757,39249:20756,39250:20762,39251:20769,39252:20794,39253:20791,39254:20796,39255:20795,39256:20799,39257:20800,39258:20818,39259:20812,39260:20820,39261:20834,39262:31480,39263:20841,39264:20842,39265:20846,39266:20864,39267:20866,39268:22232,39269:20876,39270:20873,39271:20879,39272:20881,39273:20883,39274:20885,39275:20886,39276:20900,39277:20902,39278:20898,39279:20905,39280:20906,39281:20907,39282:20915,39283:20913,39284:20914,39285:20912,39286:20917,39287:20925,39288:20933,39289:20937,39290:20955,39291:20960,39292:34389,39293:20969,39294:20973,39296:20976,39297:20981,39298:20990,39299:20996,39300:21003,39301:21012,39302:21006,39303:21031,39304:21034,39305:21038,39306:21043,39307:21049,39308:21071,39309:21060,39310:21067,39311:21068,39312:21086,39313:21076,39314:21098,39315:21108,39316:21097,39317:21107,39318:21119,39319:21117,39320:21133,39321:21140,39322:21138,39323:21105,39324:21128,39325:21137,39326:36776,39327:36775,39328:21164,39329:21165,39330:21180,39331:21173,39332:21185,39333:21197,39334:21207,39335:21214,39336:21219,39337:21222,39338:39149,39339:21216,39340:21235,39341:21237,39342:21240,39343:21241,39344:21254,39345:21256,39346:30008,39347:21261,39348:21264,39349:21263,39350:21269,39351:21274,39352:21283,39353:21295,39354:21297,39355:21299,39356:21304,39357:21312,39358:21318,39359:21317,39360:19991,39361:21321,39362:21325,39363:20950,39364:21342,39365:21353,39366:21358,39367:22808,39368:21371,39369:21367,39370:21378,39371:21398,39372:21408,39373:21414,39374:21413,39375:21422,39376:21424,39377:21430,39378:21443,39379:31762,39380:38617,39381:21471,39382:26364,39383:29166,39384:21486,39385:21480,39386:21485,39387:21498,39388:21505,39389:21565,39390:21568,39391:21548,39392:21549,39393:21564,39394:21550,39395:21558,39396:21545,39397:21533,39398:21582,39399:21647,39400:21621,39401:21646,39402:21599,39403:21617,39404:21623,39405:21616,39406:21650,39407:21627,39408:21632,39409:21622,39410:21636,39411:21648,39412:21638,39413:21703,39414:21666,39415:21688,39416:21669,39417:21676,39418:21700,39419:21704,39420:21672,39488:21675,39489:21698,39490:21668,39491:21694,39492:21692,39493:21720,39494:21733,39495:21734,39496:21775,39497:21780,39498:21757,39499:21742,39500:21741,39501:21754,39502:21730,39503:21817,39504:21824,39505:21859,39506:21836,39507:21806,39508:21852,39509:21829,39510:21846,39511:21847,39512:21816,39513:21811,39514:21853,39515:21913,39516:21888,39517:21679,39518:21898,39519:21919,39520:21883,39521:21886,39522:21912,39523:21918,39524:21934,39525:21884,39526:21891,39527:21929,39528:21895,39529:21928,39530:21978,39531:21957,39532:21983,39533:21956,39534:21980,39535:21988,39536:21972,39537:22036,39538:22007,39539:22038,39540:22014,39541:22013,39542:22043,39543:22009,39544:22094,39545:22096,39546:29151,39547:22068,39548:22070,39549:22066,39550:22072,39552:22123,39553:22116,39554:22063,39555:22124,39556:22122,39557:22150,39558:22144,39559:22154,39560:22176,39561:22164,39562:22159,39563:22181,39564:22190,39565:22198,39566:22196,39567:22210,39568:22204,39569:22209,39570:22211,39571:22208,39572:22216,39573:22222,39574:22225,39575:22227,39576:22231,39577:22254,39578:22265,39579:22272,39580:22271,39581:22276,39582:22281,39583:22280,39584:22283,39585:22285,39586:22291,39587:22296,39588:22294,39589:21959,39590:22300,39591:22310,39592:22327,39593:22328,39594:22350,39595:22331,39596:22336,39597:22351,39598:22377,39599:22464,39600:22408,39601:22369,39602:22399,39603:22409,39604:22419,39605:22432,39606:22451,39607:22436,39608:22442,39609:22448,39610:22467,39611:22470,39612:22484,39613:22482,39614:22483,39615:22538,39616:22486,39617:22499,39618:22539,39619:22553,39620:22557,39621:22642,39622:22561,39623:22626,39624:22603,39625:22640,39626:27584,39627:22610,39628:22589,39629:22649,39630:22661,39631:22713,39632:22687,39633:22699,39634:22714,39635:22750,39636:22715,39637:22712,39638:22702,39639:22725,39640:22739,39641:22737,39642:22743,39643:22745,39644:22744,39645:22757,39646:22748,39647:22756,39648:22751,39649:22767,39650:22778,39651:22777,39652:22779,39653:22780,39654:22781,39655:22786,39656:22794,39657:22800,39658:22811,39659:26790,39660:22821,39661:22828,39662:22829,39663:22834,39664:22840,39665:22846,39666:31442,39667:22869,39668:22864,39669:22862,39670:22874,39671:22872,39672:22882,39673:22880,39674:22887,39675:22892,39676:22889,39744:22904,39745:22913,39746:22941,39747:20318,39748:20395,39749:22947,39750:22962,39751:22982,39752:23016,39753:23004,39754:22925,39755:23001,39756:23002,39757:23077,39758:23071,39759:23057,39760:23068,39761:23049,39762:23066,39763:23104,39764:23148,39765:23113,39766:23093,39767:23094,39768:23138,39769:23146,39770:23194,39771:23228,39772:23230,39773:23243,39774:23234,39775:23229,39776:23267,39777:23255,39778:23270,39779:23273,39780:23254,39781:23290,39782:23291,39783:23308,39784:23307,39785:23318,39786:23346,39787:23248,39788:23338,39789:23350,39790:23358,39791:23363,39792:23365,39793:23360,39794:23377,39795:23381,39796:23386,39797:23387,39798:23397,39799:23401,39800:23408,39801:23411,39802:23413,39803:23416,39804:25992,39805:23418,39806:23424,39808:23427,39809:23462,39810:23480,39811:23491,39812:23495,39813:23497,39814:23508,39815:23504,39816:23524,39817:23526,39818:23522,39819:23518,39820:23525,39821:23531,39822:23536,39823:23542,39824:23539,39825:23557,39826:23559,39827:23560,39828:23565,39829:23571,39830:23584,39831:23586,39832:23592,39833:23608,39834:23609,39835:23617,39836:23622,39837:23630,39838:23635,39839:23632,39840:23631,39841:23409,39842:23660,39843:23662,39844:20066,39845:23670,39846:23673,39847:23692,39848:23697,39849:23700,39850:22939,39851:23723,39852:23739,39853:23734,39854:23740,39855:23735,39856:23749,39857:23742,39858:23751,39859:23769,39860:23785,39861:23805,39862:23802,39863:23789,39864:23948,39865:23786,39866:23819,39867:23829,39868:23831,39869:23900,39870:23839,39871:23835,39872:23825,39873:23828,39874:23842,39875:23834,39876:23833,39877:23832,39878:23884,39879:23890,39880:23886,39881:23883,39882:23916,39883:23923,39884:23926,39885:23943,39886:23940,39887:23938,39888:23970,39889:23965,39890:23980,39891:23982,39892:23997,39893:23952,39894:23991,39895:23996,39896:24009,39897:24013,39898:24019,39899:24018,39900:24022,39901:24027,39902:24043,39903:24050,39904:24053,39905:24075,39906:24090,39907:24089,39908:24081,39909:24091,39910:24118,39911:24119,39912:24132,39913:24131,39914:24128,39915:24142,39916:24151,39917:24148,39918:24159,39919:24162,39920:24164,39921:24135,39922:24181,39923:24182,39924:24186,39925:40636,39926:24191,39927:24224,39928:24257,39929:24258,39930:24264,39931:24272,39932:24271,4e4:24278,40001:24291,40002:24285,40003:24282,40004:24283,40005:24290,40006:24289,40007:24296,40008:24297,40009:24300,40010:24305,40011:24307,40012:24304,40013:24308,40014:24312,40015:24318,40016:24323,40017:24329,40018:24413,40019:24412,40020:24331,40021:24337,40022:24342,40023:24361,40024:24365,40025:24376,40026:24385,40027:24392,40028:24396,40029:24398,40030:24367,40031:24401,40032:24406,40033:24407,40034:24409,40035:24417,40036:24429,40037:24435,40038:24439,40039:24451,40040:24450,40041:24447,40042:24458,40043:24456,40044:24465,40045:24455,40046:24478,40047:24473,40048:24472,40049:24480,40050:24488,40051:24493,40052:24508,40053:24534,40054:24571,40055:24548,40056:24568,40057:24561,40058:24541,40059:24755,40060:24575,40061:24609,40062:24672,40064:24601,40065:24592,40066:24617,40067:24590,40068:24625,40069:24603,40070:24597,40071:24619,40072:24614,40073:24591,40074:24634,40075:24666,40076:24641,40077:24682,40078:24695,40079:24671,40080:24650,40081:24646,40082:24653,40083:24675,40084:24643,40085:24676,40086:24642,40087:24684,40088:24683,40089:24665,40090:24705,40091:24717,40092:24807,40093:24707,40094:24730,40095:24708,40096:24731,40097:24726,40098:24727,40099:24722,40100:24743,40101:24715,40102:24801,40103:24760,40104:24800,40105:24787,40106:24756,40107:24560,40108:24765,40109:24774,40110:24757,40111:24792,40112:24909,40113:24853,40114:24838,40115:24822,40116:24823,40117:24832,40118:24820,40119:24826,40120:24835,40121:24865,40122:24827,40123:24817,40124:24845,40125:24846,40126:24903,40127:24894,40128:24872,40129:24871,40130:24906,40131:24895,40132:24892,40133:24876,40134:24884,40135:24893,40136:24898,40137:24900,40138:24947,40139:24951,40140:24920,40141:24921,40142:24922,40143:24939,40144:24948,40145:24943,40146:24933,40147:24945,40148:24927,40149:24925,40150:24915,40151:24949,40152:24985,40153:24982,40154:24967,40155:25004,40156:24980,40157:24986,40158:24970,40159:24977,40160:25003,40161:25006,40162:25036,40163:25034,40164:25033,40165:25079,40166:25032,40167:25027,40168:25030,40169:25018,40170:25035,40171:32633,40172:25037,40173:25062,40174:25059,40175:25078,40176:25082,40177:25076,40178:25087,40179:25085,40180:25084,40181:25086,40182:25088,40183:25096,40184:25097,40185:25101,40186:25100,40187:25108,40188:25115,40256:25118,40257:25121,40258:25130,40259:25134,40260:25136,40261:25138,40262:25139,40263:25153,40264:25166,40265:25182,40266:25187,40267:25179,40268:25184,40269:25192,40270:25212,40271:25218,40272:25225,40273:25214,40274:25234,40275:25235,40276:25238,40277:25300,40278:25219,40279:25236,40280:25303,40281:25297,40282:25275,40283:25295,40284:25343,40285:25286,40286:25812,40287:25288,40288:25308,40289:25292,40290:25290,40291:25282,40292:25287,40293:25243,40294:25289,40295:25356,40296:25326,40297:25329,40298:25383,40299:25346,40300:25352,40301:25327,40302:25333,40303:25424,40304:25406,40305:25421,40306:25628,40307:25423,40308:25494,40309:25486,40310:25472,40311:25515,40312:25462,40313:25507,40314:25487,40315:25481,40316:25503,40317:25525,40318:25451,40320:25449,40321:25534,40322:25577,40323:25536,40324:25542,40325:25571,40326:25545,40327:25554,40328:25590,40329:25540,40330:25622,40331:25652,40332:25606,40333:25619,40334:25638,40335:25654,40336:25885,40337:25623,40338:25640,40339:25615,40340:25703,40341:25711,40342:25718,40343:25678,40344:25898,40345:25749,40346:25747,40347:25765,40348:25769,40349:25736,40350:25788,40351:25818,40352:25810,40353:25797,40354:25799,40355:25787,40356:25816,40357:25794,40358:25841,40359:25831,40360:33289,40361:25824,40362:25825,40363:25260,40364:25827,40365:25839,40366:25900,40367:25846,40368:25844,40369:25842,40370:25850,40371:25856,40372:25853,40373:25880,40374:25884,40375:25861,40376:25892,40377:25891,40378:25899,40379:25908,40380:25909,40381:25911,40382:25910,40383:25912,40384:30027,40385:25928,40386:25942,40387:25941,40388:25933,40389:25944,40390:25950,40391:25949,40392:25970,40393:25976,40394:25986,40395:25987,40396:35722,40397:26011,40398:26015,40399:26027,40400:26039,40401:26051,40402:26054,40403:26049,40404:26052,40405:26060,40406:26066,40407:26075,40408:26073,40409:26080,40410:26081,40411:26097,40412:26482,40413:26122,40414:26115,40415:26107,40416:26483,40417:26165,40418:26166,40419:26164,40420:26140,40421:26191,40422:26180,40423:26185,40424:26177,40425:26206,40426:26205,40427:26212,40428:26215,40429:26216,40430:26207,40431:26210,40432:26224,40433:26243,40434:26248,40435:26254,40436:26249,40437:26244,40438:26264,40439:26269,40440:26305,40441:26297,40442:26313,40443:26302,40444:26300,40512:26308,40513:26296,40514:26326,40515:26330,40516:26336,40517:26175,40518:26342,40519:26345,40520:26352,40521:26357,40522:26359,40523:26383,40524:26390,40525:26398,40526:26406,40527:26407,40528:38712,40529:26414,40530:26431,40531:26422,40532:26433,40533:26424,40534:26423,40535:26438,40536:26462,40537:26464,40538:26457,40539:26467,40540:26468,40541:26505,40542:26480,40543:26537,40544:26492,40545:26474,40546:26508,40547:26507,40548:26534,40549:26529,40550:26501,40551:26551,40552:26607,40553:26548,40554:26604,40555:26547,40556:26601,40557:26552,40558:26596,40559:26590,40560:26589,40561:26594,40562:26606,40563:26553,40564:26574,40565:26566,40566:26599,40567:27292,40568:26654,40569:26694,40570:26665,40571:26688,40572:26701,40573:26674,40574:26702,40576:26803,40577:26667,40578:26713,40579:26723,40580:26743,40581:26751,40582:26783,40583:26767,40584:26797,40585:26772,40586:26781,40587:26779,40588:26755,40589:27310,40590:26809,40591:26740,40592:26805,40593:26784,40594:26810,40595:26895,40596:26765,40597:26750,40598:26881,40599:26826,40600:26888,40601:26840,40602:26914,40603:26918,40604:26849,40605:26892,40606:26829,40607:26836,40608:26855,40609:26837,40610:26934,40611:26898,40612:26884,40613:26839,40614:26851,40615:26917,40616:26873,40617:26848,40618:26863,40619:26920,40620:26922,40621:26906,40622:26915,40623:26913,40624:26822,40625:27001,40626:26999,40627:26972,40628:27e3,40629:26987,40630:26964,40631:27006,40632:26990,40633:26937,40634:26996,40635:26941,40636:26969,40637:26928,40638:26977,40639:26974,40640:26973,40641:27009,40642:26986,40643:27058,40644:27054,40645:27088,40646:27071,40647:27073,40648:27091,40649:27070,40650:27086,40651:23528,40652:27082,40653:27101,40654:27067,40655:27075,40656:27047,40657:27182,40658:27025,40659:27040,40660:27036,40661:27029,40662:27060,40663:27102,40664:27112,40665:27138,40666:27163,40667:27135,40668:27402,40669:27129,40670:27122,40671:27111,40672:27141,40673:27057,40674:27166,40675:27117,40676:27156,40677:27115,40678:27146,40679:27154,40680:27329,40681:27171,40682:27155,40683:27204,40684:27148,40685:27250,40686:27190,40687:27256,40688:27207,40689:27234,40690:27225,40691:27238,40692:27208,40693:27192,40694:27170,40695:27280,40696:27277,40697:27296,40698:27268,40699:27298,40700:27299,40768:27287,40769:34327,40770:27323,40771:27331,40772:27330,40773:27320,40774:27315,40775:27308,40776:27358,40777:27345,40778:27359,40779:27306,40780:27354,40781:27370,40782:27387,40783:27397,40784:34326,40785:27386,40786:27410,40787:27414,40788:39729,40789:27423,40790:27448,40791:27447,40792:30428,40793:27449,40794:39150,40795:27463,40796:27459,40797:27465,40798:27472,40799:27481,40800:27476,40801:27483,40802:27487,40803:27489,40804:27512,40805:27513,40806:27519,40807:27520,40808:27524,40809:27523,40810:27533,40811:27544,40812:27541,40813:27550,40814:27556,40815:27562,40816:27563,40817:27567,40818:27570,40819:27569,40820:27571,40821:27575,40822:27580,40823:27590,40824:27595,40825:27603,40826:27615,40827:27628,40828:27627,40829:27635,40830:27631,40832:40638,40833:27656,40834:27667,40835:27668,40836:27675,40837:27684,40838:27683,40839:27742,40840:27733,40841:27746,40842:27754,40843:27778,40844:27789,40845:27802,40846:27777,40847:27803,40848:27774,40849:27752,40850:27763,40851:27794,40852:27792,40853:27844,40854:27889,40855:27859,40856:27837,40857:27863,40858:27845,40859:27869,40860:27822,40861:27825,40862:27838,40863:27834,40864:27867,40865:27887,40866:27865,40867:27882,40868:27935,40869:34893,40870:27958,40871:27947,40872:27965,40873:27960,40874:27929,40875:27957,40876:27955,40877:27922,40878:27916,40879:28003,40880:28051,40881:28004,40882:27994,40883:28025,40884:27993,40885:28046,40886:28053,40887:28644,40888:28037,40889:28153,40890:28181,40891:28170,40892:28085,40893:28103,40894:28134,40895:28088,40896:28102,40897:28140,40898:28126,40899:28108,40900:28136,40901:28114,40902:28101,40903:28154,40904:28121,40905:28132,40906:28117,40907:28138,40908:28142,40909:28205,40910:28270,40911:28206,40912:28185,40913:28274,40914:28255,40915:28222,40916:28195,40917:28267,40918:28203,40919:28278,40920:28237,40921:28191,40922:28227,40923:28218,40924:28238,40925:28196,40926:28415,40927:28189,40928:28216,40929:28290,40930:28330,40931:28312,40932:28361,40933:28343,40934:28371,40935:28349,40936:28335,40937:28356,40938:28338,40939:28372,40940:28373,40941:28303,40942:28325,40943:28354,40944:28319,40945:28481,40946:28433,40947:28748,40948:28396,40949:28408,40950:28414,40951:28479,40952:28402,40953:28465,40954:28399,40955:28466,40956:28364,161:65377,162:65378,163:65379,164:65380,165:65381,166:65382,167:65383,168:65384,169:65385,170:65386,171:65387,172:65388,173:65389,174:65390,175:65391,176:65392,177:65393,178:65394,179:65395,180:65396,181:65397,182:65398,183:65399,184:65400,185:65401,186:65402,187:65403,188:65404,189:65405,190:65406,191:65407,192:65408,193:65409,194:65410,195:65411,196:65412,197:65413,198:65414,199:65415,200:65416,201:65417,202:65418,203:65419,204:65420,205:65421,206:65422,207:65423,208:65424,209:65425,210:65426,211:65427,212:65428,213:65429,214:65430,215:65431,216:65432,217:65433,218:65434,219:65435,220:65436,221:65437,222:65438,223:65439,57408:28478,57409:28435,57410:28407,57411:28550,57412:28538,57413:28536,57414:28545,57415:28544,57416:28527,57417:28507,57418:28659,57419:28525,57420:28546,57421:28540,57422:28504,57423:28558,57424:28561,57425:28610,57426:28518,57427:28595,57428:28579,57429:28577,57430:28580,57431:28601,57432:28614,57433:28586,57434:28639,57435:28629,57436:28652,57437:28628,57438:28632,57439:28657,57440:28654,57441:28635,57442:28681,57443:28683,57444:28666,57445:28689,57446:28673,57447:28687,57448:28670,57449:28699,57450:28698,57451:28532,57452:28701,57453:28696,57454:28703,57455:28720,57456:28734,57457:28722,57458:28753,57459:28771,57460:28825,57461:28818,57462:28847,57463:28913,57464:28844,57465:28856,57466:28851,57467:28846,57468:28895,57469:28875,57470:28893,57472:28889,57473:28937,57474:28925,57475:28956,57476:28953,57477:29029,57478:29013,57479:29064,57480:29030,57481:29026,57482:29004,57483:29014,57484:29036,57485:29071,57486:29179,57487:29060,57488:29077,57489:29096,57490:29100,57491:29143,57492:29113,57493:29118,57494:29138,57495:29129,57496:29140,57497:29134,57498:29152,57499:29164,57500:29159,57501:29173,57502:29180,57503:29177,57504:29183,57505:29197,57506:29200,57507:29211,57508:29224,57509:29229,57510:29228,57511:29232,57512:29234,57513:29243,57514:29244,57515:29247,57516:29248,57517:29254,57518:29259,57519:29272,57520:29300,57521:29310,57522:29314,57523:29313,57524:29319,57525:29330,57526:29334,57527:29346,57528:29351,57529:29369,57530:29362,57531:29379,57532:29382,57533:29380,57534:29390,57535:29394,57536:29410,57537:29408,57538:29409,57539:29433,57540:29431,57541:20495,57542:29463,57543:29450,57544:29468,57545:29462,57546:29469,57547:29492,57548:29487,57549:29481,57550:29477,57551:29502,57552:29518,57553:29519,57554:40664,57555:29527,57556:29546,57557:29544,57558:29552,57559:29560,57560:29557,57561:29563,57562:29562,57563:29640,57564:29619,57565:29646,57566:29627,57567:29632,57568:29669,57569:29678,57570:29662,57571:29858,57572:29701,57573:29807,57574:29733,57575:29688,57576:29746,57577:29754,57578:29781,57579:29759,57580:29791,57581:29785,57582:29761,57583:29788,57584:29801,57585:29808,57586:29795,57587:29802,57588:29814,57589:29822,57590:29835,57591:29854,57592:29863,57593:29898,57594:29903,57595:29908,57596:29681,57664:29920,57665:29923,57666:29927,57667:29929,57668:29934,57669:29938,57670:29936,57671:29937,57672:29944,57673:29943,57674:29956,57675:29955,57676:29957,57677:29964,57678:29966,57679:29965,57680:29973,57681:29971,57682:29982,57683:29990,57684:29996,57685:30012,57686:30020,57687:30029,57688:30026,57689:30025,57690:30043,57691:30022,57692:30042,57693:30057,57694:30052,57695:30055,57696:30059,57697:30061,57698:30072,57699:30070,57700:30086,57701:30087,57702:30068,57703:30090,57704:30089,57705:30082,57706:30100,57707:30106,57708:30109,57709:30117,57710:30115,57711:30146,57712:30131,57713:30147,57714:30133,57715:30141,57716:30136,57717:30140,57718:30129,57719:30157,57720:30154,57721:30162,57722:30169,57723:30179,57724:30174,57725:30206,57726:30207,57728:30204,57729:30209,57730:30192,57731:30202,57732:30194,57733:30195,57734:30219,57735:30221,57736:30217,57737:30239,57738:30247,57739:30240,57740:30241,57741:30242,57742:30244,57743:30260,57744:30256,57745:30267,57746:30279,57747:30280,57748:30278,57749:30300,57750:30296,57751:30305,57752:30306,57753:30312,57754:30313,57755:30314,57756:30311,57757:30316,57758:30320,57759:30322,57760:30326,57761:30328,57762:30332,57763:30336,57764:30339,57765:30344,57766:30347,57767:30350,57768:30358,57769:30355,57770:30361,57771:30362,57772:30384,57773:30388,57774:30392,57775:30393,57776:30394,57777:30402,57778:30413,57779:30422,57780:30418,57781:30430,57782:30433,57783:30437,57784:30439,57785:30442,57786:34351,57787:30459,57788:30472,57789:30471,57790:30468,57791:30505,57792:30500,57793:30494,57794:30501,57795:30502,57796:30491,57797:30519,57798:30520,57799:30535,57800:30554,57801:30568,57802:30571,57803:30555,57804:30565,57805:30591,57806:30590,57807:30585,57808:30606,57809:30603,57810:30609,57811:30624,57812:30622,57813:30640,57814:30646,57815:30649,57816:30655,57817:30652,57818:30653,57819:30651,57820:30663,57821:30669,57822:30679,57823:30682,57824:30684,57825:30691,57826:30702,57827:30716,57828:30732,57829:30738,57830:31014,57831:30752,57832:31018,57833:30789,57834:30862,57835:30836,57836:30854,57837:30844,57838:30874,57839:30860,57840:30883,57841:30901,57842:30890,57843:30895,57844:30929,57845:30918,57846:30923,57847:30932,57848:30910,57849:30908,57850:30917,57851:30922,57852:30956,57920:30951,57921:30938,57922:30973,57923:30964,57924:30983,57925:30994,57926:30993,57927:31001,57928:31020,57929:31019,57930:31040,57931:31072,57932:31063,57933:31071,57934:31066,57935:31061,57936:31059,57937:31098,57938:31103,57939:31114,57940:31133,57941:31143,57942:40779,57943:31146,57944:31150,57945:31155,57946:31161,57947:31162,57948:31177,57949:31189,57950:31207,57951:31212,57952:31201,57953:31203,57954:31240,57955:31245,57956:31256,57957:31257,57958:31264,57959:31263,57960:31104,57961:31281,57962:31291,57963:31294,57964:31287,57965:31299,57966:31319,57967:31305,57968:31329,57969:31330,57970:31337,57971:40861,57972:31344,57973:31353,57974:31357,57975:31368,57976:31383,57977:31381,57978:31384,57979:31382,57980:31401,57981:31432,57982:31408,57984:31414,57985:31429,57986:31428,57987:31423,57988:36995,57989:31431,57990:31434,57991:31437,57992:31439,57993:31445,57994:31443,57995:31449,57996:31450,57997:31453,57998:31457,57999:31458,58e3:31462,58001:31469,58002:31472,58003:31490,58004:31503,58005:31498,58006:31494,58007:31539,58008:31512,58009:31513,58010:31518,58011:31541,58012:31528,58013:31542,58014:31568,58015:31610,58016:31492,58017:31565,58018:31499,58019:31564,58020:31557,58021:31605,58022:31589,58023:31604,58024:31591,58025:31600,58026:31601,58027:31596,58028:31598,58029:31645,58030:31640,58031:31647,58032:31629,58033:31644,58034:31642,58035:31627,58036:31634,58037:31631,58038:31581,58039:31641,58040:31691,58041:31681,58042:31692,58043:31695,58044:31668,58045:31686,58046:31709,58047:31721,58048:31761,58049:31764,58050:31718,58051:31717,58052:31840,58053:31744,58054:31751,58055:31763,58056:31731,58057:31735,58058:31767,58059:31757,58060:31734,58061:31779,58062:31783,58063:31786,58064:31775,58065:31799,58066:31787,58067:31805,58068:31820,58069:31811,58070:31828,58071:31823,58072:31808,58073:31824,58074:31832,58075:31839,58076:31844,58077:31830,58078:31845,58079:31852,58080:31861,58081:31875,58082:31888,58083:31908,58084:31917,58085:31906,58086:31915,58087:31905,58088:31912,58089:31923,58090:31922,58091:31921,58092:31918,58093:31929,58094:31933,58095:31936,58096:31941,58097:31938,58098:31960,58099:31954,58100:31964,58101:31970,58102:39739,58103:31983,58104:31986,58105:31988,58106:31990,58107:31994,58108:32006,58176:32002,58177:32028,58178:32021,58179:32010,58180:32069,58181:32075,58182:32046,58183:32050,58184:32063,58185:32053,58186:32070,58187:32115,58188:32086,58189:32078,58190:32114,58191:32104,58192:32110,58193:32079,58194:32099,58195:32147,58196:32137,58197:32091,58198:32143,58199:32125,58200:32155,58201:32186,58202:32174,58203:32163,58204:32181,58205:32199,58206:32189,58207:32171,58208:32317,58209:32162,58210:32175,58211:32220,58212:32184,58213:32159,58214:32176,58215:32216,58216:32221,58217:32228,58218:32222,58219:32251,58220:32242,58221:32225,58222:32261,58223:32266,58224:32291,58225:32289,58226:32274,58227:32305,58228:32287,58229:32265,58230:32267,58231:32290,58232:32326,58233:32358,58234:32315,58235:32309,58236:32313,58237:32323,58238:32311,58240:32306,58241:32314,58242:32359,58243:32349,58244:32342,58245:32350,58246:32345,58247:32346,58248:32377,58249:32362,58250:32361,58251:32380,58252:32379,58253:32387,58254:32213,58255:32381,58256:36782,58257:32383,58258:32392,58259:32393,58260:32396,58261:32402,58262:32400,58263:32403,58264:32404,58265:32406,58266:32398,58267:32411,58268:32412,58269:32568,58270:32570,58271:32581,58272:32588,58273:32589,58274:32590,58275:32592,58276:32593,58277:32597,58278:32596,58279:32600,58280:32607,58281:32608,58282:32616,58283:32617,58284:32615,58285:32632,58286:32642,58287:32646,58288:32643,58289:32648,58290:32647,58291:32652,58292:32660,58293:32670,58294:32669,58295:32666,58296:32675,58297:32687,58298:32690,58299:32697,58300:32686,58301:32694,58302:32696,58303:35697,58304:32709,58305:32710,58306:32714,58307:32725,58308:32724,58309:32737,58310:32742,58311:32745,58312:32755,58313:32761,58314:39132,58315:32774,58316:32772,58317:32779,58318:32786,58319:32792,58320:32793,58321:32796,58322:32801,58323:32808,58324:32831,58325:32827,58326:32842,58327:32838,58328:32850,58329:32856,58330:32858,58331:32863,58332:32866,58333:32872,58334:32883,58335:32882,58336:32880,58337:32886,58338:32889,58339:32893,58340:32895,58341:32900,58342:32902,58343:32901,58344:32923,58345:32915,58346:32922,58347:32941,58348:20880,58349:32940,58350:32987,58351:32997,58352:32985,58353:32989,58354:32964,58355:32986,58356:32982,58357:33033,58358:33007,58359:33009,58360:33051,58361:33065,58362:33059,58363:33071,58364:33099,58432:38539,58433:33094,58434:33086,58435:33107,58436:33105,58437:33020,58438:33137,58439:33134,58440:33125,58441:33126,58442:33140,58443:33155,58444:33160,58445:33162,58446:33152,58447:33154,58448:33184,58449:33173,58450:33188,58451:33187,58452:33119,58453:33171,58454:33193,58455:33200,58456:33205,58457:33214,58458:33208,58459:33213,58460:33216,58461:33218,58462:33210,58463:33225,58464:33229,58465:33233,58466:33241,58467:33240,58468:33224,58469:33242,58470:33247,58471:33248,58472:33255,58473:33274,58474:33275,58475:33278,58476:33281,58477:33282,58478:33285,58479:33287,58480:33290,58481:33293,58482:33296,58483:33302,58484:33321,58485:33323,58486:33336,58487:33331,58488:33344,58489:33369,58490:33368,58491:33373,58492:33370,58493:33375,58494:33380,58496:33378,58497:33384,58498:33386,58499:33387,58500:33326,58501:33393,58502:33399,58503:33400,58504:33406,58505:33421,58506:33426,58507:33451,58508:33439,58509:33467,58510:33452,58511:33505,58512:33507,58513:33503,58514:33490,58515:33524,58516:33523,58517:33530,58518:33683,58519:33539,58520:33531,58521:33529,58522:33502,58523:33542,58524:33500,58525:33545,58526:33497,58527:33589,58528:33588,58529:33558,58530:33586,58531:33585,58532:33600,58533:33593,58534:33616,58535:33605,58536:33583,58537:33579,58538:33559,58539:33560,58540:33669,58541:33690,58542:33706,58543:33695,58544:33698,58545:33686,58546:33571,58547:33678,58548:33671,58549:33674,58550:33660,58551:33717,58552:33651,58553:33653,58554:33696,58555:33673,58556:33704,58557:33780,58558:33811,58559:33771,58560:33742,58561:33789,58562:33795,58563:33752,58564:33803,58565:33729,58566:33783,58567:33799,58568:33760,58569:33778,58570:33805,58571:33826,58572:33824,58573:33725,58574:33848,58575:34054,58576:33787,58577:33901,58578:33834,58579:33852,58580:34138,58581:33924,58582:33911,58583:33899,58584:33965,58585:33902,58586:33922,58587:33897,58588:33862,58589:33836,58590:33903,58591:33913,58592:33845,58593:33994,58594:33890,58595:33977,58596:33983,58597:33951,58598:34009,58599:33997,58600:33979,58601:34010,58602:34e3,58603:33985,58604:33990,58605:34006,58606:33953,58607:34081,58608:34047,58609:34036,58610:34071,58611:34072,58612:34092,58613:34079,58614:34069,58615:34068,58616:34044,58617:34112,58618:34147,58619:34136,58620:34120,58688:34113,58689:34306,58690:34123,58691:34133,58692:34176,58693:34212,58694:34184,58695:34193,58696:34186,58697:34216,58698:34157,58699:34196,58700:34203,58701:34282,58702:34183,58703:34204,58704:34167,58705:34174,58706:34192,58707:34249,58708:34234,58709:34255,58710:34233,58711:34256,58712:34261,58713:34269,58714:34277,58715:34268,58716:34297,58717:34314,58718:34323,58719:34315,58720:34302,58721:34298,58722:34310,58723:34338,58724:34330,58725:34352,58726:34367,58727:34381,58728:20053,58729:34388,58730:34399,58731:34407,58732:34417,58733:34451,58734:34467,58735:34473,58736:34474,58737:34443,58738:34444,58739:34486,58740:34479,58741:34500,58742:34502,58743:34480,58744:34505,58745:34851,58746:34475,58747:34516,58748:34526,58749:34537,58750:34540,58752:34527,58753:34523,58754:34543,58755:34578,58756:34566,58757:34568,58758:34560,58759:34563,58760:34555,58761:34577,58762:34569,58763:34573,58764:34553,58765:34570,58766:34612,58767:34623,58768:34615,58769:34619,58770:34597,58771:34601,58772:34586,58773:34656,58774:34655,58775:34680,58776:34636,58777:34638,58778:34676,58779:34647,58780:34664,58781:34670,58782:34649,58783:34643,58784:34659,58785:34666,58786:34821,58787:34722,58788:34719,58789:34690,58790:34735,58791:34763,58792:34749,58793:34752,58794:34768,58795:38614,58796:34731,58797:34756,58798:34739,58799:34759,58800:34758,58801:34747,58802:34799,58803:34802,58804:34784,58805:34831,58806:34829,58807:34814,58808:34806,58809:34807,58810:34830,58811:34770,58812:34833,58813:34838,58814:34837,58815:34850,58816:34849,58817:34865,58818:34870,58819:34873,58820:34855,58821:34875,58822:34884,58823:34882,58824:34898,58825:34905,58826:34910,58827:34914,58828:34923,58829:34945,58830:34942,58831:34974,58832:34933,58833:34941,58834:34997,58835:34930,58836:34946,58837:34967,58838:34962,58839:34990,58840:34969,58841:34978,58842:34957,58843:34980,58844:34992,58845:35007,58846:34993,58847:35011,58848:35012,58849:35028,58850:35032,58851:35033,58852:35037,58853:35065,58854:35074,58855:35068,58856:35060,58857:35048,58858:35058,58859:35076,58860:35084,58861:35082,58862:35091,58863:35139,58864:35102,58865:35109,58866:35114,58867:35115,58868:35137,58869:35140,58870:35131,58871:35126,58872:35128,58873:35148,58874:35101,58875:35168,58876:35166,58944:35174,58945:35172,58946:35181,58947:35178,58948:35183,58949:35188,58950:35191,58951:35198,58952:35203,58953:35208,58954:35210,58955:35219,58956:35224,58957:35233,58958:35241,58959:35238,58960:35244,58961:35247,58962:35250,58963:35258,58964:35261,58965:35263,58966:35264,58967:35290,58968:35292,58969:35293,58970:35303,58971:35316,58972:35320,58973:35331,58974:35350,58975:35344,58976:35340,58977:35355,58978:35357,58979:35365,58980:35382,58981:35393,58982:35419,58983:35410,58984:35398,58985:35400,58986:35452,58987:35437,58988:35436,58989:35426,58990:35461,58991:35458,58992:35460,58993:35496,58994:35489,58995:35473,58996:35493,58997:35494,58998:35482,58999:35491,59e3:35524,59001:35533,59002:35522,59003:35546,59004:35563,59005:35571,59006:35559,59008:35556,59009:35569,59010:35604,59011:35552,59012:35554,59013:35575,59014:35550,59015:35547,59016:35596,59017:35591,59018:35610,59019:35553,59020:35606,59021:35600,59022:35607,59023:35616,59024:35635,59025:38827,59026:35622,59027:35627,59028:35646,59029:35624,59030:35649,59031:35660,59032:35663,59033:35662,59034:35657,59035:35670,59036:35675,59037:35674,59038:35691,59039:35679,59040:35692,59041:35695,59042:35700,59043:35709,59044:35712,59045:35724,59046:35726,59047:35730,59048:35731,59049:35734,59050:35737,59051:35738,59052:35898,59053:35905,59054:35903,59055:35912,59056:35916,59057:35918,59058:35920,59059:35925,59060:35938,59061:35948,59062:35960,59063:35962,59064:35970,59065:35977,59066:35973,59067:35978,59068:35981,59069:35982,59070:35988,59071:35964,59072:35992,59073:25117,59074:36013,59075:36010,59076:36029,59077:36018,59078:36019,59079:36014,59080:36022,59081:36040,59082:36033,59083:36068,59084:36067,59085:36058,59086:36093,59087:36090,59088:36091,59089:36100,59090:36101,59091:36106,59092:36103,59093:36111,59094:36109,59095:36112,59096:40782,59097:36115,59098:36045,59099:36116,59100:36118,59101:36199,59102:36205,59103:36209,59104:36211,59105:36225,59106:36249,59107:36290,59108:36286,59109:36282,59110:36303,59111:36314,59112:36310,59113:36300,59114:36315,59115:36299,59116:36330,59117:36331,59118:36319,59119:36323,59120:36348,59121:36360,59122:36361,59123:36351,59124:36381,59125:36382,59126:36368,59127:36383,59128:36418,59129:36405,59130:36400,59131:36404,59132:36426,59200:36423,59201:36425,59202:36428,59203:36432,59204:36424,59205:36441,59206:36452,59207:36448,59208:36394,59209:36451,59210:36437,59211:36470,59212:36466,59213:36476,59214:36481,59215:36487,59216:36485,59217:36484,59218:36491,59219:36490,59220:36499,59221:36497,59222:36500,59223:36505,59224:36522,59225:36513,59226:36524,59227:36528,59228:36550,59229:36529,59230:36542,59231:36549,59232:36552,59233:36555,59234:36571,59235:36579,59236:36604,59237:36603,59238:36587,59239:36606,59240:36618,59241:36613,59242:36629,59243:36626,59244:36633,59245:36627,59246:36636,59247:36639,59248:36635,59249:36620,59250:36646,59251:36659,59252:36667,59253:36665,59254:36677,59255:36674,59256:36670,59257:36684,59258:36681,59259:36678,59260:36686,59261:36695,59262:36700,59264:36706,59265:36707,59266:36708,59267:36764,59268:36767,59269:36771,59270:36781,59271:36783,59272:36791,59273:36826,59274:36837,59275:36834,59276:36842,59277:36847,59278:36999,59279:36852,59280:36869,59281:36857,59282:36858,59283:36881,59284:36885,59285:36897,59286:36877,59287:36894,59288:36886,59289:36875,59290:36903,59291:36918,59292:36917,59293:36921,59294:36856,59295:36943,59296:36944,59297:36945,59298:36946,59299:36878,59300:36937,59301:36926,59302:36950,59303:36952,59304:36958,59305:36968,59306:36975,59307:36982,59308:38568,59309:36978,59310:36994,59311:36989,59312:36993,59313:36992,59314:37002,59315:37001,59316:37007,59317:37032,59318:37039,59319:37041,59320:37045,59321:37090,59322:37092,59323:25160,59324:37083,59325:37122,59326:37138,59327:37145,59328:37170,59329:37168,59330:37194,59331:37206,59332:37208,59333:37219,59334:37221,59335:37225,59336:37235,59337:37234,59338:37259,59339:37257,59340:37250,59341:37282,59342:37291,59343:37295,59344:37290,59345:37301,59346:37300,59347:37306,59348:37312,59349:37313,59350:37321,59351:37323,59352:37328,59353:37334,59354:37343,59355:37345,59356:37339,59357:37372,59358:37365,59359:37366,59360:37406,59361:37375,59362:37396,59363:37420,59364:37397,59365:37393,59366:37470,59367:37463,59368:37445,59369:37449,59370:37476,59371:37448,59372:37525,59373:37439,59374:37451,59375:37456,59376:37532,59377:37526,59378:37523,59379:37531,59380:37466,59381:37583,59382:37561,59383:37559,59384:37609,59385:37647,59386:37626,59387:37700,59388:37678,59456:37657,59457:37666,59458:37658,59459:37667,59460:37690,59461:37685,59462:37691,59463:37724,59464:37728,59465:37756,59466:37742,59467:37718,59468:37808,59469:37804,59470:37805,59471:37780,59472:37817,59473:37846,59474:37847,59475:37864,59476:37861,59477:37848,59478:37827,59479:37853,59480:37840,59481:37832,59482:37860,59483:37914,59484:37908,59485:37907,59486:37891,59487:37895,59488:37904,59489:37942,59490:37931,59491:37941,59492:37921,59493:37946,59494:37953,59495:37970,59496:37956,59497:37979,59498:37984,59499:37986,59500:37982,59501:37994,59502:37417,59503:38e3,59504:38005,59505:38007,59506:38013,59507:37978,59508:38012,59509:38014,59510:38017,59511:38015,59512:38274,59513:38279,59514:38282,59515:38292,59516:38294,59517:38296,59518:38297,59520:38304,59521:38312,59522:38311,59523:38317,59524:38332,59525:38331,59526:38329,59527:38334,59528:38346,59529:28662,59530:38339,59531:38349,59532:38348,59533:38357,59534:38356,59535:38358,59536:38364,59537:38369,59538:38373,59539:38370,59540:38433,59541:38440,59542:38446,59543:38447,59544:38466,59545:38476,59546:38479,59547:38475,59548:38519,59549:38492,59550:38494,59551:38493,59552:38495,59553:38502,59554:38514,59555:38508,59556:38541,59557:38552,59558:38549,59559:38551,59560:38570,59561:38567,59562:38577,59563:38578,59564:38576,59565:38580,59566:38582,59567:38584,59568:38585,59569:38606,59570:38603,59571:38601,59572:38605,59573:35149,59574:38620,59575:38669,59576:38613,59577:38649,59578:38660,59579:38662,59580:38664,59581:38675,59582:38670,59583:38673,59584:38671,59585:38678,59586:38681,59587:38692,59588:38698,59589:38704,59590:38713,59591:38717,59592:38718,59593:38724,59594:38726,59595:38728,59596:38722,59597:38729,59598:38748,59599:38752,59600:38756,59601:38758,59602:38760,59603:21202,59604:38763,59605:38769,59606:38777,59607:38789,59608:38780,59609:38785,59610:38778,59611:38790,59612:38795,59613:38799,59614:38800,59615:38812,59616:38824,59617:38822,59618:38819,59619:38835,59620:38836,59621:38851,59622:38854,59623:38856,59624:38859,59625:38876,59626:38893,59627:40783,59628:38898,59629:31455,59630:38902,59631:38901,59632:38927,59633:38924,59634:38968,59635:38948,59636:38945,59637:38967,59638:38973,59639:38982,59640:38991,59641:38987,59642:39019,59643:39023,59644:39024,59712:39025,59713:39028,59714:39027,59715:39082,59716:39087,59717:39089,59718:39094,59719:39108,59720:39107,59721:39110,59722:39145,59723:39147,59724:39171,59725:39177,59726:39186,59727:39188,59728:39192,59729:39201,59730:39197,59731:39198,59732:39204,59733:39200,59734:39212,59735:39214,59736:39229,59737:39230,59738:39234,59739:39241,59740:39237,59741:39248,59742:39243,59743:39249,59744:39250,59745:39244,59746:39253,59747:39319,59748:39320,59749:39333,59750:39341,59751:39342,59752:39356,59753:39391,59754:39387,59755:39389,59756:39384,59757:39377,59758:39405,59759:39406,59760:39409,59761:39410,59762:39419,59763:39416,59764:39425,59765:39439,59766:39429,59767:39394,59768:39449,59769:39467,59770:39479,59771:39493,59772:39490,59773:39488,59774:39491,59776:39486,59777:39509,59778:39501,59779:39515,59780:39511,59781:39519,59782:39522,59783:39525,59784:39524,59785:39529,59786:39531,59787:39530,59788:39597,59789:39600,59790:39612,59791:39616,59792:39631,59793:39633,59794:39635,59795:39636,59796:39646,59797:39647,59798:39650,59799:39651,59800:39654,59801:39663,59802:39659,59803:39662,59804:39668,59805:39665,59806:39671,59807:39675,59808:39686,59809:39704,59810:39706,59811:39711,59812:39714,59813:39715,59814:39717,59815:39719,59816:39720,59817:39721,59818:39722,59819:39726,59820:39727,59821:39730,59822:39748,59823:39747,59824:39759,59825:39757,59826:39758,59827:39761,59828:39768,59829:39796,59830:39827,59831:39811,59832:39825,59833:39830,59834:39831,59835:39839,59836:39840,59837:39848,59838:39860,59839:39872,59840:39882,59841:39865,59842:39878,59843:39887,59844:39889,59845:39890,59846:39907,59847:39906,59848:39908,59849:39892,59850:39905,59851:39994,59852:39922,59853:39921,59854:39920,59855:39957,59856:39956,59857:39945,59858:39955,59859:39948,59860:39942,59861:39944,59862:39954,59863:39946,59864:39940,59865:39982,59866:39963,59867:39973,59868:39972,59869:39969,59870:39984,59871:40007,59872:39986,59873:40006,59874:39998,59875:40026,59876:40032,59877:40039,59878:40054,59879:40056,59880:40167,59881:40172,59882:40176,59883:40201,59884:40200,59885:40171,59886:40195,59887:40198,59888:40234,59889:40230,59890:40367,59891:40227,59892:40223,59893:40260,59894:40213,59895:40210,59896:40257,59897:40255,59898:40254,59899:40262,59900:40264,59968:40285,59969:40286,59970:40292,59971:40273,59972:40272,59973:40281,59974:40306,59975:40329,59976:40327,59977:40363,59978:40303,59979:40314,59980:40346,59981:40356,59982:40361,59983:40370,59984:40388,59985:40385,59986:40379,59987:40376,59988:40378,59989:40390,59990:40399,59991:40386,59992:40409,59993:40403,59994:40440,59995:40422,59996:40429,59997:40431,59998:40445,59999:40474,6e4:40475,60001:40478,60002:40565,60003:40569,60004:40573,60005:40577,60006:40584,60007:40587,60008:40588,60009:40594,60010:40597,60011:40593,60012:40605,60013:40613,60014:40617,60015:40632,60016:40618,60017:40621,60018:38753,60019:40652,60020:40654,60021:40655,60022:40656,60023:40660,60024:40668,60025:40670,60026:40669,60027:40672,60028:40677,60029:40680,60030:40687,60032:40692,60033:40694,60034:40695,60035:40697,60036:40699,60037:40700,60038:40701,60039:40711,60040:40712,60041:30391,60042:40725,60043:40737,60044:40748,60045:40766,60046:40778,60047:40786,60048:40788,60049:40803,60050:40799,60051:40800,60052:40801,60053:40806,60054:40807,60055:40812,60056:40810,60057:40823,60058:40818,60059:40822,60060:40853,60061:40860,60062:40864,60063:22575,60064:27079,60065:36953,60066:29796,60067:20956,60068:29081}},function(o,e,r){"use strict";function t(o,e,r,t){e.degree()<r.degree()&&(w=[r,e],e=w[0],r=w[1]);for(var c=e,s=r,a=o.zero,n=o.one;s.degree()>=t/2;){var d=c,l=a;if(c=s,a=n,c.isZero())return null;s=d;for(var i=o.zero,B=c.getCoefficient(c.degree()),k=o.inverse(B);s.degree()>=c.degree()&&!s.isZero();){var u=s.degree()-c.degree(),C=o.multiply(s.getCoefficient(s.degree()),k);i=i.addOrSubtract(o.buildMonomial(u,C)),s=s.addOrSubtract(c.multiplyByMonomial(u,C))}if(n=i.multiplyPoly(a).addOrSubtract(l),s.degree()>=c.degree())return null}var m=n.getCoefficient(0);if(0===m)return null;var f=o.inverse(m);return[n.multiply(f),s.multiply(f)];var w}function c(o,e){var r=e.degree();if(1===r)return[e.getCoefficient(1)];for(var t=new Array(r),c=0,s=1;s<o.size&&c<r;s++)0===e.evaluateAt(s)&&(t[c]=o.inverse(s),c++);return c!==r?null:t}function s(o,e,r){for(var t=r.length,c=new Array(t),s=0;s<t;s++){for(var a=o.inverse(r[s]),d=1,l=0;l<t;l++)s!==l&&(d=o.multiply(d,n.addOrSubtractGF(1,o.multiply(r[l],a))));c[s]=o.multiply(e.evaluateAt(a),o.inverse(d)),0!==o.generatorBase&&(c[s]=o.multiply(c[s],a))}return c}function a(o,e){var r=new Uint8ClampedArray(o.length);r.set(o);for(var a=new n.default(285,256,0),l=new d.default(a,r),i=new Uint8ClampedArray(e),B=!1,k=0;k<e;k++){var u=l.evaluateAt(a.exp(k+a.generatorBase));i[i.length-1-k]=u,0!==u&&(B=!0)}if(!B)return r;var C=new d.default(a,i),m=t(a,a.buildMonomial(e,1),C,e);if(null===m)return null;var f=c(a,m[0]);if(null==f)return null;for(var w=s(a,m[1],f),P=0;P<f.length;P++){var v=r.length-1-a.log(f[P]);if(v<0)return null;r[v]=n.addOrSubtractGF(r[v],w[P])}return r}Object.defineProperty(e,"__esModule",{value:!0});var n=r(1),d=r(2);e.decode=a},function(o,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.VERSIONS=[{infoBits:null,versionNumber:1,alignmentPatternCenters:[],errorCorrectionLevels:[{ecCodewordsPerBlock:7,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:13,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:13}]},{ecCodewordsPerBlock:17,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:2,alignmentPatternCenters:[6,18],errorCorrectionLevels:[{ecCodewordsPerBlock:10,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:34}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:28}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:16}]}]},{infoBits:null,versionNumber:3,alignmentPatternCenters:[6,22],errorCorrectionLevels:[{ecCodewordsPerBlock:15,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:55}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:13}]}]},{infoBits:null,versionNumber:4,alignmentPatternCenters:[6,26],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:80}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:32}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:9}]}]},{infoBits:null,versionNumber:5,alignmentPatternCenters:[6,30],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:43}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:11},{numBlocks:2,dataCodewordsPerBlock:12}]}]},{infoBits:null,versionNumber:6,alignmentPatternCenters:[6,34],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68}]},{ecCodewordsPerBlock:16,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:27}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:31892,versionNumber:7,alignmentPatternCenters:[6,22,38],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:78}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:31}]},{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:13},{numBlocks:1,dataCodewordsPerBlock:14}]}]},{infoBits:34236,versionNumber:8,alignmentPatternCenters:[6,24,42],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:97}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:38},{numBlocks:2,dataCodewordsPerBlock:39}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:18},{numBlocks:2,dataCodewordsPerBlock:19}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:14},{numBlocks:2,dataCodewordsPerBlock:15}]}]},{infoBits:39577,versionNumber:9,alignmentPatternCenters:[6,26,46],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:12},{numBlocks:4,dataCodewordsPerBlock:13}]}]},{infoBits:42195,versionNumber:10,alignmentPatternCenters:[6,28,50],errorCorrectionLevels:[{ecCodewordsPerBlock:18,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:68},{numBlocks:2,dataCodewordsPerBlock:69}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:43},{numBlocks:1,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:15},{numBlocks:2,dataCodewordsPerBlock:16}]}]},{infoBits:48118,versionNumber:11,alignmentPatternCenters:[6,30,54],errorCorrectionLevels:[{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:81}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:50},{numBlocks:4,dataCodewordsPerBlock:51}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:22},{numBlocks:4,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:12},{numBlocks:8,dataCodewordsPerBlock:13}]}]},{infoBits:51042,versionNumber:12,alignmentPatternCenters:[6,32,58],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:92},{numBlocks:2,dataCodewordsPerBlock:93}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:36},{numBlocks:2,dataCodewordsPerBlock:37}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:20},{numBlocks:6,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:14},{numBlocks:4,dataCodewordsPerBlock:15}]}]},{infoBits:55367,versionNumber:13,alignmentPatternCenters:[6,34,62],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:37},{numBlocks:1,dataCodewordsPerBlock:38}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:20},{numBlocks:4,dataCodewordsPerBlock:21}]},{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:11},{numBlocks:4,dataCodewordsPerBlock:12}]}]},{infoBits:58893,versionNumber:14,alignmentPatternCenters:[6,26,46,66],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:40},{numBlocks:5,dataCodewordsPerBlock:41}]},{ecCodewordsPerBlock:20,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:16},{numBlocks:5,dataCodewordsPerBlock:17}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:5,dataCodewordsPerBlock:13}]}]},{infoBits:63784,versionNumber:15,alignmentPatternCenters:[6,26,48,70],errorCorrectionLevels:[{ecCodewordsPerBlock:22,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:87},{numBlocks:1,dataCodewordsPerBlock:88}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:41},{numBlocks:5,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:12},{numBlocks:7,dataCodewordsPerBlock:13}]}]},{infoBits:68472,versionNumber:16,alignmentPatternCenters:[6,26,50,74],errorCorrectionLevels:[{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:98},{numBlocks:1,dataCodewordsPerBlock:99}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:19},{numBlocks:2,dataCodewordsPerBlock:20}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:70749,versionNumber:17,alignmentPatternCenters:[6,30,54,78],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:1,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:22},{numBlocks:15,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:17,dataCodewordsPerBlock:15}]}]},{infoBits:76311,versionNumber:18,alignmentPatternCenters:[6,30,56,82],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:120},{numBlocks:1,dataCodewordsPerBlock:121}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:43},{numBlocks:4,dataCodewordsPerBlock:44}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:1,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:14},{numBlocks:19,dataCodewordsPerBlock:15}]}]},{infoBits:79154,versionNumber:19,alignmentPatternCenters:[6,30,58,86],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:113},{numBlocks:4,dataCodewordsPerBlock:114}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:44},{numBlocks:11,dataCodewordsPerBlock:45}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:21},{numBlocks:4,dataCodewordsPerBlock:22}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:9,dataCodewordsPerBlock:13},{numBlocks:16,dataCodewordsPerBlock:14}]}]},{infoBits:84390,versionNumber:20,alignmentPatternCenters:[6,34,62,90],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:107},{numBlocks:5,dataCodewordsPerBlock:108}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:41},{numBlocks:13,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:5,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:15},{numBlocks:10,dataCodewordsPerBlock:16}]}]},{infoBits:87683,versionNumber:21,alignmentPatternCenters:[6,28,50,72,94],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:116},{numBlocks:4,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:42}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:16},{numBlocks:6,dataCodewordsPerBlock:17}]}]},{infoBits:92361,versionNumber:22,alignmentPatternCenters:[6,26,50,74,98],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:111},{numBlocks:7,dataCodewordsPerBlock:112}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:24,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:13}]}]},{infoBits:96236,versionNumber:23,alignmentPatternCenters:[6,30,54,74,102],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:121},{numBlocks:5,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:47},{numBlocks:14,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:16,dataCodewordsPerBlock:15},{numBlocks:14,dataCodewordsPerBlock:16}]}]},{infoBits:102084,versionNumber:24,alignmentPatternCenters:[6,28,54,80,106],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:45},{numBlocks:14,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:24},{numBlocks:16,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:30,dataCodewordsPerBlock:16},{numBlocks:2,dataCodewordsPerBlock:17}]}]},{infoBits:102881,versionNumber:25,alignmentPatternCenters:[6,32,58,84,110],errorCorrectionLevels:[{ecCodewordsPerBlock:26,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:106},{numBlocks:4,dataCodewordsPerBlock:107}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:47},{numBlocks:13,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:13,dataCodewordsPerBlock:16}]}]},{infoBits:110507,versionNumber:26,alignmentPatternCenters:[6,30,58,86,114],errorCorrectionLevels:[{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:114},{numBlocks:2,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:46},{numBlocks:4,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:28,dataCodewordsPerBlock:22},{numBlocks:6,dataCodewordsPerBlock:23}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:33,dataCodewordsPerBlock:16},{numBlocks:4,dataCodewordsPerBlock:17}]}]},{infoBits:110734,versionNumber:27,alignmentPatternCenters:[6,34,62,90,118],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:45},{numBlocks:3,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:8,dataCodewordsPerBlock:23},{numBlocks:26,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:117786,versionNumber:28,alignmentPatternCenters:[6,26,50,74,98,122],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:117},{numBlocks:10,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:3,dataCodewordsPerBlock:45},{numBlocks:23,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:24},{numBlocks:31,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:31,dataCodewordsPerBlock:16}]}]},{infoBits:119615,versionNumber:29,alignmentPatternCenters:[6,30,54,78,102,126],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:7,dataCodewordsPerBlock:116},{numBlocks:7,dataCodewordsPerBlock:117}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:21,dataCodewordsPerBlock:45},{numBlocks:7,dataCodewordsPerBlock:46}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:1,dataCodewordsPerBlock:23},{numBlocks:37,dataCodewordsPerBlock:24}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:26,dataCodewordsPerBlock:16}]}]},{infoBits:126325,versionNumber:30,alignmentPatternCenters:[6,26,52,78,104,130],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:5,dataCodewordsPerBlock:115},{numBlocks:10,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:47},{numBlocks:10,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:15,dataCodewordsPerBlock:24},{numBlocks:25,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:25,dataCodewordsPerBlock:16}]}]},{infoBits:127568,versionNumber:31,alignmentPatternCenters:[6,30,56,82,108,134],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:3,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:46},{numBlocks:29,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:24},{numBlocks:1,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:23,dataCodewordsPerBlock:15},{numBlocks:28,dataCodewordsPerBlock:16}]}]},{infoBits:133589,versionNumber:32,alignmentPatternCenters:[6,34,60,86,112,138],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:24},{numBlocks:35,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:15},{numBlocks:35,dataCodewordsPerBlock:16}]}]},{infoBits:136944,versionNumber:33,alignmentPatternCenters:[6,30,58,86,114,142],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:115},{numBlocks:1,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:21,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:24},{numBlocks:19,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:11,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:141498,versionNumber:34,alignmentPatternCenters:[6,34,62,90,118,146],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:115},{numBlocks:6,dataCodewordsPerBlock:116}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:14,dataCodewordsPerBlock:46},{numBlocks:23,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:44,dataCodewordsPerBlock:24},{numBlocks:7,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:59,dataCodewordsPerBlock:16},{numBlocks:1,dataCodewordsPerBlock:17}]}]},{infoBits:145311,versionNumber:35,alignmentPatternCenters:[6,30,54,78,102,126,150],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:121},{numBlocks:7,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:12,dataCodewordsPerBlock:47},{numBlocks:26,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:39,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:22,dataCodewordsPerBlock:15},{numBlocks:41,dataCodewordsPerBlock:16}]}]},{infoBits:150283,versionNumber:36,alignmentPatternCenters:[6,24,50,76,102,128,154],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:121},{numBlocks:14,dataCodewordsPerBlock:122}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:6,dataCodewordsPerBlock:47},{numBlocks:34,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:46,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:2,dataCodewordsPerBlock:15},{numBlocks:64,dataCodewordsPerBlock:16}]}]},{infoBits:152622,versionNumber:37,alignmentPatternCenters:[6,28,54,80,106,132,158],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:17,dataCodewordsPerBlock:122},{numBlocks:4,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:29,dataCodewordsPerBlock:46},{numBlocks:14,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:49,dataCodewordsPerBlock:24},{numBlocks:10,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:24,dataCodewordsPerBlock:15},{numBlocks:46,dataCodewordsPerBlock:16}]}]},{infoBits:158308,versionNumber:38,alignmentPatternCenters:[6,32,58,84,110,136,162],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:4,dataCodewordsPerBlock:122},{numBlocks:18,dataCodewordsPerBlock:123}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:13,dataCodewordsPerBlock:46},{numBlocks:32,dataCodewordsPerBlock:47}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:48,dataCodewordsPerBlock:24},{numBlocks:14,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:42,dataCodewordsPerBlock:15},{numBlocks:32,dataCodewordsPerBlock:16}]}]},{infoBits:161089,versionNumber:39,alignmentPatternCenters:[6,26,54,82,110,138,166],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:117},{numBlocks:4,dataCodewordsPerBlock:118}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:40,dataCodewordsPerBlock:47},{numBlocks:7,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:43,dataCodewordsPerBlock:24},{numBlocks:22,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:10,dataCodewordsPerBlock:15},{numBlocks:67,dataCodewordsPerBlock:16}]}]},{infoBits:167017,versionNumber:40,alignmentPatternCenters:[6,30,58,86,114,142,170],errorCorrectionLevels:[{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:19,dataCodewordsPerBlock:118},{numBlocks:6,dataCodewordsPerBlock:119}]},{ecCodewordsPerBlock:28,ecBlocks:[{numBlocks:18,dataCodewordsPerBlock:47},{numBlocks:31,dataCodewordsPerBlock:48}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:34,dataCodewordsPerBlock:24},{numBlocks:34,dataCodewordsPerBlock:25}]},{ecCodewordsPerBlock:30,ecBlocks:[{numBlocks:20,dataCodewordsPerBlock:15},{numBlocks:61,dataCodewordsPerBlock:16}]}]}]},function(o,e,r){"use strict";function t(o,e,r,t){var c=o.x-e.x+r.x-t.x,s=o.y-e.y+r.y-t.y;if(0===c&&0===s)return{a11:e.x-o.x,a12:e.y-o.y,a13:0,a21:r.x-e.x,a22:r.y-e.y,a23:0,a31:o.x,a32:o.y,a33:1};var a=e.x-r.x,n=t.x-r.x,d=e.y-r.y,l=t.y-r.y,i=a*l-n*d,B=(c*l-n*s)/i,k=(a*s-c*d)/i;return{a11:e.x-o.x+B*e.x,a12:e.y-o.y+B*e.y,a13:B,a21:t.x-o.x+k*t.x,a22:t.y-o.y+k*t.y,a23:k,a31:o.x,a32:o.y,a33:1}}function c(o,e,r,c){var s=t(o,e,r,c);return{a11:s.a22*s.a33-s.a23*s.a32,a12:s.a13*s.a32-s.a12*s.a33,a13:s.a12*s.a23-s.a13*s.a22,a21:s.a23*s.a31-s.a21*s.a33,a22:s.a11*s.a33-s.a13*s.a31,a23:s.a13*s.a21-s.a11*s.a23,a31:s.a21*s.a32-s.a22*s.a31,a32:s.a12*s.a31-s.a11*s.a32,a33:s.a11*s.a22-s.a12*s.a21}}function s(o,e){return{a11:o.a11*e.a11+o.a21*e.a12+o.a31*e.a13,a12:o.a12*e.a11+o.a22*e.a12+o.a32*e.a13,a13:o.a13*e.a11+o.a23*e.a12+o.a33*e.a13,a21:o.a11*e.a21+o.a21*e.a22+o.a31*e.a23,a22:o.a12*e.a21+o.a22*e.a22+o.a32*e.a23,a23:o.a13*e.a21+o.a23*e.a22+o.a33*e.a23,a31:o.a11*e.a31+o.a21*e.a32+o.a31*e.a33,a32:o.a12*e.a31+o.a22*e.a32+o.a32*e.a33,a33:o.a13*e.a31+o.a23*e.a32+o.a33*e.a33}}function a(o,e){for(var r=c({x:3.5,y:3.5},{x:e.dimension-3.5,y:3.5},{x:e.dimension-6.5,y:e.dimension-6.5},{x:3.5,y:e.dimension-3.5}),a=t(e.topLeft,e.topRight,e.alignmentPattern,e.bottomLeft),d=s(a,r),l=n.BitMatrix.createEmpty(e.dimension,e.dimension),i=function(o,e){var r=d.a13*o+d.a23*e+d.a33;return{x:(d.a11*o+d.a21*e+d.a31)/r,y:(d.a12*o+d.a22*e+d.a32)/r}},B=0;B<e.dimension;B++)for(var k=0;k<e.dimension;k++){var u=k+.5,C=B+.5,m=i(u,C);l.set(k,B,o.get(Math.floor(m.x),Math.floor(m.y)))}return{matrix:l,mappingFunction:i}}Object.defineProperty(e,"__esModule",{value:!0});var n=r(0);e.extract=a},function(o,e,r){"use strict";function t(o){return o.reduce(function(o,e){return o+e})}function c(o,e,r){var t,c,s,a=C(o,e),n=C(e,r),d=C(o,r);return n>=a&&n>=d?(l=[e,o,r],t=l[0],c=l[1],s=l[2]):d>=n&&d>=a?(i=[o,e,r],t=i[0],c=i[1],s=i[2]):(B=[o,r,e],t=B[0],c=B[1],s=B[2]),(s.x-c.x)*(t.y-c.y)-(s.y-c.y)*(t.x-c.x)<0&&(k=[s,t],t=k[0],s=k[1]),{bottomLeft:t,topLeft:c,topRight:s};var l,i,B,k}function s(o,e,r,c){var s=(t(n(o,r,c,5))/7+t(n(o,e,c,5))/7+t(n(r,o,c,5))/7+t(n(e,o,c,5))/7)/4;if(s<1)throw new Error("Invalid module size");var a=Math.round(C(o,e)/s),d=Math.round(C(o,r)/s),l=Math.floor((a+d)/2)+7;switch(l%4){case 0:l++;break;case 2:l--}return{dimension:l,moduleSize:s}}function a(o,e,r,t){var c,s,a,n,d=[{x:Math.floor(o.x),y:Math.floor(o.y)}],l=Math.abs(e.y-o.y)>Math.abs(e.x-o.x);l?(c=Math.floor(o.y),s=Math.floor(o.x),a=Math.floor(e.y),n=Math.floor(e.x)):(c=Math.floor(o.x),s=Math.floor(o.y),a=Math.floor(e.x),n=Math.floor(e.y));for(var i=Math.abs(a-c),B=Math.abs(n-s),k=Math.floor(-i/2),u=c<a?1:-1,m=s<n?1:-1,f=!0,w=c,P=s;w!==a+u;w+=u){var v=l?P:w,h=l?w:P;if(r.get(v,h)!==f&&(f=!f,d.push({x:v,y:h}),d.length===t+1))break;if((k+=B)>0){if(P===n)break;P+=m,k-=i}}for(var p=[],b=0;b<t;b++)d[b]&&d[b+1]?p.push(C(d[b],d[b+1])):p.push(0);return p}function n(o,e,r,t){var c=e.y-o.y,s=e.x-o.x,n=a(o,e,r,Math.ceil(t/2)),d=a(o,{x:o.x-s,y:o.y-c},r,Math.ceil(t/2)),l=n.shift()+d.shift()-1;return(i=d.concat(l)).concat.apply(i,n);var i}function d(o,e){var r=t(o)/t(e),c=0;return e.forEach(function(e,t){c+=Math.pow(o[t]-e*r,2)}),{averageSize:r,error:c}}function l(o,e,r){try{var t=n(o,{x:-1,y:o.y},r,e.length),c=n(o,{x:o.x,y:-1},r,e.length),s={x:Math.max(0,o.x-o.y)-1,y:Math.max(0,o.y-o.x)-1},a=n(o,s,r,e.length),l={x:Math.min(r.width,o.x+o.y)+1,y:Math.min(r.height,o.y+o.x)+1},i=n(o,l,r,e.length),B=d(t,e),k=d(c,e),u=d(a,e),C=d(i,e),m=Math.sqrt(B.error*B.error+k.error*k.error+u.error*u.error+C.error*C.error),f=(B.averageSize+k.averageSize+u.averageSize+C.averageSize)/4;return m+(Math.pow(B.averageSize-f,2)+Math.pow(k.averageSize-f,2)+Math.pow(u.averageSize-f,2)+Math.pow(C.averageSize-f,2))/f}catch(o){return 1/0}}function i(o){for(var e=[],r=[],a=[],n=[],d=0;d<=o.height;d++)!function(c){for(var s=0,d=!1,l=[0,0,0,0,0],i=-1;i<=o.width;i++)!function(e){var a=o.get(e,c);if(a===d)s++;else{l=[l[1],l[2],l[3],l[4],s],s=1,d=a;var i=t(l)/7,B=Math.abs(l[0]-i)<i&&Math.abs(l[1]-i)<i&&Math.abs(l[2]-3*i)<3*i&&Math.abs(l[3]-i)<i&&Math.abs(l[4]-i)<i&&!a,C=t(l.slice(-3))/3,m=Math.abs(l[2]-C)<C&&Math.abs(l[3]-C)<C&&Math.abs(l[4]-C)<C&&a;if(B){var f=e-l[3]-l[4],w=f-l[2],P={startX:w,endX:f,y:c},v=r.filter(function(o){return w>=o.bottom.startX&&w<=o.bottom.endX||f>=o.bottom.startX&&w<=o.bottom.endX||w<=o.bottom.startX&&f>=o.bottom.endX&&l[2]/(o.bottom.endX-o.bottom.startX)<u&&l[2]/(o.bottom.endX-o.bottom.startX)>k});v.length>0?v[0].bottom=P:r.push({top:P,bottom:P})}if(m){var h=e-l[4],p=h-l[3],P={startX:p,y:c,endX:h},v=n.filter(function(o){return p>=o.bottom.startX&&p<=o.bottom.endX||h>=o.bottom.startX&&p<=o.bottom.endX||p<=o.bottom.startX&&h>=o.bottom.endX&&l[2]/(o.bottom.endX-o.bottom.startX)<u&&l[2]/(o.bottom.endX-o.bottom.startX)>k});v.length>0?v[0].bottom=P:n.push({top:P,bottom:P})}}}(i);e.push.apply(e,r.filter(function(o){return o.bottom.y!==c&&o.bottom.y-o.top.y>=2})),r=r.filter(function(o){return o.bottom.y===c}),a.push.apply(a,n.filter(function(o){return o.bottom.y!==c})),n=n.filter(function(o){return o.bottom.y===c})}(d);e.push.apply(e,r.filter(function(o){return o.bottom.y-o.top.y>=2})),a.push.apply(a,n);var i=e.filter(function(o){return o.bottom.y-o.top.y>=2}).map(function(e){var r=(e.top.startX+e.top.endX+e.bottom.startX+e.bottom.endX)/4,c=(e.top.y+e.bottom.y+1)/2;if(o.get(Math.round(r),Math.round(c))){var s=[e.top.endX-e.top.startX,e.bottom.endX-e.bottom.startX,e.bottom.y-e.top.y+1],a=t(s)/s.length;return{score:l({x:Math.round(r),y:Math.round(c)},[1,1,3,1,1],o),x:r,y:c,size:a}}}).filter(function(o){return!!o}).sort(function(o,e){return o.score-e.score}).map(function(o,e,r){if(e>B)return null;var t=r.filter(function(o,r){return e!==r}).map(function(e){return{x:e.x,y:e.y,score:e.score+Math.pow(e.size-o.size,2)/o.size,size:e.size}}).sort(function(o,e){return o.score-e.score});if(t.length<2)return null;var c=o.score+t[0].score+t[1].score;return{points:[o].concat(t.slice(0,2)),score:c}}).filter(function(o){return!!o}).sort(function(o,e){return o.score-e.score});if(0===i.length)return null;var m,f,w=c(i[0].points[0],i[0].points[1],i[0].points[2]),P=w.topRight,v=w.topLeft,h=w.bottomLeft;try{L=s(v,P,h,o),m=L.dimension,f=L.moduleSize}catch(o){return null}var p={x:P.x-v.x+h.x,y:P.y-v.y+h.y},b=(C(v,h)+C(v,P))/2/f,y=1-3/b,g={x:v.x+y*(p.x-v.x),y:v.y+y*(p.y-v.y)},x=a.map(function(e){var r=(e.top.startX+e.top.endX+e.bottom.startX+e.bottom.endX)/4,c=(e.top.y+e.bottom.y+1)/2;if(o.get(Math.floor(r),Math.floor(c))){var s=[e.top.endX-e.top.startX,e.bottom.endX-e.bottom.startX,e.bottom.y-e.top.y+1];t(s);return{x:r,y:c,score:l({x:Math.floor(r),y:Math.floor(c)},[1,1,1],o)+C({x:r,y:c},g)}}}).filter(function(o){return!!o}).sort(function(o,e){return o.score-e.score}),M=b>=15&&x.length?x[0]:g;return{alignmentPattern:{x:M.x,y:M.y},bottomLeft:{x:h.x,y:h.y},dimension:m,topLeft:{x:v.x,y:v.y},topRight:{x:P.x,y:P.y}};var L}Object.defineProperty(e,"__esModule",{value:!0});var B=4,k=.5,u=1.5,C=function(o,e){return Math.sqrt(Math.pow(e.x-o.x,2)+Math.pow(e.y-o.y,2))};e.locate=i}]).default})}]);`, null);
    };
  }, function(e, t, r) {
    e.exports = { default: r(74), __esModule: true };
  }, function(e, t) {
  }, function(e, t, r) {
    var n = r(15), o = r(3), a = r(49), i = r(9), s = r(18), c = r(76), d = r(23), u = r(52), l = r(2)("iterator"), f = !([].keys && "next" in [].keys()), p = function() {
      return this;
    };
    e.exports = function(e2, t2, r2, m, v, h, k) {
      c(r2, t2, m);
      var C, y, g, P = function(e3) {
        if (!f && e3 in S) return S[e3];
        switch (e3) {
          case "keys":
          case "values":
            return function() {
              return new r2(this, e3);
            };
        }
        return function() {
          return new r2(this, e3);
        };
      }, w = t2 + " Iterator", B = "values" == v, b = false, S = e2.prototype, T = S[l] || S["@@iterator"] || v && S[v], x = T || P(v), R = v ? B ? P("entries") : x : void 0, E = "Array" == t2 ? S.entries || T : T;
      if (E && (g = u(E.call(new e2()))) !== Object.prototype && g.next && (d(g, w, true), n || "function" == typeof g[l] || i(g, l, p)), B && T && "values" !== T.name && (b = true, x = function() {
        return T.call(this);
      }), n && !k || !f && !b && S[l] || i(S, l, x), s[t2] = x, s[w] = p, v) if (C = { values: B ? x : P("values"), keys: h ? x : P("keys"), entries: R }, k) for (y in C) y in S || a(S, y, C[y]);
      else o(o.P + o.F * (f || b), t2, C);
      return C;
    };
  }, function(e, t, r) {
    e.exports = !r(8) && !r(16)(function() {
      return 7 != Object.defineProperty(r(27)("div"), "a", { get: function() {
        return 7;
      } }).a;
    });
  }, function(e, t, r) {
    e.exports = r(9);
  }, function(e, t, r) {
    var n = r(10), o = r(14), a = r(79)(false), i = r(32)("IE_PROTO");
    e.exports = function(e2, t2) {
      var r2, s = o(e2), c = 0, d = [];
      for (r2 in s) r2 != i && n(s, r2) && d.push(r2);
      for (; t2.length > c; ) n(s, r2 = t2[c++]) && (~a(d, r2) || d.push(r2));
      return d;
    };
  }, function(e, t, r) {
    var n = r(1).document;
    e.exports = n && n.documentElement;
  }, function(e, t, r) {
    var n = r(10), o = r(35), a = r(32)("IE_PROTO"), i = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e2) {
      return e2 = o(e2), n(e2, a) ? e2[a] : "function" == typeof e2.constructor && e2 instanceof e2.constructor ? e2.constructor.prototype : e2 instanceof Object ? i : null;
    };
  }, function(e, t, r) {
    r(81);
    for (var n = r(1), o = r(9), a = r(18), i = r(2)("toStringTag"), s = "CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","), c = 0; c < s.length; c++) {
      var d = s[c], u = n[d], l = u && u.prototype;
      l && !l[i] && o(l, i, d), a[d] = a.Array;
    }
  }, function(e, t, r) {
    var n = r(19), o = r(2)("toStringTag"), a = "Arguments" == n(/* @__PURE__ */ function() {
      return arguments;
    }()), i = function(e2, t2) {
      try {
        return e2[t2];
      } catch (e3) {
      }
    };
    e.exports = function(e2) {
      var t2, r2, s;
      return void 0 === e2 ? "Undefined" : null === e2 ? "Null" : "string" == typeof (r2 = i(t2 = Object(e2), o)) ? r2 : a ? n(t2) : "Object" == (s = n(t2)) && "function" == typeof t2.callee ? "Arguments" : s;
    };
  }, function(e, t, r) {
    var n = r(5);
    e.exports = function(e2, t2, r2, o) {
      try {
        return o ? t2(n(r2)[0], r2[1]) : t2(r2);
      } catch (t3) {
        var a = e2.return;
        throw void 0 !== a && n(a.call(e2)), t3;
      }
    };
  }, function(e, t, r) {
    var n = r(18), o = r(2)("iterator"), a = Array.prototype;
    e.exports = function(e2) {
      return void 0 !== e2 && (n.Array === e2 || a[o] === e2);
    };
  }, function(e, t, r) {
    var n = r(54), o = r(2)("iterator"), a = r(18);
    e.exports = r(0).getIteratorMethod = function(e2) {
      if (void 0 != e2) return e2[o] || e2["@@iterator"] || a[n(e2)];
    };
  }, function(e, t, r) {
    var n = r(5), o = r(21), a = r(2)("species");
    e.exports = function(e2, t2) {
      var r2, i = n(e2).constructor;
      return void 0 === i || void 0 == (r2 = n(i)[a]) ? t2 : o(r2);
    };
  }, function(e, t, r) {
    var n, o, a, i = r(13), s = r(87), c = r(51), d = r(27), u = r(1), l = u.process, f = u.setImmediate, p = u.clearImmediate, m = u.MessageChannel, v = u.Dispatch, h = 0, k = {}, C = function() {
      var e2 = +this;
      if (k.hasOwnProperty(e2)) {
        var t2 = k[e2];
        delete k[e2], t2();
      }
    }, y = function(e2) {
      C.call(e2.data);
    };
    f && p || (f = function(e2) {
      for (var t2 = [], r2 = 1; arguments.length > r2; ) t2.push(arguments[r2++]);
      return k[++h] = function() {
        s("function" == typeof e2 ? e2 : Function(e2), t2);
      }, n(h), h;
    }, p = function(e2) {
      delete k[e2];
    }, "process" == r(19)(l) ? n = function(e2) {
      l.nextTick(i(C, e2, 1));
    } : v && v.now ? n = function(e2) {
      v.now(i(C, e2, 1));
    } : m ? (o = new m(), a = o.port2, o.port1.onmessage = y, n = i(a.postMessage, a, 1)) : u.addEventListener && "function" == typeof postMessage && !u.importScripts ? (n = function(e2) {
      u.postMessage(e2 + "", "*");
    }, u.addEventListener("message", y, false)) : n = "onreadystatechange" in d("script") ? function(e2) {
      c.appendChild(d("script")).onreadystatechange = function() {
        c.removeChild(this), C.call(e2);
      };
    } : function(e2) {
      setTimeout(i(C, e2, 1), 0);
    }), e.exports = { set: f, clear: p };
  }, function(e, t) {
    e.exports = function(e2) {
      try {
        return { e: false, v: e2() };
      } catch (e3) {
        return { e: true, v: e3 };
      }
    };
  }, function(e, t, r) {
    var n = r(5), o = r(7), a = r(36);
    e.exports = function(e2, t2) {
      if (n(e2), o(t2) && t2.constructor === e2) return t2;
      var r2 = a.f(e2);
      return (0, r2.resolve)(t2), r2.promise;
    };
  }, function(e, t, r) {
    var n = r(2)("iterator"), o = false;
    try {
      var a = [7][n]();
      a.return = function() {
        o = true;
      }, Array.from(a, function() {
        throw 2;
      });
    } catch (e2) {
    }
    e.exports = function(e2, t2) {
      if (!t2 && !o) return false;
      var r2 = false;
      try {
        var a2 = [7], i = a2[n]();
        i.next = function() {
          return { done: r2 = true };
        }, a2[n] = function() {
          return i;
        }, e2(a2);
      } catch (e3) {
      }
      return r2;
    };
  }, function(e, t, r) {
    t.__esModule = true, t.default = function(e2, t2) {
      if (!(e2 instanceof t2)) throw new TypeError("Cannot call a class as a function");
    };
  }, function(e, t, r) {
    r.d(t, "b", function() {
      return l;
    }), r.d(t, "a", function() {
      return f;
    }), r.d(t, "d", function() {
      return p;
    }), r.d(t, "c", function() {
      return m;
    });
    var n = r(115), o = r.n(n), a = r(63), i = r.n(a), s = r(119), c = r.n(s), d = r(131), u = r.n(d), l = function(e2) {
      function t2() {
        i()(this, t2);
        var e3 = c()(this, (t2.__proto__ || o()(t2)).call(this, "can't process cross-origin image"));
        return e3.name = "DropImageFetchError", e3;
      }
      return u()(t2, e2), t2;
    }(Error), f = function(e2) {
      function t2() {
        i()(this, t2);
        var e3 = c()(this, (t2.__proto__ || o()(t2)).call(this, "drag-and-dropped file is not of type image and can't be decoded"));
        return e3.name = "DropImageDecodeError", e3;
      }
      return u()(t2, e2), t2;
    }(Error), p = function(e2) {
      function t2() {
        i()(this, t2);
        var e3 = c()(this, (t2.__proto__ || o()(t2)).call(this, "this browser has no Stream API support"));
        return e3.name = "StreamApiNotSupportedError", e3;
      }
      return u()(t2, e2), t2;
    }(Error), m = function(e2) {
      function t2() {
        i()(this, t2);
        var e3 = c()(this, (t2.__proto__ || o()(t2)).call(this, "camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP."));
        return e3.name = "InsecureContextError", e3;
      }
      return u()(t2, e2), t2;
    }(Error);
  }, function(e, t, r) {
    function n(e2) {
      return e2 && e2.__esModule ? e2 : { default: e2 };
    }
    t.__esModule = true;
    var o = r(120), a = n(o), i = r(122), s = n(i), c = "function" == typeof s.default && "symbol" == typeof a.default ? function(e2) {
      return typeof e2;
    } : function(e2) {
      return e2 && "function" == typeof s.default && e2.constructor === s.default && e2 !== s.default.prototype ? "symbol" : typeof e2;
    };
    t.default = "function" == typeof s.default && "symbol" === c(a.default) ? function(e2) {
      return void 0 === e2 ? "undefined" : c(e2);
    } : function(e2) {
      return e2 && "function" == typeof s.default && e2.constructor === s.default && e2 !== s.default.prototype ? "symbol" : void 0 === e2 ? "undefined" : c(e2);
    };
  }, function(e, t) {
    t.f = Object.getOwnPropertySymbols;
  }, function(e, t, r) {
    var n = r(50), o = r(34).concat("length", "prototype");
    t.f = Object.getOwnPropertyNames || function(e2) {
      return n(e2, o);
    };
  }, function(e, t, r) {
    var n = r(41), o = r(17), a = r(14), i = r(28), s = r(10), c = r(48), d = Object.getOwnPropertyDescriptor;
    t.f = r(8) ? d : function(e2, t2) {
      if (e2 = a(e2), t2 = i(t2, true), c) try {
        return d(e2, t2);
      } catch (e3) {
      }
      if (s(e2, t2)) return o(!n.f.call(e2, t2), e2[t2]);
    };
  }, function(e, t, r) {
    t.__esModule = true;
    var n = r(144), o = function(e2) {
      return e2 && e2.__esModule ? e2 : { default: e2 };
    }(n);
    t.default = function(e2) {
      if (Array.isArray(e2)) {
        for (var t2 = 0, r2 = Array(e2.length); t2 < e2.length; t2++) r2[t2] = e2[t2];
        return r2;
      }
      return (0, o.default)(e2);
    };
  }, function(e, t, r) {
    function n(e2) {
      e2.component("qrcode-stream", a.a), e2.component("qrcode-capture", s.a), e2.component("qrcode-drop-zone", d.a);
    }
    Object.defineProperty(t, "__esModule", { value: true }), t.install = n;
    var o = r(71), a = r.n(o), i = r(142), s = r.n(i), c = r(149), d = r.n(c);
    r.d(t, "QrcodeStream", function() {
      return a.a;
    }), r.d(t, "QrcodeCapture", function() {
      return s.a;
    }), r.d(t, "QrcodeDropZone", function() {
      return d.a;
    });
    var u = { install: n };
    t.default = u;
    var l = null;
    "undefined" != typeof window ? l = window.Vue : "undefined" != typeof commonjsGlobal && (l = commonjsGlobal.Vue), l && l.use(u);
  }, function(e, t, r) {
    r(72);
    var n = r(20)(r(73), r(141), "data-v-1f90552a", null);
    e.exports = n.exports;
  }, function(e, t) {
  }, function(e, t, r) {
    Object.defineProperty(t, "__esModule", { value: true });
    var n = r(45), o = r.n(n), a = r(11), i = r.n(a), s = r(12), c = r.n(s), d = r(37), u = r(96), l = r(97), f = r(43), p = r.n(f), m = r(44), v = r.n(m);
    t.default = { name: "qrcode-stream", mixins: [p.a], props: { camera: { type: String, default: "auto", validator: function(e2) {
      return ["auto", "rear", "front", "off"].includes(e2);
    } }, track: { type: [Function, Boolean], default: true }, worker: { type: Function, default: v.a } }, data: function() {
      return { cameraInstance: null, destroyed: false, stopScanning: function() {
      } };
    }, computed: { shouldStream: function() {
      return false === this.destroyed && "off" !== this.camera;
    }, shouldScan: function() {
      return true === this.shouldStream && null !== this.cameraInstance;
    }, scanInterval: function() {
      return false === this.track ? 500 : 40;
    }, trackRepaintFunction: function() {
      return true === this.track ? Object(u.a)({ color: "#ff0000" }) : false === this.track ? void 0 : this.track;
    }, constraints: function() {
      var e2 = { audio: false, video: { width: { min: 360, ideal: 640, max: 1920 }, height: { min: 240, ideal: 480, max: 1080 } } };
      switch (this.camera) {
        case "auto":
          return e2.video.facingMode = { ideal: "environment" }, e2;
        case "rear":
          return e2.video.facingMode = { exact: "environment" }, e2;
        case "front":
          return e2.video.facingMode = { exact: "user" }, e2;
        case "off":
        default:
          return;
      }
    } }, watch: { shouldStream: function(e2) {
      if (!e2) {
        var t2 = this.cameraInstance.captureFrame();
        this.paintPauseFrame(t2);
      }
    }, shouldScan: function(e2) {
      e2 ? (this.clearPauseFrame(), this.clearTrackingLayer(), this.startScanning()) : this.stopScanning();
    }, constraints: function() {
      this.$emit("init", this.init());
    } }, mounted: function() {
      this.$emit("init", this.init());
    }, beforeDestroy: function() {
      this.beforeResetCamera(), this.stopScanning(), this.destroyed = true;
    }, methods: { init: function() {
      var e2 = this;
      return c()(i.a.mark(function t2() {
        return i.a.wrap(function(t3) {
          for (; ; ) switch (t3.prev = t3.next) {
            case 0:
              if (e2.beforeResetCamera(), void 0 !== e2.constraints) {
                t3.next = 5;
                break;
              }
              e2.cameraInstance = null, t3.next = 9;
              break;
            case 5:
              return t3.next = 7, Object(l.a)(e2.constraints, e2.$refs.video);
            case 7:
              e2.cameraInstance = t3.sent, e2.destroyed && e2.cameraInstance.stop();
            case 9:
            case "end":
              return t3.stop();
          }
        }, t2, e2);
      }))();
    }, startScanning: function() {
      var e2 = this, t2 = function(t3) {
        e2.onDetect(o.a.resolve(t3));
      };
      this.stopScanning = Object(d.a)(this.worker, this.cameraInstance, { detectHandler: t2, locateHandler: this.onLocate, minDelay: this.scanInterval });
    }, beforeResetCamera: function() {
      null !== this.cameraInstance && (this.cameraInstance.stop(), this.cameraInstance = null);
    }, onLocate: function(e2) {
      void 0 === this.trackRepaintFunction || null === e2 ? this.clearTrackingLayer() : this.repaintTrackingLayer(e2);
    }, repaintTrackingLayer: function(e2) {
      var t2 = this, r2 = this.$refs.video, n2 = this.$refs.trackingLayer, o2 = n2.getContext("2d"), a2 = r2.offsetWidth, i2 = r2.offsetHeight, s2 = r2.videoWidth, c2 = r2.videoHeight, d2 = Math.max(a2 / s2, i2 / c2), u2 = s2 * d2, l2 = c2 * d2, f2 = u2 / s2, p2 = l2 / c2, m2 = (a2 - u2) / 2, v2 = (i2 - l2) / 2, h = {};
      for (var k in e2) h[k] = { x: Math.floor(e2[k].x * f2 + m2), y: Math.floor(e2[k].y * p2 + v2) };
      window.requestAnimationFrame(function() {
        n2.width = a2, n2.height = i2, t2.trackRepaintFunction(h, o2);
      });
    }, clearTrackingLayer: function() {
      var e2 = this.$refs.trackingLayer, t2 = e2.getContext("2d");
      window.requestAnimationFrame(function() {
        t2.clearRect(0, 0, e2.width, e2.height);
      });
    }, paintPauseFrame: function(e2) {
      var t2 = this.$refs.pauseFrame, r2 = t2.getContext("2d");
      window.requestAnimationFrame(function() {
        t2.width = e2.width, t2.height = e2.height, r2.putImageData(e2, 0, 0);
      });
    }, clearPauseFrame: function() {
      var e2 = this.$refs.pauseFrame, t2 = e2.getContext("2d");
      window.requestAnimationFrame(function() {
        t2.clearRect(0, 0, e2.width, e2.height);
      });
    } } };
  }, function(e, t, r) {
    r(46), r(24), r(53), r(84), r(92), r(93), e.exports = r(0).Promise;
  }, function(e, t, r) {
    var n = r(25), o = r(26);
    e.exports = function(e2) {
      return function(t2, r2) {
        var a, i, s = String(o(t2)), c = n(r2), d = s.length;
        return c < 0 || c >= d ? e2 ? "" : void 0 : (a = s.charCodeAt(c), a < 55296 || a > 56319 || c + 1 === d || (i = s.charCodeAt(c + 1)) < 56320 || i > 57343 ? e2 ? s.charAt(c) : a : e2 ? s.slice(c, c + 2) : i - 56320 + (a - 55296 << 10) + 65536);
      };
    };
  }, function(e, t, r) {
    var n = r(29), o = r(17), a = r(23), i = {};
    r(9)(i, r(2)("iterator"), function() {
      return this;
    }), e.exports = function(e2, t2, r2) {
      e2.prototype = n(i, { next: o(1, r2) }), a(e2, t2 + " Iterator");
    };
  }, function(e, t, r) {
    var n = r(4), o = r(5), a = r(30);
    e.exports = r(8) ? Object.defineProperties : function(e2, t2) {
      o(e2);
      for (var r2, i = a(t2), s = i.length, c = 0; s > c; ) n.f(e2, r2 = i[c++], t2[r2]);
      return e2;
    };
  }, function(e, t, r) {
    var n = r(19);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e2) {
      return "String" == n(e2) ? e2.split("") : Object(e2);
    };
  }, function(e, t, r) {
    var n = r(14), o = r(31), a = r(80);
    e.exports = function(e2) {
      return function(t2, r2, i) {
        var s, c = n(t2), d = o(c.length), u = a(i, d);
        if (e2 && r2 != r2) {
          for (; d > u; ) if ((s = c[u++]) != s) return true;
        } else for (; d > u; u++) if ((e2 || u in c) && c[u] === r2) return e2 || u || 0;
        return !e2 && -1;
      };
    };
  }, function(e, t, r) {
    var n = r(25), o = Math.max, a = Math.min;
    e.exports = function(e2, t2) {
      return e2 = n(e2), e2 < 0 ? o(e2 + t2, 0) : a(e2, t2);
    };
  }, function(e, t, r) {
    var n = r(82), o = r(83), a = r(18), i = r(14);
    e.exports = r(47)(Array, "Array", function(e2, t2) {
      this._t = i(e2), this._i = 0, this._k = t2;
    }, function() {
      var e2 = this._t, t2 = this._k, r2 = this._i++;
      return !e2 || r2 >= e2.length ? (this._t = void 0, o(1)) : "keys" == t2 ? o(0, r2) : "values" == t2 ? o(0, e2[r2]) : o(0, [r2, e2[r2]]);
    }, "values"), a.Arguments = a.Array, n("keys"), n("values"), n("entries");
  }, function(e, t) {
    e.exports = function() {
    };
  }, function(e, t) {
    e.exports = function(e2, t2) {
      return { value: t2, done: !!e2 };
    };
  }, function(e, t, r) {
    var n, o, a, i, s = r(15), c = r(1), d = r(13), u = r(54), l = r(3), f = r(7), p = r(21), m = r(85), v = r(86), h = r(58), k = r(59).set, C = r(88)(), y = r(36), g = r(60), P = r(89), w = r(61), B = c.TypeError, b = c.process, S = b && b.versions, T = S && S.v8 || "", x = c.Promise, R = "process" == u(b), E = function() {
    }, _ = o = y.f, M = !!function() {
      try {
        var e2 = x.resolve(1), t2 = (e2.constructor = {})[r(2)("species")] = function(e3) {
          e3(E, E);
        };
        return (R || "function" == typeof PromiseRejectionEvent) && e2.then(E) instanceof t2 && 0 !== T.indexOf("6.6") && -1 === P.indexOf("Chrome/66");
      } catch (e3) {
      }
    }(), O = function(e2) {
      var t2;
      return !(!f(e2) || "function" != typeof (t2 = e2.then)) && t2;
    }, L = function(e2, t2) {
      if (!e2._n) {
        e2._n = true;
        var r2 = e2._c;
        C(function() {
          for (var n2 = e2._v, o2 = 1 == e2._s, a2 = 0; r2.length > a2; ) !function(t3) {
            var r3, a3, i2, s2 = o2 ? t3.ok : t3.fail, c2 = t3.resolve, d2 = t3.reject, u2 = t3.domain;
            try {
              s2 ? (o2 || (2 == e2._h && j(e2), e2._h = 1), true === s2 ? r3 = n2 : (u2 && u2.enter(), r3 = s2(n2), u2 && (u2.exit(), i2 = true)), r3 === t3.promise ? d2(B("Promise-chain cycle")) : (a3 = O(r3)) ? a3.call(r3, c2, d2) : c2(r3)) : d2(n2);
            } catch (e3) {
              u2 && !i2 && u2.exit(), d2(e3);
            }
          }(r2[a2++]);
          e2._c = [], e2._n = false, t2 && !e2._h && I(e2);
        });
      }
    }, I = function(e2) {
      k.call(c, function() {
        var t2, r2, n2, o2 = e2._v, a2 = D(e2);
        if (a2 && (t2 = g(function() {
          R ? b.emit("unhandledRejection", o2, e2) : (r2 = c.onunhandledrejection) ? r2({ promise: e2, reason: o2 }) : (n2 = c.console) && n2.error && n2.error("Unhandled promise rejection", o2);
        }), e2._h = R || D(e2) ? 2 : 1), e2._a = void 0, a2 && t2.e) throw t2.v;
      });
    }, D = function(e2) {
      return 1 !== e2._h && 0 === (e2._a || e2._c).length;
    }, j = function(e2) {
      k.call(c, function() {
        var t2;
        R ? b.emit("rejectionHandled", e2) : (t2 = c.onrejectionhandled) && t2({ promise: e2, reason: e2._v });
      });
    }, N = function(e2) {
      var t2 = this;
      t2._d || (t2._d = true, t2 = t2._w || t2, t2._v = e2, t2._s = 2, t2._a || (t2._a = t2._c.slice()), L(t2, true));
    }, A = function(e2) {
      var t2, r2 = this;
      if (!r2._d) {
        r2._d = true, r2 = r2._w || r2;
        try {
          if (r2 === e2) throw B("Promise can't be resolved itself");
          (t2 = O(e2)) ? C(function() {
            var n2 = { _w: r2, _d: false };
            try {
              t2.call(e2, d(A, n2, 1), d(N, n2, 1));
            } catch (e3) {
              N.call(n2, e3);
            }
          }) : (r2._v = e2, r2._s = 1, L(r2, false));
        } catch (e3) {
          N.call({ _w: r2, _d: false }, e3);
        }
      }
    };
    M || (x = function(e2) {
      m(this, x, "Promise", "_h"), p(e2), n.call(this);
      try {
        e2(d(A, this, 1), d(N, this, 1));
      } catch (e3) {
        N.call(this, e3);
      }
    }, n = function(e2) {
      this._c = [], this._a = void 0, this._s = 0, this._d = false, this._v = void 0, this._h = 0, this._n = false;
    }, n.prototype = r(90)(x.prototype, { then: function(e2, t2) {
      var r2 = _(h(this, x));
      return r2.ok = "function" != typeof e2 || e2, r2.fail = "function" == typeof t2 && t2, r2.domain = R ? b.domain : void 0, this._c.push(r2), this._a && this._a.push(r2), this._s && L(this, false), r2.promise;
    }, catch: function(e2) {
      return this.then(void 0, e2);
    } }), a = function() {
      var e2 = new n();
      this.promise = e2, this.resolve = d(A, e2, 1), this.reject = d(N, e2, 1);
    }, y.f = _ = function(e2) {
      return e2 === x || e2 === i ? new a(e2) : o(e2);
    }), l(l.G + l.W + l.F * !M, { Promise: x }), r(23)(x, "Promise"), r(91)("Promise"), i = r(0).Promise, l(l.S + l.F * !M, "Promise", { reject: function(e2) {
      var t2 = _(this);
      return (0, t2.reject)(e2), t2.promise;
    } }), l(l.S + l.F * (s || !M), "Promise", { resolve: function(e2) {
      return w(s && this === i ? x : this, e2);
    } }), l(l.S + l.F * !(M && r(62)(function(e2) {
      x.all(e2).catch(E);
    })), "Promise", { all: function(e2) {
      var t2 = this, r2 = _(t2), n2 = r2.resolve, o2 = r2.reject, a2 = g(function() {
        var r3 = [], a3 = 0, i2 = 1;
        v(e2, false, function(e3) {
          var s2 = a3++, c2 = false;
          r3.push(void 0), i2++, t2.resolve(e3).then(function(e4) {
            c2 || (c2 = true, r3[s2] = e4, --i2 || n2(r3));
          }, o2);
        }), --i2 || n2(r3);
      });
      return a2.e && o2(a2.v), r2.promise;
    }, race: function(e2) {
      var t2 = this, r2 = _(t2), n2 = r2.reject, o2 = g(function() {
        v(e2, false, function(e3) {
          t2.resolve(e3).then(r2.resolve, n2);
        });
      });
      return o2.e && n2(o2.v), r2.promise;
    } });
  }, function(e, t) {
    e.exports = function(e2, t2, r, n) {
      if (!(e2 instanceof t2) || void 0 !== n && n in e2) throw TypeError(r + ": incorrect invocation!");
      return e2;
    };
  }, function(e, t, r) {
    var n = r(13), o = r(55), a = r(56), i = r(5), s = r(31), c = r(57), d = {}, u = {}, t = e.exports = function(e2, t2, r2, l, f) {
      var p, m, v, h, k = f ? function() {
        return e2;
      } : c(e2), C = n(r2, l, t2 ? 2 : 1), y = 0;
      if ("function" != typeof k) throw TypeError(e2 + " is not iterable!");
      if (a(k)) {
        for (p = s(e2.length); p > y; y++) if ((h = t2 ? C(i(m = e2[y])[0], m[1]) : C(e2[y])) === d || h === u) return h;
      } else for (v = k.call(e2); !(m = v.next()).done; ) if ((h = o(v, C, m.value, t2)) === d || h === u) return h;
    };
    t.BREAK = d, t.RETURN = u;
  }, function(e, t) {
    e.exports = function(e2, t2, r) {
      var n = void 0 === r;
      switch (t2.length) {
        case 0:
          return n ? e2() : e2.call(r);
        case 1:
          return n ? e2(t2[0]) : e2.call(r, t2[0]);
        case 2:
          return n ? e2(t2[0], t2[1]) : e2.call(r, t2[0], t2[1]);
        case 3:
          return n ? e2(t2[0], t2[1], t2[2]) : e2.call(r, t2[0], t2[1], t2[2]);
        case 4:
          return n ? e2(t2[0], t2[1], t2[2], t2[3]) : e2.call(r, t2[0], t2[1], t2[2], t2[3]);
      }
      return e2.apply(r, t2);
    };
  }, function(e, t, r) {
    var n = r(1), o = r(59).set, a = n.MutationObserver || n.WebKitMutationObserver, i = n.process, s = n.Promise, c = "process" == r(19)(i);
    e.exports = function() {
      var e2, t2, r2, d = function() {
        var n2, o2;
        for (c && (n2 = i.domain) && n2.exit(); e2; ) {
          o2 = e2.fn, e2 = e2.next;
          try {
            o2();
          } catch (n3) {
            throw e2 ? r2() : t2 = void 0, n3;
          }
        }
        t2 = void 0, n2 && n2.enter();
      };
      if (c) r2 = function() {
        i.nextTick(d);
      };
      else if (!a || n.navigator && n.navigator.standalone) if (s && s.resolve) {
        var u = s.resolve(void 0);
        r2 = function() {
          u.then(d);
        };
      } else r2 = function() {
        o.call(n, d);
      };
      else {
        var l = true, f = document.createTextNode("");
        new a(d).observe(f, { characterData: true }), r2 = function() {
          f.data = l = !l;
        };
      }
      return function(n2) {
        var o2 = { fn: n2, next: void 0 };
        t2 && (t2.next = o2), e2 || (e2 = o2, r2()), t2 = o2;
      };
    };
  }, function(e, t, r) {
    var n = r(1), o = n.navigator;
    e.exports = o && o.userAgent || "";
  }, function(e, t, r) {
    var n = r(9);
    e.exports = function(e2, t2, r2) {
      for (var o in t2) r2 && e2[o] ? e2[o] = t2[o] : n(e2, o, t2[o]);
      return e2;
    };
  }, function(e, t, r) {
    var n = r(1), o = r(0), a = r(4), i = r(8), s = r(2)("species");
    e.exports = function(e2) {
      var t2 = "function" == typeof o[e2] ? o[e2] : n[e2];
      i && t2 && !t2[s] && a.f(t2, s, { configurable: true, get: function() {
        return this;
      } });
    };
  }, function(e, t, r) {
    var n = r(3), o = r(0), a = r(1), i = r(58), s = r(61);
    n(n.P + n.R, "Promise", { finally: function(e2) {
      var t2 = i(this, o.Promise || a.Promise), r2 = "function" == typeof e2;
      return this.then(r2 ? function(r3) {
        return s(t2, e2()).then(function() {
          return r3;
        });
      } : e2, r2 ? function(r3) {
        return s(t2, e2()).then(function() {
          throw r3;
        });
      } : e2);
    } });
  }, function(e, t, r) {
    var n = r(3), o = r(36), a = r(60);
    n(n.S, "Promise", { try: function(e2) {
      var t2 = o.f(this), r2 = a(e2);
      return (r2.e ? t2.reject : t2.resolve)(r2.v), t2.promise;
    } });
  }, function(e, t, r) {
    var n = /* @__PURE__ */ function() {
      return this;
    }() || Function("return this")(), o = n.regeneratorRuntime && Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime") >= 0, a = o && n.regeneratorRuntime;
    if (n.regeneratorRuntime = void 0, e.exports = r(95), o) n.regeneratorRuntime = a;
    else try {
      delete n.regeneratorRuntime;
    } catch (e2) {
      n.regeneratorRuntime = void 0;
    }
  }, function(e, t) {
    !function(t2) {
      function r(e2, t3, r2, n2) {
        var a2 = t3 && t3.prototype instanceof o ? t3 : o, i2 = Object.create(a2.prototype), s2 = new p(n2 || []);
        return i2._invoke = d(e2, r2, s2), i2;
      }
      function n(e2, t3, r2) {
        try {
          return { type: "normal", arg: e2.call(t3, r2) };
        } catch (e3) {
          return { type: "throw", arg: e3 };
        }
      }
      function o() {
      }
      function a() {
      }
      function i() {
      }
      function s(e2) {
        ["next", "throw", "return"].forEach(function(t3) {
          e2[t3] = function(e3) {
            return this._invoke(t3, e3);
          };
        });
      }
      function c(e2) {
        function t3(r3, o3, a2, i2) {
          var s2 = n(e2[r3], e2, o3);
          if ("throw" !== s2.type) {
            var c2 = s2.arg, d2 = c2.value;
            return d2 && "object" == typeof d2 && C.call(d2, "__await") ? Promise.resolve(d2.__await).then(function(e3) {
              t3("next", e3, a2, i2);
            }, function(e3) {
              t3("throw", e3, a2, i2);
            }) : Promise.resolve(d2).then(function(e3) {
              c2.value = e3, a2(c2);
            }, i2);
          }
          i2(s2.arg);
        }
        function r2(e3, r3) {
          function n2() {
            return new Promise(function(n3, o3) {
              t3(e3, r3, n3, o3);
            });
          }
          return o2 = o2 ? o2.then(n2, n2) : n2();
        }
        var o2;
        this._invoke = r2;
      }
      function d(e2, t3, r2) {
        var o2 = S;
        return function(a2, i2) {
          if (o2 === x) throw new Error("Generator is already running");
          if (o2 === R) {
            if ("throw" === a2) throw i2;
            return v();
          }
          for (r2.method = a2, r2.arg = i2; ; ) {
            var s2 = r2.delegate;
            if (s2) {
              var c2 = u(s2, r2);
              if (c2) {
                if (c2 === E) continue;
                return c2;
              }
            }
            if ("next" === r2.method) r2.sent = r2._sent = r2.arg;
            else if ("throw" === r2.method) {
              if (o2 === S) throw o2 = R, r2.arg;
              r2.dispatchException(r2.arg);
            } else "return" === r2.method && r2.abrupt("return", r2.arg);
            o2 = x;
            var d2 = n(e2, t3, r2);
            if ("normal" === d2.type) {
              if (o2 = r2.done ? R : T, d2.arg === E) continue;
              return { value: d2.arg, done: r2.done };
            }
            "throw" === d2.type && (o2 = R, r2.method = "throw", r2.arg = d2.arg);
          }
        };
      }
      function u(e2, t3) {
        var r2 = e2.iterator[t3.method];
        if (r2 === h) {
          if (t3.delegate = null, "throw" === t3.method) {
            if (e2.iterator.return && (t3.method = "return", t3.arg = h, u(e2, t3), "throw" === t3.method)) return E;
            t3.method = "throw", t3.arg = new TypeError("The iterator does not provide a 'throw' method");
          }
          return E;
        }
        var o2 = n(r2, e2.iterator, t3.arg);
        if ("throw" === o2.type) return t3.method = "throw", t3.arg = o2.arg, t3.delegate = null, E;
        var a2 = o2.arg;
        return a2 ? a2.done ? (t3[e2.resultName] = a2.value, t3.next = e2.nextLoc, "return" !== t3.method && (t3.method = "next", t3.arg = h), t3.delegate = null, E) : a2 : (t3.method = "throw", t3.arg = new TypeError("iterator result is not an object"), t3.delegate = null, E);
      }
      function l(e2) {
        var t3 = { tryLoc: e2[0] };
        1 in e2 && (t3.catchLoc = e2[1]), 2 in e2 && (t3.finallyLoc = e2[2], t3.afterLoc = e2[3]), this.tryEntries.push(t3);
      }
      function f(e2) {
        var t3 = e2.completion || {};
        t3.type = "normal", delete t3.arg, e2.completion = t3;
      }
      function p(e2) {
        this.tryEntries = [{ tryLoc: "root" }], e2.forEach(l, this), this.reset(true);
      }
      function m(e2) {
        if (e2) {
          var t3 = e2[g];
          if (t3) return t3.call(e2);
          if ("function" == typeof e2.next) return e2;
          if (!isNaN(e2.length)) {
            var r2 = -1, n2 = function t4() {
              for (; ++r2 < e2.length; ) if (C.call(e2, r2)) return t4.value = e2[r2], t4.done = false, t4;
              return t4.value = h, t4.done = true, t4;
            };
            return n2.next = n2;
          }
        }
        return { next: v };
      }
      function v() {
        return { value: h, done: true };
      }
      var h, k = Object.prototype, C = k.hasOwnProperty, y = "function" == typeof Symbol ? Symbol : {}, g = y.iterator || "@@iterator", P = y.asyncIterator || "@@asyncIterator", w = y.toStringTag || "@@toStringTag", B = "object" == typeof e, b = t2.regeneratorRuntime;
      if (b) return void (B && (e.exports = b));
      b = t2.regeneratorRuntime = B ? e.exports : {}, b.wrap = r;
      var S = "suspendedStart", T = "suspendedYield", x = "executing", R = "completed", E = {}, _ = {};
      _[g] = function() {
        return this;
      };
      var M = Object.getPrototypeOf, O = M && M(M(m([])));
      O && O !== k && C.call(O, g) && (_ = O);
      var L = i.prototype = o.prototype = Object.create(_);
      a.prototype = L.constructor = i, i.constructor = a, i[w] = a.displayName = "GeneratorFunction", b.isGeneratorFunction = function(e2) {
        var t3 = "function" == typeof e2 && e2.constructor;
        return !!t3 && (t3 === a || "GeneratorFunction" === (t3.displayName || t3.name));
      }, b.mark = function(e2) {
        return Object.setPrototypeOf ? Object.setPrototypeOf(e2, i) : (e2.__proto__ = i, w in e2 || (e2[w] = "GeneratorFunction")), e2.prototype = Object.create(L), e2;
      }, b.awrap = function(e2) {
        return { __await: e2 };
      }, s(c.prototype), c.prototype[P] = function() {
        return this;
      }, b.AsyncIterator = c, b.async = function(e2, t3, n2, o2) {
        var a2 = new c(r(e2, t3, n2, o2));
        return b.isGeneratorFunction(t3) ? a2 : a2.next().then(function(e3) {
          return e3.done ? e3.value : a2.next();
        });
      }, s(L), L[w] = "Generator", L[g] = function() {
        return this;
      }, L.toString = function() {
        return "[object Generator]";
      }, b.keys = function(e2) {
        var t3 = [];
        for (var r2 in e2) t3.push(r2);
        return t3.reverse(), function r3() {
          for (; t3.length; ) {
            var n2 = t3.pop();
            if (n2 in e2) return r3.value = n2, r3.done = false, r3;
          }
          return r3.done = true, r3;
        };
      }, b.values = m, p.prototype = { constructor: p, reset: function(e2) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = h, this.done = false, this.delegate = null, this.method = "next", this.arg = h, this.tryEntries.forEach(f), !e2) for (var t3 in this) "t" === t3.charAt(0) && C.call(this, t3) && !isNaN(+t3.slice(1)) && (this[t3] = h);
      }, stop: function() {
        this.done = true;
        var e2 = this.tryEntries[0], t3 = e2.completion;
        if ("throw" === t3.type) throw t3.arg;
        return this.rval;
      }, dispatchException: function(e2) {
        function t3(t4, n3) {
          return a2.type = "throw", a2.arg = e2, r2.next = t4, n3 && (r2.method = "next", r2.arg = h), !!n3;
        }
        if (this.done) throw e2;
        for (var r2 = this, n2 = this.tryEntries.length - 1; n2 >= 0; --n2) {
          var o2 = this.tryEntries[n2], a2 = o2.completion;
          if ("root" === o2.tryLoc) return t3("end");
          if (o2.tryLoc <= this.prev) {
            var i2 = C.call(o2, "catchLoc"), s2 = C.call(o2, "finallyLoc");
            if (i2 && s2) {
              if (this.prev < o2.catchLoc) return t3(o2.catchLoc, true);
              if (this.prev < o2.finallyLoc) return t3(o2.finallyLoc);
            } else if (i2) {
              if (this.prev < o2.catchLoc) return t3(o2.catchLoc, true);
            } else {
              if (!s2) throw new Error("try statement without catch or finally");
              if (this.prev < o2.finallyLoc) return t3(o2.finallyLoc);
            }
          }
        }
      }, abrupt: function(e2, t3) {
        for (var r2 = this.tryEntries.length - 1; r2 >= 0; --r2) {
          var n2 = this.tryEntries[r2];
          if (n2.tryLoc <= this.prev && C.call(n2, "finallyLoc") && this.prev < n2.finallyLoc) {
            var o2 = n2;
            break;
          }
        }
        o2 && ("break" === e2 || "continue" === e2) && o2.tryLoc <= t3 && t3 <= o2.finallyLoc && (o2 = null);
        var a2 = o2 ? o2.completion : {};
        return a2.type = e2, a2.arg = t3, o2 ? (this.method = "next", this.next = o2.finallyLoc, E) : this.complete(a2);
      }, complete: function(e2, t3) {
        if ("throw" === e2.type) throw e2.arg;
        return "break" === e2.type || "continue" === e2.type ? this.next = e2.arg : "return" === e2.type ? (this.rval = this.arg = e2.arg, this.method = "return", this.next = "end") : "normal" === e2.type && t3 && (this.next = t3), E;
      }, finish: function(e2) {
        for (var t3 = this.tryEntries.length - 1; t3 >= 0; --t3) {
          var r2 = this.tryEntries[t3];
          if (r2.finallyLoc === e2) return this.complete(r2.completion, r2.afterLoc), f(r2), E;
        }
      }, catch: function(e2) {
        for (var t3 = this.tryEntries.length - 1; t3 >= 0; --t3) {
          var r2 = this.tryEntries[t3];
          if (r2.tryLoc === e2) {
            var n2 = r2.completion;
            if ("throw" === n2.type) {
              var o2 = n2.arg;
              f(r2);
            }
            return o2;
          }
        }
        throw new Error("illegal catch attempt");
      }, delegateYield: function(e2, t3, r2) {
        return this.delegate = { iterator: m(e2), resultName: t3, nextLoc: r2 }, "next" === this.method && (this.arg = h), E;
      } };
    }(/* @__PURE__ */ function() {
      return this;
    }() || Function("return this")());
  }, function(e, t, r) {
    function n(e2) {
      var t2 = e2.color;
      return function(e3, r2) {
        var n2 = e3.topLeftCorner, o = e3.topRightCorner, a = e3.bottomLeftCorner, i = e3.bottomRightCorner;
        r2.strokeStyle = t2, r2.beginPath(), r2.moveTo(n2.x, n2.y), r2.lineTo(a.x, a.y), r2.lineTo(i.x, i.y), r2.lineTo(o.x, o.y), r2.lineTo(n2.x, n2.y), r2.closePath(), r2.stroke();
      };
    }
    t.a = n;
  }, function(e, t, r) {
    var n = r(11), o = r.n(n), a = r(12), i = r.n(a), s = r(63), c = r.n(s), d = r(98), u = r.n(d), l = r(102), f = r.n(l), p = r(64), m = r(42), v = r(38), h = function() {
      function e2(t2, r2) {
        c()(this, e2), this.videoEl = t2, this.stream = r2;
      }
      return u()(e2, [{ key: "stop", value: function() {
        this.stream.getTracks().forEach(function(e3) {
          return e3.stop();
        });
      } }, { key: "captureFrame", value: function() {
        return Object(m.c)(this.videoEl);
      } }]), e2;
    }(), k = true !== window.isSecureContext, C = !(navigator && (navigator.getUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia)), y = false;
    t.a = function() {
      var e2 = i()(o.a.mark(function e3(t2, r2) {
        var n2;
        return o.a.wrap(function(e4) {
          for (; ; ) switch (e4.prev = e4.next) {
            case 0:
              if (!k) {
                e4.next = 2;
                break;
              }
              throw new p.c();
            case 2:
              if (!C) {
                e4.next = 4;
                break;
              }
              throw new p.d();
            case 4:
              return false === y && (f()({ window }), y = true), e4.next = 7, navigator.mediaDevices.getUserMedia(t2);
            case 7:
              return n2 = e4.sent, void 0 !== r2.srcObject ? r2.srcObject = n2 : void 0 !== r2.mozSrcObject ? r2.mozSrcObject = n2 : window.URL.createObjectURL ? r2.src = window.URL.createObjectURL(n2) : window.webkitURL ? r2.src = window.webkitURL.createObjectURL(n2) : r2.src = n2, e4.next = 11, Object(v.a)(r2, "loadeddata");
            case 11:
              return e4.abrupt("return", new h(r2, n2));
            case 12:
            case "end":
              return e4.stop();
          }
        }, e3, this);
      }));
      return function(t2, r2) {
        return e2.apply(this, arguments);
      };
    }();
  }, function(e, t, r) {
    t.__esModule = true;
    var n = r(99), o = function(e2) {
      return e2 && e2.__esModule ? e2 : { default: e2 };
    }(n);
    t.default = /* @__PURE__ */ function() {
      function e2(e3, t2) {
        for (var r2 = 0; r2 < t2.length; r2++) {
          var n2 = t2[r2];
          n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), (0, o.default)(e3, n2.key, n2);
        }
      }
      return function(t2, r2, n2) {
        return r2 && e2(t2.prototype, r2), n2 && e2(t2, n2), t2;
      };
    }();
  }, function(e, t, r) {
    e.exports = { default: r(100), __esModule: true };
  }, function(e, t, r) {
    r(101);
    var n = r(0).Object;
    e.exports = function(e2, t2, r2) {
      return n.defineProperty(e2, t2, r2);
    };
  }, function(e, t, r) {
    var n = r(3);
    n(n.S + n.F * !r(8), "Object", { defineProperty: r(4).f });
  }, function(e, t, r) {
    var n = r(6);
    e.exports = function(e2, t2) {
      var o = e2 && e2.window, a = { shimChrome: true, shimFirefox: true, shimEdge: true, shimSafari: true };
      for (var i in t2) hasOwnProperty.call(t2, i) && (a[i] = t2[i]);
      var s = n.log, c = n.detectBrowser(o), d = r(103) || null, u = r(105) || null, l = r(110) || null, f = r(112) || null, p = r(113) || null, m = { browserDetails: c, commonShim: p, extractVersion: n.extractVersion, disableLog: n.disableLog, disableWarnings: n.disableWarnings };
      switch (c.browser) {
        case "chrome":
          if (!d || !d.shimPeerConnection || !a.shimChrome) return s("Chrome shim is not included in this adapter release."), m;
          s("adapter.js shimming chrome."), m.browserShim = d, p.shimCreateObjectURL(o), d.shimGetUserMedia(o), d.shimMediaStream(o), d.shimSourceObject(o), d.shimPeerConnection(o), d.shimOnTrack(o), d.shimAddTrackRemoveTrack(o), d.shimGetSendersWithDtmf(o), d.shimSenderReceiverGetStats(o), d.fixNegotiationNeeded(o), p.shimRTCIceCandidate(o), p.shimMaxMessageSize(o), p.shimSendThrowTypeError(o);
          break;
        case "firefox":
          if (!l || !l.shimPeerConnection || !a.shimFirefox) return s("Firefox shim is not included in this adapter release."), m;
          s("adapter.js shimming firefox."), m.browserShim = l, p.shimCreateObjectURL(o), l.shimGetUserMedia(o), l.shimSourceObject(o), l.shimPeerConnection(o), l.shimOnTrack(o), l.shimRemoveStream(o), l.shimSenderGetStats(o), l.shimReceiverGetStats(o), l.shimRTCDataChannel(o), p.shimRTCIceCandidate(o), p.shimMaxMessageSize(o), p.shimSendThrowTypeError(o);
          break;
        case "edge":
          if (!u || !u.shimPeerConnection || !a.shimEdge) return s("MS edge shim is not included in this adapter release."), m;
          s("adapter.js shimming edge."), m.browserShim = u, p.shimCreateObjectURL(o), u.shimGetUserMedia(o), u.shimPeerConnection(o), u.shimReplaceTrack(o), u.shimGetDisplayMedia(o), p.shimMaxMessageSize(o), p.shimSendThrowTypeError(o);
          break;
        case "safari":
          if (!f || !a.shimSafari) return s("Safari shim is not included in this adapter release."), m;
          s("adapter.js shimming safari."), m.browserShim = f, p.shimCreateObjectURL(o), f.shimRTCIceServerUrls(o), f.shimCreateOfferLegacy(o), f.shimCallbacksAPI(o), f.shimLocalStreamsAPI(o), f.shimRemoteStreamsAPI(o), f.shimTrackEventTransceiver(o), f.shimGetUserMedia(o), p.shimRTCIceCandidate(o), p.shimMaxMessageSize(o), p.shimSendThrowTypeError(o);
          break;
        default:
          s("Unsupported browser!");
      }
      return m;
    };
  }, function(e, t, r) {
    function n(e2, t2, r2) {
      t2 && !r2.has(t2.id) && (r2.set(t2.id, t2), Object.keys(t2).forEach(function(o2) {
        o2.endsWith("Id") ? n(e2, e2.get(t2[o2]), r2) : o2.endsWith("Ids") && t2[o2].forEach(function(t3) {
          n(e2, e2.get(t3), r2);
        });
      }));
    }
    function o(e2, t2, r2) {
      var o2 = r2 ? "outbound-rtp" : "inbound-rtp", a2 = /* @__PURE__ */ new Map();
      if (null === t2) return a2;
      var i2 = [];
      return e2.forEach(function(e3) {
        "track" === e3.type && e3.trackIdentifier === t2.id && i2.push(e3);
      }), i2.forEach(function(t3) {
        e2.forEach(function(r3) {
          r3.type === o2 && r3.trackId === t3.id && n(e2, r3, a2);
        });
      }), a2;
    }
    var a = r(6), i = a.log;
    e.exports = { shimGetUserMedia: r(104), shimMediaStream: function(e2) {
      e2.MediaStream = e2.MediaStream || e2.webkitMediaStream;
    }, shimOnTrack: function(e2) {
      if ("object" != typeof e2 || !e2.RTCPeerConnection || "ontrack" in e2.RTCPeerConnection.prototype) a.wrapPeerConnectionEvent(e2, "track", function(e3) {
        return e3.transceiver || Object.defineProperty(e3, "transceiver", { value: { receiver: e3.receiver } }), e3;
      });
      else {
        Object.defineProperty(e2.RTCPeerConnection.prototype, "ontrack", { get: function() {
          return this._ontrack;
        }, set: function(e3) {
          this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e3);
        }, enumerable: true, configurable: true });
        var t2 = e2.RTCPeerConnection.prototype.setRemoteDescription;
        e2.RTCPeerConnection.prototype.setRemoteDescription = function() {
          var r2 = this;
          return r2._ontrackpoly || (r2._ontrackpoly = function(t3) {
            t3.stream.addEventListener("addtrack", function(n2) {
              var o2;
              o2 = e2.RTCPeerConnection.prototype.getReceivers ? r2.getReceivers().find(function(e3) {
                return e3.track && e3.track.id === n2.track.id;
              }) : { track: n2.track };
              var a2 = new Event("track");
              a2.track = n2.track, a2.receiver = o2, a2.transceiver = { receiver: o2 }, a2.streams = [t3.stream], r2.dispatchEvent(a2);
            }), t3.stream.getTracks().forEach(function(n2) {
              var o2;
              o2 = e2.RTCPeerConnection.prototype.getReceivers ? r2.getReceivers().find(function(e3) {
                return e3.track && e3.track.id === n2.id;
              }) : { track: n2 };
              var a2 = new Event("track");
              a2.track = n2, a2.receiver = o2, a2.transceiver = { receiver: o2 }, a2.streams = [t3.stream], r2.dispatchEvent(a2);
            });
          }, r2.addEventListener("addstream", r2._ontrackpoly)), t2.apply(r2, arguments);
        };
      }
    }, shimGetSendersWithDtmf: function(e2) {
      if ("object" == typeof e2 && e2.RTCPeerConnection && !("getSenders" in e2.RTCPeerConnection.prototype) && "createDTMFSender" in e2.RTCPeerConnection.prototype) {
        var t2 = function(e3, t3) {
          return { track: t3, get dtmf() {
            return void 0 === this._dtmf && ("audio" === t3.kind ? this._dtmf = e3.createDTMFSender(t3) : this._dtmf = null), this._dtmf;
          }, _pc: e3 };
        };
        if (!e2.RTCPeerConnection.prototype.getSenders) {
          e2.RTCPeerConnection.prototype.getSenders = function() {
            return this._senders = this._senders || [], this._senders.slice();
          };
          var r2 = e2.RTCPeerConnection.prototype.addTrack;
          e2.RTCPeerConnection.prototype.addTrack = function(e3, n3) {
            var o3 = this, a3 = r2.apply(o3, arguments);
            return a3 || (a3 = t2(o3, e3), o3._senders.push(a3)), a3;
          };
          var n2 = e2.RTCPeerConnection.prototype.removeTrack;
          e2.RTCPeerConnection.prototype.removeTrack = function(e3) {
            var t3 = this;
            n2.apply(t3, arguments);
            var r3 = t3._senders.indexOf(e3);
            -1 !== r3 && t3._senders.splice(r3, 1);
          };
        }
        var o2 = e2.RTCPeerConnection.prototype.addStream;
        e2.RTCPeerConnection.prototype.addStream = function(e3) {
          var r3 = this;
          r3._senders = r3._senders || [], o2.apply(r3, [e3]), e3.getTracks().forEach(function(e4) {
            r3._senders.push(t2(r3, e4));
          });
        };
        var a2 = e2.RTCPeerConnection.prototype.removeStream;
        e2.RTCPeerConnection.prototype.removeStream = function(e3) {
          var t3 = this;
          t3._senders = t3._senders || [], a2.apply(t3, [e3]), e3.getTracks().forEach(function(e4) {
            var r3 = t3._senders.find(function(t4) {
              return t4.track === e4;
            });
            r3 && t3._senders.splice(t3._senders.indexOf(r3), 1);
          });
        };
      } else if ("object" == typeof e2 && e2.RTCPeerConnection && "getSenders" in e2.RTCPeerConnection.prototype && "createDTMFSender" in e2.RTCPeerConnection.prototype && e2.RTCRtpSender && !("dtmf" in e2.RTCRtpSender.prototype)) {
        var i2 = e2.RTCPeerConnection.prototype.getSenders;
        e2.RTCPeerConnection.prototype.getSenders = function() {
          var e3 = this, t3 = i2.apply(e3, []);
          return t3.forEach(function(t4) {
            t4._pc = e3;
          }), t3;
        }, Object.defineProperty(e2.RTCRtpSender.prototype, "dtmf", { get: function() {
          return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf;
        } });
      }
    }, shimSenderReceiverGetStats: function(e2) {
      if ("object" == typeof e2 && e2.RTCPeerConnection && e2.RTCRtpSender && e2.RTCRtpReceiver) {
        if (!("getStats" in e2.RTCRtpSender.prototype)) {
          var t2 = e2.RTCPeerConnection.prototype.getSenders;
          t2 && (e2.RTCPeerConnection.prototype.getSenders = function() {
            var e3 = this, r3 = t2.apply(e3, []);
            return r3.forEach(function(t3) {
              t3._pc = e3;
            }), r3;
          });
          var r2 = e2.RTCPeerConnection.prototype.addTrack;
          r2 && (e2.RTCPeerConnection.prototype.addTrack = function() {
            var e3 = r2.apply(this, arguments);
            return e3._pc = this, e3;
          }), e2.RTCRtpSender.prototype.getStats = function() {
            var e3 = this;
            return this._pc.getStats().then(function(t3) {
              return o(t3, e3.track, true);
            });
          };
        }
        if (!("getStats" in e2.RTCRtpReceiver.prototype)) {
          var n2 = e2.RTCPeerConnection.prototype.getReceivers;
          n2 && (e2.RTCPeerConnection.prototype.getReceivers = function() {
            var e3 = this, t3 = n2.apply(e3, []);
            return t3.forEach(function(t4) {
              t4._pc = e3;
            }), t3;
          }), a.wrapPeerConnectionEvent(e2, "track", function(e3) {
            return e3.receiver._pc = e3.srcElement, e3;
          }), e2.RTCRtpReceiver.prototype.getStats = function() {
            var e3 = this;
            return this._pc.getStats().then(function(t3) {
              return o(t3, e3.track, false);
            });
          };
        }
        if ("getStats" in e2.RTCRtpSender.prototype && "getStats" in e2.RTCRtpReceiver.prototype) {
          var i2 = e2.RTCPeerConnection.prototype.getStats;
          e2.RTCPeerConnection.prototype.getStats = function() {
            var t3 = this;
            if (arguments.length > 0 && arguments[0] instanceof e2.MediaStreamTrack) {
              var r3, n3, o2, a2 = arguments[0];
              return t3.getSenders().forEach(function(e3) {
                e3.track === a2 && (r3 ? o2 = true : r3 = e3);
              }), t3.getReceivers().forEach(function(e3) {
                return e3.track === a2 && (n3 ? o2 = true : n3 = e3), e3.track === a2;
              }), o2 || r3 && n3 ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : r3 ? r3.getStats() : n3 ? n3.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"));
            }
            return i2.apply(t3, arguments);
          };
        }
      }
    }, shimSourceObject: function(e2) {
      var t2 = e2 && e2.URL;
      "object" == typeof e2 && (!e2.HTMLMediaElement || "srcObject" in e2.HTMLMediaElement.prototype || Object.defineProperty(e2.HTMLMediaElement.prototype, "srcObject", { get: function() {
        return this._srcObject;
      }, set: function(e3) {
        var r2 = this;
        if (this._srcObject = e3, this.src && t2.revokeObjectURL(this.src), !e3) return void (this.src = "");
        this.src = t2.createObjectURL(e3), e3.addEventListener("addtrack", function() {
          r2.src && t2.revokeObjectURL(r2.src), r2.src = t2.createObjectURL(e3);
        }), e3.addEventListener("removetrack", function() {
          r2.src && t2.revokeObjectURL(r2.src), r2.src = t2.createObjectURL(e3);
        });
      } }));
    }, shimAddTrackRemoveTrackWithNative: function(e2) {
      e2.RTCPeerConnection.prototype.getLocalStreams = function() {
        var e3 = this;
        return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map(function(t3) {
          return e3._shimmedLocalStreams[t3][0];
        });
      };
      var t2 = e2.RTCPeerConnection.prototype.addTrack;
      e2.RTCPeerConnection.prototype.addTrack = function(e3, r3) {
        if (!r3) return t2.apply(this, arguments);
        this._shimmedLocalStreams = this._shimmedLocalStreams || {};
        var n3 = t2.apply(this, arguments);
        return this._shimmedLocalStreams[r3.id] ? -1 === this._shimmedLocalStreams[r3.id].indexOf(n3) && this._shimmedLocalStreams[r3.id].push(n3) : this._shimmedLocalStreams[r3.id] = [r3, n3], n3;
      };
      var r2 = e2.RTCPeerConnection.prototype.addStream;
      e2.RTCPeerConnection.prototype.addStream = function(e3) {
        var t3 = this;
        this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e3.getTracks().forEach(function(e4) {
          if (t3.getSenders().find(function(t4) {
            return t4.track === e4;
          })) throw new DOMException("Track already exists.", "InvalidAccessError");
        });
        var n3 = t3.getSenders();
        r2.apply(this, arguments);
        var o3 = t3.getSenders().filter(function(e4) {
          return -1 === n3.indexOf(e4);
        });
        this._shimmedLocalStreams[e3.id] = [e3].concat(o3);
      };
      var n2 = e2.RTCPeerConnection.prototype.removeStream;
      e2.RTCPeerConnection.prototype.removeStream = function(e3) {
        return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[e3.id], n2.apply(this, arguments);
      };
      var o2 = e2.RTCPeerConnection.prototype.removeTrack;
      e2.RTCPeerConnection.prototype.removeTrack = function(e3) {
        var t3 = this;
        return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e3 && Object.keys(this._shimmedLocalStreams).forEach(function(r3) {
          var n3 = t3._shimmedLocalStreams[r3].indexOf(e3);
          -1 !== n3 && t3._shimmedLocalStreams[r3].splice(n3, 1), 1 === t3._shimmedLocalStreams[r3].length && delete t3._shimmedLocalStreams[r3];
        }), o2.apply(this, arguments);
      };
    }, shimAddTrackRemoveTrack: function(e2) {
      function t2(e3, t3) {
        var r3 = t3.sdp;
        return Object.keys(e3._reverseStreams || []).forEach(function(t4) {
          var n3 = e3._reverseStreams[t4], o3 = e3._streams[n3.id];
          r3 = r3.replace(new RegExp(o3.id, "g"), n3.id);
        }), new RTCSessionDescription({ type: t3.type, sdp: r3 });
      }
      function r2(e3, t3) {
        var r3 = t3.sdp;
        return Object.keys(e3._reverseStreams || []).forEach(function(t4) {
          var n3 = e3._reverseStreams[t4], o3 = e3._streams[n3.id];
          r3 = r3.replace(new RegExp(n3.id, "g"), o3.id);
        }), new RTCSessionDescription({ type: t3.type, sdp: r3 });
      }
      if (e2.RTCPeerConnection) {
        var n2 = a.detectBrowser(e2);
        if (e2.RTCPeerConnection.prototype.addTrack && n2.version >= 65) return this.shimAddTrackRemoveTrackWithNative(e2);
        var o2 = e2.RTCPeerConnection.prototype.getLocalStreams;
        e2.RTCPeerConnection.prototype.getLocalStreams = function() {
          var e3 = this, t3 = o2.apply(this);
          return e3._reverseStreams = e3._reverseStreams || {}, t3.map(function(t4) {
            return e3._reverseStreams[t4.id];
          });
        };
        var i2 = e2.RTCPeerConnection.prototype.addStream;
        e2.RTCPeerConnection.prototype.addStream = function(t3) {
          var r3 = this;
          if (r3._streams = r3._streams || {}, r3._reverseStreams = r3._reverseStreams || {}, t3.getTracks().forEach(function(e3) {
            if (r3.getSenders().find(function(t4) {
              return t4.track === e3;
            })) throw new DOMException("Track already exists.", "InvalidAccessError");
          }), !r3._reverseStreams[t3.id]) {
            var n3 = new e2.MediaStream(t3.getTracks());
            r3._streams[t3.id] = n3, r3._reverseStreams[n3.id] = t3, t3 = n3;
          }
          i2.apply(r3, [t3]);
        };
        var s = e2.RTCPeerConnection.prototype.removeStream;
        e2.RTCPeerConnection.prototype.removeStream = function(e3) {
          var t3 = this;
          t3._streams = t3._streams || {}, t3._reverseStreams = t3._reverseStreams || {}, s.apply(t3, [t3._streams[e3.id] || e3]), delete t3._reverseStreams[t3._streams[e3.id] ? t3._streams[e3.id].id : e3.id], delete t3._streams[e3.id];
        }, e2.RTCPeerConnection.prototype.addTrack = function(t3, r3) {
          var n3 = this;
          if ("closed" === n3.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
          var o3 = [].slice.call(arguments, 1);
          if (1 !== o3.length || !o3[0].getTracks().find(function(e3) {
            return e3 === t3;
          })) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
          if (n3.getSenders().find(function(e3) {
            return e3.track === t3;
          })) throw new DOMException("Track already exists.", "InvalidAccessError");
          n3._streams = n3._streams || {}, n3._reverseStreams = n3._reverseStreams || {};
          var a2 = n3._streams[r3.id];
          if (a2) a2.addTrack(t3), Promise.resolve().then(function() {
            n3.dispatchEvent(new Event("negotiationneeded"));
          });
          else {
            var i3 = new e2.MediaStream([t3]);
            n3._streams[r3.id] = i3, n3._reverseStreams[i3.id] = r3, n3.addStream(i3);
          }
          return n3.getSenders().find(function(e3) {
            return e3.track === t3;
          });
        }, ["createOffer", "createAnswer"].forEach(function(r3) {
          var n3 = e2.RTCPeerConnection.prototype[r3];
          e2.RTCPeerConnection.prototype[r3] = function() {
            var e3 = this, r4 = arguments;
            return arguments.length && "function" == typeof arguments[0] ? n3.apply(e3, [function(n4) {
              var o3 = t2(e3, n4);
              r4[0].apply(null, [o3]);
            }, function(e4) {
              r4[1] && r4[1].apply(null, e4);
            }, arguments[2]]) : n3.apply(e3, arguments).then(function(r5) {
              return t2(e3, r5);
            });
          };
        });
        var c = e2.RTCPeerConnection.prototype.setLocalDescription;
        e2.RTCPeerConnection.prototype.setLocalDescription = function() {
          var e3 = this;
          return arguments.length && arguments[0].type ? (arguments[0] = r2(e3, arguments[0]), c.apply(e3, arguments)) : c.apply(e3, arguments);
        };
        var d = Object.getOwnPropertyDescriptor(e2.RTCPeerConnection.prototype, "localDescription");
        Object.defineProperty(e2.RTCPeerConnection.prototype, "localDescription", { get: function() {
          var e3 = this, r3 = d.get.apply(this);
          return "" === r3.type ? r3 : t2(e3, r3);
        } }), e2.RTCPeerConnection.prototype.removeTrack = function(e3) {
          var t3 = this;
          if ("closed" === t3.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
          if (!e3._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
          if (e3._pc !== t3) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
          t3._streams = t3._streams || {};
          var r3;
          Object.keys(t3._streams).forEach(function(n3) {
            t3._streams[n3].getTracks().find(function(t4) {
              return e3.track === t4;
            }) && (r3 = t3._streams[n3]);
          }), r3 && (1 === r3.getTracks().length ? t3.removeStream(t3._reverseStreams[r3.id]) : r3.removeTrack(e3.track), t3.dispatchEvent(new Event("negotiationneeded")));
        };
      }
    }, shimPeerConnection: function(e2) {
      var t2 = a.detectBrowser(e2);
      if (!e2.RTCPeerConnection && e2.webkitRTCPeerConnection && (e2.RTCPeerConnection = function(t3, r3) {
        return i("PeerConnection"), t3 && t3.iceTransportPolicy && (t3.iceTransports = t3.iceTransportPolicy), new e2.webkitRTCPeerConnection(t3, r3);
      }, e2.RTCPeerConnection.prototype = e2.webkitRTCPeerConnection.prototype, e2.webkitRTCPeerConnection.generateCertificate && Object.defineProperty(e2.RTCPeerConnection, "generateCertificate", { get: function() {
        return e2.webkitRTCPeerConnection.generateCertificate;
      } })), e2.RTCPeerConnection) {
        var r2 = e2.RTCPeerConnection.prototype.getStats;
        e2.RTCPeerConnection.prototype.getStats = function(e3, t3, n3) {
          var o2 = this, a2 = arguments;
          if (arguments.length > 0 && "function" == typeof e3) return r2.apply(this, arguments);
          if (0 === r2.length && (0 === arguments.length || "function" != typeof arguments[0])) return r2.apply(this, []);
          var i2 = function(e4) {
            var t4 = {};
            return e4.result().forEach(function(e5) {
              var r3 = { id: e5.id, timestamp: e5.timestamp, type: { localcandidate: "local-candidate", remotecandidate: "remote-candidate" }[e5.type] || e5.type };
              e5.names().forEach(function(t5) {
                r3[t5] = e5.stat(t5);
              }), t4[r3.id] = r3;
            }), t4;
          }, s = function(e4) {
            return new Map(Object.keys(e4).map(function(t4) {
              return [t4, e4[t4]];
            }));
          };
          if (arguments.length >= 2) {
            var c = function(e4) {
              a2[1](s(i2(e4)));
            };
            return r2.apply(this, [c, arguments[0]]);
          }
          return new Promise(function(e4, t4) {
            r2.apply(o2, [function(t5) {
              e4(s(i2(t5)));
            }, t4]);
          }).then(t3, n3);
        }, t2.version < 51 && ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t3) {
          var r3 = e2.RTCPeerConnection.prototype[t3];
          e2.RTCPeerConnection.prototype[t3] = function() {
            var e3 = arguments, t4 = this, n3 = new Promise(function(n4, o2) {
              r3.apply(t4, [e3[0], n4, o2]);
            });
            return e3.length < 2 ? n3 : n3.then(function() {
              e3[1].apply(null, []);
            }, function(t5) {
              e3.length >= 3 && e3[2].apply(null, [t5]);
            });
          };
        }), t2.version < 52 && ["createOffer", "createAnswer"].forEach(function(t3) {
          var r3 = e2.RTCPeerConnection.prototype[t3];
          e2.RTCPeerConnection.prototype[t3] = function() {
            var e3 = this;
            if (arguments.length < 1 || 1 === arguments.length && "object" == typeof arguments[0]) {
              var t4 = 1 === arguments.length ? arguments[0] : void 0;
              return new Promise(function(n3, o2) {
                r3.apply(e3, [n3, o2, t4]);
              });
            }
            return r3.apply(this, arguments);
          };
        }), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t3) {
          var r3 = e2.RTCPeerConnection.prototype[t3];
          e2.RTCPeerConnection.prototype[t3] = function() {
            return arguments[0] = new ("addIceCandidate" === t3 ? e2.RTCIceCandidate : e2.RTCSessionDescription)(arguments[0]), r3.apply(this, arguments);
          };
        });
        var n2 = e2.RTCPeerConnection.prototype.addIceCandidate;
        e2.RTCPeerConnection.prototype.addIceCandidate = function() {
          return arguments[0] ? n2.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
        };
      }
    }, fixNegotiationNeeded: function(e2) {
      a.wrapPeerConnectionEvent(e2, "negotiationneeded", function(e3) {
        if ("stable" === e3.target.signalingState) return e3;
      });
    }, shimGetDisplayMedia: function(e2, t2) {
      if (e2.navigator && e2.navigator.mediaDevices && !("getDisplayMedia" in e2.navigator.mediaDevices)) {
        if ("function" != typeof t2) return void console.error("shimGetDisplayMedia: getSourceId argument is not a function");
        e2.navigator.mediaDevices.getDisplayMedia = function(r2) {
          return t2(r2).then(function(t3) {
            var n2 = r2.video && r2.video.width, o2 = r2.video && r2.video.height, a2 = r2.video && r2.video.frameRate;
            return r2.video = { mandatory: { chromeMediaSource: "desktop", chromeMediaSourceId: t3, maxFrameRate: a2 || 3 } }, n2 && (r2.video.mandatory.maxWidth = n2), o2 && (r2.video.mandatory.maxHeight = o2), e2.navigator.mediaDevices.getUserMedia(r2);
          });
        }, e2.navigator.getDisplayMedia = function(t3) {
          return a.deprecated("navigator.getDisplayMedia", "navigator.mediaDevices.getDisplayMedia"), e2.navigator.mediaDevices.getDisplayMedia(t3);
        };
      }
    } };
  }, function(e, t, r) {
    var n = r(6), o = n.log;
    e.exports = function(e2) {
      var t2 = n.detectBrowser(e2), r2 = e2 && e2.navigator, a = function(e3) {
        if ("object" != typeof e3 || e3.mandatory || e3.optional) return e3;
        var t3 = {};
        return Object.keys(e3).forEach(function(r3) {
          if ("require" !== r3 && "advanced" !== r3 && "mediaSource" !== r3) {
            var n2 = "object" == typeof e3[r3] ? e3[r3] : { ideal: e3[r3] };
            void 0 !== n2.exact && "number" == typeof n2.exact && (n2.min = n2.max = n2.exact);
            var o2 = function(e4, t4) {
              return e4 ? e4 + t4.charAt(0).toUpperCase() + t4.slice(1) : "deviceId" === t4 ? "sourceId" : t4;
            };
            if (void 0 !== n2.ideal) {
              t3.optional = t3.optional || [];
              var a2 = {};
              "number" == typeof n2.ideal ? (a2[o2("min", r3)] = n2.ideal, t3.optional.push(a2), a2 = {}, a2[o2("max", r3)] = n2.ideal, t3.optional.push(a2)) : (a2[o2("", r3)] = n2.ideal, t3.optional.push(a2));
            }
            void 0 !== n2.exact && "number" != typeof n2.exact ? (t3.mandatory = t3.mandatory || {}, t3.mandatory[o2("", r3)] = n2.exact) : ["min", "max"].forEach(function(e4) {
              void 0 !== n2[e4] && (t3.mandatory = t3.mandatory || {}, t3.mandatory[o2(e4, r3)] = n2[e4]);
            });
          }
        }), e3.advanced && (t3.optional = (t3.optional || []).concat(e3.advanced)), t3;
      }, i = function(e3, n2) {
        if (t2.version >= 61) return n2(e3);
        if ((e3 = JSON.parse(JSON.stringify(e3))) && "object" == typeof e3.audio) {
          var i2 = function(e4, t3, r3) {
            t3 in e4 && !(r3 in e4) && (e4[r3] = e4[t3], delete e4[t3]);
          };
          e3 = JSON.parse(JSON.stringify(e3)), i2(e3.audio, "autoGainControl", "googAutoGainControl"), i2(e3.audio, "noiseSuppression", "googNoiseSuppression"), e3.audio = a(e3.audio);
        }
        if (e3 && "object" == typeof e3.video) {
          var s2 = e3.video.facingMode;
          s2 = s2 && ("object" == typeof s2 ? s2 : { ideal: s2 });
          var c2 = t2.version < 66;
          if (s2 && ("user" === s2.exact || "environment" === s2.exact || "user" === s2.ideal || "environment" === s2.ideal) && (!r2.mediaDevices.getSupportedConstraints || !r2.mediaDevices.getSupportedConstraints().facingMode || c2)) {
            delete e3.video.facingMode;
            var d2;
            if ("environment" === s2.exact || "environment" === s2.ideal ? d2 = ["back", "rear"] : "user" !== s2.exact && "user" !== s2.ideal || (d2 = ["front"]), d2) return r2.mediaDevices.enumerateDevices().then(function(t3) {
              t3 = t3.filter(function(e4) {
                return "videoinput" === e4.kind;
              });
              var r3 = t3.find(function(e4) {
                return d2.some(function(t4) {
                  return -1 !== e4.label.toLowerCase().indexOf(t4);
                });
              });
              return !r3 && t3.length && -1 !== d2.indexOf("back") && (r3 = t3[t3.length - 1]), r3 && (e3.video.deviceId = s2.exact ? { exact: r3.deviceId } : { ideal: r3.deviceId }), e3.video = a(e3.video), o("chrome: " + JSON.stringify(e3)), n2(e3);
            });
          }
          e3.video = a(e3.video);
        }
        return o("chrome: " + JSON.stringify(e3)), n2(e3);
      }, s = function(e3) {
        return t2.version >= 64 ? e3 : { name: { PermissionDeniedError: "NotAllowedError", PermissionDismissedError: "NotAllowedError", InvalidStateError: "NotAllowedError", DevicesNotFoundError: "NotFoundError", ConstraintNotSatisfiedError: "OverconstrainedError", TrackStartError: "NotReadableError", MediaDeviceFailedDueToShutdown: "NotAllowedError", MediaDeviceKillSwitchOn: "NotAllowedError", TabCaptureError: "AbortError", ScreenCaptureError: "AbortError", DeviceCaptureError: "AbortError" }[e3.name] || e3.name, message: e3.message, constraint: e3.constraint || e3.constraintName, toString: function() {
          return this.name + (this.message && ": ") + this.message;
        } };
      }, c = function(e3, t3, n2) {
        i(e3, function(e4) {
          r2.webkitGetUserMedia(e4, t3, function(e5) {
            n2 && n2(s(e5));
          });
        });
      };
      r2.getUserMedia = c;
      var d = function(e3) {
        return new Promise(function(t3, n2) {
          r2.getUserMedia(e3, t3, n2);
        });
      };
      if (r2.mediaDevices || (r2.mediaDevices = { getUserMedia: d, enumerateDevices: function() {
        return new Promise(function(t3) {
          var r3 = { audio: "audioinput", video: "videoinput" };
          return e2.MediaStreamTrack.getSources(function(e3) {
            t3(e3.map(function(e4) {
              return { label: e4.label, kind: r3[e4.kind], deviceId: e4.id, groupId: "" };
            }));
          });
        });
      }, getSupportedConstraints: function() {
        return { deviceId: true, echoCancellation: true, facingMode: true, frameRate: true, height: true, width: true };
      } }), r2.mediaDevices.getUserMedia) {
        var u = r2.mediaDevices.getUserMedia.bind(r2.mediaDevices);
        r2.mediaDevices.getUserMedia = function(e3) {
          return i(e3, function(e4) {
            return u(e4).then(function(t3) {
              if (e4.audio && !t3.getAudioTracks().length || e4.video && !t3.getVideoTracks().length) throw t3.getTracks().forEach(function(e5) {
                e5.stop();
              }), new DOMException("", "NotFoundError");
              return t3;
            }, function(e5) {
              return Promise.reject(s(e5));
            });
          });
        };
      } else r2.mediaDevices.getUserMedia = function(e3) {
        return d(e3);
      };
      void 0 === r2.mediaDevices.addEventListener && (r2.mediaDevices.addEventListener = function() {
        o("Dummy mediaDevices.addEventListener called.");
      }), void 0 === r2.mediaDevices.removeEventListener && (r2.mediaDevices.removeEventListener = function() {
        o("Dummy mediaDevices.removeEventListener called.");
      });
    };
  }, function(e, t, r) {
    var n = r(6), o = r(106), a = r(107);
    e.exports = { shimGetUserMedia: r(109), shimPeerConnection: function(e2) {
      var t2 = n.detectBrowser(e2);
      if (e2.RTCIceGatherer && (e2.RTCIceCandidate || (e2.RTCIceCandidate = function(e3) {
        return e3;
      }), e2.RTCSessionDescription || (e2.RTCSessionDescription = function(e3) {
        return e3;
      }), t2.version < 15025)) {
        var r2 = Object.getOwnPropertyDescriptor(e2.MediaStreamTrack.prototype, "enabled");
        Object.defineProperty(e2.MediaStreamTrack.prototype, "enabled", { set: function(e3) {
          r2.set.call(this, e3);
          var t3 = new Event("enabled");
          t3.enabled = e3, this.dispatchEvent(t3);
        } });
      }
      !e2.RTCRtpSender || "dtmf" in e2.RTCRtpSender.prototype || Object.defineProperty(e2.RTCRtpSender.prototype, "dtmf", { get: function() {
        return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new e2.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null)), this._dtmf;
      } }), e2.RTCDtmfSender && !e2.RTCDTMFSender && (e2.RTCDTMFSender = e2.RTCDtmfSender);
      var i = a(e2, t2.version);
      e2.RTCPeerConnection = function(e3) {
        return e3 && e3.iceServers && (e3.iceServers = o(e3.iceServers)), new i(e3);
      }, e2.RTCPeerConnection.prototype = i.prototype;
    }, shimReplaceTrack: function(e2) {
      !e2.RTCRtpSender || "replaceTrack" in e2.RTCRtpSender.prototype || (e2.RTCRtpSender.prototype.replaceTrack = e2.RTCRtpSender.prototype.setTrack);
    }, shimGetDisplayMedia: function(e2, t2) {
      if ("getDisplayMedia" in e2.navigator && e2.navigator.mediaDevices && !("getDisplayMedia" in e2.navigator.mediaDevices)) {
        var r2 = e2.navigator.getDisplayMedia;
        e2.navigator.mediaDevices.getDisplayMedia = function(t3) {
          return r2.call(e2.navigator, t3);
        }, e2.navigator.getDisplayMedia = function(t3) {
          return n.deprecated("navigator.getDisplayMedia", "navigator.mediaDevices.getDisplayMedia"), r2.call(e2.navigator, t3);
        };
      }
    } };
  }, function(e, t, r) {
    var n = r(6);
    e.exports = function(e2, t2) {
      var r2 = false;
      return e2 = JSON.parse(JSON.stringify(e2)), e2.filter(function(e3) {
        if (e3 && (e3.urls || e3.url)) {
          var o = e3.urls || e3.url;
          e3.url && !e3.urls && n.deprecated("RTCIceServer.url", "RTCIceServer.urls");
          var a = "string" == typeof o;
          return a && (o = [o]), o = o.filter(function(e4) {
            return 0 !== e4.indexOf("turn:") || -1 === e4.indexOf("transport=udp") || -1 !== e4.indexOf("turn:[") || r2 ? 0 === e4.indexOf("stun:") && t2 >= 14393 && -1 === e4.indexOf("?transport=udp") : (r2 = true, true);
          }), delete e3.url, e3.urls = a ? o[0] : o, !!o.length;
        }
      });
    };
  }, function(e, t, r) {
    function n(e2) {
      return { inboundrtp: "inbound-rtp", outboundrtp: "outbound-rtp", candidatepair: "candidate-pair", localcandidate: "local-candidate", remotecandidate: "remote-candidate" }[e2.type] || e2.type;
    }
    function o(e2, t2, r2, n2, o2) {
      var a2 = u.writeRtpDescription(e2.kind, t2);
      if (a2 += u.writeIceParameters(e2.iceGatherer.getLocalParameters()), a2 += u.writeDtlsParameters(e2.dtlsTransport.getLocalParameters(), "offer" === r2 ? "actpass" : o2 || "active"), a2 += "a=mid:" + e2.mid + "\r\n", e2.rtpSender && e2.rtpReceiver ? a2 += "a=sendrecv\r\n" : e2.rtpSender ? a2 += "a=sendonly\r\n" : e2.rtpReceiver ? a2 += "a=recvonly\r\n" : a2 += "a=inactive\r\n", e2.rtpSender) {
        var i2 = e2.rtpSender._initialTrackId || e2.rtpSender.track.id;
        e2.rtpSender._initialTrackId = i2;
        var s2 = "msid:" + (n2 ? n2.id : "-") + " " + i2 + "\r\n";
        a2 += "a=" + s2, a2 += "a=ssrc:" + e2.sendEncodingParameters[0].ssrc + " " + s2, e2.sendEncodingParameters[0].rtx && (a2 += "a=ssrc:" + e2.sendEncodingParameters[0].rtx.ssrc + " " + s2, a2 += "a=ssrc-group:FID " + e2.sendEncodingParameters[0].ssrc + " " + e2.sendEncodingParameters[0].rtx.ssrc + "\r\n");
      }
      return a2 += "a=ssrc:" + e2.sendEncodingParameters[0].ssrc + " cname:" + u.localCName + "\r\n", e2.rtpSender && e2.sendEncodingParameters[0].rtx && (a2 += "a=ssrc:" + e2.sendEncodingParameters[0].rtx.ssrc + " cname:" + u.localCName + "\r\n"), a2;
    }
    function a(e2, t2) {
      var r2 = false;
      return e2 = JSON.parse(JSON.stringify(e2)), e2.filter(function(e3) {
        if (e3 && (e3.urls || e3.url)) {
          var n2 = e3.urls || e3.url;
          e3.url && !e3.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
          var o2 = "string" == typeof n2;
          return o2 && (n2 = [n2]), n2 = n2.filter(function(e4) {
            return 0 !== e4.indexOf("turn:") || -1 === e4.indexOf("transport=udp") || -1 !== e4.indexOf("turn:[") || r2 ? 0 === e4.indexOf("stun:") && t2 >= 14393 && -1 === e4.indexOf("?transport=udp") : (r2 = true, true);
          }), delete e3.url, e3.urls = o2 ? n2[0] : n2, !!n2.length;
        }
      });
    }
    function i(e2, t2) {
      var r2 = { codecs: [], headerExtensions: [], fecMechanisms: [] }, n2 = function(e3, t3) {
        e3 = parseInt(e3, 10);
        for (var r3 = 0; r3 < t3.length; r3++) if (t3[r3].payloadType === e3 || t3[r3].preferredPayloadType === e3) return t3[r3];
      }, o2 = function(e3, t3, r3, o3) {
        var a2 = n2(e3.parameters.apt, r3), i2 = n2(t3.parameters.apt, o3);
        return a2 && i2 && a2.name.toLowerCase() === i2.name.toLowerCase();
      };
      return e2.codecs.forEach(function(n3) {
        for (var a2 = 0; a2 < t2.codecs.length; a2++) {
          var i2 = t2.codecs[a2];
          if (n3.name.toLowerCase() === i2.name.toLowerCase() && n3.clockRate === i2.clockRate) {
            if ("rtx" === n3.name.toLowerCase() && n3.parameters && i2.parameters.apt && !o2(n3, i2, e2.codecs, t2.codecs)) continue;
            i2 = JSON.parse(JSON.stringify(i2)), i2.numChannels = Math.min(n3.numChannels, i2.numChannels), r2.codecs.push(i2), i2.rtcpFeedback = i2.rtcpFeedback.filter(function(e3) {
              for (var t3 = 0; t3 < n3.rtcpFeedback.length; t3++) if (n3.rtcpFeedback[t3].type === e3.type && n3.rtcpFeedback[t3].parameter === e3.parameter) return true;
              return false;
            });
            break;
          }
        }
      }), e2.headerExtensions.forEach(function(e3) {
        for (var n3 = 0; n3 < t2.headerExtensions.length; n3++) {
          var o3 = t2.headerExtensions[n3];
          if (e3.uri === o3.uri) {
            r2.headerExtensions.push(o3);
            break;
          }
        }
      }), r2;
    }
    function s(e2, t2, r2) {
      return -1 !== { offer: { setLocalDescription: ["stable", "have-local-offer"], setRemoteDescription: ["stable", "have-remote-offer"] }, answer: { setLocalDescription: ["have-remote-offer", "have-local-pranswer"], setRemoteDescription: ["have-local-offer", "have-remote-pranswer"] } }[t2][e2].indexOf(r2);
    }
    function c(e2, t2) {
      var r2 = e2.getRemoteCandidates().find(function(e3) {
        return t2.foundation === e3.foundation && t2.ip === e3.ip && t2.port === e3.port && t2.priority === e3.priority && t2.protocol === e3.protocol && t2.type === e3.type;
      });
      return r2 || e2.addRemoteCandidate(t2), !r2;
    }
    function d(e2, t2) {
      var r2 = new Error(t2);
      return r2.name = e2, r2.code = { NotSupportedError: 9, InvalidStateError: 11, InvalidAccessError: 15, TypeError: void 0, OperationError: void 0 }[e2], r2;
    }
    var u = r(108);
    e.exports = function(e2, t2) {
      function r2(t3, r3) {
        r3.addTrack(t3), r3.dispatchEvent(new e2.MediaStreamTrackEvent("addtrack", { track: t3 }));
      }
      function l(t3, r3) {
        r3.removeTrack(t3), r3.dispatchEvent(new e2.MediaStreamTrackEvent("removetrack", { track: t3 }));
      }
      function f(t3, r3, n2, o2) {
        var a2 = new Event("track");
        a2.track = r3, a2.receiver = n2, a2.transceiver = { receiver: n2 }, a2.streams = o2, e2.setTimeout(function() {
          t3._dispatchEvent("track", a2);
        });
      }
      var p = function(r3) {
        var n2 = this, o2 = document.createDocumentFragment();
        if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(e3) {
          n2[e3] = o2[e3].bind(o2);
        }), this.canTrickleIceCandidates = null, this.needNegotiation = false, this.localStreams = [], this.remoteStreams = [], this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", r3 = JSON.parse(JSON.stringify(r3 || {})), this.usingBundle = "max-bundle" === r3.bundlePolicy, "negotiate" === r3.rtcpMuxPolicy) throw d("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
        switch (r3.rtcpMuxPolicy || (r3.rtcpMuxPolicy = "require"), r3.iceTransportPolicy) {
          case "all":
          case "relay":
            break;
          default:
            r3.iceTransportPolicy = "all";
        }
        switch (r3.bundlePolicy) {
          case "balanced":
          case "max-compat":
          case "max-bundle":
            break;
          default:
            r3.bundlePolicy = "balanced";
        }
        if (r3.iceServers = a(r3.iceServers || [], t2), this._iceGatherers = [], r3.iceCandidatePoolSize) for (var i2 = r3.iceCandidatePoolSize; i2 > 0; i2--) this._iceGatherers.push(new e2.RTCIceGatherer({ iceServers: r3.iceServers, gatherPolicy: r3.iceTransportPolicy }));
        else r3.iceCandidatePoolSize = 0;
        this._config = r3, this.transceivers = [], this._sdpSessionId = u.generateSessionId(), this._sdpSessionVersion = 0, this._dtlsRole = void 0, this._isClosed = false;
      };
      Object.defineProperty(p.prototype, "localDescription", { configurable: true, get: function() {
        return this._localDescription;
      } }), Object.defineProperty(p.prototype, "remoteDescription", { configurable: true, get: function() {
        return this._remoteDescription;
      } }), p.prototype.onicecandidate = null, p.prototype.onaddstream = null, p.prototype.ontrack = null, p.prototype.onremovestream = null, p.prototype.onsignalingstatechange = null, p.prototype.oniceconnectionstatechange = null, p.prototype.onconnectionstatechange = null, p.prototype.onicegatheringstatechange = null, p.prototype.onnegotiationneeded = null, p.prototype.ondatachannel = null, p.prototype._dispatchEvent = function(e3, t3) {
        this._isClosed || (this.dispatchEvent(t3), "function" == typeof this["on" + e3] && this["on" + e3](t3));
      }, p.prototype._emitGatheringStateChange = function() {
        var e3 = new Event("icegatheringstatechange");
        this._dispatchEvent("icegatheringstatechange", e3);
      }, p.prototype.getConfiguration = function() {
        return this._config;
      }, p.prototype.getLocalStreams = function() {
        return this.localStreams;
      }, p.prototype.getRemoteStreams = function() {
        return this.remoteStreams;
      }, p.prototype._createTransceiver = function(e3, t3) {
        var r3 = this.transceivers.length > 0, n2 = { track: null, iceGatherer: null, iceTransport: null, dtlsTransport: null, localCapabilities: null, remoteCapabilities: null, rtpSender: null, rtpReceiver: null, kind: e3, mid: null, sendEncodingParameters: null, recvEncodingParameters: null, stream: null, associatedRemoteMediaStreams: [], wantReceive: true };
        if (this.usingBundle && r3) n2.iceTransport = this.transceivers[0].iceTransport, n2.dtlsTransport = this.transceivers[0].dtlsTransport;
        else {
          var o2 = this._createIceAndDtlsTransports();
          n2.iceTransport = o2.iceTransport, n2.dtlsTransport = o2.dtlsTransport;
        }
        return t3 || this.transceivers.push(n2), n2;
      }, p.prototype.addTrack = function(t3, r3) {
        if (this._isClosed) throw d("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
        if (this.transceivers.find(function(e3) {
          return e3.track === t3;
        })) throw d("InvalidAccessError", "Track already exists.");
        for (var n2, o2 = 0; o2 < this.transceivers.length; o2++) this.transceivers[o2].track || this.transceivers[o2].kind !== t3.kind || (n2 = this.transceivers[o2]);
        return n2 || (n2 = this._createTransceiver(t3.kind)), this._maybeFireNegotiationNeeded(), -1 === this.localStreams.indexOf(r3) && this.localStreams.push(r3), n2.track = t3, n2.stream = r3, n2.rtpSender = new e2.RTCRtpSender(t3, n2.dtlsTransport), n2.rtpSender;
      }, p.prototype.addStream = function(e3) {
        var r3 = this;
        if (t2 >= 15025) e3.getTracks().forEach(function(t3) {
          r3.addTrack(t3, e3);
        });
        else {
          var n2 = e3.clone();
          e3.getTracks().forEach(function(e4, t3) {
            var r4 = n2.getTracks()[t3];
            e4.addEventListener("enabled", function(e5) {
              r4.enabled = e5.enabled;
            });
          }), n2.getTracks().forEach(function(e4) {
            r3.addTrack(e4, n2);
          });
        }
      }, p.prototype.removeTrack = function(t3) {
        if (this._isClosed) throw d("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
        if (!(t3 instanceof e2.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
        var r3 = this.transceivers.find(function(e3) {
          return e3.rtpSender === t3;
        });
        if (!r3) throw d("InvalidAccessError", "Sender was not created by this connection.");
        var n2 = r3.stream;
        r3.rtpSender.stop(), r3.rtpSender = null, r3.track = null, r3.stream = null, -1 === this.transceivers.map(function(e3) {
          return e3.stream;
        }).indexOf(n2) && this.localStreams.indexOf(n2) > -1 && this.localStreams.splice(this.localStreams.indexOf(n2), 1), this._maybeFireNegotiationNeeded();
      }, p.prototype.removeStream = function(e3) {
        var t3 = this;
        e3.getTracks().forEach(function(e4) {
          var r3 = t3.getSenders().find(function(t4) {
            return t4.track === e4;
          });
          r3 && t3.removeTrack(r3);
        });
      }, p.prototype.getSenders = function() {
        return this.transceivers.filter(function(e3) {
          return !!e3.rtpSender;
        }).map(function(e3) {
          return e3.rtpSender;
        });
      }, p.prototype.getReceivers = function() {
        return this.transceivers.filter(function(e3) {
          return !!e3.rtpReceiver;
        }).map(function(e3) {
          return e3.rtpReceiver;
        });
      }, p.prototype._createIceGatherer = function(t3, r3) {
        var n2 = this;
        if (r3 && t3 > 0) return this.transceivers[0].iceGatherer;
        if (this._iceGatherers.length) return this._iceGatherers.shift();
        var o2 = new e2.RTCIceGatherer({ iceServers: this._config.iceServers, gatherPolicy: this._config.iceTransportPolicy });
        return Object.defineProperty(o2, "state", { value: "new", writable: true }), this.transceivers[t3].bufferedCandidateEvents = [], this.transceivers[t3].bufferCandidates = function(e3) {
          var r4 = !e3.candidate || 0 === Object.keys(e3.candidate).length;
          o2.state = r4 ? "completed" : "gathering", null !== n2.transceivers[t3].bufferedCandidateEvents && n2.transceivers[t3].bufferedCandidateEvents.push(e3);
        }, o2.addEventListener("localcandidate", this.transceivers[t3].bufferCandidates), o2;
      }, p.prototype._gather = function(t3, r3) {
        var n2 = this, o2 = this.transceivers[r3].iceGatherer;
        if (!o2.onlocalcandidate) {
          var a2 = this.transceivers[r3].bufferedCandidateEvents;
          this.transceivers[r3].bufferedCandidateEvents = null, o2.removeEventListener("localcandidate", this.transceivers[r3].bufferCandidates), o2.onlocalcandidate = function(e3) {
            if (!(n2.usingBundle && r3 > 0)) {
              var a3 = new Event("icecandidate");
              a3.candidate = { sdpMid: t3, sdpMLineIndex: r3 };
              var i2 = e3.candidate, s2 = !i2 || 0 === Object.keys(i2).length;
              if (s2) "new" !== o2.state && "gathering" !== o2.state || (o2.state = "completed");
              else {
                "new" === o2.state && (o2.state = "gathering"), i2.component = 1, i2.ufrag = o2.getLocalParameters().usernameFragment;
                var c2 = u.writeCandidate(i2);
                a3.candidate = Object.assign(a3.candidate, u.parseCandidate(c2)), a3.candidate.candidate = c2, a3.candidate.toJSON = function() {
                  return { candidate: a3.candidate.candidate, sdpMid: a3.candidate.sdpMid, sdpMLineIndex: a3.candidate.sdpMLineIndex, usernameFragment: a3.candidate.usernameFragment };
                };
              }
              var d2 = u.getMediaSections(n2._localDescription.sdp);
              d2[a3.candidate.sdpMLineIndex] += s2 ? "a=end-of-candidates\r\n" : "a=" + a3.candidate.candidate + "\r\n", n2._localDescription.sdp = u.getDescription(n2._localDescription.sdp) + d2.join("");
              var l2 = n2.transceivers.every(function(e4) {
                return e4.iceGatherer && "completed" === e4.iceGatherer.state;
              });
              "gathering" !== n2.iceGatheringState && (n2.iceGatheringState = "gathering", n2._emitGatheringStateChange()), s2 || n2._dispatchEvent("icecandidate", a3), l2 && (n2._dispatchEvent("icecandidate", new Event("icecandidate")), n2.iceGatheringState = "complete", n2._emitGatheringStateChange());
            }
          }, e2.setTimeout(function() {
            a2.forEach(function(e3) {
              o2.onlocalcandidate(e3);
            });
          }, 0);
        }
      }, p.prototype._createIceAndDtlsTransports = function() {
        var t3 = this, r3 = new e2.RTCIceTransport(null);
        r3.onicestatechange = function() {
          t3._updateIceConnectionState(), t3._updateConnectionState();
        };
        var n2 = new e2.RTCDtlsTransport(r3);
        return n2.ondtlsstatechange = function() {
          t3._updateConnectionState();
        }, n2.onerror = function() {
          Object.defineProperty(n2, "state", { value: "failed", writable: true }), t3._updateConnectionState();
        }, { iceTransport: r3, dtlsTransport: n2 };
      }, p.prototype._disposeIceAndDtlsTransports = function(e3) {
        var t3 = this.transceivers[e3].iceGatherer;
        t3 && (delete t3.onlocalcandidate, delete this.transceivers[e3].iceGatherer);
        var r3 = this.transceivers[e3].iceTransport;
        r3 && (delete r3.onicestatechange, delete this.transceivers[e3].iceTransport);
        var n2 = this.transceivers[e3].dtlsTransport;
        n2 && (delete n2.ondtlsstatechange, delete n2.onerror, delete this.transceivers[e3].dtlsTransport);
      }, p.prototype._transceive = function(e3, r3, n2) {
        var o2 = i(e3.localCapabilities, e3.remoteCapabilities);
        r3 && e3.rtpSender && (o2.encodings = e3.sendEncodingParameters, o2.rtcp = { cname: u.localCName, compound: e3.rtcpParameters.compound }, e3.recvEncodingParameters.length && (o2.rtcp.ssrc = e3.recvEncodingParameters[0].ssrc), e3.rtpSender.send(o2)), n2 && e3.rtpReceiver && o2.codecs.length > 0 && ("video" === e3.kind && e3.recvEncodingParameters && t2 < 15019 && e3.recvEncodingParameters.forEach(function(e4) {
          delete e4.rtx;
        }), e3.recvEncodingParameters.length ? o2.encodings = e3.recvEncodingParameters : o2.encodings = [{}], o2.rtcp = { compound: e3.rtcpParameters.compound }, e3.rtcpParameters.cname && (o2.rtcp.cname = e3.rtcpParameters.cname), e3.sendEncodingParameters.length && (o2.rtcp.ssrc = e3.sendEncodingParameters[0].ssrc), e3.rtpReceiver.receive(o2));
      }, p.prototype.setLocalDescription = function(e3) {
        var t3 = this;
        if (-1 === ["offer", "answer"].indexOf(e3.type)) return Promise.reject(d("TypeError", 'Unsupported type "' + e3.type + '"'));
        if (!s("setLocalDescription", e3.type, t3.signalingState) || t3._isClosed) return Promise.reject(d("InvalidStateError", "Can not set local " + e3.type + " in state " + t3.signalingState));
        var r3, n2;
        if ("offer" === e3.type) r3 = u.splitSections(e3.sdp), n2 = r3.shift(), r3.forEach(function(e4, r4) {
          var n3 = u.parseRtpParameters(e4);
          t3.transceivers[r4].localCapabilities = n3;
        }), t3.transceivers.forEach(function(e4, r4) {
          t3._gather(e4.mid, r4);
        });
        else if ("answer" === e3.type) {
          r3 = u.splitSections(t3._remoteDescription.sdp), n2 = r3.shift();
          var o2 = u.matchPrefix(n2, "a=ice-lite").length > 0;
          r3.forEach(function(e4, r4) {
            var a2 = t3.transceivers[r4], s2 = a2.iceGatherer, c2 = a2.iceTransport, d2 = a2.dtlsTransport, l2 = a2.localCapabilities, f2 = a2.remoteCapabilities;
            if (!(u.isRejected(e4) && 0 === u.matchPrefix(e4, "a=bundle-only").length || a2.rejected)) {
              var p2 = u.getIceParameters(e4, n2), m2 = u.getDtlsParameters(e4, n2);
              o2 && (m2.role = "server"), t3.usingBundle && 0 !== r4 || (t3._gather(a2.mid, r4), "new" === c2.state && c2.start(s2, p2, o2 ? "controlling" : "controlled"), "new" === d2.state && d2.start(m2));
              var v = i(l2, f2);
              t3._transceive(a2, v.codecs.length > 0, false);
            }
          });
        }
        return t3._localDescription = { type: e3.type, sdp: e3.sdp }, "offer" === e3.type ? t3._updateSignalingState("have-local-offer") : t3._updateSignalingState("stable"), Promise.resolve();
      }, p.prototype.setRemoteDescription = function(n2) {
        var o2 = this;
        if (-1 === ["offer", "answer"].indexOf(n2.type)) return Promise.reject(d("TypeError", 'Unsupported type "' + n2.type + '"'));
        if (!s("setRemoteDescription", n2.type, o2.signalingState) || o2._isClosed) return Promise.reject(d("InvalidStateError", "Can not set remote " + n2.type + " in state " + o2.signalingState));
        var a2 = {};
        o2.remoteStreams.forEach(function(e3) {
          a2[e3.id] = e3;
        });
        var p2 = [], m2 = u.splitSections(n2.sdp), v = m2.shift(), h = u.matchPrefix(v, "a=ice-lite").length > 0, k = u.matchPrefix(v, "a=group:BUNDLE ").length > 0;
        o2.usingBundle = k;
        var C = u.matchPrefix(v, "a=ice-options:")[0];
        return o2.canTrickleIceCandidates = !!C && C.substr(14).split(" ").indexOf("trickle") >= 0, m2.forEach(function(s2, d2) {
          var f2 = u.splitLines(s2), m3 = u.getKind(s2), C2 = u.isRejected(s2) && 0 === u.matchPrefix(s2, "a=bundle-only").length, y = f2[0].substr(2).split(" ")[2], g = u.getDirection(s2, v), P = u.parseMsid(s2), w = u.getMid(s2) || u.generateIdentifier();
          if (C2 || "application" === m3 && ("DTLS/SCTP" === y || "UDP/DTLS/SCTP" === y)) return void (o2.transceivers[d2] = { mid: w, kind: m3, protocol: y, rejected: true });
          !C2 && o2.transceivers[d2] && o2.transceivers[d2].rejected && (o2.transceivers[d2] = o2._createTransceiver(m3, true));
          var B, b, S, T, x, R, E, _, M, O, L, I = u.parseRtpParameters(s2);
          C2 || (O = u.getIceParameters(s2, v), L = u.getDtlsParameters(s2, v), L.role = "client"), E = u.parseRtpEncodingParameters(s2);
          var D = u.parseRtcpParameters(s2), j = u.matchPrefix(s2, "a=end-of-candidates", v).length > 0, N = u.matchPrefix(s2, "a=candidate:").map(function(e3) {
            return u.parseCandidate(e3);
          }).filter(function(e3) {
            return 1 === e3.component;
          });
          if (("offer" === n2.type || "answer" === n2.type) && !C2 && k && d2 > 0 && o2.transceivers[d2] && (o2._disposeIceAndDtlsTransports(d2), o2.transceivers[d2].iceGatherer = o2.transceivers[0].iceGatherer, o2.transceivers[d2].iceTransport = o2.transceivers[0].iceTransport, o2.transceivers[d2].dtlsTransport = o2.transceivers[0].dtlsTransport, o2.transceivers[d2].rtpSender && o2.transceivers[d2].rtpSender.setTransport(o2.transceivers[0].dtlsTransport), o2.transceivers[d2].rtpReceiver && o2.transceivers[d2].rtpReceiver.setTransport(o2.transceivers[0].dtlsTransport)), "offer" !== n2.type || C2) {
            if ("answer" === n2.type && !C2) {
              B = o2.transceivers[d2], b = B.iceGatherer, S = B.iceTransport, T = B.dtlsTransport, x = B.rtpReceiver, R = B.sendEncodingParameters, _ = B.localCapabilities, o2.transceivers[d2].recvEncodingParameters = E, o2.transceivers[d2].remoteCapabilities = I, o2.transceivers[d2].rtcpParameters = D, N.length && "new" === S.state && (!h && !j || k && 0 !== d2 ? N.forEach(function(e3) {
                c(B.iceTransport, e3);
              }) : S.setRemoteCandidates(N)), k && 0 !== d2 || ("new" === S.state && S.start(b, O, "controlling"), "new" === T.state && T.start(L));
              var A = i(B.localCapabilities, B.remoteCapabilities), F = A.codecs.filter(function(e3) {
                return "rtx" === e3.name.toLowerCase();
              }).length;
              !F && B.sendEncodingParameters[0].rtx && delete B.sendEncodingParameters[0].rtx, o2._transceive(B, "sendrecv" === g || "recvonly" === g, "sendrecv" === g || "sendonly" === g), !x || "sendrecv" !== g && "sendonly" !== g ? delete B.rtpReceiver : (M = x.track, P ? (a2[P.stream] || (a2[P.stream] = new e2.MediaStream()), r2(M, a2[P.stream]), p2.push([M, x, a2[P.stream]])) : (a2.default || (a2.default = new e2.MediaStream()), r2(M, a2.default), p2.push([M, x, a2.default])));
            }
          } else {
            B = o2.transceivers[d2] || o2._createTransceiver(m3), B.mid = w, B.iceGatherer || (B.iceGatherer = o2._createIceGatherer(d2, k)), N.length && "new" === B.iceTransport.state && (!j || k && 0 !== d2 ? N.forEach(function(e3) {
              c(B.iceTransport, e3);
            }) : B.iceTransport.setRemoteCandidates(N)), _ = e2.RTCRtpReceiver.getCapabilities(m3), t2 < 15019 && (_.codecs = _.codecs.filter(function(e3) {
              return "rtx" !== e3.name;
            })), R = B.sendEncodingParameters || [{ ssrc: 1001 * (2 * d2 + 2) }];
            var U = false;
            if ("sendrecv" === g || "sendonly" === g) {
              if (U = !B.rtpReceiver, x = B.rtpReceiver || new e2.RTCRtpReceiver(B.dtlsTransport, m3), U) {
                var G;
                M = x.track, P && "-" === P.stream || (P ? (a2[P.stream] || (a2[P.stream] = new e2.MediaStream(), Object.defineProperty(a2[P.stream], "id", { get: function() {
                  return P.stream;
                } })), Object.defineProperty(M, "id", { get: function() {
                  return P.track;
                } }), G = a2[P.stream]) : (a2.default || (a2.default = new e2.MediaStream()), G = a2.default)), G && (r2(M, G), B.associatedRemoteMediaStreams.push(G)), p2.push([M, x, G]);
              }
            } else B.rtpReceiver && B.rtpReceiver.track && (B.associatedRemoteMediaStreams.forEach(function(e3) {
              var t3 = e3.getTracks().find(function(e4) {
                return e4.id === B.rtpReceiver.track.id;
              });
              t3 && l(t3, e3);
            }), B.associatedRemoteMediaStreams = []);
            B.localCapabilities = _, B.remoteCapabilities = I, B.rtpReceiver = x, B.rtcpParameters = D, B.sendEncodingParameters = R, B.recvEncodingParameters = E, o2._transceive(o2.transceivers[d2], false, U);
          }
        }), void 0 === o2._dtlsRole && (o2._dtlsRole = "offer" === n2.type ? "active" : "passive"), o2._remoteDescription = { type: n2.type, sdp: n2.sdp }, "offer" === n2.type ? o2._updateSignalingState("have-remote-offer") : o2._updateSignalingState("stable"), Object.keys(a2).forEach(function(t3) {
          var r3 = a2[t3];
          if (r3.getTracks().length) {
            if (-1 === o2.remoteStreams.indexOf(r3)) {
              o2.remoteStreams.push(r3);
              var n3 = new Event("addstream");
              n3.stream = r3, e2.setTimeout(function() {
                o2._dispatchEvent("addstream", n3);
              });
            }
            p2.forEach(function(e3) {
              var t4 = e3[0], n4 = e3[1];
              r3.id === e3[2].id && f(o2, t4, n4, [r3]);
            });
          }
        }), p2.forEach(function(e3) {
          e3[2] || f(o2, e3[0], e3[1], []);
        }), e2.setTimeout(function() {
          o2 && o2.transceivers && o2.transceivers.forEach(function(e3) {
            e3.iceTransport && "new" === e3.iceTransport.state && e3.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e3.iceTransport.addRemoteCandidate({}));
          });
        }, 4e3), Promise.resolve();
      }, p.prototype.close = function() {
        this.transceivers.forEach(function(e3) {
          e3.iceTransport && e3.iceTransport.stop(), e3.dtlsTransport && e3.dtlsTransport.stop(), e3.rtpSender && e3.rtpSender.stop(), e3.rtpReceiver && e3.rtpReceiver.stop();
        }), this._isClosed = true, this._updateSignalingState("closed");
      }, p.prototype._updateSignalingState = function(e3) {
        this.signalingState = e3;
        var t3 = new Event("signalingstatechange");
        this._dispatchEvent("signalingstatechange", t3);
      }, p.prototype._maybeFireNegotiationNeeded = function() {
        var t3 = this;
        "stable" === this.signalingState && true !== this.needNegotiation && (this.needNegotiation = true, e2.setTimeout(function() {
          if (t3.needNegotiation) {
            t3.needNegotiation = false;
            var e3 = new Event("negotiationneeded");
            t3._dispatchEvent("negotiationneeded", e3);
          }
        }, 0));
      }, p.prototype._updateIceConnectionState = function() {
        var e3, t3 = { new: 0, closed: 0, checking: 0, connected: 0, completed: 0, disconnected: 0, failed: 0 };
        if (this.transceivers.forEach(function(e4) {
          e4.iceTransport && !e4.rejected && t3[e4.iceTransport.state]++;
        }), e3 = "new", t3.failed > 0 ? e3 = "failed" : t3.checking > 0 ? e3 = "checking" : t3.disconnected > 0 ? e3 = "disconnected" : t3.new > 0 ? e3 = "new" : t3.connected > 0 ? e3 = "connected" : t3.completed > 0 && (e3 = "completed"), e3 !== this.iceConnectionState) {
          this.iceConnectionState = e3;
          var r3 = new Event("iceconnectionstatechange");
          this._dispatchEvent("iceconnectionstatechange", r3);
        }
      }, p.prototype._updateConnectionState = function() {
        var e3, t3 = { new: 0, closed: 0, connecting: 0, connected: 0, completed: 0, disconnected: 0, failed: 0 };
        if (this.transceivers.forEach(function(e4) {
          e4.iceTransport && e4.dtlsTransport && !e4.rejected && (t3[e4.iceTransport.state]++, t3[e4.dtlsTransport.state]++);
        }), t3.connected += t3.completed, e3 = "new", t3.failed > 0 ? e3 = "failed" : t3.connecting > 0 ? e3 = "connecting" : t3.disconnected > 0 ? e3 = "disconnected" : t3.new > 0 ? e3 = "new" : t3.connected > 0 && (e3 = "connected"), e3 !== this.connectionState) {
          this.connectionState = e3;
          var r3 = new Event("connectionstatechange");
          this._dispatchEvent("connectionstatechange", r3);
        }
      }, p.prototype.createOffer = function() {
        var r3 = this;
        if (r3._isClosed) return Promise.reject(d("InvalidStateError", "Can not call createOffer after close"));
        var n2 = r3.transceivers.filter(function(e3) {
          return "audio" === e3.kind;
        }).length, a2 = r3.transceivers.filter(function(e3) {
          return "video" === e3.kind;
        }).length, i2 = arguments[0];
        if (i2) {
          if (i2.mandatory || i2.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
          void 0 !== i2.offerToReceiveAudio && (n2 = true === i2.offerToReceiveAudio ? 1 : false === i2.offerToReceiveAudio ? 0 : i2.offerToReceiveAudio), void 0 !== i2.offerToReceiveVideo && (a2 = true === i2.offerToReceiveVideo ? 1 : false === i2.offerToReceiveVideo ? 0 : i2.offerToReceiveVideo);
        }
        for (r3.transceivers.forEach(function(e3) {
          "audio" === e3.kind ? --n2 < 0 && (e3.wantReceive = false) : "video" === e3.kind && --a2 < 0 && (e3.wantReceive = false);
        }); n2 > 0 || a2 > 0; ) n2 > 0 && (r3._createTransceiver("audio"), n2--), a2 > 0 && (r3._createTransceiver("video"), a2--);
        var s2 = u.writeSessionBoilerplate(r3._sdpSessionId, r3._sdpSessionVersion++);
        r3.transceivers.forEach(function(n3, o2) {
          var a3 = n3.track, i3 = n3.kind, s3 = n3.mid || u.generateIdentifier();
          n3.mid = s3, n3.iceGatherer || (n3.iceGatherer = r3._createIceGatherer(o2, r3.usingBundle));
          var c3 = e2.RTCRtpSender.getCapabilities(i3);
          t2 < 15019 && (c3.codecs = c3.codecs.filter(function(e3) {
            return "rtx" !== e3.name;
          })), c3.codecs.forEach(function(e3) {
            "H264" === e3.name && void 0 === e3.parameters["level-asymmetry-allowed"] && (e3.parameters["level-asymmetry-allowed"] = "1"), n3.remoteCapabilities && n3.remoteCapabilities.codecs && n3.remoteCapabilities.codecs.forEach(function(t3) {
              e3.name.toLowerCase() === t3.name.toLowerCase() && e3.clockRate === t3.clockRate && (e3.preferredPayloadType = t3.payloadType);
            });
          }), c3.headerExtensions.forEach(function(e3) {
            (n3.remoteCapabilities && n3.remoteCapabilities.headerExtensions || []).forEach(function(t3) {
              e3.uri === t3.uri && (e3.id = t3.id);
            });
          });
          var d2 = n3.sendEncodingParameters || [{ ssrc: 1001 * (2 * o2 + 1) }];
          a3 && t2 >= 15019 && "video" === i3 && !d2[0].rtx && (d2[0].rtx = { ssrc: d2[0].ssrc + 1 }), n3.wantReceive && (n3.rtpReceiver = new e2.RTCRtpReceiver(n3.dtlsTransport, i3)), n3.localCapabilities = c3, n3.sendEncodingParameters = d2;
        }), "max-compat" !== r3._config.bundlePolicy && (s2 += "a=group:BUNDLE " + r3.transceivers.map(function(e3) {
          return e3.mid;
        }).join(" ") + "\r\n"), s2 += "a=ice-options:trickle\r\n", r3.transceivers.forEach(function(e3, t3) {
          s2 += o(e3, e3.localCapabilities, "offer", e3.stream, r3._dtlsRole), s2 += "a=rtcp-rsize\r\n", !e3.iceGatherer || "new" === r3.iceGatheringState || 0 !== t3 && r3.usingBundle || (e3.iceGatherer.getLocalCandidates().forEach(function(e4) {
            e4.component = 1, s2 += "a=" + u.writeCandidate(e4) + "\r\n";
          }), "completed" === e3.iceGatherer.state && (s2 += "a=end-of-candidates\r\n"));
        });
        var c2 = new e2.RTCSessionDescription({ type: "offer", sdp: s2 });
        return Promise.resolve(c2);
      }, p.prototype.createAnswer = function() {
        var r3 = this;
        if (r3._isClosed) return Promise.reject(d("InvalidStateError", "Can not call createAnswer after close"));
        if ("have-remote-offer" !== r3.signalingState && "have-local-pranswer" !== r3.signalingState) return Promise.reject(d("InvalidStateError", "Can not call createAnswer in signalingState " + r3.signalingState));
        var n2 = u.writeSessionBoilerplate(r3._sdpSessionId, r3._sdpSessionVersion++);
        r3.usingBundle && (n2 += "a=group:BUNDLE " + r3.transceivers.map(function(e3) {
          return e3.mid;
        }).join(" ") + "\r\n"), n2 += "a=ice-options:trickle\r\n";
        var a2 = u.getMediaSections(r3._remoteDescription.sdp).length;
        r3.transceivers.forEach(function(e3, s3) {
          if (!(s3 + 1 > a2)) {
            if (e3.rejected) return "application" === e3.kind ? "DTLS/SCTP" === e3.protocol ? n2 += "m=application 0 DTLS/SCTP 5000\r\n" : n2 += "m=application 0 " + e3.protocol + " webrtc-datachannel\r\n" : "audio" === e3.kind ? n2 += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === e3.kind && (n2 += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void (n2 += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e3.mid + "\r\n");
            if (e3.stream) {
              var c2;
              "audio" === e3.kind ? c2 = e3.stream.getAudioTracks()[0] : "video" === e3.kind && (c2 = e3.stream.getVideoTracks()[0]), c2 && t2 >= 15019 && "video" === e3.kind && !e3.sendEncodingParameters[0].rtx && (e3.sendEncodingParameters[0].rtx = { ssrc: e3.sendEncodingParameters[0].ssrc + 1 });
            }
            var d2 = i(e3.localCapabilities, e3.remoteCapabilities);
            !d2.codecs.filter(function(e4) {
              return "rtx" === e4.name.toLowerCase();
            }).length && e3.sendEncodingParameters[0].rtx && delete e3.sendEncodingParameters[0].rtx, n2 += o(e3, d2, "answer", e3.stream, r3._dtlsRole), e3.rtcpParameters && e3.rtcpParameters.reducedSize && (n2 += "a=rtcp-rsize\r\n");
          }
        });
        var s2 = new e2.RTCSessionDescription({ type: "answer", sdp: n2 });
        return Promise.resolve(s2);
      }, p.prototype.addIceCandidate = function(e3) {
        var t3, r3 = this;
        return e3 && void 0 === e3.sdpMLineIndex && !e3.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function(n2, o2) {
          if (!r3._remoteDescription) return o2(d("InvalidStateError", "Can not add ICE candidate without a remote description"));
          if (e3 && "" !== e3.candidate) {
            var a2 = e3.sdpMLineIndex;
            if (e3.sdpMid) {
              for (var i2 = 0; i2 < r3.transceivers.length; i2++) if (r3.transceivers[i2].mid === e3.sdpMid) {
                a2 = i2;
                break;
              }
            }
            var s2 = r3.transceivers[a2];
            if (!s2) return o2(d("OperationError", "Can not add ICE candidate"));
            if (s2.rejected) return n2();
            var l2 = Object.keys(e3.candidate).length > 0 ? u.parseCandidate(e3.candidate) : {};
            if ("tcp" === l2.protocol && (0 === l2.port || 9 === l2.port)) return n2();
            if (l2.component && 1 !== l2.component) return n2();
            if ((0 === a2 || a2 > 0 && s2.iceTransport !== r3.transceivers[0].iceTransport) && !c(s2.iceTransport, l2)) return o2(d("OperationError", "Can not add ICE candidate"));
            var f2 = e3.candidate.trim();
            0 === f2.indexOf("a=") && (f2 = f2.substr(2)), t3 = u.getMediaSections(r3._remoteDescription.sdp), t3[a2] += "a=" + (l2.type ? f2 : "end-of-candidates") + "\r\n", r3._remoteDescription.sdp = u.getDescription(r3._remoteDescription.sdp) + t3.join("");
          } else for (var p2 = 0; p2 < r3.transceivers.length && (r3.transceivers[p2].rejected || (r3.transceivers[p2].iceTransport.addRemoteCandidate({}), t3 = u.getMediaSections(r3._remoteDescription.sdp), t3[p2] += "a=end-of-candidates\r\n", r3._remoteDescription.sdp = u.getDescription(r3._remoteDescription.sdp) + t3.join(""), !r3.usingBundle)); p2++) ;
          n2();
        });
      }, p.prototype.getStats = function(t3) {
        if (t3 && t3 instanceof e2.MediaStreamTrack) {
          var r3 = null;
          if (this.transceivers.forEach(function(e3) {
            e3.rtpSender && e3.rtpSender.track === t3 ? r3 = e3.rtpSender : e3.rtpReceiver && e3.rtpReceiver.track === t3 && (r3 = e3.rtpReceiver);
          }), !r3) throw d("InvalidAccessError", "Invalid selector.");
          return r3.getStats();
        }
        var n2 = [];
        return this.transceivers.forEach(function(e3) {
          ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(t4) {
            e3[t4] && n2.push(e3[t4].getStats());
          });
        }), Promise.all(n2).then(function(e3) {
          var t4 = /* @__PURE__ */ new Map();
          return e3.forEach(function(e4) {
            e4.forEach(function(e5) {
              t4.set(e5.id, e5);
            });
          }), t4;
        });
      }, ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function(t3) {
        var r3 = e2[t3];
        if (r3 && r3.prototype && r3.prototype.getStats) {
          var o2 = r3.prototype.getStats;
          r3.prototype.getStats = function() {
            return o2.apply(this).then(function(e3) {
              var t4 = /* @__PURE__ */ new Map();
              return Object.keys(e3).forEach(function(r4) {
                e3[r4].type = n(e3[r4]), t4.set(r4, e3[r4]);
              }), t4;
            });
          };
        }
      });
      var m = ["createOffer", "createAnswer"];
      return m.forEach(function(e3) {
        var t3 = p.prototype[e3];
        p.prototype[e3] = function() {
          var e4 = arguments;
          return "function" == typeof e4[0] || "function" == typeof e4[1] ? t3.apply(this, [arguments[2]]).then(function(t4) {
            "function" == typeof e4[0] && e4[0].apply(null, [t4]);
          }, function(t4) {
            "function" == typeof e4[1] && e4[1].apply(null, [t4]);
          }) : t3.apply(this, arguments);
        };
      }), m = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"], m.forEach(function(e3) {
        var t3 = p.prototype[e3];
        p.prototype[e3] = function() {
          var e4 = arguments;
          return "function" == typeof e4[1] || "function" == typeof e4[2] ? t3.apply(this, arguments).then(function() {
            "function" == typeof e4[1] && e4[1].apply(null);
          }, function(t4) {
            "function" == typeof e4[2] && e4[2].apply(null, [t4]);
          }) : t3.apply(this, arguments);
        };
      }), ["getStats"].forEach(function(e3) {
        var t3 = p.prototype[e3];
        p.prototype[e3] = function() {
          var e4 = arguments;
          return "function" == typeof e4[1] ? t3.apply(this, arguments).then(function() {
            "function" == typeof e4[1] && e4[1].apply(null);
          }) : t3.apply(this, arguments);
        };
      }), p;
    };
  }, function(e, t, r) {
    var n = {};
    n.generateIdentifier = function() {
      return Math.random().toString(36).substr(2, 10);
    }, n.localCName = n.generateIdentifier(), n.splitLines = function(e2) {
      return e2.trim().split("\n").map(function(e3) {
        return e3.trim();
      });
    }, n.splitSections = function(e2) {
      return e2.split("\nm=").map(function(e3, t2) {
        return (t2 > 0 ? "m=" + e3 : e3).trim() + "\r\n";
      });
    }, n.getDescription = function(e2) {
      var t2 = n.splitSections(e2);
      return t2 && t2[0];
    }, n.getMediaSections = function(e2) {
      var t2 = n.splitSections(e2);
      return t2.shift(), t2;
    }, n.matchPrefix = function(e2, t2) {
      return n.splitLines(e2).filter(function(e3) {
        return 0 === e3.indexOf(t2);
      });
    }, n.parseCandidate = function(e2) {
      var t2;
      t2 = 0 === e2.indexOf("a=candidate:") ? e2.substring(12).split(" ") : e2.substring(10).split(" ");
      for (var r2 = { foundation: t2[0], component: parseInt(t2[1], 10), protocol: t2[2].toLowerCase(), priority: parseInt(t2[3], 10), ip: t2[4], port: parseInt(t2[5], 10), type: t2[7] }, n2 = 8; n2 < t2.length; n2 += 2) switch (t2[n2]) {
        case "raddr":
          r2.relatedAddress = t2[n2 + 1];
          break;
        case "rport":
          r2.relatedPort = parseInt(t2[n2 + 1], 10);
          break;
        case "tcptype":
          r2.tcpType = t2[n2 + 1];
          break;
        case "ufrag":
          r2.ufrag = t2[n2 + 1], r2.usernameFragment = t2[n2 + 1];
          break;
        default:
          r2[t2[n2]] = t2[n2 + 1];
      }
      return r2;
    }, n.writeCandidate = function(e2) {
      var t2 = [];
      t2.push(e2.foundation), t2.push(e2.component), t2.push(e2.protocol.toUpperCase()), t2.push(e2.priority), t2.push(e2.ip), t2.push(e2.port);
      var r2 = e2.type;
      return t2.push("typ"), t2.push(r2), "host" !== r2 && e2.relatedAddress && e2.relatedPort && (t2.push("raddr"), t2.push(e2.relatedAddress), t2.push("rport"), t2.push(e2.relatedPort)), e2.tcpType && "tcp" === e2.protocol.toLowerCase() && (t2.push("tcptype"), t2.push(e2.tcpType)), (e2.usernameFragment || e2.ufrag) && (t2.push("ufrag"), t2.push(e2.usernameFragment || e2.ufrag)), "candidate:" + t2.join(" ");
    }, n.parseIceOptions = function(e2) {
      return e2.substr(14).split(" ");
    }, n.parseRtpMap = function(e2) {
      var t2 = e2.substr(9).split(" "), r2 = { payloadType: parseInt(t2.shift(), 10) };
      return t2 = t2[0].split("/"), r2.name = t2[0], r2.clockRate = parseInt(t2[1], 10), r2.channels = 3 === t2.length ? parseInt(t2[2], 10) : 1, r2.numChannels = r2.channels, r2;
    }, n.writeRtpMap = function(e2) {
      var t2 = e2.payloadType;
      void 0 !== e2.preferredPayloadType && (t2 = e2.preferredPayloadType);
      var r2 = e2.channels || e2.numChannels || 1;
      return "a=rtpmap:" + t2 + " " + e2.name + "/" + e2.clockRate + (1 !== r2 ? "/" + r2 : "") + "\r\n";
    }, n.parseExtmap = function(e2) {
      var t2 = e2.substr(9).split(" ");
      return { id: parseInt(t2[0], 10), direction: t2[0].indexOf("/") > 0 ? t2[0].split("/")[1] : "sendrecv", uri: t2[1] };
    }, n.writeExtmap = function(e2) {
      return "a=extmap:" + (e2.id || e2.preferredId) + (e2.direction && "sendrecv" !== e2.direction ? "/" + e2.direction : "") + " " + e2.uri + "\r\n";
    }, n.parseFmtp = function(e2) {
      for (var t2, r2 = {}, n2 = e2.substr(e2.indexOf(" ") + 1).split(";"), o = 0; o < n2.length; o++) t2 = n2[o].trim().split("="), r2[t2[0].trim()] = t2[1];
      return r2;
    }, n.writeFmtp = function(e2) {
      var t2 = "", r2 = e2.payloadType;
      if (void 0 !== e2.preferredPayloadType && (r2 = e2.preferredPayloadType), e2.parameters && Object.keys(e2.parameters).length) {
        var n2 = [];
        Object.keys(e2.parameters).forEach(function(t3) {
          e2.parameters[t3] ? n2.push(t3 + "=" + e2.parameters[t3]) : n2.push(t3);
        }), t2 += "a=fmtp:" + r2 + " " + n2.join(";") + "\r\n";
      }
      return t2;
    }, n.parseRtcpFb = function(e2) {
      var t2 = e2.substr(e2.indexOf(" ") + 1).split(" ");
      return { type: t2.shift(), parameter: t2.join(" ") };
    }, n.writeRtcpFb = function(e2) {
      var t2 = "", r2 = e2.payloadType;
      return void 0 !== e2.preferredPayloadType && (r2 = e2.preferredPayloadType), e2.rtcpFeedback && e2.rtcpFeedback.length && e2.rtcpFeedback.forEach(function(e3) {
        t2 += "a=rtcp-fb:" + r2 + " " + e3.type + (e3.parameter && e3.parameter.length ? " " + e3.parameter : "") + "\r\n";
      }), t2;
    }, n.parseSsrcMedia = function(e2) {
      var t2 = e2.indexOf(" "), r2 = { ssrc: parseInt(e2.substr(7, t2 - 7), 10) }, n2 = e2.indexOf(":", t2);
      return n2 > -1 ? (r2.attribute = e2.substr(t2 + 1, n2 - t2 - 1), r2.value = e2.substr(n2 + 1)) : r2.attribute = e2.substr(t2 + 1), r2;
    }, n.getMid = function(e2) {
      var t2 = n.matchPrefix(e2, "a=mid:")[0];
      if (t2) return t2.substr(6);
    }, n.parseFingerprint = function(e2) {
      var t2 = e2.substr(14).split(" ");
      return { algorithm: t2[0].toLowerCase(), value: t2[1] };
    }, n.getDtlsParameters = function(e2, t2) {
      return { role: "auto", fingerprints: n.matchPrefix(e2 + t2, "a=fingerprint:").map(n.parseFingerprint) };
    }, n.writeDtlsParameters = function(e2, t2) {
      var r2 = "a=setup:" + t2 + "\r\n";
      return e2.fingerprints.forEach(function(e3) {
        r2 += "a=fingerprint:" + e3.algorithm + " " + e3.value + "\r\n";
      }), r2;
    }, n.getIceParameters = function(e2, t2) {
      var r2 = n.splitLines(e2);
      return r2 = r2.concat(n.splitLines(t2)), { usernameFragment: r2.filter(function(e3) {
        return 0 === e3.indexOf("a=ice-ufrag:");
      })[0].substr(12), password: r2.filter(function(e3) {
        return 0 === e3.indexOf("a=ice-pwd:");
      })[0].substr(10) };
    }, n.writeIceParameters = function(e2) {
      return "a=ice-ufrag:" + e2.usernameFragment + "\r\na=ice-pwd:" + e2.password + "\r\n";
    }, n.parseRtpParameters = function(e2) {
      for (var t2 = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] }, r2 = n.splitLines(e2), o = r2[0].split(" "), a = 3; a < o.length; a++) {
        var i = o[a], s = n.matchPrefix(e2, "a=rtpmap:" + i + " ")[0];
        if (s) {
          var c = n.parseRtpMap(s), d = n.matchPrefix(e2, "a=fmtp:" + i + " ");
          switch (c.parameters = d.length ? n.parseFmtp(d[0]) : {}, c.rtcpFeedback = n.matchPrefix(e2, "a=rtcp-fb:" + i + " ").map(n.parseRtcpFb), t2.codecs.push(c), c.name.toUpperCase()) {
            case "RED":
            case "ULPFEC":
              t2.fecMechanisms.push(c.name.toUpperCase());
          }
        }
      }
      return n.matchPrefix(e2, "a=extmap:").forEach(function(e3) {
        t2.headerExtensions.push(n.parseExtmap(e3));
      }), t2;
    }, n.writeRtpDescription = function(e2, t2) {
      var r2 = "";
      r2 += "m=" + e2 + " ", r2 += t2.codecs.length > 0 ? "9" : "0", r2 += " UDP/TLS/RTP/SAVPF ", r2 += t2.codecs.map(function(e3) {
        return void 0 !== e3.preferredPayloadType ? e3.preferredPayloadType : e3.payloadType;
      }).join(" ") + "\r\n", r2 += "c=IN IP4 0.0.0.0\r\n", r2 += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t2.codecs.forEach(function(e3) {
        r2 += n.writeRtpMap(e3), r2 += n.writeFmtp(e3), r2 += n.writeRtcpFb(e3);
      });
      var o = 0;
      return t2.codecs.forEach(function(e3) {
        e3.maxptime > o && (o = e3.maxptime);
      }), o > 0 && (r2 += "a=maxptime:" + o + "\r\n"), r2 += "a=rtcp-mux\r\n", t2.headerExtensions && t2.headerExtensions.forEach(function(e3) {
        r2 += n.writeExtmap(e3);
      }), r2;
    }, n.parseRtpEncodingParameters = function(e2) {
      var t2, r2 = [], o = n.parseRtpParameters(e2), a = -1 !== o.fecMechanisms.indexOf("RED"), i = -1 !== o.fecMechanisms.indexOf("ULPFEC"), s = n.matchPrefix(e2, "a=ssrc:").map(function(e3) {
        return n.parseSsrcMedia(e3);
      }).filter(function(e3) {
        return "cname" === e3.attribute;
      }), c = s.length > 0 && s[0].ssrc, d = n.matchPrefix(e2, "a=ssrc-group:FID").map(function(e3) {
        return e3.substr(17).split(" ").map(function(e4) {
          return parseInt(e4, 10);
        });
      });
      d.length > 0 && d[0].length > 1 && d[0][0] === c && (t2 = d[0][1]), o.codecs.forEach(function(e3) {
        if ("RTX" === e3.name.toUpperCase() && e3.parameters.apt) {
          var n2 = { ssrc: c, codecPayloadType: parseInt(e3.parameters.apt, 10) };
          c && t2 && (n2.rtx = { ssrc: t2 }), r2.push(n2), a && (n2 = JSON.parse(JSON.stringify(n2)), n2.fec = { ssrc: t2, mechanism: i ? "red+ulpfec" : "red" }, r2.push(n2));
        }
      }), 0 === r2.length && c && r2.push({ ssrc: c });
      var u = n.matchPrefix(e2, "b=");
      return u.length && (u = 0 === u[0].indexOf("b=TIAS:") ? parseInt(u[0].substr(7), 10) : 0 === u[0].indexOf("b=AS:") ? 1e3 * parseInt(u[0].substr(5), 10) * 0.95 - 16e3 : void 0, r2.forEach(function(e3) {
        e3.maxBitrate = u;
      })), r2;
    }, n.parseRtcpParameters = function(e2) {
      var t2 = {}, r2 = n.matchPrefix(e2, "a=ssrc:").map(function(e3) {
        return n.parseSsrcMedia(e3);
      }).filter(function(e3) {
        return "cname" === e3.attribute;
      })[0];
      r2 && (t2.cname = r2.value, t2.ssrc = r2.ssrc);
      var o = n.matchPrefix(e2, "a=rtcp-rsize");
      t2.reducedSize = o.length > 0, t2.compound = 0 === o.length;
      var a = n.matchPrefix(e2, "a=rtcp-mux");
      return t2.mux = a.length > 0, t2;
    }, n.parseMsid = function(e2) {
      var t2, r2 = n.matchPrefix(e2, "a=msid:");
      if (1 === r2.length) return t2 = r2[0].substr(7).split(" "), { stream: t2[0], track: t2[1] };
      var o = n.matchPrefix(e2, "a=ssrc:").map(function(e3) {
        return n.parseSsrcMedia(e3);
      }).filter(function(e3) {
        return "msid" === e3.attribute;
      });
      return o.length > 0 ? (t2 = o[0].value.split(" "), { stream: t2[0], track: t2[1] }) : void 0;
    }, n.generateSessionId = function() {
      return Math.random().toString().substr(2, 21);
    }, n.writeSessionBoilerplate = function(e2, t2) {
      var r2 = void 0 !== t2 ? t2 : 2;
      return "v=0\r\no=thisisadapterortc " + (e2 || n.generateSessionId()) + " " + r2 + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n";
    }, n.writeMediaSection = function(e2, t2, r2, o) {
      var a = n.writeRtpDescription(e2.kind, t2);
      if (a += n.writeIceParameters(e2.iceGatherer.getLocalParameters()), a += n.writeDtlsParameters(e2.dtlsTransport.getLocalParameters(), "offer" === r2 ? "actpass" : "active"), a += "a=mid:" + e2.mid + "\r\n", e2.direction ? a += "a=" + e2.direction + "\r\n" : e2.rtpSender && e2.rtpReceiver ? a += "a=sendrecv\r\n" : e2.rtpSender ? a += "a=sendonly\r\n" : e2.rtpReceiver ? a += "a=recvonly\r\n" : a += "a=inactive\r\n", e2.rtpSender) {
        var i = "msid:" + o.id + " " + e2.rtpSender.track.id + "\r\n";
        a += "a=" + i, a += "a=ssrc:" + e2.sendEncodingParameters[0].ssrc + " " + i, e2.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e2.sendEncodingParameters[0].rtx.ssrc + " " + i, a += "a=ssrc-group:FID " + e2.sendEncodingParameters[0].ssrc + " " + e2.sendEncodingParameters[0].rtx.ssrc + "\r\n");
      }
      return a += "a=ssrc:" + e2.sendEncodingParameters[0].ssrc + " cname:" + n.localCName + "\r\n", e2.rtpSender && e2.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e2.sendEncodingParameters[0].rtx.ssrc + " cname:" + n.localCName + "\r\n"), a;
    }, n.getDirection = function(e2, t2) {
      for (var r2 = n.splitLines(e2), o = 0; o < r2.length; o++) switch (r2[o]) {
        case "a=sendrecv":
        case "a=sendonly":
        case "a=recvonly":
        case "a=inactive":
          return r2[o].substr(2);
      }
      return t2 ? n.getDirection(t2) : "sendrecv";
    }, n.getKind = function(e2) {
      return n.splitLines(e2)[0].split(" ")[0].substr(2);
    }, n.isRejected = function(e2) {
      return "0" === e2.split(" ", 2)[1];
    }, n.parseMLine = function(e2) {
      var t2 = n.splitLines(e2), r2 = t2[0].substr(2).split(" ");
      return { kind: r2[0], port: parseInt(r2[1], 10), protocol: r2[2], fmt: r2.slice(3).join(" ") };
    }, n.parseOLine = function(e2) {
      var t2 = n.matchPrefix(e2, "o=")[0], r2 = t2.substr(2).split(" ");
      return { username: r2[0], sessionId: r2[1], sessionVersion: parseInt(r2[2], 10), netType: r2[3], addressType: r2[4], address: r2[5] };
    }, e.exports = n;
  }, function(e, t, r) {
    e.exports = function(e2) {
      var t2 = e2 && e2.navigator, r2 = function(e3) {
        return { name: { PermissionDeniedError: "NotAllowedError" }[e3.name] || e3.name, message: e3.message, constraint: e3.constraint, toString: function() {
          return this.name;
        } };
      }, n = t2.mediaDevices.getUserMedia.bind(t2.mediaDevices);
      t2.mediaDevices.getUserMedia = function(e3) {
        return n(e3).catch(function(e4) {
          return Promise.reject(r2(e4));
        });
      };
    };
  }, function(e, t, r) {
    var n = r(6);
    e.exports = { shimGetUserMedia: r(111), shimOnTrack: function(e2) {
      "object" != typeof e2 || !e2.RTCPeerConnection || "ontrack" in e2.RTCPeerConnection.prototype || Object.defineProperty(e2.RTCPeerConnection.prototype, "ontrack", { get: function() {
        return this._ontrack;
      }, set: function(e3) {
        this._ontrack && (this.removeEventListener("track", this._ontrack), this.removeEventListener("addstream", this._ontrackpoly)), this.addEventListener("track", this._ontrack = e3), this.addEventListener("addstream", this._ontrackpoly = (function(e4) {
          e4.stream.getTracks().forEach((function(t2) {
            var r2 = new Event("track");
            r2.track = t2, r2.receiver = { track: t2 }, r2.transceiver = { receiver: r2.receiver }, r2.streams = [e4.stream], this.dispatchEvent(r2);
          }).bind(this));
        }).bind(this));
      }, enumerable: true, configurable: true }), "object" == typeof e2 && e2.RTCTrackEvent && "receiver" in e2.RTCTrackEvent.prototype && !("transceiver" in e2.RTCTrackEvent.prototype) && Object.defineProperty(e2.RTCTrackEvent.prototype, "transceiver", { get: function() {
        return { receiver: this.receiver };
      } });
    }, shimSourceObject: function(e2) {
      "object" == typeof e2 && (!e2.HTMLMediaElement || "srcObject" in e2.HTMLMediaElement.prototype || Object.defineProperty(e2.HTMLMediaElement.prototype, "srcObject", { get: function() {
        return this.mozSrcObject;
      }, set: function(e3) {
        this.mozSrcObject = e3;
      } }));
    }, shimPeerConnection: function(e2) {
      var t2 = n.detectBrowser(e2);
      if ("object" == typeof e2 && (e2.RTCPeerConnection || e2.mozRTCPeerConnection)) {
        e2.RTCPeerConnection || (e2.RTCPeerConnection = function(r3, n2) {
          if (t2.version < 38 && r3 && r3.iceServers) {
            for (var o2 = [], a2 = 0; a2 < r3.iceServers.length; a2++) {
              var i2 = r3.iceServers[a2];
              if (i2.hasOwnProperty("urls")) for (var s = 0; s < i2.urls.length; s++) {
                var c = { url: i2.urls[s] };
                0 === i2.urls[s].indexOf("turn") && (c.username = i2.username, c.credential = i2.credential), o2.push(c);
              }
              else o2.push(r3.iceServers[a2]);
            }
            r3.iceServers = o2;
          }
          return new e2.mozRTCPeerConnection(r3, n2);
        }, e2.RTCPeerConnection.prototype = e2.mozRTCPeerConnection.prototype, e2.mozRTCPeerConnection.generateCertificate && Object.defineProperty(e2.RTCPeerConnection, "generateCertificate", { get: function() {
          return e2.mozRTCPeerConnection.generateCertificate;
        } }), e2.RTCSessionDescription = e2.mozRTCSessionDescription, e2.RTCIceCandidate = e2.mozRTCIceCandidate), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t3) {
          var r3 = e2.RTCPeerConnection.prototype[t3];
          e2.RTCPeerConnection.prototype[t3] = function() {
            return arguments[0] = new ("addIceCandidate" === t3 ? e2.RTCIceCandidate : e2.RTCSessionDescription)(arguments[0]), r3.apply(this, arguments);
          };
        });
        var r2 = e2.RTCPeerConnection.prototype.addIceCandidate;
        e2.RTCPeerConnection.prototype.addIceCandidate = function() {
          return arguments[0] ? r2.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve());
        };
        var o = function(e3) {
          var t3 = /* @__PURE__ */ new Map();
          return Object.keys(e3).forEach(function(r3) {
            t3.set(r3, e3[r3]), t3[r3] = e3[r3];
          }), t3;
        }, a = { inboundrtp: "inbound-rtp", outboundrtp: "outbound-rtp", candidatepair: "candidate-pair", localcandidate: "local-candidate", remotecandidate: "remote-candidate" }, i = e2.RTCPeerConnection.prototype.getStats;
        e2.RTCPeerConnection.prototype.getStats = function(e3, r3, n2) {
          return i.apply(this, [e3 || null]).then(function(e4) {
            if (t2.version < 48 && (e4 = o(e4)), t2.version < 53 && !r3) try {
              e4.forEach(function(e5) {
                e5.type = a[e5.type] || e5.type;
              });
            } catch (t3) {
              if ("TypeError" !== t3.name) throw t3;
              e4.forEach(function(t4, r4) {
                e4.set(r4, Object.assign({}, t4, { type: a[t4.type] || t4.type }));
              });
            }
            return e4;
          }).then(r3, n2);
        };
      }
    }, shimSenderGetStats: function(e2) {
      if ("object" == typeof e2 && e2.RTCPeerConnection && e2.RTCRtpSender && !(e2.RTCRtpSender && "getStats" in e2.RTCRtpSender.prototype)) {
        var t2 = e2.RTCPeerConnection.prototype.getSenders;
        t2 && (e2.RTCPeerConnection.prototype.getSenders = function() {
          var e3 = this, r3 = t2.apply(e3, []);
          return r3.forEach(function(t3) {
            t3._pc = e3;
          }), r3;
        });
        var r2 = e2.RTCPeerConnection.prototype.addTrack;
        r2 && (e2.RTCPeerConnection.prototype.addTrack = function() {
          var e3 = r2.apply(this, arguments);
          return e3._pc = this, e3;
        }), e2.RTCRtpSender.prototype.getStats = function() {
          return this.track ? this._pc.getStats(this.track) : Promise.resolve(/* @__PURE__ */ new Map());
        };
      }
    }, shimReceiverGetStats: function(e2) {
      if ("object" == typeof e2 && e2.RTCPeerConnection && e2.RTCRtpSender && !(e2.RTCRtpSender && "getStats" in e2.RTCRtpReceiver.prototype)) {
        var t2 = e2.RTCPeerConnection.prototype.getReceivers;
        t2 && (e2.RTCPeerConnection.prototype.getReceivers = function() {
          var e3 = this, r2 = t2.apply(e3, []);
          return r2.forEach(function(t3) {
            t3._pc = e3;
          }), r2;
        }), n.wrapPeerConnectionEvent(e2, "track", function(e3) {
          return e3.receiver._pc = e3.srcElement, e3;
        }), e2.RTCRtpReceiver.prototype.getStats = function() {
          return this._pc.getStats(this.track);
        };
      }
    }, shimRemoveStream: function(e2) {
      !e2.RTCPeerConnection || "removeStream" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.removeStream = function(e3) {
        var t2 = this;
        n.deprecated("removeStream", "removeTrack"), this.getSenders().forEach(function(r2) {
          r2.track && -1 !== e3.getTracks().indexOf(r2.track) && t2.removeTrack(r2);
        });
      });
    }, shimRTCDataChannel: function(e2) {
      e2.DataChannel && !e2.RTCDataChannel && (e2.RTCDataChannel = e2.DataChannel);
    }, shimGetDisplayMedia: function(e2, t2) {
      !e2.navigator || !e2.navigator.mediaDevices || "getDisplayMedia" in e2.navigator.mediaDevices || (e2.navigator.mediaDevices.getDisplayMedia = function(r2) {
        if (!r2 || !r2.video) {
          var n2 = new DOMException("getDisplayMedia without video constraints is undefined");
          return n2.name = "NotFoundError", n2.code = 8, Promise.reject(n2);
        }
        return true === r2.video ? r2.video = { mediaSource: t2 } : r2.video.mediaSource = t2, e2.navigator.mediaDevices.getUserMedia(r2);
      }, e2.navigator.getDisplayMedia = function(t3) {
        return n.deprecated("navigator.getDisplayMedia", "navigator.mediaDevices.getDisplayMedia"), e2.navigator.mediaDevices.getDisplayMedia(t3);
      });
    } };
  }, function(e, t, r) {
    var n = r(6), o = n.log;
    e.exports = function(e2) {
      var t2 = n.detectBrowser(e2), r2 = e2 && e2.navigator, a = e2 && e2.MediaStreamTrack, i = function(e3) {
        return { name: { InternalError: "NotReadableError", NotSupportedError: "TypeError", PermissionDeniedError: "NotAllowedError", SecurityError: "NotAllowedError" }[e3.name] || e3.name, message: { "The operation is insecure.": "The request is not allowed by the user agent or the platform in the current context." }[e3.message] || e3.message, constraint: e3.constraint, toString: function() {
          return this.name + (this.message && ": ") + this.message;
        } };
      }, s = function(e3, n2, a2) {
        var s2 = function(e4) {
          if ("object" != typeof e4 || e4.require) return e4;
          var t3 = [];
          return Object.keys(e4).forEach(function(r3) {
            if ("require" !== r3 && "advanced" !== r3 && "mediaSource" !== r3) {
              var n3 = e4[r3] = "object" == typeof e4[r3] ? e4[r3] : { ideal: e4[r3] };
              if (void 0 === n3.min && void 0 === n3.max && void 0 === n3.exact || t3.push(r3), void 0 !== n3.exact && ("number" == typeof n3.exact ? n3.min = n3.max = n3.exact : e4[r3] = n3.exact, delete n3.exact), void 0 !== n3.ideal) {
                e4.advanced = e4.advanced || [];
                var o2 = {};
                "number" == typeof n3.ideal ? o2[r3] = { min: n3.ideal, max: n3.ideal } : o2[r3] = n3.ideal, e4.advanced.push(o2), delete n3.ideal, Object.keys(n3).length || delete e4[r3];
              }
            }
          }), t3.length && (e4.require = t3), e4;
        };
        return e3 = JSON.parse(JSON.stringify(e3)), t2.version < 38 && (o("spec: " + JSON.stringify(e3)), e3.audio && (e3.audio = s2(e3.audio)), e3.video && (e3.video = s2(e3.video)), o("ff37: " + JSON.stringify(e3))), r2.mozGetUserMedia(e3, n2, function(e4) {
          a2(i(e4));
        });
      }, c = function(e3) {
        return new Promise(function(t3, r3) {
          s(e3, t3, r3);
        });
      };
      if (r2.mediaDevices || (r2.mediaDevices = { getUserMedia: c, addEventListener: function() {
      }, removeEventListener: function() {
      } }), r2.mediaDevices.enumerateDevices = r2.mediaDevices.enumerateDevices || function() {
        return new Promise(function(e3) {
          e3([{ kind: "audioinput", deviceId: "default", label: "", groupId: "" }, { kind: "videoinput", deviceId: "default", label: "", groupId: "" }]);
        });
      }, t2.version < 41) {
        var d = r2.mediaDevices.enumerateDevices.bind(r2.mediaDevices);
        r2.mediaDevices.enumerateDevices = function() {
          return d().then(void 0, function(e3) {
            if ("NotFoundError" === e3.name) return [];
            throw e3;
          });
        };
      }
      if (t2.version < 49) {
        var u = r2.mediaDevices.getUserMedia.bind(r2.mediaDevices);
        r2.mediaDevices.getUserMedia = function(e3) {
          return u(e3).then(function(t3) {
            if (e3.audio && !t3.getAudioTracks().length || e3.video && !t3.getVideoTracks().length) throw t3.getTracks().forEach(function(e4) {
              e4.stop();
            }), new DOMException("The object can not be found here.", "NotFoundError");
            return t3;
          }, function(e4) {
            return Promise.reject(i(e4));
          });
        };
      }
      if (!(t2.version > 55 && "autoGainControl" in r2.mediaDevices.getSupportedConstraints())) {
        var l = function(e3, t3, r3) {
          t3 in e3 && !(r3 in e3) && (e3[r3] = e3[t3], delete e3[t3]);
        }, f = r2.mediaDevices.getUserMedia.bind(r2.mediaDevices);
        if (r2.mediaDevices.getUserMedia = function(e3) {
          return "object" == typeof e3 && "object" == typeof e3.audio && (e3 = JSON.parse(JSON.stringify(e3)), l(e3.audio, "autoGainControl", "mozAutoGainControl"), l(e3.audio, "noiseSuppression", "mozNoiseSuppression")), f(e3);
        }, a && a.prototype.getSettings) {
          var p = a.prototype.getSettings;
          a.prototype.getSettings = function() {
            var e3 = p.apply(this, arguments);
            return l(e3, "mozAutoGainControl", "autoGainControl"), l(e3, "mozNoiseSuppression", "noiseSuppression"), e3;
          };
        }
        if (a && a.prototype.applyConstraints) {
          var m = a.prototype.applyConstraints;
          a.prototype.applyConstraints = function(e3) {
            return "audio" === this.kind && "object" == typeof e3 && (e3 = JSON.parse(JSON.stringify(e3)), l(e3, "autoGainControl", "mozAutoGainControl"), l(e3, "noiseSuppression", "mozNoiseSuppression")), m.apply(this, [e3]);
          };
        }
      }
      r2.getUserMedia = function(e3, o2, a2) {
        if (t2.version < 44) return s(e3, o2, a2);
        n.deprecated("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), r2.mediaDevices.getUserMedia(e3).then(o2, a2);
      };
    };
  }, function(e, t, r) {
    var n = r(6);
    e.exports = { shimLocalStreamsAPI: function(e2) {
      if ("object" == typeof e2 && e2.RTCPeerConnection) {
        if ("getLocalStreams" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.getLocalStreams = function() {
          return this._localStreams || (this._localStreams = []), this._localStreams;
        }), "getStreamById" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.getStreamById = function(e3) {
          var t3 = null;
          return this._localStreams && this._localStreams.forEach(function(r2) {
            r2.id === e3 && (t3 = r2);
          }), this._remoteStreams && this._remoteStreams.forEach(function(r2) {
            r2.id === e3 && (t3 = r2);
          }), t3;
        }), !("addStream" in e2.RTCPeerConnection.prototype)) {
          var t2 = e2.RTCPeerConnection.prototype.addTrack;
          e2.RTCPeerConnection.prototype.addStream = function(e3) {
            this._localStreams || (this._localStreams = []), -1 === this._localStreams.indexOf(e3) && this._localStreams.push(e3);
            var r2 = this;
            e3.getTracks().forEach(function(n2) {
              t2.call(r2, n2, e3);
            });
          }, e2.RTCPeerConnection.prototype.addTrack = function(e3, r2) {
            return r2 && (this._localStreams ? -1 === this._localStreams.indexOf(r2) && this._localStreams.push(r2) : this._localStreams = [r2]), t2.call(this, e3, r2);
          };
        }
        "removeStream" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.removeStream = function(e3) {
          this._localStreams || (this._localStreams = []);
          var t3 = this._localStreams.indexOf(e3);
          if (-1 !== t3) {
            this._localStreams.splice(t3, 1);
            var r2 = this, n2 = e3.getTracks();
            this.getSenders().forEach(function(e4) {
              -1 !== n2.indexOf(e4.track) && r2.removeTrack(e4);
            });
          }
        });
      }
    }, shimRemoteStreamsAPI: function(e2) {
      if ("object" == typeof e2 && e2.RTCPeerConnection && ("getRemoteStreams" in e2.RTCPeerConnection.prototype || (e2.RTCPeerConnection.prototype.getRemoteStreams = function() {
        return this._remoteStreams ? this._remoteStreams : [];
      }), !("onaddstream" in e2.RTCPeerConnection.prototype))) {
        Object.defineProperty(e2.RTCPeerConnection.prototype, "onaddstream", { get: function() {
          return this._onaddstream;
        }, set: function(e3) {
          this._onaddstream && this.removeEventListener("addstream", this._onaddstream), this.addEventListener("addstream", this._onaddstream = e3);
        } });
        var t2 = e2.RTCPeerConnection.prototype.setRemoteDescription;
        e2.RTCPeerConnection.prototype.setRemoteDescription = function() {
          var e3 = this;
          return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(t3) {
            t3.streams.forEach(function(t4) {
              if (e3._remoteStreams || (e3._remoteStreams = []), !(e3._remoteStreams.indexOf(t4) >= 0)) {
                e3._remoteStreams.push(t4);
                var r2 = new Event("addstream");
                r2.stream = t4, e3.dispatchEvent(r2);
              }
            });
          }), t2.apply(e3, arguments);
        };
      }
    }, shimCallbacksAPI: function(e2) {
      if ("object" == typeof e2 && e2.RTCPeerConnection) {
        var t2 = e2.RTCPeerConnection.prototype, r2 = t2.createOffer, n2 = t2.createAnswer, o = t2.setLocalDescription, a = t2.setRemoteDescription, i = t2.addIceCandidate;
        t2.createOffer = function(e3, t3) {
          var n3 = arguments.length >= 2 ? arguments[2] : arguments[0], o2 = r2.apply(this, [n3]);
          return t3 ? (o2.then(e3, t3), Promise.resolve()) : o2;
        }, t2.createAnswer = function(e3, t3) {
          var r3 = arguments.length >= 2 ? arguments[2] : arguments[0], o2 = n2.apply(this, [r3]);
          return t3 ? (o2.then(e3, t3), Promise.resolve()) : o2;
        };
        var s = function(e3, t3, r3) {
          var n3 = o.apply(this, [e3]);
          return r3 ? (n3.then(t3, r3), Promise.resolve()) : n3;
        };
        t2.setLocalDescription = s, s = function(e3, t3, r3) {
          var n3 = a.apply(this, [e3]);
          return r3 ? (n3.then(t3, r3), Promise.resolve()) : n3;
        }, t2.setRemoteDescription = s, s = function(e3, t3, r3) {
          var n3 = i.apply(this, [e3]);
          return r3 ? (n3.then(t3, r3), Promise.resolve()) : n3;
        }, t2.addIceCandidate = s;
      }
    }, shimGetUserMedia: function(e2) {
      var t2 = e2 && e2.navigator;
      t2.getUserMedia || (t2.webkitGetUserMedia ? t2.getUserMedia = t2.webkitGetUserMedia.bind(t2) : t2.mediaDevices && t2.mediaDevices.getUserMedia && (t2.getUserMedia = (function(e3, r2, n2) {
        t2.mediaDevices.getUserMedia(e3).then(r2, n2);
      }).bind(t2)));
    }, shimRTCIceServerUrls: function(e2) {
      var t2 = e2.RTCPeerConnection;
      e2.RTCPeerConnection = function(e3, r2) {
        if (e3 && e3.iceServers) {
          for (var o = [], a = 0; a < e3.iceServers.length; a++) {
            var i = e3.iceServers[a];
            !i.hasOwnProperty("urls") && i.hasOwnProperty("url") ? (n.deprecated("RTCIceServer.url", "RTCIceServer.urls"), i = JSON.parse(JSON.stringify(i)), i.urls = i.url, delete i.url, o.push(i)) : o.push(e3.iceServers[a]);
          }
          e3.iceServers = o;
        }
        return new t2(e3, r2);
      }, e2.RTCPeerConnection.prototype = t2.prototype, "generateCertificate" in e2.RTCPeerConnection && Object.defineProperty(e2.RTCPeerConnection, "generateCertificate", { get: function() {
        return t2.generateCertificate;
      } });
    }, shimTrackEventTransceiver: function(e2) {
      "object" == typeof e2 && e2.RTCPeerConnection && "receiver" in e2.RTCTrackEvent.prototype && !e2.RTCTransceiver && Object.defineProperty(e2.RTCTrackEvent.prototype, "transceiver", { get: function() {
        return { receiver: this.receiver };
      } });
    }, shimCreateOfferLegacy: function(e2) {
      var t2 = e2.RTCPeerConnection.prototype.createOffer;
      e2.RTCPeerConnection.prototype.createOffer = function(e3) {
        var r2 = this;
        if (e3) {
          void 0 !== e3.offerToReceiveAudio && (e3.offerToReceiveAudio = !!e3.offerToReceiveAudio);
          var n2 = r2.getTransceivers().find(function(e4) {
            return e4.sender.track && "audio" === e4.sender.track.kind;
          });
          false === e3.offerToReceiveAudio && n2 ? "sendrecv" === n2.direction ? n2.setDirection ? n2.setDirection("sendonly") : n2.direction = "sendonly" : "recvonly" === n2.direction && (n2.setDirection ? n2.setDirection("inactive") : n2.direction = "inactive") : true !== e3.offerToReceiveAudio || n2 || r2.addTransceiver("audio"), void 0 !== e3.offerToReceiveVideo && (e3.offerToReceiveVideo = !!e3.offerToReceiveVideo);
          var o = r2.getTransceivers().find(function(e4) {
            return e4.sender.track && "video" === e4.sender.track.kind;
          });
          false === e3.offerToReceiveVideo && o ? "sendrecv" === o.direction ? o.setDirection("sendonly") : "recvonly" === o.direction && o.setDirection("inactive") : true !== e3.offerToReceiveVideo || o || r2.addTransceiver("video");
        }
        return t2.apply(r2, arguments);
      };
    } };
  }, function(e, t, r) {
    var n = r(114), o = r(6);
    e.exports = { shimRTCIceCandidate: function(e2) {
      if (e2.RTCIceCandidate && !(e2.RTCIceCandidate && "foundation" in e2.RTCIceCandidate.prototype)) {
        var t2 = e2.RTCIceCandidate;
        e2.RTCIceCandidate = function(e3) {
          if ("object" == typeof e3 && e3.candidate && 0 === e3.candidate.indexOf("a=") && (e3 = JSON.parse(JSON.stringify(e3)), e3.candidate = e3.candidate.substr(2)), e3.candidate && e3.candidate.length) {
            var r2 = new t2(e3), o2 = n.parseCandidate(e3.candidate), a = Object.assign(r2, o2);
            return a.toJSON = function() {
              return { candidate: a.candidate, sdpMid: a.sdpMid, sdpMLineIndex: a.sdpMLineIndex, usernameFragment: a.usernameFragment };
            }, a;
          }
          return new t2(e3);
        }, e2.RTCIceCandidate.prototype = t2.prototype, o.wrapPeerConnectionEvent(e2, "icecandidate", function(t3) {
          return t3.candidate && Object.defineProperty(t3, "candidate", { value: new e2.RTCIceCandidate(t3.candidate), writable: "false" }), t3;
        });
      }
    }, shimCreateObjectURL: function(e2) {
      var t2 = e2 && e2.URL;
      if ("object" == typeof e2 && e2.HTMLMediaElement && "srcObject" in e2.HTMLMediaElement.prototype && t2.createObjectURL && t2.revokeObjectURL) {
        var r2 = t2.createObjectURL.bind(t2), n2 = t2.revokeObjectURL.bind(t2), a = /* @__PURE__ */ new Map(), i = 0;
        t2.createObjectURL = function(e3) {
          if ("getTracks" in e3) {
            var t3 = "polyblob:" + ++i;
            return a.set(t3, e3), o.deprecated("URL.createObjectURL(stream)", "elem.srcObject = stream"), t3;
          }
          return r2(e3);
        }, t2.revokeObjectURL = function(e3) {
          n2(e3), a.delete(e3);
        };
        var s = Object.getOwnPropertyDescriptor(e2.HTMLMediaElement.prototype, "src");
        Object.defineProperty(e2.HTMLMediaElement.prototype, "src", { get: function() {
          return s.get.apply(this);
        }, set: function(e3) {
          return this.srcObject = a.get(e3) || null, s.set.apply(this, [e3]);
        } });
        var c = e2.HTMLMediaElement.prototype.setAttribute;
        e2.HTMLMediaElement.prototype.setAttribute = function() {
          return 2 === arguments.length && "src" === ("" + arguments[0]).toLowerCase() && (this.srcObject = a.get(arguments[1]) || null), c.apply(this, arguments);
        };
      }
    }, shimMaxMessageSize: function(e2) {
      if (!e2.RTCSctpTransport && e2.RTCPeerConnection) {
        var t2 = o.detectBrowser(e2);
        "sctp" in e2.RTCPeerConnection.prototype || Object.defineProperty(e2.RTCPeerConnection.prototype, "sctp", { get: function() {
          return void 0 === this._sctp ? null : this._sctp;
        } });
        var r2 = function(e3) {
          var t3 = n.splitSections(e3.sdp);
          return t3.shift(), t3.some(function(e4) {
            var t4 = n.parseMLine(e4);
            return t4 && "application" === t4.kind && -1 !== t4.protocol.indexOf("SCTP");
          });
        }, a = function(e3) {
          var t3 = e3.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
          if (null === t3 || t3.length < 2) return -1;
          var r3 = parseInt(t3[1], 10);
          return r3 !== r3 ? -1 : r3;
        }, i = function(e3) {
          var r3 = 65536;
          return "firefox" === t2.browser && (r3 = t2.version < 57 ? -1 === e3 ? 16384 : 2147483637 : t2.version < 60 ? 57 === t2.version ? 65535 : 65536 : 2147483637), r3;
        }, s = function(e3, r3) {
          var o2 = 65536;
          "firefox" === t2.browser && 57 === t2.version && (o2 = 65535);
          var a2 = n.matchPrefix(e3.sdp, "a=max-message-size:");
          return a2.length > 0 ? o2 = parseInt(a2[0].substr(19), 10) : "firefox" === t2.browser && -1 !== r3 && (o2 = 2147483637), o2;
        }, c = e2.RTCPeerConnection.prototype.setRemoteDescription;
        e2.RTCPeerConnection.prototype.setRemoteDescription = function() {
          var e3 = this;
          if (e3._sctp = null, r2(arguments[0])) {
            var t3, n2 = a(arguments[0]), o2 = i(n2), d = s(arguments[0], n2);
            t3 = 0 === o2 && 0 === d ? Number.POSITIVE_INFINITY : 0 === o2 || 0 === d ? Math.max(o2, d) : Math.min(o2, d);
            var u = {};
            Object.defineProperty(u, "maxMessageSize", { get: function() {
              return t3;
            } }), e3._sctp = u;
          }
          return c.apply(e3, arguments);
        };
      }
    }, shimSendThrowTypeError: function(e2) {
      function t2(e3, t3) {
        var r3 = e3.send;
        e3.send = function() {
          var n2 = arguments[0], o2 = n2.length || n2.size || n2.byteLength;
          if ("open" === e3.readyState && t3.sctp && o2 > t3.sctp.maxMessageSize) throw new TypeError("Message too large (can send a maximum of " + t3.sctp.maxMessageSize + " bytes)");
          return r3.apply(e3, arguments);
        };
      }
      if (e2.RTCPeerConnection && "createDataChannel" in e2.RTCPeerConnection.prototype) {
        var r2 = e2.RTCPeerConnection.prototype.createDataChannel;
        e2.RTCPeerConnection.prototype.createDataChannel = function() {
          var e3 = this, n2 = r2.apply(e3, arguments);
          return t2(n2, e3), n2;
        }, o.wrapPeerConnectionEvent(e2, "datachannel", function(e3) {
          return t2(e3.channel, e3.target), e3;
        });
      }
    } };
  }, function(e, t, r) {
    var n = {};
    n.generateIdentifier = function() {
      return Math.random().toString(36).substr(2, 10);
    }, n.localCName = n.generateIdentifier(), n.splitLines = function(e2) {
      return e2.trim().split("\n").map(function(e3) {
        return e3.trim();
      });
    }, n.splitSections = function(e2) {
      return e2.split("\nm=").map(function(e3, t2) {
        return (t2 > 0 ? "m=" + e3 : e3).trim() + "\r\n";
      });
    }, n.getDescription = function(e2) {
      var t2 = n.splitSections(e2);
      return t2 && t2[0];
    }, n.getMediaSections = function(e2) {
      var t2 = n.splitSections(e2);
      return t2.shift(), t2;
    }, n.matchPrefix = function(e2, t2) {
      return n.splitLines(e2).filter(function(e3) {
        return 0 === e3.indexOf(t2);
      });
    }, n.parseCandidate = function(e2) {
      var t2;
      t2 = 0 === e2.indexOf("a=candidate:") ? e2.substring(12).split(" ") : e2.substring(10).split(" ");
      for (var r2 = { foundation: t2[0], component: parseInt(t2[1], 10), protocol: t2[2].toLowerCase(), priority: parseInt(t2[3], 10), ip: t2[4], address: t2[4], port: parseInt(t2[5], 10), type: t2[7] }, n2 = 8; n2 < t2.length; n2 += 2) switch (t2[n2]) {
        case "raddr":
          r2.relatedAddress = t2[n2 + 1];
          break;
        case "rport":
          r2.relatedPort = parseInt(t2[n2 + 1], 10);
          break;
        case "tcptype":
          r2.tcpType = t2[n2 + 1];
          break;
        case "ufrag":
          r2.ufrag = t2[n2 + 1], r2.usernameFragment = t2[n2 + 1];
          break;
        default:
          r2[t2[n2]] = t2[n2 + 1];
      }
      return r2;
    }, n.writeCandidate = function(e2) {
      var t2 = [];
      t2.push(e2.foundation), t2.push(e2.component), t2.push(e2.protocol.toUpperCase()), t2.push(e2.priority), t2.push(e2.address || e2.ip), t2.push(e2.port);
      var r2 = e2.type;
      return t2.push("typ"), t2.push(r2), "host" !== r2 && e2.relatedAddress && e2.relatedPort && (t2.push("raddr"), t2.push(e2.relatedAddress), t2.push("rport"), t2.push(e2.relatedPort)), e2.tcpType && "tcp" === e2.protocol.toLowerCase() && (t2.push("tcptype"), t2.push(e2.tcpType)), (e2.usernameFragment || e2.ufrag) && (t2.push("ufrag"), t2.push(e2.usernameFragment || e2.ufrag)), "candidate:" + t2.join(" ");
    }, n.parseIceOptions = function(e2) {
      return e2.substr(14).split(" ");
    }, n.parseRtpMap = function(e2) {
      var t2 = e2.substr(9).split(" "), r2 = { payloadType: parseInt(t2.shift(), 10) };
      return t2 = t2[0].split("/"), r2.name = t2[0], r2.clockRate = parseInt(t2[1], 10), r2.channels = 3 === t2.length ? parseInt(t2[2], 10) : 1, r2.numChannels = r2.channels, r2;
    }, n.writeRtpMap = function(e2) {
      var t2 = e2.payloadType;
      void 0 !== e2.preferredPayloadType && (t2 = e2.preferredPayloadType);
      var r2 = e2.channels || e2.numChannels || 1;
      return "a=rtpmap:" + t2 + " " + e2.name + "/" + e2.clockRate + (1 !== r2 ? "/" + r2 : "") + "\r\n";
    }, n.parseExtmap = function(e2) {
      var t2 = e2.substr(9).split(" ");
      return { id: parseInt(t2[0], 10), direction: t2[0].indexOf("/") > 0 ? t2[0].split("/")[1] : "sendrecv", uri: t2[1] };
    }, n.writeExtmap = function(e2) {
      return "a=extmap:" + (e2.id || e2.preferredId) + (e2.direction && "sendrecv" !== e2.direction ? "/" + e2.direction : "") + " " + e2.uri + "\r\n";
    }, n.parseFmtp = function(e2) {
      for (var t2, r2 = {}, n2 = e2.substr(e2.indexOf(" ") + 1).split(";"), o = 0; o < n2.length; o++) t2 = n2[o].trim().split("="), r2[t2[0].trim()] = t2[1];
      return r2;
    }, n.writeFmtp = function(e2) {
      var t2 = "", r2 = e2.payloadType;
      if (void 0 !== e2.preferredPayloadType && (r2 = e2.preferredPayloadType), e2.parameters && Object.keys(e2.parameters).length) {
        var n2 = [];
        Object.keys(e2.parameters).forEach(function(t3) {
          e2.parameters[t3] ? n2.push(t3 + "=" + e2.parameters[t3]) : n2.push(t3);
        }), t2 += "a=fmtp:" + r2 + " " + n2.join(";") + "\r\n";
      }
      return t2;
    }, n.parseRtcpFb = function(e2) {
      var t2 = e2.substr(e2.indexOf(" ") + 1).split(" ");
      return { type: t2.shift(), parameter: t2.join(" ") };
    }, n.writeRtcpFb = function(e2) {
      var t2 = "", r2 = e2.payloadType;
      return void 0 !== e2.preferredPayloadType && (r2 = e2.preferredPayloadType), e2.rtcpFeedback && e2.rtcpFeedback.length && e2.rtcpFeedback.forEach(function(e3) {
        t2 += "a=rtcp-fb:" + r2 + " " + e3.type + (e3.parameter && e3.parameter.length ? " " + e3.parameter : "") + "\r\n";
      }), t2;
    }, n.parseSsrcMedia = function(e2) {
      var t2 = e2.indexOf(" "), r2 = { ssrc: parseInt(e2.substr(7, t2 - 7), 10) }, n2 = e2.indexOf(":", t2);
      return n2 > -1 ? (r2.attribute = e2.substr(t2 + 1, n2 - t2 - 1), r2.value = e2.substr(n2 + 1)) : r2.attribute = e2.substr(t2 + 1), r2;
    }, n.parseSsrcGroup = function(e2) {
      var t2 = e2.substr(13).split(" ");
      return { semantics: t2.shift(), ssrcs: t2.map(function(e3) {
        return parseInt(e3, 10);
      }) };
    }, n.getMid = function(e2) {
      var t2 = n.matchPrefix(e2, "a=mid:")[0];
      if (t2) return t2.substr(6);
    }, n.parseFingerprint = function(e2) {
      var t2 = e2.substr(14).split(" ");
      return { algorithm: t2[0].toLowerCase(), value: t2[1] };
    }, n.getDtlsParameters = function(e2, t2) {
      return { role: "auto", fingerprints: n.matchPrefix(e2 + t2, "a=fingerprint:").map(n.parseFingerprint) };
    }, n.writeDtlsParameters = function(e2, t2) {
      var r2 = "a=setup:" + t2 + "\r\n";
      return e2.fingerprints.forEach(function(e3) {
        r2 += "a=fingerprint:" + e3.algorithm + " " + e3.value + "\r\n";
      }), r2;
    }, n.getIceParameters = function(e2, t2) {
      var r2 = n.splitLines(e2);
      return r2 = r2.concat(n.splitLines(t2)), { usernameFragment: r2.filter(function(e3) {
        return 0 === e3.indexOf("a=ice-ufrag:");
      })[0].substr(12), password: r2.filter(function(e3) {
        return 0 === e3.indexOf("a=ice-pwd:");
      })[0].substr(10) };
    }, n.writeIceParameters = function(e2) {
      return "a=ice-ufrag:" + e2.usernameFragment + "\r\na=ice-pwd:" + e2.password + "\r\n";
    }, n.parseRtpParameters = function(e2) {
      for (var t2 = { codecs: [], headerExtensions: [], fecMechanisms: [], rtcp: [] }, r2 = n.splitLines(e2), o = r2[0].split(" "), a = 3; a < o.length; a++) {
        var i = o[a], s = n.matchPrefix(e2, "a=rtpmap:" + i + " ")[0];
        if (s) {
          var c = n.parseRtpMap(s), d = n.matchPrefix(e2, "a=fmtp:" + i + " ");
          switch (c.parameters = d.length ? n.parseFmtp(d[0]) : {}, c.rtcpFeedback = n.matchPrefix(e2, "a=rtcp-fb:" + i + " ").map(n.parseRtcpFb), t2.codecs.push(c), c.name.toUpperCase()) {
            case "RED":
            case "ULPFEC":
              t2.fecMechanisms.push(c.name.toUpperCase());
          }
        }
      }
      return n.matchPrefix(e2, "a=extmap:").forEach(function(e3) {
        t2.headerExtensions.push(n.parseExtmap(e3));
      }), t2;
    }, n.writeRtpDescription = function(e2, t2) {
      var r2 = "";
      r2 += "m=" + e2 + " ", r2 += t2.codecs.length > 0 ? "9" : "0", r2 += " UDP/TLS/RTP/SAVPF ", r2 += t2.codecs.map(function(e3) {
        return void 0 !== e3.preferredPayloadType ? e3.preferredPayloadType : e3.payloadType;
      }).join(" ") + "\r\n", r2 += "c=IN IP4 0.0.0.0\r\n", r2 += "a=rtcp:9 IN IP4 0.0.0.0\r\n", t2.codecs.forEach(function(e3) {
        r2 += n.writeRtpMap(e3), r2 += n.writeFmtp(e3), r2 += n.writeRtcpFb(e3);
      });
      var o = 0;
      return t2.codecs.forEach(function(e3) {
        e3.maxptime > o && (o = e3.maxptime);
      }), o > 0 && (r2 += "a=maxptime:" + o + "\r\n"), r2 += "a=rtcp-mux\r\n", t2.headerExtensions && t2.headerExtensions.forEach(function(e3) {
        r2 += n.writeExtmap(e3);
      }), r2;
    }, n.parseRtpEncodingParameters = function(e2) {
      var t2, r2 = [], o = n.parseRtpParameters(e2), a = -1 !== o.fecMechanisms.indexOf("RED"), i = -1 !== o.fecMechanisms.indexOf("ULPFEC"), s = n.matchPrefix(e2, "a=ssrc:").map(function(e3) {
        return n.parseSsrcMedia(e3);
      }).filter(function(e3) {
        return "cname" === e3.attribute;
      }), c = s.length > 0 && s[0].ssrc, d = n.matchPrefix(e2, "a=ssrc-group:FID").map(function(e3) {
        return e3.substr(17).split(" ").map(function(e4) {
          return parseInt(e4, 10);
        });
      });
      d.length > 0 && d[0].length > 1 && d[0][0] === c && (t2 = d[0][1]), o.codecs.forEach(function(e3) {
        if ("RTX" === e3.name.toUpperCase() && e3.parameters.apt) {
          var n2 = { ssrc: c, codecPayloadType: parseInt(e3.parameters.apt, 10) };
          c && t2 && (n2.rtx = { ssrc: t2 }), r2.push(n2), a && (n2 = JSON.parse(JSON.stringify(n2)), n2.fec = { ssrc: c, mechanism: i ? "red+ulpfec" : "red" }, r2.push(n2));
        }
      }), 0 === r2.length && c && r2.push({ ssrc: c });
      var u = n.matchPrefix(e2, "b=");
      return u.length && (u = 0 === u[0].indexOf("b=TIAS:") ? parseInt(u[0].substr(7), 10) : 0 === u[0].indexOf("b=AS:") ? 1e3 * parseInt(u[0].substr(5), 10) * 0.95 - 16e3 : void 0, r2.forEach(function(e3) {
        e3.maxBitrate = u;
      })), r2;
    }, n.parseRtcpParameters = function(e2) {
      var t2 = {}, r2 = n.matchPrefix(e2, "a=ssrc:").map(function(e3) {
        return n.parseSsrcMedia(e3);
      }).filter(function(e3) {
        return "cname" === e3.attribute;
      })[0];
      r2 && (t2.cname = r2.value, t2.ssrc = r2.ssrc);
      var o = n.matchPrefix(e2, "a=rtcp-rsize");
      t2.reducedSize = o.length > 0, t2.compound = 0 === o.length;
      var a = n.matchPrefix(e2, "a=rtcp-mux");
      return t2.mux = a.length > 0, t2;
    }, n.parseMsid = function(e2) {
      var t2, r2 = n.matchPrefix(e2, "a=msid:");
      if (1 === r2.length) return t2 = r2[0].substr(7).split(" "), { stream: t2[0], track: t2[1] };
      var o = n.matchPrefix(e2, "a=ssrc:").map(function(e3) {
        return n.parseSsrcMedia(e3);
      }).filter(function(e3) {
        return "msid" === e3.attribute;
      });
      return o.length > 0 ? (t2 = o[0].value.split(" "), { stream: t2[0], track: t2[1] }) : void 0;
    }, n.generateSessionId = function() {
      return Math.random().toString().substr(2, 21);
    }, n.writeSessionBoilerplate = function(e2, t2, r2) {
      var o, a = void 0 !== t2 ? t2 : 2;
      return o = e2 || n.generateSessionId(), "v=0\r\no=" + (r2 || "thisisadapterortc") + " " + o + " " + a + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n";
    }, n.writeMediaSection = function(e2, t2, r2, o) {
      var a = n.writeRtpDescription(e2.kind, t2);
      if (a += n.writeIceParameters(e2.iceGatherer.getLocalParameters()), a += n.writeDtlsParameters(e2.dtlsTransport.getLocalParameters(), "offer" === r2 ? "actpass" : "active"), a += "a=mid:" + e2.mid + "\r\n", e2.direction ? a += "a=" + e2.direction + "\r\n" : e2.rtpSender && e2.rtpReceiver ? a += "a=sendrecv\r\n" : e2.rtpSender ? a += "a=sendonly\r\n" : e2.rtpReceiver ? a += "a=recvonly\r\n" : a += "a=inactive\r\n", e2.rtpSender) {
        var i = "msid:" + o.id + " " + e2.rtpSender.track.id + "\r\n";
        a += "a=" + i, a += "a=ssrc:" + e2.sendEncodingParameters[0].ssrc + " " + i, e2.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e2.sendEncodingParameters[0].rtx.ssrc + " " + i, a += "a=ssrc-group:FID " + e2.sendEncodingParameters[0].ssrc + " " + e2.sendEncodingParameters[0].rtx.ssrc + "\r\n");
      }
      return a += "a=ssrc:" + e2.sendEncodingParameters[0].ssrc + " cname:" + n.localCName + "\r\n", e2.rtpSender && e2.sendEncodingParameters[0].rtx && (a += "a=ssrc:" + e2.sendEncodingParameters[0].rtx.ssrc + " cname:" + n.localCName + "\r\n"), a;
    }, n.getDirection = function(e2, t2) {
      for (var r2 = n.splitLines(e2), o = 0; o < r2.length; o++) switch (r2[o]) {
        case "a=sendrecv":
        case "a=sendonly":
        case "a=recvonly":
        case "a=inactive":
          return r2[o].substr(2);
      }
      return t2 ? n.getDirection(t2) : "sendrecv";
    }, n.getKind = function(e2) {
      return n.splitLines(e2)[0].split(" ")[0].substr(2);
    }, n.isRejected = function(e2) {
      return "0" === e2.split(" ", 2)[1];
    }, n.parseMLine = function(e2) {
      var t2 = n.splitLines(e2), r2 = t2[0].substr(2).split(" ");
      return { kind: r2[0], port: parseInt(r2[1], 10), protocol: r2[2], fmt: r2.slice(3).join(" ") };
    }, n.parseOLine = function(e2) {
      var t2 = n.matchPrefix(e2, "o=")[0], r2 = t2.substr(2).split(" ");
      return { username: r2[0], sessionId: r2[1], sessionVersion: parseInt(r2[2], 10), netType: r2[3], addressType: r2[4], address: r2[5] };
    }, n.isValidSDP = function(e2) {
      if ("string" != typeof e2 || 0 === e2.length) return false;
      for (var t2 = n.splitLines(e2), r2 = 0; r2 < t2.length; r2++) if (t2[r2].length < 2 || "=" !== t2[r2].charAt(1)) return false;
      return true;
    }, e.exports = n;
  }, function(e, t, r) {
    e.exports = { default: r(116), __esModule: true };
  }, function(e, t, r) {
    r(117), e.exports = r(0).Object.getPrototypeOf;
  }, function(e, t, r) {
    var n = r(35), o = r(52);
    r(118)("getPrototypeOf", function() {
      return function(e2) {
        return o(n(e2));
      };
    });
  }, function(e, t, r) {
    var n = r(3), o = r(0), a = r(16);
    e.exports = function(e2, t2) {
      var r2 = (o.Object || {})[e2] || Object[e2], i = {};
      i[e2] = t2(r2), n(n.S + n.F * a(function() {
        r2(1);
      }), "Object", i);
    };
  }, function(e, t, r) {
    t.__esModule = true;
    var n = r(65), o = function(e2) {
      return e2 && e2.__esModule ? e2 : { default: e2 };
    }(n);
    t.default = function(e2, t2) {
      if (!e2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !t2 || "object" !== (void 0 === t2 ? "undefined" : (0, o.default)(t2)) && "function" != typeof t2 ? e2 : t2;
    };
  }, function(e, t, r) {
    e.exports = { default: r(121), __esModule: true };
  }, function(e, t, r) {
    r(24), r(53), e.exports = r(39).f("iterator");
  }, function(e, t, r) {
    e.exports = { default: r(123), __esModule: true };
  }, function(e, t, r) {
    r(124), r(46), r(129), r(130), e.exports = r(0).Symbol;
  }, function(e, t, r) {
    var n = r(1), o = r(10), a = r(8), i = r(3), s = r(49), c = r(125).KEY, d = r(16), u = r(33), l = r(23), f = r(22), p = r(2), m = r(39), v = r(40), h = r(126), k = r(127), C = r(5), y = r(7), g = r(14), P = r(28), w = r(17), B = r(29), b = r(128), S = r(68), T = r(4), x = r(30), R = S.f, E = T.f, _ = b.f, M = n.Symbol, O = n.JSON, L = O && O.stringify, I = p("_hidden"), D = p("toPrimitive"), j = {}.propertyIsEnumerable, N = u("symbol-registry"), A = u("symbols"), F = u("op-symbols"), U = Object.prototype, G = "function" == typeof M, z = n.QObject, X = !z || !z.prototype || !z.prototype.findChild, V = a && d(function() {
      return 7 != B(E({}, "a", { get: function() {
        return E(this, "a", { value: 7 }).a;
      } })).a;
    }) ? function(e2, t2, r2) {
      var n2 = R(U, t2);
      n2 && delete U[t2], E(e2, t2, r2), n2 && e2 !== U && E(U, t2, n2);
    } : E, J = function(e2) {
      var t2 = A[e2] = B(M.prototype);
      return t2._k = e2, t2;
    }, H = G && "symbol" == typeof M.iterator ? function(e2) {
      return "symbol" == typeof e2;
    } : function(e2) {
      return e2 instanceof M;
    }, W = function(e2, t2, r2) {
      return e2 === U && W(F, t2, r2), C(e2), t2 = P(t2, true), C(r2), o(A, t2) ? (r2.enumerable ? (o(e2, I) && e2[I][t2] && (e2[I][t2] = false), r2 = B(r2, { enumerable: w(0, false) })) : (o(e2, I) || E(e2, I, w(1, {})), e2[I][t2] = true), V(e2, t2, r2)) : E(e2, t2, r2);
    }, q = function(e2, t2) {
      C(e2);
      for (var r2, n2 = h(t2 = g(t2)), o2 = 0, a2 = n2.length; a2 > o2; ) W(e2, r2 = n2[o2++], t2[r2]);
      return e2;
    }, K = function(e2, t2) {
      return void 0 === t2 ? B(e2) : q(B(e2), t2);
    }, $ = function(e2) {
      var t2 = j.call(this, e2 = P(e2, true));
      return !(this === U && o(A, e2) && !o(F, e2)) && (!(t2 || !o(this, e2) || !o(A, e2) || o(this, I) && this[I][e2]) || t2);
    }, Z = function(e2, t2) {
      if (e2 = g(e2), t2 = P(t2, true), e2 !== U || !o(A, t2) || o(F, t2)) {
        var r2 = R(e2, t2);
        return !r2 || !o(A, t2) || o(e2, I) && e2[I][t2] || (r2.enumerable = true), r2;
      }
    }, Y = function(e2) {
      for (var t2, r2 = _(g(e2)), n2 = [], a2 = 0; r2.length > a2; ) o(A, t2 = r2[a2++]) || t2 == I || t2 == c || n2.push(t2);
      return n2;
    }, Q = function(e2) {
      for (var t2, r2 = e2 === U, n2 = _(r2 ? F : g(e2)), a2 = [], i2 = 0; n2.length > i2; ) !o(A, t2 = n2[i2++]) || r2 && !o(U, t2) || a2.push(A[t2]);
      return a2;
    };
    G || (M = function() {
      if (this instanceof M) throw TypeError("Symbol is not a constructor!");
      var e2 = f(arguments.length > 0 ? arguments[0] : void 0), t2 = function(r2) {
        this === U && t2.call(F, r2), o(this, I) && o(this[I], e2) && (this[I][e2] = false), V(this, e2, w(1, r2));
      };
      return a && X && V(U, e2, { configurable: true, set: t2 }), J(e2);
    }, s(M.prototype, "toString", function() {
      return this._k;
    }), S.f = Z, T.f = W, r(67).f = b.f = Y, r(41).f = $, r(66).f = Q, a && !r(15) && s(U, "propertyIsEnumerable", $, true), m.f = function(e2) {
      return J(p(e2));
    }), i(i.G + i.W + i.F * !G, { Symbol: M });
    for (var ee = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), te = 0; ee.length > te; ) p(ee[te++]);
    for (var re = x(p.store), ne = 0; re.length > ne; ) v(re[ne++]);
    i(i.S + i.F * !G, "Symbol", { for: function(e2) {
      return o(N, e2 += "") ? N[e2] : N[e2] = M(e2);
    }, keyFor: function(e2) {
      if (!H(e2)) throw TypeError(e2 + " is not a symbol!");
      for (var t2 in N) if (N[t2] === e2) return t2;
    }, useSetter: function() {
      X = true;
    }, useSimple: function() {
      X = false;
    } }), i(i.S + i.F * !G, "Object", { create: K, defineProperty: W, defineProperties: q, getOwnPropertyDescriptor: Z, getOwnPropertyNames: Y, getOwnPropertySymbols: Q }), O && i(i.S + i.F * (!G || d(function() {
      var e2 = M();
      return "[null]" != L([e2]) || "{}" != L({ a: e2 }) || "{}" != L(Object(e2));
    })), "JSON", { stringify: function(e2) {
      for (var t2, r2, n2 = [e2], o2 = 1; arguments.length > o2; ) n2.push(arguments[o2++]);
      if (r2 = t2 = n2[1], (y(t2) || void 0 !== e2) && !H(e2)) return k(t2) || (t2 = function(e3, t3) {
        if ("function" == typeof r2 && (t3 = r2.call(this, e3, t3)), !H(t3)) return t3;
      }), n2[1] = t2, L.apply(O, n2);
    } }), M.prototype[D] || r(9)(M.prototype, D, M.prototype.valueOf), l(M, "Symbol"), l(Math, "Math", true), l(n.JSON, "JSON", true);
  }, function(e, t, r) {
    var n = r(22)("meta"), o = r(7), a = r(10), i = r(4).f, s = 0, c = Object.isExtensible || function() {
      return true;
    }, d = !r(16)(function() {
      return c(Object.preventExtensions({}));
    }), u = function(e2) {
      i(e2, n, { value: { i: "O" + ++s, w: {} } });
    }, l = function(e2, t2) {
      if (!o(e2)) return "symbol" == typeof e2 ? e2 : ("string" == typeof e2 ? "S" : "P") + e2;
      if (!a(e2, n)) {
        if (!c(e2)) return "F";
        if (!t2) return "E";
        u(e2);
      }
      return e2[n].i;
    }, f = function(e2, t2) {
      if (!a(e2, n)) {
        if (!c(e2)) return true;
        if (!t2) return false;
        u(e2);
      }
      return e2[n].w;
    }, p = function(e2) {
      return d && m.NEED && c(e2) && !a(e2, n) && u(e2), e2;
    }, m = e.exports = { KEY: n, NEED: false, fastKey: l, getWeak: f, onFreeze: p };
  }, function(e, t, r) {
    var n = r(30), o = r(66), a = r(41);
    e.exports = function(e2) {
      var t2 = n(e2), r2 = o.f;
      if (r2) for (var i, s = r2(e2), c = a.f, d = 0; s.length > d; ) c.call(e2, i = s[d++]) && t2.push(i);
      return t2;
    };
  }, function(e, t, r) {
    var n = r(19);
    e.exports = Array.isArray || function(e2) {
      return "Array" == n(e2);
    };
  }, function(e, t, r) {
    var n = r(14), o = r(67).f, a = {}.toString, i = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [], s = function(e2) {
      try {
        return o(e2);
      } catch (e3) {
        return i.slice();
      }
    };
    e.exports.f = function(e2) {
      return i && "[object Window]" == a.call(e2) ? s(e2) : o(n(e2));
    };
  }, function(e, t, r) {
    r(40)("asyncIterator");
  }, function(e, t, r) {
    r(40)("observable");
  }, function(e, t, r) {
    function n(e2) {
      return e2 && e2.__esModule ? e2 : { default: e2 };
    }
    t.__esModule = true;
    var o = r(132), a = n(o), i = r(136), s = n(i), c = r(65), d = n(c);
    t.default = function(e2, t2) {
      if ("function" != typeof t2 && null !== t2) throw new TypeError("Super expression must either be null or a function, not " + (void 0 === t2 ? "undefined" : (0, d.default)(t2)));
      e2.prototype = (0, s.default)(t2 && t2.prototype, { constructor: { value: e2, enumerable: false, writable: true, configurable: true } }), t2 && (a.default ? (0, a.default)(e2, t2) : e2.__proto__ = t2);
    };
  }, function(e, t, r) {
    e.exports = { default: r(133), __esModule: true };
  }, function(e, t, r) {
    r(134), e.exports = r(0).Object.setPrototypeOf;
  }, function(e, t, r) {
    var n = r(3);
    n(n.S, "Object", { setPrototypeOf: r(135).set });
  }, function(e, t, r) {
    var n = r(7), o = r(5), a = function(e2, t2) {
      if (o(e2), !n(t2) && null !== t2) throw TypeError(t2 + ": can't set as prototype!");
    };
    e.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? function(e2, t2, n2) {
      try {
        n2 = r(13)(Function.call, r(68).f(Object.prototype, "__proto__").set, 2), n2(e2, []), t2 = !(e2 instanceof Array);
      } catch (e3) {
        t2 = true;
      }
      return function(e3, r2) {
        return a(e3, r2), t2 ? e3.__proto__ = r2 : n2(e3, r2), e3;
      };
    }({}, false) : void 0), check: a };
  }, function(e, t, r) {
    e.exports = { default: r(137), __esModule: true };
  }, function(e, t, r) {
    r(138);
    var n = r(0).Object;
    e.exports = function(e2, t2) {
      return n.create(e2, t2);
    };
  }, function(e, t, r) {
    var n = r(3);
    n(n.S, "Object", { create: r(29) });
  }, function(e, t, r) {
    Object.defineProperty(t, "__esModule", { value: true });
    var n = r(11), o = r.n(n), a = r(12), i = r.n(a);
    t.default = { methods: { onDetect: function(e2) {
      var t2 = this;
      return i()(o.a.mark(function r2() {
        var n2, a2;
        return o.a.wrap(function(r3) {
          for (; ; ) switch (r3.prev = r3.next) {
            case 0:
              return t2.$emit("detect", e2), r3.prev = 1, r3.next = 4, e2;
            case 4:
              n2 = r3.sent, a2 = n2.content, null !== a2 && t2.$emit("decode", a2), r3.next = 11;
              break;
            case 9:
              r3.prev = 9, r3.t0 = r3.catch(1);
            case 11:
            case "end":
              return r3.stop();
          }
        }, r2, t2, [[1, 9]]);
      }))();
    } } };
  }, function(e, t, r) {
    var n = window.URL || window.webkitURL;
    e.exports = function(e2, t2) {
      try {
        try {
          var r2;
          try {
            var o = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
            r2 = new o(), r2.append(e2), r2 = r2.getBlob();
          } catch (t3) {
            r2 = new Blob([e2]);
          }
          return new Worker(n.createObjectURL(r2));
        } catch (t3) {
          return new Worker("data:application/javascript," + encodeURIComponent(e2));
        }
      } catch (e3) {
        if (!t2) throw Error("Inline worker is not supported");
        return new Worker(t2);
      }
    };
  }, function(e, t) {
    e.exports = { render: function() {
      var e2 = this, t2 = e2.$createElement, r = e2._self._c || t2;
      return r("div", { staticClass: "wrapper" }, [r("video", { directives: [{ name: "show", rawName: "v-show", value: e2.shouldScan, expression: "shouldScan" }], ref: "video", staticClass: "camera", attrs: { autoplay: "", muted: "", playsinline: "" }, domProps: { muted: true } }), e2._v(" "), r("canvas", { directives: [{ name: "show", rawName: "v-show", value: !e2.shouldScan, expression: "!shouldScan" }], ref: "pauseFrame", staticClass: "pause-frame" }), e2._v(" "), r("canvas", { ref: "trackingLayer", staticClass: "tracking-layer" }), e2._v(" "), r("div", { staticClass: "overlay" }, [e2._t("default")], 2)]);
    }, staticRenderFns: [] };
  }, function(e, t, r) {
    var n = r(20)(r(143), r(148), null, null);
    e.exports = n.exports;
  }, function(e, t, r) {
    Object.defineProperty(t, "__esModule", { value: true });
    var n = r(11), o = r.n(n), a = r(12), i = r.n(a), s = r(69), c = r.n(s), d = r(37), u = r(42), l = r(43), f = r.n(l), p = r(44), m = r.n(p);
    t.default = { name: "qrcode-capture", mixins: [f.a], props: { worker: { type: Function, default: m.a } }, methods: { onChangeInput: function(e2) {
      [].concat(c()(e2.target.files)).map(this.processFile).forEach(this.onDetect);
    }, processFile: function(e2) {
      var t2 = this;
      return i()(o.a.mark(function r2() {
        var n2, a2;
        return o.a.wrap(function(r3) {
          for (; ; ) switch (r3.prev = r3.next) {
            case 0:
              return r3.next = 2, Object(u.a)(e2);
            case 2:
              return n2 = r3.sent, r3.next = 5, Object(d.b)(t2.worker, n2);
            case 5:
              return a2 = r3.sent, r3.abrupt("return", a2);
            case 7:
            case "end":
              return r3.stop();
          }
        }, r2, t2);
      }))();
    } } };
  }, function(e, t, r) {
    e.exports = { default: r(145), __esModule: true };
  }, function(e, t, r) {
    r(24), r(146), e.exports = r(0).Array.from;
  }, function(e, t, r) {
    var n = r(13), o = r(3), a = r(35), i = r(55), s = r(56), c = r(31), d = r(147), u = r(57);
    o(o.S + o.F * !r(62)(function(e2) {
      Array.from(e2);
    }), "Array", { from: function(e2) {
      var t2, r2, o2, l, f = a(e2), p = "function" == typeof this ? this : Array, m = arguments.length, v = m > 1 ? arguments[1] : void 0, h = void 0 !== v, k = 0, C = u(f);
      if (h && (v = n(v, m > 2 ? arguments[2] : void 0, 2)), void 0 == C || p == Array && s(C)) for (t2 = c(f.length), r2 = new p(t2); t2 > k; k++) d(r2, k, h ? v(f[k], k) : f[k]);
      else for (l = C.call(f), r2 = new p(); !(o2 = l.next()).done; k++) d(r2, k, h ? i(l, v, [o2.value, k], true) : o2.value);
      return r2.length = k, r2;
    } });
  }, function(e, t, r) {
    var n = r(4), o = r(17);
    e.exports = function(e2, t2, r2) {
      t2 in e2 ? n.f(e2, t2, o(0, r2)) : e2[t2] = r2;
    };
  }, function(e, t) {
    e.exports = { render: function() {
      var e2 = this, t2 = e2.$createElement;
      return (e2._self._c || t2)("input", { attrs: { type: "file", name: "image", accept: "image/*", capture: "environment", multiple: "" }, on: { change: e2.onChangeInput } });
    }, staticRenderFns: [] };
  }, function(e, t, r) {
    var n = r(20)(r(150), r(151), null, null);
    e.exports = n.exports;
  }, function(e, t, r) {
    Object.defineProperty(t, "__esModule", { value: true });
    var n = r(11), o = r.n(n), a = r(12), i = r.n(a), s = r(69), c = r.n(s), d = r(37), u = r(42), l = r(43), f = r.n(l), p = r(44), m = r.n(p);
    t.default = { name: "qrcode-drop-zone", mixins: [f.a], props: { worker: { type: Function, default: m.a } }, methods: { onDragOver: function(e2) {
      this.$emit("dragover", e2);
    }, onDrop: function(e2) {
      var t2 = this, r2 = e2.dataTransfer;
      this.onDragOver(false);
      var n2 = [].concat(c()(r2.files)), o2 = r2.getData("text/uri-list");
      n2.forEach(function(e3) {
        t2.onDetect(t2.processFile(e3));
      }), "" !== o2 && this.onDetect(this.processUrl(o2));
    }, processFile: function(e2) {
      var t2 = this;
      return i()(o.a.mark(function r2() {
        var n2, a2;
        return o.a.wrap(function(r3) {
          for (; ; ) switch (r3.prev = r3.next) {
            case 0:
              return r3.next = 2, Object(u.a)(e2);
            case 2:
              return n2 = r3.sent, r3.next = 5, Object(d.b)(t2.worker, n2);
            case 5:
              return a2 = r3.sent, r3.abrupt("return", a2);
            case 7:
            case "end":
              return r3.stop();
          }
        }, r2, t2);
      }))();
    }, processUrl: function(e2) {
      var t2 = this;
      return i()(o.a.mark(function r2() {
        var n2, a2;
        return o.a.wrap(function(r3) {
          for (; ; ) switch (r3.prev = r3.next) {
            case 0:
              return r3.next = 2, Object(u.b)(e2);
            case 2:
              return n2 = r3.sent, r3.next = 5, Object(d.b)(t2.worker, n2);
            case 5:
              return a2 = r3.sent, r3.abrupt("return", a2);
            case 7:
            case "end":
              return r3.stop();
          }
        }, r2, t2);
      }))();
    } } };
  }, function(e, t) {
    e.exports = { render: function() {
      var e2 = this, t2 = e2.$createElement;
      return (e2._self._c || t2)("div", { on: { drop: function(t3) {
        return t3.preventDefault(), t3.stopPropagation(), e2.onDrop(t3);
      }, dragenter: function(t3) {
        return t3.preventDefault(), t3.stopPropagation(), e2.onDragOver(true);
      }, dragleave: function(t3) {
        return t3.preventDefault(), t3.stopPropagation(), e2.onDragOver(false);
      }, dragover: function(e3) {
        e3.preventDefault(), e3.stopPropagation();
      } } }, [e2._t("default")], 2);
    }, staticRenderFns: [] };
  }]);
  return vueQrcodeReader_common;
}
var vueQrcodeReader_commonExports = requireVueQrcodeReader_common();
const VueQrcodeReader = /* @__PURE__ */ getDefaultExportFromCjs(vueQrcodeReader_commonExports);
const _sfc_main = {
  components: {
    QrcodeStream: vueQrcodeReader_commonExports.QrcodeStream
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
        if (error.name === "NotAllowedError") {
          this.errorMessage = trans("em.camera_access_required");
        } else if (error.name === "NotFoundError") {
          this.errorMessage = trans("em.camera_not_detected");
        } else if (error.name === "NotSupportedError") {
          this.errorMessage = trans("em.camera_https_required");
        } else if (error.name === "NotReadableError") {
          this.errorMessage = trans("em.camera_not_detected");
        } else if (error.name === "OverconstrainedError") {
          this.errorMessage = trans("em.camera_not_detected");
        } else if (error.name === "SecurityError") {
          this.errorMessage = trans("em.camera_https_required");
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
  }), _c("div", { staticClass: "scanner-customer-block" }, [_c("div", { staticClass: "scanner-customer-badge" }, [_vm._v(_vm._s(_vm.trans("em.buyer")))]), _c("div", { staticClass: "scanner-customer-name text-dark" }, [_vm._v(_vm._s(_vm.manualData.customer_name))]), _c("div", { staticClass: "scanner-customer-email text-dark" }, [_vm._v(_vm._s(_vm.manualData.customer_email))])]), _c("div", { staticClass: "d-flex justify-content-center mb-4" }, [!_vm.manualData.is_checked_in ? _c("button", { staticClass: "btn btn-lg btn-success px-5 py-3 fw-bold", attrs: { "disabled": _vm.processing }, on: { "click": _vm.verifyAndCheckinManual } }, [_c("i", { staticClass: "fas fa-circle-check" }), _vm._v(" " + _vm._s(_vm.trans("em.verify_and_checkin")))]) : _c("div", { staticClass: "alert alert-warning mb-0" }, [_c("i", { staticClass: "fas fa-info-circle me-2" }), _vm._v(_vm._s(_vm.trans("em.ticket_already_checked_in")) + " ")])]), _vm.manualError ? _c("div", { staticClass: "scanner-error-message" }, [_vm._v(_vm._s(_vm.manualError))]) : _vm._e(), _c("div", { staticClass: "d-flex justify-content-center mt-3" }, [_c("button", { staticClass: "btn btn-dark px-4 py-2", on: { "click": _vm.refreshPage } }, [_c("i", { staticClass: "fas fa-sync-alt me-2" }), _vm._v(_vm._s(_vm.trans("em.scan_another_ticket")) + " ")])])] : _vm.showResult ? [_vm.resultType === "success" || _vm.resultType === "warning" ? [_c("div", { staticClass: "scanner-event-header" }, [_c("p", { staticClass: "small strong fs-6 mb-0" }, [_vm._v(_vm._s(_vm.resultData.event_title))]), _vm.resultType === "success" ? _c("i", { staticClass: "fas fa-check-circle" }) : _vm._e(), _vm.resultType === "warning" ? _c("i", { staticClass: "fas fa-exclamation-triangle" }) : _vm._e(), _vm._v(" " + _vm._s(_vm.resultType === "success" ? _vm.trans("em.checkin_successful") : _vm.trans("em.already_checked_in")) + " ")]), _vm._l(_vm.resultData.tickets, function(ticket) {
    return _c("div", { key: ticket.ticket_id, staticClass: "scanner-ticket-block" }, [_c("div", { staticClass: "scanner-ticket-badge" }, [_c("i", { staticClass: "fas fa-ticket" }), _vm._v(" " + _vm._s(ticket.ticket_title))]), _c("br"), _vm.resultType === "warning" ? _c("div", { staticClass: "scanner-attendee-list" }, [_c("div", { staticClass: "scanner-attendee-name" }, [_c("small", { staticClass: "strong fw-bold fs-6" }, [_vm._v(" " + _vm._s(_vm.trans("em.checked_in_at")) + ": " + _vm._s(_vm.resultData.checkin_date) + " " + _vm._s(_vm.resultData.checkin_time) + " ")])])]) : _vm._e()]);
  }), _c("div", { staticClass: "scanner-customer-block" }, [_c("div", { staticClass: "scanner-customer-badge" }, [_vm._v(_vm._s(_vm.trans("em.buyer")))]), _c("div", { staticClass: "scanner-customer-name text-dark" }, [_vm._v(_vm._s(_vm.resultData.customer_name))]), _c("div", { staticClass: "scanner-customer-email text-dark" }, [_vm._v(_vm._s(_vm.resultData.customer_email))])]), _c("div", { staticClass: "d-flex justify-content-center mt-3" }, [_c("button", { staticClass: "btn btn-secondary px-4 py-2", on: { "click": _vm.refreshPage } }, [_c("i", { staticClass: "fas fa-sync-alt me-2" }), _vm._v(_vm._s(_vm.trans("em.scan_another_ticket")) + " ")])])] : [_c("div", { staticClass: "scanner-error-message" }, [_vm._v(" ")]), _c("div", { staticClass: "scanner-event-header" }, [_c("i", { staticClass: "fas fa-ban" }), _vm._v(" " + _vm._s(_vm.resultMessage) + " ")])]] : _vm._e()], 2) : _c("div", { staticClass: "scanner-wrapper" }, [_c("div", { staticClass: "scanner-container" }, [_vm.errorMessage ? _c("div", { staticClass: "alert alert-danger m-3", attrs: { "role": "alert" } }, [_c("i", { staticClass: "fas fa-exclamation-circle me-2" }), _c("strong", [_vm._v(_vm._s(_vm.trans("em.error")) + ":")]), _vm._v(" " + _vm._s(_vm.errorMessage) + " ")]) : _vm._e(), !_vm.is_laser && _vm.hide_scanner <= 0 ? _c("qrcode-stream", { attrs: { "constraints": { facingMode: "environment" } }, on: { "decode": _vm.getOrderNumberFromQRCode, "init": _vm.onInit } }) : _vm._e(), _vm.is_laser ? _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.laser_scanner, expression: "laser_scanner" }], ref: "laserInput", staticClass: "form-control", attrs: { "placeholder": _vm.trans("em.scan_ticket_on_laser"), "autofocus": "" }, domProps: { "value": _vm.laser_scanner }, on: { "change": _vm.getOrderNumberFromLaserInput, "blur": _vm.focusLaserInput, "input": function($event) {
    if ($event.target.composing) return;
    _vm.laser_scanner = $event.target.value;
  } } }) : _vm._e()], 1)])]);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "60017fc2"
);
const TicketScanner = __component__.exports;
Vue.use(VueQrcodeReader);
window.app = new Vue({
  el: "#eventmie_app",
  components: {
    TicketScanner
  }
});
//# sourceMappingURL=index-DiGi2ubi.js.map
