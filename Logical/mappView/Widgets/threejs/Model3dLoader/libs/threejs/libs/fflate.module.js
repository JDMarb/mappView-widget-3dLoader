/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports"],(function(t){"use strict";
/*!
   fflate - fast JavaScript compression/decompression
   <https://101arrowz.github.io/fflate>
   Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
   version 0.6.9
   */var n={},r=function(t){return URL.createObjectURL(new Blob([t],{type:"text/javascript"}))},i=function(t){return new Worker(t)};try{URL.revokeObjectURL(r(""))}catch(t){r=function(t){return"data:application/javascript;charset=UTF-8,"+encodeURI(t)},i=function(t){return new Worker(t,{type:"module"})}}var e=Uint8Array,o=Uint16Array,a=Uint32Array,f=new e([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),s=new e([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),u=new e([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),h=function(t,n){for(var r=new o(31),i=0;i<31;++i)r[i]=n+=1<<t[i-1];var e=new a(r[30]);for(i=1;i<30;++i)for(var f=r[i];f<r[i+1];++f)e[f]=f-r[i]<<5|i;return[r,e]},c=h(f,2),l=c[0],p=c[1];l[28]=258,p[258]=28;for(var v=h(s,0),d=v[0],g=v[1],w=new o(32768),y=0;y<32768;++y){var m=(43690&y)>>>1|(21845&y)<<1;m=(61680&(m=(52428&m)>>>2|(13107&m)<<2))>>>4|(3855&m)<<4,w[y]=((65280&m)>>>8|(255&m)<<8)>>>1}var b=function(t,n,r){for(var i=t.length,e=0,a=new o(n);e<i;++e)++a[t[e]-1];var f,s=new o(n);for(e=0;e<n;++e)s[e]=s[e-1]+a[e-1]<<1;if(r){f=new o(1<<n);var u=15-n;for(e=0;e<i;++e)if(t[e])for(var h=e<<4|t[e],c=n-t[e],l=s[t[e]-1]++<<c,p=l|(1<<c)-1;l<=p;++l)f[w[l]>>>u]=h}else for(f=new o(i),e=0;e<i;++e)t[e]&&(f[e]=w[s[t[e]-1]++]>>>15-t[e]);return f},z=new e(288);for(y=0;y<144;++y)z[y]=8;for(y=144;y<256;++y)z[y]=9;for(y=256;y<280;++y)z[y]=7;for(y=280;y<288;++y)z[y]=8;var k=new e(32);for(y=0;y<32;++y)k[y]=5;var x=b(z,9,0),M=b(z,9,1),S=b(k,5,0),A=b(k,5,1),U=function(t){for(var n=t[0],r=1;r<t.length;++r)t[r]>n&&(n=t[r]);return n},C=function(t,n,r){var i=n/8|0;return(t[i]|t[i+1]<<8)>>(7&n)&r},D=function(t,n){var r=n/8|0;return(t[r]|t[r+1]<<8|t[r+2]<<16)>>(7&n)},O=function(t){return(t/8|0)+(7&t&&1)},T=function(t,n,r){(null==n||n<0)&&(n=0),(null==r||r>t.length)&&(r=t.length);var i=new(t instanceof o?o:t instanceof a?a:e)(r-n);return i.set(t.subarray(n,r)),i},I=function(t,n,r){var i=t.length;if(!i||r&&!r.l&&i<5)return n||new e(0);var o=!n||r,a=!r||r.i;r||(r={}),n||(n=new e(3*i));var h=function(t){var r=n.length;if(t>r){var i=new e(Math.max(2*r,t));i.set(n),n=i}},c=r.f||0,p=r.p||0,v=r.b||0,g=r.l,w=r.d,y=r.m,m=r.n,z=8*i;do{if(!g){r.f=c=C(t,p,1);var k=C(t,p+1,3);if(p+=3,!k){var x=t[(W=O(p)+4)-4]|t[W-3]<<8,S=W+x;if(S>i){if(a)throw"unexpected EOF";break}o&&h(v+x),n.set(t.subarray(W,S),v),r.b=v+=x,r.p=p=8*S;continue}if(1==k)g=M,w=A,y=9,m=5;else{if(2!=k)throw"invalid block type";var I=C(t,p,31)+257,Z=C(t,p+10,15)+4,F=I+C(t,p+5,31)+1;p+=14;for(var E=new e(F),G=new e(19),j=0;j<Z;++j)G[u[j]]=C(t,p+3*j,7);p+=3*Z;var R=U(G),L=(1<<R)-1,P=b(G,R,1);for(j=0;j<F;){var W,_=P[C(t,p,L)];if(p+=15&_,(W=_>>>4)<16)E[j++]=W;else{var B=0,H=0;for(16==W?(H=3+C(t,p,3),p+=2,B=E[j-1]):17==W?(H=3+C(t,p,7),p+=3):18==W&&(H=11+C(t,p,127),p+=7);H--;)E[j++]=B}}var Y=E.subarray(0,I),q=E.subarray(I);y=U(Y),m=U(q),g=b(Y,y,1),w=b(q,m,1)}if(p>z){if(a)throw"unexpected EOF";break}}o&&h(v+131072);for(var J=(1<<y)-1,K=(1<<m)-1,N=p;;N=p){var Q=(B=g[D(t,p)&J])>>>4;if((p+=15&B)>z){if(a)throw"unexpected EOF";break}if(!B)throw"invalid length/literal";if(Q<256)n[v++]=Q;else{if(256==Q){N=p,g=null;break}var V=Q-254;if(Q>264){var X=f[j=Q-257];V=C(t,p,(1<<X)-1)+l[j],p+=X}var $=w[D(t,p)&K],tt=$>>>4;if(!$)throw"invalid distance";p+=15&$;q=d[tt];if(tt>3){X=s[tt];q+=D(t,p)&(1<<X)-1,p+=X}if(p>z){if(a)throw"unexpected EOF";break}o&&h(v+131072);for(var nt=v+V;v<nt;v+=4)n[v]=n[v-q],n[v+1]=n[v+1-q],n[v+2]=n[v+2-q],n[v+3]=n[v+3-q];v=nt}}r.l=g,r.p=N,r.b=v,g&&(c=1,r.m=y,r.d=w,r.n=m)}while(!c);return v==n.length?n:T(n,0,v)},Z=function(t,n,r){r<<=7&n;var i=n/8|0;t[i]|=r,t[i+1]|=r>>>8},F=function(t,n,r){r<<=7&n;var i=n/8|0;t[i]|=r,t[i+1]|=r>>>8,t[i+2]|=r>>>16},E=function(t,n){for(var r=[],i=0;i<t.length;++i)t[i]&&r.push({s:i,f:t[i]});var a=r.length,f=r.slice();if(!a)return[_,0];if(1==a){var s=new e(r[0].s+1);return s[r[0].s]=1,[s,1]}r.sort((function(t,n){return t.f-n.f})),r.push({s:-1,f:25001});var u=r[0],h=r[1],c=0,l=1,p=2;for(r[0]={s:-1,f:u.f+h.f,l:u,r:h};l!=a-1;)u=r[r[c].f<r[p].f?c++:p++],h=r[c!=l&&r[c].f<r[p].f?c++:p++],r[l++]={s:-1,f:u.f+h.f,l:u,r:h};var v=f[0].s;for(i=1;i<a;++i)f[i].s>v&&(v=f[i].s);var d=new o(v+1),g=G(r[l-1],d,0);if(g>n){i=0;var w=0,y=g-n,m=1<<y;for(f.sort((function(t,n){return d[n.s]-d[t.s]||t.f-n.f}));i<a;++i){var b=f[i].s;if(!(d[b]>n))break;w+=m-(1<<g-d[b]),d[b]=n}for(w>>>=y;w>0;){var z=f[i].s;d[z]<n?w-=1<<n-d[z]++-1:++i}for(;i>=0&&w;--i){var k=f[i].s;d[k]==n&&(--d[k],++w)}g=n}return[new e(d),g]},G=function t(n,r,i){return-1==n.s?Math.max(t(n.l,r,i+1),t(n.r,r,i+1)):r[n.s]=i},j=function(t){for(var n=t.length;n&&!t[--n];);for(var r=new o(++n),i=0,e=t[0],a=1,f=function(t){r[i++]=t},s=1;s<=n;++s)if(t[s]==e&&s!=n)++a;else{if(!e&&a>2){for(;a>138;a-=138)f(32754);a>2&&(f(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(f(e),--a;a>6;a-=6)f(8304);a>2&&(f(a-3<<5|8208),a=0)}for(;a--;)f(e);a=1,e=t[s]}return[r.subarray(0,i),n]},R=function(t,n){for(var r=0,i=0;i<n.length;++i)r+=t[i]*n[i];return r},L=function(t,n,r){var i=r.length,e=O(n+2);t[e]=255&i,t[e+1]=i>>>8,t[e+2]=255^t[e],t[e+3]=255^t[e+1];for(var o=0;o<i;++o)t[e+o+4]=r[o];return 8*(e+4+i)},P=function(t,n,r,i,e,a,h,c,l,p,v){Z(n,v++,r),++e[256];for(var d=E(e,15),g=d[0],w=d[1],y=E(a,15),m=y[0],M=y[1],A=j(g),U=A[0],C=A[1],D=j(m),O=D[0],T=D[1],I=new o(19),G=0;G<U.length;++G)I[31&U[G]]++;for(G=0;G<O.length;++G)I[31&O[G]]++;for(var P=E(I,7),W=P[0],_=P[1],B=19;B>4&&!W[u[B-1]];--B);var H,Y,q,J,K=p+5<<3,N=R(e,z)+R(a,k)+h,Q=R(e,g)+R(a,m)+h+14+3*B+R(I,W)+(2*I[16]+3*I[17]+7*I[18]);if(K<=N&&K<=Q)return L(n,v,t.subarray(l,l+p));if(Z(n,v,1+(Q<N)),v+=2,Q<N){H=b(g,w,0),Y=g,q=b(m,M,0),J=m;var V=b(W,_,0);Z(n,v,C-257),Z(n,v+5,T-1),Z(n,v+10,B-4),v+=14;for(G=0;G<B;++G)Z(n,v+3*G,W[u[G]]);v+=3*B;for(var X=[U,O],$=0;$<2;++$){var tt=X[$];for(G=0;G<tt.length;++G){var nt=31&tt[G];Z(n,v,V[nt]),v+=W[nt],nt>15&&(Z(n,v,tt[G]>>>5&127),v+=tt[G]>>>12)}}}else H=x,Y=z,q=S,J=k;for(G=0;G<c;++G)if(i[G]>255){nt=i[G]>>>18&31;F(n,v,H[nt+257]),v+=Y[nt+257],nt>7&&(Z(n,v,i[G]>>>23&31),v+=f[nt]);var rt=31&i[G];F(n,v,q[rt]),v+=J[rt],rt>3&&(F(n,v,i[G]>>>5&8191),v+=s[rt])}else F(n,v,H[i[G]]),v+=Y[i[G]];return F(n,v,H[256]),v+Y[256]},W=new a([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),_=new e(0),B=function(t,n,r,i,u,h){var c=t.length,l=new e(i+c+5*(1+Math.ceil(c/7e3))+u),v=l.subarray(i,l.length-u),d=0;if(!n||c<8)for(var w=0;w<=c;w+=65535){var y=w+65535;y<c?d=L(v,d,t.subarray(w,y)):(v[w]=h,d=L(v,d,t.subarray(w,c)))}else{for(var m=W[n-1],b=m>>>13,z=8191&m,k=(1<<r)-1,x=new o(32768),M=new o(k+1),S=Math.ceil(r/3),A=2*S,U=function(n){return(t[n]^t[n+1]<<S^t[n+2]<<A)&k},C=new a(25e3),D=new o(288),I=new o(32),Z=0,F=0,E=(w=0,0),G=0,j=0;w<c;++w){var R=U(w),B=32767&w,H=M[R];if(x[B]=H,M[R]=B,G<=w){var Y=c-w;if((Z>7e3||E>24576)&&Y>423){d=P(t,v,0,C,D,I,F,E,j,w-j,d),E=Z=F=0,j=w;for(var q=0;q<286;++q)D[q]=0;for(q=0;q<30;++q)I[q]=0}var J=2,K=0,N=z,Q=B-H&32767;if(Y>2&&R==U(w-Q))for(var V=Math.min(b,Y)-1,X=Math.min(32767,w),$=Math.min(258,Y);Q<=X&&--N&&B!=H;){if(t[w+J]==t[w+J-Q]){for(var tt=0;tt<$&&t[w+tt]==t[w+tt-Q];++tt);if(tt>J){if(J=tt,K=Q,tt>V)break;var nt=Math.min(Q,tt-2),rt=0;for(q=0;q<nt;++q){var it=w-Q+q+32768&32767,et=it-x[it]+32768&32767;et>rt&&(rt=et,H=it)}}}Q+=(B=H)-(H=x[B])+32768&32767}if(K){C[E++]=268435456|p[J]<<18|g[K];var ot=31&p[J],at=31&g[K];F+=f[ot]+s[at],++D[257+ot],++I[at],G=w+J,++Z}else C[E++]=t[w],++D[t[w]]}}d=P(t,v,h,C,D,I,F,E,j,w-j,d),!h&&7&d&&(d=L(v,d+1,_))}return T(l,0,i+O(d)+u)},H=function(){for(var t=new a(256),n=0;n<256;++n){for(var r=n,i=9;--i;)r=(1&r&&3988292384)^r>>>1;t[n]=r}return t}(),Y=function(){var t=-1;return{p:function(n){for(var r=t,i=0;i<n.length;++i)r=H[255&r^n[i]]^r>>>8;t=r},d:function(){return~t}}},q=function(){var t=1,n=0;return{p:function(r){for(var i=t,e=n,o=r.length,a=0;a!=o;){for(var f=Math.min(a+2655,o);a<f;++a)e+=i+=r[a];i=(65535&i)+15*(i>>16),e=(65535&e)+15*(e>>16)}t=i,n=e},d:function(){return(255&(t%=65521))<<24|t>>>8<<16|(255&(n%=65521))<<8|n>>>8}}},J=function(t,n,r,i,e){return B(t,null==n.level?6:n.level,null==n.mem?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(t.length)))):12+n.mem,r,i,!e)},K=function(t,n){var r={};for(var i in t)r[i]=t[i];for(var i in n)r[i]=n[i];return r},N=function(t,n,r){for(var i=t(),e=t.toString(),o=e.slice(e.indexOf("[")+1,e.lastIndexOf("]")).replace(/ /g,"").split(","),a=0;a<i.length;++a){var f=i[a],s=o[a];if("function"==typeof f){n+=";"+s+"=";var u=f.toString();if(f.prototype)if(-1!=u.indexOf("[native code]")){var h=u.indexOf(" ",8)+1;n+=u.slice(h,u.indexOf("(",h))}else for(var c in n+=u,f.prototype)n+=";"+s+".prototype."+c+"="+f.prototype[c].toString();else n+=u}else r[s]=f}return[n,r]},Q=[],V=function(t,f,s,u){var h;if(!Q[s]){for(var c="",l={},p=t.length-1,v=0;v<p;++v)c=(h=N(t[v],c,l))[0],l=h[1];Q[s]=N(t[p],c,l)}var d=K({},Q[s][1]);return function(t,e,o,a,f){var s=i(n[e]||(n[e]=r(t)));return s.onerror=function(t){return f(t.error,null)},s.onmessage=function(t){return f(null,t.data)},s.postMessage(o,a),s}(Q[s][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+f.toString()+"}",s,d,function(t){var n=[];for(var r in t)(t[r]instanceof e||t[r]instanceof o||t[r]instanceof a)&&n.push((t[r]=new t[r].constructor(t[r])).buffer);return n}(d),u)},X=function(){return[e,o,a,f,s,u,l,d,M,A,w,b,U,C,D,O,T,I,Ut,et,ot]},$=function(){return[e,o,a,f,s,u,p,g,x,z,S,k,w,W,_,b,Z,F,E,G,j,R,L,P,O,T,B,J,xt,et]},tt=function(){return[pt,gt,lt,Y,H]},nt=function(){return[vt,dt]},rt=function(){return[wt,lt,q]},it=function(){return[yt]},et=function(t){return postMessage(t,[t.buffer])},ot=function(t){return t&&t.size&&new e(t.size)},at=function(t,n,r,i,e,o){var a=V(r,i,e,(function(t,n){a.terminate(),o(t,n)}));return a.postMessage([t,n],n.consume?[t.buffer]:[]),function(){a.terminate()}},ft=function(t){return t.ondata=function(t,n){return postMessage([t,n],[t.buffer])},function(n){return t.push(n.data[0],n.data[1])}},st=function(t,n,r,i,e){var o,a=V(t,i,e,(function(t,r){t?(a.terminate(),n.ondata.call(n,t)):(r[1]&&a.terminate(),n.ondata.call(n,t,r[0],r[1]))}));a.postMessage(r),n.push=function(t,r){if(o)throw"stream finished";if(!n.ondata)throw"no stream handler";a.postMessage([t,o=r],[t.buffer])},n.terminate=function(){a.terminate()}},ut=function(t,n){return t[n]|t[n+1]<<8},ht=function(t,n){return(t[n]|t[n+1]<<8|t[n+2]<<16|t[n+3]<<24)>>>0},ct=function(t,n){return ht(t,n)+4294967296*ht(t,n+4)},lt=function(t,n,r){for(;r;++n)t[n]=r,r>>>=8},pt=function(t,n){var r=n.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=n.level<2?4:9==n.level?2:0,t[9]=3,0!=n.mtime&&lt(t,4,Math.floor(new Date(n.mtime||Date.now())/1e3)),r){t[3]=8;for(var i=0;i<=r.length;++i)t[i+10]=r.charCodeAt(i)}},vt=function(t){if(31!=t[0]||139!=t[1]||8!=t[2])throw"invalid gzip data";var n=t[3],r=10;4&n&&(r+=t[10]|2+(t[11]<<8));for(var i=(n>>3&1)+(n>>4&1);i>0;i-=!t[r++]);return r+(2&n)},dt=function(t){var n=t.length;return(t[n-4]|t[n-3]<<8|t[n-2]<<16|t[n-1]<<24)>>>0},gt=function(t){return 10+(t.filename&&t.filename.length+1||0)},wt=function(t,n){var r=n.level,i=0==r?0:r<6?1:9==r?3:2;t[0]=120,t[1]=i<<6|(i?32-2*i:1)},yt=function(t){if(8!=(15&t[0])||t[0]>>>4>7||(t[0]<<8|t[1])%31)throw"invalid zlib data";if(32&t[1])throw"invalid zlib data: preset dictionaries not supported"};function mt(t,n){return n||"function"!=typeof t||(n=t,t={}),this.ondata=n,t}var bt=function(){function t(t,n){n||"function"!=typeof t||(n=t,t={}),this.ondata=n,this.o=t||{}}return t.prototype.p=function(t,n){this.ondata(J(t,this.o,0,0,!n),n)},t.prototype.push=function(t,n){if(this.d)throw"stream finished";if(!this.ondata)throw"no stream handler";this.d=n,this.p(t,n||!1)},t}(),zt=function(){return function(t,n){st([$,function(){return[ft,bt]}],this,mt.call(this,t,n),(function(t){var n=new bt(t.data);onmessage=ft(n)}),6)}}();function kt(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw"no callback";return at(t,n,[$],(function(t){return et(xt(t.data[0],t.data[1]))}),0,r)}function xt(t,n){return J(t,n||{},0,0)}var Mt=function(){function t(t){this.s={},this.p=new e(0),this.ondata=t}return t.prototype.e=function(t){if(this.d)throw"stream finished";if(!this.ondata)throw"no stream handler";var n=this.p.length,r=new e(n+t.length);r.set(this.p),r.set(t,n),this.p=r},t.prototype.c=function(t){this.d=this.s.i=t||!1;var n=this.s.b,r=I(this.p,this.o,this.s);this.ondata(T(r,n,this.s.b),this.d),this.o=T(r,this.s.b-32768),this.s.b=this.o.length,this.p=T(this.p,this.s.p/8|0),this.s.p&=7},t.prototype.push=function(t,n){this.e(t),this.c(n)},t}(),St=function(){return function(t){this.ondata=t,st([X,function(){return[ft,Mt]}],this,0,(function(){var t=new Mt;onmessage=ft(t)}),7)}}();function At(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw"no callback";return at(t,n,[X],(function(t){return et(Ut(t.data[0],ot(t.data[1])))}),1,r)}function Ut(t,n){return I(t,n)}var Ct=function(){function t(t,n){this.c=Y(),this.l=0,this.v=1,bt.call(this,t,n)}return t.prototype.push=function(t,n){bt.prototype.push.call(this,t,n)},t.prototype.p=function(t,n){this.c.p(t),this.l+=t.length;var r=J(t,this.o,this.v&&gt(this.o),n&&8,!n);this.v&&(pt(r,this.o),this.v=0),n&&(lt(r,r.length-8,this.c.d()),lt(r,r.length-4,this.l)),this.ondata(r,n)},t}(),Dt=function(){return function(t,n){st([$,tt,function(){return[ft,bt,Ct]}],this,mt.call(this,t,n),(function(t){var n=new Ct(t.data);onmessage=ft(n)}),8)}}();function Ot(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw"no callback";return at(t,n,[$,tt,function(){return[Tt]}],(function(t){return et(Tt(t.data[0],t.data[1]))}),2,r)}function Tt(t,n){n||(n={});var r=Y(),i=t.length;r.p(t);var e=J(t,n,gt(n),8),o=e.length;return pt(e,n),lt(e,o-8,r.d()),lt(e,o-4,i),e}var It=function(){function t(t){this.v=1,Mt.call(this,t)}return t.prototype.push=function(t,n){if(Mt.prototype.e.call(this,t),this.v){var r=this.p.length>3?vt(this.p):4;if(r>=this.p.length&&!n)return;this.p=this.p.subarray(r),this.v=0}if(n){if(this.p.length<8)throw"invalid gzip stream";this.p=this.p.subarray(0,-8)}Mt.prototype.c.call(this,n)},t}(),Zt=function(){return function(t){this.ondata=t,st([X,nt,function(){return[ft,Mt,It]}],this,0,(function(){var t=new It;onmessage=ft(t)}),9)}}();function Ft(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw"no callback";return at(t,n,[X,nt,function(){return[Et]}],(function(t){return et(Et(t.data[0]))}),3,r)}function Et(t,n){return I(t.subarray(vt(t),-8),n||new e(dt(t)))}var Gt=function(){function t(t,n){this.c=q(),this.v=1,bt.call(this,t,n)}return t.prototype.push=function(t,n){bt.prototype.push.call(this,t,n)},t.prototype.p=function(t,n){this.c.p(t);var r=J(t,this.o,this.v&&2,n&&4,!n);this.v&&(wt(r,this.o),this.v=0),n&&lt(r,r.length-4,this.c.d()),this.ondata(r,n)},t}(),jt=function(){return function(t,n){st([$,rt,function(){return[ft,bt,Gt]}],this,mt.call(this,t,n),(function(t){var n=new Gt(t.data);onmessage=ft(n)}),10)}}();function Rt(t,n){n||(n={});var r=q();r.p(t);var i=J(t,n,2,4);return wt(i,n),lt(i,i.length-4,r.d()),i}var Lt=function(){function t(t){this.v=1,Mt.call(this,t)}return t.prototype.push=function(t,n){if(Mt.prototype.e.call(this,t),this.v){if(this.p.length<2&&!n)return;this.p=this.p.subarray(2),this.v=0}if(n){if(this.p.length<4)throw"invalid zlib stream";this.p=this.p.subarray(0,-4)}Mt.prototype.c.call(this,n)},t}(),Pt=function(){return function(t){this.ondata=t,st([X,it,function(){return[ft,Mt,Lt]}],this,0,(function(){var t=new Lt;onmessage=ft(t)}),11)}}();function Wt(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw"no callback";return at(t,n,[X,it,function(){return[_t]}],(function(t){return et(_t(t.data[0],ot(t.data[1])))}),5,r)}function _t(t,n){return I((yt(t),t.subarray(2,-4)),n)}var Bt=function(){function t(t){this.G=It,this.I=Mt,this.Z=Lt,this.ondata=t}return t.prototype.push=function(t,n){if(!this.ondata)throw"no stream handler";if(this.s)this.s.push(t,n);else{if(this.p&&this.p.length){var r=new e(this.p.length+t.length);r.set(this.p),r.set(t,this.p.length)}else this.p=t;if(this.p.length>2){var i=this,o=function(){i.ondata.apply(i,arguments)};this.s=31==this.p[0]&&139==this.p[1]&&8==this.p[2]?new this.G(o):8!=(15&this.p[0])||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(o):new this.Z(o),this.s.push(this.p,n),this.p=null}}},t}(),Ht=function(){function t(t){this.G=Zt,this.I=St,this.Z=Pt,this.ondata=t}return t.prototype.push=function(t,n){Bt.prototype.push.call(this,t,n)},t}();var Yt=function t(n,r,i,o){for(var a in n){var f=n[a],s=r+a;f instanceof e?i[s]=[f,o]:Array.isArray(f)?i[s]=[f[0],K(o,f[1])]:t(f,s+"/",i,o)}},qt="undefined"!=typeof TextEncoder&&new TextEncoder,Jt="undefined"!=typeof TextDecoder&&new TextDecoder,Kt=0;try{Jt.decode(_,{stream:!0}),Kt=1}catch(t){}var Nt=function(t){for(var n="",r=0;;){var i=t[r++],e=(i>127)+(i>223)+(i>239);if(r+e>t.length)return[n,T(t,r-1)];e?3==e?(i=((15&i)<<18|(63&t[r++])<<12|(63&t[r++])<<6|63&t[r++])-65536,n+=String.fromCharCode(55296|i>>10,56320|1023&i)):n+=1&e?String.fromCharCode((31&i)<<6|63&t[r++]):String.fromCharCode((15&i)<<12|(63&t[r++])<<6|63&t[r++]):n+=String.fromCharCode(i)}},Qt=function(){function t(t){this.ondata=t,Kt?this.t=new TextDecoder:this.p=_}return t.prototype.push=function(t,n){if(!this.ondata)throw"no callback";if(n=!!n,this.t){if(this.ondata(this.t.decode(t,{stream:!0}),n),n){if(this.t.decode().length)throw"invalid utf-8 data";this.t=null}}else{if(!this.p)throw"stream finished";var r=new e(this.p.length+t.length);r.set(this.p),r.set(t,this.p.length);var i=Nt(r),o=i[0],a=i[1];if(n){if(a.length)throw"invalid utf-8 data";this.p=null}else this.p=a;this.ondata(o,n)}},t}(),Vt=function(){function t(t){this.ondata=t}return t.prototype.push=function(t,n){if(!this.ondata)throw"no callback";if(this.d)throw"stream finished";this.ondata(Xt(t),this.d=n||!1)},t}();function Xt(t,n){if(n){for(var r=new e(t.length),i=0;i<t.length;++i)r[i]=t.charCodeAt(i);return r}if(qt)return qt.encode(t);var o=t.length,a=new e(t.length+(t.length>>1)),f=0,s=function(t){a[f++]=t};for(i=0;i<o;++i){if(f+5>a.length){var u=new e(f+8+(o-i<<1));u.set(a),a=u}var h=t.charCodeAt(i);h<128||n?s(h):h<2048?(s(192|h>>6),s(128|63&h)):h>55295&&h<57344?(s(240|(h=65536+(1047552&h)|1023&t.charCodeAt(++i))>>18),s(128|h>>12&63),s(128|h>>6&63),s(128|63&h)):(s(224|h>>12),s(128|h>>6&63),s(128|63&h))}return T(a,0,f)}function $t(t,n){if(n){for(var r="",i=0;i<t.length;i+=16384)r+=String.fromCharCode.apply(null,t.subarray(i,i+16384));return r}if(Jt)return Jt.decode(t);var e=Nt(t),o=e[0];if(e[1].length)throw"invalid utf-8 data";return o}var tn=function(t){return 1==t?3:t<6?2:9==t?1:0},nn=function(t,n){return n+30+ut(t,n+26)+ut(t,n+28)},rn=function(t,n,r){var i=ut(t,n+28),e=$t(t.subarray(n+46,n+46+i),!(2048&ut(t,n+8))),o=n+46+i,a=ht(t,n+20),f=r&&4294967295==a?en(t,o):[a,ht(t,n+24),ht(t,n+42)],s=f[0],u=f[1],h=f[2];return[ut(t,n+10),s,u,e,o+ut(t,n+30)+ut(t,n+32),h]},en=function(t,n){for(;1!=ut(t,n);n+=4+ut(t,n+2));return[ct(t,n+12),ct(t,n+4),ct(t,n+20)]},on=function(t){var n=0;if(t)for(var r in t){var i=t[r].length;if(i>65535)throw"extra field too long";n+=i+4}return n},an=function(t,n,r,i,e,o,a,f){var s=i.length,u=r.extra,h=f&&f.length,c=on(u);lt(t,n,null!=a?33639248:67324752),n+=4,null!=a&&(t[n++]=20,t[n++]=r.os),t[n]=20,n+=2,t[n++]=r.flag<<1|(null==o&&8),t[n++]=e&&8,t[n++]=255&r.compression,t[n++]=r.compression>>8;var l=new Date(null==r.mtime?Date.now():r.mtime),p=l.getFullYear()-1980;if(p<0||p>119)throw"date not in range 1980-2099";if(lt(t,n,p<<25|l.getMonth()+1<<21|l.getDate()<<16|l.getHours()<<11|l.getMinutes()<<5|l.getSeconds()>>>1),n+=4,null!=o&&(lt(t,n,r.crc),lt(t,n+4,o),lt(t,n+8,r.size)),lt(t,n+12,s),lt(t,n+14,c),n+=16,null!=a&&(lt(t,n,h),lt(t,n+6,r.attrs),lt(t,n+10,a),n+=14),t.set(i,n),n+=s,c)for(var v in u){var d=u[v],g=d.length;lt(t,n,+v),lt(t,n+2,g),t.set(d,n+4),n+=4+g}return h&&(t.set(f,n),n+=h),n},fn=function(t,n,r,i,e){lt(t,n,101010256),lt(t,n+8,r),lt(t,n+10,r),lt(t,n+12,i),lt(t,n+16,e)},sn=function(){function t(t){this.filename=t,this.c=Y(),this.size=0,this.compression=0}return t.prototype.process=function(t,n){this.ondata(null,t,n)},t.prototype.push=function(t,n){if(!this.ondata)throw"no callback - add to ZIP archive before pushing";this.c.p(t),this.size+=t.length,n&&(this.crc=this.c.d()),this.process(t,n||!1)},t}(),un=function(){function t(t,n){var r=this;n||(n={}),sn.call(this,t),this.d=new bt(n,(function(t,n){r.ondata(null,t,n)})),this.compression=8,this.flag=tn(n.level)}return t.prototype.process=function(t,n){try{this.d.push(t,n)}catch(t){this.ondata(t,null,n)}},t.prototype.push=function(t,n){sn.prototype.push.call(this,t,n)},t}(),hn=function(){function t(t,n){var r=this;n||(n={}),sn.call(this,t),this.d=new zt(n,(function(t,n,i){r.ondata(t,n,i)})),this.compression=8,this.flag=tn(n.level),this.terminate=this.d.terminate}return t.prototype.process=function(t,n){this.d.push(t,n)},t.prototype.push=function(t,n){sn.prototype.push.call(this,t,n)},t}(),cn=function(){function t(t){this.ondata=t,this.u=[],this.d=1}return t.prototype.add=function(t){var n=this;if(2&this.d)throw"stream finished";var r=Xt(t.filename),i=r.length,o=t.comment,a=o&&Xt(o),f=i!=t.filename.length||a&&o.length!=a.length,s=i+on(t.extra)+30;if(i>65535)throw"filename too long";var u=new e(s);an(u,0,t,r,f);var h=[u],c=function(){for(var t=0,r=h;t<r.length;t++){var i=r[t];n.ondata(null,i,!1)}h=[]},l=this.d;this.d=0;var p=this.u.length,v=K(t,{f:r,u:f,o:a,t:function(){t.terminate&&t.terminate()},r:function(){if(c(),l){var t=n.u[p+1];t?t.r():n.d=1}l=1}}),d=0;t.ondata=function(r,i,o){if(r)n.ondata(r,i,o),n.terminate();else if(d+=i.length,h.push(i),o){var a=new e(16);lt(a,0,134695760),lt(a,4,t.crc),lt(a,8,d),lt(a,12,t.size),h.push(a),v.c=d,v.b=s+d+16,v.crc=t.crc,v.size=t.size,l&&v.r(),l=1}else l&&c()},this.u.push(v)},t.prototype.end=function(){var t=this;if(2&this.d){if(1&this.d)throw"stream finishing";throw"stream finished"}this.d?this.e():this.u.push({r:function(){1&t.d&&(t.u.splice(-1,1),t.e())},t:function(){}}),this.d=3},t.prototype.e=function(){for(var t=0,n=0,r=0,i=0,o=this.u;i<o.length;i++){r+=46+(u=o[i]).f.length+on(u.extra)+(u.o?u.o.length:0)}for(var a=new e(r+22),f=0,s=this.u;f<s.length;f++){var u=s[f];an(a,t,u,u.f,u.u,u.c,n,u.o),t+=46+u.f.length+on(u.extra)+(u.o?u.o.length:0),n+=u.b}fn(a,t,this.u.length,r,n),this.ondata(null,a,!0),this.d=2},t.prototype.terminate=function(){for(var t=0,n=this.u;t<n.length;t++){n[t].t()}this.d=2},t}();var ln=function(){function t(){}return t.prototype.push=function(t,n){this.ondata(null,t,n)},t.compression=0,t}(),pn=function(){function t(){var t=this;this.i=new Mt((function(n,r){t.ondata(null,n,r)}))}return t.prototype.push=function(t,n){try{this.i.push(t,n)}catch(r){this.ondata(r,t,n)}},t.compression=8,t}(),vn=function(){function t(t,n){var r=this;n<32e4?this.i=new Mt((function(t,n){r.ondata(null,t,n)})):(this.i=new St((function(t,n,i){r.ondata(t,n,i)})),this.terminate=this.i.terminate)}return t.prototype.push=function(t,n){this.i.terminate&&(t=T(t,0)),this.i.push(t,n)},t.compression=8,t}(),dn=function(){function t(t){this.onfile=t,this.k=[],this.o={0:ln},this.p=_}return t.prototype.push=function(t,n){var r=this;if(!this.onfile)throw"no callback";if(!this.p)throw"stream finished";if(this.c>0){var i=Math.min(this.c,t.length),o=t.subarray(0,i);if(this.c-=i,this.d?this.d.push(o,!this.c):this.k[0].push(o),(t=t.subarray(i)).length)return this.push(t,n)}else{var a=0,f=0,s=void 0,u=void 0;this.p.length?t.length?((u=new e(this.p.length+t.length)).set(this.p),u.set(t,this.p.length)):u=this.p:u=t;for(var h=u.length,c=this.c,l=c&&this.d,p=function(){var t,n=ht(u,f);if(67324752==n){a=1,s=f,v.d=null,v.c=0;var i=ut(u,f+6),e=ut(u,f+8),o=2048&i,l=8&i,p=ut(u,f+26),d=ut(u,f+28);if(h>f+30+p+d){var g=[];v.k.unshift(g),a=2;var w,y=ht(u,f+18),m=ht(u,f+22),b=$t(u.subarray(f+30,f+=30+p),!o);4294967295==y?(t=l?[-2]:en(u,f),y=t[0],m=t[1]):l&&(y=-1),f+=d,v.c=y;var z={name:b,compression:e,start:function(){if(!z.ondata)throw"no callback";if(y){var t=r.o[e];if(!t)throw"unknown compression type "+e;(w=y<0?new t(b):new t(b,y,m)).ondata=function(t,n,r){z.ondata(t,n,r)};for(var n=0,i=g;n<i.length;n++){var o=i[n];w.push(o,!1)}r.k[0]==g&&r.c?r.d=w:w.push(_,!0)}else z.ondata(null,_,!0)},terminate:function(){w&&w.terminate&&w.terminate()}};y>=0&&(z.size=y,z.originalSize=m),v.onfile(z)}return"break"}if(c){if(134695760==n)return s=f+=12+(-2==c&&8),a=3,v.c=0,"break";if(33639248==n)return s=f-=4,a=3,v.c=0,"break"}},v=this;f<h-4;++f){if("break"===p())break}if(this.p=_,c<0){var d=a?u.subarray(0,s-12-(-2==c&&8)-(134695760==ht(u,s-16)&&4)):u.subarray(0,f);l?l.push(d,!!a):this.k[+(2==a)].push(d)}if(2&a)return this.push(u.subarray(f),n);this.p=u.subarray(f)}if(n){if(this.c)throw"invalid zip file";this.p=null}},t.prototype.register=function(t){this.o[t.compression]=t},t}();t.AsyncCompress=Dt,t.AsyncDecompress=Ht,t.AsyncDeflate=zt,t.AsyncGunzip=Zt,t.AsyncGzip=Dt,t.AsyncInflate=St,t.AsyncUnzipInflate=vn,t.AsyncUnzlib=Pt,t.AsyncZipDeflate=hn,t.AsyncZlib=jt,t.Compress=Ct,t.DecodeUTF8=Qt,t.Decompress=Bt,t.Deflate=bt,t.EncodeUTF8=Vt,t.Gunzip=It,t.Gzip=Ct,t.Inflate=Mt,t.Unzip=dn,t.UnzipInflate=pn,t.UnzipPassThrough=ln,t.Unzlib=Lt,t.Zip=cn,t.ZipDeflate=un,t.ZipPassThrough=sn,t.Zlib=Gt,t.compress=Ot,t.compressSync=Tt,t.decompress=function(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw"no callback";return 31==t[0]&&139==t[1]&&8==t[2]?Ft(t,n,r):8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31?At(t,n,r):Wt(t,n,r)},t.decompressSync=function(t,n){return 31==t[0]&&139==t[1]&&8==t[2]?Et(t,n):8!=(15&t[0])||t[0]>>4>7||(t[0]<<8|t[1])%31?Ut(t,n):_t(t,n)},t.deflate=kt,t.deflateSync=xt,t.gunzip=Ft,t.gunzipSync=Et,t.gzip=Ot,t.gzipSync=Tt,t.inflate=At,t.inflateSync=Ut,t.strFromU8=$t,t.strToU8=Xt,t.unzip=function(t,n){if("function"!=typeof n)throw"no callback";for(var r=[],i=function(){for(var t=0;t<r.length;++t)r[t]()},o={},a=t.length-22;101010256!=ht(t,a);--a)if(!a||t.length-a>65558)return void n("invalid zip file",null);var f=ut(t,a+8);f||n(null,{});var s=f,u=ht(t,a+16),h=4294967295==u;if(h){if(a=ht(t,a-12),101075792!=ht(t,a))return void n("invalid zip file",null);s=f=ht(t,a+32),u=ht(t,a+48)}for(var c=function(a){var s=rn(t,u,h),c=s[0],l=s[1],p=s[2],v=s[3],d=s[4],g=s[5],w=nn(t,g);u=d;var y=function(t,r){t?(i(),n(t,null)):(o[v]=r,--f||n(null,o))};if(c)if(8==c){var m=t.subarray(w,w+l);if(l<32e4)try{y(null,Ut(m,new e(p)))}catch(t){y(t,null)}else r.push(At(m,{size:p},y))}else y("unknown compression type "+c,null);else y(null,T(t,w,w+l))},l=0;l<s;++l)c();return i},t.unzipSync=function(t){for(var n={},r=t.length-22;101010256!=ht(t,r);--r)if(!r||t.length-r>65558)throw"invalid zip file";var i=ut(t,r+8);if(!i)return{};var o=ht(t,r+16),a=4294967295==o;if(a){if(r=ht(t,r-12),101075792!=ht(t,r))throw"invalid zip file";i=ht(t,r+32),o=ht(t,r+48)}for(var f=0;f<i;++f){var s=rn(t,o,a),u=s[0],h=s[1],c=s[2],l=s[3],p=s[4],v=s[5],d=nn(t,v);if(o=p,u){if(8!=u)throw"unknown compression type "+u;n[l]=Ut(t.subarray(d,d+h),new e(c))}else n[l]=T(t,d,d+h)}return n},t.unzlib=Wt,t.unzlibSync=_t,t.zip=function(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw"no callback";var i={};Yt(t,"",i,n);var o=Object.keys(i),a=o.length,f=0,s=0,u=a,h=new Array(a),c=[],l=function(){for(var t=0;t<c.length;++t)c[t]()},p=function(){var t=new e(s+22),n=f,i=s-f;s=0;for(var o=0;o<u;++o){var a=h[o];try{var c=a.c.length;an(t,s,a,a.f,a.u,c);var l=30+a.f.length+on(a.extra),p=s+l;t.set(a.c,p),an(t,f,a,a.f,a.u,c,s,a.m),f+=16+l+(a.m?a.m.length:0),s=p+c}catch(t){return r(t,null)}}fn(t,f,h.length,i,n),r(null,t)};a||p();for(var v=function(t){var n=o[t],e=i[n],u=e[0],v=e[1],d=Y(),g=u.length;d.p(u);var w=Xt(n),y=w.length,m=v.comment,b=m&&Xt(m),z=b&&b.length,k=on(v.extra),x=0==v.level?0:8,M=function(i,e){if(i)l(),r(i,null);else{var o=e.length;h[t]=K(v,{size:g,crc:d.d(),c:e,f:w,m:b,u:y!=n.length||b&&m.length!=z,compression:x}),f+=30+y+k+o,s+=76+2*(y+k)+(z||0)+o,--a||p()}};if(y>65535&&M("filename too long",null),x)if(g<16e4)try{M(null,xt(u,v))}catch(t){M(t,null)}else c.push(kt(u,v,M));else M(null,u)},d=0;d<u;++d)v(d);return l},t.zipSync=function(t,n){n||(n={});var r={},i=[];Yt(t,"",r,n);var o=0,a=0;for(var f in r){var s=r[f],u=s[0],h=s[1],c=0==h.level?0:8,l=(M=Xt(f)).length,p=h.comment,v=p&&Xt(p),d=v&&v.length,g=on(h.extra);if(l>65535)throw"filename too long";var w=c?xt(u,h):u,y=w.length,m=Y();m.p(u),i.push(K(h,{size:u.length,crc:m.d(),c:w,f:M,m:v,u:l!=f.length||v&&p.length!=d,o:o,compression:c})),o+=30+l+g+y,a+=76+2*(l+g)+(d||0)+y}for(var b=new e(a+22),z=o,k=a-o,x=0;x<i.length;++x){var M=i[x];an(b,M.o,M,M.f,M.u,M.c.length);var S=30+M.f.length+on(M.extra);b.set(M.c,M.o+S),an(b,o,M,M.f,M.u,M.c.length,M.o,M.m),o+=16+S+(M.m?M.m.length:0)}return fn(b,o,i.length,k,z),b},t.zlib=function(t,n,r){if(r||(r=n,n={}),"function"!=typeof r)throw"no callback";return at(t,n,[$,rt,function(){return[Rt]}],(function(t){return et(Rt(t.data[0],t.data[1]))}),4,r)},t.zlibSync=Rt,Object.defineProperty(t,"__esModule",{value:!0})}));