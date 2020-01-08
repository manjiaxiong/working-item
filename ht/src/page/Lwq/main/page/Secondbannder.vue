<template>
  <div>
    <div class="juzhong">
      <div class="juzhong">
        <el-button size="medium"
                   type="danger"
                   @click="addbannder">添加
        </el-button>

        <el-button size="medium"
                   type="danger"
                   @click="shuxin">刷新
        </el-button>
      </div>
    </div>
    <div class="lwqnima">
      <table border="0"
             cellspacing="0">
        <tr class="color">
          <th>banner</th>
          <th>排序</th>
          <th>链接一级目录</th>
          <th>创建时间</th>
          <th>操作</th>
        </tr>
        <tr class="Myhover"
            v-for="(item,index) in arr"
            :key="index">
          <td class="myimg">
            <img :src="item.imgUrl"
                 alt/>
          </td>
          <td>
            <span class="border"
                  :data-id="item.id"
                  :data-pid="item.linkGoodsUrl"
                  @blur="changeNum"
                  contenteditable="true">{{item.sortNumber}}</span>
          </td>
          <td class="max-width50" @click="goPcDetail(item.linkGoodsUrl)" style="cursor: pointer;">{{item.linkGoodsName}}</td>
          <td>
            <div class>{{item.createTime}}</div>
          </td>

          <td>
            <el-button type="success"
                       @click="xiugai(item.id)">修改
            </el-button>
            <el-button type="danger"
                       @click="shanchu(item.id)">删除
            </el-button>
          </td>
        </tr>
      </table>
    </div>
    <div>
      <div class="center">
        <el-pagination @current-change="handleCurrentChange"
                       :page-size="10"
                       :current-page="pageNum"
                       layout="prev, pager, next, jumper"
                       :total="totalRows"></el-pagination>
      </div>
    </div>
    <div>
      <el-dialog destroy-on-close="true"
                 center
                 :title="zt==0?'添加banner':'修改'"
                 :visible.sync="dialogTableVisible">
        <div class="width">
          <div>
            <span>链接分类</span>
            <el-select class="input1"
                       v-model="myfenlei"
                       :placeholder="zt==0?'请选择':morenfel">
              <el-option v-for="item in arr1"
                         :key="item.id"
                         :label="item.classifyNames"
                         :value="item.id"></el-option>
            </el-select>
          </div>
        </div>
        <div class="width">
          <div>
            <span>链接商品</span>
            <el-select class="input1"
                       v-model="myshop1"
                       :placeholder="zt==0?'请选择':morenshop">
              <el-option v-for="item in myshop"
                         :key="item.id"
                         :label="item.goodNames"
                         :value="item.id"></el-option>
            </el-select>
          </div>
        </div>
        <div class="width">
          <div>
            <span>排序</span>
            <input class="input1"
                   v-model="sortNum"
                   type="number"/>
          </div>
        </div>
        <div class="width">
          <div class="flex1">
            <span>banner图</span>
            <div>
              <img-up :good_show="good_show"></img-up>
            </div>
          </div>
        </div>
        <div class="width">
          <el-button type="primary"
                     @click="commit">确 定
          </el-button>
          <el-button @click="dialogTableVisible  = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
    import MyList from "../../mianTitle/bannderList";
    import AddBanner from "../../mianTitle/mark/addBanner/index";
    import ImgUp from "../../mianTitle/imgUp";
    import api from "@/api/bannder";
    import api1 from "@/api/one";


    export default {
        components: {
            MyList,
            AddBanner,
            ImgUp
        },
        data() {
            return {
                arr: "",
                totalRows: 0,
                dialogTableVisible: false,
                arr1: [],
                myfenlei: "",
                myshop: "",
                myshop1: "",//选择的商品id
                morenfel: "",
                morenshop: "",
                sortNum: "",
                zt: "", //0 是添加 1 是修改
                pageNum: 1, //当前页数
                good_show:[],
                classId:'',
                linkGoodsUrl:'',
                category:1,
                id:'',
                linkGoodsName:''
            };
        },
        watch: {
            myfenlei(val) {
              var that = this
              this.arr1.forEach(function(value,index){
                if(val == value.id){
                  that.classId = value.id
                }
              })
              //链接的一级商品
              api1
                  .getfenLeiShop({
                      classId: this.classId
                  })
                  .then(res => {
                      console.log(res, "你好");
                      this.myshop = res.data.data;
                  });
            },
            myshop(val) {
                console.log('111',val);
                if(val.length == 0){
                  this.myshop1 = ''
                }
            }
        },
        created() {
            //请求所有banner
            this.chushiahu();
        },
        methods: {
            goPcDetail(id){
              window.open('http://www.geechori.com/guige?id='+id)
            },
            chushiahu() {
                let that = this;

                api
                    .GetAllBanner({
                        size: "10",
                        page: "1",
                        category: "",
                        category: "1"
                    })
                    .then(res => {
                        this.totalRows = res.data.data.totalRows;
                        this.arr = res.data.data.list;
                    });

                //请求一级分类
                api1
                    .getClassOne({
                        classsifyType: 1,
                        parentId: 0
                    })
                    .then(res => {
                        if (res.data.msg == "查询成功") {
                            that.arr1 = res.data.data.list;
                        }
                    });
            },
            addbannder() {
              this.good_show = []
              this.myfenlei = ''
              this.myshop1 = ''
                this.dialogTableVisible = true;
                this.sortNum = "";
                this.zt = 0; //添加
            },
            handleCurrentChange(val) {
                api
                    .GetAllBanner({
                        size: "10",
                        page: val,
                        category: "",
                        category: "1"
                    })
                    .then(res => {
                        console.log(res.data.data.list);
                        this.arr = res.data.data.list;
                    });
            },
            changeNum(e) {
                let that = this;
                api
                    .UpData({
                        id: e.target.dataset.id,
                        sortNumber: parseInt(e.target.innerHTML)
                    })
                    .then(res => {
                        console.log(res);
                        if (res.data.msg == "操作成功") {
                            return api.GetAllBanner({
                                size: "10",
                                page: "1",

                                category: "",
                                category: "1"
                            });
                        }
                    })
                    .then(res => {
                        console.log(res.data);
                        this.totalRows = res.data.data.totalRows;
                        this.arr = res.data.data.list;
                    });
            },
            xiugai(id) {
                api
                    .GetOne({
                        id: id
                    })
                    .then(res => {
                      console.log('hhhhhh',res.data.data)
                      var img = []
                      img.push(res.data.data.imgUrl)
                      res.data.data.imgUrl = img
                      this.classId = res.data.data.classId;
                      this.linkGoodsUrl = res.data.data.linkGoodsUrl;
                      this.myfenlei = res.data.data.classifyName;
                      this.myshop1 = res.data.data.linkGoodsName;
                      this.category = res.data.data.category;
                      this.sortNum = res.data.data.sortNumber;
                      this.good_show = res.data.data.imgUrl
                      this.id = res.data.data.id
                      this.dialogTableVisible = true;
                      this.zt = 1; //修改
                    });
            },
            shanchu(id) {
                let that = this;
                api
                    .DeleatBanner({
                        id: id
                    })
                    .then(res => {
                        if (res.data.msg == "操作成功") {
                            //刷新数据
                            return api.GetAllBanner({
                                size: "10",
                                page: "1",
                                category: "",
                                category: "1"
                            });
                        }
                    })
                    .then(res => {
                        console.log(res);
                        this.totalRows = res.data.data.totalRows;
                        this.arr = res.data.data.list;
                    });
            },
            shuxin(that) {
                api
                    .GetAllBanner({
                        size: "10",
                        page: "1",
                        category: "",
                        category: "1"
                    })
                    .then(res => {
                        that.arr = res.data.data.list;
                        that.totalRows = res.data.data.totalRows;
                    });
            },
            commit() {
              console.log(this.myfenlei,this.morenshop)
                let that = this;
                var r = that.$store.state.imglist.arr.filter(function (s) {
                   return s && s.trim();
                });
                if(this.zt == 0){//添加
                  api
                    .SetBanner({
                        category: 1,
                        classId: that.myfenlei,
                        linkGoodsUrl: that.myshop1, //父级的id
                        sortNumber: that.sortNum,
                        imgUrl: r[0],
                    })
                    .then(res => {
                        if (res.data.msg == "操作成功") {
                            that.dialogTableVisible = false;
                            if (res.data.msg == "操作成功") {
                                //刷新数据
                                return api.GetAllBanner({
                                    size: "10",
                                    page: "1",
                                    category: "",
                                    category: "1"
                                });
                            }
                        }
                    })
                    .then(res => {
                        this.totalRows = parseInt(res.data.data.totalRows);
                        this.arr = res.data.data.list;
                    });
                }else{//修改
                  console.log(this.myshop,this.myshop1)
                  this.arr1.forEach(function(value,index){
                    if(that.morenfel == value.classifyNames){
                      that.classId = value.id
                    }
                  })
                  this.myshop.forEach(function(value,index){
                    if(that.myshop1 == value.id){
                      console.log(value)
                      that.linkGoodsName = value.goodNames
                      that.linkGoodsUrl = value.id
                    }
                  })
                  console.log(that.linkGoodsName)
                  api.UpData({
                    category: this.category,
                    classId: this.classId,
                    linkGoodsUrl: this.linkGoodsUrl, //父级的id
                    sortNumber: this.sortNum,
                    id: this.id,
                    imgUrl: r[0],
                    linkGoodsName:this.linkGoodsName=='' ? this.myshop1 : this.linkGoodsName
                  })
                  .then(res => {
                        if (res.data.msg == "操作成功") {
                            that.dialogTableVisible = false;
                            if (res.data.msg == "操作成功") {
                                //刷新数据
                                return api.GetAllBanner({
                                    size: "10",
                                    page: "1",
                                    category: "",
                                    category: "1"
                                });
                            }
                        }
                    })
                    .then(res => {
                        this.totalRows = parseInt(res.data.data.totalRows);
                        this.arr = res.data.data.list;
                    });
                }
                
            }
        }
    };
