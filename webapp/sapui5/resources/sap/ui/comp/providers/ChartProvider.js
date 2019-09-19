/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/comp/odata/MetadataAnalyser','sap/ui/comp/odata/ChartMetadata','sap/ui/comp/odata/ODataType','./ControlProvider','sap/ui/core/format/DateFormat'],function(q,M,C,O,a,D){"use strict";var b=function(p){if(p){this._oParentODataModel=p.model;this.sEntitySet=p.entitySet;this._sIgnoredFields=p.ignoredFields;this._bSkipAnnotationParse=p.skipAnnotationParse==="true";this._sChartQualifier=p.chartQualifier;this._sPresentationVariantQualifier=p.presentationVariantQualifier;this._oDefaultDropDownDisplayBehaviour=p.defaultDropDownDisplayBehaviour;try{this._oDateFormatSettings=p.dateFormatSettings?JSON.parse(p.dateFormatSettings):undefined;}catch(e){}if(p.chartLibrary){C.feedWithChartLibrary(p.chartLibrary);}}this._aODataFieldMetadata=[];this._oChartViewMetadata=null;this._oChartDataPointMetadata=null;this._aIgnoredFields=[];this._oMetadataAnalyser=new M(this._oParentODataModel);this._intialiseMetadata();};b.prototype._intialiseMetadata=function(){var c,d=[],f,i,l=0;this._aODataFieldMetadata=this._oMetadataAnalyser.getFieldsByEntitySetName(this.sEntitySet);this._sFullyQualifiedEntityTypeName=this._oMetadataAnalyser.getEntityTypeNameFromEntitySetName(this.sEntitySet);if(!this._bSkipAnnotationParse){this._oPresentationVariant=this._oMetadataAnalyser.getPresentationVariantAnnotation(this._sFullyQualifiedEntityTypeName,this._sPresentationVariantQualifier);if(this._oPresentationVariant&&this._oPresentationVariant.chartAnnotation){this._oChartAnnotation=this._oPresentationVariant.chartAnnotation;}else{this._oChartAnnotation=this._oMetadataAnalyser.getChartAnnotation(this._sFullyQualifiedEntityTypeName,this._sChartQualifier);}}if(!this._oDefaultDropDownDisplayBehaviour){this._oDefaultDropDownDisplayBehaviour=this._oMetadataAnalyser.getTextArrangementValue(this._sFullyQualifiedEntityTypeName);}this._generateIgnoredFieldsArray();this._oControlProvider=new a({metadataAnalyser:this._oMetadataAnalyser,model:this._oParentODataModel,fieldsMetadata:this._aODataFieldMetadata,dateFormatSettings:this._oDateFormatSettings,defaultDropDownDisplayBehaviour:this._oDefaultDropDownDisplayBehaviour,enableDescriptions:false,entitySet:this.sEntitySet});if(this._aODataFieldMetadata){this._prepareHierarchy();l=this._aODataFieldMetadata.length;}for(i=0;i<l;i++){f=this._aODataFieldMetadata[i];if(this._aIgnoredFields.indexOf(f.name)>-1||!f.visible){continue;}if(f.type.indexOf("Edm.")===0){c=this._getFieldViewMetadata(f);this._enrichWithChartViewMetadata(f,c);d.push(f);}}if(this._oChartAnnotation){this._oChartViewMetadata=q.extend({},this._oChartAnnotation);this._oChartViewMetadata.chartType=C.getChartType(this._oChartViewMetadata.chartType);this._oChartViewMetadata.fields=d;}};b.prototype._prepareHierarchy=function(){for(var i=0;i<this._aODataFieldMetadata.length;i++){if(this._aODataFieldMetadata[i].hierarchy){for(var j=0;j<this._aODataFieldMetadata.length;j++){this._aODataFieldMetadata[j].hierarchy=this._aODataFieldMetadata[j].hierarchy||{};this._aODataFieldMetadata[j].hierarchy.up=this._aODataFieldMetadata[j].hierarchy.up||{};if(this._aODataFieldMetadata[i].hierarchy.field===this._aODataFieldMetadata[j].name){this._aODataFieldMetadata[i].hierarchy.down=this._getFieldViewMetadata(this._aODataFieldMetadata[j]);this._aODataFieldMetadata[j].hierarchy.up[this._aODataFieldMetadata[i].hierarchy.type]=this._getFieldViewMetadata(this._aODataFieldMetadata[i]);}}}}};b.prototype._setAnnotationMetadata=function(f){if(f&&f.fullName){var s=this._oMetadataAnalyser.getSemanticObjectsFromAnnotation(f.fullName);if(s){f.semanticObjects=s;}}};b.prototype._getFieldViewMetadata=function(f){var c=this._oControlProvider.getFieldViewMetadata(f,false);this._setAnnotationMetadata(c);return c;};b.prototype._generateIgnoredFieldsArray=function(){if(this._sIgnoredFields){this._aIgnoredFields=this._sIgnoredFields.split(",");}};b.prototype._enrichWithChartViewMetadata=function(f,v){function i(R,c,o){if(c.aggregationRole){return c.aggregationRole===R;}if(o){var d=R=="dimension"?o.dimensionFields:o.measureFields;return d&&d.indexOf(c.name)!=-1;}return false;}f.isMeasure=i("measure",f,this._oChartAnnotation);f.isDimension=i("dimension",f,this._oChartAnnotation);f.isHierarchyDimension=f.hierarchy&&f.hierarchy.type===M.hierarchyType.nodeFor&&i("dimension",f.hierarchy.down,this._oChartAnnotation);f.quickInfo=v.quickInfo;f.modelType=v.modelType;f.hasValueListAnnotation=v.hasValueListAnnotation;f.fullName=v.fullName;f.dateFormatter=this._getDateFormatter(f);f.timeUnitType=this._getTimeUnitType(f);f.isTimeDimension=f.timeUnitType!==undefined;f.role=this._getRole(f);f.hierarchyLevel=this._getHierarchyLevel(f);f.dataPoint=this._getDataPoint(f);f.filterType=v.filterType;if(v.template){f.template=v.template;}if(f.isDimension){f.displayBehaviour=v.displayBehaviour;}else if(f.isHierarchyDimension){var r=f.hierarchy.up[M.hierarchyType.nodeExternalKeyFor]||v;f.displayBehaviour=r.displayBehaviour;f.description=r.description||r.name;}f.isSemanticObject=(v.semanticObjects)?true:false;this._setInResult(f);this._setSortOrder(f);};b.prototype._getTimeUnitType=function(f){var t;switch(f.type){case"Edm.Date":t="Date";break;case"Edm.DateTime":case"Edm.DateTimeOffset":if(f.displayFormat==="Date"){t="Date";}break;case"Edm.String":if(f.isCalendarDate){t="yearmonthday";}break;default:break;}return t;};b.prototype._getDateFormatter=function(f){var c,d;switch(f.type){case"Edm.Date":d=D.getDateInstance(this.oDateFormatSettings);break;case"Edm.Time":d=D.getTimeInstance(this.oDateFormatSettings);break;case"Edm.DateTimeOffset":case"Edm.DateTime":if(f.displayFormat==="Date"){d=D.getDateInstance(this.oDateFormatSettings);}else{d=D.getDateTimeInstance(this.oDateFormatSettings);}break;case"Edm.String":if(f.isCalendarDate){var s=O.getType("Edm.String",this.oDateFormatSettings,{},true);c=function(v){v=s.formatValue(v,"string");return v;};}break;default:break;}if(d){c=function(t){if(!t){return null;}var e=new Date(t);return d.format(e);};}return c;};b.prototype._setInResult=function(f){if(this._oPresentationVariant){if(this._oPresentationVariant.requestAtLeastFields&&this._oPresentationVariant.requestAtLeastFields.indexOf(f.name)>-1){f.inResult=true;}}};b.prototype._setSortOrder=function(f){f.sorted=false;f.sortOrder="Ascending";var l;if(this._oPresentationVariant&&this._oPresentationVariant.sortOrderFields){l=this._oPresentationVariant.sortOrderFields.length;for(var i=0;i<l;i++){if(this._oPresentationVariant.sortOrderFields[i].name===f.name){f.sorted=true;f.sortOrder=this._oPresentationVariant.sortOrderFields[i].descending?"Descending":"Ascending";f.sortIndex=i;break;}}}};b.prototype._unmarkTextDimensions=function(f,t){var i,F;for(i=0;i<f.length;i++){F=f[i];if(F.isDimension){if(t.indexOf(F.name)>-1){F.isDimension=false;}}}};b.prototype._getRole=function(f){if(this._oChartAnnotation){if((f.isDimension||f.isHierarchyDimension)&&this._oChartAnnotation.dimensionAttributes[f.name]){return C.getDimensionRole(this._oChartAnnotation.dimensionAttributes[f.name].role);}else if(f.isMeasure&&this._oChartAnnotation.measureAttributes[f.name]){return C.getMeasureRole(this._oChartAnnotation.measureAttributes[f.name].role);}}};b.prototype._getHierarchyLevel=function(f){if(this._oChartAnnotation){if(f.isHierarchyDimension&&this._oChartAnnotation.dimensionAttributes[f.name]){var l=null;try{l=parseInt(this._oChartAnnotation.dimensionAttributes[f.name].hierarchyLevel);}catch(e){l=0;}return l;}return 0;}};b.prototype._getTextPropertyForHierachyDimension=function(f){var r=f.hierarchy.up[M.hierarchyType.nodeExternalKeyFor]||f;return r.description||r.name;};b.prototype._getDataPoint=function(f){if(this._oChartAnnotation&&f.isMeasure&&this._oChartAnnotation.measureAttributes[f.name]&&this._oChartAnnotation.measureAttributes[f.name].dataPoint){var d=this._oChartAnnotation.measureAttributes[f.name].dataPoint;var c=d.split("#");var Q=c.length===2?c[1]:"";return this._getMeasureDataPoint(Q,f.name);}return null;};b.prototype.getChartViewMetadata=function(){return this._oChartViewMetadata;};b.prototype.getViewField=function(d){var f=this._oChartViewMetadata.fields.filter(function(c){return c.name===d;})[0];return f;};b.prototype.getChartDataPointMetadata=function(){if(!this._oChartDataPointMetadata&&this._sFullyQualifiedEntityTypeName){this._oChartDataPointMetadata=this._oMetadataAnalyser.getDataPointAnnotation(this._sFullyQualifiedEntityTypeName);}return this._oChartDataPointMetadata;};b.prototype._getMeasureDataPoint=function(Q,m){var c=this.getChartDataPointMetadata();if(c){var d=null;if(Q){if(c.additionalAnnotations){d=c.additionalAnnotations[Q];}}else if(c.primaryAnnotation){d=c.primaryAnnotation;}if(d!=null&&d.Value&&d.Value.Path==m){return d;}}return null;};b.prototype.getIsUTCDateHandlingEnabled=function(){return this._oDateFormatSettings?this._oDateFormatSettings.UTC:false;};b.prototype.destroy=function(){if(this._oMetadataAnalyser&&this._oMetadataAnalyser.destroy){this._oMetadataAnalyser.destroy();}this._oMetadataAnalyser=null;if(this._oControlProvider&&this._oControlProvider.destroy){this._oControlProvider.destroy();}this._oControlProvider=null;this._aODataFieldMetadata=null;this._oChartViewMetadata=null;this._oChartDataPointMetadata=null;this._sIgnoredFields=null;this.bIsDestroyed=true;};b.prototype.provideSemanticColoring=function(d){var c={};if(d.Criticality){if(d.Criticality.Path){c={Calculated:d.Criticality.Path};}else{c={Static:C.getCriticalityType(d.Criticality.EnumMember)};}}else{var t={};var e=this._buildThresholds(t,d.CriticalityCalculation);if(e){c={ConstantThresholds:t};}else{c={DynamicThresholds:t};}}return c;};b.prototype.calculateDimensionColoring=function(d){var v=C.getValueCriticality(d);if(!v){return null;}var V,o,c={Positive:{Values:[]},Critical:{Values:[]},Negative:{Values:[]},Neutral:{Values:[]}};for(var i=0;i<v.length;i++){o=v[i];V=C.calculateValue(o.Value);if(o.Criticality.EnumMember.endsWith("Positive")){c.Positive.Values.push(V);}else if(o.Criticality.EnumMember.endsWith("Critical")){c.Critical.Values.push(V);}else if(o.Criticality.EnumMember.endsWith("Negative")){c.Negative.Values.push(V);}else{c.Neutral.Values.push(V);}}return c;};b.prototype._buildThresholds=function(t,c){var d=true;t.ImprovementDirection=C.getImprovementDirectionType(c.ImprovementDirection.EnumMember);var v=C.getCriticalityThresholds();var l=v.length;var o={oneSupplied:false};var e={oneSupplied:false};for(var i=0;i<l;i++){o[v[i]]=c[v[i]]?c[v[i]].Path:undefined;o.oneSupplied=o.oneSupplied||o[v[i]];if(!o.oneSupplied){e[v[i]]=C.calculateConstantValue(c[v[i]]);e.oneSupplied=e.oneSupplied||e[v[i]];}}if(o.oneSupplied){d=false;for(var i=0;i<l;i++){if(o[v[i]]){t[v[i]]=o[v[i]];}}}else{var A;t.AggregationLevels=[];if(e.oneSupplied){A={VisibleDimensions:null};for(var i=0;i<l;i++){if(e[v[i]]){A[v[i]]=e[v[i]];}}t.AggregationLevels.push(A);}if(c.ConstantThresholds&&c.ConstantThresholds.length>0){for(var i=0;i<c.ConstantThresholds.length;i++){var f=c.ConstantThresholds[i];var V=f.AggregationLevel?[]:null;if(f.AggregationLevel&&f.AggregationLevel.length>0){for(var j=0;j<f.AggregationLevel.length;j++){V.push(f.AggregationLevel[j].PropertyPath);}}A={VisibleDimensions:V};for(var j=0;j<l;j++){var n=C.calculateConstantValue(f[v[j]]);if(n){A[v[j]]=n;}}t.AggregationLevels.push(A);}}}return d;};b.prototype.getMaxItems=function(){var m=-1;if(this._oPresentationVariant&&this._oPresentationVariant.maxItems){m=Math.min(this._oPresentationVariant.maxItems,100);}return m;};return b;},true);