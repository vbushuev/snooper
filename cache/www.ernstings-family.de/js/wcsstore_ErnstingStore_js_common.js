// Namespace object for ernstings family functions
var efobj = new Object();

efobj.clearSimpleErrors = function(errorBoxId, errorBoxElemParam){
  if(!errorBoxId)
    errorBoxId = "errorBox";
  var errorBoxElem = errorBoxElemParam;
  if(!errorBoxElem)
    errorBoxElem = $(errorBoxId);
  errorBoxElem.setHTML('');
  errorBoxElem.getParent().addClass('hideout');
};

efobj.setSimpleErrors = function(errorStringArray, errorBoxId, errorBoxElemParam){
  if(!errorBoxId)
    errorBoxId = "errorBox";
  var errorBoxElem = errorBoxElemParam;
  if(!errorBoxElem)
    errorBoxElem = $(errorBoxId);
  errorBoxElem.setHTML('');
  errorBoxElem.getParent().removeClass('hideout');
  for(var i = 0; i < errorStringArray.length; i++){
    var tmpEL = new Element('span');
    tmpEL.setHTML("<li>" + errorStringArray[i] + "</li>");
    tmpEL.injectInside(errorBoxElem);
  }   
};

efobj.cutTextareaLength = function(textarea, max) {
  textarea = $(textarea);
  if(textarea.getValue() && max && textarea.getValue().length > max) {
    textarea.value = textarea.getValue().substring(0, max);
  }
}

// if open print the layer else do a normal print
efobj.print = function() {
  if($('PageOverlay') && !$('PageOverlay').hasClass('hideout')) {
    efobj.printLayer();
  } else
    self.print();
};

// print only the Layer
efobj.printLayer = function() {
  if($('page'))
    $('page').addClass('dont_print');
  self.print();
};

// Simple logging with firebug or alert function
efobj.log = function(value) {
  if (window.console) { console.log(value); } else {alert(value);}
};

/**
 * opens a given url a new window
 */
efobj.openWindow = function(link, title, width, height, posX, posY) {
  var newWindow = window.open(link, title, "menubar=0,toolbar=0,resizable=0,location=0,status=1,scrollbars=1,width=" + width + ",height=" + height);
  if(posX> 0 && posY > 0) newWindow.moveTo(posX, posY);
}

efobj.openSimpleWindow = function(link, title, width, height) {
  var newWindow = window.open(link, title, "menubar=0,toolbar=0,resizable=0,location=0,status=1,scrollbars=0,width=" + width + ",height=" + height);
}

efobj.setDefaultValue = function(element, value) {
  // Remember initial default value
  element.default_value = value;
  $(element).addClass("auto_grey");
}

efobj.setInputValue = function(element, value) {
  // Set default value when not overridden
  if (value == '') {
    element.value = element.default_value;
  } else {
    element.value = value;
  }

  if (element.value == element.default_value) {
    element.removeClass('active');
  } else {
    element.addClass('active');
  }
}

/**
  * Checks a Radio button on a form (with id "formId") of a button group ("name") and 
  * value ("value") and executes the onclick function if the flag ("click") is set.
  */
efobj.checkRadioButton = function(formId, name, value, click) {    
    buttons = $ES('input', formId);
    if(name.length > 0) {
      buttons = $ES('input[name='+name+']', formId);
    }
    for (var i = 0; i < buttons.length; i++) {
      if(buttons[i].value == value || !value){
        buttons[i].checked = true;
        if(click){ buttons[i].onclick();};
        break;
      }   
    }
}

/**
 * Click a Radio button on a form (with id "formId") of a button group ("name") and 
 * value ("value") and executes the onclick function if the flag ("click") is set.
 */
efobj.clickRadioButton = function(formId, name, value, click) {    
   buttons = $ES('input', formId);
   if(name.length > 0) {
     buttons = $ES('input[name='+name+']', formId);
   }
   for (var i = 0; i < buttons.length; i++) {
     if(buttons[i].value == value || !value){
       buttons[i].checked = true;
       if(click){ buttons[i].click();};
       break;
     }   
   }
}


/**
  * Checks a Checkbox on a form (with id "formId") and ("name") and 
  * value ("value").
  */
