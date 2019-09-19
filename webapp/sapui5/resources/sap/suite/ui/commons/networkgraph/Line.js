/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/suite/ui/commons/library","./ElementBase","./layout/Geometry","./Coordinate","./Utils"],function(l,E,G,C,U){"use strict";var A=l.networkgraph.LineArrowPosition,L=l.networkgraph.LineType,a=l.networkgraph.LineArrowOrientation,S=l.networkgraph.NodeShape,O=l.networkgraph.Orientation;var B=6,F=5,R=0.45,c=15,Z={Apex:{x:5.5,y:0},Second:{x:-5.5,y:-7.5},Third:{x:-5.5,y:7.5}},N=5;var r=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");var d=E.extend("sap.suite.ui.commons.networkgraph.Line",{metadata:{library:"sap.suite.ui.commons",properties:{selected:{type:"boolean",group:"Misc",defaultValue:false},from:{type:"string",group:"Misc",defaultValue:null},to:{type:"string",group:"Misc",defaultValue:null},lineType:{type:"sap.suite.ui.commons.networkgraph.LineType",group:"Appearance",defaultValue:L.Solid},arrowPosition:{type:"sap.suite.ui.commons.networkgraph.LineArrowPosition",group:"Appearance",defaultValue:A.End},arrowOrientation:{type:"sap.suite.ui.commons.networkgraph.LineArrowOrientation",group:"Appearance",defaultValue:a.ParentOf},stretchToCenter:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{coordinates:{type:"sap.suite.ui.commons.networkgraph.Coordinate",multiple:true,singularName:"coordinate"}},events:{hover:{},press:{parameters:{point:"Object",opener:"Object"}}}},renderer:function(o,b){o.write(b._render());},onAfterRendering:function(){this._afterRenderingBase();},init:function(){this._oFrom=null;this._oTo=null;this._bFocusRendered=false;this._sKey="";this._bIsHidden=false;}});d.prototype.aProcessRequiredProperties=["from","to"];d.prototype._afterRendering=function(){this._setupEvents();if(this.getFromNode()._bIsHidden||this.getToNode()._bIsHidden){this.$().hide();}this._removeFromInvalidatedControls();};d.prototype._render=function(o){var s="",b=this.getSelected()?" "+this.SELECT_CLASS+" ":"",i=this._getElementId(o&&o.idSufix),e;var f=this._getStatusStyle({"stroke":E.ColorType.Border,"stroke-width":E.ColorType.BorderWidth,"stroke-dasharray":E.ColorType.BorderStyle});var g=this._getStatusStyle({fill:E.ColorType.Background,stroke:E.ColorType.Border});var h=function(n,i,I){return this._renderControl("path",{d:e,"class":n||this._getLineClass(),style:I?"":f,from:this.getFromNode().getKey(),to:this.getToNode().getKey(),id:i?this._getDomId(i):""});}.bind(this);var j=function(){var p=this._getArrowPoints(),n={id:this.getId()+"-arrow","class":"sapSuiteUiCommonsNetworkLineArrow",style:g,d:"M "+p[0].x+","+p[0].y+" L "+p[1].x+","+p[1].y+" L "+p[2].x+","+p[2].y+" Z"};return this._renderControl("path",n);}.bind(this);var k=function(x,y,n){var p=x,q=y,t=" 0 0 0 ";if(n===O.LeftRight||n===O.RightLeft){y-=N;q+=N;}if(n===O.TopBottom||n===O.BottomTop){x-=N;p+=N;}if(n===O.BottomTop||n===O.LeftRight){t=" 0 0 1 ";}return"M"+x+" "+y+"A"+N+" "+N+t+" "+p+" "+q;};this._bFocusRendered=false;if(this._isIgnored()||!this.getVisible()){return"";}e=this._createPath();s+=this._renderControl("g",{"class":"sapSuiteUiCommonsNetworkLine "+this._getStatusClass()+b,id:i,"data-sap-ui":i},false);s+=h("sapSuiteUiCommonsNetworkLineInvisibleWrapper","invisibleWrapper",true);s+=h("","path");if(this.getArrowOrientation()!==a.None&&this.getCoordinates().length>=2){s+=j();}if(this._aNipples){var m=g?"style=\""+g+"\"":"";this._aNipples.forEach(function(n){s+="<path "+m+" class=\"sapSuiteUiCommonsNetworkLineNipple\" d=\""+k(n.x,n.y,n.orientation)+"\" />";});}s+="</g>";return s;};d.prototype._renderFocusWrapper=function(){var f=function(s){var p=this._createElement("path",{d:this._createPath(s),"class":"sapSuiteUiCommonsNetworkLineFocus"});this.$()[0].appendChild(p);}.bind(this);if(!this._bFocusRendered){f(F);f(-F);this._bFocusRendered=true;}};d.prototype._resetLayoutData=function(){this._aNipples=null;};d.prototype._createPath=function(s){if(!this.getSource()||!this.getTarget()){return;}var p=[{x:this.getSource().getX(),y:this.getSource().getY()}],P="M"+this.getSource().getX()+","+this.getSource().getY(),b,n,I=this._isTopBottom(),e=I?"x":"y",f=I?"getX":"getY",g=this.getBends().concat([this.getTarget()]);for(var i=0;i<g.length;i++){b=p[i-1]?p[i-1][e]:NaN;n=g[i][f]();if(Math.abs(b-g[i][f]())<2){p.pop();n=b;}p.push({x:I?n:g[i].getX(),y:!I?n:g[i].getY()});}for(var j=1;j<p.length;j++){P+=" L"+p[j].x+","+p[j].y;}return G.getBezierPathCorners(P,B,s);};d.prototype._getLineClass=function(){var g=function(){switch(this.getLineType()){case L.Dashed:return"sapSuiteUiCommonsNetworkDashedLine";case L.Dotted:return"sapSuiteUiCommonsNetworkDottedLine";default:return"";}}.bind(this);return"sapSuiteUiCommonsNetworkLinePath "+g();};d.prototype._getArrowFragmentVector=function(){var o=this.getCoordinates(),b=o.length-1,h=0,g=function(i){return Math.abs(o[i].getX()-o[i+1].getX())+Math.abs(o[i].getY()-o[i+1].getY());};if(this.getBends().length===0){h=0;}else if(this.getArrowPosition()===A.Start){while(h<(b-1)&&this._doesLineFragmentCrossCollapsedGroup(h)){h++;}if(g(h)<c){h++;}if(this._doesLineFragmentCrossCollapsedGroup(h)){h=0;}}else if(this.getArrowPosition()===A.End){h=b-1;while(h>0&&this._doesLineFragmentCrossCollapsedGroup(h)){h--;}if(g(h)<c){h--;}}else{var f=[],D=0;for(var i=0;i<b;i++){if(o[i].getX()===o[i+1].getX()){D+=Math.abs(o[i+1].getY()-o[i].getY());}else if(o[i].getY()===o[i+1].getY()){D+=Math.abs(o[i+1].getX()-o[i].getX());}else{D+=G.getPointsDistance({x:o[i].getX(),y:o[i].getY()},{x:o[i+1].getX(),y:o[i+1].getY()});}f.push(D);}D=D/2;for(i=0;i<b&&h===0;i++){if(f[i]>=D&&!this._doesLineFragmentCrossCollapsedGroup(i)){h=i;}}}if(h<0||h>(b-1)){h=0;}return{center:{x:o[h].getX(),y:o[h].getY()},apex:{x:o[h+1].getX(),y:o[h+1].getY()}};};d.prototype._doesLineFragmentCrossCollapsedGroup=function(s){var g=this.getParent(),b=this.getCoordinates()[s],o=this.getCoordinates()[s+1];return g.getGroups().some(function(e){return e.getCollapsed()&&G.doLineRectangleIntersect({p1:{x:Math.min(b.getX(),o.getX())+1,y:Math.min(b.getY(),o.getY())+1},p2:{x:Math.max(b.getX(),o.getX())-1,y:Math.max(b.getY(),o.getY())-1}},{p1:{x:e.getX(),y:e.getY()},p2:{x:e.getX()+e._iWidth,y:e.getY()+e._iHeight}});});};d.prototype._getArrowPoints=function(){var p,f,o,b,e=[];var g=function(h){var i=c;if(this.getArrowPosition()===A.Middle){o={x:(f.apex.x-f.center.x)*R+f.center.x,y:(f.apex.y-f.center.y)*R+f.center.y};}else{if(!(this.getToNode()._oGroup&&this.getToNode()._oGroup.getCollapsed())&&this.getToNode().getShape()===S.Circle&&this.getArrowPosition()===A.End){i+=this.getToNode()._getCircleSize()/2;}else if(!(this.getFromNode()._oGroup&&this.getFromNode()._oGroup.getCollapsed())&&this.getFromNode().getShape()===S.Circle&&this.getArrowPosition()===A.Start){i+=this.getFromNode()._getCircleSize()/2;}p=G.getNormalizedVector(f,i);if(this.getArrowPosition()===A.Start){o=f.center;}else if(this.getArrowPosition()===A.End){p=G.getRotatedVector(p,Math.PI);o=f.apex;}o=G.getPointSum(o,p.apex);}b=G.getAngleOfVector(f);if(this.getArrowOrientation()===a.ChildOf){b+=Math.PI;}e.push(G.getPointSum(o,G.getRotatedPoint(h,b)));}.bind(this);f=this._getArrowFragmentVector();g(Z.Apex);g(Z.Second);g(Z.Third);return e;};d.prototype._getAccessibilityLabel=function(){return r.getText("NETWORK_GRAPH_ACCESSIBILITY_LINE_LABEL",[this.getFromNode().getTitle(),this.getToNode().getTitle()])+" "+this.getTitle();};d.prototype.getFromNode=function(){this._checkForProcessData();if(!this._oFrom&&this.getParent()){this._oFrom=this.getParent().getNodeByKey(this.getFrom());}return this._oFrom;};d.prototype.getToNode=function(){this._checkForProcessData();if(!this._oTo&&this.getParent()){this._oTo=this.getParent().getNodeByKey(this.getTo());}return this._oTo;};d.prototype.setSource=function(m){var o;if(this.getCoordinates().length===0){o=new C();this.addAggregation("coordinates",o,true);}o=this.getCoordinates()[0];if(m.x||m.x===0){o.setX(m.x);}if(m.y||m.y===0){o.setY(m.y);}};d.prototype.getSource=function(){return this.getCoordinates()[0];};d.prototype.getTarget=function(){return this.getCoordinates().length>0?this.getCoordinates()[this.getCoordinates().length-1]:null;};d.prototype.setTarget=function(m){var o;if(this.getCoordinates().length<2){o=new C();this.addAggregation("coordinates",o,true);}o=this.getCoordinates()[this.getCoordinates().length-1];if(m.x||m.x===0){o.setX(m.x);}if(m.y||m.y===0){o.setY(m.y);}};d.prototype.getBends=function(){return this.getCoordinates().filter(function(o,i){return(i>0)&&(i<(this.getCoordinates().length-1));},this);};d.prototype.clearBends=function(){this.getBends().forEach(function(b){this.removeAggregation("coordinates",b,true);},this);};d.prototype.addBend=function(p){var n=new C();n.setX(p.x);n.setY(p.y);this.insertAggregation("coordinates",n,this.getCoordinates().length-1,true);return n;};d.prototype.isHidden=function(){return this._bIsHidden;};d.prototype.getKey=function(){return this._getLineId();};d.prototype.setHidden=function(v){this.$()[v?"hide":"show"]();};d.prototype._isIgnored=function(){var f=this.getFromNode(),t=this.getToNode(),i=f._oGroup&&f._oGroup.getCollapsed()&&t._oGroup&&t._oGroup.getCollapsed()&&f._oGroup===t._oGroup,n=!f._useInLayout()||!t._useInLayout();return!this._useInLayout||i||this._isLoop()||n;};d.prototype._isLoop=function(){return this.getFromNode().getId()===this.getToNode().getId();};d.prototype._getLineId=function(){return this._sKey?this._sKey:"line_"+this.getFrom()+"-"+this.getTo();};d.prototype._setupEvents=function(){var $=this.$().find(".sapSuiteUiCommonsNetworkLineInvisibleWrapper");$.click(function(e){this._click({ctrlKey:e.ctrlKey,clientX:e.clientX,clientY:e.clientY});}.bind(this));$.mouseover(function(e){this._mouseOver();}.bind(this));$.mouseout(function(e){this._mouseOut();}.bind(this));};d.prototype._mouseOut=function(){this.$().removeClass(this.HIGHLIGHT_CLASS);if(!this.getSelected()){this._setStatusColors("");}};d.prototype._mouseOver=function(){var e=this.fireEvent("hover",{},true);if(!this.getSelected()&&e){this._setStatusColors("Hover");this.$().addClass(this.HIGHLIGHT_CLASS);}};d.prototype._setStatusColors=function(t){var $=this.$("arrow"),b=this._getColor(E.ColorType[t+"Border"]),s=this._getColor(E.ColorType[t+"Background"]);$.css("fill",s);$.css("stroke",b);this.$("path").css("stroke",b);if(this.getParent()._isSwimLane()){var e=this.$().find(".sapSuiteUiCommonsNetworkLineNipple");e.css("fill",s);e.css("stroke",b);}};d.prototype._click=function(m){var p=this.getParent(),P=m.skipConversion?{x:m.clientX,y:m.clientY}:p.getCorrectMousePosition({x:m.clientX+10,y:m.clientY}),o=p._tooltip._getOpener(this,P),e;p._selectLine({element:this,forceFocus:true,preventDeselect:m.ctrlKey});e=this.fireEvent("press",{opener:o,point:P},true);if(this.getSelected()&&e){p._tooltip.openDetail({item:this,opener:o,point:P});}};d.prototype._setFocus=function(f){E.prototype._setFocus.call(this,f);if(f){this._renderFocusWrapper();}};d.prototype._isEndPosition=function(){return((this.getArrowPosition()===A.End&&this.getArrowOrientation()===a.ParentOf)||(this.getArrowPosition()===A.Start&&this.getArrowOrientation()===a.ChildOf));};d.prototype._moveToEnd=function(){return this._isEndPosition()||(this.getArrowPosition()===A.Middle&&this.getArrowOrientation()===a.ParentOf);};d.prototype._hideShow=function(b){if(b){this.$().hide();this._bIsHidden=true;}else if(!this.getToNode()._bIsHidden&&!this.getFromNode()._bIsHidden){this.$().show();this._bIsHidden=false;}};d.prototype._shift=function(p){this.getBends().forEach(function(b){b.setX(b.getX()+p.x);b.setY(b.getY()+p.y);});if(this.getSource()){this.setSource({x:this.getSource().getX()+p.x,y:this.getSource().getY()+p.y});}if(this.getTarget()){this.setTarget({x:this.getTarget().getX()+p.x,y:this.getTarget().getY()+p.y});}if(this._aNipples){this._aNipples.forEach(function(n){n.x+=p.x;n.y+=p.y;});}};d.prototype._normalizePath=function(){var f,t;f=this.getFromNode().getCenterPosition();this.setSource({x:f.x,y:f.y});t=this.getToNode().getCenterPosition();this.setTarget({x:t.x,y:t.y});this.clearBends();};d.prototype._validateLayout=function(){return(!this.getSource()||(isFinite(this.getSource().getX())&&isFinite(this.getSource().getY())))&&(!this.getTarget()||(isFinite(this.getTarget().getX())&&isFinite(this.getTarget().getY())))&&!this.getBends().some(function(b){return!isFinite(b.getX())||!isFinite(b.getY());});};d.prototype.setSelected=function(s){var p=this.getParent(),f=s?"addClass":"removeClass";this._setStatusColors(s?"Selected":"");this.setProperty("selected",s,true);this.$()[f](this.SELECT_CLASS);if(p){if(s){p._mSelectedLines[this._getLineId()]=this;}else{delete p._mSelectedLines[this._getLineId()];}}return this;};d.prototype.setFrom=function(f){var p=this.getParent();this.setProperty("from",f,true);if(p){p.invalidate();}return this;};d.prototype.setTo=function(t){var p=this.getParent();this.setProperty("to",t,true);if(p){p.invalidate();}return this;};d.prototype._isTopBottom=function(){var p=this.getParent();return p&&p._isTopBottom();};d.prototype.getFocusDomRef=function(){return this.getDomRef("invisibleWrapper");};d.prototype._createSuggestionHelpText=function(){var b=25;var t=this.getTitle()?(this.getTitle()+" "):"";return t+"("+U.trimText(this.getFromNode().getTitle(),b)+" -> "+U.trimText(this.getToNode().getTitle(),b)+")";};d.prototype._isInCollapsedGroup=function(){var f=this.getFromNode(),t=this.getToNode();return(f._oGroup===t._oGroup)&&f._isInCollapsedGroup();};return d;});
