var app = getApp();

Page({
    data: {
        titel: [ "全部", "待付款", "待入住" ],
        page: 1,
        order_list: []
    },
    onLoad: function(t) {
        var e = this;
        app.getUrl(e), app.getSystem(e), app.getUserInfo(function(t) {});
        var a = t.activeIndex, r = t.index;
        e.setData({
            activeIndex: a,
            index: r,
            status: t.status
        }), e.refresh();
    },
    refresh: function(t) {
        var a = this, r = a.data.page, i = a.data.order_list, e = (a.data.index, wx.getStorageSync("userInfo").id);
        app.today_time();
        app.util.request({
            url: "entry/wxapp/MyOrder",
            cachetime: "0",
            data: {
                user_id: e,
                page: r,
                status: a.data.status
            },
            success: function(t) {
                if (0 < t.data.length) {
                    a.setData({
                        page: r + 1
                    }), i = i.concat(t.data);
                    for (var e in i) i[e].arrival_time = i[e].arrival_time.slice(5, 7) + "月" + i[e].arrival_time.slice(8, 10) + "日", 
                    i[e].departure_time = i[e].departure_time.slice(5, 7) + "月" + i[e].departure_time.slice(8, 10) + "日";
                    a.setData({
                        order_list: i
                    });
                }
            }
        });
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.dataset.index,
            index: t.currentTarget.dataset.index,
            status: t.currentTarget.dataset.state,
            page: 1,
            order_list: []
        }), this.refresh();
    },
    order_info: function(t) {
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "orderinfo?id=" + e
        });
    },
    onReady: function() {},
    onShow: function() {
        this.setData({
            index: 0,
            activeIndex: 0,
            page: 1,
            order_list: []
        }), this.refresh();
    },
    onHide: function() {},
    onUnload: function() {
        app.getUserInfo(function(t) {});
    },
    onPullDownRefresh: function() {
        this.setData({
            index: 0,
            page: 1,
            order_list: []
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        this.refresh();
    },
    onShareAppMessage: function() {}
});