//Nutzen sie die ng-Cordova Dokumentation http://ngcordova.com/docs/

angular.module('ionicApp', ['ionic', 'ngCordova'])

.controller('AppCtrl', function ($scope, $cordovaCamera, $cordovaFile) {

    ionic.Platform.ready(function () {
        navigator.splashscreen.hide();
    });

    $scope.takePicture = function () {
        //Definieren sie die options der Camera 
        // Qualität 75
        //Größe 300x300px
            
        
        


        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    };

    $scope.valid = true;

    
    $scope.onTouch = function (item, event) {
        var user = this.user;
        var pass = this.pass;

        if (user === "Curryking" && pass === "hallo") {
            $scope.valid = true;
            alert("Herzlichen Glückwunsch "+user+" du bist drin!");
        } else {
            $scope.valid = false;
        }
    
    };

    $scope.focused = function () {
       $scope.isFocus=true;
    }

    $scope.blurred = function () {
        $scope.isFocus=false;
    }



});

window.addEventListener("orientationchange", function () {
    // Announce the new orientation number
    if (window.orientation === 90) {
        alert("Dreh das Ding zurrück du Eierkopp, das ist für Landscape nicht optimiert!");
    }
}, false);