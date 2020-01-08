import api from "@/api/nav.js"
export default {
    namespaced: true,
    state: {
        h2Title: [   //订单管理标题开始
            
            
            //订单管理标题结束
        ],
        h3Title: [
            {
                name: "询盘管理",
                id: "0-1"
            },
        ],
        listArr: [
            [ //订单管理标题开始
                {
                    name: "询盘管理",
                    id: "0-0"
                },
                {
                    name: "订单管理",
                    id: "0-1",

                }, {
                    name: "用户购物车",
                    id: "0-2",
                }, {
                    name: "用户收藏",
                    id: "0-3",

                }, {
                    name: "邮件信息",
                    id: "0-4",

                }, {
                    name: "导出订单",
                    id: "0-5",

                }, {
                    name: "导出询盘",
                    id: "0-6",

                }
                //订单管理标题结束
            ],
            [//商品管理开始
                {
                    name: "商品列表",
                    id: "1-0",
                    arr: [
                        {
                            name: "上架中商品",
                            id: "1-0-0"
                        }, {
                            name: "已下架",
                            id: "1-0-1"
                        },
                        {
                            name: "回收站",
                            id: "1-0-2"
                        }
                    ]
                }, {
                    name: "推荐商品",
                    id: "1-1"
                }, {
                    name: "展示商品",
                    id: "1-2",
                },
              {
                name: "首页头商品",
                id: "1-3",
              },
              {
                name: "首页底商品",
                id: "1-4",
              },
              {
                name: "商品标签",
                id: "1-5",
              },
              {
                name: "商品属性",
                id: "1-6",
              },
              {
                name: "商品品牌",
                id: "1-7",
              },
                // {
                //     name: "分类管理",
                //     id: "1-3",
                //     arr:[
                //         {
                //             name:"一级分类",
                //             id:"1-3-0"
                //         },{
                //             name:"二级分类",
                //             id:"1-3-1"
                //         }
                //     ]
                // }
            ],//商品管理结束
            [//页面管理
                {
                    name: "首页bannder",
                    id: "2-0",
                }, {
                    name: "分类bannder",
                    id: "2-1"
                }, {
                    name: "一级分类",
                    id: "2-2",
                }, {
                    name: "二级分类",
                    id: "2-3",
                },{
                    name: "三级分类",
                    id: "2-4",
                },{
                    name:"新品详解",
                    id:"2-5"
            },
              {
                name:"语言设置",
                id:"2-6",
                arr:[
                  {
                    name:"顶部设置",
                    id:"2-5-0",
                  },{
                    name:"底部设置",
                    id: "2-5-1"
                  }
                ]
              }
            ],//页面管理结束
            [//统计面板开始
                {
                    name: "统计面板",
                    id: "3-0",
                }, {
                    name: "流量统计",
                    id: "3-1"
                }, {
                    name: "订单统计",
                    id: "3-2",
                }, {
                    name: "商品统计",
                    id: "3-3",
                }, {
                    name: "用户统计",
                    id: "3-4",
                }, {
                    name: "分类统计",
                    id: "3-5",
                }, {
                    name: "搜索统计",
                    id: "3-6",
                }, {
                    name: "来源统计",
                    id: "3-7",
                }, {
                    name: "日报月报",
                    id: "3-8",
                }, {
                    name: "导出数据",
                    id: "3-9",
                }
            ],
            [],
            [
                {
                    name: "上传表格",
                    id: "5-0",
                },
                {
                    name: "其他设置",
                    id: "5-1",
                },
                {
                    name: "博客分类",
                    id: "5-2",
                },
                {
                    name: "博客管理",
                    id: "5-3",
                },
                {
                    name: "首页SEO",
                    id: "5-4",
                },
                {
                    name: "其他SEO",
                    id: "5-5",
                },
                {
                    name: "公告设置",
                    id: "5-6",
                }
            ],
            [
                {
                    name: "订阅配置",
                    id: "6-0",
                },
                {
                    name: "订阅列表",
                    id: "6-1",
                },
                {
                    name: "订阅日志",
                    id: "6-2",
                },
                {
                    name: "退订日志",
                    id: "6-3",
                }
            ],
            [
                {
                    name: "会员列表",
                    id: "7-0",
                },
            ]
        ],//统计面板结束
    },
    getters: {

    },
    mutations: {
        changeH2title(state, id) {//请求后台获取二级标题
            //将拿到的数据放到h2Title
            console.log("我要去请求2级标题", id)
            console.log(state.listArr, "打印了吗");
            state.h2Title = state.listArr[id];


        },
        changeH3title(state, id) {//请求后台三级标题
            //将拿到的数据放到h3Title
            console.log("我要去请求三级标题请告诉我这是什么页面需要分别显示", id.split("-")[1]);
            //如果是带时间选择的需要
            // this.$router.push({path:)}
            // if (id == "1-3") {
            //     state.h3Title = state.listArr[1][3].arr
            //     return
            // }
            if(id=="1-0"){
                state.h3Title = state.listArr[1][0].arr
                return
            }

            state.h3Title = [state.h2Title[id.split("-")[1]]];
        },
        changeMain(state, id) {//请求内容这个地方应该用路由跳转的方式
            //将拿到的数据放到h3Title
            console.log("请求内容区", id);
        }

    },
    actions: {
        // add({ commit }) {
        //     clearInterval(b);
        //     var b = setInterval(() => {
        //         commit("add")
        //     }, 1000);
        // }
    }
}
