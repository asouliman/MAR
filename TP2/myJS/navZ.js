// navZ Navigation module
//----------------------------------------------------------------------------------------
// RC
//----------------------------------------------------------------------------------------


// navPlane
//----------------------------------------------------------------------------------------
// aligned plane for navigation

// constructor
//------------------------
// inputs
//------------------------
// nname: name of the plane (string)
// plane size
// xxmin, xxmax: x range of the plane (float)
// yymin, yymax: y range of the plane (float)
// zzmin, zzmax: z range of the plane (ie slope) (float)
// aaxis: 'px','nx','py' or 'ny' orientation of the slope (string)
navPlane = function(nname,xxmin, xxmax,yymin,yymax,zzmin,zzmax,aaxis){
	// attributes
	// --------------------------------------------------
	// plane name
	this.name = nname ;
	// size
	if(xxmin<=xxmax){
		this.xmin = xxmin ;
		this.xmax = xxmax ;
	}
	else{
		this.xmin = xxmax ;
		this.xmax = xxmin ;	
	}
	if (yymin<=yymax){
		this.ymin = yymin;
		this.ymax = yymax ;
	}
	else{
		this.ymin = yymax;
		this.ymax = yymin ;
	}
	if (zzmin <= zzmax){
		this.zmin = zzmin ;
		this.zmax = zzmax ;
	}
	else{
		this.zmin = zzmax ;
		this.zmax = zzmin ;
	}
	this.axis = aaxis ; //px,nx, py or ny

	// methods
	// --------------------------------------------------
	// isIn: return true is the 2D position is in the plane
	// inputs
	//------------------------
	// x,y: position (absolute) (float)
	this.isIn = function ( x,y ) {
		return (this.xmin<=x)&&(x<=this.xmax)&&(this.ymin<=y)&&(y<=this.ymax);
	};
	// stayInX: clamp in x the translation tx,ty from the pos x,y
	// inputs
	//------------------------
	// x,y: current position (float)
	// tx,ty: translation (float)
	this.stayInX = function(x,y,tx,ty){
		var xt ;
		if (this.isIn(x+tx,y)) {xt = tx}else{xt=0} ;
		return xt
	}
	// stayInY: clamp in y the translation tx,ty from the pos x,y
	// inputs
	//------------------------
	// x,y: current position (float)
	// tx,ty: translation (float)
	this.stayInY = function(x,y,tx,ty){
		var yt ;
		if (this.isIn(x,y+ty)) {yt = ty}else{yt=0} ;
		return yt
	}
	// compute z at the position x,y
	// inputs
	//------------------------
	// x,y: position (float)
	// output
	//------------------------
	// z: (float)
	this.z = function(x,y){
		var zz = 0.0 ;
		// local coordinate
		var u = (x - this.xmin)/(this.xmax - this.xmin) ;
		var v = (y - this.ymin)/(this.ymax - this.ymin) ;
		// delta z
		var deltaz = this.zmax-this.zmin ;
		// switch according to axis
		switch(this.axis){
			case 'px': zz = this.zmin + u*deltaz ; break ;
			case 'nx': zz = this.zmax - u*deltaz ; break ;
			case 'py': zz = this.zmin + v*deltaz ; break ;
			case 'ny': zz = this.zmax - v*deltaz ; break ;
		}
		return zz;
	}
	// toMesh: return of mesh with the plane geometry
	// output
	//---------------------------
	// mesh: (Mesh)
	this.toMesh = function(){
		var lx = 0.0 ; var ly = 0.0 ;
		var rotx = 0.0 ; var rotz = 0.0 ;
		// compute the lengths of the box
		switch(this.axis){
			case 'px': 
				// box lengths
				lx = Math.sqrt((this.xmax-this.xmin)*(this.xmax-this.xmin)+(this.zmax-this.zmin)*(this.zmax-this.zmin));
				ly = this.ymax-this.ymin ;
				// rotation : along z
				rotz = Math.atan2((this.zmax-this.zmin),(this.xmax-this.xmin));
			break ;
			case 'nx':
				//  box lengths
				lx = Math.sqrt((this.xmax-this.xmin)*(this.xmax-this.xmin)+(this.zmax-this.zmin)*(this.zmax-this.zmin));
				ly = this.ymax-this.ymin ;
				// rotation : along z
				rotz = - Math.atan2((this.zmax-this.zmin),(this.xmax-this.xmin));
			break ;
			case 'py':
				//  box lengths
				lx = this.xmax-this.xmin ;
				ly = Math.sqrt((this.ymax-this.ymin)*(this.ymax-this.ymin)+(this.zmax-this.zmin)*(this.zmax-this.zmin));
				// rotation : along x
				rotx = - Math.atan2((this.zmax-this.zmin),(this.ymax-this.ymin));
			break ;
			case 'ny': 
				//  box lengths
				var lx = this.xmax-this.xmin ;
				var ly = Math.sqrt((this.ymax-this.ymin)*(this.ymax-this.ymin)+(this.zmax-this.zmin)*(this.zmax-this.zmin));
				// rotation : along x
				rotx = Math.atan2((this.zmax-this.zmin),(this.ymax-this.ymin));
			break ;
		}		
		var geometry = new THREE.BoxGeometry(lx,0.1,ly); 
		var material = new THREE.MeshLambertMaterial( {color: 0x404080} ); 
		var plane = new THREE.Mesh( geometry, material );
		plane.name = this.name +'GEO';
		// translation
		plane.position.x = this.xmin + (this.xmax-this.xmin)/2.0; 
		plane.position.y = this.zmin + (this.zmax-this.zmin)/2.0; 
		plane.position.z = this.ymin + (this.ymax-this.ymin)/2.0;
		// rotation
		plane.rotation.x = rotx ;
		plane.rotation.z = rotz ;
		return plane;
	}
	// toString
	// output
	//---------------------------
	// string description of the plane (String)
	this.toString = function(){
		return 'plane('+
		this.name+
		'): <'+
		this.axis+
		'> [xmim:'+
		this.xmin+
		',xmax:'+
		this.xmax+
		' - ymin:'+
		this.ymin+
		',ymax:'+this.ymax+
		' - zmin:'+
		this.zmin+
		',zmax:'+this.zmax+
		']';
	}
}

