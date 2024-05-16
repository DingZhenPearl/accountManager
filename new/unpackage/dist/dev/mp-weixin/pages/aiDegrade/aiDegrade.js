"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInput: "",
      messages: [],
      id: ""
    };
  },
  onLoad() {
    this.init();
  },
  methods: {
    async init() {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      try {
        const initial = await this.refresh();
        this.messages = [];
        this.messages.push({
          role: "assistant",
          content: initial.choices[0].message.content
        });
        this.id = initial.request_id;
        console.log(initial.request_id);
      } catch (error) {
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    async refresh() {
      const response = await common_vendor.index.request({
        url: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
        method: "POST",
        data: {
          "model": "glm-4",
          // 模型名称
          "messages": [
            {
              "role": "system",
              "content": "你是一个精通各种商品的大师，你可以为帮助用户选择没那么贵但同样满足生活需求的商品来实现消费降级，当用户发送一项商品时，你为他提供消费降级后的商品。"
            },
            {
              "role": "user",
              "content": "你好"
            }
          ]
        },
        header: {
          "Content-Type": "application/json",
          "Authorization": "Bearer b161ab74893310f851cf1773d822657d.iVHlt3Ymx27C1Iax"
        }
      });
      console.log(response.data.request_id);
      return response.data;
    },
    async sendQuestion() {
      if (this.userInput.trim() === "") {
        return;
      }
      this.messages.push({
        role: "user",
        content: this.userInput
      });
      var inputed = this.userInput;
      this.userInput = "";
      const aiReply = await this.getAIReply(inputed);
      this.messages.push({
        role: "assistant",
        content: aiReply
      });
    },
    async getAIReply(question) {
      const response = await common_vendor.index.request({
        url: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
        method: "POST",
        data: {
          "model": "glm-4",
          // 模型名称
          "messages": [
            {
              "role": "system",
              "content": "你是一个精通各种商品的大师，你可以为帮助用户选择没那么贵但同样满足生活需求的商品来实现消费降级，当用户发送一项商品时，你为他提供消费降级后的商品。"
            },
            {
              "role": "user",
              "content": question
            }
          ],
          "request_id": this.id
          // 包含之前的request_id
        },
        header: {
          "Content-Type": "application/json",
          "Authorization": "Bearer b161ab74893310f851cf1773d822657d.iVHlt3Ymx27C1Iax"
        }
      });
      console.log(response.data);
      console.log(response.data.request_id);
      return response.data.choices[0].message.content;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.messages, (message, index, i0) => {
      return common_vendor.e({
        a: message.role === "assistant"
      }, message.role === "assistant" ? {} : {}, {
        b: common_vendor.t(message.content),
        c: common_vendor.n(message.role),
        d: message.role === "user"
      }, message.role === "user" ? {} : {}, {
        e: index
      });
    }),
    b: common_vendor.o((...args) => $options.init && $options.init(...args)),
    c: common_vendor.o((...args) => $options.sendQuestion && $options.sendQuestion(...args)),
    d: $data.userInput,
    e: common_vendor.o(($event) => $data.userInput = $event.detail.value),
    f: common_vendor.o((...args) => $options.sendQuestion && $options.sendQuestion(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Download/HBuilderX.3.99.2023122611/projects/new/pages/aiDegrade/aiDegrade.vue"]]);
wx.createPage(MiniProgramPage);
