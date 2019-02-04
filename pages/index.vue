<template>
  <v-layout
    justify-center
    wrap
    >
    <div class="home__logo-wrapper">
      <LogoHeader subHeading="A Thai Travel Blog"/>
    </div>
    <v-flex
      xs12
      sm10
      md8
      lg6
      align-self-center
    >
        <h5 class="prompt">This site is still a work in progess so please excuse the occasional mess....</h5>
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

  .home__logo-wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .prompt {
    text-align: center;
    margin-top: 48px;
    font-family: 'futura', sans-serif;
  } 



  .landing__heading {
    font-family: 'futura', sans-serif;
  }





</style>