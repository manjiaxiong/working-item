Component({

  /**
   * 页面的初始数据
   */
  data: {
			 //服务部分
			 selected:[false, false, false],// 这里表示列表项是否展开，默认初始时此数组的元素全为fasle，表示都没展开
			 active: null,// 当前展开的项的index值
			 examTime:[//服务人员数据
				 {
				 src:'/static/images/img/tx4.png',
				 name:'李嬷嬷',
				 time:'2019-11-23',
				 levle:'龙脊山人文小镇负责人',
				 adress:'鹤壁市钜桥镇乡镇府2楼人口与计划部',
				 phone:'15333999612',
				 serverActiv:true//用于改变收起放下时的图标
					},
					{
					src:'/static/images/img/tx4.png',
					name:'李嬷嬷',
					time:'2019-11-23',
					levle:'龙脊山人文小镇负责人',
					adress:'鹤壁市钜桥镇乡镇府2楼人口与计划部',
					phone:'15333999612',
					serverActiv:true
						},
			 ]
			 
  },
  methods:{
	  //服务列表逻辑
	  show(e) {
	      let index = e.currentTarget.dataset.index;
	      let active = this.data.active;
	  	  //改变
	      this.setData({
	  		  [`examTime[${index}].serverActiv`]:!this.data.examTime[`${index}`].serverActiv
	  	  })
	  	  console.log("this.data.examTime[`${index}`].serverActiv",this.data.examTime[`${index}`].serverActiv)
	      this.setData({
	        [`selected[${index}]`]: !this.data.selected[`${index}`],
	        active: index
	      });
	   
	      // 如果点击的不是当前展开的项，则关闭当前展开的项
	      // 这里就实现了点击一项，隐藏另一项
	      if (active !== null && active !== index) {
	        this.setData({ [`selected[${active}]`]: false });
	      }
	  }
  }
  
})