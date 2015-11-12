var btn = document.getElementById('myButton');
var textfield = document.getElementById('searchinput');
//Eventlistener auf Textfield, loest einen click aus wenn die Enter Taste gedrueckt wird
textfield.addEventListener('keypress', function ( e ){
  if(e.keyCode == 13)
    btn.click();
});
//Sendet die HTTP request wenn geclickt wird
btn.addEventListener('click', function( e ){
  var input = document.getElementById('searchinput').value;
  document.getElementById('searchinput').value = '';
  if(!(input === '')){
    input.replace(' ','+');
    var url = 'http://www.omdbapi.com/?t=' + input + '&y=&plot=short&r=json';
    var result = JSON.parse(httpGet(url));
    if(result.Title)
      addMovie(result);
  }

});

 //Request
function httpGet(theUrl){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.response;
}    

function addMovie(movieData){
  //Erstellen der HTML Elemente
  var wrapper = document.getElementById('wrapper');
  var movie = div();
  var left = div();
  var mediaBody = div();
  var poster = document.createElement('img');
  var title = document.createElement('h4');
  var info = document.createElement('p');
  var plot = document.createElement('p');

  movie.setAttribute('class','media');
  left.setAttribute('class','media-left');
  mediaBody.setAttribute('class','media-body');
  poster.setAttribute('class','media-object img-thumbnail');
  title.setAttribute('class','media-heading');
  info.setAttribute('class','text-muted');
  
  //Lernziele//
  //Javascript basics//
  //bestimmte JSON Daten auslesen//
  //Praxiserfahrung, diese Werte auch weiterzuverarbeiten/

  //Es ist Fast geschafft, wir haben jetzt ein Suchfeld, aus dem der Text gelesen wird
  //und die Request gebaut wird, jetzt muessen wir nur noch die erhaltenen Daten nutzen und
  //schoen verpacken! Auf gehts

  //Fuegen sie dem Poster ( <img> Element ) das Bild als source hinzu, bedenken sie,
  //dass es sich um ein Attribut handelt und nicht der inner.HTML manipuliert werden muss.
  //Der Link zum Poster sollte in den JSON Daten zu finden sein, diese werden der Funktion,
  //in der sie sich befinden uebergeben! (movieData)
  poster.setAttribute(movieData.post);
  
  //Fuellen sie die HTML Elemente mit Daten aus unserer JSON rueckgabe
  //Es steht ihnen die Funktion fill(Element, text); zur verfuegung, die 
  //das innerHTML eines Elementes manipuliert.
 
  //title soll den Titel bekommen
  fill(title,movieData.Title); 
  //info soll den releasedate, die runtime und das imdbRating bekommen.
  //Die Strings in der Mitte  (' - imdb-Rating: ')dienen zur Formatierung, es soll ja schoen aussehen!
  fill( info, movieData.Release + ' - ' + ??? + ' - imdb-Rating: ' + movieData. ); 
  //yoy know the drill, der Plot ist gefragt
  fill( plot, movieData.Plot);


//  <movie class='media'>
//    <div class='media-left'><img></div>
//    <div class='media-body>
//       <h4>Stuff</h4>
//       <p> Relese - runtime - rating </p>
//       <p> Plottiger plot     </p>
//    </div>
//  </div>
// Nutzen sie die Funktion appendChild um die Elemente richtig zu verschachteln, orientieren
// sie sich an der gegebenen HTML Struktur. Sie sollten von Innen nach aussen arbeiten und 
// zuletzt das fertige movie Element, dem wrapper Element hinzufuegen ein guter start waere:

// mediaBody.appendChild(title); usw
}

//Nimmt ein Element und einen Text endgegen, setzt den Text dem innerHTML des Elementes
function fill(el, text){
  el.innerHTML = text;
}
//gib ein <div> zurueck
function div(){
  return document.createElement('div');
}
