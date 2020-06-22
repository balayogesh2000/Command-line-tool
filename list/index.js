#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');
// METHOD 1

// fs.readdir(process.cwd(), (err, filenames) => {
//     if (err) {
//         console.log(err);
//     }

//     const allStats = Array(filenames.length).fill(null);

//     for (let filename of filenames) {
//         const index = filenames.indexOf(filename);
//         fs.lstat(filename, (err, stats) => {
//             if (err) {
//                 console.log(err);
//             }
//             allStats[index] = stats;

//             const ready = allStats.every((stats) => {
//                 return stats;
//             })

//             if (ready) {
//                 allStats.forEach((stats, index) => {
//                     console.log(filenames[index], stats.isFile());
//                 })
//             }
//         });
//     }
// });

// METHOD 2
//method 1 for lstat
// const lstat = util.promisify(fs.lstat);

//method3 for lstat
// const lstat = fs.promises.lstat;
// const {lstat} = fs.promises;

// fs.readdir(process.cwd(), async (err, filenames) => {
//     if (err) {
//         console.log(err);
//     }

//     for (let filename of filenames) {
//         try{
//             const stat = await lstat(filename);
//             console.log(filename, stat.isFile());
//         } catch (err) {
//             console.log(err);
//         }
//     }
// });

//method 2 for lstat
// const lstat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filenames, (err, stat) => {
//             if (err) {
//                 reject(err);
//             }
//             resolve(stat);
//         });
//     });
// };

const {lstat} = fs.promises;

const targetDir = process.argv[2] || process.cwd();
fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        console.log(err);
    }
    const statPromises = filenames.map((filename) => {
        return lstat(path.join(targetDir,filename));
    });
    const allStats = await Promise.all(statPromises);
    for (let stats of allStats) {
        const index = allStats.indexOf(stats);
        if (stats.isFile()) {
            console.log(filenames[index]);
        } else {
            console.log(chalk.bold(filenames[index]));
        }
    }
});
