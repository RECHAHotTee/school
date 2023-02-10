"use strict";
const common_vendor = require("./vendor.js");
const siteinfo = require("../siteinfo.js");
class Tools {
  constructor() {
    Object.assign(this, {
      $$basePath: siteinfo.__config.basePath
    });
  }
  getFilenameExt(file) {
    const types = file.name.split(".");
    return types[types.length - 1];
  }
  getWeek(dateTime) {
    let temptTime = new Date(dateTime.getTime());
    let weekday = temptTime.getDay() || 7;
    temptTime.setDate(temptTime.getDate() - weekday + 1 + 5);
    let firstDay = new Date(temptTime.getFullYear(), 0, 1);
    let dayOfWeek = firstDay.getDay();
    let spendDay = 1;
    if (dayOfWeek != 0)
      spendDay = 7 - dayOfWeek + 1;
    firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay);
    let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 864e5);
    let result = Math.ceil(d / 7);
    return result;
  }
  formatDateTime(val, format = "YYYY-mm-dd HH:MM:SS") {
    if (this.isDate(val)) {
      return this.formatDate(val, format);
    } else if (!isNaN(val)) {
      if (String(val).length == 10) {
        val = val * 1e3;
      }
      let date = new Date(val);
      return this.formatDate(date, format);
    }
  }
  formatDate(date, format) {
    let we = date.getDay();
    let qut = Math.floor((date.getMonth() + 3) / 3).toString();
    const opt = {
      "Y+": date.getFullYear().toString(),
      "m+": (date.getMonth() + 1).toString(),
      "d+": date.getDate().toString(),
      "H+": date.getHours().toString(),
      "M+": date.getMinutes().toString(),
      "S+": date.getSeconds().toString(),
      "q+": qut
    };
    const week = {
      "0": "\u65E5",
      "1": "\u4E00",
      "2": "\u4E8C",
      "3": "\u4E09",
      "4": "\u56DB",
      "5": "\u4E94",
      "6": "\u516D"
    };
    const quarter = {
      "1": "\u4E00",
      "2": "\u4E8C",
      "3": "\u4E09",
      "4": "\u56DB"
    };
    if (/(W+)/.test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "\u661F\u671F" + week[we] : "\u5468" + week[we] : week[we]);
    if (/(Q+)/.test(format))
      format = format.replace(RegExp.$1, RegExp.$1.length == 4 ? "\u7B2C" + quarter[qut] + "\u5B63\u5EA6" : quarter[qut]);
    if (/(Z+)/.test(format)) {
      let z = this.getWeek(date);
      format = format.replace(RegExp.$1, RegExp.$1.length == 3 ? "\u7B2C" + z + "\u5468" : z + "");
    }
    for (let k in opt) {
      let r = new RegExp("(" + k + ")").exec(format);
      if (r)
        format = format.replace(r[1], RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, "0"));
    }
    return format;
  }
  getCurrentDate() {
    return this.formatDate(new Date(), "YYYY-mm-dd");
  }
  getCurrentTime() {
    return this.formatDate(new Date(), "HH:MM");
  }
  getCurrentDateTime() {
    return this.formatDate(new Date(), "YYYY-mm-dd HH:MM:SS");
  }
  rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  randString(size) {
    let result = "";
    let allChar = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    size = size || 1;
    while (size--) {
      result += allChar.charAt(this.rand(0, allChar.length - 1));
    }
    return result;
  }
  randFilename(file) {
    return this.randString(this.rand(10, 100)) + Date.parse(new Date()) + "." + this.getFilenameExt(file);
  }
  isString(value) {
    return typeof value === "string";
  }
  isFunction(value) {
    return this.type(value) === "function";
  }
  isArray(value) {
    return Array.isArray(value);
  }
  isObject(value) {
    return value !== null && typeof value === "object";
  }
  isNumber(value) {
    return typeof value === "number";
  }
  isDate(value) {
    return this.type(value) === "[object Date]";
  }
  isRegExp(value) {
    return this.type(value) === "[object RegExp]";
  }
  isFile(obj) {
    return this.type(obj) === "[object File]";
  }
  isFormData(obj) {
    return this.type(obj) === "[object FormData]";
  }
  isBlob(obj) {
    return this.type(obj) === "[object Blob]";
  }
  isBoolean(value) {
    return typeof value === "boolean";
  }
  isPromiseLike(obj) {
    return obj && this.isFunction(obj.then);
  }
  isTypedArray(value) {
    const TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/;
    return value && this.isNumber(value.length) && TYPED_ARRAY_REGEXP.test(this.type(value));
  }
  isArrayBuffer(obj) {
    return this.type(obj) === "[object ArrayBuffer]";
  }
  isDefined(value) {
    return typeof value !== "undefined";
  }
  isUndefined(value) {
    return typeof value === "undefined";
  }
  isNull(value) {
    return value === null;
  }
  isFinite(value) {
    return typeof value == "number" && isFinite(value);
  }
  isNaN(value) {
    return this.isNumber(value) && value != +value;
  }
  isError(value) {
    return this.type(value) === "[object Error]";
  }
  trim(str) {
    return this.isString(str) ? str.trim() : str;
  }
  escapeForRegexp(str) {
    return str.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
  }
  makeMap(str) {
    let obj = {}, items = str.split(",");
    for (let i = 0; i < items.length; i++) {
      obj[items[i]] = true;
    }
    return obj;
  }
  includes(arr, obj) {
    return Array.prototype.indexOf.call(arr, obj) != -1;
  }
  arrayRemove(array, value) {
    let index = array.indexOf(value);
    if (index >= 0) {
      array.splice(index, 1);
    }
    return index;
  }
  addDateMinutes(date, minutes) {
    date = new Date(date.getTime());
    date.setMinutes(date.getMinutes() + minutes || 0);
    return date;
  }
  toJson(obj, pretty) {
    if (this.isUndefined(obj))
      return void 0;
    if (!this.isNumber(pretty)) {
      pretty = pretty ? 2 : null;
    }
    return JSON.stringify(obj, null, pretty);
  }
  fromJson(json) {
    return this.isString(json) ? JSON.parse(decodeURIComponent(json).replace(
      new RegExp("&quot;", "gm"),
      '"'
    )) : json;
  }
  extend() {
    let src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !this.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && this.isArray(src) ? src : [];
            } else {
              clone = src && this.isPlainObject(src) ? src : {};
            }
            target[name] = this.extend(deep, clone, copy);
          } else if (copy !== void 0) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  }
  isPlainObject(obj) {
    let getProto = Object.getPrototypeOf;
    let class2type = {};
    let hasOwn = class2type.hasOwnProperty;
    let fnToString = hasOwn.toString;
    let ObjectFunctionString = fnToString.call(Object);
    let proto, Ctor;
    if (!obj || this.type(obj) !== "[object Object]") {
      return false;
    }
    proto = getProto(obj);
    if (!proto) {
      return true;
    }
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
  }
  isEmptyObject(obj) {
    for (let i in obj)
      return false;
    return true;
  }
  type(obj) {
    const toString = Object.prototype.toString;
    if (obj == null) {
      return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ? toString.call(obj) || "object" : typeof obj;
  }
  merge(...args) {
    return Object.assign(...args);
  }
  clone(obj) {
    if (typeof obj !== "object" || !obj) {
      return obj;
    }
    let copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = obj[attr];
      }
    }
    return copy;
  }
  getUrlParams(url) {
    var _params = {}, qStart = url.indexOf("?"), hStart = url.indexOf("#"), q = url.substr(qStart + 1), tmp, parts, i;
    if (hStart === -1)
      hStart = url.length;
    if (q) {
      tmp = q.split("&");
      i = tmp.length;
      while (i--) {
        parts = tmp[i].split("=");
        _params[parts[0]] = decodeURIComponent(parts[1]).replace(/\+/g, " ");
      }
    }
    return _params;
  }
  getUrlParam(url, name) {
    return this.getUrlParams(url)[name];
  }
  omit(obj, keys) {
    let o = this.clone(obj);
    keys.forEach((key) => {
      delete o[key];
    });
    return o;
  }
  pluck(arr, key) {
    if (typeof arr !== "object" || arr.length === 0) {
      return [];
    }
    if (!key) {
      return arr;
    }
    return arr.map((a) => a[key]);
  }
  serializeValue(value) {
    if (this.isObject(value))
      return this.isDate(value) ? value.toISOString() : this.toJson(value);
    return value;
  }
  encodeUriQuery(value, pctEncodeSpaces) {
    return encodeURIComponent(value).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, pctEncodeSpaces ? "%20" : "+");
  }
  paramSerializer(obj) {
    if (!obj)
      return "";
    let that = this;
    let parts = [];
    for (let key in obj) {
      const value = obj[key];
      if (value === null || that.isUndefined(value))
        return;
      if (that.isArray(value)) {
        value.forEach(function(v) {
          parts.push(that.encodeUriQuery(key) + "=" + that.encodeUriQuery(that.serializeValue(v)));
        });
      } else {
        parts.push(that.encodeUriQuery(key) + "=" + that.encodeUriQuery(that.serializeValue(value)));
      }
    }
    return parts.join("&");
  }
  buildUrl(url, obj) {
    const serializedParams = this.paramSerializer(obj);
    if (serializedParams.length > 0) {
      url += (url.indexOf("?") == -1 ? "?" : "&") + serializedParams;
    }
    return url;
  }
  guid(len = 32, firstU = true, radix = null) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    let uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return "u" + uuid.join("");
    } else {
      return uuid.join("");
    }
  }
  getRect(selector, all) {
    return new Promise((resolve) => {
      common_vendor.index.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect);
        }
        if (!all && rect) {
          resolve(rect);
        }
      }).exec();
    });
  }
  renderUrl(url, defaultUrl) {
    if (!url || url == "") {
      url = defaultUrl;
    }
    if (url.indexOf("__weui-popup") > 0 || url.startsWith("tel:") || url.startsWith("http://") || url.startsWith(
      "https://"
    )) {
      return url;
    }
    if (url.indexOf("/pages/" + url) != 0) {
      url = "/pages/" + url;
    }
    return url;
  }
  renderImage(path) {
    if (!path)
      return "";
    if (path.indexOf("http") !== -1)
      return path;
    path = `${this.$$basePath}${path}`;
    if (path.indexOf("www.custom.com/upload") > 0) {
      path = path.replace("www.custom.com", "lib.custom.com");
    }
    return path;
  }
  makePhoneCall(e) {
    let phone = "";
    if (e.currentTarget) {
      var dataset = e.currentTarget.dataset;
      phone = dataset.phone;
    } else if (this.isObject(e) && e.phone) {
      phone = e.phone;
    } else {
      phone = e;
    }
    if (phone.indexOf("tel:") !== -1) {
      phone = phone.substr(4);
    }
    common_vendor.index.makePhoneCall({
      phoneNumber: phone
    });
  }
  navigateTo(url, params) {
    if (url.startsWith("tel:")) {
      this.makePhoneCall(url);
    } else {
      if (url.startsWith("http://") || url.startsWith("https://")) {
        const $$url = this.buildUrl("/pages/webview", params);
        return new Promise((resolve, reject) => {
          common_vendor.index.navigateTo({
            url: $$url,
            success: (res) => resolve(res),
            fail: (res) => reject(res)
          });
        });
      } else {
        if (url.startsWith("pages/")) {
          url = "/" + url;
        }
        if (!url.startsWith("/pages/")) {
          url = "/pages/" + url;
        }
        if (!getApp()) {
          common_vendor.index.reLaunch({
            url
          });
          common_vendor.index.hideHomeButton();
          return;
        } else if (getApp().globalData.tabBar.indexOf(url) != -1) {
          common_vendor.index.switchTab({
            url
          });
        } else if (params && params["redirect"]) {
          const $$url = this.buildUrl(url, params);
          common_vendor.index.redirectTo({
            url: $$url,
            success: (res) => {
              console.log("success" + res);
            },
            fail: (res) => {
              console.log("error" + res);
            }
          });
        } else {
          const $$url = this.buildUrl(url, params);
          common_vendor.index.navigateTo({
            url: $$url,
            success: (res) => {
              console.log("success" + res);
            },
            fail: (res) => {
              console.log("error" + res);
              if (res && res.errMsg && res.errMsg.indexOf("limit") > 0) {
                common_vendor.index.redirectTo({
                  url: $$url,
                  success: (res2) => {
                    console.log("success" + res2);
                  },
                  fail: (res2) => {
                    console.log("error" + res2);
                  }
                });
              }
            }
          });
        }
      }
    }
  }
  padZero(num, targetLength = 2) {
    let str = `${num}`;
    while (str.length < targetLength) {
      str = `0${str}`;
    }
    return str;
  }
  parseTimeData(time) {
    const SECOND = 1e3;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const days = Math.floor(time / DAY);
    const hours = Math.floor(time % DAY / HOUR);
    const minutes = Math.floor(time % HOUR / MINUTE);
    const seconds = Math.floor(time % MINUTE / SECOND);
    const milliseconds = Math.floor(time % SECOND);
    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds
    };
  }
  parseFormat(format, timeData) {
    let {
      days,
      hours,
      minutes,
      seconds,
      milliseconds
    } = timeData;
    if (format.indexOf("DD") === -1) {
      hours += days * 24;
    } else {
      format = format.replace("DD", this.padZero(days));
    }
    if (format.indexOf("HH") === -1) {
      minutes += hours * 60;
    } else {
      format = format.replace("HH", this.padZero(hours));
    }
    if (format.indexOf("mm") === -1) {
      seconds += minutes * 60;
    } else {
      format = format.replace("mm", this.padZero(minutes));
    }
    if (format.indexOf("ss") === -1) {
      milliseconds += seconds * 1e3;
    } else {
      format = format.replace("ss", this.padZero(seconds));
    }
    return format.replace("SSS", this.padZero(milliseconds, 3));
  }
  isSameSecond(time1, time2) {
    return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3);
  }
  addUnit(value = "auto", unit = "rpx") {
    return this.isNumber(value) ? `${value}${unit}` : value;
  }
  getParent(parent, name = void 0) {
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
        let tmp = this.getParent(parent, name);
        if (tmp) {
          return tmp;
        }
      } else {
        return parent;
      }
    }
    return false;
  }
  os() {
    return common_vendor.index.getSystemInfoSync().platform;
  }
  sys() {
    return common_vendor.index.getSystemInfoSync();
  }
}
exports.Tools = Tools;
