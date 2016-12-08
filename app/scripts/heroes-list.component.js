(function(){

	function controller($scope,$state,heroService){
			$scope.heroes = [];
			$scope.selectedHero = null;
			$scope.heroName = '';
			this.getHeroes = function(){
				heroService.getHeroes().then(function(data){
					var heroes = data;
					$scope.heroes = heroes;
				})
			}

			
			$scope.onSelect = function(hero){
				$scope.selectedHero = hero;
			}
			$scope.delete = function(hero){
				heroService.delete(hero.id).then(function(response){
					$scope.heroes = $scope.heroes.filter(function(_hero){
						return _hero !== hero;
					})
				},
				function(error){
					console.warn("delete error:",error);
				});
			}

			$scope.add = function(name){
				name = name.trim();
				if(!name){ return; }
				heroService.create(name).then(function(response){
					$scope.heroes.push(response.data);
					$scope.selectedHero == null;
				})
			}

			$scope.gotoDetail = function(){
				$state.go('hero-details', { id: $scope.selectedHero.id });
			}

			this.$onInit = function(){
				this.getHeroes();
			}.bind(this);
		}


	angular.module('tourOfHeroesApp')
	.component('heroesList',{
		templateUrl: '../templates/heroes-list.html',
		controller: ['$scope','$state','heroService',controller]
	});
	

})(window.angular);