(function(){
	function controller($scope,$state,heroService){	
		vm = this;
		$scope.hero = null;

		this.$onInit = function(){
			var id = parseInt($state.params.id);
			heroService.getHero(id).then(function(hero){
				console.log("hero:", hero);
				$scope.hero = hero;
			},
			function(error){
				console.warn("no hero found");
			})
		};

		$scope.save = function(){
			heroService.update($scope.hero).then(function(response){
				console.log("successfully saved hero",response);
				$scope.goBack();
			},
			function(error){
				console.warn("failed to save hero",error)
			})
		}

		$scope.goBack = function(){
			window.history.back();
		}
	}


	angular.module('tourOfHeroesApp')
	.component('heroDetails',{
		templateUrl: '../templates/hero-details.html',
		controller: ['$scope','$state','heroService',controller]
	});


})(window.angular);