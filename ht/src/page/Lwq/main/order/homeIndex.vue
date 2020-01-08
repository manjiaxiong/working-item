<template>
    <div class="p100">
        <div class="top">
            <div class="topLeft">
                <div class="user">
                    <img src="../../../../assets/imges/houtai/user.png" alt="">
                </div>
                <div class="msg">
                    <p class="name">超级管理员</p>
                    <p class="ip">当前登录IP:{{ip}}</p>
                    <p class="lastTime">上次登录时间:{{lastTime}}</p>
                </div>
            </div>
            <div class="topRight">
                <ul>
                    <li>
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/钱包(1).png" alt="">
                        </div>
                        <span class="name1">总营业额</span>
                        <span class="num">{{temp.turnover}}</span>
                    </li>
                    <li>
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/订单(3).png" alt="">
                        </div>
                        <span class="name2">订单总数</span>
                        <span class="num">{{temp.orderNum}}</span>
                    </li>
                    <li>
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/注册.png" alt="">
                        </div>
                        <span class="name3">注册用户</span>
                        <span class="num">{{temp.enroll}}</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content">
            <ul>
                <li class="rightBorder bottomBorder">
                    <div class="center1">
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/UV.png" alt="">
                        </div>
                        <p>UV</p>
                        <p>{{temp.UV}}</p>
                    </div>
                </li>
                <li class="rightBorder bottomBorder">
                    <div class="center1">
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/形状1.png" alt="">
                        </div>
                        <p>IP</p>
                        <p>{{temp.IP}}</p>
                    </div>
                </li>
                <li class="rightBorder bottomBorder">
                    <div class="center1">
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/形状52拷贝2.png" alt="">
                        </div>
                        <p>人均PV</p>
                        <p>{{temp.gdpPv}}</p>
                    </div>
                </li>
                <li class="rightBorder bottomBorder">
                    <div class="center1">
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/形状39.png" alt="">
                        </div>
                        <p>PV</p>
                        <p>{{temp.pv}}</p>
                    </div>
                </li>
                <li class="rightBorder bottomBorder">
                    <div class="center1">
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/移动.png" alt="">
                        </div>
                        <p>移动UV占比</p>
                        <p>{{temp.dUv}}</p>
                    </div>
                </li>
                <li class="bottomBorder">
                    <div class="center1">
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/形状42拷贝.png" alt="">
                        </div>
                        <p>跳出率</p>
                        <p>{{temp.jumpOutRate}}%</p>
                    </div>
                </li>
                <li class="rightBorder">
                    <div class="center1">
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/icon-ckjk2copy2@3x.png" alt="">
                        </div>
                        <p>营业额</p>
                        <p>{{temp.turnover}}</p>
                    </div>
                </li>
                <li class="rightBorder">
                    <div class="center1">
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/window拷贝6.png" alt="">
                        </div>
                        <p>订单总数</p>
                        <p>{{temp.orderNum}}</p>
                    </div>
                </li>
                <li class="rightBorder">
                    <div class="center1">
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/icon_01copy.png" alt="">
                        </div>
                        <p>付款总订单数</p>
                        <p>{{temp.payOrderNum}}</p>
                    </div>
                </li>
                <li class="rightBorder">
                    <div class="center1">
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/单价.png" alt="">
                        </div>
                        <p>客单价</p>
                        <p>{{temp.perTicketSale}}</p>
                    </div>
                </li>
                <li class="rightBorder">
                    <div class="center1">
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/下单.png" alt="">
                        </div>
                        <p>询盘数</p>
                        <p>{{temp.enquiriesNum}}</p>
                    </div>
                </li>
                <li>
                    <div class="center1">
                        <div class="img">
                            <img src="../../../../assets/imges/houtai/复购.png" alt="">
                        </div>
                        <p>复购订单数</p>
                        <p>{{temp.afterPurchaseOrderNum}}</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div v-for="item in 3 " :key="item" class="box">
              <div class="myChart" :style="{width: '300px', height: '300px'}"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from "@/api/order";
    import api1 from "@/api/dayAndMonth";
    export default {
        data(){
          return {
              dataTime: [],
              Num: [],
              name:['客单价','客单数','产品价格'],
              list:[],
              num:3,
              temp:{},
              ip:'',
              lastTime:''
          }
        },
        async created() {
            await api
            .findOrderSreceived({
              startDate: null,
              endDate: null,

            })
            .then(res => {
              let that = this;
              console.log(res)
              setTimeout(function() {
                console.log(res.data.data, "我是原装的");
                that.init(res.data.data);
              }, 200);
            })
            .catch(res => {
              console.log(res);
            });
            await api1
                .dayAndMonth({
                  startDate: '2000-01-01',
                  endDate: null
                })
                .then(res => {
                  let mylist = res.data.data;
                  let that = this;
                  that.temp ={
                      "UV":mylist.uv,
                      "IP":mylist.ip,
                      "gdpPv":mylist.gdpPv,
                      'pv':mylist.pv,
                      "dUv":mylist.dUv,
                      'umpOutRate':mylist.umpOutRate,
                      "enroll":mylist.enroll,
                      "subscription":mylist.subscription,
                      'placeOrderMember':mylist.placeOrderMember,
                      "afterPurchaseMember":mylist.afterPurchaseMember,
                      "turnover":mylist.turnover,
                      "orderNum":mylist.orderNum,
                      "payOrderNum":mylist.payOrderNum,
                      "perTicketSale":mylist.perTicketSale.toFixed(2),
                      "payRate":mylist.payRate,
                      "afterPurchaseOrderNum":mylist.afterPurchaseOrderNum,
                      "guestSingular":mylist.guestSingular,
                      "afterPurchaseOrderSum":mylist.afterPurchaseOrderSum,
                      "productPrice":mylist.productPrice.toFixed(2),
                      'freightPrice':mylist.freightPrice,
                      "enquiriesNum":mylist.enquiriesNum,
                      "jumpOutRate":mylist.jumpOutRate.toFixed(2)
                  }
                  console.log(that.temp)
                })
                .catch(res => {
                  console.log(res);
                });
            await api.ipAndTime()
                .then(res=>{
                    console.log(res)
                    this.ip = res.data.data.ip
                    this.lastTime = res.data.data.landingTime
                })
        },
        methods: {
            drawLine() {
              let temp = [];
              let that = this;
              for (let i = 0; i < this.num; i++) {
                  console.log(that.Num[i]);
                let myChart1 = this.$echarts.init(
                  document.getElementsByClassName("myChart")[i]
                );
                myChart1.showLoading();
                setTimeout(function() {
                  myChart1.hideLoading();
                }, 1000);

                myChart1.setOption({

                  title: {
                    text: that.name[i], //标题
                    show: true,
                    textStyle: {
                      color: "#333"
                    }
                  },
                  xAxis: {
                    type: "category",
                    data: that.dataTime, //放时间
                  },
                  yAxis: {
                  },
                  series: [
                    {
                      name: that.name[i],
                      data: that.Num[i], //对应时间的数量
                      type: "line",
                      color: "#922C88"
                    }
                  ]
                });
                temp.push(myChart1);
              }
              window.addEventListener("resize", function() {
                temp.forEach(item => {
                  item.resize();
                });
              });
            },
            init(list) {
              console.log(list,"jjjjasjdaskdjkl")
              this.Num = []; //长度
              this.dataTime = [];
              this.list=list;
              let timeArr=list.listDate;
           
             
              this.dataTime=timeArr

              this.Num.push([...list.listPerTicketSale]);
              this.Num.push([...list.listGuestSingular]);
              this.Num.push([...list.listProductPrice]);
              console.log(this.dataTime)
              console.log(this.Num,'我是多少行');
              this.drawLine();
            }
        }
    };
