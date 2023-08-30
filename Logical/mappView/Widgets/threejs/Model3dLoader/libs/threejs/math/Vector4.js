/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers"],(function(t,i){"use strict";var s=function(t){function s(t,i,h,n){void 0===t&&(t=0),void 0===i&&(i=0),void 0===h&&(h=0),void 0===n&&(n=1),s.prototype.isVector4=!0,this.x=t,this.y=i,this.z=h,this.w=n}var h=s.prototype;return h.set=function(t,i,s,h){return this.x=t,this.y=i,this.z=s,this.w=h,this},h.setScalar=function(t){return this.x=t,this.y=t,this.z=t,this.w=t,this},h.setX=function(t){return this.x=t,this},h.setY=function(t){return this.y=t,this},h.setZ=function(t){return this.z=t,this},h.setW=function(t){return this.w=t,this},h.setComponent=function(t,i){switch(t){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+t)}return this},h.getComponent=function(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}},h.clone=function(){return new this.constructor(this.x,this.y,this.z,this.w)},h.copy=function(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=void 0!==t.w?t.w:1,this},h.add=function(t,i){return void 0!==i?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,i)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this)},h.addScalar=function(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this},h.addVectors=function(t,i){return this.x=t.x+i.x,this.y=t.y+i.y,this.z=t.z+i.z,this.w=t.w+i.w,this},h.addScaledVector=function(t,i){return this.x+=t.x*i,this.y+=t.y*i,this.z+=t.z*i,this.w+=t.w*i,this},h.sub=function(t,i){return void 0!==i?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,i)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this)},h.subScalar=function(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this},h.subVectors=function(t,i){return this.x=t.x-i.x,this.y=t.y-i.y,this.z=t.z-i.z,this.w=t.w-i.w,this},h.multiply=function(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this},h.multiplyScalar=function(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this},h.applyMatrix4=function(t){var i=this.x,s=this.y,h=this.z,n=this.w,r=t.elements;return this.x=r[0]*i+r[4]*s+r[8]*h+r[12]*n,this.y=r[1]*i+r[5]*s+r[9]*h+r[13]*n,this.z=r[2]*i+r[6]*s+r[10]*h+r[14]*n,this.w=r[3]*i+r[7]*s+r[11]*h+r[15]*n,this},h.divideScalar=function(t){return this.multiplyScalar(1/t)},h.setAxisAngleFromQuaternion=function(t){this.w=2*Math.acos(t.w);var i=Math.sqrt(1-t.w*t.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/i,this.y=t.y/i,this.z=t.z/i),this},h.setAxisAngleFromRotationMatrix=function(t){var i,s,h,n,r=.01,e=.1,a=t.elements,o=a[0],u=a[4],c=a[8],x=a[1],w=a[5],y=a[9],f=a[2],z=a[6],l=a[10];if(Math.abs(u-x)<r&&Math.abs(c-f)<r&&Math.abs(y-z)<r){if(Math.abs(u+x)<e&&Math.abs(c+f)<e&&Math.abs(y+z)<e&&Math.abs(o+w+l-3)<e)return this.set(1,0,0,0),this;i=Math.PI;var M=(o+1)/2,m=(w+1)/2,d=(l+1)/2,b=(u+x)/4,p=(c+f)/4,v=(y+z)/4;return M>m&&M>d?M<r?(s=0,h=.707106781,n=.707106781):(h=b/(s=Math.sqrt(M)),n=p/s):m>d?m<r?(s=.707106781,h=0,n=.707106781):(s=b/(h=Math.sqrt(m)),n=v/h):d<r?(s=.707106781,h=.707106781,n=0):(s=p/(n=Math.sqrt(d)),h=v/n),this.set(s,h,n,i),this}var g=Math.sqrt((z-y)*(z-y)+(c-f)*(c-f)+(x-u)*(x-u));return Math.abs(g)<.001&&(g=1),this.x=(z-y)/g,this.y=(c-f)/g,this.z=(x-u)/g,this.w=Math.acos((o+w+l-1)/2),this},h.min=function(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this},h.max=function(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this},h.clamp=function(t,i){return this.x=Math.max(t.x,Math.min(i.x,this.x)),this.y=Math.max(t.y,Math.min(i.y,this.y)),this.z=Math.max(t.z,Math.min(i.z,this.z)),this.w=Math.max(t.w,Math.min(i.w,this.w)),this},h.clampScalar=function(t,i){return this.x=Math.max(t,Math.min(i,this.x)),this.y=Math.max(t,Math.min(i,this.y)),this.z=Math.max(t,Math.min(i,this.z)),this.w=Math.max(t,Math.min(i,this.w)),this},h.clampLength=function(t,i){var s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(t,Math.min(i,s)))},h.floor=function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this},h.ceil=function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this},h.round=function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this},h.roundToZero=function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this},h.negate=function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this},h.dot=function(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w},h.lengthSq=function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},h.length=function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},h.manhattanLength=function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)},h.normalize=function(){return this.divideScalar(this.length()||1)},h.setLength=function(t){return this.normalize().multiplyScalar(t)},h.lerp=function(t,i){return this.x+=(t.x-this.x)*i,this.y+=(t.y-this.y)*i,this.z+=(t.z-this.z)*i,this.w+=(t.w-this.w)*i,this},h.lerpVectors=function(t,i,s){return this.x=t.x+(i.x-t.x)*s,this.y=t.y+(i.y-t.y)*s,this.z=t.z+(i.z-t.z)*s,this.w=t.w+(i.w-t.w)*s,this},h.equals=function(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w},h.fromArray=function(t,i){return void 0===i&&(i=0),this.x=t[i],this.y=t[i+1],this.z=t[i+2],this.w=t[i+3],this},h.toArray=function(t,i){return void 0===t&&(t=[]),void 0===i&&(i=0),t[i]=this.x,t[i+1]=this.y,t[i+2]=this.z,t[i+3]=this.w,t},h.fromBufferAttribute=function(t,i,s){return void 0!==s&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(i),this.y=t.getY(i),this.z=t.getZ(i),this.w=t.getW(i),this},h.random=function(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this},h[t]=i.regeneratorRuntime().mark((function t(){return i.regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.x;case 2:return t.next=4,this.y;case 4:return t.next=6,this.z;case 6:return t.next=8,this.w;case 8:case"end":return t.stop()}}),t,this)})),i.createClass(s,[{key:"width",get:function(){return this.z},set:function(t){this.z=t}},{key:"height",get:function(){return this.w},set:function(t){this.w=t}}]),s}(Symbol.iterator);t.Vector4=s,Object.defineProperty(t,"__esModule",{value:!0})}));
