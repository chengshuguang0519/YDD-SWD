<template>
	<view class="more-bill">
		<view class="bill-top">
			<view class="bill-item" v-for="(item,index) in itemList" :key='index'>
				<view>
					<text>{{item.desc}}</text>
					<view>
						<text v-if="item.type== 1 ||item.type== 3||item.type ==5 ||item.type ==6||item.type ==7">+</text>
						<text v-if="item.type== 2">-</text>
						<text >{{item.price}}</text>
					</view>
				</view>
				<view>
					<text>{{item.create_time}}</text>
					<text v-if="item.type == 4 &&item.check_type ==2" class="red">提现失败</text>
					<tetx v-if="item.type == 4 &&item.check_type ==1" class="info">提现成功</tetx>
					<text v-if='item.type ==3' class="red">充值成功</text>
				</view>
			</view>
<!-- 			<view class="bill-item">
				<view>
					<text>提现到微信</text>
					<text>-100.00</text>
				</view>
				<view>
					<text>2021-10-14 15:30:22</text>
					<text>提现成功</text>
				</view>
			</view>
			<view class="bill-item">
				<view>
					<text>提现到微信</text>
					<text>-100.00</text>
				</view>
				<view>
					<text>2021-10-14 15:30:22</text>
					<text class="red">提现失败</text>
				</view>
			</view>
			<view class="bill-item">
				<view>
					<text>提现到微信</text>
					<text>-100.00</text>
				</view>
				<view>
					<text>2021-10-14 15:30:22</text>
					<text>提现成功</text>
				</view>
			</view>
			<view class="bill-item">
				<view>
					<text>提现到微信</text>
					<text>-100.00</text>
				</view>
				<view>
					<text>2021-10-14 15:30:22</text>
					<text >提现成功</text>
				</view>
			</view>
			
			<view class="bill-item">
				<view>
					<text>充值余额</text>
					<text class="red">+50.00</text>
				</view>
				<view>
					<text>2021-10-14 15:30:22</text>
					<text >充值成功</text>
				</view>
			</view> -->
		</view>
		<u-back-top :scroll-top="scrollTop" top="1200" bottom='55' mode="circle" duration='1000' ></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				page:1,
				itemList:[],
				total:'',
				per_page:'',
			}
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.getItemList(this.page)
		},
		onReachBottom() {
			if (Math.ceil(this.total / this.per_page) <= this.page) {
				console.log('1111')
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
		methods: {
			getItemList(page){
				this.$u.post('/single/user/get_account_log',{
					page:page
				}).then(res => {
						console.log(res,'111')
						this.itemList = page!=1?this.itemList.concat(res.data.data):res.data.data
						this.total = res.data.total
						this.per_page = res.data.per_page
					})
							
			},
		}
	}
</script>

<style lang="scss" scoped>
	.more-bill{
		border-top: 20rpx solid #F0F1F1;
		.bill-top{
			.bill-item{
				width: 100%;
				height: 106rpx;
				margin-top: 20rpx;
				margin-bottom: 10rpx;
				padding-bottom: 10rpx;
				border-bottom: 1px solid #F0F1F1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				view{
					display: flex;
					justify-content: space-between;
					>text:nth-child(1){
						margin-left: 32rpx;
						font-size: 24rpx;
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
					// >text:nth-child(2){
					// 	font-size: 24rpx;
					// 	margin-right: 32rpx;
					// 	color: #999999;
					// }
				}
				>view:nth-child(2){
					>text:nth-child(1){
						margin-left: 32rpx;
						font-size: 20rpx;
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
	.red{
		color: #FF0000!important;
		font-size: 20rpx!important;
		margin-right: 32rpx!important;
		
	}
</style>
