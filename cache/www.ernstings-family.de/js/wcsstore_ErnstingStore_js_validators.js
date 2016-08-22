efobj.InputValidator = new Class({
  initialize: function(className, options){
    this.setOptions({
      errorMsg: 'Validation failed.',
      test: function(field, options){return true}
    }, options);
    this.className = className;
  },

  test: function(field, options, dependsNode){
    if($(field)) return this.options.test($(field), options, dependsNode);
    else return false;
  }
});
efobj.InputValidator.implement(new Options);

efobj.FormValidator = new Class({
  options: {
    singleError: false,
    requiredSpan: new Element('span', { 'class': 'red'}),
    requiredSpanText: '*',
    onFormValidate: function(isValid, form){},
    onElementValidate: function(isValid, field){}
  },
  
  FormField: new Class({
    initialize: function(form, el) {
      el.label = $j('#' + el.id + 'Label', '#' + form.form.id);
      if(el.label == null) {
        el.label = $j('#' + el.id + '_label', '#' + form.form.id);
      }
      el.singleLabel = function(name) {
      	return $j('#' + name, '#' + form.form.id);
      };
      return el;
    }
  }),

  initialize: function(form, formFieldoptions, errorBox, successBox, hasParent){
    this.formFieldoptions = formFieldoptions;
    try {
      
      this.hasParent = (typeof hasParent == 'undefined' || hasParent == true);
      
      if(successBox) {
        this.successBox = $(successBox);
          if (this.successBox != null){
            if($('inner_' + this.successBox.id))
              this.successBoxContent = $('inner_' + this.successBox.id);
          else
            this.successBoxContent = this.successBox;
        }
      }
      
      this.form = $(form);    
      this.watchFields();
       // errorbox no exists anymore
      if (errorBox != null || $('errorBox')){
        if(errorBox)
          this.errorBox = $(errorBox);
        else
          this.errorBox = $('errorBox');
        if(this.errorBox != null && $('inner_' + this.errorBox.id))
          this.errorBoxContent = $('inner_' + this.errorBox.id);
        else
          this.errorBoxContent = this.errorBox;
        
        if (this.errorBoxContent != null){
          this.errorBoxTag = this.errorBoxContent.getTag();
        }
        
      } 
      
     /*
       * console.log(this.form); console.log(this.formFieldoptions);
       * console.log(this.errorBox); console.log(this.successBox);
       * console.log(this.hasParent);
       */
      
      // this.form.addEvent('submit', this.validate.pass([true]), this);
      
    }
    catch(e){
      efobj.log('initialize');
      efobj.log(e);
    }
  },

  inOrActivateSubmitButton: function(ok, validateFunction, idSubmitButton) {
    // TODO Remove when grey button for validation error is really not needed anymore
// if(!idSubmitButton) {
// idSubmitButton = 'submitButton';
// }
//      
// if(ok) {
//      
// var formOk = validateFunction();//formValidator.validate();
// if(formOk) {
// $j('div#' + idSubmitButton).removeClass('inactive');
// $j('div#' + idSubmitButton).addClass('active');
// } else {
// $j('div#' + idSubmitButton).removeClass('active');
// $j('div#' + idSubmitButton).addClass('inactive');
// }
// } else {
// $j('div#' + idSubmitButton).removeClass('active');
// $j('div#' + idSubmitButton).addClass('inactive');
// }
   },
  
  watchFields: function(){
    try{
      for(fieldId in this.formFieldoptions){
        pForm = $j("#"+this.form.id);
        var el = pForm.find("#" +fieldId)[0];
        // var el = $j("#"+this.form.id + " #" +fieldId)[0];
        if(this.formFieldoptions[fieldId].required){
          this.initRequired(fieldId);
        }
      };
    }
    catch(e){
      efobj.log('watchFields');
      efobj.log(e);
    }
  },

  initRequired: function(fieldId){
    var tmpId = fieldId;
    if(this.formFieldoptions[fieldId].destination){
      tmpId = this.formFieldoptions[fieldId].destination;
    }
    if($('t_' + tmpId)){
    var descrElem = $('t_' + tmpId);
      var tmpEL = this.options.requiredSpan.clone();
      tmpEL.setHTML(this.options.requiredSpanText);
      tmpEL.injectInside(descrElem);
    }
  },

  validate: function(force, singleError, dontClearParent) {
    this.clearGlobalError(dontClearParent);
    if(singleError){
      this.options.singleError = singleError;
    }
    var result = true;

    for(fieldId in this.formFieldoptions){

      pForm = $j("#"+this.form.id);
      var el = pForm.find("#" +fieldId)[0];
      if (el == null){
        efobj.log("Could not find form object "+fieldId+"!");
        break;
      }
      // var el = $j("#"+this.form.id + " #" +fieldId)[0];
      if(!this.validateField(new this.FormField(this, el), force, true)){
        result = false;
        if(!force)
          break;
      }
    };

    // if(!result)
      // TODO check behaviour
      // this.errorBox.scrollIntoView(true);

    return result; 
  },
  
  /**
   * 
   * @param {jQuery} field
   * @param (Boolean) force
   */
  validateSingle: function(field, force) {
    var result = true;
    this.options.singleError = true;    
    
    if(!this.validateField(field, force, true)){
      result = false;
    }
    
    return result;
  },
  
  validateField: function(field, force, full){
    if(this.paused) return true;
// field = $j(field)[0];
// field = (typeof field == 'string') ? this.findElmtsById(field)[0] : field;
    if(!field.id && field[0] && field[0].id) {
      field = field[0];
    }
    var result = false;

    result = this.formFieldoptions[field.id].validators.some(function(validatorObj) {
      var depends = false;
      var dependsVal = this.formFieldoptions[field.id].dependsVal;
      var dependsNode = null;
      if(this.formFieldoptions[field.id].dependsSrc) {
        var tmpButtons = $ES('input[name='+this.formFieldoptions[field.id].dependsSrc+']', this.form.id);
        
        if(tmpButtons && tmpButtons.length>0) {
          for (var i = 0; i < tmpButtons.length; i++) {
            if(dependsVal.indexOf(tmpButtons[i].value) > -1  && tmpButtons[i].checked) {
              depends = true;
            }
          }
        }
        /* if tmpButtons a normal input field */
        if(tmpButtons && tmpButtons.length==1) {          
          if(dependsVal.indexOf(tmpButtons[0].value) > -1) {
            depends = true;
          }
        }
        
        tmpButtons = $E('select[id='+this.formFieldoptions[field.id].dependsSrc+']', this.form.id);
        
        if(tmpButtons && tmpButtons.length>0) {
          for (var i = 0; i < tmpButtons.length; i++) {
            if(tmpButtons[i].selected && dependsVal.indexOf(tmpButtons[i].value) > -1){
              depends = true;
              dependsNode = tmpButtons[i];
            }
          }
        }
      }
            
      var tmpResult = true;
      
      if($j(field).attr('value') != '' || full) {
        var tmpValidator = this.validators[validatorObj.name];
        
        if(depends || !this.formFieldoptions[field.id].dependsSrc) {
          tmpResult = tmpValidator.test(field, this.formFieldoptions[field.id], dependsNode);
        } else {
          // if this field depends on something thats not set or relevant, it's fine
          if(!!this.formFieldoptions[field.id].dependsSrc) {
    	    tmpResult = !depends;
          }
        }
          var labelElem = field.label;

          if (this.formFieldoptions[field.id].singleErrorLabel) {
            labelElem = field.singleLabel((this.formFieldoptions[field.id].singleLabelName));
          }

          if (this.options.singleError) {
            this.removeSingleError(field);
          }

          if(!tmpResult || validatorObj.name == 'valid' ||  (!tmpResult && (validatorObj.name == 'IsEmpty' || validatorObj.name == 'IsEmptyPassword' )&& this.formFieldoptions[field.id].required)){
            if(force){
              if (this.options.singleError) {
                this.addSingleError(field, validatorObj.msg);
              } else {
                this.addGlobalError(validatorObj.msg);
              }
              field.getParent().addClass("error");
              $j('#' + field.id + 'Wrap').removeClass('valid');

              if(labelElem) {
                labelElem.addClass("error");
              }
            }
          } else {
            if (field.getParent().getLast().nodeName == "P" && $j(field.getParent().getLast()).hasClass("text-error")) {
              // do nothing ?
            } else {
              field.getParent().removeClass("error");
            }
            field.removeClass("error");
            
            if(labelElem) {
              labelElem.removeClass("error");
            }
            
            // add checked class
            if (field.value != "") {
              if (field.id.match(/(w*)zip(w*)/) || field.id.match(/(w*)city(w*)/)) {
                // find out address box, DIFFER or DIRECT
                var addressBox = field.getParent().getAttribute('Id');	
                
                fieldFilled = true;
                // check if fields are field
                for( i=0; i< field.getParent().children.length; i++ ){
                  if (field.getParent().children[i].nodeName == 'INPUT' && fieldFilled){
                    fieldFilled = field.getParent().children[i].value.length > 0;
                  }
                }
                
                if (addressBox.length && !field.getParent().hasClass('error') && fieldFilled) {
                  field.getParent().addClass('valid');
                } else {
                  $j('#' + field.id + 'Wrap').addClass('valid');
                }
              }
              else {
                $j('#' + field.id + 'Wrap').addClass('valid');
              }
            }
          }
        //}
      }
      return !tmpResult;
    }, this);

    if(!full)
      this.validate(false);

    return !result;
  },

  addGlobalError: function(message){
    if (this.hasParent) {
      if(this.successBox && !this.successBox.hasClass('hideout'))
        this.successBox.addClass('hideout');
      if(this.errorBox.getParent()!= null && !this.errorBox.getParent().hasClass('forcehide') && this.errorBox.getParent().hasClass('hideout')){
        this.errorBox.getParent().removeClass('hideout');
      }
    }
    if((this.options.singleError) || !this.options.singleError){
      if (this.errorBoxTag == 'ul') {
        // error box rendered as unordered list
        var tmpEL = new Element('span');
        tmpEL.setHTML("<li>" + message + "</li>");
        tmpEL.injectInside(this.errorBoxContent);
      } else if (this.errorBoxTag == 'li') {
        // error box rendered as unordered list with direct access to single list item
        
      } else if (this.errorBoxTag == 'p') {
        // error box rendered as paragraph
        this.errorBox.appendText(message);
        this.errorBox.appendChild(document.createElement("br"));
      }
    }
  },

  clearGlobalError: function(dontClearParent){
    if (this.options.hasParent) {
      if(!dontClearParent && !this.errorBox.getParent().hasClass('hideout'))
        this.errorBox.getParent().addClass('hideout');
    }
    if(this.errorBoxContent){
      this.errorBoxContent.setHTML('');
    }
  },
  
  addSingleError: function(field, message) {
    var fieldWrapId = '#'+field.id + 'Wrap';

    // add error message after validatorObj
    if(field.id.match(/(w*)zip(w*)/) || field.id.match(/(w*)city(w*)/)) {
      
      // find out address box, DIFFER or DIRECT
      var addressBox = this.findOutAddressBox(field);
      if ($j(addressBox).length) {
        // remove checked class
        $j(addressBox).removeClass('valid');
        $j(addressBox).append('<p id="error_'+field.id+'" class="text-error subtext">'+message+'</p>');
      } 
    } else {
      // remove checked class
      $j(fieldWrapId).removeClass('valid');
      if ($j(fieldWrapId).hasClass('text_input')){
        $j(fieldWrapId+' dd').append('<p class="error">'+message+'</p>');
      }else {
        $j(fieldWrapId+' ').append('<p class="text-error subtext">'+message+'</p>');
      }   
    }
  },
  
  removeSingleError: function(field) {
    var fieldWrapId = '#'+field.id + 'Wrap';
    
    // remove old error message
    if(field.id.match(/(w*)zip(w*)/) || field.id.match(/(w*)city(w*)/)) {
      var addressBox = this.findOutAddressBox(field);
      if ($j(addressBox).length) {
        $j(addressBox + ' p#error_'+field.id).empty().remove();      // TODO: fixen
      } else {
        $j(fieldWrapId+' p.text-error').empty().remove();
      }
    } else {
      if ($j(fieldWrapId).hasClass('text_input')){
        $j(fieldWrapId+' p.error').empty().remove();
      }else {
        $j(fieldWrapId+' p.text-error').empty().remove();
      }
    }
  },
  
  /**
   * Generate zip/city-wrapper id.
   */
  findOutAddressBox: function(field) {
    var addressBox = '#'+field.getParent().getAttribute('Id');            
    return addressBox;
  },	

  stop: function(){
    this.paused = true;
  },

  start: function(){
    this.paused = false;
  }
});
efobj.FormValidator.implement(new Options);
efobj.FormValidator.implement(new Events);

