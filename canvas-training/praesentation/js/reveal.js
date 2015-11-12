var params = {};
//Festlegen der verfügbaren Eigenschaften
function init() {
    var parameters = {
        centerX: 250,                   //X Koordinate fr das Zentrum der Ringe
        centerY: 250,                   //Y Koordinate fr das Zentrum der Ringe
        backgroundColor: '#333333',     //Hintergrundfarbe der Uhr
        ringColor: '#FFFF00',           //Die Farbe der Ringe
        textColor: '#FFFF00',           //Die Farbe des Textes in der Mitte
        hourRadius: 200,                //Der Radius des Stunden Rings
        minuteRadius: 175,              //Der radius des Minuten Rings
        secondRadius: 150,              //Der Radius des Sekunden Rings
        showDigital: true,             //legt fest ob die Digitale Zeitanzeige eingeblendet werden soll oder nicht
        refreshRate: 1                  //Die Anzahl der aktualisierungen pro Sekunde
    };
    params = parameters;
    return parameters;
}
function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}
function drawBackground(ctx, parameters) {
    ctx.fillStyle = parameters.backgroundColor;
    ctx.fillRect(0, 0, parameters.canvasWidht, parameters.canvasHeight);
}
function drawForeground(ctx, parameters) {
    //Linien Formatieren
    ctx.strokeStyle = parameters.ringColor;
    ctx.shadowColor = parameters.ringColor;
    ctx.lineWidth = 15;
    ctx.shadowBlur = 17;
    ctx.beginPath();
    ctx.arc(parameters.centerX, parameters.centerY, parameters.hourRadius, parameters.startAngle, parameters.endAngleHour);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(parameters.centerX, parameters.centerY, parameters.minuteRadius, parameters.startAngle, parameters.endAngleMinute);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(parameters.centerX, parameters.centerY, parameters.secondRadius, parameters.startAngle, parameters.endAngleSecond);
    ctx.stroke();
    ctx.closePath();
    if(parameters.showDigital){
        ctx.fillStyle = parameters.textColor;
        ctx.shadowBlur = 0;
        ctx.font = "30px Arial";
        ctx.fillText(parameters.timeString, parameters.centerX - 75, parameters.centerY);
        ctx.fillStyle = parameters.textColor;
        ctx.font = "18px Arial";
        ctx.fillText(parameters.dateString, parameters.centerX - 45, parameters.centerY + 20);    
    }
}
function doLogics(parameters){
    var now = new Date();
    var hours = now.getHours() % 12;
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    parameters.startAngle = degToRad(270);
    parameters.endAngleHour = degToRad(270 + (360 / 12) * hours);
    parameters.endAngleMinute = degToRad(270 + (360 / 60) * minutes);
    parameters.endAngleSecond = degToRad(270 + (360 / 60) * seconds);
    parameters.dateString = now.toDateString();
    parameters.timeString = now.toLocaleTimeString();
    return parameters;
}
function doRendering(context, parameters){
     drawBackground(context, parameters);
     drawForeground(context, parameters);
}
function draw() {
    var canvas = document.getElementById('canvas');
    var parameters = init();
    parameters.canvasWidht = canvas.width;
    parameters.canvasHeight = canvas.height;
    var ctx = canvas.getContext("2d"); 
    setInterval(function () {
        parameters = doLogics(parameters);
        doRendering(ctx,parameters)
    }, (1000 / parameters.refreshRate));
}
