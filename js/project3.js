// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let mesh, mesh2;
let INTERSECTED;
let interescts;
let object;
let name;
let action;
let mixer;
let mixers;



//add material name here first
let newMaterial, Standard, newStandard;

const clock = new THREE.Clock();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', onMouseMove, false );

function init() {

  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x8FBCD4 );

  createCamera();
  createControls();
  createLights();
  createMaterials();
  loadModels();
  createBox();
  createRenderer();
  createSkybox();


  renderer.setAnimationLoop( () => {

    //getTheObject();
    render();

  } );

function createBox(){

//  const geometry2 = new THREE.BoxBufferGeometry( 60, 60, 60 );
//  const material2 = new THREE.MeshStandardMaterial( { color: 0x8008390 } );
//  mesh2 = new THREE.Mesh( geometry2, material2 );
//  scene.add( mesh2 );

  const geometry = new THREE.BoxBufferGeometry( 120, 120, 120 );
  const material1 = new THREE.MeshStandardMaterial( { color: 0x800080, transparent: true, opacity:0.3 } );
  mesh = new THREE.Mesh( geometry, material1 );
  mesh.userData = {URL: "https://charity.gofundme.com/muwekmaohlonetribeinc?lang=en-us" };
  scene.add( mesh );

}

function createSkybox(){

  scene.background = new THREE.CubeTextureLoader()
					.setPath( 'AngerEmpathy.github.io/js/three.js-master/examples/textures/cube/projskybox/' )
					.load( [ 'blm_px.jpg', 'blm_nx.jpg', 'blm_py.jpg', 'blm_ny.jpg', 'blm_pz.jpg', 'blm_nz.jpg' ] );

}

}

function createCamera() {

  camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 0.1, 10000 );
  camera.position.set( 140, 100, 500);

}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );

}


function createLights() {

  const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
  mainLight.position.set( 10, 10, 10 );

  scene.add( ambientLight, mainLight );

}

function createMaterials(){

     let diffuseColor = "#9E4300";
     newMaterial = new THREE.MeshBasicMaterial( { color: "#9E4300", skinning: true} );
     Standard = new THREE.MeshStandardMaterial( { color: "#9E4300", skinning: true} );

     var imgTexture = new THREE.TextureLoader().load( "textures/magic.jpg" );
     				imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
     				imgTexture.anisotropy = 16;





     newStandard = new THREE.MeshStandardMaterial( {
									//	map: imgTexture,
										bumpMap: imgTexture,
										bumpScale: 1,
										//color: diffuseColor,
										metalness: 0.5,
										roughness: 0.1,
									  envMap: scene.background,
                    displacementMap: imgTexture,
                    displacementScale: 0.1,
                    skinning: true
                  //  refractionRatio: 0.95

									} );

    newStandard.envMap.mapping = THREE.CubeRefractionMapping;



}

