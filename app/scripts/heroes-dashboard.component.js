(function(){
	function controller($scope,heroService){
			$scope.heroes = [];
			this.$onInit = function(){
				heroService.getHeroes().then(function(data){
					var heroes = data;
					$scope.heroes = heroes.splice(1,4);
				})
			}
		}
	
	angular.module('tourOfHeroesApp')
	.component('heroesDashboard',{
		templateUrl: '../templates/heroes-dashboard.html',
		controller: ['$scope','heroService',controller]
	});

})(window.angular);