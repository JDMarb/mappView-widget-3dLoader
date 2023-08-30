/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers","../core/BufferGeometry","../core/BufferAttribute","../math/MathUtils","../math/Triangle","../math/Vector3"],(function(t,e,r,o,n,u,i){"use strict";var a=new i.Vector3,f=new i.Vector3,l=new i.Vector3,h=new u.Triangle,d=function(t){function r(e,r){var u;if(void 0===e&&(e=null),void 0===r&&(r=1),(u=t.call(this)||this).type="EdgesGeometry",u.parameters={geometry:e,thresholdAngle:r},null!==e){for(var i=Math.pow(10,4),d=Math.cos(n.DEG2RAD*r),s=e.getIndex(),c=e.getAttribute("position"),m=s?s.count:c.count,y=[0,0,0],b=["a","b","c"],g=new Array(3),p={},x=[],M=0;M<m;M+=3){s?(y[0]=s.getX(M),y[1]=s.getX(M+1),y[2]=s.getX(M+2)):(y[0]=M,y[1]=M+1,y[2]=M+2);var v=h.a,A=h.b,B=h.c;if(v.fromBufferAttribute(c,y[0]),A.fromBufferAttribute(c,y[1]),B.fromBufferAttribute(c,y[2]),h.getNormal(l),g[0]=Math.round(v.x*i)+","+Math.round(v.y*i)+","+Math.round(v.z*i),g[1]=Math.round(A.x*i)+","+Math.round(A.y*i)+","+Math.round(A.z*i),g[2]=Math.round(B.x*i)+","+Math.round(B.y*i)+","+Math.round(B.z*i),g[0]!==g[1]&&g[1]!==g[2]&&g[2]!==g[0])for(var w=0;w<3;w++){var z=(w+1)%3,_=g[w],G=g[z],V=h[b[w]],E=h[b[z]],X=_+"_"+G,D=G+"_"+_;D in p&&p[D]?(l.dot(p[D].normal)<=d&&(x.push(V.x,V.y,V.z),x.push(E.x,E.y,E.z)),p[D]=null):X in p||(p[X]={index0:y[w],index1:y[z],normal:l.clone()})}}for(var P in p)if(p[P]){var T=p[P],j=T.index0,F=T.index1;a.fromBufferAttribute(c,j),f.fromBufferAttribute(c,F),x.push(a.x,a.y,a.z),x.push(f.x,f.y,f.z)}u.setAttribute("position",new o.Float32BufferAttribute(x,3))}return u}return e.inheritsLoose(r,t),r}(r.BufferGeometry);t.EdgesGeometry=d,Object.defineProperty(t,"__esModule",{value:!0})}));