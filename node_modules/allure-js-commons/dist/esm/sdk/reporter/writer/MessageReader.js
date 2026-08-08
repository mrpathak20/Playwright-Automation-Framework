function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { attachment, step } from "../../../facade.js";
import { parseEnvInfo, stringifyEnvInfo } from "../utils/envInfo.js";
var parseJsonResult = data => {
  return JSON.parse(Buffer.from(data, "base64").toString("utf-8"));
};
export class MessageReader {
  constructor() {
    var _this = this;
    _defineProperty(this, "results", {
      tests: [],
      groups: [],
      attachments: {},
      globals: {}
    });
    _defineProperty(this, "handleMessage", jsonMessage => {
      var _this$results$globals;
      var {
        path,
        type = "undefined",
        data
      } = JSON.parse(jsonMessage);
      switch (type) {
        case "container":
          this.results.groups.push(parseJsonResult(data));
          return;
        case "result":
          this.results.tests.push(parseJsonResult(data));
          return;
        case "attachment":
          this.results.attachments[path] = data;
          return;
        case "globals":
          this.results.globals = (_this$results$globals = this.results.globals) !== null && _this$results$globals !== void 0 ? _this$results$globals : {};
          this.results.globals[path] = parseJsonResult(data);
          return;
        case "misc":
          switch (path) {
            case "environment.properties":
              this.results.envInfo = parseEnvInfo(Buffer.from(data, "base64").toString());
              break;
            case "categories.json":
              this.results.categories = parseJsonResult(data);
              break;
            default:
              break;
          }
          return;
        default:
          this.handleCustomMessage(type, data, path);
          return;
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _defineProperty(this, "handleCustomMessage", (type, data, path) => {});
    _defineProperty(this, "attachResults", /*#__PURE__*/_asyncToGenerator(function* () {
      yield step("allure-results", /*#__PURE__*/_asyncToGenerator(function* () {
        if (_this.results.categories) {
          yield attachment("categories.json", JSON.stringify(_this.results.categories), "application/json");
        }
        if (_this.results.envInfo) {
          yield attachment("environment.properties", stringifyEnvInfo(_this.results.envInfo), "text/plain");
        }
        if (_this.results.attachments) {
          for (var key of Object.keys(_this.results.attachments)) {
            var content = _this.results.attachments[key];
            yield attachment(key, content, {
              contentType: "text/plain",
              encoding: "base64"
            });
          }
        }
        if (_this.results.tests) {
          for (var tr of _this.results.tests) {
            yield attachment("".concat(tr.uuid, "-result.json"), JSON.stringify(tr, null, 2), {
              contentType: "application/json",
              encoding: "utf-8"
            });
          }
        }
        if (_this.results.groups) {
          for (var trc of _this.results.groups) {
            yield attachment("".concat(trc.uuid, "-container.json"), JSON.stringify(trc, null, 2), {
              contentType: "application/json",
              encoding: "utf-8"
            });
          }
        }
        if (_this.results.globals) {
          for (var _key of Object.keys(_this.results.globals)) {
            yield attachment(_key, JSON.stringify(_this.results.globals[_key], null, 2), {
              contentType: "application/json",
              encoding: "utf-8"
            });
          }
        }
      }));
    }));
  }
}
//# sourceMappingURL=MessageReader.js.map