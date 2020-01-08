

//框架自带轮播
/*

<div class='fui-swipe' data-transition="500" data-gap="1">
            <div class='fui-swipe-wrapper'>
                {loop $advs $adv}
                <a class='fui-swipe-item' href="{if !empty($adv['link'])}{$adv['link']}{else}javascript:;{/if}"  data-nocache="true"><img src="{php echo tomedia($adv['thumb'])}" /></a>
                {/loop}
            </div>
            <div class='fui-swipe-page'></div>
        </div>
*/
//返回上一页并刷新onclick="self.location=document.referrer;"
//顶部滑动导航
 $(function () {
        var swiper = new Swiper('.swiper-container', {
            spaceBetween: 20,
            slidesPerView:'auto',
            freeMode: true,
            slidesPerView:4,

        });
    })
//长安事件
$("#target").on({  
        touchstart: function(e) { 
            // 长按事件触发  
            timeOutEvent = setTimeout(function() {  
                timeOutEvent = 0;  
                alert('你长按了');  
            }, 400);  
            //长按400毫秒   
            // e.preventDefault();    
        },  
        touchmove: function() {  
            clearTimeout(timeOutEvent);  
            timeOutEvent = 0;  
        },  
        touchend: function() {  
            clearTimeout(timeOutEvent);  
            if (timeOutEvent != 0) {  
                // 点击事件  
                // location.href = '/a/live-rooms.html';  
                alert('你点击了');  
            }  
            return false;  
        }  
}
//公告轮播
      $(function(){
      var num = $(".ulnav").find("li").length; 
      if (num > 1) {
          setInterval(function(){ 
            $('.ulnav').animate({
              marginTop:"-30px"
            },800,function(){
              $(this).css({marginTop : "0"}).find("li:first").appendTo(this);
            });
        }, 4500);
      }  
    });
//a标签
$('.back-a').click(function(ev) {
    // console.log(1)
    ev.stopPropagation()
    window.location.href = $(this).attr('data-href')
})
//图片选项卡
function zhiBar(iDom,isrc,dsrc){
    iDom.each(function(){
      $(this).click(function(ev){
        ev.stopPropagation()
        iDom.attr('src',dsrc)
        $(this).attr('src',isrc)
      })
    })
  }
//答题（相同题目设置同一个属性）
 var val=$(this).attr("val");     //题目答案
          var ids=$(this).attr("ids");   //题目编号
          $("li[ids="+ids+"]").removeClass("item-content-navs-active");
          $(this).addClass("item-content-navs-active");
          $("#QuestionA"+ids).val(val);
//点击拨打电话
function hujiao(argument) {
            // alert(111111);
            FoxUI.confirm(argument, function() {
                window.location.href="tel:"+argument;
            });
        }
  //顶部滑动导航
  // console.log($('.it1'))
  var mySwiper = new Swiper('.swiper-container', {
      autoplay: false,//可选选项，自动滑动
      freeMode:true,//滑动不够一格，不会自动贴合
      slidesPerView:4,//设置slider容器能够同时显示的slides数量
  })
//获取表单数据
$.fn.serializeObject = function () {
var ct = this.serializeArray();
var obj = {};
    $.each(ct, function () {
        if (obj[this.name] !== undefined) {
            if (!obj[this.name].push) {
                obj[this.name] = [obj[this.name]];
            }
            obj[this.name].push(this.value || "");
        } else {
            obj[this.name] = this.value || "";
        }
    });
    return obj;
};
//选项卡封装
function TabControl (iTems,iClass){
		$.each(iTems,function(index,value){
			for(let i=0;i<iTems.length;i++){
				iTems[i].onclick=function(ev){
					console.log(1)
					ev.stopPropagation()
					for(var j=0;j<iTems.length;j++){
						$(iTems[j]).removeClass(iClass)
					}
					$(this).addClass(iClass)
				}
			}
		})
	}
//验证码倒计时封装
var isRequest=false;
	function request(){
		if(isRequest){
			oRequire.onclick=false;
		}
		var preDate=Date.now();
		var endDate=preDate+60000;
		// console.log(preDate)
		// console.log(endDate)
		oRequire.onclick=null;
		function contTime(){

			var allMinSec=(endDate -Date.now())/1000;
			if(allMinSec<=0){
				allMinSec=0;
			}
			var isec=parseInt(allMinSec%3600%60);

			oRequire.innerHTML=isec+"S";
			if(isec==0){
				clearTimeout(timer)
				oRequire.innerHTML="重新获取";
				oRequire.onclick=request
			}
			// console.log(1)
		}
		
		timer=setInterval(contTime,1000);
	}
	oRequire.onclick=request;

		});
