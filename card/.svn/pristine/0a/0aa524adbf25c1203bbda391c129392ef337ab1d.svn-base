<template>
	<view>
		<view class="all display_column">
			<view class="top display_column">
				<view class="t_1 display_row" @click="t_p_1">
					<view class="t_item_1 display_row">
						<text class="ccc">卡类</text>
						<text class="bax">{{ p_1_name }}</text>
					</view>
					<view class="t_item_2 display_row">
						<image class="imgs" :src="p_1_url" mode=""></image>
						<image class="imgs_" src="../../static/images/tabbar/jiantou_.png" mode=""></image>
					</view>
				</view>
				
				<view class="t_1 display_row" @click="t_p_2">
					<view class="t_item_1 display_row">
						<text class="ccc">卡种</text>
						<text class="bax">{{ p_2_name }}</text>
						<text class="red smail">{{ p_2_discount }}</text>
					</view>
					<view class="t_item_2 display_row">
						<image class="imgs_" src="../../static/images/tabbar/jiantou_.png" mode=""></image>
					</view>
				</view>
				
				<view class="t_1 display_row" @click="t_p_3">
					<view class="t_item_1 display_row">
						<text class="ccc">面值</text>
						<text class="bax">{{ p_3_money }}</text>
					</view>
					<view class="t_item_2 display_row">
						<image class="imgs_" src="../../static/images/tabbar/jiantou_.png" mode=""></image>
					</view>
				</view>
				
			</view>
			<view class="middle display_column">
				<view class="m_item display_row">
					<text :class="index == 1 ? 'click_color' : ''" @click="index_1">单卡提交</text>
					<text :class="index == 2 ? 'click_color' : ''" @click="index_2">批量提交</text>
				</view>
				
				<view class="index_1" v-show="index == 1">
					<view class="m_1 ccc display_row">
						<view class="m_text display_row">
							<view>卡号</view>:
							<input type="text" value="" placeholder="请输入卡号" />
						</view>
						<image src="../../static/images/tabbar/shibie.png" mode=""></image>
					</view>
					
					<view class="m_1 ccc display_row">
						<view class="m_text display_row">
							<view>卡密</view>:
							<input type="text" value="" placeholder="请输入卡密" />
						</view>
						<image src="../../static/images/tabbar/shibie.png" mode=""></image>
					</view>
					
					<view class="m_1 ccc display_row">
						<view class="m_text display_row">
							<view>真实姓名</view>:
							<input type="text" value="" placeholder="请输入真实姓名" />
						</view>
					</view>
					
					<view class="m_1 ccc display_row">
						<view class="m_text display_row">
							<view>支付宝账号</view>:
							<input type="text" value="" placeholder="请输入支付宝账号" />
						</view>
					</view>
					
					<view class="m_2 display_row">
						<text class="red">请用扫一扫条形码,卡号要对应相同的密码,请正确选择面值</text>
					</view>
				</view>
				<view class="index_2" v-show="index == 2">
					<view class="uni-textarea">
						<textarea placeholder-style="black" placeholder="每张卡密为一行,卡号与卡密之前用','隔开"/>
					</view>
				</view>
			</view>
			<view class="tail display_column">
				<view class="tail_item display_row">
					<text class="ccc">提交即表示你以阅读并同意<text class="red">《转让协议服务条款》</text></text>
				</view>
				<view class="btn t_btn display_row" @click="confirm">
					<text>提交</text>
				</view>
			</view>
			
			<!-- p_1 -->
			<view class="position_1 display_column" v-show="p_1">
				<text class="auto_">请选择卡类型</text>
				<view class="p_1 display_row"  v-for="(item, index) in wrapList" :key="index" @click="p_1_click(item.name,item.url)">
					<image :src="item.url" mode=""></image>
					<text>{{ item.name }}</text>
				</view>
				<image class="cha" src="../../static/images/tabbar/cha.png" mode="" @click="cha_1"></image>
			</view>
			<view class="p_1_menban" v-show="menban1" @click="menban_1"></view>
			
			<!-- p_2 -->
			<view class="position_1 display_column" v-show="p_2">
				<text class="auto_">请选择卡类型</text>
				<view class="p_1 p_2 display_row">
					<view class="display_column" v-for="(item, index) in wrapList_" :key="index" @click="p_2_click(item.name,item.discount)">
						<image :src="item.url" mode=""></image>
						<text>{{ item.name }}</text>
						<text>{{ item.discount }}</text>
					</view>
				</view>
				<image class="cha" src="../../static/images/tabbar/cha.png" mode="" @click="cha_2"></image>
			</view>
			<view class="p_1_menban" v-show="menban2" @click="menban_2"></view>
			
			
			<!-- p_3 -->
			<view class="position_1 display_column" v-show="p_3">
				<text class="auto_">请选择单张面值</text>
				<view class="p_1 p_2 p_3 display_row">
					<view class="display_column" v-for="(item, index) in moneyList" :key="index" @click="p_3_click(item.money)">
						<text>{{ item.money }}</text>
						<text class="red">{{ item.discount }}</text>
						<text>{{ item.discount_money }}</text>
					</view>
				</view>
				<image class="cha" src="../../static/images/tabbar/cha.png" mode="" @click="cha_3"></image>
			</view>
			<view class="p_1_menban" v-show="menban3" @click="menban_3"></view>
			
			<!-- 提交确认 -->
			<view class="position_ display_column" v-show="p_4">
				<text class="auto_">提交确认</text>
				<view class="p_item display_column">
					<text>尊敬的客户:</text>
					<view class="display_row">
						<text>你的卡类为:</text>
						<text class="red">{{ obtain_p_1_name }}</text>
					</view>
					<view class="display_row">
						<text>你的卡种为:</text>
						<text class="red">{{ obtain_p_2_name }}</text>
					</view>
					<view class="display_row">
						<text>你的面值为:</text>
						<text class="red">{{ obtain_p_3_money }}</text>
					</view>
					<view class="display_row">
						<text>注意:</text>
						<text class="red">切记面值不符，损失自负</text>
					</view>
					<view class="display_row p_item_btn">
						<text @click="confirm_">确认提交</text>
						<text @click="return_">返回修改</text>
					</view>
					<image class="cha" src="../../static/images/tabbar/cha.png" mode="" @click="cha_4"></image>
				</view>
			</view>
			<view class="p_2_menban" v-show="menban4"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: 1,
				wrapList: [
					{name: '加油卡',url: '../../static/images/tabbar/wrap_1.png'},
					{name: '话费卡',url: '../../static/images/tabbar/wrap_4.png'},
					{name: '游戏卡',url: '../../static/images/tabbar/wrap_6.png'},
					{name: '商超卡',url: '../../static/images/tabbar/wrap_2.png'},
					{name: '电商卡',url: '../../static/images/tabbar/wrap_5.png'},
					{name: '美食/视频卡',url: '../../static/images/tabbar/wrap_3.png'},
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
				moneyList: [
					{discount: '0.97折',money: '800',discount_money: '￥690'},
					{discount: '0.27折',money: '600',discount_money: '￥530'},
					{discount: '0.69折',money: '950',discount_money: '￥890'},
					{discount: '0.58折',money: '630',discount_money: '￥580'},
					{discount: '0.78折',money: '810',discount_money: '￥720'},
					{discount: '0.25折',money: '200',discount_money: '￥160'},
					{discount: '0.35折',money: '80',discount_money: '￥70'},
					{discount: '0.94折',money: '60',discount_money: '￥50'},
					{discount: '0.32折',money: '820',discount_money: '￥720'}
				],
				p_1: false,
				menban1: false,
				p_2: false,
				menban2: false,
				p_1_name: '',
				p_1_url: '',
				p_2_name: '',
				p_2_discount: '',
				p_3: false,
				menban3: false,
				p_3_money: '',
				menban4: false,
				p_4: false,
				obtain_p_1_name: '',
				obtain_p_2_name: '',
				obtain_p_3_money: '',
			}
		},
		methods: {
			index_1() {
				this.index = 1
			},
			index_2() {
				this.index = 2
			},
			
			// P_1
			t_p_1() {
				this.p_1 = true
				this.menban1 = true
			},
			menban_1() {
				this.p_1 = false
				this.menban1 = false
			},
			cha_1() {
				this.p_1 = false
				this.menban1 = false
			},
			p_1_click(name,url) {
				this.p_1 = false
				this.menban1 = false
				this.p_1_name = name
				this.p_1_url = url
				
				this.p_2_name = ''
				this.p_2_discount = ''
				this.p_3_money = ''
			},
			
			
			// p_2
			t_p_2() {
				if(this.p_1_name != '') {
					this.p_2 = true
					this.menban2 = true
				}else {
					uni.showModal({
					    title: '提示',
					    content: '卡类不能为空',
					    success: function (res) {
					        if (res.confirm) {
					            return true
					        } else if (res.cancel) {
					            return false
					        }
					    }
					});
				}
			},
			menban_2() {
				this.p_2 = false
				this.menban2 = false
			},
			cha_2() {
				this.p_2 = false
				this.menban2 = false
			},
			p_2_click(name,discount) {
				this.p_2 = false
				this.menban2 = false
				this.p_2_name = name
				this.p_2_discount = discount
			},
			
			
			// p_3
			t_p_3() {
				if(this.p_1_name == '') {
					uni.showModal({
					    title: '提示',
					    content: '卡类不能为空',
					    success: function (res) {
					        if (res.confirm) {
					            return true
					        } else if (res.cancel) {
					            return false
					        }
					    }
					});
					return false
				}else if(this.p_2_name == ''){
					uni.showModal({
					    title: '提示',
					    content: '卡种不能为空',
					    success: function (res) {
					        if (res.confirm) {
					            return true
					        } else if (res.cancel) {
					            return false
					        }
					    }
					});
					return false
				}else {
					this.p_3 = true
					this.menban3 = true
					return true
				}
				this.p_3 = true
				this.menban3 = true
			},
			menban_3() {
				this.p_3 = false
				this.menban3 = false
			},
			cha_3() {
				this.p_3 = false
				this.menban3 = false
			},
			p_3_click(money) {
				this.p_3 = false
				this.menban3 = false
				this.p_3_money = money
			},
			
			// 提交
			confirm() {
				this.obtain_p_1_name = this.p_1_name,
				this.obtain_p_2_name = this.p_2_name,
				this.obtain_p_3_money = this.p_3_money
				this.menban4 = true
				this.p_4 = true
			},
			
			confirm_() {
				// 判断
				if(this.obtain_p_1_name == '') {
					uni.showModal({
					    title: '提示',
					    content: '卡类不能为空',
					    success: function (res) {
					        if (res.confirm) {
					            return true
					        } else if (res.cancel) {
					            return false
					        }
					    }
					});
					return false
				}else if(this.obtain_p_2_name == '') {
					uni.showModal({
					    title: '提示',
					    content: '卡种不能为空',
					    success: function (res) {
					        if (res.confirm) {
					            return true
					        } else if (res.cancel) {
					            return false
					        }
					    }
					});
					return false
				}else if(this.obtain_p_3_money == '') {
					uni.showModal({
					    title: '提示',
					    content: '面值不能为空',
					    success: function (res) {
					        if (res.confirm) {
					            return true
					        } else if (res.cancel) {
					            return false
					        }
					    }
					});
					return false
				}else {
					// 发送请求
					this.menban4 = false
					this.p_4 = false
					return true
				}
			},
			cha_4() {
				this.menban4 = false
				this.p_4 = false
			},
			return_() {
				this.menban4 = false
				this.p_4 = false
			}
		},
		 onShow:function(){
		  let name = uni.getStorageSync('name')
		  let url = uni.getStorageSync('url')
		  let name_card = uni.getStorageSync('name_card')
		  let discount = uni.getStorageSync('discount')
		  this.p_1_name = name
		  this.p_1_url = url
		  this.p_2_name = name_card
		  this.p_2_discount = discount
		 }

	}
