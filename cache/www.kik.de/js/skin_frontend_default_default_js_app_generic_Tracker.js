App.generic.Tracker = {

    debug : false,
    canTransliterate : false,
    dropdownEvent: function (dropdown, source) {
        try {
            if (!source)
                source = et_areas;
            var name = $jq(dropdown).children(':selected').text();
            ET_Event.click(name, source);
        } catch (err) {
        }
    },

    dropdownEventCategory: function (dropdown, source, category) {
        try {
            if (!source)
                source = et_areas;
            var name = $jq(dropdown).children(':selected').text();
            ET_Event.eventStart(category, name, 'Click', source);
        } catch (err) {
        }
    },
    trackClick: function (name, source) {
        try {
            ET_Event.click(name, source);
        } catch (err) {
        }
    },

    /**
     * Clicktracking for webtrekk
     * 
     * @param contentId
     * @param contentGroup
     */
    wt_trackClick: function (contentId, contentGroup) {

        try {
            contentId = this.tranliterate(contentId);
            contentGroup = this.tranliterate(contentGroup);
            console.log('WT Click: ' + contentId);
            /*wt.sendinfo ({
                contentId: contentId,
                contentGroup: contentGroup
            });*/
            wts.push(["send", "page", {contentId:contentId, contentGroup:contentGroup}]);
        } catch (err) {
            console.log("click error");
        }
    },

    /**
     * Track checkout steps
     * @param section
     */
    trackCheckoutState: function(section) {

        var separator = '.';
        
        var pageIdParts = kik_wt_config.contentId.split(separator);
        pageIdParts.pop();
        var track = true;
        switch(section) {
            case 'billing':
                pageIdParts.push(this.tranliterate('t#10rechnungsadresse'));
                break;
            case 'shipping':
                pageIdParts.push(this.tranliterate('t#20Lieferadresse'));
                break;
            case 'payment':
                pageIdParts.push(this.tranliterate('t#40Zahlungsmethode'));
                break;
            case 'review':
                pageIdParts.push(this.tranliterate('t#50Bestellübersicht'));
                break;
            default:
                pageIdParts.push('UNDEFINIERT');
        }
        
        var pageId = pageIdParts.join(separator);
        
        //wts.push(['product', kik_wt_config.sku]);
        if(track)
            App.generic.Tracker.wt_trackClick(pageId, kik_wt_config.contentGroup);
    },
    
    trackProductState: function(state, params) {

        var data = {
            contentId: (typeof(params.contentId) !== 'undefined') ? params.contentId : kik_wt_config.contentId,
            contentGroup: (typeof(params.contentGroup) !== 'undefined') ? params.contentGroup : kik_wt_config.contentGroup,
            product: kik_wt_config.name,
            productStatus: state,
            customEcommerceParameter: {}
        };

        for(var prop in params) {
            if (params.hasOwnProperty(prop) && isNaN(prop)) {
                data[prop] = params[prop];
                delete params[prop];
            }
        }

        data.customEcommerceParameter = params;

        var trackObject = ["send", "page", data];

        if(this.debug){
            console.log('DEBUG trackProductState:');
            console.log(trackObject);
        }else {
            wts.push(trackObject);
        }
    },

    replacer: function(match, p1, offset, string) {
        return p1;
    },

    addToCart: function(data, withView) {

        if(this.debug) {
            console.log(data);
        }

        var obj = data['wt_arr'];

        //fix contentId for Ajax addToCart on category and search pages
        if (kik_wt_config.contentId.indexOf("pl#") > -1) {
            obj.contentId = kik_wt_config.contentId.replace(/pl#(\w+)/, this.replacer) + ".p#" + obj[21] + '-' + this.tranliterate(obj[1]);
            obj.contentGroup = kik_wt_config.contentGroup;
            obj.contentGroup[7] = this.tranliterate(obj[14]);
        } else if (kik_wt_config.contentId.indexOf("suche") > -1) {
            obj.contentId = kik_wt_config.contentId + '.p#' + obj[21] + '-' + this.tranliterate(obj[1]);
            obj.contentGroup = kik_wt_config.contentGroup;
            obj.contentGroup[5] = this.tranliterate(obj[5]);
        }

        if(withView){
            var viewObj = Object.clone(obj);
            delete viewObj['35'];  // Remove kik_artikelNummer from data. We don't want it on view
            this.trackProductState('view', viewObj);
        }
        this.trackProductState('add', Object.clone(obj));

    },

    getWtMappingId: function(type, key){
        if(kik_wt_mapping[type][key]){
            return kik_wt_mapping[type][key].id;
        }else{
            return null;
        }
    },
    getWtMappingValue: function(type, key){
        var target = kik_wt_mapping[type] && kik_wt_mapping[type][key] ? kik_wt_mapping[type][key] : null;
        if(target){
            var resp = {};
            resp.id = target.id;
            if(target.obj){
                var varStr = 'kik_wt_config.'+target.obj;
                resp.val = eval(varStr+' ? '+varStr +' : null');
            }

            return resp;
        }

        return null;
    },
    tranliterate: function(str){
        if(this.canTransliterate && typeof getSlug == 'function') {
            return getSlug(str, {
                custom:{
                    '&': 'u',
                    '#': '#',
                    '.': '.',
                    ',': ',',
                    ';': ';',
                    '"': '',
                    '\'': '',
                    '%': '',
                    'Ä': 'AE',
                    'Ü': 'UE',
                    'Ö': 'OE'
                },
                maintainCase: true,
                lang: 'de'
            });
        }
        else{
            return str;
        }
    }
};

// Etracker Dummy
var ET_Event = ET_Event ||
    {
        click: function () {
            console.info('ET_Event.click:', arguments)
        },
        eventStart: function () {
            console.info('ET_Event.eventStart:', arguments)
        },
        eventStop: function () {
            console.info('ET_Event.eventStop:', arguments)
        }
    };

if(typeof etKikRemoveFromBasketClicked != 'function'){
    function etKikRemoveFromBasketClicked(var1, var2){} // placeholder für löschen aus dem warenkorb
}