<template>
  <div>
    <slot name='content'></slot>
  </div>
</template>
<style lang="scss">
  @import 'content.scss';
</style>
<script type='babel'>
  export default {
    name:'v-content',
    data(){
      return {

      }
    },
    components: {},
    mounted() {

    }
  };
</script>
