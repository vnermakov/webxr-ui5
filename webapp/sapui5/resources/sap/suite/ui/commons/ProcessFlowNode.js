/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'sap/m/Text','./library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/Device','sap/ui/core/Icon',"sap/base/Log","./ProcessFlowNodeRenderer"],function(q,T,l,C,I,D,a,L,P){"use strict";var b=C.extend("sap.suite.ui.commons.ProcessFlowNode",{metadata:{library:"sap.suite.ui.commons",properties:{title:{type:"string",group:"Misc",defaultValue:null},isTitleClickable:{type:"boolean",group:"Behavior",defaultValue:false,deprecated:true},laneId:{type:"string",group:"Misc",defaultValue:null},nodeId:{type:"string",group:"Misc",defaultValue:null},state:{type:"sap.suite.ui.commons.ProcessFlowNodeState",group:"Appearance",defaultValue:"Neutral"},type:{type:"sap.suite.ui.commons.ProcessFlowNodeType",group:"Appearance",defaultValue:"Single"},children:{type:"any[]",group:"Misc",defaultValue:null},titleAbbreviation:{type:"string",group:"Data",defaultValue:null},stateText:{type:"string",group:"Data",defaultValue:null},texts:{type:"string[]",group:"Misc",defaultValue:null},highlighted:{type:"boolean",group:"Appearance",defaultValue:false},focused:{type:"boolean",group:"Appearance",defaultValue:false},tag:{type:"object",group:"Misc",defaultValue:null},selected:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{zoomLevelOneContent:{type:"sap.ui.core.Control",multiple:false,group:"Misc"},zoomLevelTwoContent:{type:"sap.ui.core.Control",multiple:false,group:"Misc"},zoomLevelThreeContent:{type:"sap.ui.core.Control",multiple:false,group:"Misc"},zoomLevelFourContent:{type:"sap.ui.core.Control",multiple:false,group:"Misc"}},associations:{parents:{type:"sap.suite.ui.commons.ProcessFlowNode",multiple:true,singularName:"parent"}},events:{titlePress:{deprecated:true,parameters:{oEvent:{type:"object"}}},press:{parameters:{oEvent:{type:"object"}}}}}});b.prototype._zoomLevel=l.ProcessFlowZoomLevel.Two;b.prototype._tag=null;b.prototype._displayState=l.ProcessFlowDisplayState.Regular;b.prototype._oResBundle=null;b.prototype._mergedLaneId=null;b.prototype._foldedCorner=false;b.prototype._foldedCornerControl=null;b.prototype._parent=null;b.prototype._headerControl=null;b.prototype._stateTextControl=null;b.prototype._iconControl=null;b.prototype._text1Control=null;b.prototype._text2Control=null;b.prototype._navigationFocus=false;b.prototype._sMouseEvents=" mousedown mouseup mouseenter mouseleave ";b.prototype._sMouseTouchEvents=D.support.touch?'saptouchstart saptouchcancel touchstart touchend':'';if(D.browser.msie){b.prototype._grabCursorClass="sapSuiteUiGrabCursorIEPF";b.prototype._grabbingCursorClass="sapSuiteUiGrabbingCursorIEPF";}else{b.prototype._grabCursorClass="sapSuiteUiGrabCursorPF";b.prototype._grabbingCursorClass="sapSuiteUiGrabbingCursorPF";}b.prototype._nodeHoverClass="sapSuiteUiCommonsProcessFlowNodeHover";b.prototype._nodeActiveClass="sapSuiteUiCommonsProcessFlowNodeActive";b.prototype._nodePlannedClass="sapSuiteUiCommonsProcessFlowNodeStatePlanned";b.prototype._nodePlannedClassIdentifier="."+b.prototype._nodePlannedClass;b.prototype._nodeFCHoverClass="sapSuiteUiCommonsProcessFlowFoldedCornerNodeHover";b.prototype._nodeFCActiveClass="sapSuiteUiCommonsProcessFlowFoldedCornerNodeActive";b.prototype._nodeFCIconHoverClass="sapSuiteUiCommonsProcessFlowFoldedCornerNodeIconHover";b.prototype._nodeAggregatedClass="sapSuiteUiCommonsProcessFlowNodeAggregated";b.prototype._nodeAggregatedHoveredClass="sapSuiteUiCommonsProcessFlowNodeAggregatedHovered";b.prototype._nodeAggregatedDimmedClass="sapSuiteUiCommonsProcessFlowNodeAggregatedDimmed";b.prototype._nodeAggregatedFocusedClass="sapSuiteUiCommonsProcessFlowNodeAggregatedFocused";b.prototype._nodeAggregatedPressedClass="sapSuiteUiCommonsProcessFlowNodeAggregatedPressed";b.prototype._nodeAggregatedDimmedPressedClass="sapSuiteUiCommonsProcessFlowNodeAggregatedDimmedPressed";b.prototype._nodeAggregatedDimmedHoveredClass="sapSuiteUiCommonsProcessFlowNodeAggregatedDimmedHovered";b.prototype._nodeAggregatedClassZoomLevel4="sapSuiteUiCommonsProcessFlowNodeAggregatedZoomLevel4";b.prototype._nodeAggregatedHoveredClassZoomLevel4="sapSuiteUiCommonsProcessFlowNodeAggregatedHoveredZoomLevel4";b.prototype._nodeAggregatedPressedClassZoomLevel4="sapSuiteUiCommonsProcessFlowNodeAggregatedPressedZoomLevel4";b.prototype._nodeAggregatedDimmedClassZoomLevel4="sapSuiteUiCommonsProcessFlowNodeAggregatedDimmedZoomLevel4";b.prototype._nodeAggregatedFocusedClassZoomLevel4="sapSuiteUiCommonsProcessFlowNodeAggregatedFocusedZoomLevel4";b.prototype._nodeAggregatedDimmedPressedClassZoomLevel4="sapSuiteUiCommonsProcessFlowNodeAggregatedDimmedPressedZoomLevel4";b.prototype._nodeAggregatedDimmedHoveredClassZoomLevel4="sapSuiteUiCommonsProcessFlowNodeAggregatedDimmedHoveredZoomLevel4";b.prototype.init=function(){I.addIcon("context-menu","businessSuite","PFBusinessSuiteInAppSymbols","e02b",true);if(!this._oResBundle){this._oResBundle=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");}};b.prototype.exit=function(){if(this._foldedCornerControl){this._foldedCornerControl.destroy();this._foldedCornerControl=null;}if(this._headerControl){this._headerControl.destroy();this._headerControl=null;}if(this._stateTextControl){this._stateTextControl.destroy();this._stateTextControl=null;}if(this._iconControl){this._iconControl.destroy();this._iconControl=null;}if(this._text1Control){this._text1Control.destroy();this._text1Control=null;}if(this._text2Control){this._text2Control.destroy();this._text2Control=null;}this.$().unbind(this._sMouseEvents,this._handleEvents);if(D.support.touch){this.$().unbind(this._sMouseTouchEvents,this._handleEvents);}};b.prototype.onBeforeRendering=function(){this.$().unbind(this._sMouseEvents,this._handleEvents);if(D.support.touch){this.$().unbind(this._sMouseTouchEvents,this._handleEvents);}};b.prototype.onAfterRendering=function(){this._sMouseEvents=this._sMouseEvents.concat(' ',this._sMouseTouchEvents);this.$().bind(this._sMouseEvents,q.proxy(this._handleEvents,this));};b.prototype._handleClick=function(e){if(this._parent&&this._parent._bHighlightedMode&&this._getDisplayState()===l.ProcessFlowDisplayState.Dimmed||this._getDisplayState()===l.ProcessFlowDisplayState.DimmedFocused){L.info("Event ignored, node in dimmed state.");}else if(this._parent){if(e.target.id.indexOf("title")>=0&&this.getIsTitleClickable()){this._parent.fireNodeTitlePress(this);}else{this._parent.fireNodePress(this);}this.getParent()._changeNavigationFocus(this.getParent()._getLastNavigationFocusElement(),this);}if(e&&!e.isPropagationStopped()){e.stopPropagation();}if(e&&!e.isImmediatePropagationStopped()){e.stopImmediatePropagation();}};b.prototype.onclick=function(e){if(e&&!e.isDefaultPrevented()){e.preventDefault();}this._handleClick(e);};b.prototype._handleEvents=function(e){var t=this.$().find('*');var $=this.$().attr('id');var i=this._getFoldedCorner();var s=this.getParent();if(e&&!e.isDefaultPrevented()){e.preventDefault();}if(this._parent&&this._parent._bHighlightedMode&&this._getDimmed()){return;}if(this.getType()===l.ProcessFlowNodeType.Aggregated){this._adjustClassesForAggregation(e);}var p=sap.ui.require("sap/suite/ui/commons/ProcessFlow");if(!p){return;}switch(e.type){case p._mouseEvents.mouseDown:case"keydown":this.$().removeClass(this._nodeHoverClass).addClass(this._nodeActiveClass);t.removeClass(this._nodeHoverClass).addClass(this._nodeActiveClass);if(i){q('#'+$).removeClass(this._nodeFCHoverClass+' '+this._nodeActiveClass).addClass(this._nodeFCActiveClass);q('div[id^='+$+'][id$=-corner-container]').removeClass(this._nodeFCIconHoverClass+' '+this._nodeActiveClass).addClass(this._nodeFCActiveClass);q('span[id^='+$+'][id$=-corner-icon]').removeClass(this._nodeFCIconHoverClass+' '+this._nodeActiveClass).addClass(this._nodeFCActiveClass);}break;case p._mouseEvents.mouseUp:if(s.$().hasClass(this._grabbingCursorClass)){s.$().removeClass(this._grabbingCursorClass);}this.$().removeClass(this._nodeActiveClass).addClass(this._nodeHoverClass);t.removeClass(this._nodeActiveClass).addClass(this._nodeHoverClass);if(i){q('#'+$).removeClass(this._nodeHoverClass+' '+this._nodeFCActiveClass).addClass(this._nodeFCHoverClass);q('div[id^='+$+'][id$=-corner-container]').removeClass(this._nodeHoverClass+' '+this._nodeFCActiveClass).addClass(this._nodeFCIconHoverClass);q('span[id^='+$+'][id$=-corner-icon]').removeClass(this._nodeHoverClass+' '+this._nodeFCActiveClass).addClass(this._nodeFCIconHoverClass);}break;case p._mouseEvents.mouseEnter:if(!s.$().hasClass(this._grabbingCursorClass)){this.$().addClass(this._nodeHoverClass);t.addClass(this._nodeHoverClass);this.$().find(this._nodePlannedClassIdentifier).find("*").addClass(this._nodePlannedClass);if(i){q('#'+$).removeClass(this._nodeHoverClass).addClass(this._nodeFCHoverClass);q('div[id^='+$+'][id$=-corner-container]').removeClass(this._nodeHoverClass).addClass(this._nodeFCIconHoverClass);q('span[id^='+$+'][id$=-corner-icon]').removeClass(this._nodeHoverClass).addClass(this._nodeFCIconHoverClass);}}break;case p._mouseEvents.mouseLeave:case"keyup":this.$().removeClass(this._nodeActiveClass+' '+this._nodeHoverClass);t.removeClass(this._nodeActiveClass+' '+this._nodeHoverClass);if(i){q('#'+$).removeClass(this._nodeFCActiveClass+' '+this._nodeFCHoverClass);q('div[id^='+$+'][id$=-corner-container]').removeClass(this._nodeFCActiveClass+' '+this._nodeFCIconHoverClass);q('span[id^='+$+'][id$=-corner-icon]').removeClass(this._nodeFCActiveClass+' '+this._nodeFCIconHoverClass);}if(!s.$().hasClass(this._grabbingCursorClass)){s.$().addClass(this._grabCursorClass);}break;case p._mouseEvents.touchStart:if(D.support.touch){this.$().addClass(this._nodeActiveClass);t.addClass(this._nodeActiveClass);if(i){q('#'+$).removeClass(this._nodeActiveClass).addClass(this._nodeFCActiveClass);q('div[id^='+$+'][id$=-corner-container]').removeClass(this._nodeActiveClass).addClass(this._nodeFCActiveClass);q('span[id^='+$+'][id$=-corner-icon]').removeClass(this._nodeActiveClass).addClass(this._nodeFCActiveClass);}}break;case p._mouseEvents.sapTouchStart:this.$().removeClass(this._nodeHoverClass).addClass(this._nodeActiveClass);t.removeClass(this._nodeHoverClass).addClass(this._nodeActiveClass);if(i){q('#'+$).removeClass(this._nodeFCHoverClass+' '+this._nodeActiveClass).addClass(this._nodeFCActiveClass);q('div[id^='+$+'][id$=-corner-container]').removeClass(this._nodeFCIconHoverClass+' '+this._nodeActiveClass).addClass(this._nodeFCActiveClass);q('span[id^='+$+'][id$=-corner-icon]').removeClass(this._nodeFCIconHoverClass+' '+this._nodeActiveClass).addClass(this._nodeFCActiveClass);}break;case p._mouseEvents.touchEnd:if(D.support.touch){this.$().removeClass(this._nodeActiveClass+' '+this._nodeHoverClass);t.removeClass(this._nodeActiveClass+' '+this._nodeHoverClass);if(i){q('#'+$).removeClass(this._nodeFCActiveClass+' '+this._nodeFCHoverClass);q('div[id^='+$+'][id$=-corner-container]').removeClass(this._nodeFCActiveClass+' '+this._nodeFCIconHoverClass);q('span[id^='+$+'][id$=-corner-icon]').removeClass(this._nodeFCActiveClass+' '+this._nodeFCIconHoverClass);}}this._handleClick(e);break;case p._mouseEvents.sapTouchCancel:this.$().removeClass(this._nodeActiveClass).addClass(this._nodeHoverClass);t.removeClass(this._nodeActiveClass).addClass(this._nodeHoverClass);if(i){q('#'+$).removeClass(this._nodeFCActiveClass+' '+this._nodeHoverClass).addClass(this._nodeFCHoverClass);q('div[id^='+$+'][id$=-corner-container]').removeClass(this._nodeFCActiveClass+' '+this._nodeHoverClass).addClass(this._nodeFCIconHoverClass);q('span[id^='+$+'][id$=-corner-icon]').removeClass(this._nodeFCActiveClass+' '+this._nodeHoverClass).addClass(this._nodeFCIconHoverClass);}break;default:break;}};b.prototype._setMergedLaneId=function(c){this._mergedLaneId=c;};b.prototype._setParentFlow=function(c){this._parent=c;};b.prototype._getFoldedCornerControl=function(){if(this._foldedCornerControl){this._foldedCornerControl.destroy();}this._foldedCornerControl=new a({id:this.getId()+"-corner-icon",src:I.getIconURI("context-menu","businessSuite"),visible:true});if(this._parent&&!this._parent._bHighlightedMode||!this._getDimmed()){this._foldedCornerControl.addStyleClass("sapUiIconPointer");}switch(this._getZoomLevel()){case l.ProcessFlowZoomLevel.One:this._foldedCornerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode1ZoomLevel1");break;case l.ProcessFlowZoomLevel.Two:this._foldedCornerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode1ZoomLevel2");break;case l.ProcessFlowZoomLevel.Three:this._foldedCornerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode1ZoomLevel3");break;case l.ProcessFlowZoomLevel.Four:this._foldedCornerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode1ZoomLevel4");break;default:break;}this._foldedCornerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode1");return this._foldedCornerControl;};b.prototype._getHeaderControl=function(){if(this._headerControl){this._headerControl.destroy();}var i=0;var w="";var v=true;var t=this.getTitle();switch(this._getZoomLevel()){case l.ProcessFlowZoomLevel.One:i=3;break;case l.ProcessFlowZoomLevel.Two:i=3;break;case l.ProcessFlowZoomLevel.Three:i=2;t=this.getTitleAbbreviation();break;case l.ProcessFlowZoomLevel.Four:t="";i=0;w="0px";v=false;break;default:break;}this._headerControl=new T({id:this.getId()+"-nodeid-anchor-title",text:t,visible:v,wrapping:true,width:w,maxLines:i});if(this.getIsTitleClickable()){this._headerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TitleClickable");}switch(this._getZoomLevel()){case l.ProcessFlowZoomLevel.One:this._headerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TitleZoomLevel1");break;case l.ProcessFlowZoomLevel.Two:this._headerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TitleZoomLevel2");break;case l.ProcessFlowZoomLevel.Three:this._headerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TitleZoomLevel3");break;case l.ProcessFlowZoomLevel.Four:this._headerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TitleZoomLevel4");break;default:break;}this._headerControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3Title");return this._headerControl;};b.prototype._getIconControl=function(){if(this._iconControl){this._iconControl.destroy();}var s=null;var v=true;switch(this.getState()){case l.ProcessFlowNodeState.Positive:s="sap-icon://message-success";break;case l.ProcessFlowNodeState.Negative:case l.ProcessFlowNodeState.PlannedNegative:s="sap-icon://message-error";break;case l.ProcessFlowNodeState.Planned:s=null;break;case l.ProcessFlowNodeState.Neutral:s="sap-icon://process";break;case l.ProcessFlowNodeState.Critical:s="sap-icon://message-warning";break;default:break;}this._iconControl=new a({id:this.getId()+"-icon",src:s,visible:v});if(this._parent&&!this._parent._bHighlightedMode||!this._getDimmed()){this._iconControl.addStyleClass("sapUiIconPointer");}var r=sap.ui.getCore().getConfiguration().getRTL();if(r){this._iconControl.addStyleClass("sapUiIconSuppressMirrorInRTL");}switch(this._getZoomLevel()){case l.ProcessFlowZoomLevel.One:case l.ProcessFlowZoomLevel.Two:var i="sapSuiteUiCommonsProcessFlowNode3StateIconLeft";if(r){i="sapSuiteUiCommonsProcessFlowNode3StateIconRight";}this._iconControl.addStyleClass(i);break;case l.ProcessFlowZoomLevel.Three:case l.ProcessFlowZoomLevel.Four:this._iconControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateIconCenter");break;default:break;}switch(this._getZoomLevel()){case l.ProcessFlowZoomLevel.One:this._iconControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateIconZoomLevel1");break;case l.ProcessFlowZoomLevel.Two:this._iconControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateIconZoomLevel2");break;case l.ProcessFlowZoomLevel.Three:this._iconControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateIconZoomLevel3");break;case l.ProcessFlowZoomLevel.Four:this._iconControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateIconZoomLevel4");break;default:break;}this._iconControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateIcon");return this._iconControl;};b.prototype._getStateTextControl=function(){if(this._stateTextControl){this._stateTextControl.destroy();}var i=2;var w="";var v=true;var s=this.getState();var t=(s===l.ProcessFlowNodeState.Planned)?"":this.getStateText();if(s===l.ProcessFlowNodeState.PlannedNegative&&t.length===0){t="Planned Negative";}switch(this._getZoomLevel()){case l.ProcessFlowZoomLevel.One:case l.ProcessFlowZoomLevel.Two:case l.ProcessFlowZoomLevel.Three:i=2;break;case l.ProcessFlowZoomLevel.Four:t="";i=0;w="0px";v=false;break;default:break;}this._stateTextControl=new T({id:this.getId()+"-stateText",text:t,visible:v,wrapping:true,width:w,maxLines:i});switch(s){case l.ProcessFlowNodeState.Positive:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StatePositive");break;case l.ProcessFlowNodeState.Negative:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNodeStateNegative");break;case l.ProcessFlowNodeState.Planned:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StatePlanned");break;case l.ProcessFlowNodeState.Neutral:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateNeutral");break;case l.ProcessFlowNodeState.PlannedNegative:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StatePlanned");break;case l.ProcessFlowNodeState.Critical:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateCritical");break;default:break;}switch(this._getZoomLevel()){case l.ProcessFlowZoomLevel.One:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateTextZoomLevel1");break;case l.ProcessFlowZoomLevel.Two:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateTextZoomLevel2");break;case l.ProcessFlowZoomLevel.Three:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateTextZoomLevel3");break;case l.ProcessFlowZoomLevel.Four:this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateTextZoomLevel4");break;default:break;}this._stateTextControl.addStyleClass("sapSuiteUiCommonsProcessFlowNode3StateText");return this._stateTextControl;};b.prototype._getZoomLevel=function(){return this._zoomLevel;};b.prototype._setZoomLevel=function(z){this._zoomLevel=z;};b.prototype._setNavigationFocus=function(n){this._navigationFocus=n;};b.prototype._getNavigationFocus=function(){return this._navigationFocus;};b.prototype._setFoldedCorner=function(f){this._foldedCorner=f;};b.prototype._getFoldedCorner=function(){return this._foldedCorner;};b.prototype._setTag=function(n){this._tag=n;};b.prototype._getTag=function(){return this._tag;};b.prototype._setDimmedState=function(){var i=this.getFocused();var c=this.getHighlighted();var d=this.getSelected();if(c||d){throw new Error("Cannot set highlighed or selected node to dimmed state"+this.getNodeId());}this._displayState=l.ProcessFlowDisplayState.Dimmed;if(i){this._displayState=l.ProcessFlowDisplayState.DimmedFocused;}};b.prototype._setRegularState=function(){this._displayState=l.ProcessFlowDisplayState.Regular;};b.prototype._getLane=function(){var p=this.getParent();var o=null;if(p){o=p._getLane(this.getLaneId());}return o;};b.prototype._getDimmed=function(){return this._displayState===l.ProcessFlowDisplayState.Dimmed||this._displayState===l.ProcessFlowDisplayState.DimmedFocused;};b.prototype._getAriaText=function(){var p=this.getParents().length;var c=this._getCurrentZoomLevelContent();var d=0;if(this._hasChildren()){d=this.getChildren().length;}var s="";var o=this._getLane();if(o){s=o.getText();if(!s){s=this._oResBundle.getText('PF_VALUE_UNDEFINED');}}var e="";var f=this.getTexts();if(f){for(var i in f){if(f[i]){var v=f[i].concat(", ");e=e.concat(v);}}e=e.slice(0,-1);}var t=this.getTitle();if(!t&&!c){t=this._oResBundle.getText('PF_VALUE_UNDEFINED');}var S=this.getState();if(!S){S=this._oResBundle.getText('PF_VALUE_UNDEFINED');}var g=this.getStateText();if(this.getState()===l.ProcessFlowNodeState.Planned){g="";}var A="";if(this.getType()===l.ProcessFlowNodeType.Aggregated){A=this._oResBundle.getText("PF_ARIA_TYPE");}return this._oResBundle.getText('PF_ARIA_NODE',[t,S,g,s,e,p,d,A]);};b.prototype._getDisplayState=function(){var i=this.getFocused();var c=this.getHighlighted();var d=this.getSelected();if(this._displayState===l.ProcessFlowDisplayState.Dimmed||this._displayState===l.ProcessFlowDisplayState.DimmedFocused){return this._displayState;}if(d){if(c){if(i){this._displayState=l.ProcessFlowDisplayState.SelectedHighlightedFocused;}else{this._displayState=l.ProcessFlowDisplayState.SelectedHighlighted;}}else if(i){this._displayState=l.ProcessFlowDisplayState.SelectedFocused;}else{this._displayState=l.ProcessFlowDisplayState.Selected;}}else if(i&&c){this._displayState=l.ProcessFlowDisplayState.HighlightedFocused;}else if(i){this._displayState=l.ProcessFlowDisplayState.RegularFocused;}else if(c){this._displayState=l.ProcessFlowDisplayState.Highlighted;}else if(this._displayState===l.ProcessFlowDisplayState.HighlightedFocused||this._displayState===l.ProcessFlowDisplayState.RegularFocused||this._displayState===l.ProcessFlowDisplayState.Highlighted||this._displayState===l.ProcessFlowDisplayState.Selected){this._setRegularState();}return this._displayState;};b.prototype._createTextControlInternal=function(t,c,o){if(o){o.destroy();}var i=2;var w="";var v=true;var s=c;switch(this._getZoomLevel()){case l.ProcessFlowZoomLevel.One:case l.ProcessFlowZoomLevel.Two:i=2;break;case l.ProcessFlowZoomLevel.Three:i=0;w="0px";v=false;break;case l.ProcessFlowZoomLevel.Four:s="";i=0;w="0px";v=false;break;default:break;}if(this.getState){o=new T({id:this.getId()+t,text:s,visible:v,wrapping:true,width:w,maxLines:i});}return o;};b.prototype._createText1Control=function(){var t=this.getTexts();if(t&&t.length>0){t=t[0];}this._text1Control=this._createTextControlInternal("-text1-control",t,this._text1Control);switch(this._getZoomLevel()){case l.ProcessFlowZoomLevel.One:this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextWithGapZoomLevel1");this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel1");break;case l.ProcessFlowZoomLevel.Two:this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextWithGapZoomLevel2");this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel2");break;case l.ProcessFlowZoomLevel.Three:this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel3");break;case l.ProcessFlowZoomLevel.Four:this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel4");break;default:break;}this._text1Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3Text");return this._text1Control;};b.prototype._createText2Control=function(){var t=this.getTexts();if(t&&t.length>1){t=t[1];}else{t="";}this._text2Control=this._createTextControlInternal("-text2-control",t,this._text2Control);switch(this._getZoomLevel()){case l.ProcessFlowZoomLevel.One:this._text2Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel1");break;case l.ProcessFlowZoomLevel.Two:this._text2Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel2");break;case l.ProcessFlowZoomLevel.Three:this._text2Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel3");break;case l.ProcessFlowZoomLevel.Four:this._text2Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3TextZoomLevel4");break;default:break;}this._text2Control.addStyleClass("sapSuiteUiCommonsProcessFlowNode3Text");return this._text2Control;};b.prototype._adjustClassesForAggregation=function(e){var f=[l.ProcessFlowDisplayState.RegularFocused,l.ProcessFlowDisplayState.HighlightedFocused,l.ProcessFlowDisplayState.DimmedFocused];var d=[l.ProcessFlowDisplayState.DimmedFocused,l.ProcessFlowDisplayState.Dimmed];var p=sap.ui.require("sap/suite/ui/commons/ProcessFlow");if(!p){return;}switch(e.type){case p._mouseEvents.mouseDown:case p._mouseEvents.touchStart:case p._mouseEvents.sapTouchStart:c(this);break;case p._mouseEvents.mouseUp:r(this);break;case p._mouseEvents.sapTouchCancel:case p._mouseEvents.touchEnd:r(this);h(this);break;case p._mouseEvents.mouseEnter:g(this);break;case p._mouseEvents.mouseLeave:r(this);h(this);break;default:break;}function c(t){if(t._getZoomLevel()===l.ProcessFlowZoomLevel.Four){if(d&&(Array.prototype.indexOf.call(d,t._getDisplayState()))>=0){t.$().removeClass(t._nodeAggregatedDimmedHoveredClassZoomLevel4).addClass(t._nodeAggregatedDimmedPressedClassZoomLevel4);}else{t.$().removeClass(t._nodeAggregatedClassZoomLevel4).removeClass(t._nodeAggregatedHoveredClassZoomLevel4).addClass(t._nodeAggregatedPressedClassZoomLevel4);}}else if(d&&(Array.prototype.indexOf.call(d,t._getDisplayState()))>=0){t.$().removeClass(t._nodeAggregatedDimmedHoveredClass).addClass(t._nodeAggregatedDimmedPressedClass);}else{t.$().removeClass(t._nodeAggregatedClass).removeClass(t._nodeAggregatedHoveredClass).addClass(t._nodeAggregatedPressedClass);}}function r(t){if(f&&(Array.prototype.indexOf.call(f,t._getDisplayState()))>=0&&(t.$().hasClass(t._nodeAggregatedPressedClass)||t.$().hasClass(t._nodeAggregatedPressedClassZoomLevel4))){if(t._getZoomLevel()===l.ProcessFlowZoomLevel.Four){t.$().removeClass(t._nodeAggregatedPressedClassZoomLevel4).addClass(t._nodeAggregatedFocusedClassZoomLevel4);}else{t.$().removeClass(t._nodeAggregatedPressedClass).addClass(t._nodeAggregatedFocusedClass);}}else if(t.$().hasClass(t._nodeAggregatedDimmedPressedClass)||t.$().hasClass(t._nodeAggregatedDimmedPressedClassZoomLevel4)){if(t._getZoomLevel()===l.ProcessFlowZoomLevel.Four){t.$().removeClass(t._nodeAggregatedDimmedPressedClassZoomLevel4).addClass(t._nodeAggregatedDimmedHoveredClassZoomLevel4);}else{t.$().removeClass(t._nodeAggregatedDimmedPressedClass).addClass(t._nodeAggregatedDimmedHoveredClass);}}else if(t.$().hasClass(t._nodeAggregatedPressedClass)||t.$().hasClass(t._nodeAggregatedPressedClassZoomLevel4)){if(t._getZoomLevel()===l.ProcessFlowZoomLevel.Four){t.$().removeClass(t._nodeAggregatedPressedClassZoomLevel4).addClass(t._nodeAggregatedClassZoomLevel4);}else{t.$().removeClass(t._nodeAggregatedPressedClass).addClass(t._nodeAggregatedClass);}}}function g(t){if(d&&(Array.prototype.indexOf.call(d,t._getDisplayState()))>=0){if(t._getZoomLevel()===l.ProcessFlowZoomLevel.Four){t.$().removeClass(t._nodeAggregatedDimmedClassZoomLevel4).addClass(t._nodeAggregatedDimmedHoveredClassZoomLevel4);}else{t.$().removeClass(t._nodeAggregatedDimmedClass).addClass(t._nodeAggregatedDimmedHoveredClass);}}else if(t._getZoomLevel()===l.ProcessFlowZoomLevel.Four){t.$().addClass(t._nodeAggregatedHoveredClassZoomLevel4);}else{t.$().addClass(t._nodeAggregatedHoveredClass);}}function h(t){if(d&&(Array.prototype.indexOf.call(d,t._getDisplayState()))>=0){if(t._getZoomLevel()===l.ProcessFlowZoomLevel.Four){t.$().removeClass(t._nodeAggregatedDimmedHoveredClassZoomLevel4).addClass(t._nodeAggregatedDimmedClassZoomLevel4);}else{t.$().removeClass(t._nodeAggregatedDimmedHoveredClass).addClass(t._nodeAggregatedDimmedClass);}}else if(t._getZoomLevel()===l.ProcessFlowZoomLevel.Four){t.$().removeClass(t._nodeAggregatedHoveredClassZoomLevel4);}else{t.$().removeClass(t._nodeAggregatedHoveredClass);}}};b.prototype._hasChildren=function(){var c=this.getChildren();return c&&c.length>0;};b.prototype._hasChildrenWithNodeId=function(c){var d=this.getChildren();if(d&&d.length>0){for(var i=0;i<d.length;i++){if((typeof d[i]==='object'&&d[i].nodeId===c)||d[i]===c){return true;}}}return false;};b.prototype.getLaneId=function(){if(this._mergedLaneId){return this._mergedLaneId;}else{return this.getProperty("laneId");}};b.prototype._getCurrentZoomLevelContent=function(){var p=this.getParent();if(!p||p.getMetadata().getName()!=="sap.suite.ui.commons.ProcessFlow"){return null;}return this["getZoomLevel"+p.getZoomLevel()+"Content"]();};return b;});
