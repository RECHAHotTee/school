"use strict";
const common_vendor = require("./vendor.js");
var Login = {
  weixin(thiz, dataset) {
    if (common_vendor.index.getUserProfile) {
      common_vendor.index.getUserProfile({
        lang: "zh_CN",
        desc: "\u7528\u4E8E\u767B\u9646",
        success: function(wxInfo) {
          common_vendor.index.login({
            provider: "weixin",
            success: function(res) {
              let data = {
                code: res.code,
                type: dataset.logintype,
                userInfo: JSON.stringify(wxInfo.userInfo)
              };
              thiz.$http.post(dataset.loginurl, data).then((res2) => {
                if (res2.code == 200) {
                  thiz.setData({
                    userInfo: res2.data
                  });
                  thiz.$session.setUser(res2.data);
                }
                if (thiz[dataset.callback]) {
                  thiz[dataset.callback](res2);
                }
              });
            },
            fail: function() {
              common_vendor.wx$1.showModal({
                title: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F",
                content: "\u8BF7\u5141\u8BB8\u6388\u6743\u4EE5\u4FBF\u4E3A\u60A8\u63D0\u4F9B\u7ED9\u670D\u52A1",
                success: function(res) {
                  if (res.confirm) {
                    thiz.navigateTo(dataset);
                  }
                }
              });
            }
          });
        },
        fail: function(res) {
          common_vendor.wx$1.showModal({
            title: "\u53CB\u60C5\u63D0\u793A",
            content: "\u5DF2\u62D2\u7EDD\u5C0F\u7A0B\u5E8F\u83B7\u53D6\u4FE1\u606F",
            showCancel: false
          });
        }
      });
    } else {
      common_vendor.index.showToast({
        title: "\u767B\u5F55\u5931\u8D25\uFF0C\u8BF7\u5728\u5C0F\u7A0B\u5E8F\u4E0A\u767B\u5F55",
        icon: "none"
      });
    }
  }
};
exports.Login = Login;
