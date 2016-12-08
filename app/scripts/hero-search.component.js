(function(angular){
"use strict";
	function controller($scope,$document,$state,$timeout,heroService){
		var ctrl = this;
		ctrl.heroes = [];
		ctrl.searchTerm = '';
		ctrl.showList = (typeof(ctrl.showList)!=='undefined') ? ctrl.showList : true;
		var searchTimeout = null;
		ctrl.search = function(){
			clearTimeout(searchTimeout);
			$timeout.cancel(searchTimeout);
			searchTimeout = $timeout(function(){
				console.log("ctrl.showList",ctrl.showList)
				if(!ctrl.showList){
					ctrl.onSearch({value: ctrl.searchTerm});
				}
				else{
					if(ctrl.searchTerm.trim() === ""){
						ctrl.heroes = [];
					}
					else{
						heroService.search(ctrl.searchTerm)
						.then(function(response){
							ctrl.heroes = response;
							$document.one('click',function(e){
								ctrl.heroes = [];
								$scope.$apply();
							})
						})
					}
				}


			},1000);
		} // end ctrl.search

		ctrl.gotoDetail = function(hero){
			$state.go('hero-details', { id: hero.id });
		}

	} // end controller

	angular.module('tourOfHeroesApp')
	.component('heroSearch',{
		templateUrl: '../templates/hero-search.html',
		controller: ['$scope','$document','$state','$timeout','heroService',controller],
		bindings: {
			'showList': '<',
			'onSearch': '&'
		}
	});

})(window.angular);