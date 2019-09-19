/*
 * SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/comp/smartfield/BindingUtil","sap/ui/model/ParseException"],function(B,P){"use strict";var F=function(p,h){this._bIsDestroyed=false;this._oBinding=new B();this._oStoredProperties={};this._bVisibleSet=false;this._bEditableSet=false;this._bMandatorySet=false;this._bUomEditableSet=false;this._oStoredBindings={};this._oParent=p;this._oHelper=h;this._oAnnotation=h.oAnnotation;};F.prototype.getBindablePropertiesNames=function(n){if(n){return["editable","visible"];}return["editable","visible","mandatory"];};F.prototype.getControlProperties=function(m,b){var M,l,n,r={};if(m&&b){l=b.length;while(l--){n=b[l];M="_get"+n.substring(0,1).toUpperCase()+n.substring(1);if(this[M]){r[n]=this[M](m,this._oParent.getBindingInfo(n));}}}return r;};F.prototype._getEditable=function(m,b,p){var a,i=-1,e=-1,c=-1,t=this,o={length:0};if(p==="uomEditable"){this._bUomEditableSet=true;}else{this._bEditableSet=true;}if(!b){if(p){a=this._oParent["get"+p.substring(0,1).toUpperCase()+p.substring(1)]();this._oStoredProperties[p]=a;}else{a=this._oParent.getEditable();this._oStoredProperties["editable"]=a;}this._oStoredBindings.editable=null;}else if(this._oStoredBindings.editable===undefined){this._oStoredBindings.editable=b;}return{path:function(){var d=[],s,l=0;if(!m.property||!m.property.property){return[""];}s=t._oAnnotation.getFieldControlPath(m.property.property);if(s){d.push(t._toPath(m,s));i=l;l++;}if(m.entitySet["sap:updatable-path"]){d.push(m.entitySet["sap:updatable-path"]);e=l;l++;}if(b){c=l;t._oBinding.getBindingParts(b,d,o);l=l+o.length;}if(l>0){return d;}return[""];},formatter:function(v,d,f,g){var A=[],h,O;if(t._bIsDestroyed){return false;}if(!t._oAnnotation){return false;}if(this&&(typeof this.getBindingContext==="function")){h=this.getBindingContext();}else{h=t._oParent.getBindingContext();}if(!h){return v;}if(h.getObject&&m&&m.property&&m.property.property){O=h.getObject();if(O&&O.__metadata&&O.__metadata.created){if(!t._getCreatableStatic(m)){return false;}}else if(!t._getUpdatableStatic(m)){return false;}}if(i>-1){A.push(arguments[i]!==1);}if(e>-1&&(!O||!O.__metadata||!O.__metadata.created)){A.push(!!arguments[e]);}if(c>-1){if(b.formatter){A.push(t._execFormatter(b.formatter,arguments,c,o.length));}else{A.push(!!arguments[c]);}}else{A.push(a);}return t._compare(A,false,true);}};};F.prototype._execFormatter=function(f,a,s,l){var A=[],i;if(s>-1&&l>-1){for(i=0;i<l;i++){A.push(a[s+i]);}}return f.apply(null,A);};F.prototype._getCreatableStatic=function(m){return(this._oAnnotation.canCreateEntitySet(m.entitySet)&&this._oAnnotation.canCreateProperty(m.property.property));};F.prototype._getUpdatableStatic=function(m){return(this._oAnnotation.canUpdateEntitySet(m.entitySet)&&this._oAnnotation.canUpdateProperty(m.property.property));};F.prototype._compare=function(a,p,d){var i,l=a.length;for(i=0;i<l;i++){if(a[i]===p){return p;}}return d;};F.prototype._getVisible=function(m,b){var p,i=-1,a=-1,t=this,o={length:0};this._bVisibleSet=true;if(!b){p=this._oParent.getVisible();this._oStoredProperties.visible=p;this._oStoredBindings.visible=null;}else if(this._oStoredBindings.visible===undefined){this._oStoredBindings.visible=b;}return{path:function(){var c=[],s,l=0;if(!m.property||!m.property.property){return[""];}s=t._oAnnotation.getFieldControlPath(m.property.property);if(s){c.push(t._toPath(m,s));a=l;l++;}if(b){i=l;t._oBinding.getBindingParts(b,c,o);l=l+o.length;}if(l>0){return c;}return[""];},formatter:function(c,d){var A=[];if(t._bIsDestroyed){return false;}if(!t._oAnnotation){return false;}if(m.property&&m.property.property&&t._oAnnotation.getVisible(m.property.property)==="false"){return false;}if(a>-1){A.push(arguments[a]!==0);}if(i>-1){if(b.formatter){A.push(t._execFormatter(b.formatter,arguments,i,o.length));}else{A.push(!!arguments[i]);}}else{A.push(p);}return t._compare(A,false,true);}};};F.prototype._getMandatory=function(m,b){var p,i=-1,a=-1,t=this,o={length:0};this._bMandatorySet=true;if(!b){p=this._oParent.getMandatory();this._oStoredProperties.mandatory=p;this._oStoredBindings.mandatory=null;}else if(this._oStoredBindings.mandatory===undefined){this._oStoredBindings.mandatory=b;}return{path:function(){var c=[],s,l=0;if(!m.property||!m.property.property){return[""];}s=t._oAnnotation.getFieldControlPath(m.property.property);if(s){c.push(t._toPath(m,s));a=l;l++;}if(b){i=l;t._oBinding.getBindingParts(b,c,o);l=l+o.length;}if(l>0){return c;}return[""];},formatter:function(c,d){var A=[];if(t._bIsDestroyed){return true;}var e=m.property&&m.property.property;if(e){if(e.nullable==="false"||(t._oAnnotation&&t._oAnnotation.isStaticMandatory(e))){A.push(true);}else if(e.nullable){A.push(false);}}if(a>-1){A.push(arguments[a]===7);}if(i>-1){if(b.formatter){A.push(t._execFormatter(b.formatter,arguments,i,o.length));}else{A.push(!!arguments[i]);}}else{A.push(p);}return t._compare(A,true,false);}};};F.prototype._toPath=function(m,p){if(m.property.complex){return m.path.replace(m.property.property.name,p);}if(m.navigationPath){return m.navigationPath+"/"+p;}return p;};F.prototype.getMandatoryCheck=function(p){if(p){switch(p.property.type){case"Edm.DateTimeOffset":case"Edm.DateTime":case"Edm.Time":case"Edm.String":case"Edm.Decimal":case"Edm.Double":case"Edm.Float":case"Edm.Single":case"Edm.Int16":case"Edm.Int32":case"Edm.Int64":case"Edm.Byte":case"Edm.SByte":return function(v,s){var e=(v===""||v==null);if(e){var m=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("VALUEHELPVALDLG_FIELDMESSAGE");if(this._oAnnotation&&!this._oAnnotation.isNullable(p.property)){throw new P(m);}if(this._oParent.getClientSideMandatoryCheck()&&this._oParent.getMandatory()){throw new P(m);}}}.bind(this);}}};F.prototype.getUOMEditState=function(m){var n,u,U,l=0,b;b=this._oParent.getBindingInfo("editable");n=this._getEditable(m,b);U={model:m.model,path:this._oHelper.getUOMPath(m),entitySet:m.entitySet,entityType:m.entityType,property:{property:m.annotations.uom.property,complex:m.property.complex,typePath:this._oHelper.getUOMTypePath(m)}};u=this._getEditable(U,this._oParent.getBindingInfo("uomEditable"),"uomEditable");return{path:function(){var N=n.path(),a=u.path();if(N[0]===""&&a===""){return[""];}l=N.length;return N.concat(a);},formatter:function(v,p,a,c){var A=[],i,N,d,e=arguments.length;for(i=0;i<l;i++){A.push(arguments[i]);}N=n.formatter.apply(null,A);A=[];for(i=0;i<e;i++){A.push(arguments[i]);}for(i=0;i<l;i++){A.shift();}d=u.formatter.apply(null,A);if(!d&&!N){return 0;}return 1;}};};F.prototype.hasUomEditState=function(m){var p;if(m&&m.annotations&&m.annotations.uom){p=this._oParent.getControlProposal();if(p){if(p.getControlType()==="ObjectNumber"){return true;}if(p.getObjectStatus()){return true;}}return this._oParent.getProposedControl()==="ObjectNumber";}return false;};F.prototype.destroy=function(){if(this._oBinding){this._oBinding.destroy();}this._oAnnotation=null;this._oBinding=null;if(this._oParent&&!this._oParent._bInDestroy){for(var p in this._oStoredProperties){this._oParent.unbindProperty(p,true);if(this._oParent["set"+p.substring(0,1).toUpperCase()+p.substring(1)]){this._oParent["set"+p.substring(0,1).toUpperCase()+p.substring(1)](this._oStoredProperties[p]);}}if(this._oStoredProperties){if(!this._oStoredProperties.editable&&this._bEditableSet){this._oParent.unbindProperty("editable");}if(!this._oStoredProperties.visible&&this._bVisibleSet){this._oParent.unbindProperty("visible");}if(!this._oStoredProperties.mandatory&&this._bMandatorySet){this._oParent.unbindProperty("mandatory");}if(!this._oStoredProperties.uomEditable&&this._bUomEditableSet){this._oParent.unbindProperty("uomEditable");}}if(this._oStoredBindings){if(this._oStoredBindings.editable){if(this._oParent.isBound("editable")){this._oParent.unbindProperty("editable");}this._oParent.bindProperty("editable",this._oStoredBindings.editable);}if(this._oStoredBindings.visible){if(this._oParent.isBound("visible")){this._oParent.unbindProperty("visible");}this._oParent.bindProperty("visible",this._oStoredBindings.visible);}if(this._oStoredBindings.mandatory){if(this._oParent.isBound("mandatory")){this._oParent.unbindProperty("mandatory");}this._oParent.bindProperty("mandatory",this._oStoredBindings.mandatory);}if(this._oStoredBindings.uomEditable){if(this._oParent.isBound("uomEditable")){this._oParent.unbindProperty("uomEditable");}this._oParent.bindProperty("uomEditable",this._oStoredBindings.uomEditable);}}}this._oStoredProperties=null;this._oStoredBindings=null;this._oParent=null;this._oHelper=null;this._bIsDestroyed=true;this._bEditableSet=false;this._bMandatorySet=false;this._bVisibleSet=false;this._bUomEditableSet=false;};return F;},true);