<template>
	<view>
		<view class="all display_column">
			<view class="top display_column">
				<input type="text" placeholder="输入标题" v-model="title"/>
				<textarea v-model="textarea" placeholder="请详细描述你的建议或者意见反馈" />
				<view class="phone display_row">
					<text>联系方式</text>
					<input type="text" placeholder="请输入手机号" v-model="phone" />
				</view>
			</view>
			<view class="btn tail display_row" @click="submit">
				<text>提交意见</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				textarea: '',
				phone: ''
			}
		},
		methods: {
			submit() {
				if(this.phone == '') {
					uni.showModal({
					    title: '提示',
					    content: '联系人不能为空',
					});
					return false
					
				}else if(!((/^1[34578]\d{9}$/).test(this.phone))){
					uni.showModal({
					    title: '提示',
					    content: '手机号码错误',
					});
					return false
				}else {
					//ajax请求
					return true
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
		align-items: stretch;
		padding-left: 40upx;
		width: 100%;
	}
	
	.top input {
		width: 300upx;
		height: 80upx;
		border-radius: 20upx;
		padding-left: 20upx;
		margin: 10upx 0;
		/* border: 1px red solid; */
	}
	
	.tail {
		width: 70%;
		height: 100upx;
		line-height: 100upx;
		background-color: #007AFF;
		justify-content: center;
		margin-top: 180upx;
	}
</style>
