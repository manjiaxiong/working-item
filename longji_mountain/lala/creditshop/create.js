var e = getApp();

Page({
    data: {
        goods_id: "",
        goods_type: "",
        username: "",
        mobile: "",
        islegal: !1,
        Lang: e.Lang,
        wuiLoading: {
            show: !0,
            img: e.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(a) {
        var t = this;
        t.data.goods_id = a.goods_id, e.utilwmall.request({
            url: "creditshop/order/create",
            data: {
                goods_id: a.goods_id
            },
            success: function(a) {
                e.utilwmall.loaded();
                var a = a.data.message.message;
                t.data.goods_type = a.type, t.setData({
                    good: a,
                    islegal: !t.data.islegal
                });
            }
        });
    },
    onOrderSubmit: function() {
        var a = this;
        if ("goods" == a.data.goods_type) {
            if (!a.data.username) return e.utilwmall.toast("请输入姓名", ""), !1;
            if (!a.data.mobile) return e.utilwmall.toast("请输入联系方式", ""), !1;
        }
        a.data.islegal = !1, a.setData({
            islegal: a.data.islegal
        }), e.utilwmall.request({
            url: "creditshop/order/submit",
            data: {
                goods_id: a.data.goods_id,
                username: a.data.username,
                mobile: a.data.mobile
            },
            success: function(a) {
                if ((a = a.data.message).errno) return e.utilwmall.toast(a.message, ""), !1;
                var t = a.message.order_id, o = "./detail?id=" + t;
                return "pay" == a.message.redirect && (o = "../public/pay?order_id=" + t + "&order_type=creditshop"), 
                wx.showToast({
                    title: "兑换成功",
                    success: function() {
                        wx.redirectTo({
                            url: o
                        });
                    }
                }), !1;
            }
        });
    },
    onInput: function(e) {
        console.log(e);
        var a = this;
        "username" == e.currentTarget.id ? a.setData({
            username: e.detail.value
        }) : a.setData({
            mobile: e.detail.value
        });
    },
    onReady: function() {},
    onShow: function() {
        console.log("监听页面显示");
    },
    onHide: function() {
        console.log("监听页面隐藏");
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});