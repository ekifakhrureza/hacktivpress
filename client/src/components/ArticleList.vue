<template>
	<div class="container">
		<div v-if="getToken!==null">		
		  <button class="float-left btn btn-outline-success ml-2" data-toggle="modal" data-target="#AddArticle">
				<i class="far fa-plus-square"> Add Article</i>
			</button>
		</div>
		<h2 class="text-center">Article List</h2>
		<div class="card">
			<div class="card-body">
				<div class="row" v-for="(getArticle,index) in getArticle" :key="index">
					<div class="col-md-2">
						<p class="text-secondary text-center">Author : {{ getArticle.author.name }}</p>
					</div>
					<div class="col-md-10">
						<p style="color:#007bff">
							<strong>{{ getArticle.title }}</strong>
						</p>
						<div class="clearfix"></div>
						<p>{{ getArticle.content }}</p>
					</div>
				</div>
			</div>
		</div>
		<AddArticle />
	</div>
</template>

<script>
	// import AddArticle from './AddArticle'
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

