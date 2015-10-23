
/* Strikten Modus nutzen, um auf unsicheren Code aufmerksam gemacht zu werden */
'use strict';


/*
 * Folgender Code kümmert sich um das asynchrone Nachladen von Dozenteninformationen
 * aus einer JSON-Datei
 */


/**
 * Dieser Callback kümmert sich um die Fehlerausgabe oder um die
 * Weiterverarbeitung des JSON-Objekts
 *
 * @callback requestCallback
 * @param {string} err - Fehlermeldung ansonsten {null}
 * @param {object} data - JS-Objekt (parsed)
 */


/* Hilfsvariablen */
var lecturers_filepath  = 'lecturers.json',
    dozenten_section    = document.querySelector( '#dozenten' ),
    loading_element     = dozenten_section.querySelector( '.dozenten_ladehinweis' );


/**
 * Inhalt einer JSON-Datei per Ajax (XMLHttpRequest) beziehen und parsen
 *
 * @param {string} path - relative Pfadangabe zur JSON-Datei
 * @param {requestCallback} callback - Wird sowohl im Falle eines Erfolgs
 * als auch eines Fehlers aufgerufen
 */
function getJSON( path, callback ) {

  var xhr = new XMLHttpRequest();

  xhr.open( 'GET', path, true );

  /*
   * Die hinter 'onreadystatechange' hinterlegte Funktion wird immer
   *  aufgerufen, wenn der Zustand sich ändert;
   * siehe: https://developer.mozilla.org/de/docs/Web/API/XMLHttpRequest#Eigenschaften
   */
  xhr.onreadystatechange = function() {

    /* readyState === 4 -> Vorgang abgeschlossen */
    if( this.readyState === 4 ) {

      /* HTTP-Statuscode 200 -> Datei wurde gefunden und zurückgegeben */
      if( this.status === 200 ) {

        var parsed_json = null;

        /*
         *  Da beim Parsen Fehler auftreten können,
         *    werden diese sicherheitshalber per try-catch abgefangen
         */
        try {
          /* Zurückgegebene JSON-Datei für die Weiterverarbeitung parsen */
          parsed_json = JSON.parse( this.response );
        }
        catch( e ) {
          callback( 'Datei konnte nicht geparsed werden!' );
        }

        callback( null, parsed_json );
      }
      else {
        /* Am besten direkt den HTTP-Statuscode mitreichen */
        callback( 'Unbekanntes Problem: ' + this.status );
      }

    }

  };

  /*
   * Beim absetzen des HTTP-Request können Fehler auftreten,
   *  die hier per try-catch abgefangen werden
   */
  try {
    xhr.send();
  }
  catch( e ) {
    callback( "Problem beim Absetzen des HTTP-Requests!" );
  }
}

/**
 * Ausgelagerte Fehlerausgabe, da sie an mehreren Stellen benötigt wir
 *
 * @param {string} err_msg - Fehlernachricht, die im 'loading_element'
 * ausgegeben werden soll
 */
function error_output ( err_msg ) {
  loading_element.classList.add( 'error' );
  loading_element.innerHTML = 'Error: ' + err_msg;
}

/**
 * Hilfsfunktion, um Definitionslisten-Elemente zu erzeugen
 *
 * @param {object} info - Schlüssel-Werte-Paar wird zu dt-dd-Paar
 * @returns {DOMElement} Aus 'info'-Objekt konstruiertes 'dl'-Element
 */
function construct_dl( info ) {
  /* Definition List */
  var dl_element = document.createElement( 'dl' );

  /* Durch alle Informationseinträge traversieren */
  for(var key in info) {
    var value = info[key];

    /* Definition Term */
    var dt = document.createElement( 'dt' );
    dt.innerHTML = key;
    dl_element.appendChild( dt );

    /* Definition Description */
    var dd = document.createElement( 'dd' );
    dd.innerHTML = value;
    dl_element.appendChild( dd );
  };

  return dl_element;
}



/* Dozenten-Informationen holen, mit Angabe einer callback-Funktion */
getJSON( lecturers_filepath, function(err, data) {

  /*
   * Sofern ein Fehler auftrat, soll die gegebene Fehlernachricht
   * ausgegeben und an dieser Stelle abgebrochen werden
   */
  if(err) {
    error_output( err );
    return;
  }

  /*
   * Überprüfen, ob das Unterfeld 'lectures' existiert, ansonsten abbrechen;
   * Nicht existierendes Unterfeld ist 'undefined' und wird bei
   *  Abfragen als 'false' interpretiert
   */
  if( !data.lecturers ) {
      error_output( 'Dozentenliste ist leer! Bitte überprüfen Sie die ' +
                    'Dozenten-JSON-Datei: ' + lecturers_filepath);
      return;
  }

  /* Ladeindikator-Element löschen */
  loading_element.remove();

  /*
   * Durch alle Dozenten-Einträge traversieren;
   *  'key' entspricht der eMailAdresse (wegen Eindeutigkeit)
   */
  for(var key in data.lecturers) {
    var value = data.lecturers[key];

    /* 'figure'-Element für Dozent erzeugen */
    var figure_element = document.createElement( 'figure' );

    /* Basisinformationen vorbereiten */
    var basic_infos = value.basic_infos || {};

    var lecturer_name   = basic_infos.name,
        /* Email-Adresse fungiert wegen Eindeutigkeit als Schlüssel */
        lecturer_email  = key;

    var profile_img_url = basic_infos.profile_img,
        profile_img_element = document.createElement( 'img' );

    profile_img_element.setAttribute( 'src', profile_img_url );
    profile_img_element.setAttribute( 'alt', 'Foto von ' + lecturer_name );

    figure_element.appendChild( profile_img_element );

    /* Caption-Element für das 'figure'-Element */
    var figcaption_element = document.createElement( 'figcaption' );

    var name_headline_element = document.createElement( 'h1' );
    name_headline_element.innerHTML = lecturer_name;

    figcaption_element.appendChild( name_headline_element );

    var dl_element_basic = construct_dl( {
        'Raum:'   : basic_infos.room,
        'Telefon:': basic_infos.phone_number,
        'eMail:'  : lecturer_email,
        'Website:': basic_infos.website
    } );

    /* Definitionsliste mit den Basic-Infos als Kindelement hinzufügen */
    figcaption_element.appendChild( dl_element_basic );


    /* Custom-Informationen vorbereiten */
    var custom_infos          = value.custom_infos || {},
        prepared_custom_infos = {};

    for(var key in custom_infos) {
      var value = custom_infos[key];

      /* Leere Einträge überspringen */
      if(value.title === '' || value.content === '') {
        return;
      }

      prepared_custom_infos[value.title] = value.content;
    };

    var dl_element_custom = construct_dl( prepared_custom_infos );

    /* Definitionsliste mit den Custom-Infos als Kindelement hinzufügen */
    figcaption_element.appendChild( dl_element_custom );

    /* 'figcaption'-Element dem momentanen 'figure'-Element als Kindelement hinzufügen */
    figure_element.appendChild( figcaption_element );

    /*
     * Für Dozenten erzeugtes 'figure'-Element dem Hauptelement als Kindelement
     * hinzufügen
     */
     dozenten_section.appendChild( figure_element );
  }

} );







 /**
  * Folgender Code kümmert sich um die Validierung der Formularfelder
  * und gibt entsprechende Fehlermeldungen aus
  */

