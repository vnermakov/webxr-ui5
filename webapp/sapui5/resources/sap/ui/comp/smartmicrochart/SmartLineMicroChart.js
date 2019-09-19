/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/comp/library","sap/suite/ui/microchart/library","sap/ui/core/Control","sap/ui/model/odata/CountMode","sap/ui/core/format/DateFormat","sap/m/library","sap/base/Log","sap/suite/ui/microchart/LineMicroChart","sap/suite/ui/microchart/LineMicroChartLine","sap/suite/ui/microchart/LineMicroChartPoint","sap/ui/comp/smartmicrochart/SmartMicroChartBase"],function(C,M,a,b,D,m,L,c,d,e,S){"use strict";var f=S.extend("sap.ui.comp.smartmicrochart.SmartLineMicroChart",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartmicrochart/SmartLineMicroChart.designtime"},renderer:"sap.ui.comp.smartmicrochart.SmartMicroChartRenderer"});f.prototype._CHART_TYPE=["Line"];f.prototype.init=function(){this._bIsInitialized=false;this._bMetaModelLoadAttached=false;this.setProperty("chartType","Line",true);this.setAggregation("_chart",new c({showThresholdLine:false}),true);};f.prototype.onBeforeRendering=function(){var o=this.getAggregation("_chart");o.setSize(this.getSize(),true);o.setWidth(this.getWidth(),true);o.setHeight(this.getHeight(),true);};f.prototype.setShowLabel=function(s){var o;if(this.getShowLabel()!==s){o=this.getAggregation("_chart");this.setProperty("showLabel",s,true);o.setProperty("showTopLabels",s,true);o.setProperty("showBottomLabels",s,true);o.invalidate();}return this;};f.prototype._createAndBindInnerChart=function(){if(this._aDataPointAnnotations.length===0){L.error("DataPoint annotation missing! Cannot create the SmartLineMicroChart");return;}for(var i=0;i<this._aDataPointAnnotations.length;i++){if(!(this._aDataPointAnnotations[i].Value&&this._aDataPointAnnotations[i].Value.Path)){L.error("Value DataPoint annotation missing! Cannot create the SmartLineMicroChart");return;}}var o=this.getAggregation("_chart"),l;this._aDataPointAnnotations.forEach(function(g,I){l=new d(this.getId()+"-line-"+I,{points:{path:this._getBindingPath(),factory:this._pointFactory.bind(this),events:{change:this._onBindingDataChange.bind(this)}}});o.addLine(l);},this);};f.prototype._pointFactory=function(i,o){var x,y,p,l=i.split("-").slice(-2,-1),g=this.getAggregation("_chart").getLines()[l],h=this._aDataPointAnnotations[l],s;x=o.getProperty(this._oChartViewMetadata.dimensionFields[l]);x=this._formatDimension.call(this,x);y=o.getProperty(h.Value.Path);y=Number(y);p=new e({x:x,y:y});if(g&&h.Criticality&&h.Criticality.Path){s=this._mapCriticalityTypeWithColor(o.getProperty(h.Criticality.Path));this.getAggregation("_chart").getLines()[l].setColor(s);}return p;};f.prototype._onBindingDataChange=function(){var p=this.getAggregation("_chart").getLines()[0].getBinding("points");this._updateAssociations(p);this.updateChartLabels.call(this,p);};f.prototype._updateLabel=function(n,o){this.getAggregation("_chart").setProperty(n,o.text,true);};f.prototype._getLabelsMap=function(){return{"leftTop":"leftTopLabel","rightTop":"rightTopLabel","leftBottom":"leftBottomLabel","rightBottom":"rightBottomLabel"};};return f;});
