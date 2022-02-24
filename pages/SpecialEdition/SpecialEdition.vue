<!-- 克重暂时未对接口 -->
<template>
	<view class="SpecialEdition">
		<view class="SpecialEdition-top">
			<u-swiper :list="list" mode="rect" height="324"></u-swiper>
		</view>
		<view class="SpecialEdition-info">
			<view class="info-title">{{title}}</view>
			<view class="info-price">
				<view>
					<text>￥</text>
					<text>{{price}}</text>
					<text>/起</text>
				</view>
				<view>已售{{sale}}</view>
			</view>
			<view class="info-list">
				<view class="info-item" v-for="(item,index) in feature_list" :key='index'>
					<image :src="item.mini_cover" mode="widthFix"></image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="SpecialEdition-choose">
			<view class="choose-item" @click="itemShow">
				<view >
					<text>选择</text>
					<text>{{spec_content}}</text>
				</view>
				<view >
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view>
				<view @click="goAddress">
					<text>配送</text>
					<text>{{peisongAdd}}</text>
				</view>
			</view>
		</view> -->

		<view class="show">
			<!-- <view class="show-top">
				<image src="../../static/image/SpecialEditionImg/goosinfo.png"  mode="widthFix" ></image>
				<view>
					<text>￥115.2</text>
					<text>已选：500个-258*330*80mm-250g白卡，普通棉绳</text>
				</view>
			</view> -->

			<view class="rope">
				<view>纸 张：</view>
				<scroll-view scroll-x="true" class="item-list" scroll-with-animation>
					<text v-for="(item,index) in materialsList" :key='index'
						:class="currentIndex6 == index? 'active':'' " @click="changeItem4(index)">{{item.name}}</text>
				</scroll-view>
			</view>
			<view class="rope">
				<view>克 重：</view>
				<scroll-view scroll-x="true" class="item-list" scroll-with-animation>
					<text v-for="(item,index) in weightList" :key='index' :class="currentIndex== index? 'active':'' "
						@click="changeItem(index)">{{item.name}}</text>
				</scroll-view>
			</view>
			<view class="size">
				<text>产品尺寸：</text>
				<input type="number" placeholder=" 宽度" v-model="sizeWidth"><text>mm</text>
				<input type="number" placeholder=" 高度" v-model="sizeHeight"><text>mm</text>
				<input type="number" placeholder=" 厚度" v-model="sizeTn"><text>mm</text>
			</view>
			<view class="num">
				<text>产品数量：</text>
				<input type="number" v-model="numNum" placeholder="1~100000">
				<text>个</text>
			</view>

			<view class="rope">
				<view>穿 绳：</view>
				<scroll-view scroll-x="true" class="item-list" scroll-with-animation>
					<text v-for="(item,index) in catesList" :key='index' :class="currentIndex1== index? 'active':'' "
						@click="changeItem1(index)">{{item.name}}</text>
				</scroll-view>
			</view>
			<view class="rope">
				<view>覆 膜：</view>
				<scroll-view scroll-x="true" class="item-list" scroll-with-animation>
					<text v-for="(item,index) in filmsList" :key='index' :class="currentIndex2 == index? 'active':'' "
						@click="changeItem2(index)">{{item.name}}</text>
				</scroll-view>
			</view>

			<view class="gilding ">
				<text>烫 金：</text>
				<text v-for="(item,index) in gildingList" :key='index' :class="currentIndex3 == index? 'active':'' "
					@click="changeItem3(index,0,item)">{{item}}</text>
				<view v-if="gildingShow">
					<view>
						<text>长：</text>
						<input type="number" v-model="gildingLong">
						<text>mm</text>
					</view>
					<view>
						<text>宽：</text>
						<input type="number" v-model="gildingWidth">
						<text>mm</text>
					</view>
				</view>
			</view>
			<view class="uv">
				<text>局部UV：</text>
				<text v-for="(item,index) in uvList" :key='index' :class="currentIndex4 == index? 'active':'' "
					@click="changeItem3(index,1,item)">{{item}}</text>
				<view v-if="uvShow">
					<view>
						<text>长：</text>
						<input type="number" v-model="uvLong">
						<text>mm</text>
					</view>
					<view>
						<text>宽：</text>
						<input type="number" v-model="uvWidth">
						<text>mm</text>
					</view>
				</view>
			</view>
			<view class="bump">
				<text>击 凸：</text>
				<text v-for="(item,index) in bumpList" :key='index' :class="currentIndex5 == index? 'active':'' "
					@click="changeItem3(index,2,item)">{{item}}</text>
				<view v-if="bumpShow">
					<view>
						<text>长：</text>
						<input type="number" v-model="bumpLong">
						<text>mm</text>
					</view>
					<view>
						<text>宽：</text>
						<input type="number" v-model="bumpWidth">
						<text>mm</text>
					</view>
				</view>
			</view>
			<view class="rope">
				<view>打 孔：</view>
				<scroll-view scroll-x="true" class="item-list" scroll-with-animation>
					<text v-for="(item,index) in dkList" :key='index' :class="currentIndex8 == index? 'active':'' "
						@click="changeItem5(index)">{{item}}</text>
				</scroll-view>
			</view>
			<view class="color">
				<view>专 色：</view>
				<view>
					<view v-if="inputColor" class="chooseColor">
						<view @click="addItem">
							<view> + </view>
							<!-- <image src="../../static/image/SpecialEditionImg/colorAdd.png"></image> -->
							<text>添加专色</text>
						</view>
					</view>
					<!-- <scroll-view scroll-x="true" class="item-list" scroll-with-animation>
						<text v-for="(item,index) in colorItem" :key='index' :class="currentIndex7 == index? 'active':'' "
							@click="changeItem3(index,3,item)"  >{{item.label}}</text>
					</scroll-view> -->
					<view v-else class="inputColor">
						<view>
							<text>增加普通专色</text>
							<view @click="subColor(0)"> - </view>
							<!-- <image src="../../static/image/SpecialEditionImg/sub.png" @click="subColor(0)"></image> -->
							<input type="number" v-model="color_one" @input="valueIpt(0,$event)" >
							<!-- <image src="../../static/image/SpecialEditionImg/add.png" @click="addColor(0)"></image> -->
							<view @click="addColor(0)"> + </view>
							<text>个</text>
						</view>
						<view>
							<text>增加专金专银</text>
							<view @click="subColor(1)"> - </view>
							<input type="number" v-model="color_two " @input="valueIpt(1,$event)"  >
							<view @click="addColor(1)"> + </view>
							<!-- <image src="../../static/image/SpecialEditionImg/add.png" @click="addColor(1)"></image> -->
							<text>个</text>
						</view>
						<view>
							<text style="font-size: 20rpx;">(如需满版专色请联系客服报价)</text>
						</view>
					</view>
				</view>
				<!-- <view class="">
					<u-select v-model="colorShow"  :list="colorList"  @confirm='confirmItem'></u-select>
				</view> -->
				<!-- <u-dropdown active-color="#F59A2A">
					<u-dropdown-item style="background-color: #fff;" v-model="colorShow" title="专色"
						:options="colorList"></u-dropdown-item>
				</u-dropdown> -->

			</view>
			<view class="printing">
				<text>印刷方式：</text>
				<view v-if="imagePath ||  filePath " style="color: #FFF;" @click="showChooseFile">
					上传文件成功
				</view>
				<view @click="showChooseFile" v-else>
					<image src="../../static/image/SpecialEditionImg/linka.png"></image>
					<text>上传印刷文件</text>
				</view>

			</view>
			<view class="read">
				<u-radio-group v-model="checkValue" @change="Readcheck">
					<u-radio shape="circle" active-color='#FF9C00' :name="0">
						<text>我已阅读印刷须知并同意</text>
						<text style="color:#FF9C00 ;" @click.stop='showRead'>《印刷委托书》</text>
					</u-radio>
				</u-radio-group>
			</view>
			<view v-if="sum_price" class="show-top">
				<text>￥</text>
				<text>{{sum_price}}</text>
			</view>
			<view class="order">
				<text @click="payOrder">立即下单</text>
				<text @click="submitPrice">立即报价</text>
				<text @click="linkService">联系客服</text>
			</view>
		</view>

		<view class="content-goodsInfo">
			<view v-html="content" class="htmlContianer"></view>
		</view>
		<!-- 选择上传文件 -->
		<view>
			<u-popup v-model="chooseFile" mode='bottom' closeable height="318rpx" border-radius='20'>
				<view class="share-top">
					<view @click="chooseItem(1)" v-if="widthImg == ''">
						<image src="../../static/image/SpecialEditionImg/file.png"></image>
						<text v-if="!widthfile">文件夹</text>
						<view v-else
							style="width: 100%;height: 24rpx;border-radius: 5rpx;border: 1rpx solid #c1c1c1;position: relative;margin-top: 20rpx;">
							<text :style="{width:widthfile+'%'}"
								style="position: absolute; height:22rpx;border-radius: 5rpx;background-color: #F59A2A;font-size: 18rpx;text-align: center;color: #fff;line-height: 24rpx;">{{widthfile+'%'}}</text>
						</view>
						<!-- <text style="color:#F59A2A;" v-else>上传成功</text> -->
					</view>
					<view @click="chooseItem(2)" v-if="widthfile==''">
						<image src="../../static/image/SpecialEditionImg/xiangce.png"></image>
						<text v-if="!widthImg">相册</text>
						<view v-else
							style="width: 100%;height: 24rpx;border-radius: 5rpx;border: 1rpx solid #c1c1c1;position: relative;margin-top: 20rpx;">
							<text :style="{width:widthImg+'%'}"
								style="position: absolute; height:22rpx;border-radius: 5rpx;background-color: #F59A2A;font-size: 18rpx;text-align: center;color: #fff;line-height: 24rpx;">{{widthImg+'%'}}</text>
						</view>
						<!-- <text style="color:#F59A2A;" v-if="imagePath">上传成功</text> -->
						<u-upload ref="uUpload" custom-btn :action="action" max-count="1" :max-size="2 * 1024 * 1024"
							class="upload" :before-upload="beforeUpload">
						</u-upload>
					</view>
				</view>
			</u-popup>

		</view>
		<view>
			<u-popup v-model="checkRead" mode='center' closeable="true" height="800rpx" width="690rpx"
				border-radius='15' @close="moreShowClose">
				<view class="ReadContent" v-html="print_attorney_rule">

				</view>
				<view class="moreShow-top" @click="greetRead">
					我已阅读并同意
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

				goodsId: '',
				list: [],
				title: '',
				price: '',
				sale: '',
				feature_list: [],
				spec: [],
				content: '',
				peisongAdd: '',
				spec_content: '',
				// popShow: false,
				chooseFile: false,
				moreShow: true,
				cheackShow: true,
				checkValue: 0,
				print_attorney_rule: '',
				checkRead: false,
				imagePath: '',
				filePath: '',
				imagePath: '',
				showFile: false,
				showImage: false,
				value: 5,
				count: 5,
				//自定义尺寸数据
				spec: '',
				catesList: [],
				filmsList: [],
				weightList: [],
				materialsList: [],
				gildingShow: false,
				gildingList: ['无', '烫金'],
				uvShow: false,
				uvList: ['无', 'U V'],
				bumpShow: false,
				bumpList: ['无', '击凸'],
				dkList:['无','铆钉','鸡眼'],
				drill:'',
				drillName:'无',
				currentIndex: 0,
				currentIndex1: 0,
				currentIndex2: 0,
				currentIndex3: 0,
				currentIndex4: 0,
				currentIndex5: 0,
				currentIndex6: 0,
				currentIndex7: 0,
				currentIndex8:0,
				sizeWidth: '',
				sizeHeight: '',
				sizeTn: '',
				color_ids: '',
				inputColor: true,
				color_one: 0,
				color_two: 0,
				colorIndex: '',
				cateid: '',
				cateName: '',
				filmid: '',
				filmName: '',
				materialsid: '',
				materialsName: '',
				weightid: '',
				weightName: '',
				numNum: '',
				gildingLong: '',
				gildingWidth: '',
				uvLong: '',
				uvWidth: '',
				bumpLong: '',
				bumpWidth: '',
				sum_price: '',
				paper_config: '',
				unitPrice: '',
				submitShow: false,
				scrollTop: 0,
				shareTitle: '',
				shareImg: '',
				widthImg: '',
				widthfile: ''
			}
		},

		onShow() {
			console.log('111')
			this.getItmeList()
		},
		onLoad() {
			console.log('111')
			this.moreShow = true
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
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		methods: {
			// itemShow() {
			// 	this.popShow = !this.popShow
			// },
			changeItem(index) {
				this.currentIndex = index
				this.weightid = this.weightList[index].id
				this.weightName = this.weightList[index].name
			},
			changeItem1(index) {
				this.currentIndex1 = index
				this.cateid = this.catesList[index].id
				this.cateName = this.catesList[index].name
			},
			changeItem2(index) {
				this.currentIndex2 = index
				this.filmid = this.filmsList[index].id
				this.filmName = this.filmsList[index].name
				if(index ==0){
					this.filmName = ''
					this.filmid = ''
				}
			},
			changeItem4(index) {
				this.weightid = ''
				this.currentIndex = -1
				this.currentIndex6 = index
				this.materialsid = this.materialsList[index].id
				this.materialsName = this.materialsList[index].name
				this.$u.post('/single/index/get_weight', {
					id: this.materialsid
				}).then(res => {
					console.log(res, 'materials')
					this.weightList = res.data
				})
			},
			changeItem5(index){
				this.currentIndex8 = index
				if(index == 0 ){
				}else if(index ==1){
					this.drill = 'rivet'
					this.drillName = this.dkList[index]
				}else{
					this.drill = 'corns'
					this.drillName = this.dkList[index]
				}
			},
			changeItem3(index, i, j) {
				console.log(j, index, i, 'j')
				if (i == 0) {
					this.currentIndex3 = index
					if (index == 1) {
						this.gildingShow = true

					} else {
						this.gildingShow = false
						this.gildingLong = '',
						this.gildingWidth = ''
					}
				} else if (i == 1) {
					this.currentIndex4 = index
					if (index == 1) {
						this.uvShow = true
					} else {
						this.uvShow = false
						this.uvLong = '',
						this.uvWidth = ''
					}
				} else if(i == 2) {
					this.currentIndex5 = index
					if (index == 1) {
						this.bumpShow = true
					} else {
						this.bumpShow = false
						this.bumpLong = '',
						this.bumpWidth = ''
					}
					}else if(i == 3) {
					this.currentIndex7 = index
					this.colorShow = true
					this.colorIndex = index
				}
				
			},
			confirmItem(e) {
				console.log('confim')
				console.log(e)
				var obj = {
					value: e[0].value,
					label: e[0].label
				}
				console.log(obj, 'obj')
				this.colorItem[this.currentIndex7] = obj
			},
			addItem() {
				this.inputColor = false
			},
			//专色输入值
			valueIpt(i, $event) {
				if ($event.detail.value > 5) {
					uni.showToast({
						title: '专色最多只能选择五个颜色',
						icon: 'none'
					})
				}else if($event.detail.value <=5){
					if(i ==0){
						this.color_one =$event.detail.value
					}else{
						this.color_two =$event.detail.value
					}
				}
			},
			//专色数量减少
			subColor(i) {
				if (i == 0 && this.color_one > 0) {
					this.color_one--
				} else if (i == 0 && this.color_one <= 0) {
					uni.showToast({
						title: '颜色数量不能小于0',
						icon: 'none'
					})
				}
				if (i == 1 && this.color_two > 0) {
					this.color_two--
				} else if (i == 1 && this.color_two <= 0) {
					console.log('two')
					uni.showToast({
						title: '颜色数量不能小于0',
						icon: 'none'
					})
				}
			},
			//专色数量增加
			addColor(i) {
				if (this.color_one < 0 || this.color_two < 0) {
					uni.showToast({
						title: '颜色数量不能小于0',
						icon: 'none'
					})
				} else {
					if (Number(this.color_one) + Number(this.color_two) >= 5) {
						uni.showToast({
							title: '专色最多只能选择五个颜色',
							icon: 'none'
						})
					} else {
						if (i == 0) {
							this.color_one++
						} else {
							this.color_two++
						}
					}
				}
			},
			subItem() {
				this.colorItem.splice(this.currentIndex7, 1)
			},
			showChooseFile() {
				this.chooseFile = !this.chooseFile
			},

			//获取数据
			getItmeList() {
				this.$u.post('/single/index/diy_goods').then(res => {
					console.log(res.data, 'diyGoods')
					this.goodsId = res.data.id
					//获取规格的穿绳和覆膜列表
					this.list = res.data.banner_image
					this.title = res.data.title
					this.price = res.data.price
					this.sale = res.data.sale
					this.feature_list = res.data.feature_list
					this.peisongAdd = res.data.user_address
					this.spec_content = res.data.spec_content
					this.content = res.data.content.replace(/\<img/gi,
						'<img style="max-width:100%;height:auto" ')
					this.catesList = res.data.cates
					this.cateName = this.catesList[0].name
					this.cateid = this.catesList[0].id
					this.filmsList = res.data.films
					this.filmsList.unshift({
						id:0,
						name:'无'
					})
					this.filmName = this.filmsList[0].name
					this.filmid = this.filmsList[0].id
					this.materialsList = res.data.materials
					this.materialsName = this.materialsList[0].name
					this.materialsid = this.materialsList[0].id
					this.weightList = res.data.weights
					this.weightName = this.weightList[0].name
					this.weightid = this.weightList[0].id
					this.shareTitle = res.data.share_config.share_title
					this.shareImg = res.data.share_config.share_image
					this.print_attorney_rule = res.data.print_attorney_rule

				})

			},
			//选择文件，只支持在微信小程序聊天会话中选择，暂时不支持在文件中直接打开
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
							//显示上传进度条
							uploadTaskfile.onProgressUpdate((res) => {
								this.widthfile = res.progress

							});
						}
					})
				} else if (e == 2) {
					var that = this
					//选择照片或者拍照
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
							//显示上传进度条
							uploadTask.onProgressUpdate((res) => {
								this.widthImg = res.progress
							});
						}
					});
				}
			},
			// 上传文件			
			upLoadFile(e) {
				uni.uploadFile({
					url: this.BaseUrl + '/api/common/upload',
					filePath: e,
					name: 'file',
					success: (res) => {
						console.log(JSON.parse(res.data).data, '111')
					}
				})
			},
			//提交报价
			submitPrice() {
				this.submitShow = true
				console.log(this.sizeHeight, this.sizeTn, this.sizeWidth, this.numNum)
				if (this.sizeHeight != '' && this.sizeWidth != '' && this.sizeTn != '' && this.numNum != '' && this
					.weightid != '') {

					this.$u.post('/single/index/get_offer', {
						width: this.sizeTn,
						height: this.sizeHeight,
						length: this.sizeWidth,
						cateid: this.cateid ? this.cateid : this.catesList[0].id,
						filmid: this.filmid ? this.filmid : this.filmsList[0].id,
						material_id: this.materialsid,
						weight_id: this.weightid,
						color_one: Number(this.color_one),
						color_two: Number(this.color_two),
						num: this.numNum,
						gold_length: this.gildingLong,
						gold_width: this.gildingWidth,
						uv_length: this.uvLong,
						uv_width: this.uvWidth,
						convex_length: this.bumpLong,
						convex_width: this.bumpWidth,
						drill:this.drill
					}).then(res => {
						if(res.code !==200){
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}
						console.log(res, 'getPrice')
						this.sum_price = res.data.sum_price
						this.unitPrice = res.data.price
						this.paper_config = res.data.paper_config
					})
				} else {
					uni.showToast({
						title: '请输入尺寸、数量,选择克重',
						icon: 'none'
					})
				}

			},
			//预订单
			payOrder() {
				this.spec =
					` 纸张:${this.materialsName},克重:${this.weightName},尺寸:${this.sizeWidth}*${this.sizeHeight}*${this.sizeTn},数量:${this.numNum},穿绳:${this.cateName},覆膜:${this.filmName},烫金:${this.gildingShow?this.gildingLong+'*'+this.gildingWidth:0+ '*'+0},UV:${this.uvShow?this.uvLong+'*'+this.uvWidth:0+ '*'+0},击凸:${this.bumpShow?this.bumpLong+'*'+this.bumpWidth:0+ '*'+0},打孔:${this.drillName},普通专色:${this.color_one}个,专金专银:${this.color_two}个`
				console.log(this.spec, 'spec')
				if (this.sizeHeight && this.sizeWidth && this.sizeTn && this.numNum && this.submitShow && this
					.cheackShow) {
					if (this.sum_price == '') {
						uni.showToast({
							title: '请先获取报价',
							icon: 'none'
						})
					} else {
						var obj = {
							length: this.sizeTn,
							width: this.sizeWidth,
							height: this.sizeHeight,
						}
						this.$u.post('/single/order/ready_order', {
							goods_type: 20,
							goods_array: JSON.stringify({
								goods_id: this.goodsId,
								spec: this.spec,
								number: this.numNum,
								price: this.unitPrice,
								sum_price: this.sum_price,
								materials: this.materialsName,
								weights: this.weightName,
								height: this.sizeHeight,
								length: this.sizeWidth,
								width: this.sizeTn,
								file_url: this.filePath ? this.filePath : this.imagePath,
								material_id: this.materialsid,
								weight_id: this.weightid,
								paper_config: this.paper_config
							})
						}).then(res => {
							console.log(res.data, '非标准预订单参数')
							res.data.paper_config = this.paper_config
							if (res.code != 200) {
								uni.showToast({
									title: res.message,
									icon: 'none'
								})
							} else {
								console.log(res.data, '参数')
								uni.navigateTo({
									url: '../Me/MeCom/MyOrder/PayOrder/PayOrder?index=2&data=' + JSON
										.stringify(res.data)
								})
							}
						})
					}
				} else {
					uni.showToast({
						title: '请填写尺寸、数量,获取报价,同意印刷委托书',
						icon: 'none'
					})
				}
			},

			greetRead() {
				this.checkRead = false
				this.cheackShow = true
				this.checkValue = 0
			},
			Readcheck(e) {
				console.log(e)
				this.cheackShow = !this.cheackShow
				this.checkValue = e
				if (this.cheackShow) {
					this.checkValue = 0
				} else {
					this.checkValue = 1
				}

			},
			showRead() {
				this.checkRead = true
			},
			//联系客服，打开企业微信
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
			// 跳转更多评论
			goCommentary() {
				uni.navigateTo({
					url: "./SpecialEditionCom/AllCommentary/AllCommentary?goodsid=" + this.goodsId
				})
			},
			//跳转收货地址
			goAddress() {
				uni.navigateTo({
					url: '../Me/MeCom/MyAddress/MyAddress'
				})
			}
		}
	}
