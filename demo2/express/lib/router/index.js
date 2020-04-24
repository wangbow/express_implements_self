const url = require('url');

const Router = function () {
    this.stack = []
}

Router.prototype.get = function (path, handler) {
    this.stack.push({
        path,
        method: 'get',
        handler
    })
}

Router.prototype.handler = function (req, res, out) {
    const { pathname } = url.parse(req.url);
    const methodName = req.method.toLowerCase();
    for (let i = 0; i < this.stack.length; i++) {
        const { path, method, handler } = this.stack[i];
        if (path === pathname && method === methodName) {
            return handler(req, res);
        }
    }

    out();

}

module.exports = Router;