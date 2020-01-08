<template>
  <div class="app">
    <div class="header" style="padding-left: 3%;box-sizing: border-box;">
      <el-button type="danger" @click="commit">提交</el-button>
      <el-button type="danger" @click="init">刷新</el-button>
    </div>
    <div class="homeSeo">
      <div class="around1">
        <span>SEO标题</span>
        <el-input class v-model="seoTitle" placeholder></el-input>
      </div>
      <div class="around1">
        <span>SEO关键字</span>
        <el-input class v-model="seo" placeholder></el-input>
      </div>
      <div class="around1">
        <span>SEO描述</span>
        <textarea name="seo" cols="80" v-model="seoContent" style="resize:none;" rows="10"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/fuck";
export default {
  data() {
    return {
      seoTitle:'',
      seo:'',
      seoContent:'',
    };
  },
  created() {
    this.init()
  },
  methods: {
    commit(){
      api.updateSeo({
        id:'1',
        seoTitle:this.seoTitle,
        seoKey:this.seo,
        seoDescripte:this.seoContent
      }).then(res=>{
        console.log(res)
        if(res.data.result){
          this.$message({
            showClose: true,
            type: "success",
            message: "提交成功"
          });
        }else{
          this.$message({
            showClose: true,
            type: "error",
            message: res.data.msg
          });
        }
        this.init()
      })
    },
    init(){
      api.findSeo({
        id:'1'
      }).then(res=>{
        console.log(res)
        this.seoTitle = res.data.data[0].seoTitle
        this.seo = res.data.data[0].seoKey
        this.seoContent = res.data.data[0].seoDescripte
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
</style>
