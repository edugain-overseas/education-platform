export const adjustFontSize = () => {
  const vw = window.innerWidth;
  let fontSize;
  if (vw >= 992) {
    fontSize = vw / 1440;
  } else {
    fontSize = vw / 360;
  }
  document.documentElement.style.fontSize = `${fontSize}px`;
};
