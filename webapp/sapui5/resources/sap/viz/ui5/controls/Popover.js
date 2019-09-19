/*!
 * SAPUI5

(c) Copyright 2009-2019 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/layout/Grid','sap/ui/layout/form/SimpleForm','sap/viz/library','./common/BaseControl','./chartpopover/ChartPopover',"sap/ui/thirdparty/jquery"],function(G,S,l,B,C,q){"use strict";var P=B.extend("sap.viz.ui5.controls.Popover",{metadata:{library:"sap.viz",properties:{customDataControl:{type:"any",defaultValue:null},actionItems:{type:"object[]",defaultValue:null},formatString:{type:"any",defaultValue:null},showLine:{type:"boolean",defaultValue:true}}}});P.prototype.init=function(){B.prototype.init.apply(this,arguments);this._Popover=undefined;this._uid=undefined;};P.prototype.exit=function(){B.prototype.exit.apply(this,arguments);var v=sap.ui.getCore().byId(this._uid);if(v){if(v._vizFrame){v._vizFrame.off('showTooltip');v._vizFrame.off('hideTooltip');var c=v._onConnectPopover()||{};if(c.ref===this){v._onConnectPopover(undefined);}}else{v._onConnectPopover(q.proxy(function(e){if(!v._vizFrame){return;}v._vizFrame.off('showTooltip');v._vizFrame.off('hideTooltip');},this));}}if(this._Popover){this._Popover.destroy();}this._Popover=undefined;this._uid=undefined;};P.prototype.connect=function(u){this._uid=u;if(!this._Popover){this._createPopover();}var v=sap.ui.getCore().byId(this._uid);var a=v.getUiConfig();if(!a||a.applicationSet!=='fiori'){return;}var p=this._Popover;function c(){if(!v._vizFrame){return;}v._vizFrame.off('showInstantTooltip');v._vizFrame.off('hideInstantTooltip');v._vizFrame.on('showTooltip',function(e){if(e.data.target){p.setOptions(e.data).openBy(e.data.target);}});v._vizFrame.on('hideTooltip',function(){p.close();});p.setChartType(v._vizFrame.type());p._oPopover.setOffsetX(0);p._oPopover.setOffsetY(0);}c.ref=this;if(v._vizFrame){c();}v._onConnectPopover(c);};P.prototype.close=function(){if(this._Popover){this._Popover.close();}};P.prototype.setFormatString=function(s){this.setProperty("formatString",s);if(this._Popover){this._Popover.setFormatString(s);}else{this._createPopover();}return this;};P.prototype.setCustomDataControl=function(c){this.setProperty('customDataControl',c);if(this._Popover){this._Popover.setCustomDataControl(c);}else{this._createPopover();}return this;};P.prototype.setActionItems=function(a){this.setProperty('actionItems',a);if(this._Popover){this._Popover.setActionItems(a);}else{this._createPopover();}return this;};P.prototype.setShowLine=function(i){this.setProperty('showLine',i);if(this._Popover){this._Popover.setShowLine(i);}else{this._createPopover();}return this;};P.prototype._createPopover=function(){this._Popover=new C({actionItems:this.getActionItems(),customDataControl:this.getCustomDataControl(),formatString:this.getFormatString(),showLine:this.getShowLine()});};P.prototype.addStyleClass=function(){this._Popover.addStyleClass.apply(this._Popover,arguments);};P.prototype.removeStyleClass=function(){this._Popover.removeStyleClass.apply(this._Popover,arguments);};return P;});
