

import axios from "@/aixos.js"

var api = {
    GetShopList(val) {
        return axios.get("/goods/listGoods", { params: { ...val } })
    },
    SetBanner(val) {
        return axios.post("/banner/saveBanner", { ...val })
    },
    GetAllBanner(val) {
        return axios.get("/banner/listBanner", { params: { ...val } })
    },
    DeleatBanner(val) {
        return axios.get("/banner/deleteBanner", { params: { ...val } })

    },
    GetOne(val) {
        return axios.get("/banner/getBanner", { params: { ...val } })
    },
    UpData(val) {

        return axios.post("/banner/updateBanner", { ...val })
    },
    GetAllHeard(){
        return axios.get("/fontGoods/getCaizhuangList",{params:{category:0}})
    },
    GetAllBottom(){
        return axios.get("/fontGoods/getCaizhuangList",{params:{category:1}})
    },
    GetAllShopList(id){
        return axios.get("/goods/listGoodsByClassOne",{params: {classId:id}});
        
    },
    GetAllClassOne(val){
        return axios.get("/manageClassify/listClassOne",{params:{classsifyType:1}})
    },
    setHeader(val){
        return axios.get("/goods/firstGoodset",{params:{...val}})
    },
    dele(val){
        return axios.get("/goods/delfirstGoodset",{params: { ...val } })
      }
}
export default api;