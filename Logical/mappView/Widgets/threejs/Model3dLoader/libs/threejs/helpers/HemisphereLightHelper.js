/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers","../math/Vector3","../math/Color","../core/Object3D","../objects/Mesh","../materials/MeshBasicMaterial","../geometries/OctahedronGeometry","../core/BufferAttribute"],(function(e,t,r,o,i,a,l,s,n){"use strict";var c=new r.Vector3,h=new o.Color,u=new o.Color,d=function(e){function r(t,r,o){var i;(i=e.call(this)||this).light=t,i.light.updateMatrixWorld(),i.matrix=t.matrixWorld,i.matrixAutoUpdate=!1,i.color=o;var c=new s.OctahedronGeometry(r);c.rotateY(.5*Math.PI),i.material=new l.MeshBasicMaterial({wireframe:!0,fog:!1,toneMapped:!1}),void 0===i.color&&(i.material.vertexColors=!0);var h=c.getAttribute("position"),u=new Float32Array(3*h.count);return c.setAttribute("color",new n.BufferAttribute(u,3)),i.add(new a.Mesh(c,i.material)),i.update(),i}t.inheritsLoose(r,e);var o=r.prototype;return o.dispose=function(){this.children[0].geometry.dispose(),this.children[0].material.dispose()},o.update=function(){var e=this.children[0];if(void 0!==this.color)this.material.color.set(this.color);else{var t=e.geometry.getAttribute("color");h.copy(this.light.color),u.copy(this.light.groundColor);for(var r=0,o=t.count;r<o;r++){var i=r<o/2?h:u;t.setXYZ(r,i.r,i.g,i.b)}t.needsUpdate=!0}e.lookAt(c.setFromMatrixPosition(this.light.matrixWorld).negate())},r}(i.Object3D);e.HemisphereLightHelper=d,Object.defineProperty(e,"__esModule",{value:!0})}));
