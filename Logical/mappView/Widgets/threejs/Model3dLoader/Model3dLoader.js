define(['brease/core/BaseWidget',
    'brease/events/BreaseEvent',
    'brease/decorators/DragAndDropCapability',
    'widgets/threejs/Model3dLoader/libs/threejs/Three',
    'widgets/brease/common/DragDropProperties/libs/DraggablePropertiesEvents',
    'widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents',
], function (SuperClass, BreaseEvent, dragAndDropCapability, THREE) {

    'use strict';

    /**
     * @class widgets.brease.Model3dLoader
     * #Description
     * Widget for displaying an Model3dLoader
     * @breaseNote 
     * @extends brease.core.BaseWidget
     *
     * @mixins widgets.brease.common.DragDropProperties.libs.DraggablePropertiesEvents
     * @mixins widgets.brease.common.DragDropProperties.libs.DroppablePropertiesEvents
     *
     * @iatMeta category:Category
     * Drawing
     * @iatMeta description:short
     * Grafikobjekt
     * @iatMeta description:de
     * Zeichnet ein Quadrat oder Rechteck
     * @iatMeta description:en
     *  Model3dLoader
     */

    /**
     * @htmltag examples
     * ##Configuration examples:  
     *
     *     <div id="Model3dLoader01" data-brease-widget="widgets/brease/Model3dLoader" data-brease-options="{'width':200, 'height':100}"></div>
     *
     */

    /**
     * @cfg {String} tooltip=''
     * @iatStudioExposed
     * @hide
     */

    /**
     * @method showTooltip
     * @hide
     */

    var defaultSettings = {
            backgroundTexture: "",
            model3d: "",
            activateAnimation: false,
            activateKinematics: false,
            modelScale: 1
        },

        WidgetClass = SuperClass.extend(function Model3dLoader() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),

        p = WidgetClass.prototype;

    var self;
    var canvasElm, clientHeight, clientWidth, camera, renderer, scene, controls, light;
    var mixer, skeletonHelper;
    var clock = new THREE.Clock();

    var kinematics;

    

    p.init = function () {
        self = this;

        this.el.addClass('Model3dLoader');
        
        canvasElm = document.createElement('canvas');
        canvasElm.id = this.elem.id + '_canvas';
        canvasElm.width = '100%';
        canvasElm.height = '100%';
        canvasElm.style.position = 'absolute';
        while (this.elem.firstChild && this.elem.removeChild(this.elem.firstChild));
        this.elem.appendChild(canvasElm);

        p.initThreejs();

        p.onWindowResize();
        window.addEventListener('resize', p.onWindowResize);
        p.animate();
        
        
        SuperClass.prototype.init.apply(this, arguments);
    };

    // override method called in BaseWidget.init
    p._initEditor = function () {
        var widget = this;
        widget.el.addClass('iatd-outline'); //gray outline only visible in content editor
        require(['widgets/threejs/Model3dLoader/libs/EditorHandles', 'brease/events/BreaseEvent'], function (EditorHandles, BreaseEvent) {
            var editorHandles = new EditorHandles(widget);
            widget.getHandles = function () {
                return editorHandles.getHandles();
            };
            widget.designer.getSelectionDecoratables = function () {
                return editorHandles.getSelectionDecoratables();
            };
            widget.dispatchEvent(new CustomEvent(BreaseEvent.WIDGET_EDITOR_IF_READY, { bubbles: true }));
        });
    };

    // Initialisation of threejs scene
    p.initThreejs = function () {

        
        THREE.Cache.enabled = true;

        clientWidth = canvasElm.clientWidth;
        clientHeight = canvasElm.clientHeight;

        camera = new THREE.PerspectiveCamera( 45, clientWidth / clientHeight, 0.01, 1000 );
        camera.position.set( - 1.8, 0.6, 2.7 );

        scene = new THREE.Scene();
        //scene.background = new THREE.Color( 0x000000 );

        light = new THREE.AmbientLight( 0x999999 ); // soft white light
        scene.add( light );

        var grid = new THREE.GridHelper( 50, 50, 0xffffff, 0x555555 );
        scene.add( grid );

        renderer = new THREE.WebGLRenderer( { canvas: canvasElm, antialias: true, alpha: true } );

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( clientWidth, clientHeight );
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.outputEncoding = THREE.sRGBEncoding;
        canvasElm.innerHTML = renderer.domElement;

        controls = new THREE.OrbitControls( camera, renderer.domElement );    

        if(self.settings.model3d != ""){
            var scaleModel = self.settings.modelScale;
            var Model3dPath = self.settings.model3d;

            
            if(self.settings.backgroundTexture != ""){
                var BackgroundImagePath = self.settings.backgroundTexture;
                p.loadBackgroundAndModel(BackgroundImagePath, Model3dPath, scaleModel);
            }else{
                p.loadModelFile(Model3dPath, scaleModel);
            }
            // TODO : Implement sound in widget parameter
            // p.loadSound();
        }else{
            console.warn("model3d is not defined in widget " + self.settings.Name);
        }

        window.addEventListener( 'resize', p.onWindowResize );

        console.log("Threejs initialized")

    };
    // TODO : Implement sound in widget parameter
    // p.loadSound = function(){
    //     // create an AudioListener and add it to the camera
    //     var listener = new THREE.AudioListener();
    //     camera.add( listener );
    //     // create a global audio source
    //     var sound = new THREE.Audio( listener );
    //     // load a sound and set it as the Audio object's buffer
    //     var audioLoader = new THREE.AudioLoader();
    //     audioLoader.load( 'media/music.mp3', function( buffer ) {
    //         sound.setBuffer( buffer );
    //         sound.setLoop( true );
    //         sound.setVolume( 0.2);
    //         sound.play();
    //     });
    // }

    // Load background image and then load model file
    p.loadBackgroundAndModel = function (filePath, Model3dPath, scaleModel){
        new THREE.RGBELoader()
        .load( filePath, function ( texture ) {
            texture.mapping = THREE.EquirectangularReflectionMapping;

            scene.background = texture;
            scene.environment = texture;

            p.render();
            p.loadModelFile(Model3dPath, scaleModel);
        });
    };

    // Load model file there is possible retries of loading file limit to 4 retries max
    p.loadModelFile = function ( filePath, scaleModel, retries ) {
        retries = typeof retries !== 'undefined' ? retries : 0;
		const filename = filePath.replace(/^.*[\\\/]/, '');
        const folderPath = filePath.replace(/(.*?)[^/]*\..*$/,'$1');
		const extension = filename.split( '.' ).pop().toLowerCase();
        
        switch ( extension ) {

            case '3dm':

            {

                var loader = new THREE.Rhino3dmLoader();
                // WARNING for use 3dm files
                // You must add rhino3dm package to Media folder
                loader.setLibraryPath( 'Media/rhino3dm/' );
                loader.load( filePath, function ( object ) {
                    object.scale.set(scaleModel, scaleModel, scaleModel);
                    scene.add(object);
                    p.render();
                }, function () {

                }, function(e){
                    if(retries<3){
                        console.warn(e);
                        console.log("Retrying to load model");
                        retries++;
                        setTimeout(function(){
                            p.loadModelFile(filePath, scaleModel, retries);
                        }, 1000);
                    }else{
                        console.warn(e);
                    }
                    
                } );
                break;

            }

            case '3ds':

            {
                // 3ds files dont store normal maps
                // Normal texture must be in textures folder with all other textures in a folder named textures at same level that 3ds file
                var normal = new THREE.TextureLoader().load( folderPath+'textures/normal.jpg' );

                var loader = new THREE.TDSLoader( );
                loader.setResourcePath( folderPath+'textures/' );
                loader.load( filePath, function ( object ) {

                    object.traverse( function ( child ) {

                        if ( child.isMesh ) {

                            child.material.specular.setScalar( 0.1 );
                            child.material.normalMap = normal;

                        }

                    } );

                    object.scale.set(scaleModel, scaleModel, scaleModel);
                    scene.add(object);
                    p.render();
                }, function () {

                }, function(e){
                    if(retries<3){
                        console.warn(e);
                        console.log("Retrying to load model");
                        retries++;
                        setTimeout(function(){
                            p.loadModelFile(filePath, scaleModel, retries);
                        }, 1000);
                    }else{
                        console.warn(e);
                    }
                    
                } );

                break;

            }

            case '3mf':

            {
                var loader = new THREE.ThreeMFLoader();
                loader.load(filePath, function(object){
                    object.quaternion.setFromEuler( new THREE.Euler( - Math.PI / 2, 0, 0 ) ); 	// z-up conversion

                    object.traverse( function ( child ) {

                        child.castShadow = true;

                    } );

                    object.scale.set(scaleModel, scaleModel, scaleModel);
                    scene.add(object);
                    p.render();
                }, function () {

                }, function(e){
                    if(retries<3){
                        console.warn(e);
                        console.log("Retrying to load model");
                        retries++;
                        setTimeout(function(){
                            p.loadModelFile(filePath, scaleModel, retries);
                        }, 1000);
                    }else{
                        console.warn(e);
                    }
                    
                } );

                break;
            }

            case 'amf':

            {
                var loader = new THREE.AMFLoader();
                loader.load(filePath, function(object){
                    object.scale.set(scaleModel, scaleModel, scaleModel);
                    scene.add(object);
                    p.render();
                }, function () {

                }, function(e){
                    if(retries<3){
                        console.warn(e);
                        console.log("Retrying to load model");
                        retries++;
                        setTimeout(function(){
                            p.loadModelFile(filePath, scaleModel, retries);
                        }, 1000);
                    }else{
                        console.warn(e);
                    }
                    
                } );
                break;
            }

            case 'bvh':
                var loader = new THREE.BVHLoader();
                loader.load( filePath, function ( result ) {

                    skeletonHelper = new THREE.SkeletonHelper( result.skeleton.bones[ 0 ] );
                    skeletonHelper.skeleton = result.skeleton; // allow animation mixer to bind to THREE.SkeletonHelper directly

                    var boneContainer = new THREE.Group();
                    boneContainer.add( result.skeleton.bones[ 0 ] );

                    boneContainer.scale.set(scaleModel, scaleModel, scaleModel);
                    skeletonHelper.scale.set(scaleModel, scaleModel, scaleModel);

                    scene.add( skeletonHelper );
                    scene.add( boneContainer );

                    if(self.settings.activateAnimation){
                        // play animation
                        mixer = new THREE.AnimationMixer( skeletonHelper );
                        mixer.clipAction( result.clip ).setEffectiveWeight( 1.0 ).play();
                    }
                    

                }, function () {

                }, function(e){
                    if(retries<3){
                        console.warn(e);
                        console.log("Retrying to load model");
                        retries++;
                        setTimeout(function(){
                            p.loadModelFile(filePath, scaleModel, retries);
                        }, 1000);
                    }else{
                        console.warn(e);
                    }
                    
                } );
                break;

            case 'dae':

            {
                var loader = new THREE.ColladaLoader();
                loader.load( filePath, function(collada){
                    var dae = collada.scene;
                    var animations = dae.animations;
                    dae.traverse( function ( node ) {
                        if ( node.isSkinnedMesh ) {
                            node.frustumCulled = false;
                        }
                        if(self.settings.activateKinematics && node.isMesh){
                            node.material.flatShading = true;
                        }
                    } );

                    dae.updateMatrix();
                    kinematics = collada.kinematics;


                    // TODO: Need to add selection of animations
                    if(self.settings.activateAnimation){
                        mixer = new THREE.AnimationMixer( dae );
                        mixer.clipAction( animations[0] ).play();
                        
                    }

                    dae.scale.set(scaleModel, scaleModel, scaleModel);
                    scene.add( dae );
                    
                    p.render();
                }, function () {

                }, function(e){
                    if(retries<3){
                        console.warn(e);
                        console.log("Retrying to load model");
                        retries++;
                        setTimeout(function(){
                            p.loadModelFile(filePath, scaleModel, retries);
                        }, 1000);
                    }else{
                        console.warn(e);
                    }
                    
                } );
                break;

            }

            case 'drc':

            {


                var loader = new THREE.DRACOLoader();
                // WARNING for use drc files
                // You must add draco package to Media folder
                loader.setDecoderPath( 'Media/draco/' );
                loader.load( filePath, function ( geometry ) {

                    var object;
                    geometry.computeVertexNormals();
                    if ( geometry.index !== null ) {

                        var material = new THREE.MeshStandardMaterial();

                        object = new THREE.Mesh( geometry, material );
                        object.name = filename;

                    } else {

                        var material = new THREE.PointsMaterial( { size: 0.01 } );
                        material.vertexColors = geometry.hasAttribute( 'color' );

                        object = new THREE.Points( geometry, material );
                        object.name = filename;

                    }


                    object.scale.set(scaleModel, scaleModel, scaleModel);
                    scene.add( object );
                    loader.dispose();

                
                }, function () {

                }, function(e){
                    if(retries<3){
                        console.warn(e);
                        console.log("Retrying to load model");
                        retries++;
                        setTimeout(function(){
                            p.loadModelFile(filePath, scaleModel, retries);
                        }, 1000);
                    }else{
                        console.warn(e);
                    }
                    
                } );

                break;

            }

            case 'fbx':

            {
                var loader = new THREE.FBXLoader( );
                loader.load( filePath, function ( object ) {

                    if(self.settings.activateAnimation){
                        mixer = new THREE.AnimationMixer( object );
                        mixer.clipAction( object.animations[0] ).play();
                    }

                    object.traverse( function ( child ) {

                        if ( child.isMesh ) {

                            child.castShadow = true;
                            child.receiveShadow = true;

                        }

                    } );
                    object.scale.set(scaleModel, scaleModel, scaleModel);
                    scene.add( object );

                
                }, function () {

                }, function(e){
                    if(retries<3){
                        console.warn(e);
                        console.log("Retrying to load model");
                        retries++;
                        setTimeout(function(){
                            p.loadModelFile(filePath, scaleModel, retries);
                        }, 1000);
                    }else{
                        console.warn(e);
                    }
                    
                } );


                break;

            }

            case 'glb':

            {
                // WARNING for use glb files
                // You must add draco package to Media folder
                var dracoLoader = new THREE.DRACOLoader();
                dracoLoader.setDecoderPath( 'Media/draco/gltf/' );

                var loader = new THREE.GLTFLoader();
                loader.setDRACOLoader( dracoLoader );
                loader.load( filePath, function ( gltf ) {


                    if(self.settings.activateAnimation){
                        mixer = new THREE.AnimationMixer( gltf.scene );
                        mixer.clipAction( gltf.animations[0] ).play();
                    }

                    scene.add( gltf.scene );

                }, function () {

                }, function(e){
                    if(retries<3){
                        console.warn(e);
                        console.log("Retrying to load model");
                        retries++;
                        setTimeout(function(){
                            p.loadModelFile(filePath, scaleModel, retries);
                        }, 1000);
                    }else{
                        console.warn(e);
                    }
                    
                } );


                break;

            }

            case 'gltf':

            {

                new THREE.GLTFLoader()
                .load(filePath, function(gltf){
                    gltf.scene.scale.set(scaleModel, scaleModel, scaleModel);
                    scene.add( gltf.scene );
                    p.render();
                }, function () {

                }, function(e){
                    if(retries<3){
                        console.warn(e);
                        console.log("Retrying to load model");
                        retries++;
                        setTimeout(function(){
                            p.loadModelFile(filePath, scaleModel, retries);
                        }, 1000);
                    }else{
                        console.warn(e);
                    }
                    
                } );

                break;

            }

            // TODO : Implement remaining file format
            // case 'ifc':

            // {

            //     var loader = new THREE.IFCLoader();
            //     loader.ifcManager.setWasmPath( 'Media/ifc/' );
            //     loader.load( filePath, function ( model ) {
			// 		scene.add( model.mesh );
			// 		p.render();
            //     }, function () {

            //     }, function(e){
            //         if(retries<3){
            //             console.warn(e);
            //             console.log("Retrying to load model");
            //             retries++;
            //             setTimeout(function(){
            //                 p.loadModelFile(filePath, scaleModel, retries);
            //             }, 1000);
            //         }else{
            //             console.warn(e);
            //         }
                    
            //     } );
   

            // 	break;

            // }

            // case 'kmz':

            // {

            // 	reader.addEventListener( 'load', async function ( event ) {

            // 		const { KMZLoader } = await import( '../../examples/jsm/loaders/KMZLoader.js' );

            // 		const loader = new KMZLoader();
            // 		const collada = loader.parse( event.target.result );

            // 		collada.scene.name = filename;

            // 		editor.execute( new AddObjectCommand( editor, collada.scene ) );

            // 	}, false );
            // 	reader.readAsArrayBuffer( file );

            // 	break;

            // }

            // case 'ldr':
            // case 'mpd':

            // {

            // 	reader.addEventListener( 'load', async function ( event ) {

            // 		const { LDrawLoader } = await import( '../../examples/jsm/loaders/LDrawLoader.js' );

            // 		const loader = new LDrawLoader();
            // 		loader.setPath( '../../examples/models/ldraw/officialLibrary/' );
            // 		loader.parse( event.target.result, undefined, function ( group ) {

            // 			group.name = filename;
            // 			// Convert from LDraw coordinates: rotate 180 degrees around OX
            // 			group.rotation.x = Math.PI;

            // 			editor.execute( new AddObjectCommand( editor, group ) );

            // 		} );

            // 	}, false );
            // 	reader.readAsText( file );

            // 	break;

            // }

            // case 'md2':

            // {

            // 	reader.addEventListener( 'load', async function ( event ) {

            // 		const contents = event.target.result;

            // 		const { MD2Loader } = await import( '../../examples/jsm/loaders/MD2Loader.js' );

            // 		const geometry = new MD2Loader().parse( contents );
            // 		const material = new THREE.MeshStandardMaterial();

            // 		const mesh = new THREE.Mesh( geometry, material );
            // 		mesh.mixer = new THREE.AnimationMixer( mesh );
            // 		mesh.name = filename;

            // 		mesh.animations.push( ...geometry.animations );
            // 		editor.execute( new AddObjectCommand( editor, mesh ) );

            // 	}, false );
            // 	reader.readAsArrayBuffer( file );

            // 	break;

            // }

            // case 'obj':

            // {

            // 	reader.addEventListener( 'load', async function ( event ) {

            // 		const contents = event.target.result;

            // 		const { OBJLoader } = await import( '../../examples/jsm/loaders/OBJLoader.js' );

            // 		const object = new OBJLoader().parse( contents );
            // 		object.name = filename;

            // 		editor.execute( new AddObjectCommand( editor, object ) );

            // 	}, false );
            // 	reader.readAsText( file );

            // 	break;

            // }

            // case 'pcd':

            // {

            // 	reader.addEventListener( 'load', async function ( event ) {

            // 		const contents = event.target.result;

            // 		const { PCDLoader } = await import( '../../examples/jsm/loaders/PCDLoader.js' );

            // 		const points = new PCDLoader().parse( contents );
            // 		points.name = filename;

            // 		editor.execute( new AddObjectCommand( editor, points ) );

            // 	}, false );
            // 	reader.readAsArrayBuffer( file );

            // 	break;

            // }

            // case 'ply':

            // {

            // 	reader.addEventListener( 'load', async function ( event ) {

            // 		const contents = event.target.result;

            // 		const { PLYLoader } = await import( '../../examples/jsm/loaders/PLYLoader.js' );

            // 		const geometry = new PLYLoader().parse( contents );
            // 		let object;

            // 		if ( geometry.index !== null ) {

            // 			const material = new THREE.MeshStandardMaterial();

            // 			object = new THREE.Mesh( geometry, material );
            // 			object.name = filename;

            // 		} else {

            // 			const material = new THREE.PointsMaterial( { size: 0.01 } );
            // 			material.vertexColors = geometry.hasAttribute( 'color' );

            // 			object = new THREE.Points( geometry, material );
            // 			object.name = filename;

            // 		}

            // 		editor.execute( new AddObjectCommand( editor, object ) );

            // 	}, false );
            // 	reader.readAsArrayBuffer( file );

            // 	break;

            // }

            // case 'stl':

            // {

            // 	reader.addEventListener( 'load', async function ( event ) {

            // 		const contents = event.target.result;

            // 		const { STLLoader } = await import( '../../examples/jsm/loaders/STLLoader.js' );

            // 		const geometry = new STLLoader().parse( contents );
            // 		const material = new THREE.MeshStandardMaterial();

            // 		const mesh = new THREE.Mesh( geometry, material );
            // 		mesh.name = filename;

            // 		editor.execute( new AddObjectCommand( editor, mesh ) );

            // 	}, false );

            // 	if ( reader.readAsBinaryString !== undefined ) {

            // 		reader.readAsBinaryString( file );

            // 	} else {

            // 		reader.readAsArrayBuffer( file );

            // 	}

            // 	break;

            // }

            // case 'svg':

            // {

            // 	reader.addEventListener( 'load', async function ( event ) {

            // 		const contents = event.target.result;

            // 		const { SVGLoader } = await import( '../../examples/jsm/loaders/SVGLoader.js' );

            // 		const loader = new SVGLoader();
            // 		const paths = loader.parse( contents ).paths;

            // 		//

            // 		const group = new THREE.Group();
            // 		group.scale.multiplyScalar( 0.1 );
            // 		group.scale.y *= - 1;

            // 		for ( let i = 0; i < paths.length; i ++ ) {

            // 			const path = paths[ i ];

            // 			const material = new THREE.MeshBasicMaterial( {
            // 				color: path.color,
            // 				depthWrite: false
            // 			} );

            // 			const shapes = SVGLoader.createShapes( path );

            // 			for ( let j = 0; j < shapes.length; j ++ ) {

            // 				const shape = shapes[ j ];

            // 				const geometry = new THREE.ShapeGeometry( shape );
            // 				const mesh = new THREE.Mesh( geometry, material );

            // 				group.add( mesh );

            // 			}

            // 		}

            // 		editor.execute( new AddObjectCommand( editor, group ) );

            // 	}, false );
            // 	reader.readAsText( file );

            // 	break;

            // }

            // case 'vox':

            // {

            // 	reader.addEventListener( 'load', async function ( event ) {

            // 		const contents = event.target.result;

            // 		const { VOXLoader, VOXMesh } = await import( '../../examples/jsm/loaders/VOXLoader.js' );

            // 		const chunks = new VOXLoader().parse( contents );

            // 		const group = new THREE.Group();
            // 		group.name = filename;

            // 		for ( let i = 0; i < chunks.length; i ++ ) {

            // 			const chunk = chunks[ i ];

            // 			const mesh = new VOXMesh( chunk );
            // 			group.add( mesh );

            // 		}

            // 		editor.execute( new AddObjectCommand( editor, group ) );

            // 	}, false );
            // 	reader.readAsArrayBuffer( file );

            // 	break;

            // }

            // case 'vtk':
            // case 'vtp':

            // {

            // 	reader.addEventListener( 'load', async function ( event ) {

            // 		const contents = event.target.result;

            // 		const { VTKLoader } = await import( '../../examples/jsm/loaders/VTKLoader.js' );

            // 		const geometry = new VTKLoader().parse( contents );
            // 		const material = new THREE.MeshStandardMaterial();

            // 		const mesh = new THREE.Mesh( geometry, material );
            // 		mesh.name = filename;

            // 		editor.execute( new AddObjectCommand( editor, mesh ) );

            // 	}, false );
            // 	reader.readAsArrayBuffer( file );

            // 	break;

            // }

            // case 'wrl':

            // {

            // 	reader.addEventListener( 'load', async function ( event ) {

            // 		const contents = event.target.result;

            // 		const { VRMLLoader } = await import( '../../examples/jsm/loaders/VRMLLoader.js' );

            // 		const result = new VRMLLoader().parse( contents );

            // 		editor.execute( new SetSceneCommand( editor, result ) );

            // 	}, false );
            // 	reader.readAsText( file );

            // 	break;

            // }

            // case 'xyz':

            // {

            // 	reader.addEventListener( 'load', async function ( event ) {

            // 		const contents = event.target.result;

            // 		const { XYZLoader } = await import( '../../examples/jsm/loaders/XYZLoader.js' );

            // 		const geometry = new XYZLoader().parse( contents );

            // 		const material = new THREE.PointsMaterial();
            // 		material.vertexColors = geometry.hasAttribute( 'color' );

            // 		const points = new THREE.Points( geometry, material );
            // 		points.name = filename;

            // 		editor.execute( new AddObjectCommand( editor, points ) );

            // 	}, false );
            // 	reader.readAsText( file );

            // 	break;

            // }

            default:

                console.warn( 'Unsupported file format (' + extension + ').' );

                break;

        }
        
	};

    p.onWindowResize = function () {
        canvasElm.style.width = "100%";
        canvasElm.style.height = "100%";


        clientWidth = canvasElm.clientWidth;
        clientHeight = canvasElm.clientHeight;

        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( clientWidth, clientHeight );

    };


    p.animate = function () {
        requestAnimationFrame( p.animate );

        var delta = clock.getDelta();

        if ( mixer ) mixer.update( delta );
        if ( controls ) controls.update();

        
        p.render();
    };

    p.render = function(){
        renderer.render( scene, camera );
    };



    return dragAndDropCapability.decorate(WidgetClass, false);

});
