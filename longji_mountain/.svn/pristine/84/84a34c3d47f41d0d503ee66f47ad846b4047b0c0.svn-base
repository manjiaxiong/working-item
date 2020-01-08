// pages/refer/index.js
//开头就请求数据
var t = getApp(), e = t.requirejs("core");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		indexdata: {},
		Twodata: {},
		Threedata: {},
		Foredata: {},
		indexPage:1,//初始加载第一页
		TwoPage:1,
		ThreePage:1,
		ForePage:1,
		activeIndex: '啦啦啦', //点击的音乐坐标
		control:'',//音乐管理器
		musicSrc: '', //音乐地址
		musicTitle: '暂无口播', //音乐名称
		currentTime: '00:00', //音乐当前时间
		allTime: '00:00', //音乐总时间
		isPlaying: false, //播放状态
		isOpen:false,//控制侧边音乐
		marqueePace: 1,//滚动速度
		    marqueeDistance: 0,//初始滚动距离
		    marquee_margin: 30,
		    size:14,
		    interval: 20 ,// 时间间隔
		action: {
			method: 'pause'
		},
		navbarActiveIndex: 0, //顶部默认选中下标
		navbarTitle: [ //顶部导航
			"推荐",
			"钜桥风采",
			"便民服务",
			"公告动态"
		],

		indexSwiper: ["http://app.uhuoduo.com/attachment/app/img6.png", 'http://app.uhuoduo.com/attachment/app/img6.png',
			'http://app.uhuoduo.com/attachment/app/img6.png'
		], //轮播图片地址
		current: 0, //改变轮播图底部小点
		fencaiTitle: ["重要活动", "重要会议", "重要讲话", "重要文章"], //分享二级导航
		fencaiActiveIndex: 0, //分享二级导航顶部默认选中下标
		//服务部分
		selected: [false, false, false], // 这里表示列表项是否展开，默认初始时此数组的元素全为fasle，表示都没展开
		active: null, // 当前展开的项的index值
		isend1:true,
    isend2: true,
    isend3: true
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		//加载数据(推荐)
		var _this = this
		e.get('article',{
			page:1,
			psize:5
		},function(res) {

			_this.setData({
				indexdata: res
			})
			// console.log(_this.data.indexdata)
		})
			//加载风采数据
			e.get('article/get_list',{
				page:1,
				psize:5
			},
				function(res) {
					_this.setData({
						Twodata: res
					})
					// console.log(_this.data.indexdata)
				})
			//加载服务数据
			e.get('article/get_bian',{
				page:1,
				psize:5
			},
				function(res) {
					_this.setData({
						Threedata: res
					})
					// console.log(_this.data.indexdata)
				})
			//加载公告数据
			e.get('article/get_notice',{
				page:1,
				psize:5
			},
				function(res) {
					_this.setData({
						Foredata: res
					})
				})
				
				

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		//处理音乐
		this.audioCtx = wx.createAudioContext('myAudio')
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {
	this.setData({
		isPlaying: false,
		action: {
			method: 'pause'
		}
	})
	},
	

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {//下拉刷新数据
	var _this=this;
		if(this.data.navbarActiveIndex==0){
			if (this.data.indexdata.pagesize * this.data.indexPage < this.data.indexdata.total) {
				wx.showNavigationBarLoading()//加载提醒
				var indexPage=this.data.indexPage+1
				// console.log(caterPage)
				e.get('article',{
					page:indexPage,
					psize:5,
				},
					function(res) {
						// console.log(2)
						var newList=_this.data.indexdata
						
						newList.list=newList.list.concat(res.list)
						
						// console.log(newList.list)
						_this.setData({
							indexdata: newList,
							indexPage:indexPage
						})
						wx.hideNavigationBarLoading()//取消加载提示
						// console.log(3)
					})
			} else {

        if (this.data.isend3) {
          wx.showToast({
            title: '已经到底啦',
            icon: 'none'
          })
          this.setData({ isend3: false });
        }
        return;
			}
		}else if(this.data.navbarActiveIndex==1){
			if (this.data.Twodata.pagesize * this.data.TwoPage < this.data.Twodata.total) {
				wx.showNavigationBarLoading()//加载提醒
				var TwoPage=this.data.TwoPage+1
				// console.log(caterPage)
				e.get('article/get_list',{
					page:TwoPage,
					psize:5,
				},
					function(res) {
						// console.log(2)
						var newList=_this.data.Twodata
						
						newList.list=newList.list.concat(res.list)
						
						// console.log(newList.list)
						_this.setData({
							Twodata: newList,
							TwoPage:TwoPage
						})
						wx.hideNavigationBarLoading()//取消加载提示
						// console.log(3)
					})
			} else {
        if (this.data.isend2) {
          wx.showToast({
            title: '已经到底啦',
            icon: 'none'
          })
          this.setData({ isend2: false });
        }
        return;
			}
		}else if(this.data.navbarActiveIndex==3){
			if (this.data.Foredata.pagesize * this.data.ForePage < this.data.Foredata.total) {
				wx.showNavigationBarLoading()//加载提醒
				var ForePage=this.data.ForePage+1
				// console.log(caterPage)
				e.get('article/get_notice',{
					page:ForePage,
					psize:5,
				},
					function(res) {
						// console.log(2)
						var newList=_this.data.Foredata
						
						newList.list=newList.list.concat(res.list)
						
						// console.log(newList.list)
						_this.setData({
							Foredata: newList,
							ForePage:ForePage
						})
						wx.hideNavigationBarLoading()//取消加载提示
						// console.log(3)
					})
			} else {
        if(this.data.isend1){
          wx.showToast({
            title: '已经到底啦',
            icon:'none'
          })
          this.setData({isend1:false});
        }				
				return;
			}
		}
	},
	lazload:function(options){//下拉刷新共通
		
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},
	//轮播样式
	swiperChange: function(event) {
		// console.log()
		this.setData({
			current: event.detail.current
		})
		// console.log(this.data.current)
	},
	//处理音乐播放
	tapMusic: function(event) {
		//改变标题
		var musicTitle=event.currentTarget.dataset.title
		
		//改变图片状态
		var index = event.currentTarget.dataset.index
		
		//改变音乐信息
		var musicSrc = event.currentTarget.dataset.imusic
		console.log(this.data.musicSrc)
		if (this.data.isPlaying) { //播放中
			console.log('暂停')
			this.setData({
				activeIndex: 'lalal',
				isPlaying: false,
				musicSrc: musicSrc,
				musicTitle:musicTitle,
				action: {
					method: 'pause'
				}
			})
		
		} else { //暂停中设置data
		
			this.setData({
				activeIndex: index,
				isPlaying: true,
				musicSrc: musicSrc,
				musicTitle:musicTitle,
				control:index,
				action: {
					method: 'play',
				}
			})
			console.log('index',index)
			console.log('activeIndex',this.data.activeIndex)
		}
	},
	//音乐进度事件
	funtimeupdate: function(u) {
		var _this = this
		if (_this.contTime(u.detail.currentTime) == _this.contTime(u.detail.duration)) { //播放完毕换图片样式跟播放状态
			this.setData({
				isPlaying: false,
				activeIndex: '啦啦啦'
			})
		}
		this.setData({//时刻改变播放时间
			currentTime: _this.contTime(Math.round(u.detail.currentTime)),
			allTime: _this.contTime(Math.round(u.detail.duration))
		})

	},
	//时间格式转化器
	tostr: function(num) {
		return num < 10 ? "0" + num : "" + num;
	},
	contTime: function(allMinSec) {
		var iMinu = parseInt(allMinSec / 60); //分钟
		var isec = parseInt(allMinSec % 60); //秒数
		return this.tostr(iMinu) + ':' + this.tostr(isec)
	},
	changeAudioCon:function(){//改变侧边控制器状态
		this.setData({
			isOpen:!this.data.isOpen
		})
	},
	onNavBarTap: function(event) {
		var _this=this
		this.setData({//每次切换都会把音乐归0
			isPlaying: false,
			activeIndex: '啦啦啦',
			action: {
				method: 'pause'
			}
		})
		// 获取点击的navbar的index
		let navbarTapIndex = event.currentTarget.dataset.navbarIndex
		
		// 设置data属性中的navbarActiveIndex为当前点击的navbar
		this.setData({
			navbarActiveIndex: navbarTapIndex
		})
	},
	onFenBarTap: function(event) {
		this.setData({//每次切换都会把音乐归0
			isPlaying: false,
			activeIndex: '啦啦啦',
			action: {
				method: 'pause'
			}
		})
		var _this = this
		//获取id为了更新数据
		var id = event.currentTarget.dataset.id

		// 获取点击的navbar的index
		let fencaiActiveIndex = event.currentTarget.dataset.navbarIndex
		// 设置data属性中的navbarActiveIndex为当前点击的navbar
		this.setData({
			fencaiActiveIndex: fencaiActiveIndex
		})
		//加载风采数据
				e.get('article/get_list',
					{
						page:1,
						psize:5,
						cateid:id
					},
					function(res) {
						_this.setData({
							Twodata: res
						})
						// console.log(_this.data.indexdata)
					})
					
		

	},
	//服务列表逻辑
	show(e) {
		let index = e.currentTarget.dataset.index;
		let active = this.data.active;
		//改变收起放下的图片状态
		this.setData({
			[`Threedata.list[${index}].serverActiv`]: !this.data.Threedata.list[`${index}`].serverActiv,
			[`selected[${index}]`]: !this.data.selected[`${index}`],
			active: index
		})

		// 如果点击的不是当前展开的项，则关闭当前展开的项
		// 这里就实现了点击一项，隐藏另一项
		if (active !== null && active !== index) {
			this.setData({
				[`selected[${active}]`]: false
			});
		}
	},
	
})
