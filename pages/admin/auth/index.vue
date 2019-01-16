<template>
  <v-form >
    <v-container>
          <v-text-field
            v-model="email"
            label="E-mail"
            v-validate="'required|email'"
          ></v-text-field>
          <v-text-field
            type="password"
            v-model="password"
            :counter="6"
            v-validate="'required'"
            label="Password"
            required
          ></v-text-field>          
          <v-btn color="success" @click="validateBeforeSubmit">submit</v-btn>
          <v-btn color="primary"><nuxt-link to="/"><i class="large material-icons">home</i>Back</nuxt-link></v-btn>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    data() {
      return {
        isLogin: true,
        email: 'warintaksinpruk@gmail.com',
        password: 'pastaword',
      }
    },
    methods: {
      submit() {
        console.log('submit login');
        this.$store.dispatch('authenticateUser', {
          isLogin: this.isLogin,
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$router.push('/admin');
        });        
      },
      validateBeforeSubmit(e) {
        this.$validator.validateAll().then(valid => {
          if(valid) {
            this.submit()
          }
        }).catch(e => {
          console.log(e, 'fail')
        })
      }
    }
  }
</script>

<style scoped class="scss">
  .primary {
    color: white;
  }

</style>