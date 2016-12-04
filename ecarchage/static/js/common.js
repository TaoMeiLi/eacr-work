/**
 * 获取当前页面的参数
 * @param String name 请求中参数的key值
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
// HTML页面：通用信息配置
var config = {
	//"appServerUrl": "http://we.app.solarbao.com", // h5页面的正式环境
	//"apiServerUrl": "http://api.app.solarbao.com", //api后台接口的正式环境
	//"cdzServerUrl": "", // 充电庄需求：后台接口的正式环境
		
	"appServerUrl": "http://dev.we.app.solarbao.com", // h5页面的开发环境
	"cdzServerUrl": "http://101.200.78.100:1049", // 充电庄需求：后台接口的开发环境
		
	//"appServerUrl": "http://test.we.app.solarbao.com", // h5页面的测试环境
	"apiServerUrl": "http://101.200.144.60:81", //api后台接口测试环境
	//"cdzServerUrl": "http://101.200.144.60:90", // 充电庄需求：后台接口的测试环境
	"getOpenIdUrl":"http://dev.we.app.solarbao.com/pile/m/openid.php",
	"usCodeKey": "userCodeUC",  //加密使用，h5本地存储用户登录成功后的标识
	
	"interfaceVersion": "0.0.0", // 后台接口版本的控制，每个请求都必须要有这个参数：version=config.interfaceVersion

	"place": false  // 防止上面配置时，缺少','分隔，此为占位配置，无具体使用含义
};
//HTML页面：初始化参数
var initParams = {
    // 手机分辨率：宽度
    "phoneWidth": window.screen.width,
    // 手机分辨率：高度
    "phoneHeight": window.screen.height,
    // 浏览器窗口的宽度
    "clientWidth": document.documentElement.clientWidth,
    // 浏览器窗口的高度
    "clientHeight": document.documentElement.clientHeight,
    // 手机操作系统
    "phoneAllSys": ["android", "ios"],
    // 当前手机操作系统
    "currentPhoneSys": ""
};
//判断手机类型
var browser = {
    versions: function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息 
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
}
function judgePhoneSysType() {
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
        return "ios";
    }
    else if (browser.versions.android) {
        return "android";
    } else {
        return "";
    }
// document.writeln(" 是否为移动终端: " + browser.versions.mobile);
// document.writeln(" ios终端: " + browser.versions.ios);
// document.writeln(" android终端: " + browser.versions.android);
// document.writeln(" 是否为iPhone: " + browser.versions.iPhone);
// document.writeln(" 是否iPad: " + browser.versions.iPad);
// document.writeln(navigator.userAgent);
}
// 初始化定义手机类型
initParams.currentPhoneSys = judgePhoneSysType();

/**
 * GET请求+JSONP格式的异步AJAX请求
 * @param {Object} reqrUrl 请求的url，注此参数不能为空！！！
 * @param {Object} params 请求的参数，格式为key1=val1&key2=val2或{key1: val1, key2: val2}
 * @param {Object} successCallback 请求成功回调函数，参数为请求返回的参数function(data)
 * @param {Object} errorCallback 请求出错回调函数，参数为function(a, b, c)
 * @param {Object} timeoutCallback 请求出错回调函数，参数为function(jqAjaxReqr, status)。jqAjaxReqr请求的标识；status请求的状态：timeout、success、error
 * @param {Object} extraConfig 请求时的额外配置或参数，JSON格式。
 * 	说明 {openId: "" // 表示当前用户的微信公众号openId值
 * }
 * 例：
 * jqueryAjaxGetJsonp(
 * 		"http://www.baidu.com", //不能为空
 * 		"key=value", //可空，或不传此参
 * 		function(data) {alert("success");}, //可空，或不传此参
 * 		function(a,b,c) {alert("error");}, //可空，或不传此参
 * 		function(jqAjaxReqr, status) {jqAjaxReqr.abort();} //可空，或不传此参
 *  );
 */
