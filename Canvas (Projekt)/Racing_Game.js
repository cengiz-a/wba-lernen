  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');

  var racer = new Image();
  racer.src = "Batmobile.png";

  var racerX = 0;
  var racerY = 20;
  var highscore = 0;
  var timer = undefined;
  var move = undefined;
  var wallX = [];
  var wallY = [];
  var actLevel = '';

  var introMusic = new Audio('Intro.mp3');
  var muscicPlay = true;
  var hardcore = 0;

  var leftMove = false;
  var rightMove = false;
  var levelFailed = false;
  var levelStarted = false;

  window.onload = function canvasRacerGame() {

      ctx.canvas.width = window.innerWidth - 20;
      ctx.canvas.height = window.innerHeight - 100;

      racerX = (canvas.width / 2) - 20;

      canvas.addEventListener('keydown', doKeyDown, true);
      canvas.addEventListener('keyup', doKeyUp, true);

      levelFailed = true;
      introMusic.play();
      calcLevelOne();

      setInterval(function () {
          rendering();
      }, (10));

  }

  function drawBackground() {

      ctx.beginPath();
      ctx.rect((canvas.width - 500) / 2, 0, 500, canvas.height);
      ctx.fillStyle = 'lightgray';
      ctx.fill();
  }

  function rendering() {
      clearCanvas();
      drawBackground();
      racerMove();
      drawRacer();
      analyzeLevel(actLevel);
      drawLevel();
      collideTest();
  }

  function analyzeLevel(myLevel) {

      switch (myLevel) {
      case 'Credits':
          actLevel = 'Credits';
          drawCredits();
          break;
      default:
          break;
      }
  }

  function calcLevelOne() {

      wallX.length = 0;
      wallY.length = 0;
      wallX[0] = 0;
      wallY[0] = 0;
      var i = 1;
      resetRacer();

      //30 walls straight
      for (i; i < 40; i++) {

          wallX[i] = 0;
          wallY[i] = wallY[i - 1] + 10;
      }
      //20 walls left
      for (i; i < 70; i++) {
          wallX[i] = wallX[i - 1] + 5;
          wallY[i] = wallY[i - 1] + 10;
      }
      //20 walls right
      for (i; i < 100; i++) {
          wallX[i] = wallX[i - 1] - 5;
          wallY[i] = wallY[i - 1] + 10;
      }
  }

  function calcLevelTwo() {

      wallX.length = 0;
      wallY.length = 0;
      wallX[0] = 0;
      wallY[0] = 0;
      var i = 1;
      resetRacer();

      //30 walls straight
      for (i; i < 21; i++) {

          wallX[i] = 0;
          wallY[i] = wallY[i - 1] + 10;
      }
      //20 walls left
      for (i; i < 31; i++) {

          wallX[i] = wallX[i - 1] + 5;
          wallY[i] = wallY[i - 1] + 10;
      }
      // 30 walls right
      for (i; i < 61; i++) {

          wallX[i] = wallX[i - 1] - 5;
          wallY[i] = wallY[i - 1] + 10;
      }

      //20 walls left
      for (i; i < 81; i++) {

          wallX[i] = wallX[i - 1] + 5;
          wallY[i] = wallY[i - 1] + 10;
      }
  }

  function calcLevelRandom() {

      wallX.length = 0;
      wallY.length = 0;
      wallX[0] = 0;
      wallY[0] = 0;

      var i = 1;
      var iOld = 0;
      resetRacer();
      //30 walls straight
      for (i; i < 40; i++) {

          wallX[i] = 0;
          wallY[i] = wallY[i - 1];
          drawWall(wallX[i], wallY[i]);
      }

      iOld = i;
      //20 walls random

      for (var w = 0; w < 20; w++) {

          var xNEW = Math.floor((Math.random() * (5 - (-5)) - 5));

          for (i; i < iOld + 20; i++) {
              if (wallX[i - 1] + xNEW >= 160) {
                  xNEW = -1 * xNEW;
              } else if (wallX[i - 1] + xNEW <= -160) {
                  xNEW = Math.abs(xNEW);
              }
              wallX[i] = wallX[i - 1] + xNEW;
              wallY[i] = wallY[i - 1] + 10;

          }
          iOld = i;
      }
  }


  function drawLevel() {

      for (var i = 0; i < wallX.length; i++) {
          drawWall(wallX[i], wallY[i]);
      }
  }


  function calcLevelHardcore() {

      wallX.length = 0;
      wallY.length = 0;
      wallX[0] = 0;
      wallY[0] = 0;

      var i = 1;
      var iOld = 0;
      resetRacer();
      //30 walls straight
      for (i; i < 40; i++) {

          wallX[i] = 0;
          wallY[i] = wallY[i - 1] + 10;
          drawWall(wallX[i], wallY[i]);
      }

      iOld = i;

      //20 walls random
      for (var w = 1; w < 5; w++) {

          hardcore = Math.floor(highscore / 10) + 3;

          var xNEW = Math.floor((Math.random() * (hardcore - (-hardcore)) + (-hardcore)));

          for (i; i < iOld + 20; i++) {
              if (wallX[i - 1] + xNEW >= 160) {
                  xNEW = -1 * xNEW;
              } else if (wallX[i - 1] + xNEW <= -160) {
                  xNEW = Math.abs(xNEW);
              }
              wallX[i] = wallX[i - 1] + xNEW;
              wallY[i] = wallY[i - 1] + 10;
          }
          iOld = i;
      }
  }

  function randomXNEW() {
      if (hardcore >= 4) {
          var xNEW = Math.floor((Math.random() * (hardcore - (-hardcore)) + (-hardcore)));
          return (xNEW === 0 || xNEW === 1 || xNEW === -1 || xNEW === 2 || xNEW === -2) ? randomXNEW() : xNEW;

      } else if (hardcore >= 5) {
          var xNEW = Math.floor((Math.random() * (hardcore - (-hardcore)) + (-hardcore)));
          return (xNEW === 0 || xNEW === 1 || xNEW === -1 || xNEW === 2 || xNEW === -2 || xNEW === 3 || xNEW === -3) ? randomXNEW() : xNEW;

      } else if (hardcore >= 6) {
          var xNEW = Math.floor((Math.random() * (hardcore - (-hardcore)) + (-hardcore)));
          return (xNEW === 0 || xNEW === 1 || xNEW === -1 || xNEW === 2 || xNEW === -2 || xNEW === 3 || xNEW === -3 || xNEW === 4 || xNEW === -4) ? randomXNEW() : xNEW;

      } else {
          var xNEW = Math.floor((Math.random() * (hardcore - (-hardcore)) + (-hardcore)));
          return xNEW;
      }
  }

  //left and right wall 
  function drawWall(wallX, wallY) {

      ctx.beginPath();
      ctx.moveTo((canvas.width / 2) - 250, wallY);
      ctx.lineTo((canvas.width / 2) - 50 - wallX, wallY);
      ctx.strokeStyle = "black";
      ctx.lineWidth = "5";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 + 250, wallY);
      ctx.lineTo(canvas.width / 2 + 50 - wallX, wallY);
      ctx.stroke();
  }


  function drawLevelFailed() {

      ctx.rect(50, 50, 400, 100);
      ctx.fillStyle = 'red';
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "32px Press Start 2P";
      ctx.fillText("You failed!", 70, 115);
  }

  function drawLevelWon() {

      ctx.rect(50, 50, 400, 100);
      ctx.fillStyle = 'green';
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "32px Press Start 2P";
      ctx.fillText("You won!", 70, 115);

  }

  function drawCredits() {

      wallX.length = 0;
      wallY.length = 0;
      ctx.rect((canvas.width - 500) / 2, 0, 500, canvas.height);
      ctx.fillStyle = 'black';
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.font = "16 px Press Start 2P";
      ctx.fillText("Programming:", (canvas.width - 475) / 2, canvas.height / 2 - 100);
      ctx.fillText("Julian Hardtung ", (canvas.width - 250) / 2, canvas.height / 2 + -75);
      ctx.fillText("Background Music:", (canvas.width - 475) / 2, canvas.height / 2 - 45);
      ctx.fillText("Erik Skiff-HHavok-intro", (canvas.width - 250) / 2, canvas.height / 2 - 15);

      ctx.font = "8 px Press Start 2P";
      ctx.fillText("Ein Projekt im Rahmen des", (canvas.width - 475) / 2, canvas.height / 2 + 300);
      ctx.fillText("Web-basierte-Anwendungen Moduls der", (canvas.width - 475) / 2, canvas.height / 2 + 320);
      ctx.fillText("Technischen Hochschule Koeln Campus Gummersbach", (canvas.width - 475) / 2, canvas.height / 2 + 340);
  }

  function drawRacer() {
      ctx.drawImage(racer, racerX, racerY, 25, 50);
  }

  function resetRacer() {
      racerX = (canvas.width / 2) - 20;
  }

  function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function levelMovement() {

      for (var i = 0; i < wallY.length; i++) {

          wallY[i] = wallY[i + 1] - 10;
          wallX[i] = wallX[i + 1];
      }

      if (wallX[119] === undefined) {
          iOld = 120;

          hardcore = Math.floor(highscore / 10) + 3;
          var xNEW = randomXNEW();

          for (i = 119; i < iOld + 20; i++) {
              if (wallX[i - 1] + xNEW >= 160) {
                  xNEW = -1 * xNEW;
              } else if (wallX[i - 1] + xNEW <= -160) {
                  xNEW = Math.abs(xNEW);
              }
              wallX[i] = wallX[i - 1] + xNEW;
              wallY[i] = wallY[i - 1] + 10;
          }
          iOld = i;
      }

      /*  if (wallY.length === 0) {

          stopLevel();
      } else {
          wallY.length = wallY.length - 1;
          wallX.length = wallX.length - 1;
      }*/
  }

  function startLevel() {
      highscore = 0;
      timer = window.setInterval(highscoreFunction, 1000);
      move = window.setInterval(levelMovement, 100);
      levelFailed = false;
      levelStarted = true;

      if (muscicPlay === false) {
          introMusic.currentTime = 0.0;
          introMusic.play();
          muscicPlay === true;
      }
  }

  function highscoreFunction() {

      highscore = highscore + 1;
      document.getElementById("highscore").innerHTML = "Highscore: " + highscore;
  }

  function stopLevel() {

      window.clearInterval(timer);
      window.clearInterval(move);
      introMusic.pause();
      muscicPlay = false;
      levelStarted = false;
  }

  //FIXME levelWon() triggering
  function collideTest() {

      //collision test bottom side of the car
      if (((canvas.width / 2) - 50 - wallX[7]) >= (racerX)) {

          levelFailed = true;
          drawLevelFailed();
          stopLevel();

      } else if (((canvas.width / 2) + 25 - wallX[7]) <= (racerX)) {

          levelFailed = true;
          drawLevelFailed();
          stopLevel();
      }

      //collision test top side of the car
      else if (((canvas.width / 2) - 50 - wallX[2]) >= (racerX)) {

          levelFailed = true;
          drawLevelFailed();
          stopLevel();
      } else if (((canvas.width / 2) + 25 - wallX[2]) <= (racerX)) {

          levelFailed = true;
          drawLevelFailed();
          stopLevel();
      } else if ((wallX.length === 0 || wallX[0] === undefined)) {

          levelFailed = true;
          analyzeLevel('Won');
          stopLevel();
      }
  }

  function batmanCar() {

      racer.src = "Batmobile.png";
  }

  function redCar() {

      racer.src = "Racer2.png";
  }

  function blueCar() {

      racer.src = "Racer.png";
  }

  //key pressed
  function doKeyDown(e) {

      //X-Axis movement
      if (e.keyCode === 37) {
          leftMove = true;
          rightMove = false;
      }

      if (e.keyCode === 39) {
          leftMove = false;
          rightMove = true;
      }
  }

  function racerMove() {

      if (levelFailed === false) {
          if (leftMove === true) {
              racerX = racerX - 2;
          } else if (rightMove === true) {
              racerX = racerX + 2;
          }
      }
  }

  function doKeyUp(e) {

      //X-Axis movement
      if (e.keyCode === 37) {
          leftMove = false;
          rightMove = false;
      }

      if (e.keyCode === 39) {
          leftMove = false;
          rightMove = false;
      }
  }