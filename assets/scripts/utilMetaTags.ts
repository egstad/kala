const defaults = {
  title: "Kala",
  description:
    "An interactive online tool that visualizes the passing of time.",
  image: "https://kala.watch/images/meta/kala-thumbnail.png",
  twitterCard: "summary_large_image",
  twitterCreator: "@jordanegstad",
};

export function setMetaTags(options = defaults) {
  return {
    title: options.title || defaults.title,
    ogTitle: options.title || defaults.title,
    description: options.description || defaults.description,
    ogDescription: options.description || defaults.description,
    ogImage: options.image || defaults.image,
    twitterTitle: options.title || defaults.title,
    twitterCard: options.twitterCard || defaults.twitterCard,
    twitterCreator: options.twitterCreator || defaults.twitterCreator,
    twitterDescription: options.description || defaults.description,
    twitterImage: options.image || defaults.image,
  };
}
