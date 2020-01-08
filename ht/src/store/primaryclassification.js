import api from "@/api/one"
export default {
    namespaced: true,
    state: {
        condition: false,
        classifyName: "",//分类名称
        imgPath: "1",//主图路径
        classsifyType: "",//类型
        describe: "",//描述
        status: "",//zt
        parentId: "",//父级id
        number: "",//序号
        oneList: [],//查询到的一级分类
        bianjiState:"" ,//是谁要编辑
        id:"",//当前编辑的id
        classifyDescribe:"",//编辑对象的富文本

    },
    getters: {

    },
    mutations: {
        changeDate(state, val) {
            console.log(val)
            state.condition = val.zt;
            state.classsifyType = val.num;
            // console.log(hh);
            if (val.num == 2) {
                api.getClassOne({
                    parentId: 0,
                    classsifyType: 1
                }).then(res => {
                    console.log(res);
                    res.date
                })
            }
        },
        SetData(state, val) {
            //添加一级标题
            if (state.classsifyType == 1) {
                api.SetClassOne({
                    classsifyType: state.classsifyType,
                    classifyName: state.classifyName,
                    number: state.number,
                    classifyDescribe: val

                }).then(res => {
                    if (res.data.msg == "添加成功") {
                        state.condition = false;
                    }
                })
            } else {
            //添加二级标题
                api.setClassTwo({
                    classsifyType: state.classsifyType,
                    classifyName: state.classifyName,
                    number: state.number,
                    parentId: state.parentId
                }).then(res => {
                    if (res.data.msg == "添加成功") {
                        state.condition = false;
                    }
                })
            }
        },
        changeCondition(state,val){
        //  console.log("修改成功");控制是否显示遮罩层
         state.condition=val;
        },
        // 一级标题数组存放
        SetOneList(state,val){
            state.oneList=val;
        },
        //清空数据
        qingKong(state){
            state.classifyName="";
            state.number="";
        },
        changeClasssifyType(state,val){
            state.classsifyType=val
        },
        huixian(state,val){
            console.log(val);
            state.classifyName=val.classifyName  //名字
            state.id= val.id      //id
            state.imgPath= val.imgPath   //图路径
            state.number= val.number   //序号
            state.classifyDescribe=val.classifyDescribe   //富文本
        },
        huixian2(state,val){
             state.classifyName=val.classifyName;
             state.number=val.number;
             state.id=val.id;
             console.log(state);
        },
        changeBianjiState(state,val){
            console.log("我的田压",val)
            state.bianjiState=val;// 1 是类别1编辑 2 是类别二编辑 
        }
        
    },
    actions: {
        add({ commit }) {
            clearInterval(b);
            var b = setInterval(() => {
                commit("add")
            }, 1000)

        }
    }
}