import axios from "@/aixos.js"

var api = {
  getAllLang(val) {
    return axios.get("/fontShop/getAllLanguage", { params: { val } })
  },
  addLang(val){
      return axios.get("/fontShop/addConfig",  { params: { ...val } } )
  },
  delet(val){
    return axios.get("/fontShop/delConfig", { params: { ...val } })
}
}
export default api;
