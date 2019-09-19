/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","./thirdparty/three"],function(q,B,T){"use strict";var t="sap.ui.vbm.adapter3d.Utilities";var l=q.sap.log;var U=B.extend("sap.ui.vbm.adapter3d.Utilities",{});U.toBoolean=function(v){var f=v.charAt(0);return f==="t"||f!==""&&f!=="f"&&f!==" "&&f!=="0";};U.toFloat=function(v){return parseFloat(v);};U.toVector3=function(v){var a=v.split(";");if(a.length!==3){return[0,0,0];}return a.map(parseFloat);};U.threeJsToVb=function(p){return new T.Vector3(-p.x,p.z,-p.y);};U.vbToThreeJs=function(p){return new T.Vector3(-p.x,-p.z,p.y);};U.toColor=(function(){var d="\\s*(\\d+)\\s*";var h="\\s*(?:0[xX])([\\da-fA-F]+)\\s*";var a=d+"(,|;)"+d+"\\2"+d;var f=d+"(,|;)"+d+"\\2"+d+"\\2"+d;var b=h+"(,|;)"+h+"\\2"+h;var c=h+"(,|;)"+h+"\\2"+h+"\\2"+h;var r=new RegExp("^\\s*RGB\\("+a+"\\)\\s*$");var e=new RegExp("^\\s*RGB\\("+b+"\\)\\s*$");var g=new RegExp("^\\s*RGBA\\("+f+"\\)\\s*$");var i=new RegExp("^\\s*RGBA\\("+c+"\\)\\s*$");var j=new RegExp("^\\s*ARGB\\("+f+"\\)\\s*$");var k=new RegExp("^\\s*ARGB\\("+c+"\\)\\s*$");var n=new RegExp("^\\s*HLS\\("+a+"\\)\\s*$");var o=new RegExp("^\\s*HLS\\("+b+"\\)\\s*$");var p=new RegExp("^\\s*HLSA\\("+f+"\\)\\s*$");var s=new RegExp("^\\s*HLSA\\("+c+"\\)\\s*$");var u=new RegExp("^"+d+"$");var v=new RegExp("^"+h+"$");return function(w,x){var m;var y;var z=1;if((m=w.match(r))){y=new T.Color(parseInt(m[1],10)/255,parseInt(m[3],10)/255,parseInt(m[4],10)/255);}else if((m=w.match(e))){y=new T.Color(parseInt(m[1],16)/255,parseInt(m[3],16)/255,parseInt(m[4],16)/255);}else if((m=w.match(g))){y=new T.Color(parseInt(m[1],10)/255,parseInt(m[3],10)/255,parseInt(m[4],10)/255);z=m[5]/255;}else if((m=w.match(i))){y=new T.Color(parseInt(m[1],16)/255,parseInt(m[3],16)/255,parseInt(m[4],16)/255);z=m[5]/255;}else if((m=w.match(j))){y=new T.Color(parseInt(m[3],10)/255,parseInt(m[4],10)/255,parseInt(m[5],10)/255);z=m[1]/255;}else if((m=w.match(k))){y=new T.Color(parseInt(m[3],16)/255,parseInt(m[4],16)/255,parseInt(m[5],16)/255);z=m[1]/255;}else{if(x){throw new Error("Cannot convert color.");}y=new T.Color(0.5,0.5,0.5);}return{rgb:y,opacity:z};};})();U.toDeltaColor=(function(){var f="\\s*([-+]?\\d*\\.?\\d+(?:[eE][-+]?\\d+)?)\\s*";var r=new RegExp("^\\s*RHLS\\("+f+";"+f+";"+f+"\\)\\s*$");var a=new RegExp("^\\s*RHLSA\\("+f+";"+f+";"+f+";"+f+"\\)\\s*$");var d=new T.Color(0.5,0.5,0.5);var b=1;var w=false;var c="RHLS and RHLSA are not supported yet.";return function(v){var m;if((m=v.match(r))){if(!w){l.warning(c,v,t);w=true;}}else if((m=v.match(a))){if(!w){l.warning(c,v,t);w=true;}}else{try{return{color:U.toColor(v,true)};}catch(e){l.warning(e.message,v,t);return{color:{rgb:d.clone(),opacity:b}};}}return{color:{rgb:d.clone(),opacity:b}};};})();U.applyColor=function(a,v){if(v){var c=U.toColor(v);a.object3D.traverse(function(n){if(n.isMesh&&n.material&&n.material.length==undefined){n.material.color=c.rgb;n.material.opacity=c.opacity;n.material.transparent=c.opacity<1;}else if(n.isMesh&&n.material&&n.material.length!=0){for(var i=0;i<n.material.length;i++){n.material[i].color=c.rgb;n.material[i].opacity=c.opacity;n.material[i].transparent=c.opacity<1;}}});}return this;};U.applyColorBorder=function(i,v){if(v){var c=U.toColor(v);i.object3D.traverse(function(n){if(n.isLineSegments&&n.material){n.material.color=c.rgb;n.material.opacity=c.opacity;n.material.transparent=c.opacity<1;}});}return this;};U.clamp=function(v,m,a){if(v<m){return m;}if(v>a){return a;}return v;};U.swap=function(o,a,b){var c=o[a];o[a]=o[b];o[b]=c;};return U;});
