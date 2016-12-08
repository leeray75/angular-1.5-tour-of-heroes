(function(){

	function controller($scope){
		var ctrl = this;
		ctrl.heroName = '';
		ctrl.save = function(){
			ctrl.onSave({value: ctrl.heroName});
			ctrl.heroName = "";
		}
	}


	angular.module('tourOfHeroesApp')
	.component('heroAdd',{
		templateUrl: '../templates/hero-add.html',
		controller: ['$scope',controller],
		bindings: {
			onSave: '&'
		}
	});
	

})(window.angular);