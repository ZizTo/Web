const http = require("http");
const fs = require("fs");
    
http.createServer(function(request, response){
      
    if(request.url == "/home"){
        fs.readFile("home.html", (error, data) => response.end(data));
    }
    else if (request.url == "/products"){
        fs.readFile("products.html", (error, data) => response.end(data));
    }
    else {
        response.end("Hello");
    }
}).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));