(function($) {
    $('#pagination-load-more-products').on('click', function() {

        var $this = $(this);
        var queryString = $this.attr('data-querystring');

        $('.please-wait-cart').show();

        $.get('/fhsearch/ajax/loadmore/' + queryString, function(result) {

            if (result === '')
                return;

            var result = $.parseJSON(result);

            var products = result.products;
            var next_page_query = '?' + result.nextPageQuery;

            var $productsContainer = $('ul.products-grid.column-4');

            for (var i=0;i<products.length; i++ ) {
                $productsContainer.append(products[i]);
            }

            App.page.Category._showHiddenProducts();
            App.page.Category._initProductBoxes();
            App.page.Category._initProducts();

            $('#pagination-load-more-products').attr('data-querystring', next_page_query);

            if (next_page_query === '?false') {
                $('#pagination-load-more-products').hide();
            }

            App.page.Category._hideUnevenRowIfNecessary();

            $('.please-wait-cart').hide();

            $(window).trigger('scroll');

        });
    });
})(jQuery);