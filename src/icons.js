const fantasticon = require('fantasticon');
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

module.exports = () => {
    const baseDirectory = process.cwd();

    const outputDirectory = path.resolve(baseDirectory, 'assets/fonts/icons');
    ensureDirectoryExistence(outputDirectory);

    let inputDirectory = path.resolve(baseDirectory, 'assets/icons/');
    if (fs.existsSync(`${inputDirectory}/font`)) {
        inputDirectory = `${inputDirectory}/font`;
    }
    
    fantasticon.generateFonts({
        name: 'oif',
        inputDir: inputDirectory, // (required)
        outputDir: outputDirectory, // (required)
        fontTypes: [fantasticon.FontAssetType.EOT, fantasticon.FontAssetType.WOFF2, fantasticon.FontAssetType.WOFF],
        assetTypes: [
            fantasticon.OtherAssetType.CSS,
            fantasticon.OtherAssetType.SCSS
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
      }).then(results => console.log('Done'));

    fantasticon.generateFonts({
        name: 'oif',
        inputDir: inputDirectory, // (required)
        outputDir: outputDirectory, // (required)
        fontTypes: [],
        assetTypes: [
            fantasticon.OtherAssetType.SCSS,
        ],
        formatOptions: { json: { indent: 4 } },
        templates: {
            scss: path.resolve(__dirname, '../config/icons-mixin.hbs')
        },
        pathOptions: {
            scss: `${outputDirectory}/oif_mixins.scss`
        },
        codepoints: {},
        fontHeight: 300,
        round: undefined, // --
        descent: undefined, // Will use `svgicons2svgfont` defaults
        normalize: true, // --
        selector: '.oif',
        tag: 'i',
        prefix: 'oif',
        // fontsUrl: null
      }).then(results => console.log('Done (mixins scss)'));
    
};
