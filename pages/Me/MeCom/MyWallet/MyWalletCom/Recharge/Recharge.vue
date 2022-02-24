<template>
	<view class="recharge">
		<view class="recharge-top">
			<text>充值金额</text>
			<view>
				<text>￥</text>
				<u-input v-model="priceNum" type="number" placeholder="请输入充值金额" :clearable='false'
					placeholder-style='font-size:32rpx' />
			</view>
			<view @click="submitRecharge">我要充值</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				priceNum: ''
			}
		},
		onLoad() {
			
		},
		methods: {
			
			submitRecharge() {
				if (this.priceNum.trim()) {
					this.$u.post('/single/user/commit_recharge',{
						pay_money: this.priceNum
					}).then(res => {
						console.log(res)
						if(res.code ==200){
							this.$u.post('/single/user/recharge_pay',{
								order_no:res.data.order_no
							}).then(res => {
								if(res.code == 200){
									console.log(res.data)
									//微信支付
									wx.requestPayment({
									  timeStamp: res.data.timeStamp,
									  nonceStr:res.data.nonceStr,
									  package: res.data.package,
									  signType: res.data.signType,
									  paySign:res.data.paySign,
									  success:(ress)=> {
										  wx.showToast({
										  	title:'充值成功',
											duration:1500
										  })
										  uni.redirectTo({
										  	url:'../../MyWallet'
										  })
									  } 
									})
								}else{
									uni.showToast({
										title:res.message,
										icon:'none'
									})
								}
								
							})
						}else{
							uni.showToast({
									title: '充值失败',
									icon: 'none'
							 })
						}
					})
					// uni.request({
					// 	url: this.BaseUrl + '/single/user/commit_recharge',
					// 	method: 'POST',
					// 	data: {
					// 		pay_money: this.priceNum
					// 	},
					// 	header: {
					// 		'MiniId': 1,
					// 		'token': '',
					// 	},
					// 	success: (res) => {
					// 		console.log(res,'order_no')
					// 		if (res.code = 200) {
					// 			uni.request({
					// 				url: this.BaseUrl + '/single/user/recharge_pay',
					// 				method: 'POST',
					// 				data: {
					// 					order_no:res.data.data.order_no
					// 				},
					// 				header: {
					// 					'MiniId': 1,
					// 					'token': '',
					// 				},
					// 				success: (ress) => {
					// 					console.log(ress)
					// 				}
					// 				})
					// 		} else {
					// 			uni.showToast({
					// 				title: '充值失败',
					// 				icon: 'none'
					// 			})
					// 		}
					// 	}
					// })
				}else {
					uni.showToast({
						title:'请输入金额',
						icon:'none'
					})
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-input__input.data-v-460c1d26 {
		font-size: 65rpx !important;
	}

	.recharge {
		border-top: 20rpx solid #F0F1F1;

		.recharge-top {
			width: 100%;
			margin: 44rpx 0 0 0rpx;

			>text:nth-child(1) {
				margin-left: 30rpx;
				font-size: 30rpx;
				color: #333333;
			}

			>view:nth-child(2) {
				margin: 72rpx 0 206rpx 0;
				padding-bottom: 100rpx;
				border-bottom: 1px solid #F0F1F1;
				display: flex;
				align-items: center;

				>text:nth-child(1) {
					font-size: 60rpx;
					color: #333333;
					margin-right: 14rpx;
					margin-left: 20rpx;
				}

				>u-input:nth-child(2) {
					font-size: 120rpx;
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
	}
</style>
