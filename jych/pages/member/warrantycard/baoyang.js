// pages/member/warrantycard/baoyang.js
var t = getApp(), e = t.requirejs("core");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var t = this
    var id = options.id
    var og_id = options.og_id
    var oid = options.oid
    var option_id = options.option_id

    e.get("member/warrantycard/ushareewm", {
      id: id, og_id: og_id, oid: oid, option_id: option_id
    }, function (e) {
      if (e.error == 0) {
         console.log(e.url)
         t.setData({
           url: e.url
         });
  
      }

    });

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
  preview: function (t) {
    wx.previewImage({
      current: t.currentTarget.dataset.src,
      urls: [t.currentTarget.dataset.urls]
    });
  },
})