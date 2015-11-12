function draw() {
    
    //Canvashöhe: 500px;
    //Canvasbreite: 500px;
    
    
    //****************************************************************
    //Aufgabe: 
    //      Zeichnen Sie das "Haus vom Nikolaus"
    //****************************************************************    
    
    
    //Canvascontext laden
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    
    //****************************************************************
    //TODO: 
    //      Zeichnen Sie ein ausgefülltes Rechteck über die gesamte 
    //      Zeichenfläche.
    //****************************************************************
    
    //Festlegen der Füllfarbe
    ctx.fillStyle = '#000000';
    ctx.fillRect();
    
    
    
    
    //****************************************************************
    //TODO: 
    //      Zeichnen Sie ein ausgefülltes Dreieck als Dach des Hauses    
    //****************************************************************
    
    //Farbe fürs Zeichnen setzen
    ctx.strokeStyle = "#FFFF00";
    //Neue Füllfarbe festlegen
    ctx.fillStyle = '#FFFF00';
    //Liniendicke auf 1px setzen
    ctx.lineWidth = 1;
    
    //Dreieck zeichnen
    ctx.beginPath();
    ctx.moveTo( , );
    ctx.lineTo( , );
    ctx.lineTo( , );
    ctx.lineTo( , );
    ctx.fill();
    ctx.closePath();
    
    
    //****************************************************************
    //TODO: 
    //      Zeichnen Sie den Rahmen eines Quadrats als eigentliches 
    //      Haus.
    //****************************************************************
    
    ctx.beginPath();
    
    ctx.closePath();
    
    
    
    //****************************************************************
    //TODO: 
    //      Zeichnen Sie die Diagonalen in das Haus
    //****************************************************************
    
    ctx.beginPath();
    //TIPP: ctx.MoveTo(), ctx.LineTo(), ctx.stroke()
    ctx.closePath();
    
}
