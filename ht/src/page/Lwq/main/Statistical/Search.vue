<template>
  <div class="p50">
      <time-nav></time-nav>
       <div class="padT50">
      <div>
        <div class="flex">
        </div>
      </div>
      <div class="Myflex">
        <div class="table">
          <div class="minH50">
            <table border="0" cellspacing="0">
              <tr class="bck247">
                <th>名称</th>
                <th>访问量</th>
                <th>趋势图</th>
              </tr>
              <tr class="fock" v-for="(item,index) in xianshiArr" :key="index">
                <td>{{item.name}}</td>
                <td>{{item.statistical}}</td>
                <td>
                  <span @click="xianshiqushitu(item.id)" class="hover"><img class="myimg" src="../../../../assets/imges/kaiguan/shang.png" alt="" srcset=""></span>
                </td>
              </tr>
            </table>
          </div>
          <div class="Myflex juzhong">
            <el-pagination
              :page-size="10"
              :current-page="pageNum"
              background
              layout="prev, pager, next"
              :total="length"
            ></el-pagination>
          </div>
        </div>
        <div class="par50px">
          <my-eachar ref="echar" :num="1" :list="list"></my-eachar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import timeNav from "../timenav";
import MyEachar from "../echar/char";
import api from "@/api/search";
export default {
  components: {
      timeNav,
      MyEachar
  },
  created(){
    this.init();
  },
  data(){
    return{
      xianshiArr:"",
      length:0,
      pageNum:1,
      list:[]
    }
  },
  methods:{
    init() {
      api
        .getall({
          startDate: this.startDate, //开始时间
          endDate:this.endDate, //结束时间
          page: this.pageNum,
          size: 10,
          id: this.id ? this.id : "" //父级id
        })
        .then(res => {
          this.length = res.data.data.totalRows;
          this.xianshiArr = res.data.data.list;
        });
    },
    shuxin() {
      api
        .getall({
          startDate: this.startDate, //开始时间
          endDate:this.endDate, //结束时间
          page: this.pageNum,
          size: 10,
          id: this.id ? this.id : "" //父级id
        })
        .then(res => {
          this.length = res.data.data.totalRows;
          this.xianshiArr = res.data.data.list;
        });
    },
    getTime(val) {
      console.log(val);
      this.startDate = val.startDate;
      this.endDate = val.endDate;
      // this.xianshiqushitu();//刷新
      this.shuxin(); //刷新
    },
    xianshiqushitu(id) {
      //刷新渲染dom
      //todo
      // if (!this.startDate || !this.endDate) {
      //   this.$message({
      //     message: "请选时间",
      //     type: "warning"
      //   });
      //   return false
      // }
      this.id = id;
      api
        .quShiImg1({
          startDate: this.startDate,
          endDate: this.endDate,
          id: this.id
        })
        .then(res => {
          console.log(res.data.data);
          this.list = res.data.data;
          this.$refs.echar.getList(this.list, res.data.msg); //传数据到echar
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.p50 {
  padding-left: 20px;
  h1 {
    height: 50px;
    font-size: 16px;
    background-color: rgb(247, 247, 247);
    line-height: 50px;
    padding-left: 10px;
  }
}
.Myflex {
  display: flex;
  .juzhong {
    justify-content: center;
  }
  .table {
    flex: 1;

    min-height: 50vh;

    table {
      width: 100%;
      text-align: center;
      font-size: 16px;
      tr {
        /*height: 50px;*/
      }
    }
  }
  .par50px {
    padding-right: 112px;
  }
  .bck247 {
    background-color: rgb(247, 247, 247);
  }
  .fock {
    border-bottom: 1px solid rgb(247, 247, 247);
    color: #888;
  }
  .padT50 {
    margin-top: 50px;
  }
}
.fontsize {
  font-size: 16px;
}
.flex {
  display: flex;
}
.jiange {
  margin-right: 20px;
  margin-left: 30px;
}
.hover {
  cursor: pointer;
}
.minH50 {
  min-height: 50vh;
}
.myimg{
  width: 20px;
}
</style>
