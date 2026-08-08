import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { stringifyEnvInfo } from "../utils/envInfo.js";
var writeJson = (path, data) => {
  writeFileSync(path, JSON.stringify(data), "utf-8");
};
export class FileSystemWriter {
  constructor(config) {
    this.config = config;
  }
  writeAttachment(distFileName, content) {
    var path = this.buildPath(distFileName);
    writeFileSync(path, content, "utf-8");
  }
  writeAttachmentFromPath(distFileName, from) {
    var to = this.buildPath(distFileName);
    copyFileSync(from, to);
  }
  writeEnvironmentInfo(info) {
    var text = stringifyEnvInfo(info);
    var path = this.buildPath("environment.properties");
    writeFileSync(path, text);
  }
  writeCategoriesDefinitions(categories) {
    var path = this.buildPath("categories.json");
    writeJson(path, categories);
  }
  writeGroup(result) {
    var path = this.buildPath("".concat(result.uuid, "-container.json"));
    writeJson(path, result);
  }
  writeResult(result) {
    var path = this.buildPath("".concat(result.uuid, "-result.json"));
    writeJson(path, result);
  }
  writeGlobals(distFileName, info) {
    var path = this.buildPath(distFileName);
    writeJson(path, info);
  }
  buildPath(name) {
    mkdirSync(this.config.resultsDir, {
      recursive: true
    });
    return join(this.config.resultsDir, name);
  }
}
//# sourceMappingURL=FileSystemWriter.js.map