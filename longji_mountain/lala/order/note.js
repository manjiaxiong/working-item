var t = getApp(), e = require("../../static/js/utils/underscore.js");

Page({
    data: {
        invoiceId: 0,
        invoiceTitle: "",
        Lang: t.Lang,
        wuiLoading: {
            show: !0,
            img: t.utilwmall.getStorageSync("theme.loading.img")
        },
        type: ""
    },
    onLoad: function(e) {
        var i = this;
        i.data.sid = e.sid, i.data.type = e.type ? e.type : "note", t.utilwmall.request({
            url: "wmall/order/create/note",
            data: {
                sid: e.sid,
                type: i.data.type
            },
            success: function(e) {
                t.utilwmall.loaded();
                var a = e.data.message;
                if (a.errno) return t.utilwmall.toast(a.message, ""), !1;
                a = a.message;
                var o = {
                    sid: i.data.sid,
                    type: i.data.type,
                    data: a.store.data
                };
                if ("note" == i.data.type) o.order_note = a.store.order_note, o.note = t.utilwmall.getStorageSync("order.note"); else if ("invoice" == i.data.type) {
                    o.invoice_status = a.store.invoice_status, 1 != o.invoice_status && t.utilwmall.toast("该门店不支持开发票", "redirect:/lala/order/create?sid=" + i.data.sid, 1500), 
                    wx.setNavigationBarTitle({
                        title: "添加发票"
                    });
                    var n = t.utilwmall.getStorageSync("order.invoiceId");
                    o.invoiceId = n > 0 ? n : 0, o.invoiceTitle = t.utilwmall.getStorageSync("order.invoiceTitle"), 
                    o.invoice_status && (o.invoices = a.invoices);
                }
                console.log(1111, o), i.setData(o);
            }
        });
    },
    onNote: function(t) {
        this.setData({
            note: t.detail.value
        });
    },
    onChooseInvoice: function(t) {
        var e = this, i = t.currentTarget.dataset.id, a = t.currentTarget.dataset.index;
        e.setData({
            invoiceId: i,
            invoiceTitle: i > 0 ? e.data.invoices[a].title : ""
        });
    },
    onChooseLabel: function(t) {
        var e = this, i = e.data.note;
        i || (i = ""), i = i + " " + t.currentTarget.dataset.note, e.setData({
            note: i
        });
    },
    onSubmit: function(i) {
        var a = this, o = a.data.type, n = {};
        "note" == o ? (n.note = a.data.note, t.utilwmall.setStorageSync("order.note", a.data.note)) : "invoice" == o && (n.invoiceId = a.data.invoiceId, 
        n.invoiceTitle = a.data.invoiceTitle, t.utilwmall.setStorageSync("order.invoiceId", a.data.invoiceId), 
        t.utilwmall.setStorageSync("order.invoiceTitle", a.data.invoiceTitle));
        var r = t.utilwmall.getStorageSync("order.extra");
        r = r ? e.extend(r, n) : n, t.utilwmall.setStorageSync("order.extra", r), wx.redirectTo({
            url: "./create?sid=" + a.data.sid
        });
    }
});