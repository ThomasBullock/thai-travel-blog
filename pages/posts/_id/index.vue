<template>
  <div>
    <div class="post__hero">
      <div class="text-xs-center">
        <LogoHeader :title="post.title" :subHeading="$dayjs(post.date).format('dddd, MMMM DD, YYYY')"/>
        <!-- <div class="post__author"> -->
          <v-img v-if="userDetails" class="avatar"
            max-width=100 
            max-height=100
            :src="userDetails.avatar" 
            :alt="userDetails.displayName"
          >
          </v-img>
        <!-- </div>          -->
      </div>
      <v-container>
        <v-layout justify-space-between>
          <v-flex lg1 offset-lg8>

          </v-flex>
        </v-layout>
      </v-container>
    </div>
    <p>{{post.text}}</p>
    <v-carousel v-if="post.images && post.images.length > 1 && post.carousel">
      <v-carousel-item
        v-for="(image,i) in post.images"
        :key="i"
        :src="image.url"
      ></v-carousel-item>
    </v-carousel>
    <PhotoGrid v-else-if="post.images && post.images.length" :images="post.images"/>
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

  .avatar {
    position: absolute;
    width: 100px;
    right: 25px;
    top: 25px;
    border-radius: 50%;
    border: solid 2px $peach;
  }
</style>