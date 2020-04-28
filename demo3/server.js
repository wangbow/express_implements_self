const express = require('./express/lib/express');
const app = express();

app.get('/', (req, res, next) => {
    console.log(222);
    next();
}, (req, res, next) => {
    console.log(2);
    next();
}, (req, res, next) => {
    console.log(3);
});

app.get("/a", (req, res) => {
    res.end("ok");
})

app.listen(9999);
