<template>
	<view class="userNum">
		<view class="userNum-item" v-for="(item,index) in itemList" :key='index' v-if="itemList.length>0">
			<view>
				<image :src="item.headimg"></image>
			</view>
			<view>
				<text>{{item.nickname}}</text>
			</view>
			<view>
				<text>+{{item.total_money}}</text>
				<text>收 益</text>
			</view>
		</view>
		<view class="noItme"  v-if="itemList.length<=0" >
			暂时没有数据哦~
		</view>
		<u-back-top :scroll-top="scrollTop" top="1200" bottom='55' mode="circle" duration='1000' ></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				itemList:[]
			}
		},
		onPageScroll(e) {
				this.scrollTop = e.scrollTop;
		},
		onLoad() {
			this.getItemList()
		},
		methods:{
			getItemList(){
				this.$u.post('single/user/childList').then(res => {
						console.log(res,'111')
						this.itemList = res.data
					})				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.userNum {
		border-top: 20rpx solid #F0F1F1;
		.userNum-item{
			width: 100%;
			display: flex;
			align-items: center;
			margin-top: 30rpx;
			margin-bottom: 30rpx;
			padding: 0 30rpx 20rpx;
			border-bottom: 1px solid #F0F1F1;
			>view:nth-child(1){
				width: 70rpx;
				height: 70rpx;
				image{
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
				}
			}
			>view:nth-child(2){
				display: flex;
				flex-direction: column;
				margin-top: 5rpx;
				margin-left: 10rpx;
				>text:nth-child(1){
					font-size: 30rpx;
					font-weight: bold;
					color: #333333;
					margin-bottom: -2rpx;
					margin-left: 8rpx;
					white-space: nowrap;
				}
			}
			>view:nth-child(3){
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-left: 350rpx;
				margin-right: 30rpx;
				>text:nth-child(1){
					font-size: 30rpx;
					font-weight: bold;
					color: #FF0000;
					margin-bottom: 4rpx;
					white-space: nowrap;
				}
				>text:nth-child(2){
					font-size: 20rpx;
					color: #666;
					white-space: nowrap;
				}
			}
		}
	}
	.noItme{
		width: 350rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		margin: 0 auto;
		margin-top: 200rpx;
		font-size: 36rpx;
	}
</style>
