<template>
	<view>
		<view class="uni-padding-wrap" style="width: 100%;">
			<view class="page-section swiper" style="width: 100%;">
				<view class="page-section-spacing" style="width: 100%;">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" style="width: 100%;">
						<swiper-item v-for="(item, index) in imgList" :key="index" style="width: 100%;">
							<view class="swiper-item uni-bg-red" style="width: 100%;">
								<image :src="item.url" mode="" style="width: 100%;"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="middle display_column">
			<view class="m_item display_row">
				<text>——</text>
				<text>专业礼品卡回收服务</text>
				<text>——</text>
			</view>
			<view class="wrap display_row">
				<view class="display_column" v-for="(item, index) in wrapList" :key="index" @click="go_card(item.url,item.name)">
					<image :src="item.url" mode=""></image>
					<text>{{ item.name }}</text>
				</view>
			</view>
			<view class="uni-padding-wrap" style="width: 100%;height: 120upx;position: relative;">
				<view class="page-section swiper" style="width: 100%;height: 120upx;">
					<view class="page-section-spacing" style="width: 100%;height: 120upx;">
						<swiper class="swiper" :autoplay="autoplay" vertical='true' style="width: 100%;height: 120upx;">
							<swiper-item v-for="(item, index) in textList" :key="index" style="width: 100%;height: 120upx;">
								<view class="swiper-item uni-bg-red center_" style="width: 100%;height: 120upx;">
									<text>{{ item.name }}</text>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
				<view class="_position display_row">
					<text class="p_text">公告</text>
					<image class="imgs" src="../../static/images/tabbar/laba.png" mode=""></image>
				</view>
			</view>
			<view class="tail display_column">
				<text class="text_tail">热门回收</text>
				<view class="tail_wrap display_row">
					<view class="tail_item display_column" v-for="(item, index) in wrapList_" :key="index" @click="go_card_(item.name,item.discount)">
						<image :src="item.url" mode=""></image>
						<view class="t_item display_column">
							<text style="color: #666666;margin-bottom: 10upx;">{{ item.name }}</text>
							<text class="red">{{ item.discount }}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="position_" @click="artificial"><image src="../../static/images/tabbar/kefu.png" mode=""></image></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				imgList: [
					{url: '../../static/images/lunbo/1.jpg'},
					{url: '../../static/images/lunbo/2.jpg'},
					{url: '../../static/images/lunbo/3.jpg'},
					{url: '../../static/images/lunbo/4.jpg'},
					{url: '../../static/images/lunbo/5.jpg'}
				],
				wrapList: [
					{name: '加油卡',url: '../../static/images/tabbar/wrap_1.png'},
					{name: '话费卡',url: '../../static/images/tabbar/wrap_4.png'},
					{name: '游戏卡',url: '../../static/images/tabbar/wrap_6.png'},
					{name: '商超卡',url: '../../static/images/tabbar/wrap_2.png'},
					{name: '电商卡',url: '../../static/images/tabbar/wrap_5.png'},
					{name: '美食/视频卡',url: '../../static/images/tabbar/wrap_3.png'}
				],
				wrapList_: [
					{name: '石化加油卡',url: '../../static/images/cardImgs/image_1.jpg',discount: '0.97折'},
					{name: '电信卡',url: '../../static/images/cardImgs/image_2.jpg',discount: '0.95折'},
					{name: '京东e卡',url: '../../static/images/cardImgs/image_3.jpg',discount: '0.87折'},
					{name: '沃尔玛',url: '../../static/images/cardImgs/image_4.jpg',discount: '0.69折'},
					{name: '百联ok卡',url: '../../static/images/cardImgs/image_5.jpg',discount: '0.77折'},
					{name: '中欣卡(易付卡)',url: '../../static/images/cardImgs/image_6.jpg',discount: '0.92折'}
				],
				textList: [
					{name: '我是广告啊'},
					{name: '看不到我吧'},
					{name: '我是广告啊'},
					{name: '看不到我吧'},
					{name: '我是广告快点奥奥'},
					{name: '看不到我吧哈哈哈'},
				]
			}
		},
		onShow(){
			// console.log("this.url:::::",this.url)//此时的this.url已经在main.js中定义
			uni.request({
				url: this.url + '/mobile/indexData',
				method:'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded' ,// 默认值
					'token': this.userId
				},
				data:{
					type:2
				},
				success: (res) => {
					console.log(res);
				}
			})
		},
		onLoad() {
			console.log(this.userId)
			uni.request({
				url: this.url + '/applet/refreshToken',//后台接口
				method:'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded', 
				},
				data:{
					userId:this.userId
				},
				success: (res) => {
					console.log(res);
					uni.setStorageSync('token',res.data.data)
				}
			})
		},
		methods: {
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			},
			go_card(url,name) {
				uni.setStorageSync('name',name)
				uni.setStorageSync('url',url)
				uni.switchTab({
					url: '../card/card'
				});
			},
			go_card_(name,discount) {
				uni.setStorageSync('name_card',name)
				uni.setStorageSync('discount',discount)
				uni.switchTab({
					url: '../card/card'
				});
			},
			artificial() {
				// 
				uni.makePhoneCall({
				 	
				 	// 手机号
				    phoneNumber: '12345678900', 
				
					// 成功回调
					success: (res) => {
						console.log('调用成功!')	
					},
				
					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}
					
				  });
			}
		},
		created() {
			
		}
	}
</script>

<style>
	uni-image {
		width: 100% !important;
	}
	
	.swiper-item {
		width: 100%;
	}
	
	.middle {
		position: relative;
		width: 100%;
	}
	
	.m_item {
		margin-top: 40upx;
	}
	
	.m_item text:nth-child(2) {
		padding: 0 20upx;
		font-size: 38upx;
		font-weight: 600;
		letter-spacing: 2px;
		color: #666666;
	}
	
	.wrap {
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.wrap view {
		width: 28%;
		margin: 5% 2%;
		color: #666666;
		font-size: 32upx;
	}
	
	.wrap image {
		width: 120upx !important;
		height: 120upx;
		margin-bottom: 20upx;
		border-radius: 50%;
	}
	
	.text_tail {
		margin-top: 20upx;
		font-size: 40upx;
		margin-bottom: 30upx;
	}
	
	.tail_wrap {
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-between;
		font-size: 32upx;
	}
	
	.tail_item {
		width: 29%;
		margin: 2% 1%;
	}
	
	.tail_item image {
		width: 210upx !important;
		height: 180upx;
	}
	
	.position_ {
		position: fixed;
		width: 65upx;
		height: 70upx;
		top: 420upx;
		right: 40upx;
	}
	
	.position_ image {
		width: 100%;
		height: 100%;
	}
	
	.uni-padding-wrap {
		margin-top: 60upx;
		display: table;
		vertical-align: middle;
		text-align: center;
		/* margin-right: 150upx; */
	}
	
	._position {
		position: absolute;
		top: -14upx;
		left: 50upx;
		width: 160upx;
		height: 80upx;
	}
	
	.imgs {
		width: 20upx;
		height: 40upx;
	}
	
	.p_text {
		display: table-cell;
		width: 620upx;
		/* border: 1px red solid; */
		height: 60upx;
		vertical-align: middle;
		align-items: center;
	}
</style>
