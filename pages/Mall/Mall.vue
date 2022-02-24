<template>
	<view class="mall">	
		<view>
			<image src="../../static/image/mallImg/more.png"></image>
		</view>
		<view class="title" @click="goToMiniProgram">更多商品点击此处跳转</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				sysHeight: 0,
				height:0,
				menuBotton: 0,
				menuHeight: 0				
			}
		},
		onLoad() {
			var status = uni.getSystemInfoSync().statusBarHeight
			console.log(status)
			//获取胶囊的信息
			var menu =  uni.getMenuButtonBoundingClientRect()
			console.log('胶囊',menu)
			//获取系统信息
			uni.getSystemInfo({
				success: (res) => {
					console.log('系统',res)
					this.sysHeight = res.statusBarHeight
					this.height = menu.height  + (menu.top - res.statusBarHeight) * 2
				}
			})
		},
		methods: {
			goToMiniProgram() {
				uni.navigateTo({
					url: './MallCom/NavTo/NavTo',
				})
			}
		}
	}
</script>

<style lang="scss">
	.mall {
		width: 100%;
		background-color: #FFF;

		view:nth-child(1) {
			width: 400rpx;
			height: 262rpx;
			margin-left: 50%;
			margin-top: 484rpx;
			margin-bottom: 118rpx;
			transform: translate(-50%);

			>image:nth-child(1) {
				width: 400rpx;
				height: 262rpx;
			}
		}

		.title {
			width: 360rpx;
			height: 54rpx;
			line-height: 54rpx;
			text-align: center;
			border-radius: 8rpx;
			font-size: 30rpx;
			margin: 0 auto;
			color: #FFF;
			background-color: #EC8235;

		}
	}
</style>
