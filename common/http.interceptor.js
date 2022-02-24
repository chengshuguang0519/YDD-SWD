const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: 'https://admin.yin10000.com',
		header: {
			'MiniId': 1,
			'token': '',
			// "MiniToken":'eb05fe89442105d077c83d637bc6dbfe'
		},
		originalData: true,
	});
	// 请求拦截，配置Token等参数
	Vue.prototype.$u.http.interceptor.request = (config) => {
		const token = uni.getStorageSync('userInfo');
		config.header.MiniId = 1
		if (token) {
			config.header.token = token.token;
		}
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.data.code == 4000) {
			uni.login({
				success: (res) => {
					console.log(res.code)
					uni.setStorageSync('code',res.code)
					}
				})
			
			uni.navigateTo({
				url: '/pages/Me/MeCom/NotLogged/NotLogged'
			})
			// });
			return res.data;
		}
       if(res.statusCode == 200) {
			// 如果把originalData设置为了true，这里return回什么，this.$u.post的then回调中就会得到什么
			return res.data;  
		} else{
			return false;
		}
	}
}
export default {
	install
}
