<template>
	<view class="wallet">
		<view class="wallet-top">
			<view class="top-one">
				<text>账户余额(元)</text>
				<text>{{userInfo.money}}</text>
			</view>
			<view class="top-choose">
				<text class="choose-item" v-for="(item,index) in topChooseList" :key='index' @click="itemChange(index)"
					:class="currentIndex == index? 'active':'' ">{{item}}</text>
			</view>
		</view>
		<view class="wallet-list">
			<view class="list-top">
				<text>账单记录</text>
				<view @click="goMyBill">
					<text>查看更多账单</text>
					<image src="../../../../static/image/meImg/myWalletImg/rightM.png"></image>
				</view>
			</view>
			<view class="list-content">
				<view class="list-item" v-for="(item,index) in itemList" :key='index'>
					<view>
						<text>{{item.desc}}</text>
						<view>
							<text v-if="item.type== 1 ||item.type== 3||item.type ==5 ||item.type ==6||item.type ==7">+</text>
							<text v-if="item.type== 2">-</text>
							<text>{{item.price}}</text>
						</view>
					</view>
					<view>
						<text>{{item.create_time}}</text>
						<text v-if="item.type == 4 &&item.check_type ==2" class="red">提现失败</text>
						<tetx v-if="item.type == 4 &&item.check_type ==1" class="info">提现成功</tetx>
						<text v-if='item.type ==3' class="red">充值成功</text>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				topChooseList: ['充值余额', '提现'],
				currentIndex: 0,
				itemList: [],
				userInfo:{},
			}
		},
		onShow() {
			this.getUserInfo()
			this.getItemList()
		},
		
		methods: {
			getUserInfo(){
				this.$u.post('/single/user/getUserInfo').then(res => {
					console.log(res,'user')
					this.userInfo = res.data
				})
			},
			getItemList() {
				this.$u.post('/single/user/get_account_log  ').then(res => {
					console.log(res, '111')
					this.itemList = res.data
				})

			},
			itemChange(index) {
				this.currentIndex = index
				if (index == 0) {
					uni.navigateTo({
						url: "MyWalletCom/Recharge/Recharge"
					})
				} else if (index == 1) {
					uni.navigateTo({
						url: 'MyWalletCom/Withdrawal/Withdrawal'
					})
				}
			},
			// 跳转更多账单页面
			goMyBill() {
				uni.navigateTo({
					url: 'MyWalletCom/MyMoreBill/MyMoreBill'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.active {
		background-color: #FF7C4C !important;
		color: #FFFFFF !important;
	}

	.wallet {
		border-top: 20rpx solid #F0F1F1;

		.wallet-top {
			width: 100%;
			height: 490rpx;
			border-bottom: 20rpx solid #F0F1F1;

			.top-one {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 600rpx;
				height: 300rpx;
				background: url(../../../../static/image/meImg/myWalletImg/bgc.png) no-repeat;
				background-size: 600rpx 300rpx;
				margin: 24rpx auto 42rpx;

				>text:nth-child(1) {
					font-size: 24rpx;
					margin: 50rpx 0 10rpx 0;
					color: #fff;
				}

				>text:nth-child(2) {
					font-size: 60rpx;
					color: #fff;
					margin-bottom: 130rpx;
				}
			}

			.top-choose {
				display: flex;
				justify-content: space-around;

				.choose-item {
					width: 260rpx;
					height: 70rpx;
					line-height: 70rpx;
					margin-left: 50rpx;
					text-align: center;
					background-color: #F0F1F1;
					color: #FF7C4C;
					border-radius: 40rpx;
				}

				text:nth-child(2) {
					margin-right: 55rpx;
				}
			}
		}

		.wallet-list {
			width: 100%;
			margin: 34rpx 0rpx 20rpx 0rpx;
			background-color: #fff;

			.list-top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 54rpx;

				>text:nth-child(1) {
					margin-left: 32rpx;
					font-size: 30rpx;
					color: #333333;
				}

				>view:nth-child(2) {
					margin-right: 30rpx;

					>text:nth-child(1) {
						font-size: 24rpx;
						color: #999999;
					}

					>image:nth-child(2) {
						width: 10rpx;
						height: 16rpx;
						margin-left: 10rpx;
					}
				}
			}

			.list-content {
				.list-item {
					width: 100%;
					border-bottom: 1px solid #F0F1F1;
					margin-bottom: 20rpx;

					view {
						display: flex;
						justify-content: space-between;
						margin-bottom: 10rpx;

						>text:nth-child(1) {
							font-size: 24rpx;
							margin-left: 32rpx;
							color: #333333;
						}
						
						>view:nth-child(2){
							text{
								font-size: 24rpx;
								color: #999999;
							}
							>text:nth-child(2){
								margin-right: 32rpx;
							}
						}
					}

					>view:nth-child(2) {
						>text:nth-child(1) {
							font-size: 24rpx;
							color: #999999;
						}

						.info{
							font-size: 20rpx;
							margin-right: 32rpx;
							color: #666666;
						}
					}
				}
			}
		}
	}

	.red {
		color: #FF0000 !important;
		font-size: 20rpx !important;
		margin-right: 32rpx !important;

	}
</style>
