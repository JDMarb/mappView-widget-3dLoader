/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers","./Quaternion","./Matrix4","./MathUtils"],(function(t,a,e,i,n){"use strict";var r=new i.Matrix4,s=new e.Quaternion,h=function(t){function e(t,a,i,n){void 0===t&&(t=0),void 0===a&&(a=0),void 0===i&&(i=0),void 0===n&&(n=e.DefaultOrder),this.isEuler=!0,this._x=t,this._y=a,this._z=i,this._order=n}var i=e.prototype;return i.set=function(t,a,e,i){return void 0===i&&(i=this._order),this._x=t,this._y=a,this._z=e,this._order=i,this._onChangeCallback(),this},i.clone=function(){return new this.constructor(this._x,this._y,this._z,this._order)},i.copy=function(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this},i.setFromRotationMatrix=function(t,a,e){void 0===a&&(a=this._order),void 0===e&&(e=!0);var i=t.elements,r=i[0],s=i[4],h=i[8],o=i[1],_=i[5],u=i[9],c=i[2],l=i[6],d=i[10];switch(a){case"XYZ":this._y=Math.asin(n.clamp(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(l,_),this._z=0);break;case"YXZ":this._x=Math.asin(-n.clamp(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(h,d),this._z=Math.atan2(o,_)):(this._y=Math.atan2(-c,r),this._z=0);break;case"ZXY":this._x=Math.asin(n.clamp(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(-c,d),this._z=Math.atan2(-s,_)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-n.clamp(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(l,d),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-s,_));break;case"YZX":this._z=Math.asin(n.clamp(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,_),this._y=Math.atan2(-c,r)):(this._x=0,this._y=Math.atan2(h,d));break;case"XZY":this._z=Math.asin(-n.clamp(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(l,_),this._y=Math.atan2(h,r)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+a)}return this._order=a,!0===e&&this._onChangeCallback(),this},i.setFromQuaternion=function(t,a,e){return r.makeRotationFromQuaternion(t),this.setFromRotationMatrix(r,a,e)},i.setFromVector3=function(t,a){return void 0===a&&(a=this._order),this.set(t.x,t.y,t.z,a)},i.reorder=function(t){return s.setFromEuler(this),this.setFromQuaternion(s,t)},i.equals=function(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order},i.fromArray=function(t){return this._x=t[0],this._y=t[1],this._z=t[2],void 0!==t[3]&&(this._order=t[3]),this._onChangeCallback(),this},i.toArray=function(t,a){return void 0===t&&(t=[]),void 0===a&&(a=0),t[a]=this._x,t[a+1]=this._y,t[a+2]=this._z,t[a+3]=this._order,t},i._onChange=function(t){return this._onChangeCallback=t,this},i._onChangeCallback=function(){},i[t]=a.regeneratorRuntime().mark((function t(){return a.regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this._x;case 2:return t.next=4,this._y;case 4:return t.next=6,this._z;case 6:return t.next=8,this._order;case 8:case"end":return t.stop()}}),t,this)})),i.toVector3=function(){console.error("THREE.Euler: .toVector3() has been removed. Use Vector3.setFromEuler() instead")},a.createClass(e,[{key:"x",get:function(){return this._x},set:function(t){this._x=t,this._onChangeCallback()}},{key:"y",get:function(){return this._y},set:function(t){this._y=t,this._onChangeCallback()}},{key:"z",get:function(){return this._z},set:function(t){this._z=t,this._onChangeCallback()}},{key:"order",get:function(){return this._order},set:function(t){this._order=t,this._onChangeCallback()}}]),e}(Symbol.iterator);h.DefaultOrder="XYZ",h.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"],t.Euler=h,Object.defineProperty(t,"__esModule",{value:!0})}));
