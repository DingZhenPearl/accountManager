<template>
  <view class="container">
    <view class="chat-history">
      <view v-for="(message, index) in messages" :key="index" class="message-container" :class="message.role">
        <image v-if="message.role === 'assistant'" src="/static/left2.png" class="avatar avatar_assistant" :style="{ width: dynamicWidth + 'rpx', height: dynamicHeight + 'rpx' }" />
        <view class="bubble">
          <text>{{ message.content }}</text>
        </view>
        <image v-if="message.role === 'user'" src="/static/left1.png" class="avatar avatar_user" :style="{ width: dynamicWidth + 'rpx', height: dynamicHeight + 'rpx' }" />
      </view>
    </view>
    <view class="input-container">
      <button @click="init">新建对话</button>
      <input v-model="userInput" type="text" placeholder="输入你的问题..." @confirm="sendQuestion" />
      <button @click="sendQuestion">发送</button>
    </view>
  </view>
</template>


<script>
export default {
  data() {
    return {
      userInput: '',
      messages: [],
	  id:'',
	  dynamicWidth: NaN,
	  dynamicHeight:NaN
    };
  },
  onLoad() {
     
	 this.fit_size();
	 this.init();
	 
  },
  methods: {

	  
	  
	  


	 async init() {
	       
			   
	         const initial = await this.refresh();
			 this.messages=[];
			 this.messages.push({
			   role: 'assistant',
			   content: initial.choices[0].message.content
			 });
			 this.id=initial.request_id;
			 console.log(initial.request_id)
			
			 
	       
	     },
	   
	  
	 async refresh() {
		 
		 uni.showLoading({
		         title: '加载中'
		       });
		 try{
	  		const response = await uni.request({
	  		    url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
	  		    method: 'POST',
	  		    data: {
	  		      "model": "glm-4", // 模型名称
	  		      "messages": [
	  		  			  {
	  		  			  	"role": "system",
	  		  			  	"content":"你是一个精通各种商品的大师，你可以为帮助用户选择没那么贵但同样满足生活需求的商品来实现消费降级，当用户发送一项商品时，你为他提供消费降级后的商品。"
	  		  			  },
						  {
						    "role": "user",
						    "content": "你好"
						  }
	  		      ]
	  		    },
	  		    header: {
	  		      'Content-Type': 'application/json',
	  		      'Authorization': 'Bearer b161ab74893310f851cf1773d822657d.iVHlt3Ymx27C1Iax'
	  		    }
	  		  });
			  console.log(response.data.request_id)
	  		  return response.data;
			  
			  }catch(error){
		 
	 } finally {
	   
	   uni.hideLoading();
	 }
	  },
	  
	  
	  
	  
	  
	  
    async sendQuestion() {
      if (this.userInput.trim() === '') {
        return;
      };
      
      // 将用户的问题添加到消息历史中
      this.messages.push({
        role: 'user',
        content: this.userInput
      });
      var inputed = this.userInput;
      
      // 清空输入框
      this.userInput = '';

      // 调用 AI API 并获取回复
      const aiReply = await this.getAIReply(inputed);
      
      // 将 AI 回复添加到消息历史中
      this.messages.push({
        role: 'assistant',
        content: aiReply
      });
    },
    
    async getAIReply(question) {
      // 这里替换为实际的 AI API 调用
      // 假设 API 返回的回复数据结构为 { reply: 'AI 的回复' }
      
	 uni.showLoading({
	         title: '加载中'
	       });
	 	  try { 
	  
	  const response = await uni.request({
        url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
        method: 'POST',
        data: {
          "model": "glm-4", // 模型名称
          "messages": [
			  {
			  	"role": "system",
			  	"content":"你是一个精通各种商品的大师，你可以为帮助用户选择没那么贵但同样满足生活需求的商品来实现消费降级，当用户发送一项商品时，你为他提供消费降级后的商品。"
			  },
            {
              "role": "user",
              "content": question
            }
          ],
           "request_id": this.id // 包含之前的request_id
        },
        header: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer b161ab74893310f851cf1773d822657d.iVHlt3Ymx27C1Iax'
        }
      });
      console.log(response.data)
	  console.log(response.data.request_id)
	  
      return response.data.choices[0].message.content;
	  
	  }catch(error){
	  		 
	  } finally {
	    
	    uni.hideLoading();
	  }
	  
	  
    },
	
	fit_size(){
		const systemInfo = uni.getSystemInfoSync();
		this.dynamicHeight=systemInfo.screenHeight/10;
		this.dynamicWidth=(systemInfo.screenHeight/10)*(systemInfo.screenHeight/systemInfo.screenWidth);
	  console.log(this.dynamicHeight)
	  console.log(this.dynamicWidth)
	}
	
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-history {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px;
  overflow-y: scroll;
}

.message-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user {
  justify-content: flex-end; /* 确保用户消息气泡从右侧开始 */
}

.assistant {
  justify-content: flex-start; /* 确保AI消息气泡从左侧开始 */
}

.avatar {
  border-radius: 50%;
  object-fit: cover; /* 防止图片变形 */
}

.avatar_user {
  margin-right: 0px;
}

.avatar_assistant {
  margin-left: 0px;
}

.bubble {
  padding: 15px;
  border-radius: 15px;
  background-color: #f1f1f1;
  display: inline-block;
  word-wrap: break-word;
  max-width: 80%;
  user-select: text;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.user .bubble {
  background-color: #DCF8C5; /* 用户消息气泡背景色 */
  color: black;
  margin-right: 10px; /* 保持与边框有一定的距离 */
}

.assistant .bubble {
  background-color: #E8E8E8; /* AI消息气泡背景色 */
  color: black;
  margin-left: 10px; /* 保持与边框有一定的距离 */
}

.input-container {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 底部阴影效果 */
}

.input-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  border-radius: 30px; /* 圆角输入框 */
  background-color: white;
  overflow: hidden;
}

input[type="text"] {
  flex: 1; /* 输入框自动填充剩余空间 */
  padding: 10px;
  margin-right: 10px;
  border: none;
  outline: none; /* 移除默认的输入框样式 */
}

.send-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  cursor: pointer;
}

</style>