//限制字数
 function LimitNumber(iDom) {
        var str = iDom.html();
        str = str.substr(0,20) + '...' ;
        // var id=document.getElementById(idName);
        // id.innerText=str;
        iDom.html(str)
    }
//变大变小


setInterval(function(){
              $('.we').animate({
            width:'400px',
            height:'100px'
        },1000,function(){
                 $('.we').animate({
            width:'300px',
            height:'60px'
        })
        })
  },1000)
//轮播图
<link rel="stylesheet" href="https://unpkg.com/swiper/css/swiper.css">
<script src="https://unpkg.com/swiper/js/swiper.js"> </script> 
var mySwiper = new Swiper('.swiper-container', {
           // 滚动方向 horizontal/vertical
            direction: 'horizontal',
            // 自动播放
            autoplay: true,
            delay:1000,
            // 是否循环播放
            loop: true,
            // 如果需要分页器（小圆点）
            // 是否需要分页器

            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',
            },

            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            // 如果需要滚动条
            scrollbar: {
              el: '.swiper-scrollbar',
            },
            })
$('.swiper-slide').mouseenter(function () {//放入鼠标停止
   mySwiper.autoplay.stop();
})
$('.swiper-slide').mouseleave(function () {////放入鼠标开始
   mySwiper.autoplay.start();
})
/*日历*/
	设置头时间
	$('.oMonth').html(d1.getMonth()+1+'月');
	$('.oDay').html(d1.getDate()+'日');
	$('.oYear').html(d1.getFullYear()+'年');

	(function(){
  /*
   * 用于记录日期，显示的时候，根据dateObj中的日期的年月显示
   */
  var dateObj = (function(){
    var _date = new Date();    // 默认为当前系统时间
    return {
      getDate : function(){
        return _date;
      },
      setDate : function(date) {
        _date = date;
      }
    };
  })();
 
  // 设置calendar div中的html部分
  renderHtml();
  // 表格中显示日期
  showCalendarData();
  // 绑定事件
  bindEvent();
 
 //日历加入下面的小圆圈
 var oSpan1=$(`<span class="td-span td-r"> 1</span>`)
 var oSpan2=$(`<span class="td-span td-y"> 2</span>`)
 var oSpan3=$(`<span class="td-span td-r"> 3</span>`)
 var oSpan4=$(`<span class="td-span td-y"> 4</span>`)
 oSpan1.appendTo($('.currentDay'))
 oSpan2.appendTo($('td').eq(20))
 oSpan3.appendTo($('td').eq(9))
 oSpan4.appendTo($('td').eq(12))
  /**
   * 渲染html结构
   */
  function renderHtml() {
    var calendar = document.getElementById("calender-bottom");
    var titleBox = document.createElement("div");  // 标题盒子 设置上一月 下一月 标题
    var bodyBox = document.createElement("div");  // 表格区 显示数据
 
    // 设置标题盒子中的html
    titleBox.className = 'calendar-title-box';
    titleBox.innerHTML = "<span class='prev-month' id='prevMonth'></span>" +
      "<span class='calendar-title' id='calendarTitle'></span>" +
      "<span id='nextMonth' class='next-month'></span>";
    calendar.appendChild(titleBox);    // 添加到calendar div中
 
    // 设置表格区的html结构
    bodyBox.className = 'calendar-body-box';
    var _headHtml = "<tr>" + 
              "<th>日</th>" +
              "<th>一</th>" +
              "<th>二</th>" +
              "<th>三</th>" +
              "<th>四</th>" +
              "<th>五</th>" +
              "<th>六</th>" +
            "</tr>";
    var _bodyHtml = "";
 
    // 一个月最多31天，所以一个月最多占6行表格
    for(var i = 0; i < 5; i++) {  
      _bodyHtml += "<tr>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
              "<td></td>" +
            "</tr>";
    }
    bodyBox.innerHTML = "<table id='calendarTable' class='calendar-table'>" +
              _headHtml + _bodyHtml +
              "</table>";
    // 添加到calendar div中
    calendar.appendChild(bodyBox);
  }
 
  /**
   * 表格中显示数据，并设置类名
   */
  function showCalendarData() {
    var _year = dateObj.getDate().getFullYear();
    var _month = dateObj.getDate().getMonth() + 1;
    var _dateStr = getDateStr(dateObj.getDate());
 
    // 设置顶部标题栏中的 年、月信息
    var calendarTitle = document.getElementById("calendarTitle");
    var titleStr = _dateStr.substr(0, 4) + "年" + _dateStr.substr(4,2) + "月";
    calendarTitle.innerText = titleStr;
 
    // 设置表格中的日期数据
    var _table = document.getElementById("calendarTable");
    var _tds = _table.getElementsByTagName("td");
    var _firstDay = new Date(_year, _month - 1, 1);  // 当前月第一天
    for(var i = 0; i < _tds.length; i++) {
      var _thisDay = new Date(_year, _month - 1, i + 1 - _firstDay.getDay());
      var _thisDayStr = getDateStr(_thisDay);
      _tds[i].innerText = _thisDay.getDate();
      //_tds[i].data = _thisDayStr;
      _tds[i].setAttribute('data', _thisDayStr);
      if(_thisDayStr == getDateStr(new Date())) {    // 当前天
        _tds[i].className = 'currentDay';
      }else if(_thisDayStr.substr(0, 6) == getDateStr(_firstDay).substr(0, 6)) {
        _tds[i].className = 'currentMonth';  // 当前月
      }else {    // 其他月
        _tds[i].className = 'otherMonth';
      }
    }
  }
 
	  /**
	   * 绑定上个月下个月事件
	   */
	  function bindEvent() {
	    var prevMonth = document.getElementById("prevMonth");
	    var nextMonth = document.getElementById("nextMonth");
	    addEvent(prevMonth, 'click', toPrevMonth);
	    addEvent(nextMonth, 'click', toNextMonth);
	    var table = document.getElementById("calendarTable");
		// var tds = table.getElementsByTagName('td');
		// for(var i = 0; i < tds.length; i++) {
		//   addEvent(tds[i], 'click', function(e){
		//     console.log(e.target.getAttribute('data'));
		//   });
		// }
	  }
	 
	  /**
	   * 绑定事件
	   */
	  function addEvent(dom, eType, func) {
	    if(dom.addEventListener) {  // DOM 2.0
	      dom.addEventListener(eType, function(e){
	        func(e);
	      });
	    } else if(dom.attachEvent){  // IE5+
	      dom.attachEvent('on' + eType, function(e){
	        func(e);
	      });
	    } else {  // DOM 0
	      dom['on' + eType] = function(e) {
	        func(e);
	      }
	    }
	  }
	 
	  /**
	   * 点击上个月图标触发
	   */
	  function toPrevMonth() {
	    var date = dateObj.getDate();
	    dateObj.setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
	    showCalendarData();
	  }
	 
	  /**
	   * 点击下个月图标触发
	   */
	  function toNextMonth() {
	    var date = dateObj.getDate();
	    dateObj.setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
	    showCalendarData();
	  }
	 
	  /**
	   * 日期转化为字符串， 4位年+2位月+2位日
	   */
	  function getDateStr(date) {
	    var _year = date.getFullYear();
	    var _month = date.getMonth() + 1;    // 月从0开始计数
	    var _d = date.getDate();
	     
	    _month = (_month > 9) ? ("" + _month) : ("0" + _month);
	    _d = (_d > 9) ? ("" + _d) : ("0" + _d);
	    return _year + _month + _d;
	  }
	})();
