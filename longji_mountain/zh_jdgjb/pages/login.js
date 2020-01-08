var app = getApp();

Page({
    data: {},
    onLoad: function(n) {
        app.getUserInfo(function(n) {}), app.getSystem(this);
    },
    bindGetUserInfo: function(n) {
        "getUserInfo:ok" == n.detail.errMsg ? wx.navigateBack({
            delta: 1
        }) : wx.navigateBack({});
    },
    qx: function() {
        wx.navigateBack({});
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});