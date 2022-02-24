<template>
	<view class="page">
		<view class="index">
			<!-- 	LOGO -->
			<view class="index-top">
				<image src="../../static/image/indexImg/logo.png" mode="widthFix"></image>
				<view>
					<image src="../../static/image/indexImg/icon1.png"></image>
					<text>https://yin10000.com</text>
				</view>
			</view>
			<!-- 	轮播 -->
			<view class="swiper" :key='index'>
				<u-swiper :list="list" mode="rect" height="374"></u-swiper>
			</view>
			<view class="notice">
				<image src="../../static/image/indexImg/laba.png"></image>
				<u-notice-bar type="error" :list="lists" border-radius='15' :volume-icon='false' bg-color='#f1e5b5'
					color='#333333'></u-notice-bar>
			</view>
			<!-- 	列表展示 -->
			<view class="index-item">
				<view @click="goSpecialEdition">
					<image src="../../static/image/indexImg/guige.png" style="width: 44rpx;height: 54rpx;"></image>
					<text>更多规格</text>
				</view>
				<view @click="linkService">
					<image src="../../static/image/indexImg/hezuo.png" style="width: 62rpx;height: 56rpx;"></image>
					<text>合作加盟</text>
				</view>
				<view @click="goMyCart">
					<image src="../../static/image/indexImg/cart1.png" style="width: 52rpx;height: 50rpx;"></image>
					<text>购物车</text>
				</view>

				<view @click="goToMiniProgram">
					<image src="../../static/image/indexImg/gengduo.png" style="width: 48rpx;height: 50rpx;"></image>
					<text>更多产品</text>
				</view>
			</view>
		</view>
		<view class="index-content">
			<view class="special-top">SPECIAL HANDBAG</view>
			<!-- 	特价部分 -->
			<view class="special">
				<view class="special-title">
					<i class='one'>/</i>
					<i class='two'>/</i>
					<i class='title'>特价商品</i>
					<i class='two'>/</i>
					<i class='one'>/</i>
				</view>
				<view class="special-goodsinfo">
					<view class="goodsinfo-item" v-for="(item,index) in guigeList.group" :key='index'>
						<view class="goodsinfo-left">
							<text>{{item.title}}</text>
						</view>
						<view class="goodsinfo-right">
							<!-- item.title=== '规格' ?'item-info':'item-info-none' -->
							<text :class="title_arr[index] === itemR&&item.title=== '规格' ?'active item-info':item.title=== '规格' ?
							'item-info':title_arr[index] === itemR &&item.title!== '规格'?'active  item-info-none ' :'item-info-none' "
								v-for="(itemR,indexx) in item.data" :key='indexx'
								@click='itemClick(index,indexx,itemR,item)'>{{itemR}}</text>
						</view>
					</view>
					<view class="printing">
						<text>印刷方式</text>
						<view v-if="imagePath ||  filePath " style="color: #FFF;" @click="showChooseFile">
							上传文件成功
						</view>
						<view @click="showChooseFile" v-else>
							<image src="../../static/image/SpecialEditionImg/linka.png"></image>
							<text>上传印刷文件</text>
						</view>

					</view>
				</view>
				<view class="special-price">
					<text>原价：{{linePrice}}元</text>
					<view>
						<text>会员价</text>
						<text>￥</text>
						<text>{{price}}</text>
						<text>元</text>
					</view>
				</view>
				<view class="special-order">
					<view class="order-item" v-if="spec">
						<text>产品需求：</text>
						<view>
							<p v-for="(item,index) in arrayItem" :key='index'>{{index}}:{{item}}</p>
						</view>
					</view>
					<view class="order-item">
						<text>下单须知：</text>
						<view v-html="order_explain"></view>
					</view>

				</view>
				<view class="special-footer">
					<view class="footer-item" @click='addCart'>
						<text>加入购物车</text>
					</view>
					<view class="footer-item" @click="PayOrder">
						<text>立即下单</text>
					</view>
					<view class="footer-item">
						<text @click="linkService">联系客服</text>
					</view>
				</view>
				<view class="content-goodsInfo">
					<view v-html="context" class="htmlContianer"></view>
				</view>
			</view>

		</view>

		<view>
			<u-mask :show="moreShow" @click="moreShow = false" class="moreShow">
				<image :src="showImage" class="more-image" mode="widthFix" @click="goToMiniProgram"></image>
			</u-mask>


			<!-- <u-popup v-model="moreShow" mode='center' closeable   height="318rpx" width="450rpx" border-radius='20' >
				<image src="../../static/image/indexImg/hezuo.png"></image> -->
			<!-- <view class="moreShow-top" @click="linkService">
					更多商品信息请点击联系客服
				</view> -->
			<!-- </u-popup> -->
		</view>

		<view>
			<u-popup v-model="show" mode="center" closeable height="738rpx" width='90%' border-radius='20'
				class="addPhoneShow" @close="cancelPhone">
				<view class="show-top">绑定手机号</view>
				<view class="show-have">已有大象账号？快来绑定吧</view>
				<u-input v-model="userPhone" type="number" :clearable='false' :maxlength='11' placeholder="请输入手机号"
					placeholder-style='font-size:36rpx' />
				<view class="show-yanzheng">
					<u-input v-model="yanzhengNum" type="number" :clearable='false' :maxlength='11' placeholder="请输入验证码"
						placeholder-style='font-size:36rpx' />
					<text>获取验证码</text>
				</view>
				<view class="show-submit" @click="bindPhone">确认提交</view>
			</u-popup>
		</view>
		<!-- 选择上传文件 -->
		<view>
			<u-popup v-model="chooseFile" mode='bottom' closeable height="318rpx" border-radius='20'>
				<view class="share-top">
					<view @click="chooseItem(1)" v-if="widthImg == ''">
						<image src="../../static/image/SpecialEditionImg/file.png"></image>
						<text v-if="!widthfile">文件夹</text>
						<view v-else style="width: 100%;height: 24rpx;border-radius: 5rpx;border: 1rpx solid #c1c1c1;position: relative;margin-top: 20rpx;">
							<text :style="{width:widthfile+'%'}"
								style="position: absolute; height:22rpx;border-radius: 5rpx;background-color: #F59A2A;font-size: 18rpx;text-align: center;color: #fff;line-height: 24rpx;"
								>{{widthfile+'%'}}</text>
						</view>


					</view>
					<view @click="chooseItem(2)" v-if="widthfile==''">
						<image src="../../static/image/SpecialEditionImg/xiangce.png"></image>
						<text v-if="!widthImg">相册</text>
						<view v-else style="width: 100%;height: 24rpx;border-radius: 5rpx;border: 1rpx solid #c1c1c1;position: relative;margin-top: 20rpx;">
							<text :style="{width:widthImg+'%'}"
								style="position: absolute; height:22rpx;border-radius: 5rpx;background-color: #F59A2A;font-size: 18rpx;text-align: center;color: #fff;line-height: 24rpx;">{{widthImg+'%'}}</text>
						</view>
						<u-upload ref="uUpload" custom-btn :action="action" max-count="1" :max-size="2 * 1024 * 1024"
							class="upload" :before-upload="beforeUpload">
						</u-upload>
					</view>
				</view>
			</u-popup>

		</view>
		<u-back-top :scroll-top="scrollTop" top="1200" bottom='55' mode="circle" duration='1000'></u-back-top>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				title: 'Hello',
				currentIndex: 0,
				guigeTitle: '',
				guigeIndex: 0,
				goodsid: '',
				list: [],
				guigeList: {},
				linePrice: 1,
				price: 1,
				stock: 0,
				order_explain: '',
				good_need: '',
				userPhone: '',
				yanzhengNum: '',
				title_arr: [],
				activeSelect: {

				},
				lists: [],
				chooseFile: false,
				imagePath: '',
				filePath: '',
				goods_array: [],
				goods_arrayName: [],
				arrayItem: {},
				goods_item: [{}],
				getPriceShow: false,
				spec: '',
				spec_id: '',
				context: '',
				scrollTop: 0,
				pid: '',
				moreShow: true,
				showImage: '',
				shareTitle: '',
				shareImg: '',
				widthImg: '',
				widthfile: ''
			}
		},
		onLoad() {
			//获取首页数据
			this.getItemList()
			//查看缓存中是否有pid，如果有pid那么发起请求，pid在APP.vue中的生命周期里进行了获取和缓存
			this.pid = uni.getStorageSync('pid') ? uni.getStorageSync('pid') : ''
			if (this.pid !== '') {
				this.ExitIndex()
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		onShareAppMessage() {
			return {
				title: this.shareTitle,
				imageUrl: this.shareImg
			}
		},
		onShareTimeline() {
			return {
				title: this.shareTitle,
				imageUrl: this.shareImg
			}
		},
		methods: {
			//扫推广码进入小程序默认会携带pid，使用pid做绑定
			ExitIndex() {
				this.$u.post('/single/user/bindParent', {
					parent_id: this.pid
				}).then(res => {
					console.log(res, 'pid')
					uni.removeStorageSync('pid')
				})
			},
			//获取数据
			getItemList() {
				this.$u.post('/single/index/index').then(res => {
					console.log(res.data, 'index')
					var arr = res.data.index_advise
					arr.forEach(v => {
						return this.list.push(v.images)
					})
					this.goodsid = res.data.goods_list.id
					this.guigeList = res.data.goods_list.groups
					this.linePrice = res.data.goods_list.market_price
					this.price = res.data.goods_list.price
					this.stock = res.data.goods_list.stock
					this.good_need = res.data.goods_list.good_need
					this.order_explain = res.data.goods_list.order_explain
					this.context = res.data.goods_list.content.replace(/\<img/gi,
						'<img style="max-width:100%;height:auto" ')
					this.goods_item[0].goods_id = res.data.goods_list.id
					this.showImage = res.data.out_info.index_image
					this.shareTitle = res.data.out_info.share_title
					this.shareImg = res.data.out_info.share_image
					if (this.showImage == '') {
						this.moreShow = false
					}
					this.lists.push(res.data.index_notice)
				})
			},
			//纸张，规格，数量点击切换
			itemClick(i, j, text, t) {

				console.log(i, j, text)
				let str = ''
				this.$set(this.title_arr, i, text)
				this.$set(this.arrayItem, t.title, text)
				this.goods_arrayName.push(this.arrayItem)
				console.log(this.goods_arrayName, text, i, t, 'title_arr')
				// this.goods_arrayName[0]['数量']
				this.goods_item[0].number = 1
				console.log(this.title_arr, 'arr')
				this.title_arr.forEach((item, index) => {
					if (item) {
						if (str == '') {
							str += item

						} else {
							str += '-' + item

						}
					}
				})
				this.spec = str
				this.getPrice()
				console.log(this.spec, '111')
			},
			//获取报价
			getPrice() {
				this.getPriceShow = true
				this.$u.post('/single/index/get_price', {
					goodsid: this.goodsid,
					spec: this.spec,
					file_url: this.filePath ? this.filePath : this.imagePath
				}).then(res => {
					console.log(res.data)
					this.price = res.data.price
					this.spec_id = res.data.id
					this.goods_item[0].spec_id = this.spec_id
				})

			},
			// 加入购物车
			addCart() {
				//判断库存是否大于0
				if (this.stock > 0) {
					if (this.getPriceShow) {
						this.$u.post('/single/cart/save_cart', {
							good_type: 1,
							spec_id: this.spec_id,
							good_id: this.goodsid,
							num: this.goods_item[0].number,
							spec: this.spec,
							price: this.price
						}).then(res => {
							console.log(res.data, '111')
							if (res.code !== 200) {
								uni.showToast({
									title: '加入购物车失败，请检查您的选择项',
									icon: 'none'
								})
							} else {
								uni.showToast({
									title: '加入购物车成功',
								})
							}
						})
					} else {
						uni.showToast({
							title: '请获取报价后重试',
							icon: 'none'
						})
					}
				} else {
					uni.showToast({
						title: '库存不足,加入购物车失败',
						icon: 'none'
					})
				}
			},
			//上传文件弹窗显示
			showChooseFile() {
				this.chooseFile = !this.chooseFile
			},
			//上传文件
			chooseItem(e) {
				if (e == 1) {
					wx.chooseMessageFile({
						count: 1,
						success: (res) => {
							// this.upLoadFile(res.tempFiles[0].path)
							const uploadTaskfile = uni.uploadFile({
								url: this.BaseUrl + '/api/common/upload',
								filePath: res.tempFiles[0].path,
								name: 'file',
								success: (res) => {
									console.log(JSON.parse(res.data).data, 'file')
									this.filePath = JSON.parse(res.data).data
								}
							})
							uploadTaskfile.onProgressUpdate((res) => {
								this.widthfile = res.progress
							});
						}
					})
				} else if (e == 2) {
					uni.chooseImage({
						count: 1,
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album', 'camera'], //从相册选择
						success: res => {
							// that.upLoadFile(res.tempFilePaths[0])
							const uploadTask = uni.uploadFile({
								url: this.BaseUrl + '/api/common/upload',
								filePath: res.tempFilePaths[0],
								name: 'file',
								success: (res) => {
									console.log(JSON.parse(res.data).data, 'xiangce')
									this.imagePath = JSON.parse(res.data).data
								}

							})
							uploadTask.onProgressUpdate((res) => {
								this.widthImg = res.progress

							});
						}
					});
				}
			},
			//预订单
			PayOrder() {
				console.log(this.goods_item, 'goodsitem')
				if (this.getPriceShow) {
					// this.getPrice()
					// console.log(this.goods_array, 'goods_arr')
					console.log(this.goods_item, 'goodsitem')
					this.$u.post('/single/order/ready_order', {
						goods_type: 1,
						goods_array: JSON.stringify(this.goods_item),
						file_url: this.filePath ? this.filePath : this.imagePath,
						addressid: '',
					}).then(res => {
						if (res.code == 200) {
							console.log(res.data, '111')
							uni.navigateTo({
								url: '../Me/MeCom/MyOrder/PayOrder/PayOrder?index=1&data=' + JSON
									.stringify(res.data)
							})
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
							})
						}
					})

				} else {
					uni.showToast({
						title: '请获取报价后重试',
						icon: 'none'
					})
				}

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
			//跳转购物车
			goMyCart() {
				uni.navigateTo({
					url: '../Me/MeCom/MyCart/MyCart'
				})
			},
			//取消绑定号码
			cancelPhone() {
				console.log('取消')
			},
			// 提交绑定手机号
			bindPhone() {
				const flag = /^[1][3,4,5,7,8,9][0-9]{9}$/
				//  手机号码验证表达式  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

			},
			//跳转到更多规格
			goSpecialEdition() {
				uni.switchTab({
					url: '../SpecialEdition/SpecialEdition'
				})
			},
			//打开移动端
			goToMiniProgram() {
				uni.navigateTo({
					url: '../Mall/MallCom/NavTo/NavTo',
				})
			}

		}
	}
