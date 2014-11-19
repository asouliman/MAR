// Navigation module
//----------------------------------------------------------------------------------------
// ANavPlane
//----------------------------------------------------------------------------------------
// aligned plane for navigation

// constructor
ANavPlane = function(xxmin, xxmax,yymin,yymax){
	// attributes
	// size
	this.xmin = xxmin ;
	this.xmax = xxmax ;
	this.ymin = yymin;
	this.ymax = yymax ;

	// methods
	this.isIn = function ( x,y ) {
		return (this.xmin<x)&&(x<this.xmax)&&(this.ymin<y)&&(y<this.ymax);
	};
	this.stayInX(x,y,tx,ty){
		var xt ;
		if isIn(x+tx,y) {xt = x+tx}else{xt=x} ;
		return xt
	}
	this.stayInY(x,y,tx,ty){
		var yt ;
		if isIn(x,y+ty) {yt = y+ty}else{yt=y} ;
		return yt
	}
}

//----------------------------------------------------------------------------------------
// ANavPlaneSet
//----------------------------------------------------------------------------------------

//constructor
ANavPlaneSet = function(p){
		// attributes
		// array of ANavPlane
		this.planeSet = [];
		// must have one plane
		this.planeset.push(p);
		
		this.planeActive = -1;
		
		//methods
		this.findActive(x,y){
			this.planeActive = -1;
			for (var i in this.planeSet){
				if((this.planeset[i].isIn(x,y))){this.planeActive=i; break;}			
			}
			if (this.planeActive == -1){console.log('out of the world !!!')}
		}
		
		
		
		

}
