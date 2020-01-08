var e = require("utils/core.js");

App({
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    onShow: function() {
        this.onLaunch();
    },
    onLaunch: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                "0" == t.model.indexOf("iPhone X") ? e.setCache("isIpx", t.model) : e.setCache("isIpx", "");
            }
        });
        var t = this;
        wx.getSystemInfo({
            success: function(e) {
                wx.setStorageSync("systemInfo", e);
                var a = e.windowWidth, i = e.windowHeight;
                t.globalData.ww = a, t.globalData.hh = i;
            }
        });
    },
    checkAuth: function() {
        var t = "/pages/auth/index", a = getCurrentPages(), i = a[a.length - 1], n = {
            params: i.options || null,
            url: i.route
        };
        if (n.params.hasOwnProperty("scene")) {
            var o = {}, s = decodeURIComponent(n.params.scene).split("&").shift().split("=");
            o.id = s[1], n.params = o;
        }
        this.setCache("routeData", n);
        this.getCache("userinfo");
        wx.getSetting({
            success: function(a) {
                a.authSetting["scope.userInfo"] ? e.get("member", {}, function(e) {
                    e.error && wx.navigateTo({
                        url: t
                    });
                }) : wx.navigateTo({
                    url: t
                });
            }
        });
    },
    requirejs: function(e) {
        return require("utils/" + e + ".js");
    },
    getConfig: function() {
        if (null !== this.globalData.api) return {
            api: this.globalData.api,
            approot: this.globalData.approot,
            appid: this.globalData.appid
        };
        var e = wx.getExtConfigSync();
        return this.globalData.api = e.config.api, this.globalData.approot = e.config.approot, 
        this.globalData.appid = e.config.appid, e.config;
    },
    getCache: function(e, t) {
        var a = +new Date() / 1e3, i = "";
        a = parseInt(a);
        try {
            (i = wx.getStorageSync(e + this.globalData.appid)).expire > a || 0 == i.expire ? i = i.value : (i = "", 
            this.removeCache(e));
        } catch (e) {
            i = void 0 === t ? "" : t;
        }
        return i = i || "";
    },
    setCache: function(e, t, a) {
        var i = +new Date() / 1e3, n = !0, o = {
            expire: a ? i + parseInt(a) : 0,
            value: t
        };
        try {
            wx.setStorageSync(e + this.globalData.appid, o);
        } catch (e) {
            n = !1;
        }
        return n;
    },
    removeCache: function(e) {
        var t = !0;
        try {
            wx.removeStorageSync(e + this.globalData.appid);
        } catch (e) {
            t = !1;
        }
        return t;
    },
    close: function() {
        this.globalDataClose.flag = !0, wx.reLaunch({
            url: "/pages/index/index"
        });
    },
    getSet: function() {
        var t = this;
        "" == t.getCache("cacheset") && setTimeout(function() {
            var a = t.getCache("cacheset");
            e.get("cacheset", {
                version: a.version
            }, function(e) {
                e.update && t.setCache("cacheset", e.data);
            });
        }, 10);
    },
    url: function(e) {
        e = e || {};
        var t, a, i = {}, n = this.getCache("usermid");
        for (var o in t = e.mid || "", a = e.merchid || "", n) void 0 !== n[o] && (i[o] = n[o]);
        "" != n ? ("" != n.mid && void 0 !== n.mid || (i.mid = t), "" != n.merchid && void 0 !== n.merchid || (i.merchid = a)) : (i.mid = t, 
        i.merchid = a), this.setCache("usermid", i);
    },
    impower: function(e, t, a) {
        wx.getSetting({
            success: function(i) {
                i.authSetting["scope." + e] || wx.showModal({
                    title: "用户未授权",
                    content: "您点击了拒绝授权，暂时无法" + t + "，点击去设置可重新获取授权喔~",
                    confirmText: "去设置",
                    success: function(e) {
                        e.confirm ? wx.openSetting({
                            success: function(e) {}
                        }) : "route" == a ? wx.switchTab({
                            url: "/pages/index/index"
                        }) : "details" == a || wx.navigateTo({
                            url: "/pages/index/index"
                        });
                    }
                });
            }
        });
    },


    getUrl: function(e) {
        var t = this.globalData.url;
        e.setData({
            url: t
        });
        var n = this;
        t || n.util.request({
            url: "entry/wxapp/attachurl",
            success: function(t) {
                n.globalData.url = t.data, n.getUrl(e);
            }
        });
    },
     getSystem: function(e) {
        var t = this.globalData.color, n = this.globalData.system;
        t && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: t
        }), e.setData({
            color: t,
            platform: n
        });
        var a = this;
        t || a.util.request({
            url: "entry/wxapp/GetSystem",
            success: function(t) {
                console.log(t), -1 < t.data.jd_custom.indexOf("查询") && (t.data.jd_custom = t.data.jd_custom.replace("查询", "")), 
                a.globalData.color = t.data.color, a.globalData.system = t.data, a.getSystem(e);
            }
        });
    },
    getUserInfo: function(o) {
        var n = this;
        wx.login({
            success: function(t) {
                n.util.request({
                    url: "entry/wxapp/Openid",
                    cachetime: "0",
                    data: {
                        code: t.code
                    },
                    success: function(t) {
                        getApp().session_key = t.data.session_key, getApp().OpenId = t.data.openid, getApp().getSK = t.data.session_key;
                        var e = t.data.openid;
                        wx.getSetting({
                            success: function(t) {
                                1 != t.authSetting["scope.userInfo"] ? n.util.request({
                                    url: "entry/wxapp/login",
                                    cachetime: "0",
                                    data: {
                                        openid: e,
                                        img: "",
                                        name: ""
                                    },
                                    success: function(t) {
                                        getApp().getuniacid = t.data.uniacid, getApp().user_info = t.data, wx.setStorageSync("userInfo", t.data), 
                                        o(t.data);
                                        var e = getCurrentPages(), n = e[e.length - 1], a = n.route;
                                        n.options;
                                        "zh_jdgjb/pages/index/index" != a && "zh_jdgjb/pages/logs/logs" != a && wx.navigateTo({
                                            url: "../login"
                                        });
                                    }
                                }) : wx.getUserInfo({
                                    withCredentials: !1,
                                    success: function(t) {
                                        n.util.request({
                                            url: "entry/wxapp/login",
                                            cachetime: "0",
                                            data: {
                                                openid: e,
                                                img: t.userInfo.avatarUrl,
                                                name: t.userInfo.nickName
                                            },
                                            success: function(t) {
                                                getApp().getuniacid = t.data.uniacid, getApp().user_info = t.data, wx.setStorageSync("userInfo", t.data), 
                                                o(t.data);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    getUserinfo: function(t) {
        if ("" != wx.getStorageSync("userInfo").img) return !0;
        wx.showModal({
            title: "温馨提示",
            content: "您需要授权才能正常使用小程序",
            success: function(t) {
                t.confirm ? wx.navigateTo({
                    url: "../login"
                }) : getApp().getUserinfo();
            }
        });
    },
    max: function(t) {
        t = t[0];
        for (var e = t.length, n = 1; n < e; n++) t[n] > t && (t = t[n]);
        return t;
    },
    today_time: function(t) {
        var e = new Date(), n = e.getMonth() + 1, a = e.getDate();
        return 1 <= n && n <= 9 && (n = "0" + n), 0 <= a && a <= 9 && (a = "0" + a), e.getFullYear() + "-" + n + "-" + a + " " + e.getHours() + ":" + e.getMinutes() + ":" + e.getSeconds();
    },
    hours_time: function(t, e) {
        var n = new Date(t.replace("-", "/")), a = 60 * (e = Number(e));
        return n.setMinutes(n.getMinutes() + a, n.getSeconds(), 0), n.getFullYear() + "-" + (n.getMonth() + 1) + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();
    },
    today: function() {
        var t = new Date(), e = t.getFullYear(), n = t.getMonth() + 1, a = t.getDate();
        return 1 <= n && n <= 9 && (n = "0" + n), 0 <= a && a <= 9 && (a = "0" + a), e + "-" + n + "-" + a;
    },
    ormatDate: function(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "-" + n(e.getMonth() + 1, 2) + "-" + n(e.getDate(), 2) + " " + n(e.getHours(), 2) + ":" + n(e.getMinutes(), 2) + ":" + n(e.getSeconds(), 2);
        function n(t, e) {
            for (var n = "" + t, a = n.length, o = "", r = e; r-- > a; ) o += "0";
            return o + n;
        }
    },
    sort_price_Reverse: function(t, e) {
        return t.zd_money - e.zd_money;
    },
    sort_price_order: function(t, e) {
        return e.zd_money - t.zd_money;
    },
    sort_num_order: function(t, e) {
        return t - e;
    },
    sort_distance_order: function(t, e) {
        return t.distance - e.distance;
    },
    sort_distance_Reverse: function(t, e) {
        return e.distance - t.distance;
    },
    time_title: function(t, e) {
        return !(e <= t) || (wx.showModal({
            title: "",
            content: "时间选择错误"
        }), !1);
    },
    getTime2Time: function(t, e) {
        t = t, e = e;
        return ((t = Date.parse(t) / 1e3) - (e = Date.parse(e) / 1e3)) / 86400;
    },
    getSys: function() {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                e.globalData.sysInfo = t, e.globalData.windowW = t.windowWidth, e.globalData.windowH = t.windowHeight;
            }
        });
    },




    iwebsocket: require("static/js/utils/websocket.js"),
    utilwmall: require("static/js/utils/util.js"),
    Lang: require("static/js/utils/lang.js"),
    WxParse: require("./library/wxParse/wxParse.js"),
    ext: {
        siteInfo: {
            uniacid: "1",
            acid: "1",
          siteroot: "https://app.uhuoduo.com/app/wxapp.php",
          sitebase: "https://app.uhuoduo.com/app",
            module: "we7_wmall"
        },
        diy: {
            home: 0
        }
    },
    menu: {
        css: {},
        params: {
            navstyle: 0
        },
        position: {
            bottom: "80px",
            right: "10px",
            left: "inherit"
        },
        data: [ {
            link: "pages/home/index",
            icon: "icon-home",
            text: "首页"
        }, {
            link: "pages/order/index",
            icon: "icon-order",
            text: "订单"
        }, {
            link: "pages/member/mine",
            icon: "icon-mine",
            text: "我的"
        } ]
    },


    


    globalDataClose: {
        flag: !1
    },
    globalData: {
      appid: "wx4aa467f25a324ba3",
      api: "https://app.uhuoduo.com/app/ewei_shopv2_api.php?i=1",
      approot: "https://app.uhuoduo.com/addons/ewei_shopv2/",
      userInfo: null,
      isgoods: false
    }
});