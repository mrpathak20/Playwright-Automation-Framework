"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageWriter = void 0;
var _fs = require("fs");
var _process = _interopRequireDefault(require("process"));
var _envInfo = require("../utils/envInfo.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MessageWriter {
  constructor(bus) {
    this.bus = bus;
  }
  sendData(path, type, data) {
    var _process$send;
    var event = {
      path,
      type,
      data: data.toString("base64")
    };
    if (this.bus) {
      this.bus.emit("allureWriterMessage", JSON.stringify(event));
      return;
    }
    (_process$send = _process.default.send) === null || _process$send === void 0 || _process$send.call(_process.default, JSON.stringify(event));
  }
  writeJson(path, type, data) {
    this.sendData(path, type, Buffer.from(JSON.stringify(data), "utf-8"));
  }
  writeAttachment(distFileName, content) {
    this.sendData(distFileName, "attachment", content);
  }
  writeAttachmentFromPath(distFileName, from) {
    this.sendData(distFileName, "attachment", (0, _fs.readFileSync)(from));
  }
  writeEnvironmentInfo(info) {
    var text = (0, _envInfo.stringifyEnvInfo)(info);
    this.sendData("environment.properties", "misc", Buffer.from(text, "utf-8"));
  }
  writeCategoriesDefinitions(categories) {
    this.writeJson("categories.json", "misc", categories);
  }
  writeGroup(result) {
    this.writeJson("".concat(result.uuid, "-container.json"), "container", result);
  }
  writeResult(result) {
    this.writeJson("".concat(result.uuid, "-result.json"), "result", result);
  }
  writeGlobals(distFileName, info) {
    this.writeJson(distFileName, "globals", info);
  }
}
exports.MessageWriter = MessageWriter;
//# sourceMappingURL=MessageWriter.js.map