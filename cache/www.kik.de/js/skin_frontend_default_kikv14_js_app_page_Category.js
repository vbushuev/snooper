(function ($) {

    App.page.Category = {
        /**
         * @type App.module.CategoryFilter
         */
        _filter: null,

        init: function () {
            var self = App.page.Category;

            self.TEXT_AVAILABILITY_ONLINE_0 = Translator.translate('Dieser Artikel ist derzeit nicht im KiK24 Onlineshop erh&auml;ltlich.');
            self.TEXT_AVAILABILITY_ONLINE_1 = Translator.translate('Dieser Artikel ist im KiK24 Onlineshop erh&auml;ltlich.');
            self.TEXT_AVAILABILITY_BRANCH_0 = Translator.translate('Dieser Artikel ist derzeit in keiner KiK-Filiale erh&auml;ltlich.');
            self.TEXT_AVAILABILITY_BRANCH_1 = Translator.translate('Dieser Artikel ist in einer KiK-Filiale erh&auml;ltlich.');

            this._initHeader();
            /*try {
             this._initFilter();
             } catch(e) {
             console.log(e);
             }*/

            this._initProductBoxes();
            this._initProducts();
            this._initButtonToTop();
            this._initFredhopperCategoryFilter();
            this._initFredhopperPriceSlider();
            this._initFredhopperCategorySort();
            this._hideUnevenRowIfNecessary();

            // Request for error messages, in case they get stuck in varnish cache
            $jq.ajax({
                         url:     'kikshop/ajax_messages/get',
                         success: function (html) {
                             if (html.length) {
                                 $jq('#page_messages').html(html);
                             }
                         }
                     });
        },

        _hideUnevenRowIfNecessary: function() {
            var countProductsTotal      = $(".products-grid li.item").length,
                countProductsToHide     = countProductsTotal % 4,
                $productsToHide         = $(".products-grid li.item").slice(-countProductsToHide),
                loadMoreButtonPresent   = $("#pagination-load-more-products").is(":visible");

            if (loadMoreButtonPresent && (countProductsTotal % 4 !== 0)) {
                $productsToHide.each(function() {
                   $(this).hide();
                });
            }
        },

        _showHiddenProducts: function() {
            $(".products-grid li.item").not(':visible').show();
        },

        _initFredhopperCategorySort: function () {
            var $this = this;
            $(document).on('change', '#sort', function () {
                $('input#category-filter-do-search').val($(this).find('option:selected').first().data('params'));
                $this._doSearch();
            });
        },

        _initFredhopperPriceSlider: function () {

            if ($('#price-slider').length < 1) {
                return false;
            }

            var $this = this,
                key  = $("input[name='price-filter-key']").val();

            $('input[name="price-param[filter_key]"]').val(key);

            if ($('input[name="price-param[lower-bound]"]').val() === '') {
                var lowerBound = $('input.price-value-input').first().val();
            } else {
                var lowerBound = $('input[name="price-param[lower-bound]"]').val();
            }

            if ($('input[name="price-param[upper-bound]"]').val() === '') {
                //no selection ever made by user
                var upperBound = $('input.price-value-input').last().val();
            } else {
                var upperBound = $('input[name="price-param[upper-bound]"]').val();
            }

            if ($('input[name="price-param[min]"]').val() === '') {
                //no selection ever made by user
                var lowerSelection = lowerBound;
            } else {
                var lowerSelection = $('input[name="price-param[min]"]').val();
            }

            if ($('input[name="price-param[max]"]').val() === '') {
                var upperSelection = upperBound;
            } else {
                var upperSelection = $('input[name="price-param[max]"]').val();
            }

            if (lowerBound === upperBound) {
                $('#price-lower span').html(parseInt(Math.floor(lowerBound / 100)) + " €");
            }

            $('input[name="price-param[lower-bound]"]').val(lowerBound);
            $('input[name="price-param[upper-bound]"]').val(upperBound);
            $('input[name="price-param[min]"]').val(lowerSelection);
            $('input[name="price-param[max]"]').val(upperSelection);

            $('#price-lower span').html(parseInt(Math.floor(lowerSelection / 100)) + " €");
            $('#price-upper span').html(parseInt(Math.ceil(upperSelection / 100)) + " €");

            $('#price-slider').noUiSlider({
                                              start:   [
                                                  parseInt(Math.floor(lowerSelection / 100)),
                                                  parseInt(Math.ceil(upperSelection / 100))
                                              ],
                                              connect: true,
                                              step:    1,
                                              margin:  1,
                                              range:   {
                                                  'min': parseInt(Math.floor(lowerBound / 100)),
                                                  'max': parseInt(Math.ceil(upperBound / 100))
                                              }
                                          })
                .on('set', function () {
                    var minValue = parseInt($(this).val()[0]),
                        maxValue = parseInt($(this).val()[1]);

                    $('#price-lower span').html(minValue + " €");
                    $('#price-upper span').html(maxValue + " €");
                    $('input[name="price-param[min]"]').val(minValue * 100);
                    $('input[name="price-param[max]"]').val(maxValue * 100);

                    $this._doSearch();

                })
                .on('slide', function () {
                    var minValue = parseInt($(this).val()[0]),
                        maxValue = parseInt($(this).val()[1]);

                    $('#price-lower span').html(minValue + " €");
                    $('#price-upper span').html(maxValue + " €");
                });
        },

        _initHeader: function () {

            //var seoText = $('.categoryHeader .extrawurst').text();
            // If there is seo text to show
            /*if (seoText.length > 15) {
             $('.categoryHeader')
             .click(function() {
             $(this).find('.extrawurst').fadeToggle(150);
             })
             .find('h1').addClass('info');
             }*/
        },

        _initButtonToTop: function () {
            var colLeft = $('.col-left');
            var bottomContainer = jQuery('.extrawurst.category');

            if (bottomContainer.length === 0) {
                bottomContainer = jQuery('.footer');
            }

            // Exit if there is no left column
            if (colLeft.length === 0) {
                return;
            }

            var colLeftY = colLeft.offset().top;

            var btn = $('<a href="#" class="btn-top">nach oben</a>')
                .css({
                         left: $('.page').offset().left + 20
                     })
                .on('click', function () {
                    $("html, body").animate({scrollTop: 0}, "fast");

                    return false;
                })
                .appendTo('.main');

            var onload = function () {
                var scrollY = window.innerHeight + window.scrollY,
                    minY = colLeft.height() + colLeftY + 100,
                    bottomContainerY = bottomContainer.offset().top,
                    fistChildOfSidebar = $jq('.sidebar.col-left').children().first();


                if (scrollY > minY && minY < bottomContainerY && fistChildOfSidebar.is('input')) {
                    // fixed position
                    btn.addClass('show');
                }
                else {
                    // hidden
                    if (btn.hasClass('show')) {
                        btn.removeClass('show');
                    }
                }

                // absolute position on bottom of the page
                if (window.scrollY > $jq('.col-main').offset().top + $jq('.col-main').height() - innerHeight - 15) {
                    btn.addClass('absolute');
                }
                else {
                    if (btn.hasClass('absolute')) {
                        btn.removeClass('absolute');
                    }
                }
            }.bind(this);

            $(window)
                .on('load', onload)
                .on('scroll.btnTop', onload);

            setTimeout(function () {
                $(window).trigger('scroll.btnTop');
            }, 2000);

            $('.title').on('click', function () {
                setTimeout(onload, 280);
            }.bind(this));
        },

        _initProducts: function () {
            var extraParams = '',
                isSearchResultPage = 'searchResult' in window;

            // If we are on a search result page
            if (isSearchResultPage) {
                var searchRes = window.searchResult;
                extraParams += searchRes.etAreaParam + '=' + searchRes.etArea;
            }
            
            // When clicking a product append all GET parameters from URL 
            $('.category-products').on('mousedown', '.products-grid a:not(".hrefdone")', function () {

                // Dont ever append the requestedUrl Parameter (reserved for redirects) 
                if (location.search.indexOf('?requestedUrl') !== -1) {
                    return;
                }

                var href = $(this).attr('href'),
                    urlParams = [location.search.replace('?', ''), extraParams],
                    paramSeparator = href.indexOf('?') === -1 ? '?' : '&';

                // Add tracking param
                var trackParamName = isSearchResultPage ? 'searchPos' : 'navPos';
                urlParams.push(trackParamName + '=' + (parseInt($(this).closest('li').index()) + 1));

                //Add sColor param (always present)
                $selectedColorTile = $(this).closest("li.item").find('.color-tile.selected');
                urlParams.push('sColor=' + encodeURIComponent($selectedColorTile.data('optionid')));

                if (typeof kik_wt_config.sorting !== 'undefined') {
                    urlParams.push('sorting=' + kik_wt_config.sorting);
                }

                // Clean up empty values from param array
                var index = urlParams.length;
                while (index--) {
                    if (!urlParams[index]) {
                        urlParams.splice(index, 1);
                    }
                }

                $(this)
                    .addClass('hrefdone')
                    .attr('href', href  + paramSeparator + urlParams.join('&'));
            });
        },

        _onSubmitToCart: function (event) {
            if ($('ul.sizes').children().length == 0) {
                //$("#ToolTip-Form").submit();
                this._ajaxSubmitToCart();
            }
            else {
                if ($('input[name="super_attribute[243]"]').val() == 0) {
                    $("#advice-required-entry-size-id").show();
                    return false;
                }
                else {
                    if (event.data.isVariant && $('select[name="super_attribute[272]"]').val() == '') {
                        $("#advice-required-entry-variant-id").show();
                        return false;
                    }
                    else {
                        $("#advice-required-entry-size-id").hide();
                        $("#advice-required-entry-variant-id").hide();
                        //$("#ToolTip-Form").submit();
                        this._ajaxSubmitToCart();
                    }
                }
            }
        },

        _ajaxSubmitToCart: function () {
            $jq('.please-wait-cart').show();
            var form = $jq('#ToolTip-Form');
            var url = form.attr('action');

            var newUrl = url.replace("/checkout/cart/", "/kikshop/ajax_checkout_cart/");

            var params = form.serialize();
            params += '&isAjax=1';
            $jq('#product-to-cart-please-wait').show();
            $jq('tr.addedTr').remove();

            new Ajax.Request(newUrl, {
                method:     'post',
                parameters: params,
                onSuccess:  function (transport) {
                    var json = transport.responseText.evalJSON();


                    if (json.success) {
                        $jq('.confirm-add-to-cart .to-cart-overlay-image img').attr({
                                                                                        alt: json.name,
                                                                                        src: json.image
                                                                                    });
                        
                        if (json.brand) {
                            $jq('.confirm-add-to-cart .product-brand td').text(json.brand);
                        }
                        $jq('.confirm-add-to-cart .product-name td').text(json.name);
                        $jq('.confirm-add-to-cart .product-price  td:last').html(json.pprice);
                        $jq('.confirm-add-to-cart .product-qty  td:last').text(json.qty);


                        $jq.each(json.attribute, function (index, dataValue) {
                            $jq("<tr class='addedTr'><td>" + dataValue.label + ":</td> <td>" + dataValue.value + "</td></tr>").insertAfter("tr.product-name");
                        });


                        $jq('.top-link-cart').text('').text(json.itemsCount);
                        App.generic.Header.clearCachedTopLinks();

                        $jq('.confirm-add-to-cart-main').show();

                        App.generic.Tracker.addToCart(json, true);

                    }

                    $jq('.please-wait-cart').hide();

                    if (json.fail) {
                        $jq('#page_messages').html("<ul class='messages'><li class='error-msg'><span>" + json.eMessage + "</span></li></ul>");
                    }
                    else {
                        $jq('#page_messages').html("");
                    }


                }
            });
        },

        _initFredhopperCategoryFilter: function () {
            var $this = this,
                $filterElements = $('.category-filter-option'),
                $filterTitles = $('.category-filter-category .title');

            $('#filter-reset').on('click', function () {
                window.location.href = location.protocol + '//' + location.host + location.pathname;
            });

            $("span.btn-reset").on('click', function(e) {

                e.stopImmediatePropagation();

                if ($(this).hasClass('slider')) {
                    $('input[name="price-param[min]"]').val('');
                    $('input[name="price-param[max]"]').val('');
                } else {
                    $('input#category-filter-do-search').val($(this).data('reset-url'));
                }

                $this._doSearch();

                $(this).hide();

                return false;
            });

            $filterElements.each(function () {
                $(this).on('click', function (e) {
                    $('input#category-filter-do-search').val($(this).data('search-url'));
                    $this._doSearch();
                });
            });

            $filterTitles.each(function () {
                $(this).on('click', function () {
                    $parent = $(this).parent();
                    $parent.toggleClass('opened');
                });
            });
        },

        _doSearch: function () {
            $('form[name="execute-filter-search"]').submit();
        },

        _initFilter: function () {
            var $this = this;
            var jsonFilterData = $('input#filter-data').val();

            if (!jsonFilterData) {
                return;
            }

            /** @type Array **/
            var parsedData = JSON.parse(jsonFilterData),
                filterData = parsedData.filter,
                categoryOrder = parsedData.visible_filters;

            this._filter = new App.module.CategoryFilter($('.category-filter'));
            this._filter.init();

            function sortCategories(a, b) {
                if (!categoryOrder[a.key]) {
                    return 1;
                }
                if (!categoryOrder[b.key]) {
                    return -1;
                }
                var posLeft = parseInt(categoryOrder[a.key].position);
                var posRight = parseInt(categoryOrder[b.key].position);
                return posLeft > posRight ? 1 : -1;
            }

            function getColorCode(search_id) {
                var colorCode = '#666666';
                switch (search_id) {
                    case 1:
                        colorCode = '#103397';	// blau
                        break;
                    case 2:
                        colorCode = '#e6d8bd'; 	// beige
                        break;
                    case 3:
                        colorCode = '#873d01'; 	// braun
                        break;
                    case 5:
                    case 6:
                        colorCode = '#ffd800';	// gelb
                        break;
                    case 15:
                        colorCode = '#FFFFFF';	// weiß
                        break;
                    case 7:
                        colorCode = '#666666'; // grau
                        break;
                    case 8:
                        colorCode = '#2d771f';	// grün
                        break;
                    case 9:
                        colorCode = '#7b2a82';	// lila
                        break;
                    case 11:
                        colorCode = '#fe98da';	// rosa
                        break;
                    case 12:
                        colorCode = '#f01b1b';	// rot
                        break;
                    case 10:
                        colorCode = '#ff9c00';	// orange
                        break;
                    case 13:
                        colorCode = '#000000';	// schwarz
                        break;
                    case 14:
                        colorCode = '#CCCCCC';	// silber
                        break;
                    case 4:
                        colorCode = App.config.skinUrl + 'images/tile-colorful.jpg'; // bunt | super-special!!
                        break;
                }
                return colorCode;
            }

            // Sort filterData by categoryOrder
            filterData.sort(sortCategories);

            for (var i = 0; i < filterData.length; i++) {
                var category = filterData[i],
                    key = category.key,
                    options = category.options,
                    resetUrl = category.reset_url;
                if (!categoryOrder[key]) {
                    continue;
                }
                //if($.inArray(key, categoryOrder) == -1)
                //	continue;

                if (!options || !options.length) {
                    continue;
                }

                // Map data
                if (key == 'size_searchable') {
                    options.map(function (option) {
                        option.icon = 'size';
                        return option;
                    });
                }

                if (key == 'color_searchable') {
                    options.map(function (option) {
                        option.icon = getColorCode(option.search_id);
                        return option;
                    });
                }

                if (key == 'availability') {
                    options.map(function (option) {

                        if (option.title == "Online") {
                            option.icon = App.config.skinUrl + '/cache/www.kik.de/img/images_icon_availability_online.png';
                        }
                        else {
                            if (option.title == "Filiale") {
                                option.icon = App.config.skinUrl + '/cache/www.kik.de/img/images_icon_availability_store.png';
                            }
                        }
//						if(option.key == "filterkik24_available_online" || option.key == "kik24_available_online") {
//							option.icon = App.config.skinUrl + '/cache/www.kik.de/img/images_icon_availability_online.png';
//						} else if(option.key == "filterkik24_available_instore" || option.key == "kik24_available_instore") {
//							option.icon = App.config.skinUrl + '/cache/www.kik.de/img/images_icon_availability_store.png';
//						}
                        return option;
                    });
                }

                var catVisible = true;
                if (categoryOrder[key].hidden == 1) {
                    catVisible = false;
                }
                category.is_desktop = true;

                var cat = this._filter.addCategory(category, options, catVisible);
                if (resetUrl) {
                    cat.setResetUrl(resetUrl);
                }
            }

            App.tick(function () {
                var filteredSearchOptionId = parseInt($jq('.category-filter-category-color_searchable .category-filter-option input:checked:first').data('searchid'));
                if (!isNaN(filteredSearchOptionId)) {
                    var preSelectColorTile = function () {
                        var tile = $(this);
                        var searchOptionIds = tile.data('searchoptionid').toString().split(",");
                        for (var i = 0; i < searchOptionIds.length; i++) {
                            if (searchOptionIds[i] == filteredSearchOptionId) {
                                var product = tile.closest('li.item');
                                $this._changeMainImage(product, tile.find('img').data('mainimg'));
                            }
                        }
                    };

                    // Pre-select color-tiles
                    $jq('.products-grid').find('li.item .color-tile').each(preSelectColorTile);

                    $jq(window).bind('onSearchResultLoaded', function (e, item) {
                        $jq(item).find('.color-tile').each(preSelectColorTile);
                    });
                }
            });

            this._filter.onComplete(parsedData.reset_url);
        },

        /**
         *
         * @private
         */
        _initProductBoxes: function () {
            var $this = this,
                products = $('ul.products-grid'), product;

            $('li.item', products).each(function () {
                product = $(this);

                $this._initColorTile(product, products);
                $this._initAvailability(product, products);
            });

            // Fix ie8
            if (App.config.browser.isIE8) {
                $('ul.products-grid.column-3 li.item:nth-child(3n+3)').css('margin-right', 0);
                $('ul.products-grid.column-3 li.item:nth-child(3n+4)').css('margin-left', 0);

                $('ul.products-grid.column-4 li.item:nth-child(4n+4)').css('margin-right', 0);
                $('ul.products-grid.column-4 li.item:nth-child(4n+5)').css('margin-left', 0);
            }
        },

        /**
         *
         * @param product
         * @param scope
         * @private
         */
        _initColorTile: function (product, scope) {
            var $this = this;

            function onTooltipShow(e) {
                var tile = $(this);

                // Check if we need to show a tooltip
                if (tile.hasClass('no-tooltip')) {
                    return;
                }

                var attributes = product.data('attributes'),
                    status = product.data('status'),
                    availability = product.data('availability');

                var colorOptionId = tile.data('optionid'),
                    content = null;

                /** @var App.module.TooltipLayer tooltip **/
                var tooltip = new App.module.TooltipLayer(tile, scope);

                tooltip.init(210, 100);

                if (attributes) {
                    // parse cached data
                    content = $this._initColorTileAction(product, attributes, colorOptionId, availability);

                    tooltip.fill(content);
                }
                else {
                    // load content
                    tooltip.isLoading(true);
                    loadProductData(function (attributes, status, availability) {
                        content = $this._initColorTileAction(product, attributes, colorOptionId, availability);

                        tooltip
                            .isLoading(false)
                            .fill(content);
                    });
                }

                e.stopPropagation();
            }

            function onMainImageChange(e) {
                var img = $(this).find('img').data('mainimg');
                $(this).siblings().removeClass('selected');
                $(this).addClass('selected');
                $this._changeMainImage(product, img);
            }

            function loadProductData(callback) {
                var productId = product.data('productid'),
                    url = App.config.baseUrl + 'kikshop/ajax_catalog_product/getProductAttributesJson/id/' + productId;

                return $.getJSON(url, function (dataObj) {
                    var attributes = dataObj.jsonConfig.attributes,
                        status = dataObj.jsonConfig.product_status,
                        availability = dataObj.jsonConfig.product_availability;

                    // cache attribute data
                    product.data({
                                     attributes:   attributes,
                                     status:       status,
                                     availability: availability
                                 });

                    callback.call(this, attributes, status, availability);
                }.bind(this));
            }

            product
                .on('mouseenter', '.color-tile', onTooltipShow)
                .on('mouseenter', '.color-tile', onMainImageChange);
        },

        /**
         *
         * @param item
         * @param scope
         * @private
         */
        _initAvailability: function (item, scope) {
            var timeoutId = 0;

            item
                .on('mouseenter', '.availability .icon', function (e) {
                    var icon = $(this);

                    clearInterval(timeoutId);
                    timeoutId = setTimeout(function () {
                        var content = '';
                        if (icon.hasClass('online')) {
                            if (icon.hasClass('available')) {
                                content = App.page.Category.TEXT_AVAILABILITY_ONLINE_1;
                            }
                            else {
                                content = App.page.Category.TEXT_AVAILABILITY_ONLINE_0;
                            }
                        }
                        else {
                            if (icon.hasClass('branch')) {
                                if (icon.hasClass('available')) {
                                    content = App.page.Category.TEXT_AVAILABILITY_BRANCH_1;
                                }
                                else {
                                    content = App.page.Category.TEXT_AVAILABILITY_BRANCH_0;
                                }
                            }
                        }

                        new App.module.TooltipLayer(icon, scope)
                            .init(130, 45)
                            .fill(content)
                            .closeOnMouseLeave();
                    }, 250);

                    e.stopPropagation();
                })
                .on('mouseleave', '.availability .icon', function () {
                    clearInterval(timeoutId);
                });
        },

        /**
         *
         * @param product
         * @param attributes
         * @param colorOptionId
         * @param availability
         * @returns {*|HTMLElement}
         * @private
         */
        _initColorTileAction: function (product, attributes, colorOptionId, availability) {
            var color = this._getColorOption(attributes, colorOptionId),
                sizes = this._getSizeOptions(attributes),
                variant = this._getVariantOptions(attributes);

            return this._getColorTileTooltipContent(product, color, sizes, availability, variant);
        },

        /**
         *
         * @param attributes
         * @param optionId
         * @returns {*}
         * @private
         */
        _getColorOption: function (attributes, optionId) {
            var attribute, options, option;
            for (var attributeId in attributes) {
                attribute = attributes[attributeId];
                if (attribute.code == 'color') {
                    options = attribute.options;
                    for (var i = 0, len = options.length; i < len; i++) {
                        option = options[i];
                        if (option.id == optionId) {
                            return option;
                        }
                    }
                }
            }
            return null;
        },

        /**
         *
         * @param attributes
         * @returns {*}
         * @private
         */
        _getSizeOptions: function (attributes) {
            var attribute, options, option;
            for (var attributeId in attributes) {
                attribute = attributes[attributeId];
                if (attribute.code == 'size') {
                    return attribute.options;
                }
            }
            return [];
        },

        /**
         *
         * @param attributes
         * @returns {*}
         * @private
         */
        _getVariantOptions: function (attributes) {
            var attribute;
            for (var attributeId in attributes) {
                attribute = attributes[attributeId];
                if (attribute.code == 'variante') {
                    return attribute.options;
                }
            }
            return [];
        },

        /**
         *
         * @param product
         * @param color
         * @param availability
         * @param sizes
         * @returns {*|HTMLElement}
         * @private
         */
        _getColorTileTooltipContent: function (product, color, sizes, availability, variants) {
            var size,
                htmlObj,
                mainProductId = product.data('productid'),
                formSubmitUrl = product.data('submiturl'),
                overall_available_instore = false,
                overall_available_online = false,
                available_instore = false,
                available_online = false,
                available_min_qty = 1,
                is_available_online = false,
                sizesSet = [],
                variantsSet = [],
                showSizes = !!sizes.length,
                showVariants = !!variants.length,
                productId = 0;

            // Check color
            if (!showSizes) {
                productId = color.products[0];
                available_instore = !!availability[productId].instore;
                available_online = !!availability[productId].online;
                available_min_qty = availability[productId].min_qty ? availability[productId].min_qty : 1;

                // Set flags for icons
                // overall_available_online = available_online;
                // overall_available_instore = available_instore;
            }

            // Fill sizes
            for (var i = 0, len = sizes.length; i < len; i++) {
                size = sizes[i];
                productId = 0;
                var available_size_min_qty = 1;

                // Check availability
                productId = this._matchProducts(size.products, color.products);

                // Nur die zugehörigen Größen der Farben anzeigen
                if (!productId) {
                    continue;
                }

                if (showVariants) {
                    var sizeVariants = this._getVariantsBySize(variants, size.products),
                        selectVariants = [];

                    for (var v = 0, leng = sizeVariants.length; v < leng; v++) {
                        var sizeVar = sizeVariants[v];
                        for (var p = 0, l = sizeVar.products.length; p < l; p++) {
                            selectVariants.push({id: sizeVar.id, label: sizeVar.label});
                            available_instore = (!available_instore & availability[productId].instore) ? true : false;
                            available_online = (!available_online & availability[productId].online) ? true : false;
                        }
                    }
                }
                else {
                    if (productId && availability[productId]) {
                        available_instore = availability[productId].instore ? true : false;
                        available_online = availability[productId].online ? true : false;
                        available_size_min_qty = availability[productId].min_qty ? availability[productId].min_qty : 1;
                    }
                }

                if (available_size_min_qty < available_min_qty) {
                    available_min_qty = available_size_min_qty;
                }

                if (available_online) {
                    overall_available_online = true;
                    is_available_online = true;
                }
                if (available_instore) {
                    overall_available_instore = true;
                }

                sizesSet[i] = $('<li class="' + (available_online ? 'available' : '') + ' n-' + i + '" data-optionid="'
                                + size.id + '" data-available-online="' + (available_online ? 1 : 0) + '" data-available-instore="'
                                + (available_instore ? 1 : 0) + '" data-available-min-qty="' + (available_size_min_qty) + '"><span>' + size.label + '</span></li>')
                    .data('variants', selectVariants)
                    .on('click', function (e) {
                        var li = $(this);
                        if (!li.hasClass('selected')) {
                            // Select
                            var available_online = li.data('available-online') == '1',
                                available_instore = li.data('available-instore') == '1',
                                available_min_qty = li.data('available-min-qty');

                            li.parent('ul').find('li').removeClass('selected');
                            li.addClass('selected');

                            // Load variants
                            if (showVariants) {
                                var vars = li.data('variants'),
                                    htmlOptions = '<option value="">Variante wählen</option>';

                                for (var i = 0, len = vars.length; i < len; i++) {
                                    htmlOptions += '<option value="' + vars[i].id + '">' + vars[i].label + '</option>';
                                }

                                htmlObj.find('select.variants').html(htmlOptions).removeAttr('disabled');
                            }

                            if (available_online) {
                                // show cart-button
                                htmlObj.find('button.btn-cart-disable').removeClass('btn-cart-disable').addClass('btn-cart');
                                $jq('#advice-required-entry-size-id').hide();
                                htmlObj.find('button.btn-cart').show();
                                htmlObj.find('button.btn-instore').hide();

                                // update availability icons
                                htmlObj.find('.icons .icon.online').addClass('available');
                                //htmlObj.find('.icons .icon.branch').removeClass('available');

                                // update form infos
                                htmlObj.find('input[name="qty"]').val(available_min_qty);
                                htmlObj.find('input[name="super_attribute[243]"]').val(li.data('optionid'));
                            }
                            else {
                                if (available_instore) {
                                    // show instore notice
                                    htmlObj.find('button.btn-cart, button.btn-cart-disable').hide();
                                    htmlObj.find('button.btn-instore').show();

                                    // update availability icons
                                    htmlObj.find('.icons .icon.online').removeClass('available');
                                    htmlObj.find('.icons .icon.branch').addClass('available');

                                    // update form infos
                                    htmlObj.find('input[name="qty"]').val(0);
                                    htmlObj.find('input[name="super_attribute[243]"]').val(0);
                                }
                                else {
                                    // show instore notice
                                    htmlObj.find('button.btn-cart, button.btn-cart-disable').hide();
                                    htmlObj.find('button.btn-instore').hide();

                                    // update availability icons
                                    htmlObj.find('.icons .icon.online').removeClass('available');
                                    htmlObj.find('.icons .icon.branch').removeClass('available');

                                    // update form infos
                                    htmlObj.find('input[name="qty"]').val(0);
                                    htmlObj.find('input[name="super_attribute[243]"]').val(0);
                                }
                            }
                        }
                    });
            }

            var showButtonCart = !showSizes && available_online,
                showButtonInstore = !showSizes && available_instore && !available_online,
                showButtonNowhere = !showSizes && !available_instore && !available_online;

            var htmlStrInForm = '';
            if (kik_wt_config.webdba_tracking_path.indexOf('Suche') < 0) {
                if (kik_wt_config.webdba_tracking_path.length > 0) {
                    var str = kik_wt_config.webdba_tracking_path;
                    //str = str[1];
                    str = str.split("#");

                    for (var i = 0; i < str.length; i++) {
                        htmlStrInForm = htmlStrInForm + '<input type="hidden" name="pp_product_category[]" value="' + str[i] + '" />';
                    }

                }
                else {
                    htmlStrInForm = htmlStrInForm + '<input type="hidden" name="pp_product_category[]" value="" />';
                }
                htmlStrInForm = htmlStrInForm + '<input type="hidden" name="etp_product_area" id="etp_product_area" value="' + str.join(' > ') + '"/>';
            }
            else {
                htmlStrInForm = htmlStrInForm + '<input type="hidden" name="pp_product_category[]" value="Suche" />';
                htmlStrInForm = htmlStrInForm + '<input type="hidden" name="etp_product_area" id="etp_product_area" value="Suche"/>';
            }

            var htmlSizesElement = '';

            if (sizesSet != '') {
                htmlSizesElement = '<input type="hidden" name="super_attribute[243]" value="0">';
            }
            
            var htmlWtElement = '';
            if (kik_wt_config.bereich) {
                htmlWtElement += '<input type="hidden" name="wt_bereich" value="' + kik_wt_config.bereich + '"/>';
                if (kik_wt_config.sortiment) {
                    htmlWtElement += '<input type="hidden" name="wt_sortiment" value="' + kik_wt_config.sortiment + '"/>';
                    if (kik_wt_config.shop) {
                        htmlWtElement += '<input type="hidden" name="wt_shop" value="' + kik_wt_config.shop + '"/>';
                    }
                }
            }

            if (kik_wt_config.pageType == 'catalog_category_view' || kik_wt_config.pageType == 'catalogsearch_result_index') {
                var posKey = null;
                if (kik_wt_config.pageType == 'catalog_category_view') {
                    posKey = 'wt_naviPosition';
                }
                else {
                    if (kik_wt_config.pageType == 'catalogsearch_result_index') {
                        posKey = 'wt_searchPosition';
                    }
                }
                if (posKey) {
                    var targetMeta = product.find('meta[itemprop="sku"]')
                    var sku = targetMeta.attr('content');
                    //var item = jQuery('ul.products-grid li.item meta[content="' + sku + '"]')
                    var idx = jQuery('ul.products-grid li.item meta[itemprop="sku"]').index(targetMeta);

                    var htmlWtPosition = '<input type="hidden" name="' + posKey + '" value="' + (isNaN(idx) ? '' : (idx+1)) + '" />';
                    htmlWtElement += htmlWtPosition;
                }
            }


            htmlObj = $(
                '<div class="container">' +
                '	<div class="color">' +
                '		<b>Farbe:</b>' + color.label +
                '	</div>' +
                //'	<div class="availability">' +
                //'		<b>Erh&auml;ltlich:</b>' +
                //'		<div class="icons">' +
                //'			<div class="icon online '+ (overall_available_online ? 'available' : '') +'"></div>' +
                //'			<div class="icon branch '+ (overall_available_instore ? 'available' : '') +'"></div>' +
                //'			<br class="clearer"/>' +
                //'		</div>' +
                //'	</div>' +
                '	<div class="sizes" style="' + (!showSizes ? 'display: none;' : '') + '">' +
                '		<b>verf&uuml;gbare Gr&ouml;&szlig;en:</b>' +
                '		<ul class="sizes"></ul>' +
                '	    <div style="" id="advice-required-entry-size-id" class="validation-advice">' + Translator.translate('Please select size') + '</div>' +
                '		<br class="clearer"/>' +
                '	</div>' +
                '	<form action="' + formSubmitUrl + '" method="post" enctype="multipart/form-data" id="ToolTip-Form">' +
                '		<input type="hidden" name="product" value="' + mainProductId + '">' +
                //'		<input type="hidden" name="qty" value="1">' +
                htmlStrInForm +
                '		<input type="hidden" name="etp_product_area" value="">' +
                htmlWtElement +
                //'		<input type="hidden" name="super_attribute[243]" value="0">' +
                '		<input type="hidden" name="super_attribute[80]" value="' + color.id + '">' +
                htmlSizesElement +
                '	    <div class="variants" style="' + (!showVariants ? 'display: none;' : '') + '">' +
                '		    <b>verf&uuml;gbare Varianten:</b>' +
                '		    <select class="variants" name="super_attribute[272]" disabled="disabled">' +
                '               <option value="">Bitte zuerst Gr&ouml;&szlig;e w&auml;hlen</option>' +
                '           </select>' +
                '	        <div style="" id="advice-required-entry-variant-id" class="validation-advice">' + Translator.translate('Please select variant') + '</div>' +
                '		    <br class="clearer"/>' +
                '	    </div>' +
//				'		<button onmousedown="ET_Event.click(\'A%DCS%20InDenEinkaufwagen\', \'\')" type="button" title="' + Translator.translate('Add to Cart') + '" class="button cart-submit ' + (is_available_online ? 'btn-cart-disable' : 'btn-cart') + '" style="' + (showButtonCart ? 'display: inline-block;' : '') + '"><span><span>' + Translator.translate('Add to Cart') + '</span></span></button>' +
				'		<div class="qty-container">'+ // menge
				'			<label for="qty"><b>Menge:</b></label>'+
				'			<input type="text" name="qty" class="input-text qty ' + (is_available_online ? 'btn-cart-disable' : 'btn-cart') + '" style="' + (showButtonCart ? 'display: inline-block;' : '') + '" value="'+available_min_qty+'"/>' +
				'		</div>'+
				//'		<button onmousedown="ET_Event.click(\'A%DCS%20InDenEinkaufwagen\', \'\')" type="button" title="' + Translator.translate('Add to Cart') + '" class="button cart-submit ' + (is_available_online ? 'btn-cart-disable' : 'btn-cart') + '" style="' + (showButtonCart ? 'display: inline-block;' : '') + '"><span><span>' + Translator.translate('In den Einkaufswagen') + '</span></span></button>' +
				'		<button type="button" title="' + Translator.translate('Add to Cart') + '" class="button cart-submit ' + (is_available_online ? 'btn-cart-disable' : 'btn-cart') + '" style="' + (showButtonCart ? 'display: inline-block;' : '') + '"><span><span>' + Translator.translate('In den Einkaufswagen') + '</span></span></button>' +
				'		<button type="button" title="'+ Translator.translate('Nur in der Filiale erhältlich') +'" class="button btn-instore" style="'+ (showButtonInstore ? 'display: inline-block;' : '') +'"><span><span>'+ Translator.translate('Nur in der Filiale erhältlich') +'</span></span></button>' +
				'		<button type="button" title="'+ Translator.translate('Artikel nicht verfügbar') +'" class="button btn-nowhere" style="'+ (showButtonNowhere ? 'display: inline-block;' : '') +'"><span><span>'+ Translator.translate('Artikel nicht verfügbar') +'</span></span></button>' +
				'	</form>' +
				'</div>');

            htmlObj.find('ul.sizes').append(sizesSet);
            htmlObj.find('button.cart-submit').on('click',
                                                  {isVariant: showVariants},
                                                  this._onSubmitToCart.bind(this)
            );

            return htmlObj;
        },

        /**
         *
         * @param product
         * @param img
         * @private
         */
        _changeMainImage: function (product, img) {
            if (product.hasClass('loaded-image')) {
                product.find('.product-image > img').attr('src', img);
            }
            else {
                product.find('.product-image > img').data('src', img);
            }
        },

        _matchProducts: function (products, parentProducts) {
            // Check availability
            for (var i = 0, len = products.length; i < len; i++) {
                if ($.inArray(products[i], parentProducts) != -1) {
                    return products[i];
                }
            }

            return 0;
        },

        _getVariantsBySize: function (variants, sizes) {
            var matchedVars = [];
            for (var v = 0, len = variants.length; v < len; v++) {
                var variant = variants[v];
                for (var i = 0, leng = variant.products.length; i < leng; i++) {
                    if ($.inArray(variant.products[i], sizes) != -1) {
                        matchedVars.push(variant);
                    }
                }
            }

            return matchedVars;
        }
    };


    App.page.Category.LeftNavi = {
        // Toggle data, array like [8,4,6]. Represents number of visible subcategories for the 3 main items 
        toggleData: [],
        txtMore:    '',
        txtLess:    '',

        /**
         * Initial setup for left navigation
         * @param toggleData
         * @param txtMore
         * @param txtLess
         */
        init: function (toggleData, txtMore, txtLess) {
            this.toggleData = toggleData;
            this.txtMore = txtMore;
            this.txtLess = txtLess;

            var self = this;

            // Hide items and append toggle button
            $jq('.col-left').find('.parent').each(function (i, element) {
                self.hideItems(element, toggleData[i]);
                if ($jq(element).find('li:hidden').length) {
                    $jq(element).append($jq(self.getToggleTpl()));
                }
            });

            // Add click handler for toggle buttons
            $jq('.col-left').on('click', '.toggle', function () {
                if ($jq(this).hasClass('open')) {
                    var index = $jq(this).parent().index();
                    self.hideItems($jq(this).parent(), self.toggleData[index]);
                    $jq(this).removeClass('open').text(self.txtMore);
                }
                else {
                    self.showItems($jq(this).parent());
                    $jq(this).addClass('open').text(self.txtLess);
                }

                return false;
            });
        },

        /**
         * Hides some sub-items of element
         * @param element       parent item
         * @param count         number of items to be left visible
         */
        hideItems: function (element, count) {
            var items = $jq(element).find('ul li:gt(' + (count - 1) + ')');
            items.hide();
        },

        /**
         * Shows all items of element
         * @param element
         */
        showItems: function (element) {
            $jq(element).find('ul li').show();
        },

        /**
         * Returns template of toggle button
         * @returns {string}
         */
        getToggleTpl: function () {
            return '<a class="toggle" href="#">' + App.page.Category.LeftNavi.txtMore + '</a>';
        }

    };

    $(document).on(App.Autoloader.EVENT_COMPLETE, function () {
        App.page.Category.init();
    });

})($jq);