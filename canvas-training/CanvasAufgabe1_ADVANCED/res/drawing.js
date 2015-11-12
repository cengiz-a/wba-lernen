function draw() {
    
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
    
    
    
    //****************************************************************
    //TODO: 
    //      Zeichnen Sie ausgefülltes Dreieck als Dach des Hauses    
    //****************************************************************
    

    //Dreieck zeichnen
    /*ctx.beginPath();
    ctx.moveTo(200,200);
    ctx.lineTo(200,100);
    ctx.lineTo(100,200);
    ctx.lineTo(200,200);
    ctx.lineTo(100,100);
    ctx.lineTo(150,50);
    ctx.lineTo(200,100);
    ctx.lineTo(100,100);
    ctx.lineTo(100,200);
    ctx.stroke();
    ctx.closePath();*/
    
    /*ctx.beginPath();
    ctx.moveTo(200,200);
    ctx.lineTo(200,100);
    ctx.lineTo(100,100);
    ctx.lineTo(100,200);
    ctx.lineTo(200,200);
    ctx.fill();
    ctx.moveTo(100,100);
    ctx.lineTo(150,50);
    ctx.lineTo(200,100);  
    ctx.fill();
    ctx.closePath();*/
    
    //****************************************************************
    //TODO: 
    //      Zeichnen Sie den Rahmen eines Quadrats als eigentliches 
    //      Haus.
    //****************************************************************
    
    //Haus zeichnen
    ctx.beginPath();
    ctx.moveTo(200,200);
    ctx.lineTo(200,100);
    ctx.lineTo(100,100);
    ctx.lineTo(100,200);
    ctx.lineTo(200,200);
    ctx.stroke();
    ctx.closePath();
    
    
    
    //****************************************************************
    //TODO: 
    //      Zeichnen Sie die Diagonalen in das Haus
    //****************************************************************
    
    //Diagonalen Zeichnen
    ctx.beginPath();
    ctx.moveTo(100,100);
    ctx.lineTo(200,200);
    ctx.stroke();
    ctx.moveTo(100,200);
    ctx.lineTo(200,100);
    ctx.stroke();
    ctx.closePath();
}
