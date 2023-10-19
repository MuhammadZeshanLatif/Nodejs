const { json } = require('express');
const fs=require('fs');
const http = require('http');
const data=JSON.parse(fs.readFileSync('data.json','utf-8'));
const index=fs.readFileSync('index.html','utf-8');
const errorPage=fs.readFileSync('error.html','utf-8');
let movieData=data[0];

//make server 
const server= http.createServer((req,res)=>{
    console.log("Server Started...");
    switch(req.url){
        case '/index':
            res.setHeader('Content-Type','text/html')
            let modifiedindex= index.replace('**title**',movieData.movie).replace('**images**',movieData.image);
            res.end(modifiedindex);
        case "/data":
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify(data));
            break;    
        default:
            res.setHeader('Content-Type','text/html')
            res.end(errorPage);
            break;

    }
});
server.listen(8080);
