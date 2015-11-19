function hauptController($scope) {
  $scope.hello_world = "Hallo Welt!";

  $scope.studenten = [
    {name: "Jacquelyn Rappenhöner"},
    {name: "Nikolas Beckel"},
    {name: "Peter Parker"},
    {name: "Johannes Reiter"},
    {name: "Marie Marien"}
  ];

  $scope.neuerStudent = function() {
    $scope.studenten.push({
      name: $scope.inpStudent
    });
    // Textfeld leeren
    $scope.Student = '';
  };
}