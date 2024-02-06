export const useKillAnimations = (arr) => {
  if (arr.length > 0) {
    arr.forEach((animation) => {
      animation.kill();
    });
  }
};
