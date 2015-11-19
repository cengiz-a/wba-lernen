angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, $http, Auth, $ionicPopup) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});


    // Alert Methode

    $scope.showAlert = function (titel, nachricht) {
        var alertPopup = $ionicPopup.alert({
            title: titel,
            template: nachricht
        });
        alertPopup.then(function (res) {
            
        });
    };

    // @@ Login @@

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {

        if(!angular.isDefined($scope.loginData.username) || !angular.isDefined($scope.loginData.password) || $scope.loginData.username.trim() == "" || $scope.loginData.password.trim() == ""){
            alert("Bitte geben Sie Benutzername und Passwort ein!");
            return;
        } else{
            // Username und Passwort überprüfen

            $http.get('http://lolchamp.suhail.uberspace.de/tippspiel/checkUserData.php?username=' + $scope.loginData.username.trim() + '&passwort=' + $scope.loginData.password.trim()).then(function (response) {

                if (response.data == "login_done") {
                    // Loginvorgang erfolgreich
                    Auth.setUser({
                        username: $scope.loginData.username
                    });

                    $state.go("app.startseite");
                }
                else if (response.data == "error01") {
                    // Username und Passwort wurden nicht korrekt übermittelt
                    $scope.showAlert("Login Fehlgeschlagen!", "Etwas lief schief, versuche es später nochmal!");
                    return;
                }
                else if (response.data == "error02") {
                    // Keine Verbindung zur Datenbank
                    $scope.showAlert("Login Fehlgeschlagen!", "Die Verbindung zur Datenbank ist gescheitert, versuche es später nochmal!");
                    return;
                }
                else if (response.data == "error03") {
                    // Benutzername wurde nicht gefunden
                    $scope.showAlert("Login Fehlgeschlagen!", "Der Benutzername wurde nicht gefunden!");
                    return;
                }
                else if (response.data == "error04") {
                    // Das Passwort ist falsch
                    $scope.showAlert("Login Fehlgeschlagen!", "Das Passwort ist falsch!");
                    return;
                }

            })
        }

    };

    // Perform the logout
    $scope.logout = function () {
        Auth.logout();
        $state.go("login");
    };
})

.controller('StartseiteCtrl', function ($scope, $http, Auth) {

    // Benutzernamen und letztes Logindatum holen

    $http.get('http://lolchamp.suhail.uberspace.de/tippspiel/getUserData.php?name=' + Auth.getUser().username).then(function (response) {
        var data = response.data;
        var split = data.split(" ");
        $scope.username = split[0];
        var datum = split[1].split(" ")[0];
        var splittedDatum = datum.split("-");
        var jahr = splittedDatum[0];
        var monat = splittedDatum[1];
        var tag = splittedDatum[2];
        $scope.zuletzt_online = tag + "." + monat + "." + jahr;
    })

    // Kommende und vergangende Spieltage holen

    $http.get('http://lolchamp.suhail.uberspace.de/tippspiel/getStartData.php?username=' + Auth.getUser().username).then(function (response) {
        var data = response.data;
        $scope.vergangenespieltage = new Array();
        $scope.kommendespieltage = new Array();
        data.forEach(function (spieltag) {
            if (spieltag.typ == "punkte") {
                $scope.vergangenespieltage.push(spieltag);
            }
            else if (spieltag.typ == "spielegetippt") {
                $scope.kommendespieltage.push(spieltag);
            }
        })
    })

})

.controller('RanglisteCtrl', function ($scope, $http, $timeout) {

    // Benutzerdaten holen

    $http.get('http://lolchamp.suhail.uberspace.de/tippspiel/getRankingData.php').then(function (response) {
        $scope.data = response.data;
        for (var i = 0; i < $scope.data.length; i++) {
            $scope.data[i].platzierung = i+1;
        }
    })

    // Daten aktualisieren

    $scope.doRefresh = function () {

        $timeout(function () {

            $http.get('http://lolchamp.suhail.uberspace.de/tippspiel/getRankingData.php').then(function (response) {
                $scope.data = response.data;
                for (var i = 0; i < $scope.data.length; i++) {
                    $scope.data[i].platzierung = i + 1;
                }
            })
            $scope.$broadcast("scroll.refreshComplete");

        }, 1000)

    }



})

