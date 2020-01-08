var n = getApp();

Page({
    data: {
        Lang: n.Lang,
        wuiLoading: {
            show: !0,
            img: n.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(t) {
        var e = this;
        n.utilwmall.request({
            url: "wmall/home/help/index",
            data: {},
            success: function(t) {
                n.utilwmall.loaded();
                var o = t.data.message;
                if (o.errno) return n.utilwmall.toast(o.message), !1;
                o = o.message, e.setData(o);
            }
        });
    },
    onJsEvent: function(t) {
        n.utilwmall.jsEvent(t);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});