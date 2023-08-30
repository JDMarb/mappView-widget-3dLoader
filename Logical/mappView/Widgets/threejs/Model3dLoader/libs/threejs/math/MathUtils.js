/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports"],(function(e){"use strict";var r=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],a=1234567,t=Math.PI/180,n=180/Math.PI;function o(e,r){return(e%r+r)%r}function c(e,r,a){return(1-a)*e+a*r}e.DEG2RAD=t,e.RAD2DEG=n,e.ceilPowerOfTwo=function(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))},e.clamp=function(e,r,a){return Math.max(r,Math.min(a,e))},e.damp=function(e,r,a,t){return c(e,r,1-Math.exp(-a*t))},e.degToRad=function(e){return e*t},e.denormalize=function(e,r){switch(r.constructor){case Float32Array:return e;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}},e.euclideanModulo=o,e.floorPowerOfTwo=function(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))},e.generateUUID=function(){var e=4294967295*Math.random()|0,a=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(r[255&e]+r[e>>8&255]+r[e>>16&255]+r[e>>24&255]+"-"+r[255&a]+r[a>>8&255]+"-"+r[a>>16&15|64]+r[a>>24&255]+"-"+r[63&t|128]+r[t>>8&255]+"-"+r[t>>16&255]+r[t>>24&255]+r[255&n]+r[n>>8&255]+r[n>>16&255]+r[n>>24&255]).toLowerCase()},e.inverseLerp=function(e,r,a){return e!==r?(a-e)/(r-e):0},e.isPowerOfTwo=function(e){return 0==(e&e-1)&&0!==e},e.lerp=c,e.mapLinear=function(e,r,a,t,n){return t+(e-r)*(n-t)/(a-r)},e.normalize=function(e,r){switch(r.constructor){case Float32Array:return e;case Uint16Array:return Math.round(65535*e);case Uint8Array:return Math.round(255*e);case Int16Array:return Math.round(32767*e);case Int8Array:return Math.round(127*e);default:throw new Error("Invalid component type.")}},e.pingpong=function(e,r){return void 0===r&&(r=1),r-Math.abs(o(e,2*r)-r)},e.radToDeg=function(e){return e*n},e.randFloat=function(e,r){return e+Math.random()*(r-e)},e.randFloatSpread=function(e){return e*(.5-Math.random())},e.randInt=function(e,r){return e+Math.floor(Math.random()*(r-e+1))},e.seededRandom=function(e){void 0!==e&&(a=e);var r=a+=1831565813;return r=Math.imul(r^r>>>15,1|r),(((r^=r+Math.imul(r^r>>>7,61|r))^r>>>14)>>>0)/4294967296},e.setQuaternionFromProperEuler=function(e,r,a,t,n){var o=Math.cos,c=Math.sin,u=o(a/2),d=c(a/2),f=o((r+t)/2),i=c((r+t)/2),s=o((r-t)/2),b=c((r-t)/2),h=o((t-r)/2),M=c((t-r)/2);switch(n){case"XYX":e.set(u*i,d*s,d*b,u*f);break;case"YZY":e.set(d*b,u*i,d*s,u*f);break;case"ZXZ":e.set(d*s,d*b,u*i,u*f);break;case"XZX":e.set(u*i,d*M,d*h,u*f);break;case"YXY":e.set(d*h,u*i,d*M,u*f);break;case"ZYZ":e.set(d*M,d*h,u*i,u*f);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+n)}},e.smootherstep=function(e,r,a){return e<=r?0:e>=a?1:(e=(e-r)/(a-r))*e*e*(e*(6*e-15)+10)},e.smoothstep=function(e,r,a){return e<=r?0:e>=a?1:(e=(e-r)/(a-r))*e*(3-2*e)},Object.defineProperty(e,"__esModule",{value:!0})}));
