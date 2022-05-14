import { GLTFLoader } from "./assets/lib/GLTFLoader.js";
import { OrbitControls } from "./assets/lib/OrbitControls.js";
import { TransformControls } from "./assets/lib/TransformControls.js";
import { TeapotGeometry } from "./assets/lib/TeapotGeometry.js";

var activeControl = false,
    hasLight = false,
    alpha = 0,
    mode = 0,
    angle = Math.PI/3,
    playMusic = false;



function init() {
    var scene = new THREE.Scene();

    var geometry, material, mesh, obj;
    var isModel = false;
    material = new THREE.MeshStandardMaterial({ color: "#ffffff" });

    //Background Texture SkyBox
    var skyBox = new THREE.CubeTextureLoader().load([
      'assets/textures/distant_sunset_ft.jpg',
      'assets/textures/distant_sunset_bk.jpg',
      'assets/textures/distant_sunset_up.jpg',
      'assets/textures/distant_sunset_dn.jpg',
      'assets/textures/distant_sunset_rt.jpg',
      'assets/textures/distant_sunset_lf.jpg',
    ]);

    scene.background = skyBox;



    var gridHelper = new THREE.GridHelper(150, 30, "#fff", "#fff");
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);
    THREE.RectAreaLightUniformsLib.init();

    var plane = getPointLight(0xffffff, 10 , 100);
    var pointLight = getPointLight(0xffffff, 10, 100);
    var ambientLight = getAmbientLight(0xffffff, 0.5);
    var hemisphereLight = getHemisphereLight(0x00ffff, 0xffffff, 10);
    var rectLight = getRectAreaLight(0x00ffff, 10, 30, 40);
    var directLight = getDirectionalLight(0x00ffff, 10);
    var spotLight = getSpotLight(0x00ffff, 10);


    var loader = new GLTFLoader();

    var gui = new dat.GUI();
    gui.domElement.id = "GUI";



    //Handle event on click geometry
    $(".geometry").click(function () {
        if (activeControl) {
            $(".controls-btn.active").removeClass("active");
            transformControls.detach(mesh);
        }

        var geometryName = $(this).text();
        switch (geometryName) {
            case "Box":
                isModel = false;
                geometry = new THREE.BoxGeometry(5, 5, 5);
                mesh = new THREE.Mesh(geometry, material);

                scene.remove(scene.getObjectByName("geometry"));

                mesh.name = "geometry";
                mesh.castShadow = true; // Shadow (đổ bóng).

                scene.add(mesh);
                break;
            case "Sphere":
                isModel = false;
                geometry = new THREE.SphereGeometry(5, 64, 32);
                mesh = new THREE.Mesh(geometry, material);

                scene.remove(scene.getObjectByName("geometry"));

                mesh.name = "geometry";
                mesh.castShadow = true; // Shadow (đổ bóng).

                scene.add(mesh);
                break;
            case "Cone":
                isModel = false;
                geometry = new THREE.ConeGeometry(5, 5, 64);
                mesh = new THREE.Mesh(geometry, material);

                scene.remove(scene.getObjectByName("geometry"));

                mesh.name = "geometry";
                mesh.castShadow = true; // Shadow (đổ bóng).

                scene.add(mesh);
                break;
            case "Cylinder":
                isModel = false;
                geometry = new THREE.CylinderGeometry(5, 5, 6, 64);
                mesh = new THREE.Mesh(geometry, material);

                scene.remove(scene.getObjectByName("geometry"));

                mesh.name = "geometry";
                mesh.castShadow = true; // Shadow (đổ bóng).

                scene.add(mesh);
                break;
            case "Torus":
                isModel = false;
                geometry = new THREE.TorusGeometry(4, 2, 16, 100);
                mesh = new THREE.Mesh(geometry, material);

                scene.remove(scene.getObjectByName("geometry"));

                mesh.name = "geometry";
                mesh.castShadow = true; // Shadow (đổ bóng).

                scene.add(mesh);
                break;
            case "Tube":
                isModel = false;
                geometry = new THREE.TubeGeometry(getTube(6), 20, 2, 8, false);
                mesh = new THREE.Mesh(geometry, material);

                scene.remove(scene.getObjectByName("geometry"));

                mesh.name = "geometry";
                mesh.castShadow = true; // Shadow (đổ bóng).

                scene.add(mesh);
                break;
            case "Teapot":
                isModel = false;
                geometry = new TeapotGeometry(4, 10);
                mesh = new THREE.Mesh(geometry, material);

                scene.remove(scene.getObjectByName("geometry"));

                mesh.name = "geometry";
                mesh.castShadow = true; // Shadow (đổ bóng).

                scene.add(mesh);
                break;
            case "Octahedron":
                isModel = false;
                geometry = new THREE.OctahedronGeometry(10, 0);
                mesh = new THREE.Mesh(geometry, material);

                scene.remove(scene.getObjectByName("geometry"));

                mesh.name = "geometry";
                mesh.castShadow = true; // Shadow (đổ bóng).

                scene.add(mesh);
                break;
            case "Skeleton":
                isModel = true;
                loader.load("./assets/skeleton/scene.gltf", function(gltf){
                    obj = gltf.scene;
                    scene.remove(scene.getObjectByName("geometry"));
                    obj.name = "geometry";
                    obj.castShadow = true;
                    scene.add(gltf.scene);
                })
                break;
            case "Eiffel Tower":
                isModel = true;
                loader.load("./assets/eiffel_tower/scene.gltf", function(gltf){
                    obj = gltf.scene;
                    scene.remove(scene.getObjectByName("geometry"));
                    obj.name = "geometry";
                    obj.castShadow = true;
                    scene.add(gltf.scene);
                })
                break;
            case "Phone Table":
                isModel = true;
                loader.load("./assets/eiffel_tower_phone/scene.gltf", function(gltf){
                    obj = gltf.scene;
                    scene.remove(scene.getObjectByName("geometry"));
                    obj.name = "geometry";
                    obj.castShadow = true;
                    scene.add(gltf.scene);
                })
                break;
        }
    });

    //Handle event on click surface
    $(".surface").click(function () {
        if (activeControl) {
            $(".controls-btn.active").removeClass("active");
            transformControls.detach(mesh);
        }

        var loader = new THREE.TextureLoader();
        scene.remove(scene.getObjectByName("geometry"));

        var materialName = $(this).text(),
            materialColor = material.color;

        switch (materialName) {
            case "Point":
                material = new THREE.PointsMaterial({ color: materialColor, size: 0.2 });
                mesh = new THREE.Points(geometry, material);

                break;
            case "Line":
                material = new THREE.LineBasicMaterial({ color: materialColor });
                mesh = new THREE.Line(geometry, material);

                break;
            case "Solid":
                material = new THREE.MeshStandardMaterial({ color: materialColor });
                mesh = new THREE.Mesh(geometry, material);
                break;
            case "Texture Banana":
                material = new THREE.MeshStandardMaterial({
                    map: loader.load("./assets/textures/yellow+bananas+texture.jpg"),
                });
                mesh = new THREE.Mesh(geometry, material);

                break;
            case "Texture Color":
                material = new THREE.MeshStandardMaterial({
                    map: loader.load("./assets/textures/colorful-texture-5.jpg"),
                });
                mesh = new THREE.Mesh(geometry, material);

                break;
            case "Texture Water":
                material = new THREE.MeshStandardMaterial({
                    map: loader.load("./assets/textures/water.jpg"),
                });
                mesh = new THREE.Mesh(geometry, material);

                break;
        }
        mesh.name = "geometry";
        mesh.castShadow = true; // Shadow (đổ bóng).
        scene.add(mesh);
    });

    //Handle event click on button controls
    $(".controls-btn").click(function () {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            transformControls.detach(mesh);
            activeControl = false;
        } else {
            activeControl = true;
            const controlType = $(this).attr("type");
            switch (controlType) {
                case "translate":
                    if (isModel){
                        transformControls.attach(obj);
                    }
                    else {
                        transformControls.attach(mesh);
                    }
                    transformControls.setMode("translate");
                    break;
                case "scale":
                    if (isModel){
                        transformControls.attach(obj);
                    }
                    else {
                        transformControls.attach(mesh);
                    }
                    transformControls.setMode("scale");
                    break;
                case "rotate":
                    if (isModel){
                        transformControls.attach(obj);
                    }
                    else {
                        transformControls.attach(mesh);
                    }
                    transformControls.setMode("rotate");
                    break;
                case "move-light":
                    if (mode === 1){
                        transformControls.attach(pointLight);
                        transformControls.setMode("translate");
                    }
                    else if (mode === 3){
                        transformControls.attach(hemisphereLight);
                        transformControls.setMode("translate");
                    }
                    else if (mode === 4){
                        transformControls.attach(rectLight);
                        transformControls.setMode("translate");
                    }
                    else if (mode === 5){
                        transformControls.attach(directLight);
                        transformControls.setMode("translate");
                    }
                    else if (mode === 6){
                        transformControls.attach(spotLight);
                        transformControls.setMode("translate");
                    }
                    break;
            }
            $(".controls-btn.active").removeClass("active");
            $(this).addClass("active");

            scene.add(transformControls);

        }
    });

    //Handle event on click light
    $(".light").click(function () {
        if ($(this).text() == "Point Light" && hasLight === false) {
            hasLight = true;
            mode = 1;
            scene.add(pointLight);

            plane = getPlane(150);
            gridHelper.add(plane);

            var pointLightHelper = getPointLightHelper(pointLight);
            scene.add(pointLightHelper);

        }
        else if ($(this).text() == "Ambient Light" && hasLight === false) {
            hasLight = true;
            mode = 2;
            scene.add(ambientLight);

            plane = getPlane(150);
            gridHelper.add(plane);


        }
        else if ($(this).text() == "Hemisphere" && hasLight === false) {
            hasLight = true;
            mode = 3;
            scene.add(hemisphereLight);

            var plane = getPlane(150);
            gridHelper.add(plane);

            var hemisphereLightHelper = getHemisphereLightHelper(hemisphereLight);
            scene.add(hemisphereLightHelper);

        }
        else if ($(this).text() == "Rect Light" && hasLight === false) {
            hasLight = true;
            mode = 4;
            scene.add(rectLight);

            var plane = getPlane(150);
            gridHelper.add(plane);

            var rectLightHelper = getRectAreaLightHelper(rectLight);
            scene.add(rectLightHelper);

        }
        else if ($(this).text() == "Directional" && hasLight === false) {
            hasLight = true;
            mode = 5;
            scene.add(directLight);

            var plane = getPlane(150);
            gridHelper.add(plane);

            var directLightHelper = getDirectionalLightHelper(directLight);
            scene.add(directLightHelper);

        }
        else if ($(this).text() == "Spot Light" && hasLight === false) {
            hasLight = true;
            mode = 6;
            scene.add(spotLight);

            var plane = getPlane(150);
            gridHelper.add(plane);

            var spotLightHelper = getSpotLightHelper(spotLight);
            scene.add(spotLightHelper);

        }
        else {
            hasLight = false;

            scene.remove(scene.getObjectByName("PointLight"));
            scene.remove(scene.getObjectByName("AmbientLight"));
            scene.remove(scene.getObjectByName("HemisphereLight"));
            scene.remove(scene.getObjectByName("RectLight"));
            scene.remove(scene.getObjectByName("DirectLight"));
            scene.remove(scene.getObjectByName("SpotLight"));
            scene.remove(scene.getObjectByName("PointLightHelper"));
            scene.remove(scene.getObjectByName("HemisphereLightHelper"));
            scene.remove(scene.getObjectByName("RectLightHelper"));
            scene.remove(scene.getObjectByName("DirectLightHelper"));
            scene.remove(scene.getObjectByName("SpotLightHelper"));
            gridHelper.remove(scene.getObjectByName("Plane"));
            
        }
    });

    //Handle event on click animation
    $(".anim").click(function () {
        var $name = $(this).text();
        if ($(".anim.active").hasClass("active")) {
            $(".anim.active").removeClass("active");
        }
        switch ($name) {
            case "Spin":
                $(this).addClass("active");
                break;
            case "Go Around":
                $(this).addClass("active");
                break;
            case "Bounce":
                $(this).addClass("active");
                break;
            case "Remove All":
                break;
        }
    });






    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(10, 7, 20);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.updateProjectionMatrix();
    function updateCamera() {
        camera.updateProjectionMatrix();
    }

    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight - 46);
    renderer.setClearColor("#15151e");
    renderer.shadowMap.enabled = true; // ShadowMap (Đổ bóng).
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Type of shadowMap.
    document.getElementById("WebGL").appendChild(renderer.domElement);
    renderer.render(scene, camera);

    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    var transformControls = new TransformControls(camera, renderer.domElement);
    transformControls.size = 0.5;
    transformControls.addEventListener("dragging-changed", (event) => {
        controls.enabled = !event.value;
    });

    var cameraGUI = gui.addFolder("Camera");
    cameraGUI.add(camera, "fov", 0, 175).name("FOV").onChange(updateCamera);
    cameraGUI.add(camera, "near", 1, 50, 1).name("Near").onChange(updateCamera);
    cameraGUI.add(camera, "far", 1000, 5000, 10).name("Far").onChange(updateCamera);
    cameraGUI.open();

    var planeColorGUI;
    var colorGUI = gui.addFolder("Color");
    addColorGUI(material, "Geometry Color", { color: 0xffffff }, colorGUI);
    colorGUI.open();

    //PointLight Control
    var pointLightGUI = gui.addFolder("Point Light Control");
    pointLightGUI.add(pointLight, "intensity", 1, 20, 1).name("Intensity");
    pointLightGUI.add(pointLight, "distance", 1, 200, 1).name("Distance");
    addColorGUI(pointLight, "Light Color", { color: 0xffffff }, pointLightGUI);
    //pointLightGUI.open();

    //AmbientLight Control
    var ambientLightGUI = gui.addFolder("Ambient Light Control");
    addColorGUI(ambientLight, "Light Color", { color: 0xffffff }, ambientLightGUI);
    ambientLightGUI.add(ambientLight, "intensity", 1, 20, 1).name("Intensity");


    //HemisphereLight Control
    var hemisphereLightGUI = gui.addFolder("Hemisphere Light Control");
    hemisphereLightGUI.add(hemisphereLight, "intensity", 1, 20, 1).name("Intensity");
    hemisphereLightGUI.add(hemisphereLight, "visible");
    const params1 = {
        textField: "Thay đổi skyColor"
    }
    const params2 = {
        textField: "Thay đổi groundColor"
    }
    hemisphereLightGUI.add(params1, "textField");
    hemisphereLightGUI.add(hemisphereLight.color, "r", 0, 1);
    hemisphereLightGUI.add(hemisphereLight.color, "g", 0, 1);
    hemisphereLightGUI.add(hemisphereLight.color, "b", 0, 1);
    hemisphereLightGUI.add(params2, "textField");
    hemisphereLightGUI.add(hemisphereLight.groundColor, "r", 0, 1);
    hemisphereLightGUI.add(hemisphereLight.groundColor, "g", 0, 1);
    hemisphereLightGUI.add(hemisphereLight.groundColor, "b", 0, 1);

    //RectAreaLight Control
    var rectLightGUI = gui.addFolder("Rect Area Light Control");
    addColorGUI(rectLight, "Light Color", { color: 0xffffff }, rectLightGUI);
    rectLightGUI.add(rectLight, "intensity", 1, 20, 1).name("Intensity");
    rectLightGUI.add(rectLight, "width", 1, 100, 1).name("Width");
    rectLightGUI.add(rectLight, "height", 1, 100, 1).name("Height");


    //DirectionalLight Control
    var directLightGUI = gui.addFolder("Directional Light Control");
    addColorGUI(directLight, "Light Color", { color: 0xffffff }, directLightGUI);
    directLightGUI.add(directLight, "intensity", 1, 20, 1).name("Intensity");


    //SpotLight Control
    var spotLightGUI = gui.addFolder("Spot Light Control");
    addColorGUI(spotLight, "Light Color", { color: 0xffffff }, spotLightGUI);
    spotLightGUI.add(spotLight, "intensity", 1, 20, 1).name("Intensity");




    update(renderer, scene, camera, controls);
}

