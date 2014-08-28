angular.module('vehimatics/framework').constant('FormUrlEncodedRequestTransformer', function transformRequest(data, headersGetter) {
	var str = [];
	for(var p in data) {
		if(p[0] !== '$') {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
		}
	}
	return str.join("&");
});
/** @file */
