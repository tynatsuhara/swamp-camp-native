const promisify = require("util").promisify;
const nativefier = promisify(require("nativefier").default);
const fs = require("fs");
const archiver = require("archiver");
const process = require("process");

const zip = (platform) => {
  try {
    const builtDirectory = "build/SWAMP CAMP-" + platform;
    const output = fs.createWriteStream(
      __dirname + "/build/swamp-camp-" + platform + ".zip"
    );
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });
    archive.directory(builtDirectory, false);
    archive.pipe(output);
    archive.finalize();
  } catch (e) {
    // this file doesn't exist — ignore it
  }
};

const defaultNativefierOptions = {
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

/**
 * Don't bother with darwin-arm64 for several reasons:
 *   - no github actions support https://github.com/actions/runner/issues/805
 *   - apple makes it annoyingly difficult to run unsigned code
 *   - chrome performance is really good already
 */
const macM1Options = {
  ...defaultNativefierOptions,
  arch: "arm64",
};

const macIntelOptions = {
  ...defaultNativefierOptions,
  arch: "x64",
};

const windowsOptions = {
  ...defaultNativefierOptions,
  icon: "icon.ico",
};

const builds = [];
const archives = [];

if (process.platform === "darwin") {
  builds.push(nativefier(macIntelOptions));
  archives.push("darwin-x64");
} else if (process.platform === "win32") {
  builds.push(nativefier(windowsOptions));
  archives.push("win32-x64");
} else {
  throw new Error("unsupported platform");
}

Promise.all(builds).then(() => archives.forEach(zip));
