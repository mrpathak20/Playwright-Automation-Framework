import { platform } from "node:process";

/**
 * The implementation is based on https://github.com/gagle/node-properties.
 */

var EOL = platform === "win32" ? "\r\n" : "\n";
export var stringifyEnvInfo = envInfo => {
  var lines = [];
  for (var [key, value] of Object.entries(envInfo)) {
    if (value !== null && value !== undefined) {
      var escapedKey = escapeKey(key);
      var escapedValue = escapeValue(value !== null && value !== void 0 ? value : "");
      lines.push("".concat(escapedKey, "=").concat(escapedValue));
    }
  }
  return lines.join(EOL);
};
export var parseEnvInfo = input => {
  if (!input) {
    return {};
  }
  var envInfo = {};
  var escape = false;
  var skipSpace = true;
  var isCommentLine = false;
  var newLine = true;
  var multiLine = false;
  var isKey = true;
  var key = "";
  var value = "";
  var unicode;
  var unicodeRemaining = 0;
  var escapingUnicode = false;
  var keySpace = false;
  var sep = false;
  var line = () => {
    if (key || value || sep) {
      envInfo[key] = value;
      key = "";
      value = "";
      sep = false;
    }
  };
  var decodeString = (output, char) => {
    if (escapingUnicode && unicodeRemaining) {
      // eslint-disable-next-line no-bitwise
      unicode = (unicode << 4) + hex(char);
      if (--unicodeRemaining) {
        return output;
      }
      escape = false;
      escapingUnicode = false;
      return output + String.fromCharCode(unicode);
    }
    if (char === "u") {
      unicode = 0;
      escapingUnicode = true;
      unicodeRemaining = 4;
      return output;
    }
    escape = false;
    switch (char) {
      case "t":
        return "".concat(output, "\t");
      case "r":
        return "".concat(output, "\r");
      case "n":
        return "".concat(output, "\n");
      case "f":
        return "".concat(output, "\f");
    }
    return output + char;
  };
  for (var char of input) {
    if (char === "\r") {
      continue;
    }
    if (isCommentLine) {
      if (char === "\n") {
        isCommentLine = false;
        newLine = true;
        skipSpace = true;
      }
      continue;
    }
    if (skipSpace) {
      if (isWhitespace(char)) {
        continue;
      }
      if (!multiLine && char === "\n") {
        isKey = true;
        keySpace = false;
        newLine = true;
        line();
        continue;
      }
      skipSpace = false;
      multiLine = false;
    }
    if (newLine) {
      newLine = false;
      if (isComment(char)) {
        isCommentLine = true;
        continue;
      }
    }
    if (char !== "\n") {
      if (!escape && isKey && isSeparator(char)) {
        sep = true;
        isKey = false;
        keySpace = false;
        skipSpace = true;
        continue;
      }
      if (char === "\\") {
        if (escape) {
          if (escapingUnicode) {
            continue;
          }
          if (keySpace) {
            keySpace = false;
            isKey = false;
          }
          if (isKey) {
            key += "\\";
          } else {
            value += "\\";
          }
        }
        escape = !escape;
      } else {
        if (keySpace) {
          keySpace = false;
          isKey = false;
        }
        if (isKey) {
          if (escape) {
            key = decodeString(key, char);
          } else {
            if (isWhitespace(char)) {
              keySpace = true;
              skipSpace = true;
              continue;
            }
            key += char;
          }
        } else {
          if (escape) {
            value = decodeString(value, char);
          } else {
            value += char;
          }
        }
      }
    } else {
      if (escape) {
        if (!escapingUnicode) {
          escape = false;
        }
        skipSpace = true;
        multiLine = true;
      } else {
        newLine = true;
        skipSpace = true;
        isKey = true;
        line();
      }
    }
  }
  line();
  return envInfo;
};
var hex = char => {
  switch (char) {
    case "0":
      return 0;
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    case "a":
    case "A":
      return 10;
    case "b":
    case "B":
      return 11;
    case "c":
    case "C":
      return 12;
    case "d":
    case "D":
      return 13;
    case "e":
    case "E":
      return 14;
    case "f":
    case "F":
      return 15;
  }
  throw new Error("Non-hex char ".concat(char));
};
var escapeKey = key => {
  return mapcatChars(key, (char, code) => {
    if (isSeparator(char)) {
      return "\\".concat(char);
    }
    return escapeCharacter(char, code, true);
  });
};
var escapeValue = value => {
  var escapeWhitespace = true;
  return mapcatChars(value, (char, code) => {
    if (!isWhitespace(char)) {
      escapeWhitespace = false;
    }
    return escapeCharacter(char, code, escapeWhitespace);
  });
};
var mapcatChars = (value, fn) => {
  var result = "";
  for (var i = 0; i < value.length; i++) {
    var char = value[i];
    var code = value.charCodeAt(i);
    result += fn(char, code);
  }
  return result;
};
var escapeCharacter = (char, code, escapeWhitespace) => {
  if (isAsciiPrintable(code)) {
    if (char === " " && escapeWhitespace) {
      return "\\ ";
    } else if (char === "\\") {
      return "\\\\";
    } else {
      return char;
    }
  } else if (char === "\t") {
    return "\\t";
  } else if (char === "\n") {
    return "\\n";
  } else if (char === "\f") {
    return "\\f";
  } else if (char === "\r") {
    return "\\r";
  } else if (code < 160 || code >= 256) {
    // Control sets 0 and 1 or non-ASCII characters
    return escapeUnicode(code);
  } else {
    return char;
  }
};
var isWhitespace = char => {
  switch (char) {
    case "\t":
    case "\f":
    case " ":
      return true;
  }
  return false;
};
var isAsciiPrintable = code => code > 31 && code < 127;
var escapeUnicode = code => {
  var unicode = code.toString(16);
  var prefix = "0".repeat(4 - unicode.length);
  return "\\u".concat(prefix).concat(unicode);
};
var isSeparator = char => {
  switch (char) {
    case "=":
    case ":":
      return true;
  }
  return false;
};
var isComment = char => {
  switch (char) {
    case "#":
    case "!":
      return true;
  }
  return false;
};
//# sourceMappingURL=envInfo.js.map