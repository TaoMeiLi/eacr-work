window.onload=function(){

//车辆详情：倒计时
//1秒：1000；
//1分钟：1000*60；
//1小时：1000*60*60；
//1天：1000*60*60*24；
var many_time=document.getElementById("many_time");
var spans=many_time.getElementsByTagName("span");
var tEnd= new Date(2015,10,15,12,05,30);
//月数是由0开始到11月
function time(){
	var tStart = new Date();
	//获取2015/12/25,12:20:12到现在的毫秒数
	var allTime = tEnd.getTime() - tStart.getTime();
	//获取天
	var oDays = parseInt(allTime/(60*60*1000*24));
	//去掉天后剩下的毫秒数;
	var _oDays = (allTime%(60*60*1000*24));
	//获取小时
	var oHours = parseInt(_oDays/(60*60*1000));
	//去掉小时以后剩下的毫秒数；
	var _oMinutes = (allTime%(60*60*1000));
	//获取分钟
	var oMinutes = parseInt(_oMinutes/(60*1000));
	//去掉小时，分钟以后的毫秒数
	var _oSeconds = _oMinutes%(60*1000);
	//获取秒
	var oSeconds = parseInt(_oSeconds/1000)
	//获取毫秒
	var hh = _oSeconds%1000;
	spans[0].innerHTML = oDays;
	spans[2].innerHTML = oHours;
	spans[4].innerHTML = oMinutes;
	spans[6].innerHTML = oSeconds;
}
	setInterval(time,1);

}