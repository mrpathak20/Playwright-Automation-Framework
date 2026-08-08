"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifecycleState = void 0;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _scopes = /*#__PURE__*/new WeakMap();
var _testResults = /*#__PURE__*/new WeakMap();
var _stepResults = /*#__PURE__*/new WeakMap();
var _fixturesResults = /*#__PURE__*/new WeakMap();
class LifecycleState {
  constructor() {
    var _this = this;
    _classPrivateFieldInitSpec(this, _scopes, new Map());
    _classPrivateFieldInitSpec(this, _testResults, new Map());
    _classPrivateFieldInitSpec(this, _stepResults, new Map());
    _classPrivateFieldInitSpec(this, _fixturesResults, new Map());
    _defineProperty(this, "getScope", uuid => _classPrivateFieldGet(_scopes, this).get(uuid));
    _defineProperty(this, "getWrappedFixtureResult", uuid => _classPrivateFieldGet(_fixturesResults, this).get(uuid));
    _defineProperty(this, "getFixtureResult", uuid => {
      var _this$getWrappedFixtu;
      return (_this$getWrappedFixtu = this.getWrappedFixtureResult(uuid)) === null || _this$getWrappedFixtu === void 0 ? void 0 : _this$getWrappedFixtu.value;
    });
    _defineProperty(this, "getWrappedTestResult", uuid => _classPrivateFieldGet(_testResults, this).get(uuid));
    _defineProperty(this, "getTestResult", uuid => {
      var _this$getWrappedTestR;
      return (_this$getWrappedTestR = this.getWrappedTestResult(uuid)) === null || _this$getWrappedTestR === void 0 ? void 0 : _this$getWrappedTestR.value;
    });
    _defineProperty(this, "getStepResult", uuid => _classPrivateFieldGet(_stepResults, this).get(uuid));
    _defineProperty(this, "getExecutionItem", uuid => {
      var _ref, _this$getFixtureResul;
      return (_ref = (_this$getFixtureResul = this.getFixtureResult(uuid)) !== null && _this$getFixtureResul !== void 0 ? _this$getFixtureResul : this.getTestResult(uuid)) !== null && _ref !== void 0 ? _ref : this.getStepResult(uuid);
    });
    // test results
    _defineProperty(this, "setTestResult", function (uuid, result) {
      var scopeUuids = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      _classPrivateFieldGet(_testResults, _this).set(uuid, {
        value: result,
        scopeUuids
      });
    });
    _defineProperty(this, "deleteTestResult", uuid => {
      _classPrivateFieldGet(_testResults, this).delete(uuid);
    });
    // steps
    _defineProperty(this, "setStepResult", (uuid, result) => {
      _classPrivateFieldGet(_stepResults, this).set(uuid, result);
    });
    _defineProperty(this, "deleteStepResult", uuid => {
      _classPrivateFieldGet(_stepResults, this).delete(uuid);
    });
    // fixtures
    _defineProperty(this, "setFixtureResult", (scopeUuid, uuid, type, result) => {
      var wrappedResult = {
        uuid,
        type,
        value: result,
        scopeUuid
      };
      _classPrivateFieldGet(_fixturesResults, this).set(uuid, wrappedResult);
      return wrappedResult;
    });
    _defineProperty(this, "deleteFixtureResult", uuid => {
      _classPrivateFieldGet(_fixturesResults, this).delete(uuid);
    });
    // test scopes
    _defineProperty(this, "setScope", function (uuid) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var scope = _objectSpread(_objectSpread({
        labels: [],
        links: [],
        parameters: [],
        fixtures: [],
        tests: []
      }, data), {}, {
        uuid
      });
      _classPrivateFieldGet(_scopes, _this).set(uuid, scope);
      return scope;
    });
    _defineProperty(this, "deleteScope", uuid => {
      _classPrivateFieldGet(_scopes, this).delete(uuid);
    });
  }
}
exports.LifecycleState = LifecycleState;
//# sourceMappingURL=LifecycleState.js.map