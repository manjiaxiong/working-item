<template>
  <div class="pa50">
    <div class="all" style="margin-left: 30px;text-align: center;">
      <h2>{{title}}</h2>
    </div>
    <div>
      <div class="p100">
        <table border="0"
               cellpadding="0"
               cellspacing="0">
          <tr class="bac247 Myflex">
            <th>日期</th>
            <th>数据</th>
          </tr>
        <tbody>
          <tr class="juz"
              v-for="(item,index) in time"
              :key="item.id">
            <td>{{item}}</td>
            <td style="width: 50%">{{data[index]}}</td>
          </tr>
        </tbody>
        </table>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        data:[],
        time:[],
        title:''
      };
    },
    created () {
      this.title = this.$route.query.name
      this.time = this.$route.query.time
      this.data = this.$route.query.data
      console.log(this.title,this.time,this.data)
    },
    mounted(){
      
    },
    methods: {

    }
  };
</script>
<style lang="scss">
  .el-input__inner{

    padding: 0;
  }
  .el-dialog__header{
    padding: 2px;
  }
  .myshop{
    .el-dialog__title{
      font-size: 0.6rem;
    }

    .el-dialog__body{
      padding: 2px;
    }
    .around .el-input__inner{
      /*flex: 1;*/
      height: 20px;
      line-height: 20px;
      margin: 1px;
      padding: 0;
    }
    .el-input__icon{
      line-height: 0;
    }
    .el-tabs__item{

    }
    .el-tabs__content{
      .el-button{
        margin-right: 30px;
        margin-bottom: 30px;
      }
    }
  }
</style>
<style lang="scss" scoped>
  tbody{
    height: 50vh;
    overflow-x: hidden;
  }
  .width {
    width: 200px;
  }
  .pa50 {
    padding: 10px 0 0 10px;
    .topBox{
      width: 1000px !important;
      height: 50px;
      .language{
        width: 300px !important;
        display: inline-block;
      }
    }
  }
  .around {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .p100 {
    padding: 10px 0px;
    .img {
      padding-top: 10px !important;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 30px;
      }
    }
    .Myflex {
      text-align: center;
      /*height: 50px;*/
    }
    .bac247 {
      background-color: rgb(247, 247, 247);
    }
    table {
      width: 100%;
      font-size: 12px;
    }
    .juz {
      text-align: center;
      &:hover{
        background-color: rgb(242,242,242);
      }
      td {
        /*padding: 10px 0;*/
      }
    }

  }
  .mgwidth {
    display: inline-block;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow:ellipsis;
    text-align: left;
  }
  p {
    text-align: left;
  }
  .nini {
    display: flex;
    flex-direction: column;
  }
  .true {
    background-image: url("../../../../assets/imges/houtai/kai.png");
  }
  .flase {
    background-image: url("../../../../assets/imges/houtai/guan.png");
  }
  .lwqimgswtach {
    width: 50px;
    height: 20px;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .center {
    display: flex;
    justify-content: center;
    margin: 0;
  }
  .btn {
    button {
      // width: 30px;
    }
  }
</style>
