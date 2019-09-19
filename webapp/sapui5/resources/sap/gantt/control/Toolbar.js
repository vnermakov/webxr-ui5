/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/gantt/library","sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/CustomData","sap/ui/base/ManagedObjectMetadata","sap/m/OverflowToolbar","sap/m/OverflowToolbarLayoutData","sap/m/ToolbarSpacer","sap/m/FlexBox","sap/m/FlexDirection","sap/m/Button","sap/m/SegmentedButton","sap/m/Select","sap/m/MenuButton","sap/m/Menu","sap/m/MenuItem","sap/ui/core/Item","sap/m/ViewSettingsDialog","sap/m/ViewSettingsCustomTab","sap/m/PlacementType","sap/m/CheckBox","sap/ui/core/Orientation","sap/m/Slider","sap/m/Popover"],function(l,C,a,b,M,O,c,T,F,d,B,S,e,f,g,h,j,V,k,P,n,o,p,q){"use strict";var L=l.config,r=l.control;var s=C.extend("sap.gantt.control.Toolbar",{metadata:{properties:{width:{type:"CSSSize",defaultValue:"100%"},height:{type:"CSSSize",defaultValue:"100%"},type:{type:"string",defaultValue:r.ToolbarType.Global},sourceId:{type:"string"},zoomLevel:{type:"int",defaultValue:0},enableTimeScrollSync:{type:"boolean",defaultValue:true},enableCursorLine:{type:"boolean",defaultValue:true},enableNowLine:{type:"boolean",defaultValue:true},enableVerticalLine:{type:"boolean",defaultValue:true},enableAdhocLine:{type:"boolean",defaultValue:true},modes:{type:"object[]",defaultValue:[L.DEFAULT_MODE]},mode:{type:"string",defaultValue:L.DEFAULT_MODE_KEY},toolbarSchemes:{type:"object[]",defaultValue:[L.DEFAULT_CONTAINER_TOOLBAR_SCHEME,L.DEFAULT_GANTTCHART_TOOLBAR_SCHEME,L.EMPTY_TOOLBAR_SCHEME]},hierarchies:{type:"object[]",defaultValue:[L.DEFAULT_HIERARCHY]},containerLayouts:{type:"object[]",defaultValue:[L.DEFAULT_CONTAINER_SINGLE_LAYOUT,L.DEFAULT_CONTAINER_DUAL_LAYOUT]}},aggregations:{legend:{type:"sap.ui.core.Control",multiple:false,visibility:"public"},customToolbarItems:{type:"sap.ui.core.Control",multiple:true,visibility:"public",singularName:"customToolbarItem"},_toolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"}},events:{sourceChange:{parameters:{id:{type:"string"}}},layoutChange:{parameters:{id:{type:"string"},value:{type:"string"}}},expandChartChange:{parameters:{action:{type:"string"},expandedChartSchemes:{type:"[]"}}},expandTreeChange:{parameters:{action:{type:"string"}}},zoomStopChange:{parameters:{index:{type:"int"},selectedItem:{type:"sap.ui.core.Item"}}},settingsChange:{parameters:{id:{type:"string"},value:{type:"boolean"}}},modeChange:{parameters:{mode:{type:"string"}}},birdEye:{parameters:{birdEyeRange:{type:"string"}}}}}});s.ToolbarItemPosition={Left:"Left",Right:"Right"};s.prototype.init=function(){this._oToolbar=new O({width:"auto",design:sap.m.ToolbarDesign.Auto});this.setAggregation("_toolbar",this._oToolbar,true);this._bClearCustomItems=true;this._resetToolbarInfo();this._oModesConfigMap={};this._oModesConfigMap[L.DEFAULT_MODE_KEY]=L.DEFAULT_MODE;this._oToolbarSchemeConfigMap={};this._oToolbarSchemeConfigMap[L.DEFAULT_CONTAINER_TOOLBAR_SCHEME_KEY]=L.DEFAULT_CONTAINER_TOOLBAR_SCHEME;this._oToolbarSchemeConfigMap[L.DEFAULT_GANTTCHART_TOOLBAR_SCHEME_KEY]=L.DEFAULT_GANTTCHART_TOOLBAR_SCHEME;this._oToolbarSchemeConfigMap[L.EMPTY_TOOLBAR_SCHEME_KEY]=L.EMPTY_TOOLBAR_SCHEME;this._oHierarchyConfigMap={};this._oHierarchyConfigMap[L.DEFAULT_HIERARCHY_KEY]=L.DEFAULT_HIERARCHY;this._oContainerLayoutConfigMap={};this._oContainerLayoutConfigMap[L.DEFAULT_CONTAINER_SINGLE_LAYOUT_KEY]=L.DEFAULT_CONTAINER_SINGLE_LAYOUT;this._oContainerLayoutConfigMap[L.DEFAULT_CONTAINER_DUAL_LAYOUT_KEY]=L.DEFAULT_CONTAINER_DUAL_LAYOUT;this._oZoomSlider=null;this._oSelect=null;this._iLiveChangeTimer=-1;this._aTimers=[];this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.gantt");this._nCounterOfDefaultSliders=0;this._sZoomControlType=L.ZoomControlType.SliderWithButtons;};s.prototype._resetToolbarInfo=function(){this._oItemConfiguration={Left:[],Right:[]};this._oAllItems={Left:[],Right:[]};if(this._bClearCustomItems){this._aCustomItems=[];this._iCustomItemInsertIndex=-1;}};s.prototype.applySettings=function(m,i){if(this.getSourceId()&&this.getType()){this._resetAllCompositeControls();}var R=C.prototype.applySettings.apply(this,arguments);return R;};s.prototype.onAfterRendering=function(){if(this._oVHButton&&jQuery("#"+this._oVHButton.getId())[0]){jQuery("#"+this._oVHButton.getId()).attr("aria-label",this._oRb.getText("TLTP_SWITCH_GANTTCHART"));}};s.prototype.setLegend=function(i){this.setAggregation("legend",i);if(!this._oLegendPop){this._oLegendPop=new q({placement:P.Bottom,showArrow:false,showHeader:false});}if(i){this._oLegendPop.removeAllContent();this._oLegendPop.addContent(i);this._oLegendPop.setOffsetX(this._calcOffsetForLegendPopover());}};s.prototype.updateZoomLevel=function(z){this._bSuppressZoomStopChange=true;this.setZoomLevel(z);};s.prototype.setZoomLevel=function(z,i){if(z>=0){var m=this.getZoomLevel();if(m!==z){this.setProperty("zoomLevel",z,i);if(this._oZoomSlider){this._oZoomSlider.setValue(z);this._oZoomSlider.setTooltip(this._oRb.getText("TLTP_SLIDER_ZOOM_LEVEL")+':'+z);if(!this._bSuppressZoomStopChange){this.fireZoomStopChange({index:z});}}if(this._oSelect){this._oSelect.setSelectedItem(this._oSelect.getItems()[z]);if(!this._bSuppressZoomStopChange){this.fireZoomStopChange({index:z,selectedItem:this._oSelect.getSelectedItem()});}}if(this._oToolbarScheme&&!isNaN(z)&&this._oZoomInButton&&this._oZoomOutButton&&this._oToolbarScheme.getTimeZoom()){var t=this._oToolbarScheme.getTimeZoom().getStepCountOfSlider()-1,u=0;if(z===t){this._oZoomInButton.setEnabled(false);this._oZoomOutButton.setEnabled(true);}else if(z===u){this._oZoomInButton.setEnabled(true);this._oZoomOutButton.setEnabled(false);}else{this._oZoomInButton.setEnabled(true);this._oZoomOutButton.setEnabled(true);}}}}this._bSuppressZoomStopChange=false;return this;};s.prototype.setMode=function(m){this.setProperty("mode",m);if(this._oModeSegmentButton){this._oModeSegmentButton.setSelectedButton(this._oModeButtonMap[m]);}return this;};s.prototype.setHierarchies=function(H){this.setProperty("hierarchies",H,true);this._oHierarchyConfigMap={};if(H){for(var i=0;i<H.length;i++){this._oHierarchyConfigMap[H[i].getKey()]=H[i];}}this._resetAllCompositeControls();return this;};s.prototype.setContainerLayouts=function(m){this.setProperty("containerLayouts",m,true);this._oContainerLayoutConfigMap={};if(m){for(var i=0;i<m.length;i++){this._oContainerLayoutConfigMap[m[i].getKey()]=m[i];}}this._resetAllCompositeControls();return this;};s.prototype.setModes=function(m){this.setProperty("modes",m,true);this._oModesConfigMap={};if(m){for(var i=0;i<m.length;i++){this._oModesConfigMap[m[i].getKey()]=m[i];}}return this;};s.prototype.setToolbarDesign=function(t){this._oToolbar.setDesign(t);return this;};s.prototype.setToolbarSchemes=function(t){this.setProperty("toolbarSchemes",t,true);this._oToolbarSchemeConfigMap={};if(t){for(var i=0;i<t.length;i++){this._oToolbarSchemeConfigMap[t[i].getKey()]=t[i];}}this._resetAllCompositeControls();return this;};s.prototype.setSourceId=function(i){this.setProperty("sourceId",i,true);this._resetAllCompositeControls();return this;};s.prototype.setType=function(t){this.setProperty("type",t,true);this._resetAllCompositeControls();return this;};s.prototype.addCustomToolbarItem=function(i){if(this._iCustomItemInsertIndex==-1){this._oToolbar.insertContent(i,0);this._iCustomItemInsertIndex++;}else{this._oToolbar.insertContent(i,this._iCustomItemInsertIndex+1);this._iCustomItemInsertIndex++;}this._aCustomItems.push(i);this._resetAllCompositeControls();return this;};s.prototype.insertCustomToolbarItem=function(i,I){var m=this._aCustomItems.length;if(I>=m){I=m;}if(this._iCustomItemInsertIndex===-1){this._oToolbar.insertContent(i,0);this._aCustomItems.push(i);}else{this._oToolbar.insertContent(i,this._iCustomItemInsertIndex-this._aCustomItems.length+1+I);this._aCustomItems.splice(I,0,i);}this._iCustomItemInsertIndex++;return this;};s.prototype.removeCustomToolbarItem=function(v){if(this._aCustomItems.length===0){return this._aCustomItems;}if((typeof v)==="number"){var i=this._aCustomItems.length;var R=v>i?i:v;this._oToolbar.removeContent(this._iCustomItemInsertIndex-i+R+1);this._iCustomItemInsertIndex--;return this._aCustomItems.splice(R,1);}else if(v){this._oToolbar.removeContent(v);this._iCustomItemInsertIndex--;return this._aCustomItems.splice(jQuery.inArray(v,this._aCustomItems),1);}};s.prototype.getCustomToolbarItems=function(){return this._aCustomItems.slice(0);};s.prototype.destroyCustomToolbarItems=function(){var i=this.removeAllCustomToolbarItems();i.forEach(function(m){m.destroy();});return i;};s.prototype.removeAllCustomToolbarItems=function(){var R=[];for(var i=0;i<this._aCustomItems.length;i++){R.push(this._oToolbar.removeContent(this._aCustomItems[i]));}this._iCustomItemInsertIndex=this._iCustomItemInsertIndex-this._aCustomItems.length;this._aCustomItems.splice(0,this._aCustomItems.length);return R;};s.prototype._resetAllCompositeControls=function(){this._determineToolbarSchemeConfig(this.getSourceId());this._destroyCompositeControls();if(!this._sToolbarSchemeKey){return;}this._resolvePositions();var i,t,u=s.ToolbarItemPosition.Left,R=s.ToolbarItemPosition.Right;var v=this._oItemConfiguration[u];for(i=0;i<v.length;i++){if(v[i]){this._createCompositeControl(u,i,v[i]);}}var w=this._oItemConfiguration[R];for(i=w.length-1;i>=0;i--){if(w[i]){this._createCompositeControl(R,i,w[i]);}}var A=function(t){if(jQuery.isArray(t)){for(var m=0;m<t.length;m++){this._oToolbar.addContent(t[m]);}}else if(t){this._oToolbar.addContent(t);}};for(i=0;i<this._oAllItems[u].length;i++){t=this._oAllItems[u][i];A.call(this,t);}if(this._oAllItems[u].length!==0||this._oAllItems[R].length!==0){this._oToolbar.addContent(new T());}for(i=0;i<this._oAllItems[R].length;i++){t=this._oAllItems[R][i];A.call(this,t);}};s.prototype.getAllToolbarItems=function(){return this._oToolbar.getContent();};s.prototype._determineToolbarSchemeConfig=function(i){this._sToolbarSchemeKey=null;if(this.getType()===r.ToolbarType.Global&&this._oContainerLayoutConfigMap[i]){this._sToolbarSchemeKey=this._oContainerLayoutConfigMap[i].getToolbarSchemeKey();this._sInitMode=this.getMode()!=L.DEFAULT_MODE_KEY?this.getMode():this._oContainerLayoutConfigMap[i].getActiveModeKey();}else if(this.getType()===r.ToolbarType.Local&&this._oHierarchyConfigMap[i]){this._sToolbarSchemeKey=this._oHierarchyConfigMap[i].getToolbarSchemeKey();this._sInitMode=this.getMode()!=L.DEFAULT_MODE_KEY?this.getMode():this._oHierarchyConfigMap[i].getActiveModeKey();}if(this._oToolbarScheme==this._oToolbarSchemeConfigMap[this._sToolbarSchemeKey]){this._bClearCustomItems=false;}else{this._oToolbarScheme=this._oToolbarSchemeConfigMap[this._sToolbarSchemeKey];this._bClearCustomItems=true;}if(this._oToolbarScheme&&this._oToolbarScheme.getProperty("toolbarDesign")){this.setToolbarDesign(this._oToolbarScheme.getProperty("toolbarDesign"));}};s.prototype._destroyCompositeControls=function(){this._oToolbar.removeAllContent();this._resetToolbarInfo();};s.prototype._resolvePositions=function(){if(this._oToolbarScheme){jQuery.each(this._oToolbarScheme.getMetadata().getAllProperties(),function(m){if(m!=="key"&&m!=="toolbarDesign"){var t=this._oToolbarScheme.getProperty(m);if(t){var u=this._parsePosition(t.getPosition());this._oItemConfiguration[u.position][u.idx]=jQuery.extend({},{groupId:m},t);}}}.bind(this));var i=this._oItemConfiguration;var A=Object.keys(i);A.forEach(function(m){var t=i[m],u=[];var v=Object.keys(t).sort();v.forEach(function(w,x){u.push(t[w]);});i[m]=u;});}};s.prototype._parsePosition=function(i){return{position:i.toUpperCase().substr(0,1)==="L"?s.ToolbarItemPosition.Left:s.ToolbarItemPosition.Right,idx:parseInt(i.substr(1,i.length-1),10)};};s.prototype._createCompositeControl=function(i,I,G){var v;switch(G.groupId){case"sourceSelect":v=this._genSourceSelectGroup(G);break;case"birdEye":v=this._genBirdEyeGroup(G);break;case"layout":v=this._genLayoutGroup(G);break;case"expandChart":v=this._genExpandChartGroup(G);break;case"expandTree":v=this._genExpandTreeGroup(G);break;case"customToolbarItems":v=this._genCustomToolbarItemGroup(i,G);break;case"mode":v=this._genModeButtonGroup(G);break;case"timeZoom":v=this._genTimeZoomGroupControls(G);break;case"legend":v=this._genLegend(G);break;case"settings":v=this._genSettings(G);break;default:break;}if(v){this._oAllItems[i]=this._oAllItems[i].concat(v);}};s.prototype._genBirdEyeGroup=function(G){var t=this;var i=new c({priority:G.getOverflowPriority()});var m=this._oRb.getText("TXT_BRIDEYE");var u=this._oRb.getText("TXT_BRIDEYE_RANGE_VISIBLE_ROWS");var v=this._oRb.getText("TXT_BRIDEYE_RANGE_ALL_ROWS");var w=this._oRb.getText("TLTP_BRIDEYE_ON_VISIBLE_ROWS");var x=this._oRb.getText("TLTP_BRIDEYE_ON_ALL_ROWS");this._oBirdEyeButton=null;if(G.getBirdEyeRange()===L.BirdEyeRange.AllRows){this._oBirdEyeButton=new B({id:this._getConfigButtonId(G),icon:"sap-icon://show",tooltip:m+"("+v+"): "+x,layoutData:i,press:function(E){t.fireBirdEye({action:"birdEye",birdEyeRange:G.getBirdEyeRange()});}});}else if(G.getBirdEyeRange()===L.BirdEyeRange.VisibleRows){this._oBirdEyeButton=new B({id:this._getConfigButtonId(G),icon:"sap-icon://show",tooltip:m+"("+u+"): "+w,layoutData:i,press:function(E){t.fireBirdEye({action:"birdEye",birdEyeRange:G.getBirdEyeRange()});}});}else{this._oBirdEyeButton=new f({width:"8rem",text:u,tooltip:m+": "+w,icon:"sap-icon://show",buttonMode:sap.m.MenuButtonMode.Split,useDefaultActionOnly:true,defaultAction:function(E){t.fireBirdEye({action:"birdEye",birdEyeRange:this._currentBirdEyeRange?this._currentBirdEyeRange:L.BirdEyeRange.VisibleRows});}});var y=new g({id:this._getConfigButtonId(G),itemSelected:function(E){var I=E.getParameter("item");var A=I.birdEyeRange;t._oBirdEyeButton.setTooltip(I.getTooltip());t._oBirdEyeButton.setText(I.getText());I.setIcon("sap-icon://show");if(!this.getParent()._currentBirdEyeRange||this.getParent()._currentBirdEyeRange!==A){this.getParent()._currentBirdEyeRange=A;}t.fireBirdEye({action:"birdEye",birdEyeRange:A});}});var z=new h({text:u,tooltip:m+": "+w,press:function(E){this.setIcon();}});z.birdEyeRange=L.BirdEyeRange.VisibleRows;y.addItem(z);z=new h({text:v,tooltip:m+": "+x,press:function(E){this.setIcon();}});z.birdEyeRange=L.BirdEyeRange.AllRows;y.addItem(z);this._oBirdEyeButton.setMenu(y);}return this._oBirdEyeButton;};s.prototype._genSourceSelectGroup=function(G){var i=this.getSourceId();var t=this;var m;this._oSourceSelectBox=new e({id:this._getConfigButtonId(G),layoutData:new c({priority:G.getOverflowPriority()}),width:"200px",change:function(E){var v=E.getParameter("selectedItem");var w=v.oSourceConfig;t.fireSourceChange({id:v.getKey(),config:w});}});switch(this.getType()){case r.ToolbarType.Global:m=this.getContainerLayouts();this._oSourceSelectBox.setTooltip(this._oRb.getText("TLTP_GLOBAL_HIERARCHY_RESOURCES"));break;case r.ToolbarType.Local:m=this.getHierarchies();this._oSourceSelectBox.setTooltip(this._oRb.getText("TLTP_LOCAL_HIERARCHY_RESOURCES"));break;default:return null;}var u;for(var I=0;I<m.length;I++){u=new j({key:m[I].getKey(),text:m[I].getText()});u.oSourceConfig=m[I];this._oSourceSelectBox.addItem(u);if(u.getKey()===i){this._oSourceSelectBox.setSelectedItem(u);}}return this._oSourceSelectBox;};s.prototype._genLayoutGroup=function(G){if(this.getType==="LOCAL"){return null;}var t=this,H=this.getHierarchies(),m,i;this._oAddGanttChartSelect=new e({id:this._getConfigButtonId(G,"add"),icon:"sap-icon://add",type:sap.m.SelectType.IconOnly,autoAdjustWidth:true,maxWidth:"50px",tooltip:this._oRb.getText("TLTP_ADD_GANTTCHART"),forceSelection:false,layoutData:new c({priority:G.getOverflowPriority()}),change:function(v){if(v.getParameter("selectedItem")){var w=t.data("holder");if(w.getGanttCharts().length<w.getMaxNumOfGanttCharts()){if(!t._oLessGanttChartSelect.getEnabled()){t._oLessGanttChartSelect.setEnabled(true);if(t._oVHButton){t._oVHButton.setEnabled(true);}}if(w.getGanttCharts().length==w.getMaxNumOfGanttCharts()-1){this.setEnabled(false);}v.getSource().setSelectedItemId("");t.fireLayoutChange({id:"add",value:{hierarchyKey:v.getParameter("selectedItem").getKey(),hierarchyConfig:v.getParameter("selectedItem").data("hierarchyConfig")}});}if(w.getGanttCharts().length>w.getMaxNumOfGanttCharts()){this.setEnabled(false);}}}});if(H&&H.length>0){for(i=0;i<H.length;i++){m=new j({text:H[i].getText(),key:H[i].getKey()});m.data("hierarchyConfig",H[i]);this._oAddGanttChartSelect.addItem(m);}}var E=this._oContainerLayoutConfigMap[this.getSourceId()].getGanttChartLayouts().length>1?true:false;this._oLessGanttChartSelect=new e({id:this._getConfigButtonId(G,"less"),icon:"sap-icon://less",type:sap.m.SelectType.IconOnly,tooltip:this._oRb.getText("TLTP_REMOVE_GANTTCHART"),maxWidth:"50px",autoAdjustWidth:true,forceSelection:false,enabled:E,layoutData:new c({priority:G.getOverflowPriority()}),change:function(v){if(v.getParameter("selectedItem")){var w=t.data("holder");if(w.getGanttCharts().length<=w.getMaxNumOfGanttCharts()){if(!t._oAddGanttChartSelect.getEnabled()){t._oAddGanttChartSelect.setEnabled(true);}}t.fireLayoutChange({id:"less",value:{hierarchyKey:v.getParameter("selectedItem").getKey(),hierarchyConfig:v.getParameter("selectedItem").data("hierarchyConfig"),ganttChartIndex:v.getParameter("selectedItem").data("ganttChartIndex")}});var x=v.getSource().getSelectedItem();if(x){x.setText("");}if(w.getGanttCharts().length==1){this.setEnabled(false);if(t._oVHButton){t._oVHButton.setEnabled(false);}}}}});this._oLessGanttChartSelect.addEventDelegate({onclick:this._fillLessGanttChartSelectItem},this);var I=this._oContainerLayoutConfigMap[this.getSourceId()].getOrientation()===o.Vertical?"sap-icon://resize-vertical":"sap-icon://resize-horizontal";var u=this._oContainerLayoutConfigMap[this.getSourceId()].getOrientation()===o.Vertical?this._oRb.getText("TLTP_ARRANGE_GANTTCHART_VERTICALLY"):this._oRb.getText("TLTP_ARRANGE_GANTTCHART_HORIZONTALLY");this._oVHButton=new B({id:this._getConfigButtonId(G),icon:I,tooltip:u,type:G.getButtonType(),layoutData:new c({priority:G.getOverflowPriority()}),press:function(v){switch(this.getIcon()){case"sap-icon://resize-vertical":this.setIcon("sap-icon://resize-horizontal");this.setTooltip(t._oRb.getText("TLTP_ARRANGE_GANTTCHART_HORIZONTALLY"));t.fireLayoutChange({id:"orientation",value:o.Horizontal});break;case"sap-icon://resize-horizontal":this.setIcon("sap-icon://resize-vertical");this.setTooltip(t._oRb.getText("TLTP_ARRANGE_GANTTCHART_VERTICALLY"));t.fireLayoutChange({id:"orientation",value:o.Vertical});break;default:break;}}});this._oLayoutButton=[this._oAddGanttChartSelect,this._oLessGanttChartSelect,this._oVHButton];return this._oLayoutButton;};s.prototype._fillLessGanttChartSelectItem=function(){var G=this.data("holder").getGanttCharts(),I;this._oLessGanttChartSelect.removeAllItems();if(G&&G.length>0){for(var i=0;i<G.length;i++){I=new j({text:this._oHierarchyConfigMap[G[i].getHierarchyKey()].getText(),key:G[i].getHierarchyKey()});I.data("hierarchyConfig",this._oHierarchyConfigMap[G[i].getHierarchyKey()]);I.data("ganttChartIndex",i);this._oLessGanttChartSelect.insertItem(I,i);}}};s.prototype._genExpandChartGroup=function(G){this._aChartExpandButtons=[];var m=function(v){this.fireExpandChartChange({isExpand:v.getSource().data("isExpand"),expandedChartSchemes:v.getSource().data("chartSchemeKeys")});};var E=G.getExpandCharts(),t;for(var i=0;i<E.length;i++){var u=E[i];t=new B({id:this._getConfigButtonId(u),icon:u.getIcon(),tooltip:u.getTooltip(),layoutData:new c({priority:G.getOverflowPriority()}),press:m.bind(this),type:G.getButtonType(),customData:[new b({key:"isExpand",value:u.getIsExpand()}),new b({key:"chartSchemeKeys",value:u.getChartSchemeKeys()})]});if(G.getShowArrowText()){t.setText(u.getIsExpand()?"ꜜ":"ꜛ");}this._aChartExpandButtons.push(t);}return this._aChartExpandButtons;};s.prototype._genCustomToolbarItemGroup=function(i,G){if(this._iCustomItemInsertIndex===-1){if(i==s.ToolbarItemPosition.Left){var t=this._oAllItems[i].length;this._iCustomItemInsertIndex=t-1;}else{var t=this._oAllItems[s.ToolbarItemPosition.Left].length+1+this._oAllItems[i].length;this._iCustomItemInsertIndex=t-1;}}return this._aCustomItems;};s.prototype._genExpandTreeGroup=function(G){var t=this;this._oTreeGroup=[new B({id:this._getConfigButtonId(G,"expand"),icon:"sap-icon://expand",tooltip:this._oRb.getText("TLTP_EXPAND"),type:G.getButtonType(),layoutData:new c({priority:G.getOverflowPriority()}),enabled:false,press:function(E){t.fireExpandTreeChange({action:"expand"});}}),new B({id:this._getConfigButtonId(G,"collapse"),icon:"sap-icon://collapse",tooltip:this._oRb.getText("TLTP_COLLAPSE"),layoutData:new c({priority:G.getOverflowPriority()}),enabled:false,press:function(E){t.fireExpandTreeChange({action:"collapse"});}})];return this._oTreeGroup;};s.prototype._genModeButtonGroup=function(G){var m=function(E){var i=E.getParameter("button");this.fireModeChange({mode:i.data("mode")});};this._oModeSegmentButton=new S({select:m.bind(this)});this._oModeButtonMap={};var J=function(i,t){if(this._oModesConfigMap[t]){var u=new B({id:this._getConfigButtonId(this._oModesConfigMap[t]),icon:this._oModesConfigMap[t].getIcon(),activeIcon:this._oModesConfigMap[t].getActiveIcon(),type:G.getButtonType(),tooltip:this._oModesConfigMap[t].getText(),layoutData:new c({priority:G.getOverflowPriority()}),customData:[new b({key:"mode",value:t})]});this._oModeButtonMap[t]=u;this._oModeSegmentButton.addButton(u);}};jQuery.each(G.getModeKeys(),J.bind(this));if(this._sInitMode){this._oModeSegmentButton.setSelectedButton(this._oModeButtonMap[this._sInitMode]);}return this._oModeSegmentButton;};s.prototype._getCounterOfZoomLevels=function(){if(!this._nCounterOfDefaultSliders){this._nCounterOfDefaultSliders=this._oToolbarScheme.getTimeZoom().getStepCountOfSlider();}var i=this._oToolbarScheme.getTimeZoom().getInfoOfSelectItems();if(!i||i.length===0){this._oToolbarScheme.getTimeZoom().setStepCountOfSlider(this._nCounterOfDefaultSliders);return this._nCounterOfDefaultSliders;}var m=i.length;this._oToolbarScheme.getTimeZoom().setStepCountOfSlider(m);return m;};s.prototype._getZoomControlType=function(){return this._sZoomControlType;};s.prototype._genTimeZoomGroupControls=function(G){var t=this;var z=G.getZoomControlType(),R=[],m,Z,u,v;var w=new c({priority:G.getOverflowPriority()});var U=function(E){jQuery.sap.clearDelayedCall(this._iLiveChangeTimer);this._iLiveChangeTimer=-1;this.setZoomLevel(E,true);};this._sZoomControlType=z;this.fireEvent("_zoomControlTypeChange",{zoomControlType:z});if(z===L.ZoomControlType.None){return R;}else if(z===L.ZoomControlType.Select){var x=[],I=this._oToolbarScheme.getTimeZoom().getInfoOfSelectItems();if(I.length>0){if(I[0]instanceof j){x=I;}else{for(var i=0;i<I.length;i++){var y=new j({key:I[i].key,text:I[i].text});x.push(y);}}}m=new e({id:this._getConfigButtonId(G,"select"),items:x,selectedItem:x[this.getZoomLevel()],layoutData:w,change:function(E){var m=E.getSource();var H=m.getSelectedItem();var J=m.indexOfItem(H);this._iLiveChangeTimer=jQuery.sap.delayedCall(200,t,U,[J,H]);}});this._oSelect=m;R.push(m);}else{var A=this._getCounterOfZoomLevels();if(this.data("holder")&&this.data("holder").getSliderStep()){A=this.data("holder").getSliderStep();}if(z!==L.ZoomControlType.ButtonsOnly){Z=new p({tooltip:this._oRb.getText("TLTP_SLIDER_ZOOM_LEVEL")+':'+this.getZoomLevel(),showHandleTooltip:true,showAdvancedTooltip:true,id:this._getConfigButtonId(G,"slider"),width:"200px",layoutData:w,max:A-1,value:this.getZoomLevel(),min:0,step:1,liveChange:function(E){var H=parseInt(E.getParameter("value"),10);jQuery.sap.clearDelayedCall(this._iLiveChangeTimer);this._iLiveChangeTimer=jQuery.sap.delayedCall(200,this,U,[H]);}.bind(this)});}if(z!==L.ZoomControlType.SliderOnly){var D=function(E){return function(H){var J=parseInt(E?this._oZoomSlider.stepUp(1).getValue():this._oZoomSlider.stepDown(1).getValue(),10);this._iLiveChangeTimer=jQuery.sap.delayedCall(200,this,U,[J]);};};u=new sap.m.Button({id:this._getConfigButtonId(G,"zoomIn"),icon:"sap-icon://zoom-in",type:G.getButtonType(),tooltip:this._oRb.getText("TLTP_SLIDER_ZOOM_IN"),layoutData:w.clone(),press:D(true).bind(this)});v=new B({id:this._getConfigButtonId(G,"zoomOut"),icon:"sap-icon://zoom-out",type:G.getButtonType(),tooltip:this._oRb.getText("TLTP_SLIDER_ZOOM_OUT"),layoutData:w.clone(),press:D(false).bind(this)});}if(v){R.push(v);this._oZoomOutButton=v;}if(Z){R.push(Z);this._oZoomSlider=Z;}if(u){R.push(u);this._oZoomInButton=u;}}return R;};s.prototype._genLegend=function(G){if(!this._oLegendPop){this._oLegendPop=new q({placement:P.Bottom,showArrow:false,showHeader:false});}if(this.getLegend()){this._oLegendPop.removeAllContent();this._oLegendPop.addContent(this.getLegend());}this._oLegendButton=new B({id:this._getConfigButtonId(G),icon:"sap-icon://legend",type:G.getButtonType(),tooltip:this._oRb.getText("TLTP_SHOW_LEGEND"),layoutData:new c({priority:G.getOverflowPriority(),closeOverflowOnInteraction:false}),press:function(E){this._oLegendPop.setOffsetX(this._calcOffsetForLegendPopover());var i=this._oLegendPop;if(i.isOpen()){i.close();}else{i.openBy(this._oLegendButton);}}.bind(this)});return this._oLegendButton;};s.prototype._genSettings=function(G){var m=G.getItems()||[];var t=this;var A=m.map(function(i){return new n({name:i.getKey(),text:i.getDisplayText(),tooltip:i.getTooltip(),selected:i.getChecked()}).addStyleClass("sapUiSettingBoxItem");});this._aOldSettingState=A.map(function(i){return i.getSelected();});var R=function(A){for(var i=0;i<A.length;i++){switch(A[i].getName()){case L.SETTING_ITEM_ENABLE_NOW_LINE_KEY:A[i].setSelected(this.getEnableNowLine());break;case L.SETTING_ITEM_ENABLE_CURSOR_LINE_KEY:A[i].setSelected(this.getEnableCursorLine());break;case L.SETTING_ITEM_ENABLE_VERTICAL_LINE_KEY:A[i].setSelected(this.getEnableVerticalLine());break;case L.SETTING_ITEM_ENABLE_ADHOC_LINE_KEY:A[i].setSelected(this.getEnableAdhocLine());break;case L.SETTING_ITEM_ENABLE_TIME_SCROLL_SYNC_KEY:A[i].setSelected(this.getEnableTimeScrollSync());break;default:break;}}}.bind(this);this._oSettingsBox=new F({direction:d.Column,items:A}).addStyleClass("sapUiSettingBox");this._oSettingsDialog=new V({title:this._oRb.getText("SETTINGS_DIALOG_TITLE"),customTabs:[new k({content:this._oSettingsBox})],confirm:function(){var u=this._oSettingsBox.getItems();var v=[];for(var i=0;i<u.length;i++){v.push({id:u[i].getName(),value:u[i].getSelected()});t._aOldSettingState[i]=u[i].getSelected();}this.fireSettingsChange(v);}.bind(this),cancel:function(){R(A);}});this._oSettingsButton=new B({id:this._getConfigButtonId(G),icon:"sap-icon://action-settings",type:G.getButtonType(),tooltip:this._oRb.getText("TLTP_CHANGE_SETTINGS"),layoutData:new c({priority:G.getOverflowPriority()}),press:function(E){this._oSettingsDialog.open();}.bind(this)});return this._oSettingsButton;};s.prototype.toggleExpandTreeButton=function(R){if(this._oTreeGroup&&this._oTreeGroup.length>0){this._oTreeGroup.forEach(function(i){i.setEnabled(R);});}};s.prototype.getToolbarSchemeKey=function(){return this._sToolbarSchemeKey;};s.prototype.setEnableNowLine=function(E){this.setProperty("enableNowLine",E,true);if(this._oSettingsBox&&this._oSettingsBox.getItems().length>0){this._setSettingItemProperties(L.SETTING_ITEM_ENABLE_NOW_LINE_KEY,E);}return this;};s.prototype.setEnableCursorLine=function(E){this.setProperty("enableCursorLine",E,true);if(this._oSettingsBox&&this._oSettingsBox.getItems().length>0){this._setSettingItemProperties(L.SETTING_ITEM_ENABLE_CURSOR_LINE_KEY,E);}return this;};s.prototype.setEnableVerticalLine=function(E){this.setProperty("enableVerticalLine",E,true);if(this._oSettingsBox&&this._oSettingsBox.getItems().length>0){this._setSettingItemProperties(L.SETTING_ITEM_ENABLE_VERTICAL_LINE_KEY,E);}return this;};s.prototype.setEnableAdhocLine=function(E){this.setProperty("enableAdhocLine",E,true);if(this._oSettingsBox&&this._oSettingsBox.getItems().length>0){this._setSettingItemProperties(L.SETTING_ITEM_ENABLE_ADHOC_LINE_KEY,E);}return this;};s.prototype.setEnableTimeScrollSync=function(E){this.setProperty("enableTimeScrollSync",E,true);if(this._oSettingsBox&&this._oSettingsBox.getItems().length>0){this._setSettingItemProperties(L.SETTING_ITEM_ENABLE_TIME_SCROLL_SYNC_KEY,E);}return this;};s.prototype._setSettingItemProperties=function(m,t){var u=this._oSettingsBox.getItems();for(var i=0;i<u.length;i++){if(u[i].getName()===m){u[i].setSelected(t);break;}}};s.prototype.exit=function(){if(this._oLegendPop){this._oLegendPop.destroy(false);}if(this._oSettingsPop){this._oSettingsPop.destroy(false);}};s.prototype._calcOffsetForLegendPopover=function(){var i=0,m=65;var t=1;var z=1;var u=window.devicePixelRatio||1;u=Math.round(u*100)/100;if(sap.ui.Device.browser.name==="ie"){z=Math.round((screen.deviceXDPI/screen.logicalXDPI)*100)/100;}else if(sap.ui.Device.browser.name==="cr"){z=Math.round((window.outerWidth/window.innerWidth)*100)/100;}else{z=u;}if(z!==1){if(z<1||(z-1)%1===0){m+=m*(z-1)*0.1;}else{m=85;}u=Math.round(u*10)/10;if(z<1){t=u+Math.floor((1-z)*10)/10;}else if(z<=1.1){t=Math.round(z*10)/10*u;}else{t=u-Math.floor((z-1.1)*10)/10;}}if(a.getConfiguration().getRTL()===true){i=140;}else{var v=this._oLegendPop.getContent();if(v&&v.length>0){var w=sap.ui.getCore().byId(v[0].getContent());i=Math.round((m-parseInt(w.getWidth(),10))*t);}}return i;};s.prototype.getZoomLevels=function(){if(this._oToolbarScheme){var t=this._oToolbarScheme.getTimeZoom();if(t){switch(t.getZoomControlType()){case L.ZoomControlType.Select:return t.getTextsOfSelect()||0;case L.ZoomControlType.None:return-1;default:return t.getStepCountOfSlider();}}}return-1;};s.prototype._getConfigButtonId=function(i,m){var I=null;if(M.isGeneratedId(i.getId())){return I;}var t=this.getParent();if(t){t=this.getType()==="LOCAL"?t.getParent():t;if(t){I=t.getId()+"-"+i.getId();I=m?I+"-"+m:I;}}return I;};return s;},true);