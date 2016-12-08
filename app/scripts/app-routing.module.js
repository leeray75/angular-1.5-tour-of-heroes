(function(){

	function appRouting($stateProvider){
		var defaultState = {
			name: 'default',
			url: '',
			default: 'dashboard'
		}
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

		$stateProvider.state(defaultState);
		$stateProvider.state(dashboardState);
		$stateProvider.state(heroesState);
		$stateProvider.state(heroDetailsState);
	}
	angular.module('tourOfHeroesApp').config(['$stateProvider',appRouting]);

})(window.angular);