<template>
	<view class="pay-success">
		<view class="pay-top">
			<image src="../../../../../static/image/meImg/myOrderImg/paySuccessImg/success.png"></image>
			<text>订单支付成功</text>
			<text>您可以在我的订单中查看详情或跟踪物流信息</text>
		</view>
		<view class="pay-footer">
			<text @click="goIndex">返回商品列表</text>
			<text @click="goMyOrder">查看订单详情</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goIndex(){
				uni.switchTab({
					url:'../../../../SpecialEdition/SpecialEdition'
				})
			},
			goMyOrder(){
				uni.navigateTo({
					url:'../MyOrder'
				})
			}
		}
	}
</script>

<style lang="scss">
	body{
		background-color: #F0F1F1;
	}
	.pay-success{
		.pay-top{
			margin-top: 156rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			>image:nth-child(1){
				width: 178rpx;
				height: 178rpx;
			}
			>text:nth-child(2){
				font-size: 30rpx;
				color: #333333;
			}
			>text:nth-child(3){
				font-size: 24rpx;
				color: #999999;
				margin-top: 30rpx;
			}
		}
		.pay-footer{
			margin-top: 216rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			>text:nth-child(1){
				width: 600rpx;
				height: 70rpx;
				line-height: 70rpx;
				margin-bottom: 36rpx;
				text-align: center;
				background-color: #FF7C4C;
				color: #FFFFFF;
				border-radius: 10rpx;
				
			}
			>text:nth-child(2){
				width: 600rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				border:1px solid  #FF7C4C;
				color: #FF7C4C;
				border-radius: 10rpx;
			}
		}
	}
</style>
