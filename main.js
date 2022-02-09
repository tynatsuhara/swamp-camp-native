const promisify = require("util").promisify;
const nativefier = promisify(require("nativefier").default);
const fs = require("fs");
const archiver = require("archiver");
const process = require("process");

const zip = (platform) => {
  const builtDirectory = `build/SWAMP CAMP-${platform}`;
  const output = fs.createWriteStream(
    `${__dirname}/build/swamp-camp-${platform}.zip`
  );
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level
  });
  archive.directory(builtDirectory, false);
  archive.pipe(output);
  archive.finalize();
};

const options = {
  name: "SWAMP CAMP",
  targetUrl: "https://swamp.camp?native_app=true",
  out: "build/",
  overwrite: true,
  icon: process.platform === "win32" ? "icon.ico" : "icon.png",
  width: 1280,
  height: 800,
  showMenuBar: false,
  fastQuit: false,
  maximize: true,
};

nativefier(options).then(() => zip(`${process.platform}-${process.arch}`));
