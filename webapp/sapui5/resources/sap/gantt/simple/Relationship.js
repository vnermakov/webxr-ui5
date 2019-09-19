/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/Core","sap/ui/core/IconPool","./GanttUtils","./RenderUtils","./BasePath"],function(D,C,I,G,R,B){"use strict";var A=6,L=20,P=15,a={"FinishToFinish":0,"FinishToStart":1,"StartToFinish":2,"StartToStart":3};var b=B.extend("sap.gantt.simple.Relationship",{metadata:{properties:{type:{type:"sap.gantt.simple.RelationshipType",group:"Appearance"},predecessor:{type:"string",group:"Data"},successor:{type:"string",group:"Data"},selectedStroke:{type:"sap.gantt.ValueSVGPaintServer",defaultValue:"#FF0000"},selectedStrokeWidth:{type:"sap.gantt.SVGLength",defaultValue:2}}}});b.prototype.applySettings=function(s){s=s||{};s.stroke=s.stroke||"#000000";s.strokeWidth=s.strokeWidth||1;B.prototype.applySettings.apply(this,arguments);};b.prototype.renderElement=function(r,e,g){var m=this.getRelatedInRowShapes(g);if(m.predecessor==null&&m.successor==null){return;}var t=this.getProcessedType();var c=this.getRlsAnchors(t,m);var f=function(o){return jQuery.isNumeric(o.x)&&jQuery.isNumeric(o.y);};if(!f(c.predecessor)||!f(c.successor)){return;}var n=this.getBaseRowHeight(g);this.calcLinePathD(c,n,t);this.renderRelationship(r,c);};b.prototype.getRlsAnchors=function(t,r){var p,s,o;var m=this.getShapeAnchors(r);if(r.predecessor&&r.successor){if(t==a.FinishToFinish){p=m.predecessor.tail;s=m.successor.tail;}else if(t==a.FinishToStart){p=m.predecessor.tail;s=m.successor.head;}else if(t==a.StartToFinish){p=m.predecessor.head;s=m.successor.tail;}else if(t==a.StartToStart){p=m.predecessor.head;s=m.successor.head;}}else if(r.predecessor&&!r.successor){if(t==a.FinishToFinish||t==a.FinishToStart){p=m.predecessor.tail;s={x:p.x+L,y:p.y};o={x:s.x,y:s.y+P/2};}else if(t==a.StartToFinish||t==a.StartToStart){p=m.predecessor.head;s={x:p.x-L,y:p.y};o={x:s.x-P,y:s.y+P/2};}}else if(!r.predecessor&&r.successor){if(t==a.FinishToFinish||t==a.StartToFinish){s=m.successor.tail;p={x:s.x+L,y:s.y};o={x:p.x,y:p.y+P/2};}else if(t==a.FinishToStart||t==a.StartToStart){s=m.successor.head;p={x:s.x-L,y:s.y};o={x:p.x-P,y:p.y+P/2};}}return{predecessor:p,successor:s,prompter:o};};b.prototype.calcLinePathD=function(m,n,t){var x=m.predecessor.x,y=m.predecessor.y;var c=m.successor.x,d=m.successor.y;var f,e=[x,y,c,d];if(y==d){f=this.calcIRlsPathD;}else if(y!=d){if(t==a.FinishToFinish){f=this.calcURlsPathD;e.push(false);}else if(t==a.FinishToStart){if(x<=c){f=this.calcLRlsPathD;}else if(x>c){f=this.calcSRlsPathD;e.push(n);}}else if(t==a.StartToFinish){if(x<c){f=this.calcSRlsPathD;e.push(n);}else if(x>=c){f=this.calcLRlsPathD;}}else if(t==a.StartToStart){f=this.calcURlsPathD;e.push(true);}}if(f==this.calcLRlsPathD){e[2]=(x<c)?c+m.successor.dx:c-m.successor.dx;e[3]=(y<d)?d-m.successor.dy:d+m.successor.dy;}this.setProperty("d",f.apply(this,e),true);};b.prototype.calcIRlsPathD=function(x,y,c,d){return this.getLinePathD([[x,y],[c,d]]);};b.prototype.calcLRlsPathD=function(x,y,c,d){return this.getLinePathD([[x,y],[c,y],[c,d]]);};b.prototype.calcURlsPathD=function(x,y,c,d,Y){var e=(x<c)?c+2*A:x+2*A;var f=(x<c)?x-2*A:c-2*A;var g=(!Y)?e:f;return this.getLinePathD([[x,y],[g,y],[g,d],[c,d]]);};b.prototype.calcSRlsPathD=function(x,y,c,d,n){var e=(x<c)?x-A*2:x+A*2;var f=(y<d)?y+n/2:y-n/2;var g=(x<c)?c+A*2:c-A*2;return this.getLinePathD([[x,y],[e,y],[e,f],[g,f],[g,d],[c,d]]);};b.prototype.getArrowPathD=function(p){var t=function(v){return Number(v);};var c=p.match(/-?\d+(\.\d+)?/g).map(t);var x=c[c.length/2-2];var y=c[c.length/2-1];var d=c[c.length/2+0];var e=c[c.length/2+1];var r=[[d,e]];if(x==d){if(y>e){r.push([d+A/2,e+A]);r.push([d-A/2,e+A]);}else if(y<e){r.push([d-A/2,e-A]);r.push([d+A/2,e-A]);}}else if(x!=d){if(x>d){r.push([d+A,e-A/2]);r.push([d+A,e+A/2]);}else if(x<d){r.push([d-A,e+A/2]);r.push([d-A,e-A/2]);}}return d3.svg.line().interpolate("linear-closed")(r);};b.prototype.getShapeAnchors=function(r){var m={predecessor:null,successor:null};Object.keys(r).forEach(function(k){var s=r[k];if(s==null){return;}if(s.getShapeAnchors){m[k]=s.getShapeAnchors();}else{var o=s.getDomRef().getBBox();m[k]={head:{x:o.x,y:o.y+o.height/2,dx:0,dy:o.height/2},tail:{x:o.x+o.width,y:o.y+o.height/2,dx:0,dy:o.height/2}};}});return m;};b.prototype.renderRelationship=function(r,m){r.write("<g");this.writeElementData(r);R.renderAttributes(r,this,["style"]);r.write(">");R.renderTooltip(r,this);r.write("<path");r.writeAttribute("d",this.getD());r.write("/>");r.write("<path");r.writeAttribute("d",this.getArrowPathD(this.getD()));r.write("/>");if(m.prompter){r.write("<text");r.writeAttribute("x",m.prompter.x);r.writeAttribute("y",m.prompter.y);r.writeAttribute("font-size",P);r.writeAttribute("font-family","SAP-icons");r.writeAttribute("text-anchor",(C.getConfiguration().getRTL()&&!D.browser.msie&&!D.browser.edge)?"end":"start");r.writeAttribute("stroke-width",0);r.write(">");r.write(I.getIconInfo("chain-link").content);r.write("</text>");}r.write("</g>");};b.prototype.getStyle=function(){return this.getInlineStyle({"fill":this.getStroke(),"stroke":this.getStroke(),"stroke-width":this.getStrokeWidth(),"stroke-dasharray":this.getStrokeDasharray(),"opacity":this.getStrokeOpacity()});};b.prototype.getLinePathD=function(p){p=p.concat(p.slice(1,-1).reverse());return d3.svg.line().interpolate("linear-closed")(p);};b.prototype.getSelectedStyle=function(){return this.getInlineStyle({"fill":this.getSelectedStroke(),"stroke":this.getSelectedStroke(),"stroke-width":this.getSelectedStrokeWidth(),"stroke-dasharray":this.getStrokeDasharray(),"pointer-events":"none"});};b.prototype.getBaseRowHeight=function(g){return C.byId(g).getTable()._getDefaultRowHeight();};b.prototype.getProcessedType=function(){var t=this.getProperty("type");var i=C.getConfiguration().getRTL();return i?3-a[t]:a[t];};b.prototype.getRelatedInRowShapes=function(g){var r={predecessor:null,successor:null};Object.keys(r).forEach(function(p){r[p]=G.shapeElementById(this.getProperty(p),g+"-svg");},this);return r;};return b;},true);
