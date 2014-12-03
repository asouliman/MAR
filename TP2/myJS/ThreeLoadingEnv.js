// ThreeLoadingEnv
//----------------------------------------------------------------------------------------
// RC
//----------------------------------------------------------------------------------------

if(typeof(ModulesLoader)=="undefined")
{
	throw "ThreeLoadingEnv.js is required to load script KeyboardHandler.js" ; 
}
// Loads dependencies and initializes this module
ModulesLoader.requireModules(['js/loaders/ColladaLoader.js',
                              "js/loaders/MTLLoader.js", 
                              "js/loaders/OBJMTLLoader.js", ]) ;

// constructor
function ThreeLoadingEnv(){
	// attributes
	// --------------------------------------
	// no			
	
	// methods
	// --------------------------------------

	// loadMesh
	// inputs
	//------------------------
	// path: path to file (String)
	// file: filename (String)
	// format: scene format 'obj' or 'dae' (string)
	// scene: Object3D parent in the scene graph (Object3D)
	// name: Object3D name
	// posX, posY,posZ: translation (float)
	// side: 'front' or 'back' or 'double' (string)
	this.loadMesh = function(path,file,format,scene,name,posX,posY,posZ,side){
		var loader ;
		switch(format){
			case "obj":
				this.loadObj(path, file, scene, name, posX, posY, posZ, side) ;
			break;
			case "dae":
				this.loadDae(path, file, scene, name, posX, posY, posZ, side) ;
				// not yet supported
				//console.log('ThreeLoadingEnv:: dae loading not yet supported !')
			break ;
		}
	}
	
	this.loadDae = function(path,file,parentNode,name,posX,posY,posZ,side)
	{
		/** Callback called once the geometry is loaded
		 * 
		 * @param object The loaded geometry
		 */
		function onSuccess(object) 
		{
			// side
//			switch(side){
//				case "double":
//					// force to double side
//					object.scene.traverse(function(ob){
//						if (ob.type == 'Mesh'){ob.material.side= THREE.DoubleSide ; }
//					});
//				break ;
//				case "back":
//					// force to back side
//					object.scene.traverse(function(ob){
//						if (ob.type == 'Mesh'){ob.material.side= THREE.BackSide ; }
//					});
//				break ;
//			}
			// Sets the object position
			object.scene.position.x = posX ;
			object.scene.position.y = posY ;
			object.scene.position.z = posZ ;
			// name
			object.scene.name = name ;

			console.log( 'ThreeLoadingEnv.load:: '+name+':: '+'added !' );
			// Adds the geometry to the parent node
			parentNode.add(object.scene) ;
		}
		
		/**
		 * Callback called on load progresss
		 */
		function onProgress() {}
		
		// Creates a loader and loads the file
		var loader = new THREE.ColladaLoader() ;
		var filename = path+'/'+file+'.dae' ;
		loader.load(filename, onSuccess, onProgress) ;
	}
	
	this.loadObj = function(path,file,scene,name,posX,posY,posZ,side)
	{
		loader = new THREE.OBJMTLLoader();
		// files
		var mesh = path+'/'+file+'.obj';
		var mat = path+'/'+file+'.mtl';
		//
		loader.load(mesh,mat,
			function(o){	// on load
			// translation
				o.position.x = posX ;
				o.position.y = posY ;
				o.position.z = posZ ;
				// name
				o.name = name ;
				// side
				switch(side){
					case "double":
						// force to double side
						o.traverse(function(ob){
							if (ob.type == 'Mesh'){ob.material.side= THREE.DoubleSide ; }
						});
					break ;
					case "back":
						// force to back side
						o.traverse(function(ob){
							if (ob.type == 'Mesh'){ob.material.side= THREE.BackSide ; }
						});
					break ;
				}
				// add to scene
				scene.add(o);	
				console.log( 'ThreeLoadingEnv.load:: '+name+':: '+'added !' );
			},
			function ( xhr ) { // on progress
				if ( xhr.lengthComputable ) {
					var percentComplete = xhr.loaded / xhr.total * 100;
					var percent = Math.round(percentComplete, 2);
					console.log( 'ThreeLoadingEnv.load:: '+name+':: '+percent + '% downloaded' );
				}
			},
			function ( xhr ) { // on error
				console.log( 'ThreeLoadingEnv.load:: '+name+':: '+'loading error' );
			}
		);
	}
	
	// loadSkyBox
	// inputs
	//------------------------
	// path: path to file (String)
	// files: filenames (String[])
	// format: image format 'jpg'
	// scene: Object3D parent in the scene graph (Object3D)
	// name: Object3D name
	// size: box size (float)
	// example
	// Loader.loadSkyBox('assets',['px','nx','py','ny','pz','nz'],'jpg', RC.scene, 'sky',4000);

	this.loadSkyBox = function(path,files,format,scene,name,size){
		// files names
		var urls= [];
		for (var i in files){urls.push(path+'/'+files[i]+'.'+format);}
		// cube texture
		var textureCube = THREE.ImageUtils.loadTextureCube( urls );	
		// cube shader
		var shader = THREE.ShaderLib[ "cube" ];
		shader.uniforms[ 'tCube' ].value = textureCube;
		var material = new THREE.ShaderMaterial( 
			{
				fragmentShader: shader.fragmentShader,
				vertexShader: shader.vertexShader,
				uniforms: shader.uniforms,
				side: THREE.BackSide
			}
		);
		var cube = new THREE.Mesh( new THREE.BoxGeometry( size, size, size), material );
		cube.name = name;
		scene.add( cube );	
	}
}
