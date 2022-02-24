<template>
	<view class="feedback">
		<view class="feedback-top">
			<text>问题和意见</text>
			<u-input v-model="userContent" type="textarea" :clearable='false' class="ipt" maxlength="2000"
				placeholder="请告诉我们你遇到的问题或想反馈的意见" />
		</view>
		<view class="feedback-upload">
			<view>
				<text>图片</text>
				<text>(图片上传大小不能超过2m)</text>
			</view>
			<view>
				<u-upload ref="uUpload" :action="action" max-count="1" :max-size="2 * 1024 * 1024"  class="upload" :before-upload="beforeUpload">
				</u-upload>
			</view>
		</view>
		<view class="feedback-footer">
			<text>联系方式</text>
			<u-input v-model="UserPhone" type="number" :clearable='false' class="ipt" maxlength="11"
				placeholder="留下联系方式，更可能解决问题" />
		</view>
		<view class="submit" @click="submitInfo">
			<text>提交</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action: '',
				userContent: '',
				UserPhone: '',
				url:'',
				fileList: [{}]
			}
		},
		onLoad() {
			this.action = this.BaseUrl + '/api/common/upload'
		},
		methods: {
			beforeUpload(index, list) {
				console.log(index,list);
				uni.uploadFile({
					url: this.action, //仅为示例，非真实的接口地址
					filePath: list[0].url,
					name: 'file',
					success: (res) => {
						let list = JSON.parse(res.data).data
						console.log(list,'list')
						this.url = list
					}
				});
			},
			submitInfo() {
				console.log(this.userContent.trim(),this.UserPhone.trim(),this.url)
				if(this.userContent.trim()&&this.UserPhone.trim()&&this.url){
					const flag = /^[1][3,4,5,7,8,9][0-9]{9}$/
					if(flag.test(this.UserPhone.trim())){
						this.$u.post('/single/user/commit_feedback',{
								image:this.url,
								content:this.userContent,
								phone:this.UserPhone
						}).then(res => {
							console.log(res,'111')
							uni.showToast({
								title:'提交成功'
							})
							if(res.code == 200){
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1500)
							}
						})
					}else {
						uni.showToast({
							title:'请检查您的手机号',
							icon:'none'			
						})
					}
				}else{
					uni.showToast({
						title:'请检查您的输入项',
						icon:"none"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	/deep/.u-upload.data-v-0d33af60 {
		width: 220rpx !important;
	}

	body {
		background-color: #F0F1F1;
	}

	.feedback {
		margin-top: 20rpx;

		.feedback-top {
			width: 100%;
			background-color: #FFFFFF;
			padding: 30rpx;
			padding-bottom: 100rpx;

			>text:nth-child(1) {
				font-size: 30rpx;
				color: #333333;
				margin-bottom: 40rpx;
			}
		}

		.feedback-upload {
			width: 100%;
			margin-top: 20rpx;
			background-color: #FFF;
			padding: 30rpx;
			padding-bottom: 100rpx;

			>view:nth-child(1) {
				margin-bottom: 20rpx;

				>text:nth-child(1) {
					margin-right: 20rpx;
					font-size: 30rpx;
					color: #333333;
				}

				>text:nth-child(2) {
					font-size: 24rpx;
					color: #999999;
				}
			}

			>view:nth-child(2) {
				width: 120rpx;

				.upload {
					width: 100%;
					height: 100%;
				}
			}
		}

		.feedback-footer {
			width: 100%;
			height: 260rpx;
			background-color: #FFFFFF;
			padding: 30rpx;
			margin-top: 20rpx;

			>text:nth-child(1) {
				font-size: 30rpx;
				color: #333333;
				margin-bottom: 40rpx;
			}
		}

		.submit {
			width: 690rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			margin: 0 auto;
			margin-top: 120rpx;
			color: #FFFFFF;
			background-color: #FF7C4C;
			border-radius: 15rpx;
		}
	}
</style>
