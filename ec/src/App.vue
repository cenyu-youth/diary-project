<template>
  <div id="app">
<!--    <div class="system"></div>-->

    <router-view/>
  </div>
</template>

<script>
  import qs from 'qs'
  export default {
    name:'app',
    data(){
      return{

      }
    },
    created() {
      let token = this.$cookies.isKey('tk') ? this.$cookies.get('tk').text : null

      let head =  token == null ? {} : {Authorization: token}

      if(token){
        //序列化post请求参数
        var paramsStr = qs.stringify({
          type:'auto'
        });

        this.axios({
          headers:head,
          method: 'POST',
          url: 'http://192.168.43.10:8000/login',
          data:paramsStr
        }).then(result => {

          if(result.data.code == 201){

            this.$toast({message:'登录成功!'})

            console.info('token自动登录成功')

          }else if(result.data.code == -200){
            this.$router.push({name:'login'})
          }

        }).catch(err => {
          console.log('err ==> ', err);
        })
      }else{
        this.$router.push({name:'login'})
      }


    }
  }

</script>

<style lang="less">

  html,body{
    height: 100%;
    background: #fff;
  }
  .system{
    width: 100%;
    height: 25px;
  }

  #app {
   height: 100%;
  }
</style>