efobj.FormValidator.adders = {
  validators:{},

  add : function(className, options) {
    this.validators[className] = new efobj.InputValidator(className, options);
    // if this is a class
    // extend these validators into it
    if(!this.initialize){
      this.implement({
        validators: this.validators
      });
    }
  }
};
Object.extend(efobj.FormValidator, efobj.FormValidator.adders);
efobj.FormValidator.implement(efobj.FormValidator.adders);


// list of available validators

efobj.FormValidator.add('IsEmpty', {
  test: function(element, options) {
    if(element.type == "select-one"||element.type == "select")
      return (element.selectedIndex >= 0 && element.options[element.selectedIndex].value != "");
    else
      return !((element.getValue() == null) || (element.getValue().length == 0));
  }
});

efobj.FormValidator.add('IsEmptyPassword', {
    test: function(element, options) {
    // only check if field1 is filled
      if((!(options.field1.getValue() == null || options.field1.getValue().length == 0) || options.required) 
          ) {
        return !((element.getValue() == null) || (element.getValue().length == 0)); 
      } 
      else {
        return true;
      }
    }
  });

efobj.FormValidator.add('SpecialChars', {
  test: function(element) {
    return (/^[-a-zA-Z0-9äöüÄÖÜßńźżłóśćąęãõçëñæøåðýøèéàáâôœàèìùţăĺäôěřůıİğőűŵŷâŃŹŻŁÓŚĆĄĘÃÕÇËÑÆØÅÐÝØÈÉÀÁÂÔŒÀÈÌÙŢĂĹÄÔĚŘŮIİĞŐŰŴŶÂ .`/-/(/)/,]*$/.test(element.getValue()));
  }
});

efobj.FormValidator.add('SpecialCharsWithoutDigits', {
  test: function(element) {
    return (/^[-a-zA-ZäöüÄÖÜßńźżłóśćąęãõçëñæøåðýøèéàáâôœàèìùţăĺäôěřůıİğőűŵŷâŃŹŻŁÓŚĆĄĘÃÕÇËÑÆØÅÐÝØÈÉÀÁÂÔŒÀÈÌÙŢĂĹÄÔĚŘŮIİĞŐŰŴŶÂ .`/-/(/)/,]*$/.test(element.getValue()));
  }
});

