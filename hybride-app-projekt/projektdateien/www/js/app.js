// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
// Service um den aktuell ausgewählten Spieltag zu ermitteln
.factory('SpieltagService', function(){

    var spieltagList = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34"];
    var treffer;

    return{

        getSpieltage: function(){
            return spieltagList;
        },
        getSelected: function(spieltag_nr){
            spieltagList.forEach(function(spieltag){
                if(angular.equals(spieltag, spieltag_nr)){
                    // Treffer
                    treffer = spieltag;
                }
            })
            return treffer;
        }

    }

})
// Alle Seiten der App werden konfiguriert
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl',
        onEnter: function($state, Auth){
            if(!Auth.isLoggedIn()){
                $state.go('login');
            }
        }
    })

      .state('app.startseite', {
          cache: false,
          url: '/startseite',
          views: {
              'menuContent': {
                  templateUrl: 'templates/startseite.html',
                  controller: 'StartseiteCtrl'
              }
          }
      })

      .state('app.rangliste', {
          url: '/rangliste',
          views: {
              'menuContent': {
                  templateUrl: 'templates/rangliste.html',
                  controller: 'RanglisteCtrl'
              }
          }
      })

  .state('app.spieltage', {
      url: '/spieltage',
      views: {
        'menuContent': {
            templateUrl: 'templates/spieltage.html',
            controller: 'SpieltageCtrl'
        }
      }
  })

    .state('app.spieltag', {
        url: '/spieltage/:spieltagNr',
        views: {
            'menuContent': {
                templateUrl: 'templates/spieltag.html',
                controller: 'SpieltagCtrl'
            }
        }
    })

    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'AppCtrl'
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
