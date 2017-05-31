//控制器模块
;
(function() {
	var controllers = angular.module("controllers", []);
	controllers.controller("indexCtrl", ["$scope", function($scope) {
		$scope.name = "ws";
		console.log("ok");
		//默认的选项
		$scope.item = 0;
		$scope.itemOn = function(item) {
			$scope.item = item;
		}
	}])
	controllers.controller("recommendCtrl", function($scope, $http, $timeout, scookie, gcookie, date) {
		$scope.title = "请点我登录";
		//默认显示第一页
		$scope.page = 1;
		$scope.news = [];
		$scope.accesstoken = "";
		$scope.name = "";
		$scope.herd = "";
		$scope.cookie = "";
		$scope.cookies = "";
		//控制loading
		$scope.isLoading = false;
		$scope.loadMore = function() {
			//点击的时候出现loading
			$scope.isLoading = true;
			$timeout(function() {
				$http({

					url: "https://cnodejs.org/api/v1/topics",
					method: "GET",
					params: {
						page: $scope.page++,
						tab: "job"
					}
				}).then(function(data) {
					console.log(data)
					$scope.isLoading = false;
					$scope.news = $scope.news.concat(data.data.data);
					console.log($scope.news)
				})
			}, 1500)
		}
		$scope.loadMore();

		//登录的方法
		$scope.get = function() {
			$scope.isShowdialog = false;
			console.log($scope.accesstoken);
			$http({
				url: "https://cnodejs.org/api/v1/accesstoken",
				method: "POST",
				params: {
					accesstoken: $scope.accesstoken
				}
			}).then(function(data) {
				console.log(data);
				if(data) {
					$scope.name = data.data.loginname;
					$scope.herd = data.data.avatar_url;

					scookie.setCookie("accesstoken", $scope.accesstoken, date);

					$scope.cookies = gcookie.getCookie("accesstoken");

					$scope.cookie = $scope.cookies;
					console.log(scookie)

					$scope.title = "登录成功";
				}
			})
		}

		//弹窗
		$scope.isShowdialog = false;
		$scope.showdialog = function() {
			console.log("1")
			$scope.isShowdialog = true;
		}

		$scope.searchName = "";
		//搜索框
		$scope.isShowSearchBar = false;
		$scope.showSearchBar = function() {
			$scope.isShowSearchBar = true;
		}

		//清空搜索框
		$scope.searchClear = function() {
			//$scope.isShowSearchBar = false;
			$scope.searchName = "";
		}
	})
	controllers.controller("detailCtrl", function($scope, $location, $http, $state, $sce) {
		console.log($location.search());
		console.log($state.params.id);
		$scope.content = "";
		$scope.contents = "";
		$scope.gen = "";
		$scope.genst = "";
		$scope.gun = "";
		//		$scope.cookie = "";
		$http({

			url: "https://cnodejs.org/api/v1/topic/" + $state.params.id,
			method: "GET",

		}).then(function(data) {
			console.log(data)
			$scope.newData = data.data.data;
			$scope.content = $scope.newData.content;
			$scope.content = $sce.trustAsHtml($scope.content);
			$scope.genst = $scope.newData.replies.content;
			$scope.contents = data.data.data.replies.length;
			$scope.gen = data.data.data.replies;
			console.log($scope.gen)
		})

		//默认隐藏预览图片组件
		$scope.isShowGallery = false;
		$scope.showGallery = function() {
			$scope.isShowGallery = true;
		}

		//		$scope.guns = function(){
		//			$scope.cookie = gcookie.getCookie("accesstoken");
		//			console.log($scope.guns);
		//			
		//		}

	})
	controllers.controller("entertainCtrl", function($scope, $http, $timeout) {
		$scope.title = "问答";
		//默认显示第一页
		$scope.page = 1;
		$scope.news = [];
		//控制loading
		$scope.isLoading = false;
		$scope.loadMore = function() {
			//点击的时候出现loading
			$scope.isLoading = true;
			$timeout(function() {
				$http({

					url: "https://cnodejs.org/api/v1/topics",
					method: "GET",
					params: {
						page: $scope.page++,
						tab: "ask"
					}
				}).then(function(data) {
					console.log(data)
					$scope.isLoading = false;
					$scope.news = $scope.news.concat(data.data.data);
					console.log($scope.news)
				})
			}, 1500)
		}
		$scope.loadMore();

		//弹窗
		$scope.isShowdialog = false;
		$scope.showdialog = function() {
			console.log("1")
			$scope.isShowdialog = true;
		}

		$scope.searchName = "";
		//搜索框
		$scope.isShowSearchBar = false;
		$scope.showSearchBar = function() {
			$scope.isShowSearchBar = true;
		}

		//清空搜索框
		$scope.searchClear = function() {
			//$scope.isShowSearchBar = false;
			$scope.searchName = "";
		}
	})
	controllers.controller("detailCtrl", function($scope, $location, $http, $state, $sce) {
		console.log($location.search());
		console.log($state.params.id);
		$scope.content = "";
		$scope.contents = "";
		$scope.gen = "";
		$scope.genst = "";
		$http({

			url: "https://cnodejs.org/api/v1/topic/" + $state.params.id,
			method: "GET",

		}).then(function(data) {
			console.log(data)
			$scope.newData = data.data.data;
			$scope.content = $scope.newData.content;
			$scope.content = $sce.trustAsHtml($scope.content);
			$scope.genst = $scope.newData.replies.content;
			$scope.contents = data.data.data.replies.length;
			$scope.gen = data.data.data.replies;
			console.log($scope.gen)
		})

		//默认隐藏预览图片组件
		$scope.isShowGallery = false;
		$scope.showGallery = function() {
			$scope.isShowGallery = true;
		}
	})
	controllers.controller("societyCtrl", function($scope, $http, $timeout) {
		$scope.title = "精华";
		//默认显示第一页
		$scope.page = 1;
		$scope.news = [];
		//控制loading
		$scope.isLoading = false;
		$scope.loadMore = function() {
			//点击的时候出现loading
			$scope.isLoading = true;
			$timeout(function() {
				$http({

					url: "https://cnodejs.org/api/v1/topics",
					method: "GET",
					params: {
						page: $scope.page++,
						tab: "share"
					}
				}).then(function(data) {
					console.log(data)
					$scope.isLoading = false;
					$scope.news = $scope.news.concat(data.data.data);
					console.log($scope.news)
				})
			}, 1500)
		}
		$scope.loadMore();

		//弹窗
		$scope.isShowdialog = false;
		$scope.showdialog = function() {
			console.log("1")
			$scope.isShowdialog = true;
		}

		$scope.searchName = "";
		//搜索框
		$scope.isShowSearchBar = false;
		$scope.showSearchBar = function() {
			$scope.isShowSearchBar = true;
		}

		//清空搜索框
		$scope.searchClear = function() {

			$scope.searchName = "";
		}
	})
	controllers.controller("detailCtrl", function($scope, $location, $http, $state, $sce) {
		console.log($location.search());
		console.log($state.params.id);
		$scope.content = "";
		$scope.contents = "";
		$scope.gen = "";
		$scope.genst = "";
		$http({
			//url:"js/detail.json",
			url: "https://cnodejs.org/api/v1/topic/" + $state.params.id,
			method: "GET",

		}).then(function(data) {
			console.log(data)
			$scope.newData = data.data.data;
			$scope.content = $scope.newData.content;
			$scope.content = $sce.trustAsHtml($scope.content);
			$scope.genst = $scope.newData.replies.content;
			$scope.contents = data.data.data.replies.length;
			$scope.gen = data.data.data.replies;
			console.log($scope.gen)
		})

		//默认隐藏预览图片组件
		$scope.isShowGallery = false;
		$scope.showGallery = function() {
			$scope.isShowGallery = true;
		}
	})
	controllers.controller("militaryCtrl", function($scope, $http, $timeout) {
		$scope.title = "分享";
		//默认显示第一页
		$scope.page = 1;
		$scope.news = [];
		//控制loading
		$scope.isLoading = false;
		$scope.loadMore = function() {
			//点击的时候出现loading
			$scope.isLoading = true;
			$timeout(function() {
				$http({

					url: "https://cnodejs.org/api/v1/topics",
					method: "GET",
					params: {
						page: $scope.page++,
						tab: "good"
					}
				}).then(function(data) {
					console.log(data)
					$scope.isLoading = false;
					$scope.news = $scope.news.concat(data.data.data);
					console.log($scope.news)
				})
			}, 1500)
		}
		$scope.loadMore();

		//弹窗
		$scope.isShowdialog = false;
		$scope.showdialog = function() {
			console.log("1")
			$scope.isShowdialog = true;
		}

		$scope.searchName = "";
		//搜索框
		$scope.isShowSearchBar = false;
		$scope.showSearchBar = function() {
			$scope.isShowSearchBar = true;
		}

		//清空搜索框
		$scope.searchClear = function() {

			$scope.searchName = "";
		}
	})
	controllers.controller("detailCtrl", function($scope, $location, $http, $state, $sce, scookie, gcookie, date) {
		console.log($location.search());
		console.log($state.params.id);
		$scope.content = "";
		$scope.contents = "";
		$scope.gen = "";
		$scope.gunst = "";
		$scope.cookie = "";
		$scope.genst = "";
		$http({

			url: "https://cnodejs.org/api/v1/topic/" + $state.params.id,
			method: "GET",

		}).then(function(data) {
			console.log(data)
			$scope.newData = data.data.data;
			$scope.content = $scope.newData.content;
			$scope.content = $sce.trustAsHtml($scope.content);
			$scope.genst = $scope.newData.replies.content;
			$scope.contents = data.data.data.replies.length;
			$scope.gen = data.data.data.replies;
			console.log($scope.gen)
		})

		//默认隐藏预览图片组件
		$scope.isShowGallery = false;
		$scope.showGallery = function() {
			$scope.isShowGallery = true;
		}

        //评论
		$scope.guns = function() {
			$scope.cookie = gcookie.getCookie("accesstoken");
			console.log($scope.cookie);
			console.log($scope.gunst);
			if($scope.cookie) {
				$.ajax({
					url:"https://cnodejs.org/api/v1/topic/" + $state.params.id + "/replies",
					type:"POST",
					data:{
						accesstoken : $scope.cookie,
						content : $scope.gunst
					},
					success:function(data){
						//评论成功
						alert("评论成功");
						//评论成功刷新页面
						location.reload();
					}
				})
			}
		}
		
	})
})();