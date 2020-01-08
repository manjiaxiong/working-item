<template>
	<view>
		<view class="all display_column">
			<view class="top display_row">
				<text :class="index==1 ? 'click_red' : ''" @click="index_1">全部</text>
				<text :class="index==2 ? 'click_red' : ''" @click="index_2">交易成功</text>
				<text :class="index==3 ? 'click_red' : ''" @click="index_3">交易失败</text>
				<text :class="index==4 ? 'click_red' : ''" @click="index_4">待处理</text>
			</view>
			<view class="middle">
				<view class="no display_column" v-show="isShow">
					<image src="../../static/images/tabbar/zanwushuju.png" mode=""></image>
					<text class="ccc">暂无数据</text>
				</view>
				
				<!-- 有数据 -->
				<view class="yes" v-show="!isShow">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 1,
				isShow: true
			}
		},
		methods: {
			index_1() {
				this.index = 1
			},
			index_2() {
				this.index = 2
			},
			index_3() {
				this.index = 3
			},
			index_4() {
				this.index = 4
			},
		}
	}
</script>

<style>
	.all {
		width: 100%;
	}
	
	.click_red {
		border-bottom: 1px solid #4D95E5 !important;
	}
	
	.top {
		width: 90%;
		justify-content: space-between;
		font-size: 36upx;
	}
	
	.top text {
		padding: 10upx 20upx;
		border-bottom: 1px solid #fff;
	}
	
	.middle {
		width: 100%;
	}
	
	.no {
		margin-top: 60upx;
		width: 100%;
	}
	
	.no image {
		width: 100%;
		height: 500upx;
	}
	
	.no text {
		font-size: 36upx;
		letter-spacing: 2px;
	}
</style>
