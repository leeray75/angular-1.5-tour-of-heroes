(function(){

	function HeroService($http,$q,$localStorage){
		$http.defaults.headers.common
		var heroesHeaders = {
			'Content-Type': 'application/json'
		}
		var heroService = {};

		heroService.create = function(name){
			var deferred = $q.defer();
			var promise = deferred.promise;
			if($localStorage.heroes){
				var hero = {
					id: null,
					name: name
				}
				var heroesIds = $localStorage.heroes.map(function(hero){
					return hero.id;
				})
				
				heroesIds = heroesIds.sort();
				hero.id = heroesIds[heroesIds.length-1]+1;
				$localStorage.heroes.push(hero);
				deferred.resolve({ status: 'success', data: angular.copy(hero) });
			}
			else{
				deferred.reject({ status: 'error', message: 'Error creating hero'});
			}
			return promise;
		}

		heroService.delete = function(id){
			var deferred = $q.defer();
			var promise = deferred.promise;
			if($localStorage.heroes){
				$localStorage.heroes = $localStorage.heroes.filter(function(hero){
					return hero.id !== id;
				});

				deferred.resolve({ status: 'success', message: 'Hero Removed', id: id });
			}
			else{
				deferred.reject({ status: 'error', message: 'No Heroes'});
			}
			return promise;
		}

		heroService.update = function(hero){
			var deferred = $q.defer();
			var promise = deferred.promise;
			if($localStorage.heroes){
				var storedHero = $localStorage.heroes.find(function(_hero){
					return hero.id === _hero.id;
				})
				if(storedHero){
					angular.copy(hero,storedHero);
					deferred.resolve({ status: 'success', hero: angular.copy(storedHero) });
				}
				else{
					deferred.reject({ status: 'error', message: 'No Hero Found'});
				}
				
			}
			else{
				deferred.reject({ status: 'error', message: 'No Heroes'});
			}
			return promise;

		}
		heroService.getHero = function(id){
			var deferred = $q.defer();
			var promise = deferred.promise;
			this.getHeroes().then(function(heroes){
				var hero = heroes.find(function(hero){
					return hero.id === id;
				})
				if(hero){
					deferred.resolve(angular.copy(hero));
				}
				else{
					deferred.reject({ status: 'error', message: 'Hero Not Found!'});
				}
			})
			return promise;

		}

		heroService.getHeroes = function(){
			
			var deferred = $q.defer();
			var promise = deferred.promise;
			
			if($localStorage.heroes && $localStorage.heroes.length>0){
				heroes = angular.copy($localStorage.heroes);
				deferred.resolve(heroes);
			}
			else{
				var req = {
					method: 'GET',
					url: 'api/mock-heroes.json',
					headers: heroesHeaders
				}
				$http(req).then(function(response){
					$localStorage.heroes = response.data;
					deferred.resolve(angular.copy(response.data));
				},
				function(error){
					deferred.reject([]);
				});
			}

			return promise;
		}
		
		

		return heroService;
	} // end HeroService



	angular.module('tourOfHeroesApp').factory('heroService',['$http','$q','$localStorage',HeroService]);

})(window.angular);