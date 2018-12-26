var fs = require('fs');
var path = require('path');

//解析需要删除的文件夹
var filePath = path.resolve('./vue_fz');

//调用文件删除方法
dealFile(filePath);

function dealFile(filePath) {
  //根据文件路径读取文件，返回文件列表
  var filesArr = fs.readdirSync(filePath);
  //遍历读取到的文件列表
  filesArr.forEach(function (filename) {
    //获取当前文件的绝对路径
    var filedir = path.join(filePath, filename);
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    var stats = fs.statSync(filedir);
    var isFile = stats.isFile(); //是文件
    var isDir = stats.isDirectory(); //是文件夹
    if (isFile) {
      fs.unlinkSync(filedir);
    } else if (isDir) {
      dealFile(filedir); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  });
  // 最后 把当前的文件夹删除，该API只能移除空目录
  fs.rmdirSync(filePath);
}
