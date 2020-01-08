<template>
  <div>
    <div>
      <my-time></my-time>
    </div>
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
                <td>{{item.classifyName}}</td>
                <td>{{item.statistical}}</td>
                <td>
                  <span @click="xianshiqushitu(item.classId)" class="hover"><img class="myimg" src="../../../../assets/imges/kaiguan/shang.png" alt="" srcset=""></span>
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
import MyTime from "../timenav";
import MyEachar from "../echar/char";
import api from "@/api/fenlei";
import api1 from "@/api/one";
export default {
  data() {
    return {
      pageNum: 1, //分页页码
      length: 0, //总行数
      xianshiArr: "",
      startDate: "",
      endDate: "",
      id: "",
      list: [] //数组
    };
  },
  components: {
    MyEachar,
    MyTime
  },
  created() {
    var endDate = new Date();
    var yue = endDate.getMonth() + 1;
    var nian = endDate.getFullYear();
    var ri = endDate.getDate();
    // 日历
    //
    this.shuxin();
    api1.getTwoClass({}).then(res => {
      console.log(res);
      this.options2 = res.data.data;
    });
  },
  methods: {
    init() {
      api
        .tongji({
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
        .tongji({
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
      // if (!this.startDate || !this.endDate) {
      //   this.$message({
      //     message: "请选时间",
      //     type: "warning"
      //   });
      // }
      this.id = id;
      api
        .quShiImg({
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
