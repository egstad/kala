<template>
  <ClientOnly>
    <header>
      <h1 class="visually-hidden">Time, a project by Jordan Egstad.</h1>

      <AtomsPill>
        <template #label>
          <p>
            <span class="screen-reader-only">Current Date:</span>
            <span>{{ storeTime.now.format("MMMM DD, YYYY") }}</span>
          </p>
        </template>
      </AtomsPill>

      <AtomsPill @click="clock12Hour = !clock12Hour">
        <template #label>
          <p>
            <span class="screen-reader-only">Current Time</span>
            <span v-if="clock12Hour">{{
              storeTime.now.format("hh:mm:ss")
            }}</span>
            <span v-else>{{ storeTime.now.format("HH:mm:ss") }}</span>
          </p>
        </template>
      </AtomsPill>

      <AtomsPill>
        <template #label>
          <p>Style</p>
        </template>
        <template #input>
          <nav class="nav">
            <select v-model="storeUI.styleSelected" @change="onStyleChange">
              <option v-for="style in storeUI.styleList" :value="style">
                {{ formatTitle(style) }}
              </option>
            </select>
          </nav>
        </template>
      </AtomsPill>

      <AtomsPill>
        <template #label>
          <p>Time</p>
        </template>
        <template #input>
          <nav class="nav">
            <select v-model="storeTime.timeSelectedUnit" @change="onTimeChange">
              <optgroup label="Gallery">
                <option>All</option>
              </optgroup>
              <optgroup label="Individual">
                <option
                  v-for="style in storeTime.timeUnitsSupported"
                  :value="style"
                >
                  {{ formatTitle(style) }}
                </option>
              </optgroup>
            </select>
          </nav>
        </template>
      </AtomsPill>

      <AtomsPill>
        <template #label>
          <p>Zen</p>
        </template>

        <template #input>
          <label class="switch">
            <input type="checkbox" v-model="storeUI.zenMode" />
            <span class="slider round"></span>
          </label>
        </template>
      </AtomsPill>

      <AtomsPill v-if="storeUI.soundIsVisible">
        <template #label>
          <p>Sound</p>
        </template>

        <template #input>
          <label class="switch">
            <input
              type="checkbox"
              v-model="storeUI.soundEnabled"
              @change="onSoundChange"
            />
            <span class="slider round"></span>
          </label>
        </template>
      </AtomsPill>

      <AtomsPill>
        <template #label>
          <p>Zoom</p>
        </template>

        <template #input>
          <input
            v-model="storeUI.zoomSelected"
            type="range"
            @input="onZoomChange"
            name="zoom"
            min="1"
            max="6"
            style="direction: rtl"
          />

          <span
            v-if="storeUI.zoomOverride"
            style="margin-left: calc(var(--unit) * 0.5)"
          >
            <button @click="resetColumnCount">Reset</button>
          </span>
        </template>
      </AtomsPill>
    </header>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from "vue";

const storeTime = useTimeStore();
const clock12Hour = ref(true);
const router = useRouter();
const { $event } = useNuxtApp();

const onStyleChange = (ev) => {
  const page = ev.target.value;
  let time = storeTime.timeSelectedUnit;
  let path;

  switch (page) {
    case "All":
      path = "/";
      break;

    default:
      if (time === "All") {
        path = `/${ev.target.value}`;
      } else {
        path = `/${ev.target.value}/${time}`;
      }
      break;
  }

  router.push({ path });
};

const onTimeChange = (ev) => {
  const page = ev.target.value;
  const style = storeUI.styleSelected;
  let path;

  switch (page) {
    case "All":
      path = `/${style}`;
      break;

    default:
      path = `/${style}/${ev.target.value}`;
      break;
  }

  router.push({ path });
};

/* ----------------------------------------------------------------------------
 * UI Zoom shit
 * ------------------------------------------------------------------------- */
const storeUI = useUIStore();

onMounted(() => {
  updateColumnCount();
});

const onZoomChange = (event) => {
  if (storeUI.zoomDefault == storeUI.zoomSelected) {
    storeUI.updateZoomOverride(false);
  } else {
    storeUI.updateZoomOverride(true);
  }

  // tell the whole app something changed...
  $event("ui:zoom");
};

const onSoundChange = (event) => {
  $event("sound::update", event);
};

const resetColumnCount = (event) => {
  storeUI.updateZoomOverride(false);
  updateColumnCount();
};

/* ----------------------------------------------------------------------------
 * Handle Zoom Dynamically
 * ------------------------------------------------------------------------- */

const userEditedColumnCount = ref(false);

const updateColumnCount = (ev) => {
  if (storeUI.zoomOverride) return;

  const width = window.innerWidth;
  let colCount;

  if (width < 640) {
    colCount = 1;
  } else if (width < 960) {
    colCount = 2;
  } else if (width < 1440) {
    colCount = 3;
  } else if (width < 1920) {
    colCount = 4;
  } else if (width < 2560) {
    colCount = 5;
  } else {
    colCount = 6;
  }

  storeUI.updateZoomDefault(colCount);
  storeUI.updateZoomSelected(colCount);
};

if (process.client) {
  window.addEventListener("resize", updateColumnCount);
}

const formatTitle = (slug) => {
  var words = slug.split("-");

  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    words[i] = word.charAt(0).toUpperCase() + word.slice(1);
  }

  return words.join(" ");
};
</script>

<style scoped>
header {
  display: inline-flex;
  flex-wrap: wrap;
  padding-top: calc(var(--unit) * 0.5);
  /* position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  padding: 0 calc(var(--unit) * 0.5);

  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap; */
}

.nav ul {
  display: flex;
}

li:first-child {
  padding-left: none;
}
</style>
