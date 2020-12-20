let Sequelize = require("sequelize");

//定义模型，类似创建表结构
let Model = Sequelize.Model;

//定义一个商家business数据表结构
class UserLabel extends Model {}

UserLabel.init(
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
        //用户唯一id
        userId: {
          type: Sequelize.STRING(18),
          allowNull: false,
          defaultValue: '',
          comment: '用户唯一id'
        },
        laberContent: {
          type: Sequelize.TEXT,
          allowNull: false,
          //默认值
          defaultValue: '',
          comment: '便签内容'
        },
        //是否已完成，未完成为0，完成为1
        isEnd: {
          type: Sequelize.INTEGER(1),
          allowNull: false,
          defaultValue: 0,
          comment: '是否已完成，未完成为0，完成为1'
        },
    },{
        //模型名称
        modelName: 'userLabel',

        //自定义表名
        tableName: 'userLabel',

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

UserLabel.sync({force:false})

module.exports = UserLabel