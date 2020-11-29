<template>
  <div style="width:100%;height:calc(100% - 0.64rem);position: relative">

    <div class="tp-nav" safe-area-inset-top>
      <van-nav-bar :fixed="true">
         <template #left>
           <i class="menu-icon"></i>
         </template>
         <template #title>你好</template>
        <template #right>你好2</template>
      </van-nav-bar>
    </div>

    <van-popup v-model="show" position="left" :style="{ height: '100%' }">
      <div class="nav-box">
        <div class="nav-layer">

          <div class="login-box">
            <div class="login-icon-box">
              <div class="title-box">未登录</div>
              <div class="mine-box">个人中心</div>
            </div>
            <div class="login-logo"></div>
          </div>

          <div class="diary-num-box">
            <div class="title-icon"><i></i>已写日记</div>
            <div class="title-icon">{{num}}篇</div>
          </div>

          <van-divider :style="{backgroundColor:'#E3E3E3',height: '2px',margin:'10px 0'}" />

          <div class="opations-box">
            <div class="opations" v-for="(item,index) in navData" :key="index" @click="switchLeft">
              <i :style="{backgroundImage:'url('+item.url+')'}"></i>
              {{item.text}}
            </div>
          </div>

        </div>
      </div>
    </van-popup>
  </div>
</template>

<style lang="less" scoped>

  .tp-nav{
    background-color: #FDFDFD;
    .menu-icon{
      width: 30px;
      height: 30px;
      background: url("../assets/home/menu.png") no-repeat center center/cover;
    }
  }

  .nav-box{
    width: 260px;
    height: 100%;
    background-color: #fff;
    .nav-layer{
      width: 80%;
      padding-top: 70px;
      margin: 0 auto;
    }
    .login-box{
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      .title-box{
        height: 30px;
        line-height: 30px;
        color: #333;
        font-weight: 700;
        font-size: 20px;
      }
      .mine-box{
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: #999;
      }
      .login-logo{
        width: 50px;
        height: 50px;
        background: url("../assets/home/downTime.png") no-repeat center center/cover;
      }
    }
    .diary-num-box{
      width: 100%;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      .title-icon{
        font-size: 14px;
        color: #333;
        font-weight: 700;
        display: flex;
        i{
          display: block;
          width: 20px;
          height: 30px;
          background: url("../assets/home/bookTag.png") no-repeat center center/18px 18px;
        }
      }
    }
    .opations-box{
      width: 100%;
      .opations{
        width: 100%;
        height: 30px;
        line-height: 30px;
        display: flex;
        font-size: 14px;
        color: #999;
        padding-bottom: 10px;
        i{
          display: block;
          width: 30px;
          height: 30px;
          background-repeat: no-repeat;
          background-position: left center;
          background-size: 20px;
        }
      }
    }
  }
</style>

<script>
  export default {
    name:'home',
    data(){
      return{
        show:false,
        num:0,
        navData:[
          {
            url:require('../assets/home/moon_circle.png'),
            text:'时间轴'
          },
          {
            url:require('../assets/home/jilu.png'),
            text:'备忘录'
          },
          {
            url:require('../assets/home/riji.png'),
            text:'日记本'
          },
          {
            url:require('../assets/home/laji.png'),
            text:'回收站'
          },
          {
            url:require('../assets/home/caogao.png'),
            text:'草稿箱'
          },
          {
            url:require('../assets/home/plan.png'),
            text:'日记广场'
          },
          {
            url:require('../assets/home/yejian.png'),
            text:'夜间模式'
          },
          {
            url:require('../assets/home/opations.png'),
            text:'设置'
          }

        ]
      }
    },
    created() {

    },
    methods:{
      goState(o){
        this.$router.push(o)
      },
      switchLeft(){
        this.show = !this.show
      },
    }
  }

</script>
