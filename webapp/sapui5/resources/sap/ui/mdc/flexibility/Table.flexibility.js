/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/mdc/changehandler/Sort'],function(S){"use strict";var r=function(c){clearTimeout(r.iTimer);r.iTimer=setTimeout(function(){if(c&&c.isA&&c.isA("sap.ui.mdc.Table")){c.rebindTable();}});};return{"hideControl":"default","unhideControl":"default","removeMDCColumn":{"changeHandler":{applyChange:function(c,C,p){var m=p.modifier;var o=c.getContent();var a=m.getSelector(o.id.replace("-innerColumn",""),p.appComponent);var M=m.bySelector(a,p.appComponent,p.view);var i=m.findIndexInParentAggregation(M);m.removeAggregation(C,"columns",M);if(M.isA){m.insertAggregation(C,"dependent",M);}c.setRevertData({id:o.id,preventRebind:o.preventRebind,label:m.getProperty(M,"header"),dataProperties:m.getProperty(M,"dataProperties"),controlSelector:a,index:i});},completeChangeContent:function(c,C,p){if((!c.getContent()||!c.getContent().id)&&C.removedElement){c.setContent(C.removedElement);}},revertChange:function(c,C,p){var m=p.modifier;var R=c.getRevertData();var o=R.controlSelector;var M=m.bySelector(o,p.appComponent,p.view);if(!M){M=m.createControl("sap.ui.mdc.Column",p.appComponent,p.view,R.id,{header:R.label,dataProperties:R.dataProperties});}m.insertAggregation(C,"columns",M,R.index);c.resetRevertData();if(!R.preventRebind){r(C);}}},"layers":{"USER":true}},"addMDCColumn":{"changeHandler":{applyChange:function(c,C,p){var m=p.modifier;var o=c.getContent();var i=m.getControlIdBySelector(c.getSelector(),p.appComponent)+"--"+o.name;var a=m.getSelector(i,p.appComponent);var M=m.bySelector(a,p.appComponent,p.view);if(!M){M=m.createControl("sap.ui.mdc.Column",p.appComponent,p.view,i,{header:o.label||o.name,dataProperties:[o.name]});}var b=m.getAggregation(C,"columns");var I=o.index>-1?o.index:b.length;m.insertAggregation(C,"columns",M,I);c.setRevertData({id:o.id,column:i});if(!o.preventRebind){r(C);}},completeChangeContent:function(c,C,p){},revertChange:function(c,C,p){var m=p.modifier;var R=c.getRevertData();var o=m.getSelector(R.column,p.appComponent);var M=m.bySelector(o,p.appComponent,p.view);m.removeAggregation(C,"columns",M);c.resetRevertData();}},"layers":{"USER":true}},removeSort:S.removeSort,addSort:S.addSort};},false);