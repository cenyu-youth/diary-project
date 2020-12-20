
    //基于index.js设置基础路径
    global.__basename = __dirname;

    let express = require("express");

    //导入加密模块
    global.crypto = require('crypto');

    let app =express();

    //token 验证拦截
    global.jwt = require('jsonwebtoken');

    //连接数据库
    global.sequelize = require(__basename + '/sqlLink/sqlLink.js');

    global.model = require(__basename + '/db/model.js');

    global.utils = require(__basename + '/utils/utils.js')

    global.config = require(__basename + '/config/config.js')

    //POST请求体解析
    global.bodyParser = require('body-parser')

    let route = require(__basename + '/route/route.js')


    app.use(bodyParser.json({limit:'2048kb'}));  //限制POST请求最大体积为2048kb,并解析为JSON

    app.use(bodyParser.urlencoded({ //extended：false接收任何数据格式, true接收字符串或者数组
        extended: false,
        limit: '2048kb'
    }))




    //设置服务器静态文件夹
    app.use(express.static(__basename + '/assets'));


    //配置CORS 跨域解决

    app.all('*',(req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");  //所有可通过
        // res.header("Access-Control-Allow-Origin", "http://www.kangliuyong.com:10000") //只允许http://www.kangliuyong.com:10000 通过

        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //服务器支持的所有跨域请求的方法

        res.header("Access-control-Allow-Credentials",true)   //允许cookie 可以包含在跨域中

        res.header('Access-Control-Allow-Headers',"Authorization")   //允许自定义请求头进入

        next()
    })

    route(app)

    app.use((req, res) => {
        res.status = 404;
        res.send('找不到资源')
    })

    app.use((err, req, res) => {
        if(err){
            res.status = 500
            res.send('服务器程序出错')
        }
    })


    app.listen(8000,() => {

        console.info('Ec服务器启动了.................http://192.168.43.10:8000/')

    })
