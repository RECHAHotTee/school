<template>
	<view class="container">
		<view class="flex flex-wrap custom-col-24 flex-direction-column flex6-clz">
			<u-navbar titleWidth="500" :isFixed="true" :isSlotTitle="true" title="个人中心" backText="返回" titleColor="inherit" backIconColor="inherit" :backTextStyle="{ color: 'inherit' }" :isHome="false" :isBack="false">
				<template v-slot:title> 个人中心 </template>
			</u-navbar>
			<view class="flex flex-wrap custom-col-24 flex-direction-column items-center flex-clz">
				<image src="/static/favicon.png" class="custom-image custom-col-0 image1-clz" style="height: 48px !important; width: 48px" mode="widthFix"></image>
				<view class="custom-col-0 custom-text-lg"> 姓名 </view>
				<view class="custom-col-0 custom-text-sm"> XXXX大学 </view>
			</view>
			<view class="flex custom-col-24 white list-clz">
				<view class="custom-list not-remark">
					<view style="" class="custom-item col-100 row solid-bottom list-item-clz">
						<view class="content">
							<view class="title"> 姓名： </view>
						</view>
					</view>
					<view style="" class="custom-item col-100 row solid-bottom list-item-clz">
						<view class="content">
							<view class="title"> 姓别： </view>
						</view>
					</view>
					<view style="" class="custom-item col-100 row solid-bottom list-item-clz">
						<view class="content">
							<view class="title"> 院系： </view>
						</view>
					</view>
					<view style="" class="custom-item col-100 row solid-bottom list-item-clz">
						<view class="content">
							<view class="title"> 专业： </view>
						</view>
					</view>
					<view style="" class="custom-item col-100 row solid-bottom list-item-clz">
						<view class="content">
							<view class="title"> 学号： </view>
						</view>
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
	.flex6-clz {
		z-index: 100;
		background-repeat: no-repeat;
		background-size: contain;
		background-image: url(/static/OA.png);
	}
	.flex-clz {
		margin-left: 5px;
		z-index: 100;
		color: #ffffff;
		width: calc(100% - 5px - 5px) !important;
		margin-top: 20px;
		margin-bottom: 5px;
		margin-right: 5px;
	}
	.image1-clz {
		border-bottom-left-radius: 50%;
		border-top-right-radius: 50%;
		margin-right: 5px;
		background-color: #ffffff;
		margin-left: 5px;
		flex-shrink: 0;
		box-shadow: 0px 1px 3px rgba(31, 31, 31, 0.16);
		overflow: hidden;
		width: 48px !important;
		border-top-left-radius: 50%;
		margin-top: 30px;
		border-bottom-right-radius: 50%;
		margin-bottom: 10px;
	}
	.list-clz {
		background-color: rgba(217, 217, 217, 0.13);
		margin-left: 10px;
		border-bottom-left-radius: 10px;
		box-shadow: 0px 2px 4px 3px rgba(181, 207, 255, 0.5);
		overflow: hidden;
		width: calc(100% - 10px - 10px) !important;
		border-top-left-radius: 10px;
		margin-top: 10px;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		margin-bottom: 10px;
		margin-right: 10px;
	}
	.list-item-clz {
		margin: 0px;
		padding: 10px;
	}
	.list-item-clz .list-icon-clz {
		width: 40px;
		height: 40px;
		font-size: calc(40px - 4px) !important;
	}

	.list-badge-3 {
		padding-left: 0px;
		padding-right: 0px;
		right: -7px;
		top: -5px;
	}
	.container {
		padding-left: 0px;
		padding-right: 0px;

		background-position: top center;
		background-size: contain;
		background-repeat: no-repeat;
		font-size: 12px;
	}
	.container {
		width: 750rpx !important;
		margin: 0 auto;
	}
</style>
