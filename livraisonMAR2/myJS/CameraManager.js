/**
Class handling the cameras.
*/
var CameraManager = function() {

	// Scene
	this.scene = new THREE.Scene();
	this.scene.name = 'root';
	//this.scene.fog =  new THREE.FogExp2(0x5876A4, 0.003);

	// Renderer
	this.renderer = new THREE.WebGLRenderer();

	// Default background color
	this.renderer.setClearColor(0x404080, 1);
	this.renderer.shadowMapEnabled = true;
	this.renderer.shadowMapType = THREE.PCFShadowMap;

	// Render size
	this.renderer.setSize(window.innerWidth, window.innerHeight);

	// Add a canvas to display the scene
	document.body.appendChild(this.renderer.domElement);

	this.carCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 5000);
	this.carCamera.position.x = 0.0;
	this.carCamera.position.z = 10.0;
	this.carCamera.position.y = -25.0;
	this.carCamera.rotation.x = 85.0 * (Math.PI / 180.0);

	this.circuitCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 5000);

	// Views
	this.views = [];
	this.currentView = 0;
	this.views.push(this.carCamera);
	this.views.push(this.circuitCamera);

	// Cameras
	this.cameras = [];
	this.currentCamera = -1;
	this.cameraToShow = -1;

	// Create the different cameras
	this.initCamerasData();
};


CameraManager.prototype.addToScene = function(obj3d) {
	this.scene.add(obj3d);
};

CameraManager.prototype.initCamerasData = function() {

	// Camera 1
	this.cameras.push({
		"positionX": -220.0,
		"positionZ": 1.0,
		"positionY": -50.0,
		"rotations": [{
			"x": 120.0
		}]
	});

	// Camera 2
	this.cameras.push({
		"positionX": -220.0,
		"positionZ": 1.0,
		"positionY": 40.0,
		"rotations": [{
			"y": 180.0
		}, {
			"x": 120.0
		}]
	});
};

CameraManager.prototype.updateCircuitCamera = function() {

	if (this.cameraToShow != this.currentCamera) {

		// Check if the new camera is valid
		if (this.cameraToShow < 0) {
			this.currentCamera = this.cameras.length - 1;
		} else if (this.cameraToShow >= this.cameras.length) {
			this.currentCamera = 0;
		} else {
			this.currentCamera = this.cameraToShow;
		}

		this.circuitCamera.position.x = this.cameras[this.currentCamera].positionX;
		this.circuitCamera.position.z = this.cameras[this.currentCamera].positionZ;
		this.circuitCamera.position.y = this.cameras[this.currentCamera].positionY;
		var rot;

		// Reset the rotations
		this.circuitCamera.rotation.x = 0;
		this.circuitCamera.rotation.y = 0;
		this.circuitCamera.rotation.z = 0;

		// Camera's rotations
		for (var obj in this.cameras[this.currentCamera].rotations) {
			if (this.cameras[this.currentCamera].rotations[obj]) {
				rot = this.cameras[this.currentCamera].rotations[obj];

				if ("x" in rot) {
					this.circuitCamera.rotation.x = rot.x * (Math.PI / 180.0);
				} else if ("y" in rot) {
					this.circuitCamera.rotation.y = rot.y * (Math.PI / 180.0);
				} else if ("z" in rot) {
					this.circuitCamera.rotation.z = rot.z * (Math.PI / 180.0);
				}
			}
		}
	}
};

CameraManager.prototype.getCurrentView = function() {
	return this.views[this.currentView];
};

CameraManager.prototype.onWindowResize = function(w, h) {
	this.getCurrentView().aspect = w / h;
	this.getCurrentView().updateProjectionMatrix();
	this.renderer.setSize(w, h);
};
