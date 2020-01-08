var app = getApp();

Page({
    data: {
        activeIndex: 0
    },
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), app.util.request({
            url: "entry/wxapp/GetSystem",
            success: function(t) {
                -1 < t.data.jd_custom.indexOf("查询") && (t.data.jd_custom = t.data.jd_custom.replace("查询", "")), 
                a.setData({
                    luntext: [ "房型列表", t.data.jd_custom + "详情", t.data.jd_custom + "评价" ]
                });
            }
        }), a.date(), a.setData({
            grade: wx.getStorageSync("platform").open_member
        });
        a.data.text;
        var e = decodeURIComponent(t.scene);
        if (null == t.hotel_id) var i = e; else i = t.hotel_id;
        console.log("酒店id为", i), a.setData({
            hotel_id: i,
            start: app.util.time(),
            end: app.util.addDate(app.util.time(), 28)
        }), a.refresh();
    },
    date: function(t) {
        var a = wx.getStorageSync("day1"), e = wx.getStorageSync("day2"), i = wx.getStorageSync("day"), d = app.util.time();
        if (wx.setStorageSync("datein", o), "" == a) {
            var o = app.util.time();
            wx.setStorageSync("datein", o);
        } else if (a < d) o = d; else o = a;
        if ("" == e) var r = app.util.addDate(d, 1); else {
            var n = app.util.addDate(d, 1);
            if (e < n) r = n; else r = e;
        }
        i = app.util.day(r, o);
        wx.setStorageSync("day1", o), wx.setStorageSync("day2", r), wx.setStorageSync("day", i), 
        this.setData({
            datein: o,
            dateout: r,
            time: i,
            current_date: o
        });
    },
    refresh: function(t) {
        var d = this, a = d.data.hotel_id, o = d.data.day1;
        app.util.request({
            url: "entry/wxapp/PjDetails",
            cachetime: "0",
            data: {
                seller_id: a
            },
            success: function(t) {
                9 <= t.data.address.length && (t.data.address = t.data.address.slice(0, 9) + "..."), 
                d.setData({
                    hotel: t.data
                });
            }
        });
        o = wx.getStorageSync("day1");
        var r = app.util.addDate(o, 1);
        app.util.request({
            url: "entry/wxapp/RoomList",
            cachetime: "0",
            data: {
                seller_id: a
            },
            success: function(t) {
                var e = t.data, a = function(a) {
                    app.util.request({
                        url: "entry/wxapp/GetRoomCost",
                        data: {
                            room_id: e[a].id,
                            start: o,
                            end: r
                        },
                        success: function(t) {
                            e[a].cost = t.data[0].mprice, d.setData({
                                room: e
                            });
                        }
                    }), app.util.request({
                        url: "entry/wxapp/GetRoomNum",
                        data: {
                            room_id: e[a].id,
                            start: o,
                            end: r
                        },
                        success: function(t) {
                            e[a].room_num = t.data[0].nums, d.setData({
                                room: e
                            });
                        }
                    });
                };
                for (var i in e) a(i);
            }
        }), app.util.request({
            url: "entry/wxapp/AssessList",
            cachetime: "0",
            data: {
                seller_id: a
            },
            success: function(t) {
                for (var a in t.data) "" != t.data[a].img && (t.data[a].img = t.data[a].img.split(",")), 
                t.data[a].time = app.ormatDate(t.data[a].time).slice(0, 10), t.data[a].content = t.data[a].content.replace("↵", "\n");
                d.setData({
                    assess_list: t.data.slice(0, 5)
                });
            }
        });
    },
    tabClick: function(t) {
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    bindDateChange1: function(t) {
        var a = this, e = t.detail.value, i = (a.data.dateout, a.data.current_date, app.util.addDate(e, 1));
        wx.setStorageSync("day1", e), wx.setStorageSync("day2", i), wx.setStorageSync("day", d);
        var d = app.getTime2Time(i, e);
        a.setData({
            datein: t.detail.value,
            dateout: i,
            time: d
        }), this.refresh();
    },
    bindDateChange2: function(t) {
        var a = this.data.datein, e = t.detail.value, i = app.getTime2Time(e, a);
        wx.setStorageSync("day1", a), wx.setStorageSync("day2", e), wx.setStorageSync("day", i), 
        this.setData({
            dateout: t.detail.value,
            time: i
        });
    },
    room_info: function(t) {
        this.data.hotel.id;
        var a = this.data.hotel, e = a.tel, i = a.coordinates, d = a.address, o = a.name;
        wx.navigateTo({
            url: "room_info?coordinates=" + i + "&room_id=" + t.currentTarget.dataset.id + "&tel=" + e + "&address=" + d + "&name=" + o + "&price=" + t.currentTarget.dataset.price
        });
    },
    order: function(t) {},
    all_comment: function(t) {
        wx.navigateTo({
            url: "all_comment?seller_id=" + this.data.hotel_id
        });
    },
    sele_address: function(t) {
        var i = this.data.hotel, d = i.coordinates.split(",");
        wx.getLocation({
            type: "gcj02",
            success: function(t) {
                var a = Number(d[0]), e = Number(d[1]);
                wx.openLocation({
                    latitude: a,
                    longitude: e,
                    name: i.name,
                    address: i.address
                });
            }
        });
    },
    call_phone: function(t) {
        wx.makePhoneCall({
            phoneNumber: this.data.hotel.tel
        });
    },
    previewImage: function(t) {
        var a = this.data.url, e = [], i = t.currentTarget.id, d = t.currentTarget.dataset.index, o = this.data.assess_list;
        for (var r in o) if (i == o[r].id) var n = o[r].img;
        for (var s in n) e.push(a + n[s]);
        wx.previewImage({
            current: a + n[d],
            urls: e
        });
    },
    formSubmit: function(t) {
        var a = t.detail.formId, e = this.data.grade, i = this.data.userInfo;
        if (1 == e && "" == i.zs_name) wx.showModal({
            content: "您需要注册会员",
            success: function(t) {
                t.confirm && wx.navigateTo({
                    url: "../register/register"
                });
            }
        }); else {
            var d = wx.getStorageSync("day1"), o = wx.getStorageSync("day2");
            1 == app.time_title(d, o) && (1 == t.detail.target.dataset.classify ? wx.navigateTo({
                url: "../place_order/place_order?room_id=" + t.detail.target.dataset.id + "&hotel_id=" + this.data.hotel_id + "&form_d=" + a
            }) : wx.navigateTo({
                url: "hour_room?room_id=" + t.detail.target.dataset.id + "&hotel_id=" + this.data.hotel_id + "&form_d=" + a + "&cost=" + t.detail.target.dataset.cost + "&rz_time=" + t.detail.target.dataset.rz_time
            }));
        }
    },
    hotel_in: function(t) {
        wx.navigateTo({
            url: "hotel_in?seller_id=" + t.currentTarget.dataset.id
        });
    },
    bindgetuserinfo: function(t) {
        "getUserInfo:fail auth deny" == t.detail.errMsg && wx.showModal({
            title: "",
            content: "您拒绝了个人信息授权，无法正常使用小程序"
        });
    },
    onReady: function() {},
    onShow: function() {
        var a = this;
        app.getUserInfo(function(t) {
            a.setData({
                userInfo: t
            });
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        return {
            title: this.data.hotel.name,
            path: "zh_jdgjb/pages/hotel_list/hotel_info?hotel_id=" + this.data.hotel.id
        };
    }
});