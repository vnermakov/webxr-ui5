/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./_GroupLock","./_Helper","./_Requestor","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/thirdparty/jquery"],function(_,a,b,L,S,q){"use strict";var r=/\(\$uid=[-\w]+\)$/,m="@com.sap.vocabularies.Common.v1.Messages",c=/^-?\d+$/,d=/^([^(]*)(\(.*\))$/;function e(i,p,k,D){if(k.$count!==undefined){s(i,p,k,k.$count+D);}}function g(i){return i.$count!==undefined?i.$count:Infinity;}function f(R,p){return p===""||R===p||R.indexOf(p+"/")===0;}function s(i,p,k,v){if(typeof v==="string"){v=parseInt(v);}a.updateExisting(i,p,k,{$count:v});}function C(R,i,Q,k,G){this.bActive=true;this.mChangeListeners={};this.fnGetOriginalResourcePath=G;this.sMetaPath=a.getMetaPath("/"+i);this.mPatchRequests={};this.mPostRequests={};this.oRequestor=R;this.sResourcePath=i;this.bSortExpandSelect=k;this.bSentReadRequest=false;this.oTypePromise=undefined;this.setQueryOptions(Q);}C.prototype._delete=function(G,E,p,i){var k=p.split("/"),D=k.pop(),l=k.join("/"),t=this;return this.fetchValue(_.$cached,l).then(function(v){var o=D?v[C.from$skip(D,v)]:v,H,K=a.getPrivateAnnotation(o,"predicate"),n=a.buildPath(l,Array.isArray(v)?K:D),T=a.getPrivateAnnotation(o,"transient");if(T===true){throw new Error("No 'delete' allowed while waiting for server response");}if(T){G.unlock();t.oRequestor.removePost(T,o);return Promise.resolve();}if(o["$ui5.deleting"]){throw new Error("Must not delete twice: "+E);}o["$ui5.deleting"]=true;H={"If-Match":o};E+=t.oRequestor.buildQueryString(t.sMetaPath,t.mQueryOptions,true);return t.oRequestor.request("DELETE",E,G,H,undefined,undefined,undefined,undefined,a.buildPath(t.sResourcePath,n)).catch(function(u){if(u.status!==404){delete o["$ui5.deleting"];throw u;}}).then(function(){var I;if(Array.isArray(v)){I=v.indexOf(o);t.removeElement(v,I,K,l);i(I,v);}else{if(D){a.updateExisting(t.mChangeListeners,l,v,C.makeUpdateData([D],null));}else{o["$ui5.deleted"]=true;}i();}t.oRequestor.getModelInterface().reportBoundMessages(t.sResourcePath,[],[n]);});});};C.prototype.calculateKeyPredicate=function(i,t,M){var p,T=t[M];if(T&&T.$Key){p=a.getKeyPredicate(i,M,t);if(p){a.setPrivateAnnotation(i,"predicate",p);}}return p;};C.prototype.checkActive=function(){var E;if(!this.bActive){E=new Error("Response discarded: cache is inactive");E.canceled=true;throw E;}};C.prototype.create=function(G,p,i,t,E,k,l){var n,K=E&&E["@$ui5.keepTransientPath"],o=this;function u(){a.removeByPath(o.mPostRequests,i,E);n.shift();n.$created-=1;delete n.$byPredicate[t];k();}function v(){a.setPrivateAnnotation(E,"transient",true);}function w(x,y){var z=y.getGroupId();a.setPrivateAnnotation(E,"transient",z);a.addByPath(o.mPostRequests,i,E);return S.all([o.oRequestor.request("POST",x,y,null,E,v,u,undefined,a.buildPath(o.sResourcePath,i,t)),o.fetchTypes()]).then(function(R){var A=R[0],B;a.deletePrivateAnnotation(E,"transient");e(o.mChangeListeners,i,n,1);a.removeByPath(o.mPostRequests,i,E);o.visitResponse(A,R[1],a.getMetaPath(a.buildPath(o.sMetaPath,i)),i+t,K);if(!K){B=a.getPrivateAnnotation(A,"predicate");if(B){n.$byPredicate[B]=E;a.updateTransientPaths(o.mChangeListeners,t,B);}}a.updateSelected(o.mChangeListeners,a.buildPath(i,B||t),E,A,a.getSelectForPath(o.mQueryOptions,i));return E;},function(A){if(A.canceled){throw A;}l(A);return w(x,new _(o.oRequestor.getGroupSubmitMode(z)==="API"?z:"$parked."+z));});}E=q.extend(true,{},E);E=b.cleanPayload(E);a.setPrivateAnnotation(E,"transientPredicate",t);n=this.fetchValue(_.$cached,i).getResult();if(!Array.isArray(n)){throw new Error("Create is only supported for collections; '"+i+"' does not reference a collection");}n.unshift(E);n.$created+=1;n.$byPredicate=n.$byPredicate||{};n.$byPredicate[t]=E;return p.then(function(x){x+=o.oRequestor.buildQueryString(o.sMetaPath,o.mQueryOptions,true);return w(x,G);});};C.prototype.deregisterChange=function(p,l){a.removeByPath(this.mChangeListeners,p,l);};C.prototype.drillDown=function(D,p){var o=S.resolve(D),t=false,k=this;function l(i){L.error("Failed to drill-down into "+p+", invalid segment: "+i,k.toString(),"sap.ui.model.odata.v4.lib._Cache");return undefined;}function n(v,i,u){var w="",R,x;if(p[0]!=='('){w+="/";}w+=p.split("/").slice(0,u).join("/");return k.oRequestor.getModelInterface().fetchMetadata(k.sMetaPath+a.getMetaPath(w)).then(function(y){if(!y){return l(i);}if(y.$Type==="Edm.Stream"){R=v[i+"@odata.mediaReadLink"];x=k.oRequestor.getServiceUrl();return R||x+k.sResourcePath+w;}if(!t){return l(i);}if(y.$kind==="NavigationProperty"){return null;}if(!y.$Type.startsWith("Edm.")){return{};}if("$DefaultValue"in y){return y.$Type==="Edm.String"?y.$DefaultValue:a.parseLiteral(y.$DefaultValue,y.$Type,w);}return null;});}if(!p){return o;}return p.split("/").reduce(function(u,v,i){return u.then(function(V){var M,w;if(v==="$count"){return Array.isArray(V)?V.$count:l(v);}if(V===undefined||V===null){return undefined;}if(typeof V!=="object"||v==="@$ui5._"){return l(v);}w=V;t=t||a.getPrivateAnnotation(V,"transient");M=d.exec(v);if(M){if(M[1]){V=V[M[1]];}if(V){V=V.$byPredicate[M[2]];}}else{V=V[C.from$skip(v,V)];}return V===undefined&&v[0]!=="#"?n(w,v,i+1):V;});},o);};C.prototype.fetchTypes=function(){var p,t,i=this;function k(B,Q){if(Q&&Q.$expand){Object.keys(Q.$expand).forEach(function(n){var M=B;n.split("/").forEach(function(o){M+="/"+o;l(M);});k(M,Q.$expand[n]);});}}function l(M){p.push(i.oRequestor.fetchTypeForPath(M).then(function(T){var o=i.oRequestor.getModelInterface().fetchMetadata(M+"/"+m).getResult();if(o){T=Object.create(T);T[m]=o;}t[M]=T;if(T&&T.$Key){T.$Key.forEach(function(K){var I,n;if(typeof K!=="string"){n=K[Object.keys(K)[0]];I=n.lastIndexOf("/");if(I>=0){l(M+"/"+n.slice(0,I));}}});}}));}if(!this.oTypePromise){p=[];t={};l(this.sMetaPath);if(this.bFetchOperationReturnType){l(this.sMetaPath+"/$Type");}k(this.sMetaPath,this.mQueryOptions);this.oTypePromise=S.all(p).then(function(){return t;});}return this.oTypePromise;};C.prototype.getMeasureRangePromise=function(){return undefined;};C.prototype.hasPendingChangesForPath=function(p){return Object.keys(this.mPatchRequests).some(function(R){return f(R,p);})||Object.keys(this.mPostRequests).some(function(R){return f(R,p);});};C.prototype.patch=function(p,D){var t=this;return this.fetchValue(_.$cached,p).then(function(o){a.updateExisting(t.mChangeListeners,p,o,D);return o;});};C.prototype.registerChange=function(p,l){a.addByPath(this.mChangeListeners,p,l);};C.prototype.removeElement=function(E,i,p,k){var o=E[i],t;E.splice(i,1);if(p){delete E.$byPredicate[p];}t=a.getPrivateAnnotation(o,"transientPredicate");if(t){E.$created-=1;delete E.$byPredicate[t];}e(this.mChangeListeners,k,E,-1);if(!k&&"iLimit"in this){this.iLimit-=1;}};C.prototype.resetChangesForPath=function(p){var t=this;Object.keys(this.mPatchRequests).forEach(function(R){var i,k;if(f(R,p)){k=t.mPatchRequests[R];for(i=k.length-1;i>=0;i--){t.oRequestor.removePatch(k[i]);}delete t.mPatchRequests[R];}});Object.keys(this.mPostRequests).forEach(function(R){var E,i,T;if(f(R,p)){E=t.mPostRequests[R];for(i=E.length-1;i>=0;i--){T=a.getPrivateAnnotation(E[i],"transient");t.oRequestor.removePost(T,E[i]);}delete t.mPostRequests[R];}});};C.prototype.setActive=function(A){this.bActive=A;if(!A){this.mChangeListeners={};}};C.prototype.setQueryOptions=function(Q){if(this.bSentReadRequest){throw new Error("Cannot set query options: Cache has already sent a read request");}this.mQueryOptions=Q;this.sQueryString=this.oRequestor.buildQueryString(this.sMetaPath,Q,false,this.bSortExpandSelect);};C.prototype.toString=function(){return this.oRequestor.getServiceUrl()+this.sResourcePath+this.sQueryString;};C.prototype.update=function(G,p,v,E,i,k,u,l,n){var o=p.split("/"),U,t=this;return this.fetchValue(G.getUnlockedCopy(),k).then(function(w){var F=a.buildPath(k,p),x=G.getGroupId(),O,y,z,T,A,B=C.makeUpdateData(o,v);function D(){a.removeByPath(t.mPatchRequests,F,y);a.updateExisting(t.mChangeListeners,k,w,C.makeUpdateData(o,O));}function H(I,J){var R;function K(){R=t.oRequestor.getModelInterface().lockGroup(x,true,t);if(n){n();}}y=t.oRequestor.request("PATCH",i,I,{"If-Match":w},B,K,D,undefined,a.buildPath(t.sResourcePath,k),J);a.addByPath(t.mPatchRequests,F,y);return S.all([y,t.fetchTypes()]).then(function(M){var N=M[0];a.removeByPath(t.mPatchRequests,F,y);if(!l){t.visitResponse(N,M[1],a.getMetaPath(a.buildPath(t.sMetaPath,k)),k);}a.updateExisting(t.mChangeListeners,k,w,l?{"@odata.etag":N["@odata.etag"]}:N);},function(M){var N=x;a.removeByPath(t.mPatchRequests,F,y);if(M.canceled){throw M;}E(M);switch(t.oRequestor.getGroupSubmitMode(x)){case"API":break;case"Auto":if(!t.oRequestor.hasChanges(x,w)){N="$parked."+x;}break;default:throw M;}R.unlock();R=undefined;return H(new _(N),true);}).finally(function(){if(R){R.unlock();}});}if(!w){throw new Error("Cannot update '"+p+"': '"+k+"' does not exist");}T=a.getPrivateAnnotation(w,"transient");if(T){if(T===true){throw new Error("No 'update' allowed while waiting for server response");}if(T.indexOf("$parked.")===0){z=T;T=T.slice(8);}if(T!==x){throw new Error("The entity will be created via group '"+T+"'. Cannot patch via group '"+x+"'");}}O=a.drillDown(w,o);a.updateSelected(t.mChangeListeners,k,w,B);if(u){U=u.split("/");u=a.buildPath(k,u);A=t.fetchValue(_.$cached,u).getResult();if(A===undefined){L.debug("Missing value for unit of measure "+u+" when updating "+F,t.toString(),"sap.ui.model.odata.v4.lib._Cache");}else{q.extend(true,T?w:B,C.makeUpdateData(U,A));}}if(T){if(z){a.setPrivateAnnotation(w,"transient",T);t.oRequestor.relocate(z,w,T);}G.unlock();return Promise.resolve();}t.oRequestor.relocateAll("$parked."+x,w,x);i+=t.oRequestor.buildQueryString(t.sMetaPath,t.mQueryOptions,true);return H(G);});};C.prototype.visitResponse=function(R,t,k,l,K,n){var o,H=false,p={},u=this.oRequestor.getServiceUrl()+this.sResourcePath,v=this;function w(M,i,A){H=true;if(M&&M.length){p[i]=M;M.forEach(function(B){if(B.longtextUrl){B.longtextUrl=a.makeAbsolute(B.longtextUrl,A);}});}}function x(B,i){return i?a.makeAbsolute(i,B):B;}function y(I,M,A,B){var D={},i,E,F,G;for(i=0;i<I.length;i++){F=I[i];E=A===""?n+i:i;if(F&&typeof F==="object"){z(F,M,A,B,E);G=a.getPrivateAnnotation(F,"predicate");if(!A){o.push(G||E.toString());}if(G){D[G]=F;I.$byPredicate=D;}}}}function z(i,M,I,A,B){var D,E,T=t[M],F=T&&T[m]&&T[m].$Path,G;A=x(A,i["@odata.context"]);E=v.calculateKeyPredicate(i,t,M);if(B!==undefined){I=a.buildPath(I,E||B);}else if(!K&&E){D=r.exec(I);if(D){I=I.slice(0,-D[0].length)+E;}}if(l&&!o){o=[I];}if(F){G=a.drillDown(i,F.split("/"));if(G!==undefined){w(G,I,A);}}Object.keys(i).forEach(function(J){var N,O=M+"/"+J,Q=i[J],U=a.buildPath(I,J);if(J.endsWith("@odata.mediaReadLink")){i[J]=a.makeAbsolute(Q,A);}if(J.includes("@")){return;}if(Array.isArray(Q)){Q.$created=0;Q.$count=undefined;N=i[J+"@odata.count"];if(N){s({},"",Q,N);}else if(!i[J+"@odata.nextLink"]){s({},"",Q,Q.length);}y(Q,O,U,x(A,i[J+"@odata.context"]));}else if(Q&&typeof Q==="object"){z(Q,O,U,A);}});}if(n!==undefined){o=[];y(R.value,k||this.sMetaPath,"",x(u,R["@odata.context"]));}else if(R&&typeof R==="object"){z(R,k||this.sMetaPath,l||"",u);}if(H){this.oRequestor.getModelInterface().reportBoundMessages(this.fnGetOriginalResourcePath?this.fnGetOriginalResourcePath(R):this.sResourcePath,p,o);}};function h(R,i,Q,k){C.apply(this,arguments);this.sContext=undefined;this.aElements=[];this.aElements.$byPredicate={};this.aElements.$count=undefined;this.aElements.$created=0;this.aElements.$tail=undefined;this.iLimit=Infinity;this.oSyncPromiseAll=undefined;}h.prototype=Object.create(C.prototype);h.prototype.fetchValue=function(G,p,D,l){var E,t=this;G.unlock();if(!this.oSyncPromiseAll){E=this.aElements.$tail?this.aElements.concat(this.aElements.$tail):this.aElements;this.oSyncPromiseAll=S.all(E);}return this.oSyncPromiseAll.then(function(){t.checkActive();t.registerChange(p,l);return t.drillDown(t.aElements,p);});};h.prototype.fill=function(p,k,E){var i,n=Math.max(this.aElements.length,1024);if(E>n){if(this.aElements.$tail&&p){throw new Error("Cannot fill from "+k+" to "+E+", $tail already in use, # of elements is "+this.aElements.length);}this.aElements.$tail=p;E=this.aElements.length;}for(i=k;i<E;i++){this.aElements[i]=p;}this.oSyncPromiseAll=undefined;};h.prototype.getReadRange=function(k,l,p){var E=this.aElements;function n(k,o){var i;for(i=k;i<o;i+=1){if(E[i]===undefined){return true;}}return false;}if(n(k+l,k+l+p/2)){l+=p;}if(n(Math.max(k-p/2,0),k)){l+=p;k-=p;if(k<0){l+=k;if(isNaN(l)){l=Infinity;}k=0;}}return{length:l,start:k};};h.prototype.getResourcePath=function(i,E){var D=this.sQueryString?"&":"?",k=E-i,R=this.sResourcePath+this.sQueryString;if(this.aElements.$created){if(i){i-=1;}else{throw new Error("Must not request created element");}}if(i>0||k<Infinity){R+=D+"$skip="+i;}if(k<Infinity){R+="&$top="+k;}return R;};h.prototype.handleResponse=function(k,E,R,t){var l,n,o,i,p,u=R.value.length;this.sContext=R["@odata.context"];n=R["@odata.count"];if(n){this.iLimit=parseInt(n);s(this.mChangeListeners,"",this.aElements,this.iLimit);}this.visitResponse(R,t,undefined,undefined,undefined,k);for(i=0;i<u;i++){o=R.value[i];this.aElements[k+i]=o;p=a.getPrivateAnnotation(o,"predicate");if(p){this.aElements.$byPredicate[p]=o;}}if(u<E-k){l=Math.min(g(this.aElements),k+u-this.aElements.$created);this.aElements.length=this.aElements.$created+l;if(!n&&l>0&&!this.aElements[l-1]){l=undefined;}s(this.mChangeListeners,"",this.aElements,l);this.iLimit=l;}};h.prototype.read=function(I,l,p,G,D){var i,n,E,k,o=-1,R,t=this;if(I<0){throw new Error("Illegal index "+I+", must be >= 0");}if(l<0){throw new Error("Illegal length "+l+", must be >= 0");}if(this.aElements.$tail){return this.aElements.$tail.then(function(){return t.read(I,l,p,G,D);});}R=this.getReadRange(I,l,p);k=Math.min(R.start+R.length,this.aElements.$created+this.iLimit);n=Math.min(k,Math.max(R.start,this.aElements.length)+1);for(i=R.start;i<n;i++){if(this.aElements[i]!==undefined){if(o>=0){this.requestElements(o,i,G.getUnlockedCopy(),D);D=undefined;o=-1;}}else if(o<0){o=i;}}if(o>=0){this.requestElements(o,k,G.getUnlockedCopy(),D);}G.unlock();E=this.aElements.slice(I,k);if(this.aElements.$tail){E.push(this.aElements.$tail);}return S.all(E).then(function(){var u;t.checkActive();u={"@odata.context":t.sContext,value:t.aElements.slice(I,k)};u.value.$count=t.aElements.$count;return u;});};h.prototype.requestElements=function(i,E,G,D){var p,t=this;p=S.all([this.oRequestor.request("GET",this.getResourcePath(i,E),G,undefined,undefined,D),this.fetchTypes()]).then(function(R){if(t.aElements.$tail===p){t.aElements.$tail=undefined;}t.handleResponse(i,E,R[0],R[1]);}).catch(function(o){t.fill(undefined,i,E);throw o;});this.bSentReadRequest=true;this.fill(p,i,E);};h.prototype.refreshSingle=function(G,i,D){var p=a.getPrivateAnnotation(this.aElements[i],"predicate"),o,R=this.sResourcePath+p,Q=q.extend({},this.mQueryOptions),t=this;delete Q["$count"];delete Q["$filter"];delete Q["$orderby"];R+=this.oRequestor.buildQueryString(this.sMetaPath,Q,false,this.bSortExpandSelect);o=S.all([this.oRequestor.request("GET",R,G,undefined,undefined,D),this.fetchTypes()]).then(function(k){var E=k[0];t.replaceElement(i,p,E,k[1]);return E;});this.bSentReadRequest=true;return o;};h.prototype.refreshSingleWithRemove=function(G,i,D,o){var t=this;return this.fetchTypes().then(function(T){var E=t.aElements[i],p=a.getPrivateAnnotation(E,"predicate"),Q=q.extend({},t.mQueryOptions),F=Q["$filter"],R=t.sResourcePath;Q["$filter"]=(F?"("+F+") and ":"")+a.getKeyFilter(E,t.sMetaPath,T);R+=t.oRequestor.buildQueryString(t.sMetaPath,Q,false,t.bSortExpandSelect);t.bSentReadRequest=true;return t.oRequestor.request("GET",R,G,undefined,undefined,D).then(function(k){if(t.aElements[i]!==E){i=t.aElements.indexOf(E);}if(k.value.length>1){throw new Error("Unexpected server response, more than one entity returned.");}else if(k.value.length===0){t.removeElement(t.aElements,i,p,"");o(i);}else{t.replaceElement(i,p,k.value[0],T);}});});};h.prototype.replaceElement=function(i,p,E,t){var o=this.aElements[i],T,k=this;this.aElements[i]=this.aElements.$byPredicate[p]=E;T=a.getPrivateAnnotation(o,"transientPredicate");if(T){k.aElements.$byPredicate[T]=E;a.setPrivateAnnotation(E,"transientPredicate",T);}this.visitResponse(E,t,undefined,p);};h.prototype.requestSideEffects=function(G,p,N,k,l){var E,F,o=[],Q=a.intersectQueryOptions(this.mQueryOptions,p,this.oRequestor.getModelInterface().fetchMetadata,this.sMetaPath,N),R,t=this.fetchTypes().getResult(),u=this,i;if(!Q){return S.resolve();}for(i=0;i<this.aElements.length;i+=1){E=this.aElements[i];if(!E||a.hasPrivateAnnotation(E,"transient")){continue;}if((i<k||i>=k+l)&&!a.hasPrivateAnnotation(E,"transientPredicate")){delete this.aElements.$byPredicate[a.getPrivateAnnotation(E,"predicate")];delete this.aElements[i];continue;}F=a.getKeyFilter(E,this.sMetaPath,t);if(!F){return null;}o.push(F);}this.aElements.length=l?Math.min(k+l,this.aElements.length):this.aElements.$created;if(!o.length){return S.resolve();}Q.$filter=o.join(" or ");a.selectKeyProperties(Q,t[this.sMetaPath]);delete Q.$count;delete Q.$orderby;delete Q.$search;R=this.sResourcePath+this.oRequestor.buildQueryString(this.sMetaPath,Q,false,true);return this.oRequestor.request("GET",R,G).then(function(v){var E,w,i,n;if(v.value.length!==o.length){throw new Error("Expected "+o.length+" row(s), but instead saw "+v.value.length);}u.visitResponse(v,t,undefined,"",false,NaN);for(i=0,n=v.value.length;i<n;i+=1){E=v.value[i];w=a.getPrivateAnnotation(E,"predicate");a.updateExisting(u.mChangeListeners,w,u.aElements.$byPredicate[w],E);}});};function P(R,i,Q){C.call(this,R,i,Q);this.oPromise=null;}P.prototype=Object.create(C.prototype);P.prototype._delete=function(){throw new Error("Unsupported");};P.prototype.create=function(){throw new Error("Unsupported");};P.prototype.fetchValue=function(G,p,D,l){var t=this;t.registerChange("",l);if(this.oPromise){G.unlock();}else{this.oPromise=S.resolve(this.oRequestor.request("GET",this.sResourcePath+this.sQueryString,G,undefined,undefined,D,undefined,this.sMetaPath));this.bSentReadRequest=true;}return this.oPromise.then(function(R){t.checkActive();return R.value;});};P.prototype.update=function(){throw new Error("Unsupported");};function j(R,i,Q,k,G,p,M,F){C.apply(this,arguments);this.bFetchOperationReturnType=F;this.sMetaPath=M||this.sMetaPath;this.bPost=p;this.bPosting=false;this.oPromise=null;}j.prototype=Object.create(C.prototype);j.prototype.fetchValue=function(G,p,D,l){var R=this.sResourcePath+this.sQueryString,t=this;this.registerChange(p,l);if(this.oPromise){G.unlock();}else{if(this.bPost){throw new Error("Cannot fetch a value before the POST request");}this.oPromise=S.all([this.oRequestor.request("GET",R,G,undefined,undefined,D,undefined,this.sMetaPath),this.fetchTypes()]).then(function(i){t.visitResponse(i[0],i[1],t.bFetchOperationReturnType?t.sMetaPath+"/$Type":undefined);return i[0];});this.bSentReadRequest=true;}return this.oPromise.then(function(o){t.checkActive();if(o["$ui5.deleted"]){throw new Error("Cannot read a deleted entity");}return t.drillDown(o,p);});};j.prototype.post=function(G,D,E){var i=G.getGroupId(),H="POST",t=this;if(!this.bPost){throw new Error("POST request not allowed");}if(this.bPosting){throw new Error("Parallel POST requests not allowed");}this.oRequestor.relocateAll("$parked."+i,E,i);if(D){H=D["X-HTTP-Method"]||H;delete D["X-HTTP-Method"];if(this.oRequestor.isActionBodyOptional()&&!Object.keys(D).length){D=undefined;}}this.oPromise=S.all([this.oRequestor.request(H,this.sResourcePath+this.sQueryString,G,{"If-Match":E},D),this.fetchTypes()]).then(function(R){t.bPosting=false;t.visitResponse(R[0],R[1],t.bFetchOperationReturnType?t.sMetaPath+"/$Type":undefined);return R[0];},function(o){t.bPosting=false;throw o;});this.bPosting=true;return this.oPromise;};j.prototype.requestSideEffects=function(G,p,n,R){var o=this.fetchValue(_.$cached,""),Q=a.intersectQueryOptions(this.mQueryOptions,p,this.oRequestor.getModelInterface().fetchMetadata,this.sMetaPath+"/$Type",n),i,t=this;if(!Q){return o;}R=(R||this.sResourcePath)+this.oRequestor.buildQueryString(this.sMetaPath,Q,false,true);i=S.all([this.oRequestor.request("GET",R,G),this.fetchTypes(),o]).then(function(k){var N=k[0],O=k[2];t.visitResponse(N,k[1]);a.updateExisting(t.mChangeListeners,"",O,N);return O;});this.oPromise=i.catch(function(){return o;});return i;};C.create=function(R,i,Q,k){return new h(R,i,Q,k);};C.createProperty=function(R,i,Q){return new P(R,i,Q);};C.createSingle=function(R,i,Q,k,G,p,M,F){return new j(R,i,Q,k,G,p,M,F);};C.from$skip=function(i,k){return c.test(i)?k.$created+Number(i):i;};C.makeUpdateData=function(p,v){return p.reduceRight(function(V,i){var R={};R[i]=V;return R;},v);};return C;},false);