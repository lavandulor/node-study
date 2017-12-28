/**
 * Created by hjw on 2017/12/27.
 */
var http = require('http');

/**
 *
 * @param request 请求
 * @param response 响应
 */
function serve(request,response) {
    console.log(request.method); // 请求里的方法
    console.log(request.url); // 请求里的url地址
    console.log(request.headers); //  获取请求头

    response.statusCode = 404; // 设置响应码
    response.setHeader('Content-Type','text/html;charset=utf-8'); // 设置响应类型 utf-8
    response.setHeader('name','hjw'); // 设置响应头
    response.write(new Date().toString()); // 写响应体
    response.end();
}
// 每当有请求来的时候调用serve函数对客户端进行处理
var server = http.createServer(serve);

server.listen(8080, 'localhost');