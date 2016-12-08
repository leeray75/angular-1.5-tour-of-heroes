(function(){
	function controller($scope,heroService){
		var ctrl = this;
		ctrl.heroes = [];
		this.$onInit = function(){
			heroService.getHeroes().then(function(data){
				var heroes = data;
				ctrl.heroes = heroes.splice(1,4);
			})
		}
		ctrl.add = function(prop,value){
			var name = value.trim();
			if(!name){ return; }
			heroService.create(name).then(function(response){
				var hero = response.data;
				ctrl.heroes.pop();
				ctrl.heroes.unshift(hero);
				ctrl.selectedHero == null;
			})
			ctrl.heroName = "";
		}
	}
	
	angular.module('tourOfHeroesApp')
	.component('heroesDashboard',{
		templateUrl: '../templates/heroes-dashboard.html',
		controller: ['$scope','heroService',controller]
	});

})(window.angular);