<template>
  <v-layout
    column
    justify-center
    align-center>
    <v-flex
      xs12
      sm8
      md6>
      <div class="text-xs-center">
      <LogoHeader subHeading="A Thai Travel Blog"/>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import LogoHeader from '~/components/LogoHeader.vue'


  export default {
    layout: 'landing',
    components: {
      LogoHeader,
    }
  }
</script>
<style scoped lang="scss">
  @import '@/assets/style/scss/app.scss';

  .layout {
    height: 100vh;
    
  }







  .landing__heading {
    font-family: 'futura', sans-serif;
  }





</style>