/*!
 * SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/ManagedObject","sap/ui/mdc/experimental/provider/adapter/AdapterFactory","sap/ui/mdc/experimental/provider/control/Utils","sap/ui/mdc/experimental/provider/control/ControlRegistry","sap/ui/core/XMLTemplateProcessor","sap/ui/core/util/XMLPreprocessor","sap/base/util/ObjectPath","sap/base/Log"],function(q,M,A,U,C,X,a,O,L){"use strict";var P={};P.apply=function(){if(X._preprocessMetadataContexts){return;}X._preprocessMetadataContexts=function(c,s,o){if(s.metadataContexts){for(var k in s.metadataContexts){for(var i=0;i<s.metadataContexts[k].length;i++){P._resolveMetadataContextPath(s.metadataContexts[k][i]);}}}};P._resolveMetadataContextPath=function(m){if(!m){return;}m.path=m.path||'';m.relative=m.path[0]!=='/';if(m.model==''){m.model=undefined;}if(!m.kind){m.kind='field';}m.name=m.name||m.model;};M.prototype._processMetadataContexts=function(m,s){var b,o,k;this._oProviderData={contexts:null,mProvidedProperties:{},mProvidedFunctions:{}};for(var c in m){b=m[c];for(var i=0;i<b.length;i++){o=b[i];if(!P._sanityChecks(o)){continue;}k={};k.metadata=o;k.relative=o.relative;this._oProviderData.contexts=this._oProviderData.contexts||{};this._oProviderData.contexts[o.name]=k;}}if(this._oProviderData.contexts){this.attachModelContextChange(P._handleModelContextChange,P);}};};P.registerVisitors=function(b,c){var i=0;for(i=0;i<c.length;i++){C.visitControl(c[i].getMetadata());}for(i=0;i<b.length;i++){var s=b[i].replace(new RegExp("/","g"),".");q.sap.require(s);A.cacheAdapterClass(b[i],O.get(s||""));}P.registerTemplating();};P.registerTemplating=function(){var i,n=C.getTemplateNodes();var p=function(o,c){var m=o.getAttribute("metadataContexts");if(m){var b,d,e=X._calculatedModelMapping(m,null,true);for(var k in e){b=e[k];for(var i=0;i<b.length;i++){d=b[i];var r=P._resolveMetadataContextPath(d);if(!r&&d.preprocessModel){P.resolveContexts(o,c,d);}}}}c.visitAttributes(o);};for(i=0;i<n.length;i++){var N=U.getNameSpaceInfo(n[i]);a.plugIn(p,N.nameSpace,N.localName);}};P.resolveContexts=function(n,c,m){var o,b=c.getSettings().models[m.preprocessModel];if(!b){var v=c.getViewInfo();var d=sap.ui.getCore().getComponent(v.componentId);b=d?d.oModels[m.preprocessModel]:null;var V={};V[m.model]=b?b.getContext("/"):null;o=c["with"](V,false);}else{o=c;}if(b){var s=U.className(n);var e=A.getAdapter(b,m);var p=C.getProvider(s);if(p&&e){p.renderWithMetadata(n,o,e);}}};P._handleModelContextChange=function(e){var c=e.getSource();for(var k in c._oProviderData.contexts){P._driveWithMetadata(c._oProviderData.contexts[k],c);}};P._driveWithMetadata=function(p,c){if(!p.model){p.model=c.getModel(p.metadata.model);}if(!p.model){L.debug("Metadata context cannot be resolved yet");return;}if(p.relative){var s=c.getBindingContext(p.metadata.model);if(!s){L.debug("Metadata context cannot be resolved yet");return;}else{p.metadata.path=s+"/"+p.metadata.path;delete p.relative;}}var b=c.getMetadata()._sClassName;C.requestProvider(b).then(function(o){A.requestAdapter(p.model,p.metadata).then(function(d){if(!o.isProvided(c)){o.driveWithMetadata(c,d);o.setProvided(c,true);}});});};P._sanityChecks=function(m){if(!m){L.warning("No metadata context available");return false;}if(m.preprocessModel){L.warning("Context is for preprocessing");return false;}if(typeof m=="string"){m=M.bindingParser(m);}if(!m.hasOwnProperty("path")||typeof m.path!=="string"){L.warning("Metadata context is missing a path or path is not a string");return false;}if(!m.hasOwnProperty("relative")){m.relative=!m.hasOwnProperty("context");}else if(typeof m.relative!=="boolean"){L.warning("Metadata relative information must be a boolean");return false;}if(m.hasOwnProperty("context")&&typeof m.context!=="string"){L.warning("Metadata context needs no context or a context path of type string");return false;}if(!m.hasOwnProperty("model")){m.model=undefined;L.debug("Metadata context is missing a model, assuming undefined model");}if(!m.hasOwnProperty("name")){m.name=m.model;L.debug("Metadata context is missing a contexts name, assuming the name of the model");}return true;};return P;});
