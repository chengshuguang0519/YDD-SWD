<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			var obj = wx.getLaunchOptionsSync()
			console.log('启动小程序的路径:', obj.path)
			console.log('启动小程序的场景值:', obj.scene)
			console.log('启动小程序的 query 参数:', obj.query)
			uni.setStorageSync('pid',obj.query.scene)
		},
		onShow: function() {
			wx.getUserProfile({
				success: (res) => {
					console.log(res,'app')
				}
			})
		},
		onHide: function() {
			console.log('App Hide')
		},
		 globalData: {
		 //全局数据管理
		 navBarHeight: 0, // 导航栏高度
		 menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
		 menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
		 menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
		 },
	}
	
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	
</style>
