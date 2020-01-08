<template>
  <div>
    <div 
      class="around"
      v-loading="loading"
    element-loading-text="上传中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="flex">
        <div class="around hhhha" v-for="(item,index) in arr" :key="index">
          <span>{{item.name}}</span>
          <el-input v-model="item.value" :placeholder="item.name=='运费价格'?'不输入默认包邮':''" :type="item.type"></el-input>
          <span class="red">{{item.bt==true?'*':' '}}</span>
        </div>
        <div class="aa hhhha">
          <span>一级分类</span>
          <el-select v-model="fValue" placeholder="请选择">
            <el-option v-for="item in options1" :key="item.id" :label="item.classifyName" :value="item.id"></el-option>
          </el-select>
          <span class="red">*</span>
        </div>
        <div class="aa hhhha">
          <span>二级分类</span>
          <el-select v-model="value2" :placeholder="classifyName?classifyName:'请选择'">
            <el-option v-for="item in options2" :key="item.value" :label="item.classifyName" :value="item.classifyName"></el-option>
          </el-select>
          <span class="red">*</span>
        </div>
        <div class="aa hhhha">
          <span>三级分类</span>
          <el-select v-model="valueThird" :placeholder="thirdClassifyName?thirdClassifyName:'请选择'">
            <el-option v-for="item in options3" :key="item.value" :label="item.classifyName" :value="item.classifyName"></el-option>
          </el-select>
          <span class="red">*</span>
        </div>
        <div class>
          <span>商城状态</span>
          <el-radio v-model="radio" label="1">上架中</el-radio>
          <el-radio v-model="radio" label="2">已下架</el-radio>
          <span class="red">*</span>
        </div>
        <div class>
          <span>官网状态</span>
          <el-radio v-model="radio1" label="1">上架中</el-radio>
          <el-radio v-model="radio1" label="2">已下架</el-radio>
          <span class="red">*</span>
        </div>
        <div class>
          <span>推荐状态</span>
          <el-radio v-model="radio2" label="2">是</el-radio>
          <el-radio v-model="radio2" label="1">否</el-radio>
          <span class="red">*</span>
        </div>
        <!--        <div class>-->
        <!--          <span>商品相册</span>-->
        <!--          <div class="qunimade">-->
        <!--            <img-up></img-up>-->
        <!--          </div>-->
        <!--        </div>-->
      </div>
      <div class="flex">
        <div class="around">
          <span>起订量</span>
          <el-input v-model="qidingliang" type="number" placeholder></el-input>
          <span class="red">*</span>
        </div>
        <div class=" hhhha" v-for="(item,index) in SizeList" :key="index">
          <div class="around hhhha">
            <span class="skuTitle"><input type="text" v-model="parameter1" placeholder="参数1"></span>
            <el-input v-model="item.size" placeholder></el-input>
            <span @click="changeSizeList(index,1)" class="el-icon-plus jia"></span>
            <span @click="changeSizeList(index,0)" class="el-icon-minus jia"></span>
          </div>
          <div class="around onlywidth hhhha">
            <span class="skuTitle"><input type="text" v-model="parameter2" placeholder="参数2"></span>
            <el-input v-model="item.color" placeholder></el-input>
          </div>
          <div class="around onlywidth hhhha">
            <span class="skuTitle"><input type="text" v-model="parameter3" placeholder="参数3"></span>
            <el-input v-model="item.page" placeholder></el-input>
          </div>
          <div class="around onlywidth hhhha">
            <span>价格</span>
            <el-input v-model="item.price" type="number" placeholder></el-input>
          </div>
        </div>
        <div class="label">
            <!-- 标签 -->
            <span>商品标签</span>
            <el-select v-model="label"
                       @change="labelChange"
                       placeholder="请选择标签">
              <el-option v-for="(item,index) in labelList"
                         :key="index"
                         :label="item.tagNames"
                         :value="index">
              </el-option>
            </el-select>
             <div class="noticeListBox">
                   <div class="noticeList">
                          <ul id="labelList" @click="delLabel($event)">
                            <!-- <li v-for="">
                              
                            </li> -->
                          </ul>
                   </div>
            </div>
        </div>
        <div class="label">
            <!-- 标签 -->
            <span>商品属性</span>
            <el-select v-model="attribute"
                       @change="attributeChange"
                       placeholder="请选择属性">
              <el-option v-for="(item,index) in attributeList"
                         :key="index"
                         :label="item.attributeNames"
                         :value="index">
              </el-option>
            </el-select>
             <div class="noticeListBox">
                   <div class="noticeList">
                          <ul id="attributeList" @click="delAttribute($event)">
                            <!-- <li v-for="">
                              
                            </li> -->
                          </ul>
                   </div>
            </div>
        </div>
        <div class="aa hhhha">
          <span>商品品牌</span>
          <el-select v-model="brand" :placeholder="brandNames?brandNames:'请选择'">
            <el-option v-for="item in brandList" :key="item.id" :label="item.brandNames" :value="item.brandNames"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="center">
      <el-button @click="queding" type="primary">{{this.$store.state.zt.zt == "1"?'修改':'下一步'}}</el-button>
      <el-button @click="quxiao" type="info">取消</el-button>
    </div>
  </div>
