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

	//===================================
	// 画像（file）をリサイズ
	//===================================
	ImgResize: function(file, maxSize, callback) {
		const fr = new FileReader();
		// base64エンコード
		fr.onload=(e)=>{
			// 画像（BASE64）をリサイズ
			Util.ImgB64Resize(e.target.result, maxSize, (base64)=>{
				// base64の文字列をファイルオブジェクトに変換
				callback(Util.Base64toFile(base64, file.name));
			});
		}
		fr.readAsDataURL(file);
	},

	//===============================================
	// 画像（BASE64）をリサイズ
	//===============================================
	ImgB64Resize: function(imgB64, maxSize, callback) {
		var img_type = imgB64.substring(5, imgB64.indexOf(";"));
		var image = new Image();
		image.onload = function() {
			var width, height;
			// 最大サイズより小さい時は何もしない
			if(maxSize > image.width && maxSize > image.height){
				callback(imgB64);
				return;
			}else{
				// 横長の画像は横のサイズを指定値にあわせる
				if(image.width > image.height){
					var ratio = image.height/image.width;
					width = maxSize;
					height = Math.floor(maxSize * ratio);
				// 縦長の画像は縦のサイズを指定値にあわせる
				} else {
					var ratio = image.width/image.height;
					width = Math.floor(maxSize * ratio);
					height = maxSize;
				}
			}
			// New Canvas
			var canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			// Draw (Resize)
			var ctx = canvas.getContext('2d');
			ctx.drawImage(image, 0, 0, width, height);
			// Destination Image
			callback(canvas.toDataURL(img_type));
		};
		image.src = imgB64;
	},

	//===============================================
	// base64の文字列をファイルオブジェクトに変換
	//===============================================
	Base64toFile: function(base64, name){
		if(!name) name="file";
		// base64のデコード
		var bin = atob(base64.replace(/^.*,/, ''));
		// バイナリデータ化
		var buffer = new Uint8Array(bin.length);
		for (var i = 0; i < bin.length; i++) {
			buffer[i] = bin.charCodeAt(i);
		}
		// ファイルオブジェクト生成
		var img_type = base64.substring(5, base64.indexOf(";"));
		return new File([buffer.buffer], name, {type: img_type});
	},

	//===============================================
	// ページ遷移
	//===============================================
	pageJump: function(url, target){
		if(!target) target = "";
		open(url, target);
	},

	//===============================================
	// オブジェクトコピー
	//===============================================
	objCopy: function(obj){
		return JSON.parse(JSON.stringify(obj));
	},


}
module.exports = Util;
