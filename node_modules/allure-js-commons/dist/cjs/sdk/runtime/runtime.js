"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setGlobalTestRuntime = exports.getGlobalTestRuntimeWithAutoconfig = exports.getGlobalTestRuntime = exports.getGlobalSyncTestRuntimeWithAutoconfig = exports.getGlobalSyncTestRuntime = void 0;
var _NoopTestRuntime = require("./NoopTestRuntime.js");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var ALLURE_TEST_RUNTIME_KEY = "allureTestRuntime";
var pwAutoconfigModuleName = "allure-playwright/autoconfig";
var getNodeCreateRequire = () => {
  var _process$getBuiltinMo, _process$getBuiltinMo2, _process$getBuiltinMo3;
  var process = globalThis.process;
  return (_process$getBuiltinMo = process === null || process === void 0 || (_process$getBuiltinMo2 = process.getBuiltinModule) === null || _process$getBuiltinMo2 === void 0 || (_process$getBuiltinMo2 = _process$getBuiltinMo2.call(process, "node:module")) === null || _process$getBuiltinMo2 === void 0 ? void 0 : _process$getBuiltinMo2.createRequire) !== null && _process$getBuiltinMo !== void 0 ? _process$getBuiltinMo : process === null || process === void 0 || (_process$getBuiltinMo3 = process.getBuiltinModule) === null || _process$getBuiltinMo3 === void 0 || (_process$getBuiltinMo3 = _process$getBuiltinMo3.call(process, "module")) === null || _process$getBuiltinMo3 === void 0 ? void 0 : _process$getBuiltinMo3.createRequire;
};
var getNodeRequire = () => {
  var _process$cwd;
  var process = globalThis.process;
  var cwd = process === null || process === void 0 || (_process$cwd = process.cwd) === null || _process$cwd === void 0 ? void 0 : _process$cwd.call(process);
  var createRequire = getNodeCreateRequire();
  return cwd && createRequire ? createRequire("".concat(cwd, "/package.json")) : undefined;
};
var localRequire = typeof require === "function" ? require : getNodeRequire();
var setGlobalTestRuntime = runtime => {
  globalThis[ALLURE_TEST_RUNTIME_KEY] = () => runtime;
};
exports.setGlobalTestRuntime = setGlobalTestRuntime;
var getGlobalTestRuntimeFunction = () => {
  return globalThis === null || globalThis === void 0 ? void 0 : globalThis[ALLURE_TEST_RUNTIME_KEY];
};
var getGlobalTestRuntime = () => {
  var testRuntime = getGlobalTestRuntimeFunction();
  if (testRuntime) {
    var _testRuntime;
    return (_testRuntime = testRuntime()) !== null && _testRuntime !== void 0 ? _testRuntime : _NoopTestRuntime.noopRuntime;
  }
  return _NoopTestRuntime.noopRuntime;
};
exports.getGlobalTestRuntime = getGlobalTestRuntime;
var getGlobalSyncTestRuntime = () => {
  var _getGlobalTestRuntime;
  return (_getGlobalTestRuntime = getGlobalTestRuntime().sync) !== null && _getGlobalTestRuntime !== void 0 ? _getGlobalTestRuntime : _NoopTestRuntime.noopSyncRuntime;
};
exports.getGlobalSyncTestRuntime = getGlobalSyncTestRuntime;
var getGlobalSyncTestRuntimeWithAutoconfig = () => {
  var _getGlobalTestRuntime2, _getGlobalTestRuntime3;
  var testRuntime = getGlobalTestRuntimeFunction();
  if (testRuntime) {
    var _testRuntime$sync, _testRuntime2;
    return (_testRuntime$sync = (_testRuntime2 = testRuntime()) === null || _testRuntime2 === void 0 ? void 0 : _testRuntime2.sync) !== null && _testRuntime$sync !== void 0 ? _testRuntime$sync : _NoopTestRuntime.noopSyncRuntime;
  }
  if (!localRequire) {
    return _NoopTestRuntime.noopSyncRuntime;
  }
  try {
    localRequire(pwAutoconfigModuleName);
  } catch (_unused) {
    return _NoopTestRuntime.noopSyncRuntime;
  }
  return (_getGlobalTestRuntime2 = (_getGlobalTestRuntime3 = getGlobalTestRuntimeFunction()) === null || _getGlobalTestRuntime3 === void 0 || (_getGlobalTestRuntime3 = _getGlobalTestRuntime3()) === null || _getGlobalTestRuntime3 === void 0 ? void 0 : _getGlobalTestRuntime3.sync) !== null && _getGlobalTestRuntime2 !== void 0 ? _getGlobalTestRuntime2 : _NoopTestRuntime.noopSyncRuntime;
};
exports.getGlobalSyncTestRuntimeWithAutoconfig = getGlobalSyncTestRuntimeWithAutoconfig;
var getGlobalTestRuntimeWithAutoconfig = () => {
  var testRuntime = getGlobalTestRuntimeFunction();
  if (testRuntime) {
    var _testRuntime3;
    return (_testRuntime3 = testRuntime()) !== null && _testRuntime3 !== void 0 ? _testRuntime3 : _NoopTestRuntime.noopRuntime;
  }
  return (specifier => new Promise(r => r("".concat(specifier))).then(s => _interopRequireWildcard(require(s))))(/* @vite-ignore */
  pwAutoconfigModuleName).then(() => {
    var _getGlobalTestRuntime4, _getGlobalTestRuntime5;
    return (_getGlobalTestRuntime4 = (_getGlobalTestRuntime5 = getGlobalTestRuntimeFunction()) === null || _getGlobalTestRuntime5 === void 0 ? void 0 : _getGlobalTestRuntime5()) !== null && _getGlobalTestRuntime4 !== void 0 ? _getGlobalTestRuntime4 : _NoopTestRuntime.noopRuntime;
  }).catch(() => _NoopTestRuntime.noopRuntime);
};
exports.getGlobalTestRuntimeWithAutoconfig = getGlobalTestRuntimeWithAutoconfig;
//# sourceMappingURL=runtime.js.map