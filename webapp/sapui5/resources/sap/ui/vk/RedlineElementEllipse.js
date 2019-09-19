/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./RedlineElement"],function(q,R){"use strict";var a=R.extend("sap.ui.vk.RedlineElementEllipse",{metadata:{library:"sap.ui.vk",properties:{radiusX:{type:"float",defaultValue:0.0001},radiusY:{type:"float",defaultValue:0.0001},fillColor:{type:"sap.ui.core.CSSColor",defaultValue:"rgba(0, 0, 0, 0)"}}}});a.prototype.edit=function(o,b){var p=this.getParent(),t=p._toVirtualSpace(o,b),r=t.x-this.getOriginX(),c=t.y-this.getOriginY();this.setRadiusX(r>0?r:-r);this.setRadiusY(c>0?c:-c);return this;};a.prototype.applyZoom=function(z){this.setProperty("radiusX",this.getRadiusX()*z,true);this.setProperty("radiusY",this.getRadiusY()*z,true);return this;};a.prototype.setRadiusX=function(r){this.setProperty("radiusX",r,true);var d=this.getDomRef();if(d){d.setAttribute("rx",this.getParent()._toPixelSpace(r));}};a.prototype.setRadiusY=function(r){this.setProperty("radiusY",r,true);var d=this.getDomRef();if(d){d.setAttribute("ry",this.getParent()._toPixelSpace(r));}};a.prototype.renderElement=function(r,h){var p=this.getParent();r.write("<ellipse");r.writeElementData(this);var o=p._toPixelSpace(this.getOriginX(),this.getOriginY());r.writeAttribute("cx",o.x);r.writeAttribute("cy",o.y);r.writeAttribute("rx",p._toPixelSpace(this.getRadiusX()));r.writeAttribute("ry",p._toPixelSpace(this.getRadiusY()));r.writeAttribute("fill",this.getFillColor());r.writeAttribute("stroke",this.getStrokeColor());r.writeAttribute("stroke-width",this.getStrokeWidth());if(this.getStrokeDashArray().length>0){r.writeAttribute("stroke-dasharray",this.getStrokeDashArray().toString());}r.writeAttribute("opacity",this.getOpacity());if(h){r.writeAttribute("filter","url(#halo)");}r.write("></ellipse>");};a.prototype.exportJSON=function(){return q.extend(true,R.prototype.exportJSON.call(this),{type:sap.ui.vk.Redline.ElementType.Ellipse,version:1,radiusX:this.getRadiusX(),radiusY:this.getRadiusY(),fillColor:this.getFillColor()});};a.prototype.importJSON=function(j){if(j.type===sap.ui.vk.Redline.ElementType.Ellipse){if(j.version===1){R.prototype.importJSON.call(this,j);if(j.hasOwnProperty("radiusX")){this.setRadiusX(j.radiusX);}if(j.hasOwnProperty("radiusY")){this.setRadiusY(j.radiusY);}if(j.hasOwnProperty("fillColor")){this.setFillColor(j.fillColor);}}else{q.sap.log.error("wrong version number");}}else{q.sap.log.error("Redlining JSON import: Wrong element type");}return this;};a.prototype.exportSVG=function(){var e=document.createElementNS(sap.ui.vk.Redline.svgNamespace,"ellipse");e.setAttribute("x",this.getOriginX());e.setAttribute("y",this.getOriginY());e.setAttribute("rx",this.getRadiusX());e.setAttribute("ry",this.getRadiusY());e.setAttribute("fill",this.getFillColor());e.setAttribute("stroke",this.getStrokeColor());e.setAttribute("stroke-width",this.getStrokeWidth());if(this.getStrokeDashArray().length>0){e.setAttribute("stroke-dasharray",this.getStrokeDashArray().toString());}if(this.getOpacity()<1){e.setAttribute("opacity",this.getOpacity());}e.setAttribute("data-sap-element-id",this.getElementId());e.setAttribute("data-sap-halo",this.getHalo());return e;};a.prototype.importSVG=function(s){if(s.tagName==="ellipse"){R.prototype.importSVG.call(this,s);if(s.getAttribute("rx")){this.setRadiusX(parseFloat(s.getAttribute("rx")));}if(s.getAttribute("ry")){this.setRadiusY(parseFloat(s.getAttribute("ry")));}if(s.getAttribute("fill")){this.setFillColor(s.getAttribute("fill"));}}else{q.sap.log("Redlining SVG import: Wrong element type");}return this;};return a;});
