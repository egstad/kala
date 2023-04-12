export const useUIStore = defineStore("ui", {
  state: () => ({
    zoomSelected: 2,
    zoomDefault: 0,
    zoomOverride: false,
    styleSelected: null,
    zenMode: false,
    styleDefault: "text-ring",
    styleList: [
      "band",
      "line",
      "pie",
      "zoom",
      "text-ring",
      "text-counter",
      "rose",
      "cardoid",
      "noise",
    ],
    windowWidth: null,
    windowHeight: null,
    docWidth: null,
    docHeight: null,
  }),
  actions: {
    updateZoomSelected(val) {
      this.zoomSelected = val;
    },
    updateZenMode(val) {
      this.zenMode = val;
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
  },
});
