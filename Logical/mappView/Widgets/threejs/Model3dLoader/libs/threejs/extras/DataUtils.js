/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../math/MathUtils"],(function(a,e){"use strict";var r=u(),t=r.floatView,n=r.uint32View,o=r.baseTable,f=r.shiftTable,l=r.mantissaTable,i=r.exponentTable,s=r.offsetTable;function u(){for(var a=new ArrayBuffer(4),e=new Float32Array(a),r=new Uint32Array(a),t=new Uint32Array(512),n=new Uint32Array(512),o=0;o<256;++o){var f=o-127;f<-27?(t[o]=0,t[256|o]=32768,n[o]=24,n[256|o]=24):f<-14?(t[o]=1024>>-f-14,t[256|o]=1024>>-f-14|32768,n[o]=-f-1,n[256|o]=-f-1):f<=15?(t[o]=f+15<<10,t[256|o]=f+15<<10|32768,n[o]=13,n[256|o]=13):f<128?(t[o]=31744,t[256|o]=64512,n[o]=24,n[256|o]=24):(t[o]=31744,t[256|o]=64512,n[o]=13,n[256|o]=13)}for(var l=new Uint32Array(2048),i=new Uint32Array(64),s=new Uint32Array(64),u=1;u<1024;++u){for(var b=u<<13,w=0;0==(8388608&b);)b<<=1,w-=8388608;b&=-8388609,w+=947912704,l[u]=b|w}for(var v=1024;v<2048;++v)l[v]=939524096+(v-1024<<13);for(var T=1;T<31;++T)i[T]=T<<23;i[31]=1199570944,i[32]=2147483648;for(var y=33;y<63;++y)i[y]=2147483648+(y-32<<23);i[63]=3347054592;for(var c=1;c<64;++c)32!==c&&(s[c]=1024);return{floatView:e,uint32View:r,baseTable:t,shiftTable:n,mantissaTable:l,exponentTable:i,offsetTable:s}}a.fromHalfFloat=function(a){var e=a>>10;return n[0]=l[s[e]+(1023&a)]+i[e],t[0]},a.toHalfFloat=function(a){Math.abs(a)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),a=e.clamp(a,-65504,65504),t[0]=a;var r=n[0],l=r>>23&511;return o[l]+((8388607&r)>>f[l])},Object.defineProperty(a,"__esModule",{value:!0})}));
