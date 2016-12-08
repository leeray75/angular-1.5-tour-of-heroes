(function(angular){
"use strict";
	angular.module('tourOfHeroesApp',['ui.router','ngAnimate','ngSanitize','ui.bootstrap','ngStorage']);
	angular.element(document).ready(function() {
		var appEl = document.getElementById("tour-of-heroes-app");
		angular.bootstrap(appEl, ['tourOfHeroesApp']);
	});
})(window.angular)