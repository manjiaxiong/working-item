<template>
  <div>
    <div>
      <el-button size="medium" type="danger" @click="add">添加</el-button>
      <el-button size="medium" type="danger" @click="shuaxin">刷新</el-button>
    </div>
    <div class="mian">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr class="bac247 Myflex">
          <th></th>
          <th>商品图片</th>
          <th>商品名称/型号</th>
          <th>价格</th>
          <th>运费</th>
          <th>起订量</th>
          <th>库存</th>
          <th>业务数据</th>
          <th>操作</th>
        </tr>
        <tbody>
          <tr class="juz" v-for="(item,index) in arr" :key="index">
            <td></td>
            <td class="img">
              <div>
                <img :src="item.goodImg" alt srcset />
              </div>
            </td>
            <td>
              <div class="nini">
                <p class="mgwidth" @click="goPcDetail(item.id)" style="cursor: pointer;">{{item.goodNames}}</p>
                <p>商品型号：{{item.xinghao}}</p>
              </div>
            </td>
            <td>${{item.goodPrice}}</td>
            <td>{{item.yunfei}}</td>
            <td>{{item.qidingliang}}</td>
            <td>{{item.kucun}}</td>
            <td>
              <p>收藏量:{{item.shoucangliang}}</p>
              <p>销售量:{{item.xiaoshouliang}}</p>
            </td>
 
            <td class="btn">
              <div>
                <el-button
                  size="small"
                  type="danger"
                  @click="dele(item.showId)"
                >删除</el-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="centerDialogVisible">
      <el-dialog title="添加底部商品" :visible.sync="centerDialogVisible" :close-on-click-modal="false" width="30%" center>
        <div class="myinput">
          <span>选择分类</span>
          <el-select v-model="yijibt" placeholder="请选择">
            <el-option
              v-for="item in YijiOptions"
              :key="item.value"
              :label="item.classifyName"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="myinput">
          <span>选择商品1</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="myinput">
          <span>选择商品2</span>
          <el-select v-model="value1" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="myinput">
          <span>选择商品3</span>
          <el-select v-model="value2" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="myinput">
          <span>选择商品4</span>
          <el-select v-model="value3" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="commit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import api from "@/api/bannder";
export default {
  name: "shopFooter",
  created() {
    api.GetAllClassOne().then(res => {
      this.YijiOptions = res.data.data;
    });
    this.shuaxin();
  },
  watch: {
    yijibt(val) {
      api.GetAllShopList(val).then(res => {
        let arr = [];
        console.log(res);
        res.data.data.forEach((item, index) => {
          let temp = {
            value: item.id,
            label: item.goodNames
          };
          arr.push(temp);
        });
        this.options = arr;
      });
    }
  },
  data() {
    return {
      centerDialogVisible: false,
      yijibt: "",
      title: "",
      value: "", //商品1
      value1: "", //商品2
      value2: "",
      value3: "",
      YijiOptions: "", //一级标题
      options: [
 
      ],
      arr: []
    };
  },
  methods: {
    goPcDetail(id){
      window.open('http://www.geechori.com/guige?id='+id)
    },
    add() {
      this.centerDialogVisible = true;
    },
    shuaxin() {
      api.GetAllBottom().then(res => {
        this.arr = res.data.data;
      });
    },
    //确定
    commit() {
      // this.centerDialogVisible = false;
      let arr =
        this.value + "," + this.value1 + "," + this.value2 + "," + this.value3;
      api
        .setHeader({
          type: 1,
          goodIds: arr
        })
        .then(res => {
          res.data.code=="0"?this.centerDialogVisible = false:alert("失败了")
          this.shuaxin();
        });
    },
    dele(id){
      console.log(id);
      api.dele({
      goodshowId:id
      }).then(res=>{
        console.log(res);
        this.shuaxin()
      })
    }
  }
};
</script>

<style lang="scss" scoped>
table{
  text-align: center
}
.myinput {
  margin: 5px;
}
.myinput span {
  display: inline-block;
  width: 70px;
}
.img img{
  width: 50px;
  height: 50px;
}
</style>
