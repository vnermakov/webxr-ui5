/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/model/odata/v2/ODataModel"],function(M,O){"use strict";var S=M.extend("sap.ui.rta.appVariant.S4HanaCloudBackend",{constructor:function(){M.apply(this,arguments);}});S.prototype.notifyFlpCustomizingIsReady=function(i,I,c,m){var t=this;return new Promise(function(r,a){function b(n){return!isNaN(parseFloat(n))&&isFinite(n);}var d=b(c)?c:2500;var R=b(m)?m:-1;function e(){if(R==0){r({iamAppId:i,flpCustomizingIsReady:false});return;}else if(R>0){R=R-1;}t.checkFlpCustomizingIsReady(i).then(function(f){if(f){r({iamAppId:i,flpCustomizingIsReady:true});I(i);}else{setTimeout(e.bind(t),d);}}).catch(function(){a({iamAppId:i});});}setTimeout(e.bind(t),d);});};S._evaluateAppIntegrityEstimation=function(a){var m=(a&&a.AppStatusTable&&JSON.parse(a.AppStatusTable)&&JSON.parse(a.AppStatusTable).ITAB);if(!Array.isArray(m)){throw("Error: /sap/opu/odata/sap/APS_IAM_APP_SRV/checkAppIntegrity() returned unexpected result"+"for IAM app ID "+a.AppID);}var c=m.filter(function(o){return(o.TYPE=='W'&&o.ID=="CM_APS_IAM_APP"&&o.NUMBER=="057");}).length>=1;var C=m.filter(function(o){return(o.TYPE=='E'&&o.ID=="CM_APS_IAM_APP"&&o.NUMBER=="058");}).length>=1;var e=m.filter(function(o){return(o.TYPE=='E');}).length>=1;if((e&&!c)||C){throw("Error: Tile generation for app variant with IAM app ID "+a.AppID+" failed");}return(!c&&!e&&!a.AppStatus);};S.prototype.checkFlpCustomizingIsReady=function(i){return new Promise(function(r,a){var m=new O("/sap/opu/odata/sap/APS_IAM_APP_SRV");m.attachMetadataFailed(function(e){a(e);});m.metadataLoaded().then(function(){m.callFunction("/checkAppIntegrity",{method:"POST",urlParameters:{AppID:i},error:a,success:r});});}).then(S._evaluateAppIntegrityEstimation);};return S;});
