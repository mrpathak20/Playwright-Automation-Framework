import { Status } from "allure-js-commons";
export var ALLURE_STEP_STATUS_ANNOTATION = "allure-js-commons:status";
export var isAllureStepStatus = function isAllureStepStatus(value) {
  return typeof value === "string" && Object.values(Status).includes(value);
};
//# sourceMappingURL=syncAnnotations.js.map