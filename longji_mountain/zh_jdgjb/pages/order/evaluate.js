var app = getApp(), siteinfo = require("../../../siteinfo.js");

Page({
    data: {
        length: 0,
        imgArray1: [],
        imgs: []
    },
    onLoad: function(t) {
        var a = this;
        app.getUrl(a), app.getSystem(a), a.setData({
            seller_id: t.seller_id,
            order_id: t.order_id
        }), app.getUserInfo(function(t) {
            a.setData({
                user_id: t.id
            });
        });
    },
    textarea: function(t) {
        var a = t.detail.cursor;
        "" != t.detail.value && this.setData({
            length: a,
            value: t.detail.value
        });
    },
    img_array: function(t) {
        var e = this, i = e.data.imgArray1;
        if (9 <= i.length) wx.showModal({
            title: "",
            content: "最多上传9张图片"
        }); else {
            siteinfo.siteroot;
            var a = 9 - i.length;
            wx.chooseImage({
                count: a,
                sizeType: [ "compressed" ],
                sourceType: [ "album", "camera" ],
                success: function(t) {
                    var a = t.tempFilePaths;
                    i = i.concat(a), e.setData({
                        imgArray1: i
                    });
                }
            });
        }
    },
    uploadimg: function(t) {
        var a = this, e = a.data.imgs, i = t.i ? t.i : 0, s = t.success ? t.success : 0, o = t.fail ? t.fail : 0;
        wx.uploadFile({
            url: t.url,
            filePath: t.path[i],
            name: "upfile",
            formData: null,
            success: function(t) {
                "" != t.data ? (s++, e.push(t.data), 0 < e.length ? a.setData({
                    imgs: e,
                    edit: !0
                }) : a.setData({
                    edit: !1
                })) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                });
            },
            fail: function(t) {
                o++;
            },
            complete: function() {
                ++i == t.path.length ? (a.setData({
                    images: t.path,
                    upLoadSucess: !0
                }), a.place_order()) : (t.i = i, t.success = s, t.fail = o, a.uploadimg(t));
            }
        });
    },
    delete: function(t) {
        var a = t.currentTarget.dataset.index, e = this.data.imgArray1;
        e.splice(a, 1), this.setData({
            imgArray1: e
        });
    },
    submit: function(t) {
        var a = this;
        wx.showToast({
            icon: "loading",
            title: "正在上传"
        }), 0 == a.data.imgArray1.length ? a.place_order() : a.uploadimg({
            url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=Upload&m=zh_jdgjb",
            path: a.data.imgArray1
        });
    },
    place_order: function(t) {
        var a = this, e = a.data.imgs.join(","), i = a.data.value;
        i = i.replace("\n", "↵");
        var s = a.data.user_id, o = a.data.seller_id, n = a.data.order_id;
        app.util.request({
            url: "entry/wxapp/SaveAssess",
            data: {
                user_id: s,
                img: e || "",
                content: i,
                order_id: n,
                seller_id: o
            },
            success: function(t) {
                1 == t.data ? (wx.hideToast(), wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 2
                    });
                }, 1500)) : (wx.hideToast(), wx.showModal({
                    title: "",
                    content: "系统出差了，待会再试一下"
                }));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        this.setData({
            imgArray1: []
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});