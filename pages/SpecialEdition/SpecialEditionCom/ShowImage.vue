<!-- 产品分享页面，不使用 -->
<template>
	<view class="page">
		<view class="share" @click="shareGoods">
			<image src="../../../static/image/SpecialEditionImg/share.png" mode="widthFix"></image>
		</view>
		<view class="showImg">
			<image src="../../../static/image/SpecialEditionImg/goodsInfo.jpg" mode="widthFix"></image>
		</view>
		<view class="goodsInfo">
			<text>500个-258*330*80mm-250g白卡，普通棉绳</text>
		</view>
		<view class="price">￥115.2</view>

		<view class="share-pop">
			<u-popup v-model="shareShow" mode='bottom'  height="318rpx" border-radius='20'>
				<view class="share-top">
					<view >
						<image src="../../../static/image/SpecialEditionImg/wechat.png"></image>
						<text>微信</text>
						<button type="default" open-type="share"></button>
					</view>
					<view>
						<image src="../../../static/image/SpecialEditionImg/Firendslift.png"></image>
						<text>朋友圈</text>
						<button type="default" open-type="share" ></button>
					</view>
				</view>
				<view class="share-footer" @click="hideShare">取消</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shareShow:false,
			}
		},
		methods: {
			shareGoods() {
				this.shareShow = !this.shareShow
			},
			hideShare(){
				this.shareShow = !this.shareShow
			}			
		},
		onShareAppMessage() {
			console.log('fenxiang')
		},
		onShareTimeline() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		width: 100%;
		background-color: #787878;
		overflow: hidden;

		.share {
			width: 40rpx;
			height: 40rpx;
			margin-left: 90%;
			margin-top: 40rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.showImg {
			width: 100%;
			height: 700rpx;
			margin: 72rpx 0 54rpx 0;
			display: flex;
			align-items: center;
			justify-content: center;

			image {
				width: 100%;
				height: 700rpx;
				opacity: 1 !important;
			}
		}

		.goodsInfo {
			width: 400rpx;
			height: 80rpx;
			line-height: 35rpx;
			margin: 0 auto;
			// margin-top: 0rpx;
			padding: 0rpx 23rpx;
			border: 1px solid #fff;
			border-radius: 40rpx;
			box-sizing: border-box;

			>text:nth-child(1) {
				width: 200rpx;
				font-size: 20rpx;
				color: #fff;
			}
		}

		.price {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 30rpx;
			font-size: 30rpx;
			color: #fff;
		}
	}

	.share-top{
		height: 200rpx;
		width: 100%;
		padding-left: 54rpx;
		display: flex;
		border-bottom: 1px solid  #F0F1F1;
		box-sizing: border-box;
		view{
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			>image:nth-child(1){
				width: 80rpx;
				height: 80rpx;
			}
			>text:nth-child(2){
				font-size: 30rpx;
				color: #666666;
				letter-spacing: 2px;
				margin-top: 7rpx;
			}
			button{
				position: absolute;
				opacity: 0;
				width: 100%;
				height: 100%;
			}
		}
		>view:nth-child(2){
			margin-left: 86rpx;
		}
	}
	.share-footer{
		width: 100%;
		height: 118rpx;
		line-height: 118rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
		color: #666;
		letter-spacing: 10rpx;
	}
</style>
