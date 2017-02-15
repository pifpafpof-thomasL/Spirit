(function($) {
        $(function() {
                $(".button-collapse").sideNav();
                // Show sideNav
                $('.button-collapse').sideNav('show');
                // Hide sideNav
                $('.button-collapse').sideNav('hide');
                // Destroy sideNav
                $('.button-collapse').sideNav('destroy');
                $('.button-collapse').sideNav({
                    menuWidth: 300, // Default is 300
                    edge: 'right', // Choose the horizontal origin
                    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
                    draggable: true // Choose whether you can drag to open on touch screens
                });
                $('.collapsible').collapsible({
                        popout: true,
                        onOpen: function(el) { alert('Open'); }, // Callback for Collapsible open
                        onClose: function(el) { alert('Closed'); } // Callback for Collapsible close
                    }
                }); $('.collapsible').collapsible({
                accordion: false, // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                onOpen: function(el) { alert('Open'); }, // Callback for Collapsible open
                onClose: function(el) { alert('Closed'); } // Callback for Collapsible close
            }); $('ul.tabs').tabs('select_tab', 'tab_id');

            $('.dropdown-button').dropdown({
                inDuration: 300,
                outDuration: 225,
                constrainWidth: false, // Does not change width of dropdown to that of the activator
                hover: true, // Activate on hover
                gutter: 0, // Spacing from edge
                belowOrigin: false, // Displays dropdown below the button
                alignment: 'left' // Displays dropdown with edge aligned to the left of button
                stopPropagation: false // Stops event propagation
            });

        }); // end of document ready
})(jQuery); // end of jQuery name space