/* Strikten Modus nutzen, um auf unsicheren Code aufmerksam gemacht zu werden */
'use strict';


<<<<<<< HEAD
=======
/*
 * TODOs sind in den folgenden Zeilen zu finden:
 *  - Zeile 16    * Element über die Entwicklerkonsole erzeugen und in das DOM einfügen
 *  - Zeile 76    * Rahmenfarbe eines Elements per JavaScript setzen
 *  - Zeile 83    * Einfügen eines 'span'-Elements in den DOM-Baum
 *  - Zeile 131   * Ein EventListener zu einem Formular hinzufügen
 *  - Zeile 141   * Formularfelder validieren (Dürfen nicht leer sein usw.)
 */


 /*
  * ## ADVANCED-TODO:
  *  Öffnen Sie die 'index.html' in einem Browser und schalten die zum Browser
  *   gehörenden Entwicklertools ein;
  *
  *  Chrome:    Strg + Shift + J   oder  F12
  *  Safari:    CMD + Option + C   ( Müssen zuerst in den Einstellungen aktiviert werden )
  *  Firefox:   Strg + Shift + K
  *     -> Firebug: F12
  *
  *  1. Erzeugen Sie über die Konsole ein 'input'-Element und weisen es einer Variable zu
  *  2. Weisen sie dem Element die folgenden Attribut-Wert-Paare zu:
  *       type  => 'text'
  *       value => 'Vorname'
  *       id    => 'test_input'
  *  3. Fügen Sie das Element dem 'section'-Element mit der ID 'anfrageformular'
  *       als Kindelement hinzu
  *  4. Finden Sie das soeben dem DOM-Baum hinzugefügte Element auf der Seite
  *  5. Löschen Sie das hinzugefügte Element wieder
  * ##
  */


>>>>>>> a54fb27b30e2308a73658ebaa141b96635a00825
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

    /* span-Element erzeugen, Fehlermeldung zuweisen, error-Klasse hinzufügen,
     * die Rahmenfarbe setzen und das Element an das Ende des Vaterelements
     * von 'input_element' anfügen
     *
     *     -->   fieldset   -->    |                +- fieldset
     *    ^         |              v                   |
     *    |     +---+---+  ...  ---+                   +- input
     *          |       |          |                   +- label
     *  -->    input   label   span.error              +- span.error
     *
     */
    var error_span_element = document.createElement( 'span' );
    error_span_element.innerHTML = error_msg;
    error_span_element.classList.add( 'error' ); /* class="" -> class="error" */

<<<<<<< HEAD
    /* Rahmens (border) einfärben  */
    input_element.style.borderColor = '#D16';

    input_element.parentNode.appendChild( error_span_element );

=======
    /* Rahmen (border) einfärben  */
    /*
     * ## ADVANCED-TODO:
     *  Die Rahmenfarbe des 'input_element' auf die Farbe '#DD1166' setzen
     * ##
     */
    input_element.style.borderColor = '#DD1166';/* Und hier */;

    /*
     * ## ADVANCED-TODO:
     *  Dem Vaterelement von 'input_element' das Element 'error_span_element'
     *  als Kind hinzufügen;
     *  1. Referenz auf das Vaterelement von 'input_element' holen
     *  2. Vaterlement das 'error_span_element' als Kindelement anfügen
     * ##
     */
    var input_parent_element = input_element.parentNode;/* 1. HIER */ ;
    input_parent_element.appendChild(error_span_element); /* 2. HIER */ ;
	
	
>>>>>>> f0ae8ea852993a396491acff43e8ec29263c4e2e
    /* Als kleine Hilfe wird vermerkt, dass es bei dem Eingabefeld ein Fehler gab */
    input_element.dataset.error = true;
}


/**
 * Löschen des span-Elements, welches für die Fehlerausgabe genutzt wird
 *
 * @param {input, textarea} input_element - Das Eingabefeld mit dem das
 * span-Element zusammehängt
 */
function remove_error_msg( input_element ) {
    delete input_element.dataset.error;

    /* Farbe des Rahmens (border) zurücksetzen */
    input_element.style.borderColor = "";

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



<<<<<<< HEAD
/* Eventlistener hinzufügen, der beim ABsenden des Fomrulars ausgeführt wird */
formular_element.addEventListener('submit', function( e ) {
=======
/* Eventlistener hinzufügen, der beim Absenden des Fomrulars ausgelöst wird */
/*
 * ## ADVANCED-TODO:
 *  Dem Formular ein Eventlistener für das 'submit'-Event hinzufügen, damit vor dem Absenden
 *   des Formulars überprüft werden kann, ob Formularfelder evtl. leer gelassen wurden
 * ##
 */
formular_element.addEventListener("submit",function( e ) {
>>>>>>> f0ae8ea852993a396491acff43e8ec29263c4e2e
    /* Wird auf 'false' gesetzt, sofern irgendwo ein Validierungsfehler auftrat */
    var allValid = true;

    /* ## Vorname */
<<<<<<< HEAD
    if( vorname_input_element.value.length === 0 ) {
=======
    if( vorname_input_element.value === "" ) {
>>>>>>> f0ae8ea852993a396491acff43e8ec29263c4e2e
        create_and_append_error_msg( vorname_input_element,
                                     'Bitte geben Sie einen Vornamen ein!' );
        allValid = false;
    }
    else {
        remove_error_msg( vorname_input_element );
    }

    /* ## Zuname */
<<<<<<< HEAD
    if( zuname_input_element.value.length === 0 ) {
=======
    if( zuname_input_element.value === "" ) {
>>>>>>> f0ae8ea852993a396491acff43e8ec29263c4e2e
        create_and_append_error_msg( zuname_input_element,
                                     'Bitte geben Sie einen Zunamen ein!' );
        allValid = false;
    }    else {
        remove_error_msg( zuname_input_element );
    }

    /* ## Email */
<<<<<<< HEAD
    if(     email_input_element.value.length === 0
=======
    if(email_input_element.value === ""
>>>>>>> f0ae8ea852993a396491acff43e8ec29263c4e2e
        || !email_input_element.value.match(/.+@.+\..+/) ) {

        create_and_append_error_msg( email_input_element,
                                     'Bitte geben Sie eine eMail-Adresse ein!' );
        allValid = false;
    }
    else {
        remove_error_msg( email_input_element );
    }

    /* ## Nachricht */
<<<<<<< HEAD
    if( nachricht_input_element.value.length === 0 ) {
=======
    if(nachricht_input_element.value === "" ) {
>>>>>>> f0ae8ea852993a396491acff43e8ec29263c4e2e
        create_and_append_error_msg( nachricht_input_element,
                                     'Bitte geben Sie eine Nachricht ein!' );
        allValid = false;
    }
    else {
        remove_error_msg( nachricht_input_element );
    }


    /*
     * Sofern es mindestens einen Validierungsfehler gab, wird
     * die Standardaktion (Formular absenden) präventiert
     */
    if( !allValid )
        e.preventDefault();

} );
