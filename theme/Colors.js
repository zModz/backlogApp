const commonColor = {
  colors: {
    commonWhite: "#FFFFFF",
    commonBlack: "#000000",
  },
};

const dark = {
  colors: {
    primary: "#282828",
    secondary: "#3E3E3E",
    accent: "#A0282E",
    border: "#AD4449",
    text: "#6C6262",
    ...commonColor.colors,
  },
};

const light = {
  colors: {
    primary: "#EAEAEA",
    secondary: "#E9E6E6",
    accent: "#D0343C",
    border: "#C76065",
    text: "#C7C7C7",
    ...commonColor.colors,
  },
};

export default { light, dark };
