function isDate(value3) {
  return value3 instanceof Date || Object.prototype.toString.call(value3) === "[object Date]";
}
function toDate(value3) {
  if (isDate(value3)) {
    return new Date(value3.getTime());
  }
  if (value3 == null) {
    return /* @__PURE__ */ new Date(NaN);
  }
  return new Date(value3);
}
function isValidDate$1(value3) {
  return isDate(value3) && !isNaN(value3.getTime());
}
function startOfWeek(value3) {
  var firstDayOfWeek2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!(firstDayOfWeek2 >= 0 && firstDayOfWeek2 <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6");
  }
  var date = toDate(value3);
  var day = date.getDay();
  var diff = (day + 7 - firstDayOfWeek2) % 7;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}
function startOfWeekYear(value3) {
  var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$firstDayOfWeek = _ref.firstDayOfWeek, firstDayOfWeek2 = _ref$firstDayOfWeek === void 0 ? 0 : _ref$firstDayOfWeek, _ref$firstWeekContain = _ref.firstWeekContainsDate, firstWeekContainsDate = _ref$firstWeekContain === void 0 ? 1 : _ref$firstWeekContain;
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7");
  }
  var date = toDate(value3);
  var year = date.getFullYear();
  var firstDateOfFirstWeek = /* @__PURE__ */ new Date(0);
  for (var i = year + 1; i >= year - 1; i--) {
    firstDateOfFirstWeek.setFullYear(i, 0, firstWeekContainsDate);
    firstDateOfFirstWeek.setHours(0, 0, 0, 0);
    firstDateOfFirstWeek = startOfWeek(firstDateOfFirstWeek, firstDayOfWeek2);
    if (date.getTime() >= firstDateOfFirstWeek.getTime()) {
      break;
    }
  }
  return firstDateOfFirstWeek;
}
function getWeek(value3) {
  var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref2$firstDayOfWeek = _ref2.firstDayOfWeek, firstDayOfWeek2 = _ref2$firstDayOfWeek === void 0 ? 0 : _ref2$firstDayOfWeek, _ref2$firstWeekContai = _ref2.firstWeekContainsDate, firstWeekContainsDate = _ref2$firstWeekContai === void 0 ? 1 : _ref2$firstWeekContai;
  var date = toDate(value3);
  var firstDateOfThisWeek = startOfWeek(date, firstDayOfWeek2);
  var firstDateOfFirstWeek = startOfWeekYear(date, {
    firstDayOfWeek: firstDayOfWeek2,
    firstWeekContainsDate
  });
  var diff = firstDateOfThisWeek.getTime() - firstDateOfFirstWeek.getTime();
  return Math.round(diff / (7 * 24 * 3600 * 1e3)) + 1;
}
var locale$1 = {
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  firstDayOfWeek: 0,
  firstWeekContainsDate: 1
};
var REGEX_FORMAT = /\[([^\]]+)]|YYYY|YY?|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|m{1,2}|s{1,2}|Z{1,2}|S{1,3}|w{1,2}|x|X|a|A/g;
function pad(val) {
  var len = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 2;
  var output = "".concat(Math.abs(val));
  var sign = val < 0 ? "-" : "";
  while (output.length < len) {
    output = "0".concat(output);
  }
  return sign + output;
}
function getOffset(date) {
  return Math.round(date.getTimezoneOffset() / 15) * 15;
}
function formatTimezone(offset) {
  var delimeter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  return sign + pad(hours, 2) + delimeter + pad(minutes, 2);
}
var meridiem = function meridiem2(h2, _, isLowercase) {
  var word = h2 < 12 ? "AM" : "PM";
  return isLowercase ? word.toLocaleLowerCase() : word;
};
var formatFlags = {
  Y: function Y(date) {
    var y = date.getFullYear();
    return y <= 9999 ? "".concat(y) : "+".concat(y);
  },
  // Year: 00, 01, ..., 99
  YY: function YY(date) {
    return pad(date.getFullYear(), 4).substr(2);
  },
  // Year: 1900, 1901, ..., 2099
  YYYY: function YYYY(date) {
    return pad(date.getFullYear(), 4);
  },
  // Month: 1, 2, ..., 12
  M: function M(date) {
    return date.getMonth() + 1;
  },
  // Month: 01, 02, ..., 12
  MM: function MM(date) {
    return pad(date.getMonth() + 1, 2);
  },
  MMM: function MMM(date, locale3) {
    return locale3.monthsShort[date.getMonth()];
  },
  MMMM: function MMMM(date, locale3) {
    return locale3.months[date.getMonth()];
  },
  // Day of month: 1, 2, ..., 31
  D: function D(date) {
    return date.getDate();
  },
  // Day of month: 01, 02, ..., 31
  DD: function DD(date) {
    return pad(date.getDate(), 2);
  },
  // Hour: 0, 1, ... 23
  H: function H(date) {
    return date.getHours();
  },
  // Hour: 00, 01, ..., 23
  HH: function HH(date) {
    return pad(date.getHours(), 2);
  },
  // Hour: 1, 2, ..., 12
  h: function h(date) {
    var hours = date.getHours();
    if (hours === 0) {
      return 12;
    }
    if (hours > 12) {
      return hours % 12;
    }
    return hours;
  },
  // Hour: 01, 02, ..., 12
  hh: function hh() {
    var hours = formatFlags.h.apply(formatFlags, arguments);
    return pad(hours, 2);
  },
  // Minute: 0, 1, ..., 59
  m: function m(date) {
    return date.getMinutes();
  },
  // Minute: 00, 01, ..., 59
  mm: function mm(date) {
    return pad(date.getMinutes(), 2);
  },
  // Second: 0, 1, ..., 59
  s: function s(date) {
    return date.getSeconds();
  },
  // Second: 00, 01, ..., 59
  ss: function ss(date) {
    return pad(date.getSeconds(), 2);
  },
  // 1/10 of second: 0, 1, ..., 9
  S: function S(date) {
    return Math.floor(date.getMilliseconds() / 100);
  },
  // 1/100 of second: 00, 01, ..., 99
  SS: function SS(date) {
    return pad(Math.floor(date.getMilliseconds() / 10), 2);
  },
  // Millisecond: 000, 001, ..., 999
  SSS: function SSS(date) {
    return pad(date.getMilliseconds(), 3);
  },
  // Day of week: 0, 1, ..., 6
  d: function d(date) {
    return date.getDay();
  },
  // Day of week: 'Su', 'Mo', ..., 'Sa'
  dd: function dd(date, locale3) {
    return locale3.weekdaysMin[date.getDay()];
  },
  // Day of week: 'Sun', 'Mon',..., 'Sat'
  ddd: function ddd(date, locale3) {
    return locale3.weekdaysShort[date.getDay()];
  },
  // Day of week: 'Sunday', 'Monday', ...,'Saturday'
  dddd: function dddd(date, locale3) {
    return locale3.weekdays[date.getDay()];
  },
  // AM, PM
  A: function A(date, locale3) {
    var meridiemFunc = locale3.meridiem || meridiem;
    return meridiemFunc(date.getHours(), date.getMinutes(), false);
  },
  // am, pm
  a: function a(date, locale3) {
    var meridiemFunc = locale3.meridiem || meridiem;
    return meridiemFunc(date.getHours(), date.getMinutes(), true);
  },
  // Timezone: -01:00, +00:00, ... +12:00
  Z: function Z(date) {
    return formatTimezone(getOffset(date), ":");
  },
  // Timezone: -0100, +0000, ... +1200
  ZZ: function ZZ(date) {
    return formatTimezone(getOffset(date));
  },
  // Seconds timestamp: 512969520
  X: function X(date) {
    return Math.floor(date.getTime() / 1e3);
  },
  // Milliseconds timestamp: 512969520900
  x: function x(date) {
    return date.getTime();
  },
  w: function w(date, locale3) {
    return getWeek(date, {
      firstDayOfWeek: locale3.firstDayOfWeek,
      firstWeekContainsDate: locale3.firstWeekContainsDate
    });
  },
  ww: function ww(date, locale3) {
    return pad(formatFlags.w(date, locale3), 2);
  }
};
function format(val, str) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var formatStr = str ? String(str) : "YYYY-MM-DDTHH:mm:ss.SSSZ";
  var date = toDate(val);
  if (!isValidDate$1(date)) {
    return "Invalid Date";
  }
  var locale3 = options.locale || locale$1;
  return formatStr.replace(REGEX_FORMAT, function(match, p1) {
    if (p1) {
      return p1;
    }
    if (typeof formatFlags[match] === "function") {
      return "".concat(formatFlags[match](date, locale3));
    }
    return match;
  });
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}
function ownKeys$1(object, enumerableOnly) {
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
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys$1(source, true).forEach(function(key) {
        _defineProperty$1(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(source).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _slicedToArray$1(arr, i) {
  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function _iterableToArrayLimit$1(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }
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
function _arrayWithHoles$1(arr) {
  if (Array.isArray(arr)) return arr;
}
function _defineProperty$1(obj, key, value3) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value3, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value3;
  }
  return obj;
}
var formattingTokens = /(\[[^\[]*\])|(MM?M?M?|Do|DD?|ddd?d?|w[o|w]?|YYYY|YY|a|A|hh?|HH?|mm?|ss?|S{1,3}|x|X|ZZ?|.)/g;
var match1 = /\d/;
var match2 = /\d\d/;
var match3 = /\d{3}/;
var match4 = /\d{4}/;
var match1to2 = /\d\d?/;
var matchShortOffset = /[+-]\d\d:?\d\d/;
var matchSigned = /[+-]?\d+/;
var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/;
var YEAR = "year";
var MONTH = "month";
var DAY = "day";
var HOUR = "hour";
var MINUTE = "minute";
var SECOND = "second";
var MILLISECOND = "millisecond";
var parseFlags = {};
var addParseFlag = function addParseFlag2(token, regex, callback) {
  var tokens = Array.isArray(token) ? token : [token];
  var func;
  if (typeof callback === "string") {
    func = function func2(input) {
      var value3 = parseInt(input, 10);
      return _defineProperty$1({}, callback, value3);
    };
  } else {
    func = callback;
  }
  tokens.forEach(function(key) {
    parseFlags[key] = [regex, func];
  });
};
var escapeStringRegExp = function escapeStringRegExp2(str) {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
};
var matchWordRegExp = function matchWordRegExp2(localeKey) {
  return function(locale3) {
    var array = locale3[localeKey];
    if (!Array.isArray(array)) {
      throw new Error("Locale[".concat(localeKey, "] need an array"));
    }
    return new RegExp(array.map(escapeStringRegExp).join("|"));
  };
};
var matchWordCallback = function matchWordCallback2(localeKey, key) {
  return function(input, locale3) {
    var array = locale3[localeKey];
    if (!Array.isArray(array)) {
      throw new Error("Locale[".concat(localeKey, "] need an array"));
    }
    var index = array.indexOf(input);
    if (index < 0) {
      throw new Error("Invalid Word");
    }
    return _defineProperty$1({}, key, index);
  };
};
addParseFlag("Y", matchSigned, YEAR);
addParseFlag("YY", match2, function(input) {
  var year = (/* @__PURE__ */ new Date()).getFullYear();
  var cent = Math.floor(year / 100);
  var value3 = parseInt(input, 10);
  value3 = (value3 > 68 ? cent - 1 : cent) * 100 + value3;
  return _defineProperty$1({}, YEAR, value3);
});
addParseFlag("YYYY", match4, YEAR);
addParseFlag("M", match1to2, function(input) {
  return _defineProperty$1({}, MONTH, parseInt(input, 10) - 1);
});
addParseFlag("MM", match2, function(input) {
  return _defineProperty$1({}, MONTH, parseInt(input, 10) - 1);
});
addParseFlag("MMM", matchWordRegExp("monthsShort"), matchWordCallback("monthsShort", MONTH));
addParseFlag("MMMM", matchWordRegExp("months"), matchWordCallback("months", MONTH));
addParseFlag("D", match1to2, DAY);
addParseFlag("DD", match2, DAY);
addParseFlag(["H", "h"], match1to2, HOUR);
addParseFlag(["HH", "hh"], match2, HOUR);
addParseFlag("m", match1to2, MINUTE);
addParseFlag("mm", match2, MINUTE);
addParseFlag("s", match1to2, SECOND);
addParseFlag("ss", match2, SECOND);
addParseFlag("S", match1, function(input) {
  return _defineProperty$1({}, MILLISECOND, parseInt(input, 10) * 100);
});
addParseFlag("SS", match2, function(input) {
  return _defineProperty$1({}, MILLISECOND, parseInt(input, 10) * 10);
});
addParseFlag("SSS", match3, MILLISECOND);
function matchMeridiem(locale3) {
  return locale3.meridiemParse || /[ap]\.?m?\.?/i;
}
function defaultIsPM(input) {
  return "".concat(input).toLowerCase().charAt(0) === "p";
}
addParseFlag(["A", "a"], matchMeridiem, function(input, locale3) {
  var isPM = typeof locale3.isPM === "function" ? locale3.isPM(input) : defaultIsPM(input);
  return {
    isPM
  };
});
function offsetFromString(str) {
  var _ref8 = str.match(/([+-]|\d\d)/g) || ["-", "0", "0"], _ref9 = _slicedToArray$1(_ref8, 3), symbol = _ref9[0], hour = _ref9[1], minute = _ref9[2];
  var minutes = parseInt(hour, 10) * 60 + parseInt(minute, 10);
  if (minutes === 0) {
    return 0;
  }
  return symbol === "+" ? -minutes : +minutes;
}
addParseFlag(["Z", "ZZ"], matchShortOffset, function(input) {
  return {
    offset: offsetFromString(input)
  };
});
addParseFlag("x", matchSigned, function(input) {
  return {
    date: new Date(parseInt(input, 10))
  };
});
addParseFlag("X", matchTimestamp, function(input) {
  return {
    date: new Date(parseFloat(input) * 1e3)
  };
});
addParseFlag("d", match1, "weekday");
addParseFlag("dd", matchWordRegExp("weekdaysMin"), matchWordCallback("weekdaysMin", "weekday"));
addParseFlag("ddd", matchWordRegExp("weekdaysShort"), matchWordCallback("weekdaysShort", "weekday"));
addParseFlag("dddd", matchWordRegExp("weekdays"), matchWordCallback("weekdays", "weekday"));
addParseFlag("w", match1to2, "week");
addParseFlag("ww", match2, "week");
function to24hour(hour, isPM) {
  if (hour !== void 0 && isPM !== void 0) {
    if (isPM) {
      if (hour < 12) {
        return hour + 12;
      }
    } else if (hour === 12) {
      return 0;
    }
  }
  return hour;
}
function getFullInputArray(input) {
  var backupDate = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Date();
  var result = [0, 0, 1, 0, 0, 0, 0];
  var backupArr = [backupDate.getFullYear(), backupDate.getMonth(), backupDate.getDate(), backupDate.getHours(), backupDate.getMinutes(), backupDate.getSeconds(), backupDate.getMilliseconds()];
  var useBackup = true;
  for (var i = 0; i < 7; i++) {
    if (input[i] === void 0) {
      result[i] = useBackup ? backupArr[i] : result[i];
    } else {
      result[i] = input[i];
      useBackup = false;
    }
  }
  return result;
}
function createDate$1(y, m2, d2, h2, M2, s2, ms) {
  var date;
  if (y < 100 && y >= 0) {
    date = new Date(y + 400, m2, d2, h2, M2, s2, ms);
    if (isFinite(date.getFullYear())) {
      date.setFullYear(y);
    }
  } else {
    date = new Date(y, m2, d2, h2, M2, s2, ms);
  }
  return date;
}
function createUTCDate() {
  var date;
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var y = args[0];
  if (y < 100 && y >= 0) {
    args[0] += 400;
    date = new Date(Date.UTC.apply(Date, args));
    if (isFinite(date.getUTCFullYear())) {
      date.setUTCFullYear(y);
    }
  } else {
    date = new Date(Date.UTC.apply(Date, args));
  }
  return date;
}
function makeParser(dateString, format2, locale3) {
  var tokens = format2.match(formattingTokens);
  if (!tokens) {
    throw new Error();
  }
  var length = tokens.length;
  var mark = {};
  for (var i = 0; i < length; i += 1) {
    var token = tokens[i];
    var parseTo = parseFlags[token];
    if (!parseTo) {
      var word = token.replace(/^\[|\]$/g, "");
      if (dateString.indexOf(word) === 0) {
        dateString = dateString.substr(word.length);
      } else {
        throw new Error("not match");
      }
    } else {
      var regex = typeof parseTo[0] === "function" ? parseTo[0](locale3) : parseTo[0];
      var parser = parseTo[1];
      var value3 = (regex.exec(dateString) || [])[0];
      var obj = parser(value3, locale3);
      mark = _objectSpread({}, mark, {}, obj);
      dateString = dateString.replace(value3, "");
    }
  }
  return mark;
}
function parse(str, format2) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  try {
    var _options$locale = options.locale, _locale = _options$locale === void 0 ? locale$1 : _options$locale, _options$backupDate = options.backupDate, backupDate = _options$backupDate === void 0 ? /* @__PURE__ */ new Date() : _options$backupDate;
    var parseResult = makeParser(str, format2, _locale);
    var year = parseResult.year, month = parseResult.month, day = parseResult.day, hour = parseResult.hour, minute = parseResult.minute, second = parseResult.second, millisecond = parseResult.millisecond, isPM = parseResult.isPM, date = parseResult.date, offset = parseResult.offset, weekday = parseResult.weekday, week = parseResult.week;
    if (date) {
      return date;
    }
    var inputArray = [year, month, day, hour, minute, second, millisecond];
    inputArray[3] = to24hour(inputArray[3], isPM);
    if (week !== void 0 && month === void 0 && day === void 0) {
      var firstDate = startOfWeekYear(year === void 0 ? backupDate : new Date(year, 3), {
        firstDayOfWeek: _locale.firstDayOfWeek,
        firstWeekContainsDate: _locale.firstWeekContainsDate
      });
      return new Date(firstDate.getTime() + (week - 1) * 7 * 24 * 3600 * 1e3);
    }
    var parsedDate;
    var result = getFullInputArray(inputArray, backupDate);
    if (offset !== void 0) {
      result[6] += offset * 60 * 1e3;
      parsedDate = createUTCDate.apply(void 0, _toConsumableArray(result));
    } else {
      parsedDate = createDate$1.apply(void 0, _toConsumableArray(result));
    }
    if (weekday !== void 0 && parsedDate.getDay() !== weekday) {
      return /* @__PURE__ */ new Date(NaN);
    }
    return parsedDate;
  } catch (e) {
    return /* @__PURE__ */ new Date(NaN);
  }
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _defineProperty(obj, key, value3) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value3,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value3;
  }
  return obj;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
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
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
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
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(n);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _extends$1() {
  return _extends$1 = Object.assign || function(a2) {
    for (var b, c = 1; c < arguments.length; c++) {
      for (var d2 in b = arguments[c], b) {
        Object.prototype.hasOwnProperty.call(b, d2) && (a2[d2] = b[d2]);
      }
    }
    return a2;
  }, _extends$1.apply(this, arguments);
}
var normalMerge = ["attrs", "props", "domProps"], toArrayMerge = ["class", "style", "directives"], functionalMerge = ["on", "nativeOn"], mergeJsxProps = function mergeJsxProps2(a2) {
  return a2.reduce(function(c, a3) {
    for (var b in a3) {
      if (!c[b]) c[b] = a3[b];
      else if (-1 !== normalMerge.indexOf(b)) c[b] = _extends$1({}, c[b], a3[b]);
      else if (-1 !== toArrayMerge.indexOf(b)) {
        var d2 = c[b] instanceof Array ? c[b] : [c[b]], e = a3[b] instanceof Array ? a3[b] : [a3[b]];
        c[b] = d2.concat(e);
      } else if (-1 !== functionalMerge.indexOf(b)) {
        for (var f in a3[b]) {
          if (c[b][f]) {
            var g = c[b][f] instanceof Array ? c[b][f] : [c[b][f]], h2 = a3[b][f] instanceof Array ? a3[b][f] : [a3[b][f]];
            c[b][f] = g.concat(h2);
          } else c[b][f] = a3[b][f];
        }
      } else if ("hook" == b) for (var i in a3[b]) {
        c[b][i] = c[b][i] ? mergeFn(c[b][i], a3[b][i]) : a3[b][i];
      }
      else c[b] = a3[b];
    }
    return c;
  }, {});
}, mergeFn = function mergeFn2(a2, b) {
  return function() {
    a2 && a2.apply(this, arguments), b && b.apply(this, arguments);
  };
};
var helper = mergeJsxProps;
function createDate(y) {
  var M2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var d2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  var h2 = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0;
  var m2 = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  var s2 = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
  var ms = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : 0;
  var date = new Date(y, M2, d2, h2, m2, s2, ms);
  if (y < 100 && y >= 0) {
    date.setFullYear(y);
  }
  return date;
}
function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}
function isValidRangeDate(date) {
  return Array.isArray(date) && date.length === 2 && date.every(isValidDate) && date[0] <= date[1];
}
function isValidDates(dates2) {
  return Array.isArray(dates2) && dates2.every(isValidDate);
}
function getValidDate(value3) {
  var date = new Date(value3);
  if (isValidDate(date)) {
    return date;
  }
  for (var _len = arguments.length, backup = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    backup[_key - 1] = arguments[_key];
  }
  if (backup.length) {
    return getValidDate.apply(void 0, backup);
  }
  return /* @__PURE__ */ new Date();
}
function startOfYear(value3) {
  var date = new Date(value3);
  date.setMonth(0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
function startOfMonth(value3) {
  var date = new Date(value3);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}
function startOfDay(value3) {
  var date = new Date(value3);
  date.setHours(0, 0, 0, 0);
  return date;
}
function getCalendar(_ref) {
  var firstDayOfWeek2 = _ref.firstDayOfWeek, year = _ref.year, month = _ref.month;
  var arr = [];
  var calendar = createDate(year, month, 0);
  var lastDayInLastMonth = calendar.getDate();
  var firstDayInLastMonth = lastDayInLastMonth - (calendar.getDay() + 7 - firstDayOfWeek2) % 7;
  for (var i = firstDayInLastMonth; i <= lastDayInLastMonth; i++) {
    arr.push(createDate(year, month, i - lastDayInLastMonth));
  }
  calendar.setMonth(month + 1, 0);
  var lastDayInCurrentMonth = calendar.getDate();
  for (var _i = 1; _i <= lastDayInCurrentMonth; _i++) {
    arr.push(createDate(year, month, _i));
  }
  var lastMonthLength = lastDayInLastMonth - firstDayInLastMonth + 1;
  var nextMonthLength = 6 * 7 - lastMonthLength - lastDayInCurrentMonth;
  for (var _i2 = 1; _i2 <= nextMonthLength; _i2++) {
    arr.push(createDate(year, month, lastDayInCurrentMonth + _i2));
  }
  return arr;
}
function setMonth(dirtyDate, dirtyMonth) {
  var date = new Date(dirtyDate);
  var month = typeof dirtyMonth === "function" ? dirtyMonth(date.getMonth()) : Number(dirtyMonth);
  var year = date.getFullYear();
  var daysInMonth = createDate(year, month + 1, 0).getDate();
  var day = date.getDate();
  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}
function setYear(dirtyDate, dirtyYear) {
  var date = new Date(dirtyDate);
  var year = typeof dirtyYear === "function" ? dirtyYear(date.getFullYear()) : dirtyYear;
  date.setFullYear(year);
  return date;
}
function assignTime(target, source) {
  var date = new Date(target);
  var time = new Date(source);
  date.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
  return date;
}
function chunk(arr, size) {
  if (!Array.isArray(arr)) {
    return [];
  }
  var result = [];
  var len = arr.length;
  var i = 0;
  size = size || len;
  while (i < len) {
    result.push(arr.slice(i, i += size));
  }
  return result;
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
function pick(obj, props) {
  if (!isObject(obj)) return {};
  if (!Array.isArray(props)) {
    props = [props];
  }
  var res = {};
  props.forEach(function(prop) {
    if (prop in obj) {
      res[prop] = obj[prop];
    }
  });
  return res;
}
function mergeDeep(target, source) {
  if (!isObject(target)) {
    return {};
  }
  var result = target;
  if (isObject(source)) {
    Object.keys(source).forEach(function(key) {
      var value3 = source[key];
      if (isObject(value3) && isObject(target[key])) {
        value3 = mergeDeep(target[key], value3);
      }
      result = _objectSpread2({}, result, _defineProperty({}, key, value3));
    });
  }
  return result;
}
function unwrapExports(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
var en = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;
  var locale3 = {
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    weekdaysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    firstDayOfWeek: 0,
    firstWeekContainsDate: 1
  };
  var _default30 = locale3;
  exports["default"] = _default30;
  module.exports = exports.default;
});
var en$1 = unwrapExports(en);
var lang = {
  formatLocale: en$1,
  yearFormat: "YYYY",
  monthFormat: "MMM",
  monthBeforeYear: true
};
var defaultLocale = "en";
var locales = {};
locales[defaultLocale] = lang;
function locale(name, object, isLocal) {
  if (typeof name !== "string") return locales[defaultLocale];
  var l = defaultLocale;
  if (locales[name]) {
    l = name;
  }
  if (object) {
    locales[name] = object;
    l = name;
  }
  if (!isLocal) {
    defaultLocale = l;
  }
  return locales[name] || locales[defaultLocale];
}
function getLocale(name) {
  return locale(name, null, true);
}
function rafThrottle(fn) {
  var isRunning = false;
  return function fnBinfRaf() {
    var _this = this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (isRunning) return;
    isRunning = true;
    requestAnimationFrame(function() {
      isRunning = false;
      fn.apply(_this, args);
    });
  };
}
function getPopupElementSize(element) {
  var originalDisplay = element.style.display;
  var originalVisibility = element.style.visibility;
  element.style.display = "block";
  element.style.visibility = "hidden";
  var styles = window.getComputedStyle(element);
  var width = element.offsetWidth + parseInt(styles.marginLeft, 10) + parseInt(styles.marginRight, 10);
  var height = element.offsetHeight + parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10);
  element.style.display = originalDisplay;
  element.style.visibility = originalVisibility;
  return {
    width,
    height
  };
}
function getRelativePosition(el, targetWidth, targetHeight, fixed) {
  var left = 0;
  var top = 0;
  var offsetX = 0;
  var offsetY = 0;
  var relativeRect = el.getBoundingClientRect();
  var dw = document.documentElement.clientWidth;
  var dh = document.documentElement.clientHeight;
  if (fixed) {
    offsetX = window.pageXOffset + relativeRect.left;
    offsetY = window.pageYOffset + relativeRect.top;
  }
  if (dw - relativeRect.left < targetWidth && relativeRect.right < targetWidth) {
    left = offsetX - relativeRect.left + 1;
  } else if (relativeRect.left + relativeRect.width / 2 <= dw / 2) {
    left = offsetX;
  } else {
    left = offsetX + relativeRect.width - targetWidth;
  }
  if (relativeRect.top <= targetHeight && dh - relativeRect.bottom <= targetHeight) {
    top = offsetY + dh - relativeRect.top - targetHeight;
  } else if (relativeRect.top + relativeRect.height / 2 <= dh / 2) {
    top = offsetY + relativeRect.height;
  } else {
    top = offsetY - targetHeight;
  }
  return {
    left: "".concat(left, "px"),
    top: "".concat(top, "px")
  };
}
function getScrollParent(node) {
  var until = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : document.body;
  if (!node || node === until) {
    return null;
  }
  var style = function style2(value3, prop) {
    return getComputedStyle(value3, null).getPropertyValue(prop);
  };
  var regex = /(auto|scroll)/;
  var scroll = regex.test(style(node, "overflow") + style(node, "overflow-y") + style(node, "overflow-x"));
  return scroll ? node : getScrollParent(node.parentNode, until);
}
var script = {
  name: "Popup",
  inject: {
    prefixClass: {
      default: "mx"
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      top: "",
      left: ""
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler: function handler(val) {
        var _this = this;
        this.$nextTick(function() {
          if (val) {
            _this.displayPopup();
          }
        });
      }
    }
  },
  mounted: function mounted() {
    var _this2 = this;
    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
    this._clickoutEvent = "ontouchend" in document ? "touchstart" : "mousedown";
    document.addEventListener(this._clickoutEvent, this.handleClickOutside);
    var relativeElement = this.$parent.$el;
    this._displayPopup = rafThrottle(function() {
      return _this2.displayPopup();
    });
    this._scrollParent = getScrollParent(relativeElement) || window;
    this._scrollParent.addEventListener("scroll", this._displayPopup);
    window.addEventListener("resize", this._displayPopup);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.appendToBody && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
    document.removeEventListener(this._clickoutEvent, this.handleClickOutside);
    this._scrollParent.removeEventListener("scroll", this._displayPopup);
    window.removeEventListener("resize", this._displayPopup);
  },
  methods: {
    handleClickOutside: function handleClickOutside(evt) {
      if (!this.visible) return;
      var target = evt.target;
      var el = this.$el;
      if (el && !el.contains(target)) {
        this.$emit("clickoutside", evt);
      }
    },
    displayPopup: function displayPopup() {
      if (!this.visible) return;
      var popup = this.$el;
      var relativeElement = this.$parent.$el;
      var appendToBody = this.appendToBody;
      if (!this._popupRect) {
        this._popupRect = getPopupElementSize(popup);
      }
      var _this$_popupRect = this._popupRect, width = _this$_popupRect.width, height = _this$_popupRect.height;
      var _getRelativePosition = getRelativePosition(relativeElement, width, height, appendToBody), left = _getRelativePosition.left, top = _getRelativePosition.top;
      this.left = left;
      this.top = top;
    }
  }
};
function normalizeComponent(template, style, script2, scopeId, isFunctionalTemplate, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  var options = typeof script2 === "function" ? script2.options : script2;
  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true;
  }
  return script2;
}
var __vue_script__ = script;
var __vue_render__ = function __vue_render__2() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", {
    attrs: {
      "name": _vm.prefixClass + "-zoom-in-down"
    }
  }, [_vm.visible ? _c("div", {
    class: _vm.prefixClass + "-datepicker-main " + _vm.prefixClass + "-datepicker-popup",
    style: {
      top: _vm.top,
      left: _vm.left,
      position: "absolute"
    }
  }, [_vm._t("default")], 2) : _vm._e()]);
};
var __vue_staticRenderFns__ = [];
var __vue_inject_styles__ = void 0;
var __vue_component__ = normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__);
var __vue_render__$1 = function __vue_render__3() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("svg", {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 1024 1024",
      "width": "1em",
      "height": "1em"
    }
  }, [_c("path", {
    attrs: {
      "d": "M940.218182 107.054545h-209.454546V46.545455h-65.163636v60.50909H363.054545V46.545455H297.890909v60.50909H83.781818c-18.618182 0-32.581818 13.963636-32.581818 32.581819v805.236363c0 18.618182 13.963636 32.581818 32.581818 32.581818h861.090909c18.618182 0 32.581818-13.963636 32.581818-32.581818V139.636364c-4.654545-18.618182-18.618182-32.581818-37.236363-32.581819zM297.890909 172.218182V232.727273h65.163636V172.218182h307.2V232.727273h65.163637V172.218182h176.872727v204.8H116.363636V172.218182h181.527273zM116.363636 912.290909V442.181818h795.927273v470.109091H116.363636z"
    }
  })]);
};
var __vue_staticRenderFns__$1 = [];
var __vue_inject_styles__$1 = void 0;
var __vue_component__$1 = normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, {});
var __vue_render__$2 = function __vue_render__4() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("svg", {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 24 24",
      "width": "1em",
      "height": "1em"
    }
  }, [_c("path", {
    attrs: {
      "d": "M0 0h24v24H0z",
      "fill": "none"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      "d": "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
    }
  }), _vm._v(" "), _c("path", {
    attrs: {
      "d": "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"
    }
  })]);
};
var __vue_staticRenderFns__$2 = [];
var __vue_inject_styles__$2 = void 0;
var __vue_component__$2 = normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, {});
var __vue_render__$3 = function __vue_render__5() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("svg", {
    attrs: {
      "xmlns": "http://www.w3.org/2000/svg",
      "viewBox": "0 0 1024 1024",
      "width": "1em",
      "height": "1em"
    }
  }, [_c("path", {
    attrs: {
      "d": "M810.005333 274.005333l-237.994667 237.994667 237.994667 237.994667-60.010667 60.010667-237.994667-237.994667-237.994667 237.994667-60.010667-60.010667 237.994667-237.994667-237.994667-237.994667 60.010667-60.010667 237.994667 237.994667 237.994667-237.994667z"
    }
  })]);
};
var __vue_staticRenderFns__$3 = [];
var __vue_inject_styles__$3 = void 0;
var __vue_component__$3 = normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, {});
var script$1 = {
  props: {
    type: String,
    disabled: Boolean
  },
  inject: {
    prefixClass: {
      default: "mx"
    }
  }
};
var __vue_script__$1 = script$1;
var __vue_render__$4 = function __vue_render__6() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("button", _vm._g({
    class: [_vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-icon-" + _vm.type, {
      disabled: _vm.disabled
    }],
    attrs: {
      "type": "button",
      "disabled": _vm.disabled
    }
  }, _vm.$listeners), [_c("i", {
    class: _vm.prefixClass + "-icon-" + _vm.type
  })]);
};
var __vue_staticRenderFns__$4 = [];
var __vue_inject_styles__$4 = void 0;
var __vue_component__$4 = normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$1);
var script$2 = {
  name: "TableDate",
  components: {
    IconButton: __vue_component__$4
  },
  inject: {
    getLocale: {
      default: function _default() {
        return getLocale;
      }
    },
    getWeek: {
      default: function _default2() {
        return getWeek;
      }
    },
    prefixClass: {
      default: "mx"
    },
    onDateMouseEnter: {
      default: void 0
    },
    onDateMouseLeave: {
      default: void 0
    }
  },
  props: {
    disabledCalendarChanger: {
      type: Function,
      default: function _default3() {
        return false;
      }
    },
    calendar: {
      type: Date,
      default: function _default4() {
        return /* @__PURE__ */ new Date();
      }
    },
    showWeekNumber: {
      type: Boolean,
      default: false
    },
    titleFormat: {
      type: String,
      default: "YYYY-MM-DD"
    },
    getRowClasses: {
      type: Function,
      default: function _default5() {
        return [];
      }
    },
    getCellClasses: {
      type: Function,
      default: function _default6() {
        return [];
      }
    }
  },
  computed: {
    firstDayOfWeek: function firstDayOfWeek() {
      return this.getLocale().formatLocale.firstDayOfWeek || 0;
    },
    yearMonth: function yearMonth() {
      var _this$getLocale = this.getLocale(), yearFormat = _this$getLocale.yearFormat, monthBeforeYear = _this$getLocale.monthBeforeYear, _this$getLocale$month = _this$getLocale.monthFormat, monthFormat = _this$getLocale$month === void 0 ? "MMM" : _this$getLocale$month;
      var yearLabel = {
        panel: "year",
        label: this.formatDate(this.calendar, yearFormat)
      };
      var monthLabel = {
        panel: "month",
        label: this.formatDate(this.calendar, monthFormat)
      };
      return monthBeforeYear ? [monthLabel, yearLabel] : [yearLabel, monthLabel];
    },
    days: function days() {
      var locale3 = this.getLocale();
      var days2 = locale3.days || locale3.formatLocale.weekdaysMin;
      return days2.concat(days2).slice(this.firstDayOfWeek, this.firstDayOfWeek + 7);
    },
    dates: function dates() {
      var year = this.calendar.getFullYear();
      var month = this.calendar.getMonth();
      var arr = getCalendar({
        firstDayOfWeek: this.firstDayOfWeek,
        year,
        month
      });
      return chunk(arr, 7);
    }
  },
  methods: {
    isDisabledArrows: function isDisabledArrows(type) {
      var date = new Date(this.calendar);
      switch (type) {
        case "last-year":
          date.setFullYear(date.getFullYear() - 1, date.getMonth() + 1, 0);
          date.setHours(23, 59, 59, 999);
          break;
        case "next-year":
          date.setFullYear(date.getFullYear() + 1);
          break;
        case "last-month":
          date.setMonth(date.getMonth(), 0);
          date.setHours(23, 59, 59, 999);
          break;
        case "next-month":
          date.setMonth(date.getMonth() + 1);
          break;
      }
      return this.disabledCalendarChanger(date, type);
    },
    handleIconLeftClick: function handleIconLeftClick() {
      this.$emit("changecalendar", setMonth(this.calendar, function(v) {
        return v - 1;
      }), "last-month");
    },
    handleIconRightClick: function handleIconRightClick() {
      this.$emit("changecalendar", setMonth(this.calendar, function(v) {
        return v + 1;
      }), "next-month");
    },
    handleIconDoubleLeftClick: function handleIconDoubleLeftClick() {
      this.$emit("changecalendar", setYear(this.calendar, function(v) {
        return v - 1;
      }), "last-year");
    },
    handleIconDoubleRightClick: function handleIconDoubleRightClick() {
      this.$emit("changecalendar", setYear(this.calendar, function(v) {
        return v + 1;
      }), "next-year");
    },
    handlePanelChange: function handlePanelChange(panel) {
      this.$emit("changepanel", panel);
    },
    handleMouseEnter: function handleMouseEnter(cell) {
      if (typeof this.onDateMouseEnter === "function") {
        this.onDateMouseEnter(cell);
      }
    },
    handleMouseLeave: function handleMouseLeave(cell) {
      if (typeof this.onDateMouseLeave === "function") {
        this.onDateMouseLeave(cell);
      }
    },
    handleCellClick: function handleCellClick(evt) {
      var target = evt.target;
      if (target.tagName.toUpperCase() === "DIV") {
        target = target.parentNode;
      }
      var index = target.getAttribute("data-row-col");
      if (index) {
        var _index$split$map = index.split(",").map(function(v) {
          return parseInt(v, 10);
        }), _index$split$map2 = _slicedToArray(_index$split$map, 2), row = _index$split$map2[0], col = _index$split$map2[1];
        var date = this.dates[row][col];
        this.$emit("select", new Date(date));
      }
    },
    formatDate: function formatDate(date, fmt) {
      return format(date, fmt, {
        locale: this.getLocale().formatLocale
      });
    },
    getCellTitle: function getCellTitle(date) {
      var fmt = this.titleFormat;
      return this.formatDate(date, fmt);
    },
    getWeekNumber: function getWeekNumber(date) {
      return this.getWeek(date, this.getLocale().formatLocale);
    }
  }
};
var __vue_script__$2 = script$2;
var __vue_render__$5 = function __vue_render__7() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    class: _vm.prefixClass + "-calendar " + _vm.prefixClass + "-calendar-panel-date"
  }, [_c("div", {
    class: _vm.prefixClass + "-calendar-header"
  }, [_c("icon-button", {
    attrs: {
      "type": "double-left",
      "disabled": _vm.isDisabledArrows("last-year")
    },
    on: {
      "click": _vm.handleIconDoubleLeftClick
    }
  }), _vm._v(" "), _c("icon-button", {
    attrs: {
      "type": "left",
      "disabled": _vm.isDisabledArrows("last-month")
    },
    on: {
      "click": _vm.handleIconLeftClick
    }
  }), _vm._v(" "), _c("icon-button", {
    attrs: {
      "type": "double-right",
      "disabled": _vm.isDisabledArrows("next-year")
    },
    on: {
      "click": _vm.handleIconDoubleRightClick
    }
  }), _vm._v(" "), _c("icon-button", {
    attrs: {
      "type": "right",
      "disabled": _vm.isDisabledArrows("next-month")
    },
    on: {
      "click": _vm.handleIconRightClick
    }
  }), _vm._v(" "), _c("span", {
    class: _vm.prefixClass + "-calendar-header-label"
  }, _vm._l(_vm.yearMonth, function(item) {
    return _c("button", {
      key: item.panel,
      class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-btn-current-" + item.panel,
      attrs: {
        "type": "button"
      },
      on: {
        "click": function click($event) {
          return _vm.handlePanelChange(item.panel);
        }
      }
    }, [_vm._v("\n        " + _vm._s(item.label) + "\n      ")]);
  }), 0)], 1), _vm._v(" "), _c("div", {
    class: _vm.prefixClass + "-calendar-content"
  }, [_c("table", {
    class: _vm.prefixClass + "-table " + _vm.prefixClass + "-table-date"
  }, [_c("thead", [_c("tr", [_vm.showWeekNumber ? _c("th", {
    class: _vm.prefixClass + "-week-number-header"
  }) : _vm._e(), _vm._v(" "), _vm._l(_vm.days, function(day) {
    return _c("th", {
      key: day
    }, [_vm._v(_vm._s(day))]);
  })], 2)]), _vm._v(" "), _c("tbody", {
    on: {
      "click": _vm.handleCellClick
    }
  }, _vm._l(_vm.dates, function(row, i) {
    return _c("tr", {
      key: i,
      class: [_vm.prefixClass + "-date-row", _vm.getRowClasses(row)]
    }, [_vm.showWeekNumber ? _c("td", {
      class: _vm.prefixClass + "-week-number",
      attrs: {
        "data-row-col": i + ",0"
      }
    }, [_vm._v("\n            " + _vm._s(_vm.getWeekNumber(row[0])) + "\n          ")]) : _vm._e(), _vm._v(" "), _vm._l(row, function(cell, j) {
      return _c("td", {
        key: j,
        staticClass: "cell",
        class: _vm.getCellClasses(cell),
        attrs: {
          "data-row-col": i + "," + j,
          "title": _vm.getCellTitle(cell)
        },
        on: {
          "mouseenter": function mouseenter($event) {
            return _vm.handleMouseEnter(cell);
          },
          "mouseleave": function mouseleave($event) {
            return _vm.handleMouseLeave(cell);
          }
        }
      }, [_c("div", [_vm._v(_vm._s(cell.getDate()))])]);
    })], 2);
  }), 0)])])]);
};
var __vue_staticRenderFns__$5 = [];
var __vue_inject_styles__$5 = void 0;
var __vue_component__$5 = normalizeComponent({
  render: __vue_render__$5,
  staticRenderFns: __vue_staticRenderFns__$5
}, __vue_inject_styles__$5, __vue_script__$2);
var script$3 = {
  name: "TableMonth",
  components: {
    IconButton: __vue_component__$4
  },
  inject: {
    getLocale: {
      default: function _default7() {
        return getLocale;
      }
    },
    prefixClass: {
      default: "mx"
    }
  },
  props: {
    disabledCalendarChanger: {
      type: Function,
      default: function _default8() {
        return false;
      }
    },
    calendar: {
      type: Date,
      default: function _default9() {
        return /* @__PURE__ */ new Date();
      }
    },
    getCellClasses: {
      type: Function,
      default: function _default10() {
        return [];
      }
    }
  },
  computed: {
    calendarYear: function calendarYear() {
      return this.calendar.getFullYear();
    },
    months: function months() {
      var locale3 = this.getLocale();
      var monthsLocale = locale3.months || locale3.formatLocale.monthsShort;
      var months2 = monthsLocale.map(function(text2, month) {
        return {
          text: text2,
          month
        };
      });
      return chunk(months2, 3);
    }
  },
  methods: {
    isDisabledArrows: function isDisabledArrows2(type) {
      var date = new Date(this.calendar);
      switch (type) {
        case "last-year":
          date.setFullYear(date.getFullYear() - 1, 11, 31);
          date.setHours(23, 59, 59, 999);
          break;
        case "next-year":
          date.setFullYear(date.getFullYear() + 1, 0, 1);
          break;
      }
      return this.disabledCalendarChanger(date, type);
    },
    handleIconDoubleLeftClick: function handleIconDoubleLeftClick2() {
      this.$emit("changecalendar", setYear(this.calendar, function(v) {
        return v - 1;
      }), "last-year");
    },
    handleIconDoubleRightClick: function handleIconDoubleRightClick2() {
      this.$emit("changecalendar", setYear(this.calendar, function(v) {
        return v + 1;
      }), "next-year");
    },
    handlePanelChange: function handlePanelChange2() {
      this.$emit("changepanel", "year");
    },
    handleClick: function handleClick(evt) {
      var target = evt.target;
      if (target.tagName.toUpperCase() === "DIV") {
        target = target.parentNode;
      }
      var month = target.getAttribute("data-month");
      if (month && !target.classList.contains("disabled")) {
        this.$emit("select", parseInt(month, 10));
      }
    }
  }
};
var __vue_script__$3 = script$3;
var __vue_render__$6 = function __vue_render__8() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    class: _vm.prefixClass + "-calendar " + _vm.prefixClass + "-calendar-panel-month"
  }, [_c("div", {
    class: _vm.prefixClass + "-calendar-header"
  }, [_c("icon-button", {
    attrs: {
      "type": "double-left",
      "disabled": _vm.isDisabledArrows("last-year")
    },
    on: {
      "click": _vm.handleIconDoubleLeftClick
    }
  }), _vm._v(" "), _c("icon-button", {
    attrs: {
      "type": "double-right",
      "disabled": _vm.isDisabledArrows("next-year")
    },
    on: {
      "click": _vm.handleIconDoubleRightClick
    }
  }), _vm._v(" "), _c("span", {
    class: _vm.prefixClass + "-calendar-header-label"
  }, [_c("button", {
    class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handlePanelChange
    }
  }, [_vm._v("\n        " + _vm._s(_vm.calendarYear) + "\n      ")])])], 1), _vm._v(" "), _c("div", {
    class: _vm.prefixClass + "-calendar-content"
  }, [_c("table", {
    class: _vm.prefixClass + "-table " + _vm.prefixClass + "-table-month",
    on: {
      "click": _vm.handleClick
    }
  }, _vm._l(_vm.months, function(row, i) {
    return _c("tr", {
      key: i
    }, _vm._l(row, function(cell, j) {
      return _c("td", {
        key: j,
        staticClass: "cell",
        class: _vm.getCellClasses(cell.month),
        attrs: {
          "data-month": cell.month
        }
      }, [_c("div", [_vm._v(_vm._s(cell.text))])]);
    }), 0);
  }), 0)])]);
};
var __vue_staticRenderFns__$6 = [];
var __vue_inject_styles__$6 = void 0;
var __vue_component__$6 = normalizeComponent({
  render: __vue_render__$6,
  staticRenderFns: __vue_staticRenderFns__$6
}, __vue_inject_styles__$6, __vue_script__$3);
var script$4 = {
  name: "TableYear",
  components: {
    IconButton: __vue_component__$4
  },
  inject: {
    prefixClass: {
      default: "mx"
    }
  },
  props: {
    disabledCalendarChanger: {
      type: Function,
      default: function _default11() {
        return false;
      }
    },
    calendar: {
      type: Date,
      default: function _default12() {
        return /* @__PURE__ */ new Date();
      }
    },
    getCellClasses: {
      type: Function,
      default: function _default13() {
        return [];
      }
    },
    getYearPanel: {
      type: Function
    }
  },
  computed: {
    years: function years() {
      var calendar = new Date(this.calendar);
      if (typeof this.getYearPanel === "function") {
        return this.getYearPanel(calendar);
      }
      return this.getYears(calendar);
    },
    firstYear: function firstYear() {
      return this.years[0][0];
    },
    lastYear: function lastYear() {
      var last = function last2(arr) {
        return arr[arr.length - 1];
      };
      return last(last(this.years));
    }
  },
  methods: {
    isDisabledArrows: function isDisabledArrows3(type) {
      var date = new Date(this.calendar);
      switch (type) {
        case "last-decade":
          date.setFullYear(this.firstYear - 1, 11, 31);
          date.setHours(23, 59, 59, 999);
          break;
        case "next-decade":
          date.setFullYear(this.lastYear + 1, 0, 1);
          break;
      }
      return this.disabledCalendarChanger(date, type);
    },
    getYears: function getYears(calendar) {
      var firstYear2 = Math.floor(calendar.getFullYear() / 10) * 10;
      var years2 = [];
      for (var i = 0; i < 10; i++) {
        years2.push(firstYear2 + i);
      }
      return chunk(years2, 2);
    },
    handleIconDoubleLeftClick: function handleIconDoubleLeftClick3() {
      this.$emit("changecalendar", setYear(this.calendar, function(v) {
        return v - 10;
      }), "last-decade");
    },
    handleIconDoubleRightClick: function handleIconDoubleRightClick3() {
      this.$emit("changecalendar", setYear(this.calendar, function(v) {
        return v + 10;
      }), "next-decade");
    },
    handleClick: function handleClick2(evt) {
      var target = evt.target;
      if (target.tagName.toUpperCase() === "DIV") {
        target = target.parentNode;
      }
      var year = target.getAttribute("data-year");
      if (year && !target.classList.contains("disabled")) {
        this.$emit("select", parseInt(year, 10));
      }
    }
  }
};
var __vue_script__$4 = script$4;
var __vue_render__$7 = function __vue_render__9() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    class: _vm.prefixClass + "-calendar " + _vm.prefixClass + "-calendar-panel-year"
  }, [_c("div", {
    class: _vm.prefixClass + "-calendar-header"
  }, [_c("icon-button", {
    attrs: {
      "type": "double-left",
      "disabled": _vm.isDisabledArrows("last-decade")
    },
    on: {
      "click": _vm.handleIconDoubleLeftClick
    }
  }), _vm._v(" "), _c("icon-button", {
    attrs: {
      "type": "double-right",
      "disabled": _vm.isDisabledArrows("next-decade")
    },
    on: {
      "click": _vm.handleIconDoubleRightClick
    }
  }), _vm._v(" "), _c("span", {
    class: _vm.prefixClass + "-calendar-header-label"
  }, [_c("span", [_vm._v(_vm._s(_vm.firstYear))]), _vm._v(" "), _c("span", {
    class: _vm.prefixClass + "-calendar-decade-separator"
  }), _vm._v(" "), _c("span", [_vm._v(_vm._s(_vm.lastYear))])])], 1), _vm._v(" "), _c("div", {
    class: _vm.prefixClass + "-calendar-content"
  }, [_c("table", {
    class: _vm.prefixClass + "-table " + _vm.prefixClass + "-table-year",
    on: {
      "click": _vm.handleClick
    }
  }, _vm._l(_vm.years, function(row, i) {
    return _c("tr", {
      key: i
    }, _vm._l(row, function(cell, j) {
      return _c("td", {
        key: j,
        staticClass: "cell",
        class: _vm.getCellClasses(cell),
        attrs: {
          "data-year": cell
        }
      }, [_c("div", [_vm._v(_vm._s(cell))])]);
    }), 0);
  }), 0)])]);
};
var __vue_staticRenderFns__$7 = [];
var __vue_inject_styles__$7 = void 0;
var __vue_component__$7 = normalizeComponent({
  render: __vue_render__$7,
  staticRenderFns: __vue_staticRenderFns__$7
}, __vue_inject_styles__$7, __vue_script__$4);
var CalendarPanel = {
  name: "CalendarPanel",
  inject: {
    prefixClass: {
      default: "mx"
    },
    dispatchDatePicker: {
      default: function _default14() {
        return function() {
        };
      }
    }
  },
  props: {
    value: {},
    defaultValue: {
      default: function _default15() {
        var date = /* @__PURE__ */ new Date();
        date.setHours(0, 0, 0, 0);
        return date;
      }
    },
    defaultPanel: {
      type: String
    },
    disabledCalendarChanger: {
      type: Function,
      default: function _default16() {
        return false;
      }
    },
    disabledDate: {
      type: Function,
      default: function _default17() {
        return false;
      }
    },
    type: {
      type: String,
      default: "date"
    },
    getClasses: {
      type: Function,
      default: function _default18() {
        return [];
      }
    },
    showWeekNumber: {
      type: Boolean,
      default: void 0
    },
    getYearPanel: {
      type: Function
    },
    titleFormat: {
      type: String,
      default: "YYYY-MM-DD"
    },
    calendar: Date,
    // update date when select year or month
    partialUpdate: {
      type: Boolean,
      default: false
    }
  },
  data: function data2() {
    var panels = ["date", "month", "year"];
    var index = Math.max(panels.indexOf(this.type), panels.indexOf(this.defaultPanel));
    var panel = index !== -1 ? panels[index] : "date";
    return {
      panel,
      innerCalendar: /* @__PURE__ */ new Date()
    };
  },
  computed: {
    innerValue: function innerValue() {
      var value3 = Array.isArray(this.value) ? this.value : [this.value];
      var map = {
        year: startOfYear,
        month: startOfMonth,
        date: startOfDay
      };
      var start = map[this.type] || map.date;
      return value3.filter(isValidDate).map(function(v) {
        return start(v);
      });
    },
    calendarYear: function calendarYear2() {
      return this.innerCalendar.getFullYear();
    },
    calendarMonth: function calendarMonth() {
      return this.innerCalendar.getMonth();
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: "initCalendar"
    },
    calendar: {
      handler: "initCalendar"
    },
    defaultValue: {
      handler: "initCalendar"
    }
  },
  methods: {
    initCalendar: function initCalendar() {
      var calendarDate = this.calendar;
      if (!isValidDate(calendarDate)) {
        var length = this.innerValue.length;
        calendarDate = getValidDate(length > 0 ? this.innerValue[length - 1] : this.defaultValue);
      }
      this.innerCalendar = startOfMonth(calendarDate);
    },
    isDisabled: function isDisabled(date) {
      return this.disabledDate(new Date(date), this.innerValue);
    },
    emitDate: function emitDate(date, type) {
      if (!this.isDisabled(date)) {
        this.$emit("select", date, type, this.innerValue);
        this.dispatchDatePicker("pick", date, type);
      }
    },
    handleCalendarChange: function handleCalendarChange(calendar, type) {
      var oldCalendar = new Date(this.innerCalendar);
      this.innerCalendar = calendar;
      this.$emit("update:calendar", calendar);
      this.dispatchDatePicker("calendar-change", calendar, oldCalendar, type);
    },
    handelPanelChange: function handelPanelChange(panel) {
      var oldPanel = this.panel;
      this.panel = panel;
      this.dispatchDatePicker("panel-change", panel, oldPanel);
    },
    handleSelectYear: function handleSelectYear(year) {
      if (this.type === "year") {
        var date = this.getYearCellDate(year);
        this.emitDate(date, "year");
      } else {
        this.handleCalendarChange(createDate(year, this.calendarMonth), "year");
        this.handelPanelChange("month");
        if (this.partialUpdate && this.innerValue.length === 1) {
          var _date = new Date(this.innerValue[0]);
          _date.setFullYear(year);
          this.emitDate(_date, "year");
        }
      }
    },
    handleSelectMonth: function handleSelectMonth(month) {
      if (this.type === "month") {
        var date = this.getMonthCellDate(month);
        this.emitDate(date, "month");
      } else {
        this.handleCalendarChange(createDate(this.calendarYear, month), "month");
        this.handelPanelChange("date");
        if (this.partialUpdate && this.innerValue.length === 1) {
          var _date2 = new Date(this.innerValue[0]);
          _date2.setFullYear(this.calendarYear);
          this.emitDate(setMonth(_date2, month), "month");
        }
      }
    },
    handleSelectDate: function handleSelectDate(date) {
      this.emitDate(date, this.type === "week" ? "week" : "date");
    },
    getMonthCellDate: function getMonthCellDate(month) {
      return createDate(this.calendarYear, month);
    },
    getYearCellDate: function getYearCellDate(year) {
      return createDate(year, 0);
    },
    getDateClasses: function getDateClasses(cellDate) {
      var notCurrentMonth = cellDate.getMonth() !== this.calendarMonth;
      var classes = [];
      if (cellDate.getTime() === (/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)) {
        classes.push("today");
      }
      if (notCurrentMonth) {
        classes.push("not-current-month");
      }
      var state = this.getStateClass(cellDate);
      if (!(state === "active" && notCurrentMonth)) {
        classes.push(state);
      }
      return classes.concat(this.getClasses(cellDate, this.innerValue, classes.join(" ")));
    },
    getMonthClasses: function getMonthClasses(month) {
      var classes = [];
      if (this.type !== "month") {
        if (this.calendarMonth === month) {
          classes.push("active");
        }
        var _cellDate = this.getMonthCellDate(month);
        if (this.disabledCalendarChanger(_cellDate, "month")) {
          classes.push("disabled");
        }
        return classes;
      }
      var cellDate = this.getMonthCellDate(month);
      classes.push(this.getStateClass(cellDate));
      return classes.concat(this.getClasses(cellDate, this.innerValue, classes.join(" ")));
    },
    getYearClasses: function getYearClasses(year) {
      var classes = [];
      if (this.type !== "year") {
        if (this.calendarYear === year) {
          classes.push("active");
        }
        var _cellDate2 = this.getYearCellDate(year);
        if (this.disabledCalendarChanger(_cellDate2, "year")) {
          classes.push("disabled");
        }
        return classes;
      }
      var cellDate = this.getYearCellDate(year);
      classes.push(this.getStateClass(cellDate));
      return classes.concat(this.getClasses(cellDate, this.innerValue, classes.join(" ")));
    },
    getStateClass: function getStateClass(cellDate) {
      if (this.isDisabled(cellDate)) {
        return "disabled";
      }
      if (this.innerValue.some(function(v) {
        return v.getTime() === cellDate.getTime();
      })) {
        return "active";
      }
      return "";
    },
    getWeekState: function getWeekState(row) {
      if (this.type !== "week") return "";
      var start = row[0].getTime();
      var end = row[6].getTime();
      var active = this.innerValue.some(function(v) {
        var time = v.getTime();
        return time >= start && time <= end;
      });
      return active ? "".concat(this.prefixClass, "-active-week") : "";
    }
  },
  render: function render() {
    var h2 = arguments[0];
    var panel = this.panel, innerCalendar = this.innerCalendar;
    if (panel === "year") {
      return h2(__vue_component__$7, {
        "attrs": {
          "disabledCalendarChanger": this.disabledCalendarChanger,
          "calendar": innerCalendar,
          "getCellClasses": this.getYearClasses,
          "getYearPanel": this.getYearPanel
        },
        "on": {
          "select": this.handleSelectYear,
          "changecalendar": this.handleCalendarChange
        }
      });
    }
    if (panel === "month") {
      return h2(__vue_component__$6, {
        "attrs": {
          "disabledCalendarChanger": this.disabledCalendarChanger,
          "calendar": innerCalendar,
          "getCellClasses": this.getMonthClasses
        },
        "on": {
          "select": this.handleSelectMonth,
          "changepanel": this.handelPanelChange,
          "changecalendar": this.handleCalendarChange
        }
      });
    }
    return h2(__vue_component__$5, {
      "attrs": {
        "disabledCalendarChanger": this.disabledCalendarChanger,
        "calendar": innerCalendar,
        "getCellClasses": this.getDateClasses,
        "getRowClasses": this.getWeekState,
        "titleFormat": this.titleFormat,
        "showWeekNumber": typeof this.showWeekNumber === "boolean" ? this.showWeekNumber : this.type === "week"
      },
      "class": _defineProperty({}, "".concat(this.prefixClass, "-calendar-week-mode"), this.type === "week"),
      "on": {
        "select": this.handleSelectDate,
        "changepanel": this.handelPanelChange,
        "changecalendar": this.handleCalendarChange
      }
    });
  }
};
var CalendarRange = {
  name: "CalendarRange",
  components: {
    CalendarPanel
  },
  provide: function provide() {
    return {
      onDateMouseEnter: this.onDateMouseEnter,
      onDateMouseLeave: this.onDateMouseLeave
    };
  },
  inject: {
    prefixClass: {
      default: "mx"
    }
  },
  props: _objectSpread2({}, CalendarPanel.props),
  data: function data3() {
    return {
      innerValue: [],
      calendars: [],
      hoveredValue: null
    };
  },
  computed: {
    // Minimum difference between start and end calendars
    calendarMinDiff: function calendarMinDiff() {
      var map = {
        date: 1,
        // type:date  min 1 month
        month: 1 * 12,
        // type:month min 1 year
        year: 10 * 12
        // type:year  min 10 year
      };
      return map[this.type] || map.date;
    },
    calendarMaxDiff: function calendarMaxDiff() {
      return Infinity;
    },
    defaultValues: function defaultValues() {
      return Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue, this.defaultValue];
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler2() {
        var _this = this;
        this.innerValue = isValidRangeDate(this.value) ? this.value : [/* @__PURE__ */ new Date(NaN), /* @__PURE__ */ new Date(NaN)];
        var calendars = this.innerValue.map(function(v, i) {
          return startOfMonth(getValidDate(v, _this.defaultValues[i]));
        });
        this.updateCalendars(calendars);
      }
    }
  },
  methods: {
    handleSelect: function handleSelect(date, type) {
      var _this$innerValue = _slicedToArray(this.innerValue, 2), startValue = _this$innerValue[0], endValue = _this$innerValue[1];
      if (isValidDate(startValue) && !isValidDate(endValue)) {
        if (startValue.getTime() > date.getTime()) {
          this.innerValue = [date, startValue];
        } else {
          this.innerValue = [startValue, date];
        }
        this.emitDate(this.innerValue, type);
      } else {
        this.innerValue = [date, /* @__PURE__ */ new Date(NaN)];
      }
    },
    onDateMouseEnter: function onDateMouseEnter(cell) {
      this.hoveredValue = cell;
    },
    onDateMouseLeave: function onDateMouseLeave() {
      this.hoveredValue = null;
    },
    emitDate: function emitDate2(dates2, type) {
      this.$emit("select", dates2, type);
    },
    updateStartCalendar: function updateStartCalendar(value3) {
      this.updateCalendars([value3, this.calendars[1]], 1);
    },
    updateEndCalendar: function updateEndCalendar(value3) {
      this.updateCalendars([this.calendars[0], value3], 0);
    },
    updateCalendars: function updateCalendars(calendars) {
      var adjustIndex = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
      var gap = this.getCalendarGap(calendars);
      if (gap) {
        var calendar = new Date(calendars[adjustIndex]);
        calendar.setMonth(calendar.getMonth() + (adjustIndex === 0 ? -gap : gap));
        calendars[adjustIndex] = calendar;
      }
      this.calendars = calendars;
    },
    getCalendarGap: function getCalendarGap(calendars) {
      var _calendars = _slicedToArray(calendars, 2), calendarLeft = _calendars[0], calendarRight = _calendars[1];
      var yearDiff = calendarRight.getFullYear() - calendarLeft.getFullYear();
      var monthDiff = calendarRight.getMonth() - calendarLeft.getMonth();
      var diff = yearDiff * 12 + monthDiff;
      var min = this.calendarMinDiff;
      var max = this.calendarMaxDiff;
      if (diff < min) {
        return min - diff;
      }
      if (diff > max) {
        return max - diff;
      }
      return 0;
    },
    getRangeClasses: function getRangeClasses(cellDate, currentDates, classnames) {
      var classes = [].concat(this.getClasses(cellDate, currentDates, classnames));
      if (/disabled|active/.test(classnames)) return classes;
      var inRange = function inRange2(data10, range) {
        var fn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(v) {
          return v.getTime();
        };
        var value3 = fn(data10);
        var _range$map = range.map(fn), _range$map2 = _slicedToArray(_range$map, 2), min = _range$map2[0], max = _range$map2[1];
        if (min > max) {
          var _ref = [max, min];
          min = _ref[0];
          max = _ref[1];
        }
        return value3 > min && value3 < max;
      };
      if (currentDates.length === 2 && inRange(cellDate, currentDates)) {
        return classes.concat("in-range");
      }
      if (currentDates.length === 1 && this.hoveredValue && inRange(cellDate, [currentDates[0], this.hoveredValue])) {
        return classes.concat("hover-in-range");
      }
      return classes;
    }
  },
  render: function render2() {
    var _this2 = this;
    var h2 = arguments[0];
    var calendarRange = this.calendars.map(function(calendar, index) {
      var props = _objectSpread2({}, _this2.$props, {
        calendar,
        value: _this2.innerValue,
        defaultValue: _this2.defaultValues[index],
        getClasses: _this2.getRangeClasses,
        // don't update when range is true
        partialUpdate: false
      });
      var on = {
        select: _this2.handleSelect,
        "update:calendar": index === 0 ? _this2.updateStartCalendar : _this2.updateEndCalendar
      };
      return h2("calendar-panel", {
        "props": _objectSpread2({}, props),
        "on": _objectSpread2({}, on)
      });
    });
    var prefixClass = this.prefixClass;
    return h2("div", {
      "class": "".concat(prefixClass, "-range-wrapper")
    }, [calendarRange]);
  }
};
var scrollBarWidth;
function getScrollbarWidth() {
  if (typeof window === "undefined") return 0;
  if (scrollBarWidth !== void 0) return scrollBarWidth;
  var outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);
  var inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);
  scrollBarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollBarWidth;
}
var script$5 = {
  inject: {
    prefixClass: {
      default: "mx"
    }
  },
  data: function data4() {
    return {
      scrollbarWidth: 0,
      thumbTop: "",
      thumbHeight: ""
    };
  },
  created: function created() {
    this.scrollbarWidth = getScrollbarWidth();
    document.addEventListener("mouseup", this.handleDragend);
  },
  beforeDestroy: function beforeDestroy2() {
    document.addEventListener("mouseup", this.handleDragend);
  },
  mounted: function mounted2() {
    this.$nextTick(this.getThumbSize);
  },
  methods: {
    getThumbSize: function getThumbSize() {
      var wrap = this.$refs.wrap;
      if (!wrap) return;
      var heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
      this.thumbHeight = heightPercentage < 100 ? "".concat(heightPercentage, "%") : "";
    },
    handleScroll: function handleScroll(evt) {
      var el = evt.currentTarget;
      var scrollHeight = el.scrollHeight, scrollTop = el.scrollTop;
      this.thumbTop = "".concat(scrollTop * 100 / scrollHeight, "%");
    },
    handleDragstart: function handleDragstart(evt) {
      evt.stopImmediatePropagation();
      this._draggable = true;
      var offsetTop = this.$refs.thumb.offsetTop;
      this._prevY = evt.clientY - offsetTop;
      document.addEventListener("mousemove", this.handleDraging);
    },
    handleDraging: function handleDraging(evt) {
      if (!this._draggable) return;
      var clientY = evt.clientY;
      var wrap = this.$refs.wrap;
      var scrollHeight = wrap.scrollHeight, clientHeight = wrap.clientHeight;
      var offsetY = clientY - this._prevY;
      var top = offsetY * scrollHeight / clientHeight;
      wrap.scrollTop = top;
    },
    handleDragend: function handleDragend() {
      if (this._draggable) {
        this._draggable = false;
        document.removeEventListener("mousemove", this.handleDraging);
      }
    }
  }
};
var __vue_script__$5 = script$5;
var __vue_render__$8 = function __vue_render__10() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    class: _vm.prefixClass + "-scrollbar",
    style: {
      position: "relative",
      overflow: "hidden"
    }
  }, [_c("div", {
    ref: "wrap",
    class: _vm.prefixClass + "-scrollbar-wrap",
    style: {
      marginRight: "-" + _vm.scrollbarWidth + "px"
    },
    on: {
      "scroll": _vm.handleScroll
    }
  }, [_vm._t("default")], 2), _vm._v(" "), _c("div", {
    class: _vm.prefixClass + "-scrollbar-track"
  }, [_c("div", {
    ref: "thumb",
    class: _vm.prefixClass + "-scrollbar-thumb",
    style: {
      height: _vm.thumbHeight,
      top: _vm.thumbTop
    },
    on: {
      "mousedown": _vm.handleDragstart
    }
  })])]);
};
var __vue_staticRenderFns__$8 = [];
var __vue_inject_styles__$8 = void 0;
var __vue_component__$8 = normalizeComponent({
  render: __vue_render__$8,
  staticRenderFns: __vue_staticRenderFns__$8
}, __vue_inject_styles__$8, __vue_script__$5);
var padNumber = function padNumber2(value3) {
  value3 = parseInt(value3, 10);
  return value3 < 10 ? "0".concat(value3) : "".concat(value3);
};
var generateOptions = function generateOptions2(length, step, options) {
  if (Array.isArray(options)) {
    return options.filter(function(v) {
      return v >= 0 && v < length;
    });
  }
  if (step <= 0) {
    step = 1;
  }
  var arr = [];
  for (var i = 0; i < length; i += step) {
    arr.push(i);
  }
  return arr;
};
var scrollTo = function scrollTo2(element, to) {
  var duration = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  if (duration <= 0) {
    requestAnimationFrame(function() {
      element.scrollTop = to;
    });
    return;
  }
  var difference = to - element.scrollTop;
  var tick = difference / duration * 10;
  requestAnimationFrame(function() {
    var scrollTop = element.scrollTop + tick;
    if (scrollTop >= to) {
      element.scrollTop = to;
      return;
    }
    element.scrollTop = scrollTop;
    scrollTo2(element, to, duration - 10);
  });
};
var script$6 = {
  name: "ListColumns",
  components: {
    ScrollbarVertical: __vue_component__$8
  },
  inject: {
    prefixClass: {
      default: "mx"
    }
  },
  props: {
    date: Date,
    scrollDuration: {
      type: Number,
      default: 100
    },
    getClasses: {
      type: Function,
      default: function _default19() {
        return [];
      }
    },
    hourOptions: Array,
    minuteOptions: Array,
    secondOptions: Array,
    showHour: {
      type: Boolean,
      default: true
    },
    showMinute: {
      type: Boolean,
      default: true
    },
    showSecond: {
      type: Boolean,
      default: true
    },
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    secondStep: {
      type: Number,
      default: 1
    },
    use12h: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    columns: function columns() {
      var cols = [];
      if (this.showHour) cols.push({
        type: "hour",
        list: this.getHoursList()
      });
      if (this.showMinute) cols.push({
        type: "minute",
        list: this.getMinutesList()
      });
      if (this.showSecond) cols.push({
        type: "second",
        list: this.getSecondsList()
      });
      if (this.use12h) cols.push({
        type: "ampm",
        list: this.getAMPMList()
      });
      return cols.filter(function(v) {
        return v.list.length > 0;
      });
    }
  },
  watch: {
    date: {
      handler: function handler3() {
        var _this = this;
        this.$nextTick(function() {
          _this.scrollToSelected(_this.scrollDuration);
        });
      }
    }
  },
  mounted: function mounted3() {
    this.scrollToSelected(0);
  },
  methods: {
    getHoursList: function getHoursList() {
      var _this2 = this;
      return generateOptions(this.use12h ? 12 : 24, this.hourStep, this.hourOptions).map(function(num) {
        var date = new Date(_this2.date);
        var text2 = padNumber(num);
        if (_this2.use12h) {
          if (num === 0) {
            text2 = "12";
          }
          if (date.getHours() >= 12) {
            num += 12;
          }
        }
        var value3 = date.setHours(num);
        return {
          value: value3,
          text: text2
        };
      });
    },
    getMinutesList: function getMinutesList() {
      var _this3 = this;
      return generateOptions(60, this.minuteStep, this.minuteOptions).map(function(num) {
        var value3 = new Date(_this3.date).setMinutes(num);
        return {
          value: value3,
          text: padNumber(num)
        };
      });
    },
    getSecondsList: function getSecondsList() {
      var _this4 = this;
      return generateOptions(60, this.secondStep, this.secondOptions).map(function(num) {
        var value3 = new Date(_this4.date).setSeconds(num);
        return {
          value: value3,
          text: padNumber(num)
        };
      });
    },
    getAMPMList: function getAMPMList() {
      var _this5 = this;
      return ["AM", "PM"].map(function(text2, i) {
        var date = new Date(_this5.date);
        var value3 = date.setHours(date.getHours() % 12 + i * 12);
        return {
          text: text2,
          value: value3
        };
      });
    },
    scrollToSelected: function scrollToSelected(duration) {
      var elements = this.$el.querySelectorAll(".active");
      for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var scrollElement = getScrollParent(element, this.$el);
        if (scrollElement) {
          var to = element.offsetTop;
          scrollTo(scrollElement, to, duration);
        }
      }
    },
    handleSelect: function handleSelect2(evt) {
      var target = evt.target, currentTarget = evt.currentTarget;
      if (target.tagName.toUpperCase() !== "LI") return;
      var type = currentTarget.getAttribute("data-type");
      var colIndex = parseInt(currentTarget.getAttribute("data-index"), 10);
      var cellIndex = parseInt(target.getAttribute("data-index"), 10);
      var value3 = this.columns[colIndex].list[cellIndex].value;
      this.$emit("select", value3, type);
    }
  }
};
var __vue_script__$6 = script$6;
var __vue_render__$9 = function __vue_render__11() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    class: _vm.prefixClass + "-time-columns"
  }, _vm._l(_vm.columns, function(col, i) {
    return _c("scrollbar-vertical", {
      key: i,
      class: _vm.prefixClass + "-time-column"
    }, [_c("ul", {
      class: _vm.prefixClass + "-time-list",
      attrs: {
        "data-type": col.type,
        "data-index": i
      },
      on: {
        "click": _vm.handleSelect
      }
    }, _vm._l(col.list, function(item, j) {
      return _c("li", {
        key: item.value,
        class: [_vm.prefixClass + "-time-item", _vm.getClasses(item.value, col.type)],
        attrs: {
          "data-index": j
        }
      }, [_vm._v("\n        " + _vm._s(item.text) + "\n      ")]);
    }), 0)]);
  }), 1);
};
var __vue_staticRenderFns__$9 = [];
var __vue_inject_styles__$9 = void 0;
var __vue_component__$9 = normalizeComponent({
  render: __vue_render__$9,
  staticRenderFns: __vue_staticRenderFns__$9
}, __vue_inject_styles__$9, __vue_script__$6);
function parseOption() {
  var time = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
  var values = time.split(":");
  if (values.length >= 2) {
    var hours = parseInt(values[0], 10);
    var minutes = parseInt(values[1], 10);
    return {
      hours,
      minutes
    };
  }
  return null;
}
var scrollTo$1 = function scrollTo3(element, to) {
  if (element) {
    element.scrollTop = to;
  }
};
var script$7 = {
  name: "ListOptions",
  components: {
    ScrollbarVertical: __vue_component__$8
  },
  inject: {
    getLocale: {
      default: function _default20() {
        return getLocale;
      }
    },
    prefixClass: {
      default: "mx"
    }
  },
  props: {
    date: Date,
    options: {
      type: [Object, Function],
      default: function _default21() {
        return [];
      }
    },
    format: {
      type: String,
      default: "HH:mm:ss"
    },
    getClasses: {
      type: Function,
      default: function _default22() {
        return [];
      }
    }
  },
  computed: {
    list: function list() {
      var result = [];
      var options = this.options;
      if (typeof options === "function") {
        return options() || [];
      }
      var start = parseOption(options.start);
      var end = parseOption(options.end);
      var step = parseOption(options.step);
      var fmt = options.format || this.format;
      if (start && end && step) {
        var startMinutes = start.minutes + start.hours * 60;
        var endMinutes = end.minutes + end.hours * 60;
        var stepMinutes = step.minutes + step.hours * 60;
        var len = Math.floor((endMinutes - startMinutes) / stepMinutes);
        for (var i = 0; i <= len; i++) {
          var timeMinutes = startMinutes + i * stepMinutes;
          var hours = Math.floor(timeMinutes / 60);
          var minutes = timeMinutes % 60;
          var value3 = new Date(this.date).setHours(hours, minutes, 0);
          result.push({
            value: value3,
            text: this.formatDate(value3, fmt)
          });
        }
      }
      return result;
    }
  },
  mounted: function mounted4() {
    this.scrollToSelected();
  },
  methods: {
    formatDate: function formatDate2(date, fmt) {
      return format(date, fmt, {
        locale: this.getLocale().formatLocale
      });
    },
    scrollToSelected: function scrollToSelected2() {
      var element = this.$el.querySelector(".active");
      if (!element) return;
      var scrollElement = getScrollParent(element, this.$el);
      if (!scrollElement) return;
      var to = element.offsetTop;
      scrollTo$1(scrollElement, to);
    },
    handleSelect: function handleSelect3(value3) {
      this.$emit("select", value3, "time");
    }
  }
};
var __vue_script__$7 = script$7;
var __vue_render__$a = function __vue_render__12() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("scrollbar-vertical", _vm._l(_vm.list, function(item) {
    return _c("div", {
      key: item.value,
      class: [_vm.prefixClass + "-time-option", _vm.getClasses(item.value)],
      on: {
        "click": function click($event) {
          return _vm.handleSelect(item.value);
        }
      }
    }, [_vm._v("\n    " + _vm._s(item.text) + "\n  ")]);
  }), 0);
};
var __vue_staticRenderFns__$a = [];
var __vue_inject_styles__$a = void 0;
var __vue_component__$a = normalizeComponent({
  render: __vue_render__$a,
  staticRenderFns: __vue_staticRenderFns__$a
}, __vue_inject_styles__$a, __vue_script__$7);
var script$8 = {
  name: "TimePanel",
  components: {
    ListColumns: __vue_component__$9,
    ListOptions: __vue_component__$a
  },
  inject: {
    getLocale: {
      default: function _default23() {
        return getLocale;
      }
    },
    prefixClass: {
      default: "mx"
    }
  },
  props: {
    value: {},
    defaultValue: {
      default: function _default24() {
        var date = /* @__PURE__ */ new Date();
        date.setHours(0, 0, 0, 0);
        return date;
      }
    },
    format: {
      default: "HH:mm:ss"
    },
    timeTitleFormat: {
      type: String,
      default: "YYYY-MM-DD"
    },
    showTimeHeader: {
      type: Boolean,
      default: false
    },
    disabledTime: {
      type: Function,
      default: function _default25() {
        return false;
      }
    },
    timePickerOptions: {
      type: [Object, Function],
      default: function _default26() {
        return null;
      }
    },
    hourOptions: Array,
    minuteOptions: Array,
    secondOptions: Array,
    hourStep: {
      type: Number,
      default: 1
    },
    minuteStep: {
      type: Number,
      default: 1
    },
    secondStep: {
      type: Number,
      default: 1
    },
    showHour: {
      type: Boolean,
      default: void 0
    },
    showMinute: {
      type: Boolean,
      default: void 0
    },
    showSecond: {
      type: Boolean,
      default: void 0
    },
    use12h: {
      type: Boolean,
      default: void 0
    },
    scrollDuration: {
      type: Number,
      default: 100
    }
  },
  data: function data5() {
    return {
      innerValue: getValidDate(this.value, this.defaultValue)
    };
  },
  computed: {
    title: function title() {
      var titleFormat = this.timeTitleFormat;
      var date = new Date(this.innerValue);
      return this.formatDate(date, titleFormat);
    },
    innerForamt: function innerForamt() {
      return typeof this.format === "string" ? this.format : "HH:mm:ss";
    },
    ShowHourMinuteSecondAMPM: function ShowHourMinuteSecondAMPM() {
      var _this = this;
      var fmt = this.innerForamt;
      var defaultProps = {
        showHour: /[HhKk]/.test(fmt),
        showMinute: /m/.test(fmt),
        showSecond: /s/.test(fmt),
        use12h: /a/i.test(fmt)
      };
      var obj = {};
      Object.keys(defaultProps).forEach(function(key) {
        obj[key] = typeof _this[key] === "boolean" ? _this[key] : defaultProps[key];
      });
      return obj;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler4() {
        this.innerValue = getValidDate(this.value, this.defaultValue);
      }
    }
  },
  methods: {
    formatDate: function formatDate3(date, fmt) {
      return format(date, fmt, {
        locale: this.getLocale().formatLocale
      });
    },
    isDisabledTime: function isDisabledTime(value3) {
      return this.disabledTime(new Date(value3));
    },
    isDisabledHour: function isDisabledHour(date) {
      var value3 = new Date(date);
      return this.isDisabledTime(value3) && this.isDisabledTime(value3.setMinutes(0, 0, 0)) && this.isDisabledTime(value3.setMinutes(59, 59, 999));
    },
    isDisabledMinute: function isDisabledMinute(date) {
      var value3 = new Date(date);
      return this.isDisabledTime(value3) && this.isDisabledTime(value3.setSeconds(0, 0)) && this.isDisabledTime(value3.setSeconds(59, 999));
    },
    isDisabledAMPM: function isDisabledAMPM(date) {
      var value3 = new Date(date);
      var minHour = value3.getHours() < 12 ? 0 : 12;
      var maxHour = minHour + 11;
      return this.isDisabledTime(value3) && this.isDisabledTime(value3.setHours(minHour, 0, 0, 0)) && this.isDisabledTime(value3.setHours(maxHour, 59, 59, 999));
    },
    isDisabled: function isDisabled2(date, type) {
      if (type === "hour") {
        return this.isDisabledHour(date);
      }
      if (type === "minute") {
        return this.isDisabledMinute(date);
      }
      if (type === "ampm") {
        return this.isDisabledAMPM(date);
      }
      return this.isDisabledTime(date);
    },
    handleSelect: function handleSelect4(value3, type) {
      var date = new Date(value3);
      if (!this.isDisabled(value3, type)) {
        this.innerValue = date;
        if (!this.isDisabledTime(date)) {
          this.$emit("select", date, type);
        }
      }
    },
    handleClickTitle: function handleClickTitle() {
      this.$emit("clicktitle");
    },
    getClasses: function getClasses(value3, type) {
      var cellDate = new Date(value3);
      if (this.isDisabled(value3, type)) {
        return "disabled";
      }
      if (cellDate.getTime() === this.innerValue.getTime()) {
        return "active";
      }
      return "";
    }
  }
};
var __vue_script__$8 = script$8;
var __vue_render__$b = function __vue_render__13() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    class: _vm.prefixClass + "-time"
  }, [_vm.showTimeHeader ? _c("div", {
    class: _vm.prefixClass + "-time-header"
  }, [_c("button", {
    class: _vm.prefixClass + "-btn " + _vm.prefixClass + "-btn-text " + _vm.prefixClass + "-time-header-title",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleClickTitle
    }
  }, [_vm._v("\n      " + _vm._s(_vm.title) + "\n    ")])]) : _vm._e(), _vm._v(" "), _c("div", {
    class: _vm.prefixClass + "-time-content"
  }, [_vm.timePickerOptions ? _c("list-options", {
    attrs: {
      "date": _vm.innerValue,
      "get-classes": _vm.getClasses,
      "options": _vm.timePickerOptions,
      "format": _vm.innerForamt
    },
    on: {
      "select": _vm.handleSelect
    }
  }) : _c("list-columns", _vm._b({
    attrs: {
      "date": _vm.innerValue,
      "get-classes": _vm.getClasses,
      "hour-options": _vm.hourOptions,
      "minute-options": _vm.minuteOptions,
      "second-options": _vm.secondOptions,
      "hour-step": _vm.hourStep,
      "minute-step": _vm.minuteStep,
      "second-step": _vm.secondStep,
      "scroll-duration": _vm.scrollDuration
    },
    on: {
      "select": _vm.handleSelect
    }
  }, "list-columns", _vm.ShowHourMinuteSecondAMPM, false))], 1)]);
};
var __vue_staticRenderFns__$b = [];
var __vue_inject_styles__$b = void 0;
var __vue_component__$b = normalizeComponent({
  render: __vue_render__$b,
  staticRenderFns: __vue_staticRenderFns__$b
}, __vue_inject_styles__$b, __vue_script__$8);
var TimeRange = {
  name: "TimeRange",
  inject: {
    prefixClass: {
      default: "mx"
    }
  },
  props: _objectSpread2({}, __vue_component__$b.props),
  data: function data6() {
    return {
      startValue: /* @__PURE__ */ new Date(NaN),
      endValue: /* @__PURE__ */ new Date(NaN)
    };
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler5() {
        if (isValidRangeDate(this.value)) {
          var _this$value = _slicedToArray(this.value, 2), startValue = _this$value[0], endValue = _this$value[1];
          this.startValue = startValue;
          this.endValue = endValue;
        } else {
          this.startValue = /* @__PURE__ */ new Date(NaN);
          this.endValue = /* @__PURE__ */ new Date(NaN);
        }
      }
    }
  },
  methods: {
    emitChange: function emitChange(type, index) {
      var date = [this.startValue, this.endValue];
      this.$emit("select", date, type === "time" ? "time-range" : type, index);
    },
    handleSelectStart: function handleSelectStart(date, type) {
      this.startValue = date;
      if (!(this.endValue.getTime() >= date.getTime())) {
        this.endValue = date;
      }
      this.emitChange(type, 0);
    },
    handleSelectEnd: function handleSelectEnd(date, type) {
      this.endValue = date;
      if (!(this.startValue.getTime() <= date.getTime())) {
        this.startValue = date;
      }
      this.emitChange(type, 1);
    },
    disabledStartTime: function disabledStartTime(date) {
      return this.disabledTime(date, 0);
    },
    disabledEndTime: function disabledEndTime(date) {
      return date.getTime() < this.startValue.getTime() || this.disabledTime(date, 1);
    }
  },
  render: function render3() {
    var h2 = arguments[0];
    var defaultValues2 = Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue, this.defaultValue];
    var prefixClass = this.prefixClass;
    return h2("div", {
      "class": "".concat(prefixClass, "-range-wrapper")
    }, [h2(__vue_component__$b, {
      "props": _objectSpread2({}, _objectSpread2({}, this.$props, {
        value: this.startValue,
        defaultValue: defaultValues2[0],
        disabledTime: this.disabledStartTime
      })),
      "on": _objectSpread2({}, _objectSpread2({}, this.$listeners, {
        select: this.handleSelectStart
      }))
    }), h2(__vue_component__$b, {
      "props": _objectSpread2({}, _objectSpread2({}, this.$props, {
        value: this.endValue,
        defaultValue: defaultValues2[1],
        disabledTime: this.disabledEndTime
      })),
      "on": _objectSpread2({}, _objectSpread2({}, this.$listeners, {
        select: this.handleSelectEnd
      }))
    })]);
  }
};
var DatetimePanel = {
  name: "DatetimePanel",
  inject: {
    prefixClass: {
      default: "mx"
    }
  },
  emits: ["select", "update:show-time-panel"],
  props: _objectSpread2({}, CalendarPanel.props, {}, __vue_component__$b.props, {
    showTimePanel: {
      type: Boolean,
      default: void 0
    }
  }),
  data: function data7() {
    return {
      defaultTimeVisible: false,
      currentValue: this.value
    };
  },
  computed: {
    timeVisible: function timeVisible() {
      return typeof this.showTimePanel === "boolean" ? this.showTimePanel : this.defaultTimeVisible;
    }
  },
  watch: {
    value: function value(val) {
      this.currentValue = val;
    }
  },
  methods: {
    closeTimePanel: function closeTimePanel() {
      this.defaultTimeVisible = false;
      this.$emit("update:show-time-panel", false);
    },
    openTimePanel: function openTimePanel() {
      this.defaultTimeVisible = true;
      this.$emit("update:show-time-panel", true);
    },
    emitDate: function emitDate3(date, type) {
      this.$emit("select", date, type);
    },
    handleSelect: function handleSelect5(date, type) {
      if (type === "date") {
        this.openTimePanel();
      }
      var datetime = assignTime(date, getValidDate(this.value, this.defaultValue));
      if (this.disabledTime(new Date(datetime))) {
        datetime = assignTime(date, this.defaultValue);
        if (this.disabledTime(new Date(datetime))) {
          this.currentValue = datetime;
          return;
        }
      }
      this.emitDate(datetime, type);
    }
  },
  render: function render4() {
    var h2 = arguments[0];
    var calendarProps = {
      props: _objectSpread2({}, pick(this.$props, Object.keys(CalendarPanel.props)), {
        type: "date",
        value: this.currentValue
      }),
      on: {
        select: this.handleSelect
      }
    };
    var timeProps = {
      props: _objectSpread2({}, pick(this.$props, Object.keys(__vue_component__$b.props)), {
        showTimeHeader: true,
        value: this.currentValue
      }),
      on: {
        select: this.emitDate,
        clicktitle: this.closeTimePanel
      }
    };
    var prefixClass = this.prefixClass;
    return h2("div", [h2(CalendarPanel, helper([{}, calendarProps])), this.timeVisible && h2(__vue_component__$b, helper([{
      "class": "".concat(prefixClass, "-calendar-time")
    }, timeProps]))]);
  }
};
var DatetimeRange = {
  name: "DatetimeRange",
  inject: {
    prefixClass: {
      default: "mx"
    }
  },
  emits: ["select", "update:show-time-panel"],
  props: _objectSpread2({}, CalendarRange.props, {}, TimeRange.props, {
    showTimePanel: {
      type: Boolean,
      default: void 0
    }
  }),
  data: function data8() {
    return {
      defaultTimeVisible: false,
      currentValue: this.value
    };
  },
  computed: {
    timeVisible: function timeVisible2() {
      return typeof this.showTimePanel === "boolean" ? this.showTimePanel : this.defaultTimeVisible;
    }
  },
  watch: {
    value: function value2(val) {
      this.currentValue = val;
    }
  },
  methods: {
    closeTimePanel: function closeTimePanel2() {
      this.defaultTimeVisible = false;
      this.$emit("update:show-time-panel", false);
    },
    openTimePanel: function openTimePanel2() {
      this.defaultTimeVisible = true;
      this.$emit("update:show-time-panel", true);
    },
    emitDate: function emitDate4(dates2, type) {
      this.$emit("select", dates2, type);
    },
    handleSelect: function handleSelect6(dates2, type) {
      var _this = this;
      if (type === "date") {
        this.openTimePanel();
      }
      var defaultValues2 = Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue, this.defaultValue];
      var datetimes = dates2.map(function(date, i) {
        var time = isValidRangeDate(_this.value) ? _this.value[i] : defaultValues2[i];
        return assignTime(date, time);
      });
      if (datetimes[1].getTime() < datetimes[0].getTime()) {
        datetimes = [datetimes[0], datetimes[0]];
      }
      if (datetimes.some(this.disabledTime)) {
        datetimes = dates2.map(function(date, i) {
          return assignTime(date, defaultValues2[i]);
        });
        if (datetimes.some(this.disabledTime)) {
          this.currentValue = datetimes;
          return;
        }
      }
      this.emitDate(datetimes, type);
    }
  },
  render: function render5() {
    var h2 = arguments[0];
    var calendarProps = {
      props: _objectSpread2({}, pick(this.$props, Object.keys(CalendarRange.props)), {
        type: "date",
        value: this.currentValue
      }),
      on: {
        select: this.handleSelect
      }
    };
    var timeProps = {
      props: _objectSpread2({}, pick(this.$props, Object.keys(TimeRange.props)), {
        value: this.currentValue,
        showTimeHeader: true
      }),
      on: {
        select: this.emitDate,
        clicktitle: this.closeTimePanel
      }
    };
    var prefixClass = this.prefixClass;
    return h2("div", [h2(CalendarRange, helper([{}, calendarProps])), this.timeVisible && h2(TimeRange, helper([{
      "class": "".concat(prefixClass, "-calendar-time")
    }, timeProps]))]);
  }
};
var componentMap = {
  default: CalendarPanel,
  time: __vue_component__$b,
  datetime: DatetimePanel
};
var componentRangeMap = {
  default: CalendarRange,
  time: TimeRange,
  datetime: DatetimeRange
};
var DatePicker = {
  name: "DatePicker",
  provide: function provide2() {
    var _this = this;
    return {
      // make locale reactive
      getLocale: function getLocale2() {
        return _this.locale;
      },
      getWeek: this.getWeek,
      prefixClass: this.prefixClass,
      dispatchDatePicker: this.$emit.bind(this)
    };
  },
  props: _objectSpread2({}, DatetimePanel.props, {
    value: {},
    valueType: {
      type: String,
      default: "date"
      // date, format, timestamp, or token like 'YYYY-MM-DD'
    },
    type: {
      type: String,
      // ['date', 'datetime', 'time', 'year', 'month', 'week']
      default: "date"
    },
    format: {
      type: String
    },
    formatter: {
      type: Object
    },
    range: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    rangeSeparator: {
      type: String
    },
    lang: {
      type: [String, Object]
    },
    placeholder: {
      type: String,
      default: ""
    },
    editable: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    prefixClass: {
      type: String,
      default: "mx"
    },
    inputClass: {},
    inputAttr: {
      type: Object,
      default: function _default27() {
        return {};
      }
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    open: {
      type: Boolean,
      default: void 0
    },
    popupClass: {},
    popupStyle: {
      type: Object,
      default: function _default28() {
        return {};
      }
    },
    inline: {
      type: Boolean,
      default: false
    },
    confirm: {
      type: Boolean,
      default: false
    },
    confirmText: {
      type: String,
      default: "OK"
    },
    renderInputText: {
      type: Function
    },
    shortcuts: {
      type: Array,
      validator: function validator(value3) {
        return Array.isArray(value3) && value3.every(function(v) {
          return isObject(v) && typeof v.text === "string" && typeof v.onClick === "function";
        });
      },
      default: function _default29() {
        return [];
      }
    }
  }),
  data: function data9() {
    return {
      // cache the innervalue, wait to confirm
      currentValue: null,
      userInput: null,
      defaultOpen: false,
      mouseInInput: false
    };
  },
  computed: {
    popupVisible: function popupVisible() {
      return !this.disabled && (typeof this.open === "boolean" ? this.open : this.defaultOpen);
    },
    innerRangeSeparator: function innerRangeSeparator() {
      return this.rangeSeparator || (this.multiple ? "," : " ~ ");
    },
    innerFormat: function innerFormat() {
      var map = {
        date: "YYYY-MM-DD",
        datetime: "YYYY-MM-DD HH:mm:ss",
        year: "YYYY",
        month: "YYYY-MM",
        time: "HH:mm:ss",
        week: "w"
      };
      return this.format || map[this.type] || map.date;
    },
    innerValue: function innerValue2() {
      var value3 = this.value;
      if (this.validMultipleType) {
        value3 = Array.isArray(value3) ? value3 : [];
        return value3.map(this.value2date);
      }
      if (this.range) {
        value3 = Array.isArray(value3) ? value3.slice(0, 2) : [null, null];
        return value3.map(this.value2date);
      }
      return this.value2date(value3);
    },
    text: function text() {
      var _this2 = this;
      if (this.userInput !== null) {
        return this.userInput;
      }
      if (typeof this.renderInputText === "function") {
        return this.renderInputText(this.innerValue);
      }
      if (!this.isValidValue(this.innerValue)) {
        return "";
      }
      if (Array.isArray(this.innerValue)) {
        return this.innerValue.map(function(v) {
          return _this2.formatDate(v);
        }).join(this.innerRangeSeparator);
      }
      return this.formatDate(this.innerValue);
    },
    showClearIcon: function showClearIcon() {
      return !this.disabled && this.clearable && this.text && this.mouseInInput;
    },
    locale: function locale2() {
      if (isObject(this.lang)) {
        return mergeDeep(getLocale(), this.lang);
      }
      return getLocale(this.lang);
    },
    validMultipleType: function validMultipleType() {
      var types = ["date", "month", "year"];
      return this.multiple && !this.range && types.indexOf(this.type) !== -1;
    }
  },
  watch: {
    innerValue: {
      immediate: true,
      handler: function handler6(val) {
        this.currentValue = val;
      }
    },
    popupVisible: {
      handler: function handler7(val) {
        if (val) {
          this.currentValue = this.innerValue;
        }
      }
    }
  },
  created: function created2() {
    if (_typeof(this.format) === "object") {
      console.warn("[vue2-datepicker]: The prop `format` don't support Object any more. You can use the new prop `formatter` to replace it");
    }
  },
  methods: {
    handleMouseEnter: function handleMouseEnter2() {
      this.mouseInInput = true;
    },
    handleMouseLeave: function handleMouseLeave2() {
      this.mouseInInput = false;
    },
    handleClickOutSide: function handleClickOutSide(evt) {
      var target = evt.target;
      if (!this.$el.contains(target)) {
        this.closePopup();
      }
    },
    getFormatter: function getFormatter(key) {
      return isObject(this.formatter) && this.formatter[key] || isObject(this.format) && this.format[key];
    },
    getWeek: function getWeek$1(date, options) {
      if (typeof this.getFormatter("getWeek") === "function") {
        return this.getFormatter("getWeek")(date, options);
      }
      return getWeek(date, options);
    },
    parseDate: function parseDate(value3, fmt) {
      fmt = fmt || this.innerFormat;
      if (typeof this.getFormatter("parse") === "function") {
        return this.getFormatter("parse")(value3, fmt);
      }
      var backupDate = /* @__PURE__ */ new Date();
      return parse(value3, fmt, {
        locale: this.locale.formatLocale,
        backupDate
      });
    },
    formatDate: function formatDate4(date, fmt) {
      fmt = fmt || this.innerFormat;
      if (typeof this.getFormatter("stringify") === "function") {
        return this.getFormatter("stringify")(date, fmt);
      }
      return format(date, fmt, {
        locale: this.locale.formatLocale
      });
    },
    // transform the outer value to inner date
    value2date: function value2date(value3) {
      switch (this.valueType) {
        case "date":
          return value3 instanceof Date ? new Date(value3.getTime()) : /* @__PURE__ */ new Date(NaN);
        case "timestamp":
          return typeof value3 === "number" ? new Date(value3) : /* @__PURE__ */ new Date(NaN);
        case "format":
          return typeof value3 === "string" ? this.parseDate(value3) : /* @__PURE__ */ new Date(NaN);
        default:
          return typeof value3 === "string" ? this.parseDate(value3, this.valueType) : /* @__PURE__ */ new Date(NaN);
      }
    },
    // transform the inner date to outer value
    date2value: function date2value(date) {
      if (!isValidDate(date)) return null;
      switch (this.valueType) {
        case "date":
          return date;
        case "timestamp":
          return date.getTime();
        case "format":
          return this.formatDate(date);
        default:
          return this.formatDate(date, this.valueType);
      }
    },
    emitValue: function emitValue(date, type) {
      var close = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
      this.userInput = null;
      var value3 = Array.isArray(date) ? date.map(this.date2value) : this.date2value(date);
      this.$emit("input", value3);
      this.$emit("change", value3, type);
      if (close) {
        this.closePopup();
      }
      return value3;
    },
    isValidValue: function isValidValue(value3) {
      if (this.validMultipleType) {
        return isValidDates(value3);
      }
      if (this.range) {
        return isValidRangeDate(value3);
      }
      return isValidDate(value3);
    },
    isValidValueAndNotDisabled: function isValidValueAndNotDisabled(value3) {
      if (!this.isValidValue(value3)) {
        return false;
      }
      var disabledDate = typeof this.disabledDate === "function" ? this.disabledDate : function() {
        return false;
      };
      var disabledTime = typeof this.disabledTime === "function" ? this.disabledTime : function() {
        return false;
      };
      if (!Array.isArray(value3)) {
        value3 = [value3];
      }
      return value3.every(function(v) {
        return !disabledDate(v) && !disabledTime(v);
      });
    },
    handleMultipleDates: function handleMultipleDates(date, dates2) {
      if (this.validMultipleType && dates2) {
        var nextDates = dates2.filter(function(v) {
          return v.getTime() !== date.getTime();
        });
        if (nextDates.length === dates2.length) {
          nextDates.push(date);
        }
        return nextDates;
      }
      return date;
    },
    handleSelectDate: function handleSelectDate2(val, type, dates2) {
      val = this.handleMultipleDates(val, dates2);
      if (this.confirm) {
        this.currentValue = val;
      } else {
        this.emitValue(
          val,
          type,
          // this.type === 'datetime', click the time should close popup
          !this.validMultipleType && (type === this.type || type === "time")
        );
      }
    },
    clear: function clear() {
      this.emitValue(this.range ? [null, null] : null);
      this.$emit("clear");
    },
    handleClear: function handleClear(evt) {
      evt.stopPropagation();
      this.clear();
    },
    handleConfirmDate: function handleConfirmDate() {
      var value3 = this.emitValue(this.currentValue);
      this.$emit("confirm", value3);
    },
    handleSelectShortcut: function handleSelectShortcut(evt) {
      var index = evt.currentTarget.getAttribute("data-index");
      var item = this.shortcuts[parseInt(index, 10)];
      if (isObject(item) && typeof item.onClick === "function") {
        var date = item.onClick(this);
        if (date) {
          this.emitValue(date);
        }
      }
    },
    openPopup: function openPopup(evt) {
      if (this.popupVisible || this.disabled) return;
      this.defaultOpen = true;
      this.$emit("open", evt);
      this.$emit("update:open", true);
    },
    closePopup: function closePopup() {
      if (!this.popupVisible) return;
      this.defaultOpen = false;
      this.$emit("close");
      this.$emit("update:open", false);
    },
    blur: function blur() {
      if (this.$refs.input) {
        this.$refs.input.blur();
      }
    },
    focus: function focus() {
      if (this.$refs.input) {
        this.$refs.input.focus();
      }
    },
    handleInputChange: function handleInputChange() {
      var _this3 = this;
      if (!this.editable || this.userInput === null) return;
      var text2 = this.userInput.trim();
      this.userInput = null;
      if (text2 === "") {
        this.clear();
        return;
      }
      var date;
      if (this.validMultipleType) {
        date = text2.split(this.innerRangeSeparator).map(function(v) {
          return _this3.parseDate(v.trim());
        });
      } else if (this.range) {
        var arr = text2.split(this.innerRangeSeparator);
        if (arr.length !== 2) {
          arr = text2.split(this.innerRangeSeparator.trim());
        }
        date = arr.map(function(v) {
          return _this3.parseDate(v.trim());
        });
      } else {
        date = this.parseDate(text2);
      }
      if (this.isValidValueAndNotDisabled(date)) {
        this.emitValue(date);
        this.blur();
      } else {
        this.$emit("input-error", text2);
      }
    },
    handleInputInput: function handleInputInput(evt) {
      this.userInput = typeof evt === "string" ? evt : evt.target.value;
    },
    handleInputKeydown: function handleInputKeydown(evt) {
      var keyCode = evt.keyCode;
      if (keyCode === 9) {
        this.closePopup();
      } else if (keyCode === 13) {
        this.handleInputChange();
      }
    },
    handleInputBlur: function handleInputBlur(evt) {
      this.$emit("blur", evt);
    },
    handleInputFocus: function handleInputFocus(evt) {
      this.openPopup(evt);
      this.$emit("focus", evt);
    },
    hasSlot: function hasSlot(name) {
      return !!(this.$slots[name] || this.$scopedSlots[name]);
    },
    renderSlot: function renderSlot(name, fallback, props) {
      var slotFn = this.$scopedSlots[name];
      if (slotFn) {
        return slotFn(props) || fallback;
      }
      return this.$slots[name] || fallback;
    },
    renderInput: function renderInput() {
      var h2 = this.$createElement;
      var prefixClass = this.prefixClass;
      var props = _objectSpread2({
        name: "date",
        type: "text",
        autocomplete: "off",
        value: this.text,
        class: this.inputClass || "".concat(this.prefixClass, "-input"),
        readonly: !this.editable,
        disabled: this.disabled,
        placeholder: this.placeholder
      }, this.inputAttr);
      var value3 = props.value, className = props.class, attrs = _objectWithoutProperties(props, ["value", "class"]);
      var events = {
        keydown: this.handleInputKeydown,
        focus: this.handleInputFocus,
        blur: this.handleInputBlur,
        input: this.handleInputInput,
        change: this.handleInputChange
      };
      var input = this.renderSlot("input", h2("input", {
        "domProps": {
          "value": value3
        },
        "class": className,
        "attrs": _objectSpread2({}, attrs),
        "on": _objectSpread2({}, events),
        "ref": "input"
      }), {
        props,
        events
      });
      var calendarIcon = this.type === "time" ? h2(__vue_component__$2) : h2(__vue_component__$1);
      return h2("div", {
        "class": "".concat(prefixClass, "-input-wrapper"),
        "on": {
          "mouseenter": this.handleMouseEnter,
          "mouseleave": this.handleMouseLeave,
          "click": this.openPopup
        },
        "ref": "inputWrapper"
      }, [input, this.showClearIcon ? h2("i", {
        "class": "".concat(prefixClass, "-icon-clear"),
        "on": {
          "click": this.handleClear
        }
      }, [this.renderSlot("icon-clear", h2(__vue_component__$3))]) : h2("i", {
        "class": "".concat(prefixClass, "-icon-calendar")
      }, [this.renderSlot("icon-calendar", calendarIcon)])]);
    },
    renderContent: function renderContent() {
      var h2 = this.$createElement;
      var map = this.range ? componentRangeMap : componentMap;
      var Component = map[this.type] || map.default;
      var props = _objectSpread2({}, pick(this.$props, Object.keys(Component.props)), {
        value: this.currentValue
      });
      var on = _objectSpread2({}, pick(this.$listeners, Component.emits || []), {
        select: this.handleSelectDate
      });
      var content = h2(Component, helper([{}, {
        props,
        on,
        ref: "picker"
      }]));
      return h2("div", {
        "class": "".concat(this.prefixClass, "-datepicker-body")
      }, [this.renderSlot("content", content, {
        value: this.currentValue,
        emit: this.handleSelectDate
      })]);
    },
    renderSidebar: function renderSidebar() {
      var _this4 = this;
      var h2 = this.$createElement;
      var prefixClass = this.prefixClass;
      return h2("div", {
        "class": "".concat(prefixClass, "-datepicker-sidebar")
      }, [this.renderSlot("sidebar", null, {
        value: this.currentValue,
        emit: this.handleSelectDate
      }), this.shortcuts.map(function(v, i) {
        return h2("button", {
          "key": i,
          "attrs": {
            "data-index": i,
            "type": "button"
          },
          "class": "".concat(prefixClass, "-btn ").concat(prefixClass, "-btn-text ").concat(prefixClass, "-btn-shortcut"),
          "on": {
            "click": _this4.handleSelectShortcut
          }
        }, [v.text]);
      })]);
    },
    renderHeader: function renderHeader() {
      var h2 = this.$createElement;
      return h2("div", {
        "class": "".concat(this.prefixClass, "-datepicker-header")
      }, [this.renderSlot("header", null, {
        value: this.currentValue,
        emit: this.handleSelectDate
      })]);
    },
    renderFooter: function renderFooter() {
      var h2 = this.$createElement;
      var prefixClass = this.prefixClass;
      return h2("div", {
        "class": "".concat(prefixClass, "-datepicker-footer")
      }, [this.renderSlot("footer", null, {
        value: this.currentValue,
        emit: this.handleSelectDate
      }), this.confirm ? h2("button", {
        "attrs": {
          "type": "button"
        },
        "class": "".concat(prefixClass, "-btn ").concat(prefixClass, "-datepicker-btn-confirm"),
        "on": {
          "click": this.handleConfirmDate
        }
      }, [this.confirmText]) : null]);
    }
  },
  render: function render6() {
    var _class;
    var h2 = arguments[0];
    var prefixClass = this.prefixClass, inline = this.inline, disabled = this.disabled;
    var sidedar = this.hasSlot("sidebar") || this.shortcuts.length ? this.renderSidebar() : null;
    var content = h2("div", {
      "class": "".concat(prefixClass, "-datepicker-content")
    }, [this.hasSlot("header") ? this.renderHeader() : null, this.renderContent(), this.hasSlot("footer") || this.confirm ? this.renderFooter() : null]);
    return h2("div", {
      "class": (_class = {}, _defineProperty(_class, "".concat(prefixClass, "-datepicker"), true), _defineProperty(_class, "".concat(prefixClass, "-datepicker-range"), this.range), _defineProperty(_class, "".concat(prefixClass, "-datepicker-inline"), inline), _defineProperty(_class, "disabled", disabled), _class)
    }, [!inline ? this.renderInput() : null, !inline ? h2(__vue_component__, {
      "ref": "popup",
      "class": this.popupClass,
      "style": this.popupStyle,
      "attrs": {
        "visible": this.popupVisible,
        "appendToBody": this.appendToBody
      },
      "on": {
        "clickoutside": this.handleClickOutSide
      }
    }, [sidedar, content]) : h2("div", {
      "class": "".concat(prefixClass, "-datepicker-main")
    }, [sidedar, content])]);
  }
};
DatePicker.locale = locale;
DatePicker.install = function install(Vue) {
  Vue.component(DatePicker.name, DatePicker);
};
if (typeof window !== "undefined" && window.Vue) {
  DatePicker.install(window.Vue);
}
_extends(DatePicker, {
  CalendarPanel,
  CalendarRange,
  TimePanel: __vue_component__$b,
  TimeRange,
  DatetimePanel,
  DatetimeRange
});
export {
  DatePicker as D
};
//# sourceMappingURL=index.esm-BNIJhBgk.js.map
