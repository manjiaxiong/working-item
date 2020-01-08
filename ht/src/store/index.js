import Vue from 'vue';
import Vuex from 'vuex';
import nav from "./nav";
import seo from "./seo";
import shop from "./shop";
import fuwenben from "./fuwenben"
import title from "./title"
import primaryclassification from "./primaryclassification"
import bannder from "./bannder"
import zt from "./upshop"
import imglist from "./imglist";
Vue.use(Vuex); // $store state  $store.state.name

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules:{
    nav,
    seo,
    shop,//分页
    primaryclassification,
    fuwenben,//富文本
    title,
    bannder,
    zt,
    imglist
  }
})
