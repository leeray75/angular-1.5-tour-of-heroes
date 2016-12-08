(function(){

	function appRouting($stateProvider,$urlRouterProvider){

		var dashboardState = {
			name: 'dashboard',
			url: '/dashboard',
			template: '<heroes-dashboard id="heroes-dashboard"></heroes-dashboard>'
		}
		var heroesState = {
			name: 'heroes',
			url: '/heroes',
			template: '<heroes-list id="heroes-list"></heroes-list>'
		}

		var heroDetailsState = {
			name: 'hero-details',
			url: '/hero-details/:id',
			template: '<hero-details id="hero-details"></hero-details>'
		}

		$stateProvider.state(dashboardState);
		$stateProvider.state(heroesState);
		$stateProvider.state(heroDetailsState);
		$urlRouterProvider.when('', '/dashboard');
	}
	angular.module('tourOfHeroesApp').config(['$stateProvider','$urlRouterProvider',appRouting]);
})(window.angular);