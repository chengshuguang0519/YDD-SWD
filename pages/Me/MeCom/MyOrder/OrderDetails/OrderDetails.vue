<template>
	<view class="order-details">
		<view class="details-top">
			<image src="../../../../../static/image/meImg/myOrderImg/orderDetailsImg/address.png"></image>
			<view>
				<view>
					<text>{{itemList.list[0].express_name}}</text>
					<text>{{itemList.list[0].express_phone}}</text>
				</view>
				<view>{{fullAddress}}</view>
			</view>
		</view>
		<view class="details-content">
			<view class="details-item" v-for="(item,index) in itemList.list" :key='index'>
				<view>
					<image :src="item.goods_logo"></image>
				</view>
				<view>
					<view :class="itemList.order_type ==1?'special':'' ">
						<text>{{item.goods_title}}</text>
						<text>{{item.goods_spec}}</text>
					</view>
					<view v-if="itemList.order_type != 1" >
						<text>￥{{item.price}}</text>
						<text>x{{item.number}}</text>
					</view>
					
				</view>
				
			</view>
			
<!-- 			<view class="content-item">
				<text>配送方式</text>
				<text>普通配送</text>
			</view> -->
			<view class="content-item">
				<text>运 费</text>
				<text>￥{{itemList.price_express}}</text>
			</view>
			<view class="content-item">
				<text>订单备注</text>
				<text v-if="itemList.list[0].order_desc">{{itemList.list[0].order_desc}}</text>
				<text v-else>暂无备注信息</text>
			</view>
			<view class="content-item">
				<text>订单总价</text>
				<text>￥{{itemList.price_total}}</text>
			</view>
		</view>
		<view class="details-footer">
			<view class="footer-item">
				<text>订单编号：</text>
				<text>{{itemList.order_sn}}</text>
			</view>
			<view class="footer-item">
				<text>下单时间：</text>
				<text>{{itemList.create_time}}</text>	
			</view>
		</view>
		<view class="details-order">
			<!-- 待付款 -->
			<view v-if="itemList.status_msg == '待付款'">
				<text v-for="(item,index) in daifukuanList" :key=index 
				:class="currentIndex == index? 'active':'' "
				@click="itemChange(index,item)">{{item}}</text>
			</view>
			<!-- 待发货 -->
			<view v-else-if="itemList.status_msg == '待发货'">
				<text v-for="(item,index) in daifahuoList" :key='index'
				:class="currentIndex == index? 'active':'' "
				@click="itemChange(index,item)">{{item}}</text>
			</view>
			<!-- 待收货 -->
			<view v-else-if="itemList.status_msg == '待收货'">
				<text v-for="(item,index) in daishouhuoList" :key='index'
				:class="currentIndex == index? 'active':'' "
				@click="itemChange(index,item)">{{item}}</text>
			</view>
			<!-- 待评价 -->
			<view v-else-if="itemList.status_msg == '待评论'">
				<text v-for="(item,index) in daipinglunList" :key='index'
				:class="currentIndex == index? 'active':'' "
				@click="itemChange(index,item)">{{item}}</text>
			</view>
			<view v-else>
				<text class="active" v-for="(item,index) in quxiaoList" :key='index'
				:class="currentIndex == index? 'active':'' "
				@click="itemChange(index,item)"
				>{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'1',
				id:0,
				order_sn:'',
				itemIndex:'',
				itemList:[],
				currentIndex:1,
				daifukuanList:['取消订单','去支付'],
				daifahuoList:['联系客服','催发货'],
				daishouhuoList:['再次购买','查看物流','确认收货'],
				daipinglunList:['再次购买','去评价'],
				quxiaoList:['联系客服']
			}
		},
		onLoad(option) {
			console.log(option)
			this.itemIndex = option.index
			this.itemList = JSON.parse(option.data)
			this.id = this.itemList.id
			this.order_sn = this.itemList.order_sn
			console.log(this.order_sn,'itemList')	
		},
		onReady() {
			if(this.itemIndex==1){
				this.currentIndex = this.daifukuanList.length-1
			}else if(this.itemIndex == 2){
				this.currentIndex =this.daifahuoList.length-1
			}else if(this.itemIndex ==3){
				this.currentIndex =this.daishouhuoList.length-1
			}else if(this.itemIndex ==4){
				this.currentIndex =this.daipinglunList.length-1
			}
			console.log(this.currentIndex,'currentindex')
		},
		computed:{
			fullAddress(){
				return this.itemList.list[0].express_province + this.itemList.list[0].express_city + this.itemList.list[0].express_area + this.itemList.list[0].express_address
			}
		},
		methods: {
			//根据底部标签跳转
			itemChange(index,item){	
				this.currentIndex = index
				console.log(index,item)
				if(item =='取消订单'){
					this.$u.post('/single/order/cancel_order',{
						id:this.id
					}).then(res => {
						if(res.code == 200){
							uni.showToast({
								title:'取消订单成功'
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:-1
								})
							},1500)
						}else {
							uni.showToast({
								title:res.message,
								icon:'none'
							})
						}
					})
				}else if(item == '去支付'){
					console.log(this.itemList)
					if(this.itemList.pay_type == 1){
						this.$u.post('/single/pay/do_action', {
							pay_type: this.itemList.pay_type,
							orderid: this.itemList.id
						}).then(res => {
							if (res.code !== 200) {
								uni.showToast({
									title: res.message,
									icon: 'none',
									duration: 3000
								})
							} else {
								uni.showToast({
									title: '支付成功',
									duration: 3000
								})
								setTimeout(()=>{
									uni.navigateTo({
										url: '../paySuccess/paySuccess'
									})
								},1500)
							}
						})
					}else{
						this.$u.post('/single/pay/do_action', {
							pay_type: this.itemList.pay_type,
							orderid: this.itemList.id
						}).then(res => {
							wx.requestPayment({
								timeStamp: res.data.timeStamp,
								nonceStr: res.data.nonceStr,
								package: res.data.package,
								signType: res.data.signType,
								paySign: res.data.paySign,
								success: (ress) => {
									wx.showToast({
										title: '支付成功',
										duration: 1500
									})
									setTimeout(()=>{
										uni.navigateTo({
											url: '../paySuccess/paySuccess'
										})
									},1500)
								}
							})
						})			
					}			
				}else if(item == '催发货'){
					this.$u.post('/single/order/deliver_goods',{
						id:this.id
					}).then(res => {
						console.log(res)
						if(res.code == 200){
							uni.showToast({
								title:'催发货成功'
							})
						}else {
							uni.showToast({
								title:'您已催货过,商家正在火速备货~',
								icon:'none'
							})
						}
					})
				}else if(item == '联系客服'){
					wx.openCustomerServiceChat({
						extInfo:{
							url:'https://work.weixin.qq.com/kfid/kfce91f2a1ff96e790f'
						},
						corpId:'ww3227c3ab52583dfb',
						success:(res)=>{
							console.log(res)
						}
					})
				}else if(item =='再次购买'){
					console.log(this.itemList.order_type,'111222')
					if(this.itemList.order_type =='0'){
						uni.switchTab({
							url:'/pages/index/index'
						})
					}else{
						uni.switchTab({
							url:'/pages/SpecialEdition/SpecialEdition'
						})
					}
				}else if(item =='确认收货'){
					this.$u.post('/single/order/confirm_order', {
						id: this.itemList.id
					}).then(res => {
						console.log(res)
						if (res.code == 200) {
							uni.showToast({
								title: '确认收货成功',
								duration:3000
							})
							setTimeout(()=>{
								uni.navigateTo({
									url:'../MyOrder'
								})
							},1500)
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
						}
					})
				}else if(item == '查看物流'){
					uni.navigateTo({
						url:'../lookLogistics/lookLogistics?order_sn='+this.order_sn
					})
				}else if(item == '去评价'){
					uni.navigateTo({
						url:'../MakeComment/MakeComment'
					})
				}
			}

		}
	}
