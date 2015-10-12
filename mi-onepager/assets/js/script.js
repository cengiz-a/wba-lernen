( function( $ ) {
  'use strict';

  /*
   * Dozenten und ihre Informationen nachträglich per Ajax aus einem JSON-File
   *  beziehen
   */
  var lecturers_filepath       = 'lecturers.json',
      $dozenten_section        = $( '#dozenten' ),
      $loading                 = $dozenten_section.find( '.dozenten_laden' ),
      loading_string           = $loading.text(),
      loading_indicator_chars  = '',

      /* Interval für den Ladeindikator (...) */
      throbber_handler = window.setInterval( function() {
        loading_indicator_chars =  ( loading_indicator_chars.length === 3 ) ?
                                      '': loading_indicator_chars + '.';

        $loading.html( loading_string + ' ' + loading_indicator_chars );
      }, 500),

      /* Fehlerausgabe mit zusätzlichen Aufräumarbeiten */
      error_output = function( err_msg ) {
        /* Throbber-Intervall stoppen */
        window.clearInterval( throbber_handler );

        $loading.addClass( 'error' );
        $loading.html( 'Error: ' + err_msg );
      },

      /* Hilfsfunktion, um Definitionslisten-Elemente zu erzeugen */
      construct_dl = function( basic_info ) {
        var $dl = $( '<dl>' );

        $.each( basic_info , function( key, value ) {
          /* Leere Einträge überpringen */
          if(     ( typeof( value ) !== 'string' && !$.isArray( value ) )
              ||  value.length === 0) {
            return;
          }

          var $dt = $( '<dt>' ).html( key );
          $dl.append( $dt );

          var $dd = $( '<dd>' );

          /* Sofern Array, diesen in eine unsortierte Liste überführen */
          if( $.isArray( value ) ) {
            var $ul = $( '<ul>' );

            $.each( value, function( index, value ) {
              value = value + '';

              /* Leere Einträge überspringen */
              if( value.length === 0)
                return;

              var $li = $( '<li>' ).html( value );
              $ul.append( $li );
            });

            $dd.append( $ul );
          }
          else {
            $dd.html( value );
          }

          $dl.append( $dd );
        });

        return $dl;
      },

      /* Hilfsfunktion, um eMail-Adresse und URLs in ein anchor-Element zu überführen */
      linkify = function( link_raw ) {
        link_raw = link_raw + '';

        var link = link_raw;

        if( link_raw.match(/\(at\)/) ) link_raw = link_raw.replace(" (at) ", "@");

        if( link_raw.match( /^.*\@.*\..*$/ ) ) {
          link = '<a href="mailto:'+ link_raw + '" >' + link_raw + '</a>';
        }
        else if( link_raw.match( /https{0,1}:\/\// ) ) {
            var link_raw_cleaner = link_raw.replace( /https{0,1}:\/\//, "" );
            link = '<a href="'+ link_raw + '" >' + link_raw_cleaner + '</a>';
        }

        return link;
      };


      /* Dozenten-Informationen holen */
      $.getJSON( lecturers_filepath )
        /* JSON-Datei erfolgreich geladen */
        .done( function( data ) {

          if( $.isEmptyObject( data ) || $.isEmptyObject( data.lecturers ) ) {
              error_output( 'Dozentenliste ist leer! Bitte überprüfen Sie die ' +
                            'Dozenten-JSON-Datei: ' + lecturers_filepath);
              return;
          }

          /* Throbber-Handler säubern und Ladeindikator-Element löschen */
          window.clearInterval( throbber_handler );
          $loading.remove();

          /* Durch alle Einträge traversieren */
          $.each( data.lecturers , function( key, value ) {

            if( typeof( key ) !== 'string' ) {
              console.error('Ungültiger Dozenten-Schlüssel: Kein String!', key);
              return;
            }

            /* 'figure' für Dozent erzeugen */
            var $figure = $( '<figure>' );

            /* Basisinformationen vorbereiten */
            var basic_infos = value.basic_infos || {};

            var lecturer_name   = basic_infos.name || '<unbekannter Name>',
                lecturer_email  = (typeof(key) === 'string') ?
                                    key: '';

            var profile_img_url = basic_infos.profile_img || 'images/prof_unknown.jpg',
                $profile_img = $( '<img>' ).attr({
                  src: profile_img_url,
                  alt: 'Profilfoto von ' + lecturer_name
                });

            $figure.append( $profile_img );

            /* Caption-Element für das 'figure'-Element */
            var $figcaption = $( '<figcaption>' );

            var $name_headline = $( '<h1>' ).html( lecturer_name );
            $figcaption.append( $name_headline );

            var $dl_basic = construct_dl( {
                'Raum:'   : basic_infos.room || '',
                'Telefon:': basic_infos.phone_number || '',
                'eMail:'  : linkify( lecturer_email ),
                'Website:': linkify( basic_infos.website || '' )
            });

            /* Definitionsliste mit den Basic-Infos hinzufügen */
            $figcaption.append( $dl_basic );


            /* Custom-Informationen vorbereiten */
            var custom_infos          = value.custom_infos || {},
                prepared_custom_infos = {};

            $.each( custom_infos , function( key, value ) {
              /* Leere Einträge überspringen */
              if(!value.title || !value.content) {
                return;
              }

              prepared_custom_infos[value.title] = value.content;
            });

            var $dl_custom = construct_dl( prepared_custom_infos );

            console.log($dl_custom);

            /* Definitionsliste mit den Custom-Infos hinzufügen */
            $figcaption.append( $dl_custom );


            $figure.append( $figcaption );
            $dozenten_section.append( $figure );

          });

        })
        /* Problem beim Laden der JSON-Datei*/
        .error( function( xhr, err_msg, e ) {
          var full_err_msg = err_msg;

          if( err_msg === 'parsererror' ) {
            full_err_msg = 'Fehler beim Parsen der JSON-Datei!' +
                            'Die Datei sollte auf Wohlgeformtheit überprüft werden.';
          }

          error_output( full_err_msg );
        });

} ( jQuery ) );