function update(renderer, scene, camera, controls) {
    renderer.render(scene, camera);
    controls.update();



    var geometry = scene.getObjectByName("geometry");
    var name = $(".anim.active").text();
    var temp = Date.now();
    switch (name) {
        case "Spin":
            geometry.rotation.x = temp * 0.005;
            geometry.rotation.y = temp * 0.001;
            geometry.rotation.z = temp * 0.002;
            break;
        case "Go Around":
            geometry.position.x = (Math.cos(temp * 0.002)) * 10;
            geometry.position.z = (Math.sin(temp * 0.002)) * 10;
            geometry.rotation.y = temp * 0.001;
            geometry.rotation.z = temp * 0.002;
            geometry.rotation.x = temp * 0.005;
            break;
        case "Bounce":
            geometry.position.y = (Math.sin(temp * 0.002) + 1) * 5;
            geometry.rotation.x = temp * 0.005;
            geometry.rotation.z = temp * 0.002;

            break;
    }

    requestAnimationFrame(function () {
        update(renderer, scene, camera, controls);
    });
}

function getPlane(size) {
    var geometry = new THREE.PlaneGeometry(size, size);
    var material = new THREE.MeshStandardMaterial({
        color: "#15151e",
        side: THREE.DoubleSide,
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true; // Receive shadow (Nhận đổ bóng).
    mesh.rotation.x = Math.PI / 2;
    mesh.name = "Plane";

    return mesh;
}

function getTube(size) {
    class CustomSinCurve extends THREE.Curve {
        constructor(scale = 1) {
            super();

            this.scale = scale;
        }

        getPoint(t, optionalTarget = new THREE.Vector3()) {
            const tx = t * 3 - 1.5;
            const ty = Math.sin(2 * Math.PI * t);
            const tz = 0;

            return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
        }
    }

    return new CustomSinCurve(size);
}

function getPointLight(color, intensity, distance) {
    var pointLight = new THREE.PointLight(color, intensity, distance);
    pointLight.position.set(10, 10, 10);
    pointLight.castShadow = true;
    pointLight.name = "PointLight";

    return pointLight;
}

function getAmbientLight(color, intensity) {
    var ambientLight = new THREE.AmbientLight(color, intensity);
    ambientLight.name = "AmbientLight";

    return ambientLight;
}


function getHemisphereLight(colorUp, colorDown, intensity) {
    var hemisphereLight = new THREE.HemisphereLight(colorUp, colorDown, intensity);
    hemisphereLight.name = "HemisphereLight";
    hemisphereLight.castShadow = true;
    hemisphereLight.position.set(0, 10, 0);

    return hemisphereLight;
}

function getRectAreaLight(color, intensity, width, height) {
    var rectLight = new THREE.RectAreaLight(color, intensity, width, height);
    rectLight.name = "RectLight";
    rectLight.castShadow = true;
    rectLight.position.set(0, 10, 0);
    rectLight.lookAt(0, 0, 0);

    return rectLight;
}


function getDirectionalLight(color, intensity) {
    var directLight = new THREE.DirectionalLight(color, intensity);
    directLight.name = "DirectLight";
    directLight.castShadow = true;
    directLight.position.set(0, 10, 0);

    return directLight;
}


function getSpotLight(color, intensity, angle) {
    var spotLight = new THREE.SpotLight(color, intensity, angle);
    spotLight.name = "SpotLight";
    spotLight.castShadow = true;
    spotLight.position.set(0, 10, 0);

    return spotLight;
}

function getPointLightHelper(pointLight) {
    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    pointLightHelper.name = "PointLightHelper";

    return pointLightHelper;
}


function getHemisphereLightHelper(hemisphereLight) {
    const sphereSize = 3;
    const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, sphereSize);
    hemisphereLightHelper.name = "HemisphereLightHelper";


    return hemisphereLightHelper;
}


function getRectAreaLightHelper(rectLight) {
    const rectLightHelper = new THREE.RectAreaLightHelper(rectLight);
    rectLightHelper.name = "RectLightHelper";
    //hemisphereLightHelper.position.set(10, 10, 10);

    return rectLightHelper;
}


function getDirectionalLightHelper(directLight) {
    //const sphereSize = 3;
    const directLightHelper = new THREE.DirectionalLightHelper(directLight);
    directLightHelper.name = "DirectLightHelper";
    directLightHelper.castShadow = true;
    //hemisphereLightHelper.position.set(10, 10, 10);

    return directLightHelper;
}


function getSpotLightHelper(spotLight) {
    const sphereSize = 3;
    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    spotLightHelper.name = "SpotLightHelper";
    spotLightHelper.castShadow = true;
    //hemisphereLightHelper.position.set(10, 10, 10);

    return spotLightHelper;
}


function addColorGUI(obj, name, params, folder) {
    var objColorGUI = folder
        .addColor(params, "color")
        .name(name)
        .onChange(function () {
            obj.color.set(params.color);
        });

    return objColorGUI;
}

init();
