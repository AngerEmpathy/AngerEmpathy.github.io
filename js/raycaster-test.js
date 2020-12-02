// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let renderer;
let scene;
let mesh, mesh1, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8, mesh9;
let mesh10, mesh11, mesh12;


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function init() {

  // Get a reference to the container element that will hold our scene
  container = document.querySelector( '#scene-container' );

  window.addEventListener( 'resize', onWindowResize );
  window.addEventListener('mousemove', onMouseMove, false );

  // create a Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x00000 );

  // set up the options for a perspective camera
  const fov = 35; // fov = Field Of View
  const aspect = container.clientWidth / container.clientHeight;
  const near = 0.1;
  const far = 1000;

  camera = new THREE.PerspectiveCamera( fov, aspect, near, far );

  // every object is initially created at ( 0, 0, 0 )
  // we'll move the camera back a bit so that we can view the scene
  camera.position.set( 0, 0, 50 );



  // create a geometry
  const geometry = new THREE.SphereBufferGeometry( 2, 25, 40 );
  const geometry2 = new THREE.ConeBufferGeometry( 5, 5, 5 );
  const geometry3 = new THREE.TorusBufferGeometry( 5, 1, 8, 6);


  // create a purple Standard material
  const material = new THREE.MeshLambertMaterial( { color: 0x601683} );
  const material2 = new THREE.MeshLambertMaterial( { color:  0x2C3B79 } );
  const material3 = new THREE.MeshLambertMaterial ({ color: 0x026003});


  // create a Mesh containing the geometry and material
  mesh = new THREE.Mesh( geometry, material );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh3 = new THREE.Mesh( geometry3, material3);
  mesh4 = new THREE.Mesh( geometry, material );
  mesh5 = new THREE.Mesh( geometry2, material2 );
  mesh6 = new THREE.Mesh( geometry3, material3);
  mesh7 = new THREE.Mesh( geometry, material );
  mesh8 = new THREE.Mesh( geometry2, material2 );
  mesh9 = new THREE.Mesh( geometry3, material3);
  mesh10 = new THREE.Mesh( geometry, material );
  mesh11 = new THREE.Mesh( geometry2, material2 );
  mesh12 = new THREE.Mesh( geometry3, material3);




  // add the mesh to the scene object
  scene.add( mesh, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8, mesh9,
              mesh10, mesh11, mesh12 );

  // Create a directional light
  const light = new THREE.DirectionalLight( 0xffffff, 1.0 );
  const light2 = new THREE.PointLight (0x8d018d, 10.0);
  const light3 = new THREE.PointLight (0x0000b5, 10.0);
  const light4 = new THREE.PointLight(0xcf781a, 10.0);


  // move the light back and up a bit
  light.position.set( 10, 10, 10 );
  light2.position.set( -4, -7, -20 );
  light3.position.set( 4, 7, 20 );
  light4.position.set( 3, 3, 0.5 );


  // remember to add the light to the scene
  scene.add( light );

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  // add the automatically created <canvas> element to the page
  container.appendChild( renderer.domElement );

  // start the animation loop
  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

// perform any updates to the scene, called once per frame
// avoid heavy computation here
function update() {

  doStuffwithRaycaster();
  // increase the mesh's rotation each frame, edit position

  //sphere
  mesh.position.z = 0;
  mesh.position.x = 0;
  mesh.position.y = 5;

  mesh4.position.z = 10;
  mesh4.position.x = 10;
  mesh4.position.y = 5;

  mesh7.position.z = -10;
  mesh7.position.x = -10;
  mesh7.position.y = 5;

  mesh10.position.z = -30;
  mesh10.position.x = -30;
  mesh10.position.y = 5;

  mesh.rotation.z += 0.01;
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;

  //cone
  mesh2.position.z = 0;
  mesh2.position.x = 0;
  mesh2.position.y = -3;

  mesh5.position.z = 10;
  mesh5.position.x = 10;
  mesh5.position.y = -3;

  mesh8.position.z = -10;
  mesh8.position.x = -10;
  mesh8.position.y = -3;

  mesh11.position.z = -30;
  mesh11.position.x = -30;
  mesh11.position.y = -3;

  mesh2.rotation.y += 0.01;


  //torus
  mesh3.position.z = 0;
  mesh3.position.x = 0;
  mesh3.position.y = 5;

  mesh6.position.z = 10;
  mesh6.position.x = 10;
  mesh6.position.y = 5;

  mesh9.position.z = -10;
  mesh9.position.x = -10;
  mesh9.position.y = 5;

  mesh12.position.z = -30;
  mesh12.position.x = -30;
  mesh12.position.y = 5;

  mesh3.rotation.z -= 0.01;
  mesh3.rotation.x -= 0.01;
  mesh3.rotation.y -= 0.01;




}

function doStuffwithRaycaster() {

    // update the picking ray with the camera and mouse position
  	raycaster.setFromCamera( camera, mouse );

  	// calculate objects intersecting the picking ray
  	var intersects = raycaster.intersectObjects( scene.children );

  	for ( var i = 0; i < intersects.length; i++ ) {

if(intersects.length>0){
      //change the object that was intersected with
  	intersects[ i ].object.material.color.set( 0xff0000 );
}else{}
}//for

      console.log("Intersection List", intersects);

}

// render, or 'draw a still image', of the scene
function render() {

  doStuffwithRaycaster();
  renderer.render( scene, camera );

}

function onMouseMove( event ) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

// a function that will be called every time the window gets resized.
// It can get called a lot, so don't put any heavy computation in here!
function onWindowResize() {

  // set the aspect ratio to match the new browser window aspect ratio
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  // update the size of the renderer AND the canvas
  renderer.setSize( container.clientWidth, container.clientHeight );

}

//window.addEventListener( 'resize', onWindowResize );
window.requestAnimationFrame(render);

// call the init function to set everything up
init();
