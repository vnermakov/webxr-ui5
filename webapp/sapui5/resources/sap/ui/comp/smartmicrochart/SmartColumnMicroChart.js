/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/comp/library","sap/suite/ui/microchart/library","sap/ui/core/Control","sap/ui/model/odata/CountMode","sap/ui/core/format/DateFormat","sap/m/library","sap/base/Log","sap/suite/ui/microchart/ColumnMicroChart","sap/suite/ui/microchart/ColumnMicroChartData","sap/suite/ui/microchart/ColumnMicroChartLabel","sap/ui/comp/smartmicrochart/SmartMicroChartBase"],function(C,M,a,b,D,m,L,c,d,e,S){"use strict";var f=S.extend("sap.ui.comp.smartmicrochart.SmartColumnMicroChart",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartmicrochart/SmartColumnMicroChart.designtime"},renderer:"sap.ui.comp.smartmicrochart.SmartMicroChartRenderer"});f.prototype._CHART_TYPE=["Column"];f.prototype.init=function(){this._bIsInitialized=false;this._bMetaModelLoadAttached=false;this.setProperty("chartType","Column",true);this.setAggregation("_chart",new c(),true);};f.prototype.onBeforeRendering=function(){var o=this.getAggregation("_chart");o.setSize(this.getSize(),true);o.setWidth(this.getWidth(),true);o.setHeight(this.getHeight(),true);};f.prototype.setShowLabel=function(s){var o;if(this.getShowLabel()!==s){o=this.getAggregation("_chart");this.setProperty("showLabel",s,true);o.setProperty("showTopLabels",s,true);o.setProperty("showBottomLabels",s,true);o.invalidate();}return this;};f.prototype._createAndBindInnerChart=function(){if(this._aDataPointAnnotations.length===0){L.error("DataPoint annotation missing! Cannot create the SmartColumnMicroChart");return;}if(!(this._aDataPointAnnotations[0].Value&&this._aDataPointAnnotations[0].Value.Path)){L.error("Value DataPoint annotation missing! Cannot create the SmartColumnMicroChart");return;}var o=this.getAggregation("_chart"),g=new d({value:{path:this._aDataPointAnnotations[0].Value.Path,type:"sap.ui.model.odata.type.Decimal"}});if(this._aDataPointAnnotations[0].Criticality&&this._aDataPointAnnotations[0].Criticality.Path){g.bindProperty("color",{path:this._aDataPointAnnotations[0].Criticality.Path,formatter:this._mapCriticalityTypeWithColor.bind(this)});}if(this._aDataPointAnnotations[0].Title&&this._aDataPointAnnotations[0].Title.Path){g.bindProperty("label",this._aDataPointAnnotations[0].Title.Path);}var A=this._getPropertyAnnotation.call(this,this._aDataPointAnnotations[0].Value.Path);var h=A["com.sap.vocabularies.Common.v1.Text"];if(h&&h.Path){o.setAllowColumnLabels(true);g.bindProperty("displayValue",h.Path);}o.bindAggregation("columns",{path:this._getBindingPath(),template:g,events:{change:this._onBindingDataChange.bind(this)}});this._createChartLabels();};f.prototype._createChartLabels=function(){var l,o=this._getLabelsMap();for(var k in o){l=new e();this.getAggregation("_chart").setAggregation(o[k],l,true);}};f.prototype._onBindingDataChange=function(){var p=this.getAggregation("_chart").getBinding("columns");this._updateAssociations(p);this.updateChartLabels.call(this,p);};f.prototype._updateLabel=function(n,o){var l=this.getAggregation("_chart").getAggregation(n);l.setProperty("label",o.text,true);if(o.color){l.setProperty("color",o.color,true);}};f.prototype._getLabelsMap=function(){return{"leftTop":"leftTopLabel","rightTop":"rightTopLabel","leftBottom":"leftBottomLabel","rightBottom":"rightBottomLabel"};};return f;});