function jqueryAjaxGetJsonp(reqrUrl, params, successCallback, errorCallback, timeoutCallback, extraConfig) {
	if(!params) params="";
	if( reqrUrl.indexOf("jsonp")==-1&&params.indexOf("jsonp")==-1) {params += "&jsonp=1";}
	if(extraConfig){
		var rsaParam = getRsaDeviceInfo( extraConfig["openId"] );
	}else{
		return;
	}
	params += params.length>0?"&"+rsaParam:rsaParam;
	
	var jqAjaxReqr = $.ajax({
		// timeout : 5000, //超时时间设置，单位毫秒
		type: "GET",
		url: reqrUrl,
		data: params,
		dataType: "jsonp",
		success: function(data) {
			if( successCallback && typeof successCallback=="function" ) {
				successCallback(data);
			}
		},
		complete: function(XMLHttpRequest, status) {
			if( timeoutCallback && typeof timeoutCallback=="function" ) {
				timeoutCallback(jqAjaxReqr, status);
			} else {
				if(status=='timeout'){//超时,status还有success,error等值的情况
					jqAjaxReqr.abort();
					// alert("请求访问超时");
				}
			}
		},
		error: function(a, b, c) {
			if( errorCallback && typeof errorCallback=="function" ) {
				errorCallback(a, b, c);
			}
		}
	});
}
function base64_encode(str) {
    var c1, c2, c3;
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var i = 0, len = str.length, string = '';

    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt((c1 & 0x3) << 4);
            string += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            string += base64EncodeChars.charAt(c1 >> 2);
            string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            string += base64EncodeChars.charAt((c2 & 0xF) << 2);
            string += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        string += base64EncodeChars.charAt(c1 >> 2);
        string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        string += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return string
}
/**
 * 将用户登录成功后，用户的标识使用H5进行存储起来
 * 每次涉及登录，并且登录成功后，都需要重新调此方法
 * @param userCode 用户登录成功的标识
 * @returns { code:2000存储成功，其他失败 }
 */
function setStorageUC( userCode ) {  //登录成功后存储接口返回的userCode值
	var result = { code:2000, msg:"" };
	if( window.localStorage ) {
		var storageKey = "storage-"+config.usCodeKey;
		localStorage.setItem( storageKey, userCode );
	} else {
		result = { code:500, msg:"不支持存储" };
	}
	return result;
}
/**
 * 从本地缓存中获取用户登录成功的缓存标识
 * @returns {String}
 */
function getStorageUC() {     //判断useraCode是否存在；如果存在说明已经登录过了，直接进去扫码页面；
	var userCode = "";
	if( window.localStorage ) {
		var storageKey = "storage-"+config.usCodeKey;
		userCode = localStorage.getItem( storageKey );
		if( !userCode || userCode=="undefined" ) {
			userCode = "";
     	}
	}
	return userCode;
}
/**
 * 与后台接口交互的内容处理
 * @param id 用户的id标识，微信端为openId。
 */
function getRsaDeviceInfo( id ) {
	//系统(iphone:ios,安卓:android,微信:wechat)#手机型号#系统版本号#应用版本号#网络#UUID（微信用openId必须有）
	var timestamp = new Date().getTime().toString().substr(0, 10);
	var uuid = id;
	var userCode = getStorageUC();
	var params = "userCode="+userCode+";device=wechat#2#3#4#5#"+uuid+";time="+timestamp+";";
	params += getRsaToken(timestamp, uuid) + ";";
	params = base64_encode( params );
	params = "wechatCookie="+params;
	return params;
}
/**
 * 根据当前用户的标识获取加密的token值
 * @param timestamp 10位的当前时间值
 * @param uuid 用户的标识
 * @returns {String} 返回处理后的token值。格式为：token=xxx
 */
function getRsaToken( timestamp, uuid ) {
	//md5(时间戳+UUID+spisolar)
	var tokenStr = "token=";
	if( uuid ) {
		return tokenStr + $.md5( timestamp+uuid+"spisolar" );
	}
	return tokenStr;
}

/**
 * 后台PHP封装微信token，前端调API接口获取token相关数据，然后配置需要访问哪些微信的API接口
 * @param callWXApiList 需要使用访问的微信API接口名称。例：["checkJsApi", "getLocation", "onMenuShareTimeline"]
 */
