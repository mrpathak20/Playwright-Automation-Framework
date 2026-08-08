import { hostname } from "node:os";
import path from "node:path";
import { env, pid } from "node:process";
import { isMainThread, threadId } from "node:worker_threads";
import { LabelName } from "../../../model.js";
import { getProjectName, getRelativePath } from "../utils.js";
var ENV_LABEL_PREFIX = "ALLURE_LABEL_";
export var getEnvironmentLabels = () => {
  var result = [];
  for (var envKey in env) {
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
var hostValue;
export var getHostLabel = () => {
  if (!hostValue) {
    var _env$ALLURE_HOST_NAME;
    hostValue = (_env$ALLURE_HOST_NAME = env.ALLURE_HOST_NAME) !== null && _env$ALLURE_HOST_NAME !== void 0 ? _env$ALLURE_HOST_NAME : hostname();
  }
  return {
    name: LabelName.HOST,
    value: hostValue
  };
};
export var getThreadLabel = userProvidedThreadId => {
  var _ref, _env$ALLURE_THREAD_NA;
  return {
    name: LabelName.THREAD,
    value: (_ref = (_env$ALLURE_THREAD_NA = env.ALLURE_THREAD_NAME) !== null && _env$ALLURE_THREAD_NA !== void 0 ? _env$ALLURE_THREAD_NA : userProvidedThreadId) !== null && _ref !== void 0 ? _ref : "pid-".concat(pid.toString(), "-worker-").concat(isMainThread ? "main" : threadId)
  };
};
export var getPackageLabel = (filepath, searchFrom) => {
  var projectName = getProjectName(searchFrom);
  var pathParts = getRelativePath(filepath, searchFrom).split(path.sep).filter(v => v);
  var labelParts = projectName ? [projectName, ...pathParts] : pathParts;
  return {
    name: LabelName.PACKAGE,
    value: labelParts.join(".")
  };
};
export var getLanguageLabel = () => ({
  name: LabelName.LANGUAGE,
  value: "javascript"
});
export var getFrameworkLabel = framework => ({
  name: LabelName.FRAMEWORK,
  value: framework
});
//# sourceMappingURL=labels.js.map