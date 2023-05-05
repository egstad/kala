<template>
  <figure class="content">
    <div class="three" ref="three" @click="destroy">
      <canvas ref="canvas"></canvas>
    </div>
  </figure>
</template>

<script>
import { storeToRefs } from "pinia";
import gsap from "gsap";
import * as THREE from "three";
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { setMetaTags } from "@/assets/scripts/utilMetaTags";
import { formatPageTitle } from "@/assets/scripts/utilFormatText";
export default {
  data() {
    return {
      renderer: null,
      scene: null,
      camera: null,
      cameraFOV: 30,
      cameraZ: 500,
      raf: null,
      w: null,
      h: null,
      light: null,
      lightSize: 5,
      lightOffset: 0,
      lightIntensity: 500,
      time: 0,
      mouse: null,
      plane: null,
      dial: null,
      dialSize: 100,
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {
      console.clear();
      this.setDimensions();
      this.initScene();
      this.initCamera();
      this.initRenderer();
      this.onWindowResize();
      window.addEventListener("resize", this.onWindowResize, false);
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        this.cameraFOV,
        this.w / this.h,
        1,
        1000
      );
      this.camera.position.z = this.cameraZ;
      this.camera.rotation.x = 0;
      this.camera.rotation.y = 0;
      this.camera.rotation.x = 0;

      if (this.w < this.h) {
        let fov =
          2 * Math.atan((this.w * 0.8) / (4 * this.cameraZ)) * (180 / Math.PI);
        this.camera.fov = fov - 100;
      } else {
        this.camera.fov = this.cameraFOV;
      }
    },
    initRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        canvas: this.$refs.canvas,
        antialias: true,
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.shadowMap.enabled = true;
      this.renderer.setSize(this.w, this.h);
    },
    initScene() {
      this.scene = new THREE.Scene();
      // this.scene.background = new THREE.Color( 0x111111 );
      // this.scene.fog = new THREE.FogExp2(0x111111, 0.001);
      this.drawPlane();
      this.drawLight();
      this.drawNumbers();
    },
    animate() {
      this.time = Date.now() * 0.0005;
      this.raf = requestAnimationFrame(this.animate);
      this.rotateLight();
      this.renderer.render(toRaw(this.scene), this.camera);
    },
    rotateLight() {
      gsap.to(this.light.position, {
        duration: 3,
        ease: "power4.out",
        x: Math.sin(this.time * 2) * (this.dialSize * 2),
        y: Math.cos(this.time * 2) * (this.dialSize * 2),
        // x: this.mouse.x,
        // y: this.mouse.y,
        z: this.dialSize,
      });
    },
    setDimensions() {
      // const el = this.$refs.three.getBoundingClientRect();
      // this.w = Math.round(el.width);
      // this.h = Math.round(el.height);
      this.w = window.innerWidth;
      this.h = window.innerHeight;
    },
    onMouseMove(ev) {
      this.mouse.x = (this.map(ev.clientX, this.w) * this.w) / 15;
      this.mouse.y = (this.map(ev.clientY, this.h) * this.h) / -15;
    },
    map(curr, max) {
      return (curr / max) * 2 - 1;
    },
    onWindowResize(ev) {
      this.setDimensions();
      this.camera.aspect = this.w / this.h;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.w, this.h);

      // around 500

      if (this.w < this.h) {
        let fov =
          2 * Math.atan((this.w * 0.8) / (4 * this.cameraZ)) * (180 / Math.PI);
        this.camera.fov = fov - 100;
      } else {
        this.camera.fov = this.cameraFOV;
      }
    },
    drawDial() {
      const geometry = new THREE.SphereGeometry(this.dialSize * 0.24, 32, 64);
      const material = new THREE.MeshStandardMaterial({
        color: 0x0000ff,
      });
      this.dial = new THREE.Mesh(geometry, material);
      this.dial.openEnded = true;
      this.dial.castShadow = true;
      this.scene.add(this.dial);
    },
    drawPlane() {
      const geo = new THREE.PlaneGeometry(this.w * 10, this.h * 10);
      const mat = new THREE.MeshStandardMaterial({ color: 0x0000ff });
      this.plane = new THREE.Mesh(geo, mat);
      this.plane.position.z = 0;
      this.plane.receiveShadow = true;
      this.scene.add(this.plane);
    },
    drawLight() {
      const sphere = new THREE.SphereGeometry(this.lightSize, 32, 32);
      this.light = new THREE.PointLight(0x0000ff, 1, this.lightIntensity);
      this.light.add(
        new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0000ff }))
      );
      this.light.castShadow = true;
      this.scene.add(this.light);
    },
    drawNumbers() {
      // Define the center and radius of the circle
      const cx = 0;
      const cy = 0;
      const r = this.dialSize + this.lightSize;

      // Create a sphere geometry and material
      // const sphereGeometry = new THREE.CylinderGeometry( 1, 1, 20, 32 )
      const sphereGeometry = new THREE.SphereGeometry(6, 32, 32);
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: 0x0000ff,
      });

      // Create 12 spheres along the circle's circumference
      for (let i = 0; i < 12; i++) {
        // Calculate the angle in radians for this sphere
        const angle = (i / 12) * 2 * Math.PI;

        // Calculate the coordinates for this sphere
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);

        // Create the sphere and position it at the calculated coordinates
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.castShadow = true;
        sphere.position.set(x, y, 0);

        // Add the sphere to the scene
        this.scene.add(sphere);
      }
    },
  },
};
</script>

<style scoped>
.content,
.three {
  width: 100dvw;
  height: 100dvh;
}
</style>
