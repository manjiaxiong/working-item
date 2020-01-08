var a = getApp();

Page({
    data: {
        zhezhaoShow: !1,
        failedTipsStatus: !1,
        Lang: a.Lang,
        wuiLoading: {
            show: !0,
            img: a.utilwmall.getStorageSync("theme.loading.img")
        }
    },
    onLoad: function(a) {
        var t = this;
        a && (t.data.sid = a.sid, a.pindan_id >= 0 && (t.data.pindan_id = a.pindan_id));
    },
    onGetPindan: function() {
        var t = this;
        a.utilwmall.request({
            url: "wmall/store/goods/pindan",
            data: {
                sid: t.data.sid,
                pindan_id: t.data.pindan_id
            },
            success: function(n) {
                a.utilwmall.loaded();
                var i = n.data.message;
                if (i.errno) return -1e3 == i.errno ? (a.utilwmall.toast(i.message, "/lala/store/pindan?sid=" + t.data.sid + "&pindan_id=0", 1500), 
                !1) : (-1001 == i.errno ? t.setData({
                    failedTipsStatus: !0,
                    failedTips: {
                        type: "message",
                        tips: i.message,
                        btnText: "自己点菜",
                        link: "pages/home/index"
                    }
                }) : a.utilwmall.toast(i.message), !1);
                i = i.message, t.setData({
                    pindan: i.pindan,
                    store: i.store,
                    extra: i.extra,
                    pindan_id: i.pindan.pindan_id,
                    cartSendCondition: i.cartSendCondition,
                    sharedata: i.sharedata
                });
            }
        });
    },
    onTakePindan: function() {
        var t = this;
        a.utilwmall.request({
            url: "wmall/store/goods/takePartPindan",
            data: {
                sid: t.data.sid,
                pindan_id: t.data.pindan_id
            },
            success: function(n) {
                var i = n.data.message;
                if (i.errno) return a.utilwmall.toast(i.message), t.data.pindan_id = 0, t.onGetPindan(), 
                !1;
                a.utilwmall.jump2url("/lala/store/goods?sid=" + t.data.sid + "&pindan_id=" + t.data.pindan_id, "redirectTo");
            }
        });
    },
    onGiveUp: function(t) {
        var n = this, i = t.currentTarget.dataset.id, e = "确定不要继续拼单了吗？";
        1 == n.data.extra.is_founder && (e = "删除后不可恢复，确认删除吗？"), wx.showModal({
            title: "",
            content: e,
            success: function(t) {
                t.confirm ? a.utilwmall.request({
                    url: "wmall/store/goods/giveupPindan",
                    data: {
                        sid: n.data.sid,
                        cart_id: i
                    },
                    success: function(t) {
                        var i = t.data.message;
                        if (i.errno) return -1e3 == i.errno ? (a.utilwmall.toast("取消拼单成功", "redirect:/lala/store/goods?sid=" + n.data.sid, 1e3), 
                        !1) : (a.utilwmall.toast(i.message), !1);
                        i = i.message, n.setData({
                            pindan: i.pindan,
                            cartSendCondition: i.cartSendCondition,
                            "extra.not_takepart": i.extra.not_takepart
                        });
                    }
                }) : t.cancel;
            }
        });
    },
    onContinue: function() {
        var t = this;
        a.utilwmall.request({
            url: "wmall/store/goods/continuePindan",
            data: {
                sid: t.data.sid
            },
            success: function(n) {
                var i = n.data.message;
                if (i.errno) return a.utilwmall.toast(i.message), !1;
                t.onGetPindan();
            }
        });
    },
    onEditGoods: function() {
        var t = this;
        a.utilwmall.jump2url("pages/store/goods?sid=" + t.data.store.id + "&pindan_id=" + t.data.pindan_id, "redirectTo");
    },
    onSubmit: function() {
        var t = this;
        wx.showModal({
            title: "温馨提示",
            content: "去结算后其他用户不可加入，确定去结算吗？",
            success: function(n) {
                n.confirm ? a.utilwmall.jump2url("/lala/order/create?sid=" + t.data.sid + "&is_pindan=1&pindan_id=" + t.data.pindan.pindan_id) : n.cancel;
            }
        });
    },
    onChangeZhezhao: function() {
        var a = this;
        a.setData({
            zhezhaoShow: !a.data.zhezhaoShow
        });
    },
    onShow: function() {
        this.onGetPindan();
    },
    onPullDownRefresh: function() {
        this.onGetPindan(), wx.stopPullDownRefresh();
    },
    onShareAppMessage: function() {
        return this.data.sharedata;
    },
    onJsEvent: function(t) {
        a.utilwmall.jsEvent(t);
    }
});