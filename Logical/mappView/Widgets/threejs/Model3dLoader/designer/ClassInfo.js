define(["brease/core/designer/BaseWidget/ClassInfo"], function (s, e) {
    "use strict";
    var classInfo = {
        meta: {
            className: "widgets.threejs.Model3dLoader",
            parents: ["*"],
            children: [],
            inheritance: ["widgets.threejs.Model3dLoader", "brease.core.BaseWidget"],
            actions: {
                Focus: {
                    method: "focus"
                },
                setEditable: {
                    method: "setEditable",
                    parameter: {
                        editable: {
                            name: "editable",
                            index: 0,
                            type: "Boolean"
                        },
                        metaData: {
                            name: "metaData",
                            index: 1,
                            type: "Object"
                        }
                    }
                },
                SetEnable: {
                    method: "setEnable",
                    parameter: {
                        value: {
                            name: "value",
                            index: 0,
                            type: "Boolean"
                        }
                    }
                },
                setParentCoWiId: {
                    method: "setParentCoWiId",
                    parameter: {
                        value: {
                            name: "value",
                            index: 0,
                            type: "String"
                        }
                    }
                },
                SetStyle: {
                    method: "setStyle",
                    parameter: {
                        value: {
                            name: "value",
                            index: 0,
                            type: "StyleReference"
                        }
                    }
                },
                setTabIndex: {
                    method: "setTabIndex",
                    parameter: {
                        value: {
                            name: "value",
                            index: 0,
                            type: "Number"
                        }
                    }
                },
                SetVisible: {
                    method: "setVisible",
                    parameter: {
                        value: {
                            name: "value",
                            index: 0,
                            type: "Boolean"
                        }
                    }
                },
                SetDataProvider: {
                    method: "setDataProvider",
                    parameter: {
                        provider: {
                            name: "provider",
                            index: 0,
                            type: "ItemCollection"
                        }
                    }
                },
                SetImage: {
                    method: "setcubeTexture",
                    parameter: {
                        cubeTexture: {
                            name: "cubeTexture",
                            index: 0,
                            type: "ImagePath"
                        }
                    }
                },
                SetModel3d: {
                    method: "setModel3d",
                    parameter: {
                        model3d: {
                            name: "model3d",
                            index: 0,
                            type: "FilePath"
                        }
                    }
                },
                SetmodelScale: {
                    method: "SetmodelScale",
                    parameter: {
                        modelScale: {
                            name: "modelScale",
                            index: 0,
                            type: "Number"
                        }
                    }
                },
                SetPosX: { 
                    method: "setPosX", 
                    parameter: { 
                        value: { 
                            name: "value", 
                            index: 0, 
                            type: "Number" 
                        } 
                    } 
                }, 
                SetPosY: { 
                    method: "setPosY", 
                    parameter: { 
                        value: { 
                            name: "value", 
                            index: 0, 
                            type: "Number" 
                        } 
                    } 
                }, 
                SetPosZ: { 
                    method: "setPosY", 
                    parameter: { 
                        value: { 
                            name: "value", 
                            index: 0, 
                            type: "Number" 
                        } 
                    } 
                },
                SetShowGrid: { 
                    method: "setShowGrid", 
                    parameter: { 
                        value: { 
                            name: "value", 
                            index: 0, 
                            type: "Boolean" 
                        } 
                    } 
                }
            },
            properties: {}
        }
    };
    if (s.classExtension) {
        classInfo.classExtension = s.classExtension;
    }
    if (e) {
        classInfo.classExtension = e;
    }
    return classInfo;
});
