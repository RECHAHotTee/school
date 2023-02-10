"use strict";
const uni_modules_diyUviewUi_libs_util_emitter = require("../../libs/util/emitter.js");
const uni_modules_diyUviewUi_libs_util_asyncValidator = require("../../libs/util/async-validator.js");
const common_vendor = require("../../../../common/vendor.js");
uni_modules_diyUviewUi_libs_util_asyncValidator.Schema.warning = function() {
};
const _sfc_main = {
  name: "u-form-item",
  mixins: [uni_modules_diyUviewUi_libs_util_emitter.Emitter],
  inject: {
    uForm: {
      default() {
        return null;
      }
    }
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: ""
    },
    borderBottom: {
      type: [String, Boolean],
      default: ""
    },
    labelClass: {
      type: String,
      default: ""
    },
    labelPosition: {
      type: String,
      default: ""
    },
    labelWidth: {
      type: [String, Number],
      default: "5em"
    },
    labelStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    labelAlign: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: ""
    },
    leftIcon: {
      type: String,
      default: ""
    },
    leftIconStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    rightIconStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    required: {
      type: Boolean,
      default: false
    },
    inputAlign: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      initialValue: "",
      validateState: "",
      validateMessage: "",
      errorType: ["message"],
      fieldValue: "",
      parentData: {
        borderBottom: true,
        labelWidth: 90,
        labelPosition: "left",
        labelStyle: {},
        labelAlign: "left",
        inputAlign: "left"
      }
    };
  },
  watch: {
    validateState(val) {
      this.broadcastInputError();
    },
    "uForm.errorType"(val) {
      this.errorType = val;
      this.broadcastInputError();
    }
  },
  computed: {
    uLabelWidth() {
      return this.elLabelPosition == "left" ? this.label === "true" || this.label === "" ? "auto" : this.$u.addUnit(this.elLabelWidth) : "100%";
    },
    showError() {
      return (type) => {
        if (this.errorType.indexOf("none") >= 0)
          return false;
        else if (this.errorType.indexOf(type) >= 0)
          return true;
        else
          return false;
      };
    },
    elLabelWidth() {
      return this.labelWidth != 0 || this.labelWidth != "" ? this.labelWidth : this.parentData.labelWidth ? this.parentData.labelWidth : 90;
    },
    elLabelStyle() {
      return Object.keys(this.labelStyle).length ? this.labelStyle : this.parentData.labelStyle ? this.parentData.labelStyle : {};
    },
    elLabelPosition() {
      return this.labelPosition ? this.labelPosition : this.parentData.labelPosition ? this.parentData.labelPosition : "left";
    },
    elLabelAlign() {
      return this.labelAlign ? this.labelAlign : this.parentData.labelAlign ? this.parentData.labelAlign : "left";
    },
    elBorderBottom() {
      return this.borderBottom !== "" ? this.borderBottom : this.parentData.borderBottom ? this.parentData.borderBottom : true;
    },
    elInputAlign() {
      return this.inputAlign ? this.inputAlign : this.parentData.inputAlign ? this.parentData.inputAlign : "left";
    }
  },
  methods: {
    broadcastInputError() {
      this.broadcast("u-input", "onFormItemError", this.validateState === "error" && this.showError("border"));
    },
    setRules() {
    },
    getRules() {
      let rules = this.parent.rules;
      rules = rules ? rules[this.prop] : [];
      return [].concat(rules || []);
    },
    onFieldBlur() {
      this.validation("blur");
    },
    onFieldChange() {
      this.validation("change");
    },
    getFilteredRule(triggerType = "") {
      let rules = this.getRules();
      if (!triggerType)
        return rules;
      return rules.filter((res) => res.trigger && res.trigger.indexOf(triggerType) !== -1);
    },
    getData(dataObj, name, defaultValue) {
      let newDataObj;
      if (dataObj) {
        newDataObj = JSON.parse(JSON.stringify(dataObj));
        let k = "", d = ".", l = "[", r = "]";
        name = name.replace(/\s+/g, k) + d;
        let tstr = k;
        for (let i = 0; i < name.length; i++) {
          let theChar = name.charAt(i);
          if (theChar != d && theChar != l && theChar != r) {
            tstr += theChar;
          } else if (newDataObj) {
            if (tstr != k)
              newDataObj = newDataObj[tstr];
            tstr = k;
          }
        }
      }
      if (typeof newDataObj === "undefined" && typeof defaultValue !== "undefined")
        newDataObj = defaultValue;
      return newDataObj;
    },
    setData(dataObj, name, value) {
      let dataValue;
      if (typeof value === "object") {
        dataValue = JSON.parse(JSON.stringify(value));
      } else {
        dataValue = value;
      }
      let regExp = new RegExp("([\\w$]+)|\\[(:\\d)\\]", "g");
      const patten = name.match(regExp);
      for (let i = 0; i < patten.length - 1; i++) {
        let keyName = patten[i];
        if (typeof dataObj[keyName] !== "object")
          dataObj[keyName] = {};
        dataObj = dataObj[keyName];
      }
      dataObj[patten[patten.length - 1]] = dataValue;
    },
    validation(trigger, callback = () => {
    }) {
      this.fieldValue = this.getData(this.parent.model, this.prop);
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        return callback("");
      }
      this.validateState = "validating";
      let validator = new uni_modules_diyUviewUi_libs_util_asyncValidator.Schema({
        [this.prop]: rules
      });
      validator.validate({
        [this.prop]: this.fieldValue
      }, {
        firstFields: true
      }, (errors, fields) => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";
        let field = errors ? errors[0].field : "";
        callback(this.validateMessage, {
          state: this.validateState,
          key: field,
          msg: this.validateMessage
        });
      });
    },
    resetField() {
      this.setData(this.parent.model, this.prop, this.initialValue);
      this.validateState = "success";
    }
  },
  mounted() {
    this.parent = this.$u.$parent.call(this, "u-form");
    if (this.parent) {
      Object.keys(this.parentData).map((key) => {
        this.parentData[key] = this.parent[key];
      });
      if (this.prop) {
        this.parent.fields.push(this);
        this.errorType = this.parent.errorType;
        this.initialValue = this.fieldValue;
        this.$nextTick(() => {
          this.setRules();
        });
      }
    }
  },
  beforeUnmount() {
    if (this.parent && this.prop) {
      this.parent.fields.map((item, index) => {
        if (item === this)
          this.parent.fields.splice(index, 1);
      });
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
    a: $props.label
  }, $props.label ? common_vendor.e({
    b: $props.required || $props.leftIcon || $props.label
  }, $props.required || $props.leftIcon || $props.label ? common_vendor.e({
    c: $props.required
  }, $props.required ? {} : {}, {
    d: $props.leftIcon
  }, $props.leftIcon ? {
    e: common_vendor.p({
      name: $props.leftIcon,
      ["custom-style"]: $props.leftIconStyle
    })
  } : {}, {
    f: common_vendor.t($props.label),
    g: common_vendor.s($options.elLabelStyle),
    h: common_vendor.s({
      "justify-content": $options.elLabelAlign == "left" ? "flex-start" : $options.elLabelAlign == "center" ? "center" : "flex-end"
    }),
    i: common_vendor.n($props.labelClass)
  }) : {}, {
    j: $options.uLabelWidth,
    k: $options.elLabelPosition == "left" ? 0 : "10rpx"
  }) : {}, {
    l: common_vendor.s($options.elLabelPosition == "left" && $options.elInputAlign == "right" ? "text-align:right;display: inline-block;line-height:initial;" : ""),
    m: _ctx.$slots.right || $props.rightIcon
  }, _ctx.$slots.right || $props.rightIcon ? common_vendor.e({
    n: $props.rightIcon
  }, $props.rightIcon ? {
    o: common_vendor.p({
      ["custom-style"]: $props.rightIconStyle,
      name: $props.rightIcon
    })
  } : {}) : {}, {
    p: $options.elLabelPosition == "left" ? "row" : "column",
    q: $data.validateState === "error" && $options.showError("message")
  }, $data.validateState === "error" && $options.showError("message") ? {
    r: common_vendor.t($data.validateMessage),
    s: $options.elLabelPosition == "left" ? "calc(" + _ctx.$u.addUnit($options.elLabelWidth) + " + 24rpx)" : "0",
    t: $options.elInputAlign == "right" ? "right" : "left"
  } : {}, {
    v: $options.elBorderBottom ? 1 : "",
    w: $data.validateState === "error" && $options.showError("border-bottom") ? 1 : ""
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e2d0cb75"], ["__file", "C:/Users/Pipik/Downloads/uniapp-school (1)/uni_modules/diy-uview-ui/components/u-form-item/u-form-item.vue"]]);
wx.createComponent(Component);
