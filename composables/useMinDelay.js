export const useMinDelay = async (_delay = 1000) => {
  const promise = new Promise(function (resolve) {
    setTimeout(() => {
      resolve();
    }, _delay);
  });

  await Promise.all([promise]);
  window.dispatchEvent(new CustomEvent("minDelayCompleted"));
  //console.log("dispatchEvent > minDelayCompleted: " + _delay);
};
