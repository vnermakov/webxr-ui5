/*!
* SAPUI5

(c) Copyright 2009-2019 SAP SE. All rights reserved
*/
sap.ui.define(["sap/ui/thirdparty/jquery","sap/m/library","sap/ui/Device","./library","./HarveyBallMicroChart","sap/base/security/encodeXML","sap/suite/ui/microchart/MicroChartRenderUtils","sap/ui/core/theming/Parameters","sap/m/ValueColor","sap/m/ValueCSSColor"],function(q,M,D,l,H,e,a,P,V,b){"use strict";var c={};c._iReferenceControlSize=72;c._iReferenceControlCenter=c._iReferenceControlSize/2;c.render=function(r,C){if(!C._hasData()){r.write("<div");this._writeMainProperties(r,C);r.writeClasses();r.writeStyles();r.write(">");this._renderNoData(r);r.write("</div>");return;}if(!C._bThemeApplied){return;}this._calculatePath(C);var d=C.getColorPalette();var t="";var v="";var s="";var f=false;var g=0;var h="";var G=function(i){if(V[i]){h="sapSuiteHBMCSemanticColor"+e(i);}else if(b.isValid(i)){return P.get(i)||i;}return null;};var i=d.length>0?G(d[0]):null;var j=this._oPath.center;if(C._isThemeHighContrast()){j-=1;}if(C.getItems().length){var p=C.getItems()[0];g=p.getFraction();v=p.getFractionLabel()?p.getFractionLabel():v+p.getFraction();s=p.getFractionScale()?p.getFractionScale().substring(0,3):s;f=p.getFormattedLabel();if(!i&&!h){i=G(p.getColor());}}if(f){var F=C._parseFormattedValue(v);s=F.scale.substring(0,3);v=F.value;}var T=C.getTotal();var k=C.getTotalLabel()?C.getTotalLabel():""+C.getTotal();if(C.getTotalScale()){t=C.getTotalScale().substring(0,3);}if(C.getFormattedLabel()){var o=C._parseFormattedValue(k);t=o.scale.substring(0,3);k=o.value;}if(v){v=H._truncateValue(v,H.VALUE_TRUNCATION_DIGITS);}if(k){k=H._truncateValue(k,H.VALUE_TRUNCATION_DIGITS);}r.write("<div");this._writeMainProperties(r,C);r.writeClasses();r.writeStyles();r.write(">");r.write("<div");r.addClass("sapSuiteHBMCAlign"+C.getAlignContent());r.addClass("sapSuiteHBMCVerticalAlignmentContainer");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapSuiteHBMCChart");r.writeClasses();r.write(">");r.write("<svg");r.addClass("sapSuiteHBMCChartSvg");r.writeClasses();r.writeAttribute("id",C.getId()+"-harvey-ball");r.writeAttributeEscaped("viewBox","0 0 72 72");r.writeAttribute("focusable",false);r.write(">");r.write("<g>");r.write("<circle");r.writeAttributeEscaped("cx",this._oPath.center);r.writeAttributeEscaped("cy",this._oPath.center);r.writeAttributeEscaped("r",j);r.addClass("sapSuiteHBMCBackgroundCircle");r.writeClasses();r.write("/>");if(g&&g>=T){r.write("<circle");r.writeAttributeEscaped("cx",this._oPath.center);r.writeAttributeEscaped("cy",this._oPath.center);r.writeAttributeEscaped("r",j-this._oPath.border);r.addClass("sapSuiteHBMCSegment");if(i){r.addStyle("fill",i);r.writeStyles();}else{r.addClass(e(h));}r.writeClasses();r.write("/>");}else if(g>0){r.write("<path");r.writeAttribute("id",C.getId()+"-segment");r.addClass("sapSuiteHBMCSegment");if(i){r.addStyle("fill",i);r.writeStyles();}else{r.addClass(e(h));}r.writeClasses();r.writeAttributeEscaped("d",this._serializePieChart());r.write("/>");}r.write("</g>");r.write("</svg>");r.write("</div>");r.write("<div");r.addClass("sapSuiteHBMCTextContainer");r.writeClasses();r.write(">");if(C.getShowFractions()){r.write("<div");r.addClass("sapSuiteHBMCValueContainer");r.writeClasses();r.write(">");this.renderLabel(r,C,[h,"sapSuiteHBMCValue"],v,i,"-fraction");this.renderLabel(r,C,[h,"sapSuiteHBMCValueScale"],s,i,"-fraction-scale");r.write("</div>");}if(C.getShowTotal()){r.write("<div");r.addClass("sapSuiteHBMCTotalContainer");r.writeClasses();r.write(">");this.renderLabel(r,C,[h,"sapSuiteHBMCTotal"],k,i,"-total");this.renderLabel(r,C,[h,"sapSuiteHBMCTotalScale"],t,i,"-total-scale");r.write("</div>");}r.write("</div>");r.write("</div>");r.write("</div>");};c._writeMainProperties=function(r,C){var i=C.hasListeners("press");this._renderActiveProperties(r,C);var A=C.getTooltip_AsString(i);r.writeAttribute("role","img");if(C.getAriaLabelledBy().length){r.writeAccessibilityState(C);}else{r.writeAttributeEscaped("aria-label",A);}r.writeControlData(C);r.addClass("sapSuiteHBMC");r.addClass("sapSuiteHBMCSize"+C.getSize());r.addStyle("width",C.getWidth());r.addStyle("height",C.getHeight());};c.renderLabel=function(r,C,d,L,s,I){var u=!(d.indexOf("sapSuiteHBMCTotal")>-1||d.indexOf("sapSuiteHBMCTotalScale")>-1);r.write("<span");r.writeAttribute("id",C.getId()+I);for(var i=0;i<d.length;i++){if(!(i===0&&s&&u)){r.addClass(e(d[i]));}}r.writeClasses();r.write(">");if(L){r.writeEscaped(L);}r.write("</span>");};c._calculatePath=function(C){var t=C.getTotal();var f=0;if(C.getItems().length){f=C.getItems()[0].getFraction();}var i=c._iReferenceControlCenter;var B=5;this._oPath={initial:{x:i,y:i},lineTo:{x:i,y:B},arc:{x1:i-B,y1:i-B,largeArc:0,x2:"",y2:""},size:c._iReferenceControlSize,border:B,center:i};var A=f/t*360;var r=Math.PI/180.0;var R=this._oPath.center-this._oPath.border;var d=R*Math.cos((A-90)*r)+this._oPath.center;var g=this._oPath.size-(R*Math.sin((A+90)*r)+this._oPath.center);this._oPath.arc.x2=d.toFixed(2);this._oPath.arc.y2=g.toFixed(2);var L=t/f<2?1:0;this._oPath.arc.largeArc=L;};c._serializePieChart=function(){var p=this._oPath;return["M",p.initial.x,",",p.initial.y," L",p.initial.x,",",p.lineTo.y," A",p.arc.x1,",",p.arc.y1," 0 ",p.arc.largeArc,",1 ",p.arc.x2,",",p.arc.y2," L",p.initial.x,",",p.initial.y," z"].join("");};a.extendMicroChartRenderer(c);return c;},true);
