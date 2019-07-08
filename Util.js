const Util = {
	sender: null,
	//===============================================
	// カンマ区切り
	//===============================================
	addComma: function(n){
		return String(n).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	},

	//===============================================
	// 全角半角タブをトリム
	//===============================================
	trim: function(str){
		if(str) return str.replace(/^[\s|　|\t]+|[\s|　|\t]+$/g,'');
		return "";
	},

	//===============================================
	// 空判定
	//===============================================
	isEmpty: function(obj){
		return !Object.keys(obj).length;
	},

	//===============================================
	// バイトデータサイズをMBやKB単位に変換
	//===============================================
	sizeUnits: [" B", " KB", " MB", " GB", " TB"],
	convertToFileSize: (size)=>{
		for (var i = 0; size > 1024; i++) { 
			size /= 1024;
		}
		return Math.round(size * 100) / 100 + Util.sizeUnits[i];
	},

	//===============================================
	// オブジェクトをマージしディープコピー
	//===============================================
	extend: function() {
		var i = 1,
			key,
			length = arguments.length,
			target = arguments[0] || {};
		for (; i < length; ++i) {
			for (key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) {
					// 再帰呼び出し
					if (Object.prototype.toString.call(arguments[i][key]) === '[object Object]') {
						target[key] = Util.extend(target[key], arguments[i][key]);
					} else {
						target[key] = arguments[i][key];
					}
				}
			}
		}
		return target;
	},

	//===============================================
	// ランダム文字列を生成
	//===============================================
	random: (size)=>{
		if(!size) size = 8;
		var c = "abcdefghijklmnopqrstuvwxyz0123456789";
		var cl = c.length;
		var r = "";
		for(var i=0; i<size; i++){
			r += c[Math.floor(Math.random()*cl)];
		}
		return r;
	},

}
module.exports = Util;
