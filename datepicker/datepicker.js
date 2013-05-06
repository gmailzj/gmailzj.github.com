/*
dateObj.getDate()  
1---31

dateObj.getDay()
0 星期天 
1 星期一 
2 星期二 
3 星期三 
4 星期四 
5 星期五 
6 星期六 

getMonth 方法返回一个处于 0 到 11 之间的整数
*/
/*
var tgString="甲乙丙丁戊己庚辛壬癸";
var dzString="子丑寅卯辰巳午未申酉戌亥";
var numString="一二三四五六七八九十";
var monString="正二三四五六七八九十冬腊";
var weekString="日一二三四五六";
var sx="鼠牛虎兔龙蛇马羊猴鸡狗猪";
*/
var $$ = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
};

var Class = {
  create: function() {
    return function() {
      this.initialize.apply(this, arguments);
    }
  }
}

var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
}

var Bind = function(object, fun) {
	return function() {
		return fun.apply(object, arguments);
	}
}

var Each = function(list, fun){
	for (var i = 0, len = list.length; i < len; i++) { fun(list[i], i); }
};


var Calendar =  Class.create();
Calendar.prototype={
	initialize:function(){
		var args = arguments;	
		this.setOptions();
		this.init();
		var id1 = args[0];
		var _this =this;
		for(var i=0,len=args.length; i<len; i++){
			var id1 = args[i];
			$("#"+id1).parents(".FlightSPosBd").bind("click", {fr_input_id: id1 }, function(b) {
						//$("#calendar")
						var id = b.data.fr_input_id;
						var tmp_status = $("#calendar").data('curr_id');  
						if(tmp_status != id){
							$("#calendar").hide();
						}

						_this.show(b);						
						$("#calendar").data('curr_id',id);             
						var d = _this.loc(this);
						d.y += parseInt($(this).css("height"));
						$("#calendar").css({
							top: d.y + "px",
							left: d.x + "px"
						}).toggle();
						b.stopPropagation();
						
			});
		}
		// 绑定年、月选择
		$("#calendar_sel_year").bind('change',function(){
			var y = parseInt(this.options[this.selectedIndex].value,10);
			var m = parseInt($("#calendar_sel_month").val(),10)-1;
			console.log(y,m);
			var d = _this.today.getDate();
			_this.draw({y:y,m:m,d:d});
		});

		$("#calendar_sel_month").bind('change',function(){
			var y = parseInt($("#calendar_sel_year").val(),10);
			var m = parseInt(this.options[this.selectedIndex].value,10)-1;
			console.log(y,m);
			_this.draw({y:y,m:m,d:1});
		});
		$(document).click(function(){
        	$("#calendar").hide();
        	return false;
    	});
	},
	setOptions:function(options){
		this.options = {
			monthDays:[31,28,31,30,31,30,31,31,30,31,30,31],
			festivals:{'1-1':'元旦','3-8':'妇女','5-1':'劳动','5-4':'青年','6-1':'儿童','8-1':'建军','10-1':'国庆','11-11':'光棍'}
		};
		Extend(this.options, options || {});

	},
	Obj_date: new Date(),
	today: new Date(),
	init:function(){
		//设置年月下拉 默认从1900 到2015 ，
		var tmp_str ='<select id="calendar_sel_year">';
		var tmp_arr = [];
		for (var i = 2015; i >= 1900; i--) {
			tmp_arr.push('<option value="'+i+'">'+i+'</option>');
		};
		tmp_str+=tmp_arr.join('')+'</select>';

		var tmp_str2 ='<select id="calendar_sel_month">';
		tmp_arr = [];
		for (var i = 1; i <= 12; i++) {
			i = this.add0(i);
			tmp_arr.push('<option value="'+i+'">'+i+'</option>');
		};
		tmp_str2+=tmp_arr.join('')+'</select>';
		var str='<div id="calendar" class="calendar" style="display:none;z-index:990;right:200px;top:50px;"><div class="calendar_nr"><div class="calendar_title"><div class="month"><div class="tip_y_m_curr">'+tmp_str+' 年 '+tmp_str2+'月 </div></div></div><div class="calendar_content"><div class="month_content paddingRight"><div class="week"><span class="orange">日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span class="orange">六</span></div><table cellpadding="0" cellspacing="0" border="0"></table></div></div></div></div>';
		$("body").append(str);
		tmp_arr = null;
		tmp_str2 = null;
		tmp_arr = null;
		i= null;

		$("#calendar").click(function(){$("#calendar").show();return false;});
	},
	is_weekend:	function(y,m,d){
		this.Obj_date.setFullYear(y,m,d);
		console.log(y,m,d);
		var n = this.Obj_date.getDay();
		console.log(n);
		if(n==0 || n==6) return true;
		return false;
	},
	is_today:function(y,m,d){
		var y1 = this.today.getFullYear();
		var m1 = this.today.getMonth();
		var d1 = this.today.getDate();
		if(y1 == y && m1 ==m && d1 ==d) return true;
		return false;
	},
	get_festive:function(m, d){
		var str = (m+1)+'-'+d;
		console.log(str);
		if(str in this.options.festivals){
			return this.options.festivals[str];
		} else {
			return d;
		}
	},
	get_show_days:function(year,month,date){		
		var arr=[];
		var total_riqi=0;//显示的总日期数(包括空日期)
		//2013年4月有多少天
		//调整
		var Obj_date = this.Obj_date;
		Obj_date.setFullYear(year,month,1);	
		year = Obj_date.getFullYear();
		month = Obj_date.getMonth();
		var f_weekday=Obj_date.getDay();//本月第一天是周几	
		var monthDays = this.options.monthDays;	
		var l_monthday=monthDays[month];	
		
		//闰年2月加1天
		if(((year%4==0&&year%100!=0)||year%400==0)&&month==1){
	        l_monthday++;
	    }
		//每月第1天之前的空格
		for(i=1;i<=f_weekday%7;i++){
	        arr.push("&nbsp;");
	    }
		
		//月份总共需要显示的个数(包括空的)
		total_riqi=f_weekday%7+l_monthday;//因为如果1号不是星期天，会有几个空白日期
		
		for(;i<=total_riqi;i++){		
			 dis_day=i-f_weekday%7;
			 arr.push(dis_day);
		}	
		return arr;

	},
	get_html:function(arr, date){

		var Obj_date = this.Obj_date;
		Obj_date.setFullYear(date.y,date.m,1);	
		year = Obj_date.getFullYear();
		month = Obj_date.getMonth();
		var f_weekday=Obj_date.getDay();//本月第一天是周几

		var str=new Array();
		str.push("<tr>");
		for(var i=0,len=arr.length; i<len; i++){
			var dis_day=arr[i];
			if(i%7==0&&dis_day!="&nbsp;"){
	            str.push("</tr><tr>");
	        }
			//已经过去的日期是否可以选,过去的直接显示，没过去的加a标签
			var ddd = String(date.y)+"-"+this.add0(date.m+1)+"-"+this.add0((i+1-f_weekday));
			if(dis_day == '&nbsp;') {
				str.push('<td></td>');
			} else if(this.is_weekend(date.y,date.m,dis_day)){
				str.push('<td><a href="#" id=\"'+ddd+'\" class="orange" title="'+dis_day+'">'+this.get_festive(date.m,dis_day)+'</a></td>');
			} else if(this.is_today(date.y,date.m,dis_day)){		
				str.push('<td><a href="#" id=\"'+ddd+'\" class="orange" title="'+dis_day+'">今天</a></td>');
			} else {			
				str.push('<td><a href="#" id=\"'+ddd+'\" title="'+dis_day+'">'+this.get_festive(date.m,dis_day)+'</a></td>');
			}
			 	
		}
		var finalstr = str.join("");
	    finalstr=finalstr.replace(/<tr><\/tr>/,"");
	    finalstr=finalstr.replace(/<tr>$/,"");	
		return finalstr;
	},
	draw:function(date){
		var arr_1 = this.get_show_days(date.y, date.m, date.d);
		var str = this.get_html(arr_1, date);
		console.log(date);
		$("#calendar table").eq(0).html(str).css({background:"url("+(date.m+1)+"yue.gif)"});
		$("#calendar td a").each(function(){$(this).click(function(){
							var curr_id = $("#calendar").data('curr_id'); 
				        	$("#"+curr_id).val($(this).attr("id"));
				        	$("#calendar").hide();
				        	return false;
		})});
		//$("#calendar .tip_y_m_curr").eq(0).html(date.y+'年'+(date.m+1)+'月');
	},
	show:function(e){
		var fr_input_id=e.data.fr_input_id;
		this.empty_cal();
	    $("#"+fr_input_id).focus();  
	    var today = this.today;
		var date = {y:today.getFullYear(),m:today.getMonth(),d:today.getDate()};
		if($('#'+fr_input_id).val()){
			 date = this.get_date($('#'+fr_input_id).val());
		}
		//设置下拉的年月
		$("#calendar_sel_year option[value="+date.y+"]").attr('selected',true);
		$("#calendar_sel_month option[value="+this.add0(date.m+1)+"]").attr('selected',true);
	    this.draw(date);
	},
	empty_cal:function(){
	    $(".month span").remove();
	    $("#calendar table").empty();
	},
	get_date:function(chufa_riqi){
		var arr_date=chufa_riqi.split("-");
	    var chufa_year=arr_date[0];
	    var chufa_month=arr_date[1];
	    var chufa_date=arr_date[2];
	    return {y:chufa_year,m:chufa_month-1,d:chufa_date};
	},
	add0:function (num){
	    num=parseInt(num);
	    if(num<10){
	        num="0"+num;
	    }
	    return num;
	},
	//计算元素坐标
	loc:function (a) {
		var b = [];
		b.x = a.offsetLeft;
		for (b.y = a.offsetTop; a = a.offsetParent;) b.x += a.offsetLeft, b.y += a.offsetTop;
		return b
	}
	
}; 

var cad = new Calendar('i-date','i-date2');
console.log(cad.is_weekend(2013,4,4));
console.log(cad.get_festive(4,4));
//var TODAY = {y:today.getFullYear(),m:today.getMonth(),d:today.getDate()};
