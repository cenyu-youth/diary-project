<template>
  <div style="width:100%;height:100%;position: relative;overflow-y: auto">
    <!--    顶部导航栏-->
   <div style="position: sticky;top: 0;z-index: 99">
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

     <div class="subhead">
       <div class="time-box">
         <span>{{day}}  </span>
         <span>{{mon+' ' +year}}</span>
       </div>

       <div class="tag-box">
          <div class="tag-select" @click="showTags"> <i :style="{'background': 'url(' + tag[tagIndex].path + ') no-repeat center center/75%'}"></i> {{tag[tagIndex].text}} <span></span></div>

          <div v-show="tagShow" class="tags-box">
           <div class="tag" @click="selectTag(index)" v-for="(item,index) in tag" :key="index" :style="{borderBottom:index == tag.length - 1  ? 'none' : '1px solid #F0F0EE' }">
              <i :style="{'background': 'url(' + item.path + ') no-repeat center center/75%'}"></i>
              {{item.text}}
            </div>

          </div>

       </div>
     </div>
   </div>

    <div class="write-box">
      <textarea v-model="ct" class="write" placeholder="你想记什么..."></textarea>
    </div>

  </div>
</template>

<script>

    import qs from 'qs'

    export default {
      name: "writeLabel",
      data(){
        return {
          ctId:'',
          day:1,
          mon:'Dec',
          year:2020,
          tag:[
            {
              text:'旅游',
              path:require('../../assets/label/tag1.png')
            },
            {
              text:'个人',
              path:require('../../assets/label/tag2.png')
            },
            {
              text:'生活',
              path:require('../../assets/label/tag3.png')
            },
            {
              text:'工作',
              path:require('../../assets/label/tag4.png')
            },
            {
              text:'未分类',
              path:require('../../assets/label/tag5.png')
            }
          ],
          tagIndex:0,
          tagShow:false,
          ct:'',
          pageChange:false,
          showPopover: false,
          actions: [
            { text: '保存',type:'save' },
            { text: '删除',type:'del' },
            { text: '清空',type:'reset' },
          ]
        }
      },
      created() {
        let arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

        this.year = new Date().getFullYear();
        this.mon = arr[new Date().getMonth()];
        this.day = new Date().getDate();

        this.day = this.day < 10 ? '0' + this.day : this.day;

        this.tagIndex = this.tag.length - 1;
      },

      mounted() {
        if(!this.ctId){

          let arr = [];
          arr = arr.concat(this.actions)

          arr.splice(1,1)

          this.actions = arr
        }
      },

      methods:{
        //返回上一页
        back(){
          window.history.back(-1);
        },

        // 显示标签栏 -- 自己写了一个，也用了vant的一个
        showTags(){
          this.tagShow = !this.tagShow
        },

        //选中标签
        selectTag(i){
          this.tagIndex = i;

          this.tagShow = false
        },

        //保存内容
        save(){
          if(!this.pageChange && this.ct == ''){

            this.$toast({message:'没有操作可以保存,请输入内容'})

            return;
          }

          this.$toast.loading({
            message: '保存中...',
            forbidClick: true,
            duration:0
          });

          let data = qs.stringify({
            id:this.ctId || '',
            tag:this.tagIndex,
            ct:this.ct,
            isEnd:0
          })

          if(!this.$cookies.isKey('tk')){
            this.$toast({message:'您还未登录!'});

            this.pageChange = false

            this.$router.push({name:'login'});
            return;
          }

          let token = this.$cookies.isKey('tk') ? this.$cookies.get('tk'): null

          let head =  token == null ? {} : {Authorization: token}

          this.axios({
            url:'http://192.168.43.10:8000/addLabel',
            method:'post',
            headers:head,
            data:data
          }).then(res => {

            if(res.data.code == 300){
               this.ctId= res.data.labelId;


              this.$toast.clear()

              this.pageChange = false

              this.actions = [
                              { text: '保存',type:'save' },
                              { text: '删除',type:'del' },
                              { text: '清空',type:'reset' },
                            ]

              this.$toast({message:'保存成功!'});
            }

          })


        },

        //清空重置
        reset(){
          this.tagIndex = this.tag.length - 1;
          this.ct = '';

          if(this.ctId){
            this.pageChange = true;
          }else{
            this.pageChange = false;
          }

        },

        //删除 -- 只有是有ctId测才能删除，不然就是本地清空
        del(){

        },


        //选择了操作
        selectOpa(action){
          if(action.type == 'save'){
            this.save();
          }else if(action.type == 'reset'){
            this.reset()
          }else {
            this.del()
          }
        },


      },
      watch:{
        showPopover(newVal,oldVal){
          if(newVal){
            this.tagShow = false
          }
        },
        ct(){
          this.pageChange = true
        }
      },
      beforeRouteLeave(to, from, next){

        this.$toast.clear()

        if(!this.pageChange){
          next();
          return
        }


        next(false)

        this.$dialog.confirm({
          message: '是否保存编辑的内容',
        })
        .then(() => {
          this.save()
        })
        .catch(() => {
          next()
        });




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
  .subhead{
    height: 30px;
    line-height: 30px;
    padding: 5px 18px;
    display: flex;
    position: relative;
    justify-content: space-between;
    .time-box{
      >span:first-child{
        font-size: 20px;
        font-weight: 700;
        color: #333;
      }
      >span{
        font-size: 14px;
        color: #999;
      }
    }
    .tag-box{
      color: #666;
      position: relative;
      .tag-select{
        display: flex;
        >i{
          width: 30px;
          height: 30px;
        }
        >span{
          display: block;
          width: 15px;
          height: 20px;
          background: url("../../assets/label/three_arrow.png") no-repeat center bottom/50%;
        }
      }
      .tags-box{
        width: 120px;
        position: absolute;
        top: 30px;
        right: 0;
        box-shadow: 0px 0px 2px 2px #F8F8F6;
        border-radius: 6px;
        background-color: #fff;
        .tag{
          width: 80%;
          padding: 10px 0;
          margin: 0 auto;
          display: flex;
          border-bottom: 1px solid #F0F0EE;
          color: #6C6C6A;
          font-size: 14px;
          >i{
            display: block;
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .write-box{
    width: 90%;
    height: calc(100% - 120px);
    margin: 0 auto;
    position: relative;
    z-index: 0;
    .write{
      width: 100%;
      height: 100%;
      font-size: 14px;
      color: #333;
      /*text-indent: 2em;*/
      resize:none;
      border: none;
    }
  }
</style>
