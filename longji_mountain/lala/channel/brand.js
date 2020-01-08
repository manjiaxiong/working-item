var a = getApp();

Page({
    data: {
        shareData: {
            title: "为您优选",
            path: "/pages/channel/brand",
            success: function() {},
            fail: function() {}
        },
        Lang: a.Lang,
        wuiLoading: {
            show: !0,
            img: a.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(t) {
        var e = this;
        a.utilwmall.request({
            url: "wmall/channel/brand",
            data: {
                forceLocation: 1
            },
            success: function(t) {
                a.utilwmall.loaded(), e.setData(t.data.message.message);
            }
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return this.data.shareData;
    }
});