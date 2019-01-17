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
        <h5 class="prompt">This site is still a work in progess so please excuse the occasional mess....</h5>
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



  .prompt {
    margin-top: 96px;
    font-family: 'futura', sans-serif;
  } 



  .landing__heading {
    font-family: 'futura', sans-serif;
  }





</style>