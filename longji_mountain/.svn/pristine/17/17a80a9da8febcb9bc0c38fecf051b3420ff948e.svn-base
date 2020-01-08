var e = getApp();

Page({
    data: {
        price: 0,
        recharge: [],
        select: 0,
        status: 0,
        Lang: e.Lang,
        wuiLoading: {
            show: !0,
            img: e.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(t) {
        var a = this;
        e.utilwmall.request({
            url: "wmall/member/recharge/index",
            success: function(t) {
                e.utilwmall.loaded();
                var r = t.data.message;
                if (r.errno) return e.utilwmall.toast(r.message), !1;
                a.data.status = 1;
                var s = r.message;
                s && s.length > 0 && a.setData({
                    recharge: s,
                    price: s[0].charge
                });
            }
        });
    },
    changeInput: function(e) {
        var t = e.detail.value;
        t || (t = 0), this.setData({
            price: t
        });
    },
    changeSelect: function(e) {
        var t = e.currentTarget.id, a = e.currentTarget.dataset.price;
        a || (a = 0), this.setData({
            select: t,
            price: a
        });
    },
    onSubmit: function() {
        var t = this;
        if (1 != t.data.status) return !1;
        var a = {
            price: t.data.price
        };
        e.utilwmall.request({
            url: "wmall/member/recharge/submit",
            data: a,
            success: function(t) {
                if (0 == t.data.message.errno) {
                    var a = t.data.message.message;
                    e.utilwmall.pay({
                        pay_type: "wechat",
                        order_type: "recharge",
                        order_id: a,
                        success: function() {
                            wx.showToast({
                                title: "支付成功",
                                success: function() {
                                    wx.redirectTo({
                                        url: "./mine"
                                    });
                                }
                            });
                        },
                        fail: function() {
                            e.utilwmall.toast("支付失败");
                        }
                    });
                } else e.utilwmall.toast(t.data.message.message);
            }
        });
    }
});