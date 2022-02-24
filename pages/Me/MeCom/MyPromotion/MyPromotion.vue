<template>
	<view >
		<view class="promotion">
			<view class="promotion-top"></view>
			<view class="promotion-user">
				<image :src="userInfo.headimg"></image>
				<view>{{userInfo.nickname}}</view>
				<view>
					<text>总收益</text>
					<text>{{totalP}}</text>
				</view>
				<view>
					<view @click="goUserNum">
						<text>用户数量:</text>
						<text>{{userNum}}</text>
						<text>人</text>
					</view>
					<text>|</text>
					<view>
						<text>推广佣金:</text>
						<text>{{totalP}}</text>
						<text>元</text>
					</view>
				</view>
			</view>
		</view>
		<view class="all-earnings">
			<view class="earnings-top">全部收益</view>
			<view class="earnings-list">
				<view class="list-item" v-for="(item,index) in itemlist" :key='index'>
					<text>{{item.create_time}}</text>
					<text>+{{item.price}}</text>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				totalP:'',
				userNum:'',
				itemlist:[]
			}
		},
		onLoad() {
			this.getItemList()
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods: {
			getItemList(){
				this.$u.post('/single/user/tuiInfo').then(res => {
						console.log(res,'111')
						this.totalP = res.data.tuimoney
						this.userNum = res.data.usernum
						this.itemlist = res.data.list
					})				
			},
			goUserNum(){
				uni.navigateTo({
					url:'../UserNum/UserNum'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.promotion{
		position: relative;
		.promotion-top{
			position: absolute;
			width: 100%;
			height: 230rpx;
			background-color: #FE565B;
			border-bottom-left-radius: 80rpx;
			border-bottom-right-radius: 80rpx;
			margin-bottom: 250rpx;
		}
		.promotion-user{
			position: relative;
			width: 718rpx;
			height: 352rpx;
			margin-bottom: 38rpx;
			left: 50%;
			top: 70rpx;
			transform: translate(-50%);
			background: url(../../../../static/image/meImg/myPromotionImg/bgc.png) no-repeat;
			background-size: 718rpx 352rpx;
			z-index: 99;
			>image:nth-child(1){
				position: absolute;
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				left: 25rpx;
				top: 8rpx;
			}
			>view:nth-child(2){
				position: absolute;
				top: 50rpx;
				left: 120rpx;
				font-size: 24rpx;
				color: #333333;
			}
			>view:nth-child(3){
				position: absolute;
				display: flex;
				flex-direction: column;
				align-items: center;
				top: 32%;
				left: 50%;
				transform: translate(-50%);
				>text:nth-child(1){
					font-size: 24rpx;
					color: #333333;
					margin-bottom: 10rpx;
				}
				>text:nth-child(2){
					font-size: 36rpx;
					color: #FF0000;
				}
			}
			>view:nth-child(4){
				width: 88%;
				position: absolute;
				display: flex;
				justify-content: space-between;
				padding: 0 30rpx;
				top: 68%;
				left: 50%;
				transform: translate(-50%);
				>text:nth-child(2){
					position: absolute;
					left: 49%;
					width: 1rpx;
				}
				view{
					white-space: nowrap;
					>text:nth-child(1){
						font-size: 24rpx;
						color: #666666;
						margin-right: 10rpx;
						
					}
					>text:nth-child(2){
						font-size: 34rpx;
						color: #333333;
						// position: absolute;
					}
					>text:nth-child(3){
						font-size: 24rpx;
						color: #666666;
						margin-left: 10rpx;
					}
				
				}
				view:nth-child(2){
					>text:nth-child(1){
						margin-left: 50rpx;
					}
				}
				view:nth-child(3){
					margin-left: -38rpx;
				}
			}
		}
		
	}
	.all-earnings{
		width: 100%;
		margin-top: 90rpx;
		.earnings-top{
			font-size: 30rpx;
			color: #333;
			margin-bottom: 50rpx;
			margin-left: 30rpx;
		}
		.earnings-list{
			.list-item{
				display: flex;
				justify-content: space-between;
				padding-bottom: 20rpx;
				margin-bottom: 30rpx;
				border-bottom: 1px solid #F0F1F1;
				font-size: 24rpx;
				color: #666666;
				>text:nth-child(1){
					margin-left: 30rpx;
					
				}
				>text:nth-child(2){
					margin-right: 30rpx;
				}
			}
		}
	}
</style>
