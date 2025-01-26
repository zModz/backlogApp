const commonColor = {
  colors: {
    commonWhite: "#FFFFFF",
    commonBlack: "#000000",
  },
};

export const light = {
  theme: "light",
  colors: {
    primary: "#D0343C", // red
    surface: "#EAEAEA", // bone
    accent: "#C76065", // wine
    secondaryAccent: "#E9E6E6", // light bone
    background: "#C7C7C7", // gray
    transpBackground: "#C7C7C795",
    text: "#000000", // black
    ...commonColor.colors,
  },
};

export const dark = {
  theme: "dark",
  colors: {
    primary: "#A0282E", // rose
    surface: "#282828", // coal
    accent: "#AD4449", // light rose
    secondaryAccent: "#3E3E3E", // light coal
    background: "#6C6262", // dark gray
    transpBackground: "#6C626295",
    text: "#FFFFFF", // white
    ...commonColor.colors,
  },
};
