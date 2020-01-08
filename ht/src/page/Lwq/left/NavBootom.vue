<template>
  <div class="nav-main">
    <ul>
      <li
        @click="MfirstNavClick(item.id) "
        v-for="(item,index) in navList"
        :key="item.id"
        :class="{'active':item.id == index1}"
      >
        <span v-if="index==0" class="icon el-icon-user-solid"></span>
        <span v-if="index==1" class="icon el-icon-shopping-bag-2"></span>
        <span v-if="index==2" class="icon el-icon-notebook-2"></span>
        <span v-if="index==3" class="icon el-icon-tickets"></span>
        <span v-if="index==4" class="icon el-icon-s-platform"></span>
        <span v-if="index==5" class="icon el-icon-s-data"></span>
        <span v-if="index==6" class="icon el-icon-s-tools"></span>
        <span v-if="index==7" class="icon el-icon-star-on"></span>
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [
        //从后台拿
        { name: "首页", id: 4 },
        { name: "订单管理", id: 0 },
        { name: "订阅", id: 6 },
        { name: "商品管理", id: 1 },
        { name: "页面管理", id: 2 },
        { name: "统计面板", id: 3 },
        { name: "基础设置", id: 5 },
        { name: "会员管理", id: 7 },
      ],
      index1: 4
    };
  },
  created() {
    //请求后台
    // this.navList=[]
  },
  methods: {
    MfirstNavClick(id) {
      console.log(id, "id去后台拿这个数据谢谢");
      this.index1 = id;
      this.$store.commit("nav/changeH2title", id); //去请求二级标题
      // console.log(this.$store.commit);
      if(id == 4){
        this.$router.push({ path: "/index/main/" + "homeIndex" });
      }
    }
  }
};
</script>
<style lang="scss">
.nav-main {
  display: flex;
  justify-content: center;
  ul {
    flex: 1;
    li {
      color: #999;
      padding: 5px 0;
      font-size: 16px;
      padding-left: 10px;
      text-align: left;
      box-sizing: border-box;
      cursor: pointer;
      &.active {
        background-color: #fff;
        color: #000;
      }
      .icon {
        display: inline-block;
        width: 20px;
      }
    }
  }
}
</style>