</script>
<style lang="scss" scoped>
    .p100{
        .top{
            width: 100%;
            height: 100px;
            background-color: #f2f2f2;
            .topLeft{
                width: 25%;
                height: 100px;
                float: left;
                margin-left: 15px;
                display: flex;
                align-items: center;
                .user{
                    width: 70px;
                    height: 70px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .msg{
                    margin-left: 10px;
                    .tishi{
                        background-color: #ff6700;
                        color: #fff;
                        font-size: 13px;
                        line-height: 19px;
                        display: inline-block;
                        padding-left: 3px;
                        padding-right: 3px;
                    }
                    p{
                        font-size: 13px;
                        line-height: 19px;
                    }
                    .ip,.lastTime{
                        color: #222;
                    }
                }
            }
            .topRight{
                float: left;
                width: 70%;
                height: 100px;
                margin-left: 30px;
                display: flex;
                align-items: center;
                ul{
                  width: 100%;
                }
                li{
                    width: 30%;
                    height: 70px;
                    border-right: 1px solid #ccc;
                    margin-right: 20px;
                    display: flex;
                    align-items: center;
                    float: left;
                    .img{
                        width: 50px;
                        height: 50px;
                        display: inline-block;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .name1{
                        width: 130px;
                        border-bottom: 1px solid #ff6700;
                    }
                    .name2{
                        width: 130px;
                        border-bottom: 1px solid #54aade;
                    }
                    .name3{
                        width: 130px;
                        border-bottom: 1px solid #f7cf7b;
                    }
                    span{
                        font-size: 13px;
                        height: 20px;
                        line-height: 20px;
                        margin-left: 10px;
                    }
                }
                li:nth-child(3){
                    border-right: none;
                }
            }
        }
        .content{
            width: 100%;
            height: 300px;
            margin-top: 30px;
            background-color: #f2f2f2;
            padding-left: 40px;
            padding-top: 20px;
            box-sizing: border-box;
            li{
                width: 16%;
                height: 130px;
                display: flex;
                float: left;
                justify-content: center;
                align-items: center;
                .img{
                    width: 50px;
                    height: 50px;
                    /*margin-left: 2px;*/
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                p{
                    width: 100%;
                    text-align: center;
                    font-size: 13px;
                    line-height: 25px;
                }
            }
        }
    }
    .rightBorder{
        border-right: 1px solid #ccc;
    }
    .bottomBorder{
        border-bottom: 1px solid #ccc;
    }
    .center1{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .myChart {
        display: flex;
        float: left;
        justify-content: center;
        border: 1px solid #333;

        width: 300px !important;
        height: 300px !important;
        margin: 10px;
        position: relative;

        &:hover {
        }
        div {
          display: flex;
          justify-content: center;

          width: 300px !important;
          height: 300px !important;
          canvas {
            width: 300px !important;
            height: 300px !important;
          }
        }
      }
      .footer{
        width: 100%;
        display: flex;
        margin-top: 30px;
      }
      .box{
        padding: 0 50px;
        display: flex;
        flex-wrap: wrap;
      }
</style>
