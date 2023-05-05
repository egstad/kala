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
import { percentageReverse } from "@/assets/scripts/mathPercentage";

import { minutesToMsec } from "~~/assets/scripts/mathMinutesToSeconds";
import { useTimeStore } from "@/stores/time";
import { useUIStore } from "@/stores/ui";

/* ----------------------------------------------------------------------------
 * Set duration of this time unit in MSEC
 * ------------------------------------------------------------------------- */

const durationMsec = minutesToMsec(1);

export default {
  setup() {
    const timeStore = useTimeStore();
    const storeUI = useUIStore();

    return {
      timeStore,
      storeUI,
    };
  },
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
      lightSize: 0,
      lightOffset: 0,
      lightIntensity: 600,
      time: 0,
      mouse: null,
      plane: null,
      dial: null,
      dialSize: 100,
      spheres: [],
    };
  },
  created() {
    this.storeUI.updateHeader(true);
    this.storeUI.showZoom(false);
    this.storeUI.showZen(false);
    this.storeUI.showStyle(false);
    this.storeUI.showTime(false);

    if (process.client) {
      const el = document.documentElement;
      el.setAttribute(
        "style",
        "--color-background: rgba(0, 0, 0, 0.); --color-foreground: rgba(100, 100, 200, 1)"
      );
    }
  },
  mounted() {
    this.init();
    this.animate();
  },
  beforeUnmount() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onWindowResize, false);
  },
  methods: {
    init() {
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
      // this.time = this.updateTime();
      this.time = this.updateTime() * (Math.PI * 2);
      this.raf = requestAnimationFrame(this.animate);
      this.rotateLight();
      this.renderer.render(toRaw(this.scene), this.camera);
    },
    rotateLight() {
      gsap.to(this.light.position, {
        duration: 0.1,
        ease: "power4.out",
        x: Math.sin(this.time) * (this.dialSize * 3),
        y: Math.cos(this.time) * (this.dialSize * 3),
        // x: this.mouse.x,
        // y: this.mouse.y,
        z: this.dialSize * 0.6,
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
      this.resizeNumbers();
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
      this.light.shadow.radius = 3;
      this.light.shadow.blurSamples = 25;
      this.scene.add(this.light);
    },
    drawNumbers() {
      // Define the center and radius of the circle
      const cx = 0;
      const cy = 0;
      const r = 50 * (this.w / this.h) + this.lightSize;

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
        // sphere.receiveShadow = true;
        sphere.position.set(x, y, 0);
        this.spheres.push(sphere);
        // Add the sphere to the scene
        this.scene.add(sphere);
      }
    },
    resizeNumbers() {
      const cx = 0;
      const cy = 0;
      const r = Math.min(100 * (this.w / this.h) + this.lightSize, 100);

      this.spheres.forEach((sphere, i) => {
        // Calculate the angle in radians for this sphere
        const angle = (i / 12) * 2 * Math.PI;

        // Calculate the coordinates for this sphere
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);

        // Create the sphere and position it at the calculated coordinates
        const radius = Math.min(6, Math.round(this.w * 0.006));
        sphere.geometry = new THREE.SphereGeometry(radius);
        sphere.position.set(x, y, 0);
      });
    },
    updateTime() {
      const now = this.timeStore.now;
      const msecDifference = now.endOf("minute").diff(now);
      return percentageReverse(msecDifference, durationMsec);
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
