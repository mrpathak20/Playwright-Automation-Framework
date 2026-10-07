"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageHolderTestRuntime = void 0;
var _MessageTestRuntime = require("./MessageTestRuntime.js");
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class MessageHolderTestRuntime extends _MessageTestRuntime.MessageTestRuntime {
  constructor() {
    super(...arguments);
    _defineProperty(this, "messagesHolder", []);
  }
  sendMessage(message) {
    var _this = this;
    return _asyncToGenerator(function* () {
      _this.messagesHolder.push(message);
      return Promise.resolve();
    })();
  }
  sendMessageSync(message) {
    this.messagesHolder.push(message);
  }
  messages() {
    return [...this.messagesHolder];
  }
}
exports.MessageHolderTestRuntime = MessageHolderTestRuntime;
//# sourceMappingURL=MessageHolderTestRuntime.js.map