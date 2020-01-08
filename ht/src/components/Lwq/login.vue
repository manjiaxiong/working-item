<template>
  <div class="logo">
    <div class="juzhong">
      <div>
        <div class="yonghu">
          <span>账号</span>
          <el-input placeholder="请输入用户名" prefix-icon="el-icon-user-solid" v-model="input1"></el-input>
        </div>
        <div class="yonghu">
          <span>密码</span>
          <el-input placeholder="请输入用户密码" type="password" prefix-icon="el-icon-s-tools" v-model="input2"></el-input>
        </div>
        <div class="jz">
          <el-button type="success" @click="dl">登陆</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/login";
export default {
  data() {
    return {
      input1: "",
      input2: ""
    };
  },
  methods: {
    dl() {//todo 校验
      // window.sessionStorage.setItem("id","1");
      //   this.$message({
      //     message: '登陆成功',
      //     type: 'success'
      //   });
      //    this.$router.push({ path:'index/main1/Inquirymanagement'})
      api
        .dl({
          phone: this.input1,
          pwd: this.input2
        })
        .then(res => {
          console.log(res);
          if(res.data.code=="0"){
              window.sessionStorage.setItem("id","1");
              this.$message({
                  message: '登陆成功',
                  type: 'success'
              });
              this.$router.push({ path:'index/main/homeIndex'})
          }else {
              this.$message({
                  message: res.data.msg,
                  type: 'success'
              });
          }
            console.log(123);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.jz {
  display: flex;
  justify-content: center;
   button{
     padding: 10px;
   }
}
.logo {
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/imges/houtai/bac.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .juzhong {
    display: flex;
    padding: 50px;
    border-radius: 10px;
    background-color: #ffffff;
    justify-content: center;
    align-items: center;
  }
  .yonghu {
    margin: 5px;
    display: flex;
    font-size: 16px;
    white-space: nowrap;
    align-items: center;
    span {
      display: inline-block;
      width: 60px;
    }
  }
}
</style>
