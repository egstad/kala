<template>
<div>
  <template v-if="storeUI.soundIsVisible">
    <audio :autoplay="storeUI.soundEnabled" ref="audio">
      <source src="@/assets/audio/time-after-time.mp3" type="audio/mpeg">
    </audio>
  </template>

  <div class="grid" :class="{'zen-mode': zen}" ref="el">
    <template
      v-for="(unit, index) in storeTime.timeUnitsSupported"
      :key="unit + index"
    >
      <div class="grid__item">
        <component :is="`time-${unit}`" :variant="style" />
        <p class="meta">
          <div class="meta__unit">{{ unit.replace(/-/g, ' ') }}</div>
          <AtomsSvgCurve class="meta__bevel" />
        </p>
      </div>
    </template>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import gsap from "gsap";
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';


/* ----------------------------------------------------------------------------
 * Set our selected style based on route param
 * ------------------------------------------------------------------------- */
const storeUI = useUIStore();
const storeTime = useTimeStore();
const zoom = storeToRefs(storeUI).zoomSelected;
const zen = storeToRefs(storeUI).zenMode;
const style = useRoute().params.visualizationStyle.toLowerCase();
const time = "All";
const el = ref(null);
const nuxt = useNuxtApp();
const audio = ref(null);
storeUI.updateStyle(style);
storeTime.updateTime(time);
storeTime.updateTime(time);




definePageMeta({
  pageTransition: {
    mode: "out-in",
    onBeforeEnter: (el) => {
      gsap.set(el.children, {
        opacity: 0,
        y: "20px",
      });
    },
    onEnter: (el, done) => {
      gsap.to(el.children, {
        opacity: 1,
        y: "0",
        ease: "power3.out",
        onComplete: function () {
          gsap.set(this.targets(), { clearProps: "all" });
          done();
        },
        delay: 0.5,
        duration: 2,
        stagger: {
          amount: 0.75,
        },
      });
    },
    onLeave(el, done) {
      gsap.to(el, {
        opacity: 0,
        y: "20px",
        onComplete: done,
      });
    },
  },
});

onMounted(() => {
  if (style === 'chet') {
    storeUI.showSoundUI(true);
  }

  nuxt.$listen("sound::update", (ev)=> {
    nextTick(() => {
      if (storeUI.soundEnabled) {
        audio.value.play()
      } else {
        audio.value.pause()
      }
    })

  });
})




onBeforeUnmount(() => {
  if (style === 'chet') {
    storeUI.showSoundUI(false);

  }
})

</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(v-bind(zoom), 1fr);
  grid-gap: calc(var(--unit) * 0.5);
  padding: calc(var(--unit) * 0.5);
  padding-top: 0;
  width: 100%;
  height: 100%;
}

.grid__item {
  justify-self: center;
  align-self: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.grid :deep(.time),
.grid :deep(.time__content) {
  height: 100%;
  width: 100%;
  flex: 1 1;
  border-radius: var(--unit) var(--unit) var(--unit) 0;
  overflow: hidden;
  transition: border-radius 0 ease-out;
}

.grid :deep(.time__content) {
  aspect-ratio: 1/1;
}

.meta {
  width: fit-content;
  display: flex;
  transition: max-height var(--color-transition);
  max-height: calc(var(--unit) *4);
  overflow: hidden;;
}

.zen-mode.grid :deep(.time__content) {
  border-radius: var(--unit);
  transition: border-radius 0.25s 0.5s ease-out;
}

.zen-mode .meta {
  max-height: 0;
}

.meta__unit {
  background-color: var(--color-background);
  border-radius: 0 0 var(--unit) var(--unit);
  padding: var(--unit) calc(var(--unit) * 1.5);
  text-transform: capitalize;
}
</style>
