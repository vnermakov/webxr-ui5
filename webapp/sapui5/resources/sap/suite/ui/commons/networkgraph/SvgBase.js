/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/suite/ui/commons/library","sap/ui/core/Control","sap/ui/core/IconPool","sap/ui/Device","sap/base/security/encodeXML"],function(l,C,I,D,e){"use strict";var E=l.networkgraph.ElementStatus;var S='http://www.w3.org/2000/svg';var a=C.extend("sap.suite.ui.commons.networkgraph.SvgBase",{renderer:{}});a.prototype.HIGHLIGHT_CLASS="sapSuiteUiCommonsNetworkElementHighlight";a.prototype.SELECT_CLASS="sapSuiteUiCommonsNetworkElementSelected";a.prototype.VISIBLE_ACTIONS_BUTTONS_CLASS="sapSuiteUiCommonsNetworkNodeActionButtonsVisible";a.prototype.FOCUS_CLASS="sapSuiteUiCommonsNetworkElementFocus";a.prototype._createElement=function(t,A){var o=document.createElementNS(S,t);return this._setAttributes(o,A);};a.prototype._setAttributes=function(o,A){A=A||{};Object.keys(A).forEach(function(s){o.setAttribute(s,A[s]);});return o;};a.prototype._getStatusClass=function(s){var c=s||this.getStatus();switch(c){case E.Warning:return" sapSuiteUiCommonsNetworkElementWarning ";case E.Error:return" sapSuiteUiCommonsNetworkElementError ";case E.Success:return" sapSuiteUiCommonsNetworkElementSuccess ";case E.Information:return" sapSuiteUiCommonsNetworkElementInformation ";default:return"";}};a.prototype._getAccessibilityLabel=function(){throw new Error("To be implemented by an extending class.");};a.prototype._renderRoundRect=function(A){return this._renderControl("path",{d:this._renderRoundRectPath(A),style:A.style,"class":A.class,id:A.id});};a.prototype._renderRoundRectPath=function(A){A.topRight=A.topRight||0;A.topLeft=A.topLeft||0;A.bottomRight=A.bottomRight||0;A.bottomLeft=A.bottomLeft||0;var r=A.x+A.width,b=A.y+A.height,p="",f=function(R,x,y){p+=" A"+R+","+R+" 0 0,1 "+x+","+y;},c=function(x,y){p+=" L"+x+","+y;};p="M"+(A.x+A.topLeft)+","+A.y;c(r-A.topRight,A.y);if(A.topRight){f(A.topRight,r,A.y+A.topRight);}c(r,b-A.bottomRight);if(A.bottomRight){f(A.bottomRight,r-A.bottomRight,b);}c(A.x+A.bottomLeft,b);if(A.bottomLeft){f(A.bottomLeft,A.x,b-A.bottomLeft);}c(A.x,A.y+A.topLeft);if(A.topLeft){f(A.topLeft,A.x+A.topLeft,A.y);}return p;};a.prototype._appendTextAnchor=function(A){var i=sap.ui.getCore().getConfiguration().getRTL();if(i&&this._isMSBrowser()){A["text-anchor"]="end";}};a.prototype._renderText=function(A){var h;if(A.height&&this._isMSBrowser()){A.attributes.dy=A.height/2;}this._appendTextAnchor(A.attributes);h=this._renderControl("text",A.attributes,false);h+=A.text?e(A.text):"";if(A.close!==false){h+="</text>";}return h;};a.prototype._renderSpanText=function(A,t,h){var H;if(h&&this._isMSBrowser()){A.dy=h/2;}H=this._renderControl("text",A,false);H+=this._renderControl("tspan",{},false);H+=e(t);H+="</tspan></text>";return H;};a.prototype._cannotAppendInnerHtml=function(){return this._isMSBrowser()||D.browser.safari;};a.prototype._isMSBrowser=function(){return D.browser.edge||D.browser.msie;};a.prototype._renderIcon=function(A){var i=I.getIconInfo(A.icon);if(i){return this._renderText({attributes:A.attributes,text:i.content,height:A.height});}return"";};a.prototype._renderControl=function(n,A,c){var h="<"+n+" ";A=A||{};Object.keys(A).forEach(function(s){if(typeof A[s]!=="undefined"){h+=s;h+="=";h+="\""+A[s]+"\"";}});h+=">";c=(c!==false);if(c){h+="</"+n+">";}return h;};a.prototype._createText=function(t,A){var s=t.firstChild,c=A.text.length,b=A.dots!==false,T=A.text,i=true,n=false,w=parseInt(t.getAttribute("maxwidth"),10)||A.width,L=parseFloat(t.getAttribute("x")),d=A.suffix?A.suffix:"",f=A.centerWidth?A.centerWidth:w,g="..."+d,N,h;A.trim=(A.trim!==false);s.textContent=A.text+d;if(A.trim&&w>0){h=t.getBBox().width;if(h>w){n=true;while(true){c/=2;N=T.length+(i?-1:1)*Math.ceil(c);T=A.text.substring(0,N);s.textContent=T+(b?g:"");h=t.getBBox().width;i=(h>w);if(c<0.5&&!i){if(h>w){T=A.text.substring(0,T.length-Math.ceil(c*2));s.textContent=T+ +(b?g:"");}break;}}}}if(A.hCenter&&!n){t.setAttribute("text-anchor","middle");t.setAttribute("x",L+f/2);}return n;};a.prototype._createIcon=function(A,i,h){var o=I.getIconInfo(i),b;if(o){if(h&&this._isMSBrowser()){A.dy=h/2;}b=this._createElement("text",A);b.textContent=o.content;return b;}return null;};a.prototype._getDomId=function(s){var i=this.getId();if(s){i+="-"+s;}return i;};a.prototype._convertToSvg=function(r){var R;var c=function(n){var p={},A;if(n.attributes){for(var i=0;i<n.attributes.length;i++){A=n.attributes[i];p[A.name]=A.value;}}return p;};var f=function(n,s){var o,b,N="";if(n.childNodes.length===1&&!n.childNodes[0].localName){s.textContent=n.childNodes[0].textContent;return;}for(var i=0;i<n.childNodes.length;i++){o=n.childNodes[i];N=o.localName;if(N==="clippath"){N="clipPath";}b=this._createElement(N,c(o));s.appendChild(b);if(o.childNodes){f(o,b);}}}.bind(this);R=this._createElement(r[0].localName,c(r[0]));f(r[0],R);return R;};a.prototype._convertToStyle=function(s,A,b){var c="";if(s){Object.keys(s).forEach(function(d){var v=s[d];if(typeof v!=="undefined"&&v!==""){c+=d;c+=":";c+=s[d]+";";}});c=c+(A||"");if(!b&&c){c="style=\""+c+"\"";}}return c;};a.prototype._renderHtmlElement=function(s,m,A){var h="";h+="<"+s+" ";h+=this._convertToStyle(m);if(A){Object.keys(A).forEach(function(b){var v=A[b];if(typeof v!=="undefined"&&v!==""){h+=b;h+="=";h+="\""+v+"\"";}});}h+=">";return h;};a.prototype._renderHtmlIcon=function(i,c,s,A){var o=I.getIconInfo(i),f="";s=s?"id=\""+this.getId()+"-"+s+"\"":"";c=c||"";if(o){if(o.fontFamily){f="style=\"font-family:"+e(o.fontFamily)+"\"";}return"<div "+s+" "+(A||"")+"class=\"sapSuiteUiCommonsNetworkGraphIcon "+c+"\"><span "+f+">"+e(o.content)+"</span></div>";}return"";};return a;});