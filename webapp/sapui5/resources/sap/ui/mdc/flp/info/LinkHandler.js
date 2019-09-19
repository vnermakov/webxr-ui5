/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/mdc/base/info/ILinkHandler','sap/ui/mdc/base/info/LinkItem','sap/ui/mdc/base/info/Factory','sap/ui/mdc/base/info/Log','sap/base/Log','sap/base/util/isPlainObject'],function(I,L,F,a,S,i){"use strict";var b=I.extend("sap.ui.mdc.flp.info.LinkHandler",{metadata:{library:"sap.ui.mdc",properties:{semanticObjects:{type:"string[]",defaultValue:[]},mainSemanticObject:{type:"string"},textOfMainItem:{type:"string"},descriptionOfMainItem:{type:"string"},iconOfMainItem:{type:"string"}},aggregations:{semanticObjectMappings:{type:"sap.ui.mdc.base.info.SemanticObjectMapping",multiple:true,singularName:"semanticObjectMapping"},semanticObjectUnavailableActions:{type:"sap.ui.mdc.base.info.SemanticObjectUnavailableAction",multiple:true,singularName:"semanticObjectUnavailableAction"}}}});b.prototype.init=function(){S.setLevel(S.Level.TRACE);this._oInfoLog=S.getLevel()>=S.Level.INFO?new a():undefined;};b.prototype.hasPotentialLinks=function(){if(!!this.getModifyItemsCallback()||!!this.getItems().length){return Promise.resolve(true);}return b.hasDistinctSemanticObject(this.getSemanticObjects());};b.prototype.determineItems=function(){var c=sap.ui.getCore().byId(this.getSourceControl());var B=c&&c.getBindingContext()||undefined;var C=B?B.getObject(B.getPath()):undefined;if(this._oInfoLog){this._oInfoLog.initialize(this.getSemanticObjects(),C);this.getItems().forEach(function(o){this._oInfoLog.addIntent(a.IntentType.API,{text:o.getText(),intent:o.getHref()});}.bind(this));}if(this.getModifyItemsCallback()){return this.getModifyItemsCallback()(C,this).then(function(){if(this._oInfoLog){if(!this._oInfoLog.isEmpty()&&S.getLevel()>=S.Level.TRACE){S.info("---------------------------------------------\nLinkHandler: calculation of semantic attributes\nBelow you can see detailed information regarding semantic attributes which have been calculated for one or more semantic objects defined in a LinkHandler control. Semantic attributes are used to create the URL parameters. Additionally you can see all links containing the URL parameters.\n"+this._getLogFormattedText());}}return this.getItems();}.bind(this));}else{var s=this.calculateSemanticAttributes(C);return this.retrieveNavigationTargets("",s).then(function(l,o){if(this._oInfoLog){if(!this._oInfoLog.isEmpty()&&S.getLevel()>=S.Level.TRACE){S.info("---------------------------------------------\nLinkHandler: calculation of semantic attributes\nBelow you can see detailed information regarding semantic attributes which have been calculated for one or more semantic objects defined in a LinkHandler control. Semantic attributes are used to create the URL parameters. Additionally you can see all links containing the URL parameters.\n"+this._getLogFormattedText());}}var d=this.getItems();var f=function(k){return d.some(function(g){return g.getKey()===k;});};l.forEach(function(g){if(!f(g.getKey())){this.addItem(g);}}.bind(this));var t=this.getTextOfMainItem();var D=this.getDescriptionOfMainItem();var e=this.getIconOfMainItem();var m=this.getItems().filter(function(g){return g.getIsMain()===true;});if(m.length===0&&(!!t||!!D||!!e)){this.addItem(new L({key:this.getId()+"-defaultMainItem",isMain:true,text:t?t:undefined,description:D?D:undefined,icon:e?e:undefined}));}return this.getItems();}.bind(this));}};b.prototype._convertSemanticObjectMapping=function(){var u=this.getSemanticObjectMappings();if(!u.length){return undefined;}var s={};u.forEach(function(U){if(!U.getSemanticObject()){throw Error("LinkHandler: 'semanticObject' property with value '"+U.getSemanticObject()+"' is not valid");}s[U.getSemanticObject()]=U.getItems().reduce(function(m,o){m[o.getKey()]=o.getValue();return m;},{});});return s;};b.prototype._convertSemanticObjectUnavailableAction=function(){var u=this.getSemanticObjectUnavailableActions();if(!u.length){return undefined;}var s={};u.forEach(function(U){if(!U.getSemanticObject()){throw Error("LinkHandler: 'semanticObject' property with value '"+U.getSemanticObject()+"' is not valid");}s[U.getSemanticObject()]=U.getActions();});return s;};b.prototype._getLogFormattedText=function(){return this._oInfoLog?this._oInfoLog.getFormattedText():"No logging data available";};b.prototype.calculateSemanticAttributes=function(c){var s=this._convertSemanticObjectMapping();var d=this.getSemanticObjects();if(!d.length){d.push("");}var r={};d.forEach(function(e){r[e]={};for(var A in c){var o=null,t=null;if(this._oInfoLog){o=this._oInfoLog.getSemanticObjectAttribute(e,A);if(!o){o=this._oInfoLog.createAttributeStructure();this._oInfoLog.addSemanticObjectAttribute(e,A,o);}}if(c[A]===undefined||c[A]===null){if(o){o.transformations.push({value:undefined,description:"\u2139 Undefined and null values have been removed in LinkHandler."});}continue;}if(i(c[A])){if(o){o.transformations.push({value:undefined,description:"\u2139 Plain objects has been removed in LinkHandler."});}continue;}var f=(s&&s[e]&&s[e][A])?s[e][A]:A;if(o&&A!==f){t={value:undefined,description:"\u2139 The attribute "+A+" has been renamed to "+f+" in LinkHandler.",reason:"\ud83d\udd34 A com.sap.vocabularies.Common.v1.SemanticObjectMapping annotation is defined for semantic object "+e+" with source attribute "+A+" and target attribute "+f+". You can modify the annotation if the mapping result is not what you expected."};}if(r[e][f]){S.error("LinkHandler: The attribute "+A+" can not be renamed to the attribute "+f+" due to a clash situation. This can lead to wrong navigation later on.");}r[e][f]=c[A];if(o){if(t){o.transformations.push(t);var g=this._oInfoLog.createAttributeStructure();g.transformations.push({value:c[A],description:"\u2139 The attribute "+f+" with the value "+c[A]+" has been added due to a mapping rule regarding the attribute "+A+" in LinkHandler."});this._oInfoLog.addSemanticObjectAttribute(e,f,g);}}}}.bind(this));return r;};b.prototype.retrieveNavigationTargets=function(A,s){var N={ownNavigation:undefined,availableActions:[]};return sap.ui.getCore().loadLibrary('sap.ui.fl',{async:true}).then(function(){return new Promise(function(r){sap.ui.require(['sap/ui/fl/Utils'],function(U){var c=F.getService("CrossApplicationNavigation");var u=F.getService("URLParsing");if(!c||!u){S.error("LinkHandler: Service 'CrossApplicationNavigation' or 'URLParsing' could not be obtained");return r(N.availableActions,N.ownNavigation);}var d=this.getSemanticObjects();var C=sap.ui.getCore().byId(this.getSourceControl());var o=U.getAppComponentForControl(C);var p=d.map(function(e){return[{semanticObject:e,params:s?s[e]:undefined,appStateKey:A,ui5Component:o,sortResultsBy:"text"}];});return new Promise(function(){c.getLinks(p).then(function(l){if(!l||!l.length){return r(N.availableActions,N.ownNavigation);}var m=this.getMainSemanticObject();var t=this.getTextOfMainItem();var D=this.getDescriptionOfMainItem();var e=this.getIconOfMainItem();var f=this._convertSemanticObjectUnavailableAction();var g=c.hrefForExternal();if(g&&g.indexOf("?")!==-1){g=g.split("?")[0];}if(g){g+="?";}var h=function(k,q){return!!f&&!!f[k]&&f[k].indexOf(q)>-1;};var j=function(k){var q=u.parseShellHash(k.intent);if(h(q.semanticObject,q.action)){return;}var H=c.hrefForExternal(k.intent);if(k.intent&&k.intent.indexOf(g)===0){N.ownNavigation=new L({href:H,text:k.text});return;}var v=q.semanticObject===m&&q.action&&(q.action==='displayFactSheet');var w=new L({key:(q.semanticObject&&q.action)?(q.semanticObject+"-"+q.action):undefined,text:v&&t?t:k.text,description:v&&D?D:undefined,href:H,icon:v?e:undefined,isMain:v,isSuperior:(k.tags&&k.tags.indexOf("superiorAction")>-1)});N.availableActions.push(w);if(this._oInfoLog){this._oInfoLog.addSemanticObjectIntent(q.semanticObject,{intent:w.getHref(),text:w.getText()});}}.bind(this);for(var n=0;n<d.length;n++){l[n][0].forEach(j);}return r(N.availableActions,N.ownNavigation);}.bind(this),function(){S.error("LinkHandler: 'retrieveNavigationTargets' failed executing getLinks method");return r(N.availableActions,N.ownNavigation);});}.bind(this));}.bind(this));}.bind(this));}.bind(this));};b.oSemanticObjects={};b.oPromise=null;b.hasDistinctSemanticObject=function(s){if(b._haveBeenRetrievedAllSemanticObjects(s)){return Promise.resolve(b._atLeastOneExistsSemanticObject(s));}return b._retrieveDistinctSemanticObjects().then(function(){return b._atLeastOneExistsSemanticObject(s);});};b._haveBeenRetrievedAllSemanticObjects=function(s){return s.filter(function(c){return!b.oSemanticObjects[c];}).length===0;};b._atLeastOneExistsSemanticObject=function(s){return s.some(function(c){return b.oSemanticObjects[c]&&b.oSemanticObjects[c].exists===true;});};b._retrieveDistinctSemanticObjects=function(){if(!b.oPromise){b.oPromise=new Promise(function(r){var c=F.getService("CrossApplicationNavigation");if(!c){S.error("LinkHandler: Service 'CrossApplicationNavigation' could not be obtained");return r({});}c.getDistinctSemanticObjects().then(function(d){d.forEach(function(s){b.oSemanticObjects[s]={exists:true};});b.oPromise=null;return r(b.oSemanticObjects);},function(){S.error("LinkHandler: getDistinctSemanticObjects() of service 'CrossApplicationNavigation' failed");return r({});});});}return b.oPromise;};b.destroyDistinctSemanticObjects=function(){b.oSemanticObjects={};};return b;},true);
