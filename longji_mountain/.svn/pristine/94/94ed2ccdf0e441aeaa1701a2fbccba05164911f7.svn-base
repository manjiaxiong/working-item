var app = getApp();

Page({
    data: {
        item: [ "有效", "已使用", "已过期" ],
        seletive_index: 0,
        index: 0,
        page: 1,
        unreceive: []
    },
    onLoad: function(e) {
        var t = this;
        app.getUrl(t), app.getSystem(t);
        var a = e.hotel_id;
        t.setData({
            hotel_id: a,
            price: e.money
        }), t.reload();
    },
    reload: function(e) {
        var o = this, r = app.today(), t = wx.getStorageSync("userInfo").id, s = o.data.index, c = o.data.unreceive, u = o.data.page;
        app.util.request({
            url: "entry/wxapp/MyCoupons",
            cachetime: "0",
            data: {
                user_id: t,
                page: u
            },
            success: function(e) {
                if (0 < e.data.length) {
                    o.setData({
                        page: u + 1
                    }), c = c.concat(e.data);
                    e.data;
                    var t = [], a = [], n = [];
                    for (var i in c) null != c[i].end_time && (c[i].end_time = c[i].end_time.slice(0, 10), 
                    c[i].start_time = c[i].start_time.slice(0, 10), c[i].cost = Number(c[i].cost).toFixed(0), 
                    r > c[i].end_time && t.push(c[i]), r <= c[i].end_time && 1 == c[i].state && a.push(c[i]), 
                    2 == c[i].state && n.push(c[i]));
                    0 == s ? o.setData({
                        unreceive: a
                    }) : 1 == s ? o.setData({
                        unreceive: n
                    }) : o.setData({
                        unreceive: t
                    });
                }
            }
        });
    },
    receive: function(e) {
        var t = e.currentTarget.id;
        0 == t ? wx.navigateTo({
            url: "../hotel_list/hotel_list"
        }) : wx.navigateTo({
            url: "../hotel_list/hotel_info?hotel_id=" + t
        });
    },
    not_user: function(e) {
        var t = getCurrentPages();
        t[t.length - 1];
        t[t.length - 2].setData({
            coupon: 0,
            coupons_id: ""
        }), wx.navigateBack({
            delta: 1
        });
    },
    seletive_index: function(e) {
        var t = e.currentTarget.dataset.index;
        this.setData({
            seletive_index: t,
            index: t,
            page: 1,
            unreceive: []
        }), this.reload();
    },
    receive_coupon: function(e) {
        var t = this.data.price, a = e.currentTarget.dataset.money, n = e.currentTarget.id, i = this.data.unreceive.find(function(e) {
            return e.id == n;
        }), o = app.today(), r = e.currentTarget.dataset.condition;
        if (console.log(n, i, o), "" == r) var s = 0; else s = r.replace(/[^0-9]/gi, "");
        if (Number(t) < Number(s)) wx.showToast({
            title: "未满足使用条件",
            icon: "none"
        }); else if (o < i.start_time) wx.showToast({
            title: "请在有效期内使用",
            icon: "none"
        }); else if (null != t || null != s) {
            var c = getCurrentPages();
            c[c.length - 1];
            c[c.length - 2].setData({
                coupon: a,
                coupons_id: n,
                condition: s
            }), wx.navigateBack({
                delta: 1
            });
        }
    },
    onReady: function() {},
    onShow: function() {
        app.getUserInfo(function(e) {});
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            seletive_index: 0,
            index: 0,
            page: 1,
            unreceive: []
        }), this.reload(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.reload();
    }
});