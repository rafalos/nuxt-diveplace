<template>
  <div style="margin: 0;">
    <div class="comment-section">
      <div id="input-container">
        <textarea v-model="comment" id="commentInput" cols="40" rows ="1" name="comment[text]" placeholder="Enter your comment here" @keydown.enter="postComment($event)"></textarea>
        <button class="stdbutton" @click="postComment">Add</button>
      </div>
        <div style="padding: 15px;">
          <div class="row comment-box">
            <div v-if="comments.length==0"> No comments </div>
            <div v-else v-for="comment in comments" :key="comment._id" class="col-md-12 single-comment-box">
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
  export default {
    props: ['comments'],
    data() {
      return {
        comment: ''
      }
    },
    methods: {
      postComment(e) {
        e.preventDefault();
        console.log("Comment posted")
        this.comment=''
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

  .comment-box {
    background: white;
  }
</style>

