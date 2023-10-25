const http = require('http');
const fs = require('fs');
const { numArr } = require('./people')
const _ = require('lodash');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')
    fs.readFile('./files/index.html', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.write(data);
            res.write('<h1>test</h1>');
            res.write(`${_.random(0, 16)}`)
            res.end();
        }
    })
    const test = _.once(() => {console.log('test')});
    test()
});

server.listen(8080, '', () => {
    console.log('listenting for requests on port 8080');
    console.log(_.chunk(numArr, 3))
});