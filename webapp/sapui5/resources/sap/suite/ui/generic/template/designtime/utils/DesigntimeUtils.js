sap.ui.define(["jquery.sap.global","sap/suite/ui/generic/template/changeHandler/util/AnnotationChangeUtilsV2","sap/suite/ui/generic/template/changeHandler/util/ChangeHandlerUtils","sap/suite/ui/generic/template/js/AnnotationHelper"],function(q,A,C,a){"use strict";var D={},b="com.sap.vocabularies.UI.v1.DataPoint",c="com.sap.vocabularies.UI.v1.DataField",d="com.sap.vocabularies.UI.v1.Chart",F="com.sap.vocabularies.UI.v1.FieldGroup",L="com.sap.vocabularies.UI.v1.LineItem",e="com.sap.vocabularies.Communication.v1.Contact",f="com.sap.vocabularies.UI.v1.DataFieldWithUrl",g="com.sap.vocabularies.UI.v1.DataFieldForAnnotation",h="com.sap.vocabularies.UI.v1.DataFieldForAction",I="com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation",l="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation",M="com.sap.vocabularies.UI.v1.ChartMeasureRoleType",m="com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath",n="Datafield",o="ConnectedFields",p="Chart",r="RatingIndicator",s="ProgressIndicator",t="Contact",u="DataFieldWithIntentBasedNavigation",v="DataFieldForIntentBasedNavigation",w="DataFieldWithNavigationPath",x="DataFieldForAction",y="DatafieldWithUrl",z="ToolbarButton",B="com.sap.vocabularies.UI.v1.ChartType/Area",E="com.sap.vocabularies.UI.v1.ChartType/Donut",G="com.sap.vocabularies.UI.v1.ChartType/Bullet";D.modifyDataPointForChart=function(T,i,N,j){var k={},H={},O;var J=N.DataPointAnnotationPath&&N.DataPointAnnotationPath.AnnotationPath;if(J){k=N.DataPoint;if(k){var Q=J.split("#").reverse()[0];var K=Q?b+"#"+Q:b;O=i[K];H=A.createCustomAnnotationTermChange(T,k,O,K);j.push(H);}}};D.createNewContact=function(){return{"RecordType":"com.sap.vocabularies.Communication.v1.ContactType"};};D.createNewChart=function(){return{"ChartType":{"EnumMember":"com.sap.vocabularies.UI.v1.ChartType/Area"},"RecordType":"com.sap.vocabularies.UI.v1.ChartDefinitionType"};};D.createNewDataPointForColumn=function(i,Q,T){var V="com.sap.vocabularies.UI.v1.VisualizationType/"+Q,R=C.getLineItemRecordForColumn(i);var N={TargetValue:{String:T},Visualization:{EnumMember:V},RecordType:b+"Type",Title:{String:Q}};if(R&&R.Value&&R.Value.Path&&(R.RecordType===c||R.RecordType===I||R.RecordType===f)){N.Value={Path:R.Value.Path};}return N;};D.createNewColumn=function(R,O){var P,i={Label:{},Criticality:{},CriticalityRepresentation:{},IconUrl:{}},j={};j[c]=q.extend({},i,{Value:{Path:""}});j[f]=q.extend({},i,{Value:{Path:""},Url:{String:""}});j[m]=q.extend({},i,{Value:{Path:""},Target:{NavigationPropertyPath:""}});j[g]=q.extend({},i,{Target:{AnnotationPath:""}});j[h]=q.extend({},i,{Inline:{Bool:"true"},Determining:{Bool:"false"},Action:{String:""},InvocationGrouping:{}});j[I]=q.extend({},i,{Action:{String:""},Value:{Path:""},SemanticObject:{String:""}});j[l]=q.extend({},i,{Inline:{Bool:"true"},Determining:{Bool:"false"},Action:{String:""},Value:{Path:""},SemanticObject:{String:""}});var N={"com.sap.vocabularies.UI.v1.Importance":{"EnumMember":"com.sap.vocabularies.UI.v1.ImportanceType/High"},"RecordType":R};q.extend(true,N,j[R]);for(P in N){if(P!=="RecordType"&&O&&O[P]){q.extend(N[P],O[P]);}if(q.isEmptyObject(N[P])){delete N[P];}}return N;};D.getColumnTypeValues=function(i){var V={Datafield:{displayName:"Data Field"},DatafieldWithUrl:{displayName:"Data Field with URL"},Contact:{displayName:"Contact"},DataFieldForAction:{displayName:"Inline Action"},DataFieldWithIntentBasedNavigation:{displayName:"Navigation Field"},DataFieldWithNavigationPath:{displayName:"Data Field with Nav Path"},DataFieldForIntentBasedNavigation:{displayName:"Navigation Button"},ConnectedFields:{displayName:"Connected Fields"},RatingIndicator:{displayName:"Rating Indicator"},ProgressIndicator:{displayName:"Progress Indicator"},Chart:{displayName:"Chart"}};return V;};D._getRecordType=function(i,R){var j;if(R){switch(R.RecordType){case h:if(R.Inline&&R.Determining!==true){j=x;}else{j=z;}break;case g:var k=R.Target.AnnotationPath;if(k){if(k.indexOf(b)>=0){var H=C.getEntityTypeFromAnnotationPath(i,k);var Q=k.search("#");var J=k.substring(Q);var K=J?b+J:b;var N=H[K];if(N){if(N.Visualization.EnumMember==="com.sap.vocabularies.UI.v1.VisualizationType/Rating"){j=r;}if(N.Visualization.EnumMember==="com.sap.vocabularies.UI.v1.VisualizationType/Progress"){j=s;}}}else if(R.Target.AnnotationPath.indexOf(e)>=0){j=t;}else if(R.Target.AnnotationPath.indexOf(d)>=0){j=p;}else if(R.Target.AnnotationPath.indexOf(F)>=0){j=o;}}break;case I:j=u;break;case l:if(R.Inline&&R.Determining!==true){j=v;}else{j=z;}break;case c:j=n;break;case f:j=y;break;case m:j=w;break;default:break;}}return j;};D.getColumnType=function(i){var R=C.getLineItemRecordForColumn(i),j;if(R){j=D._getRecordType(i,R);}return j;};D._setP13nData=function(i,N){var P=i.data("p13nData");if(N.RecordType==="com.sap.vocabularies.UI.v1.DataFieldWithUrl"){P.columnKey=N.Value&&N.Value.Path;}else{P.columnKey=a.createP13NColumnKey(N);}if(!P.columnKey){P.columnKey="";}if(N.Value&&N.Value.Path){P.leadingProperty=N.Value.Path;}else{P.leadingProperty="";}i.data("p13nData",P);};D.fixQualifierForNewColumn=function(i,T,k){var H=C.getLineItems(i),J=C.getLineItemRecordIndex(i,H),K=k,N,O=-1,P,Q,R,S,U;if(H){for(var j=0;j<H.length;j++){if(j===J){continue;}Q=-1;U=H[j].Target&&H[j].Target.AnnotationPath;if(U&&U.indexOf(T)!==-1){R=U.split("/");S=R[R.length-1].substr(1);if(!k&&S.indexOf("#")===-1){Q=0;}else if(!k&&S.indexOf("#")>-1){Q=S.split("#")[1];}else if(S.indexOf(k)>-1){Q=S.split(k)[1];}P=parseInt(Q,10);if(isNaN(P)){P=0;}O=Math.max(P,O);}}}if(O!==-1){O++;K=k?k+O.toString():O.toString();}N=K?T+"#"+K:T;return N;};D.setColumnType=function(i,N){var O=D.getColumnType(i);if(O===N){return;}var j=[],k={},H={},R,J,K={},T=C.getEntityType(C.getComponent(i));switch(N){case n:R=c;break;case y:R=f;break;case x:R=h;break;case u:R=I;break;case v:R=l;break;case w:R=m;break;case o:J=D.fixQualifierForNewColumn(i,F,"DTAGroup",H);var P=C.createNewFieldGroup();k=A.createCustomAnnotationTermChange(T,P,{},J);j.push(k);R=g;break;case p:J=D.fixQualifierForNewColumn(i,d,undefined,H);var Q=D.createNewChart();k=A.createCustomAnnotationTermChange(T,Q,{},J);j.push(k);R=g;break;case t:J=D.fixQualifierForNewColumn(i,e,undefined,H);var S=D.createNewContact();k=A.createCustomAnnotationTermChange(T,S,{},J);j.push(k);R=g;break;case r:J=D.fixQualifierForNewColumn(i,b,"Rating",H);K=D.createNewDataPointForColumn(i,"Rating","4");k=A.createCustomAnnotationTermChange(T,K,{},J);j.push(k);R=g;break;case s:J=D.fixQualifierForNewColumn(i,b,"Progress",H);K=D.createNewDataPointForColumn(i,"Progress","100");k=A.createCustomAnnotationTermChange(T,K,{},J);j.push(k);R=g;break;default:break;}if(!R){return;}var U=C.getLineItems(i);var V=C.getLineItemRecordIndex(i,U);if(V===-1){throw"invalid index for old column";}var W=U[V];var X=[];X.push.apply(X,U);var Y=D.createNewColumn(R,W);switch(N){case r:case s:case p:case o:Y.Target={AnnotationPath:"@"+J};break;case t:Y.Target={AnnotationPath:"@"+J};if(!Y.Label){Y.Label={"String":"New Contact"};}break;default:break;}D._setP13nData(i,Y);X.splice(V,1,Y);k=A.createCustomAnnotationTermChange(T,X,U,L);j.push(k);return j;};D.getChartFromColumn=function(i){var R=C.getLineItemRecordForColumn(i),j;if(R&&R.RecordType===g&&R.Target&&R.Target.AnnotationPath.indexOf("Chart")>=0){var Q;if(R.Target.AnnotationPath.indexOf("#")!==-1){Q=R.Target.AnnotationPath.split("#").reverse()[0];}var k=Q?d+"#"+Q:d,H=C.getEntityTypeFromAnnotationPath(i,R.Target.AnnotationPath);if(H){j={chartID:k,entityType:H};}}return j;};D.getChartFromFacet=function(i){var T=C.getTemplatingInfo(i);var j=T&&T.value;if(j){var k=C.getEntityTypeFromAnnotationPath(i,j);var Q=j.search("#");var H=j.substring(Q+1);var J=H?d+"#"+H:d;var K={chartID:J,entityType:k};return K;}};D.getChartFromParent=function(i){var j;if(i&&i.getMetadata){if(i.getMetadata().getElementName()==="sap.m.Column"){j=D.getChartFromColumn(i);}else{j=D.getChartFromFacet(i);}}return j;};D.getChartType=function(i){var j=D.getChartFromParent(i),k;if(!j||!j.entityType[j.chartID]||!j.entityType[j.chartID].ChartType){return k;}switch(j.entityType[j.chartID].ChartType.EnumMember){case B:k="Area";break;case G:k="Bullet";break;case E:k="Donut";break;default:break;}return k;};D.getMeasureDefinition=function(i){var j={Measure:{displayName:"Measure",type:"Edm.PropertyPath",namespace:"com.sap.vocabularies.UI.v1",annotation:"Chart",nullable:"false"},Role:{displayName:"Role",type:"EnumType",namespace:"com.sap.vocabularies.UI.v1",annotation:"Chart",nullable:"false",possibleValues:{Axis1:{displayName:"Axis 1"},Axis2:{displayName:"Axis 2"},Axis3:{displayName:"Axis 3"}}},DataPointAnnotationPath:{displayName:"Data Point Reference",type:"Edm.AnnotationPath",namespace:"com.sap.vocabularies.UI.v1",annotation:"Chart",nullable:"false"}};var k=D.getChartFromParent(i),H=k&&k.entityType[k.chartID];if(!k||!H||!H.ChartType){return j;}switch(H.ChartType.EnumMember){case B:j.DataPoint={displayName:"Data Point Properties",type:"ComplexType",namespace:"com.sap.vocabularies.UI.v1",annotation:"DataPoint",whiteList:{properties:["Value","TargetValue","CriticalityCalculation"],expressionTypes:{Value:["Path"],TargetValue:["Path","String","Int","Decimal"]},CriticalityCalculation:{properties:["ImprovementDirection","DeviationRangeLowValue","DeviationRangeHighValue","ToleranceRangeLowValue","ToleranceRangeHighValue"]}}};break;case G:j.DataPoint={displayName:"Data Point Properties",type:"ComplexType",namespace:"com.sap.vocabularies.UI.v1",annotation:"DataPoint",whiteList:{properties:["Value","TargetValue","ForecastValue","MinimumValue","MaximumValue","Criticality","CriticalityCalculation"],expressionTypes:{Value:["Path"],TargetValue:["Path","String","Int","Decimal"],ForecastValue:["Path","String","Int","Decimal"]},CriticalityCalculation:{properties:["ImprovementDirection","DeviationRangeLowValue","DeviationRangeHighValue","ToleranceRangeLowValue","ToleranceRangeHighValue"]}}};break;case E:j.DataPoint={displayName:"Data Point Properties",type:"ComplexType",namespace:"com.sap.vocabularies.UI.v1",annotation:"DataPoint",whiteList:{properties:["Value","TargetValue","Criticality","CriticalityCalculation"],expressionTypes:{Value:["Path"],TargetValue:["Path","String","Int","Decimal"]},CriticalityCalculation:{properties:["ImprovementDirection","DeviationRangeLowValue","DeviationRangeHighValue","ToleranceRangeLowValue","ToleranceRangeHighValue"]}}};break;default:break;}return j;};D.getMeasures=function(k){var H={},J=[],K,Q,N,O,P,R={},S,T=D.getChartFromParent(k),U=T&&T.entityType[T.chartID];if(U&&U.Measures){var V=q.extend(true,{},V,U);for(var i=0;i<V.Measures.length;i++){K=V.Measures[i].PropertyPath;N=false;if(V.MeasureAttributes){for(var j=0;j<V.MeasureAttributes.length;j++){O=V.MeasureAttributes[j];R={};if(O.Measure&&O.Measure.PropertyPath===K){N=true;if(O.DataPoint&&O.DataPoint.AnnotationPath){Q=O.DataPoint.AnnotationPath.split("#").reverse()[0];P=Q?b+"#"+Q:b;S=T.entityType[P];if(S){q.extend(true,R,S);}}H={Measure:{PropertyPath:O.Measure&&O.Measure.PropertyPath},DataPointAnnotationPath:{AnnotationPath:O.DataPoint&&O.DataPoint.AnnotationPath},DataPoint:R};if(O.Role&&O.Role.EnumMember){switch(O.Role.EnumMember){case"com.sap.vocabularies.UI.v1.ChartMeasureRoleType/Axis1":H.Role={EnumMember:"Axis1"};break;case"com.sap.vocabularies.UI.v1.ChartMeasureRoleType/Axis2":H.Role={EnumMember:"Axis2"};break;case"com.sap.vocabularies.UI.v1.ChartMeasureRoleType/Axis3":H.Role={EnumMember:"Axis3"};break;default:break;}}J.push(H);break;}}}if(!N){H={Measure:V.Measures[i]};J.push(H);}}}return J;};D.setMeasures=function(H,N,J){var i,j,k,K,O,P,Q,R=[],S,T={},U=D.getChartFromColumn(H),V=U&&U.entityType&&U.entityType[U.chartID];if(!V||q.isEmptyObject(V)||!U){return R;}var W=q.extend(true,{},V),X=U.entityType.namespace+"."+U.entityType.name;if(W.Measures){for(i=W.Measures.length-1;i>=0;i--){O=false;K=W.Measures[i].PropertyPath;for(j=0;j<N.length;j++){if(N[j].Measure&&N[j].Measure.PropertyPath===K){O=true;break;}}if(!O){W.Measures.splice(i,1);for(j=W.MeasureAttributes.length-1;j>=0;j--){S=W.MeasureAttributes[j].Measure;if(S&&S.PropertyPath===K){W.MeasureAttributes.splice(j,1);if(!K){J.noRefreshOnChange=true;}break;}}}}}for(i=0;i<N.length;i++){P=N[i];if(q.isEmptyObject(P)){continue;}O=false;if(W.MeasureAttributes){for(j=0;j<W.MeasureAttributes.length;j++){S=W.MeasureAttributes[j].Measure;if(P.Measure&&S&&S.PropertyPath===P.Measure.PropertyPath){O=true;break;}}}if(P.DataPointAnnotationPath&&P.DataPointAnnotationPath.AnnotationPath){Q=P.DataPointAnnotationPath.AnnotationPath;}else if(P.Measure&&P.Measure.PropertyPath){Q="@"+b+"#"+P.Measure.PropertyPath;P.DataPointAnnotationPath={AnnotationPath:Q};}else{Q="";}T={Measure:{PropertyPath:P.Measure.PropertyPath},DataPoint:{AnnotationPath:Q},RecordType:"com.sap.vocabularies.UI.v1.ChartMeasureAttributeType"};if(P.Role){switch(P.Role.EnumMember){case"Axis2":T.Role={EnumMember:M+"/Axis2"};break;case"Axis3":T.Role={EnumMember:M+"/Axis3"};break;default:T.Role={EnumMember:M+"/Axis1"};break;}}else{var Y="Axis1";if(V.MeasureAttributes){var Z=["Axis1","Axis2","Axis3"];Y="Axis3";for(k=0;k<V.MeasureAttributes.length;k++){var $=V.MeasureAttributes[k].Role.EnumMember.split("/").reverse()[0];var _=Z.indexOf($);if(_!==-1){Z.splice(_,1);}}if(Z.length>0){Y=Z[0];}}P.Role={EnumMember:Y};T.Role={EnumMember:M+"/"+Y};}if(!O){if(!W.Measures){W.Measures=[];}W.Measures.push(P.Measure);if(!W.MeasureAttributes){W.MeasureAttributes=[];}W.MeasureAttributes.push(T);}else{W.MeasureAttributes[j]=T;}if(!q.isEmptyObject(P.DataPoint)){D.modifyDataPointForChart(X,U.entityType,P,R);}if(P.Measure.PropertyPath===""){J.noRefreshOnChange=true;}}var a1=A.createCustomAnnotationTermChange(X,W,V,U.chartID);R.push(a1);return R;};D.addSettingsHandler=function(T,P,j,k){return new Promise(function(H,J){var K=sap.ui.fl.Utils.getAppComponentForControl(T).getModel().getMetaModel();var N=K.getODataEntityContainer();var O=N.functionImport;var Q={};var R=new sap.ui.model.json.JSONModel(O);var S=sap.ui.xmlfragment("sap.suite.ui.generic.template.changeHandler.customSelectDialog.SelectDialog",this);S.attachConfirm(function(Y){var Z=Y.getParameter("selectedContexts");var $=[],_;for(var i=0;i<Z.length;i++){_=N.namespace+"."+N.name+"/"+Z[i].getObject().name;$[i]={selectorControl:T,changeSpecificData:{changeType:k,content:{newFunctionImport:_}}};}H($);});S.attachSearch(function(Y){var Z=Y.getParameter("value");var $=new sap.ui.model.Filter("name",sap.ui.model.FilterOperator.Contains,Z);var _=new sap.ui.model.Filter({filters:[$,Q],and:true});var U=Y.getSource().getBinding("items");U.filter(_);});S.setModel(R);var U=S.getBinding("items");var V=[];for(var i in j){var W=C.getCustomDataObject(j[i]);if(W&&W.Action){var X=W.Action.substring(W.Action.lastIndexOf("/")+1);V.push(new sap.ui.model.Filter("name",sap.ui.model.FilterOperator.NE,X));}}Q=new sap.ui.model.Filter({filters:V,and:true});U.filter(Q);S.addStyleClass(P.styleClass);S.open();});};return D;});
