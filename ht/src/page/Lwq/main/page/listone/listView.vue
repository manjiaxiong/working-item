  <template>
  <!-- 一级分类 -->
  <table border="0"
         cellspacing="0">
    <tr class="color">
      <th>分类名字</th>
      <th>排序</th>
      <th>二级分类</th>
      <th>链接商品</th>
      <th>状态</th>
      <th>操作</th>
    </tr>
    <tr class="Myhover"
        v-for="(item,index ) in list"
        :key="item.id">
      <td>{{item.classifyNames}}</td>
      <td>
        <span class="border"
              :data-id="item.id"
              @blur="changeNum"
              contenteditable="true">{{item.number}}</span>
      </td>
      <td>
        <span style="color: blue;" @click="labelDetail(item.id)">关联二级分类({{item.classes}})</span>
      </td>
      <td>
        <span style="color: blue;" @click="labelDetailGoods(item.id)">关联商品({{item.goods}})</span>
      </td>
      <td>
        <div class="lwqimgswtach"
             :class="item.classifyStatus?'true':'flase'"
             @click="changeState(index,item.id)"></div>
      </td>
      <td>
        <el-button type="success"
                   @click="mychange(item)">修改</el-button>
        <el-button type="danger"
                   @click="dele(item.id)">删除</el-button>
      </td>
    </tr>
  </table>
</template>

  <script>
import api from "@/api/one";
export default {
  data () {
    return {
      list: [],
      num: "",
    };
  },
  props:{
    ListArr:{
      type:Array
    }
  },
  created () {
    if(this.ListArr.length > 0){
      this.list = this.ListArr
      console.log(this.list,this.ListArr)
    }else{
      this.shuxin();
    }
  },
  methods: {
    labelDetail(id){
      this.$router.push({
          path : "/index/main1/listoneDetail",
          query : {//query是跳转是传递的参数，对象类型
              id : id,
              type:2
          }
      })
    },
    labelDetailGoods(fid){
      this.$router.push({
          path : "/index/main1/listtwoDetail",
          query : {//query是跳转是传递的参数，对象类型
              fid : fid
          }
      })
    },
    changeState (index, id) {
      var that = this;
      api
        .changeState({
          classifyStatus: !that.list[index].classifyStatus,
          id: id
        })
        .then(res => {
          if (res.data.msg == "操作成功") {
            this.list[index].classifyStatus = !this.list[index].classifyStatus;
            //刷新数据

          }
        });
    },
    getLang(val){
      this.list = val
      console.log('调用',this.list)
    },
    mychange (val) {
      console.log('一级',val)
      this.$parent.Show("修改");
      this.$parent.huixian(val);
    },
    dele (val) {
      api
        .DeleatClass({
          classsifyType: 1,
          parentId: 0,
          id: val
        })
        .then(res => {
          console.log(res.data.msg);
          let that = this;
          if (res.data.msg == "删除成功") {
            this.$message({
              message: "删除成功",
              type: "success"
            });

            this.shuxin();
          }
        });
    },
    changeNum (e) {
      //改排序无需重写
      api
        .setNum({
          number: e.target.innerHTML,
          id: e.target.dataset.id
        })
        .then(res => {
          console.log(res);
          this.shuxin();
        });
    },
    shuxin () {
      let that = this;
      api
        .getClassOne({
          page: that.num ? that.num : 1,
          parentId: 0,
          classsifyType: 1,
          size: 10,
          element:sessionStorage.getItem('oneLang') || 'English'
        })
        .then(res => {
          this.$parent.changeLength(res.data.data.totalRows);
          this.list = res.data.data.list;
        });
    },
    changePageNum (num) {
      this.num = num;
      console.log(this.num, '哈哈哈哈哈');

      this.shuxin();
    }
  }
};
</script>
  <style lang="scss">
    th{
      padding: 0 !important;
    }
    td{
      padding: 0!important;
    }
    .el-button{
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
    background-color: rgb(242,242,242);
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
  // width: 50px;
  // height: 58px;
  margin: auto;
  cursor: pointer;
  width: 50px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
}
.true {
  background-image: url("../../../../../assets/imges/houtai/kai.png");
}
.flase {
  background-image: url("../../../../../assets/imges/houtai/guan.png");
}
</style>
