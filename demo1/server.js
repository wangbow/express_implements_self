const express = require('./express_self/lib'); //引入自己写的express
const app = express();

app.get('/',(req,res)=>{
    res.end('hhhh');
})

app.get('/hello',(req,res)=>{
    res.end('hello');
})


app.listen(4000);