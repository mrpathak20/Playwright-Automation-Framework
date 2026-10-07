import { FileSystemWriter } from "./FileSystemWriter.js";
import { InMemoryWriter } from "./InMemoryWriter.js";
import { MessageWriter } from "./MessageWriter.js";
var wellKnownWriters = {
  InMemoryWriter: InMemoryWriter,
  FileSystemWriter: FileSystemWriter,
  MessageWriter: MessageWriter
};
export var resolveWriter = value => {
  if (typeof value === "string") {
    return createWriter(value);
  } else if (value instanceof Array) {
    return createWriter(value[0], value.slice(1));
  }
  return value;
};
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