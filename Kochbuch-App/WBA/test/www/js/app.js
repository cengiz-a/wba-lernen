angular.module('starter', ['ionic', 'starter.controllers'])
//
// In der "app.js" werden die verwendeten hier unter dem Teil: ".config" alle templates mit dem controller und der dazugehörigen
// JavaScript Funktion verknüpft.
// Hier wird auch die Detail-Ausgabe für jedes Rezept gespeichert und weitergegeben.
// Die Login-Funktion ist von ionic bereits vorgegeben, wird von uns aber nicht benutzt. Dennoch führte das entfernen zu Problemen.
// dies ist auch der Grund warum das Template noch vorhanden ist.
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
//
// In ".factory" sind die speziellen Attribute gespeichert, die beim Aufrufen eines Rezeptes wiedergegeben werden. 
// Dazu wird hier eine "vorspeiseList" erstellt die beliebig gefüllt werden kann.
// Diese Daten werden nun über "vorspeiseDetail.html" ausgegeben.
//
.factory('VorspeiseService', function () {
    var vorspeiseList = ["Tomatensalat", "Kraeuterbaguette"];
    // Hier werden die Informationen, die später auf der Seite stehen sollen, editiert. 
    var vorspeiseList = [
        {
            name: "Tomatensalat",
            txt1: "Zubereitung",
            txt2: "Arbeitszeit: ca. 10 Min., Schwierigkeitsgrad: simpel, Kalorien p. P.: keine Angabe",
            txt3: "Die Tomaten waschen, den Stielansatz entfernen und die Tomaten in kleine Wuerfel schneiden. Balsamico in eine Schuessel geben, das Olivenoel dazugeben und gut verruehren. Honig, Salz und Pfeffer dazugeben. Die Basilikumblaetter waschen, klein schneiden und unterruehren. Die geschnittenen Tomaten in die Vinaigrette geben und vermischen.",
            img: "http://static.chefkoch-cdn.de/ck.de/rezepte/202/202028/721346-960x720-tomatensalat.jpg"
        },
        {
            name: "Kraeuterbaguette",
            txt1: "Zubereitung",
            txt2: "Arbeitszeit: ca. 10 Min., Schwierigkeitsgrad: simpel, Kalorien p. P.: ca. 443 kcal",
            txt3: "Baguettebroetchen einschneiden. Butter geschmeidig ruehren. Knoblauchzehe abziehen, fein wuerfeln und mit der Petersilie unter die Butter ruehren. Mit Salz wuerzen. In die Broetcheneinschnitte streichen. Die Broetchen auf ein Backblech legen und im vorgeheizten Backofen auf 200 Grad ca. 5 Minuten backen.",
            img: "http://static.chefkoch-cdn.de/ck.de/rezepte/96/96916/826192-960x720-kraeuterbaguette.jpg"
        }
    ];
    var treffer;
    return {
        getAll: function () {
            return vorspeiseList;
        },
        getSelected: function (vorspeise_name) {
            vorspeiseList.forEach(function (vobject) {
                if (angular.equals(vobject.name, vorspeise_name)) {
                    console.log("treffer: " + vorspeise_name);
                    treffer = vobject;
                }
            })
            return treffer;
        }
    };
})

.factory('HauptspeiseService', function () {
    var hauptspeiseList = ["Herbstpizza", "Spaghetti Carbonara"];
    var hauptspeiseList = [
        {
            name: "Herbstpizza",
            txt1: "Zubereitung",
            txt2: "Arbeitszeit: ca. 25 Min., Schwierigkeitsgrad: normal, Kalorien p. P.: keine Angabe",
            txt3: "Fuer den Teig die Hefe zerbroeseln und zusammen mit dem Honig in 250 ml lauwarmem Wasser aufloesen. Das Mehl in eine Schuessel geben und eine Mulde formen. Das Hefewasser, das Olivenoel und das Salz hineingeben und alles zu einem glatten Teig verkneten. Den Teig zugedeckt fuer 30 - 40 Minuten an einem warmen Ort gehen lassen. Aus dem Teig zwei runde Pizzen formen und auf je ein Backblech legen. Den Schmand auf den beiden Pizzen verstreichen. Die Birne schaelen, vierteln, entkernen, in Spalten schneiden und auf den Pizzen verteilen. Die Pizzen bei 200 Grad Celsius (Umluft) fuer 15 Minuten in den Backofen geben. Die Pizzen herausnehmen und mit dem in Ringen geschnittenen Lauch, der Salami und dem in Scheiben geschnittenen Camembert belegen. Mit Fleur de Sel und Pfeffer wuerzen und nochmals fuer 10 Minuten in den Backofen geben.",
            img: "http://static.chefkoch-cdn.de/ck.de/rezepte/181/181018/313065-960x720-herbst-pizza.jpg"
        },
        {
            name: "Spaghetti Carbonara",
            txt1: "Zubereitung",
            txt2: "Arbeitszeit: ca. 5 Min., Koch-/Backzeit: ca. 10 Min., Schwierigkeitsgrad: simpel, Kalorien p. P.: keine Angabe",
            txt3: "Schinkenwuerfel im Oel anbraten. Waehrenddessen Spaghetti kochen und Eigelb mit Sahne und Parmesan verquirlen, salzen und gut pfeffern. Eimasse schnell mit den gekochten, abgetropften Spaghetti und den krossen Schinken- oder Speckwuerfeln mischen. Ich fuelle dazu die abgetropften Spaghetti (die ruhig noch ein bisschen feucht sein koennen) wieder in den heissen Topf und stelle ihn wieder auf die ausgeschaltete Kochstelle. Dort wird alles nur so lange vermischt, bis das Eigelb bindet. Nicht zu lange ruehren, sonst erhaelt man ein Ruehrei. Noch einmal gut mit Salz und Pfeffer abschmecken.",
            img: "http://static.chefkoch-cdn.de/ck.de/rezepte/81/81412/667616-960x720-koelkasts-spaghetti-carbonara.jpg"   
    }
    ];
    var treffer;
    return {
        getAll: function () {
            return hauptspeiseList;
        },
        getSelected: function (hauptspeise_name) {
            hauptspeiseList.forEach(function (hobject) {
                if (angular.equals(hobject.name, hauptspeise_name)) {
                    console.log("treffer: " + hauptspeise_name);
                    treffer = hobject;
                }
            })
            return treffer;
        }
    };
})

