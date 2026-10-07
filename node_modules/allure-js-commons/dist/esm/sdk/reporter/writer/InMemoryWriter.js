function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { readFileSync } from "fs";
export class InMemoryWriter {
  constructor() {
    _defineProperty(this, "groups", []);
    _defineProperty(this, "tests", []);
    _defineProperty(this, "attachments", {});
    _defineProperty(this, "categories", void 0);
    _defineProperty(this, "envInfo", void 0);
    _defineProperty(this, "globals", void 0);
  }
  writeGroup(result) {
    this.groups.push(result);
  }
  writeResult(result) {
    this.tests.push(result);
  }
  writeAttachment(distFileName, content) {
    this.attachments[distFileName] = content;
  }
  writeAttachmentFromPath(distFileName, from) {
    this.attachments[distFileName] = readFileSync(from);
  }
  writeCategoriesDefinitions(categories) {
    this.categories = categories;
  }
  writeEnvironmentInfo(envInfo) {
    this.envInfo = envInfo;
  }
  writeGlobals(distFileName, info) {
    var _this$globals;
    this.globals = (_this$globals = this.globals) !== null && _this$globals !== void 0 ? _this$globals : {};
    this.globals[distFileName] = info;
  }
}
//# sourceMappingURL=InMemoryWriter.js.map