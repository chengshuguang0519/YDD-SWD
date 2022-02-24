<template>
	<view class="withdrawal">
		<view class="withdrawal-top">
			<text>提现金额</text>
			<view>
				<view>
					<text>￥</text>
					<u-input v-model="priceNum" type="number" :placeholder="getPlace" :clearable='false'
						placeholder-style='font-size:32rpx' class="iptNum" />
				</view>
				<text @click="moneyIpt">全部提现</text>
			</view>
		</view>
		<view class="withdrawal-content" v-if="open_check">
			<view>
				<u-radio-group v-model="value">
					<u-radio active-color="#FF7C4C" :name="1" @change="itemchange">到账支付宝</u-radio>
				</u-radio-group>
				<u-radio-group v-model="value">
					<u-radio active-color="#FF7C4C" :name="2" @change="itemchange">到账银行卡</u-radio>
				</u-radio-group>
			</view>
			<view v-if="value == 1&&open_check" class="list">
				<view class="info-item">
					<text>支付宝账号：</text>
					<u-input v-model="apply.pay_account" type="number" :clearable='false' placeholder=' ' />
				</view>
				<view class="info-item">
					<text>收款人姓名：</text>
					<u-input v-model="apply.real_name" type="text" :clearable='false' placeholder=' ' />
				</view>
				<view class="info-item">
					<text>收款人电话：</text>
					<u-input v-model="apply.phone" type="number" :clearable='false' placeholder=' ' />
				</view>
			</view>
			<view v-if="value == 2 &&open_check" class="list">
				<view class="info-item">
					<text>银行卡号：</text>
					<u-input v-model="card.card_num" type="number" :clearable='false' placeholder=' ' />
				</view>
				<view class="info-item">
					<text>开户行：</text>
					<u-input v-model="card.card_bank" type="text" :clearable='false' placeholder=' ' />
				</view>
				<view class="info-item">
					<text>收款人姓名：</text>
					<u-input v-model="card.real_name" type="number" :clearable='false' placeholder=' ' />
				</view>
				<view class="info-item">
					<text>收款人电话：</text>
					<u-input v-model="card.phone" type="number" :clearable='false' placeholder=' ' />
				</view>
			</view>
			<view class="shuoming">
				<text>提现说明</text>
				<text>1.提现到微信零钱，预计两个工作日内到账</text>
				<text>2.提现失败后，系统会在24小时内返回到原账户</text>
				<text>3.每个用户每天可提现一次</text>
			</view>
		</view>
		<view class="withdrawal-footer" @click="goTx">立即提现</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 1,
				priceNum: '',
				apply: {
					applyNum: '',
					real_name: '',
					phone: '',
				},
				card: {
					real_name: '',
					phone: '',
					card_bank: '',
					card_num: ''
				},
				userInfo:{},
				open_check:'',
			}
		},
		onLoad() {
			this.getUserInfo()
			this.getMiniInfo()
		},
		computed:{
			getPlace(){
				if(this.userInfo.money){
					return '可提现余额为'+this.userInfo.money
				}else{
					return '可提现余额为0'
				}
			}
		},
		methods: {
			itemchange(e) {
				console.log(e)
			},
			//全部提现
			moneyIpt(){
				this.priceNum = this.userInfo.money
			},
			//获取小程序信息
			getMiniInfo(){
				this.$u.post('/single/index/getMini').then(res => {
					console.log(res,'mini')
					if(res.data.open_check == 1){
						this.open_check = false
					}else{
						this.open_check = true
					}
				})
			},
			//获取用户信息
			getUserInfo(){
				this.$u.post('/single/user/getUserInfo').then(res => {
					console.log(res,'user')
					this.userInfo = res.data
				})
			},
			goTx() {
				if(Number(this.userInfo.money) >= Number(this.priceNum)){
					if(this.priceNum <= 0){
						uni.showToast({
							title:'请输入正确的金额',
							icon:'none'
						})
					}else{
						//支付宝
						if (this.value == 1) {
							this.$u.post('/single/user/commit_withdraw', {
								...this.apply,
								type: 2,
								withdraw_price: this.priceNum
							}).then(res => {
								console.log(res)
								if (res.code == 200) {
									uni.showToast({
										title: '提现申请成功'
									})
									setTimeout(()=>{
										uni.navigateBack({
											delta:-1
										})
									},1500)
								} else if(res.code == 403) {
									uni.showToast({
										title: '提现失败,请检查您的输入项',
										icon:'none'
									})	
								}else {
									uni.showToast({
										title:res.message,
										icon:'none'
									})	
								}
							})
						} else {
							//银行卡
							this.$u.post('/single/user/commit_withdraw', {
								type: 1,
								...this.card,
								withdraw_price: this.priceNum
							}).then(res => {
								console.log(res)
								if (res.code == 200) {
									uni.showToast({
										title: '提现申请成功'
									})
									
								} else {
									uni.showToast({
										title: '提现失败,请检查您的输入项',
										icon:'none'
									})
								}
							})
						}
					}
				}else{
					uni.showToast({
						title:'可提现余额不足',
						icon:'none'
					})
				}
		
			}
		}
	}
