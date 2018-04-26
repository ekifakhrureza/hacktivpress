<template>
  <div id="app">
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
      <router-view :listarticles="articles"/>
    </div>
  </div>
</template>

<script>
	import {
		mapActions,
		mapGetters,
		mapState
	} from 'vuex'
	
	export default {
		name: 'ArticleList',
		components : {
			// AddArticle
		},
		methods: {
			...mapActions(['getAllArticle', 'getDetailArticle']),
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
