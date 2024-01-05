<template>
  <footer>
    <AtomsPill>
      <template #label>
        <p>
          Created by
          <a href="https://www.designbusinesscompany.com/" target="_blank"
            >Design Business Company</a
          >.
        </p>
      </template>
    </AtomsPill>
    <AtomsPill>
      <template #label>
        <p>
          Open-sourced on
          <a href="https://github.com/egstad/kala" target="_blank">Github</a>.
        </p>
      </template>
    </AtomsPill>
  </footer>
</template>

<style scoped>
footer {
  display: inline-flex;
  flex-wrap: wrap;
  padding-top: calc(var(--unit) * 0.5);
}

a {
  color: inherit;
}
</style>
