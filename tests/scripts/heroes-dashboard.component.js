describe('component: heroesDashboard', function() {
  var Hero,HeroesApiFactory,controller;
  var $componentController,$q,$scope;
  var mockHeroes = [
        {"id": 11, "name": "Mr. Nice"},
        {"id": 12, "name": "Narco"},
        {"id": 13, "name": "Bombasto"},
        {"id": 14, "name": "Celeritas"},
        {"id": 15, "name": "Magneta"},
        {"id": 16, "name": "RubberMan"},
        {"id": 17, "name": "Dynama"},
        {"id": 18, "name": "Dr IQ"},
        {"id": 19, "name": "Magma"},
        {"id": 20, "name": "Tornado"}
    ];
  beforeEach(angular.mock.module('tourOfHeroesApp'));
  beforeEach(inject(function(_Hero_,_HeroesApiFactory_,_$componentController_,_$q_,_$rootScope_) {
    $q = _$q_;
    $scope = _$rootScope_.$new();
    $componentController = _$componentController_;
    Hero = _Hero_;
    HeroesApiFactory = _HeroesApiFactory_;
  }));
  beforeEach(function(){
      controller = $componentController('heroesDashboard');
      spyOn(HeroesApiFactory, "getHeroes").and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve(mockHeroes);
          return deferred.promise;
      });
  });

  it('Controller should exist', function() {
    expect(controller).toBeDefined();
  });

  it('should have topHeroes',function(){
    controller.$onInit();
    $scope.$digest();
    expect(controller.topHeroes).toBeDefined();
    expect(controller.topHeroes).toEqual(jasmine.any(Array));
    expect(controller.topHeroes.length).toEqual(4);
  });

  it('should have newHeroes',function(){
    controller.$onInit();
    $scope.$digest();
    expect(controller.newHeroes).toBeDefined();
    expect(controller.newHeroes).toEqual(jasmine.any(Array));
    expect(controller.newHeroes.length).toEqual(4);
    expect(controller.newHeroes[0]).toEqual(mockHeroes[mockHeroes.length-1]);
  });

});