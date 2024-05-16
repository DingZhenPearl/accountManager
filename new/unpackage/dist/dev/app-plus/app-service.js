if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$7 = {
    data() {
      return {
        title: "Hello"
      };
    },
    methods: {}
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "shurukuang" }, [
      vue.createElementVNode("view", { class: "jine" }, [
        vue.createElementVNode("input", {
          class: "jinein",
          type: "number"
        }),
        vue.createTextVNode(" 金额 ")
      ]),
      vue.createElementVNode("view", { class: "leibie" }, [
        vue.createElementVNode("input", { class: "leibiein" }),
        vue.createTextVNode("类别 ")
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__file", "D:/Download/HBuilderX.3.99.2023122611/projects/new/pages/index/index.vue"]]);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main$6 = {
    data() {
      return {
        userInput: "",
        messages: [],
        id: "",
        dynamicWidth: NaN,
        dynamicHeight: NaN
      };
    },
    onLoad() {
      this.fit_size();
      this.init();
    },
    methods: {
      async init() {
        const initial = await this.refresh();
        this.messages = [];
        this.messages.push({
          role: "assistant",
          content: initial.choices[0].message.content
        });
        this.id = initial.request_id;
        formatAppLog("log", "at pages/aiDegrade/aiDegrade.vue:55", initial.request_id);
      },
      async refresh() {
        uni.showLoading({
          title: "加载中"
        });
        try {
          const response = await uni.request({
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
          formatAppLog("log", "at pages/aiDegrade/aiDegrade.vue:89", response.data.request_id);
          return response.data;
        } catch (error) {
        } finally {
          uni.hideLoading();
        }
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
        uni.showLoading({
          title: "加载中"
        });
        try {
          const response = await uni.request({
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
          formatAppLog("log", "at pages/aiDegrade/aiDegrade.vue:161", response.data);
          formatAppLog("log", "at pages/aiDegrade/aiDegrade.vue:162", response.data.request_id);
          return response.data.choices[0].message.content;
        } catch (error) {
        } finally {
          uni.hideLoading();
        }
      },
      fit_size() {
        const systemInfo = uni.getSystemInfoSync();
        this.dynamicHeight = systemInfo.screenHeight / 10;
        this.dynamicWidth = systemInfo.screenHeight / 10 * (systemInfo.screenHeight / systemInfo.screenWidth);
        formatAppLog("log", "at pages/aiDegrade/aiDegrade.vue:180", this.dynamicHeight);
        formatAppLog("log", "at pages/aiDegrade/aiDegrade.vue:181", this.dynamicWidth);
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "chat-history" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.messages, (message, index) => {
            return vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: index,
                class: vue.normalizeClass(["message-container", message.role])
              },
              [
                message.role === "assistant" ? (vue.openBlock(), vue.createElementBlock(
                  "image",
                  {
                    key: 0,
                    src: "/static/left2.png",
                    class: "avatar avatar_assistant",
                    style: vue.normalizeStyle({ width: $data.dynamicWidth + "rpx", height: $data.dynamicHeight + "rpx" })
                  },
                  null,
                  4
                  /* STYLE */
                )) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("view", { class: "bubble" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(message.content),
                    1
                    /* TEXT */
                  )
                ]),
                message.role === "user" ? (vue.openBlock(), vue.createElementBlock(
                  "image",
                  {
                    key: 1,
                    src: "/static/left1.png",
                    class: "avatar avatar_user",
                    style: vue.normalizeStyle({ width: $data.dynamicWidth + "rpx", height: $data.dynamicHeight + "rpx" })
                  },
                  null,
                  4
                  /* STYLE */
                )) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "input-container" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.init && $options.init(...args))
        }, "新建对话"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.userInput = $event),
            type: "text",
            placeholder: "输入你的问题...",
            onConfirm: _cache[2] || (_cache[2] = (...args) => $options.sendQuestion && $options.sendQuestion(...args))
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $data.userInput]
        ]),
        vue.createElementVNode("button", {
          onClick: _cache[3] || (_cache[3] = (...args) => $options.sendQuestion && $options.sendQuestion(...args))
        }, "发送")
      ])
    ]);
  }
  const PagesAiDegradeAiDegrade = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__file", "D:/Download/HBuilderX.3.99.2023122611/projects/new/pages/aiDegrade/aiDegrade.vue"]]);
  const _sfc_main$5 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return null;
  }
  const PagesGraphGraph = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__file", "D:/Download/HBuilderX.3.99.2023122611/projects/new/pages/graph/graph.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        title: "登录",
        hasLogin: false,
        hasUserInfo: false,
        userInfo: {}
      };
    },
    methods: {
      showLoginOptions() {
        uni.showActionSheet({
          itemList: ["微信登录", "QQ登录"],
          success: (res) => {
            if (res.tapIndex === 0) {
              this.wechatLogin();
            } else if (res.tapIndex === 1) {
              this.qqLogin();
            }
          },
          fail: (err) => {
            formatAppLog("log", "at pages/user/user.vue:48", "登录选项取消:", err);
          }
        });
      },
      wechatLogin() {
        uni.login({
          provider: "weixin",
          success: (res) => {
            formatAppLog("log", "at pages/user/user.vue:56", "微信登录成功:", res);
            this.hasLogin = true;
            this.getUserInfo("weixin");
          },
          fail: (err) => {
            formatAppLog("log", "at pages/user/user.vue:64", "微信登录失败:", err);
          }
        });
      },
      qqLogin() {
        uni.login({
          provider: "qq",
          success: (res) => {
            formatAppLog("log", "at pages/user/user.vue:72", "QQ登录成功:", res);
            this.hasLogin = true;
            this.getUserInfo("qq");
          },
          fail: (err) => {
            formatAppLog("log", "at pages/user/user.vue:79", "QQ登录失败:", err);
          }
        });
      },
      getUserInfo(provider) {
        uni.getUserInfo({
          provider,
          // 指定提供商
          success: (result) => {
            this.hasUserInfo = true;
            this.userInfo = result.userInfo;
            formatAppLog("log", "at pages/user/user.vue:95", provider + "成功获取信息");
          },
          fail: (error) => {
            formatAppLog("log", "at pages/user/user.vue:98", "获取用户信息失败", error);
            uni.showModal({
              title: "获取用户信息失败",
              content: "请确保已经登录并授权获取用户信息",
              showCancel: false
            });
          }
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_page_head = vue.resolveComponent("page-head");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_page_head, { title: $data.title }, null, 8, ["title"]),
      vue.createElementVNode("view", { class: "uni-padding-wrap" }, [
        vue.createElementVNode("view", { class: "userinfo-container" }, [
          vue.createElementVNode("view", { class: "userinfo-avatar-container" }, [
            $data.hasLogin && $data.hasUserInfo ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              [
                vue.createCommentVNode(" 尝试使用微信和QQ的属性名 "),
                vue.createElementVNode("image", {
                  class: "userinfo-avatar",
                  src: $data.userInfo.avatarUrl || $data.userInfo.figureurl
                }, null, 8, ["src"]),
                vue.createElementVNode(
                  "view",
                  { class: "userinfo-username" },
                  vue.toDisplayString($data.userInfo.nickName || $data.userInfo.nickname),
                  1
                  /* TEXT */
                )
              ],
              64
              /* STABLE_FRAGMENT */
            )) : (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "userinfo-username"
            }, "未登录"))
          ]),
          vue.createElementVNode("view", { class: "login-button-container" }, [
            vue.createElementVNode("button", {
              type: "primary",
              class: "login-button",
              onClick: _cache[0] || (_cache[0] = (...args) => $options.showLoginOptions && $options.showLoginOptions(...args))
            }, "登录")
          ])
        ])
      ])
    ]);
  }
  const PagesUserUser = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "D:/Download/HBuilderX.3.99.2023122611/projects/new/pages/user/user.vue"]]);
  const _sfc_main$3 = {
    data() {
      return {};
    },
    methods: {
      ClickToAiDegrade() {
        formatAppLog("log", "at pages/functions/functions.vue:30", "按钮被点击");
        uni.navigateTo({
          // 保留当前页面，跳转到应用内的某个页面
          url: "/pages/aiDegrade/aiDegrade"
        });
      },
      ClickToAiBudget() {
        formatAppLog("log", "at pages/functions/functions.vue:38", "按钮被点击");
        uni.navigateTo({
          // 保留当前页面，跳转到应用内的某个页面
          url: "/pages/aiBudget/aiBudget"
        });
      },
      ClickToPrizeComparison() {
        formatAppLog("log", "at pages/functions/functions.vue:46", "按钮被点击");
        uni.navigateTo({
          // 保留当前页面，跳转到应用内的某个页面
          url: "/pages/prizeComparison/prizeComparison"
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "discovery-container" }, [
      vue.createElementVNode("view", {
        class: "discovery-item",
        onClick: _cache[0] || (_cache[0] = ($event) => $options.ClickToAiDegrade())
      }, [
        vue.createElementVNode("image", {
          class: "discovery-icon",
          src: "/static/right1.png"
        }),
        vue.createElementVNode("text", { class: "discovery-text" }, "AI消费降级")
      ]),
      vue.createElementVNode("view", {
        class: "discovery-item",
        onClick: _cache[1] || (_cache[1] = ($event) => $options.ClickToAiBudget())
      }, [
        vue.createElementVNode("image", {
          class: "discovery-icon",
          src: "/static/right2.png"
        }),
        vue.createElementVNode("text", { class: "discovery-text" }, "AI预算")
      ]),
      vue.createElementVNode("view", {
        class: "discovery-item",
        onClick: _cache[2] || (_cache[2] = ($event) => $options.ClickToPrizeComparison())
      }, [
        vue.createElementVNode("image", {
          class: "discovery-icon",
          src: "/static/logo.png"
        }),
        vue.createElementVNode("text", { class: "discovery-text" }, "比价")
      ])
    ]);
  }
  const PagesFunctionsFunctions = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/Download/HBuilderX.3.99.2023122611/projects/new/pages/functions/functions.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view");
  }
  const PagesPrizeComparisonPrizeComparison = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/Download/HBuilderX.3.99.2023122611/projects/new/pages/prizeComparison/prizeComparison.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        userInput: "",
        messages: [],
        id: ""
      };
    },
    onLoad() {
      this.fit_size();
      this.init();
    },
    methods: {
      async init() {
        const initial = await this.refresh();
        this.messages = [];
        this.messages.push({
          role: "assistant",
          content: initial.choices[0].message.content
        });
        this.id = initial.request_id;
        formatAppLog("log", "at pages/aiBudget/aiBudget.vue:43", initial.request_id);
      },
      async refresh() {
        uni.showLoading({
          title: "加载中"
        });
        try {
          const response = await uni.request({
            url: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
            method: "POST",
            data: {
              "model": "glm-4",
              // 模型名称
              "messages": [
                {
                  "role": "system",
                  "content": "你是一个会生活的大师，你可以妥善地安排生活中的收入和支出。当用户提问时，你可以为他提供生活中的具体预算安排。"
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
          formatAppLog("log", "at pages/aiBudget/aiBudget.vue:75", response.data.request_id);
          return response.data;
        } catch (error) {
        } finally {
          uni.hideLoading();
        }
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
        uni.showLoading({
          title: "加载中"
        });
        try {
          const response = await uni.request({
            url: "https://open.bigmodel.cn/api/paas/v4/chat/completions",
            method: "POST",
            data: {
              "model": "glm-4",
              // 模型名称
              "messages": [
                {
                  "role": "system",
                  "content": "你是一个会生活的大师，你可以妥善地安排生活中的收入和支出。当用户提问时，你可以为他提供生活中的具体预算安排。"
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
          formatAppLog("log", "at pages/aiBudget/aiBudget.vue:143", response.data.request_id);
          return response.data.choices[0].message.content;
        } catch (error) {
        } finally {
          uni.hideLoading();
        }
      },
      fit_size() {
        const systemInfo = uni.getSystemInfoSync();
        this.dynamicHeight = systemInfo.screenHeight / 10;
        this.dynamicWidth = systemInfo.screenHeight / 10 * (systemInfo.screenHeight / systemInfo.screenWidth);
        formatAppLog("log", "at pages/aiBudget/aiBudget.vue:160", this.dynamicHeight);
        formatAppLog("log", "at pages/aiBudget/aiBudget.vue:161", this.dynamicWidth);
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "chat-history" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.messages, (message, index) => {
            return vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: index,
                class: vue.normalizeClass(["message-container", message.role])
              },
              [
                message.role === "assistant" ? (vue.openBlock(), vue.createElementBlock(
                  "image",
                  {
                    key: 0,
                    src: "/static/left2.png",
                    class: "avatar avatar_assistant",
                    style: vue.normalizeStyle({ width: _ctx.dynamicWidth + "rpx", height: _ctx.dynamicHeight + "rpx" })
                  },
                  null,
                  4
                  /* STYLE */
                )) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode("view", { class: "bubble" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(message.content),
                    1
                    /* TEXT */
                  )
                ]),
                message.role === "user" ? (vue.openBlock(), vue.createElementBlock(
                  "image",
                  {
                    key: 1,
                    src: "/static/left1.png",
                    class: "avatar avatar_user",
                    style: vue.normalizeStyle({ width: _ctx.dynamicWidth + "rpx", height: _ctx.dynamicHeight + "rpx" })
                  },
                  null,
                  4
                  /* STYLE */
                )) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            );
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createElementVNode("view", { class: "input-container" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.init && $options.init(...args))
        }, "新建对话"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.userInput = $event),
            type: "text",
            placeholder: "输入你的问题...",
            onConfirm: _cache[2] || (_cache[2] = (...args) => $options.sendQuestion && $options.sendQuestion(...args))
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $data.userInput]
        ]),
        vue.createElementVNode("button", {
          onClick: _cache[3] || (_cache[3] = (...args) => $options.sendQuestion && $options.sendQuestion(...args))
        }, "发送")
      ])
    ]);
  }
  const PagesAiBudgetAiBudget = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/Download/HBuilderX.3.99.2023122611/projects/new/pages/aiBudget/aiBudget.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/aiDegrade/aiDegrade", PagesAiDegradeAiDegrade);
  __definePage("pages/graph/graph", PagesGraphGraph);
  __definePage("pages/user/user", PagesUserUser);
  __definePage("pages/functions/functions", PagesFunctionsFunctions);
  __definePage("pages/prizeComparison/prizeComparison", PagesPrizeComparisonPrizeComparison);
  __definePage("pages/aiBudget/aiBudget", PagesAiBudgetAiBudget);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/Download/HBuilderX.3.99.2023122611/projects/new/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
