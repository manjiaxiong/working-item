

import axios from "@/aixos.js"

var api = {
    User(val) {
        return axios.get("/manageOrder/listCart", { params: { ...val } })
    },
    getAll(val){
        return axios.get("/manageStatis/usersStatistics", { params: { ...val } })
    },
    exportData(val){
        return axios.get("/manageStatis/exportProductsUrl", { params: { ...val } })
    },
    listCollection(val){
        return axios.get("/manageOrder/listCollection", { params: { ...val } })
    },
    subscriptionNames(val){
        return axios.get("/sendMail/subscriptionNames", { params: { ...val } })
    },
    addSubscriptionNames(val){
        return axios.get("/sendMail/addSubscriptionNames", { params: { ...val } })
    },
    updateSubscriptionNames(val){
        return axios.get("/sendMail/updateSubscriptionNames", { params: { ...val } })
    },
    delSubscriptionNames(val){
        return axios.get("/sendMail/delSubscriptionNames", { params: { ...val } })
    }
}
export default api;