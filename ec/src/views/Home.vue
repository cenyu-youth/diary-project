<template>
  <div style="width:100%;height:100%;position: relative;overflow-y: auto">

<!--    顶部导航栏-->
    <div class="tp-nav">
      <van-nav-bar :style="{backgroundColor: '#FCFCFC'}">
         <template #left>
           <i class="menu-icon" @click="switchLeft({name:'noJust'})"></i>
         </template>
        <template #right>
          <div class="date-box" @click="goState({name:'login'})">
            <span class="date-day">{{day}}</span>
            <span class="date-mon"> {{mon}} </span>
            <span class="date-year">{{year}}</span>
          </div>
        </template>
      </van-nav-bar>
    </div>


<!--    中间部分日记卡片-->
    <div class="ct-box" ref="card" @touchstart="drag">

      <div class="ct-title">
        <div>晨间日记</div>
        <div>Morning diary</div>
      </div>

<!--      日记卡片-->
      <div class="center">
        <div style="position: relative;width: 100%;height: 100%">
          <div class="card-box" v-for="(item,index) in cardData"
               :key="index"
               :style="{
                 top:cardPi[index].y + 'px',
                 left:cardPi[index].x + 'px',
                 zIndex:cardPi[index].z,
                 opacity:cardPi[index].o,
                 transform:'scale(' + cardPi[index].s +')'
               }">

    <!--        顶部图片-->
            <div class="tp-img">
              <img :src="item.url" alt="">
            </div>

            <!--日期 -- 心情 -- 天气-->
            <div class="time-mood-weather">

              <div class="time-box"><span>{{item.date.day}}</span> {{item.date.mon}} {{item.date.year}}</div>

              <div class="mood-weather">
                <div class="mood-box" :style="{backgroundImage: 'url(' + item.mood + ')'}"></div>
                <div class="weather-box" :style="{backgroundImage: 'url(' + item.weather + ')'}"></div>
              </div>

            </div>

    <!--        文章标题-->
            <div class="chapter-box">{{item.title}}</div>

    <!--        内容-->
            <div class="content-box">
              <p class="van-multi-ellipsis--l3">{{item.content[0]}}</p>
              <p class="van-multi-ellipsis--l3">{{item.content[1]}}</p>
              <p>......</p>
            </div>

    <!--        底部标识-->
            <div class="location-time">

    <!--          坐标位置图标-->
              <div class="lt-box">
                <i></i>
                {{item.location}}
              </div>

    <!--          右边时间标识-->
              <div class="rt-box">
                <i></i>
                {{item.date.time}}
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>


<!--    底部功能区-->
    <div class="bt-box">
      <i class="jilu" @click="goState({name:'writeLabel'})"></i>
      <i class="pen"></i>
    </div>


