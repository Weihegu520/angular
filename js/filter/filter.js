//过滤器模块
;
(function() {
	var filters = angular.module("filters", []);
	filters.filter("ed", function() {
		return function(input) {

		}
	})

	filters.filter('to_trusted', ['$sce', function($sce) {
		return function(text) {
			return $sce.trustAsHtml(text);
		}
	}])
})();