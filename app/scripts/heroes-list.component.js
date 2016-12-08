(function(){

	function controller($scope,$element,$attrs,$state,heroService){
		var ctrl = this;
			ctrl.heroes = [];
			ctrl.selectedHero = null;
			ctrl.heroName = '';
			$scope.newHero = {
				id: null,
				name: ''
			};
			function getHeroes(){
				heroService.getHeroes().then(function(data){
					var heroes = data;
					ctrl.heroes = heroes;
				})
			}

			ctrl.onSelect = function(hero){
				ctrl.selectedHero = hero;
			}
			ctrl.delete = function(hero){
				heroService.delete(hero.id).then(function(response){
					var id = response.id;
					ctrl.heroes = ctrl.heroes.filter(function(hero){
						return hero.id !== id;
					});

				},
				function(error){
					console.warn("delete error:",error);
				});
			}

			ctrl.gotoDetail = function(){
				$state.go('hero-details', { id: ctrl.selectedHero.id });
			}

			this.$onInit = function(){
				getHeroes();
			};
		}


	angular.module('tourOfHeroesApp')
	.component('heroesList',{
		templateUrl: '../templates/heroes-list.html',
		controller: ['$scope','$element','$attrs','$state','heroService',controller]
	});
	

})(window.angular);