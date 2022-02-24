<template>
	<view class="extension page">
		<view class="extension-top">
			<image :src="image"></image>
			<image :src="qr" show-menu-by-longpress></image>
		</view>
		<view class="extension-footer">
			<view>
				<image src="../../../../static/image/meImg/extensionImg/share.png"></image>
				<text>分享给好友</text>
				<button open-type="share">1111</button>
			</view>
			<view @click="generate">
				<image src="../../../../static/image/meImg/extensionImg/save.png"></image>
				<text>保存图片</text>
			</view>
		</view>
		<u-popup v-model="show" mode="center" width="80%" height="82%"  >
			<view class="" style="width: 100%;height: 85%;margin: 0 auto;">
				<image :src="tempimage" style="width: 100%;height: 100%;" mode="widthFix"/>
			</view>
			<view class="baocun">
				<view @click="saveimage"><u-icon name="download"></u-icon>保存本地</view>
			</view>
		</u-popup>
		<canvas id="firstCanvas" canvas-id="firstCanvas" style="width: 320px; height: 427px;position: fixed;left: 1900px;"></canvas>
	</view>
</template>

<script>
	export default {
		data() {
			return{
				show: false,
				tempimage:'',
				image:'',
				qr:''
			}
		},
		onLoad() {
			this.ctx = uni.createCanvasContext('firstCanvas', this)
			this.getItemList()
		},	
		methods: {
			//获取推广二维码
			getItemList(page){
				this.$u.post('/single/user/getCode').then(res => {
					this.image = res.data.sharePath
						console.log(res,'111')
						uni.getImageInfo({
							src: 'https://admin.yin10000.com'+res.data.codePath,
							success: (image)=> {
								this.qr = image.path
							},
					    })
						uni.getImageInfo({
							src: res.data.sharePath,
							success: (image)=> {
								this.image = image.path
							},
						})
				})						
			},
			//定义二维码对的大小和位置
			generate() {
				let data = {
					x: 100,
					y: 270,
					w: 110,
					h: 110
				}
				var this_ = this;
				uni.getImageInfo({
					src: this.image,
					success: function(image) {
						this_.image = image.path
						this_.OnCanvas(data);
					},
				})
			},
			OnCanvas(obj) {
				console.log(obj);
				var ctx = this.ctx
				uni.showToast({
					title:'生成海报中...',
					icon:'loading',
					duration:3000
				})
				ctx.save()
				ctx.beginPath()
				// var image = new Image();
				ctx.drawImage(this.image, 0, 0,320,400)
				ctx.drawImage(this.qr, obj.x, obj.y, obj.w, obj.h)
				ctx.restore()
				// ctx.setFontSize(20)
				ctx.setFillStyle('#FFFFFF')
				// ctx.setTextAlign('center')
				setTimeout(()=>{
					ctx.draw()
				},2000)
				setTimeout(()=>{
					this.FilePath();
				},3000)
			},
			FilePath(){
				var this_ = this;
				this.show = true
				uni.canvasToTempFilePath({
				  x: 0,
				  y: 0,
				  width: 320,
				  height: 520,
				  destWidth: 320,
				  destHeight: 520,
				  canvasId: 'firstCanvas',
				  fileType:'png',
				  success: function(res) {
				    // 在H5平台下，tempFilePath 为 base64
					this_.tempimage = res.tempFilePath
					// this_.$u.post('index/uplodeimg',{file:res.tempFilePath}).then(res=>{
					// 	console.log(res,'111');	
					// 	this_.tempimage = this.image
					// })
				  } 
				})
			},
			saveimage(){
				var this_ = this;
				var date = new Date().getTime();
				// uni.showToast({
				// 	title:'请长按图片保存',
				// 	icon:'none',
				// 	duration:2000
				// })
				uni.saveImageToPhotosAlbum({
					filePath:this_.tempimage,
					success() {
						uni.showToast({
							title:'保存图片成功'
						})
					}
				})
					 
			},
			savePic(Url){
					// Url = this.dialogImgUrl //图片路径，也可以传值进来
					var triggerEvent = "touchstart"; //指定下载方式
				    var blob=new Blob([''], {type:'application/octet-stream'}); //二进制大型对象blob
				    var url = URL.createObjectURL(blob); //创建一个字符串路径空位
				    var a = document.createElement('a'); //创建一个 a 标签
				    a.href = Url;  //把路径赋到a标签的href上
				    //正则表达式，这里是把图片文件名分离出来。拿到文件名赋到a.download,作为文件名来使用文本
				    a.download = Url.replace(/(.*\/)*([^.]+.*)/ig,"$2").split("?")[0]; 
				    /* var e = document.createEvent('MouseEvents');  //创建事件（MouseEvents鼠标事件）
				    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); //初始化鼠标事件（initMouseEvent已弃用）*/
				    
				    //代替方法。创建鼠标事件并初始化（后面这些参数我也不清楚，参考文档吧 https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent）
					var e = new MouseEvent('click', ( true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null));  
					//派遣后，它将不再执行任何操作。执行保存到本地
				    a.dispatchEvent(e); 
				    //释放一个已经存在的路径（有创建createObjectURL就要释放revokeObjectURL）
				    URL.revokeObjectURL(url);  
					/* 
					//这段好像并不影响，所以我不用，注释掉
					var imgs = document.getElementsByTagName("img");
					for(var i = 0,o;o = imgs[i];i++){
						
						o.addEventListener(triggerEvent,function(){
							var newurl = this.getAttribute("src");
							saveAs(newurl);
						},false);
					} */
					
				},
		},
		onShareAppMessage() {
			console.log('fenxiang')
		}
	}
</script>

<style lang="scss">
	body {
		background-color: #F9F9F9;
	}

	.extension {
		.extension-top {
			position: relative;
			width: 690rpx;
			height: 1200rpx;
			margin: 0 auto;
			margin-bottom: 150rpx;

			>image:nth-child(1) {
				position: absolute;
				width: 100%;
				height: 100%;
			}

			>image:nth-child(2) {
				position: absolute;
				width: 310rpx;
				height: 310rpx;
				bottom: 68rpx;
				left: 50%;
				transform: translate(-50%);
				z-index: 99;
			}
		}

		.extension-footer {
			position: fixed;
			display: flex;
			bottom: 0;
			width: 100%;
			height: 100rpx;
			background-color: #fff;
			z-index: 999;
			box-shadow: -2px 5px 5px 5px rgba(100, 100, 100, 0.3); ;
			view {
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;

				text-align: center;

				>image:nth-child(1) {
					width: 40rpx;
					height: 40rpx;
					vertical-align: middle;
				}

				>text:nth-child(2) {
					margin-left: 12rpx;
					margin-top: 10rpx;
				}
			}

			>view:nth-child(1) {
				position: relative;

				button {
					position: absolute;
					opacity: 0;
					width: 100%;
					height: 100%;
					top: 0;
				}
			}
		}
	}
	.baocun{
		position: relative;
		top: 4%;
		display: flex;
		justify-content: center;
		color:#FFFFFF;
		view{
			background-color: #333333;
			padding:8rpx 20rpx;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 10rpx;
			font-size: 28rpx;
		}
	}
</style>
