
import axios from "@/aixos.js"

var api = {
  dl(val) {
    return axios.get("/register/backStageLogin", { params: { ...val } })
  }
}
export default api;
