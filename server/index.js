const {login} = require("./supa");

const express = require('express');
const app = express();

app.get('/', (rreq, res) => {
    res.send('test');
});

const port = 8080;

login().then(() => {
    console.log("asd")
});

app.listen(port, () => {
    console.log(`Server running in ${port}`);
});
