/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/mdc/experimental/adapter/odata/ODataBaseAdapter","./ODataObjectAdapter","./ODataPropertyAdapter"],function(O,a,b){"use strict";var c=O.extend("sap.ui.mdc.experimental.adapter.odata.v4.ODataListAdapter",{constructor:function(m){O.prototype.constructor.apply(this,[m,{object:function(){var o={model:this.oModel,path:this.path+"/",metaPath:this.entitySetPath+"/"};return new a(o);},name:function(){return this.oMetaModel.getObject(this.entitySetPath+"@sapui.name");},fields:function(){var f=[];var p={model:this.oModel};if(Array.isArray(this.schema)){for(var i=0;i<this.schema.length;i++){p.path=this.path+"/"+i;f.push(new b(p));}}else{var k,P,o;var d=this.oMetaModel.getObject(this.path+"/");for(k in d){if(k[0]!=="$"){P=this.path+"/"+k;o=this.oMetaModel.getProperty(P);if(o&&o.$kind){p.path=P;if(o.$kind=="Property"){f.push(new b(p));}else if(o.$kind=="NavigationProperty"&&!o.$isCollection){f.push(new c(p));}}}}}return f;},collection:function(){var C="/";if(this.iSeparator>-1){C=this.path.substring(0,this.iSeparator);}else{C=this.path;}return C;}}]);},init:function(){O.prototype.init.apply(this,arguments);if(this.iSeparator>-1){this.entitySetPath=this.path.substring(0,this.iSeparator);if(this.entitySetPath.endsWith("/")){this.entitySetPath=this.entitySetPath.slice(0,-1);}var e=this.oMetaModel.getMetaContext(this.entitySetPath);this.entitySetPath=e.getPath();this.entitySet=e.getObject("");}else{this.entitySet=this.schema;this.entitySetPath=this.metaPath;}}});return c;});
