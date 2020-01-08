<template>
  <div class="pa50">
    <div class="topBox">
      <el-input class="width"
                placeholder="请输入内容"
                suffix-icon="el-icon-search"
                v-model="input1"></el-input>
      <input type="text" autocomplete="off" class="input" placeholder="通过型号搜索" v-model="xinghao">
      <input type="text" autocomplete="off" class="input" placeholder="通过库存搜索" v-model="kucun">
      <input type="text" autocomplete="off" class="input" placeholder="通过分类名称搜索" v-model="classifyName">
      <input type="text" autocomplete="off" class="input" placeholder="页面显示商品数量" v-model="size">
      <el-button size="medium"
                 type="danger"
                 @click="changeSearch">查询</el-button>
      <el-button size="medium"
                 type="danger"
                 @click="shanchu">上传商品</el-button>
      <el-button size="medium"
                 type="danger"
                 @click="shuaxin">刷新</el-button>
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
    <div>
      <div class="p100">
        <table border="0"
               cellpadding="0"
               cellspacing="0">
          <tr class="bac247 Myflex">
            <th></th>
            <th>商品图片</th>
            <th>商品名称/分类/型号</th>
            <th>价格</th>
            <th>运费</th>
            <th>起订量</th>
            <th>库存</th>
            <th>业务数据</th>
            <th>排序</th>
            <th>推荐状态</th>
            <th>操作</th>
          </tr>
        <tbody>
          <tr class="juz"
              v-for="(item,index) in arr"
              :key="item.id">
            <td>
<!--              <img @click="xxx(index)"-->
<!--                   v-if="hh[index]"-->
<!--                   src="@/assets/imges/kaiguan/dui.png" />-->
<!--              <img @click="xxx(index)"-->
<!--                   v-else-->
<!--                   src="@/assets/imges/kaiguan/kong.png" />-->
            </td>
            <td class="img">
              <div>
                <img :src="item.goodImg"
                  />
              </div>
            </td>
            <td>
              <div class="nini">
                <p class="mgwidth" @click="goPcDetail(item.id)" style="cursor: pointer;">{{item.goodNames}}</p>
                <p>分类：{{item.classifyName}}</p>
                <p>商品型号：{{item.xinghao}}</p>
              </div>
            </td>
            <td>${{item.goodPrice}}</td>
            <td>{{item.yunfei}}</td>
            <td>{{item.qidingliang}}</td>
            <td>{{item.kucun}}</td>
            <td>
              <p style="text-align: center;">收藏量:{{item.shoucangliang}}</p>
              <p style="text-align: center;">销售量:{{item.xiaoshouliang}}</p>
            </td>
            <td>{{item.paixu}}</td>
            <td>
              <div class="lwqimgswtach"
                   :class="item.category==2?'true':'flase'"
                   @click="changeState(index,item.id,item.category)"></div>
            </td>
            <td class="btn">
              <div v-if="name=='回收'">
                <el-button size="small"
                           type="warning"
                           @click="shangjia1(item.id)">上架</el-button>
                <el-button size="small"
                           type="danger"
                           @click="qingkong(item.id)">清空</el-button>
              </div>
              <div v-else-if="name=='下架'">
                <el-button size="small"
                           type="success"
                           @click="xiugai(item.id)">修改</el-button>
                <el-button size="small"
                           type="warning"
                           @click="shangjia(item.id)">上架</el-button>
                <el-button size="small"
                           type="danger"
                           @click="dele(item.id)">删除</el-button>
              </div>
              <div v-else>
                <el-button size="small"
                           type="success"
                           @click="xiugai(item.id)">修改</el-button>
                <el-button size="small"
                           type="warning"
                           @click="xiajia(item.id)">下架</el-button>
                <el-button size="small"
                           type="danger"
                           @click="dele(item.id)">删除</el-button>
                <el-button size="small"
                           @click="similar(item.id)">上传相似</el-button>
              </div>
            </td>
          </tr>
        </tbody>
        </table>

      </div>
    </div>
    <div class="center">
      <el-pagination @current-change="handleCurrentChange"
                     :page-size="size ? size : 10"
                     background
                     :current-page.sync="Page"
                     layout="prev, pager, next, jumper"
                     :total="totalRows"></el-pagination>
    </div>

    <el-dialog v-if="dialogTableVisible"
               :destroy-on-close="true"
               top="5vh"
               :title="$store.state.zt.zt==1?'修改':'上传'"
                center=""
               :before-close="closeDo"
               :visible.sync="dialogTableVisible"
               :close-on-press-escape="false"
               :close-on-click-modal="false"
               width="60%">
      <el-tabs v-model="activeName"
               @tab-click="handleClick">
        <el-tab-pane

          label="上传商品"
                     name="first">
          <div>
            <my-shop class="myshop"></my-shop>
          </div>
        </el-tab-pane>
        <el-tab-pane label="SEO设置"
                     name="second">
          <my-seo></my-seo>
        </el-tab-pane>
        <el-tab-pane label="商品相册"
                     name="third">
          <img-s></img-s>
        </el-tab-pane>
        <el-tab-pane label="图文描述"
                     name="fourth">
          <t-w></t-w>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import MyShop from "./up/shopup";
