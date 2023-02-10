<template>
	<view class="container">
		<image src="/static/pic1.jpg" class="response custom-col-24" mode="widthFix"></image>
		<view class="flex custom-col-24">
			<button class="custom-btn black radius-xs flex-sub margin-xs button-button-clz">退出登录</button>
		</view>
		<view class="clearfix"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户全局信息
				userInfo: {},
				//页面传参
				globalOption: {},
				//自定义全局变量
				globalData: {}
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
		methods: {
			async init() {}
		}
	};
</script>

<style lang="scss" scoped>
	.button-button-clz {
		margin: 3px !important;
	}
	.container {
		padding-left: 0px;
		padding-right: 0px;

		font-size: 12px;
	}
	.container {
		width: 750rpx !important;
		margin: 0 auto;
	}
</style>
