"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "diy-noticebar",
  props: {
    leftImg: {
      type: String,
      default: ""
    },
    leftIcon: {
      type: String,
      default: ""
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: ""
    },
    show: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [Number, String],
      default: 2e3
    },
    interval: {
      type: [Number, String],
      default: 2e3
    },
    fontSize: {
      type: [Number, String],
      default: 28
    },
    speed: {
      type: [Number, String],
      default: 160
    },
    playState: {
      type: String,
      default: "play"
    },
    padding: {
      type: [Number, String],
      default: "18rpx 24rpx"
    },
    remote: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      elClass: this.$tools.guid(),
      textWidth: 0,
      boxWidth: 0,
      animationDuration: "10s",
      animationPlayState: "paused",
      showText: ""
    };
  },
  watch: {
    playState(val) {
      if (val == "play")
        this.animationPlayState = "running";
      else
        this.animationPlayState = "paused";
    },
    speed(val) {
      if (!this.remote) {
        this.initSize();
      }
    },
    list(val) {
      setTimeout(() => this.initSize(), 10);
    }
  },
  computed: {
    computeColor() {
      if (this.color)
        return this.color;
      else if (this.type == "none")
        return "#606266";
      else
        return this.type;
    },
    textStyle() {
      let style = {};
      if (this.color)
        style.color = this.color;
      else if (this.type == "none")
        style.color = "#606266";
      style.fontSize = this.fontSize + "rpx";
      return style;
    },
    computeBgColor() {
      if (this.bgColor)
        return this.bgColor;
      else if (this.type == "none")
        return "transparent";
    }
  },
  mounted() {
    if (!this.remote) {
      this.$nextTick(() => {
        this.initSize();
      });
    }
  },
  methods: {
    initSize() {
      if (!this.vertical) {
        let query = [];
        let textQuery = new Promise((resolve, reject) => {
          common_vendor.index.createSelectorQuery().in(this).select("." + this.elClass).boundingClientRect().exec((ret) => {
            this.textWidth = ret[0].width;
            resolve();
          });
        });
        query.push(textQuery);
        Promise.all(query).then(() => {
          this.animationDuration = `${this.textWidth / common_vendor.index.upx2px(this.speed)}s`;
          this.animationPlayState = "paused";
          setTimeout(() => {
            if (this.playState == "play" && this.autoplay)
              this.animationPlayState = "running";
          }, 10);
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.leftImg
  }, $props.leftImg ? {
    b: $props.leftImg
  } : {}, {
    c: $props.leftIcon
  }, $props.leftIcon ? {
    d: common_vendor.n($props.leftIcon),
    e: $options.computeColor
  } : {}, {
    f: $props.vertical
  }, $props.vertical ? {} : {
    g: common_vendor.o((...args) => _ctx.click && _ctx.click(...args)),
    h: common_vendor.n($data.elClass),
    i: $data.animationDuration,
    j: $data.animationPlayState
  }, {
    k: common_vendor.s($options.textStyle),
    l: $options.computeBgColor,
    m: $props.padding
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/Pipik/Downloads/uniapp-school (1)/components/diy-noticebar/diy-noticebar.vue"]]);
wx.createComponent(Component);
