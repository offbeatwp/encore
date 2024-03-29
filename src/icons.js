const webfontsGenerator = require('webfonts-generator');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

function getPaths(globs) {
    let out = [];

    globs.forEach(str => out = out.concat(glob.sync(str)));

    return out;
}

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

    const files = getPaths([path.resolve(baseDirectory, 'assets/icons/*.svg')]);
    const fontName = 'oif';
    
    webfontsGenerator({
        files:          files,
        dest:           outputDirectory,
        cssDest:        path.join(outputDirectory, '_' + fontName + '.scss'),
        html:           false,
        cssTemplate:    path.resolve(__dirname, '../config/icons-css.hbs'),
        cssFontsUrl:   '',
        fontName:       fontName,
        templateOptions: {
            classPrefix:    fontName + '-',
        }
    }, function(error) {
        if (error) {
            console.error('Fail!', error);
        } else {
            console.log('Done!');
        }
    });

    webfontsGenerator({
        files:          files,
        dest:           outputDirectory,
        cssDest:        path.join(outputDirectory, '_' + fontName + '_mixins.scss'),
        html:           false,
        cssTemplate:    path.resolve(__dirname, '../config/icons-css-mixins.hbs'),
        cssFontsUrl:   '',
        fontName:       fontName,
        writeFiles:     false,
        templateOptions: {
            classPrefix:    fontName + '-',
        }
    }, function(error, results) {
        if (error) {
            console.error('Fail (mixins!', error);
        } else {
            // Save mixins scss file
            const css = results.generateCss();

            fs.writeFileSync(path.join(outputDirectory, '_' + fontName + '_mixins.scss'), css);
            console.log('Done (mixins)!');

            // Generate icons json and save
            let matches = [...css.matchAll(/@mixin oif-([^ ]+) {.+?content: "([^"]+)"/gms)];
            const json = {};

            for (const match of matches) {
                json[match[1]] = {
                    id: match[1], 
                    char: `${match[2]}`
                };
            }

            fs.writeFileSync(path.join(outputDirectory, fontName + '.json'), JSON.stringify(json, null, "\t"));

            console.log('Done (json)!');

        }
    });
    
};
