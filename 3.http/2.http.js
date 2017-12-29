/**
 * Created by hjw on 2017/12/27.
 */
var http = require('http');
var fs = require('fs');
var mime = require('mime');

/**
 *
 * @param request 请求
 * @param response 响应
 */
function serve(request, response) {
    var url = request.url;
    if (url == '/') {
        response.setHeader('Content-Type', 'text/html;charset=utf-8'); // 设置响应类型，编码为utf-8
        // 读取文件内容并且将读到的内容写入响应体
        fs.readFile('index.html', function (err, data) {
            response.write(data); // 写响应体
            response.end();
        });
    } else {
        staticForUrl(url, response)
    }
}

function staticForUrl(url, response) {
    console.log(mime.getType(url));
    response.setHeader('Content-Type', mime.getType(url) + ';charset=utf-8'); // 设置响应类型，编码为utf-8
    // 读取文件内容并且将读到的内容写入响应体
    fs.readFile(url.slice(1), function (err, data) {
        response.write(data); // 写响应体
        response.end();
    });
}

// 每当有请求来的时候调用serve函数对客户端进行处理
var server = http.createServer(serve);

server.listen(8080, 'localhost');