var app = getApp();

Page({
    data: {},
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), app.util.request({
            url: "entry/wxapp/orderdetails",
            data: {
                order_id: t.id
            },
            success: function(t) {
                var e = t.data;
                e.arrival_time = e.arrival_time.slice(5, 7) + "月" + e.arrival_time.slice(8, 10) + "日", 
                e.departure_time = e.departure_time.slice(5, 7) + "月" + e.departure_time.slice(8, 10) + "日", 
                e.time = app.ormatDate(e.time), 20 <= e.seller_address.length && (e.seller_address = e.seller_address.slice(0, 20) + "..."), 
                a.setData({
                    order_info: e
                });
            }
        });
    },
    confirmorder: function(t) {
        var e = app.OpenId, a = this.data.order_info;
        app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: e,
                money: a.total_cost,
                order_id: a.id
            },
            success: function(t) {
                wx.requestPayment({
                    timeStamp: t.data.timeStamp,
                    nonceStr: t.data.nonceStr,
                    package: t.data.package,
                    signType: t.data.signType,
                    paySign: t.data.paySign,
                    success: function(t) {
                        wx.navigateBack({
                            delta: 1
                        });
                    },
                    fail: function(t) {
                        wx.showToast({
                            title: "支付失败"
                        });
                    }
                });
            }
        });
    },
    order_more: function(t) {
        wx.navigateTo({
            url: "../hotel_list/hotel_info?hotel_id=" + this.data.order_info.seller_id
        });
    },
    see_more: function(t) {
        2 == that.data.platform.type ? wx.navigateTo({
            url: "../hotel_list/hotel_list"
        }) : wx.navigateTo({
            url: "../index/index"
        });
    },
    cancel_order: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.hb_id;
        app.util.request({
            url: "entry/wxapp/CancelOrder",
            data: {
                order_id: e,
                hb_id: a
            },
            success: function(t) {
                wx.showToast({
                    title: "订单已取消"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        });
    },
    apply: function(t) {
        var e = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/ChangeOrder",
            data: {
                order_id: e,
                status: t.currentTarget.dataset.status
            },
            success: function(t) {
                wx.showToast({
                    title: "申请成功"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        });
    },
    refuse: function(t) {
        var e = t.currentTarget.dataset.id;
        app.util.request({
            url: "entry/wxapp/ChangeOrder",
            data: {
                order_id: e,
                status: 8
            },
            success: function(t) {
                wx.showToast({
                    title: "申请成功"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        });
    },
    YjRefund: function(t) {
        this.setData({
            YjRefund: !0
        });
    },
    Refund: function(t) {
        this.setData({
            YjRefund1: !0
        });
    },
    refoned_money: function(t) {
        var e = this, a = e.data.order_info.yj_cost;
        t.detail.value <= a ? e.setData({
            refoned_money: t.detail.value
        }) : e.setData({
            refoned_money: a
        });
    },
    refoned_money1: function(t) {
        var e = this, a = e.data.order_info.total_cost;
        t.detail.value <= a ? e.setData({
            refoned_money1: t.detail.value
        }) : e.setData({
            refoned_money1: a
        });
    },
    cancel: function(t) {
        this.setData({
            YjRefund: !1
        });
    },
    cancel1: function(t) {
        this.setData({
            YjRefund1: !1
        });
    },
    confirm: function(t) {
        var e = this, a = e.data.order_info.id, n = e.data.refoned_money;
        if (null == n) var i = e.data.order_indo.yj_cost; else i = n;
        app.util.request({
            url: "entry/wxapp/YjRefund",
            data: {
                order_id: a,
                money: i
            },
            success: function(t) {
                1 == t.data ? (wx.showToast({
                    title: "申请成功"
                }), e.setData({
                    YjRefund: !1
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500)) : (wx.showToast({
                    title: "退款失败"
                }), e.setData({
                    YjRefund: !1
                }));
            }
        });
    },
    confirm1: function(t) {
        var e = this.data.order_info.id, a = this.data.refoned_money1;
        if (null == a) var n = this.data.order_indo.total_cost; else n = a;
        app.util.request({
            url: "entry/wxapp/Refund2",
            data: {
                order_id: e,
                total_cost: n
            },
            success: function(t) {
                wx.showToast({
                    title: "申请成功"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 1500);
            }
        });
    },
    sele_address: function(t) {
        var n = this.data.order_info, i = n.coordinates.split(",");
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                var e = Number(i[0]), a = Number(i[1]);
                wx.openLocation({
                    latitude: e,
                    longitude: a,
                    name: n.seller_name,
                    address: n.seller_address
                });
            }
        });
    },
    go_eveluate: function(t) {
        wx.navigateTo({
            url: "evaluate?seller_id=" + this.data.order_info.seller_id + "&order_id=" + this.data.order_info.id
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});