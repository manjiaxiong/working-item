
import axios from "@/aixos.js"
var api = {
    async setShop(val) {
        console.log(axios.defaults.baseURL)
        var promise = await new Promise((resolve,reject)=>{
            $.ajax({
                type:'post',
                url:axios.defaults.baseURL + '/goods/saveGoodsMain',
                data:JSON.stringify(val),
                contentType:'application/x-www-form-urlencoded',
                dataType:'json',
                success:function(data){
                    console.log(data)
                    resolve(data)
                },
                error:function(msg){
                    console.log(1234123)
                }
            })
        })
        return promise
    },
    getOneShop(val){
        return axios.get("/goods/listGoodsByClassOne",{ params:{classsifyType:1} })
    },
    setPho(val){

      return axios.post("/goods/saveGoodsImg",{ ...val })
    },
    getOneList(val){
        return axios.get("/manageClassify/listClassOne",{ params:{classsifyType:1,element:val} })
    },
    setShopTwo(val){
        return axios.post("/goods/saveGoodsSeo",{ ...val })
    },
    setShopfourth(val){
        return axios.post("/goods/saveGoodsInfo",{ ...val })
    },
    getList(val){
        return axios.get("/goods/listGoods",{params:{...val}})
    },
    xiajia(val){
        return axios.get("/goods/updateState",{params:{...val}})
    },
    shangjia(val){
        return axios.get("/goods/updateState",{params:{...val}})
    },
    Deleat(val){
        return axios.get("/goods/deleteGoods",{params:{...val}})
    },
    getShopId(val){
        return axios.get("/goods/getGoods",{params:{...val}})
    },
    Fuweben(val){
        return axios.post("/goods/updateGoodsDescribe",{...val})
    },
    SeoUpdata(val){
        return axios.post("/goods/updateGoodsSeo",{...val})
    },
    MainUpData(val){
        //todo 现在有报错
        return axios.post("/goods/updateGoodsMain",{...val})
    },
     changeState(val){
      return axios.post("/goods/updateGoodsCategory",{...val})
    },
    qingkong(val){
        return axios.get("/goods/deleteGoodsReal",{params:{...val}})
    },
    labelList(val){
        return axios.get("goods/tagNameList",{params:{...val}})
    },
    changeTag(val){
        return axios.get("goods/updateTag",{params:{...val}})
    },
    addShopLabel(val){
        return axios.get("goods/addTag",{params:{...val}})
    },
    deleteLabel(val){
        return axios.get("goods/delTag",{params:{...val}})
    },
    labelDetail(val){
        return axios.get("goods/tagGoods",{params:{...val}})
    },
    dissociated(val){
        return axios.get("goods/dissociated",{params:{...val}})
    },
    getTwoShop(val){
        return axios.get('/fontGoods/queryGoodByChildClassify',{params:{...val}})
    },
    addAttribute(val){
        return axios.get('/goods/addAttribute',{params:{...val}})
    },
    attributeList(val){
        return axios.get('/goods/attributeList',{params:{...val}})
    },
    updateAttribute(val){
        return axios.get('/goods/updateAttribute',{params:{...val}})
    },
    delAttribute(val){
        return axios.get('/goods/delAttribute',{params:{...val}})
    },
    attributeGoods(val){
        return axios.get('/goods/attributeGoods',{params:{...val}})
    },
    dissociatedAttribute(val){
        return axios.get('/goods/dissociatedAttribute',{params:{...val}})
    },
    addBrand(val){
        return axios.get('/goods/addBrand',{params:{...val}})
    },
    brandList(val){
        return axios.get('/goods/brandList',{params:{...val}})
    },
    updateBrand(val){
        return axios.get('/goods/updateBrand',{params:{...val}})
    },
    delBrand(val){
        return axios.get('/goods/delBrand',{params:{...val}})
    },
    brandGoods(val){
        return axios.get('/goods/brandGoods',{params:{...val}})
    },
    dissociatedBrand(val){
        return axios.get('/goods/dissociatedBrand',{params:{...val}})
    },
}
export default api;
