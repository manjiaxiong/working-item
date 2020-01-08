var t = getApp(), e = t.requirejs("core");

Page({
    data: {},
    onLoad: function(e) {
        t.checkAuth(), this.setData({
            options: e
        });
        console.log(this.data)
    },
    onShow: function() {
        this.getData();
    },
    getData: function() {
        var t = this;
        e.get("myabonus/index", {}, function(e) {
          // console.log(e);
            7e4 != e.error ? (e.show = !0, t.setData(e), wx.setNavigationBarTitle({
                title: e.set.texts.center
            })) : wx.redirectTo({
                url: "pages/member/myabonus/index"
            });
            // console.log(e)
        });
    }
});