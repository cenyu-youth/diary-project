<template>
    <div style="width:100%;height:calc(100% - 0.64rem);position: relative">

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
        <input type="text" class="inp" placeholder="手机号码" pla>
      </div>

      <div class="inp-box pwd-inp">
        <span class="inp-icon"></span>
        <input type="text" class="inp" placeholder="账户名" pla>
      </div>

      <div class="inp-box pwd-inp">
        <span class="inp-icon"></span>
        <input type="password" class="inp" placeholder="密码" pla>
      </div>

       <div class="inp-box pwd-inp">
        <span class="inp-icon"></span>
        <input type="password" class="inp" placeholder="确认密码" pla>
      </div>

      <div class="submit-btn">注册</div>
    </form>

    <!--忘记密码 -- 注册账号 -->
    <div class="remember-box">
      <div @click="goState({name:'login'})">已有账号，去登录</div>
    </div>



  </div>
</template>

<script>
    export default {
      name: "login",
      data(){
        return{
          activeNames: [],
          isRotation:false
        }
      },
      methods:{
        collOpations(){
          this.$refs.coll.toggle()
        },

        goState(o){
          this.$router.push(o)
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
    padding-bottom: 40px;
    background: url("../../assets/logins/login/arrow.png") no-repeat;
    background-size: 30px 30px;
  }
  .logo-box{
    width: 80px;
    height: 80px;
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
  .remember-box{
    width: 70%;
    margin: 15px auto;
    display: flex;
    justify-content: center;
    color: #999;
  }
</style>
