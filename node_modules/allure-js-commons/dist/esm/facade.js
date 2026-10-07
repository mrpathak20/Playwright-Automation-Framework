import { ContentType } from "./model.js";
import { LabelName, LinkType } from "./model.js";
import { getGlobalTestRuntimeWithAutoconfig } from "./sdk/runtime/runtime.js";
import { isPromise } from "./sdk/utils.js";
var callRuntimeMethod = function callRuntimeMethod(method) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var runtime = getGlobalTestRuntimeWithAutoconfig();
  if (!isPromise(runtime)) {
    // @ts-ignore
    return runtime[method](...args);
  }
  return runtime.then(testRuntime => {
    // @ts-ignore
    return testRuntime[method](...args);
  });
};
export var label = (name, value) => {
  return callRuntimeMethod("labels", {
    name,
    value
  });
};
export var labels = function labels() {
  for (var _len2 = arguments.length, labelsList = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    labelsList[_key2] = arguments[_key2];
  }
  return callRuntimeMethod("labels", ...labelsList);
};
export var link = (url, name, type) => {
  return callRuntimeMethod("links", {
    url,
    type,
    name
  });
};
export var links = function links() {
  for (var _len3 = arguments.length, linksList = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    linksList[_key3] = arguments[_key3];
  }
  return callRuntimeMethod("links", ...linksList);
};
export var parameter = (name, value, options) => {
  return callRuntimeMethod("parameter", name, value, options);
};
export var description = markdown => {
  return callRuntimeMethod("description", markdown);
};
export var descriptionHtml = html => {
  return callRuntimeMethod("descriptionHtml", html);
};
export var displayName = name => {
  return callRuntimeMethod("displayName", name);
};
export var historyId = value => {
  return callRuntimeMethod("historyId", value);
};
export var testCaseId = value => {
  return callRuntimeMethod("testCaseId", value);
};
export var attachment = (name, content, options) => {
  var opts = typeof options === "string" ? {
    contentType: options
  } : options;
  return callRuntimeMethod("attachment", name, content, opts);
};
export var globalAttachment = (name, content, options) => {
  var opts = typeof options === "string" ? {
    contentType: options
  } : options;
  return callRuntimeMethod("globalAttachment", name, content, opts);
};
export var globalAttachmentPath = (name, path, options) => {
  var opts = typeof options === "string" ? {
    contentType: options
  } : options;
  return callRuntimeMethod("globalAttachmentFromPath", name, path, opts);
};
export var globalError = details => {
  return callRuntimeMethod("globalError", details);
};
export var attachTrace = (name, path) => {
  return callRuntimeMethod("attachmentFromPath", name, path, {
    contentType: ContentType.PLAYWRIGHT_TRACE
  });
};
export var attachmentPath = (name, path, options) => {
  var opts = typeof options === "string" ? {
    contentType: options
  } : options;
  return callRuntimeMethod("attachmentFromPath", name, path, opts);
};
var stepContext = () => ({
  displayName: name => {
    return callRuntimeMethod("stepDisplayName", name);
  },
  parameter: (name, value, mode) => {
    return callRuntimeMethod("stepParameter", name, value, mode);
  }
});
export var logStep = (name, status, error) => {
  return callRuntimeMethod("logStep", name, status, error);
};
export var step = (name, body) => {
  return callRuntimeMethod("step", name, () => body(stepContext()));
};
export var issue = (url, name) => link(url, name, LinkType.ISSUE);
export var tms = (url, name) => link(url, name, LinkType.TMS);
export var allureId = value => label(LabelName.ALLURE_ID, value);
export var epic = name => label(LabelName.EPIC, name);
export var feature = name => label(LabelName.FEATURE, name);
export var story = name => label(LabelName.STORY, name);
export var suite = name => label(LabelName.SUITE, name);
export var parentSuite = name => label(LabelName.PARENT_SUITE, name);
export var subSuite = name => label(LabelName.SUB_SUITE, name);
export var owner = name => label(LabelName.OWNER, name);
export var severity = name => label(LabelName.SEVERITY, name);
export var layer = name => label(LabelName.LAYER, name);
export var tag = name => label(LabelName.TAG, name);
export var tags = function tags() {
  for (var _len4 = arguments.length, tagsList = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    tagsList[_key4] = arguments[_key4];
  }
  return callRuntimeMethod("labels", ...tagsList.map(value => ({
    name: LabelName.TAG,
    value
  })));
};
//# sourceMappingURL=facade.js.map