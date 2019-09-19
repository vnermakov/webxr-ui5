/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/delegate/ItemNavigation','sap/ui/core/ResizeHandler','sap/ui/core/ListItem','sap/ui/core/IconPool','./SegmentedButtonRenderer'],function(l,C,E,I,R,L,a,S){"use strict";var c=C.extend("sap.m.SegmentedButton",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.m.IOverflowToolbarContent"],library:"sap.m",designtime:"sap/m/designtime/SegmentedButton.designtime",publicMethods:["createButton"],properties:{width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},selectedKey:{type:"string",group:"Data",defaultValue:"",bindable:"bindable"}},defaultAggregation:"buttons",aggregations:{buttons:{type:"sap.m.Button",multiple:true,singularName:"button"},items:{type:"sap.m.SegmentedButtonItem",multiple:true,singularName:"item",bindable:"bindable"},_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"}},associations:{selectedButton:{deprecated:true,type:"sap.m.Button",multiple:false},selectedItem:{type:"sap.m.SegmentedButtonItem",multiple:false},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{deprecated:true,parameters:{button:{type:"sap.m.Button"},id:{type:"string"},key:{type:"string"}}},selectionChange:{parameters:{item:{type:"sap.m.SegmentedButtonItem"}}}},dnd:{draggable:true,droppable:false}}});E.call(c.prototype);c.prototype.init=function(){this._aWidths=[];this._oItemNavigation=new I();this._oItemNavigation.setCycling(false);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"]});this.addDelegate(this._oItemNavigation);this.removeButton=function(b){var r=c.prototype.removeButton.call(this,b);this.setSelectedButton(this.getButtons()[0]);this._fireChangeEvent();return r;};};c.prototype.onBeforeRendering=function(){var b=this._getVisibleButtons();this._bCustomButtonWidth=b.some(function(B){return B.getWidth();});if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}this.setSelectedKey(this.getProperty("selectedKey"));if(!this.getSelectedButton()){this._selectDefaultButton();}};c.prototype.onAfterRendering=function(){var b=this._getVisibleButtons(),p;if(!this._sResizeListenerId){p=this.getDomRef().parentNode;if(p){this._sResizeListenerId=R.register(p,this._handleContainerResize.bind(this));}}this._setItemNavigation();this._aWidths=this._getRenderedButtonWidths(b);this._updateWidth();};c.prototype._handleContainerResize=function(){var b=this._getVisibleButtons();this._clearAutoWidthAppliedToControl();this._aWidths=this._getRenderedButtonWidths(b);this._updateWidth();};c.prototype._clearAutoWidthAppliedToControl=function(){var b=this._getVisibleButtons(),B=b.length,o,i=0;if(!this.getWidth()){this.$().css("width","");}while(i<B){o=b[i];if(!o.getWidth()){o.$().css("width","");}i++;}};c.prototype._getRenderedButtonWidths=function(b){return b.map(function(B){var o=B.getDomRef();return o&&o.getBoundingClientRect?o.getBoundingClientRect().width:B.$().outerWidth();});};c.prototype._getButtonWidth=function(b){var B=b.length,w,n=0,s=0,d=0,p,P,i=0;if(this._bCustomButtonWidth){while(i<B){w=b[i].getWidth();if(w){if(w.indexOf("%")!==-1){s+=parseInt(w.slice(0,-1));}else{d+=parseInt(w.slice(0,-2));}}else{n++;}i++;}if(n===0){return false;}p=(100-s)/n;P=(d/n);if(p<0){p=0;}if(P<0){P=0;}if(P>0){return"calc("+p+"% - "+P+"px)";}else{return p+"%";}}else{return(100/B)+"%";}};c.prototype._updateWidth=function(){if(this.$().length===0||this.hasStyleClass("sapMSegmentedButtonNoAutoWidth")){return;}var s=this.getWidth(),b=this._getVisibleButtons(),B=b.length,m=(this._aWidths.length>0)?Math.max.apply(Math,this._aWidths):0,d=(100/B),p=this.$().parent().innerWidth(),w=this._getButtonWidth(b),e,o,i;if(!s){if((m*B)>p){this.$().css("width","100%");}else if(m>0){this.$().width((m*B)+1);}i=0;while(i<B){o=b[i];o.$().css("width",o.getWidth()?o.getWidth():w);i++;}}else if(s&&!this._bCustomButtonWidth){i=0;while(i<B){b[i].$().css("width",d+"%");i++;}}e=this.$().width();if(this._previousWidth!==undefined&&e!==this._previousWidth&&!this._bInOverflow){this.fireEvent("_containerWidthChanged");}this._previousWidth=e;};c.prototype.exit=function(){if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}this._bCustomButtonWidth=null;this._aWidths=null;};c.prototype._setItemNavigation=function(){var b,d=this.getDomRef();if(d){this._oItemNavigation.setRootDomRef(d);b=this.$().find(".sapMSegBBtn:not(.sapMSegBBtnDis)");this._oItemNavigation.setItemDomRefs(b);this._focusSelectedButton();}};c.prototype.getOverflowToolbarConfig=function(){return{canOverflow:true,listenForEvents:["select"],autoCloseEvents:["select"],noInvalidationProps:["enabled","selectedKey"],invalidationEvents:["_containerWidthChanged"],onBeforeEnterOverflow:this._onBeforeEnterOverflow,onAfterExitOverflow:this._onAfterExitOverflow};};c.prototype._onBeforeEnterOverflow=function(o){o._toSelectMode();};c.prototype._onAfterExitOverflow=function(o){o._toNormalMode();};c.prototype.createButton=function(t,u,e,T){var b=new sap.m.Button();if(t!==null){b.setText(t);}if(u!==null){b.setIcon(u);}if(e||e===undefined){b.setEnabled(true);}else{b.setEnabled(false);}if(T){b.setTextDirection(T);}this.addButton(b);return b;};(function(){c.prototype.addButton=function(b){if(b){p(b,this);this.addAggregation('buttons',b);this._syncSelect();this._fireChangeEvent();return this;}};c.prototype.insertButton=function(b,i){if(b){p(b,this);this.insertAggregation('buttons',b,i);this._syncSelect();this._fireChangeEvent();return this;}};function p(b,P){b.attachPress(function(e){P._buttonPressed(e);});b.attachEvent("_change",P._syncSelect,P);b.attachEvent("_change",P._fireChangeEvent,P);var o=sap.m.Button.prototype.setEnabled;b.setEnabled=function(e){b.$().toggleClass("sapMSegBBtnDis",!e).toggleClass("sapMFocusable",e);o.apply(b,arguments);};b.setVisible=function(v){sap.m.Button.prototype.setVisible.apply(this,arguments);P.invalidate();};}})();c.prototype.getSelectedKey=function(){var b=this.getButtons(),d=this.getItems(),s=this.getSelectedButton(),i=0;if(d.length>0){for(;i<b.length;i++){if(b[i]&&b[i].getId()===s){this.setProperty("selectedKey",d[i].getKey(),true);return d[i].getKey();}}}return"";};c.prototype.setSelectedKey=function(k){var b=this.getButtons(),d=this.getItems(),i=0;if(!k){this.setProperty("selectedKey",k,true);return this;}if(d.length>0&&b.length>0){for(;i<d.length;i++){if(d[i]&&d[i].getKey()===k){this.setSelectedItem(d[i]);break;}}}this.setProperty("selectedKey",k,true);return this;};c.prototype.removeButton=function(b){var r=this.removeAggregation("buttons",b);if(r){delete r.setEnabled;r.detachEvent("_change",this._syncSelect,this);r.detachEvent("_change",this._fireChangeEvent,this);this._syncSelect();}return r;};c.prototype.removeAllButtons=function(){var b=this.getButtons();if(b){for(var i=0;i<b.length;i++){var B=b[i];if(B){delete B.setEnabled;this.removeAggregation("buttons",B);B.detachEvent("_change",this._syncSelect,this);B.detachEvent("_change",this._fireChangeEvent,this);}}this._syncSelect();}return b;};c.prototype.addItem=function(i){this.addAggregation("items",i);this.addButton(i.oButton);return this;};c.prototype.removeItem=function(i){var r;if(i!==null&&i!==undefined){r=this.removeAggregation("items",i);this.removeButton(i.oButton);}if(i&&i instanceof sap.m.SegmentedButtonItem&&this.getSelectedButton()===i.oButton.getId()){this.setSelectedKey("");this.setSelectedButton("");this.setSelectedItem("");}this.setSelectedItem(this.getItems()[0]);return r;};c.prototype.insertItem=function(i,b){this.insertAggregation("items",i,b);this.insertButton(i.oButton,b);return this;};c.prototype.removeAllItems=function(s){var r=this.removeAllAggregation("items",s);this.removeAllButtons();this.setSelectedKey("");this.setSelectedButton("");this.setSelectedItem("");return r;};c.prototype._buttonPressed=function(e){var b=e.getSource(),i;if(this.getSelectedButton()!==b.getId()){this.getButtons().forEach(function(B){B.$().removeClass("sapMSegBBtnSel");B.$().attr("aria-checked",false);});i=this.getItems().filter(function(o){return o.oButton===b;})[0];b.$().addClass("sapMSegBBtnSel");b.$().attr("aria-checked",true);this.setAssociation('selectedButton',b,true);this.setProperty("selectedKey",this.getSelectedKey(),true);this.setAssociation('selectedItem',i,true);this.fireSelectionChange({item:i});this.fireSelect({button:b,id:b.getId(),key:this.getSelectedKey()});}};c.prototype._selectDefaultButton=function(){var b=this._getVisibleButtons();if(b.length>0){this.setAssociation('selectedButton',b[0],true);if(this.getItems().length>0){this.setAssociation('selectedItem',this.getItems()[0],true);}}};c.prototype.setSelectedButton=function(b){var s=this.getSelectedButton(),o,B=this.getButtons();this.setAssociation("selectedButton",b,true);if(s!==this.getSelectedButton()){if(this.$().length){if(!this.getSelectedButton()&&B.length>1){this._selectDefaultButton();}o=sap.ui.getCore().byId(this.getSelectedButton());B.forEach(function(d){d.$().removeClass("sapMSegBBtnSel");d.$().attr("aria-checked",false);});if(o){o.$().addClass("sapMSegBBtnSel");o.$().attr("aria-checked",true);}this._focusSelectedButton();}}this._syncSelect();return this;};c.prototype.setSelectedItem=function(i){var o=typeof i==="string"&&i!==""?sap.ui.getCore().byId(i):i,b=o instanceof sap.m.SegmentedButtonItem,B=b?o.oButton:i;this.setAssociation("selectedItem",i,true);this.setSelectedButton(B);return this;};c.prototype._focusSelectedButton=function(){var b=this.getButtons(),s=this.getSelectedButton(),i=0;for(;i<b.length;i++){if(b[i]&&b[i].getId()===s){this._oItemNavigation&&this._oItemNavigation.setFocusedIndex(i);break;}}};c.prototype.onsappagedown=function(e){this._oItemNavigation.onsapend(e);};c.prototype.onsappageup=function(e){this._oItemNavigation.onsaphome(e);};c.prototype.onsapspace=function(e){e.preventDefault();};c.prototype._lazyLoadSelectForm=function(){var s=this.getAggregation("_select");if(!s){s=new sap.m.Select(this.getId()+"-select");s.attachChange(this._selectChangeHandler,this);s.addStyleClass("sapMSegBSelectWrapper");this.setAggregation("_select",s,true);}};c.prototype._selectChangeHandler=function(e){var s=e.getParameter("selectedItem"),n=parseInt(s.getKey()),b=this.getButtons()[n],B=b.getId();b.firePress();this.setSelectedButton(B);};c.prototype._fireChangeEvent=function(){this.fireEvent("_change");};c.prototype._syncSelect=function(){var k=0,s=0,b,B,o=this.getAggregation("_select");if(!o){return;}o.destroyItems();this._getVisibleButtons().forEach(function(d){b=d.getText();B=d.getIcon();o.addItem(new L({key:k.toString(),icon:B?B:"",text:b?b:d.getTooltip_AsString(),enabled:d.getEnabled()}));if(d.getId()===this.getSelectedButton()){s=k;}k++;},this);o.setSelectedKey(s.toString());};c.prototype._toSelectMode=function(){this._bInOverflow=true;this.addStyleClass("sapMSegBSelectWrapper");this._lazyLoadSelectForm();this._syncSelect();};c.prototype._toNormalMode=function(){delete this._bInOverflow;this.removeStyleClass("sapMSegBSelectWrapper");};c.prototype._overwriteImageOnload=function(i){var t=this;if(i.onload===sap.m.Image.prototype.onload){i.onload=function(){if(sap.m.Image.prototype.onload){sap.m.Image.prototype.onload.apply(this,arguments);}window.setTimeout(function(){t._updateWidth();},20);};}};c.prototype._getIconAriaLabel=function(i){var o=a.getIconInfo(i.getSrc()),r="";if(o&&o.name){r=o.name;}return r;};c.prototype._getVisibleButtons=function(){return this.getButtons().filter(function(b){return b.getVisible();});};c.prototype.clone=function(){var s=this.getSelectedButton(),B=this.removeAllAggregation("buttons"),o=C.prototype.clone.apply(this,arguments),d=B.map(function(b){return b.getId();}).indexOf(s),i;if(d>-1){o.setSelectedButton(o.getButtons()[d]);}for(i=0;i<B.length;i++){this.addAggregation("buttons",B[i]);}return o;};return c;});
