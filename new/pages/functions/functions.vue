<template>
  <view class="discovery-container">
    <view class="discovery-item" @click="ClickToAiDegrade()">
      <image class="discovery-icon" src="/static/right1.png" />
      <text class="discovery-text">AI消费降级</text>
    </view>
    <view class="discovery-item" @click="ClickToAiBudget()">
      <image class="discovery-icon" src="/static/right2.png" />
      <text class="discovery-text">AI预算</text>
    </view>
    <view class="discovery-item" @click="ClickToPrizeComparison()">
      <image class="discovery-icon" src="/static/logo.png" />
      <text class="discovery-text">比价</text>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},

		 
		methods: {
			    ClickToAiDegrade() {
			      // 在这里处理点击事件
			      console.log('按钮被点击');
				   uni.navigateTo({
				              // 保留当前页面，跳转到应用内的某个页面
				              url: '/pages/aiDegrade/aiDegrade'
				          });
			    },
				ClickToAiBudget() {
				  // 在这里处理点击事件
				  console.log('按钮被点击');
				   uni.navigateTo({
				              // 保留当前页面，跳转到应用内的某个页面
				              url: '/pages/aiBudget/aiBudget'
				          });
				},
				ClickToPrizeComparison() {
				  // 在这里处理点击事件
				  console.log('按钮被点击');
				   uni.navigateTo({
				              // 保留当前页面，跳转到应用内的某个页面
				              url: '/pages/prizeComparison/prizeComparison'
				          });
				}
		}
	}
</script>

<style>
.discovery-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
  padding: 20px; /* 添加一些内边距，让内容不至于紧贴边缘 */
}

.discovery-item {
  display: flex;
  align-items: center; /* 使图标和文本垂直居中对齐 */
  width: 100%; /* 设置宽度为100%，使得每个按钮占据一整行 */
  padding: 15px;
  border-bottom: 1px solid #eaeaea; /* 添加分隔线 */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.discovery-item:last-child {
  border-bottom: none; /* 去掉最后一个item的下边框 */
}

.discovery-item:active {
  background-color: #f5f5f5; /* 点击时的背景颜色变化 */
}

.discovery-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.discovery-text {
  font-size: 16px;
  color: #333333;
}
</style>
