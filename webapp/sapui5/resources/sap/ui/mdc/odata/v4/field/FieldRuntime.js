/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/core/XMLTemplateProcessor','sap/ui/core/util/XMLPreprocessor','sap/ui/core/Fragment','sap/ui/mdc/ResourceModel','sap/ui/fl/Utils','sap/base/Log'],function(X,a,F,R,f,L){"use strict";function _(s,S){var B=s.getBindingContext(),m=B.getModel().getMetaModel(),M=m.getMetaPath(B.getPath()),e=m.getObject(M)['$Type'];if(B.getBinding().getMetadata().getName()==='sap.ui.model.odata.v4.ODataListBinding'&&S===e){return B;}return b(s).getBindingContext();}function b(C){while(C&&!(C.getMetadata().getName()==="sap.ui.core.mvc.XMLView")){C=C.getParent();}return C;}var c={formatDraftOwnerText:function(h,d,D,s,e,i){var g='';if(h){var u=D||d||e||s;if(!i){g+=d?R.getText('draft.GENERIC_LOCKED_OBJECT_POPOVER_TEXT'):R.getText('draft.LAST_CHANGE_USER_TEXT')+' ';}g+=u?R.getText('draft.OWNER',[u]):R.getText('draft.ANOTHER_USER');}return g;},formatDraftOwnerTextInline:function(h,d,D,s,e){return c.formatDraftOwnerText(h,d,s,D,e,true);},formatDraftOwnerTextInPopover:function(h,d,D,s,e){return c.formatDraftOwnerText(h,d,s,D,e,false);},onDraftLinkPressed:function(e,E){var t=this,s=e.getSource(),v=f.getViewForControl(s),B=s.getBindingContext(),m=B.getModel().getMetaModel(),V=v.getId(),d;this.mDraftPopovers=this.mDraftPopovers||{};this.mDraftPopovers[V]=this.mDraftPopovers[V]||{};d=this.mDraftPopovers[V][E];if(d){d.setBindingContext(B);d.openBy(s);}else{var g='sap.ui.mdc.odata.v4.field.DraftPopOverAdminData',p=X.loadTemplate(g,'fragment');Promise.resolve(a.process(p,{},{bindingContexts:{entitySet:m.createBindingContext("/"+E)},models:{entitySet:m}})).then(function(o){return F.load({definition:o,controller:t});}).then(function(P){d=t.mDraftPopovers[V][E]=P;d.setModel(R.getModel(),"i18n");v.addDependent(d);d.setBindingContext(B);d.openBy(s);});}},closeDraftAdminPopover:function(e){e.getSource().getParent().getParent().close();},isSideEffectRequiredImmediately:function(B,s,S,d,m){if(!s||!S||!d||!m){return false;}var e=m.getMetaPath(B.getPath()),r=e.split('/')[1],g=m.getObject('/'+r)['$Type'];e=e.replace(r,g)+'/'+s;if(S.SourceProperties&&S.SourceProperties.length===1&&m.getObject('/'+d+'/'+S.SourceProperties[0]['$PropertyPath']+'@sapui.name')===m.getObject(e+'@sapui.name')){return true;}var h=false;if(S.SourceEntities){S.SourceEntities.forEach(function(o){var E=m.getObject('/'+d+'/'+o['$NavigationPropertyPath']+'/');if(E){Object.keys(E).every(function(k){if(k===m.getObject(e+'@sapui.name')&&E[k]['$kind']==='Property'){h=true;return false;}return true;});}});}return h;},requestSideEffects:function(s,S,o,d){var t=this,p=[],A=[],w=s.indexOf('#')>-1,e=(w&&s.split('#')[0])||s,q=(w&&s.split('#')[1])||'',g='/'+e+'@com.sap.vocabularies.Common.v1.SideEffects',B=S.getBindingContext(),m=B.getModel().getMetaModel(),C,h;g=(w&&(g+'#'+q))||g;h=m.getObject(g);if(h&&t.aPendingSideEffects.indexOf(s)>-1){if(o&&!this.isSideEffectRequiredImmediately(B,d,h,e,m)){return;}C=_(S,e);p=p.concat(h.TargetProperties||[]).concat(h.TargetEntities||[]);p.forEach(function(P){if(P['$PropertyPath']){var T=m.getObject('/'+e+'/'+P['$PropertyPath']+'@com.sap.vocabularies.Common.v1.Text');if(T&&T['$Path']){A.push({'$PropertyPath':T['$Path']});}}});p=p.concat(A);if(p.length){C.requestSideEffects(p).then(function(){},function(){L.info('FieldRuntime: Failed to request side effect - '+g,'sap.ui.mdc.odata.v4.field.FieldRuntime','requestSideEffects');});t.aPendingSideEffects.splice(t.aPendingSideEffects.indexOf(s),1);}}},handleChange:function(e){var t=this,s=e.getSource(),B=s.getBindingInfo('value'),d=B.parts.map(function(p){return p.path;}),g=d[0];this.aPendingSideEffects=this.aPendingSideEffects||[];if(s.getFieldGroupIds()){s.getFieldGroupIds().forEach(function(h){if(t.aPendingSideEffects.indexOf(h)===-1){t.aPendingSideEffects.push(h);}t.requestSideEffects(h,s,true,g);});}},handleSideEffect:function(e){if(!this.aPendingSideEffects||this.aPendingSideEffects.length===0){return;}var t=this,d=e.getParameter('fieldGroupIds'),s=e.getSource();d=d||[];d.forEach(function(g){t.requestSideEffects(g,s,false);});}};return c;},true);
