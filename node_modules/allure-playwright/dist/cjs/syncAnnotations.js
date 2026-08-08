"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAllureStepStatus = exports.ALLURE_STEP_STATUS_ANNOTATION = void 0;
var _allureJsCommons = require("allure-js-commons");
var ALLURE_STEP_STATUS_ANNOTATION = exports.ALLURE_STEP_STATUS_ANNOTATION = "allure-js-commons:status";
var isAllureStepStatus = exports.isAllureStepStatus = function isAllureStepStatus(value) {
  return typeof value === "string" && Object.values(_allureJsCommons.Status).includes(value);
};
//# sourceMappingURL=syncAnnotations.js.map