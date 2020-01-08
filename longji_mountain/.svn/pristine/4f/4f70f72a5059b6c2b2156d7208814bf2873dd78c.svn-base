var a = getApp();

Page({
    data: {
        Lang: a.Lang,
        wuiLoading: {
            show: !0,
            img: a.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(e) {
        var t = this;
        e && e.id && (t.data.id = e.id), a.utilwmall.request({
            url: "wmall/order/index/refund",
            data: {
                id: t.data.id
            },
            success: function(e) {
                a.utilwmall.loaded();
                var d = e.data.message;
                if (d.errno) return a.utilwmall.toast(d.message), !1;
                d = d.message, t.setData({
                    refunds: d.refunds
                });
            }
        });
    }
});