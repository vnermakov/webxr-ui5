/*!
 * SAPUI5

(c) Copyright 2009-2019 SAP SE. All rights reserved
 */
sap.ui.define(['./library','sap/ui/core/theming/Parameters',"sap/base/security/encodeXML",'sap/suite/ui/microchart/MicroChartRenderUtils','sap/m/ValueColor'],function(l,P,e,M,V){"use strict";var L={};var a=l.LineType;L.QUALITATIVE_CLASS="sapUiChartPaletteQualitativeHue";L.QUALITATIVE_MAX=22;L.render=function(r,c){if(c._hasData()){r.write("<div");this._writeMainProperties(r,c);r.writeStyles();if(c._bSemanticMode){r.addClass("sapSuiteLMCSemanticMode");}if(c._bFocusMode){r.addClass("sapSuiteLMCFocusMode");}if(c._bNoBottomLabels||!c.getShowBottomLabels()){r.addClass("sapSuiteLMCNoBottomLabels");}if(c._bNoTopLabels||!c.getShowTopLabels()){r.addClass("sapSuiteLMCNoTopLabels");}r.writeClasses();r.write(">");r.write("<div");r.addClass("sapSuiteLMCVerticalAlignmentContainer");r.writeClasses();r.write(">");this._renderLabelsTop(r,c);r.write("<div");r.addClass("sapSuiteLMCContentWrapper");r.writeClasses();r.write(">");this._renderCanvas(r,c);this._renderThresholdLabel(r,c);r.write("</div>");this._renderLabelsBottom(r,c);r.write("</div>");r.write("</div>");}else{r.write("<div");this._writeMainProperties(r,c);r.writeClasses();r.writeStyles();r.write(">");this._renderNoData(r);r.write("</div>");}};L._writeMainProperties=function(r,c){var i=c.hasListeners("press");this._renderActiveProperties(r,c);var A=c.getTooltip_AsString(i);r.writeAttribute("role","img");if(c.getAriaLabelledBy().length){r.writeAccessibilityState(c);}else{r.writeAttributeEscaped("aria-label",A);}r.writeControlData(c);r.addClass("sapSuiteLMC");r.addClass("sapSuiteLMCSize"+c.getSize());r.addStyle("width",c.getWidth());r.addStyle("height",c.getHeight());};L._renderCanvas=function(r,c){var p;var b;r.write("<div");r.addClass("sapSuiteLMCSvgCanvas");r.writeClasses();r.write(">");if(c._bScalingValid){r.write("<svg");r.writeAttributeEscaped("id",c.getId()+"-sapSuiteLMCSvgElement");r.writeAttribute("focusable","false");r.addClass("sapSuiteLMCSvgElement");r.writeClasses();r.write(">");this._renderThresholdLine(r,c);c._getLines().forEach(function(o,I){r.write("<g");r.writeElementData(o);r.write(">");b=o._getPoints().length;for(var i=1;i<b;i++){this._renderLine(r,c,I,o._aNormalizedPoints[i-1].x,o._aNormalizedPoints[i-1].y,o._aNormalizedPoints[i].x,o._aNormalizedPoints[i].y);}r.write("</g>");},this);r.write('</svg>');r.write("<div");r.addClass("sapSuiteLMCPointsContainer");r.writeAttributeEscaped("id",c.getId()+"-sapSuiteLMCPointsContainer");r.writeClasses();r.write(">");c._getLines().forEach(function(o,i){p=o._getPoints();b=p.length;var s=o.getShowPoints(),d,f;if(o._bFocusMode||s){for(var j=0;j<b;j++){d=p[j];f=this._isPointEmphasized(d);if(!o._bFocusMode&&s||o._bFocusMode&&f&&d.getShow()){this._renderPoint(r,c,i,d,j,f);}}}},this);r.write("</div>");}r.write("</div>");};L._renderThresholdLabel=function(r,c){var v=c.getThresholdDisplayValue();if(this._isThresholdValue(c)&&c.getShowThresholdLine()&&c.getShowThresholdValue()){r.write("<div");r.addClass("sapSuiteLMCThresholdLabelWrapper");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapSuiteLMCThresholdLabel");r.writeClasses();r.write(">");v=v?v:c.getThreshold();r.writeEscaped(v);r.write("</div>");r.write("</div>");}};L._renderPoint=function(r,c,i,p,b,E){var o=c._getLines()[i],t=o.getType(),n=o._aNormalizedPoints[b],C=o.getColor(),d,s;if(n.x<0||n.x>100||n.y<0||n.y>100){return;}r.write("<div");r.addStyle("left",e(n.x+"%"));r.addStyle("top",e(100-n.y+"%"));s=(t===a.Dotted)?"border-color":"background-color";r.addClass("sapSuiteLMCPoint"+t);if(o._bFocusMode&&o._bSemanticMode){d=p.getColor();if(V[d]){r.addClass("sapSuiteLMCPoint"+jQuery.sap.encodeXML(d));}else{r.addStyle(s,e(this._getHexColor(d)));}}else if(!o._bFocusMode&&o._bSemanticMode){if(p.getY()>=c.getThreshold()){if(V[C.above]){r.addClass("sapSuiteLMCPoint"+e(C.above));}else{r.addStyle(s,e(this._getHexColor(C.above)));}}else if(V[C.below]){r.addClass("sapSuiteLMCPoint"+e(C.below));}else{r.addStyle(s,e(this._getHexColor(C.below)));}}else if(!o._bSemanticMode&&typeof C==="string"){if(o.getColor()===V.Neutral){r.addStyle(s,e(this._getQualitativeColor(i+1)));}else if(V[C]){r.addClass("sapSuiteLMCPoint"+e(C));}else{r.addStyle(s,e(this._getHexColor(C)));}}else{r.addStyle(s,e(this._getQualitativeColor(i+1)));}r.addClass("sapSuiteLMCPoint");if(E&&p.getShow()){r.addClass("sapSuiteLMCPointEmphasized");}r.writeClasses();r.writeStyles();r.write("></div>");};L._renderThresholdLine=function(r,c){if(this._isThresholdValue(c)&&c.getShowThresholdLine()){r.write("<line");r.writeAttribute("x1","0%");r.writeAttributeEscaped("y1",(100-c._fNormalizedThreshold)+"%");r.writeAttribute("x2","100%");r.writeAttributeEscaped("y2",(100-c._fNormalizedThreshold)+"%");r.addClass("sapSuiteLMCLineThreshold");r.writeClasses();r.write("/>");}};L._isThresholdValue=function(c){return c._fNormalizedThreshold>=0&&c._fNormalizedThreshold<=100&&!c._bThresholdNull;};L._renderLine=function(r,c,i,s,S,E,b){if(this._isDimensionLineOutsideCanvas(c,s,E,"X")||this._isDimensionLineOutsideCanvas(c,S,b,"Y")){return;}var I,f,d=E-s,g=b-S;if((S-c._fNormalizedThreshold)*(b-c._fNormalizedThreshold)<0){I=s+(c._fNormalizedThreshold-S)*d/g;this._renderLine(r,c,i,s,S,I,c._fNormalizedThreshold);this._renderLine(r,c,i,I,c._fNormalizedThreshold,E,b);}else if(S*b<0){I=s-S*d/g;this._renderLine(r,c,i,s,S,I,0);this._renderLine(r,c,i,I,0,E,b);}else if((S-100)*(b-100)<0){I=s+(100-S)*d/g;this._renderLine(r,c,i,s,S,I,100);this._renderLine(r,c,i,I,100,E,b);}else if(s*E<0){f=S-s*g/d;this._renderLine(r,c,i,s,S,0,f);this._renderLine(r,c,i,0,f,E,b);}else if((s-100)*(E-100)<0){f=S+(100-s)*g/d;this._renderLine(r,c,i,s,S,100,f);this._renderLine(r,c,i,100,f,E,b);}else{this._displayLine(r,c,i,s,S,E,b);}};L._displayLine=function(r,c,i,s,S,E,b){var o=c._getLines()[i],C=o.getColor();r.write("<line");r.writeAttributeEscaped("x1",s+"%");r.writeAttributeEscaped("y1",(100-S)+"%");r.writeAttributeEscaped("x2",E+"%");r.writeAttributeEscaped("y2",(100-b)+"%");r.addClass("sapSuiteLMCLine");r.addClass("sapSuiteLMCLine"+o.getType());if(o._bSemanticMode&&o._bFocusMode){r.addClass("sapSuiteLMCLineNeutral");}else if(o._bSemanticMode&&!o._bFocusMode){if(S>=c._fNormalizedThreshold&&b>=c._fNormalizedThreshold){if(V[C.above]){r.addClass("sapSuiteLMCLine"+e(C.above));}else{r.addStyle("stroke",e(this._getHexColor(C.above)));}}else if(V[C.below]){r.addClass("sapSuiteLMCLine"+e(C.below));}else{r.addStyle("stroke",e(this._getHexColor(C.below)));}}else if(!o._bSemanticMode&&typeof C==="string"){if(C===V.Neutral){r.addStyle("stroke",e(this._getQualitativeColor(i+1)));}else if(V[C]){r.addClass("sapSuiteLMCLine"+e(C));}else{r.addStyle("stroke",e(this._getHexColor(C)));}}else{r.addStyle("stroke",e(this._getQualitativeColor(i+1)));}r.writeStyles();r.writeClasses();r.write("/>");};L._getQualitativeColor=function(i){return this._getHexColor(this.QUALITATIVE_CLASS+(i%this.QUALITATIVE_MAX));};L._renderLabelsBottom=function(r,c){var s=c.getLeftBottomLabel(),R=c.getRightBottomLabel();if(!c.getShowBottomLabels()||(!s&&!R)){return;}r.write("<div");r.addClass("sapSuiteLMCLabels");r.addClass("sapSuiteLMCLabelsBottom");r.writeClasses();r.write(">");if((s&&s.length>0)||(R&&R.length>0)){r.write("<div");r.addClass("sapSuiteLMCLeftBottomLabel");r.addClass("sapSuiteLMCLabel");r.writeClasses();r.write(">");r.writeEscaped(s);r.write("</div>");r.write("<div");r.addClass("sapSuiteLMCRightBottomLabel");r.addClass("sapSuiteLMCLabel");r.writeClasses();r.write(">");r.writeEscaped(R);r.write("</div>");}r.write("</div>");};L._renderLabelsTop=function(r,c){var s=c.getLeftTopLabel(),R=c.getRightTopLabel(),o=c._getLines()[0];if(!c.getShowTopLabels()||(!s&&!R)){return;}var t="",T="",b="",d="",p,i,f,g,C;var A=function(j){r.addStyle("color",j);r.writeStyles();};var S=function(j,I){var k="",m="";if(this._isPointEmphasized(j)&&j.getShow()){C=j.getColor();if(V[C]){k="sapSuiteLMCLabel"+C;}else{m=this._getHexColor(C);}}else{k="sapSuiteLMCLabelNeutral";}if(I){d=m;T=k;}else{b=m;t=k;}}.bind(this);if(o&&o._getPoints().length>1){p=o._getPoints();i=p.length;f=p[0];g=p[i-1];var h=o.getColor();if(o._bFocusMode&&o._bSemanticMode&&c._bScalingValid){S(f,false);S(g,true);}else if(!o._bFocusMode&&o._bSemanticMode&&c._bScalingValid&&o.getShowPoints()&&V[h.above]&&V[h.below]){if(f.getY()>=c.getThreshold()){t="sapSuiteLMCLabel"+h.above;}else{t="sapSuiteLMCLabel"+h.below;}if(g.getY()>=c.getThreshold()){T="sapSuiteLMCLabel"+h.above;}else{T="sapSuiteLMCLabel"+h.below;}}else{t="sapSuiteLMCLabelNeutral";T="sapSuiteLMCLabelNeutral";}}r.write("<div");r.addClass("sapSuiteLMCLabels");r.addClass("sapSuiteLMCLabelsTop");r.writeClasses();r.write(">");if((s&&s.length>0)||(R&&R.length>0)){r.write("<div");r.addClass("sapSuiteLMCLeftTopLabel");r.addClass("sapSuiteLMCLabel");r.addClass(e(t));r.writeClasses();if(b){A(b);}r.write(">");r.writeEscaped(s);r.write("</div>");r.write("<div");r.addClass("sapSuiteLMCRightTopLabel");r.addClass("sapSuiteLMCLabel");r.addClass(e(T));r.writeClasses();if(d){A(d);}r.write(">");r.writeEscaped(c.getRightTopLabel());r.write("</div>");}r.write("</div>");};L._isPointEmphasized=function(p){return p&&p.getMetadata().getName()==="sap.suite.ui.microchart.LineMicroChartEmphasizedPoint";};L._getHexColor=function(c){return P.get(c)||c;};L._isDimensionLineOutsideCanvas=function(c,s,b,d){var m=100,i=0;if(d==="X"&&c._minXScale===c._maxXScale){m=50;i=50;}else if(d==="Y"&&c._minYScale===c._maxYScale){m=50;i=50;}return((s>=m&&b>=m)&&!(s===m&&b===m))||((s<=i&&b<=i)&&!(s===i&&b===i));};M.extendMicroChartRenderer(L);return L;},true);
