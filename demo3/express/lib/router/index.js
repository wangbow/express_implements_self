const url = require('url');
const Route = require('./route');
const Layer = require('./layer');

const Router = function () {
    this.stack = []
}

Router.prototype.route = function (path) {
    let route = new Route();
    let layer = new Layer(path,route.dispath.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
}

Router.prototype.get = function (path, handlers) {
    let route = this.route(path);
    route.get(handlers);
}

Router.prototype.handler = function (req, res, out) {
   let {pathname} = url.parse(req.url);
   let idx = 0;
   let dispath = ()=> {
    if(idx === this.stack.length){
        return out();
    }
    let layer = this.stack[idx++];
    if(layer.math(pathname)){
        layer.request_handler(req,res,dispath);
    }else{
        dispath()
    }
   }

   dispath();

}

module.exports = Router;