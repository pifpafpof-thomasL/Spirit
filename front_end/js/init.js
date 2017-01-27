(function($) {
        $(function() {

                $('.button-collapse').sideNav();
                $('.parallax').parallax();
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

            $('.scroll-pane').jScrollPane(); $('.scroll-pane-arrows').jScrollPane({
                showArrows: true,
                horizontalGutter: 10
            });

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