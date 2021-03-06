// 引入http模块
var http = require("http");
// 引入url模块
var url = require("url");
// 引入fs
var fs = require("fs");
// 定义MIMEType对象
var MT = {
  "html": "text/html",
  "css": "text/css",
  "js": "text/javascript",
  "txt": "text/plain",
  "jpg": "image/jpeg",
  "png": "image/png",
  "svg": "image/svg+xml"
}

// 搭建服务器
var server = http.createServer(function (req, res) {
  // 书写静态服务器功能
  // 获取前端的url
  var urlStr = req.url;
  // 解析成对象
  var obj = url.parse(urlStr, true);
  // 获取请求方式
  var method = req.method.toLowerCase();
  // 获取pathname
  var pathname = decodeURIComponent(obj.pathname);
  // 匹配检测用户名接口
  if (pathname === "/checkname" && method === "get") {
    // 获取参数
    var query = obj.query
    // 获取用户名
    var username = query.username;
    // do something ...
    // 定义json对象
    var json = {
      error: 0,
      data: "请求已收到"
    }
    // 转换json对象成为字符串
    res.end(JSON.stringify(json))
    return;
  }

  // 强行读取
  fs.readFile("./" + pathname, function (err, data) {
    // 如果读取不到 返回没有的信息
    if (err) {
      // 防止乱码
      res.setHeader("content-type", "text/plain;charset=utf-8");
      res.end("抱歉，您读取的文件:" + pathname + "不存在");
      return;
    }
    // 获取后缀名
    var extName = pathname.split(".").pop();
    res.setHeader("content-type", MT[extName] + ";charset=utf-8");
    res.end(data);
  })
});

// 监听端口号
server.listen(3000);
console.log('http server listen 3000');
