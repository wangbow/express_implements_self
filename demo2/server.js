const express = require('./express/lib/express');
const app = express();

app.get('/',(req,res)=>{
    res.end('logon');
})

app.get('/hello',(req,res)=>{
    res.end('hello');
})

app.get('/end',(req,res)=>{
    res.end('end');
})

app.listen(8080);
