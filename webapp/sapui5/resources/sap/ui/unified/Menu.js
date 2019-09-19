/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Element','sap/ui/core/Control','sap/ui/Device','sap/ui/core/Popup','./MenuItemBase','./library','sap/ui/core/library','sap/ui/unified/MenuRenderer',"sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/events/ControlEvents","sap/ui/events/PseudoEvents","sap/ui/events/checkMouseEnterOrLeave"],function(E,C,D,P,M,l,c,a,b,q,K,L,d,f,g){"use strict";var h=P.Dock;var O=c.OpenState;var j=C.extend("sap.ui.unified.Menu",{metadata:{interfaces:["sap.ui.core.IContextMenu"],library:"sap.ui.unified",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},ariaDescription:{type:"string",group:"Accessibility",defaultValue:null},maxVisibleItems:{type:"int",group:"Behavior",defaultValue:0},pageSize:{type:"int",group:"Behavior",defaultValue:5}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.unified.MenuItemBase",multiple:true,singularName:"item"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{itemSelect:{parameters:{item:{type:"sap.ui.unified.MenuItemBase"}}}}}});(function(w){j.prototype.bCozySupported=true;j._DELAY_SUBMENU_TIMER=300;j._DELAY_SUBMENU_TIMER_EXT=400;j.prototype.init=function(){var t=this;this.bOpen=false;this.oOpenedSubMenu=null;this.oHoveredItem=null;this.oPopup=null;this._bOpenedAsContextMenu=false;this.fAnyEventHandlerProxy=q.proxy(function(e){var r=this.getRootMenu();if(r!=this||!this.bOpen||!this.getDomRef()||(e.type!="mousedown"&&e.type!="touchstart")){return;}r.handleOuterEvent(this.getId(),e);},this);this.fOrientationChangeHandler=function(){t.close();};this.bUseTopStyle=false;};j.prototype._setCustomEnhanceAccStateFunction=function(e){this._fnCustomEnhanceAccStateFunction=e;};j.prototype.enhanceAccessibilityState=function(e,A){var i=typeof this._fnCustomEnhanceAccStateFunction==="function";return i?this._fnCustomEnhanceAccStateFunction(e,A):A;};j.prototype.exit=function(){if(this.oPopup){this.oPopup.detachClosed(this._menuClosed,this);this.oPopup.destroy();delete this.oPopup;}d.unbindAnyEvent(this.fAnyEventHandlerProxy);if(this._bOrientationChangeBound){q(w).unbind("orientationchange",this.fOrientationChangeHandler);this._bOrientationChangeBound=false;}this._resetDelayedRerenderItems();this._detachResizeHandler();};j.prototype.invalidate=function(o){if(o instanceof M&&this.getDomRef()){this._delayedRerenderItems();}else{C.prototype.invalidate.apply(this,arguments);}};j.prototype.onBeforeRendering=function(){this._resetDelayedRerenderItems();};j.prototype.onAfterRendering=function(){if(this.$().parent().attr("id")!="sap-ui-static"){L.error("sap.ui.unified.Menu: The Menu is popup based and must not be rendered directly as content of the page.");this.close();this.$().remove();}var I=this.getItems();for(var i=0;i<I.length;i++){if(I[i].onAfterRendering&&I[i].getDomRef()){I[i].onAfterRendering();}}if(this.oHoveredItem){this.oHoveredItem.hover(true,this);}m(this);};j.prototype.onThemeChanged=function(){if(this.getDomRef()&&this.getPopup().getOpenState()===O.OPEN){m(this);this.getPopup()._applyPosition(this.getPopup()._oLastPosition);}};j.prototype.setPageSize=function(S){return this.setProperty("pageSize",S,true);};j.prototype.addItem=function(i){this.addAggregation("items",i,!!this.getDomRef());this._delayedRerenderItems();return this;};j.prototype.insertItem=function(i,e){this.insertAggregation("items",i,e,!!this.getDomRef());this._delayedRerenderItems();return this;};j.prototype.removeItem=function(i){this.removeAggregation("items",i,!!this.getDomRef());this._delayedRerenderItems();return this;};j.prototype.removeAllItems=function(){var r=this.removeAllAggregation("items",!!this.getDomRef());this._delayedRerenderItems();return r;};j.prototype.destroyItems=function(){this.destroyAggregation("items",!!this.getDomRef());this._delayedRerenderItems();return this;};j.prototype._delayedRerenderItems=function(){if(!this.getDomRef()){return;}this._resetDelayedRerenderItems();this._discardOpenSubMenuDelayed();this._itemRerenderTimer=setTimeout(function(){var o=this.getDomRef();if(o){var r=sap.ui.getCore().createRenderManager();a.renderItems(r,this);r.flush(o);r.destroy();this.onAfterRendering();this.getPopup()._applyPosition(this.getPopup()._oLastPosition);}}.bind(this),0);};j.prototype._resetDelayedRerenderItems=function(){if(this._itemRerenderTimer){clearTimeout(this._itemRerenderTimer);delete this._itemRerenderTimer;}};j.prototype._detachResizeHandler=function(){if(this._hasResizeListener){D.resize.detachHandler(this._handleResizeChange,this);this._hasResizeListener=false;}};j.prototype.open=function(W,o,e,i,p,r,t){if(this.bOpen){return;}s(this,true);this.oOpenerRef=o;this.bIgnoreOpenerDOMRef=false;this.getPopup().open(0,e,i,p,r||"0 0",t||"_sapUiCommonsMenuFlip _sapUiCommonsMenuFlip",function(){var v=this.getPopup()._getOfDom(p);if(!v||!q(v).is(":visible")){this.close();}}.bind(this));this.bOpen=true;D.resize.attachHandler(this._handleResizeChange,this);this._hasResizeListener=true;var u=this.getDomRef();q(u).attr("tabIndex",0).focus();if(W){this.setHoveredItem(this.getNextSelectableItem(-1));}d.bindAnyEvent(this.fAnyEventHandlerProxy);if(D.support.orientation&&this.getRootMenu()===this){q(w).bind("orientationchange",this.fOrientationChangeHandler);this._bOrientationChangeBound=true;}};j.prototype._handleResizeChange=function(){this.getPopup()._applyPosition(this.getPopup()._oLastPosition);};j.prototype.openAsContextMenu=function(e,o){var i,p,r,t,u;o=o instanceof E?o.getDomRef():o;if(e instanceof q.Event){u=q(o).offset();i=e.pageX-u.left;p=e.pageY-u.top;this._iX=e.clientX;this._iY=e.clientY;}else{i=e.offsetX||0;p=e.offsetY||0;this._iX=e.left||0;this._iY=e.top||0;}r=sap.ui.getCore().getConfiguration().getRTL();t=h;if(r){i=o.clientWidth-i;}this._bOpenedAsContextMenu=true;this.open(true,o,t.BeginTop,t.BeginTop,o,i+" "+p,'fit');};j.prototype._handleOpened=function(){var $,W,i,e,r,B,R,o,p,t;if(!this._bOpenedAsContextMenu){return;}$=this.$();W=q(w);i=this._iX;e=this._iY;r=W.scrollLeft()+W.width();B=W.scrollTop()+W.height();R=sap.ui.getCore().getConfiguration().getRTL();o=false;p=$.width();t=$.height();if(e+t>B){e=e-t;o=true;}if(R){if((r-i)+p>r){i=r-(i+p);o=true;}else{i=r-i;o=true;}}else{if(i+p>r){i=i-p;o=true;}}this._bOpenedAsContextMenu=false;o&&this.oPopup.setPosition("begin top","begin top",W,i+" "+e,"flip");};j.prototype.close=function(){if(!this.bOpen||j._dbg){return;}this._discardOpenSubMenuDelayed();s(this,false);delete this._bFixed;d.unbindAnyEvent(this.fAnyEventHandlerProxy);if(this._bOrientationChangeBound){q(w).unbind("orientationchange",this.fOrientationChangeHandler);this._bOrientationChangeBound=false;}this.bOpen=false;this.closeSubmenu();this.setHoveredItem();q(this.getDomRef()).attr("tabIndex",-1);this.getPopup().close(0);this._detachResizeHandler();this._resetDelayedRerenderItems();this.$().remove();this.bOutput=false;if(this.isSubMenu()){this.getParent().getParent().oOpenedSubMenu=null;}};j.prototype._menuClosed=function(){if(this.oOpenerRef){if(!this.bIgnoreOpenerDOMRef){try{this.oOpenerRef.focus();}catch(e){L.warning("Menu.close cannot restore the focus on opener "+this.oOpenerRef+", "+e);}}this.oOpenerRef=undefined;}};j.prototype.onclick=function(e){this.selectItem(this.getItemByDomRef(e.target),false,!!(e.metaKey||e.ctrlKey));e.preventDefault();e.stopPropagation();};j.prototype.onsapnext=function(e){if(e.keyCode!=K.ARROW_DOWN){if(this.oHoveredItem&&this.oHoveredItem.getSubmenu()&&this.checkEnabled(this.oHoveredItem)){this.openSubmenu(this.oHoveredItem,true);}return;}var i=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1;this.setHoveredItem(this.getNextSelectableItem(i));e.preventDefault();e.stopPropagation();};j.prototype.onsapnextmodifiers=j.prototype.onsapnext;j.prototype.onsapprevious=function(e){if(e.keyCode!=K.ARROW_UP){if(this.isSubMenu()){this.close();}e.preventDefault();e.stopPropagation();return;}var i=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1;this.setHoveredItem(this.getPreviousSelectableItem(i));e.preventDefault();e.stopPropagation();};j.prototype.onsappreviousmodifiers=j.prototype.onsapprevious;j.prototype.onsaphome=function(e){this.setHoveredItem(this.getNextSelectableItem(-1));e.preventDefault();e.stopPropagation();};j.prototype.onsapend=function(e){this.setHoveredItem(this.getPreviousSelectableItem(this.getItems().length));e.preventDefault();e.stopPropagation();};j.prototype.onsappagedown=function(e){if(this.getPageSize()<1){this.onsapend(e);return;}var i=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1;i+=this.getPageSize();if(i>=this.getItems().length){this.onsapend(e);return;}this.setHoveredItem(this.getNextSelectableItem(i-1));e.preventDefault();e.stopPropagation();};j.prototype.onsappageup=function(e){if(this.getPageSize()<1){this.onsaphome(e);return;}var i=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1;i-=this.getPageSize();if(i<0){this.onsaphome(e);return;}this.setHoveredItem(this.getPreviousSelectableItem(i+1));e.preventDefault();e.stopPropagation();};j.prototype.onsapselect=function(e){this._sapSelectOnKeyDown=true;e.preventDefault();e.stopPropagation();};j.prototype.onkeyup=function(e){if(this.oHoveredItem&&(q(e.target).prop("tagName")!="INPUT")){var o=this.oHoveredItem.getDomRef();q(o).attr("tabIndex",0).focus();}if(!this._sapSelectOnKeyDown){return;}else{this._sapSelectOnKeyDown=false;}if(!f.events.sapselect.fnCheck(e)){return;}this.selectItem(this.oHoveredItem,true,false);e.preventDefault();e.stopPropagation();};j.prototype.onsapbackspace=function(e){if(q(e.target).prop("tagName")!="INPUT"){e.preventDefault();}};j.prototype.onsapbackspacemodifiers=j.prototype.onsapbackspace;j.prototype.onsapescape=function(e){this.close();e.preventDefault();e.stopPropagation();};j.prototype.onsaptabnext=j.prototype.onsapescape;j.prototype.onsaptabprevious=j.prototype.onsapescape;j.prototype.onmouseover=function(e){if(!D.system.desktop){return;}var i=this.getItemByDomRef(e.target);if(!this.bOpen||!i){return;}if(this.oOpenedSubMenu&&b(this.oOpenedSubMenu.getDomRef(),e.target)){return;}this.setHoveredItem(i);if(g(e,this.getDomRef())){if(!D.browser.msie&&!D.browser.edge){this.getDomRef().focus();}}if(D.browser.msie){this.getDomRef().focus();}this._openSubMenuDelayed(i);};j.prototype._openSubMenuDelayed=function(i){if(!i){return;}this._discardOpenSubMenuDelayed();this._delayedSubMenuTimer=setTimeout(function(){this.closeSubmenu();if(!i.getSubmenu()||!this.checkEnabled(i)){return;}this.setHoveredItem(i);this.openSubmenu(i,false,true);}.bind(this),i.getSubmenu()&&this.checkEnabled(i)?j._DELAY_SUBMENU_TIMER:j._DELAY_SUBMENU_TIMER_EXT);};j.prototype._discardOpenSubMenuDelayed=function(i){if(this._delayedSubMenuTimer){clearTimeout(this._delayedSubMenuTimer);this._delayedSubMenuTimer=null;}};j.prototype.onmouseout=function(e){if(!D.system.desktop){return;}if(g(e,this.getDomRef())){if(!this.oOpenedSubMenu||!(this.oOpenedSubMenu.getParent()===this.oHoveredItem)){this.setHoveredItem(null);}this._discardOpenSubMenuDelayed();}};j.prototype.onsapfocusleave=function(e){if(this.oOpenedSubMenu||!this.bOpen){return;}this.getRootMenu().handleOuterEvent(this.getId(),e);};j.prototype.handleOuterEvent=function(o,e){var i=false,t=D.support.touch||D.system.combi;this.bIgnoreOpenerDOMRef=false;if(e.type=="mousedown"||e.type=="touchstart"){if(t&&(e.isMarked("delayedMouseEvent")||e.isMarked("cancelAutoClose"))){return;}var p=this;while(p&&!i){if(b(p.getDomRef(),e.target)){i=true;}p=p.oOpenedSubMenu;}}else if(e.type=="sapfocusleave"){if(t){return;}if(e.relatedControlId){var p=this;while(p&&!i){if((p.oOpenedSubMenu&&p.oOpenedSubMenu.getId()==e.relatedControlId)||b(p.getDomRef(),q(document.getElementById(e.relatedControlId)).get(0))){i=true;}p=p.oOpenedSubMenu;}}if(!i){this.bIgnoreOpenerDOMRef=true;}}if(!i){this.close();}};j.prototype.getItemByDomRef=function(o){var I=this.getItems(),e=I.length;for(var i=0;i<e;i++){var p=I[i],r=p.getDomRef();if(b(r,o)){return p;}}return null;};j.prototype.selectItem=function(i,W,e){if(!i||!(i instanceof M&&this.checkEnabled(i))){return;}var S=i.getSubmenu();if(!S){this.getRootMenu().close();}else{if(!D.system.desktop&&this.oOpenedSubMenu===S){this.closeSubmenu();}else{this.openSubmenu(i,W);}}i.fireSelect({item:i,ctrlKey:e});this.getRootMenu().fireItemSelect({item:i});};j.prototype.isSubMenu=function(){return this.getParent()&&this.getParent().getParent&&this.getParent().getParent()instanceof j;};j.prototype.getRootMenu=function(){var t=this;while(t.isSubMenu()){t=t.getParent().getParent();}return t;};j.prototype.getMenuLevel=function(){var i=1;var t=this;while(t.isSubMenu()){t=t.getParent().getParent();i++;}return i;};j.prototype.getPopup=function(){if(!this.oPopup){this.oPopup=new P(this,false,true,false);this.oPopup.setDurations(0,0);this.oPopup.attachClosed(this._menuClosed,this);this.oPopup.attachOpened(this._handleOpened,this);}return this.oPopup;};j.prototype.setHoveredItem=function(i){if(this.oHoveredItem){this.oHoveredItem.hover(false,this);}if(!i){this.oHoveredItem=null;q(this.getDomRef()).removeAttr("aria-activedescendant");return;}this.oHoveredItem=i;i.hover(true,this);this._setActiveDescendant(this.oHoveredItem);this.scrollToItem(this.oHoveredItem);};j.prototype._setActiveDescendant=function(i){if(sap.ui.getCore().getConfiguration().getAccessibility()&&i){var t=this;t.$().removeAttr("aria-activedescendant");setTimeout(function(){if(t.oHoveredItem===i){t.$().attr("aria-activedescendant",t.oHoveredItem.getId());}},10);}};j.prototype.openSubmenu=function(i,W,e){var S=i.getSubmenu();if(!S){return;}if(this.oOpenedSubMenu&&this.oOpenedSubMenu!==S){this.closeSubmenu();}if(this.oOpenedSubMenu){this.oOpenedSubMenu._bFixed=(e&&this.oOpenedSubMenu._bFixed)||(!e&&!this.oOpenedSubMenu._bFixed);this.oOpenedSubMenu._bringToFront();}else{this.oOpenedSubMenu=S;var o=P.Dock;S.open(W,this,o.BeginTop,o.EndTop,i,"0 0");}};j.prototype.closeSubmenu=function(i,I){if(this.oOpenedSubMenu){if(i&&this.oOpenedSubMenu._bFixed){return;}if(I){this.oOpenedSubMenu.bIgnoreOpenerDOMRef=true;}this.oOpenedSubMenu.close();this.oOpenedSubMenu=null;}};j.prototype.scrollToItem=function(i){var o=this.getDomRef(),I=i?i.getDomRef():null;if(!I||!o){return;}var e=o.scrollTop,p=I.offsetTop,r=q(o).height(),t=q(I).height();if(e>p){o.scrollTop=p;}else if((p+t)>(e+r)){o.scrollTop=Math.ceil(p+t-r);}};j.prototype._bringToFront=function(){q(document.getElementById(this.getPopup().getId())).mousedown();};j.prototype.checkEnabled=function(i){return i&&i.getEnabled()&&this.getEnabled();};j.prototype.getNextSelectableItem=function(I){var o=null;var e=this.getItems();for(var i=I+1;i<e.length;i++){if(e[i].getVisible()&&this.checkEnabled(e[i])){o=e[i];break;}}if(!o){for(var i=0;i<=I;i++){if(e[i].getVisible()&&this.checkEnabled(e[i])){o=e[i];break;}}}return o;};j.prototype.getPreviousSelectableItem=function(I){var o=null;var e=this.getItems();for(var i=I-1;i>=0;i--){if(e[i].getVisible()&&this.checkEnabled(e[i])){o=e[i];break;}}if(!o){for(var i=e.length-1;i>=I;i--){if(e[i].getVisible()&&this.checkEnabled(e[i])){o=e[i];break;}}}return o;};j.prototype.setRootMenuTopStyle=function(u){this.getRootMenu().bUseTopStyle=u;j.rerenderMenu(this.getRootMenu());};j.rerenderMenu=function(o){var I=o.getItems();for(var i=0;i<I.length;i++){var S=I[i].getSubmenu();if(S){j.rerenderMenu(S);}}o.invalidate();o.rerender();};j.prototype.focus=function(){if(this.bOpen){C.prototype.focus.apply(this,arguments);this._setActiveDescendant(this.oHoveredItem);}};j.prototype.isCozy=function(){if(!this.bCozySupported){return false;}if(this.hasStyleClass("sapUiSizeCozy")){return true;}if(k(this.oOpenerRef)){return true;}if(k(this.getParent())){return true;}return false;};function k(r){if(!r){return false;}r=r.$?r.$():q(r);return r.closest(".sapUiSizeCompact,.sapUiSizeCondensed,.sapUiSizeCozy").hasClass("sapUiSizeCozy");}function s(o,e){var p=o.getParent();if(p&&p instanceof M){p.onSubmenuToggle(e);}}function m(o){var e=o.getMaxVisibleItems(),p=document.documentElement.clientHeight-10,$=o.$();if(e>0){var I=o.getItems();for(var i=0;i<I.length;i++){if(I[i].getDomRef()){p=Math.min(p,I[i].$().outerHeight(true)*e);break;}}}if($.outerHeight(true)>p){$.css("max-height",p+"px").toggleClass("sapUiMnuScroll",true);}else{$.css("max-height","").toggleClass("sapUiMnuScroll",false);}}
/*!
	 * The following code is taken from
	 * jQuery UI 1.10.3 - 2013-11-18
	 * jquery.ui.position.js
	 *
	 * http://jqueryui.com
	 * Copyright 2013 jQuery Foundation and other contributors; Licensed MIT
	 */
