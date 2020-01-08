<template>
  <div class="liCard5">
    <dl v-if="title=='设备注册'">
      <dt class="title"><span>{{title}}</span><span>移动占比{{proportion}}%</span></dt>
      <dd style="line-height: 20px;font-size: 12px;">
        <span style="text-align: center;">设备名</span>
        <span style="text-align: center;">now</span>
        <span style="text-align: center;">before</span>
        <span style="text-align: center;"></span>
        <span style="text-align: center;">上升率</span>
      </dd>
      <dd v-for="(item,index) in list" :key="index" style="line-height: 20px;">
        <!-- <span>{{item.portType==0?1:2}}</span> -->
        <span style="text-align: center;">{{item.portType=='0'?"电脑端":item.portType=='2'?'其他':'手机端'}}</span>
        <span style="text-align: center;">{{item.now}}</span>
        <span style="text-align: center;">{{item.before}}</span>
            <span style="text-align: center;" :class="item.growthRate>0?'el-icon-top':'el-icon-bottom'"></span>
        <span style="text-align: center;">{{(item.now-item.before)/(item.before?item.before:1)*100}}%</span>
      </dd>
    </dl>
    <dl v-else>
      <dt class="title">{{title}}</dt>
      <dd style="line-height: 20px;font-size: 12px;">
        <span style="text-align: center;">设备名</span>
        <span style="text-align: center;">now</span>
        <span style="text-align: center;">before</span>
        <span style="text-align: center;"></span>
        <span style="text-align: center;">上升率</span>
      </dd>
      <dd v-for="(item,index) in list1" :key="index" style="line-height: 20px;">
        <span style="text-align: center;">{{item.type?"电脑":"移动"}}</span>
        <span style="text-align: center;">{{item.now}}</span>
        <span style="text-align: center;">{{item.before}}</span>
        <span style="text-align: center;" :class="item.growthRate>0?'el-icon-top':'el-icon-bottom'"></span>
        <span style="text-align: center;">{{(item.now-item.before)/(item.before?item.before:1)*100}}%</span>
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  props: ["title"],
  data() {
    return {
      list: "",
      list1: "",
      proportion:'',
    };
  },
  methods: {
    init(list) {
      let num = 0
      let mobile = 0
      for(let i = 0 ; i < list.length ; i++){
        num = num + list[i].now
        if(list.type != '0'){
          mobile = list[i].now
        }
      }
      this.proportion = (mobile/num).toFixed(2) * 100
      this.list = list;
    },
    init1(list) {
      this.list1 = list;
    }
  }
};
</script>
<style lang="scss" scoped>
.liCard5 {
    width: 300px;
    border: 1px solid #666;
    margin: 10px;
    transition: all 0.5s linear;
    &:hover {
      box-shadow: 5px 5px 10px #999;
    }
  
    //   padding-right: ;
    dl {
      // padding: 5px;
      dd {
        span {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        display: flex;
        justify-content: space-between;
        margin: 10px;
        min-height: 10px;
        line-height: 10px;
      }
    }
    .title>span {
      font-size: 20px;
      height: 30px;
      line-clamp: 30px;
      padding-left: 5px;
      padding-right: 5px;
      box-sizing: border-box;
      /*border-bottom: 1px solid #999;*/
    }
    .title>span:nth-child(1){
      float: left;
    }
    .title>span:nth-child(2){
      float: right;
      color: #333;
    }
    span {
      font-size: 14px;
      &:nth-of-type(2) {
        color: rgb(115, 63, 146);
      }
      &:last-child {
        color: rgb(38, 158, 221);
      }
    }
  
    .el-icon-top {
      color: rgb(38, 158, 221);
    }
    .smallImg {
      width: 20px;
      height: 20px;
    }
  }

</style>
