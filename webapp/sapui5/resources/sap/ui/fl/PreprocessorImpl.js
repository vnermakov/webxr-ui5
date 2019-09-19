/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Component','sap/ui/fl/Utils','sap/ui/fl/ChangePersistenceFactory',"sap/base/Log"],function(C,U,a,L){'use strict';function i(c){return c.getChangeType()==="codeExt";}function b(c,o){var s=o.getSelector().controllerName;return c===s;}var P=function(){};P.prototype.getControllerExtensions=function(c,s,A){if(A){if(!s){L.warning("No component ID for determining the anchor of the code extensions was passed.");return Promise.resolve([]);}var o=C.get(s);var d=U.getAppComponentForControl(o);if(!U.isApplication(d.getManifestObject())){return Promise.resolve([]);}var f=U.getComponentClassName(d);var e=U.getAppVersionFromManifest(d.getManifest());var g=a.getChangePersistenceForComponent(f,e);return g.getChangesForComponent().then(function(h){var E=h.filter(function(j){return i(j)&&b(c,j);}).map(function(j){return j.getModuleName();});return P.getExtensionModules(E);});}else{L.warning("Synchronous extensions are not supported by sap.ui.fl.PreprocessorImpl");return[];}};P.getExtensionModules=function(c){if(c.length===0){return Promise.resolve([]);}return new Promise(function(r){sap.ui.require(c,function(){var m=Array.prototype.slice.call(arguments);r(m);},function(e){U.log.error("Code Extension not found",e.message);r([]);});});};return P;},true);
