// pages/member/team/index.js
var t = getApp(),
	e = t.requirejs("core");
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		list: '',
		isNull: false,
		indexPage: 1,
		pagesize: 10,
		total: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var _this = this
		//加载数据
		e.get('service/subscribe', {
			page: 1
		}, function(res) {
			console.log(res)
			if (res.result.list == '') { //无数据
				_this.setData({
					isNull: true
				})
				return
			}
			_this.setData({
				list: res.result.list,
				total: res.result.total
			})
			console.log(res.result)
		})

	},
	tapCancel:function(event){//取消订单
	var _this=this
		var status=event.currentTarget.dataset.status;
		var id=event.currentTarget.dataset.id;
		console.log(status)
		if(status==1){
			wx.showModal({
			  title: '提示',
			  content: '您的订单已预约成功,请您联系商家取消',
			  success (res) {
				  
			    if (res.confirm) {
			      console.log('用户点击确定')
			    } else if (res.cancel) {
			      console.log('用户点击取消')
			    }
			  }
			})
		}
		
		else if(status==0){
			wx.showModal({
			  title: '提示',
			  content: '您确定取消订单吗?',
			  success (res) {
			    if (res.confirm) {
			      // console.log('用户点击确定')
				  e.post('service/subscribe/cancel',{
					  id:id
				  },function(res){
					  // console.log(res)
					  if(res.status==0){
						  wx.showToast({
						  	title: res.message,
						  	icon: 'none'
						  })
					  }else{
						  wx.showToast({
						  	title: res.message,
						  	icon: 'none'
						  })
						  _this.onLoad()
					  }
				  })
			    } 
				else if (res.cancel) {
			      console.log('用户点击取消')
			    }
			  }
			})
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {
		var _this = this;
		if (this.data.pagesize * this.data.indexPage < this.data.total) {
			wx.showNavigationBarLoading() //加载提醒
			var indexPage = this.data.indexPage + 1
			// console.log(caterPage)
			e.get('service/subscribe', {
					page: indexPage
				},
				function(res) {
					// console.log(2)
					var newList = _this.data.list
					newList = newList.concat(res.result.list)
					_this.setData({
						list: newList,
						indexPage: indexPage
					})
					wx.hideNavigationBarLoading() //取消加载提示
					// console.log(3)
				})
		} else {
			wx.showToast({
				title: '已经到底啦',
				icon: 'none'
			})
			return;
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
