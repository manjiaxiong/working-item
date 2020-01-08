

import axios from "@/aixos.js"

var api = {
    address(val) {
        return axios.get("manageOrder/listEmailMessage", { params: { ...val } })
    },
    delEmailMessage(val) {
        return axios.get("manageOrder/delEmailMessage", { params: { ...val } })
    },
    exportEmailMessageUrl(val) {
        return axios.get("manageOrder/exportEmailMessageUrl", { params: { ...val } })
    },
}
export default api;