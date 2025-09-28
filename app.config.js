export default ({ config }) => {
  const buildEnv = process.env.BUILD_ENV || "production"; // default to production

  // Dynamic app identifiers
  let name = "Armory";
  let slug = "backlogApp";
  let packageName = "com.omgitzmods.backlogApp";

  if (buildEnv === "preview") {
    name = "Armory Preview";
    packageName = "com.omgitzmods.backlogApp.preview";
  } else if (buildEnv === "dev") {
    name = "Armory Dev";
    packageName = "com.omgitzmods.backlogApp.dev";
  }

  return {
    name,
    slug,
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "backlogapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    updates: {
      enabled: true,
      checkAutomatically: "ON_LOAD",
      fallbackToCacheTimeout: 0,
    },
    ios: {
      ...config.ios,
      supportsTablet: true,
      bundleIdentifier: packageName,
    },
    notification: {
      icon: "./assets/images/android-icon-foreground.png",
      color: "#b7202dff",
    },
    android: {
      ...config.android,
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: packageName,
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      buildProfile: process.env.BUILD_ENV || "development",
      eas: {
        projectId: "a5aef43d-7b8c-429d-acaf-a0e527acf4b7",
      },
    },
  };
};
