<template>
  <div class="landing__hero">
    <Logo v-show="$vuetify.breakpoint.smAndUp"/> 
    <div class="elevation-1 panel panel--aqua">
      <Title v-if="!title" :width="($vuetify.breakpoint.smAndUp) ? 440: 280"/>
      <h1 class="landing__heading">{{title}}</h1>
    </div>
    <div class="elevation-1 panel panel--peach">
      <h2 v-if="subHeading" class="landing__sub-heading">{{subHeading}}</h2>
    </div>
  </div>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import Title from '~/components/Title.vue'

  export default {
    name: 'LogoHeader',
    props: {
      title: {
        type: String
      },
      subHeading: {
        type: String
      }
    },
    components: {
      Logo,
      Title
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/style/scss/app.scss';

  .landing__hero {
    position: relative;
  }

  .logo {
    position: absolute;
    left: 0;
    top: -25px;
    z-index: 500;

  }

  .panel {
    height: 100px;

  }

  .panel--aqua {
    @include parallelogram(10deg);
    position: relative;
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;   
    background: $aqua;
    border: $strong-border;
    width: 500px;
    margin-left: 120px;

    @media only screen and (max-width: 600px) {
      width: 100%;
      margin-left: 0;
    }


    h1 {
      transform: skew(-10deg);
      // width: 100%;
      padding-left: 20px;
    }
  }

  .panel--peach {
    @include parallelogram(10deg);
    width: 610px;
    text-align: center;

    @media only screen and (max-width: 600px) {
      width: 100%;
      left: 0;
    }    
    background: $peach;
    border: $strong-border;

    position: absolute;
    top: 50px;
    left: 0;    

    h2 {
      transform: skew(-10deg);
    }

  }

  .landing__heading {
    color: $ebony;

  }

  .landing__sub-heading {
    color: $ebony;
    font-family: 'futura', sans-serif;
    font-weight: 200;
    width: 100%;
    top: 56px;
    position: absolute;
  }

</style>

