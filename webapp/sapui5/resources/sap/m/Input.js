/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./InputBase','./Popover','sap/ui/core/Item','./ColumnListItem','./GroupHeaderListItem','./DisplayListItem','./StandardListItem','sap/ui/core/SeparatorItem','./List','./Table','./library','sap/ui/core/IconPool','sap/ui/Device','sap/ui/core/Control','./Dialog','./SuggestionsPopover','./Toolbar','./ToolbarSpacer',"sap/ui/dom/containsOrEquals","sap/base/assert","sap/base/util/deepEqual","./InputRenderer","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/selectText"],function(I,P,a,C,G,D,S,b,L,T,l,c,d,e,f,g,h,j,k,m,n,o,q){"use strict";var p=l.ListType;var r=l.InputTextFormatMode;var s=l.InputType;var t=I.extend("sap.m.Input",{metadata:{library:"sap.m",properties:{type:{type:"sap.m.InputType",group:"Data",defaultValue:s.Text},maxLength:{type:"int",group:"Behavior",defaultValue:0},dateFormat:{type:"string",group:"Misc",defaultValue:'YYYY-MM-dd',deprecated:true},showValueHelp:{type:"boolean",group:"Behavior",defaultValue:false},showSuggestion:{type:"boolean",group:"Behavior",defaultValue:false},valueHelpOnly:{type:"boolean",group:"Behavior",defaultValue:false},filterSuggests:{type:"boolean",group:"Behavior",defaultValue:true},maxSuggestionWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},startSuggestion:{type:"int",group:"Behavior",defaultValue:1},showTableSuggestionValueHelp:{type:"boolean",group:"Behavior",defaultValue:true},description:{type:"string",group:"Misc",defaultValue:null},fieldWidth:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:'50%'},valueLiveUpdate:{type:"boolean",group:"Behavior",defaultValue:false},selectedKey:{type:"string",group:"Data",defaultValue:""},textFormatMode:{type:"sap.m.InputTextFormatMode",group:"Misc",defaultValue:r.Value},textFormatter:{type:"any",group:"Misc",defaultValue:""},suggestionRowValidator:{type:"any",group:"Misc",defaultValue:""},enableSuggestionsHighlighting:{type:"boolean",group:"Behavior",defaultValue:true},autocomplete:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"suggestionItems",aggregations:{suggestionItems:{type:"sap.ui.core.Item",multiple:true,singularName:"suggestionItem"},suggestionColumns:{type:"sap.m.Column",multiple:true,singularName:"suggestionColumn",bindable:"bindable",forwarding:{getter:"_getSuggestionsTable",aggregation:"columns"}},suggestionRows:{type:"sap.m.ColumnListItem",altTypes:["sap.m.GroupHeaderListItem"],multiple:true,singularName:"suggestionRow",bindable:"bindable",forwarding:{getter:"_getSuggestionsTable",aggregation:"items"}},_suggestionPopup:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_valueHelpIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false},selectedRow:{type:"sap.m.ColumnListItem",multiple:false}},events:{liveChange:{parameters:{value:{type:"string"},escPressed:{type:"boolean"},previousValue:{type:"string"}}},valueHelpRequest:{parameters:{fromSuggestions:{type:"boolean"}}},suggest:{parameters:{suggestValue:{type:"string"},suggestionColumns:{type:"sap.m.ListBase"}}},suggestionItemSelected:{parameters:{selectedItem:{type:"sap.ui.core.Item"},selectedRow:{type:"sap.m.ColumnListItem"}}},submit:{parameters:{value:{type:"string"}}}},designtime:"sap/m/designtime/Input.designtime"}});c.insertFontFaceStyle();t.prototype.init=function(){I.prototype.init.call(this);this._fnFilter=g._DEFAULTFILTER;this._bUseDialog=d.system.phone;this._bFullScreen=d.system.phone;this._iSetCount=0;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");};t.prototype.exit=function(){I.prototype.exit.call(this);this._deregisterEvents();this.cancelPendingSuggest();if(this._iRefreshListTimeout){clearTimeout(this._iRefreshListTimeout);this._iRefreshListTimeout=null;}if(this._oSuggPopover){this._oSuggPopover.destroy();this._oSuggPopover=null;}if(this._oShowMoreButton){this._oShowMoreButton.destroy();this._oShowMoreButton=null;}if(this._oButtonToolbar){this._oButtonToolbar.destroy();this._oButtonToolbar=null;}};t.prototype.onBeforeRendering=function(){var i=this.getSelectedKey(),u=this.getShowValueHelp()&&this.getEnabled()&&this.getEditable(),E=this.getAggregation("_endIcon")||[],v=E[0],w;I.prototype.onBeforeRendering.call(this);this._deregisterEvents();if(i){this.setSelectedKey(i);}if(this.getShowSuggestion()){this._oSuggPopover._sPopoverContentWidth=this.getMaxSuggestionWidth();this._oSuggPopover._bEnableHighlighting=this.getEnableSuggestionsHighlighting();this._oSuggPopover._bAutocompleteEnabled=this.getAutocomplete();this._oSuggPopover._bIsInputIncrementalType=this._isIncrementalType();if(this.getShowTableSuggestionValueHelp()){this._addShowMoreButton();}else{this._removeShowMoreButton();}w=this._oSuggPopover._oPopupInput;if(w){w.setType(this.getType());}}if(u){v=this._getValueHelpIcon();v.setProperty("visible",true,true);}else{if(v){v.setProperty("visible",false,true);}}};t.prototype.onAfterRendering=function(){I.prototype.onAfterRendering.call(this);if(this._bUseDialog&&this.getEditable()&&this.getEnabled()){this.$().on("click",q.proxy(function(E){if(this._onclick){this._onclick(E);}if(this.getShowSuggestion()&&this._oSuggPopover&&E.target.id!=this.getId()+"-vhi"){this._oSuggPopover._oPopover.open();}},this));}};t.prototype._getDisplayText=function(i){var u=this.getTextFormatter();if(u){return u(i);}var v=i.getText(),K=i.getKey(),w=this.getTextFormatMode();switch(w){case r.Key:return K;case r.ValueKey:return v+' ('+K+')';case r.KeyValue:return'('+K+') '+v;default:return v;}};t.prototype._onValueUpdated=function(i){if(this._bSelectingItem||i===this._sSelectedValue){return;}var K=this.getSelectedKey(),H;if(K===''){return;}if(this._hasTabularSuggestions()){H=this._oSuggPopover._oSuggestionTable&&!!this._oSuggPopover._oSuggestionTable.getSelectedItem();}else{H=this._oSuggPopover._oList&&!!this._oSuggPopover._oList.getSelectedItem();}if(H){return;}this.setProperty("selectedKey",'',true);this.setAssociation("selectedRow",null,true);this.setAssociation("selectedItem",null,true);this.fireSuggestionItemSelected({selectedItem:null,selectedRow:null});};t.prototype._updateSelectionFromList=function(){if(this._oSuggPopover._iPopupListSelectedIndex<0){return false;}var i=this._oSuggPopover._oList.getSelectedItem();if(i){if(this._hasTabularSuggestions()){this.setSelectionRow(i,true);}else{this.setSelectionItem(i._oItem,true);}}return true;};t.prototype.setSelectionItem=function(i,u){this._bSelectingItem=true;if(!i){this.setAssociation("selectedItem",null,true);return;}var v=this._iSetCount,N;this.setAssociation("selectedItem",i,true);this.setProperty("selectedKey",i.getKey(),true);if(u){this.fireSuggestionItemSelected({selectedItem:i});}if(v!==this._iSetCount){N=this.getValue();}else{N=this._getDisplayText(i);}this._sSelectedValue=N;this.updateInputField(N);if(this.bIsDestroyed){return;}this._oSuggPopover._iPopupListSelectedIndex=-1;if(!(this._bUseDialog&&this instanceof sap.m.MultiInput&&this._isMultiLineMode)){this._closeSuggestionPopup();}this._bSelectingItem=false;};t.prototype.addSuggestionRowGroup=function(i,H,u){H=H||new G({title:i.text||i.key});this.addAggregation("suggestionRows",H,u);return H;};t.prototype.addSuggestionItemGroup=function(i,H,u){H=H||new b({text:i.text||i.key});this.addAggregation("suggestionItems",H,u);return H;};t.prototype.setSelectedItem=function(i){if(typeof i==="string"){i=sap.ui.getCore().byId(i);}if(i!==null&&!(i instanceof a)){return this;}this.setSelectionItem(i);return this;};t.prototype.setSelectedKey=function(K){K=this.validateProperty("selectedKey",K);this.setProperty("selectedKey",K,true);if(this._hasTabularSuggestions()){return this;}if(!K){this.setSelectionItem();return this;}var i=this.getSuggestionItemByKey(K);this.setSelectionItem(i);return this;};t.prototype.getSuggestionItemByKey=function(K){var u=this.getSuggestionItems()||[],v,i;for(i=0;i<u.length;i++){v=u[i];if(v.getKey()===K){return v;}}};t.prototype.setSelectionRow=function(i,u){if(!i){this.setAssociation("selectedRow",null,true);return;}this._bSelectingItem=true;var v,w=this.getSuggestionRowValidator();if(w){v=w(i);if(!(v instanceof a)){v=null;}}var x=this._iSetCount,K="",N;this.setAssociation("selectedRow",i,true);if(v){K=v.getKey();}this.setProperty("selectedKey",K,true);if(u){this.fireSuggestionItemSelected({selectedRow:i});}if(x!==this._iSetCount){N=this.getValue();}else{if(v){N=this._getDisplayText(v);}else{N=this._fnRowResultFilter?this._fnRowResultFilter(i):g._DEFAULTRESULT_TABULAR(i);}}this._sSelectedValue=N;this.updateInputField(N);this._oSuggPopover._iPopupListSelectedIndex=-1;if(!(this._bUseDialog&&this instanceof sap.m.MultiInput&&this._isMultiLineMode)){this._closeSuggestionPopup();}this._bSelectingItem=false;};t.prototype.setSelectedRow=function(i){if(typeof i==="string"){i=sap.ui.getCore().byId(i);}if(i!==null&&!(i instanceof C)){return this;}this.setSelectionRow(i);return this;};t.prototype._getValueHelpIcon=function(){var i=this,E=this.getAggregation("_endIcon")||[],v=E[0];if(!v){v=this.addEndIcon({id:this.getId()+"-vhi",src:c.getIconURI("value-help"),useIconTooltip:false,noTabStop:true,press:function(u){if(!i.getValueHelpOnly()){var w=this.getParent(),$;if(d.support.touch){$=w.$('inner');$.attr('readonly','readonly');w.focus();$.removeAttr('readonly');}else{w.focus();}i.bValueHelpRequested=true;i.fireValueHelpRequest({fromSuggestions:false});}}});}return v;};t.prototype._fireValueHelpRequestForValueHelpOnly=function(){if(this.getEnabled()&&this.getEditable()&&this.getShowValueHelp()&&this.getValueHelpOnly()){if(d.system.phone){this.focus();}this.fireValueHelpRequest({fromSuggestions:false});}};t.prototype.ontap=function(E){I.prototype.ontap.call(this,E);this._fireValueHelpRequestForValueHelpOnly();};t.prototype.setWidth=function(w){return I.prototype.setWidth.call(this,w||"100%");};t.prototype.getWidth=function(){return this.getProperty("width")||"100%";};t.prototype.setFilterFunction=function(F){if(F===null||F===undefined){this._fnFilter=g._DEFAULTFILTER;return this;}m(typeof(F)==="function","Input.setFilterFunction: first argument fnFilter must be a function on "+this);this._fnFilter=F;return this;};t.prototype.setRowResultFunction=function(F){var i;if(F===null||F===undefined){this._fnRowResultFilter=g._DEFAULTRESULT_TABULAR;return this;}m(typeof(F)==="function","Input.setRowResultFunction: first argument fnFilter must be a function on "+this);this._fnRowResultFilter=F;i=this.getSelectedRow();if(i){this.setSelectedRow(i);}return this;};t.prototype.closeSuggestions=function(){this._closeSuggestionPopup();};t.prototype._doSelect=function(i,E){if(d.support.touch){return;}var u=this._$input[0];if(u){var R=this._$input;u.focus();R.selectText(i?i:0,E?E:R.val().length);}return this;};t.prototype._isIncrementalType=function(){var i=this.getType();if(i==="Number"||i==="Date"||i==="Datetime"||i==="Month"||i==="Time"||i==="Week"){return true;}return false;};t.prototype.onsapescape=function(E){var i;if(this._oSuggPopover&&this._oSuggPopover._oPopover.isOpen()){E.originalEvent._sapui_handledByControl=true;this._oSuggPopover._iPopupListSelectedIndex=-1;this._closeSuggestionPopup();if(this._sBeforeSuggest!==undefined){if(this._sBeforeSuggest!==this.getValue()){i=this._lastValue;this.setValue(this._sBeforeSuggest);this._lastValue=i;}this._sBeforeSuggest=undefined;}return;}if(this.getValueLiveUpdate()){this.setProperty("value",this._lastValue,true);}if(I.prototype.onsapescape){I.prototype.onsapescape.apply(this,arguments);}};t.prototype.onsapenter=function(E){this.cancelPendingSuggest();if(this._oSuggPopover&&this._oSuggPopover._oPopover.isOpen()){if(!this._updateSelectionFromList()){this._closeSuggestionPopup();}}if(I.prototype.onsapenter){I.prototype.onsapenter.apply(this,arguments);}if(this.getEnabled()&&this.getEditable()&&!(this.getValueHelpOnly()&&this.getShowValueHelp())){this.fireSubmit({value:this.getValue()});}};t.prototype.onsapfocusleave=function(E){var i=this._oSuggPopover,u=i&&i._oPopover,F=E.relatedControlId&&sap.ui.getCore().byId(E.relatedControlId),v=F&&F.getFocusDomRef(),w=u&&v&&k(u.getDomRef(),v);if(u instanceof P){if(w){this._bPopupHasFocus=true;if(d.system.desktop&&n(u.getFocusDomRef(),v)){this.focus();}}else{if(this.getDOMValue()===this._sSelectedSuggViaKeyboard){this._sSelectedSuggViaKeyboard=null;}}}if(!w&&(!i||!i._sProposedItemText)){I.prototype.onsapfocusleave.apply(this,arguments);}this.bValueHelpRequested=false;};t.prototype.onmousedown=function(E){var i=this._oSuggPopover&&this._oSuggPopover._oPopover;if((i instanceof P)&&i.isOpen()){E.stopPropagation();}};t.prototype._deregisterEvents=function(){if(this._oSuggPopover){this._oSuggPopover._deregisterResize();}if(this._bUseDialog&&this._oSuggPopover&&this._oSuggPopover._oPopover){this.$().off("click");}};t.prototype.updateSuggestionItems=function(){this._bSuspendInvalidate=true;this.updateAggregation("suggestionItems");this._synchronizeSuggestions();this._bSuspendInvalidate=false;return this;};t.prototype.invalidate=function(){if(!this._bSuspendInvalidate){e.prototype.invalidate.apply(this,arguments);}};t.prototype.cancelPendingSuggest=function(){if(this._iSuggestDelay){clearTimeout(this._iSuggestDelay);this._iSuggestDelay=null;}};t.prototype._triggerSuggest=function(v){this.cancelPendingSuggest();this._bShouldRefreshListItems=true;if(!v){v="";}if(v.length>=this.getStartSuggestion()){this._iSuggestDelay=setTimeout(function(){if(this._sPrevSuggValue!==v){this._bBindingUpdated=false;this.fireSuggest({suggestValue:v});if(!this._bBindingUpdated){this._refreshItemsDelayed();}this._sPrevSuggValue=v;}}.bind(this),300);}else if(this._bUseDialog){if(this._oSuggPopover._oList instanceof T){this._oSuggPopover._oList.addStyleClass("sapMInputSuggestionTableHidden");}else if(this._oSuggPopover._oList&&this._oSuggPopover._oList.destroyItems){this._oSuggPopover._oList.destroyItems();}}else if(this._oSuggPopover&&this._oSuggPopover._oPopover.isOpen()){setTimeout(function(){var N=this.getDOMValue()||'';if(N<this.getStartSuggestion()){this._oSuggPopover._iPopupListSelectedIndex=-1;this._closeSuggestionPopup();}}.bind(this),0);}};(function(){t.prototype.setShowSuggestion=function(v){this.setProperty("showSuggestion",v,true);if(v){this._oSuggPopover=this._getSuggestionsPopover();this._oSuggPopover._iPopupListSelectedIndex=-1;}else{if(this._oSuggPopover){this._oSuggPopover._destroySuggestionPopup();this._oSuggPopover._iPopupListSelectedIndex=-1;}}return this;};t.prototype.setShowTableSuggestionValueHelp=function(v){this.setProperty("showTableSuggestionValueHelp",v,true);if(!(this._oSuggPopover&&this._oSuggPopover._oPopover)){return this;}if(v){this._addShowMoreButton();}else{this._removeShowMoreButton();}return this;};t.prototype.oninput=function(E){I.prototype.oninput.call(this,E);if(E.isMarked("invalid")){return;}var v=this.getDOMValue();if(this.getValueLiveUpdate()){this.setProperty("value",v,true);this._onValueUpdated(v);}this.fireLiveChange({value:v,newValue:v});if(this.getShowSuggestion()&&!this._bUseDialog){this._triggerSuggest(v);}};t.prototype.getValue=function(){return this.getDomRef("inner")&&this._$input?this.getDOMValue():this.getProperty("value");};t.prototype._refreshItemsDelayed=function(){clearTimeout(this._iRefreshListTimeout);this._iRefreshListTimeout=setTimeout(function(){if(this._oSuggPopover){this._refreshListItems();}}.bind(this),0);};t.prototype._filterListItems=function(u,v){var i,w,x,y=[],H=[],F=this.getFilterSuggests();for(i=0;i<u.length;i++){x=u[i];if(u[i].isA("sap.ui.core.SeparatorItem")){w=new G({id:x.getId()+"-ghli",title:u[i].getText()});y.push({header:w,visible:false});this._configureListItem(x,w);H.push(w);}else if(!F||this._fnFilter(v,x)){if(u[i].isA("sap.ui.core.ListItem")){w=new D(x.getId()+"-dli");w.setLabel(x.getText());w.setValue(x.getAdditionalText());}else{w=new S(x.getId()+"-sli");w.setTitle(x.getText());}if(y.length){y[y.length-1].visible=true;}this._configureListItem(x,w);H.push(w);}}y.forEach(function(z){z.header.setVisible(z.visible);});return{hitItems:H,groups:y};};t.prototype._filterTabularItems=function(u,v){var i,w,F=this.getFilterSuggests(),H=[],x=[];for(i=0;i<u.length;i++){if(u[i].isA("sap.m.GroupHeaderListItem")){x.push({header:u[i],visible:false});}else{w=!F||this._fnFilter(v,u[i]);u[i].setVisible(w);w&&H.push(u[i]);if(x.length&&w){x[x.length-1].visible=true;}}}x.forEach(function(y){y.header.setVisible(y.visible);});this._getSuggestionsTable().invalidate();return{hitItems:H,groups:x};};t.prototype._clearSuggestionPopupItems=function(){if(!this._oSuggPopover._oList){return;}if(this._oSuggPopover._oList instanceof T){this._oSuggPopover._oList.removeSelections(true);}else{this._oSuggPopover._oList.destroyItems();}};t.prototype._hideSuggestionPopup=function(){var i=this._oSuggPopover._oPopover;if(!this._bUseDialog){if(i.isOpen()){this._sCloseTimer=setTimeout(function(){this._oSuggPopover._iPopupListSelectedIndex=-1;this.cancelPendingSuggest();if(this._oSuggPopover._sTypedInValue){this.setDOMValue(this._oSuggPopover._sTypedInValue);}this._oSuggPopover._oProposedItem=null;i.close();}.bind(this),0);}}else if(this._hasTabularSuggestions()&&this._oSuggPopover._oList){this._oSuggPopover._oList.addStyleClass("sapMInputSuggestionTableHidden");}this.$("SuggDescr").text("");this.$("inner").removeAttr("aria-haspopup");this.$("inner").removeAttr("aria-activedescendant");};t.prototype._openSuggestionPopup=function(O){var i=this._oSuggPopover._oPopover;if(!this._bUseDialog){if(this._sCloseTimer){clearTimeout(this._sCloseTimer);this._sCloseTimer=null;}if(!i.isOpen()&&!this._sOpenTimer&&O!==false){this._sOpenTimer=setTimeout(function(){this._sOpenTimer=null;i.open();}.bind(this),0);}}this.$("inner").attr("aria-haspopup","true");};t.prototype._getFilteredSuggestionItems=function(i){var F,u=this.getSuggestionItems(),v=this.getSuggestionRows();if(this._hasTabularSuggestions()){if(this._bUseDialog&&this._oSuggPopover._oList){this._oSuggPopover._oList.removeStyleClass("sapMInputSuggestionTableHidden");}F=this._filterTabularItems(v,i);}else{F=this._filterListItems(u,i);}return F;};t.prototype._fillSimpleSuggestionPopupItems=function(F){var i,H=F.hitItems,u=F.groups,v=H.length,w=v;if(!this._hasTabularSuggestions()){for(i=0;i<v;i++){this._oSuggPopover._oList.addItem(H[i]);}w-=u.length;}return w;};t.prototype._applySuggestionAcc=function(N){var A="",R=this._oRb;if(N===1){A=R.getText("INPUT_SUGGESTIONS_ONE_HIT");}else if(N>1){A=R.getText("INPUT_SUGGESTIONS_MORE_HITS",N);}else{A=R.getText("INPUT_SUGGESTIONS_NO_HIT");}this.$("SuggDescr").text(A);};t.prototype._refreshListItems=function(){var i=this.getShowSuggestion(),u=this._oSuggPopover._sTypedInValue||this.getDOMValue()||"",F,v;this._oSuggPopover._iPopupListSelectedIndex=-1;if(!i||!this._bShouldRefreshListItems||!this.getDomRef()||(!this._bUseDialog&&!this.$().hasClass("sapMInputFocused"))){return null;}this._clearSuggestionPopupItems();if(u.length<this.getStartSuggestion()){this._hideSuggestionPopup();return false;}F=this._getFilteredSuggestionItems(u);v=this._fillSimpleSuggestionPopupItems(F);if(v>0){this._openSuggestionPopup(this.getValue().length>=this.getStartSuggestion());}else{this._hideSuggestionPopup();}this._applySuggestionAcc(v);};t.prototype._configureListItem=function(i,u){var v=p.Active;if(!i.getEnabled()||u.isA("sap.m.GroupHeaderListItem")){v=p.Inactive;}u.setType(v);u._oItem=i;u.addEventDelegate({ontouchstart:function(E){(E.originalEvent||E)._sapui_cancelAutoClose=true;}});return u;};t.prototype.addSuggestionItem=function(i){this.addAggregation("suggestionItems",i,true);if(this._oSuggPopover){this._synchronizeSuggestions();this._createSuggestionPopupContent();}return this;};t.prototype.insertSuggestionItem=function(i,u){this.insertAggregation("suggestionItems",u,i,true);if(this._oSuggPopover){this._synchronizeSuggestions();this._createSuggestionPopupContent();}return this;};t.prototype.removeSuggestionItem=function(i){var u=this.removeAggregation("suggestionItems",i,true);this._synchronizeSuggestions();return u;};t.prototype.removeAllSuggestionItems=function(){var i=this.removeAllAggregation("suggestionItems",true);this._synchronizeSuggestions();return i;};t.prototype.destroySuggestionItems=function(){this.destroyAggregation("suggestionItems",true);this._synchronizeSuggestions();return this;};t.prototype.addSuggestionRow=function(i){i.setType(p.Active);this.addAggregation("suggestionRows",i);this._synchronizeSuggestions();this._createSuggestionPopupContent();return this;};t.prototype.insertSuggestionRow=function(i,u){i.setType(p.Active);this.insertAggregation("suggestionRows",i,u);this._synchronizeSuggestions();this._createSuggestionPopupContent();return this;};t.prototype.removeSuggestionRow=function(i){var u=this.removeAggregation("suggestionRows",i);this._synchronizeSuggestions();return u;};t.prototype.removeAllSuggestionRows=function(){var i=this.removeAllAggregation("suggestionRows");this._synchronizeSuggestions();return i;};t.prototype.destroySuggestionRows=function(){this.destroyAggregation("suggestionRows");this._synchronizeSuggestions();return this;};t.prototype.bindAggregation=function(){if(arguments[0]==="suggestionRows"||arguments[0]==="suggestionColumns"||arguments[0]==="suggestionItems"){this._createSuggestionPopupContent(arguments[0]==="suggestionRows"||arguments[0]==="suggestionColumns");this._bBindingUpdated=true;}return I.prototype.bindAggregation.apply(this,arguments);};t.prototype._closeSuggestionPopup=function(){if(this._oSuggPopover){this._bShouldRefreshListItems=false;this.cancelPendingSuggest();this._oSuggPopover._oPopover.close();if(!this._bUseDialog&&this.$().hasClass("sapMInputFocused")){this.openValueStateMessage();}this.$("SuggDescr").text("");this.$("inner").removeAttr("aria-haspopup");this.$("inner").removeAttr("aria-activedescendant");this._sPrevSuggValue=null;}};t.prototype._synchronizeSuggestions=function(){this._bShouldRefreshListItems=true;this._refreshItemsDelayed();if(!this.getDomRef()||(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen())){return;}this._synchronizeSelection();};t.prototype._synchronizeSelection=function(){var i=this.getSelectedKey();if(!i){return;}if(this.getValue()&&!this.getSelectedItem()&&!this.getSelectedRow()){return;}this.setSelectedKey(i);};})();t.prototype.onfocusin=function(E){I.prototype.onfocusin.apply(this,arguments);this.$().addClass("sapMInputFocused");if(!this._bUseDialog&&this._oSuggPopover&&this._oSuggPopover._oPopover&&this._oSuggPopover._oPopover.isOpen()){this.closeValueStateMessage();}if(!this._bPopupHasFocus&&!this.getStartSuggestion()&&!this.getValue()){this._triggerSuggest(this.getValue());}this._bPopupHasFocus=undefined;this._sPrevSuggValue=null;};t.prototype.onsapshow=function(E){if(!this.getEnabled()||!this.getEditable()||!this.getShowValueHelp()){return;}this.bValueHelpRequested=true;this.fireValueHelpRequest({fromSuggestions:false});E.preventDefault();E.stopPropagation();};t.prototype.onsaphide=t.prototype.onsapshow;t.prototype.onsapselect=function(E){this._fireValueHelpRequestForValueHelpOnly();};t.prototype.onfocusout=function(E){I.prototype.onfocusout.apply(this,arguments);this.$().removeClass("sapMInputFocused");this.closeValueStateMessage(this);};t.prototype._hasTabularSuggestions=function(){return!!(this.getAggregation("suggestionColumns")&&this.getAggregation("suggestionColumns").length);};t.prototype._getSuggestionsTable=function(){return this._getSuggestionsPopover()._getSuggestionsTable();};t.prototype.clone=function(){var i=e.prototype.clone.apply(this,arguments),u;u=this.getBindingInfo("suggestionColumns");if(u){i.bindAggregation("suggestionColumns",q.extend({},u));}u=this.getBindingInfo("suggestionRows");if(u){i.bindAggregation("suggestionRows",q.extend({},u));}i.setRowResultFunction(this._fnRowResultFilter);return i;};t.prototype.setValue=function(v){this._iSetCount++;I.prototype.setValue.call(this,v);this._onValueUpdated(v);return this;};t.prototype.setDOMValue=function(v){this._$input.val(v);};t.prototype.getDOMValue=function(){return this._$input.val();};t.prototype.updateInputField=function(N){if(this._oSuggPopover&&this._oSuggPopover._oPopover.isOpen()&&this._bUseDialog){this._oSuggPopover._oPopupInput.setValue(N);this._oSuggPopover._oPopupInput._doSelect();}else{N=this._getInputValue(N);this.setDOMValue(N);this.onChange(null,null,N);}};t.prototype.getAccessibilityInfo=function(){var i=I.prototype.getAccessibilityInfo.apply(this,arguments);i.description=((i.description||"")+" "+this.getDescription()).trim();return i;};t.prototype.preventChangeOnFocusLeave=function(E){return this.bFocusoutDueRendering||this.bValueHelpRequested;};t.prototype._getShowMoreButton=function(){return this._oShowMoreButton||(this._oShowMoreButton=new sap.m.Button({text:this._oRb.getText("INPUT_SUGGESTIONS_SHOW_ALL"),press:function(){if(this.getShowTableSuggestionValueHelp()){this.fireValueHelpRequest({fromSuggestions:true});this._oSuggPopover._iPopupListSelectedIndex=-1;this._closeSuggestionPopup();}}.bind(this)}));};t.prototype._addShowMoreButton=function(i){var u=this._oSuggPopover&&this._oSuggPopover._oPopover;if(!u||!i&&!this._hasTabularSuggestions()){return;}if(u instanceof f){var v=this._getShowMoreButton();u.setEndButton(v);}else{var B=this._getButtonToolbar();u.setFooter(B);}};t.prototype._removeShowMoreButton=function(){var i=this._oSuggPopover&&this._oSuggPopover._oPopover;if(!i||!this._hasTabularSuggestions()){return;}if(i instanceof f){i.setEndButton(null);}else{i.setFooter(null);}};t.prototype._getButtonToolbar=function(){var i=this._getShowMoreButton();return this._oButtonToolbar||(this._oButtonToolbar=new h({content:[new j(),i]}));};t.prototype._createSuggestionPopupContent=function(i){if(this._bIsBeingDestroyed||this._getSuggestionsPopover()._oList){return;}this._oSuggPopover._createSuggestionPopupContent(i,this._hasTabularSuggestions());if(!this._hasTabularSuggestions()&&!i){this._oSuggPopover._oList.attachItemPress(function(E){if(d.system.desktop){this.focus();}var u=E.getParameter("listItem");if(!u.isA("sap.m.GroupHeaderListItem")){this._oSuggPopover._bSuggestionItemTapped=true;this.setSelectionItem(u._oItem,true);}},this);}else{if(this._fnFilter===g._DEFAULTFILTER){this._fnFilter=g._DEFAULTFILTER_TABULAR;}if(!this._fnRowResultFilter){this._fnRowResultFilter=g._DEFAULTRESULT_TABULAR;}if(this.getShowTableSuggestionValueHelp()){this._addShowMoreButton(i);}}};t.prototype._createPopupInput=function(){var i=new t(this.getId()+"-popup-input",{width:"100%",valueLiveUpdate:true,showValueHelp:this.getShowValueHelp(),valueHelpRequest:function(E){this.fireValueHelpRequest({fromSuggestions:true});this._oSuggPopover._iPopupListSelectedIndex=-1;this._closeSuggestionPopup();}.bind(this),liveChange:function(E){var v=E.getParameter("newValue");this.setDOMValue(this._getInputValue(this._oSuggPopover._oPopupInput.getValue()));this._triggerSuggest(v);this.fireLiveChange({value:v,newValue:v});}.bind(this)}).addStyleClass("sapMInputSuggInDialog");i.addEventDelegate({onsapenter:function(){if(!(sap.m.MultiInput&&this instanceof sap.m.MultiInput)){if(this.getAutocomplete()){this._oSuggPopover._finalizeAutocomplete();}this._closeSuggestionPopup();}}},this);return i;};t.prototype._getSuggestionsPopover=function(){if(!this._oSuggPopover){this._oSuggPopover=new g(this);if(this._bUseDialog){this._oSuggPopover._oPopupInput=this._createPopupInput();}this._oSuggPopover._createSuggestionPopup();this._oSuggPopover._bAutocompleteEnabled=this.getAutocomplete();this._oSuggPopover.attachEvent(g.M_EVENTS.SELECTION_CHANGE,function(E){var N=E.getParameter("newValue");this.setDOMValue(N);this._sSelectedSuggViaKeyboard=N;this._doSelect();},this);if(this.getShowTableSuggestionValueHelp()){this._addShowMoreButton();}if(this._bUseDialog){this._oSuggPopover._oPopover.attachBeforeClose(function(){this.setDOMValue(this._getInputValue(this._oSuggPopover._oPopupInput.getValue()));this.onChange();if(this instanceof sap.m.MultiInput&&this._bUseDialog){this._onDialogClose();}},this).attachAfterClose(function(){var i=this._oSuggPopover._oList;if(T&&!(i instanceof T)){i.destroyItems();}else{i.removeSelections(true);}}.bind(this)).attachAfterOpen(function(){var v=this.getValue();this._oSuggPopover._oPopupInput.setValue(v);this._triggerSuggest(v);this._refreshListItems();},this).attachBeforeOpen(function(){this._oSuggPopover._oPopupInput.setPlaceholder(this.getPlaceholder());this._oSuggPopover._oPopupInput.setMaxLength(this.getMaxLength());},this);this._oSuggPopover._oPopover.getBeginButton().attachPress(function(){this._closeSuggestionPopup();},this);}else{this._oSuggPopover._oPopover.attachBeforeClose(this._updateSelectionFromList,this).attachAfterClose(function(){var i=this._oSuggPopover._oList;if(i instanceof T){i.removeSelections(true);}else{i.destroyItems();}}.bind(this)).attachBeforeOpen(function(){this._sBeforeSuggest=this.getValue();this._oSuggPopover._resizePopup();this._oSuggPopover._registerResize();},this).attachAfterClose(function(){this._oSuggPopover._deregisterResize();},this);}this.setAggregation("_suggestionPopup",this._oSuggPopover._oPopover);this._oSuggestionPopup=this._oSuggPopover._oPopover;}return this._oSuggPopover;};t.prototype.showItems=function(F){var i,u,v=this._fnFilter;if(!this.getEnabled()||!this.getEditable()){return;}this.setFilterFunction(F||function(){return true;});this._clearSuggestionPopupItems();i=this._getFilteredSuggestionItems(this.getDOMValue());u=this._fillSimpleSuggestionPopupItems(i);if(u>0){this._openSuggestionPopup();}else{this._hideSuggestionPopup();}this._applySuggestionAcc(u);this.setFilterFunction(v);};return t;});