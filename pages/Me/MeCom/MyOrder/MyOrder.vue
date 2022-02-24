<template>
	<view class="order">
		<u-tabs :list="list" :is-scroll="false" :current="current" active-color='#FF7C4C' bar-width='100'
			@change="change">
		</u-tabs>
		<!-- 	全部订单！！！！！！！！！！！！！！！！ -->
		<block v-if="current == 0">
			<view class="all-order">
				<view class="all-item" v-for="(item,index) in itemList" :key='index' @click="goGoodsDetails(item.id,0)">
					<!-- item.status==-1?'已取消':item.status==0?'待付款':item.status==1?'待发货':item.status==2?'待收货':item.status==3?'待评价':'已完成' -->
					<view>
						{{item.status_msg}}
					</view>
					<view class="item-list" v-for="(itemm,index) in item.list" :key='index'>
						<view>
							<image :src="itemm.goods_logo" ></image>
						</view>
						<view :class="item.order_type ==1?'special':'' ">
							<text>{{itemm.goods_title}}</text>
							<text>{{itemm.goods_spec}}</text>
							<text v-html="itemm.mini_tilte"></text>
						</view>
						<view v-if="item.order_type != 1" >
							<text>￥{{itemm.price}}</text>
							<text>x{{itemm.number}}</text>
						</view>
					</view>
					<view class="item-price">
						<view>
							<text>运费</text>
							<text>￥{{item.price_express}}</text>
						</view>
						<view>
							<text>总 价</text>
							<text>￥{{item.price_total}}</text>
						</view>
						<view>
							<text>实付款</text>
							<text>￥{{item.price_total}}</text>
						</view>
						<!-- <text>总 价￥{{item.price_total}}</text>
						<text>实付款￥{{item.price_total}}</text> -->
					</view>
					<view class="item-change">
						<text v-if="item.status_msg == '待付款'" @click.stop='cancelsOrder(item.id)'>取消订单</text>
						<text v-if="item.status_msg == '待评论'||item.status_msg == '待发货'" @click.stop="goRefund(item)">申请退款</text>
						<text @click.stop="linkService">联系客服</text>
						<text v-if="item.status_msg == '待收货' 	" @click.stop="goLogistics(item.order_sn)">查看物流</text>
						<text v-if="item.status_msg == '待付款'" @click.stop="goPayOrder(item.pay_type,item.id)">去支付</text>
						<text v-if="item.status_msg == '待收货' 	" @click.stop="SureGoods(item.id)">确认收货</text>
						<text v-if="item.status_msg == '待发货' 	" @click.stop="Rush(item.id)">催发货</text>
						<text v-if="item.status_msg == '待评论'">再次购买</text>
						<!-- 						<text @click="goComment">立即评论</text> -->
					</view>
				</view>
			</view>
		</block>
		<!-- 待付款 ！！！！！！！！！！！！！！！-->
		<block v-if="current == 1">
			<view class="all-item" v-for="(item,index) in itemList" :key='index' @click="goGoodsDetails(item.id,1)">
				<view>
					{{item.status==-1?'已取消':item.status==0?'待付款':item.status==1?'待发货':item.status==2?'待收货':item.status==3?'待评价':'已完成'}}
				</view>
				<view class="item-list" v-for="(itemm,index) in item.list" :key='index'>
					<view>
						<image :src="itemm.goods_logo"></image>
					</view>

					<view :class="item.order_type ==1?'special':'' ">
						<text>{{itemm.goods_title}}</text>
						<text>{{itemm.goods_spec}}</text>
						<text v-html="itemm.mini_tilte"></text>
					</view>
					<view v-if="item.order_type != 1" >
						<text>￥{{itemm.price}}</text>
						<text>x{{itemm.number}}</text>
					</view>
				</view>
				<view class="item-price">
					<view>
						<text>运费</text>
						<text>￥{{item.price_express}}</text>
					</view>
					<view>
						<text>总 价</text>
						<text>￥{{item.price_total}}</text>
					</view>
					<view>
						<text>实付款</text>
						<text>￥{{item.price_total}}</text>
					</view>
					<!-- <text>总 价￥{{item.price_total}}</text>
					<text>实付款￥{{item.price_total}}</text> -->
				</view>
				<view class="item-change">
					<text @click.stop='cancelsOrder(item.id)'>取消订单</text>
					<text @click.stop="linkService">联系客服</text>
					<text @click.stop="goPayOrder(item.pay_type,item.id)">去支付</text>
				</view>
			</view>

		</block>
		<!-- 	待发货！！！！！！！！！！！！ -->
		<block v-if="current == 2">
			<view class="all-item" v-for="(item,index) in itemList" :key='index' @click="goGoodsDetails(item.id,2)">
				<!-- item.status==-1?'已取消':item.status==0?'待付款':item.status==1?'待发货':item.status==2?'待收货':item.status==3?'待评价':'已完成' -->
				<view>
					{{item.status==-1?'已取消':item.status==0?'待付款':item.status==1?'待发货':item.status==2?'待收货':item.status==3?'待评价':'已完成'}}
				</view>
				<view class="item-list" v-for="(itemm,index) in item.list" :key='index'>
					<view>
						<image :src="itemm.goods_logo" ></image>
					</view>
					<view :class="item.order_type ==1?'special':'' ">
						<text>{{itemm.goods_title}}</text>
						<text>{{itemm.goods_spec}}</text>
						<text v-html="itemm.mini_tilte"></text>
					</view>
					<view v-if="item.order_type != 1" >
						<text>￥{{itemm.price}}</text>
						<text>x{{itemm.number}}</text>
					</view>
				</view>
				<view class="item-price">
					<view>
						<text>运费</text>
						<text>￥{{item.price_express}}</text>
					</view>
					<view>
						<text>总 价</text>
						<text>￥{{item.price_total}}</text>
					</view>
					<view>
						<text>实付款</text>
						<text>￥{{item.price_total}}</text>
					</view>
					<!-- <text>总 价￥{{item.price_total}}</text>
					<text>实付款￥{{item.price_total}}</text> -->
				</view>
				<view class="item-change">
					<text @click.stop="goRefund(item)">申请退款</text>
					<text @click.stop="linkService">联系客服</text>
					<text @click.stop="Rush(item.id)">催发货</text>
				</view>
			</view>


		
		</block>

		<!-- 待收货 -->
		<block v-if="current == 3">
			<view class="all-item" v-for="(item,index) in itemList" :key='index' @click="goGoodsDetails(item.id,3)">
				<!-- item.status==-1?'已取消':item.status==0?'待付款':item.status==1?'待发货':item.status==2?'待收货':item.status==3?'待评价':'已完成' -->
				<view>
					{{item.status==-1?'已取消':item.status==0?'待付款':item.status==1?'待发货':item.status==2?'待收货':item.status==3?'待评价':'已完成'}}
				</view>
				<view class="item-list" v-for="(itemm,index) in item.list" :key='index'>
					<view>
						<image :src="itemm.goods_logo" ></image>
					</view>
					<view :class="item.order_type ==1?'special':'' ">
						<text>{{itemm.goods_title}}</text>
						<text>{{itemm.goods_spec}}</text>
						<text v-html="itemm.mini_tilte"></text>
					</view>
					<view v-if="item.order_type != 1">
						<text>￥{{itemm.price}}</text>
						<text>x{{itemm.number}}</text>
					</view>
				</view>
				<view class="item-price">
					<view>
						<text>运费</text>
						<text>￥{{item.price_express}}</text>
					</view>
					<view>
						<text>总 价</text>
						<text>￥{{item.price_total}}</text>
					</view>
					<view>
						<text>实付款</text>
						<text>￥{{item.price_total}}</text>
					</view>
					<!-- <text>总 价￥{{item.price_total}}</text>
					<text>实付款￥{{item.price_total}}</text> -->
				</view>
				<view class="item-change">
					<text @click.stop="linkService">联系客服</text>
					<text @click.stop="goLogistics(item.order_sn)">查看物流</text>
					<text @click.stop="SureGoods(item.id)">确认收货</text>
				</view>
			</view>
		</block>
		<!-- 	待评论 -->
		<block v-if="current == 4">
			<view class="all-item" v-for="(item,index) in itemList" :key='index' @click="goGoodsDetails(item.id,4)">
				<!-- item.status==-1?'已取消':item.status==0?'待付款':item.status==1?'待发货':item.status==2?'待收货':item.status==3?'待评价':'已完成' -->
				<view>
					{{item.status==-1?'已取消':item.status==0?'待付款':item.status==1?'待发货':item.status==2?'待收货':item.status==3?'待评价':'已完成'}}
				</view>
				<view class="item-list" v-for="(itemm,index) in item.list" :key='index'>
					<view>
						<image :src="itemm.goods_logo" ></image>
					</view>
					<view :class="item.order_type ==1?'special':'' ">
						<text>{{itemm.goods_title}}</text>
						<text>{{itemm.goods_spec}}</text>
						<text v-html="itemm.mini_tilte"></text>
					</view>
					<view v-if="item.order_type != 1" >
						<text>￥{{itemm.price}}</text>
						<text>x{{itemm.number}}</text>
					</view>
				</view>
				<view class="item-price">
					<view>
						<text>运费</text>
						<text>￥{{item.price_express}}</text>
					</view>
					<view>
						<text>总 价</text>
						<text>￥{{item.price_total}}</text>
					</view>
					<view>
						<text>实付款</text>
						<text>￥{{item.price_total}}</text>
					</view>
					<!-- <text>总 价￥{{item.price_total}}</text>
					<text>实付款￥{{item.price_total}}</text> -->
				</view>
				<view class="item-change">
					<text @click.stop="goRefund(item)">申请退款</text>
					<text @click.stop="goGoodsList(item.order_type)">再次购买</text>
				</view>
			</view>
		</block>
		<u-back-top :scroll-top="scrollTop" top="1200" bottom='55' mode="circle" duration='1000' ></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					name: '全 部'
				}, {
					name: '待付款'
				}, {
					name: '待发货',
				}, {
					name: '待收货',
				}, {
					name: '待评价',
					// count: 5
				}],
				itemList: [],
				quanbuList: ['联系客服', '查看物流', '确认收货'],
				daifukuanList: ['联系客服', '去支付'],
				daifahuoList: ['联系客服', '催发货'],
				daishouhuoList: ['联系客服', '查看物流', '确认收货'],
				daipinglunList: ['联系客服', '再次购买', '立即评论'],
				current: 0,
				scrollTop: 0,
				orderid:'',
				page:1,
				current_page: '',
				last_page: '',
				per_page: '',
				total: '',
			}
		},

		onLoad(option) {
			this.current = option.current
			this.getItemList(this.page)
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onReachBottom() {
			
			
			if (Math.ceil(this.total / this.per_page) <= this.page) {
				console.log( Math.ceil(this.total / this.per_page), this.page,'1111')
				uni.showToast({
					title: '没有更多数据了~',
					icon: "none"
				})
			} else {
				this.page ++
				console.log(this.page)
				this.getItemList(this.page)
			}		
		},
		methods: {
			//获取订单数据
			getItemList(page) {
				this.$u.post('/single/order/order_list', {
					type: this.current,
					page:page?page:1
				}).then(res => {
					console.log(res.data)
					this.itemList = page!=1?this.itemList.concat(res.data.data):res.data.data
					this.total = res.data.total
					this.last_page = res.data.last_page
					this.per_page = res.data.per_page
					this.current_page = res.data.current_page
				})
				
			},
			change(index) {
				this.current = index;
				this.getItemList(1)
			},	
			//跳转订单详情
			goGoodsDetails(id, index) {
				console.log(id, index)
				var index = index
				this.$u.post('/single/order/order_detail', {
					orderid: id
				}).then(res => {
					console.log(res.data.list)
					uni.navigateTo({
						url: `OrderDetails/OrderDetails?data=${JSON.stringify(res.data)}&index=${index}`
					})
				})
				
			},
			//跳转物流详情
			goLogistics(order_sn) {
				uni.navigateTo({
					url: 'lookLogistics/lookLogistics?order_sn=' + order_sn
				})
			},
			//确认收货
			SureGoods(id){
				this.$u.post('/single/order/confirm_order', {
					id: id
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						uni.showToast({
							title: '确认收货成功'
						})
						this.getItemList()
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				})
			},
			//催发货
			Rush(id) {
				this.$u.post('/single/order/deliver_goods', {
					id: id
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						uni.showToast({
							title: '催发货成功'
						})
					} else {
						uni.showToast({
							title: '您已催货过,商家正在火速备货~',
							icon: 'none'
						})
					}
				})
			},
			//取消订单
			cancelsOrder(id) {
				this.$u.post('/single/order/cancel_order', {
					id: id
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: res.message
						})
						this.getItemList()
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
						this.getItemList()
					}
				})

			},
			//联系客服
			linkService() {
				wx.openCustomerServiceChat({
					extInfo: {
						url: 'https://work.weixin.qq.com/kfid/kfce91f2a1ff96e790f'
					},
					corpId: 'ww3227c3ab52583dfb',
					success: (res) => {
						console.log(res)
					}
				})
			},
			// 再次购买
			goGoodsList(type){
				console.log(type)
				if(type == 0){
					uni.switchTab({
						url:'../../../index/index'
					})
				}else{
					uni.switchTab({
						url:'../../../SpecialEdition/SpecialEdition'
					})
				}
			},
			// 跳转申请退款
			goRefund(i) {
				console.log(i.order_sn,i.order_type)
				uni.navigateTo({
					url: `ApplyRefund/ApplyRefund?i=${JSON.stringify(i)}`
				})
			},
			//跳转预订单页面  1为普通预订单提交  2为购物车预订单提交
			goPayOrder(pay_type, id) {
				if(pay_type ==1){
					this.$u.post('/single/pay/do_action', {
						pay_type: pay_type,
						orderid: id
					}).then(res => {
						if (res.code !== 200) {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 3000
							})
						} else {
							uni.showToast({
								title: res.message,
								duration: 3000
							})
							setTimeout(()=>{
								uni.navigateTo({
									url: '../paySuccess/paySuccess'
								})
							},1500)
						}
					})
				}else{
					this.$u.post('/single/pay/do_action', {
						pay_type: pay_type,
						orderid: id
					}).then(res => {
						console.log(res)
						if (res.code == 200) {
							wx.requestPayment({
								timeStamp: res.data.timeStamp,
								nonceStr: res.data.nonceStr,
								package: res.data.package,
								signType: res.data.signType,
								paySign: res.data.paySign,
								success: (ress) => {
									wx.showToast({
										title: '支付成功',
										duration: 1500
									})
									setTimeout(()=>{
										uni.navigateTo({
											url: '../paySuccess/paySuccess'
										})
									},1500)
									this.getItemList()
								}
							})
							// uni.showToast({
							// 	title: res.message
							// })
							
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
						}
					})
				}	
			}
		}
	}
