<template>
  <div>
    <!-- <ul class="el-upload-list el-upload-list--picture-card">
      <li tabindex="0" class="el-upload-list__item is-success">
        <img src="http://qiniu.keleziyouxing.com/1571220575707" alt="" class="el-upload-list__item-thumbnail">
        <a class="el-upload-list__item-name">
          <i class="el-icon-document"></i>
          "0"
        </a>
        <label class="el-upload-list__item-status-label">
          <i class="el-icon-upload-success el-icon-check"></i>
        </label>
        <i class="el-icon-close"></i>
        <i class="el-icon-close-tip">按detele键可删除</i>
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview">
            <i class="el-icon-zoom-in"></i>
          </span>
          <span class="el-upload-list__item-delete">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </li>
    </ul> -->
    <!-- action 后台地址  -->
    <el-upload
      action="http://up-z0.qiniup.com"
      :http-request="hhh"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :data="uptoken"
      :show-file-list="true"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
import * as qiniu from "qiniu-js";
import api from "@/api/imgUp.js";
import api1 from "@/api/shop.js";

export default {
  // props:["fileList"],
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      uptoken: {
        token: "",
        key: ""
      },
      url: "",
      urllist: [],
      fileList: []//回显图片列表
    };
  },
  props:{
    good_show:{
      type:Array
    }
  },
  created() {
    console.log('????',this.good_show)
    var r = this.good_show.filter(function (s) {
       return s && s.trim();
    });
    this.$store.commit("imglist/setArr",r[0]);
    sessionStorage.setItem('banner',r[0])
    var _this = this
    if(this.good_show.length > 0){
      _this.fileList = []
      this.good_show.forEach(function(value,index){
        _this.fileList[0] = {
          id:index+'',
          name:index+'',
          status:'success',
          uid:index + '',
          url:value
        }
      })
      console.log(this.fileList)
    }
  },
  mounted(){
    console.log(111155)
    var _this = this
    if(this.$store.state.zt.zt == "1"){
      api1.getShopId({
        id: this.$store.state.zt.Xid,
        number: 3
      }).then(res=>{
        console.log('!!!!!',res.data.data.good_show)
        if(res.data.data.good_show){
            var arr = res.data.data.good_show.split('|')
            arr.forEach(function(value,index){
              console.log('new:::::::',value)
              _this.fileList.push({
                id:index+'',
                name:index+'',
                status:'success',
                uid:index + '',
                url:value
              })
            })
        }
      })
    }else if(this.$store.state.zt.zt == "10"){
      api1.getShopId({
        id: this.$store.state.zt.Xid,
        number: 3
      }).then(res=>{
        console.log('!!!!!',res.data.data.good_show)
        if(res.data.data.good_show){
            var arr = res.data.data.good_show.split('|')
            arr.forEach(function(value,index){
              console.log('new:::::::',value)
              _this.fileList.push({
                id:index+'',
                name:index+'',
                status:'success',
                uid:index + '',
                url:value
              })
            })
        }
      })
    }
   
  },
  watch: {
    fileList(val) {
      console.log('val::',val);
      this.urllist = val
    },
    good_show(val){
      var _this = this
      console.log('调用成功',val)
      this.fileList = []
      val.forEach(function(value,index){
        console.log('new:::::::',value)
        _this.fileList.push({
          id:index+'',
          name:index+'',
          status:'success',
          uid:index + '',
          url:value
        })
      })
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log("我要删除了", file,fileList);
      this.fileList = fileList
      //todo 删除 数据在中央仓库
    },
    hhh(e) {
      let that = this;
      let key = new Date().getTime();
      let putExtra = {};
      var observer = {
        next(res) {
          console.log(res, "我是next");
        },
        error(err) {
          // ...
        },
        complete(res) {
          console.log(res, "complete");
          that.$message({
            message: "上传成功",
            type: "success"
          });
          console.log('pppppp',that.ReturnURl(res))
            that.$store.commit("imglist/setArr", that.ReturnURl(res));//需要改
            that.$store.commit("imglist/setUrl", that.ReturnURl(res));
          
          that.fileList.push (  {
              name: new Date().getTime(),
              url: that.ReturnURl(res)
            })
        }
      };
      var config = {
        useCdnDomain: true,
        region: null
      };
      api.getToken().then(res => {
        that.uptoken.token = res.data;
        var observable = qiniu.upload(e.file, key, res.data, putExtra, config);
        var subscription = observable.subscribe(observer); // 上传开始
        that.$message({
          message: "正在上传中",
          type: "warning"
        });
      });
    },
    handlePictureCardPreview(file) {
      console.log("你是干啥的");
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ReturnURl(url) {
      return "http://qiniu.keleziyouxing.com/" + url.key;
    }
  },
  beforeDestroy() {
    console.log("我被销毁了", this.$store.commit);
    this.$store.commit("imglist/qingkong", "");
  }
};
</script>

<style>

</style>
