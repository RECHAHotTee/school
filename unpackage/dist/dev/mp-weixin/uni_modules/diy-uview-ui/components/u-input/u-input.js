"use strict";
const uni_modules_diyUviewUi_libs_util_emitter = require("../../libs/util/emitter.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-input",
  emits: ["update:modelValue", "input", "change", "blur", "focus", "click", "touchstart"],
  mixins: [uni_modules_diyUviewUi_libs_util_emitter.Emitter],
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    inputAlign: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: [Number, String],
      default: 140
    },
    placeholderStyle: {
      type: String,
      default: "color: #c0c4cc;"
    },
    confirmType: {
      type: String,
      default: "done"
    },
    customStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    fixed: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    passwordIcon: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false
    },
    borderColor: {
      type: String,
      default: "#dcdfe6"
    },
    autoHeight: {
      type: Boolean,
      default: true
    },
    selectOpen: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: ""
    },
    clearable: {
      type: [Boolean, String],
      default: true
    },
    cursorSpacing: {
      type: [Number, String],
      default: 0
    },
    selectionStart: {
      type: [Number, String],
      default: -1
    },
    selectionEnd: {
      type: [Number, String],
      default: -1
    },
    trim: {
      type: Boolean,
      default: true
    },
    showConfirmbar: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String
    },
    padding: {
      type: String
    }
  },
  data() {
    return {
      defaultValue: "",
      inputHeight: 70,
      textareaHeight: 100,
      validateState: false,
      focused: false,
      showPassword: false,
      lastValue: "",
      uForm: {
        inputAlign: "",
        clearable: ""
      }
    };
  },
  watch: {
    valueCom(nVal, oVal) {
      this.defaultValue = nVal;
      if (nVal != oVal && this.type == "select")
        this.handleInput({
          detail: {
            value: nVal
          }
        });
    }
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    inputAlignCom() {
      return this.inputAlign || this.uForm.inputAlign || "left";
    },
    clearableCom() {
      if (typeof this.clearable == "boolean")
        return this.clearable;
      if (typeof this.uForm.clearable == "boolean")
        return this.uForm.clearable;
      return true;
    },
    inputMaxlength() {
      return Number(this.maxlength);
    },
    getStyle() {
      let style = {};
      style.minHeight = this.height ? this.height + "rpx" : this.type == "textarea" ? this.textareaHeight + "rpx" : this.inputHeight + "rpx";
      style = Object.assign(style, this.customStyle);
      return style;
    },
    getCursorSpacing() {
      return Number(this.cursorSpacing);
    },
    uSelectionStart() {
      return String(this.selectionStart);
    },
    uSelectionEnd() {
      return String(this.selectionEnd);
    }
  },
  created() {
    this.defaultValue = this.valueCom;
  },
  mounted() {
    let parent = this.$u.$parent.call(this, "u-form");
    if (parent) {
      Object.keys(this.uForm).map((key) => {
        this.uForm[key] = parent[key];
      });
    }
  },
  methods: {
    handleInput(event) {
      let value = event.detail.value;
      if (this.trim)
        value = this.$u.trim(value);
      this.$emit("input", value);
      this.$emit("update:modelValue", value);
      this.defaultValue = value;
      setTimeout(() => {
        this.dispatch("u-form-item", "onFieldChange", value);
      }, 40);
    },
    handleBlur(event) {
      setTimeout(() => {
        this.focused = false;
      }, 100);
      this.$emit("blur", event.detail.value);
      setTimeout(() => {
        this.dispatch("u-form-item", "onFieldBlur", event.detail.value);
      }, 40);
    },
    onFormItemError(status) {
      this.validateState = status;
    },
    onFocus(event) {
      this.focused = true;
      this.$emit("focus");
    },
    onConfirm(e) {
      this.$emit("confirm", e.detail.value);
    },
    onClear(event) {
      this.$emit("input", "");
      this.$emit("update:modelValue", "");
    },
    inputClick() {
      this.$emit("click");
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
    a: $props.type == "textarea"
  }, $props.type == "textarea" ? {
    b: common_vendor.s($options.getStyle),
    c: $data.defaultValue,
    d: $props.placeholder,
    e: $props.placeholderStyle,
    f: $props.disabled,
    g: $options.inputMaxlength,
    h: $props.fixed,
    i: $props.focus,
    j: $props.autoHeight,
    k: $options.uSelectionEnd,
    l: $options.uSelectionStart,
    m: $options.getCursorSpacing,
    n: common_vendor.o((...args) => $options.handleInput && $options.handleInput(...args)),
    o: common_vendor.o((...args) => $options.handleBlur && $options.handleBlur(...args)),
    p: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    q: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args))
  } : {
    r: $props.type == "password" ? "text" : $props.type,
    s: common_vendor.s($options.getStyle),
    t: $data.defaultValue,
    v: $props.type == "password" && !$data.showPassword,
    w: $props.placeholder,
    x: $props.placeholderStyle,
    y: $props.disabled || $props.type === "select",
    z: $options.inputMaxlength,
    A: $props.focus,
    B: $props.confirmType,
    C: $options.getCursorSpacing,
    D: $options.uSelectionEnd,
    E: $options.uSelectionStart,
    F: common_vendor.o((...args) => $options.onFocus && $options.onFocus(...args)),
    G: common_vendor.o((...args) => $options.handleBlur && $options.handleBlur(...args)),
    H: common_vendor.o((...args) => $options.handleInput && $options.handleInput(...args)),
    I: common_vendor.o((...args) => $options.onConfirm && $options.onConfirm(...args))
  }, {
    J: $options.clearableCom && $options.valueCom != "" && $data.focused
  }, $options.clearableCom && $options.valueCom != "" && $data.focused ? {
    K: common_vendor.p({
      size: "32",
      name: "close-circle-fill",
      color: "#c0c4cc"
    }),
    L: common_vendor.o((...args) => $options.onClear && $options.onClear(...args))
  } : {}, {
    M: $props.passwordIcon && $props.type == "password"
  }, $props.passwordIcon && $props.type == "password" ? {
    N: common_vendor.o(($event) => $data.showPassword = !$data.showPassword),
    O: common_vendor.p({
      size: "32",
      name: !$data.showPassword ? "eye" : "eye-fill",
      color: "#c0c4cc"
    })
  } : {}, {
    P: $props.type == "select"
  }, $props.type == "select" ? {
    Q: common_vendor.p({
      name: "arrow-right",
      size: "26",
      color: "#c0c4cc"
    }),
    R: $props.selectOpen ? 1 : ""
  } : {}, {
    S: $props.border ? 1 : "",
    T: $data.validateState ? 1 : "",
    U: $props.padding ? $props.padding : `0 ${$props.border ? 20 : 0}rpx`,
    V: $props.borderColor,
    W: $options.inputAlignCom,
    X: $props.backgroundColor,
    Y: common_vendor.o((...args) => $options.inputClick && $options.inputClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-42f09606"], ["__file", "C:/Users/Pipik/Downloads/uniapp-school (1)/uni_modules/diy-uview-ui/components/u-input/u-input.vue"]]);
wx.createComponent(Component);
