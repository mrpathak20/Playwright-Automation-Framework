import { escapeRegExp, parseTestPlan } from "allure-js-commons/sdk/reporter";
export var testPlanFilter = function testPlanFilter() {
  var testPlan = parseTestPlan();
  if (!testPlan) {
    return undefined;
  }
  return testPlan.tests.flatMap(function (testInfo) {
    return testInfo.selector ? [testInfo.selector] : [];
  }).map(function (selector) {
    var pattern = selector.replace("#", " ");
    return new RegExp("\\s".concat(escapeRegExp(pattern), "$"));
  });
};
//# sourceMappingURL=testplan.js.map