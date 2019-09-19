/*!
 * SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/core/Item','sap/ui/model/json/JSONModel'],function(I,J){"use strict";var C={showVisibilityDialog:function(s,d,D,c,f){return new Promise(function(r){var i=false;sap.ui.require(i?['sap/m/Dialog','sap/ui/mdc/base/personalization/VisibilityPanel','sap/ui/mdc/base/personalization/VisibilityPanelItem','sap/m/Button']:['sap/m/ResponsivePopover','sap/ui/mdc/base/personalization/VisibilityPanel','sap/ui/mdc/base/personalization/VisibilityPanelItem'],function(e,P,g,B){d.items.sort(function(a,b){if(a.text<b.text){return-1;}else if(a.text>b.text){return 1;}else{return 0;}});var h=d.items.filter(function(m){return!this._getArrayElementByKey(m.key,D.items);}.bind(this));Object.assign(D,{items:D.items.concat(h)});Object.assign(D,{showResetEnabled:this._isDirtyChart(d,D)});var j=new J(D);var R=[];var H=function(a){if(i){R.push(a);}else{f([a]);}};var A={showReset:false,showResetEnabled:{path:'$sapuimdcVisibilityPanel>/showResetEnabled'},items:{path:'$sapuimdcVisibilityPanel>/items',templateShareable:false,template:new g({key:"{$sapuimdcVisibilityPanel>key}",text:"{$sapuimdcVisibilityPanel>text}",tooltip:"{$sapuimdcVisibilityPanel>tooltip}",visible:"{$sapuimdcVisibilityPanel>visible}"})},initialOrderChanged:function(E){var a=j.getProperty("/items");var b=[];E.getParameter("keys").forEach(function(k){b.push(this._getArrayElementByKey(k,a));}.bind(this));j.setProperty("/items",b);}.bind(this),visibilityChanged:function(E){H({changeType:E.getParameter("visible")?"createItem":"removeItem",control:c,key:E.getParameter("key"),items:j.getProperty("/items")});},positionChanged:function(E){var a=j.getProperty("/items");var m=this._getArrayElementByKey(E.getParameter("key"),a);a.splice(a.indexOf(m),1);a.splice(E.getParameter("position"),0,m);j.setProperty("/items",a);var b=this._getVisibleItems(a).indexOf(m);if(b>-1){H({changeType:"moveItem",control:c,key:E.getParameter("key"),relativePosition:b,items:j.getProperty("/items")});}}.bind(this)};var p=new P(A);p.setModel(j,"$sapuimdcVisibilityPanel");var o=this._createDialog(e,p,i,B,R,f,j,c,"visibility.PERSONALIZATION_DIALOG_TITLE");c.addDependent(o);if(i){o.open();}else{o.openBy(s);}}.bind(this));}.bind(this));},showChartDialog:function(s,d,D,c,f){return new Promise(function(r){var i=this._isModalSwitchedOn();sap.ui.require(i?['sap/m/Dialog','sap/ui/mdc/base/personalization/ChartPanel','sap/ui/mdc/base/personalization/ChartPanelItem','sap/m/Button']:['sap/m/ResponsivePopover','sap/ui/mdc/base/personalization/ChartPanel','sap/ui/mdc/base/personalization/ChartPanelItem'],function(e,P,g,B){d.items.sort(function(a,b){if(a.text<b.text){return-1;}else if(a.text>b.text){return 1;}else{return 0;}});var h=d.items.filter(function(m){return!this._getArrayElementByKey(m.key,D.items);}.bind(this));Object.assign(D,{items:D.items.concat(h)});Object.assign(D,{showResetEnabled:this._isDirtyChart(d,D)});var j=new J(D);var R=[];var H=function(a){if(i){R.push(a);}else{f([a]);}};var A={showReset:false,showResetEnabled:{path:'$sapuimdcChartPanel>/showResetEnabled'},items:{path:'$sapuimdcChartPanel>/items',templateShareable:false,template:new g({key:"{$sapuimdcChartPanel>key}",text:"{$sapuimdcChartPanel>text}",tooltip:"{$sapuimdcChartPanel>tooltip}",visible:"{$sapuimdcChartPanel>visible}",type:"{$sapuimdcChartPanel>type}",roleKey:"{$sapuimdcChartPanel>roleKey}",availableRoles:{path:'$sapuimdcChartPanel>availableRoles',templateShareable:false,template:new I({key:"{$sapuimdcChartPanel>key}",text:"{$sapuimdcChartPanel>text}"})}})},initialOrderChanged:function(E){var a=j.getProperty("/items");var b=[];E.getParameter("keys").forEach(function(k){b.push(this._getArrayElementByKey(k,a));}.bind(this));j.setProperty("/items",b);}.bind(this),visibilityChanged:function(E){H({changeType:"hideItemOrRevealItem",control:c,key:E.getParameter("key"),visible:E.getParameter("visible"),items:j.getProperty("/items")});},roleChanged:function(E){var a=j.getProperty("/items");var m=this._getArrayElementByKey(E.getParameter("key"),a);if(this._getVisibleItems(a).indexOf(m)>-1){H({changeType:"setRole",control:c,key:E.getParameter("key"),role:E.getParameter("role"),items:j.getProperty("/items")});}}.bind(this),positionChanged:function(E){var a=j.getProperty("/items");var m=this._getArrayElementByKey(E.getParameter("key"),a);a.splice(a.indexOf(m),1);a.splice(E.getParameter("position"),0,m);j.setProperty("/items",a);var b=this._getVisibleItems(a).indexOf(m);if(b>-1){H({changeType:"moveItem",control:c,key:E.getParameter("key"),relativePosition:b,items:j.getProperty("/items")});}}.bind(this)};var p=new P(A);p.setModel(j,"$sapuimdcChartPanel");var o=this._createDialog(e,p,i,B,R,f,j,c,"chart.PERSONALIZATION_DIALOG_TITLE");c.addDependent(o);if(i){o.open();}else{o.openBy(s);}}.bind(this));}.bind(this));},showFilterDialog:function(s,d,D,m,M,c,f){return new Promise(function(r,e){var i=this._isModalSwitchedOn();sap.ui.require(i?['sap/m/Dialog','sap/ui/mdc/base/personalization/FilterPanel','sap/ui/mdc/base/personalization/FilterPanelItem','sap/m/Button']:['sap/m/ResponsivePopover','sap/ui/mdc/base/personalization/FilterPanel','sap/ui/mdc/base/personalization/FilterPanelItem'],function(g,P,h,B){d.items.sort(function(a,b){if(a.text<b.text){return-1;}else if(a.text>b.text){return 1;}else{return 0;}});var j=d.items.filter(function(a){return!this._getArrayElementByKey(a.key,D.items);}.bind(this));Object.assign(D,{items:D.items.concat(j)});Object.assign(D,{showResetEnabled:this._isDirtyFilter(d,D)});var o=new J(D);var R=[];var H=function(a){if(i){R.push(a);}else{f([a]);}};var O=function(E){var F=E.getSource();H(C.createChangeDataForSetFilterValue(F.getFieldPath(),E.getParameter("conditions"),c));};var k=function(){var n=this.oDialog;if(n){n.setModal(true);}};var l=function(){var n=this.oDialog;if(n){n.setModal(false);}};var A={showReset:false,showResetEnabled:{path:'$sapuimdcFilterPanel>/showResetEnabled'},items:{path:'$sapuimdcFilterPanel>/items',templateShareable:false,template:new h({key:"{$sapuimdcFilterPanel>key}",text:"{$sapuimdcFilterPanel>text}",tooltip:"{$sapuimdcFilterPanel>tooltip}",required:"{$sapuimdcFilterPanel>required}",controls:{path:'$sapuimdcFilterPanel>controls',templateShareable:false,factory:function(a,b){var F=b.getObject(b.getPath()).clone();F.attachChange(O,this);if(F.getFieldHelp()){var q=sap.ui.getCore().byId(F.getFieldHelp());q.attachOpen(k,this);q.attachAfterClose(l,this);}return F;}.bind(this)}})},initialOrderChanged:function(E){var a=o.getProperty("/items");var b=[];E.getParameter("keys").forEach(function(K){b.push(this._getArrayElementByKey(K,a));}.bind(this));o.setProperty("/items",b);}.bind(this),positionChanged:function(E){var a=o.getProperty("/items");var b=this._getArrayElementByKey(E.getParameter("key"),a);a.splice(a.indexOf(b),1);a.splice(E.getParameter("position"),0,b);o.setProperty("/items",a);}.bind(this)};var p=new P(A);p.setModel(o,"$sapuimdcFilterPanel");p.setModel(M,m);var n=this._createDialog(g,p,i,B,R,f,o,c,"filter.PERSONALIZATION_DIALOG_TITLE");this.oDialog=n;c.addDependent(n);if(i){n.open();}else{n.openBy(s);}}.bind(this));}.bind(this));},_createDialog:function(a,p,i,B,r,c,j,o,m){var b;var d=jQuery.extend(true,{},j.getProperty("/"));var R=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");if(!i){p.initialize();b=new a({title:R.getText(m),horizontalScrolling:false,verticalScrolling:false,contentWidth:"25rem",resizable:true,placement:"HorizontalPreferredRight",content:p});}else{p.initialize();b=new a({title:R.getText(m),horizontalScrolling:false,contentWidth:"40rem",contentHeight:"55rem",draggable:true,resizable:true,stretch:"{device>/system/phone}",afterClose:"onAfterClose",content:p,buttons:[new B({text:R.getText("p13nDialog.OK"),type:"Emphasized",press:function(){b.close();b.destroy();c(r);}}),new B({text:R.getText("p13nDialog.CANCEL"),press:function(){b.close();b.destroy();j.setProperty("/",jQuery.extend(true,{},d));r=[];}})]});}b.addStyleClass("sapUiMdcPersonalizationDialog");b.toggleStyleClass("sapUiSizeCompact",!!jQuery(o.getDomRef()).closest(".sapUiSizeCompact").length);return b;},addChange:function(a,c,o,i){return new Promise(function(r){sap.ui.getCore().loadLibrary('sap.ui.fl',{async:true}).then(function(){sap.ui.require(['sap/ui/fl/ControlPersonalizationAPI','sap/ui/fl/Utils'],function(b,U){o.view=U.getViewForControl(o.control);o.appComponent=U.getAppComponentForControl(o.control);b.addPersonalizationChanges({controlChanges:[a[c].changeHandler.createChange(o)],ignoreVariantManagement:i}).then(function(f){r(f);});});});});},addChangeHideItemOrRevealItem:function(a,b,c,i){return new Promise(function(r){sap.ui.getCore().loadLibrary('sap.ui.fl',{async:true}).then(function(){sap.ui.require(['sap/ui/fl/ControlPersonalizationAPI','sap/ui/fl/Utils'],function(d,U){var s=this._getItemId(U,c);var p=sap.ui.getCore().byId(s)?Promise.resolve([]):d.addPersonalizationChanges({controlChanges:[a.createItem.changeHandler.createChange({control:c.control,appComponent:U.getAppComponentForControl(c.control),id:s,key:c.key})],ignoreVariantManagement:i});var f=[];p.then(function(F){f=F;return d.addPersonalizationChanges({controlChanges:[b[c.visible?"revealItem":"hideItem"].changeHandler.createChange({id:s})],ignoreVariantManagement:i});}).then(function(F){r(f.concat(F));});}.bind(this));}.bind(this));}.bind(this));},addChangeSetRole:function(a,b,c,i){return new Promise(function(r){sap.ui.getCore().loadLibrary('sap.ui.fl',{async:true}).then(function(){sap.ui.require(['sap/ui/fl/ControlPersonalizationAPI','sap/ui/fl/Utils'],function(d,U){var s=this._getItemId(U,c);var p=sap.ui.getCore().byId(s)?Promise.resolve([]):d.addPersonalizationChanges({controlChanges:[a.createItem.changeHandler.createChange({control:c.control,appComponent:U.getAppComponentForControl(c.control),id:s,key:c.key})],ignoreVariantManagement:i});var f=[];p.then(function(F){f=F;return d.addPersonalizationChanges({controlChanges:[b["setRole"].changeHandler.createChange({id:s,role:c.role})],ignoreVariantManagement:i});}).then(function(F){r(f.concat(F));});}.bind(this));}.bind(this));}.bind(this));},addChangeMoveItem:function(a,b,c,i){return new Promise(function(r){sap.ui.getCore().loadLibrary('sap.ui.fl',{async:true}).then(function(){sap.ui.require(['sap/ui/fl/ControlPersonalizationAPI','sap/ui/fl/Utils'],function(d,U){var s=this._getItemId(U,c);var p=sap.ui.getCore().byId(s)?Promise.resolve([]):d.addPersonalizationChanges({controlChanges:[a.createItem.changeHandler.createChange({control:c.control,appComponent:U.getAppComponentForControl(c.control),id:s,key:c.key})],ignoreVariantManagement:i});var f=[];p.then(function(F){f=F;return d.addPersonalizationChanges({controlChanges:[a["moveItem"].changeHandler.createChange({control:c.control,appComponent:U.getAppComponentForControl(c.control),id:s,relativePosition:c.relativePosition})],ignoreVariantManagement:i});}).then(function(F){r(f.concat(F));});}.bind(this));}.bind(this));}.bind(this));},createChangeDataForSetChartType:function(c,o){return{control:o,chartType:c};},createChangeDataForSetFilterValue:function(k,c,o){return{changeType:"setFilterValue",control:o,key:k,conditions:c};},saveChanges:function(f,c){return new Promise(function(r){sap.ui.getCore().loadLibrary('sap.ui.fl',{async:true}).then(function(){sap.ui.require(['sap/ui/fl/ControlPersonalizationAPI','sap/ui/fl/Utils'],function(a,U){var A=U.getAppComponentForControl(c);a.saveChanges(f,A).then(function(f){r();});});});});},_createItem:function(a,U,i,c,b,f){var A=U.getAppComponentForControl(c.control);if(sap.ui.getCore().byId(i)){return Promise.resolve([]);}return a.addPersonalizationChanges({controlChanges:[f({control:c.control,appComponent:A,id:i,key:c.key})],ignoreVariantManagement:b});},_getItemId:function(U,c){var v=U.getViewForControl(c.control);return this._getArrayElementByKey(c.key,c.items).id||v.createId(c.control.getId()+c.key);},_isModalSwitchedOn:function(){return jQuery.sap.getUriParameters().get("P13nModal")==="true";},_getArrayElementByKey:function(k,a){var e=a.filter(function(E){return E.key!==undefined&&E.key===k;});return e.length?e[0]:null;},_getSelectedItems:function(m){return m.filter(function(M){return M.selected;});},_getVisibleItems:function(m){return m.filter(function(M){return M.visible;});},_isDirtyChart:function(d,D){var i=function(a,b){if(a.length!==b.length){return false;}var c=a.filter(function(o,e){return o.key!==b[e].key||o.visible!==b[e].visible||o.role!==b[e].role;});return c.maxLength===0;};return(d.chartType!==D.chartType)||!i(D.items,d.items);},_isDirtySort:function(d,D){var i=function(a,b){if(a.length!==b.length){return false;}var c=a.filter(function(o,e){return o.key!==b[e].key||o.visible!==b[e].visible||o.role!==b[e].role;});return c.maxLength===0;};return(d.chartType!==D.chartType)||!i(D.items,d.items);},_isDirtyFilter:function(d,D){return false;}};return C;},true);
