var city = require("../../utils/city.js"), app = getApp(), QQMapWX = require("../../lib/qqmap-wx-jssdk.js"), qqmapsdk = void 0;

Page({
    data: {
        searchLetter: [],
        showLetter: "",
        winHeight: 0,
        cityList: [],
        isShowLetter: !1,
        scrollTop: 0,
        scrollTopId: "",
        city: "杭州市",
        currentCityCode: "",
        hotcityList: [ {
            cityCode: 11e4,
            city: "北京市"
        }, {
            cityCode: 31e4,
            city: "上海市"
        }, {
            cityCode: 440100,
            city: "广州市"
        }, {
            cityCode: 440300,
            city: "深圳市"
        }, {
            cityCode: 330100,
            city: "杭州市"
        }, {
            cityCode: 320100,
            city: "南京市"
        }, {
            cityCode: 420100,
            city: "武汉市"
        }, {
            cityCode: 12e4,
            city: "天津市"
        }, {
            cityCode: 610100,
            city: "西安市"
        } ],
        commonCityList: [ {
            cityCode: 11e4,
            city: "北京市"
        }, {
            cityCode: 31e4,
            city: "上海市"
        } ],
        countyList: [ {
            cityCode: 11e4,
            county: "A区"
        }, {
            cityCode: 31e4,
            county: "B区"
        }, {
            cityCode: 440100,
            county: "C区"
        }, {
            cityCode: 440300,
            county: "D区"
        }, {
            cityCode: 330100,
            county: "E县"
        }, {
            cityCode: 320100,
            county: "F县"
        }, {
            cityCode: 420100,
            county: "G县"
        } ],
        inputName: "",
        completeList: [],
        county: ""
    },
    onLoad: function(t) {
        var e = city.searchLetter, o = city.cityList(), i = wx.getSystemInfoSync();
        console.log(i);
        var c = i.windowHeight, n = c / e.length, a = [];
        app.getSystem(this), e.map(function(t, e) {
            var o = {};
            o.name = t, o.tHeight = e * n, o.bHeight = (e + 1) * n, a.push(o);
        }), this.setData({
            dqwz: t.cityName,
            city: t.cityName,
            color: wx.getStorageSync("platform").color,
            winHeight: c,
            itemH: n,
            searchLetter: a,
            cityList: o
        }), qqmapsdk = new QQMapWX({
            key: wx.getStorageSync("platform").map_key
        }), this.getLocation();
    },
    close: function() {
        this.setData({
            completeList: []
        });
    },
    getLocation: function() {
        var e = this;
        wx.showToast({
            title: "定位中",
            icon: "loading"
        }), wx.getLocation({
            type: "wgs84",
            success: function(t) {
                console.log(t), qqmapsdk.reverseGeocoder({
                    coord_type: 1,
                    location: {
                        latitude: t.latitude,
                        longitude: t.longitude
                    },
                    success: function(t) {
                        console.log(t), wx.hideToast(), e.setData({
                            dqwz: t.result.address_component.city
                        });
                    },
                    fail: function(t) {
                        console.log(t);
                    },
                    complete: function(t) {
                        console.log(t);
                    }
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    clickLetter: function(t) {
        console.log(t.currentTarget.dataset.letter);
        var e = t.currentTarget.dataset.letter;
        this.setData({
            toastShowLetter: e,
            isShowLetter: !0,
            scrollTopId: e
        });
        var o = this;
        setTimeout(function() {
            o.setData({
                isShowLetter: !1
            });
        }, 500);
    },
    getCity: function(t) {
        var e = getCurrentPages(), o = e[e.length - 2];
        o.setData({
            weizhi: t.currentTarget.dataset.city
        }), wx.setStorageSync("cityName", t.currentTarget.dataset.city), "zh_jdgjb/pages/hotel_list/hotel_list" == o.route && (o.setData({
            page: 1,
            hotel: []
        }), o.refresh()), wx.navigateBack({}), console.log(t.currentTarget.dataset.city);
    },
    bindCity: function(t) {
        this.setData({
            county: "",
            city: t.currentTarget.dataset.city,
            scrollTop: 0,
            completeList: []
        });
    },
    bindCounty: function(t) {
        console.log("bindCounty"), console.log(t), this.setData({
            county: t.currentTarget.dataset.city
        });
    },
    hotCity: function() {
        console.log("hotCity"), this.setData({
            scrollTop: 0
        });
    },
    bindScroll: function(t) {},
    toUnicodeFun: function(t) {
        if ("" == t || void 0 === t) return "请输入汉字";
        for (var e = "", o = 0; o < t.length; o++) e += "\\u" + t.charCodeAt(o).toString(16);
        return e;
    },
    bindKeyInput: function(e) {
        console.log(e.detail.value, e.detail.value.length, this.toUnicodeFun(e.detail.value));
        var t = city.cityObj.filter(function(t) {
            return -1 < t.city.substring(0, e.detail.value.length).indexOf(e.detail.value);
        });
        0 != e.detail.value.trim().length ? (this.setData({
            completeList: t
        }), console.log(t)) : this.setData({
            completeList: []
        });
    },
    auto: function() {
        var o = this.data.inputName.toLowerCase(), i = o.length, t = city.cityObjs, c = [], e = t.filter(function(t) {
            var e = t.short.slice(0, i);
            return e && e == o;
        }), n = t.filter(function(t) {
            var e = t.shorter.slice(0, i);
            return e && e == o;
        });
        if (e[0]) e.map(function(t) {
            var e = {};
            e.city = t.city, e.code = t.code, c.push(e);
        }), this.setData({
            completeList: c
        }), console.log(this.data.completeList); else {
            if (!n[0]) return;
            n.map(function(t) {
                var e = {};
                e.city = t.city, e.code = t.code, c.push(e);
            }), this.setData({
                completeList: c
            }), console.log(this.data.completeList);
        }
    }
});