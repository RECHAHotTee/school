"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      globalOption: {},
      globalData: {},
      formRules: {
        usename: [
          {
            trigger: ["change", "blur"],
            required: true,
            message: "\u8D26\u6237\u4E0D\u80FD\u4E3A\u7A7A"
          }
        ]
      },
      form: {
        usename: "",
        password: "",
        radio: "1"
      },
      formData: {
        usenameFocus: false,
        passwordFocus: false,
        radioDatas: [
          { value: "1", label: "\u7BA1\u7406\u5458", checked: true },
          { value: "2", label: "\u5B66\u751F", checked: false }
        ]
      }
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
  onReady() {
    var _a;
    (_a = this.$refs.formRef) == null ? void 0 : _a.setRules(this.formRules);
  },
  methods: {
    async init() {
    },
    async submitForm(e) {
      let valid = await this.$refs.formRef.validate();
      if (valid) {
        this.form;
        {
          this.showToast("\u8BF7\u5148\u914D\u7F6E\u8868\u5355\u63D0\u4EA4\u5730\u5740", "none");
          return false;
        }
      } else {
        console.log("\u9A8C\u8BC1\u5931\u8D25");
      }
    },
    changeFormRadio(evt) {
    }
  }
};
if (!Array) {
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_radio2 = common_vendor.resolveComponent("u-radio");
  const _easycom_u_radio_group2 = common_vendor.resolveComponent("u-radio-group");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  (_easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_radio2 + _easycom_u_radio_group2 + _easycom_u_form2)();
}
const _easycom_u_input = () => "../../uni_modules/diy-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../uni_modules/diy-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_radio = () => "../../uni_modules/diy-uview-ui/components/u-radio/u-radio.js";
const _easycom_u_radio_group = () => "../../uni_modules/diy-uview-ui/components/u-radio-group/u-radio-group.js";
const _easycom_u_form = () => "../../uni_modules/diy-uview-ui/components/u-form/u-form.js";
if (!Math) {
  (_easycom_u_input + _easycom_u_form_item + _easycom_u_radio + _easycom_u_radio_group + _easycom_u_form)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.form.usename = $event),
    b: common_vendor.p({
      focus: $data.formData.usenameFocus,
      placeholder: "\u8BF7\u8F93\u5165\u767B\u5F55\u8D26\u6237",
      type: "text",
      modelValue: $data.form.usename
    }),
    c: common_vendor.p({
      required: true,
      label: "\u8D26\u6237",
      labelPosition: "top",
      prop: "usename"
    }),
    d: common_vendor.o(($event) => $data.form.password = $event),
    e: common_vendor.p({
      focus: $data.formData.passwordFocus,
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      type: "password",
      ["password-icon"]: true,
      modelValue: $data.form.password
    }),
    f: common_vendor.p({
      label: "\u5BC6\u7801",
      labelPosition: "top",
      prop: "password"
    }),
    g: common_vendor.f($data.formData.radioDatas, (radioitem, radioindex, i0) => {
      return {
        a: common_vendor.t(radioitem.label),
        b: radioindex,
        c: "e4e4508d-7-" + i0 + ",e4e4508d-6",
        d: common_vendor.p({
          shape: "circle",
          name: radioitem.value
        })
      };
    }),
    h: common_vendor.o($options.changeFormRadio),
    i: common_vendor.o(($event) => $data.form.radio = $event),
    j: common_vendor.p({
      wrapClass: " justify-between",
      activeColor: "#39b54a",
      modelValue: $data.form.radio
    }),
    k: common_vendor.p({
      labelPosition: "top",
      prop: "radio"
    }),
    l: common_vendor.sr("formRef", "e4e4508d-0"),
    m: common_vendor.p({
      model: $data.form,
      rules: $data.formRules,
      errorType: ["message", "toast"]
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "C:/Users/Pipik/Downloads/uniapp-school (1)/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
