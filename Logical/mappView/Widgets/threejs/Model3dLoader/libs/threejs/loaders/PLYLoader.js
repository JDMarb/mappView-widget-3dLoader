/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers","../core/BufferGeometry","./FileLoader","../core/BufferAttribute","./Loader","./LoaderUtils","../math/Color"],(function(e,t,r,n,s,a,i,o){"use strict";var u=new o.Color,l=function(e){function a(t){var r;return(r=e.call(this,t)||this).propertyNameMapping={},r}t.inheritsLoose(a,e);var o=a.prototype;return o.load=function(e,t,r,s){var a=this,i=new n.FileLoader(this.manager);i.setPath(this.path),i.setResponseType("arraybuffer"),i.setRequestHeader(this.requestHeader),i.setWithCredentials(this.withCredentials),i.load(e,(function(r){try{t(a.parse(r))}catch(t){s?s(t):console.error(t),a.manager.itemError(e)}}),r,s)},o.setPropertyNameMapping=function(e){this.propertyNameMapping=e},o.parse=function(e){function t(e){var t="",r=0,n=/^ply([\s\S]*)end_header\r?\n/.exec(e);null!==n&&(t=n[1],r=new Blob([n[0]]).size);var s,a,i,o,u={comments:[],elements:[],headerLength:r,objInfo:""},l=t.split("\n");for(var c=0;c<l.length;c++){var f=l[c];if(""!==(f=f.trim())){var p=f.split(/\s+/),h=p.shift();switch(f=p.join(" "),h){case"format":u.format=p[0],u.version=p[1];break;case"comment":u.comments.push(f);break;case"element":void 0!==s&&u.elements.push(s),(s={}).name=p[0],s.count=parseInt(p[1]),s.properties=[];break;case"property":s.properties.push((a=p,i=m.propertyNameMapping,o=void 0,"list"===(o={type:a[0]}).type?(o.name=a[3],o.countType=a[1],o.itemType=a[2]):o.name=a[1],o.name in i&&(o.name=i[o.name]),o));break;case"obj_info":u.objInfo=f;break;default:console.log("unhandled",h,p)}}}return void 0!==s&&u.elements.push(s),u}function n(e,t){switch(t){case"char":case"uchar":case"short":case"ushort":case"int":case"uint":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":return parseInt(e);case"float":case"double":case"float32":case"float64":return parseFloat(e)}}function a(e,t){for(var r=t.split(/\s+/),s={},a=0;a<e.length;a++)if("list"===e[a].type){for(var i=[],o=n(r.shift(),e[a].countType),u=0;u<o;u++)i.push(n(r.shift(),e[a].itemType));s[e[a].name]=i}else s[e[a].name]=n(r.shift(),e[a].type);return s}function o(e,t){var r,n={indices:[],vertices:[],normals:[],uvs:[],faceVertexUvs:[],colors:[]},s="";null!==(r=/end_header\s([\s\S]*)$/.exec(e))&&(s=r[1]);for(var i=s.split("\n"),o=0,u=0,f=0;f<i.length;f++){var p=i[f];if(""!==(p=p.trim())){u>=t.elements[o].count&&(o++,u=0);var h=a(t.elements[o].properties,p);c(n,t.elements[o].name,h),u++}}return l(n)}function l(e){var t=new r.BufferGeometry;return e.indices.length>0&&t.setIndex(e.indices),t.setAttribute("position",new s.Float32BufferAttribute(e.vertices,3)),e.normals.length>0&&t.setAttribute("normal",new s.Float32BufferAttribute(e.normals,3)),e.uvs.length>0&&t.setAttribute("uv",new s.Float32BufferAttribute(e.uvs,2)),e.colors.length>0&&t.setAttribute("color",new s.Float32BufferAttribute(e.colors,3)),e.faceVertexUvs.length>0&&(t=t.toNonIndexed()).setAttribute("uv",new s.Float32BufferAttribute(e.faceVertexUvs,2)),t.computeBoundingSphere(),t}function c(e,t,r){function n(e){for(var t=0,n=e.length;t<n;t++){var s=e[t];if(s in r)return s}return null}var s=n(["x","px","posx"])||"x",a=n(["y","py","posy"])||"y",i=n(["z","pz","posz"])||"z",o=n(["nx","normalx"]),l=n(["ny","normaly"]),c=n(["nz","normalz"]),f=n(["s","u","texture_u","tx"]),p=n(["t","v","texture_v","ty"]),h=n(["red","diffuse_red","r","diffuse_r"]),m=n(["green","diffuse_green","g","diffuse_g"]),v=n(["blue","diffuse_blue","b","diffuse_b"]);if("vertex"===t)e.vertices.push(r[s],r[a],r[i]),null!==o&&null!==l&&null!==c&&e.normals.push(r[o],r[l],r[c]),null!==f&&null!==p&&e.uvs.push(r[f],r[p]),null!==h&&null!==m&&null!==v&&(u.setRGB(r[h]/255,r[m]/255,r[v]/255).convertSRGBToLinear(),e.colors.push(u.r,u.g,u.b));else if("face"===t){var d=r.vertex_indices||r.vertex_index,g=r.texcoord;3===d.length?(e.indices.push(d[0],d[1],d[2]),g&&6===g.length&&(e.faceVertexUvs.push(g[0],g[1]),e.faceVertexUvs.push(g[2],g[3]),e.faceVertexUvs.push(g[4],g[5]))):4===d.length&&(e.indices.push(d[0],d[1],d[3]),e.indices.push(d[1],d[2],d[3]))}}function f(e,t,r,n){switch(r){case"int8":case"char":return[e.getInt8(t),1];case"uint8":case"uchar":return[e.getUint8(t),1];case"int16":case"short":return[e.getInt16(t,n),2];case"uint16":case"ushort":return[e.getUint16(t,n),2];case"int32":case"int":return[e.getInt32(t,n),4];case"uint32":case"uint":return[e.getUint32(t,n),4];case"float32":case"float":return[e.getFloat32(t,n),4];case"float64":case"double":return[e.getFloat64(t,n),8]}}function p(e,t,r,n){for(var s,a={},i=0,o=0;o<r.length;o++)if("list"===r[o].type){var u=[],l=(s=f(e,t+i,r[o].countType,n))[0];i+=s[1];for(var c=0;c<l;c++)s=f(e,t+i,r[o].itemType,n),u.push(s[0]),i+=s[1];a[r[o].name]=u}else s=f(e,t+i,r[o].type,n),a[r[o].name]=s[0],i+=s[1];return[a,i]}var h,m=this;if(e instanceof ArrayBuffer){var v=i.LoaderUtils.decodeText(new Uint8Array(e)),d=t(v);h="ascii"===d.format?o(v,d):function(e,t){for(var r,n={indices:[],vertices:[],normals:[],uvs:[],faceVertexUvs:[],colors:[]},s="binary_little_endian"===t.format,a=new DataView(e,t.headerLength),i=0,o=0;o<t.elements.length;o++)for(var u=0;u<t.elements[o].count;u++){i+=(r=p(a,i,t.elements[o].properties,s))[1];var f=r[0];c(n,t.elements[o].name,f)}return l(n)}(e,d)}else h=o(e,t(e));return h},a}(a.Loader);e.PLYLoader=l,Object.defineProperty(e,"__esModule",{value:!0})}));
