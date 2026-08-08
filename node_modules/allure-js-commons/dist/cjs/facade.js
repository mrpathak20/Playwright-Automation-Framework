"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tms = exports.testCaseId = exports.tags = exports.tag = exports.suite = exports.subSuite = exports.story = exports.step = exports.severity = exports.parentSuite = exports.parameter = exports.owner = exports.logStep = exports.links = exports.link = exports.layer = exports.labels = exports.label = exports.issue = exports.historyId = exports.globalError = exports.globalAttachmentPath = exports.globalAttachment = exports.feature = exports.epic = exports.displayName = exports.descriptionHtml = exports.description = exports.attachmentPath = exports.attachment = exports.attachTrace = exports.allureId = void 0;
var _model = require("./model.js");
var _runtime = require("./sdk/runtime/runtime.js");
var _utils = require("./sdk/utils.js");
var callRuntimeMethod = function callRuntimeMethod(method) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var runtime = (0, _runtime.getGlobalTestRuntimeWithAutoconfig)();
  if (!(0, _utils.isPromise)(runtime)) {
    // @ts-ignore
    return runtime[method](...args);
  }
  return runtime.then(testRuntime => {
    // @ts-ignore
    return testRuntime[method](...args);
  });
};
var label = (name, value) => {
  return callRuntimeMethod("labels", {
    name,
    value
  });
};
exports.label = label;
var labels = exports.labels = function labels() {
  for (var _len2 = arguments.length, labelsList = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    labelsList[_key2] = arguments[_key2];
  }
  return callRuntimeMethod("labels", ...labelsList);
};
var link = (url, name, type) => {
  return callRuntimeMethod("links", {
    url,
    type,
    name
  });
};
exports.link = link;
var links = exports.links = function links() {
  for (var _len3 = arguments.length, linksList = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    linksList[_key3] = arguments[_key3];
  }
  return callRuntimeMethod("links", ...linksList);
};
var parameter = (name, value, options) => {
  return callRuntimeMethod("parameter", name, value, options);
};
exports.parameter = parameter;
var description = markdown => {
  return callRuntimeMethod("description", markdown);
};
exports.description = description;
var descriptionHtml = html => {
  return callRuntimeMethod("descriptionHtml", html);
};
exports.descriptionHtml = descriptionHtml;
var displayName = name => {
  return callRuntimeMethod("displayName", name);
};
exports.displayName = displayName;
var historyId = value => {
  return callRuntimeMethod("historyId", value);
};
exports.historyId = historyId;
var testCaseId = value => {
  return callRuntimeMethod("testCaseId", value);
};
exports.testCaseId = testCaseId;
var attachment = (name, content, options) => {
  var opts = typeof options === "string" ? {
    contentType: options
  } : options;
  return callRuntimeMethod("attachment", name, content, opts);
};
exports.attachment = attachment;
var globalAttachment = (name, content, options) => {
  var opts = typeof options === "string" ? {
    contentType: options
  } : options;
  return callRuntimeMethod("globalAttachment", name, content, opts);
};
exports.globalAttachment = globalAttachment;
var globalAttachmentPath = (name, path, options) => {
  var opts = typeof options === "string" ? {
    contentType: options
  } : options;
  return callRuntimeMethod("globalAttachmentFromPath", name, path, opts);
};
exports.globalAttachmentPath = globalAttachmentPath;
var globalError = details => {
  return callRuntimeMethod("globalError", details);
};
exports.globalError = globalError;
var attachTrace = (name, path) => {
  return callRuntimeMethod("attachmentFromPath", name, path, {
    contentType: _model.ContentType.PLAYWRIGHT_TRACE
  });
};
exports.attachTrace = attachTrace;
var attachmentPath = (name, path, options) => {
  var opts = typeof options === "string" ? {
    contentType: options
  } : options;
  return callRuntimeMethod("attachmentFromPath", name, path, opts);
};
exports.attachmentPath = attachmentPath;
var stepContext = () => ({
  displayName: name => {
    return callRuntimeMethod("stepDisplayName", name);
  },
  parameter: (name, value, mode) => {
    return callRuntimeMethod("stepParameter", name, value, mode);
  }
});
var logStep = (name, status, error) => {
  return callRuntimeMethod("logStep", name, status, error);
};
exports.logStep = logStep;
var step = (name, body) => {
  return callRuntimeMethod("step", name, () => body(stepContext()));
};
exports.step = step;
var issue = (url, name) => link(url, name, _model.LinkType.ISSUE);
exports.issue = issue;
var tms = (url, name) => link(url, name, _model.LinkType.TMS);
exports.tms = tms;
var allureId = value => label(_model.LabelName.ALLURE_ID, value);
exports.allureId = allureId;
var epic = name => label(_model.LabelName.EPIC, name);
exports.epic = epic;
var feature = name => label(_model.LabelName.FEATURE, name);
exports.feature = feature;
var story = name => label(_model.LabelName.STORY, name);
exports.story = story;
var suite = name => label(_model.LabelName.SUITE, name);
exports.suite = suite;
var parentSuite = name => label(_model.LabelName.PARENT_SUITE, name);
exports.parentSuite = parentSuite;
var subSuite = name => label(_model.LabelName.SUB_SUITE, name);
exports.subSuite = subSuite;
var owner = name => label(_model.LabelName.OWNER, name);
exports.owner = owner;
var severity = name => label(_model.LabelName.SEVERITY, name);
exports.severity = severity;
var layer = name => label(_model.LabelName.LAYER, name);
exports.layer = layer;
var tag = name => label(_model.LabelName.TAG, name);
exports.tag = tag;
var tags = exports.tags = function tags() {
  for (var _len4 = arguments.length, tagsList = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    tagsList[_key4] = arguments[_key4];
  }
  return callRuntimeMethod("labels", ...tagsList.map(value => ({
    name: _model.LabelName.TAG,
    value
  })));
};
//# sourceMappingURL=facade.js.map