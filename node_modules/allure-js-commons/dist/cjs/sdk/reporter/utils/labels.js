"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getThreadLabel = exports.getPackageLabel = exports.getLanguageLabel = exports.getHostLabel = exports.getFrameworkLabel = exports.getEnvironmentLabels = void 0;
var _nodeOs = require("node:os");
var _nodePath = _interopRequireDefault(require("node:path"));
var _nodeProcess = require("node:process");
var _nodeWorker_threads = require("node:worker_threads");
var _model = require("../../../model.js");
var _utils = require("../utils.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var ENV_LABEL_PREFIX = "ALLURE_LABEL_";
var getEnvironmentLabels = () => {
  var result = [];
  for (var envKey in _nodeProcess.env) {
    if (envKey.startsWith(ENV_LABEL_PREFIX)) {
      var name = envKey.substring(ENV_LABEL_PREFIX.length).trim();
      if (name !== "") {
        result.push({
          name,
          value: process.env[envKey]
        });
      }
    }
  }
  return result;
};
exports.getEnvironmentLabels = getEnvironmentLabels;
var hostValue;
var getHostLabel = () => {
  if (!hostValue) {
    var _env$ALLURE_HOST_NAME;
    hostValue = (_env$ALLURE_HOST_NAME = _nodeProcess.env.ALLURE_HOST_NAME) !== null && _env$ALLURE_HOST_NAME !== void 0 ? _env$ALLURE_HOST_NAME : (0, _nodeOs.hostname)();
  }
  return {
    name: _model.LabelName.HOST,
    value: hostValue
  };
};
exports.getHostLabel = getHostLabel;
var getThreadLabel = userProvidedThreadId => {
  var _ref, _env$ALLURE_THREAD_NA;
  return {
    name: _model.LabelName.THREAD,
    value: (_ref = (_env$ALLURE_THREAD_NA = _nodeProcess.env.ALLURE_THREAD_NAME) !== null && _env$ALLURE_THREAD_NA !== void 0 ? _env$ALLURE_THREAD_NA : userProvidedThreadId) !== null && _ref !== void 0 ? _ref : "pid-".concat(_nodeProcess.pid.toString(), "-worker-").concat(_nodeWorker_threads.isMainThread ? "main" : _nodeWorker_threads.threadId)
  };
};
exports.getThreadLabel = getThreadLabel;
var getPackageLabel = (filepath, searchFrom) => {
  var projectName = (0, _utils.getProjectName)(searchFrom);
  var pathParts = (0, _utils.getRelativePath)(filepath, searchFrom).split(_nodePath.default.sep).filter(v => v);
  var labelParts = projectName ? [projectName, ...pathParts] : pathParts;
  return {
    name: _model.LabelName.PACKAGE,
    value: labelParts.join(".")
  };
};
exports.getPackageLabel = getPackageLabel;
var getLanguageLabel = () => ({
  name: _model.LabelName.LANGUAGE,
  value: "javascript"
});
exports.getLanguageLabel = getLanguageLabel;
var getFrameworkLabel = framework => ({
  name: _model.LabelName.FRAMEWORK,
  value: framework
});
exports.getFrameworkLabel = getFrameworkLabel;
//# sourceMappingURL=labels.js.map