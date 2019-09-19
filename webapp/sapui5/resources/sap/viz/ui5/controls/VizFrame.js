/*!
 * SAPUI5

(c) Copyright 2009-2019 SAP SE. All rights reserved
 */
sap.ui.define(['sap/viz/library','sap/ui/core/theming/Parameters','sap/viz/ui5/theming/Util','sap/viz/ui5/utils/CommonUtil','./ResponsiveLegend','./common/BaseControl','./common/feeds/AnalysisObject','./common/feeds/FeedItem','./common/feeds/FeedHelper','./common/helpers/RuntimeOptionsHelper','./common/helpers/DefaultPropertiesHelper','./common/utils/Constants','./common/utils/SelectionDetailUtil','sap/ui/Device',"sap/ui/thirdparty/jquery"],function(l,P,U,C,R,B,A,F,a,b,D,c,S,d,q){"use strict";var f=sap.viz.vizservices.__internal__.BindingService;var g=sap.viz.vizservices.__internal__.PropertyService;var V=B.extend("sap.viz.ui5.controls.VizFrame",{metadata:{library:"sap.viz",properties:{vizType:{type:"string",group:"Misc",defaultValue:"column"},vizProperties:{type:"object",group:"Misc",defaultValue:null},vizScales:{type:"object",group:"Misc",defaultValue:null},vizCustomizations:{type:"object",group:"Misc",defaultValue:null},legendVisible:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{dataset:{type:"sap.viz.ui5.data.Dataset",multiple:false},feeds:{type:"sap.viz.ui5.controls.common.feeds.FeedItem",multiple:true,singularName:"feed"}},events:{renderComplete:{},selectData:{},deselectData:{}}}});V.prototype.init=function(){sap.viz.ui5.controls.common.BaseControl.prototype.init.apply(this,arguments);this._wrapApi('setModel',function(){this._invalidateDataset=true;}.bind(this));this._wrapApi('setDataset',function(){this._invalidateDataset=true;}.bind(this));this._wrapApi('destroyDataset',function(){this._invalidateDataset=true;}.bind(this));this._wrapApi('addFeed',function(){this._invalidateFeeds=true;}.bind(this));this._wrapApi('removeFeed',function(){this._invalidateFeeds=true;}.bind(this));this._wrapApi('destroyFeeds',function(){this._invalidateFeeds=true;}.bind(this));this._vizFrame=null;this._currentTheme=null;this._connectPopover=null;this._currentTemplate=null;this._errorType=null;this._bulletProperties={plotArea:{}};this._waterfallProperties={plotArea:{}};this._bReadyToRender=true;this._scalesOption=null;this._clearVariables();this._templateCache={};this.data("sap-ui-fastnavgroup","true",true);};V.prototype.applySettings=function(){sap.ui.core.Control.prototype.applySettings.apply(this,arguments);};V.prototype.exit=function(){sap.viz.ui5.controls.common.BaseControl.prototype.exit.apply(this,arguments);this._clearVariables();if(this._vizFrame){this._vizFrame.destroy();}this._vizFrame=null;};V.prototype._getDataRange=function(s,e){return(this._vizFrame&&this._vizFrame._getDataRange(s,e))||{displayValues:{start:s,end:e}};};V.prototype._setTitleAria=function(e){if(this._vizFrame$.length){this._vizFrame$.attr("aria-hidden",true);q(this._app$).attr("aria-label",e);}};V.prototype._clearVariables=function(){this._clearRequestedProperties();this._bulletProperties={plotArea:{}};this._waterfallProperties={plotArea:{}};this._cachedDataset=null;this._connectPopover=null;this._templateCache=null;};V.prototype._clearRequestedProperties=function(){this.setProperty('vizProperties',null);this.setProperty('vizScales',null);this.setProperty('vizCustomizations',null);this._scalesOption=null;};V.prototype.getVizUid=function(){return this.getId();};V.prototype.setUiConfig=function(u){sap.viz.ui5.controls.common.BaseControl.prototype.setUiConfig.apply(this,arguments);return this;};V.prototype.setVizType=function(v){var o=this._getCalculatedType();if(v!==this.getVizType()){this._invalidateVizType=true;}this.setProperty('vizType',v,true);var n=this._getCalculatedType();if(o!==n&&!this._pendingRerendering&&(this._vizFrame||this._errorType)){var u=this._userFeeds||{feeds:this.getFeeds(),vizType:o};if(u.vizType===n){this.destroyFeeds();u.feeds.forEach(function(e){this.addFeed(e);},this);this._userFeeds=null;}else{this._switchFeeds(o,this._getCalculatedType(),u);}}else{this.invalidate();}return this;};V.prototype._switchFeeds=function(e,t,u){var i=F.toLightWeightFmt(this.getFeeds());var n=sap.viz.vizservices.BVRService.switchFeeds(e,i,t).feedItems;var k=a.getFeedDefsMap(t);n.forEach(function(o){if(o.id&&k[o.id]){o.type=k[o.id].type;}});var m=F.fromLightWeightFmt(n);u.feeds.forEach(function(o){this.removeFeed(o,true);},this);this.vizUpdate({feeds:m});this._userFeeds=u;};V.prototype.invalidate=function(o){if(o instanceof sap.viz.ui5.data.Dataset){this._invalidateDataset=true;}if(o instanceof F){this._userFeeds=null;}sap.viz.ui5.controls.common.BaseControl.prototype.invalidate.call(this,o);};V.prototype.getVizProperties=function(){if(this._vizFrame){return this._mergeProperties(this._mergeProperties({},this._vizFrame.properties()||{}),this.getProperty('vizProperties')||{});}else{return this.getProperty('vizProperties');}};V.prototype.getVizScales=function(){if(this._vizFrame){return C.extendScales(this._vizFrame.scales()||[],this.getProperty('vizScales')||[]);}else{return this.getProperty('vizScales');}};V.prototype.zoom=function(e){if(this._vizFrame){this._vizFrame.zoom({target:"plotArea",direction:e.direction});}};V.prototype.setVizProperties=function(v){var t=this._getCalculatedType();if(v&&(t==="info/bullet"||t==="info/vertical_bullet")){b.processBulletProperty(this._bulletProperties,v);}if(v&&(t==="info/timeseries_waterfall")){b.processWaterfallProperty(this._waterfallProperties,v);}var o=sap.viz.api.serialization.migrate({'type':this._getCalculatedType(),'properties':v});if(this._vizFrame&&!this._pendingRerendering){if(this._errorType!==c.ERROR_TYPE.NODATA){this._updateDescription();}try{this._vizFrame.update(o);}catch(e){this._handleErr(e);}}else{this.setProperty('vizProperties',this._mergeProperties(this.getProperty('vizProperties')||{},o.properties||{}));this.setVizScales(o.scales,this._scalesOption);}return this;};V.prototype.setVizScales=function(v,o){if(this._vizFrame&&!this._pendingRerendering){try{if(o){this._vizFrame.scales(v,{level:'user',replace:o.replace});}else{this._vizFrame.scales(v);}}catch(e){this._handleErr(e);}}else{if(o){this._scalesOption={level:'user',replace:o.replace};}if(o&&o.replace){this.setProperty('vizScales',v);}else{this.setProperty('vizScales',C.extendScales(this.getProperty('vizScales')||[],v||[]));}}return this;};V.prototype.getLegendVisible=function(){return this.getVizProperties().legendGroup.computedVisibility;};V.prototype.setLegendVisible=function(v){this.setVizProperties({'legend':{'visible':v},'sizeLegend':{'visible':v}});return this;};V.prototype.vizSelection=function(p,o){if(this._vizFrame){try{var r=this._vizFrame.selection.apply(this._vizFrame,arguments);if(r===this._vizFrame){r=this;}}catch(e){return null;}return r;}else{return null;}};V.prototype.vizUpdate=function(o){if(this._vizFrame||this._errorType){if(o.data||o.feeds){if(o.properties){this.setVizProperties(o.properties);}if(o.scales){this.setVizScales(o.scales);}if(o.customizations){this.setVizCustomizations(o.customizations);}if(o.data){this.setDataset(o.data);}if(o.feeds){this.destroyFeeds();o.feeds.forEach(function(i){this.addFeed(i);}.bind(this));}}else{try{this._vizFrame.update(o);}catch(e){this._handleErr(e);}}}};V.prototype.setVizCustomizations=function(o){if(V._isCustomizationAPISupportedVizType(this._getCalculatedType())){if(this._vizFrame&&!this._pendingRerendering){try{this._vizFrame.customizations(o);}catch(e){this._handleErr(e);}}else{this.setProperty('vizCustomizations',this._mergeProperties(this.getProperty('vizCustomizations')||{},o||{}));}}return this;};V.prototype.getVizCustomizations=function(){if(this._vizFrame){return this._mergeProperties(this._mergeProperties({},this._vizFrame.customizations()||{}),this.getProperty('vizCustomizations')||{});}else{return this.getProperty('vizCustomizations');}};V._isCustomizationAPISupportedVizType=function(v){return Array.prototype.indexOf.call(['info/column','info/dual_column','info/bar','info/dual_bar','info/stacked_bar','info/stacked_column','info/100_stacked_bar','info/100_stacked_column','info/100_dual_stacked_bar','info/100_dual_stacked_column','info/dual_stacked_bar','info/dual_stacked_column','info/line','info/horizontal_line','info/dual_line','info/dual_horizontal_line','info/bubble',"info/scatter",'info/combination','info/horizontal_combination','info/stacked_combination','info/horizontal_stacked_combination','info/dual_stacked_combination','info/dual_horizontal_stacked_combination','info/timeseries_combination','info/timeseries_stacked_combination','info/timeseries_bullet','info/dual_timeseries_combination','info/dual_combination','info/dual_horizontal_combination'],v)>-1;};V.prototype.getResponsiveLegend=function(){if(this._vizFrame){return sap.viz.ui5.controls.ResponsiveLegend.createInstance(this._vizFrame.responsiveLegend());}};V.prototype.exportToSVGString=function(o){var r="<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\"/>";if(this._vizFrame){r=this._vizFrame.exportToSVGString(o);}return r;};V.prototype._getScopeString=function(){var s=P.getActiveScopesFor(this);return JSON.stringify(s);};V.prototype._scopingChangedFun=function(e){var E=e.getParameter("element");var i=false;if(this===E){i=true;}else{var n=this;while(n){n=n.getParent();if(n===E){i=true;break;}}}if(i){var s=this._getScopeString();if(this._sCurrentScopeChain!==undefined&&this._sCurrentScopeChain!==s){this._themeChangedHandler();var r={forceThemeChange:true};this._renderVizFrame(r);}}};V.prototype._createContainerDiv=function(){q(this._app$).attr("data-sap-ui-preserve",true);if(!this._vizFrame$){this._vizFrame$=q(document.createElement('div'));this._vizFrame$.addClass(c.CSS_PREFIX+'-viz-frame');this._vizFrame$.appendTo(this._app$);}if(!this._description$){this._description$=q(document.createElement('div'));this._description$.addClass(c.CSS_PREFIX+'-viz-description');this._description$.appendTo(this._app$);this._description$.attr('tabindex',0);this._descriptionTitle$=q(document.createElement('div'));this._descriptionTitle$.addClass(c.CSS_PREFIX+'-viz-description-title');this._descriptionTitle$.appendTo(this._description$);this._descriptionDetail$=q(document.createElement('div'));this._descriptionDetail$.addClass(c.CSS_PREFIX+'-viz-description-detail');this._descriptionDetail$.appendTo(this._description$);this._descriptionMessage$=q(document.createElement('div'));this._descriptionMessage$.addClass(c.CSS_PREFIX+'-viz-description-message');this._descriptionMessage$.appendTo(this._description$);}};V.prototype._createVizFrame=function(o){sap.ui.getCore().attachThemeScopingChanged(this._scopingChangedFun,this);o.container=this._vizFrame$.get(0);var v=this._vizFrame=new sap.viz.vizframe.VizFrame(o,{'controls':{'morpher':{'enabled':false}},'throwError':true});v.on('selectData',function(e){this.fireEvent("selectData",e);}.bind(this));v.on('deselectData',function(e){this.fireEvent("deselectData",e);}.bind(this));v.on('initialized',function(e){var i=this._vizFrame$;i.focusin(function(k){k.preventDefault();i.addClass('sapMFocus');});i.focusout(function(k){k.preventDefault();i.removeClass('sapMFocus');});this.fireEvent("renderComplete",e);}.bind(this));v.on('scroll',function(e){this.fireEvent("_scroll",e);}.bind(this));v.on('_selectionDetails',function(e){S.appendShapeStrings(e.data);this.fireEvent("_selectionDetails",e);}.bind(this));v.on('_zoomDetected',function(e){this.fireEvent("_zoomDetected",e);}.bind(this));return v;};V.prototype._migrate=function(t,e){e.forEach(function(k){var m=sap.viz.api.serialization.feedsIdToBindingId(t,k.getUid());if(m){k.setProperty('uid',m,true);}});if(t==="info/bullet"||t==="info/vertical_bullet"||t==="info/timeseries_bullet"){var i=false;e.forEach(function(k){i=i||k.getUid()==='actualValues';});if(!i){e.forEach(function(k){if(k.getUid()==='valueAxis'){k.setUid('actualValues');if(k.getValues().length>1){e.push(new F({'uid':'additionalValues','type':'Measure','values':[k.getValues()[1]]}));k.setValues([k.getValues()[0]]);}}});}}};function h(e){for(var i=e.length-1;i>=0;i--){var k=e[i];if(k.feed&&k.feed==="color"&&k.palette){return i;}}return-1;}V.prototype._checkProps=function(e,o,i){if(e==='fiori'){o.properties=b.decorateFiori(o,i,this.getVizProperties());}if(o.properties){o.properties=g.removeInvalid(o.type,o.properties);}if(o.type==="info/bullet"||o.type==="info/vertical_bullet"){o.properties=this._mergeProperties(o.properties||{},this._bulletProperties);b.decorateBullet(o,i);}if(o.type==="info/timeseries_bullet"){b.decorateTimeBullet(o);}if(o.type==="info/timeseries_waterfall"){b.decorateWaterfall(o,i);o.properties=this._mergeProperties(o.properties||{},this._waterfallProperties);}};function j(e,i,o){var m=g.mergeProperties;var k=sap.viz.ui5.theming.Util.readCSSParameters;var n=D.get(g,e,i);var p=D.getExtraProp(i);return m(e,n,k(e,o),p);}V.prototype._getTemplateProps=function(e,i){var m=g.mergeProperties;var k,n;var o={};for(n=0;n<c.CORE_CHART_TYPES.length;n++){k=c.CORE_CHART_TYPES[n];o[k]=j(k,e,this);}if(i.properties){for(n=0;n<c.CORE_CHART_TYPES.length;n++){k=c.CORE_CHART_TYPES[n];o[k]=m(k,i.properties[k],o[k]);o[k]=g.removeInvalid(k,o[k]);}}return o;};V.prototype._getOptions=function(t,e){var o={'type':t,'properties':{}};if(this._invalidateDataset){o.data=this._getVizDataset();this._invalidateDataset=false;}if(this._invalidateFeeds){o.bindings=this._getVizBindings(t,e);this._invalidateFeeds=false;}if(this.getProperty('vizProperties')){o.properties=this.getProperty('vizProperties');}if(this.getProperty('vizScales')){o.scales=this.getProperty('vizScales');}if(this._scalesOption){o.scalesOption=this._scalesOption;}if(this.getProperty('vizCustomizations')){o.customizations=this.getProperty('vizCustomizations');}if(this._aRuntimeScales){o.sharedRuntimeScales=this._aRuntimeScales;}o.template=this._currentTemplate;return o;};V.prototype._setCustomMessages=function(o){this._errorInfo=o;this._handleDescription(this._errorType);};V.prototype._renderVizFrame=function(r){if(!this._readyToRender()){return;}var e=(this.getUiConfig()||{}).applicationSet;var t=this._getCalculatedType();var i=this.getFeeds();var m=g.mergeProperties;var o={_invalidateDataset:this._invalidateDataset,_invalidateVizType:this._invalidateVizType,_invalidateFeeds:this._invalidateFeeds};this._migrate(t,i);var k=false,n=sap.ui.getCore().getConfiguration().getTheme();if((r&&r.forceThemeChange)||(this._currentTheme!==n)){k=true;}o.theme=n;if(!(this._invalidateFeeds||this._invalidateDataset||k||this._invalidateVizType||this._localeChanged)||!this._isDataReady()){return;}this._createContainerDiv();try{var p=this._getOptions(t,i);if(!p){return;}this._currentTheme=n;if(this._isExtension()){var s=j(t,e);p.properties=m(t,s,p.properties);}this._checkProps(e,p,i,t);if(this._invalidateVizType){this._invalidateVizType=false;}if(!this._vizFrame){if(p.data){this._createVizFrame(p);this._clearRequestedProperties();}}else{this._vizFrame.update(p);this._clearRequestedProperties();}if(this._connectPopover){this._connectPopover();}var v=this._getVizDataset();if(v&&v._FlatTableD&&(!v._FlatTableD._data.length)){throw c.ERROR_MESSAGE.NODATA;}else{this._errorType=null;this._updateDescription();}this._localeChanged=false;}catch(u){if(!this._vizFrame){this._invalidateDataset=o._invalidateDataset;this._invalidateVizType=o._invalidateVizType;this._invalidateFeeds=o._invalidateFeeds;this._currentTheme=o.theme;}this._handleErr(u);}};V.prototype._themeChangedHandler=function(e){var i=(this.getUiConfig()||{}).applicationSet;var k=i||"";var m="";this._sCurrentScopeChain=this._getScopeString();if(this._sCurrentScopeChain){m=this._sCurrentScopeChain;}var t=sap.ui.getCore().getConfiguration().getTheme();var n=t+"_"+k+"_"+c.TEMPLATE_POSTFIX+m;this._currentTemplate=n;var o=sap.viz.api.env.Template.get();var p=sap.viz.extapi.env.Template;if(!p.isRegistered(n)||e){p.unregister(n);var r;if(o.indexOf(c.TEMPLATE_POSTFIX)>-1){r=p.getPackage('standard_fiori')||p.getPackage('default');}else{r=p.current();}if(!this._templateCache[n]){this._templateCache[n]=this._getTemplateProps(i,r);}var s=this._templateCache[n];r.properties=r.properties||{};r.scales=r.scales||{};for(var u in s){if(s.hasOwnProperty(u)){r.properties[u]=s[u];var v=r.scales[u];if(v){var w=h(v);if(w>-1){v.splice(w,1);}}}}r.id=n;r.name=n;p.register(r);}};V.prototype.onThemeChanged=function(e){if(this._app$&&this.$()){this._themeChangedHandler(e.triggeredBy&&e.triggeredBy==='themedesigner');this.invalidate();}};V.prototype.onlocalizationChanged=function(){if(this._app$&&this.$()){sap.viz._applyLocale(function(){if(this._errorType){this._localeChanged=true;this.invalidate();}}.bind(this));}};V.prototype._isDataReady=function(){var e=this.getDataset();return(!e||!e.isReady())?false:true;};V.prototype._getVizDataset=function(){var e=this.getDataset();if(this._isExtension()){var m=this._getMetadata();if(m){if(m.dataType==='raw'){return e.getRawDataset();}else if(m.dataType==='sap.viz.api.data.CrosstableDataset'){a.updateAxis(e.getDimensions(),this._getCalculatedType(),this.getFeeds());return e.getVIZCrossDataset();}else{return e.getVIZFlatDataset();}}else{a.updateAxis(e.getDimensions(),this._getCalculatedType(),this.getFeeds());return e.getVIZCrossDataset();}}else{return e.getVIZFlatDataset();}};V.prototype._getVizBindings=function(t,e){if(e&&e.length){var i=F.toLightWeightFmt(e);i=sap.viz.vizservices.BVRService.suggestFeeds(t,i,[{'id':'MND','type':'MND'}]).feedItems;if(this._isExtension()){var m=this._getMetadata();if(m){if(m.dataType==='sap.viz.api.data.CrosstableDataset'){return f.generateBindings(t,i,'CrossTableDataset');}else{return f.generateBindings(t,i,'FlatTableDataset');}}else{return f.generateBindings(t,i,'CrossTableDataset');}}else{return f.generateBindings(t,i,'FlatTableDataset');}}else{return null;}};V.prototype._getMetadata=function(){var m;try{m=sap.viz.api.metadata.Viz.get(this._getCalculatedType());}catch(e){m=null;}return m;};V.prototype._onConnectPopover=function(e){if(arguments.length>0){this._connectPopover=e;}return this._connectPopover;};V.prototype._createChildren=function(){this._themeChangedHandler();this._renderVizFrame();};V.prototype._updateChildren=function(){this._renderVizFrame();};V.prototype._validateSize=function(e){if(!this._app$||!this.$()||(e&&e.size&&(e.size.height==0||e.size.width==0))||this.$().prop('offsetHeight')===0){return;}var i={'width':this.$().width(),'height':this.$().height()};if(this._vizFrame){var s=this._vizFrame.size();if(!s||s.width!==i.width||s.height!==i.height){this._vizFrame.size({'width':i.width,'height':i.height,'auto':true});}}};V.prototype._getCalculatedType=function(){if(this._isExtension()){return this.getVizType();}else{return this._getInfoType();}};V.prototype._isExtension=function(){return c.CORE_CHART_TYPES.indexOf(this._getInfoType())===-1;};V.prototype._getInfoType=function(){var v=this.getVizType();if(v.indexOf("info/")===-1){return'info/'+v;}else{return v;}};V.prototype._mergeProperties=function(t,p){return g.mergeProperties(this._getCalculatedType(),t,p);};V.prototype._wrapApi=function(n,e){this[n]=function(){var r=V.prototype[n].apply(this,arguments);e();return r;}.bind(this);};V.prototype._updateDescription=function(e){var i=this._description$;var t=this._descriptionTitle$;var k=this._descriptionDetail$;var m=this._descriptionMessage$;if(!this._description$.length){return;}if(!e){i.hide();}else{i.show();t.empty();k.empty();m.empty();var n="";if(e.title){t.show().text(e.title);n+=e.title+". ";}if(e.detail){k.show().text(e.detail);n+=e.detail+" ";}if(e.message){m.show().text(e.message);n+=e.message;}i.attr('aria-label',n);}};V.prototype._handleDescription=function(e,i){var k;if(!e){return;}if(this._errorInfo&&this._errorInfo[e]){k={message:this._errorInfo[e]};}else if(e===c.ERROR_TYPE.INVALIDDATA){k={title:sap.viz.extapi.env.Language.getResourceString("IDS_ERROR_INVALIDE_DATA"),detail:sap.viz.extapi.env.Language.getResourceString("IDS_ERROR_INVALIDE_DATA_DESCRIPTION")};}else if(e===c.ERROR_TYPE.MULTIPLEUNITS){k={title:sap.viz.extapi.env.Language.getResourceString("IDS_ERROR_INVALIDE_DATA"),detail:sap.viz.extapi.env.Language.getResourceString("IDS_ERROR_INVALIDE_DATA_MULTIPLEUNITS")};}else if(e===c.ERROR_TYPE.NODATA){k={title:sap.viz.extapi.env.Language.getResourceString("IDS_ERROR_ISNODATA")};}else{k={message:i};}this._updateDescription(k);};V.prototype._handleErr=function(e){var s=(this.getUiConfig()||{}).showErrorMessage!==false;var i=true;if(s){if(e===c.ERROR_MESSAGE.NODATA){this._errorType=c.ERROR_TYPE.NODATA;i=false;}else if(e===c.ERROR_MESSAGE.MULTIPLEUNITS){this._errorType=c.ERROR_TYPE.MULTIPLEUNITS;this._clearVizFrame();}else{this._errorType=e.toString().indexOf("[50060]")>=0?c.ERROR_TYPE.INVALIDDATA:c.ERROR_TYPE.OTHERS;if(this._vizFrame){this._vizFrame$.find(".v-info").remove();}else{this._clearVizFrame();}}this._handleDescription(this._errorType,e);}if(i){this.fireEvent('renderFail',{'id':'renderFail','error':e});}};V.prototype._clearVizFrame=function(){if(this._vizFrame){this._vizFrame.destroy();this._vizFrame=null;}this._vizFrame$.empty();sap.ui.getCore().detachThemeScopingChanged(this._scopingChangedFun,this);};V.prototype._runtimeScales=function(r,s){if(arguments.length===0){return this._vizFrame?this._vizFrame.runtimeScales():this._aRuntimeScales;}else if(r){this._aRuntimeScales=[].concat(r);if(!s){this.invalidate();}}};V.prototype._getZoomInfo=function(){var z,e,i,k,s=this._states();if(s){z=s.zoomInOut;if(z){e=z.enabled;i=z.currentZoomLevel;}else{e=false;i=null;}k={enabled:e,currentZoomLevel:i};}else{k={};}return k;};V.prototype._states=function(){var r;if(this._vizFrame){r=this._vizFrame.states.apply(this._vizFrame,arguments);}return r===this._vizFrame?this:r;};V.prototype._readyToRender=function(r){if(arguments.length===0){return this._bReadyToRender;}else{this._bReadyToRender=r;}};return V;});