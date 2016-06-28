// define an angular module
var myApp = angular.module('myApp', ['ui.router']);

// router to change application views based on state of application
myApp.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'partials/home.html'
    })
    .state('add', {
      url: '/add',
      templateUrl: 'partials/add-pet.html'
    })
    .state('view', {
      url: '/view',
      templateUrl: 'partials/view-pets.html'
    });
}); // end route config

// addController to create new pets
myApp.controller('addController', ['$scope', '$http', function($scope, $http){
  $scope.petRecords = [];
  // ng-click function to add pet
  $scope.getInput = function(){
    event.preventDefault();
    console.log('getInput button clicked');
    // get the user input and store in object
    var petToSend = {
      name: $scope.nameIn,
      type: $scope.typeIn,
      age: $scope.ageIn,
      bio: $scope.bioIn,
      img: $scope.imgIn
    }; // end petToSend
    // post route to create data
    $http({
      method: 'POST',
      url: '/createPet',
      data: petToSend
    }); // end post route
    // clears input fields
    $scope.nameIn = '';
    $scope.typeIn = '';
    $scope.ageIn = '';
    $scope.bioIn = '';
    $scope.imgIn = '';
  }; // end getInput
}]); // end addController

// showController to display all pets from db
myApp.controller('showController', ['$scope', '$http', function($scope, $http){
    //retrieve pet records
    $scope.getPets = function(){
      $http({
        method: 'GET',
        url: '/getPet',
      }).then(function(response){
        $scope.petRecords = response.data;
      }, function myError(response){
        console.log(response.statusText);
      }); // end get route
    }; // end getPets
}]); // end showController

myApp.controller('deleteController', ['$scope', '$http', function($scope, $http){
  // delete pet from db on ng-click
  $scope.deletePet = function(index){
    var petToDelete = $scope.petRecords[index];
    $scope.petRecords.splice(index, 1);
    var petId = {
      id: petToDelete._id
    }; // end petId object

    // post route to update data
    $http({
      method: 'POST',
      url: '/deletePet',
      data: petId
    }); // end post route
  }; // end deletePet
}]);

// directive to alert user of successful addition of new animal
myApp.directive('ngConfirmClick', [function(){
  return{
    link: function (scope, element, attr){
      var msg = attr.ngConfirmClick || "Are you sure?";
      var clickAction = attr.confirmedClick;
      element.bind('click',function(event){
        if(window.confirm(msg)){
          scope.$eval(clickAction);
        }
      });
    }
  };
}]);
