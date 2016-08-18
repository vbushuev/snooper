/**
 * Search suggest call script for FACT-Finder
 * largely based on ffsuggest.jquery.json.js (15.03.2011)
 *
 * @package 	mb3p
 * @subpackage	dmc_m3_integratedsearch_core
 * @access 		public
 * @author		Revathi Ramasamy <revathi.r@embitel.com>
 * @version		$Id: ffcampaign.jquery.json.mb3p.js 45570 2013-10-09 09:58:47Z e-muellfal $
*/
function FFCampaign() {
	var pDebug					= false;
	var pInstanceName			= '';
	var pSearchURL				= '';
	var pQueryParamName			= '';
	var pFormname 				= '';
	var pLayerName				= '';
	var pQueryInput;
	var pSuggest				= new Array();
	var pLastQuery;
	var submitted				= false;
	var pShowImages				= false;
	var	pSearchDelay			= 400; // timer for request-delay between keypresses in milliseconds
	var	pSearchChars			= 2; // searchword must be at least this length before suggest is triggered
	var pTimer					= false;
	var	pSearchTriggered		= false;

	var pSuggestImageClass 		= 'suggestImage';
	var pSuggestQueryClass 		= 'suggestTextQuery';
	var pSuggestTypeClass 		= 'suggestTextType';
	var pSuggestAmountClass     = 'suggestTextAmount';
	var pSuggestQueryTypedClass = 'suggestTextQueryTyped';
	var pSuggestFooterClass     = 'suggestFooter';
	var pSuggestHeaderClass     = 'suggestHeader';
	var pSuggestRowClass	    = 'suggestRow';
	var pSuggestHighlightClass  = 'suggestHighlight';
	var pSuggestQueryStyle 		= "font-weight: bold; padding: 2px 15px 2px 10px;";


	var ptranslation;

	this.init = function(searchURL) {
		var pSearchURL	=	searchURL;
		getCampaign(pSearchURL);

	}
	function getCampaign(pSearchURL){
		var requestURL = pSearchURL;

		$.ajax({
			type: "GET",
			url: requestURL,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success:
				function (json, textStatus) {

					$("div[id^='campaignposition_']").css("display","none");

					var jsonObj = JSON.parse(json);
					if(typeof jsonObj != 'undefined' ) {
						if (jsonObj.length > 0) {
							//create output text
							var htmlPosition;
							var  htmlValue;

								$.each(jsonObj, function(property, object) {
								var htmlPosition='';
								var  htmlValue='';
									$.each(object, function(property, subObject) {
										if(property=='feedbackTexts') {
											$.each(subObject, function(property, subObject1){
												$.each(subObject1, function(property, value){

													if(property=='text'){
														htmlValue	=	value;
													}
													if(property=='id'){
														htmlPosition	=	value;
													}
												});
											});
										}
										if(htmlPosition!='undefined'){
											$('div#campaignposition_'+htmlPosition).html(htmlValue);
											$('div#campaignposition_'+htmlPosition).css("display","block");
										}
									});

								});




						}
						else {

						}
					}
				},
			error:
				function (e, xhr, settings, exception) {
					if (pDebug) {
						alert('Error:\nHTTP result code: ' + e.status+'\nrequested URL: '+requestURL);
					}
				}
		});
	}

}
