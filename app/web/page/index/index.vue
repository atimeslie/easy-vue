<template>
  <layout>
    <div>
        <mt-button type="default"  size="large">default</mt-button>
        <mt-button type="primary" size="large">primary</mt-button>
        <mt-button type="danger" size="large">danger</mt-button>
    </div>
  </layout>
</template>
<style>
  @import "index.css";
</style>
<script>
  import axios from 'axios'
  export default {
    components: {

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

