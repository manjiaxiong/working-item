var t = getApp();

Page({
    data: {
        store_id: 0,
        thumbs: [],
        tempThumbs: [],
        Lang: t.Lang,
        wuiLoading: {
            show: !0,
            img: t.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(e) {
        var i = this;
        if (!e.sid) return t.utilwmall.toast("参数错误"), !1;
        t.utilwmall.request({
            url: "wmall/store/report/index",
            data: {
                sid: e.sid
            },
            success: function(e) {
                t.utilwmall.loaded();
                var s = e.data.message;
                s.errno ? t.utilwmall.toast(s.message) : (i.data.store_id = s.message.store.id, i.setData({
                    reports: s.message.reasons,
                    store_title: s.message.store.title,
                    member_mobile: s.message.member.mobile
                }));
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {},
    onSubmit: function(e) {
        var i = this, s = e.detail.value;
        if (!s.title) return t.utilwmall.toast("投诉类型不能为空", "", 1e3), !1;
        if (!s.note) return t.utilwmall.toast("描述信息不能为空", "", 1e3), !1;
        var a = i.data.thumbs;
        if (a.length > 0) for (var o = 0; o < a.length; o++) {
            var n = {
                image: a[o].filename || a[o].image,
                url: ""
            };
            i.data.tempThumbs.push(n);
        }
        var r = i.data.tempThumbs;
        if (!s.mobile) return t.utilwmall.toast("手机号码不能为空", "", 1e3), !1;
        s.sid = i.data.store_id, t.utilwmall.request({
            url: "wmall/store/report/post",
            data: {
                sid: s.sid,
                title: s.title,
                note: s.note,
                thumbs: JSON.stringify(r),
                mobile: s.mobile,
                formid: e.detail.formId
            },
            success: function(e) {
                var i = e.data.message;
                if (t.utilwmall.toast(i.message), i.errno) return !1;
                t.utilwmall.toast("投诉成功", "./index?sid=" + s.sid, 1e3);
            }
        });
    },
    onJsEvent: function(e) {
        t.utilwmall.jsEvent(e);
    }
});