import MySeo from "./up/seo";
import ImgS from "./up/pho";
import TW from "./up/tuwen1";
import api from "@/api/shop";
import api1 from "@/api/one";
import { log } from 'util';
export default {
  props: ["name"],
  data () {
    return {
      input1: "",
        quanxianArr:[true,false,false,false],//
      dialogTableVisible: false,
      activeName: "first",
      arr: [], //刷新数据
      totalRows: 0,
      zt: "",
      hh: [],
      id: "", //查询商品的id
      nima: "", //别报错了
      Page: 1, //当前页码
      flag: false, //销毁该dom
      selectValue:'',
      optionsLang:[],
      xinghao:'',
      kucun:'',
      classifyName:'',
      size:'',
    };
  },
  components: {
    MyShop,
    MySeo,
    ImgS,
    TW
  },
  created () {
    if (this.name == "回收") {
      api
        .getList({
          isDeleteStatus: 0
        })
        .then(res => {
          console.log(res.data.data.list);
          this.arr = res.data.data.list;
          this.totalRows = parseInt(res.data.data.totalRows);
        });
    } else if (this.name == "下架") {
      api
        .getList({
          mallStatus: 0
        })
        .then(res => {
          console.log(res.data.data.list);
          this.arr = res.data.data.list;
          this.totalRows = parseInt(res.data.data.totalRows);
        });
    } else {
      //上架中
      api
        .getList({
          mallStatus: 1
        })
        .then(res => {
          console.log(res.data.data.list);
          this.totalRows = parseInt(res.data.data.totalRows);
          this.arr = res.data.data.list;
          console.log(this.totalRows);
        });
    }

    for (let i = 0; i < 10; i++) {
      this.hh.push(false);
    }
  },
  mounted(){
    api1.getLanguages().then(res=>{
      console.log(res.data)
      this.optionsLang = res.data.data
    })
  },
  methods: {
    goPcDetail(id){
      window.open('http://www.geechori.com/guige?id='+id)
    },
    similar(id){
      // TODO回显
      this.flag = true;
      
      this.$store.commit("zt/changezt", 10);
      this.$store.commit("zt/changeXid", id);
      console.log("上传相似");
      this.dialogTableVisible = true;
    },
    langChange(val){
      sessionStorage.setItem('shopLang',this.optionsLang[val].element)
      if (this.name == "回收"){
        api
          .getList({
            isDeleteStatus: 0,
            size: 10,
            page: this.Page,
            xinghao:this.xinghao,
            kucun:this.kucun,
            classifyName:this.classifyName,
            size:this.size,
            element:this.optionsLang[val].element || 'English'
          })
          .then(res => {
            console.log(res.data.data.list);
            this.arr = res.data.data.list;
            this.totalRows = parseInt(res.data.data.totalRows);
          });
      }else if (this.name == "下架"){
        api
          .getList({
            mallStatus: 0,
            size: 10,
            page: this.Page,
            xinghao:this.xinghao,
            kucun:this.kucun,
            classifyName:this.classifyName,
            size:this.size,
            element:this.optionsLang[val].element || 'English'
          })
          .then(res => {
            console.log(res.data.data.list);
            this.arr = res.data.data.list;
            this.totalRows = parseInt(res.data.data.totalRows);
          });
      }else{
        api.getList({
          mallStatus: 1,
          size: 10,
          page: this.Page,
          xinghao:this.xinghao,
          kucun:this.kucun,
          classifyName:this.classifyName,
          size:this.size,
          element:this.optionsLang[val].element || 'English'
        })
        .then(res => {
          console.log(res.data.data.list);
          this.arr = res.data.data.list;
          this.totalRows = parseInt(res.data.data.totalRows);
        });
      }
      
    },
      changeActiveName(val){
          this.activeName=val;
      },
    shanchu () {
      this.flag = true;
      this.dialogTableVisible = true;
      this.zt = 1;
      this.$store.commit("zt/changezt", 0);
    },
    shuaxin () {
      console.log(this);
      this.input1 = ''
      this.xinghao = ''
      this.kucun = ''
      this.classifyName = ''
      this.size = ''
      if (this.name == "回收") {
        api
          .getList({
            isDeleteStatus: 0,
            size: 10,
            page: this.Page,
            element:sessionStorage.getItem('shopLang') || 'English'
          })
          .then(res => {
            console.log(res.data.data.list);
            this.arr = res.data.data.list;
            this.totalRows = parseInt(res.data.data.totalRows);
          });
      } else if (this.name == "下架") {
        api
          .getList({
            mallStatus: 0,
            size: 10,
            page: this.Page,
            element:sessionStorage.getItem('shopLang') || 'English'
          })
          .then(res => {
            console.log(res.data.data.list);
            this.arr = res.data.data.list;
            this.totalRows = parseInt(res.data.data.totalRows);
          });
      } else {
        api
          .getList({
            mallStatus: 1,
            size: 10,
            page: this.Page,
            element:sessionStorage.getItem('shopLang') || 'English'
          })
          .then(res => {
            console.log(res.data.data.list);
            this.totalRows = parseInt(res.data.data.totalRows);
            this.arr = res.data.data.list;
          });
      }
    },
    close () {
      this.flag = false;
      this.dialogTableVisible = false;
    },
    xiugai (id) {
      // TODO回显
      this.flag = true;
      
      this.$store.commit("zt/changezt", 1);
      this.$store.commit("zt/changeXid", id);
      console.log("修改");
      this.dialogTableVisible = true;
    },
    xxx (index) {
      console.log(index);
    },
    handleCurrentChange (val) {
      //翻页时候
      // console.log(val);
      this.shuaxin();
      // this.Page = val;
      // console.log(this.Page);
    },
    fz (res) {
      if (res.data.code == "111111") {
        this.$message({
          message: "没有找到该商品",
          type: "warning"
        });
        console.log(res)
        this.arr = res.data.data.list;
      } else if (res.data.code == "000000") {
        this.$message({
          message: "查询成功",
          type: "success"
        });
        console.log(res)
        this.arr = res.data.data.list;
        this.id = res.data.data.list[0].id;
      }
    },
    changeSearch () {
      console.log(this.input1);
      if (this.name == "回收") {
        api
          .getList({
            search: this.input1,
            xinghao:this.xinghao,
            kucun:this.kucun,
            classifyName:this.classifyName,
            size:this.size,
            isDeleteStatus: 0
          })
          .then(res => {
            this.fz(res);
          });
      } else if (this.name == "下架") {
        api
          .getList({
            search: this.input1,
            xinghao:this.xinghao,
            kucun:this.kucun,
            classifyName:this.classifyName,
            size:this.size,
            mallStatus: 0
          })
          .then(res => {
            this.fz(res);
          });
      } else {
        api
          .getList({
            search: this.input1,
            xinghao:this.xinghao,
            kucun:this.kucun,
            classifyName:this.classifyName,
            size:this.size,
            mallStatus: 1
          })
          .then(res => {
            this.fz(res);
          });
      }
    },
    handleClick () {
      // console

    },
    changeState (index, id,category) {
          console.log(index, id,category)
          api.changeState({
            id:id, category:category==2?null:2
          }).then(res=>{
              console.log(res);
              this.shuaxin();
          })
    },
    xiajia (id) {
      //下架
      api
        .xiajia({
          id: id,
          mallStatus: 0 //0 下 1 上
        })
        .then(res => {
          if (res.data.code == "000000") {
            this.$message({
              showClose: true,
              message: "下架成功",
              type: "success"
            });
            this.shuaxin();
          }
        });
    },
    shangjia (id) {
      api
        .shangjia({
          id: id,
          mallStatus: 1 //0 下 1 上
        })
        .then(res => {
          console.log(res);
          if (res.data.code == "000000") {
            this.$message({
              showClose: true,
              message: "上架成功",
              type: "success"
            });
            this.shuaxin();
          }
        });
    },
    shangjia1 (id) {
      api
        .shangjia({
          id: id,
          isDeleteStatus: 1
        })
        .then(res => {
          console.log(res);
          if (res.data.code == "000000") {
            this.$message({
              showClose: true,
              message: "上架成功",
              type: "success"
            });
            this.shuaxin();
          }
        });
    },
    dele (id) {
      api
        .Deleat({
          id: id
        })
        .then(res => {
          // console.log(res);
          if (res.data.code == "000000") {
            this.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            this.shuaxin();
          }
        });
    },
    closeDo (done) {
      done();
    },
    qingkong(id){
        api.qingkong({
          id:id
        }).then(res=>{
          console.log(res);
          this.shuaxin();
        })
    }
  }
};
</script>
<style lang="scss">
  .el-input__inner{

    padding: 0;
  }
  .el-dialog__header{
    padding: 2px;
  }
  .myshop{
    .el-dialog__title{
      font-size: 0.6rem;
    }

    .el-dialog__body{
      padding: 2px;
    }
    .around .el-input__inner{
      /*flex: 1;*/
      height: 20px;
      line-height: 20px;
      margin: 1px;
      padding: 0;
    }
    .el-input__icon{
      line-height: 0;
    }
    .el-tabs__item{

    }
    .el-tabs__content{
      .el-button{
        margin-right: 30px;
        margin-bottom: 30px;
      }
    }
  }


