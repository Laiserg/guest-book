<template>
  <div id="guest-book-page">
    <h1 class="title">Гостевая книга</h1>
    <Navigation />

    <h2 class="title-h2">Последние записи</h2>
    <a class="add-post-link" href="#add-post-form">добавить пост</a>
    <PostsView :postsData="posts" />
    <PostsAdd />
  </div>
</template>

<script>
import db from '@/firebase-init.js';
import Navigation from '@/components/Navigation.vue'
import PostsView from '@/components/PostsView.vue'
import PostsAdd from '@/components/PostsAdd.vue'

export default {
  name: 'guest-book-page',
  components: {
    Navigation,
    PostsView,
    PostsAdd
  },

  data() {
      return {
          posts: [],
      }
  },

  created() {
    this.initGuestPosts();
  },

  methods: {

    // инициализация гостевых записей
    initGuestPosts() {
      this.posts = [];
      db.collection('posts')
        .get()
        .then( (query) => {
          query.forEach(element => {
              const data = {
                  title: element.data().postTitle,
                  text: element.data().postText,
                  publishDate: element.data().postPublishDate.toDate(),
              };
              this.posts.push(data);
          });
      }).then( () => {
        // сортируем массив постов по дате добавления (от раннего к позднему)
        this.posts.sort( (a, b) => {
          return a.publishDate > b.publishDate ? -1 : 1;
        });
      });
    },

  }

}
</script>

<style lang="scss" scoped>

@import './src/css-parts/_variables.scss';

#guest-book-page {
  margin: 40px auto;
  max-width: 730px;
}

@media (max-width: 730px) {
  #guest-book-page {
    padding: 0 15px;
  }
}

.title-h2 {
  display: inline-block;
}

.add-post-link {
  display: inline-block;
  margin-left: 14px;
  text-decoration: none;
  color: $colorForPlaceholders;
  font-family: $fontFamilyForServiceText;
  border-bottom: 1px dashed;
  transition: all ease-in-out .2s;
  font-size: 12px;

  &:hover {
    color: $blue;
  }
}

</style>