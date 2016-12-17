(function(angular){
"use strict";
	function HeroesApiFactory($http,$q,$timeout,Hero,filterFilter){
		var $this = this;
		$http.defaults.headers.common
		var heroesHeaders = {
			'Content-Type': 'application/json'
		}
		var doLookup = true;
		var api = {};
		$this.heroes = [];
		api.create = function(heroData){
			var deferred = $q.defer();
			var promise = deferred.promise;			
			var hero = new Hero(heroData);
			var heroesSort = $this.heroes.sort(function(hero1,hero2){
				return hero1.id>hero2.id;
			});
			var lastHero = heroesSort && heroesSort.length>0 ? heroesSort[heroesSort.length-1] : null;
			hero.id = lastHero ? lastHero.id+1 : 1;
			$this.heroes.push(hero);
			deferred.resolve({ status: 'success', data: angular.copy(hero) });

			return promise;
		}

		api.delete = function(id){
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

		api.update = function(hero){
			var deferred = $q.defer();
			var promise = deferred.promise;
			hero = hero instanceof Hero ? hero : new Hero(hero);
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
		api.getHero = function(id){
			var deferred = $q.defer();
			var promise = deferred.promise;
			id = parseInt(id);
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

		api.getHeroes = function(){
			var deferred = $q.defer();
			var promise = deferred.promise;

			if(!doLookup){
				deferred.resolve($this.heroes);
			}
			else{
				var req = {
					method: 'GET',
					url: 'api/mock-heroes.json',
					headers: heroesHeaders
				}
				$http(req).then(function(response){
					doLookup = false;
					response.data.forEach(function(hero){
						$this.heroes.push(new Hero(hero));
					})
					deferred.resolve($this.heroes);
				},
				function(error){
					deferred.reject([]);
				});
			}

			return promise;
		}

		api.search = function(term){
			var deferred = $q.defer();
			var promise = deferred.promise;
			deferred.resolve(filterFilter($this.heroes,term));
			return promise;
		}
		return api;
	} // end api

	angular.module('tourOfHeroesApp').factory('HeroesApiFactory',['$http','$q','$timeout','Hero','filterFilter',HeroesApiFactory]);

})(window.angular);