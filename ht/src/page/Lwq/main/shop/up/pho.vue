<template>
  <div class="height">
    <div 
        class="poho"
        v-loading="loading"
        element-loading-text="上传中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <up-img :good_show='good_show'></up-img>
    </div>
    <div class="center">
      <el-button @click="queding" type="primary">{{this.$store.state.zt.zt == "1"?'修改':'下一步'}}</el-button>
      <el-button @click="quxiao" type="info">取消</el-button>
    </div>
  </div>
</template>
<script>
    import api from "@/api/shop"
    import UpImg from "../../../mianTitle/imgUp";

    export default {
        data(){
            return {
                good_show:[],
                imgList:'',
                loading:false
            }
        },
        components: {
            UpImg
        },
        mounted() {
            if (this.$store.state.zt.zt == "1") {
                console.log('??????????')
                api.getShopId({
                    id: this.$store.state.zt.Xid,
                    number: 3
                }).then(res => {
                    console.log(res, "我是第三页");
                    if(res.data.data.good_show){
                        var arr = res.data.data.good_show.split('|')
                        for(var i=0;i<arr.length;i++){
                            this.good_show[i] = {
                                name: i,
                                id:i+'',
                                url: arr[i]
                            }
                        }
                        var arr = []
                        this.good_show.forEach(function(value,index){
                            arr[index] = value.url
                        })
                        this.imgList = arr
                        console.log('arr:::',arr.join('|'))
                        console.log('this.good_show::::',this.good_show)
                    }

                })
            }else if(this.$store.state.zt.zt == "10"){
                api.getShopId({
                    id: this.$store.state.zt.Xid,
                    number: 3
                }).then(res => {
                    console.log(res, "我是第三页");
                    if(res.data.data.good_show){
                        var arr = res.data.data.good_show.split('|')
                        for(var i=0;i<arr.length;i++){
                            this.good_show[i] = {
                                name: i,
                                id:i+'',
                                url: arr[i]
                            }
                        }
                        var arr = []
                        this.good_show.forEach(function(value,index){
                            arr[index] = value.url
                        })
                        this.imgList = arr
                        console.log('arr:::',arr.join('|'))
                        console.log('this.good_show::::',this.good_show)
                    }
                })
            }
        },
        methods: {
            quxiao() {
                //关闭遮罩层
                // this.$parent.$parent.$parent.closeDo()
                // this.$parent.close();
                //todo 清除图片
                this.$parent.$parent.$parent.$parent.close();
            
                
            },
            queding() {
                console.log(this.imgList)
                if(this.imgList){
                    var l = this.imgList.filter(function (s) {
                        return s && s.trim();
                    });
                }
                if(this.$store.state.imglist.arr){
                    var r = this.$store.state.imglist.arr.filter(function (s) {
                        return s && s.trim();
                    });
                }
                var newArr = []
                if(r || l){
                    console.log(r,l)
                    if(l == undefined){
                        newArr = r
                    }else{
                        newArr = l.concat(r)
                    }
                }else{
                    var newarr = this.imgList.concat(this.$store.state.imglist.arr).split(',')
                    newArr = newarr.filter(function (s) {
                        return s && s.trim();
                    });
                }
                this.loading = true
                console.log('this.$store.state.imglist.arr[0],',newArr);
                api.setPho({
                    id: this.$store.state.zt.zt==1?this.$store.state.zt.Xid:this.$store.state.zt.id,
                    goodImg: newArr[0],
                    good_show:newArr.join('|')
                }).then(res => {
                    console.log(res)
                    this.loading = false
                    if(res.data.code=="000000"){
                      if(this.$store.state.zt.zt==1){
                             this.$message({
                                showClose: true,
                                type: "success",
                                message: "修改成功"
                            });
                            this.$parent.$parent.$parent.$parent.shuaxin();
                        return 
                      }
                        this.$message({
                            showClose: true,
                            type: "success",
                            message: "请进行下一步"
                        });
                        this.$parent.$parent.$parent.$parent.changeActiveName("fourth")
                    }else{
                           this.$message({
                            showClose: true,
                            type: "error",
                            message: "修改失败"
                        });
                    }
                    this.good_show = ''
                })
                .catch(res=>{
                    this.loading = false
                    this.$message({
                      message: "上传失败",
                      type: "error"
                    });
                })
            }
        }
    };
</script>

<style lang="scss" scpoed>
  .height {
    height: 462px;
  }

  .poho {
    padding: 20px;
  }

  .center {
    display: flex;
    margin-top: 200px;
    justify-content: center;
    align-items: center;
  }
</style>
