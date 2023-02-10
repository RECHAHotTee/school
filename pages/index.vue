<template>
	<view class="container">
		<view class="flex custom-col-24 flex-direction-column">
			<view class="custom-tabs text-center solid-bottom justify-center small-border">
				<view class="custom-tab-item flex-sub" :class="index == tabsIndex ? ' bg-black radius' : ''" v-for="(item, index) in tabsDatas" :key="index" @click="changeTabs" :data-index="index"> <text v-if="item.icon" :class="item.icon"></text> {{ item.text }} </view>
			</view>
			<view class="">
				<view v-if="tabsIndex == 0" class="flex-sub">
					<view class="flex custom-col-24">
						<diy-noticebar class="flex1 diy-notice-bar" color="#1f19df" bgColor="#fff" leftIcon="diy-icon-notification">
							<block v-slot:content>
								<text class="diy-notice-item"> 新同学在这里填写信息，以办理入学手续 </text>
							</block>
						</diy-noticebar>
					</view>
					<u-form-item class="custom-col-24" label="姓名" prop="input">
						<u-input :focus="inputFocus" class="" placeholder="请输入提示信息" v-model="input" type="text"></u-input>
					</u-form-item>
					<u-form-item class="custom-col-24" label="性别" prop="sct">
						<u-input @click="showSct = true" class="" placeholder="请选择" v-model="sctLabel" type="select"></u-input>
					</u-form-item>
					<u-select mode="single-column" valueName="value" labelName="label" :list="sctDatas" :defaultValue="[sctIndex]" v-model="showSct" @confirm="changeSct"></u-select>
					<u-form-item class="custom-col-24" label="院系" prop="sct1">
						<u-input @click="showSct1 = true" class="" placeholder="请选择" v-model="sct1Label" type="select"></u-input>
					</u-form-item>
					<u-select mode="single-column" valueName="value" labelName="label" :list="sct1Datas" :defaultValue="[sct1Index]" v-model="showSct1" @confirm="changeSct1"></u-select>
					<u-form-item class="custom-col-24" label="专业" prop="input1">
						<u-input :focus="input1Focus" class="" placeholder="不超过10个字" v-model="input1" type="text"></u-input>
					</u-form-item>
					<u-form-item class="custom-col-24" label="学号" prop="input3">
						<u-input :focus="input3Focus" class="" placeholder="10位数字" v-model="input3" type="text"></u-input>
					</u-form-item>
					<view class="flex custom-col-24">
						<button style="background-color: rgba(8, 0, 0, 0.83) !important" class="custom-btn green radius-xs flex-sub margin-xs button-button-clz">提交</button>
					</view>
				</view>
				<view v-if="tabsIndex == 1" class="flex-sub">
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
				</view>
				<view v-if="tabsIndex == 2" class="flex-sub">
					<view class="flex custom-col-24">
						<view class="custom-list">
							<view style="" class="custom-item col-100 row solid-bottom list1-item-clz">
								<view class="custom-avatar list1-icon-clz">
									<image mode="aspectFit" class="custom-avatar-img" src="/static/grid1.png"></image>
								</view>
								<view class="content">
									<view class="title"> 菜单一 </view>
									<view class="text-sm remark"> 说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字说明文字 </view>
								</view>
							</view>
							<view style="" class="custom-item col-100 row solid-bottom list1-item-clz">
								<view class="custom-avatar list1-icon-clz">
									<image mode="aspectFit" class="custom-avatar-img" src="/static/grid2.png"></image>
								</view>
								<view class="content">
									<view class="title"> 菜单二 </view>
									<view class="text-sm remark"> 说明文字 </view>
								</view>
							</view>
							<view style="" class="custom-item col-100 row solid-bottom list1-item-clz">
								<view class="custom-avatar list1-icon-clz">
									<image mode="aspectFit" class="custom-avatar-img" src="/static/grid3.png"></image>
								</view>
								<view class="content">
									<view class="title"> 菜单三 </view>
									<view class="text-sm remark"> 说明文字 </view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view v-if="tabsIndex == 3" class="flex-sub">
					<u-form :model="form1" :rules="form1Rules" :errorType="['message', 'toast']" ref="form1Ref" class="flex custom-form custom-col-24">
						<u-form-item class="custom-col-24" label="姓名" prop="input2">
							<u-input :focus="form1Data.input2Focus" class="" placeholder="" v-model="form1.input2" type="text"></u-input>
						</u-form-item>
						<u-form-item class="custom-col-24" label="性别" prop="sct2">
							<u-input @click="form1Data.showSct2 = true" class="" placeholder="请选择" v-model="form1.sct2Label" type="select"></u-input>
						</u-form-item>
						<u-select mode="single-column" valueName="value" labelName="label" :list="form1Data.sct2Datas" :defaultValue="[form1.sct2Index]" v-model="form1Data.showSct2" @confirm="changeForm1Sct2"></u-select>
						<u-form-item class="custom-col-24" label="年级" prop="sct3">
							<u-input @click="form1Data.showSct3 = true" class="" placeholder="请选择" v-model="form1.sct3Label" type="select"></u-input>
						</u-form-item>
						<u-select mode="single-column" valueName="value" labelName="label" :list="form1Data.sct3Datas" :defaultValue="[form1.sct3Index]" v-model="form1Data.showSct3" @confirm="changeForm1Sct3"></u-select>
						<u-form-item class="custom-col-24" label="院系" prop="sct4">
							<u-input @click="form1Data.showSct4 = true" class="" placeholder="请选择" v-model="form1.sct4Label" type="select"></u-input>
						</u-form-item>
						<u-select mode="single-column" valueName="value" labelName="label" :list="form1Data.sct4Datas" :defaultValue="[form1.sct4Index]" v-model="form1Data.showSct4" @confirm="changeForm1Sct4"></u-select>
						<u-form-item class="custom-col-24" label="工作意向" prop="sct5">
							<u-input @click="form1Data.showSct5 = true" class="" placeholder="请选择" v-model="form1.sct5Label" type="select"></u-input>
						</u-form-item>
						<u-select mode="single-column" valueName="value" labelName="label" :list="form1Data.sct5Datas" :defaultValue="[form1.sct5Index]" v-model="form1Data.showSct5" @confirm="changeForm1Sct5"></u-select>
						<u-form-item :required="true" class="custom-col-24" label="自我介绍" prop="textarea">
							<u-input :autoHeight="false" maxlength="200" height="60px" class="" placeholder="200字以内" v-model="form1.textarea" type="textarea"></u-input>
						</u-form-item>
						<view class="flex custom-col-24">
							<button class="custom-btn black radius-xs flex-sub margin-xs button1-button-clz">提交</button>
						</view>
					</u-form>
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
				globalData: {},
				tabsDatas: [
					{ text: `入学办理`, icon: `` },
					{ text: `校园指南`, icon: `` },
					{ text: `社团风采`, icon: `` },
					{ text: `勤工助学`, icon: `` }
				],
				tabsIndex: 0,
				inputFocus: false,
				input: '',
				showSct: false,
				sctDatas: [
					{ value: '1', label: '男' },
					{ value: '2', label: '女' }
				],
				sctIndex: 0,
				sct: '1',
				sctLabel: '男',
				showSct1: false,
				sct1Datas: [
					{ value: '1', label: '理学院' },
					{ value: '2', label: '工学院' },
					{ value: '3', label: '商学院' }
				],
				sct1Index: 0,
				sct1: '1',
				sct1Label: '理学院',
				input1Focus: false,
				input1: '',
				input3Focus: false,
				input3: '',
				form1Data: {
					input2Focus: false,
					showSct2: false,
					sct2Datas: [
						{ value: '1', label: '男' },
						{ value: '2', label: '女' }
					],
					showSct3: false,
					sct3Datas: [
						{ value: '1', label: '2020级' },
						{ value: '2', label: '2021级' },
						{ value: '3', label: '2022级' },
						{ value: '4', label: '2023级' }
					],
					showSct4: false,
					sct4Datas: [
						{ value: '1', label: '理学院' },
						{ value: '2', label: '文学院' },
						{ value: '3', label: '商学院' }
					],
					showSct5: false,
					sct5Datas: [
						{ value: '1', label: '选项一' },
						{ value: '2', label: '选项二' },
						{ value: '3', label: '选项三' }
					]
				},
				form1: {
					input2: '',
					sct2Index: 0,
					sct2: '1',
					sct2Label: '男',
					sct3Index: 0,
					sct3: '1',
					sct3Label: '2020级',
					sct4Index: 0,
					sct4: '1',
					sct4Label: '理学院',
					sct5Index: 0,
					sct5: '1',
					sct5Label: '选项一',
					textarea: ''
				},
				form1Rules: {
					textarea: [
						{
							trigger: ['change', 'blur'],
							required: true,
							message: '不能为空哟'
						}
					]
				}
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
		onReady() {
			this.$refs.form1Ref?.setRules(this.form1Rules);
		},
		methods: {
			async init() {},
			changeTabs(evt) {
				let { index } = evt.currentTarget.dataset;
				if (index == this.tabsIndex) return;
				this.setData({
					tabsIndex: index
				});
			},
			changeSct(evt) {
				evt.map((val, index) => {
					this.sctLabel = val.label;
					this.sct = String(val.value);
					this.sctIndex = val.index;
				});
			},
			changeSct1(evt) {
				evt.map((val, index) => {
					this.sct1Label = val.label;
					this.sct1 = String(val.value);
					this.sct1Index = val.index;
				});
			},
			async submitForm1(e) {
				let valid = await this.$refs.form1Ref.validate();
				if (valid) {
					//保存数据
					let param = this.form1;
					let url = '';
					if (!url) {
						this.showToast('请先配置表单提交地址', 'none');
						return false;
					}

					let res = await this.$http.post('', param, {}, 'json');

					if (res.code == 200) {
						this.showToast(res.msg, 'success');
					} else {
						this.showModal(res.msg, '提示', false);
					}
				} else {
					console.log('验证失败');
				}
			},
			changeForm1Sct2(evt) {
				evt.map((val, index) => {
					this.form1.sct2Label = val.label;
					this.form1.sct2 = String(val.value);
					this.form1.sct2Index = val.index;
				});
			},
			changeForm1Sct3(evt) {
				evt.map((val, index) => {
					this.form1.sct3Label = val.label;
					this.form1.sct3 = String(val.value);
					this.form1.sct3Index = val.index;
				});
			},
			changeForm1Sct4(evt) {
				evt.map((val, index) => {
					this.form1.sct4Label = val.label;
					this.form1.sct4 = String(val.value);
					this.form1.sct4Index = val.index;
				});
			},
			changeForm1Sct5(evt) {
				evt.map((val, index) => {
					this.form1.sct5Label = val.label;
					this.form1.sct5 = String(val.value);
					this.form1.sct5Index = val.index;
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.button-button-clz {
		margin: 3px !important;
	}
	.list-item-clz {
		margin: 10px;
		padding: 0px;
	}
	.list-item-clz .list-icon-clz {
		width: 100px;
		height: 100px;
		font-size: calc(100px - 4px) !important;
	}
	.list1-item-clz {
		margin: 10px;
		padding: 0px;
	}
	.list1-item-clz .list1-icon-clz {
		width: 100px;
		height: 100px;
		font-size: calc(100px - 4px) !important;
	}
	.button1-button-clz {
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
