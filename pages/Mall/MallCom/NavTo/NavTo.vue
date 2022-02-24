<template>
	<view>
		<web-view :src="link" bindmessage="getMessage"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 link: ""
			}
		},
		onLoad() {
			this.getUrl()
		},
		methods: {
			getUrl(){
				this.$u.post('/single/index/getWaiUrl').then(res => {
					console.log(res,'url')
					this.link = res.data +'?token='+uni.getStorageSync('token')+'&userinfo=' +JSON.stringify(uni.getStorageSync('userInfo'))
					console.log(this.link)
				})
			},
		}
	}
</script>

<style>

</style>
