Template.nav.events({
    "click .nav li": function ( e ) {
        $( 'nav *' ).removeClass( 'active' )
        $( e.currentTarget ).addClass( 'active' )
    }
})