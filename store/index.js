import Vuex from "vuex";
import Cookie from "js-cookie";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      users: null,
      token: null,
      userId: null,
      uploading: false
    },
    getters: {
      isAuthenticated(state) {
        return state.token != null
      },
      getUserById(state, id) {
        return state.users && state.users[id]
      },
      loadedPosts(state) {
        return state.loadedPosts
      },
      postById(state, id) {
        return state.loadedPosts.filter(post => post.id === id)
      },
      isLoading(state) {
        return state.uploading
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        console.log(process.env.title)
        let promises = [
          context.app.$axios
            .$get('/posts.json'),
          context.app.$axios
            .$get('/users.json')
        ]

        return Promise.all(promises)
          .then(res => {
            console.log('WE HAVE DATA')
            // console.log(res)
            let posts = Object.keys(res[0]).map((post) => {
                  return {...res[0][post], id: post}
                });
            let users = res[1];
            console.log(users)
            vuexContext.commit('SET_POSTS', posts)
            vuexContext.commit('SET_USERLIST', users)
            
          })
      },
      /* AUTH */
      authenticateUser(vuexContext, authData) {
        let authUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${process.env.fbAPIKey}`
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true            
          })
          .then(result => {
            console.log(result)
            vuexContext.commit("SET_USER", result);
            localStorage.setItem("token", result.idToken);
            localStorage.setItem("userId", result.localId);
            localStorage.setItem(
              "tokenExpiration",
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            );            
            Cookie.set("jwt", result.idToken);
            Cookie.set("userId", result.localId)
            Cookie.set(
              "expirationDate",
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            );            
          })
          .catch(e => console.log(e)); 
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        let userId;
        if(req) {
          if(!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("jwt="));
          // console.log('our jwt Cookie = ' +jwtCookie)
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split("=")[1];
          expirationDate = req.headers.cookie
            .split(";")
            .find(c => c.trim().startsWith("expirationDate="))
            .split("=")[1];
          userId = req.headers.cookie
          .split(";")
          .find(c => c.trim().startsWith("userId="))
          .split("=")[1];    
        } else {
          token = localStorage.getItem("token");
          expirationDate = localStorage.getItem("tokenExpiration");
          userId = localStorage.getItem('userId');          
        }
        if(!token) { // add expiration date
          vuexContext.dispatch("logout");
          return
        } 
        vuexContext.commit('SET_USER', {idToken: token, localId: userId})
      },
      logout(vuexContext) {
        vuexContext.commit('CLEAR_USER');
        Cookie.remove("jwt");
        Cookie.remove("expirationDate");
        Cookie.remove("userId");
        if (process.client) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiration");
          localStorage.removeItem("userId");
        }                            
      },
      /* POSTS */
      uploadPhoto(vuexContext, photoData) {
        console.log('uploadPhoto', photoData.file)
        vuexContext.commit('UPLOADING_START')

        const photoForm = new FormData();
        photoForm.append('file', photoData.file);
        photoForm.append('api_key', process.env.cloudinaryKey);
        photoForm.append('upload_preset', 'cfadyctj'); 
        photoForm.append("timestamp", (Date.now() / 1000) | 0);
        return fetch(`https://api.cloudinary.com/v1_1/${process.env.cloudinaryName}/image/upload`, {
          method: 'POST',
          headers: {
            "X-Requested-With": "XMLHttpRequest"
          },
          body: photoForm
        })
        .then(res => res.json())
          .then(res => {
            console.log('31 then ', res)
            vuexContext.commit('UPLOADING_FINISH')
            return res;
          })
          .catch(e => {
            vuexContext.commit('UPLOADING_FINISH')
            return console.log(e)
        })

      },
      createPost(vuexContext, postData) {
        console.log(postData)
        return this.$axios
          .$post(`https://chom-siam.firebaseio.com/posts.json?auth=${vuexContext.state.token}`, postData)
          .then(res => {
            console.log('response from api', res)
            vuexContext.commit('ADD_POST', { ...postData, id: res.name} )
          })
          .catch(e => console.log('catch', e));
      },
      getUsers(vuexContext) {
        return this.$axios.$get('/users.json')
        .then(data => {
          console.log(data)
          vuexContext.commit('SET_USERLIST', data)
        })        
      }      
    },
    mutations: {
      ADD_POST(state, post) {
        console.log(post)
        state.loadedPosts.push(post)
      },
      SET_USERLIST(state, users) {
        state.users = users
      },
      SET_POSTS(state, posts) {
        state.loadedPosts = posts
      },
      SET_USER(state, userDetails) {
        console.log(`set token ${userDetails.idToken}`)
        state.token = userDetails.idToken
        state.userId = userDetails.localId
      },
      CLEAR_USER(state) {
        state.token = null
        state.userId = null
      },
      UPLOADING_START(state) {
        state.uploading = true
      },
      UPLOADING_FINISH(state) {
        state.uploading = false
      }      
    },

  })
}

export default createStore;