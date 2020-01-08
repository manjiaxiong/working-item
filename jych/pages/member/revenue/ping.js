var t = getApp(), e = t.requirejs("core");
// pages/member/revenue/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    "firstList": [{ name: 'w券1', money: '5.00' }, { name: 'w券2', money: '50.00'}],
    "secondList": [{ name: 'y券1', money: '10.00' }, { name: 'y券2', money: '20.00' }],
    "thirdList": [{ name: 'g券1', money: '30.00' }, { name: 'g券2', money: '40.00' }],
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
      var status = '';
    if (this.data.currentIndex==1){
      status = 0;
    } else if (this.data.currentIndex == 2 ) {
      status = 1;
      }
    // console.log(status);
    this.getData(status);
      


  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var titleId=options.titleId;
    var ping = options.ping;
    var type = options.type;
    //设置标题
    // if (titleId == 2) {
      wx.setNavigationBarTitle({
        title: '平级奖励（' + ping+')'
      })
    // }
   

  

     

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

  getData: function (status) {
    // console.log({ status: status });
    var t = this;
    e.get("myabonus/ping", {status:status}, function (e) {
      t.setData(e)
      // console.log(t.data);
    });
  }


})