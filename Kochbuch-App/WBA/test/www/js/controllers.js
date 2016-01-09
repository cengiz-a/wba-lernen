angular.module('starter.controllers', [])
//
// In der "controller.js" Werden die in "app.js" erzeugten controller verwendet.
//
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.loginData = {};
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  $scope.login = function() {
    $scope.modal.show();
  };
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
// Hier wird die "vorspeiseList" über die factory "VorspeiseService" an die "Vorspeise.html" übergeben.  
.controller('VorspeiseCtrl', function ($scope, VorspeiseService) {
    $scope.vorspeiseList = VorspeiseService.getAll();
})
// Hier wird die Variable "vName" erstellt.
.controller('VorspeiseDetailCtrl', function ($scope, $stateParams, VorspeiseService) {
    var vName = $stateParams.vorspeiseName;
    $scope.vorspeise = VorspeiseService.getSelected(vName);
    console.log($scope.vorspeise);
})

.controller('HauptspeiseCtrl', function ($scope, HauptspeiseService) {
    $scope.hauptspeiseList = HauptspeiseService.getAll();
})

.controller('HauptspeiseDetailCtrl', function ($scope, $stateParams, HauptspeiseService) {
    var hName = $stateParams.hauptspeiseName;
    $scope.hauptspeise = HauptspeiseService.getSelected(hName);
    console.log($scope.hauptspeise);
})

.controller('NachspeiseCtrl', function ($scope, NachspeiseService) {
    $scope.nachspeiseList = NachspeiseService.getAll();
})

.controller('NachspeiseDetailCtrl', function ($scope, $stateParams, NachspeiseService) {
    var nName = $stateParams.nachspeiseName;
    $scope.nachspeise = NachspeiseService.getSelected(nName);
    console.log($scope.nachspeise);
})

.controller('StartseiteCtrl', function($scope) {
});
