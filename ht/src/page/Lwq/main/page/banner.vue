<template>
  <div>
    <div class="juzhong">

      <el-button size="medium"
                 type="danger"
                 @click="addbannder">添加</el-button>
      <el-button size="medium"
                 type="danger"
                 @click="shuaxin">刷新</el-button>

    </div>

    <my-list ref="nimade"></my-list>

  </div>
</template>

<script>
import MyList from "../../mianTitle/bannderList";
import AddBanner from "../../mianTitle/mark/addBanner/index";

export default {
  components: {
    MyList,
    AddBanner
  },
  methods:{
      shuaxin(){
          this.$refs.nimade.GetShopList()
      },
    addbannder(){
      this.$store.commit("bannder/changeState",true);
      this.$store.commit("bannder/bianji",0);
    }
  }
};
</script>
<style lang="scss" scoped>
.juzhong{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5px;
  /*padding: 10px;*/
  button{
    /*width: 100px;*/
    /*height: 30px;*/
    /*line-height: 30px;*/
    /*padding: 1px;*/
    /*text-align: center;*/
    /*margin-right: 10px;*/
    /*font-size: 16px;*/
    /*background-color: transparent;*/
    /*border: 1px solid slategray;*/
  }
}
</style>
