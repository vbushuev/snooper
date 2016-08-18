(function($){

    App.generic.HrefDecoder = {

        init: function() {
            // decode link on desktop on hover
            $('body').on('mouseover focus', 'span.b64href', function() {
                App.generic.HrefDecoder.decode(this);
            });
            
            // decode all links on touch devices
            $('html.touch body span.b64href').each(function(index, item) {
                setTimeout(function() {
                    App.generic.HrefDecoder.decode(item);
                }, index);
            });
                
        },

        /**
         * Decodes one tag link
         * @param target
         */
        decode: function(target) {
            var self = $(target);

            // Decrypt links
            var encHref = self.attr('data-link');
            if (encHref) {
                var clearHref = App.generic.Base64.decode( encHref );
                self.attr('href', clearHref);
            }

            // Get content of span
            var content = self.html();

            // Get all attributes of span
            var attrs = [];
            $.each(target.attributes, function() {
                attrs.push(this.name + '="' + this.value + '"');
            });

            // Replace span with a tag
            self.replaceWith('<a ' + attrs.join(' ') + '>' + content + '</a>');
        }
    };

})(jQuery);