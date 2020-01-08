<template>
  <div class="pa50">
    <div>
      <el-button size="medium"
                 type="danger"
                 @click="shuaxin">刷新</el-button>
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
<!--            <th>排序</th>-->
<!--            <th>状态</th>-->
<!--            <th>操作</th>-->
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
                     alt
                     srcset />
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
<!--            <td>{{item.paixu}}</td>-->
<!--            <td>-->
<!--              <div class="lwqimgswtach"-->
<!--                   :class="item.classifyStatus?'true':'flase'"-->
<!--                   @click="changeState(index,item.id)"></div>-->
<!--            </td>-->
<!--            <td class="btn">-->
<!--              <div v-if="name=='回收'">-->
<!--                <el-button size="small"-->
<!--                           type="warning"-->
<!--                           @click="shangjia1(item.id)">上架</el-button>-->
<!--                <el-button size="small"-->
<!--                           type="danger"-->
<!--                           @click="qingkong(item.id)">清空</el-button>-->
<!--              </div>-->
<!--              <div v-else-if="name=='下架'">-->
<!--&lt;!&ndash;                <el-button size="small"&ndash;&gt;-->
<!--&lt;!&ndash;                           type="success"&ndash;&gt;-->
<!--&lt;!&ndash;                           @click="xiugai(item.id)">修改</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-button size="small"&ndash;&gt;-->
<!--&lt;!&ndash;                           type="warning"&ndash;&gt;-->
<!--&lt;!&ndash;                           @click="shangjia(item.id)">上架</el-button>&ndash;&gt;-->
<!--                <el-button size="small"-->
<!--                           type="danger"-->
<!--                           @click="changeState(item.id,index,item.category)">删除</el-button>-->
<!--              </div>-->
<!--              <div v-else>-->
<!--                <el-button size="small"-->
<!--                           type="success"-->
<!--                           @click="xiugai(item.id)">修改</el-button>-->
<!--                <el-button size="small"-->
<!--                           type="warning"-->
<!--                           @click="xiajia(item.id)">下架</el-button>-->
<!--                <el-button size="small"-->
<!--                           type="danger"-->
<!--                           @click="dele(item.id)">删除</el-button>-->
<!--              </div>-->
<!--            </td>-->
          </tr>
          </tbody>
        </table>

      </div>
      <div class="page">
        <el-pagination
            background
            :current-page="page"
            @current-change="numChange"
            layout="prev, pager, next"
            :total="totalRows"
          ></el-pagination>
      </div>
    </div>
<!--    <div class="center">-->
<!--      <el-pagination @current-change="handleCurrentChange"-->
<!--                     :page-size="10"-->
<!--                     background-->
<!--                     :current-page.sync="Page"-->
<!--                     layout="prev, pager, next, jumper"-->
<!--                     :total="totalRows"></el-pagination>-->
<!--    </div>-->


  </div>
</template>
<script>
    import MyShop from "./up/shopup";
    import MySeo from "./up/seo";
    import ImgS from "./up/pho";
    import TW from "./up/tuwen";
    import api from "@/api/shop";
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
                page:1,
            };
        },
        components: {
            MyShop,
            MySeo,
            ImgS,
            TW
        },
        created () {
            this.init()
            for (let i = 0; i < 10; i++) {
                this.hh.push(false);
            }
        },
        methods: {
            goPcDetail(id){
              window.open('http://www.geechori.com/guige?id='+id)
            },
            init(){
                api
                    .getList({
                        category: 2,//1是推荐商品 0是展示商品
                        page:this.page
                    })
                    .then(res => {
                        console.log(res.data.data.list);
                        this.arr = res.data.data.list;
                        this.totalRows = parseInt(res.data.data.totalRows);
                    });
            },
            shuaxin(){
              this.init();
            },
            changeState(id,index,state){
                api.changeState({
                    id:id,
                    category:state==2?null:2
                }).then(res=>{
                    console.log(res);
                })
            },
            qingkong(){

            },
            numChange(val) {
              this.page = val
              this.init()
            },
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
    width: 200px;
  }
  .pa50 {
    padding: 10px 0 0 10px;
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
  .page{
    margin-left: 500px;
  }
</style>
