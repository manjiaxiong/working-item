
import axios from "@/aixos.js"

var api = {
  findOrderAllLike(val) {
    return axios.get("/manageOrder/findOrderAllLike", { params: { ...val } })
  },
  findOrderSreceived(val){
    return axios.get("/manageStatis/listOrderByDate", { params: { ...val } })
  },
  handleOrder(ordernumber){
    return axios.get("manageOrder/updateHandler", { params: { ordernumber } })
  },
  deleteOrder(ordernumber){
    return axios.get("manageOrder/deleteOrderById", { params: { ordernumber } })
  },
  findOrder(val){
    return axios.get("manageOrder/findOrderAllLike", { params: { ...val } })
  },
  orderDetail(ordernumber){
    return axios.get("manageOrder/orderDetails", { params: { ordernumber } })
  },
  exportOrder(val){
    return axios.get("manageOrder/exportOrdersUrl", { params: { ...val } })
  },
  shopTrend(val){
    return axios.get("/manageStatis/goodsStatisticsCharts", { params: { ...val } })
  },
  ipAndTime(val){
    return axios.get("/register/administratorInformation", { params: { ...val } })
  },
  subscriptionList(val){
    return axios.get("/sendMail/subscriptionList", { params: { ...val } })
  },
  excelSubscriptionUrl(val){
    return axios.post("/sendMail/excelSubscriptionUrl", {  ...val })
  },
  subscriptionLog(val){
    return axios.get("/sendMail/subscriptionLog", { params: { ...val } })
  },
  subscriptionLogState(val){
    return axios.get("/sendMail/subscriptionLogState", { params: { ...val } })
  },
  excelsubscriptionLogUrl(val){
    return axios.post("/sendMail/excelsubscriptionLogUrl", {  ...val })
  },
}
export default api;
