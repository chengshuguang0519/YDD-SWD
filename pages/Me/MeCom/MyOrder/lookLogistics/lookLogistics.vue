<template>
	<view class="logistics">
		<view class="logistics-top">
			<view>
				<text>物流公司：</text>
				<text>{{itemList.express}}</text>
			</view>
			<view>
				<text>物流单号：</text>
				<text>{{itemList.number}}</text>
				<text @click="copyText">复制</text>
			</view>
		</view>
		<view class="logistics-content">
			<view class="content-top">
				<text>物流追踪</text>
				<view>
					<u-time-line v-for="(item,index) in itemList.data">
						<u-time-line-item nodeTop="2">
							<!-- 此处自定义了左边内容，用一个图标替代 -->
							<template v-slot:node>
								<view :class="index ==0?'u-node-active':'u-node'"
									:style="index ==0?'background: #FF7C4C;':'background: #999;'">
									<!-- 此处为uView的icon组件 -->
								</view>
							</template>
							<template v-slot:content>
								<view>
									<!-- 		<view class="u-order-title">待取件</view> -->
									<view :class="index ==0? 'u-order-desc-active':'u-order-desc'">{{item.context}}
									</view>
									<view :class="index ==0?'u-order-time-active':'u-order-time'">{{item.ftime}}</view>
								</view>
							</template>
						</u-time-line-item>
					</u-time-line>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_sn: '',
				itemList: {}
			}
		},
		onLoad(option) {
			console.log(option)
			this.order_sn = option.order_sn
			this.$u.post('/single/order/seeExpress', {
				sn: this.order_sn
			}).then(res => {
				console.log(res.data, '物流')
				this.itemList = res.data
			})
		},
		methods: {
			//复制单号
			copyText(){
				wx.setClipboardData({
					data:this.itemList.number,
					success: () => {
						wx.getClipboardData({
							success:(res) =>{
								console.log(res.data)
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.logistics {
		.logistics-top {
			width: 100%;
			height: 168rpx;
			border-top: 20rpx solid #F0F1F1;
			border-bottom: 20rpx solid #F0F1F1;
			background-color: #fff;
			padding: 28rpx 30rpx 20rpx 30rpx;

			view {
				display: flex;
			}

			>view:nth-child(1) {
				margin-bottom: 10rpx;

				>text:nth-child(1) {
					font-size: 30rpx;
					color: #999999;
				}

				>text:nth-child(2) {
					font-size: 30rpx;
					color: #333333;
					margin-left: 24rpx;
				}
			}

			>view:nth-child(2) {
				display: flex;
				align-items: center;

				>text:nth-child(1) {
					font-size: 30rpx;
					color: #999999;
				}

				>text:nth-child(2) {
					font-size: 30rpx;
					color: #333333;
					margin-left: 24rpx;
				}

				>text:nth-child(3) {
					font-size: 24rpx;
					color: #999999;
					margin-left: 40rpx;
				}
			}
		}

		.logistics-content {
			width: 100%;
			padding: 22rpx 30rpx 20rpx 30rpx;

			.content-top {
				>text:nth-child(1) {
					font-size: 30rpx;
					color: #333333;
					margin-bottom: 120rpx;
				}

				>view:nth-child(2) {
					margin-top: 30rpx;
				}
			}
		}
	}

	.u-node {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0rpx 1rpx 15rpx 8rpx rgba(213, 202, 205, 0.8);
		background: rgb(213, 202, 205);
		// opacity: .9;
	}

	.u-node-active {
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 0rpx 1rpx 15rpx 8rpx rgba(255, 124, 76, .8);
		background: #FF7C4C;
		opacity: .9;
	}

	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}

	.u-order-desc {
		color: #999999;
		font-size: 24rpx;
		margin-bottom: 6rpx;
	}

	.u-order-desc-active {
		font-size: 24rpx;
		color: #FF7C4C;
		margin-bottom: 6rpx;
	}

	.u-order-time {
		color: #999999;
		font-size: 24rpx;
	}

	.u-order-time-active {
		font-size: 24rpx;
		color: #FF7C4C;
		margin-bottom: 6rpx;
	}
</style>
