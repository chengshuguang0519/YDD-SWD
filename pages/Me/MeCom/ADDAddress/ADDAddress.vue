<template>
	<view class="add-address">
		<view class="add-address-top">
			<u-form :model="form" ref="uForm">
				<u-form-item label="姓 名：" prop="name">
					<u-input v-model="form.name" :clearable="false" placeholder="请输入姓名" />
				</u-form-item>
				<u-form-item label="电 话：" prop="phone">
					<u-input v-model="form.phone" type="number" :clearable="false" placeholder="请输入电话"  />
				</u-form-item>
				<view class="formItem">
					<text>所在地区：</text>
					<text @click="changePro">{{addressAll?addressAll:'选择省、市、区'}}</text>
					<image src="../../../../static/image/meImg/myAddressImg/right.png" class="right-arrow"
						@click="changePro"></image>
				</view>
				<u-form-item label="详细地址：" prop="address">
					<u-input v-model="form.address" type="text" :clearable="false" placeholder="请填写详细地址" />
				</u-form-item>
			</u-form>
		</view>
		<view class="setting">
			<!-- <u-radio-group v-model="value" @change="itemChange">
				<u-radio active-color="#FF7C4C" name="0" @change="itemListChange">设为默认地址</u-radio>
			</u-radio-group> -->
			<u-checkbox-group>
				<u-checkbox active-color="#FF7C4C" v-model="value" shape="circle" @change="itemListChange">设为默认地址
				</u-checkbox>
			</u-checkbox-group>
		</view>
		<view class="saveAdd" @click="saveADD">
			<text>保存并使用</text>
		</view>
		<u-picker v-model="show" mode="region" confirm-color='#FF7C4C' @confirm='confirmItem'></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: true,
				show: false,
				addressAll:'',
				form: {
					name: '',
					phone: '',
					province_id: '',
					city_id: '',
					area_id: '',
					address: '',
					is_default: 1,
				},
				rules: {
					name: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					phone: [{
							required: true,
							min: 11,
							max: 11,
							message: '请输入正确的手机号',
							trigger:['change', 'blur']
						},
							{ pattern: /^1[3456789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur" }
						
					],
					address:[{
						required: true,
						message: '请输入详细地址',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}]
				}
				
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	methods: {
		changePro() {
			this.show = !this.show
		},
		confirmItem(e) {
			console.log(e, '11')
			this.form.province_id = e.province.value
			this.form.area_id = e.area.value
			this.form.city_id = e.city.value
			this.addressAll = e.province.label + e.city.label + e.area.label
			console.log(this.form)
		},
		itemListChange(e) {
			console.log(e)
			if (e.value) {
				this.form.is_default = 1
			} else {
				this.form.is_default = 0
			}
		},
		//保存地址
		saveADD() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					this.$u.post('/single/user/save_address',{
							...this.form
					}).then(res => {
					console.log(res.data)
					if (res.code == 200) {
						uni.showToast({
							title: '保存地址成功'
						})
						setTimeout(() => {
							uni.redirectTo({
								url: '../MyAddress/MyAddress'
							})
						}, 1500)
					} else {
						uni.showToast({
							title: '请选择省市区',
							icon: 'none'
						})
					}
					})
					
				} else {
					console.log('验证失败');
				}
			});
			console.log(this.form)
		}
	}
	}
</script>

<style lang="scss">
	/deep/.u-form-item--left__content__label.data-v-006449ec {
		white-space: nowrap;
		margin-left: 30rpx;
	}
	/deep/.u-form-item__message.data-v-006449ec {
			display: flex;
			margin-left: 50%!important;
			transform: translate(-50%);
			padding-left:0!important ;
	}
	/deep/.u-input__input.data-v-460c1d26 {
		margin-left: 90rpx;
	}

	body {
		background-color: #F0F1F1;
	}

	.add-address {
		width: 100%;
		margin-top: 20rpx;

		.add-address-top {
			background-color: #fff;
		}
	}

	.formItem {
		display: flex;
		justify-content: space-between;
		padding: 40rpx 0;

		border-bottom: 1px solid #F0F1F1;

		text:nth-child(1) {
			margin-left: 30rpx;
			white-space: nowrap;
		}

		text:nth-child(2) {
			width: 600rpx;
			font-size: 30rpx;
			color: #000;
			white-space: nowrap;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			margin-left: 10rpx;
		}

		.right-arrow {
			width: 16rpx;
			height: 28rpx;
			margin-top: 10rpx;
			margin-right: 30rpx;
		}
	}

	.setting {
		width: 100%;
		height: 84rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		padding-left: 30rpx;
	}

	.saveAdd {
		width: 690rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background-color: #FF7C4C;
		border-radius: 15rpx;
		color: #fff;
		margin: 0 auto;
		margin-top: 520rpx;
	}
</style>