</script>

<style lang="scss" scoped>
	// /deep/.u-input__input.data-v-460c1d26 {
	// 	font-size: 65rpx !important;
	// }
	/deep/.data-v-0b986666 {}

	.withdrawal {
		width: 750rpx;
		overflow: hidden;
		border-top: 20rpx solid #F0F1F1;
		.withdrawal-top {
			width: 98%;
			margin: 44rpx 0 0 0rpx;

			>text:nth-child(1) {
				margin-left: 30rpx;
				font-size: 30rpx;
				color: #333333;
			}

			>view:nth-child(2) {
				margin: 44rpx 0 80rpx 0;
				padding-bottom: 42rpx;
				border-bottom: 1px solid #F0F1F1;
				display: flex;
				justify-content: space-between;
				align-items: center;

				>view:nth-child(1) {
					display: flex;
					align-items: center;

					>text:nth-child(1) {
						font-size: 60rpx;
						color: #333333;
						margin-right: 14rpx;
						margin-left: 20rpx;
					}

					/deep/.u-input__input.data-v-460c1d26 {
						font-size: 65rpx !important;
						color: #000;
					}
				}

				>text:nth-child(2) {
					white-space: nowrap;
					margin-right: 30rpx;
					font-size: 24rpx;
					color: #FF7C4C;
				}
			}

			>view:nth-child(3) {
				width: 690rpx;
				height: 70rpx;
				margin: 0 auto;
				line-height: 70rpx;
				text-align: center;
				border-radius: 10rpx;
				background-color: #FF7C4C;
				color: #fff;
			}
		}

		.withdrawal-content {
			width: 100%;
			margin-left: 30rpx;

			>view:nth-child(1) {
				display: flex;
				justify-content: space-between;
				margin-right: 30rpx;
			}

			.list {
				margin-top: 20rpx;
				margin-bottom: 44rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.info-item {
					width: 710rpx;
					margin-right: 30rpx;
					// padding-right: 30rpx;
					margin-bottom: 10rpx;
					border-bottom: 1px solid #F0F1F1;
					text-align: left;
					display: flex;
					align-items: center;

					>text:nth-child(1) {
						width: 200rpx;
						font-size: 30rpx;
						white-space: nowrap;
						color: #666666;
					}

				}
			}

			.shuoming{
				display: flex;
				flex-direction: column;

				text {
					font-size: 30rpx;
					color: #999999;
					margin: 15rpx 0;
				}

				>text:nth-child(1) {
					font-size: 30rpx;
					color: #333333;
				}
			}

		}

		.withdrawal-footer {
			width: 690rpx;
			height: 70rpx;
			margin: 0 auto;
			margin-top: 60rpx;
			border-radius: 15rpx;
			line-height: 70rpx;
			text-align: center;
			color: #FFF;
			background-color: #FF7C4C;
		}
	}
</style>
