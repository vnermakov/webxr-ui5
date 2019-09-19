/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/fl/changeHandler/Base','sap/ui/core/util/reflection/JsControlTreeModifier','sap/ui/mdc/changehandler/SetFilterValue','sap/ui/mdc/changehandler/MoveSort','sap/ui/mdc/changehandler/Sort'],function(B,J,S,M,a){"use strict";return{"createItem":{layers:{USER:true},changeHandler:{createChange:function(p){if(sap.ui.getCore().byId(p.id)){return null;}var s=J.getSelector(p.id,p.appComponent);if(!s.idIsLocal){throw new Error("Invalid 'idIsLocal'. The id "+p.id+" should contain the app component id");}return{selectorControl:p.control,changeSpecificData:{changeType:"createItem",content:{selectorItem:s,key:p.key}}};},completeChangeContent:function(c,s){},applyChange:function(c,C,p){var s=c.getContent().selectorItem;return new Promise(function(r){C.getModel();sap.ui.require(['sap/ui/mdc/chart/MeasureItem','sap/ui/mdc/chart/DimensionItem',p.modifier.getProperty(C,"metadataDelegate")],function(b,D,d){if(p.modifier.bySelector(s,p.appComponent,p.view)){return r();}var k=c.getContent().key;d.fetchProperties(C.getCollectionModel(),C.getCollectionPath()).then(function(P){var m=P.filter(function(o){return o.name===k;});if(!m.length){return r();}var i=p.modifier.getControlIdBySelector(s,p.appComponent);var A=d.retrieveAggregationItem("items,",m[0]);var I=p.modifier.createControl(A.className,p.appComponent,p.view,i,A.settings);var e=p.modifier.getAggregation(C,"items");p.modifier.insertAggregation(C,"items",I,e.length);return r();});});});},revertChange:function(c,C,p){var s=c.getContent().selectorItem;var i=p.modifier.bySelector(s,p.appComponent,p.view);if(!i){return B.markAsNotApplicable("revertChange of createItem: the item with selector "+s+" is not existing and therefore can not be reverted.",true);}p.modifier.removeAggregation(C,"items",i);p.modifier.destroy(i);}}},"moveItem":{layers:{USER:true},changeHandler:{createChange:function(p){if(!p.control){throw new Error("Invalid control. The existing control object is mandatory");}if(!sap.ui.getCore().byId(p.id)){throw new Error("Invalid id. The item with the id "+p.id+" is mandatory");}var s=J.getSelector(p.id,p.appComponent);if(!s.idIsLocal){throw new Error("Invalid 'idIsLocal'. The id "+p.id+" should contain the app component id");}return{selectorControl:p.control,changeSpecificData:{changeType:"moveItem",content:{selectorItem:s,relativePosition:p.relativePosition}}};},completeChangeContent:function(c,s){},applyChange:function(c,C,p){C.getModel();var s=c.getContent().selectorItem;var i=p.modifier.bySelector(s,p.appComponent,p.view);if(!i){return B.markAsNotApplicable("applyChange of moveIem: the item with selectorItem "+s+" dose not yet exist and therefore it can not be moved.",true);}var I=p.modifier.findIndexInParentAggregation(i);if(I===c.getContent().relativePosition){return;}c.setRevertData(I);p.modifier.removeAggregation(C,"items",i);p.modifier.insertAggregation(C,"items",i,c.getContent().relativePosition);},revertChange:function(c,C,p){var s=c.getContent().selectorItem;var i=p.modifier.bySelector(s,p.appComponent,p.view);if(!i){return;}var I=p.modifier.findIndexInParentAggregation(i);if(I===c.getRevertData()){return;}p.modifier.removeAggregation(C,"items",i);p.modifier.insertAggregation(C,"items",i,c.getRevertData());c.resetRevertData();}}},"setChartType":{layers:{USER:true},changeHandler:{createChange:function(p){if(!p.control){throw new Error("Invalid control. The existing control object is mandatory");}return{selectorControl:p.control,changeSpecificData:{changeType:"setChartType",content:{chartType:p.chartType}}};},completeChangeContent:function(c,s){},applyChange:function(c,C,p){c.setRevertData(p.modifier.getProperty(C,"chartType"));p.modifier.setProperty(C,"chartType",c.getContent().chartType);},revertChange:function(c,C,p){p.modifier.setProperty(C,"chartType",c.getRevertData());c.resetRevertData();}}},"moveSort":{layers:{USER:true},changeHandler:M},"setFilterValue":{layers:{USER:true},changeHandler:S},removeSort:a.removeSort,addSort:a.addSort};},true);
