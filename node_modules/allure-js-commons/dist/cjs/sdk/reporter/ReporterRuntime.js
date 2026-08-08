"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShallowStepsStack = exports.ReporterRuntime = exports.DefaultStepStack = void 0;
var _nodePath = _interopRequireDefault(require("node:path"));
var _path = require("path");
var _model = require("../../model.js");
var _factory = require("./factory.js");
var _LifecycleState = require("./LifecycleState.js");
var _Notifier = require("./Notifier.js");
var _testplan = require("./testplan.js");
var _utils = require("./utils.js");
var _attachments = require("./utils/attachments.js");
var _loader = require("./writer/loader.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateGetter(s, r, a) { return a(_assertClassBrand(s, r)); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); } /* eslint max-lines: 0 */
var _runningSteps = /*#__PURE__*/new WeakMap();
var _ShallowStepsStack_brand = /*#__PURE__*/new WeakSet();
/**
 * Simpler steps stack implementation that contains only the current steps without root nodes
 * Useful, when you need to create steps without binding them to a specific test or fixture
 * @example
 * ```js
 * const stack = new ShallowStepsStack();
 *
 * stack.startStep({ name: "step 1" });
 * stack.startStep({ name: "step 1.1" });
 * stack.stopStep({ status: Status.FAILED });
 * stack.stopStep({ status: Status.PASSED });
 * stack.steps // => [{ name: "step 1", status: Status.PASSED, steps: [{ name: "step 1.1", status: Status.FAILED }] }]
 * ```
 */
class ShallowStepsStack {
  constructor() {
    _classPrivateMethodInitSpec(this, _ShallowStepsStack_brand);
    _defineProperty(this, "steps", []);
    _classPrivateFieldInitSpec(this, _runningSteps, []);
  }
  currentStep() {
    return _classPrivateGetter(_ShallowStepsStack_brand, this, _get_currentStep);
  }
  startStep(step) {
    var stepResult = _objectSpread(_objectSpread({}, (0, _factory.createStepResult)()), step);
    if (_classPrivateGetter(_ShallowStepsStack_brand, this, _get_currentStep)) {
      _classPrivateGetter(_ShallowStepsStack_brand, this, _get_currentStep).steps.push(stepResult);
    } else {
      this.steps.push(stepResult);
    }
    _classPrivateFieldGet(_runningSteps, this).push(stepResult);
  }
  updateStep(updateFunc) {
    if (!_classPrivateGetter(_ShallowStepsStack_brand, this, _get_currentStep)) {
      // eslint-disable-next-line no-console
      console.error("There is no running step in the stack to update!");
      return;
    }
    updateFunc(_classPrivateGetter(_ShallowStepsStack_brand, this, _get_currentStep));
  }
  stopStep(opts) {
    if (!_classPrivateGetter(_ShallowStepsStack_brand, this, _get_currentStep)) {
      // eslint-disable-next-line no-console
      console.error("There is no running step in the stack to stop!");
      return;
    }
    var {
      stop,
      duration = 0
    } = opts !== null && opts !== void 0 ? opts : {};
    this.updateStep(result => {
      result.stop = (stop !== null && stop !== void 0 ? stop : result.start) ? result.start + duration : undefined;
    });
    _classPrivateFieldGet(_runningSteps, this).pop();
  }
  findStepByUuid(uuid) {
    var findRecursively = steps => {
      for (var s of steps) {
        if (s.uuid === uuid) {
          return s;
        }
        var found = findRecursively(s.steps);
        if (found) {
          return found;
        }
      }
      return undefined;
    };
    return findRecursively(this.steps);
  }
  addAttachment(attachment, writer) {
    var isPath = !!attachment.path;
    var fileExt = attachment.path ? _nodePath.default.extname(attachment.path) : undefined;
    var fileName = (0, _attachments.buildAttachmentFileName)({
      contentType: attachment.contentType,
      fileExtension: fileExt
    });
    if (isPath) {
      writer.writeAttachmentFromPath(fileName, attachment.path);
    } else if (attachment.body) {
      writer.writeAttachment(fileName, attachment.body);
    }
    return fileName;
  }
}
exports.ShallowStepsStack = ShallowStepsStack;
function _get_currentStep(_this) {
  return _classPrivateFieldGet(_runningSteps, _this)[_classPrivateFieldGet(_runningSteps, _this).length - 1];
}
class DefaultStepStack {
  constructor() {
    _defineProperty(this, "stepsByRoot", new Map());
    _defineProperty(this, "rootsByStep", new Map());
    _defineProperty(this, "clear", () => {
      this.stepsByRoot.clear();
      this.rootsByStep.clear();
    });
    _defineProperty(this, "removeRoot", rootUuid => {
      var maybeValue = this.stepsByRoot.get(rootUuid);
      this.stepsByRoot.delete(rootUuid);
      if (maybeValue) {
        maybeValue.forEach(stepUuid => this.rootsByStep.delete(stepUuid));
      }
    });
    _defineProperty(this, "currentStep", rootUuid => {
      var maybeValue = this.stepsByRoot.get(rootUuid);
      if (!maybeValue) {
        return;
      }
      return maybeValue[maybeValue.length - 1];
    });
    _defineProperty(this, "addStep", (rootUuid, stepUuid) => {
      var maybeValue = this.stepsByRoot.get(rootUuid);
      if (!maybeValue) {
        this.stepsByRoot.set(rootUuid, [stepUuid]);
      } else {
        maybeValue.push(stepUuid);
      }
      this.rootsByStep.set(stepUuid, rootUuid);
    });
  }
  removeStep(stepUuid) {
    var rootUuid = this.rootsByStep.get(stepUuid);
    if (!rootUuid) {
      return;
    }
    var maybeValue = this.stepsByRoot.get(rootUuid);
    if (!maybeValue) {
      return;
    }
    var newValue = maybeValue.filter(value => value !== stepUuid);
    this.stepsByRoot.set(rootUuid, newValue);
  }
}
exports.DefaultStepStack = DefaultStepStack;
var _handleMetadataMessage = /*#__PURE__*/new WeakMap();
var _handleStepMetadataMessage = /*#__PURE__*/new WeakMap();
var _handleStartStepMessage = /*#__PURE__*/new WeakMap();
var _handleStopStepMessage = /*#__PURE__*/new WeakMap();
var _handleAttachmentContentMessage = /*#__PURE__*/new WeakMap();
var _handleAttachmentPathMessage = /*#__PURE__*/new WeakMap();
var _handleGlobalAttachmentContentMessage = /*#__PURE__*/new WeakMap();
var _handleGlobalAttachmentPathMessage = /*#__PURE__*/new WeakMap();
var _handleGlobalErrorMessage = /*#__PURE__*/new WeakMap();
var _findParent = /*#__PURE__*/new WeakMap();
var _writeAttachmentFile = /*#__PURE__*/new WeakMap();
var _createAttachment = /*#__PURE__*/new WeakMap();
var _createGlobalAttachment = /*#__PURE__*/new WeakMap();
var _writeGlobals = /*#__PURE__*/new WeakMap();
var _writeFixturesOfScope = /*#__PURE__*/new WeakMap();
var _writeContainer = /*#__PURE__*/new WeakMap();
var _calculateTimings = /*#__PURE__*/new WeakMap();
class ReporterRuntime {
  constructor(_ref) {
    var _this2 = this;
    var {
      writer,
      listeners = [],
      environmentInfo,
      categories,
      links: _links,
      globalLabels = {}
    } = _ref;
    _defineProperty(this, "state", new _LifecycleState.LifecycleState());
    _defineProperty(this, "notifier", void 0);
    _defineProperty(this, "stepStack", new DefaultStepStack());
    _defineProperty(this, "writer", void 0);
    _defineProperty(this, "categories", void 0);
    _defineProperty(this, "environmentInfo", void 0);
    _defineProperty(this, "linkConfig", void 0);
    _defineProperty(this, "globalLabels", []);
    _defineProperty(this, "startScope", () => {
      var uuid = (0, _utils.randomUuid)();
      this.state.setScope(uuid);
      return uuid;
    });
    _defineProperty(this, "updateScope", (uuid, updateFunc) => {
      var scope = this.state.getScope(uuid);
      if (!scope) {
        // eslint-disable-next-line no-console
        console.error("count not update scope: no scope with uuid ".concat(uuid, " is found"));
        return;
      }
      updateFunc(scope);
    });
    _defineProperty(this, "writeScope", uuid => {
      var scope = this.state.getScope(uuid);
      if (!scope) {
        // eslint-disable-next-line no-console
        console.error("count not write scope: no scope with uuid ".concat(uuid, " is found"));
        return;
      }
      _classPrivateFieldGet(_writeFixturesOfScope, this).call(this, scope);
      this.state.deleteScope(scope.uuid);
    });
    _defineProperty(this, "startFixture", (scopeUuid, type, fixtureResult) => {
      var scope = this.state.getScope(scopeUuid);
      if (!scope) {
        // eslint-disable-next-line no-console
        console.error("count not start fixture: no scope with uuid ".concat(scopeUuid, " is found"));
        return;
      }
      var uuid = (0, _utils.randomUuid)();
      var wrappedFixture = this.state.setFixtureResult(scopeUuid, uuid, type, _objectSpread(_objectSpread({}, (0, _factory.createFixtureResult)()), {}, {
        start: Date.now()
      }, fixtureResult));
      scope.fixtures.push(wrappedFixture);
      return uuid;
    });
    _defineProperty(this, "updateFixture", (uuid, updateFunc) => {
      var fixture = this.state.getFixtureResult(uuid);
      if (!fixture) {
        // eslint-disable-next-line no-console
        console.error("could not update fixture: no fixture with uuid ".concat(uuid, " is found"));
        return;
      }
      updateFunc(fixture);
    });
    _defineProperty(this, "stopFixture", (uuid, opts) => {
      var fixture = this.state.getFixtureResult(uuid);
      if (!fixture) {
        // eslint-disable-next-line no-console
        console.error("could not stop fixture: no fixture with uuid ".concat(uuid, " is found"));
        return;
      }
      var startStop = _classPrivateFieldGet(_calculateTimings, this).call(this, fixture.start, opts === null || opts === void 0 ? void 0 : opts.stop, opts === null || opts === void 0 ? void 0 : opts.duration);
      fixture.start = startStop.start;
      fixture.stop = startStop.stop;
      fixture.stage = _model.Stage.FINISHED;
    });
    _defineProperty(this, "startTest", function (result) {
      var scopeUuids = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var uuid = (0, _utils.randomUuid)();
      var testResult = _objectSpread(_objectSpread({}, (0, _factory.createTestResult)(uuid)), {}, {
        start: Date.now()
      }, (0, _utils.deepClone)(result));
      _this2.notifier.beforeTestResultStart(testResult);
      scopeUuids.forEach(scopeUuid => {
        var scope = _this2.state.getScope(scopeUuid);
        if (!scope) {
          // eslint-disable-next-line no-console
          console.error("count not link test to the scope: no scope with uuid ".concat(uuid, " is found"));
          return;
        }
        scope.tests.push(uuid);
      });
      _this2.state.setTestResult(uuid, testResult, scopeUuids);
      _this2.notifier.afterTestResultStart(testResult);
      return uuid;
    });
    _defineProperty(this, "updateTest", (uuid, updateFunc) => {
      var testResult = this.state.getTestResult(uuid);
      if (!testResult) {
        // eslint-disable-next-line no-console
        console.error("could not update test result: no test with uuid ".concat(uuid, ") is found"));
        return;
      }
      this.notifier.beforeTestResultUpdate(testResult);
      updateFunc(testResult);
      this.notifier.afterTestResultUpdate(testResult);
    });
    _defineProperty(this, "stopTest", (uuid, opts) => {
      var _testResult$testCaseI, _testResult$historyId;
      var wrapped = this.state.getWrappedTestResult(uuid);
      if (!wrapped) {
        // eslint-disable-next-line no-console
        console.error("could not stop test result: no test with uuid ".concat(uuid, ") is found"));
        return;
      }
      var testResult = wrapped.value;
      this.notifier.beforeTestResultStop(testResult);
      var scopeUuids = wrapped.scopeUuids;
      scopeUuids.forEach(scopeUuid => {
        var scope = this.state.getScope(scopeUuid);
        if (scope !== null && scope !== void 0 && scope.labels) {
          testResult.labels = [...testResult.labels, ...scope.labels];
        }
        if (scope !== null && scope !== void 0 && scope.links) {
          testResult.links = [...testResult.links, ...scope.links];
        }
        if (scope !== null && scope !== void 0 && scope.parameters) {
          testResult.parameters = [...testResult.parameters, ...scope.parameters];
        }
        if (scope !== null && scope !== void 0 && scope.description) {
          var _testResult$descripti;
          testResult.description = (_testResult$descripti = testResult.description) !== null && _testResult$descripti !== void 0 ? _testResult$descripti : scope.description;
        }
        if (scope !== null && scope !== void 0 && scope.descriptionHtml) {
          var _testResult$descripti2;
          testResult.descriptionHtml = (_testResult$descripti2 = testResult.descriptionHtml) !== null && _testResult$descripti2 !== void 0 ? _testResult$descripti2 : scope.descriptionHtml;
        }
      });
      testResult.labels = [...this.globalLabels, ...testResult.labels];
      (_testResult$testCaseI = testResult.testCaseId) !== null && _testResult$testCaseI !== void 0 ? _testResult$testCaseI : testResult.testCaseId = (0, _utils.getTestResultTestCaseId)(testResult);
      (_testResult$historyId = testResult.historyId) !== null && _testResult$historyId !== void 0 ? _testResult$historyId : testResult.historyId = (0, _utils.getTestResultHistoryId)(testResult);
      var startStop = _classPrivateFieldGet(_calculateTimings, this).call(this, testResult.start, opts === null || opts === void 0 ? void 0 : opts.stop, opts === null || opts === void 0 ? void 0 : opts.duration);
      testResult.start = startStop.start;
      testResult.stop = startStop.stop;
      this.notifier.afterTestResultStop(testResult);
    });
    _defineProperty(this, "writeTest", uuid => {
      var testResult = this.state.getTestResult(uuid);
      if (!testResult) {
        // eslint-disable-next-line no-console
        console.error("could not write test result: no test with uuid ".concat(uuid, " is found"));
        return;
      }
      if ((0, _testplan.hasSkipLabel)(testResult.labels)) {
        this.state.deleteTestResult(uuid);
        return;
      }
      this.notifier.beforeTestResultWrite(testResult);
      this.writer.writeResult(testResult);
      this.state.deleteTestResult(uuid);
      this.notifier.afterTestResultWrite(testResult);
    });
    _defineProperty(this, "currentStep", rootUuid => {
      return this.stepStack.currentStep(rootUuid);
    });
    _defineProperty(this, "startStep", (rootUuid, parentStepUuid, result) => {
      var parent = _classPrivateFieldGet(_findParent, this).call(this, rootUuid, parentStepUuid);
      if (!parent) {
        // eslint-disable-next-line no-console
        console.error("could not start test step: no context for root ".concat(rootUuid, " and parentStepUuid ").concat(JSON.stringify(parentStepUuid), " is found"));
        return;
      }
      var stepResult = _objectSpread(_objectSpread({}, (0, _factory.createStepResult)()), {}, {
        start: Date.now()
      }, result);
      parent.steps.push(stepResult);
      var stepUuid = (0, _utils.randomUuid)();
      this.state.setStepResult(stepUuid, stepResult);
      this.stepStack.addStep(rootUuid, stepUuid);
      return stepUuid;
    });
    _defineProperty(this, "updateStep", (uuid, updateFunc) => {
      var step = this.state.getStepResult(uuid);
      if (!step) {
        // eslint-disable-next-line no-console
        console.error("could not update test step: no step with uuid ".concat(uuid, " is found"));
        return;
      }
      updateFunc(step);
    });
    _defineProperty(this, "stopStep", (uuid, opts) => {
      var step = this.state.getStepResult(uuid);
      if (!step) {
        // eslint-disable-next-line no-console
        console.error("could not stop test step: no step with uuid ".concat(uuid, " is found"));
        return;
      }
      this.notifier.beforeStepStop(step);
      var startStop = _classPrivateFieldGet(_calculateTimings, this).call(this, step.start, opts === null || opts === void 0 ? void 0 : opts.stop, opts === null || opts === void 0 ? void 0 : opts.duration);
      step.start = startStop.start;
      step.stop = startStop.stop;
      step.stage = _model.Stage.FINISHED;
      this.stepStack.removeStep(uuid);
      this.notifier.afterStepStop(step);
    });
    _defineProperty(this, "writeAttachment", (rootUuid, parentStepUuid, attachmentName, attachmentContentOrPath, options) => {
      var _options$fileExtensio;
      var parent = _classPrivateFieldGet(_findParent, this).call(this, rootUuid, parentStepUuid);
      if (!parent) {
        // eslint-disable-next-line no-console
        console.error("could not write test attachment: no context for root ".concat(rootUuid, " and parentStepUuid ").concat(JSON.stringify(parentStepUuid), " is found"));
        return;
      }
      var isPath = typeof attachmentContentOrPath === "string";
      var attachmentFileName = _classPrivateFieldGet(_writeAttachmentFile, this).call(this, attachmentContentOrPath, _objectSpread(_objectSpread({}, options), {}, {
        fileExtension: (_options$fileExtensio = options.fileExtension) !== null && _options$fileExtensio !== void 0 ? _options$fileExtensio : isPath ? (0, _path.extname)(attachmentContentOrPath) : undefined
      }));
      var attachment = _classPrivateFieldGet(_createAttachment, this).call(this, attachmentName, options.contentType, attachmentFileName);
      if (options.wrapInStep) {
        var {
          timestamp = Date.now()
        } = options;
        parent.steps.push({
          name: attachmentName,
          attachments: [attachment],
          start: timestamp,
          stop: timestamp
        });
      } else {
        parent.attachments.push(attachment);
      }
    });
    _defineProperty(this, "writeEnvironmentInfo", () => {
      if (!this.environmentInfo) {
        return;
      }
      this.writer.writeEnvironmentInfo(this.environmentInfo);
    });
    _defineProperty(this, "writeCategoriesDefinitions", () => {
      if (!this.categories) {
        return;
      }
      var serializedCategories = this.categories.map(c => {
        if (c.messageRegex instanceof RegExp) {
          c.messageRegex = c.messageRegex.source;
        }
        if (c.traceRegex instanceof RegExp) {
          c.traceRegex = c.traceRegex.source;
        }
        return c;
      });
      this.writer.writeCategoriesDefinitions(serializedCategories);
    });
    _defineProperty(this, "applyRuntimeMessages", (rootUuid, messages) => {
      messages.forEach(message => {
        switch (message.type) {
          case "metadata":
            _classPrivateFieldGet(_handleMetadataMessage, this).call(this, rootUuid, message.data);
            return;
          case "step_metadata":
            _classPrivateFieldGet(_handleStepMetadataMessage, this).call(this, rootUuid, message.data);
            return;
          case "step_start":
            _classPrivateFieldGet(_handleStartStepMessage, this).call(this, rootUuid, message.data);
            return;
          case "step_stop":
            _classPrivateFieldGet(_handleStopStepMessage, this).call(this, rootUuid, message.data);
            return;
          case "attachment_content":
            _classPrivateFieldGet(_handleAttachmentContentMessage, this).call(this, rootUuid, message.data);
            return;
          case "attachment_path":
            _classPrivateFieldGet(_handleAttachmentPathMessage, this).call(this, rootUuid, message.data);
            return;
          case "global_attachment_content":
            _classPrivateFieldGet(_handleGlobalAttachmentContentMessage, this).call(this, message.data);
            return;
          case "global_attachment_path":
            _classPrivateFieldGet(_handleGlobalAttachmentPathMessage, this).call(this, message.data);
            return;
          case "global_error":
            _classPrivateFieldGet(_handleGlobalErrorMessage, this).call(this, message.data);
            return;
          default:
            // eslint-disable-next-line no-console
            console.error("could not apply runtime messages: unknown message ".concat(JSON.stringify(message)));
            return;
        }
      });
    });
    _defineProperty(this, "applyGlobalRuntimeMessages", messages => {
      messages.forEach(message => {
        switch (message.type) {
          case "global_attachment_content":
            _classPrivateFieldGet(_handleGlobalAttachmentContentMessage, this).call(this, message.data);
            break;
          case "global_attachment_path":
            _classPrivateFieldGet(_handleGlobalAttachmentPathMessage, this).call(this, message.data);
            break;
          case "global_error":
            _classPrivateFieldGet(_handleGlobalErrorMessage, this).call(this, message.data);
            break;
          default:
            break;
        }
      });
    });
    _classPrivateFieldInitSpec(this, _handleMetadataMessage, (rootUuid, message) => {
      // only display name could be set to fixture.
      var fixtureResult = this.state.getWrappedFixtureResult(rootUuid);
      var {
        links,
        labels,
        parameters,
        displayName,
        testCaseId,
        historyId,
        description,
        descriptionHtml
      } = message;
      if (fixtureResult) {
        if (displayName) {
          this.updateFixture(rootUuid, result => {
            result.name = displayName;
          });
        }
        if (historyId) {
          // eslint-disable-next-line no-console
          console.error("historyId can't be changed within test fixtures");
        }
        if (testCaseId) {
          // eslint-disable-next-line no-console
          console.error("testCaseId can't be changed within test fixtures");
        }
        if (links || labels || parameters || description || descriptionHtml) {
          // in some frameworks, afterEach methods can be executed before test stop event, while
          // in others after. To remove the possible undetermined behaviour we only allow
          // using runtime metadata API in before hooks.
          if (fixtureResult.type === "after") {
            // eslint-disable-next-line no-console
            console.error("metadata messages isn't supported for after test fixtures");
            return;
          }
          this.updateScope(fixtureResult.scopeUuid, scope => {
            if (links) {
              scope.links = [...scope.links, ...(this.linkConfig ? (0, _utils.formatLinks)(this.linkConfig, links) : links)];
            }
            if (labels) {
              scope.labels = [...scope.labels, ...labels];
            }
            if (parameters) {
              scope.parameters = [...scope.parameters, ...parameters];
            }
            if (description) {
              scope.description = description;
            }
            if (descriptionHtml) {
              scope.descriptionHtml = descriptionHtml;
            }
          });
        }
        return;
      }
      this.updateTest(rootUuid, result => {
        if (links) {
          result.links = [...result.links, ...(this.linkConfig ? (0, _utils.formatLinks)(this.linkConfig, links) : links)];
        }
        if (labels) {
          result.labels = [...result.labels, ...labels];
        }
        if (parameters) {
          result.parameters = [...result.parameters, ...parameters];
        }
        if (displayName) {
          result.name = displayName;
        }
        if (testCaseId) {
          result.testCaseId = testCaseId;
        }
        if (historyId) {
          result.historyId = historyId;
        }
        if (description) {
          result.description = description;
        }
        if (descriptionHtml) {
          result.descriptionHtml = descriptionHtml;
        }
      });
    });
    _classPrivateFieldInitSpec(this, _handleStepMetadataMessage, (rootUuid, message) => {
      var stepUuid = this.currentStep(rootUuid);
      if (!stepUuid) {
        // eslint-disable-next-line no-console
        console.error("could not handle step metadata message: no step is running");
        return;
      }
      var {
        name,
        parameters
      } = message;
      this.updateStep(stepUuid, stepResult => {
        if (name) {
          stepResult.name = name;
        }
        if (parameters) {
          stepResult.parameters = [...stepResult.parameters, ...parameters];
        }
      });
    });
    _classPrivateFieldInitSpec(this, _handleStartStepMessage, (rootUuid, message) => {
      this.startStep(rootUuid, undefined, _objectSpread({}, message));
    });
    _classPrivateFieldInitSpec(this, _handleStopStepMessage, (rootUuid, message) => {
      var stepUuid = this.currentStep(rootUuid);
      if (!stepUuid) {
        // eslint-disable-next-line no-console
        console.error("could not handle step stop message: no step is running");
        return;
      }
      this.updateStep(stepUuid, result => {
        if (message.status && !result.status) {
          result.status = message.status;
        }
        if (message.statusDetails) {
          result.statusDetails = _objectSpread(_objectSpread({}, result.statusDetails), message.statusDetails);
        }
      });
      this.stopStep(stepUuid, {
        stop: message.stop
      });
    });
    _classPrivateFieldInitSpec(this, _handleAttachmentContentMessage, (rootUuid, message) => {
      this.writeAttachment(rootUuid, undefined, message.name, Buffer.from(message.content, message.encoding), {
        encoding: message.encoding,
        contentType: message.contentType,
        fileExtension: message.fileExtension,
        wrapInStep: message.wrapInStep,
        timestamp: message.timestamp
      });
    });
    _classPrivateFieldInitSpec(this, _handleAttachmentPathMessage, (rootUuid, message) => {
      this.writeAttachment(rootUuid, undefined, message.name, message.path, {
        contentType: message.contentType,
        fileExtension: message.fileExtension,
        wrapInStep: message.wrapInStep,
        timestamp: message.timestamp
      });
    });
    _classPrivateFieldInitSpec(this, _handleGlobalAttachmentContentMessage, message => {
      var attachmentContent = Buffer.from(message.content, message.encoding);
      var attachmentSource = _classPrivateFieldGet(_writeAttachmentFile, this).call(this, attachmentContent, {
        contentType: message.contentType,
        fileExtension: message.fileExtension
      });
      _classPrivateFieldGet(_writeGlobals, this).call(this, {
        attachments: [_classPrivateFieldGet(_createGlobalAttachment, this).call(this, message.name, message.contentType, attachmentSource)],
        errors: []
      });
    });
    _classPrivateFieldInitSpec(this, _handleGlobalAttachmentPathMessage, message => {
      var _message$fileExtensio;
      var attachmentSource = _classPrivateFieldGet(_writeAttachmentFile, this).call(this, message.path, {
        contentType: message.contentType,
        fileExtension: (_message$fileExtensio = message.fileExtension) !== null && _message$fileExtensio !== void 0 ? _message$fileExtensio : (0, _path.extname)(message.path)
      });
      _classPrivateFieldGet(_writeGlobals, this).call(this, {
        attachments: [_classPrivateFieldGet(_createGlobalAttachment, this).call(this, message.name, message.contentType, attachmentSource)],
        errors: []
      });
    });
    _classPrivateFieldInitSpec(this, _handleGlobalErrorMessage, message => {
      _classPrivateFieldGet(_writeGlobals, this).call(this, {
        attachments: [],
        errors: [_objectSpread(_objectSpread({}, message), {}, {
          timestamp: Date.now()
        })]
      });
    });
    _classPrivateFieldInitSpec(this, _findParent, (rootUuid, parentStepUuid) => {
      var root = this.state.getExecutionItem(rootUuid);
      if (!root) {
        return;
      }
      if (parentStepUuid === null) {
        return root;
      } else if (parentStepUuid === undefined) {
        var _stepUuid = this.currentStep(rootUuid);
        return _stepUuid ? this.state.getStepResult(_stepUuid) : root;
      } else {
        return this.state.getStepResult(parentStepUuid);
      }
    });
    _classPrivateFieldInitSpec(this, _writeAttachmentFile, (attachmentContentOrPath, options) => {
      var isPath = typeof attachmentContentOrPath === "string";
      var attachmentFileName = (0, _attachments.buildAttachmentFileName)({
        contentType: options.contentType,
        fileExtension: options.fileExtension
      });
      if (isPath) {
        this.writer.writeAttachmentFromPath(attachmentFileName, attachmentContentOrPath);
      } else {
        this.writer.writeAttachment(attachmentFileName, attachmentContentOrPath);
      }
      return attachmentFileName;
    });
    _classPrivateFieldInitSpec(this, _createAttachment, (name, contentType, source) => ({
      name,
      source,
      type: contentType
    }));
    _classPrivateFieldInitSpec(this, _createGlobalAttachment, (name, contentType, source) => _objectSpread(_objectSpread({}, _classPrivateFieldGet(_createAttachment, this).call(this, name, contentType, source)), {}, {
      timestamp: Date.now()
    }));
    _classPrivateFieldInitSpec(this, _writeGlobals, globals => {
      this.writer.writeGlobals("".concat((0, _utils.randomUuid)(), "-globals.json"), globals);
    });
    _classPrivateFieldInitSpec(this, _writeFixturesOfScope, _ref2 => {
      var {
        fixtures,
        tests
      } = _ref2;
      var writtenFixtures = new Set();
      if (tests.length) {
        for (var wrappedFixture of fixtures) {
          if (!writtenFixtures.has(wrappedFixture.uuid)) {
            _classPrivateFieldGet(_writeContainer, this).call(this, tests, wrappedFixture);
            this.state.deleteFixtureResult(wrappedFixture.uuid);
            writtenFixtures.add(wrappedFixture.uuid);
          }
        }
      }
    });
    _classPrivateFieldInitSpec(this, _writeContainer, (tests, wrappedFixture) => {
      var fixture = wrappedFixture.value;
      var befores = wrappedFixture.type === "before" ? [wrappedFixture.value] : [];
      var afters = wrappedFixture.type === "after" ? [wrappedFixture.value] : [];
      this.writer.writeGroup({
        uuid: wrappedFixture.uuid,
        name: fixture.name,
        children: [...new Set(tests)],
        befores,
        afters
      });
    });
    _classPrivateFieldInitSpec(this, _calculateTimings, (start, stop, duration) => {
      var result = {
        start,
        stop
      };
      if (duration) {
        var normalisedDuration = Math.max(0, duration);
        if (result.stop !== undefined) {
          result.start = result.stop - normalisedDuration;
        } else if (result.start !== undefined) {
          result.stop = result.start + normalisedDuration;
        } else {
          result.stop = Date.now();
          result.start = result.stop - normalisedDuration;
        }
      } else {
        if (result.stop === undefined) {
          result.stop = Date.now();
        }
        if (result.start === undefined) {
          result.start = result.stop;
        }
      }
      return {
        start: result.start ? Math.round(result.start) : undefined,
        stop: result.stop ? Math.round(result.stop) : undefined
      };
    });
    this.writer = (0, _loader.resolveWriter)(writer);
    this.notifier = new _Notifier.Notifier({
      listeners
    });
    this.categories = categories;
    this.environmentInfo = environmentInfo;
    this.linkConfig = _links;
    if (Array.isArray(globalLabels)) {
      this.globalLabels = globalLabels;
    } else if (Object.keys(globalLabels).length) {
      this.globalLabels = Object.entries(globalLabels).flatMap(_ref3 => {
        var [name, value] = _ref3;
        if (Array.isArray(value)) {
          return value.map(v => ({
            name,
            value: v
          }));
        }
        return {
          name,
          value
        };
      });
    }
  }
}
exports.ReporterRuntime = ReporterRuntime;
//# sourceMappingURL=ReporterRuntime.js.map