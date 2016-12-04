/**
 * 根据存储的key值获得html5的缓存字符串数据
 * html5存储的数据都是字符串
 * @param storageKey
 * @returns
 */
 function loadStorageData(storageKey) {
 	if( window.localStorage ) {
     	var storageDataStr = localStorage.getItem(storageKey);
     	if( storageDataStr && storageDataStr!="undefined" ) {
     		return storageDataStr;
     	}
     }
 	return null;
}
/**
* 删除html5的缓存数据
* @param storageKey 缓存的key值
*/
function removeStorageData(storageKey) {
	if( window.localStorage ) {
     	localStorage.removeItem(storageKey);
	}
}
/**
 * 将数据缓存到html5的本地缓存中
 * @param storageKey
 * @param storageValStr
 */
function storageData(storageKey, storageValStr) {
	if( window.localStorage ) {
		localStorage.removeItem(storageKey);
		localStorage.setItem(storageKey, storageValStr);
	}
}

/**
 * 判断处理页面中展示图片的div
 * 注(暂不使用)：<div type="image" ></div>
 * 20151029因为android无法提供base64图片，所以此处修改为img元素标签
 * <img type="image" />
 * @param {Object} individuationDealFunc 具体的回调处理方法
 */
function dealStorageImageShow( individuationDealFunc ) {
	$.each($("img[type='image']"), function(i, showImgComp) {
		if( !$(showImgComp).hasClass("img-show") ) {
    		if( individuationDealFunc && typeof individuationDealFunc=="function" ) {
    			individuationDealFunc( $(showImgComp) );
    			$(showImgComp).addClass("img-show");
            }
		}
	});
}