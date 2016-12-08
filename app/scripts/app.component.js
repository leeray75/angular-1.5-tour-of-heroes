// Code goes here
(function(angular){
"use strict";
	function appComponentController($scope,$element,$attrs){
		$scope.title = 'Tour of Heroes';
		$scope.isNavCollapsed = true;
	}
	angular.module('tourOfHeroesApp')
	.component('appComponent',{
		templateUrl: '../templates/appComponent.html',
		controller: ['$scope','$element','$attrs',appComponentController]
	})
})(window.angular);