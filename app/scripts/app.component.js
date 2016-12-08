// Code goes here
(function(angular){
"use strict";
	function appComponentController($scope,$element,$attrs){
		$scope.title = 'Tour of Heroes';
	} // end mainController

	function navController($scope,$element,$attrs){
		$scope.isNavCollapsed = true;
	}
	
	angular.module('tourOfHeroesApp')
	.component('appComponent',{
		templateUrl: '../templates/appComponent.html',
		controller: ['$scope','$element','$attrs',appComponentController]
	})
	.component('nav',{
		controller: ['$scope','$element','$attrs',navController]
	});
})(window.angular);