export default function (el, mouseMove) {
  /***
   * @el to calculate positions
   * @mouseMove "mouseMove" event;
   * This should return a value bewteen -100 and 100
   * where if the mouse is on el.top limit it returns 100%
   * if the mouse is on el.bottom limit returns -100
   * the center is 0% and you get the whole spectrum;
   */
  const elRect = el.getBoundingClientRect();
  const top = window.lenis.scroll + elRect.top;
  const bottom = window.lenis.scroll + elRect.height;

  const mouseDistanceFromTop = mouseMove.pageY - top;
  const mouseDistanceFromBottom = bottom - mouseMove.pageY;

  const percentage =
    ((mouseDistanceFromBottom - mouseDistanceFromTop) / elRect.height) * 100;

  return percentage;
}
