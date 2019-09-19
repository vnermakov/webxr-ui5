/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control',"./ScrollBarRenderer"],function(C,S){"use strict";var a=C.extend("sap.m.ScrollBar",{metadata:{library:"sap.m",properties:{scrollPosition:{type:"int",group:"Behavior",defaultValue:0},contentSize:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null}},events:{scroll:{}}}});a.prototype.init=function(){this._onScrollHandler=this._onscroll.bind(this);};a.prototype.onBeforeRendering=function(){if(this._$ScrollRef&&this._$ScrollRef.length){this._$ScrollRef.off("scroll",this._onScrollHandler);this._$ScrollRef=null;}};a.prototype.onAfterRendering=function(){this._$ScrollRef=this.$("sb");this._$ScrollRef.on("scroll",this._onScrollHandler);this._setScrollPosition(this.getScrollPosition());};a.prototype.onThemeChanged=function(){this.invalidate();};a.prototype.setScrollPosition=function(s){var p=Math.round(Math.max(s,0));this._setScrollPosition(p);return this.setProperty("scrollPosition",p,true);};a.prototype.setContentSize=function(c){this.$("sbcnt").height(c);return this.setProperty("contentSize",c,true);};a.prototype._onscroll=function(e){var s=Math.abs(Math.round(this._$ScrollRef.scrollTop()));this.setProperty("scrollPosition",s,true);this.fireScroll({pos:s});e.preventDefault();e.stopPropagation();return false;};a.prototype._setScrollPosition=function(s){if(this._$ScrollRef&&this._$ScrollRef.length){this._$ScrollRef.scrollTop(s);}};return a;});
