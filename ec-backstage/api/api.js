 class Api {

    //增加数据
     createData(modelName,o){
        return model[modelName].create(o)
     }

     //查询数据
     findData(modelName,condition,attributes){
         return model[modelName].findAll({
            //condition: 查询条件
            where: condition,

            //attributes: 查询字段
            attributes
         })
     }

     //更新数据
     updateData(modelName, attributeValues, condition){
        return model[modelName].update(attributeValues,{
            //condition: 查询条件
            where: condition,
         })
     }

      //删除数据
      destroyData(modelName, condition) {
        //modelName: 模型名称, 类型string
        //condition: 条件， 类型object
        return Model[modelName].destroy(
          {
            where: condition
          }
        );
      }

      //分页查询，查询符合条件的所有记录数和记录数据
      findPaginationData(modelName, condition, offset, limit) {
        //modelName: 模型名称
        //condition: 查询条件
        //offset: 偏移到第几条数据开始查询,必须为number的数字
        //limit: 查询记录数量, 必须为number的数字
        return model[modelName].findAndCountAll({
          where: condition,
          offset,
          limit
        })
      }


      //查询满足条件的所有记录数量
      countData(modelName, condition) {
        return model[modelName].count({
          where: condition
        });
      }

      //原始查询
      queryData(sql, o) {
        return sequelize.query(sql, {
          bind: o,
          type: sequelize.QueryTypes.SELECT
        })
      }

 }

 module.exports = new Api();