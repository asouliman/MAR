/**
 *  ThreeJS test file using the ThreeRender class
 */
//Loads all dependencies
requirejs(['ModulesLoaderV2.js'], function() {
    // Level 0 includes
    ModulesLoader.requireModules(["threejs/three.min.js"]);
    ModulesLoader.requireModules([
        "myJS/ThreeLightingEnv.js",
        "myJS/ThreeLoadingEnv.js",
        "myJS/navZ.js",
        "myJS/CameraManager.js",
        "myJS/Keyboard.js",
        "myJS/Car.js",
        "myJS/Helicopter.js",
        "FlyingVehicle.js"
    ]);
    // Loads modules contained in includes and starts main function
    ModulesLoader.loadModules(main);
});

function main() {
    // Car position
    var posX = -220;
    var posY = 0;
    var posZ = 0;
    var angle = 0;

    // Camera Manager
    var CM = new CameraManager();

    //	lighting env
    var Lights = new ThreeLightingEnv('rembrandt', 'neutral', 'spot', CM, 5000);

    //	Loading env
    var Loader = new ThreeLoadingEnv();

    var NAV = new navPlaneSet();

    // Create the keyboard
    var keyboard = new Keyboard();

    var helicopter = new Helicopter(posX, posY, posZ, angle);

    var clock = new THREE.Clock(true);

    var lap = -1;
    var currentNav = 0;
    var previousNav = 0;

    initialize();
    animate();

    //	window resize
    function onWindowResize() {
        CM.onWindowResize(window.innerWidth, window.innerHeight, CM);
    }

    function initialize() {
        //	Meshes
        Loader.loadMesh('assets', 'border_Zup_02', 'obj', CM.scene, 'border', -340, -340, 0, 'front');
        Loader.loadMesh('assets', 'ground_Zup_03', 'obj', CM.scene, 'ground', -340, -340, 0, 'front');
        Loader.loadMesh('assets', 'circuit_Zup_02', 'obj', CM.scene, 'circuit', -340, -340, 0, 'front');
        Loader.loadMesh('assets', 'arrivee_Zup_01', 'obj', CM.scene, 'decors', -340, -340, 0, 'front');

        //	Skybox
        Loader.loadSkyBox('assets/maps', ['px', 'nx', 'py', 'ny', 'pz', 'nz'], 'jpg', CM.scene, 'sky', 4000);

        helicopter.bindCamera(CM.carCamera);
        CM.addToScene(helicopter.get());

        createNav();

        //	resize window
        window.addEventListener('resize', onWindowResize, false);
    }

    function animate() {
        requestAnimationFrame(animate);

        var delta = clock.getDelta();

        update(delta);
        render();
    }

    function update(delta) {
        if (keyboard.isDown('D')) {
            helicopter.turnRight();
        }
        if (keyboard.isDown('Q')) {
            helicopter.turnLeft();
        }
        if (keyboard.isDown('Z')) {
            helicopter.speedUp();
        }
        if (keyboard.isDown('S')) {
            helicopter.slowDown();
        }

        if (keyboard.isDown('0')) {
            CM.currentView = 0;
        }
        if (keyboard.isDown('1')) {
            CM.currentView = 1;
        }

        CM.updateCircuitCamera();

        // If we choose the cameras placed around the circuit
        if (CM.currentView == 1) {
            // We make the camera follow the car
            CM.getCurrentView().up = new THREE.Vector3(0, 0, 1);
            CM.getCurrentView().lookAt(helicopter.getPosition());

            if (2 <= currentNav && currentNav < 13) {
                CM.cameraToShow = 1;
            } else if (13 <= currentNav && currentNav < 21) {
                CM.cameraToShow = 2;
            } else {
                CM.cameraToShow = 0;
            }
        }

        var oldPosition = helicopter.getVehiculePosition();
        helicopter.update(delta);
        var newPosition = helicopter.getVehiculePosition();
        newPosition.sub(oldPosition);

        // NAV
        NAV.move(newPosition.x, newPosition.y, 150, 10);

        // carPosition
        helicopter.setPosition(NAV.x, NAV.y, NAV.z);

        // Updates carFloorSlope
        helicopter.setMatrix(NAV.localMatrix(posX, posY));

        // Count the number of lap
        countLaps();
    }

    function render() {
        CM.renderer.render(CM.scene, CM.getCurrentView());
    };

    function createNav() {
        //	Planes Set for Navigation
        // 	z up
        NAV = new navPlaneSet(new navPlane('p01', -260, -180, -80, 120, +0, +0, 'px')); // 01
        NAV.addPlane(new navPlane('p02', -260, -180, 120, 200, +0, +20, 'py')); // 02
        NAV.addPlane(new navPlane('p03', -260, -240, 200, 240, +20, +20, 'px')); // 03
        NAV.addPlane(new navPlane('p04', -240, -160, 200, 260, +20, +20, 'px')); // 04
        NAV.addPlane(new navPlane('p05', -160, -80, 200, 260, +20, +40, 'px')); // 05
        NAV.addPlane(new navPlane('p06', -80, -20, 200, 260, +40, +60, 'px')); // 06
        NAV.addPlane(new navPlane('p07', -20, +40, 140, 260, +60, +60, 'px')); // 07
        NAV.addPlane(new navPlane('p08', 0, +80, 100, 140, +60, +60, 'px')); // 08
        NAV.addPlane(new navPlane('p09', 20, +100, 60, 100, +60, +60, 'px')); // 09
        NAV.addPlane(new navPlane('p10', 40, +100, 40, 60, +60, +60, 'px')); // 10
        NAV.addPlane(new navPlane('p11', 100, 180, 40, 100, +40, +60, 'nx')); // 11
        NAV.addPlane(new navPlane('p12', 180, 240, 40, 80, +40, +40, 'px')); // 12
        NAV.addPlane(new navPlane('p13', 180, 240, 0, 40, +20, +40, 'py')); // 13
        NAV.addPlane(new navPlane('p14', 200, 260, -80, 0, +0, +20, 'py')); // 14
        NAV.addPlane(new navPlane('p15', 180, 240, -160, -80, +0, +40, 'ny')); // 15
        NAV.addPlane(new navPlane('p16', 160, 220, -220, -160, +40, +40, 'px')); // 16
        NAV.addPlane(new navPlane('p17', 80, 160, -240, -180, +40, +40, 'px')); // 17
        NAV.addPlane(new navPlane('p18', 20, 80, -220, -180, +40, +40, 'px')); // 18
        NAV.addPlane(new navPlane('p19', 20, 80, -180, -140, +40, +60, 'py')); // 19
        NAV.addPlane(new navPlane('p20', 20, 80, -140, -100, +60, +80, 'py')); // 20
        NAV.addPlane(new navPlane('p21', 20, 60, -100, -40, +80, +80, 'px')); // 21
        NAV.addPlane(new navPlane('p22', -80, 20, -100, -40, +80, +80, 'px')); // 22
        NAV.addPlane(new navPlane('p23', -140, -80, -100, -40, +80, +80, 'px')); // 23
        NAV.addPlane(new navPlane('p24', -140, -80, -140, -100, +60, +80, 'py')); // 24
        NAV.addPlane(new navPlane('p25', -140, -80, -200, -140, +40, +60, 'py')); // 25
        NAV.addPlane(new navPlane('p26', -100, -80, -240, -200, +40, +40, 'px')); // 26
        NAV.addPlane(new navPlane('p27', -220, -100, -260, -200, +40, +40, 'px')); // 27
        NAV.addPlane(new navPlane('p28', -240, -220, -240, -200, +40, +40, 'px')); // 28
        NAV.addPlane(new navPlane('p29', -240, -180, -200, -140, +20, +40, 'ny')); // 29
        NAV.addPlane(new navPlane('p30', -240, -180, -140, -80, +0, +20, 'ny')); // 30
        NAV.setPos(posX, posY, posZ);
        NAV.initActive();
    }

    function countLaps() {
        currentNav = parseInt(NAV.findActive(helicopter.getPosition().x, helicopter.getPosition().y));

        if (previousNav < currentNav) {
            // Check if the player is going ahead by saving the highest planes he's been on
            previousNav = currentNav % (NAV.planeSetSize() - 1);

            // Check if the player passed the lap line
            if (previousNav == 1) {
                // Increase the lap number
                lap++;
                document.getElementById('lapNumber').textContent = lap;
            }
        }
    }
}