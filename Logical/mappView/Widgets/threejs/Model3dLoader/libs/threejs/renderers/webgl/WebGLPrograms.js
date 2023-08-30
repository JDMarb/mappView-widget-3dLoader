/**
 * @license
 * Copyright 2010-2022 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
define(["exports","../../constants","../../core/Layers","./WebGLProgram","./WebGLShaderCache","../shaders/ShaderLib","../shaders/UniformsUtils"],(function(e,a,n,s,t,r,i){"use strict";e.WebGLPrograms=function(e,p,o,l,h,c,u){var d=new n.Layers,M=new t.WebGLShaderCache,m=[],g=h.isWebGL2,b=h.logarithmicDepthBuffer,f=h.vertexTextures,v=h.precision,S={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};return{getParameters:function(n,s,t,i,c){var d=i.fog,m=c.geometry,x=n.isMeshStandardMaterial?i.environment:null,L=(n.isMeshStandardMaterial?o:p).get(n.envMap||x),C=L&&L.mapping===a.CubeUVReflectionMapping?L.image.height:null,T=S[n.type];null!==n.precision&&(v=h.getMaxPrecision(n.precision))!==n.precision&&console.warn("THREE.WebGLProgram.getParameters:",n.precision,"not supported, using",v,"instead.");var y,D,P,w,A=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,k=void 0!==A?A.length:0,R=0;if(void 0!==m.morphAttributes.position&&(R=1),void 0!==m.morphAttributes.normal&&(R=2),void 0!==m.morphAttributes.color&&(R=3),T){var E=r.ShaderLib[T];y=E.vertexShader,D=E.fragmentShader}else y=n.vertexShader,D=n.fragmentShader,M.update(n),P=M.getVertexShaderID(n),w=M.getFragmentShaderID(n);var I=e.getRenderTarget(),N=n.alphaTest>0,V=n.clearcoat>0,B=n.iridescence>0;return{isWebGL2:g,shaderID:T,shaderName:n.type,vertexShader:y,fragmentShader:D,defines:n.defines,customVertexShaderID:P,customFragmentShaderID:w,isRawShaderMaterial:!0===n.isRawShaderMaterial,glslVersion:n.glslVersion,precision:v,instancing:!0===c.isInstancedMesh,instancingColor:!0===c.isInstancedMesh&&null!==c.instanceColor,supportsVertexTextures:f,outputEncoding:null===I?e.outputEncoding:!0===I.isXRRenderTarget?I.texture.encoding:a.LinearEncoding,map:!!n.map,matcap:!!n.matcap,envMap:!!L,envMapMode:L&&L.mapping,envMapCubeUVHeight:C,lightMap:!!n.lightMap,aoMap:!!n.aoMap,emissiveMap:!!n.emissiveMap,bumpMap:!!n.bumpMap,normalMap:!!n.normalMap,objectSpaceNormalMap:n.normalMapType===a.ObjectSpaceNormalMap,tangentSpaceNormalMap:n.normalMapType===a.TangentSpaceNormalMap,decodeVideoTexture:!!n.map&&!0===n.map.isVideoTexture&&n.map.encoding===a.sRGBEncoding,clearcoat:V,clearcoatMap:V&&!!n.clearcoatMap,clearcoatRoughnessMap:V&&!!n.clearcoatRoughnessMap,clearcoatNormalMap:V&&!!n.clearcoatNormalMap,iridescence:B,iridescenceMap:B&&!!n.iridescenceMap,iridescenceThicknessMap:B&&!!n.iridescenceThicknessMap,displacementMap:!!n.displacementMap,roughnessMap:!!n.roughnessMap,metalnessMap:!!n.metalnessMap,specularMap:!!n.specularMap,specularIntensityMap:!!n.specularIntensityMap,specularColorMap:!!n.specularColorMap,opaque:!1===n.transparent&&n.blending===a.NormalBlending,alphaMap:!!n.alphaMap,alphaTest:N,gradientMap:!!n.gradientMap,sheen:n.sheen>0,sheenColorMap:!!n.sheenColorMap,sheenRoughnessMap:!!n.sheenRoughnessMap,transmission:n.transmission>0,transmissionMap:!!n.transmissionMap,thicknessMap:!!n.thicknessMap,combine:n.combine,vertexTangents:!!n.normalMap&&!!m.attributes.tangent,vertexColors:n.vertexColors,vertexAlphas:!0===n.vertexColors&&!!m.attributes.color&&4===m.attributes.color.itemSize,vertexUvs:!!(n.map||n.bumpMap||n.normalMap||n.specularMap||n.alphaMap||n.emissiveMap||n.roughnessMap||n.metalnessMap||n.clearcoatMap||n.clearcoatRoughnessMap||n.clearcoatNormalMap||n.iridescenceMap||n.iridescenceThicknessMap||n.displacementMap||n.transmissionMap||n.thicknessMap||n.specularIntensityMap||n.specularColorMap||n.sheenColorMap||n.sheenRoughnessMap),uvsVertexOnly:!(n.map||n.bumpMap||n.normalMap||n.specularMap||n.alphaMap||n.emissiveMap||n.roughnessMap||n.metalnessMap||n.clearcoatNormalMap||n.iridescenceMap||n.iridescenceThicknessMap||n.transmission>0||n.transmissionMap||n.thicknessMap||n.specularIntensityMap||n.specularColorMap||n.sheen>0||n.sheenColorMap||n.sheenRoughnessMap||!n.displacementMap),fog:!!d,useFog:!0===n.fog,fogExp2:d&&d.isFogExp2,flatShading:!!n.flatShading,sizeAttenuation:n.sizeAttenuation,logarithmicDepthBuffer:b,skinning:!0===c.isSkinnedMesh,morphTargets:void 0!==m.morphAttributes.position,morphNormals:void 0!==m.morphAttributes.normal,morphColors:void 0!==m.morphAttributes.color,morphTargetsCount:k,morphTextureStride:R,numDirLights:s.directional.length,numPointLights:s.point.length,numSpotLights:s.spot.length,numRectAreaLights:s.rectArea.length,numHemiLights:s.hemi.length,numDirLightShadows:s.directionalShadowMap.length,numPointLightShadows:s.pointShadowMap.length,numSpotLightShadows:s.spotShadowMap.length,numClippingPlanes:u.numPlanes,numClipIntersection:u.numIntersection,dithering:n.dithering,shadowMapEnabled:e.shadowMap.enabled&&t.length>0,shadowMapType:e.shadowMap.type,toneMapping:n.toneMapped?e.toneMapping:a.NoToneMapping,physicallyCorrectLights:e.physicallyCorrectLights,premultipliedAlpha:n.premultipliedAlpha,doubleSided:n.side===a.DoubleSide,flipSided:n.side===a.BackSide,useDepthPacking:!!n.depthPacking,depthPacking:n.depthPacking||0,index0AttributeName:n.index0AttributeName,extensionDerivatives:n.extensions&&n.extensions.derivatives,extensionFragDepth:n.extensions&&n.extensions.fragDepth,extensionDrawBuffers:n.extensions&&n.extensions.drawBuffers,extensionShaderTextureLOD:n.extensions&&n.extensions.shaderTextureLOD,rendererExtensionFragDepth:g||l.has("EXT_frag_depth"),rendererExtensionDrawBuffers:g||l.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:g||l.has("EXT_shader_texture_lod"),customProgramCacheKey:n.customProgramCacheKey()}},getProgramCacheKey:function(a){var n=[];if(a.shaderID?n.push(a.shaderID):(n.push(a.customVertexShaderID),n.push(a.customFragmentShaderID)),void 0!==a.defines)for(var s in a.defines)n.push(s),n.push(a.defines[s]);return!1===a.isRawShaderMaterial&&(!function(e,a){e.push(a.precision),e.push(a.outputEncoding),e.push(a.envMapMode),e.push(a.envMapCubeUVHeight),e.push(a.combine),e.push(a.vertexUvs),e.push(a.fogExp2),e.push(a.sizeAttenuation),e.push(a.morphTargetsCount),e.push(a.morphAttributeCount),e.push(a.numDirLights),e.push(a.numPointLights),e.push(a.numSpotLights),e.push(a.numHemiLights),e.push(a.numRectAreaLights),e.push(a.numDirLightShadows),e.push(a.numPointLightShadows),e.push(a.numSpotLightShadows),e.push(a.shadowMapType),e.push(a.toneMapping),e.push(a.numClippingPlanes),e.push(a.numClipIntersection),e.push(a.depthPacking)}(n,a),function(e,a){d.disableAll(),a.isWebGL2&&d.enable(0);a.supportsVertexTextures&&d.enable(1);a.instancing&&d.enable(2);a.instancingColor&&d.enable(3);a.map&&d.enable(4);a.matcap&&d.enable(5);a.envMap&&d.enable(6);a.lightMap&&d.enable(7);a.aoMap&&d.enable(8);a.emissiveMap&&d.enable(9);a.bumpMap&&d.enable(10);a.normalMap&&d.enable(11);a.objectSpaceNormalMap&&d.enable(12);a.tangentSpaceNormalMap&&d.enable(13);a.clearcoat&&d.enable(14);a.clearcoatMap&&d.enable(15);a.clearcoatRoughnessMap&&d.enable(16);a.clearcoatNormalMap&&d.enable(17);a.iridescence&&d.enable(18);a.iridescenceMap&&d.enable(19);a.iridescenceThicknessMap&&d.enable(20);a.displacementMap&&d.enable(21);a.specularMap&&d.enable(22);a.roughnessMap&&d.enable(23);a.metalnessMap&&d.enable(24);a.gradientMap&&d.enable(25);a.alphaMap&&d.enable(26);a.alphaTest&&d.enable(27);a.vertexColors&&d.enable(28);a.vertexAlphas&&d.enable(29);a.vertexUvs&&d.enable(30);a.vertexTangents&&d.enable(31);a.uvsVertexOnly&&d.enable(32);a.fog&&d.enable(33);e.push(d.mask),d.disableAll(),a.useFog&&d.enable(0);a.flatShading&&d.enable(1);a.logarithmicDepthBuffer&&d.enable(2);a.skinning&&d.enable(3);a.morphTargets&&d.enable(4);a.morphNormals&&d.enable(5);a.morphColors&&d.enable(6);a.premultipliedAlpha&&d.enable(7);a.shadowMapEnabled&&d.enable(8);a.physicallyCorrectLights&&d.enable(9);a.doubleSided&&d.enable(10);a.flipSided&&d.enable(11);a.useDepthPacking&&d.enable(12);a.dithering&&d.enable(13);a.specularIntensityMap&&d.enable(14);a.specularColorMap&&d.enable(15);a.transmission&&d.enable(16);a.transmissionMap&&d.enable(17);a.thicknessMap&&d.enable(18);a.sheen&&d.enable(19);a.sheenColorMap&&d.enable(20);a.sheenRoughnessMap&&d.enable(21);a.decodeVideoTexture&&d.enable(22);a.opaque&&d.enable(23);e.push(d.mask)}(n,a),n.push(e.outputEncoding)),n.push(a.customProgramCacheKey),n.join()},getUniforms:function(e){var a,n=S[e.type];if(n){var s=r.ShaderLib[n];a=i.UniformsUtils.clone(s.uniforms)}else a=e.uniforms;return a},acquireProgram:function(a,n){for(var t,r=0,i=m.length;r<i;r++){var p=m[r];if(p.cacheKey===n){++(t=p).usedTimes;break}}return void 0===t&&(t=new s.WebGLProgram(e,n,a,c),m.push(t)),t},releaseProgram:function(e){if(0==--e.usedTimes){var a=m.indexOf(e);m[a]=m[m.length-1],m.pop(),e.destroy()}},releaseShaderCache:function(e){M.remove(e)},programs:m,dispose:function(){M.dispose()}}},Object.defineProperty(e,"__esModule",{value:!0})}));