</script>

<style lang="scss">
	.page {
		background: linear-gradient(#878788, #F9F9F9, #938F8F, #918D8D, #F4F4F4);
		padding-top: 120rpx;
	}

	.active {
		background-color: #FFCB80;
		border: 2rpx solid #FFCB80 !important;
		color: #666666 !important;
	}

	.item-info-none {
		height: 58rpx;
		line-height: 58rpx;
		padding: 0 12rpx;
		margin: -8rpx 4rpx 16rpx 2rpx;
		color: #3E3A39;
		border: 1rpx solid #9FA0A0;
		box-sizing: border-box;
		border-radius: 10rpx;
		font-size: 26rpx;
	}

	.index {
		height: 674rpx;
		width: 100%;

		.index-top {
			display: flex;


			>image:nth-child(1) {
				width: 188rpx;
				height: 68rpx;
				margin: 11rpx 0 38rpx 52rpx;
			}

			view:nth-child(2) {
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
				margin-left: 20rpx;
				// width: 202rpx;
				// height: 34rpx;
				// line-height: 34rpx;
				// background-color: #999;
				// margin: 22rpx 0 38rpx 0rpx;
				// border-top-left-radius: 10rpx;
				// border-bottom-left-radius: 10rpx;

				>image:nth-child(1) {
					width: 26rpx;
					height: 25rpx;
					margin-right: 5rpx;
					vertical-align: middle;

				}

				>text:nth-child(2) {
					font-size: 34rpx;
					color: #FFF;
				}
			}
		}

		.swiper {
			width: 710rpx;
			height: 385rpx;
			margin: 0 auto;
			margin-bottom: 5rpx;
		}

		.notice {
			width: 710rpx;
			margin: 0 auto;
			margin-bottom: 10rpx;
			background-color: #f1e5b5;
			display: flex;
			align-items: center;
			overflow: hidden;
			border-radius: 10rpx;

			image {
				width: 40rpx;
				height: 38rpx;
				margin-left: 20rpx;
				margin-top: 10rpx;
			}
		}

		/deep/.u-notice-bar-wrap.data-v-087a7280 {
			width: 650rpx;
		}

		.index-item {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 710rpx;
			height: 186rpx;
			margin-top: 40rpx;
			margin-bottom: 40rpx;
			margin: 0 auto;
			border-radius: 10rpx;
			background-color: #fff;
			box-shadow: 0px 1px 1px 1px rgba(10, 10, 10, .1);

			view {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				text {
					font-size: 28rpx;
					text-align: center;
					margin-top: 20rpx;
					color: #333333;
				}
			}
		}
	}

	.index-content {
		position: relative;
		width: 710rpx;
		margin: 0 auto;
		margin-top: 106rpx;
		border-radius: 10rpx;
		background-color: #fff;

		.special-top {
			width: 100%;
			position: absolute;
			font-size: 48rpx;
			font-weight: bold;
			color: #E0E0E0;
			text-align: center;
			top: 24rpx;
			opacity: .6;
		}

		.special {
			position: relative;
			width: 100%;
			padding: 34rpx 0;
			box-sizing: border-box;
			overflow: hidden;
			z-index: 6;
			margin-bottom: 10rpx;
			box-shadow: 0px 0px 1px 1px rgba(10, 10, 10, .1);
			border-radius: 15rpx;

			.special-title {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				margin: 20rpx 0 26rpx;
				font-size: 32rpx;
				font-weight: bold;
				font-style: oblique;
				text-align: center;

				.one {
					color: #FF9101;
					margin: 0 5rpx;
				}

				.two {
					color: #01C699;
					margin: 0 5rpx;
				}

				.title {
					color: #FF9C1B;
					margin: 0 10rpx;
					font-size: 46rpx;
				}
			}

			.special-goodsinfo {
				width: 100%;

				.goodsinfo-item {
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					margin-bottom: 18rpx;

					.goodsinfo-left {
						text {
							width: 50rpx;
							font-size: 28rpx;
							margin: 0 12rpx;
							padding: 10rpx;
							border-radius: 10rpx;
							color: #fff;
							background-color: #199579;
							margin-left: 10rpx;
						}
					}

					.goodsinfo-right {
						flex: 1;
						display: flex;
						flex-wrap: wrap;

						.item-info {
							height: 58rpx;
							line-height: 58rpx;
							padding: 0 3rpx;
							margin: -8rpx 4rpx 16rpx 2rpx;
							color: #3E3A39;
							border: 1rpx solid #9FA0A0;
							box-sizing: border-box;
							border-radius: 10rpx;
							font-size: 26rpx;

						}
					}

					.printing {
						height: 50rpx;
						line-height: 50rpx;
						display: flex;
						flex-wrap: nowrap;
						padding-left: 32rpx;
						margin-bottom: 30rpx;

						>text:nth-child(1) {
							height: 60rpx;
							line-height: 60rpx;
							font-size: 28rpx;
							color: #666;
							white-space: nowrap;
							margin-top: 5rpx;
						}

						>view:nth-child(2) {
							width: 250rpx;
							height: 50rpx;
							line-height: 50rpx;
							margin-top: 10rpx;
							margin-left: 10rpx;
							border-radius: 10rpx;
							text-align: center;
							background-color: #F59A2A;

							>image:nth-child(1) {
								width: 24rpx;
								height: 24rpx;
								vertical-align: middle;
								margin-right: 10rpx;
							}

							>text:nth-child(2) {
								font-size: 28rpx;
								color: #FFF;
							}
						}
					}
				}

				.printing {
					height: 50rpx;
					line-height: 50rpx;
					display: flex;
					flex-wrap: nowrap;
					padding-left: 10rpx;
					margin-bottom: 30rpx;

					>text:nth-child(1) {
						height: 60rpx;
						line-height: 60rpx;
						font-size: 28rpx;
						color: #FFF;
						white-space: nowrap;
						margin-top: 5rpx;
						padding: 5rpx 8rpx;
						border-radius: 10rpx;
						background-color: #199579;
					}

					>view:nth-child(2) {
						width: 250rpx;
						height: 50rpx;
						line-height: 50rpx;
						margin-top: 10rpx;
						margin-left: 10rpx;
						border-radius: 10rpx;
						text-align: center;
						background-color: #F59A2A;

						>image:nth-child(1) {
							width: 24rpx;
							height: 24rpx;
							vertical-align: middle;
							margin-right: 10rpx;
						}

						>text:nth-child(2) {
							font-size: 28rpx;
							color: #FFF;
						}
					}
				}
			}

			.special-price {
				width: 100%;
				margin: 20rpx 0;
				display: flex;
				justify-content: space-around;

				>text:nth-child(1) {
					font-size: 22rpx;
					margin-top: 15rpx;
					text-decoration: line-through;
					color: #808080;
				}

				>view:nth-child(2) {
					display: flex;
					align-items: center;

					>text:nth-child(1) {
						font-size: 22rpx;
						color: red;
						margin-right: 12rpx;
					}

					>text:nth-child(2) {
						font-size: 22rpx;
						color: #FF2B00;
					}

					>text:nth-child(3) {
						font-size: 36rpx;
						font-weight: bold;
						color: #FF2B00;
					}

					>text:nth-child(4) {
						font-size: 22rpx;
						color: #595757;
						margin-left: 3rpx;
					}
				}

				>text:nth-child(3) {
					width: 126rpx;
					height: 70rpx;
					line-height: 70rpx;
					font-size: 38rpx;
					text-align: center;
					color: #fff;
					background-color: #F08B19;
					border-radius: 10rpx;
					margin-top: -10rpx;
				}
			}

			.special-order {
				width: 650rpx;
				margin: 0 auto;
				display: flex;
				flex-direction: column;
				font-size: 20rpx;
				color: #595757;

				.order-item {
					text:nth-child(1) {
						color: #199579;
						font-size: 22rpx;
					}

					view:nth-child(2) {
						font-size: 22rpx;
						color: #3E3A39;

						>text:nth-child(1) {
							color: #3E3A39 !important;
						}
					}
				}

			}

			.special-footer {
				width: 96%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				margin: 20rpx auto 0;
				// padding-bottom: 10rpx;

				.footer-item {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 202rpx;
					height: 62rpx;
					line-height: 70rpx;
					background: url(../../static/image/indexImg/bgc.png) no-repeat;
					background-size: 202rpx 62rpx;

					>text:nth-child(1) {
						font-size: 28rpx;
						color: #FFFFFF;
						margin-top: -8rpx;

					}
				}
			}
		}
	}

	.addPhoneShow {
		.show-top {
			margin-top: 60rpx;
			margin-bottom: 40rpx;
			font-size: 40rpx;
			font-weight: bold;
			color: #333333;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.show-have {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #666666;
			margin-bottom: 112rpx;
		}

		.u-input {
			width: 80%;
			margin: 0 auto;
			border-bottom: 1px solid #F2F2F2;
			font-size: 30rpx;
			margin-bottom: 60rpx;
		}

		.show-yanzheng {
			display: flex;
			justify-content: space-between;
			margin-left: 30rpx;

			>u-input:nth-child(1) {
				flex: 1;
				font-size: 30rpx;
				margin-bottom: 60rpx;
				margin-right: 10rpx;
			}

			>text:nth-child(2) {
				width: 160rpx;
				height: 70rpx;
				text-align: center;
				line-height: 70rpx;
				color: #fff;
				background-color: #FF7C4C;
				margin-right: 60rpx;
				border-radius: 10rpx;
			}
		}

		.show-submit {
			width: 550rpx;
			height: 60rpx;
			margin: 0 auto;
			line-height: 60rpx;
			text-align: center;
			border-radius: 10rpx;
			background-color: #FF7C4C;
			color: #FFFFFF;
		}
	}

	.content-goodsInfo {
		width: 710rpx;
		margin: 0 auto;
		padding-bottom: 20rpx;

		.htmlContianer {
			max-width: 710rpx;
			overflow: hidden;

			img {
				width: 690rpx;
			}
		}

	}

	.share-top {
		height: 318rpx;
		width: 100%;
		padding-left: 54rpx;
		display: flex;
		box-sizing: border-box;

		>view {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			>image:nth-child(1) {
				width: 108rpx;
				height: 94rpx;
			}

			>text:nth-child(2) {
				font-size: 30rpx;
				color: #666666;
				letter-spacing: 2px;
				margin-top: 30rpx;
			}
		}

		>view:nth-child(2) {
			margin-left: 86rpx;

			>image:nth-child(1) {
				width: 106rpx;
				height: 82rpx;

			}
		}
	}

	.moreShow {
		.more-image {
			position: absolute;
			top: 32%;
			left: 50%;
			transform: translate(-50%);
			width: 550rpx;
			height: 302rpx;
		}
	}
</style>
