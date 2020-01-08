import Vue from 'vue'
import Router from 'vue-router'

import index from "@/components/Lwq/index"
// 带时间选择的
import main from "@/page/Lwq/main/mainTime.vue"
import echarDetail from "@/page/Lwq/main/echar/echarDetail.vue"
// 信息主体
import main1 from "@/page/Lwq/main/mainXinxi.vue"
import UserStatistics from "@/page/Lwq/main/Statistical/UserStatistic.vue"
import exportData from "@/page/Lwq/main/Statistical/exportData.vue"
import OrderSreceived from "@/page/Lwq/main/Statistical/OrderSreceived.vue"
import shopSreceived from "@/page/Lwq/main/Statistical/shopSreceived.vue"
//统计面板详情
import tongjiDetail from "@/page/Lwq/main/Statistical/tongjiDetail.vue"
import zongtongjiDetail from "@/page/Lwq/main/Statistical/zongtongjiDetail.vue"
import shuangxianDetail from "@/page/Lwq/main/Statistical/shuangxianDetail.vue"

import login from "@/components/Lwq/login.vue"
import demo5 from "@/page/Lwq/mianTitle/imgUp"
import Statistical from "@/page/Lwq/main/Statistical/Statistical"
import statistic from "@/page/Lwq/main/Statistical/statistic"
import DailyAndMonthly from "@/page/Lwq/main/Statistical/DailyAndMonthly"
import SourcesOfStatistics from "@/page/Lwq/main/Statistical/SourcesOfStatistics"
import Mystatistics from "@/page/Lwq/main/Statistical/Mystatistics"
import Mycommodity from "@/page/Lwq/main/Statistical/commodity"
import lookCountry from "@/page/Lwq/main/Statistical/lookCountry"
import MyEmailmessages from "@/page/Lwq/main/order/Emailmessages"
import Inquirymanagement from "@/page/Lwq/main/order/Inquirymanagement"
import orderList from "@/page/Lwq/main/order/orderList"
import homeIndex from "@/page/Lwq/main/order/homeIndex"//后台主页
import exportOrder from "@/page/Lwq/main/order/exportOrder"
import exportEnquiry from "@/page/Lwq/main/order/exportEnquiry"
import subscriptionList from "@/page/Lwq/main/order/subscriptionList"
import unSubscriptionList from "@/page/Lwq/main/order/unSubscriptionList"
import unSubscriptionList1 from "@/page/Lwq/main/order/unSubscriptionList1"
import privateStringTitle from "@/page/Lwq/main/page/privateStringTitle"
import listoneDetail from "@/page/Lwq/main/page/listoneDetail"
import listtwoDetail from "@/page/Lwq/main/page/listtwoDetail"
import reclassify from "@/page/Lwq/main/page/reclassify"
import thirdClassification from "@/page/Lwq/main/page/thirdClassification"
import soldOut from "@/page/Lwq/main/shop/soldOut"
import shelf from '@/page/Lwq/main/shop/shelf'
import shopLabel from '@/page/Lwq/main/shop/shopLabel'
import shopAttribute from '@/page/Lwq/main/shop/shopAttribute'
import shopBrand from '@/page/Lwq/main/shop/shopBrand'
import labelDetail from '@/page/Lwq/main/shop/labelDetail'
import attributeDetail from '@/page/Lwq/main/shop/attributeDetail'
import brandDetail from '@/page/Lwq/main/shop/brandDetail'
import recycle from "@/page/Lwq/main/shop/recycle"
import shopList from "@/page/Lwq/main/shop/shopList"
import showShop from "@/page/Lwq/main/shop/showShop"
import recommend from "@/page/Lwq/main/shop/recommend"
import shopHeader from "@/page/Lwq/main/shop/shopHeader"
import shopFooter from "@/page/Lwq/main/shop/shopFooter"
import banner from "@/page/Lwq/main/page/banner"
import Secondbannder from "@/page/Lwq/main/page/Secondbannder.vue"
import indexLangConfig from "@/page/Lwq/main/page/indexLangConfig/index.vue"
import  header from "@/page/Lwq/main/page/indexLangConfig/header.vue"
import footer from "@/page/Lwq/main/page/indexLangConfig/footer"
import blogList from "@/page/Lwq/main/page/blogList"
import memberList from "@/page/Lwq/main/page/memberList"
import userInfoView from "@/page/Lwq/main/page/userInfoView"
import homeSEO from "@/page/Lwq/main/page/homeSEO"
import otherSEO from "@/page/Lwq/main/page/otherSEO"
import notice from "@/page/Lwq/main/page/notice"
import blogClassification from "@/page/Lwq/main/page/blogClassification"
import xlsList from "@/page/Lwq/main/page/xlsList"
import aboutUs from "@/page/Lwq/main/page/aboutUs"
import service from "@/page/Lwq/main/page/service"
import Usercart from "@/page/Lwq/main/order/Usercart"
import userCollection from "@/page/Lwq/main/order/userCollection"
import subscriptionConfiguration from "@/page/Lwq/main/order/subscriptionConfiguration"
import Search from "@/page/Lwq/main/Statistical/Search"
import indeximgSet from "@/page/Lwq/main/page/indeximgSet"


