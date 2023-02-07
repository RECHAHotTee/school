<template>
	<view class="content">
		<text class="text-center">欢迎登陆小程序</text>
		<button @click="goToLogin">goToLogin</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			uniCloud.callFunction({
				name: 'login',
				data: {zh:'123',mm:'123'}
			}).then(msg=>{
				console.log('msg',msg);
			})
		},
		methods: {
			goToLogin(){
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
