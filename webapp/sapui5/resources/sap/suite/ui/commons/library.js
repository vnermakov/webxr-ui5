/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/library","sap/m/library"],function(){"use strict";sap.ui.getCore().initLibrary({name:"sap.suite.ui.commons",dependencies:["sap.ui.core","sap.m"],types:["sap.suite.ui.commons.BulletChartMode","sap.suite.ui.commons.CalculationBuilderComparisonOperatorType","sap.suite.ui.commons.CalculationBuilderFunctionType","sap.suite.ui.commons.CalculationBuilderItemType","sap.suite.ui.commons.CalculationBuilderLayoutType","sap.suite.ui.commons.CalculationBuilderLogicalOperatorType","sap.suite.ui.commons.CalculationBuilderOperatorType","sap.suite.ui.commons.CalculationBuilderValidationType","sap.suite.ui.commons.CommonBackground","sap.suite.ui.commons.ComparisonChartView","sap.suite.ui.commons.DeviationIndicator","sap.suite.ui.commons.FacetOverviewHeight","sap.suite.ui.commons.FrameType","sap.suite.ui.commons.HeaderContainerView","sap.suite.ui.commons.InfoTileSize","sap.suite.ui.commons.InfoTileTextColor","sap.suite.ui.commons.InfoTileValueColor","sap.suite.ui.commons.LoadState","sap.suite.ui.commons.MicroAreaChartView","sap.suite.ui.commons.MicroProcessFlowRenderType","sap.suite.ui.commons.networkgraph.ActionButtonPosition","sap.suite.ui.commons.networkgraph.BackgroundColor","sap.suite.ui.commons.networkgraph.ElementStatus","sap.suite.ui.commons.networkgraph.LayoutAlgorithmType","sap.suite.ui.commons.networkgraph.LineArrowOrientation","sap.suite.ui.commons.networkgraph.LineArrowPosition","sap.suite.ui.commons.networkgraph.LineType","sap.suite.ui.commons.networkgraph.HeaderCheckboxState","sap.suite.ui.commons.networkgraph.NodePlacement","sap.suite.ui.commons.networkgraph.NodeShape","sap.suite.ui.commons.networkgraph.NodeSize","sap.suite.ui.commons.networkgraph.Orientation","sap.suite.ui.commons.networkgraph.RenderType","sap.suite.ui.commons.ProcessFlowConnectionLabelState","sap.suite.ui.commons.ProcessFlowConnectionState","sap.suite.ui.commons.ProcessFlowConnectionType","sap.suite.ui.commons.ProcessFlowDisplayState","sap.suite.ui.commons.ProcessFlowLaneState","sap.suite.ui.commons.ProcessFlowNodeState","sap.suite.ui.commons.ProcessFlowNodeType","sap.suite.ui.commons.ProcessFlowZoomLevel","sap.suite.ui.commons.SelectionState","sap.suite.ui.commons.statusindicator.FillingType","sap.suite.ui.commons.statusindicator.FillingDirectionType","sap.suite.ui.commons.taccount.TAccountPanelState","sap.suite.ui.commons.ThingGroupDesign","sap.suite.ui.commons.TimelineAlignment","sap.suite.ui.commons.TimelineAxisOrientation","sap.suite.ui.commons.TimelineFilterType","sap.suite.ui.commons.TimelineGroupType","sap.suite.ui.commons.TimelineScrollingFadeout","sap.suite.ui.commons.ValueStatus"],interfaces:[],controls:["sap.suite.ui.commons.BulletChart","sap.suite.ui.commons.BusinessCard","sap.suite.ui.commons.CalculationBuilder","sap.suite.ui.commons.CalculationBuilderExpression","sap.suite.ui.commons.CalculationBuilderFunction","sap.suite.ui.commons.CalculationBuilderInput","sap.suite.ui.commons.CalculationBuilderItem","sap.suite.ui.commons.CalculationBuilderValidationResult","sap.suite.ui.commons.CalculationBuilderVariable","sap.suite.ui.commons.ChartContainer","sap.suite.ui.commons.ChartContainerContent","sap.suite.ui.commons.ChartContainerToolbarPlaceholder","sap.suite.ui.commons.ChartTile","sap.suite.ui.commons.ColumnMicroChart","sap.suite.ui.commons.ComparisonChart","sap.suite.ui.commons.DateRangeScroller","sap.suite.ui.commons.DateRangeSlider","sap.suite.ui.commons.DateRangeSliderInternal","sap.suite.ui.commons.DeltaMicroChart","sap.suite.ui.commons.DynamicContainer","sap.suite.ui.commons.FacetOverview","sap.suite.ui.commons.FeedItemHeader","sap.suite.ui.commons.FeedTile","sap.suite.ui.commons.GenericTile","sap.suite.ui.commons.GenericTile2X2","sap.suite.ui.commons.HarveyBallMicroChart","sap.suite.ui.commons.HeaderCell","sap.suite.ui.commons.HeaderContainer","sap.suite.ui.commons.InfoTile","sap.suite.ui.commons.JamContent","sap.suite.ui.commons.KpiTile","sap.suite.ui.commons.LaunchTile","sap.suite.ui.commons.LinkActionSheet","sap.suite.ui.commons.MicroAreaChart","sap.suite.ui.commons.MonitoringContent","sap.suite.ui.commons.MonitoringTile","sap.suite.ui.commons.networkgraph.Graph","sap.suite.ui.commons.networkgraph.Node","sap.suite.ui.commons.NewsContent","sap.suite.ui.commons.NoteTaker","sap.suite.ui.commons.NoteTakerCard","sap.suite.ui.commons.NoteTakerFeeder","sap.suite.ui.commons.NumericContent","sap.suite.ui.commons.NumericTile","sap.suite.ui.commons.PictureZoomIn","sap.suite.ui.commons.ProcessFlow","sap.suite.ui.commons.ProcessFlowConnection","sap.suite.ui.commons.ProcessFlowConnectionLabel","sap.suite.ui.commons.ProcessFlowLaneHeader","sap.suite.ui.commons.ProcessFlowNode","sap.suite.ui.commons.RepeaterViewConfiguration","sap.suite.ui.commons.SplitButton","sap.suite.ui.commons.statusindicator.StatusIndicator","sap.suite.ui.commons.statusindicator.ShapeGroup","sap.suite.ui.commons.statusindicator.Shape","sap.suite.ui.commons.statusindicator.Rectangle","sap.suite.ui.commons.statusindicator.Circle","sap.suite.ui.commons.statusindicator.CustomShape","sap.suite.ui.commons.statusindicator.PropertyThreshold","sap.suite.ui.commons.statusindicator.DiscreteThreshold","sap.suite.ui.commons.statusindicator.LibraryShape","sap.suite.ui.commons.taccount.TAccount","sap.suite.ui.commons.TargetFilter","sap.suite.ui.commons.ThingCollection","sap.suite.ui.commons.ThreePanelThingInspector","sap.suite.ui.commons.ThreePanelThingViewer","sap.suite.ui.commons.taccount.TAccount","sap.suite.ui.commons.TileContent","sap.suite.ui.commons.TileContent2X2","sap.suite.ui.commons.Timeline","sap.suite.ui.commons.TimelineFilterListItem","sap.suite.ui.commons.TimelineItem","sap.suite.ui.commons.UnifiedThingGroup","sap.suite.ui.commons.UnifiedThingInspector","sap.suite.ui.commons.VerticalNavigationBar","sap.suite.ui.commons.ViewRepeater"],elements:["sap.suite.ui.commons.BulletChartData","sap.suite.ui.commons.ColumnData","sap.suite.ui.commons.ColumnMicroChartLabel","sap.suite.ui.commons.ComparisonData","sap.suite.ui.commons.CountingNavigationItem","sap.suite.ui.commons.FeedItem","sap.suite.ui.commons.HarveyBallMicroChartItem","sap.suite.ui.commons.HeaderCellItem","sap.suite.ui.commons.MicroAreaChartItem","sap.suite.ui.commons.MicroAreaChartLabel","sap.suite.ui.commons.MicroAreaChartPoint","sap.suite.ui.commons.TargetFilterColumn","sap.suite.ui.commons.TargetFilterMeasureColumn"],version:"1.64.0",extensions:{flChangeHandlers:{"sap.suite.ui.commons.Timeline":"sap/suite/ui/commons/flexibility/Timeline"}}});sap.suite.ui.commons.BulletChartMode={Actual:"Actual",Delta:"Delta"};sap.suite.ui.commons.CommonBackground={Lightest:"Lightest",ExtraLight:"ExtraLight",Light:"Light",MediumLight:"MediumLight",Medium:"Medium",Dark:"Dark",ExtraDark:"ExtraDark",Darkest:"Darkest"};sap.suite.ui.commons.ComparisonChartView={Normal:"Normal",Wide:"Wide"};sap.suite.ui.commons.CalculationBuilderComparisonOperatorType={"<":"<",">":">","<=":"<=",">=":">=","=":"=","!=":"!="};sap.suite.ui.commons.CalculationBuilderFunctionType={ABS:"ABS",Round:"ROUND",RoundUp:"RoundUp",RoundDown:"RoundDown",Case:"CASE",SQRT:"SQRT",NDIV0:"NDIV0",NODIM:"NODIM",SUMCT:"SUMCT",SUMGT:"SUMGT",SUMRT:"SUMRT"};sap.suite.ui.commons.CalculationBuilderItemType={Operator:"Operator",CustomOperator:"CustomOperator",Variable:"Variable",Constant:"Constant",Function:"Function",CustomFunction:"CustomFunction",Empty:"Empty",Error:"Error"};sap.suite.ui.commons.CalculationBuilderLogicalOperatorType={AND:"AND",OR:"OR",XOR:"XOR",NOT:"NOT"};sap.suite.ui.commons.CalculationBuilderLayoutType={Default:"Default",VisualTextualReadOnly:"VisualTextualReadOnly",VisualOnly:"VisualOnly",TextualOnly:"TextualOnly"};sap.suite.ui.commons.CalculationBuilderOperatorType={"+":"+","-":"-","/":"/","*":"*","(":"(",")":")",",":","};sap.suite.ui.commons.CalculationBuilderValidationMode={FocusOut:"FocusOut",LiveChange:"LiveChange"};sap.suite.ui.commons.DeviationIndicator={Up:"Up",Down:"Down",None:"None"};sap.suite.ui.commons.FacetOverviewHeight={XS:"XS",S:"S",M:"M",L:"L",XL:"XL",XXL:"XXL",Auto:"Auto",None:"None"};sap.suite.ui.commons.FrameType={OneByOne:"OneByOne",TwoByOne:"TwoByOne",TwoThirds:"TwoThirds",Auto:"Auto"};sap.suite.ui.commons.HeaderContainerView={Horizontal:"Horizontal",Vertical:"Vertical"};sap.suite.ui.commons.InfoTileSize={XS:"XS",S:"S",M:"M",L:"L",Auto:"Auto"};sap.suite.ui.commons.InfoTileTextColor={Positive:"Positive",Critical:"Critical",Negative:"Negative"};sap.suite.ui.commons.InfoTileValueColor={Neutral:"Neutral",Good:"Good",Critical:"Critical",Error:"Error"};sap.suite.ui.commons.LoadState={Loading:"Loading",Loaded:"Loaded",Failed:"Failed",Disabled:"Disabled"};sap.suite.ui.commons.MicroAreaChartView={Normal:"Normal",Wide:"Wide"};sap.suite.ui.commons.MicroProcessFlowRenderType={Wrap:"Wrap",NoWrap:"NoWrap",Scrolling:"Scrolling",ScrollingWithResizer:"ScrollingWithResizer"};sap.suite.ui.commons.networkgraph.BackgroundColor={Default:"Default",White:"White"};sap.suite.ui.commons.networkgraph.ActionButtonPosition={Left:"Left",Right:"Right"};sap.suite.ui.commons.networkgraph.NodeShape={Circle:"Circle",Box:"Box",Custom:"Custom"};sap.suite.ui.commons.networkgraph.LineType={Solid:"Solid",Dashed:"Dashed",Dotted:"Dotted"};sap.suite.ui.commons.networkgraph.NodePlacement={BrandesKoepf:"BrandesKoepf",LinearSegments:"LinearSegments",Simple:"Simple"};sap.suite.ui.commons.networkgraph.ElementStatus={Standard:"Standard",Success:"Success",Warning:"Warning",Error:"Error",Information:"Information"};sap.suite.ui.commons.networkgraph.Orientation={LeftRight:"LeftRight",RightLeft:"RightLeft",TopBottom:"TopBottom",BottomTop:"BottomTop"};sap.suite.ui.commons.networkgraph.RenderType={Html:"Html",Svg:"Svg"};sap.suite.ui.commons.networkgraph.LineArrowOrientation={ParentOf:"ParentOf",ChildOf:"ChildOf",None:"None"};sap.suite.ui.commons.networkgraph.LineArrowPosition={Start:"Start",Middle:"Middle",End:"End"};sap.suite.ui.commons.networkgraph.LayoutRenderType={LayeredWithGroups:"LayeredWithGroups",SwimLanes:"SwimLanes",Forces:"Forces",TwoColumns:"TwoColumns"};sap.suite.ui.commons.networkgraph.HeaderCheckboxState={Hidden:"Hidden",Checked:"Checked",Unchecked:"Unchecked"};sap.suite.ui.commons.ProcessFlowConnectionLabelState={Neutral:"Neutral",Positive:"Positive",Critical:"Critical",Negative:"Negative"};sap.suite.ui.commons.ProcessFlowConnectionState={Highlighted:"Highlighted",Dimmed:"Dimmed",Regular:"Regular",Selected:"Selected"};sap.suite.ui.commons.ProcessFlowConnectionType={Planned:"Planned",Normal:"Normal"};sap.suite.ui.commons.ProcessFlowDisplayState={Regular:"Regular",RegularFocused:"RegularFocused",Highlighted:"Highlighted",HighlightedFocused:"HighlightedFocused",Dimmed:"Dimmed",DimmedFocused:"DimmedFocused",Selected:"Selected",SelectedHighlighted:"SelectedHighlighted",SelectedHighlightedFocused:"SelectedHighlightedFocused",SelectedFocused:"SelectedFocused"};sap.suite.ui.commons.ProcessFlowLaneState={value:"value",state:"state"};sap.suite.ui.commons.ProcessFlowNodeState={Positive:"Positive",Negative:"Negative",Critical:"Critical",Planned:"Planned",Neutral:"Neutral",PlannedNegative:"PlannedNegative"};sap.suite.ui.commons.ProcessFlowNodeType={Single:"Single",Aggregated:"Aggregated"};sap.suite.ui.commons.ProcessFlowZoomLevel={One:"One",Two:"Two",Three:"Three",Four:"Four"};sap.suite.ui.commons.SelectionState={Selected:"Selected",NotSelected:"NotSelected",Semantic:"Semantic"};sap.suite.ui.commons.statusindicator.FillingDirectionType={Up:"Up",Down:"Down",Left:"Left",Right:"Right",Clockwise:"Clockwise",CounterClockwise:"CounterClockwise"};sap.suite.ui.commons.taccount.TAccountPanelState={Default:"Default",Table:"Table"};sap.suite.ui.commons.statusindicator.HorizontalAlignmentType={Left:"Left",Middle:"Middle",Right:"Right"};sap.suite.ui.commons.statusindicator.VerticalAlignmentType={Top:"Top",Middle:"Middle",Bottom:"Bottom"};sap.suite.ui.commons.statusindicator.SizeType={None:"None",Small:"Small",Medium:"Medium",Large:"Large",ExtraLarge:"ExtraLarge"};sap.suite.ui.commons.statusindicator.LabelPositionType={Top:"Top",Right:"Right",Bottom:"Bottom",Left:"Left"};sap.suite.ui.commons.statusindicator.FillingType={Linear:"Linear",Radial:"Radial",Circular:"Circular",None:"None"};sap.suite.ui.commons.ThingGroupDesign={ZeroIndent:"ZeroIndent",TopIndent:"TopIndent"};sap.suite.ui.commons.TimelineAlignment={Right:"Right",Left:"Left",Top:"Top",Bottom:"Bottom"};sap.suite.ui.commons.TimelineAxisOrientation={Vertical:"Vertical",Horizontal:"Horizontal"};sap.suite.ui.commons.TimelineFilterType={Data:"Data",Time:"Time",Search:"Search"};sap.suite.ui.commons.TimelineGroupType={None:"None",Year:"Year",Month:"Month",Quarter:"Quarter",Week:"Week",Day:"Day"};sap.suite.ui.commons.TimelineScrollingFadeout={None:"None",Area:"Area",AreaWithButtons:"AreaWithButtons"};sap.suite.ui.commons.ValueStatus={Good:"Good",Neutral:"Neutral",Critical:"Critical",Bad:"Bad"};return sap.suite.ui.commons;});
