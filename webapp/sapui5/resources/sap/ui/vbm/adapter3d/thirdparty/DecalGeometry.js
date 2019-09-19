(function(){function D(m,b,o,c){THREE.BufferGeometry.call(this);var d=[];var n=[];var u=[];var e=new THREE.Vector3();var f=new THREE.Matrix4();f.makeRotationFromEuler(o);f.setPosition(b);var g=new THREE.Matrix4().getInverse(f);h();this.addAttribute('position',new THREE.Float32BufferAttribute(d,3));this.addAttribute('normal',new THREE.Float32BufferAttribute(n,3));this.addAttribute('uv',new THREE.Float32BufferAttribute(u,2));function h(){var i;var p=new THREE.BufferGeometry();var q=[];var v=new THREE.Vector3();var r=new THREE.Vector3();if(m.geometry.isGeometry){p.fromGeometry(m.geometry);}else{p.copy(m.geometry);}var s=p.attributes.position;var t=p.attributes.normal;if(p.index!==null){var w=p.index;for(i=0;i<w.count;i++){v.fromBufferAttribute(s,w.getX(i));r.fromBufferAttribute(t,w.getX(i));j(q,v,r);}}else{for(i=0;i<s.count;i++){v.fromBufferAttribute(s,i);r.fromBufferAttribute(t,i);j(q,v,r);}}if(m.matrixWorld.determinant()<0){for(i=0;i<q.length;i+=3){var x=q[i];q[i+0]=q[i+2];q[i+2]=x;}}q=k(q,e.set(1,0,0));q=k(q,e.set(-1,0,0));q=k(q,e.set(0,1,0));q=k(q,e.set(0,-1,0));q=k(q,e.set(0,0,1));q=k(q,e.set(0,0,-1));for(i=0;i<q.length;i++){var y=q[i];u.push(0.5+(y.position.x/c.x),0.5+(y.position.y/c.y));y.position.applyMatrix4(f);d.push(y.position.x,y.position.y,y.position.z);n.push(y.normal.x,y.normal.y,y.normal.z);}}function j(i,v,p){v.applyMatrix4(m.matrixWorld);v.applyMatrix4(g);p.transformDirection(m.matrixWorld);i.push(new a(v.clone(),p.clone()));}function k(p,e){var q=[];var s=0.5*Math.abs(c.dot(e));for(var i=0;i<p.length;i+=3){var v,r,t,w=0;var x,y,z,A;var B=p[i+0].position.dot(e)-s;var C=p[i+1].position.dot(e)-s;var E=p[i+2].position.dot(e)-s;v=B>0;r=C>0;t=E>0;w=(v?1:0)+(r?1:0)+(t?1:0);switch(w){case 0:{q.push(p[i]);q.push(p[i+1]);q.push(p[i+2]);break;}case 1:{if(v){x=p[i+1];y=p[i+2];z=l(p[i],x,e,s);A=l(p[i],y,e,s);}if(r){x=p[i];y=p[i+2];z=l(p[i+1],x,e,s);A=l(p[i+1],y,e,s);q.push(z);q.push(y.clone());q.push(x.clone());q.push(y.clone());q.push(z.clone());q.push(A);break;}if(t){x=p[i];y=p[i+1];z=l(p[i+2],x,e,s);A=l(p[i+2],y,e,s);}q.push(x.clone());q.push(y.clone());q.push(z);q.push(A);q.push(z.clone());q.push(y.clone());break;}case 2:{if(!v){x=p[i].clone();y=l(x,p[i+1],e,s);z=l(x,p[i+2],e,s);q.push(x);q.push(y);q.push(z);}if(!r){x=p[i+1].clone();y=l(x,p[i+2],e,s);z=l(x,p[i],e,s);q.push(x);q.push(y);q.push(z);}if(!t){x=p[i+2].clone();y=l(x,p[i],e,s);z=l(x,p[i+1],e,s);q.push(x);q.push(y);q.push(z);}break;}case 3:{break;}}}return q;}function l(i,q,p,s){var r=i.position.dot(p)-s;var t=q.position.dot(p)-s;var w=r/(r-t);var v=new a(new THREE.Vector3(i.position.x+w*(q.position.x-i.position.x),i.position.y+w*(q.position.y-i.position.y),i.position.z+w*(q.position.z-i.position.z)),new THREE.Vector3(i.normal.x+w*(q.normal.x-i.normal.x),i.normal.y+w*(q.normal.y-i.normal.y),i.normal.z+w*(q.normal.z-i.normal.z)));return v;}}D.prototype=Object.create(THREE.BufferGeometry.prototype);D.prototype.constructor=D;function a(p,n){this.position=p;this.normal=n;}a.prototype.clone=function(){return new a(this.position.clone(),this.normal.clone());};THREE.DecalGeometry=D;})();