<template>
	<view class="container">
		<view class="flex custom-col-24">
			<view class="custom-list">
				<view style="" class="custom-item col-100 row solid-bottom list-item-clz">
					<view class="custom-avatar list-icon-clz">
						<image mode="aspectFit" class="custom-avatar-img" src="/static/grid1.png"></image>
					</view>
					<view class="content">
						<view class="title"> 菜单一 </view>
						<view class="text-sm remark"> 说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字 </view>
					</view>
				</view>
				<view style="" class="custom-item col-100 row solid-bottom list-item-clz">
					<view class="custom-avatar list-icon-clz">
						<image mode="aspectFit" class="custom-avatar-img" src="/static/grid2.png"></image>
					</view>
					<view class="content">
						<view class="title"> 菜单二 </view>
						<view class="text-sm remark"> 说明文字 </view>
					</view>
				</view>
				<view style="" class="custom-item col-100 row solid-bottom list-item-clz">
					<view class="custom-avatar list-icon-clz">
						<image mode="aspectFit" class="custom-avatar-img" src="/static/grid3.png"></image>
					</view>
					<view class="content">
						<view class="title"> 菜单三 </view>
						<view class="text-sm remark"> 说明文字 </view>
					</view>
				</view>
			</view>
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
	.list-item-clz {
		margin: 10px;
		padding: 0px;
	}
	.list-item-clz .list-icon-clz {
		width: 100px;
		height: 100px;
		font-size: calc(100px - 4px) !important;
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
