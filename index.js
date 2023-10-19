const { json } = require('express');
const fs=require('fs');
const http = require('http');
const data=fs.readFileSync('data.json','utf-8');
const index=fs.readFileSync('index.html','utf-8');
const errorPage=fs.readFileSync('error.html','utf-8');
//make server 
const server= http.createServer((req,res)=>{
    console.log("Server Started...");
    switch(req.url){
        case '/index':
            res.setHeader('Content-Type','text/html')
            res.end(index);
            break;
        case "/data":
            res.setHeader('Content-Type','application/json')
            res.end(data);
            break;
        default:
            res.setHeader('Content-Type','text/html')
            res.end(errorPage);
            break;
            // res.writeHead(404,'')
            // res.end();

    }
});
server.listen(8080);
