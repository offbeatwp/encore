#!/usr/bin/env node
var exec =      require('child_process').exec;

const srcDirectory =    __dirname + '/../src';
const webpackConfig = __dirname + '/../config/webpack.config.js';

const task = process.argv.slice(2)[0];

const tasks = {
    dev() {
        this.exec(`yarn encore server --color`);
    },
    production() {
        this.exec(`yarn encore production --color`);
    },
    icons() {
        this.exec(`node ${srcDirectory}/run icons --color`);
    },
    exec(cmd) {
        const execCommand = exec(cmd);

        execCommand.stdout.on('data', function (data) {
          console.log(data.toString().trim());
        });

        execCommand.stderr.on('data', function (data) {
          console.log(data.toString().trim());
        });
    }
}

if (typeof task !== 'undefined' && typeof tasks[task] === 'function') {
    tasks[task]();
    return;
}

// No valid task found
console.error('No valid task provided (dev|production|icons)' );