.controller('SpieltageCtrl', function($scope, $http, SpieltagService){

    // Spieltage aus OpenLigaDB holen

    $http.get('http://www.openligadb.de/api/getmatchdata/bl1/2015').then(function (response) {
        var data = response.data;
        $scope.spieltagData = new Array();
        for(var i = 0; i < 306; i+=9){
            $scope.spieltagData.push({
                "nr": (i/9)+1, 
                "startDateTime": data[i].MatchDateTime,
                "finished": data[i+8].MatchIsFinished
            });
        }
    })

})

.controller('SpieltagCtrl', function ($scope, $state, $stateParams, $http, $ionicPopup, SpieltagService, Auth){

    var spieltagNr = $stateParams.spieltagNr;
    $scope.spieltag = SpieltagService.getSelected(spieltagNr);

    // Spieltaginfos aus OpenLigaDB holen

    $scope.spieltagData = new Array();

    $http.get('http://www.openligadb.de/api/getmatchdata/bl1/2015/' + spieltagNr).then(function (response) {

        var data = response.data;
        for (var i = 0; i < 9; i++) {
            data[i].Team1.TeamName = data[i].Team1.TeamName.replace("Bayer 04 Leverkusen", "Leverkusen");
            data[i].Team1.TeamName = data[i].Team1.TeamName.replace("TSG 1899 Hoffenheim", "Hoffenheim");
            data[i].Team1.TeamName = data[i].Team1.TeamName.replace("Borussia M\u00F6nchengladbach", "M'Gladbach");
            data[i].Team1.TeamName = data[i].Team1.TeamName.replace("Borussia Dortmund", "Dortmund");
            data[i].Team1.TeamName = data[i].Team1.TeamName.replace("Eintracht Frankfurt", "Frankfurt");

            data[i].Team2.TeamName = data[i].Team2.TeamName.replace("Bayer 04 Leverkusen", "Leverkusen");
            data[i].Team2.TeamName = data[i].Team2.TeamName.replace("TSG 1899 Hoffenheim", "Hoffenheim");
            data[i].Team2.TeamName = data[i].Team2.TeamName.replace("Borussia M\u00F6nchengladbach", "M'Gladbach");
            data[i].Team2.TeamName = data[i].Team2.TeamName.replace("Borussia Dortmund", "Dortmund");
            data[i].Team2.TeamName = data[i].Team2.TeamName.replace("Eintracht Frankfurt", "Frankfurt");

        }
        $scope.spieltagData = data;

        // Tipps laden

        $scope.load = function () {
            var loadData = [Auth.getUser().username];

            $scope.spieltagData.forEach(function (spiel) {
                loadData.push(spiel.MatchID);
            })

            $http.get('http://lolchamp.suhail.uberspace.de/tippspiel/loadTipps.php?data=' + loadData.toString()).then(function (response) {
                var json = response.data.substr(0, response.data.length - 1);
                json = eval('(' + json + ')');

                json.forEach(function (tipp) {
                    $scope.spieltagData.forEach(function (spiel) {
                        if (tipp.matchID == spiel.MatchID) {
                            spiel.heimtore = tipp.heimtore;
                            spiel.gasttore = tipp.gasttore;
                        }
                    })
                })
            })
        }();

    })

    

    // Tipps speichern

    $scope.showAlert = function (titel, nachricht) {
        var alertPopup = $ionicPopup.alert({
            title: titel,
            template: nachricht
        });
        alertPopup.then(function (res) {
            $state.go("app.spieltage");
        });
    };

    $scope.save = function () {

        var tipps = new Array();

        $scope.spieltagData.forEach(function (spiel) {
            tipps.push({ "Benutzer": Auth.getUser().username, "MatchID": spiel.MatchID, "Heimtore": spiel.heimtore, "Gasttore": spiel.gasttore });
        })

        $http.get('http://lolchamp.suhail.uberspace.de/tippspiel/saveTipps.php?data=' + JSON.stringify(tipps)).then(function (response) {
            if (response.data.match("tipps_gespeichert") && !response.data.match("error")) {
                $scope.showAlert("Gespeichert!", "Alle Spiele gespeichert!");
            }
            else if (response.data.match("tipps_gespeichert") && response.data.match("error")) {
                var count = (response.data.match(/error/g) || []).length;
                $scope.showAlert("Gespeichert!", 9 - count + "/9 Spiele gespeichert!");
            }
            else {
                $scope.showAlert("Fehlgeschlagen!", "Es wurden keine Spiele gespeichert!");
            }
        })

    }

});
