<template>
  <div>
    <div
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="around">
        <span>SEO标题</span>
        <el-input class v-model="biaoti" placeholder="请输入内容"></el-input>
      </div>
      <div class="around">
        <span>SEO关键字</span>
        <el-input class v-model="guanjian" placeholder="请输入内容"></el-input>
      </div>
      <div class="around">
        <span>SEO描述</span>
        <textarea class="qianzhi" rows="10" cols="30" v-model="miaosu"></textarea>
      </div>
    </div>
    <div class="center">
      <el-button @click="queding" type="primary">{{this.$store.state.zt.zt == "1"?'修改':'下一步'}}</el-button>
      <el-button @click="quxiao" type="info">取消</el-button>
    </div>
  </div>
</template>
<script>
import api from "@/api/shop";
export default {
  data() {
    return {
      miaosu: "",
      guanjian: "",
      biaoti: "",
      loading:false
    };
  },
  mounted() {
    if (this.$store.state.zt.zt == "1") {
      api
        .getShopId({
          id: this.$store.state.zt.Xid,
          number: 2
        })
        .then(res => {
          // SeoUpdata
          this.miaosu = res.data.data.seoDescripte;
          this.guanjian = res.data.data.seoKey;
          this.biaoti = res.data.data.seoTitle;

        });
    }else if(this.$store.state.zt.zt == "10"){
      api
        .getShopId({
          id: this.$store.state.zt.Xid,
          number: 2
        })
        .then(res => {
          // SeoUpdata
          this.miaosu = res.data.data.seoDescripte;
          this.guanjian = res.data.data.seoKey;
          this.biaoti = res.data.data.seoTitle;

        });
    }
  },
  methods: {
    queding() {
      let that = this;
      //todo 表单验证
      if (this.$store.state.zt.zt == "1") {
        this.loading = true
        api.SeoUpdata({
          id: this.$store.state.zt.Xid,
          seoTitle: that.biaoti,
          seoKey: that.guanjian,
          seoDescripte: that.miaosu
        }).then(res=>{
          console.log(res.data.code);
          if(res.data.code=='000000'){
            this.loading = false
                this.$message({
                showClose: true,
                type: "success",
                message: "seo更改成功"
              });
                      this.$parent.$parent.$parent.$parent.shuaxin();
          }
        })
        .catch(res=>{
          this.loading = false
          this.$message({
            message: "更改失败",
            type: "error"
          });
        })
      }else if(this.$store.state.zt.zt == "10"){
        this.loading = true
        api
          .setShopTwo({
            seoTitle: that.biaoti,
            seoKey: that.guanjian,
            seoDescripte: that.miaosu,
            id: that.$store.state.zt.id
          })
          .then(res => {
            console.log(res);
            if ((res.data.msg = "操作成功")) {
              this.loading = false
              this.$message({
                showClose: true,
                type: "success",
                message: "请进行下一步"
              });
                this.$parent.$parent.$parent.$parent.changeActiveName("third")
            }
          })
          .catch(res=>{
            this.loading = false
            this.$message({
              message: "添加失败",
              type: "error"
            });
          })
      }else {
        this.loading = true
        api
          .setShopTwo({
            seoTitle: that.biaoti,
            seoKey: that.guanjian,
            seoDescripte: that.miaosu,
            id: that.$store.state.zt.id
          })
          .then(res => {
            console.log(res);
            if ((res.data.msg = "操作成功")) {
              this.loading = false
              this.$message({
                showClose: true,
                type: "success",
                message: "请进行下一步"
              });
                this.$parent.$parent.$parent.$parent.changeActiveName("third")
            }
          })
          .catch(res=>{
            this.loading = false
            this.$message({
              message: "添加失败",
              type: "error"
            });
          })
      }
    },
    quxiao() {
      this.$parent.$parent.$parent.$parent.close();
      this.qikong();
    },
    qikong() {
      this.miaosu = "";
      this.guanjian = "";
      this.biaoti = "";
    }
  }
};
</script>
<style lang="scss" scoped>
  .qianzhi{
    /*margin-right: 200px;*/
    width: 100%;
  }
.around {
  width: 500px;
  display: flex;
  align-items: center;
  padding: 20px 0 20px 20px;
  span {
    display: inline-block;
    width: 100px;
    /*margin: 0 20px;*/
  }
}
.center {
  display: flex;
  margin: 20px !important;
  justify-content: center;
}
</style>
