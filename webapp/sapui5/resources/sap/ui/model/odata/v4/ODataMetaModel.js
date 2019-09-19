/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ValueListType","./lib/_Helper","sap/base/assert","sap/base/Log","sap/base/util/ObjectPath","sap/ui/base/SyncPromise","sap/ui/model/BindingMode","sap/ui/model/ChangeReason","sap/ui/model/ClientListBinding","sap/ui/model/Context","sap/ui/model/ContextBinding","sap/ui/model/MetaModel","sap/ui/model/PropertyBinding","sap/ui/model/odata/OperationMode","sap/ui/model/odata/type/Int64","sap/ui/model/odata/type/Raw","sap/ui/thirdparty/jquery","sap/ui/thirdparty/URI"],function(V,_,a,L,O,S,B,C,b,c,d,M,P,f,I,R,q,U){"use strict";var g,m=new Map(),D=L.Level.DEBUG,r=/^-?\d+$/,h,j,s="sap.ui.model.odata.v4.ODataMetaModel",k,l=new R(),p=new Map(),t={messageChange:true},u={"Edm.Boolean":{type:"sap.ui.model.odata.type.Boolean"},"Edm.Byte":{type:"sap.ui.model.odata.type.Byte"},"Edm.Date":{type:"sap.ui.model.odata.type.Date"},"Edm.DateTimeOffset":{constraints:{"$Precision":"precision"},type:"sap.ui.model.odata.type.DateTimeOffset"},"Edm.Decimal":{constraints:{"@Org.OData.Validation.V1.Minimum/$Decimal":"minimum","@Org.OData.Validation.V1.Minimum@Org.OData.Validation.V1.Exclusive":"minimumExclusive","@Org.OData.Validation.V1.Maximum/$Decimal":"maximum","@Org.OData.Validation.V1.Maximum@Org.OData.Validation.V1.Exclusive":"maximumExclusive","$Precision":"precision","$Scale":"scale"},type:"sap.ui.model.odata.type.Decimal"},"Edm.Double":{type:"sap.ui.model.odata.type.Double"},"Edm.Guid":{type:"sap.ui.model.odata.type.Guid"},"Edm.Int16":{type:"sap.ui.model.odata.type.Int16"},"Edm.Int32":{type:"sap.ui.model.odata.type.Int32"},"Edm.Int64":{type:"sap.ui.model.odata.type.Int64"},"Edm.SByte":{type:"sap.ui.model.odata.type.SByte"},"Edm.Single":{type:"sap.ui.model.odata.type.Single"},"Edm.Stream":{type:"sap.ui.model.odata.type.Stream"},"Edm.String":{constraints:{"@com.sap.vocabularies.Common.v1.IsDigitSequence":"isDigitSequence","$MaxLength":"maxLength"},type:"sap.ui.model.odata.type.String"},"Edm.TimeOfDay":{constraints:{"$Precision":"precision"},type:"sap.ui.model.odata.type.TimeOfDay"}},v={},w="@com.sap.vocabularies.Common.v1.ValueList",x="@com.sap.vocabularies.Common.v1.ValueListMapping",y="@com.sap.vocabularies.Common.v1.ValueListReferences",z="@com.sap.vocabularies.Common.v1.ValueListWithFixedValues",W=L.Level.WARNING;function A(o,e,i,n){var T,X=o.mSchema2MetadataUrl[e];if(!X){X=o.mSchema2MetadataUrl[e]={};X[i]=false;}else if(!(i in X)){T=Object.keys(X)[0];if(X[T]){K(o,"A schema cannot span more than one document: "+e+" - expected reference URI "+T+" but instead saw "+i,n);}X[i]=false;}}function E(o,e,i,n){var T,X,Y,Z;function $(a1){var b1,c1;if(!(i in a1)){n(W,X," does not contain ",i);return;}n(D,"Including ",i," from ",X);for(c1 in a1){if(c1[0]!=="$"&&N(c1)===i){b1=a1[c1];e[c1]=b1;J(b1,e.$Annotations);}}}if(i in e){return e[i];}Z=o.mSchema2MetadataUrl[i];if(Z){Y=Object.keys(Z);if(Y.length>1){K(o,"A schema cannot span more than one document: "+"schema is referenced by following URLs: "+Y.join(", "),i);}X=Y[0];Z[X]=true;n(D,"Namespace ",i," found in $Include of ",X);T=o.mMetadataUrl2Promise[X];if(!T){n(D,"Reading ",X);T=o.mMetadataUrl2Promise[X]=S.resolve(o.oRequestor.read(X)).then(o.validate.bind(o,X));}T=T.then($);if(i in e){return e[i];}e[i]=T;return T;}}function F(T,e){if(T===e){return"";}if(T.indexOf(e)===0&&T[e.length]==="#"&&T.indexOf("@",e.length)<0){return T.slice(e.length+1);}}function G(T){var e=F(T,x);return e!==undefined?e:F(T,w);}function H(n,o){return o.some(function(e){return e.$Parameter&&e.$Parameter.some(function(i){return i.$Name===n;});});}function J(o,e,i){var T;function n(X,Y){var Z;for(Z in Y){if(i||!(Z in X)){X[Z]=Y[Z];}}}for(T in o.$Annotations){if(!(T in e)){e[T]={};}n(e[T],o.$Annotations[T]);}delete o.$Annotations;}function K(o,e,i){var n=new Error(i+": "+e);o.oModel.reportError(e,s,n);throw n;}function N(e){return e.slice(0,e.lastIndexOf(".")+1);}h=d.extend("sap.ui.model.odata.v4.ODataMetaContextBinding",{constructor:function(o,e,i){a(!i||i.getModel()===o,"oContext must belong to this model");d.call(this,o,e,i);},initialize:function(){var e=this.oModel.createBindingContext(this.sPath,this.oContext);this.bInitial=false;if(e!==this.oElementContext){this.oElementContext=e;this._fireChange();}},setContext:function(o){a(!o||o.getModel()===this.oModel,"oContext must belong to this model");if(o!==this.oContext){this.oContext=o;if(!this.bInitial){this.initialize();}}}});j=b.extend("sap.ui.model.odata.v4.ODataMetaListBinding",{constructor:function(){b.apply(this,arguments);},_fireFilter:function(){},_fireSort:function(){},checkUpdate:function(e){var i=this.oList.length;this.update();if(e||this.oList.length!==i){this._fireChange({reason:C.Change});}},fetchContexts:function(){var i,e=this.oModel.resolve(this.sPath,this.oContext),n=this;if(!e){return S.resolve([]);}i=e.slice(-1)==="@";if(!i&&!e.endsWith("/")){e+="/";}return this.oModel.fetchObject(e).then(function(o){if(!o){return[];}if(i){e=e.slice(0,-1);}return Object.keys(o).filter(function(T){return T[0]!=="$"&&i!==(T[0]!=="@");}).map(function(T){return new c(n.oModel,e+T);});});},getContexts:function(i,e){this.iCurrentStart=i||0;this.iCurrentLength=Math.min(e||Infinity,this.iLength-this.iCurrentStart,this.oModel.iSizeLimit);return this.getCurrentContexts();},getCurrentContexts:function(){var e=[],i,n=this.iCurrentStart+this.iCurrentLength;for(i=this.iCurrentStart;i<n;i++){e.push(this.oList[this.aIndices[i]]);}if(this.oList.dataRequested){e.dataRequested=true;}return e;},setContexts:function(e){this.oList=e;this.updateIndices();this.applyFilter();this.applySort();this.iLength=this._getLength();},update:function(){var e=[],o=this.fetchContexts(),i=this;if(o.isFulfilled()){e=o.getResult();}else{o.then(function(e){i.setContexts(e);i._fireChange({reason:C.Change});});e.dataRequested=true;}this.setContexts(e);}});k=P.extend("sap.ui.model.odata.v4.ODataMetaPropertyBinding",{constructor:function(){P.apply(this,arguments);this.vValue=undefined;},checkUpdate:function(e,i){var o,n=this;function T(X){if(e||X!==n.vValue){n.vValue=X;n._fireChange({reason:i||C.Change});}return X;}o=this.oModel.fetchObject(this.sPath,this.oContext,this.mParameters).then(T);if(this.mParameters&&this.mParameters.$$valueAsPromise&&o.isPending()){T(o.unwrap());}},getValue:function(){return this.vValue;},setContext:function(o){if(this.oContext!=o){this.oContext=o;if(this.bRelative){this.checkUpdate(false,C.Context);}}},setValue:function(){throw new Error("Unsupported operation: ODataMetaPropertyBinding#setValue");}});var Q=M.extend("sap.ui.model.odata.v4.ODataMetaModel",{constructor:function(o,e,i,n,T){M.call(this);this.aAnnotationUris=i&&!Array.isArray(i)?[i]:i;this.sDefaultBindingMode=B.OneTime;this.mETags={};this.dLastModified=new Date(0);this.oMetadataPromise=null;this.oModel=n;this.mMetadataUrl2Promise={};this.oRequestor=o;this.mSchema2MetadataUrl={};this.mSupportedBindingModes={"OneTime":true,"OneWay":true};this.bSupportReferences=T!==false;this.sUrl=e;}});Q.prototype.$$valueAsPromise=true;Q.prototype._mergeAnnotations=function(e,n){var o=this;this.validate(this.sUrl,e);e.$Annotations={};Object.keys(e).forEach(function(i){if(e[i].$kind==="Schema"){A(o,i,o.sUrl);J(e[i],e.$Annotations);}});n.forEach(function(T,i){var X,Y;o.validate(o.aAnnotationUris[i],T);for(Y in T){if(Y[0]!=="$"){if(Y in e){K(o,"A schema cannot span more than one document: "+Y,o.aAnnotationUris[i]);}X=T[Y];e[Y]=X;if(X.$kind==="Schema"){A(o,Y,o.aAnnotationUris[i]);J(X,e.$Annotations,true);}}}});};Q.prototype.attachEvent=function(e){if(!(e in t)){throw new Error("Unsupported event '"+e+"': v4.ODataMetaModel#attachEvent");}return M.prototype.attachEvent.apply(this,arguments);};Q.prototype.bindContext=function(e,o){return new h(this,e,o);};Q.prototype.bindList=function(e,o,i,n){return new j(this,e,o,i,n);};Q.prototype.bindProperty=function(e,o,i){return new k(this,e,o,i);};Q.prototype.bindTree=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#bindTree");};Q.prototype.fetchCanonicalPath=function(o){return this.fetchUpdateData("",o).then(function(e){if(!e.editUrl){throw new Error(o.getPath()+": No canonical path for transient entity");}if(e.propertyPath){throw new Error("Context "+o.getPath()+" does not point to an entity. It should be "+e.entityPath);}return"/"+e.editUrl;});};Q.prototype.fetchData=function(){return this.fetchEntityContainer().then(function(e){return JSON.parse(JSON.stringify(e));});};Q.prototype.fetchEntityContainer=function(e){var i,n=this;if(!this.oMetadataPromise){i=[S.resolve(this.oRequestor.read(this.sUrl,false,e))];if(this.aAnnotationUris){this.aAnnotationUris.forEach(function(o){i.push(S.resolve(n.oRequestor.read(o,true,e)));});}if(!e){this.oMetadataPromise=S.all(i).then(function(o){var T=o[0];n._mergeAnnotations(T,o.slice(1));return T;});}}return this.oMetadataPromise;};Q.prototype.fetchModule=function(e){var i;e=e.replace(/\./g,"/");i=sap.ui.require(e);if(i){return S.resolve(i);}return S.resolve(new Promise(function(n,o){sap.ui.require([e],n);}));};Q.prototype.fetchObject=function(n,T,X){var Y=this.resolve(n,T),Z=this;if(!Y){L.error("Invalid relative path w/o context",n,s);return S.resolve(null);}return this.fetchEntityContainer().then(function($){var a1,b1=false,c1,d1,e1=true,f1,g1,h1,i1=$;function j1(i,n){var o,r1=i.indexOf("@",2);if(r1>-1){return n1(W,"Unsupported path after ",i.slice(0,r1));}i=i.slice(2);o=i[0]==="."?O.get(i.slice(1),X.scope):X&&O.get(i,X.scope)||(i==="requestCurrencyCodes"||i==="requestUnitsOfMeasure"?Z[i].bind(Z):O.get(i));if(typeof o!=="function"){return n1(W,i," is not a function but: "+o);}try{i1=o(i1,{$$valueAsPromise:X&&X.$$valueAsPromise,context:new c(Z,n),schemaChildName:g1});}catch(e){n1(W,"Error calling ",i,": ",e);}return true;}function k1(e,o){var i;if(e&&o.$Parameter){i=o.$Parameter.filter(function(r1){return r1.$Name===e;});if(i.length){i1=i[0];return true;}}return false;}function l1(o){return o.$kind!=="Action"||(!o.$IsBound&&a1===v||o.$IsBound&&a1===o.$Parameter[0].$Type);}function m1(o){return o&&typeof o.then==="function";}function n1(i){var e;if(L.isLoggable(i,s)){e=Array.isArray(c1)?c1.join("/"):c1;L[i===D?"debug":"warning"](Array.prototype.slice.call(arguments,1).join("")+(e?" at /"+e:""),Y,s);}if(i===W){i1=undefined;}return false;}function o1(e,i){var o;function r1(){c1=c1||h1&&i&&h1+"/"+i;return n1.apply(this,arguments);}a1=i1&&i1.$Type;if(Z.bSupportReferences&&!(e in $)){o=N(e);i1=E(Z,$,o,r1);}if(e in $){h1=d1=g1=e;i1=f1=$[g1];if(!m1(i1)){return true;}}if(m1(i1)&&i1.isPending()){return r1(D,"Waiting for ",o);}return r1(W,"Unknown qualified name ",e);}function p1(e,i,o){var r1,s1;if(e==="$Annotations"){return n1(W,"Invalid segment: $Annotations");}if(i1!==$&&typeof i1==="object"&&e in i1){if(e[0]==="$"||r.test(e)){e1=false;}}else{r1=e.indexOf("@@");if(r1<0){if(e.length>11&&e.slice(-11)==="@sapui.name"){r1=e.length-11;}else{r1=e.indexOf("@");}}if(r1>0){if(!p1(e.slice(0,r1),i,o)){return false;}e=e.slice(r1);s1=true;}if(typeof i1==="string"&&!(s1&&(e==="@sapui.name"||e[1]==="@"))&&!q1(i1,o.slice(0,i))){return false;}if(e1){if(e[0]==="$"||r.test(e)){e1=false;}else if(!s1){if(e[0]!=="@"&&e.indexOf(".")>0){return o1(e);}else if(i1&&"$Type"in i1){if(!o1(i1.$Type,"$Type")){return false;}}else if(i1&&"$Action"in i1){if(!o1(i1.$Action,"$Action")){return false;}a1=v;}else if(i1&&"$Function"in i1){if(!o1(i1.$Function,"$Function")){return false;}}else if(i===0){h1=d1=g1=g1||$.$EntityContainer;i1=f1=f1||$[g1];if(e&&e[0]!=="@"&&!(e in f1)){return n1(W,"Unknown child ",e," of ",g1);}}if(Array.isArray(i1)){if(e!==o[i]&&H(e,i1)){d1=e;h1=h1+"/"+e;return true;}i1=i1.filter(l1);if(e==="@$ui5.overload"){return true;}if(i1.length!==1){return n1(W,"Unsupported overloads");}if(k1(e,i1[0])){return true;}i1=i1[0].$ReturnType;h1=h1+"/0/$ReturnType";if(i1){if(e==="value"&&!($[i1.$Type]&&$[i1.$Type].value)){d1=undefined;return true;}if(!o1(i1.$Type,"$Type")){return false;}}if(!e){return true;}}}}if(!e){return i+1>=o.length||n1(W,"Invalid empty segment");}if(e[0]==="@"){if(e==="@sapui.name"){i1=d1;if(i1===undefined){n1(W,"Unsupported path before @sapui.name");}else if(i+1<o.length){n1(W,"Unsupported path after @sapui.name");}return false;}if(e[1]==="@"){if(i+1<o.length){return n1(W,"Unsupported path after ",e);}return j1(e,[""].concat(o.slice(0,i),o[i].slice(0,r1)).join("/"));}}if(!i1||typeof i1!=="object"){i1=undefined;return!b1&&n1(D,"Invalid segment: ",e);}if(e1&&e[0]==="@"){i1=($.$Annotations||{})[h1]||{};b1=true;e1=false;}else if(e==="$"&&i+1<o.length){return n1(W,"Unsupported path after $");}}if(e!=="@"&&e!=="$"){if(e[0]==="@"){b1=true;}d1=e1||e[0]==="@"?e:undefined;h1=e1?h1+"/"+e:undefined;i1=i1[e];}return true;}function q1(e,i){var o;if(c1){return n1(W,"Invalid recursion");}c1=i;b1=false;e1=true;i1=$;o=e.split("/").every(p1);c1=undefined;return o;}if(!q1(Y.slice(1))&&m1(i1)){i1=i1.then(function(){return Z.fetchObject(n,T,X);});}return i1;});};Q.prototype.fetchUI5Type=function(e){var o=this.getMetaContext(e),i=this;if(e.endsWith("/$count")){g=g||new I();return S.resolve(g);}return this.fetchObject(undefined,o).catch(function(){}).then(function(n){var T,X,Y,Z=l.getName();if(!n){L.warning("No metadata for path '"+e+"', using "+Z,undefined,s);return l;}X=n["$ui5.type"];if(X){return X;}if(n.$isCollection){L.warning("Unsupported collection type, using "+Z,e,s);}else{Y=u[n.$Type];if(Y){Z=Y.type;T=i.getConstraints(n,o.getPath());}else{L.warning("Unsupported type '"+n.$Type+"', using "+Z,e,s);}}if(Z===l.getName()){n["$ui5.type"]=l;}else{n["$ui5.type"]=i.fetchModule(Z).then(function($){X=new $(undefined,T);n["$ui5.type"]=X;return X;});}return n["$ui5.type"];});};Q.prototype.fetchUpdateData=function(e,o){var n=o.getModel(),T=n.resolve(e,o),X=this;function Y(i){var Z=new Error(T+": "+i);n.reportError(i,s,Z);throw Z;}return this.fetchObject(this.getMetaPath(T)).then(function(){return X.fetchEntityContainer();}).then(function(Z){var $,a1=Z[Z.$EntityContainer],b1,c1,d1,e1,f1,g1,h1,i1=false,j1;function k1(o1){var i=o1.indexOf("(");return i>=0?o1.slice(i):"";}function l1(i){$.push({path:f1,prefix:i,type:j1});}function m1(o1){var i=o1.indexOf("(");return i>=0?o1.slice(0,i):o1;}function n1(i){if(i.includes("($uid=")){l1(m1(i));}else{$.push(i);}}h1=T.slice(1).split("/");e1=h1.shift();f1="/"+e1;b1=f1;d1=decodeURIComponent(m1(e1));c1=a1[d1];if(!c1){Y("Not an entity set: "+d1);}j1=Z[c1.$Type];e="";g1="";$=[];n1(e1);h1.forEach(function(i){var o1,p1;f1+="/"+i;if(r.test(i)){l1($.pop());b1+="/"+i;}else{p1=decodeURIComponent(m1(i));g1=_.buildPath(g1,p1);o1=j1[p1];if(!o1){Y("Not a (navigation) property: "+p1);}j1=Z[o1.$Type];if(o1.$kind==="NavigationProperty"){if(c1.$NavigationPropertyBinding&&g1 in c1.$NavigationPropertyBinding){d1=c1.$NavigationPropertyBinding[g1];c1=a1[d1];g1="";$=[encodeURIComponent(d1)+k1(i)];if(!o1.$isCollection){l1($.pop());}}else{n1(i);}b1=f1;e="";}else{e=_.buildPath(e,i);}}});return S.all($.map(function(i){if(typeof i==="string"){return i;}return o.fetchValue(i.path).then(function(o1){var p1;if(!o1){Y("No instance to calculate key predicate at "+i.path);}if(_.hasPrivateAnnotation(o1,"transient")){i1=true;return undefined;}p1=_.getPrivateAnnotation(o1,"predicate");if(!p1){Y("No key predicate known at "+i.path);}return i.prefix+p1;},function(o1){Y(o1.message+" at "+i.path);});})).then(function(i){return{editUrl:i1?undefined:i.join("/"),entityPath:b1,propertyPath:e};});});};Q.prototype.fetchValueListMappings=function(o,n,T){var e=this,i=o.getMetaModel();return i.fetchEntityContainer().then(function(X){var Y,Z=X.$Annotations,$={},a1=e===i,b1;b1=Object.keys(Z).filter(function(c1){if(_.namespace(c1)===n){if(typeof T==="string"?c1===T:e.getObject("/"+c1)===T){return true;}if(!a1){throw new Error("Unexpected annotation target '"+c1+"' with namespace of data service in "+o.sServiceUrl);}}return false;});if(!b1.length){throw new Error("No annotation '"+w.slice(1)+"' in "+o.sServiceUrl);}Y=Z[b1[0]];Object.keys(Y).forEach(function(c1){var d1=G(c1);if(d1!==undefined){$[d1]=Y[c1];["CollectionRoot","SearchSupported"].forEach(function(e1){if(e1 in Y[c1]){throw new Error("Property '"+e1+"' is not allowed in annotation '"+c1.slice(1)+"' for target '"+b1[0]+"' in "+o.sServiceUrl);}});}else if(!a1){throw new Error("Unexpected annotation '"+c1.slice(1)+"' for target '"+b1[0]+"' with namespace of data service in "+o.sServiceUrl);}});return $;});};Q.prototype.fetchValueListType=function(e){var o=this.getMetaContext(e),i=this;return this.fetchObject(undefined,o).then(function(n){var T,X;if(!n){throw new Error("No metadata for "+e);}T=i.getObject("@",o);if(T[z]){return V.Fixed;}for(X in T){if(F(X,y)!==undefined||F(X,x)!==undefined){return V.Standard;}if(F(X,w)!==undefined){return T[X].SearchSupported===false?V.Fixed:V.Standard;}}return V.None;});};Q.prototype.getAbsoluteServiceUrl=function(e){var i=new U(this.sUrl).absoluteTo(document.baseURI).pathname().toString();return new U(e).absoluteTo(i).filename("").toString();};Q.prototype.getAdapterFactoryModulePath=function(){return"sap/ui/mdc/experimental/adapter/odata/v4/ODataAdapterFactory";};Q.prototype.getConstraints=function(o,e){var i,n,T,X=u[o.$Type];function Y(Z,$){if($!==undefined){n=n||{};n[Z]=$;}}if(X){T=X.constraints;for(i in T){Y(T[i],i[0]==="@"?this.getObject(e+i):o[i]);}if(o.$Nullable===false){Y("nullable",false);}}return n;};Q.prototype.getData=_.createGetMethod("fetchData");Q.prototype.getETags=function(){return this.mETags;};Q.prototype.getLastModified=function(){return this.dLastModified;};Q.prototype.getMetaContext=function(e){return new c(this,this.getMetaPath(e));};Q.prototype.getMetaPath=function(e){return _.getMetaPath(e);};Q.prototype.getObject=_.createGetMethod("fetchObject");Q.prototype.getOrCreateSharedModel=function(e,i){var o;e=this.getAbsoluteServiceUrl(e);o=p.get(e);if(!o){o=new this.oModel.constructor({groupId:i,operationMode:f.Server,serviceUrl:e,synchronizationMode:"None"});o.setDefaultBindingMode(B.OneWay);p.set(e,o);o.oRequestor.mHeaders["X-CSRF-Token"]=this.oModel.oRequestor.mHeaders["X-CSRF-Token"];}return o;};Q.prototype.getOriginalProperty=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#getOriginalProperty");};Q.prototype.getProperty=Q.prototype.getObject;Q.prototype.getUI5Type=_.createGetMethod("fetchUI5Type",true);Q.prototype.getValueListType=_.createGetMethod("fetchValueListType",true);Q.prototype.isList=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#isList");};Q.prototype.refresh=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#refresh");};Q.prototype.requestCodeList=function(T,i,o){var n=this.fetchEntityContainer().getResult(),X=n[n.$EntityContainer],Y=this;if(o&&o.context){if(o.context.getModel()!==this||o.context.getPath()!=="/"){throw new Error("Unsupported context: "+o.context);}}if(i!==undefined&&i!==X){throw new Error("Unsupported raw value: "+i);}return this.requestObject("/@com.sap.vocabularies.CodeList.v1."+T).then(function(Z){var $,a1,b1,c1,d1;if(!Z){return null;}$=Y.getAbsoluteServiceUrl(Z.Url)+"#"+Z.CollectionPath;c1=m.get($);if(c1){return c1;}b1=Y.getOrCreateSharedModel(Z.Url,"$direct");a1=b1.getMetaModel();d1="/"+Z.CollectionPath+"/";c1=a1.requestObject(d1).then(function(e1){return new Promise(function(f1,g1){var h1=d1+"@Org.OData.Core.V1.AlternateKeys",i1=a1.getObject(h1),j1,k1=s1(e1.$Key),l1=d1+k1+"@com.sap.vocabularies.Common.v1.",m1,n1,o1=d1+k1+"@com.sap.vocabularies.CodeList.v1.StandardCode/$Path",p1,q1;function r1(e,t1){var u1=t1.getProperty(k1),v1={Text:t1.getProperty(q1),UnitSpecificScale:t1.getProperty(n1)};if(p1){v1.StandardCode=t1.getProperty(p1);}if(v1.UnitSpecificScale===null){L.error("Ignoring customizing w/o unit-specific scale for code "+u1+" from "+Z.CollectionPath,Z.Url,s);}else{e[u1]=v1;}return e;}function s1(e){var t1;if(e&&e.length===1){t1=e[0];}else{throw new Error("Single key expected: "+d1);}return typeof t1==="string"?t1:t1[Object.keys(t1)[0]];}if(i1){if(i1.length!==1){throw new Error("Single alternative expected: "+h1);}else if(i1[0].Key.length!==1){throw new Error("Single key expected: "+h1+"/0/Key");}k1=i1[0].Key[0].Name.$PropertyPath;}n1=a1.getObject(l1+"UnitSpecificScale/$Path");q1=a1.getObject(l1+"Text/$Path");m1=[k1,n1,q1];p1=a1.getObject(o1);if(p1){m1.push(p1);}j1=b1.bindList("/"+Z.CollectionPath,null,null,null,{$select:m1});j1.attachChange(function(){var t1;try{t1=j1.getContexts(0,Infinity);if(!t1.length){L.error("Customizing empty for ",b1.sServiceUrl+Z.CollectionPath,s);}f1(t1.reduce(r1,{}));}catch(e){g1(e);}});j1.attachDataReceived(function(e){var t1=e.getParameter("error");if(t1){g1(t1);}});j1.getContexts(0,Infinity);});});m.set($,c1);return c1;});};Q.prototype.requestCurrencyCodes=function(e,o){return this.requestCodeList("CurrencyCodes",e,o);};Q.prototype.requestData=_.createRequestMethod("fetchData");Q.prototype.requestObject=_.createRequestMethod("fetchObject");Q.prototype.requestUI5Type=_.createRequestMethod("fetchUI5Type");Q.prototype.requestUnitsOfMeasure=function(e,o){return this.requestCodeList("UnitsOfMeasure",e,o);};Q.prototype.requestValueListInfo=function(e){var i=this.getMetaPath(e),n=i.slice(0,i.lastIndexOf("/")),o=n.slice(n.lastIndexOf("/")+1),T=this;if(!o.includes(".")){o=undefined;}return Promise.all([o||this.requestObject(n+"/@sapui.name"),this.requestObject(i),this.requestObject(i+"@"),this.requestObject(i+z)]).then(function(X){var Y=X[2],Z=X[3],$={},a1=_.namespace(X[0]),b1=X[1],c1={};function d1(e1,f1,g1,h1){if(Z!==undefined&&"SearchSupported"in e1){throw new Error("Must not set 'SearchSupported' in annotation "+"'com.sap.vocabularies.Common.v1.ValueList' and annotation "+"'com.sap.vocabularies.Common.v1.ValueListWithFixedValues'");}if("CollectionRoot"in e1){h1=T.getOrCreateSharedModel(e1.CollectionRoot);if(c1[f1]&&c1[f1].$model===h1){$[f1]=undefined;}}if($[f1]){throw new Error("Annotations '"+w.slice(1)+"' with identical qualifier '"+f1+"' for property "+e+" in "+$[f1]+" and "+g1);}$[f1]=g1;e1=q.extend(true,{$model:h1},e1);delete e1.CollectionRoot;delete e1.SearchSupported;c1[f1]=e1;}if(!b1){throw new Error("No metadata for "+e);}return Promise.all(Object.keys(Y).filter(function(e1){return F(e1,y)!==undefined;}).map(function(e1){var f1=Y[e1];return Promise.all(f1.map(function(g1){var h1=T.getOrCreateSharedModel(g1);return T.fetchValueListMappings(h1,a1,b1.$Name?o+"/"+b1.$Name:b1).then(function(i1){Object.keys(i1).forEach(function(j1){d1(i1[j1],j1,g1,h1);});});}));})).then(function(){var e1;Object.keys(Y).filter(function(f1){return G(f1)!==undefined;}).forEach(function(f1){d1(Y[f1],G(f1),T.sUrl,T.oModel);});e1=Object.keys(c1);if(!e1.length){throw new Error("No annotation '"+y.slice(1)+"' for "+e);}if(Z){if(e1.length>1){throw new Error("Annotation '"+z.slice(1)+"' but multiple '"+w.slice(1)+"' for property "+e);}return{"":c1[e1[0]]};}return c1;});});};Q.prototype.requestValueListType=_.createRequestMethod("fetchValueListType");Q.prototype.resolve=function(e,o){var i,n;if(!e){return o?o.getPath():undefined;}n=e[0];if(n==="/"){return e;}if(!o){return undefined;}if(n==="."){if(e[1]!=="/"){throw new Error("Unsupported relative path: "+e);}e=e.slice(2);}i=o.getPath();return n==="@"||i.slice(-1)==="/"?i+e:i+"/"+e;};Q.prototype.setLegacySyntax=function(){throw new Error("Unsupported operation: v4.ODataMetaModel#setLegacySyntax");};Q.prototype.toString=function(){return s+": "+this.sUrl;};Q.prototype.validate=function(e,n){var i,o,T,X,Y,Z;if(!this.bSupportReferences){return n;}for(Z in n.$Reference){Y=n.$Reference[Z];Z=new U(Z).absoluteTo(this.sUrl).toString();if("$IncludeAnnotations"in Y){K(this,"Unsupported IncludeAnnotations",e);}for(i in Y.$Include){X=Y.$Include[i];if(X in n){K(this,"A schema cannot span more than one document: "+X+" - is both included and defined",e);}A(this,X,Z,e);}}T=n.$LastModified?new Date(n.$LastModified):null;this.mETags[e]=n.$ETag?n.$ETag:T;o=n.$Date?new Date(n.$Date):new Date();T=T||o;if(this.dLastModified<T){this.dLastModified=T;}delete n.$Date;delete n.$ETag;delete n.$LastModified;return n;};return Q;});