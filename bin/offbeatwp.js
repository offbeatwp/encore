#!/usr/bin/env node
const exec = require('child_process').exec;
const srcDirectory = `${__dirname}/../src`;

const task = process.argv.slice(2)[0];

const tasks = {
    dev() {
        this.exec(`yarn encore dev-server --port 3001 --color`);
    },
    production() {
        this.exec(`yarn encore production --color`);
    },
    icons() {
        this.exec(`node ${srcDirectory}/run icons --color`);
    },
    exec(cmd) {
        const execCommand = exec(cmd);

        execCommand.stdout.on('data', (data) => {
          console.log(data.toString().trim());
        });

        execCommand.stderr.on('data', (data) => {
          console.log(data.toString().trim());
        });
    }
}

if (typeof task === 'object' && typeof tasks[task] === 'function') {
    tasks[task]();
    return;
}

// No valid task found
console.error('No valid task provided (dev|production|icons)' );