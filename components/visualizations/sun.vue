<template>
  <figure>
    <div class="three" ref="three" @click="destroy">
      <canvas ref="canvas"></canvas>
    </div>
  </figure>
</template>

<script setup>
import { ref, watch, onBeforeUnmount, onMounted } from "vue";
import { useIntersectionObserver } from "vue-composable";
import * as THREE from "three";
import gsap from "gsap";

/* ----------------------------------------------------------------------------
 * fetch the props
 * ------------------------------------------------------------------------- */

const props = defineProps(["progress", "name"]);

/* ----------------------------------------------------------------------------
 * browsers set a limit to how many webgl contexts we can show...
 * 16 is the limit, so we'll throttle this with intersection observers...
 * ------------------------------------------------------------------------- */
const three = ref(null);
const observer = useIntersectionObserver(three);

watch(observer.isIntersecting, (inView) => {
  if (inView) {
    init();
  } else {
    console.log("destroy");
    destroy();
  }
});

/* ----------------------------------------------------------------------------
 * three js app shit
 * ------------------------------------------------------------------------- */
let scene, renderer;
const camera = ref(null);
const canvas = ref(null);
const raf = ref(null);
const w = ref(null);
const h = ref(null);

function init() {
  setDimensions();
  initScene();
  initCamera();
  initRenderer();
  animate();
  // window.addEventListener("resize", this.onWindowResize, false);
}

function destroy() {
  cancelAnimationFrame(raf.value);

  // renderer.forceContextLoss();
  // renderer.dispose();
  // renderer.context = null;
  // renderer.domElement = null;
  // renderer = null;
}

function animate() {
  // if (!observer.isIntersecting) return;
  raf.value = requestAnimationFrame(animate);
  // this.rotateLight();
  renderer.render(scene, camera.value);
}

function drawPlane() {
  const geometry = new THREE.PlaneGeometry(100, 100);
  const material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
  const plane = new THREE.Mesh(geometry, material);
  plane.position.z = -100;
  plane.receiveShadow = true;
}

function setDimensions() {
  const el = three.value.getBoundingClientRect();
  w.value = Math.round(el.width);
  h.value = Math.round(el.height);
}

function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x00ff00);
  drawPlane();
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({
    alpha: false,
    canvas: canvas.value,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.setSize(w.value, h.value);

  canvas.value.addEventListener(
    "webglcontextlost",
    function (event) {
      event.preventDefault();
      cancelAnimationFrame(raf.value);
      console.log("lost boi");
    },
    false
  );

  canvas.value.addEventListener(
    "webglcontextrestored",
    function (event) {
      event.preventDefault();
      console.log("restored");
    },
    false
  );
}

function initCamera() {
  camera.value = new THREE.PerspectiveCamera(30, w.value / h.value, 1, 1000);
  camera.value.position.z = 500;
  camera.value.rotation.x = 0;
  camera.value.rotation.y = 0;
  camera.value.rotation.x = 0;
}

/* ----------------------------------------------------------------------------
 * Intersection observer. If ref="el" isn't in view, we cancel 'updateProgress'
 * ------------------------------------------------------------------------- */

onBeforeUnmount(() => {
  observer.disconnect();
  destroy();
});
</script>

<style lang="css" scoped>
figure {
  width: auto;
  height: 100%;
  display: flex;
  background-color: var(--color-background);
  transition: background-color var(--color-transition);
}

figure.zen-mode {
  background-color: var(--color-document);
  transition: background-color var(--color-transition);
  transition-delay: 0.5s;
}

.three {
  display: block;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
