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
    console.log('in getInput, petToSend: ', petToSend);

    // post route to create data
    $http({
      method: 'POST',
      url: '/createPet',
      data: petToSend
    }); // end post route
  }; // end getInput
}]); // end addController

myApp.controller('showController', ['$scope', '$http', function($scope, $http){
    //retrieve pet records
    $http({
      method: 'GET',
      url: '/getPet',
    }).then(function(response){
      $scope.petRecords = response.data;
    }, function myError(response){
      console.log(response.statusText);
    }); // end get route
}]); // end showController

myApp.controller('deleteController', ['$scope', '$http', function($scope, $http){
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
