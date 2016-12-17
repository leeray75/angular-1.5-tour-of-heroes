describe('HeroesApiFactory', function() {
  var HeroesApiFactory, Hero;
  var $q, $scope,$httpBackend;
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
  var originalTimeout;
  beforeEach(angular.mock.module('tourOfHeroesApp'));
  // Before each test set our injected Users factory (_Users_) to our local Users variable
  beforeEach(inject(function(_HeroesApiFactory_,_Hero_,_$rootScope_,_$httpBackend_) {
    HeroesApiFactory = _HeroesApiFactory_;
    Hero = _Hero_;
    $scope = _$rootScope_.$new();
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', 'api/mock-heroes.json').respond(mockHeroes);   
  }));

  afterEach(function() {
     //$httpBackend.verifyNoOutstandingExpectation();
     //$httpBackend.verifyNoOutstandingRequest();
   });

  // A simple test to verify the Users factory exists
  it('should exist', function() {
    expect(HeroesApiFactory).toBeDefined();
  });

  // Test to see if HeroesApiFactory has the function and it returns a promise
  function testExistPromise(func){
    it('should exist',function(){
        expect(HeroesApiFactory[func]).toBeDefined();
    });
    it('should return a promise',function(){ 
      var promise = HeroesApiFactory[func]();
      expect(promise && promise.then).toBeDefined();
    });
  }

  describe('getHeroes()',function(){
    testExistPromise("getHeroes");
    it('should return array of Heroes',function(done){
      HeroesApiFactory.getHeroes().then(function(response){
          expect(response).toEqual(jasmine.any(Array));
          expect(response.length).toEqual(10);
          expect(response[0]).toEqual(jasmine.any(Hero));
          done();
      });
      $httpBackend.flush();
      //$scope.$digest();
    })

  }); // getHeroes
  describe('create()', function() {
    var mockHero = {"name": "Mr. Nice"};
    testExistPromise("create");

    it('should create a Hero',function(done){
        HeroesApiFactory.create(mockHero)
        .then(function(response){
            expect(response.data).toEqual(jasmine.any(Hero));
            expect(response.data.id).not.toEqual(null);
            expect(response.data.name).toEqual("Mr. Nice");
            expect(response.data.location).toEqual("");
            done();
        });
        $scope.$digest();
    }); // 'should create a Hero'
  }); // end create()

  describe('update()',function(){
    var mockHero = {"id": 11, "name": "Mr. Nice 2", "location": "NYC"};
    testExistPromise("update");
    it('should update a Hero',function(done){        
        HeroesApiFactory.getHeroes().then(function(response){
          HeroesApiFactory.update(mockHero)
          .then(function(response){
              expect(response.hero).toEqual(jasmine.any(Hero));
              expect(response.hero.id).toEqual(mockHero.id);
              expect(response.hero.name).toEqual(mockHero.name);
              expect(response.hero.location).toEqual(mockHero.location);
              done();
          });
        });
        $httpBackend.flush();
        //$scope.$digest();
    }); 

  }) // update()
  describe('getHero()',function(){
    var heroId = 11;
    testExistPromise("getHero");
    it('should get a Hero with id: '+heroId,function(done){        
        HeroesApiFactory.getHeroes().then(function(response){
          HeroesApiFactory.getHero(heroId)
          .then(function(hero){
              expect(hero).toEqual(jasmine.any(Hero));
              expect(hero.id).toEqual(heroId);
              done();
          });
        });
        $httpBackend.flush();
        //$scope.$digest();
    }); 

  }) // getHero()

  describe('search()',function(){
    var term= 'ma';
    testExistPromise("search");
    it('should get a Array of Heroes with term: '+term, function(done){        
        HeroesApiFactory.getHeroes().then(function(response){
          HeroesApiFactory.search(term)
          .then(function(heroes){
              expect(heroes).toEqual(jasmine.any(Array));
              expect(heroes.length).toEqual(4);
              expect(heroes[0]).toEqual(jasmine.any(Hero));
              done();
          });
          
        });
        $httpBackend.flush();
        //$scope.$digest();
    }); 

  }) // search()

});