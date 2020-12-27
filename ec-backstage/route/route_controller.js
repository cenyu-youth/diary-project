
class  RouteController {

    vliad(req, res, next){

        next()
    }

    //登录接口
    login(req,res) {

        let data = req.body;

        //存在token请求头与auto标记参数则为自动登录，不然走下面的流程
        if(req.headers.authorization && data.type == 'auto'){

            utils.validToken(req.headers.authorization,config.saltOptions.tokenSalt,(err, decode) => {
                if(err){

                    res.json({msg:'您未登录!',code:-200});

                }else{
                    res.json({msg:'登录成功',code:201});
                }
            })

        }else {
            model.user.findOne({
              attributes: ['username', 'pwd', 'loginCount'],
              where: {
                username:data.username
              }
            }).then(result => {

                console.info(result.dataValues)

                if(result == null){
                    res.json({msg:'账号未注册!',code:-201})
                }else {
                    let pwd = utils.encryption(data.pwd);

                    if(pwd == result.dataValues.pwd){
                       let token = utils.getToken(data.username,config.saltOptions.tokenSalt,'7d');

                       model.user.update({
                          user_token:token,
                           loginCount:result.dataValues.loginCount + 1
                        }, {
                          where: {
                            username:data.username
                          }
                        }).then(end => {

                       });

                       res.json({msg:'登录成功!',code:200,_ttVc:token})

                    }else{
                        res.json({msg:'用户名或者密码不正确!',code:-202})
                    }

                }
            });
        }
    }

    //注册接口
    register(req,res){
        let data = req.body;

        model.user.findOne({
          attributes: ['*'],
          where: {
            username:data.username
          }
        }).then(obj => {

            if(obj == null){

                //生成用户id
                let userId = config.saltOptions.userIdSalt + new Date().getTime();


                 model.user.create({
                    username:data.username,
                    phone:data.phone,
                    pwd:utils.encryption(data.pwd),
                    loginCount:0,
                    userId:userId
                }).then(result => {
                    console.info('操作数据库增加数据===》'+result);

                    res.json({msg:'注册成功',code:100})
                }).catch(err => {
                    console.info(err)
                 })
            }else{
                res.json({msg:'用户名已被注册',code:-100})
            }
        })

    }

    //添加便签
    addLabel(req, res){

        let data = req.body;

        if(req.headers.authorization){
            utils.validToken(req.headers.authorization,config.saltOptions.tokenSalt,(err, decode) => {
                if(err){

                    res.json({msg:'您未登录!',code:-200});

                }else{
                    console.info(decode.data)

                    api.findData('user',
                        {username:decode.data},
                        ['userId']).then((findResult => {

                            if(findResult.length <= 0){

                                res.json({msg:'账号不存在',code:-202})

                                return
                            }

                            let userId = findResult[0].dataValues.userId;

                            let labelId = config.saltOptions.labelIdSalt + new Date().getTime();

                            api.createData('userLabel',{
                                userId:userId,
                                labelId:labelId,
                                labelContent:data.ct,
                                tag:data.tag,
                                isEnd:data.isEnd,
                                timeNum:new Date().getTime()
                            }).then(createResult => {

                                console.info(createResult)

                                res.json({msg:'保存成功',labelId:labelId,code:300})
                            })

                    }))

                }
            })
        }else{
            res.json({msg:'您还未登录',code:-200})
        }
    }

    //查询标签
    queryLabel(req, res){

        if(req.headers.authorization){
            utils.validToken(req.headers.authorization,config.saltOptions.tokenSalt,(err, decode) => {
                if(err){

                    res.json({msg:'您未登录!',code:-200});

                }else{

                    api.findData('user',
                        {username:decode.data},
                        ['userId']).then((findResult => {

                             if(findResult.length <= 0){

                                res.json({msg:'账号不存在',code:-202})

                                return
                            }

                            api.findData('userLabel',{
                                userId:findResult[0].dataValues.userId,
                                isEnd:{
                                    $or: {
                                      $lt: 0,
                                      $eq: 1
                                    }
                                  }
                            },['labelId','labelContent','tag','timeNum']).then(findLabelResult => {

                                if(findLabelResult.length <= 0){
                                    res.json({msg:'没有数据',code:-303});
                                    return;
                                }



                                // console.info(findLabelResult)

                                res.json({msg:'请求成功',findLabelResult,code:310})
                            })

                    }))

                }
            })
        }else{
            res.json({msg:'您还未登录',code:-200})
        }
    }
}

//导出RouteController实例
module.exports = new RouteController();