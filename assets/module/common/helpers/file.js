angular.module('vehimatics').config(function($provide) {
	$provide.service('FileReaderHelper', function($q) {
		this.readAsDataURL = function(file, callback) {

			if (window.FileReader) {
				var fileReader = new FileReader();
				fileReader.readAsDataURL(file);
				fileReader.onload = callback;
			}
		};
	});
});
/** @file */
