// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;
let linematerial;
let line1, line2, line3, line4, line5, line6;


//add material name here first
let newMaterial, Standard, newStandard;

const mixers = [];
const clock = new THREE.Clock();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function init() {

  window.addEventListener('mousemove', onMouseMove, false );

  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x00000 );

  createCamera();
  createControls();
  createLights();
  createMaterials();
  loadModels();
  createRenderer();
  //createLines();
  createboxes();


  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}


function onWindowResize() {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

    }

function createCamera() {

  camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 0.1, 10000 );
  camera.position.set( -2, 0.5, 10.5);

}

function createControls() {

controls = new THREE.OrbitControls( camera, container );

}


function createLights() {

  const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 0 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 2 );
  mainLight.position.set( 10, 10, 10 );

  const spotlight = new THREE.PointLight( 0x23421D, 2);
  spotlight.position.set(0,0,0);

  const spotlight2 = new THREE.PointLight( 0xffffff, 2);
  spotlight2.position.set(7.5, 6, -10 );

  const spotlight3 = new THREE.PointLight( 0xffffff, 2);
  spotlight3.position.set(0, -2.5, -10 );

  const spotlight4 = new THREE.PointLight( 0xffffff, 2);
  spotlight4.position.set(0, 2.5, -6);

  const spotlight5 = new THREE.PointLight( 0xffffff, 2);
  spotlight5.position.set(-4, -5, -10);

  const spotlight6 = new THREE.PointLight( 0xffffff, 2);
  spotlight6.position.set(-0.3, -2, 5 );

  const spotlight7 = new THREE.PointLight( 0xffffff, 2);
  spotlight7.position.set( 3, -1, 0 );




  scene.add( ambientLight, mainLight, spotlight, spotlight2, spotlight3, spotlight4, spotlight5, spotlight6, spotlight7 );

/*
var sphereSize = 1;
var pointLightHelper = new THREE.PointLightHelper( spotlight, sphereSize );

var pointLightHelper2 = new THREE.PointLightHelper( spotlight2, sphereSize );

var pointLightHelper3 = new THREE.PointLightHelper( spotlight3, sphereSize );

var pointLightHelper4 = new THREE.PointLightHelper( spotlight4, sphereSize );

var pointLightHelper5 = new THREE.PointLightHelper( spotlight5, sphereSize );

var pointLightHelper6 = new THREE.PointLightHelper( spotlight6, sphereSize );

var pointLightHelper7 = new THREE.PointLightHelper( spotlight7, sphereSize );



scene.add( pointLightHelper, pointLightHelper2, pointLightHelper3, pointLightHelper4,
pointLightHelper5, pointLightHelper6, pointLightHelper7 );
*/

}

function createMaterials(){

     let diffuseColor = "#9E4300";
     newMaterial = new THREE.MeshBasicMaterial( { color: "#9E4300", skinning: true} );
     Standard = new THREE.MeshStandardMaterial( { color: "#9E4300", skinning: true} );

     var imgTexture = new THREE.TextureLoader().load( "textures/greenleaf.jpg" );
     				imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
     				imgTexture.anisotropy = 16;


     newStandard = new THREE.MeshStandardMaterial( {
										map: imgTexture,
										bumpMap: imgTexture,
										bumpScale: 1,
										//color: diffuseColor,
										metalness: 0.5,
										roughness: 0.1,
										//envMap: imgTexture,
                    //displacementmap: imgTexture,
                    //displacementscale: 0.1,
                    skinning: true,
                    wireframe: true
									} );



}

function loadModels() {

  const loader = new THREE.GLTFLoader();

  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  const onLoad = ( gltf, position, material ) => {

    const model = gltf.scene.children[ 0 ];
    model.position.copy( position );

   const animation = gltf.animations[ 0 ];

    const mixer = new THREE.AnimationMixer( model );
    mixers.push( mixer );

    const action = mixer.clipAction( animation );
    action.play();

    //var newMesh = new THREE.MESH()

    let object = gltf.scene;

    object.traverse((child) => {
                       if (child.isMesh) {
                       child.material = material; // a material created above
                  }
                 });
                   scene.add(object);

    scene.add( model );

  };

  // the loader will report the loading progress to this function
  const onProgress = () => {};

  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = ( errorMessage ) => { console.log( errorMessage ); };

  // load the first model. Each model is loaded asynchronously,
  // so don't make any assumption about which one will finish loading first
  const moosePosition = new THREE.Vector3( 0, 0, 0 );
  loader.load( 'models/moose/scene.gltf', gltf => onLoad( gltf, moosePosition, newStandard), onProgress, onError );

  const elephantPosition = new THREE.Vector3( 7.5, 0, -10 );
  loader.load( 'models/elephant/scene.gltf', gltf => onLoad( gltf, elephantPosition, newStandard ), onProgress, onError );

  const whalePosition = new THREE.Vector3( 0, -2.5, -10 );
  loader.load( 'models/whale/scene.gltf', gltf => onLoad( gltf, whalePosition, newStandard ), onProgress, onError );

  const leopardPosition = new THREE.Vector3( 0, 2.5, -6 );
  loader.load( 'models/leopard/leopardss.glb', gltf => onLoad( gltf, leopardPosition, newStandard ), onProgress, onError );

  const giraffePosition = new THREE.Vector3( -4, -5, -10 );
  loader.load( 'models/giraffe/scene.gltf', gltf => onLoad( gltf, giraffePosition, newStandard ), onProgress, onError );

  const skellPosition = new THREE.Vector3( -0.3, -2, 5 );
  loader.load( 'models/skeleton/skeleton.glb', gltf => onLoad( gltf, skellPosition, newStandard ), onProgress, onError );

  const chickPosition = new THREE.Vector3( 3, -1, 0 );
  loader.load( 'models/chicken/scene.gltf', gltf => onLoad( gltf, chickPosition, newStandard ), onProgress, onError );



}

