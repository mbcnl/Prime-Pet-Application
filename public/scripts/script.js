// define an angular module
var myApp = angular.module('myApp', []);

angular.element(document).ready(function () {
    console.log('page loading completed');
});

myApp.controller('showController', ['$scope', "$http", function($scope, $http){
  //retrieve pet records
  $http({
    method: 'GET',
    url: '/getPet',
  }).then(function(response){
    console.log('in getPet, response: ', response.data);
    $scope.petRecords = response.data;
  }, function myError(response){
    console.log(response.statusText);
  }); // end get route
}]);

myApp.controller('addController', ['$scope', "$http", function($scope, $http){
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
      img: $scope.imageIn
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
