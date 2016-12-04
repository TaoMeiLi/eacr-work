// window.onload=function(){
// // 以下头部返回框
// 	// var head_fd=document.getElementById("head_fd");
// 	// var all=document.getElementById("all");
// 	// var main=document.getElementById("main");
// 	// all.addEventListener("touchstart",function(){
// 	// 	 head_fd.style.display = "block";
// 	// })
// 	// main.addEventListener("touchstart",function(){
// 	// 	 head_fd.style.display = "none";
// 	// })


// // 以下头部轮播图
// var oBanner=document.getElementById("banner");
// var oImgs=document.getElementById("imgs");
// var oTab=document.getElementById("tab");
// var oWidth=document.documentElement.clientWidth;
// 			// var a=window.innerWidth;设备屏幕物理宽度
// 	oTab.style.width=oWidth+"px";
// 	oImgs.style.width=oWidth*5+"px";

// 	// document.body.addEventListener("touchmove",function(event){
// 	// 	event.preventDefault();
// 	// });

// 	var os=50, ts=30;//滑动超过50像素，间隔时间小于30；
// 	var ct , dt ,dy;
// 	var ey=0;
// 	var cur=0;
// 	var s=5;
// 	oTab.addEventListener("touchstart",touchStart,false);
// 	oTab.addEventListener("touchmove",touchMove,false);
// 	oTab.addEventListener("touchend",touchEnd,false);

// 	function touchStart(e){
// 		ct = new Date().getTime();
// 		ey = e.touches[0].pageX;
// 	};
// 	function touchMove(e){
// 		e.preventDefault();
// 		dy = e.touches[0].pageX;
// 		if(cur == 0 && dy>ey){
// 			return false;
// 		}
// 		if(cur == s-1 && -cur*oWidth-(ey-dy) < oWidth-s*oWidth){
// 			return false;
// 		}
// 		oImgs.style.left=-cur*oWidth-(ey-dy)+"px";
// 	};

// 	function touchEnd(e){
// 		console.log(cur);//测试
// 		dt = new Date().getTime()-ct;
// 		if(dy==0){
// 			return false;
// 		}
// 		if(dy-ey<-os||(dy-ey<0&&dt<ts)){
// 			dy=0;
// 			go_right();
// 			return false;
// 		}
// 		if(dy-ey>os||(dy-ey>0&&dt<ts)){
// 			dy=0;
// 			go_left();
// 			return false;
// 		}
// 		dy=0;
// 		slide(cur);
// 	}

// 	//执行滑动动画
// 	function slide(x){
// 		$("#imgs").animate({
// 			left: -x * oWidth + "px"
// 		}, "fast");
// 		cur = x;
// 	}
// 	//向左
// 	function go_left(){
// 		if(cur > 0){
// 			slide(cur-1);
// 		}else{
// 			slide(cur);
// 		}
// 	}
// 	//向右
// 	function go_right(){
// 		if(cur<s-1){
// 			slide(cur+1);
// 		}else{
// 			slide(cur);
// 		}
// 	}

// //以下是推荐车
// var oCargd=document.getElementById("cargd_con");
// var oTabs=document.getElementById("tabs");
// var oLis=oTabs.getElementsByTagName("li");
// var oTabs_W=oTabs.style.width;
// var oW_li=375;
// var oL=oLis.length;
// 	oCargd.style.width=oWidth+"px";
// 	oTabs.style.width=oW_li*oL+"px";
// 	var Sg;      //滑动的像素
// 	var Nt;      //开始的时间
// 	var Et;      //结束的时间
// 	var Ns;      //开始位置的坐标
// 	var Es;      //结束位置的坐标
// 	var V=0;       //滑动速度
// 	var L=0;       //left:0;

// 	oCargd.addEventListener("touchstart",touchStart2,false);
// 	oCargd.addEventListener("touchmove",touchMove2,false);
// 	oCargd.addEventListener("touchend",touchEnd2,false);
	
// 	function touchStart2(eve){
// 		Nt = new Date().getTime();
// 		Ns = eve.touches[0].pageX;

// 	};
// 	function touchMove2 (eve){
// 		eve.preventDefault();
// 		Es = eve.touches[0].pageX;
// 	}
// 	function touchEnd2(eve){
// 		Et = new Date().getTime();
// 		if(Es-Ns<0){    //向左滑
// 			var t=Et-Nt;
// 			V=(Ns-Es)/t;
// 			L+=-V*2*t
// 			if(L<oTabs_W-375*oL){
// 				eve.preventDefault();
// 			}else{
// 				$("#tabs").animate({
// 					left: L + "px"
// 				}, "fast");
// 			}
// 		}
// 	}
	


// }
