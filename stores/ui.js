export const useUIStore = defineStore("ui", {
  state: () => ({
    zoomSelected: 2,
    zoomDefault: 0,
    zoomOverride: false,
    styleSelected: null,
    zenMode: false,
    soundEnabled: false,
    soundIsVisible: false,
    styleDefault: "text-ring",
    styleList: [
      "band",
      "line",
      "pie",
      "zoom",
      "text-ring",
      "text-counter",
      "rose",
      "cardioid",
      "noise",
      "chet",
    ],
    windowWidth: null,
    windowHeight: null,
    docWidth: null,
    docHeight: null,
    userHasInteractedWithDom: false,
  }),
  actions: {
    updateZoomSelected(val) {
      this.zoomSelected = val;
    },
    updateZenMode(val) {
      this.zenMode = val;
    },
    updateSound(val) {
      this.soundEnabled = val;
    },
    showSoundUI(val) {
      this.soundIsVisible = val;
    },
    updateZoomDefault(val) {
      this.zoomDefault = val;
    },
    updateZoomOverride(val) {
      this.zoomOverride = val;
    },
    updateStyle(val) {
      this.styleSelected = val;
    },
    updateDevice(val) {
      this.windowWidth = val.windowWidth;
      this.windowHeight = val.windowHeight;
      this.docWidth = val.docWidth;
      this.docHeight = val.docHeight;
    },
    userHasInteracted(val) {
      this.userHasInteractedWithDom = val;
    },
  },
});