<!--    左边侧导航栏-->
    <van-popup v-model="show" position="left" :style="{ height: '100%' }" :close-on-popstate="true" :transition-appear="true">
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
              <div class="opations"  v-for="(item,index) in navData" :key="index" @click="switchLeft({name:item.path})">
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
    height: 50px;
    overflow:hidden;
    position: sticky;
    top: 0;
    background-color: #FDFDFD;
    padding-top: 25px;
    z-index: 10;
    .menu-icon{
      width: 30px;
      height: 30px;
      background: url("../assets/home/menu.png") no-repeat center center/cover;
    }
  }

  .date-box{
    .date-day{
      color: #333;
      font-size: 18px;
      font-weight: 600;
    }
    .date-mon,.date-year{
      font-size: 12px;
      color: #999;
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

  .bt-box{
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: 10;
    >.jilu{
      width: 40px;
      height: 40px;
      background: url("../assets/home/jilu-home.png") no-repeat center center/22px;
      border-radius: 50%;
      box-shadow: 0px 0px 5px 2px #ddd;
      border: 1px solid #ddd;
      margin-right: 60px;
    }
    >.pen{
      width: 40px;
      height: 40px;
      background: url("../assets/home/pen.png") no-repeat center center/22px;
      border-radius: 50%;
      box-shadow: 0px 0px 5px 1px #ddd;
      border: 1px solid #ddd;
    }
  }

  .ct-box{
    height: calc(100% - 145px);
    padding: 10px 0;
    width: 80%;
    margin: 0 auto;
    position: relative;
    .ct-title{
      height: 20px;
      color: #B0AEAF;
      font-size: 12px;
      >div:first-child{
        font-size: 14px;
        font-weight: 600;
      }
    }
    .card-box{
      width: 100%;
      height: 100%;
      padding:5px;
      box-shadow: 0 0 10px 1px #ccc;
      position: absolute;
      border-radius: 2px;
      background-color: #fff;
      transition: all 1s;
      .tp-img{
        width: 100%;
        height: 165px;
        overflow:hidden;
        position: relative;
        border-radius: 5px;
        >img{
          display: block;
          width: 100%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
      .time-mood-weather{
        width: 100%;
        height: 35px;
        line-height: 35px;
        display: flex;
        justify-content: space-between;
        .time-box{
          font-size: 12px;
          color: #999;
          >span{
            color: #333;
            font-size: 18px;
            font-weight: 600;
          }
        }
        .mood-weather{
          display: flex;
          >.mood-box{
            width: 40px;
            height: 35px;
            background: url("../assets/mood/01.png") no-repeat center center/60%;
          }
          >.weather-box{
            width: 40px;
            height: 35px;
            background: url("../assets/weather/02.png") no-repeat center center/65%;
          }
        }
      }
      .chapter-box{
        width: 70%;
        height: 30px;
        line-height: 30px;
        border-bottom: 2px solid #C6C6C6;
        color: #333;
        font-weight: 500;
        font-size: 16px;
      }
      .content-box{
        width: 100%;
        color: #C6C6C6;
        line-height: 16px;
      }
      .location-time{
        width: calc(100% - 10px);
        height: 35px;
        line-height: 35px;
        position: absolute;
        bottom: 10px;
        z-index: 2;
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #C6C6C6;
        .lt-box{
          display: flex;
          >i{
            display: block;
            width: 30px;
            height: 35px;
            background: url(../assets/home/location.png) no-repeat center center/20px;
          }
        }
        .rt-box{
          display: flex;
          >i{
            display: block;
            width: 30px;
            height: 35px;
            background: url(../assets/home/time.png) no-repeat center center/20px;
          }
        }
      }
    }
    .center{
      width: calc(100% - 10px);
      height: calc(100% - 90px);
      max-height: 480px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
  }
</style>

<script>
  import qs from 'qs'

  import {mapState, mapActions} from 'vuex'


  export default {
    name:'home',
    data(){
      return{
        show:false,
        num:0,
        day:1,
        mon:'Dec',
        year:2020,
        navData:[
          {
            url:require('../assets/home/moon_circle.png'),
            path:'',
            text:'时间轴'
          },
          {
            url:require('../assets/home/jilu.png'),
            path:'label',
            text:'备忘录'
          },
          {
            url:require('../assets/home/riji.png'),
            path:'',
            text:'日记本'
          },
          {
            url:require('../assets/home/laji.png'),
            path:'',
            text:'回收站'
          },
          {
            url:require('../assets/home/caogao.png'),
            path:'',
            text:'草稿箱'
          },
          {
            url:require('../assets/home/plan.png'),
            path:'',
            text:'日记广场'
          },
          {
            url:require('../assets/home/yejian.png'),
            path:'',
            text:'夜间模式'
          },
          {
            url:require('../assets/home/opations.png'),
            path:'',
            text:'设置'
          }

        ],
        cardPi:[
          {x:0,y:0,z:7,s:1,o:1},
          {x:0,y:30,z:6,s:0.9,o:0.8},
          {x:0,y:60,z:5,s:0.8,o:0.6},
          {x:0,y:60,z:4,s:0.8,o:0.6},
          {x:0,y:60,z:3,s:0.8,o:0.6},
          {x:0,y:60,z:2,s:0.8,o:0.6}
        ],
        cardData:[
          {
            url:require('../assets/home/p1.jpg'),
            title:'阳台山秋色',
            date:{
              day:'05',
              mon:'Dec',
              year:2020,
              time:'PM17:11'
            },
            mood:require('../assets/mood/09.png'),
            weather:require('../assets/weather/11.png'),
            location:'广州',
            content:[
              '雨丝飘散，轻舟摇晃，梦里水乡，烟雨江南。一曲《梦里水乡》，把我带进这梦中的江南，看那青山荡漾在水上，看那晚霞吻着夕阳，一回眸，才知那遥远的水乡就在我的身旁。',
              '眼底氤氲，青苔小巷，细雨洗出一分春。渐临黄昏，那痴迷江南的女子，在细雨中，撑起一把油纸伞，踏着青石板路从巷中走来，漫步于长提或古镇。女子手中的油纸伞划过雨帘，伞面上的工笔细描绘出曾经发生的百转千回，是那么传情，而这份雅致与飘逸，也是江南独有的。越过玲珑的小桥，寂静的长廊，那流动的河水，正诉说着一场江南相思梦。',
              '河水和着雨水随波荡漾，荡一叶轻舟，在水乡划行。那宛若一朵莲的娇羞女子便撑着伞，乘着船，游荡在江南烟雨里。看青色等烟雨，梦里清风舞长袖，穿一袭青衣，在雨中与君邂逅，以致恋人开满花倾城。浮生一梦如烟雨，君若只是一个江南的过客，如蜻蜓点水般从这儿经过，那也只好把你萦绕在水乡的回忆里，想念时，沉醉。红尘，是否如溪河中漂流的浮萍，缠绕着恋尘之人？女子久久不肯退去青衣，只为等那姗姗来迟的君，怨只怨江南烟雨里的一抹爱恋。只求为君一笑，但却不知君在何处？',
              "风舞明月，幽梦花落间，相思眉间染，只身天涯揪心独醉依窗前。风吹看花落，花前月下，是否君在醉拔情弦，轻拂玉笛？遥望千年，繁华散尽，江南的相思梦在这座闲适，清雅的小城里演绎了一场痴心未改的梦。水乡的墨雅情调就体现在那静流的水，那淡然的亭，还有那蒙蒙的烟雨。城内那古老青石板砌就的路面，早已被久远的时光磨蚀得光可鉴人。",
              '那江南的小镇，又是多少人心中的梦里水乡。曾经红颜步履轻盈走来，带着淡淡的花香，后来却消失不见。春天仿佛在那江南不远的地方张望，淡淡的绿柳妆成一扇打开的门，门缝中溜过百媚千娇的春景，刚刚开出的花苞在枝头上显得愈发柔嫩，或粉，或红，像石榴果儿绽开的笑，无暇美好！嗅过淡淡的香，心头抚过一阵暖意，扬起的冷风中也有了一抹轻轻的春意！',
              '年华渐逝，但远远的思恋仍然沉睡在江南烟雨里，有关感情的万般思绪都在江南，那个如梦如幻的水城，小小的缩成一个古镇。柳绿成荫，雨幕成帘，湖堤杨柳上附满了晶莹的雨珠，灼疼了江南女子的心，她独自在桥的这一边，等君来。雨季肆虐的时候，心也转入了新的轮回，望穿清白的石板路，女子在桥的那端执伞而来.',
              '君的脚步就一步一步踏在心上，慢慢的，越来越近，双眼温婉地望去，沉醉在一脸的温柔里。女子仍然坐在船上等候，船娘的橹在水中吱吱地摇响，水轻轻荡开，碧空里，轻淡的云扯成江南女子衣衫上的水袖，忽深忽浅，水影中被船桨划破，碎成一串串露珠，又被冲得荡然无存。',
              '梦里水乡，烟雨江南。水韵中的青墙白瓦，光阴的轻愁，一抹一抹都印在蒙蒙的雨巷。湿润的空气里沁满了丁香的清香，青色的旗袍，摇曳的身姿，素雅的丁香花斜斜的开满旗袍，叩响在青石的路上，一声一生。执子之手，凝眸相望，盼望着与君携手，并肩守在迷离的烟雨中等待落日的到来，让余晖剪下的光影见证江南的柔情。'
            ]

          },
          {
            url:require('../assets/home/p2.jpg'),
            title:'冬天，美丽的诗行',
            date:{
              day:'05',
              mon:'Dec',
              year:2020,
              time:'PM17:15'
            },
            mood:require('../assets/mood/01.png'),
            weather:require('../assets/weather/01.png'),
            location:'佛山',
            content:[
              '我喜欢故乡的秋天，尤其是在深秋季节，那浓浓的秋韵在西边的阳台山里隐藏，只有走进西边的阳台山才能领略那浓浓的秋色，那才真正是别有洞天，否则感受不到故乡秋天的那种深藏不露的美。',

              '确实一眼向西望去，西边的阳台山在深情季节没什么好看的，这个时候了，山是老气横秋的样子，山上除了一片片松柏树，就是洋槐树、橡树和一些杂树，就是荆棘和灌木从了，红枫叶也不是很多，没有漫山遍野层林尽染的镜头。想看到那秋的辉煌，秋的火红，只有走进山的怀抱里去。',

              '这个季节千年古刹大觉寺是最值得一看的，当然来这里不是为了看寺院本身，而是领略寺院里千年的银杏树，被称为银杏王，这是一棵高大粗壮的银杏树，并且在树的主干周围还长出了很多棵碗口一样粗的子母树。其实这个时候吸引人的倒不是这棵银杏树的多么高大挺拔，而是它那满树甚至遍地的金色辉煌，一棵高大无比的银杏树满身都是黄金甲，遮住了大殿之间的整个天空，两座巍峨的大殿在一片黄金海下显得又是那么矮小。游客聚满，就像朝拜者一样，眼睛和镜头都久久地盯着银杏树，手机和相机闪动着眼睛，啪啪啪的声音似乎要把这金秋的辉煌全都吞进自己心灵的世界，把这一切都收藏在自己的人生记忆中。',

              '出了大觉寺上旅游观光路向北，驱车三五分钟就到了贝家花园，沿着木质的栈道走不了多会儿就看到了碉楼，这是贝家花园最重要的建筑物，它掩隐在五角星似的红枫叶之中，秋色中的碉楼显得那样庄严肃穆；到了北大房也是一样，秋色浓重，北大房的三面同样掩隐在金红之中，北大房的古朴与浓重的秋色相得益彰；南大房与北大房有一段距离，并且不在一个正对着的方向，因为建筑在山上，山场又没有那么大的平地，不可能建成老四合院那样的格局，北大房在北坡之下，南大房则在南坡上，大概是阴坡的缘故，这里的秋色似乎更崭新一些。',

              '出了贝家花园沿着旅游路再向北，就到阳台山风景区门口，再往北一些有一条向西的路，车是能够开上去的，也是柏油路，这条路是通向金山寺的。金山寺并不大，其实就是座尼姑奄。金章宗年代这里是八大水院之一的金水院，金山泉是很有名的，山泉周围是一片高大挺拔的银杏林，也叫公孙林。深秋的金山寺在一片金黄之中，站在山下就能够看到那一片辉煌了，同样给深秋的阳台山增添了浓重的秋色，显得格外亮眼。',

              '虽然站在山下看不到阳台山漫山遍野的辉煌和火红，但这点点秋色却独具特色，恰如苏州园林的那种小巧玲珑，赏秋和品秋也是别有一番风味的。'
            ]

          },
          {
            url:require('../assets/home/p3.jpg'),
            title:'两个人，古道',
            date:{
              day:'05',
              mon:'Dec',
              year:2020,
              time:'PM17:19'
            },
            mood:require('../assets/mood/05.png'),
            weather:require('../assets/weather/10.png'),
            location:'深圳',
            content:[
              '那年，也是国庆假期。',

              '送儿子去西安上学后，十二点多，我们租了辆车，到了蓝关古道下的村子。',

              '雨后初晴，还有些泥泞，我们背了一些干粮。',

              '蜿蜒的山路，衰黄的荒草，满身尖刺叶已落的酸枣树，平平淡淡的秦岭秋色。我们肩并肩走着，轻声地说着话，我没有想到的是，你竟然也兴趣盎然，走之前，我还害怕你抱怨着呢。',

              '虽然各种杂草和灌木侵占过来，带着各色的果实和山花，但是古道还有一米多宽的砂石路让我们从容地走。除了刚开始的一部分坡路中间仍然平铺着的许多大石块以外，古道已经没有什么遗迹了。那些曾经的人呼马嘶的繁忙、忧苦、疲惫、血汗、失意，当然可能也有荣耀，什么也没有留在这里。',

              '韩愈的“云横秦岭家何在，雪拥蓝关马不前”，也没有留在这里，只留在了不断被翻印的唐诗里，有几个人知道。千百年来，又有几个人真切地感受到他的迷茫与无望。',

              '半坡上，一边是山岭，一边是大片的板栗林，阳光下，忽觉背后一股寒意，不知所来，不知所踪。也许某个天寒路滑的日子，这里曾经人仰马翻，下面有有家不能归的冤魂吗？我没有对你说，你正在高高兴兴地拔下了几支暗红的石子花。',

              '一个很陡峭的急弯，找不到路，路被胡须一样的什么草覆盖了，似乎还有一个破败的小小的房子，你看着我猴子一样的爬上一棵柿子树，摘下一个红彤彤的软柿子扔给你，你没有担心的样子，微笑着看着我，甜甜地吃着。上树前我炫耀过，我是山里的孩子，这绝不在话下。',

              "一片芦苇地，菅草像绒毯一样铺着，你兴高采烈地折了一大把，还让我给你不停地拍照，好久没有见到你像孩子一样了。",

              '快到坡顶时，忽然看见沟中有五六个妇人，她们在采中草药，她们有点奇怪地看了我们一样，就自顾自地忙去了。一潭小小的泉水，我趴在那喝了，你小声嘟哝了几句。',

              '到了山头，上面是比较平缓的水泥路，干干净净的，但没有人行走。头顶是宽阔的淡蓝的天空，清风徐徐吹过，我们不着急，有一句没一句地说着话，一直走到两边十几米高的山崖中间夹着一条路的风门口。',

              '我们俩坐着，任凉爽的风带走我们的微汗，看着水泥路曲曲折折地延伸到高高低低的山山峁茆远处。我给你说了几句蓝关的历史，你听得漫不经心。曾经的残酷的战争发生在这里，没留下什么，你不关心。',

              '你知道，有我和孩子就够了，清风暖阳，岁月如此静好。',

              '我们顺着水泥路缓缓地向县城的方向走去。东南方起起伏伏的山峦，坡底下绿树掩映的农舍，阴坡一眼望不透的松林，阳坡清亮却看不到底的桦栎树林，紫红的或者绿中泛白的酸枣，一丛砂岩上鲜红的叶子，一只飞快爬上树的大尾巴的松鼠，快活地唱着歌的山鸟，翩然飞舞的蝴蝶，轻盈地闪着翅膀的蜻蜓，一切都是明亮、轻松、快活的样子。',

              '到了山梁的尽头，灿烂的晚霞在白鹿原上铺展着，如此的祥和安逸。竹篑寺塔精精神神地挺立在对面稍矮的山头，灞河水红光满面地蜿蜒而去，一点一点的白光在远处县城的楼房上闪着，近处川道里座座房子安安静静地晒着太阳，车辆轻轻快快地向前跑着。',

              '我们静静地坐着，我看着你被夕阳映得通红的脸和恬静的笑容，口里轻轻地嚼着一支狗尾巴草。',

              '“咱们回吧，一会儿天就黑了。”我说。',

              '“你不是说到这里就很近了吗？”你说着，顺从地站起来。',

              '但很快天就暗下来了，渐渐的山半坡的村子就亮起了灯来。但我们不急，因为水泥路还是清清楚楚的。',

              '到了半山腰第一户人家的时候，一只狗汪汪的叫了几声，房子没有开灯，主人朦朦胧胧地坐在门口，厨房里传来诱人的农家饭菜的香味，我偷偷地咽了一下口水，你说：“我都饿了！”',

              '出租车在路边等着，我们在夜色中回了家。',

              '那晚，你睡得很甜，我也是。',

              '而这，竟然是我们俩唯一的一次从从容容地在天地之间漫步！',

              '又是国庆了，山还在，路还在，所有的都在，然而你永远不在了！',

              '阴沉沉的天，我远远地看着那山，泪流满面。'
            ]

          },
          {
            url:require('../assets/home/p1.jpg'),
            title:'阳台山秋色',
            date:{
              day:'05',
              mon:'Dec',
              year:2020,
              time:'PM17:11'
            },
            mood:require('../assets/mood/07.png'),
            weather:require('../assets/weather/20.png'),
            location:'广州',
            content:[
              '雨丝飘散，轻舟摇晃，梦里水乡，烟雨江南。一曲《梦里水乡》，把我带进这梦中的江南，看那青山荡漾在水上，看那晚霞吻着夕阳，一回眸，才知那遥远的水乡就在我的身旁。',
              '眼底氤氲，青苔小巷，细雨洗出一分春。渐临黄昏，那痴迷江南的女子，在细雨中，撑起一把油纸伞，踏着青石板路从巷中走来，漫步于长提或古镇。女子手中的油纸伞划过雨帘，伞面上的工笔细描绘出曾经发生的百转千回，是那么传情，而这份雅致与飘逸，也是江南独有的。越过玲珑的小桥，寂静的长廊，那流动的河水，正诉说着一场江南相思梦。',
              '河水和着雨水随波荡漾，荡一叶轻舟，在水乡划行。那宛若一朵莲的娇羞女子便撑着伞，乘着船，游荡在江南烟雨里。看青色等烟雨，梦里清风舞长袖，穿一袭青衣，在雨中与君邂逅，以致恋人开满花倾城。浮生一梦如烟雨，君若只是一个江南的过客，如蜻蜓点水般从这儿经过，那也只好把你萦绕在水乡的回忆里，想念时，沉醉。红尘，是否如溪河中漂流的浮萍，缠绕着恋尘之人？女子久久不肯退去青衣，只为等那姗姗来迟的君，怨只怨江南烟雨里的一抹爱恋。只求为君一笑，但却不知君在何处？',
              "风舞明月，幽梦花落间，相思眉间染，只身天涯揪心独醉依窗前。风吹看花落，花前月下，是否君在醉拔情弦，轻拂玉笛？遥望千年，繁华散尽，江南的相思梦在这座闲适，清雅的小城里演绎了一场痴心未改的梦。水乡的墨雅情调就体现在那静流的水，那淡然的亭，还有那蒙蒙的烟雨。城内那古老青石板砌就的路面，早已被久远的时光磨蚀得光可鉴人。",
              '那江南的小镇，又是多少人心中的梦里水乡。曾经红颜步履轻盈走来，带着淡淡的花香，后来却消失不见。春天仿佛在那江南不远的地方张望，淡淡的绿柳妆成一扇打开的门，门缝中溜过百媚千娇的春景，刚刚开出的花苞在枝头上显得愈发柔嫩，或粉，或红，像石榴果儿绽开的笑，无暇美好！嗅过淡淡的香，心头抚过一阵暖意，扬起的冷风中也有了一抹轻轻的春意！',
              '年华渐逝，但远远的思恋仍然沉睡在江南烟雨里，有关感情的万般思绪都在江南，那个如梦如幻的水城，小小的缩成一个古镇。柳绿成荫，雨幕成帘，湖堤杨柳上附满了晶莹的雨珠，灼疼了江南女子的心，她独自在桥的这一边，等君来。雨季肆虐的时候，心也转入了新的轮回，望穿清白的石板路，女子在桥的那端执伞而来.',
              '君的脚步就一步一步踏在心上，慢慢的，越来越近，双眼温婉地望去，沉醉在一脸的温柔里。女子仍然坐在船上等候，船娘的橹在水中吱吱地摇响，水轻轻荡开，碧空里，轻淡的云扯成江南女子衣衫上的水袖，忽深忽浅，水影中被船桨划破，碎成一串串露珠，又被冲得荡然无存。',
              '梦里水乡，烟雨江南。水韵中的青墙白瓦，光阴的轻愁，一抹一抹都印在蒙蒙的雨巷。湿润的空气里沁满了丁香的清香，青色的旗袍，摇曳的身姿，素雅的丁香花斜斜的开满旗袍，叩响在青石的路上，一声一生。执子之手，凝眸相望，盼望着与君携手，并肩守在迷离的烟雨中等待落日的到来，让余晖剪下的光影见证江南的柔情。'
            ]

          },
          {
            url:require('../assets/home/p2.jpg'),
            title:'冬天，美丽的诗行',
            date:{
              day:'05',
              mon:'Dec',
              year:2020,
              time:'PM17:15'
            },
            mood:require('../assets/mood/17.png'),
            weather:require('../assets/weather/18.png'),
            location:'北京',
            content:[
              '我喜欢故乡的秋天，尤其是在深秋季节，那浓浓的秋韵在西边的阳台山里隐藏，只有走进西边的阳台山才能领略那浓浓的秋色，那才真正是别有洞天，否则感受不到故乡秋天的那种深藏不露的美。',

              '确实一眼向西望去，西边的阳台山在深情季节没什么好看的，这个时候了，山是老气横秋的样子，山上除了一片片松柏树，就是洋槐树、橡树和一些杂树，就是荆棘和灌木从了，红枫叶也不是很多，没有漫山遍野层林尽染的镜头。想看到那秋的辉煌，秋的火红，只有走进山的怀抱里去。',

              '这个季节千年古刹大觉寺是最值得一看的，当然来这里不是为了看寺院本身，而是领略寺院里千年的银杏树，被称为银杏王，这是一棵高大粗壮的银杏树，并且在树的主干周围还长出了很多棵碗口一样粗的子母树。其实这个时候吸引人的倒不是这棵银杏树的多么高大挺拔，而是它那满树甚至遍地的金色辉煌，一棵高大无比的银杏树满身都是黄金甲，遮住了大殿之间的整个天空，两座巍峨的大殿在一片黄金海下显得又是那么矮小。游客聚满，就像朝拜者一样，眼睛和镜头都久久地盯着银杏树，手机和相机闪动着眼睛，啪啪啪的声音似乎要把这金秋的辉煌全都吞进自己心灵的世界，把这一切都收藏在自己的人生记忆中。',

              '出了大觉寺上旅游观光路向北，驱车三五分钟就到了贝家花园，沿着木质的栈道走不了多会儿就看到了碉楼，这是贝家花园最重要的建筑物，它掩隐在五角星似的红枫叶之中，秋色中的碉楼显得那样庄严肃穆；到了北大房也是一样，秋色浓重，北大房的三面同样掩隐在金红之中，北大房的古朴与浓重的秋色相得益彰；南大房与北大房有一段距离，并且不在一个正对着的方向，因为建筑在山上，山场又没有那么大的平地，不可能建成老四合院那样的格局，北大房在北坡之下，南大房则在南坡上，大概是阴坡的缘故，这里的秋色似乎更崭新一些。',

              '出了贝家花园沿着旅游路再向北，就到阳台山风景区门口，再往北一些有一条向西的路，车是能够开上去的，也是柏油路，这条路是通向金山寺的。金山寺并不大，其实就是座尼姑奄。金章宗年代这里是八大水院之一的金水院，金山泉是很有名的，山泉周围是一片高大挺拔的银杏林，也叫公孙林。深秋的金山寺在一片金黄之中，站在山下就能够看到那一片辉煌了，同样给深秋的阳台山增添了浓重的秋色，显得格外亮眼。',

              '虽然站在山下看不到阳台山漫山遍野的辉煌和火红，但这点点秋色却独具特色，恰如苏州园林的那种小巧玲珑，赏秋和品秋也是别有一番风味的。'
            ]

          },
          {
            url:require('../assets/home/p3.jpg'),
            title:'两个人，古道',
            date:{
              day:'05',
              mon:'Dec',
              year:2020,
              time:'PM17:30'
            },
            mood:require('../assets/mood/19.png'),
            weather:require('../assets/weather/14.png'),
            location:'哈尔滨',
            content:[
              '那年，也是国庆假期。',

              '送儿子去西安上学后，十二点多，我们租了辆车，到了蓝关古道下的村子。',

              '雨后初晴，还有些泥泞，我们背了一些干粮。',

              '蜿蜒的山路，衰黄的荒草，满身尖刺叶已落的酸枣树，平平淡淡的秦岭秋色。我们肩并肩走着，轻声地说着话，我没有想到的是，你竟然也兴趣盎然，走之前，我还害怕你抱怨着呢。',

              '虽然各种杂草和灌木侵占过来，带着各色的果实和山花，但是古道还有一米多宽的砂石路让我们从容地走。除了刚开始的一部分坡路中间仍然平铺着的许多大石块以外，古道已经没有什么遗迹了。那些曾经的人呼马嘶的繁忙、忧苦、疲惫、血汗、失意，当然可能也有荣耀，什么也没有留在这里。',

              '韩愈的“云横秦岭家何在，雪拥蓝关马不前”，也没有留在这里，只留在了不断被翻印的唐诗里，有几个人知道。千百年来，又有几个人真切地感受到他的迷茫与无望。',

              '半坡上，一边是山岭，一边是大片的板栗林，阳光下，忽觉背后一股寒意，不知所来，不知所踪。也许某个天寒路滑的日子，这里曾经人仰马翻，下面有有家不能归的冤魂吗？我没有对你说，你正在高高兴兴地拔下了几支暗红的石子花。',

              '一个很陡峭的急弯，找不到路，路被胡须一样的什么草覆盖了，似乎还有一个破败的小小的房子，你看着我猴子一样的爬上一棵柿子树，摘下一个红彤彤的软柿子扔给你，你没有担心的样子，微笑着看着我，甜甜地吃着。上树前我炫耀过，我是山里的孩子，这绝不在话下。',

              "一片芦苇地，菅草像绒毯一样铺着，你兴高采烈地折了一大把，还让我给你不停地拍照，好久没有见到你像孩子一样了。",

              '快到坡顶时，忽然看见沟中有五六个妇人，她们在采中草药，她们有点奇怪地看了我们一样，就自顾自地忙去了。一潭小小的泉水，我趴在那喝了，你小声嘟哝了几句。',

              '到了山头，上面是比较平缓的水泥路，干干净净的，但没有人行走。头顶是宽阔的淡蓝的天空，清风徐徐吹过，我们不着急，有一句没一句地说着话，一直走到两边十几米高的山崖中间夹着一条路的风门口。',

              '我们俩坐着，任凉爽的风带走我们的微汗，看着水泥路曲曲折折地延伸到高高低低的山山峁茆远处。我给你说了几句蓝关的历史，你听得漫不经心。曾经的残酷的战争发生在这里，没留下什么，你不关心。',

              '你知道，有我和孩子就够了，清风暖阳，岁月如此静好。',

              '我们顺着水泥路缓缓地向县城的方向走去。东南方起起伏伏的山峦，坡底下绿树掩映的农舍，阴坡一眼望不透的松林，阳坡清亮却看不到底的桦栎树林，紫红的或者绿中泛白的酸枣，一丛砂岩上鲜红的叶子，一只飞快爬上树的大尾巴的松鼠，快活地唱着歌的山鸟，翩然飞舞的蝴蝶，轻盈地闪着翅膀的蜻蜓，一切都是明亮、轻松、快活的样子。',

              '到了山梁的尽头，灿烂的晚霞在白鹿原上铺展着，如此的祥和安逸。竹篑寺塔精精神神地挺立在对面稍矮的山头，灞河水红光满面地蜿蜒而去，一点一点的白光在远处县城的楼房上闪着，近处川道里座座房子安安静静地晒着太阳，车辆轻轻快快地向前跑着。',

              '我们静静地坐着，我看着你被夕阳映得通红的脸和恬静的笑容，口里轻轻地嚼着一支狗尾巴草。',

              '“咱们回吧，一会儿天就黑了。”我说。',

              '“你不是说到这里就很近了吗？”你说着，顺从地站起来。',

              '但很快天就暗下来了，渐渐的山半坡的村子就亮起了灯来。但我们不急，因为水泥路还是清清楚楚的。',

              '到了半山腰第一户人家的时候，一只狗汪汪的叫了几声，房子没有开灯，主人朦朦胧胧地坐在门口，厨房里传来诱人的农家饭菜的香味，我偷偷地咽了一下口水，你说：“我都饿了！”',

              '出租车在路边等着，我们在夜色中回了家。',

              '那晚，你睡得很甜，我也是。',

              '而这，竟然是我们俩唯一的一次从从容容地在天地之间漫步！',

              '又是国庆了，山还在，路还在，所有的都在，然而你永远不在了！',

              '阴沉沉的天，我远远地看着那山，泪流满面。'
            ]

          }
        ],
        interception:false, //滑动截流
      }
    },
    created() {

      let arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

      this.year = new Date().getFullYear();
      this.mon = arr[new Date().getMonth()];
      this.day = new Date().getDate();

      this.day = this.day < 10 ? '0' + this.day : this.day;

    },
    beforeMount() {

    },
    mounted() {
       let back = document.querySelectorAll('.van-overlay')[0]
    },
    methods:{
      goState(o){
        this.$router.push(o)
      },
      switchLeft(o){

        if(o.name != 'noJust'){

          this.goState(o)
        }


        this.show = !this.show



        let back = document.querySelectorAll('.van-overlay')[0]

        if(!this.show || !back)return

        back.ontouchstart = (e) => {

          let x1 = e.touches[0].clientX;

          let flag = false

          back.ontouchmove = (ev) => {
            if(x1 - ev.touches[0].clientX >= 50){
               // console.log('向左拖拽');

               flag = 'left'

             }
          }

          back.ontouchend = () => {
            if(!flag)return

            back.ontouchmove = null

            this.show = !this.show
          }
        }
      },

      drag(e){


        let target = this.$refs.card;

        let x1 = e.touches[0].clientX;

        let flag = false



        let set = setTimeout(() => {
          alert(1)
        },300)

        target.ontouchmove = (ev) => {

          clearTimeout(set)

          // console.info(ev.touches[0].clientX )

           if(x1 - ev.touches[0].clientX >= 50){
             // console.log('向左拖拽');

             flag = 'left'

           }else if(ev.touches[0].clientX - x1 >= 50){
             // console.log('向右拖拽')
             flag = 'right'
           }
        }

        target.ontouchend = () => {
          target.ontouchmove = null;

          if(!flag || this.interception)return;

          if(flag == 'right'){
            let lin = this.cardPi.shift();

            this.cardPi.push(lin)
          }else{
            let lin = this.cardPi.pop();

            this.cardPi.unshift(lin)
          }



          this.interception = true;

          setTimeout(() => {
            this.interception = false
          },800)

        }

      },



    }
  }

</script>