/**
 * Erzeugt für die Fehlerausgabe ein span-Element und fügt es als ein
 * benachbartes Element ein
 *
 * @param {input, textarea} input_element - Das mit dem Fehler
 * zusammenhängende Element
 * @param {string} error_msg - Die Fehlermeldung
 */
function create_and_append_error_msg( input_element, error_msg ) {
  /* Schauen, ob der Vermerk bereits gesetzt ist, um die Fehlermeldung nicht
   * erneut auszugeben
   */
  if( input_element.dataset.error )
    return;

  /* span-Element erzeugen, Fehlermeldung zuweisen, error-Klasse hinzufügen
   * und das Element an das Ende des Vaterelements von 'input_element' anfügen
   *
   *     -->   fieldset   -->    |              +- fieldset
   *    ^         |              v                 |
   *    |     +---+---+  ...  ---+                 +- input
   *          |       |          |                 +- label
   *  -->    input   label   span.error            +- span.error
   *
   */
  var error_span_element = document.createElement( 'span' );
  error_span_element.innerHTML = error_msg;
  error_span_element.classList.add( 'error' ); /* class="" -> class="error" */

  /* Rahmens (border) einfärben  */
  input_element.style.borderColor = '#D16';

  input_element.parentNode.appendChild( error_span_element );

  /* Als kleine Hilfe wird vermerkt, dass es bei dem Eingabefeld ein Fehler gab */
  input_element.dataset.error = true;
}

/**
 * Löschen des span-Elements, welches für die Fehlerausgabe genutzt wird
 *
 * @param {input, textarea} input_element - Das Eingabefeld mit dem das
 * span-Element zusammehängt
 */
function clear_error( input_element ) {
    delete input_element.dataset.error;

    /* Farbe des Rahmens (border) zurücksetzen */
    input_element.style.borderColor = '';

    var error_span_element = input_element.parentNode.querySelector( '.error' );

    if( error_span_element )
      error_span_element.remove();
}

/* Elementreferenzen */
var anfrageformular_element = document.querySelector( '#anfrageformular' ),
    formular_element        = anfrageformular_element.querySelector( 'form' ),

    vorname_input_element   = formular_element.querySelector( '#vorname' ),
    zuname_input_element    = formular_element.querySelector( '#zuname' ),
    email_input_element     = formular_element.querySelector( '#email' ),
    nachricht_input_element = formular_element.querySelector( '#nachricht' );

/* Eventlistener hinzufügen, der beim ABsenden des Fomrulars ausgeführt wird */
formular_element.addEventListener('submit', function( e ) {
  /* Wird auf 'false' gesetzt, sofern irgendwo ein Validierungsfehler auftrat */
  var allValid = true;

  if( vorname_input_element.value.length === 0 ) {
      create_and_append_error_msg( vorname_input_element, 'Bitte geben Sie einen Vornamen ein!' );
      allValid = false;
  }
  else {
      clear_error( vorname_input_element );
  }

  if( zuname_input_element.value.length === 0 ) {
      create_and_append_error_msg( zuname_input_element, 'Bitte geben Sie einen Zunamen ein!' );
      allValid = false;
  }
  else {
      clear_error( zuname_input_element );
  }

  if(     email_input_element.value.length === 0
      || !email_input_element.value.match(/.+@.+\..+/) ) {

      create_and_append_error_msg( email_input_element, 'Bitte geben Sie eine eMail-Adresse ein!' );
      allValid = false;
  }
  else {
      clear_error( email_input_element );
  }

  if( nachricht_input_element.value.length === 0 ) {
      create_and_append_error_msg( nachricht_input_element, 'Bitte geben Sie eine Nachricht ein!' );
      allValid = false;
  }
  else {
      clear_error( nachricht_input_element );
  }

  /*
   * Sofern es mindestens einen Validierungsfehler gab, wird
   * die Standardaktion (Formular absenden) präventiert
   */
  if( !allValid )
    e.preventDefault();

});
