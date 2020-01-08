var qqmapsdk, app = getApp(), util = require("../../utils/util.js"), QQMapWX = require("../../lib/qqmap-wx-jssdk.js"), _location = "";

Page({
    data: {
        bomb: !1,
        showLoading: !0,
        weizhi: "附近"
    },
    onLoad: function(i) {
        var n = this;
        app.getUrl(n), app.getSystem(n), app.getUserInfo(function(e) {
            n.setData({
                userInfo: e
            });
            var t = decodeURIComponent(i.scene);
            if (null != t) var a = t;
            if (null != i.upper_partner) a = i.upper_partner;
            app.util.request({
                url: "entry/wxapp/MySx",
                data: {
                    user_id: e.id
                },
                success: function(t) {
                    0 == t.data && "undefined" != a && app.util.request({
                        url: "entry/wxapp/Binding",
                        cachetime: "0",
                        data: {
                            fx_user: e.id,
                            user_id: a
                        },
                        success: function(t) {}
                    });
                }
            });
        }), n.setData({
            rande: app.globalData.rande,
            start: app.util.time(),
            end: app.util.addDate(app.util.time(), 28)
        }), n.refresh();
    },
    date: function(t) {
        var e = wx.getStorageSync("day1"), a = wx.getStorageSync("day2"), i = wx.getStorageSync("day"), n = app.util.time();
        if ("" == e) {
            var o = app.util.time();
            wx.setStorageSync("datein", o);
        } else if (e < n) o = n; else o = e;
        if ("" == a) var s = app.util.addDate(n, 1); else {
            var r = app.util.addDate(n, 1);
            if (a < r) s = r; else s = a;
        }
        i = app.util.day(s, o);
        wx.setStorageSync("day1", o), wx.setStorageSync("day2", s), wx.setStorageSync("day", i), 
        this.setData({
            datein: o,
            dateout: s,
            time: i,
            current_date: o
        });
    },
    refresh: function(t) {
        var e = this;
        app.util.request({
            url: "entry/wxapp/GetNav",
            cachetime: "0",
            success: function(t) {
                e.setData({
                    nav: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/GetSystem",
            cachetime: "0",
            success: function(t) {
                wx.setStorageSync("platform", t.data), wx.setStorageSync("cityName", ""), wx.setNavigationBarTitle({
                    title: t.data.pt_name
                }), qqmapsdk = new QQMapWX({
                    key: t.data.map_key
                }), "2" == t.data.type && e.dwCity();
            },
            complete: function(t) {
                console.log(t);
            }
        }), app.util.request({
            url: "entry/wxapp/getad",
            cachetime: "0",
            data: {
                type: 1
            },
            success: function(t) {
                e.data.rande;
                0 < t.data.length && e.setData({
                    getad: t.data,
                    bomb: !0
                });
            }
        }), e.date();
    },
    guanbi: function(t) {
        this.setData({
            bomb: !1
        }), app.globalData.rande = 0;
    },
    search: function(t) {
        wx.navigateTo({
            url: "search",
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    skip: function(t) {
        var e = t.currentTarget.dataset.src, a = t.currentTarget.dataset.appid, i = t.currentTarget.dataset.wb_src;
        if ("../register/register" == e && this.Membership(), "" != e && "../register/register" != e) {
            if ("../distribution/distribution" == e) return void app.util.request({
                url: "entry/wxapp/MyDistribution",
                data: {
                    user_id: getApp().user_info.user_id
                },
                success: function(t) {
                    0 == t.data ? wx.navigateTo({
                        url: "../distribution/examine"
                    }) : 1 == t.data.state ? wx.showModal({
                        title: "温馨提示",
                        content: "系统正在审核中，请稍后再试"
                    }) : 2 == t.data.state ? wx.navigateTo({
                        url: "../distribution/distribution"
                    }) : 3 == t.data.state && wx.showModal({
                        title: "温馨提示",
                        content: "您的申请已被拒绝"
                    });
                }
            });
            var n = e.replace(/[^0-9]/gi, "");
            e = e.replace(/(\d+|\s+)/g, "");
            wx.navigateTo({
                url: String(e) + String(n)
            });
        } else "" != a ? wx.navigateToMiniProgram({
            appId: a,
            success: function(t) {}
        }) : "" != i && wx.navigateTo({
            url: "link?link=" + i
        });
    },
    copyright: function(t) {
        var e = this.data.platform.tz_appid;
        wx.navigateToMiniProgram({
            appId: e,
            success: function(t) {}
        });
    },
    bindDateChange1: function(t) {
        var e = t.detail.value, a = app.util.addDate(t.detail.value, 1), i = (this.data.current_date, 
        app.getTime2Time(a, e));
        wx.setStorageSync("day1", e), wx.setStorageSync("day2", a), wx.setStorageSync("day", i), 
        console.log(i), console.log(app.util.addDate(t.detail.value, 1)), this.setData({
            datein: t.detail.value,
            dateout: app.util.addDate(t.detail.value, 1),
            time: i
        });
    },
    bindDateChange2: function(t) {
        var e = this.data.datein, a = t.detail.value, i = app.getTime2Time(a, e);
        wx.setStorageSync("day1", e), wx.setStorageSync("day2", a), wx.setStorageSync("day", i), 
        this.setData({
            dateout: t.detail.value,
            time: i
        });
    },
    wode: function(t) {
        wx.reLaunch({
            url: "../logs/logs"
        });
    },
    content: function(t) {
        var e = this.data.platform;
        1 == app.getUserinfo() && (2 == e.type ? wx.getLocation({
            type: "wgs84",
            success: function(t) {
                var e = t.latitude, a = t.longitude;
                _location = e + "," + a, wx.setStorageSync("latitude", t.latitude), wx.setStorageSync("longitude", t.longitude), 
                wx.navigateTo({
                    url: "../hotel_list/hotel_list?nearby=0"
                });
            },
            fail: function(t) {
                wx.hideLoading(), _location = 1, wx.showModal({
                    title: "授权提示",
                    content: "您取消了位置授权，小程序将无法正常使用，如需再次授权，请在我的-授权管理中进行授权，再次进入小程序即可",
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "#333",
                    confirmText: "确定",
                    confirmColor: "#333",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                });
            }
        }) : wx.navigateTo({
            url: "../hotel_list/hotel_info?hotel_id=" + e.seller_id + "&type=1"
        }));
    },
    location: function(t) {
        "1" != this.data.platform.openCity ? (wx.showLoading({
            title: "搜索附近酒店"
        }), 1 == app.getUserinfo() && wx.getLocation({
            type: "wgs84",
            success: function(t) {
                var e = t.latitude, a = t.longitude;
                _location = e + "," + a, wx.setStorageSync("latitude", t.latitude), wx.setStorageSync("longitude", t.longitude), 
                wx.navigateTo({
                    url: "../hotel_list/hotel_list?nearby=1"
                });
            },
            fail: function(t) {
                wx.hideLoading(), _location = 1, wx.showModal({
                    title: "授权提示",
                    content: "您取消了本次授权，小程序将无法正常使用，请点击确定或者在我的-授权管理中进行授权，再次重新进入小程序即可",
                    showCancel: !0,
                    cancelText: "取消",
                    cancelColor: "#333",
                    confirmText: "确定",
                    confirmColor: "#333",
                    success: function(t) {},
                    fail: function(t) {},
                    complete: function(t) {}
                });
            }
        })) : wx.navigateTo({
            url: "../switchcity/switchcity?cityName=" + this.data.weizhi
        });
    },
    getUserInfo: function(t) {
        app.globalData.userInfo = t.detail.userInfo, this.setData({
            userInfo: t.detail.userInfo,
            hasUserInfo: !0
        });
    },
    dwCity: function() {
        var i = this;
        wx.showLoading({
            title: "定位中"
        }), wx.getLocation({
            type: "wgs84",
            success: function(t) {
                var e = t.latitude, a = t.longitude;
                qqmapsdk.reverseGeocoder({
                    location: {
                        latitude: e,
                        longitude: a
                    },
                    coord_type: 1,
                    success: function(t) {
                        i.setData({
                            weizhi: t.result.address_component.city
                        }), wx.setStorageSync("cityName", t.result.address_component.city), wx.hideLoading(), 
                        console.log(t);
                    }
                });
            }
        }), console.log("dwcity");
    },
    onShow: function() {
        var e = this;
        e.date(), e.setData({
            weizhi: wx.getStorageSync("cityName")
        }), app.getUserInfo(function(t) {
            e.setData({
                users: t
            });
        });
    },
    onPullDownRefresh: function() {
        this.refresh(), wx.stopPullDownRefresh();
    },
    Membership: function(t) {
        var e = this.data, a = e.users, i = e.platform.open_member;
        1 == i && null != i ? "" == a.zs_name || null == a.zs_name ? wx.navigateTo({
            url: "../register/register"
        }) : wx.navigateTo({
            url: "../logs/member"
        }) : wx.showModal({
            title: "温馨提示",
            content: "平台未开放注册会员,请联系平台管理员"
        });
    },
    onReachBottom: function() {},
    onUnload: function() {},
    onShareAppMessage: function() {}
});