function getWXJSTicket( callWXApiList ) {
	var currentUrl = location.href;
	if( currentUrl.indexOf("#")>-1 ) {
		currentUrl = currentUrl.substr(0, currentUrl.indexOf("#"));
	}
	currentUrl = encodeURIComponent(currentUrl);
	if( !callWXApiList ) return false;
	$.ajax({
		async: false,
		url: config.cdzServerUrl+"/wx/jstoken?url="+currentUrl,
		type: "get",
		success: function(result) {
			wx.config({
			    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			    appId: result.data.appId, // 必填，公众号的唯一标识
			    timestamp: result.data.timestamp, // 必填，生成签名的时间戳
			    nonceStr: result.data.nonceStr, // 必填，生成签名的随机串
			    signature: result.data.signature,// 必填，签名，见附录1
			    jsApiList: callWXApiList  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		}
	});
}
/**
 * 根据微信公众号的code值加载用户唯一标识openId
 * @param wxCode 微信公众号的code值
 * @returns 返回微信用户的openId值。
 */
function getOpenIdByWXCode( wxCode ) {
	var openId;
	$.ajax({
		async: false,  //同步加载数据
		url: config.cdzServerUrl+"/wx/getopenidbycode?code="+wxCode,
		type: "get",
		success: function(result) {
			openId = result.data.openId;
		}
		,error: function(a,b,c) {
			//alert(c);
		}
	});
	return openId;
}


//新维智能的公共组件
var xwznUtility = xwznUtility || {};
$.extend(xwznUtility, {
	//获取url中的openId或user_id
	getOpenOrUserId: function () {
		//接口参数
		var returnStr = '';
		var openId = getQueryString("openId"),
			user_id = getQueryString("user_id") ? getQueryString("user_id") : '',
			userId = getQueryString("userId") ? getQueryString("userId") : '';
		if(openId){
			returnStr = 'openId=' + openId;
		}else if(user_id || userId){
			returnStr = 'user_id=' + user_id + "&userId=" + userId;
		}
		return returnStr;
	},
	//项目申请：微信去掉“合作申请”
	hideHeader: function(){
		var $header = $(".com-head");
		var openId = getQueryString("openId");
		if(0 != $header.length && openId){
			$header.hide();
		}
	},
	//正则匹配
	regExp: {
		mobile: /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
		number: /^[1-9]\d*$/,
		float: /^(0|([1-9]\d*))(\.\d{1,2})?$/,
		year: /^[1-9]\d{0,3}$/
	},
	getByteLen:function(val){
		var len = 0;
		for (var i = 0; i < val.length; i++) {
		   var length = val.charCodeAt(i);
		   if(length>=0&&length<=128)
			{
				len += 1;
			}
			else
			{
				len += 2;
			}
		}
		return len;	
	}

});
//隐藏微信网页右上角分享按钮
function onBridgeReady(){
 WeixinJSBridge.call('hideOptionMenu');
}

if (typeof WeixinJSBridge == "undefined"){
    if( document.addEventListener ){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }else if (document.attachEvent){
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
}else{
    onBridgeReady();
}
//如果地址栏里有userId并且不为空时，隐藏title

$(document).ready(function(){
	if(getQueryString("userId") && getQueryString("userId") != ''){
		$(".com-head").css("display","none");			
	}
})
//扫码充电页面中开始、结束按钮旋转
var tme;
function Ratate(){
	var oDeg=0;
	tme=setInterval(function(){
		oDeg+=1;
		if(oDeg>=360){
			oDeg=0;
		}
		  document.getElementById('rotate').style.transform="rotate("+oDeg+"deg)";
	},10)
}


/**
 * 获取访问当前网页的微信用户openId
 * @returns openId
 */
function getOpenId() {
    //从本地获取
    var openId = localStorage.getItem('openId');
    if (!openId) {
        //从地址栏上获取
        var openId = getQueryString('openId');
        if (!openId) {
            //跳转获取openId页面
            //var getOpenIdUrl = config.getOpenIdUrl;
            window.location.href = config.getOpenIdUrl;
        } else {
            localStorage.setItem('openId', openId);
            return openId;
        }
    } else {
        return openId;
    }
}



//$(function () {
//  //localStorage.removeItem('openId');
//  var openId = getOpenId();
// // alert('1111' + openId);
//
//});
