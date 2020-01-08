<template>
  <div class="uploding1">
    <div class="around">
      <div class="shuru" v-for="item in arr" :key="item.name">
        <span class="width">{{item.name}}</span>
        <input type="text" />
        <span style="color:red" v-if="item.mustFill">*</span>
      </div>
      <div class="shuru my-flex">
        <span>商城状态</span>
        <div class="radio">
          <input type="radio" name="zt" value="1" checked />
          <span>上架中</span>
          <input type="radio" name="zt" value="1" checked />
          <span>已经下架</span>
        </div>
      </div>
      <div class="shuru my-flex">
        <span>官网状态</span>
        <div class="radio">
          <input type="radio" name="zt1" value="1" checked />
          <span>上架中</span>
          <input type="radio" name="zt1" value="1" checked />
          <span>已经下架</span>
        </div>
      </div>
      <div class="shuru my-flex">
        <span>商品相册</span>
    
        <div class="imgUpdata"><img-up></img-up></div>
      </div>
      <div>
        <span>所属分类</span>
        <select name id>
          <option value="1">1123123</option>
          <option value="1">1123123</option>
          <option value="1">1123123</option>
        </select>
      </div>
    </div>
    <div class="around">
      <div class="shuru" v-for="item in arr" :key="item.name">
        <span class="width">{{item.name}}</span>
        <input type="text" />
        <span style="color:red" v-if="item.mustFill">*</span>
      </div>
    </div>
  </div>
</template>

<script>
import ImgUp from "../imgUp";
export default {
  components: {
    ImgUp
  },
  data() {
    return {
      arr: [
        {
          name: "商品名称",
          value: "",
          please: "",
          mustFill: true
        },
        {
          name: "商品型号",
          value: "",
          please: ""
        },
        {
          name: "合同编号",
          value: "",
          please: ""
        },
        {
          name: "库存数量",
          value: "",
          please: "",
          mustFill: true
        },
        {
          name: "商品价格",
          value: "",
          mustFill: true,
          please: ""
        },
        {
          name: "运费价格",
          value: "",
          mustFill: true,
          please: ""
        },
        {
          name: "排序",
          value: "",
          please: "",
          mustFill: true
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.uploding1 {
  display: flex;
  justify-content: space-around;
  .my-flex {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }
  .around {
    span {
      display: inline-block;
      width: 60px;
      font-size: 12px;
    }
    input,
    select {
      width: 300px;
      height: 20px;
      font-size: 12px;
    }
    select {
      option {
        width: 100%;
        height: 100%;
        font-size: 10px;
      }
    }
  }
  .radio {
    display: flex;
    input {
      width: 10px;
    }
  }
  .smallimg {
    width: 82px !important;
    display: flex;
    flex-wrap: wrap;
    height: 100px;
    position: relative;
    display: inline-block;
    margin-right: 10px;
    img {
      width: 82px;
      height: 100px;
    }
    &::after {
      content: "X";
      display: block;
      position: absolute;
      width: 10px;
      height: 10px;
      line-height: 10px;
      border: 1px solid #999;
      border-radius: 50%;
      top: 0px;
      right: 0px;
      z-index: 100;
      cursor: pointer;
    }
  }
  .imgUpdata{
    width: 400px;
  }
  .shuru{
    margin: 10px 0;

    input{
      border:1px solid #888;
    }
  }
}
</style>