const { json } = require('express');
const fs=require('fs');
const http = require('http');
const data=JSON.parse(fs.readFileSync('data.json','utf-8'));
const index=fs.readFileSync('index.html','utf-8');
const errorPage=fs.readFileSync('error.html','utf-8');

//make server 
const server= http.createServer((req,res)=>{
    console.log("Server Started...");
    if(req.url.startsWith('/product')){
        let id=req.url.split("/")[2];
        const movData=data[++id]
        res.setHeader('Content-Type','text/html')
        let productIndex=index.replace('**title**',movData.title)
        .replace('**images**',movData.thumbnail)
        .replace('**brand**',movData.brand)
        .replace('**price**',movData.price);
        res.end(productIndex);
        return;
        //console.log(movData);
    }
    switch(req.url){
        case '/index':
            res.setHeader('Content-Type','text/html')
            let modifiedindex= index.replace('**title**',data[0].title)
            .replace('**images**',data[0].thumbnail)
            .replace('**brand**',data[0].brand)
            .replace('**price**',data[0].price);
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
