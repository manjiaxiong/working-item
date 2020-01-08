<template>
  <div class="liCard5">
    <dl v-if="title=='热销商品'">
      <dt class="title">{{title}}</dt>
      <dd style="line-height: 20px;font-size: 12px;">
        <span style="text-align: center;">商品名</span>
        <span style="text-align: center;">now</span>
        <span style="text-align: center;">before</span>
        <span style="text-align: center;"></span>
        <span style="text-align: center;">上升率</span>
      </dd>
      <dd v-for="(item,index) in list" :key="index" style="line-height: 20px;">
        <img :src="item.goodImg" alt class="smallImg" style="margin-right: 2px;" />
        <span>{{item.goodName}}</span>
                <span>{{item.now}}</span>
        <span>{{item.before}}</span>

            <span :class="item.growthRate>0?'el-icon-top':'el-icon-bottom'"></span>
        <span>{{(item.now-item.before)/(item.before?item.before:1)*100}}%</span>
      </dd>
    </dl>
    <!-- <dl v-else-if="title=='国家'">
      <dt class="title">{{title}}</dt>
      <dd style="line-height: 20px;font-size: 12px;">
        <span style="text-align: center;">国家</span>
        <span style="text-align: center;">now</span>
        <span style="text-align: center;">before</span>
        <span style="text-align: center;"></span>
        <span style="text-align: center;">上升率</span>
      </dd>
      <dd v-for="(item,index) in list1" :key="index" style="line-height: 20px;">
        <span style="text-align: center;">{{item.country}}</span>
        <span style="text-align: center;">{{item.now}}</span>
        <span style="text-align: center;">{{item.before}}</span>
           <span style="text-align: center;" :class="item.growthRate>0?'el-icon-top':'el-icon-bottom'"></span>
        <span style="text-align: center;">{{(item.now-item.before)/(item.before?item.before:1)*100}}%</span>
      </dd>
    </dl> -->
    <dl v-else-if="title=='国家'">
      <dt class="title">{{title}}</dt>
      <dd style="line-height: 20px;font-size: 12px;">
        <span style="text-align: center;">国家</span>
        <span style="text-align: center;">当前国家</span>
        <span style="text-align: center;">全部国家</span>
        <span style="text-align: center;"></span>
        <span style="text-align: center;">占比</span>
      </dd>
      <dd v-for="(item,index) in list1" :key="index" style="line-height: 20px;">
        <span style="text-align: center;">{{item.country}}</span>
        <span style="text-align: center;">{{item.now}}</span>
        <span style="text-align: center;">{{item.before}}</span>
           <span style="text-align: center;" :class="item.growthRate>0?'el-icon-top':'el-icon-bottom'"></span>
        <span style="text-align: center;">{{item.growthRate}}%</span>
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
      list2: "",
      list3: "",
      list4: "",
      proportion:'',
    };
  },
  methods: {
    init(list) {
      this.list = list;
    },
    init1(list) {
      this.list1 = list;
    },
    init2(list) {
      this.list2 = list;
    },
    init3(list) {

      this.list3 = [...list];
      console.log(this.list3,"我是list3")
    }
  }
};
</script>
<style lang="scss">
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
  .title {
    font-size: 20px;
    height: 30px;
    line-clamp: 30px;
    padding-left: 5px;
    border-bottom: 1px solid #999;
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