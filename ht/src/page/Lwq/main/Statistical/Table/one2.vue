<template>
  <div>
    <ul v-for="item in 1" :key="item">
      <li class="juzhong">用户</li>
      <li>
        <p>注册</p>
        <p>{{temp.enroll}}</p>
      </li>
      <li>
        <p>订阅</p>
        <p>{{temp.subscription}}</p>
      </li>
      <li>
        <p>下单会员</p>
        <p>{{temp.placeOrderMember?temp.placeOrderMember:0}}</p>
      </li>
      <li>
        <p>复购会员</p>
        <p>{{temp.afterPurchaseMember?temp.afterPurchaseMember:0}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { log } from 'util';
export default {
  props: ["list"],
  data () {
    return {
      temp:""  
    }
  },
  methods:{
    change(list){
      console.log(list.placeOrderMember,"你是不是傻了");
      console.log(list.afterPurchaseMember,"去你妈的")
      this.temp=list;
    }
  }
};
</script>
<style lang="scss" scoped>
ul {
  display: flex;
  border-bottom: 1px solid #888;
  margin-top: 20px;
  li {
    position: relative;
    text-align: center;
    width: 100px;
    padding: 10px 0;
    font-size: 16px;
    &.juzhong {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      box-sizing: border-box;
      display: inline-block;
      height: 80%;
      width: 1px;
      background-color: #888;
    }
  }
}
</style>