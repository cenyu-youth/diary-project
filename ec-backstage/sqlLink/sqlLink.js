//导入sequelize模块
const Sequelize = require('sequelize');

let mySqlOptions = {
    database:'ec',

    host:'localhost',

    user:'root',

    password:'Admin123456.cc',

    dialect:'mysql',

    pool:{
        max:10,

        min:0,

        idel:10000
    }

};

//导出sequelize连接数据库实例
module.exports = new Sequelize(

  //数据库名称
  mySqlOptions.database,

  //数据库用户名
  mySqlOptions.user,

  //数据库密码
  mySqlOptions.password,

  {
    //数据库地址
    host: mySqlOptions.host,

    //连接数据库类型
    dialect: mySqlOptions.dialect,

    //数据库连接池
    pool: mySqlOptions.pool,

    //时区，东八区，北京时区
    timezone: '+08:00',

    //大小写字母的字段名称以_分隔命名，默认是驼峰命名风格
    defined: {
      underscored: true
    }
});