//----------------------------------------------------------------------------------------
// navPlaneSet
//----------------------------------------------------------------------------------------
// a set (array) of navigation planes for navigation
//----------------------------------------------------------------------------------------
//constructor
// inuput
//------------------------------
// p: an navigation plane (navPlane)
navPlaneSet = function(p){
	// attributes
	// --------------------------------------------------
	// array of ANavPlane
	this.planeSet = [];
	// must have one plane
	this.planeSet.push(p);	
	// active plane
	this.active = -1;
	// position x,y
	this.x = -340.0 ;
	this.y = 0.0 ;
	this.z = 0.0 ;
	//methods
	// --------------------------------------------------
	// findActive: return the index of the current active plane (-1: out of the world)
	// inputs
	//--------------------
	// x,y: the current position (absolute) (float)
	// output: index of the active plane
	//--------------------
	// index of the active plane (integer)
	this.findActive = function (x,y){
		var act = -1;
		for (var i in this.planeSet){
			if((this.planeSet[i].isIn(x,y))){act =i; break;}			
		}
		//if (act == -1){console.log('out of the world !!!')}
		return act ;
	}
	// ---------------------------------------------------
	// move
	// move in the navPlane set
	// inputs
	//--------------------
	// dx,dy: displacement (float)
	// ndzmax: negative delta z allowed fall (float)
	// pdzmax: positive delta z allowed jump (float)
	this.move = function (dx,dy,ndzmax,pdzmax){
		if (this.planeSet[this.active].isIn(this.x+dx, this.y+dy)){
			// stay in the same plane
			this.x += dx; this.y += dy;
		}
		else{
			// not in the same
			// console.log('leaving plane '+this.planeSet[this.active].name);
			var new_act = this.findActive(this.x+dx,this.y+dy);
			if (new_act==-1){
				// console.log('force to plane '+this.planeSet[this.active].name);
				// stay in
				var ddx = this.planeSet[this.active].stayInX(this.x, this.y,dx,dy);
				var ddy = this.planeSet[this.active].stayInY(this.x, this.y,dx,dy);
				this.x += ddx; this.y += ddy;
			}
			else {
				// move to another plane
				// compute dz: jump or fall
				// current z
				var cz = this.planeSet[this.active].z(this.x,this.y);
				// target z
				var tz = this.planeSet[new_act].z(this.x+dx,this.y+dy);
				// delta z
				var dz = tz -cz ;
				if ((-ndzmax<dz)&&(dz<pdzmax)){
					// can jump or fall
					this.x += dx; this.y += dy;
					this.active = new_act ;
					// console.log('entering plane '+this.planeSet[this.active].name);
				}
				else{
					// can not jump or fall
					// stay in
					var ddx = this.planeSet[this.active].stayInX(this.x, this.y,dx,dy);
					var ddy = this.planeSet[this.active].stayInY(this.x, this.y,dx,dy);
					this.x += ddx; this.y += ddy;					
				}
			}
		}
		this.z = this.planeSet[this.active].z(this.x,this.y);
	}
	// ----------------------------------------------------
	// addPlane
	// add a plane in the navPlane set
	// input
	//----------------------
	// p: the plane to add (navPlane)
	this.addPlane = function(p){
		this.planeSet.push(p);
		// active
		this.active = this.findActive(this.x,this.y);
	}
	//------------------------------------------------------
	// toMesh
	// create a mesh 
	// output
	//------------------------
	// Object3D
	this.toMesh = function(){
		var o3d = new THREE.Object3D();
		o3d.name = 'nav_mesh';
		for(var i in this.planeSet){
			o3d.add(this.planeSet[i].toMesh());
		}
		return o3d ;
	}
	//-----------------------------------------------------
	// debug
	// write on the console the set of navPlanes
	this.debug = function(){
		console.log('-------------------- navPlaneSet.debug')
		console.log('Navigation Planes')
		console.log('------------------------------------------');
		console.log('active plane:'+this.active);
		console.log('position: [ x:'+this.x+', z:'+this.y+']');
		console.log('------------------------------------------');
		for (var i in this.planeSet){
			//console.log('navPlaneSet.debug:'+i);
			console.log(this.planeSet[i].toString());
		}
		console.log('------------------------------------------');
	}
}
