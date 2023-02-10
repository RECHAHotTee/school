"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      globalOption: {},
      globalData: {}
    };
  },
  onShow() {
    this.setCurrentPage(this);
  },
  onLoad(option) {
    this.setCurrentPage(this);
    if (option) {
      this.setData({
        globalOption: this.getOption(option)
      });
    }
    this.init();
  },
  methods: {
    async init() {
    }
  }
};
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  _easycom_u_navbar2();
}
const _easycom_u_navbar = () => "../../uni_modules/diy-uview-ui/components/u-navbar/u-navbar.js";
if (!Math) {
  _easycom_u_navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      titleWidth: "500",
      isFixed: true,
      isSlotTitle: true,
      title: "\u4E2A\u4EBA\u4E2D\u5FC3",
      backText: "\u8FD4\u56DE",
      titleColor: "inherit",
      backIconColor: "inherit",
      backTextStyle: {
        color: "inherit"
      },
      isHome: false,
      isBack: false
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dd383ca2"], ["__file", "C:/Users/Pipik/Downloads/uniapp-school (1)/pages/profile/profile.vue"]]);
wx.createPage(MiniProgramPage);
