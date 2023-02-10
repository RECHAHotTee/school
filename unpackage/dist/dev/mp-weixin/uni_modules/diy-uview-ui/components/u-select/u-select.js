"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  emits: ["update:modelValue", "input", "confirm"],
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    border: {
      type: Boolean,
      default: true
    },
    cancelColor: {
      type: String,
      default: "#606266"
    },
    confirmColor: {
      type: String,
      default: "#19be6b"
    },
    zIndex: {
      type: [String, Number],
      default: 0
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: false
    },
    maskCloseAble: {
      type: Boolean,
      default: true
    },
    defaultValue: {
      type: Array,
      default() {
        return [0];
      }
    },
    mode: {
      type: String,
      default: "single-column"
    },
    valueName: {
      type: String,
      default: "value"
    },
    labelName: {
      type: String,
      default: "label"
    },
    childName: {
      type: String,
      default: "children"
    },
    title: {
      type: String,
      default: ""
    },
    cancelText: {
      type: String,
      default: "\u53D6\u6D88"
    },
    confirmText: {
      type: String,
      default: "\u786E\u8BA4"
    },
    blur: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      popupValue: false,
      defaultSelector: [0],
      columnData: [],
      selectValue: [],
      lastSelectIndex: [],
      columnNum: 0,
      moving: false
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (val)
          setTimeout(() => this.init(), 10);
        this.popupValue = val;
      }
    },
    modelValue: {
      immediate: true,
      handler(val) {
        if (val)
          setTimeout(() => this.init(), 10);
        this.popupValue = val;
      }
    }
  },
  computed: {
    uZIndex() {
      return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
    }
  },
  methods: {
    pickstart() {
      this.moving = true;
    },
    pickend() {
      this.moving = false;
    },
    init() {
      this.setColumnNum();
      this.setDefaultSelector();
      this.setColumnData();
      this.setSelectValue();
    },
    setDefaultSelector() {
      this.defaultSelector = this.defaultValue.length == this.columnNum ? this.defaultValue : Array(this.columnNum).fill(0);
      this.lastSelectIndex = this.$u.deepClone(this.defaultSelector);
    },
    setColumnNum() {
      if (this.mode == "single-column")
        this.columnNum = 1;
      else if (this.mode == "mutil-column")
        this.columnNum = this.list.length;
      else if (this.mode == "mutil-column-auto") {
        let num = 1;
        let column = this.list;
        while (column[0][this.childName]) {
          column = column[0] ? column[0][this.childName] : {};
          num++;
        }
        this.columnNum = num;
      }
    },
    setColumnData() {
      let data = [];
      this.selectValue = [];
      if (this.mode == "mutil-column-auto") {
        let column = this.list[this.defaultSelector.length ? this.defaultSelector[0] : 0];
        for (let i = 0; i < this.columnNum; i++) {
          if (i == 0) {
            data[i] = this.list;
            column = column[this.childName];
          } else {
            data[i] = column;
            column = column[this.defaultSelector[i]][this.childName];
          }
        }
      } else if (this.mode == "single-column") {
        data[0] = this.list;
      } else {
        data = this.list;
      }
      this.columnData = data;
    },
    setSelectValue() {
      let tmp = null;
      for (let i = 0; i < this.columnNum; i++) {
        if (this.defaultSelector[i] == -1) {
          this.defaultSelector[i] = 0;
        }
        tmp = this.columnData[i][this.defaultSelector[i]];
        let data = {
          value: tmp ? tmp[this.valueName] : "",
          label: tmp ? tmp[this.labelName] : ""
        };
        if (tmp && tmp.extra)
          data.extra = tmp.extra;
        data.index = this.defaultSelector[i];
        this.selectValue.push(data);
      }
    },
    columnChange(e) {
      let index = null;
      let columnIndex = e.detail.value;
      this.selectValue = [];
      if (this.mode == "mutil-column-auto") {
        this.lastSelectIndex.map((val, idx) => {
          if (val != columnIndex[idx])
            index = idx;
        });
        this.defaultSelector = columnIndex;
        for (let i = index + 1; i < this.columnNum; i++) {
          this.columnData[i] = this.columnData[i - 1][i - 1 == index ? columnIndex[index] : 0][this.childName];
          this.defaultSelector[i] = 0;
        }
        columnIndex.map((item, index2) => {
          let data = this.columnData[index2][columnIndex[index2]];
          let tmp = {
            value: data ? data[this.valueName] : null,
            label: data ? data[this.labelName] : null
          };
          if (data && data.extra !== void 0)
            tmp.extra = data.extra;
          tmp.index = columnIndex[index2];
          this.selectValue.push(tmp);
        });
        this.lastSelectIndex = columnIndex;
      } else if (this.mode == "single-column") {
        let data = this.columnData[0][columnIndex[0]];
        let tmp = {
          value: data ? data[this.valueName] : null,
          label: data ? data[this.labelName] : null
        };
        if (data && data.extra !== void 0)
          tmp.extra = data.extra;
        tmp.index = columnIndex[0];
        this.selectValue.push(tmp);
      } else if (this.mode == "mutil-column") {
        columnIndex.map((item, index2) => {
          let data = this.columnData[index2][columnIndex[index2]];
          let tmp = {
            value: data ? data[this.valueName] : null,
            label: data ? data[this.labelName] : null
          };
          if (data && data.extra !== void 0)
            tmp.extra = data.extra;
          tmp.index = columnIndex[index2];
          this.selectValue.push(tmp);
        });
      }
    },
    close() {
      this.$emit("input", false);
      this.$emit("update:modelValue", false);
    },
    getResult(event = null) {
      if (this.moving)
        return;
      if (event)
        this.$emit(event, this.selectValue);
      this.close();
    },
    selectHandler() {
      this.$emit("click");
    }
  }
};
if (!Array) {
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  _easycom_u_popup2();
}
const _easycom_u_popup = () => "../u-popup/u-popup.js";
if (!Math) {
  _easycom_u_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.cancelText),
    b: $props.cancelColor,
    c: common_vendor.o(($event) => $options.getResult("cancel")),
    d: common_vendor.t($props.title),
    e: common_vendor.t($props.confirmText),
    f: $data.moving ? $props.cancelColor : $props.confirmColor,
    g: common_vendor.o(() => {
    }),
    h: common_vendor.o(($event) => $options.getResult("confirm")),
    i: common_vendor.o(() => {
    }),
    j: common_vendor.f($data.columnData, (item, index, i0) => {
      return {
        a: common_vendor.f(item, (item1, index1, i1) => {
          return {
            a: common_vendor.t(item1[$props.labelName]),
            b: index1
          };
        }),
        b: index
      };
    }),
    k: common_vendor.o((...args) => $options.columnChange && $options.columnChange(...args)),
    l: $data.defaultSelector,
    m: common_vendor.o((...args) => $options.pickstart && $options.pickstart(...args)),
    n: common_vendor.o((...args) => $options.pickend && $options.pickend(...args)),
    o: common_vendor.o($options.close),
    p: common_vendor.o(($event) => $data.popupValue = $event),
    q: common_vendor.p({
      blur: $props.blur,
      maskCloseAble: $props.maskCloseAble,
      mode: "bottom",
      popup: false,
      length: "auto",
      safeAreaInsetBottom: $props.safeAreaInsetBottom,
      ["z-index"]: $options.uZIndex,
      modelValue: $data.popupValue
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-42c5a2b1"], ["__file", "C:/Users/Pipik/Downloads/uniapp-school (1)/uni_modules/diy-uview-ui/components/u-select/u-select.vue"]]);
wx.createComponent(Component);
