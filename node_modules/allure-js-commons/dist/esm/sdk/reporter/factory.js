import { Stage, Status } from "../../model.js";
export var createTestResultContainer = uuid => {
  return {
    uuid,
    children: [],
    befores: [],
    afters: []
  };
};
export var createFixtureResult = () => {
  return {
    status: Status.BROKEN,
    statusDetails: {},
    stage: Stage.PENDING,
    steps: [],
    attachments: [],
    parameters: []
  };
};
export var createStepResult = () => {
  return {
    status: undefined,
    statusDetails: {},
    stage: Stage.PENDING,
    steps: [],
    attachments: [],
    parameters: []
  };
};
export var createTestResult = (uuid, historyUuid) => {
  return {
    uuid,
    name: "",
    historyId: historyUuid,
    status: undefined,
    statusDetails: {},
    stage: Stage.PENDING,
    steps: [],
    attachments: [],
    parameters: [],
    labels: [],
    links: []
  };
};
//# sourceMappingURL=factory.js.map