//**************************************************************************
//Aufgabe:
//          Die Aufgabe ist es diese "sehr moderne" Uhr
//          nachzubauen. 
//          Dabei gilt:
//              - Der äußere Ring stellt die aktuelle Stunde dar.
//              - Der mitlere Ring stellt die aktuelle Minute dar.
//              - Der innere Ring stellt die aktuelle Sekunde dar.
//              - Es werden nur 12 Stunden angezeigt.
//                Die Position von 1 Uhr und 13 Uhr ist also identisch.
//              - Die anzeige der Uhr wird einmal pro Sekunde aktualisiert.
//**************************************************************************


var params = {};
//Festlegen der verfügbaren Eigenschaften
function init() {
    
    var parameters = {
        centerX: 250,                   //X Koordinate fr das Zentrum der Ringe
        centerY: 250,                   //Y Koordinate fr das Zentrum der Ringe
        backgroundColor: '#FFFFFF',     //Hintergrundfarbe der Uhr
        ringColor: '#000000',           //Die Farbe der Ringe
        textColor: '#000000',           //Die Farbe des Textes in der Mitte
        hourRadius: 200,                //Der Radius des Stunden Rings
        minuteRadius: 175,              //Der radius des Minuten Rings
        secondRadius: 150,              //Der Radius des Sekunden Rings
        showDigital: true,             //legt fest ob die Digitale Zeitanzeige eingeblendet werden soll oder nicht
        refreshRate: 1                  //Die Anzahl der aktualisierungen pro Sekunde
    };
    
    
    params = parameters;
    return parameters;
}


/***************************************************************************************
*   Eine hilfsfunktion die die Umrechnung eines Winkels von Grad in Bogenmaß durchführt
****************************************************************************************/

function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}


/*************************************************************************************
*   Hier wird der Hintergrund für die Uhr erzeugt. In diesem Fall eine einfache Farbe
*************************************************************************************/

function drawBackground(ctx, parameters) {
    ctx.fillStyle = parameters.backgroundColor;
    ctx.fillRect(0, 0, parameters.canvasWidht, parameters.canvasHeight);
}


/*********************************************
*   Hier wird die Darstellung der Uhr erzeugt
*********************************************/

function drawForeground(ctx, parameters) {
    //Linien Formatieren
    ctx.strokeStyle = parameters.ringColor;
    ctx.shadowColor = parameters.ringColor;
    ctx.lineWidth = 15;
    ctx.shadowBlur = 17;

    //Stunden
    ctx.beginPath();
    ctx.arc(parameters.centerX, parameters.centerY, parameters.hourRadius, parameters.startAngle, parameters.endAngleHour);
    ctx.stroke();
    ctx.closePath();

    //Minuten
    ctx.beginPath();
    ctx.arc(parameters.centerX, parameters.centerY, parameters.minuteRadius, parameters.startAngle, parameters.endAngleMinute);
    ctx.stroke();
    ctx.closePath();

    //Sekunden
    ctx.beginPath();
    ctx.arc(parameters.centerX, parameters.centerY, parameters.secondRadius, parameters.startAngle, parameters.endAngleSecond);
    ctx.stroke();
    ctx.closePath();

    
    if(parameters.showDigital){
        //Digital Time
        ctx.fillStyle = parameters.textColor;
        ctx.shadowBlur = 0;
        ctx.font = "30px Arial";
        ctx.fillText(parameters.timeString, parameters.centerX - 75, parameters.centerY);
        //Digital Date
        ctx.fillStyle = parameters.textColor;
        ctx.font = "18px Arial";
        ctx.fillText(parameters.dateString, parameters.centerX - 45, parameters.centerY + 20);    
    }
    

}

/************************************************************************************
*   Hier finden alle Berechnungen statt damit die Uhr angezeigt werden kann.
*   Alle berechneten werte werden im Parameterobjekt gespeichert
************************************************************************************/

function doLogics(parameters){
    var now = new Date();
    
    var hours = now.getHours() % 12;
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
      
    //Berechnung der Winkel 
    parameters.startAngle = degToRad(270);
    parameters.endAngleHour = degToRad(270 + (360 / 12) * hours);
    parameters.endAngleMinute = degToRad(270 + (360 / 60) * minutes);
    parameters.endAngleSecond = degToRad(270 + (360 / 60) * seconds);
    
    //Auslesen der Stings für die Digitalanzeige
    parameters.dateString = now.toDateString();
    parameters.timeString = now.toLocaleTimeString();
    
    return parameters;
}

/****************************************************************************
*   In dieser Funktion werden alle Aktionen ausgeführt die etwas anzeigen:
*   z.B: Hintergrund zeichnen, Ringe zeichnen etc.
*****************************************************************************/

function doRendering(context, parameters){
     drawBackground(context, parameters);
     drawForeground(context, parameters);
}

/********************************************************************
* Die Hauptfunktion die nach dem Laden der index.html aufgerufen wird
*********************************************************************/
function draw() {
    var canvas = document.getElementById('canvas');
    
    var parameters = init();
    
    parameters.canvasWidht = canvas.width;
    parameters.canvasHeight = canvas.height;
    
    var ctx = canvas.getContext("2d");
    
    setInterval(function () {
        //Dieser Code wird 1 x / Sekunde aufgerufen
        parameters = doLogics(parameters);
        doRendering(ctx,parameters)
    }, (1000 / parameters.refreshRate));
}
