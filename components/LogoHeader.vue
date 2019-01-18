<template>
  <div class="landing__hero">
    <Logo/> 
    <div class="elevation-1 panel panel--aqua">
      <Title v-if="!title" />
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
    left: -30px;
    top: -25px;
    z-index: 500;

  }

  .title {
    transform: skew(-10deg);
  }

  .panel {
    width: 600px;
    height: 100px;
    text-align: center;
    // display: flex;
    // justify-content: center;
  }

  .panel--aqua {
    @include parallelogram(10deg);
    position: relative;
    z-index: 300;
    display: flex;
    justify-content: center;
    align-items: center;    
    background: $aqua;
    border: $strong-border;
    padding-right: 24px;

    h1 {
      transform: skew(-10deg);
    }
  }

  .panel--peach {
    @include parallelogram(10deg);
    // trapezoid
    background: $peach;
    border: $strong-border;

    position: absolute;
    left: -40px;
    top: 50px;    

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