efobj.checkCheckbox = function(formId, name, value) {    
  checkbox = $ES('input[name='+name+']', formId);
    if (value == 'true'){
      checkbox[0].checked = true;
    } 
}

/**
  * Enable child fields on regisrtation forms
  */
efobj.activateChilds = function() {
  $j(".dl_child").removeClass('inactive').show();
  $j("#childJoBHead").removeClass('inactive').show();
  $j("#moreChildren").removeClass('inactive').show(); 
  for(i=1;i<=$j('#childContainer').children().size();i++) {
    $j("#child"+i).removeAttr('disabled');
  }
}        

efobj.arrayIndexOf = function(array, value){
  var result = -1;
  for (var i = 0; i < array.length && !(array[i] == value); i++);
  if(array[i] == value)
    result = i;
  return result;
}


efobj.checkCountrybox = function(formId, name, thisValue, defaultValue) {    
  checkbox = $ES('input[name='+name+']', formId);
  if (checkbox.length){
    var defaultArray = defaultValue.split(',');
    
    if(efobj.arrayIndexOf(defaultArray, thisValue) < 0){
      checkbox[0].checked = false;
      checkbox[0].disabled = true;  
      $('shipping').addClass('gray');
    }else{
      checkbox[0].disabled = false;
      $('shipping').removeClass('gray');
    }
  }
}

efobj.concatDate = function(day, month, year) {
  var result = '';
  if (day != '' || month != '' || year != '') {
    result = day + '.' + month + '.' + year;
  }
  return result;
}

efobj.concatDateIso = function(day, month, year) {
  var result = '';
  if (day != '' || month != '' || year != '') {
    result = year + '-' + month + '-' + day;
  }
  return result;
}

efobj.formatDate = function(textarea) {
  if ($(textarea).value.length > 0) {
    var dateParts = $(textarea).value.split('.');
    var day = '00' + (dateParts.length > 0 ? dateParts[0] : '');
    day = day.substr(day.length - 2);
    var month = '00' + (dateParts.length > 1 ? dateParts[1] : '');
    month = month.substr(month.length - 2);
    var year = '0000' + (dateParts.length > 2 ? dateParts[2] : '');
    year = year.substr(year.length - 4);
    $(textarea).value = day + '.' + month + '.' + year;
  }
}

efobj.formatNumber = function(textarea, length) {
  if ($(textarea).value.length > 0) {
    var number = '000000000' + $(textarea).value;
    number = number.substr(number.length - length);
    $(textarea).value = number;
  }
}

efobj.CheckQuantity = function(value,lower,upper) {    
    return (/^[0-9]+$/.test(value)) && (lower <= upper && value >= lower && value <= upper);
}
/**
 * All input fields with class "auto_grey" will show its initial value, when clicked
 * input field is cleared and text color changes
 */
efobj.autoGrey = function(element) {
  efobj.setInputValue(element, element.value);

  element.addEvents({
    'focus': function() {element.addClass('active'); if (element.value == element.default_value) {element.value = '';}},
    'blur' : function() {if (element.value == '') {element.removeClass('active'); element.value = element.default_value;}}
  });
}

efobj.defaultValueToggle = function(element, value) {
  if(element.value == value) {
    element.value = value;
    element.default_value = value;
    element.removeClass('active');
    
    element.addEvents({
      'focus': function() {element.addClass('active'); if (element.value == element.default_value) {element.value = '';}},
      'blur' : function() {if (element.value == '') {element.removeClass('active'); element.value = element.default_value;}}
    });
  }
}

/**
 * Helper to get the correct image source when the transparent png fix for IE is used
 */
efobj.getImgSrc = function(element) {
  return element.realSrc || element.src;
}

/**
 * Mouse-Over Effect for all image tags with class "mouseover_image".
 * Image will not change when image is in "active" state!
 */
efobj.autoMouseOver = function(element) {
  // pre-load mouse-over images for faster display

  var overImageSrc = efobj.getImgSrc(element).replace(/_lo/g,'_hi');
  new Asset.image(overImageSrc);

  element.addEvents({
     'mouseenter': function() {element.src = efobj.getImgSrc(element).replace(/_lo/g,'_hi'); },
     'mouseleave': function() {element.src = efobj.getImgSrc(element).replace(/_hi/g,'_lo')}
  });
}

