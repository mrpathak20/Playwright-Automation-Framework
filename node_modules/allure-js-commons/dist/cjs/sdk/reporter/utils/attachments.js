"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeToExtension = exports.buildAttachmentFileName = void 0;
var _utils = require("../utils.js");
var _extensions = require("./extensions.js");
var typeToExtension = options => {
  if (options.fileExtension) {
    return options.fileExtension.startsWith(".") ? options.fileExtension : ".".concat(options.fileExtension);
  }
  return _extensions.EXTENSIONS_BY_TYPE[options.contentType] || "";
};
exports.typeToExtension = typeToExtension;
var buildAttachmentFileName = options => {
  var attachmentUuid = (0, _utils.randomUuid)();
  var attachmentExtension = typeToExtension({
    fileExtension: options.fileExtension,
    contentType: options.contentType
  });
  return "".concat(attachmentUuid, "-attachment").concat(attachmentExtension);
};
exports.buildAttachmentFileName = buildAttachmentFileName;
//# sourceMappingURL=attachments.js.map