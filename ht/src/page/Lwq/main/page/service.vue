<template>
  <div>
    <!-- 服务条款和隐私政策 -->
    <div class="pr50" >
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <div class="mybtn">
        <el-button size="medium" type="danger" @click="addService">确认修改</el-button>
        <el-button size="medium" type="danger"  v-if="value1" @click="preview">预览</el-button>
      </div>
    </div>
    <div 
      class="fuwen" 
      style="width:90%;text-align: center;"
      v-loading="loading"
      element-loading-text="提交中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <span style="width:100%;text-align: center;">{{title}}</span>
        <!-- <textarea name="service" id="service" cols="80" rows="15" v-model="value"></textarea> -->
        <div style="width: 70%;margin-top: 50px;margin-left: 10%;" v-if="value1">
          <my-one ref="hh"></my-one>
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
import api from "@/api/one";
import MyOne from "@/fuwenben/fuwenben";
export default {
  components: {
    MyOne,
  },
  data() {
    return {
      text: "",
      previewShow: false,
      value: "",
      loading:false,
      options: [{
        value: '0',
        label: '关于我们'
      }, {
        value: '1',
        label: '联系我们'
      }, {
        value: '2',
        label: '品牌历程'
      }, {
        value: '3',
        label: '常见问题（退换货）'
      }, {
        value: '4',
        label: '交货细节'
      }, {
        value: '5',
        label: '服务条款和隐私政策'
      }, {
        value: '6',
        label: '付款与安全'
      }, {
        value: '7',
        label: 'Cookie政策'
      }, {
        value: '8',
        label: '关于定制'
      }, {
        value: '9',
        label: '批发计划（affiliate program）'
      }, {
        value: '10',
        label: '学生专属'
      }],
      value1: '',
      title:''
    };
  },
  watch:{
    value1(val){
      for(let i = 0 ; i < this.options.length ; i++){
        if(val == this.options[i].value){
          this.title = this.options[i].label
        }
      }
      api.showBottomMenuContentById({
        id:val
      })
      .then(res=>{
        console.log(res)
        if(res.data.result){
          this.$refs.hh.change(res.data.data[0].content);
        }else{
          this.$refs.hh.change('');
        }
      })
    }
  },
  mounted() {
    
  },
  updated(){
    console.log(this.title)
  },
  methods: {
    preview(){//富文本预览
      this.text = this.$refs.hh.getUEContent()
      this.previewShow = true
      console.log(this.text)
    },
    addService(){
      let msg = window.confirm("确定要修改吗?")
      if(!msg){
        return false
      }
      let text = this.$refs.hh.getUEContent()
      if(text == ''){
        this.$message({
          message: "请输入内容"
        });
        return false
      }
      this.loading = true
      api.addBottomMenuContentById({
        content:text,
        id:this.value1
      })
      .then(res=>{
        this.loading = false
        console.log(res)
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
#edui1{
  width: 900px !important;
}
</style>
