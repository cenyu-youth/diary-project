
class  Utils {

    //加密
    encryption(val){

       val = val + config.saltOptions.pwdSalt;

       let hash = crypto.createHash('md5');

       hash.update(val);

       return hash.digest('hex');
    }

     //生成token
     getToken(value, salt, time) {
       //data: 生成token的数据
       //expiresIn: 过期时间
       //salt: token加盐
       let codeToken = jwt.sign({
         //签名数据
         data: value
       }, salt, { expiresIn: time });
       return codeToken;
     }

     //验证token
     validToken(token, salt, fn) {
       jwt.verify(token, salt, fn);
     }
}

module.exports = new Utils()