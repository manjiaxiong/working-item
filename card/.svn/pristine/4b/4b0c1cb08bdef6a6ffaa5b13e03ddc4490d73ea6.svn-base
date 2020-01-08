<template>
	<view>
		<view class="all display_row">
			<view class="recovery display_row" @click="recovery">
				<image src="../../static/images/tabbar/header.png" mode=""></image>
				<text>回收说明</text>
			</view>
			<view class="service display_row" @click="service">
				<image src="../../static/images/tabbar/header.png" mode=""></image>
				<text>服务协议</text>
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
			recovery() {
				uni.navigateTo({
					url: '../recovery/recovery'
				});
			},
			service() {
				uni.navigateTo({
					url: '../service/service'
				});
			}
		}
	}
</script>

<style>
	.all {
		width: 100%;
		justify-content: space-between;
	}
	
	.recovery,
	.service {
		padding: 40upx 40upx;
		font-size: 36upx;
	}
	
	uni-image {
	    width: 40upx !important;
	}
	
	.recovery image,
	.service image {
		height: 40upx;
		border-radius: 50%;
		margin-right: 20upx;
	}
</style>
