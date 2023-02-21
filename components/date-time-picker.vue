<template>
  <input
    type="datetime-local"
    id="meeting-time"
    name="meeting-time"
    :value="value"
    @keydown="$emit('keydown', $event)"
    @input="$emit('input', $event.target.value)"
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
