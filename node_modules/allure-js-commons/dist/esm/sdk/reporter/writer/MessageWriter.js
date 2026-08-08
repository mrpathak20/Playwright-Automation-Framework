import { readFileSync } from "fs";
import process from "process";
import { stringifyEnvInfo } from "../utils/envInfo.js";
export class MessageWriter {
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
    (_process$send = process.send) === null || _process$send === void 0 || _process$send.call(process, JSON.stringify(event));
  }
  writeJson(path, type, data) {
    this.sendData(path, type, Buffer.from(JSON.stringify(data), "utf-8"));
  }
  writeAttachment(distFileName, content) {
    this.sendData(distFileName, "attachment", content);
  }
  writeAttachmentFromPath(distFileName, from) {
    this.sendData(distFileName, "attachment", readFileSync(from));
  }
  writeEnvironmentInfo(info) {
    var text = stringifyEnvInfo(info);
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
//# sourceMappingURL=MessageWriter.js.map