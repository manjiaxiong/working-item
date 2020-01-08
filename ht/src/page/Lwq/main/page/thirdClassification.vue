<template>
  <div>
    <!-- 三级分类 -->
    <div class="pr50" >
      <el-select  v-model="value" @change="screen" placeholder="筛选">
        <el-option label="全部" value="every"></el-option>
        <el-option
          v-for="item in options1"
          :key="item.id"
          :label="item.classifyName"
          :value="item.id"
        ></el-option>
      </el-select>
      <div class="mybtn">
        <el-button size="medium" type="danger" @click="Show">添加分类</el-button>
        <el-button size="medium" type="danger" @click="shuxin">刷新</el-button>
      </div>
      <div class="language">
        <!-- 语言 -->
        <el-select v-model="selectValue"
                   @change="langChange"
                   placeholder="请选择语言">
          <el-option v-for="(item,index) in optionsLang"
                     :key="item.describe"
                     :label="item.element"
                     :value="index">
          </el-option>
        </el-select>
      </div>
    </div>

    <my-list :options="options" ref="list"></my-list>
  </div>
</template>
<script>
import MyList from "./listThird/listView3.vue";
import api from "@/api/one";

export default {
  components: {
    MyList
  },
  data() {
    return {
      value: "",
      options: "", //一级分类的集合
      options1: "", //二级分类的集合
      selectValue:'',
      optionsLang:[],//语言集合
      nowPage:1,
      total:0
    };
  },
  created() {
    this.getClassOne(); //获取所有一级分类
    this.gettwo(); //获取二级分类
    var element = sessionStorage.getItem('thirdLang')
    if(element){
      this.selectValue = element
    }
  },
  mounted(){
    api.getLanguages().then(res=>{
      console.log(res.data)
      this.optionsLang = res.data.data
    })
  },
  methods: {
    langChange(val){
      sessionStorage.setItem('thirdLang',this.optionsLang[val].element)
      api.getClassOne({
        classsifyType: 3,
        page: this.$store.state.title.page,
        size: 10,
        element:this.optionsLang[val].element
      }).then(res=>{
        console.log(res.data.data.list)
        this.$refs.list.getLangList(res.data.data.list)
        // this.options = res.data.data.list
      })
      api
        .getListClassTwo({
          classsifyType: 2,
          element:this.optionsLang[val].element
        })
        .then(res => {
          console.log('res111',res);
          this.options1 = res.data.data;
        });
    },
    Show() {
      this.$refs.list.show();
      this.$refs.list.changeState1(1);
      this.$refs.list.changeTitle("添加分类");
    },
    screen(id) {
      // 设置父级的id
      if (id == "every") {
        this.$refs.list.handleCurrentChange(1);
        this.$refs.list.shuxin();
        return;
      }
      this.$refs.list.handleCurrentChange2(id);
      this.$refs.list.shuxin();
      api.getClassOne({
        parentId: id,
        classsifyType: 3,
        page: 1,
        size: 10,
        element:sessionStorage.getItem('thirdLang') || 'English'
      });
    },
    getClassOne() {
      //获取所有的one
      api
        .getListClassOne({
          classsifyType: 1
        })
        .then(res => {
          console.log(res.data.data);
          this.options = res.data.data;
        });
    },
    shuxin() {
      this.getClassOne(); //获取所有一级分类
      this.gettwo(); //获取二级分类
    },
    gettwo() {
      //获取所有二级分类
      api
        .getListClassTwo({
          classsifyType: 2
        })
        .then(res => {
          console.log('res111',res);
          this.options1 = res.data.data;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
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
