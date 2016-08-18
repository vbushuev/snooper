(function($, proto) {

    App.page.Product = {
        pager					: null,
		_productAddToCartForm	: null,

        init: function() {
			// init configurable attributes
			if(! App.module.ProductOptionsConfigurable) {
				console.log('if(! App.module.ProductOptionsConfigurable) {');
				console.warn('App.module.ProductOptionsConfigurable is', App.module.ProductOptionsConfigurable);
			} else {
				new App.module.ProductOptionsConfigurable(window.productId);
			}

			var moreViewsContainer = $('#more-views-slider');
			// more-views --> video links
            var productVideos = App.Data.get('productVideos');
			if(productVideos && productVideos.length) {
				var list = moreViewsContainer.find('ul'), img, videoLink, icon;
				for(var i=0; i < productVideos.length; i++) {
					videoLink = $(productVideos[i]);
					img = list.find('li:first-child img').clone();

					icon = $('<i class="icon"></i>').on('click', function() {

					});

					videoLink
						.prependTo(list)
						.find('a').append(img).append(icon);
				}
			}

			// more-views --> slider
			new App.module.Slider( moreViewsContainer, 6 );

            // Request for error messages, in case they get stuck in varnish cache
            $jq.ajax({
                url: 'kikshop/ajax_messages/get',
                success: function(html) {
                    if (html.length) {
                        $jq('#page_messages').html( html );
                    }
                }
            });

			$('ul.product-infobox-tab').tabs('div.product-infobox-content > div.tabcontent');

			// event: attributes loaded
			$(window).on('attributesLoaded', function () {
				// Check if Article soldout
				var selectElement = $('.product-data div.pallet-container-element:first').find('select option');
				if (selectElement.size() <= 1) {
					$('.main-image-box').append('<div class="soldout-layer">'+ Translator.translate('Leider ausverkauft!') +'</div>');
				}
			});

			var showAttributes = $('#hid_showAttributes').val() == 'true';
			if(showAttributes) {
				// Attributes were not loaded, trigger event manually
				$(window).trigger('attributesLoaded');
			}

			// ZoomoViewer overlay
			$('#products-overview-layer').find('div.overlay-content').attr('id', 'zoomo-overlay-content');

            // Write element ID from rel attribute to href attribute, because there should be a real url in href (for seo)
			var overlays = $('.overlayMe');
			overlays.attr('href', overlays.attr('data-overlay'));
			overlays.fancybox({
				maxWidth	: 600,
				maxHeight	: 500,
				fitToView	: false,
				width		: '70%',
				height		: '70%',
				autoSize	: false,
				closeClick	: false,
				openEffect	: 'none',
				closeEffect	: 'none',
				title		: '',
				beforeLoad: function() {
					$('body').css('position', 'fixed');
					//ET_Event.eventStart('ZoomoViewer Ansicht', 'ZoomoViewer Ansicht', 'Click');
					var imageStr = mainImg = $('.main-image-box').find('#image').attr('kik');
					$('div.more-views').find('img.zoom_img').each(function(key, val) {
						var kikAttr = $(val).attr('kik');
						if (mainImg != kikAttr) {
							if (imageStr != '')
								imageStr += ';';
							imageStr += kikAttr;
						}
					});
					$.getScript('http://kikmedia.zoomoviewer.com/html/static/js/zoomo10.2.js', function() {
						new KikZoomoViewer(imageStr, 'zoomo-overlay-content', App.config.code);
					});

				},
				beforeClose: function() {
					$('body').css('position', 'relative');
				}
			});

			$("div[data-energyLabel]").fancybox({
											 'href'   : '#energylabel-chart',
											 'titleShow'  : false,
											 'transitionIn'  : 'elastic',
											 'transitionOut' : 'elastic'
										 }).hover(function(){
				var $elem = $(this);
				hoverDelay = setTimeout(function() {
					$elem.trigger('click');
				}, 500);
			}, function(){
				clearTimeout(hoverDelay);
			});
			
			// Seals in material tab
			$('.overlayEnlarge')
				.on('click', function() {
					var overlay = $(this).attr('data-overlay');
					$(overlay)
						.fadeIn(50);
					
					return false;
				})
				.on('mouseout', function() {
					var overlay = $(this).attr('data-overlay');
					$(overlay).fadeOut(50);
				});
            
            // Storefinder, in case kik_collection attribute is set
            $('.productStorefinderForm button').on('click', function() {
                var action = $('.productStorefinderForm ').attr('data-action');
                var params = '?' + $('.productStorefinderForm input').serialize();
                location.href = action + params;
                return false;
            });

			this._initLastViewedProducts();
			this._initAddToCart();

        },

		_initAddToCart: function() {
			var $this = this,
				formId = 'product_addtocart_form';

            // Enable cart button, browser cache might show it still disabled
            $('.btn-cart').removeAttr('disabled');

			// add to cart
			this._productAddToCartForm = new VarienForm(formId);

			// add to cart -> submit
			this._productAddToCartForm.submit = function(button, url) {
				if (this.validator.validate()) {
					var form = this.form;
					var oldUrl = form.action;

					if (url) {
						form.action = url;
					}
					var e = null;
					try {
						if (App.config.isAjax) {
							var params = form.serialize();
							params += '&isAjax=1';

							new Ajax.Request(form.action, {
								method: 'post',
								parameters: params,
								onSuccess: function(transport) {
									var json = transport.responseText.evalJSON();
									alert(json.message);

									if (json.success) {
										$H(json.update).each(function(obj) {
											$$(obj.key).each(function(elem) {
												elem.replace(obj.value);
											});
										});
									}
									//lightbox.hide();
								}
							});

						} else
							this.form.submit();

					} catch (e) {
						// exception
					}
					this.form.action = oldUrl;
					if (e) {
						throw e;
					}

                    // Disable cart button
					if (button && button != 'undefined') {
						button.disabled = true;
					}
				}
			}.bind(this._productAddToCartForm);

			// add to cart -> submit light
			this._productAddToCartForm.submitLight = function(button, url) {
				if (this.validator) {
					var nv = Validation.methods;
					delete Validation.methods['required-entry'];
					delete Validation.methods['validate-one-required'];
					delete Validation.methods['validate-one-required-by-name'];
					if (this.validator.validate()) {
						if (url) {
							this.form.action = url;
						}
						this.form.submit();
					}
					Object.extend(Validation.methods, nv);
				}
			}.bind(this._productAddToCartForm);

			// button event
			$('.btn-cart', '#'+ formId).on('click submit', function() {

                var valid = new Validation('product_addtocart_form');
                var validStatus = valid.validate();

                if(validStatus) {
                    $jq('.please-wait-cart').show();
                    var url = $jq('#product_addtocart_form').attr('action');
                    var form = this.form;

                    var newUrl= url.replace("/checkout/cart/", "/kikshop/ajax_checkout_cart/");

                    var params = form.serialize();
                    $jq('tr.addedTr').remove();
                    params += '&isAjax=1';

                    new Ajax.Request(newUrl, {
                        method: 'post',
                        parameters: params,
                        onSuccess:  function(transport) {
                            var json = transport.responseText.evalJSON();


                            if(json.success) {
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


                                $jq.each(json.attribute, function(index, dataValue) {
                                    $jq("<tr class='addedTr'><td>"+ dataValue.label +":</td> <td>" + dataValue.value+ "</td></tr>").insertAfter("tr.product-name");
                                });


                                $jq('.top-link-cart').text('').text(json.itemsCount);
                                App.generic.Header.clearCachedTopLinks();

                                $jq('.confirm-add-to-cart-main').show();

								App.generic.Tracker.addToCart(json);
							}

                            $jq('.please-wait-cart').hide();

                            if(json.fail) {
                                $jq('#page_messages').html("<ul class='messages'><li class='error-msg'><span>"+ json.eMessage +"</span></li></ul>");
                            }else{
                                $jq('#page_messages').html("");
                            }




                        }
                    });
                }


                //$jq('#product-to-cart-please-wait').hide();
				//$this._productAddToCartForm.submit(this);

				return false;
			});
		},


        _initPager: function() {
            var AdsPager = Class.create({
                initialize: function(pid, target, config) {
                    var templates = {
                        next: '<a href="##next_url##" class="kik-arrow-right">##txt_nextarticle##</a>',
                        nextInactive: '<a href="#" class="kik-arrow-right inactive" onclick="return false;">##txt_nextarticle##</a>',
                        prev: '<a href="##prev_url##" class="kik-arrow-left">##txt_prevarticle##</a>',
                        prevInactive: '<a href="#" class="kik-arrow-left inactive" onclick="return false;">##txt_prevarticle##</a>',
                        count: '<span>| ##pos## of ##total## |</span>',
                        backLink: '<a href="##back_link##" class="kik-arrow-left">##txt_back##</a>'
                    };
                    alert(pid);
                    if (config.total != undefined && config.products[pid] != undefined) {
                        var currentProduct = config.products[pid];
                        var backLink = templates.backLink.replace(/##back_link##/g, config.back_url);
                        var countHtml = templates.count.replace(/##total##/g, config.total);
                        countHtml = countHtml.replace(/##pos##/g, currentProduct.pos);
        
                        var nextLink = '';
                        if (currentProduct.next_url)
                            nextLink = templates.next.replace(/##next_url##/g, currentProduct.next_url);
                        else
                            nextLink = templates.nextInactive;
                        var prevLink = '';
                        if (currentProduct.prev_url)
                            prevLink = templates.prev.replace(/##prev_url##/g, currentProduct.prev_url);
                        else
                            prevLink = templates.prevInactive;
                        var html = '<div class="product-navi-top">' +
                            '<div class="left"><p>' + backLink + '</p></div>' +
                            '<div class="right"><p>' + prevLink + countHtml + nextLink + '</p></div>' +
                            '<br class="clearer">' +
                            '</div>';
                        $(target).update(html);
                        //                alert(html);
                    }
                }
            });

            this.pager = new AdsPager('pagerId', 'ads-pager', 'catConfig');
        },
        
        _initLastViewedProducts: function() {
            var RecentProducts = {
                singleUrl: 'kikshop/ajax_catalog_product/getProductHtml/colCount/6/id/',
                container: '#recent-products',
				slider: '#recent-products-slider',
                shownProducts: 12,
                loaded: false,
				_numProducts: 0,
				_loadedProducts: 0,

                /**
                 * Loads html of several product ids and appends an empty container to the list
                 * @param ids Array
                 */
                loadProducts: function(ids) {
                    this.loaded = true;
					this._numProducts = Math.min(this.shownProducts, ids.length);

					if(this._numProducts == 0) {
						$(this.container).hide();
						return;
					}

                    var id, item;
                    for (var i = 0; i < this._numProducts; i++) {
                        //for (var i = 0; i <= 3; i++) {
                        id = ids[i];
                        item = '<li class="loading item id_' + id + '"></li>';
                        $(this.container).find('ul.products-grid').append(item);

                        this.getProductHtml(id);
                    }
                },

                /**
                 * Loads a single product html
                 * @param id
                 */
                getProductHtml: function(id) {
                    if (id) {
                        var tUrl = this.singleUrl + id;
                        new Ajax.Request(tUrl, {
                            method: 'GET',
                            onSuccess: this.onSuccessSingleRequest.bind(this)
                        });
                    }
                },

                /**
                 * Handles ajax load of 1 product
                 * Fills empty container or removes it from list
                 * @param response
                 */
                onSuccessSingleRequest: function(response) {
                    if (!(response && response.responseJSON.id)) {
                        return;
                    }

                    var result = response.responseJSON;
                    var item = $(this.container).find('.id_' + result.id);
                    if (result.id && result.html) {
                        item
                            .html(result.html)
                            .removeClass('loading');
                        item.click(function(){
							//ET_Event.click('ADS%20 ZuletztAngesehen', '')
						});
                        // Init product tiles
                        //bindAndFormatTiles(item);
                    } else {
                        item.remove();
                    }

					this._loadedProducts++;
					if(this._loadedProducts == this._numProducts) {
						this._onAllProductsLoaded();
					}
                },

				_onAllProductsLoaded: function() {
					App.module.ImageLoader.init();

					var slider = new App.module.Slider( $(this.slider), 6 );
				}
            };

			$.getJSON(App.config.baseUrl + 'kikv14/ajax_catalog_product/recentProducts', function(data) {
				if(data && data.length) {
					// remove id = 0
					data.splice(data.indexOf(0), 1);

					RecentProducts.loadProducts(data);
				}
			});
        }

    };

    $(document).on(App.Autoloader.EVENT_COMPLETE, function() {
        App.page.Product.init();
    });
})($jq, $);