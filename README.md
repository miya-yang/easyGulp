# easyGulp
Some setting about gulp
v 0.0.1

## 如何使用

(使用前以默认安装node.js/npm)
下载当前项目，并在当前项目中使用
```
$ npm install
```

待下载完成，在命令行中输入
```
$ gulp
```

即可开始使用！

## 目录说明

JS文件请写入src/js目录下
图片文件请放置在src/img目录下
SCSS文件会自动编译src/scss/main.scss文件，若习惯多文件编辑，请在main.scss文件中通过@import进行引入

## Gulp配置特点

+ 图片自动压缩
+ SCSS自动编译CSS
+ 支持ES6语法，支持自动编译
+ JS、SCSS编辑实时显示效果