"use strict";
const common_vendor = require("../../../../common/vendor.js");
let systemInfo = common_vendor.index.getSystemInfoSync();
let menuButtonInfo = {};
menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
const _sfc_main = {
  name: "u-navbar",
  props: {
    height: {
      type: [String, Number],
      default: ""
    },
    backIconColor: {
      type: String,
      default: "#606266"
    },
    backUrl: {
      type: String,
      default: ""
    },
    backIconName: {
      type: String,
      default: "nav-back"
    },
    backIconSize: {
      type: [String, Number],
      default: "44"
    },
    backText: {
      type: String,
      default: ""
    },
    backTextStyle: {
      type: Object,
      default() {
        return {
          color: "#606266"
        };
      }
    },
    title: {
      type: String,
      default: ""
    },
    isSlotTitle: {
      type: [Boolean, String],
      default: false
    },
    titleWidth: {
      type: [String, Number],
      default: "250"
    },
    titleColor: {
      type: String,
      default: "#606266"
    },
    titleBold: {
      type: Boolean,
      default: false
    },
    titleSize: {
      type: [String, Number],
      default: 32
    },
    isBack: {
      type: [Boolean, String],
      default: true
    },
    isHome: {
      type: [Boolean, String],
      default: false
    },
    background: {
      type: Object,
      default() {
        return {
          background: "#ffffff"
        };
      }
    },
    bgColor: {
      type: String,
      default: ""
    },
    isFixed: {
      type: Boolean,
      default: true
    },
    immersive: {
      type: Boolean,
      default: false
    },
    borderBottom: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: [String, Number],
      default: ""
    },
    customBack: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      menuButtonInfo,
      statusBarHeight: systemInfo.statusBarHeight
    };
  },
  computed: {
    navbarInnerStyle() {
      let style = {};
      style.height = this.navbarHeight + "px";
      let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left;
      style.marginRight = rightButtonWidth + "px";
      return style;
    },
    navbarStyle() {
      let style = {};
      style.zIndex = this.zIndex ? this.zIndex : this.$u.zIndex.navbar;
      Object.assign(style, this.background);
      return style;
    },
    titleStyle() {
      let style = {};
      let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left;
      style.left = (systemInfo.windowWidth - common_vendor.index.upx2px(this.titleWidth)) / 2 + "px";
      style.right = rightButtonWidth - (systemInfo.windowWidth - common_vendor.index.upx2px(this.titleWidth)) / 2 + rightButtonWidth + "px";
      style.width = common_vendor.index.upx2px(this.titleWidth) + "px";
      return style;
    },
    navbarHeight() {
      let height = 40;
      return this.height ? this.height : height;
    }
  },
  created() {
  },
  methods: {
    getHome() {
      if (getApp().globalData.homePage) {
        common_vendor.index.reLaunch({
          url: getApp().globalData.homePage
        });
      } else {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u5148\u8BBE\u7F6E\u9996\u9875\u5730\u5740"
        });
      }
    },
    goBack() {
      if (typeof this.customBack === "function") {
        this.customBack.bind(this.$u.$parent.call(this))();
      } else if (this.backUrl) {
        if (getApp().globalData.tabBar.includes(this.backUrl)) {
          common_vendor.index.switchTab({
            url: this.backUrl
          });
        } else {
          common_vendor.index.redirectTo({
            url: this.backUrl
          });
        }
      } else {
        common_vendor.index.navigateBack();
      }
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.statusBarHeight + "px",
    b: $props.isBack
  }, $props.isBack ? common_vendor.e({
    c: common_vendor.p({
      name: $props.backIconName,
      color: $props.backIconColor,
      size: $props.backIconSize
    }),
    d: $props.backText
  }, $props.backText ? {
    e: common_vendor.t($props.backText),
    f: common_vendor.s($props.backTextStyle)
  } : {}, {
    g: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  }) : {}, {
    h: $props.isHome && $props.isBack
  }, $props.isHome && $props.isBack ? {
    i: "1px solid " + $props.backIconColor
  } : {}, {
    j: $props.isHome
  }, $props.isHome ? {
    k: common_vendor.p({
      name: "home",
      customPrefix: "diy-icon",
      color: $props.backIconColor,
      size: $props.backIconSize
    }),
    l: common_vendor.o((...args) => $options.getHome && $options.getHome(...args))
  } : {}, {
    m: $props.title || $props.isSlotTitle
  }, $props.title || $props.isSlotTitle ? common_vendor.e({
    n: $props.isSlotTitle
  }, $props.isSlotTitle ? {
    o: $props.titleColor,
    p: $props.titleSize + "rpx",
    q: $props.titleBold ? "bold" : "normal"
  } : {
    r: common_vendor.t($props.title),
    s: $props.titleColor,
    t: $props.titleSize + "rpx",
    v: $props.titleBold ? "bold" : "normal"
  }, {
    w: common_vendor.s($options.titleStyle)
  }) : {}, {
    x: common_vendor.s($options.navbarInnerStyle),
    y: common_vendor.s($options.navbarStyle),
    z: common_vendor.n($props.isFixed ? "u-navbar-fixed" : ""),
    A: common_vendor.n($props.borderBottom ? "u-border-bottom" : ""),
    B: common_vendor.n($props.bgColor),
    C: $props.isFixed && !$props.immersive
  }, $props.isFixed && !$props.immersive ? {
    D: Number($options.navbarHeight) + $data.statusBarHeight + "px"
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fa2f1165"], ["__file", "C:/Users/Pipik/Downloads/uniapp-school (1)/uni_modules/diy-uview-ui/components/u-navbar/u-navbar.vue"]]);
wx.createComponent(Component);
