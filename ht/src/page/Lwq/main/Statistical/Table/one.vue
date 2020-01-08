<template>
  <div>
    <ul v-for="item in 1" :key="item">
      <li class="juzhong">流量</li>
      <li>
        <p>UV</p>
        <p>{{temp.UV}}</p>
      </li>
      <li>
        <p>IP</p>
        <p>{{temp.IP}}</p>
      </li>
      <li>
        <p>人均PV</p>
        <p>{{temp.gdpPv}}</p>
      </li>
      <li>
        <p>PV</p>
        <p>{{temp.pv?temp.pv:0}}</p>
      </li>
      <li>
        <p>移动UV占比</p>
        <p>{{temp.dUv}}%</p>
      </li>
         <li>
        <p>跳出率</p>
        <p>{{temp.jumpOutRate}}%</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["list"],
  data () {
    return {
      temp:""  
    }
  },
  methods:{
    change(list){
      console.log(list.pv,"我也不知你是不是沙雕");
      
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