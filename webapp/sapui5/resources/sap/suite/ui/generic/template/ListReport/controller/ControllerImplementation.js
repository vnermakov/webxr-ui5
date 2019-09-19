sap.ui.define(["jquery.sap.global","sap/suite/ui/generic/template/ListReport/extensionAPI/ExtensionAPI","sap/suite/ui/generic/template/listTemplates/listUtils","sap/suite/ui/generic/template/ListReport/controller/IappStateHandler","sap/suite/ui/generic/template/ListReport/controller/MultipleViewsHandler","sap/suite/ui/generic/template/ListReport/controller/WorklistHandler","sap/suite/ui/generic/template/lib/ShareUtils","sap/base/Log"],function(q,E,l,I,M,W,S,L){"use strict";return{getMethods:function(v,t,c){var s={};s.oWorklistData={};s.oWorklistData.bWorkListEnabled=false;s.oWorklistData.bVariantDirty=true;var b=true;var f;var w=null;function a(){var C=c.getOwnerComponent();var T=t.oComponentUtils.getTemplatePrivateModel();T.setProperty("/listReport/isLeaf",C.getIsLeaf());}function o(i){c.onInitSmartFilterBarExtension(i);c.templateBaseExtension.onInitSmartFilterBar(i);s.oIappStateHandler.onSmartFilterBarInitialise();}function d(){var A=s.oIappStateHandler.parseUrlAndApplyAppState();A.then(function(){b=false;},function(i){if(i instanceof Error){i.showMessageBox();}});}function e(){if(!b){s.oIappStateHandler.changeIappState(true,false);}}function u(C){var i=c.getOwnerComponent().getModel(),T=t.oComponentUtils.getTemplatePrivateModel();var p=i.getMetaModel();var r=t.oCommonUtils.getCurrentEntitySetName(C);var x=p.getODataEntitySet(r);var D=x["Org.OData.Capabilities.V1.DeleteRestrictions"];var y=false;if(sap.suite.ui.generic.template.js.AnnotationHelper.areDeleteRestrictionsValid(p,x.entityType,D)){var z=D&&D.Deletable&&D.Deletable.Path;var A=t.oCommonUtils.getSelectedContexts(C);y=A.some(function(B){var F=i.getObject(B.getPath()+"/DraftAdministrativeData");var G=!(F&&F.InProcessByUser&&!F.DraftIsProcessedByMe);return G&&!(z&&!i.getProperty(z,B));});}T.setProperty("/listReport/deleteEnabled",y);t.oCommonUtils.setEnabledToolbarButtons(C);if(!t.oCommonUtils.isSmartChart(C)){t.oCommonUtils.setEnabledFooterButtons(C);}}function O(i){var p=i.getParameters();var r=i.getSource();t.oCommonEventHandlers.onSemanticObjectLinkNavigationPressed(r,p);}function g(i){var p,r;p=i.getParameters();r=i.getSource();t.oCommonEventHandlers.onSemanticObjectLinkNavigationTargetObtained(r,p,s,undefined,undefined);}function h(i){var p,T,C,D,r,x;p=i.getParameters().mainNavigation;r=i.getParameters();x=i.getSource();if(p){T=x.getText&&x.getText();C=t.oCommonUtils.getCustomData(i);if(C&&C["LinkDescr"]){D=C["LinkDescr"];p.setDescription(D);}}x=x.getParent().getParent().getParent().getParent();t.oCommonEventHandlers.onSemanticObjectLinkNavigationTargetObtained(x,r,s,T,p);}function j(C){var p=v.getItems();for(var i=0;i<p.length;i++){if(!C||p[i].getBindingContextPath()===C){return p[i];}}}function n(i){t.oCommonEventHandlers.onListNavigate(i,s,c.onListNavigationExtension.bind(c),undefined,true);}function k(p,i){var r=i.getSource();t.oCommonUtils.processDataLossConfirmationIfNonDraft(function(){t.oCommonEventHandlers.addEntry(r,false,s.oSmartFilterbar,p);},q.noop,s);}function m(i){var C=c.getOwnerComponent().getCreateWithFilters();var p=C.strategy||"extension";var P;switch(p){case"extension":P=c.getPredefinedValuesForCreateExtension(s.oSmartFilterbar);break;default:L.error(p+" is not a valid strategy to extract values from the SmartFilterBar");return;}k(P,i);}return{onInit:function(){var A=c.getOwnerComponent().getAppComponent();var i=A.getConfig();s.oWorklistData.bWorkListEnabled=!!i.pages[0].component.settings&&i.pages[0].component.settings.isWorklist;s.oSmartFilterbar=c.byId("listReportFilter");s.oSmartTable=c.byId("listReport");s.updateControlOnSelectionChange=u;f=t.oComponentUtils.getFclProxy();s.bLoadListAndFirstEntryOnStartup=f.isListAndFirstEntryLoadedOnStartup();s.oMultipleViewsHandler=new M(s,c,t);s.oWorklistHandler=new W(s,c,t);s.oIappStateHandler=new I(s,c,t);if(s.oWorklistData.bWorkListEnabled){s.oWorklistHandler.fetchAndSaveWorklistSearchField();}var T=t.oComponentUtils.getTemplatePrivateModel();T.setProperty("/generic/bDataAreShownInTable",false);T.setProperty("/listReport/isHeaderExpanded",true);T.setProperty("/listReport/deleteEnabled",false);T.setProperty("/listReport/activeObjectEnabled",false);T.setProperty("/listReport/vDraftState","0");T.setProperty("/listReport/multipleViews/msgVisibility",false);t.oServices.oApplication.registerStateChanger({isStateChange:s.oIappStateHandler.isStateChange});v.getUrlParameterInfo=s.oIappStateHandler.getUrlParameterInfo;v.getItems=function(){var p=s.oSmartTable.getTable();if(t.oCommonUtils.isUiTable(p)){return p.getRows();}return p.getItems();};v.displayNextObject=function(p){return new Promise(function(r,x){w={aWaitingObjects:p,resolve:r,reject:x};});};v.onComponentActivate=function(){if(!b){s.oIappStateHandler.parseUrlAndApplyAppState();}};v.refreshBinding=function(U,p){if(s.oIappStateHandler.areDataShownInTable()){if(s.oMultipleViewsHandler.refreshOperation(2,null,!U&&p)){return;}if(U||p[s.oSmartTable.getEntitySet()]){t.oCommonUtils.refreshSmartTable(s.oSmartTable);}}};a();c.byId("template::FilterText").attachBrowserEvent("click",function(){c.byId("page").setHeaderExpanded(true);});},handlers:{addEntry:k.bind(null,undefined),addEntryWithFilters:m,deleteEntries:function(i){t.oCommonEventHandlers.deleteEntries(i);},updateTableTabCounts:function(){s.oMultipleViewsHandler.fnUpdateTableTabCounts();},onSelectionChange:function(i){var T=i.getSource();u(T);},onChange:function(i){t.oCommonEventHandlers.onChange(i);},onSmartFieldUrlPressed:function(i){t.oCommonEventHandlers.onSmartFieldUrlPressed(i,s);},onContactDetails:function(i){t.oCommonEventHandlers.onContactDetails(i);},onSmartFilterBarInitialise:o,onSmartFilterBarInitialized:d,onBeforeSFBVariantFetch:function(){s.oIappStateHandler.onBeforeSFBVariantFetch();},onAfterSFBVariantSave:function(){s.oIappStateHandler.onAfterSFBVariantSave();},onAfterSFBVariantLoad:function(i){s.oIappStateHandler.onAfterSFBVariantLoad(i);},onDataRequested:function(){s.oMultipleViewsHandler.onDataRequested();},onDataReceived:function(p){t.oCommonEventHandlers.onDataReceived(p);if(w){var r;var x=false;for(var i=0;i<w.aWaitingObjects.length&&!x;i++){r=j(w.aWaitingObjects[i]);if(r){n(r);w.resolve();x=true;}}if(!x){r=j();if(r){n(r);w.resolve();}else{w.reject();}}w=null;return;}var T=p.getSource().getTable();f.handleDataReceived(T,n);},onSmartChartDataReceived:function(){s.oMultipleViewsHandler.onDataRequested();},onBeforeRebindTable:function(i){s.oMultipleViewsHandler.aTableFilters=i.getParameters()&&i.getParameters().bindingParams&&q.extend(true,{},i.getParameters().bindingParams.filters);t.oCommonEventHandlers.onBeforeRebindTable(i,{determineSortOrder:s.oMultipleViewsHandler.determineSortOrder,ensureExtensionFields:c.templateBaseExtension.ensureFieldsForSelect,addExtensionFilters:c.templateBaseExtension.addFilters});c.onBeforeRebindTableExtension(i);s.oMultipleViewsHandler.onRebindContentControl(i);l.handleErrorsOnTableOrChart(t,i);},onShowDetails:function(i){t.oCommonEventHandlers.onShowDetails(i.getSource(),s);},onListNavigate:function(i){t.oCommonEventHandlers.onListNavigate(i,s,c.onListNavigationExtension.bind(c));},onCallActionFromToolBar:function(i){t.oCommonEventHandlers.onCallActionFromToolBar(i,s);},onDataFieldForIntentBasedNavigation:function(i){t.oCommonEventHandlers.onDataFieldForIntentBasedNavigation(i,s);},onDataFieldWithIntentBasedNavigation:function(i){t.oCommonEventHandlers.onDataFieldWithIntentBasedNavigation(i,s);},onBeforeSemanticObjectLinkPopoverOpens:function(i){var p=i.getParameters();t.oCommonUtils.processDataLossConfirmationIfNonDraft(function(){var r=JSON.stringify(s.oSmartFilterbar.getUiState().getSelectionVariant());t.oCommonUtils.semanticObjectLinkNavigation(p,r,c);},q.noop,s,q.noop);},onSemanticObjectLinkNavigationPressed:O,onSemanticObjectLinkNavigationTargetObtained:g,onSemanticObjectLinkNavigationTargetObtainedSmartLink:h,onDraftLinkPressed:function(i){var B=i.getSource();var p=B.getBindingContext();t.oCommonUtils.showDraftPopover(p,B);},onAssignedFiltersChanged:function(i){if(i.getSource()){c.byId("template::FilterText").setText(i.getSource().retrieveFiltersWithValuesAsText());}},onFilterChange:e,onToggleFiltersPressed:function(){var T=t.oComponentUtils.getTemplatePrivateModel();T.setProperty("/listReport/isHeaderExpanded",!T.getProperty("/listReport/isHeaderExpanded"));},onSearchButtonPressed:function(){t.oCommonUtils.refreshModel(s.oSmartTable);s.oIappStateHandler.changeIappState(false,true);},onSemanticObjectLinkPopoverLinkPressed:function(i){t.oCommonEventHandlers.onSemanticObjectLinkPopoverLinkPressed(i,s);},onAfterTableVariantSave:function(){s.oIappStateHandler.onAfterTableVariantSave();},onAfterApplyTableVariant:function(){if(!b){s.oIappStateHandler.onAfterApplyTableVariant();}},onAfterChartVariantSave:function(i){s.oIappStateHandler.onAfterTableVariantSave();},onAfterApplyChartVariant:function(i){if(!b){s.oIappStateHandler.onAfterApplyTableVariant();}},onBeforeRebindChart:function(i){s.oMultipleViewsHandler.aTableFilters=i.getParameters()&&i.getParameters().bindingParams&&q.extend(true,{},i.getParameters().bindingParams.filters);var p=i.getSource();var C={setBindingPath:p.setChartBindingPath.bind(p),ensureExtensionFields:q.noop,addExtensionFilters:c.templateBaseExtension.addFilters};t.oCommonUtils.onBeforeRebindTableOrChart(i,C,s.oSmartFilterbar);c.onBeforeRebindChartExtension(i);s.oMultipleViewsHandler.onRebindContentControl(i);l.handleErrorsOnTableOrChart(t,i);},onChartInitialise:function(i){s.oMultipleViewsHandler.fnRegisterToChartEvents(i);t.oCommonUtils.checkToolbarIntentsSupported(i.getSource());},onSelectionDetailsActionPress:function(i){s.oMultipleViewsHandler.onDetailsActionPress(i);},onShareListReportActionButtonPress:function(i){var F={shareEmailPressed:function(){var r=t.oCommonUtils.getText("EMAIL_HEADER",[t.oServices.oApplication.getAppTitle()]);sap.m.URLHelper.triggerEmail(null,r,document.URL);},shareJamPressed:function(){S.openJamShareDialog(t.oServices.oApplication.getAppTitle());},getDownloadUrl:function(){var T=s.oSmartTable.getTable();var r=T.getBinding("rows")||T.getBinding("items");return r&&r.getDownloadUrl()||"";},getServiceUrl:function(){var r=F.getDownloadUrl();if(r){r+="&$top=0&$inlinecount=allpages";}var x={serviceUrl:r};if(c.onSaveAsTileExtension){c.onSaveAsTileExtension(x);}return x.serviceUrl;},getCustomUrl:function(){if(!window.hasher){sap.ui.require("sap/ui/thirdparty/hasher");}var H=window.hasher.getHash();return H?("#"+H):window.location.href;},getModelData:function(){var G=q.sap.getObject("sap.ushell.Container.getUser");var r=c.getOwnerComponent();var A=r.getAppComponent();var x=A.getMetadata();var U=x.getManifestEntry("sap.ui");var y=(U&&U.icons&&U.icons.icon)||"";var z=x.getManifestEntry("sap.app");var T=(z&&z.title)||"";return{serviceUrl:F.getServiceUrl(),icon:y,title:T,isShareInJamActive:!!G&&G().isJamActive(),customUrl:F.getCustomUrl()};}};S.openSharePopup(t.oCommonUtils,i.getSource(),F);var p=this.getView().byId("template::Share");var B=this.getView().byId("bookmarkButton");B.setBeforePressHandler(function(){p.focus();});},onInlineDataFieldForAction:function(i){t.oCommonEventHandlers.onInlineDataFieldForAction(i,s);},onInlineDataFieldForIntentBasedNavigation:function(i){t.oCommonEventHandlers.onInlineDataFieldForIntentBasedNavigation(i.getSource(),s);},onDeterminingDataFieldForAction:function(i){t.oCommonEventHandlers.onDeterminingDataFieldForAction(i,s.oSmartTable);},onDeterminingDataFieldForIntentBasedNavigation:function(i){var B=i.getSource();t.oCommonEventHandlers.onDeterminingDataFieldForIntentBasedNavigation(B,s.oSmartTable.getTable(),s);},onTableInit:function(i){var p=i.getSource();t.oCommonUtils.checkToolbarIntentsSupported(p);},onSearchWorkList:function(i){s.oWorklistHandler.performWorklistSearch(i);},onWorkListTableSettings:function(i){s.oWorklistHandler.openWorklistPersonalisation(i);},onActiveButtonPress:function(i){var p=c.byId("template::PageVariant");var T=t.oComponentUtils.getTemplatePrivateModel();var A=T.getProperty("/listReport/activeObjectEnabled");if(s.oMultipleViewsHandler.getMode()==="multi"){s.oMultipleViewsHandler.setActiveButtonState(i);}else{T.setProperty("/listReport/activeObjectEnabled",!A);}p.currentVariantSetModified(true);s.oSmartFilterbar.search();s.oIappStateHandler.changeIappState(true,true);},onStateFilterChange:function(i){var T=t.oComponentUtils.getTemplatePrivateModel();var p=i.getSource().getSelectedKey();T.setProperty("/listReport/vDraftState",p);},onMessageCloseActionPress:function(){s.oMultipleViewsHandler.onMessageCloseActionPress();}},formatters:{formatDraftType:function(D,i,H){if(D&&D.DraftUUID){if(!i){return sap.m.ObjectMarkerType.Draft;}else if(H){return D.InProcessByUser?sap.m.ObjectMarkerType.Locked:sap.m.ObjectMarkerType.Unsaved;}}return sap.m.ObjectMarkerType.Flagged;},formatDraftVisibility:function(D,i){if(D&&D.DraftUUID){if(!i){return sap.m.ObjectMarkerVisibility.TextOnly;}}return sap.m.ObjectMarkerVisibility.IconAndText;},formatDraftLineItemVisible:function(D,A,i){if(D&&D.DraftUUID){if(i==="0"&&A){return false;}return true;}return false;},formatDraftOwner:function(D,H){var i="";if(D&&D.DraftUUID&&H){var U=D.InProcessByUserDescription||D.InProcessByUser||D.LastChangedByUserDescription||D.LastChangedByUser;if(U){i=t.oCommonUtils.getText("ST_DRAFT_OWNER",[U]);}else{i=t.oCommonUtils.getText("ST_DRAFT_ANOTHER_USER");}}return i;},formatItemTextForMultipleView:function(i){return s.oMultipleViewsHandler?s.oMultipleViewsHandler.formatItemTextForMultipleView(i):"";}},extensionAPI:new E(t,c,s)};}};});