efobj.FormValidator.add('reservedWords', {
  test: function(element) {
    var reservedWord = ['filiale','rechnungsadresse' ];
    
    for (var i = 0; i < reservedWord.length; ++i){
      if (reservedWord[i].indexOf(element.getValue().toLowerCase()) > -1){
        return false;
      }
    }
    return true;
  }
});

efobj.FormValidator.add('IsValidPromotionCodeMessage', {
  test: function(element) {
    result = element.validatedBefore || (/^[-a-zA-Z0-9äöüÄÖÜßńźżłóśćąęãõçëñæøåðýøèéàáâôœàèìùţăĺäôěřůıİğőűŵŷâŃŹŻŁÓŚĆĄĘÃÕÇËÑÆØÅÐÝØÈÉÀÁÂÔŒÀÈÌÙŢĂĹÄÔĚŘŮIİĞŐŰŴŶÂ .,:;!?()\n\r]*$/.test(element.getValue()));
    if(!result) {
      element.validatedBefore = true;
    }
    return result;
  }
});

efobj.FormValidator.add('IsValidPromotionCodeName', {
  test: function(element) {
    result = (/^[-a-zA-Z0-9äöüÄÖÜßńźżłóśćąęãõçëñæøåðýøèéàáâôœàèìùţăĺäôěřůıİğőűŵŷâŃŹŻŁÓŚĆĄĘÃÕÇËÑÆØÅÐÝØÈÉÀÁÂÔŒÀÈÌÙŢĂĹÄÔĚŘŮIİĞŐŰŴŶÂ .,:;!?()\n]*$/.test(element.getValue()));
    return result;
  }
});


