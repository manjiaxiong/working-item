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
        var s = this;
        s.data.sid = t.sid, n.utilwmall.request({
            url: "wmall/store/assign/mine",
            data: {
                sid: t.sid
            },
            success: function(t) {
                n.utilwmall.loaded();
                var a = t.data.message;
                0 == a.errno ? s.setData(a.message) : -1e3 == a.errno && n.utilwmall.toast(a.message, "redirect:/tangshi/pages/assign/assign?sid=" + s.data.sid, 1e3);
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
    onPullDownRefresh: function() {
        this.onLoad({
            sid: this.data.store.id
        }), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});