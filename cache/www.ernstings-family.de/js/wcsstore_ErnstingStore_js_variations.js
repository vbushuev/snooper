var varObj = new Object();
varObj.defaultImg = true;
varObj.variationAttributes = 0;
varObj.variationsTree = null;

varObj.setImagePath = function(imagePath) {
  varObj.imagePath = imagePath;
}

varObj.setDefaultImageName = function(defaultImageName) {
  varObj.defaultImageName = defaultImageName;
}

varObj.setDefaultSmallImageName = function(defaultSmallImageName) {
  varObj.defaultSmallImageName = defaultSmallImageName;
}

varObj.setDefaultPartNumber = function(defaultPartNumber) {
  varObj.defaultPartNumber = defaultPartNumber;
}

varObj.setDefaultPrice = function(defaultPrice) {
  varObj.defaultPrice = defaultPrice;
}

varObj.setOverlayFrom = function(overlayFrom){
  varObj.overlayFrom = overlayFrom;
}

varObj.setOverlayOutOfStock = function(overlayOutOfStock){
  varObj.overlayOutOfStock = overlayOutOfStock;
}

varObj.setNoOverlay = function(noOverlay){
  varObj.noOverlay = noOverlay;
}

varObj.setVariations = function(variations) {
  varObj.variations = variations;
}

varObj.setItemInfos = function(itemInfos) {
  varObj.itemInfos = itemInfos;
}

varObj.setOrderItemInfos = function(orderItemInfos) {
  varObj.orderItemInfos = orderItemInfos;
}

/*
 * Initialize all select boxes and select the first valid element
 *
 */
varObj.init = function(what,where,outOfStock) {
  var pDiv = $(what);
  varObj.variationsTree = varObj.variations.dependencies;
  // changes for filtering out of stock items START
  for(var i = 0; i < varObj.variations.attributes.length; i++) {
    vList = varObj.variations.complete[varObj.variations.attributes[i]];
    if(vList.length > 1) {
      varObj.variationAttributes++;
    } else {
      varObj.variationsTree = varObj.variations.dependencies[varObj.variations.attributes[i]][varObj.variations.complete[varObj.variations.attributes[i]]]
    }
  }
  // changes for filtering out of stock items END
  var attributeList = varObj.variations.attributes;
  for(var i = 0; i < varObj.variations.attributes.length; i++) {
    varObj.createSelection(pDiv, varObj.variations.attributes[i], 0, where,outOfStock);
  }
  varObj.selectFirstValid(where,outOfStock);
}

varObj.selectFirstValid = function(where,outOfStock) {
  varObj.setItemId(varObj.getFirstValid(varObj.variations.dependencies), where,outOfStock);
}

varObj.getFirstValid = function(tree) {
  if($type(tree) == 'object') {
    for(var variation in tree) {
      if(varObj.variations.complete[variation]) {
        for(var i = 0; i < varObj.variations.complete[variation].length; i++) {
          var value = varObj.variations.complete[variation][i];
          var tmpResult = varObj.getFirstValid(tree[variation][value]);
          if(tmpResult) 
            return tmpResult;
        }
      }
    }
  } else {
    var updateData = varObj.itemInfos[tree];
    if(!updateData['button_overlay']){
      return tree;
    }
  }
  return null;
}

/*
 * Create a select box inside a parent div.
 */
