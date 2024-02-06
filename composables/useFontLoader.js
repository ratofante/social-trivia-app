import FontFaceObserver from "fontfaceobserver";

export const useFontLoader = async (_fonts = []) => {
  const promises = [];

  for (const font of _fonts) {
    if ("name" in font)
      promises.push(
        new Promise((resolve) => {
          new FontFaceObserver(font.name, {
            weight: font.weight,
            style: font.style,
          })
            .load(null, 5000)
            .then(() => {
              resolve();
            })
            .catch(() => {
              console.log(font.name + " failed to load.");
            });
        })
      );
  }

  await Promise.all(promises);
  window.dispatchEvent(new CustomEvent("fontsLoaded"));
};
