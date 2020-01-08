// pages/member/myabonus/index.js
var e = getApp(), t = e.requirejs("core"), i = e.requirejs("biz/diyform");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member_card_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getData();
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
  gobuy:function(){

    wx.navigateTo({
      url: '/pages/goods/index/index' 
    })
  },

   getData: function () {

    var e = this;
    t.get("myabonus/register", {}, function (t) {
    
      70003 != t.error ? (t.show = !0, wx.setNavigationBarTitle({
        title: "申请成为" + t.set.texts.myaagent || "申请"
      }), e.setData(t), e.setData({
          diyform: {
              f_data: t.f_data,
              fields: t.fields
          },
        member_card_id: t.member_card_id
      })) : wx.redirectTo({
          url: "../index"
      });
      console.log(e.data.member_card_id);
      console.log(e.data.set.regbg);
    });
  },
  kaitong:function() {
    // var e = this;
    // console.log(this.data.member_card_id);
    var id = this.data.member_card_id;

    var url = '/pages/member/membercard/detail/index?cate=0&type=all&id='+id;

    wx.navigateTo({
      url: url,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

  }
 
})