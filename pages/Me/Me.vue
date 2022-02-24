<template>
	<view class="my">
		<view class="my-top">
			<view>
				<image :src="userInfo.headimg"  v-if="userInfo" mode="widthFix"></image>
				<image src="../../static/image/meImg/myPromotionImg/user-img.png" v-else></image>
			</view>
			<view v-if="userInfo">
				<text >{{userInfo.nickname}}</text>
				<text >{{userInfo.phone}}</text>
			</view>
			<view v-else @click='goNotLogged'>
				<text>请登录</text>
				<text>请登录</text>
			</view>
			<!-- <image src="../../static/image/meImg/erweimalogo1.png" @click="goMyExtension"> </image> -->
			<image src="../../static/image/meImg/moreRight.png" @click="goInformation"></image>
		</view>
		<view class="my-list">
			<view>
				<text>我的订单</text>
				<view @click="goMyOrder">
					<text>更多</text>
					<image src="../../static/image/meImg/moreRight.png"></image>
				</view>
			</view>
			<view>
				<view class="is-item" @click="goMyorder(1)">
					<image src="../../static/image/meImg/daifukuan2.png"></image>
					<text>待付款</text>
				</view>
				<view class="is-item" @click="goMyorder(2)">
					<image src="../../static/image/meImg/daifahuo1.png"></image>
					<text>待发货	</text>
				</view>
				<view class="is-item" @click="goMyorder(3)">
					<image src="../../static/image/meImg/daishouhuo1.png"></image>
					<text>待收货</text>
				</view>
				<view class="is-item" @click="goMyorder(4)">
					<image src="../../static/image/meImg/daipinglun1.png"></image>
					<text>待评论</text>
				</view>
				<view class="is-item" @click="goMyorder(0)">
					<image src="../../static/image/meImg/yiwancheng2.png"></image>
					<text>已完成</text>
				</view>
			</view>
		</view>
		<view class="my-whole">
			<view class="whole-item" @click="goMyExtension">
				<view>
					<image src="../../static/image/meImg/tuiguang.png" ></image>
					<text>推广二维码</text>
				</view>
				<image src="../../static/image/meImg/moreRight.png" ></image>
			</view>
			<view class="whole-item" @click="goMyMessage">
				<view>
					<image src="../../static/image/meImg/xiaoxi1.png" ></image>
					<text>我的消息</text>
				</view>
				<image src="../../static/image/meImg/moreRight.png" ></image>
			</view>
			<view class="whole-item" @click="goMyWallet">
				<view>
					<image src="../../static/image/meImg/caiwu.png" ></image>
					<text>我的钱包</text>
				</view>
				<image src="../../static/image/meImg/moreRight.png" ></image>
			</view>
			<view class="whole-item" @click="goMyCart">
				<view>
					<image src="../../static/image/meImg/gouwuche.png" ></image>
					<text>购物车</text>
				</view>
				<image src="../../static/image/meImg/moreRight.png"></image>
			</view>
			
			<view class="whole-item" @click="goMyAddress">
				<view>
					<image src="../../static/image/meImg/shouhuodizhi.png" ></image>
					<text>收货地址</text>
				</view>
				<image src="../../static/image/meImg/moreRight.png"></image>
			</view>
			<view class="whole-item" @click="goMyFeedback">
				<view>
					<image src="../../static/image/meImg/yijianfankui1.png" ></image>
					<text>意见反馈</text>
				</view>
				<image src="../../static/image/meImg/moreRight.png"></image>
			</view>
			
			<view class="whole-item" @click="linkService">
				<view>
					<image src="../../static/image/meImg/kefu1.png"></image>
					<text>联系客服</text>
				</view>
				<image src="../../static/image/meImg/moreRight.png"></image>
			</view>
			<view class="whole-item" @click="goMyPromotion">
				<view>
					<image src="../../static/image/meImg/wodetuiguang1.png"></image>
					<text>我的推广</text>
				</view>
				<image src="../../static/image/meImg/moreRight.png"></image>
			</view>
			<view class="whole-item">
				<view>
					<image src="../../static/image/meImg/shouhou.png"></image>
					<text>售后服务</text>
				</view>
				<view class="phone">{{phone}}</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				phone:'',
			}
		},
		onShow() {
			this.getUserInfo()
		},
		onLoad() {
			this.getPhone()
		},
		methods: {
			//获取手机号
			getPhone(){
				this.$u.post('/single/user/getShphone').then(res => {
						this.phone = res.data
					})	
			},
			//联系客服
			linkService(){
				 
				wx.openCustomerServiceChat({
					extInfo:{
						url:'https://work.weixin.qq.com/kfid/kfce91f2a1ff96e790f'
					},
					corpId:'ww3227c3ab52583dfb',
					success:(res)=>{
						console.log(res)
					}
				})
			},
			// 获取个人信息
			getUserInfo(){
				this.userInfo = uni.getStorageSync('userInfo')
				this.$forceUpdate()
			},
			//跳转授权页面
			goNotLogged(){
				uni.navigateTo({
					url:'MeCom/NotLogged/NotLogged'
				})
			},
			// 跳转我的推广图片页面
			goMyExtension(){
				uni.navigateTo({
					url:'MeCom/MyExtension/MyExtension'
				})
			},
			// 跳转我的订单页面
			goMyOrder(){
				uni.navigateTo({
					url:"MeCom/MyOrder/MyOrder"
				})
			},
			// 跳转我的消息页面
			goMyMessage(){
				uni.navigateTo({
					url:"MeCom/MyMessage/MyMessage"
				})
			},
			// 跳转我的钱包页面
			goMyWallet(){
				uni.navigateTo({
					url:"MeCom/MyWallet/MyWallet"
				})
			},
			// 跳转我的推广页面
			goMyPromotion(){
				uni.navigateTo({
					url:'MeCom/MyPromotion/MyPromotion'
				})
			},
			//跳转我的收货地址页面
			goMyAddress(){
				uni.navigateTo({
					url:'MeCom/MyAddress/MyAddress'
				})
			},
			//跳转意见反馈页面
			goMyFeedback(){
				uni.navigateTo({
					url:'MeCom/MyFeedback/MyFeedback'
				})
			},
			// 跳转个人资料页面
			goInformation(){
				uni.navigateTo({
					url:'MeCom/MyInformation/MyInformation'
				})
			},
			//跳转待付款，待发货，待评论...页面
			goMyorder(current){
				uni.navigateTo({
					url:'MeCom/MyOrder/MyOrder?current='+current
				})
			},
			// 跳转购物车页面
			goMyCart(){
				uni.navigateTo({
					url:'MeCom/MyCart/MyCart'
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
.my{
	.my-top{
		display: flex;
		width: 100%;
		height: 220rpx;
		background: linear-gradient(#fde9cf,#fff);;
		border-bottom: 15rpx solid #F0F1F1;
		>view:nth-child(1){
			width: 86rpx;
			height: 86rpx;
			margin-left: 40rpx;
			margin-top: 45rpx;
			image{
				width: 86rpx;
				height: 86rpx;
				vertical-align: middle;
				border-radius: 50%;
				margin-right: 10rpx;
			}
		}
		>view:nth-child(2){
			width: 260rpx;
			display: flex;
			flex-direction: column;
			height: 105rpx;
			color: #000;
			font-size: 24rpx;
			justify-content: space-around;
			margin: 45rpx 20rpx 0rpx 35rpx;
			text{
				width: 260rpx;
				overflow: hidden;
				margin-bottom: 14rpx;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 34rpx;
			}
			text:nth-child(2){
				color: #999;
				font-size: 28rpx;
			}
		}
		>image:nth-child(3){
			width: 18rpx;
			height: 32rpx;
			margin: 75rpx 0 20rpx 268rpx;
			vertical-align: middle;
		}
		/* >image:nth-child(4){
			width: 18rpx;
			height: 32rpx;
			margin: 73rpx 0 20rpx 30rpx;
			vertical-align: middle;
		} */
	}
	.my-list{
		width: 100%;
		height: 250rpx;
		background-color: #fff;
		margin: 0 auto;
		padding: 22rpx 18rpx 1rpx 18rpx;
		border-bottom: 15rpx solid #F0F1F1;
		view:nth-child(1){
			display: flex;
			justify-content: space-between;
			margin-bottom: 42rpx;
			margin-left: 30rpx;
			>text:nth-child(1){
				font-size: 30rpx;
				font-weight: bold;
			}
			>view:nth-child(2){
				margin-top: 2rpx;
				display: flex;
				margin-right: 20rpx;
				>text:nth-child(1){
					font-size: 24rpx;
					color: #999999;
					letter-spacing: 5rpx;
				}
				>image:nth-child(2){
					width: 12rpx;
					height: 22rpx;
					margin-top: 7rpx;
					margin-left: 5rpx;
					vertical-align: middle;
				}
			}
		}
		>view:nth-child(2){
			display: flex;
			justify-content: space-between;
			margin-right: 25rpx;
			.is-item{
				display: flex;
				flex-direction: column;
				align-items: center;
				>image:nth-child(1){
					width: 50rpx;
					height: 52rpx;
					margin-bottom: 18rpx;
				}
			}
		}
	}
	.my-whole{
		padding: 20rpx 32rpx 30rpx 34rpx;
		.whole-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid #e3e3e3;
			padding-bottom: 0rpx;
			margin-bottom: 20rpx;
			overflow: hidden;
			>view:nth-child(1){
				display: flex;
				align-items: center;
				margin-top: 20rpx;
				>image:nth-child(1){
					width: 28rpx;
					height: 28rpx;	
					margin-bottom: 20rpx;
				}
				>text:nth-child(2){
					height: 60rpx;
					font-size: 30rpx;
					color: #333;
					margin-left: 18rpx;
				}
			}
			>image:nth-child(2){
				width: 12rpx;
				height: 22rpx;
				margin-top: 10rpx;
				margin-right: 5rpx;
			}
			.phone{
				font-size: 30rpx;
				color: #333;
			}
		}
	}
}
</style>
