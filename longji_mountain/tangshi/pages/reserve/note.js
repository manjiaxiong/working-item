var e = getApp(), t = require("../../../static/js/utils/underscore.js");

Page({
    data: {
        invoiceId: 0,
        Lang: e.Lang,
        wuiLoading: {
            show: !0,
            img: e.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(i) {
        var a = this;
        a.data.sid = i.sid, e.utilwmall.request({
            url: "wmall/store/reserve/note",
            data: {
                sid: i.sid
            },
            success: function(o) {
                e.utilwmall.loaded();
                var s = o.data.message.message, n = {
                    order_note: s.store.order_note,
                    invoice_status: s.store.invoice_status,
                    invoiceId: i.invoiceId,
                    sid: s.store.id
                };
                (n = t.extend(n, e.utilwmall.getStorageSync("reserve.note"))).invoice_status && (n.invoices = s.invoices), 
                a.setData(n);
            }
        });
    },
    onNote: function(e) {
        this.setData({
            note: e.detail.value
        });
    },
    onChooseInvoice: function(e) {
        var t = this, i = e.currentTarget.dataset.id;
        t.setData({
            invoiceId: i
        });
    },
    onChooseLabel: function(e) {
        var t = this, i = t.data.note;
        i || (i = ""), i = i + " " + e.currentTarget.dataset.note, t.setData({
            note: i
        });
    },
    onSubmit: function(i) {
        var a = this, o = {
            note: a.data.note,
            invoiceId: a.data.invoiceId
        }, s = e.utilwmall.getStorageSync("reserve.extra");
        s && (s = t.extend(s, o)), e.utilwmall.setStorageSync("reserve.extra", s), e.utilwmall.setStorageSync("reserve.note", o), 
        wx.redirectTo({
            url: "./create?sid=" + a.data.sid
        });
    }
});