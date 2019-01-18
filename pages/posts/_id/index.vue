<template>
  <div>
    <v-layout row class="post__title">
      <v-flex xs12 sm12 md10 lg8 offset-md1 offset-lg2>
        <LogoHeader :title="post.title" :subHeading="$dayjs(post.date).format('dddd, MMMM DD, YYYY')"/>
      </v-flex>
    </v-layout>
    <v-img v-if="userDetails" class="avatar"
      max-width=125 
      max-height=125
      :src="userDetails.avatar" 
      :alt="userDetails.displayName"
    >
    </v-img>

    <v-layout row wrap>
      <v-flex s12 sm12 md10 lg8 offset-md1 offset-lg2 align-self-start>

        <h4 class="blog__location"><i class="location__icon material-icons">location_on</i>{{post.location.formatted_address}}</h4>      
      </v-flex>
      <v-flex xs12 sm12 md10 lg8 offset-md1 offset-lg2>
        <p class="blog__text">{{post.text}}</p>
      </v-flex>
    </v-layout>
    <v-carousel v-if="post.images && post.images.length > 1 && post.carousel">
      <v-carousel-item
        v-for="(image,i) in post.images"
        :key="i"
        :src="image.url"
      ></v-carousel-item>
    </v-carousel>
    <!-- <PhotoGrid v-else-if="post.images && post.images.length" :images="post.images"/> -->
    <v-flex v-else xs12 sm12 md10 lg8 offset-md1 offset-lg2 v-for="(image, i) in post.images" :key="'image-'+i">
      <v-img
        class="post__image"
        :src="image.url" 
        :alt="image.caption"
      ></v-img>
      <div 
        class="post__image-caption"
        :class="{'post__image-caption--last' : i == post.images.length - 1 }"
      >{{image.caption}}</div>
    </v-flex>
  </div>
</template>

<script>
  import PhotoGrid from '@/components/PhotoGrid'
  import LogoHeader from '~/components/LogoHeader.vue'

  export default {
    name: 'Post',
    components: {
      PhotoGrid,
      LogoHeader
    },
    computed: {
      userDetails() {
        return this.$store.state.users[this.post.userId]
        // return (this.post) ? this.$store.state.users[this.post.userId] : null
      }
    }, 
    asyncData(context) { // in asyncData we dont have access to this because asynsData happens before the compoment is created
      return context.app.$axios.$get('/posts/' + context.params.id + '.json')
        .then(data => {
          return {
            post: data
          }
        })
        .catch(e => context.error(e))
    },    
    mounted() {
      console.log(this.$store.state.loadedPosts);
      console.log('route params ' + this.$route.params.id);
    }
  }
</script>

<style scoped lang="scss">
  @import '@/assets/style/scss/app.scss';

  .panel {
    width: 800px;
    height: 100px;
    text-align: center;
  }

  .post__title {
    position: relative;
  }

  .post__image {
    margin-top: 24px;
    border-left: $strong-border;
    border-right: $strong-border;
    border-top: $strong-border;         
    // border: $strong-border;


  }

  .location__icon {

  }

  .post__image-caption {
    padding: 12px;
    border-left: $strong-border;
    border-right: $strong-border;
    border-top: $strong-border; 
    border-bottom: $strong-border;
    background: $peach;

    &--last {
      border-bottom: $strong-border;
    }
  }

  .panel--aqua {
    @include parallelogram(10deg);
    position: relative;
    z-index: 300;
    display: flex;
    justify-content: flex-end;
    align-items: center;    
    background: $aqua;
    border: solid 2px $black;
    padding-right: 24px;

    h1 {
      transform: skew(-10deg);
    }
  }

  .post__hero {
    width: 100%;
    position: relative;
    // background: linear-gradient(180deg, $peach, $aqua)
  }

  .post__author {
    // position: absolute;
  }

  .blog__location {
    display: flex;
    margin-top: 72px;
    margin-bottom: 12px;
  }

  .blog__text {
    // margin-top: 72px;
  }

  .avatar {
    position: absolute;
    width: 225px;
    right: 15%;
    top: 40px;
    border-radius: 50%;
    border: solid 2px $peach;
    z-index: 2000;
  }
</style>