efobj.FormValidator.add('IsNumber', {
  test: function (element) {
    if(!((element.getValue() == null) || (element.getValue().length == 0)))
      return (/^[0-9]+$/.test(element.getValue()));
    return true;
  }
});

efobj.FormValidator.add('IsValidMinValue', {
  test: function (element, options) {
    if(!((element.getValue() == null) || (element.getValue().length == 0)))
      return element.getValue().replace(',','.') >= options.minValue;
      return true;
  }
});

efobj.FormValidator.add('IsValidMaxValue', {
  test: function (element, options) {
    if(!((element.getValue() == null) || (element.getValue().length == 0)))
      return element.getValue().replace(',','.') <= options.maxValue;
      return true;
  }
});

efobj.FormValidator.add('IsValidLength', {
  test: function (element, options, dependsNode) {
    if(!((element.getValue() == null) || (element.getValue().length == 0))){
      // this.formFieldoptions[field.id].
      if (dependsNode != null && dependsNode.value == 'AT'){
        return element.getValue().length >= options.minLengthAT;
      }
      return element.getValue().length >= options.minLength;
    }
    return true;
  }
});


efobj.FormValidator.add('IsValidLengthExact', {
  test: function (element, options, dependsNode) {
    if(!((element.getValue() == null) || (element.getValue().length == 0))){
      // this.formFieldoptions[field.id].
      if (dependsNode != null && dependsNode.value == 'AT'){
        return element.getValue().length == options.lengthExactAT;
      }
      return element.getValue().length == options.lengthExact;
    }
    return true;
  }
});

