<template>
  <div class="p100">
    <table border="0"
           cellpadding="0"
           cellspacing="0">
      <tr class="bac247 Myflex">
        <th>商品</th>
        <th>价格</th>
        <th>访问量</th>
        <th>总件数</th>
        <th>成交订单数</th>
        <th>订单金额</th>
      </tr>
      <tr class="juz"
          v-for="item in 10"
          :key="item">
        <td class="img">
          <div> <img src="@/assets/logo.png"
                 alt=""
                 srcset=""></div>
          <div>
            <p>123</p>
            <p>123</p>
          </div>
        </td>
        <td>$499</td>
        <td>5643</td>
        <td>451</td>
        <td>386</td>
        <td>386</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {

};
</script>
<style lang="scss" scoped>
.p100 {
  // padding: 10px 50px;
  display: flex;
  justify-content: center;
}
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 50px;
  }
}
.Myflex {
  text-align: center;
  height: 50px;
}
.bac247 {
  background-color: rgb(247, 247, 247);
}
table {
  width: 90%;
  font-size: 16px;
}
.juz {
  text-align: center;
  td {
    padding: 10px 0;
  }
}
</style>