/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports"],(function(e){"use strict";e.WebGLBindingStates=function(e,t,r,i){var n=e.getParameter(34921),a=i.isWebGL2?null:t.get("OES_vertex_array_object"),o=i.isWebGL2||null!==a,s={},u=d(null),f=u,c=!1;function l(t){return i.isWebGL2?e.bindVertexArray(t):a.bindVertexArrayOES(t)}function v(t){return i.isWebGL2?e.deleteVertexArray(t):a.deleteVertexArrayOES(t)}function d(e){for(var t=[],r=[],i=[],a=0;a<n;a++)t[a]=0,r[a]=0,i[a]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function b(){for(var e=f.newAttributes,t=0,r=e.length;t<r;t++)e[t]=0}function A(e){x(e,0)}function x(r,n){var a=f.newAttributes,o=f.enabledAttributes,s=f.attributeDivisors;(a[r]=1,0===o[r]&&(e.enableVertexAttribArray(r),o[r]=1),s[r]!==n)&&((i.isWebGL2?e:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](r,n),s[r]=n)}function m(){for(var t=f.newAttributes,r=f.enabledAttributes,i=0,n=r.length;i<n;i++)r[i]!==t[i]&&(e.disableVertexAttribArray(i),r[i]=0)}function g(t,r,n,a,o,s){!0!==i.isWebGL2||5124!==n&&5125!==n?e.vertexAttribPointer(t,r,n,a,o,s):e.vertexAttribIPointer(t,r,n,o,s)}function y(){S(),c=!0,f!==u&&l((f=u).object)}function S(){u.geometry=null,u.program=null,u.wireframe=!1}return{setup:function(n,u,v,y,S){var G=!1;if(o){var C=function(t,r,n){var o=!0===n.wireframe,u=s[t.id];void 0===u&&(u={},s[t.id]=u);var f=u[r.id];void 0===f&&(f={},u[r.id]=f);var c=f[o];void 0===c&&(c=d(i.isWebGL2?e.createVertexArray():a.createVertexArrayOES()),f[o]=c);return c}(y,v,u);f!==C&&l((f=C).object),G=function(e,t,r,i){var n=f.attributes,a=t.attributes,o=0,s=r.getAttributes();for(var u in s){if(s[u].location>=0){var c=n[u],l=a[u];if(void 0===l&&("instanceMatrix"===u&&e.instanceMatrix&&(l=e.instanceMatrix),"instanceColor"===u&&e.instanceColor&&(l=e.instanceColor)),void 0===c)return!0;if(c.attribute!==l)return!0;if(l&&c.data!==l.data)return!0;o++}}return f.attributesNum!==o||f.index!==i}(n,y,v,S),G&&function(e,t,r,i){var n={},a=t.attributes,o=0,s=r.getAttributes();for(var u in s){if(s[u].location>=0){var c=a[u];void 0===c&&("instanceMatrix"===u&&e.instanceMatrix&&(c=e.instanceMatrix),"instanceColor"===u&&e.instanceColor&&(c=e.instanceColor));var l={};l.attribute=c,c&&c.data&&(l.data=c.data),n[u]=l,o++}}f.attributes=n,f.attributesNum=o,f.index=i}(n,y,v,S)}else{var I=!0===u.wireframe;f.geometry===y.id&&f.program===v.id&&f.wireframe===I||(f.geometry=y.id,f.program=v.id,f.wireframe=I,G=!0)}null!==S&&r.update(S,34963),(G||c)&&(c=!1,function(n,a,o,s){if(!1===i.isWebGL2&&(n.isInstancedMesh||s.isInstancedBufferGeometry)&&null===t.get("ANGLE_instanced_arrays"))return;b();var u=s.attributes,f=o.getAttributes(),c=a.defaultAttributeValues;for(var l in f){var v=f[l];if(v.location>=0){var d=u[l];if(void 0===d&&("instanceMatrix"===l&&n.instanceMatrix&&(d=n.instanceMatrix),"instanceColor"===l&&n.instanceColor&&(d=n.instanceColor)),void 0!==d){var y=d.normalized,S=d.itemSize,G=r.get(d);if(void 0===G)continue;var C=G.buffer,I=G.type,L=G.bytesPerElement;if(d.isInterleavedBufferAttribute){var M=d.data,_=M.stride,z=d.offset;if(M.isInstancedInterleavedBuffer){for(var h=0;h<v.locationSize;h++)x(v.location+h,M.meshPerAttribute);!0!==n.isInstancedMesh&&void 0===s._maxInstanceCount&&(s._maxInstanceCount=M.meshPerAttribute*M.count)}else for(var w=0;w<v.locationSize;w++)A(v.location+w);e.bindBuffer(34962,C);for(var p=0;p<v.locationSize;p++)g(v.location+p,S/v.locationSize,I,y,_*L,(z+S/v.locationSize*p)*L)}else{if(d.isInstancedBufferAttribute){for(var P=0;P<v.locationSize;P++)x(v.location+P,d.meshPerAttribute);!0!==n.isInstancedMesh&&void 0===s._maxInstanceCount&&(s._maxInstanceCount=d.meshPerAttribute*d.count)}else for(var W=0;W<v.locationSize;W++)A(v.location+W);e.bindBuffer(34962,C);for(var V=0;V<v.locationSize;V++)g(v.location+V,S/v.locationSize,I,y,S*L,S/v.locationSize*V*L)}}else if(void 0!==c){var j=c[l];if(void 0!==j)switch(j.length){case 2:e.vertexAttrib2fv(v.location,j);break;case 3:e.vertexAttrib3fv(v.location,j);break;case 4:e.vertexAttrib4fv(v.location,j);break;default:e.vertexAttrib1fv(v.location,j)}}}}m()}(n,u,v,y),null!==S&&e.bindBuffer(34963,r.get(S).buffer))},reset:y,resetDefaultState:S,dispose:function(){for(var e in y(),s){var t=s[e];for(var r in t){var i=t[r];for(var n in i)v(i[n].object),delete i[n];delete t[r]}delete s[e]}},releaseStatesOfGeometry:function(e){if(void 0!==s[e.id]){var t=s[e.id];for(var r in t){var i=t[r];for(var n in i)v(i[n].object),delete i[n];delete t[r]}delete s[e.id]}},releaseStatesOfProgram:function(e){for(var t in s){var r=s[t];if(void 0!==r[e.id]){var i=r[e.id];for(var n in i)v(i[n].object),delete i[n];delete r[e.id]}}},initAttributes:b,enableAttribute:A,disableUnusedAttributes:m}},Object.defineProperty(e,"__esModule",{value:!0})}));