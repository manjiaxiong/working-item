<template>
  <table border="0" cellspacing="0">
    <tr class="color">
      <th>banner</th>
      <th>排序</th>
      <th>链接商品</th>
      <th>创建时间</th>
      <th>操作</th>
    </tr>
    <tr class="Myhover" v-for="(item,index) in $store.state.bannder.arr" :key="index">
      <td class="myimg">
        <img :src="item.imgUrl" alt />
      </td>
      <td >
        <span
          class="border"
          :data-id="item.id"
          @blur="changeNum"
          contenteditable="true"
        >{{item.sortNumber}}</span>
      </td>
      <td class="lianje" @click="goPcDetail(item.linkGoodsUrl)" style="cursor: pointer;"> {{item.linkGoodsName}}</td>
      <td class="juzhong">
        <div class>{{item.createTime}}</div>
      </td>
      <td>
            <el-button type="success" @click="change(item.id,1)">修改</el-button>
            <el-button type="danger" @click="change(item.id,2)">删除</el-button>
      </td>
    </tr>
  </table>
</template>

<script>
import api from "@/api/bannder";
export default {
  data() {
    return {
      arr: []
    };
  },
  mounted() {
    let that = this;
    that.GetShopList(that);
  },
  methods: {
    goPcDetail(id){
      window.open('http://www.geechori.com/guige?id='+id)
    },
    GetShopList(that) {
       that=that?that:this;
      api
        .GetAllBanner({
          category: 0
        })
        .then(res => {
          that.arr = res.data.data.list;

          that.$store.commit("bannder/setArr", res.data.data.list);
          console.log(res, "我是查询");
        });
    },
    changeState(index) {
      this.arr[index].zt = !this.arr[index].zt;
    },
    async change(val,a) {
      console.log(a, "你是哪位");
      let id = val;
      let that = this;
      if (a == 2) {
        //删除
        await api
          .DeleatBanner({
            id: id
          })
          .then(res => {
            that.GetShopList(that); //刷新
          });
      } else if (a == 1) {
        //编辑
        await api
          .GetOne({
            id: id
          })
          .then(res => {
            
            var img = []
            img.push(res.data.data.imgUrl)
            console.log('res',res);
            res.data.data.imgUrl = img
            that.$store.commit("bannder/changeList", res.data.data);
            that.$store.commit("bannder/changeState", true);
            that.$store.commit("bannder/bianji", 1);
            console.log(this.$store.state.bannder)
          });
      }
    },
    changeNum(e){
      api.UpData({
        id:e.target.dataset.id,
        sortNumber:e.target.innerHTML
      }).then(res=>{
        console.log(res);

      })
    }
  }
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  font-size: 16px;
}
.lianje{
  /*display: inline-block;*/
  white-space: nowrap;
  max-width: 200px;
  overflow: hidden;
  text-overflow:ellipsis;
}
.color {
  color: #555;
}
.Myhover {
  color: #555;
  &:hover {
    background-color: #f5f8fc;
    /*color: #fff;*/
    color: rgba(85,85,155,80%);
  }
  td {
    text-align: center;
    padding: 10px 0;

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
  background-image: url("../../../assets/imges/houtai/kai.png");
}
.flase {
  background-image: url("../../../assets/imges/houtai/guan.png");
}
.myimg {
  width: 350px;
  height: 40px;
  img {
    width: 300px;
    height: 100%;
  }
}
</style>