Vue.use(Router);


export default new Router({
  mode: "hash",
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [

        {
          path: 'main/',
          name: 'main',
          component: main,
          children: [
            {
              path: 'Statistical/',
              name: 'Statistical',
              component: Statistical,
            },
            {
              path: 'homeIndex/',
              name: 'homeIndex',
              component: homeIndex,
            },
             {
              path: "UserStatistics/",
              name: "UserStatistics",
              component: UserStatistics,
            },{
              path: "exportData/",//导出数据
              name: "exportData",
              component: exportData,
            }, {
              path: "OrderSreceived/",
              name: "OrderSreceived",
              component: OrderSreceived,//订单统计
            }, {
              path: "shopSreceived/",
              name: "shopSreceived",
              component: shopSreceived,//商品统计趋势
            },{
              path: "tongjiDetail/",
              name: "tongjiDetail",
              component: tongjiDetail,//统计面板详情
            },
            {
              path: "zongtongjiDetail/",
              name: "zongtongjiDetail",
              component: zongtongjiDetail,//总统计面板详情
            },
            {
              path: "shuangxianDetail/",
              name: "shuangxianDetail",
              component: shuangxianDetail,//订单统计面板详情
            },
             {

              path: "statistic/",
              name: "statistic",
              component: statistic,//分类统计
            }, {

              path: "DailyAndMonthly/",
              name: "DailyAndMonthly",
              component: DailyAndMonthly,//分类统计
            }, {
              path: "SourcesOfStatistics/",
              name: "SourcesOfStatistics",
              component: SourcesOfStatistics//来源统计
            }, {
              path: "Mystatistics/",//流量统计
              name: "Mystatistics",
              component: Mystatistics
            }, {
              path: "Mycommodity/",//商品统计
              name: "Mycommodity",
              component: Mycommodity
            },
            {
              path: "lookCountry/",
              name: "lookCountry",
              component: lookCountry
            },
             {

              path: "Search/",//收索统计
              name: "Search",
              component: Search
            },
            {

              path: "echarDetail/",//收索统计
              name: "echarDetail",
              component: echarDetail
            }
          ]
        },
        {
          path: 'main1/',
          name: 'main1',
          component: main1,
          children: [
            {
              path: 'MyEmailmessages/',//商品统计
              name: 'MyEmailmessages',
              component: MyEmailmessages
            }, {
              path: "Usercart/",
              name: "Usercart",
              component: Usercart
            }, {
              path: "userCollection/",
              name: "userCollection",
              component: userCollection
            },{
              path: "subscriptionConfiguration/",
              name: "subscriptionConfiguration",
              component: subscriptionConfiguration
            }, {
              path: "privateStringTitle/",//页面管理一级分类
              name: "privateStringTitle",
              component: privateStringTitle
            }, {
              path: "listoneDetail/",//页面管理一级分类的关联分类
              name: "listoneDetail",
              component: listoneDetail
            }, {
              path: "listtwoDetail/",//页面管理二级分类的关联商品
              name: "listtwoDetail",
              component: listtwoDetail
            },
            {
              path:"indeximgSet/",//首页图片设置
              name:"indeximgSet",
              component:indeximgSet
            },
            {
              path: "banner/", //首页banner
              name: "banner",
              component: banner
            }, {
              path: "Secondbannder/", //分类banner
              name: "Secondbannder",
              component: Secondbannder

            },
            {
              path: "aboutUs/", //关于我们
              name: "aboutUs",
              component: aboutUs

            },
            {
              path: "blogList/",
              name: "blogList",
              component: blogList
            },
            {
              path: "memberList/",
              name: "memberList",
              component: memberList
            },
            {
              path: "userInfoView/",
              name: "userInfoView",
              component: userInfoView
            },
            {
              path: "homeSEO/",
              name: "homeSEO",
              component: homeSEO

            },
            {
              path: "otherSEO/",
              name: "otherSEO",
              component: otherSEO

            },
            {
              path: "notice/",
              name: "notice",
              component: notice
            },
            {
              path: "blogClassification/",
              name: "blogClassification",
              component: blogClassification

            },
            {
              path: "xlsList/",
              name: "xlsList",
              component: xlsList

            },
            {
              path: "service/", //服务条款和隐私政策
              name: "service",
              component: service

            },
            {
              path: "reclassify/",//页面二级管理
              name: "reclassify",
              component: reclassify
            },
            {
              path: "thirdClassification/",//页面三级管理
              name: "thirdClassification",
              component: thirdClassification
            },
            {
              path:"indexLangConfig/",//首页语言管理设置
              name:"indexLangConfig",
              redirect:"/index/main1/indexLangConfig/header",
              component: indexLangConfig,

              children:[
                {
                  path: "header/",//头部介绍
                  name: "header",
                  component: header,
                },{
                  path: "footer/",//底部介绍
                  name: "footer",
                  component: footer,
                }
              ]
            },
            {
              path: "Inquirymanagement/",
              name: "Inquirymanagement",
              component: Inquirymanagement
            },
            {
              path: "orderList/",
              name: "orderList",
              component: orderList
            },
            {
              path: "exportOrder/",
              name: "exportOrder",
              component: exportOrder
            },
            {
              path: "exportEnquiry/",
              name: "exportEnquiry",
              component: exportEnquiry
            },
            {
              path: "subscriptionList/",
              name: "subscriptionList",
              component: subscriptionList
            },
            {
              path: "unSubscriptionList/",
              name: "unSubscriptionList",
              component: unSubscriptionList
            },
            {
              path: "unSubscriptionList1/",
              name: "unSubscriptionList1",
              component: unSubscriptionList1
            },
             {
              path: "shopList/",//商品列表
              name: "shopList",
              redirect:"/index/main1/shopList/shelf",
              component: shopList,
              children: [
                {
                  path: "shelf/",//上架中
                  name: "shelf",
                  component: shelf,
                },
                 {
                  path: "soldOut/",//下架
                  name: "soldOut",
                  component: soldOut,
                },
                {
                  path: "recycle/",//回收
                  name: "recycle",
                  component: recycle,
                }
              ]
            },
            {
              path: "shopLabel/",//商品标签
              name: "shopLabel",
              component: shopLabel,
            },
            {
              path: "shopAttribute/",//商品属性
              name: "shopAttribute",
              component: shopAttribute,
            },
            {
              path: "shopBrand/",//商品品牌
              name: "shopBrand",
              component: shopBrand,
            },
            {
              path:'labelDetail/',//标签关联商品
              name:'labelDetail',
              component:labelDetail,
            },
            {
              path:'attributeDetail/',//属性关联商品
              name:'attributeDetail',
              component:attributeDetail,
            },
            {
              path:'brandDetail/',//品牌关联商品
              name:'brandDetail',
              component:brandDetail,
            },
            {
              path: "recommend/",//推荐商品
              name: "recommend",
              component: recommend
            }, {
              path: "showShop/",
              name: "showShop",
              component: showShop
            },{
              path:"shopHeader/",
              name:"shopHeader",
              component:shopHeader
            },{
              path:"shopFooter/",
              name:"shopFooter",
              component:shopFooter
            }
          ]
        },

      ]
    },
    {
      path:"/demo5",
      name:"demo5",
      component:demo5
    },
    {
      path:"/login",
      name: 'login',
      component: login,
    },
    {
      path: '*',
      redirect: "/login"
    }

  ]
})
