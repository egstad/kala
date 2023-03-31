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
  background-color: var(--color-foreground);
  color: var(--color-background);
  border-radius: var(--unit);
  line-height: 1;
}

.pill__label {
  padding: calc(var(--unit) * 0.5) var(--unit);
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
  background: var(--color-background);
  color: var(--color-foreground);
  border-radius: calc(var(--unit) * 0.25);
  padding: calc(var(--unit) * 0.5) var(--unit);
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}

.pill__input button {
  background: var(--color-accent);
  cursor: pointer;
}

.pill__input input[type="range"] {
  appearance: none;
  background: 0;
  cursor: pointer;
  margin: 0;
  display: flex;
  flex: 1;
}

.pill__input input[type="range"]::-webkit-slider-runnable-track {
  background: var(--color-background);
  border-radius: calc(var(--unit) * 0.25);
  height: 100%;
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