/**
 * Mouse-Over Effect for all image tags with class "mouseover_image".
 * Image will not change when image is in "active" state!
 */
efobj.autoMouseOverTop = function(element) {
  // pre-load mouse-over images for faster display

  var overImageSrc = efobj.getImgSrc(element).replace(/_lo/g,'_hi');
  new Asset.image(overImageSrc);

  element.addEvents({
     'mouseenter': function() {
                     var params = Json.evaluate(element.name);
                     if(params['sel'] == '0' ){
                       element.src = efobj.getImgSrc(element).replace(/_lo/g,'_hi');
                       element.src = efobj.getImgSrc(element).replace(/_cl/g,'_hi');
                     }
                     
                     if(params['next']){
                       var elem = $(params['next']);
                       elem.src = efobj.getImgSrc(elem).replace(/_lo/g,'_cl');
                     }
                   },
     'mouseleave': function() {
                     var params = Json.evaluate(element.name);
                     if(params['sel'] == '0')
                       element.src = efobj.getImgSrc(element).replace(/_hi/g, params['semi']);
                     if(params['next']){
                       var elem = $(params['next']);
                       if(params['sel'] == '0')
                         elem.src = efobj.getImgSrc(elem).replace(/_cl/g,'_lo');
                     }
                   }
  });
}

/**
 * Mouse-Over Effect for all image tags within the given div and assigned class "mouseover_image_div".
 * Image will not change when image is in "active" state!
 */
efobj.autoMouseOverDiv = function(element) {
  // pre-load mouse-over images (all image-tags of div) for faster display
  $ES('mouseover_image_div', element).forEach(
    function(imgElement){
      var overImageSrc = efobj.getImgSrc(imgElement).replace(/_lo/g,'_hi');
      new Asset.image(overImageSrc)
    }
  );

  element.addEvents({
     'mouseenter': function(){$ES('img', element).forEach(function(imgElement){imgElement.src = efobj.getImgSrc(imgElement).replace(/_lo/g,'_hi');});},
     'mouseleave': function(){$ES('img', element).forEach(function(imgElement){imgElement.src = efobj.getImgSrc(imgElement).replace(/_hi/g,'_lo');});}
  });
}

/**
 * Adds an onclick-Event to all elments having class "popuplink" assigned.
 * Additional parameters are set as Json-String in the name-Attribute of the Element
 */
efobj.addOnClick = function(element) {
  element.addEvents({
     'click': function(evt) {new Event(evt).stop(); var linkParams = Json.evaluate(element.name); efobj.openWindow(linkParams['link'], linkParams['title'], linkParams['width'], linkParams['height'], 0, 0); return false;}
  });
}

/**
 * Grab focus for elements having class "formFocus" assigned
 */
efobj.addFormFocus = function(element) {
  element.focus();
}


efobj.showLoading = function(targetDiv, show) {
  if(show)
    $(targetDiv).setStyles({'background-image': 'url(/cache/www.ernstings-family.de/img/wcsstore_ErnstingStore_images_ajax_loader.gif)', 'background-position': 'center', 'background-repeat': 'no-repeat'}); 
  else
    $(targetDiv).setStyles({'background-image': '', 'background-position': '', 'background-repeat': ''}); 
}


/**
 * Ajax request which sets the response into a target div container
 */
efobj.ajaxRequest = function(url, targetDivId, show, oncomplete, onerror) {
  var mbAjax = new Ajax(url,{
    method: 'post',
    evalScripts: true,
    update: targetDivId,
    onRequest: function() {
      efobj.showLoading(targetDivId, true);
    },
    onComplete: function() {
      efobj.showLayer(targetDivId, show);
      efobj.showLoading(targetDivId, false);
      if(oncomplete)
            oncomplete();
    }, 
    onFailure: function() {
      efobj.showLoading(targetDivId, false);
      if(onerror)
            onerror();
    }
  }).request();
}

/**
 * Ajax form submit which sets the response into a target div container
 */
