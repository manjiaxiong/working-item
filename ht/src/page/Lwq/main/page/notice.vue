n m<template>
  <div class="app">
    <div class="header" style="padding-left: 3%;box-sizing: border-box;">
      <el-button type="danger" @click="commit">提交</el-button>
    </div>
    <div class="homeSeo">
      <div class="around1">
        <span>是否显示</span>
        <el-radio-group v-model="radio">
          <el-radio :label="1">显示</el-radio>
          <el-radio :label="0">不显示</el-radio>
        </el-radio-group>
      </div>
      <div class="around1">
        <span>公告内容</span>
        <textarea name="notice" v-model="notice" style="resize:none;outline: none;" class="notice"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/fuck";
export default {
  data() {
    return {
      notice:'',
      radio:1,
    };
  },
  created() {
    this.init()
  },
  methods: {
    commit(){
      api.addNotice({
        state:this.radio,
        content:this.notice,
        element:'English'
      }).then(res=>{
        if(res.data.result){
          this.$message({
            showClose: true,
            type: "success",
            message: "提交成功"
          });
          this.init()
        }
      })
    },
    init(){
      api.notice({
        element:'English'
      }).then(res=>{
        console.log(res)
        this.notice = res.data.data.content
        if(res.data.data.state==0 || res.data.data.state==1){
          this.radio = res.data.data.state
        }else{
          this.radio = 1
        }
      })
    }
  },
};
</script>
<style lang="scss" scoped>
  .around1 {
    width: 800px;
    display: flex;
    display: block;
    align-items: center;
    padding: 20px 0 20px 20px;
    .el-input{
      width: 80%;
    }
    span {
      display: inline-block;
      width: 100px;
      margin: 0 20px;
      font-size: 17px;
    }
  }
  .homeSeo{
    width: 80%;
  }
  .notice{
    width: 600px;
    height: 400px;
    font-size: 20px;
    padding-left: 10px;
  }
</style>