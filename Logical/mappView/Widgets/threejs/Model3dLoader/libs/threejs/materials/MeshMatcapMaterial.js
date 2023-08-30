/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers","../constants","./Material","../math/Vector2","../math/Color"],(function(a,e,l,t,p,i){"use strict";var n=function(a){function t(e){var t;return(t=a.call(this)||this).isMeshMatcapMaterial=!0,t.defines={MATCAP:""},t.type="MeshMatcapMaterial",t.color=new i.Color(16777215),t.matcap=null,t.map=null,t.bumpMap=null,t.bumpScale=1,t.normalMap=null,t.normalMapType=l.TangentSpaceNormalMap,t.normalScale=new p.Vector2(1,1),t.displacementMap=null,t.displacementScale=1,t.displacementBias=0,t.alphaMap=null,t.flatShading=!1,t.fog=!0,t.setValues(e),t}return e.inheritsLoose(t,a),t.prototype.copy=function(e){return a.prototype.copy.call(this,e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this},t}(t.Material);a.MeshMatcapMaterial=n,Object.defineProperty(a,"__esModule",{value:!0})}));