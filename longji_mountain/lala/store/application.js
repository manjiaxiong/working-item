var t = getApp();

Page({
    data: {
        business: [],
        service: [],
        more1: [],
        submitting: !1,
        Lang: t.Lang,
        wuiLoading: {
            show: !0,
            img: t.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onJsEvent: function(e) {
        t.utilwmall.jsEvent(e);
    },
    onLoad: function(e) {
        var s = this;
        t.utilwmall.request({
            url: "wmall/store/settle/store",
            success: function(e) {
                t.utilwmall.loaded();
                var i = e.data.message;
                -1e3 == i.errno ? (t.utilwmall.toast(i.message), wx.redirectTo({
                    url: "settle"
                })) : -1001 == i.errno ? t.utilwmall.imessage(i.message.message, "switchTab:/lala/member/mine", "info") : -1 == i.errno ? (t.utilwmall.toast(i.message.message), 
                wx.redirectTo({
                    url: "../member/mine"
                })) : 0 == i.errno ? t.utilwmall.imessage(i.message.message, "switchTab:/lala/home/index", "success") : s.setData({
                    config: i.message.config
                });
            }
        });
    },
    onSubmit: function(e) {
        var s = this;
        if (s.data.submitting) return !1;
        var i = e.detail.value;
        if (!i.title) return t.utilwmall.toast("商户名称不能为空"), !1;
        if (!i.address) return t.utilwmall.toast("商户地址不能为空"), !1;
        if (!i.telephone) return t.utilwmall.toast("联系电话不能为空"), !1;
        if (!t.utilwmall.isMobile(i.telephone)) return t.utilwmall.toast("手机号格式错误", "", "1000"), !1;
        if (1 == s.data.config.qualification_verify_status && !s.data.business.length) return t.utilwmall.toast("请上传营业执照照片", "", "1000"), 
        !1;
        var n = {
            telephone: i.telephone,
            address: i.address,
            content: i.content,
            title: i.title,
            qualification: JSON.stringify({
                0: s.data.business[0],
                1: s.data.service[0],
                2: s.data.more1[0]
            })
        };
        s.data.submitting = !0, t.utilwmall.request({
            url: "wmall/store/settle/store",
            data: n,
            method: "POST",
            success: function(t) {
                s.data.submitting = !1, s.onLoad();
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});