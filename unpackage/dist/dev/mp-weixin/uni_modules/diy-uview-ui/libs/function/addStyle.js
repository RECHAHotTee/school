"use strict";
const uni_modules_diyUviewUi_libs_function_test = require("./test.js");
const uni_modules_diyUviewUi_libs_function_trim = require("./trim.js");
function addStyle(customStyle, target = "object") {
  if (uni_modules_diyUviewUi_libs_function_test.test.empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
    return customStyle;
  }
  if (target === "object") {
    customStyle = uni_modules_diyUviewUi_libs_function_trim.trim(customStyle);
    const styleArray = customStyle.split(";");
    const style = {};
    for (let i = 0; i < styleArray.length; i++) {
      if (styleArray[i]) {
        const item = styleArray[i].split(":");
        style[uni_modules_diyUviewUi_libs_function_trim.trim(item[0])] = uni_modules_diyUviewUi_libs_function_trim.trim(item[1]);
      }
    }
    return style;
  }
  let string = "";
  for (const i in customStyle) {
    const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
    string += `${key}:${customStyle[i]};`;
  }
  return uni_modules_diyUviewUi_libs_function_trim.trim(string);
}
exports.addStyle = addStyle;
