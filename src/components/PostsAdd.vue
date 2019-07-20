<template>
    <div id="posts-add">
        <h3 class="title-h3">Добавить новый пост</h3>
        <form id="add-post-form">
            <input v-model="postTitle" type="text" placeholder="Введите название поста">
            <textarea v-model="postText" placeholder="Введите текст вашего поста"></textarea>
            <button @click="addPost()">Добавить</button>
        </form>
    </div>
</template>

<script>
import db from '@/firebase-init.js';

export default {
  name: 'posts-add',
  data() {
      return {
          postTitle: null,
          postText: null
      }
  },

  created() {
  },

  methods: {
      addPost() {
            db.collection('posts').add({
                postText: this.postText,
                postTitle: this.postTitle,
                postPublishDate: new Date(),
            });
            this.postTitle = '';
            this.postText = '';
      }
  }
}
</script>

<style lang="scss" scoped>

@import './src/css-parts/_variables.scss';

#posts-add {
    margin-top: 80px;
}

form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

input {
    align-self: flex-start;
    margin-bottom: 14px;
    padding: 6px 12px 7px;
    border-radius: 4px;
    font-size: 14px;
    max-width: 300px;
    width: 100%;
    border: 1px solid $colorForBlueShadows;
    font-family: $fontFamilyForText;
    color: $colorForText;

    &:focus {
        outline: none;
        border-color: $colorForBlueBorders;
    }

    &::placeholder {
        color: $colorForPlaceholders;
    }
}

textarea {
    width: 100%;
    height: 120px;
    resize: vertical;
    border-radius: 4px;
    padding: 14px;
    font-size: 14px;
    border: 1px solid $colorForBlueShadows;
    font-family: $fontFamilyForText;
    color: $colorForText;

    &:focus {
        outline: none;
        border-color: $colorForBlueBorders;
    }

    &::placeholder {
        color: $colorForPlaceholders;
    }
}

button {
    cursor: pointer;
    border-radius: 50px;
    border: none;
    background: linear-gradient(to right, $lightBlue, $darkBlue);
    color: white;
    font-weight: bold;
    padding: 8px 32px 9px;
    margin-top: 20px;
    font-family: $fontFamilyForText;
    letter-spacing: .3px;
    font-size: 14px;
    box-shadow: 0 3px 10px 2px $colorForBlueShadows;
    transition: all ease-in-out .2s;
    
    &:hover {
        transform: translateY(-2px);
    }
}

</style>