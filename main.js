const nativefier = require("nativefier").default;
const zipper = require("zip-local");

const ZIP_FILE = "build/swamp-camp.zip";

const zip = (path) => {
  try {
    zipper.sync
      .zip(path)
      .compress()
      .save(ZIP_FILE, () =>
        console.log(path + " has been packaged into " + ZIP_FILE)
      );
  } catch (e) {
    // this file doesn't exist — ignore it
  }
};

const nativefierOptions = {
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

nativefier(nativefierOptions, (error, appPath) => {
  if (error) {
    console.error(error);
    return;
  }

  console.log("SWAMP CAMP has been built:", appPath);

  const outputs = [
    "darwin-arm64/SWAMP CAMP.app",
    "darwin-x64/SWAMP CAMP.app",
    "win32-x64/SWAMP CAMP.exe",
  ];

  outputs.map((o) => "build/SWAMP CAMP-" + o).forEach(zip);
});
