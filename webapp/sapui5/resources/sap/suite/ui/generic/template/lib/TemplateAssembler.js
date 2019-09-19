sap.ui.define(["jquery.sap.global","sap/ui/core/mvc/ControllerExtension","sap/ui/core/mvc/OverrideExecution","sap/ui/core/mvc/View","sap/suite/ui/generic/template/lib/TemplateViewController","sap/suite/ui/generic/template/lib/TemplateComponent","sap/suite/ui/generic/template/lib/CRUDManager","sap/suite/ui/generic/template/lib/CommonUtils","sap/suite/ui/generic/template/lib/ComponentUtils","sap/suite/ui/generic/template/lib/CommonEventHandlers","sap/suite/ui/generic/template/lib/testableHelper","sap/suite/ui/generic/template/support/lib/CommonMethods","sap/base/Log"],function(q,C,O,V,T,a,b,c,d,e,t,f,L){"use strict";var m=Object.create(null);var A=Object.create(null);var r=function(o){var s=o.appComponent.getId();A[s]=o;return function(){delete A[s];};};function g(o){var s=o.getId();var R=A[s];return R;}function h(o){return g(o.getAppComponent()).oTemplateContract.componentRegistry[o.getId()];}function F(o){while(o&&!(o instanceof V)){o=o.getParent();}return o;}function G(o){while(o){var v=F(o);var k=v&&v.getController();var l=k&&k.getOwnerComponent();if(l instanceof a){var n=h(l);return n;}else{o=l&&l.oContainer;}}}function i(s,o,k){var R=m[s];if(R){return R;}o=q.extend(true,{},o);k=q.extend(true,{},k);k.metadata=k.metadata||{};k.metadata.methods=k.metadata.methods||{};for(var l in k){if(typeof k[l]==="function"){var n=k.metadata.methods[l];if(!n){n={};k.metadata.methods[l]=n;}n.public=(n.public!==false);n.final=n.final||false;n.overrideExecution=n.overrideExecution||O.After;}}k.metadata.methods.getExtensionAPI={"public":true,"final":true};k.getExtensionAPI=function(){var p=this.getView().getController();return p.extensionAPI;};o.templateBaseExtension=C.extend(s+"BaseExtension",k);R=T.extend(s,o);m[s]=R;return R;}function j(o){var k=o.methods.oControllerSpecification;return k?function(){var l=o.oComponent.getAppComponent();var n=g(l);var p=l.getTransactionController();var N=l.getNavigationController();var s={oComponentUtils:o.utils,oServices:{oTemplateCapabilities:{},oApplicationController:l.getApplicationController(),oTransactionController:p,oNavigationController:N,oDraftController:p.getDraftController(),oApplication:n.application,oViewDependencyHelper:n.oViewDependencyHelper}};o.viewRegistered.catch(function(E){N.navigateToMessagePage({viewLevel:o.viewLevel,title:o.oTemplateContract.getText("ST_ERROR"),text:o.oTemplateContract.getText("ST_GENERIC_UNKNOWN_NAVIGATION_TARGET"),description:E.message});});o.oControllerUtils=s;var u=o.oComponent.getTemplateName();var v=i(u,k.oControllerDefinition,k.oControllerExtensionDefinition);var R=new v();o.oController=R;var M=k.getMethods(s,R);R._templateEventHandlers=Object.freeze(M.handlers||{});R._templateFormatters=Object.freeze(M.formatters||{});R.extensionAPI=Object.freeze(M.extensionAPI||{});var w;R.onInit=function(){var x=R.getView();w=x.getId();L.info("Init view "+w+" of template "+u);s.oServices.oApplicationController.registerView(x);s.oCommonUtils=new c(R,s.oServices,s.oComponentUtils);s.oServices.oCRUDManager=new b(R,s.oComponentUtils,s.oServices,s.oCommonUtils,n.oTemplateContract.oBusyHelper);s.oCommonEventHandlers=new e(R,s.oComponentUtils,s.oServices,s.oCommonUtils);(M.onInit||q.noop)();};R.onExit=function(){n.oTemplateContract.oApplicationProxy.destroyView(w);(M.onExit||q.noop)();L.info("View "+w+" of template "+u+" exited");};return R;}:q.noop;}r=t.testableStatic(r,"TemplateComponent_RegisterAppComponent");return{getTemplateComponent:function(k,s,o){var l=s+".Component";o=o||{};o.init=function(){var n=this.getComponentData();var p=n.registryEntry;p.viewRegistered=new Promise(function(R,w){p.fnViewRegisteredResolve=function(E){if(E){p.fnViewRegisteredResolve=q.noop;w(E);}else{delete p.fnViewRegisteredResolve;R();}};});p.oViewRenderedPromise=new Promise(function(R){p.fnViewRenderdResolve=R;});p.oViewRenderedPromise.then(function(){f.setApplicationStatus(f.mApplicationStatus.RENDERED);f.publishEvent("elements","ViewRendered",{});});p.reuseComponentProxies=Object.create(null);p.componentName=l;p.oComponent=this;p.aKeys=[];var u=g(p.oAppComponent);p.oTemplateContract=u.oTemplateContract;(a.prototype.init||q.noop).apply(this,arguments);p.utils=new d(this,p);p.methods=k(this,p.utils)||{};p.oGenericData={};p.mRefreshInfos=Object.create(null);var v=this.getId();p.oTemplateContract.componentRegistry[v]=p;p.oTemplateContract.oBusyHelper.setBusy(p.viewRegistered,true);p.oApplication=u.application;p.createViewController=j(p);p.componentCreateResolve(this);delete p.componentCreateResolve;delete n.registryEntry;(p.methods.init||q.noop)();};o.exit=function(){var n=this.getId();var p=h(this);var u=g(this.getAppComponent());var M=p.methods;(M.exit||q.noop)();delete u.oTemplateContract.componentRegistry[n];(a.prototype.exit||q.noop).apply(this,arguments);};o.onBeforeRendering=function(){var n=h(this);(a.prototype.onBeforeRendering||q.noop).bind(this,n).apply(this,arguments);var M=n.methods;(M.onBeforeRendering||q.noop)();};o.onAfterRendering=function(){var n=h(this);if(n.fnViewRenderdResolve&&!n.fnViewRegisteredResolve){n.fnViewRenderdResolve();delete n.fnViewRenderdResolve;}(a.prototype.onAfterRendering||q.noop).bind(this,n).apply(this,arguments);var M=n.methods;(M.onAftereRendering||q.noop)();};o.onActivate=function(B,I){var n=h(this);n.sCurrentBindingPath=B;var p=function(){n.utils.bindComponent(n.sCurrentBindingPath,I);n.utils.refreshBinding();return(n.methods.onActivate||q.noop)(B,I);};return n.fnViewRegisteredResolve?n.viewRegistered.then(p):(p()||Promise.resolve());};o.setIsRefreshRequired=function(I){if(I){var n=h(this);if(n.utils.isComponentActive()){n.viewRegistered.then(n.utils.refreshBinding.bind(null,true,{}));I=false;}}this.setProperty("isRefreshRequired",I);};o.onDeactivate=q.noop;return a.extend(l,o);},getRegisterAppComponent:function(){var R=r;r=null;return R;},getExtensionAPIPromise:function(o){var k=G(o);if(!k){return Promise.reject();}return k.viewRegistered.then(function(){return k.oController.extensionAPI;});},getExtensionAPI:function(o){var k=G(o);return k&&k.oController&&k.oController.extensionAPI;}};});
