const express = require('express');
const { addSingleAudio } = require('./service/extension');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Bot still alive");
});

app.post('/bot/add/single', addSingleAudio);
app.post('/bot/add/multiple', addSingleAudio);

function keepAlive() {
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
}

module.exports = {
    keepAlive
};