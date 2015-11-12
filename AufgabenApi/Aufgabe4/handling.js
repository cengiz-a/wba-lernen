var btn = document.getElementById('myButton');
var textfield = document.getElementById('searchinput');

textfield.addEventListener('keypress', function ( e ){
  if(e.keyCode == 13)
    btn.click();
});

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


function httpGet(theUrl){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.response;
}    

function addMovie(movieData){
  var wrapper = document.getElementById('wrapper');
  var movie = div();
  var left = div();
  var body = div();
  var poster = document.createElement('img');
  var title = document.createElement('h4');
  var info = document.createElement('p');
  var plot = document.createElement('p');

  //Diese Aufgabe ist ein Bonus, falls ihr schneller fertig werdet als wir erwarten
  //Wenn ihr also hier seid, starke Leistung
  //So sollte also euer 'Projekt' aussehen, wenn ihr bisher alles geschafft habt
  //Nun geht es darum aus dem Poster, einen klickbaren Link zu machen der auf die
  //IMDB Seite zum bestimmten Film verweist
  //Jeder Film hat eine imdbID
  //der IMDB URL eines Filmes setzt sich zusammen aus 'http://www.imdb.com/title/idDesFilmes'
  
  //ein <a> Element erstellen
  var a = ???;
  //Die URL bauen
  var imdbUrl = ??? ;
  //href setzen
  a.
 
 
  
  movie.setAttribute('class','media');
  left.setAttribute('class','media-left');
  body.setAttribute('class','media-body');
  poster.setAttribute('class','media-object img-thumbnail');
  poster.setAttribute('src', movieData.Poster );
  title.setAttribute('class','media-heading');
  info.setAttribute('class','text-muted');
  fill( title, movieData.Title ); 
  fill( info, movieData.Released + ' - ' + movieData.Runtime + ' - imdb-Rating: ' + movieData.imdbRating); 
  fill( plot, movieData.Plot );
  
   
  a.appendChild(poster);
  left.appendChild(a);
  body.appendChild(title);
  body.appendChild(info);
  body.appendChild(plot);
  movie.appendChild(left);
  movie.appendChild(body);
  wrapper.appendChild(movie);
}

function fill(el, text){
  el.innerHTML = text;
}

function div(){
  return document.createElement('div');
}
