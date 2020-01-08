
import axios from "@/aixos.js"

var api = {
  all(val) {
    return axios.get("/goods/listGoods", { params: { ...val } })
  },
  set(val){
    return axios.get("/goods/newGoodset",{params: { ...val } })
  },
  get(val){
    
    return axios.get("/newGoods/findNewGood",{params: { ...val } })
  },
  dele(val){
    return axios.get("/goods/delnewGoodset",{params: { ...val } })
  },
  blogList(val){
    return axios.get("/aboutUs/blogsList",{params: { ...val } })
  },
  addBlogs(val){
    return axios.post("/aboutUs/addBlogs",{ ...val })
  },
  delBlogs(val){
    return axios.get("/aboutUs/delBlogs",{params: { ...val } })
  },
  xlsList(val){
    return axios.get("/aboutUs/xlsList",{params: { ...val } })
  },
  delXls(val){
    return axios.get("/aboutUs/delXls",{params: { ...val } })
  },
  addBlogsClass(val){
    return axios.get("/aboutUs/addBlogsClass",{params: { ...val } })
  },
  blogsClasses(val){
    return axios.get("/aboutUs/blogsClasses",{params: { ...val } })
  },
  delBlogsClass(val){
    return axios.get("/aboutUs/delBlogsClass",{params: { ...val } })
  },
  updateBlogsClass(val){
    return axios.get("/aboutUs/updateBlogsClass",{params: { ...val } })
  },
  updateBlogs(val){
    return axios.get("/aboutUs/updateBlogs",{params: { ...val } })
  },
  updateSeo(val){
    return axios.get("/manageGood/updateSeo",{params: { ...val } })
  },
  findSeo(val){
    return axios.get("/manageGood/findSeo",{params: { ...val } })
  },
  addNotice(val){
    return axios.get("/aboutUs/addNotice",{params: { ...val } })
  },
  notice(val){
    return axios.get("/aboutUs/notice",{params: { ...val } })
  },
  memberList(val){
    return axios.get("manageMember/memberList",{params: { ...val } })
  },
  getUser(val){
    return axios.get("fontRegister/getUser",{params: { ...val } })
  },
  User(val) {
      return axios.get("/manageOrder/listCart", { params: { ...val } })
  },
  listCollection(val){
      return axios.get("/manageOrder/listCollection", { params: { ...val } })
  },
}
export default api;
