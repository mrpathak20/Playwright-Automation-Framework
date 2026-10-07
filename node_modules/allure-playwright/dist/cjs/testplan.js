"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testPlanFilter = void 0;
var _reporter = require("allure-js-commons/sdk/reporter");
var testPlanFilter = exports.testPlanFilter = function testPlanFilter() {
  var testPlan = (0, _reporter.parseTestPlan)();
  if (!testPlan) {
    return undefined;
  }
  return testPlan.tests.flatMap(function (testInfo) {
    return testInfo.selector ? [testInfo.selector] : [];
  }).map(function (selector) {
    var pattern = selector.replace("#", " ");
    return new RegExp("\\s".concat((0, _reporter.escapeRegExp)(pattern), "$"));
  });
};
//# sourceMappingURL=testplan.js.map