const Sequelize = require('sequelize');

//定义模型，类似创建表结构
let Model = Sequelize.Model;

//定义一个商家user数据表结构
class User extends Model {}

User.init(
    {
        id:{
          //字段类型INTEGER整型，UNSIGNED无符号
          type: Sequelize.INTEGER.UNSIGNED,

          //主键
          primaryKey: true,

          //重定义字段名称
          field: 'id',

          //自动递增
          autoIncrement: true,

          //不能为null
          allowNull: false,

          //注释
          comment: '主键'
        },
        username:{
            type:Sequelize.STRING(20),
            field:"username",
            allowNull: false,
            defaultValue:'',
            comment:'用户账号/昵称'
        },
        phone:{
            type:Sequelize.CHAR(11),
            field:'phone',
            allowNull:false,
            comment:'用户手机号码'
        },
        pwd:{
            type:Sequelize.STRING(32),
            field:'pwd',
            allowNull:false,
            comment:'用户登录密码'
        },
        loginCount: {
          type: Sequelize.INTEGER,
          field: 'loginCount',
          allowNull: false,
          defaultValue: 0,
          comment: '登录次数'
        },
        userId: {
            type: Sequelize.STRING(18),
            allowNull: false,
            defaultValue: '',
            comment: '用户唯一id'
        },
        userToken:{
            type: Sequelize.STRING,
            allowNull: true,
            defaultValue: '',
            comment: '用户token'
        }
    },{
        //模型名称
        modelName: 'user',

        //自定义表名
        tableName: 'user',

        //多个单词组合字段以_分隔命名
        underscored: true,

        //是否需要增加createdAt、updatedAt、deletedAt字段
        timestamps: true,

        //重命名createdAt
        createdAt: 'create_time',

        updatedAt: 'update_time',

        //同时需要设置paranoid为true（此种偏执模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
        'paranoid': true,

        //数据表引擎，默认InnoDB
        // engine: 'MYISAM'

        //连接实例
        sequelize
    }
)

User.sync({force:false})

module.exports = User