function createboxes(){

  //moose to human
  var geometry = new THREE.BoxBufferGeometry (0.01, 0.01, 5.2);
  var material = new THREE.MeshLambertMaterial( {color: 0x23421D} );
  var line1 = new THREE.Mesh( geometry, material );
  scene.add( line1 );
  line1.position.set(-0.1, 0.2, 2.5);
  line1.rotation.x = 0.08;
  line1.rotation.y =-0.03;

  //moose to giraffe
  var geometry2 = new THREE.BoxBufferGeometry (0.01, 0.01, 11);
  var material2 = new THREE.MeshLambertMaterial( {color: 0x23421D} );
  var line2 = new THREE.Mesh( geometry2, material2 );
  scene.add( line2 );
  line2.position.set(-2,-0.01,-5);
  line2.rotation.y = 0.4;
  line2.rotation.x = -0.08;

  //moose to whale
  var geometry3 = new THREE.BoxBufferGeometry (0.01, 0.01, 10.5);
  var material3 = new THREE.MeshLambertMaterial( {color: 0x23421D} );
  var line3 = new THREE.Mesh( geometry3, material3 );
  scene.add( line3 );
  line3.position.set(0,-1,-5);
  line3.rotation.x = -0.3;

  //moose to leopard
  var geometry4 = new THREE.BoxBufferGeometry (0.01, 0.01, 6.3);
  var material4 = new THREE.MeshLambertMaterial( {color: 0x23421D} );
  var line4 = new THREE.Mesh( geometry4, material4 );
  scene.add( line4 );
  line4.position.set(0,1.7,-3);
  line4.rotation.x = 0.4;

  //moose to elephant
  var geometry5 = new THREE.BoxBufferGeometry (0.01, 0.01, 12.5);
  var material5 = new THREE.MeshLambertMaterial( {color: 0x23421D} );
  var line5 = new THREE.Mesh( geometry5, material5 );
  scene.add( line5 );
  line5.position.set(3,2,-5);
  line5.rotation.y = 2.6;
  line5.rotation.x = 0.3;

//moose to chicken
var geometry6 = new THREE.BoxBufferGeometry (3.2, 0.01, 0.01);
var material6 = new THREE.MeshLambertMaterial( {color: 0x23421D} );
var line6 = new THREE.Mesh( geometry6, material6 );
scene.add( line6 );
line6.position.set(1.5, -0.2, 0);
line6.rotation.z = -0.4;

var geometry7 = new THREE.BoxBufferGeometry (8, 0.01, 0.01);
var material7 = new THREE.MeshLambertMaterial( {color: 0x23421D} );
var line7 = new THREE.Mesh( geometry7, material7 );
scene.add( line7 );
line7.position.set(-8, -0.5, -10);

var geometry8 = new THREE.BoxBufferGeometry (9, 0.01, 0.01);
var material8 = new THREE.MeshLambertMaterial( {color: 0x23421D} );
var line8 = new THREE.Mesh( geometry8, material8 );
scene.add( line8 );
line8.position.set(0.5, 4.3, -9);
line8.rotation.y = 8;
line8.rotation.x = -9;

var geometry9 = new THREE.BoxBufferGeometry (9, 0.01, 0.01);
var material9 = new THREE.MeshLambertMaterial( {color: 0x23421D} );
var line9 = new THREE.Mesh( geometry9, material9 );
scene.add( line9 );
line9.position.set(12, 4, -10);


//var geometrysphere = new THREE.SphereBufferGeometry (1000, 100, 100);
//var materialsphere = new THREE.MeshBasicMaterial( {color: 0x23421D, wireframe: true} );
//var sphere = new THREE.Mesh(geometrysphere, materialsphere);
//scene.add(sphere);




}
/*function createLines(){


  var linemateiral = new THREE.LineBasicMaterial({ color: 0x0000ff});
  var points = [];
  points.push( new THREE.Vector3 (-0.3, 0.3, 5.1)); //(left(-)/right(+), up/down, length)
  points.push( new THREE.Vector3 (0, 0, 0));
  points.push( new THREE.Vector3 (0, 0, 0));
  var linegeometry = new THREE.BufferGeometry().setFromPoints (points);
  var line = new THREE.Line( linegeometry, linematerial);
  scene.add(line);
}*/

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

  const delta = clock.getDelta();

  for ( const mixer of mixers ) {

     mixer.update( delta );
   }


}

function doStuffwithRaycaster() {

    // update the picking ray with the camera and mouse position
  	raycaster.setFromCamera( camera, mouse );

  	// calculate objects intersecting the picking ray
  	var intersects = raycaster.intersectObjects( scene.children );

  	for ( var i = 0; i < intersects.length; i++ ) {

      //change the object that was intersected with
  	intersects[ i ].object.material.color.set( 0xff0000 );

  	}

      console.log("Intersection List", intersects);

}

function render() {

  doStuffwithRaycaster();
  //console.log(camera.position);

  renderer.render( scene, camera );

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