.factory('NachspeiseService', function () {
    var nachspeiseList = ["Kaesekuchen", "Zitronen Frozen Joghurt - Eis"];
    var nachspeiseList = [
        {
            name: "Kaesekuchen",
            txt1: "Zubereitung",
            txt2: "Arbeitszeit: ca. 20 Min., Schwierigkeitsgrad: simpel, Kalorien p. P.: keine Angabe",
            txt3: "Quark, Eigelbe, Zucker und Puddingpulver gut verruehren und die sehr steif geschlagenen Eiweisse unterziehen. Diese Masse in eine gut gefettete Springform fuellen. Eine Stunde bei mittlerer Hitze (ca. 175 Grad Celsius) backen. Den Kuchen aus dem Ofen nehmen und 5 - 10 min. stehen lassen. Zum Auskuehlen auf das Gesicht legen.",
            img: "http://static.chefkoch-cdn.de/ck.de/rezepte/126/126828/693558-960x720-kaesekuchen.jpg"
        },
        {
            name: "Zitronen Frozen Joghurt - Eis",
            txt1: "Zubereitung",
            txt2: "Arbeitszeit: ca. 5 Min., Schwierigkeitsgrad: simpel, Kalorien p. P.: keine Angabe",
            txt3: "Alle Zutaten zusammenmischen und in eine Eismaschine geben. Danach in einem Kunststoffbehaelter verschlossen mindestens 10 Stunden bis zum Verzehr gefrieren lassen. Wer keine Eismaschine hat, friert das Eis im Kunststoffbehaelter fuer 3 Stunden ein. Dann wird das halbgefrorene Eis durchgeschlagen. Das wiederholt sich ca. 4-6 Mal, damit das Eis richtig cremig wird. Tipp: Dazu marinierte Beeren servieren.",
            img: "http://static.chefkoch-cdn.de/ck.de/rezepte/176/176845/621143-960x720-zitronen-frozen-joghurt-eis.jpg"
        }
    ];
    var treffer;
    return {
        getAll: function () {
            return nachspeiseList;
        },
        getSelected: function (nachspeise_name) {
            nachspeiseList.forEach(function (nobject) {
                if (angular.equals(nobject.name, nachspeise_name)) {
                    console.log("treffer: " + nachspeise_name);
                    treffer = nobject;
                }
            })
            return treffer;
        }
    };
})
//
// In ".config" werden die einzelnen templates mit dem "controller.js" verknüpft.
//
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

.state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
})

.state('app.Vorspeise', {
     url: '/Vorspeise',
     views: {
         'menuContent': {
             templateUrl: 'templates/Vorspeise.html',
             // In "controller.js" kann nun der controller "VorspeiseCtrl"
             controller: 'VorspeiseCtrl'
         }
     }
 })

.state('app.Hausptspeise', {
     url: '/Hauptspeise',
     views: {
         'menuContent': {
             templateUrl: 'templates/Hauptspeise.html',
             controller: 'HauptspeiseCtrl'
         }
     }
})

.state('app.Nachspeise', {
     url: '/Nachspeise',
     views: {
         'menuContent': {
             templateUrl: 'templates/Nachspeise.html',
             controller: 'NachspeiseCtrl'
         }
     }
})

.state('app.VorspeiseDetail', {
    url: '/Vorspeise/:vorspeiseName',
    views: {
        'menuContent': {
            templateUrl: 'templates/vorspeiseDetail.html',
            controller: 'VorspeiseDetailCtrl'
        }
    }
})

.state('app.hauptspeiseDetail', {
    url: '/Hauptspeise/:hauptspeiseName',
    views: {
        'menuContent': {
            templateUrl: 'templates/hauptspeiseDetail.html',
            controller: 'HauptspeiseDetailCtrl'
        }
    }
})

.state('app.nachspeiseDetail', {
    url: '/Nachspeise/:nachspeiseName',
    views: {
        'menuContent': {
            templateUrl: 'templates/nachspeiseDetail.html',
            controller: 'NachspeiseDetailCtrl'
        }
    }
})
//
// Die Hauptfunktion der Startseite besteht darin, den User nicht sofort die Auswahlmöglichkeit vorzusetzten.
// 
.state('app.Startseite', {
    url: '/Startseite',
    views: {
        'menuContent': {
            templateUrl: 'templates/Startseite.html',
            controller: 'StartseiteCtrl'
        }
    }
})

$urlRouterProvider.otherwise('/app/Startseite');
});
