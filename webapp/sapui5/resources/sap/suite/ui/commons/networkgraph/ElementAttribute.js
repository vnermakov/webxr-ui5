/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/Control","sap/m/Text","sap/suite/ui/commons/networkgraph/ElementBase"],function(C,T,E){"use strict";var a=C.extend("sap.suite.ui.commons.networkgraph.ElementAttribute",{metadata:{library:"sap.suite.ui.commons",properties:{label:{type:"string",group:"Misc",defaultValue:null},value:{type:"string",group:"Misc",defaultValue:null},labelStatus:{type:"string",group:"Misc",defaultValue:null},valueStatus:{type:"string",group:"Misc",defaultValue:null},visible:{type:"boolean",group:"Misc",defaultValue:true},icon:{type:"string",group:"Misc",defaultValue:""}}},renderer:function(r,c){r.write("<div class=\"sapSuiteUiCommonsNetworkGraphDivNodeAttributesIcons\">");if(c.getIcon()){r.write("<div id=\""+c.getId()+"-icon\" class=\"sapSuiteUiCommonsNetworkGraphDivNodeText sapSuiteUiCommonsNetworkGraphDivAttributeIcon\">"+c.getParent()._renderHtmlIcon(c.getIcon())+"</div>");}r.write("</div>");r.write("<div class=\"sapSuiteUiCommonsNetworkGraphDivNodeLabels\">");r.renderControl(c._getLabelControl());r.write("</div>");r.write("<div class=\"sapSuiteUiCommonsNetworkGraphDivNodeValues\">");r.renderControl(c._getValueControl());r.write("</div>");},onAfterRendering:function(){var p=this.getParent(),l=this.getLabelStatus()||p.getStatus(),v=this.getValueStatus()||p.getStatus();if(l){var c=p._getColor(E.ColorType.Content,l);if(c){this.$("label").css("color",c);this.$("icon").css("color",c);}}if(v){var c=p._getColor(E.ColorType.Content,v);if(c){this.$("value").css("color",c);}}}});a.prototype._getLabelControl=function(r){if(!this._oLabel){this._oLabel=new T(this.getId()+"-label",{textAlign:"Left",wrappingType:"Hyphenated"}).addStyleClass("sapSuiteUiCommonsNetworkGraphDivNodeText");}this._oLabel.setText(this.getLabel());return this._oLabel;};a.prototype._getValueControl=function(r){if(!this._oValue){this._oValue=new T(this.getId()+"-value",{textAlign:"Right",wrappingType:"Hyphenated"}).addStyleClass("sapSuiteUiCommonsNetworkGraphDivNodeText");}this._oValue.setText(this.getValue());return this._oValue;};a.prototype.exit=function(){if(this._oValue){this._oValue.destroy();this._oValue=null;}if(this._oLabel){this._oLabel.destroy();this._oLabel=null;}};a.Type=Object.freeze({Label:"Label",Value:"Value"});return a;});
