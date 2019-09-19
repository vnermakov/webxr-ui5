/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./NavContainer','./library','./AppRenderer','sap/ui/base/DataType',"sap/ui/util/Mobile","sap/base/Log","sap/ui/thirdparty/jquery"],function(N,l,A,D,M,L,q){"use strict";var a=N.extend("sap.m.App",{metadata:{library:"sap.m",properties:{homeIcon:{type:"any",group:"Misc",defaultValue:null},backgroundColor:{type:"string",group:"Appearance",defaultValue:null},backgroundImage:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},backgroundRepeat:{type:"boolean",group:"Appearance",defaultValue:false},backgroundOpacity:{type:"float",group:"Appearance",defaultValue:1},mobileWebAppCapable:{type:"boolean",group:"Appearance",defaultValue:true}},events:{orientationChange:{deprecated:true,parameters:{landscape:{type:"boolean"}}}}}});a.prototype.init=function(){N.prototype.init.apply(this,arguments);this.addStyleClass("sapMApp");M.init({viewport:!this._debugZoomAndScroll,statusBar:"default",hideBrowser:true,preventScroll:!this._debugZoomAndScroll,rootId:this.getId()});q(window).bind("resize",q.proxy(this._handleOrientationChange,this));};a.prototype.onBeforeRendering=function(){if(N.prototype.onBeforeRendering){N.prototype.onBeforeRendering.apply(this,arguments);}M.init({homeIcon:this.getHomeIcon(),mobileWebAppCapable:this.getMobileWebAppCapable()});};a.prototype.onAfterRendering=function(){if(N.prototype.onAfterRendering){N.prototype.onAfterRendering.apply(this,arguments);}var r=this.getDomRef().parentNode;while(r&&r!==document.documentElement){var $=q(r);if($.attr("data-sap-ui-root-content")){break;}if(!r.style.height){r.style.height="100%";}r=r.parentNode;}};a.prototype.exit=function(){q(window).unbind("resize",this._handleOrientationChange);if(this._sInitTimer){clearTimeout(this._sInitTimer);}};a.prototype._handleOrientationChange=function(){var $=q(window);var i=$.width()>$.height();if(this._oldIsLandscape!==i){this.fireOrientationChange({landscape:i});this._oldIsLandscape=i;}};a.prototype.setBackgroundOpacity=function(o){if(o>1||o<0){L.warning("Invalid value "+o+" for App.setBackgroundOpacity() ignored. Valid values are: floats between 0 and 1.");return this;}this.$("BG").css("opacity",o);return this.setProperty("backgroundOpacity",o,true);};a.prototype._getValidatedBackgroundColor=function(){var b=this.getBackgroundColor();if(!D.getType("sap.ui.core.CSSColor").isValid(b)){b="";}return b;};return a;});
