<template>
  <input
    type="datetime-local"
    id="meeting-time"
    name="meeting-time"
    :value="value"
    min="1970-01-01T00:00:00"
    step="1"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: false,
      default: "",
    },
  },
};
</script>

<style>
input {
  display: inline-block;
  width: auto;
}
</style>
