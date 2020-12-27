<template>
  <div>
    <div class="box">{{name}}</div>
    <div class="box">{{email}}</div>
    <div class="box">{{address}}</div>
    <div class="box" @click="change(15865410882,'phone')">{{phone}}</div>
    <div class="box" @click="changePhone({val:'Yuan',obj:'author'})">{{author}}</div>
  </div>
</template>


<style lang="less" scoped>

  .box{
    width: 240px;
    height: 30px;
    text-align: center;
    border-radius: 6px;
    margin: 10px auto;
    line-height: 30px;
    border: 1px solid #000;
  }

</style>

<script>

  import {mapState,mapMutations} from 'vuex'

  export default {
    name:'about',
    computed:{
      ...mapState(
        ['name',
        'email',
        'phone',
        'address',
        'author']
      )
    },

    methods:{


      ...mapMutations(['changePhone']),

      change(val,obj){

        console.info(val,obj)

        this.$store.commit('changePhone',{val,obj})
      }
    }


  }

</script>
