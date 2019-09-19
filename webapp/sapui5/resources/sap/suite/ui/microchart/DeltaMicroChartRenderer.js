/*!
 * SAPUI5

(c) Copyright 2009-2019 SAP SE. All rights reserved
 */
sap.ui.define(['./library',"sap/base/security/encodeXML",'sap/suite/ui/microchart/MicroChartRenderUtils','sap/ui/core/theming/Parameters','sap/m/ValueColor'],function(l,e,M,P,V){"use strict";var D=l.DeltaMicroChartViewType;var a={};a.render=function(r,c){function g(L){return L?"sapSuiteDMCDirectionLeft":"sapSuiteDMCDirectionRight";}if(c._hasData()){if(!c._bThemeApplied){return;}var d=c.getDisplayValue1();var s=c.getDisplayValue2();var v=c.getValue1();var f=c.getValue2();var b=c.getDeltaDisplayValue();var A=d?d:""+v;var h=s?s:""+f;var i=b?b:""+c._getDeltaValue();var C=c.getColor();var S=function(C,k){if(V[C]){r.addClass("sapSuiteDMCSemanticColor"+C);}else{r.addStyle(k,P.get(C)||C);r.writeStyles();}};var t=c.getTitle1();var T=c.getTitle2();var j=c.getView();r.write("<div");this._writeMainProperties(r,c);if(!t){r.addClass("sapSuiteDMCNoTitleTop");}if(!T){r.addClass("sapSuiteDMCNoTitleBottom");}if(j===D.Wide){r.addClass("sapSuiteDMCWideMode");}r.writeClasses();r.writeStyles();r.write(">");r.write("<div");r.addClass("sapSuiteDMCVerticalAlignmentContainer");r.writeClasses();r.write(">");if((t||T)&&(j===D.Wide||j===D.Responsive)){r.write("<div");r.addClass("sapSuiteDMCWideTitles");r.addClass("sapSuiteDMCLabel");r.writeClasses();r.write(">");this._renderTitle(r,t,"sapSuiteDMCPositionTop");this._renderTitle(r,T,"sapSuiteDMCPositionBtm");r.write("</div>");r.write("<div");r.addClass("sapSuiteDMCSpacer");r.addClass("sapSuiteDMCSpacerLeft");r.writeClasses();r.write(">");r.write("</div>");}r.write("<div");r.addClass("sapSuiteDMCCnt");r.writeClasses();r.write(">");if(t&&(j===D.Normal||j===D.Responsive)){this._renderTitle(r,t,"sapSuiteDMCPositionTop");}r.write("<div");r.addClass("sapSuiteDMCChart");r.writeClasses();r.writeAttribute("id",c.getId()+"-dmc-chart");r.write(">");r.write("<div");r.addClass("sapSuiteDMCBar");r.addClass("sapSuiteDMCBar1");if(c._oChartData.delta.isMax){r.addClass("sapSuiteDMCBarDeltaMaxDelta");}if(c._oChartData.bar1.isSmaller){r.addClass("sapSuiteDMCBarSizeSmaller");}if(parseFloat(c._oChartData.bar1.width)===0){r.addClass("sapSuiteDMCBarZeroWidth");}else if(parseFloat(c._oChartData.bar2.width)===0){r.addClass("sapSuiteDMCBarUniqueNonzero");}r.addClass(e(g(c._oChartData.bar1.left)));r.writeClasses();r.addStyle("width",e(c._oChartData.bar1.width+"%"));r.writeStyles();r.writeAttribute("id",c.getId()+"-dmc-bar1");r.write(">");r.write("<div");r.addClass("sapSuiteDMCBarInternal");r.addClass(e(g(c._oChartData.bar2.left)));r.writeClasses();r.write(">");r.write("</div>");r.write("</div>");r.write("<div");r.addClass("sapSuiteDMCBar");r.addClass("sapSuiteDMCBar2");if(c._oChartData.delta.isMax){r.addClass("sapSuiteDMCBarDeltaMaxDelta");}if(c._oChartData.bar2.isSmaller){r.addClass("sapSuiteDMCBarSizeSmaller");}if(parseFloat(c._oChartData.bar2.width)===0){r.addClass("sapSuiteDMCBarZeroWidth");}else if(parseFloat(c._oChartData.bar1.width)===0){r.addClass("sapSuiteDMCBarUniqueNonzero");}r.addClass(e(g(c._oChartData.bar2.left)));r.writeClasses();r.addStyle("width",e(c._oChartData.bar2.width+"%"));r.writeStyles();r.writeAttribute("id",c.getId()+"-dmc-bar2");r.write(">");r.write("<div");r.addClass("sapSuiteDMCBarInternal");r.addClass(e(g(c._oChartData.bar1.left)));r.writeClasses();r.write(">");r.write("</div>");r.write("</div>");r.write("<div");r.addClass("sapSuiteDMCBar");r.addClass("sapSuiteDMCBarDelta");if(!c._oChartData.delta.isMax){r.addClass("sapSuiteDMCBarDeltaNotMax");}if(c._oChartData.delta.isZero){r.addClass("sapSuiteDMCBarDeltaZero");}if(c._oChartData.delta.isEqual){r.addClass("sapSuiteDMCBarDeltaEqual");}r.addClass(e(g(c._oChartData.delta.left)));r.writeClasses();r.addStyle("width",e(c._oChartData.delta.width+"%"));r.writeStyles();r.writeAttribute("id",c.getId()+"-dmc-bar-delta");r.write(">");r.write("<div");S(C,"background-color");r.addClass("sapSuiteDMCBarDeltaInt");r.writeClasses();r.write(">");r.write("</div>");r.write("<div");r.addClass("sapSuiteDMCBarDeltaStripe");r.addClass(e(g(true)));if(c._oChartData.delta.isEqual){r.addClass("sapSuiteDMCBarDeltaEqual");}r.addClass("sapSuiteDMCBarDeltaFirstStripe"+(c._oChartData.delta.isFirstStripeUp?"Up":"Down"));r.writeClasses();r.write(">");r.write("</div>");r.write("<div");r.addClass("sapSuiteDMCBarDeltaStripe");r.addClass(e(g(false)));r.addClass("sapSuiteDMCBarDeltaFirstStripe"+(c._oChartData.delta.isFirstStripeUp?"Down":"Up"));r.writeClasses();r.write(">");r.write("</div>");r.write("</div>");r.write("</div>");if(T&&(j===D.Normal||j===D.Responsive)){this._renderTitle(r,T,"sapSuiteDMCPositionBtm");}r.write("</div>");r.write("<div");r.addClass("sapSuiteDMCSpacer");r.addClass("sapSuiteDMCSpacerRight");r.writeClasses();r.write(">");r.write("</div>");r.write("<div");r.addClass("sapSuiteDMCLbls");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-value1");r.addClass("sapSuiteDMCLabel");r.addClass("sapSuiteDMCValue1");r.writeClasses();r.write(">");r.writeEscaped(A);r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-delta");r.addClass("sapSuiteDMCLabel");r.addClass("sapSuiteDMCDelta");S(C,"color");r.writeClasses();r.write(">");r.writeEscaped(i);r.write("</div>");r.write("<div");r.writeAttribute("id",c.getId()+"-value2");r.addClass("sapSuiteDMCLabel");r.addClass("sapSuiteDMCValue2");r.writeClasses();r.write(">");r.writeEscaped(h);r.write("</div>");r.write("</div>");r.write("</div>");r.write("</div>");}else{r.write("<div");this._writeMainProperties(r,c);r.writeClasses();r.writeStyles();r.write(">");this._renderNoData(r);r.write("</div>");}};a._renderTitle=function(r,t,c){r.write("<div");r.addClass("sapSuiteDMCLabel");r.addClass("sapSuiteDMCTitle");r.addClass(c);r.writeClasses();r.write(">");r.writeEscaped(t);r.write("</div>");};a._writeMainProperties=function(r,c){var i=c.hasListeners("press");this._renderActiveProperties(r,c);var A=c.getTooltip_AsString(i);r.writeAttribute("role","img");if(c.getAriaLabelledBy().length){r.writeAccessibilityState(c);}else{r.writeAttributeEscaped("aria-label",A);}r.writeControlData(c);r.addClass("sapSuiteDMC");r.addClass("sapSuiteDMCSize"+c.getSize());r.addStyle("width",c.getWidth());r.addStyle("height",c.getHeight());};M.extendMicroChartRenderer(a);return a;},true);
