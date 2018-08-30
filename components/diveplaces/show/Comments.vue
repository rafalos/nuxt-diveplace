<template>
  <div style="margin: 0;">
    <div class="comment-section">
      <div id="input-container" v-if="$store.state.auth !== null">
        <textarea v-model="comment" id="commentInput" cols="40" rows ="1" name="comment[text]" placeholder="Enter your comment here" @keydown.enter="postComment($event)"></textarea>
        <button class="stdbutton" @click="postComment">Add</button>
      </div>
      <div v-else>
      <h3><nuxt-link to="/account">Login</nuxt-link> to comment</h3>
      </div>
        <div style="padding: 15px;">
          <div class="row comment-box">
            <div v-if="commentsRaw.length==0"> No comments </div>
            <div v-else v-for="comment in commentsRaw" :key="comment._id" class="col-md-12 single-comment-box">
              <strong style="font-size: 16px;">Author: <nuxt-link :to='`/users/${comment.author}`'>{{comment.author}}</nuxt-link></strong>
              <span class="float-right">Added: {{comment.date}}</span>
              <p class="normal comment-text">{{comment.text}}</p>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    props: ['comments', 'diveplaceID'],
    data() {
      return {
        commentsRaw: this.comments,
        comment: ''
      }
    },
    computed: {
      fetchUser() {
        return this.$store.state.auth.user
      }
    },
    methods: {
      postComment(e) {
        console.log(this.diveplaceID)
        e.preventDefault();
        return axios.post('api/diveplaces/' + this.diveplaceID + '/comment', {
          message: this.comment,
          user: this.fetchUser
        })
        .then((response) => {
          console.log("emited")
        this.comment=''
        this.commentsRaw = response.data.comments
        this.$emit("commentAdded", response.data.comments)
        return {
          message: response.data.message
        }
      })
      .catch(function(error){
        console.log(error)
      })
        
      }
    }
  }
</script>

<style>
  #commentInput {
    width: 100%;
    border: 1px solid #143D61;
    resize: none;
    font-weight: bold;
    padding: 5px;
  }
</style>

