<template>
	<view class="address">
		<view class="address-top">
			<view class="address-item" v-for="(item,index) in itemList" :key='index'>
				<view>
					<text>{{item.name}}</text>
					<text>{{item.phone}}</text>
				</view>
				<view>{{item.full_address}}</view>
				<view>
					<view>
						<u-radio-group  v-model="value">
							<u-radio active-color="#FF7C4C" :name="item.id" @change="radioChange(item)">设为默认</u-radio>
						</u-radio-group>
					</view>
					<view @click="goEditAddress(item.id)">
						<image src="../../../../static/image/meImg/myAddressImg/edit.png" mode=""></image>
						<text>编辑</text>
					</view>
					<view @click="deleteAdd(item.id)">
						<image src="../../../../static/image/meImg/myAddressImg/delete.png"></image>
						<text>删除</text>
					</view>
				</view>
			</view>
		</view>
		<view class="addNewsAdd" @click="goAdd">
			<image src="../../../../static/image/meImg/myAddressImg/add.png">
				</iamge>
				<text>新增收货地址</text>
		</view>
		<u-back-top :scroll-top="scrollTop" top="1200" bottom='55' mode="circle" duration='1000' ></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: 133,
				itemList: [],
				form: {
					id:'',
					name: '',
					phone: '',
					province_id: '',
					city_id: '',
					area_id: '',
					address: '',
					is_default: 1,
				},
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
			//获取收货地址列表
			getItemList() {
				this.$u.post('/single/user/address_list').then(res => {
						console.log(res.data)
						this.itemList = res.data
						this.itemList.forEach(v =>{
							console.log(v)
							if(v.is_default == 1){
								console.log(v,'123')
								this.value  = v.id
							}
						})
				})
				
			},
			//删除收货地址
			deleteAdd(id){
				console.log(id)
				uni.showModal({
					title:'确定要删除这个地址吗？',
					confirmColor:'#FF7C4C',
					success:(e)=>{
						console.log(e)
						if(e.cancel){
							uni.showToast({
								title:'已取消删除',
								icon:'none'
							})
						}else{
							this.$u.post('/single/user/delete_address',{
									id:id
							}).then(res => {
								console.log(res.data)
								this.getItemList()	
							})
							uni.showToast({
								title:'删除成功'
							})
						}
					}
				})
				
			},
			// 跳转添加地址
			goAdd() {
				uni.navigateTo({
					url: '../ADDAddress/ADDAddress'
				})
			},
			// 跳转编辑地址
			goEditAddress(id) {
				uni.navigateTo({
					url: 'EditAddress/EditAddress?goodsid='+ id
				})
			},
			//选择默认地址
			radioChange(i){
				console.log(i)
				this.value =i.id
				this.form.id = i.id
				this.form.name = i.name
				this.form.phone = i.phone
				this.form.province_id = i.province_id
				this.form.city_id = i.city_id
				this.form.area_id = i.area_id
				this.form.address =i.address
				this.form.is_default = 1
				this.$u.post('/single/user/save_address',{
						...this.form
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '设置默认地址成功',
							icon:'none'
						})	
					} 
				})
			},

		}
	}
</script>

<style lang="scss">
	body {
		background-color: #F0F1F1;
	}

	.address {
		border-top: 20rpx solid #F0F1F1;

		.address-top {
			.address-item {
				width: 100%;
				margin-bottom: 20rpx;
				background-color: #fff;
				padding: 32rpx 30rpx 22rpx 32rpx;

				>view:nth-child(1) {
					margin-bottom: 26rpx;

					text {
						font-size: 30rpx;
						color: #333333;
					}

					>text:nth-child(1) {
						margin-right: 56rpx;
					}
				}

				>view:nth-child(2) {
					width: 100%;
					font-size: 30rpx;
					color: #333333;
					line-height: 55rpx;
					padding-bottom: 36rpx;
					border-bottom: 1px solid #F0F1F1;
				}

				>view:nth-child(3) {
					flex: 1;
					height: 65rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					>view:nth-child(2) {
						margin-left: 200rpx;
						margin-bottom: 5rpx;

						>image:nth-child(1) {
							width: 28rpx;
							height: 28rpx;
							margin-right: 12rpx;
							vertical-align: middle;
						}

						>text:nth-child(2) {
							font-size: 30rpx;
							color: #666;
							margin-bottom: 5rpx;
						}
					}

					>view:nth-child(3) {
						>image:nth-child(1) {
							width: 34rpx;
							height: 34rpx;
							margin-right: 12rpx;
							vertical-align: middle;

							>text:nth-child(2) {
								font-size: 30rpx;
								color: #666;
							}
						}
					}
				}
			}
		}

		.addNewsAdd {
			width: 690rpx;
			height: 60rpx;
			margin: 0 auto;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #FF7C4C;
			border-radius: 15rpx;
			margin-top: 320rpx;
			margin-bottom: 30rpx;

			>image:nth-child(1) {
				width: 32rpx;
				height: 32rpx;
				margin-right: 16rpx;
			}

			>text:nth-child(2) {
				color: #FFFFFF;
				font-size: 30rpx;
			}
		}
	}
</style>