efobj.ajaxFormSubmit = function(formId, targetDivId, show, validator, oncomplete) {
  newsubmit = function(e) {
    if(e)
      new Event(e).stop();
    if(!validator || (validator && validator.validate(true))) {
      this.send({
        evalScripts: true,
        update: targetDivId,
        onRequest: function() {
          efobj.showLoading(targetDivId, true);
        },
        onComplete: function() {
          efobj.showLayer(targetDivId, show);
          efobj.showLoading(targetDivId, false);
          if(oncomplete)
            oncomplete();
        }, 
        onFailure: function() {
          efobj.showLoading(targetDivId, false);
          if(oncomplete)
            oncomplete();
        }
      });
    }
  }
  var form = $(formId);
  form.addEvent('submit', newsubmit);
  form._submit = form.submit;
  form.submit = newsubmit;
}

/**
 * Shows or hides a given div container by id
 */
efobj.showLayer = function(targetDivId, show) {
  efobj.positionContainer(targetDivId);

  if(show){
    $(targetDivId).removeClass('hideout');
    window.addEvent('resize', efobj.positionContainer.bind(this, targetDivId));
  }
  else
    $(targetDivId).addClass('hideout');
}

/**
 * position of a container according current position of anchor container
 */
efobj.positionContainer = function (targetDivId) {
  if($(targetDivId + "_anchor")){
    var anchorDiv = $(targetDivId + "_anchor");
    $(targetDivId).setStyles({top: (anchorDiv.getPosition().y + 20) + 'px', left: anchorDiv.getPosition().x  + 'px'});
  }
}

efobj.open = function(link) {
  var load = window.open(link);
  load.focus();
}

window.addEvent('domready', function() {
  
});

window.addEvent('load', function() {
});

Element.extend({
    trimFormElements : function(fieldNames) {
    var formElement = this;
    fieldNames.each(function(name) {
      var fieldElement = formElement.getElement('input[name=' + name + ']');
      if (fieldElement) {
        var oldValue = fieldElement.getValue() || '';
        fieldElement.setValue(oldValue.trim());
      }
    });
  },
  setValue : function(val) {
    switch(this.getTag()) {
      case 'select':
        sel = function(option) {
          if (($type(val)=='array'&& val.contains(option.value))||(option.value==val))option.selected = true
          else option.selected = false;
        }
        $each(this.options, sel);
        break;
      case 'input': 
        if (['checkbox', 'radio'].contains(this.type))this.checked=(($type(val)=='array')?val.contains(this.value):(this.value==val));
        else if (['text'].contains(this.type))this.value=val;
        break;
      case 'textarea': this.value = val;
    } 
  }
});  


efobj.TextCounter = new Class({
  field: {},
  
  options: {
    maxChars: 500,
    formatStr: "{1}/{2}",
    container: ""
  },
  
  initialize: function(inputField, settings){
    this.options = $j.extend({}, this.options, settings);
    
    this.field = $j(inputField);
    this._initCounter(this.field.attr('id'));
    this.field.bind('keyup', {s : this.options}, this.updateCounter);
  },
  
  updateCounter: function(ev) {
    var s = ev.data.s;
    var value = $j(this).attr("value");
    var valueLength = value.length;
    var charsLeft = s.maxChars - valueLength;
    if(charsLeft <= 0) {
      var newVal = value.substring(0, s.maxChars);
      $j(this).attr("value", newVal);
      charsLeft = String(0);
    }
    $j(".counterLeftChars"+this.id).html(charsLeft);
  },
  
  _initCounter: function(id) {
    var s = this.options;
    var counterStr = s.formatStr.replace(/\{1\}/gi, "<span class='counterLeftChars"+id+"'>"+s.maxChars+"</span>");
    var counterStr = counterStr.replace(/\{2\}/gi, "<span class='counterMaxChars"+id+"'>"+s.maxChars+"</span>");
    if($j.trim(s.container) != "") {
      $j(s.container).html(counterStr);
    } else {
      this.field.after(counterStr);
    }
  }
  
});

efobj.submitOnEnter = function(form, event) {
  var keyCode;
  if (window.event) {
    keyCode = window.event.keyCode;
  } else if (event.which) {
    keyCode = event.which;
  }
  if (keyCode == 13) {
    form.submit();
  }
};