efobj.FormValidator.add('IsValidMaxLength', {
  test: function (element, options) {
    if(!((element.getValue() == null) || (element.getValue().length == 0)))
      return element.getValue().length <= options.maxLength;
    return true;
  }
});

efobj.FormValidator.add('IsValidAddress', {
  test: function (element) {
    // At least one character and one digit
    return (/^[a-zA-ZäöüßÄÖÜ\- \.]+ [0-9]+[a-zA-Z]?/.test(element.getValue()));
  }
});

efobj.FormValidator.add('IsValidAccountNumber', {
  test: function (element) {
    return /^[0-9\*\/ ]*$/.test(element.getValue());
  }
});

efobj.FormValidator.add('IsValidCreditCardNumber', {
  test: function (element) {
    if(!((element.getValue() == null) || (element.getValue().length == 0))) {
      if(element.getValue() != null && element.getValue().length == 16) 
        return /^[0-9\*\/ ]*$/.test(element.getValue());
      return false;
    }
    return true;
  }
});

efobj.FormValidator.add('IsValidCreditCardCVV', {
  test: function (element) {
    if(!((element.getValue() == null) || (element.getValue().length == 0))) {
      if(element.getValue() != null && element.getValue().length > 2 && element.getValue().length < 5) 
        return /^[0-9\*\/ ]*$/.test(element.getValue());
      return false;
    }
    return true;
  }
});



efobj.FormValidator.add('IsValidIbanChecksum', {
  test: function (element, options) {
	  var iban = element.getValue();
	  var onlyUppercaseAndDigitsPattern = new RegExp('^[A-Z0-9]*$');
	  if(!onlyUppercaseAndDigitsPattern.test(iban)) {
	    return false;
	  }
	    
	  var code     = iban.substring(0, 2);
	  var checksum = iban.substring(2, 4);
	  var bban     = iban.substring(4);
	  
	  // Assemble digit string
	  var digits = "";
	  for (var i = 0; i < bban.length; ++i)
	  {
	    var ch = bban.charAt(i).toUpperCase();
	    if ("0" <= ch && ch <= "9") {
	      digits += ch;
	    } else {
	    	var capitals3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		    for (var i4 = 0; i4 < capitals3.length; ++i4)
		      if (ch == capitals3.charAt(i4))
		        break;
		    digits += i4 + 10;
	    }
	  }
	  for (var i2 = 0; i2 < code.length; ++i2)
	  {
	    var ch = code.charAt(i2);
	    var capitals2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	    for (var i3 = 0; i3 < capitals2.length; ++i3)
	      if (ch == capitals2.charAt(i3))
	        break;
	    digits += i3 + 10;
	  }
	  digits += checksum;

	  // Calculate checksum
	  var m = 0;
	  for (var i6 = 0; i6 < digits.length; ++i6) {
		  m = (m * 10 + parseInt(digits.charAt(i6))) % 97; 
	  }
	  return m == "1";
  }
});

efobj.FormValidator.add('IsValidPhoneNumber', {
  test: function (element) {
    return /^[0-9\-\/ ]*$/.test(element.getValue());
  }
});

