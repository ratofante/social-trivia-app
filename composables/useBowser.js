import Bowser from "bowser";

export const useBowser = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  document.documentElement.setAttribute(
    "data-browser",
    browser.getBrowserName()
  );
  document.documentElement.setAttribute("data-os", browser.getOSName());
  document.documentElement.setAttribute(
    "data-device",
    browser.getPlatformType()
  );
};