function _(e){var i=q(w);e.within={element:i,isWindow:true,offset:i.offset()||{left:0,top:0},scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.width(),height:i.height()};e.collisionPosition={marginLeft:0,marginTop:0};return e;}var n={fit:{left:function(p,e){var i=e.within,o=i.isWindow?i.scrollLeft:i.offset.left,r=i.width,t=p.left-e.collisionPosition.marginLeft,u=o-t,v=t+e.collisionWidth-r-o,x;if(e.collisionWidth>r){if(u>0&&v<=0){x=p.left+u+e.collisionWidth-r-o;p.left+=u-x;}else if(v>0&&u<=0){p.left=o;}else{if(u>v){p.left=o+r-e.collisionWidth;}else{p.left=o;}}}else if(u>0){p.left+=u;}else if(v>0){p.left-=v;}else{p.left=Math.max(p.left-t,p.left);}},top:function(p,e){var i=e.within,o=i.isWindow?i.scrollTop:i.offset.top,r=e.within.height,t=p.top-e.collisionPosition.marginTop,u=o-t,v=t+e.collisionHeight-r-o,x;if(e.collisionHeight>r){if(u>0&&v<=0){x=p.top+u+e.collisionHeight-r-o;p.top+=u-x;}else if(v>0&&u<=0){p.top=o;}else{if(u>v){p.top=o+r-e.collisionHeight;}else{p.top=o;}}}else if(u>0){p.top+=u;}else if(v>0){p.top-=v;}else{p.top=Math.max(p.top-t,p.top);}}},flip:{left:function(p,e){var i=e.within,o=i.offset.left+i.scrollLeft,r=i.width,t=i.isWindow?i.scrollLeft:i.offset.left,u=p.left-e.collisionPosition.marginLeft,v=u-t,x=u+e.collisionWidth-r-t,y=e.my[0]==="left"?-e.elemWidth:e.my[0]==="right"?e.elemWidth:0,z=e.at[0]==="left"?e.targetWidth:e.at[0]==="right"?-e.targetWidth:0,A=-2*e.offset[0],B,F;if(v<0){B=p.left+y+z+A+e.collisionWidth-r-o;if(B<0||B<Math.abs(v)){p.left+=y+z+A;}}else if(x>0){F=p.left-e.collisionPosition.marginLeft+y+z+A-t;if(F>0||Math.abs(F)<x){p.left+=y+z+A;}}},top:function(p,e){var i=e.within,o=i.offset.top+i.scrollTop,r=i.height,t=i.isWindow?i.scrollTop:i.offset.top,u=p.top-e.collisionPosition.marginTop,v=u-t,x=u+e.collisionHeight-r-t,y=e.my[1]==="top",z=y?-e.elemHeight:e.my[1]==="bottom"?e.elemHeight:0,A=e.at[1]==="top"?e.targetHeight:e.at[1]==="bottom"?-e.targetHeight:0,B=-2*e.offset[1],F,G;if(v<0){G=p.top+z+A+B+e.collisionHeight-r-o;if((p.top+z+A+B)>v&&(G<0||G<Math.abs(v))){p.top+=z+A+B;}}else if(x>0){F=p.top-e.collisionPosition.marginTop+z+A+B-t;if((p.top+z+A+B)>x&&(F>0||Math.abs(F)<x)){p.top+=z+A+B;}}}},flipfit:{left:function(){n.flip.left.apply(this,arguments);n.fit.left.apply(this,arguments);},top:function(){n.flip.top.apply(this,arguments);n.fit.top.apply(this,arguments);}}};q.ui.position._sapUiCommonsMenuFlip={left:function(p,e){if(q.ui.position.flipfit){q.ui.position.flipfit.left.apply(this,arguments);return;}e=_(e);n.flipfit.left.apply(this,arguments);},top:function(p,e){if(q.ui.position.flipfit){q.ui.position.flipfit.top.apply(this,arguments);return;}e=_(e);n.flipfit.top.apply(this,arguments);}};})(window);return j;});
