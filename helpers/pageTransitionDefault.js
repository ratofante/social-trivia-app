import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTransition } from "../composables/usePageTransition";
import useDispatchEvent from "../composables/useDispatchEvent";
import Lenis from "@studio-freight/lenis";
const { toggleTransitionComplete } = usePageTransition();

const pageTransition = {
  name: "page-transiton",
  mode: "out-in",
  onEnter: (el, done) => {
    gsap.set(el, { clearProps: "all" });
    gsap.delayedCall(0.2, done);
  },
  onAfterEnter: () => {
    toggleTransitionComplete(true);
    useDispatchEvent("transitionOnAfterEnterStart");
    useDispatchEvent("NavbarThemeChange", { theme: "dark" });
    useDispatchEvent("resetCursor");
  },
  onLeave: (el, done) => {
    window.lenis.destroy();
    window.lenis = new Lenis();
    window.lenis.on("scroll", ScrollTrigger.update);
    toggleTransitionComplete(false);
    useDispatchEvent("transitionOnLeaveStart");
    window.addEventListener("transitionOnLeaveDone", () => {
      done();
    });
  },
};

export default pageTransition;
