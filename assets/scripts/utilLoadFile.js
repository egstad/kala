import { useLibraryStore } from "@/stores/libraries";

const library = useLibraryStore();

const p5 = {
  name: "p5",
  src: "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js",
  async: true,
  el: null,
  onComplete: () => library.setP5LoadedState(true),
};

export function loadP5() {
  if (!fileExists(p5.name)) {
    loadFile(p5, p5.onComplete);
  }
}

export function loadFile(options, callback) {
  const e = document.createElement("script");

  e.src = options.src;
  e.dataset.title = options.name;
  e.setAttribute("async", options.async);
  e.type = "text/javascript";
  e.addEventListener("load", callback);

  document.head.appendChild(e);
}

export function fileExists(name) {
  return document.head.querySelector(`script[data-title=${name}]`);
}
