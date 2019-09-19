/*!
 * SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/mdc/experimental/provider/adapter/odata/Annotations","sap/ui/mdc/experimental/provider/adapter/base/FieldAdapter","sap/ui/thirdparty/jquery"],function(A,F,q){"use strict";return{buildSchemaCache:function(o){o._schemaCache=o._schemaCache||{};var k=o.oMetaModel.getId()+">"+o.sMetaPath;if(!o._schemaCache[k]){o._schemaCache[k]=o.oMetaModel.getProperty(o.sMetaPath);o.schema=o._schemaCache[k];this.precalculateFieldControl(o);}else{o.schema=o._schemaCache[k];}},getQualifiers:function(o){var Q=[],a={},k;if(o.sVersion=="4.0"){a=q.extend({},o.oMetaContext.getObject("@"),o.oMetaContext.getObject("./@"));}else{a=o.schema;}for(var b in a){if(b.indexOf("#")!=-1){k=b.split("#");k.shift();if(Q.indexOf(k[0])==-1){Q.push(k[0]);}}}return Q;},getAnnotation:function(a,o,Q){var s=a;if(Q){s+="#"+Q;}if(o.sVersion=="4.0"){return o.oMetaContext.getObject(s);}else{var b=o.schema;var p=s.split("/");var i=0;while(b&&p[i]){b=b[p[i]];i++;}return b;}},_normalizeAnnotation:function(a,d){var p=d.sVersion=="4.0"?"@":"";return p+a;},precalculateFieldControl:function(o){var a=this._normalizeAnnotation(A.FIELD_CONTROL,o);var f=this.getAnnotation(a,o);if(f){var b={};o._schemaCache[o.sMetaPath].$fieldControl=b;var e=f.EnumMember||f.$EnumMember;if(e){switch(e){case A.FIELD_CONTROL_TYPE.HIDDEN:b.visible=false;b.hidden=true;b.editable=false;b.readonly=true;b.required=false;break;case A.FIELD_CONTROL_TYPE.MANDATORY:b.visible=true;b.hidden=false;b.editable=true;b.readonly=false;b.required=true;break;case A.FIELD_CONTROL_TYPE.READONLY:b.visible=true;b.hidden=false;b.editable=false;b.readonly=true;b.required=false;break;default:b.visible=true;b.hidden=false;b.editable=true;b.readonly=true;b.required=false;break;}}else{var p=f.Path||f.$Path;if(o.getModelName()){p=o.getModelName()+">"+p;}b.visible="{= ${"+p+"} !== 0}";b.hidden="{= ${"+p+"} === 0}";b.editable="{= ${"+p+"} !== 1}";b.readonly="{= ${"+p+"} === 1}";b.required="{= ${"+p+"} === 7}";}}},enabled:function(o){var u=this.getAnnotation(this._normalizeAnnotation(A.IMMUTABLE,o),o)||this.getAnnotation(this._normalizeAnnotation(A.COMPUTED,o),o);var e=u?u=="false":true;if(e&&o.schema.$fieldControl){e=o.schema.$fieldControl.editable;o.setValue("!enabled",o.schema.$fieldControl.readonly);}else{o.setValue("!enabled",!e);}return e;},required:function(r,o){var R=this.getAnnotation(r,o);var b=R?R=="false":false;if(o.schema.$fieldControl){b=o.schema.$fieldControl.required;}else{b=b&&o.enabled;}return b;},visible:function(r,o){var h=this.getAnnotation(r,o);var v=h?!h:true;if(v&&o.schema.$fieldControl){v=o.schema.$fieldControl.visible;o.setValue("!visible",o.schema.$fieldControl.hidden);}else{o.setValue("!visible",!v);}return v;},asSemantics:function(o,F){if(this.getAnnotation(this._normalizeAnnotation(A.SEMANTICS.PASSWORD,o),o)!=null){return F.Semantics.password;}if(this.getAnnotation(this._normalizeAnnotation(A.SEMANTICS.EMAIL,o),o)!=null){return F.Semantics.eMail;}if(this.getAnnotation(this._normalizeAnnotation(A.SEMANTICS.PHONE,o),o)!=null){return F.Semantics.phoneNumber;}if(this.getAnnotation(this._normalizeAnnotation(A.SEMANTICS.URL,o),o)!=null){return F.Semantics.url;}if(this.getAnnotation(this._normalizeAnnotation(A.SEMANTICS.UNIT,o),o)!=null){return F.Semantics.measure;}if(this.getAnnotation(this._normalizeAnnotation(A.SEMANTICS.CURRENCY,o),o)!=null){return F.Semantics.currency;}return F.Semantics.text;},stripKeyPredicate:function(s){var p=s.indexOf("(");return p>=0?s.slice(0,p):s;},getValueHelpParamterType:function(a){switch(a){case A.VALUE_LIST_PARAMETER.OUT:return F.ValueHelpParameterType.to;case A.VALUE_LIST_PARAMETER.IN:return F.ValueHelpParameterType.from;case A.VALUE_LIST_PARAMETER.IN_OUT:return F.ValueHelpParameterType.fromTo;case A.VALUE_LIST_PARAMETER.FILTER_ONLY:return F.ValueHelpParameterType.filterOnly;default:return F.ValueHelpParameterType.displayOnly;}},getVisualAnno:function(v,o,Q){var V,a,s;var p=this.presentationVariant(Q,o);if(p&&p.Visualizations){for(var i=0;i<p.Visualizations.length;i++){V=p.Visualizations[i];if(V&&V.startsWith("@"+v)){if(o.sVersion=="4.0"){s="./"+V;}else{s=V.substr(1);}}}}if(s){a=this.getAnnotation(s,o);}if(!a){s=o.sVersion=="4.0"?"./@":"";s+=v;a=this.getAnnotation(s,o,Q);}return a;},presentationVariant:function(Q,o){var v="$presentationVariant",a=o.sVersion=="4.0"?"./@":"";a+=A.PRESENTATION_VARIANT;if(!o.schema[v]){var p=this.getAnnotation(a,o,Q);if(!p){return;}o.schema[v]={MaxItems:p.maxItems,Visualizations:[],SortOrder:[]};for(var i=0;i<p.Visualizations.length;i++){var s=o.sVersion=="4.0"?p.Visualizations[i].$AnnotationPath.trim():p.Visualizations[i].AnnotationPath.trim();o.schema[v].Visualizations.push(s);}for(var i=0;i<p.SortOrder.length;i++){o.schema[v].SortOrder.push({Property:o.sVersion=="4.0"?p.SortOrder[i].Property.$PropertyPath:p.SortOrder[i].Property.PropertyPath,Descending:p.SortOrder[i].Descending?p.SortOrder[i].Descending:false});}}return o.schema[v];}};});
