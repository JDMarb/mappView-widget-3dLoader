/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers","../math/Quaternion","../math/Vector3","../math/Matrix4","./EventDispatcher","../math/Euler","./Layers","../math/Matrix3","../math/MathUtils"],(function(t,e,i,r,n,a,s,o,h,l){"use strict";var u=0,d=new r.Vector3,c=new i.Quaternion,m=new n.Matrix4,p=new r.Vector3,x=new r.Vector3,f=new r.Vector3,v=new i.Quaternion,g=new r.Vector3(1,0,0),y=new r.Vector3(0,1,0),M=new r.Vector3(0,0,1),b={type:"added"},O={type:"removed"},W=function(t){function a(){var d;(d=t.call(this)||this).isObject3D=!0,Object.defineProperty(e.assertThisInitialized(d),"id",{value:u++}),d.uuid=l.generateUUID(),d.name="",d.type="Object3D",d.parent=null,d.children=[],d.up=a.DefaultUp.clone();var c=new r.Vector3,m=new s.Euler,p=new i.Quaternion,x=new r.Vector3(1,1,1);return m._onChange((function(){p.setFromEuler(m,!1)})),p._onChange((function(){m.setFromQuaternion(p,void 0,!1)})),Object.defineProperties(e.assertThisInitialized(d),{position:{configurable:!0,enumerable:!0,value:c},rotation:{configurable:!0,enumerable:!0,value:m},quaternion:{configurable:!0,enumerable:!0,value:p},scale:{configurable:!0,enumerable:!0,value:x},modelViewMatrix:{value:new n.Matrix4},normalMatrix:{value:new h.Matrix3}}),d.matrix=new n.Matrix4,d.matrixWorld=new n.Matrix4,d.matrixAutoUpdate=a.DefaultMatrixAutoUpdate,d.matrixWorldNeedsUpdate=!1,d.layers=new o.Layers,d.visible=!0,d.castShadow=!1,d.receiveShadow=!1,d.frustumCulled=!0,d.renderOrder=0,d.animations=[],d.userData={},d}e.inheritsLoose(a,t);var W=a.prototype;return W.onBeforeRender=function(){},W.onAfterRender=function(){},W.applyMatrix4=function(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)},W.applyQuaternion=function(t){return this.quaternion.premultiply(t),this},W.setRotationFromAxisAngle=function(t,e){this.quaternion.setFromAxisAngle(t,e)},W.setRotationFromEuler=function(t){this.quaternion.setFromEuler(t,!0)},W.setRotationFromMatrix=function(t){this.quaternion.setFromRotationMatrix(t)},W.setRotationFromQuaternion=function(t){this.quaternion.copy(t)},W.rotateOnAxis=function(t,e){return c.setFromAxisAngle(t,e),this.quaternion.multiply(c),this},W.rotateOnWorldAxis=function(t,e){return c.setFromAxisAngle(t,e),this.quaternion.premultiply(c),this},W.rotateX=function(t){return this.rotateOnAxis(g,t)},W.rotateY=function(t){return this.rotateOnAxis(y,t)},W.rotateZ=function(t){return this.rotateOnAxis(M,t)},W.translateOnAxis=function(t,e){return d.copy(t).applyQuaternion(this.quaternion),this.position.add(d.multiplyScalar(e)),this},W.translateX=function(t){return this.translateOnAxis(g,t)},W.translateY=function(t){return this.translateOnAxis(y,t)},W.translateZ=function(t){return this.translateOnAxis(M,t)},W.localToWorld=function(t){return t.applyMatrix4(this.matrixWorld)},W.worldToLocal=function(t){return t.applyMatrix4(m.copy(this.matrixWorld).invert())},W.lookAt=function(t,e,i){t.isVector3?p.copy(t):p.set(t,e,i);var r=this.parent;this.updateWorldMatrix(!0,!1),x.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?m.lookAt(x,p,this.up):m.lookAt(p,x,this.up),this.quaternion.setFromRotationMatrix(m),r&&(m.extractRotation(r.matrixWorld),c.setFromRotationMatrix(m),this.quaternion.premultiply(c.invert()))},W.add=function(t){if(arguments.length>1){for(var e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(null!==t.parent&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(b)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)},W.remove=function(t){if(arguments.length>1){for(var e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}var i=this.children.indexOf(t);return-1!==i&&(t.parent=null,this.children.splice(i,1),t.dispatchEvent(O)),this},W.removeFromParent=function(){var t=this.parent;return null!==t&&t.remove(this),this},W.clear=function(){for(var t=0;t<this.children.length;t++){var e=this.children[t];e.parent=null,e.dispatchEvent(O)}return this.children.length=0,this},W.attach=function(t){return this.updateWorldMatrix(!0,!1),m.copy(this.matrixWorld).invert(),null!==t.parent&&(t.parent.updateWorldMatrix(!0,!1),m.multiply(t.parent.matrixWorld)),t.applyMatrix4(m),this.add(t),t.updateWorldMatrix(!1,!0),this},W.getObjectById=function(t){return this.getObjectByProperty("id",t)},W.getObjectByName=function(t){return this.getObjectByProperty("name",t)},W.getObjectByProperty=function(t,e){if(this[t]===e)return this;for(var i=0,r=this.children.length;i<r;i++){var n=this.children[i].getObjectByProperty(t,e);if(void 0!==n)return n}},W.getWorldPosition=function(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)},W.getWorldQuaternion=function(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(x,t,f),t},W.getWorldScale=function(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(x,v,t),t},W.getWorldDirection=function(t){this.updateWorldMatrix(!0,!1);var e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()},W.raycast=function(){},W.traverse=function(t){t(this);for(var e=this.children,i=0,r=e.length;i<r;i++)e[i].traverse(t)},W.traverseVisible=function(t){if(!1!==this.visible){t(this);for(var e=this.children,i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}},W.traverseAncestors=function(t){var e=this.parent;null!==e&&(t(e),e.traverseAncestors(t))},W.updateMatrix=function(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0},W.updateMatrixWorld=function(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);for(var e=this.children,i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)},W.updateWorldMatrix=function(t,e){var i=this.parent;if(!0===t&&null!==i&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),!0===e)for(var r=this.children,n=0,a=r.length;n<a;n++)r[n].updateWorldMatrix(!1,!0)},W.toJSON=function(t){var e=void 0===t||"string"==typeof t,i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});var r={};function n(e,i){return void 0===e[i.uuid]&&(e[i.uuid]=i.toJSON(t)),i.uuid}if(r.uuid=this.uuid,r.type=this.type,""!==this.name&&(r.name=this.name),!0===this.castShadow&&(r.castShadow=!0),!0===this.receiveShadow&&(r.receiveShadow=!0),!1===this.visible&&(r.visible=!1),!1===this.frustumCulled&&(r.frustumCulled=!1),0!==this.renderOrder&&(r.renderOrder=this.renderOrder),"{}"!==JSON.stringify(this.userData)&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),!1===this.matrixAutoUpdate&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),null!==this.instanceColor&&(r.instanceColor=this.instanceColor.toJSON())),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=n(t.geometries,this.geometry);var a=this.geometry.parameters;if(void 0!==a&&void 0!==a.shapes){var s=a.shapes;if(Array.isArray(s))for(var o=0,h=s.length;o<h;o++){var l=s[o];n(t.shapes,l)}else n(t.shapes,s)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),void 0!==this.skeleton&&(n(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),void 0!==this.material)if(Array.isArray(this.material)){for(var u=[],d=0,c=this.material.length;d<c;d++)u.push(n(t.materials,this.material[d]));r.material=u}else r.material=n(t.materials,this.material);if(this.children.length>0){r.children=[];for(var m=0;m<this.children.length;m++)r.children.push(this.children[m].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(var p=0;p<this.animations.length;p++){var x=this.animations[p];r.animations.push(n(t.animations,x))}}if(e){var f=A(t.geometries),v=A(t.materials),g=A(t.textures),y=A(t.images),M=A(t.shapes),b=A(t.skeletons),O=A(t.animations),W=A(t.nodes);f.length>0&&(i.geometries=f),v.length>0&&(i.materials=v),g.length>0&&(i.textures=g),y.length>0&&(i.images=y),M.length>0&&(i.shapes=M),b.length>0&&(i.skeletons=b),O.length>0&&(i.animations=O),W.length>0&&(i.nodes=W)}return i.object=r,i;function A(t){var e=[];for(var i in t){var r=t[i];delete r.metadata,e.push(r)}return e}},W.clone=function(t){return(new this.constructor).copy(this,t)},W.copy=function(t,e){if(void 0===e&&(e=!0),this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),!0===e)for(var i=0;i<t.children.length;i++){var r=t.children[i];this.add(r.clone())}return this},a}(a.EventDispatcher);W.DefaultUp=new r.Vector3(0,1,0),W.DefaultMatrixAutoUpdate=!0,t.Object3D=W,Object.defineProperty(t,"__esModule",{value:!0})}));
