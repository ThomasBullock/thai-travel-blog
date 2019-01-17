<template>
    <div class="background">
      <v-container fluid class="landing">
        <v-layout row justify-space-between class="topbar">
          <div class="navigation">
            <nuxt-link class="elevation-1 chom-btn" to="/"><i class="large material-icons">home</i></nuxt-link>
            <nuxt-link class="elevation-1 chom-btn" to="/posts"><span>Posts</span></nuxt-link>
            <!-- <nuxt-link class="elevation-1 chom-btn" to="/who"><span>Who</span></nuxt-link> -->
          </div>

          <div lg1 class="admin">
            <nuxt-link class="elevation-1 chom-btn" to="/admin"><span>Admin</span></nuxt-link>
          </div>
        </v-layout>      
        <nuxt/>
      </v-container>
    </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="scss">
  @import '@/assets/style/scss/app.scss';

  .background {
    width: 100%;
    height: 100vh;
    padding: 0;
    margin: 0;
  }


  .chom-btn {
    @include parallelogram(15deg);
    width: 150px;
    height: 42px;
    border: solid 1px $black;
    position: relative;
    background: $aqua;
    display: flex;
    
    justify-content: center;
    align-items: center;
    padding: 12px;

    &:not(:first-child) {
      margin-left: 24px;
    }

    i, span {
      transform: skew(-15deg);
    }
  }

  .nuxt-link-active {
    color: $peach;
  }

  .topbar {
    position: fixed;
    width: 100%;
    padding-right: 44px;
  }

  .navigation {
    font-family: 'Lato', sans-serif;
    // position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .admin {
    margin-left: 24px;
    font-family: 'Lato', sans-serif;
  }

  .background {
    background: linear-gradient(0deg, rgba(177, 84, 12, .7), rgba(80, 208, 227, .8)), 
      url('https://res.cloudinary.com/chomsiam/image/upload/c_scale,q_61,w_1200/v1547584872/thailand/kjetbpypargdvp2rpcee.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  .landing {
    height: 100vh;
  }


</style>