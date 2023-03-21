<template>
  <nav class="nav">
    <ul>
      <li><NuxtLink to="/">index</NuxtLink></li>
      <li><NuxtLink to="/pie">test</NuxtLink></li>
    </ul>
  </nav>
</template>

<style scoped>
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
