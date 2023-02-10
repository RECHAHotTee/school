"use strict";
const common_vendor = require("./vendor.js");
var Pay = {
  async pay(param) {
    let page = getApp().globalData.currentPage;
    let session = page.$session;
    if (!session.getUser().openid) {
      if (!param.openid) {
        page.showToast("\u8BF7\u5148\u767B\u5F55");
        return;
      }
    }
    if (!param.total) {
      page.showToast("\u8BF7\u914D\u7F6E\u4EF7\u683C\u53C2\u6570total");
      return;
    }
    let data = await page.$http.post(param.url || "/api/wepay/order", {
      total: param.total,
      body: param.body,
      openid: param.openid || session.getUser().openid
    }, {}, "json");
    if (data.code != 200) {
      page.showToast(data.msg);
      return;
    }
    if (this[param.paytype]) {
      this[param.paytype](Object.assign(data, param));
    } else {
      page.showToast("\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u6253\u5F00");
      return;
    }
  },
  weixin(params = {}) {
    common_vendor.index.requestPayment({
      provider: "wxpay",
      timeStamp: params.data.timeStamp,
      nonceStr: params.data.nonceStr,
      package: params.data.package,
      signType: params.data.signType,
      paySign: params.data.paySign,
      success: (res) => {
        if (params.success && typeof params.success == "function") {
          params.success(res);
        } else {
          console.log("\u914D\u7F6E\u652F\u4ED8\u56DE\u8C03\u6210\u529F\u65B9\u6CD5");
        }
      },
      fail: (res) => {
        if (params.fail && typeof params.fail == "function") {
          params.fail(res);
        } else {
          console.log("\u914D\u7F6E\u652F\u4ED8\u56DE\u8C03\u5931\u8D25\u65B9\u6CD5");
        }
      }
    });
  }
};
exports.Pay = Pay;
