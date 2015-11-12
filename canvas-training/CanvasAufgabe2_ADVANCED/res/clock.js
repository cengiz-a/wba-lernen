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
//              - Die Anzeige der Uhr wird einmal pro Sekunde aktualisiert.
//**************************************************************************


//Festlegen der verfügbaren Eigenschaften
function init() {
    
    var parameters = {
        centerX: 250,                   //X Koordinate fuer das Zentrum der Ringe
        centerY: 250,                   //Y Koordinate fuer das Zentrum der Ringe
        backgroundColor: '#FFFFFF',     //Hintergrundfarbe der Uhr
        ringColor: '#000000',           //Die Farbe der Ringe
        textColor: '#000000',           //Die Farbe des Textes in der Mitte
        hourRadius: 220,                //Der Radius des Stunden-Rings
        minuteRadius: 175,              //Der radius des Minuten-Rings
        secondRadius: 150,              //Der Radius des Sekunden-Rings
        refreshRate: 1                  //Die Anzahl der Aktualisierungen pro Sekunde
    };
    
    return parameters;
}


/***************************************************************************************
*   Eine Hilfsfunktion, die die Umrechnung eines Winkels von Grad in Bogenmaß durchführt
****************************************************************************************/

function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}


/*************************************************************************************
*   Hier wird der Hintergrund für die Uhr erzeugt. In diesem Fall eine einfache Farbe
*************************************************************************************/

function drawBackground(ctx, parameters) {

}


/*********************************************
*   Hier wird die Darstellung der Uhr erzeugt
*********************************************/

function drawForeground(ctx, parameters) {
    //Ringfarbe festlegen
    
    //Weitere Einstellungen für die Darstellung der Ringe
    ctx.shadowColor = parameters.ringColor;
    ctx.lineWidth = 15;
    ctx.shadowBlur = 17;

    //Stunden-Ring
    ctx.beginPath();
    
    ctx.closePath();

    //Minuten-Ring
    ctx.beginPath();
    
    ctx.closePath();

    //Sekunden-Ring
    ctx.beginPath();
    ctx.closePath();

    
    ctx.shadowBlur = 0;
    
}

/************************************************************************************
*   Hier finden alle Berechnungen statt damit die Uhr angezeigt werden kann.
*   Alle berechneten werte werden im Parameterobjekt gespeichert
************************************************************************************/

function doLogics(parameters){
    var now = new Date();
    
    //Die Zahlwerte für Stunde, Minute und Sekunde
    var hours = now.getHours() % 12;
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
      
    //Berechnung der Winkel 
    //TIPP: Berechnungen der Winkel können in Grad durchgeführt werden. Gespeichert werden soll
    // aber der Winkel in Bogenmaß
    
    //Der Startwinkel für alle Ringe
    parameters.startAngle = ;
    
    //TODO: Berechnen Sie die Endwinkel aller Bögen
    parameters.endAngleHour = 
    parameters.endAngleMinute = 
    parameters.endAngleSecond = 
    
    
    //Auslesen der Stings für die Digitalanzeige
    parameters.dateString = now.toDateString();
    parameters.timeString = now.toLocaleTimeString();
    
    return parameters;
}

/****************************************************************************
*   In dieser Funktion werden alle Aktionen ausgeführt, die etwas anzeigen:
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
