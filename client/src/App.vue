<template>
  <div id="app">
     <form class="form-inline my-2 my-lg-0" v-if="getToken===null">
            <button style="margin-right: 20px" class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#loginModal" data-whatever="@getbootstrap">Login</button>
            <button class="btn btn-outline-info my-2 my-sm-0" data-toggle="modal" data-target="#registerModal" data-whatever="@getbootstrap">Register</button>
          </form>
          <form class="form-inline my-2 my-lg-0" v-else>
            <button class="btn btn-dark" @click="logout()">Logout</button>
          </form>
            <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Login</h5>
              <button type="button" id="closelogin" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
            </div>
            <form @submit.prevent="onSubmit()">
              <div class="modal-body">
                <div class="form-group">
                 <label for="recipient-name" class="col-form-label">Username:</label>
                  <input v-model="username" name="username" type="text" class="form-control" id="recipient-name" v-validate="'required|email'" :class="{'error': errors.has('username') }">
                  <span v-show="errors.has('username')" class="text-danger">{{ errors.first('username') }}</span>
                </div>
                <div class="form-group">
                 <label for="message-text" class="col-form-label">Password:</label>
                  <input v-model="password" name="password" type="password" class="form-control" id="recipient-name" v-validate="'required|min:6'" :class="{'error': errors.has('password') }">
                  <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" @click="login()">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Register</h5>
              <button id="close" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
            </div>
            <form @submit.prevent="onSubmit()">
              <div class="modal-body">
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Name:</label>
                  <input v-model="name" name="name" type="text" class="form-control" id="recipient-name" v-validate="'required'" :class="{'error': errors.has('name') }">
                  <span v-show="errors.has('name')" class="text-danger">{{ errors.first('name') }}</span>
                </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Username:</label>
                  <input v-model="username" name="username" type="text" class="form-control" id="recipient-name" v-validate="'required|email'" :class="{'error': errors.has('username') }">
                  <span v-show="errors.has('username')" class="text-danger">{{ errors.first('username') }}</span>
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">Password:</label>
                  <input v-model="password" name="password" type="password" class="form-control" id="recipient-name" v-validate="'required|min:6'" :class="{'error': errors.has('password') }">
                  <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary" @click="register()">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    <div class="wrapper">
      <!-- Sidebar Holder -->
      <nav id="sidebar">
        <div class="sidebar-header">
          <h3>Sport Blog</h3>
          <strong>SB</strong>
        </div>
        <ul class="list-unstyled components">
          <li class="active">
            <a href="#">
              <router-link to="/"><i class="glyphicon glyphicon-home"></i>Home</router-link>
            </a>
          </li>
          <li class="active">
            <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false">
              <i class="glyphicon glyphicon-duplicate"></i> List Article ({{ getArticle.length }})
            </a>
            <ul class="collapse list-unstyled" id="pageSubmenu">
              <li v-for="(article, index) in getArticle" :key="index">
                <router-link  :to="{name:'DetailArticle', params:{id:article._id} } ">
                 <p>{{ article.title }}</p>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <router-view/>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
	import {
		mapActions,
		mapGetters,
    mapState,
    mapMutations
	} from 'vuex'
	
	export default {
		name: 'ArticleList',
		components : {
			// AddArticle
    },
     data() {
      return {
        email: '',
        name: '',
        password: ''
      };
    },
		methods: {
      ...mapActions(['getAllArticle', 'getDetailArticle']),
      ...mapMutations(['setToken']),
       onSubmit () {
        this.$validator.validateAll()
      },
     register () {
       console.log(this.email);
       
        let username = this.username;
        let name = this.name;
        let password = this.password;
        axios
          .post("http://localhost:3000/users/register", {
            username: username,
            name: name,
            password: password
          })
          .then(data => {
            if (data.status === 202) {
              alert("Email Already Exist");
            } else {
              console.log(data);
              
              localStorage.setItem("token", data.data.token)
              this.setToken(localStorage.getItem('token'))
              document.getElementById("close").click()
              this.username = ''
              this.name = ''
              this.password = ''
            }
          })
          .catch(err => {
            console.log(err)
          });
      },
      login () {
        let username = this.username;
        let password = this.password;
        axios
          .post("http://localhost:3000/users/login", {
            username: username,
            password: password
          })
          .then(data => {
            if (data.status === 202) {
              alert("Wrong username/password")
            } else {
              localStorage.setItem("token", data.data.token)
              this.setToken(localStorage.getItem('token'))
               document.getElementById("closelogin").click()
              this.username = ''
              this.password = ''
            }
          })
          .catch(err => {
            console.log(err)
          });
      },
        logout () {
        console.log(this.getToken)
        localStorage.removeItem('name')
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        this.setToken(null)
        this.setTokenName(null)
      }
		},
		created() {
			console.log(this.getAllArticle()+'aaaaaaaaaaaaaaaaaaa');
			
			this.getAllArticle()
		},
		computed: {
      ...mapGetters(['getArticle','getToken'])
    }
	}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style scoped>
p {
  color: black;
  font-weight: bold;
}
a,
a:focus,
a:active {
  color: white;
  text-decoration: none;
}
</style>
