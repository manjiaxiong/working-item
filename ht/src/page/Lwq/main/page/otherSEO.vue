<template>
  <div class="app">
    <div class="header" style="padding-left: 3%;box-sizing: border-box;">
      <el-select style="margin-left: 30px;margin-top: 30px;" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="danger" @click="commit">确认修改</el-button>
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
      <div class="around1">
        <span>URL</span>
        <el-input class v-model="url" disabled="true" placeholder></el-input>
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
      url:'',
      value:'2',
      options: [{
        value: '2',
        label: '推荐页面'
      },{
        value: '3',
        label: '标签页面'
      },{
        value: '4',
        label: '专题页面'
      },{
        value: '5',
        label: '搜索页面'
      },{
        value: '6',
        label: '品牌页面'
      }],
    };
  },
  created() {
    this.init()
  },
  watch:{
    value(val){
      this.value = val
      this.init()
    }
  },
  methods: {
    commit(){
      let msg = confirm('您确定要修改吗？')
      if(!msg){
        return false
      }
      api.updateSeo({
        id:this.value,
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
        id:this.value
      }).then(res=>{
        console.log(res)
        this.seoTitle = res.data.data[0].seoTitle
        this.seo = res.data.data[0].seoKey
        this.seoContent = res.data.data[0].seoDescripte
        this.url = res.data.data[0].url
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
