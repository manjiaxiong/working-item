<template>
  <div class="app">
    <div class="header">
      <el-button type="danger" @click="centerDialogVisible = true">添加</el-button>
      <el-button type="danger" @click="init">刷新</el-button>
    </div>
    <div class="center">
      <table border="0" cellspacing="0">
        <tr class="color">
          <th>图片</th>
          <th>商品名字</th>
          <!-- <th>状态</th> -->
          <th>操作</th>
        </tr>
        <tr class="Myhover" v-for="(item,index ) in list" :key="index">
          <td class="img">
            <img :src="item.goodImg" alt />
          </td>
          <td @click="goPcDetail(item.goodid)" style="cursor: pointer;">{{item.goodname}}</td>
          <!-- <td>
            <span
              class="border"
              :data-id="item.id"
              @blur="changeNum"
              contenteditable="true"
            >{{item.number}}</span>
          </td>-->
          <!-- <td>
            <div
              class="lwqimgswtach"
              :class="item.classifyStatus?'true':'flase'"
              @click="changeState(index,item.id)"
            ></div>
          </td>-->
          <!-- <td>{{item}}</td> -->
          <td>
            <!-- <el-button type="success" @click="mychange(item)">修改</el-button> -->
            <el-button type="danger" @click="dele(item.id)">删除</el-button>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="centerDialogVisible">
      <el-dialog title="新品详解设置" :visible.sync="centerDialogVisible" :close-on-click-modal="false" width="30%" center>
        <div class="p20">
          <div class="aaa">
            <span class="hiehi pl50">选择</span>

            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </div>
          <div class="aaa">
            <span class="hiehi">链接商品</span>

            <el-select v-model="value1" placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </div>
          <div class="heihei">
            <img-up ref="hhh" :good_show="good_show"></img-up>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="commit(value1)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import ImgUp from "../../mianTitle/imgUp";
import api from "@/api/fuck";
export default {
  data() {
    return {
      centerDialogVisible: false,
      value: "",
      list: "", //
      options: [
        {
          value: "0",
          label: "上"
        },
        {
          value: "1",
          label: "下"
        }
      ],
      options1: [],
      value1: "",
      good_show:''
    };
  },
  watch:{
    centerDialogVisible(){
      this.value = ''
      this.value1 = ''
    }
  },
  created() {
    this.init();
    api.all().then(res => {
      this.options1 = [];
      res.data.data.list.forEach((item, index) => {
        let temp = {
          value: item.id,
          label: item.goodNames
        };
        this.options1.push(temp);
      });
    });
  },
  methods: {
    goPcDetail(id){
      window.open('http://www.geechori.com/guige?id='+id)
    },
    init() {
      api.get().then(res => {
        console.log(res.data);
        this.list = res.data.data;
      });
    },
    commit(val) {
      var _this = this
      var goodName = ''
      console.log(val)
      if(this.options1 && this.options1.length>0){
        this.options1.forEach(function(value,index){
          if(value.value == val){
            goodName = value.label
          }
        })
      }
      api
        .set({
          goodid: this.value1,
          type: this.value,
          goodImg: this.$store.state.imglist.arr[0],
          goodname:goodName
        })
        .then(res => {
          // centerDialogVisible = false
          console.log(res.data);
          if (res.data.code == "000000") {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.centerDialogVisible = false;
            this.init();
          } else {
            this.$message({
              message: "添加失败",
              type: "warning"
            });
          }
        });
    },
    dele(id) {
      //删除
      api
        .dele({
          goodshowId: id
        })
        .then(res => {
          this.init();
        });
    }
  },
  components: {
    ImgUp
  }
};
</script>
<style lang="scss" scoped>
.aaa{
  margin: 5px;
}
.center {
  margin: 0;
}
.img {
  width: 200px;
}
.img img {
  width: 200px;
  height: 50px;
}
.p20 {
  padding-left: 5px;
}
.pl50 {
  margin-right: 38px !important;
}
.hiehi {
  margin-right: 10px;
}
.heihei {
  padding-top: 15px;
  padding-left: 40px;
}
.header {
  padding: 5px;
  display: flex;
  align-items: center;
}
th {
  padding: 0 !important;
}
td {
  padding: 0 !important;
}
.el-button {
  padding: 5px;
}
table {
  width: 100%;
  font-size: 16px;
}
.color {
  color: #555;
  background: #f7f7f7;
  th {
    padding: 10px 10px;
  }
}
.Myhover {
  color: #555;
  &:hover {
    background-color: rgb(242, 242, 242);
    /*color: #fff;*/
  }
  td {
    text-align: center;
    /*padding: 1px 0;*/
    // border: 1px solid #ccc;

    &:hover {
    }
  }
}
.border {
  display: inline-block;
  border: 1px solid #888;
  padding: 0 20px;
  width: 50px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.juzhong {
  display: flex;
  justify-content: center;
  align-items: center;
}
.lwqimgswtach {
  margin: auto;
  cursor: pointer;
  width: 50px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
}
.el-input .el-input--suffix{
  margin: 5px !important;
}
</style>
