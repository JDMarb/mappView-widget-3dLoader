/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../_virtual/_rollupPluginBabelHelpers","./DataTextureLoader","../constants"],(function(e,r,a,o){"use strict";var t=function(e){function a(r){return e.call(this,r)||this}return r.inheritsLoose(a,e),a.prototype.parse=function(e){var r=0,a=1,t=2,i=3,n=9,s=10,l=11,c=48,d=4,p=0,h=1,f=2,u=3;e.length<19&&console.error("THREE.TGALoader: Not enough data to contain header.");var _=0,g=new Uint8Array(e),m={id_length:g[_++],colormap_type:g[_++],image_type:g[_++],colormap_index:g[_++]|g[_++]<<8,colormap_length:g[_++]|g[_++]<<8,colormap_size:g[_++],origin:[g[_++]|g[_++]<<8,g[_++]|g[_++]<<8],width:g[_++]|g[_++]<<8,height:g[_++]|g[_++]<<8,pixel_size:g[_++],flags:g[_++]};!function(e){switch(e.image_type){case a:case n:(e.colormap_length>256||24!==e.colormap_size||1!==e.colormap_type)&&console.error("THREE.TGALoader: Invalid type colormap data for indexed type.");break;case t:case i:case s:case l:e.colormap_type&&console.error("THREE.TGALoader: Invalid type colormap data for colormap type.");break;case r:console.error("THREE.TGALoader: No data.");default:console.error('THREE.TGALoader: Invalid type "%s".',e.image_type)}(e.width<=0||e.height<=0)&&console.error("THREE.TGALoader: Invalid image size."),8!==e.pixel_size&&16!==e.pixel_size&&24!==e.pixel_size&&32!==e.pixel_size&&console.error('THREE.TGALoader: Invalid pixel size "%s".',e.pixel_size)}(m),m.id_length+_>e.length&&console.error("THREE.TGALoader: No data."),_+=m.id_length;var w=!1,T=!1,v=!1;switch(m.image_type){case n:w=!0,T=!0;break;case a:T=!0;break;case s:w=!0;break;case t:break;case l:w=!0,v=!0;break;case i:v=!0}var b=new Uint8Array(m.width*m.height*4),y=function(e,r,a,o,t){var i,n,s=a.pixel_size>>3,l=a.width*a.height*s;if(r&&(n=t.subarray(o,o+=a.colormap_length*(a.colormap_size>>3))),e){var c,d,p;i=new Uint8Array(l);for(var h=0,f=new Uint8Array(s);h<l;)if(d=1+(127&(c=t[o++])),128&c){for(p=0;p<s;++p)f[p]=t[o++];for(p=0;p<d;++p)i.set(f,h+p*s);h+=s*d}else{for(d*=s,p=0;p<d;++p)i[h+p]=t[o++];h+=d}}else i=t.subarray(o,o+=r?a.width*a.height:l);return{pixel_data:i,palettes:n}}(w,T,m,_,g);return function(e,r,a,o,t){var i,n,s,l,_,g;switch((m.flags&c)>>d){default:case f:i=0,s=1,_=r,n=0,l=1,g=a;break;case p:i=0,s=1,_=r,n=a-1,l=-1,g=-1;break;case u:i=r-1,s=-1,_=-1,n=0,l=1,g=a;break;case h:i=r-1,s=-1,_=-1,n=a-1,l=-1,g=-1}if(v)switch(m.pixel_size){case 8:!function(e,r,a,o,t,i,n,s){var l,c,d,p=0,h=m.width;for(d=r;d!==o;d+=a)for(c=t;c!==n;c+=i,p++)l=s[p],e[4*(c+h*d)+0]=l,e[4*(c+h*d)+1]=l,e[4*(c+h*d)+2]=l,e[4*(c+h*d)+3]=255}(e,n,l,g,i,s,_,o);break;case 16:!function(e,r,a,o,t,i,n,s){var l,c,d=0,p=m.width;for(c=r;c!==o;c+=a)for(l=t;l!==n;l+=i,d+=2)e[4*(l+p*c)+0]=s[d+0],e[4*(l+p*c)+1]=s[d+0],e[4*(l+p*c)+2]=s[d+0],e[4*(l+p*c)+3]=s[d+1]}(e,n,l,g,i,s,_,o);break;default:console.error("THREE.TGALoader: Format not supported.")}else switch(m.pixel_size){case 8:!function(e,r,a,o,t,i,n,s,l){var c,d,p,h=l,f=0,u=m.width;for(p=r;p!==o;p+=a)for(d=t;d!==n;d+=i,f++)c=s[f],e[4*(d+u*p)+3]=255,e[4*(d+u*p)+2]=h[3*c+0],e[4*(d+u*p)+1]=h[3*c+1],e[4*(d+u*p)+0]=h[3*c+2]}(e,n,l,g,i,s,_,o,t);break;case 16:!function(e,r,a,o,t,i,n,s){var l,c,d,p=0,h=m.width;for(d=r;d!==o;d+=a)for(c=t;c!==n;c+=i,p+=2)l=s[p+0]+(s[p+1]<<8),e[4*(c+h*d)+0]=(31744&l)>>7,e[4*(c+h*d)+1]=(992&l)>>2,e[4*(c+h*d)+2]=(31&l)<<3,e[4*(c+h*d)+3]=32768&l?0:255}(e,n,l,g,i,s,_,o);break;case 24:!function(e,r,a,o,t,i,n,s){var l,c,d=0,p=m.width;for(c=r;c!==o;c+=a)for(l=t;l!==n;l+=i,d+=3)e[4*(l+p*c)+3]=255,e[4*(l+p*c)+2]=s[d+0],e[4*(l+p*c)+1]=s[d+1],e[4*(l+p*c)+0]=s[d+2]}(e,n,l,g,i,s,_,o);break;case 32:!function(e,r,a,o,t,i,n,s){var l,c,d=0,p=m.width;for(c=r;c!==o;c+=a)for(l=t;l!==n;l+=i,d+=4)e[4*(l+p*c)+2]=s[d+0],e[4*(l+p*c)+1]=s[d+1],e[4*(l+p*c)+0]=s[d+2],e[4*(l+p*c)+3]=s[d+3]}(e,n,l,g,i,s,_,o);break;default:console.error("THREE.TGALoader: Format not supported.")}}(b,m.width,m.height,y.pixel_data,y.palettes),{data:b,width:m.width,height:m.height,flipY:!0,generateMipmaps:!0,minFilter:o.LinearMipmapLinearFilter}},a}(a.DataTextureLoader);e.TGALoader=t,Object.defineProperty(e,"__esModule",{value:!0})}));
