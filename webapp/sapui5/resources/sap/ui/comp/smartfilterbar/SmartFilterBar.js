/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'sap/m/MessageBox','sap/ui/comp/filterbar/FilterBar','sap/ui/comp/filterbar/FilterGroupItem','sap/ui/comp/filterbar/FilterItem','sap/ui/comp/library','./AdditionalConfigurationHelper','./ControlConfiguration','./FilterProvider','./GroupConfiguration','sap/ui/comp/util/FormatUtil','sap/ui/comp/smartvariants/PersonalizableInfo','sap/ui/comp/smartvariants/SmartVariantManagement','sap/ui/comp/odata/ODataModelUtil','sap/ui/core/library','sap/ui/comp/variants/VariantItem','sap/ui/model/odata/AnnotationHelper','sap/ui/model/Context','sap/ui/comp/filterbar/VariantConverterFrom',"sap/base/Log"],function(q,M,F,a,b,l,A,C,c,G,d,P,S,O,f,V,g,h,k,L){"use strict";var m=f.ValueState;var n=l.smartfilterbar.FilterType;var o=F.extend("sap.ui.comp.smartfilterbar.SmartFilterBar",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartfilterbar/SmartFilterBar.designtime",properties:{entityType:{type:"string",group:"Misc",defaultValue:null},entitySet:{type:"string",group:"Misc",defaultValue:null},resourceUri:{type:"string",group:"Misc",defaultValue:null},basicSearchFieldName:{type:"string",group:"Misc",defaultValue:null},enableBasicSearch:{type:"boolean",group:"Misc",defaultValue:false},liveMode:{type:"boolean",group:"Misc",defaultValue:false},showMessages:{type:"boolean",group:"Misc",defaultValue:true},considerAnalyticalParameters:{type:"boolean",group:"Misc",defaultValue:false},useDateRangeType:{type:"boolean",group:"Misc",defaultValue:null},suppressSelection:{type:"boolean",group:"Misc",defaultValue:false},considerSelectionVariants:{type:"boolean",group:"Misc",defaultValue:false},defaultSelectionVariantName:{type:"string",group:"Misc",defaultValue:null},useProvidedNavigationProperties:{type:"boolean",group:"Misc",defaultValue:false},navigationProperties:{type:"string",group:"Misc",defaultValue:""}},associations:{smartVariant:{type:"sap.ui.comp.smartvariants.SmartVariantManagement",multiple:false}},aggregations:{controlConfiguration:{type:"sap.ui.comp.smartfilterbar.ControlConfiguration",multiple:true,singularName:"controlConfiguration"},groupConfiguration:{type:"sap.ui.comp.smartfilterbar.GroupConfiguration",multiple:true,singularName:"groupConfiguration"}},events:{pendingChange:{pendingValue:{type:"boolean"}}}},renderer:function(r,e){F.getMetadata().getRenderer().render(r,e);}});o.LIVE_MODE_INTERVAL=300;o.SELECTION_VARIANT_KEY_PREFIX="#";o.prototype.init=function(){if(!c){c=sap.ui.require("sap/ui/comp/smartfilterbar/FilterProvider");}this._bCreateFilterProviderCalled=false;this._aFilterBarViewMetadata=null;this.isRunningInValueHelpDialog=false;F.prototype.init.apply(this);sap.ui.getCore().getMessageManager().registerObject(this,true);};o.prototype._initializeMetadata=function(){if(!this.bIsInitialised){O.handleModelInit(this,this._onMetadataInitialised);}};o.prototype._onMetadataInitialised=function(){var r,e,E,s;this._bMetaModelLoadAttached=false;if(!this.bIsInitialised&&!this._bCreateFilterProviderCalled){e=this.getModel();r=this.getResourceUri();E=this.getEntityType();s=this.getEntitySet();if((e||r)&&(E||s)){this._bCreateFilterProviderCalled=true;this._createFilterProvider(e,r,E,s).then(function(i){if(i){if(this.bIsDestroy){i.destroy();return;}this._oFilterProvider=i;this._aFilterBarViewMetadata=this._oFilterProvider.getFilterBarViewMetadata();if(this._aFilterBarViewMetadata){this._attachAdditionalConfigurationChanged();this.bIsInitialised=true;this.setModel(this._oFilterProvider.oModel,this._oFilterProvider.sFilterModelName);this.registerGetFiltersWithValues(this.getFiltersWithValues.bind(this));this.registerFetchData(function(v){return this.getFilterDataAsStringForVariant(true,v);}.bind(this));this.registerApplyData(function(j,v){this.setFilterDataAsStringFromVariant(j,true,v);}.bind(this));this._initializeVariantManagement();}this._oFilterProvider.attachPendingChange(function(j){this.firePendingChange({pendingValue:j.getParameter("pending")});}.bind(this));}}.bind(this));}}};o.prototype.getModelData=function(){var D=null;if(this._oFilterProvider){D=this._oFilterProvider.getModel().getData();}return D;};o.prototype.getFilterContextUrl=function(){var s=null;if(this._oFilterProvider){s=this._oFilterProvider.getFilterContextUrl();}return s;};o.prototype.getParameterContextUrl=function(){var p=null;if(this._oFilterProvider){p=this._oFilterProvider.getParameterContextUrl();}return p;};o.prototype.getFilterBarViewMetadata=function(){return this._aFilterBarViewMetadata;};o.prototype.getAnalyticalParameters=function(){return this._oFilterProvider?this._oFilterProvider.getAnalyticParameters():[];};o.prototype.getSelectionVariants=function(){var s=null;if(this._oFilterProvider){s=this._oFilterProvider.getSelectionVariants();if(Object.keys(s).length<1){s=null;}}return s;};o.prototype._createFilterProvider=function(e,r,E,s){return c._createFilterProvider({basicSearchFieldName:this.getBasicSearchFieldName(),enableBasicSearch:this.getEnableBasicSearch(),entityType:E,entitySet:s,serviceUrl:r,isRunningInValueHelpDialog:this.isRunningInValueHelpDialog,model:e,additionalConfiguration:this.getAdditionalConfiguration(),defaultDropDownDisplayBehaviour:this.data("defaultDropDownDisplayBehaviour"),defaultTokenDisplayBehaviour:this.data("defaultTokenDisplayBehaviour"),dateFormatSettings:this.data("dateFormatSettings"),useContainsAsDefaultFilter:this.data("useContainsAsDefaultFilter"),smartFilter:this,considerAnalyticalParameters:this.getConsiderAnalyticalParameters(),useDateRangeType:this.getUseDateRangeType(),considerSelectionVariants:this.getConsiderSelectionVariants(),considerNavigations:this.getUseProvidedNavigationProperties()?this._createArrayFromString(this.getNavigationProperties()):null});};o.prototype._createArrayFromString=function(s){if(!s){return[];}var e=[];var r=s.split(",");r.forEach(function(i){if(i!==""){e.push(i.trim());}});return e;};o.prototype._attachAdditionalConfigurationChanged=function(){var e,j,i,p;j=this.getGroupConfiguration();p=j.length;for(i=0;i<p;i++){j[i].attachChange(this._handleGroupConfigurationChanged.bind(this));}e=this.getControlConfiguration();p=e.length;for(i=0;i<p;i++){e[i].attachChange(this._handleControlConfigurationChanged.bind(this));}};o.prototype._handleControlConfigurationChanged=function(e){var p,i,j,K,v;p=e.getParameter("propertyName");i=e.oSource;if(!i){return;}K=i.getKey();j=this._getFilterItemByName(K);if(!j){this._handleControlConfigurationChangedForDelayedFilterItems(K,i,p);return;}if(p==="visible"){v=i.getVisible();j.setVisible(v);}else if(p==="label"){v=i.getLabel();j.setLabel(v);}else if(p==="visibleInAdvancedArea"){v=i.getVisibleInAdvancedArea();if(j.setVisibleInAdvancedArea){j.setVisibleInAdvancedArea(v);}}};o.prototype._handleControlConfigurationChangedForDelayedFilterItems=function(K,e,p){var v,i=null;if(this._aFilterBarViewMetadata){this._aFilterBarViewMetadata.some(function(j){j.fields.some(function(I){if(I.fieldName===K){i=I;}return i?true:false;});return i?true:false;});}if(i){if(p==="visible"){v=e.getVisible();i.isVisible=v;}else if(p==="label"){v=e.getLabel();i.label=v;}else if(p==="visibleInAdvancedArea"){v=e.getVisibleInAdvancedArea();i.visibleInAdvancedArea=v;}}};o.prototype._handleGroupConfigurationChanged=function(e){var p,i;p=e.getParameter("propertyName");i=e.oSource;if(p==="label"){this._handleGroupConfigurationLabelChanged(i);}};o.prototype._handleGroupConfigurationLabelChanged=function(e){var i,K,s;if(!e){return;}s=e.getLabel();K=e.getKey();i=this._getFilterGroupItemByGroupName(K);if(i){i.setGroupTitle(s);}else{this._handleGroupConfigurationLabelChangedForDelayedFilterItems(K,s);}};o.prototype._handleGroupConfigurationLabelChangedForDelayedFilterItems=function(K,s){var e=null;if(this._aFilterBarViewMetadata){this._aFilterBarViewMetadata.some(function(i){if(i.groupName===K){e=i;}return e?true:false;});}if(e){e.groupLabel=s;}};o.prototype._getFilterItemByName=function(N){return this.determineFilterItemByName(N);};o.prototype._getFilterGroupItemByGroupName=function(N){return this.determineFilterItemByName(N);};o.prototype.getAdditionalConfiguration=function(){return new A(this.getControlConfiguration(),this.getGroupConfiguration());};o.prototype.setEntityType=function(e){this.setProperty("entityType",e);this._initializeMetadata();return this;};o.prototype.setEntitySet=function(e){this.setProperty("entitySet",e);this._initializeMetadata();return this;};o.prototype.setResourceUri=function(r){this.setProperty("resourceUri",r);this._initializeMetadata();return this;};o.prototype.propagateProperties=function(){F.prototype.propagateProperties.apply(this,arguments);this._initializeMetadata();};o.prototype._getFilterInformation=function(){var e,i,j,p=0,r=0,s,t=[],u;if(this._aFilterBarViewMetadata){p=this._aFilterBarViewMetadata.length;for(i=0;i<p;i++){e=this._aFilterBarViewMetadata[i];s=e.fields;r=s.length;for(j=0;j<r;j++){u=s[j];if(u.name===c.BASIC_SEARCH_FIELD_ID){this.setBasicSearch(u.control);this._attachToBasicSearch(u.control);continue;}else if(e.groupName===c.BASIC_FILTER_AREA_ID){this._createFieldInAdvancedArea({groupName:F.INTERNAL_GROUP,groupLabel:""},u);}else{this._createFieldInAdvancedArea(e,u);}t.push(u);}}var v=this.getAnalyticalParameters();p=v.length;for(i=0;i<p;i++){u=v[i];this._createAnalyticParameter(u);t.push(u);}}return t;};o.prototype._validateState=function(){var e=null,i,j,I=false;e=this.getAllFilterItems(true);if(e){i=e.length;while(i--){j=this.determineControlByFilterItem(e[i],true);if(j){if(j.__bValidatingToken){this.bIsSearchPending=true;I=true;break;}else if(j.getValueState&&j.getValueState()===m.Error&&!j.data("__mandatoryEmpty")){I=true;break;}}}}if(this._oFilterProvider){return!I&&!this._oFilterProvider._validateConditionTypeFields();}else{return!I;}};o.prototype._isDateRangeTypeFilter=function(s){if(this._oFilterProvider&&this._oFilterProvider._mConditionTypeFields[s]){return true;}return false;};o.prototype._specialControls=function(e,s){if(e.setValue){if(this._isDateRangeTypeFilter(s)){return true;}else{if(e.isA("sap.m.DatePicker")){return true;}}}return false;};o.prototype._clearErroneusControlValues=function(){var e=null,i,j,v;e=this.getAllFilterItems(true);if(e){i=e.length;while(i--){j=this.determineControlByFilterItem(e[i],true);if(j){if(j.getValueState&&j.getValueState()===m.Error){v=j.getBinding("value");if(v&&!this._specialControls(j,e[i].getName())){v.checkUpdate(true);}else if(j.setValue){j.setValue("");j.setValueState(m.None);}}}}}};o.prototype._attachToBasicSearch=function(B){if(B){B.attachSearch(function(e){if(e&&e.getParameter("clearButtonPressed")){return;}if(!this.isDialogOpen()){this.search();}}.bind(this));B.attachLiveChange(this._onChange.bind(this));}};o.prototype._onLiveChange=function(e){var i=e.getSource();if(i.data("__validationError")&&!i.getValue()){i.data("__validationError",null);i.setValueState(m.None);delete i.__sValidationText;}};o.prototype._onChange=function(e){var i=e.getSource();if(i.data("__mandatoryEmpty")){i.data("__mandatoryEmpty",null);i.setValueState(m.None);}if(i.data("__validationError")&&!i.getValue()){i.data("__validationError",null);i.setValueState(m.None);}if(i.isA("sap.m.ComboBox")&&i.getValue()){if(!i.getSelectedItem()){i.data("__validationError",true);i.setValueState(m.Error);return;}if(i.data("__validationError")){i.data("__validationError",null);i.setValueState(m.None);}}if(this._oFilterProvider._bUpdatingFilterData||this._oFilterProvider._bCreatingInitialModel){return;}if(!i||(i&&!i.__bValidatingToken)){this.fireFilterChange(e);this._oFilterProvider._updateConditionTypeFields(e.getParameter("filterChangeReason"));}else{this._filterSetInErrorState(i);}if(this.isLiveMode()){this.search();}};o.prototype._handleChange=function(e){if(e){if(e.attachChange){e.attachChange(this._onChange.bind(this));}if(e.attachLiveChange){e.attachLiveChange(this._onLiveChange.bind(this));}}};o.prototype._handleEnter=function(i){if(this.isLiveMode()){return;}i.attachBrowserEvent("keydown",function(e){if(e.which===13){i.__bSuggestInProgress=(i._oSuggestionPopup&&i._oSuggestionPopup.isOpen());}});i.attachBrowserEvent("keyup",function(e){if(e.which===13&&!i.__bSuggestInProgress){this.search();}}.bind(this));};o.prototype._createFilterFieldControl=function(e){if(e.conditionType){e.control=e.conditionType.initializeFilterItem();}else if(!e.control&&e.fCreateControl){e.fCreateControl(e);delete e.fCreateControl;}this._handleEnter(e.control);this._handleChange(e.control);};o.prototype._createAnalyticParameter=function(p){p.factory=function(){this._createFilterFieldControl(p);if(!p.control){return;}var e=new a({controlTooltip:p.quickInfo,name:p.fieldName,mandatory:p.isMandatory,visible:p.isVisible,control:p.control,hiddenFilter:false});this._setLabel(e,p.label);this._addParameter(e);}.bind(this);p.groupName=F.INTERNAL_GROUP;return p;};o.prototype._createFieldInAdvancedArea=function(e,i){i.factory=function(){this._createFilterFieldControl(i);var j=new a({controlTooltip:i.quickInfo,name:i.fieldName,groupName:e.groupName,groupTitle:e.groupLabel,entitySetName:i.groupEntitySet,entityTypeName:i.groupEntityType,mandatory:i.isMandatory,visible:i.isVisible,visibleInAdvancedArea:i.visibleInAdvancedArea||(e.groupName===F.INTERNAL_GROUP),control:i.control,hiddenFilter:i.hiddenFilter});if(i.isCustomFilterField){j.data("isCustomField",true);}this._setLabel(j,i.label);this.addFilterGroupItem(j);}.bind(this);i.groupName=e.groupName;i.groupTitle=e.groupLabel;return i;};o.prototype._setLabel=function(e,s){if(s.match(/{@i18n>.+}/gi)){e.bindProperty("label",s.substring(1,s.length-1));}else{e.setLabel(s);}};o.prototype._logAccessWhenNotInitialized=function(s){if(!this.bIsInitialised){L.error("SmartFilterBar."+s+": called before the SmartFilterBar is initialized");}};o.prototype.ensureLoadedValueHelp=function(s){this._logAccessWhenNotInitialized("ensureLoadedValueHelp");if(this._oFilterProvider){this._oFilterProvider.getAssociatedValueHelpProviders().some(function(v){if(v.sFieldName===s){if(!v._bValueListRequested){v.loadAnnotation();}return true;}});}};o.prototype.ensureLoadedValueList=function(s){if(this._oFilterProvider){this._oFilterProvider.getAssociatedValueListProviders().some(function(v){if(v.sFieldName===s){if(!v._bValueListRequested){v.loadAnnotation();}return true;}});}};o.prototype.ensureLoadedValueHelpList=function(s){this.ensureLoadedValueHelp(s);this.ensureLoadedValueList(s);};o.prototype.getFilters=function(e){this._logAccessWhenNotInitialized("getFilters");if(!e||!e.length){e=this._getVisibleFieldNames(true);}return this._oFilterProvider?this._oFilterProvider.getFilters(e):[];};o.prototype.getParameters=function(){this._logAccessWhenNotInitialized("getParameters");return this._oFilterProvider?this._oFilterProvider.getParameters():{};};o.prototype.getAnalyticBindingPath=function(){var B="";this._logAccessWhenNotInitialized("getAnalyticBindingPath");if(this._oFilterProvider){B=this._oFilterProvider.getAnalyticBindingPath();}return B;};o.prototype.getParameterBindingPath=function(){return this.getAnalyticBindingPath();};o.prototype.getControlByKey=function(K){this._logAccessWhenNotInitialized("getControlByKey");return this.determineControlByName(K);};o.prototype._getVisibleFieldNames=function(i){var e=[],v=this.getAllFilterItems(true),j=v.length,I;j=v.length;while(j--){I=v[j];if(I){if(i&&I._isParameter()){continue;}e.push(I.getName());}}return e;};o.prototype._checkHasValueData=function(e){if(e){if(typeof e==="boolean"){return e;}else if(typeof e==="string"){if(e.toLowerCase()==="true"){return true;}}}return false;};o.prototype._checkForValues=function(D,e,i){var v=null;if(D&&e&&i){if(!e.data("isCustomField")){v=D[e.getName()];if(!v&&i.getSelectedItem&&i.getSelectedItem()){return true;}if(!v&&i.getSelectedKey&&i.getSelectedKey()){return true;}if(v===undefined){return false;}}else{var j=i.data("hasValue");if((j!==undefined)&&(j!=null)){return this._checkHasValueData(j);}else{if(i.getValue){if(i.getValue()){return true;}}if(i.getSelectedItem&&i.getSelectedItem()){return true;}if(i.getSelectedKey&&i.getSelectedKey()){return true;}if(i.getSelectedKeys&&i.getSelectedKeys().length>0){return true;}}}}return v?true:false;};o.prototype.getFiltersWithValues=function(){this._logAccessWhenNotInitialized("getFiltersWithValues");return this._getFiltersWithAssignedValues(true);};o.prototype.getAllFiltersWithValues=function(){return this._getFiltersWithAssignedValues(false);};o.prototype._getFiltersWithAssignedValues=function(e){var i=[];var j=this.getAllFilterItems(e),p,D=this.getFilterData(),r=0,s;if(j&&D){r=j.length;while(r--){p=j[r];s=this.determineControlByFilterItem(p,true);if(this._checkForValues(D,p,s)){i.push(p);}}}return i.reverse();};o.prototype.getFilterDataAsStringForVariant=function(e,v){var j={},D=this._oFilterProvider._aFilterBarDateTimeFieldNames,t=this;var p=function(i){if(t.isInUTCMode()){if(typeof i==="string"){i=new Date(i);}i=t.getDateInUTCOffset(i).toJSON();}if(i.indexOf('Z')===(i.length-1)){i=i.substr(0,i.length-1);}return i;};if(D.length>0){j=q.extend(true,j,this.getFilterData(e));D.forEach(function(s){var i,r,u=c._getFieldMetadata(this._aFilterBarViewMetadata,s);if(u&&(u.type==="Edm.DateTimeOffset")){r=j[s];if(r&&r.low){if(u.filterRestriction===n.interval){i=d.parseDateTimeOffsetInterval(r.low);if(i&&(i.length==2)){r.low=u.ui5Type.parseValue(i[0],"string");r.high=u.ui5Type.parseValue(i[1],"string");}}}}}.bind(this));if(v==="V3"){this._oFilterProvider._aFilterBarDateFieldNames.concat(this._oFilterProvider._aFilterBarTimeFieldNames).forEach(function(s){var r,u=c._getFieldMetadata(this._aFilterBarViewMetadata,s);if(!u){u=this.getParameterMetadata(s);}if(u&&(u.filterType==="date")||(u.filterType==="time")){r=j[s];if(r){if((u.filterRestriction===n.multiple)||(u.filterRestriction===n.auto)){if(r.ranges){for(var i=0;i<r.ranges.length;i++){delete r.ranges[i].tokenText;if(r.ranges[i].value1){r.ranges[i].value1=p(r.ranges[i].value1);}if(r.ranges[i].value2){r.ranges[i].value2=p(r.ranges[i].value2);}}}}else if(u.filterRestriction===n.single){j[s]=p(r);}else if(u.filterRestriction===n.interval){if(r.ranges){for(var i=0;i<r.ranges.length;i++){delete r.ranges[i].tokenText;if(r.ranges[i].value1){r.ranges[i].value1=p(r.ranges[i].value1);}if(r.ranges[i].value2){r.ranges[i].value2=p(r.ranges[i].value2);}}}else{if(r.low){r.low=p(r.low);}if(r.high){r.high=p(r.high);}}}}}}.bind(this));}return JSON.stringify(j);}else{return this.getFilterDataAsString(e);}};o.prototype.getFilterData=function(e){var D=null;this._logAccessWhenNotInitialized("getFilterData");if(this._oFilterProvider){if(e){D=this._oFilterProvider.getFilterData();}else{D=this._oFilterProvider.getFilledFilterData(this._getVisibleFieldNames());}}return D;};o.prototype.getFilterDataAsString=function(e){var D=null;this._logAccessWhenNotInitialized("getFilterDataAsString");if(this._oFilterProvider){if(e){D=this._oFilterProvider.getFilterDataAsString();}else{D=this._oFilterProvider.getFilledFilterDataAsString(this._getVisibleFieldNames());}}return D;};o.prototype.getParameterMetadata=function(N){var p=null,e=this.getAnalyticalParameters();if(N.indexOf(l.ANALYTICAL_PARAMETER_PREFIX)===0){N=N.substring(l.ANALYTICAL_PARAMETER_PREFIX.length);}if(e){e.some(function(i){if(i.name===N){p=i;}return p!==null;});}return p;};o.prototype.setFilterDataAsStringFromVariant=function(j,r,v){var J,D=this._oFilterProvider._aFilterBarDateTimeFieldNames;if(j){if(D.length>0){J=JSON.parse(j);D.forEach(function(s){var e,p=c._getFieldMetadata(this._aFilterBarViewMetadata,s);if(p&&(p.type==="Edm.DateTimeOffset")){e=J[s];if(e&&(p.filterRestriction===n.multiple)||(p.filterRestriction===n.auto)){if(e.ranges){for(var i=0;i<e.ranges.length;i++){delete e.ranges[i].tokenText;}}}}}.bind(this));if(v==="V3"){this._oFilterProvider._aFilterBarDateFieldNames.concat(this._oFilterProvider._aFilterBarTimeFieldNames).forEach(function(s){var e,p=c._getFieldMetadata(this._aFilterBarViewMetadata,s);if(!p){p=this.getParameterMetadata(s);}if(p&&(p.filterType==="date")||(p.filterType==="time")){e=J[s];if(e){if(e.ranges){for(var i=0;i<e.ranges.length;i++){delete e.ranges[i].tokenText;}}}}}.bind(this));}this.setFilterData(J,r);}else{this.setFilterDataAsString(j,r);}}};o.prototype.setFilterData=function(j,r){this._logAccessWhenNotInitialized("setFilterData");if(this._oFilterProvider){this._oFilterProvider.setFilterData(j,r);}if(j&&(Object.keys(j).length===1)&&j._CUSTOM){return;}this.fireFilterChange({afterFilterDataUpdate:true});};o.prototype.setFilterDataAsString=function(j,r){if(j){this.setFilterData(JSON.parse(j),r);}};o.prototype.fireClear=function(){this._clearFilterFields();this.fireEvent("clear",arguments);};o.prototype._clearFilterFields=function(){if(this._oFilterProvider){this._oFilterProvider.clear();this._clearErroneusControlValues();}this.fireFilterChange({afterFilterDataUpdate:true});};o.prototype.fireReset=function(){this._resetFilterFields();this.fireEvent("reset",arguments);};o.prototype._resetFilterFields=function(){if(this._oFilterProvider){this._oFilterProvider.reset();this._clearErroneusControlValues();}this.fireFilterChange({afterFilterDataUpdate:true});};o.prototype.triggerSearch=function(D){if(this.getSuppressSelection()){return;}this._clearDelayedSearch();this._iDelayedSearchId=setTimeout(this["_search"].bind(this),D||0);};o.prototype.search=function(s){if(this.getSuppressSelection()){return undefined;}this._logAccessWhenNotInitialized("search");var e=this.isLiveMode();if(s&&!e){return this._search();}else{this.triggerSearch(e?o.LIVE_MODE_INTERVAL:0);}return true;};o.prototype._search=function(){var p=[],e={},i=true,I=false,E;var j=this.verifySearchAllowed();if(j.hasOwnProperty("pending")){if(this._iDelayedSearchId&&!this.getSuppressSelection()){this.triggerSearch();}return undefined;}else if(j.hasOwnProperty("error")){i=false;I=true;}else if(j.hasOwnProperty("mandatory")){i=false;}if(this.isPending()&&!this._bIsPendingChangeAttached){var H=function(r){if(r.getParameter("pendingValue")===false){this.detachPendingChange(H);this._bIsPendingChangeAttached=false;this.triggerSearch();}}.bind(this);this._bIsPendingChangeAttached=true;this.attachPendingChange(H);return undefined;}this._clearDelayedSearch();if(i){if(this._isTablet()&&this.getUseToolbar()&&!this.getAdvancedMode()){this.setFilterBarExpanded(false);}e.selectionSet=this._retrieveCurrentSelectionSet(false,true);p.push(e);this.fireSearch(p);}else{if(!this._oResourceBundle){this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");}if(!I){if(!this._sMandatoryErrorMessage){this._sMandatoryErrorMessage=this._oResourceBundle.getText("EMPTY_MANDATORY_MESSAGE");}E=this._sMandatoryErrorMessage;}else{if(!this._sValidationErrorMessage){this._sValidationErrorMessage=this._oResourceBundle.getText("VALIDATION_ERROR_MESSAGE");}E=this._sValidationErrorMessage;}if(this.getShowMessages()&&!this.getLiveMode()){try{this._activateMainContent();M.error(E,{styleClass:(this.$()&&this.$().closest(".sapUiSizeCompact").length)?"sapUiSizeCompact":"",onClose:this._setFocusOnFirstErroneousField.bind(this)});}catch(x){return undefined;}}else{this._setFocusOnFirstErroneousField();L.warning("search was not triggered. "+E);}if(this._bExpandAdvancedFilterArea&&this.rerenderFilters){this.rerenderFilters(true);}}return i;};o.prototype.validateMandatoryFields=function(){this._logAccessWhenNotInitialized("validateMandatoryFields");return this._validateMandatoryFields();};o.prototype.verifySearchAllowed=function(){this._logAccessWhenNotInitialized("verifySearchAllowed");delete this.bIsSearchPending;if(this._validateState()){if(this.validateMandatoryFields()){return{};}return{mandatory:true};}if(this.bIsSearchPending){return{pending:true};}return{error:true};};o.prototype._setFocusOnFirstErroneousField=function(){var e=null,j,p,i;e=this.getAllFilterItems(true);if(e){j=e.length;for(i=0;i<j;i++){p=this.determineControlByFilterItem(e[i],true);if(p&&p.getValueState&&p.getValueState()===m.Error){setTimeout(p["focus"].bind(p),0);break;}}}};o.prototype.setLiveMode=function(e){if(!this._isPhone()){if(e){this.hideGoButton();}else{this.restoreGoButton();}}if(this._oSmartVariantManagement){if(e){if(this._bShowShareState===undefined){this._bShowShareState=this._oSmartVariantManagement.getShowExecuteOnSelection();}this._oSmartVariantManagement.setShowExecuteOnSelection(false);}else if(this._bShowShareState!==undefined){this._oSmartVariantManagement.setShowExecuteOnSelection(this._bShowShareState);}}this.setProperty("liveMode",e);return this;};o.prototype.isLiveMode=function(){if(this._isPhone()){return false;}return this.getLiveMode();};o.prototype._clearDelayedSearch=function(){if(this._iDelayedSearchId){clearTimeout(this._iDelayedSearchId);this._iDelayedSearchId=null;}};o.prototype.isPending=function(){if(!this._oFilterProvider){return false;}return this._oFilterProvider.isPending();};o.prototype._validateMandatoryFields=function(){var e=true,i=this.determineMandatoryFilterItems(),j,D=this.getFilterData(),p=0,r;this._bExpandAdvancedFilterArea=false;if(i&&D){p=i.length;while(p--){j=i[p];r=this.determineControlByFilterItem(j,true);if(r&&r.setValueState){if(this._checkForValues(D,j,r)){if(r.data("__mandatoryEmpty")){r.data("__mandatoryEmpty",null);r.setValueState(m.None);}}else{e=false;r.setValueState(m.Error);r.data("__mandatoryEmpty",true);if(j.getGroupName){this._bExpandAdvancedFilterArea=true;}}}}}return e;};o.prototype._setSmartVariant=function(s){if(s){var e=sap.ui.getCore().byId(s);if(e){if(e instanceof S){if(this._oVariantManagement&&!this._oVariantManagement.isPageVariant()){this._replaceVariantManagement(e);this._oSmartVariantManagement=e;}}else{L.error("Control with the id="+s+" not of expected type");}}else{L.error("Control with the id="+s+" not found");}}};o.prototype.setSmartVariant=function(s){if(this.getAdvancedMode()){L.error("not supported for the advanced mode");return this;}this.setAssociation("smartVariant",s);this._setSmartVariant(s);return this;};o.prototype.getSmartVariant=function(){if(this.getAdvancedMode()){L.error("not supported for the advanced mode");return null;}var s=this.getAssociation("smartVariant");if(s){return sap.ui.getCore().byId(s);}return this._oSmartVariantManagement;};o.prototype._createVariantManagement=function(){this._oSmartVariantManagement=null;if(this.getAdvancedMode()){return F.prototype._createVariantManagement.apply(this);}var s=this.getSmartVariant();this._setSmartVariant(s);if(!this._oSmartVariantManagement){this._oSmartVariantManagement=new S(this.getId()+"-variant",{showExecuteOnSelection:true,showShare:true});}return this._oSmartVariantManagement;};o.prototype._initializeVariantManagement=function(){if(!this.isRunningInValueHelpDialog&&this._oSmartVariantManagement&&this.getPersistencyKey()){var p=new P({type:"filterBar",keyName:"persistencyKey",dataSource:this.getEntitySet()||this.getEntityType()});p.setControl(this);this._oSmartVariantManagement.addPersonalizableControl(p);var v=this._checkHasValueData(this.data("executeStandardVariantOnSelect"));if(v){this._oSmartVariantManagement._executeOnSelectForStandardVariantByXML(v);}F.prototype._initializeVariantManagement.apply(this,arguments);}else{this.fireInitialise();this.fireInitialized();}};o.prototype.setConsiderSelectionvariants=function(v){this.setProperty("considerSelectionVariants",v);};o.prototype.fireInitialized=function(){if(!this.isRunningInValueHelpDialog&&this.getPersistencyKey()&&this.getConsiderSelectionVariants()&&this._oSmartVariantManagement&&this._oSmartVariantManagement.getEnabled()){try{if(!this._oSmartVariantManagement.isPageVariant()){this._prepareSelectionVariants();}}finally{}}F.prototype.fireInitialized.apply(this,arguments);};o.prototype._prepareSelectionVariants=function(){var s,v,D,K=o.SELECTION_VARIANT_KEY_PREFIX,N=false,e=[];s=this.getSelectionVariants();if(s){this._oSmartVariantManagement.registerSelectionVariantHandler({callback:this.getSelectionVariant,handler:this},K);s.forEach(function(i){var j=K+i.qualifier;if(i.qualifier){v=new V({key:j,text:i.annotation.Text.String,global:true,executeOnSelection:false,lifecycleTransportId:"",lifecyclePackage:"",namespace:"",readOnly:true,labelReadOnly:true,author:""});this._oSmartVariantManagement.insertVariantItem(v,0);e.push(j);}else{N=this._defaultSelectionVariantHandling(i);}}.bind(this));if(!this._oSmartVariantManagement._getDefaultVariantKey()){if(this.getDefaultSelectionVariantName()){D=K+this.getDefaultSelectionVariantName();this._oSmartVariantManagement.setInitialSelectionKey(D);this._oSmartVariantManagement.fireSelect({key:D});}else if(N){this._oSmartVariantManagement.fireSelect({key:this._oSmartVariantManagement.STANDARDVARIANTKEY});}}this._oSmartVariantManagement.applyDefaultFavorites(e,true);}};o.prototype._defaultSelectionVariantHandling=function(s){var v=null;if(!this._oSmartVariantManagement){return false;}if(this._oSmartVariantManagement._sAppStandardVariantKey){return false;}if(s&&s.annotation){v=this.convertSelectionVariantToInternalVariant(s.annotation);if(v){if(!this._oSmartVariantManagement.isPageVariant()){v.version="V1";var e=JSON.parse(v.filterBarVariant);if(this._oSmartVariantManagement._oStandardVariant){var i=JSON.parse(this._oSmartVariantManagement._oStandardVariant.filterBarVariant);if(i._CUSTOM){e._CUSTOM=i._CUSTOM;v.filterBarVariant=JSON.stringify(e);}}this._oSmartVariantManagement._oStandardVariant=v;return true;}}}return false;};o.prototype._adaptFilterVisibilityProperties=function(e){var i,E=null,j=[];if(this._oSmartVariantManagement&&this._oSmartVariantManagement._oStandardVariant&&this._oSmartVariantManagement._oStandardVariant.filterbar){q.extend(true,j,this._oSmartVariantManagement._oStandardVariant.filterbar);}for(E in e){i=false;j.some(function(p){if(p.name===E){i=true;p.partOfCurrentVariant=true;}return i;});if(!i){j.push({group:this._determineGroupNameByName(E),name:E,partOfCurrentVariant:true,visibleInFilterBar:false,visible:true});}}return j;};o.prototype.getSelectionVariant=function(K,s){var v=null,e=null,i=K.substring(o.SELECTION_VARIANT_KEY_PREFIX.length);this.getSelectionVariants().some(function(I){if(I.qualifier===i){e=I;return true;}return false;});if(e){if(e.variantContent){v=e.variantContent;}else{v=this.convertSelectionVariantToInternalVariant(e.annotation);e.variantContent=v;}}return v;};o.prototype.convertSelectionVariantToInternalVariant=function(s){var e=JSON.stringify(s),i=JSON.parse(e),v={},p={};var D=new h(null,"/"),j=i.SelectOptions,r=i.Parameters,t;if(j){j.forEach(function(u){u.PropertyName=u.PropertyName.PropertyPath;u.Ranges.forEach(function(w){w.Sign=w.Sign.EnumMember.split("/")[1];w.Option=w.Option.EnumMember.split("/")[1];w.Low=w.Low&&g.format(D,w.Low)||null;w.High=w.High&&g.format(D,w.High)||null;});});}if(r){r.forEach(function(u){u.PropertyName=u.PropertyName.PropertyPath.split("/")[1]||u.PropertyName.PropertyPath;u.PropertyValue=g.format(D,u.PropertyValue)||null;});}t=new k();v=t.convert(JSON.stringify(i),this,true);p=JSON.parse(v.payload);if(this._oSmartVariantManagement.isPageVariant()){v[this.getPersistencyKey()]={"version":"V2","filterbar":this._adaptFilterVisibilityProperties(p),"filterBarVariant":JSON.stringify(p)};}else{v={"version":"V2","filterbar":this._adaptFilterVisibilityProperties(p),"filterBarVariant":JSON.stringify(p)};}return v;};o.prototype.getBasicSearchControl=function(){return sap.ui.getCore().byId(this.getBasicSearch());};o.prototype.addFieldToAdvancedArea=function(K){var e;this._logAccessWhenNotInitialized("addFieldToAdvancedArea");e=this._getFilterItemByName(K);if(e&&e.setVisibleInAdvancedArea){e.setVisibleInAdvancedArea(true);}};o.prototype.getConditionTypeByKey=function(K){if(this._oFilterProvider._mConditionTypeFields[K]){return this._oFilterProvider._mConditionTypeFields[K].conditionType;}};o.prototype.isInUTCMode=function(){if(this._oFilterProvider&&this._oFilterProvider._oDateFormatSettings){return this._oFilterProvider._oDateFormatSettings.UTC;}return false;};o.prototype.getDateInUTCOffset=function(D){return c.getDateInUTCOffset(D);};o.prototype.isInitialised=function(){return!!this.bIsInitialised;};o.prototype.destroy=function(){this._clearDelayedSearch();if(this._oFilterProvider&&this._oFilterProvider.destroy){this._oFilterProvider.destroy();}this._oFilterProvider=null;if(this._oSmartVariantManagement&&this.getConsiderSelectionVariants()){this._oSmartVariantManagement.unregisterSelectionVariantHandler(this);}F.prototype.destroy.apply(this,arguments);sap.ui.getCore().getMessageManager().unregisterObject(this);this._aFilterBarViewMetadata=null;this._bExpandAdvancedFilterArea=null;this._oResourceBundle=null;this._sMandatoryErrorMessage=null;this._sValidationErrorMessage=null;this._oSmartVariantManagement=null;};return o;},true);
