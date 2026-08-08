"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTestResultContainer = exports.createTestResult = exports.createStepResult = exports.createFixtureResult = void 0;
var _model = require("../../model.js");
var createTestResultContainer = uuid => {
  return {
    uuid,
    children: [],
    befores: [],
    afters: []
  };
};
exports.createTestResultContainer = createTestResultContainer;
var createFixtureResult = () => {
  return {
    status: _model.Status.BROKEN,
    statusDetails: {},
    stage: _model.Stage.PENDING,
    steps: [],
    attachments: [],
    parameters: []
  };
};
exports.createFixtureResult = createFixtureResult;
var createStepResult = () => {
  return {
    status: undefined,
    statusDetails: {},
    stage: _model.Stage.PENDING,
    steps: [],
    attachments: [],
    parameters: []
  };
};
exports.createStepResult = createStepResult;
var createTestResult = (uuid, historyUuid) => {
  return {
    uuid,
    name: "",
    historyId: historyUuid,
    status: undefined,
    statusDetails: {},
    stage: _model.Stage.PENDING,
    steps: [],
    attachments: [],
    parameters: [],
    labels: [],
    links: []
  };
};
exports.createTestResult = createTestResult;
//# sourceMappingURL=factory.js.map