sap.ui.define(["sap/suite/ui/generic/template/changeHandler/util/ChangeHandlerUtils"],function(U){"use strict";var a={createCustomChanges:function(c){var C=[];C.push(c);return{"customChanges":C};},createCustomAnnotationTermChange:function(t,n,o,A){var c,C;if(n&&!jQuery.isEmptyObject(n)){C=this.createAnnotationChangeContent(n,t,A);}if(o&&!jQuery.isEmptyObject(o)){c=this.createAnnotationChangeContent(o,t,A);}return{changeType:"annotationTermChange",content:{newValue:C,oldValue:c}};},createAnnotationChangeContent:function(A,t,s){var c={};var o={};o[s]=A;c[t]=o;return c;},updateAnnotationProperty:function(A,p){var o=jQuery.extend({},A),P=o[p.propertyName];if(p.changeType==="expression"&&!P){return null;}if(o[p.propertyType]){o[p.propertyType]=p.propertyValue;}else{o[p.propertyName]=this._createProperty(p.propertyType,p.propertyValue);}return o;},_createProperty:function(p,P){var o={};if(p==="EnumType"){p="EnumMember";}o[p]=P;return o;},getExistingAnnotationsOfEntityType:function(c,A){var C=U.getComponent(c);var e=U.getODataEntityType(C);return e[A]?e[A]:[];}};return a;});