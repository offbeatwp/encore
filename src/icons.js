var fantasticon = require('fantasticon');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

function ensureDirectoryExistence(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }

    const parentDirName = path.dirname(dirname);
    ensureDirectoryExistence(parentDirName);

    fs.mkdirSync(dirname);
    return true;
}

module.exports = function () {
    const baseDirectory = process.cwd();

    const outputDirectory = path.resolve(baseDirectory, 'assets/fonts/icons');
    ensureDirectoryExistence(outputDirectory);

    const inputDirectory = path.resolve(baseDirectory, 'assets/icons/');

    fantasticon.generateFonts({
        name: 'oif',
        inputDir: inputDirectory, // (required)
        outputDir: outputDirectory, // (required)
        fontTypes: [fantasticon.FontAssetType.EOT, fantasticon.FontAssetType.WOFF2, fantasticon.FontAssetType.WOFF],
        assetTypes: [
            fantasticon.OtherAssetType.CSS,
            fantasticon.OtherAssetType.SCSS,
            fantasticon.OtherAssetType.HTML,
        ],
        formatOptions: { json: { indent: 4 } },
        templates: {},
        pathOptions: {},
        codepoints: {},
        fontHeight: 300,
        round: undefined, // --
        descent: undefined, // Will use `svgicons2svgfont` defaults
        normalize: true, // --
        selector: '.oif',
        tag: 'i',
        prefix: 'oif',
        // fontsUrl: null
      }).then(results => console.log(results));
    
};
