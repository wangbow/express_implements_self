const http = require('http');
const url = require('url');
const path = require('path');
const Router = require('./router');

const Application = function () {
    this._router = new Router();
}


Application.prototype.get = function (path, ...handlers) {
    this._router.get(path, handlers);
}

Application.prototype.listen = function (port) {

    const server = http.createServer((req, res) => {
        const out = function () {
            res.end(`not find ${req.url} ${req.method}`);
        }

        this._router.handler(req, res, out)
    });

    server.listen(port);
}

module.exports = Application;