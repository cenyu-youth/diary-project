<template>
  <div style="width:100%;height:100%;position: relative">
    <div class="system"></div>
    <!--返回-->
    <div class="back-icon"></div>
    <!-- logo -->
    <div class="logo-box"></div>
    <div class="logo-text">
      <div class="login-text-t1">把你想的都留下来</div>
      <div class="login-text-t2">Leave everything you wangt.</div>
    </div>

    <form class="form-box">
      <div class="inp-box">
        <span class="inp-icon"></span>
        <input type="text" class="inp" placeholder="手机号码/账号" v-model="loginData.username" />
      </div>

      <div class="inp-box pwd-inp">
        <span class="inp-icon"></span>
        <input type="password" class="inp" placeholder="密码" v-model="loginData.pwd" />
      </div>

      <div class="submit-btn" @click="logins">登录</div>
    </form>

    <!--忘记密码 -- 注册账号 -->
    <div class="remember-box">
      <div>忘记密码</div>
      <div @click="goState({name:'register'})">注册账号</div>
    </div>

    <!-- 第三方登录 -->
    <div class="three-login">
      <van-divider :style="{borderColor:'#A0A0A0',margin:'24px 0 0'}" class="divider-box">第三方登录</van-divider>

      <i class="arrow-icon" :style="{transform:isRotation ? 'rotate(-180deg)' : 'rotate(-0deg)'}" @click="collOpations"></i>

      <van-collapse v-model="activeNames" :border="false" :style="{position:'relative',top:'-20px'}">
        <van-collapse-item  name="1" :border="false" :is-link="false" ref="coll">
          <div class="three-icon-box">
            <i class="three-icon"></i>
            <i class="three-icon qq-icon"></i>
            <i class="three-icon weibo-icon"></i>
          </div>
        </van-collapse-item>
      </van-collapse>

    </div>

    <!--声明-->
<!--    <div class="beizhu">创建账号即代表您同意 <span>用户服务协议</span></div>-->

  </div>
</template>

<script>
  import qs from 'qs'
    export default {
      name: "login",
      data(){
        return{
          activeNames: [],
          isRotation:false,
          loginData:{
            username:'',
            pwd:''
          }
        }
      },
      created() {

      },
      methods:{
        collOpations(){
          this.$refs.coll.toggle()
        },

        goState(o){
          this.$router.replace(o)
        },

        logins(){

          if(this.loginData.username == '' || this.loginData.pwd == ''){
            this.$toast({message: '输入不能为空'})
            return;
          }



          let token = this.$cookies.isKey('tk') ? this.$cookies.get('tk').text : null

          let head =  token == null ? {} : {Authorization: token}

          //序列化post请求参数
          var paramsStr = qs.stringify(this.loginData);

          this.axios({
            headers:head,
            method: 'POST',
            url: 'http://192.168.43.10:8000/login',
            // url: 'http://192.168.0.116/login',
            data:paramsStr
          }).then(result => {
            console.log('result ==> ', result.data);

            if(result.data.code == 200){
              if(result.data._ttVc){

                alert(result.data._ttVc)

                this.$cookies.set('tk',result.data._ttVc,'7d','/')
              }

              this.$toast({message:'登录成功!'})

              setTimeout(() => {
                this.goState({name:'Home'})
              })
            }else if(result.data.code == -202){
              this.$toast({message:"用户名或者密码不正确!"})
            }

          }).catch(err => {
            console.log('err ==> ', err);
          })
        }

      },
      watch:{
        activeNames(newVlaue,oldValue){
          console.log('新值：'+newVlaue);
          console.log('旧值：'+oldValue);

          this.isRotation = !this.isRotation

          console.info(this.isRotation)
        }

      }

    }
</script>

<style lang="less" scoped>
  .back-icon{
    width: 100%;
    height: 30px;
    padding-bottom: 43px;
    background: url("../../assets/logins/login/arrow.png") no-repeat;
    background-size: 30px 30px;
  }
  .logo-box{
    width: 120px;
    height: 120px;
    background: url("../../assets/logins/login/logo.png") no-repeat center center;
    background-size: 70%;
    margin: 0 auto;
    position: relative;
    border-radius: 50%;
    box-shadow: 2px 1px 10px 5px #f5f5f5;
  }
  .logo-text{
    width: 100%;
    margin-top: 20px;
    text-align: center;
    font-size:  20px;
    color: #5E5E5E;
    .login-text-t2{
      font-size:  12px;
    }
  }
  .form-box{
    margin-top: 30px;
  }
   .inp-box{
    width: 70%;
    height: 42px;
    line-height: 42px;
    border-radius: 18px;
    box-shadow: 2px 3px 5px 2px #eee;
    margin: 0 auto;
    display: flex;
    overflow: hidden;
  }
  .inp-icon{
    display: flex;
    width: 42px;
    height: 100%;
    background: url("../../assets/logins/login/user.png") no-repeat center center/24px 24px;
  }
  .inp{
    width: calc(100% - 42px);
    height: 100%;
    border-radius: 18px;
    border:none;
    margin: 0;
    padding: 0;
    line-height: 42px;
  }
  .inp::-webkit-input-placeholder{
    color: #999;
  }
  .pwd-inp{
    background-color: #F5F5F5;
    margin-top: 20px;
    box-shadow: none;
    .inp-icon{
      background: url("../../assets/logins/login/lock.png") no-repeat center center/24px 24px;
    }
    .inp{
      background-color: transparent;
    }
  }
  .submit-btn{
    width: 70%;
    height: 40px;
    background-color: #333;
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 40px;
    margin: 0 auto;
    border-radius: 20px;
    margin-top: 20px;
  }
  .beizhu{
    text-align: center;
    width: 100%;
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #BDBDBD;
    span{
      color: #333;
    }
  }
  .three-login{
    width: 74%;
    margin: 0px auto;
    color: #A3A3A3;
    .arrow-icon{
      width: 100%;
      height: 24px;
      display: block;
      background: url(../../assets/logins/login/arrow-down-bold.png) no-repeat center center/20px 20px;
      position: relative;
      z-index: 10;
      transition: transform 0.25s;
    }
    .three-icon-box{
      width: 100%;
      display: flex;
      justify-content:space-around;
      .three-icon{
        display: block;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: url("../../assets/logins/login/wechat.png") no-repeat center center/24px 24px;
        box-shadow: 2px 1px 10px 5px #f5f5f5;
      }
      .qq-icon{
        background: url("../../assets/logins/login/QQ.png") no-repeat center center/24px 24px;
      }
      .weibo-icon{
        background: url("../../assets/logins/login/weibo.png") no-repeat center center/24px 24px;
      }
    }
  }
  .remember-box{
    width: 70%;
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
    color: #999;
  }
</style>
