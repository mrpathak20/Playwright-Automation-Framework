function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
export class Notifier {
  constructor(_ref) {
    var {
      listeners
    } = _ref;
    _defineProperty(this, "listeners", void 0);
    _defineProperty(this, "callListeners", (listenerName, result) => {
      for (var listener of this.listeners) {
        try {
          var _listener$listenerNam;
          // @ts-ignore
          listener === null || listener === void 0 || (_listener$listenerNam = listener[listenerName]) === null || _listener$listenerNam === void 0 || _listener$listenerNam.call(listener, result);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("".concat(listenerName, " listener handler can't be executed due an error: "), err);
        }
      }
    });
    _defineProperty(this, "beforeTestResultStart", result => {
      this.callListeners("beforeTestResultStart", result);
    });
    _defineProperty(this, "afterTestResultStart", result => {
      this.callListeners("afterTestResultStart", result);
    });
    _defineProperty(this, "beforeTestResultStop", result => {
      this.callListeners("beforeTestResultStop", result);
    });
    _defineProperty(this, "afterTestResultStop", result => {
      this.callListeners("afterTestResultStop", result);
    });
    _defineProperty(this, "beforeTestResultUpdate", result => {
      this.callListeners("beforeTestResultUpdate", result);
    });
    _defineProperty(this, "afterTestResultUpdate", result => {
      this.callListeners("afterTestResultUpdate", result);
    });
    _defineProperty(this, "beforeTestResultWrite", result => {
      this.callListeners("beforeTestResultWrite", result);
    });
    _defineProperty(this, "afterTestResultWrite", result => {
      this.callListeners("afterTestResultWrite", result);
    });
    _defineProperty(this, "beforeStepStop", result => {
      this.callListeners("beforeStepStop", result);
    });
    _defineProperty(this, "afterStepStop", result => {
      this.callListeners("afterStepStop", result);
    });
    this.listeners = [...listeners];
  }
}
//# sourceMappingURL=Notifier.js.map