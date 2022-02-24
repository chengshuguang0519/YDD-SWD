<template>
	<view class="order-details">
		<view class="details-top" @click="changeAddress">
			<image src="../../../../../static/image/meImg/myOrderImg/orderDetailsImg/address.png"></image>
			<view v-if="user_address.name">
				<view>
					<text>{{user_address.name}}</text>
					<text>{{user_address.phone}}</text>
				</view>
				<view>{{user_address.full_address}}</view>
			</view>
			<view v-else>请选择收货地址</view>
		</view>
		<view class="details-content">
			<view class="goods-item" v-for="(item,index) in itemList" :key='index'>
				<view>
					<view>
						<image :src="item.cover_image" mode="widthFix"> </image>
					</view>
					<view>
						<view>
							<text>{{item.title}}</text>
							<text>{{item.name}}</text>
						</view>
						<view>
						
							<text v-if="info=='cart'">￥{{item.price}}</text>
							<text v-if="info=='cart'">×{{item.number}}</text>
							<text v-else>￥{{price}}</text>
							
						</view>
					</view>
				</view>
				<view>
					<text>订单备注</text>
					<view>
						<u-input v-model="item.desc" type="text" placeholder="选填 请添加备注信息与商家协商一致"
							@input='change(index,$event)' />
					</view>
				</view>
			</view>
		</view>
		<view class="order-price">
			<view>
				<text>商品金额</text>
				<view>
					<text>共{{itemList.length}}件</text>
					<text>￥{{price}}</text>
				</view>
			</view>
			<view>
				<text>运 费</text>
				<text v-if="freight.length==1">￥{{freight[0]}}</text>
				<text v-else-if="user_address.name&&freight.length!=1">￥{{freight[0]?freight[0]:freight[1]}}</text>
				<text v-else @click="changeAddress">请先选择地址</text>
			</view>
		</view>
		<view class="details-footer">
			<view class="footer-item">
				<view>
					<image src="../../../../../static/image/SpecialEditionImg/wechat.png"></image>
					<text>微信支付</text>
				</view>
				<u-radio-group v-model="value">
					<u-radio active-color="#FF7C4C" @change="radioChange(2)" name="1"></u-radio>
				</u-radio-group>
			</view>
			<view class="footer-item">
				<view>
					<image src="../../../../../static/image/meImg/myOrderImg/payOrderImg/yue.png"></image>
					<text>余额支付</text>
				</view>
				<u-radio-group v-model="value">
					<u-radio active-color="#FF7C4C" @change="radioChange(1)" name="0"></u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="details-order">
			<view>
				<text>合计：</text>
				<text>￥{{all_price}}</text>
			</view>
			<text @click="goSuccess">提交订单</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: '',
				payList: 2,
				value: '1',
				iptValue: '',
				all_price: 0,
				freight: [],
				itemList: [],
				idstr: '',
				goods_array: [],
				goods_array2: {},
				user_address: {},
				addressid:'',
				sum_price: 0,
				price:0,
				goodsPrice:'',
				info:''
			}
		},
		onShow() {
			this.getAddress()	
			// this.getAddressId()
		},
		onLoad(option) {

			console.log(option, 'option')
			this.index = option.index
			this.info = option.info
			console.log(JSON.parse(decodeURIComponent(option.data)),'111222')
			var res = JSON.parse(decodeURIComponent(option.data))
			console.log(res, '111')
			this.all_price = res.all_price
			this.price = res.sum_price
			this.itemList = res.goods_list
			this.itemList.forEach(v => {
				v.desc = ''
				this.idstr += v.goods_id + ','
				this.goods_array.push({
					goods_id: v.goods_id,
					spec_id: v.spec_id,
					number: v.number?v.number:1,
					desc: v.desc,
					price: v.price
				})
			})
			if(this.index ==2){
				this.goods_array2.goods_id = res.goods_list[0].goods_id
				this.goods_array2.spec = res.goods_list[0].name
				console.log(res.goods_list[0].name.split(',')[2].slice(4).split('*'),res, 'spec')
				this.goods_array2.width =res.goods_list[0].name.split(',')[2].slice(3).split('*')[0] 
				this.goods_array2.height =res.goods_list[0].name.split(',')[2].slice(4).split('*')[1] 
				this.goods_array2.length =res.goods_list[0].name.split(',')[2].slice(4).split('*')[2] 
				this.goods_array2.sum_price = res.sum_price
				this.goods_array2.number = res.goods_list[0].number
				this.goods_array2.desc = res.goods_list[0].desc
				this.goods_array2.file_url = res.file_url
				this.goods_array2.price = res.goods_list[0].price
				this.goods_array2.material_id = res.goods_list[0].material_id
				this.goods_array2.weight_id = res.goods_list[0].weight_id
				this.goods_array2.paper_config = res.paper_config
			}
			console.log(JSON.stringify(this.goods_array2), 'this.goods_array2')
			console.log(this.idstr.slice(0, -1), 'idStr')
			this.freight = res.freight
			this.sum_price = res.sum_price
			this.itemList.forEach(v =>{
			    v.goodsPrice = Number(v.price) * Number(v.number)
			})
			// this.goodsPrice = (Number(res.goods_list[0].price) * Number(res.goods_list[0].number))
			// console.log( Number(res.goods_list[0].price)*Number(res.goods_list[0].number))
			this.user_address = res.user_address
			this.addressid = res.user_address.id
			this.getAddressId(this.addressid)
			console.log(this.user_address, 'this.user_address')	
			
		},
		methods: {
			// //也可以获取到商品的其他信息，不单单可以获取到地址id，目前只是获取到用户的id，来更新运费信息
			getAddressId(id){
				if(this.index == 1){
					this.$u.post('/single/order/ready_order',{
						goods_type: this.index,
						goods_array: JSON.stringify(this.goods_array),
						addressid:id,
					}).then(res => {
						console.log(res.data, '收货地址123456')
						// this.user_address = res.data.user_address
					    // this.addressid = res.data.user_address.id
						this.freight = res.data.freight
						this.all_price = res.data.all_price
					})
				}else {
					this.$u.post('/single/order/ready_order',{
						goods_type: 20,
						goods_array: JSON.stringify(this.goods_array2),
						addressid:id,
					}).then(res => {
						console.log(res.data, '收货地址123')
						// this.user_address = res.data.user_address
					    // this.addressid = res.data.user_address.id
						this.freight = res.data.freight
						this.all_price = res.data.all_price
					})
				}
				
			},
			//获取默认收货地址
			getAddress(){
				this.$u.post('/single/user/default_address').then(res => {
					this.user_address = res.data
					this.addressid = res.data.id
					this.getAddressId(this.addressid)
				})
			},
			// 提交订单
			goSuccess() {
				//标准提交
				if(Object.keys(this.user_address).length){
					if (this.index == 1) {
						this.$u.post('/single/order/commit_order', {
							goods_type: 1,
							all_price: this.all_price,
							goods_ids: this.idstr.slice(0, -1),
							price_express: this.freight[0],
							goods_array: this.goods_array,
							address_id: this.user_address.id ? this.user_address.id : ''
						}).then(res => {
							console.log(res, '提交订单')
							this.pay(res)
						})
						
					} else {
						//非标准提交
						this.$u.post('/single/order/commit_order', {
							goods_type: 20,
							all_price: this.all_price,
							goods_ids: this.idstr.slice(0, -1),
							price_express: this.freight[0],
							goods_array: JSON.stringify(this.goods_array2),
							address_id: this.user_address.id
						}).then(res => {
							if(res.code != 200){
								uni.showToast({
									title:res.message,
									icon:'none'
								})
							}else{
								console.log(res.data, '提交订单')
								this.pay(res)
							}
							
						})
					}
				}else {
					console.log(Object.keys(this.user_address).length)
					uni.showToast({
						title:'请先选择收货地址',
						icon:'none'
					})
				}
				

				
			},
			//支付
			pay(res) {
				console.log(res, 'res')
				//余额支付
				if(this.user_address != ''&&this.user_address.name != ''){
					if (this.payList == 1) {
						this.$u.post('/single/pay/do_action', {
							pay_type: this.payList,
							orderid: res.data
						}).then(res => {
							if (res.code !== 200) {
								uni.showToast({
									title: res.message,
									icon: 'none',
									duration: 3000
								})
							} else {
								uni.showToast({
									title: '支付成功',
									duration: 3000
								})
								setTimeout(()=>{
									uni.navigateTo({
										url: '../paySuccess/paySuccess'
									})
								},1500)
							}
						})
					} else {
						//微信支付
						this.$u.post('/single/pay/do_action', {
							pay_type: this.payList,
							orderid: res.data
						}).then(res => {
							wx.requestPayment({
								timeStamp: res.data.timeStamp,
								nonceStr: res.data.nonceStr,
								package: res.data.package,
								signType: res.data.signType,
								paySign: res.data.paySign,
								success: (ress) => {
									if(ress.code !==200){
										uni.showToast({
											title: res.message,
											icon: 'none',
											duration: 3000
										})
									}else {
										uni.showToast({
											title: '支付成功',
											duration:3000
										})
										setTimeout(()=>{
											uni.navigateTo({
												url: '../paySuccess/paySuccess'
											})
										},1500)
									}	
								}
							})
						})				
					}
				}else{
					uni.showToast({
						title:'请先选择地址',
						icon:'none'
					})
				}
			},
			// 跳转选择地址页面
			changeAddress() {
				uni.navigateTo({
					url: "../../MyAddress/MyAddress"
				})
			},
			change(i, e) {
				console.log(i, e)
				this.goods_array[i].desc = e
				this.goods_array2.desc = e
			},
			radioChange(e) {
				this.payList = e
				console.log(this.payList)
			}
		}
	}