efobj.FormValidator.add('IsValidEmail', {
  test: function (element, options) {
    if (options.required || (element.getValue() != null && element.getValue().length > 0))
      return (/^([a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$/.test(element.getValue()));
    return true;
  }
});

efobj.FormValidator.add('IsEqualField1', {
  test: function (element, options) {
    return element.getValue() == options.field1.getValue();
  }
});

efobj.FormValidator.add('IsValidDate', {
  test: function (element, options) {
    var result = true;
    if(element.getValue() != '')
                  // 1 - 28 in allen Monaten | 31 nur in monat 1 3 5 7 8 10 12 |
                  // 29 oder 30 in allen Monaten bis auf 2 | oder 29 in
                  // Schaltjahren in 2
    result = (/^(((0?[1-9]|1[0-9]|2[0-8])[-|.](0?[1-9]|1[012])[-|.](19|20)[0-9][0-9])|(31[-|.](0?[13578]|1[02])[-|.](19|20)[0-9][0-9])|((29|30)[-|.](0?[1,3-9]|1[0-2])[-|.](19|20)[0-9][0-9])|(29[-|.]0?2[-|.](((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)))))$/.test(element.getValue()));
    return result;
  }
});



efobj.FormValidator.add('IsValidPassword', {
  test: function (element, options) {
    if(options.required){
      return '************' == element.getValue() || ((/[a-zA-Z]+/.test(element.getValue())) && (/[0-9]+/.test(element.getValue())));
    } else if(element.getValue() != ''){
      return '************' == element.getValue() || ((/[a-zA-Z]+/.test(element.getValue())) && (/[0-9]+/.test(element.getValue())));
    } else {
      return true;
    }
  }
});

efobj.FormValidator.add('IsFlag', {
  test: function (element, options) {
    return !options.theFlag;
  }
});

efobj.FormValidator.add('FunctionValidator', {
  test: function (element, options) {
    return options.execFunction();
  }
});

efobj.FormValidator.add('IsDateGreaterThen', {
  test: function (element, options) {
    var day = element.getValue().substr(0, 2);
    var month = element.getValue().substr(3, 2);
    var year = element.getValue().substr(6, 4);
    var date = new Date(year, month - 1, day);
    return date.getTime() <= options.maxDate.getTime();
  }
});

efobj.FormValidator.add('IsDateLowerThen', {
  test: function (element, options) {
    var day = element.getValue().substr(0, 2);
    var month = element.getValue().substr(3, 2);
    var year = element.getValue().substr(6, 4);
    var date = new Date(year, month - 1, day);
    return date.getTime() >= options.minDate.getTime();
  }
});

efobj.FormValidator.add('IsAdult', {
  test: function (element, options) {
    var day = element.getValue().substr(0, 2);
    var month = element.getValue().substr(3, 2);
    var year = element.getValue().substr(6, 4);
    var date = new Date(year, month - 1, day);
    var today = new Date();
    var compareDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    var result = date.getTime() <= compareDate;
    return result;
  }
});

efobj.FormValidator.add('IsToOld', {
  test: function (element, options) {
    var day = element.getValue().substr(0, 2);
    var month = element.getValue().substr(3, 2);
    var year = element.getValue().substr(6, 4);
    var date = new Date(year, month - 1, day);
    var today = new Date();
    var compareDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    var result = date.getTime() > compareDate.getTime();
    return result;
  }
});


// Date validators for separate fields for day, month and year

// Date validators for separate fields for day, month and year

efobj.FormValidator.add('IsValidSepDate', {
  test: function (element, options) {    
    var result = false;
    var day = options.dayField.getValue();
    var month = options.monthField.getValue();
    var year = options.yearField.getValue();
    var isRequired = options.required;    
    if (!isRequired) {
      result = true;
      if((day.length > 0 || month.length > 0 || year.length > 0)){
        var date = new Date(year, month - 1, day);
        result = ((day == date.getDate()) && ((month - 1) == date.getMonth()) && (year == date.getFullYear()));
      }   
    }else{
      if(year.length == 4 && month.length <= 2 && day.length <= 2){
        var date = new Date(year, month - 1, day);
        result = ((day == date.getDate()) && ((month - 1) == date.getMonth()) && (year == date.getFullYear()));
      }    
    }
   return result;
  }
});

efobj.FormValidator.add('IsValidSepDateAndFuture', {
  test: function (element, options) {    
    var result = true;
    var day = options.dayField.getValue();
    var month = options.monthField.getValue();
    var year = options.yearField.getValue();
    var isRequired = options.required;   
    var requiredWhen = options.requiredWhen;
    var isHighlightAllFields = options.highlightAllFields;
    var currentTime = new Date()

    if (isRequired || requiredWhen == element.getValue()) {
      result = false;
      if(year.length == 4 && month.length <= 2 && day.length <= 2){
        var date = new Date(year, month - 1, day);             
        var currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());             
        result = ((day == date.getDate()) && ((month - 1) == date.getMonth()) && (year == date.getFullYear()) && date >= currentDate);
      }    
    }

    if (!result && isHighlightAllFields) {
      options.dayField.addClass('error');
      options.monthField.addClass('error');
      options.yearField.addClass('error');        
    }else if (result && isHighlightAllFields) {
      options.dayField.removeClass('error');
      options.monthField.removeClass('error');
      options.yearField.removeClass('error');            
    }
   return result;
  }
});

efobj.FormValidator.add('IsSepDateFuture', {
  test: function (element, options) {
    var result = false;
    var day = options.dayField.getValue();
    var month = options.monthField.getValue();
    var year = options.yearField.getValue();
    if(year.length == 4 && month.length <= 2 && day.length <= 2){
      var date = new Date(year, month - 1, day);
      result = date.getTime() < options.currentDate.getTime();
    }
    return !result;
  }
});

efobj.FormValidator.add('IsSepDatePast', {
  test: function (element, options) {
    var result = false;
    var day = options.dayField.getValue();
    var month = options.monthField.getValue();
    var year = options.yearField.getValue();
    if(year.length == 4 && month.length <= 2 && day.length <= 2){
      var date = new Date(year, month - 1, day);
      result = date.getTime() > options.currentDate.getTime();
    }
    return !result;
  }
});

efobj.FormValidator.add('IsSepDateGreaterThen', {
  test: function (element, options) {
    var day = options.dayField.getValue();
    var month = options.monthField.getValue();
    var year = options.yearField.getValue();
    var date = new Date(year, month - 1, day);
    return date.getTime() <= options.maxDate.getTime();
  }
});

efobj.FormValidator.add('IsSepDateLowerThen', {
  test: function (element, options) {
    var day = options.dayField.getValue();
    var month = options.monthField.getValue();
    var year = options.yearField.getValue();
    var date = new Date(year, month - 1, day);
    return date.getTime() >= options.minDate.getTime();
  }
});


efobj.FormValidator.add('IsEmpty2', {
  test: function(element) {
    if(element.type == "select-one"||element.type == "select")
      return (element.selectedIndex >= 0 && element.options[element.selectedIndex].value != "");
    else
      return !((element.getValue() == null) || (element.getValue().length < 2));
  }
});

efobj.FormValidator.add('NotEmptyMin2', {
  test: function(element) {
    if(element.type == "select-one"||element.type == "select")
      return (element.selectedIndex >= 0 && element.options[element.selectedIndex].value != "");
    else
      return !(element.getValue() != null && element.getValue().length > 0 && element.getValue().length < 2);
  }
});

efobj.FormValidator.add('IsValidCharacterSet', {
  test: function (element) {
    return (/^[a-zA-Z '-]*$/.test(element.getValue()));
  }
});

efobj.FormValidator.add('IsValidCaractersNumbers', {
  test: function (element) {
    return (/^[a-zA-Z0-9]*$/.test(element.getValue()));
  }
});

efobj.FormValidator.add('IsCapitalLetter', {
  test: function (element) {
    return !(/[A-Z]+/.test(element.getValue()));
  }
});

efobj.FormValidator.add('IsAllLetters', {
  test: function (element) {
    return !(/^[a-z]+$/.test(element.getValue()));
  }
});

efobj.FormValidator.add('IsAllNumbers', {
  test: function (element) {
    return !(/^[0-9]+$/.test(element.getValue()));
  }
});

efobj.FormValidator.add('IsFirstDigit', {
  test: function (element) {
    return /^[0-9]/.test(element.getValue());
  }
});

efobj.FormValidator.add('IsValidZipCode', {
  test: function (element) {
    return /^[0-9][0-9][0-9][0-9]?[a-zA-Z][a-zA-Z]$/.test(element.getValue());
  }
});



efobj.FormValidator.add('IsNotDefault', {
  test: function (element, options) {
    return element.getValue().length > 0 && element.getValue() != options.defaultText;
  }
});


efobj.FormValidator.add('IsNullLength', {
  test: function (element, options) {
    return element.getValue().length == 0;
  }
});

efobj.FormValidator.add('IsNotEqualField1', {
  test: function (element, options) {
    return element.getValue() != options.field1.getValue();
  }
});

efobj.FormValidator.add('IsNotEqualField2', {
  test: function (element, options) {
    return element.getValue() != options.field2.getValue();
  }
});

efobj.FormValidator.add('IsNotEqualField1', {
  test: function (element, options) {
    return element.getValue() != options.field1.getValue();
  }
});

efobj.FormValidator.add('IsValidIdx', {
  test: function (element, options) {
    return !isValidSubject();
  }
});

efobj.FormValidator.add('IsChecked', {
  test: function(element) {
    return element.checked;
  }
});

efobj.FormValidator.add('IsSelectGT0', {
  test: function(element) {
    return element.selectedIndex > 0;
  }
});

efobj.FormValidator.add('Valid', {
  test: function (element) {
    return true;
  }
});

efobj.FormValidator.add('isValidNumberRange', {
  test: function (element, options) {
    var lower = options.lower;
    var upper = options.upper;
    return (lower <= upper && element.getValue() >= lower && element.getValue() <= upper);
  }
});

efobj.FormValidator.add('IsEmailVerified', {
    test: function (element) {
      return !((/^[a-z]+$/.test(element.getValue())) || (/^[0-9]+$/.test(element.getValue())));
    }
});

efobj.FormValidator.add('IsEqualField1Password', {
    test: function (element, options) {
      if( (!((options.field1.getValue() == null) || (options.field1.getValue().length == 0))) ) {
        return element.getValue() == options.field1.getValue();
      }  
      return true;
    }
});
/*
 * efobj.FormValidator.add('IsEmptyPassword', { test: function(element, options) {
 * if( (!((element.getValue() == null) || (element.getValue().length == 0))) &&
 * (!((options.field1.getValue() == null) || (options.field1.getValue().length ==
 * 0))) ) {
 * 
 * if(element.type == "select-one"||element.type == "select") return
 * (element.selectedIndex >= 0 && element.options[element.selectedIndex].value !=
 * ""); else return !((element.getValue() == null) || (element.getValue().length ==
 * 0)); } return true; } });
 */


efobj.FormValidator.add('IsValidLengthPassword', {
  test: function (element, options) {
    if( !((element.getValue() == null) || (element.getValue().length == 0))
          && (!((options.field1.getValue() == null) || (options.field1.getValue().length == 0)))){
        return element.getValue().length >= options.minLength;
    } 
    return true;
  }
});


efobj.FormValidator.add('IsValidPassword2', {
    test: function (element) {
      if( (!((element.getValue() == null) || (element.getValue().length == 0)))
            && (!((options.field1.getValue() == null) || (options.field1.getValue().length == 0))) ) {
        return !((/^[a-z]+$/.test(element.getValue())) || (/^[0-9]+$/.test(element.getValue())));
      }
      return true;
    }
});

efobj.FormValidator.add('IsValidIbanNoSpaces', {
  test: function (element, options) {
    var checkIban = element.getValue();
    if(!((checkIban == null) || (checkIban.length == 0))) {
      return checkIban.split(' ').length == 1;
    }
    return true;
  }
});

efobj.FormValidator.add('IsValidBic', {
  test: function (element, options) {
    var checkBic = element.getValue();
    if(!((checkBic == null) || (checkBic.length == 0))) {
      var checkRegex = new RegExp('^([a-zA-Z]{4}[a-zA-Z]{2}[a-zA-Z0-9]{2}([a-zA-Z0-9]{3})?)');
      return (checkBic.match(checkRegex) && (checkBic.length == 11 || checkBic.length == 8));
    }
    return true;
  }
});


efobj.FormValidator.add('IsValidIbanCountryUppercase', {
  test: function (element, options) {
    var checkIban = element.getValue();
    if(!((checkIban == null) || (checkIban.length == 0))) {
      return /^[A-Z][A-Z]/.test(checkIban);
    }
    return true;
  }
});

efobj.FormValidator.add('IsValidIbanNumbersOnlyAfterCountry', {
  test: function (element, options) {
    var checkIban = element.getValue();
    if(!((checkIban == null) || (checkIban.length == 0))) {
      // Using DE format for all other than AT??
      var regex = ( options.country == 'AT' ? /^[A-Z][A-Z](?=\d{18})/ : /^[A-Z][A-Z](?=\d{20})/ );
      return regex.test(checkIban);
    }
    return true;
  }
});

efobj.FormValidator.add('IsValidIbanLengthForCountry', {
  test: function (element, options) {
    var checkIban = element.getValue();
    if(!((checkIban == null) || (checkIban.length == 0))) {
      // Using DE format and length for all other than AT??
      var regex = ( options.country == 'AT' ? /^AT(?=\d{18})/ : /^DE(?=\d{20})/ );
      var length = options.country == 'AT' ? 20 : 22;
      return regex.test(checkIban) && checkIban.length == length;
    }
    return true;
  }
});


jQuery.fn.ForceNumericOnly = function(){
    return this.each(function(){
       
      $j(this).keydown(function(e)  {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                key == 8 || 
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};




