<template>
  <div class="he923">
    <div 
      class="pl"
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="flex">
        <span>产品详情</span>
        <a href="javascript:;" @click="preview">预览</a>
        <my-one ref="hh"></my-one>
        <!-- <wangeditor :remark="content" @setEditorValue="setEditorValue"></wangeditor> -->
      </div>
      <div class="flex">
        <span>交货细节</span>
        <el-input class v-model="xijie" placeholder="请输入内容"></el-input>
      </div>
      <div class="flex">
        <span>交货和安全</span>
        <el-input class v-model="anquan" placeholder="请输入内容"></el-input>
      </div>
      <div class="flex">
        <span>退货说明</span>
        <el-input class v-model="returnInstructions" placeholder="请输入内容"></el-input>
      </div>
      <div></div>
      <div class="center">
        <el-button @click="queding" type="primary">{{this.$store.state.zt.zt == "1"?'修改':'确定'}}</el-button>
        <el-button @click="quxiao" type="info">取消</el-button>
      </div>
    </div>
    <div class="preview" v-if="previewShow">
      <div class="title">预览</div>
      <div v-html="text" class="content" style="padding: 0 3%;"></div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="previewShow = false">取 消</el-button>
          <el-button type="primary" @click="previewShow = false">确 定</el-button>
        </span>
    </div>
    <div class="mask" v-if="previewShow"></div>
  </div>
</template>
<script>
import MyOne from "@/fuwenben/fuwenben";
// import wangeditor from "@/fuwenben/fuwenben1";
import api from "@/api/shop";
export default {
  data() {
    return {
      xijie: "",
      anquan: "",
      shuoming: "",
      fubwenben: "",
      returnInstructions:"",
      loading:false,
      content: "",
      text:'',//富文本预览代码
      previewShow:false,//预览是否显示
    };
  },
  mounted() {
    console.log(this.$store.state.zt.zt);
    if (this.$store.state.zt.zt == "1") {
      api
        .getShopId({
          id: this.$store.state.zt.Xid,
          number: 4
        })
        .then(res => {
          console.log('num4',res)
          this.anquan = res.data.data.goodsSafety;
          this.xijie = res.data.data.deliveryDetails;
          this.returnInstructions = res.data.data.returnInstructions;
          this.$refs.hh.change(res.data.data.productDetails);
        });
    }else if(this.$store.state.zt.zt == "10"){
      api
        .getShopId({
          id: this.$store.state.zt.Xid,
          number: 4
        })
        .then(res => {
          console.log('num4',res)
          this.anquan = res.data.data.goodsSafety;
          this.xijie = res.data.data.deliveryDetails;
          this.returnInstructions = res.data.data.returnInstructions;
          this.$refs.hh.change(res.data.data.productDetails);
        });
    }
  },
  methods: {
    preview(){//富文本预览
      this.text = this.$refs.hh.getUEContent()
      this.previewShow = true
    },
    setEditorValue(value) {

      this.remark = value ;

    },
    queding() {
      let a = this.$refs.hh.getUEContent();
      this.fubwenben = a;
      let that = this;
      if (this.$store.state.zt.zt == "1") {
        this.loading = true
        api
          .Fuweben({
            id: this.$store.state.zt.Xid,
            productDetails: that.fubwenben,
            deliveryDetails: that.xijie,
            goodsSafety: that.anquan,
            returnInstructions: that.returnInstructions
          })
          .then(res => {
            this.loading = false
            console.log(res);
            if (res.data.code == "000000") {
              this.$message({
                message: "恭喜修改成功",
                type: "success"
              });
              this.$parent.$parent.$parent.$parent.shuaxin();
            }
          });
      }else if(this.$store.state.zt.zt == "10"){
        this.loading = true
        api
          .setShopfourth({
            id: that.$store.state.zt.id,
            productDetails: that.fubwenben,
            deliveryDetails: that.xijie,
            goodsSafety: that.anquan,
            returnInstructions: that.returnInstructions
          })
          .then(res => {
            this.loading = false
            if (res.data.code == "000000") {
              this.$message({
                message: "恭喜添加成功",
                type: "success"
              });

              this.$parent.$parent.$parent.$parent.close();
              this.$parent.$parent.$parent.$parent.shuaxin();
              // console.log(this.$parent);
            } else {
              this.$message({
                message: "添加失败",
                type: "error"
              });
            }
          });
      }else {
        this.loading = true
        api
          .setShopfourth({
            id: that.$store.state.zt.id,
            productDetails: that.fubwenben,
            deliveryDetails: that.xijie,
            goodsSafety: that.anquan,
            returnInstructions: that.returnInstructions
          })
          .then(res => {
            this.loading = false
            if (res.data.code == "000000") {
              this.$message({
                message: "恭喜添加成功",
                type: "success"
              });

              this.$parent.$parent.$parent.$parent.close();
              this.$parent.$parent.$parent.$parent.shuaxin();
              // console.log(this.$parent);
            } else {
              this.$message({
                message: "添加失败",
                type: "error"
              });
            }
          });
      }
    },
    quxiao() {
      this.$parent.$parent.$parent.$parent.close();
    }
  },
  components: {
    MyOne,
    // wangeditor
  }
};
</script>

<style lang="scss" scoped>
  .preview{
    position: fixed;
    left: 25%;
    top: 10%;
    width: 50%;
    height: 60%;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    z-index: 10000;
    .title{
      width: 100%;
      height: 10%;
      font-size: 24px;
      text-align: center;
    }
    .content{
      height: 80%;
      /*overflow: hidden;*/
      overflow: scroll;
    }
    .dialog-footer{
      width: 100%;
      display: block;
      text-align: center;
      position: absolute;
      bottom: 5%;
    }
  }
  .mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2002;
    background-color: rgba(0,0,0,0.5);
  }
.he923 {
  /*height: 923px;*/
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
}
.pl {
}
.flex {
  //   display: flex;
  width: 500px;
  span {
    display: inline-block;
    width: 100px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
.center {
  /*margin-top: 100px;*/
  margin: 20px!important;
  display: flex;
  justify-content: center;
}

.wangeditor{
  width: 140% !important;
  margin-left: -80px;
}

tr{
  border-color: #333 !important;
}
</style>
