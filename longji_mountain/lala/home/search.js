var t = getApp();

Page({
    data: {
        keyword: "",
        shareData: {
            title: "商户搜索",
            path: "/lala/home/search",
            success: function() {},
            fail: function() {}
        },
        Lang: t.Lang,
        wuiLoading: {
            show: !0,
            img: t.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(e) {
        var a = this;
        t.utilwmall.request({
            url: "wmall/home/hunt/index",
            data: {
                menufooter: 1
            },
            success: function(e) {
                t.utilwmall.loaded();
                var e = e.data.message.message;
                a.setData(e);
            }
        });
    },
    onReady: function() {},
    onInput: function(t) {
        this.setData({
            keyword: t.detail.value
        });
    },
    onKeyword: function(t) {
        this.setData({
            keyword: t.currentTarget.dataset.keyword
        }), this.onSearch();
    },
    onSearch: function() {
        var e = this;
        if (!e.data.keyword) return !1;
        e.data.keyword;
        t.utilwmall.jump2url("/lala/home/searchResult?key=" + e.data.keyword);
    },
    onClearHistory: function() {
        var e = this;
        wx.showModal({
            content: "确定清除历史记录吗",
            success: function(a) {
                a.confirm && t.utilwmall.request({
                    url: "wmall/home/hunt/truncate",
                    success: function() {
                        e.setData({
                            searchHistorys: []
                        });
                    }
                });
            }
        });
    },
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {
        return this.data.shareData;
    }
});