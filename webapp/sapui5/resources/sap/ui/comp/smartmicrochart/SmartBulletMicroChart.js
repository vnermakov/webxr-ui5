/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/comp/library","sap/ui/core/Control","sap/suite/ui/microchart/library","sap/m/library","sap/ui/comp/smartmicrochart/SmartMicroChartBase"],function(l,C,M,a,S){"use strict";var V=a.ValueColor;var b=S.extend("sap.ui.comp.smartmicrochart.SmartBulletMicroChart",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartmicrochart/SmartBulletMicroChart.designtime",properties:{enableAutoBinding:{type:"boolean",group:"Misc",defaultValue:false}}},renderer:"sap.ui.comp.smartmicrochart.SmartMicroChartRenderer"});b._CRITICAL_COLOR=V.Critical;b._ERROR_COLOR=V.Error;b.prototype._CHART_TYPE=["Bullet"];b.prototype.init=function(){this._bIsInitialized=false;this._bMetaModelLoadAttached=false;this.setProperty("chartType","Bullet",true);this.setAggregation("_chart",new M.BulletMicroChart({"showValueMarker":true}),true);};b.prototype.setShowLabel=function(s){if(this.getShowLabel()!==s){this.setProperty("showLabel",s,true);var c=this.getAggregation("_chart");c.setProperty("showActualValue",s,true);c.setProperty("showTargetValue",s,true);c.setProperty("showDeltaValue",s,true);c.setProperty("showValueMarker",s,true);this.invalidate();}return this;};b.prototype.onBeforeRendering=function(){var c=this.getAggregation("_chart");c.setSize(this.getSize(),true);c.setWidth(this.getWidth(),true);c.setHeight(this.getHeight(),true);};b.prototype._createAndBindInnerChart=function(){this._bindValueProperties();this._bindActualValue();this._bindChartThresholds();this._updateAssociations.call(this);this._setMode();};b.prototype._setMode=function(){if(this._hasMember(this,"_oDataPointAnnotations.Visualization.EnumMember")){if(this._oDataPointAnnotations.Visualization.EnumMember===S._DELTABULLET){this.getAggregation("_chart").setMode(M.BulletMicroChartModeType.Delta);}}};b.prototype._bindValueProperties=function(){var m,f,i=this.getAggregation("_chart");if(this._hasMember(this,"_oDataPointAnnotations.TargetValue.Path")){i.bindProperty("targetValue",{path:this._oDataPointAnnotations.TargetValue.Path,type:"sap.ui.model.odata.type.Decimal"});var F=this._getLabelNumberFormatter.call(this,this._oDataPointAnnotations.TargetValue.Path);i.bindProperty("targetValueLabel",{path:this._oDataPointAnnotations.TargetValue.Path,formatter:F.format.bind(F)});}if(this._hasMember(this,"_oDataPointAnnotations.ForecastValue.Path")){i.bindProperty("forecastValue",{path:this._oDataPointAnnotations.ForecastValue.Path,type:"sap.ui.model.odata.type.Decimal"});}if(this._oDataPointAnnotations.MaximumValue){if(this._oDataPointAnnotations.MaximumValue.hasOwnProperty("Path")){i.bindProperty("maxValue",{path:this._oDataPointAnnotations.MaximumValue.Path,type:"sap.ui.model.odata.type.Decimal"});}else if(this._oDataPointAnnotations.MaximumValue.hasOwnProperty("Decimal")){m=parseFloat(this._oDataPointAnnotations.MaximumValue.Decimal);i.setMaxValue(m,true);}}if(this._oDataPointAnnotations.MinimumValue){if(this._oDataPointAnnotations.MinimumValue.hasOwnProperty("Path")){i.bindProperty("minValue",{path:this._oDataPointAnnotations.MinimumValue.Path,type:"sap.ui.model.odata.type.Decimal"});}else if(this._oDataPointAnnotations.MinimumValue.hasOwnProperty("Decimal")){f=parseFloat(this._oDataPointAnnotations.MinimumValue.Decimal);i.setMinValue(f,true);}}};b.prototype._bindActualValue=function(){var i=this.getAggregation("_chart"),f=this._getLabelNumberFormatter.call(this,this._oDataPointAnnotations.Value.Path);var c=new M.BulletMicroChartData({value:{path:this._oDataPointAnnotations.Value.Path,type:"sap.ui.model.odata.type.Decimal"},color:{parts:[this._oDataPointAnnotations.Value&&this._oDataPointAnnotations.Value.Path||"",this._oDataPointAnnotations.Criticality&&this._oDataPointAnnotations.Criticality.Path||""],formatter:this._getValueColor.bind(this)}});i.setAggregation("actual",c,true);i.bindProperty("actualValueLabel",{path:this._oDataPointAnnotations.Value.Path,formatter:f.format.bind(f)});};b.prototype._bindChartThresholds=function(){var d,c;if(this._hasMember(this._oDataPointAnnotations,"CriticalityCalculation.ImprovementDirection.EnumMember")){c=this._oDataPointAnnotations.CriticalityCalculation;d=c.ImprovementDirection.EnumMember;if(d!==S._MINIMIZE&&c.DeviationRangeLowValue&&c.DeviationRangeLowValue.Path){this._bindThresholdAggregation(c.DeviationRangeLowValue.Path,b._ERROR_COLOR);}if(d!==S._MINIMIZE&&c.ToleranceRangeLowValue&&c.ToleranceRangeLowValue.Path){this._bindThresholdAggregation(c.ToleranceRangeLowValue.Path,b._CRITICAL_COLOR);}if(d!==S._MAXIMIZE&&c.ToleranceRangeHighValue&&c.ToleranceRangeHighValue.Path){this._bindThresholdAggregation(c.ToleranceRangeHighValue.Path,b._CRITICAL_COLOR);}if(d!==S._MAXIMIZE&&c.DeviationRangeHighValue&&c.DeviationRangeHighValue.Path){this._bindThresholdAggregation(c.DeviationRangeHighValue.Path,b._ERROR_COLOR);}}};b.prototype._bindThresholdAggregation=function(p,c){var t=new M.BulletMicroChartData({value:{path:p,type:"sap.ui.model.odata.type.Decimal"},color:c});this.getAggregation("_chart").addAggregation("thresholds",t,true);};return b;});
