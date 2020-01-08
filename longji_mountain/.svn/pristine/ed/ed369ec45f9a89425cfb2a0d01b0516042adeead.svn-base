var t = getApp();

Page({
    data: {
        getCode: !0,
        code: {
            text: "获取验证码",
            downcount: 60
        },
        submitting: !1,
        Lang: t.Lang,
        wuiLoading: {
            show: !0,
            img: t.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(a) {
        var e = this;
        t.utilwmall.request({
            url: "wmall/store/settle/account",
            success: function(a) {
                t.utilwmall.loaded(), -1 != a.data.message.errno ? -1e3 == a.data.message.errno ? wx.redirectTo({
                    url: "application"
                }) : e.setData(a.data.message.message) : t.utilwmall.toast(a.data.message.message);
            }
        });
    },
    onMobile: function(t) {
        this.setData({
            mobile: t.detail.value
        });
    },
    onCaptcha: function(t) {
        this.setData({
            store_captcha: t.detail.value
        });
    },
    onSelectAgent: function(t) {
        var a = t.detail.value;
        this.setData({
            agent: this.data.agents[a]
        });
    },
    getCode: function() {
        var a = this, e = a.data.code;
        if (!a.data.getCode) return !1;
        if (!a.data.mobile) return t.utilwmall.toast("手机号不能为空"), !1;
        if (!t.utilwmall.isMobile(a.data.mobile)) return t.utilwmall.toast("手机号格式错误"), !1;
        if (!a.data.store_captcha) return t.utilwmall.toast("请输入图形验证码"), !1;
        var s = {
            mobile: a.data.mobile,
            captcha: a.data.store_captcha
        };
        t.utilwmall.request({
            url: "system/common/code",
            data: s,
            method: "POST",
            success: function(s) {
                var i = s.data.message;
                if (i.errno) return t.utilwmall.toast(i.message), -10 == i.errno && a.onRefreshCaptcha(), 
                !1;
                e.text = e.downcount + "秒后重新获取", a.setData({
                    code: e,
                    getCode: !1
                });
                var o = setInterval(function() {
                    e.downcount--, e.downcount <= 0 ? (clearInterval(o), e.text = "获取验证码", e.downcount = 60, 
                    a.setData({
                        getCode: !0
                    })) : e.text = e.downcount + "秒后重新获取", a.setData({
                        code: e
                    });
                }, 1e3);
                t.utilwmall.toast("验证码发送成功, 请注意查收");
            }
        });
    },
    onSubmit: function(a) {
        var e = this;
        if (e.data.submitting) return !1;
        if (!a.detail.value.mobile) return t.utilwmall.toast("手机号不能为空"), !1;
        if (!t.utilwmall.isMobile(a.detail.value.mobile)) return t.utilwmall.toast("手机号格式错误"), !1;
        if ("1" == e.data.mobile_verify_status) {
            if (!a.detail.value.code) return t.utilwmall.toast("请输入短信验证码"), !1;
            if (!e.data.store_captcha) return t.utilwmall.toast("请输入图形验证码"), !1;
        }
        if (!a.detail.value.password) return t.utilwmall.toast("密码不能为空"), !1;
        var s = a.detail.value.password.length;
        if (s < 8 || s > 20) return t.utilwmall.toast("请输入8-20位密码"), !1;
        if (!/[0-9]+[a-zA-Z]+[0-9a-zA-Z]*|[a-zA-Z]+[0-9]+[0-9a-zA-Z]*/.test(a.detail.value.password)) return t.utilwmall.toast("密码必须由数字和字母组合"), 
        !1;
        if (!a.detail.value.repassword) return t.utilwmall.toast("请重复输入密码"), !1;
        if (a.detail.value.password != a.detail.value.repassword) return t.utilwmall.toast("两次密码输入不一致"), 
        !1;
        if (!a.detail.value.title) return t.utilwmall.toast("请输入姓名"), !1;
        var i = 0;
        if (e.data.isagent > 0 && !(i = e.data.agent.id)) return t.utilwmall.toast("请选择所属区域"), 
        !1;
        var o = {
            mobile: a.detail.value.mobile,
            code: a.detail.value.code,
            password: a.detail.value.password,
            repassword: a.detail.value.repassword,
            title: a.detail.value.title,
            agentid: i
        };
        e.data.submitting = !0, t.utilwmall.request({
            url: "wmall/store/settle/account",
            data: o,
            method: "POST",
            success: function(a) {
                -1e3 == a.data.message.errno ? (t.utilwmall.toast(a.data.message.message), e.onLoad()) : (t.utilwmall.toast(a.data.message.message), 
                a.data.message.errno && (e.data.submitting = !1));
            }
        });
    },
    onRefreshCaptcha: function() {
        var a = this;
        t.utilwmall.request({
            url: "wmall/store/settle/captcha",
            success: function(t) {
                a.setData({
                    captcha: t.data.message.message.captcha
                });
            }
        });
    }
});