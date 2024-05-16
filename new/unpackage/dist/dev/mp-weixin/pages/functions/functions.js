"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    ClickToAiDegrade() {
      console.log("按钮被点击");
      common_vendor.index.navigateTo({
        // 保留当前页面，跳转到应用内的某个页面
        url: "/pages/aiDegrade/aiDegrade"
      });
    },
    ClickToAiBudget() {
      console.log("按钮被点击");
      common_vendor.index.navigateTo({
        // 保留当前页面，跳转到应用内的某个页面
        url: "/pages/aiBudget/aiBudget"
      });
    },
    ClickToPrizeComparison() {
      console.log("按钮被点击");
      common_vendor.index.navigateTo({
        // 保留当前页面，跳转到应用内的某个页面
        url: "/pages/prizeComparison/prizeComparison"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.ClickToAiDegrade()),
    b: common_vendor.o(($event) => $options.ClickToAiBudget()),
    c: common_vendor.o(($event) => $options.ClickToPrizeComparison()())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Download/HBuilderX.3.99.2023122611/projects/new/pages/functions/functions.vue"]]);
wx.createPage(MiniProgramPage);
