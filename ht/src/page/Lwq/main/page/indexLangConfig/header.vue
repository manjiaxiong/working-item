<template>
  <div>
    <div class="header">
      <el-button type="danger" @click="centerDialogVisible = true">添加</el-button>
      <el-button type="danger" @click="init">刷新</el-button>
    </div>
    <div class="conmain">
      <table border="0.5" cellspacing="0">
        <tr class="color">
          <th>语言</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item,index) in list" :key="index">
          <td>{{item.describe}}</td>
          <td>
            <div>
              <el-button type="danger" @click="delet(item.element)">删除</el-button>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <div v-if="centerDialogVisible">
      <el-dialog
        title="添加语言"
        :visible.sync="centerDialogVisible"
        width="50%"
        :close-on-click-modal="false"
        center
        v-loading="loading"
        element-loading-text="上传中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
    >
        <form action="./1213" method="get" id="fromTi" class="felx">

            <div>
              <span>语言</span> <input name="language" type="text">
            </div>
            <div v-for="(item,index) in mylist2" :key="index">

              <span>{{item.title}}</span> <input :name="item.name" type="text">
            </div>
            <div>
              <span>欢迎语</span>
              <input type="text" name="greeting">
            </div>
            <div>
              <span>我的收藏</span>
              <input type="text" name="myShoucang">
            </div>
            <div>
              <span>登陆</span>
              <input type="text" name="login">
            </div>
            <div>
              <span>注册</span>
              <input type="text" name="register">
            </div>
            <div>
              <span>我的订单</span>
              <input type="text" name="order">
            </div>
            <div>
              <span>邮件信息</span>
              <input type="text" name="messages">
            </div>
            <div>
              <span>关于我们</span>
              <input type="text" name="about">
            </div>
            <div>
              <span>媒体社交</span>
              <input type="text" name="social">
            </div>
            <div>
              <span>请选择</span>
              <input type="text" name="pleaseSelect">
            </div>
            <div>
              <span>请输入内容</span>
              <input type="text" name="pleaseInput">
            </div>
            <div>
              <span>搜索</span>
              <input type="text" name="search">
            </div>
            <div>
              <span>请先登陆</span>
              <input type="text" name="pleaseLogin">
            </div>
            <div>
              <span>收藏</span>
              <input type="text" name="collect">
            </div>
            <div>
              <span>购物车</span>
              <input type="text" name="gout">
            </div>
            <div>
              <span>关于</span>
              <input type="text" name="footerAbout">
            </div>
            <div>
              <span>服务条款</span>
              <input type="text" name="service">
            </div>
            <div>
              <span>隐私政策</span>
              <input type="text" name="privacy">
            </div>



            <!--            <div>底部</div>-->

            <div>
              <span>退款说明</span>
              <input type="text" name="refund">
            </div>
            <div>
              <span>目录</span>
              <input type="text" name="catalogue">
            </div>
            <div>
              <span>网站首页</span>
              <input type="text" name="index">
            </div>
            <div>
              <span>新品上市</span>
              <input type="text" name="newArrival">
            </div>
            <div>
              <span>商城订单</span>
              <input type="text" name="mallOrders">
            </div>
            <div>
              <span>热销产品</span>
              <input type="text" name="hotProducts">
            </div>
            <div>
              <span>产品中心</span>
              <input type="text" name="productCenter">
            </div>
            <div>
              <span>我的账户</span>
              <input type="text" name="myAccount">
            </div>
            <div>
              <span>我的收藏</span>
              <input type="text" name="myCollect">
            </div>
            <div>
              <span>联系我们</span>
              <input type="text" name="contactUs">
            </div>
            <div>
              <span>注册账号</span>
              <input type="text" name="register">
            </div>
            <div>
              <span>运费</span>
              <input type="text" name="freight">
            </div>
            <div v-for="(item,index) in mylist1" :key="index">
              <span>{{item.title}}</span>
              <input type="text" :name="item.name">
            </div>

        </form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="commit">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    import api from "@/api/lang"

    export default {
        name: "header",
        data() {
            return {
                loading:false,
                centerDialogVisible: false,
                list: [],
                myadd: false,
                currentPage3: 10,
                language: "",
                mylist2:[
                    {
                        title: "商品",
                        name: "myheiheishop"
                    }, {
                        title: "合计",
                        name: "mdhj"
                    }, {
                        title: "信息摘要",
                        name: "informativeAbstract"
                    }, {
                        title: "公司名字",
                        name: "computerName"
                    }, {
                        title: "通讯地址",
                        name: "txaddress"
                    }, {
                        title: "联系方式",
                        name: "phone11"
                    }, {
                        title: "电话和邮箱",
                        name: "phoneAndEmail"
                    }, {
                        title: "日期",
                        name: "date"
                    }, {
                        title: "合同编号",
                        name: "hetong"
                    }, {
                        title: "确定",
                        name: "queding"
                    }, {
                        title: "确定",
                        name: "queding"
                    }
                ],
                mylist1: [{
                    title: "数量",
                    name: "num"
                }, {
                    title: "尺码",
                    name: "mySize"
                }, {
                        title: "颜色",
                        name: "myColor"
                    },
                    {
                        title: "加入购物车",
                        name: "addShop"
                    },
                    {
                        title: "添加到收藏",
                        name: "AddToFavorites"
                    }, {
                        title: "请选择尺码",
                        name: "PleaseChooseTheSize"
                    }, {
                        title: "请选择首页",
                        name: "PleaseSelectHomePage"
                    }, {
                        title: "库存充足",
                        name: "adequateStock"
                    }, {
                        title: "库存不足",
                        name: "understock"
                    }, {
                        title: "产品型号",
                        name: "shopSize"
                    }, {
                        title: "关于定做商品",
                        name: "AboutCustomizedGoods"
                    }, {
                        title: "了解更多信息",
                        name: "understandMoreInformation"
                    }, {
                        title: "发送电子邮件",
                        name: "sendEmial"
                    }, {
                        title: "通过邮件问一些问题",
                        name: "YouCanRequest"
                    }, {
                        title: "产品详情",
                        name: "productDetails"
                    }, {
                        title: "交货细节",
                        name: "DetailsOfDelivery"
                    }, {
                        title: "付款和安全",
                        name: "PaymentAndSecurity"
                    }, {
                        title: "退货说明",
                        name: "ReturnInstructions"
                    }, {
                        title: "推荐商品",
                        name: "commodities"
                    }, {
                        title: "加入我们",
                        name: "JoinOur"
                    }, {
                        title: "立即购买",
                        name: "bayNow"
                    }, {
                        title: "彩妆系列",
                        name: "MakeUpSeries"
                    }, {
                        title: "新品详解",
                        name: "ShopNow"
                    }, {
                        title: "产品描述",
                        name: "productDescription"
                    }, {
                        title: "直接登录",
                        name: "Directlogin"
                    }, {
                        title: "您的电子邮件",
                        name: "YoureMail"
                    }, {
                        title: "密码",
                        name: "psw"
                    }, {
                        title: "修改密码 ",
                        name: "changepsw"
                    }, {

                        title: "原密码 ",
                        name: "oldpsw"
                    }, {

                        title: "新密码 ",
                        name: "nowpsw"
                    }, {

                        title: "确认提交",
                        name: "commit"
                    }, {
                        title: "您的全名",
                        name: "allName"
                    }, {
                        title: "设置密码",
                        name: "setpassword"
                    }, {
                        title: "手机号码",
                        name: "phone"
                    }, {
                        title: "条款说明",
                        name: "acceptTheTerms"
                    }, {
                        title: "  邮件不能为空",
                        name: "EmailCannotBeEmpty"
                    }, {
                        title: "登录成功",
                        name: "loginSuccess"
                    }
                    , {
                        title: "原密码不能为空",
                        name: "pswNoNull"
                    }
                    , {
                        title: "购物袋",
                        name: "shoppingBag"
                    }, {
                        title: "全部商品",
                        name: "allShop"
                    }, {
                        title: "全选",
                        name: "all"
                    }, {
                        title: "商品详情",
                        name: "llcommodity"
                    }, {
                        title: "单价",
                        name: "everyPrice"
                    }, {
                        title: "总计",
                        name: "total"
                    }, {
                        title: "操作",
                        name: "chaoZhuo"
                    }, {
                        title: "删除",
                        name: "delet"
                    }, {
                        title: "移入收藏夹",
                        name: "Moavorites"
                    }, {
                        title: "已选商品",
                        name: "wantShop"
                    }, {
                        title: "件",
                        name: "jian"
                    }, {
                        title: "合计(不含运费)",
                        name: "heji"
                    }, {
                        title: "最近收藏",
                        name: "TheRecent"
                    }, {
                        title: "最近浏览",
                        name: "liulanMsg"
                    }, {
                        title: "商品信息",
                        name: "merchandiseNews"
                    }, {
                        title: "在处理的订单",
                        name: "inChuli"
                    }, {
                        title: "已发送邮件",
                        name: "isSendEmail"
                    }, {
                        title: "发送成功",
                        name: "sendSuccess"
                    }, {
                        title: "商品清单",
                        name: "shopListName"
                    }, {
                        title: "商品总金额",
                        name: "allmoney"
                    },{
                        title: "语言",
                        name: "topLang"
                    },{
                        title: "产品系列",
                        name: "productsSeries"
                    },{
                        title: "加入我们的实时在线通讯获取最新通知消息",
                        name: "joinOur"
                    },{
                        title: "退出",
                        name: "out"
                    },{
                        title: "记住密码",
                        name: "rememberPsd"
                    },{
                        title: "邮件地址",
                        name: "emailAddress"
                    },{
                        title: "名字",
                        name: "name1"
                    },{
                        title: "问题",
                        name: "quesion"
                    },{
                        title: "加入电子简报",
                        name: "joinNews"
                    },{
                        title: "我已阅读并接受",
                        name: "alreadyRead"
                    },{
                        title: "服务条款和隐私政策",
                        name: "termsOfService"
                    },{
                        title: "订单号",
                        name: "orderNum"
                    },{
                        title: "购买地址",
                        name: "buyAdress"
                    },{
                        title: "订单详情",
                        name: "orderDetail"
                    },{
                        title: "查看详情",
                        name: "lookDetail"
                    },{
                        title: "商品图片",
                        name: "shopPho"
                    },{
                        title: "商品名称",
                        name: "shopName"
                    },{
                        title: "产品规格",
                        name: "shopSku"
                    },{
                        title: "是",
                        name: "Yes"
                    },{
                        title: "否",
                        name: "No"
                    },{
                        title: "去我的购物车",
                        name: "goMyCar"
                    },{
                      title:"最小起订量",
                      name:"minBuy"
                    },{
                        title:"请选择颜色",
                        name:'PleaseChooseTheColor'
                    },{
                        title:"订阅",
                        name:'subscribe'
                    },{
                        title:"请输入您的邮箱",
                        name:'placeEmail'
                    },{
                        title:'设置版权',
                        name:'banquan'
                    },{
                        title:"您的邮件已成功发送",
                        name:'sendSuccessEmail'
                    },{
                        title:"我知道了",
                        name:'ok'
                    },{
                        title:"账号登录",
                        name:'loginEmail'
                    },{
                        title:"注册",
                        name:'registerEmail'
                    },{
                        title:"忘记密码",
                        name:'forgetPsd'
                    },{
                        title:"已登录",
                        name:'loginEnd'
                    },{
                        title:"留言",
                        name:'leavingMsg'
                    },{
                        title:"找回密码",
                        name:'findPsd'
                    },{
                        title:"发送给朋友",
                        name:'sendFirend'
                    },{
                        title:"取消收藏",
                        name:'noCollect'
                    },{
                        title:"优化选择",
                        name:'optimalSelection'
                    },{
                        title:"价格升序",
                        name:'ascending'
                    },{
                        title:"当前选择",
                        name:'now'
                    },{
                        title:"查看产品",
                        name:'lookShop'
                    },{
                        title:"朋友的名字",
                        name:"friendName"
                    },{
                        title:"朋友的邮件地址",
                        name:"friendEmail"
                    },{
                        title:"给朋友发送邮件",
                        name:'sendFriend'
                    },{
                        title:"验证码",
                        name:'yanzheng'
                    },{
                        title:"已发送验证码至",
                        name:'sended'
                    },{
                        title:"请登录邮箱查看验证码",
                        name:'loginNum'
                    },{
                        title:"网络错误，请您稍后再试",
                        name:'wlErr'
                    },{
                        title:"确认密码",
                        name:'confirmPsd'
                    },{
                        title:"博客",
                        name:'blog'
                    },{
                        title:'没有此组合',
                        name:'noSku'
                    },{
                        title:'品牌历程',
                        name:'brandHistory'
                    },{
                        title:'常见问题（退换货）',
                        name:'returnedGoods'
                    },{
                        title:'付款与安全',
                        name:'pay'
                    },{
                        title:'Cookie政策',
                        name:'cookiePolicy'
                    },{
                        title:'关于定制',
                        name:'aboutCustomization'
                    },{
                        title:'批发计划',
                        name:'plan'
                    },{
                        title:'学生专属',
                        name:'student'
                    },{
                        title:'申请表格下载',
                        name:'download'
                    },{
                        title:'合作伙伴计划',
                        name:'paner'
                    },{
                        title:'信息',
                        name:'xinxi'
                    },{
                        title:'亲爱的用户',
                        name:'dearUser'
                    },{
                        title:'您好',
                        name:'hello'
                    },{
                        title:'欢迎使用您的',
                        name:'welecomeUse'
                    },{
                        title:'账户',
                        name:'account'
                    },{
                        title:'我的邮件',
                        name:'myEmail'
                    },{
                        title:'跟踪您最近的订单邮件详细信息',
                        name:'myEmailMsg'
                    },{
                        title:'我的地址',
                        name:'myAdress'
                    },{
                        title:'管理您的邮件账单地址',
                        name:'myAdressMsg'
                    },{
                        title:'更改密码',
                        name:'updatePsd'
                    },{
                        title:'更改用于登录的密码',
                        name:'updatePsdMsg'
                    },{
                        title:'管理您的邮件账单地址',
                        name:'liulanMsg'
                    },{
                        title:'查看您的购物车',
                        name:'myCarMsg'
                    },{
                        title:'管理您的订单',
                        name:'myOrderMsg'
                    },{
                        title:'查看您的收藏列表',
                        name:'myShoucangMsg'
                    },{
                        title:'查看您的购物车',
                        name:'myCarMsg'
                    },{
                        title:'登出',
                        name:'outLogin'
                    },{
                        title:'安全注销您的账户',
                        name:'outLoginMsg'
                    },{
                        title:'意见反馈',
                        name:'Feedback'
                    }
                ]
            }
        },
        created() {
            this.init();
        },
        methods: {
            commit() {
                this.loading = true
                var from1 = document.getElementById("fromTi")
                let myhhh = $("#fromTi").serializeArray();
                let temp = {};
                myhhh.forEach((item, index) => {

                    temp[item.name] = item.value
                })
                console.log(temp);
                api.addLang(temp).then(res => {
                    this.loading = false
                    console.log(res);
                    if (res.data.code == '000000') {
                        this.$notify({
                            title: '成功',
                            message: res.data.msg,
                            type: 'success'
                        });
                        this.centerDialogVisible = false;
                        this.init();
                    } else {
                        this.$notify({
                            title: '失败',
                            message: res.data.msg,
                            type: 'warning'
                        });
                    }

                })
                .catch(res=>{
                    this.loading = false
                    this.$message({
                      message: '添加失败',
                      type: 'error'
                    });
                })
            },
            init() {
                api.getAllLang().then(res => {

                    this.list = res.data.data;
                })
            },
            delet(val) {
                // element
                api.delet({
                    element: val
                }).then(res => {
                    this.$notify({
                        title: '删除成功',
                        message: res.data.msg,
                        type: 'success'
                    });
                    this.init();
                })
            },
            myaddconfig() {
                //确定设置
            },
            chaozuo() {
                this.myadd = true;
            },
            handleSizeChange() {

            },
            handleCurrentChange() {

            }
        }
    }
</script>

<style lang="scss" scoped>
  td {
    text-align: center;
  }
  .felx{
    display: flex;
    flex-wrap: wrap;
  }
  .felx span {
    display: inline-block;

    min-width: 100px;
  }

  .right {
    width: auto;
    height: auto;
    /*div{*/
    /*  margin: 5px;*/
    /*}*/
  }

  .left {
    width: auto;
    min-height: auto;
    /*div{*/
    /*  margin: 5px;*/
    /*}*/
  }

  input {
    width: 80px;
    /*margin: 0 auto;*/
  }

  .color {
    color: #555;
    background: #f7f7f7;

  }

  .color th {
    padding: 10px 10px;
  }

  .felx {
    display: flex;
    justify-content: space-between;
  }

  .conmain {
    box-sizing: border-box;
    padding: 10px;
    height: 70vh;
  }

  .header {
    padding: 5px;
  }

  td div {
    display: flex;
    padding: 2px;
    justify-content: center;
  }

  .myinput {
    display: flex;
    justify-content: center;

  }

  .myinput input {
    width: 200px;
  }

  .footer {
    display: flex;
    justify-content: center;
  }
</style>
