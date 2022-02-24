<template>
	<view class="information">
		<view class="information-top">
			<view class="top-item">
				<text>头像</text>
				<view>
					<image :src="userInfo.headimg"></image>
<!-- 					<image src="../../../../static/image/meImg/myWalletImg/rightM.png" @click="changeUserImg"></image> -->
				</view>
			</view>
			<view class="top-item">
				<text>昵 称</text>
				<view >
					<text class="user-title">{{userInfo.nickname}}</text>
				</view>
			</view>
			<view class="top-item">
				<text>手机号码</text>
				<view>
					<text class="user-title">{{userInfo.phone}}</text>
				</view>
			</view>
			<view class="top-item">
				<text>ID</text>
				<view>
					<text class="user-title">{{userInfo.id}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="user-footer">保存</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				textShow:true
			}
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods: {
		
		}
	}
</script>

<style lang="scss">
	.information {
		.information-top {
			width: 100%;
			height: 820rpx;
			padding: 36rpx 30rpx 0rpx 32rpx;
			border-top: 20rpx solid #F0F1F1;

			.top-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #F0F1F1;
				padding-bottom: 18rpx;
				margin-bottom: 20rpx;

				>text:nth-child(1) {
					font-size: 30rpx;
					color: #333333;
				}

				>view:nth-child(2) {
					display: flex;
					align-items: center;

					>image:nth-child(1) {
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
					}

					>image:nth-child(2) {
						width: 10rpx;
						height: 20rpx;
						margin-left: 24rpx;
					}
				}

				.user-title {
					font-size: 30rpx;
					color: #333333;
				}
			}
		}
		.user-footer{
			width: 690rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			background-color: #FF7C4C;
			border-radius: 15rpx;
			color: #fff;
			margin: 0 auto;
			margin-top: 220rpx;
		}
	}
</style>
