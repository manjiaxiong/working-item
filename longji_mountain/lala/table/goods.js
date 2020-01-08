var a = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var t = "/tangshi/lala/table/goods";
        e && (e.scene && (t += "?scene=" + e.scene), e.cart_id && (t += "&cart_id=" + e.cart_id)), 
        a.utilwmall.jump2url(t);
    }
});