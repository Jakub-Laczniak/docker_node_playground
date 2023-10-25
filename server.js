const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')
    console.log(req)
    fs.readFile('./files/index.html', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.write(data);
            res.write(`<h1>${req.url}</h1>`)
            res.end();
        }
    })
});

server.listen(8080, 'localhost', () => {
    console.log('listenting for requests on port 8080')
});