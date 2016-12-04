
//高德地图
function openMap() {
    $("#mapSel").attr('src','map.html').removeClass("uhide");
    // 如果当前页面有滚动条，则处理这行
    $("body").css("overflow-y", "hidden");
}
function receiveMessage(e) {
    var data = e.data;
    if(data=="returnMapVal") {
        returnMapVal() ;
    }
}
if (typeof window.addEventListener != 'undefined') {//使用html5 的postMessage必须处理的
    window.addEventListener('message', receiveMessage, false);
} else if (typeof window.attachEvent != 'undefined') {
    window.attachEvent('onmessage', receiveMessage);
}
function returnMapVal(val) {
    $("#mapSel").addClass("uhide");
    // 如果当前页面有滚动条，则处理这行
    $("body").css("overflow-y", "auto");
    var mapSelResult = eval("("+val+")");
    //mapSelResult = { "province": "省份", "city": "城市", "area": "地区", "detail": "具体街道", "fulladdress": "","areaCode":"区的code"}
    var selCnt = mapSelResult["province"]+ ' ' + mapSelResult["city"]+ ' '+mapSelResult["area"];
    var $provice = $('#province');
    var $city = $('#city');
    var $area = $("#area");
    var reset = 0;
    //匹配code
    if(mapSelResult["province"] && mapSelResult["city"] && mapSelResult["area"]){
        $("#address-h").html(selCnt);
		$provice.val(mapSelResult["province"]);
		$city.val(mapSelResult["city"]);
		$area.val(mapSelResult["area"]);
    }else{
        if(!$.trim(selCnt)){
            $("#address-h").html('您没有做任何选择');
            //cod值置空
            $provice.val("");
            $city.val("");
            $area.val("");
        }else{
            $("#address-h").html('请您手动选择');
            //cod值置空
            $provice.val("");
            $city.val("");
            $area.val("");
        }
    }
    //$("#area").val(mapSelResult.areaCode);
	var totalAddress = mapSelResult["fulladdress"],
		partTotalAddress = totalAddress.split("区")[1];
    $("input[name='address']").val(partTotalAddress);
    //$("#lnglat").html( mapSelResult["positionJson"]["lng"]+", "+mapSelResult["positionJson"]["lat"] );
}