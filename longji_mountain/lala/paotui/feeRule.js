var n = getApp();

Page({
    data: {
        Lang: n.Lang,
        wuiLoading: {
            show: !0,
            img: n.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(e) {
        var o = this;
        n.utilwmall.request({
            url: "errander/diy/feeRule",
            data: {
                id: e.id
            },
            success: function(e) {
                n.utilwmall.loaded(), o.setData(e.data.message.message);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});