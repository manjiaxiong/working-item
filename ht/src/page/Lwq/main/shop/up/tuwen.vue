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
        <!-- <my-one ref="hh"></my-one> -->
        <wangeditor :remark="remark" ref="hhh" @setEditorValue="setEditorValue"></wangeditor>
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
  </div>
</template>
<script>
// import MyOne from "@/fuwenben/fuwenben";
import wangeditor from "@/fuwenben/fuwenben1";
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
      remark:''
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
          this.remark = res.data.data.productDetails
          this.$refs.hhh.change(res.data.data.productDetails);
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
          this.remark = res.data.data.productDetails
          this.$refs.hhh.change(res.data.data.productDetails);
        });
    }
  },
  methods: {
    setEditorValue(value) {

      this.remark = value ;
      console.log(value)

    },
    queding() {
      let a = this.remark;
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
          })
          .catch(res=>{
            this.loading = false
            this.$message({
              message: "修改失败",
              type: "error"
            });
          })
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
              })
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
    }
  },
  components: {
    // MyOne,
    wangeditor
  }
};
</script>

<style lang="scss" scoped>
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


</style>
