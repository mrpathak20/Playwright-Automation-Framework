function _tsRewriteRelativeImportExtensions(t, e) { return "string" == typeof t && /^\.\.?\//.test(t) ? t.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+)?)\.([cm]?)ts$/i, function (t, s, r, n, o) { return s ? e ? ".jsx" : ".js" : !r || n && o ? r + n + "." + o.toLowerCase() + "js" : t; }) : t; }
import { noopRuntime, noopSyncRuntime } from "./NoopTestRuntime.js";
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
export var setGlobalTestRuntime = runtime => {
  globalThis[ALLURE_TEST_RUNTIME_KEY] = () => runtime;
};
var getGlobalTestRuntimeFunction = () => {
  return globalThis === null || globalThis === void 0 ? void 0 : globalThis[ALLURE_TEST_RUNTIME_KEY];
};
export var getGlobalTestRuntime = () => {
  var testRuntime = getGlobalTestRuntimeFunction();
  if (testRuntime) {
    var _testRuntime;
    return (_testRuntime = testRuntime()) !== null && _testRuntime !== void 0 ? _testRuntime : noopRuntime;
  }
  return noopRuntime;
};
export var getGlobalSyncTestRuntime = () => {
  var _getGlobalTestRuntime;
  return (_getGlobalTestRuntime = getGlobalTestRuntime().sync) !== null && _getGlobalTestRuntime !== void 0 ? _getGlobalTestRuntime : noopSyncRuntime;
};
export var getGlobalSyncTestRuntimeWithAutoconfig = () => {
  var _getGlobalTestRuntime2, _getGlobalTestRuntime3;
  var testRuntime = getGlobalTestRuntimeFunction();
  if (testRuntime) {
    var _testRuntime$sync, _testRuntime2;
    return (_testRuntime$sync = (_testRuntime2 = testRuntime()) === null || _testRuntime2 === void 0 ? void 0 : _testRuntime2.sync) !== null && _testRuntime$sync !== void 0 ? _testRuntime$sync : noopSyncRuntime;
  }
  if (!localRequire) {
    return noopSyncRuntime;
  }
  try {
    localRequire(pwAutoconfigModuleName);
  } catch (_unused) {
    return noopSyncRuntime;
  }
  return (_getGlobalTestRuntime2 = (_getGlobalTestRuntime3 = getGlobalTestRuntimeFunction()) === null || _getGlobalTestRuntime3 === void 0 || (_getGlobalTestRuntime3 = _getGlobalTestRuntime3()) === null || _getGlobalTestRuntime3 === void 0 ? void 0 : _getGlobalTestRuntime3.sync) !== null && _getGlobalTestRuntime2 !== void 0 ? _getGlobalTestRuntime2 : noopSyncRuntime;
};
export var getGlobalTestRuntimeWithAutoconfig = () => {
  var testRuntime = getGlobalTestRuntimeFunction();
  if (testRuntime) {
    var _testRuntime3;
    return (_testRuntime3 = testRuntime()) !== null && _testRuntime3 !== void 0 ? _testRuntime3 : noopRuntime;
  }
  return import(/* @vite-ignore */_tsRewriteRelativeImportExtensions(pwAutoconfigModuleName)).then(() => {
    var _getGlobalTestRuntime4, _getGlobalTestRuntime5;
    return (_getGlobalTestRuntime4 = (_getGlobalTestRuntime5 = getGlobalTestRuntimeFunction()) === null || _getGlobalTestRuntime5 === void 0 ? void 0 : _getGlobalTestRuntime5()) !== null && _getGlobalTestRuntime4 !== void 0 ? _getGlobalTestRuntime4 : noopRuntime;
  }).catch(() => noopRuntime);
};
//# sourceMappingURL=runtime.js.map