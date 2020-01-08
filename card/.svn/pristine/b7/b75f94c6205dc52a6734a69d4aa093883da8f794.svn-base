<template>
	<view>
		<view class="all display_column">
			<view class="top display_column">
				<text class="bule">打款账户</text>
				<image src="../../static/images/tabbar/images.jpg" mode=""></image>
				<text>温馨提示</text>
				<text class="ccc">请输入支付宝账号进行认证,作为转账账号</text>
			</view>
			<view class="middle display_column">
				<view class="display_row">
					<text>姓名:</text>
					<input class="ccc" type="text" v-model="name" placeholder="请输入姓名" />
				</view>
				<view class="display_row">
					<text>账号:</text>
					<input class="ccc" type="text" v-model="account" placeholder="请输入账号" />
				</view>
			</view>
			<view class="tail btn display_column" @click="submit">
				<text>提交</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				account: ''
			}
		},
		methods: {
			submit() {
				if(this.name == '') {
					uni.showModal({
					    title: '提示',
					    content: '用户名不能为空',
					});
					return false
				}else if(this.account == '') {
					uni.showModal({
					    title: '提示',
					    content: '卡号不能为空',
					});
					return false
				}else {
					//提交成功
					uni.navigateBack({
						delta: 1
					});
				}
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
		letter-spacing: 4upx;
	}
	
	.top text:nth-child(1) {
		font-size: 42upx;
	}
	
	.top image {
		margin: 50upx 0;
		width: 200upx;
		height: 200upx;
		border-radius: 50%;
	}
	
	.top text:nth-child(4) {
		margin-top: 50upx;
		font-size: 32upx;
	}
	
	.middle {
		width: 100%;
		align-items: stretch;
		margin-top: 120upx;
	}
	
	.middle view {
		margin: 20upx;
	}
	
	.middle input {
		width: 540upx;
		height: 80upx;
		line-height: 80upx;
		border-radius: 20upx;
		padding-left: 20upx;
	}
	
	.tail {
		width: 80%;
		margin-top: 200upx;
		justify-content: center;
/* 		width: 620upx; */
		height: 100upx;
		background-color: #4D95E5;
	}
</style>
