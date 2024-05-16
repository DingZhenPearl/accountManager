<template>
    <view>
        <page-head :title="title"></page-head>
        <view class="uni-padding-wrap">
            <view class="userinfo-container">
                <view class="userinfo-avatar-container">
                    <block v-if="hasLogin && hasUserInfo">
                        <!-- 尝试使用微信和QQ的属性名 -->
                        <image class="userinfo-avatar" :src="userInfo.avatarUrl || userInfo.figureurl"></image>
                        <view class="userinfo-username">{{ userInfo.nickName || userInfo.nickname }}</view>
                    </block>
                    <block v-else>
                        <view class="userinfo-username">未登录</view>
                    </block>
                </view>
                <view class="login-button-container">
                    <button type="primary" class="login-button" @click="showLoginOptions">登录</button>
                </view>
            </view>
        </view>
    </view>
</template>



<script>
    export default {
        data() {
            return {
                title: '登录',
                hasLogin: false,
                hasUserInfo: false,
                userInfo: {}
            }
        },
        methods: {
            showLoginOptions() {
                uni.showActionSheet({
                    itemList: ['微信登录', 'QQ登录'],
                    success: (res) => {
                        if (res.tapIndex === 0) {
                            this.wechatLogin();
                        } else if (res.tapIndex === 1) {
                            this.qqLogin();
                        }
                    },
                    fail: (err) => {
                        console.log('登录选项取消:', err);
                    }
                });
            },
            wechatLogin() {
                uni.login({
                    provider: 'weixin',
                    success: (res) => {
                        console.log('微信登录成功:', res);
						this.hasLogin = true;
                        this.getUserInfo('weixin');
						
						
                        // 这里应该调用您的后端服务进行登录验证
                    },
                    fail: (err) => {
                        console.log('微信登录失败:', err);
                    }
                });
            },
            qqLogin() {
                uni.login({
                    provider: 'qq',
                    success: (res) => {
                        console.log('QQ登录成功:', res);
						this.hasLogin = true;
						
                        this.getUserInfo('qq');
                        // 这里应该调用您的后端服务进行登录验证
                    },
                    fail: (err) => {
                        console.log('QQ登录失败:', err);
                    }
                });
            },
			
			
			
			
			
			
            getUserInfo(provider) {
                uni.getUserInfo({
                    provider: provider, // 指定提供商
                    success: (result) => {
                        this.hasUserInfo = true;
                        this.userInfo = result.userInfo;
						console.log(provider+"成功获取信息")
                    },
                    fail: (error) => {
                        console.log('获取用户信息失败', error);
                        uni.showModal({
                            title: '获取用户信息失败',
                            content: '请确保已经登录并授权获取用户信息',
                            showCancel: false
                        });
                    }
                });
            }
        }
    }
</script>

<style>
    .userinfo-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #FFF;
        padding: 40rpx;
    }
    .userinfo-avatar-container {
        text-align: center;
    }
    .userinfo-avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
    }
    .userinfo-username {
        font-size: 28rpx;
        margin-top: 20rpx;
    }
    .login-button-container {
        flex-grow: 1;
        text-align: right;
    }
    .login-button {
        background-color: #007aff;
        color: #ffffff;
        margin-top: 0; /* 添加一些间距 */
    }
</style>
