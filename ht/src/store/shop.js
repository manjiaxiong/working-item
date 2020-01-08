import api from "@/api/one.js"
import { stat } from "fs";
export default {
  namespaced: true,
  state: {
    listArr: [],//
    type: "",//一级二级分类
    length: "",//总长度
    xianshiList: "",//显示的数据
    num: "",//当前页数
    id: "",//当前筛选页面的id
    parentId: "",//当前父级id二级筛选查询的时候改变这个值
  },
  getters: {

  },
  mutations: {
    change(state, length) {//改变总页数的长度
      state.length = length.totalRows;
      state.type = length.type;
    },
    changeNum(state, num) {//保存当前页数
      console.log(num);
      if (state.type == 1) {
        api.getClassOne({
          parentId: state.parentId,
          classsifyType: 1,
          page: num,
          size: 10
        }).then(res => {
          state.xianshiList = res.data.data.list;
        })
      }
      state.num = num;
    },
    changeList(state, xianshiList) {//改变显示的数组
      state.xianshiList = xianshiList;
    },
    changeState(state, index) {//改变当前商品的状态
      state.xianshiList[index].classifyStatus = !state.xianshiList[index].classifyStatus;
    },
    shuaxin(state, res) {//刷新
      console.log(res,"你压的")
      state.xianshiList = res.data.data.list;
      state.length = res.data.data.totalRows;
    },
    setParent(state,id){
      //记得在进入一级分类清空这个值
      state.parentId=id;
    }

  },
  actions: {


  }
}