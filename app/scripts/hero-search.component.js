(function(){

	function controller($scope,$document,$timeout,heroService){
		var ctrl = this;
		ctrl.heroes = ctrl.heroes || [];
		ctrl.searchTerm = '';
		var searchTimeout = null;
		ctrl.search = function(){
			clearTimeout(searchTimeout);
			$timeout.cancel(searchTimeout);
			searchTimeout = $timeout(function(){
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
		}

	}

	angular.module('tourOfHeroesApp')
	.component('heroSearch',{
		templateUrl: '../templates/hero-search.html',
		controller: ['$scope','$document','$timeout','heroService',controller],
		bindings: {
			'showList': '<',
			'onSearch': '&'
		}
	});

})(window.angular);