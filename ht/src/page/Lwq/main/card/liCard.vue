<template>
  <div class="liCard">
    <dl>
      <dt class="title">分类</dt>
      <dd style="line-height: 20px;font-size: 12px;">
        <span style="text-align: center;">分类名</span>
        <span style="text-align: center;">now</span>
        <span style="text-align: center;">before</span>
        <span style="text-align: center;"></span>
        <span style="text-align: center;">上升率</span>
      </dd>
      <dd v-for="(item,index) in list" :key="index" style="line-height: 20px;">
        <span style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;text-align: center;">{{item.name}}</span>
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
  data() {
    return {
      list: ""
    };
  },
  methods: {
    init(list) {
      this.list = list;
    }
  }
};
</script>
<style lang="scss">
.liCard {
  width: 300px;
  border: 1px solid #666;
  margin: 10px;

  transition: all 1s linear;
  &:hover {
    box-shadow: 6px 6px 10px #999;
  }
  //   padding-right: ;
  dl {
    padding: 5px;
    dd {
      span {
        flex: 1;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px;
      height: 20px;
      line-height: 20px;
    }
  }
  .title {
    font-size: 20px;
    height: 30px;
    line-clamp: 30px;
    padding-left: 5px;
    border-bottom: 1px solid #999;
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
}
</style>