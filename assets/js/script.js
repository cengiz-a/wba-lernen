( function( $ ) {
	/*global jQuery: false */
	'use strict';

	$( function() {
		var $loading = $( '.loading' ),
			$list = $( '#presentation-list' );

		// AJAX request.
		$.getJSON( 'presentations.json', function( data ) {
			var items = {};
			var oldDate = null;

			// Data check.
			if ( $.isEmptyObject( data.presentations ) )
				$loading.html( '<span class="error">ERROR #1: Please try to load the page again.</span>' );

			// Go through each item.
			$.each( data.presentations, function( path, val ) {
				var authors = '';
				var dateString = '';
				var currentDate;
				var dateRegExp = new RegExp( '^(\\d+)-(\\d+)-(\\d+)' );

				// Any authors?
				if ( ! $.isEmptyObject( val.authors ) )
					authors = ' (' + val.authors.join(', ') + ')';

				// Get the date.
				var matches = dateRegExp.exec( path );
				if ( matches ) {
					dateString = matches[3] + '.' + matches[2] + '.' + matches[1];
					currentDate = new Date( matches[1], matches[2] - 1, matches[3] ).getTime();
				} else {
					currentDate = new Date().getTime();
				}

				// Check if there is already a stack for this date.
				// If not, create a new one.
				if ( 'undefined' === typeof( items[currentDate] ) )
					items[currentDate] = [];

				items[currentDate].push( '<li class="presentation"><a href="' + path + '" target="_blank">' + val.title + authors + '</li>');
			} );

			// Clear screen.
			$list.empty();

			// Sort by date.
			var keys = Object.keys( items );
			keys.sort();

			// Output with sections.
			for ( var i = 0; i < keys.length; i++ ) {
				var key = keys[i];
				var currentDate = new Date();
				currentDate.setTime( key );
				var dateString = currentDate.toLocaleDateString();

				if ( null === oldDate ) {
					$list.append( '<li class="date-section first">' + dateString + ':</li>' );
					oldDate = currentDate;
				} else {
					if ( oldDate < currentDate ) {
						$list.append( '<li class="date-section">' + dateString + ':</li>' );
						oldDate = currentDate;
					}
				}

				$list.append( items[key] );
			}
		} ).error( function( a, b, c ) {
			// Some error handling.
			if ( 'unexpected_token' == c.type )
				$loading.html( '<span class="error">ERROR #3: Wrong syntax. Maybe a comma too much?</span>' );
			else
				$loading.html( '<span class="error">ERROR #2: Please try to load the page again.</span>' );
		} );
	} );
}( jQuery ) );
