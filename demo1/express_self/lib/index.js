const http = require('http');
const url = require('url');
const path = require('path');


const createApplication = () => {
    //路径都不匹配的时候，指定一个404页面
    const router = [
        {
            path: '*',
            method: '*',
            handler: (req, res) => {
                res.end(`404 can't find ${req.url} / ${req.method}`);
            }
        }
    ]

    //返回一个对象，每次调用get方法，用来吧请求放入路由的数组中
    //listen 方法 用来通过http创建一个server，用来进行接口方法，地址的比较
    return {
        get: (path, handler) => {
            router.push({
                path,
                method: 'get',
                handler
            })
        },
        listen: (port) => {
            let servers = http.createServer((req, res) => {
                const { pathname } = url.parse(req.url);
                const methodName = req.method.toLowerCase();

                for (let i = 1; i < router.length; i++) {
                    const { path, method, handler } = router[i];
                    if (path === pathname && method === methodName) {
                        console.log('aa')
                        return handler(req, res);
                    }
                }

                console.log('bb')
                return router[0].handler(req, res);
            })

            servers.listen(port);
        }

       
    }
}

module.exports = createApplication;