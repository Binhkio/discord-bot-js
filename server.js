const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send("OK");
});

app.get('/keep-alive', (req, res) => {
    res.send("Bot still alive");
});

function keepAlive() {
    app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
    });
}

module.exports = {
    keepAlive
};