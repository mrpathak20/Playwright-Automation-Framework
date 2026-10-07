"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveWriter = void 0;
var _FileSystemWriter = require("./FileSystemWriter.js");
var _InMemoryWriter = require("./InMemoryWriter.js");
var _MessageWriter = require("./MessageWriter.js");
var wellKnownWriters = {
  InMemoryWriter: _InMemoryWriter.InMemoryWriter,
  FileSystemWriter: _FileSystemWriter.FileSystemWriter,
  MessageWriter: _MessageWriter.MessageWriter
};
var resolveWriter = value => {
  if (typeof value === "string") {
    return createWriter(value);
  } else if (value instanceof Array) {
    return createWriter(value[0], value.slice(1));
  }
  return value;
};
exports.resolveWriter = resolveWriter;
var createWriter = function createWriter(nameOrPath) {
  var _getKnownWriterCtor;
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
  var ctorOrInstance = (_getKnownWriterCtor = getKnownWriterCtor(nameOrPath)) !== null && _getKnownWriterCtor !== void 0 ? _getKnownWriterCtor : requireWriterCtor(nameOrPath);
  return typeof ctorOrInstance === "function" ? new ctorOrInstance(...args) : ctorOrInstance;
};
var getKnownWriterCtor = name => wellKnownWriters[name];
var requireWriterCtor = modulePath => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires
  return require(modulePath);
};
//# sourceMappingURL=loader.js.map