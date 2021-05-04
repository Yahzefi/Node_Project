const http = require('http');
const path = require('path');
const fs = require('fs');

const SERVER = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'client', 
    req.url === '/' ? 'index.html' 
    : req.url === '/favicon.ico' ? 'favicon.ico' 
    : req.url)
    fs.readFile(filePath, (err, content) => {
        if(err) throw err;
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content, 'utf8');
    })
})

// const PORT = process.env.PORT || 5000;

SERVER.listen(5000, () => console.log('Server is running...'));

function changeFilePath(currentDir, newDir) {
    console.log("Hello");
}

module.exports = changeFilePath(); // can I even use a function as a module export?
