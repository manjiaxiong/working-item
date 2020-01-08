<template>
	<view>
		<view class="all display_column">
			<view class="top display_column">
				<view class="m_item display_row">
					<view class="m_item_1 display_row">
						<image class="imgs" src="../../static/images/tabbar/images.jpg" mode=""></image>
						<view class="m_item_text display_column">
							<text style="margin-bottom: 20upx;">昵称</text>
							<text>欢迎使用</text>
						</view>
					</view>
					<image class="imgs_" src="../../static/images/tabbar/fanhui.png" mode=""></image>
				</view>
			</view>
			<view class="tail display_column">
				<view class="tail_item display_row">
					<view class="t_item display_column" @click="go_submit">
						<image src="../../static/images/tabbar/my_img_1.png" mode=""></image>
						<text>打款账户</text>
					</view>
					<view class="t_item display_column" @click="go_transaction">
						<image src="../../static/images/tabbar/my_img_2.png" mode=""></image>
						<text>交易记录</text>
					</view>
					<view class="t_item display_column" @click="go_cooperation">
						<image src="../../static/images/tabbar/my_img_3.png" mode=""></image>
						<text>招商合作</text>
					</view>
					<view class="t_item display_column" @click="go_help">
						<image src="../../static/images/tabbar/my_img_4.png" mode=""></image>
						<text>帮助中心</text>
					</view>
					<view class="t_item display_column" @click="go_notice">
						<image src="../../static/images/tabbar/my_img_5.png" mode=""></image>
						<text>公告</text>
					</view>
					<view class="t_item display_column" @click="go_opinion">
						<image src="../../static/images/tabbar/my_img_6.png" mode=""></image>
						<text>建议反馈</text>
					</view>
					<view class="t_item display_column">
						<image src="../../static/images/tabbar/my_img_7.png" mode=""></image>
						<text>联系客服</text>
					</view>
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
			go_submit() {
				uni.navigateTo({
					url: '../submit/submit'
				});
			},
			go_transaction() {
				uni.navigateTo({
					url: '../transaction/transaction'
				});
			},
			go_cooperation() {
				uni.navigateTo({
					url: '../cooperation/cooperation'
				});
			},
			go_help() {
				uni.navigateTo({
					url: '../help/help'
				});
			},
			go_notice() {
				uni.navigateTo({
					url: '../notice/notice'
				});
			},
			go_opinion() {
				uni.navigateTo({
					url: '../opinion/opinion'
				});
			}
		}
	}
</script>

<style>
	.all {
		width: 100%;
	}
	
	.top {
		width: 100%;
		height: 320upx;
		background-image: url('http://lipinka.dingyuankeji.shop/test_/background.png');
	}
	
	.imgs {
		width: 160upx !important;
		height: 160upx;
		border-radius: 50%;
		margin-left: 40upx;
		margin-right: 40upx;
	}
	
	.imgs_ {
		width: 36upx !important;
		height: 46upx;
		margin-right: 30upx;
		transform:rotate(180deg);
	}
	
	.m_item {
		margin-top: 40upx;
		width: 100%;
		justify-content: space-between;
		height: 180upx;
		color: #fff;
	}
	
	.m_item_text text {
		font-size: 36upx;
	}
	
	.m_item_text {
		align-items: flex-start;
	}
	
	.tail {
		margin-top: 40upx;
		width: 98%;
	}
	
	.tail_item {
		width: 100%;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.t_item {
		width: 29%;
		margin: 5% 2%;
	}
	
	.t_item image {
		width: 78upx !important;
		height: 78upx;
		margin-bottom: 20upx;
		/* border-radius: 50%; */
	}
</style>
