<template>
  <div class="pa50">
    <div class="all" style="margin-left: 30px;">
      <input type="checkbox" class="allChecked" @click="allChecked">
      <span style="font-size: 16px;">全选</span>
      <el-button size="medium"
                 type="danger"
                 class="shuaxin"
                 @click="relieve">删除分类
      </el-button>
      <el-button size="medium"
                 type="danger"
                 @click="shuaxin">刷新</el-button>
    </div>
    <div>
      <div class="p100">
        <table border="0"
               cellpadding="0"
               cellspacing="0">
          <tr class="bac247 Myflex">
            <th>选择</th>
            <th>分类名字</th>
            <th>排序</th>
            <th>商城状态</th>
          </tr>
        <tbody>
          <tr class="juz"
              v-for="(item,index) in arr"
              :key="item.id">
            <td>
              <input type="checkbox" class="checkbox" @click="xuanzhong(index)">
            </td>
            <td>{{item.classifyNames}}</td>
            <td>
              <span class="border" :data-id="item.id" @blur="changeNum" contenteditable="true">{{item.number}}</span>
            </td>
            <td>
              <div class="lwqimgswtach" :data-id="item.id" :class="item.classifyStatus?'true':'flase'" @click="changeState(index,item.id)"></div>
            </td>
          </tr>
        </tbody>
        </table>

      </div>
    </div>
    <div class="center">
      <el-pagination @current-change="handleCurrentChange"
                     :page-size="10"
                     background
                     :current-page.sync="Page"
                     layout="prev, pager, next, jumper"
                     :total="totalRows"></el-pagination>
    </div>
  </div>
</template>
<script>
  import api from "@/api/one";
  export default {
    data () {
      return {
        arr:[],
        Page:1,
        totalRows:0
      };
    },
    created () {
      var id = this.$route.query.id
      var type = this.$route.query.type
      api.getClassOne({
        parentId: id,
        classsifyType: type,
        page: 1,
        size: 10,
        element:sessionStorage.getItem('oneLang') || '中文'
      })
      .then(res=>{
        console.log(res)
        this.arr = res.data.data.list
        this.totalRows = res.data.data.totalRows
      })
    },
    mounted(){
      
    },
    methods: {
      changeState(index, id) {
        //改变显示状态 //无需改变
        var that = this;
        api
          .changeState({
            classifyStatus:!this.arr[index].classifyStatus,
            id: id
          })
          .then(res => {
            console.log(res.data.code);
            if (res.data.code == "000000") {
              this.arr[index].classifyStatus = !this.arr[index].classifyStatus;
              // console.log(this.arr[index])
            }
          });
      },
      changeNum(e) {
        api
          .setNum({
            number: e.target.innerText.trim(),
            id: e.target.dataset.id
          })
          .then(res => {
            this.shuaxin();
          });
      },
      shuaxin(){
        var id = this.$route.query.id
        api.getClassOne({
          parentId: id,
          classsifyType: 2,
          page: 1,
          size: 10,
          element:sessionStorage.getItem('twoLang') || '中文'
        })
        .then(res=>{
          console.log(res)
          this.arr = res.data.data.list
          this.totalRows = res.data.data.totalRows
        })
      },
      handleCurrentChange(val){

      },
      allChecked(){
        $('.checkbox').each(function(i){
          console.log($(this).is(':checked'))
          if($('.allChecked').is(":checked")){
            $(this).prop("checked",true)
          }else{
            $(this).prop("checked",false)
          }
        })
        if($('.allChecked').is(":checked")){
          this.arr.forEach(function(value,index){
            value.checked = true
          })
        }else{
          this.arr.forEach(function(value,index){
            value.checked = false
          })
        }
      },
      relieve(){
        var newArr = []
        console.log(this.arr)
        this.arr.forEach(function(value,index){
          console.log(value.checked)
          if(value.checked){
            newArr.push(value.id)
          }
        })
        if(newArr.length == 0){
          alert('请至少选择一个分类')
        }else{
          //发送请求
          console.log(newArr)
          api.delListoneDetail({
            ids:JSON.stringify(newArr)
          })
          .then(res=>{
            console.log(res)
            this.shuaxin()
          })
        }
      },
      xuanzhong(index){
        var all = true
        console.log(this.arr)
        if($('.checkbox').eq(index).is(":checked")){
          this.arr[index].checked = true
        }else{
          this.arr[index].checked = false
        }
        $('.checkbox').each(function(i){
          if(!$(this).is(":checked")){
            all = false
          }
        })
        if(all){
          $('.allChecked').prop("checked",true)
        }else{
          $('.allChecked').prop("checked",false)
        }
      }
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
