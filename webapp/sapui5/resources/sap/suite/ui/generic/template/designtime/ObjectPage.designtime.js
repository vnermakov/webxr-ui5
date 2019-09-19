/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/suite/ui/generic/template/designtime/library.designtime","sap/suite/ui/generic/template/designtime/SmartForm.designtime","sap/suite/ui/generic/template/designtime/Group.designtime","sap/suite/ui/generic/template/designtime/ObjectPageLayout.designtime","sap/suite/ui/generic/template/designtime/ObjectPageSection.designtime","sap/suite/ui/generic/template/designtime/GroupElement.designtime","sap/suite/ui/generic/template/designtime/ObjectPageHeader.designtime","sap/suite/ui/generic/template/designtime/ObjectPageHeaderActionButton.designtime","sap/suite/ui/generic/template/designtime/ObjectPageDynamicHeaderTitle.designtime","sap/suite/ui/generic/template/changeHandler/util/ChangeHandlerUtils","sap/suite/ui/generic/template/designtime/utils/DesigntimeUtils","sap/suite/ui/generic/template/designtime/ObjectPageSubSection.designtime","sap/suite/ui/generic/template/designtime/HeaderFacet.designtime","sap/suite/ui/generic/template/changeHandler/util/AnnotationChangeUtilsV2","sap/suite/ui/generic/template/designtime/Column.designtime","sap/suite/ui/generic/template/designtime/Table.designtime"],function(l,S,G,O,a,b,c,d,e,U,D,f,H,A,C,T){"use strict";var r=sap.ui.getCore().getModel("i18nDesigntime").getResourceBundle();var g="com.sap.vocabularies.UI.v1.DataFieldForAction";var h="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation";var i="DataFieldForAction";var j="DataFieldForIntentBasedNavigation";var k=function(E,P){while(E){if(E.getMetadata().getElementName()===P){return true;}else if(E.getMetadata().getElementName()==='sap.ui.core.mvc.XMLView'){break;}else if(E.getParent()){E=E.getParent();}else{break;}}return false;};var m=function(t,P){var q=[];if(t.getId().indexOf("-template::ObjectPage::FooterToolbar")>-1){q=t.getContent();}else{q=t.getParent().getContent();}var u="addFooterActionButton";return D.addSettingsHandler(t,P,q,u);};var n=function(E){var v={DataFieldForAction:{displayName:"DataField For Action"},DataFieldForIntentBasedNavigation:{displayName:"DataField For IBN"}};return v;};var o=function(E){var t=U.getTemplatingInfo(E);var R=t&&t.annotationContext;var q;if(R){switch(R.RecordType){case g:q=i;break;case h:q=j;break;default:break;}}return q;};var p=function(R,q){var P,t={Label:{},Action:{}},u={};if(R===g){u[g]=jQuery.extend({},t,{InvocationGrouping:{EnumMember:"com.sap.vocabularies.UI.v1.OperationGroupingType/Isolated"}});}else{u[h]=jQuery.extend({},t,{SemanticObject:{String:""}});}var N={"com.sap.vocabularies.UI.v1.Importance":{EnumMember:"com.sap.vocabularies.UI.v1.ImportanceType/High"},RecordType:R,Determining:{Bool:"true"}};jQuery.extend(true,N,u[R]);for(P in N){if(P!=="Determining"&&P!=="RecordType"&&q[P]){jQuery.extend(N[P],q[P]);}if(jQuery.isEmptyObject(N[P])){delete N[P];}}return N;};var s=function(q,N,t){var u=o(q);if(u===N){return;}var R="";var M={};var v={};var E={};var w=[];var x=[];var y="";var z=-1;var B={};var F=[];switch(N){case i:R=g;break;case j:R=h;break;default:break;}if(!R){return;}var I=q.getModel();M=I&&I.getMetaModel();v=U.getTemplatingInfo(q);E=M.getODataEntityType(v.target);y=v.annotation;w=E[y];x=JSON.parse(JSON.stringify(w));z=U.getIndexFromInstanceMetadataPath(q);if(z===-1){throw"invalid index for old determining action";}var J=v&&v.annotationContext;var K=p(R,J);var L={"annotation":y,"annotationContext":K,"path":v.path,"target":E.namespace+"."+E.name,"value":v.value};q.data("sap-ui-custom-settings")["sap.ui.dt"].annotation=L;w.splice(z,1,K);B=A.createCustomAnnotationTermChange(v.target,w,x,y);F.push(B);t.noRefreshOnChange=true;return F;};return{'default':{controllerExtensionTemplate:"sap/suite/ui/generic/template/designtime/ObjectPageControllerExtensionTemplate"},'strict':{name:{singular:function(){return r.getText("FE_OBJECT_PAGE");}},aggregations:{content:{ignore:false,propagateRelevantContainer:true,propagateMetadata:function(E){var t;if(E.getMetadata().getElementName){switch(E.getMetadata().getElementName()){case"sap.uxap.ObjectPageLayout":return O.getDesigntime(E);case"sap.uxap.ObjectPageSection":t=U.getTemplatingInfo(E);if(!t){return{actions:"not-adaptable"};}return a.getDesigntime(E);case"sap.uxap.ObjectPageSubSection":t=U.getTemplatingInfo(E);if(!t){return{actions:"not-adaptable"};}return f.getDesigntime(E);case"sap.ui.comp.smartform.SmartForm":if(k(E,"sap.uxap.ObjectPageSubSection")===true){return S.getDesigntime(E);}break;case"sap.ui.comp.smartform.Group":if(k(E,"sap.uxap.ObjectPageSubSection")===true){return G.getDesigntime(E);}break;case"sap.ui.comp.smartform.GroupElement":if(k(E,"sap.uxap.ObjectPageSubSection")===true){return b.getDesigntime(E);}break;case"sap.m.Table":return T.getDesigntime(E);case"sap.m.Column":return C.getDesigntime(E);case"sap.ui.comp.smarttable.SmartTable":return{name:{singular:function(){return r.getText("FE_SMARTTABLE");}},aggregations:{"semanticKeyAdditionalControl":{ignore:true}},annotations:{phoneNumber:{ignore:true},emailAddress:{ignore:true},sortable:{ignore:true},filterable:{ignore:true},columnLabelOnProperty:{ignore:true},columnVisible:{ignore:true},columnCurrencyCode:{ignore:true},columnUnitOfMeasure:{ignore:true},columnUpperCase:{ignore:true},columnImportance:{ignore:true},columnDataField:{ignore:true},columnText:{ignore:true},textArrangement:{ignore:true},columnIsImageURL:{ignore:true},columnDataFieldWithUrl:{ignore:true},columnCriticality:{ignore:true},columnCriticalityRepresentationType:{ignore:true},columnCalendarDate:{ignore:true},lineItem:{ignore:true},semanticKey:{ignore:true},semanticObject:{ignore:true},headerLabel:{namespace:"com.sap.vocabularies.UI.v1",annotation:"HeaderInfo",target:["EntityType"],whiteList:{properties:["TypeNamePlural"]},appliesTo:["SmartTable/header"],links:{developer:[{href:"/topic/f9962074132a43db9e1381291f8f3af8.html",text:function(){return r.getText("FE_SDK_GUIDE_ST_HEADER");}}],guidelines:[]},group:["Appearance"]},presentationVariant:{ignore:true}}};case"sap.uxap.ObjectPageHeaderContent":return{name:{singular:function(){return r.getText("FE_OBJECT_PAGE_HEADER_CONTENT");}},aggregations:{content:{childNames:{singular:function(){return r.getText("FE_OBJECT_PAGE_HEADER_FACET");}},actions:{move:function(E){if(E.getId().indexOf("Extension")===-1&&E.getMetadata().getElementName()!=="sap.m.Image"){return"moveHeaderFacet";}},createContainer:{changeType:"addHeaderFacet",changeOnRelevantContainer:true,getCreatedContainerId:function(N){return N;}}}}}};case"sap.m.FlexBox":if(k(E,"sap.uxap.ObjectPageDynamicHeaderContent")){return{name:{singular:function(){return r.getText("FE_DYNAMIC_HEADER_CONTENT_FLEXBOX");}},aggregations:{items:{childNames:{singular:function(){return r.getText("FE_OBJECT_PAGE_HEADER_FACET");}},actions:{move:function(E){if(E.getId().indexOf("Extension")===-1&&E.getMetadata().getElementName()!=="sap.f.Avatar"){return"moveHeaderFacet";}},createContainer:{changeType:"addHeaderFacet",changeOnRelevantContainer:true,getCreatedContainerId:function(N){return N;}}}}}};}break;case"sap.m.VBox":if(k(E,"sap.uxap.ObjectPageHeaderContent")||k(E,"sap.uxap.ObjectPageDynamicHeaderContent")){if(E.getId().indexOf("Extension")>=0){return{actions:null};}return H.getDesigntime(E);}break;case"sap.uxap.ObjectPageHeader":return c.getDesigntime(E);case"sap.uxap.ObjectPageDynamicHeaderTitle":return e.getDesigntime(E);case"sap.uxap.ObjectPageHeaderActionButton":var q=/.+(sap.suite.ui.generic.template.ObjectPage.view.Details::).+(?:--edit|--delete|--relatedApps|--template::Share|--template::NavigationUp|--template::NavigationDown|--fullScreen|--exitFullScreen|--closeColumn)$/;var t=U.getTemplatingInfo(E);if(q.test(E.getId())||!t){return{actions:null};}return d.getDesigntime(E);case"sap.ui.comp.smartfield.SmartField":return{name:{singular:function(){return r.getText("FE_FIELD");},plural:function(){return r.getText("FE_FIELDS");}},annotations:{dataType:{ignore:true},fieldCreatable:{ignore:true},fieldLabel:{ignore:true},fieldCurrencyCode:{ignore:true},fieldUnitOfMeasure:{ignore:true},fieldScale:{ignore:true},fieldQuickInfo:{ignore:true},fieldMultiLineText:{ignore:true},fieldUpperCase:{ignore:true},fieldDigitSequence:{ignore:true},fieldCalendarDate:{ignore:true},fieldEmailAddress:{ignore:true},fieldPhoneNumber:{ignore:true},fieldUrl:{ignore:true},fieldComputed:{ignore:true},fieldControl:{ignore:true},fieldVisible:{ignore:true},fieldImmutable:{ignore:true},fieldMandatory:{ignore:true},fieldMasked:{ignore:true},fieldReadOnly:{ignore:true},fieldRecommendationState:{ignore:true},fieldSideEffects:{ignore:true},fieldText:{ignore:true},fieldUpdatableEntitySet:{ignore:true},textArrangement:{ignore:true},valueListWithFixedValues:{ignore:true},valueList:{ignore:true}}};case"sap.ui.comp.navpopover.SmartLink":return{name:{singular:function(){return r.getText("FE_LINK");},plural:function(){return r.getText("FE_LINKS");}},annotations:{semanticObjectMapping:{ignore:true},semanticObjectUnavailableActions:{ignore:true},contact:{ignore:true}},actions:null};case"sap.ui.comp.smartfield.Configuration":case"sap.ui.comp.smartfield.ControlProposal":case"sap.ui.comp.smartfield.ObjectStatus":case"sap.ui.comp.navpopover.SemanticObjectController":case"sap.m.DraftIndicator":return{actions:null};case"sap.m.Button":if(E.getId().indexOf("::Determining")>=0){return{getCommonInstanceData:function(E){var t=U.getTemplatingInfo(E);if(t&&t.path){var u=t.target+'/'+t.path.substr(t.path.indexOf("com.sap.vocabularies.UI.v1.Identification"));return{target:u,annotation:t.annotation,qualifier:null};}},name:{singular:function(){return r.getText("FE_BUTTON");}},links:{developer:[{href:"/topic/1743323829e5474eb3829d2e9ab022ae",text:function(){return r.getText("FE_SDK_GUIDE_DETERMINING_ACTIONS");}}]},properties:{determiningActionType:{name:r.getText("FE_DETERMINING_ACTION_TYPE"),virtual:true,ignore:false,type:"EnumType",possibleValues:n(E),get:o.bind(E),set:s.bind(E)}},actions:{remove:{changeType:"removeHeaderAndFooterActionButton",changeOnRelevantContainer:true},rename:null,reveal:null,settings:{name:"Add Action Button",handler:m,icon:"sap-icon://add"}},annotations:{dataFieldForAction:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataFieldForAction",whiteList:{properties:["Action","Label","Criticality","InvocationGrouping"]},ignore:function(){var u=U.getTemplatingInfo(E);var R=u&&u.annotationContext;return!R||R.RecordType!=="com.sap.vocabularies.UI.v1.DataFieldForAction";},appliesTo:["Button"],links:{developer:[{href:"/topic/1743323829e5474eb3829d2e9ab022ae",text:function(){return r.getText("FE_SDK_GUIDE_DETERMINING_ACTIONS");}}]}},dataFieldForIBN:{namespace:"com.sap.vocabularies.UI.v1",annotation:"DataFieldForIntentBasedNavigation",whiteList:{properties:["Action","Label","Criticality","SemanticObject"]},ignore:function(){var u=U.getTemplatingInfo(E);var R=u&&u.annotationContext;return!R||R.RecordType!=="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation";},appliesTo:["Button"],links:{developer:[{href:"/topic/1743323829e5474eb3829d2e9ab022ae",text:function(){return r.getText("FE_SDK_GUIDE_DETERMINING_ACTIONS");}}]}},importance:{namespace:"com.sap.vocabularies.UI.v1",annotation:"Importance",defaultValue:null,target:["Record"],appliesTo:["Button"],links:{developer:[{href:"/topic/1743323829e5474eb3829d2e9ab022ae",text:function(){return r.getText("FE_SDK_GUIDE_DETERMINING_ACTIONS");}}]}}}};}else{return{actions:null};}break;case"sap.m.OverflowToolbar":if(E.getId().indexOf("--template::ObjectPage::FooterToolbar")>=0){return{name:{singular:function(){return r.getText("FE_FOOTER_TOOLBAR");}},actions:{settings:{name:"Add Action Button",handler:m,icon:"sap-icon://add"},reveal:null},aggregations:{content:{propagateRelevantContainer:true,actions:{move:function(E){switch(E.getMetadata().getElementName()){case"sap.m.Button":if(E.getId().indexOf("::Determining")>=0){return"moveHeaderAndFooterActionButton";}}}}}}};}else{return{actions:null};}break;default:return{actions:null};}}else{return{actions:null};}}}},actions:{},annotations:{}}};},true);
