function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
import { test } from "@playwright/test";
import { Status } from "allure-js-commons";
import { getStatusFromError, isPromise } from "allure-js-commons/sdk";
import { ALLURE_RUNTIME_MESSAGE_CONTENT_TYPE } from "allure-js-commons/sdk/reporter";
import { MessageTestRuntime } from "allure-js-commons/sdk/runtime";
import { ALLURE_STEP_STATUS_ANNOTATION } from "./syncAnnotations.js";
var toAttachmentBody = function toAttachmentBody(content, encoding) {
  return content instanceof Uint8Array ? Buffer.from(content) : typeof content === "string" ? Buffer.from(content, encoding) : content;
};
var _syncStepStack = /*#__PURE__*/new WeakMap();
var _AllurePlaywrightTestRuntime_brand = /*#__PURE__*/new WeakSet();
export var AllurePlaywrightTestRuntime = /*#__PURE__*/function (_MessageTestRuntime) {
  function AllurePlaywrightTestRuntime() {
    var _this;
    _classCallCheck(this, AllurePlaywrightTestRuntime);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, AllurePlaywrightTestRuntime, [].concat(args));
    _classPrivateMethodInitSpec(_this, _AllurePlaywrightTestRuntime_brand);
    _defineProperty(_this, "cachedPlaywrightSyncRuntime", void 0);
    _classPrivateFieldInitSpec(_this, _syncStepStack, []);
    return _this;
  }
  _inherits(AllurePlaywrightTestRuntime, _MessageTestRuntime);
  return _createClass(AllurePlaywrightTestRuntime, [{
    key: "sync",
    get: function get() {
      var _this2 = this;
      if (!this.cachedPlaywrightSyncRuntime) {
        var baseSyncRuntime = _superPropGet(AllurePlaywrightTestRuntime, "sync", this, 1);
        this.cachedPlaywrightSyncRuntime = _objectSpread(_objectSpread({}, baseSyncRuntime), {}, {
          attachment: function attachment(name, content, options) {
            return _assertClassBrand(_AllurePlaywrightTestRuntime_brand, _this2, _attachContentSync).call(_this2, name, content, options);
          },
          attachmentFromPath: function attachmentFromPath(name, path, options) {
            return _assertClassBrand(_AllurePlaywrightTestRuntime_brand, _this2, _attachPathSync).call(_this2, name, path, options);
          },
          logStep: function logStep(name) {
            var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Status.PASSED;
            var error = arguments.length > 2 ? arguments[2] : undefined;
            return _assertClassBrand(_AllurePlaywrightTestRuntime_brand, _this2, _logStepSync).call(_this2, name, status, error);
          },
          step: function step(name, body) {
            return _assertClassBrand(_AllurePlaywrightTestRuntime_brand, _this2, _stepSync).call(_this2, name, body);
          },
          stepDisplayName: function stepDisplayName(name) {
            return _assertClassBrand(_AllurePlaywrightTestRuntime_brand, _this2, _attachStepMetadataSync).call(_this2, {
              name: name
            });
          },
          stepParameter: function stepParameter(name, value, mode) {
            return _assertClassBrand(_AllurePlaywrightTestRuntime_brand, _this2, _attachStepMetadataSync).call(_this2, {
              parameters: [{
                name: name,
                value: value,
                mode: mode
              }]
            });
          }
        });
      }
      return this.cachedPlaywrightSyncRuntime;
    }
  }, {
    key: "step",
    value: function () {
      var _step = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(stepName, body) {
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return test.step(stepName, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
                return _regenerator().w(function (_context) {
                  while (1) switch (_context.n) {
                    case 0:
                      _context.n = 1;
                      return body();
                    case 1:
                      return _context.a(2, _context.v);
                  }
                }, _callee);
              })));
            case 1:
              return _context2.a(2, _context2.v);
          }
        }, _callee2);
      }));
      function step(_x, _x2) {
        return _step.apply(this, arguments);
      }
      return step;
    }()
  }, {
    key: "stepDisplayName",
    value: function () {
      var _stepDisplayName = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(name) {
        return _regenerator().w(function (_context3) {
          while (1) switch (_context3.n) {
            case 0:
              _context3.n = 1;
              return test.info().attach("Allure Step Metadata", {
                contentType: ALLURE_RUNTIME_MESSAGE_CONTENT_TYPE,
                body: Buffer.from(JSON.stringify({
                  type: "step_metadata",
                  data: {
                    name: name
                  }
                }), "utf8")
              });
            case 1:
              return _context3.a(2);
          }
        }, _callee3);
      }));
      function stepDisplayName(_x3) {
        return _stepDisplayName.apply(this, arguments);
      }
      return stepDisplayName;
    }()
  }, {
    key: "stepParameter",
    value: function () {
      var _stepParameter = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(name, value, mode) {
        return _regenerator().w(function (_context4) {
          while (1) switch (_context4.n) {
            case 0:
              _context4.n = 1;
              return test.info().attach("Allure Step Metadata", {
                contentType: ALLURE_RUNTIME_MESSAGE_CONTENT_TYPE,
                body: Buffer.from(JSON.stringify({
                  type: "step_metadata",
                  data: {
                    parameters: [{
                      name: name,
                      value: value,
                      mode: mode
                    }]
                  }
                }), "utf8")
              });
            case 1:
              return _context4.a(2);
          }
        }, _callee4);
      }));
      function stepParameter(_x4, _x5, _x6) {
        return _stepParameter.apply(this, arguments);
      }
      return stepParameter;
    }()
  }, {
    key: "attachment",
    value: function () {
      var _attachment = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(name, content, options) {
        return _regenerator().w(function (_context5) {
          while (1) switch (_context5.n) {
            case 0:
              _context5.n = 1;
              return test.info().attach(name, {
                body: content instanceof Uint8Array ? Buffer.from(content) : content,
                contentType: options.contentType
              });
            case 1:
              return _context5.a(2);
          }
        }, _callee5);
      }));
      function attachment(_x7, _x8, _x9) {
        return _attachment.apply(this, arguments);
      }
      return attachment;
    }()
  }, {
    key: "attachmentFromPath",
    value: function () {
      var _attachmentFromPath = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(name, path, options) {
        return _regenerator().w(function (_context6) {
          while (1) switch (_context6.n) {
            case 0:
              _context6.n = 1;
              return test.info().attach(name, {
                path: path,
                contentType: options.contentType
              });
            case 1:
              return _context6.a(2);
          }
        }, _callee6);
      }));
      function attachmentFromPath(_x0, _x1, _x10) {
        return _attachmentFromPath.apply(this, arguments);
      }
      return attachmentFromPath;
    }()
  }, {
    key: "sendMessageSync",
    value: function sendMessageSync(message) {
      _assertClassBrand(_AllurePlaywrightTestRuntime_brand, this, _attachRuntimeMessage).call(this, message);
    }
  }, {
    key: "sendMessage",
    value: function () {
      var _sendMessage = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(message) {
        return _regenerator().w(function (_context7) {
          while (1) switch (_context7.n) {
            case 0:
              _context7.n = 1;
              return test.info().attach("Allure Metadata (".concat(message.type, ")"), {
                contentType: ALLURE_RUNTIME_MESSAGE_CONTENT_TYPE,
                body: Buffer.from(JSON.stringify(message), "utf8")
              });
            case 1:
              return _context7.a(2);
          }
        }, _callee7);
      }));
      function sendMessage(_x11) {
        return _sendMessage.apply(this, arguments);
      }
      return sendMessage;
    }()
  }]);
}(MessageTestRuntime);
function _attachRuntimeMessage(message) {
  _assertClassBrand(_AllurePlaywrightTestRuntime_brand, this, _getInternalTestInfo).call(this)._attach({
    name: "Allure Metadata (".concat(message.type, ")"),
    contentType: ALLURE_RUNTIME_MESSAGE_CONTENT_TYPE,
    body: Buffer.from(JSON.stringify(message), "utf8")
  });
}
function _attachStepMetadataSync(data) {
  _assertClassBrand(_AllurePlaywrightTestRuntime_brand, this, _attachSyntheticAttachStep).call(this, "Allure Step Metadata", {
    name: "Allure Step Metadata",
    contentType: ALLURE_RUNTIME_MESSAGE_CONTENT_TYPE,
    body: Buffer.from(JSON.stringify({
      type: "step_metadata",
      data: data
    }), "utf8")
  });
}
function _attachContentSync(name, content, options) {
  _assertClassBrand(_AllurePlaywrightTestRuntime_brand, this, _attachSyntheticAttachStep).call(this, name, {
    name: name,
    contentType: options.contentType,
    body: toAttachmentBody(content, options.encoding)
  });
}
function _attachPathSync(name, path, options) {
  _assertClassBrand(_AllurePlaywrightTestRuntime_brand, this, _attachSyntheticAttachStep).call(this, name, {
    name: name,
    contentType: options.contentType,
    path: path
  });
}
function _attachSyntheticAttachStep(name, attachment) {
  var info = _assertClassBrand(_AllurePlaywrightTestRuntime_brand, this, _getInternalTestInfo).call(this);
  var attachStep = info._addStep({
    category: "test.attach",
    title: "Attach \"".concat(name, "\"")
  }, _assertClassBrand(_AllurePlaywrightTestRuntime_brand, this, _currentSyncStep).call(this));
  try {
    info._attach(attachment, attachStep.stepId);
    attachStep.complete({});
  } catch (error) {
    attachStep.complete({
      error: error
    });
    throw error;
  }
}
function _logStepSync(name, status, error) {
  var step = _assertClassBrand(_AllurePlaywrightTestRuntime_brand, this, _startSyncStep).call(this, name);
  var stepError = error ? _assertClassBrand(_AllurePlaywrightTestRuntime_brand, this, _toPlaywrightStepError).call(this, error) : undefined;
  if (status !== Status.PASSED) {
    step.info.annotations.push({
      type: ALLURE_STEP_STATUS_ANNOTATION,
      description: status
    });
  }
  step.complete(stepError ? {
    error: stepError
  } : {});
}
function _stepSync(name, body) {
  var step = _assertClassBrand(_AllurePlaywrightTestRuntime_brand, this, _startSyncStep).call(this, name);
  var completed = false;
  _classPrivateFieldGet(_syncStepStack, this).push(step);
  try {
    var result = body();
    if (isPromise(result)) {
      var error = this.createSyncPromiseError();
      step.info.annotations.push({
        type: ALLURE_STEP_STATUS_ANNOTATION,
        description: Status.BROKEN
      });
      step.complete({
        error: error
      });
      completed = true;
      throw error;
    }
    step.complete({});
    completed = true;
    return result;
  } catch (error) {
    var runtimeError = error;
    var status = getStatusFromError(runtimeError);
    if (!completed && status !== Status.FAILED) {
      step.info.annotations.push({
        type: ALLURE_STEP_STATUS_ANNOTATION,
        description: status
      });
    }
    if (!completed) {
      step.complete({
        error: error
      });
    }
    throw error;
  } finally {
    _classPrivateFieldGet(_syncStepStack, this).pop();
  }
}
function _startSyncStep(name) {
  return _assertClassBrand(_AllurePlaywrightTestRuntime_brand, this, _getInternalTestInfo).call(this)._addStep({
    category: "test.step",
    title: name
  }, _assertClassBrand(_AllurePlaywrightTestRuntime_brand, this, _currentSyncStep).call(this));
}
function _currentSyncStep() {
  return _classPrivateFieldGet(_syncStepStack, this).at(-1);
}
function _toPlaywrightStepError(error) {
  if (error.name !== "Error") {
    return error;
  }
  var playwrightError = new Error(error.message, {
    cause: error.cause
  });
  playwrightError.name = "";
  playwrightError.stack = error.stack;
  return playwrightError;
}
function _getInternalTestInfo() {
  return test.info();
}
//# sourceMappingURL=runtime.js.map