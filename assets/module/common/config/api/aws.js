angular.module('vehimatics').config(function($provide, AppProvider) {
	/**
	 * Class to interact with Amazon AWS API
	 * @class module:vehimatics.api.Aws
	 */
	 $provide.factory('Aws', function($resource, $http, XmlHelper) {
		 var AppConfig = AppProvider.$get().config;

		 var baseUrl = AppConfig.restUrl;
		 var resourceUrl = baseUrl + '/aws';

		 var actions = {
			 policyImage: {
				 method: 'GET',
				 url: resourceUrl + '/policy/image'
			 },
			 policyImageBusiness: {
				 method: 'GET',
				 url: resourceUrl + '/policy/image/business'
			 },
			 policyImageUser : {
				 method: 'GET',
				 url: resourceUrl + '/policy/image/user'
			 },
			 policyImageVehicle: {
				 method: 'GET',
				 url: resourceUrl + '/policy/image/vehicle'
			 },
			 deleteImageVehicle: {
				 method: 'DELETE',
				 url: resourceUrl + '/policy/image/vehicle'
			 },
			 sign: {
				 method: 'GET',
				 url: resourceUrl + '/sign'
			 }
		 };

		 var r = $resource(resourceUrl, {}, actions);

		 r.listFile = function(params, success, error) {
			 r.sign(params, function(rsp) {
				 var url = rsp.url + '&prefix='+params.prefix;
				 $http({
						 method: 'GET',
						 url: url,
						 transformResponse: function(data) {
							 var fullpath = AppConfig.aws.bucket;
							 var json = XmlHelper.toJson(data);

							 var output = {
								 files: []
							 };

							 if(angular.isUndefined(data)) {
								 return output;
							 }

							 var pushFile = function(obj) {
								 if(+obj.Size === 0) {
									 return;
								 }
								 var filepath = AppConfig.aws.bucket;
								 filepath += obj.Key;	
								 output.files.push(filepath);
							 };

							 var result = json.ListBucketResult;
							 if(angular.isDefined(result.Contents)) {
								 if(!angular.isArray(result.Contents)) {
									 var obj = result.Contents;
									 pushFile(obj);
								 } else {
									 angular.forEach(result.Contents, pushFile);
								 }
							 }
							 return output;
						 }
				 }).then(success, error);
			 }, error);
		 };

		 return r;
	 });

});
/** @file */
