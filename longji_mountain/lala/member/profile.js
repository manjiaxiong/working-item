var n = getApp();

Page({
    data: {
        user: [],
        Lang: n.Lang,
        wuiLoading: {
            show: !0,
            img: n.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(e) {
        var o = this;
        n.utilwmall.request({
            url: "wmall/member/profile",
            success: function(e) {
                n.utilwmall.loaded();
                var t = e.data.message.message, i = n.utilwmall.getExtConfigSync();
                i.siteInfo.version || (i.siteInfo.version = "8.0"), o.setData({
                    user: t,
                    ext: i
                });
            }
        });
    },
    onJsEvent: function(e) {
        n.utilwmall.jsEvent(e);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});