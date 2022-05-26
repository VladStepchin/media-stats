// cсформувати масив папок
// в циклі заходити в кожну папку
// писати з кожної папки стати для кожного файлу

const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, "app/media/images");


function getFolderNames() {
    fs.readdir(directoryPath, (err, files) => {
        if (err)
            console.log(err);
        else {
            files.forEach(file => {
                getSubFolderNames(file)
            })
        }
    })
}

function getSubFolderNames(file) {
    fs.readdir(directoryPath + "/" + file, (err, files) => {
        if (err) console.log(err);
        else {
            files.forEach((item) => {
                getStats(file, item)
            })
        }
    })
}

function getStats(file, item) {
    fs.stat(directoryPath + "/" + file + "/" + item, (err, stats) => {
        if (err) {
            console.log(`File doesn't exist.`);
        } else {
            let sizeInKB = stats.size / 1000;
            if (sizeInKB > 1000)
                console.log("\x1b[31m%s\x1b[0m", `Filename: ${file + "/" + item.toUpperCase()}: ${sizeInKB}Kb`);
            else if (sizeInKB > 500)
                console.log("\x1b[43m%s\x1b[0m", `Filename: ${file + "/" + item.toUpperCase()}: ${sizeInKB}Kb`);
            else
                console.log(`Filename: ${file + "/" + item.toUpperCase()}: ${sizeInKB}Kb`);
        }
    });
}

getFolderNames()
