/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers","../core/BufferAttribute","../core/BufferGeometry","./FileLoader","./Loader","./LoaderUtils","../math/Vector3"],(function(e,t,r,n,o,a,i,u){"use strict";var s=function(e){function a(t){return e.call(this,t)||this}t.inheritsLoose(a,e);var s=a.prototype;return s.load=function(e,t,r,n){var a=this,i=new o.FileLoader(this.manager);i.setPath(this.path),i.setResponseType("arraybuffer"),i.setRequestHeader(this.requestHeader),i.setWithCredentials(this.withCredentials),i.load(e,(function(r){try{t(a.parse(r))}catch(t){n?n(t):console.error(t),a.manager.itemError(e)}}),r,n)},s.parse=function(e){function t(e,t,r){for(var n=0,o=e.length;n<o;n++)if(e[n]!==t.getUint8(r+n))return!1;return!0}var o,a=function(e){if("string"==typeof e){for(var t=new Uint8Array(e.length),r=0;r<e.length;r++)t[r]=255&e.charCodeAt(r);return t.buffer||t}return e}(e);return function(e){var r=new DataView(e);if(84+50*r.getUint32(80,!0)===r.byteLength)return!0;for(var n=[115,111,108,105,100],o=0;o<5;o++)if(t(n,r,o))return!1;return!0}(a)?function(e){for(var t,o,a,i,u,s,f,l,c=new DataView(e),g=c.getUint32(80,!0),h=!1,d=0;d<70;d++)1129270351==c.getUint32(d,!1)&&82==c.getUint8(d+4)&&61==c.getUint8(d+5)&&(h=!0,i=new Float32Array(3*g*3),u=c.getUint8(d+6)/255,s=c.getUint8(d+7)/255,f=c.getUint8(d+8)/255,l=c.getUint8(d+9)/255);for(var p=new n.BufferGeometry,w=new Float32Array(3*g*3),v=new Float32Array(3*g*3),F=0;F<g;F++){var b=84+50*F,y=c.getFloat32(b,!0),A=c.getFloat32(b+4,!0),m=c.getFloat32(b+8,!0);if(h){var U=c.getUint16(b+48,!0);0==(32768&U)?(t=(31&U)/31,o=(U>>5&31)/31,a=(U>>10&31)/31):(t=u,o=s,a=f)}for(var L=1;L<=3;L++){var x=b+12*L,B=3*F*3+3*(L-1);w[B]=c.getFloat32(x,!0),w[B+1]=c.getFloat32(x+4,!0),w[B+2]=c.getFloat32(x+8,!0),v[B]=y,v[B+1]=A,v[B+2]=m,h&&(i[B]=t,i[B+1]=o,i[B+2]=a)}}return p.setAttribute("position",new r.BufferAttribute(w,3)),p.setAttribute("normal",new r.BufferAttribute(v,3)),h&&(p.setAttribute("color",new r.BufferAttribute(i,3)),p.hasColors=!0,p.alpha=l),p}(a):function(e){for(var t,o=new n.BufferGeometry,a=/solid([\s\S]*?)endsolid/g,i=/facet([\s\S]*?)endfacet/g,s=0,f=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,l=new RegExp("vertex"+f+f+f,"g"),c=new RegExp("normal"+f+f+f,"g"),g=[],h=[],d=new u.Vector3,p=0,w=0,v=0;null!==(t=a.exec(e));){w=v;for(var F=t[0];null!==(t=i.exec(F));){for(var b=0,y=0,A=t[0];null!==(t=c.exec(A));)d.x=parseFloat(t[1]),d.y=parseFloat(t[2]),d.z=parseFloat(t[3]),y++;for(;null!==(t=l.exec(A));)g.push(parseFloat(t[1]),parseFloat(t[2]),parseFloat(t[3])),h.push(d.x,d.y,d.z),b++,v++;1!==y&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+s),3!==b&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+s),s++}var m=w,U=v-w;o.addGroup(m,U,p),p++}return o.setAttribute("position",new r.Float32BufferAttribute(g,3)),o.setAttribute("normal",new r.Float32BufferAttribute(h,3)),o}("string"!=typeof(o=e)?i.LoaderUtils.decodeText(new Uint8Array(o)):o)},a}(a.Loader);e.STLLoader=s,Object.defineProperty(e,"__esModule",{value:!0})}));