varObj.createSelection = function(parent, id, selected, where, outOfStock) {
  var vList = varObj.variations.complete[id];
  // Map variation ID into CSS style class name
  var styleClass = varObj.mapIdToStyleClass(id);
  // Generate HTML
  var outDiv = new Element('div');
  var labelSpan = new  Element('span', {'id' : 'label_' + styleClass, 'class' : 'label'});
  var valueSpan = new Element('span', {'class' : styleClass});
  var clearDiv = new  Element('div', {'class' : 'clear'});
  if(vList.length > 1) {
    var newSelect = new Element('div', { 
        'id': id,
        'disabled' : outOfStock,
        'class': 'link_choice_group'
    });
    empty = true;
    validSizes = 0;
    for (var i = 0; i < vList.length; i++) {
      if(varObj.isValidSize(id,vList[i])) {
        var link = new Element('a', {
          id: 'variation_' + styleClass + '_' + vList[i],
          href: '#', 
          title: vList[i],					          
          events: {
            click: function(ev, id){
//              if (!outOfStock) {
                varObj.selectChanged(newSelect, this, where);
                
                // remove all active classes
                if((ev.currentTarget)) {
                  var target = ev.currentTarget;
                  var select = target.getParent();
                } 
                else {
                  var target = ev.srcElement;
                  var select = target.getParent().getParent();
                }							
                                
                select.getElements('a').each(function(a) {
                  a.removeClass('active');
                });
                
                // add active class for clicked element
                $(this).addClass('active');
//              }
              
              ev.returnValue = false;
              if(ev.preventDefault) ev.preventDefault();
              
              return false;
              
            }
          }        
        });
                
        var e = new Element('span');				
        e.setText(vList[i]);				        
        
        link.adopt(e);					
        
        newSelect.adopt(link);
        empty = false;
        validSizes++;
      }
    }
    
    // set first element to active if no active element available
    // but not in change_item view 
    if (where != "change_item" && !empty) {
      var activeSizeButtons = newSelect.getElements('a.active');
      if (activeSizeButtons.length == 0) {
        newSelect.getElement('a').addClass('active');
      }
    }
    
    // Add hyphen, if list is empty
    if(empty) {
      var e = new Element('span');
      e.setText('-');
      newSelect.adopt(e);
    }

    outDiv.injectInside(parent);
    labelSpan.injectInside(outDiv);
    valueSpan.injectAfter(labelSpan);
    clearDiv.injectAfter(valueSpan);
    newSelect.injectInside(valueSpan);
    labelSpan.appendText(id + ': ');
  } else if (vList.length == 1) {
    outDiv.injectInside(parent);
    labelSpan.injectInside(outDiv);
    valueSpan.injectAfter(labelSpan);
    clearDiv.injectAfter(valueSpan);
    labelSpan.appendText(id + ': ');
    valueSpan.appendText(vList[0]);
  }
}

varObj.isValidSize = function(id, size) {
  data = varObj.itemInfos[varObj.variationsTree[id][size]];
  if(data['button_overlay'] && data['button_overlay'] == 'OVERLAY_OUT_OF_STOCK') {
    return false;
  } else {
    return true;
  }
}

/*
 *  Called by created select boxes at their onchange event.
 */
/*
varObj.selectChanged = function(select, where) {
  varObj.changeSelections(select.id, select.options[select.selectedIndex].value, where);
  varObj.updateDetails(where);
}
*/
varObj.selectChanged = function(select, option, where) {
  varObj.changeSelections(select.id, option.title, where);
  varObj.updateDetails(where);
}

/*
 *  Changes entries of the variation select boxes.
 *
 */
varObj.changeSelections = function(name, value, where) {
  for(var dependency in varObj.variations.dependencies[name][value]) {
    var dList = varObj.variations.complete[dependency];
    if(dList.length > 1) {
      var select = $(dependency);
      var oldValue = select.options[select.selectedIndex].value;
      var newIndex = 0;
      select.options.length = 0;
      for (var i = 0; i < dList.length; i++) {
        if(varObj.variations.dependencies[name][value][dependency][dList[i]]) {
          var newOpt = new Option(dList[i]);
          newOpt.value=dList[i];
          select.options[select.options.length] = newOpt;
          if(dList[i] == oldValue)
            newIndex = select.options.length-1;
        }
      }
      select.selectedIndex = newIndex;
    }
  }
}

varObj.getQuantity = function(where) {
  return $('number').value;
}

varObj.getImg = function() {
  if(varObj.itemInfos[varObj.getItemId()]['img']) {
    return varObj.itemInfos[varObj.getItemId()]['img'];
  } else {
    return varObj.defaultImageName;
  }
}

