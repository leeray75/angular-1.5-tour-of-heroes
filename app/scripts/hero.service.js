(function(angular){
"use strict";
	function HeroService($http,$q,$timeout,Hero,filterFilter){
		var $this = this;
		$http.defaults.headers.common
		var heroesHeaders = {
			'Content-Type': 'application/json'
		}
		var heroService = {};
		$this.heroes = [];
		heroService.create = function(heroData){
			var deferred = $q.defer();
			var promise = deferred.promise;
			if($this.heroes.length>0){
				var hero = Hero.create(heroData);
				var heroesIds = $this.heroes.map(function(hero){
					return hero.id;
				})
				heroesIds = heroesIds.sort();
				hero.id = heroesIds[heroesIds.length-1]+1;
				$this.heroes.push(hero);
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
			if($this.heroes.length>0){
				$this.heroes = $this.heroes.filter(function(hero){
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
			if($this.heroes.length>0){
				var idMap = $this.heroes.map(function(hero){
					return hero.id;
				})
				var index = idMap.indexOf(hero.id);

				if(index>-1){
					$this.heroes[index] = hero;
					deferred.resolve({ status: 'success', hero: hero });
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
					deferred.resolve(hero);
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

			if($this.heroes.length>0){
				deferred.resolve($this.heroes);
			}
			else{
				var req = {
					method: 'GET',
					url: 'api/mock-heroes.json',
					headers: heroesHeaders
				}
				$http(req).then(function(response){
					$this.heroes = Hero.create(response.data);
					deferred.resolve($this.heroes);
				},
				function(error){
					deferred.reject([]);
				});
			}

			return promise;
		}

		heroService.search = function(term){
			var deferred = $q.defer();
			var promise = deferred.promise;
			$timeout(function(){
				deferred.resolve(filterFilter($this.heroes,term));
			},100)
			return promise;
		}
		return heroService;
	} // end HeroService

	angular.module('tourOfHeroesApp').factory('heroService',['$http','$q','$timeout','Hero','filterFilter',HeroService]);

})(window.angular);