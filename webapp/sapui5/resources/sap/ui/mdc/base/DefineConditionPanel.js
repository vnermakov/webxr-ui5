/*!
 * SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/mdc/XMLComposite","sap/ui/mdc/base/Condition","sap/ui/model/Filter","sap/ui/base/ManagedObjectObserver","sap/m/FlexItemData","sap/base/util/merge","./type/Boolean","./type/String","./FilterOperatorConfig","./Field"],function(X,C,F,M,a,m,N,U,b,c){"use strict";var D=X.extend("sap.ui.mdc.base.DefineConditionPanel",{metadata:{properties:{conditions:{type:"object[]",group:"Data",defaultValue:[]},formatOptions:{type:"object",defaultValue:{}}},events:{}},fragment:"sap.ui.mdc.base.DefineConditionPanel",init:function(){sap.ui.getCore().getMessageManager().registerObject(this,true);this._oObserver=new M(_.bind(this));this._oObserver.observe(this,{properties:["conditions"]});var v=this.byId("defineCondition");this._oObserver.observe(v,{aggregations:["content"]});},exit:function(){sap.ui.getCore().getMessageManager().unregisterObject(this,true);this._oObserver.disconnect();this._oObserver=undefined;if(this._oDefaultType){this._oDefaultType.destroy();delete this._oDefaultType;}if(this._oFilterOperatorConfig){this._oFilterOperatorConfig.destroy();delete this._oFilterOperatorConfig;}},onBeforeRendering:function(){if(!this.oOperatorModel){var o=h.call(this);var t=j.call(this);var O=(o?o.getOperatorsForType(t):[])||[];var i=[];O.forEach(function(k){var l=o.getOperator(k);if(l.showInSuggest!==undefined&&l.showInSuggest==false){return;}var T=l.textKey||"operators."+l.name+".longText";var s=l.getTypeText(T,t.getName().toLowerCase());if(s===T){s=l.longText;}i.push({key:k,additionalText:s});},this);this.oOperatorModel=new sap.ui.model.json.JSONModel();this.oOperatorModel.setData(i);this.setModel(this.oOperatorModel,"om");}if(this.getConditions().length===0){this.updateDefineConditions();this._updateButtonVisibility();}},_updateButtonVisibility:function(o){var v=this.byId("defineCondition");if(!v){return;}var r=v.getContent();for(var i=0;i<r.length;i++){var R=r[i];var H=R.getContent()[2];var B=H.getItems()[1];B.setVisible(i===r.length-1);}},removeCondition:function(E){var s=E.oSource;var o=s.getBindingContext("$this").getObject();var i=g.call(this,o);var k=m([],this.getConditions());this._bUpdateConditionsInternal=true;k.splice(i,1);this.setConditions(k);this.updateDefineConditions();this.invalidate();},addCondition:function(E){var s=E.oSource;var o=s.getBindingContext("$this").getObject();var i=g.call(this,o);var k=this.getFormatOptions();var l=k.maxConditions;if(l==-1||i<l){this._bUpdateConditionsInternal=true;this.addDummyCondition(i+1);}},addDummyCondition:function(i){var o=h.call(this);var k=C.createCondition("EQ",[null]);C.checkIsEmpty(k,o);var l=m([],this.getConditions());if(i!==undefined){l.splice(i,0,k);}else{l.push(k);}this.setConditions(l);this._oManagedObjectModel.checkUpdate(true);this._updateButtonVisibility();},updateDefineConditions:function(){var i=this.getConditions().filter(function(o){return o.operator!=="EEQ";});if(i.length===0){this._bUpdateConditionsInternal=true;this.addDummyCondition();}},valueCtrlFactory:function(i,o){var O=h.call(this);var k=o.oModel;var p=o.sPath;var l=parseInt(p.split("/")[p.split("/").length-1]);p=p.slice(0,p.lastIndexOf("/"));p=p.slice(0,p.lastIndexOf("/"));var n=k.getProperty(p);var q=O.getOperator(n.operator);var r=j.call(this);var v=e.call(this,r,q,"$this>",l);v.addStyleClass("sapUiSmallPaddingBegin");v.setLayoutData(new a({shrinkFactor:0,growFactor:1}));if(v.attachChange){v.attachChange(this.onChange.bind(this));v.onpaste=this.onPaste.bind(this);}return v;},onChange:function(E){var o=h.call(this);C.checkIsEmpty(this.getConditions(),o);C.updateValues(this.getConditions(),o);var B=this.getBinding("conditions");if(B){if(B.getModel().isA("sap.ui.model.base.ManagedObjectModel")){B.oValue=undefined;this.updateModelProperty("conditions",this.getConditions());B.getModel().checkUpdate(true,false,function(B){return B.sPath==="/conditions";});}else{this.updateModelProperty("conditions",this.getConditions());}}},onOperatorChange:function(E){var G=E.oSource.getParent();var i=G.getContent();var H=i[1];var l=H.getBinding("items");this.onChange(E);l.checkUpdate(true);},onPaste:function(E){var o,s=E.srcControl;if(window.clipboardData){o=window.clipboardData.getData("Text");}else{o=E.originalEvent.clipboardData.getData('text/plain');}var S=o.split(/\r\n|\r|\n/g);if(S&&S.length>1){setTimeout(function(){var k=h.call(this);var t=j.call(this);var l=t.getMetadata().getName();var L=S.length;var n=m([],this.getConditions());for(var i=0;i<L;i++){if(S[i]){var v=S[i];var V=v.split(/\t/g);var O,p;if(V.length==2&&V[0]&&V[1]){O="BT";p=k.getOperator(O);}else{V=[v.trim()];O=k.getDefaultOperator(l);p=k.getOperator(O);}v=p?p.format(V):V[0];if(p){var q=p.getCondition(v,t);if(q){C.checkIsEmpty(q,k);n.push(q);}}}}this.setConditions(n);this._oManagedObjectModel.checkUpdate(true);if(s.setDOMValue){s.setDOMValue("");}}.bind(this),0);}}});function _(o){if(o.name==="content"&&o.mutation==="insert"){d.call(this,o.child);}if(o.name==="conditions"){if(this._bUpdateConditionsInternal){this._bUpdateConditionsInternal=false;return;}if(this._sConditionsTimer){clearTimeout(this._sConditionsTimer);this._sConditionsTimer=null;}this._sConditionsTimer=setTimeout(function(){this._sConditionsTimer=null;this.updateDefineConditions();this._updateButtonVisibility();}.bind(this),0);}}function d(G){var i=G.getContent();var H=i[1];var l=H.getBinding("items");l.suspend();}function e(o,O,p,i){if(O.valueTypes[i]&&O.valueTypes[i]!=="self"){o=O._createLocalType(O.valueTypes[i]);}if(O.createControl){return O.createControl(o,O,p,i);}var t=o.getMetadata().getName();var n;while(t&&!n&&t!=="base"){switch(t){case"boolean":n=new N(o.oFormatOptions,o.oConstraints);break;case"int":case"float":if(o.oFormatOptions.hasOwnProperty("emptyString")&&o.oFormatOptions.emptyString===null){n=o;}else{var T=sap.ui.require(o.getMetadata().getName().replace(/\./g,"/"));var k=m(o.oFormatOptions,{emptyString:null});n=new T(k,o.oConstraints);}break;case"date":case"time":case"datetime":n=o;break;default:break;}if(!n){t=f(t);}}if(!n){n=new U(o.oFormatOptions,o.oConstraints);}var l=new c({value:{path:p,type:n,mode:'TwoWay',targetType:'raw'},width:"100%"});return l;}function f(t){return b._mTypes[t];}function g(o){var I=-1;var k=this.getConditions();var s=JSON.stringify(o,['operator','values']);k.some(function(o,i){if(JSON.stringify(o,['operator','values'])===s){I=i;return true;}return false;});return I;}function h(){var o=this.getFormatOptions();if(o.filterOperatorConfig){return o.filterOperatorConfig;}else{if(!this._oFilterOperatorConfig){this._oFilterOperatorConfig=new b();}return this._oFilterOperatorConfig;}}function j(){var o=this.getFormatOptions();var t=o&&o.valueType;if(!t){if(!this._oDefaultType){this._oDefaultType=new U();}t=this._oDefaultType;}return t;}return D;},true);