/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers","./Cache","./Loader"],(function(e,t,n,a){"use strict";var r=function(e){function a(t){var n;return(n=e.call(this,t)||this).isImageBitmapLoader=!0,"undefined"==typeof createImageBitmap&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),"undefined"==typeof fetch&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),n.options={premultiplyAlpha:"none"},n}t.inheritsLoose(a,e);var r=a.prototype;return r.setOptions=function(e){return this.options=e,this},r.load=function(e,t,a,r){void 0===e&&(e=""),void 0!==this.path&&(e=this.path+e),e=this.manager.resolveURL(e);var i=this,o=n.Cache.get(e);if(void 0!==o)return i.manager.itemStart(e),setTimeout((function(){t&&t(o),i.manager.itemEnd(e)}),0),o;var s={};s.credentials="anonymous"===this.crossOrigin?"same-origin":"include",s.headers=this.requestHeader,fetch(e,s).then((function(e){return e.blob()})).then((function(e){return createImageBitmap(e,Object.assign(i.options,{colorSpaceConversion:"none"}))})).then((function(a){n.Cache.add(e,a),t&&t(a),i.manager.itemEnd(e)})).catch((function(t){r&&r(t),i.manager.itemError(e),i.manager.itemEnd(e)})),i.manager.itemStart(e)},a}(a.Loader);e.ImageBitmapLoader=r,Object.defineProperty(e,"__esModule",{value:!0})}));
