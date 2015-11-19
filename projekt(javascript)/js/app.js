function hauptController($scope) {
  // Einfacher String mit dem Inhalt "Hallo Welt"
  $scope.hello_world = "Hallo Welt!";

  // Das Array studenten mit vielen Strings gespeichert in der Variable name
  $scope.studenten = [
    {name: "Jacquelyn Rappenhöner"},
    {name: "Nikolas Beckel"},
    {name: "Peter Parker"},
    {name: "Johannes Reiter"},
    {name: "Marie Marien"}
  ];

// Ein zweites Array gefüllt mit Namen in der Variable name
$scope.studenten2 = [
    {name: "Johannes Otto"},
    {name: "Maria Heidenthal"},
    {name: "Marius Klinkhammer"},
    {name: "Fabian Schmitz"},
    {name: "Julia Windeck"}
  ];

  // Eine Funktion um selbst eingegebene Studenten dem Array studenten2 hinzuzufügen
  $scope.neuerStudent = function() {
    $scope.studenten2.push({
      name: $scope.inpStudent
    });
    // Textfeld leeren
    $scope.inpStudent = '';
  };
}