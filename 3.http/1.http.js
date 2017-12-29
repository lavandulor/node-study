/**
 * Created by hjw on 2017/12/27.
 */
var http = require('http');
var fs = require('fs');

/**
 *
 * @param request 请求
 * @param response 响应
 */
function serve(request, response) {
    // 请求里的方法
    console.log(request.method,request.url); // 请求里的url地址
    // console.log(request.headers); //  获取请求头

    response.statusCode = 200; // 设置响应码
    response.setHeader('Content-Type', 'text/html;charset=utf-8'); // 设置响应类型 utf-8
    response.setHeader('name', 'hjw'); // 设置响应头
    // 读取文件内容并且将读到的内容写入响应体
    fs.readFile('index.html', function (err, data) {
        response.write(data); // 写响应体
        response.end();
    });
}

// 每当有请求来的时候调用serve函数对客户端进行处理
var server = http.createServer(serve);

server.listen(8080, 'localhost');