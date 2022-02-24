<template>
	<view class="my-cart">
		<view class="cart-top">
			<view>
				<u-checkbox-group @change="AllChange">
					<u-checkbox v-model="allCheck" shape="circle" active-color="#FF7C4C"> 全选</u-checkbox>
				</u-checkbox-group>

				<text @click="changeDelete">编辑</text>
			</view>
			<view class="item-list" v-for="(item,index) in itemList" :key='index'>
				<u-checkbox-group>
					<u-checkbox @change="checkboxChange(index)" v-model="item.checked" shape="circle"
						active-color="#FF7C4C"> </u-checkbox>
				</u-checkbox-group>
				<view>
					<image :src="item.cover_image" mode=""></image>
					<view>
						<text>{{item.title}}</text>
						<text>{{item.spec?item.spec:''}}</text>
						<view>
							<text>￥{{item.price}}</text>
							<view>
								<text @click="changeNum(index,item)">-</text>
								<input :value="item.num" @input="inputVal(index,item,$event)"></input>
								<text @click="addNum(index,item)">+</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="cart-footer">
			<text>合 计:</text>
			<text>￥{{totalPrice}}</text>
			<text @click="deteleGoods" v-if="deleteShow">删除({{deleteNum}})</text>
			<text v-else @click="payOrder">结算({{settlementNum}})</text>
		</view>
		<!-- 删除商品弹框 -->
		<view>
			<u-modal v-model="deleteGoodsShow" :show-cancel-button='true' cancel-text='确定' confirm-text='我再想想'
				:cancel-style="{borderRight:'1px solid #F0F1F1'}" confirm-color='#FF7C4C' :show-title='false'
				@cancel="deleteGoods">
				<view class="model-title">确定将这{{deleteNum}}个宝贝删除吗？</view>
			</u-modal>
		</view>
		<u-back-top :scroll-top="scrollTop" top="1200" bottom='155' mode="circle" duration='1000' ></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 1,
				allCheck: true,
				deleteGoodsShow: false,
				deleteShow: false,
				itemCheck: 'fasle',
				itemList: [],
				settlementNum: 0,
				deleteNum: 0,
				totalPrice: 0,
				cheackedList: [],
				strid: '',
				scrollTop: 0,
			}
		},
		onShow() {
			this.getItemList()	
			
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			//获取购物车列表
			getItemList(num) {
				this.$u.post('/single/cart/cart_list').then(res => {
					console.log(res,'cart')
					this.itemList = res.data
					if(num ==1){
						this.itemList.forEach(v => {
							v.checked = false
						})
					}else {
						this.itemList.forEach(v => {
							v.checked = true
						})
					}
					
					this.getTotalPrice()
					this.getNum()
				})
				this.settlementNum = this.itemList.length
				if (this.itemList.length < 0) {
					this.allCheck = false
					console.log(this.allCheck)
				}
			},
			// 切换删除模式，在删除页面全选按钮和商品选中按钮不选中
			changeDelete() {
				this.deleteShow = !this.deleteShow
				if (!this.deleteShow) {
					this.itemList.forEach(v => {
						v.checked = true
					})
					this.allCheck = true
				} else {
					this.itemList.forEach(v => {
						v.checked = false
						this.deleteNum = 0
					})
					this.allCheck = false
				}
				this.getNum()
				this.getTotalPrice()
			},
			deteleGoods() {
				//判断商品列表是否为空或者是否有选中商品
				console.log(this.itemList,'itemList')
				var falg = this.itemList.some(v =>{
					return v.checked
				})
				console.log(falg,'falg')
				if(this.itemList.length >0){
					if(falg){
						this.deleteGoodsShow = !this.deleteGoodsShow
						this.getNum()
					}else{
						uni.showToast({
							title:'您没有选中的商品',
							icon:'none'
						})
					}
					
				}else{
					uni.showToast({
						title:'您的购物车暂时没有商品',
						icon:'none'
					})
				}
				
			},
			canceldeleteGoods() {

			},
			//全选
			AllChange(e) {
				if (this.itemList.length <= 0) {
					this.allCheck = false
				}
				this.itemList.forEach(v => {
					v.checked = this.allCheck
				})
				this.getTotalPrice()
				this.getNum()

			},
			//反选
			checkboxChange(index) {
				this.itemList[index].checked = !this.itemList[index].checked
				this.allCheck = this.itemList.every(v => {
					return v.checked == true
				})
				this.getTotalPrice()
				this.getNum()
			},
			//计算选中总价格
			getTotalPrice() {
				this.totalPrice = this.itemList.filter(v => {
					return v.checked
				}).reduce((pre, v) => {
					return pre += v.num * v.price
				}, 0)
				// this.totalPrice = Math.round(this.totalPrice)
				this.totalPrice.toFixed(2)
				this.$forceUpdate()
			},
			// 商品数量变化
			changeNum(index, i) {
				console.log(i.id, i.num - 1)
				this.itemList[index].num--
				if (this.itemList[index].num <= 0) {
					uni.showModal({
						title: '是否要删除该商品？',
						confirmColor: '#FF7C4C',
						success: (res) => {
							console.log(res)
							if (res.cancel) {
								this.itemList[index].num = 1
							} else {
								this.$u.post('/single/cart/delete_cart', {
									id: i.id
								}).then(res => {
									uni.showToast({
										title: '删除成功'
									})
									this.getItemList(1)
									
								})
							
							}
						}
					})
				} else {
					this.$u.post('/single/cart/save_num', {
						cart_id: i.id,
						num: i.num
					}).then(res => {
						console.log(res.data, '保存商品')
					})
					this.getTotalPrice()
				}
			},
			// 增加商品数量
			addNum(index, i) {
				this.itemList[index].num++
				this.$u.post('/single/cart/save_num', {
					cart_id: i.id,
					num: i.num
				}).then(res => {
					console.log(res.data, '保存商品')
				})
				this.getTotalPrice()
			},
			// 输入数量变化总价
			inputVal(index, i, e) {
				this.itemList[index].num = e.detail.value
				this.getTotalPrice()
				console.log(index, i, e.detail.value, '获取输入商品数量')
				var num = e.detail.value
				this.$u.post('/single/cart/save_num', {
					cart_id: i.id,
					num: num
				}).then(res => {
					console.log(res.data, '获取输入商品数量')
					this.getTotalPrice()
				})
			},
			//删除商品
			deleteGoods(id) {
				var str = ''
				var that = this
				this.itemList.filter(v => {
					// return v.checked != true
					if (v.checked) {
						console.log(v.id, '145')
						return str += v.id + ','
					}
				})
				console.log(str.slice(0, -1))
				if(this.itemList.length>0){
					this.$u.post('/single/cart/delete_cart', {
					      id: str
					}).then(res => {
						console.log(res.data, '111')
						uni.showToast({
							title: '删除成功',
							duration:3000
						})
						setTimeout(()=>{
							this.getItemList(1)
							console.log(this.itemList,'itemlist1')
						    this.itemList =	this.itemList.forEach(v =>{
							 return	v.checked = false
							})
							this.$nextTick(function(){
								console.log(this.itemList,'itemlist2')
							})
						},1000)
						
						if (this.itemList.length <= 0) {
							this.allCheck = false
						}
						this.itemList.forEach(v => {
							v.checked = false
						})
						
					})
					
				}else {
					uni.showToast({
						title:'您的购物车暂时没有商品',
						icon:'none'
					})
				}
				

			},
			// 获取结算数量和删除数量
			getNum() {
				var arr = []
				arr = this.itemList.filter(v => {
					return v.checked
				})
				//设置结算数量
				this.settlementNum = arr.length
				//设置删除数量
				if (!this.deleteGoodsShow) {
					var arr = []
					arr = this.itemList.filter(v => {
						return v.checked
					})
					this.deleteNum = arr.length
				}
			},
			payOrder() {
				var goodsItem = []
				var arr = this.itemList.filter(v => {
					return v.checked
				})
				arr.forEach(v => {
					goodsItem.push({
						goods_id: v.good_id,
						spec_id: v.spec_id,
						number: v.num,
						desc: v.spec
					})
				})
				console.log(goodsItem, 'goodsitem')
				var falg = this.itemList.some(v =>{
					return v.checked
				})
				if(this.itemList.length >0 ){
					if(falg){
						this.$u.post('/single/order/ready_order', {
						      goods_type: 1,
						      goods_array: JSON.stringify(goodsItem),
						}).then(res => {
							console.log(res, '111')
							if (res.code != 200) {
								uni.showToast({
									title: res.message,
									icon: 'none'
								})
							} else {
								uni.navigateTo({
									url: '../MyOrder/PayOrder/PayOrder?index=1&info=cart&data=' + JSON.stringify(res.data)
								})
							}
						})
					}else{
						uni.showToast({
							title:'您没有选中的商品',
							icon:'none'
						})
					}		
				}else {
					uni.showToast({
						title:'您的购物车暂时没有商品',
						icon:'none'
					})
				}
			}
		}
	}
