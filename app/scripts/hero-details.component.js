(function(angular){
"use strict";
	function controller($scope,$state,heroService){	
		var ctrl = this;
		ctrl.hero = null;
		ctrl.isEdit = false;
		this.$onInit = function(){
			var id = parseInt($state.params.id);
			heroService.getHero(id).then(function(hero){
				ctrl.hero = hero;
			},
			function(error){
				console.warn("no hero found");
			})
		};
		ctrl.edit = function(){
			ctrl.isEdit = true;
		}
		ctrl.goBack = function(){
			window.history.back();
		}
		ctrl.save = function(param,hero){
			if(hero && hero.id){
				heroService.update(hero).then(function(response){
					ctrl.hero = response.hero;
				},
				function(error){
					console.warn("failed to save hero",error)
				})
			}
		}
	}


	angular.module('tourOfHeroesApp')
	.component('heroDetails',{
		templateUrl: '../templates/hero-details.html',
		controller: ['$scope','$state','heroService',controller]
	});


})(window.angular);