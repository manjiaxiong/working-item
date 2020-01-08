<template>
	<view>
		<view class="all display_column">
			<view class="item display_column" @click="details">
				<text>你好</text>
				<text>欢迎选择我们</text>
				<text>2019年11月28日10:07:26</text>
				<view class="display_row">
					<text class="bule">查看详情</text>
					<image class="imgs_" src="../../static/images/tabbar/jiantou_.png" mode=""></image>
				</view>
			</view>
			
			<view class="item display_column"  @click="details">
				<text>联系客服</text>
				<text>客服电话:15937777999</text>
				<text>2019年11月28日10:07:26</text>
				<view class="display_row">
					<text class="bule">查看详情</text>
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
				
			}
		},
		methods: {
			details() {
				uni.navigateTo({
					url: '../details/details'
				});
			}
		}
	}
</script>

<style>
	.all {
		width: 100%;
		height: 100%;
		padding: 20upx 40upx;
	}
	
	.item {
		width: 100%;
		height: 100%;
		align-items: stretch;
		margin: 20upx 0;
	}
	
	.item text {
		padding: 20upx 0;
	}
	
	.item view {
		width: 90%;
		justify-content: space-between;
	}
	
	.imgs_ {
		width: 20upx !important;
		height: 30upx;
		margin-right: 30upx;
	}
</style>
