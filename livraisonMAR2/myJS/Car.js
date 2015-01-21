if(typeof(ModulesLoader)=="undefined")
{
	throw "ModulesLoaderV2.js is required to load script FlyingVehicle.js" ;
}
// Loads dependencies and initializes this module
ModulesLoader.requireModules(['threejs/three.min.js', 'Physics.js', 'DebugHelper.js']) ;

var Car = function (x, y, z, theta) {
	// Attributes
	this.position = new THREE.Object3D();
	this.floorSlope = new THREE.Object3D();
	this.rotationZ = new THREE.Object3D();
	this.mesh = new THREE.Object3D();

	this.position.name = 'position';
	this.floorSlope.name = 'floorSlope';
	this.rotationZ.name = 'rotationZ';

	// Bind attributes to build the car
	this.position.add(this.floorSlope);
	this.floorSlope.add(this.rotationZ);

	this.floorSlope.matrixAutoUpdate = false;

	this.position.position.x = x;
	this.position.position.y = y;
	this.position.position.z = z;
	this.rotationZ.rotation.z = theta;
};

Car.prototype.getPosition = function() {
	return this.position;
};

Car.prototype.setPosition = function (x, y, z) {
	this.position.position.set(x, y, z);
};

Car.prototype.getX = function() {
	return this.position.position.x;
};

Car.prototype.getY = function() {
	return this.position.position.y;
};

Car.prototype.getZ = function() {
	return this.position.position.z;
};

Car.prototype.getRotationZ = function() {
	return this.rotationZ;
};

Car.prototype.setRotationZ = function (angle) {
	this.rotationZ.rotation.z = angle;
};

Car.prototype.setMatrix = function (matrix) {
	this.floorSlope.matrix.copy(matrix);
};

Car.prototype.setMesh = function (mesh) {
	this.mesh = mesh;
};