</script>

<style lang="scss">
	body {
		background-color: #F0F1F1;
	}

	.active {
		border: 1px solid #FF7C4C !important;
		color: #FF7C4C !important;
	}
	.special{
		width: 450rpx!important;
		text{
			width: 450rpx!important;
		}
	}

	.all-item {
		display: flex;
		flex-direction: column;
		width: 710rpx;
		margin: 22rpx auto 22rpx;
		border-radius: 15rpx;
		background-color: #fff;
		padding-bottom: 20rpx;
		>view:nth-child(1) {
			text-align: right;
			margin-right: 18rpx;
			margin-top: 14rpx;
			font-size: 36rpx;
			color: #FF7C4C;
		}

		.item-list {
			display: flex;
			// justify-content: space-between;
			margin-bottom: 38rpx;

			>view:nth-child(1) {
				width: 168rpx;
				height: 168rpx;
				margin-left: 10rpx;
				
				image {
					width: 168rpx;
					height: 168rpx;
				}
			}

			>view:nth-child(2) {
				width: 310rpx;
				display: flex;
				flex-direction: column;
				margin-left: 30rpx;
				>text:nth-child(1) {
					width: 310rpx;
					// height: 66rpx;
					line-height: 40rpx;
					font-size: 24rpx;
					color: #333333;

				}

				>text:nth-child(2) {
					width: 310rpx;
					margin: 3rpx 0 10rpx 0;
					font-size: 24rpx;
					color: #666666;
					// overflow: hidden;
					// text-overflow: ellipsis;
					// white-space: nowrap;
				}

				>text:nth-child(3) {
					font-size: 24rpx;
					color: #999;
				}
			}

			>view:nth-child(3) {
				width: 175rpx;
				display: flex;
				flex-direction: column;
				margin: 0 0 120rpx 0rpx;
				
				text-align: center;
				>text:nth-child(1) {
					font-size: 36rpx;
					margin-top: 8rpx;
					color: #333333;
				}

				>text:nth-child(2) {
					font-size: 30rpx;

					color: #999;
				}
			}
		}

		.item-price {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			margin-right: 14rpx;
			margin-bottom: 32rpx;

			view {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-right: 20rpx;

				>text:nth-child(1),
				>text:nth-child(2) {
					font-size: 24rpx;
					margin-right: 10rpx;
					color: #999;
				}

				>text:nth-child(3) {
					font-size: 30rpx;
					color: #666;
				}
			}

		}

		.item-change {
			display: flex;
			justify-content: flex-end;

			text {
				width: 130rpx;
				height: 40rpx;
				font-size: 24rpx;
				text-align: center;
				border: 1px solid #666666;
				border-radius: 10rpx;
				color: #333333;
				margin-right: 14rpx;
			}
		}
	}

	// .all-item {
	// 	display: flex;
	// 	flex-direction: column;
	// 	width: 690rpx;
	// 	padding-bottom: 20rpx;
	// 	margin: 22rpx auto 22rpx;
	// 	border-radius: 15rpx;
	// 	background-color: #fff;

	// 	>view:nth-child(1) {
	// 		text-align: right;
	// 		margin-right: 18rpx;
	// 		margin-top: 14rpx;
	// 		font-size: 36rpx;
	// 		color: #FF7C4C;
	// 	}

	// 	.item-list {
	// 		display: flex;
	// 		justify-content: space-between;
	// 		margin-bottom: 38rpx;
	// 		margin-top: 20rpx;

	// 		>image:nth-child(1) {
	// 			width: 168rpx;
	// 			height: 168rpx;
	// 			margin: 0 22rpx 0 16rpx;
	// 		}

	// 		>view:nth-child(2) {
	// 			width: 326rpx;
	// 			display: flex;
	// 			flex-direction: column;

	// 			>text:nth-child(1) {
	// 				width: 326rpx;
	// 				// height: 66rpx;
	// 				line-height: 40rpx;
	// 				font-size: 24rpx;
	// 				color: #333333;
	// 				overflow: hidden;
	// 				text-overflow: ellipsis;
	// 				display: -webkit-box;
	// 				-webkit-line-clamp: 2;
	// 				-webkit-box-orient: vertical;
	// 				word-break: break-all;
	// 			}

	// 			>text:nth-child(2) {
	// 				width: 337rpx;
	// 				margin: 15rpx 0 10rpx 0;
	// 				font-size: 24rpx;
	// 				color: #666666;
	// 				overflow: hidden;
	// 				text-overflow: ellipsis;
	// 				white-space: nowrap;
	// 			}

	// 			>text:nth-child(3) {
	// 				font-size: 24rpx;
	// 				color: #999;
	// 			}
	// 		}

	// 		>view:nth-child(3) {
	// 			display: flex;
	// 			flex-direction: column;
	// 			justify-content: center;
	// 			align-items: center;
	// 			margin-right: 14rpx;
	//                 margin-bottom: 83rpx;
	// 			>text:nth-child(1) {
	// 				font-size: 36rpx;
	// 				margin-top: -34rpx;
	// 				color: #333333;
	// 			}

	// 			>text:nth-child(2) {
	// 				font-size: 30rpx;
	// 				color: #999;
	// 			}
	// 		}
	// 	}

	// 	.item-price {
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: flex-end;
	// 		margin-right: 14rpx;
	// 		margin-bottom: 32rpx;

	// 		view {
	// 			display: flex;
	// 			flex-direction: column;
	// 			align-items: center;
	// 			margin-right: 20rpx;

	// 			>text:nth-child(1),
	// 			>text:nth-child(2) {
	// 				font-size: 24rpx;
	// 				margin-right: 10rpx;
	// 				color: #999;
	// 			}

	// 			>text:nth-child(3) {
	// 				font-size: 30rpx;
	// 				color: #666;
	// 			}
	// 		}
	// 	}

	// 	.item-change {
	// 		display: flex;
	// 		justify-content: flex-end;

	// 		text {
	// 			width: 130rpx;
	// 			height: 40rpx;
	// 			font-size: 24rpx;
	// 			text-align: center;
	// 			border: 1px solid #666666;
	// 			border-radius: 10rpx;
	// 			color: #333333;
	// 			margin-right: 14rpx;
	// 		}
	// 	}
	// }
</style>
