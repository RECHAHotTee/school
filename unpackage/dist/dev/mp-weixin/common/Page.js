"use strict";
const common_vendor = require("./vendor.js");
const common_Validate = require("./Validate.js");
const common_Login = require("./Login.js");
const common_Pay = require("./Pay.js");
const Validate = (rules, messages) => new common_Validate.Validate(rules, messages);
function setData(dataset) {
  for (let field in dataset) {
    const regex = /([\w$]+)|\[(:\d)\]/g;
    const patten = field.match(regex);
    let result = this;
    for (let i = 0; i < patten.length - 1; i++) {
      const key = patten[i];
      result = result[key];
    }
    result[patten[patten.length - 1]] = dataset[field];
  }
}
var flagArr = [];
function navigateTo(e) {
  let dataset = e.currentTarget ? e.currentTarget.dataset : e;
  let { id, type } = dataset;
  let thiz = this;
  if (e.currentTarget) {
    if (!flagArr[type]) {
      flagArr[type] = true;
      setTimeout(() => {
        flagArr[type] = false;
      }, 500);
    } else {
      return;
    }
  }
  if (type == "openmodal") {
    thiz[id] = "show";
  } else if (type == "closemodal") {
    thiz[id] = "";
  } else if (type == "page" || type == "inner" || type == "href") {
    thiz.$tools.navigateTo(dataset.url, dataset);
  } else if (type == "submit") {
    showToast("\u5C06\u6267\u884C\u8868\u5355\u63D0\u4EA4\u52A8\u4F5C");
  } else if (type == "reset") {
    showToast("\u5C06\u6267\u884C\u8868\u5355\u91CD\u7F6E\u52A8\u4F5C");
  } else if (type == "tip") {
    showToast(dataset.tip);
  } else if (type == "confirm") {
    common_vendor.index.showModal({
      title: "\u63D0\u793A",
      content: dataset.tip,
      showCancel: false
    });
  } else if (type == "daohang") {
    common_vendor.index.openLocation({
      latitude: Number(dataset.lat),
      longitude: Number(dataset.lng),
      address: dataset.address,
      success: function() {
        console.log("success");
      }
    });
  } else if (type == "phone") {
    thiz.$tools.makePhoneCall(e);
  } else if (type == "previewImage" || type == "preview") {
    common_vendor.index.previewImage({
      current: thiz.$tools.renderImage(dataset.img),
      urls: [thiz.$tools.renderImage(dataset.img)]
    });
  } else if (type == "copy") {
    common_vendor.index.setClipboardData({
      data: dataset.copy,
      showToast: false,
      success: function() {
        showToast(dataset.tip || "\u590D\u5236\u6210\u529F", "none");
      }
    });
  } else if (type == "xcx") {
    common_vendor.index.navigateToMiniProgram({
      appId: dataset.appid,
      path: dataset.path,
      success(res) {
      }
    });
  } else if (typeof thiz[type] == "function") {
    thiz[type](dataset);
  } else if (type == "login") {
    let logintType = dataset.logintype;
    if (common_Login.Login[logintType]) {
      common_Login.Login[logintType](thiz, dataset);
    } else {
      showToast(type + "\u767B\u5F55\u6709\u5F85\u5B9E\u73B0");
    }
  } else if (type == "pay") {
    common_Pay.Pay.pay(dataset);
  } else {
    showToast(type + "\u7C7B\u578B\u6709\u5F85\u5B9E\u73B0");
  }
}
function showModal(message, title = "\u63D0\u793A", iscancel = true) {
  return new Promise((resolve) => {
    common_vendor.index.showModal({
      title,
      content: message,
      showCancel: iscancel,
      success: function(res) {
        if (res.confirm) {
          resolve(true);
        } else if (res.cancel) {
          resolve(false);
        }
      }
    });
  });
}
function showToast(title, icon) {
  common_vendor.index.showToast({
    title,
    icon: icon ? icon : "none"
  });
}
function getPickerChildren(data, chindInex1, childIndex2) {
  if (chindInex1 != null && data[chindInex1] && data[chindInex1].children && data[chindInex1].children) {
    let children = data[chindInex1].children;
    if (childIndex2 == null) {
      if (children != null && children.length > 0) {
        return children.map((item) => item.label);
      } else {
        return [];
      }
    } else {
      if (children[childIndex2] == null) {
        return [];
      }
      let children2 = children[childIndex2].children;
      if (children2 != null && children2.length > 0) {
        return children2.map((item) => item.label);
      } else {
        return [];
      }
    }
  } else {
    return [];
  }
}
function getData(thiz, field) {
  const regex = /([\w$]+)|\[(:\d)\]/g;
  const patten = field.match(regex);
  let result = thiz;
  for (let i = 0; i < patten.length - 1; i++) {
    let key = patten[i];
    result = result[key];
  }
  return result[patten[patten.length - 1]];
}
function uploadImage(thiz, field, fieldData, uploadUrl, count = 9, type = "img") {
  return new Promise((resolve) => {
    if (!uploadUrl) {
      showToast("\u8BF7\u914D\u7F6E\u4E0A\u4F20\u5730\u5740");
      resolve();
      return;
    }
    common_vendor.index.chooseImage({
      count,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function(res) {
        let tempFilePaths = res.tempFilePaths;
        for (let i = 0; i < tempFilePaths.length; i++) {
          common_vendor.index.uploadFile({
            url: thiz.$http.setUrl(uploadUrl),
            filePath: tempFilePaths[i],
            name: "file",
            header: {
              Authorization: thiz.$session.getToken() || ""
            },
            success(res2) {
              let data = thiz.$tools.fromJson(res2.data);
              let url = "";
              if (data.url) {
                url = thiz.$tools.renderImage(data.url);
              }
              if (data.data && thiz.$tools.isObject(data.data) && data.data.url) {
                url = thiz.$tools.renderImage(data.data.url);
              }
              if (type == "avatar") {
                thiz.setData({
                  [field]: url
                });
              } else {
                let files = getData(thiz, fieldData).concat(url);
                thiz.setData({
                  [fieldData]: files,
                  [field]: (files || []).join(",").replace(/^[]/, "")
                });
              }
            },
            complete() {
              if (i == tempFilePaths.length - 1) {
                resolve();
              }
            }
          });
        }
      }
    });
  });
}
function getOption(option) {
  if (option !== null && typeof option === "object") {
    for (let key in option) {
      option[key] = decodeURIComponent(option[key]);
    }
  }
  return option;
}
function setCurrentPage(page) {
  if (this.$session.getUser()) {
    page.userInfo = this.$session.getUser();
  }
  if (this.$session.getValue("redirect_page")) {
    let value = this.$session.getValue("redirect_page");
    this.$session.setValue("redirect_page", null);
    this.$tools.navigateTo(value.url, value);
  }
  getApp().globalData.currentPage = page;
}
exports.Validate = Validate;
exports.getOption = getOption;
exports.getPickerChildren = getPickerChildren;
exports.navigateTo = navigateTo;
exports.setCurrentPage = setCurrentPage;
exports.setData = setData;
exports.showModal = showModal;
exports.showToast = showToast;
exports.uploadImage = uploadImage;
