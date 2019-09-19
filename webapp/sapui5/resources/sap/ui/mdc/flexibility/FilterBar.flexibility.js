/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define([],function(){"use strict";var a=function(c,C,p,n){var m=p.modifier;var o=c.getContent();var i=o.id;if(o.hasFieldHelp){var v=o.fieldHelp;if(!v){v=i+"-vh";return m.createControl("sap.ui.mdc.base.FieldValueHelp",p.appComponent,p.view,v,{title:o.label,showConditionPanel:o.fieldHelpShowConditionPanel,descriptionPath:o.fieldHelpDescriptionPath},true).then(function(V){if(V.attributes){if(!o.fieldHelpDescriptionPath){V.attributes.removeNamedItem("descriptionPath");}}return m.createControl("sap.ui.mdc.base.FilterField",p.appComponent,p.view,i,{dataType:o.type,conditions:o.path,required:o.required,label:o.label,maxConditions:o.maxConditions,fieldHelp:v},true).then(function(f){var b=o.constraints;if(b){}if(V){var d=m.getAggregation(f,"dependents");m.insertAggregation(f,"dependents",V,d.length,p.view);}var F=m.getAggregation(C,"filterItems");n=n||F.length;m.insertAggregation(C,"filterItems",f,n);return i;});});}}else{return m.createControl("sap.ui.mdc.base.FilterField",p.appComponent,p.view,i,{dataType:o.type,conditions:o.path,required:o.required,label:o.label,maxConditions:o.maxConditions},true).then(function(f){var b=o.constraints;if(b){}if(o.fieldHelp){m.setProperty(f,"fieldHelp",o.fieldHelp);}var F=m.getAggregation(C,"filterItems");n=n||F.length;m.insertAggregation(C,"filterItems",f,n);return i;});}};var A=function(c,C,o,p){if(o.applyConditionsAfterChangesApplied){o.applyConditionsAfterChangesApplied();}return new Promise(function(b){var d,e=null,m=p.modifier,f;d=m.getAggregation(o,"conditionsData",[]);d.some(function(D){if(D.getFieldPath()===C.name){e=D;}return e!==null;});if(e){m.removeAggregation(o,"conditionsData",e);if(C.index>=0){f=e.getConditions();if(C.index<f.length){f.splice(C.index,0,C.condition);}else{f=e.getConditions().concat([C.condition]);}}else{f=e.getConditions().concat([C.condition]);}e.setConditions(f);m.insertAggregation(o,"conditionsData",e,d.length?d.length-1:0);c.setRevertData({name:C.name,condition:C.condition});b();}else{m.createControl("sap.ui.mdc.base.filterbar.ConditionsData",p.appComponent,p.view,undefined,{fieldPath:C.name,conditions:C.condition?[C.condition]:null},true).then(function(g){m.insertAggregation(o,"conditionsData",g,d.length?d.length-1:0);c.setRevertData({name:C.name,condition:C.condition});b();});}});};var r=function(c,C,o,p){if(o.applyConditionsAfterChangesApplied){o.applyConditionsAfterChangesApplied();}return new Promise(function(b){sap.ui.require(['sap/ui/mdc/util/ConditionUtil'],function(d){var e,f=null,g,F=null,m=p.modifier,n;e=m.getAggregation(o,"conditionsData",[]);e.some(function(D){if(D.getFieldPath()===C.name){f=D;}return f!==null;});if(f){m.removeAggregation(o,"conditionsData",f);var h=m.getAggregation(o,"filterItems");h.some(function(i){if(i.getFieldPath()===C.name){F=i;}return F!==null;});g=f.getConditions();g.some(function(E,i){if(d.compareConditions(F,E,C.condition)){n=i;}return n>=0;});if(n>=0){g.splice(n,1);}f.setConditions(g);m.insertAggregation(o,"conditionsData",f,e.length?e.length-1:0);}c.setRevertData({name:C.name,condition:C.condition,index:n});b();});});};return{"hideControl":"default","unhideControl":"default","removeFilter":{"changeHandler":{applyChange:function(c,C,p){var m=p.modifier;var o=c.getContent();var b=m.getSelector(o.id,p.appComponent);var f=m.bySelector(b,p.appComponent,p.view);var i=m.findIndexInParentAggregation(f);m.removeAggregation(C,"filterItems",f);f.destroy();c.setRevertData({id:o.id,controlSelector:b,index:i});},completeChangeContent:function(c,C,p){},revertChange:function(c,C,p){var R=c.getRevertData();return a(c,C,p,R.index).then(function(i){c.resetRevertData();});}},"layers":{"USER":true}},"addFilter":{"changeHandler":{applyChange:function(c,C,p){return a(c,C,p).then(function(i){c.setRevertData({id:i});});},completeChangeContent:function(c,C,p){},revertChange:function(c,C,p){var m=p.modifier;var R=c.getRevertData();var o=m.getSelector(R.id,p.appComponent);var f=m.bySelector(o,p.appComponent,p.view);m.removeAggregation(C,"filterItems",f);f.destroy();c.resetRevertData();}},"layers":{"USER":true}},"setFilterPosition":{"changeHandler":{applyChange:function(c,C,p){var m=p.modifier;var o=c.getContent();var b,f=null,i;var I,n=o.position;if(o.id){b=m.getSelector(o.id,p.appComponent);f=m.bySelector(b,p.appComponent,p.view);}else if(o.name){var F=m.getAggregation(C,"filterItems",[]);F.some(function(d){i=(d.getId&&d.getId())||d.id;if(i.indexOf("--filter--"+o.name)>-1){f=d;}return f!==null;});}if(f){I=m.findIndexInParentAggregation(f);if(I!=n){m.removeAggregation(C,"filterItems",f);m.insertAggregation(C,"filterItems",f,n);}}},completeChangeContent:function(c,C,p){},revertChange:function(c,C,p){var i,o,f,m=p.modifier;var R=c.getRevertData();if(R&&R.id){o=m.getSelector(R.id,p.appComponent);f=m.bySelector(o,p.appComponent,p.view);if(f){i=m.findIndexInParentAggregation(f);if(i!=R.oldIndex){m.removeAggregation(C,"filterItems",f);m.insertAggregation(C,"filterItems",f,R.oldIndex);}}}c.resetRevertData();}},"layers":{"USER":true}},"addCondition":{"changeHandler":{applyChange:function(c,C,p){return A(c,c.getContent(),C,p);},completeChangeContent:function(c,C,p){},revertChange:function(c,C,p){return r(c,c.getRevertData(),C,p).then(function(){c.resetRevertData();});}},"layers":{"USER":true}},"removeCondition":{"changeHandler":{applyChange:function(c,C,p){return r(c,c.getContent(),C,p);},completeChangeContent:function(c,C,p){},revertChange:function(c,C,p){return A(c,c.getRevertData(),C,p).then(function(){c.resetRevertData();});}},"layers":{"USER":true}}};},false);