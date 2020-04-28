function Layer(path,handler){
    this.path = path;
    this.handler = handler;
}

Layer.prototype.math = function(pathname){
    return this.path === pathname;
}

Layer.prototype.request_handler = function(req,res,dispath){
    this.handler(req,res,dispath)
}

module.exports = Layer;