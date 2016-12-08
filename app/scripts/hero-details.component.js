(function(){
	function controller($scope,$state,heroService){	
		var ctrl = this;
		ctrl.hero = null;

		this.$onInit = function(){
			var id = parseInt($state.params.id);
			heroService.getHero(id).then(function(hero){
				console.log("hero:", hero);
				ctrl.hero = hero;
			},
			function(error){
				console.warn("no hero found");
			})
		};

		ctrl.save = function(){
			heroService.update($scope.hero).then(function(response){
				console.log("successfully saved hero",response);
				ctrl.goBack();
			},
			function(error){
				console.warn("failed to save hero",error)
			})
		}

		ctrl.goBack = function(){
			window.history.back();
		}
	}


	angular.module('tourOfHeroesApp')
	.component('heroDetails',{
		templateUrl: '../templates/hero-details.html',
		controller: ['$scope','$state','heroService',controller]
	});


})(window.angular);