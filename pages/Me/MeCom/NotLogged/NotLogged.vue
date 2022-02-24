<template>
	<view class="notLogged">
		<button v-if="flag" open-type="getUserInfo " @click="getUser" type="primary" plain>授权登录</button>
		<button v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" type="primary" plain>授权登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: '',
				nickname:'',
				flag:true
			}
		},
		onLoad() {
			this.code = uni.getStorageSync('code')
		},
		methods: {
			getPhoneNumber(e) {
				console.log(e, '手机')
					uni.request({
						url: this.BaseUrl + '/single/login/wechat',
						data: {
							nickname:this.nickname,
							encryptedData:e.detail.encryptedData?e.detail.encryptedData:'',
							iv: e.detail.iv?e.detail.iv:'',
							code: uni.getStorageSync('code')
						},
						method: 'POST',
						header: {
							'MiniId': 1,
							'token': '',
						},
						success: (res) => {
							console.log(res,'user')
							uni.setStorageSync('userInfo',res.data.data.userinfo)
							uni.setStorageSync('token',res.data.data.userinfo.token)
							uni.navigateBack({
								delta:-1
							})
						}
					})
			},
			getUser(e) {
				wx.getUserProfile({
					desc: '登录',
					success: (ress) => {
						console.log(ress)
						this.nickname = ress.userInfo.nickName
						this.flag = !this.flag
					},
					
				})
			}
		}
	}
</script>

<style lang="scss" >
	.notLogged{
		height: 100vh;
		overflow: hidden;
	}
	button{
		width: 690rpx;
		margin-top: 120rpx;
	}
</style>
