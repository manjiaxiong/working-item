<template>
  <div class="HHHH">
    <div v-for="item in num " :key="item">
      <div class="myChart" :style="{width: '300px', height: '300px'}"></div>
    </div>
  </div>
</template>
<script>

export default {
  props:["num","list"],
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      dataTime:[],
      Num:[],
      name:"",//名字
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      let temp = [];
      let that=this;
      for (let i = 0; i < this.num; i++) {
        let myChart1 = this.$echarts.init(
          document.getElementsByClassName("myChart")[i]
        );
        myChart1.showLoading();
        setTimeout(function() {
          myChart1.hideLoading();
        }, 1000);

        //动态刷新数据要用setOption
        myChart1.setOption({
          axisPointer: {
            show: true,
            type: "line"
          },
          legend: {
            data: [that.name],
            left: "0px",
            top: "25px"
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: "none"
              },
              dataView: { readOnly: false },
              magicType: { type: ["line", "bar"] },
              restore: {},
              saveAsImage: {}
            }
          },
          title: {
            text: that.name,//标题
            show: true,
            textStyle: {
              color: "#333"
            }
          },
          xAxis: {
            type: "category",
            data: that.dataTime, //放时间
            axisLine: {
              show: true,
              lineStyle: {
              }
            }
          },

          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} "
            }
          },
          series: [
            {
              name: that.name,
              data: that.Num, //对应时间的数量
              type: "line",
              color: "#922C88",
            },
          ]
        });
        temp.push(myChart1);
      }
      window.addEventListener("resize", function() {
        console.log("嗨兄弟我重新刷新了吗");

        temp.forEach(item => {
          console.log(item);

          item.resize();
        });
      });
    },
    getList(list,name){
        this.Num=[];
        this.dataTime=[];
        list.forEach((item,index)=>{
            this.dataTime.push(item.time);
            this.Num.push(item.statistical);
        })
        this.name=name;
        this.drawLine();
    }
  }
};
</script>
<style lang="scss">
.HHHH {
  // width: 1000px;
  padding: 0 50px;
  display: flex;
  // overflow: hidden;
  flex-wrap: wrap;
  .myChart {
    display: flex;
    justify-content: center;
    border: 1px solid #333;
    // width: 450px !important;
    // height: 450px !important;
    width: 300px !important;
    height: 300px !important;
    margin: 10px;
    // transition: all 2s linear;
    position: relative;
    
    &:hover{
  
      // width: 700px !important;
    }
    div {
      display: flex;
      justify-content: center;
      // width: 450px !important;
      // height: 450px !important;
      width: 300px !important;
      height: 300px !important;
      canvas {
        // width: 450px !important;
        // height: 450px !important;
        width: 300px !important;
        height: 300px !important;
      }
    }
  }
}
</style>