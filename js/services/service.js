//服务的模块
;
(function() {
	var services = angular.module("services", []);
	services.service("tool", function() {
		return {

		}
	})

	services.service("scookie", function() {
		return {
			setCookie: function(name, val, expires, path) {
				var cookieStr = name + '=' + val;

				if(expires) {
					cookieStr += ';expires=' + expires;
				}

				if(path) {
					cookieStr += ';path=' + path;
				}

				// 写入cookie
				document.cookie = cookieStr;
			},
		}
	})

	services.service("gcookie", function() {
		return {
			getCookie: function(name) {
				var cookie = document.cookie.split('; ');
				var res;

				for(var i = 0; i < cookie.length; i++) {
					var arr = cookie[i].split('=');
					if(arr[0] === name) {
						res = arr[1];
						break;
					}
				}

				return res;
			}
		}
	})

	services.service("date", function() {
		return {
			data: function() {
				var date = new Date();
				date.setData(date.getDate() + 7);
			}
		}
	})
})();