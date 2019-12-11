<template>
  <layout>
    <div>
        <HEAD></HEAD>
        <mt-button type="default"  size="large">default</mt-button>
        <mt-button type="primary" size="large">primary</mt-button>
        <mt-button type="danger" size="large">danger</mt-button>
        <div class="test">
            <div></div>
        </div>
        <div>111</div>
    </div>
  </layout>
</template>
<style lang="scss" scoped>
  @import "index.scss";
</style>
<script>
  import HEAD from 'component/header'
  import axios from 'axios'
  export default {
    components: {
        HEAD,
    },
    data(){
      return {
        isFinish: false,
        isLoading : false,
        pageIndex: 1,
        pageSize: 10
      }
    },
    computed: {

    },
    methods: {

    },
    mounted() {
        // /user/getUserInfo
        // /europa//api/dailyReport/listData?type=0
        axios.get('/user/getUserInfo').then(res => {
            console.log(res)
        })
    }
  }
</script>

