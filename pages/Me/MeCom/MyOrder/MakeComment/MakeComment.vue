<template>
	<view class="comment">
		<view class="comment-top">
			<image src="/static/image/meImg/myOrderImg/makeComment/goodsInfo.png"></image>
			<text>手提袋纸袋牛皮纸定制礼品礼物服装店高档购物包装袋子印刷logo手提袋纸袋牛皮纸定制礼品礼物服装店高档购物包装袋子印刷logo手提袋纸袋牛皮纸定制礼品礼物服装店高档购物包装袋子印刷logo</text>
		</view>
		<view class="goods-rate">
			<text>商品质量</text>
			<u-rate :count="count" v-model="value" active-color="#FF7C4C" inactive-color='#F0F1F1' size="30"
			 class="user-pingfen"></u-rate>
		</view>
		<view class="feedback-top">
			<u-input v-model="rate" type="textarea" 
			:clearable='false' class="ipt" 
			maxlength="2000"
			placeholder="点评一下吧，您的意见很重要哦~"/>
		</view>
		<view class="submit" @click="submitInfo">
			<text>发 表</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:5,
				value:0
			}
		},
		methods: {
			submitInfo(){
				uni.showToast({
					title:'发表成功'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment{
		border-top: 20rpx solid #F0F1F1;
		.comment-top{
			display: flex;

			margin:22rpx 46rpx 50rpx 30rpx ;
			>image:nth-child(1){
				width: 150rpx;
				height: 150rpx;
				margin-right: 16rpx;
			}
			>text:nth-child(2){
				width: 508rpx;
				line-height: 50rpx;
				font-size: 30rpx;
				font-weight: 700;
				color: #333333;
		        display: -webkit-box;
		        -webkit-line-clamp: 3;
		       -webkit-box-orient: vertical;
		        overflow: hidden;
			}
		}
		.goods-rate{
			margin-left: 32rpx;
			margin-bottom: 34rpx;
			>text:nth-child(1){
				font-size: 30rpx;
				margin-right: 32rpx;
				color: #666666;
			}
		}
		.feedback-top{
			width: 690rpx;
			margin: 0 auto;
			background-color: #F0F1F1;
			padding: 10rpx 30rpx 100rpx;
			border-radius: 15rpx;
			>text:nth-child(1){
				font-size: 30rpx;
				color: #333333;
				margin-bottom: 40rpx;
			}
		}
		.submit{
			width: 690rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			margin: 0 auto;
			margin-top: 520rpx;
			color: #FFFFFF;
			background-color: #FF7C4C;
			border-radius: 15rpx;
		}
	}
</style>
