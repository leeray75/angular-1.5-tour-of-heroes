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
					ctrl.heroes = data;
				})
			}

			ctrl.onSelect = function(hero){
				ctrl.selectedHero = hero;
			}
			ctrl.delete = function(hero){
				heroService.delete(hero.id).then(function(response){
					ctrl.heroes = ctrl.heroes.filter(function(_hero){
						return hero.id !== _hero.id;
					});
				},
				function(error){
					console.warn("delete error:",error);
				});
			}

			ctrl.gotoDetail = function(){
				$state.go('hero-details', { id: ctrl.selectedHero.id });
			}

			ctrl.search = function(searchTerm){
				ctrl.selectedHero = null;
				if(searchTerm.trim() === ""){
					getHeroes();
				}
				else{
					heroService.search(searchTerm)
					.then(function(response){
						ctrl.heroes = response;
					})
				}
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