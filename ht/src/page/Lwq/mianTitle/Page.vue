<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="'10'"
      layout="prev, pager, next, jumper"
      :total="$store.state.shop.length"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  created(){
    // console.log(this.$store.state)
  },
  methods: {
    handleSizeChange(val) {
 
    },
    handleCurrentChange(val) {
      //改变当前的页数
      this.$store.commit("shop/changeNum", val);
    },
    currentPage3() {

    }
  },
  computed: {

  }
};
</script>
<style lang="scss">
.el-pager li {
 // 进行修改背景和字体
//   color: #fff;
  // text-align: center;
  //   min-width: 28px;
  //   height: 28px;
  //   background-color: transparent;
  // &.active{
  //     color: #ffffff;
  //   border-radius: 50%;
  //   background-color: #666666;
  // }

}

//左右箭头到达页数的最开始或者最后的背景色
.el-pagination button:disabled{
       background-color: transparent;
}

//左右箭头的背景色
.el-pagination .btn-next, .el-pagination .btn-prev{
     background-color: transparent;
}
</style>