</script>

<style lang="scss">

	.my-cart {
		border-top: 20rpx solid #F0F1F1;
		
		.cart-top {
			height: calc(100% - 180rpx);
			// margin-bottom: 200rpx;
			>view:nth-child(1) {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 32rpx 30rpx 48rpx 34rpx;
			}

			.item-list {
				display: flex;
				align-items: center;
				margin: 0rpx 30rpx 94rpx 34rpx;

				>view:nth-child(2) {
					display: flex;
					align-items: center;
					border-bottom: 1px solid #F0f1f1;
					padding-bottom: 40rpx;

					>image:nth-child(1) {
						width: 160rpx;
						height: 160rpx;
						margin-right: 22rpx;
					}

					>view:nth-child(2) {
						width: 426rpx;
						display: flex;
						flex-direction: column;

						>text:nth-child(1) {
							font-size: 30rpx;
							color: #333333;
							font-weight: 700;
							margin-bottom: 18rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}

						>text:nth-child(2) {
							font-size: 24rpx;
							color: #666666;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin-bottom: 11rpx;
						}

						>view:nth-child(3) {
							display: flex;
							align-items: center;
							justify-content: space-between;

							>text:nth-child(1) {
								font-size: 30rpx;
								color: #FF0000;
							}

							>view:nth-child(2) {
								display: flex;

								>text:nth-child(1),
								>text:nth-child(3) {
									font-size: 30rpx;
									color: #DDDDDD;
									margin: 10rpx 15rpx 0;
								}

								>input:nth-child(2) {
									display: flex;
									justify-content: center;
									text-align: center;
									width: 70rpx;
									height: 30rpx;
									font-size: 24rpx;
									background-color: #F0F1F1;
									color: #333333;
									padding: 8rpx 20rpx;
								}
							}
						}
					}
				}

				//购物车列表不加底部边框的样式，要把列表中view包裹删除


				// >image:nth-child(2) {
				// 	width: 160rpx;
				// 	height: 160rpx;
				// 	margin-right: 22rpx;
				// }

				// >view:nth-child(3) {
				// 	width: 426rpx;
				// 	display: flex;
				// 	flex-direction: column;

				// 	>text:nth-child(1) {
				// 		font-size: 30rpx;
				// 		color: #333333;
				// 		font-weight: 700;
				// 		margin-bottom: 18rpx;
				// 		overflow: hidden;
				// 		text-overflow: ellipsis;
				// 		white-space: nowrap;
				// 	}

				// 	>text:nth-child(2) {
				// 		font-size: 24rpx;
				// 		color: #666666;
				// 		overflow: hidden;
				// 		text-overflow: ellipsis;
				// 		white-space: nowrap;
				// 		margin-bottom: 11rpx;
				// 	}

				// 	>view:nth-child(3) {
				// 		display: flex;
				// 		align-items: center;
				// 		justify-content: space-between;

				// 		>text:nth-child(1) {
				// 			font-size: 30rpx;
				// 			color: #FF0000;
				// 		}

				// 		>view:nth-child(2) {

				// 			>text:nth-child(1),
				// 			>text:nth-child(3) {
				// 				font-size: 30rpx;
				// 				color: #DDDDDD;
				// 				margin: 0 15rpx;
				// 			}

				// 			>text:nth-child(2) {
				// 				font-size: 24rpx;
				// 				background-color: #F0F1F1;
				// 				color: #333333;
				// 				padding: 8rpx 20rpx;
				// 			}
				// 		}
				// 	}
				// }
			}
		}

		.cart-footer {
			position: fixed;
			z-index: 989;
			bottom: 0;
			width: 100%;
			height: 120rpx;
			background-color: #FFF;
			box-shadow: -2px 5px 5px 5px rgba(100, 100, 100, 0.3);
			display: flex;
			justify-content: flex-end;
			align-items: center;
			
			>text:nth-child(1) {
				font-size: 30rpx;
				color: #333333;
				margin-right: 14rpx;
			}

			>text:nth-child(2) {
				font-size: 36rpx;
				color: #FF0000;
				margin-right: 22rpx;
			}

			>text:nth-child(3) {
				width: 180rpx;
				height: 60rpx;
				line-height: 60rpx;
				margin-right: 32rpx;
				text-align: center;
				border-radius: 10rpx;
				background-color: #FF7C4C;
				color: #FFF;
			}

		}
	}

	.model-title {
		height: 150rpx;
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #333333;
	}
</style>