</template>
<script>
import ImgUp from "../../../mianTitle/imgUp";
import api from "@/api/shop";
import api2 from "@/api/lang";
import api1 from "@/api/one";

// import api1 from "@/api/one";
export default {
  data() {
    return {
      arr: [{
          name: "商品名称",
          value: "",
          type:'text',
          bt: true
        },
        {
          name: "商品型号",
          value: "",
          type:'text',
          bt: true
        },
        {
          name: "商品编码",
          value: "",
          type:'text',
          bt: true
        },
        {
          name: "库存数量",
          value: "",
          type:'number',
          bt: true
        },
        {
          name: "商品价格",
          value: "",
          type:'number',
          bt: true
        },
        {
          name: "商品原价",
          value: "",
          type:'number',
          bt: true
        },
        {
          name: "运费价格",
          value: "",
          type:'text',
          bt: false
        },
        {
          name: "排序",
          value: "",
          type:'number',
          bt: true
        }
      ],
      loading:false,
      classifyName: "",
      thirdClassifyName: "",
      value1: "", //一级分类id
      fValue: "", //一级分类
      options1: [], //一级分类
      value2: "", //二级分类名字
      value3: "", //二级分类id
      valueThird: "", //三级分类名字
      thirdId: "", //三级分类名字
      options2: [], //二级分类
      options3: [], //三级分类
      labelList:[],//标签数组
      label:'',//标签名
      labelArr:[],
      labelArr1:[],
      attributeList:[],//属性数组
      attribute:'',//属性名
      attributeArr:[],
      attributeArr1:[],
      brandList:[],//商品品牌数组
      brand:'',//商品品牌
      brandNames:'',
      brands:'',
      langList: [], //语言分类
      radio: "",
      radio1: "",
      radio2: "",

      qidingliang: "",
      goodSize: "", //型号
      goodColor: "", //颜色
      goodImg: "", //图片
      colorlist: [{
        num: 1,
        value: "",
      }],
      SizeList: [{
        price: "",
        size: "",//参数1名称
        color: "",//参数2名称
        page:'',//参数3名称
      }],
      oneId:'',
      parameter1:'',//参数1
      parameter2:'',//参数2
      parameter3:'',//参数3
    };
  },
  watch: {
    async fValue(val) {
      var _this = this
      console.log('fValue',val)
      // this.value1 =val
      _this.value1 = val
      this.value2 = ''
      this.options1.forEach(function(value,index){
        if(value.classifyName == val){
          _this.value1 = value.id
        }
      })
      var element = sessionStorage.getItem('shopLang')
      await api1
        .getTwoClass({
          id: _this.value1,
          element:element
        })
        .then(res => {
          console.log(res.data.data)
          if(res.data.data.length == 1){
            this.value2 = res.data.data[0].classifyName
            this.value3 = res.data.data[0].id
          }
          
          // this.classifyName = res.data.data[0].classifyName
          this.options2 = res.data.data;
        });
    },
    async value2(val){
      console.log(val)
      var id = val
      this.valueThird = ''
      this.options2.forEach(function(value,index){
        if(value.classifyName == val){
          id = value.id
        }
      })
      var element = sessionStorage.getItem('shopLang')
      await api1
        .getListClassThird({
          id: id,
          element:element
        })
        .then(res => {
          console.log(res.data.data)
          if(res.data.data.length == 1){
            this.valueThird = res.data.data[0].classifyName
            this.thirdId = res.data.data[0].id
          }
          
          // this.classifyName = res.data.data[0].classifyName
          this.options3 = res.data.data;
        });
    }
  },
  async created() {
    var _this = this
    var element = sessionStorage.getItem('shopLang')
    await api.getOneList(element).then(res => {
      this.options1 = res.data.data;
    });
    await api2.getAllLang().then(res => {
      res.data.data.forEach(function(value,index){
        _this.langList.push(value.element)
      })
      console.log('pppppp',this.langList)
    });
    await api.labelList({
      element:element
    })
    .then(res=>{
      this.labelList = res.data.data
      console.log(res)
    })
    await api.attributeList({
      element:element
    })
    .then(res=>{
      this.attributeList = res.data.data
      console.log(res)
    })
    await api.brandList({
      element:element
    })
    .then(res=>{
      this.brandList = res.data.data
      console.log(res)
    })
  },
  async mounted() {
    var _this = this
    var element = sessionStorage.getItem('shopLang')
    if (this.$store.state.zt.zt == "1") {
      await api
        .getShopId({
          id: this.$store.state.zt.Xid,
          number: 1
        })
        .then(res => {
          console.log(res, "我是第一页");
          let hhh = res.data.data;
          this.classifyName = hhh.classifyName;
          this.arr[7].value = hhh.paixu; //排序
          this.arr[0].value = hhh.goodNames; //商品名
          this.arr[1].value = hhh.xinghao; //商品型号
          this.arr[2].value = hhh.hetongBianhao; //商品编码
          this.arr[3].value = hhh.kucun; //库存数量
          this.arr[4].value = hhh.goodPrice; //商品价格
          this.arr[5].value = hhh.goodShowPrice; //原价
          this.arr[6].value = hhh.yunfei; //运费价格
          this.radio1 = hhh.guanwangStatus; // 官网状态
          this.radio = hhh.mallStatus; // 商城状态
          this.radio2 = hhh.category != null ? hhh.category : 1;
          this.SizeList = JSON.parse(hhh.goodSku);
          // this.fParentType=hhh.fParentType, //所属分类
          this.qidingliang = hhh.qidingliang; //启定量that.goodSize, //型号 this.goodColor, //颜色
          this.value1 = hhh.fParentType;//id
          this.parameter1 = JSON.parse(hhh.parameterName)[0]//参数1
          this.parameter2 = JSON.parse(hhh.parameterName)[1]//参数2
          this.parameter3 = JSON.parse(hhh.parameterName)[2]//参数3
          this.options1.forEach(function(value,index){
            if(value.id == hhh.fParentType){
              _this.fValue = value.classifyName
            }
          })
          console.log(this.fValue)
          this.value2 = hhh.sParentType;
          this.value3 = hhh.sParentType;
          this.thirdId = hhh.tParentType;
          this.goodImg = hhh.goodImg;
          if(hhh.brands && hhh.brands.length > 0){
            this.brand = hhh.brands[0].brandNames
          }
          console.log(this.value2,this.value3);
          if(hhh.tags && hhh.tags.length > 0){
            var Ul = document.getElementById('labelList')
            hhh.tags.forEach(function(value,index){
              var oLi = document.createElement('li')
              oLi.style.display = 'inline-block'
              oLi.style.backgroundColor = '#ff6700'
              oLi.style.padding = '0px 10px'
              oLi.style.marginRight = '5px'
              oLi.className = 'labelLi'
              oLi.innerHTML = value.tagNames
              Ul.appendChild(oLi)
              _this.labelArr.push(value.tagNames)
              _this.labelArr1.push({
                name:value.tagNames,
                tagId:value.id
              })
            })
          }
          if(hhh.attributes && hhh.attributes.length > 0){
            var Ul = document.getElementById('attributeList')
            hhh.attributes.forEach(function(value,index){
              var oLi = document.createElement('li')
              oLi.style.display = 'inline-block'
              oLi.style.backgroundColor = '#ff6700'
              oLi.style.padding = '0px 10px'
              oLi.style.marginRight = '5px'
              oLi.className = 'attributeLi'
              oLi.innerHTML = value.attributeNames
              Ul.appendChild(oLi)
              _this.attributeArr.push(value.attributeNames)
              _this.attributeArr1.push({
                name:value.attributeNames,
                attributeId:value.id
              })
            })
          }
        });
        console.log(this.value2,this.value3)
        await api1
        .getTwoClass({
          id: this.value1,
          element:sessionStorage.getItem('shopLang')
        })
        .then(res=>{
          console.log(res,this.value2,this.value3)
          res.data.data.forEach(function(value,index){
            console.log(_this.value2,_this.value3,value.id)
            if(_this.value3 == value.id){
              _this.value2 = value.classifyName
            console.log(_this.value3,_this.value2)
            }
          })
        })
        console.log(_this.value3)
        await api1
          .getListClassThird({
            id: _this.value3,
            element:element
          })
          .then(res => {
            console.log(res.data.data)
            _this.options3 = res.data.data;
            console.log(_this.options3)
            _this.options3.forEach(function(value,index){
              console.log(value)
              if(_this.thirdId == value.id){
                _this.valueThird = value.classifyName
                console.log(_this.valueThird)
                // _this.thirdClassifyName = value.classifyName
              }
            })
          });
    }else if(this.$store.state.zt.zt == "10"){
      await api
        .getShopId({
          id: this.$store.state.zt.Xid,
          number: 1
        })
        .then(res => {
          console.log(res, "我是第一页");
          let hhh = res.data.data;
          this.classifyName = hhh.classifyName;
          this.arr[7].value = hhh.paixu; //排序
          this.arr[0].value = hhh.goodNames; //商品名
          this.arr[1].value = hhh.xinghao; //商品型号
          this.arr[2].value = hhh.hetongBianhao; //商品编码
          this.arr[3].value = hhh.kucun; //库存数量
          this.arr[4].value = hhh.goodPrice; //商品价格
          this.arr[5].value = hhh.goodShowPrice; //原价
          this.arr[6].value = hhh.yunfei; //运费价格
          this.radio1 = hhh.guanwangStatus; // 官网状态
          this.radio = hhh.mallStatus; // 商城状态
          this.radio2 = hhh.category != null ? hhh.category : 1;
          this.SizeList = JSON.parse(hhh.goodSku);
          // this.fParentType=hhh.fParentType, //所属分类
          this.qidingliang = hhh.qidingliang; //启定量that.goodSize, //型号 this.goodColor, //颜色
          this.value1 = hhh.fParentType;
          this.options1.forEach(function(value,index){
            if(value.id == hhh.fParentType){
              _this.fValue = value.classifyName
            }
          })
          this.value2 = hhh.sParentType;
          this.value3 = hhh.sParentType;
          this.thirdId = hhh.tParentType;
          this.goodImg = hhh.goodImg;
          if(hhh.brands && hhh.brands.length > 0){
            this.brand = hhh.brands[0].brandNames
          }
          console.log(this.value2,this.value3);
          if(hhh.tags && hhh.tags.length > 0){
            var Ul = document.getElementById('labelList')
            hhh.tags.forEach(function(value,index){
              var oLi = document.createElement('li')
              oLi.style.display = 'inline-block'
              oLi.style.backgroundColor = '#ff6700'
              oLi.style.padding = '0px 10px'
              oLi.style.marginRight = '5px'
              oLi.className = 'labelLi'
              oLi.innerHTML = value.tagNames
              Ul.appendChild(oLi)
              _this.labelArr.push(value.tagNames)
              _this.labelArr1.push({
                name:value.tagNames,
                tagId:value.id
              })
            })
          }
          if(hhh.attributes && hhh.attributes.length > 0){
            var Ul = document.getElementById('attributeList')
            hhh.attributes.forEach(function(value,index){
              var oLi = document.createElement('li')
              oLi.style.display = 'inline-block'
              oLi.style.backgroundColor = '#ff6700'
              oLi.style.padding = '0px 10px'
              oLi.style.marginRight = '5px'
              oLi.className = 'attributeLi'
              oLi.innerHTML = value.attributeNames
              Ul.appendChild(oLi)
              _this.attributeArr.push(value.attributeNames)
              _this.attributeArr1.push({
                name:value.attributeNames,
                attributeId:value.id
              })
            })
          }
        });
        console.log(this.value2,this.value3)
        await api1
        .getTwoClass({
          id: this.value1,
          element:sessionStorage.getItem('shopLang')
        })
        .then(res=>{
          console.log(res,this.value2,this.value3)
          res.data.data.forEach(function(value,index){
            console.log(_this.value2,_this.value3,value.id)
            if(_this.value3 == value.id){
              _this.value2 = value.classifyName
            console.log(_this.value3,_this.value2)
            }
          })
        })
        console.log(_this.value3)
        await api1
          .getListClassThird({
            id: _this.value3,
            element:element
          })
          .then(res => {
            console.log(res.data.data)
            _this.options3 = res.data.data;
            console.log(_this.options3)
            _this.options3.forEach(function(value,index){
              console.log(value,_this.thirdId)
              if(_this.thirdId == value.id){
                _this.valueThird = value.classifyName
                console.log(_this.valueThird)
                // _this.thirdClassifyName = value.classifyName
              }
            })
          });
    }
  },
  components: {
    ImgUp
  },
  methods: {
    delLabel(e){//删除标签
      if(e.target.className == 'labelLi'){
        console.log(e.target)
        e.target.remove()
        var index = this.labelArr.indexOf(e.target.innerHTML)
        this.labelArr.splice(index,1);
        this.labelArr1.splice(index,1);
      }
    },
    delAttribute(e){//删除属性
      if(e.target.className == 'attributeLi'){
        console.log(e.target)
        e.target.remove()
        var index = this.attributeArr.indexOf(e.target.innerHTML)
        this.attributeArr.splice(index,1);
        this.attributeArr1.splice(index,1);
      }
    },
    attributeChange(val){
      console.log(val)
      var _this = this
      if(this.attributeArr.length > 0){
        var repeat = false
        this.attributeArr.forEach(function(value,index){
          console.log(index)
          if(value == _this.attributeList[val].attributeNames){
            repeat = true 
          }
        })
        if(repeat){
          this.$message({
            message: '此标签已选择',
            type: 'error'
          });
        }else{
          var Ul = document.getElementById('attributeList')
          var oLi = document.createElement('li')
          oLi.style.display = 'inline-block'
          oLi.style.backgroundColor = '#ff6700'
          oLi.style.padding = '0px 10px'
          oLi.style.marginRight = '5px'
          oLi.className = 'attributeLi'
          oLi.innerHTML = this.attributeList[val].attributeNames
          Ul.appendChild(oLi)
          this.attributeArr.push(this.attributeList[val].attributeNames)
          this.attributeArr1.push({
            name:this.attributeList[val].attributeNames,
            attributeId:this.attributeList[val].id
          })
        }
      }else{
        var Ul = document.getElementById('attributeList')
        var oLi = document.createElement('li')
        oLi.style.display = 'inline-block'
        oLi.style.backgroundColor = '#ff6700'
        oLi.style.padding = '0px 10px'
        oLi.style.marginRight = '5px'
        oLi.className = 'attributeLi'
        oLi.innerHTML = this.attributeList[val].attributeNames
        Ul.appendChild(oLi)
        this.attributeArr.push(this.attributeList[val].attributeNames)
        this.attributeArr1.push({
          name:this.attributeList[val].attributeNames,
          attributeId:this.attributeList[val].id
        })
      }
    },
    labelChange(val){
      console.log(val)
      var _this = this
      if(this.labelArr.length > 0){
        var repeat = false
        this.labelArr.forEach(function(value,index){
          console.log(index)
          if(value == _this.labelList[val].tagNames){
            repeat = true 
          }
        })
        if(repeat){
          this.$message({
            message: '此标签已选择',
            type: 'error'
          });
        }else{
          var Ul = document.getElementById('labelList')
          var oLi = document.createElement('li')
          oLi.style.display = 'inline-block'
          oLi.style.backgroundColor = '#ff6700'
          oLi.style.padding = '0px 10px'
          oLi.style.marginRight = '5px'
          oLi.className = 'labelLi'
          oLi.innerHTML = this.labelList[val].tagNames
          Ul.appendChild(oLi)
          this.labelArr.push(this.labelList[val].tagNames)
          this.labelArr1.push({
            name:this.labelList[val].tagNames,
            tagId:this.labelList[val].id
          })
        }
      }else{
        var Ul = document.getElementById('labelList')
        var oLi = document.createElement('li')
        oLi.style.display = 'inline-block'
        oLi.style.backgroundColor = '#ff6700'
        oLi.style.padding = '0px 10px'
        oLi.style.marginRight = '5px'
        oLi.className = 'labelLi'
        oLi.innerHTML = this.labelList[val].tagNames
        Ul.appendChild(oLi)
        this.labelArr.push(this.labelList[val].tagNames)
        this.labelArr1.push({
          name:this.labelList[val].tagNames,
          tagId:this.labelList[val].id
        })
      }
    },
    hh() {},
    queding() {
      if(this.parameter1 == ''){
        this.$message({
          showClose: true,
          message: "请至少输入一个参数名称"
        });
        return false
      }
      for(let k=0;k<this.SizeList.length;k++){
        if(this.SizeList[k].price == ''){
          this.$message({
            showClose: true,
            message: "请输入规格的价格"
          });
          return false
        }
      }
      let arr = this.arr;
      let parameterName = []
      if(this.parameter1){
        parameterName.push(this.parameter1)
      }else{
        parameterName.push('')
      }
      if(this.parameter2){
        parameterName.push(this.parameter2)
      }else{
        parameterName.push('')
      }
      if(this.parameter3){
        parameterName.push(this.parameter3)
      }else{
        parameterName.push('')
      }
      console.log(parameterName)
      let that = this;
      let mycolorarr = [];
      this.options2.forEach(function(value,index){
        if(value.classifyName == that.value2){
          that.value3 = value.id
        }
      })
      if(this.brandList){
        this.brandList.forEach(function(value,index){
          if(value.brandNames == that.brand){
            that.brands = value.id
          }
        })
      }
      for(var i=0;i<this.options3.length;i++){
        if(this.valueThird == this.options3[i].classifyName){
          this.thirdId = this.options3[i].id
        }
      }
      console.log(that.SizeList);
      let temp = {
        goodName: arr[0].value, //商品名
        xinghao: arr[1].value, //商品型号
        hetongBianhao: arr[2].value, //商品编码
        kucun: arr[3].value, //库存数量
        goodPrice: arr[4].value, //商品价格
        goodShowPrice: arr[5].value, //原价
        yunfei: arr[6].value, //运费价格
        paixu: arr[7].value, //排序
        category: this.radio2, //是否为推荐状态
        goodImg:that.goodImg,
        // good_show: that.goodImg[0],
        guanwangStatus: that.radio1, // 官网状态
        mallStatus: that.radio, // 商城状态
        suoshufenlei: that.suoshufenlei, //所属分类
        qidingliang: that.qidingliang, //启定量
        goodSku: this.SizeList,
        // goodSize: that.goodSize, //型号
        // goodColor: mycolorarr, //颜色
        fParentType: that.value1, //
        sParentType: that.value3, //
        tParentType: that.thirdId, //
        tags:JSON.stringify(this.labelArr1),
        attributes:JSON.stringify(this.attributeArr1),
        brands:this.brands,
        parameterName:parameterName //参数名数组
      };
      console.log(temp.paixu == '')
      if(temp.goodName == ''){
        this.$message({
          showClose: true,
          message: "请输入商品名称"
        });
        return false
      }
      if(temp.xinghao == ''){
        this.$message({
          showClose: true,
          message: "请输入商品型号"
        });
        return false
      }
      if(temp.hetongBianhao == ''){
        this.$message({
          showClose: true,
          message: "请输入商品编码"
        });
        return false
      }
      if(temp.kucun == ''){
        this.$message({
          showClose: true,
          message: "请输入库存数量"
        });
        return false
      }
      if(temp.goodPrice == ''){
        this.$message({
          showClose: true,
          message: "请输入商品价格"
        });
        return false
      }
      if(temp.goodShowPrice == ''){
        this.$message({
          showClose: true,
          message: "请输入商品原价"
        });
        return false
      }
      if(temp.yunfei == ''){
        temp.yunfei = 0
      }
      if(temp.paixu === ''){
        this.$message({
          showClose: true,
          message: "请输入商品排序"
        });
        return false
      }
      if(temp.category == ''){
        this.$message({
          showClose: true,
          message: "请选择商品是否为推荐状态"
        });
        return false
      }
      if(temp.guanwangStatus == ''){
        this.$message({
          showClose: true,
          message: "请选择商品官网状态"
        });
        return false
      }
      if(temp.mallStatus == ''){
        this.$message({
          showClose: true,
          message: "请选择商品商城状态"
        });
        return false
      }
      if(temp.qidingliang == ''){
        this.$message({
          showClose: true,
          message: "请输入商品起订量"
        });
        return false
      }
      if(this.fValue == ''){
        this.$message({
          showClose: true,
          message: "请选择商品一级分类"
        });
        return false
      }
      if(this.value2 == ''){
        this.$message({
          showClose: true,
          message: "请选择商品二级分类"
        });
        return false
      }
      console.log('ppppppp',)
      if(this.valueThird == ''){
        this.$message({
          showClose: true,
          message: "请选择商品三级分类"
        });
        return false
      }

      if (this.$store.state.zt.zt == "1") {
        this.loading = true
        console.log(this.$store.state.zt.zt);
        temp.id = this.$store.state.zt.Xid;
        api
          .MainUpData({
            ...temp
          })
          .then(res => {
            this.loading = false
            this.$message({
              showClose: true,
              type: "success",
              message: "更新成功"
            });
            this.$parent.$parent.$parent.$parent.shuaxin();
          })
          .catch(res=>{
            this.loading = false
            this.$message({
              message: "更新失败",
              type: "error"
            });
          })
      }else if(this.$store.state.zt.zt == "10"){
        this.loading = true
        console.log(this.$store.state.zt.zt);
        api.setShop({ ...temp }).then(res => {
          console.log(res.msg);
          if (res.msg == "操作成功") {
            this.loading = false
            this.$message({
              showClose: true,
              type: "success",
              message: "请进行下一步"
            });
            console.log(this.$parent.$parent.$parent.$parent)
            this.$parent.$parent.$parent.$parent.changeActiveName("second")
            this.$store.commit("zt/changeArrzt", 1);
            this.$store.commit("zt/changeId", res.data);
          }
        })
        .catch(res=>{
          this.loading = false
          this.$message({
            message: "添加失败",
            type: "error"
          });
        })
      }else {
        this.loading = true
        api.setShop({ ...temp }).then(res => {
          console.log(res.msg);
          if (res.msg == "操作成功") {
            this.loading = false
            this.$message({
              showClose: true,
              type: "success",
              message: "请进行下一步"
            });
            console.log(this.$parent.$parent.$parent.$parent)
            this.$parent.$parent.$parent.$parent.changeActiveName("second")
            this.$store.commit("zt/changeArrzt", 1);
            this.$store.commit("zt/changeId", res.data);
          } else {
            api.setShop({ ...temp }).then(data => {
              console.log(data.msg);
              if (data.msg == "操作成功") {
                this.loading = false
                this.$message({
                  showClose: true,
                  type: "success",
                  message: "请进行下一步"
                });
                console.log(this.$parent.$parent.$parent.$parent)
                this.$parent.$parent.$parent.$parent.changeActiveName("second")
                this.$store.commit("zt/changeArrzt", 1);
                this.$store.commit("zt/changeId", data.data);
              }
            })
          }
        })
        .catch(res=>{
          this.loading = false
          this.$message({
            message: "添加失败",
            type: "error"
          });
        })
        console.log(1123);
      }
    },
    quxiao() {
      this.arr.forEach((item, index) => {
        item.value = "";
      });
      this.classifyName = "";
      this.guanwangStatus = ""; // 官网状态
      this.mallStatus = ""; // 商城状态
      this.suoshufenlei = ""; //所属分类
      this.qidingliang = ""; //启定量
      this.goodSize = ""; //型号
      this.goodColor = ""; //颜色
      this.$parent.$parent.$parent.$parent.close();
    },
    handleChange(val) {
      console.log(val);
    },
    aa(val) {
      console.log(val);
    },
    changeSizeList(index, val) {
      if (val == 1) {
        this.SizeList.push({
          price: "",
          size: "",
          color: "",
          page: "",
        })
      } else if (this.SizeList.length > 1) {
        this.SizeList.splice(index, 1);
      }

    }
  }
};

</script>
<style lang="scss" scoped>
.hhhha {
  align-items: center;
}
.skuTitle{
  display: inline-block;
  height: 20px !important;
}

.jia {
  cursor: pointer;
  color: red;
  margin-left: 2px;
  min-width: 0 !important;
  display: inline !important;
}

span:not(.red) {
  display: inline-block;
  white-space: nowrap;
  min-width: 81px;
  text-align: left;
  margin-right: 20px;
  height: 10px;
  line-height: 10px;
}

.around {
  display: flex;
  justify-content: space-around;


  .flex {
    flex: 1;
    padding: 20px;
  }
}

.qunimade {
  padding-left: 100px;
  display: flex;
  flex-wrap: wrap;
}

.aa {
  display: flex;

  .el-select>.el-input {
    flex: 1;
  }
}

input {
  width: 100%;
}

.onlywidth {
  width: 345px;
}

.red {
  color: red;
}

.center {
  display: flex;
  justify-content: center;
  margin: 0;
}
#labelList{
  width: 80%;
}
.noticeListBox {
  margin-left: 100px;
  margin-top: 15px;
    width: 300px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow-x:scroll;
}
.noticeList{
  display: inline-block;      
}
</style>
