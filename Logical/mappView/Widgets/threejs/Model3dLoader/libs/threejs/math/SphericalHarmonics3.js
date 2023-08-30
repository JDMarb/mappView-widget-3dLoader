/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","./Vector3"],(function(e,t){"use strict";var c=function(){function e(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(var e=0;e<9;e++)this.coefficients.push(new t.Vector3)}var c=e.prototype;return c.set=function(e){for(var t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this},c.zero=function(){for(var e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this},c.getAt=function(e,t){var c=e.x,r=e.y,i=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*r),t.addScaledVector(o[2],.488603*i),t.addScaledVector(o[3],.488603*c),t.addScaledVector(o[4],c*r*1.092548),t.addScaledVector(o[5],r*i*1.092548),t.addScaledVector(o[6],.315392*(3*i*i-1)),t.addScaledVector(o[7],c*i*1.092548),t.addScaledVector(o[8],.546274*(c*c-r*r)),t},c.getIrradianceAt=function(e,t){var c=e.x,r=e.y,i=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],1.023328*r),t.addScaledVector(o[2],1.023328*i),t.addScaledVector(o[3],1.023328*c),t.addScaledVector(o[4],.858086*c*r),t.addScaledVector(o[5],.858086*r*i),t.addScaledVector(o[6],.743125*i*i-.247708),t.addScaledVector(o[7],.858086*c*i),t.addScaledVector(o[8],.429043*(c*c-r*r)),t},c.add=function(e){for(var t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this},c.addScaledSH=function(e,t){for(var c=0;c<9;c++)this.coefficients[c].addScaledVector(e.coefficients[c],t);return this},c.scale=function(e){for(var t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this},c.lerp=function(e,t){for(var c=0;c<9;c++)this.coefficients[c].lerp(e.coefficients[c],t);return this},c.equals=function(e){for(var t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0},c.copy=function(e){return this.set(e.coefficients)},c.clone=function(){return(new this.constructor).copy(this)},c.fromArray=function(e,t){void 0===t&&(t=0);for(var c=this.coefficients,r=0;r<9;r++)c[r].fromArray(e,t+3*r);return this},c.toArray=function(e,t){void 0===e&&(e=[]),void 0===t&&(t=0);for(var c=this.coefficients,r=0;r<9;r++)c[r].toArray(e,t+3*r);return e},e.getBasisAt=function(e,t){var c=e.x,r=e.y,i=e.z;t[0]=.282095,t[1]=.488603*r,t[2]=.488603*i,t[3]=.488603*c,t[4]=1.092548*c*r,t[5]=1.092548*r*i,t[6]=.315392*(3*i*i-1),t[7]=1.092548*c*i,t[8]=.546274*(c*c-r*r)},e}();e.SphericalHarmonics3=c,Object.defineProperty(e,"__esModule",{value:!0})}));
