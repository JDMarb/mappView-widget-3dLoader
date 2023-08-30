/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers","../core/EventDispatcher","../textures/Texture","../constants","../math/Vector4","../textures/Source"],(function(e,t,i,r,s,h,n){"use strict";var u=function(e){function i(t,i,n){var u;void 0===n&&(n={}),(u=e.call(this)||this).isWebGLRenderTarget=!0,u.width=t,u.height=i,u.depth=1,u.scissor=new h.Vector4(0,0,t,i),u.scissorTest=!1,u.viewport=new h.Vector4(0,0,t,i);var o={width:t,height:i,depth:1};return u.texture=new r.Texture(o,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),u.texture.isRenderTargetTexture=!0,u.texture.flipY=!1,u.texture.generateMipmaps=void 0!==n.generateMipmaps&&n.generateMipmaps,u.texture.internalFormat=void 0!==n.internalFormat?n.internalFormat:null,u.texture.minFilter=void 0!==n.minFilter?n.minFilter:s.LinearFilter,u.depthBuffer=void 0===n.depthBuffer||n.depthBuffer,u.stencilBuffer=void 0!==n.stencilBuffer&&n.stencilBuffer,u.depthTexture=void 0!==n.depthTexture?n.depthTexture:null,u.samples=void 0!==n.samples?n.samples:0,u}t.inheritsLoose(i,e);var u=i.prototype;return u.setSize=function(e,t,i){void 0===i&&(i=1),this.width===e&&this.height===t&&this.depth===i||(this.width=e,this.height=t,this.depth=i,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)},u.clone=function(){return(new this.constructor).copy(this)},u.copy=function(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;var t=Object.assign({},e.texture.image);return this.texture.source=new n.Source(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,null!==e.depthTexture&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this},u.dispose=function(){this.dispatchEvent({type:"dispose"})},i}(i.EventDispatcher);e.WebGLRenderTarget=u,Object.defineProperty(e,"__esModule",{value:!0})}));
