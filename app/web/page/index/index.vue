<template>
  <layout description="vue server side render" keywords="egg, vue, webpack, server side render">
    <div>
        111
    </div>
  </layout>
</template>
<style>
  @import "index.css";
</style>
<script>
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
      lists(){
        return this.list;
      }
    },
    methods: {
      fetch(){
        this.$request.get(`/list?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res=> {
          console.log('res', res);
          if(res.data.list && res.data.list.length){
            this.total = res.data.total;
            this.list = this.list.concat(res.data.list);
          }else{
            this.isFinish = true;
          }
          this.isLoading = false;
        });
      },
      loadPage(){
        if (!this.isFinish && !this.isLoading) {
          this.isLoading = true;
          this.pageIndex++;
          setTimeout(()=>{
            this.fetch();
          }, 1500);
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', ()=>{
        this.loadPage();
      }, false);
    }
  }
</script>

