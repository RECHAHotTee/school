"use strict";
const uni_modules_diyUviewUi_libs_util_emitter = require("../../libs/util/emitter.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-radio-group",
  emits: ["update:modelValue", "input", "change"],
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
    disabled: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: "#19be6b"
    },
    size: {
      type: [String, Number],
      default: 34
    },
    labelDisabled: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      default: "circle"
    },
    iconSize: {
      type: [String, Number],
      default: 20
    },
    width: {
      type: [String, Number],
      default: "auto"
    },
    wrap: {
      type: Boolean,
      default: false
    },
    wrapClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      uFromData: {
        inputAlign: "left"
      }
    };
  },
  created() {
    this.children = [];
  },
  mounted() {
    let parent = this.$u.$parent.call(this, "u-form");
    if (parent) {
      Object.keys(this.uFromData).map((key) => {
        this.uFromData[key] = parent[key];
      });
    }
  },
  watch: {
    parentData() {
      if (this.children.length) {
        this.children.map((child) => {
          typeof child.updateParentData == "function" && child.updateParentData();
        });
      }
    }
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    parentData() {
      return [
        this.value,
        this.modelValue,
        this.disabled,
        this.activeColor,
        this.size,
        this.labelDisabled,
        this.shape,
        this.iconSize,
        this.width,
        this.wrap
      ];
    }
  },
  methods: {
    setValue(val) {
      this.children.map((child) => {
        if (child.parentData.value != val)
          child.parentData.value = "";
      });
      this.$emit("input", val);
      this.$emit("update:modelValue", val);
      this.$emit("change", val);
      setTimeout(() => {
        this.dispatch("u-form-item", "onFieldChange", val);
      }, 60);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($data.uFromData.inputAlign == "right" ? "flex-end" : ""),
    b: common_vendor.n($props.wrapClass)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-abc7d820"], ["__file", "C:/Users/Pipik/Downloads/uniapp-school (1)/uni_modules/diy-uview-ui/components/u-radio-group/u-radio-group.vue"]]);
wx.createComponent(Component);
