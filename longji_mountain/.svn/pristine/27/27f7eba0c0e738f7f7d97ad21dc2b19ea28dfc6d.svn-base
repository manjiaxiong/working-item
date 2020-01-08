var t = getApp();

Page({
    data: {
        logo: "",
        title: "",
        Lang: t.Lang,
        wuiLoading: {
            show: !0,
            img: t.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(n) {
        var a = this, i = t.utilwmall.getStorageSync("mallBasic");
        a.setData(i);
    },
    onCancel: function() {
        var n = t.utilwmall.getStorageSync("backUrl");
        t.utilwmall.jump2url(n, "redirectTo");
    },
    onShow: function() {},
    onJsEvent: function(n) {
        t.utilwmall.jsEvent(n);
    }
});