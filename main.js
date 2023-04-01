const { buildNativefierApp } = require("nativefier")
const fs = require("fs")
const archiver = require("archiver")
const process = require("process")
const path = require("path")

const zip = (buildDirectory, platformId) => {
    const outputPath = path.join(__dirname, "build", `swamp-camp-${platformId}.zip`)
    const output = fs.createWriteStream(outputPath)
    const archive = archiver("zip", {
        zlib: { level: 9 }, // Sets the compression level
    })
    archive.directory(buildDirectory, false)
    archive.pipe(output)
    archive.finalize()
}

const main = async () => {
    const buildDirectory = await buildNativefierApp({
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
        fullScreen: true,
        internalUrls: ["camp.ty.pizza"],
        disableOldBuildWarning: true,
    })

    zip(buildDirectory, `${process.platform}-${process.arch}`)
}

main()
