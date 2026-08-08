"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uint8ArrayToBase64 = exports.stripAnsi = exports.serialize = exports.limitString = exports.isPromise = exports.isMetadataTag = exports.isGlobalRuntimeMessage = exports.isAnyStepFailed = exports.isAllStepsEnded = exports.hasStepMessage = exports.hasLabel = exports.getValueFromAllureTitleMetadataMatch = exports.getUnfinishedStepsMessages = exports.getTypeFromAllureTitleMetadataMatch = exports.getStepsMessagesPair = exports.getStatusFromError = exports.getMetadataLabel = exports.getMessageAndTraceFromError = exports.extractMetadataFromString = exports.excludeCircularRefsFromSet = exports.excludeCircularRefsFromMap = exports.composeReplacers = exports.allureTitleMetadataRegexpGlobal = exports.allureTitleMetadataRegexp = exports.allureMetadataRegexp = exports.allureLabelRegexp = exports.allureIdRegexp = void 0;
var _model = require("../model.js");
function _wrapRegExp() { _wrapRegExp = function _wrapRegExp(e, r) { return new BabelRegExp(e, void 0, r); }; var e = RegExp.prototype, r = new WeakMap(); function BabelRegExp(e, t, p) { var o = RegExp(e, t); return r.set(o, p || r.get(e)), _setPrototypeOf(o, BabelRegExp.prototype); } function buildGroups(e, t) { var p = r.get(t); return Object.keys(p).reduce(function (r, t) { var o = p[t]; if ("number" == typeof o) r[t] = e[o];else { for (var i = 0; void 0 === e[o[i]] && i + 1 < o.length;) i++; r[t] = e[o[i]]; } return r; }, Object.create(null)); } return _inherits(BabelRegExp, RegExp), BabelRegExp.prototype.exec = function (r) { var t = e.exec.call(this, r); if (t) { t.groups = buildGroups(t, this); var p = t.indices; p && (p.groups = buildGroups(p, this)); } return t; }, BabelRegExp.prototype[Symbol.replace] = function (t, p) { if ("string" == typeof p) { var o = r.get(this); return e[Symbol.replace].call(this, t, p.replace(/\$<([^>]+)(>|$)/g, function (e, r, t) { if ("" === t) return e; var p = o[r]; return Array.isArray(p) ? "$" + p.join("$") : "number" == typeof p ? "$" + p : ""; })); } if ("function" == typeof p) { var i = this; return e[Symbol.replace].call(this, t, function () { var e = arguments; return "object" != typeof e[e.length - 1] && (e = [].slice.call(e)).push(buildGroups(e, i)), p.apply(this, e); }); } return e[Symbol.replace].call(this, t, p); }, _wrapRegExp.apply(this, arguments); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var getStatusFromError = error => {
  switch (true) {
    /**
     * Native `node:assert` and `chai` (`vitest` uses it under the hood) throw `AssertionError`
     * `jest` throws `JestAssertionError` instance
     * `jasmine` throws `ExpectationFailed` instance
     * `vitest` throws `Error` for extended assertions, so we look into stack
     * `codeceptjs-expect` errors have actual/expected properties or inspect method
     */
    case /assert/gi.test(error.constructor.name):
    case /expectation/gi.test(error.constructor.name):
    case error.name && /assert/gi.test(error.name):
    case error.message && /assert/gi.test(error.message):
    case error.stack && /@vitest\/expect/gi.test(error.stack):
    case error.stack && /playwright\/lib\/matchers\/expect\.js/gi.test(error.stack):
    case error.stack && /codeceptjs-expect/gi.test(error.stack):
    case "matcherResult" in error:
    case "inspect" in error && typeof error.inspect === "function":
    case "actual" in error:
    case "expected" in error:
      return _model.Status.FAILED;
    default:
      return _model.Status.BROKEN;
  }
};

/**
 * Source: https://github.com/chalk/ansi-regex
 */
exports.getStatusFromError = getStatusFromError;
var ansiRegex = function ansiRegex() {
  var {
    onlyFirst = false
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var pattern = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");
  return new RegExp(pattern, onlyFirst ? undefined : "g");
};

/**
 * https://github.com/chalk/strip-ansi
 */
var stripAnsi = str => {
  var regex = ansiRegex();
  return str.replace(regex, "");
};
exports.stripAnsi = stripAnsi;
var actualAndExpected = value => {
  if (!value || typeof value !== "object") {
    return {};
  }

  // support for jest asserts
  if ("matcherResult" in value && value.matcherResult !== undefined && typeof value.matcherResult === "object") {
    return {
      actual: serialize(value.matcherResult.actual),
      expected: serialize(value.matcherResult.expected)
    };
  }
  var actual = "actual" in value && value.actual !== undefined ? {
    actual: serialize(value.actual)
  } : {};
  var expected = "expected" in value && value.expected !== undefined ? {
    expected: serialize(value.expected)
  } : {};
  return _objectSpread(_objectSpread({}, actual), expected);
};
var getMessageAndTraceFromError = error => {
  var {
    message,
    stack
  } = error;
  return _objectSpread({
    message: message ? stripAnsi(message) : undefined,
    trace: stack ? stripAnsi(stack) : undefined
  }, actualAndExpected(error));
};
exports.getMessageAndTraceFromError = getMessageAndTraceFromError;
var allureMetadataRegexp = exports.allureMetadataRegexp = /*#__PURE__*/_wrapRegExp(/(?:^|\s)@?allure\.(\S+)$/, {
  type: 1
});
var allureTitleMetadataRegexp = exports.allureTitleMetadataRegexp = /*#__PURE__*/_wrapRegExp(/(?:^|\s)@?allure\.([^:=\s]+)[:=]("[^"]+"|'[^']+'|`[^`]+`|\S+)/, {
  type: 1
});
var allureTitleMetadataRegexpGlobal = exports.allureTitleMetadataRegexpGlobal = new RegExp(allureTitleMetadataRegexp, "g");
var allureIdRegexp = exports.allureIdRegexp = /*#__PURE__*/_wrapRegExp(/(?:^|\s)@?allure\.id[:=](\S+)/, {
  id: 1
});
var allureLabelRegexp = exports.allureLabelRegexp = /*#__PURE__*/_wrapRegExp(/(?:^|\s)@?allure\.label\.([^:=\s]+)[:=]([^\s]+)/, {
  name: 1,
  value: 2
});
var getTypeFromAllureTitleMetadataMatch = match => {
  return match === null || match === void 0 ? void 0 : match[1];
};
exports.getTypeFromAllureTitleMetadataMatch = getTypeFromAllureTitleMetadataMatch;
var getValueFromAllureTitleMetadataMatch = match => {
  var _match$;
  var quotesRegexp = /['"`]/;
  var quoteOpenRegexp = new RegExp("^".concat(quotesRegexp.source));
  var quoteCloseRegexp = new RegExp("".concat(quotesRegexp.source, "$"));
  var matchedValue = (_match$ = match === null || match === void 0 ? void 0 : match[2]) !== null && _match$ !== void 0 ? _match$ : "";
  if (quoteOpenRegexp.test(matchedValue) && quoteCloseRegexp.test(matchedValue)) {
    return matchedValue.slice(1, -1);
  }
  return matchedValue;
};
exports.getValueFromAllureTitleMetadataMatch = getValueFromAllureTitleMetadataMatch;
var isMetadataTag = tag => {
  return allureMetadataRegexp.test(tag);
};
exports.isMetadataTag = isMetadataTag;
var getMetadataLabel = (tag, value) => {
  var _match$groups;
  var match = tag.match(allureMetadataRegexp);
  var type = match === null || match === void 0 || (_match$groups = match.groups) === null || _match$groups === void 0 ? void 0 : _match$groups.type;
  if (!type) {
    return undefined;
  }
  var [subtype, name] = type.split(".");
  return {
    name: subtype === "id" ? _model.LabelName.ALLURE_ID : name,
    value: value !== null && value !== void 0 ? value : ""
  };
};
exports.getMetadataLabel = getMetadataLabel;
var extractMetadataFromString = title => {
  var labels = [];
  var links = [];
  var metadata = title.matchAll(allureTitleMetadataRegexpGlobal);
  var cleanTitle = title.replaceAll(allureTitleMetadataRegexpGlobal, "").split(" ").filter(Boolean).reduce((acc, word) => {
    if (/^[\n\r]/.test(word)) {
      return acc + word;
    }
    return "".concat(acc, " ").concat(word);
  }, "").trim();
  for (var m of metadata) {
    var match = m;
    var type = getTypeFromAllureTitleMetadataMatch(match);
    var value = getValueFromAllureTitleMetadataMatch(match);
    if (!type || !value) {
      continue;
    }
    var [subtype, name] = type.split(".");
    switch (subtype) {
      case "id":
        labels.push({
          name: _model.LabelName.ALLURE_ID,
          value
        });
        break;
      case "label":
        labels.push({
          name,
          value
        });
        break;
      case "link":
        links.push({
          type: name,
          url: value
        });
        break;
    }
  }
  return {
    labels,
    links,
    cleanTitle
  };
};
exports.extractMetadataFromString = extractMetadataFromString;
var isAnyStepFailed = item => {
  var isFailed = item.status === _model.Status.FAILED;
  if (isFailed || item.steps.length === 0) {
    return isFailed;
  }
  return !!item.steps.find(step => isAnyStepFailed(step));
};
exports.isAnyStepFailed = isAnyStepFailed;
var isAllStepsEnded = item => {
  return item.steps.every(val => val.stop && isAllStepsEnded(val));
};
exports.isAllStepsEnded = isAllStepsEnded;
var hasLabel = (testResult, labelName) => {
  return !!testResult.labels.find(l => l.name === labelName);
};
exports.hasLabel = hasLabel;
var hasStepMessage = messages => {
  return messages.some(message => message.type === "step_start" || message.type === "step_stop");
};
exports.hasStepMessage = hasStepMessage;
var isGlobalRuntimeMessage = message => {
  return message.type === "global_attachment_content" || message.type === "global_attachment_path" || message.type === "global_error";
};
exports.isGlobalRuntimeMessage = isGlobalRuntimeMessage;
var getStepsMessagesPair = messages => messages.reduce((acc, message) => {
  if (message.type !== "step_start" && message.type !== "step_stop") {
    return acc;
  }
  if (message.type === "step_start") {
    acc.push([message]);
    return acc;
  }
  var unfinishedStepIdx = acc.findLastIndex(step => step.length === 1);
  if (unfinishedStepIdx === -1) {
    return acc;
  }
  acc[unfinishedStepIdx].push(message);
  return acc;
}, []);
exports.getStepsMessagesPair = getStepsMessagesPair;
var getUnfinishedStepsMessages = messages => {
  var grouppedStepsMessage = getStepsMessagesPair(messages);
  return grouppedStepsMessage.filter(step => step.length === 1);
};
exports.getUnfinishedStepsMessages = getUnfinishedStepsMessages;
var isPromise = obj => !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
exports.isPromise = isPromise;
var serialize = exports.serialize = function serialize(value) {
  var {
    maxDepth = 0,
    maxLength = 0,
    replacer
  } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return limitString(typeof value === "object" ? JSON.stringify(value, createSerializeReplacer(maxDepth, replacer)) : String(value), maxLength);
};
var createSerializeReplacer = (maxDepth, userDefinedReplacer) => {
  var parents = [];
  var limitingReplacer = function limitingReplacer(_, value) {
    if (typeof value !== "object" || value === null) {
      return value;
    }
    while (parents.length > 0 && !Object.is(parents.at(-1), this)) {
      parents.pop();
    }
    if (maxDepth && parents.length >= maxDepth || parents.includes(value)) {
      return undefined;
    }
    parents.push(value);
    return value instanceof Map ? excludeCircularRefsFromMap(parents, value) : value instanceof Set ? excludeCircularRefsFromSet(parents, value) : value;
  };
  return userDefinedReplacer ? composeReplacers(userDefinedReplacer, limitingReplacer) : limitingReplacer;
};
var composeReplacers = (first, second) => function (k, v) {
  return second.call(this, k, first.call(this, k, v));
};
exports.composeReplacers = composeReplacers;
var excludeCircularRefsFromMap = (parents, map) => {
  return Array.from(map).filter(_ref => {
    var [k] = _ref;
    return !parents.includes(k);
  }).map(_ref2 => {
    var [k, v] = _ref2;
    return [k, parents.includes(v) ? undefined : v];
  });
};
exports.excludeCircularRefsFromMap = excludeCircularRefsFromMap;
var excludeCircularRefsFromSet = (parents, set) => {
  return Array.from(set).map(v => parents.includes(v) ? undefined : v);
};
exports.excludeCircularRefsFromSet = excludeCircularRefsFromSet;
var limitString = (value, maxLength) => maxLength && value.length > maxLength ? "".concat(value.substring(0, maxLength), "...") : value;
exports.limitString = limitString;
var uint8ArrayToBase64 = data => {
  var binary = "";
  for (var charCode of data) {
    binary += String.fromCharCode(charCode);
  }
  return btoa(binary);
};
exports.uint8ArrayToBase64 = uint8ArrayToBase64;
//# sourceMappingURL=utils.js.map