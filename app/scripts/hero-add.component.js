(function(angular){
"use strict";
	function controller(Hero){
		var ctrl = this;
		ctrl.newHero = Hero.create();
		ctrl.save = function(){
			ctrl.onSave({value: ctrl.newHero});
			ctrl.newHero = Hero.create();
		}
	}

	angular.module('tourOfHeroesApp')
	.component('heroAdd',{
		templateUrl: '../templates/hero-add.html',
		controller: ['Hero',controller],
		bindings: {
			onSave: '&'
		}
	});

})(window.angular);