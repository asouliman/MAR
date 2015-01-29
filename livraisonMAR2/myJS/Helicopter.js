if (typeof (ModulesLoader) == 'undefined') {
	throw 'ModulesLoaderV2.js is required to load script Helicopter.js';
}
// Loads dependencies and initializes this module
ModulesLoader.requireModules(['threejs/three.min.js', 'myJS/ThreeLoadingEnv.js']);

// Loading environment
var Loader = new ThreeLoadingEnv();

var Helicopter = function (x, y, z, angle) {
	/**
	 * Constants
	 */
	this.MIN_SPEED = 1;
	this.MAX_SPEED = 10;
	this.DELTASPEED = 0.04;

	/**
	 * The body of the helicopter
	 */
	this.body = new THREE.Object3D();

	/**
	 * The right axe of the helicopter
	 */
	this.rightAxe = new THREE.Object3D();

	/**
	 * The center axe of the helicopter
	 */
	this.centerAxe = new THREE.Object3D();

	/**
	 * The left axe of the helicopter
	 */
	this.leftAxe = new THREE.Object3D();

	/**
	 * The right turbine of the helicopter
	 */
	this.rightTurbine = new THREE.Object3D();

	/**
	 * The center turbine of the helicopter
	 */
	this.centerTurbine = new THREE.Object3D();

	/**
	 * The left turbine of the helicopter
	 */
	this.leftTurbine = new THREE.Object3D();

	/**
	 * The turbines angle.
	 */
	this.turbinesAngle = 0;

	/**
	 * The blades of the helicopter
	 */
	this.blades = [];

	/**
	 * The blades rotation angle.
	 */
	this.bladeRotation = 0;

	/**
	 * The blades rotation speed.
	 */
	this.bladeRotationSpeed = 1;

	/**
	 * The object containing the physics.
	 */
	this.vehicle = new FlyingVehicle({
		position: new THREE.Vector3(x, y, z),
		zAngle: angle + Math.PI / 2.0
	});

	// Assemble the helicopter's parts
	this.build();
};

Helicopter.prototype.get = function () {
	return this.body;
};

Helicopter.prototype.getBlade = function (id) {
	var blade = this.blades[id];

	return blade !== undefined ? blade : null;
};

Helicopter.prototype.getRightAxe = function () {
	return this.rightAxe;
};

Helicopter.prototype.getLeftAxe = function () {
	return this.leftAxe;
};

Helicopter.prototype.getCenterAxe = function () {
	return this.centerAxe;
};

Helicopter.prototype.getRightTurbine = function () {
	return this.rightTurbine;
};

Helicopter.prototype.getLeftTurbine = function () {
	return this.leftTurbine;
};

Helicopter.prototype.getCenterTurbine = function () {
	return this.centerTurbine;
};

Helicopter.prototype.build = function () {
	Loader.load({
		filename: 'assets/helico/helicoCorp.obj',
		node: this.body,
		name: 'body'
	});

	this.body.position.set(0, 0, 0);

	this.assembleRightParts();
	this.assembleLeftParts();
	this.assembleCenterParts();
};

Helicopter.prototype.assembleRightParts = function () {

	// Load the right turbine asset
	this.rightTurbine = Loader.load({
		filename: 'assets/helico/turbine.obj',
		node: this.body,
		name: 'rightTurbine'
	});

	// Load the right axe asset
	this.rightAxe = Loader.load({
		filename: 'assets/helico/axe.obj',
		node: this.rightTurbine,
		name: 'rightAxe'
	});

	// Place the parts of the right scene graph
	this.rightAxe.position.set(0, 1, 0);
	this.rightTurbine.position.set(8.5, -3, 4);

	// Load right blades
	for (var i = 0; i < 4; i++) {
		var bladeName = 'rightBlade' + i;

		var blade = Loader.load({
			filename: 'assets/helico/pale2.obj',
			node: this.rightAxe,
			name: bladeName
		});

		blade.position.set(0, 2, 0);
		blade.rotation.y = i * 2 * Math.PI / 3;

		this.blades[bladeName] = blade;
	}

	// Bind the axe to the turbine
	this.rightTurbine.add(this.rightAxe);

	// Bind the right parts to the helicopter
	this.body.add(this.rightTurbine);
};

