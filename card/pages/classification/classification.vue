<template>
	<view>
		<view class="all display_column">
			<view class="top display_row">
				<text v-for="(item, index) in titleList" :key="index" :class="index == index_ ? 'click_red' : ''" @click="_index(index)">{{ item.name }}</text>
			</view>
			<view class="middle display_column">
				<view class="m_item display_row" v-for="(item, index) in wrapList_" :key="index" @click="go_card(item.url,item.name)">
					<view class="m_item_1 display_row">
						<image class="imgs" :src="item.url" mode=""></image>
						<view class="m_item_text display_column">
							<text style="margin-bottom: 20upx;">{{ item.name }}</text>
							<text class="red">{{ item.discount }}</text>
						</view>
					</view>
					<image class="imgs_" src="../../static/images/tabbar/jiantou_.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index_: 0,
				wrapList_: [
					{name: '石化加油卡',url: '../../static/images/tabbar/wrap_1.png',discount: '0.97折'},
					{name: '电信卡',url: '../../static/images/tabbar/wrap_2.png',discount: '0.95折'},
					{name: '京东e卡',url: '../../static/images/tabbar/wrap_3.png',discount: '0.87折'},
					{name: '沃尔玛',url: '../../static/images/tabbar/wrap_4.png',discount: '0.69折'},
					{name: '百联ok卡',url: '../../static/images/tabbar/wrap_5.png',discount: '0.77折'},
					{name: '中欣卡(易付卡)',url: '../../static/images/tabbar/wrap_6.png',discount: '0.92折'}
				],
				titleList: [
					{name: '加油卡'},
					{name: '话费卡'},
					{name: '游戏卡'},
					{name: '商超卡'}
				]
			}
		},
		methods: {
			_index(index) {
				this.index_ = index
			},
			go_card(url,name) {
				//后期需要回显，需要传很多值   这是卡种里面的数据，别放错了！！！！！
				uni.setStorageSync('name',name)   //卡类的名称，没有数据，暂时这样显示，证明逻辑是可以走通的
				uni.setStorageSync('url',url)
				uni.switchTab({
					url: '../card/card'
				});
			}
		}
	}
</script>

<style>
	.all {
		width: 100%;
	}
	
	.click_red {
		background-color: #F18F02;
		color: #fff !important;
		font-size: 36upx !important;
	}
	
	.top {
		width: 90%;
		justify-content: space-between;
		font-size: 32upx;
		color: #666666;
	}
	
	.top text {
		padding: 10upx 26upx;
		border-radius: 40upx;
	}
	
	.middle {
		margin-top: 20upx;
		width: 90%;
		height: 100%;
	}
	
	.m_item {
		margin-top: 20upx;
		width: 100%;
		border: 1px solid #C0C0C0;
		justify-content: space-between;
		height: 180upx;
		-moz-box-shadow:4upx 4upx 10upx #333333;
		-webkit-box-shadow:4upx 4upx 10upx #333333;
		box-shadow:4upx 4upx 10upx #333333;
	}
	
	.m_item_text text {
		font-size: 36upx;
	}
	
	.m_item_text {
		align-items: flex-start;
	}
	
	.imgs {
		width: 100upx !important;
		height: 100upx;
		border-radius: 50%;
		margin-left: 40upx;
		margin-right: 40upx;
	}
	
	.imgs_ {
		width: 36upx !important;
		height: 46upx;
		margin-right: 30upx;
	}
</style>
