/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers","../math/Color","./LoadingManager","./FileLoader","./Loader","./LoaderUtils","./TextureLoader","../constants","../materials/MeshPhongMaterial","../math/Vector2"],(function(e,a,r,t,s,i,o,n,l,p,h){"use strict";var c=function(e){function r(a){return e.call(this,a)||this}a.inheritsLoose(r,e);var t=r.prototype;return t.load=function(e,a,r,t){var i=this,n=""===this.path?o.LoaderUtils.extractUrlBase(e):this.path,l=new s.FileLoader(this.manager);l.setPath(this.path),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,(function(r){try{a(i.parse(r,n))}catch(a){t?t(a):console.error(a),i.manager.itemError(e)}}),r,t)},t.setMaterialOptions=function(e){return this.materialOptions=e,this},t.parse=function(e,a){for(var r=e.split("\n"),t={},s=/\s+/,i={},o=0;o<r.length;o++){var n=r[o];if(0!==(n=n.trim()).length&&"#"!==n.charAt(0)){var l=n.indexOf(" "),p=l>=0?n.substring(0,l):n;p=p.toLowerCase();var h=l>=0?n.substring(l+1):"";if(h=h.trim(),"newmtl"===p)t={name:h},i[h]=t;else if("ka"===p||"kd"===p||"ks"===p||"ke"===p){var c=h.split(s,3);t[p]=[parseFloat(c[0]),parseFloat(c[1]),parseFloat(c[2])]}else t[p]=h}}var m=new u(this.resourcePath||a,this.materialOptions);return m.setCrossOrigin(this.crossOrigin),m.setManager(this.manager),m.setMaterials(i),m},r}(i.Loader),u=function(){function e(e,a){void 0===e&&(e=""),void 0===a&&(a={}),this.baseUrl=e,this.options=a,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.crossOrigin="anonymous",this.side=void 0!==this.options.side?this.options.side:l.FrontSide,this.wrap=void 0!==this.options.wrap?this.options.wrap:l.RepeatWrapping}var a=e.prototype;return a.setCrossOrigin=function(e){return this.crossOrigin=e,this},a.setManager=function(e){this.manager=e},a.setMaterials=function(e){this.materialsInfo=this.convert(e),this.materials={},this.materialsArray=[],this.nameLookup={}},a.convert=function(e){if(!this.options)return e;var a={};for(var r in e){var t=e[r],s={};for(var i in a[r]=s,t){var o=!0,n=t[i],l=i.toLowerCase();switch(l){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(n=[n[0]/255,n[1]/255,n[2]/255]),this.options&&this.options.ignoreZeroRGBs&&0===n[0]&&0===n[1]&&0===n[2]&&(o=!1)}o&&(s[l]=n)}}return a},a.preload=function(){for(var e in this.materialsInfo)this.create(e)},a.getIndex=function(e){return this.nameLookup[e]},a.getAsArray=function(){var e=0;for(var a in this.materialsInfo)this.materialsArray[e]=this.create(a),this.nameLookup[a]=e,e++;return this.materialsArray},a.create=function(e){return void 0===this.materials[e]&&this.createMaterial_(e),this.materials[e]},a.createMaterial_=function(e){var a=this,t=this.materialsInfo[e],s={name:e,side:this.side};function i(e,r){if(!s[e]){var t,i,o=a.getTextureParams(r,s),n=a.loadTexture((t=a.baseUrl,"string"!=typeof(i=o.url)||""===i?"":/^https?:\/\//i.test(i)?i:t+i));n.repeat.copy(o.scale),n.offset.copy(o.offset),n.wrapS=a.wrap,n.wrapT=a.wrap,"map"!==e&&"emissiveMap"!==e||(n.encoding=l.sRGBEncoding),s[e]=n}}for(var o in t){var n=t[o],h=void 0;if(""!==n)switch(o.toLowerCase()){case"kd":s.color=(new r.Color).fromArray(n).convertSRGBToLinear();break;case"ks":s.specular=(new r.Color).fromArray(n).convertSRGBToLinear();break;case"ke":s.emissive=(new r.Color).fromArray(n).convertSRGBToLinear();break;case"map_kd":i("map",n);break;case"map_ks":i("specularMap",n);break;case"map_ke":i("emissiveMap",n);break;case"norm":i("normalMap",n);break;case"map_bump":case"bump":i("bumpMap",n);break;case"map_d":i("alphaMap",n),s.transparent=!0;break;case"ns":s.shininess=parseFloat(n);break;case"d":(h=parseFloat(n))<1&&(s.opacity=h,s.transparent=!0);break;case"tr":h=parseFloat(n),this.options&&this.options.invertTrProperty&&(h=1-h),h>0&&(s.opacity=1-h,s.transparent=!0)}}return this.materials[e]=new p.MeshPhongMaterial(s),this.materials[e]},a.getTextureParams=function(e,a){var r,t={scale:new h.Vector2(1,1),offset:new h.Vector2(0,0)},s=e.split(/\s+/);return(r=s.indexOf("-bm"))>=0&&(a.bumpScale=parseFloat(s[r+1]),s.splice(r,2)),(r=s.indexOf("-s"))>=0&&(t.scale.set(parseFloat(s[r+1]),parseFloat(s[r+2])),s.splice(r,4)),(r=s.indexOf("-o"))>=0&&(t.offset.set(parseFloat(s[r+1]),parseFloat(s[r+2])),s.splice(r,4)),t.url=s.join(" ").trim(),t},a.loadTexture=function(e,a,r,s,i){var o=void 0!==this.manager?this.manager:t.DefaultLoadingManager,l=o.getHandler(e);null===l&&(l=new n.TextureLoader(o)),l.setCrossOrigin&&l.setCrossOrigin(this.crossOrigin);var p=l.load(e,r,s,i);return void 0!==a&&(p.mapping=a),p},e}();e.MTLLoader=c,Object.defineProperty(e,"__esModule",{value:!0})}));