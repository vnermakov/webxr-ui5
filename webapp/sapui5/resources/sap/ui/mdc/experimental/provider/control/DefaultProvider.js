/*!
 * SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["./AbstractKnowlegdeBase","sap/ui/mdc/experimental/provider/BaseControlProvider","./Utils"],function(A,B,U){"use strict";var D=B.extend("sap.ui.mdc.experimental.provider.control.DefaultProvider",{driveWithMetadata:function(c,a){var C=c.getMetadata()._sClassName;var s=a.getContext();this.provideProperty(c,"visible",a.visible,"oAdapter.visible");this.provideProperty(c,"tooltip",a.tooltip,"oAdapter.tooltip");switch(C){case"sap.m.CheckBox":this.provideProperty(c,"enabled",a.enabled,"oAdapter.enabled");this.provideProperty(c,"editable",a.enabled,"oAdapter.enabled");this.provideProperty(c,"selected",a.value,"oAdapter.value");this.provideProperty(c,"text",a.label,"Adapter.label");break;case"sap.m.ComboBox":case"sap.m.Select":if(s=='selected'){this._provideInputBase(c,a);this.provideProperty(c,"selectedKey",a.value,"oAdapter.value");}else if(s=='selection'){var k=a.keys;var K=Object.keys(k)[0];var o=k[K];var t=this;sap.ui.require(["sap/ui/core/Item"],function(I){var i=new I({key:o.value,text:o.describedBy.value});t.provideAggregation(c,"items",a.collection,i,true);});}break;case"sap.m.DatePicker":this._provideInputBase(c,a);break;case"sap.m.Image":this.provideProperty(c,"src",a.value,"oAdapter.value");break;case"sap.m.InputBase":this._provideInputBase(c,a);break;case"sap.m.Input":this._provideInputBase(c,a);var b=this.convertToInputType(a);this.provideProperty(c,"type",b,"");this.provideProperty(c,"maxLength",a.maxLength,"oAdapter.maxLength");break;case"sap.m.Label":this.provideProperty(c,"text",a.label);break;case"sap.m.Link":this.provideProperty(c,"enabled",a.enabled,"oAdapter.enabled");if(s=='text'){this.provideProperty(c,"text",a.value,"oAdapter.value");}else if(s=='href'){this.provideProperty(c,"href",a.value,"oAdapter.value");}break;case"sap.ui.mdc.base.FilterField":this.provideProperty(c,"required",a.required);this.provideProperty(c,"type",a.type);this.provideProperty(c,"fieldPath",a.path);this.provideAggregation(c,"conditions",a.conditions);this.providePrepareCloneFunction(c,"suggestion",a.suggestion.bind(a));break;case"sap.m.ObjectIdentifier":if(!s||s=='title'){this.provideProperty(c,"title",a.value,"oAdapter.value");this.provideProperty(c,"titleActive",a.enabled,"oAdapter.enabled");}else if(s=='text'){this.provideProperty(c,"text",a.value,"oAdapter.value");}break;case"sap.m.ObjectNumber":this.provideProperty(c,"number",a.value,"oAdapter.value");this.provideProperty(c,"unit",a.unit,"oAdapter.unit");break;case"sap.m.ObjectStatus":if(!s||s=='text'){this.provideProperty(c,"text",a.value,"oAdapter.value");}else if(s=='title'){this.provideProperty(c,"title",a.value,"oAdapter.value");}break;case"sap.m.ProgressIndicator":this.provideProperty(c,"enabled",a.enabled,"oAdapter.enabled");this.provideProperty(c,"percentValue",a.value,"oAdapter.value");break;case"sap.m.RatingIndicator":this.provideProperty(c,"enabled",a.enabled,"oAdapter.enabled");this.provideProperty(c,"value",a.value,"oAdapter.value");break;case"sap.m.Slider":this.provideProperty(c,"enabled",a.enabled,"oAdapter.enabled");this.provideProperty(c,"value",a.value,"oAdapter.value");break;case"sap.m.Text":case"sap.m.Title":this.provideProperty(c,"text",a.value,"oAdapter.value");break;case"sap.m.TextArea":this._provideInputBase(c,a);break;}},renderWithMetadata:function(n,c,a){var C=U.className(n);var i=n.getAttribute("id");n.removeAttribute("id");n.setAttribute("id",a.key+"---"+i);var l=n.getAttribute("labelFor");if(l){n.setAttribute("labelFor",a.key+"---"+l);}switch(C){case"sap.m.Label":this.provideAttribute(n,"text",a.label);break;case"sap.ui.mdc.base.FilterField":this.provideAttribute(n,"required",a.required);this.provideAttribute(n,"type",a.type);this.provideAttribute(n,"fieldPath",a.path);break;}},_provideInputBase:function(c,a){this.provideProperty(c,"value",a.value,"oAdapter.value");this.provideProperty(c,"editable",a.enabled,"oAdapter.enabled");this.provideProperty(c,"required",a.required,"oAdapter.required");var l=c.getLabels();for(var i=0;i<l.length;i++){if(this.canControlBeProvided(l[i],c)){this.getProvider(l[i]).driveWithMetadata(l[i],a);}}}});return D;});
