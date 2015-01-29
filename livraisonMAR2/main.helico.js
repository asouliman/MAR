/**
 *  ThreeJS test file using the ThreeRender class
 */
//Loads all dependencies
requirejs(['ModulesLoaderV2.js'], function() {
	// Level 0 includes
	ModulesLoader.requireModules(['threejs/three.min.js']);
	ModulesLoader.requireModules(['myJS/ThreeRenderingEnv.js',
		'myJS/ThreeLightingEnv.js',
		'myJS/ThreeLoadingEnv.js',
		'myJS/navZ.js',
		'myJS/Helicopter.js',
		'myJS/Keyboard.js',
		'FlyingVehicle.js'
	]);
	// Loads modules contained in includes and starts main function
	ModulesLoader.loadModules(start);
});

function start() {
	//	----------------------------------------------------------------------------
	//	MAR 2014 - TP Animation hélicoptère
	//	author(s) : Cozot, R. and Lamarche, F.
	//	----------------------------------------------------------------------------
	//	global vars
	//	----------------------------------------------------------------------------

	//	rendering env
	var renderingEnvironment = new ThreeRenderingEnv();

	//	lighting env
	var Lights = new ThreeLightingEnv('rembrandt', 'neutral', 'spot', renderingEnvironment, 5000);

	// Keyboard
	var keyboard = new Keyboard();

	var clock = new THREE.Clock(true);

	// Camera setup
	renderingEnvironment.camera.position.x = 0;
	renderingEnvironment.camera.position.y = 0;
	renderingEnvironment.camera.position.z = 40;

	var helicopter = new Helicopter(-220, 0, 0, 0);

	renderingEnvironment.addToScene(helicopter.get());

	//	event listener
	//	---------------------------------------------------------------------------
	//	resize window
	window.addEventListener('resize', onWindowResize, false);

	function update(delta) {
		var rotationIncrement = 0.05;

		if (keyboard.isDown('z')) {
			helicopter.speedUp();
		}

		if (keyboard.isDown('s')) {
			helicopter.slowDown();
		}

		if (keyboard.isDown('q')) {
			helicopter.turnLeft();
		}

		if (keyboard.isDown('d')) {
			helicopter.turnRight();
		}

		if (keyboard.isDown('up')) {
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(1.0, 0.0, 0.0), -rotationIncrement);
		}

		if (keyboard.isDown('down')) {
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(1.0, 0.0, 0.0), rotationIncrement);
		}

		if (keyboard.isDown('left')) {
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(0.0, 1.0, 0.0), -rotationIncrement);
		}

		if (keyboard.isDown('right')) {
			renderingEnvironment.scene.rotateOnAxis(new THREE.Vector3(0.0, 1.0, 0.0), rotationIncrement);
		}

		helicopter.update(delta);
	}

	//	window resize
	function onWindowResize() {
		renderingEnvironment.onWindowResize(window.innerWidth, window.innerHeight);
	}

	function render() {
		renderingEnvironment.renderer.render(renderingEnvironment.scene, renderingEnvironment.camera);
	}

	function animate() {
		requestAnimationFrame(animate);

		var delta = clock.getDelta();

		update(delta);
		render();
	}

	animate();
}