varObj.setItemId =  function(itemId, where, outOfStock) {
  if(varObj.orderItemInfos) {
    for(var variation in varObj.orderItemInfos) {
      if(varObj.variations.complete[variation])
        if(varObj.variations.complete[variation].length > 1) {
          varSel = $(variation);					
          varLinks = varSel.getElements('a');
          
          for(var j = 0; j < varLinks.length; j++) {
            if(varLinks[j].getProperty('title') == varObj.orderItemInfos[variation])
              varLinks[j].addClass('active');
          }
        }
    }
  } else {
    var itemData = varObj.getItemData(itemId, varObj.variations.dependencies, new Object());
    if(itemData)
      for(var variation in itemData) {
        if(varObj.variations.complete[variation])
          if(varObj.variations.complete[variation].length > 1) {
            varList = $(variation);
//            for(var j = 0; j < varList.children.length; j++) {
//              if(varList.children[j].value == itemData[variation])
//                varSel.selectedIndex = j;
//            }
          }
      }
      
  }
  varObj.updateDetails(where, outOfStock);
}

varObj.getItemData = function(itemId, tree, result) {
  if($type(tree) == 'object' && result && itemId) {
    for(var variation in tree) {
      if(varObj.variations.attributes.contains(variation)) {
        for(var i = 0; i < varObj.variations.complete[variation].length; i++) {
          var value = varObj.variations.complete[variation][i];
          result[variation] = value;
          if(tree[variation][value] == itemId)
            return result;
          else {
            var tmpResult = varObj.getItemData(itemId, tree[variation][value], result);
            if(tmpResult)
              return tmpResult;
          }
        }
      }
    }
  }
  return null;
}

varObj.getItemId = function() {
  var result = varObj.variations.dependencies;
   
  for(var variation in varObj.variations.complete) {
    var varValue;
    if(varObj.variations.complete[variation].length > 1) {
            
      varSel = $(variation);
      if (varSel.getElement('a.active') != null)
        varValue = varSel.getElement('a.active').getFirst().getText();
      
    } else if(varObj.variations.complete[variation].length == 1) {
      
      varValue = varObj.variations.complete[variation][0];
    }
    if(result)
      result = result[variation][varValue];
  }

  return result;
}

varObj.updateDetails = function(where, outOfStock) {
  var updateData = varObj.itemInfos[varObj.getItemId(where)]
  if(updateData) {
    if(updateData['price']) {
      var dataToUpdate = $('prd_price');
      dataToUpdate.setHTML(updateData['price']);
    } else {
      var dataToUpdate = $('prd_price');
      dataToUpdate.setHTML(varObj.defaultPrice);
    }
    /* The following wasn't migrated to the new zoom viewer in "productdetailimage.jspf". See MT2036
       Add #prd_img_big to noflash IMG. Also extend and $j.efProductView.changeZoomImage() and use it to set item depending zoom image here! 
    if(updateData['img']) {
      if($('img_0')) {
        var smallimageanchor = $('img_0');
        smallimageanchor.href = varObj.imagePath  + updateData['img'];
        smallimageanchor.setHTML('<img src="'+varObj.imagePath  + updateData['img_small']+'" alt="" />'); 
        varObj.defaultImg = false;
        if(smallimageanchor.getParent().hasClass("current")) {
          var dataToUpdate = $('prd_img_big');
          dataToUpdate.src = varObj.imagePath  + updateData['img']; 
        }
      } else {
        var dataToUpdate = $('prd_img_big');
        dataToUpdate.src = varObj.imagePath  + updateData['img'];
      }
    } else if(!varObj.defaultImg){
      if($('img_0')) {
        var smallimageanchor = $('img_0');
        smallimageanchor.href = varObj.imagePath  + varObj.defaultImageName;
        smallimageanchor.setHTML('<img src="'+varObj.imagePath  + varObj.defaultSmallImageName+'" alt="" />'); 
        if(smallimageanchor.getParent().hasClass("current")) {
          var dataToUpdate = $('prd_img_big');
          dataToUpdate.src = varObj.imagePath  + varObj.defaultImageName; 
        }
      } else {
        var dataToUpdate = $('prd_img_big');
        dataToUpdate.src = varObj.imagePath  + updateData['img'];
      } 
      varObj.defaultImg = true;
    }
    */
  }    
}

varObj.getPrice = function(where) {
  if(varObj.itemInfos[varObj.getItemId(where)]['price']) {
    return varObj.itemInfos[varObj.getItemId(where)]['price'];
  } else {
    return varObj.defaultPrice;
  }
}

varObj.mapIdToStyleClass = function(id) {
  if (id == 'Farbe')
    return 'prd_color';
  else if (id == 'Größe')
    return 'prd_size';
  else
    return 'prd';
}
