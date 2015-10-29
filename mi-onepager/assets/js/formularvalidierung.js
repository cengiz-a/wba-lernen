/* Strikten Modus nutzen, um auf unsicheren Code aufmerksam gemacht zu werden */
'use strict';


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
function remove_error_msg( input_element ) {
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

    /* ## Vorname */
    if( vorname_input_element.value.length === 0 ) {
        create_and_append_error_msg( vorname_input_element,
                                     'Bitte geben Sie einen Vornamen ein!' );
        allValid = false;
    }
    else {
        remove_error_msg( vorname_input_element );
    }

    /* ## Zuname */
    if( zuname_input_element.value.length === 0 ) {
        create_and_append_error_msg( zuname_input_element,
                                     'Bitte geben Sie einen Zunamen ein!' );
        allValid = false;
    }
    else {
        remove_error_msg( zuname_input_element );
    }

    /* ## Email */
    if(     email_input_element.value.length === 0
        || !email_input_element.value.match(/.+@.+\..+/) ) {

        create_and_append_error_msg( email_input_element,
                                     'Bitte geben Sie eine eMail-Adresse ein!' );
        allValid = false;
    }
    else {
        remove_error_msg( email_input_element );
    }

    /* ## Nachricht */
    if( nachricht_input_element.value.length === 0 ) {
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
