"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileSystemWriter = void 0;
var _nodeFs = require("node:fs");
var _nodePath = require("node:path");
var _envInfo = require("../utils/envInfo.js");
var writeJson = (path, data) => {
  (0, _nodeFs.writeFileSync)(path, JSON.stringify(data), "utf-8");
};
class FileSystemWriter {
  constructor(config) {
    this.config = config;
  }
  writeAttachment(distFileName, content) {
    var path = this.buildPath(distFileName);
    (0, _nodeFs.writeFileSync)(path, content, "utf-8");
  }
  writeAttachmentFromPath(distFileName, from) {
    var to = this.buildPath(distFileName);
    (0, _nodeFs.copyFileSync)(from, to);
  }
  writeEnvironmentInfo(info) {
    var text = (0, _envInfo.stringifyEnvInfo)(info);
    var path = this.buildPath("environment.properties");
    (0, _nodeFs.writeFileSync)(path, text);
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
    (0, _nodeFs.mkdirSync)(this.config.resultsDir, {
      recursive: true
    });
    return (0, _nodePath.join)(this.config.resultsDir, name);
  }
}
exports.FileSystemWriter = FileSystemWriter;
//# sourceMappingURL=FileSystemWriter.js.map