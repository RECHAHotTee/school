"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-radio",
  emits: ["change"],
  props: {
    name: {
      type: [String, Number],
      default: ""
    },
    size: {
      type: [String, Number],
      default: 34
    },
    shape: {
      type: String,
      default: ""
    },
    disabled: {
      type: [String, Boolean],
      default: ""
    },
    labelDisabled: {
      type: [String, Boolean],
      default: ""
    },
    activeColor: {
      type: String,
      default: ""
    },
    iconSize: {
      type: [String, Number],
      default: ""
    },
    labelSize: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      parentData: {
        iconSize: null,
        labelDisabled: null,
        disabled: null,
        shape: null,
        activeColor: null,
        size: null,
        width: null,
        height: null,
        value: null,
        wrap: null
      }
    };
  },
  created() {
    this.parent = false;
    this.updateParentData();
    this.parent.children.push(this);
  },
  computed: {
    elDisabled() {
      return this.disabled !== "" ? this.disabled : this.parentData.disabled !== null ? this.parentData.disabled : false;
    },
    elLabelDisabled() {
      return this.labelDisabled !== "" ? this.labelDisabled : this.parentData.labelDisabled !== null ? this.parentData.labelDisabled : false;
    },
    elSize() {
      return this.size ? this.size : this.parentData.size ? this.parentData.size : 34;
    },
    elIconSize() {
      return this.iconSize ? this.iconSize : this.parentData.iconSize ? this.parentData.iconSize : 20;
    },
    elActiveColor() {
      return this.activeColor ? this.activeColor : this.parentData.activeColor ? this.parentData.activeColor : "primary";
    },
    elShape() {
      return this.shape ? this.shape : this.parentData.shape ? this.parentData.shape : "circle";
    },
    iconStyle() {
      let style = {};
      if (this.elActiveColor && this.parentData.value == this.name && !this.elDisabled) {
        style.borderColor = this.elActiveColor;
        style.backgroundColor = this.elActiveColor;
      }
      style.width = this.$u.addUnit(this.elSize);
      style.height = this.$u.addUnit(this.elSize);
      return style;
    },
    iconColor() {
      return this.name == this.parentData.value ? "#ffffff" : "transparent";
    },
    iconClass() {
      let classes = [];
      classes.push("u-radio__icon-wrap--" + this.elShape);
      if (this.name == this.parentData.value)
        classes.push("u-radio__icon-wrap--checked");
      if (this.elDisabled)
        classes.push("u-radio__icon-wrap--disabled");
      if (this.name == this.parentData.value && this.elDisabled)
        classes.push("u-radio__icon-wrap--disabled--checked");
      return classes.join(" ");
    },
    radioStyle() {
      let style = {};
      if (this.parentData.width) {
        style.width = this.$u.addUnit(this.parentData.width);
        style.float = "left";
      }
      if (this.parentData.wrap) {
        style.width = "100%";
      }
      return style;
    }
  },
  methods: {
    updateParentData() {
      this.getParentData("u-radio-group");
    },
    onClickLabel() {
      if (!this.elLabelDisabled && !this.elDisabled) {
        this.setRadioCheckedStatus();
      }
    },
    toggle() {
      if (!this.elDisabled) {
        this.setRadioCheckedStatus();
      }
    },
    emitEvent() {
      if (this.parentData.value != this.name)
        this.$emit("change", this.name);
    },
    setRadioCheckedStatus() {
      this.emitEvent();
      if (this.parent) {
        this.parent.setValue(this.name);
        this.parentData.value = this.name;
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
  return {
    a: common_vendor.p({
      name: "checkbox-mark",
      size: $options.elIconSize,
      color: $options.iconColor
    }),
    b: common_vendor.o((...args) => $options.toggle && $options.toggle(...args)),
    c: common_vendor.n($options.iconClass),
    d: common_vendor.s($options.iconStyle),
    e: common_vendor.o((...args) => $options.onClickLabel && $options.onClickLabel(...args)),
    f: _ctx.$u.addUnit($props.labelSize),
    g: common_vendor.s($options.radioStyle)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-088e54f1"], ["__file", "C:/Users/Pipik/Downloads/uniapp-school (1)/uni_modules/diy-uview-ui/components/u-radio/u-radio.vue"]]);
wx.createComponent(Component);
