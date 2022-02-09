const nativefier = require("nativefier").default;
const fs = require("fs");
const archiver = require("archiver");

const ZIP_FILE = "/build/swamp-camp.zip";

const zip = (directory) => {
  try {
    const output = fs.createWriteStream(__dirname + ZIP_FILE);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });
    archive.directory(directory, false);
    archive.pipe(output);
    archive.finalize();
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

  const outputs = ["darwin-arm64", "darwin-x64", "win32-x64"];

  outputs.map((o) => "build/SWAMP CAMP-" + o).forEach(zip);
});
