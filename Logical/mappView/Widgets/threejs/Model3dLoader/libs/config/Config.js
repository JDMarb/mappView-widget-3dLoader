define([], function () {
    "use strict";

    /**
     * @class widgets.threejs.Model3dLoader.config.Config
     * @extends core.javascript.Object
     * @override widgets.threejs.Model3dLoader
     */

    
    /**
     * @cfg {Number} modelScale=1
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * @nodeRefId modelScale
     * Initial visible value of input field as a number
     */

    /**
     * @cfg {Number} posX=0
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * @nodeRefId posX
     * Initial visible value of input field as a number
     */

    /**
     * @cfg {Number} posY=0
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * @nodeRefId posY
     * Initial visible value of input field as a number
     */

    /**
     * @cfg {Number} posZ=0
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * @nodeRefId posZ
     * Initial visible value of input field as a number
     */

    /**
     * @cfg {Boolean} showGrid=true
     * @bindable
     * @iatStudioExposed
     * @iatCategory Data
     * @nodeRefId showGrid
     * Initial visible value of input field as a number
     */

    return {
        backgroundTexture: "",
        model3d: "",
        activateAnimation: false,
        activateKinematics: false,
        modelScale: 1,
        posX: 0,
        posY: 0,
        posZ: 0,
        showGrid: true
    };
});
