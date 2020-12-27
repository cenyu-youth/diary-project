<template>
  <div style="width:100%;height:100%;position: relative;overflow-y: auto;background-color: #F8F8F8;">
    <!--    顶部导航栏-->
   <div style="position: sticky;top: 0;">
     <div class="tp-nav">
        <van-nav-bar :style="{backgroundColor: '#FCFCFC'}" :border="false">

          <template #left>
            <i class="back-icon" @click="back"></i>
          </template>

          <template #right>

              <van-popover v-model="showPopover" placement="bottom-end" :offset="[12,5]" trigger="click" :actions="actions" @select="selectOpa">
                <template #reference>
                  <i class="menu-icon"></i>
                </template>
              </van-popover>
          </template>
        </van-nav-bar>
      </div>
   </div>

    <div class="label-row-box" v-if="isCell">
      <div class="label-ct" v-for="(item,index) in labelData" :key="index" :style="{backgroundColor: tagColor[item.tag]}">
        <div class="text van-ellipsis">{{item.labelContent}}</div>
        <div class="time">{{item.time}}</div>
      </div>
    </div>

  </div>
</template>

<script>

    import qs from 'qs'

    export default {
      name: "Label",
      data(){
        return {
          showPopover: false,
          actions: [
            { text: '列表视图',type:'save' },
            { text: '批量删除',type:'del' },
            { text: '添加标签',type:'reset' },
          ],
          labelData:[],
          isCell:true,
          tagColor:['#F0EBDD','#EBF1ED','#E8EBF4','#F5E6EB','#FDFDFD']
        }
      },
      created() {
        this.obain()
      },

      mounted() {

      },

      methods:{
        //返回上一页
        back(){
          window.history.back(-1);
        },

        selectOpa(){

        },

        obain(){

          alert(this.$cookies.isKey('tk'))

          alert(JSON.stringify(this.$cookies.get('tk')))

          if(!this.$cookies.isKey('tk')){
            this.$toast({message:'您还未登录!'});

            this.pageChange = false

            this.$router.push({name:'login'});
            return;
          }

          let token = this.$cookies.isKey('tk') ? this.$cookies.get('tk') : null

          let head =  token == null ? {} : {Authorization: token}

          this.axios({
            url:'http://192.168.43.10:8000/queryLabel',
            method:'GET',
            headers:head
          }).then(res => {
            if(res.data.code == 310){
              let lin = res.data.findLabelResult;
              lin.map((v,i) => {
                v.time = this.opaTime(v.timeNum)
              })

              // console.info(lin)

              this.labelData = lin
            }else{

            }


          })
        },

        opaTime(time){

          time = parseInt(time)

          let nowTime = new Date();


          let nowyear = nowTime.getFullYear();

          let nowmon = nowTime.getMonth() + 1;

          let nowday = nowTime.getDate();

          let nowhours = nowTime.getHours();

          let nowmin = nowTime.getMinutes();

          var time = new Date(time);
          var year = nowyear - time.getFullYear() ;
          var month = nowmon - (time.getMonth() + 1) ;
          var date = nowday - time.getDate() ;
          var hours = nowhours - time.getHours() ;
          var minutes =  nowmin - time.getMinutes();



          // console.info(year+'/'+month+'/'+date+'/'+hours+'/'+minutes)

          if(year > 0){
            return year + '年前'
          }else if(month > 0){
            let a = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
            let b = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
            return `${a}月${b}日`
          }else if(date > 0){
            if(date > 3){
              let a = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
              let b = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
              return `${a}月${b}日`
            }else{
              return date + '天前'
            }
          }else if(hours > 0){
            let a = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
            let b = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
            return `${a}:${b}`
          }else if(minutes > 3){

            return minutes + '分钟前'
          }else {
            return '刚刚'
          }

        }



      },
      watch:{

      },
      beforeRouteLeave(to, from, next){

       next()

      }

    }
</script>

<style scoped lang="less">
  .tp-nav{
    overflow:hidden;
    background-color: #FDFDFD;
    padding-top: 25px;
    z-index: 10;
    box-shadow: 0 1px 5px 1px #FAFAFA;
    .back-icon{
      width: 30px;
      height: 30px;
      background: url("../../assets/label/prev.png") no-repeat center center/60%;
    }
    .menu-icon{
      display: block;
      width: 30px;
      height: 30px;
      background: url("../../assets/label/menu.png") no-repeat center center/cover;
    }
  }
  .label-row-box{
    width: 90%;
    padding: 0 5%;
    height: calc(100% - 90px);
    overflow-y: auto;
    .label-ct{
      width: calc(90% - 30px);
      margin: 10px auto;
      padding: 15px;
      background-color: #fff;
      border-radius: 8px;
      >.text{
        height: 25px;
        line-height: 25px;
        font-size: 15px;
        color: #333;
        letter-spacing: 1px;
      }
      >.time{
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        color: #666;
        letter-spacing: 3px;
      }
    }
  }
</style>