function loadModels() {

  const loader = new THREE.GLTFLoader();

  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  const onLoad = ( gltf, position, material, name ) => {

  const model = gltf.scene.children[ 0 ];
  //  model.position.copy( position );

    //animation
/*  const animation = gltf.animations[ 0 ];

   const mixer = new THREE.AnimationMixer( model );
   mixers.push( mixer );

   animation.clampWhenFinished = true;

  const action = mixer.clipAction( animation );
  action.setLoop( THREE.LoopOnce );

  action.play();*/
    //var newMesh = new THREE.MESH()

    let object = gltf.scene;

    object.traverse((child) => {
                       if (child.isObject) {
                       child.material = material; // a material created above
                      object.name = name;
                  }
                 });
                   scene.add(object);

    //scene.add( model );

    //other animation
    mixer = new THREE.AnimationMixer(object);
    action = mixer.clipAction(gltf.animations[0]);
    action.setLoop( THREE.LoopOnce );

  };

  // the loader will report the loading progress to this function
  const onProgress = () => {};

  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = ( errorMessage ) => { console.log( errorMessage ); };

  // load the first model. Each model is loaded asynchronously,
  // so don't make any assumption about which one will finish loading first
  //const aPosition = new THREE.Vector3( 300, 300, 300 );
  //loader.load( 'models/explsion/scene.gltf', gltf => onLoad( gltf, aPosition, newStandard, "MeshName1"), onProgress, onError );

//  const bPosition = new THREE.Vector3( -300, -300, -300 );
//  loader.load( 'models/explsion/scene.gltf', gltf => onLoad( gltf, bPosition, newStandard, "MeshName1"), onProgress, onError );

  const flamingoPosition = new THREE.Vector3( 20, 100, 10 );
  loader.load( 'models/gun/gun-broken.glb', gltf => onLoad( gltf, flamingoPosition, newStandard, "GunMesh" ), onProgress, onError );

  const storkPosition = new THREE.Vector3( -300, -300, -300 );
  loader.load( 'models/oilcan/oilcan-broken.glb', gltf => onLoad( gltf, storkPosition, newStandard ), onProgress, onError );

   const cakePosition = new THREE.Vector3( -20, -10, -20 );
   loader.load( 'models/cake/cake-broken.glb', gltf => onLoad( gltf, cakePosition, newStandard ), onProgress, onError );

   const cagePosition = new THREE.Vector3( -20, -10, -20 );
   loader.load( 'models/cage/cage-broken.glb', gltf => onLoad( gltf, cagePosition, newStandard ), onProgress, onError );

   const cuffsPosition = new THREE.Vector3( -20, -10, -20 );
   loader.load( 'models/handcuffs/cuffs.glb', gltf => onLoad( gltf, cuffsPosition, newStandard ), onProgress, onError );

   const gwbust = new THREE.Vector3( -20, -10, -20 );
   loader.load( 'models/gwbust/gwbust-broken.glb', gltf => onLoad( gltf, gwbust, newStandard ), onProgress, onError );

   const virusp = new THREE.Vector3( -20, -10, -20 );
   loader.load( 'models/virus/virus.glb', gltf => onLoad( gltf, virusp, newStandard ), onProgress, onError );

   const plantp = new THREE.Vector3( -20, -10, -20 );
   loader.load( 'models/plant/scene.gltf', gltf => onLoad( gltf, plantp, newStandard ), onProgress, onError );


   const butterflyp = new THREE.Vector3( -20, -10, -20 );
   loader.load( 'models/butterfly/scene.gltf.glb', gltf => onLoad( gltf, butterflyp, newStandard ), onProgress, onError );








}

document.addEventListener( 'mousedown', onDocumentMouseDown, false );

function onDocumentMouseDown( event ) {

      window.open(mesh.userData.URL);

}

function createRenderer() {

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;



  container.appendChild( renderer.domElement );

}

function update() {

//play animation
//const delta = clock.getDelta();
//for ( const mixer of mixers ) {

//mixer.update( delta );



}//play animation

var animate = function () {
  requestAnimationFrame( animate );

  var delta = clock.getDelta();

  if (mixer !== null) {
    mixer.update(delta);
  };



}

//GUI Controls----------------------------//
var guiControls = new function(){
  this.opacity = 0.5;

};

var datGUI = new dat.GUI();
datGUI.add(guiControls, 'opacity', 0, 1);

function render() {

  //getTheObject();
  object = scene.getObjectByName("MeshName1", true); //not most efficent way


  //  if(object){
    //    object.rotation.y+=0.01;
  //  }

    //  console.log(object);
    //call the raycaster


  console.log(mesh.material);
  console.log(guiControls.opacity);

  mesh.material.opacity.value += guiControls.opactiy;

  doStuffwithRaycaster();
//  requestAnimationFrame(render);

    update();
  renderer.render( scene, camera );

}
//GUI controls-------------------------------//

function doStuffwithRaycaster() {

    // update the picking ray with the camera and mouse position
  	raycaster.setFromCamera( mouse, camera );

  	// calculate objects intersecting the picking ray
  	var intersects = raycaster.intersectObjects( scene.children, true );

  	for ( var i = 0; i < intersects.length; i++ ) {

      //change the object that was intersected with

      if ( intersects.length > 0 ) {

					if ( INTERSECTED != intersects[ 0 ].object ) {

            intersects[0].object.material.color.set(0xff0000);
						INTERSECTED = intersects[ 0 ];




					}

				} else if ((intersects.length<= 0) && (INTERSECTED)){

          intersects[0].object.material.color.set(0xffffff);
          INTERSECTED = intersects[ 0 ];

				}

  	}

      //console.log("Intersection List", intersects);
}

function onMouseMove( event ) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}


function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );


init();
animate();