</script>

<style lang="scss">
	body {
		height: calc(100vh-120px);
		background-color: #F0F1F1;
		padding-bottom: 90rpx;
	}

	.active {
		border-color: #FF7C4C !important;
		color: #FF7C4C !important;
	}

	.order-details {
		border-top: 20rpx solid #F0F1F1;
		width: 100%;
		.details-top {
			display: flex;
			align-items: center;
			background-color: #FFFFFF;
			border-bottom: 20rpx solid #F0F1F1;
			padding-bottom: 34rpx;

			>image:nth-child(1) {
				width: 60rpx;
				height: 60rpx;
				margin: 10rpx 26rpx 0 30rpx;
			}

			>view:nth-child(2) {
				display: flex;
				flex-direction: column;
				margin-top: 15rpx;

				>view:nth-child(1) {
					display: flex;
					font-size: 30rpx;
					margin-bottom: 11rpx;
					color: #333333;

					>text:nth-child(1) {
						margin-right: 60rpx;
					}
				}

				>view:nth-child(2) {
					width: 604rpx;
					font-size: 30rpx;
					color: #333333;
					margin-right: 32rpx;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			}
		}

		.details-content {
			.goods-item {
				width: 100%;
				background-color: #FFF;
				border-bottom: 1rpx solid #F0F1F1;
				padding: 26rpx 28rpx 20rpx 30rpx;

				>view:nth-child(1) {
					display: flex;
					// align-items: center;
					margin-bottom: 22rpx;

					>view:nth-child(1) {
						width: 136rpx;
						height: 168rpx;

						>image {
							width: 140rpx;
							height: 140rpx !important;
							margin-right: 4rpx;
							margin-top: 5rpx;
						}
					}

					>view:nth-child(2) {
						flex: 1;
						display: flex;
						margin-right: 5rpx;
						view {
							display: flex;
							flex-direction: column;
							margin-bottom: 10rpx;
						}

						>view:nth-child(1) {
							width: 390rpx;
							margin-left: 20rpx;

							>text:nth-child(1) {
								width: 390rpx;
								font-size: 30rpx;
								color: #333333;
								margin-bottom: 3rpx;	
							}

							>text:nth-child(2) {
								width: 390rpx;
								font-size: 24rpx;
								color: #666666;
			
							}
						}

						>view:nth-child(2) {
							width: 170rpx;
							// margin-left: 20rpx;
							text-align: right;
							// margin-right: 20rpx;
							>text:nth-child(1) {
								font-size: 36rpx;
								color: #333333;
								margin-top: 15rpx;
								margin-right: 10rpx;
							}

							>text:nth-child(2) {
								font-size: 24rpx;
								color: #666666;
								margin-right: 20rpx;
								// margin-left: 48rpx;
							}
						}
					}
				}

				>view:nth-child(2) {
					display: flex;
					align-items: center;

					>text:nth-child(1) {
						font-size: 30rpx;
						color: #999999;
						margin-right: 20rpx;
					}

					>view:nth-child(2) {
						flex: 1;
					}
				}
			}


			.content-item {
				display: flex;
				justify-content: space-between;
				margin-bottom: 55rpx;

				>text:nth-child(1) {
					font-size: 30rpx;
					color: #999999;
				}

				>text:nth-child(2) {
					font-size: 30rpx;
					color: #333333;
				}
			}
		}

		.order-price {
			width: 100%;
			height: 170rpx;
			padding: 0rpx 28rpx 0rpx 30rpx;
			background-color: #fff;
			border-bottom: 20rpx solid #F0F1F1;
			border-top: 20rpx solid #F0F1F1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			>view {
				height: 85rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			>view:nth-child(1) {
				>text:nth-child(1) {
					font-size: 30rpx;
					color: #999999;
				}

				>view:nth-child(2) {
					font-size: 30rpx;

					>text:nth-child(1) {
						color: #999999;
						margin-right: 28rpx;
					}

					>text:nth-child(2) {
						color: #FF0000;
					}
				}
			}

			>view:nth-child(2) {
				font-size: 30rpx;

				>text:nth-child(1) {
					color: #999999;
				}

				>text:nth-child(2) {
					color: #333333;
				}
			}
		}

		.details-footer {
			width: 100%;
			height: 182rpx;
			background-color: #FFF;
			margin-bottom: 50rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;

			>view:nth-child(1) {
				border-bottom: 1px solid #F0F1F1;
				padding-bottom: 30rpx;
			}

			.footer-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 32rpx 28rpx 34rpx 30rpx;

				>view:nth-child(1) {
					display: flex;
					align-items: center;

					>image:nth-child(1) {
						width: 30rpx;
						height: 30rpx;
						margin-right: 18rpx;
					}

					>text:nth-child(2) {
						font-size: 30rpx;
						color: #333333;
					}
				}

				>text:nth-child(2) {
					font-size: 30rpx;
					color: #333333;
				}
			}
		}

		.details-order {
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 120rpx;
			background-color: #FFF;
			padding: 32rpx 28rpx 32rpx 30rpx;
			border-top: 1px solid #F0F1F1;
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #FFF;
			z-index: 999;

			>view:nth-child(1) {
				display: flex;
				align-items: center;

				>text:nth-child(1) {
					white-space: nowrap;
					font-size: 30rpx;
					color: #999999;
				}

				>text:nth-child(2) {
					font-size: 36rpx;
					color: #FF0000;
					margin-left: 14rpx;
				}
			}

			>text:nth-child(2) {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 210rpx;
				height: 60rpx;
				text-align: center;
				border-radius: 10rpx;
				color: #fff;
				background-color: #FF7C4C;
			}
		}
	}
</style>
