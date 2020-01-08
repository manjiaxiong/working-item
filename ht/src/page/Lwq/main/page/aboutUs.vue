<template>
  <div>
    <!-- 关于我们 -->
    <div class="pr50" >
      <div class="mybtn">
        <el-button size="medium" type="danger" @click="addAboutUs">提交</el-button>
      </div>
    </div>
    <div 
      class="fuwen" 
      style="width:100%;text-align: center;"
      v-loading="loading"
      element-loading-text="提交中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <span style="width:100%;text-align: center;">关于我们</span>
        <textarea name="service" id="service" cols="80" rows="15" v-model="value"></textarea>
    </div>
  </div>
</template>
<script>
import api from "@/api/one";

export default {
  data() {
    return {
      value: "",
      options: "", //一级分类的集合
      options1: "", //二级分类的集合
      selectValue:'',
      optionsLang:[],//语言集合
      nowPage:1,
      total:0,
      loading:false
    };
  },
  mounted() {
    api.showAboutUs()
    .then(res=>{
      console.log(res)
      this.value = res.data.data[0].content
    })
  },
  methods: {
    foucs(e){
      
    },
    addAboutUs(){
      this.loading = true
      api.addAboutUs({
        content:this.value,
        element:'中文'
      })
      .then(res=>{
        this.loading = false
        this.$message({
          message: "添加成功",
          type: "success"
        });
      })
      .catch(res=>{
        this.loading = false
        this.$message({
          message: '添加失败',
          type: 'error'
        });
      })
    }
  }
};
</script>
<style lang="scss" scoped>
  #service{
    display: block;
    resize: none;
    margin-left: 13%;
    font-size: 25px;
  }
.text{
  margin-left:32% !important;
}
.mybtn {
  margin-left: 20px;
  font-size: 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  div {
    margin: 0 10px;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 0 5px;
    background-color: rgb(125, 125, 195);
    color: #fff;
  }
}
.pr50 {
  display: flex;
  padding: 10px;
}
.juzhong {
  padding-top: 0px;
  display: flex;
  justify-content: center;
}
.language{
  margin-left:10px;
}
</style>
