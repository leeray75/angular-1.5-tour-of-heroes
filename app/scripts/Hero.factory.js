(function(angular){
"use strict";
	function HeroFactory(){
		var options = {
			id: null,
			name: '',
			location: '',
		}
		var Hero = function(options){
			this.id = options.id ? options.id : null;
			this.name = options.name ? options.name : '';
			this.location = options.location ? options.location : '';
		}
		Hero.prototype.getName = function(){
			return this.name;
		}
		Hero.prototype.getLocation = function(){
			return this.location;
		}
		var getHeroes = function(heroes){
			var _heroes = [];
			heroes.forEach(function(heroData){
				var hero = new Hero(heroData);
				_heroes.push(hero);
			});
			return _heroes;
		}
		return {
			isInstanceOf: function(obj){
				return obj instanceof Hero;
			},
			getOptions: function(){
				return Object.create(options);
			},
			create: function(options){
				if(angular.isArray(options)){
					return getHeroes(options);
				}else{
					if(!options){
						options = this.getOptions();
					}
					return new Hero(options);
				}
			}
		};
	} // end Hero

	angular.module('tourOfHeroesApp').factory('Hero',[HeroFactory]);

})(window.angular);