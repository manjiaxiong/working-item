<template>
  <div id="my-ernav">
    <ul>
      <li
        v-for="(item,index) in $store.state.nav.h2Title"
        :key="index"
        :class="{'lactive':id==item.id}"
        :data-id="item.id"
        @click="myh3TitleClick(item.id)"
      >{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
import Router from "vue-router";
export default {
  data() {
    return {
      id: 0
    };
  },
  methods: {
    myh3TitleClick(id) {
      console.log("去后台拿数据放到中央仓库", id);
      //去请求三级标题
      // 需要约定是什么样子的页面ajax返回值中一定要带要做逻辑判断
      this.$store.commit("nav/changeH3title", id);
      this.id = id;
      console.log(this.id);

      if (id.split("-")[0] == 3) {
        //如果是什么什么就去
        if (id.split("-")[1] == 0) {
          this.$router.push({ path: "/index/main/" + "Statistical" }); //统计面板
        } else if (id.split("-")[1] == 4) {
          this.$router.push({ path: "/index/main/" + "UserStatistics" }); //用户统计
        } else if (id.split("-")[1] == 2) {
          this.$router.push({ path: "/index/main/" + "OrderSreceived" }); //订单统计
        } else if (id.split("-")[1] == 5) {
          this.$router.push({ path: "/index/main/" + "statistic" }); //分类统计
        } else if (id.split("-")[1] == 8) {
          this.$router.push({ path: "/index/main/" + "DailyAndMonthly" }); //日报月报
        } else if (id.split("-")[1] == 7) {
          this.$router.push({ path: "/index/main/" + "SourcesOfStatistics" }); //来源统计
        } else if (id.split("-")[1] == 1) {
          this.$router.push({ path: "/index/main/" + "Mystatistics" }); //订单统计
        } else if (id.split("-")[1] == 3) {
          this.$router.push({ path: "/index/main/" + "Mycommodity" }); //商品统计统计
        } else if (id.split("-")[1] == 6) {
          this.$router.push({ path: "/index/main/" + "Search" }); //商品统计统计
        } else if (id.split("-")[1] == 9) {
          this.$router.push({ path: "/index/main/" + "exportData" }); //数据导出
        }

        // 通过id来判断应该前往哪个页面 写成swich语句
      } else if (id.split("-")[0] == 0) {
        if (id.split("-")[1] == 4) {
          this.$router.push({ path: "/index/main1/" + "MyEmailmessages" }); //邮件信息
        } else if (id.split("-")[1] == 2) {
          this.$router.push({ path: "/index/main1/" + "Usercart" }); //用户购物车
        } else if (id.split("-")[1] == 3) {
          this.$router.push({ path: "/index/main1/" + "userCollection" }); //用户收藏
        } else if (id.split("-")[1] == 0) {
          this.$router.push({ path: "/index/main1/" + "Inquirymanagement" }); //询盘管理
        } else if (id.split("-")[1] == 1) {
          this.$router.push({ path: "/index/main1/" + "orderList" }); //订单管理
        } else if (id.split("-")[1] == 5) {
          this.$router.push({ path: "/index/main1/" + "exportOrder" }); //导出订单
        } else if (id.split("-")[1] == 6) {
          this.$router.push({ path: "/index/main1/" + "exportEnquiry" }); //导出询盘
        }
      } else if (id.split("-")[0] == 2) {
        if (id.split("-")[1] == 2) {
          this.$router.push({ path: "/index/main1/" + "privateStringTitle" }); //页面管理一级分类
        } else if (id.split("-")[1] == 3) {
          this.$router.push({ path: "/index/main1/" + "reclassify" }); //页面管理二级分类
        } else if (id.split("-")[1] == 4) {
          this.$router.push({ path: "/index/main1/" + "thirdClassification" }); //页面管理三级分类
        } else if (id.split("-")[1] == 0) {
          this.$router.push({ path: "/index/main1/" + "banner" }); //首页bannaer
        }else if(id.split("-")[1] == 1){
            this.$router.push({ path: "/index/main1/" + "Secondbannder" }); //分类bannaer
        }else if (id.split("-")[1] == 5){
            this.$router.push({ path: "/index/main1/" + "indeximgSet" }); //首页上下介绍
        }else  if(id.split("-")[1] == 6){
            this.$router.push({ path: "/index/main1/" + "indexLangConfig" }); //语言
        }

      } else if (id.split("-")[0] == 1) {
        if (id.split("-")[1] == 0) {
          this.$router.push({ path: "/index/main1/" + "shopList" }); //商品列表
        } else if (id.split("-")[1] == 1) {
          this.$router.push({ path: "/index/main1/" + "recommend" }); //推荐商品
        }else if(id.split("-")[1] == 2){
            this.$router.push({ path: "/index/main1/" + "showShop" }); //展示商品
        }else if(id.split("-")[1] == 3){
            this.$router.push({ path: "/index/main1/" + "shopHeader" }); //首页头商品
        }else if(id.split("-")[1] == 4){
            this.$router.push({ path: "/index/main1/" + "shopFooter" }); //首页底商品
        }else if(id.split("-")[1] == 5){
            this.$router.push({ path: "/index/main1/" + "shopLabel" }); //商品标签
        }else if(id.split("-")[1] == 6){
            this.$router.push({ path: "/index/main1/" + "shopAttribute" }); //商品属性
        }else if(id.split("-")[1] == 7){
            this.$router.push({ path: "/index/main1/" + "shopBrand" }); //商品品牌
        }
      }else if (id.split("-")[0] == 4){
        if (id.split("-")[1] == 0) {
          this.$router.push({ path: "/index/main/" + "homeIndex" }); //后台主页
        }
      }else if (id.split("-")[0] == 5){
        if (id.split("-")[1] == 0) {
          this.$router.push({ path: "/index/main1/" + "xlsList" }); //上传表格
        }else if(id.split("-")[1] == 1){
          this.$router.push({ path: "/index/main1/" + "service" }); //其他设置
        }else if(id.split("-")[1] == 2){
          this.$router.push({ path: "/index/main1/" + "blogClassification" }); //博客分类
        }else if(id.split("-")[1] == 3){
          this.$router.push({ path: "/index/main1/" + "blogList" }); //博客管理
        }else if(id.split("-")[1] == 4){
          this.$router.push({ path: "/index/main1/" + "homeSEO" }); //首页seo设置
        }
        else if(id.split("-")[1] == 5){
          this.$router.push({ path: "/index/main1/" + "otherSEO" }); //其他SEO设置
        }
        else if(id.split("-")[1] == 6){
          this.$router.push({ path: "/index/main1/" + "notice" }); //公告设置
        }
      }else if (id.split("-")[0] == 6){
        if (id.split("-")[1] == 0) {
          this.$router.push({ path: "/index/main1/" + "subscriptionConfiguration" }); //订阅配置
        }else if(id.split("-")[1] == 1){
          this.$router.push({ path: "/index/main1/" + "subscriptionList" }); //订阅列表
        }else if(id.split("-")[1] == 2){
          this.$router.push({ path: "/index/main1/" + "unSubscriptionList" }); //订阅日志
        }else if(id.split("-")[1] == 3){
          this.$router.push({ path: "/index/main1/" + "unSubscriptionList1" }); //退订日志
        }
      }else if (id.split("-")[0] == 7){
        if (id.split("-")[1] == 0) {
          this.$router.push({ path: "/index/main1/" + "memberList" }); //会员列表
        }
      }
    }
  }
};
</script>
<style lang="scss">
#my-ernav {
  height: calc(100% - 67px);
  ul {
    li {
      width: 150px;
      cursor: pointer;
      // height: 40px;
      font-size: 15px;
      // line-height: 40px;
       padding: 5px 0;
      overflow: hidden;
      //   text-emphasis:
      white-space: nowrap;
      text-overflow: ellipsis;
      padding-left: 10px;
      box-sizing: border-box;
      &.lactive {
        background-color: rgb(255, 255, 255);
      }
    }
  }
}
.w-e-button-container{
  display: flex;
  justify-content: center;
  button{
    width: 100px;
    background-color: #ccc !important;
  }
}
</style>
