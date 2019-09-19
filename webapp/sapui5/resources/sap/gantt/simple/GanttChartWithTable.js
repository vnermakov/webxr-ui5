/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/gantt/library","jquery.sap.global","sap/ui/core/Control","sap/ui/model/ChangeReason","sap/base/util/values","sap/ui/layout/Splitter","./InnerGanttChart","./GanttHeader","./GanttSyncedControl","../control/AssociateContainer","../axistime/ProportionZoomStrategy","./SelectionModel","./ExpandModel","./ShapeScheme","./GanttExtension","./GanttScrollExtension","./GanttZoomExtension","./GanttPointerExtension","./GanttDragDropExtension","./GanttPopoverExtension","./GanttConnectExtension","./GanttResizeExtension","./RenderUtils","../misc/Format","../misc/Utility","../config/TimeHorizon"],function(l,q,C,c,v,S,I,G,d,A,P,e,E,f,g,h,j,k,m,n,o,p,R,F,U,T){"use strict";var r=l.simple.GanttChartWithTableDisplayType;var M=10;function s(a,b){return a+b;}function t(a,b){return Math.abs(a-b)<M;}var u=C.extend("sap.gantt.simple.GanttChartWithTable",{metadata:{properties:{width:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",defaultValue:"100%"},shapeSelectionMode:{type:"sap.gantt.SelectionMode",defaultValue:l.SelectionMode.MultiWithKeyboard},shapeSelectionSettings:{type:"object",defaultValue:null},enableCursorLine:{type:"boolean",defaultValue:true},enableNowLine:{type:"boolean",defaultValue:true},enableVerticalLine:{type:"boolean",defaultValue:true},enableAdhocLine:{type:"boolean",defaultValue:true},adhocLineLayer:{type:"string",defaultValue:l.AdhocLineLayer.Top},dragOrientation:{type:"sap.gantt.DragOrientation",defaultValue:l.DragOrientation.Free},ghostAlignment:{type:"string",defaultValue:l.dragdrop.GhostAlignment.None},showShapeTimeOnDrag:{type:"boolean",defaultValue:false},selectionPanelSize:{type:"sap.ui.core.CSSSize",defaultValue:"30%"},displayType:{type:"sap.gantt.simple.GanttChartWithTableDisplayType",defaultValue:r.Both}},aggregations:{table:{type:"sap.ui.table.Table",multiple:false},adhocLines:{type:"sap.gantt.AdhocLine",multiple:true,singularName:"adhocLine",bindable:"bindable",visibility:"public"},svgDefs:{type:"sap.gantt.def.SvgDefs",multiple:false,singularName:"svgDef"},shapeSchemes:{type:"sap.gantt.simple.ShapeScheme",multiple:true,singularName:"shapeScheme"},calendarDef:{type:"sap.gantt.def.cal.CalendarDefs",multiple:false,bindable:"bindable"},axisTimeStrategy:{type:"sap.gantt.axistime.AxisTimeStrategyBase",multiple:false,bindable:"bindable"},locale:{type:"sap.gantt.config.Locale",multiple:false},_splitter:{type:"sap.ui.layout.Splitter",multiple:false,visibility:"hidden"},_header:{type:"sap.gantt.simple.GanttHeader",multiple:false,defaultValue:null,visibility:"hidden"},_innerGantt:{type:"sap.gantt.simple.InnerGanttChart",multiple:false,visibility:"hidden"}},events:{shapeSelectionChange:{parameters:{shapeUids:{type:"string[]"}}},shapeResize:{parameters:{shapeUid:{type:"string"},shape:{type:"sap.gantt.shape.BaseShape"},rowObject:{type:"object"},oldTime:{type:"string[]"},newTime:{type:"string[]"}}},shapeMouseEnter:{parameters:{shape:{type:"sap.gantt.shape.BaseShape"},pageX:{type:"int"},pageY:{type:"int"}}},shapeMouseLeave:{parameters:{shape:{type:"sap.gantt.shape.BaseShape"},originEvent:{type:"object"}}},shapeDoubleClick:{parameters:{shape:{type:"sap.gantt.shape.BaseShape"},rowSettings:{type:"sap.gantt.simple.GanttRowSettings"}}},shapeContextMenu:{parameters:{shape:{type:"sap.gantt.shape.BaseShape"},rowSettings:{type:"sap.gantt.simple.GanttRowSettings"},pageX:{type:"int"},pageY:{type:"int"}}},dragStart:{parameters:{sourceGanttChart:{type:"sap.gantt.simple.GanttChartWithTable"},draggedShapeDates:{type:"object"},lastDraggedShapeUid:{type:"string"},cursorDateTime:{type:"object"}}},shapeDrop:{parameters:{sourceGanttChart:{type:"sap.gantt.simple.GanttChartWithTable"},targetGanttChart:{type:"sap.gantt.simple.GanttChartWithTable"},draggedShapeDates:{type:"object"},lastDraggedShapeUid:{type:"string"},targetRow:{type:"sap.ui.table.Row"},cursorDateTime:{type:"object"},newDateTime:{type:"object"},targetShape:{type:"sap.gantt.shape.BaseShape"}}},shapeConnect:{parameters:{fromShapeUid:{type:"string"},toShapeUid:{type:"string"},type:{type:"sap.gantt.simple.RelationshipType"}}}}}});u.prototype.init=function(){this.iGanttRenderedWidth=-1;this._bExtensionsInitialized=false;this._oExpandModel=new E();this._oSplitter=new S();this.setAggregation("_splitter",this._oSplitter);this._oSplitter.attachResize(this.onSplitterResize.bind(this));this._oSyncedControl=new d();this.setAggregation("_innerGantt",new I());this.setAggregation("_header",new G());this._sPreviousDisplayType=this.getDisplayType();};u.prototype.getInnerGantt=function(){return this.getAggregation("_innerGantt");};u.prototype.onSplitterResize=function(a){var O=a.getParameter("oldSizes"),N=a.getParameter("newSizes"),b=O.length>0&&O[0]!==-1,D=this.getDisplayType(),i=true,w=N[0];if(D===r.Both){if(this._sPreviousDisplayType===r.Chart){i=false;this._sPreviousDisplayType=D;}if(i&&w){this._iLastTableAreaSize=w;}}if(b){if(t(O.reduce(s),N.reduce(s))&&O[0]!==N[0]){this.setProperty("selectionPanelSize",w+"px",true);this.fireEvent("_selectionPanelResize",{newWidth:w,displayType:D});}this._draw(true);}};u.prototype.setLayoutData=function(L){this.setAggregation("layoutData",L,true);this.fireEvent("_layoutDataChange");return this;};u.prototype.setDisplayType=function(D){this._sPreviousDisplayType=this.getDisplayType();this.setProperty("displayType",D,false);return this;};u.prototype.applySettings=function(a,b){a=a||{};this._applyMissingSettings(a);C.prototype.applySettings.call(this,a,b);this._initSelectionModel(this.getProperty("shapeSelectionMode"));};u.prototype._applyMissingSettings=function(a){if(!a.axisTimeStrategy){a.axisTimeStrategy=new P();}if(!a.locale){a.locale=l.config.DEFAULT_LOCALE_CET.clone();}if(!a.shapeSchemes){a.shapeSchemes=[new f({key:"default",primary:true})];}else{var H=a.shapeSchemes.some(function(b){return b.getPrimary();});if(!H){q.sap.log.warning("you need set a ShapeSheme with primary:true");}}};u.prototype.getPrimaryShapeScheme=function(){return this.getShapeSchemes().filter(function(a){return a.getPrimary();})[0];};u.prototype.getSyncedControl=function(){return this._oSyncedControl;};u.prototype.getTableRowHeights=function(){return this.getSyncedControl().getRowHeights();};u.prototype.setTable=function(a){this.setAggregation("table",a);a._bVariableRowHeightEnabled=true;var O=this._oSplitter.removeContentArea(0);this._oSplitter.insertContentArea(new A({content:a,enableRootDiv:true}),0);if(O==null){this._oSyncedControl.syncWith(a);this._oSplitter.addContentArea(this._oSyncedControl);}else if(O&&O.getContent()!=a.getId()){this._oSyncedControl.syncWith(a);}a.detachEvent("_rowsUpdated",this._onTableRowsUpdated,this);a.attachEvent("_rowsUpdated",this._onTableRowsUpdated,this);};u.prototype.setEnableVariableRowHeight=function(b){if(this.getTable()){this.getTable()._bVariableRowHeightEnabled=b;}else{q.sap.log.warning("you need to set table aggregation first");}};u.prototype.getRenderedTimeRange=function(){return this.getAxisTime().getTimeRangeSlice(0,this.iGanttRenderedWidth);};u.prototype._initSelectionModel=function(a){if(this.oSelection){this.oSelection.detachSelectionChanged(this._onSelectionChanged,this);}this.oSelection=new e(a);this.oSelection.attachSelectionChanged(this._onSelectionChanged,this);return this;};u.prototype.setShapeSelectionMode=function(a){this.setProperty("shapeSelectionMode",a);if(this.oSelection){this.oSelection.setSelectionMode(a);}return this;};u.prototype.getSelectedShapeUid=function(){var a=this.oSelection.allUid();return a;};u.prototype._onSelectionChanged=function(a){var b=a.getParameter("shapeUid"),D=a.getParameter("deselectedUid"),i=a.getParameter("silent");this._updateShapeSelections(b,D);if(!i){this.fireShapeSelectionChange({shapeUids:b});}};u.prototype.handleShapePress=function(a){var b=a.shape,i=b.getShapeUid(),w=a.ctrlOrMeta;var N=!b.getSelected();this.oSelection.update(i,{selected:N,ctrl:w,draggable:b.getDraggable(),time:b.getTime(),endTime:b.getEndTime()});};u.prototype._updateShapeSelections=function(a,D){var b=this.getShapeSelectionMode();if(b===l.SelectionMode.None){return;}R.updateShapeSelections(this,a,D);};u.prototype.getSelection=function(){return this.oSelection;};u.prototype.getExpandedBackgroundData=function(){if(this._oExpandModel.hasExpandedRows()){var a=this.getTable().getRows();var b=a.length;var w=this.getTable().getFirstVisibleRow();var x=[];for(var i=0;i<b;i++){if(a[i].getIndex()>=w){var y=a[i].getAggregation("_settings");x.push(y.getRowUid());}}return this._oExpandModel.collectExpandedBgData(x);}};u.prototype.setAxisTimeStrategy=function(a){this.setAggregation("axisTimeStrategy",a,false);a.attachEvent("_redrawRequest",this._onRedrawRequest,this);return this;};u.prototype._onTableRowsUpdated=function(a){var b=a.getParameter("reason"),i=this.getInnerGantt();var w=v(c).slice();var x=w.concat(["Render","VerticalScroll","FirstVisibleRowChange","Resize"]);if(x.indexOf(b)!==-1){this.getSyncedControl().setAllowContentScroll(false);i.invalidate();}else{i.getRenderer().renderImmediately(this);}};u.prototype.syncVisibleHorizon=function(a,V,K){var b=this.getAxisTimeStrategy();var i=b.getTotalHorizon();var w;var x=this.getVisibleWidth();if(V!==undefined){if(x===undefined){return;}if(K){var y=b.getVisibleHorizon();var z=F.abapTimestampToDate(y.getStartTime());w=U.calculateHorizonByWidth(a,V,x,z);}else{w=U.calculateHorizonByWidth(a,V,x);}}else{w=a;}if(i.getEndTime()<w.getEndTime()){var B=F.abapTimestampToDate(w.getEndTime()).getTime()-F.abapTimestampToDate(w.getStartTime()).getTime();var D=F.abapTimestampToDate(i.getEndTime());var H=new Date();H.setTime(D.getTime()-B);w=new T({startTime:H,endTime:D});}this._updateVisibleHorizon(w,"syncVisibleHorizon",x);};u.prototype._updateVisibleHorizon=function(a,b,i){var w=this.getAxisTimeStrategy();w.updateGanttVisibleWidth(i);w.setVisibleHorizonWithReason(a,b);};u.prototype.syncMouseWheelZoom=function(a){this._getZoomExtension().performMouseWheelZooming(a.originEvent,true);};u.prototype.syncTimePeriodZoomOperation=function(a,b,O){this._getZoomExtension().syncTimePeriodZoomOperation(a,b,O);};u.prototype._onRedrawRequest=function(a){var b=a.getParameter("forceUpdate");var V=a.getParameter("valueBeforeChange");var i=a.getParameter("reasonCode");var O=a.getParameter("originEvent");if(i!=="totalHorizonUpdated"&&V){this._oLastVisibleHorizon=V;if(i!=="syncVisibleHorizon"){var w=this.getAxisTimeStrategy();var x=w.getVisibleHorizon();var y=this.getVisibleWidth();this.fireEvent("_visibleHorizonUpdate",{reasonCode:i,visibleHorizon:x,visibleWidth:y,originEvent:O});}}b=i==="initialRender"?true:b;this.redraw(b);this._setupDisplayType();};u.prototype.redraw=function(b){if(b){var a=this._getScrollExtension();a.clearOffsetWidth();}this._draw(b);};u.prototype._draw=function(){var a=this._getScrollExtension();var V=this.getVisibleWidth();if(!V){return;}var b=this.getAxisTimeStrategy().syncContext(V);this.fireEvent("_zoomInfoUpdated",b);if(b.axisTimeChanged){a.clearOffsetWidth();}a.needRerenderGantt(function(){this.getInnerGantt().getRenderer().renderImmediately(this);}.bind(this));};u.prototype.onBeforeRendering=function(a){this._updateRowHeightInExpandModel(this.getTable());g.detachEvents(this);};u.prototype.onAfterRendering=function(a){this._attachExtensions();g.attachEvents(this);this.jumpToVisibleHorizon("initialRender");};u.prototype._setupDisplayType=function(){var D=this.getDisplayType(),V,a;var b=function(a,i){var w=this._oSplitter.getContentAreas(),x=w[0].getLayoutData(),y=w[1].getLayoutData(),z=D===r.Both;x.setSize(a).setResizable(z);y.setSize(i).setResizable(z);}.bind(this);if(D===r.Table){V=this.getSyncedControl().$().find(".sapGanttBackgroundVScrollContentArea").width();if(V!==0){V+=2;}b("auto",V+"px");}else if(D===r.Chart){b("1px","auto");}else if(D!==this._sPreviousDisplayType){a=this._iLastTableAreaSize?this._iLastTableAreaSize+"px":this.getMetadata().getProperty("selectionPanelSize").getDefaultValue();b(a,"auto");}};u.prototype._updateRowHeightInExpandModel=function(a){var i=a.getRowHeight();if(i===0){i=a._getDefaultRowHeight();}this._oExpandModel.setBaseRowHeight(i);};u.prototype.jumpToVisibleHorizon=function(a){var b=this.getAxisTimeStrategy().getVisibleHorizon();this._updateVisibleHorizon(b,a,this.getVisibleWidth());};u.prototype.exit=function(){this._detachExtensions();};u.prototype._attachExtensions=function(){if(this._bExtensionsInitialized){return;}g.enrich(this,h);g.enrich(this,j);g.enrich(this,k);g.enrich(this,m);g.enrich(this,n);g.enrich(this,o);g.enrich(this,p);this._bExtensionsInitialized=true;};u.prototype._detachExtensions=function(){g.cleanup(this);};u.prototype.getAxisTime=function(){var a=this.getAxisTimeStrategy().getAxisTime();if(!a){this.getAxisTimeStrategy().createAxisTime(this.getLocale());a=this.getAxisTimeStrategy().getAxisTime();}return a;};u.prototype.getContentWidth=function(){var a=this.getAxisTime(),b=a.getViewRange();return Math.abs(Math.ceil(b[1])-Math.ceil(b[0]));};u.prototype.getVisibleWidth=function(){return this._getScrollExtension?this._getScrollExtension().getVisibleWidth():undefined;};u.prototype.expand=function(a,b){this.toggleShapeScheme(true,a,b);};u.prototype.collapse=function(a,b){this.toggleShapeScheme(false,a,b);};u.prototype.toggleShapeScheme=function(b,a,i){var w=[];if(typeof i==="number"){w=[i];}else if(Array.isArray(i)){w=i;}if(w.length===0||!a){return;}var x=this.getShapeSchemes().filter(function(B){return B.getKey()===a;});if(x==null||x.length===0||x.length>1){return;}var y=this.getPrimaryShapeScheme();var z=this._oExpandModel.isTableRowHeightNeedChange(b,this.getTable(),w,y,x[0]);if(z){this.getTable().invalidate();}};u.prototype.isShapeVisible=function(a){if(a&&a.isVisible()){return true;}var b=this.getRenderedTimeRange(),i=b[0],w=b[1];var x=a.getTime(),y=a.getEndTime();var z=function(B){return(B>=i&&B<=w);};if(a.getSelected()||!x||!y){return true;}else if(x&&y){return z(x)||z(y)||(x<=i&&y>=w);}else if(x&&!y){return z(x);}else if(!x&&y){return z(y);}};u.prototype.doBirdEye=function(i){var z=this._getZoomExtension();z.doBirdEye(i);};return u;},true);