</script>
<style lang="scss" scoped>
  .center {
    display: flex;
    justify-content: center;
  }
.max-width50{
  max-width: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
  .juzhong {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 5px;
    /*button {*/
    /*  width: 100px;*/
    /*  height: 30px;*/
    /*  line-height: 30px;*/
    /*  text-align: center;*/
    /*  margin-right: 10px;*/
    /*  font-size: 16px;*/
    /*  background-color: rgb(125,125,195);*/
    /*  color: #FFFFFF;*/
    /*  border: 1px solid slategray;*/
    /*}*/
  }

  .lwqnima {
    table {
      width: 100%;
      font-size: 16px;
    }

    .color {
      color: #555;
      background: #f7f7f7;

      th {
        padding: 20px 10px;
      }
    }

    .Myhover {
      color: #555;

      &:hover {
        background-color: rgb(242, 242, 242);
        /*color: ;*/
      }

      td {
        text-align: center;
        padding: 10px 0;
        // border: 1px solid #ccc;
        &:hover {
        }
      }
    }

    .border {
      display: inline-block;
      border: 1px solid #888;
      padding: 0 20px;
    }

    .juzhong {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .lwqimgswtach {
      // width: 50px;
      // height: 58px;
      width: 50px;
      height: 20px;
      background-size: cover;
      background-repeat: no-repeat;
    }

    .true {
      background-image: url("../../../../assets/imges/houtai/kai.png");
    }

    .flase {
      background-image: url("../../../../assets/imges/houtai/guan.png");
    }

    .myimg {
      width: 273px;
      height: 38px;

      img {
        height: 100%;
      }
    }
  }

  .width {
    display: flex;
    justify-content: center;
    margin: 30px 0;

    span {
      display: inline-block;
      width: 100px;
    }

    .input1 {
      width: 200px;
      height: 30px;
    }

    .flex1 {
      width: 300px;
    }
  }
</style>
