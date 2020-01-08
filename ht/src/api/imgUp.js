
import axios from "@/aixos.js"

var api = {
    getToken(val) {
        return axios.get("img/getToken", { params: { ...val } })
    }
}
export default api;