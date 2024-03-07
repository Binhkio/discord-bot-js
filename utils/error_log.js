const fs = require('node:fs');
const { calcTime } = require('./time');

const handleCreateLogFolder = () => {
    if (!fs.existsSync("log")){
        fs.mkdirSync("log");
    }
}

const handleDeleteLogs = (num) => {
    const filenames = fs.readdirSync("log");
    if (filenames.length > num) {
        filenames.slice(0, filenames.length - num).forEach((filename) => {
            fs.rmSync(`log/${filename}`);
        })
    }
}

const handleLogError = (error) => {
    const time = calcTime().toString();
    fs.writeFile(`log/${time}.json`, `${error}`, () => {
        handleDeleteLogs(10);
    });
}

const handleGetLog = () => {
    const filenames = fs.readdirSync("log");
    const logs = filenames.map((filename) => {
        const data = fs.readFileSync(`log/${filename}`, { encoding: 'utf8', flag: 'r' });
        const realtime = new Date(Number(filename.split(".")[0])).toLocaleString();
        return {
            time: realtime,
            content: data,
        }
    })
    return logs;
}

module.exports = {
    handleCreateLogFolder,
    handleDeleteLogs,
    handleGetLog,
    handleLogError,
}