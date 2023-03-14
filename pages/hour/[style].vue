<template>
  <div>
    <TimeHour :variant="variant" />
  </div>
</template>

<script setup>
const variant = useRoute().params.style;
</script>
