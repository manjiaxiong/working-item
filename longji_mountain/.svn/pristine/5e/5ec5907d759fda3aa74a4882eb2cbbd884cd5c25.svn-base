// pages/refer/detail/detail.js
var t = getApp(), e = t.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {
	detail:{},
	content:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	var id=options.id
	var notice=options.notice
	var _this=this;
	console.log("id,notice",id,notice)
	if(notice){
		e.get('article/get_detail',{
			type:2,
			id:id
		},function(res){	
			console.log(res.detail)
			// r.wxParse("str", "html",res.detail.content, _this, "0")
			_this.setData({
			  detail: res.detail,
			  content:res.detail.content
			})
		})
	}else{
		e.get('article/get_detail',{
			id:id
		},function(res){
			console.log("id,notice",res.detail)
			// r.wxParse("str", "html", res.detail.content, _this, "0")
			_this.setData({
			  detail: res.detail,
			  content:res.detail.content
			})
		})
	}
	
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getDatalist:function(url,success){
	  wx.request({
	    url: url,
	    success: function (res) {
			// console.log(res)
			success(res.data)
	    }
	  })
	},
})