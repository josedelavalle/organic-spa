var app = angular.module('bjonesApp', ['ngRoute','ngResource','ngAnimate']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  // $locationProvider.html5Mode(true);
  $routeProvider
   .when('/', {
    templateUrl: 'main.html',
    
    // resolve: {
    //   // I will cause a 1 second delay
    //   delay: function($q, $timeout) {
    //     var delay = $q.defer();
    //     $timeout(delay.resolve, 1000);
    //     return delay.promise;
    //   }
    // }
  })
  .when('/1', {
    templateUrl: 'main.html',
    
  })
  .when('/2', {
  	templateUrl: 'main.html',
    
  })
  .when('/3', {
    templateUrl: 'main.html',
    
  })
  .when('/4', {
  	templateUrl: 'main.html',
    
  })
  .when('/5', {
    templateUrl: 'main.html',
    
  })
  .when('/6', {
  	templateUrl: 'main.html',
    
  })
  .otherwise({
  	redirectTo: '/'
  });
}]);

app.controller('appController', function($scope, $route, $http, $location, $timeout) {
	$scope.modalType = "one";
	$scope.title = "b.jones";
	$scope.subtitle = "organic spa";
	$scope.modalTitle = $scope.title + " " + $scope.subtitle;
	$scope.fb_page_id = "628344893968942";
	$scope.access_token = "1691046484469603|dTJsfLPx5m5uppXQ4A5Flw49WFs";
	$scope.fb_fields = "name,description,place,timezone,start_time,cover";
	$scope.fbURL = 
	// $scope.news = serviceName.query;
	$http.get("https://graph.facebook.com/v2.7/" + $scope.fb_page_id + "/events/attending/?fields=" + $scope.fb_fields + "&access_token=" + $scope.access_token)

      .success(function(data, status, headers, config) {
       
         $scope.fbEvents = data;
         console.log($scope.fbEvents.data[0]);
      });

	// console.log($scope.news);
	$scope.wheelItems = ["Express","Treatment","Add-ons","Waxing","Tinting","Facials","Massage"],
	$scope.subItems = [["Reflexology","Reiki","Reflex/Reiki Combo","Chakra Balance","Chair Massage","b. Focus Facial Treatment"],
					  ["Hand & Arm Treatment","Foot & Leg Treatment","Back Treatment","Full Body Sugar Scrub","Hydrating Body Treatment","Detoxifying Body Treatment"],
					  ["Scalp Massage","Oil Infused Aromatherapy","Eye Treatment","Lip Treatment","Lip/Eye Combo","Hand Sugar Scrub","Foot Sugar Scrub"],
					  ["Eyebrow Wax","Lip & Chin Wax","Underarm or Half Arm","Full Arm","Half Leg","Chest","Back","Bikini","Extended Bikini","Brazilian"],
					  ["Eyebrow Tint","Eyelash Tint","Brow/Lash Combo"],
					  ["Express Facial","Yam & Pumpkin Peel","Artic Berry Peel","Signature Peel","b.Facial","Microdermabrasion","Micropeel","Gentleman's Exfoliation","Teen Facial"],
					  ["Swedish","Deep Tissue","Medical","Sports","Myofascial Release","Oncology","Hot Stone", "Reflexology", "Reiki", "Lympathic Drainage","Prenatal"]];
	$scope.description = "b.jones is an organic spa located in the heart of morristown, nj.  We offer top notch products and services, in a warm inviting atmosphere.  Come see for yourself.";
	// $scope.wheelitems = [{name: 'Express', id: '0'},
	// 					{name: 'Treatment', id: '1'},
	// 					{name: 'Add-ons', id: '2'},
	// 					{name: 'Waxing', id: '3'},
	// 					{name: 'Tinting', id: '4'},
	// 					{name: 'Facials', id: '5'},
	// 					{name: 'Massage', id: '6'}];
	$scope.myButtons = $scope.subItems[0];

	$scope.thisBackgroundDefault = "images/fulls/01.jpg";
	$scope.thisBackgroundURLs = ["http://www.euromedspa.com/wp-content/uploads/2015/05/Dollarphotoclub_58101270.jpg",
								"http://barcelonasalon-spa.com/wp-content/uploads/2012/12/spa5.jpg",
								"http://d1jrw5jterzxwu.cloudfront.net/sites/default/files/article_media/spa_main_-_thinkstock.jpg",
								"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTj8HAlks1Ta_3AIf0KEn100reTP08zbngAGeFGF-aDhBMY8rCE",
								"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAN-vMwQf_-vzoWudcIOLHpuy9qeVldqspN6fs73c54SIs8YpiXg",
								"https://www.omnihotels.com/-/media/images/globals/spa/massage-couples-166668375.jpg?h=660&la=en&w=1170",
								"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTJfiJ6eNMljwZcJ07el2_S36HJkF4lyDKzjGZP25fHF8jA6mXJ"];
	// $scope.thisBackgroundURLs = ["images/thumbs/02.jpg",
	// 							"images/thumbs/03.jpg",
	// 							"images/thumbs/04.jpg",
	// 							"images/thumbs/05.jpg",
	// 							"images/thumbs/06.jpg",
	// 							"images/thumbs/07.jpg",
	// 							"images/thumbs/08.jpg"]
	$scope.thisBackgroundURL = $scope.thisBackgroundDefault;
	wheelClick = function(thisIndex) {
		
		$location.path('/'+thisIndex);
		
		$scope.myButtons = [];

		$scope.thisBackgroundURL = $scope.thisBackgroundURLs[thisIndex];
		$scope.subItems[thisIndex].forEach(function(current_value) {
			$scope.myButtons.push(current_value);
		});
		
		$scope.$apply();
		

		//$scope.myButtons.push($scope.subItems[thisIndex]);
		// console.log($scope.myButtons);
	};

	$scope.buttonClicked = function() {
		console.log(this);
		console.log($scope.myButtons[this.$index]);
		$scope.modalTitle = $scope.myButtons[this.$index];
		$('#modal-container').removeAttr('class').addClass($scope.modalType);
		$('body').addClass('modal-active');
	};
});

app.service('serviceName', ['$resource', '$scope', function($resource, $scope){
	return $resource(encodeURI('https://newsapi.org/v1/sources?language=en'));
}]);
app.factory('factoryName', function($http) {
  return {
      getSources: function() {
        return  $http.get('https://newsapi.org/v1/sources?language=en');
      }
  };
});

