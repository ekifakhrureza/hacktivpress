<template>
  <div class="modal fade" id="AddArticle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Ask The Question</h5>
          <button id="closearticle" type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
          <form class="needs-validation" novalidate>
            <div class="form-group">
              <label for="recipient-name" class="col-form-label">Title:</label>
              <input v-model='title' name="title" type="text" class="form-control" id="recipient-name" placeholder="Input Title" v-validate="'required'" :class="{'error': errors.has('title') }">
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Content:</label>
              <textarea v-model='content' name="content" class="form-control" id="message-text" placeholder="Input Content" v-validate="'required'" :class="{'error': errors.has('content') }"></textarea>
            </div>
            <div class="form-group">
              <label for="message-text" class="col-form-label">Category:</label>
              <textarea v-model='category' name="category" class="form-control" id="message-text" placeholder="Input Category" v-validate="'required'" :class="{'error': errors.has('category') }"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click='add()'>Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapActions, mapMutations,mapState,mapGetters
} from 'vuex'
export default {
  name: 'AddArticle',
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    ...mapActions([
      'addArticle'
    ]),
    add () {
        let newArticle = {
          title: this.title,
          content: this.content,
          category: this.category,
        }
        this.addArticle(newArticle)
        document.getElementById('closearticle').click()
    }
  }
}
</script>
