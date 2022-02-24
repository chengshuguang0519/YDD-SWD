<template>
	<view class="my-message page">
		<view class="message-item" v-for="(item,index) in itemList " :key='index'>
			<view>
				<text class="noneRedDotted">{{item.content}}</text>
			</view>
			<text>{{item.create_time}}</text>
		</view>
		<!-- 		<u-divider color="#666" v-if="none">没有更多数据啦</u-divider> -->
		<u-back-top :scroll-top="scrollTop" top="1200" bottom='55' mode="circle" duration='1000' ></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				page: 1,
				current_page: '',
				last_page: '',
				per_page: '',
				total: '',
				itemList: [],
				code: '',
				scrollTop: 0,
			}
		},
		onLoad() {
			this.getItemList(this.page)
		},
		onReachBottom() {
			if (Math.ceil(this.total / this.per_page) <= this.page) {
				uni.showToast({
					title: '没有更多数据了~',
					icon: "none"
				})
			} else {
				this.page += 1
				console.log(this.page)
				this.getItemList(this.page)
			}

		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
		},
		methods: {
			getItemList(page) {
				this.$u.post('/single/user/message_list').then(res => {
					console.log(res)
					this.total = res.data.total
					this.last_page = res.data.last_page
					this.per_page = res.data.per_page
					this.current_page = res.data.current_page
					this.itemList = page!=1?this.itemList.concat(res.data.data):res.data.data
				})
			}
		},

	}
</script>

<style lang="scss">
	body {
		background-color: #F0F1F1;
	}

	.my-message {
		border-top: 20rpx solid #F0F1F1;
		margin-bottom: 50rpx;

		.message-item {
			width: 690rpx;
			padding: 22rpx 30rpx 20rpx 10rpx;
			margin: 0 auto;
			margin-top: 20rpx;
			display: flex;
			flex-direction: column;
			background-color: #FFF;
			border-radius: 15rpx;

			>view:nth-child(1) {
				flex: 1;
				display: flex;
				// align-items: center;
				// margin-right: 60rpx;
				margin-bottom: 12rpx;

				.redDotted {
					width: 16rpx;
					height: 16rpx;
					margin-right: 16rpx;
					margin-top: 10rpx;
					border-radius: 50%;
					background-color: #FF0000;
					display: block;
				}

				>text:nth-child(2) {
					flex: 1;
					font-size: 30rpx;
					color: #333333;
					// overflow: hidden;
					// text-overflow: ellipsis;
					// display: -webkit-box;
					// -webkit-line-clamp: 2;
					// -webkit-box-orient: vertical;
					// word-break: break-all;
				}
			}

			>text:nth-child(2) {
				font-size: 24rpx;
				margin-left: 35rpx;
				color: #666666;
			}
		}
	}

	.noneRedDotted {
		flex: 1;
		font-size: 30rpx;
		color: #333333;
		margin-left: 30rpx;
	}
</style>
