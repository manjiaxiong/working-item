var t = getApp(), e = t.requirejs("core");

Page({
    data: {},
    onLoad: function(e) {
      console.log(t);
        t.checkAuth(), this.setData({
            options: e
        });
    },
    onShow: function() {
        this.getData();
    },
    getData: function() {
      
        var t = this;
        e.get("myabonus/index", {}, function(e) {
  // console.log(e);
          // wx.redirectTo({
          //   url: "../../myabonus/pages/register/index"
          // });

            // 7e4 != e.error ? (e.show = !0, t.setData(e), wx.setNavigationBarTitle({
            //     title: e.set.texts.center
            // })) : wx.redirectTo({
            //     url: "../../myabonus/pages/register/index"
            // });
        });
    }
});