</script>

<style lang="scss">
	body {
		background-color: #F0F1F1;
	}

	u-dropdown {
		flex: none !important;
		width: 160rpx;
		border: 1px solid #999;
		border-radius: 10rpx
	}

	.u-dropdown__menu__item__text {
		margin-bottom: 19rpx !important;
	}

	.u-dropdown__menu__item__arrow {
		margin-bottom: 16rpx;
	}

	.u-dropdown-item {
		background-color: #FFf !important;
		text-align: center;
	}

	.active {

		color: #666666 !important;
		border: 1px solid #F59A2A !important;
	}

	.SpecialEdition {
		.SpecialEdition-top {
			width: 100%;
			height: 346rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.SpecialEdition-info {
			position: relative;
			width: 100%;
			top: -24rpx;
			background-color: #fff;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			overflow: hidden;

			.info-title {
				width: 658rpx;
				margin: 22rpx auto;
				font-size: 34rpx;
				line-height: 50rpx;
				font-family: Source Han Sans CN Regular;

				color: #000;
			}

			.info-price {
				display: flex;
				justify-content: space-between;
				width: 670rpx;
				margin: 0 auto 32rpx;

				>view:nth-child(1) {
					>text:nth-child(1) {
						font-size: 30rpx;
						color: #FF0000;
					}

					>text:nth-child(2) {
						font-size: 36rpx;
						color: #FF0000;
					}

					>text:nth-child(3) {
						font-size: 24rpx;
						color: #FF0000;
					}
				}

				>view:nth-child(2) {
					font-size: 24rpx;
					color: #999;
				}
			}

			.info-list {
				width: 100%;
				border-top: 1rpx solid #F0F1F1;
				padding-bottom: 8rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;

				.info-item {
					image:nth-child(1) {
						width: 20rpx;
						height: 20rpx;
						margin-right: 12rpx;
						vertical-align: middle;
					}

					text:nth-child(2) {
						font-size: 21rpx;
						color: #666;
					}
				}
			}
		}

		.SpecialEdition-choose {
			width: 100%;
			display: flex;
			flex-direction: column;
			background-color: #fff;
			margin-bottom: 22rpx;

			.choose-item {
				width: 100%;
				height: 78rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 30rpx 0 38rpx;
				border-bottom: 1rpx solid #F0F1F1;

				>view:nth-child(1) {
					>text:nth-child(1) {
						font-size: 24rpx;
						color: #999;
						margin-right: 42rpx;
						white-space: nowrap !important;
					}

					>text:nth-child(2) {
						font-size: 24rpx;
						color: #333;
					}
				}
			}

			>view:nth-child(2) {
				display: flex;
				align-items: center;
				width: 100%;
				padding: 0 30rpx 0 38rpx;

				>view:nth-child(1) {
					padding: 10rpx 0 20rpx 0;
					display: flex;

					>text:nth-child(1) {
						white-space: nowrap;
						font-size: 24rpx;
						color: #999;
						margin-right: 42rpx;
					}

					>text:nth-child(2) {
						width: 80%;
						font-size: 24rpx;
						color: #333;
					}
				}
			}
		}

		.SpecialEdition-comment {
			width: 100%;
			background-color: #fff;
			padding: 20rpx 30rpx 10rpx 30rpx;

			>view:nth-child(1) {
				display: flex;
				justify-content: space-between;

				>view:nth-child(1) {
					font-size: 30rpx;
					font-weight: 700;
					color: #333333;
				}

				>view:nth-child(2) {
					font-size: 24rpx;
					color: #999;

					text:nth-child(1) {
						margin-right: 12rpx;
					}
				}
			}

			>view:nth-child(2) {
				.user-info {
					display: flex;
					justify-content: space-between;
					width: 100%;
					margin: 36rpx 0 20rpx 0;

					>view:nth-child(1) {
						display: flex;

						>image:nth-child(1) {
							width: 60rpx;
							height: 60rpx;
							border-radius: 50%;
							margin-right: 10rpx;
						}

						>view:nth-child(2) {
							display: flex;
							flex-direction: column;

							>text:nth-child(1) {
								font-size: 24rpx;
								color: #666;
								margin-bottom: 8rpx;
								margin-left: 5rpx;
							}
						}

						.user-pingfen {
							margin-top: -15rpx;
						}
					}

					>view:nth-child(2) {
						margin-top: 20rpx;
						font-size: 24rpx;
						color: #666;
					}
				}

				.comment-content {
					margin-top: 12rpx;
					font-size: 24rpx;
					color: #666;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
				}
			}

			>view:nth-child(3) {
				line-height: 40rpx;
				font-size: 24rpx;
				color: #666;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
			}
		}
	}

	.show {
		padding-top: 30rpx;
		background-color: #FFF;
		margin-top: -12rpx;

		.show-top {
			margin-left: 30rpx;
			margin-bottom: 20rpx;

			text {
				color: #FF0000;
			}

			>text:nth-child(1) {
				font-size: 36rpx;
				margin-right: 6rpx;
			}

			>text:nth-child(2) {
				font-size: 60rpx;
			}
		}

		// .show-top{
		// 	width: 750rpx;
		// 	display: flex;
		// 	justify-content: space-between;
		// 	padding: 0 30rpx;
		// 	margin-bottom: 32rpx;
		// 	>image:nth-child(1){
		// 		width: 140rpx;
		// 		height: 140rpx!important;
		// 		margin-right: 20rpx;
		// 	}
		// 	>view:nth-child(2){
		// 		flex: 1;
		// 		display: flex;
		// 		flex-direction: column;
		// 		>text:nth-child(1){
		// 			font-size: 36rpx;
		// 			margin-bottom: 13rpx;
		// 			color: #FF0000;
		// 		}
		// 		>text:nth-child(2){
		// 			font-size: 24rpx;
		// 			color: #666;
		// 		}
		// 	}
		// }
		.size {
			display: flex;
			padding-left: 32rpx;
			margin-bottom: 30rpx;
			margin-top: 10rpx;

			input {
				width: 115rpx;
				height: 47rpx;
				margin-right: 5rpx;
				border: 1px solid #BFBFBF;
				border-radius: 10rpx;
				color: #999;
				text-align: center;
			}

			>text:nth-child(1) {
				font-size: 28rpx;
				color: #666;
				white-space: nowrap;
			}

			>text:nth-child(2) {
				font-size: 28rpx;
				color: #999;
				white-space: nowrap;
			}

			>text:nth-child(3),
			>text:nth-child(5),
			>text:nth-child(7) {
				margin-top: 5rpx;
				margin-right: 4rpx;
				color: #999;
			}
		}

		.num {
			display: flex;
			padding-left: 32rpx;
			margin-bottom: 30rpx;

			>text:nth-child(1) {
				font-size: 28rpx;
				color: #666;
				white-space: nowrap;
			}

			input {
				width: 180rpx;
				height: 47rpx;
				margin-right: 5rpx;
				border: 1px solid #BFBFBF;
				border-radius: 10rpx;
				color: #999;
				text-align: center;
			}

			>text:nth-child(3) {
				margin-top: 5rpx;
				margin-left: 5rpx;
				color: #999;
			}
		}

		.color {
			display: flex;
			line-height: 60rpx;
			padding-left: 32rpx;
			margin-bottom: 30rpx;

			>view:nth-child(1) {
				width: 100rpx;
				font-size: 28rpx;
				color: #666;
				white-space: nowrap;
			}

			>view:nth-child(2) {
				flex: 1;

				.chooseColor {
					>view:nth-child(1){
						display: flex;
						justify-content: center;
						align-items: center;
						width: 190rpx;
						height: 58rpx;
						line-height: 57rpx;
						border: 1px solid #F59A2A;
						color: #F59A2A;
						border-radius: 10rpx;
						view:nth-child(1){
							width: 32rpx;
							height: 32rpx;
							line-height: 22rpx;
							text-align: center;
							border: 1px solid #F59A2A;
							border-radius: 50%;
							margin-right: 10rpx;
						}
					}
					
				}

				.inputColor {
					flex: 1;
					display: flex;
					flex-direction: column;

					>view {
						height: 62rpx;
						line-height: 62rpx;
						display: flex;
						align-items: center;
						view{
							display: flex;
							align-items: center;
							justify-content: center;
							width: 35rpx;
							height: 35rpx;
							padding-bottom: 2rpx;
							border: 2rpx solid #BFBFBF;
							border-radius: 50%;
							color: #bfbfbf;
							margin: 0 10rpx;
						}
						text {

							font-size: 28rpx;
							color: #666666;
							margin-bottom: 4rpx;
						}

						image {
							width: 30rpx;
							height: 30rpx;
							margin: 0 10rpx;
						}

						input {
							display: inline-block;
							width: 90rpx;
							height: 47rpx;
							margin-right: 5rpx;
							border: 1px solid #BFBFBF;
							border-radius: 10rpx;
							color: #999;
							margin: -4rpx 8rpx 0 8rpx;
							text-align: center;
						}
					}

				}

				.item-list {
					width: 600rpx;
					display: flex;
					white-space: nowrap;
					justify-content: left;
					text-align: left;

					text {
						height: 60rpx;
						line-height: 60rpx;
						border: 1px solid #BFBFBF;
						border-radius: 10rpx;
						padding: 8rpx 15rpx;
						margin-right: 34rpx;
						color: #666666;
						font-size: 28rpx;
					}
				}
			}
		}

		.rope {
			display: flex;
			height: 60rpx;
			line-height: 60rpx;
			padding-left: 32rpx;
			margin-bottom: 30rpx;

			>view:nth-child(1) {
				width: 100rpx;
				font-size: 28rpx;
				color: #666;
				white-space: nowrap;
			}

			.item-list {
				width: 600rpx;
				display: flex;
				white-space: nowrap;
				justify-content: left;
				text-align: left;

				text {
					height: 60rpx;
					line-height: 60rpx;
					border: 1px solid #BFBFBF;
					border-radius: 10rpx;
					padding: 8rpx;
					margin-right: 34rpx;
					color: #666666;
					font-size: 28rpx;
				}
			}
		}

		.gilding,
		.uv,
		.bump {
			height: 62rpx;
			line-height: 62rpx;
			display: flex;
			flex-wrap: nowrap;
			padding-left: 32rpx;
			margin-bottom: 30rpx;

			input {
				width: 72rpx;
				height: 32rpx !important;
				margin-right: 5rpx;
				border: 1px solid #BFBFBF;
				border-radius: 10rpx;
				color: #999;
				margin-top: 10rpx;
				text-align: center;
			}

			>text:nth-child(1) {
				height: 50rpx;
				line-height: 50rpx;
				font-size: 28rpx;
				color: #666;
				white-space: nowrap;
				margin-top: 5rpx;
			}

			>text:nth-child(2),
			>text:nth-child(3) {
				border: 1px solid #BFBFBF;
				border-radius: 10rpx;
				height: 62rpx;
				line-height: 62rpx;
				margin-right: 20rpx;
				padding: 0rpx 14rpx 10rpx;
				color: #666666;
				font-size: 28rpx;
				white-space: nowrap;
			}

			>view:nth-child(4) {
				margin-right: -20rpx;
				display: flex;
				align-items: center;
				height: 62rpx;
				line-height: 62rpx;
				border: 1px solid #bfbfbf;
				border-radius: 10rpx;
				padding: 5rpx 10rpx 10rpx;

				view {
					display: flex;
					font-size: 28rpx;
					color: #666;
				}

				>view:nth-child(2) {
					margin-left: 10rpx;
				}
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

		.read {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 40rpx 0 19rpx;
		}

		.order {
			display: flex;
			justify-content: space-around;
			padding-bottom: 50rpx;

			text {
				width: 200rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				border-radius: 10rpx;
				color: #fff;
				background-color: #F59A2A;
			}

			// >text:nth-child(2) {
			// 	background-color: #F59A2A;
			// }
			// >text:nth-child(3){
			// 	background-color: #ffcb80;
			// }
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

	.share-footer {
		width: 100%;
		height: 118rpx;
		line-height: 118rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
		color: #666;
		letter-spacing: 10rpx;
	}

	.content-goodsInfo {
		width: 100%;
		margin: 0 auto;
		margin-top: 15rpx;
		padding: 0 30rpx;
		background-color: #FFF;

		// margin-bottom: 120rpx;
		.htmlContianer {
			max-width: 710rpx;
			overflow: hidden;

			image {
				width: 690rpx;
			}
		}

	}

	.ReadContent {
		margin-top: 80rpx;
		padding: 0 38rpx;
	}

	.moreShow-top {
		width: 266rpx;
		height: 70rpx;
		line-height: 70rpx;
		border-radius: 10rpx;
		padding: 5rpx;
		text-align: center;
		margin: 48rpx auto;
		background-color: rgb(247, 156, 34);
		color: #FFF;

	}
</style>
