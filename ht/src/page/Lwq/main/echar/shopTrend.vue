<template>
  <div class="HHHH">
    <div v-for="item in num " :key="item">
      <div class="myChart" :style="{width: '300px', height: '300px'}" @click="echarClick(item)"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["num"],
  data() {
    return {
      dataTime: [],
      Num: [],
      name:['访问量','成交订单数','订单金额','总件数'],
      list:[]
    };
  },
  mounted() {

  },
  methods: {
    echarClick(item){
      console.log(this.list)
      this.$router.push({
          path : "/index/main/echarDetail",
          query : {//query是跳转是传递的参数，对象类型
              name:this.name[item-1],
              data:this.Num[item-1],
              time:this.list.listDate
          }
      })
    },
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

      this.Num.push([...list.listfangwenliang]);
      this.Num.push([...list.listgoodcounts]);
      this.Num.push([...list.listorderprice]);
      this.Num.push([...list.listorders]);
      console.log(this.dataTime)
      console.log(this.Num,'我是多少行');
      this.drawLine();
    }
  }
};
</script>
<style lang="scss">
.HHHH {
  padding: 0 50px;
  display: flex;

  flex-wrap: wrap;
  .myChart {
    display: flex;
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
}
</style>