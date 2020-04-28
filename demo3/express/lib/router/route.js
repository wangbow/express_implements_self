const Layer = require('./layer');

function Route() {
    this.stack = [];
}

Route.prototype.dispath = function (req, res, out) {
    let idx = 0;
    let method = req.method.toLowerCase();
    let dispath = () => {
        if (idx === this.stack.length) {
            return out();
        }
        let layer = this.stack[idx++];
        if (layer.method === method) {
            layer.request_handler(req, res, dispath);
        } else {
            dispath();
        }
    }

    dispath();

}

Route.prototype.get = function (handlers) {
    handlers.forEach(handler => {
        let layer = new Layer('/', handler);
        layer.method = 'get';
        this.stack.push(layer);
    });
}



module.exports = Route;