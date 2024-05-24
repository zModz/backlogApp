const commonColor = {
  colors: {
    commonWhite: "#FFFFFF",
    commonBlack: "#000000",
  },
};

const light = {
  colors: {
    primary: "#D0343C", // red
    secondary: "#EAEAEA", // bone
    accent: "#C76065", // wine
    secondaryAccent: "#E9E6E6", // light bone
    background: "#C7C7C7", // gray
    text: "#000000", // black
    ...commonColor.colors,
  },
};

const dark = {
  colors: {
    primary: "#A0282E", // rose
    secondary: "#282828", // coal
    accent: "#AD4449", // light rose
    secondaryAccent: "#3E3E3E", // light coal
    background: "#6C6262", // dark gray
    text: "#FFFFFF", // white
    ...commonColor.colors,
  },
};

export default { light, dark };
