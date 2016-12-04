//精品推荐和全部的切换
window.onload=function(){
	var nav_l=document.getElementById("nav_l");
	var jpfonl=nav_l.getElementsByTagName("span")[0];
	var nav_r=document.getElementById("nav_r");
	var jpfonr=nav_r.getElementsByTagName("span")[0];
	var jingpin=document.getElementById("jingpin");
	var allcar=document.getElementById("allcar");
	nav_l.addEventListener("touchstart",function(){
		allcar.style.display="none";
		jingpin.style.display="block";
		jpfonl.style.color="#ba000e";
		nav_l.style.borderBottom="6px solid #ba000e";
		jpfonr.style.color="#555555";
		nav_r.style.borderBottom="3px solid #d3d3d3";

	})
	nav_r.addEventListener("touchstart",function(){
		jingpin.style.display="none";
		allcar.style.display="block";
		jpfonr.style.color="#ba000e";
		nav_r.style.borderBottom="6px solid #ba000e";
		jpfonl.style.color="#555555";
		nav_l.style.borderBottom="3px solid #d3d3d3";
	});
// 下：关注和已关注
	var guanzhu=document.getElementsByClassName("guanzhu");
	var xins=document.getElementsByClassName("xin");
	var ygz=document.getElementsByClassName("ygz");
	var gz_ok=document.getElementById("gz_ok");
	var a=0;
	for(var i=0;i<xins.length;i++){
		guanzhu[i].index=i;
		guanzhu[i].addEventListener("touchstart",function(){
			if(a==0){
				xins[this.index].style.background="url(../imgs/xin.png) 0 -32px no-repeat";
				ygz[this.index].innerHTML="已关注";
				setTimeout(function(){
					gz_ok.style.display="block";

				},500);
				setTimeout(function(){
					gz_ok.style.display="none";
				},1000);
				a=1;
			}else if(a==1){
				xins[this.index].style.background="url(../imgs/xin.png) 0 0 no-repeat";
				ygz[this.index].innerHTML="关注";
				a=0;
			}	
		})
	}
// 下：头部菜单
	var all=document.getElementById("all");
	var head_fd=document.getElementById("head_fd");
	falt=0;
	all.addEventListener("touchstart",function(){
		// head_fd.style.display="block";
		if(falt==0){
			head_fd.style.display="block";
			falt=1;
		}else if(falt==1){
			head_fd.style.display="none";
			falt=0;
		}
	})
}