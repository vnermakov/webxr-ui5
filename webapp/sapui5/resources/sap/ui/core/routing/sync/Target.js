/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(L){"use strict";return{display:function(d){var p;if(this._oParent){p=this._oParent.display(d);}return this._place(p,d);},_place:function(p,d){var o=this._oOptions;p=p||{};var v,c=p.oTargetControl,V=p.oTargetParent;if(!this._isValid(p,true)){return;}if(!V&&o.rootView){V=sap.ui.getCore().byId(o.rootView);if(!V){L.error("Did not find the root view with the id "+o.rootView,this);return;}}if(o.controlId){if(V){c=V.byId(o.controlId);}if(!c){c=sap.ui.getCore().byId(o.controlId);}if(!c){L.error("Control with ID "+o.controlId+" could not be found",this);return;}}var a=c.getMetadata().getJSONKeys()[o.controlAggregation];if(!a){L.error("Control "+o.controlId+" does not have an aggregation called "+o.controlAggregation,this);return;}var s=this._getEffectiveObjectName(o.viewName);var b={name:s,type:o.viewType,id:o.viewId};v=this._oCache._get(b,"View",this._bUseRawViewId);this._beforePlacingViewIntoContainer({container:c,view:v,data:d});this._bindTitleInTitleProvider(v);this._addTitleProviderAsDependent(v);if(o.clearControlAggregation===true){c[a._sRemoveAllMutator]();}L.info("Did place the view '"+s+"' with the id '"+v.getId()+"' into the aggregation '"+o.controlAggregation+"' of a control with the id '"+c.getId()+"'",this);c[a._sMutator](v);this.fireDisplay({view:v,control:c,config:this._oOptions,data:d});return{oTargetParent:v,oTargetControl:c};},_isValid:function(p,l){var o=this._oOptions,c=p&&p.oTargetControl,h=(c||o.controlId),i=true,s="";if(!h){s="The target "+o._name+" has no controlId set and no parent so the target cannot be displayed.";i=false;}if(!o.controlAggregation){s="The target "+o._name+" has a control id or a parent but no 'controlAggregation' was set, so the target could not be displayed.";i=false;}if(!o.viewName){s="The target "+o._name+" no viewName defined.";i=false;}if(l&&s){L.error(s,this);}return i;}};});
