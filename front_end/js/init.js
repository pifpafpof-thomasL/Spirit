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

        }); // end of document ready
})(jQuery); // end of jQuery name space