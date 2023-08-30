/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../../math/MathUtils","../../math/Vector2","../../math/Vector3","../../math/Matrix4"],(function(t,e,n,r,i){"use strict";var o=function(){function t(){this.type="Curve",this.arcLengthDivisions=200}var o=t.prototype;return o.getPoint=function(){return console.warn("THREE.Curve: .getPoint() not implemented."),null},o.getPointAt=function(t,e){var n=this.getUtoTmapping(t);return this.getPoint(n,e)},o.getPoints=function(t){void 0===t&&(t=5);for(var e=[],n=0;n<=t;n++)e.push(this.getPoint(n/t));return e},o.getSpacedPoints=function(t){void 0===t&&(t=5);for(var e=[],n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e},o.getLength=function(){var t=this.getLengths();return t[t.length-1]},o.getLengths=function(t){if(void 0===t&&(t=this.arcLengthDivisions),this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;var e,n=[],r=this.getPoint(0),i=0;n.push(0);for(var o=1;o<=t;o++)i+=(e=this.getPoint(o/t)).distanceTo(r),n.push(i),r=e;return this.cacheArcLengths=n,n},o.updateArcLengths=function(){this.needsUpdate=!0,this.getLengths()},o.getUtoTmapping=function(t,e){var n,r=this.getLengths(),i=0,o=r.length;n=e||t*r[o-1];for(var s,a=0,c=o-1;a<=c;)if((s=r[i=Math.floor(a+(c-a)/2)]-n)<0)a=i+1;else{if(!(s>0)){c=i;break}c=i-1}if(r[i=c]===n)return i/(o-1);var h=r[i];return(i+(n-h)/(r[i+1]-h))/(o-1)},o.getTangent=function(t,e){var i=1e-4,o=t-i,s=t+i;o<0&&(o=0),s>1&&(s=1);var a=this.getPoint(o),c=this.getPoint(s),h=e||(a.isVector2?new n.Vector2:new r.Vector3);return h.copy(c).sub(a).normalize(),h},o.getTangentAt=function(t,e){var n=this.getUtoTmapping(t);return this.getTangent(n,e)},o.computeFrenetFrames=function(t,n){for(var o=new r.Vector3,s=[],a=[],c=[],h=new r.Vector3,g=new i.Matrix4,u=0;u<=t;u++){var v=u/t;s[u]=this.getTangentAt(v,new r.Vector3)}a[0]=new r.Vector3,c[0]=new r.Vector3;var f=Number.MAX_VALUE,p=Math.abs(s[0].x),l=Math.abs(s[0].y),m=Math.abs(s[0].z);p<=f&&(f=p,o.set(1,0,0)),l<=f&&(f=l,o.set(0,1,0)),m<=f&&o.set(0,0,1),h.crossVectors(s[0],o).normalize(),a[0].crossVectors(s[0],h),c[0].crossVectors(s[0],a[0]);for(var d=1;d<=t;d++){if(a[d]=a[d-1].clone(),c[d]=c[d-1].clone(),h.crossVectors(s[d-1],s[d]),h.length()>Number.EPSILON){h.normalize();var L=Math.acos(e.clamp(s[d-1].dot(s[d]),-1,1));a[d].applyMatrix4(g.makeRotationAxis(h,L))}c[d].crossVectors(s[d],a[d])}if(!0===n){var V=Math.acos(e.clamp(a[0].dot(a[t]),-1,1));V/=t,s[0].dot(h.crossVectors(a[0],a[t]))>0&&(V=-V);for(var P=1;P<=t;P++)a[P].applyMatrix4(g.makeRotationAxis(s[P],V*P)),c[P].crossVectors(s[P],a[P])}return{tangents:s,normals:a,binormals:c}},o.clone=function(){return(new this.constructor).copy(this)},o.copy=function(t){return this.arcLengthDivisions=t.arcLengthDivisions,this},o.toJSON=function(){var t={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t},o.fromJSON=function(t){return this.arcLengthDivisions=t.arcLengthDivisions,this},t}();t.Curve=o,Object.defineProperty(t,"__esModule",{value:!0})}));
