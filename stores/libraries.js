export const useLibraryStore = defineStore("library", {
  state: () => ({
    p5HasLoaded: false,
  }),
  actions: {
    setP5LoadedState(val) {
      this.p5HasLoaded = val;
    },
  },
});
