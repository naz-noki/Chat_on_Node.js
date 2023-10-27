const path = require('node:path');

const createPath = (fileName:string, ...dirList:string[]):string => {
    return path.resolve(__dirname, '..', ...dirList, fileName);
};

module.exports = createPath;