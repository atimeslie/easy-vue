<template>
  <layout description="vue server side render" keywords="egg, vue, webpack, server side render">
    <div>
        111
        <el-button type="primary">主要按钮</el-button>
    </div>
  </layout>
</template>
<style>
  @import "index.css";
</style>
<script>
  import axios from 'axios'
  import Vue from 'vue';
  import { Button, Select } from 'element-ui';
  Vue.use(Button);
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

