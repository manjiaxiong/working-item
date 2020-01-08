<template>
  <div>
    <div id="user">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <input type="text" autocomplete="off" class="input" placeholder="通过国家搜索订单" v-model="country">
      <input type="text" autocomplete="off" class="input" placeholder="通过用户名搜索订单" v-model="username">
      <input type="text" autocomplete="off" class="input" placeholder="通过email搜索订单" v-model="email">
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <div  class="timenav" id="btn1">
        <button class="btn" @click="SendTime">查询</button>
        <button class="btn" @click="shuaxin">刷新</button>
      </div>
    </div>

    <div class="center">
      <div>
        <div class="myheight">
          <table border="0" cellspacing="0">
            <tr>
              <th>国家</th>
              <th>公司名称</th>
              <th>设备类型</th>
              <th>IP地址</th>
              <th>姓名</th>
              <th>注册时间</th>
              <th>邮箱地址</th>
            </tr>
            <tr class="Fock" v-for="(item,index) in list " :key="index">
              <td>{{item.country}}</td>
              <td>{{item.company}}</td>
              <td v-if="item.portType == 0">PC端</td>
              <td v-else>移动端</td>
              <td>{{item.ip}}</td>
              <td>{{item.username}}</td>
              <td>{{item.create_time}}</td>
              <td>{{item.email}}</td>
            </tr>
          </table>
        </div>

        <div class="center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="all"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/user";
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      currentPage4: 1,
      list: [],
      all:0,
      email:'',//邮箱
      username:'',//昵称
      country:'',//国家
      options: [{
        value: '1',
        label: '降序'
      }, {
        value: '0',
        label: '升序'
      }],
      value: '',
      value2:'',
    };
  },
  created() {
    this.init();
  },
  methods: {
    SendTime(){
      console.log(this.value2)
      api
        .getAll({
          startDate: this.value2[0],
          endDate: this.value2[1],
          country:this.country,
          username:this.username,
          createTime:this.value,
          email:this.email,
          page: this.currentPage4
        })
        .then(res => {
          console.log(res);
          
          this.list = res.data.data.list;
          this.all=res.data.data.totalRows;
        });
    },
    shuaxin(){
      this.country = ''
      this.username = ''
      this.value = ''
      this.email = ''
      this.value2 = ''
      api
        .getAll({
          startDate: null,
          endDate: null,
          page: this.currentPage4
        })
        .then(res => {
          console.log(res);
          
          this.list = res.data.data.list;
          this.all=res.data.data.totalRows;
        });
    },
    init() {
      api
        .getAll({
          startDate: null,
          endDate: null,
          page: this.currentPage4
        })
        .then(res => {
          console.log(res);
          
          this.list = res.data.data.list;
          this.all=res.data.data.totalRows;
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(val)
      this.currentPage4 = val
      api
        .getAll({
          startDate: this.value2[0],
          endDate: this.value2[1],
          country:this.country,
          username:this.username,
          createTime:this.value,
          email:this.email,
          page: val
        })
        .then(res => {
          console.log(res);
          
          this.list = res.data.data.list;
          this.all=res.data.data.totalRows;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
  /*padding-top: 50px;*/
  margin: 0 !important;
}
table {
  width: 70vw;
  text-align: center;
  font-size: 16px;
  tr {
    height: 50px;
    th {
      background-color: rgb(247, 247, 247);
    }
    &.Fock {
      border-bottom: 1px solid rgb(247, 247, 247);
      color: #888;
    }
    //   line-height: 50px;
  }
}
.myheight {
  min-height: 50vh;
}
#user{
  display: flex;
  align-items: center;
  padding-left: 30px;
  box-sizing: border-box;
  height: 80px;
}
#user>div{
  margin-right: 15px;
}
.input{
  height: 35px;
  padding-left: 10px;
  margin-right: 15px;
}
.timenav{
  display: flex;
  align-items: center;
  height: 80px;
}
.timenav button{
  width: 60px;
  height: 35px;
  background-color: blue;
  color: #fff;
}
</style>
