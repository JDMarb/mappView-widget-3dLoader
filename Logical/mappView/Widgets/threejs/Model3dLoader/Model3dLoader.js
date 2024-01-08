define([
    "brease/core/BaseWidget",
    "widgets/threejs/Model3dLoader/libs/config/Config",
    "brease/decorators/DragAndDropCapability",
    "widgets/threejs/Model3dLoader/libs/threejs/Three",
    "widgets/brease/common/DragDropProperties/libs/DraggablePropertiesEvents",
    "widgets/brease/common/DragDropProperties/libs/DroppablePropertiesEvents"
], function (SuperClass, Config, dragAndDropCapability, THREE) {
    "use strict";

    /**
     * @class widgets.threejs.Model3dLoader
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
     * @cfg {String} tooltip=''
     * @iatStudioExposed
     * @hide
     */

    /**
     * @method showTooltip
     * @hide
     */

    var defaultSettings = Config,
        WidgetClass = SuperClass.extend(function Model3dLoader() {
            SuperClass.apply(this, arguments);
        }, defaultSettings),
        p = WidgetClass.prototype;

    p.init = function () {
        this.el.addClass("Model3dLoader");

        this.canvas = document.createElement("canvas");
        this.canvas.id = this.elem.id + "_canvas";
        this.canvas.width = "100%";
        this.canvas.height = "100%";
        this.canvas.style.position = "absolute";
        while (this.elem.firstChild && this.elem.removeChild(this.elem.firstChild));
        this.elem.appendChild(this.canvas);

        p.initThreejs.bind(this)();

        p.onWindowResize.bind(this)();
        p.animate.bind(this)();

        SuperClass.prototype.init.apply(this, arguments);
    };

    // override method called in BaseWidget.init
    p._initEditor = function () {
        var widget = this;
        widget.el.addClass("iatd-outline"); //gray outline only visible in content editor
        require(["widgets/threejs/Model3dLoader/libs/EditorHandles", "brease/events/BreaseEvent"], function (
            EditorHandles,
            BreaseEvent
        ) {
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
        this.clock = new THREE.Clock();

        THREE.Cache.enabled = true;

        var clientWidth = this.canvas.clientWidth;
        var clientHeight = this.canvas.clientHeight;

        this.camera = new THREE.PerspectiveCamera(45, clientWidth / clientHeight, 0.01, 1000);
        this.camera.position.set(-1.8, 0.6, 2.7);

        this.scene = new THREE.Scene();
        //this.scene.background = new THREE.Color( 0x000000 );

        this.scene.add(new THREE.AmbientLight(0x999999)); // soft white light

        this.grid = new THREE.GridHelper(50, 50, 0xffffff, 0x555555);
        this.scene.add(this.grid);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });

        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(clientWidth, clientHeight);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.canvas.innerHTML = this.renderer.domElement;

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        if (this.settings.model3d != "") {
            var scaleModel = this.settings.modelScale;
            var Model3dPath = this.settings.model3d;

            if (this.settings.backgroundTexture != "") {
                var BackgroundImagePath = this.settings.backgroundTexture;
                p.loadBackgroundAndModel.bind(this)(BackgroundImagePath, Model3dPath, scaleModel);
            } else {
                p.loadModelFile.bind(this)(Model3dPath, scaleModel);
            }
            // TODO : Implement sound in widget parameter
            // p.loadSound();
        } else {
            console.warn("model3d is not defined in widget " + this.settings.Name);
        }

        window.addEventListener("resize", p.onWindowResize.bind(this));

        console.log("Threejs initialized");
    };
    // TODO : Implement sound in widget parameter
    // p.loadSound = function(){
    //     // create an AudioListener and add it to the camera
    //     var listener = new THREE.AudioListener();
    //     this.camera.add( listener );
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
    p.loadBackgroundAndModel = function (filePath, Model3dPath, scaleModel) {
        new THREE.RGBELoader().load(
            filePath,
            function (texture) {
                texture.mapping = THREE.EquirectangularReflectionMapping;

                this.scene.background = texture;
                this.scene.environment = texture;

                p.render.bind(this)();
                p.loadModelFile.bind(this)(Model3dPath, scaleModel);
            }.bind(this)
        );
    };

    // Load model file there is possible retries of loading file limit to 4 retries max
    p.loadModelFile = function (filePath, scaleModel, retries) {
        retries = typeof retries !== "undefined" ? retries : 0;
        const filename = filePath.replace(/^.*[\\\/]/, "");
        const folderPath = filePath.replace(/(.*?)[^/]*\..*$/, "$1");
        const extension = filename.split(".").pop().toLowerCase();
        switch (extension) {
            case "3dm": {
                var loader = new THREE.Rhino3dmLoader();
                // WARNING for use 3dm files
                // You must add rhino3dm package to Media folder
                loader.setLibraryPath("Media/rhino3dm/");
                loader.load(
                    filePath,
                    function (object) {
                        object.scale.set(scaleModel, scaleModel, scaleModel);
                        this.model = [object];
                        this.scene.add(object);
                        p.render.bind(this)();
                    }.bind(this),
                    function () {},
                    function (e) {
                        if (retries < 3) {
                            console.warn(e);
                            console.log("Retrying to load model");
                            retries++;
                            setTimeout(
                                function () {
                                    p.loadModelFile.bind(this)(filePath, scaleModel, retries);
                                }.bind(this),
                                1000
                            );
                        } else {
                            console.warn(e);
                        }
                    }.bind(this)
                );
                break;
            }

            case "3ds": {
                // 3ds files dont store normal maps
                // Normal texture must be in textures folder with all other textures in a folder named textures at same level that 3ds file
                var normal = new THREE.TextureLoader().load(folderPath + "textures/normal.jpg");

                var loader = new THREE.TDSLoader();
                loader.setResourcePath(folderPath + "textures/");
                loader.load(
                    filePath,
                    function (object) {
                        object.traverse(function (child) {
                            if (child.isMesh) {
                                child.material.specular.setScalar(0.1);
                                child.material.normalMap = normal;
                            }
                        });

                        object.scale.set(scaleModel, scaleModel, scaleModel);
                        this.model = [object];
                        this.scene.add(object);
                        p.render.bind(this)();
                    }.bind(this),
                    function () {},
                    function (e) {
                        if (retries < 3) {
                            console.warn(e);
                            console.log("Retrying to load model");
                            retries++;
                            setTimeout(
                                function () {
                                    p.loadModelFile.bind(this)(filePath, scaleModel, retries);
                                }.bind(this),
                                1000
                            );
                        } else {
                            console.warn(e);
                        }
                    }.bind(this)
                );

                break;
            }

            case "3mf": {
                var loader = new THREE.ThreeMFLoader();
                loader.load(
                    filePath,
                    function (object) {
                        object.quaternion.setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0)); // z-up conversion

                        object.traverse(function (child) {
                            child.castShadow = true;
                        });

                        object.scale.set(scaleModel, scaleModel, scaleModel);
                        this.model = [object];
                        this.scene.add(object);
                        p.render.bind(this)();
                    }.bind(this),
                    function () {},
                    function (e) {
                        if (retries < 3) {
                            console.warn(e);
                            console.log("Retrying to load model");
                            retries++;
                            setTimeout(
                                function () {
                                    p.loadModelFile.bind(this)(filePath, scaleModel, retries);
                                }.bind(this),
                                1000
                            );
                        } else {
                            console.warn(e);
                        }
                    }.bind(this)
                );

                break;
            }

            case "amf": {
                var loader = new THREE.AMFLoader();
                loader.load(
                    filePath,
                    function (object) {
                        object.scale.set(scaleModel, scaleModel, scaleModel);
                        this.model = [object];
                        this.scene.add(object);
                        p.render.bind(this)();
                    }.bind(this),
                    function () {},
                    function (e) {
                        if (retries < 3) {
                            console.warn(e);
                            console.log("Retrying to load model");
                            retries++;
                            setTimeout(
                                function () {
                                    p.loadModelFile.bind(this)(filePath, scaleModel, retries);
                                }.bind(this),
                                1000
                            );
                        } else {
                            console.warn(e);
                        }
                    }.bind(this)
                );
                break;
            }

            case "bvh":
                var loader = new THREE.BVHLoader();
                loader.load(
                    filePath,
                    function (result) {
                        this.skeletonHelper = new THREE.SkeletonHelper(result.skeleton.bones[0]);
                        this.skeletonHelper.skeleton = result.skeleton; // allow animation mixer to bind to THREE.SkeletonHelper directly

                        var boneContainer = new THREE.Group();
                        boneContainer.add(result.skeleton.bones[0]);

                        boneContainer.scale.set(scaleModel, scaleModel, scaleModel);
                        this.skeletonHelper.scale.set(scaleModel, scaleModel, scaleModel);

                        this.model = [this.skeletonHelper, boneContainer];
                        this.scene.add(this.skeletonHelper);
                        this.scene.add(boneContainer);

                        if (this.settings.activateAnimation) {
                            // play animation
                            this.mixer = new THREE.AnimationMixer(this.skeletonHelper);
                            this.mixer.clipAction(result.clip).setEffectiveWeight(1.0).play();
                        }
                    }.bind(this),
                    function () {},
                    function (e) {
                        if (retries < 3) {
                            console.warn(e);
                            console.log("Retrying to load model");
                            retries++;
                            setTimeout(
                                function () {
                                    p.loadModelFile.bind(this)(filePath, scaleModel, retries);
                                }.bind(this),
                                1000
                            );
                        } else {
                            console.warn(e);
                        }
                    }.bind(this)
                );
                break;

            case "dae": {
                var loader = new THREE.ColladaLoader();
                loader.load(
                    filePath,
                    function (collada) {
                        var dae = collada.scene;
                        var animations = dae.animations;
                        dae.traverse(
                            function (node) {
                                if (node.isSkinnedMesh) {
                                    node.frustumCulled = false;
                                }
                                if (this.settings.activateKinematics && node.isMesh) {
                                    node.material.flatShading = true;
                                }
                            }.bind(this)
                        );

                        dae.updateMatrix();
                        //kinematics = collada.kinematics;

                        // TODO: Need to add selection of animations
                        if (this.settings.activateAnimation) {
                            this.mixer = new THREE.AnimationMixer(dae);
                            this.mixer.clipAction(animations[0]).play();
                        }

                        dae.scale.set(scaleModel, scaleModel, scaleModel);
                        this.model = [dae];
                        this.scene.add(dae);

                        p.render.bind(this)();
                    }.bind(this),
                    function () {},
                    function (e) {
                        if (retries < 3) {
                            console.warn(e);
                            console.log("Retrying to load model");
                            retries++;
                            setTimeout(
                                function () {
                                    p.loadModelFile.bind(this)(filePath, scaleModel, retries);
                                }.bind(this),
                                1000
                            );
                        } else {
                            console.warn(e);
                        }
                    }.bind(this)
                );
                break;
            }

            case "drc": {
                var loader = new THREE.DRACOLoader();
                // WARNING for use drc files
                // You must add draco package to Media folder
                loader.setDecoderPath("Media/draco/");
                loader.load(
                    filePath,
                    function (geometry) {
                        var object;
                        geometry.computeVertexNormals();
                        if (geometry.index !== null) {
                            var material = new THREE.MeshStandardMaterial();

                            object = new THREE.Mesh(geometry, material);
                            object.name = filename;
                        } else {
                            var material = new THREE.PointsMaterial({ size: 0.01 });
                            material.vertexColors = geometry.hasAttribute("color");

                            object = new THREE.Points(geometry, material);
                            object.name = filename;
                        }

                        object.scale.set(scaleModel, scaleModel, scaleModel);
                        this.model = [object];
                        this.scene.add(object);
                        loader.dispose();
                    }.bind(this),
                    function () {},
                    function (e) {
                        if (retries < 3) {
                            console.warn(e);
                            console.log("Retrying to load model");
                            retries++;
                            setTimeout(
                                function () {
                                    p.loadModelFile.bind(this)(filePath, scaleModel, retries);
                                }.bind(this),
                                1000
                            );
                        } else {
                            console.warn(e);
                        }
                    }.bind(this)
                );

                break;
            }

            case "fbx": {
                var loader = new THREE.FBXLoader();
                loader.load(
                    filePath,
                    function (object) {
                        if (this.settings.activateAnimation) {
                            this.mixer = new THREE.AnimationMixer(object);
                            this.mixer.clipAction(object.animations[0]).play();
                        }

                        object.traverse(function (child) {
                            if (child.isMesh) {
                                child.castShadow = true;
                                child.receiveShadow = true;
                            }
                        });
                        object.scale.set(scaleModel, scaleModel, scaleModel);
                        this.model = [object];
                        this.scene.add(object);
                    }.bind(this),
                    function () {},
                    function (e) {
                        if (retries < 3) {
                            console.warn(e);
                            console.log("Retrying to load model");
                            retries++;
                            setTimeout(
                                function () {
                                    p.loadModelFile.bind(this)(filePath, scaleModel, retries);
                                }.bind(this),
                                1000
                            );
                        } else {
                            console.warn(e);
                        }
                    }.bind(this)
                );

                break;
            }

            case "glb": {
                // WARNING for use glb files
                // You must add draco package to Media folder
                var dracoLoader = new THREE.DRACOLoader();
                dracoLoader.setDecoderPath("Media/draco/gltf/");

                var loader = new THREE.GLTFLoader();
                loader.setDRACOLoader(dracoLoader);
                loader.load(
                    filePath,
                    function (gltf) {
                        if (this.settings.activateAnimation) {
                            this.mixer = new THREE.AnimationMixer(gltf.scene);
                            this.mixer.clipAction(gltf.animations[0]).play();
                        }

                        this.model = [gltf.scene];
                        this.scene.add(gltf.scene);
                    }.bind(this),
                    function () {},
                    function (e) {
                        if (retries < 3) {
                            console.warn(e);
                            console.log("Retrying to load model");
                            retries++;
                            setTimeout(
                                function () {
                                    p.loadModelFile.bind(this)(filePath, scaleModel, retries);
                                }.bind(this),
                                1000
                            );
                        } else {
                            console.warn(e);
                        }
                    }.bind(this)
                );

                break;
            }

            case "gltf": {
                new THREE.GLTFLoader().load(
                    filePath,
                    function (gltf) {
                        gltf.scene.scale.set(scaleModel, scaleModel, scaleModel);
                        this.model = [gltf.scale];
                        this.scene.add(gltf.scene);
                        p.render.bind(this)();
                    }.bind(this),
                    function () {},
                    function (e) {
                        if (retries < 3) {
                            console.warn(e);
                            console.log("Retrying to load model");
                            retries++;
                            setTimeout(
                                function () {
                                    p.loadModelFile.bind(this)(filePath, scaleModel, retries);
                                }.bind(this),
                                1000
                            );
                        } else {
                            console.warn(e);
                        }
                    }.bind(this)
                );

                break;
            }

            // TODO : Implement remaining file format
            // case 'ifc':

            // {

            //     var loader = new THREE.IFCLoader();
            //     loader.ifcManager.setWasmPath( 'Media/ifc/' );
            //     loader.load( filePath, (function ( model ) {
            // 		this.scene.add( model.mesh );
            // 		p.render.bind(this)();
            //     }).bind(this), function () {

            //     }, (function(e){
            //         if(retries<3){
            //             console.warn(e);
            //             console.log("Retrying to load model");
            //             retries++;
            //             setTimeout((function(){
            //                 p.loadModelFile.bind(this)(filePath, scaleModel, retries);
            //             }).bind(this), 1000);
            //         }else{
            //             console.warn(e);
            //         }

            //     }).bind(this) );

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
                console.warn("Unsupported file format (" + extension + ").");

                break;
        }
    };

    /**
     * @method setPosX
     * @iatStudioExposed
     * set the actual posX
     * @param {Number} value
     */
    p.setPosX = function (value) {
        if (value !== undefined) {
            this.settings.posX = parseFloat(value);
        }
    };

    /**
     * @method getPosX
     * get posX
     * @return {Number}
     */
    p.getPosX = function () {
        return this.settings.posX;
    };

    /**
     * @method setPosY
     * @iatStudioExposed
     * set the actual posY
     * @param {Number} value
     */
    p.setPosY = function (value) {
        if (value !== undefined) {
            this.settings.posY = parseFloat(value);
        }
    };

    /**
     * @method getPosY
     * get posY
     * @return {Number}
     */
    p.getPosY = function () {
        return this.settings.posY;
    };

    /**
     * @method setPosZ
     * @iatStudioExposed
     * set the actual posZ
     * @param {Number} value
     */
    p.setPosZ = function (value) {
        if (value !== undefined) {
            this.settings.posZ = parseFloat(value);
        }
    };

    /**
     * @method getPosZ
     * get posZ
     * @return {Number}
     */
    p.getPosZ = function () {
        return this.settings.posZ;
    };

    /**
     * @method setShowGrid
     * @iatStudioExposed
     * set the actual showGrid
     * @param {Boolean} value
     */
    p.setShowGrid = function (value) {
        if (value !== undefined) {
            this.settings.showGrid = value;
        }
    };

    /**
     * @method getShowGrid
     * get showGrid
     * @return {Boolean}
     */
    p.getShowGrid = function () {
        return this.settings.showGrid;
    };

    p.onWindowResize = function () {
        this.canvas.style.width = "100%";
        this.canvas.style.height = "100%";

        var clientWidth = this.canvas.clientWidth;
        var clientHeight = this.canvas.clientHeight;

        this.camera.aspect = clientWidth / clientHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(clientWidth, clientHeight);
    };

    p.animate = function () {
        requestAnimationFrame(p.animate.bind(this));

        var delta = this.clock.getDelta();

        if (this.mixer) this.mixer.update(delta);
        if (this.controls) this.controls.update();

        this.grid.visible = this.getShowGrid();

        if (this.model) {
            this.model.forEach(
                function (item) {
                    item.position.copy(new THREE.Vector3(this.getPosX(), this.getPosZ(), this.getPosY()));
                }.bind(this)
            );
        }
        p.render.bind(this)();
    };

    p.render = function () {
        this.renderer.render(this.scene, this.camera);
    };

    return dragAndDropCapability.decorate(WidgetClass, false);
});
