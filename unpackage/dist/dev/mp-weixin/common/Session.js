"use strict";
const common_vendor = require("./vendor.js");
const siteinfo = require("../siteinfo.js");
var SESSION_SUFFIX = "diygw_com_";
var SESSION_KEY = "user_session";
var REDIRECT_SESSION_KEY = "redirect_session";
var Session = {
  getRedirecturl() {
    return common_vendor.index.getStorageSync(SESSION_SUFFIX + siteinfo.__config.appid + "_" + REDIRECT_SESSION_KEY) || null;
  },
  setRedirecturl(url) {
    if (url == null) {
      common_vendor.index.removeStorageSync(SESSION_SUFFIX + siteinfo.__config.appid + "_" + REDIRECT_SESSION_KEY);
    } else {
      common_vendor.index.setStorageSync(SESSION_SUFFIX + siteinfo.__config.appid + "_" + REDIRECT_SESSION_KEY, url);
    }
  },
  getUser() {
    return common_vendor.index.getStorageSync(SESSION_SUFFIX + siteinfo.__config.appid + SESSION_KEY) || null;
  },
  setUser(session) {
    common_vendor.index.setStorageSync(SESSION_SUFFIX + siteinfo.__config.appid + SESSION_KEY, session);
  },
  clearUser() {
    common_vendor.index.removeStorageSync(SESSION_KEY + siteinfo.__config.appid);
    const res = common_vendor.index.getStorageInfoSync();
    res.keys.forEach((key) => {
      if (key.startsWith(SESSION_SUFFIX + siteinfo.__config.appid)) {
        common_vendor.index.removeStorageSync(key);
      }
    });
  },
  getToken() {
    var userInfo = this.getUser();
    return userInfo ? userInfo.token : null;
  },
  getOpenId() {
    var userInfo = this.getUser();
    return userInfo ? userInfo.openid : null;
  },
  setValue(key, value) {
    if (value == null) {
      common_vendor.index.removeStorageSync(SESSION_SUFFIX + siteinfo.__config.appid + key);
    } else {
      common_vendor.index.setStorageSync(SESSION_SUFFIX + siteinfo.__config.appid + key, value);
    }
  },
  getValue(key) {
    return common_vendor.index.getStorageSync(SESSION_SUFFIX + siteinfo.__config.appid + key) || null;
  }
};
exports.Session = Session;
