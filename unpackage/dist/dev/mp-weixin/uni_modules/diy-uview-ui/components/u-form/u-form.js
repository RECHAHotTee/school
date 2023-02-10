"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-form",
  props: {
    model: {
      type: Object,
      default() {
        return {};
      }
    },
    errorType: {
      type: Array,
      default() {
        return ["message", "toast"];
      }
    },
    borderBottom: {
      type: Boolean,
      default: true
    },
    labelPosition: {
      type: String,
      default: "left"
    },
    labelWidth: {
      type: [String, Number],
      default: 90
    },
    labelAlign: {
      type: String,
      default: "left"
    },
    labelStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    inputAlign: {
      type: String,
      default: "left"
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      uForm: this
    };
  },
  data() {
    return {
      rules: {}
    };
  },
  created() {
    this.fields = [];
  },
  methods: {
    setRules(rules) {
      this.rules = rules;
    },
    resetFields() {
      this.fields.map((field) => {
        field.resetField();
      });
    },
    validate(callback) {
      return new Promise((resolve) => {
        let valid = true;
        let count = 0;
        let errorArr = [];
        let errorObjArr = [];
        this.fields.map((field) => {
          field.validation("", (errorMsg, errObj) => {
            if (errorMsg) {
              valid = false;
              errorArr.push(errorMsg);
              errorObjArr.push(errObj);
            }
            if (++count === this.fields.length) {
              resolve(valid, errorObjArr[0]);
              if (this.errorType.indexOf("none") === -1 && this.errorType.indexOf("toast") >= 0 && errorArr.length) {
                this.$u.toast(errorArr[0]);
              }
              if (typeof callback == "function")
                callback(valid, errorObjArr[0]);
            }
          });
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-590dd7e2"], ["__file", "C:/Users/Pipik/Downloads/uniapp-school (1)/uni_modules/diy-uview-ui/components/u-form/u-form.vue"]]);
wx.createComponent(Component);
