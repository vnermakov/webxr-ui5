/*!
* SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
*/
sap.ui.define(["jquery.sap.global","sap/ui/base/EventProvider","./thirdparty/three"],function(q,E,t){"use strict";var V=E.extend("sap.ui.vk.threejs.ViewportGestureHandler",{metadata:{},constructor:function(v){this._matProj=null;this._viewport=v;this._rect=null;this._evt={x:0,y:0,z:0,d:0,initd:0};this._gesture=false;this._viewport.attachEvent("resize",this,this._onresize);this._nomenu=false;var T=function(a){var v=a;var b=new THREE.Vector3();var z=new THREE.Vector2();var A=0.001;var M=-Math.PI/2+A;var c=Math.PI/2-A;this.isTurnTableMode=true;this._timeIntervalForCameraAnimation=500;this._startTimeForCameraAnimation=0;this._newCamera=null;this._oldCamera=null;this._animationType=null;this._zoomedNodeRef=null;this._isZoomIn=true;this.beginGesture=function(x,y){var d=v.getScene();if(d==null){return;}var e=d.getSceneRef();var f=v.getCamera().getCameraRef();var h=v.getRenderer().getSize();z.x=x/h.width*2-1;z.y=y/h.height*-2+1;v._gesturePoint={x:x,y:y};var i=v.hitTest(x,y,e,f);if(i){b.copy(i.point);}else{var j=new THREE.Box3();e._expandBoundingBox(j,true);if(!j.isEmpty()){j.getCenter(b);}else{b.setScalar(0);}}};this.endGesture=function(){};this.pan=function(d,e){if(v.getFreezeCamera()||v.getCamera()==null){return;}if(d===0&&e===0){return;}var f=v.getCamera().getCameraRef();var h=v.getRenderer().getSize();if(v._viewportGestureHandler._matProj){var m=v._viewportGestureHandler._matProj;m[8]-=d*2/h.width;m[9]+=e*2/h.height;}else{var o=b.clone().project(f);o.x-=d*2/h.width;o.y+=e*2/h.height;o.unproject(f).sub(b);f.position.add(o);}f.updateMatrixWorld();v.fireCameraChanged({position:f.position.toArray()});};this.rotate=function(d,e,i){if(v.getFreezeCamera()||v.getCamera()==null){return;}if(i!==undefined){this.isTurnTableMode=i;}if(d===0&&e===0){return;}var f=v.getCamera().getCameraRef(),h=d*-0.01,j=e*-0.01;var o=f.position.clone().sub(b);var l=new THREE.Vector3(),u=new THREE.Vector3().setFromMatrixColumn(f.matrixWorld,1).normalize(),r=new THREE.Vector3().setFromMatrixColumn(f.matrixWorld,0).normalize();f.getWorldDirection(l);l.normalize();var k=new THREE.Quaternion(),m=new THREE.Quaternion();if(this.isTurnTableMode){var n=new THREE.Vector3(0,1,0);r.crossVectors(l,n).normalize();u.crossVectors(r,l);var p=Math.atan2(l.y,Math.sqrt(l.x*l.x+l.z*l.z));k.setFromAxisAngle(n,h);m.setFromAxisAngle(r,THREE.Math.clamp(j,M-p,c-p));}else{k.setFromAxisAngle(u,h);m.setFromAxisAngle(r,j);}k.multiply(m);o.applyQuaternion(k);l.applyQuaternion(k);u.applyQuaternion(k);o.add(b);f.position.copy(o);f.up.copy(u);f.lookAt(o.add(l));f.updateMatrixWorld();v.fireCameraChanged({position:f.position.toArray(),quaternion:f.quaternion.toArray()});};this.zoom=function(d){if(v.getFreezeCamera()||v.getCamera()==null){return;}var e=v.getScene();if(e==null){return;}var h=e.getSceneRef();if(d===0||d===1){return;}if(d>1.12){d=1.12;}else if(d<0.88){d=0.88;}var i=100;var j=v.getCamera().getCameraRef();var k=new THREE.Vector3();var l=new THREE.Box3();var m=new THREE.Vector3();h._expandBoundingBox(l,true);l.applyMatrix4(j.matrixWorldInverse);l.min.z=Math.max(l.min.z,j.near);l.max.z=Math.max(l.max.z,j.near);l.applyMatrix4(j.projectionMatrix);l.getSize(m);var n=v.getRenderer().getSize();var o=m.x*n.width*0.5;var p=m.y*n.height*0.5;if(o<i&&p<i&&d<1){return;}if(j.isPerspectiveCamera){if(v._viewportGestureHandler._matProj){this._matProj=v._viewportGestureHandler._matProj;var r=v.getDomRef();var u=g(this._matProj);var w=u.left+(u.right-u.left)*v._gesturePoint.x/r.clientWidth;var x=u.top+(u.bottom-u.top)*v._gesturePoint.y/r.clientHeight;var f=1/d;u.left=w+(u.left-w)*f;u.right=w+(u.right-w)*f;u.top=x+(u.top-x)*f;u.bottom=x+(u.bottom-x)*f;s(this._matProj,u);}else{k.set(z.x,z.y,1).unproject(j);k.sub(new THREE.Vector3(z.x,z.y,-1).unproject(j));var y=b.clone().sub(j.position).length()*(1-1/d);k.setLength(y);j.position.add(k);}}else if(j.isOrthographicCamera){k.set(z.x,z.y,1).unproject(j);k.sub(new THREE.Vector3(0,0,1).unproject(j));k.multiplyScalar(1-1/d);j.zoom*=d;j.updateProjectionMatrix();j.position.add(k);}else{q.sap.log.error("threejs.ViewportGestureHandler: unsupported camera type");}j.updateMatrixWorld();var B={position:j.position.toArray()};if(j.isOrthographicCamera){B.zoom=j.zoom;}v.fireCameraChanged(B);};this.animateCameraUpdate=function(){if(this._newCamera===null||this._oldCamera===null){return;}if(v.getCamera()==null){this._newCamera=null;this._oldCamera=null;return;}function d(f,h,x){x=THREE.Math.clamp((x-f)/(h-f),0.0,1.0);return x*x*x*(x*(x*6-15)+10);}var i=Math.min((Date.now()-this._startTimeForCameraAnimation)/this._timeIntervalForCameraAnimation,1);i=d(0,1,i);var e=v.getCamera().getCameraRef();if(e.isOrthographicCamera&&this._newCamera.isOrthographicCamera&&this._oldCamera.isOrthographicCamera){e.left=THREE.Math.lerp(this._oldCamera.left,this._newCamera.left,i);e.right=THREE.Math.lerp(this._oldCamera.right,this._newCamera.right,i);e.top=THREE.Math.lerp(this._oldCamera.top,this._newCamera.top,i);e.bottom=THREE.Math.lerp(this._oldCamera.bottom,this._newCamera.bottom,i);e.zoom=THREE.Math.lerp(this._oldCamera.zoom,this._newCamera.zoom,i);}if(e.isPerspectiveCamera&&this._newCamera.isPerspectiveCamera&&this._oldCamera.isPerspectiveCamera){e.fov=THREE.Math.lerp(this._oldCamera.fov,this._newCamera.fov,i);e.aspect=THREE.Math.lerp(this._oldCamera.aspect,this._newCamera.aspect,i);}e.far=THREE.Math.lerp(this._oldCamera.far,this._newCamera.far,i);e.near=THREE.Math.lerp(this._oldCamera.near,this._newCamera.near,i);e.updateProjectionMatrix();e.position.lerpVectors(this._oldCamera.position,this._newCamera.position,i);e.quaternion.copy(this._oldCamera.quaternion).slerp(this._newCamera.quaternion,i);e.scale.lerpVectors(this._oldCamera.scale,this._newCamera.scale,i);e.updateMatrixWorld();if(i===1){this._newCamera=null;this._oldCamera=null;if(this._animationType==="zooming"&&this._zoomedNodeRef){v.fireNodeZoomed({zoomed:this._zoomedNodeRef,isZoomIn:this._isZoomIn});}v.fireCameraUpdateCompleted({position:e.position.toArray(),quaternion:e.quaternion.toArray()});}v.fireCameraChanged({position:e.position.toArray(),quaternion:e.quaternion.toArray()});};this.zoomObject=function(n,i,d){if(v.getScene()==null){return;}var e=new THREE.Box3();(i&&n?n:v.getScene().getSceneRef())._expandBoundingBox(e,true);this.zoomBox(e,0,d,n,i);};this.zoomBox=function(d,m,e,n,f){this._zoomedNodeRef=n;this._isZoomIn=f;this._animationType="zooming";var h=v.getCamera().getCameraRef();var j=new THREE.Vector3();d.getSize(j);var k=new THREE.Vector3();h.getWorldDirection(k);k.multiplyScalar(j.length());var l=new THREE.Vector3();d.getCenter(l);var o=[new THREE.Vector3(d.min.x,d.min.y,d.min.z),new THREE.Vector3(d.max.x,d.max.y,d.max.z),new THREE.Vector3(d.min.x,d.min.y,d.max.z),new THREE.Vector3(d.min.x,d.max.y,d.max.z),new THREE.Vector3(d.max.x,d.min.y,d.max.z),new THREE.Vector3(d.max.x,d.max.y,d.min.z),new THREE.Vector3(d.min.x,d.max.y,d.min.z),new THREE.Vector3(d.max.x,d.min.y,d.min.z)];var p=new THREE.Matrix4(),r=new THREE.Vector3();function u(h){p.multiplyMatrices(h.projectionMatrix,h.matrixWorldInverse);for(var i in o){r.copy(o[i]).applyMatrix4(p);if(r.x<-1.0||r.x>1.0||r.y<-1.0||r.y>1.0){return false;}}return true;}this._newCamera=h.clone();this._newCamera.position.copy(l).sub(k);this._newCamera.updateMatrixWorld(true);if(h.isPerspectiveCamera){while(!u(this._newCamera)){this._newCamera.position.sub(k);this._newCamera.updateMatrixWorld(true);}var w=10;var P=this._newCamera.position.clone();var x=l.clone();for(var y=0;y<w;y++){this._newCamera.position.copy(P).add(x).multiplyScalar(0.5);this._newCamera.updateMatrixWorld(true);if(u(this._newCamera)){P.copy(this._newCamera.position);}else{x.copy(this._newCamera.position);}}this._newCamera.position.copy(P).sub(l).multiplyScalar(m).add(P);this._newCamera.updateMatrixWorld(true);}if(h.isOrthographicCamera){var B=new THREE.Box2();o.forEach(function(i){r=i.project(this._newCamera);B.expandByPoint(new THREE.Vector2(r.x,r.y));}.bind(this));this._newCamera.zoom/=Math.max(B.getSize().x,B.getSize().y)*0.5*(1+m);this._newCamera.updateProjectionMatrix();}this._startTimeForCameraAnimation=Date.now();this._timeIntervalForCameraAnimation=e!==undefined?e:500;};this.prepareForCameraUpdateAnimation=function(){this._oldCamera=v.getCamera().getCameraRef().clone();};this.startAnimatingCameraUpdate=function(d){var e=v.getCamera().getCameraRef();if(!this._oldCamera){return;}var f=0.0001;var n=false;if(e.isOrthographicCamera&&this._oldCamera.isOrthographicCamera){if(Math.abs(e.left-this._oldCamera.left)>f||Math.abs(e.right-this._oldCamera.right)>f||Math.abs(e.top-this._oldCamera.top)>f||Math.abs(e.bottom-this._oldCamera.bottom)>f||Math.abs(e.zoom-this._oldCamera.zoom)>f){n=true;}}else if(e.isPerspectiveCamera&&this._oldCamera.isPerspectiveCamera){if(Math.abs(e.fov-this._oldCamera.fov)>f||Math.abs(e.aspect-this._oldCamera.aspect)>f){n=true;}}if(!n){if(Math.abs(e.position.x-this._oldCamera.position.x)>f||Math.abs(e.position.y-this._oldCamera.position.y)>f||Math.abs(e.position.z-this._oldCamera.position.z)>f||Math.abs(e.scale.x-this._oldCamera.scale.x)>f||Math.abs(e.scale.y-this._oldCamera.scale.y)>f||Math.abs(e.scale.z-this._oldCamera.scale.z)>f||Math.abs(e.quaternion.x-this._oldCamera.quaternion.x)>f||Math.abs(e.quaternion.y-this._oldCamera.quaternion.y)>f||Math.abs(e.quaternion.z-this._oldCamera.quaternion.z)>f||Math.abs(e.quaternion.w-this._oldCamera.quaternion.w)>f){n=true;}}if(!n){v.fireCameraUpdateCompleted({position:e.position.toArray(),quaternion:e.quaternion.toArray()});return;}this._newCamera=v.getCamera().getCameraRef().clone();this._timeIntervalForCameraAnimation=d!==undefined?d:500;this._startTimeForCameraAnimation=Date.now();};};this._cameraController=new T(v);}});function g(a){var m=a;var i=m[15]===1;var r=2/m[0];var b=2/m[5];var c,d;if(i){c=-m[12]*r;d=-m[13]*b;}else{c=m[8]*r;d=m[9]*b;}var e=(r+c)*0.5;var l=c-e;var f=(b+d)*0.5;var h=d-f;return{left:l,top:f,right:e,bottom:h};}function s(a,r){var m=a;var i=m[15]===1;m[0]=2/(r.right-r.left);m[5]=2/(r.top-r.bottom);if(i){m[12]=-(r.right+r.left)/(r.right-r.left);m[13]=-(r.top+r.bottom)/(r.top-r.bottom);}else{m[8]=(r.right+r.left)/(r.right-r.left);m[9]=(r.top+r.bottom)/(r.top-r.bottom);}}V.prototype._activateRedline=function(){var c=this._viewport.getCamera().getCameraRef();this._matProj=c.projectionMatrix.elements;};V.prototype._deactivateRedline=function(){this._matProj=null;};V.prototype.destroy=function(){this._viewport=null;this._rect=null;this._evt=null;this._gesture=false;};V.prototype._getOffset=function(o){var r=o.getBoundingClientRect();var p={x:r.left+window.pageXOffset,y:r.top+window.pageYOffset};return p;};V.prototype._inside=function(e){if(this._rect===null||true){var i=this._viewport.getIdForLabel();var d=document.getElementById(i);if(!d){return false;}var o=this._getOffset(d);this._rect={x:o.x,y:o.y,w:d.offsetWidth,h:d.offsetHeight};}return(e.x>=this._rect.x&&e.x<=this._rect.x+this._rect.w&&e.y>=this._rect.y&&e.y<=this._rect.y+this._rect.h);};V.prototype._onresize=function(e){this._gesture=false;this._rect=null;};V.prototype.beginGesture=function(a){if(this._inside(a)&&!this._gesture){this._gesture=true;var x=a.x-this._rect.x,y=a.y-this._rect.y;this._evt.x=x;this._evt.y=y;this._evt.d=a.d;this._evt.initd=a.d;this._evt.avgd=a.d;this._evt.avgx=0;this._evt.avgy=0;q.sap.log.debug("Loco: beginGesture: "+x+", "+y);this._cameraController.beginGesture(x,y);a.handled=true;if(document.activeElement){try{document.activeElement.blur();}catch(e){}}var d=document.getElementById(this._viewport.getIdForLabel());d.focus();}this._nomenu=false;};V.prototype.move=function(e){if(this._gesture){var x=e.x-this._rect.x,y=e.y-this._rect.y;var d=x-this._evt.x;var a=y-this._evt.y;var b=e.d-this._evt.d;this._evt.x=x;this._evt.y=y;this._evt.d=e.d;this._evt.avgx=this._evt.avgx*0.99+d*0.01;this._evt.avgy=this._evt.avgy*0.99+a*0.01;var z=1.0;if(this._evt.initd>0){z=1.0+b*(1.0/this._evt.initd);}else if(e.n===2){if(e.points[0].y>e.points[1].y){z=1.0-b*0.005;if(z<0.333){z=0.333;}}else{z=1.0+b*0.005;if(z>3){z=3;}}}if(this._evt.initd>0){var c=Math.sqrt(this._evt.avgx*this._evt.avgx+this._evt.avgy*this._evt.avgy);q.sap.log.debug("AvgDist: "+c);if((Math.abs(e.d-this._evt.avgd)/this._evt.avgd)<(c/10)){z=1.0;}}this._evt.avgd=this._evt.avgd*0.97+e.d*0.03;switch(e.n){case 1:q.sap.log.debug("Loco: Rotate: "+(d)+", "+(a));this._cameraController.rotate(d,a);break;case 2:q.sap.log.debug("Loco: Pan: "+(d)+", "+(a));if(z!=0&&z!=1.0){q.sap.log.debug("Loco: Zoom: "+(z));}this._cameraController.pan(d,a);if(d<10&&a<10&&z!=0&&z!=1.0){this._cameraController.zoom(z);}break;default:break;}this._nomenu=true;e.handled=true;}};V.prototype.endGesture=function(e){if(this._gesture){var x=e.x-this._rect.x,y=e.y-this._rect.y;q.sap.log.debug("Loco: endGesture: "+x+", "+y);this._cameraController.endGesture();this._gesture=false;e.handled=true;}};V.prototype.click=function(e){if(this._inside(e)&&e.buttons<=1){var x=e.x-this._rect.x,y=e.y-this._rect.y;q.sap.log.debug("Loco: click: "+(x)+", "+(y));if(this._viewport){this._viewport.tap(x,y,false);}e.handled=true;}};V.prototype.doubleClick=function(e){if(this._inside(e)&&e.buttons<=1){var x=e.x-this._rect.x,y=e.y-this._rect.y;q.sap.log.debug("Loco: doubleClick: "+(x)+", "+(y));if(this._viewport){this._viewport.tap(x,y,true);}e.handled=true;}};V.prototype.contextMenu=function(e){if(this._inside(e)||this._nomenu||e.buttons===5){this._nomenu=false;e.handled=true;}};V.prototype.keyEventHandler=function(e){};V.prototype.getViewport=function(){return this._viewport;};V.prototype._activateCamera=function(c,a){this._cameraController.prepareForCameraUpdateAnimation();if(this._viewport.getCamera().getCameraRef().isPerspectiveCamera!=c.isPerspectiveCamera){this._viewport.setCamera(c.isPerspectiveCamera?new sap.ui.vk.threejs.PerspectiveCamera():new sap.ui.vk.threejs.OrthographicCamera());}this._viewport.getCamera().getCameraRef().copy(c);var b=this._viewport.getRenderer().getSize();this._viewport.getCamera().update(b.width,b.height);this._cameraController.startAnimatingCameraUpdate(a);return this;};V.prototype.setView=function(a,b){this._cameraController.prepareForCameraUpdateAnimation();var c=this._viewport.getCamera().getCameraRef();if(a){c.quaternion.copy(a);c.updateMatrixWorld();c.up.setFromMatrixColumn(c.matrixWorld,1).normalize();this._cameraController.zoomObject(null,false,b);}else{c.copy(this._viewport._homeCamera?this._viewport._homeCamera:new sap.ui.vk.threejs.PerspectiveCamera().getCameraRef());var d=this._viewport.getRenderer().getSize();this._viewport.getCamera().update(d.width,d.height);this._cameraController.startAnimatingCameraUpdate(b);}return this;};V.prototype.zoomTo=function(b,a,m,c,n,i){this._cameraController.prepareForCameraUpdateAnimation();if(a){var d=this._viewport.getCamera().getCameraRef();d.quaternion.copy(a);d.updateMatrixWorld();d.up.setFromMatrixColumn(d.matrixWorld,1).normalize();}this._cameraController.zoomBox(b,m,c,n,i);return this;};V.prototype.zoomObject=function(n,i,a){this._cameraController.prepareForCameraUpdateAnimation();this._cameraController.zoomObject(n,i,a);return this;};V.prototype.animateCameraUpdate=function(){this._cameraController.animateCameraUpdate();};V.prototype.prepareForCameraUpdateAnimation=function(){this._cameraController.prepareForCameraUpdateAnimation();};V.prototype.startAnimatingCameraUpdate=function(a){this._cameraController.startAnimatingCameraUpdate(a);};return V;},true);
