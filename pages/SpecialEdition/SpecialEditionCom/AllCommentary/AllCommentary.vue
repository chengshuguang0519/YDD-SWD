<!-- 全部评论页面，暂时不需要评论模块 -->
<template>
	<view class="commentary">
		<view class="commentary-item" v-for="(item,index) in itemList" :key= 'index'>
			<view class="user-info" >
				<view>
					<image :src="item.headimg"></image>
					<view>
						<text>{{item.nickname}}</text>
						<u-rate :count="item.level" v-model="value" active-color="#FF7C4C" inactive-color='#F0F1F1' size="20"
							disabled class="user-pingfen"></u-rate>
					</view>
				</view>
				<view>{{item.create_time}}</view>
			</view>
			<view class="user-commentary">{{item.content}}</view>
			<view class="merchant-replied" v-if="item.replay_content">商家回复:{{item.replay_content}}
			</view>
			<view class="item-foote"></view>
		</view>
		<view v-if="itemList.length <= 0" style="height:100vh;display: flex;justify-content: center;align-items: center;color: #666;font-size: 60rpx;">
			暂无评论
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsid:'',
				page:1,
				total:0,
				current_page:0,
				last_page:0,
				per_page:0,
				itemList:[],
				count: 5,
				value: 5
			}
		},
		onLoad(option) {
			console.log(option)
			this.goodsid = option.goodsid
			this.getItemList(this.page)
		},
		onPullDownRefresh() {
			this.page = 1
			this.getItemList(this.page)
		},
		onReachBottom() {
			if( Math.ceil(this.total / this.per_page ) >= this.page){
				uni.showToast({
					title:'没有更多数据了~',
					icon:'none'
				})
			}else{
				this.page += 1
				console.log(this.page)
				this.getItemList(this.page)
			}
		},
		methods: {
			getItemList(page){
				uni.request({
					url: this.BaseUrl + '/single/index/comment_list',
					data:{
						goodsid:this.goodsid,
						page:page
					},
					header: {
						'MiniId': 1,
						'token': '',
					},
					success: (res) => {
						console.log(res.data.data,'111')
						this.current_page = res.data.data.current_page
						this.last_page = res.data.data.last_page
						this.per_page = res.data.data.per_page
						this.total = res.data.data.total
						this.itemList = res.data.data.data.concat(this.itemList)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.commentary {
		border-top: 20rpx solid #F0F1F1;
		.commentary-item {
			.user-info {
				display: flex;
				justify-content: space-between;
				width: 100%;
				margin: 36rpx 0 32rpx 0;

				>view:nth-child(1) {
					display: flex;

					>image:nth-child(1) {
						width: 60rpx;
						height: 60rpx;
						margin-right: 10rpx;
						margin-left: 32rpx;
						border-radius: 50%;
					}

					>view:nth-child(2) {
						display: flex;
						flex-direction: column;

						>text:nth-child(1) {
							font-size: 24rpx;
							color: #666;
							margin-bottom: 8rpx;
							margin-left: 5rpx;
						}
					}

					.user-pingfen {
						margin-top: -15rpx;
					}
				}

				>view:nth-child(2) {
					margin-top: 20rpx;
					font-size: 24rpx;
					color: #666;
					margin-right: 30rpx;
				}
			}

			.user-commentary {
				width: 680rpx;
				line-height: 45rpx;
				margin: 0 auto;
				margin-bottom: 16rpx;
				font-size: 24rpx;
				color: #666666;
			}

			.merchant-replied {
				width: 680rpx;
				line-height: 45rpx;
				margin: 0 auto;
				margin-bottom: 16rpx;
				font-size: 24rpx;
				color: #666666;
				background-color: #F0F1F1;
				border-radius: 15rpx;
				padding: 22rpx 24rpx 24rpx 18rpx;
				border-bottom: 1px solid #F0F1F1;
			}
		}
		.item-foote{
			border-top: 1px solid #F0F1F1;
			margin-top: 40rpx;
		}
	}
</style>
