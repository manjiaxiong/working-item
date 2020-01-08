var a = getApp();

Page({
    data: {
        Lang: a.Lang,
        wuiLoading: {
            show: !0,
            img: a.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(t) {
        var e = this;
        t.id && (e.data.id = t.id), a.utilwmall.request({
            url: "wmall/order/index/pindan_detail",
            data: {
                id: e.data.id
            },
            success: function(t) {
                if (a.utilwmall.loaded(), (i = t.data.message).errno) return a.utilwmall.toast(i.message), 
                !1;
                var i = i.message;
                e.setData(i);
            }
        });
    }
});