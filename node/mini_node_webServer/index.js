const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const qs = require('querystring');

// 统一处理路由错误异常
const notFound = (req, res) => {
    fs.readFile(path.join(__dirname, '404.html'), (err, data) => {
        if (err) {
            res.write(404, 'not found')
        } else {
            res.writeHead(404, {'Content-Type': "text/html;charset='utf-8'"})
            res.write(data);
            res.end();
        }
    })
}
// 模拟数据库
const writeDb = (chunk)=>{
    fs.appendFile(path.join(__dirname, 'db'), chunk, err => {
        if(err) throw err;
        console.log('db insert ', chunk && chunk.toString())
    })
}

http.createServer((req, res) => {

// http动词处理
    let pathName = url.parse(req.url).pathname;

    if (pathName.startsWith('/api')) {
        const method = req.method;
        if (method === 'GET') {
            const query = qs.parse(url.parse(req.url).query) // ?a=1&b=2 => {}
            const resData = {
                code: 200,
                msg: 'success',
                data: query
            }
            res.end(JSON.stringify(resData));
            return;
        }
        if (method === 'POST') {
            const contentType = req.headers['content-type'];
            if(contentType === 'application/json'){
                let postData = '';
                req.on('data', chunk => {
                    postData += chunk;
                    writeDb(chunk);
                })
                req.on('end', ()=>{
                    res.end(postData);
                })
            }
        }
    }
// 路由处理
    if (pathName === '/') {
        pathName = path.join(__dirname, 'index.html');
    }

    const extName = path.extname(pathName);

    if (extName === '.html') {
        fs.readFile(pathName, (err, data) => {
            if (err) {
                notFound(req, res);
            } else {
                res.writeHead(200, {'Content-Type': "text/html;charset='utf-8'"})
                res.write(data);
                res.end();
            }
        })
    }

}).listen(8080);
