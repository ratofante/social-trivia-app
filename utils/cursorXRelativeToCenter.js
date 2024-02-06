export default function (el, mouseEvent) {
  /***
   * @el to calculate positions
   * @mouseMove "mousemove" event;
   * This should return a value bewteen -100 and 100
   * where if the mouse is on element.left border it returns 100%
   * if the mouse is on el.right limit returns -100
   * the center is 0% and you get the whole spectrum;
   */
  const elRect = el.getBoundingClientRect();
  const elXcenter = elRect.left + elRect.width / 2;
  const xRelative = mouseEvent.clientX - elXcenter;
  const percentage = (xRelative * 100) / elXcenter;

  return percentage;
}
