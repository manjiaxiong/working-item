<template>
  <div>
    <div class="myflex fucnk">
      <div class="Name w100">订单</div>

      <div class="myflex qunimade">
        <div class="myflex">
          <div class="w100">
            <p>营业额</p>
            <p>{{temp.turnover}}</p>
          </div>
        </div>
        <div class="myflex">
          <div class="w100">
            <p>复购订单金额</p>
            <p>{{temp.turnover}}</p>
          </div>
        </div>
      </div>
      <div class="myflex qunimade">
        <div class="myflex">
          <div class="w100">
            <p>订单总数</p>
            <p>{{temp.orderNum}}</p>
          </div>
        </div>
        <div class="myflex">
          <div class="w100">
            <p>产品价格</p>
            <p>{{temp.productPrice}}</p>
          </div>
        </div>
      </div>
      <div class="myflex qunimade">
        <div class="myflex">
          <div class="w100">
            <p>付款总订单数</p>
            <p>{{temp.payOrderNum}}</p>
          </div>
        </div>
        <div class="myflex">
          <div class="w100">
            <p>询盘数</p>
            <p>{{temp.enquiriesNum}}</p>
          </div>
        </div>
      </div>
      <div class="myflex qunimade">
        <div class="myflex">
          <div class="w100">
            <p>客单价</p>
            <p>{{temp.perTicketSale}}</p>
          </div>
        </div>
      </div>
      <div class="myflex qunimade">
        <div class="myflex">
          <div class="w100">
            <p>复购订单数</p>
            <p>{{temp.afterPurchaseOrderNum}}</p>
          </div>
        </div>
      </div>
      <div class="myflex qunimade">
        <div class="myflex">
          <div class="w100">
            <p>客单数</p>
            <p>{{temp.guestSingular}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    props: ["list"],
  data () {
    return {
      temp:""  
    }
  },
  methods:{
    change(list){
      console.log(list.PV); 
      this.temp=list;
    }
  }
};
</script>
<style lang="scss" scoped>
.myflex {
  display: flex;
  font-size: 16px;
}
.qunimade {
  flex-direction: column;
}
.fucnk {
  border-bottom: 1px solid #888;
  padding: 10px 0;
  // align-items: center;
}
.Name {
  text-align: center;
}
.w100 {
  position: relative;
  width: 100px;
  padding: 10px 0;
  text-align: center;
  &::after {
    content: "";
    display: inline-block;
    position: absolute;
    height: 80%;
    top: 50%;
    right: 0%;
    transform: translateY(-50%);
    width: 1px;
    background-color: #888;
  }
}
</style>