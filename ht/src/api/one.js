import axios from "@/aixos.js"

var api = {
    SetClassOne(val) {//设置分类
        return axios.post("/manageClassify/addFistClassify", {  ...val })
    },
    getClassOne(val) {
        return axios.get("/manageClassify/querySecClassify", {
            params: { ...val }
        })
    },
    setClassTwo(val) {
        return axios.post("/manageClassify/addFistClassify", {  ...val  })
    },
    changeState(val) {
        return axios.get("/manageClassify/updateStatus", {  params:{...val} })
    },
    DeleatClass(val) {
        return axios.get("/manageClassify/deleteClassify", { params:{...val}  } )
    },
    setNum(val) {
        return axios.get("/manageClassify/updateStatus", { params:{...val}  })
    },
    xiugai(val){
        return axios.post("/manageClassify/updateClassify", { ...val  })

    },
    getfenLeiShop(val){
        return axios.get("/goods/listGoodsByClassOne", { params:{...val}  })
     
    },
    getListClassOne(val){
        return axios.get("/manageClassify/listClassOne", { params:{...val}  })

    },
    getListClassTwo(val){
        return axios.get("/manageClassify/listClassTwo", { params:{...val}  })
    },
    getListClassThird(val){
        return axios.get("/manageClassify/listClassThree", { params:{...val}  })
    },
    getTwoClass(val){
        return axios.get("/manageClassify/listClassTwo", { params:{...val}  })
    },
    getLanguages(val){
        return axios.get("/fontShop/getAllLanguage", { params:{...val}  })
    },
    delListoneDetail(val){
        return axios.get("/manageClassify/deleteClassifys", { params:{...val}  })
    },
    addAboutUs(val){
        return axios.post("aboutUs/addAboutUs", { ...val  })
    },
    showAboutUs(val){
        return axios.get("aboutUs/showAboutUsBack", { params:{...val}  })
    },
    addPrivacyPolicy(val){
        return axios.post("aboutUs/addPrivacyPolicy", { ...val  })
    },
    showPrivacyPolicy(val){
        return axios.get("aboutUs/showPrivacyPolicyBack", { params:{...val}  })
    },
    addBottomMenuContentById(val){
        return axios.post("aboutUs/addBottomMenuContentById", { ...val  })
    },
    showBottomMenuContentById(val){
        return axios.get("aboutUs/showBottomMenuContentById", { params:{...val}  })
    },
}
export default api;