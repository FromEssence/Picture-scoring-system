// reference:https://blog.csdn.net/Lai_im/article/details/106964782

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const app = http.createServer();

app.on('request', (req, res) => {

    let pathname = url.parse(req.url).pathname;
    console.log('IP', req.connection.remoteAddress ||req.socket.remoteAddress ||req.connection.socket.remoteAddress)
    
    if(pathname.startsWith('/data'))
        pathname = pathname
    else
        pathname = pathname.endsWith('.png') ? 'imgs/' + pathname : pathname;
    let realPath = path.join('./', pathname);
    // console.log(pathname, "client requets for: "+realPath);
    // console.log('路径切片', pathname.slice(0,12))
    if (pathname.slice(0,13)=='/upload_part2'){
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
          })
        
          req.on('end', () => {
            console.log("post-data:", postData)
            res.end("<html><body>Thank you very much. BiXin~<br><img src='./bixin.jpg'></body></html>");
          })
        
    }
    else if(pathname[1]=='u'){
        console.log("huida:"+req.url)
        res.end("<html><body>Thank you very much. BiXin~<br><img src='./bixin.jpg'></body></html>");
        
    }
    else{
        fs.readFile(realPath, (err, doc) => {
            if (err != null) {
                res.writeHead(404, {
                    'content-type': 'text/html; charset=utf8'
                });
                res.end('404 Not Found');
                return;
            }
            
            res.end(doc);
        });
    }
});

app.listen(3000);
console.log('启动服务器成功');