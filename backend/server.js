const http = require("http");

const server = http.createServer((req, res)=>{
    console.log(req.url)
    res.writeHead(200, { "Content-Type": "text/plain"});
    res.end("Hello from pure Node.js server");
});

server.listen(3000, ()=>{
    console.log("server running on port 3000");
})