</style>
<style lang="scss" scoped>
  tbody{
    height: 50vh;
    overflow-x: hidden;
  }
.width {
  width: 150px;
}
.pa50 {
  padding: 10px 0 0 10px;
  .topBox{
    width: 100% !important;
    height: 50px;
    .language{
      width: 150px !important;
      display: inline-block;
    }
  }
}
.around {
  display: flex;
  justify-content: center;
  align-items: center;
}

.p100 {
  padding: 10px 0px;
  .img {
    padding-top: 10px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 30px;
    }
  }
  .Myflex {
    text-align: center;
    /*height: 50px;*/
  }
  .bac247 {
    background-color: rgb(247, 247, 247);
  }
  table {
    width: 100%;
    font-size: 12px;
  }
  .juz {
    text-align: center;
    &:hover{
      background-color: rgb(242,242,242);
    }
    td {
      /*padding: 10px 0;*/
    }
  }

}
.mgwidth {
  display: inline-block;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow:ellipsis;
  text-align: left;
}
p {
  text-align: left;
}
.nini {
  display: flex;
  flex-direction: column;
}
.true {
  background-image: url("../../../../assets/imges/houtai/kai.png");
}
.flase {
  background-image: url("../../../../assets/imges/houtai/guan.png");
}
.lwqimgswtach {
  width: 50px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
}
.center {
  display: flex;
  justify-content: center;
  margin: 0;
}
.btn {
  button {
    // width: 30px;
  }
}
.el-input__inner{
  padding-left: 10px;
}
.input{
  height: 35px;
  padding-left: 10px;
  width: 11%;
}
</style>
