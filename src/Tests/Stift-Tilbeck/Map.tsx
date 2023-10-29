import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, MeshLambertMaterial, SpotLight, Vector3, PlaneGeometry, DoubleSide, MeshStandardMaterial, PointLight } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as TerraconnectUI from 'Terraconnect-UI';

const Map: TerraconnectUI.ComponentFN = () => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);

  const renderer = new WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, 400);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 5, 0);
  camera.position.set(0, 5, 40);
  camera.lookAt(new Vector3(0, 5, 0));

  const geometry = new PlaneGeometry(20, 20);
  const material = new MeshStandardMaterial({ color: 0xeeeeee });
  material.side = DoubleSide;
  const cube = new Mesh(geometry, material);
  cube.rotation.setFromVector3(new Vector3(-Math.PI / 2, 0, 0))
  scene.add(cube);

  {
    let light = new PointLight(0xffffff);
    light.position.set(10, 15, 0);
    light.intensity = 75;
    scene.add(light);
  }

  {
    let light = new PointLight(0xffffff);
    light.position.set(-10 * Math.cos(Math.PI / 3), 15, 10 * Math.cos(Math.PI / 3));
    light.intensity = 75;
    scene.add(light);
  }

  {
    let light = new PointLight(0xffffff);
    light.position.set(-10 * Math.cos(Math.PI / 3), 15, -10 * Math.cos(Math.PI / 3));
    light.intensity = 75;
    scene.add(light);
  }

  const fbxLoader = new FBXLoader()
  fbxLoader.load(
    'models/untitled.fbx',
    (object) => {
      object.traverse(function (child) {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = new MeshStandardMaterial({ color: 0xffffcc });
          // if ((child as THREE.Mesh).material) {
          // ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
          // }
        }
      })
      object.scale.set(.0025, .0025, .0025)
      object.rotateY(Math.PI / 2);
      scene.add(object)
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
      console.log(error)
    }
  )


  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }
  animate();

  function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    // look up the size the canvas is being displayed
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // update any render target sizes here
  }

  const resizeObserver = new ResizeObserver(resizeCanvasToDisplaySize);
  resizeObserver.observe(renderer.domElement, { box: 'content-box' });

  return (
    <>
      {renderer.domElement}
    </>
  );
}

export default Map as TerraconnectUI.Component;
