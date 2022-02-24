<template>
	<view class="apply-refund">
		<view class="refund-top">
			<view @click="changeShow">
				<text>退款原因：</text>
				<view >
					<text v-if="desc == ''">请选择</text>
					<text v-else>{{desc}}</text>
					<image src="../../../../../static/image/meImg/myWalletImg/rightM.png"></image>
				</view>
			</view>
			<view>
				<text>退款金额：</text>
				<text>￥{{price}}</text>
			</view>
			<view>
				<view>
					<text>退款说明：</text>
					<text>选填</text>
				</view>
				<view>
					<u-input v-model="refuseDesc" type="textarea" :maxlength="2000" :clearable='false'
						placeholder="请输入退款说明" />
				</view>
			</view>
			<view>
				<text>上传凭证</text>
				<view>
					<u-upload action="https://admin.yin10000.com/api/common/upload" :max-count='3'
					  ref="uUpload" :file-list="fileList" @change="upLoad"></u-upload>
				</view>
				<text>(最多3张)</text>
			</view>
		</view>
		<view class="refund-submit" @click="submit">提交申请</view>


		<u-popup v-model="changeItemShow" mode="bottom" border-radius="14" :closeable='true' height="896"
			class="popShow">
			<view class="popShow-top">退款原因</view>
			<view class="popShow-list">
				<view class="popShow-item"  @click="radioChange(0)">
					<text>不想要了</text>
					<u-radio-group v-model="value">
						<u-radio shape="circle" active-color="#FF7C4C" name="0" @change="radioChange(0)"></u-radio>
					</u-radio-group>
				</view>
				<view class="popShow-item"  @click="radioChange(1)">
					<text>质量问题</text>
					<u-radio-group v-model="value">
						<u-radio shape="circle" active-color="#FF7C4C" name="1" ></u-radio>
					</u-radio-group>
				</view>
				<view class="popShow-item"  @click="radioChange(2)">
					<text>快递/物流一直未送到</text>
					<u-radio-group v-model="value">
						<u-radio shape="circle" active-color="#FF7C4C" name="2" ></u-radio>
					</u-radio-group>
				</view>
				<view class="popShow-item" @click="radioChange(3)">
					<text>货物破损已拒收</text>
					<u-radio-group v-model="value">
						<u-radio shape="circle" active-color="#FF7C4C" name="3" ></u-radio>
					</u-radio-group>
				</view>
				<view class="popShow-item" @click="radioChange(4)">
					<text>大小/重量商品描述不符合</text>
					<u-radio-group v-model="value">
						<u-radio shape="circle" active-color="#FF7C4C" name="4" ></u-radio>
					</u-radio-group>
				</view>
				<view class="popShow-item" @click="radioChange(5)">
					<text>其 他</text>
					<u-radio-group v-model="value">
						<u-radio shape="circle" active-color="#FF7C4C" name="5" ></u-radio>
					</u-radio-group>
				</view>
				<view class="popShow-submit" @click="changeShow">确定</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				changeItemShow: false,
				value: '',
				sn: '',
				type: '',
				id:'',
				price:'',
				orderType: '',
				desc: '',
				refuseDesc: '',
				images: '',
				fileList: []
			}
		},
		onLoad(option) {
			console.log(option, '1232')
			const i = JSON.parse(option.i)
			this.sn = i.order_sn
			this.type = i.order_type
			this.id = i.id
			this.price = i.price_total - i.price_express
			if (this.type == 0) {
				this.orderType = 1
			} else {
				this.orderType = 2
			}
		},
		methods: {
			changeShow() {
				this.changeItemShow = !this.changeItemShow
			},
			radioChange(e) {
				this.value = e
				console.log(e)
				if (e == 0) {
					this.desc = '不想要了'
				} else if (e == 1) {
					this.desc = '质量问题'
				} else if (e == 2) {
					this.desc = '快递/物流一直未送到'
				} else if (e == 3) {
					this.desc = '货物破损已拒收'
				} else if (e == 4) {
					this.desc = '大小/重量商品描述不符合'
				} else {
					this.desc = '其 他'
				}
			},
			submit(){
				let files = [];
				files = this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})
				// 如果您不需要进行太多的处理，直接如下即可
				// this.fileList = this.$refs.uUpload.lists;
				let str = ''
				files.forEach(v =>{
					return str += v.response.data +','
				})
				console.log(str.slice(0,-1))
				this.$u.post('/single/order/commit_refund',{
					order_id:this.id,
					order_no:this.sn,
					order_type:this.orderType,
					desc:this.desc,
					refuse_desc:this.refuseDesc,
					images:str.slice(0,-1)
				}).then(res => {
					console.log(res,'提交')
					if(res.code ==200){
						uni.showToast({
							title:'提交申请成功',
							duration:1500
						})
						setTimeout(()=>{
							uni.redirectTo({
								url:'../MyOrder'
							})
						},1500)
					}else{
						uni.showToast({
							title:'提交申请失败',
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F0F1F1 !important;
	}

	.apply-refund {
		width: 100%;

		.refund-top {
			width: 100%;
			border-top: 20rpx solid #F0F1F1;
			padding-bottom: 120rpx;
			background-color: #FFF;

			>view:nth-child(1) {
				width: 100%;
				height: 92rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1px solid #F0F0F1;

				>text:nth-child(1) {
					margin-left: 30rpx;
				}

				>view:nth-child(2) {
					>text:nth-child(1) {}

					>image:nth-child(2) {
						width: 12rpx;
						height: 20rpx;
						margin-right: 32rpx;
						margin-left: 8rpx;
					}
				}
			}

			>view:nth-child(2) {
				width: 100%;
				height: 102rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #F0F1F1;
				
				>text:nth-child(1) {
					margin-left: 30rpx;
					font-size: 30rpx;
					color: #333333;
					margin-right: 20rpx;
				}
			
				>text:nth-child(2) {
					margin-right: 53rpx;
					font-size: 30rpx;
					color: #FF0000;
				}
			}

			>view:nth-child(3) {
				>view:nth-child(1) {
					margin-left: 30rpx;
					margin-top: 42rpx;

					>text:nth-child(1) {
						font-size: 30rpx;
						color: #333333;
						margin-right: 14rpx;
					}

					>text:nth-child(2) {
						font-size: 30rpx;
						color: #999999;
					}
				}

				>view:nth-child(2) {
					width: 690rpx;
					margin: 0 auto;
					margin-top: 32rpx;
					padding: 26rpx 30rpx 100rpx 30rpx;
					border-radius: 15rpx;
					background-color: #F0F1F1;
					margin-bottom: 42rpx;
				}
			}

			>view:nth-child(4) {
				margin-left: 30rpx;

				>text:nth-child(1) {
					margin-left: 30rpx;
					font-size: 30rpx;
					color: #333333;
					margin-bottom: 50rpx;
				}

				>text:nth-child(3) {
					margin-left: 38rpx;
					font-size: 24rpx;
					color: #999999;
				}
			}
		}

		.refund-submit {
			width: 690rpx;
			height: 70rpx;
			line-height: 70rpx;
			text-align: center;
			margin: 0 auto;
			margin-top: 108rpx;
			background-color: #FF7C4C;
			color: #FFF;
			border-radius: 10rpx;
		}
	}

	.popShow {
		.popShow-top {
			width: 100%;
			margin-top: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 36rpx;
			font-weight: 700;
			color: #333333;
		}

		.popShow-list {
			.popShow-item {
				display: flex;
				width: 750rpx;
				height: 96rpx;
				line-height: 96rpx;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #F0F1F1;

				>text:nth-child(1) {
					margin-left: 30rpx;
					font-size: 30rpx;
					color: #333333;
				}

				u-radio {}
			}

			.popShow-submit {
				width: 690rpx;
				height: 70rpx;
				line-height: 70rpx;
				text-align: center;
				margin: 0 auto;
				margin-top: 80rpx;
				background-color: #FF7C4C;
				color: #FFF;
				border-radius: 10rpx;
			}
		}
	}
</style>
