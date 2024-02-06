import imagesLoaded from "imagesloaded";

export const useImageLoader = async (_selector = "img") => {
  const promise = new Promise((resolve) => {
    const loader = imagesLoaded(
      document.querySelectorAll(_selector),
      { background: true },
      resolve
    );

    let count = 0;
    loader.on("progress", function () {
      count++;
      let progress = Math.ceil((count * 100) / loader.images.length);
      window.dispatchEvent(new CustomEvent("onImagesLoading"), {
        progress: progress,
      });
      //console.log("dispatchEvent > onImagesLoading > progress: ", progress);
    });

    loader.on("fail", function () {
      window.dispatchEvent(new CustomEvent("onImagesLoadingFail"));
    });
  });

  await Promise.all([promise]);
  window.dispatchEvent(new CustomEvent("imagesLoaded"));
  //console.log("dispatchEvent > imagesLoaded");
};
