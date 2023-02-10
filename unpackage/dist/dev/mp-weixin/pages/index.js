"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      globalOption: {},
      globalData: {},
      tabsDatas: [
        { text: `\u5165\u5B66\u529E\u7406`, icon: `` },
        { text: `\u6821\u56ED\u6307\u5357`, icon: `` },
        { text: `\u793E\u56E2\u98CE\u91C7`, icon: `` },
        { text: `\u52E4\u5DE5\u52A9\u5B66`, icon: `` }
      ],
      tabsIndex: 0,
      inputFocus: false,
      input: "",
      showSct: false,
      sctDatas: [
        { value: "1", label: "\u7537" },
        { value: "2", label: "\u5973" }
      ],
      sctIndex: 0,
      sct: "1",
      sctLabel: "\u7537",
      showSct1: false,
      sct1Datas: [
        { value: "1", label: "\u7406\u5B66\u9662" },
        { value: "2", label: "\u5DE5\u5B66\u9662" },
        { value: "3", label: "\u5546\u5B66\u9662" }
      ],
      sct1Index: 0,
      sct1: "1",
      sct1Label: "\u7406\u5B66\u9662",
      input1Focus: false,
      input1: "",
      input3Focus: false,
      input3: "",
      form1Data: {
        input2Focus: false,
        showSct2: false,
        sct2Datas: [
          { value: "1", label: "\u7537" },
          { value: "2", label: "\u5973" }
        ],
        showSct3: false,
        sct3Datas: [
          { value: "1", label: "2020\u7EA7" },
          { value: "2", label: "2021\u7EA7" },
          { value: "3", label: "2022\u7EA7" },
          { value: "4", label: "2023\u7EA7" }
        ],
        showSct4: false,
        sct4Datas: [
          { value: "1", label: "\u7406\u5B66\u9662" },
          { value: "2", label: "\u6587\u5B66\u9662" },
          { value: "3", label: "\u5546\u5B66\u9662" }
        ],
        showSct5: false,
        sct5Datas: [
          { value: "1", label: "\u9009\u9879\u4E00" },
          { value: "2", label: "\u9009\u9879\u4E8C" },
          { value: "3", label: "\u9009\u9879\u4E09" }
        ]
      },
      form1: {
        input2: "",
        sct2Index: 0,
        sct2: "1",
        sct2Label: "\u7537",
        sct3Index: 0,
        sct3: "1",
        sct3Label: "2020\u7EA7",
        sct4Index: 0,
        sct4: "1",
        sct4Label: "\u7406\u5B66\u9662",
        sct5Index: 0,
        sct5: "1",
        sct5Label: "\u9009\u9879\u4E00",
        textarea: ""
      },
      form1Rules: {
        textarea: [
          {
            trigger: ["change", "blur"],
            required: true,
            message: "\u4E0D\u80FD\u4E3A\u7A7A\u54DF"
          }
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
    (_a = this.$refs.form1Ref) == null ? void 0 : _a.setRules(this.form1Rules);
  },
  methods: {
    async init() {
    },
    changeTabs(evt) {
      let { index } = evt.currentTarget.dataset;
      if (index == this.tabsIndex)
        return;
      this.setData({
        tabsIndex: index
      });
    },
    changeSct(evt) {
      evt.map((val, index) => {
        this.sctLabel = val.label;
        this.sct = String(val.value);
        this.sctIndex = val.index;
      });
    },
    changeSct1(evt) {
      evt.map((val, index) => {
        this.sct1Label = val.label;
        this.sct1 = String(val.value);
        this.sct1Index = val.index;
      });
    },
    async submitForm1(e) {
      let valid = await this.$refs.form1Ref.validate();
      if (valid) {
        this.form1;
        {
          this.showToast("\u8BF7\u5148\u914D\u7F6E\u8868\u5355\u63D0\u4EA4\u5730\u5740", "none");
          return false;
        }
      } else {
        console.log("\u9A8C\u8BC1\u5931\u8D25");
      }
    },
    changeForm1Sct2(evt) {
      evt.map((val, index) => {
        this.form1.sct2Label = val.label;
        this.form1.sct2 = String(val.value);
        this.form1.sct2Index = val.index;
      });
    },
    changeForm1Sct3(evt) {
      evt.map((val, index) => {
        this.form1.sct3Label = val.label;
        this.form1.sct3 = String(val.value);
        this.form1.sct3Index = val.index;
      });
    },
    changeForm1Sct4(evt) {
      evt.map((val, index) => {
        this.form1.sct4Label = val.label;
        this.form1.sct4 = String(val.value);
        this.form1.sct4Index = val.index;
      });
    },
    changeForm1Sct5(evt) {
      evt.map((val, index) => {
        this.form1.sct5Label = val.label;
        this.form1.sct5 = String(val.value);
        this.form1.sct5Index = val.index;
      });
    }
  }
};
if (!Array) {
  const _easycom_diy_noticebar2 = common_vendor.resolveComponent("diy-noticebar");
  const _easycom_u_input2 = common_vendor.resolveComponent("u-input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_select2 = common_vendor.resolveComponent("u-select");
  const _easycom_u_form2 = common_vendor.resolveComponent("u-form");
  (_easycom_diy_noticebar2 + _easycom_u_input2 + _easycom_u_form_item2 + _easycom_u_select2 + _easycom_u_form2)();
}
const _easycom_diy_noticebar = () => "../components/diy-noticebar/diy-noticebar.js";
const _easycom_u_input = () => "../uni_modules/diy-uview-ui/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../uni_modules/diy-uview-ui/components/u-form-item/u-form-item.js";
const _easycom_u_select = () => "../uni_modules/diy-uview-ui/components/u-select/u-select.js";
const _easycom_u_form = () => "../uni_modules/diy-uview-ui/components/u-form/u-form.js";
if (!Math) {
  (_easycom_diy_noticebar + _easycom_u_input + _easycom_u_form_item + _easycom_u_select + _easycom_u_form)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.tabsDatas, (item, index, i0) => {
      return common_vendor.e({
        a: item.icon
      }, item.icon ? {
        b: common_vendor.n(item.icon)
      } : {}, {
        c: common_vendor.t(item.text),
        d: common_vendor.n(index == $data.tabsIndex ? " bg-black radius" : ""),
        e: index,
        f: common_vendor.o((...args) => $options.changeTabs && $options.changeTabs(...args), index),
        g: index
      });
    }),
    b: $data.tabsIndex == 0
  }, $data.tabsIndex == 0 ? {
    c: common_vendor.p({
      color: "#1f19df",
      bgColor: "#fff",
      leftIcon: "diy-icon-notification"
    }),
    d: common_vendor.o(($event) => $data.input = $event),
    e: common_vendor.p({
      focus: $data.inputFocus,
      placeholder: "\u8BF7\u8F93\u5165\u63D0\u793A\u4FE1\u606F",
      type: "text",
      modelValue: $data.input
    }),
    f: common_vendor.p({
      label: "\u59D3\u540D",
      prop: "input"
    }),
    g: common_vendor.o(($event) => $data.showSct = true),
    h: common_vendor.o(($event) => $data.sctLabel = $event),
    i: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9",
      type: "select",
      modelValue: $data.sctLabel
    }),
    j: common_vendor.p({
      label: "\u6027\u522B",
      prop: "sct"
    }),
    k: common_vendor.o($options.changeSct),
    l: common_vendor.o(($event) => $data.showSct = $event),
    m: common_vendor.p({
      mode: "single-column",
      valueName: "value",
      labelName: "label",
      list: $data.sctDatas,
      defaultValue: [$data.sctIndex],
      modelValue: $data.showSct
    }),
    n: common_vendor.o(($event) => $data.showSct1 = true),
    o: common_vendor.o(($event) => $data.sct1Label = $event),
    p: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9",
      type: "select",
      modelValue: $data.sct1Label
    }),
    q: common_vendor.p({
      label: "\u9662\u7CFB",
      prop: "sct1"
    }),
    r: common_vendor.o($options.changeSct1),
    s: common_vendor.o(($event) => $data.showSct1 = $event),
    t: common_vendor.p({
      mode: "single-column",
      valueName: "value",
      labelName: "label",
      list: $data.sct1Datas,
      defaultValue: [$data.sct1Index],
      modelValue: $data.showSct1
    }),
    v: common_vendor.o(($event) => $data.input1 = $event),
    w: common_vendor.p({
      focus: $data.input1Focus,
      placeholder: "\u4E0D\u8D85\u8FC710\u4E2A\u5B57",
      type: "text",
      modelValue: $data.input1
    }),
    x: common_vendor.p({
      label: "\u4E13\u4E1A",
      prop: "input1"
    }),
    y: common_vendor.o(($event) => $data.input3 = $event),
    z: common_vendor.p({
      focus: $data.input3Focus,
      placeholder: "10\u4F4D\u6570\u5B57",
      type: "text",
      modelValue: $data.input3
    }),
    A: common_vendor.p({
      label: "\u5B66\u53F7",
      prop: "input3"
    })
  } : {}, {
    B: $data.tabsIndex == 1
  }, $data.tabsIndex == 1 ? {} : {}, {
    C: $data.tabsIndex == 2
  }, $data.tabsIndex == 2 ? {} : {}, {
    D: $data.tabsIndex == 3
  }, $data.tabsIndex == 3 ? {
    E: common_vendor.o(($event) => $data.form1.input2 = $event),
    F: common_vendor.p({
      focus: $data.form1Data.input2Focus,
      placeholder: "",
      type: "text",
      modelValue: $data.form1.input2
    }),
    G: common_vendor.p({
      label: "\u59D3\u540D",
      prop: "input2"
    }),
    H: common_vendor.o(($event) => $data.form1Data.showSct2 = true),
    I: common_vendor.o(($event) => $data.form1.sct2Label = $event),
    J: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9",
      type: "select",
      modelValue: $data.form1.sct2Label
    }),
    K: common_vendor.p({
      label: "\u6027\u522B",
      prop: "sct2"
    }),
    L: common_vendor.o($options.changeForm1Sct2),
    M: common_vendor.o(($event) => $data.form1Data.showSct2 = $event),
    N: common_vendor.p({
      mode: "single-column",
      valueName: "value",
      labelName: "label",
      list: $data.form1Data.sct2Datas,
      defaultValue: [$data.form1.sct2Index],
      modelValue: $data.form1Data.showSct2
    }),
    O: common_vendor.o(($event) => $data.form1Data.showSct3 = true),
    P: common_vendor.o(($event) => $data.form1.sct3Label = $event),
    Q: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9",
      type: "select",
      modelValue: $data.form1.sct3Label
    }),
    R: common_vendor.p({
      label: "\u5E74\u7EA7",
      prop: "sct3"
    }),
    S: common_vendor.o($options.changeForm1Sct3),
    T: common_vendor.o(($event) => $data.form1Data.showSct3 = $event),
    U: common_vendor.p({
      mode: "single-column",
      valueName: "value",
      labelName: "label",
      list: $data.form1Data.sct3Datas,
      defaultValue: [$data.form1.sct3Index],
      modelValue: $data.form1Data.showSct3
    }),
    V: common_vendor.o(($event) => $data.form1Data.showSct4 = true),
    W: common_vendor.o(($event) => $data.form1.sct4Label = $event),
    X: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9",
      type: "select",
      modelValue: $data.form1.sct4Label
    }),
    Y: common_vendor.p({
      label: "\u9662\u7CFB",
      prop: "sct4"
    }),
    Z: common_vendor.o($options.changeForm1Sct4),
    aa: common_vendor.o(($event) => $data.form1Data.showSct4 = $event),
    ab: common_vendor.p({
      mode: "single-column",
      valueName: "value",
      labelName: "label",
      list: $data.form1Data.sct4Datas,
      defaultValue: [$data.form1.sct4Index],
      modelValue: $data.form1Data.showSct4
    }),
    ac: common_vendor.o(($event) => $data.form1Data.showSct5 = true),
    ad: common_vendor.o(($event) => $data.form1.sct5Label = $event),
    ae: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9",
      type: "select",
      modelValue: $data.form1.sct5Label
    }),
    af: common_vendor.p({
      label: "\u5DE5\u4F5C\u610F\u5411",
      prop: "sct5"
    }),
    ag: common_vendor.o($options.changeForm1Sct5),
    ah: common_vendor.o(($event) => $data.form1Data.showSct5 = $event),
    ai: common_vendor.p({
      mode: "single-column",
      valueName: "value",
      labelName: "label",
      list: $data.form1Data.sct5Datas,
      defaultValue: [$data.form1.sct5Index],
      modelValue: $data.form1Data.showSct5
    }),
    aj: common_vendor.o(($event) => $data.form1.textarea = $event),
    ak: common_vendor.p({
      autoHeight: false,
      maxlength: "200",
      height: "60px",
      placeholder: "200\u5B57\u4EE5\u5185",
      type: "textarea",
      modelValue: $data.form1.textarea
    }),
    al: common_vendor.p({
      required: true,
      label: "\u81EA\u6211\u4ECB\u7ECD",
      prop: "textarea"
    }),
    am: common_vendor.sr("form1Ref", "02281a80-13"),
    an: common_vendor.p({
      model: $data.form1,
      rules: $data.form1Rules,
      errorType: ["message", "toast"]
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-02281a80"], ["__file", "C:/Users/Pipik/Downloads/uniapp-school (1)/pages/index.vue"]]);
wx.createPage(MiniProgramPage);