Helicopter.prototype.assembleCenterParts = function () {

	// Load the center turbine asset
	this.centerTurbine = Loader.load({
		filename: 'assets/helico/turbine.obj',
		node: this.body,
		name: 'centerTurbine'
	});

	// Load the center axe asset
	this.centerAxe = Loader.load({
		filename: 'assets/helico/axe.obj',
		node: this.centerTurbine,
		name: 'centerAxe'
	});

	// Place the parts of the center scene graph
	this.centerAxe.position.set(0, 1, 0);
	this.centerTurbine.position.set(0, 0, 4);
	this.centerTurbine.rotation.x = Math.PI / 2;

	// Load center blades
	for (var k = 0; k < 4; k++) {
		var bladeName = 'centerBlade' + k;

		var blade = Loader.load({
			filename: 'assets/helico/pale2.obj',
			node: this.centerAxe,
			name: bladeName
		});

		// Place the blade
		blade.position.set(0, 2, 0);
		blade.rotation.y = k * 2 * Math.PI / 3;

		// Save it in case we want to retreive them later
		this.blades[bladeName] = blade;
	}

	// Bind the axe to the turbine
	this.centerTurbine.add(this.centerAxe);

	// Bind the center parts to the helicopter
	this.body.add(this.centerTurbine);
};

Helicopter.prototype.assembleLeftParts = function () {

	// Load the left turbine asset
	this.leftTurbine = Loader.load({
		filename: 'assets/helico/turbine.obj',
		node: this.body,
		name: 'leftTurbine'
	});

	// Load the left axe asset
	this.leftAxe = Loader.load({
		filename: 'assets/helico/axe.obj',
		node: this.leftTurbine,
		name: 'leftAxe'
	});

	// Place thee parts in the scene graph
	this.leftAxe.position.set(0, 1, 0);
	this.leftTurbine.position.set(-8.5, -3, 4);

	// Load left blades
	for (var j = 0; j < 4; j++) {
		var bladeName = 'leftBlade' + j;

		var blade = Loader.load({
			filename: 'assets/helico/pale2.obj',
			node: this.leftAxe,
			name: bladeName
		});

		// Place the blade
		blade.position.set(0, 2, 0);
		blade.rotation.y = j * 2 * Math.PI / 3;

		// Save it
		this.blades[bladeName] = blade;
	}

	// Bind the axe to the turbine
	this.leftTurbine.add(this.leftAxe);

	// Bind the left parts to the helicopter
	this.body.add(this.leftTurbine);
};

Helicopter.prototype.update = function (delta) {
	// Vehicle stabilization
	this.vehicle.stabilizeSkid(50);
	this.vehicle.stabilizeTurn(1000);

	// Update physics
	this.vehicle.update(delta);

	// Update the helicopter's rotation from physics
	this.body.rotation.z = this.vehicle.angles.z - Math.PI / 2.0;

	// Make the blades rotate
	this.getRightAxe().rotation.y += this.bladeRotation * delta * this.bladeRotationSpeed;
	this.getCenterAxe().rotation.y -= this.bladeRotation * delta * this.MAX_SPEED;
	this.getLeftAxe().rotation.y += this.bladeRotation * delta * this.bladeRotationSpeed;

	this.bladeRotation = (this.bladeRotation + 1) % (2 * Math.PI);

	// Blade rotation speed from the acceleration
	this.bladeRotationSpeed = Math.abs(this.vehicle.acceleration.y);

	// TODO: update turbinesAngle

	// Turn the turbines to the direction the helicopter is heading to
	this.getRightTurbine().rotation.z = this.turbinesAngle;
	this.getLeftTurbine().rotation.z = this.turbinesAngle;
};

Helicopter.prototype.speedUp = function () {
	this.vehicle.goFront(1200, 1200);
};

Helicopter.prototype.slowDown = function () {
	this.vehicle.brake(100);
};

Helicopter.prototype.turnLeft = function () {
	this.vehicle.turnLeft(1000);
};

Helicopter.prototype.turnRight = function () {
	this.vehicle.turnRight(1000);
};

Helicopter.prototype.setPosition = function (x, y, z) {
	this.body.position.set(x, y, z);
};

Helicopter.prototype.getPosition = function () {
	return this.body.position;
};

Helicopter.prototype.getVehiculePosition = function () {
	return this.vehicle.position.clone();
};

Helicopter.prototype.setMatrix = function (matrix) {
	this.body.matrix.copy(matrix);
};

Helicopter.prototype.bindCamera = function (camera) {
	this.body.add(camera);
};