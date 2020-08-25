let fs = require('fs');

getAllFiles('folder')

function getAllFiles(folderName) {
    fs.readdir(folderName, (err, files) => {
        if (err) console.log(err);

        for (let file of files) {
            fs.stat(folderName + '/' + file, (err, stats) => {
                if (err) console.log(err);

                if (!stats.isDirectory()) {
                    fs.rename(folderName + '/' + file, `allFiles/${file}`, err => console.log(err))
                } else {
                    getAllFiles(folderName + '/' + file)
                }
            });
        }
    });
}
