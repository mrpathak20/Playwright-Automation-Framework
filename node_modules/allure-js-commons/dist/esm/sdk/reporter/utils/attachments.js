import { randomUuid } from "../utils.js";
import { EXTENSIONS_BY_TYPE } from "./extensions.js";
export var typeToExtension = options => {
  if (options.fileExtension) {
    return options.fileExtension.startsWith(".") ? options.fileExtension : ".".concat(options.fileExtension);
  }
  return EXTENSIONS_BY_TYPE[options.contentType] || "";
};
export var buildAttachmentFileName = options => {
  var attachmentUuid = randomUuid();
  var attachmentExtension = typeToExtension({
    fileExtension: options.fileExtension,
    contentType: options.contentType
  });
  return "".concat(attachmentUuid, "-attachment").concat(attachmentExtension);
};
//# sourceMappingURL=attachments.js.map