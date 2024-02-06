import { reactive } from "vue";

// No transition to start, set default to true.
const transitionState = reactive({
  transitionComplete: true,
});

export const usePageTransition = () => {
  const toggleTransitionComplete = (value) => {
    transitionState.transitionComplete = value;
  };

  return {
    transitionState,
    toggleTransitionComplete,
  };
};
