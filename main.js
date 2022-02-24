import Vue from 'vue'
import App from './App'

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);


//接口的baseUrl，可使用this.BaseUrl进行调用
Vue.prototype.BaseUrl = 'https://admin.yin10000.com'

Vue.config.productionTip = false



App.mpType = 'app'
const app = new Vue({
	...App
})

import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);


app.$mount()
