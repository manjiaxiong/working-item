<template>
	<view>
		<view class="all display_column">
			<text class="bule text">你好</text>
			<hr>
			<view class="display_row middle">
				<text class="ccc">欢迎选择我们</text>
				<text class="black">柠檬礼品卡</text>
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
			
		}
	}
</script>

<style>
	.all {
		width: 100%;
		height: 100%;
	}
	
	hr {
		width: 90%;
		height: 2upx;
	}
	
	.text {
		font-size: 44upx;
		padding: 20upx 0;
	}
	
	.middle {
		padding: 40upx;
		width: 90%;
		font-size: 36upx;
		align-items: stretch !important;
		justify-content: space-between;
	}
	
	.middle text:nth-child(2) {
		font-size: 32upx;
		margin-top: 100upx;
	}
</style>
