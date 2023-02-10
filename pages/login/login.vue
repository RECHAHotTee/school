<template>
	<view class="container">
		<view class="flex flex-wrap custom-col-24 flex-direction-column justify-center items-center flex-clz">
			<image src="/static/tx-nxs4.png" class="custom-image custom-col-0 image-clz" style="height: 80px !important; width: 80px" mode="widthFix"></image>
		</view>
		<u-form :model="form" :rules="formRules" :errorType="['message', 'toast']" ref="formRef" class="flex custom-form custom-col-24">
			<u-form-item class="custom-col-24" :required="true" label="账户" labelPosition="top" prop="usename">
				<u-input :focus="formData.usenameFocus" class="" placeholder="请输入登录账户" v-model="form.usename" type="text"></u-input>
			</u-form-item>
			<u-form-item class="custom-col-24" label="密码" labelPosition="top" prop="password">
				<u-input :focus="formData.passwordFocus" class="" placeholder="请输入密码" v-model="form.password" type="password" :password-icon="true"></u-input>
			</u-form-item>
			<u-form-item class="custom-col-24 radio-clz" labelPosition="top" prop="radio">
				<u-radio-group class="flex flex-wrap custom-col-24 justify-between" wrapClass=" justify-between" activeColor="#39b54a" v-model="form.radio" @change="changeFormRadio">
					<u-radio shape="circle" v-for="(radioitem, radioindex) in formData.radioDatas" :key="radioindex" :name="radioitem.value">
						{{ radioitem.label }}
					</u-radio>
				</u-radio-group>
			</u-form-item>
			<view class="flex custom-col-24 button-clz">
				<button class="custom-btn black radius flex-sub margin-xs button-button-clz">登录</button>
			</view>
		</u-form>
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
				formRules: {
					usename: [
						{
							trigger: ['change', 'blur'],
							required: true,
							message: '账户不能为空'
						}
					]
				},
				form: {
					usename: '',
					password: '',
					radio: '1'
				},
				formData: {
					usenameFocus: false,
					passwordFocus: false,
					radioDatas: [
						{ value: '1', label: '管理员', checked: true },
						{ value: '2', label: '学生', checked: false }
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
			this.$refs.formRef?.setRules(this.formRules);
		},
		methods: {
			async init() {},
			async submitForm(e) {
				let valid = await this.$refs.formRef.validate();
				if (valid) {
					//保存数据
					let param = this.form;
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
			changeFormRadio(evt) {}
		}
	};
</script>

<style lang="scss" scoped>
	.flex-clz {
		z-index: 100;
		height: 180px;
	}
	.image-clz {
		box-shadow: 0px 1px 3px rgba(31, 31, 31, 0.16);
		overflow: hidden;
	}
	.radio-clz {
		padding-top: 0px;
		padding-left: 50px;
		padding-bottom: 0px;
		text-align: center;
		padding-right: 50px;
	}
	.button-clz {
		margin-left: 10px;
		width: calc(100% - 10px - 10px) !important;
		margin-top: 10px;
		margin-bottom: 10px;
		margin-right: 10px;
	}
	.button-button-clz {
		font-size: 20px !important;
		margin: 3px !important;
		padding: 23px !important;
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