</script>

<style lang="scss" >
	body{
		// height: ;
		background-color: #F0F1F1;
	}
	.special{
		width: 510rpx!important;
		text{
			width: 510rpx!important;
		}
	}
	.active{
		border-color: #FF7C4C!important;
		color: #FF7C4C!important;
	}
	.order-details{
		border-top: 20rpx solid #F0F1F1;
		.details-top{
			display: flex;
			align-items: center;
			background-color: #FFFFFF;
			border-bottom:20rpx solid #F0F1F1 ;
			padding-bottom: 34rpx;
			>image:nth-child(1){
				width: 60rpx;
				height: 60rpx;
				margin: 0 26rpx 0 30rpx;
			}
			>view:nth-child(2){
				display: flex;
				flex-direction: column;
				margin-top: 15rpx;
				>view:nth-child(1){
					display: flex;
					font-size: 30rpx;
					margin-bottom: 11rpx;
					color: #333333;
					>text:nth-child(1){
						margin-right: 60rpx;
					}
				}
				>view:nth-child(2){
					width: 604rpx;
					font-size: 30rpx;
					color: #333333;
					margin-right: 32rpx;
				
				}
			}
		}
		.details-content{
			width: 100%;
			background-color: #FFF;
			border-bottom: 20rpx solid #F0F1F1;
			padding: 26rpx 28rpx 58rpx 30rpx;
		
			.details-item{
				display: flex;
				margin-bottom: 62rpx;
				>view:nth-child(1){
					width: 130rpx;
					height: 158rpx;
					margin-right: 38rpx;
					image{
						width: 158rpx;
						height: 158rpx;
						margin-top: 5rpx;
						
					}
				}
				>view:nth-child(2){
					flex: 0.8;
					display: flex;
					margin-left: 12rpx;
					view{
						display: flex;
						flex-direction: column;
						margin-bottom: -30rpx;
					}
					>view:nth-child(1){
						margin-right: 18rpx;
						>text:nth-child(1){
							width: 355rpx;
							font-size: 30rpx;
							color: #333333;
							margin-bottom: 5rpx;
						}
						>text:nth-child(2){
							width: 355rpx;
							font-size: 24rpx;
							color: #666666;

						}
					}
					>view:nth-child(2){
						width: 170rpx;
						// margin-left: 20rpx;
						text-align: center;
						>text:nth-child(1){
							font-size: 36rpx;
							color: #333333;
							margin-top: 10rpx;
						}
						>text:nth-child(2){
							font-size: 24rpx;
							color: #666666;
							// margin-left: 60rpx;
						}
					}
				}
			}
			.content-item{
				display: flex;
				justify-content: space-between;
				margin-bottom: 55rpx;
				>text:nth-child(1){
					font-size: 30rpx;
					color: #999999;
					white-space: nowrap;
					margin-right: 30rpx;
				}
				>text:nth-child(2){

					font-size: 30rpx;
					color: #333333;
				}
			}
		}
		.details-footer{
			width: 100%;
			height: 182rpx;
			background-color: #FFF;
			padding: 32rpx 28rpx 32rpx 30rpx;
			margin-bottom: 200rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.footer-item{
				>text:nth-child(1){
					font-size: 30rpx;
					color: #999999;
				}
				>text:nth-child(2){
					font-size: 30rpx;
					color: #333333;
				}
			}
		}
		.details-order{
			position: fixed;			
			bottom: 0;
			width: 100%;
			height: 124rpx;
			background-color: #FFF;
			padding: 32rpx 28rpx 32rpx 30rpx;
			view{
				display: flex;
				justify-content: flex-end;
				align-items: center;
				text{
					width: 180rpx;
					height: 60rpx;
					line-height: 60rpx;
					text-align: center;
					border: 1px solid #F0F1F1;
					border-radius: 30rpx;
					color: #999999;
					margin-left: 22rpx;
				}
			}
		}
	}
</style>