</script>

<style>
	.all {
		width: 100%;
		height: 100%;
		position: relative;
	}
	
	.top {
		width: 100%;
	}
	
	.index_1,
	.index_2 {
		width: 100%;
	}
	
	.t_1 {
		width: 90%;
		justify-content: space-between;
		font-size: 36upx;
		padding: 20upx;
		height: 84upx;
	}
	
	.bax {
		margin-left: 40upx;
		font-size: 38upx;
	}
	
	.imgs {
		width: 80upx !important;
		height: 80upx;
		border-radius: 50%;
		margin-right: 40upx;
	}
	
	.imgs_ {
		width: 26upx !important;
		height: 40upx;
	}
	
	.smail {
		font-size: 32upx;
		margin-top: 10upx;
		margin-left: 10upx;
	}
	
	
	.middle {
		width: 100%;
		margin-top: 20upx;
	}
	
	.m_item {
		width: 70%;
		justify-content: space-between;
	}
	
	.m_item text {
		padding: 10upx;
		border-bottom: 2px #fff solid;
		color: #999999;
	}
	
	.click_color {
		color: #F18F02 !important;
		border-bottom: 2px #F18F02 solid !important;
	}
	
	.m_1 {
		margin-top: 20upx;
		width: 90%;
		justify-content: space-between;
		padding: 2%;
	}
	
	.m_2 {
		width: 90%;
		justify-content: space-between;
		margin-top: 40upx;
		font-size: 34upx;
		padding-left: 2%;
	}
	
	.m_1 image {
		width: 80upx !important;
		height: 50upx;
	}
	
	.m_text view {
		width: 200upx;
		text-align-last: justify;
	}
	
	.m_text input {
		width: 300upx;
		height: 80upx;
		border-radius: 20upx;
		padding-left: 20upx;
	}
	
	.tail {
		margin-top: 80upx;
		width: 100%;
	}
	
	.tail_item {
		width: 90%;
		font-size: 30upx;
	}
	
	.t_btn {
		justify-content: center;
		height: 100upx !important;
		border-radius: 0 !important;
		width: 100%;
		background-color: #4D95E5;
	}
	
	.position_1 {
		position: absolute;
		left: 0;
		right: 0;
		width: 100%;
		height: 70%;
		top: 30%;
		bottom: 0;
		z-index: 8;
		background-color: #fff;
		align-items: stretch !important; 
		overflow: auto;
		font-size: 34upx;
	}
	
	.p_1 {
		margin-top: 40upx;
	}
	
	.p_1 image {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
		margin: 20upx 40upx;
	}
	
	.auto_ {
		margin: 0 auto;
		padding: 10upx;
		font-size: 42upx;
	}
	
	.cha {
		width: 40upx;
		height: 40upx;
		position: absolute;
		right: 15upx;
		top: 15upx;
	}
	
	.p_1_menban {
		width: 100%;
		height: 100%;
		background-color: #808080;
		z-index: 6;
		opacity: 0.9;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
	}
	
	.p_2_menban {
		width: 100%;
		height: 100%;
		background-color: #fff;
		z-index: 6;
		opacity: 0.9;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		opacity: 0.0;
	}
	
	.p_2 {
		flex-wrap: wrap;
		width: 100%;
	}
	
	.p_2 view {
		width: 32%;
	}
	
	.p_3 view {
		margin: 16upx 4upx;
	}
	
	.p_3 view text {
		padding: 6upx;
	}
	
	.uni-textarea textarea {
		padding-left: 40upx;
		margin-bottom: 260upx;
		margin-top: 40upx;
	}
	
	.position_ {
		position: absolute;
		top: 30%;
		bottom: 30%;
		left: 10%;
		right: 10%;
		width: 80%;
		height: 40%;
		z-index: 10;
		background-color: #fff;
		border: 1px solid #fff;
		-moz-box-shadow: 2upx 2upx 6upx #333333;
		-webkit-box-shadow: 2upx 2upx 6upx #333333;
		box-shadow: 2upx 2upx 6upx #333333;
	}
	
	.p_item {
		align-items: stretch;
	}
	
	.p_item text {
		padding: 10upx;
	}
	
	.p_item_btn text {
		padding: 20upx;
	}
	
	.p_item_btn text:nth-child(1) {
		background-color: #4D95E5;
		color: #fff;
	}
</style>
