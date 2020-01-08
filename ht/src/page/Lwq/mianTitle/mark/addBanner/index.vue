<template>
  <div class="mark">
    <div class="mian">
      <div>
        <div class="block-top">
          <span>{{$store.state.bannder.bianjizt==0?'添加banner':'修改'}}</span>
        </div>
        <div>
          <div class="width">
            <span>链接商品</span>
            <el-select
              class="Input1"
              v-model="value"
              :placeholder="linkGoodsName?linkGoodsName:'请选择'"
            >
              <el-option
                v-for="(item,index) in list"
                :key="index"
                @click="change(item.id)"
                :label="item.goodNames"
                :value="item.goodNames"
              ></el-option>
            </el-select>
          </div>
          <div class="width">
            <span>排序</span>
            <input class="Input1 input2" v-model="num" type="number" />
          </div>
          <div class="width">
            <span>banner图</span>
            <div class="ml50 bannder">
              <my-imgupdata :good_show="good_show"></my-imgupdata>
            </div>
          </div>
        </div>
        <div class="myflex">
          <button class="confirm" @click="confirm">确定</button>
          <button @click="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MyImgupdata from "../../imgUp";
import api from "@/api/bannder";
export default {
  components: {
    MyImgupdata
  },
  created() {
    //查询商品展示数据到
    let that = this;

    if (that.$store.state.bannder.bianjizt == 1) {
      console.log(that.$store.state.bannder.list, "嗨小老弟12123123");
      let state = that.$store.state.bannder.list;
      this.num = state.sortNumber;
      this.linkGoodsName = state.linkGoodsName; //链接商品
      this.linkGoodsNames = state.linkGoodsNames; //链接商品
      this.linkGoodsUrl = state.linkGoodsUrl
      this.good_show = state.imgUrl
    }
    api.GetShopList().then(res => {
      that.list = res.data.data.list;
      console.log(that.list)
    });
    // }
  },
  data() {
    return {
      list: [],
      id: "",//
      num: "",
      value: "",
      linkGoodsName: "",
      linkGoodsNames: "",
      imgUrl: "",
      good_show:[],
      linkGoodsUrl:''
    };
  },
  watch: {
    value(val) {
      var that = this
      console.log(val, "你是");
      this.list.forEach(function(value,index){
        if(val == value.goodNames){
          that.linkGoodsUrl = that.list[index].id
        }
      })
    }
  },
  methods: {
    confirm(val) {
      let that = this;
      let state = this.$store.state.bannder;
      console.log(this.list,this.linkGoodsNames)
      // that.list.forEach(function(value,index){
      //   if(that.linkGoodsNames == value.goodNames){
      //     that.linkGoodsUrl = value.id
      //   }
      // })
      if (state.bianjizt == 0) {
        //保存
        let that=this;
        var r = that.$store.state.imglist.arr.filter(function (s) {
           return s && s.trim();
        });
        console.log(r)
        api
          .SetBanner({
            linkGoodsUrl: that.linkGoodsUrl, //id
            imgUrl: r[0],
            category: "0",
            sortNumber: that.num
          })
          .then(res => {
            console.log(res.data.msg == "操作成功");
            if (res.data.msg == "操作成功") {
              that.$store.commit("bannder/changeState", false);
                this.$message({
                    showClose: true,
                    type: "success",
                    message: "添加成功"
                });
              that.value = "";
              that.num = "";
              return api.GetAllBanner({
                category:0
              })

            }else {
                this.$message.error('添加失败');
            }
          }).then(res=>{
            // this.$store.commit("bannder/setArr",val)
            that.shuxin(res.data.data.list)
            // console.log(res,'年四点喀什觉得可爱极了卡视角来看待')
          });
      } else if (state.bianjizt == 1) {
        console.log(this.value)
        if(!this.value){
          this.linkGoodsNames = this.linkGoodsName
        }else{
          this.linkGoodsNames = this.value
        }
        this.list.forEach(function(value,index){
          console.log('hhhhhh',value,that.linkGoodsNames)
          if(that.linkGoodsNames == value.goodNames){
            that.linkGoodsUrl = value.id
          }
        })
        //编辑1级banner
        api.UpData({
          id: state.id, //id
          linkGoodsUrl: that.linkGoodsUrl, //他爸爸的id
          imgUrl: sessionStorage.getItem('banner'), //先放空
          category: "0",
          sortNumber: that.num,
          linkGoodsName:this.linkGoodsNames
        }).then(res=>{
          console.log(res.data.msg);
          if(res.data.msg=="操作成功"){
            //隐藏
              this.$message({
                  showClose: true,
                  type: "success",
                  message: "修改成功"
              });
            that.$store.commit("bannder/changeState", false);
            return api.GetAllBanner({
              category:0
            })
          }else {
              this.$message.error('修改失败');
          }
        })
      } else if (state.bianjizt == 2) {
        //编辑2级分类
      }
    },
    shuxin(val){
      this.$store.commit("bannder/setArr",val)
    },
    cancel() {
      this.$store.commit("bannder/changeState", false);
    },
    change(val) {
      // this.linkGoodsUrl = val;
      console.log("我的呃呃的阿");
    }
  }
};
</script>
<style lang="scss" scoped>
.mark {
  position: absolute;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);

  .mian {
    font-size: 16px;
    width: 500px;
    height: 500px;
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    background-color: white;
    padding-bottom: 50px;
  }
  .block-top {
    display: flex;
    justify-content: center;
    font-size: 20px;
    padding: 10px 0;
    background-color: #FFFFFF;
  }
  .width {
    margin-top: 30px;
    span {
      display: inline-block;
      width: 100px;
      font-size: 18px;
      padding-left: 20px;
    }
  }
  .Input1 {
    width: 250px;
    height: 38px;
    font-size: 20px;
  }
  .input2 {
    border: 1px solid #999;
  }
  .ml50 {
    padding-left: 50px;
  }
  .myflex {
    // position: absolute;
    // bottom: 20px;
    display: flex;
    justify-content: center;
    margin-top: 50px;
    button {
      margin-right: 50px;
      font-size: 16px;
      width: 70px;
      height: 40px;
      color: #FFFFFF;
      background-color: rgb(245, 108, 108);
      border-style: none;
      border-radius: 5px;
      &.confirm {
        background-color: rgb(129, 171, 255);
      }
    }
  }
  .bannder {
    height: 200px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
