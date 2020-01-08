var t = getApp();

Page({
    data: {
        Lang: t.Lang,
        wuiLoading: {
            show: !0,
            img: t.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(e) {
        var a = this;
        a.data.order_id = e.order_id, a.data.order_type = e.order_type || "takeout", t.utilwmall.request({
            url: "system/paycenter/pay",
            method: "POST",
            data: {
                id: a.data.order_id,
                order_type: a.data.order_type,
                type: 1
            },
            success: function(e) {
                t.utilwmall.loaded();
                var n = e.data.message;
                if (n.errno) return t.utilwmall.toast(n.message), !1;
                a.setData(n.message), new (require("../../static/js/utils/wxTimer.js"))({
                    endTime: n.message.order.pay_endtime_cn,
                    name: "wxTimer1",
                    issplit: 1
                }).start(a);
            }
        });
    },
    onSubmit: function(e) {
        var a = this, n = e.detail.value;
        if (!n.pay_type) return t.utilwmall.toast("请先选择支付方式"), !1;
        a.setData({
            submitDisabled: 1
        }), t.utilwmall.pay({
            pay_type: n.pay_type,
            order_type: a.data.order_type,
            order_id: a.data.order_id
        });
    },
    onJsEvent: function(e) {
        t.utilwmall.jsEvent(e);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});