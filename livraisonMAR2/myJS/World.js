var World = function (x, y, z) {

	//	Planes Set for Navigation
	// 	z up
	this.plane = new navPlaneSet(new navPlane('p01', -260, -180, -80, 120, +0, +0, 'px')); // 01

	this.plane.addPlane(new navPlane('p02', -260, -180, 120, 200, +0, +20, 'py')); // 02
	this.plane.addPlane(new navPlane('p03', -260, -240, 200, 240, +20, +20, 'px')); // 03
	this.plane.addPlane(new navPlane('p04', -240, -160, 200, 260, +20, +20, 'px')); // 04
	this.plane.addPlane(new navPlane('p05', -160, -80, 200, 260, +20, +40, 'px')); // 05
	this.plane.addPlane(new navPlane('p06', -80, -20, 200, 260, +40, +60, 'px')); // 06
	this.plane.addPlane(new navPlane('p07', -20, +40, 140, 260, +60, +60, 'px')); // 07
	this.plane.addPlane(new navPlane('p08', 0, +80, 100, 140, +60, +60, 'px')); // 08
	this.plane.addPlane(new navPlane('p09', 20, +100, 60, 100, +60, +60, 'px')); // 09
	this.plane.addPlane(new navPlane('p10', 40, +100, 40, 60, +60, +60, 'px')); // 10
	this.plane.addPlane(new navPlane('p11', 100, 180, 40, 100, +40, +60, 'nx')); // 11
	this.plane.addPlane(new navPlane('p12', 180, 240, 40, 80, +40, +40, 'px')); // 12
	this.plane.addPlane(new navPlane('p13', 180, 240, 0, 40, +20, +40, 'py')); // 13
	this.plane.addPlane(new navPlane('p14', 200, 260, -80, 0, +0, +20, 'py')); // 14
	this.plane.addPlane(new navPlane('p15', 180, 240, -160, -80, +0, +40, 'ny')); // 15
	this.plane.addPlane(new navPlane('p16', 160, 220, -220, -160, +40, +40, 'px')); // 16
	this.plane.addPlane(new navPlane('p17', 80, 160, -240, -180, +40, +40, 'px')); // 17
	this.plane.addPlane(new navPlane('p18', 20, 80, -220, -180, +40, +40, 'px')); // 18
	this.plane.addPlane(new navPlane('p19', 20, 80, -180, -140, +40, +60, 'py')); // 19
	this.plane.addPlane(new navPlane('p20', 20, 80, -140, -100, +60, +80, 'py')); // 20
	this.plane.addPlane(new navPlane('p21', 20, 60, -100, -40, +80, +80, 'px')); // 21
	this.plane.addPlane(new navPlane('p22', -80, 20, -100, -40, +80, +80, 'px')); // 22
	this.plane.addPlane(new navPlane('p23', -140, -80, -100, -40, +80, +80, 'px')); // 23
	this.plane.addPlane(new navPlane('p24', -140, -80, -140, -100, +60, +80, 'py')); // 24
	this.plane.addPlane(new navPlane('p25', -140, -80, -200, -140, +40, +60, 'py')); // 25
	this.plane.addPlane(new navPlane('p26', -100, -80, -240, -200, +40, +40, 'px')); // 26
	this.plane.addPlane(new navPlane('p27', -220, -100, -260, -200, +40, +40, 'px')); // 27
	this.plane.addPlane(new navPlane('p28', -240, -220, -240, -200, +40, +40, 'px')); // 28
	this.plane.addPlane(new navPlane('p29', -240, -180, -200, -140, +20, +40, 'ny')); // 29
	this.plane.addPlane(new navPlane('p30', -240, -180, -140, -80, +0, +20, 'ny')); // 30
	this.plane.setPos(x, y, z);

	this.plane.initActive();
};

World.prototype.update = function() {
	//plane.move(newPosition.x, newPosition.y, 150, 10);
};