(function(angular){
"use strict";
	function controller($scope,heroService){
		var ctrl = this;
		ctrl.topHeroes = [];
		ctrl.newHeroes = [];
		this.$onInit = function(){
			heroService.getHeroes().then(function(data){
				var topHeroes = angular.copy(data);
				ctrl.topHeroes = topHeroes.splice(1,4);
				var newHeroes = angular.copy(data);
				newHeroes.sort(function(hero1,hero2){
					return hero2.id - hero1.id;
				})
				ctrl.newHeroes = newHeroes.slice(0,4);
			})
		}
		ctrl.add = function(prop,hero){
			console.log("arguments:",arguments);
			var name = hero.name;
			if(!name){ return; }
			heroService.create(hero).then(function(response){
				var hero = response.data;
				ctrl.newHeroes.pop();
				ctrl.newHeroes.unshift(hero);
			})
			ctrl.heroName = "";
		}
	}
	
	angular.module('tourOfHeroesApp')
	.component('heroesDashboard',{
		templateUrl: 'templates/heroes-dashboard.html',
		controller: ['$scope','heroService',controller]
	});

})(window.angular);