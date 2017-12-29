/**
 * Created by hjw on 2017/12/29.
 */
var http = require('http');
var fs = require('fs');
var mime = require('mime');
var Url = require('url'); // 对url进行处理，把字符串转成对象

/**
 *
 * @param request 请求
 * @param response 响应
 */
function serve(request, response) {
    // true 表示query转成对象
    var urlObj = Url.parse(request.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        response.setHeader('Content-Type', 'text/html;charset=utf-8'); // 设置响应类型，编码为utf-8
        // 读取文件内容并且将读到的内容写入响应体
        fs.readFile('index.html', function (err, data) {
            response.write(data); // 写响应体
            response.end();
        });
    } else if (pathname == '/clock') {
        var counter = 0;
        var int = setInterval(function () {
            response.write(new Date().toString());
            counter++;
            if (counter == 5) {
                clearInterval(int);
                response.end();
            }
        }, 1000)
    } else {
        staticForUrl(pathname, response)
    }
}

function staticForUrl(pathname, response) {
    response.setHeader('Content-Type', mime.getType(pathname) + ';charset=utf-8'); // 设置响应类型，编码为utf-8
    // 读取文件内容并且将读到的内容写入响应体
    fs.readFile(pathname.slice(1), function (err, data) {
        response.write(data); // 写响应体
        response.end();
    });
}

// 每当有请求来的时候调用serve函数对客户端进行处理
var server = http.createServer(serve);

server.listen(8080, 'localhost');