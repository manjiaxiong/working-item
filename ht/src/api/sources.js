
import axios from "@/aixos.js"

var api = {
    User(val) {
        return axios.get("/manageStatis/sourcesStatistics", { params: { ...val } })
    },
}
export default api;