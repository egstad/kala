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
  padding: var(--unit) calc(var(--unit) * 0.5);
}

.pill__content {
  display: flex;
  align-items: center;
  padding: calc(var(--unit) * 0.5);
  background-color: var(--color-background);
  color: var(--color-foreground);
  border-radius: var(--unit);
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
  border-radius: calc(var(--unit) * 0.25);
  padding: calc(var(--unit) * 0.5) var(--unit);
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}

.pill__input select,
.pill__input input[type="range"] {
  min-width: calc(var(--unit) * 24);
}

.pill__input button {
  background: var(--color-midground);
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
  border-radius: calc(var(--unit) * 0.25);

  font-size: inherit;
}

.pill__input input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  background-color: var(--color-foreground);
  border-radius: calc(var(--unit) * 5);
  height: calc(var(--unit) * 3);
  width: calc(var(--unit) * 3);
  border: 2px solid var(--color-background);
}
</style>
