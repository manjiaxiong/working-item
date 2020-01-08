var e = getApp(), t = require("../../static/js/utils/underscore.js");

Page({
    data: {},
    onLoad: function(e) {
        this.data.sid = e.sid;
    },
    onSubmit: function(i) {
        var r = this, a = i.detail.value.title, n = i.detail.value.recognition;
        if (!a) return !1;
        if (!n) return !1;
        var o = {
            title: a,
            recognition: n
        };
        e.utilwmall.request({
            url: "wmall/member/invoice",
            data: o,
            success: function(i) {
                var n = i.data.message.message;
                e.utilwmall.setStorageSync("order.invoiceTitle", a), e.utilwmall.setStorageSync("order.invoiceId", n);
                var o = e.utilwmall.getStorageSync("order.extra"), s = {
                    invoiceId: n,
                    invoiceTitle: a
                };
                o = o ? t.extend(o) : s, e.utilwmall.setStorageSync("order.extra", o), wx.redirectTo({
                    url: "note?type=invoice&sid=" + r.data.sid
                });
            }
        });
    }
});