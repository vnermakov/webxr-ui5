/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/core/library","sap/ui/core/theming/Parameters","sap/ui/model/ChangeReason","./TableGrouping","./TableColumnUtils","./TableMenuUtils","./TableBindingUtils","./library","sap/base/Log","sap/ui/thirdparty/jquery"],function(B,C,R,c,T,a,b,d,e,f,l,L,q){"use strict";var S=l.SelectionBehavior;var g=l.SelectionMode;var M=c.MessageType;var r;var h=null;var j={DATACELL:1,COLUMNHEADER:2,ROWHEADER:4,ROWACTION:8,COLUMNROWHEADER:16};j.ANYCONTENTCELL=j.ROWHEADER|j.DATACELL|j.ROWACTION;j.ANYCOLUMNHEADER=j.COLUMNHEADER|j.COLUMNROWHEADER;j.ANYROWHEADER=j.ROWHEADER|j.COLUMNROWHEADER;j.ANY=j.ANYCONTENTCELL|j.ANYCOLUMNHEADER;var m={sapUiSizeCozy:48,sapUiSizeCompact:32,sapUiSizeCondensed:24,undefined:32};var k=1;var n=1;var D={sapUiSizeCozy:m.sapUiSizeCozy+n,sapUiSizeCompact:m.sapUiSizeCompact+n,sapUiSizeCondensed:m.sapUiSizeCondensed+n,undefined:m.undefined+n};var t={sapUiTableActionNavigationIcon:'navigation-right-arrow',sapUiTableActionDeleteIcon:'sys-cancel'};var o={Render:"Render",VerticalScroll:"VerticalScroll",FirstVisibleRowChange:"FirstVisibleRowChange",Unbind:"Unbind",Animation:"Animation",Resize:"Resize",Unknown:"Unknown"};for(var p in a){o[p]=a[p];}var I=":sapTabbable, .sapUiTableTreeIcon:not(.sapUiTableTreeIconLeaf)";var s={Grouping:b,Column:d,Menu:e,Binding:f,CELLTYPE:j,BaseSize:m,BaseBorderWidth:k,RowHorizontalFrameSize:n,DefaultRowHeight:D,RowsUpdateReason:o,INTERACTIVE_ELEMENT_SELECTORS:I,ThemeParameters:t,hasRowHeader:function(i){return(i.getSelectionMode()!==g.None&&i.getSelectionBehavior()!==S.RowOnly)||b.isGroupMode(i);},hasSelectAll:function(i){var u=i?i.getSelectionMode():g.None;return u===g.MultiToggle&&i.getEnableSelectAll();},hasRowHighlights:function(i){if(!i){return false;}var u=i.getRowSettingsTemplate();if(!u){return false;}var H=u.getHighlight();return u.isBound("highlight")||(H!=null&&H!==M.None);},getRowActionCount:function(i){var u=i.getRowActionTemplate();return u?u._getCount():0;},hasRowActions:function(i){var u=i.getRowActionTemplate();return u!=null&&(u.isBound("visible")||u.getVisible())&&s.getRowActionCount(i)>0;},isRowSelectionAllowed:function(i){return i.getSelectionMode()!==g.None&&(i.getSelectionBehavior()===S.Row||i.getSelectionBehavior()===S.RowOnly);},isRowSelectorSelectionAllowed:function(i){return i.getSelectionMode()!==g.None&&s.hasRowHeader(i);},areAllRowsSelected:function(i){if(!i){return false;}var u=i._getSelectableRowCount();return u>0&&u===i._getSelectedIndicesCount();},isNoDataVisible:function(i){if(!i.getShowNoData()){return false;}return!s.hasData(i);},hasData:function(i){var u=i.getBinding("rows");var v=i._getTotalRowCount();var H=v>0;if(u&&u.providesGrandTotal){var w=u.providesGrandTotal()&&u.hasTotaledMeasures();H=(w&&v>1)||(!w&&v>0);}return H;},isBusyIndicatorVisible:function(i){if(!i||!i.getDomRef()){return false;}return i.getDomRef().querySelector(".sapUiTableCnt > .sapUiLocalBusyIndicator")!=null;},hasPendingRequests:function(i){if(!i){return false;}if(s.canUsePendingRequestsCounter(i)){return i._iPendingRequests>0;}else{return i._bPendingRequest;}},canUsePendingRequestsCounter:function(i){var u=i?i.getBinding("rows"):null;if(s.isA(u,"sap.ui.model.analytics.AnalyticalBinding")){return u.bUseBatchRequests;}else if(s.isA(u,"sap.ui.model.TreeBinding")){return false;}return true;},isA:function(O,v){return B.isA(O,v);},toggleRowSelection:function(i,v,u,w){if(!i||!i.getBinding("rows")||i.getSelectionMode()===g.None||v==null){return false;}function x(A){if(!i._isRowSelectable(A)){return false;}i._iSourceRowIndex=A;var E=false;if(w){E=w(A,u);}else if(i.isIndexSelected(A)){if(u!==true){E=true;i.removeSelectionInterval(A,A);}}else if(u!==false){E=true;i.addSelectionInterval(A,A);}delete i._iSourceRowIndex;return E;}if(typeof v==="number"){if(v<0||v>=i._getTotalRowCount()){return false;}return x(v);}else{var $=q(v);var y=s.getCellInfo($[0]);var z=s.isRowSelectionAllowed(i);if(!s.Grouping.isInGroupingRow($[0])&&((y.isOfType(s.CELLTYPE.DATACELL|s.CELLTYPE.ROWACTION)&&z)||(y.isOfType(s.CELLTYPE.ROWHEADER)&&s.isRowSelectorSelectionAllowed(i)))){var A;if(y.isOfType(s.CELLTYPE.DATACELL)){A=i.getRows()[parseInt($.closest("tr",i.getDomRef()).attr("data-sap-ui-rowindex"))].getIndex();}else{A=i.getRows()[parseInt($.attr("data-sap-ui-rowindex"))].getIndex();}return x(A);}return false;}},getNoDataText:function(i){var N=i.getNoData();if(N instanceof C){return null;}else if(typeof N==="string"||i.getNoData()instanceof String){return N;}else{return s.getResourceText("TBL_NO_DATA");}},getVisibleColumnCount:function(i){return i._getVisibleColumns().length;},getHeaderRowCount:function(u){if(u._iHeaderRowCount===undefined){if(!u.getColumnHeaderVisible()){u._iHeaderRowCount=0;}else{var H=1;var v=u.getColumns();for(var i=0;i<v.length;i++){if(v[i].shouldRender()){H=Math.max(H,v[i].getMultiLabels().length);}}u._iHeaderRowCount=H;}}return u._iHeaderRowCount;},isVariableRowHeightEnabled:function(i){return i&&i._bVariableRowHeightEnabled&&i.getFixedRowCount()<=0&&i.getFixedBottomRowCount()<=0;},getTotalRowCount:function(i,u){var v=i._getTotalRowCount();if(u){v=Math.max(v,i.getVisibleRowCount());}return v;},getNonEmptyVisibleRowCount:function(i){return Math.min(i.getVisibleRowCount(),i._getTotalRowCount());},getFocusedItemInfo:function(i){var u=i._getItemNavigation();if(!u){return null;}return{cell:u.getFocusedIndex(),columnCount:u.iColumns,cellInRow:u.getFocusedIndex()%u.iColumns,row:Math.floor(u.getFocusedIndex()/u.iColumns),cellCount:u.getItemDomRefs().length,domRef:u.getFocusedDomRef()};},getRowIndexOfFocusedCell:function(i){var u=s.getFocusedItemInfo(i);return u.row-s.getHeaderRowCount(i);},isFixedColumn:function(i,u){return u<i.getComputedFixedColumnCount();},hasFixedColumns:function(i){return i.getComputedFixedColumnCount()>0;},focusItem:function(i,u,E){var v=i._getItemNavigation();if(v){v.focusItem(u,E);}},getCellInfo:function(i){var u;var $=q(i);var v;var w;var x;var y;var z;u={type:0,cell:null,rowIndex:null,columnIndex:null,columnSpan:null};if($.hasClass("sapUiTableDataCell")){v=$.attr("data-sap-ui-colid");w=sap.ui.getCore().byId(v);u.type=s.CELLTYPE.DATACELL;u.rowIndex=parseInt($.parent().attr("data-sap-ui-rowindex"));u.columnIndex=w.getIndex();u.columnSpan=1;}else if($.hasClass("sapUiTableHeaderDataCell")){x=/_([\d]+)/;v=$.attr("id");y=x.exec(v);z=y&&y[1]!=null?parseInt(y[1]):0;u.type=s.CELLTYPE.COLUMNHEADER;u.rowIndex=z;u.columnIndex=parseInt($.attr("data-sap-ui-colindex"));u.columnSpan=parseInt($.attr("colspan")||1);}else if($.hasClass("sapUiTableRowSelectionCell")){u.type=s.CELLTYPE.ROWHEADER;u.rowIndex=parseInt($.attr("data-sap-ui-rowindex"));u.columnIndex=-1;u.columnSpan=1;}else if($.hasClass("sapUiTableRowActionCell")){u.type=s.CELLTYPE.ROWACTION;u.rowIndex=parseInt($.attr("data-sap-ui-rowindex"));u.columnIndex=-2;u.columnSpan=1;}else if($.hasClass("sapUiTableRowSelectionHeaderCell")){u.type=s.CELLTYPE.COLUMNROWHEADER;u.columnIndex=-1;u.columnSpan=1;}if(u.type!==0){u.cell=$;}u.isOfType=function(A){if(A==null){return false;}return(this.type&A)>0;};return u;},getRowColCell:function(u,v,w,x){var y=v>=0&&v<u.getRows().length?u.getRows()[v]:null;var z=x?u.getColumns():u._getVisibleColumns();var A=w>=0&&w<z.length?z[w]:null;var E=null;if(y&&A){if(x){if(A.shouldRender()){var V=u._getVisibleColumns();for(var i=0;i<V.length;i++){if(V[i]===A){E=y.getCells()[i];break;}}}}else{E=y.getCells()[w];}if(E&&E.data("sap-ui-colid")!=A.getId()){var F=y.getCells();for(var i=0;i<F.length;i++){if(F[i].data("sap-ui-colid")===A.getId()){E=F[i];break;}}}}return{row:y,column:A,cell:E};},getCell:function(i,E){if(!i||!E){return null;}var $=q(E);var u=i.getDomRef();var v=$.closest(".sapUiTableCell",u);if(v.length>0){return v;}return null;},getParentCell:function(i,E){var $=q(E);var u=s.getCell(i,E);if(!u||u[0]===$[0]){return null;}else{return u;}},registerResizeHandler:function(i,u,H,v){var w;if(typeof u=="string"){w=i.getDomRef(u);}else{L.error("sIdSuffix must be a string",i);return;}if(typeof H!=="function"){L.error("fnHandler must be a function",i);return;}s.deregisterResizeHandler(i,u);if(!i._mResizeHandlerIds){i._mResizeHandlerIds={};}if(v&&w){w=w.parentNode;}if(w){i._mResizeHandlerIds[u]=R.register(w,H);}return i._mResizeHandlerIds[u];},deregisterResizeHandler:function(u,v){var w;if(!u._mResizeHandlerIds){return;}if(typeof v=="string"){w=[v];}else if(v===undefined){w=[];for(var K in u._mResizeHandlerIds){if(typeof K=="string"&&u._mResizeHandlerIds.hasOwnProperty(K)){w.push(K);}}}else if(Array.isArray(v)){w=v;}for(var i=0;i<w.length;i++){var x=w[i];if(u._mResizeHandlerIds[x]){R.deregister(u._mResizeHandlerIds[x]);u._mResizeHandlerIds[x]=undefined;}}},isFirstScrollableRow:function(i,u){if(isNaN(u)){var $=q(u);u=parseInt($.add($.parent()).filter("[data-sap-ui-rowindex]").attr("data-sap-ui-rowindex"));}var F=i.getFixedRowCount()||0;return u==F;},isLastScrollableRow:function(i,u){if(isNaN(u)){var $=q(u);u=parseInt($.add($.parent()).filter("[data-sap-ui-rowindex]").attr("data-sap-ui-rowindex"));}var F=i.getFixedBottomRowCount()||0;return u==i.getVisibleRowCount()-F-1;},getContentDensity:function(u){var v;var w=["sapUiSizeCondensed","sapUiSizeCompact","sapUiSizeCozy"];var G=function(F,O){if(!O[F]){return;}for(var i=0;i<w.length;i++){if(O[F](w[i])){return w[i];}}};var $=u.$();if($.length>0){v=G("hasClass",$);}else{v=G("hasStyleClass",u);}if(v){return v;}var P=null;var x=u.getParent();if(x){do{v=G("hasStyleClass",x);if(v){return v;}if(x.getDomRef){P=x.getDomRef();}else if(x.getRootNode){P=x.getRootNode();}if(!P&&x.getParent){x=x.getParent();}else{x=null;}}while(x&&!P);}$=q(P||document.body);v=G("hasClass",$.closest("."+w.join(",.")));return v;},isVariableWidth:function(w){return!w||w=="auto"||w.toString().match(/%$/);},getFirstFixedBottomRowIndex:function(i){var F=i.getFixedBottomRowCount();var u=i.getBinding("rows");var v=-1;if(u&&F>0){var V=i.getVisibleRowCount();var w=i.getFirstVisibleRow();var x=i._getTotalRowCount();if(x>=V){v=V-F;}else{var y=x-F-w;if(y>=0&&(w+y)<x){v=y;}}}return v;},getResourceBundle:function(O){O=q.extend({async:false,reload:false},O);if(r&&O.reload!==true){if(O.async===true){return Promise.resolve(r);}else{return r;}}var v=sap.ui.getCore().getLibraryResourceBundle("sap.ui.table",O.async===true);if(v instanceof Promise){v=v.then(function(i){r=i;return r;});}else{r=v;}return v;},getResourceText:function(K,v){return r?r.getText(K,v):"";},dynamicCall:function(O,v,i){var u=O instanceof Function?O():O;if(!u||!v){return undefined;}i=i||u;if(v instanceof Function){v.call(i,u);return undefined;}else{var P;var w=[];for(var F in v){if(u[F]instanceof Function){P=v[F];w.push(u[F].apply(i,P));}else{w.push(undefined);}}if(w.length===1){return w[0];}else{return w;}}},throttle:function(i,O){O=Object.assign({wait:0,leading:true},O);O.maxWait=O.wait;O.trailing=true;O.requestAnimationFrame=false;return s.debounce(i,O);},debounce:function(i,O){O=Object.assign({wait:0,maxWait:null,leading:false,asyncLeading:false,trailing:true,requestAnimationFrame:false},O);var u=null;var v=null;var w=null;var x=O.maxWait!=null;O.wait=Math.max(0,O.wait);O.maxWait=x?Math.max(O.maxWait,O.wait):O.maxWait;function y(J,K,N,P){u=P===true?null:Date.now();if(K==null){return;}if(N===true){var Q=Promise.resolve().then(function(){if(!Q.canceled){i.apply(J,K);}w=null;});Q.cancel=function(){Q.canceled=true;};w=Q;}else{i.apply(J,K);}}function z(J,K){A();function _(V){V=V!==false;if(V){F();}if(O.trailing){y(J,K,null,V);}}if(O.requestAnimationFrame){v=window.requestAnimationFrame(function(){_();});}else{var N=Date.now();var P=u==null?0:N-u;var Q=Math.max(0,x?Math.min(O.maxWait-P,O.wait):O.wait);var U=Q<O.wait;v=setTimeout(function(){if(U){var V=Math.max(0,(Date.now()-N)-Q);var W=O.wait-Q;if(V>W){_();}else{v=setTimeout(F,W-V);_(false);}}else{_();}},Q);}}function A(){if(O.requestAnimationFrame){window.cancelAnimationFrame(v);}else{clearTimeout(v);}v=null;}function E(){if(w){w.cancel();w=null;}}function F(){A();E();u=null;}function G(){return v!=null;}var H=function(){if(!G()&&!O.leading){y();}if(G()||!O.leading){z(this,arguments);}else if(O.asyncLeading){y(this,arguments,true);z();}else{z();y(this,arguments);}};H.cancel=F;H.pending=G;return H;},getInteractiveElements:function(i){if(!i){return null;}var $=q(i);var u=s.getCellInfo($);if(u.isOfType(j.ANY)){var v=$.find(I);if(v.length>0){return v;}}return null;},convertCSSSizeToPixel:function(i,w){var P;if(typeof i!=="string"){return null;}if(i.endsWith("px")){P=parseInt(i);}else if(i.endsWith("em")||i.endsWith("rem")){P=Math.ceil(parseFloat(i)*s.getBaseFontSize());}else{return null;}if(w){return P+"px";}else{return P;}},getBaseFontSize:function(){if(h==null){var i=document.documentElement;if(i){h=parseInt(window.getComputedStyle(i).fontSize);}}return h==null?16:h;},readThemeParameters:function(){function i(u){return s.convertCSSSizeToPixel(T.get(u));}m.undefined=i("_sap_ui_table_BaseSize");m.sapUiSizeCozy=i("_sap_ui_table_BaseSizeCozy");m.sapUiSizeCompact=i("_sap_ui_table_BaseSizeCompact");m.sapUiSizeCondensed=i("_sap_ui_table_BaseSizeCondensed");k=i("_sap_ui_table_BaseBorderWidth");n=k;D.undefined=m.undefined+n;D.sapUiSizeCozy=m.sapUiSizeCozy+n;D.sapUiSizeCompact=m.sapUiSizeCompact+n;D.sapUiSizeCondensed=m.sapUiSizeCondensed+n;t.sapUiTableActionNavigationIcon=T.get("_sap_ui_table_RowActionNavigationIcon");t.sapUiTableActionDeleteIcon=T.get("_sap_ui_table_DeleteIcon");}};b.TableUtils=s;d.TableUtils=s;e.TableUtils=s;f.TableUtils=s;return s;},true);