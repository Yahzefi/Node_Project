const http = require('http');
const path = require('path');
const fs = require('fs');

const SERVER = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'client', req.url === '/' ? 'index.html' : req.url + '.html')
    fs.readFile(filePath, (err, content) => {
        if(req.url === '/favicon.ico'){
            return;
        }
        if(err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content, 'utf8');
    })
})

// const PORT = process.env.PORT || 5000;

SERVER.listen(5001, () => console.log('Server is running...'));
