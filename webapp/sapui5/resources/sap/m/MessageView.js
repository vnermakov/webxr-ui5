/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/core/Control","sap/ui/core/CustomData","sap/ui/core/IconPool","sap/ui/core/HTML","sap/ui/core/Icon","./Button","./Toolbar","./ToolbarSpacer","./List","./MessageListItem","./library","./Text","./SegmentedButton","./Page","./NavContainer","./Link","./MessageItem","./GroupHeaderListItem","sap/ui/core/library","sap/ui/base/ManagedObject","./MessageViewRenderer","sap/ui/events/KeyCodes","sap/base/Log","sap/base/security/URLWhitelist","sap/ui/thirdparty/caja-html-sanitizer"],function(q,C,a,I,H,b,B,T,c,L,M,l,d,S,P,N,e,f,G,g,h,j,K,k,U){"use strict";var V=g.ValueState;var m=g.MessageType;var n=l.ListType;var o=C.extend("sap.m.MessageView",{metadata:{library:"sap.m",properties:{asyncDescriptionHandler:{type:"any",group:"Behavior",defaultValue:null},asyncURLHandler:{type:"any",group:"Behavior",defaultValue:null},groupItems:{type:"boolean",group:"Behavior",defaultValue:false},showDetailsPageHeader:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.MessageItem",multiple:true,singularName:"item"},headerButton:{type:"sap.m.Button",multiple:false},_navContainer:{type:"sap.m.NavContainer",multiple:false,visibility:"hidden"}},events:{afterOpen:{parameters:{openBy:{type:"sap.ui.core.Control"}}},itemSelect:{parameters:{item:{type:"sap.m.MessageItem"},messageTypeFilter:{type:"sap.ui.core.MessageType"}}},listSelect:{parameters:{messageTypeFilter:{type:"sap.ui.core.MessageType"}}},longtextLoaded:{},urlValidated:{},activeTitlePress:{parameters:{item:{type:"sap.m.MessageItem"}}}}}});var p="sapMMsgView";var r={back:I.getIconURI("nav-back"),close:I.getIconURI("decline"),information:I.getIconURI("message-information"),warning:I.getIconURI("message-warning"),error:I.getIconURI("message-error"),success:I.getIconURI("message-success")};var s=["all","error","warning","success","information"];var A=["asyncDescriptionHandler","asyncURLHandler"];var D={asyncDescriptionHandler:function(i){var t=i.item.getLongtextUrl();if(t){q.ajax({type:"GET",url:t,success:function(u){i.item.setDescription(u);i.promise.resolve();},error:function(){var E="A request has failed for long text data. URL: "+t;k.error(E);i.promise.reject(E);}});}}};o.setDefaultHandlers=function(i){A.forEach(function(F){if(i.hasOwnProperty(F)){D[F]=i[F];}});};o.prototype.init=function(){var t=this;this._bHasHeaderButton=false;this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._createNavigationPages();this._createLists();A.forEach(function(F){if(D.hasOwnProperty(F)){t.setProperty(F,D[F]);}});};o.prototype._afterNavigate=function(){setTimeout(this["_restoreFocus"].bind(this),0);};o.prototype._restoreFocus=function(){if(this._isListPage()&&this.getItems().length){this._oLists[this._sCurrentList||'all'].focus();}else if(this._oBackButton){this._oBackButton.focus();}};o.prototype.onBeforeRendering=function(){var i,t=this.getItems();this._clearLists();this._detailsPage.setShowHeader(this.getShowDetailsPageHeader());if(this.getGroupItems()){i=this._groupItems(t);this._fillGroupedLists(i);}else{this._fillLists(t);}var u=this.getHeaderButton();if(u){this._bHasHeaderButton=true;this._oListHeader.insertContent(u,2);}this._clearSegmentedButton();this._fillSegmentedButton();this._fnFilterList(this._getCurrentMessageTypeFilter()||"all");if(t.length===1&&this._oLists.all.getItems()[0].getType()===n.Navigation){this._fnHandleForwardNavigation(this._oLists.all.getItems()[0],"show");this._navContainer._pageStack[this._navContainer._pageStack.length-1].transition="slide";}this._makeAutomaticBinding();};o.prototype._fillGroupedLists=function(i){var t=Object.keys(i),u=t.indexOf(""),v,w;if(u!==-1){v=i[""];w=Object.keys(v);w.forEach(function(x){var y=v[x];this._fillLists(y);delete i[""];t.splice(u,1);},this);}t.forEach(function(x){this._fillListsWithGroups(x,i[x]);},this);};o.prototype._fillListsWithGroups=function(i,t){var u=Object.keys(t),v=new G({title:i}),w;this._oLists["all"].addAggregation("items",v,true);u.forEach(function(x){this._oLists[x.toLowerCase()].addAggregation("items",v.clone(),true);w=t[x];this._fillLists(w);},this);};o.prototype.exit=function(){if(this._oLists){this._destroyLists();}if(this._oMessageItemTemplate){this._oMessageItemTemplate.destroy();}this._oResourceBundle=null;this._oListHeader=null;this._oDetailsHeader=null;this._oSegmentedButton=null;this._oBackButton=null;this._navContainer=null;this._listPage=null;this._detailsPage=null;this._sCurrentList=null;};o.prototype._makeAutomaticBinding=function(){var i=this.getItems();if(!this.getBindingInfo("items")&&!i.length){this._bindToMessageModel();}};o.prototype._bindToMessageModel=function(){var t=this;this.setModel(sap.ui.getCore().getMessageManager().getMessageModel(),"message");this._oMessageItemTemplate=new f({type:"{message>type}",title:"{message>message}",description:"{message>description}",longtextUrl:"{message>longtextUrl}"});this.bindAggregation("items",{path:"message>/",template:t._oMessageItemTemplate});};o.prototype._groupItems=function(i){var t={},u,v;i.forEach(function(w){u=w.getGroupName();v=w.getType();t[u]=t[u]||{};var x=t[u];if(x[v]){x[v].push(w);}else{x[v]=[w];}});return t;};o.prototype._onkeypress=function(E){if(E.shiftKey&&E.keyCode==K.ENTER){this.navigateBack();}};o.prototype._getListHeader=function(){return this._oListHeader||this._createListHeader();};o.prototype._getDetailsHeader=function(){return this._oDetailsHeader||this._createDetailsHeader();};o.prototype._createListHeader=function(){var i=this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE");var t=this.getId()+"-CloseBtnDescr";var u=new H(t,{content:"<span id=\""+t+"\" style=\"display: none;\">"+i+"</span>"});var v=this._oResourceBundle.getText("MESSAGEPOPOVER_ARIA_HEADING");var w=this.getId()+"-HeadingDescr";var x=new H(w,{content:"<span id=\""+w+"\" style=\"display: none;\" role=\"heading\">"+v+"</span>"});this._oSegmentedButton=new S(this.getId()+"-segmented",{}).addStyleClass("sapMSegmentedButtonNoAutoWidth");this._oListHeader=new T({content:[this._oSegmentedButton,new c(),u,x]});return this._oListHeader;};o.prototype._createDetailsHeader=function(){var i=this._oResourceBundle.getText("MESSAGEPOPOVER_CLOSE");var t=this.getId()+"-CloseBtnDetDescr";var u=new H(t,{content:"<span id=\""+t+"\" style=\"display: none;\">"+i+"</span>"});var v=this._oResourceBundle.getText("MESSAGEPOPOVER_ARIA_BACK_BUTTON_TOOLTIP");var w=this._oResourceBundle.getText("MESSAGEPOPOVER_ARIA_BACK_BUTTON");var x=this.getId()+"-BackBtnDetDescr";var y=new H(x,{content:"<span id=\""+x+"\" style=\"display: none;\">"+w+"</span>"});this._oBackButton=new B({icon:r["back"],press:this.navigateBack.bind(this),ariaLabelledBy:y,tooltip:v}).addStyleClass(p+"BackBtn");this._oDetailsHeader=new T({content:[this._oBackButton,new c(),u,y]});return this._oDetailsHeader;};o.prototype._createNavigationPages=function(){this._listPage=new P(this.getId()+"listPage",{customHeader:this._getListHeader()});this._detailsPage=new P(this.getId()+"-detailsPage",{customHeader:this._getDetailsHeader()});this._detailsPage.addEventDelegate({onclick:function(E){var t=E.target;if(t.nodeName.toUpperCase()==="A"&&(t.className.indexOf("sapMMsgPopoverItemDisabledLink")!==-1||t.className.indexOf("sapMMsgPopoverItemPendingLink")!==-1)){E.preventDefault();}}});this._navContainer=new N(this.getId()+"-navContainer",{initialPage:this.getId()+"listPage",pages:[this._listPage,this._detailsPage],afterNavigate:this._afterNavigate.bind(this)});this.setAggregation("_navContainer",this._navContainer);return this;};o.prototype._createLists=function(){this._oLists={};s.forEach(function(i){this._oLists[i]=new L({itemPress:this._fnHandleItemPress.bind(this),visible:false});this._listPage.addAggregation("content",this._oLists[i],true);},this);return this;};o.prototype._clearLists=function(){s.forEach(function(i){if(this._oLists[i]){this._oLists[i].destroyAggregation("items",true);}},this);return this;};o.prototype._destroyLists=function(){s.forEach(function(i){this._oLists[i]=null;},this);this._oLists=null;};o.prototype._fillLists=function(i){i.forEach(function(t){var u=this._mapItemToListItem(t),v=this._mapItemToListItem(t);this._oLists["all"].addAggregation("items",u,true);this._oLists[t.getType().toLowerCase()].addAggregation("items",v,true);},this);};o.prototype._mapItemToListItem=function(i){if(!i){return null;}var t=i.getType(),u=this,v=this._getItemType(i),w=new M({title:h.escapeSettingsValue(i.getTitle()),description:h.escapeSettingsValue(i.getSubtitle()),counter:i.getCounter(),icon:this._mapIcon(t),infoState:this._mapInfoState(t),info:"\r",type:v,messageType:i.getType(),activeTitle:i.getActiveTitle(),activeTitlePress:function(){u.fireActiveTitlePress({item:i});}}).addStyleClass(p+"Item").addStyleClass(p+"Item"+t).toggleStyleClass(p+"ItemActive",i.getActiveTitle());if(v!==n.Navigation){w.addEventDelegate({onAfterRendering:function(){var x=w.getActiveTitle()?".sapMSLITitleDiv a":".sapMSLITitleDiv > div",y=w.getDomRef().querySelector(x);if(y.offsetWidth<y.scrollWidth){w.setType(n.Navigation);if(this.getItems().length===1){this._fnHandleForwardNavigation(w,"show");}}}},this);}w._oMessageItem=i;return w;};o.prototype._mapInfoState=function(t){if(!t){return null;}switch(t){case m.Warning:return V.Warning;case m.Error:return V.Error;case m.Success:return V.Success;case m.Information:case m.None:return V.None;default:k.warning("The provided MessageType is not mapped to a specific ValueState",t);return null;}};o.prototype._mapIcon=function(i){if(!i){return null;}return r[i.toLowerCase()];};o.prototype._getItemType=function(i){return(i.getDescription()||i.getMarkupDescription()||i.getLongtextUrl())?n.Navigation:n.Inactive;};o.prototype._clearSegmentedButton=function(){if(this._oSegmentedButton){this._oSegmentedButton.destroyAggregation("buttons",true);}return this;};o.prototype._fillSegmentedButton=function(){var t=this;var i=function(w){return function(){t._fnFilterList(w);};};s.forEach(function(w){var x=this._oLists[w],y=w=="all"?"MESSAGEPOPOVER_ALL":"MESSAGEVIEW_BUTTON_TOOLTIP_"+w.toUpperCase(),z=x.getItems().filter(function(F){return(F instanceof M);}).length,E;if(z>0){E=new B(this.getId()+"-"+w,{text:w=="all"?this._oResourceBundle.getText(y):z,tooltip:this._oResourceBundle.getText(y),icon:r[w],press:i(w)}).addStyleClass(p+"Btn"+w.charAt(0).toUpperCase()+w.slice(1));this._oSegmentedButton.addButton(E,true);}},this);var u=this._oSegmentedButton.getButtons().length>2;this._oSegmentedButton.setVisible(u);if(!u){this._oSegmentedButton.setSelectedButton(this._oSegmentedButton.getButtons()[0]);this._fnFilterList('all');}var v=u||this._bHasHeaderButton;this._listPage.setShowHeader(v);return this;};o.prototype._setIcon=function(i,t){this._previousIconTypeClass=p+"DescIcon"+i.getType();this._oMessageIcon=new b({src:t.getIcon()}).addStyleClass(p+"DescIcon").addStyleClass(this._previousIconTypeClass);this._detailsPage.addContent(this._oMessageIcon);};o.prototype._setTitle=function(i,t){var u=i.getActiveTitle(),v,w=this,x=h.escapeSettingsValue(i.getTitle()),y=this.getId()+"MessageTitleText";if(u){v=new e(y,{text:x,ariaDescribedBy:t.getId()+"-link",press:function(){w.fireActiveTitlePress({item:i});}});}else{v=new d(y,{text:x});}v.addStyleClass("sapMMsgViewTitleText");this._detailsPage.addAggregation("content",v);};o.prototype._setDescription=function(i){var t=i.getLink();this._oLastSelectedItem=i;if(i.getMarkupDescription()){this._oMessageDescriptionText=new H(this.getId()+"MarkupDescription",{content:"<div class='sapMMsgViewDescriptionText'>"+h.escapeSettingsValue(i.getDescription())+"</div>"});}else{this._oMessageDescriptionText=new d(this.getId()+"MessageDescriptionText",{text:h.escapeSettingsValue(i.getDescription())}).addStyleClass("sapMMsgViewDescriptionText");}this._detailsPage.addContent(this._oMessageDescriptionText);if(t){var u=this._createLinkCopy(t);this._detailsPage.addContent(u);u.addStyleClass("sapMMsgViewDescriptionLink");}};o.prototype._createLinkCopy=function(i){var t,u=i.clone("","",{cloneChildren:false,cloneBindings:false}),v=i.getCustomData()||[];t=Object.keys(i.getMetadata().getProperties());t.forEach(function(w){u.setProperty(w,i.getProperty(w));});u.destroyCustomData();v.forEach(function(w){var x=new a({key:w.getKey(),value:w.getValue()});u.addCustomData(x);});return u;};o.prototype._iNextValidationTaskId=0;o.prototype._validateURL=function(u){if(U.validate(u)){return u;}k.warning("You have entered invalid URL");return"";};o.prototype._queueValidation=function(i){var t=this.getAsyncURLHandler();var v=++this._iNextValidationTaskId;var u={};var w=new window.Promise(function(x,y){u.resolve=x;u.reject=y;var z={url:i,id:v,promise:u};t(z);});w.id=v;return w;};o.prototype._getTagPolicy=function(){var t=this,i;var u=html.makeTagPolicy(this._validateURL());return function customTagPolicy(v,w){var x,y=false;if(v.toUpperCase()==="A"){for(i=0;i<w.length;){if(w[i]==="href"){y=true;x=w[i+1];w.splice(0,2);continue;}i+=2;}}w=u(v,w);if(y&&typeof t.getAsyncURLHandler()==="function"){w=w||[];var z="sapMMsgViewItemDisabledLink sapMMsgViewItemPendingLink";var E=w.indexOf("class");if(E>-1){w[E+1]+=z;}else{w.unshift(z);w.unshift("class");}var F=w.indexOf("id");if(F>-1){w.splice(F+1,1);w.splice(F,1);}var J=t._queueValidation(x);w.push("href");w.push(x);w.push("target");w.push("_blank");w.push("id");w.push("sap-ui-"+t.getId()+"-link-under-validation-"+J.id);J.then(function(O){var $=q(document.getElementById("sap-ui-"+t.getId()+"-link-under-validation-"+O.id));if(O.allowed){k.info("Allow link "+x);}else{k.info("Disallow link "+x);}$.removeClass("sapMMsgViewItemPendingLink");$.toggleClass("sapMMsgViewItemDisabledLink",!O.allowed);t.fireUrlValidated();}).catch(function(){k.warning("Async URL validation could not be performed.");});}return w;};};o.prototype._sanitizeDescription=function(i){var t=i.getDescription();if(i.getMarkupDescription()){var u=this._getTagPolicy();t=html.sanitizeWithPolicy(t,u);}i.setDescription(t);this._setDescription(i);};o.prototype._fnHandleForwardNavigation=function(i,t){var u=i._oMessageItem,v=this._detailsPage.getContent()||[],w=this.getAsyncDescriptionHandler();this._previousIconTypeClass=this._previousIconTypeClass||"";this.fireItemSelect({item:u,messageTypeFilter:this._getCurrentMessageTypeFilter()});this._clearDetailsPage.call(this,v);if(typeof w==="function"&&!!u.getLongtextUrl()){u.setMarkupDescription(true);var x={};var y=new window.Promise(function(E,F){x.resolve=E;x.reject=F;});var z=function(){this._detailsPage.setBusy(false);this._navigateToDetails.call(this,u,i,t,true);}.bind(this);y.then(z).catch(function(){k.warning("Async description loading could not be performed.");z();});this._navContainer.to(this._detailsPage);this._detailsPage.setBusy(true);w({promise:x,item:u});}else{this._navigateToDetails.call(this,u,i,t,false);}this._listPage.$().attr("aria-hidden","true");};o.prototype._fnHandleItemPress=function(E){this._fnHandleForwardNavigation(E.getParameter("listItem"),"slide");};o.prototype._navigateToDetails=function(i,t,u,v){this._setTitle(i,t);this._sanitizeDescription(i);this._setIcon(i,t);this._detailsPage.rerender();this.fireLongtextLoaded();if(!v){this._navContainer.to(this._detailsPage,u);}};o.prototype._clearDetailsPage=function(i){i.forEach(function(t){t.destroy();},this);};o.prototype.navigateBack=function(){this._listPage.$().removeAttr("aria-hidden");this._navContainer.back();};o.prototype._fnFilterList=function(i){s.forEach(function(t){if(t!=i&&this._oLists[t].getVisible()){this._oLists[t].setVisible(false);}},this);this._sCurrentList=i;this._oLists[i].setVisible(true);this.fireListSelect({messageTypeFilter:this._getCurrentMessageTypeFilter()});};o.prototype._getCurrentMessageTypeFilter=function(){return this._sCurrentList=="all"?"":this._sCurrentList;};o.prototype._isListPage=function(){return this._navContainer.getCurrentPage()==this._listPage;};return o;});
