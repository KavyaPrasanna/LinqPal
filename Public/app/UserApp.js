var controllersApp = angular.module('UserApp', []);

controllersApp.controller('basicInfoController',function($scope, $http){
  $scope.getList = function() {
    return $http({
        method: 'GET',
        url: 'http://localhost:8088/api/externalusers',
        headers: {'access-token': localStorage.getItem('token')}
    }).then(function(response) {
          $scope.successMsg = response.data.message;
          $scope.users = response.data;
          console.log("Success response "+JSON.stringify(response));
    }).catch(function(err) {
        $scope.errorMsg = err.data.message;
        console.log("Failure response "+JSON.stringify(err));
    });
  }
})

controllersApp.controller('loginController', function($scope, $http, $location ) {
  $scope.login = function(){
    return $http({
        method: 'POST',
        url: 'http://localhost:8088/login',
        data: {
            "email": $scope.email,
            "password": $scope.password
        }
    }).then(function(response) {
          $scope.successMsg = response.data.message;
          $location.path('/list');
          localStorage.setItem('token',response.data.token);
          console.log("Success response "+JSON.stringify(response));
          return;

    }).catch(function(err) {
        $scope.errorMsg = err.data.message;
        console.log("Failure response "+JSON.stringify(err));
    });
  }
})

controllersApp.controller('addUserCtrl', function($scope, $http, $rootScope) {
  $scope.submit = function(){
    return $http({
        method: 'POST',
        url: 'http://localhost:8088/externaluser',
        data: {
            "first_name": $scope.first_name,
            "last_name": $scope.last_name,
            "telephone_number": $scope.telephone_number,
            "address": $scope.address,
            "ssn": $scope.ssn
        }
    }).then(function(response) {
          $scope.successMsg = response.data;
          console.log("Success response "+JSON.stringify(response));
    }).catch(function(err) {
          $scope.errorMsg = err.data;
          console.log("Failure response "+JSON.stringify(err));
    });
  }
})
