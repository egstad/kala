<template>
  <div class="pill">
    <div class="pill__content">
      <div v-if="slots.label" class="pill__label">
        <slot name="label"></slot>
      </div>

      <div v-if="slots.input" class="pill__input">
        <slot name="input"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSlots } from "vue";
const slots = useSlots();
</script>

<style lang="css">
.pill {
  display: flex;
  padding-bottom: calc(var(--unit) * 0.5);
  padding-left: calc(var(--unit) * 0.5);
  height: calc(var(--unit) * 5);
}

.pill__content {
  display: flex;
  align-items: center;
  padding: calc(var(--unit) * 0.5);
  background-color: var(--color-background);
  color: var(--color-foreground);
  border-radius: 100vw;
  line-height: 1;
}

.pill__label {
  padding: calc(var(--unit) * 0.5) var(--unit);
  white-space: nowrap;
}

.pill__input {
  display: flex;
  flex: 1 1;
  height: 100%;
}

.pill__input select,
.pill__input button {
  appearance: none;
  outline: 0;
  border: 0;
  background: var(--color-document);
  color: var(--color-foreground);
  border-radius: 100vw;
  padding: calc(var(--unit) * 0.5) calc(var(--unit) * 1.5);
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}

.pill__input select,
.pill__input input[type="range"] {
  min-width: calc(var(--unit) * 24);
  height: 100%;
}

.pill__input button {
  height: 100%;
  background-color: var(--color-document);
  cursor: pointer;
}

.pill__input input[type="range"] {
  appearance: none;
  background: 0;
  cursor: pointer;
  margin: 0;
  box-sizing: border-box;
  /* margin-right: calc(var(--unit) * 0.25); */
  display: flex;
  flex: 1;
  font-size: inherit;
  height: 100%;
  width: 100%;
}

.pill__input input[type="range"]::-webkit-slider-runnable-track {
  background: var(--color-document);
  height: calc(var(--unit) * 4 - var(--unit) * 0.5);
  border-radius: 100vw;

  font-size: inherit;
}

.pill__input input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  background-color: var(--color-foreground);
  border-radius: calc(var(--unit) * 5);
  height: calc(var(--unit) * 4 - var(--unit) * 0.5);
  width: calc(var(--unit) * 4 - var(--unit) * 0.5);
  border: 2px solid var(--color-document);
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: calc(var(--unit) * 6.5);
  height: calc(var(--unit) * 4 - var(--unit) * 0.5);
  /* height: 100%; */
  border-radius: 100vw;
  overflow: hidden;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-document);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: calc(var(--unit) * 4 - var(--unit) * 0.5);
  width: calc(var(--unit) * 4 - var(--unit) * 0.5);
  border-radius: 100vw;
  overflow: hidden;
  border: 2px solid var(--color-document);

  background-color: var(--color-foreground);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--color-document);
}

input:checked + .slider:before {
  transform: translateX(calc(var(--unit) * 3));
}
</style>
