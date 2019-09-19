sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/base/Log"],function(q,B,L){"use strict";var C={isPreliminary:function(){return false;}};function g(c,o){var t=o.oTemplateContract.mRoutingTree[o.route];var h;var H;var a;var b;var I=false;var d=[];var e=[];function f(i){var l1;var m1=c.getModel();if(i){if(m1){l1=m1.getProperty(i);}}else{var n1=c.getBindingContext();if(n1){l1=n1.getObject();}}return!!(l1&&l1.__metadata&&l1.__metadata.created);}function j(){return c.getModel("_templPriv");}function k(){return j().getProperty("/generic/viewLevel");}function l(){return o.preprocessorsData;}function m(){return o.oParameterModel;}function n(){var i=c.getModel("i18n").getResourceBundle();return{dataLoadFailedTitle:i.getText("ST_ERROR"),dataLoadFailedText:i.getText("ST_GENERIC_ERROR_LOAD_DATA_TEXT")};}function A(i,l1,m1){if(typeof m1!=="function"){throw new Error("Event handler must be a function");}e.push({template:i,event:l1,handler:m1});}function D(l1,m1,n1){for(var i=e.length;i--;){if(e[i].handler===n1&&e[i].event===m1&&e[i].template===l1){e.splice(i,1);}}}function F(l1,m1,n1){for(var i=0;i<e.length;i++){if(e[i].event===m1&&e[i].template===l1){e[i].handler(n1);}}}function p(i){return i.getMetadata().getName();}function r(){return o.oApplication.isComponentActive(c);}function s(){return o.oNavigationObserver.getProcessFinished(true);}function P(i,l1){var m1=s();m1.then(function(){if(r()){if(l1){K(true);}F(p(o.oController),"PageDataLoaded",{context:i});}});}function u(){h.then(function(i){if(i){P(i);}});}function S(){o.oHeaderLoadingObserver.startProcess();if(!b){var i=new Promise(function(l1){b=l1;});o.oApplication.getBusyHelper().setBusy(i);}}function N(){if(!H){h=new Promise(function(i){H=i;});}}N();function v(i){L.info("Request header data",i.getSource().getPath(),"Class sap.suite.ui.generic.template.lib.ComponentUtils");I=true;N();if(!c.getComponentContainer().getElementBinding().isSuspended()){S();}}function E(){if(b){b();b=null;}o.oHeaderLoadingObserver.stopProcess();}function w(i){var l1=i.getSource().getBoundContext();if(l1){return l1;}if(c.getComponentContainer().getElementBinding().isSuspended()){l1=null;}else{l1=C;}U();return l1;}function x(){var i=n();var l1=c.getAppComponent().getNavigationController();l1.navigateToMessagePage({title:i.dataLoadFailedTitle,text:i.dataLoadFailedText,description:"",viewLevel:k()});}function y(){I=false;if(!a){return;}if(a===C){x();}else if(!c.getComponentContainer().getElementBinding().isSuspended()){(o.methods.updateBindingContext||q.noop)();if(H){H(a);}}else{return;}H=null;a=null;}function z(i){L.info("Received header data",i.getSource().getPath(),"Class sap.suite.ui.generic.template.lib.ComponentUtils");E();if(I){a=w(i);}y();}function G(i){var l1=w(i);if(l1&&l1.isPreliminary()){return;}a=l1;y();o.oHeaderLoadingObserver.stopProcess();}function R(i){var l1={createPreliminaryContext:true};var m1=l();if(m1.rootContextExpand&&m1.rootContextExpand.length){l1.expand=m1.rootContextExpand.join(",");}o.oHeaderLoadingObserver.startProcess();if(o.methods.beforeRebind){o.methods.beforeRebind();}N();a=null;c.getComponentContainer().bindElement({path:i,events:{dataRequested:v,dataReceived:z,change:G},parameters:l1,batchGroupId:"Changes",changeSetId:"Changes"});if(o.methods.afterRebind){o.methods.afterRebind();}}function U(){N();var i=c.getComponentContainer();i.unbindElement();a=null;I=false;E();}function J(){var l1=$();var m1=(l1.length===d.length);for(var i=0;i<l1.length&&m1;i++){m1=l1[i]===d[i];}d=l1;return!m1;}function K(i){o.reuseComponentsReady.then(function(l1){for(var m1 in l1){l1[m1].pathUnchangedCallBack(i);}});}function M(i,l1){var m1=Object.create(null);for(var n1 in i){var o1=i[n1];m1[n1]=l1(o1,n1);}return m1;}function O(){var i=j();for(var l1 in o.routeConfig.embeddedComponents){var m1=!!o.routeConfig.embeddedComponents[l1].hiddenByDefault;i.setProperty("/generic/embeddedComponents/"+l1+"/hidden",m1);}}function Q(i,l1){var m1=J();if(m1&&!l1){O();}if(!i){if(o.routingSpec&&o.routingSpec.noOData){P(null,m1);}return;}var n1=c.getComponentContainer();if(!n1){return;}if(f(i)){U();var o1=n1.getModel().getContext(i);if(H){H(o1);H=null;}else{h=Promise.resolve(o1);}if(!l1){u();}n1.setBindingContext(o1);Promise.all([o.oViewRenderedPromise,o.viewRegistered]).then(K.bind(null,true));}else{var p1=n1.getElementBinding();if(p1){if(p1.getPath()===i){if(p1.isSuspended()){p1.resume();y();}if(I){S();}o.oApplication.getBusyHelper().getUnbusy().then(K.bind(null,m1&&o.routingSpec.noOData));if(!l1){u();}return;}else if(!l1){U();}}var q1=c.getModel("ui");q1.setProperty("/enabled",false);q1.setProperty("/editable",false);R(i);u();}}function T(){var i=c.getComponentContainer().getElementBinding();if(i){c.getModel().invalidateEntry(i.getBoundContext());if(i.isSuspended()){U();}else{i.refresh(true);}}}function V(i){i=i||c.getIsRefreshRequired();if(i||!q.isEmptyObject(o.mRefreshInfos)){(o.methods.refreshBinding||q.noop)(i,o.mRefreshInfos);c.setIsRefreshRequired(false);o.mRefreshInfos=Object.create(null);}K(i);}function W(){var i=c.getComponentContainer();var l1=i.getBindingContext();var m1=l1&&l1.getPath();var n1=m1&&f(m1);if(n1){i.setBindingContext();return;}var o1=i.getElementBinding();if(o1&&!o1.isSuspended()){if(o.oTemplateContract.oValidationMessageBinding.getLength()){U();}else{o1.suspend();}E();}}function X(i){o.oApplication.setBackNavigation(i);}function Y(i){var l1=k();return o.oApplication.registerContext(i,l1,c.getEntitySet());}function Z(){return o.oApplication.getBreadCrumbInfo(c.getEntitySet());}function $(){return o.oApplication.getCurrentKeys(k());}function _(i){return o.oApplication.getCommunicationObject(c,i);}function a1(i,l1,m1,n1){o.oApplication.navigateRoute(i,l1,o,m1,n1);}function b1(){var i=c.getEntitySet();var t=o.oTemplateContract.mEntityTree[i];return t.headerTitle;}function c1(){var i=c.getEntitySet();var t=o.oTemplateContract.mEntityTree[i];return t.isDraft;}function d1(){if(c1()){var i=o.oApplication.getHierarchySectionsFromCurrentHash();return"/"+i[0];}}function e1(){return!(o.routingSpec&&o.routingSpec.noOData);}function f1(){return h;}function g1(){return o.oTemplateContract.oPaginatorInfo[k()-1];}function h1(i,l1){var m1=k();if(!l1){m1--;}o.oTemplateContract.oPaginatorInfo[m1]=i;}function i1(i,l1){o.reuseComponentsReady.then(function(m1){var n1=l1.getComponentInstance();for(var o1 in m1){if(n1===m1[o1].component){var p1=j();p1.setProperty("/generic/embeddedComponents/"+o1+"/isInVisibleArea",i);return;}}});}function j1(i){i.oStatePreserverPromise=o.reuseComponentsReady.then(function(l1){var m1={appStateName:encodeURI("sap-iapp-state-"+o.routeConfig.entitySet),getCurrentState:function(){var o1=i.getCurrentState?i.getCurrentState():Object.create(null);var p1=function(q1,r1){if(q1.component.stGetCurrentState){var s1=q1.component.stGetCurrentState();for(var t1 in s1){o1["$embeddedComponent$"+r1.length+"$"+r1+"$"+t1]=s1[t1];}}};M(l1,p1);return o1;},applyState:function(o1,p1){var q1=Object.create(null);var r1=Object.create(null);for(var s1 in o1){if(s1.indexOf("$embeddedComponent$")===0){var t1=s1.substring(19);var u1=t1.indexOf("$");var v1=Number(t1.substring(0,u1));var w1=t1.substring(u1+1,u1+v1+1);var x1=r1[w1];if(!x1){x1=Object.create(null);r1[w1]=x1;}var y1=t1.substring(u1+v1+2);x1[y1]=o1[s1];}else{q1[s1]=o1[s1];}}(i.applyState||q.noop)(q1,p1);var z1=function(A1,B1){if(A1.component.stApplyState){A1.component.stApplyState(r1[B1]||Object.create(null),p1);}};o.oViewRenderedPromise.then(M.bind(null,l1,z1));},oComponent:c};var n1=o.oApplication.getStatePreserver(m1);o.oApplication.registerStateChanger(n1.getAsStateChanger());return n1;});o.oTemplateContract.oStatePreserversAvailablePromise=Promise.all([o.oTemplateContract.oStatePreserversAvailablePromise,i.oStatePreserverPromise]);}function k1(){var i=o.oTemplateContract.oFlexibleColumnLayoutHandler;return i?i.getFclProxy(t):{handleDataReceived:t.level?null:q.noop,isListAndFirstEntryLoadedOnStartup:t.level?null:q.noop};}return{setEditableNDC:function(i){o.oApplication.setEditableNDC(i);},getEditableNDC:function(){return o.oApplication.getEditableNDC();},getBusyHelper:function(){return o.oApplication.getBusyHelper();},isNonDraftCreate:f,attach:function(i,l1,m1){A(p(i),l1,m1);},detach:function(i,l1,m1){D(p(i),l1,m1);},fire:function(i,l1,m1){F(p(i),l1,m1);},isListReportTemplate:function(){return sap.suite.ui.generic.template.js.AnnotationHelper.isListReportTemplate(o.routeConfig);},getPreprocessorsData:l,getParameterModelForTemplating:m,bindComponent:Q,refreshBinding:V,refreshBindingUnconditional:T,suspendBinding:W,setBackNavigation:X,getTemplatePrivateModel:j,registerContext:Y,getViewLevel:k,getBreadCrumbInfo:Z,getCurrentKeys:$,getDraftRootPath:d1,getCommunicationObject:_,navigateRoute:a1,getTitleFromTreeNode:b1,isDraftEnabled:c1,isODataBased:e1,isComponentActive:r,navigateToDataLoadedFailedPage:x,getHeaderDataAvailablePromise:f1,getPaginatorInfo:g1,setPaginatorInfo:h1,onVisibilityChangeOfReuseComponent:i1,getNavigationFinishedPromise:s,setStatePreserverPromise:j1,unbind:U,getFclProxy:k1};}return B.extend("sap.suite.ui.generic.template.lib.ComponentUtils",{constructor:function(c,o){q.extend(this,g(c,o));}});});
