/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers","../math/Vector3","../math/Quaternion","./Audio"],(function(n,t,e,i,r){"use strict";var o=new e.Vector3,a=new i.Quaternion,s=new e.Vector3,c=new e.Vector3,l=function(n){function e(t){var e;return(e=n.call(this,t)||this).panner=e.context.createPanner(),e.panner.panningModel="HRTF",e.panner.connect(e.gain),e}t.inheritsLoose(e,n);var i=e.prototype;return i.disconnect=function(){n.prototype.disconnect.call(this),this.panner.disconnect(this.gain)},i.getOutput=function(){return this.panner},i.getRefDistance=function(){return this.panner.refDistance},i.setRefDistance=function(n){return this.panner.refDistance=n,this},i.getRolloffFactor=function(){return this.panner.rolloffFactor},i.setRolloffFactor=function(n){return this.panner.rolloffFactor=n,this},i.getDistanceModel=function(){return this.panner.distanceModel},i.setDistanceModel=function(n){return this.panner.distanceModel=n,this},i.getMaxDistance=function(){return this.panner.maxDistance},i.setMaxDistance=function(n){return this.panner.maxDistance=n,this},i.setDirectionalCone=function(n,t,e){return this.panner.coneInnerAngle=n,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=e,this},i.updateMatrixWorld=function(t){if(n.prototype.updateMatrixWorld.call(this,t),!0!==this.hasPlaybackControl||!1!==this.isPlaying){this.matrixWorld.decompose(o,a,s),c.set(0,0,1).applyQuaternion(a);var e=this.panner;if(e.positionX){var i=this.context.currentTime+this.listener.timeDelta;e.positionX.linearRampToValueAtTime(o.x,i),e.positionY.linearRampToValueAtTime(o.y,i),e.positionZ.linearRampToValueAtTime(o.z,i),e.orientationX.linearRampToValueAtTime(c.x,i),e.orientationY.linearRampToValueAtTime(c.y,i),e.orientationZ.linearRampToValueAtTime(c.z,i)}else e.setPosition(o.x,o.y,o.z),e.setOrientation(c.x,c.y,c.z)}},e}(r.Audio);n.PositionalAudio=l,Object.defineProperty(n,"__esModule",{value:!0})}));
