<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td>Selected State:</td>
          <td>{{ store.selectedStyle }}</td>
          <td>
            <select v-model="style" @change="onStyleChange">
              <option v-for="style in store.supportedStyles" :value="style">
                {{ style }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Zoom</td>
          <td>
            <input
              v-model="zoom"
              type="range"
              @input="onZoomChange"
              name="zoom"
              min="1"
              max="6"
              style="direction: rtl"
            />
          </td>
          <td v-if="userEditedColumnCount">
            <button @click="resetColumnCount">Disable Override</button>
          </td>
        </tr>
      </tbody>
    </table>
    <br />

    <div class="gridzie" ref="timeUnits">
      <component
        v-for="(unit, index) in store.supportedTimeUnits"
        :key="unit + index"
        :is="`time-${unit}`"
        :variant="style"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, onBeforeMount } from "vue";

const store = useTimeStore();
const style = ref(store.selectedStyle);
const timeUnits = ref(null);

onMounted(() => {
  updateColumnCount();
});

/* ----------------------------------------------------------------------------
 * Style select dropdown
 * ------------------------------------------------------------------------- */

const onStyleChange = (event) => store.updateStyle(event.target.value);

/* ----------------------------------------------------------------------------
 * Zoom
 * ------------------------------------------------------------------------- */

const zoom = ref(2);
const onZoomChange = (event) => {
  userEditedColumnCount.value = true;
  // updateColumns(event.target.value);
};
const resetColumnCount = (event) => {
  userEditedColumnCount.value = false;
  updateColumnCount();
};

/* ----------------------------------------------------------------------------
 * Handle Zoom Dynamically
 * ------------------------------------------------------------------------- */

const userEditedColumnCount = ref(false);

const updateColumnCount = (ev) => {
  if (userEditedColumnCount.value) return;

  const width = window.innerWidth;
  let colCount = 2;

  if (width < 576) {
    colCount = 1;
  } else if (width < 768) {
    colCount = 2;
  } else if (width < 992) {
    colCount = 3;
  } else if (width < 1200) {
    colCount = 4;
  } else if (width < 1600) {
    colCount = 5;
  } else {
    colCount = 6;
  }

  zoom.value = colCount;
};

if (process.client) {
  window.addEventListener("resize", updateColumnCount);
}
</script>

<style>
.style-filter {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999;
}
.gridzie {
  display: grid;
  grid-template-columns: repeat(v-bind(zoom), 1fr);
  grid-gap: 2px;
  padding: 2px;
}

/* :deep(.gridzie) :deep(*) {
  display: flex;
  width: 100%;
} */
</style>
