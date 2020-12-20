

//导入路由控制器层
let routeController = require(__basename + '/route/route_controller.js');


module.exports = app => {

    //use 数据拦截
    app.use(routeController.vliad);


    //post响应登录接口
    app.post('/login',routeController.login);

    //注册接口
    app.post('/register',routeController.register);

}