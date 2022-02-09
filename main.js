const nativefier = require("nativefier").default;

const options = {
  name: "SWAMP CAMP",
  targetUrl: "https://swamp.camp?native_app=true",
  out: "build/",
  overwrite: true,
  icon: "icon.png",
  width: 1280,
  height: 800,
  showMenuBar: false,
  fastQuit: false,
  maximize: true,
};

nativefier(options, (error, appPath) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log("SWAMP CAMP has been built:", appPath);
});
