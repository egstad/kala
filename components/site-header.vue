<template>
  <ClientOnly>
    <header>
      <h1 class="visually-hidden">Time, a project by Jordan Egstad.</h1>
      <p>
        <span class="screen-reader-only">Current Date:</span>
        <span>{{ storeTime.now.format("MMMM DD, YYYY") }}</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </p>

      <p @click="clock12Hour = !clock12Hour">
        <span class="screen-reader-only">Current Time:</span>
        <span v-if="clock12Hour">{{ storeTime.now.format("hh:mm:ss") }}</span>
        <span v-else>{{ storeTime.now.format("HH:mm:ss") }}</span>
      </p>

      <nav class="nav">
        <select v-model="storeUI.styleSelected" @change="onStyleChange">
          <optgroup label="Pages">
            <option>Home</option>
          </optgroup>
          <optgroup label="Visualization">
            <option v-for="style in storeUI.styleList" :value="style">
              {{ formatTitle(style) }}
            </option>
          </optgroup>
        </select>
      </nav>

      <p>
        <span>
          <input
            v-model="storeUI.zoomSelected"
            type="range"
            @input="onZoomChange"
            name="zoom"
            min="1"
            max="6"
            style="direction: rtl"
          />
        </span>
        <span v-if="storeUI.zoomOverride">
          <button @click="resetColumnCount">Disable Override</button>
        </span>
      </p>
    </header>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from "vue";

const storeTime = useTimeStore();
const clock12Hour = ref(true);
const router = useRouter();

const onStyleChange = (ev) => {
  const page = ev.target.value;
  let path;

  switch (page) {
    case "Home":
      path = "/";
      break;

    default:
      path = `/${ev.target.value}`;
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

  if (width < 480) {
    colCount = 1;
  } else if (width < 640) {
    colCount = 2;
  } else if (width < 960) {
    colCount = 3;
  } else if (width < 1280) {
    colCount = 4;
  } else if (width < 1600) {
    colCount = 5;
  } else if (width < 1920) {
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
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
}

.nav ul {
  display: flex;
}

li {
  padding: 0.5em;
}

li:first-child {
  padding-left: none;
}
</style>
