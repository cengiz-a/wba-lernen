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
  var mute = false;



  //starting the Game
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

  //background (plane grey field)
  function drawBackground() {

      ctx.beginPath();
      ctx.rect((canvas.width - 500) / 2, 0, 500, canvas.height);
      ctx.fillStyle = 'lightgray';
      ctx.fill();
  }


  //rendering routine
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


  //calculation of wallX[] wallY[] for level 1
  function calcLevelOne() {

      //resetting old  wall Array
      wallX.length = 0;
      wallY.length = 0;
      wallX[0] = 0;
      wallY[0] = 0;
      var i = 1;

      //resetting old racerposition
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


  //calculation of wallX[] and wallY[] for Level 2
  function calcLevelTwo() {


      //resetting old wall Arrays
      wallX.length = 0;
      wallY.length = 0;
      wallX[0] = 0;
      wallY[0] = 0;
      var i = 1;
      //resetting old racer position
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

  //calculation of wallX[] and wallY[] for Level Random
  function calcLevelRandom() {

      //resetting old wall Array
      wallX.length = 0;
      wallY.length = 0;
      wallX[0] = 0;
      wallY[0] = 0;

      var i = 1;
      var iOld = 0;

      //resetting old racer position
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

          //random number between -5 and 5
          var xNEW = Math.floor((Math.random() * (5 - (-5)) - 5));

          //calculate 20 walls with random number
          for (i; i < iOld + 20; i++) {
              // check if the random wall would draw too far right
              if (wallX[i - 1] + xNEW >= 160) {
                  xNEW = -1 * xNEW;
                  // chck if the wall would draw too far left
              } else if (wallX[i - 1] + xNEW <= -160) {
                  xNEW = Math.abs(xNEW);
              }
              // save the new calculated walls
              wallX[i] = wallX[i - 1] + xNEW;
              wallY[i] = wallY[i - 1] + 10;

          }
          iOld = i;
      }
  }

  function calcLevelHardcore() {

      //resetting old wall Arrays
      wallX.length = 0;
      wallY.length = 0;
      wallX[0] = 0;
      wallY[0] = 0;

      var i = 1;
      var iOld = 0;

      //resetting old racer position
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

          //rounded random number between -(highscore/10) and (highscore/10)
          var xNEW = Math.floor((Math.random() * (hardcore - (-hardcore)) + (-hardcore)));

          //calculate 20 walls with random number
          for (i; i < iOld + 20; i++) {
              //check if wall would draw too far right
              if (wallX[i - 1] + xNEW >= 160) {
                  //invert XNEW
                  xNEW = -1 * xNEW;
                  //check if wall would draw too far left
              } else if (wallX[i - 1] + xNEW <= -160) {
                  xNEW = Math.abs(xNEW);
              }

              //save the calculated walls
              wallX[i] = wallX[i - 1] + xNEW;
              wallY[i] = wallY[i - 1] + 10;
          }
          iOld = i;
      }
  }


  //calculates a random XNEW value 
  function randomXNEW() {

      //if the hardcore variable is higher or = 4 then XNEW is higher than 2 or lower than -2
      if (hardcore >= 4) {
          var xNEW = Math.floor((Math.random() * (hardcore - (-hardcore)) + (-hardcore)));
          return (xNEW === 0 || xNEW === 1 || xNEW === -1 || xNEW === 2 || xNEW === -2) ? randomXNEW() : xNEW;

      }
      //if the hardcore variable is higher or = 5 then XNEW is higher than 3 or lower than -3
      else if (hardcore >= 5) {
          var xNEW = Math.floor((Math.random() * (hardcore - (-hardcore)) + (-hardcore)));
          return (xNEW === 0 || xNEW === 1 || xNEW === -1 || xNEW === 2 || xNEW === -2 || xNEW === 3 || xNEW === -3) ? randomXNEW() : xNEW;

      }
      //if the hardcore variable is higher or = 6 then XNEW is higher than 4 or lower than -4
      else if (hardcore >= 6) {
          var xNEW = Math.floor((Math.random() * (hardcore - (-hardcore)) + (-hardcore)));
          return (xNEW === 0 || xNEW === 1 || xNEW === -1 || xNEW === 2 || xNEW === -2 || xNEW === 3 || xNEW === -3 || xNEW === 4 || xNEW === -4) ? randomXNEW() : xNEW;

      }
      //if the hardcore variable is higher or = 7 then XNEW is between 5 and 7 or -5 and -7
      else if (hardcore >= 8) {
          var xNEW = Math.floor((Math.random() * (hardcore - (-hardcore)) + (-hardcore)));
          return (xNEW === 0 || xNEW === 1 || xNEW === -1 || xNEW === 2 || xNEW === -2 || xNEW === 3 || xNEW === -3 || xNEW === 4 || xNEW === -4 || xNEW > 7 || xNEW < -7) ? randomXNEW() : xNEW;

      } else {
          var xNEW = Math.floor((Math.random() * (hardcore - (-hardcore)) + (-hardcore)));
          return xNEW;
      }
  }

  //draw the walls with calculated wallX[] and wallY[]
  function drawLevel() {

      for (var i = 0; i < wallX.length; i++) {
          drawWall(wallX[i], wallY[i]);
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


  //draw red Canvas to signalize that you failed
  function drawLevelFailed() {

      ctx.rect(50, 50, 400, 100);
      ctx.fillStyle = 'red';
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "32px Press Start 2P";
      ctx.fillText("You failed!", 70, 115);
  }

  //draw green Canvas to signalize that you won the level
  function drawLevelWon() {

      ctx.rect(50, 50, 400, 100);
      ctx.fillStyle = 'green';
      ctx.fill();

      ctx.fillStyle = "white";
      ctx.font = "32px Press Start 2P";
      ctx.fillText("You won!", 70, 115);

  }


  //draw the Credits
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
      ctx.fillText("Used Font:", (canvas.width - 475) / 2, canvas.height / 2 + 15);
      ctx.fillText("Press Start 2P", (canvas.width - 250) / 2, canvas.height / 2 + 45);

      ctx.font = "8 px Press Start 2P";
      ctx.fillText("Ein Projekt im Rahmen des", (canvas.width - 475) / 2, canvas.height / 2 + 300);
      ctx.fillText("Web-basierte-Anwendungen Moduls der", (canvas.width - 475) / 2, canvas.height / 2 + 320);
      ctx.fillText("Technischen Hochschule Koeln Campus Gummersbach", (canvas.width - 475) / 2, canvas.height / 2 + 340);
  }

  // draw Racer in the midde of the Canvas
  function drawRacer() {
      ctx.drawImage(racer, racerX, racerY, 25, 50);
  }

  // reset Racer position to the middle of the Canvas
  function resetRacer() {
      racerX = (canvas.width / 2) - 20;
  }
  // reset the whole Canvas
  function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  }


  // move the level
  function levelMovement() {

      //change Array value x to Array value+1 -> the level "seems" to move
      for (var i = 0; i < wallY.length; i++) {

          wallY[i] = wallY[i + 1] - 10;
          wallX[i] = wallX[i + 1];
      }

      //check if 20 values in the wallX[] Array are undefined -> calculate 20 more walls so the level is endless 
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
  }


  //start level
  function startLevel() {

      // make sure, that the highscore starts with zero
      highscore = 0;

      // start Interval for highscore and level movement
      timer = window.setInterval(highscoreFunction, 1000);
      move = window.setInterval(levelMovement, 100);
      levelFailed = false;
      levelStarted = true;


      //check if the music is playing and start the music if the song is not playing
      if (muscicPlay === false && mute === false) {
          introMusic.currentTime = 0.0;
          introMusic.play();
          muscicPlay === true;
      }
  }

  //inkrement the highscore value by 1 each time the highscoreFunction() is called
  function highscoreFunction() {

      highscore = highscore + 1;
      document.getElementById("highscore").innerHTML = "Highscore: " + highscore;
  }


  //stop the level
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
      }
      //test if level won (IS NOT WORKING CORRECTLY)
      else if ((wallX.length === 0 || wallX[0] === undefined)) {

          levelFailed = true;
          // drawLevelWon();
          stopLevel();
      }
  }

  // change racer to batman
  function batmanCar() {

      racer.src = "Batmobile.png";
  }

  // change racer to red car
  function redCar() {

      racer.src = "Racer2.png";
  }

  // change racer to blue car
  function blueCar() {

      racer.src = "Racer.png";
  }


  //move Racer
  function racerMove() {
      // check if the racer has to move
      if (levelFailed === false) {
          if (leftMove === true) {
              racerX = racerX - 2;
          } else if (rightMove === true) {
              racerX = racerX + 2;
          }
      }
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

  //key released
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


  // mute music if you don't like it
  function muteMusic() {

      if (mute === false) {
          mute = true;
          introMusic.pause();
      } else if (mute === true) {
          mute = false;
          introMusic.play();

      }
  }